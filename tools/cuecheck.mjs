#!/usr/bin/env node
// Static checks reel check cannot see: every VW('line', 'word', n) in src/scenes.js hits a real spoken word (VW silently
// falls back to the line start, so a typo pops the prop at the cut), and every PR.<colour> used exists in the kit
// (an undefined fill silently reuses the previous colour).
//   usage: node tools/cuecheck.mjs pieces/<name>
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const piece = process.argv[2];
if (!piece) { console.error('usage: node tools/cuecheck.mjs pieces/<name>'); process.exit(2); }
const V = JSON.parse(fs.readFileSync(path.join(piece, 'voice.json'), 'utf8'));
const src = fs.readFileSync(path.join(piece, 'src', 'scenes.js'), 'utf8');
const kit = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'styles', 'paper-reel', 'kit.js'), 'utf8');
const nw = (s) => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}']/gu, '');
const STR = String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`, unq = (s) => s.slice(1, -1).replace(/\\(.)/g, '$1');
let bad = 0, n = 0;
for (const m of src.matchAll(new RegExp(String.raw`VW\(\s*(${STR})\s*,\s*(${STR})\s*(?:,\s*(\d+))?\s*\)`, 'g'))) {
  n++;
  const id = unq(m[1]), word = unq(m[2]), L = V.lines.find((l) => l.id === id);
  const hits = L ? L.words.filter((w) => nw(w.w) === nw(word)) : [];
  if (!L || hits.length <= Number(m[3] ?? 0)) { bad++; console.log(`MISS ${m[0]}  words: ${L ? L.words.map((w) => w.w).join(' ') : '(no such line)'}`); }
}
const dynamic = [...src.matchAll(/VW\((?!id, w, n\))/g)].length - n;
const prBody = kit.slice(kit.indexOf('const PR = {'), kit.indexOf('};', kit.indexOf('const PR = {')));
const keys = new Set([...prBody.matchAll(/(\w+):\s*'/g)].map((m) => m[1]));
const missing = [...new Set([...src.matchAll(/\bPR\.(\w+)/g)].map((m) => m[1]))].filter((k) => !keys.has(k));
missing.forEach((k) => console.log(`MISS PR.${k} is not a kit colour`));
console.log(`cuecheck: ${n - bad}/${n} VW cues hit a word${dynamic ? ` (${dynamic} VW calls with variable arguments not checked: verify their words by hand)` : ''}; ${missing.length} unknown PR colours`);
process.exitCode = bad || missing.length ? 1 : 0;
