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
const FLOOR_Y = 1470;

// Props
const e4StarPath = (r) => pG(Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.47 : r; return [Math.cos(a) * rr, Math.sin(a) * rr]; }));
function e4Star(x, y, r, s = 1, key = 'st') {
  withT(x, y, 0, s, () => {
    pp(e4StarPath(r), PR.yellow, { key, sb: Math.max(6, r * 0.3), sy: Math.max(3, r * 0.14), tex: 0.45, rim: 'rgba(255,250,220,0.6)', rw: 2 });
    pp(pE(-r * 0.2, -r * 0.22, r * 0.14, r * 0.1, -0.5), 'rgba(255,255,255,0.7)', { shadow: false, tex: false });
  });
}

// gift box standing on (x, y) (bottom centre); o.open 0..1 lifts and tilts the lid, o.peek = [[dx, rise, r]] stars showing above the rim
function e4Box(x, y, s = 1, o = {}) {
  const open = o.open ?? 0;
  withT(x, y, o.rot ?? 0, s, () => {
    if (open > 0.01) pp(pR(-114, -162, 228, 22, 6), '#7a2620', { key: 'bx_in', shadow: false, tex: 0.4 });
    (o.peek ?? []).forEach(([dx, rise, r], i) => e4Star(dx, -150 - rise * open, r, 1, 'bx_pk' + i));
    pp(pR(-120, -150, 240, 150, 14), PR.red, { key: 'bx_bd', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-20, -150, 40, 150, 0), PR.yellow, { key: 'bx_rv', shadow: false, tex: 0.3 });
    pp(pR(-120, -96, 240, 30, 0), PR.yellow, { key: 'bx_rh', shadow: false, tex: 0.3 });
    withT(0, -158 - 46 * open, -0.16 * open, 1, () => {
      pp(pR(-130, -18, 260, 36, 10), PR.redD, { key: 'bx_lid', sb: 12, sy: 6, tex: 0.5 });
      pp(pR(-20, -18, 40, 36, 0), PR.mustard, { key: 'bx_lr', shadow: false, tex: 0.3 });
      pp(pE(-30, -30, 32, 21, -0.3), PR.yellow, { key: 'bx_b1', sb: 6, sy: 3, tex: 0.4 });
      pp(pE(30, -30, 32, 21, 0.3), PR.yellow, { key: 'bx_b2', sb: 6, sy: 3, tex: 0.4 });
      pp(pE(0, -22, 16, 16), PR.mustard, { key: 'bx_bc', shadow: false, tex: 0.4 });
    });
  });
}

function e4Table(x0, x1, top, key = 'tb') {
  const w = x1 - x0;
  [x0 + 34, x1 - 64].forEach((lx, i) => pp(pR(lx, top + 20, 30, FLOOR_Y + 8 - top - 20, 6), PR.woodD, { key: key + 'lg' + i, sb: 10, sy: 5, tex: 0.5 }));
  pp(pR(x0 + 16, top + 26, w - 32, 40, 6), PR.wood, { key: key + 'ap', sb: 10, sy: 6, tex: 0.5 });
  pp(pR(x0, top, w, 34, 10), PR.woodL, { key: key + 'tp', sb: 16, sy: 8, tex: 0.55, rim: 'rgba(255,240,210,0.3)' });
}

function e4Plant(x, y, s = 1, key = 'pl') {
  withT(x, y, 0, s, () => {
    [[-34, -150, -0.5], [34, -150, 0.5], [0, -175, 0], [-56, -105, -0.95], [56, -105, 0.95]].forEach(([lx, ly, r], i) =>
      pp(pE(lx, ly, 22, 58, r), i % 2 ? PR.green : '#3f8a4c', { key: key + 'lf' + i, sb: 8, sy: 4, tex: 0.5 }));
    pp(pG([[-62, -78], [62, -78], [48, 0], [-48, 0]]), PR.orange, { key: key + 'pot', sb: 12, sy: 6, tex: 0.55 });
    pp(pR(-70, -92, 140, 24, 6), '#c4653e', { key: key + 'rim', sb: 6, sy: 3, tex: 0.5 });
  });
}

