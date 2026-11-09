// =====================================================================
//  TIDU MONEY 06 — "Vì sao nên tiết kiệm ngay khi nhận lương?"
//  Concept: Pay Yourself First (Tiết kiệm trước - Chi tiêu sau)
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · TIẾT KIỆM';
const SCENES = {};

// ---- HELPERS ----

// A glass jar for savings
function tmJar(cx, cy, coins = 0, label = 'TIẾT KIỆM', s = 1) {
  withT(cx, cy, 0, s, () => {
    // Glass body
    pp(pR(-90, -110, 180, 220, 24), 'rgba(216,236,241,0.4)', { key: 'jar_body', sb: 12, sy: 6, tex: 0.25, rim: 'rgba(255,255,255,0.6)' });
    // Metal lid
    pp(pR(-98, -135, 196, 28, 6), '#a0a8b0', { key: 'jar_lid', sb: 6, sy: 3, tex: 0.35 });

    // Coins inside
    for (let i = 0; i < coins; i++) {
      const rx = ((i % 4) - 1.5) * 35;
      const ry = 80 - Math.floor(i / 4) * 35;
      prCoin(rx, ry, 26, 'jc_' + i);
    }

    // Label on jar
    pp(pR(-65, -30, 130, 55, 8), PR.paperW, { key: 'jar_lbl', sb: 6, sy: 3, tex: 0.35 });
    txt(label, 0, 5, 20, PR.char, { align: 'center', weight: 800 });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): 0–4s: Hũ tiết kiệm trống bên cạnh chiếc ví cuối tháng.
SCENES.hook = () => {
  prWall('#3b2d24', { streak: 400 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(190, 420, 68, 20, 0);

  // Empty jar on left
  tmJar(370, 750, 0, 'TIẾT KIỆM', popS(E0 + 0.15));

  // Flat empty wallet on right
  withT(710, 750, 0.03, popS(E0 + 0.3), () => {
    pp(pR(-140, -80, 280, 160, 14), '#8a4e25', { key: 'hk_w', sb: 14, sy: 7, tex: 0.5 });
    txt('VÍ CUỐI THÁNG', 0, -15, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('RỖNG TUẾCH (0₫)', 0, 30, 26, PR.mustard, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy visor flat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: 'flat', look: -15, key: 'p1' });

  prSign('ĐỪNG CHỜ CUỐI THÁNG TIẾT KIỆM', { kicker: KICK });
  prChips();
};

// Scene 2 (empty): Bởi khi mọi khoản chi đều lấy từ một chiếc ví, số tiền còn lại đôi khi chẳng còn bao nhiêu.
SCENES.empty = () => {
  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // Flawed formula card: LƯƠNG - CHI TIÊU = TIẾT KIỆM?
  withT(540, 720, 0, popS(E0 + 0.15), () => {
    const w = 620, h = 340;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'em_card', sb: 16, sy: 8, tex: 0.45 });
    txt('CÁCH LÀM QUEN THUỘC (NHƯNG SAI)', 0, -110, 22, PR.red, { align: 'center', weight: 800 });

    pp(pR(-270, -65, 540, 75, 12), '#fdf2f2', { key: 'em_row1', shadow: false, tex: 0.3 });
    txt('Thu nhập ➔ Chi tiêu ➔ Tiết kiệm', 0, -18, 24, PR.char, { align: 'center', weight: 700 });

    pp(pR(-270, 30, 540, 85, 12), PR.char, { shadow: false, tex: 0.35 });
    txt('KẾT QUẢ: CUỐI THÁNG HẾT SẠCH TIỀN!', 0, 82, 22, PR.red, { align: 'center', weight: 800 });
  });

  // Cross on old way
  prCross(540, 700, E0 + 0.8, 75);

  // Piggy bowler
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -16, key: 'p2' });

  prSign('VÌ SAO TIỀN KHÔNG CÒN?', { kicker: KICK });
  prChips();
};

// Scene 3 (reverse): Hãy thử đảo thứ tự: ngay khi nhận lương, dành trước một khoản phù hợp với khả năng của bạn.
SCENES.reverse = () => {
  const tDao = VW('reverse', 'đảo').t0;

  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // Reversed formula card: LƯƠNG - TIẾT KIỆM = CHI TIÊU!
  withT(540, 720, 0, popS(E0 + 0.15), () => {
    const w = 620, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'rev_card', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.green, { shadow: false, tex: 0.4 });
    txt('CÔNG THỨC THÀNH CÔNG: ĐẢO THỨ TỰ', 0, -h / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });

    pp(pR(-270, -40, 540, 85, 12), '#edf7ed', { key: 'rev_row', sb: 8, sy: 4, tex: 0.35 });
    txt('THU NHẬP  ➔  TIẾT KIỆM TRƯỚC!', 0, 14, 26, PR.green, { align: 'center', weight: 800 });

    txt('Sau đó mới chi tiêu phần còn lại', 0, 95, 24, PR.greyD, { align: 'center', weight: 700 });
  });

  // Stamp: "TIẾT KIỆM TRƯỚC"
  prStamp('TRÍCH TRƯỚC CHO MÌNH', 540, 1020, PR.green, tDao + 0.3, { rot: -0.03, size: 32, from: 1.25 });

  // Piggy mortar pointing
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'happy', look: -16, hold: propStick(-0.25), key: 'p3' });

  prSign('ĐẢO THỨ TỰ DÒNG TIỀN', { kicker: KICK });
  prChips();
};

