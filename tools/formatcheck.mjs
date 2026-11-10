#!/usr/bin/env node
// Check a narrative-format piece against its format: beats in stage order, script = narrative lines, timing, quiz pause.
//   node tools/formatcheck.mjs <piece> [--require-voice]
// --require-voice: publication check; needs the real voice (voice.json measured, not a preview, and voice.wav).
// Exits 1 on errors. Legacy pieces (no piece.json narrativeFormat) pass with a note.
import fs from 'node:fs';
import path from 'node:path';
import { validateFormatPiece } from './formats.mjs';

const USAGE = 'usage: node tools/formatcheck.mjs <piece> [--require-voice]';
const args = process.argv.slice(2), flags = args.filter((a) => a.startsWith('-')), pos = args.filter((a) => !a.startsWith('-'));
const bad = flags.find((f) => f !== '--require-voice');
if (bad || pos.length !== 1) { console.error(bad ? `unknown option ${bad}\n${USAGE}` : USAGE); process.exit(2); }
const root = pos[0], requireVoice = flags.includes('--require-voice');

const { errors, warnings } = validateFormatPiece(root, { requireVoice });
let fmt;
try { fmt = JSON.parse(fs.readFileSync(path.join(root, 'piece.json'), 'utf8')).narrativeFormat; } catch { fmt = undefined; }
if (!errors.length && fmt === undefined) { console.log(`${root}: legacy piece (no narrativeFormat), nothing to check`); process.exit(0); }
for (const e of errors) console.log(`  error    ${e}`);
for (const w of warnings) console.log(`  warning  ${w}`);
console.log(`${root} (${fmt ?? '?'}${requireVoice ? ', publication' : ''}): ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
