// =====================================================================
//  TIDU MATH 01 — "Có bao nhiêu hình vuông?" One scene per voice line. The 3×3 grid keeps the same place and size
//  through the first five scenes so the eye can keep counting across the cuts. Colour codes the square sizes:
//  yellow 1×1, orange 2×2, teal 3×3; the sum scene reuses them.
// =====================================================================
TIDU_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const OWL_X = 880, OWL_Y = 1800, KICK = 'TIDU MATH · ĐỐ VUI';
const SCENES = {};
const TM = { cell: '#f7ead0', frame: '#3b3934', one: '#f2c94c', two: '#ef9a52', ring2: '#d9701c', three: '#2aa79b', ring3: '#17766d' };
function tmGeo(x, y, s) { const p = s * 0.026, l = s * 0.02; return { x, y, s, p, l, c: (s - 2 * p - 2 * l) / 3 }; }
const TG = tmGeo(80, 450, 700);
const TM_TWOS = [[0, 0], [0, 1], [1, 0], [1, 1]];
const tmSq = (g, r, c, k) => [g.x + g.p + c * (g.c + g.l), g.y + g.p + r * (g.c + g.l), k * g.c + (k - 1) * g.l];

// ---- times shared by the scenes and the sound cues
const tmTimer0 = () => VL('hook').t1 + 0.15, tmTimer1 = () => VL('ones').t0 - 0.3;
const tmOnes = () => { const a = VW('ones', 'chín').t0; return Array.from({ length: 9 }, (_, i) => a + i * 0.36); };
const tmTwos = () => { const a = VW('twos', 'thêm').t0 - 0.1; return [VW('twos', 'ghép').t0, a, a + 1.15, a + 2.3]; };
const tmSum = () => [VW('sum', 'chín').t0, VW('sum', 'bốn').t0, VW('sum', 'một').t0, VW('sum', 'mười').t0];

