// =====================================================================
//  TIDU MONEY 02 — "Lương 10 triệu nên chia thế nào?"
//  Rule: 50 / 30 / 20 envelope budgeting
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · NGÂN SÁCH';
const SCENES = {};

// ---- HELPERS ----

// A paper envelope at (cx, cy)
function tmEnvelope(cx, cy, w, h, title, amount, color, s = 1, openFrac = 0) {
  withT(cx, cy, 0, s, () => {
    // Back of envelope
    pp(pR(-w / 2, -h / 2, w, h, 14), color, { key: 'env_b_' + title, sb: 14, sy: 7, tex: 0.45 });
    // Paper letter / bills sliding out when open
    if (openFrac > 0) {
      const ly = -h / 2 - openFrac * 90;
      pp(pR(-w / 2 + 18, ly, w - 36, 110, 8), PR.paperW, { key: 'env_doc_' + title, sb: 8, sy: 4, tex: 0.35 });
      txt(amount, 0, ly + 65, 30, color, { align: 'center', weight: 800, font: F_MONO });
    }
    // Front pocket triangle folds
    ctx.save();
    ctx.fillStyle = '#fdfbf7';
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 2 + 20);
    ctx.lineTo(0, h / 2 - 30);
    ctx.lineTo(w / 2, -h / 2 + 20);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Top flap: closed or opening up
    if (openFrac === 0) {
      pp(pG([[-w / 2, -h / 2], [w / 2, -h / 2], [0, 10]]), '#eedbc0', { key: 'env_flap_' + title, sb: 8, sy: 4, tex: 0.4 });
    }

    // Title badge on front
    pp(pR(-w / 2 + 20, h / 2 - 65, w - 40, 50, 8), color, { shadow: false, tex: 0.3 });
    txt(title, 0, h / 2 - 30, 22, PR.creamL, { align: 'center', weight: 800 });
  });
}

// 50/30/20 Ratio bar
function tmRatioBar(cx, cy, w, h, r1 = 0.5, r2 = 0.3, r3 = 0.2, s = 1) {
  withT(cx, cy, 0, s, () => {
    const x0 = -w / 2;
    const w1 = w * r1, w2 = w * r2, w3 = w * r3;
    // Segment 1: 50%
    pp(pR(x0, -h / 2, w1 - 4, h, 10), PR.green, { key: 'rb1', sb: 10, sy: 5, tex: 0.4 });
    txt(`${Math.round(r1 * 100)}%`, x0 + w1 / 2, 12, 32, PR.creamL, { align: 'center', weight: 800 });

    // Segment 2: 30%
    pp(pR(x0 + w1 + 2, -h / 2, w2 - 4, h, 10), PR.mustard, { key: 'rb2', sb: 10, sy: 5, tex: 0.4 });
    txt(`${Math.round(r2 * 100)}%`, x0 + w1 + w2 / 2, 12, 32, PR.char, { align: 'center', weight: 800 });

    // Segment 3: 20%
    pp(pR(x0 + w1 + w2 + 2, -h / 2, w3 - 2, h, 10), PR.blue, { key: 'rb3', sb: 10, sy: 5, tex: 0.4 });
    txt(`${Math.round(r3 * 100)}%`, x0 + w1 + w2 + w3 / 2, 12, 32, PR.creamL, { align: 'center', weight: 800 });
  });
}

// Detailed Envelope breakdown card
function tmEnvelopeBreakdown(cx, cy, title, percentStr, amountStr, color, items, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 620, h = 460;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'eb_' + title, sb: 18, sy: 9, tex: 0.45 });
    // Header banner
    pp(pR(-w / 2, -h / 2, w, 95, 16), color, { shadow: false, tex: 0.4 });
    txt(title, -w / 2 + 30, -h / 2 + 60, 28, PR.creamL, { weight: 800 });
    txt(`${percentStr} · ${amountStr}`, w / 2 - 30, -h / 2 + 60, 24, PR.creamL, { align: 'right', weight: 800, font: F_MONO });

    // Items list
    items.forEach((it, i) => {
      const iy = -h / 2 + 150 + i * 95;
      pp(pR(-w / 2 + 24, iy, w - 48, 76, 12), '#f6f3eb', { key: 'eb_it_' + title + i, sb: 6, sy: 3, tex: 0.35 });
      txt(it.name, -w / 2 + 45, iy + 48, 23, PR.char, { weight: 700 });
      txt(it.cost, w / 2 - 45, iy + 48, 24, color, { align: 'right', weight: 800, font: F_MONO });
    });
  });
}

