// =====================================================================
//  TIDU MONEY 03 — "Quỹ khẩn cấp bao nhiêu là đủ?"
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · QUỸ KHẨN CẤP';
const SCENES = {};

// ---- HELPERS ----

// A shield icon
function tmShield(cx, cy, color = PR.teal, s = 1) {
  withT(cx, cy, 0, s, () => {
    ctx.save();
    ctx.shadowColor = 'rgba(12,10,8,0.3)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -65);
    ctx.lineTo(55, -40);
    ctx.lineTo(55, 10);
    ctx.quadraticCurveTo(55, 65, 0, 85);
    ctx.quadraticCurveTo(-55, 65, -55, 10);
    ctx.lineTo(-55, -40);
    ctx.closePath();
    ctx.fill();

    // Inner rim
    ctx.strokeStyle = PR.creamL;
    ctx.lineWidth = 6;
    ctx.stroke();

    // Checkmark inside shield
    ctx.strokeStyle = PR.creamL;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-22, 12);
    ctx.lineTo(-6, 28);
    ctx.lineTo(24, -15);
    ctx.stroke();
    ctx.restore();
  });
}

// Stack of cash
function tmCashStack(cx, cy, label, amtStr, color, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 320, h = 180;
    // Lower bills layers
    for (let i = 2; i >= 0; i--) {
      pp(pR(-w / 2 + i * 4, -h / 2 + i * 14, w, 110, 10), '#7fb87a', { key: 'cs_b' + label + i, sb: 8, sy: 4, tex: 0.35 });
    }
    // Top bill
    pp(pR(-w / 2, -h / 2, w, 110, 10), '#8fc28a', { key: 'cs_top' + label, sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-w / 2 + 15, -h / 2 + 12, w - 30, 86, 8), '#a9d6a0', { shadow: false, tex: 0.3 });
    txt(label, 0, -h / 2 + 45, 22, PR.char, { align: 'center', weight: 800 });
    txt(amtStr, 0, -h / 2 + 82, 34, color, { align: 'center', weight: 800, font: F_MONO });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): 0–5s: Lịch trả lương ngừng lại; ví tiền đứng yên.
SCENES.hook = () => {
  const tLuong = VW('hook', 'lương').t0;
  const tThang = VW('hook', 'tháng').t0;

  prWall(PR.navyD, { streak: 400 });
  prFloor(1560, PR.char, { studs: true });

  // Stopped calendar
  withT(360, 720, -0.03, popS(E0 + 0.1), () => {
    pp(pR(-140, -150, 280, 300, 18), PR.char, { key: 'hk_cal_bg', sb: 16, sy: 8, tex: 0.4 });
    pp(pR(-125, -135, 250, 265, 12), PR.paperW, { shadow: false, tex: 0.4 });
    pp(pR(-125, -135, 250, 65, 10), PR.red, { shadow: false, tex: 0.4 });
    txt('NGÀY NHẬN LƯƠNG', 0, -92, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('TẠM DỪNG', 0, 25, 46, PR.red, { align: 'center', weight: 800 });
    txt('Không có dòng tiền vào!', 0, 85, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  // Cross on salary
  prCross(360, 720, tLuong + 0.2, 70);

  // Still wallet on right
  withT(680, 720, 0.04, popS(E0 + 0.25), () => {
    pp(pR(-140, -90, 280, 180, 16), '#8a4e25', { key: 'hk_w', sb: 14, sy: 7, tex: 0.5 });
    txt('VÍ TIỀN', 0, -20, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('SỐNG ĐƯỢC MẤY THÁNG?', 0, 35, 22, PR.mustard, { align: 'center', weight: 800 });
  });

  // Piggy flat/concerned
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: TT < tThang ? 'flat' : 'wow', look: -15, key: 'p1' });

  prSign('NẾU NGÀY MAI KHÔNG CÒN LƯƠNG?', { kicker: KICK });
  prChips();
};

// Scene 2 (reason): Đó là câu hỏi giúp bạn hiểu vì sao cần quỹ khẩn cấp.
SCENES.reason = () => {
  const tKhan = VW('reason', 'khẩn').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Central Shield with "QUỸ KHẨN CẤP"
  tmShield(540, 640, PR.teal, popS(E0 + 0.15));

  withT(540, 880, 0, popS(tKhan), () => {
    pp(pR(-280, -75, 560, 150, 18), PR.paperW, { key: 'rs_box', sb: 16, sy: 8, tex: 0.45 });
    txt('CHIẾC PHAO TÀI CHÍNH', 0, -22, 28, PR.char, { align: 'center', weight: 800 });
    txt('Bảo vệ bạn trước mọi biến cố bất ngờ!', 0, 28, 24, PR.teal, { align: 'center', weight: 800 });
  });

  // Piggy with bowler hat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'happy', look: -16, key: 'p2' });

  prSign('VÌ SAO CẦN QUỸ KHẨN CẤP?', { kicker: KICK });
  prChips();
};

// Scene 3 (monthly): Giả sử chi phí thiết yếu mỗi tháng là bốn triệu đồng.
SCENES.monthly = () => {
  const tBon = VW('monthly', 'bốn').t0;

  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // Monthly breakdown card: 4.000.000₫
  withT(540, 750, 0, popS(E0 + 0.15), () => {
    const w = 580, h = 420;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'mo_card', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 88, 16), PR.green, { shadow: false, tex: 0.4 });
    txt('CHI PHÍ THIẾT YẾU MỖI THÁNG', 0, -h / 2 + 55, 28, PR.creamL, { align: 'center', weight: 800 });

    const items = [
      { name: 'Tiền thuê trọ & dịch vụ', cost: '2.200.000₫' },
      { name: 'Ăn uống cơ bản', cost: '1.400.000₫' },
      { name: 'Đi lại & liên lạc', cost: '400.000₫' }
    ];
    items.forEach((it, i) => {
      const iy = -h / 2 + 130 + i * 85;
      pp(pR(-w / 2 + 25, iy, w - 50, 68, 10), '#f6f3eb', { key: 'mo_it_' + i, sb: 6, sy: 3, tex: 0.35 });
      txt(it.name, -w / 2 + 45, iy + 44, 22, PR.char, { weight: 700 });
      txt(it.cost, w / 2 - 45, iy + 44, 24, PR.green, { align: 'right', weight: 800, font: F_MONO });
    });

    // Total bottom
    txt('TỔNG = 4.000.000₫ / THÁNG', 0, h / 2 - 25, 26, PR.char, { align: 'center', weight: 800, font: F_MONO });
  });

  // Stamp: "MỨC CƠ BẢN"
  prStamp('MỨC CƠ BẢN', 540, 1080, PR.green, tBon + 0.3, { rot: -0.04, size: 36, from: 1.25 });

  // Piggy with newsboy hat holding calculator
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'neutral', look: -15, key: 'p3' });

  prSign('CHI PHÍ THIẾT YẾU MỖI THÁNG', { kicker: KICK });
  prChips();
};

