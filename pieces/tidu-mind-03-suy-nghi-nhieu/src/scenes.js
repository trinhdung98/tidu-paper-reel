// =====================================================================
//  TIDU MIND 03 — "Suy nghĩ nhiều có thực sự giúp giải quyết vấn đề?"
//  Lo lắng lặp lại (repetitive worry) vs suy nghĩ để giải quyết vấn đề.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · LO LẮNG';
const TEAL = '#2e4f4f', TEAL_D = '#355555';
const M3_GREEN = '#4e8268', M3_RED = '#9e5050', M3_INK = '#2a3550';

const SCENES = {};

// a tangled loop of thought (an epitrochoid) drawn as a pen line, turning slowly
function m3Tangle(cx, cy, rx, ry, frac, spin, color = M3_INK) {
  const P = [];
  for (let i = 0; i <= 220; i++) {
    const a = i / 220 * TAU * 3, r = 0.62 + 0.38 * Math.sin(a * 5 / 3 + spin);
    P.push([cx + Math.cos(a + spin) * rx * r, cy + Math.sin(a + spin) * ry * r]);
  }
  chalkLine(P, frac, { color, w: 8 });
}
function m3Paper(x, y, r) {
  pp(() => { for (let i = 0; i < 7; i++) { const a = i / 7 * TAU, rr = r * (0.8 + 0.2 * Math.sin(i * 2.3)); ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.85); } ctx.closePath(); }, PR.cream, { key: 'ball' + x, sb: 8, sy: 4, tex: 0.6 });
}
// a signpost board pointing left (dir -1) or right (dir 1), centred at (x, y)
function m3Board(x, y, w, h, dir, fill, label, color, k) {
  withT(x, y, dir * 0.02, k, () => {
    const hw = w / 2, tip = dir * (hw + 50);
    pp(pG([[-dir * hw, -h / 2], [dir * hw, -h / 2], [tip, 0], [dir * hw, h / 2], [-dir * hw, h / 2]]), fill, { key: 'brd' + label, sb: 14, sy: 7, tex: 0.5 });
    txt(label, 0, 2, fitSize(label, w - 60, 52), color, { align: 'center', base: 'middle', weight: 800 });
  });
}
function m3Floor() {
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
}
function m3Sheet(k, rot = -0.015) {
  withT(540, 880, rot, k, () => {
    pp(pR(-300, -360, 600, 720, 14), PR.paperW, { key: 'sheet', sb: 20, sy: 10, tex: 0.5 });
    pp(pR(-300, -360, 600, 26, 8), PR.pink, { key: 'sheett', shadow: false, tex: 0.4 });
    for (let i = 0; i < 9; i++) pp(pR(-260, -250 + i * 66, 520, 2, 0), '#d8e0e0', { shadow: false, tex: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: a tangled thought cloud over the head while the clock runs three hours
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  m3Floor();
  [[150, 1730, 46], [300, 1770, 38], [450, 1740, 42]].forEach(([x, y, r]) => m3Paper(x, y, r));
  prStar(130, 400, 30, PR.orange);
  prStar(960, 380, 24, PR.pink);

  prThought(540, 640, 780, 380, 900, 1300, '', { key: 'th1' });
  const tA = VW('hook', 'nghĩ').t0;
  m3Tangle(540, 640, 270, 120, ev(tA, 1.4), TT * 0.7);
  txt('?', 540, 650, 120, PR.red, { align: 'center', base: 'middle', weight: 800 });

  const tS = VW('hook', 'suốt').t0, p = EZ.io(ev(tS, 1.2));
  prClock(540, 1100, 140, 9 + 3 * p, (p * 180) % 60, 'clkH');
  prStamp('3 TIẾNG', 540, 1300, PR.red, VW('hook', 'tiếng').t0, { rot: -0.06, size: 52 });
  prCross(660, 985, VW('hook', 'chưa').t0, 48);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT > VW('hook', 'chưa').t0 ? 'flat' : 'neutral', look: -30, key: 'b1' });
  prSign('SUY NGHĨ SUỐT 3 TIẾNG?', { kicker: KICK });
  prChips();
};

SCENES.diff = () => {   // S2: two cards — thinking to solve (a straight arrow to a flag) vs worry going round (a loop)
  prWall(TEAL_D, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(960, 400, 56, 4, 0, 'clk2');
  prStar(110, 400, 30, PR.mustard);
  prStar(80, 1300, 24, PR.pink);

  const tL = VW('diff', 'suy').t0, tR = VW('diff', 'lo').t0;
  withT(320, 860, -0.02, popS(tL), () => {
    pp(pR(-200, -280, 400, 560, 22), M3_GREEN, { key: 'col_solve', sb: 16, sy: 8, tex: 0.5 });
    txt('SUY NGHĨ ĐỂ', 0, -200, fitSize('SUY NGHĨ ĐỂ', 330, 36), PR.creamL, { align: 'center', weight: 800 });
    txt('GIẢI QUYẾT', 0, -148, fitSize('GIẢI QUYẾT', 330, 44), PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-150, -110, 300, 5, 2), PR.creamL, { shadow: false, tex: false });
    const f = ev(VW('diff', 'giải').t0, 0.6);
    chalkLine([[-150, 110], [-50, 110], [20, 40], [56, 40]], f, { color: PR.creamL, w: 18 });
    if (f >= 1) pp(pG([[52, 16], [92, 40], [52, 64]]), PR.creamL, { shadow: false, tex: false });
    pp(pR(118, -90, 10, 200, 4), PR.woodD, { key: 'flagp', sb: 6, sy: 3, tex: 0.4 });
    withT(128, -90, 0, popS(VW('diff', 'quyết').t0), () => pp(pG([[0, 0], [60, 32], [0, 64]]), PR.mustard, { key: 'flag', sb: 6, sy: 3, tex: 0.5 }));
  });
  withT(760, 860, 0.02, popS(tR), () => {
    pp(pR(-200, -280, 400, 560, 22), M3_RED, { key: 'col_worry', sb: 16, sy: 8, tex: 0.5 });
    txt('LO LẮNG', 0, -200, fitSize('LO LẮNG', 330, 36), PR.creamL, { align: 'center', weight: 800 });
    txt('LẶP ĐI LẶP LẠI', 0, -148, fitSize('LẶP ĐI LẶP LẠI', 330, 44), PR.mustard, { align: 'center', weight: 800 });
    pp(pR(-150, -110, 300, 5, 2), PR.creamL, { shadow: false, tex: false });
    const spin = TT > VW('diff', 'lặp').t0 ? (TT - VW('diff', 'lặp').t0) * 4 : 0;
    withT(0, 70, spin, 1, () => {
      ctx.save(); ctx.strokeStyle = PR.creamL; ctx.lineWidth = 18; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(0, 0, 110, -Math.PI * 0.35, Math.PI * 1.45); ctx.stroke(); ctx.restore();
      const a = -Math.PI * 0.35, ax = Math.cos(a) * 110, ay = Math.sin(a) * 110;
      withT(ax, ay, a + Math.PI / 2 + Math.PI, 1, () => pp(pG([[-26, 0], [26, 0], [0, -34]]), PR.creamL, { shadow: false, tex: false }));
    });
    txt('?', 0, 92, 72, PR.creamL, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -25, key: 'b2' });
  prSign('GIẢI QUYẾT HAY LẶP LẠI?', { kicker: KICK });
  prChips();
};

SCENES.solve = () => {   // S3a: solving leads somewhere — a signpost: LỰA CHỌN / HÀNH ĐỘNG
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(960, 400, 56, 4, 30, 'clk3');
  prStar(110, 400, 30, PR.mustard);
  [[110, 1440], [980, 1440]].forEach(([x, y], i) => pp(pG([[x - 30, y + 30], [x - 10, y - 30], [x, y + 10], [x + 14, y - 40], [x + 30, y + 30]]), '#3e7a62', { key: 'grass' + i, sb: 6, sy: 3, tex: 0.5 }));

  pp(pE(540, 1330, 220, 44), '#3e7a62', { key: 'mound', sb: 12, sy: 6, tex: 0.6 });
  pp(pR(526, 560, 28, 770, 8), PR.woodD, { key: 'post', sb: 12, sy: 6, tex: 0.5 });
  withT(540, 560, 0, popS(VW('solve', 'giải').t0), () => {
    pp(pR(-290, -55, 580, 110, 14), PR.creamL, { key: 'plate', sb: 14, sy: 7, tex: 0.5 });
    txt('GIẢI QUYẾT VẤN ĐỀ', 0, 2, fitSize('GIẢI QUYẾT VẤN ĐỀ', 520, 44), PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });
  m3Board(410, 780, 440, 140, -1, PR.mustard, 'LỰA CHỌN', PR.navy, popS(VW('solve', 'lựa').t0));
  m3Board(670, 990, 440, 140, 1, M3_GREEN, 'HÀNH ĐỘNG', PR.creamL, popS(VW('solve', 'hành').t0));
  prBurst(900, 990, VW('solve', 'động').t0, { n: 14 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT > VW('solve', 'hành').t0 ? 'happy' : 'neutral', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('DẪN ĐẾN HÀNH ĐỘNG', { kicker: KICK });
  prChips();
};

SCENES.solve2 = () => {   // S3b: worry runs round a loop back to the same question
  prWall(TEAL_D, { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(110, 400, 30, PR.pink);
  prStar(970, 400, 24, PR.mustard);

  const cx = 540, cy = 880, r = 300, tQ = VW('solve', 'quay').t0;
  const ph = TT > tQ ? (TT - tQ) * 2.2 : 0;
  pp(() => { ctx.arc(cx, cy, r + 20, 0, TAU); ctx.moveTo(cx + r - 20, cy); ctx.arc(cx, cy, r - 20, 0, TAU, true); }, M3_RED, { key: 'ring', sb: 16, sy: 8, tex: 0.5 });
  for (let i = 0; i < 4; i++) {
    const a = ph + i * TAU / 4;
    withT(cx + Math.cos(a) * r, cy + Math.sin(a) * r, a + Math.PI, 1.9, () => pp(pG([[-16, -14], [-16, 14], [14, 0]].map(([u, v]) => [v, -u])), PR.creamL, { shadow: false, tex: false }));
  }
  if (TT > tQ) { const a = ph * 1.3 - Math.PI / 2; pp(pE(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 34, 34), PR.mind, { key: 'marble', sb: 10, sy: 5, tex: 0.5 }); }
  withT(cx, cy - r, 0, popS(VW('solve', 'còn').t0 + 0.1), () => {
    pp(pR(-120, -38, 240, 76, 38), PR.creamL, { key: 'tagLo', sb: 10, sy: 5, tex: 0.45 });
    txt('LO LẮNG', 0, 2, 38, M3_RED, { align: 'center', base: 'middle', weight: 800 });
  });
  withT(cx, cy, 0, popS(VW('solve', 'còn').t0 + 0.3), () => {
    pp(pE(0, 0, 225, 225), PR.paperW, { key: 'qcard', sb: 18, sy: 9, tex: 0.5 });
    const tN = VW('solve', 'nếu').t0;
    if (TT < tN) txt('?', 0, 40, 160, M3_RED, { align: 'center', weight: 800 });
    else {
      txt('Nếu chuyện xấu', 0, -14, 46, PR.navy, { align: 'center', weight: 800, frac: ev(tN, 0.7) });
      if (TT > tN + 0.7) txt('xảy ra thì sao?', 0, 46, 46, PR.navy, { align: 'center', weight: 800, frac: ev(tN + 0.7, 0.8) });
    }
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'flat', look: -25, key: 'b3b' });
  prSign('QUAY LẠI CÙNG CÂU HỎI', { kicker: KICK });
  prChips();
};

SCENES.write = () => {   // S4a: write the problem down on a sheet of paper
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  m3Floor();
  prClock(960, 400, 56, 5, 0, 'clk4');
  prStar(110, 400, 30, PR.pink);

  m3Sheet(popS(VW('write', 'thử').t0));
  const tW = VW('write', 'viết').t0, tE = VW('write', 'giấy').t1;
  let tip = null;
  withT(540, 880, -0.015, 1, () => {
    txt('VẤN ĐỀ CỦA MÌNH', -250, -280, 40, PR.navy, { weight: 800, frac: ev(tW, 0.6) });
    const rows = [[-200, 0.9], [-134, 0.75], [-68, 0.85]], span = (tE - tW - 0.6) / rows.length;
    rows.forEach(([y, len], i) => {
      const f = ev(tW + 0.6 + i * span, span), P = [];
      for (let j = 0; j <= 40; j++) { const u = j / 40; P.push([-250 + u * 500 * len, y + Math.sin(u * 38 + i) * 9 - 12]); }
      chalkLine(P, f, { color: M3_INK, w: 6 });
      if (f > 0 && f < 1) tip = [-250 + f * 500 * len, y - 12];
    });
  });
  const [px, py] = tip ? [540 + tip[0], 880 + tip[1]] : [810, 900];
  withT(px, py, 0.5, 1, () => {
    pp(pR(-14, -230, 28, 200, 3), PR.yellow, { key: 'pcl', sb: 8, sy: 4, tex: 0.4 });
    pp(pG([[-14, -30], [14, -30], [0, 10]]), PR.tan, { shadow: false, tex: 0.4 });
    pp(pR(-14, -250, 28, 26, 4), PR.pink, { shadow: false, tex: 0.4 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', look: -25, key: 'b4' });
  prSign('VIẾT VẤN ĐỀ RA GIẤY', { kicker: KICK });
  prChips();
};

SCENES.write2 = () => {   // S4b: on the same sheet — circle what you can act on, then the smallest next step
  prWall(TEAL_D, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  m3Floor();
  prClock(960, 400, 56, 5, 10, 'clk4b');
  prStar(110, 400, 30, PR.mustard);

  m3Sheet(1);
  const tP = VW('write', 'phần').t0, tT = VW('write', 'tác').t0, tB = VW('write', 'bước').t0, tN = VW('write', 'ngay').t0;
  withT(540, 880, -0.015, 1, () => {
    txt('VẤN ĐỀ CỦA MÌNH', -250, -280, 40, PR.navy, { weight: 800 });
    [[-200, 0.9], [-134, 0.75], [-68, 0.85]].forEach(([y, len], i) => {
      const P = []; for (let j = 0; j <= 40; j++) { const u = j / 40; P.push([-250 + u * 500 * len, y + Math.sin(u * 38 + i) * 9 - 12]); }
      chalkLine(P, 1, { color: 'rgba(42,53,80,0.45)', w: 6 });
    });
    const C = []; for (let j = 0; j <= 64; j++) { const a = -Math.PI / 2 + j / 64 * TAU * 1.04; C.push([Math.cos(a) * 190, 95 + Math.sin(a) * 120]); }
    chalkLine(C, ev(tP, 1.0), { color: '#2e7a52', w: 9 });
    txt('PHẦN MÌNH', 0, 82, 34, '#2e6a48', { align: 'center', weight: 800, frac: ev(tT, 0.4) });
    txt('TÁC ĐỘNG ĐƯỢC', 0, 128, 34, '#2e6a48', { align: 'center', weight: 800, frac: ev(tT + 0.25, 0.5) });
    withT(0, 300, 0.02, popS(tB), () => {
      pp(pR(-250, -52, 500, 104, 6), PR.yellow, { key: 'sticky', sb: 12, sy: 6, tex: 0.5 });
      pp(pR(-222, -24, 48, 48, 6), PR.paperW, { key: 'chkbox', shadow: false, tex: 0.3 });
      txt('BƯỚC NHỎ NHẤT LÀM NGAY', -156, 2, fitSize('BƯỚC NHỎ NHẤT LÀM NGAY', 380, 34), PR.navy, { base: 'middle', weight: 800 });
      if (TT > tN) chalkLine([[-212, 0], [-198, 16], [-170, -18]], ev(tN, 0.25), { color: PR.green, w: 9 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT > tN ? 'happy' : 'neutral', look: -25, key: 'b4b', hold: propPencil(-0.3) });
  prSign('BƯỚC NHỎ NHẤT LÀ GÌ?', { kicker: KICK });
  prChips();
};

SCENES.time = () => {   // S5: a planner page — the unsolved worry is parked in its own time slot
  prWall(TEAL, { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  m3Floor();
  prStar(110, 400, 30, PR.mustard);
  prStar(970, 1300, 24, PR.pink);
  prClock(960, 400, 56, 5, 30, 'clk5');

  const tC = VW('time', 'chưa').t0, tD = VW('time', 'dành').t0, tX = VW('time', 'xem').t0;
  withT(540, 900, 0, popS(VL('time').t0 - 0.05), () => {
    pp(pR(-310, -330, 620, 660, 18), PR.paperW, { key: 'cal', sb: 20, sy: 10, tex: 0.5 });
    pp(pR(-310, -330, 620, 104, 18), PR.navy, { key: 'calh', shadow: false, tex: 0.4 });
    txt('LỊCH CỦA MÌNH', 0, -268, 40, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    [-180, 180].forEach((x) => pp(pR(x - 12, -356, 24, 56, 10), PR.greyD, { key: 'ring' + x, sb: 4, sy: 2, tex: 0.3 }));
    for (let i = 0; i < 6; i++) {
      const y = -200 + i * 88;
      pp(pR(-280, y, 560, 2, 0), '#d8dcdc', { shadow: false, tex: false });
      pp(pE(-250, y + 44, 8, 8), '#b8bcbc', { shadow: false, tex: false });
      if (i !== 3) pp(pR(-210, y + 30, 160 + ((i * 97) % 200), 26, 8), ['#cfe3d8', '#e7d9c3', '#d6d6ee'][i % 3], { key: 'ev' + i, shadow: false, tex: 0.3 });
    }
    withT(20, -200 + 3 * 88 + 44, 0, popS(tD + 0.45), () => {
      pp(pR(-250, -40, 520, 80, 12), PR.mustard, { key: 'slot', sb: 10, sy: 5, tex: 0.5 });
      txt('THỜI GIAN RIÊNG', 10, 2, fitSize('THỜI GIAN RIÊNG', 400, 38), PR.navy, { align: 'center', base: 'middle', weight: 800 });
    });
  });
  const k = 1 - EZ.i2(ev(tD, 0.45));
  if (TT >= tC && k > 0.01) {
    withT(lerp(560, 540, 1 - k), lerp(860, 1008, 1 - k), 0.04 * k, popS(tC) * (0.25 + 0.75 * k), () => {
      pp(pR(-230, -100, 460, 200, 10), PR.creamL, { key: 'worry', sb: 16, sy: 8, tex: 0.5 });
      txt('?', -150, 40, 120, M3_RED, { align: 'center', weight: 800 });
      txt('CHƯA XỬ LÝ', 40, -12, 40, PR.navy, { align: 'center', base: 'middle', weight: 800 });
      txt('ĐƯỢC', 40, 38, 40, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: TT > tD ? 'happy' : 'neutral', look: -20, key: 'b5', hold: TT > tX ? propGlass(-0.5) : null });
  prSign('DÀNH GIỜ RIÊNG XEM XÉT', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: comment box + three answer cards
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(300);
  prStar(110, 1300, 30, PR.mustard);
  prStar(980, 1290, 24, PR.pink);

  const L = VL('cta');
  prCommentBox(CX, 560, 'CÔNG VIỆC? TƯƠNG LAI? QUAN HỆ?', L.t1 + 0.3, { hint: 'Bạn hay nghĩ nhiều nhất về…' });

  const cards = [
    [230, 'CÔNG VIỆC', VW('cta', 'công').t0, () => {
      pp(pR(-46, -150, 92, 44, 16), PR.woodD, { key: 'bch', sb: 6, sy: 3, tex: 0.4 });
      pp(pR(-30, -136, 60, 24, 8), PR.creamL, { shadow: false, tex: false });
      pp(pR(-100, -116, 200, 140, 16), PR.brown, { key: 'bcb', sb: 10, sy: 5, tex: 0.5 });
      pp(pR(-16, -60, 32, 24, 4), PR.mustard, { shadow: false, tex: 0.4 });
    }],
    [540, 'TƯƠNG LAI', VW('cta', 'tương').t0, () => {
      pp(pE(0, -110, 44, 44), PR.mustard, { key: 'sun', sb: 8, sy: 4, tex: 0.4 });
      pp(pG([[-110, 30], [110, 30], [16, -60], [-16, -60]]), PR.greyD, { key: 'road', sb: 8, sy: 4, tex: 0.5 });
      [[-2, 4, 4, 20], [-3, -26, 6, 18]].forEach(([x, y, w, h]) => pp(pR(x, y, w, h, 2), PR.creamL, { shadow: false, tex: false }));
    }],
    [850, 'MỐI QUAN HỆ', VW('cta', 'mối').t0, () => {
      pp(pR(-100, -60, 104, 90, 40), PR.blue, { key: 'p1b', sb: 8, sy: 4, tex: 0.5 });
      pp(pR(-4, -50, 104, 80, 40), PR.orange, { key: 'p2b', sb: 8, sy: 4, tex: 0.5 });
      pp(pE(-48, -106, 36, 36), PR.tan, { key: 'p1h', sb: 8, sy: 4, tex: 0.5 });
      pp(pE(48, -92, 34, 34), PR.tan, { key: 'p2h', sb: 8, sy: 4, tex: 0.5 });
    }],
  ];
  cards.forEach(([x, label, t, icon], i) => {
    withT(x, 960, (i - 1) * 0.02, popS(t), () => {
      pp(pR(-140, -200, 280, 400, 18), PR.creamL, { key: 'opt' + i, sb: 16, sy: 8, tex: 0.5 });
      withT(0, 10, 0, 1, icon);
      txt(label, 0, 140, fitSize(label, 200, 36), PR.navy, { align: 'center', weight: 800 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN HAY NGHĨ VỀ ĐIỀU GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [['solve', 'còn', 0, 'solve2'], ['write', 'phần', 0, 'write2']];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'nghĩ').t0 });
  for (let i = 0; i < 6; i++) cues.push({ k: 'tick', t: VW('hook', 'suốt').t0 + i * 0.2 });
  cues.push({ k: 'thud', t: VW('hook', 'tiếng').t0 + 0.16 });
  cues.push({ k: 'pop', t: VW('diff', 'suy').t0 }, { k: 'pop', t: VW('diff', 'lo').t0 });
  cues.push({ k: 'pop', t: VW('solve', 'lựa').t0 }, { k: 'pop', t: VW('solve', 'hành').t0 });
  cues.push({ k: 'pop', t: VW('solve', 'câu').t0 });
  cues.push({ k: 'pop', t: VW('write', 'thử').t0 });
  cues.push({ k: 'type', t: VW('write', 'viết').t0 + 0.6, n: 10, d: 1.2 });
  cues.push({ k: 'pop', t: VW('write', 'bước').t0 }, { k: 'tick', t: VW('write', 'ngay').t0 });
  cues.push({ k: 'pop', t: VW('time', 'chưa').t0 }, { k: 'chime', t: VW('time', 'dành').t0 + 0.35 });
  cues.push({ k: 'pop', t: VW('cta', 'công').t0 }, { k: 'pop', t: VW('cta', 'tương').t0 }, { k: 'pop', t: VW('cta', 'mối').t0 });
  cues.push({ k: 'type', t: VL('cta').t1 + 0.3, n: 12, d: 0.45 });
  return cues;
}
const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const ERA_BG = ERA_LIST.map(() => TEAL);
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
