// =====================================================================
//  TIDU ENGLISH 05 — "Hình tròn, vuông và tam giác"
//  Mascot: polly() parrot with distinct hats and moods per scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · CÁC HÌNH';
const SCENES = {};
const SHP_COL = { circle: PR.blue, square: PR.red, triangle: PR.yellow };
const SHP_INK = { circle: PR.blue, square: PR.red, triangle: PR.mustard };

// a flat paper shape of size d centred at (x, y); triangles sit on their base
function shpShape(kind, x, y, d, k = 1, key = '') {
  withT(x, y, 0, k, () => {
    const o = { key: 'shp_' + kind + key, sb: 16, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.45)' };
    if (kind === 'circle') pp(pE(0, 0, d / 2, d / 2), SHP_COL.circle, o);
    else if (kind === 'square') pp(pR(-d / 2, -d / 2, d, d, d * 0.05), SHP_COL.square, o);
    else pp(pG([[-d * 0.56, d * 0.46], [d * 0.56, d * 0.46], [0, -d * 0.52]]), SHP_COL.triangle, o);
  });
}

function engRoomLife(wallCol, o = {}) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(1470, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prBunting(310);
  if (o.decor !== false) {
    prNote(125, 500, 84, 100, PR.yellow, -0.07, 'rl_note');
    pp(pE(125, 456, 8, 8), PR.red, { key: 'rl_pin', sb: 4, sy: 2, tex: 0.3 });
    prClock(955, 500, 44, 2, 45);
    prStar(118, 1000, 18, PR.yellow);
    prStar(962, 990, 16, PR.paperW);
  }
}

// a kids' craft desk in the lower band (x 80–660): crayon cup, coloured paper, scissors, a plant
function engDesk() {
  const top = 1200;
  [112, 604].forEach((x, i) => pp(pR(x, top + 30, 26, 1460 - top - 30, 4), PR.woodD, { key: 'dsk_leg' + i, sb: 10, sy: 5, tex: 0.5 }));
  pp(pR(80, top, 580, 36, 8), PR.wood, { key: 'dsk_top', sb: 16, sy: 8, tex: 0.55 });
  pp(pR(100, top + 36, 540, 34, 4), PR.woodD, { key: 'dsk_apron', shadow: false, tex: 0.5 });
  [[PR.red, -0.12], [PR.blue, 0], [PR.green, 0.12]].forEach(([c, r], i) => withT(150 + (i - 1) * 18, top - 80, r, 1, () => {
    pp(pR(-8, -70, 16, 90, 4), c, { key: 'dsk_cr' + i, sb: 4, sy: 2, tex: 0.4 });
    pp(pG([[-8, -70], [8, -70], [0, -90]]), c, { shadow: false, tex: 0.4 });
  }));
  pp(pR(110, top - 96, 80, 96, 10), PR.navy, { key: 'dsk_cup', sb: 10, sy: 5, tex: 0.5 });
  [[PR.paperW, -4], [PR.yellow, 6], [PR.sky, -2]].forEach(([c, dx], i) => pp(pR(240 + dx, top - 14 - i * 12, 180, 12, 3), c, { key: 'dsk_pp' + i, sb: 4, sy: 2, tex: 0.4 }));
  withT(485, top - 26, -0.08, 1, () => {
    pp(pG([[-10, -6], [70, -2], [-10, 4]]), PR.grey, { key: 'dsk_bl1', sb: 4, sy: 2, tex: 0.3 });
    pp(pG([[-10, 2], [66, 8], [-10, 12]]), PR.greyD, { key: 'dsk_bl2', shadow: false, tex: 0.3 });
    [-40, -24].forEach((hx, i) => { pp(pE(hx, i ? 10 : -6, 22, 14), PR.orange, { key: 'dsk_h' + i, sb: 4, sy: 2, tex: 0.4 }); pp(pE(hx, i ? 10 : -6, 11, 6), PR.wood, { shadow: false, tex: false }); });
  });
  [[-0.5, PR.green], [0, PR.greenK], [0.5, PR.green]].forEach(([r, c], i) => pp(pE(590 + r * 40, top - 120 - (i === 1 ? 20 : 0), 18, 54, r), c, { key: 'dsk_lf' + i, sb: 6, sy: 3, tex: 0.5 }));
  pp(pG([[556, top - 74], [624, top - 74], [612, top], [568, top]]), PR.orange, { key: 'dsk_pot', sb: 8, sy: 4, tex: 0.5 });
}

