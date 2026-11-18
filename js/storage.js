/* storage.js — lettura e scrittura nel localStorage.
   Ogni accesso è in un try/catch: se il browser blocca il
   localStorage il sito funziona lo stesso, senza salvare.
   Chiavi: dcs_progresso, dcs_ultimo, dcs_esame (progressi) e dcs_pref (tema, carattere, lingua, barra laterale).
   Nessun dato personale. */
window.DCS = window.DCS || {};

DCS.storage = (function () {
  var KEYS = { progresso: 'dcs_progresso', ultimo: 'dcs_ultimo', esame: 'dcs_esame' };
  var PREF = 'dcs_pref';
  var memoria = {}; // copia in memoria, usata se il localStorage non è disponibile

  function leggi(chiave, predefinito) {
    try {
      var raw = window.localStorage.getItem(chiave);
      if (raw !== null) return JSON.parse(raw);
    } catch (e) { /* bloccato o dati non validi */ }
    return chiave in memoria ? memoria[chiave] : predefinito;
  }
  function scrivi(chiave, valore) {
    memoria[chiave] = valore;
    try { window.localStorage.setItem(chiave, JSON.stringify(valore)); } catch (e) { /* ignora */ }
  }

  function progresso() {
    var p = leggi(KEYS.progresso, null);
    if (!p || typeof p !== 'object') p = {};
    p.capitoli = p.capitoli || {};
    p.esercitazioni = p.esercitazioni || {};
    return p;
  }
  function preferenze() {
    var p = leggi(PREF, null);
    return p && typeof p === 'object' ? p : {};
  }

  return {
    progresso: progresso,
    capitoloCompletato: function (id) { return !!progresso().capitoli[id]; },
    segnaCapitolo: function (id) {
      var p = progresso();
      if (p.capitoli[id]) return false;
      p.capitoli[id] = true;
      scrivi(KEYS.progresso, p);
      return true;
    },
    esercitazioneSvolta: function (id) { return !!progresso().esercitazioni[id]; },
    segnaEsercitazione: function (id) {
      var p = progresso();
      p.esercitazioni[id] = true;
      scrivi(KEYS.progresso, p);
    },
    ultimo: function () { return leggi(KEYS.ultimo, null); },
    salvaUltimo: function (id) { scrivi(KEYS.ultimo, id); },
    esame: function () {
      var e = leggi(KEYS.esame, null);
      return e && typeof e === 'object' ? e : { ultimo: null, migliore: null, tentativi: 0 };
    },
    salvaEsame: function (punteggio) {
      var e = this.esame();
      e.ultimo = punteggio;
      e.migliore = e.migliore === null ? punteggio : Math.max(e.migliore, punteggio);
      e.tentativi = (e.tentativi || 0) + 1;
      scrivi(KEYS.esame, e);
      return e;
    },
    /* preferenze: non vengono cancellate da "Azzera i progressi" */
    pref: function (k, predefinito) { var p = preferenze(); return k in p ? p[k] : predefinito; },
    salvaPref: function (k, v) { var p = preferenze(); p[k] = v; scrivi(PREF, p); },
    azzera: function () {
      Object.keys(KEYS).forEach(function (k) { delete memoria[KEYS[k]]; });
      try {
        Object.keys(KEYS).forEach(function (k) { window.localStorage.removeItem(KEYS[k]); });
      } catch (e) { /* ignora */ }
    }
  };
})();
