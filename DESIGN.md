---
name: MH Datasheet + Rewind
description: >
  One-page portfolio of Mahantesh Hiremath. Base world (2026) is a component
  datasheet; Rewind re-renders the same markup as the web of 2012, 2016, 2020,
  2022 and 2024 through token and component overrides scoped by
  [data-era="YEAR"] on <html>. Recorded from the shipped build
  (index.html, assets/css/site.css, assets/js/rewind.js).
colors:
  bg: "#ffffff"
  surface: "#f3f4f1"
  ink: "#111315"
  muted: "#555b61"
  rule: "#d6d8d3"
  rule-strong: "#111315"
  accent: "#0a7d3b"
  accent-soft: "#e3f2e8"
  accent-ink: "#ffffff"
  warn: "#a14a00"
  signal-on-ink: "#7ee2a2"
typography:
  display:
    fontFamily: Archivo
    fontSize: clamp(3.1rem, 8.2vw, 6rem)
    fontWeight: 800
    fontStretch: 125%
    lineHeight: 0.9
    letterSpacing: -0.035em
  section:
    fontFamily: Archivo
    fontSize: clamp(2rem, 4vw, 3rem)
    fontWeight: 750
    fontStretch: 112%
    lineHeight: 1
    letterSpacing: -0.025em
  lede:
    fontFamily: Archivo
    fontSize: clamp(1.3rem, 2.4vw, 1.75rem)
    fontWeight: 600
    fontStretch: 105%
    lineHeight: 1.3
  item-title:
    fontFamily: Archivo
    fontSize: 1.3rem
    fontWeight: 700
    fontStretch: 108%
    lineHeight: 1.2
  body:
    fontFamily: Archivo
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
    fontVariantNumeric: tabular-nums
  prose:
    fontFamily: Archivo
    fontSize: 1.1rem
    lineHeight: 1.7
  table:
    fontFamily: Archivo
    fontSize: 15.5px
  label:
    fontFamily: Archivo
    fontSize: 12px
    fontWeight: 700
    fontStretch: 80%
    textTransform: uppercase
    letterSpacing: 0.08em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.92em
    letterSpacing: -0.01em
rounded:
  base: 3px
  focus: 2px
spacing:
  pad: clamp(20px, 4vw, 48px)
  section-top: clamp(64px, 9vw, 112px)
  grid-gap: clamp(32px, 5vw, 72px)
  cell: 13px 16px 13px 0
  max: 1240px
motion:
  ease: cubic-bezier(.16, 1, .3, 1)
  hover: 0.2s
components:
  btn: { border: 1.5px solid ink, radius: base, padding: 14px 20px, font: 600 15px/1 }
  btn-primary: { background: ink, color: bg, hover: accent }
  rewind-chip: { background: ink, color: bg, year: signal-on-ink mono }
  machine: { border: 1.5px solid rule-strong, head: ink band }
  dial: { columns: 6, pressed: accent }
  table: { hairline: rule, head-rule: 1.5px rule-strong }
---

# MH Datasheet + Rewind

## Overview

The portfolio is the datasheet of one engineer. The 2026 base world borrows the conventions of a component datasheet: a white sheet, ink type, hairline rules between rows, spec tables with tabular figures, a part number (`MH-2026`), a pin diagram, and a revision history. Rewind re-boots the same page on the typical machine of an earlier year, then re-skins the **same markup** as websites looked that year.

The system works in two layers, both in `assets/css/site.css`:

1. **Base world** (`:root`, `site.css:15`) is the only layer new surfaces inherit from.
2. **Era skins** (`[data-era="2012" | "2016" | "2020" | "2022" | "2024"]`) are period pastiche. Each one overrides tokens first, then the components that a token swap can't reach. `rewind.js` sets `data-era` on `<html>`, and 2026 is the default (`index.html:2`).

The skins imitate each era on purpose. Detector hits for Roboto, Helvetica, system-ui, purple gradients, glow, linen stripes and hard offset shadows are all scoped to an era and intentional. They stay valid inside their `[data-era]` scope and never leak into the base world.

Delivery constraint: `customHttp.yml` sets a self-only CSP (`default-src 'self'; style-src 'self'; script-src 'self'; font-src 'self'`). There are no inline `<style>`/`style=""`, no inline handlers, no third-party fonts or scripts. All seven font files are self-hosted woff2. Runtime styling goes through CSSOM only (`bootFill.style.width`).

## Colors

