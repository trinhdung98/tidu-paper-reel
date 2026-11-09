#!/usr/bin/env node
// Tidu Tech YouTube channel art, drawn with the paper-reel kit (the same botty() robot as the reels):
//   banner.jpg  2560x1440 (YouTube's recommended size). Every robot stays inside the centred 1546x423 safe area
//               that TV, desktop and phone all show; the rest is background that may be cropped.
//   avatar.png  800x800, shown as a circle (as small as 98x98): one smiling robot, centred, clear of the corners.
//   watermark.png  150x150 video watermark: the avatar's robot alone, as a cream-edged sticker on transparency.
//   grid.jpg    every state of the robot: rows = no hat, each hat, the side view; columns = each mood (labelled with the code names).
//   usage: node brand/tidu-tech/render.mjs [out dir] [--preview dir]   (--preview also writes the crops each device shows)
import { render, SAFE, watermark } from '../render-lib.mjs';

const WALL = '#142235';
const MASCOT = `botty(400, 672, { s: 0.92, mood: 'happy', key: 'avatar' });`;
const ART = {
  banner: { W: 2560, H: 1440, jpeg: true, draw: `
    const S = ${JSON.stringify(SAFE)}, FLOOR = S.y + S.h - 34;
    prWall('${WALL}', { panel: 'rgba(255,255,255,0.03)', streak: false });
    // circuit patches round the robots' strip, then floating binary digits and stars
    prCircuit(40, 60, S.x - 120, FLOOR - 120, 'bcL'); prCircuit(S.x + S.w + 80, 60, W - S.x - S.w - 120, FLOOR - 120, 'bcR');
    prCircuit(S.x + 40, 40, S.w - 80, S.y - 120, 'bcT');
    const R = RNG('tech-banner'), cols = [PR.glow, PR.techL, PR.mustard, 'rgba(79,240,255,0.55)'];
    for (let i = 0; i < 60; i++) {
      const x = R.r(0, W), y = R.r(0, FLOOR), k = R.pick(['0', '1', '1', '*']), c = R.pick(cols), r = R.r(14, 34);
      if (x > S.x - 30 && x < S.x + S.w + 30 && y > S.y - 40) continue;   // the tinfoil and party hats reach the top of the safe area
      if (k === '*') prStar(x, y, r * 0.8, c);
      else txt(k, x, y, r * 2, c, { align: 'center', base: 'middle', weight: 800, font: F_MONO });
    }
    prFloor(FLOOR, PR.char, { trim: false });
    pp(pR(-40, FLOOR - 14, W + 80, 26, 4), PR.techK, { key: 'shelf', sb: 10, sy: 5, tex: 0.6 });
    // a name plate on the floor: below the safe area, so only TVs (which show the whole banner) see it
    withT(W / 2, 1190, -0.015, 1, () => {
      pp(pR(-570, -128, 1160, 236, 6), PR.navyD, { key: 'plateback', sb: 10, sy: 5, tex: 0.5 });
      pp(pR(-580, -110, 1160, 220, 18), PR.creamL, { key: 'plate', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.6)' });
      txt('TIDU TECH', 0, 50, 140, PR.navy, { align: 'center', weight: 800, track: 6 });
      [-490, 490].forEach((cx) => txt('</>', cx, 4, 66, PR.blue, { align: 'center', base: 'middle', weight: 800, font: F_MONO }));
    });
    // the cast: every hat once, every mood at least once; the headset robot in the middle holds up an AI chip
    const cast = [['vr', 'neutral'], ['beanie', 'flat'], ['drone', 'wow'], ['headset', 'happy', { hand: { x: -215, y: -400 }, hold: propChip(-0.1) }], ['mortar', 'happy'], ['tinfoil', 'wow'], ['party', 'neutral']];
    cast.forEach(([hat, mood, o], i) => {
      const mid = i === 3, s = mid ? 0.44 : 0.37, x = S.x + S.w * (i + 0.5) / cast.length;
      botty(x, FLOOR - 16 - 70 * s, { s, hat, mood, key: 'cast' + i, ...o });
    });
    STYLE.post();` },
  avatar: { W: 800, H: 800, draw: `
    pp(pR(-40, -40, W + 80, H + 80, 0), '${WALL}', { key: 'awall', shadow: false, tex: 0.7 });
    ctx.save(); ctx.translate(W / 2, H * 0.47); ctx.fillStyle = 'rgba(79,240,255,0.06)';
    for (let i = 0; i < 16; i += 2) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, W, i * TAU / 16, (i + 1) * TAU / 16); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    ${MASCOT}
    STYLE.post();` },
  watermark: watermark(MASCOT),
  grid: { W: 1900, H: 4480, jpeg: true, draw: `
    const MOODS = ['neutral', 'happy', 'wow', 'flat'];
    const rows = [null, 'headset', 'vr', 'beanie', 'drone', 'mortar', 'tinfoil', 'party'].map((hat) => ({ hat, label: hat ?? 'no hat' }));
    rows.push({ hat: null, view: 'side', label: "view: 'side'" });
    const LW = 220, TOP = 200, CW = (W - LW) / MOODS.length, RH = (H - TOP - 40) / rows.length, s = 0.47;
    prWall('${WALL}', { panel: 'rgba(255,255,255,0.03)', streak: false });
    txt('TIDU TECH · botty()', W / 2, 110, 80, PR.creamL, { align: 'center', weight: 800 });
    MOODS.forEach((m, c) => txt(m, LW + CW * (c + 0.5), TOP - 20, 42, PR.mustard, { align: 'center', weight: 800 }));
    rows.forEach((r, i) => {
      const y0 = TOP + RH * i;
      if (i % 2 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, y0, W, RH); }
      txt(r.label, 30, y0 + RH / 2 + 14, 36, PR.creamL, { weight: 800 });
      MOODS.forEach((mood, c) => botty(LW + CW * (c + 0.5), y0 + RH - 24 - 70 * s, { s, hat: r.hat, mood, view: r.view, key: 'g' + i + c }));
    });
    STYLE.post();` },
};

await render(import.meta.url, ART);
