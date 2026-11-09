// =====================================================================
//  TIDU MATH 03 — "Vì sao 7 + 8 dễ hơn bạn nghĩ?" One scene per voice line. Two paper ten-frames: the top one holds the
//  7 yellow tokens, the bottom one the 8 blue ones (a full row of 5 plus 3). The 3 blue tokens of the second row hop up to
//  fill the top frame, so what stays behind is exactly one row of 5: 10 + 5 = 15 without counting fingers.
// =====================================================================
TIDU_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const OWL_X = 880, OWL_Y = 1800, KICK = 'TIDU MATH · CỘNG QUA 10';
const SCENES = {};
const TF = { x: 90, ya: 470, yb: 830, pad: 14, c: 108, r: 40, yellow: '#f2c94c', blue: '#3f6fb0', frame: '#3b3934', cell: '#f7ead0' };
const tfW = TF.pad * 2 + TF.c * 5, tfH = TF.pad * 2 + TF.c * 2;
const tfCell = (y0, i) => [TF.x + TF.pad + (i % 5) * TF.c + TF.c / 2, y0 + TF.pad + Math.floor(i / 5) * TF.c + TF.c / 2];

function tfFrame(y0, key, o = {}) {
  pp(pR(TF.x, y0, tfW, tfH, 16), TF.frame, { key: key + 'f', sb: 18, sy: 9, tex: 0.5 });
  for (let i = 0; i < 10; i++) {
    const [x, y] = tfCell(y0, i);
    pp(pR(x - TF.c / 2 + 5, y - TF.c / 2 + 5, TF.c - 10, TF.c - 10, 10), TF.cell, { key: key + 'c' + i, shadow: false, tex: 0.4 });
  }
  for (const i of o.empty ?? []) {   // a slot still to fill: dashed ring, "?" once asked
    const [x, y] = tfCell(y0, i), pulse = 1 + Math.sin(TT * 6 + i) * 0.05;
    ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 5; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.arc(x, y, TF.r * pulse, 0, TAU); ctx.stroke(); ctx.restore();
    if (o.ask != null) withT(x, y, 0, popS(o.ask), () => txt('?', 0, 18, 52, PR.red, { align: 'center', weight: 800 }));
  }
}
function tfToken(x, y, fill, key, s = 1) {
  withT(x, y, 0, s, () => { pp(pE(0, 0, TF.r, TF.r), fill, { key, sb: 10, sy: 5, tex: 0.5, rim: 'rgba(255,255,255,0.35)' }); pp(pE(-12, -12, 10, 8, -0.6), 'rgba(255,255,255,0.35)', { shadow: false, tex: false }); });
}
// a hand-drawn loop around points P (closed), drawn on with frac; a seeded wobble keeps it looking like a marker stroke
function tfLoop(P, frac, color, key) {
  const R = RNG('loop', key), Q = P.map(([x, y]) => [x + R.n(6), y + R.n(6)]);
  const pts = []; for (let i = 0; i <= Q.length; i++) { const a = Q[i % Q.length], b = Q[(i + 1) % Q.length]; for (let k = 0; k < 8; k++) pts.push([lerp(a[0], b[0], k / 8), lerp(a[1], b[1], k / 8)]); }
  chalkLine(pts, frac, { color, w: 9 });
}
const tfBox = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
// a number card at the right of a frame
function tfCard(y, str, fill, o = {}) {
  withT(790, y, o.rot ?? 0.04, o.s ?? 1, () => {
    pp(pR(-80, -80, 160, 160, 18), fill, { key: o.key ?? 'card' + str, sb: 16, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.35)' });
    txt(str, 0, 36, fitSize(str, 130, 104), o.color ?? PR.navy, { align: 'center', weight: 800 });
  });
}
function tfTag(str, x, y, t, fill, rot = -0.05) {
  withT(x, y, rot, popS(t), () => { const w = txtW(str, 50) + 46; pp(pR(-w / 2, -40, w, 80, 12), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.5 }); txt(str, 0, 18, 50, PR.creamL, { align: 'center', weight: 800 }); });
}
function tfStars(pts) { pts.forEach(([x, y, r], i) => prStar(x, y, r * (1 + Math.sin(TT * 3 + i * 1.7) * 0.12), i % 2 ? PR.yellow : PR.mustard)); }

// ---- times shared by scenes and sound cues
const tfHops = () => { const a = VW('move', 'ba').t0 + 0.15; return [a, a + 0.38, a + 0.76]; };
const tfStamp = () => VW('sum', 'lăm').t0;