### Base world (2026)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#ffffff` | The sheet |
| `--surface` | `#f3f4f1` | Ask panel, hover fills, scrollbar track |
| `--ink` | `#111315` | Text, the machine-head band, primary button, chip body |
| `--muted` | `#555b61` | Labels, ledes, secondary cells (6.87:1 on bg) |
| `--rule` | `#d6d8d3` | 1px hairlines between rows |
| `--rule-strong` | `#111315` | 1.5px structural rules: bar, section heads, thead, machine, footer |
| `--accent` | `#0a7d3b` | Signal green: "OK / active / measured". Pressed dial key, measured values, focus ring, selection, hover (5.24:1 on bg) |
| `--accent-soft` | `#e3f2e8` | Highlighted rows: "I built", key revisions, key courses (accent text on it 4.52:1) |
| `--accent-ink` | `#ffffff` | Text on accent |
| `--warn` | `#a14a00` | The one amber: Rewind hint text, the past-era banner, first-visit pulse dot (6.01:1 on bg) |
| signal-on-ink | `#7ee2a2` | Mint used only on ink/black: the chip year, boot `OK`, the favicon pins. Hard-coded, not a custom property |

**One green, one amber.** Green means "active / measured / you are here". Amber means "notice this" and appears only on the hint, the banner and the pulse.

### Era overrides

Every era redefines the same token set. These values are scoped to the era and must not be reused outside its `[data-era]` block.

| Token | 2012 skeuomorphic | 2016 Material | 2020 dark glass | 2022 neo-brutal | 2024 AI chat |
|---|---|---|---|---|---|
| `--bg` | `#dde2e8` (body is a linen weave over `#d7dde4`) | `#fafafa` | `#0d0e1c` | `#fffdf2` | `#ffffff` |
| `--surface` | `#f2f4f7` | `#eeeeee` | `rgba(255,255,255,.06)` | `#ffffff` | `#f4f4f6` |
| `--ink` | `#263449` | `#212121` | `#eceaf8` | `#000000` | `#18181b` |
| `--muted` | `#4f5d70` | `#616161` | `#b0b2cf` | `#333333` | `#52525b` |
| `--rule` / `--rule-strong` | `#c4ccd6` / `#8d9aab` | `#e0e0e0` / `#e0e0e0` | `rgba(255,255,255,.14)` / `.22` | `#000` / `#000` | `#e4e4e7` / `#e4e4e7` |
| `--accent` | `#3d7d1a` | `#3f51b5` indigo | `#a78bfa` | `#000000` | `#6d28d9` |
| `--accent-soft` | `#eaf5df` | `#e8eaf6` | `rgba(167,139,250,.14)` | `#b9f2d8` mint | `#f3eefe` |
| Signature extras | Nav gradient `#6d83a0→#3a5070`, orange gloss chip `#ffcb5c→#f39a1c`, green gloss primary | Pink `#d81b60` (Material Pink 600, AA with white) for the chip and primary button, `#c2185b` on hover | Blobs `#7c3aed` / `#06b6d4` / `#ec4899` blurred 30px; gradient `135deg #7c3aed→#0e7490` for anything carrying white text | Yellow `#ffd23f`, mint `#b9f2d8`, lilac `#c4b5fd`, pink `#ff9fb2` | Grey bubble `#f4f4f6`, violet `#6d28d9` |

2020 also sets `color-scheme: dark`.

## Typography

**Families.** The base world uses two variable faces, both self-hosted:

- **Archivo** (`archivo-latin.woff2`, weight 100–900, stretch 62–125%) for everything. Width is the expressive axis: display text runs wide (125%) and labels run condensed (80–85%).
- **JetBrains Mono** (400–700) only for measurements and identifiers: years, part numbers, the measured column, tags, project meta, the model answer, the boot log.

Body sets `font-variant-numeric: tabular-nums` globally.

**Ramp as built (2026):**

| Role | Selector | Size | Weight / stretch | Line / tracking |
|---|---|---|---|---|
| Display | `.h-display` | `clamp(3.1rem, 8.2vw, 6rem)` | 800 / 125% | .9 / −.035em |
| Section | `.h-sec` | `clamp(2rem, 4vw, 3rem)` | 750 / 112% | 1 / −.025em, 1.5px top rule, 22px above |
| Lede | `.contact-lede` | `clamp(1.3rem, 2.4vw, 1.75rem)` | 600 / 105% | 1.3 |
| Item title | `.project h3` | 1.3rem | 700 / 108% | 1.2 |
| Subhead | `.h-sub` | 1.25rem | 700 / 105% | — |
| Hero role | `.hero-role` | `clamp(1.05rem, 1.6vw, 1.25rem)` | 600 | — |
| Prose | `.prose p` | 1.1rem | 400 | 1.7, max 66ch |
| Body | `body` | 17px (16px ≤640) | 400 | 1.6 |
| Table | `.table` | 15.5px | row heads 650 | — |
| Label | `.spec dt`, `thead th`, `caption`, `.c-k` | 11.5–12px | 700 / 80%, uppercase | +.07–.08em |
| Nav / chip | `.nav a`, `.rewind-chip` | 13px | 600–700 / 82–85%, uppercase | +.07em |
| Mono | `.mono` | .92em | — | −.01em |

