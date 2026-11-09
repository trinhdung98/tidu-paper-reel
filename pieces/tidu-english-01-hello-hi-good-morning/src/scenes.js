// =====================================================================
//  TIDU ENGLISH 01 — "Hello, Hi hay Good Morning?"
//  One scene per voice line, following the 5-scene storyboard arc.
//  Mascot: polly() parrot with distinct hats and moods per scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · GREETING';
const SCENES = {};
const WALL_BASE = '#c9b28a';

// ---- Cut-paper helper characters
function paperKid(x, y, o = {}) {
  const key = o.key ?? 'kid', s = o.s ?? 0.95;
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
  const bob = Math.sin(TT * TAU * 1.2) * 6;
  // shoes
  [-36, 36].forEach((fx, i) => pp(pR(fx - 20, -12, 40, 24, 10), PR.char, { key: key + 'f' + i, sb: 8, sy: 4, tex: 0.4 }));
  // blue jeans
  pp(pR(-42, -120, 84, 110, 10), PR.navyD, { key: key + 'legs', sb: 10, sy: 5, tex: 0.5 });
  ctx.translate(0, bob);
  // sweater / body
  pp(pE(0, -200, 74, 95), PR.red, { key: key + 'body', sb: 16, sy: 8, tex: 0.55 });
  // white collar
  pp(pG([[-35, -280], [0, -235], [35, -280], [0, -295]]), PR.paperW, { key: key + 'col', shadow: false, tex: 0.3 });
  // waving arm / hand
  if (o.wave) {
    const wa = Math.sin(TT * 8) * 0.25 - 0.45;
    withT(-62, -230, wa, 1, () => {
      pp(pR(-15, -85, 30, 90, 12), PR.redD, { key: key + 'arm', sb: 8, sy: 4, tex: 0.4 });
      pp(pE(0, -96, 20, 20), PR.tan, { key: key + 'hnd', shadow: false, tex: 0.3 });
    });
  } else {
    pp(pR(-78, -230, 24, 80, 10), PR.redD, { key: key + 'armL', sb: 8, sy: 4, tex: 0.4 });
  }
  // head
  pp(pE(0, -350, 70, 74), PR.tan, { key: key + 'head', sb: 14, sy: 7, tex: 0.45 });
  // dark hair
  pp(pA(0, -365, 78, Math.PI * 0.82, Math.PI * 2.18), PR.char, { key: key + 'hair', sb: 10, sy: 5, tex: 0.5 });
  // eyes
  pp(pE(-25, -352, 8, 8), PR.ink, { key: key + 'e1', shadow: false, tex: false });
  pp(pE(25, -352, 8, 8), PR.ink, { key: key + 'e2', shadow: false, tex: false });
  pp(pE(-23, -355, 3, 3), PR.paperW, { shadow: false, tex: false });
  pp(pE(27, -355, 3, 3), PR.paperW, { shadow: false, tex: false });
  // cute smile
  ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -332, 20, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore();
  ctx.restore();
}

