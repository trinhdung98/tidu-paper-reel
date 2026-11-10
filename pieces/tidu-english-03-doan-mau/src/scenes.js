// =====================================================================
//  TIDU ENGLISH 03 — "Đoán màu bằng tiếng Anh"
//  Mascot: polly() parrot with distinct hats and moods per scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · MÀU SẮC';
const SCENES = {};
const WALL_BASE = '#c9b28a';
const FLOOR_Y = 1470;
const bumpK = (t, amt = 0.16, d = 0.4) => (TT < t ? 1 : 1 + amt * Math.sin(Math.PI * clamp((TT - t) / d)));
const fadeA = (t, to = 0.35) => lerp(1, to, ev(t, 0.3));
function withA(a, fn) { ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// ---- props
function propApple(x, y, s = 1) {
  withT(x, y, 0, s, () => {
    pp(pR(-6, -115, 12, 40, 4), PR.wood, { key: 'ap_st', sb: 4, sy: 2, tex: 0.3 });
    pp(pE(26, -105, 26, 12, 0.4), PR.green, { key: 'ap_lf', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(-32, -25, 62, 70), PR.red, { key: 'ap_l1', sb: 16, sy: 8, tex: 0.55 });
    pp(pE(32, -25, 62, 70), PR.red, { key: 'ap_l2', sb: 16, sy: 8, tex: 0.55 });
    pp(pE(-28, -48, 14, 28, -0.2), PR.paperW, { shadow: false, tex: false });
  });
}

function propBalloon(x, y, s = 1, strLen = 150) {
  const bob = Math.sin(TT * 3) * 6;
  withT(x, y + bob, Math.sin(TT * 2) * 0.05, s, () => {
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(0, 70); ctx.quadraticCurveTo(15, (70 + strLen) / 2, -10, strLen); ctx.stroke(); ctx.restore();
    pp(pG([[-12, 72], [12, 72], [0, 56]]), PR.blue, { key: 'bl_kn', sb: 4, sy: 2, tex: 0.4 });
    pp(pE(0, -30, 84, 102), PR.blue, { key: 'bl_bd', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.4)' });
    pp(pE(-30, -55, 16, 32, -0.2), PR.paperW, { shadow: false, tex: false });
  });
}

function propSun(x, y, s = 1) {
  withT(x, y, 0, s, () => {
    withT(0, 0, TT * 0.5, 1, () => {
      ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 6; ctx.lineCap = 'round';
      for (let i = 0; i < 12; i++) {
        const an = i / 12 * TAU;
        ctx.beginPath();
        ctx.moveTo(Math.cos(an) * 92, Math.sin(an) * 92);
        ctx.lineTo(Math.cos(an) * 124, Math.sin(an) * 124);
        ctx.stroke();
      }
      ctx.restore();
    });
    pp(pE(0, 0, 80, 80), PR.yellow, { key: 'sn_dc', sb: 18, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.6)' });
  });
}

// everyday toys, drawn standing on (x, yb)
function engBall(x, yb, r, col, key) {
  pp(pE(x, yb - r, r, r), col, { key: key + 'b', sb: 12, sy: 6, tex: 0.5 });
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, yb - r, r, r, 0, 0, TAU); ctx.clip();
  ctx.strokeStyle = 'rgba(249,248,244,0.75)'; ctx.lineWidth = r * 0.22;
  ctx.beginPath(); ctx.ellipse(x, yb - r, r * 0.45, r * 1.1, 0.5, 0, TAU); ctx.stroke(); ctx.restore();
}
function engCup(x, yb, col, key, s = 1) {
  withT(x, yb, 0, s, () => {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(40, -48, 22, 24, 0, -1.4, 1.4); ctx.stroke(); ctx.restore();
    pp(pG([[-46, -96], [46, -96], [36, 0], [-36, 0]]), col, { key: key + 'c', sb: 12, sy: 6, tex: 0.5 });
    pp(pE(0, -96, 46, 9), 'rgba(20,20,30,0.35)', { shadow: false, tex: false });
  });
}
function engBook(x, yb, col, key, s = 1) {
  withT(x, yb, 0.06, s, () => {
    pp(pR(-34, -128, 68, 128, 6), col, { key: key + 'k', sb: 12, sy: 6, tex: 0.55 });
    pp(pR(-34, -104, 68, 14, 2), 'rgba(249,248,244,0.7)', { shadow: false, tex: false });
    pp(pR(-34, -34, 68, 10, 2), 'rgba(249,248,244,0.7)', { shadow: false, tex: false });
  });
}
function engCar(x, yb, col, key, s = 1) {
  withT(x, yb, 0, s, () => {
    pp(pR(-36, -86, 70, 40, 12), col, { key: key + 'cab', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-26, -78, 50, 26, 6), PR.sky, { shadow: false, tex: 0.3 });
    pp(pR(-64, -56, 128, 40, 14), col, { key: key + 'car', sb: 12, sy: 6, tex: 0.55 });
    [-36, 36].forEach((wx) => { pp(pE(wx, -16, 17, 17), PR.char, { key: key + 'wh' + wx, sb: 6, sy: 3, tex: 0.3 }); pp(pE(wx, -16, 6, 6), PR.grey, { shadow: false, tex: false }); });
  });
}
function engDuck(x, yb, col, key, s = 1) {
  withT(x, yb, 0, s, () => {
    pp(pE(-6, -36, 54, 36), col, { key: key + 'db', sb: 12, sy: 6, tex: 0.5 });
    pp(pE(26, -84, 28, 28), col, { key: key + 'dh', sb: 8, sy: 4, tex: 0.5 });
    pp(pG([[48, -88], [74, -80], [48, -72]]), PR.orange, { shadow: false, tex: 0.4 });
    pp(pE(34, -92, 5, 5), PR.ink, { shadow: false, tex: false });
    pp(pE(-14, -40, 26, 14, -0.3), 'rgba(255,255,255,0.25)', { shadow: false, tex: false });
  });
}
function engCrayon(x, yb, col, key, s = 1) {
  withT(x, yb, 0.12, s, () => {
    pp(pG([[-18, -118], [18, -118], [0, -150]]), col, { key: key + 'tip', sb: 6, sy: 3, tex: 0.4 });
    pp(pR(-18, -120, 36, 120, 5), col, { key: key + 'cr', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-18, -86, 36, 50, 2), 'rgba(249,248,244,0.55)', { shadow: false, tex: false });
  });
}
function engBlock(x, yb, col, key, s = 1) {
  withT(x, yb, 0, s, () => {
    pp(pR(-46, -92, 92, 92, 8), col, { key: key + 'f', sb: 12, sy: 6, tex: 0.5 });
    pp(pG([[-46, -92], [-24, -114], [68, -114], [46, -92]]), col, { key: key + 't', shadow: false, tex: 0.5 });
    pp(pG([[-46, -92], [-24, -114], [68, -114], [46, -92]]), 'rgba(255,255,255,0.25)', { shadow: false, tex: false });
    pp(pG([[46, -92], [68, -114], [68, -22], [46, 0]]), 'rgba(0,0,0,0.22)', { shadow: false, tex: false });
  });
}
function engJar(x, yb, col, key) {
  pp(pR(x - 44, yb - 104, 88, 104, 16), 'rgba(216,236,241,0.9)', { key: key + 'g', sb: 10, sy: 5, tex: 0.35, rim: 'rgba(255,255,255,0.7)' });
  pp(pR(x - 36, yb - 70, 72, 62, 10), col, { key: key + 'p', shadow: false, tex: 0.5 });
  pp(pR(x - 48, yb - 118, 96, 22, 6), PR.wood, { key: key + 'l', sb: 6, sy: 3, tex: 0.4 });
}

// ---- room
function engBunting(y) {
  const cols = [PR.red, PR.cream, PR.blue, PR.mustard, PR.green];
  ctx.save(); ctx.strokeStyle = PR.woodD; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(70, y); ctx.quadraticCurveTo(540, y + 36, 1010, y); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 9; i++) {
    const x = 96 + i * 104, u = (x + 42 - 70) / 940, yy = y + 36 * 2 * u * (1 - u), sw = Math.sin(TT * 3 + i) * 4;
    pp(pG([[x, yy], [x + 84, yy], [x + 42 + sw, yy + 62]]), cols[i % cols.length], { key: 'ebun' + i, sb: 8, sy: 4, tex: 0.5 });
  }
}
function engDrawing(x, y) {
  withT(x, y, 0.06, 1, () => {
    pp(pR(-42, -52, 84, 104, 4), PR.paperW, { key: 'edrw', sb: 8, sy: 4, tex: 0.4 });
    pp(pE(-10, -18, 16, 16), PR.yellow, { shadow: false, tex: 0.4 });
    pp(pG([[-30, 40], [0, 4], [30, 40]]), PR.green, { shadow: false, tex: 0.4 });
    pp(pE(0, -52, 7, 7), PR.red, { key: 'edrwpin', sb: 4, sy: 2, tex: 0.3 });
  });
}
function engRoom(wallCol, o = {}) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(FLOOR_Y, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, FLOOR_Y - 14, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  engBunting(314);
  if (o.wall !== false) { prClock(120, 1110, 40, 10, 10); engDrawing(965, 1080); }
}
function engBench(items) {
  [190, 580].forEach((lx) => pp(pR(lx - 10, 1340, 20, FLOOR_Y - 1340, 4), PR.woodD, { key: 'bleg' + lx, sb: 6, sy: 3, tex: 0.4 }));
  pp(pR(170, 1326, 430, 26, 6), PR.woodL, { key: 'bench', sb: 12, sy: 6, tex: 0.5 });
  items.forEach((f, i) => f([255, 385, 515][i], 1328));
}
function engKid(x, s, o = {}) {
  const key = o.key ?? 'kid' + x, skin = o.skin ?? '#f1c7a0', up = o.up ?? [false, false], talk = o.talk ?? 0;
  withT(x, FLOOR_Y, 0, s, () => {
    [-21, 21].forEach((lx) => { pp(pR(lx - 13, -74, 26, 70, 8), '#3d4f7a', { key: key + 'leg' + lx, sb: 6, sy: 3, tex: 0.4 }); pp(pE(lx + (lx < 0 ? -4 : 4), -6, 22, 11), PR.char, { key: key + 'sh' + lx, shadow: false, tex: 0.3 }); });
    [-1, 1].forEach((d, i) => {
      const sx = d * 50, sy = -184, hx = up[i] ? d * 96 : d * 70, hy = up[i] ? -300 : -96;
      const len = Math.hypot(hx - sx, hy - sy), a = Math.atan2(hy - sy, hx - sx);
      pp(pE((sx + hx) / 2, (sy + hy) / 2, len / 2 + 8, 15, a), o.shirt, { key: key + 'arm' + d, sb: 6, sy: 3, tex: 0.45 });
      pp(pE(hx, hy, 15, 15), skin, { key: key + 'hand' + d, shadow: false, tex: 0.3 });
    });
    pp(pR(-56, -204, 112, 140, 30), o.shirt, { key: key + 'body', sb: 12, sy: 6, tex: 0.5 });
    pp(pE(0, -262, 54, 56), skin, { key: key + 'head', sb: 10, sy: 5, tex: 0.35 });
    pp(pA(0, -268, 58, Math.PI * 1.02, TAU - 0.02), o.hair, { key: key + 'hair', shadow: false, tex: 0.5 });
    if (o.tails) [-1, 1].forEach((d) => pp(pE(d * 62, -262, 16, 30, d * 0.3), o.hair, { key: key + 'tail' + d, sb: 4, sy: 2, tex: 0.5 }));
    [-20, 20].forEach((ex) => pp(pE(ex, -258, 6, 7), PR.ink, { shadow: false, tex: false }));
    [-32, 32].forEach((cx) => pp(pE(cx, -240, 10, 6), PR.pink, { shadow: false, tex: false }));
    if (talk > 0.05) pp(pE(0, -230, 11, 4 + 10 * talk), '#7a3030', { shadow: false, tex: false });
    else { ctx.save(); ctx.strokeStyle = '#7a3030'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, -238, 12, 0.3, Math.PI - 0.3); ctx.stroke(); ctx.restore(); }
  });
}
const KIDS = [{ shirt: PR.green, hair: PR.woodD, tails: true, key: 'kidA' }, { shirt: PR.orange, hair: PR.char, key: 'kidB', skin: '#e2ae86' }];

const WORD_CARD = { x: 540, y: 780, w: 720, h: 740 };
function engWordCard(key, rot, word, col, meaning, tWord, drawObj) {
  const { x, y, w, h } = WORD_CARD;
  withT(x, y, rot, 1, () => {
    pp(pR(-w / 2, -h / 2, w, h, 26), PR.creamL, { key: key + 'cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-w / 2 + 20, -h / 2 + 20, w - 40, h - 40, 18), PR.paperW, { key: key + 'in', shadow: false, tex: 0.45 });
    drawObj();
    const k = popS(tWord);
    withT(0, 170, 0, k, () => txt(word, 0, 0, fitSize(word, 620, 130), col, { align: 'center', base: 'middle', weight: 800 }));
    withT(0, 282, 0, k, () => txt(meaning, 0, 0, 52, PR.navy, { align: 'center', base: 'middle', weight: 800 }));
  });
}

// three small colour cards (repeat + recap share the layout)
const MINI = [[260, 'red', 'RED', PR.red, 'Màu đỏ'], [540, 'blue', 'BLUE', PR.blue, 'Xanh dương'], [820, 'yellow', 'YELLOW', PR.mustard, 'Màu vàng']];
function engMiniCards(scale, checkAt) {
  MINI.forEach(([cx, id, word, col, meaning], i) => {
    withT(cx, 700, (i - 1) * 0.015, scale[i], () => {
      pp(pR(-130, -270, 260, 540, 20), PR.creamL, { key: 'mc' + id, sb: 18, sy: 9, tex: 0.5 });
      pp(pR(-116, -256, 232, 512, 14), PR.paperW, { key: 'mci' + id, shadow: false, tex: 0.4 });
      if (id === 'red') propApple(0, -110, 1.1);
      if (id === 'blue') propBalloon(0, -125, 1.0, 105);
      if (id === 'yellow') propSun(0, -125, 0.85);
      txt(word, 0, 75, fitSize(word, 226, 56), col, { align: 'center', base: 'middle', weight: 800 });
      txt(meaning, 0, 165, fitSize(meaning, 226, 38), PR.navy, { align: 'center', base: 'middle', weight: 800 });
      if (checkAt[i] != null) prCheck(86, -224, checkAt[i], 40);
    });
  });
}

// ---- quiz + answer share the balloon, the question board, the options and the timer spot
function engQuizBalloon() { propBalloon(540, 630, 1.8, 100); }
function engBoard(str, k = 1) {
  withT(540, 880, 0, k, () => {
    pp(pR(-340, -56, 680, 112, 16), PR.navy, { key: 'qz_qbd', sb: 14, sy: 7, tex: 0.5 });
    txt(str, 0, 2, fitSize(str, 620, 58), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
}
function engOption(cx, rot, letter, word, col, s = 1) {
  withT(cx, 1050, rot, s, () => {
    pp(pR(-170, -90, 340, 180, 18), PR.creamL, { key: 'opt' + letter, sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-154, -74, 308, 148, 14), PR.paperW, { key: 'opti' + letter, shadow: false, tex: 0.4 });
    pp(pR(-140, -60, 64, 56, 10), col, { key: 'optt' + letter, shadow: false, tex: 0.4 });
    txt(letter, -108, -31, 38, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt(word, 24, 16, 66, col, { align: 'center', base: 'middle', weight: 800 });
  });
}
function engQuizKids(up, talk = 0) {
  engKid(160, 0.8, { ...KIDS[0], up: up[0], talk });
  engKid(275, 0.8, { ...KIDS[1], up: up[1], talk });
}

// =====================================================================
//  SCENE 1 — hook: "Bạn biết màu đỏ, xanh dương và vàng trong tiếng Anh chưa?"
// =====================================================================
function engSplat(x, y, r, col, key, k) {
  const R = RNG('splat', key);
  const lobes = Array.from({ length: 8 }, (_, i) => { const a = i / 8 * TAU + R.r(-0.25, 0.25), d = r * R.r(0.7, 0.82); return [Math.cos(a) * d, Math.sin(a) * d, r * R.r(0.3, 0.44)]; });
  const drops = Array.from({ length: 3 }, (_, i) => { const a = R.r(0, TAU), d = r * R.r(1.12, 1.2); return [Math.cos(a) * d, Math.sin(a) * d, r * R.r(0.07, 0.1)]; });
  withT(x, y, 0, k, () => {
    pp(() => { for (const [cx, cy, rr] of [[0, 0, r * 0.86], ...lobes, ...drops]) { ctx.moveTo(cx + rr, cy); ctx.ellipse(cx, cy, rr, rr, 0, 0, TAU); } }, col, { key: key + 'sp', sb: 14, sy: 7, tex: 0.55 });
    txt('?', 0, 6, 120, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
}
SCENES.hook = () => {
  engRoom(WALL_BASE);
  prSign('TIẾNG ANH GỌI LÀ GÌ?', { kicker: KICK });

  withT(540, 710, -0.012, 1, () => {
    pp(pR(-430, -290, 860, 580, 10), PR.paperW, { key: 'hk_sheet', sb: 22, sy: 11, tex: 0.5 });
    [-300, 300].forEach((tx) => pp(pR(tx - 46, -306, 92, 30, 4), 'rgba(233,229,218,0.85)', { key: 'hk_tape' + tx, sb: 4, sy: 2, tex: 0.4 }));
    [[-270, PR.red, 'ĐỎ', 'đỏ'], [0, PR.blue, 'XANH DƯƠNG', 'xanh'], [270, PR.yellow, 'VÀNG', 'vàng']].forEach(([sx, col, label, w]) => {
      engSplat(sx, -50, 100, col, 'hk' + w, bumpK(VW('hook', w).t0, 0.18));
      txt(label, sx, 185, fitSize(label, 260, 48), PR.navy, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  engBench([
    (x, y) => engJar(x, y, PR.red, 'jr'),
    (x, y) => { engJar(x, y, PR.blue, 'jb'); withT(x + 14, y - 100, 0.25, 1, () => { pp(pR(-7, -110, 14, 120, 6), PR.wood, { key: 'brush', sb: 6, sy: 3, tex: 0.4 }); pp(pE(0, -118, 11, 20), PR.blue, { shadow: false, tex: 0.4 }); }); },
    (x, y) => engJar(x, y, PR.yellow, 'jy'),
  ]);

  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — red: "Nhìn quả táo này: Red!"
// =====================================================================
SCENES.red = () => {
  engRoom('#bfa77e');
  prSign('MÀU ĐỎ · RED', { kicker: KICK });
  engWordCard('rd', -0.012, 'RED', PR.red, 'màu đỏ', VW('red', 'red').t0, () => propApple(0, -90, 2.2));
  engBench([
    (x, y) => engCar(x, y, PR.red, 'rcar'),
    (x, y) => engBall(x, y, 46, PR.red, 'rball'),
    (x, y) => engCup(x, y, PR.red, 'rcup', 0.95),
  ]);
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'happy', hold: propCard('R', -0.08, PR.red), hand: { x: -240, y: -380 }, key: 'p_red' });
  prChips();
};

// =====================================================================
//  SCENE 3 — blue: "Đây là quả bóng bay màu xanh dương: Blue!"
// =====================================================================
SCENES.blue = () => {
  engRoom('#86a8ba');
  prSign('MÀU XANH DƯƠNG · BLUE', { kicker: KICK });
  engWordCard('bl', 0.012, 'BLUE', PR.blue, 'màu xanh dương', VW('blue', 'blue').t0, () => propBalloon(0, -90, 1.8, 100));
  engBench([
    (x, y) => engBall(x, y, 46, PR.blue, 'bball'),
    (x, y) => engBook(x, y, PR.blue, 'bbook'),
    (x, y) => engCup(x, y, PR.blue, 'bcup', 0.95),
  ]);
  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: 'happy', hold: propCard('B', -0.08, PR.blue), hand: { x: -240, y: -380 }, key: 'p_bl' });
  prChips();
};

// =====================================================================
//  SCENE 4 — yellow: "Còn mặt trời màu vàng: Yellow!"
// =====================================================================
SCENES.yellow = () => {
  engRoom(WALL_BASE);
  prSign('MÀU VÀNG · YELLOW', { kicker: KICK });
  engWordCard('yl', -0.01, 'YELLOW', PR.mustard, 'màu vàng', VW('yellow', 'yellow').t0, () => propSun(0, -130, 1.6));
  engBench([
    (x, y) => engDuck(x, y, PR.yellow, 'yduck'),
    (x, y) => engBall(x, y, 46, PR.yellow, 'yball'),
    (x, y) => engCrayon(x, y, PR.yellow, 'ycray'),
  ]);
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hold: propCard('Y', -0.08, PR.mustard), hand: { x: -240, y: -380 }, key: 'p_yl' });
  prChips();
};

// =====================================================================
//  SCENE 5 — repeat: "Hãy nói theo nhé: Red, Blue, Yellow."
// =====================================================================
SCENES.repeat = () => {
  engRoom('#d4c3a3');
  prSign('HÃY NÓI THEO NHÉ', { kicker: KICK });

  const ts = MINI.map(([, id]) => VW('repeat', id).t0);
  engMiniCards(ts.map((t) => bumpK(t, 0.08)), ts);

  const talk = Math.max(0, ...MINI.map(([, id]) => { const w = VW('repeat', id); return TT >= w.t0 && TT <= w.t1 + 0.1 ? Math.sin(Math.PI * clamp((TT - w.t0) / (w.t1 + 0.1 - w.t0))) : 0; }));
  engKid(230, 1, { ...KIDS[0], talk });
  engKid(420, 1, { ...KIDS[1], talk });

  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_rp' });
  prChips();
};

// =====================================================================
//  SCENE 6 — quiz: "Bây giờ thử thách! Quả bóng bay này màu gì? What color is it?"
// =====================================================================
SCENES.quiz = () => {
  engRoom('#86a8ba');
  prSign('THỬ THÁCH: MÀU GÌ?', { kicker: KICK });

  engQuizBalloon();
  engBoard('What color is it?', popS(VW('quiz', 'what').t0 - 0.05));
  engOption(350, -0.015, 'A', 'Red', PR.red);
  engOption(730, 0.015, 'B', 'Blue', PR.blue);

  const t3 = VL('quiz').t1 + 0.4, u = TT - t3, r = 80;
  withT(540, 1310, 0, popS(t3 - 0.25), () => {
    pp(pR(-r * 0.2, -r - 24, r * 0.4, 36, 6), PR.char, { key: 'tm_kn', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(0, 0, r, r), PR.red, { key: 'tm_o', sb: 14, sy: 7, tex: 0.55, rim: 'rgba(255,220,210,0.35)' });
    pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key: 'tm_f', shadow: false, tex: 0.45 });
    const left = u < 0 ? 1 : u >= 3 ? 0 : 1 - (u % 1);
    if (left > 0) pp(() => { ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.76, -Math.PI / 2, -Math.PI / 2 + TAU * left); ctx.closePath(); }, PR.mustard, { key: 'tm_w', shadow: false, tex: 0.45 });
    pp(pE(0, 0, r * 0.5, r * 0.5), PR.paperW, { key: 'tm_c', sb: 6, sy: 3, tex: 0.4 });
    if (u >= 0 && u < 3) withT(0, 0, 0, bumpK(t3 + Math.floor(u), 0.2, 0.3), () => txt(String(3 - Math.floor(u)), 0, 3, 60, PR.navy, { align: 'center', base: 'middle', weight: 800 }));
  });

  engQuizKids([[false, false], [false, u >= 0]]);
  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: 'neutral', look: -10, hand: { x: -250, y: -340 }, key: 'p_qz' });
  prChips();
};

// =====================================================================
//  SCENE 7 — answer: "It's blue! Chính xác! …"
// =====================================================================
SCENES.answer = () => {
  engRoom(WALL_BASE);
  prSign('ĐÁP ÁN LÀ BLUE', { kicker: KICK });

  const tBlue = VW('answer', 'blue').t0;
  engQuizBalloon();
  engBoard("It's blue!");
  withA(fadeA(tBlue), () => engOption(350, -0.015, 'A', 'Red', PR.red));
  engOption(730, 0.015, 'B', 'Blue', PR.blue, bumpK(tBlue, 0.1));
  prCheck(880, 975, tBlue, 44);
  prStamp('CHÍNH XÁC', 540, 1310, PR.green, VW('answer', 'chính').t0, { rot: -0.05, size: 52, from: 1.25 });

  engQuizKids([[true, true], [true, true]]);
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 7b — recap (split at "Bạn"): "Bạn đã học được ba màu đầu tiên rồi!"
// =====================================================================
SCENES.recap = () => {
  engRoom('#cbb894');
  prSign('ĐÃ HỌC ĐƯỢC BA MÀU!', { kicker: KICK });

  const tBa = VW('answer', 'ba').t0;
  engMiniCards([0, 1, 2].map((i) => bumpK(tBa + i * 0.15, 0.08)), [0, 0, 0]);
  engKid(230, 1, { ...KIDS[0], up: [true, true] });
  engKid(420, 1, { ...KIDS[1], up: [true, true] });

  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_rc' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Hãy tìm một đồ vật màu blue quanh bạn."
// =====================================================================
const CTA_ITEMS = [
  [260, 680, (x, y) => engCar(x, y, PR.red, 'c1', 1.4), false],
  [540, 680, (x, y) => engBook(x, y, PR.blue, 'c2', 1.3), true],
  [820, 680, (x, y) => engDuck(x, y, PR.yellow, 'c3', 1.3), false],
  [260, 920, (x, y) => engBall(x, y, 64, PR.blue, 'c4'), true],
  [540, 920, (x, y) => engBlock(x, y, PR.green, 'c5', 1.3), false],
  [820, 920, (x, y) => engCup(x, y, PR.red, 'c6', 1.3), false],
  [260, 1160, (x, y) => engCrayon(x, y, PR.yellow, 'c7', 1.2), false],
  [540, 1160, (x, y) => engCup(x, y, PR.blue, 'c8', 1.3), true],
  [820, 1160, (x, y) => engBall(x, y, 64, PR.orange, 'c9'), false],
  [200, 1462, (x, y) => engBall(x, y, 50, PR.red, 'c10'), false],
  [390, 1462, (x, y) => engCar(x, y, PR.blue, 'c11', 1.2), true],
];
SCENES.cta = () => {
  engRoom('#a9b99c', { wall: false });
  prSign('TÌM ĐỒ VẬT MÀU BLUE', { kicker: KICK });

  pp(pR(130, 420, 820, 760, 12), PR.wood, { key: 'shelf_o', sb: 22, sy: 11, tex: 0.6 });
  pp(pR(152, 442, 776, 716, 6), PR.woodD, { key: 'shelf_b', shadow: false, tex: 0.6 });
  [680, 920].forEach((sy) => pp(pR(140, sy, 800, 22, 4), PR.woodL, { key: 'shelf' + sy, sb: 8, sy: 4, tex: 0.5 }));
  pp(pE(300, 1452, 230, 26), '#b5654a', { key: 'rug', shadow: false, tex: 0.6 });

  const tBlue = VW('cta', 'blue').t0;
  let nb = 0;
  CTA_ITEMS.forEach(([x, y, draw, blue]) => {
    if (!blue) { withA(fadeA(tBlue, 0.4), () => draw(x, y)); return; }
    const t = tBlue + nb++ * 0.15, k = popS(t), floor = y > 1300;
    if (k > 0.01) withT(x, y - (floor ? 46 : 70), 0, k, () => {
      ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.ellipse(0, 0, floor ? 100 : 112, floor ? 64 : 98, 0, 0, TAU); ctx.stroke(); ctx.restore();
    });
    withT(x, y, 0, bumpK(t, 0.18), () => draw(0, 0));
  });

  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'wow', hold: propGlass(-0.5), hand: { x: -240, y: -380 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  ['đỏ', 'xanh', 'vàng'].forEach((w) => cues.push({ t: VW('hook', w).t0, k: 'pop' }));
  ['red', 'blue', 'yellow'].forEach((id) => cues.push({ t: VW(id, id).t0, k: 'pop' }));
  ['red', 'blue', 'yellow'].forEach((w) => cues.push({ t: VW('repeat', w).t0, k: 'pop' }));
  cues.push({ t: VW('quiz', 'what').t0 - 0.05, k: 'pop' });
  const t3 = VL('quiz').t1 + 0.4;
  for (let i = 0; i < 3; i++) cues.push({ t: t3 + i, k: 'tick' });
  cues.push({ t: VW('answer', 'blue').t0, k: 'chime' });
  cues.push({ t: VW('answer', 'chính').t0, k: 'thud' });
  cues.push({ t: VW('answer', 'ba').t0, k: 'pop' });
  const tBlue = VW('cta', 'blue').t0;
  CTA_ITEMS.filter((it) => it[3]).forEach((_, i) => cues.push({ t: tBlue + i * 0.15, k: 'pop' }));
  return cues;
}

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [['answer', 'bạn', 0, 'recap']];
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
