# New Generation — Landing Page Design Specification

A measurement-grade specification derived from 10 reference frames in `/Users/abdullah.qamar/Signal/V1 References/`. Reference frames captured at ~900px wide rendering of a ~1440–1600px viewport design. Measurements below are normalised to a **1440px desktop viewport**. All px values are estimates fit for direct implementation.

---

## Frame inventory (what each PNG is)

| Frame | Section | State |
|------|---------|-------|
| 1 | Hero — landed | Static layout (initial paint) |
| 2 | Hero — scrolled ~80–120px | Static intermediate: headline has shifted up, image row pinned higher |
| 3 | Scatter animation — mid-frame | Animation in progress: 5 cards have begun staggering vertically |
| 4 | Scatter — settled into constellation | Static state at end of scatter; "Add to cart" pills are visible on hover/active |
| 5 | Scatter — section centre text fading in | Animation in progress: copy "Transform your online store…" appearing |
| 6 | Dark section entry | Transition: dark background has taken over; tail of constellation still visible at top; "Natural language, generative experiences" headline appearing |
| 7 | Dark "Natural language" section — empty centre | Animation in progress: video/media tile has not yet entered; only headline (top-left), intro (top-right), 3-col features (bottom) |
| 8 | Dark "Built for generative commerce" section — empty media area | Animation in progress: 3 feature columns settled at top; new headline + lede appearing below; media tile not yet rendered |
| 9 | Stepped feature section — settled | Static layout: large dark media tile (left), switchable list (right), nav arrows beneath the list |
| 10 | Light feature row + CTA + footer | Static layout: 3-icon feature row, full-width CTA pill, 3-column footer |

> Frames 3, 5, 6, 7, 8 are mid-animation. Frames 1, 2, 4, 9, 10 are static "rest" states.

---

## Global system

### Viewport & container
- Design viewport: **1440px** (max-width container ~1240px)
- Outer page side padding: **~150px L / ~150px R** (≈10.4% of viewport on each side). Content gutter ≈ 1140–1170px wide.
- Page background (light sections): **#FAF7F0** (warm cream / off-white, very slight yellow cast)
- Page background (dark section): **#0B0B0D** (near-black, slight cool-neutral)

### Top navigation (persistent across all frames)
- Height ≈ **72px** (logo baseline sits ~28px from page top).
- Logo: bars-mark glyph (~24×16px) + wordmark "New Generation" — **~18px**, weight **600**, tracking **normal**, color near-black `#111`.
- Right nav cluster: `NEW` chip + "Kepler", "Developer", "Work with us", "Blog".
  - Item type: **~14px**, weight **500**, color `#1A1A1A`, gap between items **~28px**.
  - "NEW" pill: ~26×16px, black bg `#111`, white text **~10px**, weight 600, uppercase, letter-spacing +0.04em, radius **3px**, inline before "Kepler".
- "Request demo" button (top right): black pill `#111`, white text **~13px** weight 500, padding **8px 14px**, radius **6px** (slight). Width ≈ 110px. Gap from last nav item ≈ **24px**.
- Nav side padding matches page container (≈150px each side).

### Type scale (Darker Grotesque)
| Token | Size | Weight | Line-height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 64 px | 500 | 1.05 | −0.02em | Hero "A new kind of AI for commerce" |
| Section-head | 36 px | 500 | 1.1 | −0.015em | "Natural language, generative experiences", "Built for generative commerce", "Fast to launch, easy to scale" |
| CTA-head | 28 px | 500 | 1.15 | −0.01em | "Would you like to see a demo?", footer "New Generation / AI-Native Commerce" |
| Lede | 16 px | 400 | 1.4 | normal | Hero subhead, dark-section intro copy, lede beneath section heads |
| Feature-head | 16 px | 600 | 1.3 | normal | "Instant activation", "Generate premium content" |
| Body | 14 px | 400 | 1.5 | normal | Feature column body copy, list-step body |
| Nav / button | 13–14 px | 500 | 1 | normal | Top nav, button labels |
| Micro / pill | 10 px | 600 | 1 | +0.04em uppercase | NEW chip |

The whole page operates on **5 type sizes** plus the micro chip. Tight, restrained scale.

