// =====================================================================
//  TIDU MATH 05 — "Quy luật số bí ẩn": 2, 5, 10, 17, ? One scene per voice line. The row of number cards stays on the
//  desk; each step gets a drawn arrow (+3, +5, +7), the steps line up as the odd numbers 3, 5, 7 → 9, and 26 drops into
//  the empty slot. The narration says "theo quy luật này": one fitting rule, not the only possible continuation.
// =====================================================================
TIDU_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const OWL_X = 880, OWL_Y = 1800, KICK = 'TIDU MATH · QUY LUẬT SỐ';
const SCENES = {};
const QL = { y: 620, w: 150, h: 180, xs: [140, 320, 500, 680, 860], vals: ['2', '5', '10', '17'], fills: ['#f2c94c', '#a9cbe0', '#bfe0b0', '#f3c0b8'], steps: ['+3', '+5', '+7', '+9'], stepFill: [PR.red, PR.blue, PR.green, '#8a5cc2'] };

function qlCard(x, y, str, fill, o = {}) {
  withT(x, y, o.rot ?? 0, o.s ?? 1, () => {
    pp(pR(-QL.w / 2, -QL.h / 2, QL.w, QL.h, 16), fill, { key: o.key ?? 'card' + str, sb: 16, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.35)' });
    txt(str, 0, 36, fitSize(str, QL.w - 24, 100), PR.navy, { align: 'center', weight: 800 });
  });
}
function qlDesk() {
  pp(pR(30, QL.y + QL.h / 2 + 10, 1020, 40, 8), PR.wood, { key: 'desk', sb: 14, sy: 7, tex: 0.5 });
  pp(pR(30, QL.y + QL.h / 2 + 46, 1020, 16, 4), PR.woodD, { key: 'deskE', shadow: false, tex: 0.5 });
}
// the four cards (o.drop: they fall onto the desk from t, staggered) and the fifth slot: dashed "?" or a value
function qlRow(o = {}) {
  QL.vals.forEach((v, i) => {
    const t = o.drop != null ? o.drop + i * 0.25 : -10, y = springMove(t, QL.y - 160, QL.y, SPRING.playful);
    if (TT >= t) qlCard(QL.xs[i], y, v, QL.fills[i], { rot: (i % 2 ? 1 : -1) * 0.03, key: 'c' + i, s: (o.drop != null ? popS(t) : 1) * (o.lit != null && o.lit.includes(i) ? 1.06 : 1) });
  });
  const x = QL.xs[4];
  if (o.last != null && TT >= o.last) {   // the sticky note falls into the slot
    const y = springMove(o.last, QL.y - 200, QL.y, SPRING.playful), rot = springMove(o.last, 0.5, 0.04, SPRING.playful);
    withT(x, y, rot, popS(o.last), () => { pp(pR(-QL.w / 2, -QL.h / 2, QL.w, QL.h, 6), '#f3e3a5', { key: 'note26', sb: 18, sy: 9, tex: 0.5 }); pp(pR(-30, -QL.h / 2 - 12, 60, 26, 3), 'rgba(240,235,220,0.8)', { shadow: false, tex: 0.3 }); txt('26', 0, 36, 96, PR.red, { align: 'center', weight: 800 }); });
  } else if (o.ask != null && TT >= o.ask) {
    const k = popS(o.ask) * (1 + Math.sin(TT * 5) * 0.04);
    withT(x, QL.y, 0, k, () => {
      ctx.save(); ctx.strokeStyle = PR.creamL; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.roundRect(-QL.w / 2, -QL.h / 2, QL.w, QL.h, 16); ctx.stroke(); ctx.restore();
      txt('?', 0, 50, 150, PR.mustard, { align: 'center', weight: 800 });
    });
  }
}
// a drawn arrow under the cards from slot i to i + 1, with its step label popping at t
function qlArrow(i, frac, t, o = {}) {
  const x0 = QL.xs[i] + 10, x1 = QL.xs[i + 1] - 10, y0 = QL.y + QL.h / 2 + 90, dip = 110;
  const P = Array.from({ length: 24 }, (_, k) => { const u = k / 23; return [lerp(x0, x1, u), y0 + Math.sin(u * Math.PI) * dip]; });
  const col = QL.stepFill[i];
  chalkLine(P, frac, { color: col, w: 8, dash: o.dash ? [14, 10] : [] });
  if (frac >= 1) { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x1 + 4, y0 - 4); ctx.lineTo(x1 - 22, y0 - 6); ctx.lineTo(x1 - 8, y0 + 20); ctx.closePath(); ctx.fill(); ctx.restore(); }
  withT((x0 + x1) / 2, y0 + dip + 70, 0, popS(t) * (o.lit ? 1.12 : 1), () => { const w = txtW(QL.steps[i], 60) + 44; pp(pR(-w / 2, -44, w, 88, 14), col, { key: 'st' + i, sb: 10, sy: 5, tex: 0.5 }); txt(QL.steps[i], 0, 21, 60, PR.creamL, { align: 'center', weight: 800 }); });
}
function qlTag(str, x, y, t, fill, rot = -0.04) {
  withT(x, y, rot, popS(t), () => { const w = txtW(str, 46) + 44; pp(pR(-w / 2, -38, w, 76, 12), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.5 }); txt(str, 0, 17, 46, PR.creamL, { align: 'center', weight: 800 }); });
}
function qlStars(pts) { pts.forEach(([x, y, r], i) => prStar(x, y, r * (1 + Math.sin(TT * 3 + i * 1.7) * 0.12), i % 2 ? PR.yellow : PR.mustard)); }

