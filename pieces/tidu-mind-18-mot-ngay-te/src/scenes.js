// =====================================================================
//  TIDU MIND 18 — "Một ngày tệ không có nghĩa cuộc sống của bạn tệ"
//  Bẫy khái quát hoá quá mức (Overgeneralization Distortion) — CBT.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · CẢM XÚC';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};

// ---- Helpers (m18 prefix) ----

function m18Room(c, studs) {
  prWall(c, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs });
  if (!studs) pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
}

function m18Tag(str, x, y, fill, k = 1, rot = 0, size = 30, o = {}) {
  if (k <= 0.01) return;
  const sz = fitSize(str, o.maxW ?? 560, size);
  const w = (o.w ?? (txtW(str, sz) + 48));
  const h = (o.h ?? (sz * 2));
  withT(x, y, rot, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, o.r ?? 12), fill, { key: 'tag' + str + x + y, sb: 10, sy: 5, tex: 0.45 });
    txt(str, 0, sz * 0.36, sz, o.color ?? PR.creamL, { align: 'center', weight: 800 });
  });
}

function m18Calendar(cx, cy, opts = {}) {
  const w = 680, h = 460;
  withT(cx, cy, 0, opts.k ?? 1, () => {
    // Hanging bar
    pp(pR(-w / 2, -h / 2, w, 40, 10), PR.woodD, { key: (opts.key ?? 'cal') + 'bar', sb: 12, sy: 6, tex: 0.5 });
    // Metal rings
    [-200, 200].forEach((rx, i) => {
      pp(pE(rx, -h / 2 + 8, 16, 24), PR.char, { key: (opts.key ?? 'cal') + 'ring' + i, shadow: false, tex: 0.3 });
      pp(pE(rx, -h / 2 + 8, 8, 14), PR.paperW, { shadow: false, tex: false });
    });
    // Main paper sheet
    pp(pR(-w / 2 + 16, -h / 2 + 32, w - 32, h - 42, 16), PR.paperW, { key: (opts.key ?? 'cal') + 'sheet', sb: 16, sy: 8, tex: 0.45 });
    // Header strip
    pp(pR(-w / 2 + 28, -h / 2 + 44, w - 56, 56, 10), opts.headColor ?? PR.navy, { shadow: false, tex: 0.4 });
    txt('THÁNG NÀY', 0, -h / 2 + 82, 28, PR.creamL, { align: 'center', weight: 800 });

    // Grid: 5 columns x 3 rows (days 1 to 15)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const day = r * 5 + c + 1;
        const x = -220 + c * 110;
        const y = -65 + r * 95;
        const isToday = (day === 8);
        const isFuture = (day > 8);

        let cellBg = '#f4f6fa';
        let numColor = PR.greyD;

        if (isToday) {
          cellBg = opts.highlightToday ? '#ffe0e0' : '#f4f6fa';
          numColor = opts.highlightToday ? PR.red : PR.navy;
        } else if (isFuture && opts.spreadAll) {
          cellBg = '#ffe8e8';
          numColor = PR.red;
        }

        pp(pR(x - 46, y - 38, 92, 76, 10), cellBg, { shadow: false });
        txt(String(day), x, y + 2, 24, numColor, { align: 'center', base: 'middle', weight: 700 });

        if (isToday && opts.highlightToday) {
          ctx.save();
          ctx.strokeStyle = PR.red;
          ctx.lineWidth = 3;
          ctx.strokeRect(x - 46, y - 38, 92, 76);
          ctx.restore();
          txt('HÔM NAY', x, y + 24, 12, PR.red, { align: 'center', weight: 800 });
        }
      }
    }

    if (opts.spreadAll) {
      // Chalk line connecting day 8 to future days
      ctx.save();
      ctx.strokeStyle = PR.red;
      ctx.lineWidth = 6;
      ctx.setLineDash([12, 8]);
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(210, 125);
      ctx.stroke();
      ctx.restore();
      pp(pG([[225, 132], [200, 135], [212, 110]]), PR.red, { shadow: false, tex: false });
    }
  });
}

