/* Move with Ease — events page: render, filter, add-to-basket.
   Reads window.MWE_EVENTS; status is computed from the date against today. */
(function () {
  'use strict';

  var root = document.querySelector("[data-events]");
  if (!root || !window.MWE_EVENTS) { return; }

  var grid = root.querySelector("[data-events-grid]");
  var countEl = root.querySelector("[data-events-count]");
  var emptyEl = root.querySelector("[data-events-empty]");
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var today = new Date(); today.setHours(0, 0, 0, 0);

  function parseDate(s) { if (!s) { return null; } var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDate(d) { return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function money(n) { n = Number(n) || 0; return "£" + (n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var filters = { type: "all", location: "all", when: "upcoming" };

  function status(ev) {
    var d = parseDate(ev.date);
    if (!d) { return "ongoing"; }         // recurring or dates tbc
    return d >= today ? "upcoming" : "previous";
  }
  function isUpcomingView(ev) { return status(ev) !== "previous"; }

  function meta(ev) {
    var when = ev.recurring ? ev.recurring : (parseDate(ev.date) ? fmtDate(parseDate(ev.date)) : "Dates to be confirmed");
    var bits = [when];
    if (ev.time) { bits.push(ev.time); }
    bits.push(ev.venue);
    return bits.join(" · ");
  }
  function shortMeta(ev) {
    var when = ev.recurring ? ev.recurring : (parseDate(ev.date) ? fmtDate(parseDate(ev.date)) : "Dates tbc");
    return when + " · " + ev.venues.join(" / ");
  }

  var FOCUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21C7 17 4 13.5 4 9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 3.5c0 4-3 7.5-8 11.5Z"/><path d="M12 6v15"/></svg>';

  function card(ev) {
    var st = status(ev);
    var tag = st === "upcoming"
      ? '<span class="tag tag--live">' + (ev.recurring ? "Upcoming" : fmtDate(parseDate(ev.date))) + '</span>'
      : st === "ongoing"
        ? '<span class="tag tag--soft">' + (ev.recurring ? esc(ev.recurring.split(" · ")[0]) : "Dates tbc") + '</span>'
        : '<span class="tag tag--past">Previous</span>';

    var media = ev.image
      ? '<img src="' + ev.image + '" alt="" loading="lazy" width="800" height="600">'
      : '<div class="ev-card__ph">' + FOCUS_ICON + '<span>' + esc(ev.type === "class" ? "Weekly class" : ev.type === "course" ? "Online course" : "Workshop") + '</span></div>';

    var chips = ev.focus.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("");

    var actions;
    if (ev.bookable && isUpcomingView(ev)) {
      actions =
        '<button type="button" class="btn btn--primary ev-add" data-add="' + ev.id + '">' +
          '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2l2.2 12.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3L21.5 8H6"/></svg>' +
          'Add to basket</button>' +
        '<a class="btn-link" href="' + ev.detail + '">Details</a>';
    } else if (isUpcomingView(ev)) {
      var topic = ev.enquire ? ("contact.html?topic=" + encodeURIComponent(ev.enquire) + "#enquire") : "contact.html#enquire";
      actions =
        '<a class="btn btn--ghost" href="' + topic + '">' + (ev.type === "class" ? "Ask about a place" : "Register interest") + '</a>' +
        '<a class="btn-link" href="' + ev.detail + '">Details</a>';
    } else {
      var t2 = ev.enquire ? ("contact.html?topic=" + encodeURIComponent(ev.enquire) + "#enquire") : "contact.html#enquire";
      actions =
        '<a class="btn btn--ghost" href="' + t2 + '">Register interest in the next one</a>' +
        '<a class="btn-link" href="' + ev.detail + '">Details</a>';
    }

    return '<article class="ev-card' + (st === "previous" ? " is-past" : "") + '">' +
      '<div class="ev-card__media">' + media + tag + '</div>' +
      '<div class="ev-card__body">' +
        '<h3 class="ev-card__title">' + esc(ev.title) + '</h3>' +
        '<p class="ev-card__meta">' + esc(meta(ev)) + '</p>' +
        '<p class="ev-card__blurb">' + esc(ev.blurb) + '</p>' +
        '<ul class="ev-card__chips">' + chips + '</ul>' +
        '<div class="ev-card__foot">' +
          '<p class="ev-card__price">' + esc(ev.priceNote || money(ev.price)) + '</p>' +
          '<div class="ev-card__actions">' + actions + '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function passes(ev) {
    if (filters.when === "upcoming" && !isUpcomingView(ev)) { return false; }
    if (filters.when === "previous" && isUpcomingView(ev)) { return false; }
    if (filters.type !== "all" && ev.type !== filters.type) { return false; }
    if (filters.location !== "all" && ev.venues.indexOf(filters.location) === -1) { return false; }
    return true;
  }

  function sortEvents(list) {
    return list.slice().sort(function (a, b) {
      var da = parseDate(a.date), db = parseDate(b.date);
      if (filters.when === "previous") {
        return (db ? db.getTime() : 0) - (da ? da.getTime() : 0); // most recent first
      }
      // upcoming: dated first (ascending), then recurring/tbc
      if (da && db) { return da - db; }
      if (da && !db) { return -1; }
      if (!da && db) { return 1; }
      return 0;
    });
  }

  function render() {
    var list = sortEvents(window.MWE_EVENTS.filter(passes));
    grid.innerHTML = list.map(card).join("");
    if (countEl) {
      countEl.textContent = list.length + " " + (list.length === 1 ? "event" : "events");
    }
    if (emptyEl) { emptyEl.hidden = list.length > 0; }
    grid.hidden = list.length === 0;
  }

  /* filter controls */
  Array.prototype.forEach.call(root.querySelectorAll("[data-filter]"), function (group) {
    var key = group.getAttribute("data-filter");
    group.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-value]");
      if (!btn) { return; }
      filters[key] = btn.getAttribute("data-value");
      Array.prototype.forEach.call(group.querySelectorAll("[data-value]"), function (b) {
        var on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      render();
    });
  });

  /* add to basket */
  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add]");
    if (!btn) { return; }
    var ev = window.MWE_EVENTS.filter(function (x) { return x.id === btn.getAttribute("data-add"); })[0];
    if (!ev || !window.MWE || !window.MWE.addToCart) { return; }
    window.MWE.addToCart({
      id: ev.id, title: ev.title, price: ev.price,
      priceNote: ev.priceNote, meta: shortMeta(ev), detail: ev.detail
    });
    btn.classList.add("is-added");
    var label = btn.childNodes[btn.childNodes.length - 1];
    if (label) { label.textContent = "Added ✓"; }
    setTimeout(function () {
      btn.classList.remove("is-added");
      if (label) { label.textContent = "Add to basket"; }
    }, 1400);
  });

  render();
})();
