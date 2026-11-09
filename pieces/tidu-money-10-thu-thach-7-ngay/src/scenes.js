// =====================================================================
//  TIDU MONEY 10 — "Thử thách 7 ngày hiểu rõ tiền của mình"
//  Theme: 7-Day Personal Finance Community Challenge
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · THỬ THÁCH';
const SCENES = {};

// ---- HELPERS ----

// A 7-day progress tracker
function tmCalendarWeek(cx, cy, checkedCount = 0, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 620, h = 120;
    pp(pR(-w / 2, -h / 2, w, h, 16), PR.paperW, { key: 'wk_bg', sb: 12, sy: 6, tex: 0.4 });
    const dayW = (w - 24) / 7;

    for (let i = 0; i < 7; i++) {
      const dx = -w / 2 + 12 + i * dayW;
      const isDone = i < checkedCount;
      pp(pR(dx + 3, -h / 2 + 12, dayW - 6, h - 24, 8), isDone ? PR.green : '#f6f3eb', { key: 'wk_d_' + i, shadow: false, tex: 0.3 });
      txt(`N${i + 1}`, dx + dayW / 2, -10, 18, isDone ? PR.creamL : PR.greyD, { align: 'center', weight: 800 });
      txt(isDone ? '✔' : '○', dx + dayW / 2, 25, 20, isDone ? PR.creamL : PR.grey, { align: 'center', weight: 800 });
    }
  });
}

// Stage Action Card
function tmChallengeCard(cx, cy, stageTitle, steps, color, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 600, h = 420;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'ch_card_' + stageTitle, sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), color, { shadow: false, tex: 0.35 });
    txt(stageTitle, 0, -h / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });

    steps.forEach((st, i) => {
      const iy = -h / 2 + 125 + i * 95;
      pp(pR(-w / 2 + 25, iy, w - 50, 80, 12), '#f6f3eb', { key: 'ch_st_' + stageTitle + i, sb: 6, sy: 3, tex: 0.3 });
      pp(pR(-w / 2 + 25, iy, 12, 80, 6), color, { shadow: false, tex: 0.3 });
      txt(st.day, -w / 2 + 50, iy + 35, 18, color, { weight: 800 });
      txt(st.action, -w / 2 + 50, iy + 62, 21, PR.char, { weight: 700 });
    });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): 0–4s: Một tờ lịch 7 ngày được ghim lên bảng giấy.
SCENES.hook = () => {
  const tBay = VW('hook', 'bảy').t0;

  prWall('#243b53', { streak: 400 });
  prFloor(1560, PR.woodD, { trim: false });
  prClock(190, 420, 68, 7, 0);

  // Big 7-Day Board
  withT(470, 720, 0, popS(E0 + 0.15), () => {
    const w = 580, h = 340;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'hk_board', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 85, 16), PR.teal, { shadow: false, tex: 0.35 });
    txt('THỬ THÁCH TÀI CHÍNH CÁ NHÂN', 0, -h / 2 + 54, 26, PR.creamL, { align: 'center', weight: 800 });

    txt('CHỈ CẦN 7 NGÀY', 0, 8, 44, PR.teal, { align: 'center', weight: 800 });
    txt('để bắt đầu hiểu rõ ví tiền của bạn!', 0, 65, 24, PR.char, { align: 'center', weight: 700 });
  });

  // Week bar
  tmCalendarWeek(470, 960, 0, popS(tBay));

  // Piggy with visor
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: 'happy', look: -15, key: 'p1' });

  prSign('THỬ THÁCH 7 NGÀY VÍ TIỀN', { kicker: KICK });
  prChips();
};

// Scene 2 (days13): Ngày một, ghi lại tất cả khoản chi. Ngày hai, chia chúng thành nhóm cần thiết và không thiết yếu. Ngày ba, tìm khoản chi khiến bạn bất ngờ nhất.
SCENES.days13 = () => {
  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // Week bar (3 days done)
  tmCalendarWeek(470, 480, 3, popS(E0 + 0.1));

  const steps13 = [
    { day: 'NGÀY 1', action: 'Ghi chép lại toàn bộ khoản chi trong ngày' },
    { day: 'NGÀY 2', action: 'Phân loại: Cần thiết vs Không thiết yếu' },
    { day: 'NGÀY 3', action: 'Tìm ra khoản chi khiến bạn bất ngờ nhất!' }
  ];
  tmChallengeCard(470, 800, 'CHẶNG 1: NHẬN DIỆN DÒNG TIỀN', steps13, PR.green, popS(E0 + 0.2));

  // Piggy bowler
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'neutral', look: -16, key: 'p2' });

  prSign('NGÀY 1 ➔ 3: NHẬN DIỆN', { kicker: KICK });
  prChips();
};

