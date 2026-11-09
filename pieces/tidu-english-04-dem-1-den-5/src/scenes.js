// =====================================================================
//  TIDU ENGLISH 04 — "Đếm 1 đến 5 bằng tiếng Anh"
//  Mascot: polly() parrot with distinct hats and moods per scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · SỐ ĐẾM';
const SCENES = {};
const WALL_BASE = '#c9b28a';

// Props
function propStarGold(x, y, r = 36, s = 1) {
  withT(x, y, 0, s, () => {
    prStar(0, 0, r, PR.yellow);
    // highlight
    pp(pE(-r * 0.3, -r * 0.3, r * 0.22, r * 0.22), PR.paperW, { shadow: false, tex: false });
  });
}

function propBox(x, y, s = 1, shake = false) {
  const rot = shake ? Math.sin(TT * 25) * 0.06 : 0;
  withT(x, y, rot, s, () => {
    // box body
    pp(pR(-120, -70, 240, 150, 16), PR.red, { key: 'bx_bd', sb: 18, sy: 9, tex: 0.55 });
    // yellow ribbon vertical & horizontal
    pp(pR(-20, -70, 40, 150, 0), PR.yellow, { key: 'bx_rv', shadow: false, tex: 0.3 });
    pp(pR(-120, -10, 240, 30, 0), PR.yellow, { key: 'bx_rh', shadow: false, tex: 0.3 });
    // box lid
    pp(pR(-130, -95, 260, 35, 10), PR.redD, { key: 'bx_lid', sb: 12, sy: 6, tex: 0.5 });
    // bow
    pp(pE(-28, -108, 30, 20, -0.3), PR.yellow, { key: 'bx_b1', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(28, -108, 30, 20, 0.3), PR.yellow, { key: 'bx_b2', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(0, -98, 16, 16), PR.mustard, { key: 'bx_bc', shadow: false, tex: 0.4 });
  });
}

function engRoomLife(wallCol) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(1470, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prBunting(310);
  prClock(190, 420, 60, 11, 20);
  const cols = [PR.red, PR.blue, PR.green, PR.orange, PR.navy];
  ['1', '2', '3', '4'].forEach((ch, i) => {
    const x = [120, 940, 140, 930][i], y = [570, 480, 1340, 1360][i];
    withT(x, y, (i % 2 ? 0.1 : -0.1), 1, () => txt(ch, 0, 0, 48, cols[i], { align: 'center', base: 'middle', weight: 800 }));
  });
}

// =====================================================================
//  SCENE 1 — hook: "Có bao nhiêu ngôi sao trong chiếc hộp này? Cùng đếm bằng tiếng Anh nhé!"
// =====================================================================
SCENES.hook = () => {
  engRoomLife(WALL_BASE);
  prSign('HỘP SAO BÍ MẬT', { kicker: KICK });

  // Gift box shaking gently at cx = 540, cy = 820
  propBox(540, 820, 1.35, true);

  // Question header board at cx = 540, cy = 520
  withT(540, 520, 0, 1, () => {
    pp(pR(-280, -55, 560, 110, 18), PR.creamL, { key: 'hk_bd', sb: 14, sy: 7, tex: 0.55 });
    txt('CÓ BAO NHIÊU NGÔI SAO?', 0, -10, 32, PR.navy, { align: 'center', weight: 800 });
    txt('CÙNG ĐẾM BẰNG TIẾNG ANH!', 0, 32, 24, PR.redD, { align: 'center', weight: 700 });
  });

  // Polly with mortar hat
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — one: "One! Một."
// =====================================================================
SCENES.one = () => {
  engRoomLife('#bfa77e');
  prSign('SỐ 1 · ONE', { kicker: KICK });

  // Hero Card at cx = 540, cy = 800
  withT(540, 800, -0.015, 1, () => {
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'on_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'on_in', shadow: false, tex: 0.45 });

    // 1 Gold Star
    propStarGold(0, -80, 58, 1.2);

    pp(pR(-240, 20, 480, 6, 3), PR.tan, { key: 'on_div', shadow: false, tex: 0.3 });

    txt('ONE', 0, 100, 96, PR.red, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-120, 155, 240, 46, 12), PR.redD, { key: 'on_tag', shadow: false, tex: 0.4 });
    txt('SỐ 1 · MỘT', 0, 187, 26, PR.creamL, { align: 'center', weight: 800 });
  });

  // Small box at bottom left
  propBox(230, 1420, 0.7, false);

  // Polly with party hat
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hold: propCard('1', -0.08, PR.red), hand: { x: -240, y: -380 }, key: 'p_on' });
  prChips();
};