// ---- times shared by scenes and sound cues
const qlStep = (i) => [VW('d1', 'ba').t0, VW('d2', 'năm', 1).t0, VW('d3', 'bảy').t0, VW('next', 'chín').t0][i];
const qlDraw = (i) => [VL('d1').t0 + 0.1, VL('d2').t0 + 0.1, VL('d3').t0 + 0.05, VW('next', 'chín').t0 - 0.5][i];
const qlDrop = () => VW('ans', 'hai').t0;
const qlArrows = (n, o = {}) => { for (let i = 0; i < n; i++) qlArrow(i, ev(qlDraw(i), 0.5), qlStep(i), { lit: o.lit, dash: i === 3 }); };

SCENES.hook = () => {   // a classroom desk: four cards drop on the desk; a big "?" waits after 17
  const t0 = E0;
  prWall(PR.slate, { streak: 620 });
  prBunting(-14, undefined, 'bun1');
  prFloor(1560, PR.woodD, { trim: false });
  qlStars([[900, 1150, 20], [1010, 1230, 14]]);
  qlDesk();
  qlRow({ drop: t0 + 0.05, ask: VW('hook', 'bảy').t0 + 0.3 });
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o1', look: -16, mood: 'wow' });
  prSign('2, 5, 10, 17, ?', { kicker: KICK });
  prChips();
};
SCENES.look = () => {   // a night desk: "+?" tags pop in every gap — how much does it grow each time?
  const tq = VW('look', 'bao').t0;
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floor, { studs: true });
  pp(pE(990, 1200, 40, 40), '#f3e3a5', { key: 'moon', sb: 14, sy: 4, tex: 0.5 });
  qlDesk(); qlRow({ ask: -10 });
  for (let i = 0; i < 3; i++) withT((QL.xs[i] + QL.xs[i + 1]) / 2, QL.y + QL.h / 2 + 270, (i % 2 ? 1 : -1) * 0.05, popS(tq + i * 0.15), () => { pp(pR(-62, -44, 124, 88, 14), PR.navy, { key: 'q' + i, sb: 10, sy: 5, tex: 0.5 }); txt('+?', 0, 21, 60, PR.mustard, { align: 'center', weight: 800 }); });
  tidu(OWL_X, OWL_Y, { hat: 'explorer', key: 'o2', look: -18, hand: { x: -300, y: -300 }, hold: propGlass(-0.5), mood: 'flat' });
  prSign('MỖI LẦN TĂNG BAO NHIÊU?', { kicker: KICK });
  prChips();
};
SCENES.d1 = () => {   // a plum studio: 2 → 5 is +3
  prWall(PR.plum, { panel: 'rgba(0,0,0,0.10)', gap: 120, streak: 420 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(960, 1230, 56, 2, 10 + TT * 6, 'clk3');
  qlDesk(); qlRow({ ask: -10, lit: [0, 1] }); qlArrows(1);
  tidu(OWL_X, OWL_Y, { hat: 'builder', key: 'o3', look: -16, mood: 'happy' });
  prSign('2 → 5: CỘNG 3', { kicker: KICK });
  prChips();
};
SCENES.d2 = () => {   // a teal room: 5 → 10 is +5
  prWall(PR.teal, { panel: 'rgba(255,255,255,0.06)', streak: 380 });
  prBunting(-14, [PR.mustard, PR.cream, PR.red, PR.blue], 'bun4');
  prFloor(1560, PR.woodD, { trim: false });
  qlDesk(); qlRow({ ask: -10, lit: [1, 2] }); qlArrows(2);
  tidu(OWL_X, OWL_Y, { hat: 'chef', key: 'o4', look: -16, mood: 'happy' });
  prSign('5 → 10: CỘNG 5', { kicker: KICK });
  prChips();
};
SCENES.d3 = () => {   // a sand kitchen: 10 → 17 is +7
  prWall('#c9b28a', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1560, PR.floorD, { trim: false });
  qlStars([[1000, 1230, 16]]);
  qlDesk(); qlRow({ ask: -10, lit: [2, 3] }); qlArrows(3);
  tidu(OWL_X, OWL_Y, { hat: 'mortar', key: 'o5', look: -16, mood: 'wow' });
  prSign('10 → 17: CỘNG 7', { kicker: KICK });
  prChips();
};
SCENES.next = () => {   // dusk: the steps 3, 5, 7 grow by 2 each, so (by this rule) the next step is 9
  const t3 = VW('next', 'ba').t0, t9 = qlStep(3);
  prWall('#4a4566', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floorD, { trim: false });
  qlDesk(); qlRow({ ask: -10 }); qlArrows(3, { lit: TT > t3 && TT < t9 });
  qlArrow(3, ev(qlDraw(3), 0.5), t9, { dash: true });
  // the steps as their own row: 3 5 7 9, +2 between
  ['3', '5', '7', '9'].forEach((s, i) => {
    const x = 150 + i * 180, t = i < 3 ? t3 + i * 0.3 : t9;
    withT(x, 1170, 0, popS(t), () => { pp(pE(0, 0, 64, 64), QL.stepFill[i], { key: 'odd' + i, sb: 10, sy: 5, tex: 0.5 }); txt(s, 0, 26, 74, PR.creamL, { align: 'center', weight: 800 }); });
    if (i) withT(x - 90, 1090, 0, popS(t + 0.1), () => txt('+2', 0, 0, 40, PR.mustard, { align: 'center', weight: 800 }));
  });
  qlTag('một quy luật phù hợp', 400, 1320, VW('next', 'quy').t0, PR.navy, 0.02);
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o6', look: -14, mood: TT > t9 ? 'happy' : 'neutral' });
  prSign('THEO QUY LUẬT: CỘNG 9', { kicker: KICK });
  prChips();
};
SCENES.ans = () => {   // a warm studio: 17 + 9; the 26 note falls into the empty slot
  const td = qlDrop();
  prWall(PR.slate, { panel: 'rgba(0,0,0,0.04)', streak: 300 });
  prFloor(1560, PR.woodD, { trim: false });
  qlStars([[900, 1240, 16], [1010, 1180, 12]]);
  qlDesk(); qlRow({ ask: -10, last: td }); qlArrows(4);
  qlTag('17 + 9 = 26', 420, 1240, VW('ans', 'cộng').t0, PR.green);
  prBurst(QL.xs[4], QL.y, td + 0.4, { n: 22 });
  tidu(OWL_X, OWL_Y, { hat: 'crown', key: 'o7', look: -14, mood: TT > td + 0.3 ? 'happy' : 'wow' });
  prSign('2, 5, 10, 17, 26', { kicker: KICK });
  prChips();
};
SCENES.cta = () => {   // a corkboard: 10, 17, 26 and an empty note — what comes next?
  const t0 = E0, tq = VW('cta', 'sau').t0, tend = VL('cta').words[VL('cta').words.length - 1].t0;
  prWall('#c79a5b', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1600, PR.floorD, { trim: false });
  prCorkboard(70, 440, 860, 560, 'cork8');
  [['10', '#bfe0b0'], ['17', '#f3c0b8'], ['26', '#f3e3a5'], ['?', '#a9cbe0']].forEach(([s, c], i) => {
    const x = 180 + i * 210, t = i < 3 ? t0 + 0.1 + i * 0.15 : tq;
    withT(x, 620 + (i % 2) * 40, (i % 2 ? 1 : -1) * 0.05, popS(t), () => { prNote(0, 0, 170, 170, c, 0, 'cn' + i); txt(s, 0, 30, 84, i === 3 ? PR.red : PR.navy, { align: 'center', weight: 800 }); pp(pE(0, -68, 11, 11), PR.red, { key: 'pin' + i, sb: 4, sy: 2, tex: 0.3 }); });
    if (i) withT(x - 105, 820, 0, popS(t + 0.1), () => txt(['', '+7', '+9', '+ ?'][i], 0, 0, 44, PR.creamL, { align: 'center', weight: 800 }));
  });
  qlTag('Bình luận đáp án!', 430, 1100, tend, PR.navy);
  tidu(OWL_X, OWL_Y, { hat: 'party', key: 'o8', look: -16, mood: TT > tend ? 'happy' : 'wow' });
  prSign('SỐ SAU 26 LÀ GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE — one shot per line (in script order); SPLITS = [[lineId, word, n, sceneKey]] cut again on a word
// =====================================================================
const SPLITS = [];
// sound cues: 'type' (n clicks over d s), 'tick', 'pop', 'thud' (stamp), 'chime'. Static: computed from VOICE, never during a frame.
function SFX_CUES() {
  const c = [];
  for (let i = 0; i < 4; i++) c.push({ k: 'tick', t: 0.3 + i * 0.25 });
  c.push({ k: 'pop', t: VW('hook', 'bảy').t0 + 0.3 });
  for (let i = 0; i < 4; i++) c.push({ k: 'pop', t: qlStep(i) });
  c.push({ k: 'thud', t: qlDrop() + 0.35 });
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
