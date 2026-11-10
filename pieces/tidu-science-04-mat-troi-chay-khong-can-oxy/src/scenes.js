
// =====================================================================
//  TIDU SCIENCE 04 — "Mặt Trời cháy liên tục mà không cần củi hay oxy?"
//  Vật lý hạt nhân & Thiên văn học: Phản ứng hợp hạch hạt nhân (Nuclear Fusion).
//  Mascot: flasky() (Tidu Science flask).
//  Theme: Solar orange, fiery yellow & deep space (#1f1b29, #2b1d28).
// =====================================================================
FLASKY_SCALE = 0.88;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const FLASKY_X = 880, FLASKY_Y = 1790;
const KICK = 'TIDU SCIENCE · VẬT LÝ HẠT NHÂN';
const SPACE_BG = '#1e1c2b';
const SPACE_D  = '#161421';
const SPACE_L  = '#2b243b';

const SCENES = {};

// ---- CUSTOM HELPERS ----

function tsStar(cx, cy, r, col = PR.yellow) {
  const tw = 0.8 + Math.sin(TT * 3 + cx * 0.1) * 0.2;
  pp(pG([
    [cx, cy - r * tw], [cx + r * 0.28, cy - r * 0.28],
    [cx + r * tw, cy], [cx + r * 0.28, cy + r * 0.28],
    [cx, cy + r * tw], [cx - r * 0.28, cy + r * 0.28],
    [cx - r * tw, cy], [cx - r * 0.28, cy - r * 0.28]
  ]), col, { shadow: false, tex: 0.3 });
}

function tsSky(seed = 'sky4') {
  const R = RNG(seed);
  for (let i = 0; i < 26; i++) {
    const sx = R.r(40, W - 40), sy = R.r(260, 1500), sr = R.r(6, 16);
    tsStar(sx, sy, sr, R.pick([PR.yellow, PR.creamL, PR.orange, '#ffffff']));
  }
}

function tsCard(x, y, w, h, key = 'card') {
  pp(pR(x - w / 2, y - h / 2, w, h, 16), PR.creamL, { key: key + 'back', sb: 18, sy: 9, tex: 0.55, rim: 'rgba(255,255,255,0.7)', rw: 3 });
  ctx.save();
  ctx.strokeStyle = PR.navyD;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(x - w / 2 + 10, y - h / 2 + 10, w - 20, h - 20, 10);
  ctx.stroke();
  ctx.restore();
}

// Đống lửa củi bằng giấy
function tsCampfire(cx, cy, s = 1) {
  withT(cx, cy, 0, s, () => {
    // Thanh củi gỗ chéo nhau
    withT(-40, 60, -0.25, 1, () => pp(pR(-80, -14, 160, 28, 6), PR.woodD, { key: 'log1', sb: 10, sy: 5 }));
    withT(40, 60, 0.25, 1, () => pp(pR(-80, -14, 160, 28, 6), PR.woodD, { key: 'log2', sb: 10, sy: 5 }));
    // Ngọn lửa giấy nhiều lớp (đỏ, cam, vàng) bập bùng
    const flick = Math.sin(TT * 6) * 10;
    pp(pG([[-80, 50], [-40, -40], [0, -110 + flick], [40, -40], [80, 50]]), PR.red, { key: 'flameR', sb: 14, sy: 7 });
    pp(pG([[-55, 50], [-25, -20], [0, -85 - flick * 0.5], [25, -20], [55, 50]]), PR.orange, { key: 'flameO', shadow: false });
    pp(pG([[-30, 50], [0, -50 + flick * 0.4], [30, 50]]), PR.yellow, { key: 'flameY', shadow: false });
  });
}

// Mặt Trời cắt lớp thấy lõi (Cutaway view)
function tsSunCutaway(cx, cy, r = 180) {
  withT(cx, cy, 0, 1, () => {
    // Tia hào quang ngoài
    for (let i = 0; i < 16; i++) {
      const a = (i * TAU) / 16 + TT * 0.15;
      const r1 = r * 1.05, r2 = r * 1.35;
      const p1 = [Math.cos(a - 0.12) * r1, Math.sin(a - 0.12) * r1];
      const p2 = [Math.cos(a) * r2, Math.sin(a) * r2];
      const p3 = [Math.cos(a + 0.12) * r1, Math.sin(a + 0.12) * r1];
      pp(pG([p1, p2, p3]), PR.orange, { key: 'sray' + i, shadow: false });
    }
    // Lớp vỏ ngoài (Bề mặt Mặt Trời)
    pp(pE(0, 0, r, r), PR.mustard, { key: 'sunlayer1', sb: 18, sy: 9, tex: 0.6 });
    // Lớp trung gian (Vùng bức xạ - Radiative zone)
    pp(pE(0, 0, r * 0.68, r * 0.68), PR.orange, { key: 'sunlayer2', shadow: false });
    // Lõi trong cùng (Core - nơi diễn ra hợp hạch)
    pp(pE(0, 0, r * 0.38, r * 0.38), '#ffffff', { key: 'suncore', sb: 16, sy: 8 });
    pp(pE(0, 0, r * 0.32, r * 0.32), PR.yellow, { shadow: false });
    txt('LÕI', 0, 12, 34, PR.navyD, { align: 'center', weight: 800 });
  });
}

