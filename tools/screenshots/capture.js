const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const config = require("./screenshots.config.js");

const FRAME_HTML = path.join(__dirname, "frame.html");

async function main() {
  const { viewport, deviceScaleFactor, baseUrl, frame } = config;
  const outDir = path.resolve(__dirname, config.outDir || "output");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();

  // Context for capturing the actual app.
  const appContext = await browser.newContext({ viewport, deviceScaleFactor });
  const page = await appContext.newPage();

  // Optional login for paywalled platforms.
  if (typeof config.authenticate === "function") {
    console.log("• running authenticate() ...");
    await config.authenticate(page);
  }

  // A second page that hosts frame.html and does the wrapping.
  const framePage = frame && frame.enabled ? await appContext.newPage() : null;
  if (framePage) {
    await framePage.goto("file://" + FRAME_HTML);
  }

  for (const shot of config.shots) {
    const url = baseUrl + (shot.path || "");
    process.stdout.write(`• ${shot.name}  →  ${url}\n`);

    await page.goto(url, { waitUntil: "networkidle" });
    if (shot.waitFor) await page.waitForSelector(shot.waitFor);
    if (typeof shot.before === "function") await shot.before(page);

    const raw = await page.screenshot(); // exact viewport, PNG buffer

    let outBuffer;
    if (framePage) {
      outBuffer = await wrapInFrame(framePage, raw, shot, config);
    } else {
      outBuffer = raw;
    }

    const outPath = path.join(outDir, `${shot.name}.png`);
    fs.writeFileSync(outPath, outBuffer);
    console.log(`  saved ${path.relative(process.cwd(), outPath)}`);
  }

  await browser.close();
  console.log("\nDone.");
}

// Injects the captured image + metadata into frame.html and screenshots the
// framed result. Everything stays inside the browser, so there are no native
// image dependencies to install.
async function wrapInFrame(framePage, rawPngBuffer, shot, config) {
  const { viewport, frame } = config;
  const dataUrl = "data:image/png;base64," + rawPngBuffer.toString("base64");
  const urlText = shot.urlText || defaultUrlText(config.baseUrl, shot.path);

  await framePage.evaluate(
    ({ dataUrl, urlText, viewport, frame }) => {
      const root = document.documentElement.style;
      root.setProperty("--content-w", viewport.width + "px");
      root.setProperty("--content-h", viewport.height + "px");
      root.setProperty("--pad", frame.padding + "px");
      root.setProperty("--backdrop", frame.backdrop);
      root.setProperty("--accent", frame.accent);
      document.getElementById("shot").src = dataUrl;
      document.getElementById("url").textContent = urlText;
    },
    { dataUrl, urlText, viewport, frame }
  );

  // Wait for the injected image to decode before capturing.
  await framePage.evaluate(
    () =>
      new Promise((resolve) => {
        const img = document.getElementById("shot");
        if (img.complete) resolve();
        else img.onload = () => resolve();
      })
  );

  const stage = await framePage.$("#stage");
  const omitBackground = frame.backdrop === "transparent";
  return await stage.screenshot({ omitBackground });
}

function defaultUrlText(baseUrl, p) {
  try {
    const host = new URL(baseUrl).host;
    return host + (p ? p.replace(/^\/#/, "") : "");
  } catch {
    return baseUrl + (p || "");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
