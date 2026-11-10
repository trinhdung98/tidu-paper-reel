
// =====================================================================
//  TIDU SCIENCE 03 — "Vì sao phi hành gia lơ lửng trên trạm vũ trụ?"
//  Vật lý & Thiên văn học: Trọng lực & Trạng thái rơi tự do (Microgravity).
//  Mascot: flasky() (Tidu Science flask).
//  Theme: ISS station interior & Earth orbit (#1c2536, #212c3f).
// =====================================================================
FLASKY_SCALE = 0.88;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const FLASKY_X = 880, FLASKY_Y = 1790;
const KICK = 'TIDU SCIENCE · CƠ HỌC VŨ TRỤ';
const SPACE_BG = '#1c2536';
const SPACE_D  = '#141d2c';
const SPACE_L  = '#263348';

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

function tsSky(seed = 'sky3') {
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

// Trái Đất giấy
function tsEarth(cx, cy, r, key = 'earth3') {
  withT(cx, cy, 0, 1, () => {
    pp(pE(0, 0, r, r), PR.blue, { key: key + 'ocean', sb: 16, sy: 8, tex: 0.6, rim: 'rgba(255,255,255,0.6)', rw: 3 });
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r - 2, 0, TAU);
    ctx.clip();
    const conts = [
      [[-r * 0.5, -r * 0.3], [-r * 0.2, -r * 0.6], [r * 0.1, -r * 0.4], [0, -r * 0.1], [-r * 0.4, 0]],
      [[-r * 0.1, r * 0.1], [r * 0.4, -r * 0.1], [r * 0.6, r * 0.4], [r * 0.2, r * 0.6], [-r * 0.1, r * 0.3]]
    ];
    conts.forEach((pts, i) => pp(pG(pts), PR.green, { key: key + 'l' + i, shadow: false, tex: 0.5 }));
    pp(pE(-r * 0.2, -r * 0.1, r * 0.35, r * 0.08, -0.2), 'rgba(255,255,255,0.65)', { shadow: false, tex: 0.3 });
    ctx.restore();
  });
}

// Quả táo giấy lơ lửng
function tsApple(cx, cy, s = 1) {
  withT(cx, cy, Math.sin(TT * 1.5) * 0.12, s, () => {
    pp(pE(0, 0, 36, 32), PR.red, { key: 'applered', sb: 10, sy: 5, tex: 0.5 });
    pp(pE(-8, -4, 12, 16), PR.redD, { shadow: false });
    // Cuống táo và lá
    pp(pR(-2, -34, 4, 16, 2), PR.woodD, { shadow: false });
    pp(pE(8, -26, 12, 6, 0.4), PR.green, { shadow: false });
  });
}

