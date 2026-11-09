
// =====================================================================
//  TIDU SCIENCE 01 — "Vì sao Mặt Trăng lúc tròn, lúc khuyết?"
//  Thiên văn học: Các pha của Mặt Trăng (Lunar Phases).
//  Mascot: flasky() (Tidu Science flask).
//  Theme: Deep cosmic slate & navy (#232936, #1c2230).
// =====================================================================
FLASKY_SCALE = 0.88;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const FLASKY_X = 880, FLASKY_Y = 1790;
const KICK = 'TIDU SCIENCE · THIÊN VĂN HỌC';
const SPACE_BG = '#1e2533';
const SPACE_D  = '#161c27';
const SPACE_L  = '#293245';

const SCENES = {};

// ---- CUSTOM HELPERS (PAPER SCIENCE & ASTRONOMY) ----

// Một ngôi sao lấp lánh bằng giấy
function tsStar(cx, cy, r, col = PR.yellow) {
  const tw = 0.8 + Math.sin(TT * 3 + cx * 0.1) * 0.2;
  pp(pG([
    [cx, cy - r * tw], [cx + r * 0.28, cy - r * 0.28],
    [cx + r * tw, cy], [cx + r * 0.28, cy + r * 0.28],
    [cx, cy + r * tw], [cx - r * 0.28, cy + r * 0.28],
    [cx - r * tw, cy], [cx - r * 0.28, cy - r * 0.28]
  ]), col, { shadow: false, tex: 0.3 });
}

// Bầu trời đêm rải rác sao và bụi giấy vũ trụ
function tsSky(seed = 'sky') {
  const R = RNG(seed);
  for (let i = 0; i < 28; i++) {
    const sx = R.r(40, W - 40), sy = R.r(260, 1500), sr = R.r(6, 16);
    const col = R.pick([PR.yellow, PR.creamL, PR.sky, '#ffffff', PR.orange]);
    tsStar(sx, sy, sr, col);
  }
}

// Mặt Trăng bằng giấy với các vết lõm (craters) và pha ánh sáng
// phase: 0 = trăng mới (tối), 0.25 = lưỡi liềm, 0.5 = bán nguyệt, 0.75 = trăng khuyết, 1.0 = trăng tròn
// litFromLeft: true nếu ánh sáng chiếu từ bên trái
function tsMoon(cx, cy, r, phase = 1, litFromLeft = true, key = 'moon') {
  withT(cx, cy, 0, 1, () => {
    // 1. Quả cầu nền (màu giấy kem ấm)
    pp(pE(0, 0, r, r), '#f7f2e4', { key: key + 'base', sb: 16, sy: 8, tex: 0.65, rim: 'rgba(255,255,255,0.7)', rw: 3 });

    // 2. Các vết lõm bề mặt mặt trăng (craters)
    const craters = [
      [-r * 0.35, -r * 0.25, r * 0.18, r * 0.15],
      [-r * 0.15, r * 0.35, r * 0.22, r * 0.18],
      [r * 0.30, -r * 0.30, r * 0.14, r * 0.12],
      [r * 0.25, r * 0.20, r * 0.25, r * 0.20],
      [-r * 0.40, r * 0.10, r * 0.12, r * 0.10],
      [r * 0.05, -r * 0.45, r * 0.10, r * 0.09]
    ];
    craters.forEach(([cx0, cy0, rx, ry], i) => {
      pp(pE(cx0, cy0, rx, ry), '#ded3bf', { key: key + 'cr' + i, shadow: false, tex: 0.4 });
      pp(pE(cx0 + 2, cy0 + 2, rx * 0.8, ry * 0.8), '#d0c3ab', { shadow: false, tex: 0.3 });
    });

    // 3. Phủ phần bóng tối (shadow) theo pha (0..1)
    if (phase < 0.98) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r + 1, 0, TAU);
      ctx.clip();

      const shadowCol = '#1a202c';
      ctx.fillStyle = shadowCol;
      ctx.beginPath();

      // Nửa hình tròn phía tối
      ctx.arc(0, 0, r + 2, litFromLeft ? Math.PI * 0.5 : -Math.PI * 0.5, litFromLeft ? -Math.PI * 0.5 : Math.PI * 0.5, false);

      // Đường ranh giới phân cách ngày/đêm (terminator ellipse)
      const termR = r * Math.abs(2 * phase - 1);
      ctx.ellipse(0, 0, Math.max(0.1, termR), r + 2, 0, litFromLeft ? -Math.PI * 0.5 : Math.PI * 0.5, litFromLeft ? Math.PI * 0.5 : -Math.PI * 0.5, (phase < 0.5) !== litFromLeft);

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // 4. Viền giấy nổi nhẹ
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, TAU);
    ctx.stroke();
    ctx.restore();
  });
}

