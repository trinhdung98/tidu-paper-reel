
// =====================================================================
//  TIDU SCIENCE 06 — "Sao băng có thật sự là một ngôi sao đang rơi?"
//  Thiên văn học: Thiên thạch, Sao băng & Vẫn thạch (Meteors & Meteorites).
//  Mascot: flasky() (Tidu Science flask).
//  Theme: Midnight starry sky & golden meteor trail (#161b26, #1f2738).
// =====================================================================
FLASKY_SCALE = 0.88;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const FLASKY_X = 880, FLASKY_Y = 1790;
const KICK = 'TIDU SCIENCE · THIÊN VĂN HỌC';
const SPACE_BG = '#161b26';
const SPACE_D  = '#111620';
const SPACE_L  = '#222c3e';

const SCENES = {};

// ---- CUSTOM HELPERS ----

function tsStar(cx, cy, r, col = PR.yellow) {
  const tw = 0.8 + Math.sin(TT * 3 + cx * 0.1) * 0.2;
  pp(pG([
    [cx, cy - r * tw], [cx + r * 0.28, cy - r * 0.28],
    [cx + r * tw, cy], [cx + r * 0.28, cy + r * 0.28],
    [cx, cy + r * tw], [cx - r * 0.28, cy + r * 0.28],
    [cx - r * tw, cy], [cx - r * 0.28, cy - r * 0.28]
  ]), col, { shadow: false, tex: 0.3 });
}

function tsSky(seed = 'sky6') {
  const R = RNG(seed);
  for (let i = 0; i < 28; i++) {
    const sx = R.r(40, W - 40), sy = R.r(260, 1500), sr = R.r(6, 16);
    tsStar(sx, sy, sr, R.pick([PR.yellow, PR.creamL, PR.sky, '#ffffff', PR.orange]));
  }
}