// Phản ứng hợp hạch Hydro -> Heli
function tsFusion(cx, cy, t0) {
  const u = ev(t0, 1.2);
  withT(cx, cy, 0, 1, () => {
    // 2 hạt Hydro tiến lại gần nhau
    const d = lerp(220, 40, EZ.o3(Math.min(1, u * 2)));
    if (u < 0.65) {
      // Hạt Hydro trái
      withT(-d, 0, 0, 1, () => {
        pp(pE(0, 0, 48, 48), PR.blue, { key: 'hyd1', sb: 10, sy: 5 });
        txt('H+', 0, 12, 30, PR.creamL, { align: 'center', weight: 800 });
      });
      // Hạt Hydro phải
      withT(d, 0, 0, 1, () => {
        pp(pE(0, 0, 48, 48), PR.blue, { key: 'hyd2', sb: 10, sy: 5 });
        txt('H+', 0, 12, 30, PR.creamL, { align: 'center', weight: 800 });
      });
    } else {
      // Hợp nhất thành hạt Heli tỏa sáng cực mạnh
      const sPop = popS(t0 + 0.65);
      withT(0, 0, 0, sPop, () => {
        pp(pE(0, 0, 78, 78), PR.yellow, { key: 'hespark', sb: 22, sy: 10 });
        pp(pE(0, 0, 64, 64), PR.mustard, { key: 'hecore', shadow: false });
        txt('HELI (He)', 0, 14, 24, PR.navyD, { align: 'center', weight: 800 });
      });
      // Sóng năng lượng tỏa ra (E = mc²)
      prBurst(0, 0, t0 + 0.65, { cols: [PR.yellow, PR.orange, '#ffffff', PR.red] });
    }
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// SCENE 1: HOOK (Line: "Mặt Trời không cháy giống như một đống lửa!")
// Đặt đống lửa củi bên cạnh Mặt Trời
SCENES.hook = () => {
  prWall(SPACE_BG, { streak: 450 });
  tsSky('hook4-sky');
  prFloor(1520, PR.char, { trim: false });

  // Paired layout: Đống lửa (trái 330) vs Mặt Trời (phải 750)
  const cW = 360, cH = 520, cY = 780;

  // Thẻ Đống Lửa (330)
  tsCard(330, cY, cW, cH, 'cardFire');
  pp(pR(330 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.red, { key: 'ftag', sb: 6, sy: 3 });
  txt('ĐỐNG LỬA BẾP', 330, cY - cH / 2 + 52, 24, PR.creamL, { align: 'center', weight: 800 });
  tsCampfire(330, cY + 40, 1.2);
  txt('CẦN OXY ĐỂ CHÁY', 330, cY + cH / 2 - 34, 22, PR.ink, { align: 'center', weight: 800 });

  // Thẻ Mặt Trời (750)
  tsCard(750, cY, cW, cH, 'cardSun');
  pp(pR(750 - 130, cY - cH / 2 + 20, 260, 46, 8), PR.mustard, { key: 'stag', sb: 6, sy: 3 });
  txt('MẶT TRỜI', 750, cY - cH / 2 + 52, 24, PR.navyD, { align: 'center', weight: 800 });
  withT(750, cY + 30, 0, 1, () => {
    pp(pE(0, 0, 80, 80), PR.yellow, { key: 'hsun' });
    pp(pE(0, 0, 68, 68), PR.orange, { shadow: false });
  });
  txt('KHÔNG CẦN OXY', 750, cY + cH / 2 - 34, 22, PR.ink, { align: 'center', weight: 800 });

  // Dấu chéo đỏ lên đống lửa
  const tCross = VW('hook', 'không').t0;
  prCross(330, cY + 30, tCross);

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'goggles',
    key: 'f1',
    mood: 'wow',
    look: -16
  });

  prSign('MẶT TRỜI KHÔNG PHẢI LỬA', { kicker: KICK });
  prChips();
};

// SCENE 2: LIGHT (Line: "Mặt Trời tỏa ra ánh sáng và nhiệt khổng lồ mỗi ngày. Nhưng nó không cháy như ngọn lửa trong bếp.")
SCENES.light = () => {
  prWall(SPACE_D, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('light-sky');
  prFloor(1520, PR.char, { trim: false });

  // Quả cầu Mặt Trời khổng lồ phát sáng rực rỡ ở trung tâm
  withT(CX, 740, 0, 1, () => {
    pp(pE(0, 0, 240, 240), 'rgba(255,200,60,0.18)', { shadow: false });
    pp(pE(0, 0, 190, 190), PR.orange, { key: 'lbody2', sb: 18, sy: 9 });
    pp(pE(0, 0, 160, 160), PR.yellow, { key: 'lbody1', sb: 12, sy: 6 });
  });

  // Tia nắng động tỏa ra quanh Mặt Trời
  ctx.save();
  ctx.strokeStyle = PR.orange;
  ctx.lineWidth = 6;
  ctx.globalAlpha = 0.42;
  for (let i = 0; i < 8; i++) {
    const a = i * TAU / 8 + TT * 0.28;
    ctx.beginPath();
    ctx.moveTo(CX + Math.cos(a) * 230, 740 + Math.sin(a) * 230);
    ctx.lineTo(CX + Math.cos(a) * 290, 740 + Math.sin(a) * 290);
    ctx.stroke();
  }
  ctx.restore();

  // Badge thực tế khoa học phía trên Mặt Trời
  withT(CX, 385, 0.012, 1, () => {
    pp(pR(-350, -40, 700, 80, 14), PR.navyD, { key: 'linfo', sb: 12, sy: 6, tex: 0.42 });
    txt('KHÔNG CHÁY • KHÔNG CẦN OXY • KHÔNG CẦN CỦI', 0, 10, 24, PR.yellow, { align: 'center', weight: 800 });
  });

  const tHeat = VW('light', 'nhiệt').t0;
  prStamp('NGUỒN NHIỆT KHỔNG LỒ', CX, 1125, PR.orange, tHeat, { rot: -0.02, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'propeller',
    key: 'f2',
    mood: 'happy',
    look: -14
  });

  prSign('NHIỆT LƯỢNG KHỔNG LỒ', { kicker: KICK });
  prChips();
};

// SCENE 3: CORE (Line: "Ở lõi Mặt Trời, nhiệt độ lên tới khoảng 15 triệu độ C.")
// Cắt lớp Mặt Trời tới tận tâm lõi 15.000.000 °C
SCENES.core = () => {
  prWall(SPACE_L, { streak: 460 });
  tsSky('core-sky');
  prFloor(1520, PR.char, { trim: false });

  // Mặt Trời cắt lớp
  tsSunCutaway(CX, 720, 190);

  // Thẻ nhiệt độ lõi
  const tTemp = VW('core', '15').t0;
  withT(CX, 1160, 0, 1, () => {
    pp(pR(-270, -45, 540, 90, 14), PR.red, { key: 'temptag', sb: 14, sy: 7 });
    txt('NHIỆT ĐỘ: 15 TRIỆU ĐỘ C', 0, 12, 34, PR.creamL, { align: 'center', weight: 800 });
  });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'hardhat',
    key: 'f3',
    mood: 'wow',
    hold: propTube(-0.25),
    look: -12
  });

  prSign('LÕI 15 TRIỆU ĐỘ C', { kicker: KICK });
  prChips();
};

// SCENE 4: FUSION (Line: "Trong điều kiện cực kỳ nóng và áp suất rất lớn, các hạt nhân hydro tham gia phản ứng hợp hạch để tạo thành heli và giải phóng năng lượng.")
SCENES.fusion = () => {
  const t0 = E0;
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('fus-sky');
  prFloor(1520, PR.char, { trim: false });

  const bW = 860, bH = 620, bY = 780;
  tsCard(CX, bY, bW, bH, 'fusBox');
  txt('PHẢN ỨNG HỢP HẠCH (NUCLEAR FUSION)', CX, bY - bH / 2 + 50, 30, PR.navyD, { align: 'center', weight: 800 });

  // Mô hình hợp hạch Hydro -> Heli
  const tMerge = VW('fusion', 'hợp').t0;
  tsFusion(CX, bY + 20, tMerge);

  const tEn = VW('fusion', 'năng').t0;
  prStamp('GIẢI PHÓNG NĂNG LƯỢNG E = mc²', CX, 1180, PR.yellow, tEn, { rot: 0.02, size: 42, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'mortar',
    key: 'f4',
    mood: 'happy',
    look: -12
  });

  prSign('PHẢN ỨNG HỢP HẠCH', { kicker: KICK });
  prChips();
};

// SCENE 5: RADIATE (Line: "Năng lượng đó cuối cùng truyền ra ngoài không gian và chiếu sáng Trái Đất.")
SCENES.radiate = () => {
  prWall(SPACE_D, { streak: 480 });
  tsSky('rad4-sky');
  prFloor(1520, PR.char, { trim: false });

  // Mặt Trời bên trái chiếu luồng ánh sáng tới Trái Đất bên phải
  const mY = 740;
  // Mặt Trời (trái)
  withT(200, mY, 0, 1, () => {
    pp(pE(0, 0, 110, 110), PR.orange, { key: 'rsun' });
    pp(pE(0, 0, 90, 90), PR.yellow, { shadow: false });
  });

  // Luồng sáng vàng nối sang Trái Đất
  const grad = ctx.createLinearGradient(200, 0, 800, 0);
  grad.addColorStop(0, 'rgba(255,220,80,0.45)');
  grad.addColorStop(1, 'rgba(255,220,80,0.12)');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(200, mY - 90); ctx.lineTo(780, mY - 40);
  ctx.lineTo(780, mY + 40); ctx.lineTo(200, mY + 90);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Trái Đất (phải)
  withT(780, mY, 0, 0.85, () => {
    pp(pE(0, 0, 70, 70), PR.blue, { key: 'rearth' });
    pp(pE(-10, 10, 30, 20), PR.green, { shadow: false });
  });

  const tLight = VW('radiate', 'chiếu').t0;
  prStamp('SƯỞI ẤM TRÁI ĐẤT', CX, 1170, PR.green, tLight, { rot: -0.02, size: 46, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'astronaut',
    key: 'f5',
    mood: 'happy',
    look: -14
  });

  prSign('ÁNH SÁNG ĐẾN TRÁI ĐẤT', { kicker: KICK });
  prChips();
};

// SCENE 6: REACTOR (Line: "Mặt Trời chính là một lò phản ứng hạt nhân tự nhiên khổng lồ.")
SCENES.reactor = () => {
  prWall(SPACE_BG, { panel: 'rgba(255,255,255,0.03)', gap: 140 });
  tsSky('reac-sky');
  prFloor(1520, PR.char, { trim: false });

  const bW = 860, bH = 600, bY = 780;
  tsCard(CX, bY, bW, bH, 'reacBox');
  txt('LÒ PHẢN ỨNG HẠT NHÂN VĨ ĐẠI', CX, bY - bH / 2 + 54, 32, PR.navyD, { align: 'center', weight: 800 });

  // Biểu tượng nguyên tử năng lượng hạt nhân (Atom icon)
  prAtom(CX, bY + 20, 180);

  const tReac = VW('reactor', 'lò').t0;
  prStamp('LÒ NHIỆT HẠCH TỰ NHIÊN', CX, 1180, PR.red, tReac, { rot: 0.02, size: 44, from: 1.15 });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'explorer',
    key: 'f6',
    mood: 'happy',
    look: -12
  });

  prSign('LÒ HẠT NHÂN TỰ NHIÊN', { kicker: KICK });
  prChips();
};

