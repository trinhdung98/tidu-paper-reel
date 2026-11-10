---
name: "paper-reel"
description: "Make a faceless 9:16 explainer reel in the cut-paper 'Claude mascot' style (flat textured paper shapes, a terracotta box mascot or a Tidu channel mascot, a screwed header sign, a typing terminal bar, counter cards, rubber stamps, word-by-word paper caption chips, hard cuts on the voice, a soft lo-fi bed) — fully free and local: Kokoro or VieNeu voice, whisper.cpp word timing, canvas + Playwright + ffmpeg. Two kinds of piece: the legacy 18–25s spotlight reel with a comment-keyword CTA, and seven narrative formats (F01 question/explanation, F02 character story, F03 conditional comparison, F04 system/process, F05 countdown quiz, F06 transformation, F07 hypothetical/reality check) with their own stage order, duration and ending. Use when the user asks for a reel/short/TikTok in this paper or Claude-mascot style, a 'skill checkpoint'/tool-spotlight reel, a Tidu channel video, or one of the narrative formats."
argument-hint: "[topic or tool] [F01–F07 or CTA keyword]"
---

# paper-reel

You make vertical reels drawn entirely in code. The voice is the clock: every spoken line drives the scene, and props, stamps and counters land on the words that name them. No paid APIs, no API keys.

Pick the kind of piece first:
- **Narrative format (F01–F07):** an educational story with five stages in a fixed order, a duration range and a contract for layout, motion and ending. Read **[references/video-formats.md](references/video-formats.md)** before scripting; `formats/Fxx.json` holds each contract, its review questions, its sources and a complete sample story. [references/video-format-research.md](references/video-format-research.md) explains which parts rest on evidence and which are editorial choices.
- **Legacy spotlight reel:** the 18–25s hook → how → catch → kicker → comment-CTA reel from the starter. Its 18–25s length, comment-keyword CTA and "new wall, new hat, three background details every scene" rules (sections 1, 3 and 5) apply to legacy pieces only.

Everything runs through `bin/reel` in this skill folder (call it `REEL=<this skill dir>/bin/reel`). The pieces live in the user's project, e.g. `<project>/pieces/<name>/`.

## 0. Setup check
`$REEL doctor` checks node, ffmpeg, Playwright and Chromium, whisper-cli and its model, Kokoro (Python and model), and the fonts. Run it first. It prints the exact install command for anything missing; tell the user that command and stop until it's fixed.

## 1. Script (approve with the user before drawing)
**Narrative format:** `$REEL new <project>/pieces/<name> --format F01` copies the format template with its sample story into `narrative.json` (one beat per stage, in contract order) and `voice/script.json` (the same lines, flattened). Rewrite the sample for the user's topic, keep both files in step, and follow the line rules in [references/video-formats.md](references/video-formats.md): one sentence of at most ~18 words per line, as many lines per stage as the idea needs, short `after` breaths, a nominal length inside the contract's range, and the stage's own ending (a practice item, a question back, something safe to try or notice). Run `$REEL formatcheck <piece>` after every script change.

**Legacy spotlight reel:** 6–8 lines, 18–25s total, about 3.5 words/s. The proven arc:
1. **Hook:** what it is plus the payoff in one line ("This free Claude skill turns any topic into a Khan Academy style video.")
2. **How it works,** 2–3 lines, one concrete step each.
3. **The catch:** one honest limitation (it builds trust).
4. **"And get this."** The kicker: free, open source, a big number.
5. **CTA:** "For the <thing>, comment <WORD>." One keyword, all caps in the script.

Rules (both kinds):
- Every factual claim (stars, prices, features, science, money, psychology) must be checked from a primary or reputable source first: the repo API, the README, the vendor page, a textbook or paper. No tool checks facts; `formatcheck` only checks structure and timing.
- Write numbers the way they're said ("over a hundred stars").
- Avoid words Kokoro mangles; read the align output to catch them. "Mac" came out as "map", so the script said "laptop". "Claude" is heard as "clawed", which is the correct pronunciation.
- A line id can't be `voice`.