function e4Drawing(x, y, rot, kind, key = 'dr') {
  withT(x, y, rot, 1, () => {
    pp(pR(-62, -52, 124, 104, 4), PR.paperW, { key: key + 'pg', sb: 10, sy: 5, tex: 0.45 });
    if (kind === 'sun') {
      pp(pE(0, 2, 24, 24), PR.yellow, { key: key + 'sun', shadow: false, tex: 0.4 });
      ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 5; ctx.lineCap = 'round';
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 32, 2 + Math.sin(a) * 32); ctx.lineTo(Math.cos(a) * 42, 2 + Math.sin(a) * 42); ctx.stroke(); }
      ctx.restore();
    } else if (kind === 'house') {
      pp(pR(-30, -2, 60, 42, 2), PR.blue, { key: key + 'hs', shadow: false, tex: 0.4 });
      pp(pG([[-40, 0], [0, -34], [40, 0]]), PR.red, { key: key + 'rf', shadow: false, tex: 0.4 });
      pp(pR(-8, 16, 16, 24, 2), PR.mustard, { shadow: false, tex: false });
    } else {
      pp(pR(-3, -2, 6, 44, 2), PR.green, { shadow: false, tex: false });
      [0, 1, 2, 3, 4].forEach((i) => { const a = i * TAU / 5; pp(pE(Math.cos(a) * 16, -14 + Math.sin(a) * 16, 12, 12), PR.pink, { shadow: false, tex: 0.3 }); });
      pp(pE(0, -14, 10, 10), PR.mustard, { shadow: false, tex: false });
    }
    pp(pE(0, -44, 8, 8), PR.red, { key: key + 'pin', sb: 4, sy: 2, tex: 0.3 });
  });
}

function e4Window(x, y, w, h, key = 'wn') {
  pp(pR(x - w / 2 - 14, y - h / 2 - 14, w + 28, h + 28, 8), PR.woodL, { key: key + 'fr', sb: 14, sy: 7, tex: 0.5 });
  pp(pR(x - w / 2, y - h / 2, w, h, 4), PR.sky, { key: key + 'gl', shadow: false, tex: 0.5 });
  pp(pE(x - w * 0.12, y - h * 0.12, w * 0.2, h * 0.11), PR.paperW, { key: key + 'cl1', shadow: false, tex: 0.3 });
  pp(pE(x + w * 0.06, y - h * 0.16, w * 0.16, h * 0.12), PR.paperW, { key: key + 'cl2', shadow: false, tex: 0.3 });
  pp(pR(x - 5, y - h / 2, 10, h, 2), PR.woodL, { key: key + 'mv', shadow: false, tex: 0.4 });
  pp(pR(x - w / 2, y - 5, w, 10, 2), PR.woodL, { key: key + 'mh', shadow: false, tex: 0.4 });
}

function e4Shelf(x0, x1, top, key = 'sh') {
  const w = x1 - x0, h = FLOOR_Y - top, cols = [PR.red, PR.blue, PR.mustard, PR.green, PR.orange, PR.navy, PR.pink];
  pp(pR(x0, top, w, h + 6, 8), PR.wood, { key: key + 'bd', sb: 16, sy: 8, tex: 0.55 });
  [0, 1].forEach((r) => {
    const y0 = top + 20 + r * (h / 2), sh = h / 2 - 34;
    pp(pR(x0 + 18, y0, w - 36, sh, 4), PR.woodD, { key: key + 'in' + r, shadow: false, tex: 0.5 });
    const R = RNG(key, r); let bx = x0 + 30;
    while (bx < x1 - 70) {
      const bw = R.r(24, 40), bh = sh * R.r(0.62, 0.9);
      pp(pR(bx, y0 + sh - bh, bw, bh, 3), cols[R.i(0, cols.length - 1)], { key: key + 'bk' + r + Math.round(bx), sb: 4, sy: 2, tex: 0.45 });
      bx += bw + R.r(3, 8);
    }
  });
}

function engRoomLife(wallCol) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(FLOOR_Y, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, FLOOR_Y - 14, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prBunting(310);
}

const e4Bump = (t) => 1 + 0.07 * Math.sin(Math.PI * ev(t, 0.35));

