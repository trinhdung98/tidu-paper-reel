// =====================================================================
//  TIDU MATH 02 — "100 trừ 48 trong nháy mắt". One scene per voice line. 100 is ten paper ten-strips: five are taken
//  away (100 − 50), two unit dots come back (+2), so the eye sees why rounding 48 up to 50 means giving 2 back.
// =====================================================================
TIDU_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const OWL_X = 880, OWL_Y = 1800, KICK = 'TIDU MATH · TÍNH NHẨM';
const SCENES = {};
const MM = { hundred: '#f2c94c', fortyEight: '#a9cbe0', fifty: '#e6b82a', strip: '#2aa79b', cell: '#f7ead0', gone: '#d9c7a6', red: '#d2453a', dot: '#e07a4f' };

// a paper number card centred at (x, y)
function mmCard(x, y, w, h, str, fill, o = {}) {
  withT(x, y, o.rot ?? 0, o.s ?? 1, () => {
    pp(pR(-w / 2, -h / 2, w, h, 18), fill, { key: o.key ?? 'card' + str, sb: 18, sy: 9, tex: 0.5, rim: 'rgba(255,255,255,0.35)' });
    txt(String(str), 0, h * 0.2, fitSize(String(str), w - 40, o.size ?? h * 0.62), o.color ?? PR.navy, { align: 'center', weight: 800 });
  });
}
// a ten-strip: ten unit cells stacked, top-left at (x, y); o.red lists the cells drawn red, o.hide the cells already gone
const MM_C = 38, MM_W = 46;
function mmStrip(x, y, key, o = {}) {
  pp(pR(x, y, MM_W, 10 * MM_C + 8, 6), o.fill ?? MM.strip, { key: key + 's', sb: 10, sy: 5, tex: 0.5 });
  for (let k = 0; k < 10; k++) {
    if (o.hide?.includes(k)) continue;
    pp(pR(x + 5, y + 5 + k * MM_C, MM_W - 10, MM_C - 4, 4), o.red?.includes(k) ? MM.red : (o.cell ?? MM.cell), { key: key + 'c' + k, shadow: false, tex: 0.4 });
  }
}
const mmCellXY = (x, y, k) => [x + MM_W / 2, y + 5 + k * MM_C + (MM_C - 4) / 2];
function mmDot(x, y, r, key) { pp(pE(x, y, r, r), MM.dot, { key, sb: 8, sy: 4, tex: 0.5, rim: 'rgba(255,230,210,0.4)' }); }
// strip i of the hundred (0..9): the left five stay, the right five are taken away and slide right
const MM_X0 = 110, MM_Y0 = 500, MM_GAP = 60;
const mmStripX = (i, away) => (i < 5 ? MM_X0 + i * MM_GAP : MM_X0 + i * MM_GAP + 230 * away);
function mmHundred(away, o = {}) {
  for (let i = 0; i < 10; i++) {
    const gone = i >= 5, x = mmStripX(i, gone ? away : 0);
    withT(x + MM_W / 2, MM_Y0 + 194, gone ? 0.05 * away : 0, 1, () => mmStrip(-MM_W / 2, -194, 'st' + i, {
      fill: gone && away > 0.5 ? '#8fb9b0' : MM.strip, cell: gone && away > 0.5 ? MM.gone : MM.cell,
      red: i === 9 ? o.red : undefined, hide: i === 9 ? o.hide : undefined,
    }));
  }
}
function mmTag(str, x, y, t, fill, rot = -0.05) {
  withT(x, y, rot, popS(t), () => { const w = txtW(str, 54) + 50; pp(pR(-w / 2, -44, w, 88, 12), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.5 }); txt(str, 0, 19, 54, PR.creamL, { align: 'center', weight: 800 }); });
}
function mmBooks(x, yb, key) { [[190, PR.blue], [170, PR.mustard], [204, PR.red]].forEach(([w, c], i) => pp(pR(x - w / 2 + (i % 2) * 8, yb - 40 * (i + 1), w, 38, 4), c, { key: key + i, sb: 8, sy: 4, tex: 0.5 })); }
function mmStars(pts) { pts.forEach(([x, y, r], i) => prStar(x, y, r * (1 + Math.sin(TT * 3 + i * 1.7) * 0.12), i % 2 ? PR.yellow : PR.mustard)); }

// ---- times shared by scenes and sound cues
const mmHops = () => { const a = VW('round', 'tròn').t0; return [a + 0.1, a + 0.7]; };
const mmAway = () => VW('sub', 'trừ').t0;
const mmBack = () => { const a = VW('over', 'trả').t0; return [a, a + 0.3]; };
const mmStampT = () => VW('add', 'hai', 1).t0;

