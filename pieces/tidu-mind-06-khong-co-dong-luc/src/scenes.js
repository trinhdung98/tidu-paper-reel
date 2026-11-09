// =====================================================================
//  TIDU MIND 06 — "Không có động lực thì bắt đầu bằng cách nào?"
//  Hành vi & Thói quen: Vi mô hóa bước đi (Micro-stepping / 2-Minute Rule).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THÓI QUEN';
const TEAL = '#2e4f4f';

const SCENES = {};

// Ngọn núi giấy tam giác
function tmMountain(cx, cy, w, h, s = 1) {
  withT(cx, cy, 0, s, () => {
    // Thân núi
    pp(pG([[-w / 2, h / 2], [0, -h / 2], [w / 2, h / 2]]), '#3a5050', { key: 'mt_body', sb: 18, sy: 9, tex: 0.5 });
    // Đỉnh núi phủ tuyết / kem
    pp(pG([[-w * 0.2, -h * 0.1], [0, -h / 2], [w * 0.2, -h * 0.1]]), PR.creamL, { shadow: false });
    txt('CÔNG VIỆC', 0, 40, 38, PR.creamL, { align: 'center', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Ngọn núi giấy và 1 viên đá nhỏ
  const t0 = E0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // Ngọn núi lớn
  tmMountain(420, 860, 560, 600, popS(t0 + 0.2));

  // Viên đá nhỏ màu vàng/cam phía trước
  const rockPop = popS(t0 + 0.8);
  withT(420, 1220, 0.05, rockPop, () => {
    pp(pR(-90, -40, 180, 80, 14), PR.mustard, { key: 'rock', sb: 12, sy: 6, tex: 0.4 });
    txt('VIÊN ĐÁ NHỎ', 0, 6, 20, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  prClock(960, 520, 70, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b1' });
  prSign('BẮT ĐẦU BẰNG MỘT VIÊN ĐÁ', { kicker: KICK });
  prChips();
};

SCENES.heavy = () => {   // S2: Checklist dài dằng dặc: Báo cáo 20 trang thật nặng nề
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const listPop = popS(t0 + 0.2);
  withT(430, 860, 0, listPop, () => {
    pp(pR(-280, -250, 560, 500, 18), PR.creamL, { key: 'long_list', sb: 18, sy: 9, tex: 0.5 });
    txt('CHECKLIST NẶNG NỀ', 0, -180, 32, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-240, -130, 480, 4, 2), PR.navy, { shadow: false });

    const items = ['Viết báo cáo 20 trang', 'Thu thập toàn bộ số liệu', 'Phân tích kết quả khảo sát', 'Soạn slide thuyết trình'];
    items.forEach((it, i) => {
      const y = -70 + i * 75;
      pp(pR(-220, y - 20, 36, 36, 6), '#e2e8e8', { shadow: false });
      txt(it, -160, y + 6, 24, PR.char, { weight: 700 });
    });
  });

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(140, 420, 32, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -35, key: 'b2' });
  prSign('KHI CÔNG VIỆC QUÁ LỚN', { kicker: KICK });
  prChips();
};

SCENES.small = () => {   // S3: Mở tài liệu + viết 3 dòng: Điểm khởi đầu rõ ràng
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  const notePop = popS(t0 + 0.3);
  withT(430, 860, 0, notePop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3d6868', { key: 'small_box', sb: 16, sy: 8, tex: 0.5 });
    txt('HÀNH ĐỘNG SIÊU NHỎ', 0, -110, 32, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });

    txt('Không phải: Viết 20 trang', 0, 10, 26, '#f8b0b0', { align: 'center', weight: 700 });
    txt('MÀ LÀ:', 0, 60, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('"Mở file và gõ 3 dòng"', 0, 115, 34, PR.mustard, { align: 'center', weight: 800 });
  });

  prCheck(730, 860, t0 + 0.9);
  prClock(960, 520, 70, 4, 0, 'clk3');
  prStar(160, 1260, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('MỞ FILE VÀ GÕ 3 DÒNG', { kicker: KICK });
  prChips();
};

SCENES.action = () => {   // S4: Chọn hành động đơn giản đến mức làm được ngay
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const actPop = popS(t0 + 0.3);
  withT(430, 860, 0, actPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3e7a62', { key: 'act_box', sb: 16, sy: 8, tex: 0.5 });
    txt('QUY TẮC 2 PHÚT', 0, -110, 34, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Chọn việc nhỏ đến mức:', 0, 15, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('BẠN KHÔNG THỂ TỪ CHỐI!', 0, 75, 32, PR.mustard, { align: 'center', weight: 800 });
    txt('Làm xong rồi mới tính tiếp', 0, 130, 22, '#d0f0e0', { align: 'center', weight: 600 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 15, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('HÀNH ĐỘNG DỄ ĐẾN MỨC LÀM NGAY', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Đổi kích thước của bước đầu tiên, không phải đổi mục tiêu
  const t0 = E0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const refPop = popS(t0 + 0.3);
  withT(430, 860, 0, refPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3b6860', { key: 'ref_b6', sb: 16, sy: 8, tex: 0.5 });
    txt('THÔNG ĐIỆP CỐT LÕI', 0, -110, 32, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Giữ nguyên mục tiêu lớn', 0, 20, 28, PR.creamL, { align: 'center', weight: 700 });
    txt('THU NHỎ BƯỚC ĐẦU TIÊN', 0, 80, 34, PR.mustard, { align: 'center', weight: 800 });
    txt('Đà chuyển động sẽ xuất hiện sau đó!', 0, 135, 20, '#b0d8d0', { align: 'center', weight: 600 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('THU NHỎ BƯỚC ĐẦU TIÊN', { kicker: KICK });
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

  prCommentBox(CX, 820, 'BƯỚC NHỎ HÔM NAY', t0 + 0.5, { hint: 'Việc nhỏ nhất bạn có thể làm ngay?' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BƯỚC NHỎ NHẤT HÔM NAY LÀ GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VL('heavy').t0 + 0.3 });
  cues.push({ k: 'thud', t: VL('small').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('action').t0 + 0.2 });
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
