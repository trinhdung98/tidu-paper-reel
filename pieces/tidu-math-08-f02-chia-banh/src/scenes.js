const CB_NAMES = MF_BEATS[0].visual.items;
const CB_PX = [260, 540, 820], CB_PY = 970, CB_CARD_Y = 1170, CB_TRAY_Y = 1335;
const CB_FILL = ['#bbd8e6', '#a9d6c6', '#f4d7b4'];
// Slots 0-3 form the 2x2 square that a fair plate of four ends on; slots 4-5 only hold the extra cakes of the 6-cake plate.
const CB_SLOT = [[-33, -33], [33, 33], [33, -33], [-33, 33], [0, -90], [0, 90]];
const CB_OWL = { x:230, y:800, s:0.55 };
const CB_BUBBLE = { x:670, y:560, w:520, h:230 };

const CB_NAME_T = [VW('characterFriends', 'Na').t0, VW('characterFriends', 'Bin').t0, VW('characterFriends', 'Mai').t0];
const CB_ASK_T = VW('problemAsk', 'bao').t0;
const CB_COUNT_T = [VW('attemptCount', 'sáu').t0, VW('attemptCount', 'bốn').t0, VW('attemptCount', 'hai').t0];
const CB_CROSS_T = VW('attemptCheck', 'không').t0;
const CB_ROUND_T = [VW('attemptRound', 'đặt').t0, VW('consequenceRounds', 'hai').t0, VW('consequenceRounds', 'ba').t0, VW('consequenceRounds', 'bốn').t0];
const CB_EMPTY_T = VW('consequenceEmpty', 'trống').t0;
const CB_FAIR_T = [VW('consequenceCount', 'bốn', 0).t0, VW('consequenceCount', 'bốn', 1).t0, VW('consequenceCount', 'bốn', 2).t0];
const CB_PRACTICE_FADE = VW('lessonPractice', 'thử').t0;
const CB_PRACTICE_Q = VW('lessonPractice', 'mười').t0;
const CB_PRACTICE_POP = VW('lessonPractice', 'lăm').t0;

// Every cake keeps one identity for the whole video: its moves are tray -> 6/4/2 split -> back to its own tray slot -> dealt one per plate per round.
const CB_MOVES = Array.from({ length:12 }, () => []);
const CB_DEALS = [];
{
  const rush = VW('attemptRush', 'xếp').t0, gather = VW('attemptDeal', 'gom').t0;
  for (let k = 0; k < 12; k++) {
    const to = k < 6 ? { p:0, s:k } : k < 10 ? { p:1, s:k - 6 } : { p:2, s:k - 10 };
    CB_MOVES[k].push({ t:rush + k * 0.09, d:0.4, to });
    CB_MOVES[k].push({ t:gather + k * 0.05, d:0.45, to:null });
  }
  CB_ROUND_T.forEach((t0, r) => {
    for (let p = 0; p < 3; p++) {
      const m = { t:t0 + p * (r ? 0.12 : 0.35), d:r ? 0.3 : 0.35, to:{ p, s:r } };
      CB_MOVES[r * 3 + p].push(m);
      CB_DEALS.push(m.t + m.d);
    }
  });
}
const cbTray = (k) => [540 + (k - 5.5) * 62, CB_TRAY_Y];
const cbSpot = (k, to) => (to ? [CB_PX[to.p] + CB_SLOT[to.s][0], CB_PY + CB_SLOT[to.s][1]] : cbTray(k));
function cbCake(k) {
  let [x, y] = cbTray(k), loc = null;
  for (const m of CB_MOVES[k]) {
    if (TT < m.t) break;
    const [tx, ty] = cbSpot(k, m.to);
    if (TT < m.t + m.d) {
      const u = EZ.io(seg(TT, m.t, m.t + m.d));
      return { x:lerp(x, tx, u), y:lerp(y, ty, u) - 80 * Math.sin(Math.PI * u), loc:null, flying:true };
    }
    x = tx; y = ty; loc = m.to;
  }
  return { x, y, loc, flying:false };
}
const cbCount = (p) => CB_MOVES.reduce((n, _, k) => n + (cbCake(k).loc?.p === p ? 1 : 0), 0);

