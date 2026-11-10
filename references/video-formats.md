# Narrative video formats (F01–F07)

A narrative format is a story contract: a fixed order of five stages, a duration range, and what each stage must show, how it moves and how it ends. The machine-readable contracts live in `formats/F01.json` … `formats/F07.json`. Each carries a `learningGoal`, the `stages`, `reviewQuestions` for the human review, `sources` with the scope each one supports, and a complete Vietnamese sample piece (`example`) that `reel new --format` copies, so a new piece starts from a working story, not an empty template.

Why the contracts look like this, which parts rest on evidence and which are editorial choices: [video-format-research.md](video-format-research.md). In short:
- The duration ranges come from the product brief, not from research; no source here shows that one length or cut rhythm teaches better.
- The F05 countdown of 3–5 s, the 0.15–0.2 s breaths, the layout bands and the 4 words/s preview rate are editorial defaults; adjust them per audience and difficulty.
- The five-stage orders come from the product brief. The cited research informs their learning goals and design choices; it does not validate these exact five-stage recipes or promise better Shorts retention.

Legacy pieces (no `narrativeFormat` in `piece.json`) are unaffected: they keep the starter's 18–25 s hook → how → catch → kicker → comment-CTA arc in [SKILL.md](../SKILL.md).

## Workflow

```bash
REEL=<skill dir>/bin/reel
$REEL formats                                   # list the seven contracts
$REEL new pieces/<name> --format F01            # copy the format template plus its sample story
#   edit narrative.json and voice/script.json together (see "Piece files")
$REEL formatcheck pieces/<name>                 # stage order, line mapping, nominal timing, quiz rules
$REEL build pieces/<name> --preview             # synthetic timing at 4 words/s, no TTS needed
$REEL still pieces/<name> 1,8,20,35 look.png --preview
$REEL voice pieces/<name> --vieneu --voice "Trúc Ly"   # the real voice and word times
$REEL formatcheck pieces/<name> --require-voice # real timing: order, duration, quiz countdown
$REEL check pieces/<name>
$REEL export pieces/<name> out.mp4
```

- **Preview is synthetic.** `--preview` times every line at 4 whitespace-separated words per second plus its `after` gap. It is for judging layout and story order before making a voice; the build is marked non-publishable, and `export` needs real voice timing.
- **`formatcheck` checks structure, not truth.** It verifies stage order and coverage, unique line ids, that `voice/script.json` matches the narrative line for line, duration against the contract, and the quiz rules. It does not check facts, pedagogy, or whether a frame shows its line: the `reviewQuestions`, [review-rules.md](review-rules.md) and a person do that.
- Without `--require-voice`, missing real timing is a warning. Before export, run it with `--require-voice` so the real takes are held to the contract; real Vietnamese takes are often faster or slower than the preview.
- The renderer ships complete sample illustrations, not a text-to-animation model: `subject: "savings"` (F02), `"circuit"` (F04), `"cookies"` (F05), `"plant"` (F06), `"friction"` (F07). These select the corresponding example artwork. Omit `subject` to use the generic structural view, or adapt the piece's `src/scenes.js` for another concrete subject, as with existing pieces. `stage.layout` and `stage.motion` are authoring/review requirements, not executable animation instructions.
- Default layout capacities: F01 has 1–2 items; F03 has 1–3 comparison rows; F04 has 1–4 layers; F05 has 2–4 choices; F06 has 1–6 state labels. Larger compositions require adapting both the scene layout and the corresponding validator capacity.
- `--preview` always uses the current script and leaves existing `voice.json` and WAV untouched. It can be used while real timing is stale; publication still requires rebuilding the voice.
- Narrative pieces use restrained, cue-only audio by default, not the legacy starter's continuous music bed.

## Piece files

| file | what |
|---|---|
| `piece.json` | `"narrativeFormat": "F01"` (absent on legacy pieces), name, title, the Vietnamese fonts |
| `narrative.json` | `{ "format": "F01", "beats": [...] }`, one beat per stage in contract order; each beat has `stage`, a 2–5 word `title`, `lines` and `visual` |
| `voice/script.json` | the same lines flattened in the same order, with the same `id`, `text` and `after` |

Line rules for every format:
- One sentence per line, at most about 18 words. A stage may have several lines; most need one to four.
- Line ids are unique across the piece, start with a letter, and are never `voice`.
- `after` is a natural breath, 0.15–0.2 s; the only long pause is the F05 thinking line. Duration comes from what is said; never pad a thin script with silence.
- Display text in `title` and `visual` is plain Vietnamese: no emoji, no arrows, no tick or cross glyphs (draw `prCheck` / `prCross` instead), and it never claims more than the narration says.
- Every beat of one format uses the same `visual` keys; the values change from beat to beat to carry the story.
- Nominal duration = `lead` + spoken words / 4 + the `after` gaps between lines + `tail`; it must sit inside the contract's range. The samples sit in the lower half or the middle of each range.

