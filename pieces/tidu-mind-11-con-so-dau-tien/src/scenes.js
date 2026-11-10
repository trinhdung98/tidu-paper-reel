// =====================================================================
//  TIDU MIND 11 — "Con số đầu tiên có thể ảnh hưởng quyết định của bạn"
//  Hiệu ứng neo (Anchoring Bias) — Thiên kiến nhận thức.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THIÊN KIẾN';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};

// Helper: vẽ món hàng cụ thể (túi xách da cao cấp trên bục trưng bày)
function m11Item(cx, cy, s = 1, key = 'item') {
  withT(cx, cy, 0, s, () => {
    // Bục trưng bày bằng gỗ
    pp(pR(-200, 140, 400, 28, 8), PR.wood, { key: key + 'stand', sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-170, 168, 340, 20, 4), PR.woodD, { key: key + 'base', sb: 10, sy: 5, tex: 0.5 });

    // Quai xách túi
    ctx.save();
    ctx.strokeStyle = '#8d5b32';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, -90, 65, Math.PI, 0);
    ctx.stroke();
    ctx.restore();

    // Thân túi xách da
    pp(pR(-140, -80, 280, 220, 24), '#dfc7a7', { key: key + 'body', sb: 16, sy: 8, tex: 0.5 });
    // Nắp túi da màu nâu
    pp(pR(-140, -80, 280, 110, 18), '#a76a38', { key: key + 'flap', sb: 12, sy: 6, tex: 0.5 });
    // Dây đai nắp túi
    pp(pR(-20, -80, 40, 130, 6), '#7a4b22', { key: key + 'strap', sb: 6, sy: 3, tex: 0.4 });
    // Khóa kim loại vàng
    pp(pR(-26, 30, 52, 28, 6), '#f0c242', { key: key + 'buckle', sb: 4, sy: 2, tex: 0.3 });
    pp(pR(-15, 36, 30, 16, 3), '#7a4b22', { shadow: false, tex: false });
  });
}

// Helper: vẽ thẻ giá dạng giấy cắt (price tag)
function m11Tag(x, y, price, strike = false, highlight = false, key = 'tag', s = 1) {
  withT(x, y, 0, s, () => {
    // Thân thẻ giá
    pp(pR(-140, -65, 280, 130, 20), highlight ? '#fff4d6' : PR.paperW, { key: key + 'bg', sb: 14, sy: 7, tex: 0.4 });
    // Lỗ xỏ dây (vòng khuyên giấy)
    pp(pE(-105, 0, 16, 16), '#d4cfc5', { key: key + 'hole_rim', shadow: false, tex: false });
    pp(pE(-105, 0, 8, 8), PR.char, { key: key + 'hole', shadow: false, tex: false });

    // Nhãn giá
    const col = highlight ? PR.red : (strike ? PR.greyD : PR.navy);
    txt(price, 15, 12, fitSize(price, 210, 44), col, { align: 'center', base: 'middle', weight: 800 });

    // Đường gạch chéo đỏ nếu strike
    if (strike) {
      ctx.save();
      ctx.strokeStyle = PR.red;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-90, 25);
      ctx.lineTo(110, -10);
      ctx.stroke();
      ctx.restore();
    }
  });
}

// Helper: chiếc mỏ neo giấy (anchor)
function m11Anchor(cx, cy, s = 1, key = 'anc') {
  withT(cx, cy, 0, s, () => {
    // Vòng xích trên
    pp(pE(0, -110, 32, 32), PR.char, { key: key + 'ring', sb: 8, sy: 4, tex: 0.4 });
    pp(pE(0, -110, 16, 16), PR.cream, { shadow: false, tex: false });
    // Trục đứng
    pp(pR(-12, -90, 24, 190, 8), PR.char, { key: key + 'shaft', sb: 10, sy: 5, tex: 0.4 });
    // Thanh ngang
    pp(pR(-75, -55, 150, 20, 6), PR.greyD, { key: key + 'cross', sb: 8, sy: 4, tex: 0.4 });
    // Cánh neo cong hình cung
    ctx.save();
    ctx.strokeStyle = PR.char;
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, 35, 100, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
    ctx.restore();
    // Hai mũi neo nhọn
    pp(pG([[-95, 25], [-120, 65], [-75, 55]]), PR.char, { key: key + 'tipL', shadow: false });
    pp(pG([[95, 25], [120, 65], [75, 55]]), PR.char, { key: key + 'tipR', shadow: false });
  });
}