// Mặt Trời bằng giấy với các tia nắng tỏa ra
function tsSun(cx, cy, r, key = 'sun') {
  withT(cx, cy, 0, 1, () => {
    // Các tia nắng xoay chậm
    const rays = 12, rot = TT * 0.25;
    for (let i = 0; i < rays; i++) {
      const a = rot + (i * TAU) / rays;
      const r1 = r * 1.08, r2 = r * 1.42;
      const p1 = [Math.cos(a - 0.16) * r1, Math.sin(a - 0.16) * r1];
      const p2 = [Math.cos(a) * r2, Math.sin(a) * r2];
      const p3 = [Math.cos(a + 0.16) * r1, Math.sin(a + 0.16) * r1];
      pp(pG([p1, p2, p3]), PR.orange, { key: key + 'ray' + i, shadow: false, tex: 0.5 });
    }
    // Vầng hào quang ngoài
    pp(pE(0, 0, r * 1.14, r * 1.14), PR.mustard, { key: key + 'halo', sb: 18, sy: 9, tex: 0.5 });
    // Thân Mặt Trời vàng rực
    pp(pE(0, 0, r, r), PR.yellow, { key: key + 'body', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.8)', rw: 4 });
  });
}

// Trái Đất bằng giấy với đại dương xanh và các mảng lục địa xanh lá
function tsEarth(cx, cy, r, key = 'earth') {
  withT(cx, cy, 0, 1, () => {
    // Đại dương
    pp(pE(0, 0, r, r), PR.blue, { key: key + 'ocean', sb: 16, sy: 8, tex: 0.6, rim: 'rgba(255,255,255,0.6)', rw: 3 });
    // Lục địa giấy
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r - 2, 0, TAU);
    ctx.clip();
    const conts = [
      [[-r * 0.5, -r * 0.3], [-r * 0.2, -r * 0.6], [r * 0.1, -r * 0.4], [0, -r * 0.1], [-r * 0.4, 0]],
      [[-r * 0.1, r * 0.1], [r * 0.4, -r * 0.1], [r * 0.6, r * 0.4], [r * 0.2, r * 0.6], [-r * 0.1, r * 0.3]],
      [[-r * 0.7, r * 0.2], [-r * 0.5, r * 0.5], [-r * 0.3, r * 0.3], [-r * 0.6, 0]]
    ];
    conts.forEach((pts, i) => pp(pG(pts), PR.green, { key: key + 'land' + i, shadow: false, tex: 0.5 }));
    // Vệt mây trắng
    pp(pE(-r * 0.2, -r * 0.1, r * 0.35, r * 0.08, -0.2), 'rgba(255,255,255,0.65)', { shadow: false, tex: 0.3 });
    pp(pE(r * 0.25, r * 0.3, r * 0.4, r * 0.09, 0.15), 'rgba(255,255,255,0.65)', { shadow: false, tex: 0.3 });
    ctx.restore();
  });
}

// Kính thiên văn trên giá ba chân bằng gỗ
function tsTelescope(cx, cy, s = 1) {
  withT(cx, cy, 0, s, () => {
    // Chân gỗ
    ctx.save();
    ctx.strokeStyle = PR.woodD;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(-70, 160);
    ctx.moveTo(0, 0); ctx.lineTo(0, 170);
    ctx.moveTo(0, 0); ctx.lineTo(70, 160);
    ctx.stroke();
    ctx.restore();
    // Ống kính kim loại hướng lên góc 35 độ
    withT(0, 0, -0.55, 1, () => {
      pp(pR(-20, -110, 40, 150, 8), PR.navyD, { key: 'teleb', sb: 10, sy: 5, tex: 0.5 });
      pp(pR(-25, -125, 50, 22, 6), PR.mustard, { key: 'telef', sb: 6, sy: 3, tex: 0.4 });
      pp(pR(-15, 36, 30, 40, 4), PR.mustard, { key: 'teleey', sb: 4, sy: 2, tex: 0.4 });
      pp(pE(0, -125, 20, 6), '#a0d8ef', { shadow: false, tex: 0.2 });
    });
  });
}

