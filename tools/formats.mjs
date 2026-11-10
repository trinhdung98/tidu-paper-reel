#!/usr/bin/env node
// Narrative formats F01-F07: the contracts in formats/Fxx.json, a piece's validation against its contract, and a
// preview voice timeline (4 words/sec) so a format piece can be built before any TTS runs.
//   node tools/formats.mjs          list the formats
//   node tools/formats.mjs F05      one format's stages, duration and example
// A format piece has piece.json "narrativeFormat": "F05", narrative.json { format, beats: [ { stage, title, lines, visual } ] }
// and voice/script.json whose lines are the beats' lines, flattened in order. Pieces without narrativeFormat are legacy.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FORMATS_DIR = path.join(SKILL, 'formats');
export const WORDS_PER_SEC = 4;
export const CUT_LEAD = 0.1;            // a line's scene starts this long before it is spoken (CUT in the head)
const LEAD = 0.8, TAIL = 1.5, AFTER = 0.35;   // tools/voice.mjs defaults when script.json leaves them out
const CHANNELS = ['math', 'money', 'mind', 'science', 'english', 'tech'];
const WAV_TOLERANCE = 0.05;
const MAX_LINE_WORDS = 18;
// emoji, dingbats (ticks, crosses), arrows: the canvas fonts cannot draw them and the narration cannot say them
const SYMBOLS = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{27F0}-\u{27FF}\u{2900}-\u{297F}\u{2B00}-\u{2BFF}\u{FE0F}]|->|=>|<-/u;
const SAFE_ID = /^[A-Za-z][A-Za-z0-9_-]*$/;

// visual fields per format: s string, a string[], i integer, p number 0..1, rows [{label,left,right}]
const VISUALS = {
  F01: { question: 's', misconception: 's', answer: 's', items: 'a', groups: 'groups?' },
  F02: { name: 's', dialogue: 's', mood: 's', items: 'a', subject: 's?' },
  F03: { left: 's', right: 's', rows: 'rows', condition: 's' },
  F04: { layers: 'a', active: 'i', detail: 's', subject: 's?' },
  F05: { question: 's', choices: 'a', correct: 'i', countdown: 'i', explanation: 's', subject: 's?' },
  F06: { before: 's', after: 's', progress: 'p', trigger: 's', labels: 'a', subject: 's?' },
  F07: { hypothesis: 's', assumptions: 'a', consequences: 'a', reality: 's', takeaway: 's', subject: 's?' },
};

const formatFile = (id) => path.join(FORMATS_DIR, `${id}.json`);
const knownIds = () => (fs.existsSync(FORMATS_DIR) ? fs.readdirSync(FORMATS_DIR).filter((n) => /^F\d\d\.json$/.test(n)).map((n) => n.slice(0, -5)).sort() : []);
export const normalizeFormatId = (id) => String(id ?? '').trim().toUpperCase();

export function loadFormat(id) {
  const ID = normalizeFormatId(id);
  if (!/^F\d\d$/.test(ID) || !fs.existsSync(formatFile(ID))) throw new Error(`unknown format "${id}"; known formats: ${knownIds().join(', ') || 'none (formats/ is empty)'}`);
  let F;
  try { F = JSON.parse(fs.readFileSync(formatFile(ID), 'utf8')); } catch (e) { throw new Error(`formats/${ID}.json is not valid JSON: ${e.message}`); }
  if (!Array.isArray(F.stages) || !F.stages.length || !Array.isArray(F.duration) || F.duration.length !== 2) throw new Error(`formats/${ID}.json needs "stages" and "duration": [min, max]`);
  if (normalizeFormatId(F.id) !== ID) throw new Error(`formats/${ID}.json has id "${F.id}"; it must be "${ID}"`);
  return F;
}

export const listFormats = () => knownIds().map(loadFormat);

const wordsOf = (text) => String(text).split(/\s+/).filter(Boolean);
const round = (x) => +x.toFixed(3);
const isNum = (x) => typeof x === 'number' && Number.isFinite(x);
const isStr = (x) => typeof x === 'string';

function readJson(file) {
  if (!fs.existsSync(file)) return { missing: true };
  try { return { value: JSON.parse(fs.readFileSync(file, 'utf8')) }; } catch (e) { return { error: e.message }; }
}

