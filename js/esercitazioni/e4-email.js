/* E4 — Il viaggio di una email (capitolo 1.8)
   Client mittente → server SMTP mittente → server posta destinatario → client destinatario.
   Tre frecce, tre etichette: SMTP, SMTP, POP3. */
window.DCS = window.DCS || {};
DCS.esercitazioni = DCS.esercitazioni || {};

DCS.esercitazioni.e4 = {
  render: function (host, onChange) {
    var U = DCS.util, S = DCS.storage, I = U.icons, t = DCS.t;
    var GIUSTO = { a1: 'SMTP', a2: 'SMTP', a3: 'POP3' };
    var NODI = [
      { n: t('e4.n1'), i: I.pc, sub: 'MUA' },
      { n: t('e4.n2'), i: I.server },
      { n: t('e4.n3'), i: I.inbox, sub: t('e4.casella') },
      { n: t('e4.n4'), i: I.pc, sub: 'MUA' }
    ];
    var pos, verificato, dnd;

    function reset() {
      pos = { L1: 'tray', L2: 'tray', L3: 'tray' }; // L1, L2 = SMTP; L3 = POP3
      verificato = false;
      draw();
    }
    function nome(id) { return id === 'L3' ? 'POP3' : 'SMTP'; }
    function inSlot(s) { return Object.keys(pos).find(function (k) { return pos[k] === s; }) || null; }
    function chip(id) { return '<div class="chip mono-chip" tabindex="0" role="button" data-id="' + id + '"><b>' + nome(id) + '</b></div>'; }

    function draw() {
      var svolta = S.esercitazioneSvolta('e4');
      var tray = ['L1', 'L2', 'L3'].filter(function (k) { return pos[k] === 'tray'; }).map(chip).join('');
      var h = '<section class="block ex" aria-labelledby="e4-t">' +
        '<div class="ex-head"><h2 id="e4-t">' + t('e4.titolo') + '</h2><span class="tag">' + t('tag.facoltativa') + '</span>' + (svolta ? '<span class="tag done">' + t('tag.svolta') + '</span>' : '') + '</div>' +
        '<p class="ex-help">' + t('e4.help') + '</p>' +
        '<p class="tray-label">' + t('e4.etichette') + '</p>' +
        '<div class="tray slot" data-slot="tray" data-swap="no" aria-label="' + U.esc(t('e4.etichette')) + '">' + (tray || '<span style="color:var(--muted);font-size:0.875rem">' + t('e.tuttoSistemato') + '</span>') + '</div>' +
        '<div class="e4-flow">';
      NODI.forEach(function (nd, i) {
        h += '<div class="e4-node">' + nd.i + '<span><b>' + nd.n + '</b>' + (nd.sub ? '<br><small style="color:var(--muted)">' + nd.sub + '</small>' : '') + '</span></div>';
        if (i < 3) {
          var s = 'a' + (i + 1), p = inSlot(s);
          h += '<div class="e4-link">' + (s === 'a2' ? '<span class="mx">' + t('e4.mx') + '</span>' : '') +
            '<div class="line"><span class="letter">' + I.mail + '</span></div>' +
            '<div class="slot" tabindex="0" data-slot="' + s + '" aria-label="' + U.esc(t('e4.freccia', { n: i + 1 })) + '">' + (p ? chip(p) : '<span style="color:var(--muted);font-size:0.8125rem">?</span>') + '</div></div>';
        }
      });
      h += '</div><div class="e4-proto" aria-live="polite"></div>' +
        '<div class="btn-row"><button class="btn primary" data-act="verifica">' + t('e.verifica') + '</button><button class="btn" data-act="reset">' + t('e.ricomincia') + '</button></div>' +
        '<div class="feedback" aria-live="polite"></div></section>';
      host.innerHTML = h;
      dnd = DCS.dnd(host.querySelector('.ex'), { item: '.chip', zone: '.slot', onDrop: onDrop });
      if (verificato) dnd.lock(true);
      host.querySelector('[data-act="verifica"]').addEventListener('click', verifica);
      host.querySelector('[data-act="reset"]').addEventListener('click', reset);
    }

    function onDrop(item, zone) {
      var id = item.dataset.id, dest = zone.dataset.slot;
      if (dest !== 'tray') {
        var occ = inSlot(dest);
        if (occ && occ !== id) pos[occ] = pos[id];
      }
      pos[id] = dest;
      draw();
    }

    function verifica() {
      var fb = host.querySelector('.feedback');
      if (['a1', 'a2', 'a3'].some(function (s) { return !inSlot(s); })) {
        fb.className = 'feedback bad';
        fb.textContent = t('e4.incompleto');
        return;
      }
      verificato = true;
      dnd.lock(true);
      var errori = [];
      ['a1', 'a2', 'a3'].forEach(function (s) {
        var ok = nome(inSlot(s)) === GIUSTO[s];
        host.querySelector('[data-slot="' + s + '"]').classList.add(ok ? 'ok' : 'bad');
        if (!ok) errori.push(t('e4.errRiga', { n: s.slice(1), g: GIUSTO[s], d: nome(inSlot(s)), s: t('e4.' + s) }));
      });
      if (!errori.length) {
        fb.className = 'feedback ok';
        fb.innerHTML = '<span class="mark-ok">' + t('e.corretto') + '</span> ' + t('e4.ok');
        if (!S.esercitazioneSvolta('e4')) {
          S.segnaEsercitazione('e4');
          host.querySelector('.ex-head').insertAdjacentHTML('beforeend', '<span class="tag done">' + t('tag.svolta') + '</span>');
          if (onChange) onChange();
        }
        anima();
      } else {
        fb.className = 'feedback bad';
        fb.innerHTML = '<span class="mark-bad">' + t('e.errato') + '</span><ul>' + errori.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul><p style="margin:0.5rem 0 0">' + t('e.riprova') + '</p>';
      }
    }

    function anima() {
      var proto = host.querySelector('.e4-proto');
      var vertical = window.matchMedia('(max-width: 720px)').matches;
      var lettere = host.querySelectorAll('.letter');
      var testi = [t('e4.t1'), t('e4.t2'), t('e4.t3')];
      var p = Promise.resolve();
      lettere.forEach(function (l, i) {
        p = p.then(function () {
          proto.textContent = testi[i];
          return U.travel(l, { vertical: vertical, size: vertical ? l.offsetHeight : l.offsetWidth, ms: 1200 });
        }).then(function () { l.style.opacity = '0'; return U.wait(250); });
      });
      p.then(function () { proto.textContent = t('e4.arrivato'); });
    }

    reset();
  }
};