// Bảng thông tin khoa học giấy bo góc
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

// =====================================================================
//  SCENE DEFINITIONS (8 LINES)
// =====================================================================

// SCENE 1: HOOK (0.30 - 2.05s) — "Ai đã lấy mất một miếng Mặt Trăng?"
// Storyboard 0-3s: Mặt Trăng tròn bằng giấy bị biến thành hình lưỡi liềm. Dấu hỏi lớn xuất hiện.
SCENES.hook = () => {
  const t0 = E0;
  prWall(SPACE_BG, { streak: 450 });
  tsSky('hook-sky');
  prFloor(1520, PR.char, { trim: false });

  // Hero: Mặt Trăng tròn biến thành hình lưỡi liềm trên từ "mất" / "miếng"
  const tBite = VW('hook', 'mất').t0;
  const pBite = ev(tBite, 0.45);
  // Phase đi từ 1.0 (tròn) xuống 0.25 (lưỡi liềm)
  const currentPhase = lerp(1.0, 0.25, EZ.o3(pBite));

  tsMoon(CX, 760, 210, currentPhase, true, 'hmoon');

  // Dấu hỏi lớn màu cam bật ra bên cạnh khi trăng bị khuyết
  const tQ = VW('hook', 'mất').t0;
  if (TT > tBite) {
    const sQ = popS(tQ);
    withT(730, 680, 0.12, sQ, () => {
      pp(pR(-65, -95, 130, 190, 22), PR.orange, { key: 'qbox', sb: 18, sy: 9, tex: 0.55 });
      txt('?', 0, 56, 140, PR.creamL, { align: 'center', weight: 800 });
    });
  }

  // Kính thiên văn ở góc quan sát
  tsTelescope(220, 1340, 1.1);

  // Mascot: flasky với mũ thám hiểm (explorer) ngạc nhiên
  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'explorer',
    key: 'f1',
    mood: TT > tBite ? 'wow' : 'neutral',
    look: -16
  });

  prSign('AI LẤY MẤT MẶT TRĂNG?', { kicker: KICK });
  prChips();
};

