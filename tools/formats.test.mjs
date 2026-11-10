// node --test tools/formats.test.mjs
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, test } from 'node:test';
import { CUT_LEAD, loadFormat, previewVoice, readNarrative, validateFormatPiece } from './formats.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const tempRoots = [];
after(() => { for (const root of tempRoots) fs.rmSync(root, { recursive:true, force:true }); });
const tmp = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-formats-'));
  tempRoots.push(root);
  return root;
};
const writeJson = (file, v) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(v, null, 1)); };
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const flatLines = (beats) => beats.flatMap((b) => b.lines.map(({ id, text, after }) => ({ id, text, after })));

function makePiece(fid, edit = () => {}) {
  const F = loadFormat(fid), root = path.join(tmp(), 'piece');
  const beats = structuredClone(F.example.beats), script = { lead: 0.3, tail: 1.2, lang: 'vi', lines: flatLines(beats) };
  edit(beats, script);
  writeJson(path.join(root, 'piece.json'), { name: 'piece', narrativeFormat: fid, voice: { file: 'voice/voice.wav' } });
  writeJson(path.join(root, 'narrative.json'), { format: fid.toUpperCase(), channel: F.example.channel, beats });
  writeJson(path.join(root, 'voice', 'script.json'), script);
  return root;
}
const rescript = (root, edit) => { const f = path.join(root, 'voice', 'script.json'), s = readJson(f); edit(s); writeJson(f, s); };
function voice(root, edit = () => {}) {
  const V = previewVoice(root);
  delete V.preview; V.timing = 'tts';
  edit(V);
  writeJson(path.join(root, 'voice.json'), V);
  return V;
}
function wav(file, seconds, rate = 8000) {
  const data = Buffer.alloc(Math.ceil(seconds * rate) * 2), h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.concat([h, data]));
}
const has = (list, re) => list.some((m) => re.test(m));
const node = (script, args) => spawnSync(process.execPath, [path.join(HERE, script), ...args], { encoding: 'utf8' });
const quizBeat = (beats, stage) => beats.find((b) => b.stage === stage);

test('format ids are case-insensitive and unknown ids name the known formats', () => {
  assert.equal(loadFormat('f05').id, 'F05');
  assert.equal(loadFormat(' F05 ').id, 'F05');
  assert.throws(() => loadFormat('F99'), /unknown format "F99".*F01, F02, F03, F04, F05, F06, F07/);
  assert.throws(() => loadFormat('quiz'), /unknown format "quiz"/);
});

test('publication requires measured voice timing', () => {
  const r = validateFormatPiece(makePiece('F01'), { requireVoice: true });
  assert.ok(has(r.errors, /no measured voice timing/));
});

test('legacy pieces are not checked', () => {
  const root = tmp();
  writeJson(path.join(root, 'piece.json'), { name: 'old', style: 'paper-reel' });
  assert.deepEqual(validateFormatPiece(root), { errors: [], warnings: [] });
  assert.deepEqual(validateFormatPiece(root, { requireVoice: true }), { errors: [], warnings: [] });
});

test('an unknown narrativeFormat is an error, not a crash', () => {
  const root = makePiece('F01');
  writeJson(path.join(root, 'piece.json'), { narrativeFormat: 'F42' });
  assert.ok(has(validateFormatPiece(root).errors, /unknown format "F42"/));
});

test('beats out of stage order or missing a stage are reported', () => {
  const swapped = validateFormatPiece(makePiece('F01', (b, s) => { [b[0], b[1]] = [b[1], b[0]]; s.lines = flatLines(b); }));
  assert.ok(has(swapped.errors, /beats must be question > misconception > explanation > reveal > takeaway.*got misconception > question/));
  const missing = validateFormatPiece(makePiece('F01', (b, s) => { b.splice(3, 1); s.lines = flatLines(b); }));
  assert.ok(has(missing.errors, /missing reveal/));
});

test('line ids must be unique ignoring case', () => {
  const dup = validateFormatPiece(makePiece('F02', (b, s) => { b[1].lines[0].id = b[0].lines[0].id.toUpperCase(); s.lines = flatLines(b); }));
  assert.ok(has(dup.errors, /already used/));
});

