# ANIMO — Project Context for Claude Code

This file exists to hand off context from a design/prototyping conversation (done in Claude chat) to continued development in this repo. Read this before making changes so existing decisions aren't accidentally reversed.

> **Post-hackathon-pivot status (superseding the "Pages built vs. placeholder" table below):** the team cut scope to two AI features only, judged against a 2-day build window. The static HTML prototype (`Base Draft.html`, referenced throughout this file) is being ported to **React + TypeScript + Tailwind CSS**, not kept as a single HTML file. The nav is now 4 items — **Overview** (a 2-tile launcher, not a KPI grid), **Insurance** (was Hazard Center + Insurance & Relief), **Recovery** (was Buyer Contracts), **Farm Map** (kept, but its GIS graphic is a placeholder — a separate GIS workstream owns the real map). Farmers/Reports/Settings are deferred, not built. The design tokens and gotchas below (colors, corner-bracket aesthetic, the `--white`/`--card-bg` split, etc.) are still the source of truth and have been ported into the React app's `src/index.css`.

## What ANIMO is

ANIMO is an AI-driven agricultural economic coordination platform built for **Hack4AProgress 2026** (a DOST CALABARZON hackathon), by a team from Batangas State University. It unifies predictive crop management, supply chain continuity, and automated disaster relief for Philippine farming cooperatives.

Core concept: a farm parcel is mapped once (Sentinel-2 satellite + GIS), and that single mapping feeds yield prediction, buyer contract fulfillment, and automated PCIC insurance claims — removing redundant manual reporting at every step.

**"Quadruple win" stakeholders:** Farmer (low-friction PWA, no daily encoding), Cooperative (this dashboard — the power-user hub), Buyer (guaranteed supply via an AI recommender that reroutes surplus when a farmer reports a shortfall), LGU (remote GIS-based disaster assessment).

**Only the Cooperative Coordinator Dashboard has been built so far.** The Farmer-facing PWA and the LGU view do not exist yet.

## Current state of the build

The prototype is a **single static HTML file** — vanilla HTML/CSS/JS, no build step, no framework, no backend. All data (farmers, buyer contracts, hazard advisories, etc.) is hardcoded directly in the JS.

**This was a deliberate prototyping choice, not the intended production stack.** The actual product should be built with:
- React 19.2+, TypeScript, Vite, Tailwind CSS
- MapLibre GL JS or Google Maps API for real map rendering (the current prototype uses percentage-positioned `<div>` pins on a decorative SVG-pattern background, not a real map)

The static HTML was used because Tailwind's JIT/arbitrary-value support wasn't available in the prototyping sandbox, which made it impossible to hit exact brand hex codes via Tailwind classes. When porting to React+Tailwind, treat the CSS custom properties documented below as your `tailwind.config` design tokens.

**Most recent file delivered:** `animo-dashboard-v8.html` (this repo should already contain it, or the latest iteration).

## Pages built vs. placeholder

| Page | Status |
|---|---|
| Overview | Fully built — this is where most iteration happened |
| Farmers | Fully built (search/filter table + slide-in detail drawer) |
| Farm Cluster Map | Fully built (dedicated full-screen map page with pan/zoom controls) |
| Buyer Contracts | Fully built (dedicated page with contract cards) |
| Hazard Center | Placeholder only — Overview has a **card** with this content, but no dedicated page yet |
| Insurance & Relief | Placeholder only |
| Reports | Placeholder only |
| Settings | Placeholder only |

**Sidebar nav order (do not reorder without reason):** Overview → Farmers → Farm Cluster Map → Hazard Center → Insurance & Relief → Buyer Contracts → Reports → Settings.

## Design system

### Color tokens (CSS custom properties at `:root`)

Light mode is the **default**. Dark mode is an optional toggle (button next to the notification bell), not the primary experience.

