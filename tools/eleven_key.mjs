// The ElevenLabs key: ELEVENLABS_API_KEY from the environment, else from a .env file in `dir` or any folder above it.
import fs from 'node:fs';
import path from 'node:path';

export function elevenKey(dir) {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  for (let d = path.resolve(dir); ; d = path.dirname(d)) {
    const f = path.join(d, '.env');
    if (fs.existsSync(f)) {
      const m = fs.readFileSync(f, 'utf8').match(/^\s*(?:export\s+)?ELEVENLABS_API_KEY\s*=\s*["']?([^"'\s#]+)/m);
      if (m) return m[1];
    }
    if (path.dirname(d) === d) return null;
  }
}