// SCENE 2: QUESTION (3.25 - 8.72s) — "Bạn có bao giờ thắc mắc vì sao Mặt Trăng hôm nay tròn, nhưng vài ngày sau lại chỉ còn một mảnh cong?"
// So sánh trăng tròn "Hôm nay" vs trăng khuyết "Vài ngày sau"
SCENES.question = () => {
  const t0 = E0;
  prWall(SPACE_D, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('q-sky');
  prFloor(1520, PR.char, { trim: false });

  // Paired cards: cx = 330 và cx = 750 (midpoint = 540, gap = 420, width = 360)
  const cW = 360, cH = 520, cY = 790;

  // Card 1: HÔM NAY (Trăng tròn)
  tsCard(330, cY, cW, cH, 'qcard1');
  pp(pR(330 - 140, cY - cH / 2 + 24, 280, 52, 10), PR.navy, { key: 'qtag1', sb: 6, sy: 3 });
  txt('HÔM NAY', 330, cY - cH / 2 + 58, 28, PR.creamL, { align: 'center', weight: 800 });
  tsMoon(330, cY + 40, 110, 1.0, true, 'qmoon1');
  txt('TRĂNG TRÒN', 330, cY + cH / 2 - 38, 30, PR.navyD, { align: 'center', weight: 800 });

  // Card 2: VÀI NGÀY SAU (Trăng lưỡi liềm) - xuất hiện trên từ "sau"
  const tAfter = VW('question', 'sau').t0;
  const sAfter = popS(tAfter);
  withT(750, cY, 0.02, sAfter, () => {
    tsCard(0, 0, cW, cH, 'qcard2');
    pp(pR(-140, -cH / 2 + 24, 280, 52, 10), PR.sciD, { key: 'qtag2', sb: 6, sy: 3 });
    txt('VÀI NGÀY SAU', 0, -cH / 2 + 58, 28, PR.creamL, { align: 'center', weight: 800 });
    tsMoon(0, 40, 110, 0.22, true, 'qmoon2');
    txt('LƯỠI LIỀM', 0, cH / 2 - 38, 30, PR.navyD, { align: 'center', weight: 800 });
  });

  // Mũi tên chuyển động ở giữa hai thẻ
  if (TT > tAfter) {
    withT(540, cY + 40, 0, 1, () => {
      pp(pR(-28, -8, 56, 16, 4), PR.yellow, { key: 'arr1', shadow: false });
      pp(pG([[18, -20], [42, 0], [18, 20]]), PR.yellow, { key: 'arr2', shadow: false });
    });
  }

  // Stamp câu hỏi khoa học
  prCounter('CHU KỲ', '29.5 NGÀY', 540, 1170, { w: 360, h: 170, rot: -0.02, fill: PR.yellow, big: 44 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'goggles',
    key: 'f2',
    mood: 'neutral',
    hold: propGlass(-0.35),
    look: -12
  });

  prSign('TRĂNG TRÒN RỒI LẠI KHUYẾT', { kicker: KICK });
  prChips();
};

// SCENE 3: REALITY (10.22 - 12.83s) — "Thực ra, Mặt Trăng không bị mất đi phần nào cả."
// Quả cầu Mặt Trăng hoàn chỉnh 100%, chỉ là nửa tối không nhìn thấy
SCENES.reality = () => {
  const t0 = E0;
  prWall(SPACE_L, { streak: 400 });
  tsSky('real-sky');
  prFloor(1520, PR.char, { trim: false });

  // Hero: Mô hình Mặt Trăng lớn với viền quỹ đạo hoàn chỉnh
  const mR = 210, mY = 760;
  // Vòng quỹ đạo phát sáng xung quanh chứng minh khối cầu nguyên vẹn
  ctx.save();
  ctx.strokeStyle = PR.mustard;
  ctx.lineWidth = 6;
  ctx.setLineDash([14, 10]);
  ctx.beginPath();
  ctx.arc(CX, mY, mR + 26, 0, TAU);
  ctx.stroke();
  ctx.restore();

  // Mặt Trăng với nửa sáng và nửa tối mờ
  tsMoon(CX, mY, mR, 0.5, true, 'rmoon');

  // Thước đo khoa học / Ticks chứng minh hình cầu nguyên vẹn
  [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((a, i) => {
    const px = CX + Math.cos(a) * (mR + 42), py = mY + Math.sin(a) * (mR + 42);
    pp(pE(px, py, 10, 10), PR.orange, { key: 'rtick' + i, shadow: false });
  });

  // Stamp slam xác nhận: "KHÔNG BỊ MẤT"
  const tLoss = VW('reality', 'mất').t0;
  prStamp('KHÔNG HỀ MẤT ĐI', CX, 1120, PR.green, tLoss, { rot: -0.03, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'hardhat',
    key: 'f3',
    mood: 'happy',
    hold: propTube(-0.25),
    look: -14
  });

  prSign('MẶT TRĂNG VẪN NGUYÊN VẸN', { kicker: KICK });
  prChips();
};

// SCENE 4: SUN (14.43 - 16.77s) — "Mặt Trời luôn chiếu sáng khoảng một nửa Mặt Trăng."
// Storyboard 3-12s: Mặt Trời, Trái Đất và Mặt Trăng trượt vào khung hình. Mặt Trời chiếu nửa Mặt Trăng.
SCENES.sun = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 150 });
  tsSky('sun-sky');
  prFloor(1520, PR.char, { trim: false });

  // Luồng sáng song song từ Mặt Trời chiếu sang bên phải
  const sGrad = ctx.createLinearGradient(180, 0, 780, 0);
  sGrad.addColorStop(0, 'rgba(255,210,60,0.38)');
  sGrad.addColorStop(0.7, 'rgba(255,210,60,0.18)');
  sGrad.addColorStop(1, 'rgba(255,210,60,0.02)');
  ctx.save();
  ctx.fillStyle = sGrad;
  ctx.beginPath();
  ctx.moveTo(180, 520);
  ctx.lineTo(820, 460);
  ctx.lineTo(820, 1060);
  ctx.lineTo(180, 1000);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Mặt Trời bên trái
  tsSun(180, 760, 120, 'ssun');

  // Mặt Trăng bên phải (đúng nửa bên trái được chiếu sáng!)
  tsMoon(680, 760, 160, 0.5, true, 'smoon');

  // Thẻ chú thích: "LUÔN CHIẾU SÁNG 50%"
  withT(CX, 1160, 0.015, 1, () => {
    pp(pR(-280, -45, 560, 90, 14), PR.creamL, { key: 'sunnote', sb: 14, sy: 7, tex: 0.5 });
    txt('MẶT TRỜI LUÔN SOI SÁNG 50%', 0, 12, 32, PR.navyD, { align: 'center', weight: 800 });
  });

  // Mascot cầm kính phóng to quan sát tia nắng
  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'propeller',
    key: 'f4',
    mood: 'happy',
    look: -16
  });

  prSign('CHIẾU SÁNG MỘT NỬA', { kicker: KICK });
  prChips();
};

