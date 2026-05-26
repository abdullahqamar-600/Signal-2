# VISUAL.md — Leadership Summit 2026, Visual Language

The visual system for variation 5 onwards. Built from the V5 reference frames (`/V5 References/1–7.png`) and the Leadership Summit logo. Overrides the typography section of CONTEXT.md.

The references come from a single cohesive landing layout. Each frame is a section of one page. Numbered in scroll order:

| Frame | Section role |
|---|---|
| 1 | Hero |
| 2 | Image continuation, trust strip, intro panel |
| 3 | Mission card pair (yellow + dark) |
| 4 | Numbered advantages |
| 5 | Accordion offering rows, testimonial intro |
| 6 | Testimonial carousel + avatar rail |
| 7 | Featured event card |

---

## 1. Typography

### Font decision

**Family: Archivo (Google Fonts).** One family, two roles.

- **Display:** Archivo Black (weight 900).
- **Body / UI:** Archivo (weights 400, 500, 600, 700).

### Why Archivo

The Leadership Summit logo's "LEADERSHIP" wordmark is a heavy, slightly condensed geometric grotesque: flat-cut terminals, equal-armed E, straight-diagonal R, mathematical S. Archivo Black matches every one of those features. The same family ships clean text weights for body and UI, so a single family carries the entire site.

**This replaces Darker Grotesque in CONTEXT.md.** Do not load Darker Grotesque anywhere in the project.

### Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Black&display=swap">
```

```css
:root {
  --font-display: "Archivo Black", "Archivo", system-ui, sans-serif;
  --font-sans: "Archivo", system-ui, sans-serif;
}
```

### Type scale (1440px viewport)

| Token | Size | Weight | Line-height | Tracking | Family | Usage |
|---|---|---|---|---|---|---|
| Display-XL | 88 px | 900 | 0.95 | −0.025em | Archivo Black | Hero headlines |
| Display-L | 64 px | 900 | 1.0 | −0.02em | Archivo Black | Section opens (rare, when section IS the hero) |
| Section | 44 px | 700 | 1.05 | −0.015em | Archivo | Standard section headings |
| Sub | 28 px | 600 | 1.15 | −0.01em | Archivo | Sub-headings, card titles |
| Lede | 18 px | 400 | 1.45 | normal | Archivo | Hero subhead, intro paragraphs |
| Body | 16 px | 400 | 1.55 | normal | Archivo | All body copy |
| UI | 14 px | 500 | 1 | normal | Archivo | Nav, buttons, metadata |
| Chip | 13 px | 500 | 1 | normal | Archivo | Pill labels (rounded, no caps) |
| Numeral | 18 px | 700 | 1 | normal | Archivo | "01 / 02 / 03" markers in numbered lists |
| Eyebrow | 12 px | 700 | 1 | +0.12em uppercase | Archivo | Section pre-titles ("Leadership Summit 2026") |

### Treatment rules

- **Headlines wrap manually.** Hero headlines break to 2–3 lines with intent. Cap line at ~14 words. Use `<br>` where the rhythm demands it.
- **No gradient text. No outlined text. No drop shadows on type.**
- **Hierarchy by scale + weight only.** Don't recolor headings to add emphasis. Don't italicize for emphasis; reserve italic for inline emphasis inside sentences and pull quotes.
- **One italic per page** as a typographic moment (e.g., the word *operator*, *together*, or *room* in a headline). Earned, not decorative.
- **Numerals get equal weight.** Use Archivo's tabular figures (`font-variant-numeric: tabular-nums`) wherever numbers stack (dates, times, schedule).
- **Tracking discipline:** display sizes get negative tracking (tight). UI and chips stay at default. Only the Eyebrow gets positive tracking (+0.12em) for the all-caps treatment.

### Logo lockup

The marketing logo uses two faces by design (heavy + spaced regular). On-page, when typesetting "Leadership Summit 2026" outside the logo file, follow the same logic:

- **Leadership** in Archivo Black, default tracking.
- **Summit 2026** in Archivo Regular, +0.18em letter-spacing, set in Signal Blue.

This treatment is reserved for the Eyebrow above the hero. The actual logo PNG is used in nav and footer.

---

## 2. Color

The references run on a cream / yellow / off-black system. Signal's brand is white / blue / orange. We adapt the reference's *role logic* to Signal's palette, keeping the 70/20/10 share intact.

### Tokens (OKLCH-tuned)

| Token | Hex | Role | Share |
|---|---|---|---|
| `--bg` | `#FFFFFF` | Page background | 70% |
| `--ink` | `#0A1A4C` | Body text, primary ink (Signal Blue darkened ~10% for body) | — |
| `--ink-strong` | `#0032A0` | Headlines, key UI surfaces (Signal Blue, exact) | 20% |
| `--ink-muted` | `#5A6388` | Secondary text, captions | — |
| `--accent` | `#FF9332` | CTAs, highlights, accent surfaces (Signal Orange) | 10% |
| `--accent-soft` | `#FFE6CF` | Accent card backgrounds (tinted from Signal Orange) | within the 10% |
| `--surface-dark` | `#0A1A4C` | Dark inverted cards | within the 20% |
| `--surface-soft` | `#F2F3F8` | Soft chip / accordion row backgrounds (cool-tinted near-white) | within the 70% |
| `--rule` | `#E1E4EE` | 1px dividers (cool-tinted) | within the 70% |
| `--ink-on-dark` | `#F4F5FB` | Text on `--surface-dark` | — |
| `--ink-on-accent` | `#0A1A4C` | Text on `--accent` (orange pills) | — |