function paperTeacher(x, y, o = {}) {
  const key = o.key ?? 'tch', s = o.s ?? 1.0;
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
  // shoes
  [-36, 36].forEach((fx, i) => pp(pR(fx - 20, -12, 40, 24, 10), PR.char, { key: key + 'f' + i, sb: 8, sy: 4, tex: 0.4 }));
  // skirt
  pp(pG([[-54, -16], [54, -16], [38, -145], [-38, -145]]), PR.navy, { key: key + 'skirt', sb: 12, sy: 6, tex: 0.5 });
  // blazer
  pp(pR(-48, -270, 96, 135, 12), PR.teal, { key: key + 'blz', sb: 16, sy: 8, tex: 0.55 });
  // lapels & white shirt
  pp(pG([[-25, -270], [0, -195], [25, -270]]), PR.paperW, { key: key + 'lapel', shadow: false, tex: 0.3 });
  // folder in arm
  prFolder(42, -205, 0.65, PR.mustard, { key: key + 'fld' });
  // waving hand
  if (o.wave) {
    const wa = Math.sin(TT * 6) * 0.2 - 0.45;
    withT(-55, -240, wa, 1, () => {
      pp(pR(-14, -80, 28, 85, 10), PR.teal, { key: key + 'arm', sb: 8, sy: 4, tex: 0.4 });
      pp(pE(0, -90, 18, 18), PR.tan, { key: key + 'hnd', shadow: false, tex: 0.3 });
    });
  }
  // head
  pp(pE(0, -355, 66, 70), PR.tan, { key: key + 'head', sb: 14, sy: 7, tex: 0.45 });
  // hair bun
  pp(pE(0, -425, 32, 32), PR.woodD, { key: key + 'bun', sb: 8, sy: 4, tex: 0.5 });
  pp(pA(0, -370, 72, Math.PI * 0.78, Math.PI * 2.22), PR.woodD, { key: key + 'hair', sb: 10, sy: 5, tex: 0.5 });
  // glasses
  ctx.save(); ctx.strokeStyle = PR.redD; ctx.lineWidth = 4.5;
  ctx.strokeRect(-40, -370, 32, 24); ctx.strokeRect(8, -370, 32, 24);
  ctx.beginPath(); ctx.moveTo(-8, -358); ctx.lineTo(8, -358); ctx.stroke(); ctx.restore();
  // eyes & smile
  pp(pE(-24, -358, 5, 5), PR.ink, { key: key + 'e1', shadow: false, tex: false });
  pp(pE(24, -358, 5, 5), PR.ink, { key: key + 'e2', shadow: false, tex: false });
  ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -332, 18, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore();
  ctx.restore();
}

// Background decor
function engRoomLife(wallCol) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(1470, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prBunting(310);
  prClock(190, 420, 60, 8, 30);
  // floating alphabet letters as playful background motifs
  const cols = [PR.red, PR.blue, PR.green, PR.orange, PR.navy];
  ['A', 'B', 'C', 'D'].forEach((ch, i) => {
    const x = [120, 940, 140, 930][i], y = [570, 480, 1340, 1360][i];
    withT(x, y, (i % 2 ? 0.1 : -0.1), 1, () => txt(ch, 0, 0, 44, cols[i], { align: 'center', base: 'middle', weight: 800 }));
  });
}