### Color tokens
- Ink (light bg): `#111114`
- Body ink (light bg): `#2A2A2E`
- Cream bg: `#FAF7F0`
- Dark bg: `#0B0B0D`
- Ink-inverse (on dark): `#F4F1EA`
- Muted-on-dark: `#7E7E82` (faded list items in stepped section, "Understand real intent" / "Automate with control" pre-active)
- Button bg: `#111114`; button text: `#F4F1EA`
- CTA bar bg: `#F1ECE0` (slightly deeper cream than page bg)
- Footer link ink: `#1A1A1A` at full opacity (no underline)
- Divider rule: `#E5DFD2` (light sections), `#23232A` (dark section), **1px**
- Hover "Add to cart" pill on cards: translucent black `rgba(15,15,18,0.55)` with white text 11px, radius 4px, 5×8px padding.

### Radii
- Image / media tiles: **12px** corner radius (consistent on every card and on the dark media tile in Frame 9)
- Pills (CTA, buttons): **6px** for rectangular buttons; **999px** (full pill) for the wide "Would you like to see a demo?" bar
- NEW chip: 3px
- Hover "Add to cart" tag: 4px

### Section vertical rhythm
- Section top padding (desktop): **~120px**
- Section bottom padding: **~120px**
- Section-to-section: no gradient, **hard cut** of background color. Where two light sections meet, only whitespace separates them. Where light meets dark, the boundary is a clean horizontal seam.

---

## Frame 1 — Hero (initial)

**Identity.** Static landing state of the hero section. Cream bg.

**Layout.**
- From top of viewport → nav baseline: ~48px
- Nav baseline → top of headline: **~110px** of breathing room
- Headline left-aligned to container left edge (~150px from viewport edge)
- Image row spans full container width (~1140px) and sits **~80px** below subhead/CTA
- Bottom of image row to viewport bottom in this frame: ~70px (cards bleed nearly to fold)

**Typography.**
- Headline "A new kind of AI / for commerce": **64px**, weight 500, line-height 1.05, tracking −0.02em, color `#111`. Two lines, manual break after "AI". Width of text block ≈ 480px.
- Subhead "Deliver AI-native commerce experiences / across chat, agents, and generative interfaces.": **16px**, weight 400, line-height 1.4, color `#3A3A3F`. Sits **~28px** below headline. Two lines, ~360px wide.
- "Request demo" button: black pill, **~13px / 500**, padding 10×16px, radius 6px. Sits **right-aligned** at same vertical as the subhead block (its baseline aligns to the second line of subhead). Distance from subhead right edge to button left: ~470px (the button is anchored to the container right edge).

**Image cards row (5 portrait cards).**
- 5 equal-width portrait tiles, **aspect ratio ≈ 4:5 (portrait)**.
- Card width: **~195px**; card height: **~245px**.
- Gap between cards: **~24px**.
- Corner radius: **12px**.
- Card 1: still-life with vase/lamp (warm beige).
- Card 2: cosmetic bottle on cream backdrop.
- Card 3: portrait, dark-skinned woman in blue garment applying jewelry/lipstick.
- Card 4: interior, white room with glass furniture, orange accent.
- Card 5: torso/arms in mauve top crossing over black leggings.
- Row left-aligned to container; right-aligned to container (fills width).
- Distance from CTA row to top of image row: **~80px**.

**Spacing summary (hero):**
- Nav → headline: 110px
- Headline → subhead: 28px
- Subhead → image row: 80px
- Image row → next section start: ~140px

---

## Frame 2 — Hero scrolled (~100px progress)

**Identity.** Static intermediate. The page has scrolled so the headline is now near the top, subhead just below, and image cards have moved up to fill more of the viewport. This is the **pre-scatter** rest position.

- Nav still pinned at top
- Headline now sits ~40px below nav (vs 110px in Frame 1)
- Subhead → image row gap is unchanged (~80px)
- Image row now centred vertically in the visible viewport
- No animation cues yet — cards are still in tidy row.

This is effectively the trigger position: when the user keeps scrolling, the **scatter** begins.

---

## Frame 3 — Scatter (mid-animation)

**Identity.** The 5 image cards are mid-flight to their final constellation positions. Cards have desynchronised vertically and slightly horizontally.

