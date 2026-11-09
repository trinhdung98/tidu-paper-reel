  // SCORE BODY — curious astronomy/science lo-fi bed + SFX
  const BPMs = 92, BT = 60 / BPMs, END = DURATION;
  const prog = [['C3', 'E3', 'G3'], ['A2', 'C3', 'E3'], ['F2', 'A2', 'C3'], ['G2', 'B2', 'D3']];
  const oct = (n, d) => n.replace(/-?\d/, (x) => String(+x + d));
  to = 'm';
  for (let bar = 0; bar * 4 * BT < END; bar++) {
    const t = bar * 4 * BT, ch = prog[bar % 4];
    pad(t, Math.min(END + 0.2, t + 4 * BT + 0.05), ch, 0.020, { type: 'sine', cut: 1200, att: 0.12, rel: 0.18, send: 0.35 });
    bass(t, nz(oct(ch[0], -1)), 0.20); bass(t + 2 * BT, nz(oct(ch[0], -1)), 0.14);
    for (let k = 0; k < 8; k++) {
      const tk = t + k * BT / 2; if (tk > END) break;
      pluck(tk, nz(oct(ch[k % 3], 2)), k % 2 ? 0.040 : 0.065, 0, 0.20, 2800, 0.20);
    }
    for (let b = 0; b < 4; b++) {
      const tb = t + b * BT; if (tb > END) break;
      if (b % 2 === 0) sub(tb, 0.14);
      noiseHit(tb + BT / 2, 0.025, 'highpass', 6500, 0.65, 0.04);
    }
  }
  to = 's';
  for (const [t0] of SHOT_LIST.slice(1)) sweep(t0 - 0.16, t0, 0.02, 800, 4000, 0);      // whoosh into every cut
  for (const e of SFX_CUES()) {                                                         // cues from src/scenes.js
    if (e.k === 'type') for (let i = 0; i < e.n; i++) noiseHit(e.t + e.d * i / e.n, 0.018, 'bandpass', 3800 + (i % 3) * 600, 2, 0.06);
    if (e.k === 'tick') blip(e.t, 1200, 1700, 0.05, 0.07);
    if (e.k === 'pop') blip(e.t, 650, 1350, 0.10, 0.09);
    if (e.k === 'thud') { sub(e.t, 0.35); noiseHit(e.t, 0.09, 'lowpass', 1600, 0.8, 0.22); }
    if (e.k === 'chime') chime(e.t, [nz('C5'), nz('E5'), nz('G5')], 0.10);
  }
