"""Free local Vietnamese voice: VieNeu-TTS v3 Turbo (Apache-2.0, preset voices cleared for commercial use), one wav per script line.
usage: $VIENEU_PY tools/vieneu_lines.py pieces/<name> [--voice "Trúc Ly"] [--speed 0.88] [--tries 4] [--only id1,id2]
VieNeu samples every take afresh and now and then slurs a word, so each line is drawn up to --tries times and the take whisper.cpp
(multilingual model) transcribes closest to the script wins. It reads at about 5 words/s; --speed < 1 then slows the take with
ffmpeg's pitch-keeping atempo. Voice and speed are saved in script.json "vieneu": { "voice", "speed" } so a rerun of one line
keeps them. Writes <piece>/voice/<id>.wav and sets "file" on the line; tools/eleven_align.mjs then times its words."""
import os, sys, json, subprocess
from vieneu import Vieneu
from vi_heard import words, distance, heard

a = sys.argv[1:]; piece = a[0]
opt = lambda k, d: a[a.index(k) + 1] if k in a else d
sp = os.path.join(piece, 'voice', 'script.json'); S = json.load(open(sp))
V = S.setdefault('vieneu', {})
V['voice'] = opt('--voice', V.get('voice', 'Trúc Ly'))
V['speed'] = float(opt('--speed', V.get('speed', 1.0)))
only, tries = opt('--only', ''), int(opt('--tries', 4))
tts = Vieneu()
presets = [v for _, v in tts.list_preset_voices()]
if V['voice'] not in presets: sys.exit(f"unknown VieNeu voice {V['voice']!r}; presets: {', '.join(presets)}")
for L in S['lines']:
    if L['id'] == 'voice': sys.exit('a line id cannot be "voice" (voice/voice.wav is the assembled track); rename it')
    if only and L['id'] not in only.split(','): continue
    text = L.get('say', L['text'])
    out = os.path.join(piece, 'voice', L['id'] + '.wav')
    best = None
    for k in range(tries):
        cand = out + f'.try{k}.wav'
        tts.save(tts.infer(text, voice=L.get('voice', V['voice'])), cand)
        h = heard(cand); d = distance(words(text), words(h))
        if best is None or d < best[0]: best = (d, cand, h)
        if d == 0: break
    os.replace(best[1], out); L['file'] = L['id'] + '.wav'
    for k in range(tries):
        if os.path.exists(out + f'.try{k}.wav'): os.remove(out + f'.try{k}.wav')
    if V['speed'] != 1.0:
        tmp = out + '.tmp.wav'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', out, '-af', f"atempo={V['speed']}", tmp], check=True)
        os.replace(tmp, out)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout)
    print(f"{L['id']}: {d:.2f}s  {len(text.split()) / d:.2f} w/s  {best[0]} word(s) off, heard: {best[2]!r}", flush=True)
json.dump(S, open(sp, 'w'), ensure_ascii=False, indent=1)