// Scene 3 (days46): Ngày bốn, thử đặt một giới hạn cho nhóm đó. Ngày năm, dành ra một khoản tiết kiệm phù hợp. Ngày sáu, kiểm tra các dịch vụ tự động trừ tiền.
SCENES.days46 = () => {
  prWall('#3b2d24', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Week bar (6 days done)
  tmCalendarWeek(470, 480, 6, popS(E0 + 0.1));

  const steps46 = [
    { day: 'NGÀY 4', action: 'Đặt hạn mức chi tiêu cho nhóm phát sinh' },
    { day: 'NGÀY 5', action: 'Trích một khoản tiết kiệm phù hợp khả năng' },
    { day: 'NGÀY 6', action: 'Rà soát các gói dịch vụ tự động trừ tiền' }
  ];
  tmChallengeCard(470, 800, 'CHẶNG 2: THIẾT LẬP KỶ LUẬT', steps46, PR.mustard, popS(E0 + 0.2));

  // Piggy newsboy
  piggy(PIGGY_X, PIGGY_Y, { hat: 'newsboy', mood: 'happy', look: -15, key: 'p3' });

  prSign('NGÀY 4 ➔ 6: HÀNH ĐỘNG', { kicker: KICK });
  prChips();
};

// Scene 4 (day7): Ngày bảy, tổng kết và chọn một thói quen tốt để tiếp tục.
SCENES.day7 = () => {
  const tBay = VW('day7', 'bảy').t0;

  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // Week bar fully completed (7 days)
  tmCalendarWeek(470, 520, 7, popS(E0 + 0.1));

  // Day 7 Summary Card
  withT(470, 800, 0, popS(E0 + 0.2), () => {
    const w = 580, h = 320;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'd7_box', sb: 16, sy: 8, tex: 0.45 });
    txt('NGÀY 7: TỔNG KẾT & CHỌN THÓI QUEN', 0, -h / 2 + 55, 24, PR.char, { align: 'center', weight: 800 });

    pp(pR(-250, -25, 500, 80, 12), '#edf7ed', { key: 'd7_ok', sb: 6, sy: 3, tex: 0.3 });
    txt('✔ Chọn 1 thói quen tốt nhất để duy trì!', 0, 24, 22, PR.green, { align: 'center', weight: 800 });

    txt('Kỷ luật nhỏ mỗi ngày tạo ra tự do tài chính.', 0, 95, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  // Stamp: "HOÀN THÀNH 7 NGÀY"
  prStamp('HOÀN THÀNH 7 NGÀY! 🏆', 470, 1060, PR.green, tBay + 0.3, { rot: -0.04, size: 34, from: 1.25 });

  // Piggy tophat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'happy', look: -14, hold: propCoin(55), key: 'p4' });

  prSign('NGÀY 7: TỔNG KẾT & DUY TRÌ', { kicker: KICK });
  prChips();
};

// Scene 5 (mindset): Bạn không cần thay đổi toàn bộ cuộc sống chỉ trong một tuần. Hãy bắt đầu bằng sự hiểu biết.
SCENES.mindset = () => {
  const tBiet = VW('mindset', 'biết').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Golden Stamp: "BẮT ĐẦU BẰNG SỰ HIỂU BIẾT"
  prStamp('BẮT ĐẦU BẰNG SỰ HIỂU BIẾT', 470, 560, PR.mustard, E0 + 0.1, { rot: -0.03, size: 28, from: 1.2 });

  // CTA Card
  withT(470, 880, 0, popS(tBiet + 0.2), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_10', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('THAM GIA THỬ THÁCH', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('BÌNH LUẬN "7 NGÀY"', 0, 5, 34, PR.char, { align: 'center', weight: 800 });
    txt('nếu bạn sẵn sàng bắt đầu cùng Tidu Money!', 0, 50, 22, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 95, 360, 52, 12), PR.navy, { key: 'cta_btn_10', sb: 8, sy: 4, tex: 0.4 });
    txt('THAM GIA NGAY 💬', 0, 130, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p5' });

  prSign('BẮT ĐẦU BẰNG SỰ HIỂU BIẾT', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'tick', t: VW('hook', 'bảy').t0 },
    { k: 'pop', t: VW('days13', 'một').t0 },
    { k: 'tick', t: VW('days46', 'bốn').t0 },
    { k: 'chime', t: VW('day7', 'bảy').t0 + 0.2 },
    { k: 'chime', t: VW('mindset', 'biết').t0 + 0.2 }
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