// a big teaching card (x 180–900, y 460–1000): the shape and its Vietnamese name pop on tShape, the English word on tWord
function engTeach(kind, en, vi, tShape, tWord) {
  withT(540, 730, 0, 1, () => {
    pp(pR(-360, -270, 720, 540, 26), PR.creamL, { key: 'tc_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-340, -250, 680, 500, 20), PR.paperW, { key: 'tc_in', shadow: false, tex: 0.45 });
    shpShape(kind, 0, -100, 260, popS(tShape), 'tc');
    withT(0, 120, 0, popS(tWord), () => txt(en, 0, 0, fitSize(en, 600, 104), SHP_INK[kind], { align: 'center', base: 'middle', weight: 800 }));
    withT(0, 210, 0, popS(tShape + 0.1), () => {
      const pw = txtW(vi, 40) + 70;
      pp(pR(-pw / 2, -32, pw, 64, 16), PR.navy, { key: 'tc_tag', sb: 8, sy: 4, tex: 0.4 });
      txt(vi, 0, 2, 40, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
  });
}

// =====================================================================
//  SCENE 1 — hook: "Bạn có biết tên của ba hình này bằng tiếng Anh không?"
// =====================================================================
SCENES.hook = () => {
  engRoomLife('#c9b28a');
  prSign('TÊN TIẾNG ANH LÀ GÌ?', { kicker: KICK });

  ['circle', 'square', 'triangle'].forEach((kind, i) => {
    const x = [230, 540, 850][i], k = 1 + 0.06 * Math.sin(Math.PI * ev(VW('hook', 'ba').t0 + i * 0.18, 0.3));
    withT(x, 740, [-0.02, 0, 0.02][i], k, () => {
      pp(pR(-140, -190, 280, 380, 20), PR.creamL, { key: 'hk_c' + i, sb: 18, sy: 9, tex: 0.55 });
      pp(pR(-126, -176, 252, 352, 16), PR.paperW, { key: 'hk_i' + i, shadow: false, tex: 0.4 });
      shpShape(kind, 0, -50, 170, 1, 'hk');
      txt('?', 0, 135, 84, SHP_INK[kind], { align: 'center', weight: 800 });
    });
  });

  engDesk();
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — circle: "Hình tròn là Circle."
// =====================================================================
SCENES.circle = () => {
  engRoomLife('#86a8ba');
  prSign('HÌNH TRÒN · CIRCLE', { kicker: KICK });
  engTeach('circle', 'CIRCLE', 'HÌNH TRÒN', VW('circle', 'tròn').t0, VW('circle', 'circle').t0);
  engDesk();
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: TT >= VW('circle', 'circle').t0 ? 'happy' : 'neutral', key: 'p_cr' });
  prChips();
};

// =====================================================================
//  SCENE 3 — square_triangle: "Hình vuông là Square." (SPLIT on the second "Hình" -> SCENES.triangle)
// =====================================================================
SCENES.square_triangle = () => {
  engRoomLife('#c79a5b');
  prSign('HÌNH VUÔNG · SQUARE', { kicker: KICK });
  engTeach('square', 'SQUARE', 'HÌNH VUÔNG', VW('square_triangle', 'vuông').t0, VW('square_triangle', 'square').t0);
  engDesk();
  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: TT >= VW('square_triangle', 'square').t0 ? 'happy' : 'neutral', key: 'p_sq' });
  prChips();
};

// =====================================================================
//  SCENE 3b — triangle: "Hình tam giác là Triangle."
// =====================================================================
SCENES.triangle = () => {
  engRoomLife('#6c9e8f');
  prSign('HÌNH TAM GIÁC · TRIANGLE', { kicker: KICK });
  engTeach('triangle', 'TRIANGLE', 'HÌNH TAM GIÁC', VW('square_triangle', 'tam').t0, VW('square_triangle', 'triangle').t0);
  engDesk();
  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: TT >= VW('square_triangle', 'triangle').t0 ? 'happy' : 'neutral', key: 'p_tri' });
  prChips();
};