// Mô hình trạm vũ trụ ISS giấy
function tsISS(cx, cy, s = 1, angle = 0) {
  withT(cx, cy, angle, s, () => {
    // Trục chính mô-đun
    pp(pR(-90, -18, 180, 36, 8), PR.paperW, { key: 'isscore', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-25, -45, 50, 90, 6), PR.paperW, { key: 'issvert', sb: 8, sy: 4 });
    // Tấm pin mặt trời màu xanh lam đậm
    [-170, 90].forEach((px, i) => {
      pp(pR(px, -80, 80, 160, 6), '#1a3d6b', { key: 'isspanel' + i, sb: 10, sy: 5, tex: 0.35 });
      // Lưới pin mặt trời màu vàng
      ctx.save();
      ctx.strokeStyle = PR.mustard;
      ctx.lineWidth = 2;
      for (let y = -70; y < 80; y += 24) {
        ctx.beginPath(); ctx.moveTo(px + 6, y); ctx.lineTo(px + 74, y); ctx.stroke();
      }
      ctx.restore();
    });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// SCENE 1: HOOK (Line: "Trên trạm vũ trụ vẫn có trọng lực. Vậy tại sao phi hành gia bay được?")
// Phi hành gia và quả táo lơ lửng trong không gian trạm ISS
SCENES.hook = () => {
  const t0 = E0;
  prWall(SPACE_BG, { streak: 450 });
  tsSky('hook3-sky');
  prFloor(1520, PR.char, { trim: false });

  // Khung khoang trạm vũ trụ ISS
  const bW = 860, bH = 640, bY = 780;
  tsCard(CX, bY, bW, bH, 'issCard');
  pp(pR(CX - 220, bY - bH / 2 + 20, 440, 50, 10), PR.navy, { key: 'isstag', sb: 6, sy: 3 });
  txt('BÊN TRONG TRẠM ISS', CX, bY - bH / 2 + 54, 28, PR.creamL, { align: 'center', weight: 800 });

  // Phi hành gia lơ lửng (bồng bềnh hình sin)
  const bob1 = Math.sin(TT * 2.2) * 22;
  withT(CX - 160, bY + 30 + bob1, Math.sin(TT * 1.4) * 0.08, 1.4, () => {
    // Mũ phi hành gia
    pp(pE(0, -60, 55, 52), PR.paperW, { key: 'asthel', sb: 12, sy: 6 });
    pp(pE(0, -62, 40, 32), '#90d4ed', { shadow: false });
    // Thân đồ bay
    pp(pR(-45, -10, 90, 110, 24), PR.paperW, { key: 'astbody', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-30, 15, 60, 28, 6), PR.sky, { shadow: false });
  });

  // Quả táo lơ lửng bên cạnh (bồng bềnh lệch pha)
  const bob2 = Math.cos(TT * 2.0) * 26;
  tsApple(CX + 180, bY + 20 + bob2, 1.8);

  // Dấu hỏi lớn xuất hiện
  const tWhy = VW('hook', 'bay').t0;
  if (TT > tWhy) {
    prStamp('VẪN CÓ TRỌNG LỰC!', CX, 1170, PR.orange, tWhy, { rot: -0.02, size: 48, from: 1.15 });
  }

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f1',
    mood: 'wow',
    look: -16
  });

  prSign('TRỌNG LỰC NGOÀI VŨ TRỤ', { kicker: KICK });
  prChips();
};

// SCENE 2: GRAVITY (Line: "Bạn nghĩ phi hành gia bay lơ lửng vì ngoài vũ trụ không có trọng lực?")
// Bác bỏ hiểu lầm: "KHÔNG CÓ TRỌNG LỰC" là sai!
SCENES.gravity = () => {
  const t0 = E0;
  prWall(SPACE_D, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('grav-sky');
  prFloor(1520, PR.char, { trim: false });

  // Thẻ hiểu lầm
  const bW = 800, bH = 560, bY = 780;
  tsCard(CX, bY, bW, bH, 'mythBox');

  txt('HIỂU LẦM PHỔ BIẾN', CX, bY - bH / 2 + 50, 32, PR.red, { align: 'center', weight: 800 });
  txt('"VŨ TRỤ KHÔNG CÓ TRỌNG LỰC"', CX, bY - 40, 36, PR.navyD, { align: 'center', weight: 800 });
  txt('ĐÂY LÀ QUAN NIỆM CHƯA ĐÚNG', CX, bY + 30, 26, PR.char, { align: 'center', weight: 600 });

  // Dấu chéo đỏ lớn đập vào
  const tCross = VW('gravity', 'không').t0;
  prCross(CX, bY + 130, tCross);

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'mortar',
    key: 'f2',
    mood: 'flat',
    look: -12
  });

  prSign('HIỂU LẦM KHÔNG TRỌNG LỰC', { kicker: KICK });
  prChips();
};

// SCENE 3: REALITY (Line: "Thực ra, ở độ cao của trạm ISS, lực hấp dẫn của Trái Đất vẫn rất mạnh.")
// Đo độ cao 400km: Trọng lực vẫn còn ~90%!
SCENES.reality = () => {
  const t0 = E0;
  prWall(SPACE_L, { streak: 460 });
  tsSky('real3-sky');
  prFloor(1520, PR.char, { trim: false });

  // Trái Đất ở dưới và trạm ISS ở độ cao 400km
  tsEarth(CX, 1020, 220, 'earthReal');

  // Trạm ISS ở trên
  tsISS(CX, 540, 1.1, 0.08);

  // Mũi tên vector trọng lực màu đỏ kéo mạnh từ trạm ISS hướng về tâm Trái Đất
  ctx.save();
  ctx.strokeStyle = PR.red;
  ctx.lineWidth = 8;
  ctx.setLineDash([12, 6]);
  ctx.beginPath();
  ctx.moveTo(CX, 620);
  ctx.lineTo(CX, 780);
  ctx.stroke();
  ctx.restore();
  pp(pG([[CX - 24, 780], [CX + 24, 780], [CX, 820]]), PR.red, { key: 'gravarr', shadow: false });

  // Thước đo độ cao 400 km
  withT(CX + 240, 680, 0, 1, () => {
    pp(pR(-90, -30, 180, 60, 10), PR.creamL, { key: 'alttag', sb: 6, sy: 3 });
    txt('CAO 400 KM', 0, 8, 24, PR.navyD, { align: 'center', weight: 800 });
  });

  // Stamp: TRỌNG LỰC CÒN 90%!
  const tStrong = VW('reality', 'mạnh.').t0;
  prStamp('TRỌNG LỰC VẪN CÒN 90%!', CX, 1170, PR.mustard, tStrong, { rot: -0.02, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'goggles',
    key: 'f3',
    mood: 'wow',
    look: -14
  });

  prSign('LỰC HẤP DẪN VẪN RẤT MẠNH', { kicker: KICK });
  prChips();
};

