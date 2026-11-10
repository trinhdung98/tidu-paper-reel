// One unit cell is U0 px in every 2-vs-4 comparison, so the larger area is never faked by zooming cells.
const U0 = 90, GY = 1050;
const MINT = '#a9d6c6', SKY = '#bbd8e6', ROSE = '#f0c2b4', SAND = '#f2dc8f';
const QUAD = [MINT, SKY, ROSE, SAND];
const at = (id, word, n = 0) => VW(id, word, n).t0;
const quad = (c, r, n) => QUAD[(c >= n / 2 ? 1 : 0) + (r >= n / 2 ? 2 : 0)];

function gdNum(n, x, y, size, hi) {
  if (hi) pp(pE(x, y, size * 0.72, size * 0.72), PR.yellow, { shadow:false, key:'gd-num' });
  txt(String(n), x, y, size, hi ? PR.ink : PR.creamL, { align:'center', base:'middle' });
}
function gdRuler(x0, cols, rows, u, { hiW = false, hiH = false } = {}) {
  const size = Math.min(34, u * 0.6);
  for (let c = 0; c < cols; c++) gdNum(c + 1, x0 + c * u + u / 2, GY + 32, size, hiW);
  for (let r = 0; r < rows; r++) gdNum(r + 1, x0 - 30, GY - r * u - u / 2, size, hiH);
}
// fill(c, r) returns a colour, or null to leave the slot empty on the board
function gdGrid(x0, cols, rows, u, fill, { key = 'gd', ...ruler } = {}) {
  const y0 = GY - rows * u;
  pp(pR(x0 - 6, y0 - 6, cols * u + 12, rows * u + 12, 10), PR.navyD, { key:key + '-board' });
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const f = fill(c, r);
    if (f) pp(pR(x0 + c * u + 3, y0 + r * u + 3, u - 6, u - 6, 6), f, { shadow:false, key:key + c + '-' + r });
  }
  gdRuler(x0, cols, rows, u, ruler);
}
function gdQuarters(x0, n, u) {
  const mx = x0 + n * u / 2, my = GY - n * u / 2;
  chalkLine([[mx, GY - n * u - 4], [mx, GY + 4]], 1, { color:PR.navyD, w:9 });
  chalkLine([[x0 - 4, my], [x0 + n * u + 4, my]], 1, { color:PR.navyD, w:9 });
}
function gdDashed(x0, y0, x1, y1, color) {
  chalkLine([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], 1, { color, w:6, dash:[18, 14] });
}
function gdGhost(x0, n, u, wash, ruler = {}) {
  const y0 = GY - n * u;
  if (wash) {
    ctx.save(); ctx.globalAlpha = 0.25;
    pp(pR(x0, y0, n * u, n * u, 8), PR.yellow, { shadow:false, tex:false });
    ctx.restore();
  }
  gdDashed(x0, y0, x0 + n * u, GY, wash ? PR.yellow : PR.creamL);
  txt('?', x0 + n * u / 2, y0 + n * u / 2, 130, PR.creamL, { align:'center', base:'middle' });
  gdRuler(x0, n, n, u, ruler);
}
function gdLabels(x, side, area) {
  mfText(side, x, 1135, 330, 36, PR.creamL, 1);
  if (area) mfText(area, x, 1183, 330, 40, PR.yellow, 1);
}
function gdTop(tag, tagFill, main, status, crossT) {
  pp(pR(110, 420, 860, 240, 22), PR.creamL, { key:'gd-top' });
  pp(pR(410, 436, 260, 54, 27), tagFill, { shadow:false, key:'gd-tag' });
  mfText(tag, 540, 463, 220, 34, PR.ink, 1);
  mfText(main, 540, status ? 550 : 565, 720, 42, PR.ink, 2);
  if (status) mfText(status, 540, 628, 760, 32, '#4f5a63', 1);
  if (crossT != null) prCross(930, 458, crossT, 28);
}
function gdNote(str, x, y, w, h, t, fill = PR.creamL, size = 34) {
  if (TT < t) return;
  withT(x, y, 0, popS(t), () => mfCard(str, 0, 0, w, h, { fill, size }));
}

