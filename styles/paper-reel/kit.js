// =====================================================================
//  styles/paper-reel/kit.js — a faceless "explainer reel" look matched from a reference reel:
//  flat cut-paper shapes with NO outlines, a mottled paper texture inside every shape, soft drop shadows,
//  a muted palette (slate, navy, mustard, cream) with one hero colour (the mascot's terracotta).
//  Pieces: a screwed enamel sign (kicker + headline), a typing terminal bar, counter cards, rubber stamps,
//  word-by-word caption chips on torn salmon paper, the box mascot ("clawd"), the Tidu Math owl ("tidu"), the Tidu Money pig ("piggy"),
//  the Tidu Mind brain ("brainy"), the Tidu Science flask ("flasky"), the Tidu English parrot ("polly") and the Tidu Tech robot ("botty"),
//  each with a hat per scene.
//  Built on kit/core.js. Motion on 1s (smooth, code-driven), static paper (no boil).
// =====================================================================
const PR = {
  clawd: '#d67555', clawdD: '#c46b4c', clawdL: '#de8466',
  tidu: '#2aa79b', tiduD: '#1f8a80', tiduL: '#5cc3b5',
  money: '#5f9f52', moneyD: '#477f3e', moneyL: '#8fc27e', moneyK: '#2d5228',
  mind: '#a08cd0', mindD: '#7d69b0', mindL: '#c4b6ea', mindK: '#463a70',
  sci: '#f08a3c', sciD: '#c9661f', sciL: '#f9c08c', glass: '#d8ecf1', glassD: '#a9cfd8', sciK: '#6b7886',
  eng: '#3d9be0', engD: '#2a78b8', engL: '#7cc0ef', engY: '#f6cf4a',
  tech: '#c3cbd3', techD: '#9aa4ae', techL: '#e2e7ec', techK: '#4a5560', screen: '#14202b', glow: '#4ff0ff',
  slate: '#869997', slateL: '#95a9a7', slateD: '#788a89',
  navy: '#1c2b56', navyD: '#192833', ink: '#181b24', char: '#23262c',
  cream: '#e9e5da', creamL: '#f4f1e8', paperW: '#f9f8f4',
  mustard: '#e6b82a', yellow: '#f2c94c', green: '#2f9e5b', greenK: '#3e8a2c', red: '#d2453a', redD: '#a9322a',
  chip: '#d97a5b', chipText: '#f7efe2',
  floor: '#87857c', floorD: '#6f6d66', wood: '#6b4528', woodD: '#4c321d', woodL: '#9a7346',
  board: '#2d4a3d', boardD: '#223a30', teal: '#6c9e8f', tealL: '#86b3a4',
  purple: '#462b59', plum: '#583656', sky: '#a9cbe0', grey: '#9a968c', greyD: '#5f6068', orange: '#e07a4f',
  brown: '#8a5a33', tan: '#c9a46b', blue: '#3f6fb0', pink: '#e9a3a3',
};
const F_HEAD = '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif';
const F_CHIP = 'SuperClarendon, Rockwell, Georgia, serif';
const F_CHALK = 'Chalkduster, "Chalkboard SE", "Comic Sans MS", cursive';
const F_MONO = 'Menlo, "SF Mono", Consolas, monospace';

// ---- the paper texture: built once (seeded), layered value noise + speckle. A static cache, so frames stay pure.
const PRTEX = {};
function prTex() {
  if (PRTEX.t) return PRTEX.t;
  const TW = 1600, TH = 2600, c = document.createElement('canvas'); c.width = TW; c.height = TH;
  const g = c.getContext('2d'); g.fillStyle = '#808080'; g.fillRect(0, 0, TW, TH);
  const R = RNG('prtex');
  const octave = (cw, ch, amp) => {
    const s = document.createElement('canvas'); s.width = cw; s.height = ch; const sg = s.getContext('2d'), im = sg.createImageData(cw, ch);
    for (let i = 0; i < cw * ch; i++) { const v = 128 + (R.f() * 2 - 1) * amp; im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; }
    sg.putImageData(im, 0, 0); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.globalAlpha = 0.5; g.drawImage(s, 0, 0, TW, TH); g.globalAlpha = 1;
  };
  octave(10, 16, 70); octave(28, 46, 80); octave(80, 130, 70); octave(260, 420, 60);
  const fine = g.createImageData(TW, TH);   // speckle
  for (let i = 0; i < TW * TH; i++) { const v = 128 + (R.f() * 2 - 1) * 46; fine.data[i * 4] = fine.data[i * 4 + 1] = fine.data[i * 4 + 2] = v; fine.data[i * 4 + 3] = 70; }
  const f2 = document.createElement('canvas'); f2.width = TW; f2.height = TH; f2.getContext('2d').putImageData(fine, 0, 0); g.drawImage(f2, 0, 0);
  PRTEX.t = c; return c;
}
// ---- paths
const pR = (x, y, w, h, r = 6) => () => ctx.roundRect(x, y, w, h, r);
const pE = (cx, cy, rx, ry, rot = 0) => () => ctx.ellipse(cx, cy, rx, ry, rot, 0, TAU);
const pG = (P) => () => { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.closePath(); };
const pA = (cx, cy, r, a0, a1) => () => { ctx.moveTo(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r); ctx.arc(cx, cy, r, a0, a1); ctx.closePath(); };
// a paper shape: flat fill, soft shadow, mottled texture clipped inside, optional light rim
function pp(path, fill, o = {}) {
  ctx.save();
  if (o.shadow !== false) { ctx.shadowColor = o.shc ?? 'rgba(12,10,8,0.34)'; ctx.shadowBlur = o.sb ?? 16; ctx.shadowOffsetX = o.sx ?? 0; ctx.shadowOffsetY = o.sy ?? 8; }
  ctx.beginPath(); path(); ctx.fillStyle = fill; ctx.fill();
  ctx.restore();
  if (o.tex !== false) {
    const k = hash('pp', o.key ?? fill);
    ctx.save(); ctx.beginPath(); path(); ctx.clip();
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = o.tex ?? 0.55;
    const m = ctx.getTransform(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(prTex(), -(k % 480), -((k >>> 9) % 640)); ctx.setTransform(m);
    ctx.restore();
  }
  if (o.shade) { ctx.save(); ctx.beginPath(); path(); ctx.clip(); const bb = o.shade; const gr = ctx.createLinearGradient(0, bb[0], 0, bb[1]); gr.addColorStop(0, 'rgba(255,255,255,0.08)'); gr.addColorStop(1, 'rgba(20,10,5,0.16)'); ctx.fillStyle = gr; ctx.fillRect(-4000, -4000, 8000, 8000); ctx.restore(); }
  if (o.rim) { ctx.save(); ctx.beginPath(); path(); ctx.strokeStyle = o.rim; ctx.lineWidth = o.rw ?? 2.5; ctx.stroke(); ctx.restore(); }
}
function withT(x, y, rot, s, fn) { if (s <= 0.001) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(s, s); fn(); ctx.restore(); }
function txt(str, x, y, size, color, o = {}) {
  ctx.save(); ctx.font = `${o.weight ?? 800} ${size}px ${o.font ?? F_HEAD}`; ctx.fillStyle = color; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic';
  if (o.track) ctx.letterSpacing = o.track + 'px';
  if (o.frac != null && o.frac < 1) { const w = ctx.measureText(str).width, x0 = o.align === 'center' ? x - w / 2 : x; ctx.beginPath(); ctx.rect(x0 - 4, y - size * 1.2, Math.max(0, w * o.frac) + 4, size * 1.7); ctx.clip(); }
  ctx.fillText(str, x, y); const w = ctx.measureText(str).width; ctx.restore(); return w;
}
// txt() that stays readable inside a mirrored transform (a flipped mascot and the props it holds): un-mirrors around the anchor
function txtR(str, x, y, size, color, o = {}) {
  const m = ctx.getTransform();
  if (m.a * m.d - m.b * m.c >= 0) return txt(str, x, y, size, color, o);
  ctx.save(); ctx.translate(x, y); ctx.scale(-1, 1);
  const w = txt(str, 0, 0, size, color, { ...o, align: o.align === 'center' ? 'center' : o.align === 'right' ? 'left' : 'right' });
  ctx.restore(); return w;
}
function txtW(str, size, o = {}) { ctx.save(); ctx.font = `${o.weight ?? 800} ${size}px ${o.font ?? F_HEAD}`; if (o.track) ctx.letterSpacing = o.track + 'px'; const w = ctx.measureText(str).width; ctx.restore(); return w; }
const fitSize = (str, maxW, s0, o = {}) => { let s = s0; while (s > 20 && txtW(str, s, o) > maxW) s -= 2; return s; };
// the claude asterisk (the brand spark)
const sparkIcon = (x, y, r, color = PR.orange, rot = 0) => asterisk(x, y, r * 0.18, r, 12, rot, color, Math.max(2, r * 0.2));

// ---- full-bleed backgrounds
function prWall(c, o = {}) {
  pp(pR(-40, -40, W + 80, H + 80, 0), c, { key: 'wall' + c, shadow: false, tex: o.tex ?? 0.7 });
  if (o.panels !== false) { const gap = o.gap ?? 150; ctx.save(); ctx.fillStyle = o.panel ?? 'rgba(255,255,255,0.05)'; for (let x = (o.px ?? 40); x < W; x += gap) ctx.fillRect(x, 0, gap / 2, H); ctx.fillStyle = 'rgba(0,0,0,0.07)'; for (let x = (o.px ?? 40); x < W; x += gap) ctx.fillRect(x - 3, 0, 3, H); ctx.restore(); }
  if (o.streak !== false) { const sx = o.streak ?? 560, gr = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.10)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gr; ctx.fillRect(sx - 120, 0, 240, H); }
}
function prFloor(y, c = PR.floor, o = {}) {
  pp(pR(-40, y, W + 80, H - y + 40, 0), c, { key: 'floor' + c, sy: -6, sb: 18, tex: 0.75 });
  if (o.trim !== false) pp(pR(-40, y - 10, W + 80, 22, 0), o.trimC ?? PR.greyD, { key: 'ftrim', sb: 8, sy: 3 });
  if (o.studs) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.25)'; for (let x = 20; x < W; x += 46) { ctx.beginPath(); ctx.arc(x, y + 30, 6, 0, TAU); ctx.fill(); } ctx.restore(); }
}

// ---- the sign: cream enamel plate, navy keyline, screws, a navy card behind it; kicker + headline
const SIGN = { x: 70, y: 140, w: 860, h: 156 };
function prSign(head, o = {}) {
  const { x, y, w, h } = SIGN, s = o.s ?? 1;
  withT(x + w / 2, y + h / 2, o.rot ?? 0, s, () => {
    const X = -w / 2, Y = -h / 2;
    if (o.back !== false) pp(pR(X + 30, Y - 24, w + 26, h + 2, 3), PR.navyD, { key: 'signback', sb: 8, sy: 4, tex: 0.5 });
    pp(pR(X, Y, w, h, 14), PR.creamL, { key: 'sign', sb: 18, sy: 9, tex: 0.6, rim: 'rgba(255,255,255,0.6)' });
    ctx.save(); ctx.strokeStyle = PR.navy; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.roundRect(X + 11, Y + 11, w - 22, h - 22, 9); ctx.stroke(); ctx.restore();
    for (const [sx, sy] of [[X + 26, Y + 26], [X + w - 26, Y + 26], [X + 26, Y + h - 26], [X + w - 26, Y + h - 26]]) pp(pE(sx, sy, 7.5, 7.5), '#a3a39d', { key: 'scr' + sx + sy, sb: 2, sy: 1, tex: 0.3 });
    txt(o.kicker ?? 'SKILL SPOTLIGHT', 0, Y + 46, 22, PR.greenK, { align: 'center', weight: 800, track: 0.5 });
    const fs = fitSize(head, w - 90, 66);
    txt(head, 0, Y + 46 + 22 + fs * 0.86, fs, PR.navy, { align: 'center', weight: 800 });
  });
}
// ---- the terminal bar: claude spark, a prompt that types on, an orange block cursor
function prTerm(str, frac, o = {}) {
  const x = o.x ?? 70, y = o.y ?? 322, w = o.w ?? 860, h = o.h ?? 78;
  pp(pR(x, y, w, h, 10), PR.char, { key: 'term', sb: 12, sy: 7, tex: 0.35 });
  sparkIcon(x + 40, y + h / 2, 17, PR.orange, 0.2);
  const n = Math.floor(str.length * clamp(frac)), shown = '> ' + str.slice(0, n), sz = o.size ?? 34;
  const tw = txt(shown, x + 74, y + h / 2 + sz * 0.36, sz, '#f4f1e8', { weight: 600 });
  if (frac < 1 || Math.floor(TT * 2.4) % 2 === 0) pp(pR(x + 82 + tw, y + h / 2 - sz * 0.55, sz * 0.48, sz * 1.1, 1), PR.orange, { shadow: false, tex: false });
}
// ---- a counter card (yellow, black keyline, a label and a big number)
function prCounter(label, val, x, y, o = {}) {
  const w = o.w ?? 330, h = o.h ?? 196;
  withT(x, y, o.rot ?? -0.035, o.s ?? 1, () => {
    pp(pR(-w / 2, -h / 2, w, h, 12), o.fill ?? PR.yellow, { key: 'ctr' + label, sb: 14, sy: 8, tex: 0.5 });
    ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 8); ctx.stroke(); ctx.restore();
    txt(label, 0, -h / 2 + 52, fitSize(label, w - 50, 25), PR.ink, { align: 'center', weight: 800 });
    txt(String(val), 0, h / 2 - 30, o.big ?? 104, PR.ink, { align: 'center', weight: 800 });
  });
}
const countUp = (t0, d, a, b) => Math.round(lerp(a, b, EZ.o3(ev(t0, d))));
// ---- a rubber stamp that slams down at t0
function prStamp(str, x, y, color, t0, o = {}) {
  if (TT < t0) return;
  const u = clamp((TT - t0) / 0.16), s = lerp(o.from ?? 1.9, 1, EZ.i2(u)) * (o.s ?? 1), sz = o.size ?? 64;
  const w = txtW(str, sz) + 60, h = sz * 1.45;
  withT(x, y, o.rot ?? -0.07, s, () => {
    if (u >= 1) pp(pR(-w / 2, -h / 2, w, h, 10), o.bg ?? 'rgba(250,248,240,0.94)', { key: 'stb' + str, sb: 10, sy: 5, tex: 0.45 });
    ctx.save(); ctx.globalAlpha = u < 1 ? 0.75 : 1; ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.beginPath(); ctx.roundRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 7); ctx.stroke();
    txt(str, 0, sz * 0.36, sz, color, { align: 'center', weight: 800 }); ctx.restore();
  });
}
// ---- confetti / dots that burst from (x, y) at t0
function prBurst(x, y, t0, o = {}) {
  const u = (TT - t0); if (u < 0 || u > (o.life ?? 1.2)) return;
  const R = RNG('burst', x, y, t0), n = o.n ?? 16, cols = o.cols ?? [PR.yellow, PR.mustard, PR.orange, '#ffffff', PR.green];
  for (let i = 0; i < n; i++) {
    const a = R.r(0, TAU), v = R.r(260, 620) * (o.v ?? 1), px = x + Math.cos(a) * v * u, py = y + Math.sin(a) * v * u + 520 * u * u, r = R.r(7, 13) * (1 - u / (o.life ?? 1.2));
    ctx.fillStyle = cols[i % cols.length]; ctx.beginPath(); ctx.arc(px, py, Math.max(0.5, r), 0, TAU); ctx.fill();
  }
}
// ---- caption chips: every spoken word on its own scrap of salmon paper, 1–3 words at a time (from VOICE)
let CHIP_GROUPS = null;
function chipGroups() {
  if (CHIP_GROUPS) return CHIP_GROUPS;
  CHIP_GROUPS = [];
  if (typeof VOICE === 'undefined') return CHIP_GROUPS;
  for (const L of VOICE.lines) {
    let g = [];
    L.words.forEach((w, i) => {
      g.push(w);
      const end = /[,.:;!?]$/.test(w.w) || g.length >= (CHIP_MAX ?? 3) || i === L.words.length - 1 || (L.words[i + 1].t0 - w.t1 > 0.32);
      if (end) { CHIP_GROUPS.push(g); g = []; }
    });
  }
  CHIP_GROUPS.forEach((g, i) => { g.t0 = g[0].t0 - 0.03; g.t1 = i + 1 < CHIP_GROUPS.length ? CHIP_GROUPS[i + 1][0].t0 - 0.03 : VOICE.duration; });
  return CHIP_GROUPS;
}
var CHIP_MAX = 3, CHIP_Y = 1520, CHIP_X = 70, CHIP_MAXX = 930;
function prChips() {
  const draw = () => {
    const g = chipGroups().find((q) => TT >= q.t0 && TT < q.t1); if (!g) return;
    const sz = 70, h = 112; let x = CHIP_X, y = CHIP_Y;
    g.forEach((w, i) => {
      if (TT < w.t0 - 0.03) return;
      const word = w.w.replace(/^[^\w']+|[^\w']+$/g, ''); if (!word) return;
      const cw = txtW(word, sz, { font: F_CHIP, weight: 700 }) + 46;
      if (x + cw > CHIP_MAXX) { x = CHIP_X; y += h + 14; }
      const R = RNG('chip', word, w.t0), rot = (i % 2 ? 1 : -1) * R.r(0.012, 0.04), s = EZ.back(clamp((TT - w.t0 + 0.03) / 0.16));
      withT(x + cw / 2, y, rot, s, () => {
        pp(pG([[-cw / 2 + R.n(3), -h / 2 + R.n(3)], [cw / 2 + R.n(3), -h / 2 + R.n(3)], [cw / 2 + R.n(3), h / 2 + R.n(3)], [-cw / 2 + R.n(3), h / 2 + R.n(3)]]), PR.chip, { key: 'chip' + word + w.t0, sb: 12, sy: 7, tex: 0.6, rim: 'rgba(255,236,220,0.38)', rw: 3 });
        txt(word, 0, sz * 0.33, sz, PR.chipText, { font: F_CHIP, weight: 700, align: 'center' });
      });
      x += cw + 12;
    });
  };
  if (DEFER) DEFER.push(draw); else draw();
}

