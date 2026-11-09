
// =====================================================================
//  TIDU MIND 01 — "Vì sao bạn nghĩ ai cũng đang nhìn mình?"
//  Hiệu ứng ánh đèn sân khấu (Spotlight Effect) — Tâm lý xã hội.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · TÂM LÝ HỌC';
const TEAL  = '#2e4f4f';
const TEAL_L = '#3d6b6b';
const CHALK_C = 'rgba(244,244,236,0.92)';
const M1_SKIN = ['#f0d2b4', '#d9a77f', '#e8c4a0', '#c08a62'];
const M1_SHIRT = [PR.blue, PR.orange, '#5a7a6a', PR.plum, PR.mustard, TEAL_L];
const M1_HAIR = [PR.char, PR.brown, '#3a2a20', PR.greyD];

const SCENES = {};

// ---- CUSTOM HELPERS ----

// Đèn sân khấu spotlight hình tròn gradient từ trên chiếu xuống
function tmSpotlight(cx, cy, r, alpha = 1) {
  if (r <= 1) return;
  const grad = ctx.createRadialGradient(cx, cy - r * 0.3, r * 0.05, cx, cy, r);
  grad.addColorStop(0, `rgba(255,230,120,${0.55 * alpha})`);
  grad.addColorStop(0.55, `rgba(255,220,80,${0.18 * alpha})`);
  grad.addColorStop(1, 'rgba(255,220,80,0)');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 0.72, r, 0, 0, TAU);
  ctx.fill();
  ctx.restore();
}

// Một người giấy: (x, y) là tâm đầu; (dx, dy) là hướng nhìn của con ngươi (-1..1)
function m1Person(x, y, s, i, dx = 0, dy = 0, key = 'p') {
  withT(x, y, 0, s, () => {
    pp(pR(-78, 46, 156, 200, 64), M1_SHIRT[i % M1_SHIRT.length], { key: key + 'b' + i, sb: 12, sy: 6, tex: 0.55 });
    pp(pE(0, 0, 58, 62), M1_SKIN[i % M1_SKIN.length], { key: key + 'h' + i, sb: 10, sy: 5, tex: 0.45 });
    pp(() => ctx.ellipse(0, -16, 61, 50, 0, Math.PI, TAU), M1_HAIR[i % M1_HAIR.length], { key: key + 'hr' + i, shadow: false, tex: 0.5 });
    [-22, 22].forEach((ex) => {
      pp(pE(ex, 8, 15, 17), PR.paperW, { key: key + 'e' + i + ex, shadow: false, tex: 0.3 });
      pp(pE(ex + dx * 6, 8 + dy * 7, 8, 8), PR.ink, { shadow: false, tex: false });
    });
  });
}

// Hướng nhìn từ (x, y) tới (tx, ty), chuẩn hoá về -1..1
function m1Gaze(x, y, tx, ty) {
  const d = Math.hypot(tx - x, ty - y) || 1;
  return [(tx - x) / d, (ty - y) / d];
}

// Áo phông giấy treo trên móc; (x, y) là tâm áo
function m1Shirt(x, y, s, key = 'shirt') {
  withT(x, y, 0, s, () => {
    ctx.save(); ctx.strokeStyle = PR.greyD; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, -196); ctx.lineTo(0, -232); ctx.arc(14, -232, 14, Math.PI, TAU); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-150, -150); ctx.lineTo(0, -196); ctx.lineTo(150, -150); ctx.stroke(); ctx.restore();
    pp(pG([[-90, -200], [-230, -130], [-180, -30], [-130, -60], [-130, 200], [130, 200], [130, -60], [180, -30], [230, -130], [90, -200], [48, -176], [-48, -176]]),
      PR.sky, { key: key + 'body', sb: 16, sy: 8, tex: 0.55 });
    pp(pG([[-48, -176], [0, -120], [48, -176], [30, -186], [0, -146], [-30, -186]]), PR.blue, { key: key + 'col', shadow: false, tex: 0.5 });
  });
}