test('the script must speak exactly the narrative lines', () => {
  const text = makePiece('F03');
  rescript(text, (s) => { s.lines[0].text += ' nữa'; });
  assert.ok(has(validateFormatPiece(text).errors, /text differs/));
  const order = makePiece('F03');
  rescript(order, (s) => { [s.lines[0], s.lines[1]] = [s.lines[1], s.lines[0]]; });
  assert.ok(has(validateFormatPiece(order).errors, /script line 1 is/));
  const extra = makePiece('F03');
  rescript(extra, (s) => { s.lines.push({ id: 'extra', text: 'Một câu thêm.', after: 0.2 }); });
  assert.ok(has(validateFormatPiece(extra).errors, /"extra" is not in narrative\.json/));
});

test('visuals must carry the format fields with the right types and plain text', () => {
  const missing = validateFormatPiece(makePiece('F04', (b) => { delete b[2].visual.detail; }));
  assert.ok(has(missing.errors, /beat 3 \(process\) visual\.detail is missing/));
  const type = validateFormatPiece(makePiece('F06', (b) => { b[0].visual.progress = 2; }));
  assert.ok(has(type.errors, /visual\.progress must be a number from 0 to 1/));
  const emoji = validateFormatPiece(makePiece('F07', (b) => { b[0].visual.hypothesis = 'Nếu 🚀 bay'; }));
  assert.ok(has(emoji.errors, /emoji, arrow or tick/));
  const arrow = validateFormatPiece(makePiece('F01', (b) => { b[0].title = 'A → B'; }));
  assert.ok(has(arrow.errors, /emoji, arrow or tick/));
});

test('the estimated duration must sit inside the format range, boundaries included', () => {
  const [min, max] = loadFormat('F01').duration;
  const outside = (dur) => new RegExp(`duration ${dur.toFixed(1).replace('.', '\\.')}s \\(estimated at 4 words/sec\\) is outside F01's ${min}-${max}s`);
  const atMax = makePiece('F01');
  const est = previewVoice(atMax).duration;
  rescript(atMax, (s) => { s.tail = +(s.tail + max - est).toFixed(3); });
  assert.equal(previewVoice(atMax).duration, max);
  assert.ok(!has(validateFormatPiece(atMax).errors, /outside/));
  rescript(atMax, (s) => { s.tail += 0.1; });
  assert.ok(has(validateFormatPiece(atMax).errors, outside(max + 0.1)));

  const short = makePiece('F01', (b, s) => {
    b.forEach((beat) => { beat.lines = beat.lines.slice(0, 1); beat.lines[0].text = 'Hai chữ.'; beat.lines[0].after = 0.2; });
    s.lines = flatLines(b);
  });
  const shortEst = previewVoice(short).duration;
  assert.ok(shortEst < min);
  assert.ok(has(validateFormatPiece(short).errors, outside(shortEst)));
  rescript(short, (s) => { s.tail = +(s.tail + min - shortEst).toFixed(3); });
  assert.equal(previewVoice(short).duration, min);
  assert.ok(!has(validateFormatPiece(short).errors, /outside/));
});

test('the measured duration replaces the estimate', () => {
  const root = makePiece('F05'), [min, max] = loadFormat('F05').duration;
  voice(root, (V) => { V.duration = max + 5; });
  assert.ok(has(validateFormatPiece(root).errors, new RegExp(`duration ${max + 5}\\.0s \\(measured\\) is outside F05's ${min}-${max}s`)));
});


// the countdown runs from the end of the last thinking line; the answer scene cuts in CUT_LEAD before its first line
const quizHolds = (V, think, answer) => {
  const t = V.lines.find((L) => L.id === think.lines.at(-1).id), a = V.lines.find((L) => L.id === answer.lines[0].id);
  return Math.max(0, a.t0 - CUT_LEAD) >= t.t1 + think.visual.countdown - 1e-6;
};

test('the quiz preview holds the thinking countdown before the answer scene cuts in', () => {
  const root = makePiece('F05'), N = readNarrative(root);
  assert.ok(quizHolds(previewVoice(root), quizBeat(N.beats, 'thinking'), quizBeat(N.beats, 'answer')));
});

test('the countdown is held after the last of several thinking lines', () => {
  const root = makePiece('F05', (b, s) => {
    quizBeat(b, 'thinking').lines.unshift({ id: 'think-extra', text: 'Nghĩ thêm một chút.', after: 0.2 });
    s.lines = flatLines(b);
  });
  const N = readNarrative(root);
  assert.ok(!has(validateFormatPiece(root).errors, /countdown/));
  assert.ok(quizHolds(previewVoice(root), quizBeat(N.beats, 'thinking'), quizBeat(N.beats, 'answer')));
});

