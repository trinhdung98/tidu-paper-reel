  to = 's';
  for (const e of SFX_CUES()) {
    if (e.k === 'tick') blip(e.t, 1300, 1700, 0.04, 0.035);
    if (e.k === 'pop') blip(e.t, 700, 1400, 0.08, 0.045);
    if (e.k === 'chime') chime(e.t, [nz('D5'), nz('Fs5'), nz('A5')], 0.06);
  }