Never use `#000` or `#FFF` for text. Body is `--ink`. Backgrounds are `--bg`.

### Color strategy

**Committed.** Signal Blue carries 20% of every page as ink + occasional dark cards. Orange is the single accent, used in three places per page maximum: primary CTA, one accent surface (card or callout), one inline highlight. Everything else is white and rule-grays.

### Surface logic (from the references)

- **Frame 1, 2, 4, 5, 6:** white page, ink-blue text. Default surface.
- **Frame 2 (intro panel), 3 (mission card):** large accent-orange panel as a deliberate full-width interruption. Reserves attention for the section underneath.
- **Frame 3 (mission card pair):** one dark surface (Signal Blue card with white text) next to one accent surface (orange CTA card). Two strong surfaces side by side; uses contrast as the visual.
- **Frame 7:** white card overlapping a full-bleed photo. The card is the only ink; the photo carries the mood.

### Where orange is allowed to appear

- Primary CTA pill (filled).
- One full-width or half-width accent panel per page.
- Inline underline / highlight on a single key word in a section heading (the "accent moment").
- The active state of a chip in a chip rail (the highlighted avatar in frame 6).

Where orange is **not** allowed: body links, navigation, hover states on chrome, decorative accents. Restraint is what makes the orange land when it does appear.

---

## 3. Layout

### Grid

