#!/usr/bin/env node
// ElevenLabs voice: one take per script line, with the API's own character timestamps turned into word times.
//   usage: node tools/eleven_lines.mjs <piece> [--voice <voice_id>] [--model eleven_v4] [--only id1,id2]
// The key comes from ELEVENLABS_API_KEY or a .env file in the piece's folder or any folder above it (never printed).
// Settings live in voice/script.json "eleven": { voice_id, model_id, language_code, voice_settings }; --voice / --model
// overwrite them there so a rerun of one line keeps the same voice. Writes voice/<id>.mp3 (sets "file" on the line) and
// voice/<id>.mp3.words.json ([{ w, t0, t1 }] from the start of the take); tools/voice.mjs places those words on the timeline.
import fs from 'node:fs';
import path from 'node:path';
import { elevenKey } from './eleven_key.mjs';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
if (!argv[0] || argv[0].startsWith('--')) { console.error('usage: node tools/eleven_lines.mjs <piece> [--voice <voice_id>] [--model eleven_v4] [--only id1,id2]'); process.exit(2); }
const ROOT = path.resolve(argv[0]), VDIR = path.join(ROOT, 'voice'), SP = path.join(VDIR, 'script.json');
const S = JSON.parse(fs.readFileSync(SP, 'utf8'));

const KEY = elevenKey(ROOT);
if (!KEY) { console.error('no ELEVENLABS_API_KEY in the environment or a .env above the piece'); process.exit(1); }

const E = (S.eleven ??= {});
if (opt('--voice')) E.voice_id = opt('--voice');
if (opt('--model')) E.model_id = opt('--model');
E.model_id ??= 'eleven_v4';
if (S.lang && S.lang !== 'en') E.language_code ??= S.lang;
if (!E.voice_id) { console.error('no voice: pass --voice <voice_id> (saved to script.json "eleven.voice_id")'); process.exit(2); }

// the API's characters -> words split on whitespace, each word from its first character's start to its last one's end
function words(al) {
  const out = []; let cur = null;
  al.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) { cur = null; return; }
    if (!cur) out.push(cur = { w: '', t0: al.character_start_times_seconds[i] });
    cur.w += ch; cur.t1 = al.character_end_times_seconds[i];
  });
  return out.map((w) => ({ w: w.w, t0: +w.t0.toFixed(3), t1: +w.t1.toFixed(3) }));
}

const only = opt('--only', '');
for (const L of S.lines) {
  if (L.id === 'voice') { console.error('a line id cannot be "voice" (voice/voice.wav is the assembled track); rename it'); process.exit(1); }
  if (only && !only.split(',').includes(L.id)) continue;
  const text = L.say ?? L.text;
  const body = { text, model_id: L.model_id ?? E.model_id, ...(E.language_code ? { language_code: E.language_code } : {}), ...(E.voice_settings || L.voice_settings ? { voice_settings: { ...E.voice_settings, ...L.voice_settings } } : {}) };
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${L.voice_id ?? E.voice_id}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) { console.error(`${L.id}: ElevenLabs ${res.status} ${(await res.text()).slice(0, 400)}`); process.exit(1); }
  const J = await res.json();
  fs.writeFileSync(path.join(VDIR, `${L.id}.mp3`), Buffer.from(J.audio_base64, 'base64'));
  const W = words(J.alignment);
  fs.writeFileSync(path.join(VDIR, `${L.id}.mp3.words.json`), JSON.stringify(W));
  L.file = `${L.id}.mp3`;
  const d = W.length ? W[W.length - 1].t1 : 0;
  console.log(`${L.id}: ${d.toFixed(2)}s  ${(W.length / (d || 1)).toFixed(2)} w/s  ${text.length} chars`);
}
fs.writeFileSync(SP, JSON.stringify(S, null, 1));
