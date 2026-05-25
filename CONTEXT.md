# Leadership Summit 2026 — Design Exploration

A set of HTML/CSS variations for the Signal Leadership Summit 2026 web page. Each variation is its own standalone direction — different layout, structure, spacing, typographic treatment, and story — while sharing the same font and color palette.

---

## The Company — Signal

**Signal** is a security company. Tagline: *A Security Partner You Can Trust.*

Positioning: Security as community impact, not just service. Built on trust, respect, and proactive solutions. The audience is split between people building a franchise business, people protecting spaces that matter, and people starting a meaningful career.

Tone words pulled from their copy: **reliable, compassionate, proactive, trustworthy, community-rooted.**

---

## The Event — Leadership Summit 2026

**Name:** Leadership Summit 2026
**Subtitle:** Bringing Franchise Leaders Together
**Lede:** Three days focused on what it takes to lead a growing Signal franchise.

**What it is:** Leadership Summit brings franchise owners and key employees together for company updates, owner-led breakout sessions, and conversations focused on leadership, sales, operations, and leading your business into its next stage of growth.

**Dates:** October 6–8, 2026
**Location:** Signal Home Office — 3880 S. 149th St., Ste. 106, Omaha, NE 68144

**Audience:** Franchise owners + key employees (internal-facing, not public marketing).
**Themes:** Leadership · Sales · Operations · Growth.

---

## Design System (shared across all variations)

### Typography
- **Font family:** Darker Grotesque (Google Fonts) — used across all weights.
- **Treatment:** Creative. Sizing, spacing, and structure mimic the reference design provided per variation. Type does heavy lifting.

### Color palette
| Token | Hex | Share | Role |
|---|---|---|---|
| White | `#FFFFFF` | 70% | Dominant — backgrounds, breathing room |
| Signal Blue | `#0032A0` | 20% | Primary brand color — headings, key surfaces, anchors |
| Signal Orange | `#FF9332` | 10% | Accent — highlights, CTAs, punctuation moments |

The 70/20/10 ratio is the guiding constraint for every variation, even when the layout language changes radically.

### Imagery
Placeholder imagery only (gray blocks, labeled boxes, or `placehold.co` URLs). Real photography will come later.

---

## Project Structure

```
summit-variations/
├── index.html              # Variation switcher / landing
├── variation-1.html
├── variation-2.html
├── ...
├── css/
│   ├── shared.css          # Font import, color tokens, reset
│   └── variation-1.css     # Per-variation styles
├── js/
│   └── switcher.js         # Bottom-right floating switcher menu
├── assets/                 # Placeholder images, icons
└── CONTEXT.md              # This file
```

### Switcher
A floating bottom-right pill, present on every variation page. Collapsed by default showing the current variation (e.g. `V1`); clicking expands a vertical list of all variations to switch between.

**Styling:** Neutral utility chrome (dark gray/black floating UI). Reads as tooling — deliberately outside the 70/20/10 palette so it never competes with the design itself.

### Index page
`index.html` is a **gallery of variation thumbnails** — a grid of cards, each linking into its variation. Designed for team showcase and side-by-side comparison.

---

## Working Method

For each variation:
1. **User provides:** reference screenshot(s) + a sentence on direction/tone.
2. **Claude plans:** analyzes the reference, proposes a story arc (sections + copy angle), asks clarifying questions.
3. **User confirms** direction.
4. **Claude builds** the HTML/CSS for that variation only.
5. Move on to the next.

Sections, story, and copy are crafted per variation — not standardized across them.
