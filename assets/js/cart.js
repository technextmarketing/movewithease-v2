/* Move with Ease — basket, checkout and payment (site-wide, progressive enhancement).
   Works on every page: the drawer markup lives in the footer partial.

   PAYMENT: set PAYPAL_CLIENT_ID to the practice's live PayPal client ID to take
   real card / PayPal payments entirely client-side (no server, no secret key).
   Left blank, checkout runs in DEMO mode: the full basket -> details -> payment ->
   confirmation flow works and is testable, but no money moves. Swap in the client
   ID (from paypal.com/developer) to go live. Currency is GBP. */
(function () {
  'use strict';

  var PAYPAL_CLIENT_ID = ""; // <-- paste the practice's PayPal client ID here to take real payments
  var CURRENCY = "GBP";
  var Q_KEY = "mwe_cart";        // { id: qty }
  var I_KEY = "mwe_cart_items";  // { id: {id,title,price,priceNote,meta,detail} }
  var O_KEY = "mwe_last_order";

  /* ---------- storage helpers ---------- */
  function read(key) { try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; } }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  function money(n) { n = Number(n) || 0; return "£" + (n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)); }

  /* ---------- cart model ---------- */
  var Cart = {
    qtys: function () { return read(Q_KEY); },
    items: function () { return read(I_KEY); },
    count: function () { var q = read(Q_KEY), n = 0; for (var k in q) { n += q[k]; } return n; },
    lines: function () {
      var q = read(Q_KEY), items = read(I_KEY), out = [];
      for (var id in q) { if (items[id]) { out.push({ item: items[id], qty: q[id] }); } }
      return out;
    },
    subtotal: function () {
      var t = 0; this.lines().forEach(function (l) { t += (Number(l.item.price) || 0) * l.qty; }); return t;
    },
    add: function (snapshot, qty) {
      qty = qty || 1;
      var q = read(Q_KEY), items = read(I_KEY);
      q[snapshot.id] = (q[snapshot.id] || 0) + qty;
      items[snapshot.id] = snapshot;
      write(Q_KEY, q); write(I_KEY, items);
      changed();
    },
    setQty: function (id, qty) {
      var q = read(Q_KEY), items = read(I_KEY);
      if (qty <= 0) { delete q[id]; delete items[id]; } else { q[id] = qty; }
      write(Q_KEY, q); write(I_KEY, items);
      changed();
    },
    remove: function (id) { this.setQty(id, 0); },
    clear: function () { write(Q_KEY, {}); write(I_KEY, {}); changed(); }
  };
  window.MWE = window.MWE || {};
  window.MWE.cart = Cart;

  /* ---------- elements ---------- */
  var drawer = document.getElementById("cart");
  var overlay = document.querySelector(".cart-overlay");
  var badges = document.querySelectorAll("[data-cart-count]");
  var openers = document.querySelectorAll("[data-cart-open]");
  var lastFocus = null;

  function changed() {
    updateBadges();
    if (drawer && !drawer.hidden) { renderBasket(); }
  }
  function updateBadges() {
    var n = Cart.count();
    Array.prototype.forEach.call(badges, function (b) {
      b.textContent = n;
      b.hidden = n === 0;
    });
    Array.prototype.forEach.call(openers, function (o) {
      o.setAttribute("aria-label", n ? ("Basket, " + n + " item" + (n === 1 ? "" : "s")) : "Basket, empty");
    });
  }

  /* Expose a toast + open so events.js can confirm an add */
  window.MWE.addToCart = function (snapshot) {
    Cart.add(snapshot);
    openCart();
    setStep("basket");
  };

  if (!drawer) { updateBadges(); return; } // pages before the drawer is injected still get badge counts

  /* ---------- drawer open / close ---------- */
  function openCart() {
    if (drawer.hidden) {
      lastFocus = document.activeElement;
      drawer.hidden = false;
      if (overlay) { overlay.hidden = false; }
      document.body.classList.add("cart-open");
      renderBasket();
      var c = drawer.querySelector("[data-cart-close]");
      if (c) { c.focus(); }
    }
  }
  function closeCart() {
    drawer.hidden = true;
    if (overlay) { overlay.hidden = true; }
    document.body.classList.remove("cart-open");
    if (lastFocus) { lastFocus.focus(); }
  }
  Array.prototype.forEach.call(openers, function (o) {
    o.addEventListener("click", function (e) { e.preventDefault(); openCart(); setStep("basket"); });
  });
  Array.prototype.forEach.call(drawer.querySelectorAll("[data-cart-close]"), function (b) {
    b.addEventListener("click", closeCart);
  });
  if (overlay) { overlay.addEventListener("click", closeCart); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !drawer.hidden) { closeCart(); }
  });
  drawer.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || drawer.hidden) { return; }
    var f = drawer.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex='0']");
    f = Array.prototype.filter.call(f, function (el) { return el.offsetParent !== null; });
    if (!f.length) { return; }
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- steps ---------- */
  var steps = {
    basket: drawer.querySelector("[data-step='basket']"),
    details: drawer.querySelector("[data-step='details']"),
    pay: drawer.querySelector("[data-step='pay']"),
    done: drawer.querySelector("[data-step='done']")
  };
  var titleEl = drawer.querySelector(".cart__title");
  function setStep(name) {
    for (var k in steps) { if (steps[k]) { steps[k].hidden = k !== name; } }
    var titles = { basket: "Your basket", details: "Your details", pay: "Payment", done: "Booking confirmed" };
    if (titleEl) { titleEl.textContent = titles[name] || "Your basket"; }
    if (name === "pay") { mountPayment(); }
  }

  /* ---------- basket rendering ---------- */
  function renderBasket() {
    var wrap = steps.basket;
    if (!wrap) { return; }
    var lines = Cart.lines();
    var list = wrap.querySelector(".cart__list");
    var foot = wrap.querySelector(".cart__foot");
    var empty = wrap.querySelector(".cart__empty");
    if (!lines.length) {
      list.innerHTML = "";
      if (empty) { empty.hidden = false; }
      if (foot) { foot.hidden = true; }
      return;
    }
    if (empty) { empty.hidden = true; }
    if (foot) { foot.hidden = false; }
    list.innerHTML = lines.map(function (l) {
      var it = l.item;
      return '<li class="cart-line" data-id="' + it.id + '">' +
        '<div class="cart-line__main">' +
          '<p class="cart-line__title">' + it.title + '</p>' +
          (it.meta ? '<p class="cart-line__meta">' + it.meta + '</p>' : '') +
          '<p class="cart-line__price">' + (it.priceNote || money(it.price)) + '</p>' +
        '</div>' +
        '<div class="cart-line__side">' +
          '<div class="qty" role="group" aria-label="Quantity for ' + it.title + '">' +
            '<button type="button" class="qty__btn" data-dec aria-label="Decrease quantity">−</button>' +
            '<span class="qty__n" data-qty>' + l.qty + '</span>' +
            '<button type="button" class="qty__btn" data-inc aria-label="Increase quantity">+</button>' +
          '</div>' +
          '<button type="button" class="cart-line__remove" data-remove>Remove</button>' +
        '</div>' +
      '</li>';
    }).join("");
    foot.querySelector("[data-subtotal]").textContent = money(Cart.subtotal());
  }

  drawer.addEventListener("click", function (e) {
    var line = e.target.closest(".cart-line");
    if (line) {
      var id = line.getAttribute("data-id");
      var q = Cart.qtys()[id] || 1;
      if (e.target.closest("[data-inc]")) { Cart.setQty(id, q + 1); return; }
      if (e.target.closest("[data-dec]")) { Cart.setQty(id, q - 1); return; }
      if (e.target.closest("[data-remove]")) { Cart.remove(id); return; }
    }
    if (e.target.closest("[data-go-details]")) { setStep("details"); }
    if (e.target.closest("[data-back-basket]")) { setStep("basket"); }
    if (e.target.closest("[data-back-details]")) { setStep("details"); }
  });

  /* ---------- details step ---------- */
  var detailsForm = drawer.querySelector("[data-details-form]");
  var buyer = { name: "", email: "", phone: "", notes: "" };
  if (detailsForm) {
    detailsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["name", "email"].forEach(function (f) {
        var input = detailsForm.elements[f];
        var wrap = input.closest(".field");
        var valid = input.value.trim() && (f !== "email" || /.+@.+\..+/.test(input.value));
        wrap.classList.toggle("is-invalid", !valid);
        if (!valid && ok) { input.focus(); }
        if (!valid) { ok = false; }
      });
      if (!ok) { return; }
      buyer.name = detailsForm.elements.name.value.trim();
      buyer.email = detailsForm.elements.email.value.trim();
      buyer.phone = detailsForm.elements.phone ? detailsForm.elements.phone.value.trim() : "";
      buyer.notes = detailsForm.elements.notes ? detailsForm.elements.notes.value.trim() : "";
      renderPaySummary();
      setStep("pay");
    });
  }

  /* ---------- payment step ---------- */
  var payMounted = false;
  function renderPaySummary() {
    var box = drawer.querySelector("[data-pay-summary]");
    if (!box) { return; }
    var lines = Cart.lines();
    box.innerHTML = lines.map(function (l) {
      return '<div class="pay-row"><span>' + l.qty + '× ' + l.item.title + '</span>' +
             '<span>' + money((Number(l.item.price) || 0) * l.qty) + '</span></div>';
    }).join("") +
    '<div class="pay-row pay-row--total"><span>Total</span><span>' + money(Cart.subtotal()) + '</span></div>';
    var forName = drawer.querySelector("[data-pay-name]");
    if (forName) { forName.textContent = buyer.name || ""; }
  }

  function mountPayment() {
    renderPaySummary();
    var host = drawer.querySelector("[data-pay-host]");
    if (!host || payMounted) { return; }
    if (PAYPAL_CLIENT_ID) {
      loadPayPal().then(function () {
        payMounted = true;
        window.paypal.Buttons({
          style: { color: "gold", shape: "pill", label: "pay", height: 46 },
          createOrder: function (data, actions) {
            var lines = Cart.lines();
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: CURRENCY,
                  value: Cart.subtotal().toFixed(2),
                  breakdown: { item_total: { currency_code: CURRENCY, value: Cart.subtotal().toFixed(2) } }
                },
                description: "Move with Ease booking",
                items: lines.map(function (l) {
                  return {
                    name: l.item.title.substring(0, 127),
                    quantity: String(l.qty),
                    unit_amount: { currency_code: CURRENCY, value: (Number(l.item.price) || 0).toFixed(2) }
                  };
                })
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              finishOrder(details.id || data.orderID);
            });
          }
        }).render(host);
      }).catch(function () {
        host.innerHTML = '<p class="pay-error">Payment could not load. Please email <a href="mailto:info@movewithease.org.uk">info@movewithease.org.uk</a> to book.</p>';
      });
    } else {
      payMounted = true;
      host.innerHTML =
        '<button type="button" class="btn btn--primary btn--lg pay-demo" data-demo-pay>Pay ' + money(Cart.subtotal()) + '</button>' +
        '<p class="pay-demo-note">Demo checkout — no card is taken. Connect a PayPal account to accept real payments (see README).</p>';
      host.querySelector("[data-demo-pay]").addEventListener("click", function () {
        finishOrder("DEMO-" + Date.now().toString(36).toUpperCase());
      });
    }
  }

  function loadPayPal() {
    return new Promise(function (resolve, reject) {
      if (window.paypal) { return resolve(); }
      var s = document.createElement("script");
      s.src = "https://www.paypal.com/sdk/js?client-id=" + encodeURIComponent(PAYPAL_CLIENT_ID) +
              "&currency=" + CURRENCY + "&intent=capture&components=buttons";
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function finishOrder(ref) {
    var order = {
      ref: ref, at: new Date().toISOString(),
      buyer: buyer, lines: Cart.lines(), total: Cart.subtotal(), currency: CURRENCY
    };
    write(O_KEY, order);
    renderDone(order);
    Cart.clear();
    payMounted = false;
    setStep("done");
  }

  function renderDone(order) {
    var box = drawer.querySelector("[data-done-summary]");
    if (!box) { return; }
    box.innerHTML =
      '<p class="done-ref">Reference <strong>' + order.ref + '</strong></p>' +
      '<ul class="done-list">' + order.lines.map(function (l) {
        return '<li>' + l.qty + '× ' + l.item.title + '<span>' + money((Number(l.item.price) || 0) * l.qty) + '</span></li>';
      }).join("") + '</ul>' +
      '<p class="done-total">Total paid <strong>' + money(order.total) + '</strong></p>';
    var toEl = drawer.querySelector("[data-done-email]");
    if (toEl) { toEl.textContent = order.buyer.email || "your email"; }
  }

  updateBadges();
})();
