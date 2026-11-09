// =====================================================================
//  TIDU ENGLISH 02 — "Ba từ lịch sự bé nên biết"
//  Mascot: polly() parrot with distinct hats and moods per scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · LỊCH SỰ';
const SCENES = {};
const WALL_BASE = '#c9b28a';

// ---- Paper character helper
function paperKid(x, y, o = {}) {
  const key = o.key ?? 'kid', s = o.s ?? 0.95;
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
  const bob = Math.sin(TT * TAU * 1.2) * 6;
  [-36, 36].forEach((fx, i) => pp(pR(fx - 20, -12, 40, 24, 10), PR.char, { key: key + 'f' + i, sb: 8, sy: 4, tex: 0.4 }));
  pp(pR(-42, -120, 84, 110, 10), PR.navyD, { key: key + 'legs', sb: 10, sy: 5, tex: 0.5 });
  ctx.translate(0, bob);
  pp(pE(0, -200, 74, 95), o.color ?? PR.red, { key: key + 'body', sb: 16, sy: 8, tex: 0.55 });
  pp(pG([[-35, -280], [0, -235], [35, -280], [0, -295]]), PR.paperW, { key: key + 'col', shadow: false, tex: 0.3 });
  if (o.wave) {
    const wa = Math.sin(TT * 8) * 0.25 - 0.45;
    withT(-62, -230, wa, 1, () => {
      pp(pR(-15, -85, 30, 90, 12), o.colorD ?? PR.redD, { key: key + 'arm', sb: 8, sy: 4, tex: 0.4 });
      pp(pE(0, -96, 20, 20), PR.tan, { key: key + 'hnd', shadow: false, tex: 0.3 });
    });
  } else if (o.reach) {
    withT(50, -210, -0.2, 1, () => {
      pp(pR(-12, -20, 70, 28, 10), o.colorD ?? PR.redD, { key: key + 'armR', sb: 8, sy: 4, tex: 0.4 });
      pp(pE(65, -6, 16, 16), PR.tan, { key: key + 'hndR', shadow: false, tex: 0.3 });
    });
  } else {
    pp(pR(-78, -230, 24, 80, 10), o.colorD ?? PR.redD, { key: key + 'armL', sb: 8, sy: 4, tex: 0.4 });
  }
  // head & hair
  pp(pE(0, -350, 70, 74), PR.tan, { key: key + 'head', sb: 14, sy: 7, tex: 0.45 });
  pp(pR(-74, -425, 148, 65, 24), PR.char, { key: key + 'hair', sb: 10, sy: 5, tex: 0.5 });
  pp(pR(-74, -395, 26, 45, 10), PR.char, { key: key + 'hL', shadow: false, tex: 0.4 });
  pp(pR(48, -395, 26, 45, 10), PR.char, { key: key + 'hR', shadow: false, tex: 0.4 });
  pp(pE(-25, -352, 8, 8), PR.ink, { key: key + 'e1', shadow: false, tex: false });
  pp(pE(25, -352, 8, 8), PR.ink, { key: key + 'e2', shadow: false, tex: false });
  ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -332, 20, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore();
  ctx.restore();
}

// Background decor
function engRoomLife(wallCol) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(1470, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prBunting(310);
  prClock(190, 420, 60, 9, 15);
  const cols = [PR.red, PR.blue, PR.green, PR.orange, PR.navy];
  ['A', 'B', 'C', 'D'].forEach((ch, i) => {
    const x = [120, 940, 140, 930][i], y = [570, 480, 1340, 1360][i];
    withT(x, y, (i % 2 ? 0.1 : -0.1), 1, () => txt(ch, 0, 0, 44, cols[i], { align: 'center', base: 'middle', weight: 800 }));
  });
}

