#!/usr/bin/env node
// Tidu Mind YouTube channel art, drawn with the paper-reel kit (the same brainy() brain as the reels):
//   banner.jpg  2560x1440 (YouTube's recommended size). Every brain stays inside the centred 1546x423 safe area
//               that TV, desktop and phone all show; the rest is background that may be cropped.
//   avatar.png  800x800, shown as a circle (as small as 98x98): one smiling brain, centred, clear of the corners.
//   grid.jpg    every state of the brain: rows = no hat, each hat, the side view; columns = each mood (labelled with the code names).
//   usage: node brand/tidu-mind/render.mjs [out dir] [--preview dir]   (--preview also writes the crops each device shows)
import { render, SAFE } from '../render-lib.mjs';

const ART = {
  banner: { W: 2560, H: 1440, jpeg: true, draw: `
    const S = ${JSON.stringify(SAFE)}, FLOOR = S.y + S.h - 34;
    prWall('#2e4f4f', { panel: 'rgba(255,255,255,0.04)', streak: false });
    // floating question and exclamation marks and stars, kept out of the brains' strip
    const R = RNG('mind-banner'), cols = [PR.mustard, PR.cream, PR.mindL, PR.pink, PR.orange];
    for (let i = 0; i < 70; i++) {
      const x = R.r(0, W), y = R.r(0, FLOOR), k = R.pick(['?', '?', '!', '*']), c = R.pick(cols), r = R.r(16, 38);
      if (x > S.x - 30 && x < S.x + S.w + 30 && y > S.y - 40) continue;   // the nightcap and party hat reach the top of the safe area
      if (k === '*') prStar(x, y, r * 0.9, c);
      else withT(x, y, R.r(-0.4, 0.4), 1, () => txt(k, 0, 0, r * 2.2, c, { align: 'center', base: 'middle', weight: 800 }));
    }
    prFloor(FLOOR, PR.woodD, { trim: false });
    pp(pR(-40, FLOOR - 14, W + 80, 26, 4), PR.wood, { key: 'shelf', sb: 10, sy: 5, tex: 0.6 });
    // a name plate on the floor: below the safe area, so only TVs (which show the whole banner) see it
    withT(W / 2, 1190, -0.015, 1, () => {
      pp(pR(-570, -128, 1160, 236, 6), PR.navyD, { key: 'plateback', sb: 10, sy: 5, tex: 0.5 });
      pp(pR(-580, -110, 1160, 220, 18), PR.creamL, { key: 'plate', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.6)' });
      txt('TIDU MIND', 0, 50, 140, PR.navy, { align: 'center', weight: 800, track: 6 });
      [-500, 500].forEach((qx) => txt('?', qx, 4, 110, PR.mind, { align: 'center', base: 'middle', weight: 800 }));
    });
    // the cast: every hat once, every mood at least once; the haloed brain in the middle waves
    const cast = [['nightcap', 'flat'], ['detective', 'neutral'], ['mortar', 'wow'], ['halo', 'happy', { hand: { x: -300, y: -330 } }], ['beret', 'happy'], ['phones', 'neutral'], ['party', 'wow']];
    cast.forEach(([hat, mood, o], i) => {
      const mid = i === 3, s = mid ? 0.44 : 0.37, x = S.x + S.w * (i + 0.5) / cast.length;
      brainy(x, FLOOR - 16 - 78 * s, { s, hat, mood, key: 'cast' + i, ...o });
    });
    STYLE.post();` },
  avatar: { W: 800, H: 800, draw: `
    pp(pR(-40, -40, W + 80, H + 80, 0), '#2e4f4f', { key: 'awall', shadow: false, tex: 0.7 });
    ctx.save(); ctx.translate(W / 2, H * 0.47); ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 16; i += 2) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, W, i * TAU / 16, (i + 1) * TAU / 16); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    brainy(W / 2, 590, { s: 1.05, mood: 'happy', key: 'avatar' });
    STYLE.post();` },
  grid: { W: 1900, H: 4480, jpeg: true, draw: `
    const MOODS = ['neutral', 'happy', 'wow', 'flat'];
    const rows = [null, 'nightcap', 'detective', 'mortar', 'beret', 'phones', 'halo', 'party'].map((hat) => ({ hat, label: hat ?? 'no hat' }));
    rows.push({ hat: null, view: 'side', label: "view: 'side'" });
    const LW = 220, TOP = 200, CW = (W - LW) / MOODS.length, RH = (H - TOP - 40) / rows.length;
    prWall('#2e4f4f', { panel: 'rgba(255,255,255,0.04)', streak: false });
    txt('TIDU MIND · brainy()', W / 2, 110, 80, PR.creamL, { align: 'center', weight: 800 });
    MOODS.forEach((m, c) => txt(m, LW + CW * (c + 0.5), TOP - 20, 42, PR.mustard, { align: 'center', weight: 800 }));
    rows.forEach((r, i) => {
      const y0 = TOP + RH * i;
      if (i % 2 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, y0, W, RH); }
      txt(r.label, 30, y0 + RH / 2 + 14, 36, PR.creamL, { weight: 800 });
      const s = r.view === 'side' ? 0.5 : 0.55;   // side-on the brain is wider than front-on
      MOODS.forEach((mood, c) => brainy(LW + CW * (c + 0.5), y0 + RH - 30 - 78 * s, { s, hat: r.hat, mood, view: r.view, key: 'g' + i + c }));
    });
    STYLE.post();` },
};

await render(import.meta.url, ART);
