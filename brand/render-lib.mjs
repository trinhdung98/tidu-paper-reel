// Shared renderer for the channel art in brand/<channel>/render.mjs. Each channel passes its artworks; each artwork is
// { W, H, jpeg?, draw } where draw is canvas code run in a page that has kit/core.js and the paper-reel style kit loaded
// (ctx, TT = 0.5, F = 15 are set first). Writes <name>.png (or .jpg when jpeg) beside the channel script, or into [out dir].
//   usage: node brand/<channel>/render.mjs [out dir] [--preview dir]   (--preview also writes the crops each device shows)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// YouTube's banner area every device shows (TV, desktop, phone), centred in the 2560x1440 banner
export const SAFE = { x: 507, y: 509, w: 1546, h: 423 };

const core = fs.readFileSync(path.join(SKILL, 'kit/core.js'), 'utf8');
// the paper texture is sized for a 1080x1920 frame and drawn in screen space (offset up to 480x640): grow it to cover each artwork
// (never below 3200x2600, the size the banners and avatars were first rendered at, so they stay byte-identical)
const kit = fs.readFileSync(path.join(SKILL, 'styles/paper-reel/kit.js'), 'utf8').replace('TW = 1600, TH = 2600', 'TW = Math.max(3200, W + 500), TH = Math.max(2600, H + 700)');
if (!kit.includes('TW = Math.max')) throw new Error('the paper texture size in styles/paper-reel/kit.js changed: update the patch in brand/render-lib.mjs');

const page = (a) => `<!doctype html><html><body style="margin:0"><canvas id="c" width="${a.W}" height="${a.H}"></canvas><script>
"use strict";
const FPS = 30, W = ${a.W}, H = ${a.H};
${core}
${kit}
ctx = document.getElementById('c').getContext('2d'); TT = 0.5; F = 15;
${a.draw}
window.DONE = true;
</script></body></html>`;

// what each surface shows: the banner's desktop strip and phone safe area; the avatar as a 98px circle (the grid is not uploaded)
const CROPS = {
  banner: { 'banner-desktop': [0, SAFE.y, 2560, SAFE.h, 1280], 'banner-phone': [SAFE.x, SAFE.y, SAFE.w, SAFE.h, 773] },
  avatar: { 'avatar-98': [0, 0, 800, 800, 98, true], 'avatar-176': [0, 0, 800, 800, 176, true] },
};

export async function render(channelUrl, ART) {
  const HERE = path.dirname(fileURLToPath(channelUrl));
  const args = process.argv.slice(2), pi = args.indexOf('--preview'), PREVIEW = pi >= 0 ? path.resolve(args.splice(pi, 2)[1]) : null;
  const OUT = path.resolve(args[0] ?? HERE);
  const browser = await chromium.launch();
  fs.mkdirSync(OUT, { recursive: true });
  for (const name of Object.keys(ART)) {
    // a fresh page per artwork: the kit's top-level consts can't be declared twice in one page
    const tab = await browser.newPage();
    tab.on('pageerror', (e) => { console.error('PAGE ERROR:', e.message); process.exitCode = 1; });
    await tab.setContent(page(ART[name]));
    await tab.waitForFunction(() => window.DONE);
    // the paper grain compresses poorly as PNG (the banner would pass YouTube's 6 MB cap), so the banner ships as JPEG
    const [mime, ext] = ART[name].jpeg ? ['image/jpeg', 'jpg'] : ['image/png', 'png'];
    const data = Buffer.from((await tab.evaluate(([m, q]) => document.getElementById('c').toDataURL(m, q), [mime, 0.92])).split(',')[1], 'base64');
    const file = path.join(OUT, `${name}.${ext}`);
    fs.writeFileSync(file, data);
    console.log(`${file}: ${ART[name].W}x${ART[name].H}, ${(data.length / 1e6).toFixed(2)} MB`);
    if (!PREVIEW) continue;
    fs.mkdirSync(PREVIEW, { recursive: true });
    for (const [cn, [x, y, w, h, outW, round]] of Object.entries(CROPS[name] ?? {})) {
      const url = await tab.evaluate(([x, y, w, h, outW, round]) => {
        const src = document.getElementById('c'), c = document.createElement('canvas'), k = outW / w;
        c.width = outW; c.height = Math.round(h * k); const g = c.getContext('2d');
        g.fillStyle = '#0f0f0f'; g.fillRect(0, 0, c.width, c.height);   // YouTube's dark theme behind the circle
        if (round) { g.beginPath(); g.arc(c.width / 2, c.height / 2, c.width / 2, 0, Math.PI * 2); g.clip(); }
        g.imageSmoothingQuality = 'high'; g.drawImage(src, x, y, w, h, 0, 0, c.width, c.height);
        return c.toDataURL('image/png');
      }, [x, y, w, h, outW, !!round]);
      fs.writeFileSync(path.join(PREVIEW, cn + '.png'), Buffer.from(url.split(',')[1], 'base64'));
    }
  }
  await browser.close();
}