function gdHypothesis(v) {
  gdTop('GIẢ ĐỊNH', PR.yellow, v.hypothesis, v.reality);
  gdGrid(220, 2, 2, U0, () => MINT, { key:'gd-small' });
  gdGhost(500, 4, U0, TT >= at('hypothesis2', 'nhân'));
  gdLabels(310, 'cạnh 2 đơn vị');
  gdLabels(680, 'cạnh 4 đơn vị');
  gdNote(v.assumptions[0], 540, 1265, 820, 86, at('hypothesis2', 'nhân'), PR.creamL);
  gdNote(v.assumptions[1], 540, 1375, 820, 86, at('hypothesis3', 'kiểm'), PR.yellow);
}
function gdAssumptions(v) {
  gdTop('GIẢ ĐỊNH', PR.yellow, v.hypothesis, v.reality);
  const times = [at('assumptions1', 'cùng'), at('assumptions2', 'diện'), at('assumptions3', 'rộng')];
  const ruler = { hiW:TT >= times[2], hiH:TT >= at('assumptions3', 'cao') };
  gdGrid(220, 2, 2, U0, (c, r) => (TT >= times[0] && !c && !r ? PR.yellow : MINT), { key:'gd-small', ...ruler });
  gdGhost(500, 4, U0, true, ruler);
  if (TT >= times[0]) withT(500 + U0 / 2, GY - 3.5 * U0, 0, popS(times[0]), () => pp(pR(-U0 / 2 + 3, -U0 / 2 + 3, U0 - 6, U0 - 6, 6), PR.yellow, { key:'gd-unit' }));
  gdLabels(310, 'cạnh 2 đơn vị');
  gdLabels(680, 'cạnh 4 đơn vị');
  v.assumptions.forEach((s, k) => gdNote(s, 540, 1250 + k * 78, 820, 56, times[k], k === 2 ? PR.yellow : PR.creamL, 32));
}
function gdConsequences(v) {
  const rowsSmall = [at('consequences1', 'hàng', 0), at('consequences1', 'hàng', 1)];
  const t4 = at('consequences1', 'bốn'), t16 = at('consequences2', 'mười'), large = VL('consequences2').t0;
  const tq = at('consequences3', 'phần'), t4x = at('consequences4', 'bốn');
  const rowT = (r) => lerp(at('consequences2', 'hàng', 0), t16, r / 4);
  gdTop('GIẢ ĐỊNH', PR.yellow, v.hypothesis, TT < t4x ? v.reality : 'Đã kiểm chứng: diện tích gấp bốn', at('consequences4', 'không'));
  gdGrid(220, 2, 2, U0, (c, r) => (TT < large && TT >= rowsSmall[r] ? PR.yellow : MINT), { key:'gd-small' });
  if (TT < large) gdGhost(500, 4, U0, true);
  else {
    gdGrid(500, 4, 4, U0, (c, r) => {
      const q = (c >= 2 ? 1 : 0) + (r >= 2 ? 2 : 0);
      return TT >= tq + q * 0.3 ? QUAD[q] : TT >= rowT(r) ? PR.creamL : null;
    }, { key:'gd-large' });
    if (TT >= tq) gdQuarters(500, 4, U0);
  }
  gdLabels(310, 'cạnh 2 đơn vị', TT >= t4 ? '4 ô vuông' : null);
  gdLabels(680, 'cạnh 4 đơn vị', TT >= t16 ? '16 ô vuông' : null);
  [t4, t16, tq, t4x].forEach((t, k) => gdNote(v.consequences[k], 320 + (k % 2) * 440, 1265 + Math.floor(k / 2) * 110, 420, 86, t, k === 3 ? PR.yellow : PR.creamL));
}
function gdReality(v) {
  const tw = at('reality2', 'bốn'), t8 = at('reality2', 'tám'), tNot = at('reality3', 'không'), t16 = at('reality4', 'mười');
  const wide = TT >= tw;
  gdTop('THỰC TẾ', MINT, v.reality, null);
  if (wide) gdGrid(140, 4, 2, U0, (c) => (c < 2 ? MINT : SKY), { key:'gd-rect', hiH:TT >= at('reality3', 'dọc') });
  else {
    gdGrid(140, 2, 2, U0, () => MINT, { key:'gd-rect' });
    gdDashed(320, GY - 2 * U0, 500, GY, PR.yellow);
  }
  gdGrid(580, 4, 4, U0, (c, r) => quad(c, r, 4), { key:'gd-square' });
  gdQuarters(580, 4, U0);
  if (TT >= tNot) {
    withT(340, 765, 0, popS(tNot), () => mfCard('Không phải hình vuông', 0, 0, 280, 124, { fill:ROSE, size:36 }));
    prCross(150, 765, tNot, 30);
  }
  gdLabels(320, wide ? 'rộng 4, cao 2' : 'rộng 2, cao 2', wide ? (TT >= t8 ? '8 ô vuông' : null) : '4 ô vuông');
  gdLabels(760, 'rộng 4, cao 4', '16 ô vuông');
  gdNote('Chữ nhật 4 × 2 = 8 ô: gấp đôi', 540, 1265, 820, 86, t8, SKY);
  gdNote('Hình vuông 4 × 4 = 16 ô: gấp bốn', 500, 1375, 740, 86, t16, MINT);
  prCheck(925, 1375, t16, 28);
}
function gdTakeaway(v) {
  const practice = VL('takeaway2').t0, t9 = at('takeaway2', 'chín'), t36 = at('takeaway2', 'mươi'), tNote = VL('takeaway3').t0;
  gdTop('GHI NHỚ', MINT, v.takeaway, null);
  if (TT < practice) {
    gdGrid(220, 2, 2, U0, () => MINT, { key:'gd-small' });
    gdGrid(500, 4, 4, U0, (c, r) => quad(c, r, 4), { key:'gd-large' });
    gdQuarters(500, 4, U0);
    gdLabels(310, 'cạnh 2 đơn vị', '4 ô vuông');
    gdLabels(680, 'cạnh 4 đơn vị', '16 ô vuông');
  } else {
    // practice pair: a smaller shared cell so 6 x 6 keeps the 4 x 4 footprint; both squares still use the same cell
    const u = 60;
    gdGrid(220, 3, 3, u, () => MINT, { key:'gd-small3' });
    gdGrid(500, 6, 6, u, (c, r) => (TT >= t36 ? quad(c, r, 6) : PR.creamL), { key:'gd-large6' });
    if (TT >= t36) gdQuarters(500, 6, u);
    gdLabels(310, 'cạnh 3 đơn vị', TT >= t9 ? '9 ô vuông' : null);
    gdLabels(680, 'cạnh 6 đơn vị', TT >= t36 ? '36 ô vuông' : null);
  }
  pp(pR(130, 1215, 820, 100, 18), PR.creamL, { key:'gd-old' });
  pp(pR(150, 1243, 180, 44, 22), PR.yellow, { shadow:false, key:'gd-old-tag' });
  mfText('GIẢ ĐỊNH', 240, 1265, 150, 28, PR.ink, 1);
  mfText(v.hypothesis, 610, 1265, 520, 32, PR.ink, 2);
  prCross(915, 1265, MF_TIMES[4].t0, 26);
  if (TT < tNote) gdNote('9 ô thành 36 ô: gấp bốn', 540, 1378, 600, 80, t36, MINT);
  else gdNote('Vẽ và đếm trên vở ô li', 540, 1378, 600, 80, tNote, PR.yellow);
}