export function readNarrative(root) {
  const r = readJson(path.join(path.resolve(root), 'narrative.json'));
  if (r.missing) throw new Error(`no narrative.json in ${root}`);
  if (r.error) throw new Error(`narrative.json is not valid JSON: ${r.error}`);
  return r.value;
}

function readScript(root) {
  const r = readJson(path.join(path.resolve(root), 'voice', 'script.json'));
  if (r.missing) throw new Error(`no voice/script.json in ${root}`);
  if (r.error) throw new Error(`voice/script.json is not valid JSON: ${r.error}`);
  return r.value;
}

// the script's lines placed the way tools/voice.mjs places real takes, each word lasting 1/WORDS_PER_SEC
function timeline(S) {
  const lead = S.lead ?? LEAD, tail = S.tail ?? TAIL, lines = [];
  let t = lead, end = lead;
  for (const [i, L] of S.lines.entries()) {
    const words = wordsOf(L.text), t0 = t, t1 = t + words.length / WORDS_PER_SEC;
    lines.push({ id: L.id || `l${i + 1}`, text: L.text, t0: round(t0), t1: round(t1), words: words.map((w, k) => ({ w, t0: round(t0 + k / WORDS_PER_SEC), t1: round(t0 + (k + 1) / WORDS_PER_SEC) })) });
    end = t1;
    t = t1 + (L.after ?? AFTER);
  }
  return { duration: round(end + tail), lead, tail, lines };
}

// a voice.json stand-in for building before the real voice exists; never publishable (preview: true)
export function previewVoice(root) {
  const S = readScript(root);
  if (!Array.isArray(S.lines) || !S.lines.length) throw new Error('voice/script.json has no lines');
  const T = timeline(S);
  return { duration: T.duration, lead: T.lead, tail: T.tail, preview: true, timing: 'preview', lines: T.lines };
}

const isPreview = (V) => V.preview === true || V.timing === 'preview';

