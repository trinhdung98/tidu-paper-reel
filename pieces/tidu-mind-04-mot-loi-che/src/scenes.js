// =====================================================================
//  TIDU MIND 04 — "Vì sao một lời chê có thể lấn át nhiều lời khen?"
//  Thiên kiến tiêu cực (Negativity Bias).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THIÊN KIẾN';
const TEAL = '#2e4f4f';

const SCENES = {};

// Phiếu giấy ghi lời khen (xanh) hoặc lời chê (đỏ/cam)
function tmNote(cx, cy, text, isGood = true, s = 1, rot = 0) {
  withT(cx, cy, rot, s, () => {
    const bg = isGood ? '#4a7c64' : '#9c4c4c';
    pp(pR(-130, -55, 260, 110, 14), bg, { key: 'n_' + text, sb: 12, sy: 6, tex: 0.45 });
    txt(isGood ? '👍 ' + text : '👎 ' + text, 0, 8, 24, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Nhiều phiếu khen rơi xuống cùng một phiếu chê
  const t0 = E0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // 3 phiếu khen rơi xuống
  tmNote(260, 680, 'Làm tốt lắm!', true, popS(t0 + 0.2), -0.04);
  tmNote(540, 620, 'Rất sáng tạo!', true, popS(t0 + 0.4), 0.03);
  tmNote(340, 860, 'Tuyệt vời!', true, popS(t0 + 0.6), -0.02);

  // 1 phiếu chê màu đỏ rơi ở giữa
  tmNote(480, 1060, 'Chưa được ổn lắm', false, popS(t0 + 0.9), 0.05);

  prClock(960, 520, 70, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b1' });
  prSign('10 LỜI KHEN — 1 LỜI CHÊ', { kicker: KICK });
  prChips();
};

SCENES.bias = () => {   // S2: Nhân vật chỉ nhìn chăm chăm vào phiếu chê
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  // Tấm bảng giải thích: THIÊN KIẾN TIÊU CỰC
  prBoard(60, 480, 740, 460, 'bd_bias');
  chalk('CƠ CHẾ NÃO BỘ:', 120, 590, 42, ev(t0 + 0.2, 0.5));
  chalk('THIÊN KIẾN', 120, 670, 56, ev(t0 + 0.5, 0.7));
  chalk('TIÊU CỰC', 120, 750, 56, ev(t0 + 0.8, 0.7));

  // Phiếu chê được phóng to
  tmNote(420, 1140, 'Chưa được ổn lắm', false, popS(t0 + 0.6) * 1.3, 0.02);

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(160, 1260, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -35, key: 'b2' });
  prSign('THIÊN KIẾN TIÊU CỰC', { kicker: KICK });
  prChips();
};

SCENES.occupy = () => {   // S3: Kính lúp phóng đại phiếu chê, những lời khen mờ đi
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  // Các lời khen mờ nhạt (alpha thấp)
  ctx.save(); ctx.globalAlpha = 0.35;
  tmNote(220, 680, 'Làm tốt lắm!', true, 0.85, -0.05);
  tmNote(620, 680, 'Rất sáng tạo!', true, 0.85, 0.04);
  ctx.restore();

  // Phiếu chê to đùng ở trung tâm với kính lúp
  const magPop = popS(t0 + 0.3);
  withT(420, 940, 0, magPop, () => {
    // Vòng tròn kính lúp
    pp(pE(0, 0, 240, 240), '#1a2228', { key: 'mag_rim', sb: 18, sy: 9, tex: 0.3 });
    pp(pE(0, 0, 220, 220), '#f8e8e8', { key: 'mag_glass', shadow: false, tex: 0.3 });
    // Text to bên trong
    txt('CHIẾM HẾT', 0, -35, 38, '#9c3c3c', { align: 'center', weight: 800 });
    txt('SUY NGHĨ!', 0, 25, 38, '#9c3c3c', { align: 'center', weight: 800 });
    // Cán kính lúp
    pp(pR(140, 140, 40, 160, 16), '#8a5c3a', { key: 'mag_handle', sb: 12, sy: 6, tex: 0.5 });
  });

  prClock(960, 520, 70, 4, 0, 'clk3');
  prStar(140, 420, 32, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'flat', look: -30, key: 'b3', hold: propNotebook(0.1) });
  prSign('MỘT LỜI CHÊ CHE HẾT', { kicker: KICK });
  prChips();
};

SCENES.truth = () => {   // S4: Chú ý nhiều ≠ Là toàn bộ sự thật
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const cardPop = popS(t0 + 0.3);
  withT(430, 860, 0, cardPop, () => {
    pp(pR(-300, -220, 600, 440, 20), '#3d6868', { key: 'truth_box', sb: 16, sy: 8, tex: 0.5 });
    txt('NHẮC NHỞ QUAN TRỌNG', 0, -150, 32, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-250, -100, 500, 4, 2), PR.creamL, { shadow: false });
    txt('Chú ý nhiều', 0, -40, 36, PR.mustard, { align: 'center', weight: 800 });
    txt('≠', 0, 15, 48, PR.creamL, { align: 'center', weight: 800 });
    txt('Toàn bộ sự thật', 0, 75, 36, PR.creamL, { align: 'center', weight: 800 });
    txt('Chỉ là 1 góc nhìn trong nhiều góc nhìn', 0, 140, 22, '#a0c0c0', { align: 'center', weight: 700 });
  });

  prCross(730, 860, t0 + 0.8);
  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 15, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('CHƯA PHẢI TOÀN BỘ SỰ THẬT', { kicker: KICK });
  prChips();
};

SCENES.filter = () => {   // S5: Tách 2 câu hỏi: Hữu ích? vs Đang bỏ qua điều tốt?
  const t0 = E0;
  prWall(TEAL, { streak: 320 });
  prFloor(1500, PR.woodD, { studs: false });

  const q1Pop = popS(t0 + 0.2);
  const q2Pop = popS(t0 + 0.8);

  withT(CX - 70, 680, 0, q1Pop, () => {
    pp(pR(-300, -90, 600, 180, 18), '#3e6a6a', { key: 'q1', sb: 14, sy: 7, tex: 0.4 });
    txt('CÂU HỎI 1:', -270, -35, 24, PR.mustard, { weight: 800 });
    txt('Phần nào hữu ích để cải thiện?', 0, 25, 28, PR.creamL, { align: 'center', weight: 800 });
  });

  withT(CX - 70, 960, 0, q2Pop, () => {
    pp(pR(-300, -90, 600, 180, 18), '#4e7a68', { key: 'q2', sb: 14, sy: 7, tex: 0.4 });
    txt('CÂU HỎI 2:', -270, -35, 24, PR.mustard, { weight: 800 });
    txt('Mình có bỏ qua điều làm tốt không?', 0, 25, 28, PR.creamL, { align: 'center', weight: 800 });
  });

  prCheck(730, 680, t0 + 0.6);
  prCheck(730, 960, t0 + 1.2);

  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('TÁCH HAI CÂU HỎI', { kicker: KICK });
  prChips();
};

SCENES.value = () => {   // S6: Học từ lời chê mà không phủ nhận giá trị bản thân
  const t0 = E0;
  prWall(TEAL, { streak: 260, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const banPop = popS(t0 + 0.3);
  withT(430, 860, 0, banPop, () => {
    pp(pR(-290, -160, 580, 320, 20), '#3b6058', { key: 'val_box', sb: 16, sy: 8, tex: 0.5 });
    txt('GIÁ TRỊ CỦA BẠN', 0, -80, 34, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -30, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Không bị định nghĩa bởi', 0, 30, 28, PR.creamL, { align: 'center', weight: 700 });
    txt('MỘT LỜI PHẢN HỒI', 0, 85, 34, PR.creamL, { align: 'center', weight: 800 });
  });

  prStar(160, 1260, 36, PR.pink);
  prClock(960, 520, 70, 4, 45, 'clk6');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -25, key: 'b6' });
  prSign('GIÁ TRỊ CỦA BẢN THÂN', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S7: Comment box CTA
  const t0 = E0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(190, 420, 36, PR.mustard);
  prStar(880, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 540, 68, 5, 0, 'clk7');

  prCommentBox(CX, 820, 'GỬI CHO BẠN BÈ', t0 + 0.5, { hint: 'Gửi người quá khắt khe với bản thân…' });

  prNote(150, 1240, { rot: -0.04, key: 'note7' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk7', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b7', look: -20 });
  prSign('BỚT KHẮT KHE VỚI MÌNH NHÉ!', { kicker: KICK });
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
  cues.push({ k: 'thud', t: VL('occupy').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('truth').t0 + 0.3 });
  cues.push({ k: 'tick', t: VL('filter').t0 + 0.2 });
  cues.push({ k: 'tick', t: VL('filter').t0 + 0.8 });
  cues.push({ k: 'chime', t: VL('value').t0 + 0.3 });
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