function m18Clipboard(cx, cy, k = 1, opts = {}) {
  const w = 580, h = 420;
  withT(cx, cy, opts.rot ?? 0, k, () => {
    // Backing board
    pp(pR(-w / 2, -h / 2, w, h, 16), PR.woodD, { key: (opts.key ?? 'cb') + 'board', sb: 16, sy: 8, tex: 0.5 });
    // Clip at top
    pp(pR(-90, -h / 2 - 18, 180, 48, 10), PR.char, { key: (opts.key ?? 'cb') + 'clip', sb: 8, sy: 4, tex: 0.3 });
    pp(pE(0, -h / 2 - 4, 18, 18), PR.paperW, { shadow: false, tex: false });
    // White sheet
    pp(pR(-w / 2 + 24, -h / 2 + 24, w - 48, h - 48, 10), PR.paperW, { key: (opts.key ?? 'cb') + 'paper', sb: 12, sy: 6, tex: 0.45 });
    // Header
    txt('KẾT QUẢ PHỎNG VẤN', 0, -h / 2 + 66, 30, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-w / 2 + 50, -h / 2 + 88, w - 100, 4, 2), PR.char, { shadow: false, tex: false });

    // Rows (placed in upper half to leave lower half for stamp)
    txt('Vị trí ứng tuyển:', -w / 2 + 50, -h / 2 + 130, 22, PR.greyD, { weight: 700 });
    txt('Chuyên viên', w / 2 - 50, -h / 2 + 130, 22, PR.navy, { align: 'right', weight: 700 });

    txt('Đánh giá vòng 1:', -w / 2 + 50, -h / 2 + 175, 22, PR.greyD, { weight: 700 });
    txt('Chưa phù hợp', w / 2 - 50, -h / 2 + 175, 22, PR.red, { align: 'right', weight: 700 });

    // Dedicated blank stamp slot in lower half
    pp(pR(-180, 20, 360, 90, 10), '#fdf4f4', { shadow: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Hôm nay thất bại -> Sợ mãi mãi thất bại?
  const tBai = VW('hook', 'bại').t0, tMai = VW('hook', 'mãi').t0, tNghi = VW('hook', 'nghĩ').t0;
  m18Room(TEAL, false);
  prStar(140, 420, 30, PR.mustard);
  prClock(950, 440, 52, 9, 0, 'clk1');

  // Lịch treo tường xuất hiện ngay tại t=0 (frame 0 thumbnail)
  m18Calendar(CX, 680, { highlightToday: true, key: 'cal1' });

  // Dấu đỏ đóng dưới lịch
  prStamp('THẤT BẠI', CX, 970, PR.red, tBai, { rot: -0.04, size: 50, from: 1.3 });

  // Hộp suy nghĩ lo lắng
  withT(CX, 1160, 0, popS(tNghi), () => {
    pp(pR(-340, -55, 680, 110, 20), PR.paperW, { key: 'hk_th', sb: 12, sy: 6, tex: 0.45 });
    if (TT < tMai) {
      txt('...', 0, 8, 48, PR.grey, { align: 'center', base: 'middle', weight: 800 });
    } else {
      txt('MÌNH SẼ MÃI THẤT BẠI?', 0, 8, fitSize('MÌNH SẼ MÃI THẤT BẠI?', 600, 42), PR.redD, { align: 'center', base: 'middle', weight: 800 });
    }
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tMai ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('HÔM NAY TỆ = MÃI MÃI TỆ?', { kicker: KICK });
  prChips();
};

SCENES.overgeneralize = () => {   // S2: Lấy 1 trải nghiệm riêng lẻ để kết luận cả tương lai
  const tKet = VW('overgeneralize', 'kết').t0;
  m18Room(TEAL2, true);
  prStar(150, 410, 28, PR.mustard);
  prClock(950, 440, 52, 9, 15, 'clk2');

  // Cùng vị trí cy=680 để nhất quán với hook
  m18Calendar(CX, 680, { highlightToday: true, spreadAll: TT >= tKet, key: 'cal2' });

  // Hai nhãn đối chiếu đối xứng qua 540
  m18Tag('1 TRẢI NGHIỆM RIÊNG LẺ', 350, 1080, PR.navy, 1, 0, 26);
  m18Tag('KẾT LUẬN CẢ TƯƠNG LAI', 730, 1080, PR.red, popS(tKet), 0, 26);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'flat', look: -25, key: 'b2' });
  prSign('BẪY KHÁI QUÁT HOÁ', { kicker: KICK });
  prChips();
};

SCENES.interview = () => {   // S3: Một cuộc phỏng vấn không thành công -> "mình chẳng bao giờ tìm được việc"
  const tKhong = VW('overgeneralize', 'không').t0;
  const tSuy = VW('overgeneralize', 'suy').t0;
  const tMinh = VW('overgeneralize', 'mình').t0;
  m18Room(TEAL, false);
  prStar(140, 410, 30, PR.pink);
  prClock(950, 440, 52, 9, 20, 'clk_int');

  // Hồ sơ phỏng vấn có mặt ngay tại vết cắt
  m18Clipboard(CX, 660, 1, { key: 'cb1' });
  prStamp('CHƯA ĐẠT', CX, 725, PR.red, tKhong, { rot: -0.05, size: 46, from: 1.3 });

  // Đám mây suy nghĩ cực đoan chứa đúng câu nói của narration
  prThought(CX, 1080, 680, 260, 780, 1380, '', { t: tSuy, key: 'th_int' });
  if (TT >= tMinh) {
    withT(CX, 1080, 0, popS(tMinh), () => {
      txt('"mình chẳng bao giờ', 0, -26, fitSize('"mình chẳng bao giờ', 560, 42), PR.navy, { align: 'center', weight: 800 });
      txt('tìm được việc"', 0, 26, fitSize('tìm được việc"', 560, 46), PR.redD, { align: 'center', weight: 800 });
    });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'flat', look: -30, key: 'b_int' });
  prSign('MỘT LẦN PHỎNG VẤN', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // S4: Một kết quả chưa thể đại diện cho mọi khả năng
  const tDai = VW('reality', 'đại').t0;
  const tKha = VW('reality', 'khả').t0;
  m18Room(TEAL2, true);
  prStar(150, 410, 30, PR.mustard);
  prClock(950, 440, 52, 9, 30, 'clk3');

  // Cặp thẻ đối xứng 350 & 730, w=320, xuất hiện ngay tại vết cắt
  withT(350, 750, 0, 1, () => {
    pp(pR(-160, -220, 320, 440, 16), PR.paperW, { key: 'rc_left', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-160, -220, 320, 56, 12), PR.navy, { shadow: false });
    txt('1 KẾT QUẢ', 0, -182, 28, PR.creamL, { align: 'center', weight: 800 });

    pp(pR(-110, -100, 220, 170, 10), '#ffe8e8', { shadow: false });
    txt('Phỏng vấn', 0, -55, 24, PR.char, { align: 'center', weight: 700 });
    txt('lần này', 0, -20, 24, PR.char, { align: 'center', weight: 700 });
    txt('CHƯA TỐT', 0, 26, 28, PR.red, { align: 'center', weight: 800 });

    txt('Một sự kiện cụ thể', 0, 135, 22, PR.greyD, { align: 'center', weight: 700 });
  });

  withT(730, 750, 0, 1, () => {
    pp(pR(-160, -220, 320, 440, 16), PR.paperW, { key: 'rc_right', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-160, -220, 320, 56, 12), PR.green, { shadow: false });
    txt('MỌI KHẢ NĂNG', 0, -182, 28, PR.creamL, { align: 'center', weight: 800 });

    const opps = ['Cơ hội khác', 'Lần thử tới', 'Kinh nghiệm mới'];
    opps.forEach((op, i) => {
      const yy = -85 + i * 62;
      const kOp = popS(tKha + i * 0.15);
      if (kOp > 0.01) {
        withT(0, yy, 0, kOp, () => {
          pp(pR(-110, -24, 220, 48, 8), [PR.sky, PR.mustard, PR.tealL][i], { shadow: false, tex: 0.35 });
          txt(op, 0, 8, 22, PR.char, { align: 'center', weight: 800 });
        });
      }
    });

    txt('Tương lai rộng mở', 0, 135, 22, PR.green, { align: 'center', weight: 700 });
  });

  // Dấu khác biệt ở giữa
  m18Tag('≠', 540, 750, PR.char, 1, 0, 32, { w: 60, h: 60, r: 30 });

  // Nhãn kết luận ở dưới
  m18Tag('CHƯA THỂ ĐẠI DIỆN CHO TẤT CẢ', 540, 1120, PR.green, popS(tDai), 0, 30);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tKha ? 'wow' : 'neutral', look: -25, key: 'b3' });
  prSign('MỘT KẾT QUẢ ≠ TẤT CẢ', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Thay câu nói ấy bằng điều chính xác hơn
  const tThay = VW('reframe', 'thay').t0;
  const tChinh = VW('reframe', 'chính').t0;
  m18Room(TEAL, false);
  prStar(140, 410, 30, PR.mustard);
  prClock(950, 440, 52, 9, 35, 'clk4');

  // Bảng làm việc có mặt ngay tại vết cắt
  withT(CX, 750, 0, 1, () => {
    pp(pR(-360, -220, 720, 440, 16), PR.paperW, { key: 'ref_board', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-360, -220, 720, 56, 12), PR.navy, { shadow: false });
    txt('ĐIỀU CHỈNH CÂU NÓI', 0, -182, 28, PR.creamL, { align: 'center', weight: 800 });

    // Ô cũ cực đoan
    pp(pR(-300, -120, 600, 100, 12), '#ffe8e8', { shadow: false });
    txt('CÂU NÓI CỰC ĐOAN:', -260, -92, 22, PR.red, { weight: 800 });
    txt('"mình chẳng bao giờ tìm được việc"', 0, -50, fitSize('"mình chẳng bao giờ tìm được việc"', 520, 30), PR.char, { align: 'center', weight: 700 });

    // Ô mới đang chờ
    pp(pR(-300, 20, 600, 110, 12), '#f0f4f8', { shadow: false });
    txt('[ CÂU NÓI MỚI CHÍNH XÁC ]', 0, 85, 30, PR.greyD, { align: 'center', weight: 800 });
  });

  prCross(CX, 680, tThay, 54);
  m18Tag('TÌM CÂU NÓI CÔNG BẰNG HƠN', CX, 1140, PR.mustard, popS(tChinh), 0, 30);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'neutral', look: -25, key: 'b4' });
  prSign('THAY ĐỔI CÁCH TỰ ĐỐI THOẠI', { kicker: KICK });
  prChips();
};

