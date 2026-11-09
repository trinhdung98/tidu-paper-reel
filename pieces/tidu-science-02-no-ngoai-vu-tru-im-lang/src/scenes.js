
// =====================================================================
//  TIDU SCIENCE 02 — "Nếu có một vụ nổ ngoài vũ trụ, bạn có nghe thấy không?"
//  Vật lý & Thiên văn học: Sóng âm trong chân không & Sóng vô tuyến.
//  Mascot: flasky() (Tidu Science flask).
//  Theme: Cosmic navy & deep charcoal (#1b2230, #222b3a).
// =====================================================================
FLASKY_SCALE = 0.88;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const FLASKY_X = 880, FLASKY_Y = 1790;
const KICK = 'TIDU SCIENCE · VẬT LÝ VŨ TRỤ';
const SPACE_BG = '#1c2230';
const SPACE_D  = '#151b26';
const SPACE_L  = '#263042';

const SCENES = {};

// ---- CUSTOM HELPERS ----

// Ngôi sao giấy
function tsStar(cx, cy, r, col = PR.yellow) {
  const tw = 0.8 + Math.sin(TT * 3 + cx * 0.1) * 0.2;
  pp(pG([
    [cx, cy - r * tw], [cx + r * 0.28, cy - r * 0.28],
    [cx + r * tw, cy], [cx + r * 0.28, cy + r * 0.28],
    [cx, cy + r * tw], [cx - r * 0.28, cy + r * 0.28],
    [cx - r * tw, cy], [cx - r * 0.28, cy - r * 0.28]
  ]), col, { shadow: false, tex: 0.3 });
}

function tsSky(seed = 'sky2') {
  const R = RNG(seed);
  for (let i = 0; i < 26; i++) {
    const sx = R.r(40, W - 40), sy = R.r(260, 1500), sr = R.r(6, 16);
    tsStar(sx, sy, sr, R.pick([PR.yellow, PR.creamL, PR.sky, '#ffffff', PR.orange]));
  }
}

// Thẻ card giấy
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

// Tàu vũ trụ bằng giấy (kèm hiệu ứng vỡ tung khi nổ)
function tsSpaceship(cx, cy, s = 1, isExploded = false, t0 = 0) {
  withT(cx, cy, 0, s, () => {
    if (!isExploded) {
      // Thân tàu hình con thoi
      pp(pG([[-40, 90], [0, -130], [40, 90], [0, 70]]), PR.paperW, { key: 'shipb', sb: 16, sy: 8, tex: 0.6 });
      // Mũi tàu đỏ
      pp(pG([[-18, -60], [0, -130], [18, -60]]), PR.red, { key: 'shiptip', shadow: false, tex: 0.4 });
      // Cánh hai bên
      pp(pG([[-40, 40], [-90, 105], [-40, 90]]), PR.blue, { key: 'shipwL', sb: 8, sy: 4, tex: 0.5 });
      pp(pG([[40, 40], [90, 105], [40, 90]]), PR.blue, { key: 'shipwR', sb: 8, sy: 4, tex: 0.5 });
      // Cửa sổ tròn
      pp(pE(0, -10, 22, 22), PR.sky, { key: 'shipwin', sb: 6, sy: 3, tex: 0.3 });
      pp(pE(-4, -14, 6, 6), '#ffffff', { shadow: false, tex: false });
    } else {
      // Vụ nổ: các mảnh giấy cam/vàng/đỏ bung ra theo thời gian
      const u = TT - t0;
      const R = RNG('exp', t0);
      for (let i = 0; i < 24; i++) {
        const a = (i * TAU) / 24 + R.r(-0.15, 0.15);
        const speed = Math.min(1.2, u);
        const dist = 30 + speed * R.r(140, 260);
        const px = Math.cos(a) * dist, py = Math.sin(a) * dist;
        const col = R.pick([PR.orange, PR.yellow, PR.red, PR.mustard]);
        withT(px, py, a + u * 2, 1, () => {
          pp(pG([[-18, -12], [22, -8], [12, 18], [-14, 14]]), col, { key: 'sh' + i, shadow: false, tex: 0.5 });
        });
      }
      const smokeR = Math.min(190, 40 + Math.min(1.2, u) * 120);
      pp(pE(0, 0, smokeR, smokeR), 'rgba(255,200,60,0.22)', { shadow: false, tex: 0.2 });
    }
  });
}