// ---- THE MASCOT: a terracotta box with square eyes, four legs and a diamond hand. (x, y) = where body meets legs.
//  o: s (scale), hat ('guard'|'mortar'|'boater'|'ranger'|'cap'|'phones'|'beret'|null), mood ('neutral'|'happy'|'wow'|'flat'),
//     look (eye shift, px), hand: { x, y } local hand position (default at the left side), hold(hx, hy) draws a prop in the hand,
//     pop (0..1 scale-in), lean (rad), key
var CLAWD_SCALE = 1;
function clawd(x, y, o = {}) {
  const s = (o.s ?? 1) * (o.pop ?? 1) * CLAWD_SCALE; if (s <= 0.01) return;
  const key = o.key ?? 'cl', ph = hash(key) % 100 / 100 * TAU;
  const bob = Math.sin(TT * TAU * 1.15 + ph) * 7, sq = 1 + Math.sin(TT * TAU * 2.3 + ph) * 0.012;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean ?? 0); ctx.scale(o.flip ? -s : s, s);
  // legs (behind the body), a little walk-cycle sway when o.walk
  [-176, -84, 84, 176].forEach((lx, i) => { const sw = o.walk ? Math.sin(TT * TAU * 2.4 + i * Math.PI / 2) * 10 : 0; pp(pR(lx - 30 + sw, -20, 60, 186 - (o.walk && i % 2 ? Math.abs(sw) : 0), 3), PR.clawdD, { key: key + 'leg' + i, sb: 10, sy: 5, tex: 0.55 }); });
  ctx.translate(0, bob * 0.6); ctx.scale(1 / sq, sq);
  const side = o.view === 'side', BW = side ? 520 : 440, BH = side ? 300 : 340;
  // the hand: a diamond at the side, with its arm hidden behind the body
  const hx = o.hand?.x ?? (side ? -300 : -262), hy = o.hand?.y ?? -150 + Math.sin(TT * TAU * 1.3 + ph) * 6;
  if (o.hold) o.hold(hx, hy, true);
  withT(hx, hy, Math.PI / 4 + (o.handRot ?? 0), 1, () => pp(pR(-38, -38, 76, 76, 4), PR.clawd, { key: key + 'hand', sb: 10, sy: 6, tex: 0.55 }));
  if (o.hold) o.hold(hx, hy, false);
  pp(pR(-BW / 2, -BH, BW, BH, 5), PR.clawd, { key: key + 'body', sb: 22, sy: 10, tex: 0.6, rim: 'rgba(255,225,205,0.28)', rw: 3 });
  // eyes
  const lk = o.look ?? 0, blink = (Math.floor(TT * FPS) + Math.round(ph * 10)) % 96 < 4, mood = o.mood ?? 'neutral';
  for (const ex of (side ? [-232, -128] : [-112, 70])) {
    const cx = ex + lk;
    if (mood === 'happy') { ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 15; ctx.lineCap = 'square'; ctx.beginPath(); ctx.moveTo(cx - 6, -222); ctx.lineTo(cx + 22, -252); ctx.lineTo(cx + 50, -222); ctx.stroke(); ctx.restore(); }
    else { const eh = blink ? 10 : mood === 'wow' ? 78 : 66; pp(pR(cx, -250 + (66 - eh) / 2, 46, eh, 2), PR.ink, { shadow: false, tex: 0.25, key: key + 'eye' + ex }); }
  }
  if (mood === 'wow') pp(pR((side ? -170 : -30) + lk, -128, 52, 40, 6), PR.ink, { shadow: false, tex: 0.2, key: key + 'mouth' });
  if (mood === 'flat') pp(pR((side ? -170 : -26) + lk, -124, 60, 13, 2), PR.ink, { shadow: false, tex: 0.2, key: key + 'mouthf' });
  if (mood === 'happy') pp(pA(-10 + lk + 12, -150, 30, 0, Math.PI), PR.ink, { shadow: false, tex: 0.2, key: key + 'smile' });
  if (o.hat) { if (side) ctx.translate(-30, 40); clawdHat(o.hat, key); }
  ctx.restore();
}
function clawdHat(h, key) {
  const top = -340;
  if (h === 'guard') {
    pp(pA(0, top + 4, 225, Math.PI, TAU), PR.navy, { key: key + 'gdome', sb: 14, sy: 6, tex: 0.6 });
    pp(pR(-250, top - 12, 500, 48, 10), PR.navyD, { key: key + 'gband', sb: 10, sy: 5, tex: 0.5 });
    pp(pE(0, top - 120, 44, 44), PR.mustard, { key: key + 'gbadge', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'mortar') {
    pp(pR(-170, top - 70, 340, 82, 8), PR.ink, { key: key + 'mcap', sb: 12, sy: 6, tex: 0.4 });
    pp(pG([[0, top - 170], [300, top - 96], [0, top - 30], [-300, top - 96]]), '#262a3a', { key: key + 'mboard', sb: 16, sy: 8, tex: 0.45 });
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, top - 100); ctx.quadraticCurveTo(170, top - 80, 210 + Math.sin(TT * 5) * 6, top + 10); ctx.stroke(); ctx.restore();
    pp(pR(196 + Math.sin(TT * 5) * 6, top + 6, 30, 64, 6), PR.mustard, { key: key + 'mtas', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'boater') {
    pp(pE(0, top - 6, 270, 46), PR.cream, { key: key + 'bbrim', sb: 14, sy: 7, tex: 0.6 });
    pp(pR(-160, top - 150, 320, 142, 26), PR.cream, { key: key + 'bcrown', sb: 10, sy: 4, tex: 0.6 });
    pp(pR(-160, top - 64, 320, 36, 2), PR.red, { key: key + 'bband', shadow: false, tex: 0.5 });
  } else if (h === 'ranger') {
    pp(pE(0, top - 4, 290, 50), PR.tan, { key: key + 'rbrim', sb: 14, sy: 7, tex: 0.6 });
    pp(pG([[-150, top - 20], [-130, top - 150], [-40, top - 180], [0, top - 150], [40, top - 180], [130, top - 150], [150, top - 20]]), '#b8925b', { key: key + 'rcrown', sb: 10, sy: 4, tex: 0.6 });
    pp(pR(-152, top - 62, 304, 34, 3), PR.brown, { key: key + 'rband', shadow: false, tex: 0.5 });
  } else if (h === 'cap') {
    pp(pA(10, top + 4, 210, Math.PI, TAU), PR.red, { key: key + 'cdome', sb: 14, sy: 6, tex: 0.6 });
    pp(pR(-330, top - 18, 260, 36, 18), PR.redD, { key: key + 'cbill', sb: 10, sy: 6, tex: 0.5 });
    pp(pE(10, top - 206, 22, 14), PR.redD, { key: key + 'cbtn', sb: 4, sy: 2, tex: 0.4 });
  } else if (h === 'phones') {
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(0, top + 60, 250, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore();
    pp(pR(-282, top + 40, 74, 150, 22), PR.char, { key: key + 'pl', sb: 10, sy: 6, tex: 0.4 });
    pp(pR(208, top + 40, 74, 150, 22), PR.char, { key: key + 'pr', sb: 10, sy: 6, tex: 0.4 });
    pp(pE(245, top + 116, 14, 14), PR.green, { shadow: false, tex: false });
  } else if (h === 'beret') {
    pp(pE(-30, top - 30, 230, 70, -0.12), '#7b2d3a', { key: key + 'beret', sb: 14, sy: 7, tex: 0.6 });
    pp(pR(-46, top - 120, 24, 36, 8), '#7b2d3a', { key: key + 'bnub', sb: 4, sy: 2, tex: 0.4 });
  }
}
// ---- THE TIDU MATH OWL: a teal paper owl with round glasses, a + − × ÷ belly patch and orange feet.
//  Same contract as clawd(): (x, y) = where the body meets the feet. o: s, hat ('mortar'|'propeller'|'chef'|'builder'|'crown'|'party'|'explorer'|null),
//     mood ('neutral'|'happy'|'wow'|'flat'), look (pupil shift, px), view ('side'), walk, hand: { x, y } wing-tip position (default folded at the left side),
//     hold(hx, hy, behind) draws a prop at the wing tip (propStick, propPencil), pop (0..1 scale-in), lean (rad), flip, key
var TIDU_SCALE = 1;
function tidu(x, y, o = {}) {
  const s = (o.s ?? 1) * (o.pop ?? 1) * TIDU_SCALE; if (s <= 0.01) return;
  const key = o.key ?? 'td', ph = hash(key) % 100 / 100 * TAU;
  const bob = Math.sin(TT * TAU * 1.15 + ph) * 7, sq = 1 + Math.sin(TT * TAU * 2.3 + ph) * 0.012;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean ?? 0); ctx.scale(o.flip ? -s : s, s);
  // feet: three toes each, lifted in turn when o.walk
  [-80, 80].forEach((fx, i) => {
    const lift = o.walk ? Math.max(0, Math.sin(TT * TAU * 2.4 + i * Math.PI)) * 22 : 0;
    [-30, 0, 30].forEach((dx, j) => pp(pE(fx + dx, 16 - lift + (j === 1 ? 4 : 0), 17, 28, dx * 0.012), PR.orange, { key: key + 'toe' + i + j, sb: 8, sy: 4, tex: 0.5 }));
  });
  ctx.translate(0, bob * 0.6); ctx.scale(1 / sq, sq);
  const side = o.view === 'side', fx = side ? -70 : 0, lk = o.look ?? 0, mood = o.mood ?? 'neutral';
  const blink = (Math.floor(TT * FPS) + Math.round(ph * 10)) % 96 < 4;
  [-1, 1].forEach((d) => pp(pG([[d * 110 + fx * 0.5, -400], [d * 205 + fx * 0.5, -515], [d * 192 + fx * 0.5, -340]]), PR.tiduD, { key: key + 'tuft' + d, sb: 10, sy: 5, tex: 0.55 }));
  pp(pE(0, -235, 205, 235), PR.tidu, { key: key + 'body', sb: 22, sy: 10, tex: 0.6, rim: 'rgba(220,255,248,0.3)', rw: 3 });
  if (!side) pp(pE(180, -205, 60, 138, -0.16), PR.tiduD, { key: key + 'wingR', sb: 10, sy: 5, tex: 0.55 });
  // belly patch with the four operations
  pp(pE(fx * 0.4, -125, 132, 110), PR.creamL, { key: key + 'belly', sb: 6, sy: 3, tex: 0.5 });
  [['+', -46, -160], ['−', 46, -160], ['×', -46, -88], ['÷', 46, -88]].forEach(([k, bx, by]) => tiduSym(k, bx + fx * 0.4, by, 24, PR.tiduD, key + 'sym' + k));
  // the front wing: an elongated feather from the shoulder to the hand (wing tip), props held at the tip.
  // Folded in front view it tucks under the glasses (like the far wing); raised (o.hand) or side-on it is drawn over the face.
  const shx = side ? -100 : -165, shy = side ? -180 : -290;
  const hx = o.hand?.x ?? -215, hy = o.hand?.y ?? (side ? -80 : -125) + Math.sin(TT * TAU * 1.3 + ph) * 6;
  const wing = () => {
    const wl = Math.hypot(hx - shx, hy - shy), wa = Math.atan2(hy - shy, hx - shx);
    if (o.hold) o.hold(hx, hy, true);
    pp(pE((shx + hx) / 2, (shy + hy) / 2, wl / 2 + 40, 58, wa), PR.tiduD, { key: key + 'wingL', sb: 12, sy: 6, tex: 0.55, rim: 'rgba(220,255,248,0.22)', rw: 2 });
    if (o.hold) o.hold(hx, hy, false);
  };
  const wingOver = side || !!o.hand;
  if (!wingOver) wing();
  // glasses and eyes
  const eyes = side ? [[fx - 82, 1], [fx + 64, 0.8]] : [[-82, 1], [82, 1]];
  pp(pR(fx - 30, -334, 60, 18, 6), PR.navy, { key: key + 'bridge', shadow: false, tex: 0.4 });
  for (const [gx, k] of eyes) {
    const gy = -320, R = 80 * k, r = 63 * k;
    pp(pE(gx, gy, R, R), PR.navy, { key: key + 'rim' + gx, sb: 10, sy: 5, tex: 0.45 });
    pp(pE(gx, gy, r, r), PR.paperW, { key: key + 'eye' + gx, shadow: false, tex: 0.25 });
    if (mood === 'happy') {
      ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 14 * k; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(gx - 28 * k + lk, gy + 12); ctx.quadraticCurveTo(gx + lk, gy - 34 * k, gx + 28 * k + lk, gy + 12); ctx.stroke(); ctx.restore();
      pp(pE(gx * 1.12, gy + 96, 30 * k, 14), PR.pink, { key: key + 'blush' + gx, shadow: false, tex: 0.3 });
      continue;
    }
    const pr = (mood === 'wow' ? 34 : 27) * k, px = gx + lk * k, py = gy + 6;
    pp(pE(px, py, pr, pr), PR.ink, { key: key + 'pup' + gx, shadow: false, tex: 0.2 });
    pp(pE(px + pr * 0.35, py - pr * 0.38, pr * 0.3, pr * 0.3), PR.paperW, { shadow: false, tex: false });
    if (blink || mood === 'flat') {
      ctx.save(); ctx.beginPath(); ctx.ellipse(gx, gy, r, r, 0, 0, TAU); ctx.clip();
      pp(pR(gx - r, gy - r, 2 * r, blink ? 2 * r : r + 4, 0), PR.tiduL, { key: key + 'lid' + gx, shadow: false, tex: 0.5 });
      pp(pR(gx - r, (blink ? gy : gy + 4) - 4, 2 * r, 8, 3), PR.tiduD, { shadow: false, tex: false });
      ctx.restore();
    }
  }
  // beak: closed, or open on 'wow'
  if (mood === 'wow') {
    pp(pE(fx, -230, 22, 18), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
    pp(pG([[fx - 30, -274], [fx + 30, -274], [fx, -238]]), PR.orange, { key: key + 'beakU', sb: 6, sy: 3, tex: 0.45 });
    pp(pG([[fx - 20, -222], [fx + 20, -222], [fx, -196]]), PR.orange, { key: key + 'beakL', sb: 6, sy: 3, tex: 0.45 });
  } else pp(pG([[fx - 28, -270], [fx + 28, -270], [fx, -212]]), PR.orange, { key: key + 'beak', sb: 6, sy: 3, tex: 0.45 });
  if (wingOver) wing();
  if (o.hat) { ctx.save(); ctx.translate(fx * 0.5, 0); tiduHat(o.hat, key); ctx.restore(); }
  ctx.restore();
}
// a paper + − × ÷ sign of half-size r, centred at (x, y)
function tiduSym(k, x, y, r, c, key) {
  const t = r * 0.34, o = { key, shadow: false, tex: 0.3 };
  withT(x, y, k === '×' ? Math.PI / 4 : 0, 1, () => {
    pp(pR(-r, -t / 2, 2 * r, t, t / 2), c, o);
    if (k === '+' || k === '×') pp(pR(-t / 2, -r, t, 2 * r, t / 2), c, o);
    if (k === '÷') { pp(pE(0, -r * 0.66, t * 0.62, t * 0.62), c, o); pp(pE(0, r * 0.66, t * 0.62, t * 0.62), c, o); }
  });
}
function tiduHat(h, key) {
  const top = -440;
  if (h === 'mortar') {
    pp(pR(-130, top - 50, 260, 70, 8), PR.ink, { key: key + 'mcap', sb: 12, sy: 6, tex: 0.4 });
    pp(pG([[0, top - 140], [260, top - 80], [0, top - 22], [-260, top - 80]]), '#262a3a', { key: key + 'mboard', sb: 16, sy: 8, tex: 0.45 });
    const sw = Math.sin(TT * 5) * 6;
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, top - 82); ctx.quadraticCurveTo(160, top - 70, 196 + sw, top + 20); ctx.stroke(); ctx.restore();
    pp(pR(182 + sw, top + 16, 30, 62, 6), PR.mustard, { key: key + 'mtas', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'propeller') {
    [PR.red, PR.yellow, PR.blue, PR.green].forEach((c, i) => pp(() => { ctx.moveTo(0, top + 14); ctx.arc(0, top + 14, 165, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); ctx.closePath(); }, c, { key: key + 'pdome' + i, sb: 12, sy: 5, tex: 0.55 }));
    pp(pR(-172, top - 2, 344, 28, 12), PR.navy, { key: key + 'pband', sb: 8, sy: 4, tex: 0.45 });
    pp(pR(-9, top - 200, 18, 56, 4), PR.char, { key: key + 'pstem', sb: 6, sy: 3, tex: 0.3 });
    const spin = Math.cos(TT * TAU * 1.5), sx = Math.sign(spin || 1) * Math.max(0.08, Math.abs(spin));
    ctx.save(); ctx.translate(0, top - 200); ctx.scale(sx, 1);
    pp(pE(-66, 0, 66, 16), PR.red, { key: key + 'pbl', sb: 6, sy: 3, tex: 0.4 }); pp(pE(66, 0, 66, 16), PR.blue, { key: key + 'pbr', sb: 6, sy: 3, tex: 0.4 });
    ctx.restore();
    pp(pE(0, top - 200, 15, 15), PR.mustard, { key: key + 'phub', shadow: false, tex: 0.4 });
  } else if (h === 'chef') {
    [[-100, -130, 82], [100, -130, 82], [0, -175, 96]].forEach(([cx, cy, r], i) => pp(pE(cx, top + cy, r, r * 0.92), PR.paperW, { key: key + 'cpuff' + i, sb: 12, sy: 5, tex: 0.5 }));
    pp(pR(-150, top - 70, 300, 82, 10), PR.paperW, { key: key + 'cband', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-150, top - 22, 300, 12, 2), PR.cream, { shadow: false, tex: 0.4 });
  } else if (h === 'builder') {
    pp(pA(0, top + 8, 172, Math.PI, TAU), PR.yellow, { key: key + 'bdome', sb: 14, sy: 6, tex: 0.6 });
    pp(pR(-24, top - 170, 48, 172, 20), PR.mustard, { key: key + 'bcrest', shadow: false, tex: 0.5 });
    pp(pR(-215, top - 12, 430, 34, 16), PR.mustard, { key: key + 'bbrim', sb: 10, sy: 5, tex: 0.5 });
  } else if (h === 'crown') {
    const pk = [[-160, top - 120], [0, top - 150], [160, top - 120]];
    pp(pG([[-150, top + 12], [-160, top - 120], [-80, top - 50], [0, top - 150], [80, top - 50], [160, top - 120], [150, top + 12]]), PR.mustard, { key: key + 'crown', sb: 14, sy: 7, tex: 0.6 });
    pk.forEach(([px, py], i) => pp(pE(px, py, 15, 15), PR.yellow, { key: key + 'cpk' + i, sb: 4, sy: 2, tex: 0.4 }));
    pp(pR(-152, top - 24, 304, 34, 4), PR.yellow, { key: key + 'cband', shadow: false, tex: 0.5 });
    [[-90, PR.blue], [0, PR.red], [90, PR.green]].forEach(([gx, c]) => pp(pE(gx, top - 7, 15, 15), c, { key: key + 'gem' + gx, sb: 4, sy: 2, tex: 0.4 }));
  } else if (h === 'party') {
    withT(30, top + 10, 0.2, 1, () => {
      const w = (yy) => 115 * (1 + yy / 270);
      pp(pG([[-115, 0], [115, 0], [0, -270]]), PR.blue, { key: key + 'pcone', sb: 14, sy: 7, tex: 0.55 });
      [[-40, -80], [-150, -190]].forEach(([y0, y1], i) => pp(pG([[-w(y0), y0], [w(y0), y0], [w(y1), y1], [-w(y1), y1]]), PR.mustard, { key: key + 'pstr' + i, shadow: false, tex: 0.5 }));
      pp(pE(0, -272, 32, 32), PR.red, { key: key + 'ppom', sb: 8, sy: 4, tex: 0.5 });
    });
  } else if (h === 'explorer') {
    pp(pE(0, top + 4, 250, 44), PR.tan, { key: key + 'ebrim', sb: 14, sy: 7, tex: 0.6 });
    pp(pA(0, top - 4, 166, Math.PI, TAU), '#d9c08b', { key: key + 'edome', sb: 10, sy: 4, tex: 0.6 });
    pp(pR(-166, top - 40, 332, 30, 3), PR.brown, { key: key + 'eband', shadow: false, tex: 0.5 });
    pp(pE(0, top - 172, 16, 10), PR.tan, { key: key + 'ebtn', shadow: false, tex: 0.4 });
  }
}
// ---- THE TIDU MONEY PIG: a money-green paper piggy bank with a coin slot, a round snout, a ₫ belly badge, stubby hoofed legs and a curly tail.
//  Same contract as clawd()/tidu(), except (x, y) is where the body meets the legs and the hooves reach 62px below it.
//  o: s, hat ('bowler'|'tophat'|'visor'|'mortar'|'nonla'|'newsboy'|'party'|null), mood ('neutral'|'happy'|'wow'|'flat'), look (pupil shift, px),
//     view ('side'), walk, hand: { x, y } front trotter position (default hanging at the left side), hold(hx, hy, behind) draws a prop
//     at the trotter (propCoin, propBill, propCalc, propStick, propPencil), pop (0..1 scale-in), lean (rad), flip, key
var PIGGY_SCALE = 1;
function piggy(x, y, o = {}) {
  const s = (o.s ?? 1) * (o.pop ?? 1) * PIGGY_SCALE; if (s <= 0.01) return;
  const key = o.key ?? 'pg', ph = hash(key) % 100 / 100 * TAU;
  const bob = Math.sin(TT * TAU * 1.15 + ph) * 7, sq = 1 + Math.sin(TT * TAU * 2.3 + ph) * 0.012;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean ?? 0); ctx.scale(o.flip ? -s : s, s);
  const side = o.view === 'side', mood = o.mood ?? 'neutral', lk = o.look ?? 0;
  const blink = (Math.floor(TT * FPS) + Math.round(ph * 10)) % 96 < 4;
  // legs (behind the body): front pair in body green, far pair darker; lifted in turn when o.walk
  const legs = side ? [[-170, 0], [-75, 1], [95, 0], [190, 1]] : [[-160, 1], [160, 1], [-72, 0], [72, 0]];
  legs.forEach(([lx, far], i) => {
    const lift = o.walk ? Math.max(0, Math.sin(TT * TAU * 2.4 + i * Math.PI / 2)) * 18 : 0, top = side ? -90 : far ? -80 : -50;
    const bottom = (far && !side ? 48 : 62) - lift;
    pp(pR(lx - 34, top, 68, bottom - top, 16), far ? PR.moneyD : PR.money, { key: key + 'leg' + i, sb: 10, sy: 5, tex: 0.55 });
    pp(pR(lx - 34, bottom - 22, 68, 22, 8), PR.moneyK, { key: key + 'hoof' + i, shadow: false, tex: 0.4 });
  });
  ctx.translate(0, bob * 0.6); ctx.scale(1 / sq, sq);
  piggyTail(side ? 292 : 212, side ? -250 : -150);
  // ears: the far ear behind the body, the near ear(s) with a light inner flap
  if (side) {
    pp(pG([[-60, -350], [-5, -470], [45, -372]]), PR.moneyD, { key: key + 'earF', sb: 10, sy: 5, tex: 0.55 });
    pp(pG([[-185, -330], [-150, -480], [-75, -365]]), PR.money, { key: key + 'earN', sb: 12, sy: 6, tex: 0.6 });
    pp(pG([[-162, -350], [-146, -446], [-98, -370]]), PR.moneyL, { key: key + 'earNi', shadow: false, tex: 0.5 });
  } else [-1, 1].forEach((d) => {
    pp(pG([[d * 55, -360], [d * 205, -495], [d * 198, -305]]), PR.money, { key: key + 'ear' + d, sb: 12, sy: 6, tex: 0.6 });
    pp(pG([[d * 98, -382], [d * 184, -464], [d * 182, -345]]), PR.moneyL, { key: key + 'eari' + d, shadow: false, tex: 0.5 });
  });
  if (side) pp(pE(20, -210, 275, 185), PR.money, { key: key + 'body', sb: 22, sy: 10, tex: 0.6, rim: 'rgba(225,255,215,0.3)', rw: 3 });
  else pp(pE(0, -200, 230, 200), PR.money, { key: key + 'body', sb: 22, sy: 10, tex: 0.6, rim: 'rgba(225,255,215,0.3)', rw: 3 });
  pp(side ? pR(-30, -390, 120, 20, 10) : pR(-60, -396, 120, 22, 11), PR.moneyK, { key: key + 'slot', shadow: false, tex: 0.35 });
  // the ₫ belly badge
  const [bx, by, brx, bry] = side ? [70, -112, 82, 46] : [0, -60, 88, 46];
  pp(pE(bx, by, brx, bry), PR.creamL, { key: key + 'badge', sb: 6, sy: 3, tex: 0.5 });
  txtR('₫', bx, by + 4, 68, PR.moneyD, { align: 'center', base: 'middle', weight: 800 });
  // eyes: white paper with an ink pupil; 'happy' closes them into arcs, 'flat' and blinks drop a green lid
  for (const [ex, ey, k] of (side ? [[-150, -300, 0.95]] : [[-88, -290, 1], [88, -290, 1]])) {
    const rx = 34 * k, ry = 40 * k;
    if (mood === 'happy') {
      ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 12 * k; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(ex - 26 * k + lk, ey + 10); ctx.quadraticCurveTo(ex + lk, ey - 32 * k, ex + 26 * k + lk, ey + 10); ctx.stroke(); ctx.restore();
      continue;
    }
    pp(pE(ex, ey, rx, ry), PR.paperW, { key: key + 'eye' + ex, sb: 6, sy: 3, tex: 0.25 });
    const pr = (mood === 'wow' ? 25 : 20) * k, px = ex + lk * k, py = ey + 6;
    pp(pE(px, py, pr, pr), PR.ink, { key: key + 'pup' + ex, shadow: false, tex: 0.2 });
    pp(pE(px + pr * 0.35, py - pr * 0.38, pr * 0.32, pr * 0.32), PR.paperW, { shadow: false, tex: false });
    if (blink || mood === 'flat') {
      ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, 0, 0, TAU); ctx.clip();
      const ly = blink ? ey + ry : ey + 2;
      pp(pR(ex - rx, ey - ry, 2 * rx, ly - ey + ry, 0), PR.moneyD, { key: key + 'lid' + ex, shadow: false, tex: 0.5 });
      pp(pR(ex - rx, ly - 4, 2 * rx, 8, 3), PR.moneyK, { shadow: false, tex: false });
      ctx.restore();
    }
  }
  // snout and nostrils
  if (side) {
    pp(pR(-312, -266, 82, 100, 32), PR.moneyL, { key: key + 'snout', sb: 8, sy: 4, tex: 0.5 });
    pp(pE(-292, -216, 10, 20), PR.moneyK, { key: key + 'nos', shadow: false, tex: 0.3 });
  } else {
    pp(pE(0, -212, 74, 52), PR.moneyL, { key: key + 'snout', sb: 8, sy: 4, tex: 0.5 });
    [-24, 24].forEach((nx) => pp(pE(nx, -212, 11, 18), PR.moneyK, { key: key + 'nos' + nx, shadow: false, tex: 0.3 }));
  }
  if (mood === 'happy') (side ? [-188] : [-150, 150]).forEach((cx) => pp(pE(cx, -205, 30, 15), PR.pink, { key: key + 'blush' + cx, shadow: false, tex: 0.3 }));
  // mouth under the snout
  const mx = side ? -238 : 0, my = side ? -150 : -150;
  if (mood === 'happy') {
    pp(pA(mx, my - 8, 32, 0, Math.PI), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
    pp(pE(mx, my + 12, 15, 8), PR.pink, { shadow: false, tex: false });
  } else if (mood === 'wow') pp(pE(mx, my + 6, 20, 25), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
  else if (mood === 'flat') pp(pR(mx - 26, my, 52, 10, 4), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
  else { ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(mx, my - 12, 24, 0.18 * Math.PI, 0.82 * Math.PI); ctx.stroke(); ctx.restore(); }
  // trotters: the far one hangs still (front view only); the near one is o.hand and holds the prop
  const arm = (sx, sy, hx, hy, k) => {
    const wl = Math.hypot(hx - sx, hy - sy), wa = Math.atan2(hy - sy, hx - sx);
    pp(pE((sx + hx) / 2, (sy + hy) / 2, wl / 2 + 26, 36, wa), PR.moneyD, { key: k, sb: 10, sy: 5, tex: 0.55 });
    pp(pE(hx + Math.cos(wa) * 14, hy + Math.sin(wa) * 14, 30, 30), PR.moneyK, { key: k + 'h', shadow: false, tex: 0.4 });
  };
  if (!side) arm(178, -190, 222, -88, key + 'armR');
  const shx = side ? -140 : -178, shy = side ? -170 : -190;
  const hx = o.hand?.x ?? (side ? -205 : -222), hy = o.hand?.y ?? (side ? -72 : -88) + Math.sin(TT * TAU * 1.3 + ph) * 6;
  if (o.hold) o.hold(hx, hy, true);
  arm(shx, shy, hx, hy, key + 'armL');
  if (o.hold) o.hold(hx, hy, false);
  if (o.hat) { ctx.save(); if (side) ctx.translate(-130, 30); piggyHat(o.hat, key); ctx.restore(); }
  ctx.restore();
}
function piggyTail(x, y) {
  const P = []; for (let i = 0; i <= 40; i++) { const u = i / 40, a = -Math.PI / 2 + u * TAU * 1.4, r = 34 * (1 - u * 0.55); P.push([x + u * 46 + Math.cos(a) * r, y + Math.sin(a) * r]); }
  ctx.save(); ctx.shadowColor = 'rgba(12,10,8,0.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4;
  ctx.strokeStyle = PR.moneyD; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x - 50, y + 20); for (const [px, py] of P) ctx.lineTo(px, py); ctx.stroke(); ctx.restore();
}
function piggyHat(h, key) {
  const top = -392;
  if (h === 'bowler') {
    pp(pA(0, top + 4, 150, Math.PI, TAU), PR.char, { key: key + 'bwdome', sb: 14, sy: 6, tex: 0.5 });
    pp(pR(-150, top - 34, 300, 32, 3), PR.brown, { key: key + 'bwband', shadow: false, tex: 0.45 });
    pp(pE(0, top + 4, 218, 34), PR.ink, { key: key + 'bwbrim', sb: 12, sy: 6, tex: 0.45 });
  } else if (h === 'tophat') {
    pp(pR(-125, top - 250, 250, 256, 8), PR.char, { key: key + 'thcrown', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-125, top - 58, 250, 44, 2), PR.mustard, { key: key + 'thband', shadow: false, tex: 0.5 });
    pp(pE(0, top + 4, 215, 32), PR.ink, { key: key + 'thbrim', sb: 12, sy: 6, tex: 0.45 });
  } else if (h === 'visor') {
    pp(pR(-205, top + 6, 410, 32, 14), PR.char, { key: key + 'vband', sb: 8, sy: 4, tex: 0.4 });
    pp(pG([[-240, top + 82], [240, top + 82], [195, top + 30], [-195, top + 30]]), 'rgba(70,175,120,0.72)', { key: key + 'vbrim', sb: 10, sy: 6, tex: 0.35 });
  } else if (h === 'mortar') {
    pp(pR(-130, top - 50, 260, 70, 8), PR.ink, { key: key + 'mcap', sb: 12, sy: 6, tex: 0.4 });
    pp(pG([[0, top - 140], [260, top - 80], [0, top - 22], [-260, top - 80]]), '#262a3a', { key: key + 'mboard', sb: 16, sy: 8, tex: 0.45 });
    const sw = Math.sin(TT * 5) * 6;
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, top - 82); ctx.quadraticCurveTo(160, top - 70, 196 + sw, top + 20); ctx.stroke(); ctx.restore();
    pp(pR(182 + sw, top + 16, 30, 62, 6), PR.mustard, { key: key + 'mtas', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'nonla') {
    pp(pG([[-290, top + 40], [290, top + 40], [0, top - 190]]), '#d9c08b', { key: key + 'nl', sb: 16, sy: 8, tex: 0.6 });
    [0.4, 0.72].forEach((k, i) => { const yy = top - 190 + k * 230, w = 290 * k; pp(pR(-w, yy - 4, 2 * w, 8, 3), '#b8995d', { key: key + 'nlr' + i, shadow: false, tex: 0.4 }); });
  } else if (h === 'newsboy') {
    pp(pE(0, top - 26, 195, 80), '#8a7a62', { key: key + 'nbcrown', sb: 14, sy: 6, tex: 0.65 });
    pp(pE(0, top - 100, 16, 10), '#6f624e', { key: key + 'nbbtn', shadow: false, tex: 0.4 });
    pp(pE(0, top + 22, 150, 30), '#6f624e', { key: key + 'nbbrim', sb: 10, sy: 6, tex: 0.5 });
  } else if (h === 'party') {
    withT(30, top + 10, 0.2, 1, () => {
      const w = (yy) => 115 * (1 + yy / 270);
      pp(pG([[-115, 0], [115, 0], [0, -270]]), PR.blue, { key: key + 'pcone', sb: 14, sy: 7, tex: 0.55 });
      [[-40, -80], [-150, -190]].forEach(([y0, y1], i) => pp(pG([[-w(y0), y0], [w(y0), y0], [w(y1), y1], [-w(y1), y1]]), PR.mustard, { key: key + 'pstr' + i, shadow: false, tex: 0.5 }));
      pp(pE(0, -272, 32, 32), PR.red, { key: key + 'ppom', sb: 8, sy: 4, tex: 0.5 });
    });
  }
}
// ---- THE TIDU MIND BRAIN: a lavender paper brain (a bumpy two-lobed outline, folded grooves), big eyes, short arms, two legs in dark shoes.
//  Same contract as clawd()/tidu()/piggy(): (x, y) = where the body meets the legs; the shoes reach about 78px below it.
//  o: s, hat ('nightcap'|'detective'|'mortar'|'beret'|'phones'|'halo'|'party'|null), mood ('neutral'|'happy'|'wow'|'flat'), look (pupil shift, px),
//     view ('side'), walk, hand: { x, y } near hand (default hanging at the left side), hold(hx, hy, behind) draws a prop in the hand
//     (propNotebook, propGlass, propStick, ...), pop (0..1 scale-in), lean (rad), flip, key
var BRAINY_SCALE = 1;
function brainy(x, y, o = {}) {
  const s = (o.s ?? 1) * (o.pop ?? 1) * BRAINY_SCALE; if (s <= 0.01) return;
  const key = o.key ?? 'br', ph = hash(key) % 100 / 100 * TAU;
  const bob = Math.sin(TT * TAU * 1.15 + ph) * 7, sq = 1 + Math.sin(TT * TAU * 2.3 + ph) * 0.012;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean ?? 0); ctx.scale(o.flip ? -s : s, s);
  const side = o.view === 'side', mood = o.mood ?? 'neutral', lk = o.look ?? 0;
  const blink = (Math.floor(TT * FPS) + Math.round(ph * 10)) % 96 < 4;
  // legs and shoes (behind the body), lifted in turn when o.walk
  (side ? [-60, 80] : [-72, 72]).forEach((lx, i) => {
    const lift = o.walk ? Math.max(0, Math.sin(TT * TAU * 2.4 + i * Math.PI)) * 20 : 0;
    pp(pR(lx - 26, -60 - lift, 52, 112, 16), PR.mindD, { key: key + 'leg' + i, sb: 10, sy: 5, tex: 0.55 });
    pp(pE(lx + (side ? -18 : 0), 54 - lift, side ? 52 : 44, 24), PR.mindK, { key: key + 'shoe' + i, sb: 8, sy: 4, tex: 0.45 });
  });
  ctx.translate(0, bob * 0.6); ctx.scale(1 / sq, sq);
  // the body: a core ellipse plus eight lobes round its top and sides; the two top-centre lobes leave a notch for the fissure
  const cx = side ? 20 : 0, cy = -200, rx = side ? 255 : 230, ry = side ? 170 : 175;
  const body = () => {
    ctx.ellipse(cx, cy, rx, ry, 0, 0, TAU);
    for (let k = -3.5; k <= 3.5; k++) { const a = -Math.PI / 2 + k * (side ? 0.26 : 0.2) * Math.PI, bx = cx + Math.cos(a) * rx * 0.82, by = cy + Math.sin(a) * ry * 0.82; ctx.moveTo(bx + 82, by); ctx.arc(bx, by, 82, 0, TAU); }
  };
  pp(body, PR.mind, { key: key + 'body', sb: 22, sy: 10, tex: 0.6 });
  // grooves: dark paper strips, kept off the face
  const grooves = side ? [
    [[-60, -365], [-10, -390], [50, -362], [110, -388], [170, -356]],
    [[236, -300], [186, -262], [228, -214], [196, -166]],
    [[10, -300], [70, -282], [100, -232]],
    [[40, -112], [100, -92], [160, -126]],
  ] : [
    [[0, -380], [10, -350], [-6, -320], [4, -296]],
    [[-48, -350], [-92, -372], [-138, -346], [-182, -366]],
    [[48, -344], [96, -368], [140, -342], [186, -362]],
    [[-236, -300], [-190, -286], [-172, -248], [-214, -214]],
    [[236, -296], [192, -280], [176, -244], [218, -210]],
    [[-226, -150], [-182, -126], [-200, -84]],
    [[226, -146], [184, -122], [204, -82]],
  ];
  ctx.save(); ctx.beginPath(); body(); ctx.clip();
  ctx.strokeStyle = '#6550a0'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const P of grooves) { trace(P, false); ctx.stroke(); }
  ctx.restore();
  // eyes: white paper with an ink pupil; 'happy' closes them into arcs, 'flat' and blinks drop a lavender lid
  for (const [ex, ey, k] of (side ? [[-150, -248, 0.95]] : [[-88, -238, 1], [88, -238, 1]])) {
    const erx = 36 * k, ery = 42 * k;
    if (mood === 'happy') {
      ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 12 * k; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(ex - 26 * k + lk, ey + 10); ctx.quadraticCurveTo(ex + lk, ey - 32 * k, ex + 26 * k + lk, ey + 10); ctx.stroke(); ctx.restore();
      continue;
    }
    pp(pE(ex, ey, erx, ery), PR.paperW, { key: key + 'eye' + ex, sb: 6, sy: 3, tex: 0.25 });
    const pr = (mood === 'wow' ? 26 : 21) * k, px = ex + lk * k, py = ey + 6;
    pp(pE(px, py, pr, pr), PR.ink, { key: key + 'pup' + ex, shadow: false, tex: 0.2 });
    pp(pE(px + pr * 0.35, py - pr * 0.38, pr * 0.32, pr * 0.32), PR.paperW, { shadow: false, tex: false });
    if (blink || mood === 'flat') {
      ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, erx, ery, 0, 0, TAU); ctx.clip();
      const ly = blink ? ey + ery : ey + 2;
      pp(pR(ex - erx, ey - ery, 2 * erx, ly - ey + ery, 0), PR.mindD, { key: key + 'lid' + ex, shadow: false, tex: 0.5 });
      pp(pR(ex - erx, ly - 4, 2 * erx, 8, 3), PR.mindK, { shadow: false, tex: false });
      ctx.restore();
    }
  }
  if (mood === 'happy') (side ? [[-104, -192]] : [[-150, -186], [150, -186]]).forEach(([bx, by]) => pp(pE(bx, by, 30, 15), PR.pink, { key: key + 'blush' + bx, shadow: false, tex: 0.3 }));
  // mouth
  const mx = side ? -196 : 0, my = -158;
  if (mood === 'happy') {
    pp(pA(mx, my - 8, 32, 0, Math.PI), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
    pp(pE(mx, my + 12, 15, 8), PR.pink, { shadow: false, tex: false });
  } else if (mood === 'wow') pp(pE(mx, my + 6, 20, 25), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
  else if (mood === 'flat') pp(pR(mx - 26, my, 52, 10, 4), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
  else { ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(mx, my - 12, 24, 0.18 * Math.PI, 0.82 * Math.PI); ctx.stroke(); ctx.restore(); }
  // arms: the far one hangs still (front view only); the near one is o.hand and holds the prop
  const arm = (sx, sy, hx, hy, k) => {
    const wl = Math.hypot(hx - sx, hy - sy), wa = Math.atan2(hy - sy, hx - sx);
    pp(pE((sx + hx) / 2, (sy + hy) / 2, wl / 2 + 20, 30, wa), PR.mindD, { key: k, sb: 10, sy: 5, tex: 0.55 });
    pp(pE(hx, hy, 30, 30), PR.mindL, { key: k + 'h', sb: 6, sy: 3, tex: 0.45 });
  };
  if (!side) arm(190, -170, 238, -86, key + 'armR');
  const shx = side ? -90 : -190, shy = side ? -118 : -170;
  const hx = o.hand?.x ?? (side ? -175 : -238), hy = o.hand?.y ?? (side ? -36 : -86) + Math.sin(TT * TAU * 1.3 + ph) * 6;
  if (o.hold) o.hold(hx, hy, true);
  arm(shx, shy, hx, hy, key + 'armL');
  if (o.hold) o.hold(hx, hy, false);
  if (o.hat) { ctx.save(); if (side) ctx.translate(-70, 10); brainyHat(o.hat, key); ctx.restore(); }
  ctx.restore();
}
function brainyHat(h, key) {
  const top = -392;
  if (h === 'nightcap') {
    pp(() => { ctx.moveTo(-175, top + 14); ctx.quadraticCurveTo(-90, top - 250, 250, top - 190); ctx.quadraticCurveTo(70, top - 120, 175, top + 14); ctx.closePath(); }, PR.blue, { key: key + 'ncone', sb: 14, sy: 7, tex: 0.6 });
    pp(pR(-190, top - 18, 380, 52, 24), PR.creamL, { key: key + 'nband', sb: 10, sy: 5, tex: 0.5 });
    pp(pE(252, top - 192, 36, 36), PR.creamL, { key: key + 'npom', sb: 8, sy: 4, tex: 0.5 });
  } else if (h === 'detective') {
    [-1, 1].forEach((d) => pp(pR(d * 172 - 28, top - 30, 56, 124, 22), '#a17c48', { key: key + 'dflap' + d, sb: 10, sy: 5, tex: 0.55 }));
    pp(pA(0, top + 12, 185, Math.PI, TAU), PR.tan, { key: key + 'ddome', sb: 14, sy: 6, tex: 0.6 });
    pp(pR(-160, top - 72, 320, 10, 2), PR.brown, { key: key + 'dch', shadow: false, tex: 0.4 });
    pp(pR(-5, top - 172, 10, 184, 2), PR.brown, { key: key + 'dcv', shadow: false, tex: 0.4 });
    pp(pE(0, top + 14, 130, 24), '#a17c48', { key: key + 'dbrim', sb: 8, sy: 4, tex: 0.5 });
    pp(pE(0, top - 174, 22, 13), PR.brown, { key: key + 'dbow', sb: 4, sy: 2, tex: 0.4 });
  } else if (h === 'mortar') {
    pp(pR(-130, top - 50, 260, 70, 8), PR.ink, { key: key + 'mcap', sb: 12, sy: 6, tex: 0.4 });
    pp(pG([[0, top - 140], [260, top - 80], [0, top - 22], [-260, top - 80]]), '#262a3a', { key: key + 'mboard', sb: 16, sy: 8, tex: 0.45 });
    const sw = Math.sin(TT * 5) * 6;
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, top - 82); ctx.quadraticCurveTo(160, top - 70, 196 + sw, top + 20); ctx.stroke(); ctx.restore();
    pp(pR(182 + sw, top + 16, 30, 62, 6), PR.mustard, { key: key + 'mtas', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'beret') {
    pp(pE(-30, top - 26, 240, 72, -0.12), '#7b2d3a', { key: key + 'beret', sb: 14, sy: 7, tex: 0.6 });
    pp(pR(-46, top - 118, 24, 36, 8), '#7b2d3a', { key: key + 'bnub', sb: 4, sy: 2, tex: 0.4 });
  } else if (h === 'phones') {
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(0, top + 90, 280, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore();
    pp(pR(-306, top + 70, 72, 150, 22), PR.char, { key: key + 'pl', sb: 10, sy: 6, tex: 0.4 });
    pp(pR(234, top + 70, 72, 150, 22), PR.char, { key: key + 'pr', sb: 10, sy: 6, tex: 0.4 });
    pp(pE(270, top + 145, 14, 14), PR.green, { shadow: false, tex: false });
  } else if (h === 'halo') {
    const hy = top - 80 + Math.sin(TT * TAU * 0.8) * 8;
    ctx.save(); ctx.shadowColor = 'rgba(255,214,110,0.85)'; ctx.shadowBlur = 30; ctx.strokeStyle = PR.yellow; ctx.lineWidth = 24;
    ctx.beginPath(); ctx.ellipse(0, hy, 150, 36, 0, 0, TAU); ctx.stroke(); ctx.restore();
  } else if (h === 'party') {
    withT(30, top + 10, 0.2, 1, () => {
      const w = (yy) => 115 * (1 + yy / 270);
      pp(pG([[-115, 0], [115, 0], [0, -270]]), PR.blue, { key: key + 'pcone', sb: 14, sy: 7, tex: 0.55 });
      [[-40, -80], [-150, -190]].forEach(([y0, y1], i) => pp(pG([[-w(y0), y0], [w(y0), y0], [w(y1), y1], [-w(y1), y1]]), PR.mustard, { key: key + 'pstr' + i, shadow: false, tex: 0.5 }));
      pp(pE(0, -272, 32, 32), PR.red, { key: key + 'ppom', sb: 8, sy: 4, tex: 0.5 });
    });
  }
}
// ---- THE TIDU SCIENCE FLASK: a pale paper-glass Erlenmeyer flask with a bright orange liquid (a rippling surface, rising bubbles),
//  measuring ticks on the glass, the face in the liquid, steel-grey limbs with light-blue lab gloves and dark shoes.
//  Same contract as clawd()/tidu()/piggy()/brainy(): (x, y) = where the body meets the legs; the shoes reach about 80px below it.
//  o: s, hat ('goggles'|'astronaut'|'mortar'|'propeller'|'hardhat'|'explorer'|'party'|null), mood ('neutral'|'happy'|'wow'|'flat'), look (pupil shift, px),
//     view ('side'), walk, hand: { x, y } near glove (default hanging at the left side), hold(hx, hy, behind) draws a prop in the glove
//     (propTube, propMagnet, propGlass, propStick, ...), pop (0..1 scale-in), lean (rad), flip, key
var FLASKY_SCALE = 1;
function flasky(x, y, o = {}) {
  const s = (o.s ?? 1) * (o.pop ?? 1) * FLASKY_SCALE; if (s <= 0.01) return;
  const key = o.key ?? 'fl', ph = hash(key) % 100 / 100 * TAU;
  const bob = Math.sin(TT * TAU * 1.15 + ph) * 7, sq = 1 + Math.sin(TT * TAU * 2.3 + ph) * 0.012;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean ?? 0); ctx.scale(o.flip ? -s : s, s);
  const side = o.view === 'side', mood = o.mood ?? 'neutral', lk = o.look ?? 0;
  const blink = (Math.floor(TT * FPS) + Math.round(ph * 10)) % 96 < 4;
  // legs and shoes (behind the body), lifted in turn when o.walk
  (side ? [-50, 70] : [-80, 80]).forEach((lx, i) => {
    const lift = o.walk ? Math.max(0, Math.sin(TT * TAU * 2.4 + i * Math.PI)) * 20 : 0;
    pp(pR(lx - 22, -40 - lift, 44, 96, 14), PR.sciK, { key: key + 'leg' + i, sb: 10, sy: 5, tex: 0.5 });
    pp(pE(lx + (side ? -16 : 0), 58 - lift, side ? 50 : 44, 22), PR.sciD, { key: key + 'shoe' + i, sb: 8, sy: 4, tex: 0.45 });
  });
  ctx.translate(0, bob * 0.6); ctx.scale(1 / sq, sq);
  // the flask: a narrow neck sloping out to a flat base with rounded corners; d insets it (the inside of the glass)
  const flask = (d) => () => {
    const nw = 62 - d, bw = 232 - d, top = -500 + d, sh = -350, base = -12 - d, r = 46;
    ctx.moveTo(-nw, top); ctx.lineTo(-nw, sh); ctx.lineTo(-bw + 18, base - r * 1.1);
    ctx.quadraticCurveTo(-bw - 6, base, -bw + r, base); ctx.lineTo(bw - r, base);
    ctx.quadraticCurveTo(bw + 6, base, bw - 18, base - r * 1.1); ctx.lineTo(nw, sh); ctx.lineTo(nw, top); ctx.closePath();
  };
  pp(flask(0), PR.glass, { key: key + 'glass', sb: 22, sy: 10, tex: 0.45, rim: 'rgba(255,255,255,0.7)', rw: 4 });
  // the liquid, clipped to the inside of the glass: a rippling surface, a lighter meniscus line and rising bubbles
  const ly = -255, wave = (dy) => (xx) => ly + dy + Math.sin(xx * 0.03 + TT * 4 + ph) * 7;
  ctx.save(); ctx.beginPath(); flask(16)(); ctx.clip();
  const surf = wave(0);
  pp(() => { ctx.moveTo(-300, surf(-300)); for (let xx = -300; xx <= 300; xx += 20) ctx.lineTo(xx, surf(xx)); ctx.lineTo(300, 40); ctx.lineTo(-300, 40); ctx.closePath(); }, PR.sci, { key: key + 'liq', shadow: false, tex: 0.5 });
  ctx.save(); ctx.strokeStyle = PR.sciL; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); for (let xx = -300; xx <= 300; xx += 20) ctx.lineTo(xx, surf(xx) + 3); ctx.stroke(); ctx.restore();
  const R = RNG(key, 'bub');
  for (let i = 0; i < 7; i++) {
    const bx = (i % 2 ? 1 : -1) * R.r(115, 185), sp = R.r(40, 90), off = R.r(0, 220), br = R.r(7, 15), by = -30 - (TT * sp + off) % 220;   // either side of the face
    if (by > ly + 12) pp(pE(bx, by, br, br), 'rgba(253,226,196,0.85)', { shadow: false, tex: false });
  }
  ctx.restore();
  // glass details: the lip, a highlight on the neck and the slope, measuring ticks above the liquid
  pp(pR(-84, -530, 168, 40, 14), PR.glassD, { key: key + 'lip', sb: 8, sy: 4, tex: 0.4, rim: 'rgba(255,255,255,0.6)', rw: 3 });
  pp(pR(-44, -484, 16, 112, 8), 'rgba(255,255,255,0.6)', { shadow: false, tex: false });
  withT(-112, -205, 0.48, 1, () => pp(pR(-10, -80, 20, 150, 10), 'rgba(255,255,255,0.5)', { shadow: false, tex: false }));
  [[-330, 34], [-300, 22], [-270, 34]].forEach(([ty, tw]) => pp(pR(side ? -20 : 20, ty, tw, 6, 3), 'rgba(40,60,90,0.45)', { shadow: false, tex: false }));
  // eyes in the liquid: white paper with an ink pupil; 'happy' closes them into arcs, 'flat' and blinks drop an orange lid
  for (const [ex, ey, k] of (side ? [[-95, -150, 0.95]] : [[-72, -150, 1], [72, -150, 1]])) {
    const erx = 34 * k, ery = 40 * k;
    if (mood === 'happy') {
      ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 12 * k; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(ex - 26 * k + lk, ey + 10); ctx.quadraticCurveTo(ex + lk, ey - 32 * k, ex + 26 * k + lk, ey + 10); ctx.stroke(); ctx.restore();
      continue;
    }
    pp(pE(ex, ey, erx, ery), PR.paperW, { key: key + 'eye' + ex, sb: 6, sy: 3, tex: 0.25 });
    const pr = (mood === 'wow' ? 25 : 20) * k, px = ex + lk * k, py = ey + 6;
    pp(pE(px, py, pr, pr), PR.ink, { key: key + 'pup' + ex, shadow: false, tex: 0.2 });
    pp(pE(px + pr * 0.35, py - pr * 0.38, pr * 0.32, pr * 0.32), PR.paperW, { shadow: false, tex: false });
    if (blink || mood === 'flat') {
      ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, erx, ery, 0, 0, TAU); ctx.clip();
      const lidY = blink ? ey + ery : ey + 2;
      pp(pR(ex - erx, ey - ery, 2 * erx, lidY - ey + ery, 0), PR.sciD, { key: key + 'lid' + ex, shadow: false, tex: 0.5 });
      pp(pR(ex - erx, lidY - 4, 2 * erx, 8, 3), '#8a4312', { shadow: false, tex: false });
      ctx.restore();
    }
  }
  if (mood === 'happy') (side ? [[-36, -104]] : [[-126, -104], [126, -104]]).forEach(([bx, by]) => pp(pE(bx, by, 26, 13), PR.pink, { key: key + 'blush' + bx, shadow: false, tex: 0.3 }));
  // mouth
  const mx = side ? -112 : 0, my = -84;
  if (mood === 'happy') {
    pp(pA(mx, my - 8, 30, 0, Math.PI), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
    pp(pE(mx, my + 11, 14, 7), PR.pink, { shadow: false, tex: false });
  } else if (mood === 'wow') pp(pE(mx, my + 6, 19, 24), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
  else if (mood === 'flat') pp(pR(mx - 24, my, 48, 10, 4), PR.ink, { key: key + 'mouth', shadow: false, tex: 0.2 });
  else { ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(mx, my - 12, 22, 0.18 * Math.PI, 0.82 * Math.PI); ctx.stroke(); ctx.restore(); }
  // arms: the far one hangs still (front view only); the near one is o.hand and holds the prop
  const arm = (sx, sy, hx, hy, k) => {
    const wl = Math.hypot(hx - sx, hy - sy), wa = Math.atan2(hy - sy, hx - sx);
    pp(pE((sx + hx) / 2, (sy + hy) / 2, wl / 2 + 18, 24, wa), PR.sciK, { key: k, sb: 10, sy: 5, tex: 0.5 });
    pp(pE(hx, hy, 30, 30), '#9fd3e6', { key: k + 'h', sb: 6, sy: 3, tex: 0.45 });
  };
  if (!side) arm(150, -190, 220, -96, key + 'armR');
  const shx = side ? 40 : -150, shy = side ? -150 : -190;
  const hx = o.hand?.x ?? (side ? 10 : -220), hy = o.hand?.y ?? (side ? -62 : -96) + Math.sin(TT * TAU * 1.3 + ph) * 6;
  if (o.hold) o.hold(hx, hy, true);
  arm(shx, shy, hx, hy, key + 'armL');
  if (o.hold) o.hold(hx, hy, false);
  if (o.hat) { ctx.save(); ctx.translate(0, -530); ctx.scale(0.75, 0.75); flaskyHat(o.hat, key); ctx.restore(); }
  ctx.restore();
}
// hats in their own frame: (0, 0) = the top of the flask's lip, drawn at 0.75 so they perch on the narrow neck; positive y runs down the neck
function flaskyHat(h, key) {
  if (h === 'goggles') {
    pp(pR(-130, 96, 260, 28, 10), PR.ink, { key: key + 'gband', sb: 8, sy: 4, tex: 0.4 });
    [-64, 64].forEach((gx) => {
      pp(pE(gx, 110, 56, 50), PR.char, { key: key + 'grim' + gx, sb: 10, sy: 5, tex: 0.4 });
      pp(pE(gx, 110, 42, 36), '#bfe6f2', { key: key + 'glens' + gx, shadow: false, tex: 0.25 });
      pp(pE(gx - 14, 98, 12, 8, -0.5), 'rgba(255,255,255,0.8)', { shadow: false, tex: false });
    });
  } else if (h === 'astronaut') {
    pp(pE(0, 60, 160, 186), 'rgba(205,232,245,0.42)', { key: key + 'adome', sb: 16, sy: 8, tex: 0.25, rim: 'rgba(255,255,255,0.85)', rw: 6 });
    pp(pE(-70, -40, 22, 50, 0.5), 'rgba(255,255,255,0.65)', { shadow: false, tex: false });
    pp(pR(-170, 220, 340, 44, 20), PR.paperW, { key: key + 'acollar', sb: 10, sy: 5, tex: 0.45 });
    pp(pE(110, 242, 12, 12), PR.red, { shadow: false, tex: false });
  } else if (h === 'mortar') {
    pp(pR(-130, -50, 260, 70, 8), PR.ink, { key: key + 'mcap', sb: 12, sy: 6, tex: 0.4 });
    pp(pG([[0, -140], [260, -80], [0, -22], [-260, -80]]), '#262a3a', { key: key + 'mboard', sb: 16, sy: 8, tex: 0.45 });
    const sw = Math.sin(TT * 5) * 6;
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, -82); ctx.quadraticCurveTo(160, -70, 196 + sw, 20); ctx.stroke(); ctx.restore();
    pp(pR(182 + sw, 16, 30, 62, 6), PR.mustard, { key: key + 'mtas', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'propeller') {
    [PR.red, PR.yellow, PR.blue, PR.green].forEach((c, i) => pp(() => { ctx.moveTo(0, 14); ctx.arc(0, 14, 165, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); ctx.closePath(); }, c, { key: key + 'pdome' + i, sb: 12, sy: 5, tex: 0.55 }));
    pp(pR(-172, -2, 344, 28, 12), PR.navy, { key: key + 'pband', sb: 8, sy: 4, tex: 0.45 });
    pp(pR(-9, -200, 18, 56, 4), PR.char, { key: key + 'pstem', sb: 6, sy: 3, tex: 0.3 });
    const spin = Math.cos(TT * TAU * 1.5), sx = Math.sign(spin || 1) * Math.max(0.08, Math.abs(spin));
    ctx.save(); ctx.translate(0, -200); ctx.scale(sx, 1);
    pp(pE(-66, 0, 66, 16), PR.red, { key: key + 'pbl', sb: 6, sy: 3, tex: 0.4 }); pp(pE(66, 0, 66, 16), PR.blue, { key: key + 'pbr', sb: 6, sy: 3, tex: 0.4 });
    ctx.restore();
    pp(pE(0, -200, 15, 15), PR.mustard, { key: key + 'phub', shadow: false, tex: 0.4 });
  } else if (h === 'hardhat') {
    pp(pA(0, 8, 172, Math.PI, TAU), PR.yellow, { key: key + 'hdome', sb: 14, sy: 6, tex: 0.6 });
    pp(pR(-24, -170, 48, 172, 20), PR.mustard, { key: key + 'hcrest', shadow: false, tex: 0.5 });
    pp(pR(-215, -12, 430, 34, 16), PR.mustard, { key: key + 'hbrim', sb: 10, sy: 5, tex: 0.5 });
  } else if (h === 'explorer') {
    pp(pE(0, 4, 250, 44), PR.tan, { key: key + 'ebrim', sb: 14, sy: 7, tex: 0.6 });
    pp(pA(0, -4, 166, Math.PI, TAU), '#d9c08b', { key: key + 'edome', sb: 10, sy: 4, tex: 0.6 });
    pp(pR(-166, -40, 332, 30, 3), PR.brown, { key: key + 'eband', shadow: false, tex: 0.5 });
    pp(pE(0, -172, 16, 10), PR.tan, { key: key + 'ebtn', shadow: false, tex: 0.4 });
  } else if (h === 'party') {
    withT(30, 10, 0.2, 1, () => {
      const w = (yy) => 115 * (1 + yy / 270);
      pp(pG([[-115, 0], [115, 0], [0, -270]]), PR.blue, { key: key + 'pcone', sb: 14, sy: 7, tex: 0.55 });
      [[-40, -80], [-150, -190]].forEach(([y0, y1], i) => pp(pG([[-w(y0), y0], [w(y0), y0], [w(y1), y1], [-w(y1), y1]]), PR.mustard, { key: key + 'pstr' + i, shadow: false, tex: 0.5 }));
      pp(pE(0, -272, 32, 32), PR.red, { key: key + 'ppom', sb: 8, sy: 4, tex: 0.5 });
    });
  }
}
// ---- THE TIDU ENGLISH PARROT: a sky-blue paper macaw with a yellow ABC belly, a white face mask, an ivory hooked beak,
//  a three-feather crest, long tail feathers and grey feet.
//  Same contract as clawd()/tidu(): (x, y) = where the body meets the feet; the toes reach about 44px below it.
//  o: s, hat ('mortar'|'guard'|'crown'|'cap'|'pirate'|'wizard'|'party'|null), mood ('neutral'|'happy'|'wow'|'flat'), look (pupil shift, px),
//     view ('side'), walk, hand: { x, y } wing tip (default folded at the left side), hold(hx, hy, behind) draws a prop at the wing tip
//     (propCard, propBook, propStick, ...), pop (0..1 scale-in), lean (rad), flip, key
var POLLY_SCALE = 1;
function polly(x, y, o = {}) {
  const s = (o.s ?? 1) * (o.pop ?? 1) * POLLY_SCALE; if (s <= 0.01) return;
  const key = o.key ?? 'po', ph = hash(key) % 100 / 100 * TAU;
  const bob = Math.sin(TT * TAU * 1.15 + ph) * 7, sq = 1 + Math.sin(TT * TAU * 2.3 + ph) * 0.012;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean ?? 0); ctx.scale(o.flip ? -s : s, s);
  const side = o.view === 'side', mood = o.mood ?? 'neutral', lk = o.look ?? 0, bx0 = side ? 20 : 0;
  const blink = (Math.floor(TT * FPS) + Math.round(ph * 10)) % 96 < 4;
  // tail feathers behind everything: hanging down between the feet, or trailing back side-on
  (side ? [[210, -70, 0.95], [190, -40, 1.15]] : [[-34, -10, 0.16], [34, -10, -0.16]]).forEach(([tx, ty, tr], i) => pp(pE(tx, ty, 34, 130, tr), PR.engD, { key: key + 'tail' + i, sb: 10, sy: 5, tex: 0.55 }));
  // feet: two forward toes each, lifted in turn when o.walk
  (side ? [-40, 60] : [-70, 70]).forEach((fx, i) => {
    const lift = o.walk ? Math.max(0, Math.sin(TT * TAU * 2.4 + i * Math.PI)) * 22 : 0;
    [-16, 16].forEach((dx, j) => pp(pE(fx + dx + (side ? -10 : 0), 18 - lift, 15, 26, dx * 0.01), PR.greyD, { key: key + 'toe' + i + j, sb: 8, sy: 4, tex: 0.45 }));
  });
  ctx.translate(0, bob * 0.6); ctx.scale(1 / sq, sq);
  // crest: three feathers fanned on top (leaning back side-on)
  (side ? [[40, -470, 0.55], [70, -455, 0.85], [92, -430, 1.15]] : [[-42, -478, -0.4], [0, -500, 0], [42, -478, 0.4]]).forEach(([cx, cy, cr], i) => pp(pE(cx, cy, 26, 72, cr), i === 1 ? PR.eng : PR.engL, { key: key + 'crest' + i, sb: 10, sy: 5, tex: 0.55 }));
  pp(pE(bx0, -235, 195, 230), PR.eng, { key: key + 'body', sb: 22, sy: 10, tex: 0.6, rim: 'rgba(225,245,255,0.35)', rw: 3 });
  if (!side) pp(pE(178, -210, 60, 140, -0.16), PR.engD, { key: key + 'wingR', sb: 10, sy: 5, tex: 0.55 });
  // the yellow belly with ABC
  const [yx, yy, yrx, yry, ys] = side ? [-30, -102, 100, 98, 50] : [0, -98, 128, 98, 60];
  pp(pE(yx, yy, yrx, yry), PR.engY, { key: key + 'belly', sb: 6, sy: 3, tex: 0.5 });
  txtR('ABC', yx, yy + 6, ys, PR.engD, { align: 'center', base: 'middle', weight: 800 });
  // the near wing: folded in front view it tucks under the face mask; raised (o.hand) or side-on it is drawn over the face
  const shx = side ? 100 : -165, shy = side ? -290 : -290;
  const hx = o.hand?.x ?? (side ? 80 : -215), hy = o.hand?.y ?? (side ? -120 : -125) + Math.sin(TT * TAU * 1.3 + ph) * 6;
  const wing = () => {
    const wl = Math.hypot(hx - shx, hy - shy), wa = Math.atan2(hy - shy, hx - shx);
    if (o.hold) o.hold(hx, hy, true);
    pp(pE((shx + hx) / 2, (shy + hy) / 2, wl / 2 + 40, 56, wa), PR.engD, { key: key + 'wingL', sb: 12, sy: 6, tex: 0.55, rim: 'rgba(225,245,255,0.25)', rw: 2 });
    if (o.hold) o.hold(hx, hy, false);
  };
  const wingOver = side || !!o.hand;
  if (!wingOver) wing();
  // face: a white mask round each eye, ink pupils; 'happy' closes them into arcs, 'flat' and blinks drop a blue lid
  for (const [ex, ey, k] of (side ? [[-100, -330, 0.95]] : [[-72, -330, 1], [72, -330, 1]])) {
    pp(pE(ex, ey, 70 * k, 62 * k), PR.paperW, { key: key + 'mask' + ex, sb: 6, sy: 3, tex: 0.35 });
    if (mood === 'happy') {
      ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineWidth = 13 * k; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(ex - 28 * k + lk, ey + 10); ctx.quadraticCurveTo(ex + lk, ey - 32 * k, ex + 28 * k + lk, ey + 10); ctx.stroke(); ctx.restore();
      continue;
    }
    const er = 44 * k, pr = (mood === 'wow' ? 30 : 25) * k, px = ex + lk * k, py = ey + 4;
    pp(pE(px, py, pr, pr), PR.ink, { key: key + 'pup' + ex, shadow: false, tex: 0.2 });
    pp(pE(px + pr * 0.35, py - pr * 0.38, pr * 0.32, pr * 0.32), PR.paperW, { shadow: false, tex: false });
    if (blink || mood === 'flat') {
      ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, er, er, 0, 0, TAU); ctx.clip();
      const lidY = blink ? ey + er : ey + 2;
      pp(pR(ex - er, ey - er, 2 * er, lidY - ey + er, 0), PR.engL, { key: key + 'lid' + ex, shadow: false, tex: 0.5 });
      pp(pR(ex - er, lidY - 4, 2 * er, 8, 3), PR.engD, { shadow: false, tex: false });
      ctx.restore();
    }
  }
  if (mood === 'happy') (side ? [[-60, -280]] : [[-108, -284], [108, -284]]).forEach(([cx, cy]) => pp(pE(cx, cy, 26, 13), PR.pink, { key: key + 'blush' + cx, shadow: false, tex: 0.3 }));
  // beak: the dark lower mandible shows the mood, the ivory hooked upper beak sits over it
  const lower = '#3a3a44', [mx, my] = side ? [-196, -238] : [0, -236];
  if (mood === 'happy') { pp(pA(mx, my - 4, 32, 0, Math.PI), lower, { key: key + 'low', shadow: false, tex: 0.3 }); pp(pE(mx, my + 10, 14, 7), PR.pink, { shadow: false, tex: false }); }
  else if (mood === 'wow') { pp(pE(mx, my + 14, 30, 30), lower, { key: key + 'low', shadow: false, tex: 0.3 }); pp(pE(mx, my + 26, 15, 9), PR.pink, { shadow: false, tex: false }); }
  else if (mood === 'flat') pp(pR(mx - 26, my - 4, 52, 12, 5), lower, { key: key + 'low', shadow: false, tex: 0.3 });
  else pp(pE(mx, my, 28, 16), lower, { key: key + 'low', shadow: false, tex: 0.3 });
  pp(side
    ? () => { ctx.moveTo(-140, -302); ctx.quadraticCurveTo(-232, -320, -252, -252); ctx.quadraticCurveTo(-232, -264, -214, -240); ctx.quadraticCurveTo(-186, -262, -140, -252); ctx.closePath(); }
    : () => { ctx.moveTo(-44, -290); ctx.quadraticCurveTo(0, -320, 44, -290); ctx.quadraticCurveTo(40, -238, 6, -202); ctx.quadraticCurveTo(-20, -232, -44, -290); ctx.closePath(); },
  '#f2ebdc', { key: key + 'beak', sb: 8, sy: 4, tex: 0.4 });
  if (wingOver) wing();
  if (o.hat) { ctx.save(); ctx.translate(bx0 * 0.5, 0); pollyHat(o.hat, key); ctx.restore(); }
  ctx.restore();
}
function pollyHat(h, key) {
  const top = -455;
  if (h === 'mortar') {
    pp(pR(-130, top - 50, 260, 70, 8), PR.ink, { key: key + 'mcap', sb: 12, sy: 6, tex: 0.4 });
    pp(pG([[0, top - 140], [260, top - 80], [0, top - 22], [-260, top - 80]]), '#262a3a', { key: key + 'mboard', sb: 16, sy: 8, tex: 0.45 });
    const sw = Math.sin(TT * 5) * 6;
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, top - 82); ctx.quadraticCurveTo(160, top - 70, 196 + sw, top + 20); ctx.stroke(); ctx.restore();
    pp(pR(182 + sw, top + 16, 30, 62, 6), PR.mustard, { key: key + 'mtas', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'guard') {
    pp(pR(-125, top - 300, 250, 320, 115), PR.ink, { key: key + 'gfur', sb: 16, sy: 8, tex: 0.8 });
    pp(pR(-128, top - 6, 256, 22, 8), PR.mustard, { key: key + 'gstrap', sb: 6, sy: 3, tex: 0.45 });
    pp(pE(110, top - 150, 18, 46, 0.2), PR.red, { key: key + 'gplume', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'crown') {
    pp(pG([[-150, top + 12], [-160, top - 120], [-80, top - 50], [0, top - 150], [80, top - 50], [160, top - 120], [150, top + 12]]), PR.mustard, { key: key + 'crown', sb: 14, sy: 7, tex: 0.6 });
    [[-160, top - 120], [0, top - 150], [160, top - 120]].forEach(([px, py], i) => pp(pE(px, py, 15, 15), PR.yellow, { key: key + 'cpk' + i, sb: 4, sy: 2, tex: 0.4 }));
    pp(pR(-152, top - 24, 304, 34, 4), PR.yellow, { key: key + 'cband', shadow: false, tex: 0.5 });
    [[-90, PR.blue], [0, PR.red], [90, PR.green]].forEach(([gx, c]) => pp(pE(gx, top - 7, 15, 15), c, { key: key + 'gem' + gx, sb: 4, sy: 2, tex: 0.4 }));
  } else if (h === 'cap') {
    pp(pA(0, top + 10, 170, Math.PI, TAU), PR.red, { key: key + 'cdome', sb: 14, sy: 6, tex: 0.6 });
    pp(pE(0, top + 12, 200, 34), PR.redD, { key: key + 'cbill', sb: 10, sy: 6, tex: 0.5 });
    pp(pE(0, top - 158, 18, 11), PR.redD, { key: key + 'cbtn', shadow: false, tex: 0.4 });
    txtR('E', 0, top - 60, 96, PR.paperW, { align: 'center', base: 'middle', weight: 800 });
  } else if (h === 'pirate') {
    pp(() => { ctx.moveTo(-235, top + 14); ctx.quadraticCurveTo(-170, top - 175, 0, top - 125); ctx.quadraticCurveTo(170, top - 175, 235, top + 14); ctx.quadraticCurveTo(0, top - 40, -235, top + 14); ctx.closePath(); }, PR.ink, { key: key + 'pir', sb: 14, sy: 7, tex: 0.5 });
    pp(pE(0, top - 82, 26, 24), PR.paperW, { key: key + 'skull', shadow: false, tex: 0.3 });
    [-9, 9].forEach((sx) => pp(pE(sx, top - 84, 6, 7), PR.ink, { shadow: false, tex: false }));
  } else if (h === 'wizard') {
    pp(pG([[-160, top + 20], [160, top + 20], [50, top - 320]]), '#5a3f9a', { key: key + 'wcone', sb: 14, sy: 7, tex: 0.6 });
    pp(pE(0, top + 20, 235, 40), '#46307a', { key: key + 'wbrim', sb: 12, sy: 6, tex: 0.55 });
    prStar(-10, top - 110, 24, PR.yellow); prStar(55, top - 205, 17, PR.yellow); prStar(-60, top - 30, 14, PR.cream);
  } else if (h === 'party') {
    withT(30, top + 10, 0.2, 1, () => {
      const w = (yy) => 115 * (1 + yy / 270);
      pp(pG([[-115, 0], [115, 0], [0, -270]]), PR.blue, { key: key + 'pcone', sb: 14, sy: 7, tex: 0.55 });
      [[-40, -80], [-150, -190]].forEach(([y0, y1], i) => pp(pG([[-w(y0), y0], [w(y0), y0], [w(y1), y1], [-w(y1), y1]]), PR.mustard, { key: key + 'pstr' + i, shadow: false, tex: 0.5 }));
      pp(pE(0, -272, 32, 32), PR.red, { key: key + 'ppom', sb: 8, sy: 4, tex: 0.5 });
    });
  }
}
// ---- THE TIDU TECH ROBOT: a silver paper robot whose head is a dark rounded screen; the face is drawn on it in glowing cyan
//  (with faint scanlines) and changes with the mood. A blinking antenna, ear discs, a capsule body with a control panel and
//  a cyan core, tube arms and legs, boots.
//  Same contract as clawd()/tidu(): (x, y) = where the body meets the legs; the boots reach about 70px below it.
//  o: s, hat ('headset'|'vr'|'beanie'|'drone'|'mortar'|'tinfoil'|'party'|null), mood ('neutral'|'happy'|'wow'|'flat'), look (eye shift, px),
//     view ('side'), walk, hand: { x, y } near hand (default hanging at the left side), hold(hx, hy, behind) draws a prop in the hand
//     (propPhone, propChip, propWrench, propStick, ...), pop (0..1 scale-in), lean (rad), flip, key
var BOTTY_SCALE = 1;
function botty(x, y, o = {}) {
  const s = (o.s ?? 1) * (o.pop ?? 1) * BOTTY_SCALE; if (s <= 0.01) return;
  const key = o.key ?? 'bt', ph = hash(key) % 100 / 100 * TAU;
  const bob = Math.sin(TT * TAU * 1.15 + ph) * 7, sq = 1 + Math.sin(TT * TAU * 2.3 + ph) * 0.012;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean ?? 0); ctx.scale(o.flip ? -s : s, s);
  const side = o.view === 'side', mood = o.mood ?? 'neutral', lk = o.look ?? 0;
  const blink = (Math.floor(TT * FPS) + Math.round(ph * 10)) % 96 < 4;
  // legs, knee joints and boots (behind the body), lifted in turn when o.walk
  (side ? [-40, 50] : [-62, 62]).forEach((lx, i) => {
    const lift = o.walk ? Math.max(0, Math.sin(TT * TAU * 2.4 + i * Math.PI)) * 20 : 0;
    pp(pR(lx - 20, -40 - lift, 40, 90, 14), PR.techD, { key: key + 'leg' + i, sb: 10, sy: 5, tex: 0.45 });
    pp(pE(lx, 8 - lift, 18, 18), PR.techK, { key: key + 'knee' + i, shadow: false, tex: 0.35 });
    pp(pR(lx - 44 + (side ? -16 : 0), 36 - lift, 88, 34, 14), PR.techK, { key: key + 'boot' + i, sb: 8, sy: 4, tex: 0.4 });
  });
  ctx.translate(0, bob * 0.6); ctx.scale(1 / sq, sq);
  const glow = (fn, w = 14) => { ctx.save(); ctx.shadowColor = PR.glow; ctx.shadowBlur = 18; ctx.strokeStyle = PR.glow; ctx.fillStyle = PR.glow; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; fn(); ctx.restore(); };
  // body: a capsule with a control panel, three LEDs and a glowing core
  const px0 = side ? -40 : 0;
  pp(pR(-150, -250, 300, 252, 70), PR.tech, { key: key + 'body', sb: 22, sy: 10, tex: 0.5, rim: 'rgba(255,255,255,0.55)', rw: 3 });
  pp(pR(px0 - 90, -205, 180, 116, 18), PR.techK, { key: key + 'panel', shadow: false, tex: 0.35 });
  [[-56, PR.red], [-26, PR.yellow], [4, PR.green]].forEach(([lx, c]) => pp(pE(px0 + lx, -180, 10, 10), c, { shadow: false, tex: false }));
  pp(pR(px0 + 26, -188, 46, 14, 6), PR.techD, { shadow: false, tex: false });
  glow(() => { ctx.beginPath(); ctx.arc(px0, -130, 20 + Math.sin(TT * TAU * 1.2 + ph) * 3, 0, TAU); ctx.fill(); });
  pp(pR(-34, -282, 68, 40, 8), PR.techD, { key: key + 'neck', sb: 6, sy: 3, tex: 0.4 });
  // antenna (its bulb blinks), ear discs, the head
  const on = Math.floor(TT * 1.5 + ph) % 2 === 0, ax = side ? 30 : 0;
  pp(pR(ax - 6, -630, 12, 76, 6), PR.techK, { key: key + 'ant', sb: 6, sy: 3, tex: 0.3 });
  if (on) { ctx.save(); ctx.shadowColor = 'rgba(255,90,90,0.9)'; ctx.shadowBlur = 24; ctx.fillStyle = '#ff5a5a'; ctx.beginPath(); ctx.arc(ax, -640, 20, 0, TAU); ctx.fill(); ctx.restore(); }
  else pp(pE(ax, -640, 20, 20), '#8a2a2a', { key: key + 'bulb', shadow: false, tex: 0.3 });
  (side ? [140] : [-205, 205]).forEach((ex) => { pp(pE(ex, -415, 28, 56), PR.techD, { key: key + 'ear' + ex, sb: 8, sy: 4, tex: 0.45 }); pp(pE(ex, -415, 12, 30), PR.techK, { shadow: false, tex: false }); });
  pp(pR(-200, -560, 400, 292, 80), PR.tech, { key: key + 'head', sb: 22, sy: 10, tex: 0.5, rim: 'rgba(255,255,255,0.55)', rw: 3 });
  const [sx0, sw] = side ? [-192, 262] : [-162, 324];
  const scr = () => ctx.roundRect(sx0, -525, sw, 222, 50);
  pp(scr, PR.screen, { key: key + 'screen', shadow: false, tex: 0.25 });
  // the face on the screen: glowing strokes, clipped to the screen, with scanlines over it
  ctx.save(); ctx.beginPath(); scr(); ctx.clip();
  const eyes = side ? [[-128, 0.85], [-52, 0.85]] : [[-72, 1], [72, 1]], ey = -440, [mx, my] = side ? [-92, -360] : [0, -360];
  for (const [ex0, k] of eyes) {
    const ex = ex0 + lk;
    if (blink && mood !== 'happy') { glow(() => { ctx.beginPath(); ctx.moveTo(ex - 22 * k, ey + 6); ctx.lineTo(ex + 22 * k, ey + 6); ctx.stroke(); }, 10); continue; }
    if (mood === 'happy') glow(() => { ctx.beginPath(); ctx.moveTo(ex - 28 * k, ey + 14); ctx.quadraticCurveTo(ex, ey - 30, ex + 28 * k, ey + 14); ctx.stroke(); });
    else if (mood === 'wow') glow(() => { ctx.beginPath(); ctx.arc(ex, ey, 34 * k, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(ex, ey, 11 * k, 0, TAU); ctx.fill(); }, 10);
    else if (mood === 'flat') glow(() => { ctx.beginPath(); ctx.roundRect(ex - 24 * k, ey, 48 * k, 26, 10); ctx.fill(); });
    else glow(() => { ctx.beginPath(); ctx.roundRect(ex - 20 * k, ey - 32, 40 * k, 64, 20); ctx.fill(); });
  }
  if (mood === 'happy') (side ? [-160] : [-122, 122]).forEach((cx) => { ctx.save(); ctx.shadowColor = '#ff7fb0'; ctx.shadowBlur = 14; ctx.fillStyle = 'rgba(255,127,176,0.85)'; ctx.beginPath(); ctx.roundRect(cx - 20, -392, 40, 14, 7); ctx.fill(); ctx.restore(); });
  if (mood === 'happy') glow(() => { ctx.beginPath(); ctx.moveTo(mx - 44, my - 12); ctx.arc(mx, my - 12, 44, 0, Math.PI); ctx.closePath(); ctx.fill(); });
  else if (mood === 'wow') glow(() => { ctx.beginPath(); ctx.arc(mx, my, 22, 0, TAU); ctx.stroke(); }, 10);
  else if (mood === 'flat') glow(() => { ctx.beginPath(); ctx.moveTo(mx - 34, my); ctx.lineTo(mx + 34, my); ctx.stroke(); }, 10);
  else glow(() => { ctx.beginPath(); ctx.arc(mx, my - 26, 34, 0.18 * Math.PI, 0.82 * Math.PI); ctx.stroke(); }, 10);
  ctx.fillStyle = 'rgba(255,255,255,0.05)'; for (let yy = -525; yy < -303; yy += 8) ctx.fillRect(sx0, yy, sw, 2);
  pp(pR(sx0 + 24, -510, sw * 0.4, 16, 8), 'rgba(255,255,255,0.08)', { shadow: false, tex: false });
  ctx.restore();
  // arms: the far one hangs still (front view only); the near one is o.hand and holds the prop
  const arm = (sx, sy, hx, hy, k) => {
    const wl = Math.hypot(hx - sx, hy - sy), wa = Math.atan2(hy - sy, hx - sx);
    pp(pE((sx + hx) / 2, (sy + hy) / 2, wl / 2 + 16, 22, wa), PR.techD, { key: k, sb: 10, sy: 5, tex: 0.45 });
    pp(pE(sx, sy, 20, 20), PR.techK, { key: k + 'j', shadow: false, tex: 0.35 });
    pp(pE(hx, hy, 30, 30), PR.techL, { key: k + 'h', sb: 6, sy: 3, tex: 0.4 });
  };
  if (!side) arm(150, -200, 205, -104, key + 'armR');
  const shx = side ? 30 : -150, shy = side ? -200 : -200;
  const hx = o.hand?.x ?? (side ? -10 : -205), hy = o.hand?.y ?? (side ? -96 : -104) + Math.sin(TT * TAU * 1.3 + ph) * 6;
  if (o.hold) o.hold(hx, hy, true);
  arm(shx, shy, hx, hy, key + 'armL');
  if (o.hold) o.hold(hx, hy, false);
  if (o.hat) bottyHat(o.hat, key);
  ctx.restore();
}
function bottyHat(h, key) {
  const top = -560;
  if (h === 'headset') {
    ctx.save(); ctx.strokeStyle = PR.techK; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, -415, 232, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore();
    [-1, 1].forEach((d) => {
      pp(pR(d * 209 - 31, -475, 62, 120, 24), PR.techK, { key: key + 'hcup' + d, sb: 10, sy: 5, tex: 0.4 });
      ctx.save(); ctx.shadowColor = PR.glow; ctx.shadowBlur = 14; ctx.strokeStyle = PR.glow; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(d * 209, -415, 16, 0, TAU); ctx.stroke(); ctx.restore();
    });
    ctx.save(); ctx.strokeStyle = PR.techK; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-215, -370); ctx.quadraticCurveTo(-200, -300, -120, -296); ctx.stroke(); ctx.restore();
    pp(pE(-112, -296, 20, 15), PR.techK, { key: key + 'hmic', sb: 4, sy: 2, tex: 0.3 });
  } else if (h === 'vr') {
    pp(pR(-206, top + 22, 412, 26, 10), PR.techK, { key: key + 'vstrap', sb: 6, sy: 3, tex: 0.35 });
    pp(pR(-150, top - 84, 300, 112, 34), '#5d6875', { key: key + 'vbox', sb: 14, sy: 7, tex: 0.4 });
    pp(pR(-130, top - 64, 260, 72, 26), '#1d3b5a', { key: key + 'vlens', shadow: false, tex: 0.25 });
    pp(pR(-110, top - 56, 120, 12, 6), 'rgba(255,255,255,0.25)', { shadow: false, tex: false });
    ctx.save(); ctx.shadowColor = PR.glow; ctx.shadowBlur = 12; ctx.fillStyle = PR.glow; ctx.beginPath(); ctx.arc(118, top - 62, 7, 0, TAU); ctx.fill(); ctx.restore();
  } else if (h === 'beanie') {
    pp(pA(0, top + 30, 200, Math.PI, TAU), '#3f5a7a', { key: key + 'bdome', sb: 14, sy: 6, tex: 0.75 });
    pp(pR(-206, top - 8, 412, 64, 24), '#33495f', { key: key + 'bcuff', sb: 8, sy: 4, tex: 0.7 });
    for (let i = -4; i <= 4; i++) pp(pR(i * 44 - 4, top - 2, 8, 52, 4), 'rgba(0,0,0,0.12)', { shadow: false, tex: false });
  } else if (h === 'drone') {
    const hy = top - 130 + Math.sin(TT * TAU * 0.9) * 10, spin = Math.max(0.15, Math.abs(Math.cos(TT * TAU * 3)));
    pp(pR(-150, hy - 6, 300, 12, 6), PR.techK, { key: key + 'darm', sb: 8, sy: 10, tex: 0.3 });
    pp(pR(-62, hy - 22, 124, 44, 16), PR.char, { key: key + 'dbody', sb: 14, sy: 24, tex: 0.35 });
    [-150, 150].forEach((rx) => { pp(pR(rx - 8, hy - 26, 16, 22, 4), PR.techK, { shadow: false, tex: false }); pp(pE(rx, hy - 28, 70 * spin, 10), 'rgba(205,225,240,0.75)', { key: key + 'drot' + rx, shadow: false, tex: false }); });
    ctx.save(); ctx.shadowColor = PR.glow; ctx.shadowBlur = 12; ctx.fillStyle = PR.glow; ctx.beginPath(); ctx.arc(0, hy, 8, 0, TAU); ctx.fill(); ctx.restore();
  } else if (h === 'mortar') {
    pp(pR(-130, top - 50, 260, 70, 8), PR.ink, { key: key + 'mcap', sb: 12, sy: 6, tex: 0.4 });
    pp(pG([[0, top - 140], [260, top - 80], [0, top - 22], [-260, top - 80]]), '#262a3a', { key: key + 'mboard', sb: 16, sy: 8, tex: 0.45 });
    const sw = Math.sin(TT * 5) * 6;
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, top - 82); ctx.quadraticCurveTo(160, top - 70, 196 + sw, top + 20); ctx.stroke(); ctx.restore();
    pp(pR(182 + sw, top + 16, 30, 62, 6), PR.mustard, { key: key + 'mtas', sb: 6, sy: 3, tex: 0.5 });
  } else if (h === 'tinfoil') {
    const P = [[-196, top + 26], [-150, top - 40], [-96, top - 66], [-44, top - 150], [0, top - 252], [42, top - 160], [102, top - 92], [150, top - 50], [196, top + 26]];
    pp(pG(P), '#d9dde2', { key: key + 'tfoil', sb: 14, sy: 7, tex: 0.6, rim: 'rgba(255,255,255,0.8)', rw: 3 });
    [[[-150, top - 40], [-44, top - 150], [-60, top + 20]], [[42, top - 160], [150, top - 50], [70, top + 10]], [[0, top - 252], [42, top - 160], [-10, top - 80]]].forEach((T, i) => pp(pG(T), i === 1 ? 'rgba(120,130,140,0.35)' : 'rgba(255,255,255,0.45)', { key: key + 'tfacet' + i, shadow: false, tex: false }));
  } else if (h === 'party') {
    withT(30, top + 10, 0.2, 1, () => {
      const w = (yy) => 115 * (1 + yy / 270);
      pp(pG([[-115, 0], [115, 0], [0, -270]]), PR.blue, { key: key + 'pcone', sb: 14, sy: 7, tex: 0.55 });
      [[-40, -80], [-150, -190]].forEach(([y0, y1], i) => pp(pG([[-w(y0), y0], [w(y0), y0], [w(y1), y1], [-w(y1), y1]]), PR.mustard, { key: key + 'pstr' + i, shadow: false, tex: 0.5 }));
      pp(pE(0, -272, 32, 32), PR.red, { key: key + 'ppom', sb: 8, sy: 4, tex: 0.5 });
    });
  }
}
// ---- props
// a gold ₫ coin of radius r
function prCoin(x, y, r, key = 'coin') {
  pp(pE(x, y, r, r), PR.mustard, { key: key + 'o', sb: 10, sy: 5, tex: 0.5 });
  pp(pE(x, y, r * 0.78, r * 0.78), PR.yellow, { key: key + 'i', shadow: false, tex: 0.45 });
  txtR('₫', x, y + r * 0.06, r * 1.05, '#a87412', { align: 'center', base: 'middle', weight: 800 });
}
// a thought bubble: a cream cloud (w x h) centred at (x, y) with a trail of dots to (tx, ty), text fitted inside; o.t pops it in at t
function prThought(x, y, w, h, tx, ty, str = '', o = {}) {
  const k = o.t != null ? popS(o.t) : 1; if (k <= 0.01) return;
  const key = o.key ?? 'th', R = RNG(key);
  [0, 1, 2].forEach((i) => { const u = 0.12 + i * 0.16, r = (12 + i * 9) * k; pp(pE(lerp(tx, x, u), lerp(ty, y, u), r, r), PR.creamL, { key: key + 'd' + i, sb: 8, sy: 4, tex: 0.4 }); });
  pp(() => {
    ctx.ellipse(x, y, w / 2 * k, h / 2 * k, 0, 0, TAU);
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU, bx = x + Math.cos(a) * w * 0.44 * k, by = y + Math.sin(a) * h * 0.42 * k, r = h * 0.24 * k * (0.85 + 0.3 * R.f()); ctx.moveTo(bx + r, by); ctx.arc(bx, by, r, 0, TAU); }
  }, PR.creamL, { key, sb: 18, sy: 9, tex: 0.5 });
  if (str && k > 0.6) txt(str, x, y + 4, fitSize(str, w * 0.75 * k, o.size ?? 54), o.color ?? PR.navy, { align: 'center', base: 'middle', weight: 800 });
}
// a therapist's couch (s = scale), the seat's top edge at y; the back rises on the right
function prCouch(x, y, s = 1, fill = '#8a4a5a', back = '#6e3a48') {
  withT(x, y, 0, s, () => {
    [-320, 320].forEach((lx) => pp(pR(lx - 14, 70, 28, 60, 6), PR.woodD, { key: 'cleg' + lx, sb: 6, sy: 3, tex: 0.4 }));
    pp(pR(-120, -210, 480, 230, 50), back, { key: 'cback', sb: 16, sy: 8, tex: 0.6 });
    pp(pR(-380, -10, 760, 96, 30), fill, { key: 'cseat', sb: 18, sy: 9, tex: 0.6 });
    pp(pR(-400, -110, 120, 190, 56), fill, { key: 'carm', sb: 14, sy: 7, tex: 0.6 });
    pp(pR(-300, -40, 160, 50, 24), PR.creamL, { key: 'cpill', sb: 8, sy: 4, tex: 0.5 });
  });
}
// an atom icon of radius r: a red nucleus and three orbits (cream by default; pass a dark orbit colour on light paper) with electrons running round them
function prAtom(x, y, r, key = 'atom', orbit = 'rgba(244,241,232,0.85)') {
  for (let i = 0; i < 3; i++) {
    const rot = i * Math.PI / 3, a = TT * TAU * 0.6 + i * TAU / 3;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.strokeStyle = orbit; ctx.lineWidth = r * 0.05; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.36, 0, 0, TAU); ctx.stroke();
    pp(pE(Math.cos(a) * r, Math.sin(a) * r * 0.36, r * 0.09, r * 0.09), PR.mustard, { key: key + 'e' + i, sb: 6, sy: 3, tex: 0.4 });
    ctx.restore();
  }
  pp(pE(x, y, r * 0.2, r * 0.2), PR.red, { key: key + 'n', sb: 10, sy: 5, tex: 0.5 });
}
// a speech bubble: a rounded cream card (w x h) centred at (x, y) with a pointed tail to (tx, ty), text fitted inside; o.t pops it in at t
function prSpeech(x, y, w, h, tx, ty, str = '', o = {}) {
  const k = o.t != null ? popS(o.t) : 1; if (k <= 0.01) return;
  withT(x, y, o.rot ?? -0.02, k, () => {
    const bx = clamp(tx - x, -w / 2 + 60, w / 2 - 60), dx = tx - x, dy = ty - y;
    pp(() => { ctx.roundRect(-w / 2, -h / 2, w, h, Math.min(48, h / 2)); ctx.moveTo(bx - 34, h / 2 - 4); ctx.lineTo(dx, dy); ctx.lineTo(bx + 34, h / 2 - 4); ctx.closePath(); }, PR.creamL, { key: o.key ?? 'sp', sb: 18, sy: 9, tex: 0.5 });
    if (str) txt(str, 0, 4, fitSize(str, w * 0.82, o.size ?? 64), o.color ?? PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });
}
// a wooden toy alphabet block (side ≈ 160 * s) with a letter on its face; colour is the letter's
function prBlock(x, y, letter, c = PR.red, s = 1, rot = 0) {
  withT(x, y, rot, s, () => {
    pp(pG([[-80, -80], [-50, -110], [110, -110], [80, -80]]), PR.woodL, { key: 'blkt' + letter, sb: 8, sy: 4, tex: 0.5 });
    pp(pG([[80, -80], [110, -110], [110, 50], [80, 80]]), PR.wood, { key: 'blks' + letter, shadow: false, tex: 0.5 });
    pp(pR(-80, -80, 160, 160, 8), '#e8c891', { key: 'blkf' + letter, sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-66, -66, 132, 132, 6), PR.creamL, { key: 'blki' + letter, shadow: false, tex: 0.4 });
    txtR(letter, 0, 6, 110, c, { align: 'center', base: 'middle', weight: 800 });
  });
}
// a circuit-board patch (w x h at x, y): seeded right-angled traces and solder nodes that pulse in turn; a background detail for tech scenes
function prCircuit(x, y, w, h, key = 'circ', c = 'rgba(79,240,255,0.4)') {
  const R = RNG(key);
  ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const nodes = [];
  for (let i = 0; i < 9; i++) {
    let px = x + R.r(0, w), py = y + R.r(0, h); ctx.beginPath(); ctx.moveTo(px, py);
    for (let j = 0; j < 3; j++) { if (j % 2) py = clamp(py + R.r(-h / 3, h / 3), y, y + h); else px = clamp(px + R.r(-w / 3, w / 3), x, x + w); ctx.lineTo(px, py); }
    ctx.stroke(); nodes.push([px, py]);
  }
  ctx.restore();
  nodes.forEach(([nx, ny], i) => {
    const lit = (Math.floor(TT * 3) + i) % 4 === 0;
    ctx.save(); if (lit) { ctx.shadowColor = PR.glow; ctx.shadowBlur = 16; }
    ctx.fillStyle = lit ? PR.glow : c; ctx.beginPath(); ctx.arc(nx, ny, 9, 0, TAU); ctx.fill(); ctx.restore();
  });
}
function prClock(x, y, r, hh, mm, key = 'clk') {
  pp(pE(x, y, r, r), PR.woodD, { key: key + 'o', sb: 14, sy: 7 });
  pp(pE(x, y, r * 0.84, r * 0.84), PR.creamL, { key: key + 'i', shadow: false, tex: 0.5 });
  const ah = (hh % 12 + mm / 60) / 12 * TAU - Math.PI / 2, am = mm / 60 * TAU - Math.PI / 2;
  ctx.save(); ctx.strokeStyle = PR.ink; ctx.lineCap = 'round'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ah) * r * 0.42, y + Math.sin(ah) * r * 0.42); ctx.stroke();
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(am) * r * 0.62, y + Math.sin(am) * r * 0.62); ctx.stroke(); ctx.restore();
}
function prBunting(y, cols = [PR.red, PR.cream, PR.blue, PR.mustard, PR.green], key = 'bun') {
  ctx.save(); ctx.strokeStyle = PR.woodD; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-20, y); ctx.quadraticCurveTo(W / 2, y + 40, W + 20, y); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 7; i++) { const x = 40 + i * 160, yy = y + 4 + Math.sin(i / 6 * Math.PI) * 26, sw = Math.sin(TT * 3 + i) * 5; pp(pG([[x, yy], [x + 120, yy + 2], [x + 60 + sw, yy + 104]]), cols[i % cols.length], { key: key + i, sb: 8, sy: 5, tex: 0.5 }); }
}
function prFolder(x, y, s, fill = PR.yellow, o = {}) {
  withT(x, y, o.rot ?? 0, s, () => {
    pp(pR(-110, -92, 96, 34, 6), fill, { key: 'fdt' + fill, sb: 6, sy: 3, tex: 0.5 });
    pp(pR(-110, -70, 220, 150, 8), fill, { key: 'fd' + fill, sb: 12, sy: 6, tex: 0.55, rim: 'rgba(255,255,255,0.3)' });
    txt(o.label ?? 'SKILL.md', -96, -76, 18, PR.ink, { weight: 800 });
    sparkIcon(0, 6, 30, o.icon ?? PR.orange, 0.1);
  });
}
function prCorkboard(x, y, w, h, key = 'cork') {
  pp(pR(x - 22, y - 22, w + 44, h + 44, 6), PR.woodD, { key: key + 'f', sb: 18, sy: 9 });
  pp(pR(x, y, w, h, 2), '#b78a55', { key: key + 'c', shadow: false, tex: 0.9 });
  const R = RNG(key); ctx.save(); ctx.fillStyle = 'rgba(70,40,15,0.35)'; for (let i = 0; i < 500; i++) { ctx.fillRect(x + R.r(0, w), y + R.r(0, h), 3, 3); } ctx.restore();
}
function prNote(x, y, w, h, fill, rot, key) { withT(x, y, rot, 1, () => { pp(pR(-w / 2, -h / 2, w, h, 3), fill, { key, sb: 8, sy: 4, tex: 0.5 }); ctx.save(); ctx.strokeStyle = 'rgba(40,40,60,0.35)'; ctx.lineWidth = 3; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-w / 2 + 16, -h / 2 + i * h / 5.2); ctx.lineTo(w / 2 - 16, -h / 2 + i * h / 5.2); ctx.stroke(); } ctx.restore(); }); }
function prStar(x, y, r, c = PR.mustard) { ctx.save(); ctx.fillStyle = c; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.restore(); }
// chalk text written on (frac 0..1) with a soft chalk dust
function chalk(str, x, y, size, frac = 1, o = {}) {
  txt(str, x, y, size, o.color ?? 'rgba(244,244,236,0.92)', { font: F_CHALK, weight: 400, frac, align: o.align });
}
function chalkLine(P, frac, o = {}) {
  const S = subPath(P, clamp(frac)); if (S.length < 2) return;
  ctx.save(); ctx.strokeStyle = o.color ?? 'rgba(244,244,236,0.9)'; ctx.lineWidth = o.w ?? 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash(o.dash ?? []);
  ctx.beginPath(); ctx.moveTo(S[0][0], S[0][1]); for (const p of S) ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore();
}