// Scene 1 (hook): 0–4s: Tờ 10 triệu nằm giữa màn hình, ba chiếc phong bì giấy xuất hiện.
SCENES.hook = () => {
  const tMuoi = VW('hook', 'mười').t0;
  const tTien = VW('hook', 'tiền').t0;
  prWall(PR.plum, { streak: 400 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(190, 420, 68, 10, 0);

  // Big 10.000.000 banknote in center
  withT(540, 650, -0.02, popS(E0 + 0.1), () => {
    pp(pR(-260, -110, 520, 220, 16), '#8fc28a', { key: 'hk_bill', sb: 18, sy: 9, tex: 0.5 });
    pp(pR(-240, -95, 480, 190, 12), '#a9d6a0', { shadow: false, tex: 0.4 });
    pp(pE(170, 0, 45, 55), PR.moneyD, { shadow: false, tex: 0.3 });
    txt('LƯƠNG HÀNG THÁNG', -200, -35, 26, PR.moneyK, { weight: 700 });
    txt('10.000.000₫', -200, 45, 62, PR.moneyK, { weight: 800, font: F_MONO });
  });

  // Three paper envelopes below
  const envPop = popS(tMuoi + 0.3);
  tmEnvelope(290, 1000, 200, 140, 'THIẾT YẾU', '5 TRIỆU', PR.green, envPop);
  tmEnvelope(540, 1000, 200, 140, 'MONG MUỐN', '3 TRIỆU', PR.mustard, envPop);
  tmEnvelope(790, 1000, 200, 140, 'TIẾT KIỆM', '2 TRIỆU', PR.blue, envPop);

  // Piggy with visor
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: TT < tTien ? 'neutral' : 'happy', look: -15, key: 'p1' });

  prSign('LƯƠNG 10 TRIỆU CHIA THẾ NÀO?', { kicker: KICK });
  prChips();
};

// Scene 2 (rule): Bạn có thể bắt đầu bằng quy tắc năm mươi, ba mươi, hai mươi.
SCENES.rule = () => {
  const tRule = VW('rule', 'quy').t0;

  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // Ratio bar
  tmRatioBar(540, 620, 680, 110, 0.5, 0.3, 0.2, popS(E0 + 0.15));

  // 3 Category Cards
  const cards = [
    { title: 'THIẾT YẾU', pct: '50%', amt: '5.000.000₫', col: PR.green, x: 270 },
    { title: 'MONG MUỐN', pct: '30%', amt: '3.000.000₫', col: PR.mustard, x: 540 },
    { title: 'TIẾT KIỆM', pct: '20%', amt: '2.000.000₫', col: PR.blue, x: 810 }
  ];

  cards.forEach((c, i) => {
    withT(c.x, 880, 0, popS(tRule + i * 0.2), () => {
      pp(pR(-120, -110, 240, 220, 14), PR.paperW, { key: 'r_c_' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pR(-120, -110, 240, 60, 12), c.col, { shadow: false, tex: 0.35 });
      txt(c.title, 0, -70, 22, PR.creamL, { align: 'center', weight: 800 });
      txt(c.pct, 0, 5, 52, c.col, { align: 'center', weight: 800, font: F_MONO });
      txt(c.amt, 0, 65, 22, PR.char, { align: 'center', weight: 800, font: F_MONO });
    });
  });

  // Piggy with mortar hat pointing
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'happy', look: -16, hold: propStick(-0.25), key: 'p2' });

  prSign('QUY TẮC 50 / 30 / 20', { kicker: KICK });
  prChips();
};