**Animation read.**
- **Trigger:** scroll progress past the hero (scroll-driven, not autoplay).
- **What moves:** each card translates Y individually and translates X by small amounts; they retain their original L→R order.
- **Easing impression:** smooth, slightly damped (not snappy). Feels like `cubic-bezier(0.22, 0.61, 0.36, 1)` (easeOutQuint) over ~600–900ms equivalent of scroll.
- **Per-card behaviour at mid-frame:**
  - Card 1 (vase): moved DOWN ~50px from baseline; small X shift left.
  - Card 2 (bottle): moved UP ~30px.
  - Card 3 (portrait): moved DOWN ~60px (lowest); rotated 0°.
  - Card 4 (interior): moved UP ~60px (highest); slight X shift right.
  - Card 5 (mauve top): moved UP ~20px.
- Headline and subhead have **scrolled OUT** above the viewport. Nav remains.
- Background still cream.
- Small mini-thumbnail floats in bottom-right of viewport (~80×50px image, w/ thin border, radius 6px) — this is a **pinned preview** that persists from this frame through Frame 5 (showing the same constellation in miniature).

**Card sizes** during animation appear unchanged (~195×245). Some cards may scale ±2–4%, but not dramatically.

---

## Frame 4 — Scatter settled + hover pills

**Identity.** Static end-state of scatter. Cards in their final constellation positions. Each card now shows a small **"Add to cart"** pill — a hover-driven affordance.

**Constellation positions (approx, % of container):**
- Card 1 (vase): left ~3%, vertical centre, sits **lowest** (Y offset from row baseline: +20px).
- Card 2 (bottle): left ~22%, Y offset −80px (highest of left cluster).
- Card 3 (portrait): centre ~38%, Y offset +130px (lowest, dropped down). This card is the only one **vertically isolated below** the others.
- Card 4 (interior): left ~50%, Y offset −90px (top).
- Card 5 (mauve): right ~70%, Y offset 0 (anchored).

So the read is: cards 2, 4 rise; cards 1, 5 hold; card 3 drops well below — creating a loose **constellation** with an open centre.

**"Add to cart" pill (per card):**
- Centred horizontally on each card; vertically centred.
- Style: **dark translucent rect**, ~70×22px, white text "Add to cart" 11px / 500, radius 4px. Opacity ~70% of black.
- Indicates **hover/active state for all cards** in this captured frame (likely shown simultaneously to convey product affordance, even though in production they would appear individually on hover).

**Mini-thumbnail** in bottom-right persists.

---

## Frame 5 — Scatter + section copy emerging

**Identity.** Same constellation, with a new piece of copy fading in **inside the empty centre** of the constellation.

**Copy block.**
- Lines: "Transform your online store into an AI-native commerce / platform, for both humans and their agents."
- Style: **16px / 400 / 1.4 lh**, color `#1A1A1A`, **centre-aligned**, max-width ~520px.
- Sits in the negative space between card 4 (top) and card 3 (bottom), horizontally centred to the page.
- Vertical position: ~midway between top edge of top cards and top edge of card 3.

**Animation read.**
- Copy fades in (opacity 0 → 1) and translates up ~8px on scroll progress, after the scatter has settled.
- Duration ≈ 400ms equivalent.

**Background still cream.** Mini-thumbnail still pinned bottom-right.

---

## Frame 6 — Hand-off into dark section

**Identity.** Transition frame: the dark section has taken over **most** of the viewport. The bottom of the scatter constellation is still visible at the top (we can see the bottom edge of card 2 and card 3 with their "Add to cart" pills), but the rest of the viewport is now `#0B0B0D`.

**Boundary treatment.**
- **Hard horizontal cut.** No gradient. The cream colour ends; black begins on the next line.
- The cut happens part-way through the scatter section — likely the scatter section has a **cream background that ends just below the cards**, then the dark section begins.
- In production: the scatter section is a cream block ~150vh tall; the dark section starts immediately after.

**Dark section content (this frame, in-progress).**
- Headline "Natural language, / generative experiences" appears **left-aligned** at ~150px from left, ~380px from top of the dark section.
  - Style: **36px / 500 / 1.1 lh / −0.015em**, color `#F4F1EA`.
- Intro copy top-right, three lines: "Let customers ask for what they want in / their own words and generate real-time / experiences tailored to their intent and context."
  - **16px / 400 / 1.4 lh**, color `#D8D5CC`. Right-aligned to container.
  - Sits at same baseline as headline. Width ~310px.
- The video/media tile that will sit centre-bottom is **not yet visible** in this frame (still scrolling in / lazy-mounting).

---

## Frame 7 — Dark "Natural language" section, settled rest (still mid-animation for media)

