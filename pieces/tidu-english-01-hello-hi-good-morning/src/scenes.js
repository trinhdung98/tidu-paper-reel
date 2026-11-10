// =====================================================================
//  TIDU ENGLISH 01 — "Hello, Hi hay Good Morning?"
//  One scene per voice line. Mascot: polly() parrot, a different hat each scene.
// =====================================================================
POLLY_SCALE = 0.84;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const POLLY_X = 880, POLLY_Y = 1790, FLOOR_Y = 1470;
const KICK = 'TIDU ENGLISH · GREETING';
const SCENES = {};
const WALL_A = '#c9b28a', WALL_B = '#bfa77e', WALL_SKY = '#86a8ba';
const GIRL = { girl: true, flip: true, shirt: PR.mustard, sleeve: '#c99a1f' };

// a cut-paper child standing on the floor at x; o: s, flip, wave, girl, shirt, sleeve, key
function enKid(x, o = {}) {
  const key = o.key ?? 'kid', s = o.s ?? 1, shirt = o.shirt ?? PR.red, sleeve = o.sleeve ?? PR.redD;
  ctx.save(); ctx.translate(x, FLOOR_Y); ctx.scale(o.flip ? -s : s, s);
  const bob = Math.sin(TT * TAU * 1.2 + hash(key) % 7) * 6;
  [-36, 36].forEach((fx, i) => pp(pR(fx - 20, -12, 40, 24, 10), PR.char, { key: key + 'f' + i, sb: 8, sy: 4, tex: 0.4 }));
  pp(pR(-42, -120, 84, 110, 10), PR.navyD, { key: key + 'legs', sb: 10, sy: 5, tex: 0.5 });
  ctx.translate(0, bob);
  if (o.girl) pp(pR(-84, -424, 168, 170, 50), PR.wood, { key: key + 'hback', sb: 10, sy: 5, tex: 0.5 });
  pp(pE(0, -200, 74, 95), shirt, { key: key + 'body', sb: 16, sy: 8, tex: 0.55 });
  pp(pG([[-35, -280], [0, -235], [35, -280], [0, -295]]), PR.paperW, { key: key + 'col', shadow: false, tex: 0.3 });
  if (o.wave) {
    withT(-62, -230, Math.sin(TT * 8) * 0.25 - 0.45, 1, () => {
      pp(pR(-15, -85, 30, 90, 12), sleeve, { key: key + 'arm', sb: 8, sy: 4, tex: 0.4 });
      pp(pE(0, -96, 20, 20), PR.tan, { key: key + 'hnd', shadow: false, tex: 0.3 });
    });
  } else pp(pR(-78, -230, 24, 80, 10), sleeve, { key: key + 'armL', sb: 8, sy: 4, tex: 0.4 });
  pp(pE(0, -350, 70, 74), PR.tan, { key: key + 'head', sb: 14, sy: 7, tex: 0.45 });
  if (o.girl) {
    pp(pR(-78, -432, 156, 62, 30), PR.wood, { key: key + 'hair', sb: 10, sy: 5, tex: 0.5 });
    pp(pE(56, -414, 22, 16, 0.4), PR.red, { key: key + 'bow', sb: 4, sy: 2, tex: 0.4 });
  } else {
    pp(pR(-74, -425, 148, 65, 24), PR.char, { key: key + 'hair', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-74, -395, 26, 45, 10), PR.char, { key: key + 'hL', shadow: false, tex: 0.4 });
    pp(pR(48, -395, 26, 45, 10), PR.char, { key: key + 'hR', shadow: false, tex: 0.4 });
  }
  [-25, 25].forEach((ex) => { pp(pE(ex, -352, 8, 8), PR.ink, { shadow: false, tex: false }); pp(pE(ex + 2, -355, 3, 3), PR.paperW, { shadow: false, tex: false }); });
  ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -332, 20, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore();
  ctx.restore();
}