Scenes: one beat is one stage with a stable diagram. Lines inside a beat change what is emphasised (a highlight, a mark, a step drawn on the same object) on the words that name it; the big change (new layout, new wall, mascot hat) happens at the stage boundary, where the meaning changes. The legacy rule of a new wall, a new hat and three background details on every sentence does not apply to format pieces; keep the paper look, the Vietnamese fonts and the channel mascot.

Endings: each format closes the way its last stage says: a practice item, a question back to the viewer, a safe thing to try, or an everyday thing to notice. The comment-keyword CTA ("comment WORD") and the product-pitch kicker belong to the legacy starter only. Content for children never asks for comments (see the Tidu English rules in review-rules.md).

Shared layout bands (from [style.md](style.md) and [layout-rules.md](layout-rules.md)): sign 140–296, optional strip 322–400, hero band 420–1300, caption chips 1450–1600 (no other text), mascot bottom right, nothing in the phone-UI corner. Paired cards centre at x 350 and 730; a solo hero at x 540.

## Custom Tidu Math illustrations

The seven Tidu Math productions (pieces 07–13) use their own mathematical objects rather than the sample artwork. In `piece.json`, set `"scenes": ["kit/math-format.js", "src/scenes.js"]` to load the shared math stage shell before the piece's painter.

`kit/math-format.js` installs the five stage boundaries, paper backgrounds, progress dots, channel sign, preview watermark and spoken captions. The piece defines `renderBeat(beat, index)`, calls `mfInstall(renderBeat)`, and supplies `SFX_CUES()`. Use `{ mascot: false }` as the second `mfInstall` argument when the character belongs inside the story, as in the cake-sharing piece.

`MF_TIMES` exposes the stage spans; `mfLine(beat)` identifies the current spoken line. `mfText`, `mfCard`, `mfArrow` and `mfOwl` provide the shared drawing treatments. Mathematical objects, conserved counts, geometry and word-triggered changes remain the piece's responsibility; use `VL` and `VW` for the actual aligned takes. Prefix private globals to avoid collisions with the concatenated kit (for example, `LX` and `LY` already belong to the core).

With the corner mascot enabled, captions use at most two words and end at x 680, leaving room for the owl's hat. The character-story layout can disable that mascot and retain the full caption width.

The shell does not replace the format contract or review. Check that the illustration proves the narrated mathematics, inspect the opening frame and spoken-line pauses, and rebuild after changing voice timing. For a quiz, keep the title and opening choices free of answer hints, and preserve the full silent countdown before the reveal.


## F01 — Câu hỏi và giải thích (question → explanation)

25–60 s. Sample "So số thập phân" (math, about 42 s): which is larger, 0,5 or 0,25?

| stage | must do | layout | motion | ends on |
|---|---|---|---|---|
| `question` | ask one concrete question the viewer can try | question card 420–760; two item cards at x 350 / 730 in 800–1150; answer slot "?" | question card there at the cut; items pop on their names | the open question, no hint |
| `misconception` | say the tempting wrong rule and why it feels right | item cards keep place; wrong rule replaces the question card | rule writes on as spoken | doubt, never the answer |
| `explanation` | reason step by step on the same items and give the replacement rule | one visible change per line on the items | each change on its word; earlier changes stay | items comparable, answer still "?" |
| `reveal` | state the answer, confirm with a second representation | answer card 420–760; winner marked, other faded | answer stamps on its word; misconception crossed | answer readable through the pause |
| `takeaway` | one reusable rule plus a fresh practice item | rule card; new unmarked practice items | rule writes on | the practice question |

`visual`: `{ question, misconception, answer, items[], groups? }`. `misconception` and `answer` stay `"?"` until their stage. Optional `groups` are integers for arithmetic manipulatives, one per item; the sample shades hundredths in a 10x10 grid (`[50, 25]`) from the explanation on, and leaves it `[]` while the answer must stay hidden and on the unmarked practice item.

## F02 — Câu chuyện nhân vật (character story)

40–90 s. Sample "Hũ tiết kiệm của Lan" (money, fictional, about 51 s): a girl saving for a bicycle tries "save what is left", then "save first".

| stage | must do | layout | motion | ends on |
|---|---|---|---|---|
| `character` | one named character and a goal | character (mascot or paper figure, same identity in every beat) 420–1050 at x 540; bubble above; goal props 1080–1300 | character there at the cut; bubble on the goal's first word | the goal, nothing wrong yet |
| `problem` | the obstacle shown through everyday actions | same character slot; problem props in a row | each prop drops on its name; mood changes on the problem word | character stuck |
| `attempts` | at least one failed attempt and one changed approach | one prop change per attempt | failed attempt fades or gets a soft cross; new approach on its verb | the new approach in action |
| `consequence` | honest result; partial progress counts | progress prop is the hero | progress grows on its word | result with the remaining gap visible |
| `lesson` | a transferable idea framed as something to try | two-phrase lesson card 420–760 | phrases write on | a question to the viewer |

