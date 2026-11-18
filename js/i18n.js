/* i18n.js — gestione delle lingue.
   Ogni cartella data/<codice>/ registra le sue parti con DCS.i18n.add(codice, parte, valore):
   'ui' (testi dell'interfaccia), 'capitoli', 'domande', 'glossario'.
   DCS.t('chiave', { var: valore }) restituisce il testo nella lingua attiva
   (se manca, quello italiano; se manca anche quello, la chiave stessa). */
window.DCS = window.DCS || {};

DCS.i18n = (function () {
  var ORDINE = ['it', 'en', 'es', 'fr', 'de'];
  var dati = {};
  var corrente = 'it';

  function add(codice, parte, valore) {
    dati[codice] = dati[codice] || {};
    dati[codice][parte] = valore;
  }
  function disponibile(codice) {
    var d = dati[codice];
    return !!(d && d.ui && d.capitoli && d.domande && d.glossario);
  }
  function usa(codice) {
    if (!disponibile(codice)) codice = 'it';
    corrente = codice;
    var d = dati[codice];
    DCS.capitoli = d.capitoli;
    DCS.domande = d.domande;
    DCS.glossario = d.glossario;
    document.documentElement.lang = codice;
    return codice;
  }
  function t(chiave, vars) {
    var s = dati[corrente] && dati[corrente].ui ? dati[corrente].ui[chiave] : undefined;
    if (s === undefined && dati.it && dati.it.ui) s = dati.it.ui[chiave];
    if (s === undefined) return chiave;
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return k in vars ? vars[k] : m; });
    return s;
  }
  /* traduce gli elementi statici di index.html marcati con data-i18n / data-i18n-aria */
  function applicaStatici(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    (root || document).querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  }
  function lingue() {
    return ORDINE.filter(disponibile).map(function (c) { return { codice: c, nome: dati[c].ui.nomeLingua }; });
  }

  return { add: add, usa: usa, t: t, applicaStatici: applicaStatici, lingue: lingue, corrente: function () { return corrente; } };
})();

DCS.t = DCS.i18n.t;
