#!/usr/bin/env node
// Start a piece.
//   node tools/new.mjs <piece-dir>                  the starter (templates/starter)
//   node tools/new.mjs <piece-dir> --from khan-skill a worked example (examples/<name>)
//   node tools/new.mjs <piece-dir> --format F05      a narrative format (templates/formats + formats/F05.json's example):
//                                                    piece.json narrativeFormat, narrative.json beats, voice/script.json lines
// Never touches an existing <piece-dir>; bad options are refused before anything is written.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFormat, normalizeFormatId } from './formats.mjs';

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const USAGE = 'usage: reel new <piece-dir> [--from <example> | --format Fxx]';
const fail = (msg, code = 1) => { console.error(msg); process.exit(code); };

const args = process.argv.slice(2);
let dest, from, format;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--from' || a === '--format') {
    const v = args[++i];
    if (!v || v.startsWith('--')) fail(`${a} needs a value\n${USAGE}`, 2);
    if (a === '--from') { if (from !== undefined) fail(`--from given twice\n${USAGE}`, 2); from = v; }
    else { if (format !== undefined) fail(`--format given twice\n${USAGE}`, 2); format = v; }
  } else if (a.startsWith('-')) fail(`unknown option ${a}\n${USAGE}`, 2);
  else if (dest === undefined) dest = a;
  else fail(`unexpected argument ${a}\n${USAGE}`, 2);
}
if (!dest) fail(USAGE, 2);
if (from !== undefined && format !== undefined) fail(`use either --from or --format, not both\n${USAGE}`, 2);

let F = null, src;
if (format !== undefined) {
  try { F = loadFormat(format); } catch (e) { fail(e.message, 2); }
  src = path.join(SKILL, 'templates', 'formats');
} else if (from !== undefined) {
  if (!/^[A-Za-z0-9][\w.-]*$/.test(from) || !fs.existsSync(path.join(SKILL, 'examples', from))) {
    fail(`unknown example "${from}"; examples: ${fs.readdirSync(path.join(SKILL, 'examples')).filter((n) => !n.startsWith('.')).join(', ')}`, 2);
  }
  src = path.join(SKILL, 'examples', from);
} else src = path.join(SKILL, 'templates', 'starter');
if (!fs.existsSync(src)) fail(`missing template ${path.relative(SKILL, src)}`);
const DEST = path.resolve(dest);
if (fs.existsSync(DEST)) fail(`${dest} already exists`);

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.cpSync(src, DEST, { recursive: true, errorOnExist: true, force: false });

if (F) {
  try {
    const ID = normalizeFormatId(F.id), ex = F.example;
    const readJ = (p, d) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : d);
    const metaFile = path.join(DEST, 'piece.json'), scriptFile = path.join(DEST, 'voice', 'script.json');
    const meta = readJ(metaFile, {});
    const { lines: _, ...scriptDefaults } = readJ(scriptFile, {});
    // the format scenes replace src/scenes.js in the standard part order, so no custom part list
    delete meta.build; delete meta.scenes;
    Object.assign(meta, {
      name: path.basename(DEST),
      title: ex.title,
      narrativeFormat: ID,
      storyFormat: `${ID} ${F.name}: ${F.stages.map((s) => s.id).join(' -> ')}`,
    });
    const beats = ex.beats.map((b) => ({ ...b, lines: b.lines.map((L) => ({ ...L })), visual: structuredClone(b.visual) }));
    const script = { lead: 0.3, tail: 1.2, ...scriptDefaults, lang: 'vi', lines: beats.flatMap((b) => b.lines.map(({ id, text, after }) => ({ id, text, after }))) };
    fs.mkdirSync(path.dirname(scriptFile), { recursive: true });
    fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2) + '\n');
    fs.writeFileSync(path.join(DEST, 'narrative.json'), JSON.stringify({ format: ID, title: ex.title, channel: ex.channel, ...(ex.fictional === undefined ? {} : { fictional:ex.fictional }), beats }, null, 1) + '\n');
    fs.writeFileSync(scriptFile, JSON.stringify(script, null, 1) + '\n');
  } catch (e) {
    fs.rmSync(DEST, { recursive: true, force: true });
    fail(`could not set up ${F.id}: ${e.message}`);
  }
  console.log(`new ${normalizeFormatId(F.id)} piece: ${dest} (${F.name}; beats ${F.stages.map((s) => s.id).join(' > ')}). Edit narrative.json and voice/script.json together, check with: reel formatcheck ${dest}; preview: reel build ${dest} --preview; publish: reel voice ${dest}`);
} else {
  console.log(`new piece: ${dest} (from ${path.relative(SKILL, src)}). Next: edit voice/script.json, then: reel voice ${dest}`);
}
