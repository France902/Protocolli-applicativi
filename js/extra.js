/* extra.js — elementi interattivi facoltativi:
   scomposizione di un URL (1.4) e animazione passo per passo della risoluzione DNS (1.6). */
window.DCS = window.DCS || {};

DCS.extra = {
  url: function (host) {
    var U = DCS.util, t = DCS.t;
    var CHIAVI = ['schema', 'host', 'porta', 'percorso', 'query', 'frammento'];
    var PARTI = CHIAVI.map(function (k) { return { k: k, n: t('url.' + k), d: t('url.' + k + 'D') }; });
    var attiva = 'host';
    host.innerHTML = '<section class="block"><div class="ex-head"><h2>' + t('url.titolo') + '</h2><span class="tag">' + t('tag.facoltativo') + '</span></div>' +
      '<p class="ex-help">' + t('url.help') + '</p>' +
      '<label for="url-in" class="sr-only">' + t('url.label') + '</label>' +
      '<input id="url-in" class="url-input" value="https://www.esempio.it:443/corso/1.4?lingua=it#esempio" spellcheck="false" autocomplete="off">' +
      '<div class="url-vis" aria-live="polite"></div><div class="url-parts" role="group" aria-label="' + U.esc(t('url.parti')) + '"></div>' +
      '<div class="url-explain" aria-live="polite"></div></section>';
    var input = host.querySelector('input'), vis = host.querySelector('.url-vis'), btns = host.querySelector('.url-parts'), exp = host.querySelector('.url-explain');

    function parse(s) {
      var m = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/([^\/:?#]*)(:\d*)?([^?#]*)(\?[^#]*)?(#.*)?$/.exec(s.trim());
      if (!m) return null;
      return { schema: m[1], host: m[2], porta: m[3] || '', percorso: m[4] || '', query: m[5] || '', frammento: m[6] || '' };
    }
    function draw() {
      var p = parse(input.value);
      if (!p) { vis.innerHTML = '<span style="color:var(--err)">' + t('url.errore') + '</span>'; btns.innerHTML = ''; exp.innerHTML = ''; return; }
      var html = '<span data-k="schema">' + U.esc(p.schema) + '</span>://<span data-k="host">' + U.esc(p.host) + '</span>';
      ['porta', 'percorso', 'query', 'frammento'].forEach(function (k) { if (p[k]) html += '<span data-k="' + k + '">' + U.esc(p[k]) + '</span>'; });
      vis.innerHTML = html;
      btns.innerHTML = PARTI.map(function (x) {
        return '<button data-k="' + x.k + '" aria-pressed="' + (x.k === attiva) + '">' + x.n + (p[x.k] ? '' : ' ' + t('url.assente')) + '</button>';
      }).join('');
      vis.querySelectorAll('span').forEach(function (s) { s.classList.toggle('on', s.dataset.k === attiva); });
      var info = PARTI.find(function (x) { return x.k === attiva; });
      var val = p[attiva];
      var def = '';
      if (attiva === 'porta' && !val) {
        var d = { http: '80', https: '443' }[p.schema.toLowerCase()];
        def = d ? ' ' + t('url.default', { d: d }) : '';
      }
      exp.innerHTML = '<p style="margin:0"><b>' + info.n + (val ? ': <code>' + U.esc(val) + '</code>' : ' ' + t('url.assente')) + '</b> — ' + info.d + def + '</p>' +
        '<p style="margin:0.5rem 0 0;color:var(--muted);font-size:0.9375rem">' + t('url.richiesta', { r: '<code>GET ' + U.esc((p.percorso || '/') + p.query) + ' HTTP/1.1</code>', h: '<code>Host: ' + U.esc(p.host) + '</code>' }) + '</p>';
    }
    btns.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { attiva = b.dataset.k; draw(); } });
    vis.addEventListener('click', function (e) { var s = e.target.closest('span[data-k]'); if (s) { attiva = s.dataset.k; draw(); } });
    input.addEventListener('input', draw);
    draw();
  },

  /* Simulatore HTTP (1.5): l'utente sceglie metodo, percorso e se inviare l'header Host,
     invia la richiesta e osserva la risposta del server simulato, con la spiegazione del codice. */
  http: function (host) {
    var U = DCS.util, t = DCS.t;
    var METODI = ['GET', 'HEAD', 'POST', 'DELETE'];
    var PERCORSI = ['/index.html', '/vecchia-pagina.html', '/riservato/', '/inesistente.html', '/api/commenti'];
    var CORPO_POST = '{"testo":"' + t('sim.commento') + '"}';
    function byte(x) { return window.TextEncoder ? new TextEncoder().encode(x).length : x.length; } // Content-Length conta i byte (UTF-8), non i caratteri
    host.innerHTML = '<section class="block"><div class="ex-head"><h2>' + t('sim.titolo') + '</h2><span class="tag">' + t('tag.facoltativo') + '</span></div>' +
      '<p class="ex-help">' + t('sim.help') + '</p>' +
      '<div class="sim-ctrl">' +
        '<label>' + t('sim.metodo') + '<select id="sim-m">' + METODI.map(function (m) { return '<option>' + m + '</option>'; }).join('') + '</select></label>' +
        '<label>' + t('sim.percorso') + '<select id="sim-p">' + PERCORSI.map(function (p) { return '<option>' + p + '</option>'; }).join('') + '</select></label>' +
        '<label class="sim-chk"><input type="checkbox" id="sim-h" checked> ' + t('sim.host') + '</label>' +
        '<button class="btn primary" id="sim-go">' + t('sim.invia') + '</button>' +
      '</div>' +
      '<div class="sim-grid"><div><p class="tray-label">' + t('sim.richiesta') + '</p><pre class="msg sim-req"></pre></div>' +
      '<div><p class="tray-label">' + t('sim.risposta') + '</p><pre class="msg sim-res" aria-live="polite"></pre></div></div>' +
      '<div class="feedback sim-exp" aria-live="polite"></div></section>';
    var selM = host.querySelector('#sim-m'), selP = host.querySelector('#sim-p'), chk = host.querySelector('#sim-h');
    var preReq = host.querySelector('.sim-req'), preRes = host.querySelector('.sim-res'), exp = host.querySelector('.sim-exp');

    function richiesta() {
      var m = selM.value, p = selP.value, r = '<span class="k">' + m + ' ' + U.esc(p) + ' HTTP/1.1</span>\n';
      if (chk.checked) r += 'Host: www.esempio.it\n';
      r += 'User-Agent: Mozilla/5.0\n';
      if (m === 'POST') r += 'Content-Type: application/json\nContent-Length: ' + byte(CORPO_POST) + '\n';
      r += '\n';
      if (m === 'POST') r += U.esc(CORPO_POST);
      return r;
    }
    function serve(m, p, conHost) {
      var r = { h: [] };
      function imposta(code, msg, chiave, ctype, body) { r.code = code; r.msg = msg; r.exp = chiave; r.ctype = ctype; r.body = body || ''; }
      var leggi = m === 'GET' || m === 'HEAD';
      if (!conHost) imposta(400, 'Bad Request', 'sim.e400', 'text/html', '<h1>400 Bad Request</h1>');
      else if (p === '/inesistente.html') imposta(404, 'Not Found', 'sim.e404', 'text/html', '<h1>404 Not Found</h1>');
      else if (p === '/api/commenti') {
        if (leggi) imposta(200, 'OK', m === 'HEAD' ? 'sim.eHead' : 'sim.eJson', 'application/json', '[{"id":41,"testo":"' + t('sim.commento0') + '"}]');
        else if (m === 'POST') { imposta(201, 'Created', 'sim.e201', 'application/json', '{"id":42,"testo":"' + t('sim.commento') + '"}'); r.h.push('Location: /api/commenti/42'); }
        else { imposta(405, 'Method Not Allowed', 'sim.e405', 'text/html', '<h1>405 Method Not Allowed</h1>'); r.h.push('Allow: GET, HEAD, POST'); }
      }
      else if (!leggi) { imposta(405, 'Method Not Allowed', 'sim.e405', 'text/html', '<h1>405 Method Not Allowed</h1>'); r.h.push('Allow: GET, HEAD'); }
      else if (p === '/index.html') imposta(200, 'OK', m === 'HEAD' ? 'sim.eHead' : 'sim.e200', 'text/html; charset=UTF-8', '<!DOCTYPE html><html><head><title>Esempio</title></head><body>…</body></html>');
      else if (p === '/vecchia-pagina.html') { imposta(301, 'Moved Permanently', 'sim.e301', 'text/html', ''); r.h.push('Location: https://www.esempio.it/index.html'); }
      else if (p === '/riservato/') imposta(403, 'Forbidden', 'sim.e403', 'text/html', '<h1>403 Forbidden</h1>');
      return r;
    }
    function mostraRichiesta() { preReq.innerHTML = richiesta(); preRes.innerHTML = '<span class="c">' + t('sim.attesa') + '</span>'; exp.className = 'feedback sim-exp'; exp.innerHTML = ''; }
    function invia() {
      var m = selM.value, r = serve(m, selP.value, chk.checked);
      var classe = String(r.code).charAt(0);
      var txt = '<span class="' + (classe === '2' || classe === '3' ? 's' : 'k') + '">HTTP/1.1 ' + r.code + ' ' + r.msg + '</span>\n' +
        'Date: Mon, 16 Nov 2026 10:00:00 GMT\nServer: nginx\n' +
        r.h.map(function (h) { return U.esc(h) + '\n'; }).join('') +
        'Content-Type: ' + r.ctype + '\nContent-Length: ' + byte(r.body) + '\n\n' +
        (m === 'HEAD' ? '<span class="c">' + t('sim.noBody') + '</span>' : U.esc(r.body));
      preRes.innerHTML = '<span class="c">…</span>';
      exp.innerHTML = '';
      U.wait(450).then(function () {
        preRes.innerHTML = txt;
        exp.className = 'feedback sim-exp ' + (classe === '2' || classe === '3' ? 'ok' : 'bad');
        exp.innerHTML = '<b>' + r.code + ' ' + r.msg + '</b> — ' + t(r.exp);
      });
    }
    [selM, selP, chk].forEach(function (el) { el.addEventListener('change', mostraRichiesta); });
    host.querySelector('#sim-go').addEventListener('click', invia);
    mostraRichiesta();
  },

  /* Animazione di una sessione SMTP (1.8): un comando alla volta, con la spiegazione. */
  smtp: function (host) {
    var U = DCS.util, t = DCS.t;
    var PASSI = [
      { c: [], s: ['220 posta.esempio.it ESMTP Postfix'] },
      { c: ['EHLO mail.mittente.it'], s: ['250-posta.esempio.it', '250-SIZE 35882577', '250 STARTTLS'] },
      { c: ['MAIL FROM:<anna@mittente.it>'], s: ['250 2.1.0 Ok'] },
      { c: ['RCPT TO:<luca@esempio.it>'], s: ['250 2.1.5 Ok'] },
      { c: ['DATA'], s: ['354 End data with <CR><LF>.<CR><LF>'] },
      { c: ['From: Anna <anna@mittente.it>', 'To: Luca <luca@esempio.it>', 'Subject: ' + t('smtp.oggetto'), '', t('smtp.corpo'), '.'], s: ['250 2.0.0 Ok: queued as 4B7F21'] },
      { c: ['QUIT'], s: ['221 2.0.0 Bye'] }
    ];
    var i = 0;
    host.innerHTML = '<section class="block"><div class="ex-head"><h2>' + t('smtp.titolo') + '</h2><span class="tag">' + t('tag.facoltativa') + '</span></div>' +
      '<p class="ex-help">' + t('smtp.help') + '</p>' +
      '<div class="smtp-ends"><span>' + DCS.util.icons.pc.replace('<svg', '<svg class="smtp-ico"') + '<b>' + t('smtp.client') + '</b><small>mail.mittente.it</small></span>' +
      '<span class="smtp-dir" aria-hidden="true"></span>' +
      '<span>' + DCS.util.icons.server.replace('<svg', '<svg class="smtp-ico"') + '<b>' + t('smtp.server') + '</b><small>posta.esempio.it</small></span></div>' +
      '<pre class="msg smtp-log" aria-live="polite"></pre>' +
      '<p class="dns-step-n"></p><div class="dns-log smtp-exp" aria-live="polite"></div>' +
      '<div class="btn-row"><button class="btn" data-a="prev">' + t('dns.indietro') + '</button><button class="btn primary" data-a="next">' + t('dns.avanti') + '</button><button class="btn ghost" data-a="reset">' + t('e.ricomincia') + '</button></div></section>';
    var log = host.querySelector('.smtp-log'), dir = host.querySelector('.smtp-dir');
    function riga(chi, txt, attiva) {
      return '<span class="smtp-line' + (attiva ? ' on' : '') + '"><span class="' + (chi === 'C' ? 'k' : 's') + '">' + chi + ':</span> ' + U.esc(txt) + '</span>\n';
    }
    function draw() {
      var h = '';
      PASSI.slice(0, i + 1).forEach(function (p, k) {
        p.c.forEach(function (l) { h += riga('C', l, k === i); });
        p.s.forEach(function (l) { h += riga('S', l, k === i); });
      });
      log.innerHTML = h;
      log.scrollTop = log.scrollHeight;
      var p = PASSI[i];
      dir.textContent = p.c.length ? t('smtp.dirCS') : t('smtp.dirSC');
      host.querySelector('.dns-step-n').textContent = t('dns.passo', { i: i + 1, n: PASSI.length });
      host.querySelector('.smtp-exp').innerHTML = t('smtp.s' + (i + 1));
      host.querySelector('[data-a="prev"]').disabled = i === 0;
      host.querySelector('[data-a="next"]').disabled = i === PASSI.length - 1;
    }
    host.querySelector('.btn-row').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'next' && i < PASSI.length - 1) i++;
      if (b.dataset.a === 'prev' && i > 0) i--;
      if (b.dataset.a === 'reset') i = 0;
      draw();
    });
    draw();
  },

  dns: function (host) {
    var t = DCS.t;
    var NODI = [1, 2, 3, 4, 5].map(function (k) { return { b: t('dns.n' + k), s: t('dns.n' + k + 's') }; });
    var ACCESI = [[0], [0, 1], [1, 2], [1, 3], [1, 4], [0, 1]];
    var PASSI = ACCESI.map(function (on, k) { return { on: on, log: t('dns.p' + (k + 1)) }; });
    var i = 0;
    host.innerHTML = '<section class="block"><div class="ex-head"><h2>' + t('dns.titolo') + '</h2><span class="tag">' + t('tag.facoltativa') + '</span></div>' +
      '<div class="dns-anim">' + NODI.map(function (n) { return '<div class="dns-node"><b>' + n.b + '</b>' + n.s + '</div>'; }).join('') + '</div>' +
      '<p class="dns-step-n"></p><div class="dns-log" aria-live="polite"></div>' +
      '<div class="btn-row"><button class="btn" data-a="prev">' + t('dns.indietro') + '</button><button class="btn primary" data-a="next">' + t('dns.avanti') + '</button><button class="btn ghost" data-a="reset">' + t('e.ricomincia') + '</button></div></section>';
    var nodes = host.querySelectorAll('.dns-node');
    function draw() {
      nodes.forEach(function (n, k) {
        n.classList.toggle('on', PASSI[i].on.indexOf(k) >= 0);
        var fatto = PASSI.slice(0, i).some(function (p) { return p.on.indexOf(k) >= 0; });
        n.classList.toggle('done', fatto && PASSI[i].on.indexOf(k) < 0);
      });
      host.querySelector('.dns-step-n').textContent = t('dns.passo', { i: i + 1, n: PASSI.length });
      host.querySelector('.dns-log').innerHTML = PASSI[i].log;
      host.querySelector('[data-a="prev"]').disabled = i === 0;
      host.querySelector('[data-a="next"]').disabled = i === PASSI.length - 1;
    }
    host.querySelector('.btn-row').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'next' && i < PASSI.length - 1) i++;
      if (b.dataset.a === 'prev' && i > 0) i--;
      if (b.dataset.a === 'reset') i = 0;
      draw();
    });
    draw();
  }
};