`visual`: `{ name, dialogue, mood, items[], subject? }`; `subject: "savings"` selects the sample's wallet/jar/bicycle illustration. `mood` is a mascot mood from kit.js: `happy`, `wow`, `flat`, or `calm` (neutral face). `example.fictional: true` is copied into `narrative.json`, labels the video as invented, and should also be stated in `youtube.md`; never present one story as evidence that its lesson works for everyone.

## F03 — So sánh có điều kiện (conditional comparison)

30–60 s. Sample "Sổ giấy hay điện thoại" (mind, about 44 s): where to keep a to-do list.

| stage | must do | layout | motion | ends on |
|---|---|---|---|---|
| `options` | two real options; say the answer depends | option cards at x 350 / 730 in 420–700; criteria table 740–1250; condition strip 1270–1380 | both cards there at the cut, equal | equals, no winner implied |
| `criteria` | name the criteria before judging | criterion labels in the table, cells "?" | each label on its word | all criteria, all cells "?" |
| `comparison` | fill each row for both sides, as situations, not universal tendencies | cells under their option card, fitted to width | row by row on spoken words; `prCheck` / `prCross` shapes, never glyphs | each option wins at least one row |
| `conditions` | map situations to options | fitting option highlighted, other faded, then swapped | highlight switches on each situation word | both options have had a turn |
| `conclusion` | no universal winner: choose by situation or combine | both cards at full strength | same bounce for both | a question about the viewer's situation |

`visual`: `{ left, right, rows: [{ label, left, right }], condition }`. Left stays left and right stays right for the whole piece; every row compares the same criterion on both sides. Never stamp one option as the winner.

## F04 — Hệ thống và quy trình (system / process)

45–90 s. Sample "Bên trong đèn pin" (tech, about 53 s): a simple battery flashlight, a closed loop lights the bulb. It is a simplified DC circuit, not a model of every electrical system.

| stage | must do | layout | motion | ends on |
|---|---|---|---|---|
| `system` | the whole system doing its job; ask what happens inside | object 420–1000; layer strip 1060–1200; detail card 322–400 | object there at the cut; its job happens on its word | outside behaviour, inside closed |
| `components` | name each part once, in process order | exploded view; part above its tag; active tag lit | each part slides out on its name | all parts labelled, nothing moving |
| `process` | run the key action, before and after | parts reassembled, gaps visible | key part changes state on its verb | right after the key action |
| `mechanism` | why the action causes the effect | flow traced along the parts in layer order | flow starts on its word; a break stops it on its word | mechanism visible |
| `result` | cause-and-effect rule plus one practical consequence | object doing its job; rule in the detail card | job repeats on the rule's key word | a real-life moment to notice it |

`visual`: `{ layers[], active, detail, subject? }`. `layers` keep one order in every beat; `active` is a valid index into it; the sample sets `subject: "circuit"`. Arrows show flow, they do not explain the mechanism by themselves; the narration does.

## F05 — Đố vui có đếm ngược (quiz with countdown)

15–45 s. Sample "Đố nhanh bốn giây" (math, about 31 s): 3 boxes of 4 cakes, 2 eaten.

The MP4 is a linear, participatory quiz: the viewer answers in their head (or pauses the video). It takes no clicks, keeps no score and shows no invented audience statistics.

| stage | must do | layout | motion | ends on |
|---|---|---|---|---|
| `challenge` | a short fair problem with every number needed and the time allowed | problem card 420–760; objects 780–1050 | card there at the cut; objects on their names | full problem, no hint |
| `options` | the choices, including the ones common slips produce | equal choice cards in fixed slots 1070–1300; countdown slot at x 540 | each choice on its word; none pre-marked | every choice equal |
| `thinking` | silent time to commit | countdown centred at x 540 between problem and choices | exactly one spoken line, then one tick per second during its pause; no sound cue hints at the answer | zero before the answer cut |
| `answer` | reveal the one correct choice | same layout; correct card marked, others faded | mark and fade on the answer word | answer readable |
| `explanation` | the working, then the slip behind the most tempting wrong choice | working card replaces the problem card; choices stay | each step on its word; a wrong card lights while its slip is explained | an invitation to make or try a similar problem |

