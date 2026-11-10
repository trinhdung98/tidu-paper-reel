const BT_X = [300, 780];
const BT_FILL = ['#a9d6c6', '#bbd8e6'];
const BT_PILL_X = [230, 540, 850];
const BT_CHALK = 'rgba(244,244,236,0.92)', BT_GOLD = PR.mustard, BT_OK = '#9fe0b0';
const BT_ALWAYS = -1;
const BT_ROW_Y = [640, 765, 890, 1015];
const btAt = (id, word, n = 0) => VW(id, word, n).t0;
const btSpan = (t0, t1) => TT >= t0 && TT < t1;

function btFade(a, fn) {
  if (a <= 0.001) return;
  ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore();
}
function btNum(str, x, y, size, t = BT_ALWAYS, color = BT_CHALK) {
  btFade(ev(t, 0.2), () => txt(str, x, y, size, color, { align:'center', base:'middle' }));
}
// parts [{ s, t, c }] laid out once at full width, so later parts never shift the earlier ones
function btEq(parts, cx, y, size, gapEm = 0.36) {
  const gap = size * gapEm, ws = parts.map((p) => txtW(p.s, size));
  let x = cx - (ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1)) / 2;
  return parts.map((p, k) => {
    const x0 = x; x += ws[k] + gap;
    btFade(ev(p.t ?? BT_ALWAYS, 0.2), () => txt(p.s, x0, y, size, p.c ?? BT_CHALK, { base:'middle' }));
    return { x:x0 + ws[k] / 2, w:ws[k] };
  });
}
function btRing(cx, cy, rx, ry, t0, t1 = Infinity, color = BT_GOLD) {
  if (!btSpan(t0, t1)) return;
  const P = [];
  for (let k = 0; k <= 48; k++) { const a = -Math.PI / 2 + k / 48 * TAU; P.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
  chalkLine(P, ev(t0, 0.35), { color, w:6 });
}
function btBox(x0, y0, x1, y1) {
  chalkLine([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], 1, { color:BT_GOLD, w:5 });
}
function btBoard(side) {
  prBoard(BT_X[side] - 210, 540, 420, 600, 'bt-board' + side);
}

// 2-digit column addition; o.units / o.tens / o.carry are the times their digits are written (null: not yet)
function btColumn(x, a, b, o = {}) {
  const tx = x - 30, ux = x + 60, S = 110, A = String(a), B = String(b), sum = String(a + b);
  btNum(A[0], tx, 700, S); btNum(A[1], ux, 700, S);
  btNum('+', x - 140, 820, S); btNum(B[0], tx, 820, S); btNum(B[1], ux, 820, S);
  chalkLine([[x - 180, 885], [x + 120, 885]], 1, { w:7 });
  if (o.q) btNum('?', x + 15, 975, S, BT_ALWAYS, BT_GOLD);
  if (o.carry != null) btNum('1', tx, 612, 54, o.carry, BT_GOLD);
  if (o.units != null) btNum(sum[1], ux, 975, S, o.units);
  if (o.tens != null) btNum(sum[0], tx, 975, S, o.tens);
  if (o.box === 'units') btBox(ux - 46, 645, ux + 46, 1025);
  if (o.box === 'tens') btBox(tx - 46, 570, tx + 46, 1025);
  if (o.note) btEq(o.note, x, 1075, 44);
  if (o.ringCarry) btRing(tx, 612, 40, 38, ...o.ringCarry);
  if (o.ring87) btRing(x + 15, 975, 118, 70, ...o.ring87, BT_OK);
}

// 3476 + 2958 = 6434: three carries; columns are written right to left between t0 and t1
function btLong(x, t0, t1) {
  const cols = [x - 60, x + 5, x + 70, x + 135], S = 76;
  const at = (k) => lerp(t0, t1, (3 - k) / 4);
  [...'3476'].forEach((d, k) => btNum(d, cols[k], 700, S));
  btNum('+', x - 140, 800, S);
  [...'2958'].forEach((d, k) => btNum(d, cols[k], 800, S));
  chalkLine([[x - 170, 855], [x + 170, 855]], 1, { w:7 });
  [...'6434'].forEach((d, k) => {
    btNum(d, cols[k], 940, S, at(k));
    if (k < 3) btNum('1', cols[k], 628, 40, at(k + 1), BT_GOLD);
  });
  const k = [0, 1, 2, 3].find((c) => btSpan(at(c), c ? at(c - 1) : t1));
  if (k != null) btBox(cols[k] - 33, k < 3 ? 595 : 655, cols[k] + 33, 985);
}

// compensation steps; o.up / o.add / o.back hold the times of each part, BT_ALWAYS for a finished board
function btComp(x, o) {
  btEq(o.top.map((s) => ({ s, c:s === '?' ? BT_GOLD : BT_CHALK })), x, BT_ROW_Y[0], 56, 0.24);
  if (!o.up) return;
  const r1 = btEq([{ s:'49', t:o.up[0] }, { s:'+ 1', t:o.up[1], c:BT_GOLD }, { s:'= 50', t:o.up[2] }], x, BT_ROW_Y[1], 52);
  btEq([{ s:'50 + 38', t:o.add[0] }, { s:'= 88', t:o.add[1] }], x, BT_ROW_Y[2], 52);
  const r3 = btEq([{ s:'88', t:o.back[0] }, { s:'− 1', t:o.back[1], c:BT_GOLD }, { s:'=', t:o.back[2] }, { s:'87', t:o.back[2], c:BT_OK }], x, BT_ROW_Y[3], 52);
  if (o.ringPlus) btRing(r1[1].x, BT_ROW_Y[1], r1[1].w / 2 + 14, 42, ...o.ringPlus);
  if (o.ringMinus) btRing(r3[1].x, BT_ROW_Y[3], r3[1].w / 2 + 14, 42, ...o.ringMinus);
  if (o.ring87) btRing(r3[3].x, BT_ROW_Y[3], r3[3].w / 2 + 14, 42, ...o.ring87, BT_OK);
  if (o.ringRow) btRing(x, BT_ROW_Y[1], 178, 48, ...o.ringRow);
}
const BT_COMP_DONE = { top:['49', '+', '38'], up:[BT_ALWAYS, BT_ALWAYS, BT_ALWAYS], add:[BT_ALWAYS, BT_ALWAYS], back:[BT_ALWAYS, BT_ALWAYS, BT_ALWAYS] };
const BT_COLUMN_DONE = { units:BT_ALWAYS, tens:BT_ALWAYS, carry:BT_ALWAYS };

function btCards(v, alpha, s = 1) {
  [v.left, v.right].forEach((name, side) => btFade(alpha[side], () => withT(BT_X[side], 475, 0, s, () => {
    mfCard(name, 0, 0, 420, 90, { fill:BT_FILL[side], size:50, color:PR.navy });
  })));
}
function btPills(v, times, active = -1) {
  v.rows.forEach((r, k) => withT(BT_PILL_X[k], 361, 0, popS(times[k]), () => {
    pp(pR(-140, -31, 280, 62, 31), k === active ? PR.mustard : PR.creamL, { key:'bt-pill' + k, sb:10, sy:5 });
    txt(r.label, 0, 2, fitSize(r.label, k === 2 ? 216 : 236, 34), PR.navy, { align:'center', base:'middle' });
  }));
}
function btTag(side, str, alpha, tWin) {
  const x = BT_X[side], y = 1222;
  btFade(alpha, () => {
    pp(pR(x - 210, y - 40, 420, 80, 16), PR.creamL, { key:'bt-tag' + side, sb:10, sy:5 });
    txt(str, side ? x - 20 : x + 20, y + 2, fitSize(str, 330, 36), PR.ink, { align:'center', base:'middle' });
    if (tWin != null) prCheck(side ? x + 182 : x - 182, y, tWin, 26);
  });
}
function btCondition(str) {
  mfCard(str, 540, 1335, 860, 86, { size:38 });
}

function renderBeat(b) {
  const v = b.visual, nearAt = btAt('nearTen', 'gần'), longAt = btAt('longCase', 'dài');
  const alpha = b.stage === 'conditions' ? [1 - 0.65 * ev(nearAt) + 0.65 * ev(longAt), 1 - 0.65 * ev(longAt)] : [1, 1];
  btFade(alpha[0], () => btBoard(0));
  btFade(alpha[1], () => btBoard(1));
  if (b.stage === 'options' || b.stage === 'criteria') {
    btCards(v, [1, 1]);
    btColumn(BT_X[0], 49, 38, { q:true });
    btComp(BT_X[1], { top:['49', '+', '38', '=', '?'] });
    if (b.stage === 'criteria') btPills(v, [btAt('criteria', 'chính'), btAt('criteria', 'bước'), btAt('criteria', 'tiện')]);
    btCondition(v.condition);
    return;
  }
  if (b.stage === 'comparison') {
    const tensAt = btAt('colTens', 'bốn'), sameAt = CUT('sameAnswer'), memAt = CUT('memory'), roundAt = CUT('roundCase');
    const row = TT >= roundAt ? 2 : TT >= memAt ? 1 : TT >= sameAt ? 0 : -1;
    const note = TT < tensAt
      ? [{ s:'9', t:btAt('colUnits', 'chín') }, { s:'+ 8', t:btAt('colUnits', 'tám') }, { s:'= 17', t:btAt('colUnits', 'mười') }]
      : [{ s:'4', t:tensAt }, { s:'+ 3', t:btAt('colTens', 'ba') }, { s:'+ 1', t:btAt('colTens', 'thêm'), c:BT_GOLD }, { s:'= 8', t:btAt('colTens', 'tám') }];
    btCards(v, [1, 1]);
    btColumn(BT_X[0], 49, 38, {
      units:btAt('colUnits', 'viết'), carry:btAt('colUnits', 'nhớ'), tens:btAt('colTens', 'tám'),
      box:btSpan(btAt('colUnits', 'chín'), tensAt) ? 'units' : btSpan(tensAt, btAt('colTens', 'được')) ? 'tens' : null,
      note:TT < CUT('compUp') ? note : null,
      ringCarry:[btAt('memory', 'ghi'), roundAt], ring87:[btAt('sameAnswer', 'ra'), memAt],
    });
    const minusAt = btSpan(btAt('compBack', 'trừ'), sameAt) ? [btAt('compBack', 'trừ'), sameAt] : [btAt('memory', 'bớt'), roundAt];
    btComp(BT_X[1], {
      top:['49', '+', '38'],
      up:[btAt('compUp', 'bốn'), btAt('compUp', 'thêm'), btAt('compUp', 'thành')],
      add:[btAt('compAdd', 'năm'), btAt('compAdd', 'bằng')],
      back:[btAt('compBack', 'đã'), btAt('compBack', 'trừ'), btAt('compBack', 'còn')],
      ringPlus:[btAt('compBack', 'thêm'), sameAt], ringMinus:minusAt,
      ring87:[btAt('sameAnswer', 'ra'), memAt], ringRow:[btAt('roundCase', 'sát')],
    });
    btPills(v, [BT_ALWAYS, BT_ALWAYS, BT_ALWAYS], row);
    if (row >= 0) {
      const wins = [[btAt('sameAnswer', 'tám'), btAt('sameAnswer', 'tám')], [btAt('memory', 'giấy'), null], [null, btAt('roundCase', 'gọn')]][row];
      btTag(0, v.rows[row].left, 1, wins[0]);
      btTag(1, v.rows[row].right, 1, wins[1]);
      btCondition(v.condition);
    }
    return;
  }
  if (b.stage === 'conditions') {
    btFade(alpha[0], () => btLong(BT_X[0], btAt('longCase', 'theo'), VL('longCase').t1));
    btFade(alpha[1], () => btComp(BT_X[1], { ...BT_COMP_DONE, ringRow:[nearAt, CUT('longCase')] }));
    btCards(v, alpha);
    btPills(v, [BT_ALWAYS, BT_ALWAYS, BT_ALWAYS], 2);
    btTag(0, v.rows[2].left, alpha[0], btAt('longCase', 'hàng'));
    btTag(1, v.rows[2].right, alpha[1], btAt('nearTen', 'nhanh'));
    btCondition(v.condition);
    return;
  }
  const bounceAt = btAt('noWinner', 'không'), u = ev(btAt('practice', 'năm'));
  btCards(v, [1, 1], 1 + 0.07 * Math.sin(Math.PI * seg(TT, bounceAt, bounceAt + 0.45)));
  btFade(Math.max(0, 1 - 2 * u), () => {
    btColumn(BT_X[0], 49, 38, BT_COLUMN_DONE);
    btComp(BT_X[1], BT_COMP_DONE);
    btTag(0, v.rows[0].left, 1, BT_ALWAYS);
    btTag(1, v.rows[0].right, 1, BT_ALWAYS);
  });
  btFade(Math.max(0, 2 * u - 1), () => {
    btColumn(BT_X[0], 59, 26, { q:true });
    btComp(BT_X[1], { top:['59', '+', '26', '=', '?'] });
  });
  btPills(v, [BT_ALWAYS, BT_ALWAYS, BT_ALWAYS]);
  mfCard(v.condition, 540, 1335, 680, 100, { size:36 });
}
mfInstall(renderBeat);

function SFX_CUES() {
  const c = [];
  for (const w of ['chính', 'bước', 'tiện']) c.push({ k:'pop', t:btAt('criteria', w) });
  for (const [id, w] of [['colUnits', 'viết'], ['colUnits', 'nhớ'], ['colTens', 'tám'], ['compUp', 'thành'], ['compAdd', 'bằng'], ['compBack', 'trừ'], ['compBack', 'còn']]) c.push({ k:'tick', t:btAt(id, w) });
  c.push({ k:'chime', t:btAt('sameAnswer', 'ra') });
  for (const [id, w] of [['sameAnswer', 'tám'], ['memory', 'giấy'], ['roundCase', 'gọn'], ['nearTen', 'nhanh'], ['longCase', 'hàng']]) c.push({ k:'pop', t:btAt(id, w) });
  const t0 = btAt('longCase', 'theo'), t1 = VL('longCase').t1;
  for (let k = 0; k < 4; k++) c.push({ k:'tick', t:lerp(t0, t1, k / 4) });
  c.push({ k:'pop', t:btAt('practice', 'năm') });
  return c;
}