// =====================================================================
//  SCENE 1 — hook: "Gặp bạn mới, bạn nói gì bằng tiếng Anh?"
// =====================================================================
SCENES.hook = () => {
  engRoomLife(WALL_BASE);
  prSign('GẶP BẠN MỚI', { kicker: KICK });

  // Friend walking in on the left
  const kidWalk = clamp((TT - VL('hook').t0) / 1.4);
  const kidX = 140 + kidWalk * 120;
  paperKid(kidX, 1470, { key: 'hk_kid', s: 0.86, wave: TT > 1.2 });

  // Hero card: big question badge at cx = 540, cy = 800
  const qPop = popS(VW('hook', 'nói').t0);
  withT(540, 800, 0, qPop, () => {
    pp(pR(-300, -220, 600, 440, 22), PR.creamL, { key: 'hk_cd', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-280, -200, 560, 400, 16), PR.paperW, { key: 'hk_in', shadow: false, tex: 0.4 });
    // question mark
    txt('?', 0, -20, 160, PR.red, { align: 'center', base: 'middle', weight: 800 });
    // question banner
    pp(pR(-240, 100, 480, 74, 12), PR.navy, { key: 'hk_tag', sb: 8, sy: 4, tex: 0.5 });
    txt('NÓI GÌ BẰNG TIẾNG ANH?', 0, 148, 30, PR.creamL, { align: 'center', weight: 800 });
  });

  // Mascot Polly on the right
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — hello: "Hello! Nghĩa là xin chào."
// =====================================================================
SCENES.hello = () => {
  engRoomLife('#bfa77e');
  prSign('LỜI CHÀO PHỔ BIẾN', { kicker: KICK });

  // Friend waving on the left
  paperKid(250, 1470, { key: 'hl_kid', s: 0.86, wave: true });

  // Hero Card at cx = 540, cy = 800
  const hPop = popS(VW('hello', 'hello').t0);
  withT(540, 800, -0.015, hPop, () => {
    // outer card
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'hl_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'hl_in', shadow: false, tex: 0.45 });

    // "Hello!" main text
    txt('Hello!', 0, -80, 96, PR.eng, { align: 'center', base: 'middle', weight: 800 });

    // divider
    pp(pR(-240, -10, 480, 8, 4), PR.tan, { key: 'hl_div', shadow: false, tex: 0.3 });

    // "XIN CHÀO" tag
    const tXinchao = VW('hello', 'nghĩa').t0;
    const xcPop = popS(tXinchao);
    withT(0, 60, 0, xcPop, () => {
      pp(pR(-200, -36, 400, 72, 14), PR.navy, { key: 'hl_xc', sb: 10, sy: 5, tex: 0.5 });
      txt('XIN CHÀO', 0, 12, 38, PR.creamL, { align: 'center', weight: 800 });
    });

    // Sub note
    const nPop = popS(tXinchao + 0.4);
    withT(0, 155, 0, nPop, () => {
      pp(pR(-240, -24, 480, 48, 12), PR.mint, { key: 'hl_pill', shadow: false, tex: 0.4 });
      txt('Dùng trong mọi hoàn cảnh · Lịch sự', 0, 8, 23, PR.greenD, { align: 'center', weight: 800 });
    });
  });

  // Speech bubbles popping from characters
  const sbT = VW('hello', 'hello').t0;
  prSpeech(340, 560, 220, 80, 260, 680, 'Hello!', { t: sbT, key: 'sp_hl1' });
  prSpeech(740, 560, 220, 80, 830, 680, 'Hello!', { t: sbT + 0.3, key: 'sp_hl2' });

  // Polly on the right
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_hello' });
  prChips();
};

// =====================================================================
//  SCENE 3 — hi: "Hi! Cũng là xin chào, thường thân mật hơn."
// =====================================================================
SCENES.hi = () => {
  engRoomLife(WALL_BASE);
  prSign('CHÀO THÂN MẬT', { kicker: KICK });

  // Friend giving friendly wave
  paperKid(250, 1470, { key: 'hi_kid', s: 0.86, wave: true });

  // Hero Card at cx = 540, cy = 800
  const hiPop = popS(VW('hi', 'hi').t0);
  withT(540, 800, 0.015, hiPop, () => {
    pp(pR(-320, -240, 640, 480, 24), PR.creamL, { key: 'hi_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -220, 600, 440, 18), PR.paperW, { key: 'hi_in', shadow: false, tex: 0.45 });

    // "Hi!" main text
    txt('Hi!', 0, -80, 112, PR.orange, { align: 'center', base: 'middle', weight: 800 });

    // divider
    pp(pR(-240, -10, 480, 8, 4), PR.tan, { key: 'hi_div', shadow: false, tex: 0.3 });

    // "XIN CHÀO (THÂN MẬT)" tag
    const tXinchao = VW('hi', 'cũng').t0;
    const xcPop = popS(tXinchao);
    withT(0, 60, 0, xcPop, () => {
      pp(pR(-230, -36, 460, 72, 14), PR.redD, { key: 'hi_xc', sb: 10, sy: 5, tex: 0.5 });
      txt('XIN CHÀO (THÂN MẬT)', 0, 12, 34, PR.creamL, { align: 'center', weight: 800 });
    });

    // Friend badge
    const fPop = popS(VW('hi', 'thân').t0);
    withT(0, 155, 0, fPop, () => {
      pp(pR(-240, -24, 480, 48, 12), PR.cream, { key: 'hi_pill', shadow: false, tex: 0.4 });
      txt('Dành cho bạn bè · Người thân quen', 0, 8, 23, PR.navy, { align: 'center', weight: 800 });
    });
  });

  // Alphabet toy blocks on floor
  prBlock(420, 1420, 'H', PR.red, 0.55, -0.06);
  prBlock(520, 1420, 'I', PR.blue, 0.55, 0.06);

  // Speech bubble
  prSpeech(340, 560, 180, 80, 260, 680, 'Hi!', { t: VW('hi', 'hi').t0, key: 'sp_hi' });

  // Polly on the right
  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: 'happy', hold: propCard('H', -0.08, PR.orange), hand: { x: -240, y: -380 }, key: 'p_hi' });
  prChips();
};

// =====================================================================
//  SCENE 4 — morning: "Còn vào buổi sáng, chúng ta có thể nói Good morning!"
// =====================================================================
SCENES.morning = () => {
  // Morning dawn wall
  prWall('#86a8ba', { panel: 'rgba(255,255,255,0.08)', streak: false });
  prFloor(1470, PR.greenD, { studs: false, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard4', sb: 8, sy: 4, tex: 0.5 });
  prSign('CHÀO BUỔI SÁNG', { kicker: KICK });

  // Sun-rise animation behind the hero card
  const sunT = VW('morning', 'sáng').t0;
  const sunU = ev(sunT, 1.2);
  const sunY = 720 - sunU * 160;
  // rotating rays
  withT(540, sunY, TT * 0.4, 1, () => {
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 6; ctx.lineCap = 'round';
    for (let i = 0; i < 12; i++) {
      const an = i / 12 * TAU;
      ctx.beginPath();
      ctx.moveTo(Math.cos(an) * 110, Math.sin(an) * 110);
      ctx.lineTo(Math.cos(an) * 145, Math.sin(an) * 145);
      ctx.stroke();
    }
    ctx.restore();
  });
  // sun disc
  pp(pE(540, sunY, 95, 95), PR.yellow, { key: 'sun_disc', sb: 18, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.6)' });

  // Morning clouds
  pp(pE(240, 580, 90, 42), PR.paperW, { key: 'cld1', sb: 10, sy: 5, tex: 0.4 });
  pp(pE(840, 540, 110, 48), PR.paperW, { key: 'cld2', sb: 10, sy: 5, tex: 0.4 });

  // Hero card at cx = 540, cy = 940 (w = 660, h = 340)
  const mPop = popS(VW('morning', 'good').t0);
  withT(540, 940, -0.01, mPop, () => {
    pp(pR(-330, -170, 660, 340, 22), PR.creamL, { key: 'gm_cd', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-310, -150, 620, 300, 16), PR.paperW, { key: 'gm_in', shadow: false, tex: 0.45 });

    // "Good morning!" heading
    txt('Good morning!', 0, -50, 64, PR.navy, { align: 'center', base: 'middle', weight: 800 });

    // divider
    pp(pR(-240, 0, 480, 6, 3), PR.tan, { key: 'gm_div', shadow: false, tex: 0.3 });

    // Vietnamese banner
    pp(pR(-200, 24, 400, 62, 12), PR.orange, { key: 'gm_tag', sb: 8, sy: 4, tex: 0.5 });
    txt('CHÀO BUỔI SÁNG', 0, 66, 32, PR.creamL, { align: 'center', weight: 800 });

    // Sub note
    txt('Trang trọng · Lịch sự khi gặp người lớn', 0, 124, 22, PR.navy, { align: 'center', weight: 700 });
  });

  // Polly on the right
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', key: 'p_morning' });
  prChips();
};

// =====================================================================
//  SCENE 5 — quiz: "Bây giờ thử nhé. Bạn gặp cô giáo vào buổi sáng, bạn sẽ nói gì?"
// =====================================================================
SCENES.quiz = () => {
  // School hallway wall
  prWall('#d4c3a3', { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(1470, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard5', sb: 8, sy: 4, tex: 0.5 });
  prSign('THỬ TÀI CỦA BẠN', { kicker: KICK });

  // School banner in background
  withT(540, 390, 0, 1, () => {
    pp(pR(-300, -32, 600, 64, 10), PR.navyD, { key: 'sch_bg', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-290, -24, 580, 48, 8), PR.creamL, { key: 'sch_fg', shadow: false, tex: 0.4 });
    txt('TRƯỜNG HỌC · CỔNG TRƯỜNG BUỔI SÁNG', 0, 10, 24, PR.navy, { align: 'center', weight: 800 });
  });

  // Teacher character standing on the left
  paperTeacher(230, 1470, { key: 'qz_tch', s: 0.88, wave: true });

  // Question header board at cx = 540, cy = 600
  const qPop = popS(VW('quiz', 'cô').t0);
  withT(540, 600, 0, qPop, () => {
    pp(pR(-310, -90, 620, 180, 18), PR.creamL, { key: 'qz_qbd', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.6)' });
    pp(pR(-290, -74, 580, 148, 14), PR.paperW, { key: 'qz_qin', shadow: false, tex: 0.4 });
    pp(pR(-180, -60, 360, 40, 8), PR.redD, { key: 'qz_qtag', shadow: false, tex: 0.4 });
    txt('GẶP CÔ GIÁO BUỔI SÁNG', 0, -32, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('BẠN SẼ CHÀO CÂU GÌ?', 0, 30, 34, PR.navy, { align: 'center', weight: 800 });
  });

  // Two choice cards side by side (Paired elements: midpoint must be 540!)
  // Desired gap = 380 -> left = 350, right = 730
  const optPop = popS(VW('quiz', 'gì').t0);
  // Option A at x = 350, y = 870 (w = 320, h = 220)
  withT(350, 870, -0.015, optPop, () => {
    pp(pR(-160, -110, 320, 220, 18), PR.creamL, { key: 'opt_a', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -94, 288, 188, 14), PR.paperW, { key: 'opt_ain', shadow: false, tex: 0.4 });
    pp(pR(-120, -80, 60, 42, 8), PR.blue, { key: 'opt_atag', shadow: false, tex: 0.4 });
    txt('A', -90, -50, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Hi!', 0, 25, 52, PR.orange, { align: 'center', base: 'middle', weight: 800 });
  });

  // Option B at x = 730, y = 870 (w = 320, h = 220)
  withT(730, 870, 0.015, optPop, () => {
    pp(pR(-160, -110, 320, 220, 18), PR.creamL, { key: 'opt_b', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -94, 288, 188, 14), PR.paperW, { key: 'opt_bin', shadow: false, tex: 0.4 });
    pp(pR(-120, -80, 60, 42, 8), PR.green, { key: 'opt_btag', shadow: false, tex: 0.4 });
    txt('B', -90, -50, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Good morning!', 0, 25, 34, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  // Countdown timer widget at cx = 540, cy = 1140 (during pause from 28.5 to 38.0s)
  const timerStart = VL('quiz').t1 + 0.5, timerEnd = VL('answer').t0 - 0.5;
  const tmK = popS(timerStart - 0.2);
  if (tmK > 0.01) {
    const leftFrac = clamp(1 - (TT - timerStart) / (timerEnd - timerStart));
    const secsLeft = Math.ceil(leftFrac * 3);
    const r = 66;
    withT(540, 1140, 0, tmK, () => {
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

  // Polly on the right pointing wing
  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'neutral', hand: { x: -250, y: -340 }, key: 'p_quiz' });
  prChips();
};
function keyTm(s) { return 'tm_' + s; }

// =====================================================================
//  SCENE 6 — answer: "Good morning! Chính xác!"
// =====================================================================
SCENES.answer = () => {
  engRoomLife(WALL_BASE);
  prSign('ĐÁP ÁN CHÍNH XÁC', { kicker: KICK });

  // Teacher waving happily
  paperTeacher(230, 1470, { key: 'ans_tch', s: 0.88, wave: true });

  // Winning card at cx = 540, cy = 820
  withT(540, 820, 0, 1, () => {
    pp(pR(-320, -220, 640, 440, 24), PR.creamL, { key: 'ans_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -200, 600, 400, 18), PR.mint, { key: 'ans_in', shadow: false, tex: 0.45 });

    // Option B badge
    pp(pR(-260, -170, 120, 48, 10), PR.green, { key: 'ans_tag', shadow: false, tex: 0.4 });
    txt('ĐÁP ÁN B', -200, -138, 22, PR.creamL, { align: 'center', weight: 800 });

    // Answer text
    txt('Good morning!', 0, -40, 64, PR.greenD, { align: 'center', base: 'middle', weight: 800 });

    // divider
    pp(pR(-240, 20, 480, 6, 3), PR.greenL, { key: 'ans_div', shadow: false, tex: 0.3 });

    // Explanation
    txt('Chào cô giáo vào buổi sáng lịch sự nhất!', 0, 80, 26, PR.navy, { align: 'center', weight: 700 });
  });

  // Green checkmark
  prCheck(760, 680, VL('answer').t0 + 0.1);

  // Big celebration stamp slamming down
  prStamp('CHÍNH XÁC', 540, 960, PR.green, VW('answer', 'xác').t0, { rot: -0.05, size: 52, from: 1.3 });

  // Polly celebrating with mortar hat
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 7 — recap: "Hãy nói lại cùng mình: Hello! Hi! Good morning!"
// =====================================================================
SCENES.recap = () => {
  engRoomLife('#bfa77e');
  prSign('3 LỜI CHÀO ĐÃ HỌC', { kicker: KICK });

  // 3-column group: card width w = 240, column centres: 270, 540, 810!
  // Col 1: left edge 270 - 120 = 150 (> 70 safe zone)
  // Col 3: right edge 810 + 120 = 930 (<= 960 phone-UI margin)
  const tHl = VW('recap', 'hello').t0;
  const tHi = VW('recap', 'hi').t0;
  const tGm = VW('recap', 'morning').t0;

  // Column 1: Hello! at x = 270, y = 820
  const isHl = TT >= tHl;
  withT(270, 820, -0.01, popS(VL('recap').t0 + 0.1), () => {
    pp(pR(-120, -220, 240, 440, 18), isHl ? PR.creamL : PR.cream, { key: 'rc_c1', sb: isHl ? 20 : 12, sy: 10, tex: 0.5 });
    pp(pR(-106, -206, 212, 412, 14), isHl ? PR.paperW : PR.creamL, { key: 'rc_in1', shadow: false, tex: 0.4 });
    // number pill
    pp(pE(0, -150, 24, 24), PR.blue, { key: 'rc_num1', shadow: false, tex: 0.4 });
    txt('1', 0, -141, 24, PR.creamL, { align: 'center', weight: 800 });
    // main word
    txt('Hello!', 0, -60, 44, PR.blue, { align: 'center', weight: 800 });
    // divider
    pp(pR(-70, -10, 140, 4, 2), PR.tan, { key: 'rc_d1', shadow: false, tex: 0.3 });
    // Vietnamese & usage
    txt('Xin chào', 0, 40, 28, PR.navy, { align: 'center', weight: 800 });
    txt('Chung cho\nmọi người', 0, 110, 20, PR.char, { align: 'center', weight: 600 });
    if (isHl) prCheck(80, -180, tHl);
  });

  // Column 2: Hi! at x = 540, y = 820
  const isHi = TT >= tHi;
  withT(540, 820, 0, popS(VL('recap').t0 + 0.2), () => {
    pp(pR(-120, -220, 240, 440, 18), isHi ? PR.creamL : PR.cream, { key: 'rc_c2', sb: isHi ? 20 : 12, sy: 10, tex: 0.5 });
    pp(pR(-106, -206, 212, 412, 14), isHi ? PR.paperW : PR.creamL, { key: 'rc_in2', shadow: false, tex: 0.4 });
    pp(pE(0, -150, 24, 24), PR.orange, { key: 'rc_num2', shadow: false, tex: 0.4 });
    txt('2', 0, -141, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Hi!', 0, -60, 50, PR.orange, { align: 'center', weight: 800 });
    pp(pR(-70, -10, 140, 4, 2), PR.tan, { key: 'rc_d2', shadow: false, tex: 0.3 });
    txt('Xin chào', 0, 40, 28, PR.navy, { align: 'center', weight: 800 });
    txt('Thân mật\nbạn bè', 0, 110, 20, PR.char, { align: 'center', weight: 600 });
    if (isHi) prCheck(80, -180, tHi);
  });

  // Column 3: Good morning! at x = 810, y = 820
  const isGm = TT >= tGm;
  withT(810, 820, 0.01, popS(VL('recap').t0 + 0.3), () => {
    pp(pR(-120, -220, 240, 440, 18), isGm ? PR.creamL : PR.cream, { key: 'rc_c3', sb: isGm ? 20 : 12, sy: 10, tex: 0.5 });
    pp(pR(-106, -206, 212, 412, 14), isGm ? PR.paperW : PR.creamL, { key: 'rc_in3', shadow: false, tex: 0.4 });
    pp(pE(0, -150, 24, 24), PR.green, { key: 'rc_num3', shadow: false, tex: 0.4 });
    txt('3', 0, -141, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Good\nmorning!', 0, -70, 28, PR.green, { align: 'center', weight: 800 });
    pp(pR(-70, -10, 140, 4, 2), PR.tan, { key: 'rc_d3', shadow: false, tex: 0.3 });
    txt('Chào\nbuổi sáng', 0, 40, 24, PR.navy, { align: 'center', weight: 800 });
    txt('Trang trọng\nlịch sự', 0, 110, 20, PR.char, { align: 'center', weight: 600 });
    if (isGm) prCheck(80, -180, tGm);
  });

  // Polly holding book, party hat
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'wow', hold: propBook(0.12), hand: { x: -240, y: -380 }, key: 'p_recap' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Bạn thích Hello hay Hi hơn? Hãy nói thử!"
// =====================================================================
SCENES.cta = () => {
  engRoomLife(WALL_BASE);
  prSign('BÌNH LUẬN NÀO', { kicker: KICK });

  // Two comparison badges (Midpoint: (350 + 730) / 2 = 540!)
  withT(350, 560, -0.02, 1, () => {
    pp(pR(-150, -60, 300, 120, 16), PR.creamL, { key: 'cta_b1', sb: 12, sy: 6, tex: 0.5 });
    txt('HELLO', 0, 10, 42, PR.blue, { align: 'center', weight: 800 });
  });

  withT(730, 560, 0.02, 1, () => {
    pp(pR(-150, -60, 300, 120, 16), PR.creamL, { key: 'cta_b2', sb: 12, sy: 6, tex: 0.5 });
    txt('HI', 0, 10, 48, PR.orange, { align: 'center', weight: 800 });
  });

  // "HAY" badge at cx = 540, cy = 560
  pp(pE(540, 560, 38, 38), PR.red, { key: 'cta_vs', sb: 10, sy: 5, tex: 0.4 });
  txt('HAY', 540, 568, 20, PR.creamL, { align: 'center', weight: 800 });

  // Comment box at cx = 540, cy = 820
  prCommentBox(540, 820, 'HELLO', VW('cta', 'thử').t0, { hint: 'Bình luận Hello hay Hi nhé!' });

  // Celebration confetti stars
  const R = RNG('cta_stars');
  for (let i = 0; i < 12; i++) {
    const sx = R.r(120, 960), sy = R.r(360, 1300);
    if (sx > 240 && sx < 840 && sy > 500 && sy < 950) continue;
    prStar(sx, sy, 18, i % 2 ? PR.yellow : PR.mustard);
  }

  // Polly on the right celebrating
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hold: propCard('A', -0.06, PR.red), hand: { x: -240, y: -380 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  cues.push({ t: VW('hook', 'nói').t0, k: 'pop' });
  cues.push({ t: VW('hello', 'hello').t0, k: 'pop' });
  cues.push({ t: VW('hi', 'hi').t0, k: 'pop' });
  cues.push({ t: VW('morning', 'good').t0, k: 'pop' });
  cues.push({ t: VW('quiz', 'cô').t0, k: 'pop' });

  // Quiz countdown ticks
  const timerStart = VL('quiz').t1 + 0.5;
  cues.push({ t: timerStart + 0.5, k: 'tick' });
  cues.push({ t: timerStart + 1.5, k: 'tick' });
  cues.push({ t: timerStart + 2.5, k: 'tick' });

  // Answer chime & stamp thud
  cues.push({ t: VL('answer').t0 + 0.1, k: 'chime' });
  cues.push({ t: VW('answer', 'xác').t0, k: 'thud' });

  // Recap pops
  cues.push({ t: VW('recap', 'hello').t0, k: 'pop' });
  cues.push({ t: VW('recap', 'hi').t0, k: 'pop' });
  cues.push({ t: VW('recap', 'morning').t0, k: 'pop' });

  // CTA type
  cues.push({ t: VW('cta', 'thử').t0, k: 'type', n: 5, d: 0.8 });
  return cues;
}

// =====================================================================
//  SHOTS + TIMELINE — one shot per line (in script order); SPLITS = [[lineId, word, n, sceneKey]] cut again on a word
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
