// =====================================================================
//  TIDU MIND 08 — "Vì sao chúng ta chỉ tin những điều mình muốn tin?"
//  Thiên kiến xác nhận (Confirmation Bias).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THIÊN KIẾN';
const TEAL = '#2e4f4f';

const SCENES = {};

// Phiếu bằng chứng mini
function tmProof(cx, cy, label, isAgree = true, s = 1) {
  withT(cx, cy, 0, s, () => {
    const col = isAgree ? '#4a7c64' : '#9c4c4c';
    pp(pR(-130, -50, 260, 100, 12), col, { key: 'pf_' + label, sb: 12, sy: 6, tex: 0.45 });
    txt(isAgree ? '✓ ' + label : '✗ ' + label, 0, 7, 24, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Tìm sự thật hay tìm bằng chứng chứng minh mình đúng?
  const t0 = E0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // Hai biển ý kiến đối lập
  withT(270, 860, -0.03, popS(t0 + 0.2), () => {
    pp(pR(-160, -180, 320, 360, 18), '#4e8268', { key: 'side_a', sb: 16, sy: 8, tex: 0.5 });
    txt('TÌM SỰ THẬT', 0, -100, 30, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-120, -50, 240, 4, 2), PR.creamL, { shadow: false });
    txt('Tò mò &', 0, 15, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('Lắng nghe', 0, 65, 26, PR.mustard, { align: 'center', weight: 800 });
  });

  withT(690, 860, 0.03, popS(t0 + 0.6), () => {
    pp(pR(-160, -180, 320, 360, 18), '#9e5050', { key: 'side_b', sb: 16, sy: 8, tex: 0.5 });
    txt('TÌM BẰNG CHỨNG', 0, -100, 26, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-120, -50, 240, 4, 2), PR.creamL, { shadow: false });
    txt('Để chứng minh', 0, 15, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('"MÌNH ĐÚNG!"', 0, 65, 28, PR.mustard, { align: 'center', weight: 800 });
  });

  prClock(960, 520, 70, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b1' });
  prSign('TÌM SỰ THẬT HAY TỰ VỆ?', { kicker: KICK });
  prChips();
};

SCENES.bias = () => {   // S2: Chỉ nhặt những bài viết khen ngợi, bỏ qua bài khác
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  // 3 phiếu đồng tình ở trung tâm
  tmProof(430, 660, 'Bài khen ngợi A', true, popS(t0 + 0.2));
  tmProof(430, 800, 'Nghiên cứu ủng hộ', true, popS(t0 + 0.5));
  tmProof(430, 940, 'Ai cũng làm theo', true, popS(t0 + 0.8));

  // 1 phiếu trái chiều bị mờ ở góc
  ctx.save(); ctx.globalAlpha = 0.3;
  tmProof(220, 1140, 'Bằng chứng trái chiều', false, 0.9);
  ctx.restore();
  txt('(Bị bỏ qua!)', 420, 1140, 24, PR.mustard, { weight: 800 });

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(140, 420, 32, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -35, key: 'b2' });
  prSign('CHỈ CHỌN THỨ MÌNH MUỐN THẤY', { kicker: KICK });
  prChips();
};

SCENES.confirm = () => {   // S3: Giải thích: THIÊN KIẾN XÁC NHẬN
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  // Tấm bảng giải thích
  prBoard(60, 480, 740, 480, 'bd_conf');
  chalk('CƠ CHẾ NHẬN THỨC:', 120, 590, 40, ev(t0 + 0.2, 0.5));
  chalk('THIÊN KIẾN', 120, 670, 56, ev(t0 + 0.5, 0.7));
  chalk('XÁC NHẬN', 120, 750, 56, ev(t0 + 0.8, 0.7));
  chalk('(Confirmation Bias)', 120, 830, 36, ev(t0 + 1.1, 0.5));

  // Cảnh báo
  withT(CX - 80, 1160, 0, popS(t0 + 1.2), () => {
    pp(pR(-280, -60, 560, 120, 16), '#9e4c4c', { key: 'warn_cf', sb: 12, sy: 6, tex: 0.4 });
    txt('Cảm giác chắc chắn tăng lên,', 0, -15, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('dù bằng chứng chưa đầy đủ!', 0, 25, 26, PR.mustard, { align: 'center', weight: 800 });
  });

  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 0, 'clk3');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('THIÊN KIẾN XÁC NHẬN', { kicker: KICK });
  prChips();
};

SCENES.challenge = () => {   // S4: Tìm nguồn có quan điểm khác mình: Không phải tự phủ nhận
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const cardPop = popS(t0 + 0.3);
  withT(430, 860, 0, cardPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3e7a62', { key: 'chal_box', sb: 16, sy: 8, tex: 0.5 });
    txt('THỬ THÁCH TƯ DUY', 0, -110, 34, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Chủ động tìm kiếm:', 0, 15, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('1 NGUỒN CÓ QUAN ĐIỂM KHÁC', 0, 70, 30, PR.mustard, { align: 'center', weight: 800 });
    txt('Đó là bản lĩnh, không phải tự phủ nhận!', 0, 125, 22, '#d0f0e0', { align: 'center', weight: 600 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 15, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('TÌM MỘT GÓC NHÌN KHÁC', { kicker: KICK });
  prChips();
};

SCENES.test = () => {   // S5: Đó là cách kiểm tra niềm tin tốt hơn
  const t0 = E0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const testPop = popS(t0 + 0.3);
  withT(430, 860, 0, testPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3b6860', { key: 'test_box', sb: 16, sy: 8, tex: 0.5 });
    txt('CÁCH THỬ LỬA NIỀM TIN', 0, -110, 32, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Niềm tin vững chắc thật sự', 0, 20, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('LÀ NIỀM TIN ĐÃ VƯỢT QUA', 0, 75, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('CÁC PHẢN BIỆN!', 0, 125, 34, PR.mustard, { align: 'center', weight: 800 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('KIỂM TRA NIỀM TIN TỐT HƠN', { kicker: KICK });
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

  prCommentBox(CX, 820, 'ĐỔI QUAN ĐIỂM', t0 + 0.5, { hint: 'Bạn từng đổi quan điểm vì bằng chứng mới?' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN TỪNG ĐỔI QUAN ĐIỂM CHƯA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VL('bias').t0 + 0.3 });
  cues.push({ k: 'thud', t: VL('confirm').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('challenge').t0 + 0.2 });
  cues.push({ k: 'chime', t: VL('test').t0 + 0.3 });
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