SCENES.reframe2 = () => {   // S6: "cuộc phỏng vấn lần này chưa tốt, và mình cần xem lại phần chuẩn bị."
  const tCuoc = VW('reframe', 'cuộc').t0;
  const tChuanBi = VW('reframe', 'chuẩn').t0;
  const tBi = VW('reframe', 'bị').t0;
  m18Room(TEAL2, true);
  prStar(140, 410, 30, PR.pink);
  prClock(950, 440, 52, 9, 45, 'clk5');

  // Giữ nguyên vị trí cx=540, cy=750 để nhất quán qua cú cắt
  withT(CX, 750, 0, 1, () => {
    pp(pR(-360, -220, 720, 440, 16), PR.paperW, { key: 'ref_board2', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-360, -220, 720, 56, 12), PR.navy, { shadow: false });
    txt('ĐIỀU CHỈNH CÂU NÓI', 0, -182, 28, PR.creamL, { align: 'center', weight: 800 });

    // Ô cũ mờ đi
    ctx.save();
    ctx.globalAlpha = 0.4;
    pp(pR(-300, -120, 600, 90, 12), '#ffe8e8', { shadow: false });
    txt('"mình chẳng bao giờ tìm được việc"', 0, -65, 26, PR.char, { align: 'center', weight: 700 });
    ctx.restore();

    // Ô mới hiện rõ với lời dẫn chính xác từ voice
    withT(0, 55, 0, popS(tCuoc), () => {
      pp(pR(-310, -55, 620, 140, 12), '#eaf5ea', { key: 'box_rf2', shadow: false, tex: 0.35 });
      txt('CHÍNH XÁC & CÔNG BẰNG:', -270, -26, 22, PR.green, { weight: 800 });
      txt('"cuộc phỏng vấn lần này chưa tốt,', 0, 10, fitSize('"cuộc phỏng vấn lần này chưa tốt,', 560, 32), PR.char, { align: 'center', weight: 800 });
      txt('và mình cần xem lại phần chuẩn bị."', 0, 48, fitSize('và mình cần xem lại phần chuẩn bị."', 560, 32), PR.char, { align: 'center', weight: 800 });
    });
  });

  prCheck(CX, 950, tBi, 54);

  m18Tag('CỤ THỂ: LẦN NÀY', 350, 1140, PR.navy, 1, 0, 26);
  m18Tag('HÀNH ĐỘNG: XEM LẠI CHUẨN BỊ', 730, 1140, PR.green, popS(tChuanBi), 0, 26);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -25, key: 'b5' });
  prSign('CÂU NÓI CHÍNH XÁC', { kicker: KICK });
  prChips();
};

