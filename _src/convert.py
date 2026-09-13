"""
One-off converter: rewrites the first rebuild's content partials (railway-poster markup) into the
v2 component vocabulary. Copy is untouched; only class names and a few wrappers change.
Run once:  python _src/convert.py
Hand-written partials (index, contact extras, thank-you, 404, header, footer, head) are not touched.
"""
import os, re

OLD = "C:/Users/leuss/OneDrive/Pictures/movewithease-redesign/_src/parts"
NEW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "parts")
SKIP = {"index.body.html", "head.html", "header.html", "footer.html", "head-extra.py",
        "404.body.html", "thank-you.body.html"}

SUBS = [
    # page hero
    (r'<section class="poster poster--page" aria-labelledby="page-title">', '<section class="page-hero" aria-labelledby="page-title">'),
    (r'<section class="poster" aria-labelledby="page-title">', '<section class="page-hero" aria-labelledby="page-title">'),
    (r'<div class="container poster__grid">', '<div class="container page-hero__grid">'),
    (r'class="poster__title poster__title--page"', 'class="page-hero__title"'),
    (r'class="poster__title"', 'class="page-hero__title"'),
    (r'poster__aside-note', 'page-hero__note'),
    (r'poster__copy', 'page-hero__copy'),
    (r'poster__aside', 'page-hero__aside'),
    (r'<div class="fares">', '<div class="page-hero__aside">'),
    # option lists (the old fare panels)
    (r'fares__list fares__list--stack', 'options'),
    (r'fares__list', 'options options--grid'),
    (r'class="fare fare--noted" style="--i:\d+"', 'class="option"'),
    (r'class="fare" style="--i:\d+"', 'class="option"'),
    (r'fare__price fare__price--word', 'option__price option__price--word'),
    (r'fare__price', 'option__price'),
    (r'fare__label', 'option__label'),
    (r'fare__note', 'option__note'),
    # reading sheet -> blocks
    (r'<section class="sheet"', '<section class="blocks"'),
    (r'<section class="poster poster--form poster--mid"', '<section class="blocks blocks--alt"'),
    (r'class="container panel"', 'class="container block block--intro"'),
    (r'class="panel panel--full"', 'class="block block--full"'),
    (r'class="panel"', 'class="block"'),
    (r'panel__title', 'block__title'),
    (r'panel__intro', 'block__intro'),
    (r'panel__body', 'block__body'),
    (r'panel__lede', 'lede'),
    # lists
    (r'leaf-list leaf-list--2col', 'checks checks--2col'),
    (r'leaf-list', 'checks'),
    (r'services services--links', 'links'),
    (r'class="services"', 'class="links"'),
    (r'\{\{LEAF\}\}', '{{ARROW}}'),
    # buttons
    (r'class="btn-line"', 'class="btn btn--ghost"'),
    (r'class="btn"', 'class="btn btn--primary"'),
    # rows (events / therapies list)
    (r'events events--therapies', 'rows rows--therapies'),
    (r'class="events"', 'class="rows"'),
    (r'class="event event--past"', 'class="row row--past"'),
    (r'class="event"', 'class="row"'),
    (r'event__what', 'row__what'),
    (r'event__when', 'row__when'),
    (r'event__act', 'row__act'),
    (r'event__media', 'row__media'),
    # quotes, callouts, prices
    (r'quotes quotes--3', 'quotes'),
    (r'<div class="stars" aria-label="Five stars">.*?</div>', '{{STAR5}}'),
    (r'class="callout"', 'class="note"'),
    (r'class="pair"', 'class="prices"'),
    (r'class="quote-intro" style="margin-bottom: var\(--s-5\);"', 'class="lede"'),
    (r'class="small" style="margin-top: var\(--s-5\);"', 'class="small mt"'),
    (r'hours hours--sheet', 'hours'),
    (r'places places--gold', 'places'),
    (r'enquiry enquiry--sheet', 'enquiry'),
]


def convert(src):
    # drop the hills and the decorative sun/leaf scene
    src = re.sub(r'\n\s*\{\{HILLS\}\}', '', src)
    src = re.sub(r'\n\s*<div class="poster__scene" aria-hidden="true">.*?</div>\n', '\n', src, flags=re.S)
    for pat, rep in SUBS:
        src = re.sub(pat, rep, src)
    # tidy: the converted file should not mention the old vocabulary any more
    leftovers = sorted(set(re.findall(r'\b(?:poster|fare|panel|sheet|leaf-list|event|services)(?:__[\w-]+|--[\w-]+)?\b', src)))
    return src, leftovers


if __name__ == "__main__":
    os.makedirs(NEW, exist_ok=True)
    for name in sorted(os.listdir(OLD)):
        if name in SKIP or not name.endswith(".body.html"):
            continue
        out, left = convert(open(os.path.join(OLD, name), encoding="utf-8").read())
        with open(os.path.join(NEW, name), "w", encoding="utf-8", newline="\n") as f:
            f.write(out)
        print("converted", name, ("leftovers: %s" % left) if left else "")
