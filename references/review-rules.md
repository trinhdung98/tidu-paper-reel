# Review rules

Learned from reviewing the 10 Tidu Mind videos (after the 10 Tidu Money videos that produced [layout-rules.md](layout-rules.md)). `layout-rules.md` holds the geometry (centering, safe zone, gaps); this file holds everything else a review has to catch. Apply both when writing `src/scenes.js`, and run the checklist at the end before every export.

## `reel check` is not a review

`text: PASS` only proves that no two text boxes overlap and no text box leaves the frame or enters the phone-UI margins. It does not see:

- shapes (cards, bubbles, panels, clocks) that hang off the frame edge or overlap each other;
- text overflowing the card, bubble or box it sits in;
- emoji or font fallback (wrong glyphs still count as text that fits);
- a kit call that silently drew nothing;
- an empty or static frame, a prop that does not match the line, a wrong or invented fact.

So every review also renders two frames per voice line, one mid-line and one in the pause after it, at `--scale 0.36` or larger, and looks at each of them. Frame 0 is always one of them.

## Glyphs and fonts

- **No emoji in canvas text.** `txt('📱 …')`, `'❤️'`, `'👍'`, `'⚠️'` render as Apple Color Emoji: glossy, off-style, and a different picture on other machines. Draw the icon with paper shapes (`pp`, `pE`, `pR`, `pG`) or leave it out.
- **The embedded fonts have no `→ ✓ ✗`.** Be Vietnam Pro and Bevan carry `− × ÷ · … — – ? %` but not arrows or ticks, so those come from a system fallback font with another weight. Use `prCheck` / `prCross` for ticks and crosses, and draw arrows with `chalkLine` plus a triangle head; in a sign, write the word ("48 THÀNH 50", "2 LÊN 5").
- **No `chalk()` with Vietnamese letters.** Chalkduster lacks most tone marks, so the browser mixes in a fallback font and the word looks broken. On a board, write Vietnamese with `txt(…, { color: 'rgba(244,244,236,0.92)', frac })`; keep `chalk()` for digits and symbols.
- **Text fits its own container.** Inside any card, tag, bubble or box, size the text with `fitSize(str, innerWidth, size)`. `prCommentBox` fits the typed word and the hint itself (570 px, ~20 px clear of the send button); `prChips` shrinks a caption group to one row instead of wrapping into the phone-UI band.
- **Check a kit call's signature in `kit.js` before using it.** `prNote(x, y, { rot, key })` drew nothing in eight of the ten pieces: the real signature is `prNote(x, y, w, h, fill, rot, key)`. `EZ` has `o2 o3 i2 i3 io back` and nothing else. A wrong call throws no error and `reel check` sees nothing missing.
- **Never stack two texts on one spot, even when one is half-revealed with `frac`.** A placeholder "?" under write-on text fails the overlap check; draw one or the other, switched at the cue time.
- **A badge does not cover text.** A `prCheck` / `prCross` on a card's corner sits above the header's top line, tone marks included; mind-07 hid the mark of "THỂ".

## Content (Tidu Mind: psychology for adults)

- **No invented numbers.** A percentage, count, time or score on screen must be in the script and backed by a source named in `youtube.md`. "NGƯỜI KHÁC 100%", "1.2k likes", "15 phút mỗi chiều", "Quá giờ 5 phút" all read as facts; replace them with words or bars without numbers.
- **Screen text says what the voice says.** Signs, tags and boards paraphrase the current line and never add a stronger claim than the narration (no "luôn", "100%", "chắc chắn", "mù quáng" when the voice says "có thể", "đôi khi"). A quoted sentence ("mình không thể giúp việc này hôm nay") uses the narration's exact words.
- **Props do not contradict the line.** No "typing…" dots on a message nobody has answered; no ✗ on something the voice only calls a guess ("suy đoán" is unproven, not false).
- **A scene shows its own line.** The solution card belongs to the line that names the solution; mind-05's reframe scene showed the CTA's "tiến bộ so với chính mình" while the voice was still on motivation vs discouragement.
- **No diagnosis, no promise.** Wording stays at "có thể", "đôi khi", "thử"; no "chữa", "hết lo âu", no labels like "bạn bị…". A promise on screen ("Đà chuyển động sẽ xuất hiện sau đó!", "BẠN KHÔNG THỂ TỪ CHỐI!") is a claim too.
- **A hypothesis is not a fact.** "Não bộ từ thời tiền sử đã được lập trình…" states an evolutionary explanation as settled; write it as one possible explanation, or drop it.
- **Use the right name for the concept.** mind-03's description called future-worry "Rumination" (dwelling on the past). If the term is not exact, describe it in plain Vietnamese instead.
- **Named effects and studies are checked** against a primary or reputable source (name, year, what was measured, effect direction). Perfectionism is a good example of why: perfectionistic concerns go with more procrastination, high personal standards with less (Sirois, Molnar & Hirsch 2017), so "perfectionism is procrastination in disguise" is wrong.
- **Example quotes are fine** ("Chỗ này chưa ổn.", "Làm tốt lắm!") as long as they read as illustrations, not as data.
- **`youtube.md` names its sources** (author, year, journal or book, DOI when there is one) for every effect or technique it explains, follows the narration's hedging, and a Tidu Mind description ends with a line that the video is general information, not a substitute for professional advice.