SCENES.differentiate = () => {   // S7: Cách nói mới không phủ nhận khó khăn
  const tKhan = VW('differentiate', 'khăn').t0;
  m18Room(TEAL, false);
  prStar(140, 410, 30, PR.mustard);
  prClock(950, 440, 52, 9, 50, 'clk6');

  // Bảng có mặt ngay tại vết cắt
  withT(CX, 750, 0, 1, () => {
    pp(pR(-360, -200, 720, 400, 16), PR.paperW, { key: 'diff_board1', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-360, -200, 720, 56, 12), PR.navy, { shadow: false });
    txt('NHÌN THẲNG THỰC TẾ', 0, -162, 28, PR.creamL, { align: 'center', weight: 800 });

    // Dòng 1: Sự kiện lần này
    pp(pR(-300, -80, 600, 80, 10), '#fdf8f0', { shadow: false });
    pp(pR(-300, -80, 12, 80, 4), PR.orange, { shadow: false });
    txt('Kết quả lần này: Chưa đạt như ý', -260, -32, 26, PR.char, { weight: 700 });

    // Dòng 2: Khó khăn có thật
    pp(pR(-300, 20, 600, 80, 10), '#fdf8f0', { shadow: false });
    pp(pR(-300, 20, 12, 80, 4), PR.mustard, { shadow: false });
    txt('Khó khăn trước mắt: Hoàn toàn có thật', -260, 68, 26, PR.char, { weight: 700 });
  });

  prStamp('KHÔNG NÉ TRÁNH', CX, 890, PR.navy, tKhan, { rot: 0.04, size: 44, from: 1.3 });
  m18Tag('KHÔNG PHỦ NHẬN KHÓ KHĂN', CX, 1140, PR.navy, 1, 0, 28);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'neutral', look: -20, key: 'b6' });
  prSign('NHÌN THẲNG VÀO THỰC TẾ', { kicker: KICK });
  prChips();
};

