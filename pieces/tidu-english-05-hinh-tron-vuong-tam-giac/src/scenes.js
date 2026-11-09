// =====================================================================
//  TIDU ENGLISH 05 — "Hình tròn, vuông và tam giác"
//  Mascot: polly() parrot with distinct hats and moods per scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · HÌNH KHỐI';
const SCENES = {};
const WALL_BASE = '#c9b28a';

// Basic Shape helpers
function propCircle(x, y, r = 70, s = 1, spin = 0) {
  withT(x, y, spin, s, () => {
    pp(pE(0, 0, r, r), PR.blue, { key: 'shp_crc', sb: 16, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.5)' });
    pp(pE(-r * 0.35, -r * 0.35, r * 0.25, r * 0.25), PR.paperW, { shadow: false, tex: false });
  });
}

function propSquare(x, y, a = 140, s = 1) {
  withT(x, y, 0, s, () => {
    pp(pR(-a / 2, -a / 2, a, a, 14), PR.red, { key: 'shp_sqr', sb: 16, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.5)' });
    pp(pR(-a / 2 + 12, -a / 2 + 12, a * 0.25, a * 0.25, 4), PR.paperW, { shadow: false, tex: false });
  });
}

function propTriangle(x, y, s = 1, glow = false) {
  withT(x, y, 0, s, () => {
    if (glow) {
      ctx.save(); ctx.strokeStyle = PR.yellow; ctx.lineWidth = 14; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(-85, 60); ctx.lineTo(85, 60); ctx.lineTo(0, -85); ctx.closePath();
      ctx.stroke(); ctx.restore();
    }
    pp(pG([[-80, 55], [80, 55], [0, -80]]), PR.yellow, { key: 'shp_tri', sb: 16, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.5)' });
    pp(pE(0, -25, 16, 16), PR.paperW, { shadow: false, tex: false });
  });
}

function engRoomLife(wallCol) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(1470, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prBunting(310);
  prClock(190, 420, 60, 2, 45);
  const cols = [PR.red, PR.blue, PR.green, PR.orange, PR.navy];
  ['A', 'B', 'C', 'D'].forEach((ch, i) => {
    const x = [120, 940, 140, 930][i], y = [570, 480, 1340, 1360][i];
    withT(x, y, (i % 2 ? 0.1 : -0.1), 1, () => txt(ch, 0, 0, 44, cols[i], { align: 'center', base: 'middle', weight: 800 }));
  });
}

// =====================================================================
//  SCENE 1 — hook: "Bạn có biết tên của ba hình này bằng tiếng Anh không?"
// =====================================================================
SCENES.hook = () => {
  engRoomLife(WALL_BASE);
  prSign('3 HÌNH QUEN THUỘC', { kicker: KICK });

  // 3 shapes resting on table at 270, 540, 810
  // Circle at 270
  withT(270, 760, -0.02, 1, () => {
    pp(pR(-115, -170, 230, 340, 18), PR.creamL, { key: 'hk_c1', sb: 16, sy: 8, tex: 0.55 });
    pp(pR(-100, -155, 200, 310, 14), PR.paperW, { key: 'hk_i1', shadow: false, tex: 0.4 });
    propCircle(0, -40, 65, 1);
    txt('?', 0, 70, 64, PR.blue, { align: 'center', weight: 800 });
  });

  // Square at 540
  withT(540, 760, 0, 1, () => {
    pp(pR(-115, -170, 230, 340, 18), PR.creamL, { key: 'hk_c2', sb: 16, sy: 8, tex: 0.55 });
    pp(pR(-100, -155, 200, 310, 14), PR.paperW, { key: 'hk_i2', shadow: false, tex: 0.4 });
    propSquare(0, -40, 120, 1);
    txt('?', 0, 70, 64, PR.red, { align: 'center', weight: 800 });
  });

  // Triangle at 810
  withT(810, 760, 0.02, 1, () => {
    pp(pR(-115, -170, 230, 340, 18), PR.creamL, { key: 'hk_c3', sb: 16, sy: 8, tex: 0.55 });
    pp(pR(-100, -155, 200, 310, 14), PR.paperW, { key: 'hk_i3', shadow: false, tex: 0.4 });
    propTriangle(0, -30, 0.95);
    txt('?', 0, 70, 64, PR.mustard, { align: 'center', weight: 800 });
  });

  // Polly with mortar hat
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — circle: "Hình tròn là Circle."
// =====================================================================
SCENES.circle = () => {
  engRoomLife('#86a8ba');
  prSign('HÌNH TRÒN · CIRCLE', { kicker: KICK });

  // Spinning circle hero card at cx = 540, cy = 800
  const spin = TT * 1.5;
  withT(540, 800, -0.015, 1, () => {
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'cr_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'cr_in', shadow: false, tex: 0.45 });

    propCircle(0, -70, 85, 1.15, spin);

    pp(pR(-240, 30, 480, 6, 3), PR.tan, { key: 'cr_div', shadow: false, tex: 0.3 });

    txt('CIRCLE', 0, 110, 84, PR.blue, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-130, 160, 260, 46, 12), PR.navy, { key: 'cr_tag', shadow: false, tex: 0.4 });
    txt('HÌNH TRÒN', 0, 192, 26, PR.creamL, { align: 'center', weight: 800 });
  });

  // Polly with cap hat
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'happy', hold: propCard('C', -0.08, PR.blue), hand: { x: -240, y: -380 }, key: 'p_cr' });
  prChips();
};

// =====================================================================
//  SCENE 3 — square_triangle: "Hình vuông là Square. Hình tam giác là Triangle."
// =====================================================================
SCENES.square_triangle = () => {
  engRoomLife(WALL_BASE);
  prSign('SQUARE & TRIANGLE', { kicker: KICK });

  // Two cards side by side (350 and 730, midpoint 540)
  // Square at 350
  withT(350, 780, -0.015, 1, () => {
    pp(pR(-160, -210, 320, 420, 20), PR.creamL, { key: 'cd_sqr', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-144, -194, 288, 388, 16), PR.paperW, { key: 'in_sqr', shadow: false, tex: 0.45 });

    propSquare(0, -70, 130, 1);

    pp(pR(-120, 20, 240, 5, 2), PR.tan, { key: 'd_sqr', shadow: false, tex: 0.3 });
    txt('SQUARE', 0, 80, 54, PR.red, { align: 'center', base: 'middle', weight: 800 });
    txt('HÌNH VUÔNG', 0, 140, 24, PR.navy, { align: 'center', weight: 800 });
  });

  // Triangle at 730
  withT(730, 780, 0.015, 1, () => {
    pp(pR(-160, -210, 320, 420, 20), PR.creamL, { key: 'cd_tri', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-144, -194, 288, 388, 16), PR.paperW, { key: 'in_tri', shadow: false, tex: 0.45 });

    propTriangle(0, -65, 1);

    pp(pR(-120, 20, 240, 5, 2), PR.tan, { key: 'd_tri', shadow: false, tex: 0.3 });
    txt('TRIANGLE', 0, 80, 46, PR.mustard, { align: 'center', base: 'middle', weight: 800 });
    txt('HÌNH TAM GIÁC', 0, 140, 22, PR.navy, { align: 'center', weight: 800 });
  });

  // Polly with pirate hat
  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: 'happy', key: 'p_sqtr' });
  prChips();
};