`visual`: `{ question, choices[], correct, countdown, explanation, subject? }`; `subject: "cookies"` selects the sample illustration of three boxes with four cakes each. Omit it for a generic question card when authoring a different quiz.
- `choices`, `correct` and `countdown` are identical in all five beats; `correct` is a valid index. The 3–5 s countdown is an editorial default.
- `explanation` is `""` in `challenge`, `options` and `thinking`; neither narration nor visuals give the answer before the `answer` stage.
- The sample `thinking` stage has one line; several invitation lines are allowed. The **last** line's `after` must be at least `countdown + 0.1` s. Countdown starts at its spoken end, and the answer scene cuts 0.1 s before the answer line starts; `formatcheck --require-voice` checks the actual gap. Positive integer countdowns other than 3–5 s are allowed within the video's total duration.

## F06 — Biến đổi trước và sau (transformation)

25–60 s. Sample "Hạt đậu nảy mầm" (science, about 39 s): a dry bean, water, warmth and air, root then shoot, first leaves.

| stage | must do | layout | motion | ends on |
|---|---|---|---|---|
| `initial` | a starting state clear enough to compare later | subject 420–1050 at x 540; stage track with labels 1080–1200; trigger tag 322–400 | subject there at the cut, still | the unchanged start |
| `trigger` | what starts the change, stated as conditions | trigger items around the subject | each item on its name; progress moves a little | conditions in place |
| `change` | visible intermediate steps in their real order | subject morphs in place; current label lit, earlier labels stay lit | each step on its word; no jump to the end | clearly changed, not finished |
| `result` | end state beside the start, with honest qualifiers on time and conditions | end state; small before-thumbnail at the track's left | final step on the result word | before and after together |
| `implication` | what it teaches, including when it does not happen | both states visible; takeaway in the trigger tag | takeaway writes on | a small safe thing to try |

`visual`: `{ before, after, progress, trigger, labels[], subject? }`; the sample sets `subject: "plant"`. `progress` is 0–1, never decreases, and is a qualitative stage track, not a measured percentage. Qualify time and outcomes ("thường", "có thể", "tùy nhiệt độ"); no invented durations, percentages or growth charts.

## F07 — Giả sử và thực tế (hypothetical → reality check)

40–90 s. Sample "Nếu không có ma sát" (science, about 52 s): a world without friction between surfaces, then where friction helps.

| stage | must do | layout | motion | ends on |
|---|---|---|---|---|
| `hypothesis` | state the "what if" and label it imagined | hypothesis card 420–700 with a "GIẢ ĐỊNH" tag; everyday scene 740–1300 | card there at the cut; scene shifts to the imagined look on its word | the imagined world, labelled |
| `assumptions` | change one condition and say what stays as in the real world | assumption tags 720–1000 | each tag on its word | every assumption visible |
| `consequences` | everyday consequences, one per line, qualitative only | one small scene per line; list grows in a side column | each action on its verb | full list, still labelled imagined |
| `reality` | return to the real world; say which assumption does not hold | "THỰC TẾ" tag replaces "GIẢ ĐỊNH" (not only a colour change); reality card; real examples | world snaps back on the return word | reality readable, visibly different |
| `takeaway` | one balanced takeaway and a moment to notice it | takeaway card 420–700; small hypothesis card keeps its tag | takeaway writes on | something to notice in daily life |

`visual`: `{ hypothesis, assumptions[], consequences[], reality, takeaway, subject? }`; the sample sets `subject: "friction"`. `reality` shows an unchecked state and `takeaway` shows `"?"` until their stages. Consequences follow from the stated assumptions and stay qualitative: with air resistance unchanged, a sliding ball "goes much further", not "never stops". The sample's physics principle is sourced to OpenStax College Physics 2e in `formats/F07.json`.

## Review

Each contract's `reviewQuestions` are the format-specific review. The general review still applies to every format piece: [layout-rules.md](layout-rules.md), [review-rules.md](review-rules.md) (no emoji, text fitted to its container, the hero shows the line's concrete thing, no invented numbers, screen text no stronger than the voice, voice audit). Facts in narration, visuals and `youtube.md` are checked by a person against a primary or reputable source; no tool here does it.

## Verification snapshot

The implementation was exercised with all seven generated samples: creation, contract validation, preview build, Canvas rendering, text overlap/safe-zone checks, and deterministic frame checks. The 24 contract regression tests pass. Quiz countdown boundaries were visually inspected; exporting a preview without measured voice was refused. Legacy starter creation still works.

The generated-sample verification above used synthetic timing. The seven custom [Tidu Math productions](../pieces/tidu-math-format-demos.md) (pieces 07–13) additionally use real Trúc Ly narration, aligned word timings and 1080×1920/30 fps H.264/AAC MP4 exports. Their final builds passed strict format checks, sampled text checks and deterministic-frame checks; opening, stage and spoken-line frames and encoded-video previews were visually reviewed. ASR is a screening aid, not a guarantee of pronunciation: listen to the final mixes before posting.
