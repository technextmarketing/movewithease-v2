---
name: Move with Ease
description: A white page, one breathing yellow sun and green type — the wellbeing and chronic pain recovery practice of Caroline Miller, Laddingford, Kent.
colors:
  yellow: "#eeb500"
  yellow-deep: "#d9a400"
  green: "#3e7d78"
  green-deep: "#2f6560"
  green-ink: "#173534"
  green-on-yellow: "#24504a"
  green-050: "#f3f8f7"
  green-100: "#dbe9e6"
  green-200: "#b9d3ce"
  ink: "#182422"
  body: "#3d4c4a"
  muted: "#5f706d"
  line: "#e2ebe9"
  paper: "#ffffff"
  red: "#b3261e"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.7rem, 2.9vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  price:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum', 'lnum'"
  lead:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
  small:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.4
  chip:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: "8px"
  control: "10px"
  button: "12px"
  card: "14px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  grid: "20px"
  gutter: "24px"
  card: "28px"
  sec-head: "44px"
  quiet: "64px"
  band: "72px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.yellow-deep}"
    textColor: "{colors.green-ink}"
  button-primary-lg:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    rounded: "{rounded.button}"
    padding: "0 24px"
    height: "52px"
  button-primary-compact:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.green-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "46px"
  button-ghost-hover:
    backgroundColor: "{colors.green-050}"
    textColor: "{colors.green-deep}"
  button-dark:
    backgroundColor: "{colors.green-ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "46px"
  button-dark-hover:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.paper}"
  icon-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.green-ink}"
    rounded: "{rounded.control}"
    size: "42px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 13px"
    height: "40px"
  nav-link-hover:
    backgroundColor: "{colors.green-050}"
    textColor: "{colors.green-deep}"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.green-deep}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body}"
    rounded: "{rounded.card}"
    padding: "28px"
  card-start:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    rounded: "{rounded.card}"
    padding: "26px 26px 22px"
  card-start-hover:
    backgroundColor: "{colors.yellow-deep}"
    textColor: "{colors.green-ink}"
  tag-live:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "24px"
  tag-past:
    backgroundColor: "{colors.green-050}"
    textColor: "{colors.muted}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "24px"
  chip-place:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body}"
    rounded: "{rounded.pill}"
    padding: "0 10px 0 8px"
    height: "32px"
  option-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body}"
    padding: "16px 18px"
  option-row-hover:
    backgroundColor: "{colors.green-050}"
    textColor: "{colors.body}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "48px"
  invitation-band:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.green-ink}"
    padding: "72px 0"
  video-facade:
    backgroundColor: "{colors.green-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
  map-facade:
    backgroundColor: "{colors.green-050}"
    textColor: "{colors.green-ink}"
    rounded: "{rounded.card}"
    padding: "20px"
---

# Design System: Move with Ease

## Overview

**Creative North Star: "The Breathing Page"**

A pure white page with one large yellow circle on it, breathing. Everything else is green type, thin green-grey lines and the client's own photographs. The system takes the shell of a modern agency site (a sticky white header with the emblem left, centred navigation with drop-downs and one yellow button right; big display headings, short leads, card grids on alternating white and faintly tinted bands) and strips out everything techy — no gradients, no glass, no stats, no blue. It also refuses the wellness category's defaults — no cream, no serif, no lavender, no stock woman on a mat. What remains is a calm, dense-then-quiet reading page for people who may be in pain, tired or on a phone.

The world's two colours come straight from the logo and never trade roles. Logo yellow (#eeb500) is a **field** colour: it fills the breathing sun, the primary button, the closing invitation band, the "not sure where to start" card, the live tag, the numbered-step counters — and it always carries dark green ink, never white text. Logo green does the talking: near-black green for headings and button ink, deep green for links and the active navigation state, mid green for the brand name, icons and every browser surface (focus ring, caret, form accent, scrollbar). The only tinted surface is a barely-there green-white (#f3f8f7).

Motion is a single slow breath: the sun scales 1.00 → 1.06 over four seconds and back over six, forever, with a small caption alternating "Breathe in" / "Breathe out" in time. Nothing else on the page loops. Buttons lift 2px, cards lift 3px, arrows nudge 4px, the drop-down fades in over 180 ms and the phone drawer slides in over 300 ms — all in response to the visitor, all settling within 350 ms, and all switched off under `prefers-reduced-motion`.

