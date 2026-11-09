// =====================================================================
//  TIDU MIND 02 — "Họ không trả lời tin nhắn, có phải họ ghét bạn?"
//  Thiên kiến suy diễn / Đọc tâm trí (Mind Reading Distortion).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · CẢM XÚC';
const TEAL = '#2e4f4f';

const SCENES = {};

// Khung điện thoại hiển thị tin nhắn
function tmPhone(cx, cy, s = 1) {
  withT(cx, cy, 0, s, () => {
    // Vỏ điện thoại
    pp(pR(-180, -320, 360, 640, 36), '#1a2228', { key: 'ph_body', sb: 18, sy: 9, tex: 0.4 });
    // Màn hình
    pp(pR(-162, -302, 324, 604, 24), '#f0f4f4', { key: 'ph_screen', shadow: false, tex: 0.3 });
    // Notch / loa
    pp(pR(-50, -290, 100, 14, 7), '#111', { shadow: false });
    // Header chat
    pp(pR(-162, -270, 324, 60, 0), '#e2e8e8', { shadow: false });
    txt('Bạn thân', 0, -232, 26, PR.navy, { align: 'center', weight: 800 });
    // Tin nhắn đã gửi đi (màu xanh bên phải)
    pp(pR(-40, -180, 180, 80, 16), '#5a9e6f', { key: 'msg_sent', sb: 6, sy: 3, tex: 0.3 });
    txt('Cậu rảnh không?', 50, -132, 22, PR.creamL, { align: 'center', weight: 700 });
    // Trạng thái: Đã gửi 15:30
    txt('Đã gửi · 15:30', 50, -85, 16, PR.greyD, { align: 'center', weight: 600 });
    // Dấu chấm loading (đang chờ...)
    pp(pE(-20, -30, 8, 8), '#a0b0b0', { shadow: false });
    pp(pE(0, -30, 8, 8), '#a0b0b0', { shadow: false });
    pp(pE(20, -30, 8, 8), '#a0b0b0', { shadow: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Điện thoại hiện tin nhắn chưa trả lời
  const t0 = E0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // Điện thoại ở trung tâm bên trái
  const phPop = popS(t0 + 0.2);
  tmPhone(380, 940, phPop * 1.05);

  // Đồng hồ chạy chậm
  prClock(960, 520, 70, 3, 30 + TT * 2, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -35, key: 'b1' });
  prSign('CHƯA TRẢ LỜI TIN NHẮN?', { kicker: KICK });
  prChips();
};

SCENES.overthink = () => {   // S2: 3 bong bóng suy nghĩ: Họ giận? Mình nói sai? Ghét mình?
  prWall(TEAL, { streak: 520 });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb2', sb: 10, sy: 5, tex: 0.6 });

  // 3 bong bóng suy nghĩ popping
  const b1T = VW('overthink', 'giận', 0).t0;
  const b2T = VW('overthink', 'sai', 0).t0;
  const b3T = VW('overthink', 'thích', 0).t0;

  const bubbles = [
    { x: 300, y: 640, w: 380, h: 140, text: 'HỌ GIẬN MÌNH?', t: b1T, col: '#f6d080' },
    { x: 420, y: 840, w: 420, h: 140, text: 'MÌNH NÓI SAI À?', t: b2T, col: '#f8a888' },
    { x: 340, y: 1040, w: 460, h: 150, text: 'HỌ GHÉT MÌNH RỒI?', t: b3T, col: '#f28888' },
  ];

  bubbles.forEach((b, i) => {
    const k = popS(b.t);
    if (k > 0.05) {
      withT(b.x, b.y, (i % 2 === 0 ? -0.03 : 0.03), k, () => {
        pp(pR(-b.w / 2, -b.h / 2, b.w, b.h, 24), PR.creamL, { key: 'bub_' + i, sb: 14, sy: 7, tex: 0.4 });
        txt(b.text, 0, 8, 32, PR.navy, { align: 'center', base: 'middle', weight: 800 });
      });
    }
  });

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(140, 1260, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b2' });
  prSign('KỊCH BẢN TRONG ĐẦU', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // S3: Tách đôi: SỰ THẬT vs SUY ĐOÁN
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const cardPop = popS(t0 + 0.3);

  // Thẻ SỰ THẬT (bên trái - màu xanh)
  withT(270, 860, -0.02, cardPop, () => {
    pp(pR(-180, -220, 360, 440, 20), '#4e8268', { key: 'fact_card', sb: 16, sy: 8, tex: 0.5 });
    txt('SỰ THẬT', 0, -150, 36, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-150, -100, 300, 4, 2), PR.creamL, { shadow: false });
    txt('Họ chưa', 0, -20, 32, PR.creamL, { align: 'center', weight: 700 });
    txt('trả lời', 0, 30, 32, PR.creamL, { align: 'center', weight: 700 });
    txt('tin nhắn', 0, 80, 32, PR.creamL, { align: 'center', weight: 700 });
    prCheck(0, 160, t0 + 0.8);
  });

  // Thẻ SUY ĐOÁN (bên phải - màu cam đất)
  withT(690, 860, 0.02, cardPop, () => {
    pp(pR(-180, -220, 360, 440, 20), '#9e5a4e', { key: 'guess_card', sb: 16, sy: 8, tex: 0.5 });
    txt('SUY ĐOÁN', 0, -150, 36, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-150, -100, 300, 4, 2), PR.creamL, { shadow: false });
    txt('Họ giận', 0, -40, 28, PR.creamL, { align: 'center', weight: 700 });
    txt('Họ ghét', 0, 10, 28, PR.creamL, { align: 'center', weight: 700 });
    txt('Mình nói sai', 0, 60, 28, PR.creamL, { align: 'center', weight: 700 });
    prCross(0, 160, t0 + 1.2);
  });

  prClock(960, 520, 70, 4, 15, 'clk3');
  prStar(480, 420, 36, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'neutral', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('SỰ THẬT VÀ SUY ĐOÁN', { kicker: KICK });
  prChips();
};

SCENES.distortion = () => {   // S4: Hiện tượng đọc tâm trí người khác
  const t0 = E0;
  prWall(TEAL, { streak: 450 });
  prFloor(1500, PR.woodD, { studs: false });

  // Tấm bảng tâm lý
  prBoard(60, 480, 740, 480, 'bd_dist');
  chalk('BẪY TÂM LÝ:', 120, 600, 46, ev(t0 + 0.3, 0.6));
  chalk('ĐỌC TÂM TRÍ', 120, 690, 56, ev(t0 + 0.6, 0.8));
  chalk('(Mind Reading)', 120, 770, 36, ev(t0 + 0.9, 0.5));

  // Thẻ thực tế: "Có thể họ đang bận"
  const busyT = VW('distortion', 'nghĩ', 0).t0;
  withT(CX - 80, 1140, -0.02, popS(busyT), () => {
    pp(pR(-280, -70, 560, 140, 18), PR.creamL, { key: 'busy_card', sb: 12, sy: 6, tex: 0.4 });
    txt('💡 Có thể họ đang bận thôi!', 0, 8, 30, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  prStar(160, 1260, 32, PR.pink);
  prClock(960, 520, 70, 4, 30, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'wow', look: -20, key: 'b4', hold: propGlass(0.2) });
  prSign('BẪY "ĐỌC TÂM TRÍ"', { kicker: KICK });
  prChips();
};

SCENES.action = () => {   // S5: Kiểm tra bằng chứng & trao đổi trực tiếp
  prWall(TEAL, { streak: 280, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // 2 bước hành động dạng card
  const a1T = VW('action', 'chứng', 0).t0;
  const a2T = VW('action', 'tiếp', 0).t0;

  withT(CX - 70, 680, 0, popS(a1T), () => {
    pp(pR(-300, -90, 600, 180, 18), '#3e6a6a', { key: 'act1', sb: 14, sy: 7, tex: 0.4 });
    txt('1. HỎI LẠI BẢN THÂN:', -270, -35, 24, PR.mustard, { weight: 800 });
    txt('"Có bằng chứng nào không?"', 0, 25, 30, PR.creamL, { align: 'center', weight: 800 });
  });

  withT(CX - 70, 960, 0, popS(a2T), () => {
    pp(pR(-300, -90, 600, 180, 18), '#4e7a68', { key: 'act2', sb: 14, sy: 7, tex: 0.4 });
    txt('2. HÀNH ĐỘNG THAY THẾ:', -270, -35, 24, PR.mustard, { weight: 800 });
    txt('Hỏi trực tiếp thay vì tự đoán', 0, 25, 30, PR.creamL, { align: 'center', weight: 800 });
  });

  prCheck(730, 960, a2T + 0.4);
  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 5, 0, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -25, key: 'b5' });
  prSign('KIỂM TRA BẰNG CHỨNG', { kicker: KICK });
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
  prClock(960, 540, 68, 5, 15, 'clk6');

  prCommentBox(CX, 820, 'LƯU VIDEO NÀY', t0 + 0.5, { hint: 'Lưu cho lần chờ tin nhắn…' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('LƯU LẠI KHI CẦN NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VW('overthink', 'giận', 0).t0 });
  cues.push({ k: 'tick', t: VW('overthink', 'sai', 0).t0 });
  cues.push({ k: 'tick', t: VW('overthink', 'thích', 0).t0 });
  cues.push({ k: 'thud', t: VL('reality').t0 + 0.3 });
  cues.push({ k: 'chime', t: VW('distortion', 'nghĩ', 0).t0 });
  cues.push({ k: 'pop', t: VW('action', 'chứng', 0).t0 });
  cues.push({ k: 'pop', t: VW('action', 'tiếp', 0).t0 });
  const ctaL = VL('cta');
  cues.push({ k: 'type', t: ctaL.t0 + 0.5, n: 14, d: 1.2 });
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