## Composition

- **The hero shows the line's concrete thing.** If the line says "một vết bẩn trên áo", there is a shirt with a stain; "một tin nhắn chưa được trả lời" is a phone with an unread bubble. A text card or a generic icon is a miss; in the first pass, most Tidu Mind scenes were text cards.
- **The hero is big.** The main prop spans at least ~40 % of the frame width and sits in the band y 420–1300. No band taller than ~350 px in the middle of the frame stays empty while the line plays.
- **The hero is there at the cut.** Frame 0 of the video is the poster/thumbnail, so the hook's hero is fully drawn at t = 0; in every later scene the hero (or its container) is on screen by `E0 + 0.2`, and only its contents wait for their words. An opening `popS(E0 + …)` on the hero leaves the first frames empty.
- **Nothing hangs off the frame** unless it is moving in or out: every card, bubble, panel and piece of decor stays inside x 70–1010 once it has landed, and any text inside it ends at x ≤ 960 at every height (`reel check` flags text in the right 120 px). `prClock(960, y, 70)` reaches x = 1030; `prThought` lobes stick out past `w`, so keep `w` ≤ 700. Objects that bounce or slide away come to rest inside the frame too.
- **Cards in a row do not overlap:** centre spacing ≥ card width + 20 px. Items that split apart from one stack either start already apart or pop in at their final places; otherwise their labels overlap for the first frames.
- **A widget repeated across a cut keeps its centre and its size**, not only its y (extends the cross-scene rule in layout-rules.md): the slide, the scale or the phone does not jump on a `SPLITS` cut.
- **Draw what goes into a container before the container**, and keep text off the container's body, so the pass-through reads and the texts do not overlap.
- **A prop stands out from its wall.** Its fill differs clearly in lightness from the wall behind it; mind-06's #3f5a5a mountain vanished on the #2e4f4f wall.
- **Show the option not chosen by fading that element's `globalAlpha`,** never with a full-width dim rectangle, which also dims the chosen card and leaves hard bands across the wall.
- **`prStamp` uses `{ from: 1.3 }` or less** when it is wide (> ~500 px), in the right half (x > 700) or low (y > 1150). The default 1.9× slam briefly throws its text off the frame or into the phone-UI band.
- **Walls in a branded series.** style.md asks for a new wall colour every scene. Tidu Mind keeps its brand teal instead (`#2e4f4f`, from `brand/tidu-mind`), alternating it with a near value (`#355555`) and changing floor, panels and the whole prop set on every cut so the cut still reads. Props on these walls need their own contrast (see above).

## Mascot

- **Consecutive scenes never share a hat**, `SPLITS` sub-scenes included. `brainy` (like the other Tidu mascots) has 7 hats, so a piece with 8–10 scenes repeats a hat, but never back to back.

## Timing

