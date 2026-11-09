// =====================================================================
//  TIDU MONEY 01 — "Lương vừa về, tiền đã đi đâu?"
//  One scene per voice line. Mascot: piggy (Tidu Money pig).
//  Theme: Financial planning, budgeting, 7-day spending awareness.
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · CHI TIÊU';
const SCENES = {};

// ---- CUSTOM TIDU MONEY HELPERS (tm prefix to avoid clashes) ----

// A leather wallet at (cx, cy) that holds banknotes and drains out
function tmWallet(cx, cy, drainFrac = 0, s = 1) {
  withT(cx, cy, -0.02, s, () => {
    // Back panel
    pp(pR(-180, -110, 360, 220, 22), '#6e3c1b', { key: 'w_back', sb: 18, sy: 9, tex: 0.5 });
    // Banknotes poking out from the slot
    if (drainFrac < 0.95) {
      const billY = -120 - (1 - drainFrac) * 45;
      const alpha = clamp(1 - drainFrac * 1.2);
      ctx.save();
      ctx.globalAlpha = alpha;
      // 500k bills
      pp(pR(-140, billY, 260, 110, 8), '#8fc28a', { key: 'w_bill1', sb: 8, sy: 4, tex: 0.4 });
      pp(pR(-125, billY + 10, 230, 90, 6), '#a9d6a0', { key: 'w_bill2', shadow: false, tex: 0.35 });
      txt('500.000₫', -110, billY + 50, 28, PR.moneyK, { weight: 800 });
      pp(pR(-110, billY - 24, 250, 90, 8), '#7fb87a', { key: 'w_bill3', sb: 6, sy: 3, tex: 0.4 });
      txt('10.000.000₫', -90, billY + 18, 30, PR.moneyK, { weight: 800 });
      ctx.restore();
    }
    // Front pocket flap
    pp(pR(-180, -45, 360, 155, 20), '#8a4e25', { key: 'w_front', sb: 16, sy: 8, tex: 0.55 });
    // Inner stitching line
    ctx.save();
    ctx.strokeStyle = '#d79b5c';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 10]);
    ctx.strokeRect(-165, -30, 330, 125);
    ctx.restore();
    // Leather clasp with golden snap
    pp(pR(100, -25, 90, 50, 10), '#5c3214', { key: 'w_clasp', sb: 10, sy: 4, tex: 0.5 });
    pp(pE(150, 0, 14, 14), PR.mustard, { key: 'w_snap', sb: 6, sy: 2, tex: 0.3 });
    pp(pE(150, 0, 6, 6), PR.creamL, { shadow: false, tex: false });
  });
}

// A flip desk calendar at (cx, cy)
function tmCalendar(cx, cy, dayStr, subStr, s = 1) {
  withT(cx, cy, 0.04, s, () => {
    // Back stand
    pp(pR(-130, -150, 260, 300, 18), PR.char, { key: 'cal_bg', sb: 16, sy: 8, tex: 0.4 });
    // Ring coils
    for (let i = -3; i <= 3; i++) {
      pp(pR(i * 32 - 6, -170, 12, 38, 5), '#b0b8c0', { key: 'cal_ring' + i, sb: 4, sy: 2, tex: 0.3 });
    }
    // White sheet
    pp(pR(-115, -135, 230, 265, 12), PR.paperW, { key: 'cal_sheet', shadow: false, tex: 0.4 });
    // Red header
    pp(pR(-115, -135, 230, 65, 10), PR.red, { key: 'cal_head', shadow: false, tex: 0.4 });
    txt('THÁNG NÀY', 0, -92, 26, PR.creamL, { align: 'center', weight: 800 });
    // Day number
    txt(dayStr, 0, 15, 96, PR.char, { align: 'center', weight: 800 });
    // Subtitle note
    txt(subStr, 0, 85, 24, PR.greyD, { align: 'center', weight: 700 });
  });
}

