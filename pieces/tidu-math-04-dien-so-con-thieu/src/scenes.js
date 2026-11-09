// =====================================================================
//  TIDU MATH 04 — "Điền số còn thiếu": 6 + □ = 14. One scene per voice line. The equation strip stays on top; 14 paper
//  dots sit loose in one tray, the 6 known ones gather on the left, the other 8 line up on the right, then the paper
//  flap over the box flips to show 8.
// =====================================================================
TIDU_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const OWL_X = 880, OWL_Y = 1800, KICK = 'TIDU MATH · ĐIỀN SỐ';
const SCENES = {};
const DS = { a: '#f2c94c', b: '#3f6fb0', tray: '#e9dcc0', trayD: '#b89a6a', flap: '#e07a4f', dotR: 36, eqY: 560 };

// ---- the equation strip 6 + □ = 14; o.flip (0..1) turns the flap over to 8
function dsCard(x, y, w, h, str, fill, o = {}) {
  withT(x, y, o.rot ?? 0, o.s ?? 1, () => {
    pp(pR(-w / 2, -h / 2, w, h, 16), fill, { key: o.key ?? 'card' + str, sb: 16, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.35)' });
    if (str) txt(str, 0, h * 0.2, fitSize(str, w - 30, o.size ?? h * 0.6), o.color ?? PR.navy, { align: 'center', weight: 800 });
  });
}
function dsEquation(o = {}) {
  const y = DS.eqY, s = o.s ?? 1;
  dsCard(170, y, 160, 190, '6', DS.a, { s, key: 'e6', rot: -0.03 });
  withT(285, y, 0, s, () => txt('+', 0, 32, 100, PR.creamL, { align: 'center', weight: 800 }));
  const f = o.flip ?? 0, sx = Math.abs(Math.cos(f * Math.PI)), front = f > 0.5;
  withT(420, y, 0.02, s, () => {
    ctx.save(); ctx.scale(Math.max(0.02, sx), 1 + (1 - sx) * 0.06);
    if (front) dsCard(0, 0, 180, 210, '8', '#a9cbe0', { key: 'e8', color: PR.navy });
    else {
      pp(pR(-90, -105, 180, 210, 16), DS.flap, { key: 'flap', sb: 16, sy: 8, tex: 0.55, rim: 'rgba(255,230,210,0.35)' });
      ctx.save(); ctx.beginPath(); ctx.roundRect(-90, -105, 180, 210, 16); ctx.clip(); ctx.strokeStyle = 'rgba(255,240,225,0.35)'; ctx.lineWidth = 10; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(-90 + k * 50, -105); ctx.lineTo(-90 + k * 50 + 120, 105); ctx.stroke(); } ctx.restore();
      txt('?', 0, 40, 120, PR.creamL, { align: 'center', weight: 800 });
    }
    ctx.restore();
  });
  withT(555, y, 0, s, () => txt('=', 0, 32, 100, PR.creamL, { align: 'center', weight: 800 }));
  dsCard(700, y, 200, 190, '14', PR.creamL, { s, key: 'e14', rot: 0.03 });
}
// ---- the tray and the 14 dots: loose (seeded jitter), then 6 gather left (A) and 8 line up right (B)
const DS_TRAY = { x: 70, y: 760, w: 860, h: 420 };
const dsLoose = (k) => { const R = RNG('loose', k); return [150 + (k % 7) * 110 + R.n(22), 870 + Math.floor(k / 7) * 190 + R.n(30)]; };
const DS_A = [0, 1, 2, 7, 8, 9];   // the six known dots
const dsHomeA = (j) => [150 + (j % 3) * 100, 900 + Math.floor(j / 3) * 130];
const dsHomeB = (j) => [560 + (j % 4) * 100, 900 + Math.floor(j / 4) * 130];
function dsTray(o = {}) {
  pp(pR(DS_TRAY.x, DS_TRAY.y, DS_TRAY.w, DS_TRAY.h, 22), DS.trayD, { key: 'trayo', sb: 18, sy: 9, tex: 0.5 });
  pp(pR(DS_TRAY.x + 16, DS_TRAY.y + 16, DS_TRAY.w - 32, DS_TRAY.h - 32, 16), DS.tray, { key: 'trayi', shadow: false, tex: 0.55 });
  if (o.split > 0) chalkLine([[475, DS_TRAY.y + 30], [475, DS_TRAY.y + DS_TRAY.h - 30]], o.split, { color: PR.navy, w: 8, dash: [18, 12] });
}
function dsDot(x, y, fill, key, s = 1, label) {
  withT(x, y, 0, s, () => { pp(pE(0, 0, DS.dotR, DS.dotR), fill, { key, sb: 10, sy: 5, tex: 0.5, rim: 'rgba(255,255,255,0.35)' }); if (label) txt(label, 0, 14, 40, PR.creamL, { align: 'center', weight: 800 }); });
}
// tA: when the 6 gather; tB: when the 8 line up; o.pop: when the loose dots pop in; o.dimA: the 6 fade back (taken away)
function dsDots(o = {}) {
  let jb = 0;
  for (let k = 0; k < 14; k++) {
    const ja = DS_A.indexOf(k), [lx, ly] = dsLoose(k), s = o.pop != null ? popS(o.pop + k * 0.08) : 1;
    if (ja >= 0) {
      const u = o.tA == null ? 0 : EZ.o3(ev(o.tA + ja * 0.08, 0.5)), [hx, hy] = dsHomeA(ja);
      ctx.save(); ctx.globalAlpha = 1 - 0.55 * (o.dimA ?? 0);
      dsDot(lerp(lx, hx, u), lerp(ly, hy, u), DS.a, 'da' + k, s); ctx.restore();
    } else {
      const j = jb++, u = o.tB == null ? 0 : EZ.o3(ev(o.tB + j * 0.08, 0.5)), [hx, hy] = dsHomeB(j);
      dsDot(lerp(lx, hx, u), lerp(ly, hy, u), DS.b, 'db' + k, s, o.count != null && TT > o.count + j * 0.22 ? String(j + 1) : null);
    }
  }
}
function dsTag(str, x, y, t, fill, rot = -0.05) {
  withT(x, y, rot, popS(t), () => { const w = txtW(str, 50) + 46; pp(pR(-w / 2, -40, w, 80, 12), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.5 }); txt(str, 0, 18, 50, PR.creamL, { align: 'center', weight: 800 }); });
}
function dsStars(pts) { pts.forEach(([x, y, r], i) => prStar(x, y, r * (1 + Math.sin(TT * 3 + i * 1.7) * 0.12), i % 2 ? PR.yellow : PR.mustard)); }

