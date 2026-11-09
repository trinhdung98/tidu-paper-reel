// =====================================================================
//  TIDU MIND 04 — "Vì sao một lời chê có thể lấn át nhiều lời khen?"
//  Thiên kiến tiêu cực (Negativity Bias).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THIÊN KIẾN';
const TEAL = '#2e4f4f', TEAL_D = '#355555';
const M4_GOOD = '#4a7c64', M4_BAD = '#b04848';
const M4_PRAISE = ['Làm tốt lắm!', 'Rất sáng tạo!', 'Tuyệt vời!', 'Cảm ơn bạn!'];
const M4_CRIT = 'Chỗ này chưa ổn.';

const SCENES = {};

// a tick (good) or cross (bad) drawn in a cream disc
function m4Mark(x, y, r, good) {
  pp(pE(x, y, r, r), PR.creamL, { key: 'mk' + x + y, sb: 6, sy: 3, tex: 0.3 });
  ctx.save(); ctx.strokeStyle = good ? PR.green : PR.red; ctx.lineWidth = r * 0.26; ctx.lineCap = 'round'; ctx.beginPath();
  if (good) { ctx.moveTo(x - r * 0.42, y); ctx.lineTo(x - r * 0.1, y + r * 0.36); ctx.lineTo(x + r * 0.46, y - r * 0.34); }
  else { ctx.moveTo(x - r * 0.34, y - r * 0.34); ctx.lineTo(x + r * 0.34, y + r * 0.34); ctx.moveTo(x + r * 0.34, y - r * 0.34); ctx.lineTo(x - r * 0.34, y + r * 0.34); }
  ctx.stroke(); ctx.restore();
}
// a feedback speech bubble: green praise or red criticism, the mark on the left and the text fitted to the rest
function m4Bubble(x, y, w, h, text, good, k = 1, rot = 0, o = {}) {
  withT(x, y, rot, k, () => {
    const fill = o.fill ?? (good ? M4_GOOD : M4_BAD);
    pp(() => { ctx.roundRect(-w / 2, -h / 2, w, h, Math.min(28, h / 3)); ctx.moveTo(-w / 2 + 40, h / 2 - 2); ctx.lineTo(-w / 2 + 34, h / 2 + 30); ctx.lineTo(-w / 2 + 84, h / 2 - 2); }, fill, { key: 'bub' + text, sb: 14, sy: 7, tex: 0.45 });
    const r = Math.min(34, h * 0.3), mx = -w / 2 + 24 + r;
    m4Mark(mx, 0, r, good);
    const avail = w - (mx + r + w / 2) - 30;
    txt(text, mx + r + 18 + avail / 2, 2, fitSize(text, avail, o.size ?? 40), o.color ?? PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
}
// a strip torn from a feedback note (cream with a coloured edge), text left, an optional mark on the right
function m4Strip(y, text, edge, k, mark, alpha = 1) {
  if (k <= 0.01) return;
  ctx.save(); ctx.globalAlpha = alpha;
  withT(540, y, (y % 3 - 1) * 0.01, k, () => {
    pp(pG([[-310, -50], [310, -50], [300, -20], [314, 10], [304, 50], [-310, 50]]), PR.paperW, { key: 'strip' + y, sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-310, -50, 18, 100, 0), edge, { key: 'edge' + y, shadow: false, tex: 0.4 });
    txt(text, -270, 2, fitSize(text, 440, 38), PR.navy, { base: 'middle', weight: 800 });
  });
  ctx.restore();
  if (mark) m4Mark(810, y, 36, true);
}
function m4Room(c, studs) {
  prWall(c, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs });
  if (!studs) pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
}
function m4Card(label, text, fill) {
  withT(540, 560, 0, popS(E0 + 0.05), () => {
    pp(pR(-430, -100, 860, 200, 20), fill, { key: 'qc' + label, sb: 16, sy: 8, tex: 0.5 });
    txt(label, 0, -44, 30, PR.mustard, { align: 'center', base: 'middle', weight: 800 });
    txt(text, 0, 28, fitSize(text, 780, 46), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: many praise bubbles, then one criticism bubble takes the stage
  m4Room(TEAL, false);
  prClock(960, 400, 56, 3, 30, 'clk1');
  prStar(110, 400, 30, PR.mustard);
  prStar(90, 1300, 24, PR.pink);

  const tN = VW('hook', 'nhớ').t0, dim = 1 - 0.6 * ev(tN, 0.5);
  const ts = [VW('hook', 'nhiều').t0, VW('hook', 'người').t0, VW('hook', 'khen').t0, VW('hook', 'bạn').t0];
  ctx.save(); ctx.globalAlpha = dim;
  [[320, 610], [760, 610], [320, 820], [760, 820]].forEach(([x, y], i) => m4Bubble(x, y, 420, 160, M4_PRAISE[i], true, i === 0 ? 1 : popS(ts[i]), (i % 2 ? 0.02 : -0.02), { size: 44 }));   // the first one is there at frame 0 (thumbnail)
  ctx.restore();
  const tC = VW('hook', 'nhưng').t0, grow = 1 + 0.1 * ev(VW('hook', 'chê').t0, 0.3);
  m4Bubble(540, 1110, 640, 190, M4_CRIT, false, popS(tC) * grow, 0.02, { size: 54 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT > tC ? 'flat' : 'happy', look: -30, key: 'b1' });
  prSign('NHIỀU LỜI KHEN, MỘT LỜI CHÊ', { kicker: KICK });
  prChips();
};

SCENES.bias = () => {   // S2: a balance — the one criticism weighs more in attention than the praise
  m4Room(TEAL_D, true);
  prClock(960, 400, 56, 3, 45, 'clk2');
  prStar(110, 400, 30, PR.pink);

  const a = 0.2 * EZ.back(ev(VW('bias', 'mạnh').t0, 0.7)), arm = 320, px = 540, py = 640;
  pp(pE(540, 1290, 180, 36), PR.woodD, { key: 'sbase', sb: 14, sy: 7, tex: 0.5 });
  pp(pR(526, py, 28, 650, 8), PR.wood, { key: 'spost', sb: 12, sy: 6, tex: 0.5 });
  [-1, 1].forEach((s) => {
    const ex = px + s * arm * Math.cos(a), ey = py + s * arm * Math.sin(a), pyy = ey + 240;
    ctx.save(); ctx.strokeStyle = PR.greyD; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 130, pyy); ctx.moveTo(ex, ey); ctx.lineTo(ex + 130, pyy); ctx.stroke(); ctx.restore();
    if (s < 0) {
      [[-70, -40], [70, -40], [0, -100]].forEach(([dx, dy], i) => withT(ex + dx, pyy + dy, (i - 1) * 0.08, 1, () => {
        pp(pR(-62, -30, 124, 60, 18), M4_GOOD, { key: 'pg' + i, sb: 8, sy: 4, tex: 0.45 }); m4Mark(-30, 0, 18, true);
      }));
    } else {
      withT(ex, pyy - 56, 0.04, 1, () => { pp(pR(-90, -56, 180, 112, 22), M4_BAD, { key: 'pb', sb: 10, sy: 5, tex: 0.45 }); m4Mark(0, 0, 34, false); });
    }
    pp(pG([[ex - 150, pyy], [ex + 150, pyy], [ex + 110, pyy + 50], [ex - 110, pyy + 50]]), PR.mustard, { key: 'pan' + s, sb: 12, sy: 6, tex: 0.5 });
    txt(s < 0 ? 'KHEN' : 'CHÊ', ex, pyy + 110, 40, PR.creamL, { align: 'center', weight: 800 });
  });
  withT(px, py, a, 1, () => pp(pR(-arm - 20, -14, 2 * arm + 40, 28, 12), PR.woodD, { key: 'beam', sb: 12, sy: 6, tex: 0.5 }));
  pp(pE(px, py, 26, 26), PR.mustard, { key: 'pivot', sb: 6, sy: 3, tex: 0.4 });
  prStamp('TIÊU CỰC', 820, 1210, PR.red, VW('bias', 'tiêu').t0, { rot: -0.06, size: 46 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -35, key: 'b2' });
  prSign('THIÊN KIẾN TIÊU CỰC', { kicker: KICK });
  prChips();
};

SCENES.occupy = () => {   // S3a: inside the thought cloud the criticism grows until it fills most of it
  m4Room(TEAL, false);
  prClock(960, 400, 56, 4, 0, 'clk3');
  prStar(110, 400, 30, PR.mustard);

  prThought(540, 820, 700, 520, 860, 1330, '', { key: 'th3' });
  const g = EZ.o3(ev(VW('occupy', 'chiếm').t0, VW('occupy', 'hết').t1 - VW('occupy', 'chiếm').t0));
  ctx.save(); ctx.globalAlpha = 1 - 0.5 * g;
  [[330, 650, 0], [760, 680, 1], [380, 1000, 2], [720, 990, 3]].forEach(([x, y, i]) => m4Bubble(x, y, 220, 76, M4_PRAISE[i], true, 1, (i % 2 ? 0.03 : -0.03), { size: 28 }));
  ctx.restore();
  const k = popS(VW('occupy', 'nhận').t0) * (0.4 + 0.6 * g);
  withT(540, 820, 0.02, k, () => {
    pp(() => {
      ctx.ellipse(0, 0, 250, 170, 0, 0, TAU);
      for (let i = 0; i < 9; i++) { const an = i / 9 * TAU, bx = Math.cos(an) * 220, by = Math.sin(an) * 150, r = 70 + 12 * Math.sin(i * 1.7); ctx.moveTo(bx + r, by); ctx.arc(bx, by, r, 0, TAU); }
    }, M4_BAD, { key: 'blob', sb: 16, sy: 8, tex: 0.5 });
    m4Mark(0, -60, 48, false);
    txt(M4_CRIT, 0, 40, fitSize(M4_CRIT, 400, 50), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'flat', look: -30, key: 'b3' });
  prSign('CHIẾM GẦN HẾT SUY NGHĨ', { kicker: KICK });
  prChips();
};

SCENES.occupy2 = () => {   // S3b: ...even though a whole wall of praise came first
  m4Room(TEAL_D, true);
  prClock(960, 400, 56, 4, 10, 'clk3b');
  prStar(110, 400, 30, PR.pink);

  const words = ['trước', 'đó', 'có', 'nhiều', 'phản', 'hồi'].map((w) => VW('occupy', w).t0);
  const texts = ['Làm tốt lắm!', 'Rất sáng tạo!', 'Tuyệt vời!', 'Cảm ơn bạn!', 'Rõ ràng lắm!', 'Rất hữu ích!'];
  texts.forEach((s, i) => m4Bubble([260, 540, 820][i % 3], i < 3 ? 620 : 800, 260, 130, s, true, popS(words[i]), ((i * 7) % 3 - 1) * 0.025, { size: 32 }));
  m4Bubble(540, 1080, 420, 140, M4_CRIT, false, 1, 0.02, { size: 40 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT > VW('occupy', 'tích').t0 ? 'neutral' : 'flat', look: -30, key: 'b3b' });
  prSign('DÙ CÓ NHIỀU LỜI KHEN', { kicker: KICK });
  prChips();
};

SCENES.truth = () => {   // S4: a mosaic — the spotlight sits on one red tile, then the whole picture lights up
  m4Room(TEAL, false);
  prClock(960, 400, 56, 4, 15, 'clk4');
  prStar(110, 400, 30, PR.mustard);

  const S = 190, G = 14, x0 = 540 - (3 * S + 2 * G) / 2, y0 = 860 - (3 * S + 2 * G) / 2;
  pp(pR(x0 - 26, y0 - 26, 3 * S + 2 * G + 52, 3 * S + 2 * G + 52, 12), PR.woodD, { key: 'frame', sb: 20, sy: 10, tex: 0.5 });
  const lit = 1 - EZ.o2(ev(VW('truth', 'toàn').t0, 0.6));
  for (let i = 0; i < 9; i++) {
    const cx = x0 + (i % 3) * (S + G) + S / 2, cy = y0 + Math.floor(i / 3) * (S + G) + S / 2, bad = i === 5;
    pp(pR(cx - S / 2, cy - S / 2, S, S, 10), bad ? M4_BAD : ['#4a7c64', '#5a8f72', '#3f6f58'][i % 3], { key: 'tile' + i, sb: 6, sy: 3, tex: 0.5 });
    m4Mark(cx, cy, 44, !bad);
    if (!bad && lit > 0.01) { ctx.save(); ctx.fillStyle = `rgba(10,16,20,${0.68 * lit})`; ctx.fillRect(cx - S / 2, cy - S / 2, S, S); ctx.restore(); }
  }
  prStamp('CHỈ LÀ MỘT PHẦN', 540, 1270, PR.red, VW('truth', 'thật').t0, { rot: -0.05, size: 48 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT > VW('truth', 'toàn').t0 ? 'wow' : 'neutral', look: -25, key: 'b4', hold: propGlass(-0.5) });
  prSign('CHƯA PHẢI TOÀN BỘ SỰ THẬT', { kicker: KICK });
  prChips();
};

SCENES.filter = () => {   // S5a: one piece of criticism splits into two questions
  m4Room(TEAL_D, true);
  prClock(960, 400, 56, 4, 30, 'clk5');
  prStar(110, 400, 30, PR.mustard);

  m4Bubble(540, 600, 680, 170, M4_CRIT, false, popS(VW('filter', 'nhận').t0), -0.01, { size: 52 });
  const tS = VW('filter', 'tách').t0;
  [[-1, 'CÂU HỎI 1', '#3e6a6a', tS], [1, 'CÂU HỎI 2', '#4e7a68', VW('filter', 'hai').t0]].forEach(([s, label, fill, tP]) => {
    const x = 540 + s * 220;
    chalkLine([[540, 700], [lerp(540, x, 0.5), 770], [x, 830]], ev(tP, 0.4), { color: PR.creamL, w: 8, dash: [18, 14] });
    withT(x, 1000, s * 0.02, popS(tP + 0.15), () => {
      pp(pR(-200, -170, 400, 340, 20), fill, { key: 'qq' + label, sb: 16, sy: 8, tex: 0.5 });
      txt(label, 0, -110, 36, PR.mustard, { align: 'center', base: 'middle', weight: 800 });
      txt('?', 0, 70, 170, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'neutral', look: -25, key: 'b5' });
  prSign('TÁCH HAI CÂU HỎI', { kicker: KICK });
  prChips();
};

SCENES.filter2 = () => {   // S5b: question 1 — sort the criticism into the parts that help you improve
  m4Room(TEAL, false);
  prClock(960, 400, 56, 4, 40, 'clk5b');
  m4Card('CÂU HỎI 1', 'Phần nào hữu ích để mình cải thiện?', '#3e6a6a');
  const tH = VW('filter', 'hữu').t0, tI = VW('filter', 'ích').t0, tC = VW('filter', 'cải').t0;
  m4Strip(860, '"Phần mở đầu hơi dài."', M4_BAD, popS(E0 + 0.25), TT > tH);
  m4Strip(1000, '"Chán thật."', M4_BAD, popS(E0 + 0.4), false, 1 - 0.6 * ev(tC, 0.4));
  m4Strip(1140, '"Nên thêm một ví dụ."', M4_BAD, popS(E0 + 0.55), TT > tI);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: TT > tH ? 'happy' : 'neutral', look: -25, key: 'b5b', hold: propGlass(-0.5) });
  prSign('PHẦN NÀO HỮU ÍCH?', { kicker: KICK });
  prChips();
};

SCENES.filter3 = () => {   // S5c: question 2 — the things done well come back into view
  m4Room(TEAL_D, true);
  prClock(960, 400, 56, 4, 50, 'clk5c');
  m4Card('CÂU HỎI 2', 'Mình có bỏ qua điều đã làm tốt?', '#4e7a68');
  const ts = [VW('filter', 'bỏ').t0, VW('filter', 'điều').t0, VW('filter', 'tốt').t0];
  ['Làm tốt lắm!', 'Phần ví dụ rất rõ ràng!', 'Cảm ơn bạn!'].forEach((s, i) => {
    const u = EZ.back(ev(ts[i], 0.5));
    if (u > 0.01) m4Bubble(540, 860 + i * 140 + (1 - u) * 120, 620, 100, s, true, 1, (i - 1) * 0.015, { size: 38 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: TT > ts[2] ? 'happy' : 'neutral', look: -25, key: 'b5c' });
  prSign('ĐIỀU MÌNH ĐÃ LÀM TỐT', { kicker: KICK });
  prChips();
};

SCENES.value = () => {   // S6: learn from it (a notebook) and keep your worth (a medal)
  m4Room(TEAL, false);
  prClock(950, 400, 56, 4, 45, 'clk6');
  prStar(110, 400, 30, PR.pink);

  withT(320, 880, -0.03, popS(VW('value', 'học').t0), () => {
    pp(pR(-190, -250, 380, 500, 14), PR.navy, { key: 'nbc', sb: 18, sy: 9, tex: 0.5 });
    pp(pR(-172, -232, 344, 464, 8), PR.paperW, { key: 'nbpg', shadow: false, tex: 0.4 });
    for (let i = 0; i < 5; i++) pp(pE(-120 + i * 60, -250, 12, 18), PR.greyD, { key: 'nbr' + i, sb: 4, sy: 2, tex: 0.3 });
    for (let i = 0; i < 6; i++) pp(pR(-150, -110 + i * 56, 300, 2, 0), '#d8e0e0', { shadow: false, tex: false });
    txt('HỌC TỪ LỜI CHÊ', 0, -170, fitSize('HỌC TỪ LỜI CHÊ', 300, 36), PR.navy, { align: 'center', base: 'middle', weight: 800 });
    withT(0, -40, 0.04, popS(VW('value', 'chê').t0), () => {
      pp(pR(-150, -40, 300, 80, 4), '#f6dede', { key: 'nbnote', sb: 8, sy: 4, tex: 0.4 });
      txt('Mở đầu hơi dài', 0, 2, fitSize('Mở đầu hơi dài', 260, 32), M4_BAD, { align: 'center', base: 'middle', weight: 800 });
    });
    chalkLine([[-140, 80], [-60, 80], [-40, 70]], ev(VW('value', 'mà').t0, 0.3), { color: PR.green, w: 8 });
    txt('rút gọn lại', -30, 92, 30, PR.green, { weight: 800, frac: ev(VW('value', 'mà').t0 + 0.2, 0.5) });
  });

  const tG = VW('value', 'giá').t0, shine = 1 + 0.1 * Math.sin(Math.PI * ev(tG, 0.4));
  withT(760, 830, 0, popS(VW('value', 'cần').t0) * shine, () => {
    pp(pG([[-70, -250], [-10, -250], [20, -110], [-40, -110]]), PR.blue, { key: 'rib1', sb: 8, sy: 4, tex: 0.5 });
    pp(pG([[70, -250], [10, -250], [-20, -110], [40, -110]]), PR.red, { key: 'rib2', sb: 8, sy: 4, tex: 0.5 });
    pp(pE(0, 20, 150, 150), PR.mustard, { key: 'medo', sb: 18, sy: 9, tex: 0.5 });
    pp(pE(0, 20, 118, 118), PR.yellow, { key: 'medi', shadow: false, tex: 0.45 });
    prStar(0, 24, 70, '#c99a1a');
  });
  prBurst(760, 850, tG, { n: 18 });
  txt('GIÁ TRỊ CỦA MÌNH', 760, 1080, fitSize('GIÁ TRỊ CỦA MÌNH', 380, 38), PR.creamL, { align: 'center', weight: 800, frac: ev(tG, 0.5) });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: TT > tG ? 'happy' : 'neutral', look: -25, key: 'b6' });
  prSign('HỌC MÀ VẪN GIỮ GIÁ TRỊ', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S7: send this video to someone who is too hard on themselves
  m4Room(TEAL_D, true);
  prBunting(300);
  prStar(110, 1300, 30, PR.mustard);
  prStar(980, 1290, 24, PR.pink);

  withT(540, 640, -0.015, popS(E0 + 0.05), () => {
    pp(pR(-300, -170, 600, 340, 22), PR.char, { key: 'thumb', sb: 18, sy: 9, tex: 0.4 });
    pp(pR(-276, -146, 552, 292, 12), '#2b4a4a', { key: 'thumbs', shadow: false, tex: 0.4 });
    m4Bubble(-60, -40, 330, 100, 'MỘT LỜI CHÊ', false, 1, -0.03, { size: 36 });
    pp(pE(150, 70, 56, 56), PR.creamL, { key: 'play', sb: 8, sy: 4, tex: 0.3 });
    pp(pG([[134, 44], [178, 70], [134, 96]]), PR.red, { shadow: false, tex: false });
  });
  const tG = VW('cta', 'gửi').t0, u = ev(tG + 0.15, 0.9);
  if (u > 0 && u < 1) {
    const P0 = [820, 780], P1 = [1010, 900], P2 = [720, 1030], q = EZ.io(u);
    const bx = (1 - q) ** 2 * P0[0] + 2 * (1 - q) * q * P1[0] + q * q * P2[0], by = (1 - q) ** 2 * P0[1] + 2 * (1 - q) * q * P1[1] + q * q * P2[1];
    const dx = 2 * (1 - q) * (P1[0] - P0[0]) + 2 * q * (P2[0] - P1[0]), dy = 2 * (1 - q) * (P1[1] - P0[1]) + 2 * q * (P2[1] - P1[1]);
    withT(bx, by, Math.atan2(dy, dx), 1, () => {
      pp(pG([[46, 0], [-34, -30], [-18, 0], [-34, 30]]), PR.paperW, { key: 'plane', sb: 10, sy: 5, tex: 0.3 });
      pp(pG([[46, 0], [-18, 0], [-34, 30]]), PR.cream, { shadow: false, tex: 0.3 });
    });
  }
  withT(540, 1130, 0.015, popS(VW('cta', 'người').t0), () => {
    pp(pR(-300, -100, 600, 200, 22), PR.creamL, { key: 'friend', sb: 16, sy: 8, tex: 0.5 });
    pp(pE(-210, 20, 70, 60), PR.blue, { key: 'fbody', sb: 6, sy: 3, tex: 0.4 });
    pp(pE(-210, -36, 40, 40), PR.tan, { key: 'fhead', sb: 6, sy: 3, tex: 0.4 });
    txt('Người hay quá khắt khe', 50, -22, fitSize('Người hay quá khắt khe', 390, 38), PR.navy, { align: 'center', base: 'middle', weight: 800 });
    txt('với bản thân', 50, 30, 38, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });
  prCheck(820, 1040, VW('cta', 'thân').t1, 40);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b7', look: -20 });
  prSign('BỚT KHẮT KHE VỚI MÌNH NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [['occupy', 'dù', 0, 'occupy2'], ['filter', 'phản', 0, 'filter2'], ['filter', 'và', 0, 'filter3']];
function SFX_CUES() {
  const cues = [];
  ['nhiều', 'người', 'khen', 'bạn'].forEach((w) => cues.push({ k: 'pop', t: VW('hook', w).t0 }));
  cues.push({ k: 'pop', t: VW('hook', 'nhưng').t0 }, { k: 'thud', t: VW('hook', 'chê').t0 });
  cues.push({ k: 'tick', t: VW('bias', 'mạnh').t0 }, { k: 'thud', t: VW('bias', 'tiêu').t0 + 0.16 });
  cues.push({ k: 'pop', t: VW('occupy', 'nhận').t0 });
  ['trước', 'đó', 'có', 'nhiều', 'phản', 'hồi'].forEach((w) => cues.push({ k: 'pop', t: VW('occupy', w).t0 }));
  cues.push({ k: 'chime', t: VW('truth', 'toàn').t0 }, { k: 'thud', t: VW('truth', 'thật').t0 + 0.16 });
  cues.push({ k: 'pop', t: VW('filter', 'nhận').t0 }, { k: 'tick', t: VW('filter', 'tách').t0 });
  cues.push({ k: 'tick', t: VW('filter', 'hữu').t0 }, { k: 'tick', t: VW('filter', 'ích').t0 });
  ['bỏ', 'điều', 'tốt'].forEach((w) => cues.push({ k: 'pop', t: VW('filter', w).t0 }));
  cues.push({ k: 'pop', t: VW('value', 'học').t0 }, { k: 'chime', t: VW('value', 'giá').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'người').t0 }, { k: 'chime', t: VW('cta', 'thân').t1 });
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
