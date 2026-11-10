// =====================================================================
//  TIDU ENGLISH 02 — "Ba cụm từ lịch sự bé nên biết"
//  Mascot: polly() parrot with distinct hats and moods per scene.
//  Story: kid A (red, left) asks, receives and thanks; kid B (blue, right) gives and answers "You're welcome!".
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790;
const KICK = 'TIDU ENGLISH · LỊCH SỰ';
const SCENES = {};
const WALL_BASE = '#c9b28a';
const ARM_DOWN = 1.3, ARM_HOLD = 0.85, ARM_REACH = -0.15;
const KID_A = 230, KID_B = 560, FLOOR_Y = 1470;

// ---- a paper kid; o.arm = front-arm angle (0 = straight forward, + = down). Returns the front hand in screen coords.
function epKid(x, y, o = {}) {
  const key = o.key ?? 'kid', s = o.s ?? 1.15, dir = o.flip ? -1 : 1, arm = o.arm ?? ARM_DOWN;
  const bob = Math.sin(TT * TAU * 1.2 + (hash(key) % 100) / 100 * TAU) * 6;
  const hx = 50 + 84 * Math.cos(arm), hy = -210 + 84 * Math.sin(arm);
  ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s);
  [-36, 36].forEach((fx, i) => pp(pR(fx - 20, -12, 40, 24, 10), PR.char, { key: key + 'f' + i, sb: 8, sy: 4, tex: 0.4 }));
  pp(pR(-42, -120, 84, 110, 10), PR.navyD, { key: key + 'legs', sb: 10, sy: 5, tex: 0.5 });
  ctx.translate(0, bob);
  if (o.hair === 'long') pp(pR(-88, -410, 176, 180, 44), o.hairC ?? PR.char, { key: key + 'hlong', sb: 10, sy: 5, tex: 0.5 });
  pp(pR(-78, -230, 24, 80, 10), o.colorD ?? PR.redD, { key: key + 'armB', sb: 8, sy: 4, tex: 0.4 });
  pp(pE(0, -200, 74, 95), o.color ?? PR.red, { key: key + 'body', sb: 16, sy: 8, tex: 0.55 });
  pp(pG([[-35, -280], [0, -235], [35, -280], [0, -295]]), PR.paperW, { key: key + 'col', shadow: false, tex: 0.3 });
  pp(pE(0, -350, 70, 74), PR.tan, { key: key + 'head', sb: 14, sy: 7, tex: 0.45 });
  pp(pR(-74, -425, 148, 65, 24), o.hairC ?? PR.char, { key: key + 'hair', sb: 10, sy: 5, tex: 0.5 });
  pp(pR(-74, -395, 26, 45, 10), o.hairC ?? PR.char, { key: key + 'hL', shadow: false, tex: 0.4 });
  pp(pR(48, -395, 26, 45, 10), o.hairC ?? PR.char, { key: key + 'hR', shadow: false, tex: 0.4 });
  pp(pE(-25, -352, 8, 8), PR.ink, { key: key + 'e1', shadow: false, tex: false });
  pp(pE(25, -352, 8, 8), PR.ink, { key: key + 'e2', shadow: false, tex: false });
  ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -332, 20, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore();
  withT(50, -210, arm, 1, () => {
    pp(pR(-12, -14, 92, 28, 10), o.colorD ?? PR.redD, { key: key + 'armF', sb: 8, sy: 4, tex: 0.4 });
    pp(pE(84, 0, 17, 17), PR.tan, { key: key + 'hnd', shadow: false, tex: 0.3 });
  });
  ctx.restore();
  return { x: x + dir * s * hx, y: y + s * (bob + hy) };
}
const epKidB = (x, o = {}) => epKid(x, FLOOR_Y, { flip: true, color: PR.blue, colorD: PR.navy, key: 'kidB', ...o });
const epArm = (keys) => springTrack(keys, SPRING.smooth);

