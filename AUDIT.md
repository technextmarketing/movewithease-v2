# Audit — Move with Ease website v2 (25 pages)

Technical audit of the rebuilt site, following the Impeccable finish flow (detector → two bounded inspection
rounds → independent finish review → verdict passes → documenter). Evidence: full-page captures through
Chrome's DevTools protocol at 1440 and 390 (mobile emulation) in `.impeccable/review/`; computed styles and
`scrollWidth` measurements in the Browser pane at 320, 375, 1280 and 1440; `impeccable detect --json` over
eight pages, `site.css` and `site.js` (`.impeccable/review/detect.json`); a script that checked every internal
link and anchor, duplicate ids, `<h1>` count, `alt` attributes and image paths across all 25 pages; WCAG
contrast ratios computed for every colour pair in use; `embed-prompt --scan` over every shipping raster.
Date: 13 September 2026.

## Health score

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 4 | Every text pair ≥ 4.5:1 (body 9.0:1, muted 5.2:1, green ink on yellow 7.1:1, links 6.7:1); landmarks, labelled controls, inline errors, 2px focus ring, skip link, keyboard-operable drop-downs and drawer; 44px touch targets including the compact phone header button |
| 2 | Performance | 4 | Home first load ≈ 348 KB uncompressed (43 KB HTML, 36 KB CSS, 10 KB JS, 74 KB latin fonts, 158 KB hero photo); the six YouTube players and the footer Google Map are direct embeds that load with the page (owner's instruction, 13 Sep 2026), marked `loading="lazy"` so they fetch as they approach the viewport; fonts self-hosted and preloaded; images sized and lazy-loaded below the fold |
| 3 | Responsive design | 4 | `scrollWidth == clientWidth` at 320, 375, 1280 and 1440; nav changes topology (drop-downs → drawer), hero and reading blocks change topology (columns → stack), footer 4 → 2 → 1 columns |
| 4 | Theming | 4 | One light scheme by design (the use scene is a clinic website read in daylight); every colour is a token; yellow always carries green ink; `#f3f8f7` is the only tint |
| 5 | Implementation integrity | 4 | One committed world across 25 pages; components reused, not re-invented per page; every claim, price and date traceable to the live site; rasters carry embedded provenance (44 scanned, 0 missing) |
| **Total** | | **20/20** | **Excellent** |

## Finish review (independent reviewer)

- Round 1 disposition: **fix** — eight material items (phone hero order and compact header button, sun
  clearance at 390, an unapproved card entrance animation, a "Next date" eyebrow, form row alignment,
  placeholder contrast 3.6:1, a gradient on the video frame, lower-page rhythm). All eight applied in one batch.
- Verdict pass 1: all eight **resolved**; two regressions named in the ≤480px header block (wordmark hidden,
  button 38px). Both fixed: wordmark kept at 15px/14px, label shortened to "Book a call", button 44px.
- Verdict pass 2: both header regressions **resolved**; no new regressions; disposition **ship** — earned for the
  eight material fixes and the two regressions scored across the passes, on the recaptured home (1440 and 390)
  and contact (1440) surfaces. The reviewer notes it did not re-review the sixteen sibling pages or the about
  page as a whole; those share the same shell and components and were inspected by the builder in round 1
  (therapies, chronic-pain-recovery, classes-workshops, about, gift-vouchers, tre, resources, thank-you at 1440;
  therapies and contact at 390).

## Detector findings (84) and how they were resolved

| Antipattern | Count | Resolution |
|---|---|---|
| `gpt-thin-border-wide-shadow` (advisory) | 34 | The TechNext card idiom the brief pinned (1px line + soft offset shadow). Blur reduced from 48/24px to 30/16px. Kept. |
| `overused-font` | 20 | Plus Jakarta Sans + Inter are the brief-pinned faces ("fonts similar to the TechNext website"). Kept. |
| `cramped-padding` | 16 | Static misreads: the bordered `.options` list has no padding of its own because each `.option` row carries 16–18px; `.block` borders sit above 44px padding. No change needed. |
| `clipped-overflow-container` | 8 | `body{overflow-x:hidden}` removed; overflow verified absent at 320–1440 instead. |
| `flat-type-hierarchy` | 5 | Footer text 14px, footer headings 18px (1.29 step). |
| `tight-leading` | 1 | `.row__when` line-height 1.1 → 1.2. |

## Integrity check (all 25 pages)

- One `<h1>` per page; no duplicate ids; no `<img>` without `alt`; no missing image files.
- Every internal link and `#anchor` resolves (the 16 `contact.html?topic=…#enquire` links carry a query string
  and pre-select the enquiry topic; each topic value matches a form option).
- External hosts: Acuity Scheduling, thespringrooms.com, YouTube (nocookie players, direct embed), Google Maps (footer
  embed), Dropbox and movewithease.org.uk (PDF downloads), JAMA, Vimeo, Channel 4, drchatterjee.com,
  mailchi.mp, Instagram, Facebook, forms.gle.

## Open items (owner / launch)

1. **FormSubmit activation.** First submission on the final domain triggers a one-time activation email to
   info@movewithease.org.uk; until clicked, enquiries are not delivered.
2. **Four facts differ between live pages** (90-minute massage £85 vs £80; pain programme £260 vs £240;
   Live with Ease timetable; membership £28 vs £29). The rebuild uses the value on the page in the live
   navigation; confirm with Caroline (README.md § 5).
3. **Policy and blog PDFs** still link to the Weebly upload path.
4. **Dated content** (18 September TRE® workshop) appears on the home page, classes, TRE pages and the
   Classes & Workshops drop-down; relabel when it passes.
5. `NOINDEX = True` and `Disallow: /` until the site replaces the live one; set up the 301 map in README.md.

## Process notes

- The run was unattended: the user's brief pinned the shell, core, colours and fonts, so the Impeccable
  interview was substituted by the brief (recorded in `.impeccable/surfaces/index-html.md`). The direction
  roll (seed fa1f1b03) assigned "the breathing page"; all six catalog challengers were declined or competitive
  and their kept disciplines are listed in the brief.
- Code-led build (no image generation on this machine); captures were taken with reduced motion, so the
  breathing sun is static in every PNG and only "Breathe in" shows.
