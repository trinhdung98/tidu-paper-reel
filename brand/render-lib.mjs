// Shared renderer for the channel art in brand/<channel>/render.mjs. Each channel passes its artworks; each artwork is
// { W, H, jpeg?, draw } where draw is canvas code run in a page that has kit/core.js and the paper-reel style kit loaded
// (ctx, TT = 0.5, F = 15 are set first; draw may resize the canvas last). Writes <name>.png (or .jpg when jpeg) beside the
// channel script, or into [out dir].
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

// YouTube's video watermark (150x150, at most 1 MB, laid over the bottom-right corner of every video): the avatar's mascot
// alone, cut out as a cream-edged paper sticker on a transparent background so it reads over light and dark footage, then
// cropped to its own bounds and scaled to fit. `mascot` is the avatar's drawing code, laid out for its 800x800 canvas.
export const watermark = (mascot) => ({ W: 1000, H: 1000, draw: `{   // a block, so these names can't clash with the kit's globals
  const cv = ctx.canvas, snap = () => { const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; c.getContext('2d').drawImage(cv, 0, 0); return c; };
  ctx.save(); ctx.translate(100, 100);   // a 100px margin around the 800x800 layout for the sticker edge and its shadow
  ${mascot}
  ctx.restore();
  const body = snap();
  // the cut line follows the mascot's solid paper, not its soft drop shadows, grown by EDGE px
  const EDGE = 18, solid = snap(), sg = solid.getContext('2d'), px = sg.getImageData(0, 0, W, H);
  for (let i = 3; i < px.data.length; i += 4) px.data[i] = px.data[i] > 160 ? 255 : 0;
  sg.putImageData(px, 0, 0); sg.globalCompositeOperation = 'source-in'; sg.fillStyle = PR.creamL; sg.fillRect(0, 0, W, H);
  const cut = document.createElement('canvas'); cut.width = W; cut.height = H; const cg = cut.getContext('2d');
  for (const r of [EDGE, EDGE / 2]) for (let a = 0; a < 32; a++) cg.drawImage(solid, r * Math.cos(a * TAU / 32), r * Math.sin(a * TAU / 32));
  cg.drawImage(solid, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.save(); ctx.shadowColor = 'rgba(12,10,8,0.45)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6; ctx.drawImage(cut, 0, 0); ctx.restore();
  ctx.drawImage(body, 0, 0);
  // the paper grain and vignette, kept inside the sticker (on transparent pixels they would paint the background)
  const shape = snap();
  STYLE.post();
  ctx.save(); ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(shape, 0, 0); ctx.restore();
  const a = ctx.getImageData(0, 0, W, H).data;
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (a[(y * W + x) * 4 + 3] > 8) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const art = snap(), SIZE = 150, PAD = 2, bw = x1 - x0 + 1, bh = y1 - y0 + 1, k = (SIZE - 2 * PAD) / Math.max(bw, bh);
  cv.width = cv.height = SIZE; ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(art, x0, y0, bw, bh, (SIZE - bw * k) / 2, (SIZE - bh * k) / 2, bw * k, bh * k);
}` });

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
    const [url, w, h] = await tab.evaluate(([m, q]) => { const c = document.getElementById('c'); return [c.toDataURL(m, q), c.width, c.height]; }, [mime, 0.92]);
    const data = Buffer.from(url.split(',')[1], 'base64');
    const file = path.join(OUT, `${name}.${ext}`);
    fs.writeFileSync(file, data);
    console.log(`${file}: ${w}x${h}, ${(data.length / 1e6).toFixed(2)} MB`);
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