// Scene 3 (needs): Năm triệu cho những khoản thiết yếu như nhà ở, ăn uống và đi lại.
SCENES.needs = () => {
  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  const items = [
    { name: 'Tiền thuê nhà & dịch vụ', cost: '2.500.000₫' },
    { name: 'Ăn uống & nấu nướng', cost: '1.800.000₫' },
    { name: 'Xăng xe & di chuyển', cost: '700.000₫' }
  ];
  tmEnvelopeBreakdown(540, 780, 'CHI PHÍ THIẾT YẾU', '50%', '5 TRIỆU', PR.green, items, popS(E0 + 0.15));

  // Piggy bowler
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'neutral', look: -16, key: 'p3' });

  prSign('50% · KHOẢN THIẾT YẾU', { kicker: KICK });
  prChips();
};

// Scene 4 (wants): Ba triệu cho những điều bạn muốn, như giải trí hay mua sắm.
SCENES.wants = () => {
  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });
  const items = [
    { name: 'Cà phê & bạn bè', cost: '1.200.000₫' },
    { name: 'Mua sắm cá nhân', cost: '1.000.000₫' },
    { name: 'Sở thích giải trí', cost: '800.000₫' }
  ];
  tmEnvelopeBreakdown(540, 780, 'MONG MUỐN CÁ NHÂN', '30%', '3 TRIỆU', PR.mustard, items, popS(E0 + 0.15));

  // Piggy newsboy holding coin
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'happy', look: -15, hold: propCoin(52), key: 'p4' });
  prSign('30% · THEO MONG MUỐN', { kicker: KICK });
  prChips();
};

// Scene 5 (savings): Hai triệu dành cho tiết kiệm hoặc mục tiêu trả nợ.
SCENES.savings = () => {
  const tNo = VW('savings', 'nợ').t0;

  prWall(PR.navy, { streak: 500 });
  prFloor(1560, PR.floor, { studs: true });

  const items = [
    { name: 'Tích lũy quỹ khẩn cấp', cost: '1.000.000₫' },
    { name: 'Trả nợ hoặc đầu tư', cost: '1.000.000₫' }
  ];
  tmEnvelopeBreakdown(540, 750, 'TIẾT KIỆM & TRẢ NỢ', '20%', '2 TRIỆU', PR.blue, items, popS(E0 + 0.15));

  // Gold coin drop into jar
  prCoin(540, 1080, 48, 's_coin');
  prStamp('TÍCH LŨY DÀI HẠN', 540, 1170, PR.blue, tNo + 0.2, { rot: -0.04, size: 30, from: 1.25 });

  // Piggy tophat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'happy', look: -14, hold: propCoin(55), key: 'p5' });

  prSign('20% · TIẾT KIỆM & TRẢ NỢ', { kicker: KICK });
  prChips();
};

// Scene 6 (adjust): Nhưng đây chỉ là điểm xuất phát, không phải công thức bắt buộc.
SCENES.adjust = () => {
  const tBat = VW('adjust', 'buộc').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Ratio comparisons: Standard 50-30-20 vs Adjusted 55-25-20
  withT(540, 600, 0, popS(E0 + 0.1), () => {
    pp(pR(-300, -80, 600, 160, 16), PR.paperW, { key: 'adj_1', sb: 12, sy: 6, tex: 0.4 });
    txt('CÔNG THỨC THAM KHẢO', 0, -42, 22, PR.greyD, { align: 'center', weight: 700 });
    tmRatioBar(0, 16, 540, 70, 0.5, 0.3, 0.2);
  });

  withT(540, 840, 0, popS(E0 + 0.3), () => {
    pp(pR(-300, -80, 600, 160, 16), PR.paperW, { key: 'adj_2', sb: 12, sy: 6, tex: 0.4 });
    txt('HOÀN TOÀN CÓ THỂ LINH HOẠT', 0, -42, 22, PR.green, { align: 'center', weight: 800 });
    tmRatioBar(0, 16, 540, 70, 0.55, 0.25, 0.2);
  });

  // Stamp: "KHÔNG BẮT BUỘC"
  prStamp('KHÔNG BẮT BUỘC', 540, 1060, PR.red, tBat + 0.1, { rot: -0.06, size: 44, from: 1.3 });

  // Piggy flat/thinking
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -15, key: 'p6' });

  prSign('ĐIỂM XUẤT PHÁT LINH HOẠT', { kicker: KICK });
  prChips();
};

