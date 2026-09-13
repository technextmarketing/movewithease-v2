# Structured data per output file. Executed by build.py with BASE_URL in scope.
import json

ORG = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": BASE_URL + "#business",
    "name": "Move with Ease",
    "alternateName": "Move with Ease – Wellbeing & Chronic Pain Recovery Therapies",
    "url": BASE_URL,
    "logo": BASE_URL + "assets/move-with-ease-logo.png",
    "image": BASE_URL + "assets/move-with-ease-logo.png",
    "email": "info@movewithease.org.uk",
    "founder": {"@type": "Person", "name": "Caroline Miller"},
    "description": "Integrative wellbeing and chronic pain recovery therapies in Laddingford, Kent: clinical hypnotherapy, Pain Reprocessing Therapy, clinical & sports massage, breath retraining, TRE® and yoga & fascia movement. In person and online.",
    "address": {"@type": "PostalAddress", "addressLocality": "Laddingford", "addressRegion": "Kent", "postalCode": "ME18 6BP", "addressCountry": "GB"},
    "areaServed": ["Laddingford", "Maidstone", "Tonbridge", "Tunbridge Wells", "Paddock Wood", "Kent"],
    "openingHoursSpecification": [
        {"@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "08:30", "closes": "12:00"},
        {"@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "19:00"},
        {"@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:30", "closes": "18:00"},
    ],
    "sameAs": [
        "https://instagram.com/movewithease108",
        "https://facebook.com/movewithease108",
        "https://youtube.com/@movewithease108",
    ],
}


def ld(obj):
    return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n  </script>'


HEAD_EXTRA = {
    "index.html": ld(ORG),
    "contact.html": ld({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact & Enquiries | Move with Ease",
        "url": BASE_URL + "contact.html",
        "about": {"@id": BASE_URL + "#business"},
    }),
    "gift-vouchers.html": ld({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Gift Vouchers for Massage & Wellbeing in Kent | Move with Ease",
        "url": BASE_URL + "gift-vouchers.html",
        "mainEntity": {
            "@type": "ItemList",
            "name": "Move with Ease gift vouchers",
            "itemListElement": [
                {"@type": "Offer", "position": 1, "name": "£20 Gift Voucher", "price": "20.00", "priceCurrency": "GBP", "url": "https://app.acuityscheduling.com/catalog.php?owner=30402010&action=addCart&clear=1&id=1883091"},
                {"@type": "Offer", "position": 2, "name": "£30 Gift Voucher", "price": "30.00", "priceCurrency": "GBP", "url": "https://app.acuityscheduling.com/catalog.php?owner=30402010&action=addCart&clear=1&id=1883113"},
                {"@type": "Offer", "position": 3, "name": "£50 Gift Voucher", "price": "50.00", "priceCurrency": "GBP", "url": "https://app.acuityscheduling.com/catalog.php?owner=30402010&action=addCart&clear=1&id=1884911"},
                {"@type": "Offer", "position": 4, "name": "£65 Gift Voucher", "price": "65.00", "priceCurrency": "GBP", "url": "https://app.acuityscheduling.com/catalog.php?owner=30402010&action=addCart&clear=1&id=1930809"},
                {"@type": "Offer", "position": 5, "name": "£85 Gift Voucher", "price": "85.00", "priceCurrency": "GBP", "url": "https://app.acuityscheduling.com/catalog.php?owner=30402010&action=addCart&clear=1&id=1930812"},
            ],
        },
    }),
}