```css
:root{
  --bg:#ffffff;              /* page background — kept plain white per explicit request, no gradient washes */
  --sidebar:#2f7a45;          /* sidebar gradient top */
  --sidebar-deep:#1c5230;     /* sidebar gradient bottom */
  --success:#379157;          /* green accent — active states, healthy metrics */
  --warning:#eab000;          /* gold accent — advisories, moderate risk */
  --danger:#dd5330;           /* orange-red accent — shortfalls, critical risk */
  --border:#dbe3d7;
  --white:#ffffff;            /* LITERAL white — text/icons on dark surfaces. Constant across themes. */
  --card-bg:#ffffff;          /* the actual card/panel surface. FLIPS between light/dark. */
  --ink:#152018;
  --ink-soft:#5c6d60;
  --text-warn:#8a6a04;        /* readable gold TEXT on light bg (different from --warning, which is a fill/accent) */
  --text-success:#2c6b40;
  --text-danger:#c0451f;
  --divider:#e9eee6;
  --hover-bg:#f3f6f1;
  --dot-muted:#b7c2b9;
  --mono: 'JetBrains Mono', monospace;
}
```

Dark mode overrides these same variables via `body[data-theme="dark"]{ ... }` (brighter/lighter values for `--text-*`, dark `--bg`/`--card-bg`, plus its own body background gradient and map-pattern variants). See the `<style>` block for the full override list.

### ⚠️ Critical gotcha: `--white` vs `--card-bg`

These were originally the same variable and it broke dark mode (sidebar text went invisible). **They must stay separate:**
- `--white` = literal white, used for things that are white regardless of theme (text/icons sitting on the always-dark-green sidebar or the always-dark-green Relief Claims accent card, the risk-meter slider handle).
- `--card-bg` = the surface color of cards/panels, which must differ between light and dark mode.

If you ever see `background:var(--white)` on a `.card`-like element, that's a regression — it should be `var(--card-bg)`.

### Typography

- **Figtree** (400–800 weight) for all headings and body text.
- **JetBrains Mono** for technical/system-style labels: KPI labels, meter scale labels, drawer stat labels, chips/pills, date display. This is intentional — part of the "grid/technical panel" aesthetic (see below).

### Aesthetic direction: "grid / system panel"

Mid-project the whole visual language was overhauled from soft rounded "glassmorphism" cards to a sharper, more technical look, inspired by hackathon-site references (thin geometric lines, monospace tags, CRT-style texture). Key structural pieces of this that should be preserved:

- **Sharper corners**: cards/panels ~6px radius, buttons ~4px, pills/tags ~3px. Circular elements (status dots, avatar chips, the risk-meter handle) were deliberately left circular — don't flatten those.
- **Corner-bracket accents**: `.card`, `.kpi`, `.ccard`, `.full-map-card` have `::before`/`::after` pseudo-elements drawing small L-shaped brackets (top-left/bottom-right) in the accent green, instead of relying purely on shadow for definition.
- **Grid-line background texture**: a subtle repeating square-grid SVG pattern (not a wavy/organic pattern — that was an earlier version, replaced on purpose) on the body and map backgrounds.
- **CRT scanline overlay**: a very faint fixed full-screen `body::after`/`::before` (repeating horizontal lines + vignette), `pointer-events:none`, purely decorative.
- Card **eyebrow/kicker labels were removed** (e.g. "LIVE GIS", "LGU RISK FEED", "ACTIVE SEASON") in favor of plain bold `<h3>` titles — don't reintroduce eyebrows on card headers.

### Content/copy decisions worth preserving

- Sidebar tagline under the logo: **"Kita. Benta. Tara."** (not "Cooperative hub").
- Sidebar profile role label: **"Head"** (not "Coordinator").
- The "Menu"/"Account" section labels above sidebar nav groups were removed — it's one flat list now.
- Farmers / Farm Cluster Map / Buyer Contracts pages have **no subtitle line** under their page title (only Overview shows something under the title — a live PHT clock + date, not a subtitle).
- Topbar has **no search bar and no profile chip** — both were removed as redundant with the sidebar. Topbar right side is just: notification bell, theme toggle.