// SCENE 4: FREEFALL (Line: "Bí mật nằm ở trạng thái rơi tự do.")
// Thí nghiệm rơi tự do của Newton
SCENES.freefall = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('ff-sky');
  prFloor(1520, PR.char, { trim: false });

  const bW = 860, bH = 620, bY = 780;
  tsCard(CX, bY, bW, bH, 'ffBox');

  txt('BÍ MẬT: TRẠNG THÁI RƠI TỰ DO', CX, bY - bH / 2 + 50, 32, PR.navyD, { align: 'center', weight: 800 });

  // Minh họa chiếc thang máy vũ trụ đang rơi tự do
  const fallY = bY + 30;
  pp(pR(CX - 260, fallY - 140, 520, 280, 14), PR.char, { key: 'ffElev', sb: 12, sy: 6, tex: 0.4 });

  // Bên trong thang máy: người và vật cùng rơi với vận tốc như nhau
  tsApple(CX + 120, fallY - 20, 1.2);
  withT(CX - 100, fallY, 0, 1, () => {
    pp(pE(0, -40, 36, 36), PR.creamL, { key: 'ffh' });
    pp(pR(-30, 0, 60, 80, 12), PR.blue, { key: 'ffb' });
  });

  // Mũi tên rơi xuống hai bên
  [-200, 200].forEach((ax, i) => {
    ctx.save();
    ctx.strokeStyle = PR.yellow; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(CX + ax, fallY - 80); ctx.lineTo(CX + ax, fallY + 80); ctx.stroke();
    ctx.restore();
    pp(pG([[CX + ax - 16, fallY + 80], [CX + ax + 16, fallY + 80], [CX + ax, fallY + 110]]), PR.yellow, { key: 'ffarr' + i, shadow: false });
  });

  const tFall = VW('freefall', 'rơi').t0;
  prStamp('RƠI TỰ DO (FREE FALL)', CX, 1180, PR.green, tFall, { rot: 0.02, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'hardhat',
    key: 'f4',
    mood: 'happy',
    look: -12
  });

  prSign('BÍ MẬT RƠI TỰ DO', { kicker: KICK });
  prChips();
};

// SCENE 5: ORBIT (Line: "Trạm vũ trụ chuyển động ngang đủ nhanh để liên tục rơi quanh Trái Đất thay vì đâm xuống mặt đất.")
// Quỹ đạo cong quanh Trái Đất (Vận tốc quỹ đạo ~ 28.000 km/h)
SCENES.orbit = () => {
  const t0 = E0;
  prWall(SPACE_D, { streak: 500 });
  tsSky('orb3-sky');
  prFloor(1520, PR.char, { trim: false });

  // Trái Đất ở góc dưới
  const eCX = CX, eCY = 820, orbR = 260;
  tsEarth(eCX, eCY, 130, 'orbitEarth');

  // Vòng quỹ đạo tròn quanh Trái Đất
  ctx.save();
  ctx.strokeStyle = PR.yellow;
  ctx.lineWidth = 4;
  ctx.setLineDash([14, 10]);
  ctx.beginPath();
  ctx.arc(eCX, eCY, orbR, 0, TAU);
  ctx.stroke();
  ctx.restore();

  // Trạm ISS bay dọc theo quỹ đạo
  const angle = (TT - t0) * 0.85 - Math.PI * 0.4;
  const issX = eCX + Math.cos(angle) * orbR, issY = eCY + Math.sin(angle) * orbR;
  tsISS(issX, issY, 0.7, angle + Math.PI * 0.5);

  // Thẻ tốc độ: 28.000 km/h
  withT(CX, 1180, 0, 1, () => {
    pp(pR(-280, -45, 560, 90, 14), PR.mustard, { key: 'spdtag', sb: 14, sy: 7, tex: 0.5 });
    txt('TỐC ĐỘ: 28.000 KM/H (7.7 KM/S)', 0, 12, 30, PR.navyD, { align: 'center', weight: 800 });
  });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'propeller',
    key: 'f5',
    mood: 'wow',
    look: -14
  });

  prSign('RƠI LIÊN TỤC QUANH TRÁI ĐẤT', { kicker: KICK });
  prChips();
};

