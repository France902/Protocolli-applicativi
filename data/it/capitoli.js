/* data/it/capitoli.js — testi dei capitoli del Modulo 1 (italiano).
   Ogni capitolo: id, titolo, breve (per la mappa), sommario, esercitazione, html.
   Ogni <section class="block"> diventa una fascia a tutta larghezza.
   <div data-ex="e1"> inserisce un'esercitazione; <div data-extra="url"> un elemento facoltativo.
   Fonti di verifica: vedi pagina Crediti. */
DCS.i18n.add('it', 'capitoli', [
  /* ===================================================== 1.1 */
  {
    id: '1.1', titolo: 'Introduzione', breve: 'Introduzione', esercitazione: null,
    sommario: 'Internet e web non sono sinonimi. Prima di analizzare il percorso di una pagina, è necessario definire con precisione i termini.',
    html: `
<section class="block">
  <h2>Internet e web</h2>
  <p><span class="term">Internet</span> è la <b>rete di reti</b>: milioni di reti eterogenee (domestiche, scolastiche, aziendali, dei provider) interconnesse e in grado di scambiarsi dati grazie agli stessi protocolli, quelli della famiglia TCP/IP.</p>
  <p>Il <span class="term">web</span> è <b>uno dei servizi</b> che operano su Internet: un insieme di pagine collegate da link, che il browser richiede e visualizza. Non è l'unico servizio: sulla stessa rete viaggiano anche la posta elettronica, il trasferimento di file, le videochiamate e i giochi online.</p>
  <p>Un esempio: l'invio di un'email da un'applicazione di posta utilizza Internet, ma non il web. L'apertura di un sito li utilizza entrambi: il web come servizio, Internet come infrastruttura di trasporto.</p>
</section>

<section class="block">
  <h2>Cenni storici</h2>
  <p>Il web nasce al <b>CERN</b> di Ginevra. Nel 1989 <b>Tim Berners-Lee</b> propone un sistema per la condivisione di documenti tra ricercatori; tra il 1990 e il 1991 realizza il primo server web, il primo browser e il primo sito, reso accessibile anche all'esterno del CERN nel 1991.</p>
  <p>Il progetto si fonda su tre elementi, ripresi nel corso:</p>
  <ul>
    <li><b>HTML</b> — il linguaggio con cui si descrive una pagina;</li>
    <li><b>URL</b> — l'indirizzo che identifica ogni risorsa (capitolo 1.4);</li>
    <li><b>HTTP</b> — il protocollo con cui il browser richiede le pagine e il server le invia (capitolo 1.5).</li>
  </ul>
  <p>Il web poggia su un'infrastruttura più antica. Nel 1969 la rete <b>ARPANET</b> collega i primi quattro nodi universitari negli Stati Uniti; il 1° gennaio 1983 adotta ufficialmente i protocolli <b>TCP/IP</b>, data considerata la nascita dell'Internet moderna. Nel 1994 Berners-Lee fonda il <b>W3C</b> (<i>World Wide Web Consortium</i>), l'organizzazione che ancora oggi sviluppa gli standard del web.</p>
</section>

<section class="block">
  <h2>Le due domande del corso</h2>
  <p><b>1. Quali passaggi separano la richiesta di una pagina web dalla sua visualizzazione?</b><br>
  In sintesi: il browser analizza l'URL, richiede al <b>DNS</b> l'indirizzo IP del server, apre una connessione <b>TCP</b>, la protegge con <b>TLS</b>, invia una richiesta <b>HTTP</b>, riceve la risposta e disegna la pagina. A ogni passaggio è dedicato un capitolo.</p>
  <p><b>2. In che modo un messaggio di posta elettronica raggiunge il destinatario?</b><br>
  Il programma di posta consegna il messaggio al proprio server con <b>SMTP</b>; il server interroga il <b>DNS</b> per individuare il server che riceve la posta del dominio di destinazione e gli consegna il messaggio, sempre con SMTP; il destinatario lo scarica con <b>POP3</b>.</p>
</section>

<section class="block">
  <h2>Mappa del corso</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Cap.</th><th>Argomento</th><th>Domanda di riferimento</th></tr></thead>
    <tbody>
      <tr><td>1.2</td><td>Client e server: chi richiede e chi risponde</td><td>Entrambe</td></tr>
      <tr><td>1.3</td><td>Lo stack TCP/IP, TCP e UDP, le porte</td><td>Entrambe</td></tr>
      <tr><td>1.4</td><td>La struttura di un URL</td><td>Pagina web</td></tr>
      <tr><td>1.5</td><td>HTTP: richieste, risposte, codici di stato</td><td>Pagina web</td></tr>
      <tr><td>1.6</td><td>DNS: dal nome all'indirizzo IP</td><td>Entrambe</td></tr>
      <tr><td>1.7</td><td>HTTPS e TLS: la connessione protetta</td><td>Pagina web</td></tr>
      <tr><td>1.8</td><td>SMTP e POP3: il percorso di un'email</td><td>Posta elettronica</td></tr>
    </tbody>
  </table></div>
</section>`
  },

  /* ===================================================== 1.2 */
  {
    id: '1.2', titolo: 'Modello client-server', breve: 'Client-server', esercitazione: 'e1',
    sommario: 'La maggior parte dei servizi di Internet segue lo stesso schema: un programma formula una richiesta, un altro la soddisfa.',
    html: `
<section class="block">
  <h2>Due ruoli</h2>
  <p>Il <span class="term">client</span> è il programma che <b>richiede</b> un servizio: il browser che vuole una pagina, l'applicazione di posta che vuole i nuovi messaggi.</p>
  <p>Il <span class="term">server</span> è il programma che <b>risponde</b> e mette a disposizione le risorse: pagine, file, caselle di posta, risposte DNS. Resta in attesa di richieste su una porta nota.</p>
  <p>Client e server sono <b>ruoli</b>, non tipi di macchina. Lo stesso computer agisce da client quando apre un sito e da server se vi è installato un server web. Un server di posta, quando consegna un messaggio a un altro server, in quel momento svolge il ruolo di client.</p>
  <p>Non tutti i servizi seguono questo schema. Nel modello <span class="term">peer-to-peer</span> (P2P) ogni nodo è contemporaneamente client e server: nella condivisione di file con BitTorrent, ad esempio, ciascun computer scarica parti del file dagli altri e nello stesso tempo le mette a disposizione. Il web e la posta elettronica sono invece servizi client-server.</p>
</section>

<section class="block">
  <h2>Regole di funzionamento</h2>
  <ul>
    <li><b>La comunicazione è avviata dal client.</b> Il server non invia nulla senza una richiesta.</li>
    <li><b>Un server serve molti client</b>, anche contemporaneamente: un sito molto visitato risponde a migliaia di browser al secondo.</li>
    <li>Ogni scambio segue lo stesso ciclo: <b>richiesta → elaborazione → risposta</b>.</li>
  </ul>
  <p>Le porte rendono possibile il dialogo: il server ascolta su una <b>porta nota</b> (80 per HTTP), mentre il client usa una <b>porta effimera</b> assegnata dal sistema operativo, nell'intervallo raccomandato dall'IANA da 49152 a 65535. Per questo lo stesso browser può mantenere aperte decine di schede verso server diversi senza confondere le risposte.</p>
</section>

<section class="block">
  <h2>Il ciclo in un esempio</h2>
  <p>Si apre <code>http://www.esempio.it/index.html</code>. Il browser (client) invia al server una <b>richiesta</b>; il server la <b>elabora</b> (individua il file <code>index.html</code>) e invia la <b>risposta</b> con il contenuto. In forma semplificata, i due messaggi HTTP sono i seguenti:</p>
<pre class="msg"><span class="c"># richiesta: dal client al server</span>
<span class="k">GET</span> /index.html HTTP/1.1
Host: www.esempio.it

<span class="c"># risposta: dal server al client</span>
HTTP/1.1 <span class="s">200 OK</span>
Content-Type: text/html

&lt;html&gt;…&lt;/html&gt;</pre>
  <p>Il capitolo 1.5 ne analizza il significato riga per riga.</p>
</section>

<div data-ex="e1"></div>`
  },

  /* ===================================================== 1.3 */
  {
    id: '1.3', titolo: 'Livello applicativo e stack TCP/IP', breve: 'Stack TCP/IP', esercitazione: 'e2',
    sommario: 'Un messaggio HTTP non viaggia isolato: attraversa una pila di livelli, ciascuno con un compito definito.',
    html: `
<section class="block">
  <h2>I quattro livelli del modello TCP/IP</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Livello</th><th>Compito</th><th>Esempi</th></tr></thead>
    <tbody>
      <tr><td><b>Applicazione</b></td><td>Servizi utilizzati dai programmi</td><td>HTTP, DNS, SMTP, POP3</td></tr>
      <tr><td><b>Trasporto</b></td><td>Comunicazione tra processi, tramite le porte</td><td>TCP, UDP</td></tr>
      <tr><td><b>Internet</b></td><td>Indirizzamento e instradamento tra reti</td><td>IP</td></tr>
      <tr><td><b>Accesso alla rete</b></td><td>Trasmissione sul mezzo fisico locale</td><td>Ethernet, Wi-Fi</td></tr>
    </tbody>
  </table></div>
  <p>Il modello <b>ISO/OSI</b> suddivide lo stesso lavoro in <b>sette</b> livelli: fisico, collegamento, rete, trasporto, sessione, presentazione, applicazione. I tre livelli superiori di OSI (sessione, presentazione, applicazione) corrispondono al solo livello applicazione di TCP/IP; i due inferiori (fisico e collegamento) all'accesso alla rete.</p>
  <p>Ogni livello usa un proprio sistema di indirizzi. Al livello internet l'<b>indirizzo IP</b> identifica l'host di destinazione lungo tutto il percorso; al livello di accesso alla rete l'<b>indirizzo MAC</b> identifica la scheda di rete sul singolo tratto locale e cambia a ogni router attraversato. I <b>router</b> operano fino al livello internet: leggono l'indirizzo IP di destinazione e scelgono verso quale rete inoltrare il pacchetto.</p>
</section>

<section class="block">
  <h2>Il livello applicativo</h2>
  <p>È il livello più vicino all'utente. Vi operano i protocolli trattati nel corso, <b>HTTP, DNS, SMTP e POP3</b>, e i programmi che li utilizzano: browser, server web, client di posta. Ogni protocollo applicativo definisce quali messaggi esistono, quale struttura hanno e in quale ordine vengono scambiati.</p>
</section>

<section class="block">
  <h2>Incapsulamento</h2>
  <p>Quando il browser invia una richiesta HTTP, il messaggio scende lungo la pila e <b>ogni livello aggiunge la propria intestazione</b> ai dati ricevuti dal livello superiore:</p>
<pre class="msg">[ Ethernet | IP | TCP | <span class="k">GET /index.html HTTP/1.1 …</span> ]
  accesso    rete trasp.  applicazione</pre>
  <p>In ricezione il server compie il percorso inverso: ogni livello rimuove la propria intestazione e passa il resto al livello superiore, finché il server web riceve la richiesta HTTP nella forma originale.</p>
</section>

<section class="block">
  <h2>TCP e UDP</h2>
  <p><span class="term">TCP</span> è <b>affidabile e orientato alla connessione</b>: prima di trasmettere apre una connessione (handshake a tre vie: SYN, SYN-ACK, ACK), numera i segmenti, li riordina e ritrasmette quelli persi. È utilizzato da HTTP (fino alla versione 2), SMTP e POP3, dove nessun byte può andare perso.</p>
  <p><span class="term">UDP</span> è <b>leggero e privo di connessione</b>: invia ogni messaggio in modo indipendente, senza conferme né ritrasmissioni, ed è quindi più rapido da avviare. È utilizzato dal <b>DNS</b> nella maggior parte dei casi, perché una domanda e una risposta occupano di norma un solo pacchetto.</p>
</section>

<section class="block">
  <h2>Porte: l'indirizzo IP individua la macchina, la porta il servizio</h2>
  <p>Su uno stesso server possono essere attivi contemporaneamente un server web, uno di posta e uno DNS. L'indirizzo IP conduce il pacchetto alla macchina corretta; il <span class="term">numero di porta</span> (da 0 a 65535) lo consegna al programma corretto.</p>
  <p>Le porte da 0 a 1023 sono le <b>well-known ports</b>, assegnate dall'IANA ai servizi più diffusi. Il client utilizza invece una porta temporanea scelta dal sistema operativo.</p>
  <p>Altri due servizi del livello applicativo, in breve: <b>FTP</b> consente il trasferimento di file e usa la porta <b>21</b> per i comandi; <b>SSH</b> consente l'accesso remoto cifrato a un'altra macchina e usa la porta <b>22</b>. Non rientrano nel programma, ma compaiono nell'esercitazione E2.</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Servizio</th><th>Porta</th><th>Trasporto</th></tr></thead>
    <tbody>
      <tr><td>HTTP</td><td class="mono">80</td><td>TCP</td></tr>
      <tr><td>HTTPS</td><td class="mono">443</td><td>TCP</td></tr>
      <tr><td>DNS</td><td class="mono">53</td><td>UDP (TCP per risposte di grandi dimensioni)</td></tr>
      <tr><td>SMTP</td><td class="mono">25 tra server, 587 invio dal client</td><td>TCP</td></tr>
      <tr><td>POP3</td><td class="mono">110 (995 con TLS)</td><td>TCP</td></tr>
      <tr><td>FTP (comandi)</td><td class="mono">21</td><td>TCP</td></tr>
      <tr><td>SSH</td><td class="mono">22</td><td>TCP</td></tr>
    </tbody>
  </table></div>
  <p>La coppia formata da indirizzo IP e porta si chiama <span class="term">socket</span>. Una connessione TCP è identificata dai socket delle due estremità: ad esempio <code>192.0.2.5:51234 → 203.0.113.10:443</code> indica un browser che, dalla porta effimera 51234, comunica con un server HTTPS.</p>
</section>

<div data-ex="e2"></div>`
  },

  /* ===================================================== 1.4 */
  {
    id: '1.4', titolo: 'URL', breve: 'URL', esercitazione: null,
    sommario: 'Ogni risorsa del web possiede un indirizzo. La sua lettura anticipa gran parte delle operazioni che il browser compirà.',
    html: `
<section class="block">
  <h2>Struttura di un URL</h2>
  <p>Un <span class="term">URL</span> (<i>Uniform Resource Locator</i>) indica dove si trova una risorsa e come raggiungerla. Si consideri il seguente:</p>
<pre class="msg"><span class="k">https</span>://<span class="s">www.esempio.it</span>:443/corso/1.4?lingua=it#esempio</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Parte</th><th>Nell'esempio</th><th>Funzione</th></tr></thead>
    <tbody>
      <tr><td><b>Schema</b></td><td class="mono">https</td><td>Il protocollo da utilizzare</td></tr>
      <tr><td><b>Host</b></td><td class="mono">www.esempio.it</td><td>Il nome del server</td></tr>
      <tr><td><b>Porta</b></td><td class="mono">:443</td><td>Facoltativa: se assente si usa quella predefinita dello schema (80 per http, 443 per https)</td></tr>
      <tr><td><b>Percorso</b></td><td class="mono">/corso/1.4</td><td>La risorsa richiesta sul server</td></tr>
      <tr><td><b>Query</b></td><td class="mono">?lingua=it</td><td>Parametri in coppie nome=valore, separate da &amp;</td></tr>
      <tr><td><b>Frammento</b></td><td class="mono">#esempio</td><td>Un punto preciso all'interno della pagina</td></tr>
    </tbody>
  </table></div>
  <p>In un URL è ammesso solo un insieme limitato di caratteri. Gli altri, come lo spazio o le lettere accentate, vengono convertiti con la <b>codifica percentuale</b>: ogni byte diventa <code>%</code> seguito da due cifre esadecimali. Lo spazio, ad esempio, diventa <code>%20</code>: il percorso <code>/le mie foto</code> si scrive <code>/le%20mie%20foto</code>.</p>
</section>

<section class="block note">
  <p><strong>Nota</strong> Tutto ciò che segue il carattere <code>#</code> resta nel browser e <b>non viene inviato al server</b>. Il frammento serve al browser per scorrere fino a una sezione o, come in questo sito, per cambiare capitolo senza ricaricare la pagina.</p>
</section>

<section class="block">
  <h2>Struttura di un nome di dominio</h2>
  <p>Un nome come <code>www.esempio.it</code> si legge <b>da destra verso sinistra</b>, dal generale al particolare:</p>
  <ul>
    <li><b>radice</b> — il punto finale, normalmente sottinteso: <code>www.esempio.it<b>.</b></code></li>
    <li><b>dominio di primo livello (TLD)</b> — <code>it</code> (oppure <code>com</code>, <code>org</code>…)</li>
    <li><b>dominio di secondo livello</b> — <code>esempio</code>, quello registrato da un'organizzazione</li>
    <li><b>sottodomini</b> — <code>www</code>, <code>posta</code>, <code>corsi</code>…, definiti dal titolare del dominio</li>
  </ul>
  <p>Il DNS percorre la stessa gerarchia per ottenere l'indirizzo IP (capitolo 1.6).</p>
</section>

<section class="block">
  <h2>Corrispondenza tra parti dell'URL e passaggi</h2>
  <ul>
    <li>L'<b>host</b> viene inviato al <b>DNS</b>, che lo traduce in un indirizzo IP.</li>
    <li><b>Schema e porta</b> determinano la <b>connessione</b>: a quale porta collegarsi e se è necessario TLS.</li>
    <li><b>Percorso e query</b> compaiono nella <b>richiesta HTTP</b>: <code>GET /corso/1.4?lingua=it HTTP/1.1</code>.</li>
    <li>Il <b>frammento</b> resta nel browser.</li>
  </ul>
  <p>Un URL può anche essere <b>relativo</b>: in un link come <code>&lt;a href="contatti.html"&gt;</code> mancano schema e host, che il browser ricava dall'indirizzo della pagina corrente. Gli URL <b>assoluti</b>, completi di tutte le parti, servono invece per collegarsi ad altri siti.</p>
</section>

<div data-extra="url"></div>`
  },

  /* ===================================================== 1.5 */
  {
    id: '1.5', titolo: 'HTTP', breve: 'HTTP', esercitazione: 'e3',
    sommario: 'HTTP è il protocollo con cui browser e server comunicano: messaggi testuali con una struttura fissa e un numero limitato di metodi.',
    html: `
<section class="block">
  <h2>Richiesta, risposta e assenza di stato</h2>
  <p><span class="term">HTTP</span> (<i>HyperText Transfer Protocol</i>) segue il modello <b>richiesta-risposta</b>: il client invia una richiesta, il server risponde. Utilizza per impostazione predefinita la porta <b>80</b>.</p>
  <p>È un protocollo <b>senza stato</b> (<i>stateless</i>): ogni richiesta è indipendente e il server, di per sé, non conserva memoria delle precedenti. Per riconoscere un utente (carrello, autenticazione) si utilizzano i <span class="term">cookie</span>: il server ne invia uno con l'header <code>Set-Cookie</code> e il browser lo ritrasmette nelle richieste successive con l'header <code>Cookie</code>.</p>
</section>

<section class="block">
  <h2>Struttura di una richiesta</h2>
<pre class="msg"><span class="k">GET /index.html HTTP/1.1</span>      <span class="c">← riga di richiesta: metodo, percorso, versione</span>
Host: www.esempio.it          <span class="c">← header (obbligatorio in HTTP/1.1)</span>
User-Agent: Mozilla/5.0       <span class="c">← header</span>
Accept: text/html             <span class="c">← header</span>
                              <span class="c">← riga vuota: fine degli header</span>
                              <span class="c">  (segue l'eventuale corpo, ad es. i dati di un form)</span></pre>
  <p>Ogni <b>header</b> è una riga nella forma <code>Nome: valore</code>. La <b>riga vuota</b> è obbligatoria: segnala al server la fine degli header.</p>
</section>

<section class="block">
  <h2>I metodi principali</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Metodo</th><th>Operazione richiesta</th></tr></thead>
    <tbody>
      <tr><td class="mono">GET</td><td>Ottenere una risorsa</td></tr>
      <tr><td class="mono">POST</td><td>Inviare dati da elaborare (un form, un commento)</td></tr>
      <tr><td class="mono">PUT</td><td>Creare o sostituire una risorsa a un determinato percorso</td></tr>
      <tr><td class="mono">DELETE</td><td>Eliminare una risorsa</td></tr>
      <tr><td class="mono">HEAD</td><td>Come GET, ma il server restituisce solo gli header, senza corpo</td></tr>
    </tbody>
  </table></div>
  <p>Un metodo è <b>sicuro</b> se non modifica lo stato del server (GET, HEAD). È <b>idempotente</b> se ripeterlo più volte produce lo stesso effetto di un'unica esecuzione (GET, HEAD, PUT, DELETE). POST non è né sicuro né idempotente: per questo il browser chiede conferma prima di reinviare un form.</p>
</section>

<section class="block">
  <h2>Struttura di una risposta</h2>
<pre class="msg"><span class="k">HTTP/1.1 200 OK</span>               <span class="c">← riga di stato: versione, codice, messaggio</span>
Date: Mon, 16 Nov 2026 10:00:00 GMT
Server: nginx
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
                              <span class="c">← riga vuota</span>
&lt;!DOCTYPE html&gt;&lt;html&gt;…        <span class="c">← corpo: la pagina</span></pre>
  <p>Alcuni header della risposta sono fondamentali. <code>Content-Type</code> indica il <span class="term">tipo MIME</span> del corpo, cioè come interpretarlo: <code>text/html</code> per una pagina, <code>text/css</code> per un foglio di stile, <code>image/png</code> per un'immagine, <code>application/json</code> per dati strutturati. <code>Content-Length</code> indica la lunghezza del corpo in byte. Con un codice 3xx il server aggiunge l'header <code>Location</code>, che contiene il nuovo indirizzo; con <code>Cache-Control</code> stabilisce per quanto tempo il browser può riutilizzare la copia ricevuta.</p>
</section>

<section class="block">
  <h2>Codici di stato</h2>
  <p>La prima cifra indica la <b>classe</b>:</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Classe</th><th>Significato</th><th>Esempi</th></tr></thead>
    <tbody>
      <tr><td class="mono">1xx</td><td>Informativo</td><td>100 Continue</td></tr>
      <tr><td class="mono">2xx</td><td>Successo</td><td><b>200 OK</b></td></tr>
      <tr><td class="mono">3xx</td><td>Reindirizzamento</td><td><b>301</b> Moved Permanently (la risorsa è stata spostata); <b>304</b> Not Modified (la copia in cache è ancora valida)</td></tr>
      <tr><td class="mono">4xx</td><td>Errore del client</td><td><b>400</b> Bad Request (richiesta malformata); <b>403</b> Forbidden (accesso negato); <b>404</b> Not Found (risorsa inesistente)</td></tr>
      <tr><td class="mono">5xx</td><td>Errore del server</td><td><b>500</b> Internal Server Error; <b>503</b> Service Unavailable (server sovraccarico o in manutenzione)</td></tr>
    </tbody>
  </table></div>
</section>

<div data-extra="http"></div>

<section class="block">
  <h2>Dopo la risposta</h2>
  <p>La risposta contiene soltanto l'HTML. Analizzandolo, il browser individua le <b>risorse aggiuntive</b> necessarie: fogli di stile CSS, immagini, script. Per ciascuna invia <b>un'ulteriore richiesta HTTP</b>. Ottenuto il necessario, compone la pagina e la <b>disegna</b> sullo schermo. Una pagina tipica richiede decine di richieste.</p>
</section>

<section class="block">
  <h2>Le versioni</h2>
  <ul>
    <li><b>HTTP/1.1</b> — messaggi <b>testuali</b>, leggibili come quelli riportati sopra.</li>
    <li><b>HTTP/2</b> — messaggi <b>binari</b> e più richieste in parallelo sulla stessa connessione TCP.</li>
    <li><b>HTTP/3</b> — anch'esso binario, ma trasportato da <b>QUIC</b>, un protocollo basato su UDP.</li>
  </ul>
  <p>La <b>semantica</b> è comune a tutte le versioni: stessi metodi, stessi header, stessi codici di stato. Cambia soltanto il formato in cui i messaggi vengono trasmessi.</p>
  <p>Già HTTP/1.1 introduce le <b>connessioni persistenti</b>: la stessa connessione TCP viene riutilizzata per più richieste consecutive, evitando di ripetere ogni volta l'handshake. HTTP/2 consente inoltre di trasmettere più risposte contemporaneamente sulla stessa connessione.</p>
</section>

<div data-ex="e3"></div>`
  },

  /* ===================================================== 1.6 */
  {
    id: '1.6', titolo: 'DNS', breve: 'DNS', esercitazione: null,
    sommario: 'Gli utenti utilizzano nomi, la rete indirizzi numerici. Il DNS è il sistema distribuito che li mette in corrispondenza.',
    html: `
<section class="block">
  <h2>Funzione</h2>
  <p>Il <span class="term">DNS</span> (<i>Domain Name System</i>) traduce un nome leggibile, come <code>www.esempio.it</code>, nell'<b>indirizzo IP</b> del server, come <code>203.0.113.10</code>. È il primo passaggio di ogni pagina aperta e di ogni email inviata: senza indirizzo IP non è possibile aprire alcuna connessione.</p>
</section>

<section class="block">
  <h2>Una gerarchia di server</h2>
  <p>Nessun server conosce tutti i nomi. Il lavoro è distribuito secondo la struttura del nome, letto da destra verso sinistra:</p>
  <ul>
    <li><b>Server radice</b> (<i>root</i>) — non conoscono gli indirizzi dei siti, ma sanno quali server gestiscono ciascun TLD.</li>
    <li><b>Server dei TLD</b> — ad esempio quelli di <code>.it</code>: sanno quali server sono autoritativi per <code>esempio.it</code>.</li>
    <li><b>Server autoritativi</b> — quelli del dominio: conoscono effettivamente i record di <code>esempio.it</code> e forniscono la risposta definitiva.</li>
  </ul>
  <p>I server radice sono identificati da tredici nomi, da <code>a.root-servers.net</code> a <code>m.root-servers.net</code>, ma ciascuno è replicato in molte copie distribuite nel mondo: grazie a una tecnica di instradamento chiamata <i>anycast</i>, la richiesta raggiunge automaticamente la copia più vicina.</p>
</section>

<section class="block">
  <h2>Il ruolo del resolver</h2>
  <p>Il computer dell'utente non interroga direttamente i server radice, ma si rivolge a un <span class="term">resolver ricorsivo</span>, di norma quello del provider o uno configurato nel sistema. Il resolver interroga i server per conto del client e gli restituisce soltanto la risposta finale.</p>
  <h3>Ordine di ricerca</h3>
  <ol>
    <li><b>Cache del browser</b> — il nome è stato risolto di recente?</li>
    <li><b>Cache del sistema operativo</b> e file <code>hosts</code>.</li>
    <li><b>Resolver</b> — se dispone della risposta in cache, la restituisce immediatamente.</li>
    <li>In caso contrario il resolver interroga in sequenza: <b>server radice → server del TLD → server autoritativo</b>.</li>
  </ol>
  <p>La risposta viene quindi memorizzata in cache a ogni livello, così che la richiesta successiva sia quasi istantanea.</p>
  <p>Si distinguono quindi due tipi di interrogazione. Quella del client verso il resolver è <b>ricorsiva</b>: il client chiede la risposta definitiva. Quelle del resolver verso radice, TLD e server autoritativo sono <b>iterative</b>: ogni server risponde con ciò che sa, spesso un rimando al server successivo.</p>
</section>

<div data-extra="dns"></div>

<section class="block">
  <h2>I record principali</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Tipo</th><th>Contenuto</th><th>Esempio</th></tr></thead>
    <tbody>
      <tr><td class="mono">A</td><td>Un indirizzo IPv4</td><td class="mono">www.esempio.it → 203.0.113.10</td></tr>
      <tr><td class="mono">AAAA</td><td>Un indirizzo IPv6</td><td class="mono">www.esempio.it → 2001:db8::1</td></tr>
      <tr><td class="mono">CNAME</td><td>Un alias verso un altro nome</td><td class="mono">blog.esempio.it → www.esempio.it</td></tr>
      <tr><td class="mono">NS</td><td>I name server autoritativi del dominio</td><td class="mono">esempio.it → ns1.esempio.it</td></tr>
      <tr><td class="mono">MX</td><td>Il server che riceve la posta del dominio, con una priorità</td><td class="mono">esempio.it → 10 posta.esempio.it</td></tr>
    </tbody>
  </table></div>
  <p>Ogni record ha un <span class="term">TTL</span> (<i>Time To Live</i>): il numero di secondi per cui può restare in cache. Scaduto il TTL, il dato deve essere richiesto nuovamente.</p>
</section>

<section class="block">
  <h2>Porta e trasporto</h2>
  <p>Il DNS utilizza la porta <b>53</b>, di norma su <b>UDP</b>: una domanda, una risposta, nessuna connessione da aprire. Ricorre a <b>TCP</b> quando la risposta supera le dimensioni di un pacchetto UDP e per i trasferimenti di zona tra server.</p>
</section>`
  },

  /* ===================================================== 1.7 */
  {
    id: '1.7', titolo: 'HTTPS e TLS', breve: 'HTTPS e TLS', esercitazione: null,
    sommario: 'HTTP trasmette in chiaro. TLS costruisce attorno alla comunicazione un canale cifrato e autenticato, segnalato dal lucchetto nel browser.',
    html: `
<section class="block">
  <h2>I rischi di HTTP in chiaro</h2>
  <ul>
    <li><b>Intercettazione</b> — chi si trova sulla stessa rete (il Wi-Fi di un locale pubblico, un router) può leggere password e dati.</li>
    <li><b>Alterazione</b> — un intermediario può modificare la pagina o inserirvi contenuti.</li>
    <li><b>Falsa identità</b> — non è possibile verificare che dall'altra parte vi sia effettivamente il server desiderato.</li>
  </ul>
</section>

<section class="block">
  <h2>Le garanzie di TLS</h2>
  <p><span class="term">TLS</span> (<i>Transport Layer Security</i>, successore di SSL) risponde ai tre rischi con tre garanzie:</p>
  <ul>
    <li><b>Riservatezza</b> — i dati risultano illeggibili a chi li intercetta;</li>
    <li><b>Integrità</b> — qualsiasi modifica durante il transito viene rilevata;</li>
    <li><b>Autenticazione del server</b> — il server dimostra la propria identità mediante un certificato.</li>
  </ul>
  <p><span class="term">HTTPS</span> non è un nuovo protocollo: è <b>HTTP trasportato all'interno di una connessione TLS</b>, per impostazione predefinita sulla porta <b>443</b>. I messaggi HTTP sono gli stessi del capitolo 1.5, ma viaggiano cifrati.</p>
</section>

<section class="block">
  <h2>Certificati e autorità di certificazione</h2>
  <p>Il <b>certificato</b> è un documento digitale che associa un nome di dominio a una chiave pubblica. È firmato da un'<b>autorità di certificazione</b> (<i>CA</i>), un ente ritenuto attendibile da browser e sistemi operativi, che ne includono un elenco preinstallato.</p>
  <p>Alla ricezione di un certificato, il browser verifica che sia firmato da una CA attendibile, che non sia scaduto e che il nome corrisponda al sito richiesto. In caso di anomalie mostra un avviso a pagina intera.</p>
  <p>I certificati hanno una validità limitata e vanno rinnovati periodicamente. Quelli rilasciati gratuitamente e in modo automatico da <b>Let's Encrypt</b>, ad esempio, durano pochi mesi: anche per questo oggi la grande maggioranza dei siti utilizza HTTPS.</p>
</section>

<section class="block">
  <h2>L'handshake, in forma semplificata</h2>
  <ol>
    <li><b>Proposta del client</b>: versioni di TLS e algoritmi supportati, insieme a un proprio contributo per la chiave.</li>
    <li><b>Risposta del server</b>: sceglie gli algoritmi, invia il proprio contributo e il <b>certificato</b>.</li>
    <li>Il client verifica il certificato. A partire dai contributi scambiati, <b>entrambi calcolano la stessa chiave di sessione</b>, senza che questa transiti mai sulla rete.</li>
    <li>Da questo momento la comunicazione è cifrata con <b>crittografia simmetrica</b>, molto più efficiente: entrambe le parti usano la stessa chiave di sessione.</li>
  </ol>
  <p>La crittografia asimmetrica (chiave pubblica e privata) interviene quindi solo nella fase iniziale, per l'autenticazione e la negoziazione della chiave.</p>
  <p>Con <b>TLS 1.3</b>, la versione attuale, l'handshake richiede un solo scambio di andata e ritorno prima che il client possa inviare dati cifrati; TLS 1.2 ne richiedeva due. Le versioni precedenti, SSL, TLS 1.0 e TLS 1.1, sono considerate insicure e non sono più accettate dai browser.</p>
</section>

<section class="block">
  <h2>Posizione di TLS nello stack</h2>
<pre class="msg">  HTTP        <span class="c">← applicazione</span>
  <span class="k">TLS</span>         <span class="c">← cifra i dati provenienti dal livello superiore</span>
  TCP         <span class="c">← trasporto</span>
  IP</pre>
</section>

<section class="block note">
  <p><strong>Attenzione</strong> Il lucchetto garantisce che il canale tra l'utente e quel server è cifrato e che il server possiede un certificato valido per quel nome. <b>Non garantisce l'affidabilità del sito</b>: anche un sito di phishing può disporre di un certificato valido per il proprio dominio. Il lucchetto attesta la riservatezza della comunicazione, non l'onestà dell'interlocutore.</p>
</section>`
  },

  /* ===================================================== 1.8 */
  {
    id: '1.8', titolo: 'SMTP e POP3', breve: 'SMTP e POP3', esercitazione: 'e4',
    sommario: 'La posta elettronica richiede due protocolli distinti: uno trasporta il messaggio verso la destinazione, l\'altro consente di prelevarlo dalla casella.',
    html: `
<section class="block">
  <h2>Gli attori</h2>
  <ul>
    <li><b>MUA</b> (<i>Mail User Agent</i>) — il programma di posta dell'utente: Thunderbird, Outlook, l'applicazione dello smartphone.</li>
    <li><b>Server di posta del mittente</b> — riceve il messaggio dal MUA e ne cura la consegna.</li>
    <li><b>Server di posta del destinatario</b> — riceve il messaggio e lo deposita nella <b>casella</b> dell'utente.</li>
  </ul>
</section>

<section class="block">
  <h2>SMTP: l'invio</h2>
  <p><span class="term">SMTP</span> (<i>Simple Mail Transfer Protocol</i>) gestisce l'<b>invio</b> della posta in due tratti:</p>
  <ul>
    <li>dal <b>client al proprio server</b>, di norma sulla porta <b>587</b> (<i>submission</i>), con autenticazione;</li>
    <li>dal <b>server del mittente al server del destinatario</b>, sulla porta <b>25</b>.</li>
  </ul>
  <h3>Individuazione del server di destinazione</h3>
  <p>Il messaggio è indirizzato a <code>luca@esempio.it</code>. Il server del mittente richiede al <b>DNS</b> il record <b>MX</b> di <code>esempio.it</code> e ottiene il nome del server di posta, ad esempio <code>posta.esempio.it</code>; ne richiede quindi il record A per ottenere l'indirizzo IP. È il collegamento con il capitolo 1.6: senza DNS la posta non potrebbe essere instradata.</p>
</section>

<section class="block">
  <h2>Una sessione SMTP</h2>
  <p>SMTP è un protocollo testuale, come HTTP/1.1. <b>C</b> indica il client, <b>S</b> il server:</p>
<pre class="msg">S: <span class="s">220</span> posta.esempio.it ESMTP pronto
C: <span class="k">EHLO</span> mail.mittente.it
S: <span class="s">250</span>-posta.esempio.it
S: <span class="s">250</span> SIZE 35882577
C: <span class="k">MAIL FROM:</span>&lt;anna@mittente.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">RCPT TO:</span>&lt;luca@esempio.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">DATA</span>
S: <span class="s">354</span> Inviare il messaggio, terminare con una riga contenente un solo punto
C: Subject: Riunione
C:
C: La riunione è confermata per domani.
C: <span class="k">.</span>
S: <span class="s">250</span> OK, messaggio accettato
C: <span class="k">QUIT</span>
S: <span class="s">221</span> Chiusura della connessione</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Codice</th><th>Significato</th></tr></thead>
    <tbody>
      <tr><td class="mono">220</td><td>Servizio pronto (messaggio iniziale del server)</td></tr>
      <tr><td class="mono">250</td><td>Comando eseguito</td></tr>
      <tr><td class="mono">354</td><td>Inizio della trasmissione del testo del messaggio</td></tr>
      <tr><td class="mono">221</td><td>Il server chiude la connessione</td></tr>
    </tbody>
  </table></div>
  <p>Occorre distinguere la <b>busta</b> dal <b>messaggio</b>. I comandi <code>MAIL FROM</code> e <code>RCPT TO</code> formano la busta, usata dai server per la consegna. Le righe <code>From:</code>, <code>To:</code>, <code>Subject:</code> e <code>Date:</code> inviate dopo <code>DATA</code> sono invece le intestazioni del messaggio (RFC 5322), quelle visualizzate dal programma di posta. Gli allegati vengono codificati come testo secondo lo standard <b>MIME</b>.</p>
</section>

<div data-extra="smtp"></div>

<section class="block">
  <h2>POP3: il prelievo</h2>
  <p><span class="term">POP3</span> (<i>Post Office Protocol, versione 3</i>) consente al destinatario di <b>scaricare</b> la posta dalla propria casella sul server. Porta <b>110</b>, oppure <b>995</b> con TLS. Il server risponde con <code>+OK</code> o <code>-ERR</code>.</p>
<pre class="msg">S: <span class="s">+OK</span> POP3 pronto
C: <span class="k">USER</span> luca
S: <span class="s">+OK</span>
C: <span class="k">PASS</span> ********
S: <span class="s">+OK</span> 2 messaggi
C: <span class="k">LIST</span>
S: <span class="s">+OK</span>
S: 1 1205
S: 2 830
S: .
C: <span class="k">RETR</span> 1          <span class="c">← scarica il messaggio 1</span>
S: <span class="s">+OK</span> …testo del messaggio…
C: <span class="k">DELE</span> 1          <span class="c">← lo contrassegna per l'eliminazione</span>
S: <span class="s">+OK</span>
C: <span class="k">QUIT</span>            <span class="c">← solo ora i messaggi contrassegnati vengono eliminati</span>
S: <span class="s">+OK</span> sessione terminata</pre>
</section>

<section class="block">
  <h2>Modello push e modello pull</h2>
  <p><b>SMTP opera in modalità push</b>: è il mittente a prendere l'iniziativa e a trasportare il messaggio verso la destinazione. <b>POP3 opera in modalità pull</b>: è il destinatario che, quando lo ritiene opportuno, preleva i messaggi. Per questo occorrono due protocolli distinti: la posta raggiunge il server anche quando il computer del destinatario è spento, e viene prelevata alla successiva connessione.</p>
</section>

<section class="block note">
  <p><strong>Approfondimento: IMAP</strong> È l'alternativa moderna a POP3 (porta 143, 993 con TLS). La differenza principale: IMAP <b>mantiene i messaggi sul server</b> e li sincronizza, rendendo la stessa casella consultabile da smartphone e computer. Non rientra nel programma del corso.</p>
</section>

<div data-ex="e4"></div>`
  }
]);
