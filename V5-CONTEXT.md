# V5 — Context Doc

This document captures the **current production state** of variation 5 of the Leadership Summit 2026 site. It's the direction the team is shipping. Other variations exist in the same folder for reference but are not maintained.

For shared brand/event context, see [CONTEXT.md](./CONTEXT.md). For typography/color tokens shared across variations, see [VISUAL.md](./VISUAL.md). This file is the V5-specific layer on top of those.

---

## Direction in one sentence

**Confident editorial event site for a sophisticated, internal audience.** Big type, restrained palette, real imagery, one strong moment of brand identity (the orange ribbon) per page. Subtle scroll choreography. No marketing tropes (no glassmorphism, no hero-metric grids, no rainbow gradient text, no centered icon-card stacks).

---

## File map

```
summit-variations/
├── index.html                  → JS + meta-refresh redirect to variation-5.html
├── variation-5.html            → V5 home page (the entry)
├── v5-agenda.html              → Agenda subpage
├── v5-travel.html              → Travel subpage
├── v5-faqs.html                → FAQs subpage
├── v5-register.html            → Register subpage
├── css/
│   ├── shared.css              → Base reset/normalize
│   └── variation-5.css         → All V5-specific styles (single file)
├── js/
│   └── v5-motion.js            → IntersectionObserver-based scroll reveals
└── assets/
    ├── Logo Blue 2.svg         → The brand wordmark (current logo)
    ├── section-video.mp4       → Hero video poster + play
    └── photos/                 → Event photography (real assets)
```

Pages 1–4 (`variation-1.html`, `variation-2.html`, etc.) and their CSS still exist but are **not part of V5**. Don't edit them when iterating V5.

---

## The hero — single-logo morph

The signature interaction of V5. On the **home page only** (`variation-5.html`):

- At `scrollY=0`: the brand-mark (the logo from the nav) is **scaled up + translated to the center of the hero area**, replacing what would otherwise be a typographic H1.
- As the user scrolls, the brand-mark **continuously morphs** back to its natural nav position over the first ~280px of scroll.
- It's **one DOM element**, not a cross-fade. The same `<img class="v5__brand-mark">` is the hero logo at the top of the page and the small nav logo when scrolled.
- The rest of the nav (links + Register CTA + white-blur background) is **always visible** — only the brand morphs.
- Reverses smoothly when the user scrolls back up.
- `prefers-reduced-motion`: pins the nav state immediately (no morph), accessibility-safe.

### How it works
- HTML: the hero section has `class="v5__hero v5__hero--logo-morph"`. Inside, a `.v5__hero-logo-slot` div reserves the vertical space the morphed logo occupies.
- CSS: `html.v5:has(.v5__hero--logo-morph) .v5__brand { z-index: 60; transform-origin: center center; will-change: transform; }` — the brand floats above other nav children during the morph.
- JS: an inline IIFE in `variation-5.html` measures the brand's natural nav position, computes the hero target (centered over the slot), and applies `translate3d(dx,dy,0) scale(N)` on every `requestAnimationFrame` based on scroll progress. The CSS variable `--nav-reveal` is also written but is no-op for visibility now (was used in an earlier version).
- The script only runs if `.v5__hero--logo-morph` exists, so subpages keep a normal static nav.

### Sizing constants (in JS)
- `PHASE_A = 280` — px of scroll for the logo to fully morph.
- Hero scale: `Math.max(2, Math.min(3.4, window.innerWidth / 480))` — fluid; ~3× at 1440px viewport.
- Target Y: center of `.v5__hero-logo-slot` (not a hardcoded vh%, so the layout drives the position).

---

## Brand logo

