// =====================================================================
//  TIDU MATH 06 — "Một nửa có bằng hai phần tư?" One scene per voice line. Two equal paper sheets: the left one is cut
//  in 2 and one part is coloured, the right one in 4 and two parts are coloured; then the right sheet slides over the left
//  and the coloured parts cover each other exactly: 1/2 = 2/4.
// =====================================================================
TIDU_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const OWL_X = 880, OWL_Y = 1800, KICK = 'TIDU MATH · PHÂN SỐ';
const SCENES = {};
const FS = { s: 340, y: 720, ax: 275, bx: 770, paper: '#f6ead2', fill: '#5fa79c', edge: '#3b3934', labelY: 1010 };

// a sheet of `parts` vertical strips centred at (cx, cy); o.split 0..1 draws the cut lines, o.fill 0..1 colours the
// first `shaded` strips from the bottom up; o.alpha for the overlay
function fsSheet(cx, cy, parts, shaded, o = {}) {
  const s = FS.s, w = s / parts;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha = o.alpha;
  withT(cx, cy, o.rot ?? 0, o.scale ?? 1, () => {
    const X = -s / 2, Y = -s / 2;
    pp(pR(X - 12, Y - 12, s + 24, s + 24, 10), FS.edge, { key: (o.key ?? 's') + 'e', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(X, Y, s, s, 4), FS.paper, { key: (o.key ?? 's') + 'p', shadow: false, tex: 0.5 });
    const f = o.fill ?? 0;
    if (f > 0 && shaded > 0) { ctx.save(); ctx.beginPath(); ctx.rect(X, Y + s * (1 - f), w * shaded, s * f); ctx.clip(); pp(pR(X, Y, w * shaded, s, 2), FS.fill, { key: (o.key ?? 's') + 'f', shadow: false, tex: 0.5 }); ctx.restore(); }
    for (let k = 1; k < parts; k++) { const sx = X + k * w; chalkLine([[sx, Y], [sx, Y + s]], o.split == null ? 1 : clamp((o.split - (k - 1) / parts) * parts), { color: FS.edge, w: 10 }); }
  });
  ctx.restore();
}
// a stacked fraction n/d (numerator over a bar over the denominator)
function fsFrac(x, y, n, d, size, color, s = 1) {
  withT(x, y, 0, s, () => {
    txt(String(n), 0, -size * 0.18, size, color, { align: 'center', weight: 800 });
    pp(pR(-size * 0.45, -size * 0.05, size * 0.9, size * 0.1, size * 0.05), color, { shadow: false, tex: false });
    txt(String(d), 0, size * 0.86, size, color, { align: 'center', weight: 800 });
  });
}
function fsTag(str, x, y, t, fill, rot = -0.04) {
  withT(x, y, rot, popS(t), () => { const w = txtW(str, 46) + 44; pp(pR(-w / 2, -38, w, 76, 12), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.5 }); txt(str, 0, 17, 46, PR.creamL, { align: 'center', weight: 800 }); });
}
function fsStars(pts) { pts.forEach(([x, y, r], i) => prStar(x, y, r * (1 + Math.sin(TT * 3 + i * 1.7) * 0.12), i % 2 ? PR.yellow : PR.mustard)); }

// ---- times shared by scenes and sound cues
const fsCutA = () => VW('half', 'chia').t0, fsFillA = () => VW('half', 'tô').t0;
const fsCutB = () => VW('quarter', 'chia').t0, fsFillB = () => VW('quarter', 'tô').t0;
const fsSlide = () => VL('look').t0 + 0.2;
const fsStamp = () => VW('equal', 'bằng').t0;