test('a quiz pause shorter than the countdown plus the cut is an error', () => {
  const r = validateFormatPiece(makePiece('F05', (b, s) => {
    const think = quizBeat(b, 'thinking');
    think.lines.at(-1).after = think.visual.countdown;
    s.lines = flatLines(b);
  }));
  assert.ok(has(r.errors, /countdown needs after >=/));
});

test('a quiz countdown must be positive; longer thinking budgets are allowed', () => {
  const invalid = validateFormatPiece(makePiece('F05', (b) => { b.forEach((beat) => { beat.visual.countdown = 0; }); }));
  assert.ok(has(invalid.errors, /countdown must be a positive integer/));
  const root = makePiece('F05', (b,s) => {
    b.forEach((beat) => { beat.visual.countdown = 6; });
    quizBeat(b,'thinking').lines.at(-1).after = 6.2;
    s.lines = flatLines(b);
  });
  assert.ok(!has(validateFormatPiece(root).errors, /countdown/));
});

test('a measured voice whose answer cuts in during the countdown is an error', () => {
  const root = makePiece('F05'), N = readNarrative(root);
  const think = quizBeat(N.beats, 'thinking'), answerId = quizBeat(N.beats, 'answer').lines[0].id;
  voice(root, (V) => {
    const i = V.lines.findIndex((L) => L.id === think.lines.at(-1).id);
    const shift = V.lines[i + 1].t0 - (V.lines[i].t1 + 1);   // the answer starts 1s after thinking ends
    for (const L of V.lines.slice(i + 1)) { L.t0 -= shift; L.t1 -= shift; L.words.forEach((w) => { w.t0 -= shift; w.t1 -= shift; }); }
    V.duration -= shift;
    assert.equal(V.lines[i + 1].id, answerId);
  });
  assert.ok(has(validateFormatPiece(root).errors, /answer scene cuts in at .* before the \d+s countdown/));
});

test('the quiz question, choices, correct choice and countdown cannot switch between beats', () => {
  const moved = validateFormatPiece(makePiece('F05', (b) => {
    const v = quizBeat(b, 'explanation').visual;
    v.correct = (v.correct + 1) % v.choices.length;
  }));
  assert.ok(has(moved.errors, /visual\.correct changes between beats \(challenge: \d+, explanation: \d+\)/));
  const choices = validateFormatPiece(makePiece('F05', (b) => { quizBeat(b, 'answer').visual.choices = ['Một', 'Hai', 'Ba', 'Bốn']; }));
  assert.ok(has(choices.errors, /visual\.choices changes between beats/));
  const countdown = validateFormatPiece(makePiece('F05', (b) => { quizBeat(b, 'challenge').visual.countdown = quizBeat(b, 'thinking').visual.countdown === 3 ? 4 : 3; }));
  assert.ok(has(countdown.errors, /visual\.countdown changes between beats/));
});

test('comparison sides and dimensions, and before/after states, stay fixed across beats', () => {
  const side = validateFormatPiece(makePiece('F03', (b) => { b[2].visual.left = 'Một lựa chọn khác'; }));
  assert.ok(has(side.errors, /visual\.left changes between beats/));
  const dims = validateFormatPiece(makePiece('F03', (b) => { b[3].visual.rows = [...b[3].visual.rows, { label: 'Tiêu chí mới', left: '', right: '' }]; }));
  assert.ok(has(dims.errors, /visual\.rows\[\]\.label changes between beats/));
  const state = validateFormatPiece(makePiece('F06', (b) => { b[4].visual.after = 'Một kết quả khác'; }));
  assert.ok(has(state.errors, /visual\.after changes between beats/));
  const progress = validateFormatPiece(makePiece('F06', (b) => { b.forEach((beat, i) => { beat.visual.progress = [0.9, 0.1, 0.5, 0.3, 1][i]; }); }));
  assert.ok(!has(progress.errors, /progress/));
});

test('measured timing must be ordered and not overlap', () => {
  const root = makePiece('F04');
  voice(root, (V) => { V.lines[1].t0 = V.lines[0].t1 - 0.5; });
  assert.ok(has(validateFormatPiece(root).errors, /ends at .* after line .* starts at/));
  voice(root, (V) => { V.lines[2].t1 = V.lines[2].t0 - 0.1; });
  assert.ok(has(validateFormatPiece(root).errors, /t1 must be after t0/));
  voice(root, (V) => { V.lines[0].t0 = null; });
  assert.ok(has(validateFormatPiece(root).errors, /non-numeric t0\/t1/));
});

