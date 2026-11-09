// =====================================================================
//  TIDU MIND 05 — "Mạng xã hội có khiến bạn thấy mình thua kém?"
//  Bẫy so sánh xã hội (Social Comparison Bias).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · TÂM LÝ XÃ HỘI';
const TEAL = '#2e4f4f';

const SCENES = {};

// Bài đăng mạng xã hội mini
function tmSocialPost(cx, cy, icon, title, likes, s = 1) {
  withT(cx, cy, 0, s, () => {
    pp(pR(-160, -110, 320, 220, 16), PR.creamL, { key: 'post_' + title, sb: 14, sy: 7, tex: 0.45 });
    // Icon ảnh
    pp(pE(0, -35, 45, 45), '#4a7a68', { shadow: false });
    txt(icon, 0, -26, 42, '#fff', { align: 'center', base: 'middle' });
    // Tiêu đề
    txt(title, 0, 30, 24, PR.navy, { align: 'center', weight: 800 });
    // Nút like
    txt('❤️ ' + likes, 0, 75, 20, PR.red, { align: 'center', weight: 700 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Lướt mạng xã hội: Mua nhà, du lịch, thăng chức
  const t0 = E0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // 3 bài đăng xuất hiện liên tiếp
  tmSocialPost(220, 720, '🏡', 'Vừa mua nhà!', '1.2k', popS(t0 + 0.2));
  tmSocialPost(580, 640, '✈️', 'Du lịch châu Âu', '2.5k', popS(t0 + 0.5));
  tmSocialPost(380, 980, '💼', 'Thăng chức!', '3.8k', popS(t0 + 0.8));

  prClock(960, 520, 70, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b1' });
  prSign('NGƯỜI KHÁC LIÊN TỤC THÀNH CÔNG?', { kicker: KICK });
  prChips();
};

SCENES.slow = () => {   // S2: Nhìn lại bàn làm việc bừa bộn: Sao mình chậm thế?
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  // Bàn làm việc với đống giấy tờ bừa bộn
  const deskPop = popS(t0 + 0.2);
  withT(430, 880, 0, deskPop, () => {
    // Bàn gỗ
    pp(pR(-300, 60, 600, 80, 12), PR.woodD, { key: 'desk', sb: 14, sy: 7, tex: 0.5 });
    // Chồng tài liệu ngổn ngang
    pp(pR(-240, -40, 180, 100, 6), PR.paperW, { key: 'doc1', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(-220, -70, 170, 90, 6), PR.cream, { key: 'doc2', sb: 6, sy: 3, tex: 0.4 });
    pp(pR(-80, -20, 190, 80, 6), '#e2e8e8', { key: 'doc3', sb: 8, sy: 4, tex: 0.4 });
    // Tách cà phê
    pp(pE(180, 20, 32, 32), PR.mustard, { key: 'cup', sb: 6, sy: 3 });
    txt('☕', 180, 28, 30, '#fff', { align: 'center', base: 'middle' });

    // Dòng tự hỏi
    txt('"SAO MÌNH CHẬM THẾ?"', 0, -160, 38, PR.mustard, { align: 'center', weight: 800 });
  });

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(140, 420, 32, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -35, key: 'b2' });
  prSign('TỰ HỎI: SAO MÌNH CHẬM THẾ?', { kicker: KICK });
  prChips();
};

SCENES.iceberg = () => {   // S3: Tấm ảnh lật mặt sau: hậu trường thực tế
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  const cardPop = popS(t0 + 0.3);
  withT(430, 860, 0, cardPop, () => {
    // Hộp chia đôi: SÂN KHẤU vs HẬU TRƯỜNG
    pp(pR(-300, -220, 600, 440, 20), '#3d6868', { key: 'ice_box', sb: 16, sy: 8, tex: 0.5 });
    txt('SỰ THẬT ĐẰNG SAU BÀI ĐĂNG', 0, -150, 30, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-250, -100, 500, 4, 2), PR.creamL, { shadow: false });

    // Bên trái: Sân khấu (1%)
    txt('Mặt trước:', -130, -40, 26, PR.mustard, { align: 'center', weight: 800 });
    txt('Khoảnh khắc đẹp', -130, 10, 22, PR.creamL, { align: 'center', weight: 700 });
    txt('(Được chọn lọc)', -130, 50, 20, '#a0c0c0', { align: 'center', weight: 600 });

    // Bên phải: Hậu trường (99%)
    txt('Mặt sau:', 130, -40, 26, PR.mustard, { align: 'center', weight: 800 });
    txt('Khó khăn, vất vả', 130, 10, 22, PR.creamL, { align: 'center', weight: 700 });
    txt('Không ai chụp lại', 130, 50, 20, '#a0c0c0', { align: 'center', weight: 600 });

    txt('Đừng so hậu trường của mình với sân khấu người khác!', 0, 140, 22, PR.mustard, { align: 'center', weight: 800 });
  });

  prClock(960, 520, 70, 4, 0, 'clk3');
  prStar(160, 1260, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'neutral', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('HẬU TRƯỜNG VS SÂN KHẤU', { kicker: KICK });
  prChips();
};

SCENES.compare = () => {   // S4: So sánh cả hành trình với 1 lát cắt
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const c1Pop = popS(t0 + 0.2);
  const c2Pop = popS(t0 + 0.6);

  withT(270, 860, -0.02, c1Pop, () => {
    pp(pR(-180, -200, 360, 400, 18), '#4e8268', { key: 'c_journey', sb: 16, sy: 8, tex: 0.5 });
    txt('HÀNH TRÌNH', 0, -130, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('CỦA BẠN', 0, -90, 26, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-140, -50, 280, 4, 2), PR.creamL, { shadow: false });
    txt('Cả ngày vui', 0, 10, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('& ngày mệt mỏi', 0, 50, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('(Toàn bộ 365 ngày)', 0, 110, 20, '#d0e8e0', { align: 'center', weight: 600 });
  });

  withT(690, 860, 0.02, c2Pop, () => {
    pp(pR(-180, -200, 360, 400, 18), '#9e5050', { key: 'c_slice', sb: 16, sy: 8, tex: 0.5 });
    txt('KHOẢNH KHẮC', 0, -130, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('NGƯỜI KHÁC', 0, -90, 26, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-140, -50, 280, 4, 2), PR.creamL, { shadow: false });
    txt('Chỉ 1 bức ảnh', 0, 10, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('Đẹp nhất năm', 0, 50, 24, PR.creamL, { align: 'center', weight: 700 });
    txt('(Chỉ vài giây)', 0, 110, 20, '#f8d0d0', { align: 'center', weight: 600 });
  });

  prCross(480, 860, t0 + 0.9);
  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 15, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('SO SÁNH KHẬP KHIỄNG', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Đổi thước đo: Tiến bộ so với chính mình
  const t0 = E0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const rPop = popS(t0 + 0.3);
  withT(430, 860, 0, rPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3b6860', { key: 'ref_box', sb: 16, sy: 8, tex: 0.5 });
    txt('THƯỚC ĐO DUY NHẤT CẦN', 0, -110, 32, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('BẠN HÔM NAY', 0, 20, 36, PR.creamL, { align: 'center', weight: 800 });
    txt('↑ Tiến bộ hơn', 0, 75, 30, PR.mustard, { align: 'center', weight: 800 });
    txt('BẠN CỦA QUÁ KHỨ', 0, 130, 28, '#b0d8d0', { align: 'center', weight: 700 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('TIẾN BỘ SO VỚI CHÍNH MÌNH', { kicker: KICK });
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

  prCommentBox(CX, 820, 'ĐIỀU BẠN TIẾN BỘ', t0 + 0.5, { hint: 'Hôm nay bạn tiến bộ điều gì?' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('HÔM NAY BẠN ĐÃ TIẾN BỘ GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VL('slow').t0 + 0.3 });
  cues.push({ k: 'thud', t: VL('iceberg').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('compare').t0 + 0.2 });
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