SCENES.hook = () => {   // a classroom: the 100 and 48 cards slam together; column subtraction is crossed out
  const t0 = E0, hit = t0 + 0.42;
  prWall(PR.slate, { streak: 620 });
  prBunting(-14, undefined, 'bun1');
  prFloor(1560, PR.woodD, { trim: false });
  mmStars([[880, 760, 22], [1010, 840, 16]]);
  mmBooks(930, 1250, 'bk1');
  mmCard(springMove(t0 + 0.05, 140, 250, SPRING.playful), 620, 320, 230, '100', MM.hundred, { rot: -0.04, key: 'c100', s: popS(t0 + 0.02) });
  mmCard(springMove(t0 + 0.05, 860, 690, SPRING.playful), 620, 250, 230, '48', MM.fortyEight, { rot: 0.05, key: 'c48', s: popS(t0 + 0.02) });
  withT(470, 620, 0, popS(hit), () => txt('−', 0, 34, 120, PR.creamL, { align: 'center', weight: 800 }));
  prBurst(470, 620, hit, { n: 18 });
  withT(470, 860, 0, popS(hit + 0.5), () => txt('= ?', 0, 40, 130, PR.creamL, { align: 'center', weight: 800 }));
  const td = VW('hook', 'đặt').t0;
  withT(300, 1130, -0.06, popS(td - 0.15), () => {
    prNote(0, 0, 240, 210, '#f3e3a5', 0, 'ncol');
    txt('100', 50, -30, 50, PR.navy, { align: 'right', weight: 700, font: F_MONO });
    txt('− 48', 50, 22, 50, PR.navy, { align: 'right', weight: 700, font: F_MONO });
    ctx.fillStyle = PR.navy; ctx.fillRect(-70, 40, 130, 5);
  });
  prCross(390, 1060, VW('hook', 'tính', 1).t0, 46);
  tidu(OWL_X, OWL_Y, { hat: 'propeller', key: 'o1', look: -16, mood: TT > hit ? 'wow' : 'neutral' });
  prSign('100 − 48 = ?', { kicker: KICK });
  prChips();
};
SCENES.round = () => {   // a night desk: 48 slides up and becomes 50; a token hops 48 → 49 → 50 on a paper ruler
  const [h1, h2] = mmHops(), t50 = VW('round', 'năm').t0;
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floor, { studs: true });
  pp(pE(990, 1180, 44, 44), '#f3e3a5', { key: 'moon', sb: 14, sy: 4, tex: 0.5 });
  mmStars([[860, 1230, 12], [1040, 1080, 10]]);
  const v = TT < h1 ? 48 : TT < h2 ? 49 : 50, bump = Math.max(0, 1 - Math.min(Math.abs(TT - h1), Math.abs(TT - h2)) / 0.18) * 0.12;
  mmCard(440, springMove(h1, 700, 560, SPRING.playful), 300, 230, String(v), v === 50 ? MM.fifty : MM.fortyEight, { s: popS(E0 + 0.05) * (1 + bump), rot: 0.03, key: 'cr' });
  mmTag('+2', 700, 470, t50, PR.green, 0.06);
  // the ruler 44..52, wide enough for each +1 hop to read
  const rx = (n) => 130 + (n - 44) * 92, ry = 1020;
  pp(pR(80, ry - 70, 830, 150, 10), PR.creamL, { key: 'ruler', sb: 14, sy: 7, tex: 0.5 });
  ctx.save(); ctx.strokeStyle = PR.navy; ctx.lineWidth = 4;
  for (let n = 44; n <= 52; n++) { ctx.beginPath(); ctx.moveTo(rx(n), ry - 60); ctx.lineTo(rx(n), ry - (n % 5 === 0 ? 22 : 38)); ctx.stroke(); }
  ctx.restore();
  [45, 48, 49, 50].forEach((n) => txt(String(n), rx(n), ry + 44, n === 45 ? 32 : 40, n === 50 && TT > h2 ? PR.green : PR.navy, { align: 'center', weight: 800 }));
  const hop = (a, from, to) => { const u = EZ.o2(ev(a, 0.4)); return [lerp(rx(from), rx(to), u), ry - 90 - Math.sin(u * Math.PI) * 90]; };
  const [tx, ty] = TT < h2 ? hop(h1, 48, 49) : hop(h2, 49, 50);
  [[h1, 48], [h2, 49]].forEach(([a, n]) => { if (TT > a) { chalkLine(Array.from({ length: 20 }, (_, i) => { const u = i / 19; return [lerp(rx(n), rx(n + 1), u), ry - 90 - Math.sin(u * Math.PI) * 90]; }), ev(a, 0.4), { color: PR.mustard, w: 6, dash: [10, 10] }); withT((rx(n) + rx(n + 1)) / 2, ry - 210, 0, popS(a + 0.2), () => txt('+1', 0, 0, 38, PR.creamL, { align: 'center', weight: 800 })); } });
  mmDot(tx, ty, 26, 'tok');
  tidu(OWL_X, OWL_Y, { hat: 'builder', key: 'o2', look: -16, hand: { x: -330, y: -340 }, hold: propStick(-0.6), mood: TT > t50 ? 'happy' : 'neutral' });
  prSign('LÀM TRÒN: 48 → 50', { kicker: KICK });
  prChips();
};
SCENES.sub = () => {   // a plum studio: the hundred is ten strips; five slide away on "trừ"; the count card runs 100 → 50
  const ta = mmAway(), tb = VW('sub', 'bằng').t0, away = EZ.o3(ev(ta, 0.6));
  prWall(PR.plum, { panel: 'rgba(0,0,0,0.10)', gap: 120, streak: 420 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(960, 1180, 60, 2, 10 + TT * 6, 'clk3');
  mmHundred(away);
  mmTag('− 50', 820, 450, ta + 0.3, PR.red);
  mmCard(300, 1120, 300, 180, String(countUp(tb - 0.1, 0.6, 100, 50)), TT >= tb + 0.5 ? MM.fifty : MM.hundred, { s: popS(E0 + 0.1), key: 'cnt3' });
  tidu(OWL_X, OWL_Y, { hat: 'chef', key: 'o3', look: -14, mood: TT > tb ? 'happy' : 'neutral' });
  prSign('100 − 50 = 50', { kicker: KICK });
  prChips();
};
SCENES.over = () => {   // a teal room: two cells of the taken-away 50 turn red ("thừa 2") and hop back as dots
  const th = VW('over', 'hai').t0, [b1, b2] = mmBack(), red = TT > th ? [0, 1] : [];
  prWall(PR.teal, { panel: 'rgba(255,255,255,0.06)', streak: 380 });
  prFloor(1560, PR.woodD, { trim: false });
  mmHundred(1, { red: TT < b1 ? red : TT < b2 ? [1] : [], hide: TT < b1 ? [] : TT < b2 ? [0] : [0, 1] });
  mmTag('thừa 2', 790, 450, th, PR.red, 0.05);
  mmTag('50 = 48 + 2', 790, 990, VW('over', 'nhiều').t0, PR.navy);
  const sx = mmStripX(9, 1), home = [[MM_X0 + 5 * MM_GAP + 14, 1090 - 30], [MM_X0 + 5 * MM_GAP + 14, 1090 + 30]];
  [b1, b2].forEach((t, k) => {
    if (TT < t) return;
    const [fx, fy] = mmCellXY(sx, MM_Y0, k), u = EZ.o2(ev(t, 0.5)), [hx, hy] = home[k];
    mmDot(lerp(fx, hx, u), lerp(fy, hy, u) - Math.sin(u * Math.PI) * 220, 22, 'back' + k);
  });
  mmCard(260, 1090, 260, 170, '50', MM.fifty, { key: 'cnt4' });
  tidu(OWL_X, OWL_Y, { hat: 'explorer', key: 'o4', look: -18, hand: { x: -300, y: -300 }, hold: propGlass(-0.5), mood: TT > b2 ? 'happy' : 'flat' });
  prSign('TRỪ THỪA 2, TRẢ LẠI 2', { kicker: KICK });
  prChips();
};
SCENES.add = () => {   // a sand kitchen: 50 + 2 dots; the count morphs to 52 and 52 is stamped red
  const tb = VW('add', 'bằng').t0, ts = mmStampT();
  prWall('#c9b28a', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1560, PR.floorD, { trim: false });
  pp(pR(800, 900, 230, 22, 4), PR.wood, { key: 'shelf5', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(820, 820, 70, 80, 12), PR.blue, { key: 'jar5', sb: 8, sy: 4, tex: 0.5 }); pp(pR(930, 836, 64, 64, 12), PR.green, { key: 'jar6', sb: 8, sy: 4, tex: 0.5 });
  for (let i = 0; i < 5; i++) mmStrip(MM_X0 + i * MM_GAP, MM_Y0, 'sa' + i);
  [[MM_X0 + 5 * MM_GAP + 14, 820], [MM_X0 + 5 * MM_GAP + 14, 880]].forEach(([x, y], k) => mmDot(x, y, 22, 'ad' + k));
  withT(560, 700, 0, popS(VW('add', 'cộng').t0), () => txt('+ 2', 0, 30, 96, PR.navy, { align: 'center', weight: 800 }));
  mmCard(260, 1100, 280, 180, String(countUp(tb, 0.5, 50, 52)), TT > tb + 0.5 ? MM.hundred : MM.fifty, { key: 'cnt5' });
  prStamp('52', 600, 1090, PR.red, ts, { rot: -0.08, size: 140 });
  prBurst(600, 1090, ts + 0.16, { n: 22 });
  tidu(OWL_X, OWL_Y, { hat: 'crown', key: 'o5', look: -14, mood: TT > ts + 0.16 ? 'happy' : 'neutral' });
  prSign('100 − 48 = 52', { kicker: KICK });
  prChips();
};
SCENES.tip = () => {   // dusk classroom: the three steps on the board, ticked in turn; round tens light up
  const t0 = E0, tr = VW('tip', 'tròn').t0;
  prWall('#4a4566', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1560, PR.floorD, { trim: false });
  prBoard(40, 420, 1000, 640, 'b6');
  [['48 → 50', '(+2)'], ['100 − 50 = 50', ''], ['50 + 2 = 52', '']].forEach(([a, b], i) => {
    const t = t0 + 0.15 + i * 0.35, y = 540 + i * 150;
    withT(110, y, 0, popS(t), () => { txt(`${i + 1}.`, 0, 0, 60, PR.mustard, { weight: 800 }); txt(a, 80, 0, 70, PR.creamL, { weight: 800 }); if (b) txt(b, 80 + txtW(a, 70) + 30, 0, 52, PR.green, { weight: 800 }); });
    prCheck(900, y - 22, t + 0.25, 40);
  });
  [10, 20, 30, 40, 50].forEach((n, i) => mmCard(150 + i * 150, 1180, 120, 100, String(n), TT > tr + i * 0.08 ? MM.hundred : PR.creamL, { s: popS(tr - 0.1 + i * 0.08), rot: (i % 2 ? 1 : -1) * 0.04, key: 'tc' + n, size: 56 }));
  tidu(OWL_X, OWL_Y, { hat: 'mortar', key: 'o6', look: -14, mood: 'happy' });
  prSign('MẸO: CHỌN SỐ TRÒN CHỤC', { kicker: KICK });
  prChips();
};
SCENES.cta = () => {   // a warm wall: the save ribbon pops on "Lưu", then the next challenge 100 − 69 with a 69 → 70 hint
  const tl = VW('cta', 'lưu').t0, tt = VW('cta', 'thử').t0, tc = VW('cta', 'chín').t0, tend = VL('cta').words[VL('cta').words.length - 1].t0;
  prWall('#c79a5b', { panel: 'rgba(0,0,0,0.05)', streak: 540 });
  prFloor(1600, PR.floorD, { trim: false });
  for (let i = 0; i < 5; i++) pp(pR(70 + i * 210, 380, 28, 1250, 4), '#2b2a2e', { key: 'bar' + i, sb: 10, sy: 5, tex: 0.5 });
  withT(250, 560, -0.05, popS(tl), () => {
    pp(pG([[-70, -100], [70, -100], [70, 100], [0, 55], [-70, 100]]), PR.red, { key: 'save', sb: 14, sy: 7, tex: 0.5, rim: 'rgba(255,220,210,0.4)' });
    txt('LƯU', 0, -10, 40, PR.creamL, { align: 'center', weight: 800 });
  });
  prBurst(250, 560, tl + 0.1, { n: 16 });
  mmCard(560, 850, 620, 220, '100 − 69 = ?', PR.creamL, { s: popS(tt), rot: 0.02, key: 'next', size: 110 });
  withT(560, 1110, -0.05, popS(tc + 0.15), () => { prNote(0, 0, 330, 150, '#bfe0b0', 0, 'hint'); txt('69 → 70', 0, 22, 66, PR.navy, { align: 'center', weight: 800 }); });
  tidu(OWL_X, OWL_Y, { hat: 'party', key: 'o7', look: -16, mood: TT > tend ? 'happy' : 'wow' });
  prSign('THỬ NGAY: 100 − 69', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE — one shot per line (in script order); SPLITS = [[lineId, word, n, sceneKey]] cut again on a word
// =====================================================================
const SPLITS = [];
// sound cues: 'type' (n clicks over d s), 'tick', 'pop', 'thud' (stamp), 'chime'. Static: computed from VOICE, never during a frame.
function SFX_CUES() {
  const c = [{ k: 'thud', t: 0.47 }];
  c.push({ k: 'pop', t: VW('hook', 'tính', 1).t0 });
  for (const t of mmHops()) c.push({ k: 'tick', t: t + 0.35 });
  c.push({ k: 'pop', t: VW('round', 'năm').t0 });
  c.push({ k: 'pop', t: mmAway() + 0.3 });
  for (const t of mmBack()) c.push({ k: 'pop', t: t + 0.5 });
  c.push({ k: 'thud', t: mmStampT() + 0.16 });
  c.push({ k: 'pop', t: VW('cta', 'lưu').t0 }, { k: 'chime', t: VL('cta').words[VL('cta').words.length - 1].t0 });
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