Put a legacy script in `voice/script.json`: `{ "lead": 0.15, "tail": 0.6, "lines": [{ "id": "hook", "text": "...", "after": 0.12 }, ...] }`.

## 2. Voice + timing
`$REEL formats` lists the seven contracts. `$REEL new <project>/pieces/<name>` copies the legacy starter, `--format F01` (…`F07`) a narrative format with its sample story, and `--from khan-skill` the full worked legacy example. For a format piece, check the story before voicing: `$REEL build <piece> --preview` and `$REEL still <piece> <times> look.png --preview` render with synthetic timing (4 words/s plus the gaps); that build is marked non-publishable. Then edit the script and run `$REEL voice <piece> [--voice am_michael] [--speed 1.32]`:
- Kokoro writes one take per line. `voice.mjs` joins them into `voice/voice.wav`, and `align.mjs` writes every word's time into `voice.json` using whisper.cpp.
- Check the `align: N/M words heard` line and the heard text. Fix any mispronounced words by rewording, then rerun just those lines with `--only id1,id2`.
- Good Kokoro voices: `am_michael` (default, energetic male), `am_fenrir`, `af_heart` (female). Speed 1.25–1.35 hits about 3.5 words/s.
- `--say` uses the macOS voice instead. It only works from a normal Terminal, not inside sandboxed agents.
- **Vietnamese (the Tidu channels):** Kokoro has no Vietnamese. Put `"lang": "vi"` in `script.json`; align then uses the multilingual `~/.cache/whisper/ggml-small.bin` (override with `WHISPER_MODEL_MULTI`) only to report what it heard, because whisper.cpp's Vietnamese timestamps drift 0.2–0.5s. Whisper writes numbers as digits ("9" for "chín") and hears "khung" as "không" whatever the voice; neither is a mispronunciation. Three engines, best first:
  - `--vieneu [--voice "Trúc Ly"] [--speed 0.88] [--tries 5]`: VieNeu-TTS v3 Turbo, free and local, native Vietnamese, Apache-2.0 with preset voices cleared for commercial use. Install: `uv venv ~/.venvs/vieneu --python 3.12 && VIRTUAL_ENV=~/.venvs/vieneu uv pip install vieneu "onnxruntime<1.23"` (onnxruntime 1.23+ refuses the Hugging Face cache's symlinked weights); override the Python with `VIENEU_PY`. It reads at about 5 words/s, so `--speed 0.88` slows it toward 4.4. Each line is drawn up to `--tries` times and the take whisper hears closest to the script wins; the log prints how many words the kept take is off. Northern female presets: Trúc Ly, Đoan Trang, Quỳnh Anh, Ngọc Huyền, Mai Anh. Word times come from ElevenLabs Forced Alignment (`tools/eleven_align.mjs`, free plan, `ELEVENLABS_API_KEY` in the environment or a `.env` above the piece); without a key they are estimated.
  - `--eleven [--voice <voice_id>] [--model eleven_v4]`: ElevenLabs with its own character timestamps. On the free plan the API refuses library voices (the native Vietnamese ones) and voice design; only the premade voices work, and those are native English speakers reading Vietnamese.
  - `--say --voice Linh`: macOS's built-in Vietnamese voice, robotic; Linh ignores `--rate`. Word times are spread over each word's own spoken length.

## 3. Scenes
Edit `src/scenes.js`: one `SCENES.<line id> = () => { ... }` per line, in that order. To cut again inside a line on a word, add `SPLITS.push([lineId, word, n, sceneKey])` plus `SCENES[sceneKey]`. Sound cues go in `SFX_CUES()`. Read [references/style.md](references/style.md) for the layout grid and the look's rules. The kit API is at the end of this file.

**Narrative format pieces:** the format template's `src/scenes.js` already draws each format's stages from `narrative.json` and the real voice timing. Follow the stage's layout, motion and ending in the contract. One beat is one stage with a stable diagram: lines inside a beat change emphasis on the same objects on the words that name them; the big change (layout, wall, hat) happens at the stage boundary. Keep the paper look, the Vietnamese fonts, the channel mascot and `prChips()`; the hero is the stage's concrete object or diagram, not a card repeating the narration.

**Legacy spotlight reel** — what every scene needs (the style's fingerprint):
1. **A full-bleed world** with its own wall colour and one visual metaphor for the line: a classroom, a security desk, a carnival, a studio, a corkboard, a dusk road, a checkout. Never a prop floating on blank paper.
2. **The sign:** `prSign('HEADLINE')`. 2–5 words, caps, a different headline per scene. The kicker defaults to `SKILL SPOTLIGHT`; pass `{ kicker }` to brand a series.
3. **One hero prop that acts on a spoken word:** cue it with `VW(line, word).t0` (write-on, `countUp` counter, `prStamp` slam, `prCheck`/`prCross` pop, a typing `prTerm`).
4. **The mascot** `clawd(CLAWD_X, CLAWD_Y, { hat, mood, hold, view })`, bottom right and cropped by the frame edge. Give it a different hat per scene: `guard`, `mortar`, `boater`, `ranger`, `cap`, `phones`, `beret`. Its mood changes on the payoff word (`happy`, `wow`, `flat`). Use `view: 'side', walk: true` when it walks or points.
5. **3+ details of background life:** a clock, bunting, books, a lamp, notes, stars, a moon, acoustic foam, lane marks moving.
6. **`prChips()` last.** The captions are automatic, one paper scrap per spoken word. Keep the bottom-left band (y 1450–1600, x < 930) free of other text.

Before writing any `withT`/`prStamp`/helper call, read **[references/layout-rules.md](references/layout-rules.md)**: centering rules, safe-zone numbers, paired-element formula, 3-column centres, vertical-gap formula, and text-width estimation. Then read **[references/review-rules.md](references/review-rules.md)**: no emoji, no Vietnamese in `chalk()`, text fitted to its container, no invented numbers, a hero that shows the line's concrete thing, one sentence per script line (or a `SPLITS` cut), and the voice audit.

## 4. Check, then export
- **Narrative format:** `$REEL formatcheck <piece>` while scripting; after the real voice, `$REEL formatcheck <piece> --require-voice` must report no errors (stage order, line mapping, duration inside the contract, the F05 countdown before the answer cut). Answer the contract's `reviewQuestions` too. A `--preview` build is never exported.
- `$REEL still <piece> 2.6,6,10,14 look.png --scale 0.4`. Look at the frames, and check them against [references/style.md](references/style.md).
- **Layout rules grep** — run the two greps in [references/layout-rules.md § Verification checklist](references/layout-rules.md) and fix every hit before continuing.
- **Review checklist** — run [references/review-rules.md § Checklist](references/review-rules.md#checklist-before-export): emoji and `chalk()` greps, two frames per line looked at, and `python3 tools/voice_audit.py <piece>` (re-take lines whose heard meaning changed). `reel check` passing is not a review: it cannot see shapes off the frame, text overflowing its card, emoji or a wrong fact.
- `$REEL check <piece>` must say `text: PASS` and `deterministic: true`. Fix any overlaps it reports by moving props, not captions.
- `$REEL export <piece> <out.mp4>` renders a 1080x1920 30fps video at about -14 LUFS in about 30 seconds and deletes the frame cache.
- Tell the user what you can't verify: you can't hear the mix, so ask them to listen.

## 5. Deliver
Give the MP4 path, a contact strip, the checks' numbers, the weakest shot, and a post caption.

Legacy spotlight reel caption:

```
<hook sentence>. Follow so the DM lands 📩👇
READ BELOW: <3–4 numbered plain facts from the source>
The catch: <limitation>.
For the link, comment "<WORD>".
```

Narrative format caption: the title, two or three plain sentences on what the video explains, the sources behind its facts (and a note that a fictional story is fictional), ending the way the format ends: the practice question, the question back to the viewer, or the thing to try. No comment-keyword CTA, and none at all for content made for kids.

Never post it anywhere without the user's explicit go-ahead.

## Kit API (styles/paper-reel/kit.js)
- **Shapes:** `pp(path, fill, { key, shadow, sb, sy, tex, rim, shade })`. Paths: `pR(x,y,w,h,r)`, `pE(cx,cy,rx,ry)`, `pG(points)`, `pA(cx,cy,r,a0,a1)`. Transforms: `withT(x,y,rot,scale,fn)`. Colours are in `PR.*`.
- **Text:** `txt(str,x,y,size,color,{ weight, font, align, frac })`, `txtW`, `fitSize`. Fonts: `F_HEAD`, `F_CHIP`, `F_CHALK`, `F_MONO`.
- **World:** `prWall(colour,{ streak, panel, gap })`, `prFloor(y, colour, { studs, trim })`, `prBunting(y)`, `prClock(x,y,r,h,m)`, `prCorkboard`, `prNote`, `prStar`, `prBoard(x,y,w,h)`.
- **Story props:** `prSign`, `prTerm(str, frac)`, `prCounter(label, value, x, y, { s, rot, big })`, `countUp(t0,d,a,b)`, `prStamp(str,x,y,colour,t0,{ rot, size })`, `prCheck`/`prCross(x,y,t)`, `prChecklist(x,y,w,title,items,t0,dt)`, `prRepoCard(x,y,repo,sub,stars,ta,tb)`, `prCommentBox(x,y,WORD,t,{ hint })` (`hint` = the empty-box placeholder), `prReceipt(x,y,rows,total)`, `prFolder(x,y,s,fill,{ label })`, `prBurst(x,y,t0)`, `chalk(str,x,y,size,frac)`, `chalkLine(points, frac)`, `sparkIcon`.
- **Mascot:** `clawd(x,y,{ s, hat, mood, look, view, walk, hold: propStick(angle) | propPencil(angle), hand: { x, y }, flip })`. Set `CLAWD_SCALE` once per piece.
- **Tidu Math owl** (a drop-in alternative to clawd, same options): `tidu(x,y,{ ... })` with hats `mortar`, `propeller`, `chef`, `builder`, `crown`, `party`, `explorer`; `hand` is the wing tip. Place it at about `tidu(880, 1800, ...)` (its feet are short). Set `TIDU_SCALE` once per piece.
- **Tidu Money pig** (a drop-in alternative to clawd, same options): `piggy(x,y,{ ... })` with hats `bowler`, `tophat`, `visor`, `mortar`, `nonla`, `newsboy`, `party`; `hand` is the front trotter. Money props for `hold` (any mascot): `propCoin(r)`, `propBill(angle)`, `propCalc(angle)`; a loose coin is `prCoin(x,y,r)`. Place it at about `piggy(880, 1790, ...)` (its hooves reach 62px below y). Set `PIGGY_SCALE` once per piece. Text inside a flipped mascot or prop: `txtR` (same args as `txt`).
- **Tidu Mind brain** (a drop-in alternative to clawd, same options): `brainy(x,y,{ ... })` with hats `nightcap`, `detective`, `mortar`, `beret`, `phones`, `halo`, `party`. Psychology props for `hold` (any mascot): `propNotebook(angle)`, `propGlass(angle)`; scene props `prThought(x,y,w,h,tailX,tailY,str,{ t })` (a thought bubble that pops in at t) and `prCouch(x,y,s)`. Place it at about `brainy(880, 1790, ...)` (its shoes reach 78px below y). Set `BRAINY_SCALE` once per piece. Side-on, anything held at the default hand sits in front of the face.
- **Tidu Science flask** (a drop-in alternative to clawd, same options): `flasky(x,y,{ ... })` with hats `goggles`, `astronaut`, `mortar`, `propeller`, `hardhat`, `explorer`, `party`; `hand` is the near glove. Science props for `hold` (any mascot): `propTube(angle)`, `propMagnet(angle)` (and `propGlass`); a scene atom icon is `prAtom(x,y,r)`. Place it at about `flasky(880, 1790, ...)` (its shoes reach 80px below y). Set `FLASKY_SCALE` once per piece.
- **Tidu English parrot** (a drop-in alternative to clawd, same options): `polly(x,y,{ ... })` with hats `mortar`, `guard`, `crown`, `cap`, `pirate`, `wizard`, `party`; `hand` is the wing tip. English props for `hold` (any mascot): `propCard(letter, angle, colour)`, `propBook(angle)`; scene props `prSpeech(x,y,w,h,tailX,tailY,str,{ t })` (a speech bubble that pops in at t) and `prBlock(x,y,letter,colour,s,rot)` (a toy alphabet block). Place it at about `polly(880, 1800, ...)` (its toes reach 44px below y). Set `POLLY_SCALE` once per piece.
- **Tidu Tech robot** (a drop-in alternative to clawd, same options): `botty(x,y,{ ... })` with hats `headset`, `vr`, `beanie`, `drone`, `mortar`, `tinfoil`, `party`; its face is drawn in glowing cyan on the head's screen. Tech props for `hold` (any mascot): `propPhone(angle)`, `propChip(angle)`, `propWrench(angle)`; a background detail is `prCircuit(x,y,w,h,key)` (traces with pulsing nodes). Place it at about `botty(880, 1790, ...)` (its boots reach 70px below y). Set `BOTTY_SCALE` once per piece.
- **Time:** `TT` (now), `E0` (scene start), `ev(t,d)` 0→1, `popS(t)` back-eased pop, `springMove(t0,a,b,SPRING.playful)`, `VL(id)`, `VW(id, word, n)`, `seg`, `EZ.*`.
- **Determinism:** seeded `RNG(...)` only; never `Math.random()` or the clock. `$REEL check` verifies it.

## Gotchas
- **Kokoro inside sandboxed agents:** phonemizer copies `libespeak-ng.dylib` to a temp folder that macOS refuses to load. `tools/kokoro_lines.py` symlinks the original signed library instead; keep that patch.
- **faster-whisper** can hang in sandboxes. The timing uses whisper.cpp (`tools/align.mjs`, model at `~/.cache/whisper/ggml-base.en.bin`, override with `WHISPER_MODEL`).
- **Old copies of the style:** `build.mjs` uses a `styles/paper-reel/` folder beside or above the piece before this skill's copy. Delete or refresh any old copy in the project.
- **Name clashes:** `kit/core.js` and `kit/morph.js` already define many short top-level names (`smooth`, `grain`, `ink`, `burst`, `push`, `layer`, `W`, `H`, `F`, `B`…), so prefix your own scene helpers. A clash shows up as a `syntax error` at build.
- **Vietnamese text:** Avenir Next and SuperClarendon have the letters but misplace stacked tone marks (ĐẾM, những, được), and Chalkduster lacks most of them. A Vietnamese piece embeds Be Vietnam Pro (signs, `txt`) and Bevan (chips) from `styles/paper-reel/fonts/` with `"fonts": { "Be Vietnam Pro": "BeVietnamPro-ExtraBold.ttf", "Bevan": "Bevan-Regular.ttf" }` in `piece.json`, and sets `F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif'; F_CHIP = 'Bevan, SuperClarendon, serif';` at the top of `src/scenes.js`. Keep `chalk()` to digits and symbols.
- **Reviewing frames:** the animate `review.mjs` sheets need ffmpeg's `drawtext`, which the Homebrew build lacks. Use `still` and `check` instead.
- **Canvas layout bugs** (off-centre cards, column overflow, paired midpoint drift, stacked overlap, text overflow, redundant layers, cross-scene y jumps): all documented with formulas and correct values in [references/layout-rules.md](references/layout-rules.md). Read it when writing scenes; run the verification greps before exporting.

Renderer and tools are vendored from the MIT-licensed `animate` skill (cth9191/animate); see NOTICE.md.
