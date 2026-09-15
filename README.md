# Move with Ease — website v2

A sleek, simple, informative static rebuild of <https://www.movewithease.org.uk/> (25 pages), designed
with the [Impeccable](https://impeccable.style/) design skill. Header and section format follow the
TechNext website (technextmarketing.github.io/technext-website-v2) in a simpler, non-technical register;
the body-therapy core follows the TRE Singapore site. Colour is the logo's yellow (main) and green
(secondary) on a pure white ground. Type is Plus Jakarta Sans and Inter, self-hosted.

All service descriptions, prices, terms, opening hours, qualifications, client reviews and workshop
details are reproduced from the live Weebly site as published (mirrored 12 September 2026). The only
new text is navigation, card summaries built from published facts, the enquiry form and short link
sentences.

## Files

| Path | What it is |
|---|---|
| `*.html` | The finished pages (generated — edit the parts, not these). |
| `_src/build.py` | Assembles every page from `_src/parts/` and writes `sitemap.xml` and `robots.txt`. Run `python _src/build.py`. |
| `_src/parts/head.html`, `header.html`, `footer.html` | Shared `<head>`, navigation (desktop drop-downs + phone drawer) and footer. Edit once, rebuild. |
| `_src/parts/<page>.body.html` | The content of each page. |
| `_src/parts/head-extra.py` | Structured data (JSON-LD) per page. |
| `_src/convert.py` | One-off converter that produced the content partials from the first rebuild's markup. Not needed again. |
| `assets/css/site.css` | All styling. Tokens at the top; header, hero, cards, inner-page blocks, form, events page, basket drawer, footer follow. |
| `assets/js/site.js` | Header shadow, drop-downs, phone drawer, form validation. Every page works without it. |
| `assets/js/events-data.js` | The events list (date-driven). Edit this to add, change or price an event. |
| `assets/js/events.js` | Renders and filters the Events page from `events-data.js`. |
| `assets/js/cart.js` | Site-wide basket, checkout and payment. Set `PAYPAL_CLIENT_ID` here to take real payments. |
| `assets/fonts/` | Self-hosted Plus Jakarta Sans and Inter (variable woff2, Google Fonts, OFL). |
| `assets/img/` | Photographs and posters from the live site (see `assets/img/SOURCES.md`). |
| `assets/move-with-ease-logo.png`, `move-with-ease-emblem.png`, `favicon.svg` | The client's logo, its sun-and-hands emblem, and a favicon drawn from it. |
| `tools/capture.py` | Full-page screenshots through Chrome's DevTools protocol at real phone widths. |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/` | Impeccable product record, design-system record, surface brief (direction contract) and review captures. |

## Preview locally

```bash
python -m http.server 8775 --directory "C:/Users/leuss/OneDrive/Pictures/movewithease-v2"
```

Then open <http://localhost:8775/>. (The Pictures `.claude/launch.json` entry is `movewithease-v2`.)

## Site map

| New page | Replaces (live site) |
|---|---|
| `index.html` | `/` |
| `events.html` | new: all events, classes and workshops with filtering, basket and checkout |
| `chronic-pain-recovery.html` | `chronic-pain-recovery-kent.html`, `painreprocessingtherapy.html`, `painreprocessinghtherapy-441286.html`, `painreprocessinghtherapy-441286-485762.html` |
| `therapies.html` | new: every 1:1 therapy with prices in one place |
| `wellbeing-therapy.html` | `wellbeing-therapy-kent.html` |
| `wellbeing-subscription.html` | `wellbeing-subscription.html`, `wellbeing-subscription-booking.html` |
| `wellbeing-subscription-terms.html` | `massage-subscription-terms-and-conditions.html` |
| `clinical-hypnotherapy.html` | `clinical-hypnotherapy.html` |
| `massage-therapy.html` | `massage-therapy-kent.html` |
| `clinical-sports-massage.html` | `clinical-sports-massage-kent.html` |
| `hot-stones-massage.html` | `hot-stones-massage-kent.html` |
| `cupping-therapy.html` | `cupping-therapy.html` |
| `stress-free-me.html` | `stress-free-me.html` |
| `breath-retraining.html` | `breath-retraining-buteyko-kent.html`, `breathworkshop.html` |
| `tre.html` | `tre-tension-trauma-releasing-exercises-kent.html` |
| `tre-workshops.html` | `tre-workshops-kent.html`, `tre-workshop-paddock-wood-698981.html` |
| `classes-workshops.html` | `classes-workshops.html`, `deep-rest-renewal-workshop-paddock-wood.html`, `deep-rest--renewal-december-evening-with-sound--gong.html`, `new-year-renewal---strength--ease-for-2026.html` |
| `yoga-fascia-movement.html` | `yoga-fascia-movement-kent.html` |
| `live-with-ease.html` | `live-with-ease.html`, `live-with-ease-ndash-chronic-pain-recovery--stress-reduction.html` |
| `classes-membership.html` | `classes-membership.html`, `classes-membership-terms-and-conditions.html`, `monthly-membership-919477.html`, `how-to-book-classes.html`, `members-booking.html` |
| `about.html` | `about-caroline.html` |
| `gift-vouchers.html` | `gift-vouchers-kent.html` |
| `resources.html` | `blog.html` |
| `contact.html` | new: enquiry form, locations, hours, policies |
| `thank-you.html`, `404.html` | new |

Set up 301 redirects from the old URLs when the site goes live (the table above is the mapping).
The top-level **Chronic Pain Recovery** nav link was replaced by **Events** on 15 September 2026;
the Chronic Pain Recovery page still exists and is linked from the Therapies menu and the footer.

## Events, basket and payment

The **Events** page (`events.html`) lists every class and workshop, computes upcoming / previous
status from each event's date, and lets visitors filter by When, Type and Where. Priced, upcoming
events show **Add to basket**; recurring or to-be-confirmed ones show **Register interest**;
members-only classes show **Ask about a place**.

- **Add the events** by editing `assets/js/events-data.js` — one object per event (id, date,
  time, venue, price, blurb, image, `bookable`). Status is worked out from the date, so the only
  maintenance is this file. This replaces hand-editing several pages when a date changes.
- **The basket** (`assets/js/cart.js`) is on every page: a slide-out drawer with quantity steppers,
  a subtotal, a details step (name + email), a payment step and a confirmation. It remembers its
  contents in the browser (`localStorage`).
- **Payment — connect a real account before taking money.** Out of the box the checkout runs in
  **demo mode**: the whole basket → details → payment → confirmation flow works and is testable,
  but no card is charged. To take real card / PayPal payments, open `assets/js/cart.js` and set
  `PAYPAL_CLIENT_ID` to the practice's **live PayPal client ID** (from
  <https://developer.paypal.com>). Payment then runs entirely in the browser (no server, no secret
  key) via PayPal's official buttons, in GBP. Test with a **sandbox** client ID first. Alternatives,
  if PayPal isn't wanted: swap the payment step for Stripe Payment Links, Snipcart, or route each
  event to its existing Acuity booking link (already stored as `book` in `events-data.js`).