// Biểu tượng loa bị gạch chéo (MUTE / IM LẶNG)
function tsMuteSpeaker(cx, cy, s = 1) {
  withT(cx, cy, 0, s, () => {
    // Vòng tròn nền đỏ bo góc
    pp(pE(0, 0, 85, 85), PR.redD, { key: 'mutecirc', sb: 14, sy: 7, tex: 0.5 });
    pp(pE(0, 0, 75, 75), PR.red, { shadow: false, tex: 0.4 });
    // Thân loa giấy trắng
    pp(pR(-45, -20, 28, 40, 6), PR.creamL, { key: 'spkb', shadow: false });
    pp(pG([[-18, -20], [16, -45], [16, 45], [-18, 20]]), PR.creamL, { key: 'spkc', shadow: false });
    // Dấu gạch chéo đỏ đậm / trắng
    ctx.save();
    ctx.strokeStyle = PR.creamL;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-52, -52); ctx.lineTo(52, 52);
    ctx.stroke();
    ctx.restore();
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// SCENE 1: HOOK (Line: "Một vụ nổ khổng lồ ngoài vũ trụ có thể hoàn toàn im lặng!")
// Tàu vũ trụ nổ tung thành những mảnh màu cam, nhưng ngay lập tức xuất hiện biển báo IM LẶNG
SCENES.hook = () => {
  const t0 = E0;
  prWall(SPACE_BG, { streak: 420 });
  tsSky('hook2-sky');
  prFloor(1520, PR.char, { trim: false });

  // Tàu vũ trụ nổ ở giữa màn hình
  const tExplode = VW('hook', 'nổ').t0;
  const isExp = TT > tExplode;
  tsSpaceship(CX, 720, 1.4, isExp, tExplode);

  // Biểu tượng MUTE bật ra trên từ "im" / "lặng"
  // Biểu tượng MUTE bật ra trên từ "thể" / "toàn"
  const tMute = VW('hook', 'toàn').t0;
  if (TT > tMute) {
    const sMute = popS(tMute);
    tsMuteSpeaker(CX, 720, sMute * 1.3);
    prStamp('HOÀN TOÀN IM LẶNG!', CX, 1150, PR.yellow, tMute, { rot: -0.03, size: 48, from: 1.15 });
  }

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f1',
    mood: TT > tExplode ? 'wow' : 'neutral',
    look: -16
  });

  prSign('VỤ NỔ TRONG IM LẶNG', { kicker: KICK });
  prChips();
};