// =====================================================================
//  SCENE 1 — hook: "Muốn nói chuyện lịch sự bằng tiếng Anh, hãy nhớ ba cụm từ này."
// =====================================================================
SCENES.hook = () => {
  engRoomLife(WALL_BASE);
  prSign('3 TỪ LỊCH SỰ', { kicker: KICK });

  // Friend wanting a book
  paperKid(220, 1470, { key: 'hk_kid', reach: true });

  // Book in center/desk
  withT(360, 1410, 0.05, 1, () => {
    pp(pR(-50, -30, 100, 60, 8), PR.blue, { key: 'hk_bk', sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-42, -24, 84, 48, 6), PR.paperW, { key: 'hk_bkin', shadow: false, tex: 0.3 });
    txt('BOOK', 0, 8, 20, PR.navy, { align: 'center', weight: 800 });
  });

  // Hero card at cx = 540, cy = 780
  withT(540, 780, 0, 1, () => {
    pp(pR(-310, -230, 620, 460, 24), PR.creamL, { key: 'hk_cd', sb: 22, sy: 11, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-290, -210, 580, 420, 18), PR.paperW, { key: 'hk_in', shadow: false, tex: 0.45 });

    txt('3 TỪ LỊCH SỰ', 0, -130, 50, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-220, -85, 440, 6, 3), PR.tan, { key: 'hk_div', shadow: false, tex: 0.3 });

    // 3 polite words preview
    [['1. Please', PR.blue, -40], ['2. Thank you', PR.red, 35], ["3. You're welcome", PR.green, 110]].forEach(([w, c, dy]) => {
      pp(pR(-220, dy - 26, 440, 52, 12), PR.creamL, { key: 'hk_w' + dy, shadow: false, tex: 0.3 });
      txt(w, 0, dy + 10, 30, c, { align: 'center', weight: 800 });
    });
  });

  // Polly on the right with mortar hat
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — please: "Please, dùng khi nhờ hoặc yêu cầu lịch sự."
// =====================================================================
SCENES.please = () => {
  engRoomLife('#bfa77e');
  prSign('KHI NHỜ GIÚP ĐỠ', { kicker: KICK });

  paperKid(230, 1470, { key: 'pl_kid', reach: true });

  // Hero card at cx = 540, cy = 800
  withT(540, 800, -0.015, 1, () => {
    pp(pR(-320, -230, 640, 460, 24), PR.creamL, { key: 'pl_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -210, 600, 420, 18), PR.paperW, { key: 'pl_in', shadow: false, tex: 0.45 });

    txt('Please', 0, -80, 98, PR.blue, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-240, -10, 480, 6, 3), PR.tan, { key: 'pl_div', shadow: false, tex: 0.3 });

    // Meaning tag
    pp(pR(-230, 25, 460, 72, 14), PR.navy, { key: 'pl_tag', sb: 10, sy: 5, tex: 0.5 });
    txt('LÀM ƠN / GIÚP MÌNH NHÉ', 0, 72, 30, PR.creamL, { align: 'center', weight: 800 });

    // Usage note
    txt('Dùng khi nhờ vả hoặc yêu cầu lịch sự', 0, 150, 24, PR.char, { align: 'center', weight: 700 });
  });

  // Speech bubble popping
  prSpeech(370, 560, 260, 86, 260, 680, 'Please!', { t: VW('please', 'please').t0, key: 'sp_pl' });

  // Polly with cap hat
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'happy', key: 'p_please' });
  prChips();
};

