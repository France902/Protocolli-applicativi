/* E1 — Client e server (capitolo 1.2)
   Due slot per i dispositivi, due frecce (sopra: sinistra→destra, sotto: destra→sinistra),
   due slot sulle frecce. Giusto se la freccia che parte dal client porta la request
   e quella che parte dal server porta la response (PC e server possono stare su entrambi i lati). */
window.DCS = window.DCS || {};
DCS.esercitazioni = DCS.esercitazioni || {};

DCS.esercitazioni.e1 = {
  render: function (host, onChange) {
    var U = DCS.util, S = DCS.storage, I = U.icons, t = DCS.t;
    var PEZZI = {
      pc: { html: '<span class="dev-card">' + I.pc + '<b>PC</b><small>client</small><span class="page-pop">' + I.page + '</span></span>', nome: 'PC (client)' },
      server: { html: '<span class="dev-card">' + I.server + '<b>Server</b><span class="gear">' + I.gear + '</span></span>', nome: 'Server' },
      req: { html: '<span><b>HTTP request</b><br><span class="sub">GET /index.html</span></span>', nome: 'HTTP request' },
      res: { html: '<span><b>HTTP response</b><br><span class="sub">200 OK</span></span>', nome: 'HTTP response' }
    };
    var SLOTS = ['devL', 'devR', 'arrTop', 'arrBot'];
    var tipoSlot = { devL: 'dev', devR: 'dev', arrTop: 'lbl', arrBot: 'lbl' };
    var tipoPezzo = { pc: 'dev', server: 'dev', req: 'lbl', res: 'lbl' };
    var pos, verificato, dnd;

    function reset() {
      pos = { pc: 'tray', server: 'tray', req: 'tray', res: 'tray' };
      verificato = false;
      draw();
    }
    function inSlot(slot) {
      return Object.keys(pos).find(function (k) { return pos[k] === slot; }) || null;
    }
    function chip(id) {
      return '<div class="chip" tabindex="0" role="button" data-id="' + id + '" aria-label="' + PEZZI[id].nome + '">' + PEZZI[id].html + '</div>';
    }
    function vuoto(txt) { return '<span style="color:var(--muted);font-size:0.8125rem">' + txt + '</span>'; }

    function draw() {
      var svolta = S.esercitazioneSvolta('e1');
      var tray = Object.keys(pos).filter(function (k) { return pos[k] === 'tray'; }).map(chip).join('');
      host.innerHTML =
        '<section class="block ex" aria-labelledby="e1-t">' +
        '<div class="ex-head"><h2 id="e1-t">' + t('e1.titolo') + '</h2><span class="tag">' + t('tag.facoltativa') + '</span>' + (svolta ? '<span class="tag done">' + t('tag.svolta') + '</span>' : '') + '</div>' +
        '<p class="ex-help">' + t('e1.help') + '</p>' +
        '<p class="tray-label">' + t('e.daSistemare') + '</p>' +
        '<div class="tray slot" data-slot="tray" data-swap="no" aria-label="' + U.esc(t('e.daSistemare')) + '">' + (tray || vuoto(t('e.tuttoSistemato'))) + '</div>' +
        '<div class="e1-stage">' +
          '<div class="slot e1-dev" data-slot="devL">' + (inSlot('devL') ? chip(inSlot('devL')) : vuoto(t('e1.dispositivo'))) + '</div>' +
          '<div class="e1-arrows">' +
            '<div class="e1-arrow ltr"><div class="slot" tabindex="0" data-slot="arrTop" aria-label="' + U.esc(t('e1.frecciaLR')) + '">' + (inSlot('arrTop') ? chip(inSlot('arrTop')) : vuoto(t('e1.etichetta') + ' →')) + '</div><div class="line"><span class="dot"></span></div></div>' +
            '<div class="e1-arrow rtl"><div class="line"><span class="dot"></span></div><div class="slot" tabindex="0" data-slot="arrBot" aria-label="' + U.esc(t('e1.frecciaRL')) + '">' + (inSlot('arrBot') ? chip(inSlot('arrBot')) : vuoto('← ' + t('e1.etichetta'))) + '</div></div>' +
          '</div>' +
          '<div class="slot e1-dev" data-slot="devR">' + (inSlot('devR') ? chip(inSlot('devR')) : vuoto(t('e1.dispositivo'))) + '</div>' +
        '</div>' +
        '<div class="e1-status" aria-live="polite"></div>' +
        '<div class="btn-row"><button class="btn primary" data-act="verifica">' + t('e.verifica') + '</button><button class="btn" data-act="reset">' + t('e.ricomincia') + '</button></div>' +
        '<div class="feedback" aria-live="polite"></div>' +
        '</section>';
      host.querySelectorAll('.e1-dev').forEach(function (d) { d.setAttribute('tabindex', '0'); d.setAttribute('aria-label', t('e1.riquadro')); });
      dnd = DCS.dnd(host.querySelector('.ex'), { item: '.chip', zone: '.slot', onDrop: onDrop });
      if (verificato) dnd.lock(true);
      host.querySelector('[data-act="verifica"]').addEventListener('click', verifica);
      host.querySelector('[data-act="reset"]').addEventListener('click', reset);
    }

    function onDrop(item, zone) {
      var id = item.dataset.id, dest = zone.dataset.slot;
      if (dest !== 'tray' && tipoSlot[dest] !== tipoPezzo[id]) {
        flash(t(tipoPezzo[id] === 'dev' ? 'e1.soloDev' : 'e1.soloEtich'));
        return;
      }
      if (dest !== 'tray') {
        var occupante = inSlot(dest);
        if (occupante && occupante !== id) pos[occupante] = pos[id]; // scambio
      }
      pos[id] = dest;
      draw();
    }
    function flash(msg) {
      var st = host.querySelector('.e1-status');
      st.textContent = msg;
      setTimeout(function () { if (st.textContent === msg) st.textContent = ''; }, 2200);
    }

    function verifica() {
      var fb = host.querySelector('.feedback');
      if (SLOTS.some(function (s) { return !inSlot(s); })) {
        fb.className = 'feedback bad';
        fb.innerHTML = t('e1.incompleto');
        return;
      }
      verificato = true;
      dnd.lock(true);
      var clientSx = pos.pc === 'devL';
      // freccia che parte dal client: sopra se il PC è a sinistra, sotto se è a destra
      var arrClient = clientSx ? 'arrTop' : 'arrBot';
      var arrServer = clientSx ? 'arrBot' : 'arrTop';
      var errori = [];
      if (inSlot(arrClient) !== 'req') errori.push(t('e1.errReq'));
      if (inSlot(arrServer) !== 'res') errori.push(t('e1.errRes'));

      ['arrTop', 'arrBot'].forEach(function (s) {
        var giusto = (s === arrClient && inSlot(s) === 'req') || (s === arrServer && inSlot(s) === 'res');
        host.querySelector('[data-slot="' + s + '"]').classList.add(giusto ? 'ok' : 'bad');
      });
      host.querySelectorAll('.e1-dev').forEach(function (d) { d.classList.add('ok'); });

      if (!errori.length) {
        fb.className = 'feedback ok';
        fb.innerHTML = '<span class="mark-ok">' + t('e.corretto') + '</span> ' + t('e1.ok');
        S.segnaEsercitazione('e1');
        var tag = host.querySelector('.ex-head');
        if (!tag.querySelector('.done')) tag.insertAdjacentHTML('beforeend', '<span class="tag done">' + t('tag.svolta') + '</span>');
        if (onChange) onChange();
        anima(clientSx);
      } else {
        fb.className = 'feedback bad';
        fb.innerHTML = '<span class="mark-bad">' + t('e.errato') + '</span><ul>' + errori.map(function (e) { return '<li>' + e + '</li>'; }).join('') +
          '</ul><p style="margin:0.5rem 0 0">' + t('e1.soluzione') + '</p>';
      }
    }

    function anima(clientSx) {
      var st = host.querySelector('.e1-status');
      var arrReq = host.querySelector(clientSx ? '.e1-arrow.ltr .dot' : '.e1-arrow.rtl .dot');
      var arrRes = host.querySelector(clientSx ? '.e1-arrow.rtl .dot' : '.e1-arrow.ltr .dot');
      var gear = host.querySelector('.gear');
      var page = host.querySelector('.page-pop');
      st.textContent = t('e1.s1');
      U.travel(arrReq, { reverse: !clientSx }).then(function () {
        arrReq.style.opacity = '0';
        st.textContent = t('e1.s2');
        gear.classList.add('spin');
        return U.wait(1300);
      }).then(function () {
        gear.classList.remove('spin');
        st.textContent = t('e1.s3');
        return U.travel(arrRes, { reverse: clientSx });
      }).then(function () {
        arrRes.style.opacity = '0';
        page.classList.add('show');
        st.textContent = t('e1.s4');
      });
    }

    reset();
  }
};