// SCENE 7: CTA (Line: "Bạn muốn khám phá lõi Mặt Trời hay lõi Trái Đất tiếp theo?")
SCENES.cta = () => {
  prWall(SPACE_D, { streak: 460 });
  tsSky('cta4-sky');
  prFloor(1520, PR.char, { trim: false });

  // Hai khối cầu đại diện: Lõi Mặt Trời (cam) vs Lõi Trái Đất (xanh)
  withT(CX - 150, 720, 0, 1, () => {
    pp(pE(0, 0, 80, 80), PR.orange, { key: 'csun' });
    txt('MẶT TRỜI', 0, 120, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  withT(CX + 150, 720, 0, 1, () => {
    pp(pE(0, 0, 80, 80), PR.blue, { key: 'cearth' });
    txt('TRÁI ĐẤT', 0, 120, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  const tCta = VW('cta', 'theo?').t0;
  prCommentBox(CX, 1160, 'LÕI MẶT TRỜI HAY TRÁI ĐẤT?', tCta, { hint: 'Bình luận chủ đề bạn muốn xem...' });

  flasky(FLASKY_X, FLASKY_Y, {
    hat: 'party',
    key: 'f7',
    mood: 'happy',
    hold: propTube(-0.2),
    look: -12
  });

  prSign('LÕI MẶT TRỜI HAY TRÁI ĐẤT?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const ERA_BG = ERA_LIST.map(() => SPACE_BG);
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

// CUES CHO SCORE.JS
function SFX_CUES() {
  const qT = (id, w, n = 0) => VW(id, w, n).t0;
  return [
    { k: 'pop', t: qT('hook', 'lửa!') },
    { k: 'chime', t: qT('light', 'sáng') },
    { k: 'pop', t: qT('core', '15') },
    { k: 'thud', t: qT('fusion', 'hợp') },
    { k: 'chime', t: qT('radiate', 'chiếu') },
    { k: 'tick', t: qT('reactor', 'lò') },
    { k: 'pop', t: qT('cta', 'theo?') }
  ];
}