// ---- the grid: o.tint [[r, c, k, colour, alpha]], o.ring [[r, c, k, colour, frac, width]], o.cellPop(r, c) -> scale
function tmGrid(g, o = {}) {
  const key = o.key ?? 'tg';
  if (o.sheet !== false) pp(pR(g.x - 34, g.y - 34, g.s + 68, g.s + 68, 8), PR.paperW, { key: key + 'sh', sb: 24, sy: 12, tex: 0.5 });
  pp(pR(g.x, g.y, g.s, g.s, g.s * 0.035), TM.frame, { key: key + 'fr', sb: o.sheet === false ? 10 : 4, sy: 4, tex: 0.5 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const [x, y, w] = tmSq(g, r, c, 1), k = o.cellPop ? o.cellPop(r, c) : 1;
    withT(x + w / 2, y + w / 2, 0, k, () => pp(pR(-w / 2, -w / 2, w, w, g.s * 0.012), TM.cell, { key: key + 'c' + r + c, shadow: false, tex: 0.45 }));
  }
  for (const [r, c, k, col, a] of o.tint ?? []) {
    if (a <= 0.01) continue;
    ctx.save(); ctx.globalAlpha = clamp(a);
    for (let rr = r; rr < r + k; rr++) for (let cc = c; cc < c + k; cc++) { const [x, y, w] = tmSq(g, rr, cc, 1); pp(pR(x, y, w, w, g.s * 0.012), col, { key: key + 't' + rr + cc + col, shadow: false, tex: 0.4 }); }
    ctx.restore();
  }
  for (const [r, c, k, col, frac, wd] of o.ring ?? []) tmRing(g, r, c, k, col, frac, wd);
}
// a dashed square outline drawn on along its edge (frac 0..1); the 3×3 ring sits outside the frame
function tmRing(g, r, c, k, col, frac = 1, wd = 1) {
  if (frac <= 0.001) return;
  const [x, y, w] = tmSq(g, r, c, k), d = k === 3 ? g.p + g.s * 0.03 : g.l * 0.5, X = x - d, Y = y - d, S = w + 2 * d;
  const P = subPath([[X, Y], [X + S, Y], [X + S, Y + S], [X, Y + S], [X, Y]], frac);
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = g.s * 0.018 * (wd ?? 1); ctx.lineJoin = 'miter'; ctx.setLineDash([g.s * 0.034, g.s * 0.018]);
  ctx.shadowColor = 'rgba(12,10,8,0.3)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 3;
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore();
}
// the hook's paper sheet unfolding from its top edge (u 0..1)
function tmUnfold(u, fn) {
  if (u <= 0.01) return;
  ctx.save(); ctx.translate(0, TG.y - 34); ctx.scale(1, u); ctx.translate(0, -(TG.y - 34)); fn(); ctx.restore();
}
// the paper count-down timer: a mustard wedge that drains between tmTimer0 and tmTimer1, the seconds left in the middle
function tmTimer(x, y, r, key) {
  const a = tmTimer0(), b = tmTimer1(), k = popS(a - 0.25); if (k <= 0.01) return;
  const left = clamp(1 - (TT - a) / (b - a)), secs = Math.ceil(left * (b - a) - 1e-6);
  withT(x, y, left > 0 && left < 0.35 ? Math.sin(TT * 40) * 0.025 : 0, k, () => {
    pp(pR(-r * 0.2, -r - 30, r * 0.4, 44, 8), PR.char, { key: key + 'kn', sb: 8, sy: 4, tex: 0.4 });
    pp(pE(0, 0, r, r), PR.red, { key: key + 'o', sb: 16, sy: 8, tex: 0.55, rim: 'rgba(255,220,210,0.35)' });
    pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key: key + 'f', shadow: false, tex: 0.5 });
    if (left > 0) pp(() => { ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.76, -Math.PI / 2, -Math.PI / 2 + TAU * left); ctx.closePath(); }, PR.mustard, { key: key + 'w', shadow: false, tex: 0.45 });
    ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (let i = 0; i < 12; i++) { const an = i / 12 * TAU; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * 0.7, Math.sin(an) * r * 0.7); ctx.lineTo(Math.cos(an) * r * 0.8, Math.sin(an) * r * 0.8); ctx.stroke(); }
    ctx.restore();
    pp(pE(0, 0, r * 0.42, r * 0.42), PR.paperW, { key: key + 'c', sb: 8, sy: 4, tex: 0.4 });
    txt(String(secs), 0, r * 0.19, r * 0.52, left > 0 ? PR.navy : PR.red, { align: 'center', weight: 800 });
  });
}
// a number that pops into the middle of a cell
function tmNum(g, r, c, str, t, col = PR.navy) {
  const [x, y, w] = tmSq(g, r, c, 1);
  withT(x + w / 2, y + w / 2, 0, popS(t), () => txt(str, 0, w * 0.15, w * 0.42, col, { align: 'center', weight: 800 }));
}
// background life
function tmBooks(x, yb, key) {
  [[200, PR.blue], [176, PR.mustard], [210, PR.red]].forEach(([w, c], i) => pp(pR(x - w / 2 + (i % 2) * 8, yb - 40 * (i + 1), w, 38, 4), c, { key: key + i, sb: 8, sy: 4, tex: 0.5 }));
}
function tmCup(x, yb, key) {
  [[-24, PR.red, -0.12], [0, PR.green, 0.02], [24, PR.yellow, 0.14]].forEach(([dx, c, a], i) => withT(x + dx, yb - 90, a, 1, () => { pp(pR(-9, -110, 18, 120, 4), c, { key: key + 'p' + i, sb: 6, sy: 3, tex: 0.4 }); pp(pG([[-9, -110], [9, -110], [0, -130]]), PR.tan, { shadow: false, tex: 0.4 }); }));
  pp(pR(x - 50, yb - 110, 100, 110, 10), PR.tidu, { key: key + 'cup', sb: 10, sy: 5, tex: 0.5 });
}
function tmStars(pts) { pts.forEach(([x, y, r], i) => prStar(x, y, r * (1 + Math.sin(TT * 3 + i * 1.7) * 0.12), i % 2 ? PR.yellow : PR.mustard)); }

