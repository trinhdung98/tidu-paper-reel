// =====================================================================
//  TIDU MIND 12 — "Một điểm tốt không có nghĩa mọi thứ đều tốt"
//  Hiệu ứng hào quang (Halo Effect) — Tâm lý xã hội.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · TÂM LÝ XÃ HỘI';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const GOLD = '#f5c542';

const SCENES = {};

// Helper: vẽ vòng hào quang giấy (paper halo glow)
function m12Halo(cx, cy, r, alpha = 1) {
  if (alpha <= 0.01) return;
  ctx.save();
  const n = 12;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    const r1 = r * 0.72, r2 = r * 1.25;
    ctx.strokeStyle = `rgba(255, 230, 110, ${0.45 * alpha})`;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }
  ctx.strokeStyle = `rgba(245, 197, 66, ${0.9 * alpha})`;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

// Helper: vẽ nhân vật thuyết trình tại bục gỗ vững chãi
function m12Presenter(cx, cy, s = 1, key = 'pres') {
  withT(cx, cy, 0, s, () => {
    // Bục thuyết trình gỗ lớn đứng trên sàn
    pp(pR(-180, 20, 360, 420, 14), PR.wood, { key: key + 'pod', sb: 14, sy: 7, tex: 0.55 });
    pp(pR(-150, 50, 300, 340, 10), PR.woodD, { shadow: false, tex: 0.45 });
    pp(pR(-200, -10, 400, 36, 8), PR.woodL, { key: key + 'top', sb: 8, sy: 4, tex: 0.5 });

    // Micro cổ ngỗng
    ctx.save();
    ctx.strokeStyle = PR.char;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-70, 0);
    ctx.quadraticCurveTo(-80, -50, -40, -60);
    ctx.stroke();
    ctx.restore();
    pp(pE(-40, -60, 14, 14), PR.greyD, { shadow: false });

    // Thân áo vest lịch sự sau bục
    pp(pG([[-100, 0], [100, 0], [80, -140], [-80, -140]]), PR.navy, { key: key + 'suit', sb: 10, sy: 5, tex: 0.4 });
    pp(pG([[-30, -140], [0, -60], [30, -140]]), PR.paperW, { shadow: false });
    pp(pG([[-14, -100], [0, -25], [14, -100]]), PR.red, { shadow: false }); // Cà vạt đỏ

    // Khuôn mặt & tóc
    pp(pE(0, -200, 60, 64), '#f3d3b3', { key: key + 'face', sb: 10, sy: 5, tex: 0.4 });
    pp(() => ctx.ellipse(0, -235, 68, 48, 0, Math.PI, TAU), PR.char, { shadow: false });

    // Mắt tự tin & nụ cười
    pp(pE(-20, -205, 6, 6), PR.char, { shadow: false });
    pp(pE(20, -205, 6, 6), PR.char, { shadow: false });
    ctx.save();
    ctx.strokeStyle = PR.char;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, -188, 16, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ctx.restore();

    // Bàn tay cử chỉ tự tin
    pp(pE(130, -40, 24, 24), '#f3d3b3', { key: key + 'hand', sb: 6, sy: 3 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Người nói chuyện tự tin có chắc cũng là người rất giỏi?
  const tTin = VW('hook', 'tin').t0, tGioi = VW('hook', 'giỏi').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  prStar(140, 400, 30, PR.mustard);
  prStar(940, 420, 24, PR.pink);
  prClock(920, 480, 48, 3, 0, 'clk1');

  // Nhân vật thuyết trình tự tin tại bục gỗ lớn (thumbnail t=0 có sẵn)
  m12Presenter(CX, 980, 1.15, 'pres1');

  // Bong bóng nói xuất hiện khi nói "tự tin"
  if (TT >= tTin) {
    withT(CX, 530, 0, popS(tTin), () => {
      pp(pR(-210, -55, 420, 110, 24), PR.paperW, { key: 'say_bg', sb: 12, sy: 6, tex: 0.4 });
      txt('NÓI CHUYỆN TỰ TIN', 0, 8, fitSize('NÓI CHUYỆN TỰ TIN', 370, 36), PR.navy, { align: 'center', base: 'middle', weight: 800 });
    });
  }

  // Dấu hỏi / tem nghi vấn khi nói "rất giỏi?"
  if (TT >= tGioi) {
    prStamp('RẤT GIỎI?', CX, 1080, PR.red, tGioi, { rot: -0.04, size: 52, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: TT >= tGioi ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('TỰ TIN CÓ BẰNG RẤT GIỎI?', { kicker: KICK });
  prChips();
};

SCENES.explain = () => {   // S2: Không nhất thiết. Trong tâm lý học có hiệu ứng hào quang.
  const tHalo = VW('explain', 'quang').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prStar(140, 390, 28, PR.mustard);
  prStar(930, 410, 26, PR.orange);
  prClock(920, 480, 48, 3, 30, 'clk2');

  // Thẻ "KHÔNG NHẤT THIẾT"
  withT(CX, 510, 0, 1, () => {
    pp(pR(-260, -50, 520, 100, 20), PR.creamL, { key: 'not_nec', sb: 14, sy: 7, tex: 0.45 });
    txt('KHÔNG NHẤT THIẾT', 0, 7, fitSize('KHÔNG NHẤT THIẾT', 460, 42), PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  // Tấm bảng chân dung người có hào quang phát sáng (có mặt ngay từ cut)
  withT(CX, 950, 0, 1, () => {
    // Khung bảng xanh đậm
    pp(pR(-280, -250, 560, 500, 24), PR.navy, { key: 'halo_panel', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-250, -220, 500, 350, 16), '#1e3345', { shadow: false, tex: 0.3 });

    // Hào quang vàng rực rỡ tỏa ra trên từ "quang"
    const hAlpha = ev(tHalo, 0.4);
    if (hAlpha > 0.01) m12Halo(0, -70, 125, hAlpha);

    // Chân dung nhân vật phong cách giấy với nét mặt
    pp(pG([[-75, 80], [75, 80], [60, -20], [-60, -20]]), PR.paperW, { key: 'p_suit', shadow: false, tex: 0.4 });
    pp(pG([[-12, 0], [0, 60], [12, 0]]), PR.red, { shadow: false });
    pp(pE(0, -70, 52, 56), '#f3d3b3', { key: 'p_face', sb: 8, sy: 4, tex: 0.35 });
    pp(() => ctx.ellipse(0, -100, 58, 42, 0, Math.PI, TAU), PR.char, { shadow: false });
    pp(pE(-16, -75, 5, 5), PR.char, { shadow: false });
    pp(pE(16, -75, 5, 5), PR.char, { shadow: false });
    ctx.save();
    ctx.strokeStyle = PR.char;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, -60, 14, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ctx.restore();

    // Nhãn hiệu ứng hào quang
    pp(pR(-240, 155, 480, 66, 14), GOLD, { key: 'hl_lbl', sb: 8, sy: 4, tex: 0.4 });
    txt('HIỆU ỨNG HÀO QUANG', 0, 190, fitSize('HIỆU ỨNG HÀO QUANG', 430, 34), PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b2' });
  prSign('HIỆU ỨNG HÀO QUANG', { kicker: KICK });
  prChips();
};

SCENES.mechanism = () => {   // S3: Một ấn tượng nổi bật ảnh hưởng cách đánh giá các đặc điểm khác
  const tAnh = VW('mechanism', 'ảnh').t0, tDac = VW('mechanism', 'đặc').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb3', sb: 10, sy: 5, tex: 0.6 });

  prStar(140, 400, 28, PR.pink);
  prClock(920, 450, 48, 4, 15, 'clk3');

  // Hồ sơ đánh giá (Clipboard) - có mặt đầy đủ từ cut
  withT(CX, 870, 0, 1, () => {
    // Đế kẹp gỗ
    pp(pR(-330, -360, 660, 720, 24), PR.wood, { key: 'board', sb: 18, sy: 9, tex: 0.55 });
    // Tờ giấy hồ sơ
    pp(pR(-300, -330, 600, 660, 16), PR.paperW, { key: 'paper', sb: 10, sy: 5, tex: 0.4 });
    // Kẹp kim loại ở trên
    pp(pR(-110, -360, 220, 56, 12), PR.char, { key: 'clip', sb: 8, sy: 4, tex: 0.3 });
    pp(pE(0, -355, 20, 20), PR.paperW, { shadow: false });

    // Khối 1: Ấn tượng ban đầu nổi bật
    pp(pR(-260, -270, 520, 110, 16), '#fff3d1', { key: 'top_box', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(-250, -255, 12, 80, 6), GOLD, { shadow: false });
    txt('ẤN TƯỢNG BAN ĐẦU', -220, -230, fitSize('ẤN TƯỢNG BAN ĐẦU', 250, 30), PR.orange, { weight: 800 });
    txt('TỰ TIN · NỔI BẬT', -220, -190, fitSize('TỰ TIN · NỔI BẬT', 250, 26), PR.navy, { weight: 700 });
    for (let s = 0; s < 5; s++) {
      prStar(100 + s * 34, -215, 14, GOLD);
    }

    // Các mũi tên hào quang lan tỏa xuống dưới
    if (TT >= tAnh) {
      ctx.save();
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      [-120, 0, 120].forEach((dx) => {
        ctx.moveTo(dx, -145);
        ctx.lineTo(dx, -95);
        ctx.moveTo(dx - 12, -107);
        ctx.lineTo(dx, -95);
        ctx.lineTo(dx + 12, -107);
      });
      ctx.stroke();
      ctx.restore();
    }

    // 3 đặc điểm khác bị kéo theo đánh giá
    const rows = [
      { name: 'NĂNG LỰC CHUYÊN MÔN', col: PR.navy },
      { name: 'MỨC ĐỘ ĐÁNG TIN CẬY', col: PR.green },
      { name: 'TÍNH CÁCH CON NGƯỜI', col: PR.plum },
    ];
    rows.forEach((r, i) => {
      const y = -60 + i * 115;
      const isLit = TT >= tDac;
      pp(pR(-260, y, 520, 90, 14), isLit ? '#faf6ec' : PR.creamL, { key: 'row' + i, sb: 6, sy: 3, tex: 0.35 });
      pp(pR(-250, y + 15, 10, 60, 5), isLit ? GOLD : r.col, { shadow: false });
      txt(r.name, -225, y + 47, fitSize(r.name, 310, 26), PR.char, { base: 'middle', weight: 800 });
      if (isLit) {
        pp(pR(105, y + 20, 140, 50, 10), '#fdf2cc', { shadow: false });
        txt('BỊ KÉO THEO', 175, y + 46, 20, PR.orange, { align: 'center', base: 'middle', weight: 800 });
      }
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT < tDac ? 'neutral' : 'flat', look: -30, key: 'b3' });
  prSign('MỘT ĐIỂM SÁNG ẢNH HƯỞNG TẤT CẢ', { kicker: KICK });
  prChips();
};

SCENES.mechanism2 = () => {   // S4: Người ăn mặc chỉnh chu được xem đáng tin hơn, dù chưa đủ chứng minh
  const tTin = VW('mechanism', 'tin').t0, tChung = VW('mechanism', 'chứng').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prStar(140, 400, 30, PR.mustard);
  prStar(940, 420, 24, PR.pink);
  prClock(920, 470, 48, 4, 30, 'clk4');

  // Cặp thẻ cân xứng: tâm 340 và 740 (trung điểm 540)
  // Thẻ trái (340): Vẻ ngoài chỉnh chu (có sẵn từ cut)
  withT(340, 830, -0.015, 1, () => {
    pp(pR(-170, -240, 340, 480, 20), PR.paperW, { key: 'suit_card', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-150, -220, 300, 50, 10), PR.navy, { shadow: false });
    txt('ĂN MẶC CHỈNH CHU', 0, -194, fitSize('ĂN MẶC CHỈNH CHU', 270, 26), PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Áo vest chỉnh chu
    pp(pG([[-90, 70], [90, 70], [70, -120], [-70, -120]]), PR.navy, { key: 'man_suit', sb: 10, sy: 5, tex: 0.4 });
    pp(pG([[-28, -120], [0, -40], [28, -120]]), PR.paperW, { shadow: false });
    pp(pG([[-12, -90], [0, 5], [12, -90]]), PR.red, { shadow: false }); // Cà vạt
    pp(pG([[40, -50], [55, -68], [65, -50]]), PR.mustard, { shadow: false }); // Khăn túi
  });

  if (TT >= tTin) {
    prStamp('ĐÁNG TIN HƠN?', 340, 960, PR.green, tTin, { rot: -0.04, size: 34, from: 1.3 });
  }

  // Thẻ phải (740): Bằng chứng năng lực thực tế (có sẵn từ cut)
  withT(740, 830, 0.015, 1, () => {
    pp(pR(-170, -240, 340, 480, 20), PR.paperW, { key: 'ev_card', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-150, -220, 300, 50, 10), PR.brown, { shadow: false });
    txt('BẰNG CHỨNG THỰC TẾ', 0, -194, fitSize('BẰNG CHỨNG THỰC TẾ', 270, 24), PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Hai mục kiểm chứng: Năng lực & Tính cách
    const checks = [
      { label: 'NĂNG LỰC CHUYÊN MÔN', y: -90 },
      { label: 'TÍNH CÁCH CON NGƯỜI', y: 20 },
    ];
    checks.forEach((ck) => {
      pp(pR(-145, ck.y, 290, 80, 12), PR.creamL, { key: 'ck' + ck.y, sb: 6, sy: 3 });
      txt(ck.label, -135, ck.y + 42, fitSize(ck.label, 170, 18), PR.char, { base: 'middle', weight: 800 });
      pp(pE(115, ck.y + 40, 22, 22), PR.cream, { shadow: false });
      txt('?', 115, ck.y + 42, 20, PR.greyD, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  if (TT >= tChung) {
    prStamp('CHƯA ĐỦ CHỨNG MINH', 740, 960, PR.red, tChung, { rot: 0.05, size: 30, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT < tChung ? 'neutral' : 'wow', look: -30, key: 'b4' });
  prSign('VẺ NGOÀI VÀ NĂNG LỰC THỰC TẾ', { kicker: KICK });
  prChips();
};

SCENES.notice = () => {   // S5: Điều này không có nghĩa ấn tượng đầu tiên luôn sai
  const tSai = VW('notice', 'sai').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb5', sb: 10, sy: 5, tex: 0.6 });

  prStar(140, 390, 30, PR.mustard);
  prStar(930, 410, 26, PR.orange);
  prClock(920, 480, 48, 5, 0, 'clk5');

  // Khung ảnh Polaroid minh họa ấn tượng ban đầu (có sẵn từ cut)
  withT(CX, 780, 0, 1, () => {
    pp(pR(-280, -250, 560, 500, 20), PR.paperW, { key: 'polaroid', sb: 16, sy: 8, tex: 0.45 });
    // Ô ảnh xám xanh bên trong
    pp(pR(-245, -220, 490, 330, 12), '#2a4848', { key: 'pol_inner', sb: 8, sy: 4, tex: 0.35 });

    // Hai người bắt tay gặp gỡ
    pp(pE(-80, -95, 38, 38), PR.creamL, { shadow: false });
    pp(pG([[-120, -50], [-40, -50], [-55, 30], [-105, 30]]), PR.blue, { shadow: false });
    pp(pE(80, -95, 38, 38), PR.creamL, { shadow: false });
    pp(pG([[40, -50], [120, -50], [105, 30], [55, 30]]), PR.mustard, { shadow: false });
    // Cánh tay bắt tay ở giữa
    ctx.save();
    ctx.strokeStyle = PR.creamL;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-45, -15);
    ctx.lineTo(0, 0);
    ctx.lineTo(45, -15);
    ctx.stroke();
    ctx.restore();

    // Nhãn ảnh Polaroid
    txt('ẤN TƯỢNG ĐẦU TIÊN', 0, 175, fitSize('ẤN TƯỢNG ĐẦU TIÊN', 440, 36), PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  // Con dấu "KHÔNG PHẢI LUÔN SAI" đóng chéo qua bức ảnh ở giữa
  if (TT >= tSai) {
    prStamp('KHÔNG PHẢI LUÔN SAI', CX, 720, PR.green, tSai, { rot: -0.05, size: 44, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -20, key: 'b5' });
  prSign('ẤN TƯỢNG ĐẦU TIÊN CÓ THỂ ĐÚNG', { kicker: KICK });
  prChips();
};

SCENES.notice2 = () => {   // S6: Nhưng nó nhắc chúng ta cần quan sát thêm
  const tQuan = VW('notice', 'quan').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prStar(150, 390, 30, PR.pink);
  prStar(920, 410, 28, PR.mustard);
  prClock(920, 480, 48, 5, 30, 'clk6');

  // Bảng theo dõi tiến trình quan sát (có sẵn từ cut)
  withT(CX, 810, 0, 1, () => {
    pp(pR(-310, -230, 620, 460, 22), PR.paperW, { key: 'obs_card', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-285, -205, 570, 50, 10), PR.navy, { shadow: false });
    txt('TIẾN TRÌNH QUAN SÁT', 0, -180, fitSize('TIẾN TRÌNH QUAN SÁT', 480, 28), PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Đường mốc thời gian
    pp(pR(-230, -35, 460, 8, 4), PR.greyD, { shadow: false });
    const stages = [
      { label: 'NGÀY 1', desc: 'Ấn tượng đầu', x: -160, col: PR.orange },
      { label: 'TUẦN 2', desc: 'Làm việc chung', x: 0, col: PR.blue },
      { label: 'DÀI HẠN', desc: 'Hiểu rõ thực tế', x: 160, col: PR.green },
    ];
    stages.forEach((st) => {
      pp(pE(st.x, -35, 22, 22), st.col, { key: 'st' + st.x, sb: 6, sy: 3 });
      txt(st.label, st.x, 20, 22, PR.char, { align: 'center', base: 'middle', weight: 800 });
      txt(st.desc, st.x, 52, 18, PR.greyD, { align: 'center', base: 'middle', weight: 700 });
    });

    pp(pR(-260, 115, 520, 75, 12), '#f0f5fa', { key: 'time_tag', sb: 6, sy: 3 });
    txt('THEO DÕI QUA NHIỀU TÌNH HUỐNG', 0, 154, fitSize('THEO DÕI QUA NHIỀU TÌNH HUỐNG', 470, 24), PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  // Kính lúp phóng đại
  withT(CX + 60, 780, -0.15, 1, () => {
    pp(pE(0, 0, 100, 100), 'rgba(255,255,255,0.85)', { key: 'lens', sb: 16, sy: 8, tex: 0.25 });
    ctx.save();
    ctx.strokeStyle = PR.char;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, TAU);
    ctx.stroke();
    ctx.restore();
    // Cán cầm gỗ
    ctx.save();
    ctx.strokeStyle = PR.wood;
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(70, 70);
    ctx.lineTo(150, 150);
    ctx.stroke();
    ctx.restore();
  });

  if (TT >= tQuan) {
    prStamp('CẦN QUAN SÁT THÊM', CX, 1150, PR.mustard, tQuan, { rot: -0.03, size: 42, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b6' });
  prSign('CẦN THỜI GIAN QUAN SÁT', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S7: Đánh giá sự tự tin, kiến thức và kết quả bằng bằng chứng riêng biệt
  const tTin = VW('reframe', 'tin').t0, tThuc = VW('reframe', 'thức').t0;
  const tQua = VW('reframe', 'quả').t0, tRieng = VW('reframe', 'riêng').t0;

  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb7', sb: 10, sy: 5, tex: 0.6 });

  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.pink);
  prClock(920, 480, 48, 6, 0, 'clk7');

  // 3 cột tách bạch: tâm 260, 540, 820 (rộng 250 mỗi cột, có sẵn từ cut)
  const cols = [
    { title: 'SỰ TỰ TIN', sub: 'Cách nói chuyện', col: PR.orange, x: 260, t: tTin, icon: 'mic' },
    { title: 'KIẾN THỨC', sub: 'Hiểu biết chiều sâu', col: PR.blue, x: 540, t: tThuc, icon: 'book' },
    { title: 'KẾT QUẢ', sub: 'Hiệu quả công việc', col: PR.green, x: 820, t: tQua, icon: 'chart' },
  ];

  cols.forEach((c, i) => {
    withT(c.x, 810, (i - 1) * 0.015, 1, () => {
      // Thẻ trắng
      pp(pR(-125, -240, 250, 480, 18), PR.paperW, { key: 'c_col' + i, sb: 14, sy: 7, tex: 0.45 });
      // Thanh tiêu đề trên
      pp(pR(-115, -225, 230, 54, 10), c.col, { shadow: false });
      txt(c.title, 0, -196, fitSize(c.title, 210, 23), PR.creamL, { align: 'center', base: 'middle', weight: 800 });

      // Biểu tượng cụ thể cho từng cột
      if (TT >= c.t) {
        if (c.icon === 'mic') {
          // Icon micro phong cách giấy
          pp(pR(-16, -100, 32, 60, 12), PR.orange, { key: 'ic_m' + i, sb: 6, sy: 3 });
          ctx.save();
          ctx.strokeStyle = PR.char;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(0, -75, 28, 0, Math.PI);
          ctx.stroke();
          ctx.moveTo(0, -47);
          ctx.lineTo(0, -25);
          ctx.moveTo(-18, -25);
          ctx.lineTo(18, -25);
          ctx.stroke();
          ctx.restore();
        } else if (c.icon === 'book') {
          // Icon quyển sách mở
          pp(pR(-45, -95, 42, 60, 4), PR.blue, { key: 'ic_bl' + i, sb: 6, sy: 3 });
          pp(pR(3, -95, 42, 60, 4), PR.blue, { key: 'ic_br' + i, sb: 6, sy: 3 });
          pp(pR(-40, -90, 35, 50, 2), PR.paperW, { shadow: false });
          pp(pR(5, -90, 35, 50, 2), PR.paperW, { shadow: false });
        } else if (c.icon === 'chart') {
          // Icon biểu đồ cột tăng tiến
          [[-36, 30, PR.green], [-8, 55, PR.green], [20, 75, PR.green]].forEach(([bx, bh, col], j) => {
            pp(pR(bx, -40 - bh, 22, bh, 4), col, { key: 'ic_b' + j, shadow: false });
          });
        }
      }

      // Nhãn mô tả bên dưới
      pp(pR(-110, 80, 220, 70, 10), '#f2f6fa', { key: 'c_sub' + i, sb: 4, sy: 2 });
      txt(c.sub, 0, 116, fitSize(c.sub, 200, 20), PR.char, { align: 'center', base: 'middle', weight: 800 });
      pp(pR(-70, 175, 140, 40, 8), PR.creamL, { shadow: false });
      txt('ĐỘC LẬP', 0, 196, 18, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  if (TT >= tRieng) {
    prStamp('BẰNG CHỨNG RIÊNG BIỆT', CX, 1160, GOLD, tRieng, { rot: -0.02, size: 40, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'happy', look: -20, key: 'b7' });
  prSign('ĐÁNH GIÁ BẰNG CHỨNG RIÊNG BIỆT', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S8: Bạn từng thay đổi ấn tượng về ai đó sau khi hiểu họ hơn chưa?
  const tChua = VW('cta', 'chưa').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(310);
  prStar(160, 420, 30, PR.mustard);
  prStar(920, 410, 26, PR.pink);
  prClock(920, 520, 48, 10, 0, 'clk8');

  // Hộp gõ bình luận của người xem
  prCommentBox(CX, 750, 'Từng nghĩ khó gần, sau lại rất tốt tính!', tChua, { hint: 'Bạn từng thay đổi ấn tượng chưa?…' });

  // Hai bình luận thực tế bên dưới
  const cmts = [
    { name: 'Minh Anh', text: 'Lúc đầu tưởng kiêu, làm chung mới biết rất nhiệt tình!', col: PR.green, y: 940 },
    { name: 'Huy Hoàng', text: 'Đúng thật, cần thời gian mới biết năng lực thực tế.', col: PR.orange, y: 1110 },
  ];
  cmts.forEach((cm, i) => {
    withT(CX, cm.y, i ? 0.012 : -0.012, popS(E0 + 0.2 + i * 0.25), () => {
      pp(pR(-330, -58, 660, 116, 20), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 34, 34), cm.col, { key: 'cav' + i, sb: 6, sy: 3 });
      txt(cm.name[0], -270, 2, 26, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt(cm.name, -220, -22, 22, PR.char, { weight: 800 });
      txt(cm.text, -220, 18, fitSize(cm.text, 500, 24), PR.greyD, { weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b8', look: -20 });
  prSign('BẠN TỪNG THAY ĐỔI ẤN TƯỢNG?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['mechanism', 'Một', 1, 'mechanism2'],
  ['notice', 'Nhưng', 0, 'notice2'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'tin').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'giỏi').t0 });
  cues.push({ k: 'chime', t: VW('explain', 'quang').t0 });
  cues.push({ k: 'pop', t: VW('mechanism', 'ảnh').t0 });
  cues.push({ k: 'pop', t: VW('mechanism', 'tin').t0 });
  cues.push({ k: 'thud', t: VW('mechanism', 'chứng').t0 });
  cues.push({ k: 'pop', t: VW('notice', 'sai').t0 });
  cues.push({ k: 'tick', t: VW('notice', 'quan').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'tin').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'thức').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'quả').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'riêng').t0 });
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