// SCENE 2: SCIFI (Line: "Trong phim khoa học viễn tưởng, tàu vũ trụ nổ thường phát ra tiếng động cực lớn.")
// Minh họa màn ảnh phim Hollywood: vụ nổ bùm và loa phóng thanh cực lớn
SCENES.scifi = () => {
  const t0 = E0;
  prWall(SPACE_D, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('scifi-sky');
  prFloor(1520, PR.char, { trim: false });

  // Bảng chiếu phim Sci-Fi
  const bW = 840, bH = 620, bY = 780;
  tsCard(CX, bY, bW, bH, 'movCard');
  pp(pR(CX - 220, bY - bH / 2 + 20, 440, 50, 10), PR.orange, { key: 'scifitag', sb: 6, sy: 3 });
  txt('TRÊN PHIM ĐIỆN ẢNH', CX, bY - bH / 2 + 54, 28, PR.creamL, { align: 'center', weight: 800 });

  // Tàu vũ trụ đang nổ
  tsSpaceship(CX - 160, bY + 30, 1.1, true, t0);

  // Loa phát ra sóng âm cực lớn: "BÙM!!"
  withT(CX + 160, bY + 30, 0, 1, () => {
    pp(pR(-30, -35, 45, 70, 8), PR.navyD, { key: 'megb', sb: 8, sy: 4 });
    pp(pG([[-10, -35], [55, -80], [55, 80], [-10, 35]]), PR.mustard, { key: 'megc', sb: 12, sy: 6 });
    // Sóng âm thanh tỏa ra
    for (let i = 1; i <= 3; i++) {
      const swR = 60 + i * 36;
      ctx.save();
      ctx.strokeStyle = PR.orange;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(60, 0, swR, -Math.PI * 0.35, Math.PI * 0.35);
      ctx.stroke();
      ctx.restore();
    }
  });

  // Stamp: HIỆU ỨNG ÂM THANH
  const tLoud = VW('scifi', 'lớn.').t0;
  prStamp('ÂM THANH KỸ XẢO PHIM', CX, 1180, PR.red, tLoud, { rot: 0.03, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'propeller',
    key: 'f2',
    mood: 'happy',
    look: -14
  });

  prSign('TIẾNG NỔ TRÊN PHIM', { kicker: KICK });
  prChips();
};

// SCENE 3: SPACE (Line: "Nhưng ngoài khoảng không gần như chân không, bạn sẽ không nghe được tiếng nổ ấy.")
// Đối chiếu khoảng không vũ trụ chân không
SCENES.space = () => {
  const t0 = E0;
  prWall(SPACE_L, { streak: 460 });
  tsSky('space3-sky');
  prFloor(1520, PR.char, { trim: false });

  // Bảng đối chiếu: Trái Đất vs Chân không vũ trụ
  const cW = 360, cH = 520, cY = 780;

  // Cột Trái Đất (330)
  tsCard(330, cY, cW, cH, 'cEarth');
  pp(pR(330 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.blue, { key: 'tetag', sb: 6, sy: 3 });
  txt('TRÁI ĐẤT', 330, cY - cH / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });
  // Nhiều hạt phân tử không khí
  const RE = RNG('airdot');
  for (let i = 0; i < 28; i++) {
    pp(pE(330 + RE.r(-120, 120), cY + RE.r(-80, 140), 9, 9), PR.sky, { key: 'ad' + i, shadow: false });
  }
  txt('CÓ KHÔNG KHÍ', 330, cY + cH / 2 - 34, 24, PR.navyD, { align: 'center', weight: 800 });

  // Cột Chân Không Vũ Trụ (750)
  tsCard(750, cY, cW, cH, 'cVac');
  pp(pR(750 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.char, { key: 'tvtag', sb: 6, sy: 3 });
  txt('CHÂN KHÔNG', 750, cY - cH / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });
  // Không có hạt phân tử nào!
  txt('KHÔNG CÓ HẠT', 750, cY + 30, 28, PR.red, { align: 'center', weight: 800 });
  txt('IM LẶNG', 750, cY + cH / 2 - 34, 24, PR.navyD, { align: 'center', weight: 800 });

  // Stamp: KHÔNG NGHE THẤY
  const tNo = VW('space', 'không').t0;
  prStamp('KHÔNG THỂ NGHE THẤY', CX, 1180, PR.orange, tNo, { rot: -0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'goggles',
    key: 'f3',
    mood: 'flat',
    look: -12
  });

  prSign('CHÂN KHÔNG VŨ TRỤ', { kicker: KICK });
  prChips();
};

// SCENE 4: MEDIUM (Line: "Vì âm thanh cần vật chất như không khí hoặc nước để truyền đi.")
// Minh họa sự truyền sóng âm qua các hạt vật chất (không khí / nước)
SCENES.medium = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 150 });
  tsSky('med-sky');
  prFloor(1520, PR.char, { trim: false });

  // Ống thí nghiệm truyền sóng âm
  const bW = 860, bH = 580, bY = 780;
  tsCard(CX, bY, bW, bH, 'medBox');

  txt('SÓNG ÂM CẦN MÔI TRƯỜNG VẬT CHẤT', CX, bY - bH / 2 + 50, 30, PR.navyD, { align: 'center', weight: 800 });

  // Minh họa các hạt dao động theo sóng dọc
  const rows = 4, cols = 12;
  const startX = CX - 330, startY = bY - 60;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Sóng truyền từ trái sang phải
      const waveOffset = Math.sin((TT - t0) * 8 - c * 0.6) * 16;
      const px = startX + c * 58 + waveOffset;
      const py = startY + r * 55;
      pp(pE(px, py, 11, 11), c < 6 ? PR.sky : PR.blue, { key: 'p' + r + c, shadow: false });
    }
  }

  // Chú thích vật chất
  pp(pR(CX - 320, bY + 160, 300, 54, 10), PR.sky, { key: 'mnot1', sb: 6, sy: 3 });
  txt('KHÔNG KHÍ', CX - 170, bY + 196, 26, PR.navyD, { align: 'center', weight: 800 });

  pp(pR(CX + 20, bY + 160, 300, 54, 10), PR.blue, { key: 'mnot2', sb: 6, sy: 3 });
  txt('NƯỚC / CHẤT LỎNG', CX + 170, bY + 196, 26, PR.creamL, { align: 'center', weight: 800 });

  // Stamp: SÓNG CƠ HỌC
  const tMat = VW('medium', 'chất').t0;
  prStamp('SÓNG CẦN MÔI TRƯỜNG', CX, 1190, PR.green, tMat, { rot: 0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'hardhat',
    key: 'f4',
    mood: 'happy',
    hold: propTube(-0.25),
    look: -12
  });

  prSign('ÂM THANH CẦN VẬT CHẤT', { kicker: KICK });
  prChips();
};