**Era faces** are skin values only:

| Era | Faces |
|---|---|
| 2012 | Lobster for `.h-display`; Lucida Grande body; Helvetica Neue for `.h-sec` and project titles; Georgia for the model answer |
| 2016 | Roboto 300 display, Roboto 400–500 everywhere else |
| 2020 | Poppins 400/600/800 |
| 2022 | Keeps Archivo at 800–900, uppercase display and section heads |
| 2024 | `system-ui` stack, 650 weight |

Label treatment varies by era. 2012, 2020 and 2024 drop uppercase and condensed width (`text-transform: none; font-stretch: 100%`). 2016 keeps uppercase and drops only the condensed width. 2022 keeps the base labels unchanged.

## Layout

- **Container:** `--max: 1240px` (820px in 2024), side padding `--pad: clamp(20px, 4vw, 48px)`.
- **Grids:** the hero and About use a 7/5 split (`minmax(0,7fr) minmax(0,5fr)`). Contact is 5/7. Datasheet project rows are 4/6/3: title, description, tags. All gaps are `clamp(32px, 5vw, 72px)`.
- **Vertical rhythm:** sections open with `clamp(64px, 9vw, 112px)` of top padding, then a 1.5px ink rule on the heading. Content follows at 36–40px. Project rows have 26px padding. Table cells are `13px 16px 13px 0`; spec rows are `11px 16px`.
- **Table structure:** rows are separated by 1px `--rule` hairlines. `thead` takes a 1.5px `--rule-strong` underline. Tables never get zebra striping in 2026; 2012 alone stripes even rows.
- **Breakpoints** (`site.css:578–642`):
  - **≤1080px:** the bar becomes two rows and `.bar-sub` hides. The nav turns into a full-bleed horizontal scroller with a hidden scrollbar, a right-edge fade mask (`linear-gradient(90deg,#000 82%,transparent)`) and 40px trailing space. `scroll-padding-top` grows from 84px to 110px.
  - **≤900px:** the hero, About, Contact and project rows go single-column. The pinout restacks with the chip on top and the pins in two columns with short 14px leads.
  - **≤640px:** body text drops to 16px and the chip label hides (the year stays). Spec rows stack and the dial becomes 3×2. `.chars`, `.revs` and `.course` rows reflow into grid cards (thead hidden, accent-soft card for key rows). Awards stack. The 2024 prompt-bar shortcut links hide.
  - **≥901px (2024 only):** the chip column narrows to `minmax(120px,180px)`.

Overflow was verified at 0 for all six eras at 390px and 1440px (`.impeccable/review/report.txt`).

## Elevation & Depth

The 2026 base world is flat. Depth comes from rules and the ink band, not shadows. The only base glows are the status LED's 3px green ring (hard-coded `#3ddc84`) and the warn-coloured pulse ring.

Each era skin brings its own depth:

| Era | Depth |
|---|---|
| 2012 | Gloss gradients, inset highlights, `text-shadow` emboss, a dashed stitched outline inset on the machine panel, 3–10px soft drop shadows |
| 2016 | Material elevation (`0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)`), deepening on hover |
| 2020 | Blurred colour blobs behind everything, frosted panels (`backdrop-filter: blur(16–18px)`), `0 10px 40px` shadows, a cyan LED glow |
| 2022 | Hard offset shadows (`4–7px 4–7px 0 #000`) and a 5px pink offset `text-shadow` on the display. Buttons press in on hover (`translate(3px,3px)`, shadow 5→2px) |
| 2024 | Faint card shadows; the prompt bar floats on `0 8px 30px rgba(24,24,27,.14)` |

**Stacking:** boot 200 › skip link 100 › 2024 prompt bar 30 › sticky bar 20.

## Shapes

