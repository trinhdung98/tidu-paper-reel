#!/usr/bin/env node
// Tidu Science YouTube channel art, drawn with the paper-reel kit (the same flasky() flask as the reels):
//   banner.jpg  2560x1440 (YouTube's recommended size). Every flask stays inside the centred 1546x423 safe area
//               that TV, desktop and phone all show; the rest is background that may be cropped.
//   avatar.png  800x800, shown as a circle (as small as 98x98): one smiling flask, centred, clear of the corners.
//   grid.jpg    every state of the flask: rows = no hat, each hat, the side view; columns = each mood (labelled with the code names).
//   usage: node brand/tidu-science/render.mjs [out dir] [--preview dir]   (--preview also writes the crops each device shows)
import { render, SAFE } from '../render-lib.mjs';

const ART = {
  banner: { W: 2560, H: 1440, jpeg: true, draw: `
    const S = ${JSON.stringify(SAFE)}, FLOOR = S.y + S.h - 34;
    prWall('#2f3540', { panel: 'rgba(255,255,255,0.04)', streak: false });
    // floating atoms, bubbles and stars, kept out of the flasks' strip
    const R = RNG('science-banner'), cols = [PR.mustard, PR.cream, PR.sciL, PR.sky, PR.orange];
    for (let i = 0; i < 70; i++) {
      const x = R.r(0, W), y = R.r(0, FLOOR), k = R.pick(['atom', 'bubble', 'bubble', '*']), c = R.pick(cols), r = R.r(16, 38);
      if (x > S.x - 30 && x < S.x + S.w + 30 && y > S.y - 40) continue;   // the propeller and party hat reach the top of the safe area
      if (k === 'atom') prAtom(x, y, r * 1.4, 'ba' + i);
      else if (k === '*') prStar(x, y, r * 0.9, c);
      else pp(pE(x, y, r * 0.6, r * 0.6), c, { key: 'bb' + i, sb: 6, sy: 3, tex: 0.4 });
    }
    prFloor(FLOOR, PR.woodD, { trim: false });
    pp(pR(-40, FLOOR - 14, W + 80, 26, 4), PR.wood, { key: 'shelf', sb: 10, sy: 5, tex: 0.6 });
    // a name plate on the floor: below the safe area, so only TVs (which show the whole banner) see it
    withT(W / 2, 1190, -0.015, 1, () => {
      pp(pR(-750, -128, 1520, 236, 6), PR.navyD, { key: 'plateback', sb: 10, sy: 5, tex: 0.5 });
      pp(pR(-760, -110, 1520, 220, 18), PR.creamL, { key: 'plate', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.6)' });
      txt('TIDU SCIENCE', 0, 50, 140, PR.navy, { align: 'center', weight: 800, track: 6 });
      [-680, 680].forEach((ax) => prAtom(ax, 0, 54, 'pl' + ax, 'rgba(28,43,86,0.75)'));
    });
    // the cast: every hat once, every mood at least once; the propeller-capped flask in the middle raises a test tube
    const cast = [['goggles', 'neutral'], ['astronaut', 'wow'], ['mortar', 'flat'], ['propeller', 'happy', { hand: { x: -300, y: -300 }, hold: propTube(-0.3) }], ['hardhat', 'happy'], ['explorer', 'neutral'], ['party', 'wow']];
    cast.forEach(([hat, mood, o], i) => {
      const mid = i === 3, s = mid ? 0.44 : 0.37, x = S.x + S.w * (i + 0.5) / cast.length;
      flasky(x, FLOOR - 16 - 80 * s, { s, hat, mood, key: 'cast' + i, ...o });
    });
    STYLE.post();` },
  avatar: { W: 800, H: 800, draw: `
    pp(pR(-40, -40, W + 80, H + 80, 0), '#2f3540', { key: 'awall', shadow: false, tex: 0.7 });
    ctx.save(); ctx.translate(W / 2, H * 0.47); ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 16; i += 2) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, W, i * TAU / 16, (i + 1) * TAU / 16); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    flasky(W / 2, 614, { s: 0.95, mood: 'happy', key: 'avatar' });
    STYLE.post();` },
  grid: { W: 1900, H: 4480, jpeg: true, draw: `
    const MOODS = ['neutral', 'happy', 'wow', 'flat'];
    const rows = [null, 'goggles', 'astronaut', 'mortar', 'propeller', 'hardhat', 'explorer', 'party'].map((hat) => ({ hat, label: hat ?? 'no hat' }));
    rows.push({ hat: null, view: 'side', label: "view: 'side'" });
    const LW = 220, TOP = 200, CW = (W - LW) / MOODS.length, RH = (H - TOP - 40) / rows.length, s = 0.5;
    prWall('#2f3540', { panel: 'rgba(255,255,255,0.04)', streak: false });
    txt('TIDU SCIENCE · flasky()', W / 2, 110, 80, PR.creamL, { align: 'center', weight: 800 });
    MOODS.forEach((m, c) => txt(m, LW + CW * (c + 0.5), TOP - 20, 42, PR.mustard, { align: 'center', weight: 800 }));
    rows.forEach((r, i) => {
      const y0 = TOP + RH * i;
      if (i % 2 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, y0, W, RH); }
      txt(r.label, 30, y0 + RH / 2 + 14, 36, PR.creamL, { weight: 800 });
      MOODS.forEach((mood, c) => flasky(LW + CW * (c + 0.5), y0 + RH - 30 - 80 * s, { s, hat: r.hat, mood, view: r.view, key: 'g' + i + c }));
    });
    STYLE.post();` },
};

await render(import.meta.url, ART);