const GD_DRAW = [gdHypothesis, gdAssumptions, gdConsequences, gdReality, gdTakeaway];
function renderBeat(b, i) { GD_DRAW[i](b.visual); }
mfInstall(renderBeat);

function SFX_CUES() {
  const cues = [], pop = (t) => cues.push({ k:'pop', t }), tick = (t) => cues.push({ k:'tick', t });
  pop(at('hypothesis2', 'nhân')); pop(at('hypothesis3', 'kiểm'));
  pop(at('assumptions1', 'cùng')); pop(at('assumptions2', 'diện')); pop(at('assumptions3', 'rộng'));
  tick(at('consequences1', 'hàng', 0)); tick(at('consequences1', 'hàng', 1)); pop(at('consequences1', 'bốn'));
  const t16 = at('consequences2', 'mười');
  for (let r = 0; r < 4; r++) tick(lerp(at('consequences2', 'hàng', 0), t16, r / 4));
  pop(t16);
  for (let q = 0; q < 4; q++) tick(at('consequences3', 'phần') + q * 0.3);
  cues.push({ k:'chime', t:at('consequences4', 'bốn') });
  pop(at('reality2', 'bốn')); pop(at('reality2', 'tám')); pop(at('reality3', 'không'));
  cues.push({ k:'chime', t:at('reality4', 'mười') });
  pop(at('takeaway2', 'mươi')); pop(VL('takeaway3').t0);
  return cues.sort((a, b) => a.t - b.t);
}