// the teacher (cô giáo): long hair with a bun, teal blazer, navy skirt, a red book under her arm
function enTeacher(x, o = {}) {
  const key = o.key ?? 'tch', s = o.s ?? 1.05;
  ctx.save(); ctx.translate(x, FLOOR_Y); ctx.scale(o.flip ? -s : s, s);
  [-30, 30].forEach((fx, i) => pp(pR(fx - 18, -12, 36, 22, 9), PR.char, { key: key + 'f' + i, sb: 8, sy: 4, tex: 0.4 }));
  [-22, 22].forEach((lx, i) => pp(pR(lx - 10, -70, 20, 62, 6), PR.tan, { key: key + 'leg' + i, shadow: false, tex: 0.35 }));
  pp(pG([[-58, -62], [58, -62], [40, -150], [-40, -150]]), PR.navy, { key: key + 'skirt', sb: 12, sy: 6, tex: 0.5 });
  pp(pR(-84, -428, 168, 196, 52), PR.woodD, { key: key + 'hback', sb: 10, sy: 5, tex: 0.5 });
  pp(pR(-50, -280, 100, 140, 14), PR.teal, { key: key + 'blz', sb: 16, sy: 8, tex: 0.55 });
  pp(pG([[-25, -280], [0, -205], [25, -280]]), PR.paperW, { key: key + 'lapel', shadow: false, tex: 0.3 });
  withT(52, -205, 0.12, 1, () => {
    pp(pR(-34, -48, 68, 96, 6), PR.red, { key: key + 'book', sb: 8, sy: 4, tex: 0.5 });
    pp(pR(-34, -48, 12, 96, 4), PR.redD, { key: key + 'spine', shadow: false, tex: 0.4 });
  });
  if (o.wave) {
    withT(-55, -240, Math.sin(TT * 6) * 0.2 - 0.45, 1, () => {
      pp(pR(-14, -80, 28, 85, 10), PR.teal, { key: key + 'arm', sb: 8, sy: 4, tex: 0.4 });
      pp(pE(0, -90, 18, 18), PR.tan, { key: key + 'hnd', shadow: false, tex: 0.3 });
    });
  } else pp(pR(-74, -270, 24, 92, 10), PR.teal, { key: key + 'armL', sb: 8, sy: 4, tex: 0.4 });
  pp(pE(0, -355, 66, 70), PR.tan, { key: key + 'head', sb: 14, sy: 7, tex: 0.45 });
  pp(pR(-72, -432, 144, 54, 26), PR.woodD, { key: key + 'fringe', sb: 8, sy: 4, tex: 0.5 });
  pp(pE(0, -448, 36, 30), PR.woodD, { key: key + 'bun', sb: 8, sy: 4, tex: 0.5 });
  [-24, 24].forEach((ex) => pp(pE(ex, -352, 6, 7), PR.ink, { shadow: false, tex: false }));
  ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -330, 18, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore();
  pp(pE(0, -312, 9, 5), PR.pink, { shadow: false, tex: false });
  ctx.restore();
}