// A paper expense card / receipt
function tmExpenseCard(cx, cy, iconText, title, amount, color, s = 1, rot = 0) {
  withT(cx, cy, rot, s, () => {
    const w = 580, h = 110;
    pp(pR(-w / 2, -h / 2, w, h, 14), PR.paperW, { key: 'ec_' + title, sb: 14, sy: 7, tex: 0.45 });
    // Left color bar
    pp(pR(-w / 2, -h / 2, 16, h, 8), color, { shadow: false, tex: 0.4 });
    // Icon circle
    pp(pE(-w / 2 + 65, 0, 36, 36), color, { key: 'ec_ic_' + title, sb: 6, sy: 3, tex: 0.4 });
    txt(iconText, -w / 2 + 65, 12, 32, PR.creamL, { align: 'center', weight: 800 });
    // Title
    txt(title, -w / 2 + 120, 10, 26, PR.char, { weight: 800 });
    // Amount
    txt(amount, w / 2 - 28, 12, 32, color, { align: 'right', weight: 800, font: F_MONO });
  });
}

// A column container for budgeting categories
function tmColumn(cx, cy, w, h, title, subStr, color, items, totalStr, popVal = 1) {
  withT(cx, cy, 0, popVal, () => {
    // Column card
    pp(pR(-w / 2, -h / 2, w, h, 16), '#f6f3eb', { key: 'col_' + title, sb: 16, sy: 8, tex: 0.45 });
    // Header banner
    pp(pR(-w / 2, -h / 2, w, 82, 14), color, { key: 'col_h_' + title, shadow: false, tex: 0.4 });
    txt(title, 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });
    txt(subStr, 0, -h / 2 + 115, 20, PR.greyD, { align: 'center', weight: 700 });

    // Item badges inside
    items.forEach((it, i) => {
      const iy = -h / 2 + 155 + i * 86;
      pp(pR(-w / 2 + 16, iy, w - 32, 70, 10), PR.paperW, { key: 'col_it_' + title + i, sb: 6, sy: 3, tex: 0.35 });
      txt(it.name, -w / 2 + 28, iy + 44, 21, PR.char, { weight: 700 });
      txt(it.cost, w / 2 - 24, iy + 44, 21, color, { align: 'right', weight: 800, font: F_MONO });
    });

    // Total bottom stripe
    const botY = h / 2 - 64;
    pp(pR(-w / 2 + 16, botY, w - 32, 48, 8), '#eae4d5', { shadow: false, tex: 0.3 });
    txt('TỔNG:', -w / 2 + 26, botY + 33, 18, PR.char, { weight: 800 });
    txt(totalStr, w / 2 - 22, botY + 33, 20, PR.char, { align: 'right', weight: 800, font: F_MONO });
  });
}
// Open 7-day spending notebook
function tmNotebook(cx, cy, s = 1) {
  withT(cx, cy, -0.015, s, () => {
    const w = 680, h = 640;
    // Cover backing
    pp(pR(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 22), PR.plum, { key: 'nb_cover', sb: 20, sy: 10, tex: 0.5 });
    // Left & right pages
    pp(pR(-w / 2, -h / 2, w / 2 - 6, h, 14), PR.paperW, { key: 'nb_pL', shadow: false, tex: 0.45 });
    pp(pR(6, -h / 2, w / 2 - 6, h, 14), PR.creamL, { key: 'nb_pR', shadow: false, tex: 0.45 });
    // Spine seam
    pp(pR(-10, -h / 2, 20, h, 4), '#dcd3c4', { shadow: false, tex: 0.3 });

    // Page title
    txt('SỔ GHI 7 NGÀY', -w / 4, -h / 2 + 65, 30, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-w / 2 + 40, -h / 2 + 85, w / 2 - 86, 4, 2), PR.mustard, { shadow: false, tex: false });

    // Checklist items
    const lines = [
      'Ngày 1: Ghi nhận mọi chi tiêu',
      'Ngày 3: Không bỏ sót khoản nhỏ',
      'Ngày 5: Nhận diện thói quen',
      'Ngày 7: Tổng kết 3 nhóm'
    ];
    lines.forEach((l, i) => {
      const ly = -h / 2 + 155 + i * 90;
      pp(pR(-w / 2 + 35, ly - 32, 38, 38, 6), '#e2ebd8', { key: 'nb_chk' + i, shadow: false, tex: 0.3 });
      ctx.save();
      ctx.strokeStyle = PR.green;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-w / 2 + 43, ly - 14);
      ctx.lineTo(-w / 2 + 51, ly - 6);
      ctx.lineTo(-w / 2 + 67, ly - 26);
      ctx.stroke();
      ctx.restore();
      txt(l, -w / 2 + 88, ly - 4, 21, PR.char, { weight: 700 });
    });

    // Right page: Golden rule
    txt('NGUYÊN TẮC VÀNG', w / 4, -h / 2 + 75, 26, PR.plum, { align: 'center', weight: 800 });
    pp(pR(40, -h / 2 + 120, w / 2 - 80, 240, 14), '#fcf8ee', { key: 'nb_rule', sb: 10, sy: 5, tex: 0.35 });
    txt('"Biết rõ tiền', w / 4, -h / 2 + 185, 30, PR.char, { align: 'center', weight: 800 });
    txt('đang đi đâu,', w / 4, -h / 2 + 235, 30, PR.char, { align: 'center', weight: 800 });
    txt('trước khi cắt giảm!"', w / 4, -h / 2 + 285, 28, PR.green, { align: 'center', weight: 800 });
  });
}

