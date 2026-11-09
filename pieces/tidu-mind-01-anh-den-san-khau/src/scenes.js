
// =====================================================================
//  TIDU MIND 01 — "Vì sao bạn nghĩ ai cũng đang nhìn mình?"
//  Hiệu ứng ánh đèn sân khấu (Spotlight Effect) — Tâm lý xã hội.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · TÂM LÝ HỌC';
const TEAL  = '#2e4f4f';
const TEAL_L = '#3d6b6b';
const CREAM  = PR.creamL;

const SCENES = {};

// ---- CUSTOM HELPERS (tm prefix) ----

// Đèn sân khấu spotlight hình tròn gradient từ trên chiếu xuống
function tmSpotlight(cx, cy, r, alpha = 1) {
  const grad = ctx.createRadialGradient(cx, cy - r * 0.3, r * 0.05, cx, cy, r);
  grad.addColorStop(0, `rgba(255,230,120,${0.55 * alpha})`);
  grad.addColorStop(0.55, `rgba(255,220,80,${0.18 * alpha})`);
  grad.addColorStop(1, 'rgba(255,220,80,0)');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 0.72, r, 0, 0, Math.TAU ?? (Math.PI * 2));
  ctx.fill();
  ctx.restore();
}

// Mắt giấy đơn giản: ellipse với pupil nhìn về nhân vật
function tmEye(cx, cy, s, lookX) {
  const dx = clamp((lookX - cx) / 120, -1, 1);
  pp(pE(cx, cy, 36 * s, 28 * s), PR.paperW, { key: 'eye' + cx, sb: 6, sy: 3, tex: 0.4 });
  pp(pE(cx + dx * 10 * s, cy, 14 * s, 14 * s), '#1a1a1a', { shadow: false });
  pp(pE(cx + dx * 10 * s - 4 * s, cy - 4 * s, 5 * s, 5 * s), PR.creamL, { shadow: false });
}

// Đám đông đơn giản: hàng các hình người giấy ngồi/đứng, mắt nhìn về nhân vật
function tmCrowd(focusX, alpha = 1) {
  const seats = [-420, -280, -140, 0, 140, 280, 420];
  ctx.save(); ctx.globalAlpha = alpha;
  seats.forEach((dx, i) => {
    const x = CX + dx, y = 1300 + (i % 2 === 0 ? 0 : 30);
    const col = [PR.char, TEAL_L, '#5a7a6a', PR.greyD][i % 4];
    pp(pR(x - 28, y - 90, 56, 90, 10), col, { key: 'body' + i, sb: 8, sy: 4, tex: 0.5 });
    pp(pE(x, y - 110, 30, 30), PR.cream, { key: 'head' + i, sb: 6, sy: 3, tex: 0.4 });
    tmEye(x - 10, y - 115, 0.65, focusX);
    tmEye(x + 10, y - 115, 0.65, focusX);
  });
  ctx.restore();
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: nhân vật bước vào phòng; nhiều mắt hướng về
  const t0 = E0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1480, PR.woodD, { studs: false });
  pp(pR(60, 1450, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });

  // khán phòng ngồi sau
  tmCrowd(BRAINY_X, 1);

  // đèn sân khấu từ trên
  const slightFrac = ev(t0 + 0.6, 1.5);
  tmSpotlight(BRAINY_X, 1500, 580 * slightFrac);

  // rèm sân khấu hai bên
  pp(pR(-10, 300, 160, 1200, 0), '#6b1a1a', { key: 'curtainL', sb: 20, sy: 10, tex: 0.7 });
  pp(pR(W - 150, 300, 160, 1200, 0), '#6b1a1a', { key: 'curtainR', sb: 20, sy: 10, tex: 0.7 });

  // ngôi sao trên sân khấu
  prStar(CX, 350, 55, PR.mustard);
  prStar(200, 420, 32, PR.orange);
  prStar(880, 420, 32, PR.pink);

  // mascot bước vào từ trái, mood ngại ngùng
  const walkX = springMove(t0 + 0.2, 100, BRAINY_X, { stiff: 90, damp: 14 });
  brainy(walkX, BRAINY_Y, { hat: 'detective', mood: TT > t0 + 1.6 ? 'flat' : 'neutral', look: -20, key: 'b1', walk: TT < t0 + 1.4 });

  prSign('TẤT CẢ ĐANG NHÌN MÌNH?', { kicker: KICK });
  prChips();
};