- **Write one sentence per script line, about 4.5 s at most** (≈ 18 words at VieNeu's pace). All 10 Tidu Mind scripts packed two or three sentences into lines of 5–9.6 s, so one scene sat still for the whole line. When a script already has such a line, add a `SPLITS` cut at the first word of its second sentence (`SPLITS.push([lineId, word, n, 'lineId2'])` plus `SCENES.lineId2` with its own hero); a single long sentence can instead get a second change cued on a word.
- **Pops land on the word that names them**, cued with `VW(line, word, n)`, not on a fixed offset from the scene start. Sound cues in `SFX_CUES()` use the same words.
- **A comment box types after the question is asked.** Its hint disappears as soon as typing starts, so start the typing on the last word of the question, not at the cut.

## Voice

- **Audit every take before export:** `python3 tools/voice_audit.py <piece>` prints, per line, how many words whisper heard differently from the script and what it heard. Judge the meaning, not the count:
  - re-take when the heard word changes the sense ("hay" → "hãy" turns a question into an order; "chê" → "che", "thích" → "tích", "Một" → "Mùa"); 10 tries fixed each of these;
  - ignore Northern merges: tr/ch, s/x and gi/d/r ("trì hoãn" → "chỉ hoãn", "xu hướng" → "su hướng", "giận" → "dẫn"), digits for number words, and punctuation;
  - if 10 tries keep the same miss ("kém cỏi" → "kém cởi"), stop re-taking and ask a person to listen: it is either the voice's accent or whisper's ear, and only a listener can tell.
- **Re-take only the bad line:** `$REEL voice <piece> --vieneu --tries 10 --only <id>`. Scenes cue on words through `VW`, so they follow the new timing; re-check and re-export afterwards.

## Checklist before export

1. `grep -nP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{1F000}-\x{1F02F}\x{1F0A0}-\x{1F0FF}\x{1F100}-\x{1F2FF}]" src/scenes.js` returns nothing (no emoji, no ✓ ✗ ⛔ ⚠). Also run `grep -n "[✓✗✔✘❌✅⚠⛔]" src/scenes.js` for symbols outside the main ranges.
2. `grep -n "→" src/scenes.js` returns nothing inside `txt` / `prSign` strings.
3. `grep -n "chalk(" src/scenes.js`: every hit draws only digits and symbols.
4. `grep -n "prNote(" src/scenes.js`: every hit passes `x, y, w, h, fill, rot, key`.
5. The layout greps in [layout-rules.md](layout-rules.md#verification-checklist-run-before-reel-check).
6. Frame 0 plus two frames per line rendered and looked at (`node tools/linesheets.mjs <piece>` renders five per line: cut, mid-line, line end, mid-pause, end of pause): hero matches the line and is there at the cut, nothing off-frame, no overflow, no empty middle.
7. `python3 tools/voice_audit.py <piece>`: no line whose heard text changes the meaning.
8. `$REEL check` says `text: PASS` and `deterministic: true`.
9. `node tools/cuecheck.mjs <piece>`: every `VW` cue hits a spoken word and every `PR.<colour>` exists (both fail silently otherwise).

## Tidu Tech series — additional rules

Learned from reviewing 10 Tidu Tech videos. These add to the general rules above; apply both.

### Emoji in data arrays propagate to txt()

The most common miss: an emoji sits in a **JavaScript array literal** (`['🥇 PASSKEY...', ...]`, `['🌐 WEBSITE...', ...]`, `['🇻🇳 TRUNG TÂM...', ...]`) and gets passed to `txt()` via `.forEach`. `reel check` has no way to flag it; the grep in checklist item 1 catches it because it scans the whole file, not just direct `txt()` calls. Flag emoji **everywhere in the file**, not just in `txt()`.

Extended grep for step 1:
```bash
grep -nP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{1F000}-\x{1F02F}\x{1F0A0}-\x{1F0FF}\x{1F100}-\x{1F1FF}\x{1F200}-\x{1F2FF}]" src/scenes.js
```
Flag emoji also covers **flag sequences** (`🇻🇳` = two Regional Indicator letters), which a narrow range grep misses.

### Emoji prefix ≠ icon

Using an emoji as a visual prefix to a card header or list item (`'📶 WI-FI'`, `'🏢 TRUNG TÂM DỮ LIỆU'`) looks like decoration but renders as Apple Color Emoji. **Just delete the emoji and its trailing space; keep the text.** If an icon is genuinely needed beside the label, draw a small paper shape (`pp(pE(...))` or `pp(pR(...))`) before the `txt()` call.

### Hero emoji replaced by paper shape

Several scenes used a large emoji as the **only** hero prop in the frame (`txt('👻', 0, 8, 84, ...)`, `txt('🐱', 0, 10, 90, ...)`, `txt('☁️', 0, -22, 60, ...)`). Replace with an equivalent paper composition:
- **Ghost:** round top (`pE`), rect body (`pR`), three bump ellipses at the bottom, two dark eyes.
- **Cat face:** face ellipse (`pE`), two ear rects (`pR`), two dark eyes, one coloured nose.
- **Cloud hub icon:** three overlapping ellipses in `PR.glow` / `PR.creamL`.
- **Small floating hearts:** three ellipses (`pE`) forming a triangle.
- **Padlock (open/closed):** body `pR` + shackle arc `pE`; open = shackle offset up; closed = shackle centred over body.
- **Shield badge:** tall rounded `pR` + pointed bottom `pE`.
- **Eye badge:** outer `pE` + dark pupil `pE`.
- **Down-arrow:** stem `pR` + horizontal bar `pR` + triangle tip `pE`.

### Paired-card centering

Two side-by-side cards at `(cx1, y)` and `(cx2, y)` must satisfy `(cx1 + cx2) / 2 = 540`. With `w = 340`, the safe pair is **350 and 730** (gap = 60 px between inner edges; badge at 540 fits in that gap without overlapping text). The old default of 250 and 690 gives midpoint 470, which reads as left-shifted.

Also: any floating badge or label drawn **between** the two cards should be centred at x = 540, not at the pair midpoint calculated from an off-centre pair.

### Symbols ✓ ⚠️ ❌ ✅ ⛔ in txt()

Beyond the emoji grep, run:
```bash
grep -n "[✓✗✔✘❌✅⚠⛔]" src/scenes.js
```
These codepoints land in the `\x{2600}-\x{27BF}` or higher ranges but are worth checking explicitly. Fix:
- `txt('✓ TEXT', ...)` → `txt('TEXT', ...)` (the green colour of the containing bar conveys the ✓)
- `txt('❌ HEADER', ...)` → `txt('HEADER', ...)` (the red header fill conveys the ✗)
- `txt('✅ HEADER', ...)` → `txt('HEADER', ...)` same
- `txt('⚠️ TEXT', ...)` → `txt('TEXT', ...)` same; warning bar colour carries the meaning

### Solo-hero center is 540, not 480

All `withT`, custom helper, `prStamp`, and `prCommentBox` calls that position a **single** hero element use `cx = 540` (the 1080-wide frame centre). Every tidu-tech-01 through tidu-tech-10 had the same bug: solo heroes were placed at `cx = 480`, leaving a 60 px left-shift visible on screen.

Rule: after writing a new scene, grep for `480` as the first numeric argument of any position call:

```bash
grep -n "(480," src/scenes.js
```

Hits that are **not** a width/height argument (e.g. `pR(-240, 110, 480, 54, 12)` where 480 is `w`) must be moved to 540. A quick audit: if the number sits at the **first** position inside the parentheses and is not preceded by a minus sign on a bounding-box call, it is a centre x.

Intentional exceptions (paired-device layouts) are always two sibling calls whose x values straddle 540, such as `phone(350, y)` + `router(730, y)`. Single calls at 480 are never intentional.

## Tidu English series — additional rules

Learned from reviewing the 5 Tidu English videos (Vietnamese narration teaching English words to young children). They add to the general rules above; apply both. Every first-pass video broke rules 1–6.

### 1. A pause has a job, or it goes
The five first cuts ran 44–52 s with about 20 s of speech: `after` pauses of 5–10 s held a static frame (04's "One! Một." was 0.9 s of speech, then 7.4 s of silence). Pause budget for a kids' lesson:

| line | `after` (s) | what the frame does during it |
|---|---|---|
| hook | 0.8 | — |
| teaches a word | 1.8 | the taught word breathes (time to echo it) |
| quiz question | 4.2 | a 3-2-1 timer, 1 s per number from `VL('quiz').t1 + 0.4`, a `tick` on each number |
| answer | 0.8 | — |
| repeat / recap / dialogue | 1.0 | — |
| CTA (last) | 0.3 (+ `tail`) | — |

No frame stays static for more than ~2 s. Re-time without re-taking the voice: edit `after`, then `node tools/voice.mjs <piece>`; `reel voice` would re-take the TTS. On a Vietnamese piece the word times come from each take's `.words.json`, so `align.mjs` only reports what whisper heard and build/check/export need not wait for it (under load it ran ~30 min). Scenes that cue through `VL`/`VW` follow the new timing; anything hard-coded to the old pause (a 10 s timer) does not.

### 2. Text a child can read
- Every on-screen text is ≥ 32 px (the sign's kicker excepted). The teaching card shows one English word big (≥ 100 px) and its Vietnamese meaning; no usage sub-notes ("Dùng trong mọi hoàn cảnh · Lịch sự", "Trang trọng", "Luôn nói cảm ơn…"): they were 18–26 px and every one claimed something the voice never said.
- `txt()` has no line breaks: `'Good\nmorning!'` draws on one line. Two lines are two `txt` calls.

### 3. No glyphs as decoration
Letters or digits scattered on the wall with `txt` (`['A','B','C','D']`, `['1','2','3','4']`) read as stray characters, and in a counting lesson they are wrong numbers on screen. Background life is paper shapes: bunting, a clock, a door or window, pinned stars, toy blocks.

### 4. A kids' CTA is an action, never a comment box
A video for children is "made for kids", so YouTube turns comments off; and the CTA lines ask for something offline ("Hãy nói thử!", "tìm một đồ vật màu blue", "đếm năm đồ vật"). The CTA scene shows that action with its concrete things; no `prCommentBox`, no "BÌNH LUẬN" sign, no comment request in `youtube.md`.

### 5. The quiz plays fair
- The quiz frame never shows its answer: 04 labelled the remaining stars 1–4 under "Còn bao nhiêu ngôi sao?". No numbered items, no pre-highlighted or larger right card.
- Exactly one right option; the answer scene repeats that option's letter.
- What the quiz says happens, happens on screen: "giấu đi một ngôi sao" hides one; "ba hình sẽ đổi chỗ" swaps them, and the answer letter follows the triangle to its new place.
- A stamp says the narration's word: "Rất tốt!" stamps `RẤT TỐT`, "Đây rồi!" stamps `ĐÂY RỒI`, not `CHÍNH XÁC`.
- A counting quiz also tells by layout: four stars in a row before "giấu đi một ngôi sao" already shows the answer. Show the starting count, and do the hiding on the verb.
- When items move (đổi chỗ), the option letters sit on fixed slots (shelf tags), not on the moving cards: the answer letter follows from where the item lands, and no labels overlap mid-move.
- The answer scene reuses the quiz layout (same prop, same options, same places), marks the right option and fades the other on the answer word: the reveal reads at the cut and the letter matches by construction.
- The countdown sits centred (x 540) between the prop and the options; under one option it reads as a hint.

### 6. The hero is the people and things the line names
- "Gặp bạn mới" is two kids meeting; "cô giáo" is a woman (long hair or a bun, a skirt); "một bạn đưa sách cho bạn kia" is a book moving from one kid to the other on "đưa", with each bubble on its word. A text card alone, or a step diagram of a dialogue, is a miss.
- Characters stand on the floor in the lower band (y ≈ 1000–1470, x < 660, clear of the mascot); speech bubbles sit between the hero card and their heads with ≥ 20 px each side.
- Words must match: "ba cụm từ" is not "3 TỪ" (Thank you / You're welcome are phrases); a lesson on flat shapes is "CÁC HÌNH", not "HÌNH KHỐI" (3D solids) — check the series kicker too.
- An exchange (hand over a book, a gift, a glass) needs the giver's hand position: a character helper that returns where its hand is lets the prop be drawn there and travel with the arm on the spoken verb.

### 7. Containers never sit empty
The hero container is drawn at the cut; secondary containers (question bars, option cards, meaning pills, a teaching card whose word comes at the end of the line, the quiz timer) pop in whole on their word or, for the timer, at the countdown start (`popS(ts - 0.25)`). An empty navy bar, an "A [blank]" option card, a card holding only its divider or a numberless timer for 1–3 s reads as a rendering bug (04's quiz, 01's morning card, 03's and 05's timers).

### 8. Room for the hats and the bunting
- `prBunting(310)` hangs to about y 440 and runs past both frame edges; a hero card under it starts at y ≥ 450 (or draw a shorter bunting inside x 70–1010).
- Polly's tall hats reach up to y ≈ 1140–1160 (`guard`, `wizard`), and a raised wing holding `propCard` reaches y ≈ 1270 at x 620–750: check option cards, tables and bubbles in that corner against the scene's hat, or change the hat.

### 9. Template leftovers and silent misses
- `prFolder()` labels itself `SKILL.md` unless given `{ label }`: 01's teacher carried a Claude-template folder.
- A colour that is not in `PR` (01 used `PR.greenD`) silently reuses the previous fill; a `VW` word that is not in the line silently cues the line start.
- `node tools/cuecheck.mjs <piece>` checks both. It reads literal `VW('line', 'word')` calls only; check calls built from variables (`VW(id, w)` in a `forEach`) by hand.

### 10. English words in the voice audit
Whisper in Vietnamese mode writes English words as Vietnamese syllables ("Hi" → "khi"/"He", "Circle" → "sơ cầu", "Blue" → "Lui", "Two, three" → "Go high three"). That is usually its ear, not the take; list those lines for a person to listen to. A Vietnamese word heard as another word ("Chính xác" → "Thịnh Sắc", "đổi chỗ" → "nổi chỗ", "táo" → "đảo") is a re-take candidate (`reel voice <piece> --vieneu --tries 10 --only <id>`).

### Checklist additions (Tidu English)
1. `grep -n "SKILL\|prCommentBox\|BÌNH LUẬN" src/scenes.js` → nothing.
2. `node tools/build.mjs <piece> && node tools/linesheets.mjs <piece>`, then look at every sheet: the hero is there at the cut, every pause has its job, no text under 32 px, the quiz does not show its answer.
3. Total length ≈ speech + the pause budget (30–35 s for 8 lines); `youtube.md` claims no other length.
