// =====================================================================
//  TIDU MONEY 09 — "Lương tăng nhưng vẫn không dư đồng nào"
//  Theme: Lifestyle Inflation / Lifestyle Creep
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · TÂM LÝ';
const SCENES = {};

// ---- HELPERS ----

// Parallel bars: Income vs Expense
function tmIncomeExpenseBars(cx, cy, incAmt, expAmt, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 580;
    // Income Bar
    pp(pR(-w / 2, -75, w, 65, 12), PR.paperW, { key: 'ie_inc_bg', sb: 10, sy: 5, tex: 0.35 });
    pp(pR(-w / 2, -75, w, 65, 12), PR.green, { key: 'ie_inc_bar', shadow: false, tex: 0.4 });
    txt('THU NHẬP:', -w / 2 + 25, -35, 20, PR.creamL, { weight: 800 });
    txt(incAmt, w / 2 - 25, -35, 24, PR.creamL, { align: 'right', weight: 800, font: F_MONO });

    // Expense Bar chasing income
    pp(pR(-w / 2, 15, w, 65, 12), PR.paperW, { key: 'ie_exp_bg', sb: 10, sy: 5, tex: 0.35 });
    pp(pR(-w / 2, 15, w, 65, 12), PR.red, { key: 'ie_exp_bar', shadow: false, tex: 0.4 });
    txt('CHI TIÊU:', -w / 2 + 25, 55, 20, PR.creamL, { weight: 800 });
    txt(expAmt, w / 2 - 25, 55, 24, PR.creamL, { align: 'right', weight: 800, font: F_MONO });

    // Gap result
    txt('CHÊNH LỆCH TIẾT KIỆM = 0₫!', 0, 125, 26, PR.red, { align: 'center', weight: 800, font: F_MONO });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): 0–5s: Thu nhập tăng từ 10 lên 13 triệu.
SCENES.hook = () => {
  const tKhong = VW('hook', 'không').t0;

  prWall('#2a1a24', { streak: 400 });
  prFloor(1560, PR.char, { studs: true });
  prClock(190, 420, 68, 11, 0);

  // Income Jump card
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 580, h = 340;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'hk_jump', sb: 16, sy: 8, tex: 0.45 });
    txt('LƯƠNG TĂNG THÊM +3 TRIỆU!', 0, -100, 28, PR.green, { align: 'center', weight: 800 });

    pp(pR(-250, -50, 500, 80, 12), '#edf7ed', { key: 'hk_sal', sb: 8, sy: 4, tex: 0.35 });
    txt('10 TRIỆU  ➔  13.000.000₫', 0, 2, 34, PR.green, { align: 'center', weight: 800, font: F_MONO });

    pp(pR(-250, 55, 500, 75, 12), '#fdf2f2', { key: 'hk_sav', sb: 8, sy: 4, tex: 0.35 });
    txt('TIẾT KIỆM CUỐI THÁNG = 0₫?', 0, 102, 24, PR.red, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy with visor flat/shocked
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: TT < tKhong ? 'happy' : 'wow', look: -15, key: 'p1' });

  prSign('LƯƠNG TĂNG 3 TRIỆU: TIỀN ĐÂU?', { kicker: KICK });
  prChips();
};

// Scene 2 (upgrade): Khi thu nhập tăng, chúng ta thường nâng mức sống: gọi đồ ăn nhiều hơn, mua sắm thoải mái hơn, sử dụng thêm dịch vụ.
SCENES.upgrade = () => {
  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  const upgrades = [
    { title: 'Ăn ngoài & gọi món xịn hơn', cost: '+1.000.000₫', ic: '🍽️' },
    { title: 'Mua sắm quần áo thoải mái hơn', cost: '+1.200.000₫', ic: '🛍️' },
    { title: 'Đăng ký thêm gói dịch vụ cao cấp', cost: '+800.000₫', ic: '✨' }
  ];

  withT(470, 740, 0, popS(E0 + 0.15), () => {
    const w = 600, h = 460;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'up_card', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.char, { shadow: false, tex: 0.35 });
    txt('CHI TIÊU TỰ ĐỘNG TĂNG THEO LƯƠNG', 0, -h / 2 + 52, 24, PR.creamL, { align: 'center', weight: 800 });

    upgrades.forEach((ug, i) => {
      const iy = -h / 2 + 125 + i * 105;
      pp(pR(-w / 2 + 25, iy, w - 50, 85, 12), '#f6f3eb', { key: 'ug_it_' + i, sb: 6, sy: 3, tex: 0.35 });
      txt(ug.ic, -w / 2 + 65, iy + 52, 32, PR.char, { align: 'center' });
      txt(ug.title, -w / 2 + 115, iy + 36, 22, PR.char, { weight: 700 });
      txt(ug.cost, -w / 2 + 115, iy + 68, 22, PR.red, { weight: 800, font: F_MONO });
    });
  });

  // Piggy newsboy
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'neutral', look: -15, key: 'p2' });

  prSign('CHI TIÊU NÂNG CẤP THEO THU NHẬP', { kicker: KICK });
  prChips();
};