// =====================================================================
//  SCENE DEFINITIONS (One per voice line)
// =====================================================================

// Scene 1 (hook): 0–4s: Một chiếc ví nhận 10 triệu đồng; lịch lật nhanh 10 ngày, ví gần như rỗng.
SCENES.hook = () => {
  const tVao = VW('hook', 'về').t0;
  const tMuoi = VW('hook', 'mười').t0;
  const tTrong = VW('hook', 'trống').t0;

  prWall(PR.plum, { panel: 'rgba(255,255,255,0.04)', streak: 400 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(190, 420, 68, 9, 15);

  // Floating background coins
  prCoin(940, 480, 38, 'c1');
  prCoin(840, 560, 26, 'c2');

  // Wallet receiving money then draining
  const drain = clamp((TT - tMuoi) / (tTrong - tMuoi + 0.6));
  tmWallet(450, 800, drain, 1.05);

  // Balance counter card
  const balFrac = clamp((TT - tMuoi) / (tTrong - tMuoi + 0.4));
  const currentVal = TT < tMuoi
    ? '+10.000.000₫'
    : (balFrac >= 1 ? '0₫' : `${Math.round((1 - balFrac) * 10)}.000.000₫`);
  const balColor = balFrac >= 0.8 ? PR.red : PR.green;

  withT(450, 1020, 0, popS(tVao), () => {
    pp(pR(-190, -50, 380, 100, 14), PR.paperW, { key: 'bal_card', sb: 14, sy: 7, tex: 0.45 });
    txt('SỐ DƯ TRONG VÍ', 0, -14, 20, PR.greyD, { align: 'center', weight: 700 });
    txt(currentVal, 0, 28, 38, balColor, { align: 'center', weight: 800, font: F_MONO });
  });

  // Calendar flip: Day 1 -> Day 5 -> Day 10
  const calDay = TT < tMuoi ? '01' : (TT < tMuoi + 0.6 ? '05' : '10');
  const calSub = TT < tMuoi ? 'Lương về' : (TT < tMuoi + 0.6 ? '5 ngày sau' : '10 ngày sau');
  tmCalendar(800, 780, calDay, calSub, popS(E0 + 0.15));

  // Piggy mascot: starts happy with green visor, turns shocked ('wow') when wallet empties
  const pigMood = TT < tMuoi ? 'happy' : 'wow';
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: pigMood, look: -15, key: 'pg1' });

  prSign('LƯƠNG VỪA VỀ...', { kicker: KICK });
  prChips();
};