// Scene 4 (example): Ví dụ, với thu nhập mười triệu, năm phần trăm tương đương năm trăm nghìn đồng.
SCENES.example = () => {
  const tNam = VW('example', 'trăm').t0;

  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // 10M salary with 5% = 500k flying into jar
  tmJar(340, 750, 4, 'HŨ 500K', popS(E0 + 0.15));

  withT(740, 750, 0, popS(E0 + 0.3), () => {
    pp(pR(-160, -110, 320, 220, 16), PR.paperW, { key: 'ex_sal', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-160, -110, 320, 65, 14), PR.teal, { shadow: false, tex: 0.35 });
    txt('LƯƠNG 10 TRIỆU', 0, -68, 22, PR.creamL, { align: 'center', weight: 800 });

    txt('Trích 5% thu nhập:', 0, -5, 20, PR.greyD, { align: 'center', weight: 700 });
    txt('= 500.000₫', 0, 42, 36, PR.green, { align: 'center', weight: 800, font: F_MONO });
    txt('Cất đi ngay khi nhận lương', 0, 78, 18, PR.char, { align: 'center', weight: 700 });
  });

  // Coin animation
  prCoin(540, 980, 44, 'ex_coin');

  // Piggy newsboy
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'happy', look: -15, hold: propCoin(55), key: 'p4' });

  prSign('10 TRIỆU ➔ TRÍCH 500.000₫', { kicker: KICK });
  prChips();
};

