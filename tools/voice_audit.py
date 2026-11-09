"""Per-line voice audit: whisper.cpp (multilingual model) transcribes every take of a piece and prints how many words it
heard differently from the script. usage: python3 tools/voice_audit.py pieces/<name> [pieces/<name> ...]
'!!' marks 2+ words off. Read the heard text, not just the count: a changed meaning ("hay" heard as "hãy", "chê" as "che")
needs a re-take (reel voice <piece> --vieneu --tries 10 --only <id>); Northern tr/ch, s/x and digits are not mistakes."""
import json, os, sys
from vi_heard import words, distance, heard

for piece in sys.argv[1:]:
    S = json.load(open(os.path.join(piece, 'voice', 'script.json')))
    print(f'== {os.path.basename(os.path.normpath(piece))}', flush=True)
    for L in S['lines']:
        h = heard(os.path.join(piece, 'voice', L.get('file', L['id'] + '.wav')))
        d = distance(words(L.get('say', L['text'])), words(h))
        print(f"{'  ' if d == 0 else '!!' if d >= 2 else ' !'} {L['id']:<10} {d} off | said:  {L.get('say', L['text'])}", flush=True)
        if d: print(f"{'':<16}       heard: {h}", flush=True)
