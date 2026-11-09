"""What whisper.cpp hears in a Vietnamese take, and how far that is from the script (in words).
Shared by tools/vieneu_lines.py (best-of-N takes) and tools/voice_audit.py (per-line audit). Standard library only."""
import os, re, subprocess, unicodedata

MODEL = os.environ.get('WHISPER_MODEL_MULTI', os.path.expanduser('~/.cache/whisper/ggml-small.bin'))
UNITS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']


def say_number(n):
    """0–999 as read aloud (whisper writes '48' for 'bốn mươi tám'): mười lăm, hai mươi mốt, một trăm lẻ năm."""
    if n < 10: return UNITS[n]
    if n < 20: return 'mười' + ('' if n == 10 else ' lăm' if n == 15 else ' ' + UNITS[n - 10])
    if n < 100:
        t, u = divmod(n, 10)
        return f'{UNITS[t]} mươi' + ('' if u == 0 else ' mốt' if u == 1 else ' lăm' if u == 5 else ' ' + UNITS[u])
    h, r = divmod(n, 100)
    return f'{UNITS[h]} trăm' + ('' if r == 0 else ' lẻ ' + UNITS[r] if r < 10 else ' ' + say_number(r))


def words(s):
    s = unicodedata.normalize('NFC', s.lower())
    return [w for t in re.findall(r'\w+', s) for w in (say_number(int(t)) if t.isdigit() and int(t) < 1000 else t).split()]


def distance(a, b):
    D = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        prev, D[0] = D[0], i
        for j in range(1, len(b) + 1): prev, D[j] = D[j], min(D[j] + 1, D[j - 1] + 1, prev + (a[i - 1] != b[j - 1]))
    return D[-1]


def heard(wav):
    tmp = wav + '.16k.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-ar', '16000', '-ac', '1', tmp], check=True)
    r = subprocess.run(['whisper-cli', '-m', MODEL, '-l', 'vi', '-f', tmp, '-np', '-ng', '-nt'], capture_output=True, text=True)
    os.remove(tmp)
    return r.stdout.strip()