SCENES.hook = () => {   // a classroom: the sheet unfolds into the 3×3 grid, the timer pops up once the question is asked
  const t0 = E0, tq = VW('hook', 'này').t0;
  prWall(PR.slate, { streak: 620 });
  prBunting(-14, undefined, 'bun1');
  prFloor(1560, PR.woodD, { trim: false });
  tmBooks(930, 1170, 'bk1');
  tmStars([[860, 760, 26], [1000, 830, 20], [880, 1000, 18]]);
  const u = EZ.o3(ev(t0 + 0.05, 0.55));
  tmUnfold(u, () => tmGrid(TG, { key: 'g1', cellPop: (r, c) => popS(t0 + 0.4 + (r * 3 + c) * 0.06) }));
  tmTimer(930, 560, 105, 'tm');
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o1', look: TT > VL('hook').t1 + 0.4 ? Math.sin(TT * 2.2) * 16 - 6 : -16, mood: TT > tq ? 'wow' : 'neutral' });
  prSign('CÓ BAO NHIÊU HÌNH VUÔNG?', { kicker: KICK });
  prChips();
};
SCENES.tip = () => {   // night study: the timer runs out, a note "only 9?" gets crossed on "nhỏ"
  const tn = VW('tip', 'nhỏ').t0;
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floor, { studs: true });
  pp(pE(1000, 1180, 44, 44), '#f3e3a5', { key: 'moon', sb: 14, sy: 4, tex: 0.5 });
  tmStars([[850, 1220, 14], [1040, 1060, 12], [900, 1100, 10]]);
  tmGrid(TG, { key: 'g2', tint: Array.from({ length: 9 }, (_, i) => [Math.floor(i / 3), i % 3, 1, TM.one, 0.7 * ev(tn - 0.7, 0.2) * (1 - ev(tn + 0.35, 0.3))]) });
  tmTimer(930, 560, 105, 'tm');
  withT(930, 860, 0.06, popS(VL('tip').t0 + 0.1), () => { prNote(0, 0, 200, 170, '#f3e3a5', 0, 'n9'); txt('chỉ 9?', 0, 20, 52, PR.navy, { align: 'center', weight: 800 }); });
  prCross(1000, 800, tn, 48);
  tidu(OWL_X, OWL_Y, { hat: 'explorer', key: 'o2', look: -18, mood: 'flat', hand: { x: -300, y: -300 }, hold: propGlass(-0.5) });
  prSign('ĐỪNG CHỈ ĐẾM Ô NHỎ', { kicker: KICK });
  prChips();
};
SCENES.ones = () => {   // a plum studio: the nine 1×1 squares light up yellow one by one, numbered; the counter runs to 9
  const T = tmOnes(), n = T.filter((t) => TT >= t).length;
  prWall(PR.plum, { panel: 'rgba(0,0,0,0.10)', gap: 120, streak: 420 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(960, 1150, 66, 4, 10 + TT * 6, 'clk3');
  tmCup(860, 1260, 'cup3');
  tmGrid(TG, { key: 'g3', tint: T.map((t, i) => [Math.floor(i / 3), i % 3, 1, TM.one, 0.85 * ev(t, 0.15)]) });
  T.forEach((t, i) => tmNum(TG, Math.floor(i / 3), i % 3, String(i + 1), t));
  prCounter('HÌNH 1×1', n, 930, 600, { w: 230, h: 180, big: 96, rot: 0.04, s: popS(E0 + 0.1) });
  tidu(OWL_X, OWL_Y, { hat: 'builder', key: 'o3', look: -16, hand: { x: -330, y: -340 }, hold: propStick(-0.6), mood: n === 9 ? 'happy' : 'neutral' });
  prSign('9 HÌNH VUÔNG 1 Ô', { kicker: KICK });
  prChips();
};
SCENES.twos = () => {   // a teal room: four 2×2 squares, one at a time; each lands as a thumbnail under the counter
  const T = tmTwos(), cur = T.filter((t) => TT >= t).length - 1, found = T.filter((t) => TT >= t + 0.5).length;
  prWall(PR.teal, { panel: 'rgba(255,255,255,0.06)', streak: 380 });
  prBunting(-14, [PR.mustard, PR.cream, PR.red, PR.blue], 'bun4');
  prFloor(1560, PR.woodD, { trim: false });
  tmBooks(930, 1170, 'bk4');
  const tint = [], ring = [];
  if (cur >= 0) {
    const [r, c] = TM_TWOS[cur], t = T[cur];
    if (cur === 0) [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([dr, dc], j) => tint.push([r + dr, c + dc, 1, TM.two, 0.85 * ev(t + j * 0.18, 0.15)]));
    else tint.push([r, c, 2, TM.two, 0.85 * ev(t, 0.2)]);
    ring.push([r, c, 2, TM.ring2, EZ.o2(ev(t + (cur === 0 ? 0.6 : 0.1), 0.45)), 1.2]);
  }
  tmGrid(TG, { key: 'g4', tint, ring });
  prCounter('HÌNH 2×2', found, 930, 560, { w: 230, h: 180, big: 96, rot: -0.04, s: popS(E0 + 0.1) });
  T.forEach((t, i) => {
    const [r, c] = TM_TWOS[i], x = 822 + (i % 2) * 116, y = 700 + Math.floor(i / 2) * 116, k = popS(t + 0.5);
    withT(x + 50, y + 50, (i % 2 ? 1 : -1) * 0.05, k, () => tmGrid(tmGeo(-50, -50, 100), { key: 'th' + i, sheet: false, tint: [[r, c, 2, TM.two, 1]], ring: [[r, c, 2, TM.ring2, 1, 1.4]] }));
  });
  tidu(OWL_X, OWL_Y, { hat: 'mortar', key: 'o4', look: -16, hand: { x: -330, y: -340 }, hold: propStick(-0.6), mood: found === 4 ? 'happy' : 'neutral' });
  prSign('GHÉP 4 Ô: THÊM 4 HÌNH', { kicker: KICK });
  prChips();
};
SCENES.whole = () => {   // a sand-coloured kitchen: the whole frame is traced teal; the counter shows 1
  const tw = VW('whole', 'toàn').t0, t1 = VW('whole', 'một').t0;
  prWall('#c9b28a', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1560, PR.floorD, { trim: false });
  for (let i = 0; i < 4; i++) pp(pR(820 + i * 56, 900, 40, 40, 6), i % 2 ? PR.creamL : PR.red, { key: 'tile' + i, sb: 6, sy: 3, tex: 0.5 });
  pp(pR(820, 950, 220, 22, 4), PR.wood, { key: 'shelf5', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(840, 1010, 70, 90, 12), PR.blue, { key: 'jar5', sb: 8, sy: 4, tex: 0.5 }); pp(pR(940, 1030, 64, 70, 12), PR.green, { key: 'jar6', sb: 8, sy: 4, tex: 0.5 });
  tmStars([[1000, 1200, 16]]);
  tmGrid(TG, { key: 'g5', tint: [[0, 0, 3, TM.three, 0.4 * ev(tw + 0.9, 0.5)]], ring: [[0, 0, 3, TM.ring3, EZ.o2(ev(tw, 1.0)), 1.3]] });
  prCounter('HÌNH 3×3', TT >= t1 ? 1 : 0, 930, 600, { w: 230, h: 180, big: 96, rot: 0.04, s: popS(E0 + 0.1) });
  prCheck(1000, 720, t1, 44);
  tidu(OWL_X, OWL_Y, { hat: 'chef', key: 'o5', look: -14, mood: TT > t1 ? 'wow' : 'neutral' });
  prSign('CẢ LƯỚI CŨNG LÀ HÌNH VUÔNG', { kicker: KICK });
  prChips();
};
// one card of the sum: a mini grid (the size's colour) over its number
function tmCard(i, x, y, t, key) {
  if (TT < t - 0.02) return;
  const sx = 420, sy = 1700, px = springMove(t, sx, x, SPRING.playful), py = springMove(t, sy, y, SPRING.playful), rot = springMove(t, -0.6, (i - 1) * 0.04, SPRING.playful);
  withT(px, py, rot, 1, () => {
    pp(pR(-100, -150, 200, 290, 14), PR.paperW, { key: key + 'cd', sb: 18, sy: 9, tex: 0.45 });
    const g = tmGeo(-75, -128, 150);
    if (i === 0) tmGrid(g, { key: key + 'g', sheet: false, tint: Array.from({ length: 9 }, (_, j) => [Math.floor(j / 3), j % 3, 1, TM.one, 0.9]) });
    if (i === 1) tmGrid(g, { key: key + 'g', sheet: false, tint: [[0, 0, 2, TM.two, 0.9]], ring: [[0, 0, 2, TM.ring2, 1, 1.4]] });
    if (i === 2) tmGrid(g, { key: key + 'g', sheet: false, tint: [[0, 0, 3, TM.three, 0.45]], ring: [[0, 0, 3, TM.ring3, 1, 1.4]] });
    txt(['9', '4', '1'][i], 0, 118, 92, [PR.mustard, TM.ring2, TM.ring3][i], { align: 'center', weight: 800 });
  });
}
SCENES.sum = () => {   // dusk classroom: the three groups fly onto the board as 9 + 4 + 1, then 14 is stamped red
  const T = tmSum(), xs = [210, 540, 870];
  prWall('#4a4566', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floorD, { trim: false });
  prBoard(40, 430, 1000, 860, 'b6');
  txt('TỔNG SỐ HÌNH VUÔNG', 540, 530, 44, 'rgba(244,244,236,0.85)', { align: 'center', weight: 700 });
  T.slice(0, 3).forEach((t, i) => tmCard(i, xs[i], 760, t, 'cd' + i));
  [375, 705].forEach((x, i) => withT(x, 760, 0, popS(T[i + 1] - 0.05), () => txt('+', 0, 30, 110, PR.creamL, { align: 'center', weight: 800 })));
  withT(330, 1105, 0, popS(T[3] - 0.25), () => txt('=', 0, 40, 130, PR.creamL, { align: 'center', weight: 800 }));
  prStamp('14', 560, 1100, PR.red, T[3], { rot: -0.08, size: 140 });
  prBurst(560, 1100, T[3] + 0.16, { n: 22 });
  tidu(OWL_X, OWL_Y, { hat: 'crown', key: 'o6', look: -12, mood: TT > T[3] + 0.16 ? 'happy' : 'neutral', hand: { x: -290, y: -330 } });
  prSign('TỔNG CỘNG: 14 HÌNH', { kicker: KICK });
  prChips();
};
SCENES.cta = () => {   // a corkboard of viewers' guesses; the comment box types a first guess, confetti on "nhé"
  const tb = VW('cta', 'bình').t0, tl = VL('cta').words[VL('cta').words.length - 1].t0;
  prWall('#c79a5b', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1600, PR.floorD, { trim: false });
  prCorkboard(90, 440, 660, 520, 'cork7');
  [['9?', 230, 580, -0.08, '#f3e3a5'], ['10?', 520, 560, 0.06, '#a9cbe0'], ['13?', 260, 830, 0.05, '#e9a3a3'], ['14!', 560, 820, -0.05, '#bfe0b0']].forEach(([s, x, y, rot, c], i) => {
    withT(x, y, rot, popS(E0 + 0.1 + i * 0.13), () => { prNote(0, 0, 210, 180, c, 0, 'cn' + i); txt(s, 0, 26, 76, PR.navy, { align: 'center', weight: 800 }); pp(pE(0, -72, 12, 12), PR.red, { key: 'pin' + i, sb: 4, sy: 2, tex: 0.3 }); });
  });
  prCheck(660, 750, Math.max(VW('cta', 'đúng').t0, E0 + 0.85), 46);
  prCommentBox(450, 1150, 'Lần đầu mình đếm 9', tb, { s: popS(E0 + 0.1), hint: 'Viết bình luận...' });
  prBurst(450, 1100, tl, { n: 26, life: 1.4 });
  tidu(OWL_X, OWL_Y, { hat: 'party', key: 'o7', look: -16, mood: TT > tl ? 'happy' : 'wow' });
  prSign('BẠN ĐẾM ĐƯỢC MẤY?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE — one shot per line (in script order); SPLITS = [[lineId, word, n, sceneKey]] cut again on a word
// =====================================================================
const SPLITS = [];
// sound cues: 'type' (n clicks over d s), 'tick', 'pop', 'thud' (stamp), 'chime'. Static: computed from VOICE, never during a frame.
function SFX_CUES() {
  const c = [];
  for (let t = tmTimer0(); t < tmTimer1() - 0.05; t += 1) c.push({ k: 'tick', t });
  c.push({ k: 'thud', t: tmTimer1() });
  for (const t of tmOnes()) c.push({ k: 'pop', t });
  for (const t of tmTwos()) c.push({ k: 'pop', t: t + 0.5 });
  c.push({ k: 'pop', t: VW('whole', 'một').t0 });
  const S = tmSum(); for (const t of S.slice(0, 3)) c.push({ k: 'pop', t: t + 0.12 });
  c.push({ k: 'thud', t: S[3] + 0.16 });
  const tl = VL('cta').words[VL('cta').words.length - 1].t0;
  c.push({ k: 'type', t: VW('cta', 'bình').t0, n: 12, d: 0.45 }, { k: 'chime', t: tl });
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