SCENES.differentiate2 = () => {   // S8: Phân biệt một sự kiện với một kết luận quá rộng
  const tRong = VW('differentiate', 'rộng').t0;
  m18Room(TEAL2, true);
  prStar(140, 410, 30, PR.pink);
  prClock(950, 440, 52, 10, 0, 'clk7');

  // Thẻ bên trái & phải có mặt ngay tại vết cắt
  withT(350, 760, 0, 1, () => {
    pp(pR(-160, -220, 320, 440, 16), '#eaf5ea', { key: 'diff_l', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-160, -220, 320, 56, 12), PR.green, { shadow: false });
    txt('MỘT SỰ KIỆN', 0, -182, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('1 cuộc phỏng vấn', 0, -90, 26, PR.char, { align: 'center', weight: 700 });
    txt('1 ngày cụ thể', 0, -40, 26, PR.char, { align: 'center', weight: 700 });

    pp(pR(-120, 30, 240, 50, 10), PR.green, { shadow: false });
    txt('PHẠM VI CỤ THỂ', 0, 62, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  // Thẻ bên phải: Kết luận quá rộng
  withT(730, 760, 0, 1, () => {
    pp(pR(-160, -220, 320, 440, 16), '#ffe8e8', { key: 'diff_r', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-160, -220, 320, 56, 12), PR.red, { shadow: false });
    txt('KẾT LUẬN QUÁ RỘNG', 0, -182, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('Cả tương lai', 0, -90, 26, PR.char, { align: 'center', weight: 700 });
    txt('Mãi mãi thất bại', 0, -40, 26, PR.char, { align: 'center', weight: 700 });

    pp(pR(-120, 30, 240, 50, 10), PR.red, { shadow: false });
    txt('BỊ THỔI PHỒNG', 0, 62, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  // Ký hiệu phân biệt
  m18Tag('≠', 540, 760, PR.char, 1, 0, 32, { w: 60, h: 60, r: 30 });

  m18Tag('MỘT NGÀY TỆ KHÔNG PHẢI CUỘC ĐỜI TỆ', CX, 1140, PR.green, popS(tRong), 0, 28);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT >= tRong ? 'happy' : 'neutral', look: -25, key: 'b7' });
  prSign('MỘT SỰ KIỆN ≠ KẾT LUẬN RỘNG', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S9: Bạn có câu nói nào thường dùng để tự trách mình không?
  const tTell = VW('cta', 'không').t0;
  m18Room(TEAL, false);
  prBunting(260);
  prStar(160, 410, 32, PR.mustard);
  prStar(920, 410, 26, PR.pink);
  prClock(950, 560, 52, 10, 15, 'clk8');

  // Khung bình luận bắt đầu gõ khi hỏi xong câu hỏi
  prCommentBox(CX, 760, 'Mình hay tự trách: Mọi thứ đều hỏng...', tTell, { hint: 'Viết câu bạn hay dùng để tự trách...' });

  // Một ví dụ minh hoạ câu tự trách cụ thể (không có emoji, không câu khẳng định bịa đặt)
  withT(CX, 990, 0, popS(E0 + 0.3), () => {
    pp(pR(-340, -55, 680, 110, 20), PR.paperW, { key: 'cmt0', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-280, 0, 36, 36), PR.plum, { key: 'cav0', shadow: false, tex: 0.4 });
    txt('Bình luận mẫu:', -230, -18, 20, PR.greyD, { weight: 700 });
    txt('"Mình chẳng bao giờ làm được việc gì..."', -230, 18, fitSize('"Mình chẳng bao giờ làm được việc gì..."', 520, 28), PR.char, { weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b8', look: -20 });
  prSign('BÌNH LUẬN BÊN DƯỚI', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['overgeneralize', 'một', 1, 'interview'],
  ['reframe', 'cuộc', 0, 'reframe2'],
  ['differentiate', 'nó', 0, 'differentiate2'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'thất').t0 });
  cues.push({ k: 'pop', t: VW('hook', 'mãi').t0 });
  cues.push({ k: 'pop', t: VW('overgeneralize', 'kết').t0 });
  cues.push({ k: 'thud', t: VW('overgeneralize', 'thành', 1).t0 });
  cues.push({ k: 'pop', t: VW('overgeneralize', 'việc').t0 });
  cues.push({ k: 'chime', t: VW('reality', 'khả').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'thay').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'cuộc').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'bị').t0 });
  cues.push({ k: 'tick', t: VW('differentiate', 'khăn').t0 });
  cues.push({ k: 'pop', t: VW('differentiate', 'phân').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'không').t0 });
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