**Identity.** Same dark section, more scrolled. Headline + intro are now near the top. Three feature columns have appeared at the bottom. The **centre media tile is missing** — strong implication that this is mid-animation; the media is fading in or scrolling in.

**Layout.**
- Container side padding: **~150px**.
- Section internal vertical breakdown (height of section ~720px):
  - Top padding: 96px
  - Headline + intro row: occupies top ~110px
  - Empty media well centred: ~400px tall × ~600px wide (placeholder area)
  - 3-col feature row at bottom, ~70px tall
  - Bottom padding: 96px

**Top row.**
- Headline left, intro right. Vertical alignment: **tops aligned**. Gap between them ≈ 250px of horizontal whitespace.

**3-column feature row (bottom of section).**
- 3 equal columns separated by a faint vertical rule `#23232A` 1px, full column height (~70px).
- Column padding (left of text → rule): **~30px**.
- Each column:
  - Title: **16px / 600**, ink-inverse `#F4F1EA`. Examples: "Invite conversation", "Generate on demand", "Always on brand".
  - Body: **14px / 400 / 1.5 lh**, color `#A8A4A0`. 2–3 lines.
  - Gap title→body: 6px.
- Column gap: ~40px between text blocks (the rule sits midway).

**Mini-thumbnail** still pinned bottom-right corner of the dark section, showing the upcoming **video tile** in miniature (~85×55px).

---

## Frame 8 — Dark section, second heading "Built for generative commerce" (mid-animation)

**Identity.** Another panel inside the dark section. We see the **bottom of the previous panel's feature row** (3 columns: "Answer in AI chat", "Prepare for agentic commerce", "Be discoverable at scale") at the top of the frame, and below it a **new** heading "Built for generative commerce" with its lede, plus an additional column "Generate premium content" peeking in at the lower right.

This frame captures the **scroll boundary between two stacked sub-sections within the dark canvas**:
1. Panel A: "Natural language, generative experiences" (Frame 7) with its 3-feature row.
2. Panel B: "Built for generative commerce" (Frames 8 & 9) with the stepped media tile + switchable list.

**Layout (Panel B intro).**
- New heading "Built for generative commerce" left-aligned at container left (150px).
  - **36px / 500 / 1.1 / −0.015em**, color `#F4F1EA`.
- Lede beneath, three lines:
  - "New Gen combines your product data with AI- / native generation to create content, interfaces, and / insights tailored for how people shop in the AI era."
  - **16px / 400 / 1.4**, color `#D8D5CC`. Width ~360px.
- Gap heading → lede: **20px**.

**Spacing between Panel A's feature row and Panel B's heading: ~180px** of dark whitespace (vertical gap).

---

## Frame 9 — Stepped feature section (static, settled)

**Identity.** Static rest state of Panel B. **Light cream background** (so this is actually a cream section — the dark section ended somewhere between Frame 8 and Frame 9). Layout: heading top-left, large media tile bottom-left, switchable list bottom-right with paginator arrows.

> Important correction: Panel B sits on **cream** background (frame 9 confirms cream). So the dark section is shorter than expected — it contains only Panel A from Frame 7. Panel B's intro in Frame 8 may have been the very end of the dark section, OR a brief crossfade. Most likely interpretation: Frames 6–8 are all dark; Frame 9 begins after a hard cut to cream. The "Built for generative commerce" heading repeats / lives in the cream section.

**Layout.**
- Container padding: ~150px L/R.
- Top: heading "Built for generative commerce" — **36px / 500 / 1.1 / −0.015em** color `#111`. Aligned to container left.
- Lede beneath (same copy as Frame 8 but now on cream): **16px / 400**, color `#3A3A3F`. Width ~360px.
- Gap heading → lede: 20px.
- Lede → media tile: **48px**.

**Media tile (left).**
- Dark `#0E0E11` panel, ~530×360px, radius **12px**.
- Contains an abstract **product page line-art mock** in white strokes (~1.5px stroke) — represents responsive layouts.
- Aligns to container left.

**Switchable list (right).**
- Sits at media tile's vertical centre, ~80px to right of the tile.
- 3 items, vertically stacked. Each item ~310px wide.
- Item structure:
  - Title (16px / 600, color `#111` if active, `#A0A0A0` if inactive)
  - Body (14px / 400 / 1.5 lh, color `#3A3A3F` active, `#A0A0A0` inactive)