function tsCard(x, y, w, h, key = 'card') {
  pp(pR(x - w / 2, y - h / 2, w, h, 16), PR.creamL, { key: key + 'back', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.7)', rw: 3 });
  ctx.save();
  ctx.strokeStyle = PR.navyD;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(x - w / 2 + 10, y - h / 2 + 10, w - 20, h - 20, 10);
  ctx.stroke();
  ctx.restore();
}

// Vệt sao băng xé ngang bầu trời
function tsShootingStar(headX, headY, tailLen = 320, angle = 0.55) {
  const tailX = headX - Math.cos(angle) * tailLen;
  const tailY = headY - Math.sin(angle) * tailLen;

  // Đuôi sáng hình tam giác giấy vàng/cam
  pp(pG([
    [tailX, tailY],
    [headX - Math.sin(angle) * 16, headY + Math.cos(angle) * 16],
    [headX + Math.cos(angle) * 20, headY + Math.sin(angle) * 20],
    [headX + Math.sin(angle) * 16, headY - Math.cos(angle) * 16]
  ]), PR.orange, { shadow: false, tex: 0.4 });

  // Lõi đuôi sáng vàng nhạt
  pp(pG([
    [tailX + Math.cos(angle) * 80, tailY + Math.sin(angle) * 80],
    [headX - Math.sin(angle) * 8, headY + Math.cos(angle) * 8],
    [headX + Math.cos(angle) * 24, headY + Math.sin(angle) * 24],
    [headX + Math.sin(angle) * 8, headY - Math.cos(angle) * 8]
  ]), PR.yellow, { shadow: false, tex: 0.2 });

  // Đầu sao băng chói sáng
  pp(pE(headX, headY, 26, 26), '#ffffff', { key: 'shead', sb: 22, sy: 10 });
  pp(pE(headX, headY, 18, 18), PR.yellow, { shadow: false });
}

// Hạt đá / Thiên thạch nhỏ
function tsRock(cx, cy, s = 1, isBurning = false) {
  withT(cx, cy, 0, s, () => {
    if (isBurning) {
      // Vầng lửa ma sát bao quanh viên đá
      pp(pE(0, 0, 78, 70), 'rgba(255,160,40,0.3)', { shadow: false });
      pp(pG([[-60, 40], [-20, -50], [20, -70], [60, 40], [0, 80]]), PR.orange, { shadow: false });
    }
    // Khối đá góc cạnh
    pp(pG([[-38, -25], [-12, -45], [30, -32], [46, 12], [24, 42], [-28, 36], [-46, 8]]), '#726153', { key: 'rockb', sb: 12, sy: 6, tex: 0.6 });
    pp(pG([[-10, -25], [18, -18], [24, 14], [-4, 20]]), '#584a3e', { shadow: false, tex: 0.4 });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// SCENE 1: HOOK (Line: "Thứ bạn ước nguyện khi thấy trên trời có thể chỉ là một hạt bụi vũ trụ!")
SCENES.hook = () => {
  prWall(SPACE_BG, { streak: 460 });
  tsSky('hook6-sky');
  prFloor(1520, PR.char, { trim: false });

  // Vệt sao băng xé ngang bầu trời đêm
  tsShootingStar(620, 680, 420, 0.58);

  // Thẻ hạt bụi vũ trụ
  withT(CX, 1160, 0.02, 1, () => {
    pp(pR(-280, -45, 560, 90, 14), PR.mustard, { key: 'dusttag', sb: 14, sy: 7, tex: 0.5 });
    txt('CHỈ LÀ MỘT HẠT BỤI VŨ TRỤ!', 0, 12, 32, PR.navyD, { align: 'center', weight: 800 });
  });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'explorer',
    key: 'f1',
    mood: 'wow',
    look: -16
  });

  prSign('ĐIỀU ƯỚC VÀ HẠT BỤI', { kicker: KICK });
  prChips();
};

// SCENE 2: STREAK (Line: "Đêm nay, nếu thấy một vệt sáng lao qua bầu trời, bạn có thể gọi đó là sao băng.")
SCENES.streak = () => {
  prWall(SPACE_D, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('strk-sky');
  prFloor(1520, PR.char, { trim: false });

  // Khung quan sát bầu trời đêm
  const bW = 860, bH = 620, bY = 780;
  tsCard(CX, bY, bW, bH, 'nightCard');

  txt('VỆT SÁNG BẦU TRỜI ĐÊM (METEOR)', CX, bY - bH / 2 + 50, 32, PR.navyD, { align: 'center', weight: 800 });

  // Bầu trời đêm bên trong khung với vệt sao băng chuyển động
  pp(pR(CX - 380, bY - 200, 760, 360, 12), '#121824', { key: 'nightin', shadow: false, tex: 0.4 });
  const prog = (TT * 1.2) % 2.5;
  const sx = CX - 300 + prog * 280, sy = bY - 140 + prog * 160;
  tsShootingStar(sx, sy, 300, 0.55);

  const tStreak = VW('streak', 'băng.').t0;
  prStamp('SAO BĂNG (METEOR)', CX, 1180, PR.orange, tStreak, { rot: -0.02, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f2',
    mood: 'happy',
    look: -12
  });

  prSign('VỆT SÁNG BẦU TRỜI', { kicker: KICK });
  prChips();
};

// SCENE 3: NOTASTAR (Line: "Nhưng nó không phải một ngôi sao rơi xuống Trái Đất. Đó thường là một mảnh đá hoặc hạt vật chất nhỏ từ không gian.")
SCENES.notastar = () => {
  prWall(SPACE_L, { streak: 460 });
  tsSky('nas-sky');
  prFloor(1520, PR.char, { trim: false });

  // Đối chiếu: Ngôi sao khổng lồ vs Mảnh đá nhỏ
  const cW = 360, cH = 520, cY = 780;

  // Thẻ Ngôi Sao (330)
  tsCard(330, cY, cW, cH, 'cardStar');
  pp(pR(330 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.char, { key: 'notag', sb: 6, sy: 3 });
  txt('NGÔI SAO THẬT', 330, cY - cH / 2 + 52, 24, PR.creamL, { align: 'center', weight: 800 });
  withT(330, cY + 30, 0, 1, () => {
    pp(pE(0, 0, 80, 80), PR.yellow, { key: 'bigstar' });
    txt('KHỔNG LỒ', 0, 10, 24, PR.navyD, { align: 'center', weight: 800 });
  });
  txt('KHÔNG PHẢI RƠI!', 330, cY + cH / 2 - 34, 22, PR.red, { align: 'center', weight: 800 });
  prCross(330, cY + 30, VW('notastar', 'không').t0);

  // Thẻ Mảnh Đá Nhỏ (750)
  tsCard(750, cY, cW, cH, 'cardRock');
  pp(pR(750 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.blue, { key: 'rktag', sb: 6, sy: 3 });
  txt('THIÊN THẠCH NHỎ', 750, cY - cH / 2 + 52, 24, PR.creamL, { align: 'center', weight: 800 });
  tsRock(750, cY + 30, 1.4, false);
  txt('KÍCH THƯỚC HẠT CÁT / VIÊN SỎI', 750, cY + cH / 2 - 34, 18, PR.navyD, { align: 'center', weight: 800 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'goggles',
    key: 'f3',
    mood: 'flat',
    hold: propGlass(-0.35),
    look: -14
  });

  prSign('KHÔNG PHẢI NGÔI SAO RƠI', { kicker: KICK });
  prChips();
};

// SCENE 4: GLOW (Line: "Khi lao vào khí quyển với tốc độ cao, nó làm không khí xung quanh nóng và phát sáng. Phần lớn bị phá hủy trên đường đi.")
SCENES.glow = () => {
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('glow-sky');
  prFloor(1520, PR.char, { trim: false });

  // Khí quyển Trái Đất và ma sát nung nóng
  const bW = 860, bH = 620, bY = 780;
  tsCard(CX, bY, bW, bH, 'glowBox');

  txt('MA SÁT KHÍ QUYỂN NUNG NÓNG', CX, bY - bH / 2 + 50, 32, PR.navyD, { align: 'center', weight: 800 });

  // Viên đá đang bốc cháy dữ dội
  tsRock(CX - 80, bY + 20, 1.8, true);

  // Thẻ nhiệt độ & tốc độ
  withT(CX + 180, bY + 20, 0, 1, () => {
    pp(pR(-120, -50, 240, 100, 12), PR.red, { key: 'spdt' });
    txt('TỐC ĐỘ SIÊU CAO', 0, -12, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('> 40.000 KM/H', 0, 24, 28, PR.yellow, { align: 'center', weight: 800 });
  });

  const tBurn = VW('glow', 'sáng.').t0;
  prStamp('BỐC CHÁY VÀ PHÁ HỦY', CX, 1180, PR.red, tBurn, { rot: 0.02, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'propeller',
    key: 'f4',
    mood: 'wow',
    look: -14
  });

  prSign('MA SÁT KHÍ QUYỂN', { kicker: KICK });
  prChips();
};

// SCENE 5: METEORITE (Line: "Nếu còn mảnh vật chất chạm tới mặt đất, chúng ta gọi đó là thiên thạch rơi.")
SCENES.meteorite = () => {
  prWall(SPACE_D, { streak: 480 });
  tsSky('met-sky');
  prFloor(1520, PR.char, { trim: false });

  // 3 trạng thái phân biệt rõ ràng: Không gian -> Khí quyển -> Mặt đất
  const cW = 260, cH = 460, cY = 760;

  // 1. Ngoài không gian (Meteoroid)
  tsCard(220, cY, cW, cH, 'st1');
  txt('1. TRONG VŨ TRỤ', 220, cY - cH / 2 + 40, 20, PR.navyD, { align: 'center', weight: 800 });
  tsRock(220, cY, 0.9, false);
  txt('THIÊN THẠCH NHỎ', 220, cY + cH / 2 - 30, 18, PR.char, { align: 'center', weight: 800 });

  // 2. Trong khí quyển (Meteor)
  tsCard(540, cY, cW, cH, 'st2');
  txt('2. TRONG KHÍ QUYỂN', 540, cY - cH / 2 + 40, 20, PR.orange, { align: 'center', weight: 800 });
  tsShootingStar(560, cY + 10, 160, 0.6);
  txt('SAO BĂNG', 540, cY + cH / 2 - 30, 22, PR.orange, { align: 'center', weight: 800 });

  // 3. Chạm mặt đất (Meteorite)
  tsCard(860, cY, cW, cH, 'st3');
  txt('3. TRÊN MẶT ĐẤT', 860, cY - cH / 2 + 40, 20, PR.green, { align: 'center', weight: 800 });
  // Mảnh thiên thạch trên hố va chạm nhỏ
  withT(860, cY, 0, 1, () => {
    pp(pE(0, 30, 70, 24), PR.woodD, { key: 'crat' });
    tsRock(0, 10, 1.1, false);
  });
  txt('VẪN THẠCH', 860, cY + cH / 2 - 30, 22, PR.green, { align: 'center', weight: 800 });

  const tFall = VW('meteorite', 'đất,').t0;
  prStamp('CHẠM ĐẤT = VẪN THẠCH', CX, 1170, PR.green, tFall, { rot: -0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'mortar',
    key: 'f5',
    mood: 'happy',
    hold: propTube(-0.25),
    look: -12
  });

  prSign('TỪ KHÔNG GIAN XUỐNG ĐẤT', { kicker: KICK });
  prChips();
};

// SCENE 6: CTA (Line: "Bạn đã từng nhìn thấy sao băng ngoài đời chưa?")
SCENES.cta = () => {
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('cta6-sky');
  prFloor(1520, PR.char, { trim: false });

  // Bầu trời sao băng lung linh với sao băng bay qua
  tsShootingStar(CX + 80, 700, 360, 0.52);

  const tCta = VW('cta', 'chưa?').t0;
  prCommentBox(CX, 1160, 'BẠN TỪNG THẤY SAO BĂNG CHƯA?', tCta, { hint: 'Kể lại lần bạn thấy sao băng...' });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'party',
    key: 'f6',
    mood: 'happy',
    hold: propTube(-0.2),
    look: -12
  });

  prSign('TỪNG THẤY SAO BĂNG CHƯA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const ERA_BG = ERA_LIST.map(() => SPACE_BG);
function pieceCam() { return null; }
const BRIDGES = [];
const TIMELINE = {
  width: W, height: H, fps: FPS, duration: DURATION, frames: NFRAMES, loop: LOOP_T, safe: SAFE, format: 'voice-cut',
  shots: SHOT_LIST.map(([t0, sc], i) => ({ id: i + 1, key: sc, era: i, t0, t1: ERA_LIST[i][1], title: sc })),
  cuts: SHOT_LIST.slice(1).map(([t0]) => t0), morphs: [], cues: {},
  acts: [{ name: 'reel', role: 'journey', t0: 0, t1: DURATION }],
  board: SHOT_LIST.map(([t0, sc], i) => ({ t: (t0 + ERA_LIST[i][1]) / 2 + 0.3, title: sc, sound: '', next: 'cut' })),
  narration: VOICE.lines.map((l) => ({ t0: l.t0, t1: l.t1, text: l.text })),
  eras: ERA_LIST, bg: ERA_BG, cam: pieceCam, bridges: BRIDGES,
};
window.TIMELINE = TIMELINE;

// CUES CHO SCORE.JS
function SFX_CUES() {
  const qT = (id, w, n = 0) => VW(id, w, n).t0;
  return [
    { k: 'whoosh', t: qT('hook', 'thấy') },
    { k: 'whoosh', t: qT('streak', 'băng.') },
    { k: 'thud', t: qT('notastar', 'không') },
    { k: 'pop', t: qT('glow', 'sáng.') },
    { k: 'thud', t: qT('meteorite', 'đất,') },
    { k: 'chime', t: qT('cta', 'chưa?') }
  ];
}