// =====================================================================
//  SCENE 3 — thankyou: "Thank you, nghĩa là cảm ơn."
// =====================================================================
SCENES.thankyou = () => {
  engRoomLife(WALL_BASE);
  prSign('LỜI CẢM ƠN', { kicker: KICK });

  // Friend handing the book to Polly
  paperKid(250, 1470, { key: 'ty_kid', wave: true });

  // Hero card at cx = 540, cy = 800
  withT(540, 800, 0.015, 1, () => {
    pp(pR(-320, -230, 640, 460, 24), PR.creamL, { key: 'ty_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-300, -210, 600, 420, 18), PR.paperW, { key: 'ty_in', shadow: false, tex: 0.45 });

    txt('Thank you!', 0, -80, 92, PR.red, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-240, -10, 480, 6, 3), PR.tan, { key: 'ty_div', shadow: false, tex: 0.3 });

    // Meaning banner
    pp(pR(-200, 25, 400, 72, 14), PR.redD, { key: 'ty_tag', sb: 10, sy: 5, tex: 0.5 });
    txt('CẢM ƠN BẠN', 0, 72, 34, PR.creamL, { align: 'center', weight: 800 });

    txt('Nói khi nhận được quà hoặc sự giúp đỡ', 0, 150, 24, PR.char, { align: 'center', weight: 700 });
  });

  // Speech bubble
  prSpeech(740, 560, 260, 86, 830, 680, 'Thank you!', { t: VW('thankyou', 'thank').t0, key: 'sp_ty' });

  // Polly with party hat holding the book
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hold: propBook(0.1), hand: { x: -240, y: -380 }, key: 'p_ty' });
  prChips();
};