// the classroom: wall, wood floor, bunting, a wall clock, pinned paper stars
function enRoom(wall, o = {}) {
  prWall(wall, { panel: 'rgba(255,255,255,0.06)', streak: false });
  prFloor(FLOOR_Y, o.floor ?? PR.woodD, { studs: o.floor == null, trim: true });
  pp(pR(-40, FLOOR_Y - 14, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  if (o.bunting !== false) prBunting(310);
  if (o.clock !== false) prClock(128, 424, 46, 8, 0);
  if (o.stars !== false) { prStar(952, 420, 22, PR.mustard); prStar(905, 462, 13, PR.creamL); prStar(968, 488, 11, PR.red); }
}

// a cream paper card centred at (x, y); fn draws its contents in card space
function enCard(x, y, w, h, key, fn, o = {}) {
  withT(x, y, o.rot ?? 0, o.s ?? 1, () => {
    pp(pR(-w / 2, -h / 2, w, h, 26), PR.creamL, { key: key + 'cd', sb: 24, sy: 12, tex: 0.6, rim: 'rgba(255,255,255,0.7)' });
    pp(pR(-w / 2 + 20, -h / 2 + 20, w - 40, h - 40, 18), o.fill ?? PR.paperW, { key: key + 'in', shadow: false, tex: 0.45 });
    fn();
  });
}

// a coloured pill with centred text, popping in at t
function enPill(x, y, w, h, str, size, fill, t, key, color = PR.creamL) {
  withT(x, y, 0, t == null ? 1 : popS(t), () => {
    pp(pR(-w / 2, -h / 2, w, h, h / 2.6), fill, { key, sb: 10, sy: 5, tex: 0.5 });
    txt(str, 0, 2, fitSize(str, w - 40, size), color, { align: 'center', base: 'middle' });
  });
}

// the taught word: pops on its word, then breathes gently while the child echoes it
function enWord(str, x, y, size, color, t, maxW) {
  const breathe = TT > t + 0.3 ? 1 + 0.035 * Math.sin((TT - t - 0.3) * TAU * 1.1) : 1;
  withT(x, y, 0, popS(t) * breathe, () => txt(str, 0, 0, maxW ? fitSize(str, maxW, size) : size, color, { align: 'center', base: 'middle' }));
}

function enDivider(y, w, key, c = PR.tan) { pp(pR(-w / 2, y - 4, w, 8, 4), c, { key, shadow: false, tex: 0.3 }); }

// a 3-2-1 quiz timer: one number per second from ts, then the empty ring rings until the cut
function enCountdown(x, y, ts) {
  const k = popS(ts - 0.25); if (k <= 0.01) return;
  const u = TT - ts, left = clamp(1 - u / 3), n = 3 - Math.floor(clamp(u, 0, 2.999)), r = 72;
  withT(x, y, u >= 3 ? Math.sin(TT * 55) * 0.09 : 0, k, () => {
    pp(pR(-r * 0.2, -r - 26, r * 0.4, 38, 6), PR.char, { key: 'tm_kn', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(0, 0, r, r), PR.red, { key: 'tm_o', sb: 14, sy: 7, tex: 0.55, rim: 'rgba(255,220,210,0.35)' });
    pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key: 'tm_f', shadow: false, tex: 0.45 });
    if (left > 0) pp(() => { ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.76, -Math.PI / 2, -Math.PI / 2 + TAU * left); ctx.closePath(); }, PR.mustard, { key: 'tm_w', shadow: false, tex: 0.45 });
    pp(pE(0, 0, r * 0.5, r * 0.5), PR.paperW, { key: 'tm_c', sb: 6, sy: 3, tex: 0.4 });
    if (u < 3) txt(String(n), 0, 3, 56, PR.navy, { align: 'center', base: 'middle' });
  });
}
const QUIZ_TS = () => VL('quiz').t1 + 0.4;

// =====================================================================
//  hook: "Gặp bạn mới, bạn nói gì bằng tiếng Anh?"
// =====================================================================
SCENES.hook = () => {
  enRoom(WALL_A);
  prSign('GẶP BẠN MỚI', { kicker: KICK });
  enKid(250, { key: 'hk_a', wave: true });
  enKid(560, { key: 'hk_b', ...GIRL, wave: TT >= VW('hook', 'mới').t0 });
  prSpeech(540, 730, 760, 400, 300, 1012, '', { key: 'hk_bub' });
  txt('?', 540, 690, 200, PR.red, { align: 'center', base: 'middle' });
  enPill(540, 850, 640, 92, 'NÓI GÌ BẰNG TIẾNG ANH?', 46, PR.navy, null, 'hk_tag');
  polly(POLLY_X, POLLY_Y, { hat: 'cap', mood: 'wow', key: 'p_hook' });
  prChips();
};

// =====================================================================
//  hello: "Hello! Nghĩa là xin chào."
// =====================================================================
SCENES.hello = () => {
  enRoom(WALL_B);
  prSign('HELLO LÀ XIN CHÀO', { kicker: KICK });
  const tH = VW('hello', 'hello').t0, tN = VW('hello', 'nghĩa').t0;
  enKid(240, { key: 'hl_a', wave: true });
  enKid(520, { key: 'hl_b', ...GIRL, wave: TT >= tH + 0.35 });
  enCard(540, 680, 760, 400, 'hl', () => {
    enWord('Hello!', 0, -62, 150, PR.eng, tH);
    enDivider(32, 480, 'hl_div');
    enPill(0, 110, 460, 92, 'XIN CHÀO', 54, PR.navy, tN, 'hl_xc');
  }, { rot: -0.012 });
  prSpeech(300, 960, 240, 100, 250, 1040, 'Hello!', { t: tH, key: 'hl_s1', size: 46 });
  prSpeech(580, 960, 240, 100, 520, 1040, 'Hello!', { t: tH + 0.35, key: 'hl_s2', size: 46 });
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_hello' });
  prChips();
};