// SCENE 5: VACUUM (Line: "Trong chân không, không có đủ hạt vật chất để truyền sóng âm.")
// Bình chân không thí nghiệm: sóng âm tắt ngấm
SCENES.vacuum = () => {
  const t0 = E0;
  prWall(SPACE_D, { streak: 480 });
  tsSky('vac-sky');
  prFloor(1520, PR.char, { trim: false });

  // Bình chuông chân không lớn (Bell jar vacuum experiment)
  const bX = CX, bY = 760, jarW = 480, jarH = 460;
  // Đế chuông
  pp(pR(bX - jarW / 2 - 30, bY + jarH / 2 - 20, jarW + 60, 40, 8), PR.char, { key: 'jarbase', sb: 12, sy: 6 });
  // Chuông thủy tinh
  pp(pR(bX - jarW / 2, bY - jarH / 2, jarW, jarH, 40), PR.glass, { key: 'jarglass', sb: 16, sy: 8, tex: 0.35, rim: 'rgba(255,255,255,0.7)', rw: 3 });

  // Bên trong chuông: một chiếc chuông báo thức đang reo nhưng KHÔNG CÓ HẠT
  withT(bX, bY - 20, 0, 1, () => {
    // Thân chuông báo thức
    pp(pE(0, 0, 80, 80), PR.mustard, { key: 'bellb', sb: 10, sy: 5 });
    pp(pE(0, 0, 68, 68), PR.creamL, { shadow: false });
    // Kim đồng hồ
    pp(pR(-3, -40, 6, 42, 3), PR.ink, { shadow: false });
    pp(pR(-3, -3, 30, 6, 3), PR.ink, { shadow: false });
    // Chuông nhỏ hai bên đỉnh
    pp(pE(-60, -60, 24, 24), PR.mustard, { key: 'belltopL', shadow: false });
    pp(pE(60, -60, 24, 24), PR.mustard, { key: 'belltopR', shadow: false });
  });

  // Chữ to dập lên: "0 HẠT PHÂN TỬ"
  const tZero = VW('vacuum', 'không', 1).t0;
  prStamp('CHÂN KHÔNG = 0 HẠT', CX, 1170, PR.red, tZero, { rot: -0.03, size: 48, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'mortar',
    key: 'f5',
    mood: 'flat',
    look: -10
  });

  prSign('KHÔNG CÓ HẠT TRUYỀN SÓNG', { kicker: KICK });
  prChips();
};