// =====================================================================
//  SCENE 4 — repeat: "Cùng nói lại nhé: Circle, Square, Triangle!"
// =====================================================================
SCENES.repeat = () => {
  engRoomLife('#d4c3a3');
  prSign('CÙNG NÓI LẠI NHÉ', { kicker: KICK });

  [['circle', 'CIRCLE', 'Hình tròn', VW('repeat', 'circle').t0],
   ['square', 'SQUARE', 'Hình vuông', VW('repeat', 'square').t0],
   ['triangle', 'TRIANGLE', 'Hình tam giác', VW('repeat', 'triangle').t0]].forEach(([kind, en, vi, t], i) => {
    const on = TT >= t, y = 560 + i * 180;
    withT(540, y, 0, 1 + 0.05 * Math.sin(Math.PI * ev(t, 0.3)), () => {
      pp(pR(-360, -80, 720, 160, 18), on ? PR.paperW : PR.cream, { key: 'rp_row' + i, sb: on ? 18 : 10, sy: on ? 9 : 5, tex: 0.5 });
      if (on) pp(pR(-360, -80, 16, 160, 8), SHP_COL[kind], { key: 'rp_bar' + i, shadow: false, tex: 0.4 });
      ctx.save(); ctx.globalAlpha = on ? 1 : 0.55;
      shpShape(kind, -260, kind === 'triangle' ? 6 : 0, 110, 1, 'rp');
      txt(en, -170, 8, 64, SHP_INK[kind], { weight: 800 });
      txt(vi, -170, 54, 34, PR.navy, { weight: 800 });
      ctx.restore();
    });
    prCheck(830, y, t, 46);
  });

  engDesk();
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', key: 'p_rp' });
  prChips();
};

// =====================================================================
//  SCENE 5 — quiz: "Bây giờ ba hình sẽ đổi chỗ. Bạn tìm được hình tam giác không?"
// =====================================================================
const QZ_SLOT = [260, 540, 820], QZ_FROM = { circle: 0, square: 1, triangle: 2 }, QZ_TO = { circle: 1, square: 2, triangle: 0 };
const QZ_LETTER = ['A', 'B', 'C'], QZ_TAG = [PR.blue, PR.green, PR.red];