// =====================================================================
//  SCENE 4 — welcome: "Khi ai đó cảm ơn mình, có thể đáp: You're welcome!"
// =====================================================================
SCENES.welcome = () => {
  engRoomLife('#86a8ba');
  prSign('CÂU ĐÁP LỊCH SỰ', { kicker: KICK });

  paperKid(250, 1470, { key: 'wc_kid', wave: true });

  // Hero card at cx = 540, cy = 800
  withT(540, 800, -0.01, 1, () => {
    pp(pR(-330, -230, 660, 460, 24), PR.creamL, { key: 'wc_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-310, -210, 620, 420, 18), PR.paperW, { key: 'wc_in', shadow: false, tex: 0.45 });

    txt("You're welcome!", 0, -80, 76, PR.green, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-240, -10, 480, 6, 3), PR.tan, { key: 'wc_div', shadow: false, tex: 0.3 });

    // Meaning banner
    pp(pR(-230, 25, 460, 72, 14), PR.navy, { key: 'wc_tag', sb: 10, sy: 5, tex: 0.5 });
    txt('KHÔNG CÓ CHI / SẴN LÒNG', 0, 72, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('Đáp lại lịch sự khi ai đó cảm ơn mình', 0, 150, 24, PR.char, { align: 'center', weight: 700 });
  });

  // Speech bubble
  prSpeech(380, 560, 280, 86, 260, 680, "You're welcome!", { t: VW('welcome', 'welcome').t0, key: 'sp_wc' });

  // Polly with crown hat
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', key: 'p_wc' });
  prChips();
};

// =====================================================================
//  SCENE 5 — dialogue: "Xem nhé! Một bạn đưa sách cho bạn kia. Thank you! You're welcome!"
// =====================================================================
SCENES.dialogue = () => {
  engRoomLife('#d4c3a3');
  prSign('SƠ ĐỒ HỘI THOẠI', { kicker: KICK });

  // Two friends acting out dialogue
  paperKid(220, 1470, { key: 'dg_k1', wave: true });
  paperKid(460, 1470, { key: 'dg_k2', flip: true, color: PR.blue, colorD: PR.navy });

  // 3 connected cards at 270, 540, 810 (Card width 240, safe margins)
  const isTy = TT >= VW('dialogue', 'thank').t0;
  const isWc = TT >= VW('dialogue', 'welcome').t0;

  // Step 1: Please
  withT(270, 740, 0, 1, () => {
    pp(pR(-120, -150, 240, 300, 16), PR.creamL, { key: 'dg_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-106, -136, 212, 272, 12), PR.paperW, { key: 'dg_i1', shadow: false, tex: 0.4 });
    pp(pR(-80, -110, 160, 36, 8), PR.blue, { key: 'dg_t1', shadow: false, tex: 0.3 });
    txt('BƯỚC 1', 0, -85, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('Please', 0, -20, 38, PR.blue, { align: 'center', weight: 800 });
    txt('Nhờ vả\nlịch sự', 0, 50, 22, PR.char, { align: 'center', weight: 700 });
  });

  // Step 2: Thank you
  withT(540, 740, 0, 1, () => {
    pp(pR(-120, -150, 240, 300, 16), isTy ? PR.creamL : PR.cream, { key: 'dg_c2', sb: isTy ? 20 : 12, sy: 7, tex: 0.5 });
    pp(pR(-106, -136, 212, 272, 12), isTy ? PR.paperW : PR.creamL, { key: 'dg_i2', shadow: false, tex: 0.4 });
    pp(pR(-80, -110, 160, 36, 8), PR.red, { key: 'dg_t2', shadow: false, tex: 0.3 });
    txt('BƯỚC 2', 0, -85, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('Thank you!', 0, -20, 34, PR.red, { align: 'center', weight: 800 });
    txt('Cảm ơn\nchân thành', 0, 50, 22, PR.char, { align: 'center', weight: 700 });
    if (isTy) prCheck(75, -110, VW('dialogue', 'thank').t0);
  });

  // Step 3: You're welcome
  withT(810, 740, 0, 1, () => {
    pp(pR(-120, -150, 240, 300, 16), isWc ? PR.creamL : PR.cream, { key: 'dg_c3', sb: isWc ? 20 : 12, sy: 7, tex: 0.5 });
    pp(pR(-106, -136, 212, 272, 12), isWc ? PR.paperW : PR.creamL, { key: 'dg_i3', shadow: false, tex: 0.4 });
    pp(pR(-80, -110, 160, 36, 8), PR.green, { key: 'dg_t3', shadow: false, tex: 0.3 });
    txt('BƯỚC 3', 0, -85, 20, PR.creamL, { align: 'center', weight: 800 });
    txt("You're\nwelcome!", 0, -30, 26, PR.green, { align: 'center', weight: 800 });
    txt('Đáp lại\nvui vẻ', 0, 50, 22, PR.char, { align: 'center', weight: 700 });
    if (isWc) prCheck(75, -110, VW('dialogue', 'welcome').t0);
  });

  // Polly with wizard hat teaching
  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_dg' });
  prChips();
};

// =====================================================================
//  SCENE 6 — quiz: "Bây giờ đến lượt bạn. Khi nhận được món quà, bạn nói gì?"
// =====================================================================
SCENES.quiz = () => {
  engRoomLife('#c9b28a');
  prSign('THỬ TÀI CỦA BẠN', { kicker: KICK });

  // Gift box on small table
  withT(240, 1400, 0, 1, () => {
    pp(pR(-60, -60, 120, 90, 8), PR.red, { key: 'qz_gift', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-12, -60, 24, 90, 0), PR.yellow, { key: 'qz_grib', shadow: false, tex: 0.3 });
    pp(pR(-60, -20, 120, 20, 0), PR.yellow, { key: 'qz_ghor', shadow: false, tex: 0.3 });
    pp(pE(-16, -75, 20, 14, -0.2), PR.yellow, { key: 'qz_gb1', shadow: false, tex: 0.3 });
    pp(pE(16, -75, 20, 14, 0.2), PR.yellow, { key: 'qz_gb2', shadow: false, tex: 0.3 });
  });

  // Question board at cx = 540, cy = 600
  withT(540, 600, 0, 1, () => {
    pp(pR(-310, -90, 620, 180, 18), PR.creamL, { key: 'qz_qbd', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.6)' });
    pp(pR(-290, -74, 580, 148, 14), PR.paperW, { key: 'qz_qin', shadow: false, tex: 0.4 });
    pp(pR(-180, -60, 360, 40, 8), PR.redD, { key: 'qz_qtag', shadow: false, tex: 0.4 });
    txt('KHI NHẬN ĐƯỢC MÓN QUÀ', 0, -32, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('BẠN SẼ NÓI GÌ?', 0, 30, 34, PR.navy, { align: 'center', weight: 800 });
  });

  // Two options side by side (350 and 730, midpoint 540!)
  withT(350, 870, -0.015, 1, () => {
    pp(pR(-160, -110, 320, 220, 18), PR.creamL, { key: 'opt_a', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -94, 288, 188, 14), PR.paperW, { key: 'opt_ain', shadow: false, tex: 0.4 });
    pp(pR(-120, -80, 60, 42, 8), PR.blue, { key: 'opt_atag', shadow: false, tex: 0.4 });
    txt('A', -90, -50, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Please', 0, 25, 46, PR.blue, { align: 'center', base: 'middle', weight: 800 });
  });

  withT(730, 870, 0.015, 1, () => {
    pp(pR(-160, -110, 320, 220, 18), PR.creamL, { key: 'opt_b', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-144, -94, 288, 188, 14), PR.paperW, { key: 'opt_bin', shadow: false, tex: 0.4 });
    pp(pR(-120, -80, 60, 42, 8), PR.green, { key: 'opt_btag', shadow: false, tex: 0.4 });
    txt('B', -90, -50, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Thank you!', 0, 25, 40, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  // Countdown timer at 540, 1140 (during 3-sec pause from 34.0 to 41.0s)
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

  // Polly with guard hat
  polly(POLLY_X, POLLY_Y, { hat: 'guard', mood: 'neutral', hand: { x: -250, y: -340 }, key: 'p_qz' });
  prChips();
};
function keyTm(s) { return 'tm_' + s; }

// =====================================================================
//  SCENE 7 — answer: "Thank you! Rất tốt!"
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

    txt('Thank you!', 0, -40, 78, PR.red, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-240, 20, 480, 6, 3), '#8fc27e', { key: 'ans_div', shadow: false, tex: 0.3 });
    txt('Luôn nói cảm ơn khi nhận được quà nhé!', 0, 80, 26, PR.navy, { align: 'center', weight: 700 });
  });

  prCheck(760, 680, E0 + 0.1);
  prStamp('CHÍNH XÁC', 540, 960, PR.green, E0 + 0.25, { rot: -0.05, size: 52, from: 1.25 });

  // Polly celebrating with mortar hat
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Hãy thử nói Thank you với một người trong gia đình hôm nay."
// =====================================================================
SCENES.cta = () => {
  engRoomLife(WALL_BASE);
  prSign('BÌNH LUẬN NÀO', { kicker: KICK });

  withT(540, 560, 0, 1, () => {
    pp(pR(-280, -50, 560, 100, 16), PR.creamL, { key: 'cta_cd', sb: 12, sy: 6, tex: 0.5 });
    txt('NÓI "THANK YOU" VỚI NGƯỜI THÂN', 0, 8, 28, PR.navy, { align: 'center', weight: 800 });
  });

  prCommentBox(540, 780, 'THANK YOU', VW('cta', 'nói').t0, { hint: 'Bạn đã nói Thank you chưa?' });

  const R = RNG('cta_stars2');
  for (let i = 0; i < 14; i++) {
    const sx = R.r(120, 960), sy = R.r(360, 1300);
    if (sx > 240 && sx < 840 && sy > 480 && sy < 950) continue;
    prStar(sx, sy, 18, i % 2 ? PR.yellow : PR.mustard);
  }

  // Polly with crown hat celebrating
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hold: propCard('T', -0.06, PR.red), hand: { x: -240, y: -380 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  cues.push({ t: VW('hook', 'ba').t0, k: 'pop' });
  cues.push({ t: VW('please', 'please').t0, k: 'pop' });
  cues.push({ t: VW('thankyou', 'thank').t0, k: 'pop' });
  cues.push({ t: VW('welcome', 'welcome').t0, k: 'pop' });

  const timerStart = VL('quiz').t1 + 0.5;
  cues.push({ t: timerStart + 0.5, k: 'tick' });
  cues.push({ t: timerStart + 1.5, k: 'tick' });
  cues.push({ t: timerStart + 2.5, k: 'tick' });

  cues.push({ t: VL('answer').t0 + 0.1, k: 'chime' });
  cues.push({ t: VL('answer').t0 + 0.25, k: 'thud' });
  cues.push({ t: VW('cta', 'nói').t0, k: 'type', n: 6, d: 0.8 });
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
