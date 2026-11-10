const DX = [340, 740], D_LY = 705, GY = 935, GS = 290, TOPY = 535, DY = 1140, EY = 1272;
const D_CELL = '#d9d9cc', D_FILL = [PR.green, PR.blue], D_SOFT = '#f4d7b4', D_ANSWER = '#a9d6c6';
const D_MISC = MF_BEATS[1].visual.misconception;
const dPulse = (t) => (TT < t ? 0 : Math.sin(clamp((TT - t) / 0.35) * Math.PI));
const CENTER = { align:'center', base:'middle' };

function dWrap(str, width, size) {
  const rows = [''];
  for (const word of str.split(/\s+/)) {
    const k = rows.length - 1, next = rows[k] ? rows[k] + ' ' + word : word;
    if (txtW(next, size) > width && rows[k]) rows.push(word); else rows[k] = next;
  }
  return rows;
}
function dWrite(rows, size, gap, fracs) {
  rows.forEach((r, k) => {
    if (fracs[k] > 0) txt(r, 0, (k - (rows.length - 1) / 2) * gap, size, PR.ink, { ...CENTER, frac:fracs[k] });
  });
}
// A decimal drawn glyph by glyph so a padded zero, its empty slot, digit-count bars and a place highlight line up with the digits.
function dNum(str, x, y, size, { color = PR.ink, pad = -1, padT = -10, show = 99, bars = null, hi = -1 } = {}) {
  const ch = [...str], ws = ch.map((c) => txtW(c, size)), comma = ch.indexOf(',');
  let left = x - ws.reduce((a, b) => a + b, 0) / 2;
  ch.forEach((c, k) => {
    const w = ws[k], mid = left + w / 2;
    left += w;
    if (k >= show) return;
    if (k === hi) pp(pR(mid - w / 2 - 5, y - size * 0.6, w + 10, size * 1.2, 10), PR.yellow, { shadow:false, key:'d-hi' });
    if (bars !== null && TT >= bars && comma >= 0 && k > comma) pp(pR(mid - w / 2 + 4, y + size * 0.5, w - 8, 9, 4), PR.mustard, { shadow:false });
    if (k !== pad) { txt(c, mid, y, size, color, CENTER); return; }
    if (TT < padT) {
      const x0 = mid - w / 2, x1 = mid + w / 2, y0 = y - size * 0.5, y1 = y + size * 0.42;
      chalkLine([[x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]], 1, { color:PR.orange, w:4, dash:[9,7] });
    } else withT(mid, y, 0, popS(padT), () => txt(c, 0, 0, size, PR.orange, CENTER));
  });
}
function dTop(fill, rot, draw) {
  withT(540, TOPY, rot, 1, () => {
    pp(pR(-410, -95, 820, 190, 22), fill, { key:'d-top' });
    draw();
  });
}
function dLabel(k, str, options = {}, s = 1) {
  withT(DX[k], D_LY, 0, s, () => {
    pp(pR(-150, -50, 300, 100, 18), PR.creamL, { key:'d-label' + k });
    dNum(str, 0, 0, 76, options);
  });
}
// Columns fill first: one column of the 10x10 board is one tenth, one cell one hundredth.
function dGrid(k, n, highlightCell = false) {
  const c = GS / 10, x0 = DX[k] - GS / 2, y0 = GY - GS / 2;
  pp(pR(x0 - 12, y0 - 12, GS + 24, GS + 24, 14), PR.paperW, { key:'d-grid' + k });
  for (let j = 0; j < 100; j++) {
    const fill = j < n ? D_FILL[k] : highlightCell && j === 0 ? PR.yellow : D_CELL;
    pp(pR(x0 + Math.floor(j / 10) * c + 2, y0 + (j % 10) * c + 2, c - 4, c - 4, 3), fill, { shadow:false, tex:false });
  }
}
function dCount(k, str, t, highlight = Infinity) {
  if (TT < t) return;
  withT(DX[k], DY, 0, popS(t) * (1 + 0.08 * dPulse(highlight)), () => {
    const w = txtW(str, 40);
    if (TT >= highlight) pp(pR(-w / 2 - 20, -34, w + 40, 68, 34), PR.yellow, { key:'d-count' + k });
    txt(str, 0, 0, 40, TT >= highlight ? PR.ink : PR.creamL, CENTER);
  });
}
function dBadge(symbol, s = 1) {
  withT(540, GY, 0, s, () => {
    pp(pE(0, 0, 30, 30), PR.yellow, { key:'d-badge' });
    txt(symbol, 0, 2, 40, PR.ink, CENTER);
  });
}
function dStrip(t, crossT) {
  if (TT < t) return;
  withT(540, EY, 0, popS(t), () => {
    pp(pR(-360, -46, 720, 92, 18), D_SOFT, { key:'d-strip' });
    mfText(D_MISC, 0, 0, 620, 40, PR.ink, 1);
  });
  prCross(888, EY - 46, crossT, 30);
}
function dNumberLine(t, arrow) {
  if (TT < t) return;
  withT(540, EY - 12, 0, popS(t), () => {
    const X = (v) => -370 + 740 * v;
    pp(pR(-380, -5, 760, 10, 5), PR.creamL, { key:'d-line' });
    for (let k = 0; k <= 10; k++) pp(pR(X(k / 10) - 2, k % 5 ? -10 : -16, 4, k % 5 ? 20 : 32, 2), PR.creamL, { shadow:false });
    [[0.25, PR.blue], [0.5, PR.green]].forEach(([v, c]) => pp(pE(X(v), 0, 15, 15), c, { key:'d-dot' + v }));
    [['0', 0], ['0,25', 0.25], ['0,5', 0.5], ['1', 1]].forEach(([s, v]) => txt(s, X(v), 50, 36, PR.creamL, CENTER));
    if (TT >= arrow.t0) mfArrow(X(0.25) + 20, -42, X(0.5) - 20, -42, seg(TT, arrow.t0, arrow.t1));
  });
}
function dQuestionCard(v) {
  dTop(PR.creamL, 0, () => mfText(v.question, 0, 0, 740, 60, PR.ink, 2));
}