// SCENE 5: ORBIT (19.57 - 25.12s) — "Khi Mặt Trăng chuyển động quanh Trái Đất, chúng ta nhìn thấy những phần khác nhau của nửa được chiếu sáng ấy."
// Storyboard 12-32s: Mặt Trăng quay quanh Trái Đất. Một ô nhìn từ Trái Đất cho thấy phần sáng thay đổi qua các pha.
SCENES.orbit = () => {
  const t0 = E0;
  prWall(SPACE_D, { streak: 500 });
  tsSky('orb-sky');
  prFloor(1520, PR.char, { trim: false });

  // 1. GÓC NHÌN KHÔNG GIAN (HỆ MẶT TRỜI - TRÁI ĐẤT - MẶT TRĂNG) ở nửa trên
  const orbCX = CX, orbCY = 660, orbR = 210;

  // Đường quỹ đạo hình tròn nét đứt
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.arc(orbCX, orbCY, orbR, 0, TAU);
  ctx.stroke();
  ctx.restore();

  // Trái Đất ở trung tâm quỹ đạo
  tsEarth(orbCX, orbCY, 58, 'oearth');

  // Mặt Trăng quay quanh Trái Đất theo thời gian
  // Chu kỳ quay quanh quỹ đạo
  const angle = (TT - t0) * 0.75 + Math.PI * 0.2;
  const mX = orbCX + Math.cos(angle) * orbR;
  const mY = orbCY + Math.sin(angle) * orbR;

  // Trong không gian: Ánh sáng Mặt Trời từ bên TRÁI chiếu sang, nên nửa TRÁI của Mặt Trăng luôn sáng!
  tsMoon(mX, mY, 36, 0.5, true, 'orbitingMoon');

  // Tia nhìn từ Trái Đất tới Mặt Trăng
  ctx.save();
  ctx.strokeStyle = PR.yellow;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(orbCX, orbCY);
  ctx.lineTo(mX, mY);
  ctx.stroke();
  ctx.restore();

  // 2. Ô NHÌN TỪ TRÁI ĐẤT (Earth-Observer Inset View) ở nửa dưới
  // Tính pha người quan sát trên Trái Đất nhìn thấy:
  // Khi angle = Math.PI (Mặt Trăng ở giữa Mặt Trời và Trái Đất) -> Trăng Tối (phase 0)
  // Khi angle = 0 (Mặt Trăng đối diện Mặt Trời) -> Trăng Tròn (phase 1)
  const viewPhase = 0.5 - 0.5 * Math.cos(angle);
  const insetY = 1170, inW = 720, inH = 260;

  tsCard(CX, insetY, inW, inH, 'insetBox');
  pp(pR(CX - inW / 2 + 18, insetY - inH / 2 + 16, 320, 40, 8), PR.navy, { key: 'intag', sb: 4, sy: 2 });
  txt('GÓC NHÌN TỪ TRÁI ĐẤT', CX - inW / 2 + 178, insetY - inH / 2 + 43, 22, PR.creamL, { align: 'center', weight: 800 });

  // Hình mặt trăng nhìn từ Trái Đất thay đổi liên tục theo quỹ đạo!
  tsMoon(CX + 140, insetY + 15, 85, viewPhase, Math.sin(angle) >= 0, 'viewMoon');

  // Kính thiên văn nhỏ minh họa góc nhìn người quan sát
  tsTelescope(CX - 180, insetY + 50, 0.85);

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f5',
    mood: 'wow',
    look: -14
  });

  prSign('QUỸ ĐẠO QUANH TRÁI ĐẤT', { kicker: KICK });
  prChips();
};

