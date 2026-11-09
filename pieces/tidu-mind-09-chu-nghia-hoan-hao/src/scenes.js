// =====================================================================
//  TIDU MIND 09 — "Chủ nghĩa hoàn hảo có đang giữ chân bạn?"
//  Chủ nghĩa hoàn hảo & Bản nháp đầu tiên (Perfectionism vs MVP).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · HOÀN HẢO';
const TEAL = '#2e4f4f';

const SCENES = {};

// Tờ giấy trắng / bản nháp
function tmPaper(cx, cy, label, line1, line2, s = 1, rot = 0) {
  withT(cx, cy, rot, s, () => {
    pp(pR(-130, -170, 260, 340, 14), PR.paperW, { key: 'p_' + label, sb: 14, sy: 7, tex: 0.45 });
    txt(label, 0, -110, 24, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-100, -75, 200, 3, 2), PR.navy, { shadow: false });
    txt(line1, 0, 10, 22, PR.char, { align: 'center', weight: 700 });
    txt(line2, 0, 55, 22, PR.char, { align: 'center', weight: 700 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Ngồi trước tờ giấy trắng tinh, sợ không đủ tốt
  const t0 = E0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // Tờ giấy trắng tinh ở trung tâm bàn
  const pPop = popS(t0 + 0.2);
  withT(420, 880, 0, pPop, () => {
    pp(pR(-220, -280, 440, 560, 16), PR.paperW, { key: 'blank_paper', sb: 18, sy: 9, tex: 0.5 });
    txt('(TRANG GIẤY TRẮNG)', 0, 0, 28, '#b0c0c0', { align: 'center', base: 'middle', weight: 700 });
    // Cây bút chì nằm cạnh
    pp(pR(170, -100, 16, 240, 4), PR.mustard, { key: 'pencil', sb: 6, sy: 3 });
  });

  txt('"SỢ LÀM CHƯA ĐỦ TỐT?"', 420, 1260, 32, PR.mustard, { align: 'center', weight: 800 });

  prClock(960, 520, 70, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b1' });
  prSign('Ý TƯỞNG HAY — CHƯA DÁM LÀM?', { kicker: KICK });
  prChips();
};

SCENES.delay = () => {   // S2: Viết rồi xóa, trì hoãn bước đầu tiên
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const cardPop = popS(t0 + 0.3);
  withT(430, 860, 0, cardPop, () => {
    pp(pR(-290, -220, 580, 440, 20), '#3d6868', { key: 'delay_box', sb: 16, sy: 8, tex: 0.5 });
    txt('CHIẾC BẪY HOÀN HẢO', 0, -150, 32, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-240, -100, 480, 4, 2), PR.creamL, { shadow: false });

    txt('• Bài viết chưa bao giờ đăng', 0, -35, 26, PR.mustard, { align: 'center', weight: 700 });
    txt('• Dự án chưa bao giờ thử', 0, 25, 26, PR.mustard, { align: 'center', weight: 700 });
    txt('• Ý tưởng mãi nằm trong đầu', 0, 85, 26, PR.mustard, { align: 'center', weight: 700 });
    txt('(Chờ đến khi "hoàn hảo" mới làm!)', 0, 145, 22, '#f8b0b0', { align: 'center', weight: 600 });
  });

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(140, 420, 32, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'flat', look: -35, key: 'b2' });
  prSign('TRÌ HOÃN BƯỚC ĐẦU TIÊN', { kicker: KICK });
  prChips();
};

SCENES.draft = () => {   // S3: Không thể cải thiện bản nháp chưa tồn tại
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  // Hai tờ giấy so sánh
  tmPaper(230, 860, 'BẢN NHÁP VỤNG', 'Còn nhiều lỗi', 'nhưng ĐÃ CÓ!', popS(t0 + 0.2), -0.03);
  tmPaper(570, 860, 'TRANG TRẮNG', 'Trông hoàn hảo', 'nhưng CHƯA CÓ GÌ', popS(t0 + 0.6), 0.03);
  prCheck(230, 1100, t0 + 0.5);
  prCross(570, 1100, t0 + 0.9);

  txt('"Không thể cải thiện thứ chưa tồn tại!"', 430, 1260, 30, PR.mustard, { align: 'center', weight: 800 });

  prStar(160, 420, 32, PR.mustard);
  prClock(960, 520, 70, 4, 0, 'clk3');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('BẢN NHÁP CHƯA TỒN TẠI', { kicker: KICK });
  prChips();
};

SCENES.question = () => {   // S4: Phiên bản đầu tiên cần điều kiện tối thiểu nào?
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const qPop = popS(t0 + 0.3);
  withT(430, 860, 0, qPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3e7a62', { key: 'mvp_box', sb: 16, sy: 8, tex: 0.5 });
    txt('ĐỔI CÂU HỎI:', 0, -110, 34, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Không hỏi: "Làm sao để hoàn hảo?"', 0, 15, 24, '#f8b0b0', { align: 'center', weight: 700 });
    txt('HÃY HỎI:', 0, 60, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('"Điều kiện tối thiểu để ra mắt là gì?"', 0, 115, 28, PR.mustard, { align: 'center', weight: 800 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 15, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('ĐIỀU KIỆN TỐI THIỂU (MVP)', { kicker: KICK });
  prChips();
};

SCENES.iterate = () => {   // S5: Hoàn thành, quan sát và chỉnh sửa
  const t0 = E0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // 3 phiên bản xếp chồng tiến bộ
  const v1 = popS(t0 + 0.2);
  const v2 = popS(t0 + 0.5);
  const v3 = popS(t0 + 0.8);

  withT(240, 860, -0.04, v1, () => {
    pp(pR(-100, -120, 200, 240, 12), '#b0c0c0', { key: 'v1', sb: 10, sy: 5, tex: 0.4 });
    txt('V1.0', 0, 10, 32, PR.char, { align: 'center', base: 'middle', weight: 800 });
    txt('Hoàn thành', 0, 55, 18, PR.char, { align: 'center', weight: 600 });
  });

  withT(430, 860, 0, v2, () => {
    pp(pR(-100, -120, 200, 240, 12), '#70a090', { key: 'v2', sb: 12, sy: 6, tex: 0.4 });
    txt('V2.0', 0, 10, 32, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Quan sát', 0, 55, 18, PR.creamL, { align: 'center', weight: 600 });
  });

  withT(620, 860, 0.04, v3, () => {
    pp(pR(-100, -120, 200, 240, 12), '#3e7a62', { key: 'v3', sb: 14, sy: 7, tex: 0.5 });
    txt('V3.0', 0, 10, 32, PR.mustard, { align: 'center', base: 'middle', weight: 800 });
    txt('Chỉnh sửa', 0, 55, 18, PR.creamL, { align: 'center', weight: 600 });
  });

  txt('HOÀN THÀNH HƠN HOÀN HẢO!', 430, 1180, 32, PR.mustard, { align: 'center', weight: 800 });

  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('HOÀN THÀNH RỒI MỚI HOÀN HẢO', { kicker: KICK });
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

  prCommentBox(CX, 820, 'ĐIỀU BẠN TRÌ HOÃN', t0 + 0.5, { hint: 'Bạn đang trì hoãn điều gì?' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN ĐANG TRÌ HOÃN ĐIỀU GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VL('delay').t0 + 0.3 });
  cues.push({ k: 'thud', t: VL('draft').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('question').t0 + 0.2 });
  cues.push({ k: 'chime', t: VL('iterate').t0 + 0.3 });
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
