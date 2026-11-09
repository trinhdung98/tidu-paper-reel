#!/usr/bin/env node
// Tidu English YouTube channel art, drawn with the paper-reel kit (the same polly() parrot as the reels):
//   banner.jpg  2560x1440 (YouTube's recommended size). Every parrot stays inside the centred 1546x423 safe area
//               that TV, desktop and phone all show; the rest is background that may be cropped.
//   avatar.png  800x800, shown as a circle (as small as 98x98): one smiling parrot with its crest showing, centred, clear of the corners.
//   grid.jpg    every state of the parrot: rows = no hat, each hat, the side view; columns = each mood (labelled with the code names).
//   usage: node brand/tidu-english/render.mjs [out dir] [--preview dir]   (--preview also writes the crops each device shows)
import { render, SAFE } from '../render-lib.mjs';

const WALL = '#c9b28a';
const ART = {
  banner: { W: 2560, H: 1440, jpeg: true, draw: `
    const S = ${JSON.stringify(SAFE)}, FLOOR = S.y + S.h - 34;
    prWall('${WALL}', { panel: 'rgba(255,255,255,0.06)', streak: false });
    // floating paper letters and stars, kept out of the parrots' strip
    const R = RNG('english-banner'), cols = [PR.red, PR.blue, PR.green, PR.navy, PR.paperW, PR.orange];
    for (let i = 0; i < 70; i++) {
      const x = R.r(0, W), y = R.r(0, FLOOR), k = R.pick(['letter', 'letter', 'letter', '*']), c = R.pick(cols), r = R.r(16, 38);
      if (x > S.x - 30 && x < S.x + S.w + 30 && y > S.y - 40) continue;   // the guard and wizard hats reach the top of the safe area
      if (k === '*') prStar(x, y, r * 0.9, c);
      else withT(x, y, R.r(-0.4, 0.4), 1, () => txt(String.fromCharCode(65 + R.i(0, 25)), 0, 0, r * 2.2, c, { align: 'center', base: 'middle', weight: 800 }));
    }
    prFloor(FLOOR, PR.woodD, { trim: false });
    pp(pR(-40, FLOOR - 14, W + 80, 26, 4), PR.wood, { key: 'shelf', sb: 10, sy: 5, tex: 0.6 });
    // a name plate on the floor: below the safe area, so only TVs (which show the whole banner) see it
    withT(W / 2, 1190, -0.015, 1, () => {
      pp(pR(-750, -128, 1520, 236, 6), PR.navyD, { key: 'plateback', sb: 10, sy: 5, tex: 0.5 });
      pp(pR(-760, -110, 1520, 220, 18), PR.creamL, { key: 'plate', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.6)' });
      txt('TIDU ENGLISH', 0, 50, 140, PR.navy, { align: 'center', weight: 800, track: 6 });
      prBlock(-670, 4, 'A', PR.red, 0.62, -0.06); prBlock(660, 4, 'Z', PR.blue, 0.62, 0.06);
    });
    // the cast: every hat once, every mood at least once; the crowned parrot in the middle holds up an A card
    const cast = [['mortar', 'neutral'], ['guard', 'flat'], ['pirate', 'wow'], ['crown', 'happy', { hand: { x: -250, y: -400 }, hold: propCard('A', -0.1) }], ['cap', 'happy'], ['wizard', 'neutral'], ['party', 'wow']];
    cast.forEach(([hat, mood, o], i) => {
      const mid = i === 3, s = mid ? 0.44 : 0.37, x = S.x + S.w * (i + 0.5) / cast.length;
      polly(x, FLOOR - 16 - 44 * s, { s, hat, mood, key: 'cast' + i, ...o });
    });
    STYLE.post();` },
  avatar: { W: 800, H: 800, draw: `
    pp(pR(-40, -40, W + 80, H + 80, 0), '${WALL}', { key: 'awall', shadow: false, tex: 0.7 });
    ctx.save(); ctx.translate(W / 2, H * 0.47); ctx.fillStyle = 'rgba(255,255,255,0.14)';
    for (let i = 0; i < 16; i += 2) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, W, i * TAU / 16, (i + 1) * TAU / 16); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    polly(W / 2, 663, { s: 1, mood: 'happy', key: 'avatar' });
    STYLE.post();` },
  grid: { W: 1900, H: 4480, jpeg: true, draw: `
    const MOODS = ['neutral', 'happy', 'wow', 'flat'];
    const rows = [null, 'mortar', 'guard', 'crown', 'cap', 'pirate', 'wizard', 'party'].map((hat) => ({ hat, label: hat ?? 'no hat' }));
    rows.push({ hat: null, view: 'side', label: "view: 'side'" });
    const LW = 220, TOP = 200, CW = (W - LW) / MOODS.length, RH = (H - TOP - 40) / rows.length, s = 0.5;
    prWall('${WALL}', { panel: 'rgba(255,255,255,0.06)', streak: false });
    txt('TIDU ENGLISH · polly()', W / 2, 110, 80, PR.navy, { align: 'center', weight: 800 });
    MOODS.forEach((m, c) => txt(m, LW + CW * (c + 0.5), TOP - 20, 42, PR.redD, { align: 'center', weight: 800 }));
    rows.forEach((r, i) => {
      const y0 = TOP + RH * i;
      if (i % 2 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(0, y0, W, RH); }
      txt(r.label, 30, y0 + RH / 2 + 14, 36, PR.navy, { weight: 800 });
      MOODS.forEach((mood, c) => polly(LW + CW * (c + 0.5), y0 + RH - 30 - 44 * s, { s, hat: r.hat, mood, view: r.view, key: 'g' + i + c }));
    });
    STYLE.post();` },
};

await render(import.meta.url, ART);