// =====================================================================
//  hi: "Hi! Cũng là xin chào, thường thân mật hơn."
// =====================================================================
SCENES.hi = () => {
  enRoom(WALL_A);
  prSign('CHÀO THÂN MẬT', { kicker: KICK });
  const tH = VW('hi', 'hi').t0, tC = VW('hi', 'cũng').t0, tT = VW('hi', 'thân').t0;
  enKid(220, { key: 'hi_a', wave: true });
  enKid(410, { key: 'hi_b', ...GIRL, wave: true });
  prBlock(528, 1404, 'H', PR.red, 0.45, -0.06);
  prBlock(612, 1404, 'I', PR.blue, 0.45, 0.05);
  enCard(540, 670, 760, 440, 'hi', () => {
    enWord('Hi!', 0, -92, 170, PR.orange, tH);
    enDivider(-2, 480, 'hi_div');
    enPill(0, 66, 400, 84, 'XIN CHÀO', 48, PR.redD, tC, 'hi_xc');
    enPill(0, 158, 380, 72, 'THÂN MẬT HƠN', 40, PR.cream, tT, 'hi_tm', PR.navy);
  }, { rot: 0.012 });
  prSpeech(250, 975, 160, 96, 225, 1040, 'Hi!', { t: tH, key: 'hi_s1', size: 50 });
  prSpeech(430, 975, 160, 96, 410, 1040, 'Hi!', { t: tH + 0.35, key: 'hi_s2', size: 50 });
  polly(POLLY_X, POLLY_Y, { hat: 'pirate', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_hi' });
  prChips();
};

// =====================================================================
//  morning: "Còn vào buổi sáng, chúng ta có thể nói Good morning!"
// =====================================================================
SCENES.morning = () => {
  prWall(WALL_SKY, { panel: 'rgba(255,255,255,0.08)', streak: false });
  prFloor(FLOOR_Y, PR.greenK, { studs: false, trim: true });
  pp(pR(-40, FLOOR_Y - 14, W + 80, 24, 4), PR.wood, { key: 'baseboard', sb: 8, sy: 4, tex: 0.5 });
  prSign('CHÀO BUỔI SÁNG', { kicker: KICK });
  const tS = VW('morning', 'sáng').t0, tG = VW('morning', 'good').t0;
  const sunY = 690 - EZ.o3(ev(tS, 1.2)) * 180;
  withT(540, sunY, TT * 0.4, 1, () => {
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 7; ctx.lineCap = 'round';
    for (let i = 0; i < 12; i++) { const an = i / 12 * TAU; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 108, Math.sin(an) * 108); ctx.lineTo(Math.cos(an) * 146, Math.sin(an) * 146); ctx.stroke(); }
    ctx.restore();
  });
  pp(pE(540, sunY, 90, 90), PR.yellow, { key: 'sun_disc', sb: 18, sy: 8, tex: 0.5, rim: 'rgba(255,255,255,0.6)' });
  pp(pE(205, 540, 92, 40), PR.paperW, { key: 'cld1', sb: 10, sy: 5, tex: 0.4 });
  pp(pE(870, 500, 100, 44), PR.paperW, { key: 'cld2', sb: 10, sy: 5, tex: 0.4 });
  pp(pE(800, 560, 60, 28), PR.paperW, { key: 'cld3', sb: 8, sy: 4, tex: 0.4 });
  enCard(540, 790, 760, 360, 'gm', () => {
    enWord('Good morning!', 0, -52, 104, PR.navy, tG, 680);
    enDivider(22, 480, 'gm_div');
    enPill(0, 100, 480, 86, 'CHÀO BUỔI SÁNG', 46, PR.orange, null, 'gm_tag');
  }, { rot: -0.01, s: popS(tG) });
  enKid(240, { key: 'gm_a', wave: TT >= tG });
  enKid(470, { key: 'gm_b', ...GIRL, wave: TT >= tG + 0.3 });
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', key: 'p_morning' });
  prChips();
};

// =====================================================================
//  quiz: "Bây giờ thử nhé. Bạn gặp cô giáo vào buổi sáng, bạn sẽ nói gì?"
// =====================================================================
SCENES.quiz = () => {
  enRoom('#d4c3a3', { clock: false, stars: false });
  pp(pR(700, 890, 230, 600, 14), PR.wood, { key: 'qz_door', sb: 16, sy: 8, tex: 0.6 });
  pp(pR(724, 914, 182, 150, 10), PR.sky, { key: 'qz_win', shadow: false, tex: 0.4 });
  pp(pE(815, 1000, 30, 30), PR.yellow, { key: 'qz_sun', shadow: false, tex: 0.4 });
  prSign('THỬ TÀI NHÉ', { kicker: KICK });
  const tC = VW('quiz', 'cô').t0, tG = VW('quiz', 'gì').t0;
  enCard(540, 510, 760, 180, 'qz_q', () => {
    enPill(0, -36, 520, 56, 'GẶP CÔ GIÁO BUỔI SÁNG', 34, PR.redD, null, 'qz_tag');
    withT(0, 40, 0, popS(tG), () => txt('BẠN SẼ NÓI GÌ?', 0, 0, 54, PR.navy, { align: 'center', base: 'middle' }));
  }, { s: popS(tC) });
  [[330, 'A', PR.blue, 'Hi!', PR.orange, 84, -0.015], [750, 'B', PR.green, 'Good morning!', PR.navy, 56, 0.015]].forEach(([x, L, lc, word, wc, size, rot]) => {
    enCard(x, 735, 380, 210, 'qz_' + L, () => {
      pp(pR(-166, -91, 60, 50, 12), lc, { key: 'qz_t' + L, shadow: false, tex: 0.4 });
      txt(L, -136, -64, 34, PR.creamL, { align: 'center', base: 'middle' });
      txt(word, 0, 24, fitSize(word, 320, size), wc, { align: 'center', base: 'middle' });
    }, { rot });
  });
  enCountdown(540, 975, QUIZ_TS());
  enKid(190, { key: 'qz_kid', s: 0.92 });
  enTeacher(385, { key: 'qz_tch', flip: true, wave: TT >= tC });
  polly(POLLY_X, POLLY_Y, { hat: 'wizard', mood: 'neutral', hand: { x: -250, y: -340 }, key: 'p_quiz' });
  prChips();
};

// =====================================================================
//  answer: "Good morning! Chính xác!"
// =====================================================================
SCENES.answer = () => {
  enRoom(WALL_A);
  prSign('CHÍNH XÁC!', { kicker: KICK });
  const tG = VW('answer', 'good').t0, tX = VW('answer', 'chính').t0;
  enCard(540, 630, 760, 380, 'ans', () => {
    pp(pR(-330, -160, 64, 54, 12), PR.green, { key: 'ans_tag', shadow: false, tex: 0.4 });
    txt('B', -298, -131, 36, PR.creamL, { align: 'center', base: 'middle' });
    txt('Good morning!', 0, -14, fitSize('Good morning!', 680, 100), '#1d6b3e', { align: 'center', base: 'middle' });
  }, { fill: '#eaf5ee' });
  prCheck(868, 452, E0 + 0.1, 56);
  prStamp('CHÍNH XÁC', 540, 748, PR.green, tX, { rot: -0.05, size: 56, from: 1.25 });
  enKid(220, { key: 'ans_kid', s: 0.92, wave: true });
  enTeacher(430, { key: 'ans_tch', flip: true });
  prSpeech(320, 915, 380, 100, 230, 1060, 'Good morning!', { t: tG, key: 'ans_s', size: 44 });
  polly(POLLY_X, POLLY_Y, { hat: 'mortar', mood: 'happy', hand: { x: -240, y: -420 }, key: 'p_ans' });
  prChips();
};

// =====================================================================
//  recap: "Hãy nói lại cùng mình: Hello! Hi! Good morning!"
// =====================================================================
SCENES.recap = () => {
  enRoom(WALL_B);
  prSign('NÓI LẠI CÙNG MÌNH', { kicker: KICK });
  const tHl = VW('recap', 'hello').t0, tHi = VW('recap', 'hi').t0, tGm = VW('recap', 'good').t0;
  [[260, tHl, ['Hello!'], 64, PR.eng, ['Xin chào'], -0.012], [540, tHi, ['Hi!'], 84, PR.orange, ['Xin chào'], 0], [820, tGm, ['Good', 'morning!'], 52, PR.green, ['Chào', 'buổi sáng'], 0.012]]
    .forEach(([x, t, en, size, col, vi, rot], i) => {
      const on = TT >= t;
      ctx.save(); ctx.globalAlpha = on ? 1 : 0.55;
      enCard(x, 700, 260, 440, 'rc' + i, () => {
        en.forEach((s, j) => txt(s, 0, (en.length > 1 ? -96 + j * 58 : -66), fitSize(s, 210, size), col, { align: 'center', base: 'middle' }));
        enDivider(10, 150, 'rc_d' + i);
        vi.forEach((s, j) => txt(s, 0, (vi.length > 1 ? 70 + j * 46 : 88), fitSize(s, 210, 36), PR.navy, { align: 'center', base: 'middle' }));
      }, { rot, s: on ? 1 + 0.07 * Math.sin(Math.PI * ev(t, 0.3)) : 1 });
      ctx.restore();
      prCheck(x, 922, t, 42);
    });
  enKid(230, { key: 'rc_a', wave: TT >= tHl });
  enKid(440, { key: 'rc_b', ...GIRL, wave: TT >= tHi });
  polly(POLLY_X, POLLY_Y, { hat: 'party', mood: 'happy', hold: propBook(0.12), hand: { x: -240, y: -380 }, key: 'p_recap' });
  prChips();
};

// =====================================================================
//  cta: "Bạn thích Hello hay Hi hơn? Hãy nói thử!"
// =====================================================================
SCENES.cta = () => {
  enRoom(WALL_A, { stars: false });
  prSign('HELLO HAY HI?', { kicker: KICK });
  const tHe = VW('cta', 'hello').t0, tHay = VW('cta', 'hay').t0, tHi = VW('cta', 'hi').t0, tN = VW('cta', 'hãy').t0;
  const R = RNG('cta_stars');
  for (let i = 0; i < 9; i++) prStar(R.r(110, 960), R.r(850, 990), R.r(10, 18), i % 2 ? PR.yellow : PR.mustard);
  enPill(540, 512, 560, 104, 'HÃY NÓI THỬ!', 60, PR.green, tN, 'cta_say');
  prSpeech(330, 705, 380, 190, 255, 1030, 'Hello!', { t: tHe, key: 'cta_s1', size: 84 });
  prSpeech(750, 705, 380, 190, 560, 1030, 'Hi!', { t: tHi, key: 'cta_s2', size: 96 });
  withT(540, 705, 0, popS(tHay), () => {
    pp(pE(0, 0, 52, 52), PR.red, { key: 'cta_vs', sb: 10, sy: 5, tex: 0.4 });
    txt('HAY', 0, 2, 32, PR.creamL, { align: 'center', base: 'middle' });
  });
  enKid(240, { key: 'cta_a', wave: TT >= tHe });
  enKid(560, { key: 'cta_b', ...GIRL, wave: TT >= tHi });
  polly(POLLY_X, POLLY_Y, { hat: 'crown', mood: 'happy', hand: { x: -240, y: -380 }, key: 'p_cta' });
  prChips();
};

// =====================================================================
//  Sound Cues
// =====================================================================
function SFX_CUES() {
  const cues = [];
  [['hello', 'hello'], ['hello', 'nghĩa'], ['hi', 'hi'], ['hi', 'thân'], ['morning', 'sáng'], ['morning', 'good'], ['quiz', 'cô'],
    ['recap', 'hello'], ['recap', 'hi'], ['recap', 'good'], ['cta', 'hello'], ['cta', 'hi'], ['cta', 'hãy']]
    .forEach(([id, w]) => cues.push({ t: VW(id, w).t0, k: 'pop' }));
  const ts = QUIZ_TS();
  [0, 1, 2].forEach((d) => cues.push({ t: ts + d, k: 'tick' }));
  cues.push({ t: VL('answer').t0 + 0.1, k: 'chime' });
  cues.push({ t: VW('answer', 'chính').t0, k: 'thud' });
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