// ---- times shared by scenes and sound cues
const dsGather = () => VW('whole', 'sáu').t0;
const dsLineUp = () => VW('find', 'còn').t0;
const dsCount = () => VL('result').t0 - 0.1;
const dsFlip = () => VW('reveal', 'tám').t0 - 0.35;

SCENES.hook = () => {   // a classroom: the equation appears with a paper flap over the missing number
  const t0 = E0;
  prWall(PR.slate, { streak: 620 });
  prBunting(-14, undefined, 'bun1');
  prFloor(1560, PR.woodD, { trim: false });
  dsStars([[880, 900, 22], [1010, 980, 16], [900, 1120, 14]]);
  dsEquation({ s: popS(t0 + 0.05) });
  withT(420, DS.eqY - 150, 0, popS(VW('hook', 'trốn').t0), () => txt('?', 0, 0, 70, PR.mustard, { align: 'center', weight: 800 }));
  tidu(OWL_X, OWL_Y, { hat: 'explorer', key: 'o1', look: -18, hand: { x: -300, y: -300 }, hold: propGlass(-0.5), mood: 'wow' });
  prSign('6 + ? = 14', { kicker: KICK });
  prChips();
};
SCENES.whole = () => {   // a night desk: 14 dots tumble into the tray; on "sáu" six gather on the left
  const t14 = VW('whole', 'mười').t0, tA = dsGather();
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floor, { studs: true });
  pp(pE(990, 1250, 40, 40), '#f3e3a5', { key: 'moon', sb: 14, sy: 4, tex: 0.5 });
  dsEquation();
  dsTray({ split: ev(tA, 0.5) });
  dsDots({ pop: E0 + 0.05, tA });
  dsTag('14 chấm', 500, 730, t14, PR.navy);
  dsTag('6', 250, 1210, tA + 0.5, PR.mustard, 0.04);
  tidu(OWL_X, OWL_Y, { hat: 'builder', key: 'o2', look: -16, mood: TT > tA ? 'happy' : 'neutral' });
  prSign('14 CHẤM, ĐÃ BIẾT 6', { kicker: KICK });
  prChips();
};
SCENES.find = () => {   // a plum studio: the known six fade back (−6), the other eight line up on the right
  const tB = dsLineUp(), tm = VW('find', 'trừ').t0;
  prWall(PR.plum, { panel: 'rgba(0,0,0,0.10)', gap: 120, streak: 420 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(960, 1250, 56, 2, 10 + TT * 6, 'clk3');
  dsEquation();
  dsTray({ split: 1 });
  dsDots({ tA: -10, tB, dimA: ev(tm, 0.4) });
  dsTag('− 6', 250, 1210, tm, PR.red, 0.04);
  dsTag('14 − 6', 500, 730, tm + 0.3, PR.navy);
  tidu(OWL_X, OWL_Y, { hat: 'chef', key: 'o3', look: -14, mood: 'neutral' });
  prSign('14 − 6 = ?', { kicker: KICK });
  prChips();
};
SCENES.result = () => {   // a teal room: the eight remaining dots are counted 1..8; the result card pops
  const tc = dsCount(), t8 = VW('result', 'tám').t0;
  prWall(PR.teal, { panel: 'rgba(255,255,255,0.06)', streak: 380 });
  prFloor(1560, PR.woodD, { trim: false });
  dsStars([[1000, 1240, 16]]);
  dsEquation();
  dsTray({ split: 1 });
  dsDots({ tA: -10, tB: -10, dimA: 1, count: tc });
  dsTag('14 − 6 = 8', 500, 730, t8, PR.green);
  tidu(OWL_X, OWL_Y, { hat: 'mortar', key: 'o4', look: -14, mood: TT > t8 ? 'happy' : 'neutral' });
  prSign('14 − 6 = 8', { kicker: KICK });
  prChips();
};
SCENES.reveal = () => {   // a sand kitchen: the flap flips over to 8 and 8 is stamped
  const tf = dsFlip(), ts = tf + 0.5;
  prWall('#c9b28a', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1560, PR.floorD, { trim: false });
  dsStars([[1000, 1250, 18], [880, 1270, 12]]);
  pp(pE(990, 420, 36, 36), PR.pink, { key: 'dot5', sb: 8, sy: 4, tex: 0.5 });
  dsEquation({ flip: EZ.io(ev(tf, 0.5)) });
  dsTray({ split: 1 });
  dsDots({ tA: -10, tB: -10 });
  prStamp('8', 470, 1290, PR.red, ts, { rot: -0.08, size: 110 });
  prBurst(420, DS.eqY, ts, { n: 22 });
  tidu(OWL_X, OWL_Y, { hat: 'crown', key: 'o5', look: -14, mood: TT > ts ? 'happy' : 'wow' });
  prSign('6 + 8 = 14', { kicker: KICK });
  prChips();
};
SCENES.tip = () => {   // dusk classroom: whole − known part = missing part
  const t0 = E0, tr = VW('tip', 'trừ').t0;
  prWall('#4a4566', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floorD, { trim: false });
  prBoard(40, 420, 1000, 640, 'b6');
  ['Tổng: 14', 'Một phần: 6', 'Phần thiếu: 14 − 6 = 8'].forEach((a, i) => {
    const y = 560 + i * 150, t = t0 + 0.2 + i * 0.4;
    withT(110, y, 0, popS(i === 2 ? Math.max(t, tr) : t), () => { txt(`${i + 1}.`, 0, 0, 60, PR.mustard, { weight: 800 }); txt(a, 80, 0, fitSize(a, 640, 64), PR.creamL, { weight: 800 }); });
    prCheck(930, y - 22, (i === 2 ? Math.max(t, tr) : t) + 0.3, 40);
  });
  dsTag('tổng − phần = phần thiếu', 450, 1180, tr + 0.4, PR.green, -0.03);
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o6', look: -14, mood: 'happy' });
  prSign('MẸO: DÙNG PHÉP TRỪ', { kicker: KICK });
  prChips();
};
SCENES.cta = () => {   // a warm wall: two puzzle notes to send a friend, a pencil and a flap ready to hide a number
  const tt = VW('cta', 'tạo').t0, tb = VW('cta', 'bạn').t0, tend = VL('cta').words[VL('cta').words.length - 1].t0;
  prWall('#c79a5b', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1600, PR.floorD, { trim: false });
  prCorkboard(90, 440, 700, 560, 'cork7');
  [['9 + ? = 15', 300, 600, -0.06, '#f3e3a5'], ['? − 4 = 7', 560, 820, 0.05, '#a9cbe0']].forEach(([s, x, y, rot, c], i) => {
    withT(x, y, rot, popS((i ? tb : tt) + 0.1), () => { prNote(0, 0, 330, 170, c, 0, 'cn' + i); txt(s, 0, 24, 62, PR.navy, { align: 'center', weight: 800 }); pp(pE(0, -66, 12, 12), PR.red, { key: 'pin' + i, sb: 4, sy: 2, tex: 0.3 }); });
  });
  tidu(OWL_X, OWL_Y, { hat: 'party', key: 'o7', look: -16, hand: { x: -300, y: -320 }, hold: propPencil(-0.5), mood: TT > tend ? 'happy' : 'wow' });
  prBurst(450, 720, tend, { n: 24, life: 1.4 });
  prSign('ĐỐ BẠN BÈ NGAY!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE — one shot per line (in script order); SPLITS = [[lineId, word, n, sceneKey]] cut again on a word
// =====================================================================
const SPLITS = [];
// sound cues: 'type' (n clicks over d s), 'tick', 'pop', 'thud' (stamp), 'chime'. Static: computed from VOICE, never during a frame.
function SFX_CUES() {
  const c = [];
  const w0 = CUT('whole') + 0.1; for (let k = 0; k < 14; k++) c.push({ k: 'tick', t: w0 + k * 0.08 });
  c.push({ k: 'pop', t: dsGather() + 0.5 }, { k: 'pop', t: dsLineUp() + 0.6 });
  for (let j = 0; j < 8; j++) c.push({ k: 'tick', t: dsCount() + j * 0.22 });
  c.push({ k: 'pop', t: dsFlip() + 0.25 }, { k: 'thud', t: dsFlip() + 0.5 });
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
