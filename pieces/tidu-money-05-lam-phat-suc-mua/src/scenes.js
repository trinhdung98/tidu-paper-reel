// =====================================================================
//  TIDU MONEY 05 — "Vì sao 100 nghìn mua được ít đồ hơn?"
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · LẠM PHÁT';
const SCENES = {};

// ---- HELPERS ----

// A supermarket basket with groceries
function tmBasket(cx, cy, fillLevel = 1, s = 1) {
  withT(cx, cy, 0, s, () => {
    // Basket body
    ctx.save();
    ctx.shadowColor = 'rgba(12,10,8,0.25)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 7;
    ctx.fillStyle = PR.red;
    ctx.beginPath();
    ctx.moveTo(-160, -60);
    ctx.lineTo(160, -60);
    ctx.lineTo(130, 80);
    ctx.lineTo(-130, 80);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Groceries inside based on fillLevel (1 = full, 0.7 = less)
    if (fillLevel > 0.5) {
      // Bread baguette
      pp(pR(-90, -110, 45, 90, 8), '#d79b5c', { key: 'bk_bread', sb: 6, sy: 3, tex: 0.4 });
      // Milk carton
      pp(pR(-35, -125, 55, 105, 6), PR.paperW, { key: 'bk_milk', sb: 8, sy: 4, tex: 0.35 });
      txt('SỮA', -8, -65, 16, PR.blue, { align: 'center', weight: 800 });
      // Apples / Eggs
      pp(pE(55, -70, 26, 26), PR.green, { key: 'bk_app', sb: 6, sy: 3, tex: 0.3 });
    }
    if (fillLevel >= 0.9) {
      // Extra cereal box
      pp(pR(70, -115, 48, 85, 6), PR.mustard, { key: 'bk_extra', sb: 6, sy: 3, tex: 0.4 });
    }

    // Grid lines on basket
    ctx.save();
    ctx.strokeStyle = '#a9322a';
    ctx.lineWidth = 4;
    for (let x = -110; x <= 110; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x * 1.15, -50);
      ctx.lineTo(x * 0.9, 70);
      ctx.stroke();
    }
    ctx.strokeRect(-150, -55, 300, 10);
    ctx.restore();

    // Handle
    pp(pA(0, -55, 90, Math.PI, TAU), '#8a2520', { key: 'bk_handle', shadow: false, tex: 0.3 });
  });
}

