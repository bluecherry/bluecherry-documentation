# Documentation screenshots

Reproducible, framed screenshots of the BlueCherry platform for the docs.
Every image is captured at an identical viewport (default **1920×1080**) and
wrapped in a consistent browser frame, so the whole set stays uniform and can
be regenerated in one command whenever the UI changes.

## How it works

1. **Capture** — Playwright opens each page at an exact viewport and takes a
   pixel-identical screenshot. Because the size is fixed in code, it never
   drifts between machines or over time.
2. **Frame** — each capture is injected into `frame.html` (a lightweight 
   HTML/CSS browser chrome) and re-screenshotted. The frame is synthetic on
   purpose: no real browser chrome to look inconsistent across operating systems
   or go stale when a browser redesigns.

All framing happens inside the browser, so there are no native image libraries
to install.

## Setup

```bash
cd tools/screenshots
npm install
```

## Configure

Edit **`screenshots.config.js`** — it's the only file you normally touch:

- `baseUrl` — your running platform (local dev server or staging).
- `viewport` — capture size. Leave at 1920×1080 for a uniform set.
- `deviceScaleFactor` — `2` gives retina-crisp output.
- `frame` — toggle the frame, set backdrop colour/padding, accent.
- `shots` — the list of pages to capture (name, path, optional pretty URL,
  optional `waitFor` selector, optional per-shot `before` setup).

## Login (paywalled platform)

If the platform is behind auth, fill in the `authenticate` hook in the config.
Keep credentials out of the repo — put them in a `.env` file:

```bash
cp .env.example .env
```

`.env` is gitignored and loaded automatically. The hook reads them via
`process.env.BLUECHERRY_USER` / `process.env.BLUECHERRY_PASS`.

## Run

```bash
npm run shots
```

Framed PNGs land in `output/` (gitignored by default).

## Output dimensions

With the defaults (1920×1080 viewport, 44px toolbar, 64px padding, scale ×2):

- **Content area:** 1920×1080 logical px
- **Window (with toolbar):** 1920×1124
- **Full framed image (with padding):** 2048×1252 logical → **4096×2504 px** on 
  disk

Change `viewport`, `frame.padding`, or `deviceScaleFactor` and these scale
accordingly. Set `frame.backdrop: "transparent"` for a transparent backdrop
that drops onto any doc background (the window shadow is preserved).