// Scene 4 (calc): Ba tháng tương đương mười hai triệu, còn sáu tháng là hai mươi bốn triệu.
SCENES.calc = () => {
  const tBa = VW('calc', 'Ba').t0;
  const tSau = VW('calc', 'sáu').t0;

  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Two target stacks: 3 Months vs 6 Months
  tmCashStack(350, 720, 'QUỸ 3 THÁNG', '12.000.000₫', PR.teal, popS(tBa));
  tmCashStack(730, 720, 'QUỸ 6 THÁNG', '24.000.000₫', PR.green, popS(tSau));

  // Comparison card
  withT(540, 980, 0, popS(tSau + 0.3), () => {
    pp(pR(-280, -55, 560, 110, 14), PR.paperW, { key: 'calc_comp', sb: 12, sy: 6, tex: 0.4 });
    txt('4 Triệu × 3 Tháng = 12.000.000₫', 0, -10, 24, PR.teal, { align: 'center', weight: 800, font: F_MONO });
    txt('4 Triệu × 6 Tháng = 24.000.000₫', 0, 30, 24, PR.green, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy tophat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'happy', look: -15, hold: propCoin(55), key: 'p4' });

  prSign('MỐC 3 THÁNG & 6 THÁNG', { kicker: KICK });
  prChips();
};

// Scene 5 (benchmark): Mức ba đến sáu tháng thường được dùng làm mốc tham khảo, nhưng bạn cần điều chỉnh theo công việc, người phụ thuộc và mức độ ổn định thu nhập.
SCENES.benchmark = () => {
  prWall(PR.navy, { streak: 500 });
  prFloor(1560, PR.floor, { studs: true });

  // 3 Adjustment factors
  const factors = [
    { title: 'TÍNH CHẤT CÔNG VIỆC', desc: 'Ổn định hay Freelance / Tự do', col: PR.teal },
    { title: 'NGƯỜI PHỤ THUỘC', desc: 'Có con nhỏ hoặc chăm sóc cha mẹ', col: PR.mustard },
    { title: 'MỨC ĐỘ ỔN ĐỊNH THU NHẬP', desc: 'Thu nhập đều đặn hay theo hoa hồng', col: PR.blue }
  ];

  withT(540, 760, 0, popS(E0 + 0.1), () => {
    const w = 600, h = 480;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'bm_box', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 85, 16), PR.navy, { shadow: false, tex: 0.4 });
    txt('3 YẾU TỐ ĐIỀU CHỈNH QUỸ', 0, -h / 2 + 54, 28, PR.creamL, { align: 'center', weight: 800 });

    factors.forEach((f, i) => {
      const iy = -h / 2 + 130 + i * 110;
      pp(pR(-w / 2 + 25, iy, w - 50, 90, 12), '#f6f3eb', { key: 'bm_f_' + i, sb: 6, sy: 3, tex: 0.35 });
      pp(pR(-w / 2 + 25, iy, 12, 90, 6), f.col, { shadow: false, tex: 0.4 });
      txt(f.title, -w / 2 + 55, iy + 40, 22, PR.char, { weight: 800 });
      txt(f.desc, -w / 2 + 55, iy + 72, 20, PR.greyD, { weight: 700 });
    });
  });

  // Piggy mortar pointing
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'neutral', look: -16, hold: propStick(-0.25), key: 'p5' });

  prSign('ĐIỀU CHỈNH THEO HOÀN CẢNH', { kicker: KICK });
  prChips();
};