SCENES.feel = () => {   // S2: nhân vật phát hiện vết bẩn trên áo, bối rối
  prWall(TEAL, { streak: 580 });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb2', sb: 10, sy: 5, tex: 0.6 });

  // gương soi trên tường
  pp(pR(80, 500, 340, 460, 18), '#c8c0a8', { key: 'mirror_frame', sb: 20, sy: 10, tex: 0.5 });
  pp(pR(100, 520, 300, 420, 12), '#d6e8e8', { key: 'mirror', shadow: false, tex: 0.3 });
  txt('👁', 250, 730, 60, PR.char, { align: 'center', base: 'middle' });

  // vết bẩn trên áo (xuất hiện theo từ "vết bẩn")
  const stainT = VW('feel', 'vết', 0).t0;
  const stainPop = popS(stainT);
  withT(BRAINY_X - 20, BRAINY_Y - 310, 0.1, stainPop, () => {
    pp(pE(0, 0, 38, 28), '#7a3a10', { key: 'stain', sb: 8, sy: 4, tex: 0.6 });
    txt('!', 0, 2, 32, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  // dấu chấm hỏi lơ lửng (bối rối)
  const confT = VW('feel', 'câu', 0).t0;
  prBurst(CX - 80, 900, confT);
  withT(CX - 80, 870, 0, popS(confT), () =>
    txt('?', 0, 0, 72, PR.mustard, { align: 'center', base: 'middle', weight: 800 }));

  // nốt nhỏ nhắc "đã quên ngay"
  const forgetT = VW('feel', 'quên', 0).t0;
  prStamp('ĐÃ QUÊN', 230, 1180, PR.greyD, forgetT, { rot: -0.08, size: 1.0 });

  // đồng hồ trên tường
  prClock(960, 500, 70, 11, 48, 'clk2');

  // chi tiết nền
  prNote(160, 1180, { rot: -0.06, key: 'note1' });
  pp(pR(830, 1250, 120, 160, 6), PR.char, { key: 'book1', sb: 10, sy: 5, tex: 0.5 });
  pp(pR(856, 1232, 68, 180, 4), PR.blue, { key: 'book2', sb: 8, sy: 4, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'flat', look: -30, key: 'b2' });
  prSign('VẾT BẨN — VÀ NHỚ MÃI', { kicker: KICK });
  prChips();
};

SCENES.explain = () => {   // S3: camera kéo rộng — mọi người đang làm việc riêng
  const t0 = E0;
  prWall('#3a5a5a', { streak: 300, panel: 'rgba(255,255,255,0.04)' });
  prFloor(1500, PR.woodD, { studs: true });

  // hiện tên khái niệm lên bảng lớn
  const boardT = VW('explain', 'hiệu', 0).t0;
  prBoard(50, 450, 760, 580, 'board3');
  chalk('HIỆU ỨNG', 110, 600, 54, ev(boardT, 0.7));
  chalk('ÁNH ĐÈN', 110, 680, 54, ev(boardT + 0.3, 0.7));
  chalk('SÂN KHẤU', 110, 760, 54, ev(boardT + 0.6, 0.7));

  // spotlight nhỏ mờ dần đi
  const fadeFrac = clamp(1 - ev(t0 + 1.0, 1.5));
  tmSpotlight(BRAINY_X, 1500, 460 * fadeFrac);

  // đám đông quay đi làm việc riêng (alpha giảm dần)
  const crowdAlpha = clamp(1 - ev(t0 + 0.8, 1.2));
  tmCrowd(CX, crowdAlpha);

  prClock(960, 500, 70, 10, 15, 'clk3');
  prStar(880, 1120, 28, PR.mustard);
  prBunting(280);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -20, key: 'b3', hold: propNotebook(0.1) });
  prSign('HIỆU ỨNG ÁNH ĐÈN', { kicker: KICK });
  prChips();
};

SCENES.science = () => {   // S4: góc nhìn rộng — mọi người bận tâm chuyện riêng
  const t0 = E0;
  prWall(TEAL, { streak: 460, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // 3 ô nhỏ miêu tả người khác đang bận: điện thoại, sách, cà phê
  const cells = [
    { x: 130, y: 680, icon: '📱', label: 'ĐANG NHẮN TIN', col: '#3d6b6b' },
    { x: CX,  y: 680, icon: '☕', label: 'ĐANG CÀ PHÊ',   col: PR.orange },
    { x: 790, y: 680, icon: '📖', label: 'ĐANG ĐỌC SÁCH', col: '#5a4a7a' },
  ];
  cells.forEach(({ x, y, icon, label, col }, i) => {
    const pt = popS(t0 + 0.3 + i * 0.4);
    withT(x, y, 0, pt, () => {
      pp(pR(-155, -180, 310, 360, 18), col, { key: 'cell' + i, sb: 14, sy: 7, tex: 0.5 });
      txt(icon, 0, -60, 72, '#fff', { align: 'center', base: 'middle' });
      txt(label, 0, 70, 24, PR.creamL, { align: 'center', weight: 800 });
    });
  });

  // counter: "Mỗi người" đang làm X
  const countT = VW('science', 'họ', 0).t0;
  prCounter('NGƯỜI KHÁC', '100%', 540, 1180, { w: 440, h: 180, rot: -0.02, s: popS(countT) });

  prStar(170, 1250, 32, PR.mustard);
  prStar(900, 1200, 26, PR.pink);
  prClock(960, 1380, 60, 3, 25, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', key: 'b4', hold: propGlass(0.15) });
  prSign('HỌ ĐANG BẬN CHUYỆN RIÊNG', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: đèn tắt dần; câu hỏi tự vấn hiện ra
  prWall(TEAL, { streak: 200, panel: 'rgba(255,255,255,0.025)' });
  prFloor(1500, PR.woodD, { studs: false });

  // spotlight lớn rồi mờ dần khi nhắc đến "ánh đèn"
  const lightT  = VW('reframe', 'ánh', 0).t0;
  tmSpotlight(CX, 1300, 600 * (1 - clamp(ev(lightT + 0.5, 1.5))));

  // thought bubble tự vấn — single-line để tránh clip
  const thinkT = VW('reframe', 'tự', 0).t0;
  const thinkK = thinkT != null ? popS(thinkT) : 1;
  prThought(200, 620, 820, 280, BRAINY_X - 280, BRAINY_Y - 400, '', { t: thinkT });
  if (thinkK > 0.6) {
    txt('MÌNH CÓ ĐANG', 200, 560, 48, PR.navy, { align: 'center', weight: 800 });
    txt('TƯỞNG TƯỢNG', 200, 620, 48, PR.navy, { align: 'center', weight: 800 });
    txt('QUÁ MẠNH?', 200, 680, 48, PR.navy, { align: 'center', weight: 800 });
  }

  // dấu check khi câu trả lời là "không"
  const checkT = VW('reframe', 'không', 0).t0;
  prCheck(CX, 1200, checkT);

  prClock(960, 500, 70, 9, 55, 'clk5');
  prNote(140, 1300, { rot: 0.05, key: 'note5' });
  prStar(900, 1120, 30, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: TT > lightT + 1.0 ? 'happy' : 'neutral', key: 'b5', look: -30 });
  prSign('BẠN KHÔNG PHẢI TÂM ĐIỂM', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: comment box CTA
  const t0 = E0;
  prWall(TEAL, { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(190, 420, 36, PR.mustard);
  prStar(880, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 540, 68, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'CÂU CHUYỆN CỦA BẠN', t0 + 0.5, { hint: 'Kể một câu chuyện nhé…' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('KỂ CHO MÌNH NGHE NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  // thud khi vết bẩn xuất hiện
  const stainT = VW('feel', 'vết', 0).t0;
  cues.push({ k: 'pop', t: stainT });
  // tick khi hiện tên khái niệm
  const boardT = VW('explain', 'hiệu', 0).t0;
  cues.push({ k: 'tick', t: boardT });
  cues.push({ k: 'tick', t: boardT + 0.3 });
  cues.push({ k: 'tick', t: boardT + 0.6 });
  // pop mỗi ô cuộc sống
  [0, 0.4, 0.8].forEach(d => cues.push({ k: 'pop', t: VL('science').t0 + 0.3 + d }));
  // chime khi thought bubble
  cues.push({ k: 'chime', t: VW('reframe', 'tự', 0).t0 });
  // pop check
  cues.push({ k: 'pop', t: VW('reframe', 'không', 0).t0 });
  // type cho comment box
  const ctaL = VL('cta');
  cues.push({ k: 'type', t: ctaL.t0 + 0.5, n: 16, d: 1.4 });
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
