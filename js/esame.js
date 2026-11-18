/* esame.js — Modulo 2: logica del quiz, punteggio e revisione.
   25 domande fisse, opzioni rimescolate a ogni tentativo, nessuna correzione fino a "Invia".
   Superato con almeno 19 risposte corrette (75% di 25 = 18,75, arrotondato per eccesso).
   Le domande arrivano da DCS.domande della lingua attiva: l'ordine e la risposta corretta
   sono identici in tutte le lingue, quindi un tentativo resta valido se si cambia lingua. */
window.DCS = window.DCS || {};

DCS.esame = (function () {
  var U = DCS.util, S = DCS.storage, t = DCS.t;
  var D = DCS.domande;
  var SOGLIA = Math.ceil(25 * 0.75); // 19
  var LETTERE = ['A', 'B', 'C', 'D'];
  var tentativo = null;  // { ordine: [[...]], risposte: [], i, inviato, punteggio, filtro, avvisato }
  var vista = 'intro';
  var main, onChange;

  function nuovoTentativo() {
    tentativo = {
      ordine: D.map(function (q) { return U.shuffle(q.opzioni.map(function (_, k) { return k; })); }),
      risposte: D.map(function () { return null; }),  // indice dell'opzione originale scelta
      i: 0, inviato: false, punteggio: 0, filtro: 'sbagliate', avvisato: false
    };
  }
  function giuste() {
    return D.reduce(function (n, q, k) { return n + (tentativo.risposte[k] === q.corretta ? 1 : 0); }, 0);
  }
  function pct(n) { return Math.round(n / D.length * 100); }
  function capitolo(id) { return DCS.capitoli.find(function (x) { return x.id === id; }); }
  function mostra(h) { main.innerHTML = h; DCS.fasce(main); }
  function testata(eyebrow, titolo, extra) {
    return '<header class="page-head"><p class="eyebrow">' + eyebrow + '</p><h1>' + titolo + '</h1>' + (extra || '') + '</header>';
  }

  function render(el, cb) {
    main = el; onChange = cb;
    D = DCS.domande; // lingua attiva
    var x = tentativo;
    if (x && x.inviato && vista === 'quiz') vista = 'result';
    if (vista === 'quiz' && x) quiz();
    else if (vista === 'result' && x && x.inviato) risultato();
    else if (vista === 'review' && x && x.inviato) revisione();
    else intro();
  }

  function intro() {
    vista = 'intro';
    var e = S.esame(), x = tentativo, n = D.length;
    var fatti = DCS.capitoli.filter(function (c) { return S.capitoloCompletato(c.id); }).length;
    var meta = '<div class="exam-meta"><div><b>' + n + '</b>' + t('esa.domande') + '</div><div><b>' + SOGLIA + '/' + n + '</b>' + t('esa.soglia') + '</div>' +
      (e.tentativi ? '<div><b>' + e.ultimo + '/' + n + '</b>' + t('esa.ultimo') + '</div><div><b>' + e.migliore + '/' + n + '</b>' + t('esa.migliore') + '</div><div><b>' + e.tentativi + '</b>' + t('esa.tentativi') + '</div>' : '') + '</div>';
    var h = '<div class="page">' + testata(t('esa.eyebrow'), t('esa.titolo'), '<p class="lead" style="margin-bottom:2rem">' + t('esa.lead', { n: n }) + '</p>' + meta);
    if (fatti < DCS.capitoli.length) {
      h += '<section class="block note tight"><p>' + t('esa.avviso', { f: fatti, tot: DCS.capitoli.length }) + '</p></section>';
    }
    h += '<section class="block"><h2>' + t('esa.regole') + '</h2><ul>' +
      '<li>' + t('esa.r1') + '</li><li>' + t('esa.r2') + '</li><li>' + t('esa.r3') + '</li><li>' + t('esa.r4') + '</li></ul>' +
      '<div class="btn-row"><button class="btn primary" id="ex-start">' + (x && !x.inviato ? t('esa.riprendi') : t('esa.inizia')) + '</button>' +
      (x && x.inviato ? '<button class="btn" id="ex-last">' + t('esa.vediUltimo') + '</button>' : '') + '</div></section></div>';
    mostra(h);
    main.querySelector('#ex-start').addEventListener('click', function () {
      if (!tentativo || tentativo.inviato) nuovoTentativo();
      vista = 'quiz'; quiz();
    });
    var last = main.querySelector('#ex-last');
    if (last) last.addEventListener('click', function () { vista = 'result'; risultato(); });
  }

  function quiz() {
    vista = 'quiz';
    var x = tentativo, n = D.length;
    var q = D[x.i], ord = x.ordine[x.i];
    var date = x.risposte.filter(function (r) { return r !== null; }).length;
    var h = '<div class="page">' + testata(t('esa.eyebrowQ'), t('esa.domandaN', { i: x.i + 1, n: n }),
      '<p class="lead">' + t('esa.date', { d: date, n: n }) + '</p>');
    h += '<section class="block"><div class="qdots" role="group" aria-label="' + U.esc(t('esa.vai')) + '">';
    D.forEach(function (_, k) {
      var data = x.risposte[k] !== null;
      h += '<button class="' + (data ? 'answered' : '') + (k === x.i ? ' current' : '') + '" data-go="' + k + '" aria-label="' + U.esc(t(data ? 'esa.dotData' : 'esa.dotNo', { i: k + 1 })) + '"' + (k === x.i ? ' aria-current="step"' : '') + '>' + (k + 1) + '</button>';
    });
    h += '</div><p class="q-text" id="q-text">' + U.esc(q.testo) + '</p>' +
      '<div class="opts" role="radiogroup" aria-labelledby="q-text">';
    ord.forEach(function (orig, pos) {
      var scelta = x.risposte[x.i] === orig;
      h += '<button class="opt" role="radio" aria-checked="' + scelta + '" tabindex="' + (scelta || (x.risposte[x.i] === null && pos === 0) ? 0 : -1) + '" data-orig="' + orig + '"><span class="letter-k">' + LETTERE[pos] + '</span><span>' + U.esc(q.opzioni[orig]) + '</span></button>';
    });
    h += '</div></section>' +
      '<footer class="page-foot"><div class="chapter-nav"><button class="btn" id="q-prev"' + (x.i === 0 ? ' disabled' : '') + '>' + t('esa.prec') + '</button>' +
      (x.i < n - 1 ? '<button class="btn primary" id="q-next">' + t('esa.succ') + '</button>' : '<button class="btn primary" id="q-send">' + t('esa.invia') + '</button>') + '</div>' +
      (x.i < n - 1 ? '<div class="btn-row" style="justify-content:flex-end"><button class="btn ghost" id="q-send2">' + t('esa.invia') + '</button></div>' : '') +
      '<p class="exam-warn" id="q-warn" aria-live="polite"></p></footer></div>';
    mostra(h);

    main.querySelectorAll('[data-go]').forEach(function (b) { b.addEventListener('click', function () { x.i = +b.dataset.go; x.avvisato = false; quiz(); }); });
    var opts = main.querySelectorAll('.opt');
    opts.forEach(function (b, k) {
      b.addEventListener('click', function () { x.risposte[x.i] = +b.dataset.orig; x.avvisato = false; quiz(); main.querySelectorAll('.opt')[k].focus(); });
      b.addEventListener('keydown', function (e) {
        var d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var m = (k + d + opts.length) % opts.length;
        x.risposte[x.i] = +opts[m].dataset.orig; quiz(); main.querySelectorAll('.opt')[m].focus();
      });
    });
    var prev = main.querySelector('#q-prev'), next = main.querySelector('#q-next');
    if (prev) prev.addEventListener('click', function () { if (x.i > 0) { x.i--; x.avvisato = false; quiz(); } });
    if (next) next.addEventListener('click', function () { x.i++; x.avvisato = false; quiz(); });
    ['#q-send', '#q-send2'].forEach(function (s) { var b = main.querySelector(s); if (b) b.addEventListener('click', invia); });
  }

  function invia() {
    var x = tentativo;
    var mancano = x.risposte.filter(function (r) { return r === null; }).length;
    if (mancano && !x.avvisato) {
      x.avvisato = true;
      main.querySelector('#q-warn').innerHTML = mancano === 1 ? t('esa.manca1') : t('esa.mancaN', { n: mancano });
      return;
    }
    x.inviato = true;
    x.punteggio = giuste();
    S.salvaEsame(x.punteggio);
    if (onChange) onChange();
    vista = 'result';
    risultato();
    window.scrollTo(0, 0);
  }

  function risultato() {
    var x = tentativo, n = x.punteggio, ok = n >= SOGLIA, e = S.esame(), tot = D.length;
    var perCap = {};
    D.forEach(function (q, k) {
      perCap[q.capitolo] = perCap[q.capitolo] || { tot: 0, ok: 0 };
      perCap[q.capitolo].tot++;
      if (x.risposte[k] === q.corretta) perCap[q.capitolo].ok++;
    });
    var h = '<div class="page">' + testata(t('esa.eyebrowR'), t(ok ? 'esa.superato' : 'esa.nonSuperato')) +
      '<section class="block" style="text-align:center"><div class="score-big">' + n + '/' + tot + ' — ' + pct(n) + '%</div>' +
      '<p><span class="verdict ' + (ok ? 'pass' : 'fail') + '">' + t(ok ? 'esa.vSup' : 'esa.vNon') + '</span></p>' +
      '<p style="color:var(--muted)">' + t('esa.sogliaInfo', { s: SOGLIA, n: tot, m: e.migliore, t: e.tentativi }) + '</p>' +
      '<div class="btn-row" style="justify-content:center"><button class="btn primary" id="r-review">' + t('esa.rivedi') + '</button><button class="btn" id="r-retry">' + t('esa.riprova') + '</button></div></section>' +
      '<section class="block"><h2>' + t('esa.perCap') + '</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + t('esa.capitolo') + '</th><th>' + t('esa.giuste') + '</th><th></th></tr></thead><tbody>';
    Object.keys(perCap).sort().forEach(function (c) {
      var p = perCap[c];
      h += '<tr><td>' + c + ' ' + U.esc(capitolo(c).titolo) + '</td><td class="mono">' + p.ok + '/' + p.tot + '</td><td>' + (p.ok < p.tot ? '<a href="#/' + c + '">' + t('esa.ripassa') + '</a>' : '<span class="mark-ok"></span>') + '</td></tr>';
    });
    h += '</tbody></table></div></section></div>';
    mostra(h);
    main.querySelector('#r-review').addEventListener('click', function () { vista = 'review'; revisione(); window.scrollTo(0, 0); });
    main.querySelector('#r-retry').addEventListener('click', function () { nuovoTentativo(); vista = 'quiz'; quiz(); window.scrollTo(0, 0); });
  }

  function revisione() {
    var x = tentativo;
    var sbagliate = D.filter(function (q, k) { return x.risposte[k] !== q.corretta; }).length;
    var filtro = '<div class="rv-filter" role="group" aria-label="' + U.esc(t('esa.filtro')) + '"><button class="btn' + (x.filtro === 'sbagliate' ? ' primary' : '') + '" data-f="sbagliate">' + t('esa.soloErr', { n: sbagliate }) + '</button>' +
      '<button class="btn' + (x.filtro === 'tutte' ? ' primary' : '') + '" data-f="tutte">' + t('esa.tutte', { n: D.length }) + '</button></div>';
    var h = '<div class="page">' + testata(t('esa.eyebrowRv'), t('esa.titoloRv'), '<p class="lead">' + t('esa.leadRv', { g: x.punteggio, s: sbagliate }) + '</p>' + filtro);
    var mostrate = 0;
    D.forEach(function (q, k) {
      var r = x.risposte[k], giusta = r === q.corretta;
      if (x.filtro === 'sbagliate' && giusta) return;
      mostrate++;
      var cls = giusta ? 'right' : (r === null ? 'skip' : 'wrong');
      h += '<section class="block review-item ' + cls + '"><p class="eyebrow" style="color:var(--muted)">' + t('esa.qInfo', { i: k + 1, c: q.capitolo }) + '</p>' +
        '<p class="q-text">' + U.esc(q.testo) + '</p>';
      x.ordine[k].forEach(function (orig, pos) {
        var c = '', etichetta = '';
        if (orig === q.corretta) { c = 'correct'; etichetta = ' <span class="mark-ok">' + t('esa.corretta') + '</span>'; }
        if (orig === r && !giusta) { c = 'chosen-wrong'; etichetta = ' <span class="mark-bad">' + t('esa.tua') + '</span>'; }
        if (orig === r && giusta) etichetta = ' <span class="mark-ok">' + t('esa.tua') + '</span>';
        h += '<div class="rv-opt ' + c + '"><b>' + LETTERE[pos] + ')</b> ' + U.esc(q.opzioni[orig]) + etichetta + '</div>';
      });
      if (r === null) h += '<p style="color:var(--acc1);margin:0.5rem 0 0">' + t('esa.nonRisp') + '</p>';
      if (!giusta) {
        h += '<div class="rv-expl">' + U.esc(q.spiegazione) + ' <a href="#/' + q.capitolo + '">' + t('esa.ripassaCap', { c: q.capitolo, t: U.esc(capitolo(q.capitolo).titolo) }) + '</a></div>';
      }
      h += '</section>';
    });
    if (!mostrate) h += '<section class="block tight"><p class="mark-ok">' + t('esa.nessunErr') + '</p></section>';
    h += '<footer class="page-foot"><div class="chapter-nav"><button class="btn" id="rv-back">' + t('esa.torna') + '</button><button class="btn primary" id="rv-retry">' + t('esa.riprova') + '</button></div></footer></div>';
    mostra(h);
    main.querySelectorAll('[data-f]').forEach(function (b) { b.addEventListener('click', function () { x.filtro = b.dataset.f; revisione(); }); });
    main.querySelector('#rv-back').addEventListener('click', function () { vista = 'result'; risultato(); window.scrollTo(0, 0); });
    main.querySelector('#rv-retry').addEventListener('click', function () { nuovoTentativo(); vista = 'quiz'; quiz(); window.scrollTo(0, 0); });
  }

  return { render: render, SOGLIA: SOGLIA };
})();