**Key Characteristics:**
- Pure white ground (#ffffff); one tint (#f3f8f7); no cream, no gradients, no glass.
- Yellow owns whole fields and always carries dark green ink (#173534 or #24504a); yellow never sits under white text.
- Green carries the voice: headings #173534, links and active states #2f6560, brand, icons and browser surfaces #3e7d78.
- Plus Jakarta Sans 700–800 display with tight tracking; Inter 400–600 text; tabular lining numerals on every price and time.
- Cards are white with a 1px green-grey line and a 14px radius; buttons 12px; chips are pills; photographs 20px.
- Rules and space before boxes: content sits between 1px lines and generous section gaps; cards are never nested.
- Authored 24-unit SVG icons, 2px stroke, round caps, one small set (arrow, check, chevron, play, pin, mail, monitor, menu, close, star).
- Every raster is the client's own photograph or poster; the emblem is cropped from the logo; the favicon is authored SVG.
- Copy is first person, plain, warm and unhurried, in British English; headings stand alone with no kicker or eyebrow above them.

## Colors

Two logo colours on white: yellow as a rare, whole-field warmth; green as the entire voice of the type; a single cool tint for quiet bands.

### Primary
- **Logo Yellow** (`yellow`): The sun disc behind the hero photo, the primary button, the closing invitation band, the "start here" card, the live tag pill, the numbered-step counters, the 3px active-navigation bar and the 3px underline beneath the recommended price in an option list. It is a field colour: it fills shapes and always carries dark green ink. Selection highlight is also yellow with ink text.
- **Deep Yellow** (`yellow-deep`): The hover state of every yellow field (primary button, start card) and the five review stars. Never used at rest on a field.

### Secondary
- **Logo Green** (`green`): The brand wordmark in the header and footer, every inline icon at rest (pins, arrows in lists, check marks, the monitor), the focus ring, the text caret, `accent-color` for the consent checkbox, the scrollbar thumb, the breath-cue dot and the ghost button's hover border.
- **Deep Green** (`green-deep`): Every text link, the active and hovered navigation link, hovered card titles, hovered footer links, `.dd-head` links, and the hover fill of dark buttons. This is the green that reads as "clickable".
- **Green Ink** (`green-ink`): Every heading (h1–h4), block titles, prices, the brand `.brand` colour, the ink on all yellow fields, the fill of dark buttons and the video facade, the drawer overlay tint (`rgba(23,53,52,.38)`) and the base of every shadow (`rgba(23,53,52,…)`).
- **Green on Yellow** (`green-on-yellow`): Body copy set on a yellow field — the invitation band paragraph and the start card's description and price qualifier.

### Tertiary (the tints)
- **Green Tint** (`green-050`): The only tinted surface. Alternate section bands (`.section--alt`, `.blocks--alt`), the note box, quotes inside reading blocks, the past tag, the map facade, the check-mark disc, and every hover fill for links, nav items, option rows and ghost buttons. The stylesheet exposes it twice (`--green-050` and `--alt`) with the same value.
- **Green Tint 100** (`green-100`): The note box border and the map facade's hover fill.
- **Green Tint 200** (`green-200`): The ghost button border at rest, the border cards adopt on hover, form field borders at rest, the `.text-link` underline at rest, and the breadcrumb separator.

### Neutral
- **Ink** (`ink`): Navigation links at rest, drop-down and drawer item titles, `strong`, `em`, form labels, `.lede`, table headers, place addresses, tile titles.
- **Body** (`body`): Default text colour (`body` element), leads, card copy, quotes, footer text.
- **Muted** (`muted`): Captions, notes, hints, breadcrumbs, `small` qualifiers under prices, drop-down and drawer group headings, chevrons, placeholder text, the past tag's text, footer bottom bar.
- **Line** (`line`): Every 1px rule and border: cards, rows, quotes, the where strip, the header when scrolled, block separators, price and hours rows, icon buttons, chips.
- **Paper** (`paper`): The ground, card and input fill, the 6px frame around the hero photo, the header (at 92% opacity with a 10px blur behind), the drawer, `theme-color`. `color-scheme` is fixed to `light`; there is no dark theme.

### Signal
- **Error Red** (`red`): Field error text and the invalid field border only. Nowhere else on the site.

### Contrast pairs in use
- Green Ink on Logo Yellow ≈ 7.0:1 (button labels, band heading, start card, step numbers, live tag).
- Green on Yellow (#24504a) on Logo Yellow ≈ 4.8:1 (band body copy, start card copy).
- Body on Paper ≈ 9.0:1; Body on Green Tint ≈ 8.0:1.
- Muted on Paper ≈ 5.2:1; Muted on Green Tint ≈ 4.9:1 (the floor for small text).
- Deep Green on Paper ≈ 6.7:1 (links); Logo Green on Paper ≈ 4.8:1 (brand name at 1.15rem 700 and icons only, never running text).
- Paper on Green Ink ≈ 13:1; Paper on Deep Green ≈ 6.7:1 (dark buttons, video facade, skip link).
- Error Red on Paper ≈ 6.5:1.

### Browser surfaces
- `::selection` is Logo Yellow with Ink text. `caret-color`, `accent-color` and `scrollbar-color` (thumb) are Logo Green; the scrollbar track is Green Tint. `:focus-visible` is a 2px Logo Green outline, offset 3px, with a 4px radius. `theme-color` is Paper. Prices and times use `font-variant-numeric: tabular-nums lining-nums`.

### Named Rules
**The Yellow Owns Fields Rule.** Yellow appears only as a filled shape — disc, button, band, card, pill, counter, 3px bar — and every such shape carries dark green ink (#173534 or #24504a). Yellow is never a text colour on white, and white text never sits on yellow. When a button must sit on the yellow band, it swaps to a Green Ink fill with Paper text.

**The One Tint Rule.** #f3f8f7 is the only tinted surface. No cream, no warm grey, no gradient, no translucent glass beyond the header's 92% white.

**The Green Carries the Voice Rule.** Headings speak in Green Ink, links in Deep Green, icons and the brand in Logo Green. Nothing on the page is blue, black or grey-black; even the shadows are green-tinted.

## Typography

**Display Font:** Plus Jakarta Sans (variable 500–800, self-hosted latin + latin-ext woff2, preloaded, `font-display: swap`), falling back to system-ui / Segoe UI.
**Body Font:** Inter (variable 400–600, self-hosted latin + latin-ext woff2, preloaded), same fallback stack.

**Character:** A friendly geometric display face set heavy and tight over a neutral, highly legible text face. Headings feel confident and warm without shouting; body copy is unhurried at 16px on a 1.65 line height. Nothing is uppercase, nothing is letter-spaced wide, nothing is italic by design.

### Hierarchy
- **Display** (800, `clamp(2.2rem, 4.6vw, 3.6rem)`, 1.06, −0.025em): The home h1 only. `text-wrap: balance`.
- **Page title** (800, `clamp(2rem, 4vw, 3.1rem)`, 1.06): Inner-page h1 (`.page-hero__title`).
- **Headline** (700, `clamp(1.7rem, 2.9vw, 2.4rem)`, 1.12, −0.015em): Section h2 on the home page and the invitation band.
- **Block title** (700, `clamp(1.35rem, 2vw, 1.75rem)`, 1.2): The sticky left-column h2 of a reading block; full-width blocks step up to `clamp(1.6rem, 2.6vw, 2.1rem)`.
- **Title** (700, 1.2rem, 1.3, −0.015em): Card and row h3 (cards 1.12rem, rows 1.25rem, quiet list 1.15rem, footer h2 1.125rem, note h3 1.05rem). h4 is 1rem / 1.35.
- **Price** (700, tabular lining numerals, −0.02em, line-height 1): Every price, day and time set in the display face — 1.55rem in therapy cards, 1.5rem in rows, 1.3rem in option lists (1.05rem when the "price" is a word such as Free, Form, Thu), 1.25rem in price tables, 1.75rem in the voucher grid. Its qualifier is Inter 500 13.5–14px Muted.
- **Lead** (400, 1.15rem, 1.6, Body, max 62ch): The paragraph under an h1. A second lead (`.lead--2`) drops to 1.02rem.
- **Lede** (500, 1.12rem, 1.55, Ink): The first paragraph of a story block.
- **Body** (400, 16px, 1.65, Body): Default. Card and quote copy 15–15.5px / 1.55–1.6.
- **Label** (600, 15px, 1): Buttons, `.btn-link`, drop-down item titles; 14px in compact buttons and form labels; 13.5px in the phone header button.
- **Small** (400, 13.5–14px, 1.4, Muted): Captions, hints, notes, breadcrumbs, footer bottom bar.
- **Chip** (600, 12.5px, 1): Tag pills; group headings in the drawer and footer tagline at 12px.

### Measures
- Section intros (`.sec-head`) max 660px; leads 62ch; band copy 60ch; reading-block body column 2.1fr of a 1fr/2.1fr grid inside a 1200px container; figures inside blocks max 560px; hours table max 560px.

### Named Rules
**The Tabular Price Rule.** Every price, day and time is Plus Jakarta Sans 700 with tabular lining numerals and a Muted Inter qualifier beneath. Prices never appear in Inter and never in a colour other than Green Ink (Muted when the event has passed).

**The No Kicker Rule.** Headings stand alone. There is no eyebrow, kicker, overline or small caps label above any h1, h2 or h3 anywhere on the site; hierarchy comes from size and the space around the heading.

**The Balanced Heading Rule.** All headings carry `text-wrap: balance` and negative tracking; body copy never does.

## Layout

A single 1200px container with 24px gutters (20px below 760px) on a white ground; a sticky 72px header; sections that alternate a dense passage with a quiet one.

**Header (all pages):** sticky, 72px, four-column grid `auto 1fr auto auto` — emblem (40px) + wordmark left, navigation centred, yellow compact button right, and a 42px menu icon button that appears below 1024px when the navigation hides. The header is 92% white with a 10px blur; a 1px Line border and a soft shadow appear once the page has scrolled 8px. Below 480px the wordmark hides and the button shrinks to 38px with its arrow removed.

**Home anatomy (1440):** hero 56px top / 40px bottom, two columns `1.1fr / .9fr` with a 48px gap, copy left (h1, lead, two buttons, four place chips), the breathing sun and photo right in a square up to 540px. Then the "where and when" strip: a four-column grid of pin-led items between two 1px lines, 22px tall padding. Then sections at 96px vertical padding alternating white and Green Tint: therapy grid (4 columns, 20px gap, section head + arrow link in a row), Caroline split (`1fr / 1.35fr`, portrait figure max 440px), video split (even), classes grid (auto-fit ≥280px), a quiet list at 64px padding (`.section--quiet`), reviews (auto-fit ≥300px), the yellow invitation band at 72px, and a four-column footer `1.15fr .85fr 1.6fr .9fr` with a 40/44px gap, ending in a bottom bar.

**Inner-page anatomy:** a page hero at 48px / 32px with a `1.3fr / .9fr` grid and a 64px gap — title and leads left, a sticky aside right (`top: header + 20px`) holding an option list and a note. Then `.blocks`: each block is a `1fr / 2.1fr` grid with a 64px gap and 44px vertical padding, separated by 1px lines, with its h2 sticky in the left column (`top: header + 24px`). Full-width blocks (`.block--full`) drop the two columns for grids and rows. A tinted block band (`.blocks--alt`) is 56px tall with no rules. Every page ends with the invitation band, then the footer.

**Spacing rhythm:** 8 / 12 / 16 / 20 / 24 / 28 / 44 / 48 / 64 / 72 / 96. Cards pad 28px (rows 28px, quotes 26/28, places 24, tiles 14); grids gap 20px; button groups gap 12px; section heads sit 44px above their grid (32px on phones); rows stack at 16px; lists at 10px.

**Breakpoints (max-width):** 1100 (therapy grid 4 → 2 columns) · 1023 (navigation → drawer) · 1000 (where strip and footer 4 → 2) · 960 (inner hero and blocks stack; sticky titles release) · 900 (home hero stacks; sun square max 320px) · 860 (invitation band stacks) · 760 (sections 96 → 64, gutters 24 → 20, splits and quiet list stack) · 640 (rows and the enquiry form go single column) · 560 (all grids single column) · 480 (header wordmark hides).

**Phone drawer:** a right-hand panel `min(420px, 100%)` wide, full height, white, scrolling, over a `rgba(23,53,52,.38)` overlay; items are 56px `details`/`summary` rows with 1px separators, then two full-width buttons and contact lines. Body scroll locks while open.

### Named Rules
**The Dense-then-Quiet Rule.** A dense passage (a card grid or row list at 96px) is always followed by a quieter one (a tinted band, a split with one photograph, or a lined quiet list at 64px). Two dense grids never sit back to back.

**The Rules Before Boxes Rule.** Enclose nothing unnecessarily. Lists, tables and reading blocks sit between 1px lines; a card is used only when the item is a link or a self-contained offer; cards are never nested inside cards.

## Elevation & Depth

The system is flat by line. Surfaces rest on the white ground separated by 1px Line borders and tint bands, not by shadow. Shadow arrives as a response — hover, open, scrolled, focus — and on the few objects that stand slightly off the page at rest: photographs, the option list and the voucher grid tiles. Every shadow is tinted with Green Ink (`rgba(23,53,52,…)`), never neutral black, and the yellow button glows yellow.

### Shadow Vocabulary
- **Resting lift** (`box-shadow: 0 1px 2px rgba(23,53,52,.06), 0 6px 16px -12px rgba(23,53,52,.28)`; `--shadow-sm`): Photographs in figures and rows, the option list, voucher tiles, hovered rows.
- **Hover lift** (`box-shadow: 0 2px 6px rgba(23,53,52,.06), 0 16px 30px -22px rgba(23,53,52,.35)`; `--shadow-md`): Hovered cards, therapy cards and tiles (with a 3px rise), the hero photo frame, the open drop-down.
- **Yellow glow** (`box-shadow: 0 12px 28px -12px rgba(217,164,0,.6)`; `--shadow-yellow`): Hovered primary button, hovered start card, hovered video play disc.
- **Dark glow** (`box-shadow: 0 12px 28px -14px rgba(23,53,52,.6)`): Hovered dark button.
- **Header scrolled** (`box-shadow: 0 8px 24px -22px rgba(23,53,52,.35)` + 1px Line border): Once `scrollY > 8`.
- **Drawer** (`box-shadow: -20px 0 60px -30px rgba(23,53,52,.5)`): The open phone navigation panel.
- **Focus glow** (`box-shadow: 0 0 0 3px rgba(62,125,120,.18)` + Logo Green border): Focused inputs, selects and textareas (replaces the outline).
- **Primary at rest** (`box-shadow: 0 1px 2px rgba(23,53,52,.08)`): The only shadow a button carries before hover.

### Named Rules
**The Shadow Answers Rule.** A surface is flat at rest and gains shadow only when it answers the visitor (hover, focus, open) or floats above the page (header when scrolled, drop-down, drawer). Photographs and the option list are the recorded exceptions that rest with the small lift.

## Shapes

Softly rounded, never pill-shaped except where the object is a pill or a circle. Containers and cards use a 14px radius (`card`), buttons 12px (`button`), compact controls, inputs, icon buttons and drop-down items 10px (`control`), navigation links and the skip link 8px (`sm`), photographs and the video facade 20px (`lg`), tile thumbnails 10px. Chips, tags and the active-nav bar's ends are pills (999px / 2px). Circles are structural: the sun (76% of its square), its 2px ring at −9% inset, the 8px breath-cue dot, 22px check discs, 32px yellow step counters and the 68px play disc.

Borders are always 1px in Line (Green Tint 200 on hover, Logo Green on focus, Error Red when invalid); the hero photo alone wears a 6px Paper frame. The ghost button on the yellow band uses a translucent ink border (`rgba(23,53,52,.35)`). There are no hard offset shadows, no gradients, no diagonal cuts, no blobs. Icons are drawn on a 24-unit grid with a 2px stroke, round caps and joins (the check inside list discs is 2.6, form icons 2.25), filled only for the play triangle and the stars.

## Components

Buttons are compact and confident; cards are quiet until touched; inputs are tall and generous. Every interactive element has a hover response, a `:focus-visible` ring and (for buttons) a press state.

### Buttons (`.btn`)
- **Shape:** softly rounded (12px), 46px tall, 20px side padding, Inter 600 15px, 8px gap to an 18px arrow icon; `.btn--lg` 52px / 24px / 16px; `.btn--sm` 38px / 14px / 14px / 10px radius; header button 40px / 16px / 14px / 10px radius.
- **Primary (`.btn--primary`):** Logo Yellow fill, Green Ink text, resting 1px shadow. Hover: Deep Yellow fill, yellow glow, 2px rise, arrow nudges 4px right. Active: scale .97. Busy (`aria-busy`): 75% opacity, no pointer.
- **Ghost (`.btn--ghost`):** Paper fill, 1px Green Tint 200 border, Green Ink text. Hover: Logo Green border, Green Tint fill, Deep Green text.
- **Dark (`.btn--dark`):** Green Ink fill, Paper text. Hover: Deep Green fill, dark glow.
- **On the yellow band:** `.btn--primary` swaps to the dark treatment (Green Ink fill, Paper text) and `.btn--ghost` becomes transparent with a translucent ink border, hovering to 35% white. Yellow never carries white text, so the yellow button cannot exist on the yellow band.
- **Arrow link (`.btn-link`):** Deep Green Inter 600 15px with an 18px arrow; a 1.5px underline grows from the left on hover (`scaleX 0 → 1`, 250 ms) and the arrow nudges 4px. Used as "Find out more" inside cards (where the whole card is the link and triggers it) and as the section head's trailing link.
- **Text link (`.text-link`):** Deep Green, underlined in Green Tint 200; the underline darkens to the text colour on hover.
- **Icon button (`.icon-btn`):** 42px square, 10px radius, 1px Line border, 22px icon; menu open/close. Hover: tint fill, Green Tint 200 border.

### Chips
- **Tag (`.tag`):** 24px pill, Inter 600 12.5px, 10px side padding. `.tag--live` is Logo Yellow with Green Ink ("Next workshop"); `.tag--past` is Green Tint with Muted text and a 1px Line border ("Previous workshop", "Dates tbc").
- **Place chip (`.hero__places li`):** 32px pill, 1px Line border, Paper fill, 13px Body text, 15px Logo Green pin or monitor icon. Static; not interactive.
- **Where item (`.where__item`):** not a chip but the same idiom without the pill — 18px Logo Green icon, Ink bold line, Muted second line, 14px / 1.35.

### Cards / Containers
- **Corner style:** 14px on every card, row, quote, place, note, tile and option list; 20px on figures and the video facade.
- **Background:** Paper on white and on tinted bands alike (quotes inside `.blocks` switch to Green Tint with no border; past rows go Green Tint with no border).
- **Border:** 1px Line; Green Tint 200 on hover. The note box uses Green Tint fill with a Green Tint 100 border.
- **Shadow:** none at rest; hover lift with a 3px rise on `.card`, `.tcard`, `.tile` and voucher tiles; resting lift on `.row` hover only (no rise).
- **Internal padding:** 28px (`.card`, `.row`); 26px 26px 22px (`.tcard`); 26px 28px (`.quote`); 24px (`.place`); 22px 24px (`.note`); 14px (`.tile`).
- **Therapy card (`.tcard`):** the whole card is the link; h3 1.12rem, price line in the display face at 1.55rem with a Muted qualifier, 15px copy that flexes to fill, and a 14px arrow link whose underline and arrow animate when the card is hovered.
- **Start card (`.tcard--start`):** the one yellow card — Logo Yellow fill and border, Green Ink heading, price and link, Green on Yellow copy; hover Deep Yellow with the yellow glow. Used once per grid as the "Not sure where to start?" offer.
- **Quote (`.quote`):** five Deep Yellow 18px stars, 15.5px copy, footer name in Ink 600 with a Muted role line.
- **Row (`.row`):** a flex card for therapies, classes and workshops — title + copy (`.row__what`, ≥320px), a display-face when/price column (`.row__when`, 220–240px, tabular), an optional 200px poster (`.row__media`, 14px radius, resting lift) and a full-width action line. Past rows (`.row--past`) sit on Green Tint with a Muted when column.
- **Note (`.note`):** Green Tint box with a Green Tint 100 border for cautions such as "Please see your doctor first"; check discs inside turn Paper.
- **Place (`.place`) and Tile (`.tile`):** small cards for venues (address in Ink 500) and blog/resource thumbnails (square image, 10px radius, Ink 600 15px title, Muted 13px meta).

### Option list (`.options`) — the price/route list
- A stacked list in one 14px-radius container with a 1px Line border and the resting lift; rows separated by 1px lines; each row is a link laid out `price | label + note | arrow` at 16px 18px padding, hovering to Green Tint with the arrow nudging 4px.
- The price is Plus Jakarta Sans 700 1.3rem Green Ink (1.05rem when it is a word). **The first row's price alone carries a 3px Logo Yellow underline, offset 5px** — the recommended option renders solid, the others quiet. This is the site's single highlight rule.
- **Voucher grid (`.options--grid`):** the same rows as separate centred tiles (auto-fit ≥118px, 24px 16px padding, 1.75rem price, no underline, no arrow) that lift 3px on hover.

### Inputs / Fields (`.field`)
- **Style:** 48px tall (textarea ≥150px, vertically resizable), 14px side padding, 1px Green Tint 200 border, 10px radius, Paper fill, Inter 16px Ink; label Inter 600 14px Ink with a Muted "(optional)" span; hint 13.5px Muted below.
- **Select:** native select with the arrow removed and an 18px Muted chevron drawn in at right; 44px right padding.
- **Focus:** Logo Green border plus a 3px `rgba(62,125,120,.18)` glow; outline removed.
- **Error:** the wrapper gains `.is-invalid`; the border turns Error Red and a 13.5px red message with a 16px circle-alert icon appears beneath. Validation runs only after the first submit attempt, then live on input/blur; the status line under the button announces the count.
- **Checkbox:** 20px native box using `accent-color` Logo Green, label 14.5px Body.
- **Submit:** a primary button whose text becomes "Sending…" and gains `aria-busy` once the form is valid.
- **Form grid:** two columns with a 20px 24px gap; message and consent span both; single column below 640px.

### Navigation
- **Header nav (`.nav-link`):** Inter 500 15px Ink, 40px tall, 13px side padding, 8px radius, 2px apart. Hover: Green Tint fill, Deep Green text. Current page or open section: Deep Green text plus a 3px Logo Yellow bar (2px radius) inset 13px from each side, 4px above the bottom. Drop-down triggers carry a 15px Muted chevron that rotates 180° when open.
- **Drop-down (`.dd`):** a white 14px-radius panel with a 1px Line border and the hover-lift shadow, 12px padding, ≥300px wide (the two-column Therapies panel ≥640px). Items (`.dd-link`) are 10px-radius rows with an Ink 600 15px title and a Muted 13px price/time line; hover tint; the current page's title turns Deep Green. Group headings (`.dd-head`) are Muted 600 13px, or a Deep Green link. Opens on hover (fine pointers, 160 ms leave delay) or click, closes on Escape, outside click or focus leaving; fades in 180 ms rising 6px.
- **Drawer (`.mnav`):** 56px `summary` rows in Plus Jakarta Sans 600 17px Green Ink, chevron rotating open, group headings in Muted 600 12px, 46px-tall items at 15.5px (current page Deep Green 600), then a stacked yellow + ghost button pair and Muted contact lines with Logo Green icons. Focus is trapped, Escape closes, the section holding the current page opens itself.
- **Breadcrumb (`.crumb`):** 14px Muted with a Green Tint 200 "›" separator.
- **Footer:** four columns on a 1px Line top rule, 64px top padding; Plus Jakarta Sans h2 at 1.125rem Green Ink; 14px Body links hovering Deep Green; 40px social squares (10px radius, 1px Line, 19px icons); an hours table with 1px Line row rules, Ink 600 day headers and Muted places; a map facade; a Muted 13.5px bottom bar.

### Lists
- **Checks (`.checks`):** 22px Green Tint discs with a 14px Logo Green check (2.6 stroke), 32px text indent, 10px gap; two-column variant ≥240px.
- **Links (`.links`):** Deep Green 500 rows with an 18px Logo Green arrow, 10px 12px padding pulled 12px left so the text aligns, hover tint.
- **Steps (`.steps`):** 32px Logo Yellow circles with a Green Ink Plus Jakarta Sans 700 14px counter, 48px indent, 14px gap.
- **Prices (`.prices`):** a `dl` with 1px Line rules above each row and below the last; `dt` in the display face at 1.25rem in a 5.5ch column, `dd` 15.5px.
- **Quiet list (`.quiet-list`):** full-width link rows `1.1fr | 2fr | arrow` between 1px lines, 22px tall padding, title in Plus Jakarta Sans 700 1.15rem Green Ink with a Muted 14px sub-line, 15.5px description, hover tint and arrow nudge.
- **Hours (`.hours`):** borderless table, 1px Line row rules, 9px cells (12px in reading blocks), Ink 600 day header 6.5em wide, nowrap Ink time, Muted place.

### Facades (no third-party code until asked)
- **Video (`.video`):** a 16:9 Green Ink box, 20px radius, max 820px, holding one button: a 68px Logo Yellow play disc with a 30px Green Ink triangle above a Paper 600 15px label. Hover scales the disc 1.06 with the yellow glow. Clicking swaps in a lazy `youtube-nocookie` iframe.
- **Map (`.map-facade`):** a ≥150px Green Tint panel, 1px Line border, 14px radius, with a 26px Logo Green pin, Green Ink 600 14px label and Muted "Loads Google Maps" line; hover Green Tint 100 with a Green Tint 200 border. Clicking swaps in the Google Maps iframe (220px tall, 14px radius) and keeps the "Open in Google Maps" link beneath.

### Signature: the Breathing Sun (`.hero__visual`)
A square up to 540px. The sun (`.sun`) is a Logo Yellow circle at 76% width placed 4% from the top-left, with a 2px Logo Yellow ring at −9% inset and 45% opacity. Over its lower-right edge sits the garden portrait (`.hero__photo`, 58% wide, 3:4, 20px radius, 6px Paper frame, hover-lift shadow). At bottom-left a 14px Inter 600 Green Ink caption with an 8px Logo Green dot alternates "Breathe in" / "Breathe out".

**Motion:** one 10-second `ease-in-out` loop (`--breath`). The disc scales 1.00 → 1.06 by 40% (four seconds in) and back to 1.00 by 100% (six seconds out); the ring runs .97 → 1.04 with opacity .15 → .5 on the same curve; "Breathe in" fades in over 0–6%, holds to 34%, fades out by 42%; "Breathe out" fades in 40–48%, holds to 92%, fades out by 100%. Nothing else on the site loops.

**Reduced motion:** under `prefers-reduced-motion: reduce` every animation and transition is removed (`animation: none; transition: none; scroll-behavior: auto`), the disc rests at scale 1.00, "Breathe out" is hidden and "Breathe in" stays visible. The review captures were taken this way, so they show a static disc with "Breathe in" only.

**Phones (≤900px):** the square shrinks to 320px, the disc to 68% at 9% / 6%, the photo to 56% at 4% / 8%.

### Invitation band (`.invite`)
The closing section of every page: Logo Yellow field, 72px tall padding (56px below 860px), grid `1.3fr | auto` with a 48px gap. Headline h2 in Green Ink ("A gentle invitation"), 1.12rem Green on Yellow copy at max 60ch, and two large buttons: dark (Green Ink fill, Paper text) and the translucent-border ghost. Hidden in print.

### Icons
One authored set on a 24-unit grid, `stroke="currentColor"`, 2px stroke, round caps and joins, `aria-hidden`: arrow (→), check, chevron (down), play (filled), pin, mail, monitor (Zoom), menu, close, circle-alert, send, star (filled), Instagram, Facebook, YouTube. Sized by the `.ic` class at 1em, 18px in buttons and lists, 15px for chips and nav chevrons, 22px in icon buttons, 26–30px in facades. Icons take their colour from the text (Logo Green at rest in lists and chips, Green Ink in buttons, Muted for chevrons) and never sit in a coloured badge except the check disc and the play disc. Arrows nudge 4px right on hover.

### Imagery
Every raster is the client's own photograph or poster from the live site, resized and re-encoded (`assets/img/SOURCES.md` lists the source of each). Photographs sit in 20px-radius frames (14px when `.figure--plain` or inside rows and galleries), full column width, with the resting lift; portraits max 440px; the hero portrait wears a 6px white frame. Workshop posters appear as 200px squares in rows; blog tiles as squares with a 10px radius. The emblem (`move-with-ease-emblem.png`, 40px in the header, 44px in the footer, 36px in the drawer) is cropped from the logo; the favicon is authored SVG drawn from the logo's sun and leaves. No stock people, no generated imagery, no decorative illustration beyond the sun.

## Do's and Don'ts

### Do:
- **Do** keep the ground pure white (#ffffff) and use #f3f8f7 as the only tint, alternating bands white → tint → white.
- **Do** fill yellow shapes (#eeb500) with dark green ink (#173534 for headings, labels and prices; #24504a for body copy) — the only two text colours that may sit on yellow.
- **Do** swap the primary button to the dark treatment (#173534 fill, white text) whenever it sits on the yellow band; use the translucent-border ghost beside it.
- **Do** set every price, day and time in Plus Jakarta Sans 700 with tabular lining numerals and a Muted Inter qualifier beneath.
- **Do** underline only the first (recommended) price in an option list, 3px yellow offset 5px; leave the rest quiet.
- **Do** use 14px radius for cards and containers, 12px for buttons, 10px for inputs and compact controls, 20px for photographs, pills for chips.
- **Do** rest surfaces on 1px #e2ebe9 lines and let shadow arrive on hover, focus or open; tint every shadow with rgba(23,53,52,…).
- **Do** keep one continuous motion — the 10 s breath (4 s in, 6 s out) — and hold every state transition to 150–350 ms on `cubic-bezier(.2,.8,.2,1)` or `ease`; remove all of it under `prefers-reduced-motion`.
- **Do** draw new icons on the 24-unit grid with a 2px round-capped stroke in `currentColor` and size them with `.ic`.
- **Do** load third-party embeds (YouTube, Google Maps) only behind a facade the visitor clicks.
- **Do** write copy in first person, British English, plain and unhurried; "TRE®" carries the mark, "1:1" is written with digits.
- **Do** follow a dense grid or row list with a quieter passage (tinted split, quiet list or the yellow band).
- **Do** keep the phone header compact: below 480px hide the wordmark, keep the emblem, and keep a 38px yellow button without its arrow.

### Don't:
- **Don't** put white text on yellow, or yellow text on white; yellow is a field colour only.
- **Don't** introduce cream, warm grey, gradients, glass panels, blue or neutral-black type; nothing on the page is blue or #000.
- **Don't** add kickers, eyebrows, overlines or small-caps labels above headings; headings stand alone.
- **Don't** nest a card inside a card, or box a list or table that a 1px line and space would carry.
- **Don't** add a second looping or scroll-triggered animation; the breath is the only ambient motion.
- **Don't** use hard offset shadows, neutral black shadows, or shadows at rest on cards and buttons beyond the primary button's 1px lift.
- **Don't** set headings in Inter or body copy in Plus Jakarta Sans; the display face is for headings, prices and the brand only.
- **Don't** use system display faces, icon fonts or glyph icons; every icon is authored inline SVG in one weight.
- **Don't** add stock photography, generated imagery or decorative illustration; only the client's own photographs and posters, and the sun.
- **Don't** use uppercase tracking, italics or letter-spaced labels anywhere.
- **Don't** apply yellow to running text, borders (other than the 3px active bar and price underline) or as a page background beyond the sun, buttons, band, start card, live tag and step counters.
- **Don't** autoplay media or load YouTube or Google Maps before the visitor asks.
