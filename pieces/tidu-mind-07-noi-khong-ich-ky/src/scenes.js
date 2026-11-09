// =====================================================================
//  TIDU MIND 07 — "Nói 'không' có phải là ích kỷ?"
//  Ranh giới cá nhân & Thói quen làm hài lòng (People Pleasing & Boundaries).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · RANH GIỚI';
const TEAL = '#2e4f4f';

const SCENES = {};

// Hộp carton / trách nhiệm
function tmBox(cx, cy, label, col = '#b88a5e', s = 1) {
  withT(cx, cy, 0, s, () => {
    pp(pR(-140, -45, 280, 90, 10), col, { key: 'box_' + label, sb: 10, sy: 5, tex: 0.5 });
    // Băng dính ở giữa
    pp(pR(-20, -45, 40, 90, 0), '#d8c09a', { shadow: false });
    txt(label, 0, 7, 24, PR.char, { align: 'center', base: 'middle', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Ôm chồng 3 hộp giấy nặng trĩu: Quá tải
  const t0 = E0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  // Chồng 3 hộp xếp chồng lên nhau
  tmBox(420, 1150, 'VIỆC GIA ĐÌNH', '#a07850', popS(t0 + 0.2));
  tmBox(420, 1030, 'NHỜ VẢ ĐỒNG NGHIỆP', '#b88a5e', popS(t0 + 0.5));
  tmBox(420, 910, 'DỰ ÁN NGOÀI GIỜ', '#c89a6e', popS(t0 + 0.8));

  // Biển cảnh báo quá tải
  const warnPop = popS(t0 + 1.1);
  withT(420, 680, 0, warnPop, () => {
    pp(pR(-180, -50, 360, 100, 16), '#9e4c4c', { key: 'warn_box', sb: 14, sy: 7, tex: 0.4 });
    txt('⚠️ ĐÃ QUÁ TẢI!', 0, 8, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  prClock(960, 520, 70, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(890, 420, 28, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b1' });
  prSign('ĐỒNG Ý DÙ ĐÃ QUÁ TẢI?', { kicker: KICK });
  prChips();
};

SCENES.fear = () => {   // S2: Sợ làm người khác thất vọng: Thời gian ưu tiên bị thu hẹp
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const cardPop = popS(t0 + 0.3);
  withT(430, 860, 0, cardPop, () => {
    pp(pR(-290, -220, 580, 440, 20), '#3d6868', { key: 'fear_box', sb: 16, sy: 8, tex: 0.5 });
    txt('CÁI GIÁ CỦA SỰ NẢ NỂ', 0, -150, 32, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-240, -100, 480, 4, 2), PR.creamL, { shadow: false });

    txt('Nói "CÓ" với việc người khác', 0, -40, 28, PR.mustard, { align: 'center', weight: 800 });
    txt('ĐỒNG NGHĨA VỚI:', 0, 15, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Nói "KHÔNG" với bản thân!', 0, 75, 34, '#f8a0a0', { align: 'center', weight: 800 });
    txt('(Sức khỏe, giấc ngủ & ưu tiên riêng)', 0, 135, 22, '#a0d0c0', { align: 'center', weight: 600 });
  });

  prClock(960, 520, 70, 3, 45, 'clk2');
  prStar(160, 1260, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'flat', look: -35, key: 'b2' });
  prSign('NÓI CÓ VỚI NGƯỜI KHÁC', { kicker: KICK });
  prChips();
};

SCENES.boundary = () => {   // S3: Đặt ranh giới: Nói rõ điều có thể & không thể
  const t0 = E0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  const bPop = popS(t0 + 0.3);
  withT(430, 860, 0, bPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3e7a62', { key: 'bound_box', sb: 16, sy: 8, tex: 0.5 });
    txt('ĐẶT RANH GIỚI', 0, -110, 34, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Không phải là: Ích kỷ, xa lánh', 0, 10, 24, '#f8b0b0', { align: 'center', weight: 700 });
    txt('MÀ CHÍNH LÀ:', 0, 55, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('"Nói rõ điều mình đảm nhận được"', 0, 110, 30, PR.mustard, { align: 'center', weight: 800 });
  });

  prCheck(730, 860, t0 + 0.9);
  prStar(160, 1260, 32, PR.pink);
  prClock(960, 520, 70, 4, 0, 'clk3');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('ĐẶT RANH GIỚI LÀNG MẠNH', { kicker: KICK });
  prChips();
};

SCENES.sayno = () => {   // S4: Câu từ chối bình tĩnh: Mình không thể giúp việc này hôm nay
  const t0 = E0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  const sayPop = popS(t0 + 0.3);
  withT(430, 860, 0, sayPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3b6860', { key: 'say_box', sb: 16, sy: 8, tex: 0.5 });
    txt('CÂU TỪ CHỐI BÌNH TĨNH', 0, -110, 32, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('"Cảm ơn cậu đã tin tưởng,', 0, 20, 28, PR.creamL, { align: 'center', weight: 700 });
    txt('nhưng hôm nay mình chưa thể', 0, 70, 28, PR.creamL, { align: 'center', weight: 700 });
    txt('hỗ trợ việc này được nhé!"', 0, 120, 28, PR.mustard, { align: 'center', weight: 800 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 32, PR.mustard);
  prClock(960, 520, 70, 4, 15, 'clk4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('TỪ CHỐI RÕ RÀNG, BÌNH TĨNH', { kicker: KICK });
  prChips();
};

SCENES.healthy = () => {   // S5: Mối quan hệ lành mạnh: Cần sự quan tâm lẫn tôn trọng giới hạn
  const t0 = E0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const refPop = popS(t0 + 0.3);
  withT(430, 860, 0, refPop, () => {
    pp(pR(-290, -180, 580, 360, 20), '#3d6868', { key: 'rel_box', sb: 16, sy: 8, tex: 0.5 });
    txt('QUAN HỆ BỀN VỮNG', 0, -110, 34, PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-230, -50, 460, 4, 2), PR.creamL, { shadow: false });
    txt('Cần cả hai điều:', 0, 15, 26, PR.creamL, { align: 'center', weight: 700 });
    txt('❤️ Sự quan tâm chân thành', 0, 65, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('🛡️ Khả năng tôn trọng ranh giới', 0, 115, 28, PR.mustard, { align: 'center', weight: 800 });
  });

  prCheck(730, 860, t0 + 0.8);
  prStar(160, 1260, 36, PR.mustard);
  prClock(960, 520, 70, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('QUAN TÂM VÀ TÔN TRỌNG RANH GIỚI', { kicker: KICK });
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

  prCommentBox(CX, 820, 'TÌNH HUỐNG KHÓ', t0 + 0.5, { hint: 'Bạn thấy khó nói không nhất với ai?' });

  prNote(150, 1240, { rot: -0.04, key: 'note6' });
  pp(pR(830, 1270, 110, 150, 6), '#3d5050', { key: 'bk6', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN THẤY KHÓ NÓI KHÔNG NHẤT KHI NÀO?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'tick', t: VL('fear').t0 + 0.3 });
  cues.push({ k: 'thud', t: VL('boundary').t0 + 0.3 });
  cues.push({ k: 'pop', t: VL('sayno').t0 + 0.2 });
  cues.push({ k: 'chime', t: VL('healthy').t0 + 0.3 });
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
