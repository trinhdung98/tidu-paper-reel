// =====================================================================
//  TIDU MONEY 08 — "Trả tối thiểu thẻ tín dụng có nghĩa là an toàn?"
//  Theme: Credit card debt & minimum payment trap
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · TÍN DỤNG';
const SCENES = {};

// ---- HELPERS ----

// Credit Card Statement
function tmStatement(cx, cy, totalStr, minStr, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 580, h = 380;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'st_box', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 75, 16), PR.char, { shadow: false, tex: 0.35 });
    txt('💳 SAO KÊ THẺ TÍN DỤNG', 0, -h / 2 + 48, 26, PR.creamL, { align: 'center', weight: 800 });

    // Total Due
    txt('TỔNG DƯ NỢ KỲ NÀY:', 0, -35, 22, PR.greyD, { align: 'center', weight: 700 });
    txt(totalStr, 0, 15, 46, PR.char, { align: 'center', weight: 800, font: F_MONO });

    // Minimum Payment Button circled
    pp(pR(-220, 60, 440, 75, 12), '#fdf4f4', { key: 'st_min_bg', sb: 8, sy: 4, tex: 0.3 });
    ctx.save();
    ctx.strokeStyle = PR.red;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(-220, 60, 440, 75, 12);
    ctx.stroke();
    ctx.restore();
    txt('THANH TOÁN TỐI THIỂU (5%):', -200, 92, 19, PR.red, { weight: 700 });
    txt(minStr, 190, 108, 28, PR.red, { align: 'right', weight: 800, font: F_MONO });
  });
}

// Debt Split Bar: Paid vs Remaining
function tmDebtBar(cx, cy, totalW, paidPct = 5, s = 1) {
  withT(cx, cy, 0, s, () => {
    const h = 70;
    const paidW = Math.max(35, totalW * (paidPct / 100));
    const remW = totalW - paidW;

    // Paid portion (green)
    pp(pR(-totalW / 2, -h / 2, paidW, h, 8), PR.green, { key: 'db_paid', sb: 8, sy: 4, tex: 0.4 });
    txt('5% ĐÃ TRẢ', -totalW / 2 + paidW / 2, 8, 14, PR.creamL, { align: 'center', weight: 800 });

    // Remaining debt (red)
    pp(pR(-totalW / 2 + paidW + 4, -h / 2, remW - 4, h, 8), PR.red, { key: 'db_rem', sb: 12, sy: 6, tex: 0.45 });
    txt('95% DƯ NỢ CÒN LẠI VẪN TÍNH LÃI!', -totalW / 2 + paidW + remW / 2, 8, 20, PR.creamL, { align: 'center', weight: 800 });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): 0–5s: Một hóa đơn thẻ tín dụng xuất hiện, nút "Thanh toán tối thiểu" được khoanh.
SCENES.hook = () => {
  const tNo = VW('hook', 'nợ').t0;

  prWall('#2a1a24', { streak: 400 });
  prFloor(1560, PR.char, { studs: true });
  prClock(190, 420, 68, 21, 0);

  // Statement Card
  tmStatement(470, 720, '10.000.000₫', '500.000₫', popS(E0 + 0.15));
  // Stamp: "CHƯA HẾT NỢ!"
  prStamp('CHƯA HẾT NỢ!', 470, 950, PR.red, tNo + 0.2, { rot: -0.04, size: 34, from: 1.2 });
  // Piggy flat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: 'flat', look: -15, key: 'p1' });

  prSign('TRẢ TỐI THIỂU CÓ HẾT NỢ?', { kicker: KICK });
  prChips();
};

// Scene 2 (explain): Khoản thanh toán tối thiểu chỉ là số tiền tối thiểu cần trả theo sao kê để đáp ứng nghĩa vụ thanh toán kỳ đó.
SCENES.explain = () => {
  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // Definition Box
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 620, h = 380;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'exp_card', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.char, { shadow: false, tex: 0.35 });
    txt('BẢN CHẤT CỦA "TRẢ TỐI THIỂU"', 0, -h / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });

    txt('Chỉ là mức tối thiểu để ngân hàng', 0, -20, 24, PR.char, { align: 'center', weight: 700 });
    txt('KHÔNG GHI NHẬN NỢ XẤU KỲ ĐÓ!', 0, 20, 26, PR.red, { align: 'center', weight: 800 });

    pp(pR(-270, 55, 540, 65, 10), '#edf7ed', { key: 'exp_ok', shadow: false, tex: 0.3 });
    txt('✔ Giữ lịch sử tín dụng không bị phạt nợ quá hạn', 0, 96, 20, PR.green, { align: 'center', weight: 800 });
  });

  // Piggy bowler
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'neutral', look: -16, key: 'p2' });

  prSign('CHỈ LÀ MỨC DUY TRÌ NGHĨA VỤ', { kicker: KICK });
  prChips();
};