function wavSeconds(file) {
  const b = fs.readFileSync(file);
  if (b.length < 12 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WAVE') return null;
  let byteRate = 0;
  for (let o = 12; o + 8 <= b.length;) {
    const id = b.toString('ascii', o, o + 4), size = b.readUInt32LE(o + 4);
    if (id === 'fmt ' && o + 20 <= b.length) byteRate = b.readUInt32LE(o + 16);
    if (id === 'data') return byteRate ? Math.min(size, b.length - o - 8) / byteRate : null;
    o += 8 + size + (size % 2);
  }
  return null;
}

function checkText(where, text, errors) {
  if (SYMBOLS.test(text)) errors.push(`${where}: "${text}" has an emoji, arrow or tick; write plain words`);
}

function checkVisual(fid, b, where, errors) {
  const spec = VISUALS[fid], V = b.visual;
  if (!V || typeof V !== 'object' || Array.isArray(V)) { errors.push(`${where}: "visual" must be an object with ${Object.keys(spec).join(', ')}`); return; }
  for (const k of Object.keys(V)) if (!(k in spec)) errors.push(`${where}: visual has unknown field "${k}" (${fid} visuals use ${Object.keys(spec).join(', ')})`);
  for (const [k, rule] of Object.entries(spec)) {
    const v = V[k], at = `${where} visual.${k}`, optional = rule.endsWith('?'), type = optional ? rule.slice(0, -1) : rule;
    if (v === undefined) { if (!optional) errors.push(`${at} is missing`); continue; }
    if (type === 's') { if (!isStr(v)) errors.push(`${at} must be a string`); else checkText(at, v, errors); }
    if (type === 'a') { if (!Array.isArray(v) || !v.every(isStr)) errors.push(`${at} must be an array of strings`); else v.forEach((s, i) => checkText(`${at}[${i}]`, s, errors)); }
    if (type === 'i' && !Number.isInteger(v)) errors.push(`${at} must be an integer`);
    if (type === 'p' && !(isNum(v) && v >= 0 && v <= 1)) errors.push(`${at} must be a number from 0 to 1`);
    if (type === 'groups' && (!Array.isArray(v) || !v.every((n) => Number.isInteger(n) && n >= 0 && n <= 100) || (v.length && v.length !== V.items?.length))) errors.push(`${at} must be empty or have one shaded-hundredths integer (0-100) per item`);
    if (type === 'rows') {
      if (!Array.isArray(v)) { errors.push(`${at} must be an array of { label, left, right }`); continue; }
      v.forEach((r, i) => {
        if (!r || typeof r !== 'object' || !['label', 'left', 'right'].every((f) => isStr(r[f]))) errors.push(`${at}[${i}] must be { label, left, right } strings`);
        else ['label', 'left', 'right'].forEach((f) => checkText(`${at}[${i}].${f}`, r[f], errors));
      });
    }
  }
  if (fid === 'F04' && Array.isArray(V.layers) && Number.isInteger(V.active) && (V.active < -1 || V.active >= V.layers.length)) errors.push(`${where} visual.active ${V.active} is not a layer index (0-${V.layers.length - 1}, or -1 for none)`);
  if (fid === 'F05' && Array.isArray(V.choices) && Number.isInteger(V.correct) && (V.correct < 0 || V.correct >= V.choices.length)) errors.push(`${where} visual.correct ${V.correct} is not a choice index (0-${V.choices.length - 1})`);
  const count = (key, min, max) => {
    if (Array.isArray(V[key]) && (V[key].length < min || V[key].length > max)) errors.push(`${where} visual.${key} needs ${min}-${max} entries for the default renderer`);
  };
  if (fid === 'F01') count('items', 1, 2);
  if (fid === 'F03') count('rows', 1, 3);
  if (fid === 'F04') count('layers', 1, 4);
  if (fid === 'F05') count('choices', 2, 4);
  if (fid === 'F06') count('labels', 1, 6);
  const subjects = { F02:'savings', F04:'circuit', F05:'cookies', F06:'plant', F07:'friction' };
  if (V.subject !== undefined && V.subject !== subjects[fid]) errors.push(`${where} visual.subject must be "${subjects[fid]}" or omitted for the default renderer`);
}

function checkTiming(V, scriptLines, label, errors, warnings) {
  const stale = !Array.isArray(V.lines) || V.lines.length !== scriptLines.length || V.lines.some((L, i) => !L || L.id !== scriptLines[i].id || L.text !== scriptLines[i].text);
  if (stale) {
    (isPreview(V) ? warnings : errors).push(`${label} does not match voice/script.json (lines changed since it was made): ${isPreview(V) ? 'rebuild the preview' : 'run reel voice again'}`);
    return false;
  }
  let ok = true;
  const bad = (m) => { errors.push(`${label}: ${m}`); ok = false; };
  if (!isNum(V.duration) || V.duration <= 0) bad('duration must be a positive number');
  V.lines.forEach((L, i) => {
    if (!isNum(L.t0) || !isNum(L.t1)) return bad(`line "${L.id}" has non-numeric t0/t1`);
    if (L.t0 < 0 || L.t1 <= L.t0) bad(`line "${L.id}" runs ${L.t0}-${L.t1}s (t1 must be after t0)`);
    const next = V.lines[i + 1];
    if (next && isNum(next.t0) && L.t1 > next.t0 + 1e-3) bad(`line "${L.id}" ends at ${L.t1}s after line "${next.id}" starts at ${next.t0}s`);
    if (isNum(V.duration) && L.t1 > V.duration + 1e-3) bad(`line "${L.id}" ends at ${L.t1}s, past the duration ${V.duration}s`);
    if (!Array.isArray(L.words)) return bad(`line "${L.id}" has no words array`);
    let prev = -Infinity;
    for (const w of L.words) {
      if (!w || !isNum(w.t0) || !isNum(w.t1) || w.t1 < w.t0) { bad(`line "${L.id}" has a word with bad times (${JSON.stringify(w)})`); break; }
      if (w.t0 < prev - 1e-3) { bad(`line "${L.id}" words are out of order at "${w.w}"`); break; }
      prev = w.t0;
    }
  });
  return ok;
}

export function validateFormatPiece(root, { requireVoice = false, preview = false } = {}) {
  const errors = [], warnings = [], ROOT = path.resolve(root);
  const result = () => ({ errors, warnings });
  if (!fs.existsSync(ROOT) || !fs.statSync(ROOT).isDirectory()) { errors.push(`${root} is not a piece directory`); return result(); }
  const P = readJson(path.join(ROOT, 'piece.json'));
  if (P.error) { errors.push(`piece.json is not valid JSON: ${P.error}`); return result(); }
  const meta = P.value ?? {};
  if (meta.narrativeFormat === undefined) return result();
  if (!isStr(meta.narrativeFormat)) { errors.push('piece.json "narrativeFormat" must be a format id string such as "F01"'); return result(); }
  let F;
  try { F = loadFormat(meta.narrativeFormat); } catch (e) { errors.push(`piece.json narrativeFormat: ${e.message}`); return result(); }
  const fid = normalizeFormatId(meta.narrativeFormat);

  const N = readJson(path.join(ROOT, 'narrative.json'));
  if (N.missing) { errors.push('no narrative.json (the beats of the format)'); return result(); }
  if (N.error) { errors.push(`narrative.json is not valid JSON: ${N.error}`); return result(); }
  const nar = N.value;
  if (!nar || typeof nar !== 'object' || Array.isArray(nar)) { errors.push('narrative.json must be an object { format, beats }'); return result(); }
  if (normalizeFormatId(nar.format) !== fid) errors.push(`narrative.json format "${nar.format}" does not match piece.json narrativeFormat "${meta.narrativeFormat}"`);
  if (nar.channel !== undefined && !CHANNELS.includes(nar.channel)) errors.push(`narrative.json channel "${nar.channel}" is not one of ${CHANNELS.join(', ')}`);
  if (!Array.isArray(nar.beats)) { errors.push('narrative.json "beats" must be an array'); return result(); }

  const stages = F.stages.map((s) => s.id), got = nar.beats.map((b) => (b && typeof b === 'object' ? b.stage : undefined));
  if (got.length !== stages.length || got.some((s, i) => s !== stages[i])) {
    const missing = stages.filter((s) => !got.includes(s)), extra = got.filter((s) => !stages.includes(s));
    const dup = stages.filter((s) => got.filter((g) => g === s).length > 1);
    errors.push(`beats must be ${stages.join(' > ')} (one each, in order); got ${got.map((s) => s ?? '?').join(' > ') || 'none'}`
      + (missing.length ? `; missing ${missing.join(', ')}` : '') + (extra.length ? `; unknown ${extra.map(String).join(', ')}` : '') + (dup.length ? `; repeated ${dup.join(', ')}` : ''));
  }

  const flat = [], seen = new Map();
  nar.beats.forEach((b, bi) => {
    const where = `beat ${bi + 1} (${b?.stage ?? '?'})`;
    if (!b || typeof b !== 'object') { errors.push(`${where} must be an object`); return; }
    if (!isStr(b.title) || !b.title.trim()) errors.push(`${where}: "title" must be a non-empty string`);
    else {
      checkText(`${where} title`, b.title, errors);
      const n = wordsOf(b.title).length;
      if (n < 2 || n > 5) warnings.push(`${where} title "${b.title}" has ${n} words; keep titles to 2-5 words`);
    }
    if (!Array.isArray(b.lines) || !b.lines.length) { errors.push(`${where}: "lines" must be a non-empty array of spoken lines`); }
    else b.lines.forEach((L, li) => {
      const at = `${where} line ${li + 1}`;
      if (!L || typeof L !== 'object') { errors.push(`${at} must be { id, text, after }`); return; }
      if (!isStr(L.id) || !SAFE_ID.test(L.id) || L.id.toLowerCase() === 'voice') errors.push(`${at}: id ${JSON.stringify(L.id)} must start with a letter, use letters, digits, - or _, and cannot be "voice" (it names the take's file)`);
      else {
        const k = L.id.toLowerCase();
        if (seen.has(k)) errors.push(`${at}: line id "${L.id}" is already used by ${seen.get(k)} (ids must be unique, ignoring case)`);
        else seen.set(k, at);
      }
      if (!isStr(L.text) || !L.text.trim()) errors.push(`${at}: "text" must be the spoken sentence`);
      else {
        checkText(at, L.text, errors);
        const n = wordsOf(L.text).length;
        if (n > MAX_LINE_WORDS) warnings.push(`${at} ("${L.id}") has ${n} words; split lines over ${MAX_LINE_WORDS} words into separate lines`);
      }
      if (L.after !== undefined && !(isNum(L.after) && L.after >= 0)) errors.push(`${at}: "after" must be a pause in seconds (>= 0)`);
      flat.push({ ...L, beat: bi });
    });
    checkVisual(fid, b, where, errors);
  });

  const S = readJson(path.join(ROOT, 'voice', 'script.json'));
  let script = null;
  if (S.missing) errors.push('no voice/script.json: it must list the narrative\'s lines in order');
  else if (S.error) errors.push(`voice/script.json is not valid JSON: ${S.error}`);
  else if (!S.value || !Array.isArray(S.value.lines)) errors.push('voice/script.json must be { lead, tail, lines: [...] }');
  else {
    script = S.value;
    for (const k of ['lead', 'tail']) if (script[k] !== undefined && !(isNum(script[k]) && script[k] >= 0)) errors.push(`voice/script.json "${k}" must be seconds (>= 0)`);
    const sl = script.lines, n = Math.max(sl.length, flat.length), diffs = [];
    for (let i = 0; i < n; i++) {
      const a = sl[i], b = flat[i];
      if (a === undefined) diffs.push(`line ${i + 1} "${b.id}" is in narrative.json but not in the script`);
      else if (!a || typeof a !== 'object') diffs.push(`script line ${i + 1} must be { id, text, after }`);
      else if (!b) diffs.push(`script line ${i + 1} "${a.id}" is not in narrative.json`);
      else if (a.id !== b.id) diffs.push(`script line ${i + 1} is "${a.id}" but narrative.json has "${b.id}" there`);
      else if (a.text !== b.text) diffs.push(`line "${a.id}" text differs between voice/script.json and narrative.json`);
      else if ((a.after ?? AFTER) !== (b.after ?? AFTER)) diffs.push(`line "${a.id}" after ${a.after ?? AFTER}s in the script but ${b.after ?? AFTER}s in narrative.json`);
    }
    if (diffs.length) { errors.push(...diffs.slice(0, 8).map((d) => `script mismatch: ${d}`)); if (diffs.length > 8) errors.push(`script mismatch: ${diffs.length - 8} more`); script = null; }
  }

  const V = preview ? {} : readJson(path.join(ROOT, 'voice.json'));
  let timing = null, measured = false;
  if (V.error) errors.push(`voice.json is not valid JSON: ${V.error}`);
  else if (V.value && script) {
    const label = isPreview(V.value) ? 'voice.json (preview)' : 'voice.json';
    if (checkTiming(V.value, script.lines, label, errors, warnings)) { timing = V.value; measured = !isPreview(V.value); }
  }
  if (script && [script.lead, script.tail].every((v) => v === undefined || isNum(v)) && script.lines.every((L) => isStr(L.text) && (L.after === undefined || isNum(L.after)))) {
    const est = timeline(script), [min, max] = F.duration;
    const dur = measured ? timing.duration : est.duration, how = measured ? 'measured' : 'estimated at 4 words/sec';
    if (isNum(dur) && (dur < min || dur > max)) errors.push(`duration ${dur.toFixed(1)}s (${how}) is outside ${fid}'s ${min}-${max}s`);
    if (!measured) (requireVoice ? errors : warnings).push(`no measured voice timing: ${est.duration.toFixed(1)}s is an estimate at 4 words/sec${timing ? ' (voice.json is a preview)' : ''}; run reel voice before publishing`);
  }
  if (requireVoice && measured) {
    const wav = path.join(ROOT, meta.voice?.file || 'voice/voice.wav');
    const secs = fs.existsSync(wav) ? wavSeconds(wav) : undefined;
    if (secs === undefined) errors.push(`no voice audio at ${path.relative(ROOT, wav)}: run reel voice`);
    else if (secs === null) errors.push(`${path.relative(ROOT, wav)} is not a readable WAV file`);
    else if (Math.abs(secs - timing.duration) > WAV_TOLERANCE) errors.push(`${path.relative(ROOT, wav)} lasts ${secs.toFixed(2)}s but voice.json says ${timing.duration}s: run reel voice again`);
  }

  checkPersistent(fid, nar.beats, errors);
  if (fid === 'F05') checkQuiz(nar.beats, timing, errors);
  return result();
}

// the renderer keeps these where they are for the whole video, so every beat must carry the same value
const PERSISTENT = {
  F03: { left: (v) => v.left, right: (v) => v.right, 'rows[].label': (v) => (Array.isArray(v.rows) ? v.rows.map((r) => r?.label) : v.rows) },
  F05: { question: (v) => v.question, choices: (v) => v.choices, correct: (v) => v.correct, countdown: (v) => v.countdown },
  F06: { before: (v) => v.before, after: (v) => v.after },
};
function checkPersistent(fid, beats, errors) {
  const shown = beats.filter((b) => b && b.visual && typeof b.visual === 'object');
  for (const [k, get] of Object.entries(PERSISTENT[fid] || {})) {
    const first = shown[0], want = first && JSON.stringify(get(first.visual));
    const diff = shown.find((b) => JSON.stringify(get(b.visual)) !== want);
    if (diff) errors.push(`visual.${k} changes between beats (${first.stage}: ${want}, ${diff.stage}: ${JSON.stringify(get(diff.visual))}); ${fid} keeps it the same in every beat`);
  }
}

// F05: the countdown runs from the end of the last thinking line; the answer scene must not cut in before it ends
function checkQuiz(beats, timing, errors) {
  const byStage = (s) => beats.find((b) => b && b.stage === s);
  const thinking = byStage('thinking'), answer = byStage('answer');
  if (!thinking || !answer || !Array.isArray(thinking.lines) || !Array.isArray(answer.lines) || !answer.lines.length) return;
  const countdown = thinking.visual?.countdown;
  if (!Number.isInteger(countdown) || countdown <= 0) errors.push(`thinking visual.countdown must be a positive integer number of seconds; got ${JSON.stringify(countdown)}`);
  const think = thinking.lines[thinking.lines.length - 1];
  if (Number.isInteger(countdown) && think && isNum(think.after ?? AFTER) && (think.after ?? AFTER) < countdown + CUT_LEAD - 1e-9) {
    errors.push(`thinking line "${think.id}" pauses ${think.after ?? AFTER}s but a ${countdown}s countdown needs after >= ${countdown + CUT_LEAD}s (the answer scene cuts in ${CUT_LEAD}s before its line)`);
  }
  if (timing && Number.isInteger(countdown) && think) {
    const tl = timing.lines.find((L) => L.id === think.id), al = timing.lines.find((L) => L.id === answer.lines[0]?.id);
    if (tl && al && isNum(tl.t1) && isNum(al.t0) && al.t0 - CUT_LEAD < tl.t1 + countdown - 1e-6) {
      errors.push(`the answer scene cuts in at ${(al.t0 - CUT_LEAD).toFixed(2)}s, before the ${countdown}s countdown after "${think.id}" ends (${(tl.t1 + countdown).toFixed(2)}s)`);
    }
  }
}

function describe(F) {
  const out = [`${normalizeFormatId(F.id)}  ${F.name}  (${F.duration[0]}-${F.duration[1]}s)`];
  if (F.learningGoal) out.push(`  learning goal: ${F.learningGoal}`);
  if (Array.isArray(F.topics) && F.topics.length) out.push(`  topics: ${F.topics.join('; ')}`);
  F.stages.forEach((s, i) => {
    out.push(`  ${i + 1}. ${s.id} - ${s.label}`);
    for (const k of ['purpose', 'layout', 'motion', 'ending']) if (s[k]) out.push(`       ${k.padEnd(7)} ${s[k]}`);
  });
  if (Array.isArray(F.reviewQuestions) && F.reviewQuestions.length) out.push('  review before publishing:', ...F.reviewQuestions.map((q) => `    - ${q}`));
  if (Array.isArray(F.sources) && F.sources.length) out.push('  sources:', ...F.sources.map((s) => `    - ${s.title}${s.scope ? ` (${s.scope})` : ''}: ${s.url}`));
  if (F.example) out.push(`  example: "${F.example.title}" (${F.example.channel}), ${(F.example.beats || []).reduce((n, b) => n + (b.lines?.length || 0), 0)} lines`);
  out.push(`  new piece: reel new <piece-dir> --format ${normalizeFormatId(F.id)}`);
  return out.join('\n');
}

const isMain = process.argv[1] && fs.realpathSync(path.resolve(process.argv[1])) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  const args = process.argv.slice(2);
  try {
    if (args.length > 1 || args.some((a) => a.startsWith('-'))) { console.error('usage: node tools/formats.mjs [Fxx]'); process.exit(2); }
    if (args.length) console.log(describe(loadFormat(args[0])));
    else for (const F of listFormats()) console.log(`${normalizeFormatId(F.id)}  ${F.name.padEnd(28)} ${String(F.duration[0]).padStart(2)}-${F.duration[1]}s  ${F.stages.map((s) => s.id).join(' > ')}`);
  } catch (e) { console.error(e.message); process.exit(2); }
}
