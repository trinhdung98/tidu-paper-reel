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

1. `grep -nP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src/scenes.js` returns nothing (no emoji, no ✓ ✗).
2. `grep -n "→" src/scenes.js` returns nothing inside `txt` / `prSign` strings.
3. `grep -n "chalk(" src/scenes.js`: every hit draws only digits and symbols.
4. `grep -n "prNote(" src/scenes.js`: every hit passes `x, y, w, h, fill, rot, key`.
5. The layout greps in [layout-rules.md](layout-rules.md#verification-checklist-run-before-reel-check).
6. Frame 0 plus two frames per line rendered and looked at: hero matches the line and is there at the cut, nothing off-frame, no overflow, no empty middle.
7. `python3 tools/voice_audit.py <piece>`: no line whose heard text changes the meaning.
8. `$REEL check` says `text: PASS` and `deterministic: true`.
