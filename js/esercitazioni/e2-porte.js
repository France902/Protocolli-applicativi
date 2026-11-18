/* E2 — Servizi e porte (capitolo 1.3)
   Si clicca un servizio e poi una porta (o viceversa): compare una linea.
   Cliccando la linea, o di nuovo il servizio collegato, il collegamento si cancella. */
window.DCS = window.DCS || {};
DCS.esercitazioni = DCS.esercitazioni || {};

DCS.esercitazioni.e2 = {
  render: function (host, onChange) {
    var U = DCS.util, S = DCS.storage, t = DCS.t;
    var SERVIZI = [
      { id: 'http', porta: '80' },
      { id: 'https', porta: '443' },
      { id: 'dns', porta: '53' },
      { id: 'smtp', porta: '25' },
      { id: 'pop3', porta: '110' },
      { id: 'ftp', porta: '21' },
      { id: 'ssh', porta: '22' }
    ];
    SERVIZI.forEach(function (s) { s.nome = t('e2.' + s.id); });
    var porte, links, sel, verificato, ro;

    function reset() {
      porte = U.shuffle(SERVIZI.map(function (s) { return s.porta; }));
      links = {};          // servizio -> porta
      sel = null;          // { lato: 's'|'p', id }
      verificato = false;
      draw();
    }
    function servizioDi(porta) {
      return Object.keys(links).find(function (k) { return links[k] === porta; }) || null;
    }

    function draw() {
      var svolta = S.esercitazioneSvolta('e2');
      var h = '<section class="block ex" aria-labelledby="e2-t">' +
        '<div class="ex-head"><h2 id="e2-t">' + t('e2.titolo') + '</h2><span class="tag">' + t('tag.facoltativa') + '</span>' + (svolta ? '<span class="tag done">' + t('tag.svolta') + '</span>' : '') + '</div>' +
        '<p class="ex-help">' + t('e2.help') + '</p>' +
        '<div class="e2-board"><div class="e2-col" role="group" aria-label="' + U.esc(t('e2.servizi')) + '">';
      SERVIZI.forEach(function (s) {
        var cls = 'e2-item' + (links[s.id] ? ' linked' : '') + (sel && sel.lato === 's' && sel.id === s.id ? ' selected' : '');
        var fix = '';
        if (verificato) {
          var ok = links[s.id] === s.porta;
          cls += ok ? ' ok' : ' bad';
          if (!ok) fix = '<span class="fix">→ ' + s.porta + '</span>';
        }
        h += '<button class="' + cls + '" data-s="' + s.id + '" aria-pressed="' + !!(sel && sel.id === s.id) + '">' + U.esc(s.nome) +
          (links[s.id] ? '<span class="sr-only"> ' + t('e2.collegatoA', { p: links[s.id] }) + '</span>' : '') + fix + '</button>';
      });
      h += '</div><div aria-hidden="true"></div><div class="e2-col" role="group" aria-label="' + U.esc(t('e2.porte')) + '">';
      porte.forEach(function (p) {
        var cls = 'e2-item e2-port' + (servizioDi(p) ? ' linked' : '') + (sel && sel.lato === 'p' && sel.id === p ? ' selected' : '');
        h += '<button class="' + cls + '" data-p="' + p + '">' + p + '</button>';
      });
      h += '</div><svg class="e2-svg" aria-hidden="true"></svg></div>' +
        '<div class="btn-row"><button class="btn primary" data-act="verifica">' + t('e.verifica') + '</button><button class="btn" data-act="reset">' + t('e.ricomincia') + '</button></div>' +
        '<div class="feedback" aria-live="polite"></div></section>';
      host.innerHTML = h;

      host.querySelectorAll('[data-s]').forEach(function (b) { b.addEventListener('click', function () { clickServizio(b.dataset.s); }); });
      host.querySelectorAll('[data-p]').forEach(function (b) { b.addEventListener('click', function () { clickPorta(b.dataset.p); }); });
      host.querySelector('[data-act="verifica"]').addEventListener('click', verifica);
      host.querySelector('[data-act="reset"]').addEventListener('click', reset);
      if (verificato) mostraEsito();
      linee();
      if (ro) ro.disconnect();
      if ('ResizeObserver' in window) {
        ro = new ResizeObserver(linee);
        ro.observe(host.querySelector('.e2-board'));
      }
    }

    function linee() {
      var board = host.querySelector('.e2-board');
      var svg = host.querySelector('.e2-svg');
      if (!board || !svg) return;
      var b = board.getBoundingClientRect();
      var out = '';
      Object.keys(links).forEach(function (sid) {
        var a = host.querySelector('[data-s="' + sid + '"]').getBoundingClientRect();
        var c = host.querySelector('[data-p="' + links[sid] + '"]').getBoundingClientRect();
        var x1 = a.right - b.left, y1 = a.top + a.height / 2 - b.top;
        var x2 = c.left - b.left, y2 = c.top + c.height / 2 - b.top;
        var mx = (x1 + x2) / 2;
        var d = 'M' + x1 + ' ' + y1 + ' C ' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + x2 + ' ' + y2;
        var stato = '';
        if (verificato) {
          var giusta = SERVIZI.find(function (s) { return s.id === sid; }).porta;
          stato = links[sid] === giusta ? ' ok' : ' bad';
        }
        out += '<g><path class="hit" data-del="' + sid + '" d="' + d + '"/><path class="vis' + stato + '" d="' + d + '"/></g>';
      });
      svg.innerHTML = out;
      svg.querySelectorAll('[data-del]').forEach(function (p) {
        p.addEventListener('click', function () {
          if (verificato) return;
          delete links[p.dataset.del];
          sel = null;
          draw();
        });
      });
    }

    function clickServizio(id) {
      if (verificato) return;
      if (links[id] && !(sel && sel.lato === 'p')) { delete links[id]; sel = null; draw(); return; }
      if (sel && sel.lato === 'p') { collega(id, sel.id); return; }
      sel = sel && sel.id === id ? null : { lato: 's', id: id };
      draw();
      focusSel();
    }
    function clickPorta(p) {
      if (verificato) return;
      if (sel && sel.lato === 's') { collega(sel.id, p); return; }
      sel = sel && sel.id === p ? null : { lato: 'p', id: p };
      draw();
      focusSel();
    }
    function collega(sid, p) {
      var prima = servizioDi(p);
      if (prima) delete links[prima];      // una porta, un servizio
      links[sid] = p;
      sel = null;
      draw();
      var b = host.querySelector('[data-s="' + sid + '"]');
      if (b) b.focus();
    }
    function focusSel() {
      if (!sel) return;
      var b = host.querySelector(sel.lato === 's' ? '[data-s="' + sel.id + '"]' : '[data-p="' + sel.id + '"]');
      if (b) b.focus();
    }

    function verifica() {
      if (Object.keys(links).length < SERVIZI.length) {
        var fb = host.querySelector('.feedback');
        fb.className = 'feedback bad';
        fb.textContent = t('e2.incompleto', { n: Object.keys(links).length });
        return;
      }
      verificato = true;
      sel = null;
      draw();
    }
    function mostraEsito() {
      var sbagliati = SERVIZI.filter(function (s) { return links[s.id] !== s.porta; });
      var fb = host.querySelector('.feedback');
      if (!sbagliati.length) {
        fb.className = 'feedback ok';
        fb.innerHTML = '<span class="mark-ok">' + t('e.corretto') + '</span> ' + t('e2.ok');
        if (!S.esercitazioneSvolta('e2')) { S.segnaEsercitazione('e2'); if (onChange) onChange(); host.querySelector('.ex-head').insertAdjacentHTML('beforeend', '<span class="tag done">' + t('tag.svolta') + '</span>'); }
      } else {
        fb.className = 'feedback bad';
        fb.innerHTML = '<span class="mark-bad">' + t('e2.err', { n: sbagliati.length }) + '</span><ul>' +
          sbagliati.map(function (s) { return '<li>' + t('e2.errRiga', { s: U.esc(s.nome), p: s.porta, q: links[s.id] }) + '</li>'; }).join('') + '</ul>';
      }
    }

    window.addEventListener('resize', function () { if (document.body.contains(host)) linee(); });
    reset();
  }
};
