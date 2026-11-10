#!/usr/bin/env node
// Review sheets: for every voice line, one PNG with 5 frames — the cut, mid-line, line end, mid-pause, end of pause —
// so a review sees whether the hero is there at the cut and whether a pause has anything to do.
//   usage: node tools/linesheets.mjs pieces/<name> [out-dir] [--scale 0.34]   (build the piece first; out-dir defaults to $TMPDIR/linesheets/<name>)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2), si = args.indexOf('--scale'), scale = si >= 0 ? args.splice(si, 2)[1] : '0.34';
const [piece, outDir = path.join(os.tmpdir(), 'linesheets', path.basename(path.resolve(piece ?? '')))] = args;
if (!piece) { console.error('usage: node tools/linesheets.mjs pieces/<name> [out-dir] [--scale 0.34]'); process.exit(2); }
const still = path.join(path.dirname(fileURLToPath(import.meta.url)), 'still.mjs');
const V = JSON.parse(fs.readFileSync(path.join(piece, 'voice.json'), 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
V.lines.forEach((l, i) => {
  const next = i + 1 < V.lines.length ? V.lines[i + 1].t0 : V.duration;
  const ts = [i === 0 ? 0 : l.t0 + 0.05, (l.t0 + l.t1) / 2, l.t1 + 0.1, (l.t1 + next) / 2, next - 0.2].map((t) => Math.max(0, +t.toFixed(2)));
  const out = path.join(outDir, `${String(i + 1).padStart(2, '0')}-${l.id}.png`);
  execFileSync('node', [still, piece, ts.join(','), out, '--scale', scale], { stdio: 'inherit' });
});