function dQuestion(v) {
  dQuestionCard(v);
  const named = [VW('question1', 'năm').t0, VW('question1', 'lăm').t0], cell = VW('question2', 'ô').t0;
  v.items.forEach((s, k) => {
    dLabel(k, s, {}, 1 + 0.08 * dPulse(named[k]));
    dGrid(k, 0, TT >= cell);
  });
  dBadge('?');
  const unit = VW('question2', 'đơn').t0, part = VW('question2', 'phần').t0;
  if (TT >= unit) withT(540, EY, 0, popS(unit), () => {
    pp(pR(-410, -65, 820, 130, 20), PR.creamL, { key:'d-unit' });
    txt('1 bảng = 1 đơn vị', 0, -29, 42, PR.ink, CENTER);
    if (TT >= part) withT(0, 31, 0, popS(part), () => txt('1 ô = 1/100 bảng', 0, 0, 42, PR.ink, CENTER));
  });
}
function dMisconception(v) {
  const l1 = VL('misconception1'), doubt = VW('misconception3', 'đúng').t0;
  const rot = TT < doubt ? 0 : -0.035 * EZ.back(seg(TT, doubt, doubt + 0.3)), u = seg(TT, l1.t0, l1.t1);
  const rows = dWrap(v.misconception, 740, 58);
  dTop(D_SOFT, rot, () => dWrite(rows, 58, 72, rows.map((r, k) => clamp(u * rows.length - k))));
  if (TT >= doubt) withT(915, 452, 0, popS(doubt), () => {
    pp(pE(0, 0, 34, 34), PR.mustard, { key:'d-doubt' });
    txt('?', 0, 2, 46, PR.ink, CENTER);
  });
  const digits = VW('misconception1', 'chữ').t0, favoured = VW('misconception2', 'lăm', 1).t0;
  v.items.forEach((s, k) => {
    dLabel(k, s, { bars:digits }, k ? 1 + 0.08 * EZ.o2(seg(TT, favoured, favoured + 0.3)) : 1);
    dGrid(k, 0);
  });
  dBadge('?');
  const whole = VW('misconception2', 'lớn').t0;
  if (TT >= whole) withT(540, EY, 0, popS(whole), () => {
    pp(pR(-170, -52, 340, 104, 20), PR.creamL, { key:'d-whole' });
    txt('25 > 5', 0, 0, 64, PR.ink, CENTER);
  });
}
function dExplanation(v) {
  const zero = VW('explanation1', 'không').t0, equal = VW('explanation1', 'bằng').t0;
  dTop(PR.creamL, 0, () => dNum('0,5 = ' + v.items[0], 0, 0, 88, { show:TT < equal ? 3 : 99, pad:9, padT:equal }));
  dLabel(0, v.items[0], { pad:3, padT:zero });
  dLabel(1, v.items[1]);
  const fifty = seg(TT, VW('explanation2', 'năm', 1).t0, VW('explanation2', 'tức').t0);
  const quarter = seg(TT, VW('explanation4', 'là').t0, VW('explanation4', 'ô').t0);
  dGrid(0, Math.round(v.groups[0] * fifty));
  dGrid(1, Math.round(v.groups[1] * quarter));
  const compare = VW('explanation5', 'so').t0;
  dCount(0, TT < VW('explanation2', 'mươi').t0 ? '5 cột' : '5 cột = 50 ô', VW('explanation2', 'cột').t0, VW('explanation5', 'mươi').t0);
  dCount(1, '25 ô', VW('explanation4', 'ô').t0, VW('explanation5', 'lăm').t0);
  dBadge('?', 1 + 0.08 * dPulse(compare));
  dStrip(VW('explanation3', 'quy').t0, VW('explanation3', 'sai').t0);
}
function dReveal(v) {
  const answer = VW('reveal1', 'lớn').t0, line = VW('reveal2', 'tia').t0;
  const right = { t0:VW('reveal2', 'bên').t0, t1:VW('reveal2', 'phải').t1 };
  if (TT < answer) dQuestionCard(v);
  else withT(540, TOPY, 0, lerp(1.25, 1, EZ.o3(seg(TT, answer, answer + 0.18))), () => {
    pp(pR(-410, -95, 820, 190, 22), D_ANSWER, { key:'d-answer' });
    txt(v.answer, 0, 0, 100, PR.ink, CENTER);
  });
  dLabel(0, v.items[0], { pad:3 });
  dGrid(0, v.groups[0]);
  dCount(0, '5 cột = 50 ô', -10);
  ctx.save();
  if (TT >= answer) ctx.globalAlpha = 0.45;
  dLabel(1, v.items[1]);
  dGrid(1, v.groups[1]);
  dCount(1, '25 ô', -10);
  ctx.restore();
  prCheck(497, 668, answer, 30);
  dBadge(TT < answer ? '?' : '>', 1 + 0.08 * dPulse(answer));
  if (TT < line) {
    ctx.save();
    if (TT >= answer) ctx.globalAlpha = 0.45;
    dStrip(-10, -10);
    ctx.restore();
  } else dNumberLine(line, right);
}
function dTakeaway(v) {
  const l1 = VL('takeaway1'), l2 = VL('takeaway2'), [rule, step] = v.question.split(', ');
  const rows = [...dWrap(rule + ',', 740, 42), step], u1 = seg(TT, l1.t0, l1.t1), u2 = seg(TT, l2.t0, l2.t1), n = rows.length - 1;
  dTop(PR.creamL, 0, () => dWrite(rows, 42, 56, rows.map((r, k) => (k < n ? clamp(u1 * n - k) : u2))));
  const sweep = seg(TT, VW('takeaway2', 'so').t0, VW('takeaway2', 'phải').t1);
  const hi = sweep > 0 && sweep < 1 ? [0, 2, 3][Math.min(2, Math.floor(sweep * 3))] : -1;
  const seven = VW('takeaway3', 'bảy').t0, nine = VW('takeaway3', 'chín').t0, solved = MF_BEATS[3].visual;
  if (TT < seven) {
    dLabel(0, solved.items[0], { pad:3, hi }, 1 + 0.08 * dPulse(VW('takeaway1', 'không').t0));
    dCount(0, '5 cột = 50 ô', -10);
  } else dLabel(0, v.items[0], {}, popS(seven));
  if (TT < nine) {
    dLabel(1, solved.items[1], { hi });
    dCount(1, '25 ô', -10);
  } else dLabel(1, v.items[1], {}, popS(nine));
  dGrid(0, TT < seven ? solved.groups[0] : 0);
  dGrid(1, TT < nine ? solved.groups[1] : 0);
  if (TT < seven) dBadge('>');
  else if (TT >= nine) dBadge('?', popS(nine));
  withT(540, EY, 0, 1, () => {
    pp(pR(-190, -42, 380, 84, 18), D_ANSWER, { key:'d-recap' });
    txt(v.answer, 0, 0, 50, PR.ink, CENTER);
  });
}

const D_DRAW = { question:dQuestion, misconception:dMisconception, explanation:dExplanation, reveal:dReveal, takeaway:dTakeaway };
mfInstall((b) => D_DRAW[b.stage](b.visual));

function SFX_CUES() {
  return [
    { k:'pop', t:VW('question2', 'đơn').t0 },
    { k:'tick', t:VW('misconception1', 'chữ').t0 },
    { k:'pop', t:VW('misconception2', 'lớn').t0 },
    { k:'pop', t:VW('explanation1', 'không').t0 },
    { k:'tick', t:VW('explanation2', 'mươi').t0 },
    { k:'pop', t:VW('explanation3', 'sai').t0 },
    { k:'tick', t:VW('explanation4', 'ô').t0 },
    { k:'chime', t:VW('reveal1', 'lớn').t0 },
    { k:'pop', t:VW('reveal2', 'tia').t0 },
    { k:'pop', t:VW('takeaway3', 'bảy').t0 },
    { k:'pop', t:VW('takeaway3', 'chín').t0 },
  ];
}
