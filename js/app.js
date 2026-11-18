/* app.js — router, barra laterale, preferenze (tema, carattere, lingua), progresso,
   pagine Home / Riepilogo / Glossario / Crediti.
   Gli indirizzi usano il frammento: #/ (home), #/1.5, #/riepilogo, #/esame, #/glossario, #/crediti. */
(function () {
  var S = DCS.storage, U = DCS.util, t = DCS.t;
  var html = document.documentElement;
  var main = document.getElementById('contenuto');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var btnMenu = document.getElementById('btn-menu');
  var btnProg = document.getElementById('btn-progress');
  var pop = document.getElementById('progress-pop');
  var btnFont = document.getElementById('btn-font');
  var btnLang = document.getElementById('btn-lang');
  var langMenu = document.getElementById('lang-menu');
  var observer = null;
  var mobile = window.matchMedia('(max-width: 920px)');

  function capitoli() { return DCS.capitoli; }

  /* ---------------- fasce alternate ---------------- */
  // ogni figlio diretto di .page diventa una fascia; i colori si alternano
  DCS.fasce = function (root) {
    var page = (root || main).querySelector('.page');
    if (!page) return;
    Array.prototype.forEach.call(page.children, function (el, i) {
      el.classList.remove('band-a', 'band-b');
      el.classList.add(i % 2 ? 'band-b' : 'band-a');
    });
  };

  /* ---------------- progresso ---------------- */
  function stato() {
    var caps = capitoli();
    var fatti = caps.filter(function (c) { return S.capitoloCompletato(c.id); }).length;
    var esame = S.esame();
    var m1 = Math.round(fatti / caps.length * 100);
    var m2 = esame.tentativi > 0 ? 100 : 0;
    var tot = Math.round((fatti + (esame.tentativi > 0 ? 1 : 0)) / (caps.length + 1) * 100);
    return { fatti: fatti, m1: m1, m2: m2, tot: tot, esame: esame };
  }
  function barra(pct, label) {
    return '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="' + U.esc(label) + '">' +
      '<div class="track"><div class="fill" style="width:' + pct + '%"></div></div><span class="pct">' + pct + '%</span></div>';
  }

  /* ---------------- barra laterale ---------------- */
  var ICO = {
    home: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    gloss: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z M5 17a3 3 0 0 1 3-3h11" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    info: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 6l-6 6 6 6M20 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function renderSidebar(rotta) {
    var st = stato();
    var compressa = html.getAttribute('data-side') === 'compressa' && !mobile.matches;
    var h = '<div class="side-head"><button class="side-toggle" id="btn-side" aria-expanded="' + !compressa + '" aria-controls="sidebar" title="' +
      U.esc(t(compressa ? 'side.espandi' : 'side.comprimi')) + '" aria-label="' + U.esc(t(compressa ? 'side.espandi' : 'side.comprimi')) + '">' + ICO.chev + '</button></div>';
    h += '<div class="side-module"><h2>' + t('side.m1') + '</h2>' + barra(st.m1, t('side.progM1')) + '<ul class="route">';
    capitoli().forEach(function (c) {
      var done = S.capitoloCompletato(c.id);
      var ex = c.esercitazione;
      h += '<li class="' + (done ? 'done' : '') + '"><a class="side-link" href="#/' + c.id + '" title="' + c.id + ' ' + U.esc(c.titolo) + '"' + (rotta === c.id ? ' aria-current="page"' : '') + '>' +
        '<span class="stop" aria-hidden="true" data-n="' + c.id.slice(2) + '">' + (done ? '✓' : '') + '</span>' +
        '<span class="side-lbl"><span class="num">' + c.id + '</span> ' + U.esc(c.titolo) +
        (done ? '<span class="sr-only"> ' + t('side.completato') + '</span>' : '') + '</span>' +
        (ex && S.esercitazioneSvolta(ex) ? '<span class="tick-ex" title="' + U.esc(t('side.exSvolta')) + '">' + ex.toUpperCase() + ' ✓</span>' : '') +
        '</a></li>';
    });
    h += '<li><a class="side-link" href="#/riepilogo" title="' + U.esc(t('side.riepilogo')) + '"' + (rotta === 'riepilogo' ? ' aria-current="page"' : '') + '><span class="stop" aria-hidden="true">★</span><span class="side-lbl">' + t('side.riepilogo') + '</span><span class="side-opt">' + t('side.facoltativo') + '</span></a></li>';
    h += '</ul></div>';

    h += '<div class="side-module"><h2>' + t('side.m2') + '</h2>' + barra(st.m2, t('side.progM2')) +
      '<ul class="route"><li class="' + (st.m2 ? 'done' : '') + '"><a class="side-link" href="#/esame" title="' + U.esc(t('side.esame')) + '"' + (rotta === 'esame' ? ' aria-current="page"' : '') + '><span class="stop" aria-hidden="true">' + (st.m2 ? '✓' : 'E') + '</span><span class="side-lbl">' + t('side.esame') + '</span>' +
      (st.esame.migliore !== null ? '<span class="side-opt">' + t('side.best', { n: st.esame.migliore, tot: DCS.domande.length }) + '</span>' : '') + '</a></li></ul></div>';

    h += '<div class="side-tools">' +
      toolLink('', 'side.home', ICO.home, rotta) + toolLink('glossario', 'side.glossario', ICO.gloss, rotta) + toolLink('crediti', 'side.crediti', ICO.info, rotta) +
      '<button class="reset-btn" id="btn-reset">' + t('side.reset') + '</button></div>';
    sidebar.innerHTML = h;
    sidebar.setAttribute('aria-label', t('side.aria'));

    document.getElementById('btn-side').addEventListener('click', function () {
      if (mobile.matches) { chiudiMenu(); return; }
      var nuova = html.getAttribute('data-side') === 'compressa' ? 'aperta' : 'compressa';
      html.setAttribute('data-side', nuova);
      S.salvaPref('sidebar', nuova);
      renderSidebar(rotta);
      document.getElementById('btn-side').focus();
      setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 280); // ridisegna le linee di E2
    });
    var reset = document.getElementById('btn-reset');
    reset.addEventListener('click', function () {
      if (!reset.classList.contains('armed')) {
        reset.classList.add('armed');
        reset.textContent = t('side.resetConf');
        setTimeout(function () {
          if (document.body.contains(reset)) { reset.classList.remove('armed'); reset.textContent = t('side.reset'); }
        }, 4000);
        return;
      }
      S.azzera();
      render();
    });
    renderPill(st);
  }
  function toolLink(r, key, ico, rotta) {
    return '<a class="side-link" href="#/' + r + '" title="' + U.esc(t(key)) + '"' + (rotta === r ? ' aria-current="page"' : '') + '><span class="side-ico">' + ico + '</span><span class="side-lbl">' + t(key) + '</span></a>';
  }

  function renderPill(st) {
    st = st || stato();
    var n = DCS.domande.length;
    document.getElementById('pill-pct').textContent = st.tot + '%';
    pop.innerHTML = '<h3>' + t('prog.titolo') + '</h3>' +
      '<div class="row"><div>' + t('prog.m1') + ' <span style="color:var(--muted)">(' + t('prog.capitoli', { n: st.fatti, tot: capitoli().length }) + ')</span></div>' + barra(st.m1, t('prog.m1')) + '</div>' +
      '<div class="row"><div>' + t('prog.m2') + '</div>' + barra(st.m2, t('prog.m2')) + '</div>' +
      (st.esame.tentativi ? '<div class="row" style="font-size:0.875rem;color:var(--muted)">' + t('prog.punteggi', { u: st.esame.ultimo, m: st.esame.migliore, tot: n, n: st.esame.tentativi }) + '</div>' : '') +
      '<div class="row" style="font-size:0.8125rem;color:var(--muted)">' + t('prog.nota') + '</div>';
  }

  /* ---------------- pagine ---------------- */
  function testata(eyebrow, titolo, lead) {
    return '<header class="page-head"><p class="eyebrow">' + eyebrow + '</p><h1>' + titolo + '</h1>' + (lead ? '<p class="lead">' + lead + '</p>' : '') + '</header>';
  }

  function home() {
    var st = stato();
    var ultimo = S.ultimo();
    var ripresa = ultimo && capitoli().some(function (c) { return c.id === ultimo; }) ? ultimo : null;
    var h = '<div class="page">';
    h += testata(t('home.eyebrow'), t('home.titolo'), t('home.lead'));
    h += '<section class="block"><h2>' + t('home.domande') + '</h2><div class="questions">' +
      '<div class="question"><div class="q-ico">' + svgCursor() + '</div><p>' + t('home.q1') + '</p></div>' +
      '<div class="question"><div class="q-ico">' + svgMail() + '</div><p>' + t('home.q2') + '</p></div></div></section>';
    h += '<section class="block"><h2>' + t('home.percorso') + '</h2><div class="home-map">';
    capitoli().forEach(function (c, i) {
      var done = S.capitoloCompletato(c.id);
      if (i) h += '<span class="seg-line" aria-hidden="true"></span>';
      h += '<a href="#/' + c.id + '" class="' + (done ? 'done' : '') + '"><span class="stop">' + (done ? '✓' : c.id.slice(2)) + '</span><span>' + U.esc(c.breve) + '</span></a>';
    });
    h += '</div>' + barra(st.tot, t('home.progTot'));
    h += '<div class="btn-row">' +
      (ripresa && st.fatti > 0
        ? '<a class="btn primary" href="#/' + ripresa + '">' + t('home.riprendi', { id: ripresa }) + '</a><a class="btn" href="#/1.1">' + t('home.ricomincia') + '</a>'
        : '<a class="btn primary" href="#/1.1">' + t('home.inizia') + '</a>') +
      '<a class="btn ghost" href="#/esame">' + t('home.vaiEsame') + '</a></div></section>';
    h += '<section class="block"><h2>' + t('home.come') + '</h2><ul>' +
      '<li>' + t('home.come1') + '</li><li>' + t('home.come2') + '</li>' +
      '<li>' + t('home.come3', { n: DCS.domande.length, s: DCS.esame.SOGLIA }) + '</li><li>' + t('home.come5') + '</li><li>' + t('home.come4') + '</li></ul></section>';
    h += '</div>';
    main.innerHTML = h;
  }

  function capitolo(id) {
    var caps = capitoli();
    var i = caps.findIndex(function (c) { return c.id === id; });
    var c = caps[i];
    S.salvaUltimo(id);
    var prev = i > 0 ? caps[i - 1] : null;
    var next = i < caps.length - 1 ? caps[i + 1] : null;
    var h = '<article class="page">';
    h += testata(t('cap.eyebrow', { id: c.id }), U.esc(c.titolo), c.sommario);
    h += c.html;
    h += '<footer class="page-foot"><nav class="chapter-nav" aria-label="' + U.esc(t('cap.nav')) + '">' +
      (prev ? '<a class="btn" href="#/' + prev.id + '">← ' + prev.id + ' ' + U.esc(prev.breve) + '</a>' : '<a class="btn" href="#/">← ' + t('side.home') + '</a>') +
      (next ? '<a class="btn primary" href="#/' + next.id + '">' + next.id + ' ' + U.esc(next.breve) + ' →</a>' : '<a class="btn primary" href="#/riepilogo">' + t('side.riepilogo') + ' →</a>') +
      '</nav>';
    h += '<p class="chapter-done-msg" id="done-msg" aria-live="polite">' + (S.capitoloCompletato(id) ? t('cap.completato') : '') + '</p>';
    h += '<div class="end-marker" id="end-marker"></div></footer>';
    h += '</article>';
    main.innerHTML = h;

    // esercitazioni ed elementi interattivi
    main.querySelectorAll('[data-ex]').forEach(function (el) {
      el.classList.add('ex-host');
      var mod = DCS.esercitazioni && DCS.esercitazioni[el.dataset.ex];
      if (mod) mod.render(el, function () { renderSidebar(id); });
    });
    main.querySelectorAll('[data-extra]').forEach(function (el) {
      el.classList.add('ex-host');
      var mod = DCS.extra && DCS.extra[el.dataset.extra];
      if (mod) mod(el);
    });

    // completamento: l'utente ha scorso fino in fondo
    if (!S.capitoloCompletato(id) && 'IntersectionObserver' in window) {
      var marker = document.getElementById('end-marker');
      // si attende un attimo, così l'arrivo sulla pagina non conta come "scorrimento"
      setTimeout(function () {
        if (!document.body.contains(marker)) return;
        observer = new IntersectionObserver(function (entries) {
          if (entries.some(function (e) { return e.isIntersecting; })) {
            if (S.segnaCapitolo(id)) {
              var msg = document.getElementById('done-msg');
              if (msg) msg.textContent = t('cap.completato');
              renderSidebar(id);
            }
            observer.disconnect();
          }
        }, { threshold: 1 });
        observer.observe(marker);
      }, 400);
    } else if (!('IntersectionObserver' in window)) {
      S.segnaCapitolo(id);
    }
  }

  function riepilogo() {
    var cap = ['1.4', '1.6', '1.3', '1.7', '1.5', '1.5', '1.5', '1.1'];
    var h = '<div class="page">' + testata(t('riep.eyebrow'), t('riep.titolo'), t('riep.lead')) +
      '<section class="block"><ol class="summary-steps">';
    cap.forEach(function (c, k) {
      h += '<li><a href="#/' + c + '"><span class="ch">' + t('riep.cap', { id: c }) + '</span><b>' + t('riep.p' + (k + 1) + 't') + '</b><span class="d">' + t('riep.p' + (k + 1) + 'd') + '</span></a></li>';
    });
    h += '</ol></section>' +
      '<footer class="page-foot"><nav class="chapter-nav"><a class="btn" href="#/1.8">← 1.8 ' + U.esc(capitoli()[7].breve) + '</a><a class="btn primary" href="#/esame">' + t('home.vaiEsame') + ' →</a></nav></footer></div>';
    main.innerHTML = h;
  }

  /* Glossario: due viste. "Elenco" con ricerca; "Flashcard" per il ripasso (termine sul fronte,
     definizione sul retro, carte rimescolabili). */
  var vistaGloss = 'elenco';
  function glossario() {
    var termini = DCS.glossario.slice().sort(function (a, b) { return a.t.localeCompare(b.t, DCS.i18n.corrente()); });
    var vista = '<div class="seg-view" role="group" aria-label="' + U.esc(t('gl.vista')) + '">' +
      '<button class="btn' + (vistaGloss === 'elenco' ? ' primary' : '') + '" data-v="elenco" aria-pressed="' + (vistaGloss === 'elenco') + '">' + t('gl.vElenco') + '</button>' +
      '<button class="btn' + (vistaGloss === 'flash' ? ' primary' : '') + '" data-v="flash" aria-pressed="' + (vistaGloss === 'flash') + '">' + t('gl.vFlash') + '</button></div>';
    var head = '<header class="page-head"><p class="eyebrow">' + t('gl.eyebrow') + '</p><h1>' + t('gl.titolo') + '</h1>' +
      '<p class="lead">' + t('gl.lead', { n: termini.length }) + '</p>' + vista;
    if (vistaGloss === 'flash') {
      main.innerHTML = '<div class="page">' + head + '</header><section class="block"><div id="flash"></div></section></div>';
      flashcard(termini);
    } else {
      main.innerHTML = '<div class="page">' + head +
        '<label for="gsearch" class="sr-only">' + t('gl.cerca') + '</label>' +
        '<input id="gsearch" class="search" type="search" placeholder="' + U.esc(t('gl.placeholder')) + '" autocomplete="off"></header>' +
        '<section class="block"><div id="glist" aria-live="polite"></div></section></div>';
      elenco(termini);
    }
    main.querySelectorAll('[data-v]').forEach(function (b) {
      b.addEventListener('click', function () { vistaGloss = b.dataset.v; glossario(); DCS.fasce(main); main.querySelector('[data-v="' + vistaGloss + '"]').focus(); });
    });
  }
  function elenco(termini) {
    var input = document.getElementById('gsearch');
    var list = document.getElementById('glist');
    function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function hl(text, q) {
      if (!q) return U.esc(text);
      var n = norm(text), i = n.indexOf(q);
      if (i < 0) return U.esc(text);
      return U.esc(text.slice(0, i)) + '<mark>' + U.esc(text.slice(i, i + q.length)) + '</mark>' + U.esc(text.slice(i + q.length));
    }
    function draw() {
      var q = norm(input.value.trim());
      var h = '', lettera = '';
      var trovati = termini.filter(function (g) { return !q || norm(g.t + ' ' + g.d).indexOf(q) >= 0; });
      trovati.forEach(function (g) {
        var l = norm(g.t.charAt(0)).toUpperCase();
        if (l !== lettera) { if (lettera) h += '</dl>'; h += '<div class="gloss-letter">' + l + '</div><dl style="margin:0">'; lettera = l; }
        h += '<div class="gloss-item"><dt>' + hl(g.t, q) + '</dt><dd>' + hl(g.d, q) + ' <a href="#/' + g.c + '">' + t('gl.cap', { id: g.c }) + '</a></dd></div>';
      });
      if (lettera) h += '</dl>';
      list.innerHTML = h || '<p class="gloss-empty">' + t('gl.vuoto', { q: U.esc(input.value) }) + '</p>';
    }
    input.addEventListener('input', draw);
    draw();
  }
  function flashcard(termini) {
    var mazzo = termini.slice(), i = 0, girata = false, box = document.getElementById('flash');
    function draw() {
      var g = mazzo[i];
      box.innerHTML = '<p class="ex-help">' + t('gl.fIstr') + '</p>' +
        '<button class="flash' + (girata ? ' flipped' : '') + '" id="fcard" aria-live="polite">' +
          (girata
            ? '<span class="flash-k">' + U.esc(g.t) + '</span><span class="flash-d">' + U.esc(g.d) + '</span><span class="flash-c">' + t('gl.cap', { id: g.c }) + '</span>'
            : '<span class="flash-t">' + U.esc(g.t) + '</span><span class="flash-hint">' + t('gl.fGira') + '</span>') +
        '</button>' +
        '<div class="flash-bar"><button class="btn" data-f="prev">' + t('esa.prec') + '</button>' +
        '<span class="flash-n">' + t('gl.fCarta', { i: i + 1, n: mazzo.length }) + '</span>' +
        '<button class="btn" data-f="next">' + t('esa.succ') + '</button></div>' +
        '<div class="btn-row" style="justify-content:center"><button class="btn ghost" data-f="mix">' + t('gl.fMescola') + '</button>' +
        '<a class="btn ghost" href="#/' + g.c + '">' + t('esa.ripassaCap', { c: g.c, t: U.esc(capitoli().find(function (c) { return c.id === g.c; }).titolo) }) + '</a></div>';
      box.querySelector('#fcard').addEventListener('click', function () { girata = !girata; draw(); box.querySelector('#fcard').focus(); });
      box.querySelectorAll('[data-f]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.dataset.f === 'next') i = (i + 1) % mazzo.length;
          if (b.dataset.f === 'prev') i = (i - 1 + mazzo.length) % mazzo.length;
          if (b.dataset.f === 'mix') { mazzo = U.shuffle(mazzo); i = 0; }
          girata = false; draw(); box.querySelector('[data-f="' + b.dataset.f + '"]').focus();
        });
      });
    }
    box.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') { i = (i + 1) % mazzo.length; girata = false; draw(); box.querySelector('#fcard').focus(); }
      if (e.key === 'ArrowLeft') { i = (i - 1 + mazzo.length) % mazzo.length; girata = false; draw(); box.querySelector('#fcard').focus(); }
    });
    draw();
  }

  function crediti() {
    var fonti = [
      ['HTTP', 'RFC 9110 (HTTP Semantics), RFC 9112 (HTTP/1.1); MDN Web Docs'],
      ['URL', 'RFC 3986 (URI: Generic Syntax); MDN Web Docs'],
      ['DNS', 'RFC 1034, RFC 1035; MDN Web Docs'],
      [t('cr.fTls'), 'RFC 8446 (TLS 1.3); MDN Web Docs'],
      [t('cr.fSmtp'), 'RFC 5321, RFC 5322'],
      ['POP3', 'RFC 1939'],
      ['Cookie', 'RFC 6265'],
      ['MIME', 'RFC 2045, RFC 2046'],
      [t('cr.fPorte'), 'IANA Service Name and Transport Protocol Port Number Registry'],
      [t('cr.fStack'), t('cr.fLibro')]
    ];
    main.innerHTML = '<div class="page">' + testata(t('cr.eyebrow'), t('cr.titolo'), t('cr.lead')) +
      '<section class="block"><h2>' + t('cr.gruppo') + '</h2><p>' + t('cr.gruppoTesto') + '</p><ul>' +
      '<li><b>Scicchitano</b> — ' + t('cr.scicchitano') + '</li>' +
      '<li><b>Zannino</b> — ' + t('cr.zannino') + '</li></ul></section>' +
      '<section class="block"><h2>' + t('cr.ia') + '</h2><p>' + t('cr.iaTesto') + '</p></section>' +
      '<section class="block"><h2>' + t('cr.fonti') + '</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + t('cr.argomento') + '</th><th>' + t('cr.fonte') + '</th></tr></thead><tbody>' +
      fonti.map(function (f) { return '<tr><td>' + f[0] + '</td><td>' + f[1] + '</td></tr>'; }).join('') +
      '</tbody></table></div></section>' +
      '<section class="block"><h2>' + t('cr.librerie') + '</h2><p>' + t('cr.librerieTesto') + '</p><p>' + t('cr.hosting') + '</p></section>' +
      '<section class="block"><h2>' + t('cr.privacy') + '</h2><p>' + t('cr.privacyTesto') + '</p></section></div>';
  }

  function svgCursor() { return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 3l14 7-6 2-2 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'; }
  function svgMail() { return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>'; }

  /* ---------------- router ---------------- */
  function rottaCorrente() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    return decodeURIComponent(h);
  }
  function render(mantieniScroll) {
    if (observer) { observer.disconnect(); observer = null; }
    var r = rottaCorrente();
    var trovato = true;
    if (r === '') home();
    else if (capitoli().some(function (c) { return c.id === r; })) capitolo(r);
    else if (r === 'riepilogo') riepilogo();
    else if (r === 'esame') DCS.esame.render(main, function () { renderSidebar('esame'); });
    else if (r === 'glossario') glossario();
    else if (r === 'crediti') crediti();
    else { trovato = false; main.innerHTML = '<div class="page">' + testata('404', t('nf.titolo'), '<a href="#/">' + t('nf.home') + '</a>') + '</div>'; }
    DCS.fasce(main);
    renderSidebar(trovato ? r : '');
    var titolo = main.querySelector('h1');
    document.title = (titolo && r !== '' ? titolo.textContent + ' — ' : '') + t('meta.titolo');
    if (!mantieniScroll) window.scrollTo(0, 0);
    chiudiMenu();
    if (!mantieniScroll) main.focus({ preventScroll: true });
  }

  /* ---------------- preferenze: tema, carattere, lingua ---------------- */
  function applicaTema(v) {
    if (['notte', 'viola', 'chiaro'].indexOf(v) < 0) v = 'notte';
    html.setAttribute('data-theme', v);
    document.querySelectorAll('[data-theme-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.themeSet === v));
      b.title = t('tema.' + b.dataset.themeSet);
    });
  }
  function applicaFont(v) {
    v = v === 'alt' ? 'alt' : 'lettura';
    html.setAttribute('data-font', v);
    btnFont.setAttribute('aria-checked', String(v === 'alt'));
    document.getElementById('font-lbl').textContent = t(v === 'alt' ? 'font.alt' : 'font.lettura');
    btnFont.setAttribute('aria-label', t('font.label') + ': ' + t('font.alt'));
    btnFont.title = t('font.titolo');
  }
  function applicaLingua(codice) {
    codice = DCS.i18n.usa(codice);
    document.getElementById('lang-code').textContent = codice.toUpperCase();
    btnLang.setAttribute('aria-label', t('lingua.apri'));
    btnLang.title = t('lingua.apri');
    langMenu.setAttribute('aria-label', t('lingua.label'));
    langMenu.innerHTML = DCS.i18n.lingue().map(function (l) {
      return '<button role="menuitemradio" aria-checked="' + (l.codice === codice) + '" lang="' + l.codice + '" data-lang="' + l.codice + '"><span>' + U.esc(l.nome) + '</span><span class="code">' + l.codice.toUpperCase() + '</span></button>';
    }).join('');
    document.querySelector('meta[name="description"]').setAttribute('content', t('meta.descrizione'));
    DCS.i18n.applicaStatici();
    applicaTema(html.getAttribute('data-theme'));
    applicaFont(html.getAttribute('data-font'));
    return codice;
  }

  document.querySelectorAll('[data-theme-set]').forEach(function (b) {
    b.addEventListener('click', function () {
      applicaTema(b.dataset.themeSet);
      S.salvaPref('tema', b.dataset.themeSet);
      window.dispatchEvent(new Event('resize'));
    });
  });
  btnFont.addEventListener('click', function () {
    var v = html.getAttribute('data-font') === 'alt' ? 'lettura' : 'alt';
    applicaFont(v);
    S.salvaPref('font', v);
    setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 50);
  });

  function apriLingue() { langMenu.hidden = false; btnLang.setAttribute('aria-expanded', 'true'); var c = langMenu.querySelector('[aria-checked="true"]'); if (c) c.focus(); }
  function chiudiLingue() { langMenu.hidden = true; btnLang.setAttribute('aria-expanded', 'false'); }
  btnLang.addEventListener('click', function (e) { e.stopPropagation(); langMenu.hidden ? apriLingue() : chiudiLingue(); });
  langMenu.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]'); if (!b) return;
    var c = applicaLingua(b.dataset.lang);
    S.salvaPref('lingua', c);
    chiudiLingue();
    btnLang.focus();
    render(true);
  });
  langMenu.addEventListener('keydown', function (e) {
    var items = Array.prototype.slice.call(langMenu.querySelectorAll('button'));
    var i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  });

  /* ---------------- menu a scomparsa e popup ---------------- */
  function apriMenu() { sidebar.classList.add('open'); scrim.hidden = false; btnMenu.setAttribute('aria-expanded', 'true'); }
  function chiudiMenu() { sidebar.classList.remove('open'); scrim.hidden = true; btnMenu.setAttribute('aria-expanded', 'false'); }
  btnMenu.addEventListener('click', function () { sidebar.classList.contains('open') ? chiudiMenu() : apriMenu(); });
  scrim.addEventListener('click', chiudiMenu);
  btnProg.addEventListener('click', function (e) {
    e.stopPropagation();
    pop.hidden = !pop.hidden;
    btnProg.setAttribute('aria-expanded', String(!pop.hidden));
  });
  document.addEventListener('click', function (e) {
    if (!pop.hidden && !pop.contains(e.target) && e.target !== btnProg) { pop.hidden = true; btnProg.setAttribute('aria-expanded', 'false'); }
    if (!langMenu.hidden && !langMenu.contains(e.target) && !btnLang.contains(e.target)) chiudiLingue();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      chiudiMenu(); pop.hidden = true;
      if (!langMenu.hidden) { chiudiLingue(); btnLang.focus(); }
    }
  });
  mobile.addEventListener && mobile.addEventListener('change', function () { renderSidebar(rottaCorrente()); });

  /* ---------------- avvio ---------------- */
  applicaLingua(S.pref('lingua', 'it')); // il corso nasce in italiano: è la lingua predefinita
  applicaTema(S.pref('tema', 'notte'));
  applicaFont(S.pref('font', 'lettura'));
  html.setAttribute('data-side', S.pref('sidebar', 'aperta'));

  window.addEventListener('hashchange', function () { render(); });
  render();
})();