// =====================================================================
//  SCENE 4 — repeat: "Cùng nói lại nhé: Circle, Square, Triangle!"
// =====================================================================
SCENES.repeat = () => {
  engRoomLife('#d4c3a3');
  prSign('CÙNG NÓI LẠI NHÉ', { kicker: KICK });

  const isC = TT >= VW('repeat', 'circle').t0;
  const isS = TT >= VW('repeat', 'square').t0;
  const isT = TT >= VW('repeat', 'triangle').t0;

  // 3 Columns: 270, 540, 810 (Card width 240)
  // Col 1: Circle
  withT(270, 760, -0.015, 1, () => {
    pp(pR(-120, -180, 240, 360, 18), isC ? PR.creamL : PR.cream, { key: 'rp_c1', sb: isC ? 20 : 12, sy: 8, tex: 0.5 });
    pp(pR(-106, -166, 212, 332, 14), isC ? PR.paperW : PR.creamL, { key: 'rp_in1', shadow: false, tex: 0.4 });
    propCircle(0, -60, 52, 1);
    txt('CIRCLE', 0, 40, 34, PR.blue, { align: 'center', weight: 800 });
    txt('Hình tròn', 0, 95, 24, PR.navy, { align: 'center', weight: 700 });
    if (isC) prCheck(75, -140, VW('repeat', 'circle').t0);
  });

  // Col 2: Square
  withT(540, 760, 0, 1, () => {
    pp(pR(-120, -180, 240, 360, 18), isS ? PR.creamL : PR.cream, { key: 'rp_c2', sb: isS ? 20 : 12, sy: 8, tex: 0.5 });
    pp(pR(-106, -166, 212, 332, 14), isS ? PR.paperW : PR.creamL, { key: 'rp_in2', shadow: false, tex: 0.4 });
    propSquare(0, -60, 90, 1);
    txt('SQUARE', 0, 40, 34, PR.red, { align: 'center', weight: 800 });
    txt('Hình vuông', 0, 95, 24, PR.navy, { align: 'center', weight: 700 });
    if (isS) prCheck(75, -140, VW('repeat', 'square').t0);
  });

  // Col 3: Triangle
  withT(810, 760, 0.015, 1, () => {
    pp(pR(-120, -180, 240, 360, 18), isT ? PR.creamL : PR.cream, { key: 'rp_c3', sb: isT ? 20 : 12, sy: 8, tex: 0.5 });
    pp(pR(-106, -166, 212, 332, 14), isT ? PR.paperW : PR.creamL, { key: 'rp_in3', shadow: false, tex: 0.4 });
    propTriangle(0, -55, 0.85);
    txt('TRIANGLE', 0, 40, 30, PR.mustard, { align: 'center', weight: 800 });
    txt('Hình tam giác', 0, 95, 22, PR.navy, { align: 'center', weight: 700 });
    if (isT) prCheck(75, -140, VW('repeat', 'triangle').t0);
  });

  // Polly with wizard hat
  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_rp' });
  prChips();
};