// Scene 5 (separate): Chuyển khoản ấy sang một tài khoản riêng, rồi lập ngân sách cho số tiền còn lại.
SCENES.separate = () => {
  prWall(PR.navy, { streak: 500 });
  prFloor(1560, PR.floor, { studs: true });

  // Split Accounts Box
  withT(540, 720, 0, popS(E0 + 0.15), () => {
    const w = 620, h = 380;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'sep_box', sb: 16, sy: 8, tex: 0.45 });
    txt('PHÂN TÁCH 2 TÀI KHOẢN', 0, -130, 26, PR.char, { align: 'center', weight: 800 });

    // Account 1: Savings (Không thẻ chi tiêu)
    pp(pR(-280, -80, 260, 180, 14), '#edf7ed', { key: 'sep_acc1', sb: 8, sy: 4, tex: 0.35 });
    pp(pR(-280, -80, 260, 45, 10), PR.green, { shadow: false, tex: 0.3 });
    txt('TK TIẾT KIỆM (500k)', -150, -50, 18, PR.creamL, { align: 'center', weight: 800 });
    txt('Không cài thẻ ATM', -150, 0, 18, PR.char, { align: 'center', weight: 700 });
    txt('Không tiêu lẹm vào!', -150, 38, 18, PR.green, { align: 'center', weight: 800 });

    // Account 2: Spending (9.5M)
    pp(pR(20, -80, 260, 180, 14), '#f6f3eb', { key: 'sep_acc2', sb: 8, sy: 4, tex: 0.35 });
    pp(pR(20, -80, 260, 45, 10), PR.char, { shadow: false, tex: 0.3 });
    txt('TK CHI TIÊU (9.5M)', 150, -50, 18, PR.creamL, { align: 'center', weight: 800 });
    txt('Tiền nhà, ăn uống', 150, 0, 18, PR.char, { align: 'center', weight: 700 });
    txt('Gói gọn trong mức này', 150, 38, 18, PR.greyD, { align: 'center', weight: 800 });

    txt('Giữ riêng biệt giúp bạn không bao giờ tiêu lẹm!', 0, 150, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  // Piggy tophat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'neutral', look: -15, key: 'p5' });

  prSign('TÀI KHOẢN RIÊNG BIỆT', { kicker: KICK });
  prChips();
};

// Scene 6 (startlow): Nếu hiện tại quá khó, hãy bắt đầu thấp hơn.
SCENES.startlow = () => {
  const tThap = VW('startlow', 'hơn').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Starting low cards
  const options = [
    { pct: '2%', amt: '200.000₫' },
    { pct: '3%', amt: '300.000₫' },
    { pct: '5%', amt: '500.000₫' }
  ];

  withT(540, 720, 0, popS(E0 + 0.15), () => {
    txt('BẮT ĐẦU TỪ MỨC VỪA SỨC', 0, -140, 28, PR.char, { align: 'center', weight: 800 });
    options.forEach((op, i) => {
      const ox = (i - 1) * 190;
      pp(pR(ox - 80, -70, 160, 140, 14), PR.paperW, { key: 'op_' + i, sb: 10, sy: 5, tex: 0.4 });
      txt(op.pct, ox, -20, 38, PR.mustard, { align: 'center', weight: 800 });
      txt(op.amt, ox, 32, 20, PR.char, { align: 'center', weight: 800, font: F_MONO });
    });
    txt('Không quan trọng số tiền nhiều hay ít,', 0, 120, 22, PR.greyD, { align: 'center', weight: 700 });
  });

  // Stamp: "BẮT ĐẦU TỪ BÂY GIỜ"
  prStamp('BẮT ĐẦU VỪA SỨC', 540, 980, PR.mustard, tThap + 0.2, { rot: -0.03, size: 34, from: 1.25 });

  // Piggy nonla
  piggy(PIGGY_X, PIGGY_Y, { hat: 'nonla', mood: 'happy', look: -14, hold: propCoin(55), key: 'p6' });

  prSign('BẮT ĐẦU TỪ MỨC NHỎ', { kicker: KICK });
  prChips();
};

// Scene 7 (habit): Điều quan trọng là tạo được thói quen đều đặn.
SCENES.habit = () => {
  const tDan = VW('habit', 'đặn').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Stamp: "THÓI QUEN ĐỀU ĐẶN"
  prStamp('THÓI QUEN ĐỀU ĐẶN', 540, 560, PR.mustard, E0 + 0.1, { rot: -0.03, size: 36, from: 1.25 });

  // CTA Card
  withT(540, 880, 0, popS(tDan + 0.2), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_06', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('THÓI QUEN TIẾT KIỆM', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('BẠN THÍCH TIẾT KIỆM TỰ ĐỘNG', 0, 5, 26, PR.char, { align: 'center', weight: 800 });
    txt('HAY TỰ CHUYỂN TIỀN THỦ CÔNG?', 0, 48, 26, PR.green, { align: 'center', weight: 800 });
    txt('Chia sẻ lựa chọn của bạn nhé! 👇', 0, 90, 20, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 115, 360, 50, 12), PR.navy, { key: 'cta_btn_06', sb: 8, sy: 4, tex: 0.4 });
    txt('BÌNH LUẬN NGAY 💬', 0, 148, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p7' });

  prSign('TẠO THÓI QUEN ĐỀU ĐẶN', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'tick', t: VW('empty', 'chi').t0 },
    { k: 'chime', t: VW('reverse', 'đảo').t0 },
    { k: 'pop', t: VW('example', 'trăm').t0 },
    { k: 'tick', t: VW('separate', 'riêng').t0 },
    { k: 'thud', t: VW('startlow', 'hơn').t0 + 0.2 },
    { k: 'chime', t: VW('habit', 'đặn').t0 + 0.2 }
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