// SCENE 6: PHASES (29.62 - 31.07s) — "Đó là các pha Mặt Trăng."
// Bảng 4 pha chính của Mặt Trăng trong chu kỳ 29.5 ngày
SCENES.phases = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('phase-sky');
  prFloor(1520, PR.char, { trim: false });

  // Bảng khoa học lớn chứa 4 pha chính
  const bW = 860, bH = 640, bY = 780;
  tsCard(CX, bY, bW, bH, 'phaseBoard');

  txt('4 PHA CHÍNH CỦA MẶT TRĂNG', CX, bY - bH / 2 + 55, 34, PR.navyD, { align: 'center', weight: 800 });

  // Lưới 2x2 gồm 4 pha
  const phases = [
    { name: '1. TRĂNG MỚI', p: 0.05, x: CX - 210, y: bY - 60 },
    { name: '2. LƯỠI LIỀM', p: 0.25, x: CX + 210, y: bY - 60 },
    { name: '3. BÁN NGUYỆT', p: 0.50, x: CX - 210, y: bY + 170 },
    { name: '4. TRĂNG TRÒN', p: 1.00, x: CX + 210, y: bY + 170 }
  ];

  phases.forEach((item, i) => {
    const sPop = popS(t0 + i * 0.12);
    withT(item.x, item.y, 0, sPop, () => {
      pp(pR(-160, -90, 320, 180, 12), PR.cream, { key: 'phsub' + i, sb: 8, sy: 4 });
      tsMoon(0, -15, 52, item.p, true, 'phitem' + i);
      txt(item.name, 0, 62, 24, PR.navyD, { align: 'center', weight: 800 });
    });
  });

  // Stamp: CHU KỲ 29.5 NGÀY
  const tPha = VW('phases', 'pha').t0;
  prStamp('CHU KỲ 29.5 NGÀY', CX, 1180, PR.mustard, tPha, { rot: 0.03, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'mortar',
    key: 'f6',
    mood: 'happy',
    hold: propTube(-0.3),
    look: -12
  });

  prSign('CÁC PHA MẶT TRĂNG', { kicker: KICK });
  prChips();
};