SCENES.hook = () => {   // a classroom: both sheets already coloured; which is bigger? <, =, > chips flicker between them
  const t0 = E0, tq = VW('hook', 'nào').t0;
  prWall(PR.slate, { streak: 620 });
  prBunting(-14, undefined, 'bun1');
  prFloor(1560, PR.woodD, { trim: false });
  fsStars([[960, 1180, 18], [880, 1250, 12]]);
  fsSheet(FS.ax, FS.y, 2, 1, { key: 'a', fill: 1, scale: popS(t0 + 0.05) });
  fsSheet(FS.bx, FS.y, 4, 2, { key: 'b', fill: 1, scale: popS(t0 + 0.25) });
  fsFrac(FS.ax, FS.labelY, 1, 2, 80, PR.creamL, popS(t0 + 0.4));
  fsFrac(FS.bx, FS.labelY, 2, 4, 80, PR.creamL, popS(t0 + 0.55));
  const sym = TT < tq ? '?' : ['<', '=', '>'][Math.floor((TT - tq) * 3) % 3];
  withT((FS.ax + FS.bx) / 2, FS.y, 0, popS(t0 + 0.6), () => { pp(pE(0, 0, 54, 54), PR.mustard, { key: 'cmp', sb: 12, sy: 6, tex: 0.5 }); txt(sym, 0, 26, 76, PR.navy, { align: 'center', weight: 800 }); });
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o1', look: -16, mood: 'wow' });
  prSign('1/2 HAY 2/4 LỚN HƠN?', { kicker: KICK });
  prChips();
};
SCENES.same = () => {   // a night desk: two blank sheets, the same width and height (paper rulers)
  const tb = VW('same', 'bằng').t0;
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floor, { studs: true });
  pp(pE(990, 1210, 40, 40), '#f3e3a5', { key: 'moon', sb: 14, sy: 4, tex: 0.5 });
  fsSheet(FS.ax, FS.y, 1, 0, { key: 'a' }); fsSheet(FS.bx, FS.y, 1, 0, { key: 'b' });
  [FS.ax, FS.bx].forEach((x, i) => {
    const y = FS.y + FS.s / 2 + 50;
    chalkLine([[x - FS.s / 2, y], [x + FS.s / 2, y]], ev(tb - 0.4 + i * 0.15, 0.4), { color: PR.mustard, w: 7 });
    prCheck(x, y + 70, tb + 0.2 + i * 0.15, 38);
  });
  fsTag('diện tích bằng nhau', 520, 450, tb, PR.green, -0.03);
  tidu(OWL_X, OWL_Y, { hat: 'builder', key: 'o2', look: -16, mood: TT > tb ? 'happy' : 'neutral' });
  prSign('HAI TỜ GIẤY BẰNG NHAU', { kicker: KICK });
  prChips();
};
SCENES.half = () => {   // a plum studio: the left sheet is cut in two, one half fills with colour, 1/2 appears
  const tc = fsCutA(), tf = fsFillA();
  prWall(PR.plum, { panel: 'rgba(0,0,0,0.10)', gap: 120, streak: 420 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(960, 1230, 56, 2, 10 + TT * 6, 'clk3');
  fsSheet(FS.ax, FS.y, 2, 1, { key: 'a', split: ev(tc, 0.5), fill: EZ.o2(ev(tf, 0.7)) });
  fsSheet(FS.bx, FS.y, 1, 0, { key: 'b' });
  fsFrac(FS.ax, FS.labelY, 1, 2, 80, PR.creamL, popS(tf + 0.6));
  tidu(OWL_X, OWL_Y, { hat: 'chef', key: 'o3', look: -16, mood: TT > tf ? 'happy' : 'neutral' });
  prSign('CHIA 2 PHẦN, TÔ 1', { kicker: KICK });
  prChips();
};
SCENES.quarter = () => {   // a teal room: the right sheet is cut in four, two parts fill, 2/4 appears
  const tc = fsCutB(), tf = fsFillB();
  prWall(PR.teal, { panel: 'rgba(255,255,255,0.06)', streak: 380 });
  prFloor(1560, PR.woodD, { trim: false });
  fsStars([[1000, 1230, 16]]);
  fsSheet(FS.ax, FS.y, 2, 1, { key: 'a', fill: 1 });
  fsSheet(FS.bx, FS.y, 4, 2, { key: 'b', split: ev(tc, 0.9), fill: EZ.o2(ev(tf, 0.7)) });
  fsFrac(FS.ax, FS.labelY, 1, 2, 80, PR.creamL);
  fsFrac(FS.bx, FS.labelY, 2, 4, 80, PR.creamL, popS(tf + 0.6));
  tidu(OWL_X, OWL_Y, { hat: 'mortar', key: 'o4', look: -16, mood: TT > tf ? 'happy' : 'neutral' });
  prSign('CHIA 4 PHẦN, TÔ 2', { kicker: KICK });
  prChips();
};
SCENES.look = () => {   // a sand kitchen: the right sheet slides over the left one; the coloured parts match exactly
  const ts = fsSlide(), tk = VW('look', 'hoàn').t0;
  prWall('#c9b28a', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1560, PR.floorD, { trim: false });
  fsStars([[1000, 1240, 16], [880, 1260, 12]]);
  fsSheet(FS.ax, FS.y, 2, 1, { key: 'a', fill: 1 });
  const bx = springMove(ts, FS.bx, FS.ax, SPRING.smooth);
  fsSheet(bx, FS.y - 20 * Math.sin(clamp((TT - ts) / 0.8) * Math.PI), 4, 2, { key: 'b', fill: 1, alpha: lerp(1, 0.6, ev(ts, 0.6)) });
  if (TT > tk - 0.2) { ctx.save(); ctx.strokeStyle = PR.yellow; ctx.lineWidth = 10; ctx.setLineDash([18, 10]); ctx.lineDashOffset = -TT * 40; ctx.strokeRect(FS.ax - FS.s / 2 - 6, FS.y - FS.s / 2 - 6, FS.s / 2 + 12, FS.s + 12); ctx.restore(); }
  prCheck(FS.ax + FS.s / 2 + 70, FS.y - 120, tk, 50);
  fsTag('chồng khít!', 640, 1010, tk + 0.1, PR.green, 0.04);
  tidu(OWL_X, OWL_Y, { hat: 'explorer', key: 'o5', look: -18, hand: { x: -300, y: -300 }, hold: propGlass(-0.5), mood: TT > tk ? 'happy' : 'flat' });
  prSign('PHẦN TÔ CHỒNG KHÍT', { kicker: KICK });
  prChips();
};
SCENES.equal = () => {   // dusk: the sheets apart again, 1/2 = 2/4 and an "equal" stamp
  const ts = fsStamp();
  prWall('#4a4566', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floorD, { trim: false });
  fsSheet(FS.ax, FS.y - 40, 2, 1, { key: 'a', fill: 1, scale: 0.8 });
  fsSheet(FS.bx, FS.y - 40, 4, 2, { key: 'b', fill: 1, scale: 0.8 });
  fsFrac(FS.ax, FS.labelY, 1, 2, 90, PR.creamL);
  withT((FS.ax + FS.bx) / 2, FS.labelY + 30, 0, popS(ts - 0.1), () => txt('=', 0, 0, 110, PR.mustard, { align: 'center', weight: 800 }));
  fsFrac(FS.bx, FS.labelY, 2, 4, 90, PR.creamL);
  prStamp('BẰNG NHAU', 520, 1250, PR.red, ts + 0.4, { rot: -0.06, size: 80 });
  prBurst(520, 1250, ts + 0.56, { n: 22 });
  tidu(OWL_X, OWL_Y, { hat: 'crown', key: 'o6', look: -14, mood: TT > ts + 0.5 ? 'happy' : 'neutral' });
  prSign('1/2 = 2/4', { kicker: KICK });
  prChips();
};
SCENES.tip = () => {   // a warm studio: 2 parts vs 4 parts, the same coloured amount
  const tp = VW('tip', 'phần').t0, tl = VW('tip', 'lượng').t0;
  prWall(PR.slate, { panel: 'rgba(0,0,0,0.04)', streak: 300 });
  prFloor(1560, PR.woodD, { trim: false });
  fsSheet(FS.ax, FS.y, 2, 1, { key: 'a', fill: 1, scale: 0.85 });
  fsSheet(FS.bx, FS.y, 4, 2, { key: 'b', fill: 1, scale: 0.85 });
  fsTag('2 phần', FS.ax, 470, tp, PR.navy, -0.05);
  fsTag('4 phần', FS.bx, 470, tp + 0.2, PR.navy, 0.05);
  [FS.ax, FS.bx].forEach((x, i) => { const y = FS.y + FS.s * 0.425 + 50, w = FS.s * 0.85 / 2; chalkLine([[x - FS.s * 0.425, y], [x - FS.s * 0.425 + w, y]], ev(tl + i * 0.15, 0.4), { color: PR.yellow, w: 10 }); });
  fsTag('lượng tô bằng nhau', 520, 1060, tl + 0.4, PR.green, -0.03);
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o7', look: -14, mood: 'happy' });
  prSign('SỐ PHẦN KHÁC, LƯỢNG BẰNG', { kicker: KICK });
  prChips();
};
SCENES.cta = () => {   // a corkboard: a third sheet cut in six — how many parts make one half?
  const tq = VW('cta', 'phân').t0, tend = VL('cta').words[VL('cta').words.length - 1].t0;
  prWall('#c79a5b', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1600, PR.floorD, { trim: false });
  prCorkboard(70, 430, 860, 640, 'cork8');
  fsSheet(330, 760, 6, 0, { key: 'c', scale: 0.9, split: ev(E0 + 0.2, 0.8) });
  withT(700, 680, 0.03, popS(tq), () => { prNote(0, 0, 300, 260, '#f3e3a5', 0, 'cq'); fsFrac(-70, -20, 1, 2, 66, PR.navy); txt('=', 0, 26, 70, PR.navy, { align: 'center', weight: 800 }); fsFrac(80, -20, '?', 6, 66, PR.red); });
  fsTag('Bình luận đáp án!', 500, 1150, tend, PR.navy);
  tidu(OWL_X, OWL_Y, { hat: 'party', key: 'o8', look: -16, mood: TT > tend ? 'happy' : 'wow' });
  prSign('TÌM PHÂN SỐ BẰNG 1/2', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE — one shot per line (in script order); SPLITS = [[lineId, word, n, sceneKey]] cut again on a word
// =====================================================================
const SPLITS = [];
// sound cues: 'type' (n clicks over d s), 'tick', 'pop', 'thud' (stamp), 'chime'. Static: computed from VOICE, never during a frame.
function SFX_CUES() {
  const c = [{ k: 'pop', t: 0.1 }, { k: 'pop', t: 0.3 }];
  c.push({ k: 'tick', t: fsCutA() + 0.3 }, { k: 'pop', t: fsFillA() + 0.6 });
  for (let k = 0; k < 3; k++) c.push({ k: 'tick', t: fsCutB() + 0.3 * k });
  c.push({ k: 'pop', t: fsFillB() + 0.6 }, { k: 'pop', t: VW('look', 'hoàn').t0 });
  c.push({ k: 'thud', t: fsStamp() + 0.56 });
  c.push({ k: 'chime', t: VL('cta').words[VL('cta').words.length - 1].t0 });
  return c;
}
const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const TIMELINE = {
  width: W, height: H, fps: FPS, duration: DURATION, frames: NFRAMES, loop: LOOP_T, safe: SAFE, format: 'voice-cut',
  shots: SHOT_LIST.map(([t0, sc], i) => ({ id: i + 1, key: sc, era: i, t0, t1: ERA_LIST[i][1], title: sc })),
  cuts: SHOT_LIST.slice(1).map(([t0]) => t0), morphs: [], cues: {},
  acts: [{ name: 'reel', role: 'journey', t0: 0, t1: DURATION }],
  board: SHOT_LIST.map(([t0, sc], i) => ({ t: (t0 + ERA_LIST[i][1]) / 2 + 0.3, title: sc, sound: '', next: 'cut' })),
  narration: VOICE.lines.map((l) => ({ t0: l.t0, t1: l.t1, text: l.text })),
};
window.TIMELINE = TIMELINE;