// Purchasing power ruler
function tmPurchasingRuler(cx, cy, w, ratio = 1, s = 1) {
  withT(cx, cy, 0, s, () => {
    const actW = w * ratio;
    // Ruler base
    pp(pR(-w / 2, -35, actW, 70, 10), PR.mustard, { key: 'rul_base', sb: 12, sy: 6, tex: 0.4 });
    // Ticks
    ctx.save();
    ctx.strokeStyle = PR.char;
    ctx.lineWidth = 3;
    for (let x = -w / 2 + 15; x < -w / 2 + actW - 10; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, -30);
      ctx.lineTo(x, -10);
      ctx.stroke();
    }
    ctx.restore();

    txt(`SỨC MUA: ${Math.round(ratio * 100)}%`, -w / 2 + actW / 2, 22, 26, PR.char, { align: 'center', weight: 800 });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): 0–4s: Một giỏ hàng đầy với nhãn 100.000đ.
SCENES.hook = () => {
  const tVoi = VW('hook', 'vơi').t0;

  prWall('#2c3e50', { streak: 400 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(190, 420, 68, 17, 30);

  // Grocery basket
  tmBasket(470, 720, 1, popS(E0 + 0.15));

  // Tag 100.000₫
  withT(470, 960, 0, popS(E0 + 0.3), () => {
    pp(pR(-180, -45, 360, 90, 14), PR.mustard, { key: 'hk_tag', sb: 14, sy: 7, tex: 0.45 });
    txt('GIÁ TRỊ GIỎ HÀNG', 0, -12, 22, PR.char, { align: 'center', weight: 800 });
    txt('100.000₫', 0, 32, 42, PR.char, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy with visor
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: TT < tVoi ? 'neutral' : 'wow', look: -15, key: 'p1' });

  prSign('CÙNG 100 NGHÌN · GIỎ HÀNG VƠI ĐI?', { kicker: KICK });
  prChips();
};

// Scene 2 (reason): Một lý do có thể là lạm phát.
SCENES.reason = () => {
  const tPhat = VW('reason', 'phát').t0;

  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // Big Inflation banner with rising arrow
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    pp(pR(-280, -110, 560, 220, 18), PR.paperW, { key: 'rs_card', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-280, -110, 560, 80, 16), PR.red, { shadow: false, tex: 0.4 });
    txt('KHÁI NIỆM KINH TẾ', 0, -58, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('LẠM PHÁT (INFLATION)', 0, 20, 34, PR.red, { align: 'center', weight: 800 });
    txt('Giá cả hàng hóa tăng dần theo thời gian', 0, 65, 22, PR.greyD, { align: 'center', weight: 700 });
  });

  // Up arrow stamp
  prStamp('GIÁ CẢ TĂNG LÊN 📈', 470, 980, PR.red, tPhat + 0.1, { rot: -0.04, size: 34, from: 1.25 });

  // Piggy with bowler hat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -16, key: 'p2' });

  prSign('LÝ DO: LẠM PHÁT', { kicker: KICK });
  prChips();
};

// Scene 3 (example): Hãy tưởng tượng giá của một giỏ hàng tăng ba phần trăm trong một năm.
SCENES.example = () => {
  const tBa = VW('example', 'ba').t0;

  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // 1-Year timeline comparison
  withT(470, 680, 0, popS(E0 + 0.15), () => {
    const w = 600, h = 340;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'ex_box', sb: 16, sy: 8, tex: 0.45 });
    txt('GIẢ ĐỊNH LẠM PHÁT 3% / NĂM', 0, -110, 26, PR.char, { align: 'center', weight: 800 });

    // Left: Năm nay 100k
    pp(pR(-250, -60, 220, 150, 12), '#f6f3eb', { key: 'ex_y1', sb: 6, sy: 3, tex: 0.35 });
    txt('NĂM NAY', -140, -15, 22, PR.greyD, { align: 'center', weight: 700 });
    txt('100.000₫', -140, 40, 30, PR.green, { align: 'center', weight: 800, font: F_MONO });

    // Arrow
    txt('➔', 0, 15, 40, PR.red, { align: 'center', weight: 800 });

    // Right: Năm sau 103k
    pp(pR(30, -60, 220, 150, 12), '#fdf4f4', { key: 'ex_y2', sb: 8, sy: 4, tex: 0.35 });
    txt('NĂM SAU (+3%)', 140, -15, 22, PR.red, { align: 'center', weight: 800 });
    txt('103.000₫', 140, 40, 30, PR.red, { align: 'center', weight: 800, font: F_MONO });
  });

  // Stamp "+3%"
  prStamp('+3.000₫ / NĂM', 470, 950, PR.red, tBa + 0.2, { rot: -0.03, size: 34, from: 1.25 });

  // Piggy mortar pointing
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'neutral', look: -16, hold: propStick(-0.25), key: 'p3' });

  prSign('LẠM PHÁT GIẢ ĐỊNH 3%', { kicker: KICK });
  prChips();
};