// Scene 2 (issue): Vấn đề đôi khi không nằm ở một món đồ quá đắt, mà ở hàng chục khoản nhỏ ta không nhớ.
SCENES.issue = () => {
  const tDat = VW('issue', 'đắt').t0;
  const tNho = VW('issue', 'nhỏ').t0;

  prWall(PR.navyD, { streak: 350 });
  prFloor(1560, PR.char, { studs: true });

  // Luxury item card (Túi xách hiệu / Điện thoại đắt đỏ)
  withT(320, 720, -0.04, popS(E0 + 0.1), () => {
    pp(pR(-180, -140, 360, 280, 18), PR.paperW, { key: 'lux_card', sb: 16, sy: 8, tex: 0.45 });
    // Bag icon box
    pp(pR(-90, -100, 180, 130, 12), '#b3824b', { key: 'lux_bag', sb: 8, sy: 4, tex: 0.4 });
    pp(pA(0, -90, 45, Math.PI, TAU), '#8a5a33', { key: 'lux_handle', sb: 4, sy: 2, tex: 0.3 });
    txt('MÓN ĐỒ ĐẮT TIỀN', 0, 75, 26, PR.char, { align: 'center', weight: 800 });
    txt('30.000.000₫', 0, 115, 30, PR.red, { align: 'center', weight: 800, font: F_MONO });
  });

  // Red cross slams on the expensive item!
  prCross(320, 720, tDat + 0.1, 75);

  // Small expense chips swarm around
  const smallItems = [
    { title: 'Cà phê sáng', cost: '35.000₫', x: 670, y: 560, r: 0.05 },
    { title: 'Trà sữa chiều', cost: '55.000₫', x: 650, y: 700, r: -0.03 },
    { title: 'Phí ship đồ ăn', cost: '25.000₫', x: 680, y: 840, r: 0.04 },
    { title: 'Ăn vặt văn phòng', cost: '40.000₫', x: 640, y: 980, r: -0.02 },
    { title: 'Gửi xe & lặt vặt', cost: '20.000₫', x: 320, y: 990, r: 0.03 }
  ];

  smallItems.forEach((it, i) => {
    const tShow = tNho + i * 0.18;
    withT(it.x, it.y, it.r, popS(tShow), () => {
      pp(pR(-160, -38, 320, 76, 12), PR.creamL, { key: 'sm_' + i, sb: 10, sy: 5, tex: 0.4 });
      txt(it.title, -140, 8, 22, PR.char, { weight: 700 });
      txt(it.cost, 140, 10, 24, PR.mustard, { align: 'right', weight: 800, font: F_MONO });
    });
  });

  // Mascot: piggy with bowler hat pointing with stick
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -16, hold: propStick(-0.25), key: 'pg2' });

  prSign('KHÔNG PHẢI ĐỒ ĐẮT TIỀN', { kicker: KICK });
  prChips();
};

// Scene 3 (items): Một bữa ăn thêm, một lần đặt xe, một khoản đăng ký ứng dụng.
SCENES.items = () => {
  const tThem = VW('items', 'thêm').t0;
  const tXe = VW('items', 'xe').t0;
  const tDung = VW('items', 'dụng').t0;

  prWall('#243b53', { panel: 'rgba(255,255,255,0.05)', streak: 500 });
  prFloor(1560, PR.wood, { trim: false });
  prBunting(-14, undefined, 'bun_items');

  // Three clear receipts appearing one by one
  tmExpenseCard(470, 620, '🍜', 'Ăn vặt & cà phê', '55.000₫', PR.orange, popS(tThem), -0.02);
  tmExpenseCard(470, 790, '🚗', 'Đặt xe di chuyển', '42.000₫', PR.teal, popS(tXe), 0.02);
  tmExpenseCard(470, 960, '📱', 'Đăng ký ứng dụng', '79.000₫', PR.purple, popS(tDung), -0.015);

  // Cumulative callout card at the bottom
  const tEndLine = VL('items').t1;
  withT(470, 1140, 0, popS(tEndLine + 0.1), () => {
    pp(pR(-260, -42, 520, 84, 14), PR.mustard, { key: 'item_total', sb: 14, sy: 7, tex: 0.5 });
    txt('GOM LẠI MỖI THÁNG = VÀI TRIỆU ĐỒNG!', 0, 12, 24, PR.char, { align: 'center', weight: 800 });
  });

  // Mascot: piggy holding calculator with newsboy cap!
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'wow', look: -15, hold: propCalc(0.08), key: 'pg3' });

  prSign('3 KHOẢN CHI THẦM LẶNG', { kicker: KICK });
  prChips();
};

