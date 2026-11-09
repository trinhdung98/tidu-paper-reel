  // SCORE BODY — calm contemplative lo-fi bed in D minor; softer than money/math channels
  const BPMs = 88, BT = 60 / BPMs, END = DURATION;
  const prog = [['D3', 'F3', 'A3'], ['C3', 'E3', 'G3'], ['Bb2', 'D3', 'F3'], ['A2', 'C3', 'E3']];
  const oct = (n, d) => n.replace(/-?\d/, (x) => String(+x + d));
  to = 'm';
  for (let bar = 0; bar * 4 * BT < END; bar++) {
    const t = bar * 4 * BT, ch = prog[bar % 4];
    pad(t, Math.min(END + 0.2, t + 4 * BT + 0.05), ch, 0.018, { type: 'triangle', cut: 900, att: 0.12, rel: 0.18, send: 0.35 });
    bass(t, nz(oct(ch[0], -1)), 0.18); bass(t + 2 * BT, nz(oct(ch[0], -1)), 0.12);
    for (let k = 0; k < 8; k++) { const tk = t + k * BT / 2; if (tk > END) break; pluck(tk, nz(oct(ch[k % 3], 2)), k % 2 ? 0.035 : 0.055, 0, 0.18, 2200, 0.18); }
    for (let b = 0; b < 4; b++) { const tb = t + b * BT; if (tb > END) break; if (b % 2 === 0) sub(tb, 0.12); noiseHit(tb + BT / 2, 0.025, 'highpass', 6000, 0.6, 0.04); }
  }
  to = 's';
  for (const [t0] of SHOT_LIST.slice(1)) sweep(t0 - 0.16, t0, 0.02, 700, 3800, 0);
  for (const e of SFX_CUES()) {
    if (e.k === 'type') for (let i = 0; i < e.n; i++) noiseHit(e.t + e.d * i / e.n, 0.018, 'bandpass', 3800 + (i % 3) * 600, 2, 0.06);
    if (e.k === 'tick') blip(e.t, 1100, 1600, 0.05, 0.07);
    if (e.k === 'pop') blip(e.t, 600, 1300, 0.09, 0.09);
    if (e.k === 'thud') { sub(e.t, 0.35); noiseHit(e.t, 0.09, 'lowpass', 1600, 0.8, 0.22); }
    if (e.k === 'chime') chime(e.t, [nz('D5'), nz('F5'), nz('A5')], 0.09);
  }
