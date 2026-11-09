#!/usr/bin/env node
// Word times for any take (VieNeu, Kokoro, a recording) from ElevenLabs Forced Alignment: the take plus its line's text in,
// each word's start and end out. Works on the free plan and for Vietnamese, where whisper.cpp's own timestamps drift.
//   usage: node tools/eleven_align.mjs <piece> [--only id1,id2]
// Writes voice/<take>.words.json next to every take that has none (or an older one); tools/voice.mjs uses it.
// Without ELEVENLABS_API_KEY (environment or a .env above the piece) it changes nothing and says so.
import fs from 'node:fs';
import path from 'node:path';
import { elevenKey } from './eleven_key.mjs';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
if (!argv[0] || argv[0].startsWith('--')) { console.error('usage: node tools/eleven_align.mjs <piece> [--only id1,id2]'); process.exit(2); }
const ROOT = path.resolve(argv[0]), VDIR = path.join(ROOT, 'voice');
const S = JSON.parse(fs.readFileSync(path.join(VDIR, 'script.json'), 'utf8'));
const KEY = elevenKey(ROOT);
if (!KEY) { console.warn('eleven_align: no ELEVENLABS_API_KEY, so word times stay estimated'); process.exit(0); }

const only = opt('--only', '');
for (const L of S.lines) {
  if (only && !only.split(',').includes(L.id)) continue;
  const take = path.join(VDIR, L.file ?? `${L.id}.wav`), out = take + '.words.json';
  if (!fs.existsSync(take)) { console.warn(`${L.id}: no take at ${path.relative(ROOT, take)}`); continue; }
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(take).mtimeMs) continue;
  const form = new FormData();
  form.append('file', new Blob([fs.readFileSync(take)]), path.basename(take));
  form.append('text', L.say ?? L.text);
  const res = await fetch('https://api.elevenlabs.io/v1/forced-alignment', { method: 'POST', headers: { 'xi-api-key': KEY }, body: form });
  if (!res.ok) { console.error(`${L.id}: ElevenLabs forced alignment ${res.status} ${(await res.text()).slice(0, 400)}`); process.exit(1); }
  const W = (await res.json()).words.filter((w) => w.text.trim()).map((w) => ({ w: w.text.trim(), t0: +w.start.toFixed(3), t1: +w.end.toFixed(3) }));
  fs.writeFileSync(out, JSON.stringify(W));
  console.log(`${L.id}: ${W.length} words aligned`);
}