// Scene 4 (groups): Hãy thử ghi lại mọi khoản chi trong bảy ngày, chia thành ba nhóm: cần thiết, linh hoạt và phát sinh.
SCENES.groups = () => {
  const tThiet = VW('groups', 'thiết').t0;
  const tHoat = VW('groups', 'hoạt').t0;
  const tSinh = VW('groups', 'sinh').t0;

  prWall(PR.board, { panel: 'rgba(255,255,255,0.03)', streak: 600 });
  prFloor(1560, PR.woodD, { trim: false });

  // 3 Budgeting Columns
  const colW = 280, colH = 580, colY = 820;

  // Col 1: Cần thiết
  const items1 = [
    { name: 'Tiền nhà', cost: '3.5M' },
    { name: 'Ăn uống', cost: '1.8M' },
    { name: 'Điện nước', cost: '600k' }
  ];
  tmColumn(190, colY, colW, colH, 'CẦN THIẾT', 'Cố định hàng tháng', PR.green, items1, '5.900.000₫', popS(tThiet));

  // Col 2: Linh hoạt
  const items2 = [
    { name: 'Cà phê', cost: '450k' },
    { name: 'Ăn ngoài', cost: '850k' },
    { name: 'Mua sắm', cost: '700k' }
  ];
  tmColumn(500, colY, colW, colH, 'LINH HOẠT', 'Thay đổi theo tuần', PR.mustard, items2, '2.000.000₫', popS(tHoat));

  // Col 3: Phát sinh
  const items3 = [
    { name: 'Sửa xe', cost: '350k' },
    { name: 'Tiệc cưới', cost: '500k' },
    { name: 'Lặt vặt', cost: '400k' }
  ];
  tmColumn(810, colY, colW, colH, 'PHÁT SINH', 'Khoản không dự tính', PR.red, items3, '1.250.000₫', popS(tSinh));

  // Piggy with mortar hat pointing at the board
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'neutral', look: -18, hold: propStick(-0.35), key: 'pg4' });

  prSign('CHIA THÀNH 3 NHÓM', { kicker: KICK });
  prChips();
};

// Scene 5 (check): Cuối tuần, nhìn xem nhóm nào khiến bạn bất ngờ.
SCENES.check = () => {
  const tNgo = VW('check', 'ngờ').t0;

  prWall(PR.navy, { streak: 500 });
  prFloor(1560, PR.floor, { studs: true });

  // Highlight the 3 columns summary with "Linh hoạt" causing the big surprise!
  const colW = 280, colH = 500, colY = 770;

  // Col 1: 50%
  withT(190, colY, 0, popS(E0 + 0.1), () => {
    pp(pR(-colW / 2, -colH / 2, colW, colH, 16), '#edf2f7', { key: 'ck_c1', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-colW / 2, -colH / 2, colW, 70, 14), PR.green, { shadow: false, tex: 0.4 });
    txt('CẦN THIẾT', 0, -colH / 2 + 46, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('50%', 0, 10, 64, PR.green, { align: 'center', weight: 800, font: F_MONO });
    txt('Đúng dự tính', 0, 70, 22, PR.greyD, { align: 'center', weight: 700 });
  });

  // Col 2: 35% - THE SURPRISE
  withT(500, colY, 0, popS(E0 + 0.2), () => {
    pp(pR(-colW / 2, -colH / 2, colW, colH, 16), '#fef9e7', { key: 'ck_c2', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-colW / 2, -colH / 2, colW, 70, 14), PR.mustard, { shadow: false, tex: 0.4 });
    txt('LINH HOẠT', 0, -colH / 2 + 46, 26, PR.char, { align: 'center', weight: 800 });
    txt('35%', 0, 10, 64, PR.red, { align: 'center', weight: 800, font: F_MONO });
    txt('Nhiều khoản nhỏ!', 0, 70, 22, PR.red, { align: 'center', weight: 800 });
  });

  // Col 3: 15%
  withT(810, colY, 0, popS(E0 + 0.3), () => {
    pp(pR(-colW / 2, -colH / 2, colW, colH, 16), '#edf2f7', { key: 'ck_c3', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-colW / 2, -colH / 2, colW, 70, 14), PR.blue, { shadow: false, tex: 0.4 });
    txt('PHÁT SINH', 0, -colH / 2 + 46, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('15%', 0, 10, 64, PR.blue, { align: 'center', weight: 800, font: F_MONO });
    txt('Dễ kiểm soát', 0, 70, 22, PR.greyD, { align: 'center', weight: 700 });
  });

  // Rubber stamp "BẤT NGỜ!" slams on the middle column
  prStamp('BẤT NGỜ!', 500, 940, PR.red, tNgo + 0.1, { rot: -0.08, size: 50, from: 1.3 });

  // Piggy with top hat looks completely amazed ('wow')
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'wow', look: -15, key: 'pg5' });

  prSign('NHÓM NÀO GÂY BẤT NGỜ?', { kicker: KICK });
  prChips();
};