// Scene 3 (creep): Hiện tượng chi tiêu tăng theo thu nhập thường được gọi là lạm phát lối sống.
SCENES.creep = () => {
  const tSong = VW('creep', 'sống').t0;

  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // Parallel Bars
  tmIncomeExpenseBars(470, 680, '13.000.000₫', '13.000.000₫', popS(E0 + 0.15));

  // Stamp: "LẠM PHÁT LỐI SỐNG"
  prStamp('LẠM PHÁT LỐI SỐNG', 470, 960, PR.red, tSong + 0.2, { rot: -0.04, size: 36, from: 1.3 });

  // Piggy bowler flat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -16, key: 'p3' });

  prSign('BẪY LẠM PHÁT LỐI SỐNG', { kicker: KICK });
  prChips();
};

// Scene 4 (enjoy): Tận hưởng thành quả lao động là điều bình thường.
SCENES.enjoy = () => {
  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // Affirmation card
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 580, h = 320;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'en_card', sb: 16, sy: 8, tex: 0.45 });
    txt('TẬN HƯỞNG LÀ HOÀN TOÀN XỨNG ĐÁNG', 0, -85, 26, PR.char, { align: 'center', weight: 800 });
    txt('Bạn làm việc chăm chỉ để có cuộc sống tốt hơn.', 0, -25, 22, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-240, 20, 480, 80, 12), '#edf7ed', { key: 'en_ok', shadow: false, tex: 0.3 });
    txt('✔ Nhưng cần có chiến lược phân bổ thông minh!', 0, 70, 20, PR.green, { align: 'center', weight: 800 });
  });

  // Piggy happy
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'happy', look: -15, hold: propCoin(55), key: 'p4' });

  prSign('TẬN HƯỞNG THÀNH QUẢ', { kicker: KICK });
  prChips();
};

// Scene 5 (goals): Nhưng trước khi nâng chi tiêu, hãy quyết định dành bao nhiêu phần của khoản tăng lương cho các mục tiêu dài hạn.
SCENES.goals = () => {
  const tHan = VW('goals', 'hạn').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // 50/50 Split Rule for Salary Raise
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 600, h = 420;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'gl_box', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.green, { shadow: false, tex: 0.4 });
    txt('QUY TẮC CHIA KHOẢN TĂNG THÊM (+3M)', 0, -h / 2 + 52, 24, PR.creamL, { align: 'center', weight: 800 });

    // 50% Goals
    pp(pR(-270, -75, 540, 110, 14), '#edf7ed', { key: 'gl_part1', sb: 6, sy: 3, tex: 0.35 });
    txt('50% (1.5 TRIỆU) ➔ MỤC TIÊU DÀI HẠN', -245, -30, 22, PR.green, { weight: 800 });
    txt('Tích lũy quỹ khẩn cấp, đầu tư tương lai', -245, 5, 19, PR.greyD, { weight: 700 });

    // 50% Upgrade
    pp(pR(-270, 55, 540, 110, 14), '#f6f3eb', { key: 'gl_part2', sb: 6, sy: 3, tex: 0.35 });
    txt('50% (1.5 TRIỆU) ➔ NÂNG CAO ĐỜI SỐNG', -245, 100, 22, PR.char, { weight: 800 });
    txt('Tự thưởng, mua sắm và ăn uống thoải mái hơn', -245, 135, 19, PR.greyD, { weight: 700 });
  });

  // Stamp: "VỪA TIẾT KIỆM VỪA TẬN HƯỞNG"
  prStamp('CÂN BẰNG TẬN HƯỞNG', 470, 1040, PR.green, tHan + 0.2, { rot: -0.03, size: 30, from: 1.25 });

  // Piggy mortar pointing
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'happy', look: -16, hold: propStick(-0.25), key: 'p5' });

  prSign('CHIA ĐÔI KHOẢN TĂNG THÊM', { kicker: KICK });
  prChips();
};

// Scene 6 (better): Như vậy, thu nhập cao hơn không chỉ mang lại nhiều món đồ hơn, mà còn giúp bạn có nền tảng tài chính tốt hơn.
SCENES.better = () => {
  const tHon = VW('better', 'hơn', 1).t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Stamp: "NỀN TẢNG BỀN VỮNG"
  prStamp('NỀN TẢNG TÀI CHÍNH TỐT HƠN', 470, 560, PR.mustard, E0 + 0.1, { rot: -0.03, size: 30, from: 1.2 });

  // CTA Card
  withT(470, 880, 0, popS(tHon + 0.2), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_09', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('GÓC CHIA SẺ', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('LẦN TĂNG LƯƠNG GẦN NHẤT,', 0, 0, 26, PR.char, { align: 'center', weight: 800 });
    txt('BẠN ĐÃ LÀM GÌ VỚI SỐ TIỀN ĐÓ?', 0, 45, 26, PR.green, { align: 'center', weight: 800 });
    txt('Tăng tiết kiệm hay nâng cấp mức sống? Bình luận nhé! 👇', 0, 90, 19, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 115, 360, 50, 12), PR.navy, { key: 'cta_btn_09', sb: 8, sy: 4, tex: 0.4 });
    txt('BÌNH LUẬN NGAY 💬', 0, 148, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p6' });

  prSign('XÂY DỰNG NỀN TẢNG BỀN VỮNG', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'tick', t: VW('hook', 'không').t0 },
    { k: 'pop', t: VW('upgrade', 'hơn').t0 },
    { k: 'thud', t: VW('creep', 'sống').t0 + 0.2 },
    { k: 'chime', t: VW('enjoy', 'thường').t0 },
    { k: 'tick', t: VW('goals', 'hạn').t0 },
    { k: 'chime', t: VW('better', 'hơn', 1).t0 + 0.2 }
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