- `--radius: 3px` in the base world. Buttons, the chip, nav hovers, tags and the machine panel all use it. The focus ring rounds at 2px.
- The pinout chip body uses a 6px radius and has a semicircular notch (30×15px) cut in `--bg`.
- Era radii: 2012 7px (panels 9px, sections 8px); 2016 2px; 2020 14px (panels 20px, tables 18px, pills 999px); 2022 10px (panels 12px); 2024 999px pills (panels 22px, section bubbles 26px, project cards 18px).
- Icons are an inline SVG sprite (`#i-rewind`, `#i-forward`, `#i-out`, `#i-arrow`, `#i-chip`, `#i-spark`) sized to `1em`. The favicon is the same chip mark: an ink tile, a green die, mint pins and a white rewind glyph.

## Components

**`.bar`**: the sticky header, a 3-column grid (`auto 1fr auto`) at least 60px tall. It sits on a 94% bg mix with `blur(8px)` and a 1.5px ink underline. It holds:
- `.bar-id`: the chip icon, the part number `MH-<year>` in bold mono, and a condensed uppercase subtitle.
- `.nav`: centred, uppercase, condensed.
- `.rewind-chip`: an ink button whose mono year is in mint.

**`.rewind-chip`**: a one-step Rewind control. It always shows its **target** year, which is the previous era. At 2012 it flips to "Forward 2026" with the forward icon. The `aria-label` names the target, and the chip is described by `#rewindHint`.

**`.machine`**: the hero's right-hand panel, labelled "System <year>". Contents, top to bottom:
- **Head:** an ink band with the title and a `Running` status LED.
- **`.spec` `<dl>`:** rows on a 128px/1fr grid, with condensed uppercase `dt`. The `.spec-built` row ("I built") is tinted `--accent-soft` with a 600-weight `dd`. Fields are driven by `data-field` from the `ERAS` table.
- **`.ask`:** on `--surface`, this shows a fixed question ("Shortlist the best 5 candidates from these 200 resumes") and the era's answer in mono, typed by a typewriter with a block caret. A small label describes the model of that year.
- **`.dial`:** `role="toolbar"`, six `aria-pressed` buttons with roving tabindex. Arrow keys, Home and End move focus; Enter or Space boots the year. Above the dial is a 1.5px ink rule, and the pressed key fills with `--accent`.
- **`.hint`:** amber 600-weight text with the rewind icon, so the feature has a visible hint.

**`.table` variants**: all share the hairline and label structure.

| Variant | Content | Layout notes |
|---|---|---|
| `.facts` | Key facts | 38% muted row heads |
| `.chars` | Superpowers as "characteristics" | Measured column in accent mono, conditions muted |
| `.awards` | Recognition | Inline links in ink |
| `.revs` | Journey as a revision history | Rev / date / where / change / "Boot YEAR" button. `.rev-key` rows are tinted |
| `.course` | Coursework, added by the site owner | Sentence-case caption. `.course-year` rowgroup heads with a 1.5px rule. `.course-state` dot badge ("Complete" muted, "In progress" `.is-live` accent with a soft ring). `.course-key` rows tinted, `.course-el` electives muted at 500 weight. Credits column in accent |

Tables sit in `.table-wrap`, which uses `overflow-x: auto`.

**`.pinout`**: a figure with a three-column chip:
- left pins 1–8, right-aligned;
- an ink chip body with a notch, `MH-<year>` in mono and the line "AI · DATA · CLOUD";
- right pins 16–9.

Leads are 52×2px ink bars, and pin numbers are muted mono.

**`.projects` / `.project`**: an `<ol>` of `.project.panel` items.
- **2026:** datasheet rows on the 4/6/3 grid, separated by hairlines. Mono meta, mono tag boxes (1px rule, 3px radius) and an outbound `.link` with the `i-out` icon.
- **2012–2022:** `auto-fill minmax(300px,1fr)` card grids. In 2022 the card backgrounds rotate yellow, mint, lilac, pink.
- **2024:** stacked white rounded cards.

**`.btn`**: 1.5px ink outline, 600 15px, padding 14px 20px.
- On hover it inverts to ink.
- `.btn-primary` is ink and turns accent on hover.
- `.btn-small` is 8px 12px at 13px.
- `:disabled` drops to opacity .45.

**`.era-banner`**: hidden at 2026. In past eras it is a full-width `--warn` strip with white text: "You are viewing the YEAR edition… Hardware is typical for the year; model answers are illustrative." It carries a white "Back to 2026" button. Each era restyles it.