// Scene 6 (step): Đừng vội cắt giảm mọi thứ. Bước đầu tiên là biết tiền đang đi đâu.
SCENES.step = () => {
  const tCat = VW('step', 'giảm').t0;
  const tDau = VW('step', 'đầu').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Open 7-day spending notebook
  tmNotebook(450, 780, popS(E0 + 0.15));

  // Cross out the wrong advice: "CẮT GIẢM TOÀN BỘ"
  withT(450, 430, -0.02, popS(tCat - 0.2), () => {
    pp(pR(-220, -32, 440, 64, 10), PR.paperW, { key: 'cut_bad', sb: 10, sy: 5, tex: 0.4 });
    txt('CẮT GIẢM MỌI THỨ NGAY?', 0, 10, 24, PR.greyD, { align: 'center', weight: 800 });
    // Red strike-through
    pp(pR(-190, -4, 380, 8, 4), PR.red, { shadow: false, tex: false });
  });

  // Golden message stamp slams at bottom of notebook
  prStamp('NHÌN RÕ TRƯỚC KHI CẮT GIẢM', 450, 1140, PR.moneyK, tDau + 0.4, { rot: -0.03, size: 28, from: 1.25 });

  // Piggy with nón lá holding a lucky coin
  piggy(PIGGY_X, PIGGY_Y, { hat: 'nonla', mood: 'happy', look: -14, hold: propCoin(55), key: 'pg6' });

  prSign('BƯỚC 1: BIẾT TIỀN ĐI ĐÂU', { kicker: KICK });
  prChips();
};

// Scene 7 (cta): Lưu video để thử ngay tối nay.
SCENES.cta = () => {
  const tLuu = VW('cta', 'Lưu').t0;
  const tToi = VW('cta', 'tối').t0;

  prWall('#1a3a2a', { panel: 'rgba(255,255,255,0.05)', streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Floating celebration coins & stars
  prStar(160, 480, 22, PR.yellow);
  prStar(280, 420, 16, PR.mustard);
  prStar(780, 440, 20, PR.yellow);
  prCoin(200, 580, 40, 'cta_c1');
  prCoin(820, 560, 34, 'cta_c2');

  // Main CTA Action Card
  withT(470, 780, 0, popS(tLuu), () => {
    const w = 580, h = 420;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box', sb: 18, sy: 9, tex: 0.45 });
    // Top banner
    pp(pR(-w / 2, -h / 2, w, 88, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('THỬ THÁCH 7 NGÀY', 0, -h / 2 + 56, 32, PR.creamL, { align: 'center', weight: 800 });

    // Bookmark / Save icon
    pp(pE(0, -30, 48, 48), PR.mustard, { key: 'cta_ic', sb: 8, sy: 4, tex: 0.35 });
    txt('🔖', 0, -14, 40, PR.char, { align: 'center' });

    // CTA main text
    txt('LƯU VIDEO NÀY', 0, 60, 38, PR.char, { align: 'center', weight: 800 });
    txt('Bắt đầu ghi chi tiêu từ tối nay!', 0, 110, 26, PR.greyD, { align: 'center', weight: 700 });
    // Action button
    withT(0, 165, 0, popS(tToi), () => {
      pp(pR(-180, -30, 360, 60, 12), PR.navy, { key: 'cta_btn', sb: 8, sy: 4, tex: 0.4 });
      txt('ĐỒNG Ý THỬ 👆', 0, 10, 26, PR.creamL, { align: 'center', weight: 800 });
    });
  });

  // Piggy with party hat waving lucky coin!
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'pg7' });

  prSign('THỬ GHI CHÉP TỐI NAY!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  const c = [
    { k: 'pop', t: 0.1 },
    { k: 'chime', t: VW('hook', 'về').t0 + 0.2 },
    { k: 'tick', t: VW('hook', 'mười').t0 },
    { k: 'thud', t: VW('issue', 'đắt').t0 + 0.1 },
    { k: 'pop', t: VW('items', 'thêm').t0 },
    { k: 'pop', t: VW('items', 'xe').t0 },
    { k: 'pop', t: VW('items', 'dụng').t0 },
    { k: 'tick', t: VW('groups', 'thiết').t0 },
    { k: 'tick', t: VW('groups', 'hoạt').t0 },
    { k: 'tick', t: VW('groups', 'sinh').t0 },
    { k: 'thud', t: VW('check', 'ngờ').t0 + 0.1 },
    { k: 'thud', t: VW('step', 'đầu').t0 + 0.4 },
    { k: 'chime', t: VW('cta', 'Lưu').t0 + 0.1 }
  ];
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