// Vết bẩn giấy; k = độ lớn (0..1)
function m1Stain(x, y, k, key = 'stain') {
  if (k <= 0.01) return;
  withT(x, y, 0.2, k, () => {
    pp(pE(0, 0, 46, 36), '#7a4a22', { key: key + 'a', sb: 4, sy: 2, tex: 0.7 });
    pp(pE(34, 22, 16, 13), '#7a4a22', { key: key + 'b', shadow: false, tex: 0.7 });
    pp(pE(-38, -20, 12, 10), '#7a4a22', { key: key + 'c', shadow: false, tex: 0.7 });
    pp(pE(-6, 44, 9, 8), '#7a4a22', { key: key + 'd', shadow: false, tex: 0.7 });
  });
}

// Vòng đỏ khoanh quanh một chỗ, vẽ dần theo frac
function m1Ring(x, y, rx, ry, frac) {
  if (frac <= 0) return;
  ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, -0.15, -Math.PI / 2, -Math.PI / 2 + TAU * 1.05 * clamp(frac)); ctx.stroke(); ctx.restore();
}

// Cây đèn sân khấu treo từ trần, chúc xuống về phía (tx, ty)
function m1Lamp(x, y, tx, ty, power) {
  const a = Math.atan2(ty - y, tx - x) - Math.PI / 2;
  if (power > 0.01) {
    ctx.save(); ctx.fillStyle = `rgba(255,226,130,${0.3 * power})`;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * 70, y + Math.sin(a) * 70);
    ctx.lineTo(x - Math.cos(a) * 70, y - Math.sin(a) * 70);
    ctx.lineTo(tx - 290, ty); ctx.lineTo(tx + 290, ty); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  pp(pR(x - 10, 300, 20, y - 300, 4), PR.char, { key: 'lamprod', sb: 8, sy: 4, tex: 0.4 });
  pp(pR(x - 60, y - 34, 120, 40, 10), PR.greyD, { key: 'lampyoke', sb: 8, sy: 4, tex: 0.5 });
  withT(x, y, a, 1, () => {
    pp(pG([[-120, -40], [120, -40], [80, 120], [-80, 120]]), PR.char, { key: 'lampbody', sb: 16, sy: 8, tex: 0.5 });
    pp(pE(0, 120, 82, 22), power > 0.4 ? '#ffe9a0' : PR.cream, { key: 'lamplens', shadow: false, tex: 0.3 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: bước vào phòng; mọi ánh mắt quay về phía mình
  const t0 = E0, tLook = VW('hook', 'nhìn').t0, tAll = VW('hook', 'tất').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1480, PR.woodD, { studs: false });
  pp(pR(60, 1450, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });

  pp(pR(-10, 300, 160, 1200, 0), '#6b1a1a', { key: 'curtainL', sb: 20, sy: 10, tex: 0.7 });
  pp(pR(W - 150, 300, 160, 1200, 0), '#6b1a1a', { key: 'curtainR', sb: 20, sy: 10, tex: 0.7 });
  prStar(CX, 380, 50, PR.mustard);
  prStar(260, 420, 30, PR.orange);
  prStar(820, 420, 30, PR.pink);

  const walkX = springMove(t0 + 0.2, 100, BRAINY_X, { stiff: 90, damp: 14 });
  tmSpotlight(walkX, 1500, 600 * ev(tAll, 0.8));

  // cả phòng: lúc đầu ai nhìn hướng nấy, đến chữ "nhìn" thì mọi ánh mắt quay về mình
  const turn = EZ.o3(ev(tLook - 0.1, 0.35));
  const seats = [[230, 720, 0.95], [385, 700, 0.95], [540, 720, 0.95], [695, 700, 0.95], [850, 720, 0.95],
                 [310, 1030, 1.1], [460, 1010, 1.1], [620, 1030, 1.1], [770, 1010, 1.1]];
  seats.forEach(([x, y, s], i) => {
    const R = RNG('m1seat', i), own = [R.r(-1, 1), R.r(-0.8, 0.3)];
    const [gx, gy] = m1Gaze(x, y, walkX, 1600);
    m1Person(x, y, s, i, lerp(own[0], gx, turn), lerp(own[1], gy, turn), 'hk');
  });

  brainy(walkX, BRAINY_Y, { hat: 'detective', mood: TT > tLook ? 'flat' : 'neutral', look: -20, key: 'b1', walk: TT < t0 + 1.4 });
  prSign('TẤT CẢ ĐANG NHÌN MÌNH?', { kicker: KICK });
  prChips();
};

SCENES.feel = () => {   // S2a: vết bẩn trên áo, câu nói lỡ lời
  const tStain = VW('feel', 'vết').t0, tSlip = VW('feel', 'câu').t0;
  prWall(TEAL, { streak: 580 });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb2', sb: 10, sy: 5, tex: 0.6 });

  prClock(960, 500, 70, 11, 48, 'clk2');
  prNote(160, 520, 120, 140, '#f3e3a5', -0.06, 'note2');
  prStar(150, 1000, 30, PR.mustard);

  m1Shirt(CX, 770, 1.15, 'sh2');
  m1Stain(CX + 50, 800, popS(tStain), 'st2');
  prBurst(CX + 50, 800, tStain);
  m1Ring(CX + 50, 800, 110, 90, ev(VW('feel', 'áo').t0, 0.5));

  prSpeech(CX, 1180, 600, 160, 780, 1420, 'LỠ LỜI…', { t: tSlip, key: 'sp2', size: 72 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT > tStain ? 'flat' : 'neutral', look: -30, key: 'b2' });
  prSign('VẾT BẨN, LỠ LỜI', { kicker: KICK });
  prChips();
};

SCENES.feel2 = () => {   // S2b: mình nhớ mãi — người khác đã quên ngay
  const t0 = E0, tRem = VW('feel', 'nhớ').t0, tOth = VW('feel', 'người').t0, tFor = VW('feel', 'quên').t0;
  prWall('#294646', { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb2b', sb: 10, sy: 5, tex: 0.6 });

  prThought(CX, 630, 780, 320, 800, 1400, '', { t: t0 + 0.05, key: 'th2' });
  if (popS(t0 + 0.05) > 0.6) {
    m1Shirt(390, 650, 0.48, 'mini');
    m1Stain(390 + 24, 664, 0.48, 'ministain');
    txt('LỠ LỜI…', 650, 650, 54, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  }
  prStamp('NHỚ MÃI', CX, 800, PR.red, tRem, { rot: -0.06, size: 56 });

  // người khác: bong bóng nhỏ có vết bẩn, mờ đi khi "quên"
  const fade = 1 - ev(tFor, 0.5);
  [[200, 1110], [360, 1090], [520, 1110]].forEach(([x, y], i) => {
    m1Person(x, y, 0.85 * popS(tOth + i * 0.08), i + 2, i === 1 ? -0.8 : 0.8, -0.2, 'oth');
    const k = popS(tOth + 0.15 + i * 0.08);
    if (k > 0.01) {
      pp(pE(x, 975, 58 * k, 40 * k), PR.creamL, { key: 'oc' + i, sb: 8, sy: 4, tex: 0.4 });
      if (fade > 0.01) { ctx.save(); ctx.globalAlpha = fade; m1Stain(x, 975, 0.38 * k, 'os' + i); ctx.restore(); }
    }
  });
  prStamp('ĐÃ QUÊN', 360, 1250, PR.greyD, tFor, { rot: 0.05, size: 54 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b2b' });
  prSign('MÌNH NHỚ, HỌ ĐÃ QUÊN', { kicker: KICK });
  prChips();
};

SCENES.explain = () => {   // S3: tên hiện tượng trên bảng
  const t0 = E0;
  prWall('#3a5a5a', { streak: 300, panel: 'rgba(255,255,255,0.04)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(280);

  prBoard(150, 430, 780, 640, 'board3');
  const tA = VW('explain', 'hiệu').t0, tB = VW('explain', 'ánh').t0, tC = VW('explain', 'sân').t0;
  txt('HIỆU ỨNG', CX, 590, 76, CHALK_C, { align: 'center', frac: ev(tA, 0.5) });
  txt('ÁNH ĐÈN', CX, 690, 76, CHALK_C, { align: 'center', frac: ev(tB, 0.4) });
  txt('SÂN KHẤU', CX, 790, 76, CHALK_C, { align: 'center', frac: ev(tC, 0.4) });
  // chiếc đèn phấn chiếu xuống một người nhỏ
  const tL = VW('explain', 'khấu').t0 + 0.2;
  chalkLine([[500, 850], [580, 850], [600, 890], [480, 890], [500, 850]], ev(tL, 0.4));
  chalkLine([[480, 900], [420, 1010]], ev(tL + 0.3, 0.3), { dash: [14, 12] });
  chalkLine([[600, 900], [660, 1010]], ev(tL + 0.3, 0.3), { dash: [14, 12] });
  chalkLine([[540, 975], [540, 1010], [522, 1035], [540, 1010], [558, 1035]], ev(tL + 0.5, 0.3));
  if (TT > tL + 0.5) pp(pE(540, 960, 14, 14), 'rgba(244,244,236,0.85)', { shadow: false, tex: false });

  tmSpotlight(BRAINY_X, 1500, 460 * clamp(1 - ev(t0 + 1.0, 1.5)));
  prClock(160, 1200, 60, 10, 15, 'clk3');
  prStar(880, 1180, 28, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -20, key: 'b3', hold: propNotebook(0.1) });
  prSign('HIỆU ỨNG ÁNH ĐÈN', { kicker: KICK });
  prChips();
};

SCENES.science = () => {   // S4a: đánh giá quá cao mức người khác chú ý
  const tOver = VW('science', 'đánh').t0, tHigh = VW('science', 'cao').t0, tAtt = VW('science', 'chú').t0;
  prWall(TEAL, { streak: 460, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  withT(CX, 860, 0, popS(E0 + 0.1), () => {
    pp(pR(-380, -330, 760, 660, 24), PR.creamL, { key: 'chart', sb: 16, sy: 8, tex: 0.5 });
    const title = 'NGƯỜI KHÁC CHÚ Ý ĐẾN MÌNH';
    txt(title, 0, -250, fitSize(title, 660, 40), PR.navy, { align: 'center', weight: 800 });
    const h1 = 400 * EZ.o3(ev(tOver, 0.9)), h2 = 190 * EZ.o3(ev(tAtt, 0.6));
    if (h1 > 1) pp(pR(-270, 230 - h1, 200, h1, 10), PR.red, { key: 'bar1', sb: 10, sy: 5, tex: 0.5 });
    if (h2 > 1) pp(pR(70, 230 - h2, 200, h2, 10), PR.green, { key: 'bar2', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-320, 228, 640, 8, 4), PR.navy, { shadow: false, tex: false });
    txt('MÌNH TƯỞNG', -170, 285, 32, PR.navy, { align: 'center', weight: 800 });
    txt('THẬT RA', 170, 285, 32, PR.navy, { align: 'center', weight: 800 });
  });
  prStamp('QUÁ CAO', CX - 170, 900, PR.navy, tHigh, { rot: -0.12, size: 50 });

  prStar(170, 1300, 32, PR.mustard);
  prStar(940, 1240, 26, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT > tHigh ? 'wow' : 'neutral', key: 'b4', look: -20 });
  prSign('ĐÁNH GIÁ QUÁ CAO', { kicker: KICK });
  prChips();
};

SCENES.science2 = () => {   // S4b: thực tế họ bận chuyện của chính họ
  const tOwn = VW('science', 'chính').t0;
  prWall('#335656', { streak: 640, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const cells = [
    { x: 230, label: 'NHẮN TIN', col: '#3d6b6b', t: VW('science', 'họ').t0, prop: 'phone' },
    { x: CX,  label: 'UỐNG CÀ PHÊ', col: PR.orange, t: VW('science', 'bận').t0, prop: 'cup' },
    { x: 850, label: 'ĐỌC SÁCH', col: '#5a4a7a', t: VW('science', 'cuộc').t0, prop: 'book' },
  ];
  cells.forEach(({ x, label, col, t, prop }, i) => {
    withT(x, 860, (i - 1) * 0.02, popS(t), () => {
      pp(pR(-140, -230, 280, 460, 20), col, { key: 'cell' + i, sb: 14, sy: 7, tex: 0.5 });
      m1Person(0, -90, 0.95, i + 1, 0, 1, 'sc');
      if (prop === 'phone') {
        pp(pR(-34, 6, 68, 104, 10), PR.char, { key: 'cph', sb: 8, sy: 4, tex: 0.4 });
        pp(pR(-26, 14, 52, 80, 6), PR.sky, { shadow: false, tex: 0.3 });
      } else if (prop === 'cup') {
        pp(pR(-38, 20, 76, 86, 12), PR.creamL, { key: 'ccup', sb: 8, sy: 4, tex: 0.4 });
        ctx.save(); ctx.strokeStyle = PR.creamL; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(42, 58, 20, -Math.PI / 2, Math.PI / 2); ctx.stroke();
        ctx.strokeStyle = 'rgba(244,241,232,0.7)'; ctx.lineWidth = 6; ctx.lineCap = 'round';
        [-14, 14].forEach((sx) => { const w = Math.sin(TT * 4 + sx) * 6; ctx.beginPath(); ctx.moveTo(sx, 10); ctx.quadraticCurveTo(sx + 10 + w, -6, sx, -22); ctx.stroke(); });
        ctx.restore();
      } else {
        pp(pG([[0, 30], [-96, 14], [-96, 104], [0, 120]]), PR.paperW, { key: 'cbk1', sb: 8, sy: 4, tex: 0.4 });
        pp(pG([[0, 30], [96, 14], [96, 104], [0, 120]]), PR.cream, { key: 'cbk2', sb: 8, sy: 4, tex: 0.4 });
      }
      txt(label, 0, 185, fitSize(label, 240, 32), PR.creamL, { align: 'center', weight: 800 });
    });
    tmSpotlight(x, 820, 300 * ev(tOwn, 0.5), 0.7);
  });

  prClock(960, 1360, 56, 3, 25, 'clk4');
  prStar(150, 1300, 30, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', key: 'b4b', hold: propGlass(0.15) });
  prSign('HỌ BẬN CHUYỆN RIÊNG', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5a: khi thấy ngượng ngùng, hãy tự hỏi
  const tShy = VW('reframe', 'ngượng').t0, tAsk = VW('reframe', 'hỏi').t0;
  prWall('#2a4747', { streak: 200, panel: 'rgba(255,255,255,0.025)' });
  prFloor(1500, PR.woodD, { studs: false });

  m1Lamp(CX, 520, BRAINY_X, 1500, ev(E0 + 0.1, 0.4));
  tmSpotlight(BRAINY_X, 1500, 560);

  // giọt mồ hôi ngượng ngùng
  [[700, 1330, 0], [1000, 1300, 0.15]].forEach(([x, y, d], i) => {
    const k = popS(tShy + d);
    if (k > 0.01) withT(x, y + Math.sin(TT * 5 + i) * 6, 0, k, () => pp(() => { ctx.moveTo(0, -36); ctx.quadraticCurveTo(26, 0, 0, 22); ctx.quadraticCurveTo(-26, 0, 0, -36); }, PR.sky, { key: 'drop' + i, sb: 6, sy: 3, tex: 0.3 }));
  });

  prThought(330, 1060, 340, 230, 700, 1420, '?', { t: tAsk, key: 'thq', size: 120 });

  prClock(160, 520, 64, 9, 55, 'clk5');
  prStar(900, 640, 30, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', key: 'b5', look: -30 });
  prSign('KHI THẤY NGƯỢNG NGÙNG', { kicker: KICK });
  prChips();
};

SCENES.reframe2 = () => {   // S5b: ánh đèn có chiếu mạnh như mình tưởng?
  const t0 = E0, tLight = VW('reframe', 'ánh').t0, tStrong = VW('reframe', 'mạnh').t0;
  prWall(TEAL, { streak: 760, panel: 'rgba(255,255,255,0.025)' });
  prFloor(1500, PR.woodD, { studs: false });

  const slide = EZ.o3(ev(tStrong, 0.9));
  tmSpotlight(BRAINY_X, 1500, 600 * lerp(1, 0.4, slide));

  prThought(CX, 640, 800, 360, CX, 640, '', { t: t0 + 0.05, key: 'th5' });
  [[920, 1330, 12], [945, 1210, 18], [960, 1070, 26]].forEach(([x, y, r], i) => {
    const k = popS(t0 + 0.05 + i * 0.06);
    if (k > 0.01) pp(pE(x, y, r * k, r * k), PR.creamL, { key: 'th5d' + i, sb: 8, sy: 4, tex: 0.4 });
  });
  if (popS(t0 + 0.05) > 0.6) {
    const lines = ['MÌNH CÓ ĐANG', 'TƯỞNG TƯỢNG ÁNH ĐÈN', 'QUÁ MẠNH?'];
    const sz = Math.min(...lines.map((l) => fitSize(l, 600, 56)));
    lines.forEach((l, i) => txt(l, CX, 570 + i * 72, sz, PR.navy, { align: 'center', base: 'middle', weight: 800 }));
  }

  // núm chỉnh độ sáng: kéo từ MẠNH về giữa
  withT(CX, 1090, 0, popS(tLight), () => {
    pp(pR(-290, -100, 580, 200, 24), PR.char, { key: 'dim', sb: 14, sy: 7, tex: 0.5 });
    txt('ÁNH ĐÈN', 0, -48, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    pp(pR(-230, 2, 460, 16, 8), PR.greyD, { shadow: false, tex: 0.3 });
    const kx = lerp(210, -20, slide);
    pp(pR(-230, 2, kx + 230, 16, 8), PR.mustard, { shadow: false, tex: 0.3 });
    pp(pR(kx - 22, -26, 44, 72, 12), PR.yellow, { key: 'knob', sb: 8, sy: 4, tex: 0.4 });
    txt('YẾU', -230, 70, 24, PR.creamL, { align: 'left', base: 'middle', weight: 800 });
    txt('MẠNH', 230, 70, 24, PR.creamL, { align: 'right', base: 'middle', weight: 800 });
  });

  prStar(150, 1300, 30, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: TT > tStrong + 0.9 ? 'happy' : 'neutral', key: 'b5b', look: -30 });
  prSign('ÁNH ĐÈN CÓ QUÁ MẠNH?', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: comment box CTA
  const tSit = VW('cta', 'tình').t0, tTell = VW('cta', 'kể').t0;
  prWall(TEAL, { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(190, 420, 36, PR.mustard);
  prStar(880, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'CÂU CHUYỆN CỦA BẠN', tTell, { hint: 'Kể một câu chuyện nhé…' });

  // các bình luận kể chuyện khác (giấy, không chữ)
  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(tSit + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.orange, PR.blue][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      pp(pR(-205, -30, 380 - i * 60, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
      pp(pR(-205, 10, 280 + i * 40, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('KỂ CHO MÌNH NGHE NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['feel', 'và', 0, 'feel2'],
  ['science', 'thực', 0, 'science2'],
  ['reframe', 'mình', 0, 'reframe2'],
];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('feel', 'vết').t0 });
  cues.push({ k: 'pop', t: VW('feel', 'câu').t0 });
  cues.push({ k: 'thud', t: VW('feel', 'nhớ').t0 });
  cues.push({ k: 'thud', t: VW('feel', 'quên').t0 });
  ['hiệu', 'ánh', 'sân'].forEach((w) => cues.push({ k: 'tick', t: VW('explain', w).t0 }));
  cues.push({ k: 'thud', t: VW('science', 'cao').t0 });
  ['họ', 'bận', 'cuộc'].forEach((w) => cues.push({ k: 'pop', t: VW('science', w).t0 }));
  cues.push({ k: 'chime', t: VW('reframe', 'hỏi').t0 });
  cues.push({ k: 'tick', t: VW('reframe', 'mạnh').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'tình').t0 });
  cues.push({ k: 'type', t: VW('cta', 'kể').t0, n: 16, d: 0.45 });
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