## Key interactive features already implemented (don't rebuild from scratch)

- **Live PHT clock + dynamic greeting** ("Good morning/afternoon/evening, Regina!") in the topbar, computed from `Asia/Manila` time, refreshed every 60s, recalculated (not hardcoded) whenever navigating back to Overview.
- **Notification bell**: click toggles a dropdown with mockup read/unread notifications; badge count clears on open.
- **Theme toggle**: swaps `data-theme="dark"` on `<body>`; icon swaps sun/moon.
- **Farm Cluster Map pins**: clickable, open a Google-Maps-style popup (farm name, farmer, crop, area, address, status) using `position:fixed` + real viewport collision detection (flips above/below/clamped horizontally so it never gets clipped by a parent's `overflow:hidden`).
- **Map legend (Active/Inactive)**: clickable, opens a list of matching farms, same collision-aware positioning logic as the pin popups.
- **Crop-mix bar** (Active Farms card): hovering a segment shows a tooltip listing which farmer(s) grow that crop — same viewport-aware positioning pattern.
- **Buyer Contracts list**: internally scrollable (not everything dumped inline), with a bottom fade + gently bobbing chevron that hides itself via JS once you've actually scrolled to the bottom.
- **Weather carousel** (Rainfall/Temp/Humidity): auto-rotates every 3.5s with a left-right slide animation, clickable dots to jump directly.
- **Relief Claims card**: intentionally the visual focal point — wide, dark-green accent card among lighter ones, with a large glowing "2 pending" number (this scales by design: it shows an avatar stack + count-agnostic caption rather than one row per claim, so it won't break if the real number grows).

## Other CSS/JS gotchas to avoid re-introducing

- **Never pair an ID selector that sets `display` with a class-based `.hidden{display:none}` toggle** — ID specificity beats class specificity, so the element won't actually hide. Fix used throughout: `.hidden{ display:none !important; }`.
- When doing bulk find-and-replace across a stylesheet for light/dark token values, **watch for circular variable references** (e.g. accidentally turning `--divider:rgba(...)` into `--divider:var(--divider)` because the replace script matched inside the variable's own definition too).
- `body[data-theme="dark"] body::after` is invalid CSS (body can't be a descendant of itself). Correct form: `body[data-theme="dark"]::after`.
- Grid/flex rows default to stretching children to equal height, and flex-column children default to `flex-start` — meaning leftover height from a stretch pools at the bottom of shorter cards. Fix per-case with `justify-content:space-between` or by matching intrinsic content heights, not by inventing filler content.
- The Season Yield ring (`.kpi-standalone`) is **intentionally chrome-less** — no card background, border, or shadow. Don't "fix" this by giving it a card treatment; it was a deliberate design experiment that stuck.

## Assets

- Logo: embedded directly as a base64 PNG inside `.brand-mark img` (transparent background, provided by the user as `Animo_Logo.png`). If you need to swap it again, re-encode and replace the `data:image/png;base64,...` string — don't reference an external file path, since this is meant to remain a single portable HTML file for now.

## Known gaps / likely next steps

- **Emergency State** (the AI Recommender modal + automated relief timeline) is referenced in copy ("Shortfall flagged · recommender available" on the Jollibee Food Corp. contract row) but **not built yet**. This was planned as the next major feature before the aesthetic overhaul took priority.
- Hazard Center, Insurance & Relief, Reports, and Settings need to become real pages (currently generic placeholders).
- Eventually needs porting from static HTML/CSS/JS to the real React + TypeScript + Vite + Tailwind + MapLibre stack.
- Dark mode has been tested for major surfaces but wasn't exhaustively pixel-checked on every micro-component — worth a pass if dark mode matters for the professor review.
