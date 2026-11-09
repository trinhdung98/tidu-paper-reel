#!/usr/bin/env node
// Tidu Math YouTube channel art, drawn with the paper-reel kit (the same tidu() owl as the reels):
//   banner.jpg  2560x1440 (YouTube's recommended size). Every owl stays inside the centred 1546x423 safe area
//               that TV, desktop and phone all show; the rest is background that may be cropped.
//   avatar.png  800x800, shown as a circle (as small as 98x98): one owl, centred, clear of the corners.
//   grid.jpg    every state of the owl: rows = no hat, each hat, the side view; columns = each mood (labelled with the code names).
//   usage: node brand/tidu-math/render.mjs [out dir] [--preview dir]   (--preview also writes the crops each device shows)
import { render, SAFE } from '../render-lib.mjs';

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
  grid: { W: 1900, H: 4480, jpeg: true, draw: `
    const MOODS = ['neutral', 'happy', 'wow', 'flat'];
    const rows = [null, 'mortar', 'propeller', 'chef', 'builder', 'crown', 'party', 'explorer'].map((hat) => ({ hat, label: hat ?? 'no hat' }));
    rows.push({ hat: null, view: 'side', label: "view: 'side'" });
    const LW = 220, TOP = 200, CW = (W - LW) / MOODS.length, RH = (H - TOP - 40) / rows.length;
    prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: false });
    txt('TIDU MATH · tidu()', W / 2, 110, 80, PR.creamL, { align: 'center', weight: 800 });
    MOODS.forEach((m, c) => txt(m, LW + CW * (c + 0.5), TOP - 20, 42, PR.mustard, { align: 'center', weight: 800 }));
    rows.forEach((r, i) => {
      const y0 = TOP + RH * i;
      if (i % 2 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, y0, W, RH); }
      txt(r.label, 30, y0 + RH / 2 + 14, 36, PR.creamL, { weight: 800 });
      MOODS.forEach((mood, c) => tidu(LW + CW * (c + 0.5), y0 + RH - 50, { s: 0.55, hat: r.hat, mood, view: r.view, key: 'g' + i + c }));
    });
    STYLE.post();` },
};

await render(import.meta.url, ART);
