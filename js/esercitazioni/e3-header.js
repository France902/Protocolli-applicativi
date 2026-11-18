/* E3 — Costruire gli header HTTP (capitolo 1.5)
   Fase 1: richiesta. Fase 2: risposta. Un solo Verifica, alla fine.
   Regola: prima riga giusta, riga vuota in fondo, header in mezzo in qualsiasi ordine,
   Host obbligatorio nella richiesta, nessuna "esca". */
window.DCS = window.DCS || {};
DCS.esercitazioni = DCS.esercitazioni || {};

DCS.esercitazioni.e3 = {
  render: function (host, onChange) {
    var U = DCS.util, S = DCS.storage, t = DCS.t;
    var FASI = {
      req: {
        nome: t('e3.req'),
        consegna: t('e3.consReq'),
        blocchi: [
          { id: 'r1', t: 'GET /index.html HTTP/1.1', ruolo: 'prima' },
          { id: 'r2', t: 'Host: www.esempio.it', ruolo: 'header', obbl: true },
          { id: 'r3', t: 'User-Agent: Mozilla/5.0', ruolo: 'header' },
          { id: 'r4', t: 'Accept: text/html', ruolo: 'header' },
          { id: 'rb', t: '', ruolo: 'vuota' },
          { id: 'rx1', t: 'HTTP/1.1 200 OK', ruolo: 'esca', why: t('e3.rx1') },
          { id: 'rx2', t: 'Server: nginx', ruolo: 'esca', why: t('e3.rx2') },
          { id: 'rx3', t: 'Content-Length: 1256', ruolo: 'esca', why: t('e3.rx3') }
        ],
        primaWhy: t('e3.primaReq')
      },
      res: {
        nome: t('e3.res'),
        consegna: t('e3.consRes'),
        blocchi: [
          { id: 's1', t: 'HTTP/1.1 200 OK', ruolo: 'prima' },
          { id: 's2', t: 'Date: Mon, 16 Nov 2026 10:00:00 GMT', ruolo: 'header' },
          { id: 's3', t: 'Server: nginx', ruolo: 'header' },
          { id: 's4', t: 'Content-Type: text/html; charset=UTF-8', ruolo: 'header' },
          { id: 's5', t: 'Content-Length: 1256', ruolo: 'header' },
          { id: 'sb', t: '', ruolo: 'vuota' },
          { id: 'sx1', t: 'GET /index.html HTTP/1.1', ruolo: 'esca', why: t('e3.sx1') },
          { id: 'sx2', t: 'Host: www.esempio.it', ruolo: 'esca', why: t('e3.sx2') },
          { id: 'sx3', t: 'User-Agent: Mozilla/5.0', ruolo: 'esca', why: t('e3.sx3') }
        ],
        primaWhy: t('e3.primaRes')
      }
    };
    var ordinePool, asm, fase, verificato, esito, dnd;

    function trova(id) {
      return FASI.req.blocchi.concat(FASI.res.blocchi).find(function (b) { return b.id === id; });
    }
    function reset() {
      ordinePool = {
        req: U.shuffle(FASI.req.blocchi.map(function (b) { return b.id; })),
        res: U.shuffle(FASI.res.blocchi.map(function (b) { return b.id; }))
      };
      asm = { req: [], res: [] };
      fase = 'req';
      verificato = false;
      esito = null;
      draw();
    }
    function testo(b) { return b.ruolo === 'vuota' ? '<span class="blank-line">' + t('e3.rigaVuota') + '</span>' : U.esc(b.t); }
    function chip(id) {
      var b = trova(id);
      return '<div class="chip mono-chip" tabindex="0" role="button" data-id="' + id + '" aria-label="' + U.esc(b.t || t('e3.rigaVuotaAria')) + '">' + testo(b) + '</div>';
    }

    function draw() {
      var svolta = S.esercitazioneSvolta('e3');
      var h = '<section class="block ex" aria-labelledby="e3-t">' +
        '<div class="ex-head"><h2 id="e3-t">' + t('e3.titolo') + '</h2><span class="tag">' + t('tag.facoltativa') + '</span>' + (svolta ? '<span class="tag done">' + t('tag.svolta') + '</span>' : '') + '</div>';
      if (verificato) { host.innerHTML = h + risultato() + '</section>'; bind(); return; }
      var F = FASI[fase];
      h += '<div class="e3-steps"><span class="' + (fase === 'req' ? 'on' : 'past') + '">1 · ' + FASI.req.nome + (fase === 'res' ? ' ✓' : '') + '</span><span class="' + (fase === 'res' ? 'on' : '') + '">2 · ' + FASI.res.nome + '</span><span>' + t('e.verifica') + '</span></div>' +
        '<p class="ex-help">' + F.consegna + ' ' + t('e3.help') + '</p>' +
        '<p class="tray-label">' + t('e3.disponibili') + '</p>' +
        '<div class="tray slot" data-slot="pool" data-swap="no" aria-label="' + U.esc(t('e3.disponibili')) + '">';
      var liberi = ordinePool[fase].filter(function (id) { return asm[fase].indexOf(id) < 0; });
      h += liberi.map(function (id) { return chip(id); }).join('') || '<span style="color:var(--muted);font-size:0.875rem">' + t('e3.nessuno') + '</span>';
      h += '</div><p class="tray-label">' + t('e3.montaggio', { f: F.nome.toLowerCase() }) + '</p>' +
        '<div class="e3-assembly slot" data-slot="asm" data-swap="no" tabindex="0" aria-label="' + U.esc(t('e3.montaggio', { f: F.nome.toLowerCase() })) + '">';
      if (!asm[fase].length) h += '<div class="empty">' + t('e3.vuotaHint') + '</div>';
      asm[fase].forEach(function (id, i) {
        h += '<div class="e3-line" data-i="' + i + '">' + chip(id) +
          '<span class="mv"><button data-mv="up" data-i="' + i + '" aria-label="' + U.esc(t('e3.su')) + '"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
          '<button data-mv="down" data-i="' + i + '" aria-label="' + U.esc(t('e3.giu')) + '"' + (i === asm[fase].length - 1 ? ' disabled' : '') + '>↓</button>' +
          '<button data-mv="del" data-i="' + i + '" aria-label="' + U.esc(t('e3.togli')) + '">✕</button></span></div>';
      });
      h += '</div><div class="btn-row">' +
        (fase === 'req'
          ? '<button class="btn primary" data-act="next">' + t('e3.avanti') + '</button>'
          : '<button class="btn" data-act="back">' + t('e3.indietro') + '</button><button class="btn primary" data-act="verifica">' + t('e.verifica') + '</button>') +
        '<button class="btn" data-act="reset">' + t('e.ricomincia') + '</button></div><div class="feedback" aria-live="polite"></div></section>';
      host.innerHTML = h;
      bind();
    }

    function bind() {
      var root = host.querySelector('.ex');
      if (!verificato) dnd = DCS.dnd(root, {
        item: '.chip', zone: '.slot', onDrop: onDrop,
        // tocco su un blocco disponibile: si aggiunge subito in fondo all'area di montaggio
        onTap: function (item) {
          if (!item.closest('[data-slot="pool"]')) return false;
          asm[fase].push(item.dataset.id); draw();
          var nuovo = host.querySelector('[data-slot="pool"] .chip') || host.querySelector('.e3-assembly');
          if (nuovo) nuovo.focus();
          return true;
        }
      });
      host.querySelectorAll('[data-mv]').forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          var i = +b.dataset.i, a = asm[fase];
          if (b.dataset.mv === 'up' && i > 0) { a.splice(i - 1, 0, a.splice(i, 1)[0]); }
          if (b.dataset.mv === 'down' && i < a.length - 1) { a.splice(i + 1, 0, a.splice(i, 1)[0]); }
          if (b.dataset.mv === 'del') { a.splice(i, 1); }
          draw();
          var again = host.querySelector('[data-mv="' + b.dataset.mv + '"][data-i="' + (b.dataset.mv === 'up' ? i - 1 : b.dataset.mv === 'down' ? i + 1 : i) + '"]');
          if (again && !again.disabled) again.focus();
        });
      });
      var act = function (n, fn) { var b = host.querySelector('[data-act="' + n + '"]'); if (b) b.addEventListener('click', fn); };
      act('next', function () {
        if (!asm.req.length) { feedback(t('e3.almenoUno')); return; }
        fase = 'res'; draw();
      });
      act('back', function () { fase = 'req'; draw(); });
      act('verifica', verifica);
      act('reset', reset);
    }
    function feedback(msg) {
      var fb = host.querySelector('.feedback');
      fb.className = 'feedback bad';
      fb.textContent = msg;
    }

    function onDrop(item, zone, ev) {
      var id = item.dataset.id, a = asm[fase];
      var da = a.indexOf(id);
      if (zone.dataset.slot === 'pool') {
        if (da >= 0) a.splice(da, 1);
        draw(); return;
      }
      // rilascio nell'area di montaggio: alla posizione del puntatore, o in fondo col tocco
      var idx = a.length;
      if (ev) {
        var righe = zone.querySelectorAll('.e3-line');
        idx = righe.length;
        for (var k = 0; k < righe.length; k++) {
          var r = righe[k].getBoundingClientRect();
          if (ev.clientY < r.top + r.height / 2) { idx = k; break; }
        }
      }
      if (da >= 0) { a.splice(da, 1); if (da < idx) idx--; }
      a.splice(idx, 0, id);
      draw();
    }

    function controlla(f) {
      var F = FASI[f], a = asm[f];
      var righe = a.map(function (id) { return { id: id, b: trova(id), why: null }; });
      var generali = [];
      righe.forEach(function (r, i) {
        if (r.b.ruolo === 'esca') r.why = r.b.why;
        else if (r.b.ruolo === 'prima' && i !== 0) r.why = F.primaWhy;
        else if (r.b.ruolo === 'vuota' && i !== righe.length - 1) r.why = t('e3.vuotaFondo');
      });
      if (righe.length && righe[0].b.ruolo !== 'prima' && !righe[0].why) righe[0].why = F.primaWhy;
      if (!righe.some(function (r) { return r.b.ruolo === 'prima'; })) generali.push(F.primaWhy + ' ' + t('e3.manca'));
      if (!righe.some(function (r) { return r.b.ruolo === 'vuota'; })) generali.push(t('e3.mancaVuota'));
      F.blocchi.forEach(function (b) {
        if (b.obbl && a.indexOf(b.id) < 0) generali.push(t('e3.mancaHost'));
      });
      var ok = !generali.length && righe.every(function (r) { return !r.why; });
      return { righe: righe, generali: generali, ok: ok };
    }

    function verifica() {
      if (!asm.res.length) { feedback(t('e3.ancheRisp')); return; }
      esito = { req: controlla('req'), res: controlla('res') };
      verificato = true;
      if (esito.req.ok && esito.res.ok && !S.esercitazioneSvolta('e3')) { S.segnaEsercitazione('e3'); if (onChange) onChange(); }
      draw();
    }

    function risultato() {
      var tuttoOk = esito.req.ok && esito.res.ok;
      var h = '<div class="e3-steps"><span class="past">1 · ' + FASI.req.nome + '</span><span class="past">2 · ' + FASI.res.nome + '</span><span class="on">' + t('e.verifica') + '</span></div>';
      h += '<div class="feedback ' + (tuttoOk ? 'ok' : 'bad') + '">' + (tuttoOk
        ? '<span class="mark-ok">' + t('e.corretto') + '</span> ' + t('e3.ok')
        : '<span class="mark-bad">' + t('e.errato') + '</span> ' + t('e3.err')) + '</div>';
      h += '<div class="e3-result">';
      ['req', 'res'].forEach(function (f) {
        var e = esito[f];
        h += '<div><h3>' + FASI[f].nome + ' ' + (e.ok ? '<span class="mark-ok"></span>' : '<span class="mark-bad"></span>') + '</h3><div class="e3-assembly">';
        e.righe.forEach(function (r) {
          h += '<div class="e3-line ' + (r.why ? 'bad' : 'ok') + '"><div class="chip mono-chip" style="cursor:default">' + testo(r.b) + '</div></div>';
          if (r.why) h += '<div class="e3-why">' + r.why + '</div>';
        });
        if (!e.righe.length) h += '<div class="empty">' + t('e3.vuota') + '</div>';
        h += '</div>';
        if (e.generali.length) h += '<ul class="e3-why" style="margin:0;padding-left:1.125rem">' + e.generali.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul>';
        h += '</div>';
      });
      h += '</div><div class="btn-row"><button class="btn primary" data-act="reset">' + t('e.ricomincia') + '</button></div>';
      return h;
    }

    reset();
  }
};