// SCENE 7: MYTH (35.27 - 39.33s) — "Và không, hiện tượng này thông thường không phải do bóng Trái Đất che khuất đâu nhé!"
// Bác bỏ hiểu lầm: Pha mặt trăng KHÔNG PHẢI là nguyệt thực (bóng Trái Đất)
SCENES.myth = () => {
  const t0 = E0;
  prWall(SPACE_D, { streak: 460 });
  tsSky('myth-sky');
  prFloor(1520, PR.char, { trim: false });

  // Paired comparison cards: 330 và 750 (midpoint = 540)
  const cW = 360, cH = 480, cY = 760;

  // Thẻ 1 (Trái): HIỂU LẦM — BÓNG TRÁI ĐẤT (Nguyệt thực)
  tsCard(330, cY, cW, cH, 'mcard1');
  pp(pR(330 - 140, cY - cH / 2 + 20, 280, 48, 8), PR.red, { key: 'mtag1', sb: 6, sy: 3 });
  txt('HIỂU LẦM', 330, cY - cH / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });
  tsMoon(330, cY + 20, 95, 0.25, false, 'mmoon1');
  txt('BÓNG TRÁI ĐẤT', 330, cY + cH / 2 - 36, 26, PR.ink, { align: 'center', weight: 800 });

  // Dấu gạch chéo đỏ lớn (prCross) trên thẻ hiểu lầm!
  const tWrong = VW('myth', 'không').t0;
  prCross(330, cY + 20, tWrong);

  // Thẻ 2 (Phải): THỰC TẾ — GÓC NHÌN CỦA CHÚNG TA
  tsCard(750, cY, cW, cH, 'mcard2');
  pp(pR(750 - 140, cY - cH / 2 + 20, 280, 48, 8), PR.green, { key: 'mtag2', sb: 6, sy: 3 });
  txt('SỰ THẬT', 750, cY - cH / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });
  tsMoon(750, cY + 20, 95, 0.75, true, 'mmoon2');
  txt('GÓC QUAN SÁT', 750, cY + cH / 2 - 36, 26, PR.ink, { align: 'center', weight: 800 });

  // Dấu tick xanh (prCheck)
  const tRight = VW('myth', 'Trái').t0;
  prCheck(750, cY + 20, tRight);

  // Rubber stamp phía dưới
  const tBong = VW('myth', 'bóng').t0;
  prStamp('NGUYỆT THỰC MỚI LÀ BÓNG', CX, 1110, PR.orange, tBong, { rot: -0.02, size: 42, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'goggles',
    key: 'f7',
    mood: 'flat',
    look: -12
  });

  prSign('KHÔNG PHẢI BÓNG TRÁI ĐẤT', { kicker: KICK });
  prChips();
};

// SCENE 8: CTA (41.83 - 43.95s) — "Bạn thích ngắm trăng tròn hay trăng lưỡi liềm?"
// Storyboard 32-45s: Ghép các pha thành vòng tròn, kết thúc ở trăng tròn. Kêu gọi khán giả bình luận.
SCENES.cta = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('cta-sky');
  prFloor(1520, PR.char, { trim: false });

  // Vòng tròn 8 pha quanh Trăng Tròn rực rỡ ở trung tâm
  const wheelCY = 720, wheelR = 260;

  // Vòng quỹ đạo ánh sáng nối các pha
  ctx.save();
  ctx.strokeStyle = 'rgba(255,220,100,0.45)';
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.arc(CX, wheelCY, wheelR, 0, TAU);
  ctx.stroke();
  ctx.restore();

  // 8 pha nhỏ xung quanh
  for (let i = 0; i < 8; i++) {
    const a = (i * TAU) / 8 - Math.PI * 0.5;
    const px = CX + Math.cos(a) * wheelR, py = wheelCY + Math.sin(a) * wheelR;
    const phVal = (i + 1) / 8;
    tsMoon(px, py, 34, phVal, a < Math.PI * 0.5, 'ctaph' + i);
  }

  // Mặt Trăng Tròn lớn rực sáng ở trung tâm
  tsMoon(CX, wheelCY, 130, 1.0, true, 'ctaFullMoon');

  // Particle pháo giấy chúc mừng
  prBurst(CX, wheelCY, t0 + 0.3, { cols: [PR.yellow, PR.mustard, PR.orange, '#ffffff', PR.sky] });

  // Hộp bình luận tương tác
  const tLiem = VW('cta', 'liềm?').t0;
  prCommentBox(CX, 1160, 'TRĂNG TRÒN hay LƯỠI LIỀM?', tLiem, { hint: 'Bình luận sở thích của bạn...' });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'party',
    key: 'f8',
    mood: 'happy',
    hold: propTube(-0.2),
    look: -12
  });

  prSign('BẠN THÍCH PHA NÀO?', { kicker: KICK });
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
    { k: 'pop', t: qT('hook', 'mất') },
    { k: 'pop', t: qT('question', 'sau') },
    { k: 'thud', t: qT('reality', 'mất') },
    { k: 'chime', t: qT('sun', 'nửa') },
    { k: 'tick', t: qT('orbit', 'Đất') },
    { k: 'thud', t: qT('phases', 'pha') },
    { k: 'thud', t: qT('myth', 'không') },
    { k: 'pop', t: qT('myth', 'Trái') },
    { k: 'chime', t: qT('cta', 'liềm?') }
  ];
}