// ---- props
function epBook(x, y, s = 1, rot = -0.08) {
  withT(x, y, rot, s, () => {
    pp(pR(-56, -40, 120, 88, 8), PR.paperW, { key: 'bkp', sb: 10, sy: 5, tex: 0.35 });
    pp(pR(-64, -46, 120, 88, 8), PR.green, { key: 'bkc', sb: 6, sy: 3, tex: 0.5 });
    pp(pR(-64, -46, 20, 88, 5), PR.greenK, { key: 'bks', shadow: false, tex: 0.45 });
    pp(pR(-30, -24, 70, 12, 4), PR.creamL, { shadow: false, tex: false });
    pp(pR(-30, -2, 50, 10, 4), PR.creamL, { shadow: false, tex: false });
  });
}
function epGift(x, y, s = 1, rot = 0) {
  withT(x, y, rot, s, () => {
    pp(pR(-70, -50, 140, 110, 10), PR.red, { key: 'gfb', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-80, -72, 160, 34, 8), PR.redD, { key: 'gfl', sb: 8, sy: 4, tex: 0.5 });
    pp(pR(-14, -72, 28, 132, 4), PR.yellow, { key: 'gfr', shadow: false, tex: 0.35 });
    pp(pE(-30, -88, 32, 20, -0.35), PR.yellow, { key: 'gfb1', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(30, -88, 32, 20, 0.35), PR.yellow, { key: 'gfb2', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(0, -84, 14, 14), PR.mustard, { key: 'gfk', shadow: false, tex: 0.4 });
  });
}
function epMilk(x, y, s = 1) {
  withT(x, y, 0, s, () => {
    pp(pR(-30, -86, 60, 100, 10), PR.glass, { key: 'mkg', sb: 10, sy: 5, tex: 0.35, rim: 'rgba(255,255,255,0.7)', rw: 3 });
    pp(pR(-24, -58, 48, 66, 8), PR.paperW, { key: 'mkm', shadow: false, tex: 0.3 });
  });
}

// ---- background: bunting, clock, a pinned drawing, a plant pot (all inside x 70–1010)
function epBunting(y) {
  ctx.save(); ctx.strokeStyle = PR.woodD; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(90, y); ctx.quadraticCurveTo(540, y + 50, 990, y); ctx.stroke(); ctx.restore();
  const cols = [PR.red, PR.cream, PR.blue, PR.mustard, PR.green, PR.orange];
  for (let i = 0; i < 6; i++) {
    const x = 120 + i * 150, yy = y + 6 + Math.sin((i + 0.5) / 6 * Math.PI) * 22, sw = Math.sin(TT * 3 + i) * 5;
    pp(pG([[x, yy], [x + 100, yy + 2], [x + 50 + sw, yy + 86]]), cols[i], { key: 'epbun' + i, sb: 8, sy: 5, tex: 0.5 });
  }
}
function epDrawing(x, y, rot = 0.05) {
  withT(x, y, rot, 1, () => {
    pp(pR(-85, -65, 170, 130, 4), PR.paperW, { key: 'epdr', sb: 10, sy: 5, tex: 0.45 });
    pp(pE(-38, -18, 24, 24), PR.yellow, { key: 'epdrs', shadow: false, tex: 0.4 });
    pp(pA(30, 62, 80, Math.PI, TAU), PR.green, { key: 'epdrh', shadow: false, tex: 0.4 });
    pp(pR(-22, -76, 44, 18, 2), 'rgba(240,230,200,0.85)', { shadow: false, tex: 0.3 });
  });
}
function epPlant(x, y) {
  [[-24, -110, -0.35], [0, -130, 0], [24, -110, 0.35]].forEach(([lx, ly, r], i) => pp(pE(x + lx, y + ly, 20, 48, r), i === 1 ? PR.green : PR.greenK, { key: 'eppl' + i, sb: 8, sy: 4, tex: 0.5 }));
  pp(pG([[x - 40, y - 76], [x + 40, y - 76], [x + 30, y], [x - 30, y]]), PR.orange, { key: 'eppot', sb: 10, sy: 5, tex: 0.5 });
}
function engRoomLife(wallCol, o = {}) {
  prWall(wallCol, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(FLOOR_Y, PR.woodD, { studs: true, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  epBunting(316);
  if (o.clock !== false) { const [cx, cy] = o.clock ?? [940, 880]; prClock(cx, cy, 50, 9, 15); }
  if (o.drawing !== false) { const [dx, dy] = o.drawing ?? [800, 1110]; epDrawing(dx, dy); }
  epPlant(110, 1460);
}

// ---- the word card: one English word big, its Vietnamese meaning on a tag that pops on the spoken word
function epWordCard(word, color, tag, tagT, key, cy = 600, h = 300) {
  withT(540, cy, -0.01, 1, () => {
    pp(pR(-400, -h / 2, 800, h, 24), PR.creamL, { key: key + 'cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-380, -h / 2 + 20, 760, h - 40, 18), PR.paperW, { key: key + 'in', shadow: false, tex: 0.45 });
    txt(word, 0, -48, fitSize(word, 700, 124), color, { align: 'center', base: 'middle', weight: 800 });
    const k = popS(tagT);
    if (k > 0.01) withT(0, 82, 0, k, () => {
      const tw = txtW(tag, 46, { weight: 800 }) + 80;
      pp(pR(-tw / 2, -38, tw, 76, 16), PR.navy, { key: key + 'tag', sb: 10, sy: 5, tex: 0.5 });
      txt(tag, 0, 16, 46, PR.creamL, { align: 'center', weight: 800 });
    });
  });
}

// =====================================================================
//  SCENE 1 — hook: "Muốn nói chuyện lịch sự bằng tiếng Anh, hãy nhớ ba cụm từ này."
// =====================================================================
SCENES.hook = () => {
  engRoomLife(WALL_BASE, { clock: false });
  prSign('3 CỤM TỪ LỊCH SỰ', { kicker: KICK });

  withT(540, 660, 0, 1, () => {
    pp(pR(-410, -220, 820, 440, 24), PR.creamL, { key: 'hk_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-390, -200, 780, 400, 18), PR.paperW, { key: 'hk_in', shadow: false, tex: 0.45 });
    [['Please', PR.blue, -130, 'ba'], ['Thank you', PR.red, 0, 'cụm'], ["You're welcome", PR.green, 130, 'từ']].forEach(([w, c, dy, cue]) => {
      const bump = 1 + 0.08 * Math.sin(Math.PI * ev(VW('hook', cue).t0, 0.3));
      withT(0, dy, 0, bump, () => {
        pp(pR(-360, -52, 720, 104, 16), PR.creamL, { key: 'hk_w' + dy, sb: 6, sy: 3, tex: 0.35 });
        pp(pR(-360, -52, 22, 104, 8), c, { key: 'hk_t' + dy, shadow: false, tex: 0.35 });
        txt(w, 10, 0, 68, c, { align: 'center', base: 'middle', weight: 800 });
      });
    });
  });

  epKid(KID_A, FLOOR_Y, { key: 'kidA', arm: ARM_REACH });
  const hb = epKidB(KID_B, { arm: ARM_HOLD });
  epBook(hb.x, hb.y - 24);

  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  SCENE 2 — please: "Please, dùng khi nhờ hoặc yêu cầu lịch sự."
// =====================================================================
SCENES.please = () => {
  engRoomLife('#bfa77e');
  prSign('KHI NHỜ LỊCH SỰ', { kicker: KICK });
  epWordCard('Please', PR.blue, 'NHỜ HOẶC YÊU CẦU', VW('please', 'nhờ').t0, 'pl_');

  epKid(KID_A, FLOOR_Y, { key: 'kidA', arm: ARM_REACH });
  const hb = epKidB(KID_B, { arm: ARM_HOLD });
  epBook(hb.x, hb.y - 24);
  prSpeech(320, 860, 340, 120, 250, 975, 'Please!', { t: VW('please', 'please').t0, key: 'sp_pl', color: PR.blue });

  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', key: 'p_please' });
  prChips();
};

// =====================================================================
//  SCENE 3 — thankyou: "Thank you, nghĩa là cảm ơn."
// =====================================================================
SCENES.thankyou = () => {
  engRoomLife(WALL_BASE);
  prSign('LỜI CẢM ƠN', { kicker: KICK });
  epWordCard('Thank you', PR.red, 'CẢM ƠN', VW('thankyou', 'cảm').t0, 'ty_');

  const ha = epKid(KID_A, FLOOR_Y, { key: 'kidA', arm: ARM_HOLD });
  epBook(ha.x, ha.y - 24);
  epKidB(KID_B, { arm: ARM_REACH });
  prSpeech(330, 860, 380, 120, 250, 975, 'Thank you!', { t: VW('thankyou', 'thank').t0, key: 'sp_ty', color: PR.red });

  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'happy', key: 'p_ty' });
  prChips();
};

// =====================================================================
//  SCENE 4 — welcome: "Khi ai đó cảm ơn mình, có thể đáp: You're welcome!"
// =====================================================================
SCENES.welcome = () => {
  engRoomLife('#86a8ba', { clock: false });
  prSign('KHI ĐƯỢC CẢM ƠN', { kicker: KICK });
  epWordCard("You're welcome!", PR.green, 'CÂU ĐÁP LẠI', VW('welcome', 'đáp').t0, 'wc_');

  const ha = epKid(KID_A, FLOOR_Y, { key: 'kidA', arm: ARM_HOLD });
  epBook(ha.x, ha.y - 24);
  epKidB(KID_B, { arm: ARM_DOWN });
  prSpeech(260, 812, 340, 96, 240, 978, 'Thank you!', { t: VW('welcome', 'cảm').t0, key: 'sp_wc1', color: PR.red });
  prSpeech(660, 924, 480, 96, 575, 978, "You're welcome!", { t: VW('welcome', 'welcome').t0 - 0.2, key: 'sp_wc2', color: PR.green });

  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', key: 'p_wc' });
  prChips();
};

// =====================================================================
//  SCENE 5 — dialogue: "Xem nhé! Một bạn đưa sách cho bạn kia. Thank you! You're welcome!"
// =====================================================================
SCENES.dialogue = () => {
  engRoomLife('#d4c3a3', { clock: [170, 520], drawing: false });
  prSign('XEM NHÉ!', { kicker: KICK });

  const tGive = VW('dialogue', 'đưa').t0, tPass = VW('dialogue', 'sách').t1, tKeep = VW('dialogue', 'kia').t0;
  const armB = epArm([[0, ARM_HOLD], [tGive, ARM_REACH], [tKeep, ARM_DOWN]]);
  const armA = epArm([[0, ARM_DOWN], [tGive + 0.2, ARM_REACH], [tKeep, ARM_HOLD]]);
  const ha = epKid(200, FLOOR_Y, { key: 'kidA', s: 1.5, arm: armA });
  const hb = epKidB(620, { s: 1.5, arm: armB });
  const u = EZ.io(ev(tPass - 0.15, 0.3));
  const holder = TT < tKeep ? { x: lerp(hb.x, ha.x, u), y: lerp(hb.y, ha.y, u) } : ha;
  epBook(holder.x, holder.y - 34, 1.4);

  prSpeech(290, 700, 380, 130, 220, 825, 'Thank you!', { t: VW('dialogue', 'thank').t0, key: 'sp_dg1', color: PR.red });
  prSpeech(700, 560, 460, 130, 640, 825, "You're welcome!", { t: VW('dialogue', 'welcome').t0 - 0.2, key: 'sp_dg2', color: PR.green });

  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'happy', key: 'p_dg' });
  prChips();
};

// =====================================================================
//  SCENE 6 — quiz: "Bây giờ đến lượt bạn. Khi nhận được món quà, bạn nói gì?"
// =====================================================================
const QZ_CD0 = () => VL('quiz').t1 + 0.4;
SCENES.quiz = () => {
  engRoomLife('#c9b28a', { clock: [950, 960], drawing: false });
  prSign('ĐẾN LƯỢT BẠN', { kicker: KICK });

  withT(540, 515, 0, 1, () => {
    pp(pR(-420, -85, 840, 170, 20), PR.creamL, { key: 'qz_qbd', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.6)' });
    pp(pR(-400, -67, 800, 134, 14), PR.paperW, { key: 'qz_qin', shadow: false, tex: 0.4 });
    txt('KHI NHẬN ĐƯỢC MÓN QUÀ,', 0, -14, 44, PR.redD, { align: 'center', weight: 800 });
    txt('BẠN NÓI GÌ?', 0, 52, 54, PR.navy, { align: 'center', weight: 800 });
  });

  [[350, 'A', 'Please', PR.blue, -0.015], [730, 'B', 'Thank you!', PR.red, 0.015]].forEach(([x, l, w, c, r]) => {
    withT(x, 715, r, 1, () => {
      pp(pR(-170, -90, 340, 180, 18), PR.creamL, { key: 'opt' + l, sb: 16, sy: 8, tex: 0.5 });
      pp(pR(-154, -74, 308, 148, 14), PR.paperW, { key: 'opt_in' + l, shadow: false, tex: 0.4 });
      pp(pR(-140, -66, 64, 52, 10), PR.navy, { key: 'opt_tag' + l, shadow: false, tex: 0.4 });
      txt(l, -108, -40, 38, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt(w, 0, 26, fitSize(w, 280, 60), c, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  pp(pR(390, 1310, 300, 26, 6), PR.wood, { key: 'qz_tbl', sb: 12, sy: 6, tex: 0.5 });
  [410, 650].forEach((lx) => pp(pR(lx, 1330, 20, 130, 4), PR.woodD, { key: 'qz_leg' + lx, sb: 6, sy: 3, tex: 0.4 }));
  const gb = 1 + 0.07 * Math.sin(Math.PI * ev(VW('quiz', 'quà').t0, 0.3));
  withT(540, 1310, 0, gb, () => epGift(0, -108, 1.8));
  epKid(300, FLOOR_Y, { key: 'kidA', arm: ARM_REACH });

  const t0 = QZ_CD0(), k = popS(t0) * (1 - ev(t0 + 3, 0.2));
  if (k > 0.01) {
    const n = 3 - Math.floor(Math.min(2.999, TT - t0)), left = 1 - ((TT - t0) % 1), r = 66;
    withT(540, 905, 0, k, () => {
      pp(pR(-r * 0.2, -r - 24, r * 0.4, 36, 6), PR.char, { key: 'qz_tmk', sb: 6, sy: 3, tex: 0.4 });
      pp(pE(0, 0, r, r), PR.red, { key: 'qz_tmo', sb: 14, sy: 7, tex: 0.55 });
      pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key: 'qz_tmf', shadow: false, tex: 0.45 });
      pp(() => { ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.76, -Math.PI / 2, -Math.PI / 2 + TAU * left); ctx.closePath(); }, PR.mustard, { key: 'qz_tmw', shadow: false, tex: 0.45 });
      pp(pE(0, 0, r * 0.5, r * 0.5), PR.paperW, { key: 'qz_tmc', sb: 6, sy: 3, tex: 0.4 });
      txt(String(n), 0, 2, 64, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    });
  }

  polly(POLLY_X, POLLY_Y, { hat: 'guard', mood: 'neutral', key: 'p_qz' });
  prChips();
};

// =====================================================================
//  SCENE 7 — answer: "Thank you! Rất tốt!"
// =====================================================================
SCENES.answer = () => {
  engRoomLife(WALL_BASE);
  prSign('ĐÁP ÁN', { kicker: KICK });

  withT(540, 600, 0, 1, () => {
    pp(pR(-400, -160, 800, 320, 24), PR.creamL, { key: 'ans_cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-380, -140, 760, 280, 18), '#eaf5ee', { key: 'ans_in', shadow: false, tex: 0.45 });
    pp(pR(-360, -124, 64, 56, 10), PR.navy, { key: 'ans_tag', shadow: false, tex: 0.4 });
    txt('B', -328, -96, 38, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Thank you!', 0, 10, 124, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });
  prCheck(880, 470, VW('answer', 'thank').t0);
  prStamp('RẤT TỐT', 540, 880, PR.green, VW('answer', 'rất').t0, { rot: -0.05, size: 64, from: 1.4 });
  prBurst(540, 880, VW('answer', 'rất').t0 + 0.12);

  const ha = epKid(KID_A, FLOOR_Y, { key: 'kidA', arm: ARM_HOLD });
  epGift(ha.x + 10, ha.y - 10, 0.85, -0.06);
  epKidB(KID_B, { arm: ARM_DOWN });

  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  SCENE 8 — cta: "Hãy thử nói Thank you với một người trong gia đình hôm nay."
// =====================================================================
function epHome() {
  prWall('#d9b99b', { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(FLOOR_Y, PR.wood, { studs: false, trim: true });
  pp(pR(-40, 1456, W + 80, 24, 4), PR.woodD, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(110, 440, 320, 270, 10), PR.woodD, { key: 'hm_win', sb: 16, sy: 8, tex: 0.5 });
  pp(pR(126, 456, 288, 238, 4), PR.sky, { key: 'hm_sky', shadow: false, tex: 0.4 });
  pp(pE(350, 520, 34, 34), PR.yellow, { key: 'hm_sun', shadow: false, tex: 0.4 });
  pp(pR(262, 456, 16, 238, 2), PR.woodD, { shadow: false, tex: 0.4 });
  pp(pR(126, 567, 288, 16, 2), PR.woodD, { shadow: false, tex: 0.4 });
  [[96, 0.04], [404, -0.04]].forEach(([cx, r], i) => pp(pR(cx - 24, 420, 48, 310, 10), PR.red, { key: 'hm_cur' + i, sb: 8, sy: 4, tex: 0.55 }));
  withT(800, 560, 0.03, 1, () => {
    pp(pR(-110, -90, 220, 180, 8), PR.wood, { key: 'hm_frm', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-92, -72, 184, 144, 4), PR.creamL, { key: 'hm_frmi', shadow: false, tex: 0.4 });
    pp(() => { ctx.arc(-20, -12, 24, Math.PI, 0); ctx.arc(20, -12, 24, Math.PI, 0); ctx.lineTo(0, 44); ctx.closePath(); }, PR.red, { key: 'hm_hrt', shadow: false, tex: 0.4 });
  });
  prClock(950, 760, 46, 9, 15);
  epPlant(110, 1460);
}
SCENES.cta = () => {
  epHome();
  prSign('NÓI THANK YOU VỚI NGƯỜI THÂN', { kicker: KICK });

  const hm = epKid(610, FLOOR_Y, { key: 'mom', s: 1.45, flip: true, arm: 0.35, color: PR.green, colorD: PR.greenK, hair: 'long', hairC: PR.brown });
  epMilk(hm.x, hm.y + 10, 1.1);
  epKid(KID_A, FLOOR_Y, { key: 'kidA', s: 1.1, arm: -0.25 });
  prSpeech(290, 870, 380, 120, 240, 998, 'Thank you!', { t: VW('cta', 'thank').t0, key: 'sp_cta', color: PR.red });

  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', key: 'p_cta' });
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
  cues.push({ t: VW('welcome', 'cảm').t0, k: 'pop' });
  cues.push({ t: VW('welcome', 'welcome').t0 - 0.2, k: 'pop' });
  cues.push({ t: VW('dialogue', 'thank').t0, k: 'pop' });
  cues.push({ t: VW('dialogue', 'welcome').t0 - 0.2, k: 'pop' });
  for (let i = 0; i < 3; i++) cues.push({ t: QZ_CD0() + i, k: 'tick' });
  cues.push({ t: VW('answer', 'thank').t0, k: 'chime' });
  cues.push({ t: VW('answer', 'rất').t0, k: 'thud' });
  cues.push({ t: VW('cta', 'thank').t0, k: 'pop' });
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