// Scene 3 (interest): Phần dư nợ chưa trả vẫn còn, và lãi có thể phát sinh theo điều khoản của thẻ.
SCENES.interest = () => {
  const tLai = VW('interest', 'lãi').t0;

  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // Debt split: 500k vs 9.500.000₫
  withT(470, 640, 0, popS(E0 + 0.15), () => {
    txt('TỔNG DƯ NỢ: 10.000.000₫', 0, -80, 28, PR.char, { align: 'center', weight: 800, font: F_MONO });
    tmDebtBar(0, 0, 580, 5);
  });

  // Warning about remaining debt
  withT(470, 880, 0, popS(tLai), () => {
    pp(pR(-280, -60, 560, 120, 16), PR.paperW, { key: 'int_alert', sb: 14, sy: 7, tex: 0.45 });
    txt('9.500.000₫ CÒN LẠI BỊ TÍNH LÃI NGAY!', 0, -10, 24, PR.red, { align: 'center', weight: 800 });
    txt('Lãi suất thẻ thường từ 20% - 40% / năm', 0, 28, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  // Piggy newsboy
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'wow', look: -15, hold: propCalc(0.08), key: 'p3' });

  prSign('DƯ NỢ CÒN LẠI VẪN TÍNH LÃI', { kicker: KICK });
  prChips();
};

// Scene 4 (accumulate): Nếu cứ duy trì dư nợ, chi phí vay có thể tăng theo thời gian.
SCENES.accumulate = () => {
  const tTang = VW('accumulate', 'tăng').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Compound Interest Trap Box
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 600, h = 380;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'acc_box', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.red, { shadow: false, tex: 0.4 });
    txt('BẪY LÃI SUẤT TÍCH LŨY', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('Nếu chỉ trả tối thiểu mỗi tháng:', 0, -15, 22, PR.greyD, { align: 'center', weight: 700 });
    txt('NỢ KÉO DÀI NHIỀU NĂM', 0, 25, 30, PR.red, { align: 'center', weight: 800 });
    txt('Tiền lãi cộng dồn có thể lớn hơn số tiền gốc đã tiêu!', 0, 70, 20, PR.char, { align: 'center', weight: 700 });
  });

  // Stamp: "CHI PHÍ TĂNG THEO THỜI GIAN"
  prStamp('LÃI TÍCH LŨY TĂNG VỌT', 470, 1020, PR.red, tTang + 0.2, { rot: -0.04, size: 32, from: 1.25 });

  // Piggy flat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -15, key: 'p4' });

  prSign('CHI PHÍ VAY TĂNG THEO THỜI GIAN', { kicker: KICK });
  prChips();
};

// Scene 5 (terms): Khi sử dụng thẻ, hãy xem kỹ ngày đến hạn, cách tính lãi, phí và điều kiện miễn lãi.
SCENES.terms = () => {
  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  const terms = [
    '1. Ngày đến hạn thanh toán',
    '2. Cách tính lãi & lãi suất áp dụng',
    '3. Các loại phí phạt chậm trả',
    '4. Điều kiện được miễn lãi 45-55 ngày'
  ];

  withT(470, 740, 0, popS(E0 + 0.15), () => {
    const w = 600, h = 440;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'terms_card', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.teal, { shadow: false, tex: 0.35 });
    txt('4 ĐIỀU KHOẢN CẦN XEM KỸ', 0, -h / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });

    terms.forEach((tm, i) => {
      const iy = -h / 2 + 125 + i * 72;
      pp(pR(-w / 2 + 30, iy, w - 60, 58, 10), '#f6f3eb', { key: 'tm_it_' + i, sb: 6, sy: 3, tex: 0.3 });
      txt(tm, -w / 2 + 55, iy + 38, 22, PR.char, { weight: 700 });
    });
  });

  // Piggy mortar pointing
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'neutral', look: -16, hold: propStick(-0.25), key: 'p5' });

  prSign('4 ĐIỀU KHOẢN CẦN XEM KỸ', { kicker: KICK });
  prChips();
};

// Scene 6 (full): Nếu có khả năng, ưu tiên thanh toán đầy đủ khoản phải trả theo sao kê đúng hạn.
SCENES.full = () => {
  const tHan = VW('full', 'hạn').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Stamp: "ƯU TIÊN TRẢ TOÀN BỘ 100%"
  prStamp('ƯU TIÊN TRẢ HẾT 100% ĐÚNG HẠN', 470, 560, PR.green, E0 + 0.1, { rot: -0.03, size: 28, from: 1.2 });

  // CTA Box
  withT(470, 880, 0, popS(tHan + 0.2), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_08', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('LÀM CHỦ THẺ TÍN DỤNG', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('LƯU VIDEO NÀY', 0, 5, 32, PR.char, { align: 'center', weight: 800 });
    txt('và kiểm tra lại điều khoản sao kê thẻ của bạn!', 0, 50, 22, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 95, 360, 52, 12), PR.navy, { key: 'cta_btn_08', sb: 8, sy: 4, tex: 0.4 });
    txt('LƯU VIDEO NGAY 🔖', 0, 130, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p6' });

  prSign('ƯU TIÊN THANH TOÁN 100%', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'tick', t: VW('hook', 'nợ').t0 },
    { k: 'chime', t: VW('explain', 'kê').t0 },
    { k: 'thud', t: VW('interest', 'lãi').t0 },
    { k: 'tick', t: VW('accumulate', 'tăng').t0 },
    { k: 'pop', t: VW('terms', 'hạn').t0 },
    { k: 'chime', t: VW('full', 'hạn').t0 + 0.2 }
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