// =====================================================================
//  SCENE 3 — two_three: "Two! Hai. Three! Ba."
// =====================================================================
SCENES.two_three = () => {
  engRoomLife('#86a8ba');
  prSign('SỐ 2 & 3', { kicker: KICK });

  // Two cards side by side (350 and 730, midpoint 540)
  // Card 2 at 350
  withT(350, 780, -0.015, 1, () => {
    pp(pR(-160, -210, 320, 420, 20), PR.creamL, { key: 'cd_two', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-144, -194, 288, 388, 16), PR.paperW, { key: 'in_two', shadow: false, tex: 0.45 });

    // 2 stars
    propStarGold(-50, -80, 40, 1);
    propStarGold(50, -80, 40, 1);

    pp(pR(-120, 20, 240, 5, 2), PR.tan, { key: 'd_two', shadow: false, tex: 0.3 });
    txt('TWO', 0, 90, 68, PR.blue, { align: 'center', base: 'middle', weight: 800 });
    txt('SỐ 2 · HAI', 0, 145, 24, PR.navy, { align: 'center', weight: 800 });
  });

  // Card 3 at 730
  withT(730, 780, 0.015, 1, () => {
    pp(pR(-160, -210, 320, 420, 20), PR.creamL, { key: 'cd_thr', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-144, -194, 288, 388, 16), PR.paperW, { key: 'in_thr', shadow: false, tex: 0.45 });

    // 3 stars
    propStarGold(0, -110, 36, 1);
    propStarGold(-60, -50, 36, 1);
    propStarGold(60, -50, 36, 1);

    pp(pR(-120, 20, 240, 5, 2), PR.tan, { key: 'd_thr', shadow: false, tex: 0.3 });
    txt('THREE', 0, 90, 64, PR.green, { align: 'center', base: 'middle', weight: 800 });
    txt('SỐ 3 · BA', 0, 145, 24, PR.navy, { align: 'center', weight: 800 });
  });

  // Polly with crown hat
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', key: 'p_tw3' });
  prChips();
};

// =====================================================================
//  SCENE 4 — four_five: "Four! Bốn. Five! Năm."
// =====================================================================
SCENES.four_five = () => {
  engRoomLife(WALL_BASE);
  prSign('SỐ 4 & 5', { kicker: KICK });

  // Two cards: Card 4 at 350, Card 5 at 730 (midpoint 540)
  withT(350, 780, -0.015, 1, () => {
    pp(pR(-160, -210, 320, 420, 20), PR.creamL, { key: 'cd_four', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-144, -194, 288, 388, 16), PR.paperW, { key: 'in_four', shadow: false, tex: 0.45 });

    // 4 stars (2x2 grid)
    propStarGold(-50, -100, 34, 1);
    propStarGold(50, -100, 34, 1);
    propStarGold(-50, -40, 34, 1);
    propStarGold(50, -40, 34, 1);

    pp(pR(-120, 20, 240, 5, 2), PR.tan, { key: 'd_four', shadow: false, tex: 0.3 });
    txt('FOUR', 0, 90, 66, PR.orange, { align: 'center', base: 'middle', weight: 800 });
    txt('SỐ 4 · BỐN', 0, 145, 24, PR.navy, { align: 'center', weight: 800 });
  });

  withT(730, 780, 0.015, 1, () => {
    pp(pR(-160, -210, 320, 420, 20), PR.creamL, { key: 'cd_five', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-144, -194, 288, 388, 16), PR.paperW, { key: 'in_five', shadow: false, tex: 0.45 });

    // 5 stars
    [[-60, -110], [60, -110], [0, -75], [-60, -40], [60, -40]].forEach(([sx, sy], i) => {
      propStarGold(sx, sy, 30, 1);
    });

    pp(pR(-120, 20, 240, 5, 2), PR.tan, { key: 'd_five', shadow: false, tex: 0.3 });
    txt('FIVE', 0, 90, 68, PR.purple, { align: 'center', base: 'middle', weight: 800 });
    txt('SỐ 5 · NĂM', 0, 145, 24, PR.navy, { align: 'center', weight: 800 });
  });

  // Polly with cap hat
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'happy', key: 'p_45' });
  prChips();
};