// Scene 4 (price): Giỏ hàng từng có giá một trăm nghìn, nay cần một trăm linh ba nghìn để mua đúng những món ấy.
SCENES.price = () => {
  const tLinh = VW('price', 'linh').t0;

  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Visual Basket with Price Increase
  tmBasket(470, 680, 1, 1.1);

  // Price tag morphing to 103.000₫
  withT(470, 940, 0, popS(E0 + 0.2), () => {
    pp(pR(-240, -50, 480, 100, 14), PR.paperW, { key: 'pr_tag_box', sb: 14, sy: 7, tex: 0.45 });
    txt('GIÁ MỚI ĐỂ MUA ĐÚNG GIỎ ĐÓ:', 0, -12, 22, PR.greyD, { align: 'center', weight: 700 });
    txt('103.000₫', 0, 30, 42, PR.red, { align: 'center', weight: 800, font: F_MONO });
  });

  // Extra cost chip
  withT(470, 1080, 0, popS(tLinh), () => {
    pp(pR(-180, -32, 360, 64, 10), PR.mustard, { key: 'pr_extra', sb: 8, sy: 4, tex: 0.4 });
    txt('CẦN THÊM 3.000₫!', 0, 10, 24, PR.char, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy newsboy
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'wow', look: -15, key: 'p4' });

  prSign('100.000₫ ➔ 103.000₫', { kicker: KICK });
  prChips();
};

// Scene 5 (same): Trong khi đó, số tiền bạn giữ nguyên vẫn là một trăm nghìn. Nghĩa là sức mua đã giảm.
SCENES.same = () => {
  const tGiam = VW('same', 'giảm').t0;

  prWall(PR.navy, { streak: 500 });
  prFloor(1560, PR.floor, { studs: true });

  // Basket with missing item (fillLevel = 0.7)
  tmBasket(470, 620, 0.7, 1);

  // Purchasing power ruler shrinking
  const rulerRatio = TT < tGiam ? 1 : 0.85;
  tmPurchasingRuler(470, 860, 560, rulerRatio, popS(E0 + 0.2));

  // Stamp: "SỨC MUA ĐÃ GIẢM"
  prStamp('SỨC MUA ĐÃ GIẢM', 470, 990, PR.red, tGiam + 0.1, { rot: -0.04, size: 34, from: 1.25 });

  // Piggy flat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'flat', look: -16, key: 'p5' });

  prSign('SỨC MUA ĐÃ GIẢM', { kicker: KICK });
  prChips();
};

// Scene 6 (disclaimer): Ba phần trăm ở đây chỉ là ví dụ, không phải mức lạm phát hiện tại.
SCENES.disclaimer = () => {
  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Note card
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'disc_card', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.char, { shadow: false, tex: 0.35 });
    txt('LƯU Ý QUAN TRỌNG', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('3% là con số giả định minh họa', 0, 0, 26, PR.char, { align: 'center', weight: 800 });
    txt('Tỷ lệ thực tế phụ thuộc từng thời kỳ', 0, 48, 22, PR.greyD, { align: 'center', weight: 700 });
    txt('và từng nhóm hàng hóa khác nhau.', 0, 85, 22, PR.greyD, { align: 'center', weight: 700 });
  });

  // Piggy nonla
  piggy(PIGGY_X, PIGGY_Y, { hat: 'nonla', mood: 'neutral', look: -14, key: 'p6' });

  prSign('CON SỐ VÍ DỤ MINH HỌA', { kicker: KICK });
  prChips();
};

// Scene 7 (plan): Hiểu lạm phát giúp bạn suy nghĩ đúng hơn về thu nhập, tiết kiệm và những kế hoạch dài hạn.
SCENES.plan = () => {
  const tHan = VW('plan', 'hạn').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Stamp: "KẾ HOẠCH DÀI HẠN"
  prStamp('KẾ HOẠCH DÀI HẠN', 470, 560, PR.mustard, E0 + 0.1, { rot: -0.03, size: 34, from: 1.25 });

  // CTA Card
  withT(470, 880, 0, popS(tHan + 0.2), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_05', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('HIỂU KINH TẾ DỄ DÀNG', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('THEO DÕI TIDU MONEY', 0, 5, 32, PR.char, { align: 'center', weight: 800 });
    txt('để hiểu thêm các khái niệm kinh tế qua hình ảnh!', 0, 50, 22, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 95, 360, 52, 12), PR.navy, { key: 'cta_btn_05', sb: 8, sy: 4, tex: 0.4 });
    txt('THEO DÕI NGAY 🔔', 0, 130, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p7' });

  prSign('HIỂU ĐÚNG ĐỂ KẾ HOẠCH TỐT', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'pop', t: VW('hook', 'vơi').t0 },
    { k: 'chime', t: VW('reason', 'phát').t0 },
    { k: 'tick', t: VW('example', 'ba').t0 },
    { k: 'pop', t: VW('price', 'linh').t0 },
    { k: 'thud', t: VW('same', 'giảm').t0 + 0.1 },
    { k: 'chime', t: VW('plan', 'hạn').t0 + 0.2 }
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