// SCENE 6: RADIO (Line: "Vậy phi hành gia liên lạc thế nào? Họ dùng tín hiệu vô tuyến, rồi thiết bị chuyển tín hiệu thành âm thanh để nghe.")
// Hai phi hành gia liên lạc bằng sóng vô tuyến xuyên qua chân không vũ trụ
SCENES.radio = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('rad-sky');
  prFloor(1520, PR.char, { trim: false });

  // Bảng minh họa: SÓNG VÔ TUYẾN TRUYỀN TRONG CHÂN KHÔNG
  const bW = 860, bH = 600, bY = 780;
  tsCard(CX, bY, bW, bH, 'radioCard');

  txt('SÓNG VÔ TUYẾN ĐI QUA ĐƯỢC CHÂN KHÔNG', CX, bY - bH / 2 + 50, 28, PR.navyD, { align: 'center', weight: 800 });

  // Hai ăng-ten / mũ phi hành gia đối diện nhau
  const aX1 = CX - 260, aX2 = CX + 260, aY = bY + 30;

  // Ăng-ten phát (trái)
  withT(aX1, aY, 0, 1, () => {
    pp(pE(0, 0, 60, 60), PR.char, { key: 'hel1', sb: 10, sy: 5 });
    pp(pE(0, -5, 45, 35), '#a0d8ef', { shadow: false });
    // Cần ăng-ten
    pp(pR(-3, -75, 6, 45, 3), PR.yellow, { shadow: false });
    pp(pE(0, -78, 9, 9), PR.red, { shadow: false });
  });

  // Ăng-ten thu (phải)
  withT(aX2, aY, 0, 1, () => {
    pp(pE(0, 0, 60, 60), PR.char, { key: 'hel2', sb: 10, sy: 5 });
    pp(pE(0, -5, 45, 35), '#a0d8ef', { shadow: false });
    pp(pR(-3, -75, 6, 45, 3), PR.yellow, { shadow: false });
    pp(pE(0, -78, 9, 9), PR.green, { shadow: false });
  });

  // Dải sóng điện từ (radio wave) nối giữa hai ăng-ten
  ctx.save();
  ctx.strokeStyle = PR.orange;
  ctx.lineWidth = 6;
  ctx.beginPath();
  for (let x = aX1 + 70; x <= aX2 - 70; x += 6) {
    const y = aY + Math.sin((x - aX1) * 0.08 - (TT - t0) * 10) * 28;
    if (x === aX1 + 70) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Thẻ chú thích: "SÓNG VÔ TUYẾN -> TAI NGHE"
  const tSig = VW('radio', 'tín').t0;
  withT(CX, bY + 180, 0, 1, () => {
    pp(pR(-260, -35, 520, 70, 10), PR.navyD, { key: 'radiotag', sb: 8, sy: 4 });
    txt('SÓNG ĐIỆN TỪ KHÔNG CẦN VẬT CHẤT', 0, 10, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f6',
    mood: 'happy',
    look: -14
  });

  prSign('SÓNG VÔ TUYẾN ĐI QUA', { kicker: KICK });
  prChips();
};

// SCENE 7: CTA (Line: "Bạn biết bộ phim vũ trụ nào có tiếng nổ hoành tráng nhất?")
// Bảng clapperboard phim và hộp bình luận
SCENES.cta = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('cta2-sky');
  prFloor(1520, PR.char, { trim: false });

  // Bảng clapperboard đạo diễn phim điện ảnh
  const clpY = 720;
  withT(CX, clpY, -0.02, 1, () => {
    // Thân bảng đen
    pp(pR(-260, -140, 520, 280, 14), PR.char, { key: 'clpmain', sb: 18, sy: 9, tex: 0.45 });
    // Thanh sọc nghiêng phía trên
    pp(pR(-260, -195, 520, 50, 6), PR.ink, { key: 'clptop', sb: 8, sy: 4 });
    // Các vạch sọc trắng nghiêng
    ctx.save();
    ctx.beginPath();
    ctx.rect(-260, -195, 520, 50);
    ctx.clip();
    for (let x = -300; x < 300; x += 60) {
      pp(pG([[x, -195], [x + 30, -195], [x - 10, -145], [x - 40, -145]]), PR.paperW, { shadow: false, tex: false });
    }
    ctx.restore();
    txt('PHIM KHOA HỌC VIỄN TƯỞNG', 0, -60, 28, PR.mustard, { align: 'center', weight: 800 });
    txt('STAR WARS · INTERSTELLAR', 0, 20, 32, PR.creamL, { align: 'center', weight: 800 });
  });

  // Hộp bình luận tương tác
  const tExp = VW('cta', 'nhất?').t0;
  prCommentBox(CX, 1160, 'PHIM VŨ TRỤ HOÀNH TRÁNG?', tExp, { hint: 'Bình luận tên bộ phim bạn thích...' });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'party',
    key: 'f7',
    mood: 'happy',
    hold: propTube(-0.2),
    look: -12
  });

  prSign('BỘ PHIM VŨ TRỤ NÀO?', { kicker: KICK });
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
    { k: 'boom', t: qT('hook', 'nổ') },
    { k: 'pop', t: qT('scifi', 'tưởng,') },
    { k: 'thud', t: qT('space', 'không') },
    { k: 'tick', t: qT('medium', 'chất') },
    { k: 'pop', t: qT('vacuum', 'không') },
    { k: 'chime', t: qT('radio', 'tuyến,') },
    { k: 'pop', t: qT('cta', 'nhất?') }
  ];
}