- **Amounts are set in the page**, which is standard for a no-server checkout and fine for
  low-value workshop places; a payment provider that needs server-side price verification would
  require a small backend (this site is static).

## Before this goes live

1. **Enquiry form relay.** The form on `contact.html` posts to FormSubmit for `info@movewithease.org.uk`.
   The first submission from the final domain triggers a one-time activation email to that inbox;
   the owner must click the link once. Until then submissions are not delivered. If preferred, swap
   the form `action` for a Weebly or Acuity form endpoint. `site.js` sets the redirect to
   `thank-you.html` next to wherever the page is hosted.
2. **Search engines.** `NOINDEX = True` in `_src/build.py` adds `<meta name="robots" content="noindex">`
   to every page and a `Disallow: /` robots.txt while this is a proposal. Set it to `False` and
   rebuild when the site replaces the live one. `BASE_URL` sets the canonical URLs and sitemap.
3. **Policy PDFs** (Data Protection, Complaints) and the blog PDFs still link to the Weebly upload
   path. Move the files into `assets/` and update the links if Weebly is switched off.
4. **Dates.** Only the Friday 18 September TRE® workshop is shown as upcoming (home page, classes,
   TRE pages and the Classes & Workshops drop-down). Earlier workshops are shown as "Previous workshop"
   with a register-interest link. Update `classes-workshops.body.html`, `tre-workshops.body.html`,
   `tre.body.html`, `index.body.html` and `header.html` when dates change.
5. **Points to confirm with Caroline** (the live site is inconsistent on these; the rebuild uses the
   value from the page that is in the live navigation):
   - Clinical & Sports Massage 90 minutes: £85 (massage pages) vs £80 (cupping page).
   - Private chronic-pain programme: £260 for 1×90 + 3×60 min (current page) vs £240 for four
     one-hour sessions (older Pain Reprocessing Therapy page). The rebuild shows £260.
   - Live with Ease: Wednesday 6–7pm at £10 pay-as-you-go (live-with-ease page) and a weekly
     donation-based lunchtime class at £2/£5/£10 (second page). Both are shown; confirm which runs.
   - Classes Membership: £28/month (page text and one graphic) vs £29/month (a second graphic). £28 is used.
   - The Spring Rooms address and the Laddingford clinic address are not published; only
     "Laddingford, Kent ME18 6BP" (from the breath-workshop poster) is used.
6. **Third parties.** The six YouTube videos (`youtube-nocookie.com` players on the home, chronic pain,
   TRE and resources pages) and the footer Google Map are embedded directly and load with the page, as
   requested on 13 September 2026. Booking links go to Acuity Scheduling and, for Tunbridge Wells massage,
   to thespringrooms.com.

## Design in one paragraph

White page, one big yellow circle, green type. The home page opens with the breathing sun: a yellow
disc behind Caroline's garden portrait that slowly expands and settles on a four-second-in,
six-second-out rhythm, with a "Breathe in / Breathe out" cue — the only motion on the site. The
header is TechNext's (sticky white bar, emblem and wordmark, centred navigation with drop-downs, one
yellow button) in a calmer register; sections alternate white and a pale green band, with therapy
cards that carry the real price, length and place. Inner pages open with the title and a booking card
of price options, then read in two columns (sticky heading left, text right). Colours are the logo's
yellow `#eeb500` (always carrying dark green ink, never white text) and green `#3e7d78`, deepened to
`#2f6560` for text and `#173534` for headings. See `DESIGN.md`.