// the tokens: yellow 0..6 in the top frame; blue 0..7 in the bottom one, blue 5..7 hop to top cells 7..9 at tfHops()
function tfTokens(o = {}) {
  for (let i = 0; i < 7; i++) { const [x, y] = tfCell(TF.ya, i); tfToken(x, y, TF.yellow, 'ty' + i, o.pop ? popS(o.pop + i * 0.07) : 1); }
  const hops = o.hops ?? [];
  for (let i = 0; i < 8; i++) {
    const [bx, by] = tfCell(TF.yb, i), s = o.pop ? popS(o.pop + 0.6 + i * 0.07) : 1;
    if (i < 5 || o.moved === false) { tfToken(bx, by, TF.blue, 'tb' + i, s); continue; }
    if (o.moved === true) { const [ax, ay] = tfCell(TF.ya, i + 2); tfToken(ax, ay, TF.blue, 'tb' + i, s); continue; }
    const t = hops[i - 5], u = EZ.o2(ev(t, 0.5)), [ax, ay] = tfCell(TF.ya, i + 2);
    tfToken(lerp(bx, ax, u), lerp(by, ay, u) - Math.sin(u * Math.PI) * 160, TF.blue, 'tb' + i, 1 + Math.sin(u * Math.PI) * 0.15);
  }
}