function cbDrawCake(x, y, k, s = 1) {
  withT(x, y, 0, s, () => {
    pp(pE(0, 5, 27, 25), PR.brown, { key:'cb-cake-base' + k, sb:8, sy:4, tex:0.5 });
    pp(pE(0, 0, 25, 22), PR.tan, { key:'cb-cake-top' + k, shadow:false, tex:0.5 });
    pp(pE(0, -2, 16, 13), PR.pink, { key:'cb-cake-icing' + k, shadow:false, tex:0.4 });
    pp(pE(0, -5, 6, 6), PR.red, { shadow:false, tex:false });
  });
}
function cbDrawSquareCake(x, y, j, s) {
  withT(x, y, 0, s, () => {
    pp(pR(-26, -26, 52, 52, 10), PR.mustard, { key:'cb-new-cake' + j, sb:8, sy:4, tex:0.5 });
    pp(pR(-19, -21, 38, 26, 7), PR.yellow, { key:'cb-new-top' + j, shadow:false, tex:0.4 });
    pp(pE(0, -9, 7, 7), PR.red, { shadow:false, tex:false });
  });
}
function cbPlate(p, s) {
  withT(CB_PX[p], CB_PY, 0, s, () => {
    pp(pE(0, 0, 118, 118), CB_FILL[p], { key:'cb-plate' + p, sb:16, sy:8, tex:0.5 });
    pp(pE(0, 0, 94, 94), PR.paperW, { key:'cb-plate-in' + p, shadow:false, tex:0.3 });
  });
}
function cbCountLabel(p, i) {
  if (TT < CB_ASK_T) return '';
  if (i === 4 && TT >= CB_PRACTICE_Q) return '?';
  if (TT < CB_COUNT_T[p]) return '?';
  return String(cbCount(p));
}
function cbCard(p, i) {
  const s = i === 0 ? popS(CB_NAME_T[p]) : 1;
  const label = cbCountLabel(p, i);
  withT(CB_PX[p], CB_CARD_Y, 0, s, () => {
    pp(pR(-110, -60, 220, 120, 18), CB_FILL[p], { key:'cb-card' + p });
    txt(CB_NAMES[p], 0, label ? -26 : 0, 40, PR.navy, { align:'center', base:'middle' });
    if (label) txt(label, 0, 28, 50, PR.ink, { align:'center', base:'middle' });
  });
}
function cbDrawTray() {
  pp(pR(130, 1262, 820, 146, 30), PR.woodL, { key:'cb-tray' });
  pp(pR(150, 1280, 780, 110, 22), PR.creamL, { key:'cb-tray-liner', shadow:false });
}
function cbBubble(rows) {
  const { x, y, w, h } = CB_BUBBLE;
  prSpeech(x, y, w, h, 372, 610, '', { rot:0, key:'cb-bubble' });
  if (rows.length === 1) mfText(rows[0], x, y, w - 80, 54, PR.navy, 1);
  else rows.forEach((r, j) => { if (r) mfText(r, x, y - 45 + j * 92, w - 80, 44, PR.navy, 1); });
}
function cbEquation(tokens, times) {
  const size = 64, gap = txtW(' ', size), widths = tokens.map((t) => txtW(t, size));
  let x = CB_BUBBLE.x - (widths.reduce((a, b) => a + b, 0) + gap * (tokens.length - 1)) / 2;
  tokens.forEach((t, j) => {
    if (TT >= times[j]) withT(x + widths[j] / 2, CB_BUBBLE.y, 0, popS(times[j]), () => txt(t, 0, 0, size, PR.navy, { align:'center', base:'middle' }));
    x += widths[j] + gap;
  });
}
function cbRows(b, i, index) {
  const v = b.visual;
  if (i === 0) return [index < 2 ? 'Dã ngoại thôi nào!' : v.dialogue];
  if (i === 1) return index === 2 ? [v.dialogue] : [v.items[0], index === 1 && TT >= VW('problemPlates', 'ba').t0 ? v.items[1] : ''];
  if (i === 2) {
    if (index < 2) return [v.items[0], v.items[1]];
    if (index === 2) return ['6 + 4 + 2 = 12', TT >= CB_CROSS_T ? 'Chưa bằng nhau' : ''];
    if (index === 3) return [v.items[2], v.items[3]];
    return ['Mỗi vòng,', 'mỗi đĩa 1 chiếc'];
  }
  if (i === 3) {
    if (index === 0) return ['Vòng ' + (1 + CB_ROUND_T.slice(1).filter((t) => TT >= t).length)];
    if (index < 3) return [v.items[index - 1]];
    return [v.dialogue, TT >= VW('consequenceTotal', 'vừa').t0 ? v.items[2] : ''];
  }
  if (index === 0) return [v.items[0], v.items[1]];
  if (index === 2) return [v.items[2], TT >= VW('lessonRule', 'tổng').t0 ? v.items[3] : ''];
  if (index === 3) return [TT < CB_PRACTICE_Q ? 'Bạn thử nhé!' : v.dialogue];
  return ['Chia đều cho 3 bạn'];
}
function cbMood(i, index) {
  if (i === 1) return TT >= CB_ASK_T ? 'wow' : 'calm';
  if (i === 2) return index === 2 && TT >= CB_CROSS_T ? 'flat' : 'calm';
  if (i === 3) return TT >= CB_EMPTY_T ? 'happy' : 'calm';
  return 'happy';
}
function renderBeat(b, i) {
  const { index, line } = mfLine(b);
  cbDrawTray();
  const wobbleT = VW('problemPlates', 'đĩa').t0;
  for (let p = 0; p < 3; p++) {
    const w = i === 1 ? Math.sin(Math.PI * seg(TT, wobbleT + p * 0.12, wobbleT + p * 0.12 + 0.3)) : 0;
    cbPlate(p, 1 + 0.07 * w);
    cbCard(p, i);
  }
  if (i === 4 && index === 2) {
    const a = ev(VW('lessonRule', 'tổng').t0, 0.3);
    if (a > 0) {
      ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = PR.mustard; ctx.lineWidth = 8; ctx.setLineDash([26, 16]);
      ctx.beginPath(); ctx.roundRect(110, 840, 860, 258, 34); ctx.stroke(); ctx.restore();
    }
  }
  const fade = i === 4 ? 1 - ev(CB_PRACTICE_FADE, 0.3) : 1;
  if (fade > 0) {
    ctx.save(); ctx.globalAlpha = fade;
    const hopA = VW('problemTray', 'tất').t0, hopB = VW('problemTray', 'bánh').t1;
    const cakes = CB_MOVES.map((_, k) => ({ k, ...cbCake(k) }));
    for (const c of [...cakes.filter((c) => !c.flying), ...cakes.filter((c) => c.flying)]) {
      let y = c.y, s = 1;
      if (i === 1 && index === 0) {
        const t = lerp(hopA, hopB, c.k / 12);
        y -= 22 * Math.sin(Math.PI * seg(TT, t, t + 0.28));
      }
      if (i === 4 && index === 0) {
        const t = lerp(line.t0, line.t1, c.k / 12);
        s += 0.18 * Math.sin(Math.PI * seg(TT, t, t + 0.4));
      }
      cbDrawCake(c.x, y, c.k, s);
    }
    ctx.restore();
  }
  if (i === 4 && index === 3) {
    for (let j = 0; j < 15; j++) {
      const top = j < 8, x = top ? 540 + (j - 3.5) * 62 : 540 + (j - 11) * 62;
      cbDrawSquareCake(x, top ? 1306 : 1364, j, popS(CB_PRACTICE_POP + j * 0.04));
    }
  }
  if (i === 3) {
    prCheck(905, 1268, CB_EMPTY_T, 30);
    CB_FAIR_T.forEach((t, p) => prCheck(CB_PX[p] + 92, CB_CARD_Y - 52, t, 26));
  }
  const wave = i === 4 && index === 3 ? { x:-240, y:-420 + Math.sin(TT * 7) * 24 } : undefined;
  mfOwl(i, { ...CB_OWL, mood:cbMood(i, index), look:14, hand:wave });
  if (i === 4 && index === 1 && TT >= VW('lessonDivide', 'mười', 1).t0) {
    cbBubble([]);
    cbEquation(['12', ':', '3', '=', '4'], [VW('lessonDivide', 'mười', 1).t0, VW('lessonDivide', 'chia', 1).t0, VW('lessonDivide', 'ba', 1).t0, VW('lessonDivide', 'bằng').t0, VW('lessonDivide', 'bốn').t0]);
  } else cbBubble(cbRows(b, i, index));
  if (i === 2 && index === 2) prCross(895, 607, CB_CROSS_T, 26);
}
mfInstall(renderBeat, { mascot:false });

function SFX_CUES() {
  const cues = CB_NAME_T.map((t) => ({ k:'pop', t }));
  CB_COUNT_T.forEach((t) => cues.push({ k:'tick', t }));
  CB_DEALS.forEach((t) => cues.push({ k:'pop', t }));
  CB_FAIR_T.forEach((t) => cues.push({ k:'tick', t }));
  cues.push({ k:'chime', t:VW('consequenceTotal', 'mười').t0 });
  cues.push({ k:'chime', t:VW('lessonDivide', 'bốn').t0 });
  cues.push({ k:'pop', t:CB_PRACTICE_POP });
  return cues.sort((a, b) => a.t - b.t);
}
