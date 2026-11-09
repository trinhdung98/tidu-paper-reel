// =====================================================================
//  TIDU MONEY 04 — "Cà phê 35 nghìn có thật sự nhỏ?"
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · THÓI QUEN';
const SCENES = {};

// ---- HELPERS ----

// A cute takeaway paper coffee cup
function tmCoffeeCup(cx, cy, s = 1, showSteam = true) {
  withT(cx, cy, 0, s, () => {
    // Cup body
    ctx.save();
    ctx.shadowColor = 'rgba(12,10,8,0.25)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = PR.paperW;
    ctx.beginPath();
    ctx.moveTo(-45, -70);
    ctx.lineTo(45, -70);
    ctx.lineTo(35, 75);
    ctx.lineTo(-35, 75);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Kraft paper sleeve
    pp(pR(-42, -25, 84, 55, 4), '#b58351', { key: 'cp_sleeve', shadow: false, tex: 0.45 });
    pp(pE(0, 2, 16, 16), PR.char, { shadow: false, tex: 0.3 });
    txt('☕', 0, 8, 18, PR.creamL, { align: 'center' });

    // Plastic lid
    pp(pR(-52, -85, 104, 18, 6), '#f0eee6', { key: 'cp_lid', sb: 6, sy: 3, tex: 0.3 });

    // Steam
    if (showSteam) {
      const st = Math.sin(TT * 3) * 6;
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-15 + st, -95);
      ctx.quadraticCurveTo(-25, -120, -10 + st, -145);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(15 - st, -95);
      ctx.quadraticCurveTo(25, -120, 10 - st, -145);
      ctx.stroke();
      ctx.restore();
    }
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): 0–4s: Cốc cà phê bằng giấy xuất hiện với giá 35.000đ.
SCENES.hook = () => {
  const tPhe = VW('hook', 'phê').t0;

  prWall('#3b2d24', { streak: 400 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(190, 420, 68, 8, 30);

  // Big hero coffee cup in center
  tmCoffeeCup(470, 720, 1.8 * popS(E0 + 0.15), true);

  // Price tag: 35.000₫
  withT(470, 960, 0, popS(tPhe), () => {
    pp(pR(-180, -45, 360, 90, 14), PR.mustard, { key: 'hk_tag', sb: 14, sy: 7, tex: 0.5 });
    txt('1 LY CÀ PHÊ SÁNG', 0, -12, 22, PR.char, { align: 'center', weight: 800 });
    txt('35.000₫', 0, 32, 44, PR.char, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy visor looking at coffee
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: 'happy', look: -15, key: 'p1' });

  prSign('LY CÀ PHÊ 35 NGHÌN', { kicker: KICK });
  prChips();
};

// Scene 2 (days): Nếu ngày nào bạn cũng mua một ly, ba mươi ngày sẽ là một triệu không trăm năm mươi nghìn đồng.
SCENES.days = () => {
  const tMuoi = VW('days', 'mươi').t0;
  const tTrieu = VW('days', 'triệu').t0;

  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // Grid of 30 coffee cups (5 rows x 6 cols)
  withT(470, 640, 0, 1, () => {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 6; c++) {
        const idx = r * 6 + c;
        const cx = (c - 2.5) * 88, cy = (r - 2) * 75;
        const pop = popS(E0 + 0.05 + idx * 0.04);
        tmCoffeeCup(cx, cy, 0.45 * pop, false);
      }
    }
  });

  // Math multiplication banner
  withT(470, 950, 0, popS(tMuoi), () => {
    pp(pR(-280, -50, 560, 100, 14), PR.paperW, { key: 'days_math', sb: 14, sy: 7, tex: 0.4 });
    txt('35.000₫  ×  30 NGÀY', 0, -10, 26, PR.greyD, { align: 'center', weight: 800, font: F_MONO });
    txt('= 1.050.000₫ / THÁNG', 0, 32, 40, PR.red, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy wow
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: TT < tTrieu ? 'neutral' : 'wow', look: -16, key: 'p2' });

  prSign('30 NGÀY = 1.050.000₫', { kicker: KICK });
  prChips();
};

// Scene 3 (notbad): Nhưng điều đó không có nghĩa bạn phải bỏ cà phê.
SCENES.notbad = () => {
  const tBo = VW('notbad', 'bỏ').t0;

  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // "PHẢI BỎ CÀ PHÊ?" with red cross
  withT(470, 680, 0, popS(E0 + 0.15), () => {
    pp(pR(-260, -80, 520, 160, 16), PR.paperW, { key: 'nb_bad', sb: 14, sy: 7, tex: 0.4 });
    tmCoffeeCup(-150, 0, 0.9, false);
    txt('PHẢI CẮT BỎ CÀ PHÊ?', 40, 12, 28, PR.char, { align: 'center', weight: 800 });
  });

  prCross(470, 680, tBo + 0.1, 75);

  withT(470, 960, 0, popS(tBo + 0.3), () => {
    pp(pR(-260, -45, 520, 90, 14), PR.green, { key: 'nb_good', sb: 12, sy: 6, tex: 0.4 });
    txt('KHÔNG CẦN CỰC ĐOAN!', 0, 12, 28, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy bowler
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'happy', look: -15, key: 'p3' });

  prSign('KHÔNG CẦN BỎ CÀ PHÊ', { kicker: KICK });
  prChips();
};

// Scene 4 (joy): Nếu đây là niềm vui bạn thật sự trân trọng, khoản chi ấy có thể hoàn toàn xứng đáng.
SCENES.joy = () => {
  const tXung = VW('joy', 'đáng').t0;

  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Coffee with Heart / Value card
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 580, h = 420;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'joy_box', sb: 16, sy: 8, tex: 0.45 });
    tmCoffeeCup(0, -90, 1.1, true);

    txt('NIỀM VUI & NĂNG LƯỢNG MỖI SÁNG', 0, 30, 24, PR.char, { align: 'center', weight: 800 });
    txt('Nếu mang lại giá trị thật sự,', 0, 75, 22, PR.greyD, { align: 'center', weight: 700 });
    txt('khoản chi ấy hoàn toàn xứng đáng!', 0, 115, 24, PR.green, { align: 'center', weight: 800 });
  });

  // Stamp: "XỨNG ĐÁNG"
  prStamp('HOÀN TOÀN XỨNG ĐÁNG', 470, 1060, PR.green, tXung + 0.1, { rot: -0.04, size: 30, from: 1.25 });

  // Piggy happy
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'happy', look: -15, hold: propCoin(55), key: 'p4' });

  prSign('NIỀM VUI XỨNG ĐÁNG', { kicker: KICK });
  prChips();
};