- Gap title → body: 6px. Gap between items: **22px**.
- A **1px horizontal rule** `#E5DFD2` sits beneath each item (full-width across the list column, ~310px).
- Items captured:
  1. **Active** "Generate premium content" / "Use your product data, brand voice, and cultural context to create rich, relevant content."
  2. "Understand real intent" / "Get deeper insight into how customers think and search — powered by data from real conversations."
  3. "Automate with control" / "Streamline tagging, merchandising, and copy without sacrificing curation."
- Active item is **fully opaque**; inactive items are at ~35% opacity.

**Paginator (bottom of right column).**
- Two circular ghost-arrow buttons (~32px diameter), 1px ink stroke, ink arrow inside.
- Gap between arrows: ~12px.
- Sits ~28px below the last list item.

**Animation read.** Clicking an arrow advances the active list item and **swaps the media tile graphic** with a crossfade (~250ms). Likely also keyboard arrow controllable.

**Mini-thumbnail** persists bottom-right.

---

## Frame 10 — Feature row + CTA + footer (cream, static)

**Identity.** Three stacked components on cream bg: 3-column icon-feature row, full-width CTA pill, 3-column footer. This is the **bottom of the page**.

### 10a. "Fast to launch, easy to scale" feature row

**Layout.**
- Section top padding (from previous section bottom): ~120px.
- Heading "Fast to launch, easy to scale" — **36px / 500 / 1.1 / −0.015em**, color `#111`. Left-aligned to container.
- Heading → icon row: ~64px.

**Icon row (3 columns, equal width, separated by faint vertical rule).**
- Each column has:
  - **Icon block** (~40×40px): a small composition of two glyphs, e.g. a black square + a small inset arrow/circle. Render as solid black shapes (`#111`) on cream.
  - Gap icon → title: 24px
  - Title (16px / 600, color `#111`): "Instant activation", "Adaptable approach", "Effortless integration".
  - Gap title → body: 6px
  - Body (14px / 400 / 1.5, color `#3A3A3F`), 2 lines max.
- Vertical rule between columns: 1px `#E5DFD2`, spans from icon top to body bottom.
- Column gap: ~64px.

Bottom padding of this row → CTA pill: **~80px**.

### 10b. CTA pill

- Full-container-width bar, ~1140×100px, color `#F1ECE0` (slightly warmer/darker than page cream), radius **999px** (full pill / oblong).
- Left side: a small black square mark (~22×22px) acting as logo glyph, then headline "Would you like to see a demo?" — **28px / 500 / 1.15**, color `#111`. Left padding from pill edge: ~32px; gap between mark and text: 16px.
- Right side: "Yes, sign me up" button — black pill `#111`, white text 13px / 500, padding 10×18px, radius 999px. Right padding from CTA bar edge: ~24px.
- The whole CTA pill is internally centred vertically.

CTA pill → footer: **~100px**.

### 10c. Footer

- 3 columns, cream bg.
- Column 1 (brand):
  - "New Generation" — **28px / 500 / 1.15**, color `#111`.
  - Sub-line "AI-Native Commerce" — same size/weight, color `#7E7E7E` (muted ink).
  - The two lines have line-height 1.15; the sub-line is the second line of the same block.
- Column 2 (links):
  - Stacked items, 14px / 400, color `#1A1A1A`, gap **8px**:
    - "Get in touch"
    - "Work with us"
    - "Read our Blog"
- Column 3 (right):
  - Top: "Back to top ↑" — 14px / 400, color `#1A1A1A`, right-aligned.
  - Beneath, ~28px gap: "LinkedIn", "X" — same style, 8px gap.
- Footer top padding: ~40px. Footer bottom padding: ~40px. Total footer height ~140–160px.
- No top border on footer. Whitespace is the separator.

---

## Section-to-section boundaries (summary)

