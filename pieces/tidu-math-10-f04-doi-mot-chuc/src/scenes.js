const DM_TAGS = [225, 435, 645, 855];
const DM_ROD_X = [160, 230, 300, 370, 440];
const DM_ROD_Y = 500, DM_SEG = 44;
const DM_CUBE = 40;
const dmSlot = (s) => [780 + ((s % 4) - 1.5) * 58, 650 + Math.floor(s / 4) * 58];
const dmAt = (id, word, n = 0) => VW(id, word, n).t0;

function dmT() {
  return {
    split: dmAt('swap1', 'tháo'),
    move: dmAt('swap2', 'chuyển'),
    ones: dmAt('why3', 'bớt'),
    tens: dmAt('why4', 'bớt'),
  };
}
function dmCube(x, y, a = 1, fill = PR.mustard) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha = a;
  pp(pR(x - DM_CUBE / 2, y - DM_CUBE / 2, DM_CUBE, DM_CUBE, 6), fill, { key:'dm-cube', sb:6, sy:3, rim:'rgba(24,27,36,0.35)', rw:2 });
  ctx.restore();
}
function dmRod(x, a = 1, dy = 0) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha = a;
  pp(pR(x - 25, DM_ROD_Y + dy, 50, DM_SEG * 10, 8), PR.tidu, { key:'dm-rod', rim:'rgba(24,27,36,0.35)', rw:2 });
  ctx.strokeStyle = PR.tiduD; ctx.lineWidth = 3;
  for (let k = 1; k < 10; k++) { const y = DM_ROD_Y + dy + k * DM_SEG; ctx.beginPath(); ctx.moveTo(x - 25, y); ctx.lineTo(x + 25, y); ctx.stroke(); }
  ctx.restore();
}
function dmBlocks() {
  const T = dmT();
  const out = (t) => EZ.o2(seg(TT, t, t + 0.7));
  const tensGone = out(T.tens), onesGone = out(T.ones);
  for (let r = 0; r < 4; r++) {
    const leaving = r >= 2;
    dmRod(DM_ROD_X[r], leaving ? 1 - tensGone : 1, leaving ? -70 * tensGone : 0);
  }
  const split = EZ.io(seg(TT, T.split, T.split + 0.5));
  if (split <= 0) dmRod(DM_ROD_X[4]);
  else for (let k = 0; k < 10; k++) {
    const sx = DM_ROD_X[4], sy = DM_ROD_Y + DM_SEG / 2 + k * DM_SEG;
    const gx = sx + (k % 2 ? 14 : -14) * split, gy = sy + (k - 4.5) * 10 * split;
    const u = EZ.io(seg(TT, T.move + k * 0.06, T.move + k * 0.06 + 0.9));
    const [tx, ty] = dmSlot(2 + k);
    const leaving = 2 + k >= 5;
    dmCube(lerp(gx, tx, u), lerp(gy, ty, u) - (leaving ? 70 * onesGone : 0), leaving ? 1 - onesGone : 1, split < 1 ? PR.tiduL : PR.mustard);
  }
  for (let s = 0; s < 2; s++) { const [x, y] = dmSlot(s); dmCube(x, y); }
}
function dmShortage(b) {
  if (b.stage !== 'components' || TT < VL('parts4').t0) return;
  ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 4; ctx.setLineDash([10, 8]);
  for (let s = 2; s < 7; s++) { const [x, y] = dmSlot(s); ctx.strokeRect(x - DM_CUBE / 2, y - DM_CUBE / 2, DM_CUBE, DM_CUBE); }
  ctx.restore();
  prCross(780, 900, VW('parts4', 'không').t0, 44);
}
function dmNeed(b) {
  if (b.stage !== 'components' || TT < VL('parts3').t0) return;
  ctx.save(); ctx.strokeStyle = PR.creamL; ctx.lineWidth = 4; ctx.setLineDash([12, 8]);
  ctx.strokeRect(DM_ROD_X[2] - 40, DM_ROD_Y - 14, DM_ROD_X[3] - DM_ROD_X[2] + 80, DM_SEG * 10 + 28);
  ctx.restore();
}
function dmRows(rows, w = 760) {
  rows.forEach(([str, t, fill], i) => {
    if (TT < t) return;
    withT(540, 1030 + i * 100, 0, t > 0 ? popS(t) : 1, () => mfCard(str, 0, 0, w, 84, { fill: fill || PR.creamL, size: 40 }));
  });
}
function dmLedger(b) {
  const T = dmT();
  if (b.stage === 'system') return dmRows([['52 − 27 = ?', 0]]);
  if (b.stage === 'components') return dmRows([
    ['52 = 5 chục 2 đơn vị', 0],
    ['27 = 2 chục 7 đơn vị', VL('parts3').t0],
  ]);
  if (b.stage === 'process') return dmRows([
    ['5 chục 2 đơn vị = 52', 0],
    ['4 chục 12 đơn vị = 52', dmAt('swap3', 'bốn'), PR.yellow],
  ]);
  if (b.stage === 'mechanism') return dmRows([
    ['4 chục 12 đơn vị = 52', 0],
    ['12 − 7 = 5 đơn vị', T.ones],
    ['4 − 2 = 2 chục', T.tens],
  ]);
  dmRows([
    ['52 − 27 = 25', 0, PR.yellow],
    ['25 + 27 = 52', dmAt('end3', 'cộng')],
  ], 600);
  prCheck(900, 1130, dmAt('end3', 'đúng'), 40);
}
function dmActive(b) {
  const { index } = mfLine(b);
  if (b.stage === 'components') return index === 0 ? 0 : 1;
  if (b.stage === 'mechanism') return index < 2 ? 2 : index === 2 ? 1 : 0;
  return b.visual.active;
}
function dmStrip(b) {
  const a = dmActive(b);
  b.visual.layers.forEach((tag, i) => {
    ctx.save(); ctx.globalAlpha = i === a ? 1 : 0.55;
    mfCard(tag, DM_TAGS[i], 1340, 180, 64, { fill: i === a ? PR.mustard : PR.cream, size: 34 });
    ctx.restore();
  });
}
function renderBeat(b) {
  mfCard(b.visual.detail, 540, 361, 800, 72, { size: 38 });
  txt('chục', 300, 470, 44, PR.creamL, { align:'center', base:'middle' });
  txt('đơn vị', 780, 470, 44, PR.creamL, { align:'center', base:'middle' });
  dmNeed(b);
  dmBlocks();
  dmShortage(b);
  dmLedger(b);
  dmStrip(b);
}
mfInstall(renderBeat);

function SFX_CUES() {
  const T = dmT();
  return [
    { t: VL('parts1').t0, k: 'tick' },
    { t: VL('parts2').t0, k: 'tick' },
    { t: T.split, k: 'pop' },
    { t: T.move, k: 'pop' },
    { t: dmAt('swap3', 'bốn'), k: 'tick' },
    { t: T.ones, k: 'pop' },
    { t: T.tens, k: 'pop' },
    { t: dmAt('end3', 'đúng'), k: 'chime' },
  ];
}