- Viewport target: **1440px**.
- Container max-width: **1280px** (slightly wider than CONTEXT.md's original 1240).
- Outer page padding: **80px** desktop, **40px** tablet, **20px** mobile.
- 12-column grid, **24px gutter**.

### Vertical rhythm

- Section padding (desktop): **120px top / 120px bottom** for major sections.
- Tight stack between paired sections: **64px** (used between frames 5 and 6 in the reference, where the accordion ends and the testimonial begins).
- Inside-section spacing: **48px** between heading block and content; **24px** between paragraphs.

### Section pattern map (from the references)

#### Frame 1 — Hero pattern

- Top nav: logo left, links centered, single accent pill ("Register now") right.
- Left column (~6/12): eyebrow chip → display headline → lede → 2 buttons.
- Right column (~6/12): single 4:5 portrait image with rounded corners (20px radius), 2–3 floating black-on-white pill labels positioned absolutely on the image at varied positions (e.g., top-right, mid-right, bottom-left). Labels name the themes of the event (e.g., "Leadership", "Sales", "Operations").
- Bottom: small centered stat line ("90+ owners. 30+ markets. One room.")

#### Frame 2 — Trust strip + intro panel

- Top: continuation/finish of the hero image (allows the page to feel like one continuous surface).
- Middle: row of 6 partner / supplier logos in muted gray (placeholders for now: text "Logoipsum" repeated).
- Bottom: full-width accent panel (orange or soft-orange), oversized statement copy left-aligned ("Two summits, one week.") with image cluster on the right.

#### Frame 3 — Mission pair

- Top: large accent-yellow (here: orange) card spanning ~8/12, holding a chip + heading + paragraph + CTA, paired with a 2-image cluster on the right (4/12).
- Bottom: two cards side by side. Left card (~7/12) is dark Signal Blue with white text + a photo with floating chips. Right card (~5/12) is orange with a CTA, social-proof avatars, and a register button.

#### Frame 4 — Numbered advantages

- Left (~4/12): vertical stack of 3 portrait image thumbnails (rounded 16px, ~280×220 each), offset slightly so they overlap in vertical rhythm.
- Right (~8/12): "Our advantages" chip, large section heading, then a numbered list:
  - `01` ↳ Title ↳ paragraph
  - `02` ↳ Title ↳ paragraph
  - `03` ↳ Title ↳ paragraph
- Numerals are light gray, weight 700, same size as title. Titles in `--ink-strong`. Thin 1px rule between each row.

#### Frame 5 — Accordion offering rows

- "What we offer" chip, section heading.
- 4 full-width rows. Each row: large title left (Sub size, 28px), `+` icon in a circular chip on the right. 1px rule between rows.
- Click expands inline (no modal, no card pop). Open state shows body copy + an optional small image.
- Below: testimonial intro (chip, stars, opening of testimonial paragraph).

#### Frame 6 — Testimonial carousel + avatar rail

- Centered chip, centered 5-star row, large centered testimonial paragraph (~600px max-width, Sub size 28px), left/right arrows on either side.
- Below: horizontal rail of 6 avatar cards (rounded square, ~110×120). One card is the active speaker, highlighted with `--accent` background. Others sit on `--surface-soft`. Each shows avatar + name.

#### Frame 7 — Featured event card

- Full-bleed background photo (rounded 24px container).
- Overlapping white card on the left (~5/12 of the container, sits on top of the image with ~40px overlap on the image edge). Card contains: chip → heading → date row → location row → paragraph → CTA pill with arrow.

### Container behavior

- Most sections live inside the 1280px container.
- Frames 2 (accent panel) and 7 (image hero) bleed to the viewport edge but keep their internal content inside the container.

---

## 4. Components

### Chips (eyebrow / category labels)

- Background: `--surface-soft` (cool-tinted near-white) with 1px `--rule` border.
- Text: `--ink`, 13px, weight 500, sentence case ("About us", "Our advantages", "What we offer").
- Padding: 6px 12px.
- Radius: 999px (full pill).
- Use one per section, top-left of the heading block.

### Buttons

**Primary (filled accent):**
- Background: `--accent` (Signal Orange).
- Text: `--ink-on-accent` (Signal Blue), 14px, weight 600.
- Padding: 14px 22px.
- Radius: 999px.
- Optional trailing arrow icon (16px, 1.5px stroke).
- Hover: shift to slightly darker orange (OKLCH lightness −4%). No shadow.

**Secondary (outline):**
- Background: transparent.
- Text: `--ink`, 14px, weight 600.
- Border: 1px solid `--rule`.
- Same dimensions as primary.

**Tertiary (text):**
- Just an ink-colored label with a trailing arrow. No background, no border. Used inside dark cards or accent panels.

### Image cards

- Radius: **20px** for hero / feature images; **16px** for thumbnails; **24px** for full-bleed image containers (frame 7).
- No drop shadows.
- Floating labels on images: black `--ink-strong` pill, white text, 12px weight 500, 4px 10px padding, radius 999px, positioned absolutely with `inset` offsets.

### Numbered list (frame 4)

- 3-column-style with first column being the numeral (~40px wide), second the content, third reserved for whitespace.
- Numerals: `--ink-muted`, weight 700, 18px (same size as title).
- 1px `--rule` between rows.
- Padding: 24px vertical per row.

### Accordion rows (frame 5)

- Each row: 100% width. Title left, `+` icon button right.
- 1px `--rule` border at the bottom of each row.
- Icon button: circular, 40×40, `--surface-soft` background, `--ink` icon. Rotates 45° on open.
- Open state expands with a height transition; body copy in Body 16px, max-width 70ch.

### Testimonial card

- No card chrome on the testimonial itself: centered text on `--bg`.
- Stars: 5 solid star glyphs in `--ink-strong` (not orange).
- Arrows: 40×40 circular buttons, `--surface-soft` bg, `--ink` chevron icon, positioned outside the testimonial text block.

### Avatar rail

- Horizontal flex row. Each item: rounded square (radius 12px), ~110×120, avatar image on top, name below.
- Inactive: `--surface-soft` background.
- Active: `--accent` background.
- Hover: subtle lift via translateY(−2px), no shadow.

### Featured event card (frame 7)

- Wrapper: rounded 24px, overflows the container by reaching full-bleed image on one side.
- Inner card: white background, 32px padding, sits with ~40px overlap onto the image.
- Inside: chip → heading → date (icon + text row) → location (icon + text row) → body paragraph → primary CTA.

---

## 5. Imagery

- **Style:** documentary, real, indoor or city, people in working clothes (business casual). No stock-cyclist energy. No stock-handshake energy.
- **Sources for the site:** the existing `/assets/photos/` library from SignalOwnerSummit2024 and OwnersSummit_10.2024.
- **Crops:** prefer portrait 4:5 for hero/feature, square for avatars, landscape 16:9 for full-bleed.
- **Treatment:** no filters, no duotone, no overlays. Slight rounding (per Image cards above).
- **Floating chips on images:** themes of the event ("Leadership", "Sales", "Operations", "Growth"), positioned at varied points on the image, not centered.

---

## 6. Motion

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) for everything UI.
- **Durations:** 200ms for state changes (hover, focus), 400ms for accordion expansions, 600ms for section reveals on scroll.
- **Scroll reveals:** subtle, fade + translateY(12px) on entry. No staggered word-by-word, no parallax, no horizontal scroll-jacking.
- **What animates:** opacity, transform. Never width, height, top, left, margin.
- **Hover on image cards:** scale(1.02) on the image only, container stays put. Floating chips don't move.
- **Accordion:** height auto-resolved via `interpolate-size: allow-keywords` or a transform-based reveal. No layout thrash.