// =====================================================================
//  SCENE 1 — hook: "Có bao nhiêu ngôi sao trong chiếc hộp này? Cùng đếm bằng tiếng Anh nhé!"
// =====================================================================
SCENES.hook = () => {
  engRoomLife(WALL_BASE);
  prSign('CÙNG ĐẾM BẰNG TIẾNG ANH', { kicker: KICK });
  e4Drawing(150, 520, -0.08, 'sun', 'hk_d1');
  e4Drawing(930, 520, 0.07, 'house', 'hk_d2');

  e4Table(110, 970, 1250, 'hk_tb');
  const jig = Math.sin(TT * 7) * 0.5 + 0.5;
  e4Box(540, 1252, 2.9, { open: 0.75 + 0.25 * jig, rot: Math.sin(TT * 9) * 0.012, peek: [[-62, 26, 34], [8, 40, 38], [74, 22, 32]] });

  withT(540, 1080, -0.035, 1, () => {
    pp(pR(-290, -92, 580, 184, 22), PR.creamL, { key: 'hk_tag', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.6)' });
    pp(pE(-250, 0, 13, 13), PR.redD, { key: 'hk_hole', shadow: false, tex: 0.3 });
    txt('CÓ BAO NHIÊU', 16, -12, 54, PR.navy, { align: 'center', weight: 800 });
    txt('NGÔI SAO?', 16, 56, 54, PR.redD, { align: 'center', weight: 800 });
  });

  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: TT >= VW('hook', 'cùng').t0 ? 'happy' : 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — one: "One! Một."
// =====================================================================
SCENES.one = () => {
  engRoomLife('#bfa77e');
  prSign('SỐ 1 LÀ ONE', { kicker: KICK });

  const tOne = VW('one', 'one').t0, tMot = VW('one', 'một').t0;
  withT(540, 760, -0.012, e4Bump(tOne), () => {
    pp(pR(-390, -290, 780, 580, 26), PR.creamL, { key: 'on_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-366, -266, 732, 532, 18), PR.paperW, { key: 'on_in', shadow: false, tex: 0.45 });
    e4Star(0, -140, 110, popS(tOne), 'on_st');
    withT(0, 60, 0, popS(tOne + 0.05), () => txt('ONE', 0, 0, 150, PR.red, { align: 'center', base: 'middle', weight: 800 }));
    withT(0, 200, 0, popS(tMot), () => {
      pp(pR(-130, -44, 260, 88, 22), PR.redD, { key: 'on_tag', sb: 8, sy: 4, tex: 0.4 });
      txt('MỘT', 0, 2, 58, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  e4Drawing(470, 1150, 0.06, 'flower', 'on_d1');
  e4Table(110, 700, 1260, 'on_tb');
  e4Box(260, 1262, 1, { open: 1 });
  e4Plant(600, 1262, 0.8, 'on_pl');

  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hold: propCard('1', -0.08, PR.red), hand: { x: -240, y: -380 }, key: 'p_on' });
  prChips();
};

// =====================================================================
//  SCENE 3 / 4 — two_three: "Two! Hai. Three! Ba."  four_five: "Four! Bốn. Five! Năm."
// =====================================================================
const E4_STARS = {
  2: [[-80, -170, 62], [80, -170, 62]],
  3: [[0, -210, 54], [-88, -120, 54], [88, -120, 54]],
  4: [[-72, -210, 50], [72, -210, 50], [-72, -110, 50], [72, -110, 50]],
  5: [[-96, -216, 44], [96, -216, 44], [0, -160, 44], [-96, -104, 44], [96, -104, 44]],
};
function e4NumCard(x, n, word, vi, col, tWord, tVi, rot) {
  withT(x, 760, rot, e4Bump(tWord), () => {
    pp(pR(-200, -290, 400, 580, 22), PR.creamL, { key: 'nc_cd' + n, sb: 20, sy: 10, tex: 0.55, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-182, -272, 364, 544, 16), PR.paperW, { key: 'nc_in' + n, shadow: false, tex: 0.45 });
    E4_STARS[n].forEach(([sx, sy, r], i) => e4Star(sx, sy, r, popS(tWord + i * 0.06), 'nc_st' + n + i));
    withT(0, 60, 0, popS(tWord), () => txt(word, 0, 0, fitSize(word, 330, 104), col, { align: 'center', base: 'middle', weight: 800 }));
    withT(0, 190, 0, popS(tVi), () => {
      pp(pR(-110, -42, 220, 84, 20), col, { key: 'nc_tag' + n, sb: 8, sy: 4, tex: 0.4 });
      txt(vi, 0, 2, 54, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
  });
}

SCENES.two_three = () => {
  engRoomLife('#86a8ba');
  prSign('SỐ 2 VÀ SỐ 3', { kicker: KICK });
  e4NumCard(330, 2, 'TWO', 'HAI', PR.blue, VW('two_three', 'two').t0, VW('two_three', 'hai').t0, -0.015);
  e4NumCard(750, 3, 'THREE', 'BA', PR.green, VW('two_three', 'three').t0, VW('two_three', 'ba').t0, 0.015);

  e4Shelf(110, 660, 1190, 'tw_sh');
  e4Plant(560, 1190, 0.55, 'tw_pl');
  prClock(720, 1160, 44, 3, 50, 'tw_clk');

  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', key: 'p_tw3' });
  prChips();
};

SCENES.four_five = () => {
  engRoomLife(WALL_BASE);
  prSign('SỐ 4 VÀ SỐ 5', { kicker: KICK });
  e4NumCard(330, 4, 'FOUR', 'BỐN', PR.orange, VW('four_five', 'four').t0, VW('four_five', 'bốn').t0, -0.015);
  e4NumCard(750, 5, 'FIVE', 'NĂM', PR.purple, VW('four_five', 'five').t0, VW('four_five', 'năm').t0, 0.015);

  e4Drawing(450, 1150, -0.05, 'house', 'ff_d1');
  e4Table(110, 700, 1260, 'ff_tb');
  e4Box(250, 1262, 0.95, { open: 0 });
  e4Plant(610, 1262, 0.75, 'ff_pl');

  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'happy', key: 'p_45' });
  prChips();
};

// =====================================================================
//  SCENE 5 — quiz: "Bây giờ mình giấu đi một ngôi sao. Còn bao nhiêu ngôi sao nào?"
// =====================================================================
SCENES.quiz = () => {
  engRoomLife('#d4c3a3');
  prSign('GIẤU ĐI MỘT NGÔI SAO', { kicker: KICK });

  const tHide = VW('quiz', 'giấu').t0, tAsk = VW('quiz', 'còn').t0, tOpt = VW('quiz', 'nhiêu').t0;
  const BOX_X = 390, BOX_Y = 950, TIMER_X = 690;

  withT(540, 560, 0, 1, () => {
    pp(pR(-420, -110, 840, 220, 24), PR.creamL, { key: 'qz_cd', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-402, -92, 804, 184, 16), PR.paperW, { key: 'qz_in', shadow: false, tex: 0.45 });
  });
  const from = [240, 390, 540, 690, 840], to = [315, 465, 615, 765];
  [0, 2, 3, 4].forEach((k, j) => e4Star(springMove(tHide + 0.75, from[k], to[j], SPRING.playful), 560, 60, 1, 'qz_st' + k));
  const fall = EZ.i2(ev(tHide + 0.15, 0.45));
  if (fall < 1) e4Star(lerp(from[1], BOX_X, fall), lerp(560, BOX_Y - 90, fall), 60, 1 - 0.3 * fall, 'qz_st1');
  const lid = ev(tHide - 0.05, 0.2) * (1 - ev(tHide + 0.65, 0.2));
  e4Box(BOX_X, BOX_Y, 1.2, { open: lid, rot: lid > 0 ? 0 : Math.sin(Math.PI * ev(tHide + 0.65, 0.3)) * 0.05 });

  const s = VL('quiz').t1 + 0.4, tmK = popS(s - 0.25) * (1 - ev(s + 3, 0.3));
  if (tmK > 0.01) {
    const left = clamp(1 - (TT - s) / 3), n = 3 - Math.floor(TT - s), r = 82;
    withT(TIMER_X, 830, 0, tmK, () => {
      pp(pR(-14, -r - 26, 28, 30, 6), PR.char, { key: 'tm_kn', sb: 6, sy: 3, tex: 0.4 });
      pp(pE(0, 0, r, r), PR.red, { key: 'tm_o', sb: 14, sy: 7, tex: 0.55, rim: 'rgba(255,220,210,0.35)' });
      pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key: 'tm_f', shadow: false, tex: 0.45 });
      if (left > 0) pp(() => { ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.76, -Math.PI / 2, -Math.PI / 2 + TAU * left); ctx.closePath(); }, PR.mustard, { key: 'tm_w', shadow: false, tex: 0.45 });
      pp(pE(0, 0, r * 0.5, r * 0.5), PR.paperW, { key: 'tm_c', sb: 6, sy: 3, tex: 0.4 });
      if (TT >= s && n >= 1 && n <= 3) withT(0, 0, 0, 1 + 0.25 * (1 - ev(s + (3 - n), 0.2)), () => txt(String(n), 0, 3, 60, PR.navy, { align: 'center', base: 'middle', weight: 800 }));
    });
  }

  withT(540, 1030, 0, popS(tAsk), () => {
    pp(pR(-420, -50, 840, 100, 18), PR.navy, { key: 'qz_qbd', sb: 12, sy: 6, tex: 0.5 });
    txt('CÒN BAO NHIÊU NGÔI SAO?', 0, 2, 46, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  [[350, 'A', 'Three', PR.blue, -0.015], [730, 'B', 'Four', PR.green, 0.015]].forEach(([x, L, word, col, rot], i) => {
    withT(x, 1180, rot, popS(tOpt + i * 0.2), () => {
      pp(pR(-170, -75, 340, 150, 20), PR.creamL, { key: 'opt' + L, sb: 16, sy: 8, tex: 0.5 });
      pp(pR(-156, -61, 312, 122, 14), PR.paperW, { key: 'opt_in' + L, shadow: false, tex: 0.4 });
      pp(pE(-108, 0, 36, 36), col, { key: 'opt_tag' + L, sb: 6, sy: 3, tex: 0.4 });
      txt(L, -108, 2, 40, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt(word, 38, 2, 60, col, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: TT >= tHide && TT < tAsk ? 'wow' : 'neutral', look: -8, key: 'p_qz' });
  prChips();
};

// =====================================================================
//  SCENE 6 — answer: "Four! Bốn ngôi sao! Tuyệt vời!"
// =====================================================================
SCENES.answer = () => {
  engRoomLife(WALL_BASE);
  prSign('CÒN BỐN NGÔI SAO', { kicker: KICK });

  const tFour = VW('answer', 'four').t0, tBon = VW('answer', 'bốn').t0, tWow = VW('answer', 'tuyệt').t0;
  withT(540, 760, 0, e4Bump(tFour), () => {
    pp(pR(-390, -300, 780, 600, 26), PR.creamL, { key: 'ans_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-366, -276, 732, 552, 18), '#eaf5ee', { key: 'ans_in', shadow: false, tex: 0.45 });
    [-195, -65, 65, 195].forEach((sx, i) => e4Star(sx, -170, 54, 1, 'ans_st' + i));
    withT(0, 10, 0, popS(tFour), () => txt('FOUR!', 0, 0, 150, PR.orange, { align: 'center', base: 'middle', weight: 800 }));
    withT(0, 160, 0, popS(tBon), () => txt('BỐN NGÔI SAO!', 0, 0, 58, PR.navy, { align: 'center', base: 'middle', weight: 800 }));
  });
  withT(180, 470, -0.1, 1, () => {
    pp(pE(0, 0, 50, 50), PR.green, { key: 'ans_b', sb: 10, sy: 5, tex: 0.45 });
    txt('B', 0, 3, 56, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
  prCheck(900, 480, tFour);
  prStamp('TUYỆT VỜI', 660, 1060, PR.green, tWow, { rot: -0.06, size: 60, from: 1.25 });

  e4Table(110, 700, 1270, 'an_tb');
  e4Box(250, 1272, 0.95, { open: 0 });
  e4Plant(600, 1272, 0.6, 'an_pl');

  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 7 — countall: "Hãy đếm lại thật to cùng mình: One, two, three, four, five!"
// =====================================================================
SCENES.countall = () => {
  engRoomLife('#bfa77e');
  prSign('ĐẾM LẠI THẬT TO', { kicker: KICK });

  const nums = [['One', 'one', PR.red], ['Two', 'two', PR.blue], ['Three', 'three', PR.green], ['Four', 'four', PR.orange], ['Five', 'five', PR.purple]];
  nums.forEach(([word, w, col], i) => {
    const t0 = VW('countall', w).t0, lit = TT >= t0, x = 188 + i * 176;
    withT(x, 750, 0, e4Bump(t0), () => {
      pp(pR(-80, -280, 160, 560, 18), lit ? PR.yellow : PR.cream, { key: 'ca_c' + i, sb: lit ? 20 : 10, sy: lit ? 10 : 5, tex: 0.5 });
      pp(pR(-68, -268, 136, 536, 12), lit ? PR.paperW : PR.creamL, { key: 'ca_in' + i, shadow: false, tex: 0.4 });
      ctx.save(); ctx.globalAlpha = lit ? 1 : 0.4;
      txt(String(i + 1), 0, -190, 100, col, { align: 'center', base: 'middle', weight: 800 });
      for (let k = 0; k <= i; k++) e4Star(0, 4 + (k - i / 2) * 54, 25, 1, 'ca_s' + i + k);
      txt(word, 0, 212, fitSize(word, 128, 40), col, { align: 'center', base: 'middle', weight: 800 });
      ctx.restore();
    });
  });

  e4Shelf(110, 560, 1180, 'ca_sh');
  e4Plant(470, 1180, 0.55, 'ca_pl');
  prClock(660, 1160, 46, 10, 10, 'ca_clk');

  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_ca' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Hãy thử đếm năm đồ vật trên bàn bằng tiếng Anh."
// =====================================================================
function e4Apple(x, y) {
  pp(pR(x - 4, y - 140, 8, 26, 3), PR.brown, { key: 'ap_st', shadow: false, tex: 0.4 });
  pp(pE(x + 18, y - 132, 20, 10, -0.5), PR.green, { key: 'ap_lf', sb: 4, sy: 2, tex: 0.4 });
  pp(pE(x, y - 62, 66, 62), PR.red, { key: 'ap_bd', sb: 14, sy: 7, tex: 0.55 });
  pp(pE(x - 24, y - 84, 14, 9, -0.6), 'rgba(255,255,255,0.45)', { shadow: false, tex: false });
}
function e4Pencil(x, y) {
  withT(x, y, 0, 1, () => {
    pp(pR(-26, -60, 52, 60, 6), PR.blue, { key: 'pc_cup', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-12, -210, 24, 170, 3), PR.yellow, { key: 'pc_bd', sb: 6, sy: 3, tex: 0.45 });
    pp(pG([[-12, -210], [12, -210], [0, -244]]), PR.tan, { key: 'pc_tp', shadow: false, tex: 0.4 });
    pp(pG([[-4, -232], [4, -232], [0, -244]]), PR.char, { shadow: false, tex: false });
  });
}
function e4Cup(x, y) {
  ctx.save(); ctx.strokeStyle = PR.orange; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(x + 54, y - 64, 30, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.restore();
  pp(pR(x - 56, y - 120, 112, 120, 16), PR.orange, { key: 'cu_bd', sb: 12, sy: 6, tex: 0.55 });
  pp(pR(x - 48, y - 116, 96, 14, 6), '#7a4a2a', { key: 'cu_in', shadow: false, tex: 0.4 });
}
function e4Book(x, y) {
  pp(pR(x - 64, y - 46, 128, 46, 6), PR.paperW, { key: 'bk_pg', sb: 8, sy: 4, tex: 0.4 });
  pp(pR(x - 70, y - 54, 140, 18, 5), PR.green, { key: 'bk_c1', shadow: false, tex: 0.5 });
  pp(pR(x - 70, y - 12, 140, 14, 5), PR.green, { key: 'bk_c2', shadow: false, tex: 0.5 });
  pp(pR(x - 60, y - 104, 120, 50, 6), PR.red, { key: 'bk_b2', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(x - 52, y - 96, 104, 8, 3), PR.creamL, { shadow: false, tex: false });
}
function e4Bag(x, y) {
  pp(pR(x - 70, y - 236, 40, 90, 18), PR.navy, { key: 'bg_s1', shadow: false, tex: 0.4 });
  pp(pR(x + 30, y - 236, 40, 90, 18), PR.navy, { key: 'bg_s2', shadow: false, tex: 0.4 });
  pp(pR(x - 100, y - 200, 200, 200, 44), PR.blue, { key: 'bg_bd', sb: 14, sy: 7, tex: 0.55 });
  pp(pR(x - 70, y - 96, 140, 80, 18), PR.mustard, { key: 'bg_pk', sb: 6, sy: 3, tex: 0.5 });
  pp(pR(x - 50, y - 78, 100, 10, 4), PR.navy, { shadow: false, tex: false });
}
function e4Ball(x, y) {
  pp(pE(x, y - 64, 64, 64), PR.blue, { key: 'bl_bd', sb: 14, sy: 7, tex: 0.5 });
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y - 64, 64, 64, 0, 0, TAU); ctx.clip();
  pp(pR(x - 70, y - 82, 140, 36, 0), PR.yellow, { key: 'bl_s', shadow: false, tex: 0.4 });
  ctx.restore();
  pp(pE(x - 22, y - 92, 14, 9, -0.6), 'rgba(255,255,255,0.45)', { shadow: false, tex: false });
}

SCENES.cta = () => {
  engRoomLife('#9fbfa8');
  prSign('ĐẾM 5 ĐỒ VẬT TRÊN BÀN', { kicker: KICK });
  e4Window(540, 560, 300, 170, 'ct_wn');
  e4Drawing(180, 560, -0.07, 'flower', 'ct_d1');
  e4Drawing(900, 560, 0.06, 'sun', 'ct_d2');

  const TOP = 1130;
  e4Bag(330, FLOOR_Y + 4);
  e4Table(100, 980, TOP, 'ct_tb');
  const XS = [200, 370, 540, 710, 880];
  [e4Apple, e4Pencil, e4Cup, e4Book, e4Ball].forEach((f, i) => withT(XS[i], TOP + 2, 0, 1.18, () => f(0, 0)));
  const words = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'], cols = [PR.red, PR.blue, PR.green, PR.orange, PR.purple];
  ['đồ', 'vật', 'trên', 'bàn', 'bằng'].forEach((w, i) => {
    withT(XS[i], 770, (i % 2 ? 0.04 : -0.04), popS(VW('cta', w).t0), () => {
      pp(pR(-78, -38, 156, 76, 38), cols[i], { key: 'ct_bg' + i, sb: 10, sy: 5, tex: 0.45 });
      txt(words[i], 0, 2, fitSize(words[i], 136, 40), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  cues.push({ t: VW('hook', 'cùng').t0, k: 'pop' });
  cues.push({ t: VW('one', 'one').t0, k: 'pop' });
  for (const [id, a, b] of [['two_three', 'two', 'three'], ['four_five', 'four', 'five']]) {
    cues.push({ t: VW(id, a).t0, k: 'pop' });
    cues.push({ t: VW(id, b).t0, k: 'pop' });
  }

  const tHide = VW('quiz', 'giấu').t0;
  cues.push({ t: tHide + 0.6, k: 'thud' });
  cues.push({ t: VW('quiz', 'nhiêu').t0, k: 'pop' });
  const s = VL('quiz').t1 + 0.4;
  for (let i = 0; i < 3; i++) cues.push({ t: s + i, k: 'tick' });

  cues.push({ t: VW('answer', 'four').t0, k: 'chime' });
  cues.push({ t: VW('answer', 'tuyệt').t0, k: 'thud' });
  for (const w of ['one', 'two', 'three', 'four', 'five']) cues.push({ t: VW('countall', w).t0, k: 'pop' });
  for (const w of ['đồ', 'vật', 'trên', 'bàn', 'bằng']) cues.push({ t: VW('cta', w).t0, k: 'pop' });
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