// Scene 5 (choice): Vấn đề là bạn có chủ động chọn nó hay không.
SCENES.choice = () => {
  const tDong = VW('choice', 'động').t0;

  prWall(PR.navy, { streak: 500 });
  prFloor(1560, PR.floor, { studs: true });

  // Two mindsets split
  withT(270, 740, -0.02, popS(E0 + 0.1), () => {
    pp(pR(-150, -140, 300, 280, 16), '#edf2f7', { key: 'ch_auto', sb: 12, sy: 6, tex: 0.4 });
    txt('UỐNG THEO QUÁN TÍNH', 0, -85, 20, PR.greyD, { align: 'center', weight: 800 });
    txt('Tiện tay mua', 0, -20, 22, PR.char, { align: 'center', weight: 700 });
    txt('Không để ý ví', 0, 25, 22, PR.red, { align: 'center', weight: 800 });
  });

  withT(670, 740, 0.02, popS(tDong), () => {
    pp(pR(-150, -140, 300, 280, 16), PR.paperW, { key: 'ch_mind', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-150, -140, 300, 60, 14), PR.teal, { shadow: false, tex: 0.35 });
    txt('CHỦ ĐỘNG CHỌN', 0, -100, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('Thực sự tận hưởng', 0, -20, 22, PR.char, { align: 'center', weight: 700 });
    txt('Nằm trong ngân sách', 0, 25, 22, PR.teal, { align: 'center', weight: 800 });
  });

  // Piggy flat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'neutral', look: -16, key: 'p5' });

  prSign('CHỦ ĐỘNG HAY QUÁN TÍNH?', { kicker: KICK });
  prChips();
};

// Scene 6 (reduce): Thử giảm vài buổi trong tuần và xem số tiền chênh lệch.
SCENES.reduce = () => {
  const tGiam = VW('reduce', 'giảm').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Comparison: 7 days vs 3 days
  withT(470, 620, 0, popS(E0 + 0.1), () => {
    pp(pR(-280, -65, 560, 130, 14), PR.paperW, { key: 'rd_full', sb: 12, sy: 6, tex: 0.4 });
    txt('MỖI NGÀY 1 LY (7 NGÀY/TUẦN)', 0, -20, 22, PR.greyD, { align: 'center', weight: 800 });
    txt('245.000₫ / tuần  ·  1.050.000₫ / tháng', 0, 25, 24, PR.char, { align: 'center', weight: 800, font: F_MONO });
  });

  withT(470, 800, 0, popS(tGiam + 0.2), () => {
    pp(pR(-280, -65, 560, 130, 14), PR.paperW, { key: 'rd_opt', sb: 16, sy: 8, tex: 0.45 });
    txt('GIẢM CÒN 3 NGÀY / TUẦN', 0, -20, 22, PR.green, { align: 'center', weight: 800 });
    txt('105.000₫ / tuần  ·  450.000₫ / tháng', 0, 25, 24, PR.green, { align: 'center', weight: 800, font: F_MONO });
  });

  // Savings result
  withT(470, 980, 0, popS(tGiam + 0.5), () => {
    pp(pR(-240, -40, 480, 80, 12), PR.mustard, { key: 'rd_sav', sb: 12, sy: 6, tex: 0.4 });
    txt('DƯ RA 600.000₫ MỖI THÁNG!', 0, 12, 26, PR.char, { align: 'center', weight: 800, font: F_MONO });
  });

  // Piggy nonla
  piggy(PIGGY_X, PIGGY_Y, { hat: 'nonla', mood: 'happy', look: -14, hold: propCoin(55), key: 'p6' });

  prSign('GIẢM VÀI BUỔI · DƯ TIỀN TRIỆU', { kicker: KICK });
  prChips();
};

// Scene 7 (mindful): Tài chính cá nhân không phải cấm mọi niềm vui, mà là chi tiêu có ý thức.
SCENES.mindful = () => {
  const tThuc = VW('mindful', 'thức').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Stamp: "CHI TIÊU CÓ Ý THỨC"
  prStamp('CHI TIÊU CÓ Ý THỨC', 470, 580, PR.mustard, E0 + 0.1, { rot: -0.03, size: 36, from: 1.25 });

  // CTA Box
  withT(470, 900, 0, popS(tThuc + 0.2), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_04', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('NHÌN LẠI THÓI QUEN', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('KHOẢN CHI NHỎ NÀO CỦA BẠN', 0, 0, 26, PR.char, { align: 'center', weight: 800 });
    txt('LẶP LẠI NHIỀU NHẤT MỖI THÁNG?', 0, 42, 26, PR.green, { align: 'center', weight: 800 });
    txt('Cà phê, trà sữa hay ăn vặt? Bình luận nhé! 👇', 0, 85, 20, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 115, 360, 50, 12), PR.navy, { key: 'cta_btn_04', sb: 8, sy: 4, tex: 0.4 });
    txt('CHIA SẺ NGAY 💬', 0, 148, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p7' });

  prSign('CHI TIÊU CÓ Ý THỨC', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'pop', t: VW('hook', 'phê').t0 },
    { k: 'tick', t: VW('days', 'mươi').t0 },
    { k: 'thud', t: VW('notbad', 'bỏ').t0 + 0.1 },
    { k: 'chime', t: VW('joy', 'đáng').t0 + 0.1 },
    { k: 'tick', t: VW('choice', 'động').t0 },
    { k: 'pop', t: VW('reduce', 'giảm').t0 + 0.2 },
    { k: 'chime', t: VW('mindful', 'thức').t0 + 0.2 }
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