// Scene 6 (start): Không nhất thiết phải có ngay toàn bộ số tiền.
SCENES.start = () => {
  const tTien = VW('start', 'tiền').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Stepping stones ladder
  const steps = [
    { label: 'Bước 1', amt: '500.000₫', w: 300 },
    { label: 'Bước 2', amt: '2.000.000₫', w: 380 },
    { label: 'Bước 3', amt: '6.000.000₫', w: 460 },
    { label: 'Mục tiêu', amt: '12.000.000₫', w: 540 }
  ];

  withT(540, 760, 0, popS(E0 + 0.15), () => {
    txt('TÍCH LŨY TỪNG BƯỚC NHỎ', 0, -220, 30, PR.char, { align: 'center', weight: 800 });
    steps.forEach((st, i) => {
      const sy = -140 + i * 90;
      pp(pR(-st.w / 2, sy, st.w, 68, 12), i === 3 ? PR.green : PR.paperW, { key: 'st_' + i, sb: 8, sy: 4, tex: 0.4 });
      txt(st.label, -st.w / 2 + 30, sy + 44, 22, i === 3 ? PR.creamL : PR.greyD, { weight: 700 });
      txt(st.amt, st.w / 2 - 30, sy + 44, 24, i === 3 ? PR.creamL : PR.char, { align: 'right', weight: 800, font: F_MONO });
    });
  });

  // Stamp: "BẮT ĐẦU TỪ KHOẢN NHỎ"
  prStamp('BẮT ĐẦU TỪ KHOẢN NHỎ', 540, 1080, PR.mustard, tTien + 0.2, { rot: -0.03, size: 32, from: 1.25 });

  // Piggy nonla
  piggy(PIGGY_X, PIGGY_Y, { hat: 'nonla', mood: 'happy', look: -14, hold: propCoin(55), key: 'p6' });

  prSign('BẮT ĐẦU TỪ KHOẢN NHỎ', { kicker: KICK });
  prChips();
};

// Scene 7 (safe): Hãy bắt đầu từ một khoản nhỏ và giữ nó ở nơi tương đối an toàn, dễ rút khi thật sự cần.
SCENES.safe = () => {
  const tCan = VW('safe', 'cần').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Emergency Box with Shield & Lock
  withT(540, 600, 0, popS(E0 + 0.1), () => {
    pp(pR(-280, -90, 560, 180, 18), PR.paperW, { key: 'safe_box', sb: 16, sy: 8, tex: 0.45 });
    tmShield(-180, 0, PR.teal, 0.9);
    txt('NƠI GIỮ QUỸ KHẨN CẤP', -70, -20, 26, PR.char, { weight: 800 });
    txt('An toàn  ·  Lãi suất ổn định  ·  Dễ rút ngay', -70, 25, 20, PR.teal, { weight: 700 });
  });

  // CTA Card
  withT(540, 920, 0, popS(tCan + 0.2), () => {
    const w = 580, h = 340;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_03', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('CÒN BẠN THÌ SAO?', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('BẠN ĐÃ CÓ QUỸ KHẨN CẤP MẤY THÁNG?', 0, 5, 26, PR.char, { align: 'center', weight: 800 });
    txt('Chia sẻ cùng Tidu Money nhé! 👇', 0, 50, 22, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 85, 360, 55, 12), PR.navy, { key: 'cta_btn_03', sb: 8, sy: 4, tex: 0.4 });
    txt('BÌNH LUẬN NGAY 💬', 0, 122, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p7' });

  prSign('AN TOÀN & DỄ RÚT KHI CẦN', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'tick', t: VW('hook', 'lương').t0 },
    { k: 'chime', t: VW('reason', 'khẩn').t0 },
    { k: 'tick', t: VW('monthly', 'bốn').t0 },
    { k: 'pop', t: VW('calc', 'Ba').t0 },
    { k: 'pop', t: VW('calc', 'sáu').t0 },
    { k: 'tick', t: VW('benchmark', 'tham').t0 },
    { k: 'thud', t: VW('start', 'tiền').t0 + 0.2 },
    { k: 'chime', t: VW('safe', 'cần').t0 + 0.2 }
  ];
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