// =====================================================================
//  SCENE 5 — quiz: "Bây giờ mình giấu đi một ngôi sao. Còn bao nhiêu ngôi sao nào?"
// =====================================================================
SCENES.quiz = () => {
  engRoomLife('#d4c3a3');
  prSign('THỬ THÁCH ĐẾM SAO', { kicker: KICK });

  // 4 remaining stars in hero card at cx = 540, cy = 560
  withT(540, 560, 0, 1, () => {
    pp(pR(-280, -120, 560, 240, 20), PR.creamL, { key: 'qz_cd', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-264, -104, 528, 208, 16), PR.paperW, { key: 'qz_in', shadow: false, tex: 0.45 });

    // 4 stars in a clean row
    [-180, -60, 60, 180].forEach((sx, i) => {
      propStarGold(sx, -15, 38, 1);
      txt(String(i + 1), sx, 52, 26, PR.navy, { align: 'center', weight: 800 });
    });
  });

  // Question header board at cx = 540, cy = 740
  withT(540, 740, 0, 1, () => {
    pp(pR(-280, -45, 560, 90, 14), PR.navy, { key: 'qz_qbd', sb: 12, sy: 6, tex: 0.5 });
    txt('CÒN BAO NHIÊU NGÔI SAO NÀO?', 0, 10, 30, PR.creamL, { align: 'center', weight: 800 });
  });

  // Two options: A. Three vs B. Four (350 and 730)
  withT(350, 930, -0.015, 1, () => {
    pp(pR(-160, -90, 320, 180, 18), PR.creamL, { key: 'opt_a', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -74, 288, 148, 14), PR.paperW, { key: 'opt_ain', shadow: false, tex: 0.4 });
    pp(pR(-120, -60, 55, 36, 8), PR.blue, { key: 'opt_atag', shadow: false, tex: 0.4 });
    txt('A', -92, -34, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('Three', 0, 25, 44, PR.blue, { align: 'center', base: 'middle', weight: 800 });
  });

  withT(730, 930, 0.015, 1, () => {
    pp(pR(-160, -90, 320, 180, 18), PR.creamL, { key: 'opt_b', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -74, 288, 148, 14), PR.paperW, { key: 'opt_bin', shadow: false, tex: 0.4 });
    pp(pR(-120, -60, 55, 36, 8), PR.green, { key: 'opt_btag', shadow: false, tex: 0.4 });
    txt('B', -92, -34, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('Four', 0, 25, 46, PR.orange, { align: 'center', base: 'middle', weight: 800 });
  });

  // Countdown timer at 540, 1160
  const timerStart = VL('quiz').t1 + 0.5, timerEnd = VL('answer').t0 - 0.5;
  const tmK = popS(timerStart - 0.2);
  if (tmK > 0.01) {
    const leftFrac = clamp(1 - (TT - timerStart) / (timerEnd - timerStart));
    const secsLeft = Math.ceil(leftFrac * 3);
    const r = 66;
    withT(540, 1160, 0, tmK, () => {
      pp(pR(-r * 0.2, -r - 24, r * 0.4, 36, 6), PR.char, { key: 'tm_kn', sb: 6, sy: 3, tex: 0.4 });
      pp(pE(0, 0, r, r), PR.red, { key: keyTm('o'), sb: 14, sy: 7, tex: 0.55, rim: 'rgba(255,220,210,0.35)' });
      pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key: keyTm('f'), shadow: false, tex: 0.45 });
      if (leftFrac > 0) {
        pp(() => {
          ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.76, -Math.PI / 2, -Math.PI / 2 + TAU * leftFrac); ctx.closePath();
        }, PR.mustard, { key: keyTm('w'), shadow: false, tex: 0.45 });
      }
      pp(pE(0, 0, r * 0.44, r * 0.44), PR.paperW, { key: keyTm('c'), sb: 6, sy: 3, tex: 0.4 });
      txt(String(Math.max(1, secsLeft)), 0, r * 0.18, r * 0.52, PR.navy, { align: 'center', weight: 800 });
    });
  }

  // Polly with guard hat
  polly(POLLY_X, POLLY_Y, { hat: 'guard', mood: 'neutral', hand: { x: -250, y: -340 }, key: 'p_qz' });
  prChips();
};
function keyTm(s) { return 'tm_' + s; }

