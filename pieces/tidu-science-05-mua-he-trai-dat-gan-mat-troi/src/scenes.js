
// =====================================================================
//  TIDU SCIENCE 05 — "Mùa hè có phải vì Trái Đất gần Mặt Trời hơn?"
//  Thiên văn học & Địa lý: Trục nghiêng Trái Đất 23.4° & Các mùa trong năm.
//  Mascot: flasky() (Tidu Science flask).
//  Theme: Solar golden slate & seasonal blue (#1f2533, #242c3c).
// =====================================================================
FLASKY_SCALE = 0.88;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const FLASKY_X = 880, FLASKY_Y = 1790;
const KICK = 'TIDU SCIENCE · THIÊN VĂN & ĐỊA LÝ';
const SPACE_BG = '#1e2535';
const SPACE_D  = '#161c28';
const SPACE_L  = '#263146';

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

function tsSky(seed = 'sky5') {
  const R = RNG(seed);
  for (let i = 0; i < 26; i++) {
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

// Trái Đất có trục nghiêng 23.4 độ
function tsTiltedEarth(cx, cy, r, tiltRad = 0.408, key = 'tearth') {
  withT(cx, cy, tiltRad, 1, () => {
    // Trục quay xuyên qua hai cực
    ctx.save();
    ctx.strokeStyle = PR.red;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, -r * 1.45); ctx.lineTo(0, r * 1.45);
    ctx.stroke();
    ctx.restore();
    // Mũi tên chỉ cực Bắc
    pp(pG([[-14, -r * 1.45], [14, -r * 1.45], [0, -r * 1.65]]), PR.red, { key: key + 'np', shadow: false });

    // Quả cầu Trái Đất
    pp(pE(0, 0, r, r), PR.blue, { key: key + 'ocean', sb: 16, sy: 8, tex: 0.6, rim: 'rgba(255,255,255,0.6)', rw: 3 });

    // Lục địa giấy
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r - 2, 0, TAU);
    ctx.clip();
    pp(pG([[-r * 0.5, -r * 0.4], [-r * 0.1, -r * 0.6], [r * 0.3, -r * 0.3], [0, -r * 0.1], [-r * 0.3, 0]]), PR.green, { key: key + 'l1', shadow: false });
    pp(pG([[-r * 0.2, r * 0.2], [r * 0.3, r * 0.1], [r * 0.4, r * 0.5], [r * 0.1, r * 0.6]]), PR.green, { key: key + 'l2', shadow: false });

    // Đường xích đạo (Equator) nét đứt
    ctx.strokeStyle = PR.yellow;
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(-r, 0); ctx.lineTo(r, 0);
    ctx.stroke();
    ctx.restore();
  });
}

