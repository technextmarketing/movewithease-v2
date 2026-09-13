"""
Page assembler for the Move with Ease website (v2).

Each page = parts/head.html + parts/header.html + parts/<page>.body.html + parts/footer.html,
with these placeholders filled in:

  {{TITLE}} {{DESC}} {{SLUG}} {{PAGE_URL}} {{OG_IMAGE}} {{HEAD_EXTRA}} {{ROBOTS}} {{BODY_CLASS}}
  {{CUR_<nav id>}}   -> ' aria-current="page"' on the current page's own link, else ''
  {{SEC_<section>}}  -> ' is-active' on the primary-nav group that contains the current page, else ''
  {{ARROW}} {{CHECK}} {{STAR5}} {{CTA_BAND}} {{YEAR}}

Edit the header, navigation or footer once in parts/, then run:
    python _src/build.py
from anywhere. Finished pages are written to the site root. No dependencies beyond Python 3.
"""
import os, re, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
PARTS = os.path.join(HERE, "parts")
OUT = os.path.dirname(HERE)  # site root

# Where the finished site will live. Canonical URLs and the sitemap are built from this.
BASE_URL = "https://www.movewithease.org.uk/"
# Keep the proposal out of search results until it replaces the live site. Set to False to go live.
NOINDEX = True

NAV_IDS = [
    "home", "pain", "therapies", "wellbeing", "subscription", "subscription-terms", "hypnotherapy",
    "massage", "csm", "hotstones", "cupping", "stressfree", "breath", "tre", "treworkshops",
    "classes", "yoga", "livewithease", "membership", "about", "vouchers", "resources", "contact",
]
SECTIONS = ["therapies", "classes", "about"]