test('a measured voice made from an older script must be redone', () => {
  const root = makePiece('F06');
  voice(root);
  const N = readNarrative(root);
  N.beats[0].lines[0].text = 'Một câu hoàn toàn mới.';
  writeJson(path.join(root, 'narrative.json'), N);
  rescript(root, (s) => { s.lines[0].text = 'Một câu hoàn toàn mới.'; });
  assert.ok(has(validateFormatPiece(root).errors, /does not match voice\/script\.json/));
});

test('preview uses the current script without overwriting stale measured timing', () => {
  const root = makePiece('F06');
  voice(root);
  const original = fs.readFileSync(path.join(root,'voice.json'),'utf8');
  const N = readNarrative(root);
  N.beats[0].lines[0].text = 'Hạt đậu còn khô và đang chờ những điều kiện thích hợp để nảy mầm.';
  writeJson(path.join(root,'narrative.json'),N);
  rescript(root,(s) => { s.lines[0].text = N.beats[0].lines[0].text; });
  assert.equal(previewVoice(root).lines[0].text,N.beats[0].lines[0].text);
  assert.deepEqual(validateFormatPiece(root,{preview:true}).errors,[]);
  assert.equal(fs.readFileSync(path.join(root,'voice.json'),'utf8'),original);
  assert.ok(has(validateFormatPiece(root,{requireVoice:true}).errors,/does not match/));
});

test('publication refuses a preview voice and checks the WAV against voice.json', () => {
  const root = makePiece('F01');
  writeJson(path.join(root, 'voice.json'), previewVoice(root));
  assert.ok(has(validateFormatPiece(root, { requireVoice: true }).errors, /no measured voice timing.*preview/));
  const V = voice(root);
  assert.ok(has(validateFormatPiece(root, { requireVoice: true }).errors, /no voice audio at voice\/voice\.wav/));
  wav(path.join(root, 'voice', 'voice.wav'), V.duration);
  assert.deepEqual(validateFormatPiece(root, { requireVoice: true }).errors, []);
  wav(path.join(root, 'voice', 'voice.wav'), V.duration + 2);
  assert.ok(has(validateFormatPiece(root, { requireVoice: true }).errors, /lasts .* but voice\.json says/));
  fs.writeFileSync(path.join(root, 'voice', 'voice.wav'), 'not audio');
  assert.ok(has(validateFormatPiece(root, { requireVoice: true }).errors, /not a readable WAV/));
});

test('reel new refuses bad options without creating the piece', () => {
  const base = tmp();
  for (const args of [['--bogus'], ['--format'], ['--format', 'F99'], ['--format', 'F01', '--from', 'khan-skill'], ['--from', 'nope'], ['extra-arg']]) {
    const dest = path.join(base, 'p');
    const r = node('new.mjs', [dest, ...args]);
    assert.notEqual(r.status, 0, args.join(' '));
    assert.ok(!fs.existsSync(dest), args.join(' '));
  }
});

test('reel new never touches an existing directory', () => {
  const dest = path.join(tmp(), 'p');
  fs.mkdirSync(dest);
  fs.writeFileSync(path.join(dest, 'mine.txt'), 'keep');
  const r = node('new.mjs', [dest, '--format', 'F01']);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /already exists/);
  assert.deepEqual(fs.readdirSync(dest), ['mine.txt']);
  assert.equal(fs.readFileSync(path.join(dest, 'mine.txt'), 'utf8'), 'keep');
});


test('formatcheck exits by its findings', () => {
  const good = makePiece('F03');
  const ok = node('formatcheck.mjs', [good]);
  assert.equal(ok.status, 0, ok.stdout);
  assert.match(ok.stdout, /warning\s+no measured voice timing/);
  const strict = node('formatcheck.mjs', [good, '--require-voice']);
  assert.equal(strict.status, 1);
  assert.match(strict.stdout, /error\s+no measured voice timing/);
  const broken = makePiece('F03', (b) => { b.reverse(); });
  const bad = node('formatcheck.mjs', [broken]);
  assert.equal(bad.status, 1);
  assert.match(bad.stdout, /error\s+beats must be options > criteria/);
  assert.equal(node('formatcheck.mjs', [good, '--strict']).status, 2);
  const legacy = tmp();
  writeJson(path.join(legacy, 'piece.json'), { name: 'old' });
  const l = node('formatcheck.mjs', [legacy]);
  assert.equal(l.status, 0);
  assert.match(l.stdout, /legacy piece/);
});
