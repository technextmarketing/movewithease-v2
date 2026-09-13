/* Move with Ease — progressive enhancement only; every page works without this file. */
(function () {
  'use strict';

  var doc = document.documentElement;

  /* ---------- Header shadow once the page scrolls ---------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Desktop drop-downs ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.nav-item.has-dd'));
  if (items.length) {
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    var closeAll = function (except) {
      items.forEach(function (li) {
        if (li === except) { return; }
        li.classList.remove('is-open');
        var b = li.querySelector('.nav-link');
        if (b) { b.setAttribute('aria-expanded', 'false'); }
      });
    };
    items.forEach(function (li) {
      var btn = li.querySelector('.nav-link');
      var timer = null;
      var open = function () {
        clearTimeout(timer);
        closeAll(li);
        li.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      };
      var close = function () {
        li.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        byHover = false;
      };
      var byHover = false;
      btn.addEventListener('click', function () {
        if (li.classList.contains('is-open') && !byHover) { close(); } else { open(); }
        byHover = false;
      });
      li.addEventListener('mouseenter', function () { if (finePointer.matches) { open(); byHover = true; } });
      li.addEventListener('mouseleave', function () {
        if (!finePointer.matches) { return; }
        timer = setTimeout(close, 160);
      });
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(); btn.focus(); }
      });
      li.addEventListener('focusout', function (e) {
        if (!li.contains(e.relatedTarget)) { close(); }
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item.has-dd')) { closeAll(); }
    });
  }

  /* ---------- Mobile drawer ---------- */
  var mnav = document.getElementById('mnav');
  var overlay = document.querySelector('.mnav-overlay');
  var openBtn = document.querySelector('[data-mnav-open]');
  if (mnav && openBtn) {
    var lastFocus = null;
    var setOpen = function (open) {
      mnav.hidden = !open;
      if (overlay) { overlay.hidden = !open; }
      document.body.classList.toggle('mnav-open', open);
      openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        lastFocus = document.activeElement;
        var first = mnav.querySelector('[data-mnav-close]') || mnav.querySelector('a');
        if (first) { first.focus(); }
      } else if (lastFocus) {
        lastFocus.focus();
      }
    };
    openBtn.addEventListener('click', function () { setOpen(true); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-mnav-close]'), function (el) {
      el.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mnav.hidden) { setOpen(false); }
    });
    mnav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || mnav.hidden) { return; }
      var focusables = mnav.querySelectorAll('a[href], button:not([disabled]), summary');
      if (!focusables.length) { return; }
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // Close when following an in-page link
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a[href^="#"]')) { setOpen(false); }
    });
    // Open the group that holds the current page
    var current = mnav.querySelector('a[aria-current="page"]');
    if (current) {
      var sec = current.closest('details');
      if (sec) { sec.open = true; }
    }
  }

  /* ---------- Enquiry form ---------- */
  var form = document.querySelector('form.enquiry');
  if (form) {
    var next = form.querySelector('input[name="_next"]');
    if (next) {
      try { next.value = new URL('thank-you.html', window.location.href).href; } catch (err) { /* keep the fallback */ }
    }
    try {
      var params = new URLSearchParams(window.location.search);
      var wanted = params.get('topic');
      var topic = form.querySelector('select[name="topic"]');
      if (wanted && topic) {
        Array.prototype.forEach.call(topic.options, function (o) {
          if (o.value.toLowerCase() === wanted.toLowerCase()) { topic.value = o.value; }
        });
      }
    } catch (err) { /* older browsers: nothing lost */ }

    var fields = Array.prototype.slice.call(form.querySelectorAll('[data-validate]'));
    var status = form.querySelector('.form-status');
    var submit = form.querySelector('button[type="submit"]');
    var attempted = false;
    var wrapperOf = function (el) { return el.closest('.field'); };
    var messageFor = function (el) {
      if (el.type === 'checkbox') {
        return el.checked ? '' : (el.getAttribute('data-msg-required') || 'Please tick this box.');
      }
      if (el.validity.valueMissing || (el.tagName === 'SELECT' && !el.value)) {
        return el.getAttribute('data-msg-required') || 'Please fill in this field.';
      }
      if (el.validity.typeMismatch) {
        return el.getAttribute('data-msg-type') || 'Please check this entry.';
      }
      return '';
    };
    var show = function (el, message) {
      var wrap = wrapperOf(el);
      var error = wrap ? wrap.querySelector('.field__error span') : null;
      if (message) {
        if (wrap) { wrap.classList.add('is-invalid'); }
        if (error) { error.textContent = message; }
        el.setAttribute('aria-invalid', 'true');
      } else {
        if (wrap) { wrap.classList.remove('is-invalid'); }
        if (error) { error.textContent = ''; }
        el.removeAttribute('aria-invalid');
      }
    };
    var validate = function (el) { var m = messageFor(el); show(el, m); return !m; };
    fields.forEach(function (el) {
      var evt = (el.tagName === 'SELECT' || el.type === 'checkbox') ? 'change' : 'input';
      el.addEventListener(evt, function () { if (attempted) { validate(el); } });
      el.addEventListener('blur', function () { if (attempted) { validate(el); } });
    });
    form.addEventListener('submit', function (e) {
      attempted = true;
      var firstInvalid = null;
      fields.forEach(function (el) { if (!validate(el) && !firstInvalid) { firstInvalid = el; } });
      if (firstInvalid) {
        e.preventDefault();
        if (status) {
          var count = fields.filter(function (el) { return !!messageFor(el); }).length;
          status.textContent = count === 1
            ? 'One field needs your attention before I can send this.'
            : count + ' fields need your attention before I can send this.';
        }
        firstInvalid.focus();
        if (firstInvalid.scrollIntoView) { firstInvalid.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
        return;
      }
      if (submit && submit.getAttribute('aria-busy') === 'true') { e.preventDefault(); return; }
      if (status) { status.textContent = 'Sending your enquiry…'; }
      if (submit) {
        submit.setAttribute('aria-busy', 'true');
        var label = submit.querySelector('.btn__text');
        if (label) { label.textContent = 'Sending…'; }
      }
    });
  }
})();