// SCENE 6: TOGETHER (Line: "Phi hành gia và mọi đồ vật bên trong cũng rơi cùng trạm.")
// Cùng rơi một gia tốc -> Không có lực ép lên sàn
SCENES.together = () => {
  const t0 = E0;
  prWall(SPACE_L, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('tog-sky');
  prFloor(1520, PR.char, { trim: false });

  const bW = 860, bH = 620, bY = 780;
  tsCard(CX, bY, bW, bH, 'togBox');

  txt('TẤT CẢ CÙNG RƠI MỘT GIA TỐC', CX, bY - bH / 2 + 50, 32, PR.navyD, { align: 'center', weight: 800 });

  // 3 vật thể cùng lơ lửng song song: Phi hành gia, Quả táo, Bình nước
  const yItem = bY + 40;
  // Phi hành gia (trái)
  withT(CX - 220, yItem, 0, 1, () => {
    pp(pE(0, -45, 42, 40), PR.paperW, { key: 'toghel', sb: 8, sy: 4 });
    pp(pE(0, -46, 30, 24), '#90d4ed', { shadow: false });
    pp(pR(-35, -5, 70, 90, 18), PR.paperW, { key: 'togbod', sb: 8, sy: 4 });
    txt('PHI HÀNH GIA', 0, 120, 22, PR.navyD, { align: 'center', weight: 800 });
  });

  // Quả táo (giữa)
  withT(CX, yItem - 10, 0, 1.4, () => {
    tsApple(0, 0, 1);
    txt('QUẢ TÁO', 0, 90, 16, PR.navyD, { align: 'center', weight: 800 });
  });

  // Mô-đun ISS (phải)
  withT(CX + 220, yItem, 0, 0.85, () => {
    tsISS(0, 0, 0.9, 0);
    txt('TRẠM ISS', 0, 140, 26, PR.navyD, { align: 'center', weight: 800 });
  });

  const tFallTog = VW('together', 'rơi').t0;
  prStamp('CÙNG RƠI = KHÔNG ÉP SÀN', CX, 1180, PR.green, tFallTog, { rot: -0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f6',
    mood: 'happy',
    look: -12
  });

  prSign('CÙNG RƠI MỘT VẬN TỐC', { kicker: KICK });
  prChips();
};

// SCENE 7: WEIGHTLESS (Line: "Vì vậy, họ có cảm giác gần như không trọng lượng.")
// Cảm giác Microgravity
SCENES.weightless = () => {
  const t0 = E0;
  prWall(SPACE_BG, { streak: 460 });
  tsSky('wl-sky');
  prFloor(1520, PR.char, { trim: false });

  // Biểu tượng vi trọng lực Microgravity
  const bW = 800, bH = 580, bY = 780;
  tsCard(CX, bY, bW, bH, 'wlCard');

  txt('VI TRỌNG LỰC (MICROGRAVITY)', CX, bY - bH / 2 + 54, 34, PR.navyD, { align: 'center', weight: 800 });

  // Hình cân đo trọng lượng hiển thị 0 kg!
  withT(CX, bY + 30, 0, 1, () => {
    pp(pR(-130, -90, 260, 180, 16), PR.navyD, { key: 'scalb', sb: 14, sy: 7 });
    pp(pR(-110, -70, 220, 140, 10), PR.char, { key: 'scaldsp', shadow: false });
    txt('0.0 KG', 0, 22, 64, PR.glow, { align: 'center', weight: 800, font: F_MONO });
  });

  const tZeroG = VW('weightless', 'không').t0;
  prStamp('GẦN NHƯ 0 TRỌNG LƯỢNG', CX, 1180, PR.orange, tZeroG, { rot: 0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'explorer',
    key: 'f7',
    mood: 'happy',
    look: -12
  });

  prSign('CẢM GIÁC KHÔNG TRỌNG LƯỢNG', { kicker: KICK });
  prChips();
};

// SCENE 8: CTA (Line: "Nếu được lên ISS, bạn muốn thử làm gì đầu tiên?")
// Hộp bình luận kêu gọi khán giả
SCENES.cta = () => {
  const t0 = E0;
  prWall(SPACE_D, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('cta3-sky');
  prFloor(1520, PR.char, { trim: false });

  // Trạm ISS bay lượn ở trung tâm
  tsISS(CX, 720, 1.3, -0.05);

  const tFirst = VW('cta', 'tiên?').t0;
  prCommentBox(CX, 1160, 'LÊN ISS BẠN SẼ LÀM GÌ?', tFirst, { hint: 'Bình luận điều bạn muốn thử...' });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'party',
    key: 'f8',
    mood: 'happy',
    hold: propTube(-0.2),
    look: -14
  });

  prSign('BẠN SẼ LÀM GÌ TRÊN ISS?', { kicker: KICK });
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
    { k: 'pop', t: qT('hook', 'bay') },
    { k: 'thud', t: qT('gravity', 'không') },
    { k: 'pop', t: qT('reality', 'mạnh.') },
    { k: 'chime', t: qT('freefall', 'rơi') },
    { k: 'tick', t: qT('orbit', 'nhanh') },
    { k: 'thud', t: qT('together', 'rơi') },
    { k: 'chime', t: qT('weightless', 'không') },
    { k: 'pop', t: qT('cta', 'tiên?') }
  ];
}