// three shape cards (260 x 320) standing on a shelf with fixed slot tags A B C; u 0..1 moves them from QZ_FROM to QZ_TO
function engQuizShelf(u, o = {}) {
  pp(pR(110, 880, 860, 30, 6), PR.wood, { key: 'qz_shelf', sb: 14, sy: 7, tex: 0.55 });
  [200, 880].forEach((x, i) => pp(pG([[x - 14, 910], [x + 14, 910], [x, 950]]), PR.woodD, { key: 'qz_br' + i, sb: 6, sy: 3, tex: 0.4 }));
  QZ_LETTER.forEach((L, i) => {
    const hot = o.pick === i ? popS(o.t) : 0;
    ctx.save(); ctx.globalAlpha = o.pick != null && o.pick !== i ? 0.35 : 1;
    withT(QZ_SLOT[i], 1000, 0, 1 + 0.25 * hot, () => {
      pp(pR(-50, -34, 100, 68, 14), QZ_TAG[i], { key: 'qz_tag' + i, sb: 8, sy: 4, tex: 0.4 });
      txt(L, 0, 2, 46, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
    ctx.restore();
  });
  const arc = Math.sin(Math.PI * u);
  ['circle', 'square', 'triangle'].forEach((kind) => {
    const x = lerp(QZ_SLOT[QZ_FROM[kind]], QZ_SLOT[QZ_TO[kind]], u), y = 720 + (kind === 'triangle' ? -240 : 50) * arc;
    ctx.save(); ctx.globalAlpha = o.pick != null && kind !== 'triangle' ? 0.35 : 1;
    withT(x, y, (kind === 'triangle' ? -0.08 : 0.04) * arc, 1, () => {
      if (o.pick != null && kind === 'triangle') pp(pR(-142, -172, 284, 344, 24), PR.yellow, { key: 'qz_glow', shadow: false, tex: 0.3 });
      pp(pR(-130, -160, 260, 320, 18), PR.creamL, { key: 'qz_c' + kind, sb: 16 + 14 * arc, sy: 8 + 10 * arc, tex: 0.5 });
      pp(pR(-116, -146, 232, 292, 14), PR.paperW, { key: 'qz_i' + kind, shadow: false, tex: 0.4 });
      shpShape(kind, 0, kind === 'triangle' ? 10 : 0, 150, 1, 'qz');
    });
    ctx.restore();
  });
}

SCENES.quiz = () => {
  engRoomLife('#bfa77e');
  prSign('ĐỔI CHỖ! TAM GIÁC Ở ĐÂU?', { kicker: KICK });

  engQuizShelf(EZ.io(ev(VW('quiz', 'đổi').t0, 1.0)));

  const t0 = VL('quiz').t1 + 0.4, left = clamp(1 - (TT - t0) / 3), n = 3 - Math.floor(TT - t0), r = 105;
  withT(540, 1215, 0, popS(t0 - 0.25), () => {
    pp(pR(-r * 0.2, -r - 26, r * 0.4, 38, 6), PR.char, { key: 'tm_kn', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(0, 0, r, r), PR.red, { key: 'tm_o', sb: 14, sy: 7, tex: 0.55, rim: 'rgba(255,220,210,0.35)' });
    pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key: 'tm_f', shadow: false, tex: 0.45 });
    if (left > 0) pp(() => { ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.76, -Math.PI / 2, -Math.PI / 2 + TAU * left); ctx.closePath(); }, PR.mustard, { key: 'tm_w', shadow: false, tex: 0.45 });
    pp(pE(0, 0, r * 0.46, r * 0.46), PR.paperW, { key: 'tm_c', sb: 6, sy: 3, tex: 0.4 });
    if (TT >= t0 && n >= 1) withT(0, 0, 0, 1 + 0.25 * (1 - ev(t0 + 3 - n, 0.2)), () => txt(String(n), 0, 2, 64, PR.navy, { align: 'center', base: 'middle', weight: 800 }));
  });

  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'neutral', look: -10, key: 'p_qz' });
  prChips();
};