// =====================================================================
//  COMPONENTS — ready-made scene parts (all in world = screen coords, 1080x1920)
// =====================================================================
// props for clawd({ hold }): a pointer stick (angle a, length len) and a pencil
const propStick = (a, len = 360) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => { pp(pR(-10, -len, 20, len, 8), PR.char, { key: 'stick', sb: 8, sy: 4, tex: 0.3 }); pp(pR(-12, -len - 6, 24, 70, 8), PR.orange, { key: 'sticktip', shadow: false, tex: 0.4 }); pp(pR(-12, -len + 64, 24, 18, 2), PR.creamL, { shadow: false, tex: false }); }); };
const propPencil = (a) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => { pp(pR(-14, -230, 28, 200, 3), PR.yellow, { key: 'pcl', sb: 6, sy: 3, tex: 0.4 }); pp(pG([[-14, -30], [14, -30], [0, 10]]), PR.tan, { shadow: false, tex: 0.4 }); pp(pR(-14, -250, 28, 26, 4), PR.pink, { shadow: false, tex: 0.4 }); }); };
// money props for piggy({ hold }) (any mascot can hold them): a coin pinched in front of the trotter, a banknote, a calculator (angle a)
const propCoin = (r = 54) => (hx, hy, behind) => { if (!behind) prCoin(hx, hy - r * 0.8, r, 'pcoin'); };
const propBill = (a = -0.2) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-50, -150, 260, 128, 8), '#8fc28a', { key: 'bill', sb: 10, sy: 5, tex: 0.5 });
  pp(pR(-36, -136, 232, 100, 5), '#a9d6a0', { key: 'billi', shadow: false, tex: 0.45 });
  pp(pE(162, -86, 26, 32), PR.moneyD, { key: 'billp', shadow: false, tex: 0.4 });
  txtR('500.000₫', -26, -74, 24, PR.moneyK, { weight: 800 });
}); };
const propCalc = (a = 0) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-66, -230, 140, 210, 16), PR.char, { key: 'calc', sb: 12, sy: 6, tex: 0.35 });
  pp(pR(-50, -214, 108, 50, 6), '#b9d8a8', { key: 'calcs', shadow: false, tex: 0.3 });
  txtR('1.000', 50, -178, 28, PR.ink, { align: 'right', weight: 700, font: F_MONO });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) pp(pR(-48 + c * 36, -150 + r * 36, 28, 26, 5), c === 2 && r === 2 ? PR.orange : PR.creamL, { key: 'cb' + r + c, shadow: false, tex: 0.3 });
}); };
// psychology props for brainy({ hold }) (any mascot can hold them): a therapist's notebook and a magnifying glass (angle a)
const propNotebook = (a = -0.15) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-70, -240, 170, 220, 10), PR.wood, { key: 'nb', sb: 12, sy: 6, tex: 0.5 });
  pp(pR(-56, -222, 142, 192, 4), PR.paperW, { key: 'nbp', shadow: false, tex: 0.35 });
  pp(pR(-22, -252, 74, 28, 6), PR.greyD, { key: 'nbclip', sb: 4, sy: 2, tex: 0.3 });
  ctx.save(); ctx.strokeStyle = 'rgba(70,90,150,0.45)'; ctx.lineWidth = 4;
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-40, -186 + i * 32); ctx.lineTo(70, -186 + i * 32); ctx.stroke(); }
  ctx.restore();
}); };
const propGlass = (a = -0.6) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-14, -150, 28, 150, 10), PR.brown, { key: 'mgh', sb: 8, sy: 4, tex: 0.4 });
  pp(pE(0, -230, 86, 86), PR.char, { key: 'mgr', sb: 12, sy: 6, tex: 0.35 });
  pp(pE(0, -230, 68, 68), 'rgba(190,225,240,0.75)', { key: 'mgl', shadow: false, tex: 0.2 });
  pp(pE(-22, -254, 18, 12, -0.6), 'rgba(255,255,255,0.7)', { shadow: false, tex: false });
}); };
// science props for flasky({ hold }) (any mascot can hold them): a test tube with a green liquid and a horseshoe magnet (angle a)
const propTube = (a = -0.2) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-22, -230, 44, 220, 22), PR.glass, { key: 'tube', sb: 8, sy: 4, tex: 0.35, rim: 'rgba(255,255,255,0.7)', rw: 3 });
  pp(pR(-16, -120, 32, 104, 16), PR.green, { key: 'tubel', shadow: false, tex: 0.45 });
  pp(pR(-30, -238, 60, 16, 6), PR.glassD, { key: 'tuber', sb: 4, sy: 2, tex: 0.35 });
}); };
const propMagnet = (a = 0) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  ctx.save(); ctx.shadowColor = 'rgba(12,10,8,0.3)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 5;
  ctx.strokeStyle = PR.red; ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(-70, -230); ctx.lineTo(-70, -110); ctx.arc(0, -110, 70, Math.PI, 0, true); ctx.lineTo(70, -230); ctx.stroke(); ctx.restore();
  [-70, 70].forEach((mx) => pp(pR(mx - 23, -262, 46, 40, 3), PR.creamL, { key: 'mag' + mx, shadow: false, tex: 0.35 }));
}); };
// English props for polly({ hold }) (any mascot can hold them): a letter flash card and an ABC book (angle a)
const propCard = (letter = 'A', a = -0.15, c = PR.red) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-70, -236, 150, 196, 14), PR.paperW, { key: 'card' + letter, sb: 12, sy: 6, tex: 0.4 });
  pp(pR(-58, -224, 126, 172, 10), PR.creamL, { key: 'cardi' + letter, shadow: false, tex: 0.35 });
  txtR(letter, 5, -134, 124, c, { align: 'center', base: 'middle', weight: 800 });
}); };
const propBook = (a = -0.1) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-84, -212, 184, 150, 10), PR.paperW, { key: 'bookp', sb: 12, sy: 6, tex: 0.35 });
  pp(pR(-96, -224, 184, 150, 10), PR.red, { key: 'bookc', sb: 6, sy: 3, tex: 0.5 });
  pp(pR(-96, -224, 26, 150, 6), PR.redD, { key: 'bookspine', shadow: false, tex: 0.45 });
  txtR('ABC', 10, -146, 56, PR.paperW, { align: 'center', base: 'middle', weight: 800 });
}); };
// tech props for botty({ hold }) (any mascot can hold them): a smartphone, an AI chip and a wrench (angle a)
const propPhone = (a = -0.15) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-52, -236, 104, 196, 18), PR.char, { key: 'phone', sb: 12, sy: 6, tex: 0.35 });
  pp(pR(-42, -222, 84, 160, 10), '#1d3b5a', { key: 'phones', shadow: false, tex: 0.25 });
  [[-26, -200], [6, -200], [-26, -168], [6, -168]].forEach(([ix, iy], i) => pp(pR(ix, iy, 22, 22, 6), [PR.glow, PR.yellow, PR.pink, PR.green][i], { shadow: false, tex: false }));
  pp(pR(-14, -54, 28, 6, 3), PR.techD, { shadow: false, tex: false });
}); };
const propChip = (a = -0.1) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  for (let i = 0; i < 4; i++) [-1, 1].forEach((d) => { pp(pR(-50 + i * 30, d < 0 ? -226 : -96, 12, 26, 3), PR.mustard, { shadow: false, tex: 0.3 }); pp(pR(d < 0 ? -86 : 60, -190 + i * 30, 26, 12, 3), PR.mustard, { shadow: false, tex: 0.3 }); });
  pp(pR(-62, -210, 124, 124, 12), '#2b2f36', { key: 'chip', sb: 12, sy: 6, tex: 0.35 });
  ctx.save(); ctx.shadowColor = PR.glow; ctx.shadowBlur = 14; txtR('AI', 0, -146, 58, PR.glow, { align: 'center', base: 'middle', weight: 800 }); ctx.restore();
}); };
const propWrench = (a = -0.4) => (hx, hy, behind) => { if (!behind) return; withT(hx, hy, a, 1, () => {
  pp(pR(-14, -200, 28, 200, 12), PR.techK, { key: 'wrh', sb: 8, sy: 4, tex: 0.4 });
  pp(() => { ctx.arc(0, -226, 44, 0, TAU); ctx.moveTo(22, -262); ctx.arc(0, -262, 22, 0, TAU, true); }, PR.techK, { key: 'wrhead', sb: 8, sy: 4, tex: 0.4 });
}); };
// a framed blackboard with a chalk tray; draw on it afterwards with chalk() / chalkLine()
function prBoard(x, y, w, h, key = 'board') {
  pp(pR(x, y, w, h, 10), PR.woodD, { key: key + 'f', sb: 20, sy: 10 });
  pp(pR(x + 24, y + 24, w - 48, h - 48, 4), PR.board, { key: key + 'b', shadow: false, tex: 0.8 });
  pp(pR(x + 10, y + h - 6, w - 20, 26, 4), PR.woodL, { key: key + 't', sb: 8, sy: 5 });
  pp(pR(x + 90, y + h - 18, 46, 14, 4), PR.creamL, { shadow: false, tex: false });
}
// a green tick badge / a red cross badge that pop in at t
function prCheck(x, y, t, r = 66) { if (TT < t) return; withT(x, y, 0.1, popS(t), () => { pp(pE(0, 0, r, r), PR.green, { key: 'tick' + x, sb: 12, sy: 6 }); ctx.save(); ctx.strokeStyle = PR.creamL; ctx.lineWidth = r * 0.24; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-r * 0.42, 0); ctx.lineTo(-r * 0.09, r * 0.38); ctx.lineTo(r * 0.48, -r * 0.33); ctx.stroke(); ctx.restore(); }); }
function prCross(x, y, t, r = 66) { if (TT < t) return; withT(x, y, -0.1, popS(t), () => { pp(pE(0, 0, r, r), PR.red, { key: 'cross' + x, sb: 12, sy: 6 }); ctx.save(); ctx.strokeStyle = PR.creamL; ctx.lineWidth = r * 0.24; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-r * 0.36, -r * 0.36); ctx.lineTo(r * 0.36, r * 0.36); ctx.moveTo(r * 0.36, -r * 0.36); ctx.lineTo(-r * 0.36, r * 0.36); ctx.stroke(); ctx.restore(); }); }
// a dark checklist panel (like a scanner screen): items tick off one by one from t0, every dt seconds
function prChecklist(x, y, w, title, items, t0, dt = 0.3) {
  pp(pR(x, y, w, 120 + items.length * 96, 14), PR.char, { key: 'cl' + title, sb: 18, sy: 9, tex: 0.35 });
  txt(title, x + 36, y + 66, 30, PR.green, { weight: 800 });
  items.forEach((it, i) => { const yy = y + 100 + i * 96; pp(pR(x + 30, yy, w - 60, 78, 8), '#2c3a33', { key: 'cli' + i + title, shadow: false, tex: 0.3 }); txt(it, x + 56, yy + 50, 30, '#eef2ea', { weight: 700 }); if (TT >= t0 + i * dt) { ctx.save(); ctx.strokeStyle = PR.green; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + w - 104, yy + 40); ctx.lineTo(x + w - 86, yy + 58); ctx.lineTo(x + w - 54, yy + 22); ctx.stroke(); ctx.restore(); } });
}
// a GitHub repo card: owner/name, a subtitle, a star count that runs to `stars` between ta and tb
function prRepoCard(x, y, repo, sub, stars, ta, tb, o = {}) {
  withT(x, y, 0, o.s ?? 1, () => {
    pp(pR(-330, -210, 660, 420, 14), PR.paperW, { key: 'gh', sb: 22, sy: 12 });
    pp(pR(-330, -210, 660, 90, 14), PR.char, { key: 'ghh', shadow: false, tex: 0.4 });
    pp(pE(-280, -165, 26, 26), PR.creamL, { shadow: false, tex: false }); pp(pE(-280, -160, 15, 17), PR.char, { shadow: false, tex: false });
    txt(o.head ?? 'open source on GitHub', -240, -150, 34, PR.creamL, { weight: 700 });
    sparkIcon(-282, -68, 18); txt(repo, -250, -56, fitSize(repo, 560, 32), PR.ink, { weight: 800 });
    txt(sub, -300, -6, 26, PR.greyD, { weight: 600 });
    const n = countUp(ta, Math.max(0.6, tb - ta), 0, stars); prStar(-250, 120, 46);
    txt(n >= stars ? (o.label ?? stars + '+') : String(n), -186, 156, 104, PR.ink, { weight: 800 }); txt('stars', 300, 170, 26, PR.greyD, { weight: 600, align: 'right' });
  });
  if (TT > ta) { const R = RNG('st' + repo); for (let i = 0; i < 8; i++) { const a = R.r(0, TAU), d = 360 + 60 * Math.sin(TT * 3 + i); prStar(x + Math.cos(a) * d * 0.95, y + 20 + Math.sin(a) * d * 0.6, 16 + 6 * Math.sin(TT * 6 + i)); } }
}
// an Instagram-style comment box that types `word` from t (then a send button); returns nothing
function prCommentBox(x, y, word, t, o = {}) {
  const k = Math.floor(word.length * ev(t, 0.45));
  withT(x, y, 0, o.s ?? 1, () => {
    pp(pR(-380, -60, 760, 120, 60), PR.paperW, { key: 'cbox', sb: 16, sy: 8, tex: 0.4 });
    if (k === 0) txt('Add a comment...', -330, 14, 38, PR.grey, { weight: 600 }); else txt(word.slice(0, k), -330, 18, 52, PR.ink, { weight: 800 });
    pp(pE(318, 0, 40, 40), PR.blue, { key: 'send', shadow: false, tex: 0.3 }); pp(pG([[304, -18], [334, 0], [304, 18]]), PR.paperW, { shadow: false, tex: false });
  });
}
// a receipt with rows [[label, value], ...] and a total
function prReceipt(x, y, rows, total, o = {}) {
  withT(x, y, o.rot ?? 0.06, o.s ?? 1, () => {
    const h = 120 + rows.length * 52;
    pp(pG([[-150, -h / 2 - 40], [150, -h / 2 - 40], [150, h / 2], [120, h / 2 + 15], [90, h / 2], [60, h / 2 + 15], [30, h / 2], [0, h / 2 + 15], [-30, h / 2], [-60, h / 2 + 15], [-90, h / 2], [-120, h / 2 + 15], [-150, h / 2]]), PR.paperW, { key: 'rcpt', sb: 14, sy: 7 });
    rows.forEach(([a, b], i) => { txt(a, -126, -h / 2 + 20 + i * 52, 28, PR.ink, { weight: 600, font: F_MONO }); txt(b, 126, -h / 2 + 20 + i * 52, 28, PR.ink, { weight: 700, font: F_MONO, align: 'right' }); });
    ctx.fillStyle = PR.ink; ctx.fillRect(-126, h / 2 - 90, 252, 3); txt('TOTAL', -126, h / 2 - 36, 30, PR.ink, { weight: 800, font: F_MONO }); txt(total, 126, h / 2 - 36, 30, PR.green, { weight: 800, font: F_MONO, align: 'right' });
  });
}

// =====================================================================
//  STYLE hooks (kit/morph.js). This look cuts hard between scenes (one per spoken line), so the bridge hooks are plain.
// =====================================================================
const STYLE = {
  name: 'paper-reel',
  paper: '#e9e5da',
  backdrop(c) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = c; ctx.fillRect(0, 0, W, H); ctx.restore(); },
  window(P, key, src) { ctx.save(); trace(P, true); ctx.clip(); ctx.drawImage(src, 0, 0); ctx.restore(); },
  blob(P, c, key) { pp(() => trace(P, true), c, { key }); },
  hero(x, y, r) { clawd(x, y + r * 0.4, { s: r / 300, key: 'herobr' }); },
  heroColor: PR.clawd,
  post() {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = 0.35; ctx.drawImage(prTex(), -200, -300);
    ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 1;
    const g = ctx.createRadialGradient(W / 2, H * 0.45, H * 0.3, W / 2, H * 0.5, H * 0.8); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(150,140,130,1)');
    ctx.globalAlpha = 0.35; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.restore();
  },
  ones: true,
};
