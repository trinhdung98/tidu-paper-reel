// =====================================================================
//  TIDU ENGLISH 03 — "Đoán màu bằng tiếng Anh"
//  Mascot: polly() parrot with distinct hats and moods per scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · MÀU SẮC';
const SCENES = {};
const WALL_BASE = '#c9b28a';

// Props
function propApple(x, y, s = 1) {
  withT(x, y, 0, s, () => {
    // stem
    pp(pR(-6, -115, 12, 40, 4), PR.wood, { key: 'ap_st', sb: 4, sy: 2, tex: 0.3 });
    // leaf
    pp(pE(26, -105, 26, 12, 0.4), PR.green, { key: 'ap_lf', sb: 6, sy: 3, tex: 0.4 });
    // apple lobes
    pp(pE(-32, -25, 62, 70), PR.red, { key: 'ap_l1', sb: 16, sy: 8, tex: 0.55 });
    pp(pE(32, -25, 62, 70), PR.red, { key: 'ap_l2', sb: 16, sy: 8, tex: 0.55 });
    // shine
    pp(pE(-28, -48, 14, 28, -0.2), PR.paperW, { shadow: false, tex: false });
  });
}

function propBalloon(x, y, s = 1) {
  const bob = Math.sin(TT * 3) * 6;
  withT(x, y + bob, Math.sin(TT * 2) * 0.05, s, () => {
    // balloon string
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(0, 70); ctx.quadraticCurveTo(15, 110, -10, 150); ctx.stroke(); ctx.restore();
    // knot
    pp(pG([[-12, 72], [12, 72], [0, 56]]), PR.blue, { key: 'bl_kn', sb: 4, sy: 2, tex: 0.4 });
    // balloon body
    pp(pE(0, -30, 84, 102), PR.blue, { key: 'bl_bd', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.4)' });
    // highlight
    pp(pE(-30, -55, 16, 32, -0.2), PR.paperW, { shadow: false, tex: false });
  });
}

function propSun(x, y, s = 1) {
  withT(x, y, 0, s, () => {
    // rotating rays
    withT(0, 0, TT * 0.5, 1, () => {
      ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 6; ctx.lineCap = 'round';
      for (let i = 0; i < 12; i++) {
        const an = i / 12 * TAU;
        ctx.beginPath();
        ctx.moveTo(Math.cos(an) * 92, Math.sin(an) * 92);
        ctx.lineTo(Math.cos(an) * 124, Math.sin(an) * 124);
        ctx.stroke();
      }
      ctx.restore();
    });
    // sun disc
    pp(pE(0, 0, 80, 80), PR.yellow, { key: 'sn_dc', sb: 18, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.6)' });
  });
}

function engRoomLife(wallCol) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(1470, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prBunting(310);
  prClock(190, 420, 60, 10, 10);
  const cols = [PR.red, PR.blue, PR.green, PR.orange, PR.navy];
  ['A', 'B', 'C', 'D'].forEach((ch, i) => {
    const x = [120, 940, 140, 930][i], y = [570, 480, 1340, 1360][i];
    withT(x, y, (i % 2 ? 0.1 : -0.1), 1, () => txt(ch, 0, 0, 44, cols[i], { align: 'center', base: 'middle', weight: 800 }));
  });
}

// =====================================================================
//  SCENE 1 — hook: "Bạn biết màu đỏ, xanh dương và vàng trong tiếng Anh chưa?"
// =====================================================================
SCENES.hook = () => {
  engRoomLife(WALL_BASE);
  prSign('ĐOÁN MÀU TIẾNG ANH', { kicker: KICK });

  // 3 face-down mystery cards at 270, 540, 810
  [[270, 'c1', -0.02, PR.red], [540, 'c2', 0, PR.blue], [810, 'c3', 0.02, PR.mustard]].forEach(([cx, key, rot, col], i) => {
    withT(cx, 760, rot, 1, () => {
      pp(pR(-115, -170, 230, 340, 18), PR.creamL, { key: 'hk_' + key, sb: 16, sy: 8, tex: 0.55 });
      pp(pR(-100, -155, 200, 310, 14), PR.cream, { key: 'hk_in' + key, shadow: false, tex: 0.4 });
      pp(pE(0, -30, 42, 42), col, { key: 'hk_dc' + key, shadow: false, tex: 0.3 });
      txt('?', 0, -12, 60, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt('MÀU ' + (i + 1), 0, 80, 24, PR.navy, { align: 'center', weight: 800 });
    });
  });

  // Polly with mortar hat
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — red: "Nhìn quả táo này: Red!"
// =====================================================================
SCENES.red = () => {
  engRoomLife('#bfa77e');
  prSign('MÀU ĐỎ · RED', { kicker: KICK });

  // Hero Card at cx = 540, cy = 800
  withT(540, 800, -0.015, 1, () => {
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'rd_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'rd_in', shadow: false, tex: 0.45 });

    // Apple
    propApple(0, -70, 1.15);

    // divider
    pp(pR(-240, 30, 480, 6, 3), PR.tan, { key: 'rd_div', shadow: false, tex: 0.3 });

    // Red heading
    txt('RED', 0, 110, 86, PR.red, { align: 'center', base: 'middle', weight: 800 });

    // Tag
    pp(pR(-120, 160, 240, 46, 12), PR.redD, { key: 'rd_tag', shadow: false, tex: 0.4 });
    txt('MÀU ĐỎ', 0, 192, 26, PR.creamL, { align: 'center', weight: 800 });
  });

  // Polly with cap hat, holding red card
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'happy', hold: propCard('R', -0.08, PR.red), hand: { x: -240, y: -380 }, key: 'p_red' });
  prChips();
};

// =====================================================================
//  SCENE 3 — blue: "Đây là quả bóng bay màu xanh dương: Blue!"
// =====================================================================
SCENES.blue = () => {
  engRoomLife('#86a8ba');
  prSign('MÀU XANH DƯƠNG · BLUE', { kicker: KICK });

  // Hero Card at cx = 540, cy = 800
  withT(540, 800, 0.015, 1, () => {
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'bl_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'bl_in', shadow: false, tex: 0.45 });

    // Balloon
    propBalloon(0, -70, 1.05);

    // divider
    pp(pR(-240, 30, 480, 6, 3), PR.tan, { key: 'bl_div', shadow: false, tex: 0.3 });

    // Blue heading
    txt('BLUE', 0, 110, 86, PR.blue, { align: 'center', base: 'middle', weight: 800 });

    // Tag
    pp(pR(-160, 160, 320, 46, 12), PR.navy, { key: 'bl_tag', shadow: false, tex: 0.4 });
    txt('MÀU XANH DƯƠNG', 0, 192, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Polly with pirate hat
  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: 'happy', hold: propCard('B', -0.08, PR.blue), hand: { x: -240, y: -380 }, key: 'p_bl' });
  prChips();
};

// =====================================================================
//  SCENE 4 — yellow: "Còn mặt trời màu vàng: Yellow!"
// =====================================================================
SCENES.yellow = () => {
  engRoomLife(WALL_BASE);
  prSign('MÀU VÀNG · YELLOW', { kicker: KICK });

  // Hero Card at cx = 540, cy = 800
  withT(540, 800, -0.01, 1, () => {
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'yl_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'yl_in', shadow: false, tex: 0.45 });

    // Sun
    propSun(0, -80, 1.0);

    // divider
    pp(pR(-240, 30, 480, 6, 3), PR.tan, { key: 'yl_div', shadow: false, tex: 0.3 });

    // Yellow heading
    txt('YELLOW', 0, 110, 80, PR.mustard, { align: 'center', base: 'middle', weight: 800 });

    // Tag
    pp(pR(-130, 160, 260, 46, 12), PR.orange, { key: 'yl_tag', shadow: false, tex: 0.4 });
    txt('MÀU VÀNG', 0, 192, 26, PR.creamL, { align: 'center', weight: 800 });
  });

  // Polly with crown hat
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hold: propCard('Y', -0.08, PR.yellow), hand: { x: -240, y: -380 }, key: 'p_yl' });
  prChips();
};

// =====================================================================
//  SCENE 5 — repeat: "Hãy nói theo nhé: Red, Blue, Yellow."
// =====================================================================
SCENES.repeat = () => {
  engRoomLife('#d4c3a3');
  prSign('CÙNG NÓI LẠI NHÉ', { kicker: KICK });

  const isR = TT >= VW('repeat', 'red').t0;
  const isB = TT >= VW('repeat', 'blue').t0;
  const isY = TT >= VW('repeat', 'yellow').t0;

  // 3 Columns: 270, 540, 810 (Card width 240)
  // Col 1: Red
  withT(270, 760, -0.015, 1, () => {
    pp(pR(-120, -180, 240, 360, 18), isR ? PR.creamL : PR.cream, { key: 'rp_c1', sb: isR ? 20 : 12, sy: 8, tex: 0.5 });
    pp(pR(-106, -166, 212, 332, 14), isR ? PR.paperW : PR.creamL, { key: 'rp_in1', shadow: false, tex: 0.4 });
    propApple(0, -60, 0.7);
    txt('RED', 0, 40, 40, PR.red, { align: 'center', weight: 800 });
    txt('Màu đỏ', 0, 95, 24, PR.navy, { align: 'center', weight: 700 });
    if (isR) prCheck(75, -140, VW('repeat', 'red').t0);
  });

  // Col 2: Blue
  withT(540, 760, 0, 1, () => {
    pp(pR(-120, -180, 240, 360, 18), isB ? PR.creamL : PR.cream, { key: 'rp_c2', sb: isB ? 20 : 12, sy: 8, tex: 0.5 });
    pp(pR(-106, -166, 212, 332, 14), isB ? PR.paperW : PR.creamL, { key: 'rp_in2', shadow: false, tex: 0.4 });
    propBalloon(0, -60, 0.65);
    txt('BLUE', 0, 40, 40, PR.blue, { align: 'center', weight: 800 });
    txt('Xanh dương', 0, 95, 22, PR.navy, { align: 'center', weight: 700 });
    if (isB) prCheck(75, -140, VW('repeat', 'blue').t0);
  });

  // Col 3: Yellow
  withT(810, 760, 0.015, 1, () => {
    pp(pR(-120, -180, 240, 360, 18), isY ? PR.creamL : PR.cream, { key: 'rp_c3', sb: isY ? 20 : 12, sy: 8, tex: 0.5 });
    pp(pR(-106, -166, 212, 332, 14), isY ? PR.paperW : PR.creamL, { key: 'rp_in3', shadow: false, tex: 0.4 });
    propSun(0, -60, 0.6);
    txt('YELLOW', 0, 40, 34, PR.mustard, { align: 'center', weight: 800 });
    txt('Màu vàng', 0, 95, 24, PR.navy, { align: 'center', weight: 700 });
    if (isY) prCheck(75, -140, VW('repeat', 'yellow').t0);
  });

  // Polly with wizard hat teaching
  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_rp' });
  prChips();
};

// =====================================================================
//  SCENE 6 — quiz: "Bây giờ thử thách! Quả bóng bay này màu gì? What color is it?"
// =====================================================================
SCENES.quiz = () => {
  engRoomLife('#86a8ba');
  prSign('THỬ THÁCH ĐOÁN MÀU', { kicker: KICK });

  // Balloon on screen without label at cx = 540, cy = 520
  withT(540, 520, 0, 1, () => {
    pp(pR(-200, -120, 400, 240, 20), PR.creamL, { key: 'qz_cd', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-186, -106, 372, 212, 16), PR.paperW, { key: 'qz_in', shadow: false, tex: 0.45 });
    propBalloon(0, -10, 0.85);
  });

  // Question header board at cx = 540, cy = 720
  withT(540, 720, 0, 1, () => {
    pp(pR(-280, -45, 560, 90, 14), PR.navy, { key: 'qz_qbd', sb: 12, sy: 6, tex: 0.5 });
    txt('WHAT COLOR IS IT?', 0, 10, 36, PR.creamL, { align: 'center', weight: 800 });
  });

  // Two options: 350 and 730 (midpoint 540)
  withT(350, 910, -0.015, 1, () => {
    pp(pR(-160, -90, 320, 180, 18), PR.creamL, { key: 'opt_a', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -74, 288, 148, 14), PR.paperW, { key: 'opt_ain', shadow: false, tex: 0.4 });
    pp(pR(-120, -60, 55, 36, 8), PR.red, { key: 'opt_atag', shadow: false, tex: 0.4 });
    txt('A', -92, -34, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('Red', 0, 25, 46, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  withT(730, 910, 0.015, 1, () => {
    pp(pR(-160, -90, 320, 180, 18), PR.creamL, { key: 'opt_b', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -74, 288, 148, 14), PR.paperW, { key: 'opt_bin', shadow: false, tex: 0.4 });
    pp(pR(-120, -60, 55, 36, 8), PR.blue, { key: 'opt_btag', shadow: false, tex: 0.4 });
    txt('B', -92, -34, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('Blue', 0, 25, 46, PR.blue, { align: 'center', base: 'middle', weight: 800 });
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
//  SCENE 7 — answer: "It's blue! Chính xác! Bạn đã học được ba màu đầu tiên rồi!"
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

    txt("IT'S BLUE!", 0, -40, 80, PR.blue, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-240, 20, 480, 6, 3), '#8fc27e', { key: 'ans_div', shadow: false, tex: 0.3 });
    txt('Bé đã học được 3 màu: Red, Blue, Yellow!', 0, 80, 26, PR.navy, { align: 'center', weight: 700 });
  });

  prCheck(760, 680, E0 + 0.1);
  prStamp('CHÍNH XÁC', 540, 960, PR.green, E0 + 0.25, { rot: -0.05, size: 52, from: 1.25 });

  // Polly celebrating with party hat
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Hãy tìm một đồ vật màu blue quanh bạn."
// =====================================================================
SCENES.cta = () => {
  engRoomLife(WALL_BASE);
  prSign('THỬ THÁCH HÔM NAY', { kicker: KICK });

  withT(540, 560, 0, 1, () => {
    pp(pR(-280, -50, 560, 100, 16), PR.creamL, { key: 'cta_cd', sb: 12, sy: 6, tex: 0.5 });
    txt('TÌM MỘT ĐỒ VẬT MÀU BLUE QUANH BẠN', 0, 8, 24, PR.navy, { align: 'center', weight: 800 });
  });

  prCommentBox(540, 780, 'BLUE', VW('cta', 'blue').t0, { hint: 'Đồ vật màu blue quanh bé là gì?' });

  const R = RNG('cta_stars3');
  for (let i = 0; i < 14; i++) {
    const sx = R.r(120, 960), sy = R.r(360, 1300);
    if (sx > 240 && sx < 840 && sy > 480 && sy < 950) continue;
    prStar(sx, sy, 18, i % 2 ? PR.yellow : PR.blue);
  }

  // Polly with mortar hat celebrating
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hold: propCard('B', -0.06, PR.blue), hand: { x: -240, y: -380 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  cues.push({ t: VW('red', 'red').t0, k: 'pop' });
  cues.push({ t: VW('blue', 'blue').t0, k: 'pop' });
  cues.push({ t: VW('yellow', 'yellow').t0, k: 'pop' });

  const timerStart = VL('quiz').t1 + 0.5;
  cues.push({ t: timerStart + 0.5, k: 'tick' });
  cues.push({ t: timerStart + 1.5, k: 'tick' });
  cues.push({ t: timerStart + 2.5, k: 'tick' });

  cues.push({ t: VL('answer').t0 + 0.1, k: 'chime' });
  cues.push({ t: VL('answer').t0 + 0.25, k: 'thud' });
  cues.push({ t: VW('cta', 'blue').t0, k: 'type', n: 5, d: 0.7 });
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