// =====================================================================
//  SCENE 6 — answer: "Đây rồi! Triangle!"
// =====================================================================
SCENES.answer = () => {
  engRoomLife('#c9b28a');
  prSign('ĐÁP ÁN A', { kicker: KICK });

  engQuizShelf(1, { pick: 0, t: VW('answer', 'triangle').t0 });
  prCheck(372, 584, VW('answer', 'triangle').t0, 46);
  prStamp('ĐÂY RỒI!', 540, 470, PR.green, VW('answer', 'đây').t0, { rot: -0.05, size: 52, from: 1.3 });

  withT(540, 1130, -0.015, popS(VW('answer', 'triangle').t0), () => {
    pp(pR(-310, -90, 620, 180, 22), PR.navy, { key: 'ans_bn', sb: 18, sy: 9, tex: 0.5 });
    txt('TRIANGLE!', 0, -18, 84, PR.yellow, { align: 'center', base: 'middle', weight: 800 });
    txt('HÌNH TAM GIÁC', 0, 52, 38, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 7 — house: "Chúng ta còn có thể ghép hình vuông và tam giác thành một ngôi nhà nhỏ nữa đấy!"
// =====================================================================
SCENES.house = () => {
  engRoomLife('#86a8ba');
  prSign('GHÉP THÀNH NGÔI NHÀ', { kicker: KICK });

  const u = EZ.io(ev(VW('house', 'ghép').t0, 1.1)), tHome = VW('house', 'nhà').t0;
  const kSq = 1 + 0.08 * Math.sin(Math.PI * ev(VW('house', 'vuông').t0, 0.3));
  const kTr = 1 + 0.08 * Math.sin(Math.PI * ev(VW('house', 'tam').t0, 0.3));
  withT(540, 730, 0, 1, () => {
    pp(pR(-360, -270, 720, 540, 26), PR.creamL, { key: 'hs_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-340, -250, 680, 500, 20), PR.paperW, { key: 'hs_in', shadow: false, tex: 0.45 });
  });
  const sx = lerp(350, 540, u), sy = lerp(820, 790, u);
  withT(sx, sy, 0, kSq, () => {
    pp(pR(-110, -110, 220, 220, 10), PR.red, { key: 'hs_bd', sb: 14, sy: 7, tex: 0.55, rim: 'rgba(255,255,255,0.45)' });
    withT(0, 50, 0, popS(tHome), () => { pp(pR(-30, -60, 60, 120, 6), PR.wood, { key: 'hs_dr', sb: 6, sy: 3, tex: 0.4 }); pp(pE(16, 0, 6, 6), PR.yellow, { shadow: false, tex: false }); });
  });
  const tx = lerp(720, 540, u), ty = lerp(900, 680, u) - 120 * Math.sin(Math.PI * u);
  withT(tx, ty, 0, kTr, () => {
    pp(pG([[-150, 0], [150, 0], [0, -180]]), PR.yellow, { key: 'hs_rf', sb: 14, sy: 7, tex: 0.55, rim: 'rgba(255,255,255,0.45)' });
    withT(0, -66, 0, popS(tHome + 0.12), () => pp(pE(0, 0, 30, 30), PR.blue, { key: 'hs_wnd', sb: 6, sy: 3, tex: 0.4 }));
  });
  withT(540, 950, 0, popS(VW('house', 'nhỏ').t0), () => {
    pp(pR(-200, -32, 400, 64, 16), PR.navy, { key: 'hs_tag', sb: 8, sy: 4, tex: 0.4 });
    txt('NGÔI NHÀ NHỎ', 0, 2, 40, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  engDesk();
  polly(POLLY_X, POLLY_Y, { hat: 'guard', mood: TT >= tHome ? 'happy' : 'wow', key: 'p_hs' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Bạn nhìn thấy hình circle ở đâu trong nhà?"
// =====================================================================
const CTA_RINGS = [[300, 640, 168], [770, 630, 146], [220, 1040, 112], [430, 1145, 46], [550, 1145, 46]];

SCENES.cta = () => {
  engRoomLife('#a9b98c', { decor: false });
  prSign('CIRCLE Ở ĐÂU TRONG NHÀ?', { kicker: KICK });
  prStar(110, 920, 18, PR.yellow);
  prStar(960, 900, 16, PR.paperW);

  prClock(300, 640, 150, 10, 10, 'cta_clk');
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((h) => { const a = h / 12 * TAU; pp(pE(300 + Math.cos(a) * 108, 640 + Math.sin(a) * 108, 7, 7), PR.ink, { shadow: false, tex: false }); });
  pp(pE(300, 640, 12, 12), PR.red, { shadow: false, tex: false });

  pp(pE(770, 488, 8, 8), PR.greyD, { key: 'cta_nail', sb: 3, sy: 2, tex: false });
  pp(pE(770, 630, 130, 130), PR.woodL, { key: 'cta_mf', sb: 18, sy: 9, tex: 0.55 });
  pp(pE(770, 630, 108, 108), '#cfe6ef', { key: 'cta_mg', shadow: false, tex: 0.3 });
  pp(pE(735, 590, 14, 52, 0.6), 'rgba(255,255,255,0.7)', { shadow: false, tex: false });

  [126, 606].forEach((x, i) => pp(pR(x, 1220, 26, 240, 4), PR.woodD, { key: 'cta_leg' + i, sb: 10, sy: 5, tex: 0.5 }));
  pp(pR(90, 1190, 570, 36, 8), PR.wood, { key: 'cta_top', sb: 16, sy: 8, tex: 0.55 });
  pp(pG([[180, 1190], [260, 1190], [240, 1150], [200, 1150]]), PR.woodD, { key: 'cta_stand', sb: 6, sy: 3, tex: 0.4 });
  pp(pE(220, 1040, 100, 100), PR.paperW, { key: 'cta_pl', sb: 14, sy: 7, tex: 0.4 });
  pp(pE(220, 1040, 70, 70), PR.creamL, { key: 'cta_pli', shadow: false, tex: 0.4 });
  ctx.save(); ctx.strokeStyle = PR.blue; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(220, 1040, 86, 0, TAU); ctx.stroke(); ctx.restore();

  pp(pR(400, 1050, 120, 60, 16), PR.red, { key: 'cta_cab', sb: 10, sy: 5, tex: 0.5 });
  pp(pR(416, 1062, 40, 36, 6), '#cfe6ef', { shadow: false, tex: 0.3 });
  pp(pR(466, 1062, 40, 36, 6), '#cfe6ef', { shadow: false, tex: 0.3 });
  pp(pR(370, 1094, 220, 56, 18), PR.red, { key: 'cta_car', sb: 12, sy: 6, tex: 0.5 });
  [430, 550].forEach((x, i) => { pp(pE(x, 1145, 34, 34), PR.ink, { key: 'cta_wh' + i, sb: 6, sy: 3, tex: 0.4 }); pp(pE(x, 1145, 13, 13), PR.grey, { shadow: false, tex: 0.3 }); });

  CTA_RINGS.forEach(([x, y, r], i) => {
    const t = VW('cta', 'circle').t0 + i * 0.22, f = ev(t, 0.4); if (f <= 0) return;
    ctx.save(); ctx.strokeStyle = PR.yellow; ctx.lineWidth = r > 60 ? 12 : 8; ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(12,10,8,0.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
    ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + TAU * f); ctx.stroke(); ctx.restore();
  });

  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: TT >= VW('cta', 'circle').t0 ? 'wow' : 'happy', hand: { x: -250, y: -330 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  [['circle', 'tròn'], ['circle', 'circle'], ['square_triangle', 'vuông'], ['square_triangle', 'square'], ['square_triangle', 'tam'], ['square_triangle', 'triangle'],
   ['repeat', 'circle'], ['repeat', 'square'], ['repeat', 'triangle']].forEach(([id, w]) => cues.push({ t: VW(id, w).t0, k: 'pop' }));

  cues.push({ t: VW('quiz', 'đổi').t0, k: 'pop' });
  cues.push({ t: VW('quiz', 'đổi').t0 + 1.0, k: 'thud' });
  const t0 = VL('quiz').t1 + 0.4;
  [0, 1, 2].forEach((i) => cues.push({ t: t0 + i, k: 'tick' }));

  cues.push({ t: VW('answer', 'đây').t0, k: 'thud' });
  cues.push({ t: VW('answer', 'triangle').t0, k: 'chime' });

  cues.push({ t: VW('house', 'ghép').t0, k: 'pop' });
  cues.push({ t: VW('house', 'ghép').t0 + 1.1, k: 'thud' });
  cues.push({ t: VW('house', 'nhỏ').t0, k: 'chime' });

  CTA_RINGS.forEach((_, i) => cues.push({ t: VW('cta', 'circle').t0 + i * 0.22, k: 'pop' }));
  return cues;
}

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [['square_triangle', 'hình', 1, 'triangle']];
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