# Snippets shared by many pages
ARROW = ('<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>')
CHECK = ('<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" '
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>')
STAR = ('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
        '<path d="m12 2.5 2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 6 21l1.3-6.8-5-4.7 6.8-.8Z"/></svg>')
STAR5 = '<span class="stars" aria-label="Five stars">' + STAR * 5 + '</span>'
CTA_BAND = '''<section class="invite" aria-labelledby="invite-title">
      <div class="container invite__inner">
        <div class="invite__copy">
          <h2 id="invite-title">A gentle invitation</h2>
          <p>If you’re living with chronic pain, tension, anxiety, or stress — and you’re ready to explore a calmer, more informed way forward — you’re very welcome here.</p>
        </div>
        <div class="invite__actions">
          <a class="btn btn--primary btn--lg" href="https://movewithease108.as.me/discoverycall">Book a free discovery call {{ARROW}}</a>
          <a class="btn btn--ghost btn--lg" href="contact.html#enquire">Send an enquiry</a>
        </div>
      </div>
    </section>'''


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def build(body_file, out_rel, title, desc, nav, section=None, head_extra="", og_image=None, robots=None, body_class=""):
    html = read(os.path.join(PARTS, "head.html")) + read(os.path.join(PARTS, "header.html")) \
        + read(os.path.join(PARTS, body_file)) + read(os.path.join(PARTS, "footer.html"))
    slug = "" if out_rel == "index.html" else out_rel
    page_url = BASE_URL + slug
    if robots is None:
        robots = "noindex" if NOINDEX else "index, follow"
    rep = {
        "{{TITLE}}": title,
        "{{DESC}}": desc,
        "{{SLUG}}": slug,
        "{{PAGE_URL}}": page_url,
        "{{OG_IMAGE}}": og_image or (BASE_URL + "assets/move-with-ease-logo.png"),
        "{{HEAD_EXTRA}}": head_extra,
        "{{ROBOTS}}": robots,
        "{{BODY_CLASS}}": body_class,
        "{{CTA_BAND}}": CTA_BAND,
        "{{YEAR}}": str(datetime.date.today().year),
    }
    for k, v in rep.items():
        html = html.replace(k, v)
    # second pass: snippets inside snippets
    for k, v in {"{{ARROW}}": ARROW, "{{CHECK}}": CHECK, "{{STAR5}}": STAR5}.items():
        html = html.replace(k, v)
    for nid in NAV_IDS:
        html = html.replace("{{CUR_%s}}" % nid, ' aria-current="page"' if nid == nav else "")
    for sec in SECTIONS:
        html = html.replace("{{SEC_%s}}" % sec, " is-active" if sec == section else "")
    leftover = re.findall(r"{{[A-Z_a-z-]+}}", html)
    if leftover:
        raise SystemExit("Unfilled placeholders in %s: %s" % (out_rel, sorted(set(leftover))))
    out = os.path.join(OUT, out_rel)
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("built", out_rel)
    return page_url


# (body partial, output file, <title>, meta description, nav id, section)
PAGES = [
    ("index.body.html", "index.html",
     "Move with Ease | Wellbeing & Chronic Pain Therapy in Kent",
     "Move with Ease offers wellbeing and chronic pain support in Kent, including clinical hypnotherapy, pain recovery therapy, massage, breath work, TRE and movement.",
     "home", None),
    ("chronic-pain-recovery.body.html", "chronic-pain-recovery.html",
     "Chronic Pain Recovery & Pain Reprocessing Therapy Kent | Move with Ease",
     "Personalised chronic pain recovery using Pain Reprocessing Therapy (PRT), pain neuroscience and nervous system-based strategies. In-person in Kent or online via Zoom.",
     "pain", None),
    ("therapies.body.html", "therapies.html",
     "Therapies & Prices | Move with Ease, Laddingford, Kent",
     "All Move with Ease 1:1 therapies in one place: chronic pain recovery, wellbeing therapy, clinical hypnotherapy, massage, breath retraining and TRE®, with session lengths and prices.",
     "therapies", "therapies"),
    ("wellbeing-therapy.body.html", "wellbeing-therapy.html",
     "Wellbeing Therapy Kent | Maidstone, Tonbridge & Tunbridge Wells",
     "Personalised Wellbeing Therapy near Maidstone, Tonbridge and Paddock Wood from my Laddingford clinic, combining massage, breath work, movement and relaxation to support wellbeing, stress and persistent pain.",
     "wellbeing", "therapies"),
    ("wellbeing-subscription.body.html", "wellbeing-subscription.html",
     "Wellbeing Subscription Kent | Move with Ease",
     "Ongoing personalised wellbeing support in Kent with 10 sessions per year, flexible monthly payments and £10 off each session. Tailored support for your individual needs.",
     "subscription", "therapies"),
    ("wellbeing-subscription-terms.body.html", "wellbeing-subscription-terms.html",
     "Wellbeing Subscription Terms & Conditions | Move with Ease",
     "Terms and conditions for the Move with Ease Wellbeing Subscription, including payments, booking, cancellations, session credits, unused sessions and refunds.",
     "subscription-terms", "therapies"),
    ("clinical-hypnotherapy.body.html", "clinical-hypnotherapy.html",
     "Clinical Hypnotherapy in Maidstone | Anxiety, Stress & Chronic Pain",
     "Clinical hypnotherapy in Maidstone for anxiety, stress, chronic pain, confidence and nervous system regulation. Evidence-informed sessions with Caroline Miller.",
     "hypnotherapy", "therapies"),
    ("massage-therapy.body.html", "massage-therapy.html",
     "Massage Therapy in Kent | Move with Ease",
     "Massage therapy near Maidstone, Tonbridge and Paddock Wood from my Laddingford clinic, plus treatments in Tunbridge Wells. Clinical & Sports Massage, Hot Stones Massage, Cupping and Stress Free Me.",
     "massage", "therapies"),
    ("clinical-sports-massage.body.html", "clinical-sports-massage.html",
     "Clinical & Sports Massage Kent | Maidstone, Tonbridge & Tunbridge Wells",
     "Clinical & Sports Massage near Maidstone, Tonbridge and Paddock Wood from my Laddingford clinic, plus treatments in Tunbridge Wells. Personalised support for pain, tension, mobility and recovery.",
     "csm", "therapies"),
    ("hot-stones-massage.body.html", "hot-stones-massage.html",
     "Hot Stones Massage Kent | Maidstone, Tonbridge & Tunbridge Wells",
     "Hot Stones Massage near Maidstone, Tonbridge and Paddock Wood from my Laddingford clinic. A deeply relaxing treatment using warmth and massage to ease tension and promote relaxation.",
     "hotstones", "therapies"),
    ("cupping-therapy.body.html", "cupping-therapy.html",
     "Cupping Therapy Kent | Move with Ease",
     "Cupping therapy near Maidstone, Tonbridge, Paddock Wood & Tunbridge Wells. Relieve pain, ease tension, and support recovery. Included in clinical sports massage if desired.",
     "cupping", "therapies"),
    ("stress-free-me.body.html", "stress-free-me.html",
     "Stress Free Me Treatment | Move with Ease",
     "A 90-minute Stress Free Me treatment combining breathing techniques, somatic mindfulness, movement and tailored massage therapy to reduce stress and anxiety.",
     "stressfree", "therapies"),
    ("breath-retraining.body.html", "breath-retraining.html",
     "Breath Retraining & Buteyko Kent | Move with Ease",
     "Breath Retraining and Buteyko near Maidstone, Tonbridge and Paddock Wood, or online via Zoom. Personalised support for functional breathing, sleep, stress and wellbeing.",
     "breath", "therapies"),
    ("tre.body.html", "tre.html",
     "TRE® Tension & Trauma Releasing Exercises Kent | Move with Ease",
     "TRE® in Kent with 1:1 sessions and a 4-session package to help you learn Tension & Trauma Releasing Exercises safely. In person or online via Zoom.",
     "tre", "therapies"),
    ("tre-workshops.body.html", "tre-workshops.html",
     "TRE® Workshops Kent | Move with Ease",
     "TRE® workshops in Kent offering a gentle introduction to Tension & Trauma Releasing Exercises, neurogenic tremors and nervous system regulation in a supportive small-group setting.",
     "treworkshops", "classes"),
    ("classes-workshops.body.html", "classes-workshops.html",
     "Classes & Workshops | Move with Ease, Paddock Wood & Laddingford",
     "Move with Ease classes and workshops support the nervous system through gentle movement, breath work, relaxation, and body-based practices. Yoga & Fascia Movement, Live with Ease, TRE® and Deep Rest workshops.",
     "classes", "classes"),
    ("yoga-fascia-movement.body.html", "yoga-fascia-movement.html",
     "Yoga & Fascia Movement Kent | Paddock Wood | Move with Ease",
     "Yoga & fascia movement in Paddock Wood, Kent, combining yoga, FAMO fascia movement, mobility, self-myofascial release, breath work and relaxation. Private sessions also available.",
     "yoga", "classes"),
    ("live-with-ease.body.html", "live-with-ease.html",
     "Live with Ease Relaxation Class | Nervous System Regulation | Laddingford Kent",
     "Live with Ease is a relaxation and nervous system regulation class in Laddingford, Kent and online via Zoom, blending breathwork, mindfulness and Pain Reprocessing Therapy techniques.",
     "livewithease", "classes"),
    ("classes-membership.body.html", "classes-membership.html",
     "Classes Membership | Move with Ease",
     "The Move with Ease classes membership offers a flexible and cost-effective way to prioritise your wellness. For £28 a month you receive 36 classes across the year. Terms, how to book and members booking.",
     "membership", "classes"),
    ("about.body.html", "about.html",
     "About Caroline | Wellbeing & Chronic Pain Recovery Specialist | Kent",
     "Learn more about Caroline, a Wellbeing & Chronic Pain Recovery Specialist in Kent. With a background in nursing and years of training in clinical massage, breath work, pain reprocessing, mindfulness and movement.",
     "about", "about"),
    ("gift-vouchers.body.html", "gift-vouchers.html",
     "Gift Vouchers for Massage & Wellbeing in Kent | Move with Ease",
     "Gift vouchers for massage, wellbeing therapy, clinical hypnotherapy, breath retraining, TRE® and private yoga in Kent. Choose a voucher value or contact Move with Ease for a bespoke amount.",
     "vouchers", "about"),
    ("resources.body.html", "resources.html",
     "Blog & Resources | Move with Ease",
     "Blog posts, videos, podcasts and downloads on chronic pain recovery, Pain Reprocessing Therapy, TRE®, breathing, yoga and menopause from Move with Ease.",
     "resources", "about"),
    ("contact.body.html", "contact.html",
     "Contact & Enquiries | Move with Ease, Laddingford, Kent",
     "Get in touch with Caroline at Move with Ease: send an enquiry, book a free discovery call, and find clinic opening hours, locations in Laddingford, Tunbridge Wells and Paddock Wood, and policies.",
     "contact", None),
    ("thank-you.body.html", "thank-you.html",
     "Enquiry sent | Move with Ease",
     "Your enquiry has been sent to Move with Ease.",
     "contact", None),
    ("404.body.html", "404.html",
     "Page not found | Move with Ease",
     "That page could not be found on the Move with Ease website.",
     "home", None),
]

# Extra <head> content per output file (structured data)
HEAD_EXTRA = {}

if __name__ == "__main__":
    extra_file = os.path.join(PARTS, "head-extra.py")
    if os.path.exists(extra_file):
        ns = {"BASE_URL": BASE_URL}
        exec(read(extra_file), ns)
        HEAD_EXTRA = ns.get("HEAD_EXTRA", {})
    urls = []
    for body, out, title, desc, nav, section in PAGES:
        robots = "noindex" if out in ("thank-you.html", "404.html") else None
        body_class = "is-home" if out == "index.html" else ""
        url = build(body, out, title, desc, nav, section, HEAD_EXTRA.get(out, ""), robots=robots, body_class=body_class)
        if out not in ("thank-you.html", "404.html"):
            urls.append(url)
    today = datetime.date.today().isoformat()
    with open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8", newline="\n") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for u in urls:
            f.write("  <url><loc>%s</loc><lastmod>%s</lastmod></url>\n" % (u, today))
        f.write("</urlset>\n")
    with open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8", newline="\n") as f:
        f.write(("User-agent: *\nDisallow: /\n" if NOINDEX else "User-agent: *\nAllow: /\n") + "Sitemap: %ssitemap.xml\n" % BASE_URL)
    print("built sitemap.xml, robots.txt (%s)" % ("noindex" if NOINDEX else "indexable"))