**`.boot`**: a fixed black overlay, `role="dialog" aria-modal="true"`. While it is up, the banner, bar, main, footer and prompt bar are all `inert`, and focus moves to Skip.
- **Log:** a mono 15px/1.7 `<pre>` in `#c9c9c9`. Lines run: a dim `MH-BIOS (C) YEAR` header, CPU, a memory counter that climbs to the era's RAM in MB and ends with a mint `OK`, storage, AI/GPU (2020 onward), network, then "Loading portfolio, YEAR edition…".
- **Progress bar:** a 14px outlined bar. Before 2020 it moves in 12 discrete steps (older machines stall); from 2020 it is continuous.
- **Skip:** an outlined Skip button with an `Esc` kbd. Esc anywhere also skips.
- **Exit:** the overlay fades out over .35s. Focus returns to the trigger, scroll position is anchored to the clicked control, and `?y=YEAR` and `document.title` update. An `aria-live` region announces each edition.

**Era-only fragments** (`.era-only[data-only]`, hidden by default):
- **2012:** a rotated red gloss badge, "Now on iPad!".
- **2024:** a right-aligned user bubble ("Who is Mahantesh Hiremath?", radius 22/22/6/22) and a violet assistant-avatar dot before the hero and each section head.
- **2024 prompt bar:** `.prompt-2024`, fixed 18px from the bottom, `min(780px, 100% − 24px)` wide, radius 26. It holds a labelled `role="search"` input and three shortcut links. On submit, a regex router sends the question to `#projects`, `#superpowers`, `#coursework`, `#contact` or `#journey`, falling back to `#about`, then focuses that section's `h2`. Body bottom padding grows to 96/120px so nothing is hidden behind it.

### Motion

The boot is the **one authored motion**. Everything else is functional:
- hover/state transitions of .18–.2s on `--ease` (`cubic-bezier(.16,1,.3,1)`);
- the typewriter caret (`steps(1)`, 1s);
- the 2022 button press-in.

**Boot timing per era.** Total `ms` splits 8% POST, 38% memory count, 50% progress.

| Era | Boot ms | Typewriter cps |
|---|---|---|
| 2012 | 3400 | 0 (answer appears instantly) |
| 2016 | 2600 | 0 (answer appears instantly) |
| 2020 | 1800 | 38 |
| 2022 | 1300 | 70 |
| 2024 | 900 | 110 |
| 2026 | 450 | 160 |

**First-visit pulse.** The 2012 dial key carries an amber dot that pulses `1.6s × 6` iterations, then stops. It appears only when `localStorage["mh-rewound"]` is unset, and is removed on the first Rewind.

**Reduced motion.** With `prefers-reduced-motion: reduce`:
- JS skips the boot entirely (instant apply) and the typing (full text at once).
- CSS clamps all animations and transitions to .001ms and a single iteration, and turns off smooth scroll.

## Do's and Don'ts

**Do**
- Treat the page as a datasheet. Facts go in labelled rows with tabular figures, and measurements, years and identifiers go in JetBrains Mono.
- Keep width doing the expressive work: wide Archivo (112–125%) for headings, condensed (80–85%) uppercase for field labels.
- Use `--accent` only for "active / measured / OK / you are here", and `--warn` only for the hint, the past-era banner and the first-visit pulse.
- Separate rows with 1px `--rule`, and reserve 1.5px `--rule-strong` for structure (bar, section heads, thead, panel edges).
- Theme the chrome: `::selection` is accent on accent-ink, `:focus-visible` is a 2px accent outline at 3px offset, and `scrollbar-color` is ink on surface. Every era inherits these through its tokens.
- Label the Rewind facts honestly: machine specs are "typical", model answers are "illustrative reconstructions", career facts are real (banner + footer note).
- When adding a component, give it base-world styles first, then an override in each `[data-era]` block. Token swaps alone don't carry an era.
- Keep everything CSP-clean: self-hosted assets, no inline styles or handlers, runtime styling through CSSOM only.
- Keep the Rewind controls keyboard-operable: a roving-tabindex toolbar, Esc to skip, focus restored, live-region announcements.

**Don't**
- Don't add eyebrow or kicker labels above headings. Section heads stand alone on their rule; the uppercase labels in this system are table captions, `dt`s and contact keys, i.e. datasheet fields.
- Don't let era values (Lobster, Roboto, Poppins, system-ui, indigo/pink, violet gradients, blobs, glass blur, offset shadows, linen) leak outside their `[data-era]` scope. They are pastiche, not house style.
- Don't add shadows or gradients to the 2026 world.
- Don't use glyph characters as icons. Use the SVG sprite.
- Don't let the feature block navigation. Real nav stays instant; only the boot is slow, and it is always skippable.
- Don't fall below WCAG AA for text in the base world. All base pairs measured pass; the lowest is accent on accent-soft at 4.52:1.
