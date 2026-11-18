/* dnd.js — trascinamento che funziona con mouse, dito e tastiera.
   Due modi, sempre attivi insieme:
   1) trascina: Pointer Events, con un "fantasma" che segue il puntatore;
   2) tocca un elemento, poi tocca la destinazione (anche con Invio/Spazio). */
window.DCS = window.DCS || {};

DCS.dnd = function (root, opts) {
  var itemSel = opts.item || '.chip';
  var zoneSel = opts.zone || '.slot';
  var selected = null;
  var locked = false;
  var press = null;        // { item, x, y, id }
  var drag = null;         // { item, ghost, dx, dy, zone }
  var suppressClick = false;

  function zoneAt(x, y) {
    var el = document.elementFromPoint(x, y);
    return el ? el.closest(zoneSel) : null;
  }
  function clearSel() {
    if (selected) selected.classList.remove('selected');
    selected = null;
    root.querySelectorAll(zoneSel).forEach(function (z) { z.classList.remove('target'); });
  }
  function select(item) {
    clearSel();
    selected = item;
    item.classList.add('selected');
    root.querySelectorAll(zoneSel).forEach(function (z) {
      if (!z.contains(item)) z.classList.add('target');
    });
  }
  function drop(item, zone, ev) {
    clearSel();
    if (zone && opts.onDrop) opts.onDrop(item, zone, ev || null);
  }

  // ---- trascinamento ----
  root.addEventListener('pointerdown', function (e) {
    if (locked || e.button > 0) return;
    var item = e.target.closest(itemSel);
    if (!item || !root.contains(item) || e.target.closest('button')) return;
    press = { item: item, x: e.clientX, y: e.clientY, id: e.pointerId };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  });

  function onMove(e) {
    if (!press || e.pointerId !== press.id) return;
    if (!drag) {
      if (Math.abs(e.clientX - press.x) + Math.abs(e.clientY - press.y) < 7) return;
      var r = press.item.getBoundingClientRect();
      var ghost = press.item.cloneNode(true);
      ghost.classList.add('chip-ghost');
      ghost.classList.remove('selected');
      ghost.style.width = r.width + 'px';
      document.body.appendChild(ghost);
      drag = { item: press.item, ghost: ghost, dx: press.x - r.left, dy: press.y - r.top, zone: null };
      press.item.classList.add('dragging');
      clearSel();
    }
    e.preventDefault();
    drag.ghost.style.left = (e.clientX - drag.dx) + 'px';
    drag.ghost.style.top = (e.clientY - drag.dy) + 'px';
    var z = zoneAt(e.clientX, e.clientY);
    if (z && !root.contains(z)) z = null;
    if (z !== drag.zone) {
      if (drag.zone) drag.zone.classList.remove('over');
      if (z) z.classList.add('over');
      drag.zone = z;
    }
    if (opts.onHover) opts.onHover(drag.item, z, e);
  }
  function end() {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);
    if (drag) {
      drag.ghost.remove();
      drag.item.classList.remove('dragging');
      if (drag.zone) drag.zone.classList.remove('over');
      if (opts.onHover) opts.onHover(null, null, null);
    }
  }
  function onUp(e) {
    if (!press || e.pointerId !== press.id) return;
    var d = drag;
    end();
    if (d) {
      suppressClick = true;
      setTimeout(function () { suppressClick = false; }, 0);
      drop(d.item, d.zone, e);
    }
    press = null; drag = null;
  }
  function onCancel() { end(); press = null; drag = null; }

  // ---- tocca e poi tocca ----
  function activate(target) {
    if (locked) return;
    var item = target.closest(itemSel);
    if (item && root.contains(item)) {
      if (selected === item) { clearSel(); return; }
      if (!selected && opts.onTap && opts.onTap(item)) return;
      var zoneOfItem = item.closest(zoneSel);
      if (selected && zoneOfItem && !zoneOfItem.contains(selected) && zoneOfItem.dataset.swap !== 'no') {
        drop(selected, zoneOfItem, null);
        return;
      }
      select(item);
      return;
    }
    var zone = target.closest(zoneSel);
    if (zone && root.contains(zone) && selected) drop(selected, zone, null);
  }
  root.addEventListener('click', function (e) {
    if (suppressClick) return;
    if (e.target.closest('button') && !e.target.closest(itemSel + ',' + zoneSel)) return;
    if (e.target.closest('.mv')) return;
    activate(e.target);
  });
  root.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var t = e.target;
    if (t.matches(itemSel) || t.matches(zoneSel)) { e.preventDefault(); activate(t); }
  });
  root.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') clearSel();
  });

  return {
    lock: function (v) { locked = v; clearSel(); },
    clear: clearSel
  };
};

/* Piccole utilità condivise dalle esercitazioni */
DCS.util = {
  esc: function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  },
  shuffle: function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },
  reduced: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  wait: function (ms) {
    return new Promise(function (r) { setTimeout(r, DCS.util.reduced() ? 0 : ms); });
  },
  /* muove el da 0 a 100% lungo il suo contenitore, in orizzontale o verticale */
  travel: function (el, opts) {
    opts = opts || {};
    var dur = DCS.util.reduced() ? 0 : (opts.ms || 900);
    var prop = opts.vertical ? 'top' : 'left';
    var size = opts.size || el.offsetWidth || 14; // misura reale: le dimensioni scalano con la finestra
    var from = opts.reverse ? 'calc(100% - ' + size + 'px)' : '0px';
    var to = opts.reverse ? '0px' : 'calc(100% - ' + size + 'px)';
    el.style.transition = 'none';
    el.style.opacity = '1';
    el.style.left = ''; el.style.top = '';
    el.style[prop] = from;
    void el.offsetWidth;
    el.style.transition = prop + ' ' + dur + 'ms ease-in-out';
    el.style[prop] = to;
    return new Promise(function (r) { setTimeout(r, dur + 30); });
  },
  icons: {
    pc: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="8" width="36" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M18 40h12M24 32v8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    server: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="10" y="6" width="28" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="10" y="19" width="28" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="10" y="32" width="28" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="16" cy="11.5" r="1.6" fill="currentColor"/><circle cx="16" cy="24.5" r="1.6" fill="currentColor"/><circle cx="16" cy="37.5" r="1.6" fill="currentColor"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.5 7.5 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.8 1.7 1l.4 2.5h4l.4-2.5c.6-.2 1.2-.6 1.7-1l2.4 1 2-3.4zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>',
    page: '<svg viewBox="0 0 26 30" aria-hidden="true"><path d="M3 2h13l7 7v19H3z" fill="currentColor" opacity=".2"/><path d="M3 2h13l7 7v19H3z M16 2v7h7 M7 15h12M7 19h12M7 23h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 18" aria-hidden="true"><rect x="1" y="1" width="22" height="16" rx="2" fill="currentColor" opacity=".25"/><rect x="1" y="1" width="22" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 3l10 7 10-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    inbox: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M8 28h9l3 5h8l3-5h9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>'
  }
};
