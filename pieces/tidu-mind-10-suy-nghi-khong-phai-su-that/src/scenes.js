// =====================================================================
//  TIDU MIND 10 — "Suy nghĩ của bạn không phải lúc nào cũng là sự thật"
//  Liệu pháp Nhận thức Hành vi (CBT Thought Record).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · NHẬN THỨC CBT';
const TEAL = '#2e4f4f';

const SCENES = {};

// Bảng 3 cột CBT Thought Record
function tmCbtTable(cx, cy, s = 1) {
  withT(cx, cy, 0, s, () => {
    pp(pR(-290, -180, 580, 360, 16), PR.creamL, { key: 'cbt_bg', sb: 16, sy: 8, tex: 0.5 });
    // Đường kẻ dọc chia 3 cột
    pp(pR(-100, -180, 4, 360, 0), '#d0d8d8', { shadow: false });
    pp(pR(100, -180, 4, 360, 0), '#d0d8d8', { shadow: false });
    pp(pR(-290, -110, 580, 4, 0), PR.navy, { shadow: false });

    // Tiêu đề 3 cột
    txt('TÌNH HUỐNG', -195, -145, 20, PR.navy, { align: 'center', weight: 800 });
    txt('SUY NGHĨ', 0, -145, 20, PR.navy, { align: 'center', weight: 800 });
    txt('BẰNG CHỨNG', 195, -145, 20, PR.navy, { align: 'center', weight: 800 });

    // Nội dung 3 cột
    txt('Thuyết trình', -195, -50, 18, PR.char, { align: 'center', weight: 700 });
    txt('chưa tốt', -195, -20, 18, PR.char, { align: 'center', weight: 700 });

    txt('"Mình thật', 0, -50, 18, '#9c3c3c', { align: 'center', weight: 800 });
    txt('kém cỏi"', 0, -20, 18, '#9c3c3c', { align: 'center', weight: 800 });

    txt('Chỉ là 1 lần,', 195, -50, 18, '#2e6a48', { align: 'center', weight: 700 });
    txt('trước đây ổn!', 195, -20, 18, '#2e6a48', { align: 'center', weight: 700 });

    // Kết luận viết lại
    pp(pR(-270, 70, 540, 80, 10), '#e6f4ec', { key: 'cbt_rewr', shadow: false });
    txt('KẾT LUẬN MỚI: Lần này chưa đạt mục tiêu', 0, 115, 20, '#2e6a48', { align: 'center', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Nghĩ mình thất bại ≠ Đó là sự thật
  const t0 = E0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // Tấm biển so sánh lớn
  withT(430, 860, 0, popS(t0 + 0.2), () => {
    pp(pR(-290, -180, 580, 360, 20), '#3d6868', { key: 'h_box', sb: 16, sy: 8, tex: 0.5 });
    txt('BẠN NGHĨ MÌNH THẤT BẠI', 0, -90, 32, '#f8b0b0', { align: 'center', weight: 800 });
    pp(pR(-230, -30, 460, 4, 2), PR.creamL, { shadow: false });
    txt('≠', 0, 25, 52, PR.creamL, { align: 'center', weight: 800 });
    txt('ĐÓ LÀ SỰ THẬT!', 0, 95, 36, PR.mustard, { align: 'center', weight: 800 });
    txt('(Suy nghĩ chỉ là những xung điện trong não)', 0, 145, 20, '#b0d8d0', { align: 'center', weight: 600 });
  });

  prCross(730, 860, t0 + 0.8);
  prClock(960, 520, 70, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b1' });
  prSign('SUY NGHĨ KHÔNG PHẢI SỰ THẬT', { kicker: KICK });
  prChips();
};

SCENES.situation = () => {   // S2: Giả sử hỏng thuyết trình -> "Mình thật kém cỏi"
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  // Bảng thuyết trình bị chấm điểm C
  withT(430, 780, 0, popS(t0 + 0.2), () => {
    pp(pR(-240, -160, 480, 320, 16), PR.creamL, { key: 'slide_box', sb: 14, sy: 7, tex: 0.5 });
    txt('BÀI THUYẾT TRÌNH', 0, -90, 28, PR.navy, { align: 'center', weight: 800 });
    txt('📊 Số liệu chưa khớp', 0, -20, 24, PR.char, { align: 'center', weight: 600 });
    txt('⏱️ Quá giờ 5 phút', 0, 30, 24, PR.char, { align: 'center', weight: 600 });
  });

  // Bong bóng suy nghĩ tiêu cực
  const bubPop = popS(t0 + 0.8);
  withT(430, 1140, -0.02, bubPop, () => {
    pp(pR(-260, -60, 520, 120, 20), '#9e4c4c', { key: 'neg_bub', sb: 14, sy: 7, tex: 0.4 });
    txt('SUY NGHĨ: "MÌNH THẬT KÉM CỎI!"', 0, 8, 28, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(140, 420, 32, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -35, key: 'b2' });
  prSign('KHIẾN BẠN TỰ PHÁN XÉT', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // S3: Tách tình huống khỏi cách diễn giải
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  // Tách đôi: TÌNH HUỐNG THỰC TẾ vs CÁCH DIỄN GIẢI
  withT(270, 860, -0.02, popS(t0 + 0.2), () => {
    pp(pR(-180, -200, 360, 400, 18), '#4e8268', { key: 'sit_box', sb: 16, sy: 8, tex: 0.5 });
    txt('TÌNH HUỐNG', 0, -130, 28, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-140, -80, 280, 4, 2), PR.creamL, { shadow: false });
    txt('Bài thuyết trình', 0, -10, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('LẦN NÀY', 0, 35, 28, PR.mustard, { align: 'center', weight: 800 });
    txt('chưa được tốt', 0, 80, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('(Chỉ là 1 sự kiện)', 0, 140, 20, '#d0e8e0', { align: 'center', weight: 600 });
  });

  withT(690, 860, 0.02, popS(t0 + 0.6), () => {
    pp(pR(-180, -200, 360, 400, 18), '#9e5050', { key: 'int_box', sb: 16, sy: 8, tex: 0.5 });
    txt('DIỄN GIẢI', 0, -130, 28, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-140, -80, 280, 4, 2), PR.creamL, { shadow: false });
    txt('"Mình luôn', 0, -10, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('LÀ NGƯỜI', 0, 35, 28, PR.mustard, { align: 'center', weight: 800 });
    txt('kém cỏi!"', 0, 80, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('(Khái quát quá mức!)', 0, 140, 20, '#f8d0d0', { align: 'center', weight: 600 });
  });

  prCross(480, 860, t0 + 0.9);
  prStar(160, 420, 32, PR.mustard);
  prClock(960, 520, 70, 4, 0, 'clk3');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'neutral', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('TÁCH SỰ KIỆN KHỎI SUY DIỄN', { kicker: KICK });
  prChips();
};

SCENES.questions = () => {   // S4: Bảng 3 cột CBT Thought Record
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  tmCbtTable(430, 860, popS(t0 + 0.3));

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 15, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('BẰNG CHỨNG NÀO ỦNG HỘ?', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Không cần ép tích cực — Hãy suy nghĩ công bằng & chính xác
  const t0 = E0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const refPop = popS(t0 + 0.3);
  withT(430, 860, 0, refPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3b6860', { key: 'fair_box', sb: 16, sy: 8, tex: 0.5 });
    txt('SUY NGHĨ CÔNG BẰNG', 0, -110, 34, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Không cần ép mình:', 0, 15, 24, '#f8b0b0', { align: 'center', weight: 700 });
    txt('"Suy nghĩ tích cực mù quáng"', 0, 55, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('CHỈ CẦN:', 0, 100, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('SUY NGHĨ CHÍNH XÁC VÀ CÔNG BẰNG!', 0, 140, 28, PR.mustard, { align: 'center', weight: 800 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('SUY NGHĨ CÔNG BẰNG VỚI MÌNH', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Comment box CTA
  const t0 = E0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(190, 420, 36, PR.mustard);
  prStar(880, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 540, 68, 4, 45, 'clk6');

  prCommentBox(CX, 820, 'LƯU 3 CÂU HỎI', t0 + 0.5, { hint: 'Chuyện gì xảy ra? Bằng chứng là gì?' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('LƯU LẠI 3 CÂU HỎI NÀY NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VL('situation').t0 + 0.3 });
  cues.push({ k: 'thud', t: VL('reality').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('questions').t0 + 0.2 });
  cues.push({ k: 'chime', t: VL('reframe').t0 + 0.3 });
  const ctaL = VL('cta');
  cues.push({ k: 'type', t: ctaL.t0 + 0.5, n: 16, d: 1.3 });
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