// =====================================================================
//  SCENE 5 — quiz: "Bây giờ ba hình sẽ đổi chỗ. Bạn tìm được hình tam giác không?"
// =====================================================================
SCENES.quiz = () => {
  engRoomLife('#bfa77e');
  prSign('TÌM HÌNH TAM GIÁC', { kicker: KICK });

  // Shuffle animation: positions swapped!
  // Col 1 (270) has Square, Col 2 (540) has Triangle, Col 3 (810) has Circle
  withT(270, 760, -0.015, 1, () => {
    pp(pR(-120, -160, 240, 320, 18), PR.creamL, { key: 'qz_c1', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-106, -146, 212, 292, 14), PR.paperW, { key: 'qz_i1', shadow: false, tex: 0.4 });
    propSquare(0, -35, 90, 1);
    pp(pR(-45, 50, 90, 38, 8), PR.blue, { key: 'qz_t1', shadow: false, tex: 0.3 });
    txt('A', 0, 76, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  withT(540, 760, 0, 1, () => {
    pp(pR(-120, -160, 240, 320, 18), PR.creamL, { key: 'qz_c2', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-106, -146, 212, 292, 14), PR.paperW, { key: 'qz_i2', shadow: false, tex: 0.4 });
    propTriangle(0, -30, 0.85);
    pp(pR(-45, 50, 90, 38, 8), PR.green, { key: 'qz_t2', shadow: false, tex: 0.3 });
    txt('B', 0, 76, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  withT(810, 760, 0.015, 1, () => {
    pp(pR(-120, -160, 240, 320, 18), PR.creamL, { key: 'qz_c3', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-106, -146, 212, 292, 14), PR.paperW, { key: 'qz_i3', shadow: false, tex: 0.4 });
    propCircle(0, -35, 50, 1);
    pp(pR(-45, 50, 90, 38, 8), PR.red, { key: 'qz_t3', shadow: false, tex: 0.3 });
    txt('C', 0, 76, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Header prompt
  withT(540, 520, 0, 1, () => {
    pp(pR(-280, -45, 560, 90, 14), PR.navy, { key: 'qz_qbd', sb: 12, sy: 6, tex: 0.5 });
    txt('HÌNH TAM GIÁC Ở ĐÂU?', 0, 10, 34, PR.creamL, { align: 'center', weight: 800 });
  });

  // Countdown timer at 540, 1150
  const timerStart = VL('quiz').t1 + 0.5, timerEnd = VL('answer').t0 - 0.5;
  const tmK = popS(timerStart - 0.2);
  if (tmK > 0.01) {
    const leftFrac = clamp(1 - (TT - timerStart) / (timerEnd - timerStart));
    const secsLeft = Math.ceil(leftFrac * 3);
    const r = 66;
    withT(540, 1150, 0, tmK, () => {
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
//  SCENE 6 — answer: "Đây rồi! Triangle!"
// =====================================================================
SCENES.answer = () => {
  engRoomLife(WALL_BASE);
  prSign('ĐÁP ÁN CHÍNH XÁC', { kicker: KICK });

  // Winning card at cx = 540, cy = 820
  withT(540, 820, 0, 1, () => {
    pp(pR(-320, -220, 640, 440, 24), PR.creamL, { key: 'ans_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -200, 600, 400, 18), '#eaf5ee', { key: 'ans_in', shadow: false, tex: 0.45 });

    propTriangle(0, -70, 1.15, true);

    pp(pR(-260, 20, 130, 46, 10), PR.green, { key: 'ans_tag', shadow: false, tex: 0.4 });
    txt('ĐÁP ÁN B', -195, 52, 22, PR.creamL, { align: 'center', weight: 800 });

    txt('TRIANGLE!', 35, 52, 60, PR.mustard, { align: 'center', base: 'middle', weight: 800 });
    txt('Hình tam giác ở giữa!', 0, 85, 26, PR.navy, { align: 'center', weight: 700 });
  });

  prCheck(760, 680, E0 + 0.1);
  prStamp('CHÍNH XÁC', 540, 960, PR.green, E0 + 0.25, { rot: -0.05, size: 52, from: 1.25 });

  // Polly celebrating with crown hat
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 7 — house: "Chúng ta còn có thể ghép hình vuông và tam giác thành một ngôi nhà nhỏ nữa đấy!"
// =====================================================================
SCENES.house = () => {
  engRoomLife('#86a8ba');
  prSign('GHÉP NGÔI NHÀ GIẤY', { kicker: KICK });

  // Assembling paper house at cx = 540, cy = 760
  withT(540, 760, 0, 1, () => {
    // Backdrop board
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'hs_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'hs_in', shadow: false, tex: 0.45 });

    // House Roof: Triangle at (0, -70)
    pp(pG([[-140, -10], [140, -10], [0, -160]]), PR.yellow, { key: 'hs_rf', sb: 14, sy: 7, tex: 0.55 });
    // Attic window: Circle at (0, -70)
    pp(pE(0, -70, 26, 26), PR.blue, { key: 'hs_wnd', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(-8, -78, 7, 7), PR.paperW, { shadow: false, tex: false });

    // House Body: Square at (0, 70)
    pp(pR(-90, -10, 180, 150, 8), PR.red, { key: 'hs_bd', sb: 14, sy: 7, tex: 0.55 });
    // Door
    pp(pR(-24, 60, 48, 80, 6), PR.wood, { key: 'hs_dr', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(12, 100, 4, 4), PR.yellow, { shadow: false, tex: false });

    // House banner
    pp(pR(-200, 155, 400, 46, 12), PR.navy, { key: 'hs_tag', shadow: false, tex: 0.4 });
    txt('NGÔI NHÀ SÁNG TẠO!', 0, 187, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Polly with party hat
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', key: 'p_hs' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Bạn nhìn thấy hình circle ở đâu trong nhà?"
// =====================================================================
SCENES.cta = () => {
  engRoomLife(WALL_BASE);
  prSign('THỬ THÁCH HÔM NAY', { kicker: KICK });

  withT(540, 560, 0, 1, () => {
    pp(pR(-280, -50, 560, 100, 16), PR.creamL, { key: 'cta_cd', sb: 12, sy: 6, tex: 0.5 });
    txt('TÌM HÌNH CIRCLE TRONG NHÀ BẠN', 0, 8, 26, PR.navy, { align: 'center', weight: 800 });
  });

  prCommentBox(540, 780, 'CIRCLE', VW('cta', 'nhà').t0, { hint: 'Bé thấy hình circle ở đâu nào?' });

  const R = RNG('cta_stars5');
  for (let i = 0; i < 14; i++) {
    const sx = R.r(120, 960), sy = R.r(360, 1300);
    if (sx > 240 && sx < 840 && sy > 480 && sy < 950) continue;
    prStar(sx, sy, 18, i % 2 ? PR.yellow : PR.blue);
  }

  // Polly with mortar hat
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hold: propCard('S', -0.06, PR.mustard), hand: { x: -240, y: -380 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  cues.push({ t: VW('circle', 'circle').t0, k: 'pop' });
  cues.push({ t: VW('square_triangle', 'square').t0, k: 'pop' });
  cues.push({ t: VW('square_triangle', 'triangle').t0, k: 'pop' });

  const timerStart = VL('quiz').t1 + 0.5;
  cues.push({ t: timerStart + 0.5, k: 'tick' });
  cues.push({ t: timerStart + 1.5, k: 'tick' });
  cues.push({ t: timerStart + 2.5, k: 'tick' });

  cues.push({ t: VL('answer').t0 + 0.1, k: 'chime' });
  cues.push({ t: VL('answer').t0 + 0.25, k: 'thud' });
  cues.push({ t: VW('cta', 'nhà').t0, k: 'type', n: 6, d: 0.8 });
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
