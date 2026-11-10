const MQ = MF_BEATS[0].visual;
const MQ_ROW_Y = 560, MQ_SLOT_Y = 800, MQ_STRIP_Y = 800;
const MQ_SLOTS = [[350, 1010], [730, 1010], [350, 1210], [730, 1210]];
const MQ_WIDTH = { num:130, op:76, par:60 };
const MQ_EXPR = [['6', 'num'], ['+', 'op'], ['4', 'num'], ['×', 'op'], ['2', 'num'], ['=', 'op'], ['?', 'num']];
const MQ_SOLVED = [['6', 'num'], ['+', 'op'], ['8', 'num'], ['=', 'op'], ['?', 'num']];
const MQ_PRACTICE = [['(', 'par'], ['6', 'num'], ['+', 'op'], ['4', 'num'], [')', 'par'], ['×', 'op'], ['2', 'num'], ['=', 'op'], ['?', 'num']];
// expression tile k -> solved tile; the factor pair 4 × 2 (tiles 2-4) folds into the single 8 tile
const MQ_FOLD = [0, 1, 2, 2, 2, 3, 4];
const MQ_CORRECT_FILL = PR.moneyL;

const mqBump = (d, dur = 0.45) => (d < 0 || d > dur ? 0 : Math.sin(d / dur * Math.PI));
const mqAt = (id, word, n = 0) => VW(id, word, n).t0;