| From → To | Boundary |
|-----------|----------|
| Hero → Scatter | Same cream bg; only vertical whitespace (~140px). Scatter is the SAME section animating. |
| Scatter → Dark "Natural language" | **Hard cut** cream → `#0B0B0D`. Tail of cards may protrude into top of dark section briefly (Frame 6) — implementation choice: overlap of ~80px. |
| Dark Panel A → Dark Panel B intro | Same dark bg; ~180px whitespace between feature row and next heading. |
| Dark → Cream stepped section | **Hard cut** dark → cream. (Frame 8's "Built for generative commerce" likely sits AT this seam — heading appears on cream, the dark panel ends just above it.) |
| Stepped → Feature row | Cream → cream, whitespace ~120px. |
| Feature row → CTA pill | Cream → cream, whitespace ~80px. |
| CTA pill → Footer | Cream → cream, whitespace ~100px. |

---

## Cross-cutting design language

**Aesthetic.** Editorial, calm, near-monochrome. Warm cream + near-black + a single accented dark section. No saturated brand color — accent comes from the warmth of the cream and the photography in the hero cards. No green dot, no chips beyond the "NEW" tag. The only "color" lives inside the photographs.

**Typography.** Darker Grotesque throughout, weights 400/500/600. Tight tracking on display sizes (−0.02em), normal elsewhere. Display is set at modest size (~64px) — not gigantic; the page leans on whitespace, not type-as-graphic. Headlines are always two lines with intentional line breaks.

**Spacing tokens (desktop, 1440px viewport).**
- `--container-pad-x: 150px`
- `--section-pad-y: 120px`
- `--row-gap: 80px` (between major rows inside a section)
- `--head-to-lede: 20px` (section head → lede beneath it)
- `--head-to-subhead-hero: 28px`
- `--lede-to-content: 48px`
- `--card-gap: 24px`
- `--column-gap: 64px`
- `--list-item-gap: 22px`

**Radii.**
- `--radius-tile: 12px` (image cards, media tiles, dark video panel)
- `--radius-button: 6px` (square-ish CTAs in nav)
- `--radius-pill: 999px` (CTA bar, "Sign me up", in-card "Add to cart")
- `--radius-chip: 3px` ("NEW" chip)

**Dividers.**
- 1px solid. `#E5DFD2` on cream, `#23232A` on dark. Used only between columns of feature rows and beneath list items in the stepped section. No thick rules anywhere.

**Buttons.**
- Primary (top nav): black bg `#111`, white text, 13px/500, radius 6px, padding 10×16px.
- Primary (CTA bar): same colors, radius 999px, padding 10×18px.
- Ghost (paginator arrows): 1px ink stroke, 32px circle, ink arrow.
- In-card pill ("Add to cart"): translucent `rgba(15,15,18,0.55)`, white text 11px/500, radius 4px, padding 5×8px.

**Iconography.**
- Tiny (~40px), purely geometric: black square + a counter-shape (arrow, circle, smaller square). Always solid black on cream. Consistent visual weight.

**Photography.**
- All hero cards are portrait-orientation product/lifestyle shots with **muted, warm palettes** — beige, cream, terracotta, mauve, deep blue accent. None is bright or saturated. Treat as editorial fashion/beauty references.

**Animation language.**
- Scroll-driven scatter is the headline motion. Damped easing, individual per-card Y/X translations. No bounce.
- Copy fades + small Y translate (8px) on enter.
- Stepped section: list selection swaps media tile with crossfade (~250ms).
- Hover affordance on hero cards reveals an "Add to cart" pill — fast (~120ms) fade.
- Mini-thumbnail in bottom-right pins through the scatter and dark section; likely a **table-of-contents / scroll-progress** affordance.

**Tone.**
- Generous whitespace. Headlines are never crowded. The page reads slowly. Nothing is centred except the small "Transform your online store…" paragraph that lives inside the constellation. Everything else hugs the container left edge or splits left/right.

---

## Implementation priorities for downstream engineers

1. **Get the cream right.** `#FAF7F0` is the entire feel. Test on multiple monitors; a too-yellow cream kills the editorial mood.
2. **Container is 1140–1170px inside a 1440px viewport.** Do not let content go full-bleed on desktop (the dark section's content also respects this gutter).
3. **The scatter is the showpiece.** Implement as scroll-driven, per-card translate Y values, easing `cubic-bezier(0.22, 0.61, 0.36, 1)`. Final constellation positions are the ones in Frame 4 — measure off that frame for production.
4. **The "section" structure is six blocks**: Hero+Scatter (one section, ~2 viewports tall) → Dark "Natural language" → Stepped "Built for generative commerce" (cream) → "Fast to launch" feature row → CTA pill → Footer.
5. **Type scale is small.** Resist the urge to ship a 120px display headline; the reference uses ~64px.
6. **Vertical rules between feature columns are 1px and very low-contrast.** Easy to miss; easy to over-do.