// Mặt Trời giấy
function tsSun(cx, cy, r = 110, key = 'sun5') {
  withT(cx, cy, 0, 1, () => {
    for (let i = 0; i < 12; i++) {
      const a = (i * TAU) / 12 + TT * 0.2;
      const r1 = r * 1.08, r2 = r * 1.36;
      pp(pG([[Math.cos(a - 0.14) * r1, Math.sin(a - 0.14) * r1], [Math.cos(a) * r2, Math.sin(a) * r2], [Math.cos(a + 0.14) * r1, Math.sin(a + 0.14) * r1]]), PR.orange, { key: key + 'r' + i, shadow: false });
    }
    pp(pE(0, 0, r, r), PR.yellow, { key: key + 'b', sb: 18, sy: 9 });
    pp(pE(0, 0, r * 0.85, r * 0.85), PR.mustard, { shadow: false });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// SCENE 1: HOOK (Line: "Mùa hè không đơn giản là lúc Trái Đất ở gần Mặt Trời!")
// Trái Đất tiến gần Mặt Trời, sau đó xuất hiện dấu X lớn
SCENES.hook = () => {
  prWall(SPACE_BG, { streak: 450 });
  tsSky('hook5-sky');
  prFloor(1520, PR.char, { trim: false });

  // Mặt Trời ở góc trái
  tsSun(220, 740, 130, 'hsun');

  // Trái Đất tiến gần Mặt Trời
  const tNear = VW('hook', 'gần').t0;
  const slideX = lerp(760, 520, EZ.o3(ev(tNear - 0.6, 0.8)));
  tsTiltedEarth(slideX, 740, 95, 0.408, 'hearth');

  // Dấu gạch chéo đỏ X xuất hiện: KHÔNG ĐÚNG!
  if (TT > tNear) {
    prCross(slideX, 740, tNear);
    prStamp('KHÔNG PHẢI DO Ở GẦN!', CX, 1160, PR.red, tNear, { rot: -0.02, size: 48, from: 1.15 });
  }

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'explorer',
    key: 'f1',
    mood: TT > tNear ? 'wow' : 'neutral',
    look: -16
  });

  prSign('VÌ SAO CÓ MÙA HÈ?', { kicker: KICK });
  prChips();
};

// SCENE 2: QUESTION (Line: "Có phải mùa hè xuất hiện vì Trái Đất tiến lại gần Mặt Trời? Không phải nguyên nhân chính đâu.")
SCENES.question = () => {
  prWall(SPACE_D, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('q5-sky');
  prFloor(1520, PR.char, { trim: false });

  // Thẻ đối chiếu sự thật về khoảng cách: Tháng 7 (Mùa hè Bắc bán cầu) thực ra là XA NHẤT!
  const bW = 860, bH = 620, bY = 780;
  tsCard(CX, bY, bW, bH, 'q5Card');

  txt('SỰ THẬT VỀ KHOẢNG CÁCH', CX, bY - bH / 2 + 50, 32, PR.navyD, { align: 'center', weight: 800 });

  pp(pR(CX - 360, bY - 40, 720, 110, 14), PR.cream, { key: 'distbox', sb: 10, sy: 5 });
  txt('THÁNG 7 (MÙA HÈ BẮC BÁN CẦU)', CX, bY - 6, 26, PR.orange, { align: 'center', weight: 800 });
  txt('TRÁI ĐẤT Ở XA MẶT TRỜI NHẤT (152 TRIỆU KM)!', CX, bY + 36, 24, PR.navyD, { align: 'center', weight: 800 });

  const tNot = VW('question', 'chính').t0;
  prStamp('KHOẢNG CÁCH KHÔNG TẠO RA MÙA', CX, 1130, PR.orange, tNot, { rot: 0.02, size: 40, from: 1.1 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'goggles',
    key: 'f2',
    mood: 'flat',
    look: -12
  });

  prSign('KHÔNG PHẢI VÌ Ở GẦN', { kicker: KICK });
  prChips();
};

// SCENE 3: TILT (Line: "Trục quay của Trái Đất nghiêng khoảng 23,4 độ so với phương vuông góc mặt phẳng quỹ đạo.")
SCENES.tilt = () => {
  prWall(SPACE_L, { streak: 460 });
  tsSky('tilt-sky');
  prFloor(1520, PR.char, { trim: false });

  // Trái Đất lớn ở trung tâm minh họa rõ góc nghiêng 23.4°
  tsTiltedEarth(CX, 720, 170, 0.408, 'tiltEarth');

  // Thước đo góc 23.4°
  withT(CX + 140, 480, 0, 1, () => {
    pp(pR(-90, -32, 180, 64, 12), PR.mustard, { key: 'degbox', sb: 8, sy: 4 });
    txt('23.4 ĐỘ', 0, 10, 34, PR.navyD, { align: 'center', weight: 800 });
  });

  // Đường phương vuông góc thẳng đứng (tham chiếu)
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.moveTo(CX, 440); ctx.lineTo(CX, 1000);
  ctx.stroke();
  ctx.restore();

  const tAngle = VW('tilt', 'nghiêng').t0;
  prStamp('TRỤC NGHIÊNG CỐ ĐỊNH 23.4°', CX, 1170, PR.mustard, tAngle, { rot: -0.02, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'mortar',
    key: 'f3',
    mood: 'wow',
    hold: propGlass(-0.35),
    look: -14
  });

  prSign('TRỤC NGHIÊNG 23.4 ĐỘ', { kicker: KICK });
  prChips();
};

// SCENE 4: DIRECT (Line: "Khi một bán cầu nghiêng về phía Mặt Trời, nơi đó nhận ánh sáng trực tiếp hơn và có ngày dài hơn.")
SCENES.direct = () => {
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('dir-sky');
  prFloor(1520, PR.char, { trim: false });

  // Mặt Trời (trái) chiếu tia nắng góc cao vuông góc vào Bán cầu Bắc
  tsSun(200, 740, 110, 'dirSun');

  // Trái Đất (phải) với nửa Bắc nghiêng về phía Mặt Trời
  tsTiltedEarth(740, 740, 120, -0.408, 'dirEarth');

  // Luồng sáng chiếu thẳng góc vào nửa trên
  const grad = ctx.createLinearGradient(200, 0, 740, 0);
  grad.addColorStop(0, 'rgba(255,220,60,0.5)');
  grad.addColorStop(1, 'rgba(255,220,60,0.15)');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(200, 700); ctx.lineTo(700, 640);
  ctx.lineTo(700, 760); ctx.lineTo(200, 780);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const tDirect = VW('direct', 'tiếp').t0;
  prStamp('ÁNH SÁNG TRỰC TIẾP + NGÀY DÀI', CX, 1125, PR.green, tDirect, { rot: 0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'propeller',
    key: 'f4',
    mood: 'happy',
    look: -12
  });

  prSign('GÓC CHIẾU ÁNH SÁNG', { kicker: KICK });
  prChips();
};

// SCENE 5: SEASONS (Line: "Vì vậy, nhiệt lượng nhận được cũng thay đổi theo mùa.")
SCENES.seasons = () => {
  prWall(SPACE_D, { streak: 480 });
  tsSky('sea-sky');
  prFloor(1520, PR.char, { trim: false });

  // Quỹ đạo 4 mùa quanh Mặt Trời
  const eCX = CX, eCY = 740, orbR = 240;
  tsSun(eCX, eCY, 90, 'seaSun');

  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.arc(eCX, eCY, orbR, 0, TAU);
  ctx.stroke();
  ctx.restore();

  // 4 vị trí Trái Đất (Xuân - Hạ - Thu - Đông)
  [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((a, i) => {
    const px = eCX + Math.cos(a) * orbR, py = eCY + Math.sin(a) * orbR;
    // Trục quay luôn nghiêng cùng một hướng trong không gian!
    tsTiltedEarth(px, py, 42, 0.408, 'searth' + i);
  });

  const tHeat = VW('seasons', 'nhiệt').t0;
  prStamp('NHIỆT LƯỢNG THAY ĐỔI THEO MÙA', CX, 1180, PR.orange, tHeat, { rot: -0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'hardhat',
    key: 'f5',
    mood: 'happy',
    look: -14
  });

  prSign('THAY ĐỔI THEO MÙA', { kicker: KICK });
  prChips();
};

// SCENE 6: HEMISPHERES (Line: "Đó là lý do khi bán cầu Bắc có mùa hè, bán cầu Nam thường đang có mùa đông.")
// Màn hình chia đôi: Bán cầu Bắc Mùa Hè vs Bán cầu Nam Mùa Đông
SCENES.hemispheres = () => {
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('hemi-sky');
  prFloor(1520, PR.char, { trim: false });

  const cW = 360, cH = 520, cY = 780;

  // Thẻ Bán cầu Bắc (330): MÙA HÈ (Cam vàng ấm áp)
  tsCard(330, cY, cW, cH, 'cardNorth');
  pp(pR(330 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.orange, { key: 'ntag', sb: 6, sy: 3 });
  txt('BÁN CẦU BẮC', 330, cY - cH / 2 + 52, 24, PR.creamL, { align: 'center', weight: 800 });
  // Biểu tượng mặt trời mùa hè
  tsSun(330, cY + 20, 70, 'nsun');
  txt('MÙA HÈ (NGÀY DÀI)', 330, cY + cH / 2 - 34, 22, PR.navyD, { align: 'center', weight: 800 });

  // Thẻ Bán cầu Nam (750): MÙA ĐÔNG (Xanh lạnh tuyết)
  tsCard(750, cY, cW, cH, 'cardSouth');
  pp(pR(750 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.blue, { key: 'stag2', sb: 6, sy: 3 });
  txt('BÁN CẦU NAM', 750, cY - cH / 2 + 52, 24, PR.creamL, { align: 'center', weight: 800 });
  // Biểu tượng bông tuyết / quả cầu lạnh
  withT(750, cY + 20, 0, 1, () => {
    ctx.save();
    ctx.strokeStyle = '#a0d8ef';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      const cx = Math.cos(a), sx = Math.sin(a);
      ctx.beginPath();
      ctx.moveTo(cx * -66, sx * -66);
      ctx.lineTo(cx * 66, sx * 66);
      for (const r of [32, 52]) {
        ctx.moveTo(cx * r, sx * r);
        ctx.lineTo(cx * r + Math.cos(a + 1.1) * 22, sx * r + Math.sin(a + 1.1) * 22);
        ctx.moveTo(cx * r, sx * r);
        ctx.lineTo(cx * r + Math.cos(a - 1.1) * 22, sx * r + Math.sin(a - 1.1) * 22);
      }
      ctx.stroke();
    }
    ctx.restore();
    pp(pE(0, 0, 10, 10), '#a0d8ef', { key: 'snowc', shadow: false });
  });
  txt('MÙA ĐÔNG (NGÀY NGẮN)', 750, cY + cH / 2 - 34, 22, PR.navyD, { align: 'center', weight: 800 });

  const tHemi = VW('hemispheres', 'Nam').t0;
  prStamp('HAI BÁN CẦU LUÔN TRÁI NGƯỢC', CX, 1180, PR.mustard, tHemi, { rot: 0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f6',
    mood: 'happy',
    look: -12
  });

  prSign('HAI BÁN CẦU ĐỐI LẬP', { kicker: KICK });
  prChips();
};

// SCENE 7: CTA (Line: "Bạn thích mùa hè hay mùa đông hơn?")
SCENES.cta = () => {
  prWall(SPACE_D, { streak: 460 });
  tsSky('cta5-sky');
  prFloor(1520, PR.char, { trim: false });

  // Hai lựa chọn Mùa hè vs Mùa đông
  withT(CX - 150, 720, 0, 1, () => {
    pp(pE(0, 0, 75, 75), PR.orange, { key: 'csummer' });
    txt('MÙA HÈ', 0, 120, 26, PR.creamL, { align: 'center', weight: 800 });
  });

  withT(CX + 150, 720, 0, 1, () => {
    pp(pE(0, 0, 75, 75), PR.blue, { key: 'cwinter' });
    txt('MÙA ĐÔNG', 0, 120, 26, PR.creamL, { align: 'center', weight: 800 });
  });

  const tCta = VW('cta', 'hơn?').t0;
  prCommentBox(CX, 1160, 'MÙA HÈ HAY MÙA ĐÔNG?', tCta, { hint: 'Bình luận mùa bạn thích nhất...' });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'party',
    key: 'f7',
    mood: 'happy',
    hold: propTube(-0.2),
    look: -12
  });

  prSign('BẠN THÍCH MÙA NÀO?', { kicker: KICK });
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
    { k: 'thud', t: qT('hook', 'gần') },
    { k: 'pop', t: qT('question', 'chính') },
    { k: 'chime', t: qT('tilt', 'nghiêng') },
    { k: 'tick', t: qT('direct', 'tiếp') },
    { k: 'pop', t: qT('seasons', 'nhiệt') },
    { k: 'chime', t: qT('hemispheres', 'Nam') },
    { k: 'pop', t: qT('cta', 'hơn?') }
  ];
}