// =====================================================================
//  SCENE 6 — answer: "Four! Bốn ngôi sao! Tuyệt vời!"
// =====================================================================
SCENES.answer = () => {
  engRoomLife(WALL_BASE);
  prSign('ĐÁP ÁN CHÍNH XÁC', { kicker: KICK });

  // Winning card at cx = 540, cy = 820
  withT(540, 820, 0, 1, () => {
    pp(pR(-320, -220, 640, 440, 24), PR.creamL, { key: 'ans_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -200, 600, 400, 18), '#eaf5ee', { key: 'ans_in', shadow: false, tex: 0.45 });

    pp(pR(-260, -170, 130, 48, 10), PR.green, { key: 'ans_tag', shadow: false, tex: 0.4 });
    txt('ĐÁP ÁN B', -195, -138, 22, PR.creamL, { align: 'center', weight: 800 });

    txt('FOUR!', 0, -50, 92, PR.orange, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-240, 10, 480, 6, 3), '#8fc27e', { key: 'ans_div', shadow: false, tex: 0.3 });
    txt('Chính xác: Còn 4 ngôi sao!', 0, 70, 30, PR.navy, { align: 'center', weight: 800 });
  });

  prCheck(760, 680, E0 + 0.1);
  prStamp('TUYỆT VỜI', 540, 960, PR.green, E0 + 0.25, { rot: -0.05, size: 52, from: 1.25 });

  // Polly celebrating with wizard hat
  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 7 — countall: "Hãy đếm lại thật to cùng mình: One, two, three, four, five!"
// =====================================================================
SCENES.countall = () => {
  engRoomLife('#bfa77e');
  prSign('ĐẾM TỪ 1 ĐẾN 5', { kicker: KICK });

  // 5 stars cards aligned across screen at y = 740
  // Centres for 5 items: gap = 160 -> 220, 380, 540, 700, 860
  const nums = [
    ['1', 'One', VW('countall', 'one').t0, PR.red],
    ['2', 'Two', VW('countall', 'two').t0, PR.blue],
    ['3', 'Three', VW('countall', 'three').t0, PR.green],
    ['4', 'Four', VW('countall', 'four').t0, PR.orange],
    ['5', 'Five', VW('countall', 'five').t0, PR.purple]
  ];

  nums.forEach(([num, word, t0, col], i) => {
    const cx = 220 + i * 160;
    const isLit = TT >= t0;
    withT(cx, 740, 0, 1, () => {
      pp(pR(-70, -170, 140, 340, 16), isLit ? PR.creamL : PR.cream, { key: 'ca_c' + i, sb: isLit ? 18 : 10, sy: 7, tex: 0.5 });
      pp(pR(-60, -156, 120, 312, 12), isLit ? PR.paperW : PR.creamL, { key: 'ca_in' + i, shadow: false, tex: 0.4 });
      propStarGold(0, -90, 26, isLit ? 1.15 : 0.95);
      txt(num, 0, -20, 48, col, { align: 'center', weight: 800 });
      pp(pR(-45, 25, 90, 4, 2), PR.tan, { key: 'ca_d' + i, shadow: false, tex: 0.3 });
      txt(word, 0, 80, 24, PR.navy, { align: 'center', weight: 800 });
      if (isLit) prCheck(40, -135, t0);
    });
  });

  // Polly with party hat
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_ca' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Hãy thử đếm năm đồ vật trên bàn bằng tiếng Anh."
// =====================================================================
SCENES.cta = () => {
  engRoomLife(WALL_BASE);
  prSign('THỬ THÁCH HÔM NAY', { kicker: KICK });

  withT(540, 560, 0, 1, () => {
    pp(pR(-280, -50, 560, 100, 16), PR.creamL, { key: 'cta_cd', sb: 12, sy: 6, tex: 0.5 });
    txt('ĐẾM 5 ĐỒ VẬT TRÊN BÀN BẰNG TIẾNG ANH', 0, 8, 23, PR.navy, { align: 'center', weight: 800 });
  });

  prCommentBox(540, 780, 'ONE TWO THREE FOUR FIVE', VW('cta', 'năm').t0, { hint: 'Bé đếm được bao nhiêu đồ vật?' });

  const R = RNG('cta_stars4');
  for (let i = 0; i < 14; i++) {
    const sx = R.r(120, 960), sy = R.r(360, 1300);
    if (sx > 240 && sx < 840 && sy > 480 && sy < 950) continue;
    prStar(sx, sy, 18, i % 2 ? PR.yellow : PR.mustard);
  }

  // Polly with crown hat
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hold: propCard('5', -0.06, PR.purple), hand: { x: -240, y: -380 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  cues.push({ t: VW('one', 'one').t0, k: 'pop' });
  cues.push({ t: VW('two_three', 'two').t0, k: 'pop' });
  cues.push({ t: VW('two_three', 'three').t0, k: 'pop' });
  cues.push({ t: VW('four_five', 'four').t0, k: 'pop' });
  cues.push({ t: VW('four_five', 'five').t0, k: 'pop' });

  const timerStart = VL('quiz').t1 + 0.5;
  cues.push({ t: timerStart + 0.5, k: 'tick' });
  cues.push({ t: timerStart + 1.5, k: 'tick' });
  cues.push({ t: timerStart + 2.5, k: 'tick' });

  cues.push({ t: VL('answer').t0 + 0.1, k: 'chime' });
  cues.push({ t: VL('answer').t0 + 0.25, k: 'thud' });
  cues.push({ t: VW('cta', 'năm').t0, k: 'type', n: 6, d: 0.8 });
  return cues;
}

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const TIMELINE = {
  width: W, height: H, fps: FPS, duration: DURATION, frames: NFRAMES, loop: LOOP_T, safe: SAFE, format: 'voice-cut',
  shots: SHOT_LIST.map(([t0, sc], i) => ({ id: i + 1, key: sc, era: i, t0, t1: ERA_LIST[i][1], title: sc })),
  cuts: SHOT_LIST.slice(1).map(([t0]) => t0), morphs: [], cues: {},
  acts: [{ name: 'reel', role: 'journey', t0: 0, t1: DURATION }],
  board: SHOT_LIST.map(([t0, sc], i) => ({ t: (t0 + ERA_LIST[i][1]) / 2 + 0.3, title: sc, sound: '', next: 'cut' })),
  narration: VOICE.lines.map((l) => ({ t0: l.t0, t1: l.t1, text: l.text })),
};
window.TIMELINE = TIMELINE;
