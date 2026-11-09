#!/usr/bin/env node
// Tidu Math YouTube channel art, drawn with the paper-reel kit (the same tidu() owl as the reels):
//   banner.jpg  2560x1440 (YouTube's recommended size). Every owl stays inside the centred 1546x423 safe area
//               that TV, desktop and phone all show; the rest is background that may be cropped.
//   avatar.png  800x800, shown as a circle (as small as 98x98): one owl, centred, clear of the corners.
//   usage: node brand/tidu-math/render.mjs [out dir] [--preview dir]   (--preview also writes the crops each device shows)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const HERE = path.dirname(fileURLToPath(import.meta.url)), SKILL = path.resolve(HERE, '../..');
const args = process.argv.slice(2), pi = args.indexOf('--preview'), PREVIEW = pi >= 0 ? path.resolve(args.splice(pi, 2)[1]) : null;
const OUT = path.resolve(args[0] ?? HERE);
const core = fs.readFileSync(path.join(SKILL, 'kit/core.js'), 'utf8');
// the paper texture is sized for a 1080x1920 frame and drawn in screen space; the banner is 2560 wide, so it needs a wider sheet
const kit = fs.readFileSync(path.join(SKILL, 'styles/paper-reel/kit.js'), 'utf8').replace('TW = 1600, TH = 2600', 'TW = 3200, TH = 2600');
if (!kit.includes('TW = 3200')) throw new Error('the paper texture size in styles/paper-reel/kit.js changed: update the patch in render.mjs');

const SAFE = { x: 507, y: 509, w: 1546, h: 423 };
const ART = {
  banner: { W: 2560, H: 1440, jpeg: true, draw: `
    const S = ${JSON.stringify(SAFE)}, FLOOR = S.y + S.h - 34;
    prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: false });
    // floating paper math signs and stars, kept out of the owls' strip
    const R = RNG('tidu-banner'), cols = [PR.mustard, PR.cream, PR.tealL, PR.pink, PR.orange];
    for (let i = 0; i < 70; i++) {
      const x = R.r(0, W), y = R.r(0, FLOOR), k = R.pick(['+', '−', '×', '÷', '*']), c = R.pick(cols), r = R.r(16, 38);
      if (x > S.x - 30 && x < S.x + S.w + 30 && y > S.y + 70) continue;
      if (k === '*') prStar(x, y, r * 0.9, c); else withT(x, y, R.r(-0.4, 0.4), 1, () => tiduSym(k, 0, 0, r, c, 'bs' + i));
    }
    prFloor(FLOOR, PR.woodD, { trim: false });
    pp(pR(-40, FLOOR - 14, W + 80, 26, 4), PR.wood, { key: 'shelf', sb: 10, sy: 5, tex: 0.6 });
    // a name plate on the floor: below the safe area, so only TVs (which show the whole banner) see it
    withT(W / 2, 1190, -0.015, 1, () => {
      pp(pR(-570, -128, 1160, 236, 6), PR.navyD, { key: 'plateback', sb: 10, sy: 5, tex: 0.5 });
      pp(pR(-580, -110, 1160, 220, 18), PR.creamL, { key: 'plate', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.6)' });
      txt('TIDU MATH', 0, 50, 140, PR.navy, { align: 'center', weight: 800, track: 6 });
      tiduSym('+', -500, 0, 34, PR.tidu, 'pl+'); tiduSym('÷', 500, 0, 34, PR.tidu, 'pl÷');
    });
    // the cast: every hat once, every mood at least once; the crowned owl in the middle waves
    const cast = [['mortar', 'neutral'], ['propeller', 'wow'], ['chef', 'happy'], ['crown', 'happy', { hand: { x: -310, y: -400 } }], ['builder', 'flat'], ['party', 'wow'], ['explorer', 'neutral']];
    cast.forEach(([hat, mood, o], i) => {
      const mid = i === 3, x = S.x + S.w * (i + 0.5) / cast.length;
      tidu(x, FLOOR - 16, { s: mid ? 0.47 : 0.4, hat, mood, key: 'cast' + i, ...o });
    });
    STYLE.post();` },
  avatar: { W: 800, H: 800, draw: `
    pp(pR(-40, -40, W + 80, H + 80, 0), PR.yellow, { key: 'awall', shadow: false, tex: 0.7 });
    ctx.save(); ctx.translate(W / 2, H * 0.47); ctx.fillStyle = 'rgba(255,255,255,0.16)';
    for (let i = 0; i < 16; i += 2) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, W, i * TAU / 16, (i + 1) * TAU / 16); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    tidu(W / 2, 742, { s: 0.98, hat: 'mortar', mood: 'neutral', key: 'avatar' });
    STYLE.post();` },
};

const page = (name) => { const a = ART[name]; return `<!doctype html><html><body style="margin:0"><canvas id="c" width="${a.W}" height="${a.H}"></canvas><script>
"use strict";
const FPS = 30, W = ${a.W}, H = ${a.H};
${core}
${kit}
ctx = document.getElementById('c').getContext('2d'); TT = 0.5; F = 15;
${a.draw}
window.DONE = true;
</script></body></html>`; };

const browser = await chromium.launch();
fs.mkdirSync(OUT, { recursive: true });
for (const name of Object.keys(ART)) {
  // a fresh page per artwork: the kit's top-level consts can't be declared twice in one page
  const tab = await browser.newPage();
  tab.on('pageerror', (e) => { console.error('PAGE ERROR:', e.message); process.exitCode = 1; });
  await tab.setContent(page(name));
  await tab.waitForFunction(() => window.DONE);
  // the paper grain compresses poorly as PNG (the banner would pass YouTube's 6 MB cap), so the banner ships as JPEG
  const [mime, ext] = ART[name].jpeg ? ['image/jpeg', 'jpg'] : ['image/png', 'png'];
  const data = Buffer.from((await tab.evaluate(([m, q]) => document.getElementById('c').toDataURL(m, q), [mime, 0.92])).split(',')[1], 'base64');
  const file = path.join(OUT, `${name}.${ext}`);
  fs.writeFileSync(file, data);
  console.log(`${file}: ${ART[name].W}x${ART[name].H}, ${(data.length / 1e6).toFixed(2)} MB`);
  if (!PREVIEW) continue;
  fs.mkdirSync(PREVIEW, { recursive: true });
  // what each surface shows: the banner's desktop strip and phone safe area; the avatar as a 98px circle
  const crops = name === 'banner'
    ? { 'banner-desktop': [0, SAFE.y, 2560, SAFE.h, 1280], 'banner-phone': [SAFE.x, SAFE.y, SAFE.w, SAFE.h, 773] }
    : { 'avatar-98': [0, 0, 800, 800, 98, true], 'avatar-176': [0, 0, 800, 800, 176, true] };
  for (const [cn, [x, y, w, h, outW, round]] of Object.entries(crops)) {
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