- File: `assets/Logo Blue 2.svg` (vector — renders sharp at any DPR + zoom).
- **Sized directly via CSS width/height.** No `transform: scale(...)` shrink trick.
- Desktop: `128 × 39` (aspect 593:180).
- Mobile (≤480px): `109 × 33`.
- The home page hero-morph applies its own `transform: scale()` on top of these dimensions to scale the logo UP for the hero state.
- Past bug: an earlier version used `width: 593px; transform: scale(0.27)` to "paint sharp" and enable upscale. That caused **GPU-rasterized blur on Vercel** at non-integer DPR. Fixed by switching to direct CSS sizing with the SVG (vectors don't suffer from raster blur).

---

## Color strategy

Following the 70/20/10 mandate from [VISUAL.md](./VISUAL.md) and CONTEXT.md.

| Token | Hex | Role |
|---|---|---|
| `--v5-bg` | `#ffffff` | Page background, light surfaces |
| `--v5-ink` | `#0a1a4c` | Deep navy text on light surfaces |
| `--v5-ink-strong` | `#051036` | Emphasis text |
| `--v5-surface-dark` | `#0032A0` | Signal Brand Blue — dark card surfaces |
| `--v5-accent` | `#FF9332` | Signal Orange — CTAs, ribbon, accent dot |
| `--v5-on-dark` | `#f4f5fb` | Text on dark surfaces |
| `--v5-surface-soft` / `softer` | `#f2f3f8` / `#f8f9fc` | Soft neutral fills |

Decisions worth remembering:
- **Text stays deep navy** (`#0a1a4c`), not brand blue. Brand blue is for *surfaces*; navy is for *type*. Higher contrast on white, more readable.
- **No `#000` or `#fff` literals** outside the bg/ink tokens. Even "blacks" and "whites" carry a hint of blue chroma.
- **No gradient text.** No `background-clip: text` anywhere.
- **No side-stripe accent borders** as a styling trope.

---

## The Signal ribbon (orange swoosh)

The brand's signature S-curve appears once per page, inside the dark blue "Reserve your seat" CTA card on the home page. It is a **multi-layer inline SVG** built around the official path from `Extendede Swoosh.svg` (filename verbatim from brand).

### Current layer stack (top to bottom in render order)
1. **Hero gradient** — premium tonal range: terracotta `#C75A1A` → fired orange → Signal-orange `#F58B2A` → peak warmth `#FF9E40` → sunlit `#FFAE5C` → refined peach `#FFC07A`. Each stop shifts in hue + chroma + lightness, not just lightness.
2. **Depth shadow** — burnt sienna (`#5C1E08` → `#3A1206`, cooler red undertone, *not* muddy brown). Applied as `mix-blend-mode: multiply` at the bottom edge of each band.
3. **Specular highlight** — sharp white catch-light at the top edge of each band. Falloff is tight (3% → 9% → 18%) for polished-metal precision. Two peaks (top of upper band + top of lower band) so both bands catch light.
4. **Shimmer** — animated cream-tinted sweep (`#FFFAF0` peak), 2.6s ease-in-out infinite. Disabled under `prefers-reduced-motion`.

### What was deliberately removed (lessons learned)
- **No outer halo / blurred glow.** The old `feGaussianBlur` halo bled orange light into the surrounding blue card and killed the figure-ground contrast — read as cheap "marketing PSD glow." Removed entirely.
- **No mid-wash overlay.** Was muddying the hero gradient. Removed.
- **No outer feGaussianBlur filters** in the SVG.

### The one outer cue
A single tight `filter: drop-shadow(0 6px 14px rgba(40, 14, 0, 0.28))` on the SVG element. Defines the ribbon as a physical object sitting on the dark card, without spilling glow into the surrounding space.

### Sizing
- `.v5__composite-cta-swoosh` container: `width: 100vw` (breaks out of card), `height: clamp(73px, 11.92vw, 194px)`. Centered via `left: 50%; margin-left: -50vw`.

---

## Subpage system

All four subpages share the same chrome:

- **Page hero**: small eyebrow pill + uppercase big H1 + lede + small meta block, sitting in a tight padded section (`.v5__page-hero` — `clamp(32px, 4vw, 56px)` top padding, `clamp(24px, 3vw, 40px)` bottom). **No bottom border separator.**
- **Bridge image** (agenda + faqs only): a single wide landscape photo sits between the page hero and the page's main content. Aspect `21:8` desktop, `16:10` mobile, soft drop shadow. `.v5__page-bridge`.
- **Close card** (all subpages): one outer **blue card** (`.v5__close-card`) with a **nested grey panel** (`.v5__close-side`) as the right column. Internal 2-col grid. Reads as one composed surface, not two standalone cards.

### Close-card copy (do not regress)
| Page | Side panel headline | Intent |
|---|---|---|
| Agenda | "Add to the agenda." | Invite topic suggestions via email |
| FAQs | "Ready when you are." | Reduce friction to register |
| Travel | "Got something specific?" | Direct people to email for accessibility/group bookings |

The headlines are **invites**, not statements. Body sentences read as one human writing to another.

---

## Animation system

All scroll reveals run via `js/v5-motion.js` — IntersectionObserver-based.

- **Targets**: any element with `data-reveal`. Fade-up by default (translateY 14 → 0, opacity 0 → 1).
- **`data-reveal="fade"`**: opacity-only variant for big surfaces.
- **`data-reveal-delay="1..6"`**: staggers transition-delay in 80ms steps. Use on grids/lists for cascading reveals.
- **Schedule day cards** (agenda) use a **sticky-stack** scroll effect: `.v5__sched-day { position: sticky; top: 100px }` with per-card `top` stagger (100/116/132/148/164px) so previously-stacked cards peek above the current one. Mobile and `prefers-reduced-motion` fall back to a regular column.
- **Travel cards + FAQ items** get a slightly more pronounced reveal (`translateY(22px) scale(0.992)` → none) — feels like cards "settling" into place.

All motion respects `prefers-reduced-motion: reduce`.

---

## The nav

- Sticky at top (`position: sticky; top: 0; z-index: 50`).
- White background `rgba(255, 255, 255, 0.88)` with `backdrop-filter: saturate(180%) blur(12px)`.
- Modern pill-style active state: the current page's nav link sits in a soft grey pill (`var(--v5-surface-soft)` background, deep-navy text). No orange underline.
- Layout: brand on the left, nav links + Register CTA grouped on the right (margin-left: auto on the `<nav>`).
- Logo + nav links + Register CTA are **all always visible** on every page including the home page. Only the brand element morphs in size on the home page.
- `html.v5 { scrollbar-gutter: stable }` is set globally so the viewport width doesn't shift between pages with/without scrollbars (eliminated the page-switch nav jerk).

---

## Image patterns

- **Real event photography only.** `assets/photos/*.jpg` — actual Signal Owner Summit photos. No stock.
- **No solid color placeholders.** Every visual surface that calls for imagery has an image.
- **Subtle photo tint** on the "Room" section: a `rgba(0, 50, 160, 0.08)` multiply over the photo so it picks up the palette without darkening. A wide localized radial vignette in the bottom-left provides legibility behind the type — no global overlay.
- **Image bleed pattern** in the registration feature card: the photo extends across ~84% of the card width using a 5-stop CSS mask gradient, with a soft orange band marking the transition zone.

---

## Patterns to maintain

1. **One brand moment per surface.** The orange ribbon appears exactly once on the home page. Don't add more orange brand "moments" elsewhere.
2. **Text on photo = no card behind it.** The "Room" section uses light photo tint + localized darkening, never a glass card or solid panel.
3. **Bento grids are forbidden.** Travel page redesigned into a uniform 2-col grid with consistent card structure (photo → text → inner grey list container).
4. **Sticky-stack for sequence content.** Multi-day or multi-step content uses the sticky-stack pattern, not a vertical list.
5. **Section header has no bottom separator.** `.v5__page-hero` is naked at the bottom — section transitions are by spacing alone.

---

## Patterns to avoid (lessons learned)

| Anti-pattern | Why it's banned |
|---|---|
| Glassmorphism | Inconsistent with brand surface language. Caused the "Room" section to feel out of place. |
| Outer blurred glow / soft halo on shapes | Reads as cheap 2015-era marketing PSD effect. Killed figure-ground contrast on the orange ribbon. |
| CSS `transform: scale(0.X)` on raster logos | Causes GPU-composited blur at non-integer DPR. The Vercel render bug. Use SVG + direct width/height. |
| 12-col bento grids with varying spans | Layout reads as showcase, not site. Travel page rejected and redesigned. |
| Heavy dark gradient overlay on hero photos | Dates the design instantly. Replaced with subtle brand tint + localized vignette. |
| `font-size: 0` on flex parents to hide SR-only text | Collapsed flex item widths in centering containers. Use `.v5__sr-only` (position:absolute; clip) instead. |
| Em dashes in body copy | Banned per CONTEXT.md / DESIGN.md. Use commas, colons, periods. |

---

## Deployment

- **Vercel** serves the `summit-variations/` directory as a static site.
- `index.html` is a JS + meta-refresh redirect to `variation-5.html`. Both local preview (`localhost:5732/`) and Vercel (`/`) open V5 directly.
- No build step. No framework. Plain HTML + CSS + minimal JS.
- Cache-busting via querystring on the CSS link (`variation-5.css?v=<n>-<desc>`). Bump the version when shipping CSS changes.

---

## What's known to break if you're not careful

- **Sticky nav position** is overridden by an earlier `.v5__nav, .v5 main, .v5__footer-big { position: relative }` rule for the page-pattern layer. The nav was extracted from that selector list — if you ever add `.v5__nav` back to a `position: relative` rule, the sticky-stack and the home-page nav-blur will both break.
- **The home-page hero-morph JS** measures the brand's natural position on load + resize. If you add layout shifts or load-deferred content above the nav, the measurement can be stale. Re-trigger via `window.dispatchEvent(new Event('resize'))` if you ever need this.
- **The schedule sticky-stack** requires the parent `.v5__schedule` to have bottom padding (currently `clamp(80px, 10vw, 200px)`) so the last card has room to scroll up into view before the section ends.
- **The "Room" section's radial vignette** is anchored to bottom-left because that's where the type sits. If you move the type, also move the radial center.

---

## How to extend V5 without breaking it

- **New page**: copy `v5-faqs.html` as a starting point (it has the page-hero + section + close-card pattern). Update nav `aria-current="page"`. Use the same CSS — only add new selectors in `variation-5.css` if a genuinely new pattern is needed.
- **New section**: prefer reusing `.v5__section`, `.v5__wrap`, `.v5__eyebrow`, `.v5__section-h`, `.v5__lede`, and the card surfaces (`.v5__surface-soft`, `.v5__composite-cta`, etc.) before introducing new tokens.
- **New imagery**: drop into `assets/photos/`, reference by path. Honor existing radii (`var(--v5-r-img)` 32px, `var(--v5-r-card)` 20px, `var(--v5-r-hero)` 24px, `var(--v5-r-pill)` 999px).
- **New animation**: add `data-reveal` attributes in HTML before reaching for new JS. The reveal infra handles 95% of cases.