// Helper: đồng hồ đo định giá với kim chỉ chính xác lên nửa trên
function m11Dial(cx, cy, value = 0.5, key = 'dial') {
  withT(cx, cy, 0, 1, () => {
    // Khung đồng hồ bán nguyệt
    pp(pR(-340, -200, 680, 400, 28), PR.paperW, { key: key + 'bg', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-315, -175, 630, 350, 20), '#faf8f4', { shadow: false, tex: 0.2 });

    // Tiêu đề đồng hồ (nằm cao hẳn phía trên vòng cung để không chạm cung)
    txt('THANG ĐỊNH GIÁ CON SỐ', 0, -145, 28, PR.greyD, { align: 'center', weight: 800 });

    // Vòng cung đo (bán kính R = 175, tâm tại (0, 65) -> đỉnh cung tại 65 - 175 = -110)
    const py = 65, R = 175;
    ctx.save();
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    // Cung nền xám từ PI (trái) đến 0 (phải)
    ctx.strokeStyle = '#e2ded5';
    ctx.beginPath();
    ctx.arc(0, py, R, Math.PI, 0, false);
    ctx.stroke();

    // Đoạn neo đỏ ở phía giá cao (từ -0.35*PI đến 0)
    ctx.strokeStyle = PR.red;
    ctx.beginPath();
    ctx.arc(0, py, R, -0.35 * Math.PI, 0, false);
    ctx.stroke();
    ctx.restore();

    // Nhãn 2 đầu mốc
    txt('0đ', -200, 110, 30, PR.greyD, { align: 'center', weight: 700 });
    txt('500.000đ', 200, 110, 32, PR.red, { align: 'center', weight: 800 });

    // Kim chỉ: quét từ -Math.PI (trái, 0đ) qua -Math.PI/2 (thẳng đứng) đến 0 (phải, 500k)
    const ang = -Math.PI + clamp(value) * Math.PI;
    ctx.save();
    ctx.translate(0, py);
    ctx.rotate(ang);
    // Vẽ kim dài 165px theo hướng trục x dương
    pp(pR(-12, -8, 175, 16, 8), PR.char, { key: key + 'needle', shadow: false, tex: 0.3 });
    pp(pE(0, 0, 26, 26), PR.navy, { key: key + 'pin', sb: 6, sy: 3, tex: 0.3 });
    ctx.restore();
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Món hàng xuất hiện ngay frame 0 cùng thẻ giá 500k, sau đó thẻ 300k xuất hiện
  const t500 = VW('hook', 'năm').t0, t300 = VW('hook', 'ba').t0, tHoi = VW('hook', 'hời').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 2, 15, 'clk1');

  // Hero: Món hàng (túi xách cao cấp) hiện diện từ frame 0 (t = 0)
  m11Item(CX, 690, 1.05, 'hook_bag');

  // Dây treo thẻ giá nối từ thân túi ra thẻ
  ctx.save();
  ctx.strokeStyle = '#c8a870';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(480, 770);
  ctx.lineTo(350, 890);
  if (TT >= t300) {
    ctx.moveTo(600, 770);
    ctx.lineTo(730, 890);
  }
  ctx.stroke();
  ctx.restore();

  // Thẻ giá 500.000đ (treo trên túi từ frame 0, bị gạch khi giá 300k xuất hiện)
  withT(350, 930, -0.05, 1, () => {
    m11Tag(0, 0, '500.000đ', TT >= t300, false, 'tag500');
  });

  // Thẻ giá 300.000đ (xuất hiện tạo cảm giác "hời")
  const k2 = popS(t300);
  if (k2 > 0.01) withT(730, 930, 0.04, k2, () => {
    m11Tag(0, 0, '300.000đ', false, true, 'tag300');
  });

  // Stamp "MÓN HỜI?"
  if (TT >= tHoi) {
    prStamp('MÓN HỜI?', CX, 1140, PR.red, tHoi, { rot: -0.06, size: 52, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT < tHoi ? 'neutral' : 'wow', look: -25, key: 'b1' });
  prSign('TẠI SAO TRÔNG NHƯ MÓN HỜI?', { kicker: KICK });
  prChips();
};

SCENES.explain = () => {   // S2: Con số đầu tiên trở thành mỏ neo cắm chặt tâm trí
  const tNeo = VW('explain', 'neo').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Khối mốc neo lớn (có sẵn từ frame 0, không pop để tránh frame trống)
  withT(CX, 660, 0, 1, () => {
    pp(pR(-360, -150, 720, 300, 24), PR.paperW, { key: 'frame_bg', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-330, -120, 660, 240, 16), '#fff2e2', { shadow: false, tex: 0.3 });
    txt('CON SỐ ĐẦU TIÊN (MỐC NEO)', -60, -65, 32, PR.orange, { align: 'center', weight: 800 });
    txt('500.000đ', -60, 30, 84, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  // Chiếc mỏ neo cắm ở mạn phải của khối số (không đè lên chữ 500.000đ)
  withT(CX + 270, 650, 0.1, popS(E0 + 0.15), () => {
    m11Anchor(0, 0, 0.95, 'anc_explain');
  });

  // Banner HIỆU ỨNG NEO
  const kNeo = popS(tNeo);
  if (kNeo > 0.01) withT(CX, 1020, -0.02, kNeo, () => {
    pp(pR(-320, -75, 640, 150, 22), PR.navy, { key: 'neo_card', sb: 16, sy: 8, tex: 0.45 });
    txt('HIỆU ỨNG NEO', 0, -15, 48, PR.creamL, { align: 'center', weight: 800 });
    txt('(ANCHORING BIAS)', 0, 38, 24, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('HIỆU ỨNG NEO', { kicker: KICK });
  prChips();
};

SCENES.mechanism = () => {   // S3a: Thang đánh giá con số bị mỏ neo kéo lệch về 500k
  const tInf = VW('mechanism', 'ảnh').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 4, 30, 'clk3');

  // Đồng hồ định giá lớn với kim chỉ rõ ràng nghiêng về phía 500k (value = 0.84)
  withT(CX, 720, 0, 1, () => {
    m11Dial(0, 0, 0.84, 'mech_dial');
  });

  // Chiếc mỏ neo cắm ở góc trên bên phải kéo kim về 500k (không đè lên chữ 500.000đ)
  withT(CX + 260, 580, 0.14, popS(E0 + 0.15), () => {
    m11Anchor(0, 0, 0.82, 'anc_mech');
  });

  // Dây xích nối từ mỏ neo vào kim
  ctx.save();
  ctx.strokeStyle = PR.char;
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(CX + 140, 715);
  ctx.lineTo(CX + 240, 620);
  ctx.stroke();
  ctx.restore();

  // Nhãn giải thích hiện khi nói đến "ảnh hưởng"
  withT(CX, 1070, 0, popS(tInf), () => {
    pp(pR(-380, -60, 760, 120, 20), PR.paperW, { key: 'inf_note', sb: 12, sy: 6, tex: 0.4 });
    txt('BỊ ẢNH HƯỞNG BỞI CON SỐ ĐẦU TIÊN', 0, 0, fitSize('BỊ ẢNH HƯỞNG BỞI CON SỐ ĐẦU TIÊN', 700, 32), PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'wow', look: -30, key: 'b3' });
  prSign('BỊ HÚT VÀO CON SỐ ĐẦU TIÊN', { kicker: KICK });
  prChips();
};

SCENES.mechanism2 = () => {   // S3b: So sánh mốc ban đầu với giá hợp lý (SPLIT)
  const tMoc = VW('mechanism', 'mốc').t0, tHop = VW('mechanism', 'hợp').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 410, 28, PR.mustard);
  prStar(930, 430, 24, PR.pink);

  // Khung chứa hai mốc so sánh (đối xứng quanh 540: 350 và 730, hiện diện từ cut)
  withT(350, 760, -0.015, 1, () => {
    pp(pR(-170, -220, 340, 440, 20), PR.paperW, { key: 'moc_card', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-150, -200, 300, 60, 12), '#fff0e0', { shadow: false, tex: 0.3 });
    txt('MỐC BAN ĐẦU', 0, -170, 28, PR.orange, { align: 'center', base: 'middle', weight: 800 });
    m11Tag(0, -30, '500.000đ', false, false, 'tag_moc', 0.9);
    txt('Làm thước đo so sánh', 0, 100, fitSize('Làm thước đo so sánh', 280, 26), PR.char, { align: 'center', weight: 700 });
    txt('(Neo tâm lý)', 0, 140, 22, PR.greyD, { align: 'center', weight: 600 });
  });

  withT(730, 760, 0.015, 1, () => {
    pp(pR(-170, -220, 340, 440, 20), PR.paperW, { key: 'real_card', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-150, -200, 300, 60, 12), '#eaf2f8', { shadow: false, tex: 0.3 });
    txt('MỨC GIÁ HỢP LÝ?', 0, -170, 28, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    pp(pE(0, -30, 55, 55), '#f2f4f7', { key: 'q_circle', sb: 6, sy: 3, tex: 0.3 });
    txt('?', 0, -22, 56, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    txt('Chưa chắc đã hợp lý!', 0, 100, fitSize('Chưa chắc đã hợp lý!', 280, 26), TT >= tHop ? PR.red : PR.char, { align: 'center', weight: 800 });
    txt('(Cần đánh giá lại)', 0, 140, 22, PR.greyD, { align: 'center', weight: 600 });
  });

  // Stamp cảnh báo CHƯA CHẮC HỢP LÝ
  if (TT >= tHop) {
    prStamp('CHƯA CHẮC HỢP LÝ!', CX, 1100, PR.red, tHop, { rot: -0.04, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: TT >= tHop ? 'wow' : 'neutral', look: -25, key: 'b3b' });
  prSign('GIÁ BAN ĐẦU LÀM MỐC SO SÁNH', { kicker: KICK });
  prChips();
};

SCENES.broaden = () => {   // S4: Xuất hiện 3 lĩnh vực cụ thể (Mua sắm, Thương lượng, Ước lượng)
  const tShop = VW('broaden', 'sắm').t0, tNego = VW('broaden', 'thương').t0, tEst = VW('broaden', 'ước').t0;
  prWall(TEAL, { streak: 440, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  // Khung bảng đỡ 3 cột (rõ ràng, có sẵn từ frame 0, rộng 880px)
  withT(CX, 820, 0, 1, () => {
    pp(pR(-440, -270, 880, 540, 24), PR.paperW, { key: 'brd_shelf', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-420, -250, 840, 68, 14), PR.navy, { key: 'brd_header', shadow: false, tex: 0.3 });
    txt('3 LĨNH VỰC BỊ ẢNH HƯỞNG NEO', 0, -216, 32, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  // 3 cột đối xứng: tâm 260, 540, 820 (chiều rộng mỗi thẻ 240px)
  const cols = [
    { title: 'MUA SẮM', sub: 'Giá niêm yết', t: tShop, col: PR.red, cx: 260 },
    { title: 'THƯƠNG LƯỢNG', sub: 'Mức đề xuất', t: tNego, col: PR.orange, cx: 540 },
    { title: 'ƯỚC LƯỢNG', sub: 'Số dự đoán', t: tEst, col: PR.navy, cx: 820 }
  ];

  cols.forEach((c, i) => {
    const k = popS(c.t);
    if (k <= 0.01) return;
    withT(c.cx, 845, (i - 1) * 0.015, k, () => {
      pp(pR(-120, -200, 240, 400, 16), '#f9f8f5', { key: 'col' + i, sb: 10, sy: 5, tex: 0.4 });
      pp(pR(-120, -200, 240, 64, 16), c.col, { key: 'colh' + i, shadow: false, tex: 0.3 });
      txt(c.title, 0, -168, fitSize(c.title, 210, 28), PR.creamL, { align: 'center', base: 'middle', weight: 800 });

      // Hình minh họa cụ thể cho từng cột
      if (i === 0) {
        // Mua sắm: Thẻ giảm giá 500k gạch chéo -> 300k
        m11Tag(0, -35, '500k', true, false, 'tag_col0', 0.65);
        m11Tag(0, 50, '300k', false, true, 'tag_col0b', 0.65);
      } else if (i === 1) {
        // Thương lượng: Cặp tài liệu đề xuất mức lương
        pp(pR(-65, -55, 130, 105, 12), '#a76a38', { key: 'briefcase', sb: 8, sy: 4, tex: 0.4 });
        pp(pR(-20, -75, 40, 20, 4), '#7a4b22', { shadow: false, tex: false });
        pp(pR(-50, 70, 100, 32, 8), '#fff0e0', { key: 'offer_tag', sb: 4, sy: 2, tex: 0.3 });
        txt('Lương đầu', 0, 86, fitSize('Lương đầu', 90, 18), PR.char, { align: 'center', base: 'middle', weight: 800 });
      } else {
        // Ước lượng: Biểu đồ cột dự đoán số liệu
        pp(pR(-65, -55, 130, 120, 10), '#eaf2f8', { key: 'chart_box', sb: 8, sy: 4, tex: 0.4 });
        for (let b = 0; b < 3; b++) {
          const bh = 28 + b * 24;
          pp(pR(-45 + b * 34, 45 - bh, 24, bh, 4), PR.navy, { shadow: false, tex: 0.3 });
        }
      }

      txt(c.sub, 0, 150, fitSize(c.sub, 200, 24), PR.char, { align: 'center', base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b4' });
  prSign('XUẤT HIỆN Ở NHIỀU NƠI', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5a: Tự hỏi bản thân trước khi quyết định
  const tAsk = VW('reframe', 'hỏi').t0;
  prWall(TEAL2, { streak: 370, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // Cuốn sổ phản tỉnh (có sẵn từ cut frame 0)
  withT(CX, 760, 0, 1, () => {
    pp(pR(-370, -220, 740, 440, 24), PR.paperW, { key: 'ref_book', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-350, -200, 700, 70, 14), PR.navy, { key: 'ref_h', shadow: false, tex: 0.3 });
    txt('TRƯỚC KHI QUYẾT ĐỊNH', 0, -165, 34, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Biểu tượng tạm dừng một nhịp
    pp(pE(0, -10, 60, 60), '#fff0e0', { key: 'pause_bg', sb: 6, sy: 3, tex: 0.3 });
    pp(pR(-18, -35, 12, 50, 4), PR.orange, { shadow: false, tex: false });
    pp(pR(6, -35, 12, 50, 4), PR.orange, { shadow: false, tex: false });

    txt('HÃY TỰ HỎI BẢN THÂN', 0, 95, 36, TT >= tAsk ? PR.red : PR.char, { align: 'center', weight: 800 });
    txt('Tạm dừng một nhịp trước con số đầu tiên', 0, 150, 26, PR.greyD, { align: 'center', weight: 600 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'neutral', look: -25, key: 'b5' });
  prSign('TRƯỚC KHI QUYẾT ĐỊNH', { kicker: KICK });
  prChips();
};

SCENES.reframe2 = () => {   // S5b: Tách rời mốc ban đầu để đánh giá độc lập (SPLIT)
  const tDanh = VW('reframe', 'đánh').t0;
  prWall(TEAL, { streak: 410, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 400, 30, PR.mustard);
  prStar(910, 430, 26, PR.pink);

  // Khung câu hỏi suy ngẫm (có sẵn từ cut frame 0)
  withT(CX, 760, 0, 1, () => {
    pp(pR(-380, -240, 760, 480, 24), PR.paperW, { key: 'ref2_box', sb: 16, sy: 8, tex: 0.45 });

    txt('NẾU CHƯA TỪNG NHÌN THẤY', 0, -165, fitSize('NẾU CHƯA TỪNG NHÌN THẤY', 680, 32), PR.greyD, { align: 'center', weight: 800 });
    txt('CON SỐ ĐẦU TIÊN...', 0, -110, fitSize('CON SỐ ĐẦU TIÊN...', 680, 40), PR.red, { align: 'center', weight: 800 });

    // Thẻ giá ban đầu bị gạch chéo
    m11Tag(0, -10, '500.000đ', true, false, 'tag_ref2', 0.9);

    txt('Mình sẽ đánh giá lựa chọn này thế nào?', 0, 140, fitSize('Mình sẽ đánh giá lựa chọn này thế nào?', 680, 32), PR.navy, { align: 'center', weight: 800 });
  });

  // Stamp "ĐÁNH GIÁ ĐỘC LẬP" (đặt an toàn ở y = 1120, from: 1.3 không văng vào vùng safe)
  if (TT >= tDanh) {
    prStamp('ĐÁNH GIÁ ĐỘC LẬP', CX, 1120, PR.green, tDanh, { rot: -0.03, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tDanh ? 'happy' : 'neutral', look: -25, key: 'b5b' });
  prSign('ĐÁNH GIÁ ĐỘC LẬP', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn từng mua đồ chỉ vì giảm giá sâu chưa?
  const tChua = VW('cta', 'chưa').t0;
  prWall(TEAL2, { streak: 390, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prClock(960, 560, 60, 10, 0, 'clk6');

  // Món đồ minh họa việc "giảm giá rất sâu" có sẵn từ frame 0 (t = 0)
  withT(CX, 610, -0.02, 1, () => {
    // Chiếc túi trên bục trưng bày
    m11Item(0, 0, 0.88, 'cta_bag');
    // Hai thẻ giá treo hai bên: 500k bị gạch chéo -> 150k giảm sâu
    m11Tag(-160, 40, '500k', true, false, 'cta_tag1', 0.7);
    m11Tag(160, 40, '150k', false, true, 'cta_tag2', 0.7);
    // Banner giảm giá sâu
    pp(pR(-180, 150, 360, 46, 12), PR.red, { key: 'cta_sale_tag', sb: 6, sy: 3 });
    txt('GIẢM GIÁ SÂU · MÓN HỜI?', 0, 173, fitSize('GIẢM GIÁ SÂU · MÓN HỜI?', 330, 24), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  // Hộp bình luận chỉ xuất hiện và gõ chữ khi giọng nói dứt câu hỏi ("chưa?")
  const kCbox = popS(tChua);
  if (kCbox > 0.01) {
    withT(CX, 890, 0, kCbox, () => {
      prCommentBox(0, 0, 'KỂ TRẢI NGHIỆM CỦA BẠN', tChua, { hint: 'Bạn từng mua vì giảm sâu chưa?…' });
    });
  }

  // 2 bình luận minh họa xuất hiện sau khi hộp bình luận mở
  [0, 1].forEach((i) => {
    const kCmt = popS(tChua + 0.35 + i * 0.25);
    if (kCmt > 0.01) {
      withT(CX, 1060 + i * 140, i ? 0.015 : -0.015, kCmt, () => {
        pp(pR(-340, -50, 680, 100, 20), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
        pp(pE(-270, 0, 32, 32), [PR.orange, PR.blue][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
        pp(pR(-210, -18, 380 - i * 60, 14, 7), PR.cream, { shadow: false, tex: 0.3 });
        pp(pR(-210, 10, 260 + i * 40, 14, 7), PR.cream, { shadow: false, tex: 0.3 });
      });
    }
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN TỪNG BỊ DÍNH NEO CHƯA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['mechanism', 'giá', 1, 'mechanism2'],
  ['reframe', 'nếu', 0, 'reframe2'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'năm').t0 });
  cues.push({ k: 'pop', t: VW('hook', 'ba').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'hời').t0 });
  cues.push({ k: 'chime', t: VW('explain', 'neo').t0 });
  cues.push({ k: 'tick', t: VW('mechanism', 'ảnh').t0 });
  cues.push({ k: 'thud', t: VW('mechanism', 'giá', 1).t0 });
  cues.push({ k: 'tick', t: VW('mechanism', 'hợp').t0 });
  cues.push({ k: 'pop', t: VW('broaden', 'sắm').t0 });
  cues.push({ k: 'pop', t: VW('broaden', 'thương').t0 });
  cues.push({ k: 'pop', t: VW('broaden', 'ước').t0 });
  cues.push({ k: 'tick', t: VW('reframe', 'hỏi').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'đánh').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'chưa').t0 });
  return cues;
}

const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const ERA_BG = ERA_LIST.map(() => TEAL);
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