function mqXs(items, cx = 540, gap = 10) {
  const total = items.reduce((a, [, k]) => a + MQ_WIDTH[k], 0) + gap * (items.length - 1);
  let x = cx - total / 2;
  return items.map(([, k]) => { const c = x + MQ_WIDTH[k] / 2; x += MQ_WIDTH[k] + gap; return c; });
}
// pp() sets its own globalAlpha for the texture pass, so faded tiles and cards scale `tex` themselves
function mqTile(str, kind, x, y, o = {}) {
  const s = o.s ?? 1, alpha = o.alpha ?? 1;
  if (s <= 0.01 || alpha <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= alpha;
  withT(x, y, 0, s, () => {
    if (kind === 'num') {
      pp(pR(-65, -80, 130, 160, 18), o.fill ?? PR.creamL, { key:'mq-num-' + (o.key ?? str), rim:o.rim, rw:7, tex:0.55 * alpha });
      txt(str, 0, 6, fitSize(str, 108, 104), o.ink ?? PR.navy, { align:'center', base:'middle' });
    } else if (kind === 'op') {
      pp(pE(0, 0, 36, 36), o.fill ?? PR.cream, { key:'mq-op-' + (o.key ?? str), tex:0.55 * alpha });
      txt(str, 0, 3, 58, PR.ink, { align:'center', base:'middle' });
    } else txt(str, 0, -8, 176, PR.red, { align:'center', base:'middle' });
  });
  ctx.restore();
}
function mqRow(items, style = () => ({})) {
  const xs = mqXs(items);
  items.forEach(([str, kind], k) => { const o = style(k); mqTile(str, kind, xs[k], MQ_ROW_Y - (o.lift ?? 0), o); });
}
function mqWedge(r, a0, a1) { return () => { ctx.moveTo(0, 0); ctx.arc(0, 0, r, a0, a1); ctx.closePath(); }; }
// drawn around (0, 0); callers place and scale it with withT
function mqWatch(r, label, left, sub) {
  pp(pR(-34, -r - 40, 68, 22, 10), PR.navy, { key:'mq-watch-knob' });
  pp(pR(-15, -r - 24, 30, 34, 6), PR.navy, { key:'mq-watch-stem' });
  pp(pE(0, 0, r, r), PR.navy, { key:'mq-watch-ring' });
  pp(pE(0, 0, r * 0.84, r * 0.84), PR.creamL, { key:'mq-watch-face', shadow:false });
  if (left > 0.001) pp(mqWedge(r * 0.84, -Math.PI / 2, -Math.PI / 2 + TAU * left), 'rgba(230,184,42,0.55)', { shadow:false, tex:false });
  txt(label, 0, sub ? -r * 0.1 : r * 0.04, r * (sub ? 0.95 : 1.05), PR.navy, { align:'center', base:'middle' });
  if (sub) txt(sub, 0, r * 0.52, r * 0.22, PR.navy, { align:'center', base:'middle' });
}
function mqChoice(k, o = {}) {
  const [x, y] = MQ_SLOTS[k], s = o.s ?? 1, alpha = o.alpha ?? 1;
  if (s <= 0.01 || alpha <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= alpha;
  withT(x, y, 0, s, () => {
    pp(pR(-170, -85, 340, 170, 20), o.fill ?? PR.sky, { key:'mq-choice-' + k, rim:o.rim, rw:7, tex:0.55 * alpha });
    txt(MQ.choices[k], 0, 6, 96, PR.navy, { align:'center', base:'middle' });
  });
  if (o.check !== undefined) prCheck(x - 112, y, o.check, 40);
  ctx.restore();
}
function mqStrip(fill, rim, s, content) {
  withT(540, MQ_STRIP_Y, 0, s, () => { pp(pR(-430, -75, 860, 150, 20), fill, { key:'mq-strip-' + fill, rim, rw:6 }); content(); });
}

function mqChallenge() {
  const words = ['sáu', 'cộng', 'bốn', 'nhân', 'hai', 'bằng', 'bao'];
  mqRow(MQ_EXPR, (k) => ({ lift:22 * mqBump(TT - mqAt('challenge2', words[k])) }));
  const s = 1 + 0.07 * mqBump(TT - mqAt('challenge1', 'năm'), 0.5);
  withT(540, 1030, 0, s, () => mqWatch(200, String(MQ.countdown), 1, 'GIÂY'));
}
function mqCountdown() {
  const end = VL('thinking1').t1, d = TT - end, n = MQ.countdown;
  if (d >= n) { prStamp('HẾT GIỜ', 540, MQ_SLOT_Y, PR.red, end + n, { from:1.3, size:64 }); return; }
  const shown = n - Math.max(0, Math.floor(d)), pulse = d >= 0 ? 0.06 * mqBump(d - Math.floor(d), 0.3) : 0;
  withT(540, MQ_SLOT_Y, 0, 1 + pulse, () => mqWatch(95, String(shown), 1 - clamp(d / n)));
}
const mqChoiceCues = () => [mqAt('options1', 'mười', 0), mqAt('options1', 'hai'), mqAt('options1', 'mười', 1), mqAt('options1', 'mười', 2)];
function mqOptions(stage) {
  const cues = mqChoiceCues();
  MQ.choices.forEach((_, k) => mqChoice(k, stage === 'options' ? { s:popS(cues[k]) } : {}));
}
function mqRevealed(fade, highlight = -1) {
  MQ.choices.forEach((_, k) => {
    if (k === MQ.correct) mqChoice(k, { fill:MQ_CORRECT_FILL, rim:PR.green, check:VL('answer1').t0, alpha:fade.all });
    else if (k === highlight) mqChoice(k, { fill:PR.pink, rim:PR.red, alpha:fade.all });
    else mqChoice(k, { alpha:fade.all * lerp(1, 0.35, fade.others) });
  });
}
function mqAnswer() {
  const reveal = VL('answer1').t0;
  mqRow(MQ_EXPR);
  if (TT < reveal) { mqOptions('answer'); return; }
  mqRevealed({ all:1, others:seg(TT, reveal, reveal + 0.3) });
  prStamp('ĐÁP ÁN ĐÚNG', 540, MQ_SLOT_Y, PR.green, mqAt('answer1', 'đúng'), { from:1.3, size:56 });
}

function mqExplain() {
  const e2 = VL('explain2').t0, e4 = VL('explain4').t0, e5 = VL('explain5').t0;
  // the factor pair shrinks away in place before the 8 lands, so no two texts share a spot mid-fold
  const pair = mqAt('explain1', 'nhân', 0), u = seg(TT, e2, e2 + 0.6);
  const gone = EZ.i2(seg(u, 0, 0.45)), slide = EZ.io(seg(u, 0.3, 1)), eight = EZ.back(seg(u, 0.45, 1));
  const xsA = mqXs(MQ_EXPR), xsB = mqXs(MQ_SOLVED);
  const lit = TT >= pair ? { fill:PR.yellow, rim:PR.mustard } : {};
  MQ_EXPR.forEach(([str, kind], k) => {
    if (k === 6) return;
    if (k >= 2 && k <= 4) mqTile(str, kind, xsA[k], MQ_ROW_Y, { ...lit, s:1 - gone });
    else mqTile(str, kind, lerp(xsA[k], xsB[MQ_FOLD[k]], slide), MQ_ROW_Y);
  });
  mqTile('8', 'num', xsB[2], MQ_ROW_Y, { fill:PR.yellow, rim:PR.mustard, s:eight });
  const sum = mqAt('explain2', 'mười');
  const q = lerp(xsA[6], xsB[4], slide);
  if (TT < sum) mqTile('?', 'num', q, MQ_ROW_Y);
  else mqTile('14', 'num', q, MQ_ROW_Y, { fill:MQ_CORRECT_FILL, rim:PR.green, s:popS(sum) });

  const x0 = xsA[2] - 65, x1 = xsA[4] + 65, mid = (x0 + x1) / 2;
  ctx.save(); ctx.globalAlpha *= 1 - gone;
  const draw = seg(TT, mqAt('explain1', 'bốn'), VW('explain1', 'hai').t1);
  chalkLine([[x0, 654], [x0 + 16, 676], [mid - 18, 676], [mid, 698], [mid + 18, 676], [x1 - 16, 676], [x1, 654]], draw, { color:PR.mustard, w:9 });
  withT(mid, 762, 0, popS(mqAt('explain1', 'tám')), () => {
    pp(pE(0, 0, 44, 44), PR.yellow, { key:'mq-eight', rim:PR.mustard, rw:5 });
    txt('8', 0, 4, 64, PR.navy, { align:'center', base:'middle' });
  });
  ctx.restore();

  const slip = mqAt('explain3', 'cộng'), times = mqAt('explain3', 'nhân');
  if (TT >= slip && TT < e4) {
    mqStrip(PR.pink, PR.red, popS(slip), () => {
      txt('6 + 4 = 10', -240, 4, fitSize('6 + 4 = 10', 280, 56), PR.navy, { align:'center', base:'middle' });
      mfArrow(-78, 0, 58, 0, seg(TT, times, times + 0.3), PR.red);
      withT(240, 4, 0, popS(times + 0.2), () => txt('10 × 2 = 20', 0, 0, fitSize('10 × 2 = 20', 300, 56), PR.navy, { align:'center', base:'middle' }));
    });
  }
  if (TT >= e4) {
    mqStrip(PR.creamL, PR.mustard, popS(e4), () => {
      txt('Không có ngoặc:', 0, -34, 38, PR.greenK, { align:'center', base:'middle' });
      txt('nhân trước, cộng sau', 0, 28, fitSize('nhân trước, cộng sau', 780, 58), PR.navy, { align:'center', base:'middle' });
    });
  }

  const wrong = TT >= mqAt('explain3', 'hai') && TT < e4 ? 1 : -1;
  mqRevealed({ all:1 - seg(TT, e5, e5 + 0.18), others:1 }, wrong);
  mqPractice(e5 + 0.18);
}
function mqPractice(t0) {
  const s = popS(t0);
  if (s <= 0.01) return;
  withT(540, 1120, 0, s, () => {
    pp(pR(-430, -180, 860, 360, 24), PR.creamL, { key:'mq-practice', rim:PR.mustard, rw:6 });
    txt('Thử nhé', 0, -122, 44, PR.greenK, { align:'center', base:'middle' });
    const opens = [mqAt('explain5', 'sáu'), mqAt('explain5', 'tất')];
    withT(0, 52, 0, 0.85, () => {
      const xs = mqXs(MQ_PRACTICE, 0);
      MQ_PRACTICE.forEach(([str, kind], k) => {
        const p = str === '(' ? opens[0] : str === ')' ? opens[1] : null;
        mqTile(str, kind, xs[k], 0, { s:p === null ? 1 : 1 + 0.25 * mqBump(TT - p, 0.5), key:'practice-' + k });
      });
    });
  });
}

function renderBeat(b) {
  if (b.stage === 'challenge') return mqChallenge();
  if (b.stage === 'answer') return mqAnswer();
  if (b.stage === 'explanation') return mqExplain();
  mqRow(MQ_EXPR);
  if (b.stage === 'options') withT(540, MQ_SLOT_Y, 0, 1, () => mqWatch(95, String(MQ.countdown), 1));
  else mqCountdown();
  mqOptions(b.stage);
}
mfInstall(renderBeat, { title:(b) => (b.stage === 'answer' && TT < VL('answer1').t0 ? 'Đáp án' : b.title) });

function SFX_CUES() {
  const end = VL('thinking1').t1, cues = [];
  mqChoiceCues().forEach((t) => cues.push({ t, k:'pop' }));
  for (let k = 0; k <= MQ.countdown; k++) cues.push({ t:end + k, k:'tick' });
  cues.push({ t:VL('answer1').t0, k:'chime' });
  cues.push({ t:mqAt('explain1', 'tám'), k:'pop' }, { t:VL('explain2').t0, k:'pop' }, { t:mqAt('explain3', 'cộng'), k:'pop' }, { t:VL('explain4').t0, k:'pop' }, { t:VL('explain5').t0 + 0.18, k:'pop' });
  return cues;
}
