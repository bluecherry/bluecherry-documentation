// ---------------------------------------------------------------------------
// BlueCherry documentation screenshots — configuration
//
// This is the only file you normally edit. List the pages you want captured
// under `shots`, adjust the viewport/frame if needed, and (if the platform is
// behind a login) fill in the `authenticate` hook.
//
// Run all shots with:   npm run shots
// ---------------------------------------------------------------------------

module.exports = {
  baseUrl: "https://",
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
  outDir: "output",
  frame: {
    enabled: true,
    padding: 64,
    backdrop: "transparent",
    accent: "#1e63d0",
  },
  authenticate: async (page) => {
    await page.goto("https://sso.bluecherry.io");
    await page.fill('input[name="email"]',    process.env.BLUECHERRY_USER);
    await page.fill('input[name="password"]', process.env.BLUECHERRY_PASS);
    await page.click('div.btn:not(.register)');
    await page.waitForURL("https://user.bluecherry.io/**");
  },
  shots: [
    {
      name: "login",
      path: "sso.bluecherry.io",
    },
    {
      name: "register",
      path: "sso.bluecherry.io/register",
    },
    {
      name: "reset",
      path: "sso.bluecherry.io/reset",
    },
    {
      name: "user_devices",
      path: "user.bluecherry.io",
    },
    // {
    //   name: "devices",
    //   path: "/#/devices",
    //   urlText: "app.bluecherry.io/devices",
    //   waitFor: ".device-list",
    // },
    // {
    //   name: "device-detail",
    //   path: "/#/devices/42",
    //   urlText: "app.bluecherry.io/devices/42",
    //   before: async (page) => { await page.click("text=Telemetry"); },
    // },
  ],
};