---

## 7. Iconography

- Style: 1.5px stroke, rounded line caps, no fills.
- Size: 16px (inline, UI), 20px (button), 24px (section markers).
- Source: Lucide (https://lucide.dev) — free, consistent, and matches the visual weight of Archivo.

---

## 8. Anti-references (visual)

These appear constantly in template-land and templates of this kind. None of them are allowed in the Signal Summit visual system.

- Gradient hero backgrounds (purple-to-pink, blue-to-cyan, "aurora" mesh).
- Drop shadows on cards (`box-shadow: 0 20px 60px rgba(0,0,0,0.1)` and friends).
- 3D bevels, neumorphic surfaces, glass blurs as decoration.
- Outlined "stroke" text.
- Animated gradient or shimmer on CTAs.
- Tilted/rotated cards for "fun" energy.
- "Made in Framer" / "Made in Webflow" badges (the references show one; we don't ship it).
- Floating emoji icons inside chips.
- Avatar groups stacked with overlapping borders as the only social proof.

---

## 9. What to take from the references (and what to leave)

**Take:**

- Section pattern set (chip → heading → content) used consistently across frames.
- Numbered list pattern (frame 4) for "What you take home" and "Why this Summit."
- Accordion pattern (frame 5) for FAQ and detailed agenda.
- Avatar rail (frame 6) for "Who's in the room" with owner faces.
- Overlapping card on full-bleed image (frame 7) for the "Optional kickoff" event card.
- Black-pill floating labels on images for theme tagging.

**Leave:**

- Cyclix's yellow. Replace with Signal Orange, used at the same ratio.
- The cream background. Use white per Signal's 70/20/10.
- Stock testimonial avatars. Use real owners' photos or, until we have them, neutral initials in `--surface-soft` circles.
- The "logoipsum" partner row. Signal doesn't have partner logos to display; replace this slot with a row of session topics or owner photo tiles.

---

## 10. Summary card (for fast reference)

- **Family:** Archivo + Archivo Black (Google Fonts). Overrides Darker Grotesque.
- **Display:** 88/64/44/28 px, weights 900/900/700/600.
- **Body:** 16 px / 400 / 1.55 / `--ink`.
- **Palette:** White 70%, Signal Blue `#0032A0` 20%, Signal Orange `#FF9332` 10%.
- **Radius:** 16 / 20 / 24 (thumbs / features / hero containers); pills 999.
- **Grid:** 1280px container, 12 col, 24px gutter, 80px outer padding.
- **Motion:** ease-out-quart, 200/400/600ms, opacity + transform only.
- **Icon:** Lucide, 1.5px stroke.