// Scene 7 (rent): Nếu tiền thuê nhà quá cao, bạn cần điều chỉnh theo hoàn cảnh của mình.
SCENES.rent = () => {
  const tMinh = VW('rent', 'mình').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Large house scenario: 60% Needs - 25% Wants - 15% Savings
  withT(540, 620, 0, popS(E0 + 0.15), () => {
    pp(pR(-300, -110, 600, 220, 16), PR.paperW, { key: 'rent_card', sb: 14, sy: 7, tex: 0.45 });
    txt('🏠 KHI TIỀN THUÊ NHÀ CAO', 0, -60, 26, PR.char, { align: 'center', weight: 800 });
    tmRatioBar(0, 5, 540, 75, 0.6, 0.25, 0.15);
    txt('Thiết yếu: 60%  ·  Mong muốn: 25%  ·  Tiết kiệm: 15%', 0, 75, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  // Stamp: "ĐIỀU CHỈNH THEO THỰC TẾ"
  prStamp('ĐIỀU CHỈNH THEO THỰC TẾ', 540, 890, PR.moneyK, tMinh + 0.2, { rot: -0.03, size: 30, from: 1.25 });

  // Piggy nonla
  piggy(PIGGY_X, PIGGY_Y, { hat: 'nonla', mood: 'happy', look: -14, hold: propCoin(55), key: 'p7' });

  prSign('ĐIỀU CHỈNH THEO THỰC TẾ', { kicker: KICK });
  prChips();
};

// Scene 8 (purpose): Quan trọng nhất là mỗi đồng tiền đều có mục đích.
SCENES.purpose = () => {
  const tDich = VW('purpose', 'đích').t0;

  prWall(PR.navyD, { streak: 500 });
  prFloor(1560, PR.char, { studs: true });

  // Stamp: "MỖI ĐỒNG TIỀN ĐỀU CÓ MỤC ĐÍCH"
  prStamp('MỖI ĐỒNG TIỀN ĐỀU CÓ MỤC ĐÍCH', 540, 560, PR.mustard, E0 + 0.1, { rot: -0.02, size: 28, from: 1.2 });

  // CTA Card
  withT(540, 880, 0, popS(tDich + 0.2), () => {
    const w = 580, h = 380;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_02', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 85, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('BẠN MUỐN XEM TIẾP?', 0, -h / 2 + 54, 30, PR.creamL, { align: 'center', weight: 800 });

    txt('LƯƠNG 7 TRIỆU HAY 15 TRIỆU?', 0, 5, 34, PR.char, { align: 'center', weight: 800 });
    txt('Bình luận con số của bạn nhé! 👇', 0, 55, 24, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 95, 360, 55, 12), PR.navy, { key: 'cta_btn_02', sb: 8, sy: 4, tex: 0.4 });
    txt('BÌNH LUẬN NGAY 💬', 0, 132, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p8' });

  prSign('MỤC ĐÍCH CHO MỌI ĐỒNG TIỀN', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'pop', t: VW('hook', 'mười').t0 + 0.3 },
    { k: 'chime', t: VW('rule', 'quy').t0 },
    { k: 'tick', t: VW('needs', 'khoản').t0 },
    { k: 'tick', t: VW('wants', 'muốn').t0 },
    { k: 'tick', t: VW('savings', 'kiệm').t0 },
    { k: 'thud', t: VW('adjust', 'buộc').t0 + 0.1 },
    { k: 'thud', t: VW('rent', 'mình').t0 + 0.2 },
    { k: 'chime', t: VW('purpose', 'đích').t0 + 0.2 }
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
