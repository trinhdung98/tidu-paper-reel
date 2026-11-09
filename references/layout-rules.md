# Canvas layout rules

Learned from reviewing 10 Tidu Money videos. Apply these when writing `src/scenes.js` and check them before every export.

Frame: **1080 × 1920 px**, 30 fps. Canvas centre: **x = 540**.

---

## Horizontal centering

### Solo hero element
Any single card, stamp, basket, cup, phone, or shield that sits alone in the frame:

```
cx = 540    ← always
```

**Why people get this wrong:** the mascot is in the bottom-right corner, so the temptation is to shift the card left to "make room". The mascot only occupies y > 1430 at the bottom edge — it does not compete with the mid-screen. A card at cx = 470 leaves a 320 px right margin vs a 180 px left margin; it looks broken.

### Paired elements (two items side by side)
Their geometric midpoint must be 540.

```
left  = 540 − gap/2
right = 540 + gap/2
```

| Desired gap | left | right |
|---|---|---|
| 340 px | 370 | 710 |
| 380 px | 350 | 730 |
| 400 px | 340 | 740 |
| 440 px | 320 | 760 |

Example: `tmJar(370, y)` + `withT(710, y, ...)` → midpoint 540 ✓

### Three-column group
| Card width | Column centres | Left edge of col-1 |
|---|---|---|
| w = 280 (30 px gap) | **230, 540, 850** | 90 px ✓ |
| w = 240 (30 px gap) | **270, 540, 810** | 150 px ✓ |

**Do NOT use 190 / 500 / 810** for w=280 — col-1 left edge lands at x = 50, inside the wall behind the sign (safe boundary is 70 px).

**Text inside column 3 must still end at x ≤ 960**, the right phone-UI margin `reel check` watches at every height. With w = 280 at 850 the card edge is 990, so fit the label to ≤ 220 px (or use w ≤ 260 at **260, 540, 820**); a pop's overshoot also counts.

---

## Safe zone

```
x ∈ [70, 1010]
y ∈ [310, 1500]
```

| Band | What lives there |
|---|---|
| y 140–296 | Sign (do not place content) |
| y 310–1430 | Hero props, cards, stamps, text |
| y 1430–1520 | Mascot upper body (overlaps are hidden by the floor) |
| y 1520–1640 | Caption chips — keep ALL other elements out |
| y > 1640 | Mascot legs and phone UI chrome |

---

## Vertical stacking

When two elements are stacked, check the gap before writing the code:

```
gap = y_lower − h_lower/2 − (y_upper + h_upper/2)
gap must be ≥ 20 px
```

Example that caused a bug: phone centred at y = 720, h = 540 → bottom edge at 990. Speech bubble at y = 1030, h = 90 → top edge at 985. Gap = 985 − 990 = **−5 px** (overlap). Fix: move bubble to y = 1055 → gap = 1010 − 990 = 20 px ✓.

---

## Dynamic-width bar segments

Any segment whose pixel width is computed from a ratio (e.g. 5% of 580 px = 29 px) can be narrower than its text label. Guard with:

```js
const segW = Math.max(MIN_FOR_LABEL, totalW * ratio);
```

Where `MIN_FOR_LABEL` ≈ label text width + 20 px padding. For a label like `'5% ĐÃ TRẢ'` at size 14 bold (≈ 75 px), set `Math.max(85, ...)`.

Without this, the label bleeds into the adjacent segment.

---

## Redundant background rectangles

Do **not** draw a plain background rect then immediately cover it with an identical-sized coloured rect:

```js
// ✗ wrong — paperW is never seen
pp(pR(-w/2, -h/2, w, h, 12), PR.paperW, { key: 'bg', ... });
pp(pR(-w/2, -h/2, w, h, 12), PR.green, { key: 'bar', shadow: false, ... });

// ✓ correct — draw the coloured bar directly
pp(pR(-w/2, -h/2, w, h, 12), PR.green, { key: 'bar', sb: 10, sy: 5, tex: 0.4 });
```

Keep the background only when it is intentionally a larger or differently-shaped underlay (e.g. a card behind a narrower coloured header).

---

## Text width in fixed-width cards

Canvas does not clip or wrap `txt()`. Estimate before you code:

```
text_px ≈ font_size × 0.6 × char_count   (sans-serif approximation)
```

| Card width | Side padding | Usable slot | Max chars @ size 21 | Max chars @ size 18 |
|---|---|---|---|---|
| 580 px | 20 px each | 540 px | ≈ 43 | ≈ 50 |
| 620 px | 24 px each | 572 px | ≈ 45 | ≈ 53 |

`$REEL check` catches overlap between separate elements but **cannot** detect text overflowing its own card. Check it yourself or reduce the font size.

---

## Cross-scene visual consistency

When the same widget appears across consecutive scenes (e.g. a week-tracker bar, a checklist), it must use the **same y coordinate** in every scene. A jump of even 40 px is jarring on a hard cut.

```js
// ✗ wrong — bar jumps on cut between scenes
// scene days13:  tmCalendarWeek(540, 480, 3, ...)
// scene day7:    tmCalendarWeek(540, 520, 7, ...)   ← 40px jump

// ✓ correct — same y throughout
// scene days13:  tmCalendarWeek(540, 480, 3, ...)
// scene days46:  tmCalendarWeek(540, 480, 6, ...)
// scene day7:    tmCalendarWeek(540, 480, 7, ...)
```

---

## Verification checklist (run before `$REEL check`)

### 1 — Off-centre hero grep
```bash
grep -n "withT(470\|withT(450\|prStamp('[^']*', 470\|prStamp('[^']*', 450" src/scenes.js
```
Every hit is a miscentred element. Valid exceptions: intentional asymmetric layouts where the element's partner brings the pair midpoint to 540 — confirm by computing `(x1 + x2) / 2`.

### 2 — Column left-overflow grep
```bash
grep -n "tmColumn(190\|withT(190," src/scenes.js
```
190 as the first column centre for a w=280 group puts the left edge at x = 50 (< 70 safe zone). Should be 230.

### 3 — Paired-element midpoint check
For every scene with two side-by-side elements at `(x1, y)` and `(x2, y)`:
```
(x1 + x2) / 2 == 540 ?
```
If not, shift both: `x1 = 540 − (x2 − x1) / 2`, `x2 = 540 + (x2 − x1) / 2`.

### 4 — Vertical gap check
For every stacked pair `(y_upper, h_upper)` and `(y_lower, h_lower)`:
```
y_lower − h_lower/2 − (y_upper + h_upper/2) ≥ 20
```

### 5 — Cross-scene y consistency
For any widget that appears in 2+ scenes: its `cy` argument must be identical across all occurrences.
