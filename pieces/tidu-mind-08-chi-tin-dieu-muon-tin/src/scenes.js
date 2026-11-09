// =====================================================================
//  TIDU MIND 08 — "Vì sao chúng ta chỉ tin những điều mình muốn tin?"
//  Thiên kiến xác nhận (Confirmation Bias).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THIÊN KIẾN';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

function m8Stroke(fn, col, lw) {
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); fn(); ctx.stroke(); ctx.restore();
}
// a drawn tick: Be Vietnam Pro has no tick glyph
const m8Tick = (x, y, s, col) => m8Stroke(() => { ctx.moveTo(x - s * 0.45, y); ctx.lineTo(x - s * 0.1, y + s * 0.35); ctx.lineTo(x + s * 0.5, y - s * 0.35); }, col, s * 0.22);
function m8Tag(cx, cy, w, h, str, fill = PR.creamL, ink = PR.navy, size = 34, key = 'm8tag') {
  pp(pR(cx - w / 2, cy - h / 2, w, h, 10), fill, { key: key + str, sb: 10, sy: 5, tex: 0.45 });
  txt(str, cx, cy + 2, fitSize(str, w - 36, size), ink, { align: 'center', base: 'middle', weight: 800 });
}
// a paper article: a header strip with a title, grey text lines, an optional badge (tick / cross) in the corner
function m8Paper(w, h, title, head, o = {}) {
  pp(pR(-w / 2, -h / 2, w, h, 10), o.fill ?? PR.paperW, { key: 'm8pa' + title + (o.key ?? ''), sb: 12, sy: 6, tex: 0.4 });
  pp(pR(-w / 2, -h / 2, w, 64, 10), head, { key: 'm8ph' + title + (o.key ?? ''), shadow: false, tex: 0.4 });
  txt(title, 0, -h / 2 + 34, fitSize(title, w - 120, 30), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  for (let i = 0; i < (o.sub && h < 300 ? 2 : 3); i++) pp(pR(-w / 2 + 28, -h / 2 + 92 + i * 30, (w - 56) * (i === 2 ? 0.6 : 1), 12, 6), 'rgba(40,40,60,0.18)', { shadow: false, tex: false });
  if (o.sub) txt(o.sub, 0, h / 2 - 30, fitSize(o.sub, w - 50, 30), o.subC ?? PR.char, { align: 'center', base: 'middle', weight: 800 });
}
// a small shelf of books (background life)
function m8Shelf(x, y, key) {
  pp(pR(x - 110, y, 220, 18, 4), PR.wood, { key: key + 'sh', sb: 8, sy: 4, tex: 0.5 });
  [[PR.red, 34, 110], [PR.blue, 28, 96], [PR.mustard, 38, 120], [PR.green, 30, 100]].forEach(([c, bw, bh], i) => pp(pR(x - 96 + i * 46, y - bh, bw, bh, 4), c, { key: key + 'bk' + i, sb: 6, sy: 3, tex: 0.5 }));
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Tìm sự thật hay chỉ tìm bằng chứng để mình đúng? (a search box)
  const W1 = (w, n) => VW('hook', w, n).t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prClock(930, 1200, 56, 3, 30, 'clk1');
  prStar(140, 400, 30, PR.mustard);
  prStar(930, 400, 24, PR.pink);
  m8Shelf(190, 1300, 'm8s1');

  // the search bar: the query types on, then is rewritten on "hay"
  const th = W1('hay'), q1 = 'sự thật là gì?', q2 = 'bằng chứng mình đúng';
  const q = TT < th ? q1.slice(0, Math.floor(q1.length * ev(W1('tìm'), 0.5))) : q2.slice(0, Math.floor(q2.length * ev(W1('tìm', 1), 0.7)));
  pp(pR(90, 450, 900, 120, 60), PR.paperW, { key: 'm8bar', sb: 16, sy: 8, tex: 0.4 });
  pp(pE(170, 504, 30, 30), PR.navy, { key: 'm8mg', shadow: false, tex: 0.3 });
  pp(pE(170, 504, 19, 19), PR.paperW, { key: 'm8mgi', shadow: false, tex: false });
  m8Stroke(() => { ctx.moveTo(192, 528); ctx.lineTo(214, 552); }, PR.navy, 10);
  const tw = txt(q, 240, 512, 46, PR.char, { base: 'middle', weight: 800 });
  if (Math.floor(TT * 2.4) % 2 === 0) pp(pR(246 + tw, 486, 5, 52, 2), PR.orange, { shadow: false, tex: false });

  // results: grey placeholders for the honest query, all-agreeing hits for the second one
  const tb = W1('bằng');
  [['BẠN NÓI ĐÚNG', W1('chứng')], ['ĐÚNG NHƯ BẠN NGHĨ', W1('minh')], ['CHẮC CHẮN LÀ ĐÚNG', W1('đúng')]].forEach(([s, t], i) => {
    const y = 700 + i * 190;
    if (TT < tb) {
      if (TT < W1('sự') + i * 0.2) return;
      pp(pR(130, y - 75, 820, 150, 16), 'rgba(249,248,244,0.55)', { key: 'm8ph' + i, sb: 10, sy: 5, tex: 0.4 });
      pp(pR(170, y - 40, 480, 20, 8), 'rgba(40,40,60,0.18)', { shadow: false, tex: false });
      pp(pR(170, y + 10, 640, 16, 8), 'rgba(40,40,60,0.12)', { shadow: false, tex: false });
      return;
    }
    const k = popS(t); if (k <= 0.01) return;
    withT(540, y, i % 2 ? 0.015 : -0.015, k, () => {
      pp(pR(-410, -75, 820, 150, 16), PR.paperW, { key: 'm8res' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-330, 0, 46, 46), PR.green, { key: 'm8rt' + i, sb: 6, sy: 3, tex: 0.4 });
      m8Tick(-330, 0, 56, PR.creamL);
      txt(s, 40, 2, fitSize(s, 580, 48), PR.green, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  const tE = W1('đúng');
  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT < tE ? 'neutral' : 'wow', look: -30, key: 'b1' });
  prSign('SỰ THẬT HAY MÌNH ĐÚNG?', { kicker: KICK });
  prChips();
};

SCENES.bias = () => {   // S2a: Giả sử bạn tin một phương pháp học rất hiệu quả
  const W2 = (w, n) => VW('bias', w, n).t0;
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(930, 1200, 56, 3, 45, 'clk2');
  m8Shelf(190, 1300, 'm8s2');
  prStar(140, 400, 26, PR.pink);

  // an open study book
  const k = popS(E0 + 0.15);
  if (k > 0.01) withT(540, 900, 0, k, () => {
    pp(pR(-410, -250, 820, 500, 16), PR.navy, { key: 'm8cover', sb: 18, sy: 9, tex: 0.5 });
    pp(pR(-390, -232, 384, 466, 8), PR.paperW, { key: 'm8pl', shadow: false, tex: 0.35 });
    pp(pR(6, -232, 384, 466, 8), PR.paperW, { key: 'm8pr', shadow: false, tex: 0.35 });
    pp(pR(-6, -240, 12, 480, 4), 'rgba(0,0,0,0.18)', { shadow: false, tex: false });
    if (TT >= W2('phương')) {
      txt('PHƯƠNG PHÁP', -198, -140, fitSize('PHƯƠNG PHÁP', 330, 50), PR.navy, { align: 'center', base: 'middle', weight: 800 });
      txt('HỌC MỚI', -198, -78, 50, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    }
    for (let i = 0; i < 4; i++) pp(pR(-350, 10 + i * 46, i === 3 ? 180 : 300, 14, 7), 'rgba(40,40,60,0.18)', { shadow: false, tex: false });
    for (let i = 0; i < 7; i++) pp(pR(46, -180 + i * 52, i % 3 === 2 ? 200 : 300, 14, 7), 'rgba(40,40,60,0.18)', { shadow: false, tex: false });
    if (TT >= W2('tin')) pp(pR(40, -128, 300 * ev(W2('tin'), 0.5), 30, 6), 'rgba(242,201,76,0.6)', { shadow: false, tex: false });
  });
  // five stars land on "rất hiệu quả"
  for (let i = 0; i < 5; i++) {
    const s = popS(W2('rất') + i * 0.1); if (s <= 0.01) continue;
    withT(340 + i * 100, 560, 0, s, () => prStar(0, 0, 44, PR.mustard));
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT < W2('hiệu') ? 'neutral' : 'happy', look: -35, key: 'b2' });
  prSign('BẠN TIN MỘT CÁCH HỌC', { kicker: KICK });
  prChips();
};

SCENES.bias2 = () => {   // S2b: Đọc bài khen ngợi, bỏ qua nghiên cứu có kết quả khác
  const W2 = (w, n) => VW('bias', w, n).t0;
  prWall(TEAL, { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 400, 26, PR.mustard);
  prStar(940, 400, 22, PR.pink);
  m8Shelf(190, 1330, 'm8s3');

  m8Tag(330, 460, 360, 64, 'BẠN ĐỌC', PR.green, PR.creamL, 34, 'm8l');
  m8Tag(750, 460, 360, 64, 'BẠN BỎ QUA', PR.greyD, PR.creamL, 34, 'm8r');
  [['đọc', 620], ['khen', 835], ['ngợi', 1050]].forEach(([w, y], i) => {
    const k = popS(W2(w)); if (k <= 0.01) return;
    withT(330, y, [-0.04, 0.03, -0.02][i], k, () => {
      m8Paper(360, 200, 'BÀI KHEN NGỢI', PR.green, { key: i, sub: 'Rất hiệu quả!', subC: PR.green });
      pp(pE(160, -90, 40, 40), PR.green, { key: 'm8bt' + i, sb: 6, sy: 3, tex: 0.4 });
      m8Tick(160, -90, 48, PR.creamL);
    });
  });
  // the studies with a different result get pushed aside and dimmed
  const tb = W2('bỏ'), dim = ev(tb, 0.4);
  [[640, 'a'], [860, 'b']].forEach(([y, key], i) => {
    const k = popS(W2('nhưng') + i * 0.12); if (k <= 0.01) return;
    ctx.save(); ctx.globalAlpha = 1 - 0.45 * dim;
    withT(750 + 30 * dim, y + 20 * dim, (i ? 0.05 : -0.03) + 0.1 * dim, k, () => m8Paper(360, 200, 'NGHIÊN CỨU', PR.blue, { key, sub: 'Kết quả khác', subC: PR.blue }));
    ctx.restore();
  });
  prStamp('BỎ QUA', 750, 1100, PR.red, W2('qua'), { rot: -0.1, size: 64, from: 1.35 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -35, key: 'b2b' });
  prSign('CHỈ ĐỌC BÀI KHEN NGỢI', { kicker: KICK });
  prChips();
};

SCENES.confirm = () => {   // S3a: Thiên kiến xác nhận: ưu tiên thông tin hợp niềm tin sẵn có (a funnel)
  const W3 = (w, n) => VW('confirm', w, n).t0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 1250, 26, PR.mustard);
  prStar(940, 1250, 22, PR.pink);

  prBoard(90, 360, 900, 300, 'bd_conf');
  const tT = W3('thiên');
  txt('THIÊN KIẾN XÁC NHẬN', 540, 470, fitSize('THIÊN KIẾN XÁC NHẬN', 800, 72), CHALKY, { align: 'center', base: 'middle', weight: 800, frac: ev(tT, 0.8) });
  txt('(confirmation bias)', 540, 560, 40, 'rgba(244,244,236,0.7)', { align: 'center', base: 'middle', weight: 700, frac: ev(W3('xác') + 0.3, 0.6) });

  // the funnel only lets matching information through to the jar; the rest bounces off
  const tx = W3('xu');
  const jk = popS(tx);
  const caught = [0, 2, 4, 5].filter((i) => TT > tx + 0.3 + i * 0.5 + 0.7).length;
  if (jk > 0.01) withT(540, 1160, 0, jk, () => {
    pp(pR(-200, -80, 400, 170, 24), 'rgba(216,236,241,0.85)', { key: 'm8jar', sb: 14, sy: 7, tex: 0.3 });
    if (caught) pp(pR(-186, 76 - caught * 30, 372, caught * 30, 12), PR.green, { key: 'm8jarf', shadow: false, tex: 0.4 });
    txt('NIỀM TIN SẴN CÓ', 0, -40, fitSize('NIỀM TIN SẴN CÓ', 360, 34), PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });
  const chip = (good, i) => {
    const t = tx + 0.3 + i * 0.5, u = TT - t; if (u < 0) return;
    const sx = 540 + [-150, -140, -60, 170, 90, -120][i];
    let x, y, r = 0, a = 1;
    if (good) {
      const v = clamp(u / 0.7); x = lerp(sx, 540, EZ.o2(v)); y = lerp(700, 1040, EZ.i2(v)); if (v >= 1) return;
    } else {
      const v1 = clamp(u / 0.4), v2 = clamp((u - 0.4) / 0.5);
      const side = sx < 540 ? -1 : 1;
      x = lerp(sx, sx + side * 40, v1) + side * 100 * EZ.o2(v2); y = lerp(700, 790, EZ.i2(v1)) + 190 * EZ.o2(v2) - 80 * Math.sin(Math.PI * v2);
      r = side * 0.6 * v2; a = 1 - 0.5 * v2;
    }
    ctx.save(); ctx.globalAlpha = a;
    withT(x, y, r, 1, () => {
      pp(pR(-100, -36, 200, 72, 10), good ? PR.green : PR.red, { key: 'm8chip' + i, sb: 8, sy: 4, tex: 0.4 });
      const s = good ? 'PHÙ HỢP' : 'TRÁI CHIỀU';
      txt(s, 0, 2, fitSize(s, 170, 30), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
    ctx.restore();
  };
  const kinds = [1, 0, 1, 0, 1, 1];
  kinds.forEach((good, i) => { if (good) chip(1, i); });
  const fk = popS(tx - 0.1);
  if (fk > 0.01) withT(540, 900, 0, fk, () => {
    pp(pG([[-280, -110], [280, -110], [70, 80], [70, 140], [-70, 140], [-70, 80]]), PR.mustard, { key: 'm8fun', sb: 14, sy: 7, tex: 0.5 });
  });
  kinds.forEach((good, i) => { if (!good) chip(0, i); });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'wow', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('THIÊN KIẾN XÁC NHẬN', { kicker: KICK });
  prChips();
};

SCENES.confirm2 = () => {   // S3b: Cảm giác chắc chắn tăng dù bằng chứng chưa đầy đủ (two gauges)
  const W3 = (w, n) => VW('confirm', w, n).t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(930, 470, 56, 4, 0, 'clk3');
  prStar(150, 420, 26, PR.mustard);
  m8Shelf(190, 1330, 'm8s4');

  const tU = W3('tăng'), certain = 0.3 + 0.62 * EZ.back(clamp((TT - tU) / 0.6)) * (TT >= tU ? 1 : 0);
  const gauge = (x, f, col, label, key) => {
    pp(pR(x - 110, 540, 220, 600, 30), 'rgba(216,236,241,0.85)', { key: key + 'g', sb: 14, sy: 7, tex: 0.3 });
    const h = 572 * clamp(f, 0, 1.02);
    pp(pR(x - 96, 1126 - h, 192, h, 22), col, { key: key + 'f', shadow: false, tex: 0.45 });
    for (let i = 1; i < 5; i++) pp(pR(x - 110, 540 + i * 120, 46, 6, 3), 'rgba(40,40,60,0.35)', { shadow: false, tex: false });
    m8Tag(x, 1205, 380, 76, label, PR.creamL, PR.navy, 36, key);
  };
  gauge(330, certain, PR.orange, 'CẢM GIÁC CHẮC CHẮN', 'm8gc');
  gauge(750, 0.3 + Math.sin(TT * 3) * 0.01, PR.blue, 'BẰNG CHỨNG', 'm8ge');
  if (TT >= tU) pp(pG([[330, 470 - 30 * ev(tU, 0.4)], [380, 520], [280, 520]]), PR.orange, { key: 'm8up', sb: 8, sy: 4, tex: 0.4 });
  prStamp('CHƯA ĐẦY ĐỦ', 750, 760, PR.red, W3('chưa'), { rot: 0.08, size: 44, from: 1.35 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'flat', look: -25, key: 'b3b', hold: propNotebook(0.1) });
  prSign('CHẮC HƠN DÙ THIẾU BẰNG CHỨNG', { kicker: KICK });
  prChips();
};

SCENES.challenge = () => {   // S4a: Khi tranh luận, thử tìm một nguồn đáng tin có quan điểm khác
  const W4 = (w, n) => VW('challenge', w, n).t0;
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(930, 1200, 56, 4, 15, 'clk4');
  m8Shelf(190, 1300, 'm8s5');
  prStar(150, 650, 24, PR.mustard);

  prSpeech(320, 480, 380, 130, 200, 600, 'Theo mình…', { t: W4('tranh'), key: 'm8d1', size: 46 });
  prSpeech(760, 480, 380, 130, 880, 600, 'Không đâu!', { t: W4('luận'), key: 'm8d2', size: 46, rot: 0.02 });

  // the source card
  const tn = W4('nguồn'), k = popS(tn);
  if (k > 0.01) withT(540, 900, -0.01, k, () => {
    pp(pR(-320, -190, 640, 380, 18), PR.paperW, { key: 'm8src', sb: 18, sy: 9, tex: 0.4 });
    pp(pR(-320, -190, 640, 84, 18), PR.navy, { key: 'm8srch', shadow: false, tex: 0.4 });
    txt('NGUỒN ĐÁNG TIN', -30, -146, 40, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    pp(pE(250, -146, 34, 34), PR.mustard, { key: 'm8seal', sb: 6, sy: 3, tex: 0.4 });
    m8Tick(250, -146, 40, PR.navy);
    if (TT >= W4('quan')) txt('QUAN ĐIỂM KHÁC', 0, -40, fitSize('QUAN ĐIỂM KHÁC', 560, 60), PR.redD, { align: 'center', base: 'middle', weight: 800 });
    for (let i = 0; i < 3; i++) pp(pR(-270, 30 + i * 40, i === 2 ? 320 : 540, 14, 7), 'rgba(40,40,60,0.18)', { shadow: false, tex: false });
  });
  // a magnifier sweeps in on "tìm"
  const tf = W4('tìm');
  if (TT >= tf) {
    const gx = lerp(1100, 760, EZ.o3(ev(tf, 0.5))), gy = 1050;
    withT(gx, gy, -0.5, 1, () => {
      pp(pR(-14, 80, 28, 170, 10), PR.brown, { key: 'm8mgh', sb: 8, sy: 4, tex: 0.4 });
      pp(pE(0, 0, 96, 96), PR.char, { key: 'm8mgr', sb: 12, sy: 6, tex: 0.35 });
      pp(pE(0, 0, 76, 76), 'rgba(190,225,240,0.55)', { key: 'm8mgl', shadow: false, tex: 0.2 });
    });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4' });
  prSign('TÌM MỘT GÓC NHÌN KHÁC', { kicker: KICK });
  prChips();
};

SCENES.challenge2 = () => {   // S4b: Đó không phải là tự phủ nhận
  const W4 = (w, n) => VW('challenge', w, n).t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 420, 26, PR.mustard);
  prStar(930, 420, 22, PR.pink);
  prClock(150, 520, 56, 4, 20, 'clk4b');

  // both views stay on the table: yours is not torn up
  pp(pR(110, 1100, 860, 30, 8), PR.wood, { key: 'm8tbl', sb: 12, sy: 6, tex: 0.6 });
  withT(330, 840, -0.03, 1, () => m8Paper(380, 400, 'NIỀM TIN CỦA BẠN', PR.green, { key: 'y', sub: 'Vẫn còn đây', subC: PR.green }));
  withT(750, 840, 0.03, 1, () => m8Paper(380, 400, 'QUAN ĐIỂM KHÁC', PR.blue, { key: 'o', sub: 'Thêm để so sánh', subC: PR.blue }));
  prStamp('KHÔNG PHẢI TỰ PHỦ NHẬN', 540, 1240, PR.red, W4('không'), { rot: -0.05, size: 46, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4b' });
  prSign('KHÔNG PHẢI TỰ PHỦ NHẬN', { kicker: KICK });
  prChips();
};

SCENES.test = () => {   // S5: Đó là cách kiểm tra niềm tin tốt hơn (a test checklist)
  const W5 = (w, n) => VW('test', w, n).t0;
  prWall(TEAL2, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(930, 470, 56, 4, 30, 'clk5');
  prStar(150, 420, 26, PR.mustard);
  m8Shelf(190, 1330, 'm8s7');

  const k = popS(E0 + 0.15);
  if (k > 0.01) withT(540, 860, 0.01, k, () => {
    pp(pR(-320, -300, 640, 600, 18), PR.wood, { key: 'm8clip', sb: 18, sy: 9, tex: 0.5 });
    pp(pR(-292, -270, 584, 546, 8), PR.paperW, { key: 'm8clipp', shadow: false, tex: 0.35 });
    pp(pR(-90, -322, 180, 56, 10), PR.greyD, { key: 'm8clipc', sb: 6, sy: 3, tex: 0.3 });
    txt('KIỂM TRA NIỀM TIN', 0, -200, fitSize('KIỂM TRA NIỀM TIN', 520, 48), PR.navy, { align: 'center', base: 'middle', weight: 800 });
    [['Nguồn ủng hộ', 'kiểm'], ['Nguồn phản bác', 'tra'], ['So sánh cả hai', 'niềm']].forEach(([s, w], i) => {
      const y = -90 + i * 120;
      pp(pR(-250, y - 36, 72, 72, 10), PR.creamL, { key: 'm8cb' + i, sb: 4, sy: 2, tex: 0.3, rim: PR.navy, rw: 4 });
      txt(s, -150, y + 2, fitSize(s, 380, 44), PR.char, { base: 'middle', weight: 800 });
      if (TT >= W5(w)) withT(-214, y, 0, popS(W5(w)), () => m8Tick(0, 0, 70, PR.green));
    });
  });
  prStamp('TỐT HƠN', 720, 1130, PR.green, W5('tốt'), { rot: -0.08, size: 60 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('KIỂM TRA NIỀM TIN TỐT HƠN', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Comment box CTA
  const W6 = (w, n) => VW('cta', w, n).t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(150, 420, 30, PR.mustard);
  prStar(930, 420, 24, PR.pink);
  prClock(930, 1230, 50, 4, 45, 'clk6');

  prCommentBox(CX, 560, 'ĐỔI QUAN ĐIỂM', E0 + 0.5, { hint: 'Bạn từng đổi quan điểm vì bằng chứng mới?' });

  const tO = W6('thay'), tN = W6('mới');
  const kO = popS(tO), kE = popS(W6('bằng')), kN = popS(tN);
  if (kE > 0.01) withT(540, 780, 0.02, kE, () => m8Tag(0, 0, 440, 90, 'BẰNG CHỨNG MỚI', PR.yellow, PR.char, 40, 'm8ev'));
  if (kO > 0.01) withT(300, 1010, -0.03, kO, () => {
    pp(pR(-170, -110, 340, 220, 16), PR.greyD, { key: 'm8old', sb: 12, sy: 6, tex: 0.45 });
    txt('QUAN ĐIỂM', 0, -30, 40, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('CŨ', 0, 36, 56, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
  if (kN > 0.01) {
    withT(540, 1010, 0, kN, () => pp(pG([[-50, -24], [10, -24], [10, -54], [60, 0], [10, 54], [10, 24], [-50, 24]]), PR.mustard, { key: 'm8arr', sb: 8, sy: 4, tex: 0.4 }));
    withT(780, 1010, 0.03, kN, () => {
      pp(pR(-170, -110, 340, 220, 16), PR.green, { key: 'm8new', sb: 12, sy: 6, tex: 0.45 });
      txt('QUAN ĐIỂM', 0, -30, 40, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt('MỚI', 0, 36, 56, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN TỪNG ĐỔI QUAN ĐIỂM CHƯA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['bias', 'bạn', 1, 'bias2'],
  ['confirm', 'vấn', 0, 'confirm2'],
  ['challenge', 'đó', 0, 'challenge2'],
];
function SFX_CUES() {
  const T = (id, w, n) => VW(id, w, n).t0;
  const cues = [];
  cues.push({ k: 'type', t: T('hook', 'tìm'), n: 10, d: 0.5 });
  cues.push({ k: 'type', t: T('hook', 'tìm', 1), n: 14, d: 0.7 });
  ['chứng', 'minh', 'đúng'].forEach((w) => cues.push({ k: 'pop', t: T('hook', w) }));
  cues.push({ k: 'pop', t: VL('bias').t0 + 0.15 });
  for (let i = 0; i < 5; i++) cues.push({ k: 'tick', t: T('bias', 'rất') + i * 0.1 });
  ['đọc', 'khen', 'ngợi'].forEach((w) => cues.push({ k: 'pop', t: T('bias', w) }));
  cues.push({ k: 'thud', t: T('bias', 'qua') });
  cues.push({ k: 'pop', t: T('confirm', 'xu') });
  cues.push({ k: 'chime', t: T('confirm', 'tăng') });
  cues.push({ k: 'thud', t: T('confirm', 'chưa') });
  cues.push({ k: 'pop', t: T('challenge', 'tranh') });
  cues.push({ k: 'pop', t: T('challenge', 'luận') });
  cues.push({ k: 'pop', t: T('challenge', 'nguồn') });
  cues.push({ k: 'thud', t: T('challenge', 'không') });
  ['kiểm', 'tra', 'niềm'].forEach((w) => cues.push({ k: 'tick', t: T('test', w) }));
  cues.push({ k: 'thud', t: T('test', 'tốt') });
  const ctaL = VL('cta');
  cues.push({ k: 'type', t: ctaL.t0 + 0.5, n: 16, d: 1.3 });
  cues.push({ k: 'chime', t: T('cta', 'mới') });
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