SCENES.hook = () => {   // a classroom: 7 yellow and 8 blue tokens pop into two ten-frames; finger counting is crossed out
  const t0 = E0, tn = VW('hook', 'ngón').t0;
  prWall(PR.slate, { streak: 620 });
  prBunting(-14, undefined, 'bun1');
  prFloor(1560, PR.woodD, { trim: false });
  tfStars([[1000, 1180, 16], [880, 1240, 12]]);
  tfFrame(TF.ya, 'fa'); tfFrame(TF.yb, 'fb');
  tfTokens({ pop: t0 + 0.1, moved: false });
  tfCard(592, '7', TF.yellow, { s: popS(t0 + 0.5), key: 'ca' });
  tfCard(952, '8', '#a9cbe0', { s: popS(t0 + 1.1), key: 'cb', rot: -0.04 });
  withT(300, 1230, -0.1, popS(tn - 0.2), () => {   // a paper hand
    [[-48, -70, -0.15], [-16, -86, -0.05], [16, -84, 0.05], [46, -66, 0.15]].forEach(([fx, fy, a], i) => withT(fx, fy, a, 1, () => pp(pR(-14, -50, 28, 90, 14), '#f2c9a0', { key: 'fg' + i, sb: 6, sy: 3, tex: 0.4 })));
    withT(-78, 4, -0.9, 1, () => pp(pR(-13, -42, 26, 76, 13), '#f2c9a0', { key: 'thumb', sb: 6, sy: 3, tex: 0.4 }));
    pp(pE(0, 10, 76, 68), '#f2c9a0', { key: 'palm', sb: 10, sy: 5, tex: 0.45 });
  });
  prCross(380, 1170, tn + 0.15, 46);
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o1', look: -16, mood: TT > tn ? 'wow' : 'neutral' });
  prSign('7 + 8 = ?', { kicker: KICK });
  prChips();
};
SCENES.need = () => {   // a night desk: the 7 is looped by hand; three empty slots pulse; +3 makes 10
  const tb = VW('need', 'bảy').t0, t3 = VW('need', 'ba').t0, t10 = VW('need', 'mười').t0;
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floor, { studs: true });
  pp(pE(990, 1180, 44, 44), '#f3e3a5', { key: 'moon', sb: 14, sy: 4, tex: 0.5 });
  tfStars([[860, 1240, 12], [1040, 1090, 10]]);
  tfFrame(TF.ya, 'fa', { empty: [7, 8, 9], ask: t3 - 0.2 }); tfFrame(TF.yb, 'fb');
  tfTokens({ moved: false });
  const x0 = TF.x - 6, y0 = TF.ya - 6, x5 = TF.x + tfW + 6, xm = TF.x + TF.pad + 2 * TF.c + 6, y1 = TF.ya + TF.pad + TF.c, y2 = TF.ya + tfH + 6;
  tfLoop([[x0, y0], [x5, y0], [x5, y1], [xm, y1], [xm, y2], [x0, y2]], ev(tb, 0.7), PR.mustard, 'seven');
  tfTag('+3', 520, 760, t3, PR.red, 0.06);
  tfCard(592, TT < t10 ? '7' : '10', TT < t10 ? TF.yellow : PR.green, { key: 'ca', color: TT < t10 ? PR.navy : PR.creamL, s: 1 + Math.max(0, 1 - Math.abs(TT - t10) / 0.2) * 0.12 });
  tfCard(952, '8', '#a9cbe0', { key: 'cb', rot: -0.04 });
  tidu(OWL_X, OWL_Y, { hat: 'builder', key: 'o2', look: -16, hand: { x: -330, y: -340 }, hold: propStick(-0.6), mood: TT > t10 ? 'happy' : 'neutral' });
  prSign('7 + 3 = 10', { kicker: KICK });
  prChips();
};
SCENES.move = () => {   // a plum studio: the three blue tokens of the second row hop up and fill the top frame
  const H = tfHops(), n = H.filter((t) => TT >= t + 0.5).length;
  prWall(PR.plum, { panel: 'rgba(0,0,0,0.10)', gap: 120, streak: 420 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(960, 1180, 60, 2, 10 + TT * 6, 'clk3');
  tfFrame(TF.ya, 'fa', { empty: [7, 8, 9].slice(n) }); tfFrame(TF.yb, 'fb');
  [5, 6, 7].forEach((i, k) => {   // dashed hand-drawn paths from each blue token to its slot
    const [bx, by] = tfCell(TF.yb, i), [ax, ay] = tfCell(TF.ya, i + 2);
    chalkLine(Array.from({ length: 24 }, (_, j) => { const u = j / 23; return [lerp(bx, ax, u), lerp(by, ay, u) - Math.sin(u * Math.PI) * 160]; }), ev(H[k] - 0.3, 0.3), { color: 'rgba(244,241,232,0.7)', w: 6, dash: [12, 12] });
  });
  tfTokens({ hops: H });
  tfCard(592, String(7 + n), n === 3 ? PR.green : TF.yellow, { key: 'ca', color: n === 3 ? PR.creamL : PR.navy });
  tfCard(952, String(8 - n), '#a9cbe0', { key: 'cb', rot: -0.04 });
  tfTag('8 = 3 + 5', 380, 1180, VW('move', 'tám').t0, PR.navy);
  tidu(OWL_X, OWL_Y, { hat: 'chef', key: 'o3', look: -14, mood: n === 3 ? 'happy' : 'neutral' });
  prSign('LẤY 3 TỪ NHÓM 8', { kicker: KICK });
  prChips();
};
SCENES.split = () => {   // a teal room: one loop round the full ten, another round the row of five
  const t10 = VW('split', 'mười').t0, t5 = VW('split', 'năm').t0;
  prWall(PR.teal, { panel: 'rgba(255,255,255,0.06)', streak: 380 });
  prFloor(1560, PR.woodD, { trim: false });
  tfStars([[1000, 1200, 16]]);
  tfFrame(TF.ya, 'fa'); tfFrame(TF.yb, 'fb');
  tfTokens({ moved: true });
  tfLoop(tfBox(TF.x - 8, TF.ya - 8, TF.x + tfW + 8, TF.ya + tfH + 8), ev(t10 - 0.2, 0.6), PR.mustard, 'ten');
  tfLoop(tfBox(TF.x - 8, TF.yb - 8, TF.x + tfW + 8, TF.yb + TF.pad + TF.c + 8), ev(t5 - 0.2, 0.6), PR.yellow, 'five');
  tfCard(592, '10', PR.green, { key: 'ca', color: PR.creamL, s: popS(t10) });
  tfCard(952, '5', '#a9cbe0', { key: 'cb', rot: -0.04, s: popS(t5) });
  tidu(OWL_X, OWL_Y, { hat: 'explorer', key: 'o4', look: -18, hand: { x: -300, y: -300 }, hold: propGlass(-0.5), mood: TT > t5 ? 'happy' : 'flat' });
  prSign('BÊN NÀY 10, BÊN KIA 5', { kicker: KICK });
  prChips();
};
SCENES.sum = () => {   // a sand kitchen: 10 + 5, and 15 is stamped red
  const tc = VW('sum', 'cộng').t0, ts = tfStamp();
  prWall('#c9b28a', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1560, PR.floorD, { trim: false });
  pp(pR(800, 1150, 230, 22, 4), PR.wood, { key: 'shelf5', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(820, 1070, 70, 80, 12), PR.blue, { key: 'jar5', sb: 8, sy: 4, tex: 0.5 }); pp(pR(930, 1086, 64, 64, 12), PR.green, { key: 'jar6', sb: 8, sy: 4, tex: 0.5 });
  tfFrame(TF.ya, 'fa'); tfFrame(TF.yb, 'fb');
  tfTokens({ moved: true });
  tfCard(592, '10', PR.green, { key: 'ca', color: PR.creamL });
  tfCard(952, '5', '#a9cbe0', { key: 'cb', rot: -0.04 });
  withT(260, 1220, 0, popS(tc), () => txt('10 + 5 =', 0, 34, 96, PR.navy, { align: 'center', weight: 800 }));
  prStamp('15', 600, 1210, PR.red, ts, { rot: -0.08, size: 130 });
  prBurst(600, 1210, ts + 0.16, { n: 22 });
  tidu(OWL_X, OWL_Y, { hat: 'crown', key: 'o5', look: -14, mood: TT > ts + 0.16 ? 'happy' : 'neutral' });
  prSign('7 + 8 = 15', { kicker: KICK });
  prChips();
};
SCENES.tip = () => {   // dusk classroom: split and join on the board, ticked in turn
  const t0 = E0, tt = VW('tip', 'tách').t0, tg = VW('tip', 'gộp').t0;
  prWall('#4a4566', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floorD, { trim: false });
  prBoard(40, 420, 1000, 640, 'b6');
  [['Tách: 8 = 3 + 5', tt], ['7 + 3 = 10', tg], ['Gộp: 10 + 5 = 15', tg + 0.4]].forEach(([a, t], i) => {
    const y = 560 + i * 150;
    withT(110, y, 0, popS(Math.min(t, t0 + 0.2 + i * 0.35)), () => { txt(`${i + 1}.`, 0, 0, 60, PR.mustard, { weight: 800 }); txt(a, 80, 0, 66, PR.creamL, { weight: 800 }); });
    prCheck(930, y - 22, t + 0.25, 40);
  });
  tfTag('cộng qua 10', 300, 1180, VW('tip', 'qua').t0, PR.green, -0.04);
  tidu(OWL_X, OWL_Y, { hat: 'mortar', key: 'o6', look: -14, mood: 'happy' });
  prSign('MẸO: TÁCH VÀ GỘP SỐ', { kicker: KICK });
  prChips();
};
SCENES.cta = () => {   // a warm wall: the next challenge 8 + 6 with a mini ten-frame hint (8 needs 2)
  const tt = VW('cta', 'thử').t0, t6 = VW('cta', 'sáu').t0, tend = VL('cta').words[VL('cta').words.length - 1].t0;
  prWall('#c79a5b', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1600, PR.floorD, { trim: false });
  for (let i = 0; i < 5; i++) pp(pR(70 + i * 210, 380, 28, 1250, 4), '#2b2a2e', { key: 'bar' + i, sb: 10, sy: 5, tex: 0.5 });
  withT(470, 620, 0.02, popS(tt), () => { pp(pR(-280, -110, 560, 220, 18), PR.creamL, { key: 'next', sb: 18, sy: 9, tex: 0.5 }); txt('8 + 6 = ?', 0, 40, 120, PR.navy, { align: 'center', weight: 800 }); });
  withT(470, 940, -0.03, popS(t6 + 0.2), () => {
    pp(pR(-250, -110, 500, 220, 16), TF.frame, { key: 'mf', sb: 14, sy: 7, tex: 0.5 });
    for (let i = 0; i < 10; i++) {
      const x = -200 + (i % 5) * 100, y = -50 + Math.floor(i / 5) * 100;
      pp(pR(x - 44, y - 44, 88, 88, 8), TF.cell, { key: 'mc' + i, shadow: false, tex: 0.4 });
      if (i < 8) pp(pE(x, y, 32, 32), TF.yellow, { key: 'mt' + i, sb: 6, sy: 3, tex: 0.5 });
      else { ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(x, y, 32, 0, TAU); ctx.stroke(); ctx.restore(); }
    }
  });
  tfTag('8 cần thêm 2', 470, 1140, t6 + 0.5, PR.green, 0.04);
  tidu(OWL_X, OWL_Y, { hat: 'party', key: 'o7', look: -16, mood: TT > tend ? 'happy' : 'wow' });
  prSign('THỬ NGAY: 8 + 6', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE — one shot per line (in script order); SPLITS = [[lineId, word, n, sceneKey]] cut again on a word
// =====================================================================
const SPLITS = [];
// sound cues: 'type' (n clicks over d s), 'tick', 'pop', 'thud' (stamp), 'chime'. Static: computed from VOICE, never during a frame.
function SFX_CUES() {
  const c = [];
  for (let i = 0; i < 15; i++) c.push({ k: 'tick', t: 0.1 + (i < 7 ? i * 0.07 : 0.6 + (i - 7) * 0.07) });
  c.push({ k: 'pop', t: VW('hook', 'ngón').t0 + 0.15 });
  c.push({ k: 'pop', t: VW('need', 'ba').t0 }, { k: 'pop', t: VW('need', 'mười').t0 });
  for (const t of tfHops()) c.push({ k: 'pop', t: t + 0.5 });
  c.push({ k: 'thud', t: tfStamp() + 0.16 });
  c.push({ k: 'pop', t: VW('cta', 'thử').t0 }, { k: 'chime', t: VL('cta').words[VL('cta').words.length - 1].t0 });
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
