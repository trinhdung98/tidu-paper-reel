// =====================================================================
//  TIDU MIND 03 — "Suy nghĩ nhiều có thực sự giúp giải quyết vấn đề?"
//  Vòng lặp lo lắng (Rumination) vs Giải quyết vấn đề (Problem Solving).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · LO LẮNG';
const TEAL = '#2e4f4f';

const SCENES = {};

// Đám mây suy nghĩ xoay tròn
function tmThoughtCloud(cx, cy, s = 1, rot = 0) {
  withT(cx, cy, rot, s, () => {
    // Vòng mây xám / tím xoáy
    pp(pE(0, 0, 220, 140), '#403048', { key: 'tc_bg', sb: 18, sy: 9, tex: 0.5 });
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const r = 90;
      pp(pE(Math.cos(a) * r, Math.sin(a) * r * 0.7, 70, 70), '#524060', { key: 'tc_puff' + i, shadow: false, tex: 0.4 });
    }
    // Dấu hỏi xoáy bên trong
    txt('?', 0, 14, 88, PR.mustard, { align: 'center', base: 'middle', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Nhân vật ngồi dưới đám mây suy nghĩ xoay vòng, đồng hồ chạy
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // Đám mây suy nghĩ lơ lửng phía trên bên trái
  const rot = Math.sin(TT * 2) * 0.05;
  tmThoughtCloud(420, 860, 1.1, rot);

  // Đồng hồ chạy nhanh (quay kim)
  prClock(960, 520, 70, 2, (TT * 20) % 60, 'clk1');
  txt('3 TIẾNG TRÔI QUA', 420, 1140, 34, PR.mustard, { align: 'center', weight: 800 });

  prStar(140, 420, 36, PR.orange);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b1' });
  prSign('SUY NGHĨ SUỐT 3 TIẾNG?', { kicker: KICK });
  prChips();
};

SCENES.diff = () => {   // S2: Hai cán cân: GIẢI QUYẾT vs LO LẮNG
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const p1 = popS(t0 + 0.3);
  const p2 = popS(t0 + 0.7);

  // Cột trái: GIẢI QUYẾT
  withT(270, 860, -0.02, p1, () => {
    pp(pR(-180, -220, 360, 440, 20), '#4e8268', { key: 'col_solve', sb: 16, sy: 8, tex: 0.5 });
    txt('GIẢI QUYẾT', 0, -150, 34, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-140, -100, 280, 4, 2), PR.creamL, { shadow: false });
    txt('Dẫn đến:', 0, -40, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('Lựa chọn', 0, 10, 30, PR.mustard, { align: 'center', weight: 800 });
    txt('& Hành động', 0, 60, 30, PR.mustard, { align: 'center', weight: 800 });
    prCheck(0, 150, t0 + 0.9);
  });

  // Cột phải: LO LẮNG LẶP LẠI
  withT(690, 860, 0.02, p2, () => {
    pp(pR(-180, -220, 360, 440, 20), '#9e5050', { key: 'col_worry', sb: 16, sy: 8, tex: 0.5 });
    txt('LO LẮNG', 0, -150, 34, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-140, -100, 280, 4, 2), PR.creamL, { shadow: false });
    txt('Kẹt trong:', 0, -40, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('Vòng xoay', 0, 10, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('"Nếu... thì sao?"', 0, 60, 26, PR.creamL, { align: 'center', weight: 800 });
    prCross(0, 150, t0 + 1.2);
  });

  prClock(960, 520, 70, 4, 0, 'clk2');
  prStar(480, 420, 36, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -25, key: 'b2' });
  prSign('HÀNH ĐỘNG HAY VÒNG LẶP?', { kicker: KICK });
  prChips();
};

SCENES.solve = () => {   // S3: Vòng tròn kiểm soát
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  const cPop = popS(t0 + 0.3);

  // Vòng ngoài: CHƯA KIỂM SOÁT ĐƯỢC
  withT(430, 880, 0, cPop, () => {
    pp(pE(0, 0, 330, 330), '#3d4f58', { key: 'circle_out', sb: 16, sy: 8, tex: 0.4 });
    txt('KHÔNG KIỂM SOÁT ĐƯỢC', 0, -260, 24, '#a0b0b8', { align: 'center', weight: 800 });

    // Vòng trong: KIỂM SOÁT ĐƯỢC
    pp(pE(0, 30, 190, 190), '#3e7a62', { key: 'circle_in', sb: 12, sy: 6, tex: 0.5 });
    txt('KIỂM SOÁT', 0, -15, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('ĐƯỢC', 0, 25, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('Hành động của bạn', 0, 75, 20, PR.mustard, { align: 'center', weight: 700 });
  });

  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk3');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('VÒNG TRÒN KIỂM SOÁT', { kicker: KICK });
  prChips();
};

SCENES.write = () => {   // S4: Viết vấn đề ra giấy + checklist bước nhỏ
  const t0 = E0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // Tờ giấy note lớn ở trung tâm
  const notePop = popS(t0 + 0.2);
  withT(430, 880, -0.015, notePop, () => {
    pp(pR(-280, -290, 560, 580, 16), PR.paperW, { key: 'notepad', sb: 18, sy: 9, tex: 0.5 });
    // Dòng kẻ sổ
    for (let i = 0; i < 7; i++) {
      pp(pR(-250, -200 + i * 70, 500, 2, 0), '#d8e0e0', { shadow: false });
    }
    txt('VIẾT RA GIẤY:', -240, -230, 28, PR.navy, { weight: 800 });
    txt('1. Phần mình tác động được?', -240, -150, 24, PR.char, { weight: 700 });
    txt('2. Bước nhỏ nhất làm ngay?', -240, -80, 24, PR.char, { weight: 700 });

    // Ô checklist hành động
    pp(pR(-240, 20, 480, 120, 12), '#e8f4ed', { key: 'chk_box', shadow: false });
    prCheck(-200, 80, t0 + 0.8);
    txt('Hành động ngay 5 phút!', -140, 88, 26, '#2e6a48', { weight: 800 });
  });

  prStar(160, 1260, 32, PR.pink);
  prClock(960, 520, 70, 5, 0, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('BƯỚC NHỎ NHẤT CÓ THỂ', { kicker: KICK });
  prChips();
};

SCENES.time = () => {   // S5: Mũi tên thẳng thay cho vòng xoáy; Worry Time
  const t0 = E0;
  prWall(TEAL, { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // Hộp "GIỜ LO LẮNG" (Worry Time)
  const boxPop = popS(t0 + 0.3);
  withT(430, 860, 0, boxPop, () => {
    pp(pR(-280, -180, 560, 360, 20), '#3d6868', { key: 'worry_box', sb: 16, sy: 8, tex: 0.5 });
    txt('KHOẢNG THỜI GIAN RIÊNG', 0, -100, 32, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('15 phút mỗi chiều', 0, 20, 34, PR.mustard, { align: 'center', weight: 800 });
    txt('Để suy nghĩ & xử lý dứt điểm', 0, 80, 24, PR.creamL, { align: 'center', weight: 700 });
  });

  prCheck(730, 860, t0 + 0.9);
  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 5, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('DÀNH GIỜ RIÊNG XỬ LÝ', { kicker: KICK });
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
  prClock(960, 540, 68, 5, 45, 'clk6');

  prCommentBox(CX, 820, 'BẠN HAY NGHĨ VỀ...', t0 + 0.5, { hint: 'Công việc, tương lai hay mối quan hệ?' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('CHIA SẺ CÂU CHUYỆN NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VL('diff').t0 + 0.3 });
  cues.push({ k: 'tick', t: VL('diff').t0 + 0.7 });
  cues.push({ k: 'thud', t: VL('solve').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('write').t0 + 0.2 });
  cues.push({ k: 'chime', t: VL('time').t0 + 0.3 });
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
