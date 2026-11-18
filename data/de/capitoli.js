/* data/de/capitoli.js — Kapitel von Modul 1 (Deutsch). Gleiche Struktur wie data/it/capitoli.js. */
DCS.i18n.add('de', 'capitoli', [
  /* ===================================================== 1.1 */
  {
    id: '1.1', titolo: 'Einführung', breve: 'Einführung', esercitazione: null,
    sommario: 'Internet und Web sind keine Synonyme. Bevor der Weg einer Seite verfolgt wird, müssen die Begriffe genau bestimmt werden.',
    html: `
<section class="block">
  <h2>Internet und Web</h2>
  <p>Das <span class="term">Internet</span> ist das <b>Netz der Netze</b>: Millionen unterschiedlicher Netze (private, schulische, betriebliche Netze und die der Provider), die miteinander verbunden sind und dank derselben Protokolle – der TCP/IP-Familie – Daten austauschen können.</p>
  <p>Das <span class="term">Web</span> ist <b>einer der Dienste</b>, die über das Internet laufen: eine Menge über Links verbundener Seiten, die der Browser anfordert und anzeigt. Es ist nicht der einzige Dienst: Über dasselbe Netz laufen auch E-Mail, Dateiübertragung, Videotelefonie und Onlinespiele.</p>
  <p>Ein Beispiel: Wer eine E-Mail aus einem Mailprogramm versendet, nutzt das Internet, aber nicht das Web. Beim Aufruf einer Website wird beides genutzt: das Web als Dienst, das Internet als Transportinfrastruktur.</p>
</section>

<section class="block">
  <h2>Historischer Hintergrund</h2>
  <p>Das Web entstand am <b>CERN</b> in Genf. 1989 schlug <b>Tim Berners-Lee</b> ein System zum Austausch von Dokumenten zwischen Forschenden vor; zwischen 1990 und 1991 entwickelte er den ersten Webserver, den ersten Browser und die erste Website, die 1991 auch außerhalb des CERN zugänglich wurde.</p>
  <p>Das Projekt beruht auf drei Elementen, die im Kurs wieder aufgegriffen werden:</p>
  <ul>
    <li><b>HTML</b> — die Sprache, mit der eine Seite beschrieben wird;</li>
    <li><b>URL</b> — die Adresse, die jede Ressource identifiziert (Kapitel 1.4);</li>
    <li><b>HTTP</b> — das Protokoll, mit dem der Browser Seiten anfordert und der Server sie sendet (Kapitel 1.5).</li>
  </ul>
  <p>Das Web baut auf einer älteren Infrastruktur auf. 1969 verbindet das Netz <b>ARPANET</b> die ersten vier Universitätsknoten in den USA; am 1. Januar 1983 stellt es offiziell auf die Protokolle <b>TCP/IP</b> um – ein Datum, das als Geburtsstunde des modernen Internets gilt. 1994 gründet Berners-Lee das <b>W3C</b> (<i>World Wide Web Consortium</i>), die Organisation, die bis heute die Webstandards entwickelt.</p>
</section>

<section class="block">
  <h2>Die beiden Leitfragen des Kurses</h2>
  <p><b>1. Welche Schritte liegen zwischen dem Aufruf einer Webseite und ihrer Darstellung?</b><br>
  Kurz gefasst: Der Browser wertet die URL aus, fragt beim <b>DNS</b> die IP-Adresse des Servers ab, baut eine <b>TCP</b>-Verbindung auf, sichert sie mit <b>TLS</b>, sendet eine <b>HTTP</b>-Anfrage, empfängt die Antwort und stellt die Seite dar. Jedem Schritt ist ein Kapitel gewidmet.</p>
  <p><b>2. Wie gelangt eine E-Mail zu ihrem Empfänger?</b><br>
  Das Mailprogramm übergibt die Nachricht per <b>SMTP</b> an seinen Server; dieser ermittelt über das <b>DNS</b> den Server, der die Post der Zieldomain annimmt, und stellt ihm die Nachricht ebenfalls per SMTP zu; der Empfänger lädt sie per <b>POP3</b> herunter.</p>
</section>

<section class="block">
  <h2>Übersicht des Kurses</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Kap.</th><th>Thema</th><th>Bezug zur Leitfrage</th></tr></thead>
    <tbody>
      <tr><td>1.2</td><td>Client und Server: wer anfragt und wer antwortet</td><td>Beide</td></tr>
      <tr><td>1.3</td><td>Der TCP/IP-Stack, TCP und UDP, Ports</td><td>Beide</td></tr>
      <tr><td>1.4</td><td>Der Aufbau einer URL</td><td>Webseite</td></tr>
      <tr><td>1.5</td><td>HTTP: Anfragen, Antworten, Statuscodes</td><td>Webseite</td></tr>
      <tr><td>1.6</td><td>DNS: vom Namen zur IP-Adresse</td><td>Beide</td></tr>
      <tr><td>1.7</td><td>HTTPS und TLS: die geschützte Verbindung</td><td>Webseite</td></tr>
      <tr><td>1.8</td><td>SMTP und POP3: der Weg einer E-Mail</td><td>E-Mail</td></tr>
    </tbody>
  </table></div>
</section>`
  },

  /* ===================================================== 1.2 */
  {
    id: '1.2', titolo: 'Das Client-Server-Modell', breve: 'Client-Server', esercitazione: 'e1',
    sommario: 'Die meisten Internetdienste folgen demselben Muster: Ein Programm stellt eine Anfrage, ein anderes beantwortet sie.',
    html: `
<section class="block">
  <h2>Zwei Rollen</h2>
  <p>Der <span class="term">Client</span> ist das Programm, das einen Dienst <b>anfordert</b>: der Browser, der eine Seite möchte, die Mail-App, die neue Nachrichten abrufen will.</p>
  <p>Der <span class="term">Server</span> ist das Programm, das <b>antwortet</b> und Ressourcen bereitstellt: Seiten, Dateien, Postfächer, DNS-Antworten. Er wartet auf einem bekannten Port auf Anfragen.</p>
  <p>Client und Server sind <b>Rollen</b>, keine Gerätetypen. Derselbe Computer ist Client, wenn er eine Website aufruft, und Server, wenn auf ihm ein Webserver installiert ist. Ein Mailserver, der eine Nachricht an einen anderen Server übergibt, ist in diesem Moment Client.</p>
  <p>Nicht alle Dienste folgen diesem Muster. Im <span class="term">Peer-to-Peer</span>-Modell (P2P) ist jeder Knoten zugleich Client und Server: Beim Dateiaustausch mit BitTorrent etwa lädt jeder Rechner Teile einer Datei von den anderen herunter und stellt sie gleichzeitig selbst bereit. Web und E-Mail sind dagegen Client-Server-Dienste.</p>
</section>

<section class="block">
  <h2>Grundregeln</h2>
  <ul>
    <li><b>Die Kommunikation geht stets vom Client aus.</b> Der Server sendet nichts ohne Anfrage.</li>
    <li><b>Ein Server bedient viele Clients</b>, auch gleichzeitig: Eine stark besuchte Website beantwortet Tausende Browser pro Sekunde.</li>
    <li>Jeder Austausch folgt demselben Zyklus: <b>Anfrage → Verarbeitung → Antwort</b>.</li>
  </ul>
  <p>Ports ermöglichen den Dialog: Der Server lauscht auf einem <b>bekannten Port</b> (80 für HTTP), während der Client einen vom Betriebssystem zugewiesenen <b>flüchtigen Port</b> verwendet, im von der IANA empfohlenen Bereich 49152 bis 65535. Deshalb kann derselbe Browser Dutzende Tabs zu verschiedenen Servern geöffnet halten, ohne die Antworten zu verwechseln.</p>
</section>

<section class="block">
  <h2>Der Zyklus an einem Beispiel</h2>
  <p>Aufgerufen wird <code>http://www.esempio.it/index.html</code>. Der Browser (Client) sendet dem Server eine <b>Anfrage</b>; der Server <b>verarbeitet</b> sie (sucht die Datei <code>index.html</code>) und sendet die <b>Antwort</b> mit dem Inhalt. Vereinfacht sehen die beiden HTTP-Nachrichten so aus:</p>
<pre class="msg"><span class="c"># Anfrage: vom Client zum Server</span>
<span class="k">GET</span> /index.html HTTP/1.1
Host: www.esempio.it

<span class="c"># Antwort: vom Server zum Client</span>
HTTP/1.1 <span class="s">200 OK</span>
Content-Type: text/html

&lt;html&gt;…&lt;/html&gt;</pre>
  <p>Kapitel 1.5 erläutert ihre Bedeutung Zeile für Zeile.</p>
</section>

<div data-ex="e1"></div>`
  },

  /* ===================================================== 1.3 */
  {
    id: '1.3', titolo: 'Anwendungsschicht und TCP/IP-Stack', breve: 'TCP/IP-Stack', esercitazione: 'e2',
    sommario: 'Eine HTTP-Nachricht reist nicht allein: Sie durchläuft einen Stapel von Schichten, von denen jede eine klar umrissene Aufgabe hat.',
    html: `
<section class="block">
  <h2>Die vier Schichten des TCP/IP-Modells</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Schicht</th><th>Aufgabe</th><th>Beispiele</th></tr></thead>
    <tbody>
      <tr><td><b>Anwendung</b></td><td>Dienste, die von Programmen genutzt werden</td><td>HTTP, DNS, SMTP, POP3</td></tr>
      <tr><td><b>Transport</b></td><td>Kommunikation zwischen Prozessen über Ports</td><td>TCP, UDP</td></tr>
      <tr><td><b>Internet</b></td><td>Adressierung und Routing zwischen Netzen</td><td>IP</td></tr>
      <tr><td><b>Netzzugang</b></td><td>Übertragung über das lokale physische Medium</td><td>Ethernet, WLAN</td></tr>
    </tbody>
  </table></div>
  <p>Das <b>ISO/OSI</b>-Modell teilt dieselbe Arbeit auf <b>sieben</b> Schichten auf: Bitübertragung, Sicherung, Vermittlung, Transport, Sitzung, Darstellung, Anwendung. Die drei oberen OSI-Schichten (Sitzung, Darstellung, Anwendung) entsprechen der einen Anwendungsschicht von TCP/IP; die beiden unteren (Bitübertragung und Sicherung) dem Netzzugang.</p>
  <p>Jede Schicht hat ihr eigenes Adresssystem. Auf der Internetschicht identifiziert die <b>IP-Adresse</b> den Zielhost auf dem gesamten Weg; auf der Netzzugangsschicht identifiziert die <b>MAC-Adresse</b> die Netzwerkkarte auf dem jeweiligen lokalen Abschnitt und ändert sich an jedem durchlaufenen Router. <b>Router</b> arbeiten bis zur Internetschicht: Sie lesen die Ziel-IP-Adresse und entscheiden, in welches Netz das Paket weitergeleitet wird.</p>
</section>

<section class="block">
  <h2>Die Anwendungsschicht</h2>
  <p>Sie ist die Schicht, die dem Benutzer am nächsten liegt. Hier arbeiten die im Kurs behandelten Protokolle <b>HTTP, DNS, SMTP und POP3</b> sowie die Programme, die sie verwenden: Browser, Webserver, Mailclients. Jedes Anwendungsprotokoll legt fest, welche Nachrichten es gibt, wie sie aufgebaut sind und in welcher Reihenfolge sie ausgetauscht werden.</p>
</section>

<section class="block">
  <h2>Kapselung</h2>
  <p>Sendet der Browser eine HTTP-Anfrage, wandert die Nachricht den Stapel hinab, und <b>jede Schicht fügt ihren eigenen Header</b> zu den Daten der darüberliegenden Schicht hinzu:</p>
<pre class="msg">[ Ethernet | IP | TCP | <span class="k">GET /index.html HTTP/1.1 …</span> ]
  Zugang     Netz Transp. Anwendung</pre>
  <p>Beim Empfang geht der Server den umgekehrten Weg: Jede Schicht entfernt ihren Header und reicht den Rest nach oben weiter, bis der Webserver die HTTP-Anfrage in ihrer ursprünglichen Form erhält.</p>
</section>

<section class="block">
  <h2>TCP und UDP</h2>
  <p><span class="term">TCP</span> ist <b>zuverlässig und verbindungsorientiert</b>: Vor der Übertragung baut es eine Verbindung auf (Drei-Wege-Handshake: SYN, SYN-ACK, ACK), nummeriert die Segmente, bringt sie in die richtige Reihenfolge und überträgt verlorene erneut. Es wird von HTTP (bis Version 2), SMTP und POP3 verwendet, wo kein einziges Byte verloren gehen darf.</p>
  <p><span class="term">UDP</span> ist <b>leichtgewichtig und verbindungslos</b>: Es sendet jede Nachricht einzeln, ohne Bestätigungen oder Wiederholungen, und ist daher schneller startklar. Es wird in den meisten Fällen vom <b>DNS</b> verwendet, weil eine Frage und eine Antwort normalerweise in ein einziges Paket passen.</p>
</section>

<section class="block">
  <h2>Ports: Die IP-Adresse findet den Rechner, der Port den Dienst</h2>
  <p>Auf ein und demselben Server können gleichzeitig ein Webserver, ein Mailserver und ein DNS-Server laufen. Die IP-Adresse bringt das Paket zum richtigen Rechner; die <span class="term">Portnummer</span> (von 0 bis 65535) liefert es an das richtige Programm.</p>
  <p>Die Ports 0 bis 1023 sind die <b>Well-known Ports</b>, die von der IANA den gängigsten Diensten zugewiesen werden. Der Client verwendet dagegen einen temporären Port, den das Betriebssystem wählt.</p>
  <p>Zwei weitere Dienste der Anwendungsschicht in Kürze: <b>FTP</b> dient der Dateiübertragung und nutzt Port <b>21</b> für die Befehle; <b>SSH</b> ermöglicht verschlüsselten Fernzugriff auf einen anderen Rechner und nutzt Port <b>22</b>. Sie sind nicht Teil des Lehrplans, kommen aber in Übung E2 vor.</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Dienst</th><th>Port</th><th>Transport</th></tr></thead>
    <tbody>
      <tr><td>HTTP</td><td class="mono">80</td><td>TCP</td></tr>
      <tr><td>HTTPS</td><td class="mono">443</td><td>TCP</td></tr>
      <tr><td>DNS</td><td class="mono">53</td><td>UDP (TCP bei großen Antworten)</td></tr>
      <tr><td>SMTP</td><td class="mono">25 zwischen Servern, 587 Einlieferung vom Client</td><td>TCP</td></tr>
      <tr><td>POP3</td><td class="mono">110 (995 mit TLS)</td><td>TCP</td></tr>
      <tr><td>FTP (Befehle)</td><td class="mono">21</td><td>TCP</td></tr>
      <tr><td>SSH</td><td class="mono">22</td><td>TCP</td></tr>
    </tbody>
  </table></div>
  <p>Das Paar aus IP-Adresse und Port heißt <span class="term">Socket</span>. Eine TCP-Verbindung wird durch die Sockets ihrer beiden Endpunkte identifiziert: <code>192.0.2.5:51234 → 203.0.113.10:443</code> bezeichnet zum Beispiel einen Browser, der über den flüchtigen Port 51234 mit einem HTTPS-Server kommuniziert.</p>
</section>

<div data-ex="e2"></div>`
  },

  /* ===================================================== 1.4 */
  {
    id: '1.4', titolo: 'URL', breve: 'URL', esercitazione: null,
    sommario: 'Jede Ressource im Web hat eine Adresse. Wer sie lesen kann, weiß bereits, was der Browser als Nächstes tun wird.',
    html: `
<section class="block">
  <h2>Der Aufbau einer URL</h2>
  <p>Eine <span class="term">URL</span> (<i>Uniform Resource Locator</i>) gibt an, wo sich eine Ressource befindet und wie sie erreicht wird. Betrachten wir folgende:</p>
<pre class="msg"><span class="k">https</span>://<span class="s">www.esempio.it</span>:443/corso/1.4?lingua=it#esempio</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Bestandteil</th><th>Im Beispiel</th><th>Funktion</th></tr></thead>
    <tbody>
      <tr><td><b>Schema</b></td><td class="mono">https</td><td>Das zu verwendende Protokoll</td></tr>
      <tr><td><b>Host</b></td><td class="mono">www.esempio.it</td><td>Der Servername</td></tr>
      <tr><td><b>Port</b></td><td class="mono">:443</td><td>Optional: Fehlt er, gilt der Standardport des Schemas (80 für http, 443 für https)</td></tr>
      <tr><td><b>Pfad</b></td><td class="mono">/corso/1.4</td><td>Die auf dem Server angeforderte Ressource</td></tr>
      <tr><td><b>Query</b></td><td class="mono">?lingua=it</td><td>Parameter als Paare name=wert, getrennt durch &amp;</td></tr>
      <tr><td><b>Fragment</b></td><td class="mono">#esempio</td><td>Eine bestimmte Stelle innerhalb der Seite</td></tr>
    </tbody>
  </table></div>
  <p>In einer URL ist nur eine begrenzte Menge an Zeichen erlaubt. Andere Zeichen, etwa Leerzeichen oder Umlaute, werden per <b>Prozentkodierung</b> umgewandelt: Jedes Byte wird zu <code>%</code> gefolgt von zwei Hexadezimalziffern. Ein Leerzeichen wird zum Beispiel zu <code>%20</code>: Der Pfad <code>/meine fotos</code> wird als <code>/meine%20fotos</code> geschrieben.</p>
</section>

<section class="block note">
  <p><strong>Hinweis</strong> Alles, was auf das Zeichen <code>#</code> folgt, bleibt im Browser und <b>wird nicht an den Server gesendet</b>. Der Browser nutzt das Fragment, um zu einem Abschnitt zu springen oder – wie auf dieser Website – das Kapitel zu wechseln, ohne die Seite neu zu laden.</p>
</section>

<section class="block">
  <h2>Der Aufbau eines Domainnamens</h2>
  <p>Ein Name wie <code>www.esempio.it</code> wird <b>von rechts nach links</b> gelesen, vom Allgemeinen zum Besonderen:</p>
  <ul>
    <li><b>Wurzel</b> — der abschließende Punkt, meist weggelassen: <code>www.esempio.it<b>.</b></code></li>
    <li><b>Top-Level-Domain (TLD)</b> — <code>it</code> (oder <code>com</code>, <code>org</code> …)</li>
    <li><b>Second-Level-Domain</b> — <code>esempio</code>, die von einer Organisation registrierte Domain</li>
    <li><b>Subdomains</b> — <code>www</code>, <code>posta</code>, <code>corsi</code> …, vom Inhaber der Domain festgelegt</li>
  </ul>
  <p>Das DNS durchläuft dieselbe Hierarchie, um die IP-Adresse zu ermitteln (Kapitel 1.6).</p>
</section>

<section class="block">
  <h2>Welcher Bestandteil der URL welchem Schritt dient</h2>
  <ul>
    <li>Der <b>Host</b> geht an das <b>DNS</b>, das ihn in eine IP-Adresse übersetzt.</li>
    <li><b>Schema und Port</b> bestimmen die <b>Verbindung</b>: zu welchem Port verbunden wird und ob TLS nötig ist.</li>
    <li><b>Pfad und Query</b> landen in der <b>HTTP-Anfrage</b>: <code>GET /corso/1.4?lingua=it HTTP/1.1</code>.</li>
    <li>Das <b>Fragment</b> bleibt im Browser.</li>
  </ul>
  <p>Eine URL kann auch <b>relativ</b> sein: In einem Link wie <code>&lt;a href="kontakt.html"&gt;</code> fehlen Schema und Host; der Browser übernimmt sie aus der Adresse der aktuellen Seite. <b>Absolute</b> URLs mit allen Bestandteilen dienen dagegen zum Verlinken anderer Websites.</p>
</section>

<div data-extra="url"></div>`
  },

  /* ===================================================== 1.5 */
  {
    id: '1.5', titolo: 'HTTP', breve: 'HTTP', esercitazione: 'e3',
    sommario: 'HTTP ist das Protokoll, über das Browser und Server kommunizieren: Textnachrichten mit fester Struktur und wenigen Methoden.',
    html: `
<section class="block">
  <h2>Anfrage, Antwort und Zustandslosigkeit</h2>
  <p><span class="term">HTTP</span> (<i>HyperText Transfer Protocol</i>) folgt dem <b>Anfrage-Antwort</b>-Modell: Der Client sendet eine Anfrage, der Server antwortet. Standardmäßig wird Port <b>80</b> verwendet.</p>
  <p>Es ist ein <b>zustandsloses</b> Protokoll (<i>stateless</i>): Jede Anfrage ist unabhängig, und der Server merkt sich von sich aus keine vorherigen Anfragen. Um einen Benutzer wiederzuerkennen (Warenkorb, Anmeldung), werden <span class="term">Cookies</span> verwendet: Der Server sendet eines mit dem Header <code>Set-Cookie</code>, und der Browser schickt es in späteren Anfragen mit dem Header <code>Cookie</code> zurück.</p>
</section>

<section class="block">
  <h2>Der Aufbau einer Anfrage</h2>
<pre class="msg"><span class="k">GET /index.html HTTP/1.1</span>      <span class="c">← Anfragezeile: Methode, Pfad, Version</span>
Host: www.esempio.it          <span class="c">← Header (Pflicht in HTTP/1.1)</span>
User-Agent: Mozilla/5.0       <span class="c">← Header</span>
Accept: text/html             <span class="c">← Header</span>
                              <span class="c">← Leerzeile: Ende der Header</span>
                              <span class="c">  (es folgt der optionale Body, z. B. Formulardaten)</span></pre>
  <p>Jeder <b>Header</b> ist eine Zeile der Form <code>Name: Wert</code>. Die <b>Leerzeile</b> ist Pflicht: Sie zeigt dem Server das Ende der Header an.</p>
</section>

<section class="block">
  <h2>Die wichtigsten Methoden</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Methode</th><th>Angeforderte Operation</th></tr></thead>
    <tbody>
      <tr><td class="mono">GET</td><td>Eine Ressource abrufen</td></tr>
      <tr><td class="mono">POST</td><td>Daten zur Verarbeitung senden (ein Formular, einen Kommentar)</td></tr>
      <tr><td class="mono">PUT</td><td>Eine Ressource unter einem bestimmten Pfad anlegen oder ersetzen</td></tr>
      <tr><td class="mono">DELETE</td><td>Eine Ressource löschen</td></tr>
      <tr><td class="mono">HEAD</td><td>Wie GET, doch der Server liefert nur die Header, ohne Body</td></tr>
    </tbody>
  </table></div>
  <p>Eine Methode ist <b>sicher</b>, wenn sie den Zustand des Servers nicht verändert (GET, HEAD). Sie ist <b>idempotent</b>, wenn mehrfaches Ausführen dieselbe Wirkung hat wie einmaliges (GET, HEAD, PUT, DELETE). POST ist weder sicher noch idempotent: Deshalb fragt der Browser nach, bevor er ein Formular erneut sendet.</p>
</section>

<section class="block">
  <h2>Der Aufbau einer Antwort</h2>
<pre class="msg"><span class="k">HTTP/1.1 200 OK</span>               <span class="c">← Statuszeile: Version, Code, Meldung</span>
Date: Mon, 16 Nov 2026 10:00:00 GMT
Server: nginx
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
                              <span class="c">← Leerzeile</span>
&lt;!DOCTYPE html&gt;&lt;html&gt;…        <span class="c">← Body: die Seite</span></pre>
  <p>Einige Antwort-Header sind grundlegend. <code>Content-Type</code> gibt den <span class="term">MIME-Typ</span> des Bodys an, also wie er zu interpretieren ist: <code>text/html</code> für eine Seite, <code>text/css</code> für ein Stylesheet, <code>image/png</code> für ein Bild, <code>application/json</code> für strukturierte Daten. <code>Content-Length</code> gibt die Länge des Bodys in Byte an. Bei einem 3xx-Code fügt der Server den Header <code>Location</code> mit der neuen Adresse hinzu; mit <code>Cache-Control</code> legt er fest, wie lange der Browser die erhaltene Kopie wiederverwenden darf.</p>
</section>

<section class="block">
  <h2>Statuscodes</h2>
  <p>Die erste Ziffer gibt die <b>Klasse</b> an:</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Klasse</th><th>Bedeutung</th><th>Beispiele</th></tr></thead>
    <tbody>
      <tr><td class="mono">1xx</td><td>Information</td><td>100 Continue</td></tr>
      <tr><td class="mono">2xx</td><td>Erfolg</td><td><b>200 OK</b></td></tr>
      <tr><td class="mono">3xx</td><td>Umleitung</td><td><b>301</b> Moved Permanently (die Ressource wurde verschoben); <b>304</b> Not Modified (die Kopie im Cache ist noch gültig)</td></tr>
      <tr><td class="mono">4xx</td><td>Clientfehler</td><td><b>400</b> Bad Request (fehlerhafte Anfrage); <b>403</b> Forbidden (Zugriff verweigert); <b>404</b> Not Found (Ressource existiert nicht)</td></tr>
      <tr><td class="mono">5xx</td><td>Serverfehler</td><td><b>500</b> Internal Server Error; <b>503</b> Service Unavailable (Server überlastet oder in Wartung)</td></tr>
    </tbody>
  </table></div>
</section>

<div data-extra="http"></div>

<section class="block">
  <h2>Nach der Antwort</h2>
  <p>Die Antwort enthält nur das HTML. Beim Auswerten erkennt der Browser die benötigten <b>zusätzlichen Ressourcen</b>: CSS-Stylesheets, Bilder, Skripte. Für jede sendet er <b>eine weitere HTTP-Anfrage</b>. Liegt alles vor, setzt er die Seite zusammen und <b>zeichnet</b> sie auf den Bildschirm. Eine gewöhnliche Seite erfordert Dutzende von Anfragen.</p>
</section>

<section class="block">
  <h2>Die Versionen</h2>
  <ul>
    <li><b>HTTP/1.1</b> — <b>textbasierte</b> Nachrichten, lesbar wie die obigen.</li>
    <li><b>HTTP/2</b> — <b>binäre</b> Nachrichten und mehrere parallele Anfragen über dieselbe TCP-Verbindung.</li>
    <li><b>HTTP/3</b> — ebenfalls binär, aber über <b>QUIC</b> übertragen, ein auf UDP aufbauendes Protokoll.</li>
  </ul>
  <p>Die <b>Semantik</b> ist in allen Versionen gleich: dieselben Methoden, dieselben Header, dieselben Statuscodes. Nur das Übertragungsformat der Nachrichten ändert sich.</p>
  <p>Bereits HTTP/1.1 führt <b>persistente Verbindungen</b> ein: Dieselbe TCP-Verbindung wird für mehrere aufeinanderfolgende Anfragen wiederverwendet, sodass der Handshake nicht jedes Mal wiederholt werden muss. HTTP/2 erlaubt zusätzlich, mehrere Antworten gleichzeitig über dieselbe Verbindung zu übertragen.</p>
</section>

<div data-ex="e3"></div>`
  },

  /* ===================================================== 1.6 */
  {
    id: '1.6', titolo: 'DNS', breve: 'DNS', esercitazione: null,
    sommario: 'Menschen verwenden Namen, das Netz numerische Adressen. Das DNS ist das verteilte System, das beide einander zuordnet.',
    html: `
<section class="block">
  <h2>Aufgabe</h2>
  <p>Das <span class="term">DNS</span> (<i>Domain Name System</i>) übersetzt einen lesbaren Namen wie <code>www.esempio.it</code> in die <b>IP-Adresse</b> des Servers, etwa <code>203.0.113.10</code>. Es ist der erste Schritt bei jeder aufgerufenen Seite und jeder gesendeten E-Mail: Ohne IP-Adresse lässt sich keine Verbindung aufbauen.</p>
</section>

<section class="block">
  <h2>Eine Hierarchie von Servern</h2>
  <p>Kein Server kennt alle Namen. Die Arbeit ist entsprechend dem Aufbau des Namens verteilt, der von rechts nach links gelesen wird:</p>
  <ul>
    <li><b>Root-Server</b> — sie kennen die Adressen der Websites nicht, wissen aber, welche Server für jede TLD zuständig sind.</li>
    <li><b>TLD-Server</b> — zum Beispiel die für <code>.it</code>: Sie wissen, welche Server für <code>esempio.it</code> autoritativ sind.</li>
    <li><b>Autoritative Server</b> — die der Domain: Sie kennen die Einträge von <code>esempio.it</code> tatsächlich und liefern die endgültige Antwort.</li>
  </ul>
  <p>Die Root-Server werden durch dreizehn Namen bezeichnet, von <code>a.root-servers.net</code> bis <code>m.root-servers.net</code>, doch jeder ist in vielen weltweit verteilten Kopien vorhanden: Dank eines Routingverfahrens namens <i>Anycast</i> erreicht die Anfrage automatisch die nächstgelegene Kopie.</p>
</section>

<section class="block">
  <h2>Die Rolle des Resolvers</h2>
  <p>Der Rechner des Benutzers fragt nicht direkt bei den Root-Servern an, sondern wendet sich an einen <span class="term">rekursiven Resolver</span>, meist den des Providers oder einen im System eingestellten. Der Resolver befragt die Server im Auftrag des Clients und gibt ihm nur die endgültige Antwort zurück.</p>
  <h3>Reihenfolge der Suche</h3>
  <ol>
    <li><b>Browser-Cache</b> — wurde der Name kürzlich aufgelöst?</li>
    <li><b>Cache des Betriebssystems</b> und <code>hosts</code>-Datei.</li>
    <li><b>Resolver</b> — hat er die Antwort im Cache, liefert er sie sofort.</li>
    <li>Andernfalls fragt der Resolver nacheinander: <b>Root-Server → TLD-Server → autoritativer Server</b>.</li>
  </ol>
  <p>Die Antwort wird anschließend auf jeder Ebene zwischengespeichert, sodass die nächste Abfrage nahezu sofort erfolgt.</p>
  <p>Man unterscheidet daher zwei Arten von Anfragen. Die des Clients an den Resolver ist <b>rekursiv</b>: Der Client verlangt die endgültige Antwort. Die des Resolvers an Root-, TLD- und autoritativen Server sind <b>iterativ</b>: Jeder Server antwortet mit dem, was er weiß, oft mit einem Verweis auf den nächsten Server.</p>
</section>

<div data-extra="dns"></div>

<section class="block">
  <h2>Die wichtigsten Einträge</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Typ</th><th>Inhalt</th><th>Beispiel</th></tr></thead>
    <tbody>
      <tr><td class="mono">A</td><td>Eine IPv4-Adresse</td><td class="mono">www.esempio.it → 203.0.113.10</td></tr>
      <tr><td class="mono">AAAA</td><td>Eine IPv6-Adresse</td><td class="mono">www.esempio.it → 2001:db8::1</td></tr>
      <tr><td class="mono">CNAME</td><td>Ein Alias auf einen anderen Namen</td><td class="mono">blog.esempio.it → www.esempio.it</td></tr>
      <tr><td class="mono">NS</td><td>Die autoritativen Nameserver der Domain</td><td class="mono">esempio.it → ns1.esempio.it</td></tr>
      <tr><td class="mono">MX</td><td>Der Server, der die Post der Domain annimmt, mit einer Priorität</td><td class="mono">esempio.it → 10 posta.esempio.it</td></tr>
    </tbody>
  </table></div>
  <p>Jeder Eintrag hat eine <span class="term">TTL</span> (<i>Time To Live</i>): die Anzahl Sekunden, die er im Cache bleiben darf. Nach Ablauf der TTL muss der Wert erneut abgefragt werden.</p>
</section>

<section class="block">
  <h2>Port und Transport</h2>
  <p>Das DNS nutzt Port <b>53</b>, in der Regel über <b>UDP</b>: eine Frage, eine Antwort, keine Verbindung. Auf <b>TCP</b> wird ausgewichen, wenn die Antwort für ein UDP-Paket zu groß ist, sowie bei Zonentransfers zwischen Servern.</p>
</section>`
  },

  /* ===================================================== 1.7 */
  {
    id: '1.7', titolo: 'HTTPS und TLS', breve: 'HTTPS und TLS', esercitazione: null,
    sommario: 'HTTP überträgt im Klartext. TLS legt einen verschlüsselten und authentifizierten Kanal darum, den das Schloss im Browser anzeigt.',
    html: `
<section class="block">
  <h2>Die Risiken von unverschlüsseltem HTTP</h2>
  <ul>
    <li><b>Abhören</b> — wer sich im selben Netz befindet (ein öffentliches WLAN, ein Router), kann Passwörter und Daten mitlesen.</li>
    <li><b>Manipulation</b> — ein Zwischenglied kann die Seite verändern oder Inhalte einschleusen.</li>
    <li><b>Identitätsvortäuschung</b> — es lässt sich nicht prüfen, ob auf der anderen Seite tatsächlich der gewünschte Server steht.</li>
  </ul>
</section>

<section class="block">
  <h2>Was TLS garantiert</h2>
  <p><span class="term">TLS</span> (<i>Transport Layer Security</i>, Nachfolger von SSL) begegnet den drei Risiken mit drei Garantien:</p>
  <ul>
    <li><b>Vertraulichkeit</b> — abgefangene Daten sind unlesbar;</li>
    <li><b>Integrität</b> — jede Veränderung während der Übertragung wird erkannt;</li>
    <li><b>Serverauthentifizierung</b> — der Server weist seine Identität mit einem Zertifikat nach.</li>
  </ul>
  <p><span class="term">HTTPS</span> ist kein neues Protokoll, sondern <b>HTTP innerhalb einer TLS-Verbindung</b>, standardmäßig auf Port <b>443</b>. Die HTTP-Nachrichten sind dieselben wie in Kapitel 1.5, werden aber verschlüsselt übertragen.</p>
</section>

<section class="block">
  <h2>Zertifikate und Zertifizierungsstellen</h2>
  <p>Ein <b>Zertifikat</b> ist ein digitales Dokument, das einen Domainnamen an einen öffentlichen Schlüssel bindet. Es ist von einer <b>Zertifizierungsstelle</b> (<i>CA</i>) signiert, einer Instanz, der Browser und Betriebssysteme vertrauen; sie bringen eine vorinstallierte Liste solcher Stellen mit.</p>
  <p>Beim Empfang eines Zertifikats prüft der Browser, ob es von einer vertrauenswürdigen CA signiert, nicht abgelaufen und für die aufgerufene Website ausgestellt ist. Stimmt etwas nicht, zeigt er eine ganzseitige Warnung.</p>
  <p>Zertifikate sind nur begrenzt gültig und müssen regelmäßig erneuert werden. Die von <b>Let's Encrypt</b> kostenlos und automatisch ausgestellten Zertifikate etwa gelten wenige Monate – einer der Gründe, warum heute die große Mehrheit der Websites HTTPS verwendet.</p>
</section>

<section class="block">
  <h2>Der Handshake, vereinfacht</h2>
  <ol>
    <li><b>Vorschlag des Clients</b>: unterstützte TLS-Versionen und Algorithmen sowie ein eigener Beitrag zum Schlüssel.</li>
    <li><b>Antwort des Servers</b>: Er wählt die Algorithmen, sendet seinen Beitrag und das <b>Zertifikat</b>.</li>
    <li>Der Client prüft das Zertifikat. Aus den ausgetauschten Beiträgen <b>berechnen beide denselben Sitzungsschlüssel</b>, ohne dass dieser je über das Netz übertragen wird.</li>
    <li>Ab diesem Punkt wird die Kommunikation mit <b>symmetrischer Kryptografie</b> verschlüsselt, die wesentlich effizienter ist: Beide Seiten verwenden denselben Sitzungsschlüssel.</li>
  </ol>
  <p>Asymmetrische Kryptografie (öffentlicher und privater Schlüssel) kommt also nur zu Beginn zum Einsatz, für die Authentifizierung und die Schlüsselvereinbarung.</p>
  <p>Mit <b>TLS 1.3</b>, der aktuellen Version, braucht der Handshake nur einen einzigen Hin- und Rückweg, bevor der Client verschlüsselte Daten senden kann; TLS 1.2 brauchte zwei. Die früheren Versionen SSL, TLS 1.0 und TLS 1.1 gelten als unsicher und werden von Browsern nicht mehr akzeptiert.</p>
</section>

<section class="block">
  <h2>Die Position von TLS im Stack</h2>
<pre class="msg">  HTTP        <span class="c">← Anwendung</span>
  <span class="k">TLS</span>         <span class="c">← verschlüsselt die Daten von oben</span>
  TCP         <span class="c">← Transport</span>
  IP</pre>
</section>

<section class="block note">
  <p><strong>Achtung</strong> Das Schloss garantiert, dass der Kanal zwischen dem Benutzer und diesem Server verschlüsselt ist und der Server ein gültiges Zertifikat für diesen Namen besitzt. <b>Es garantiert nicht die Vertrauenswürdigkeit der Website</b>: Auch eine Phishing-Seite kann ein gültiges Zertifikat für ihre eigene Domain besitzen. Das Schloss bestätigt die Vertraulichkeit der Kommunikation, nicht die Redlichkeit des Gegenübers.</p>
</section>`
  },

  /* ===================================================== 1.8 */
  {
    id: '1.8', titolo: 'SMTP und POP3', breve: 'SMTP und POP3', esercitazione: 'e4',
    sommario: 'E-Mail benötigt zwei verschiedene Protokolle: Eines transportiert die Nachricht zum Ziel, das andere ermöglicht das Abholen aus dem Postfach.',
    html: `
<section class="block">
  <h2>Die Beteiligten</h2>
  <ul>
    <li><b>MUA</b> (<i>Mail User Agent</i>) — das E-Mail-Programm des Benutzers: Thunderbird, Outlook, die App auf dem Smartphone.</li>
    <li><b>Mailserver des Absenders</b> — nimmt die Nachricht vom MUA entgegen und kümmert sich um die Zustellung.</li>
    <li><b>Mailserver des Empfängers</b> — nimmt die Nachricht an und legt sie im <b>Postfach</b> des Benutzers ab.</li>
  </ul>
</section>

<section class="block">
  <h2>SMTP: der Versand</h2>
  <p><span class="term">SMTP</span> (<i>Simple Mail Transfer Protocol</i>) übernimmt den <b>Versand</b> der Post in zwei Abschnitten:</p>
  <ul>
    <li>vom <b>Client zum eigenen Server</b>, normalerweise über Port <b>587</b> (<i>Submission</i>), mit Authentifizierung;</li>
    <li>vom <b>Server des Absenders zum Server des Empfängers</b>, über Port <b>25</b>.</li>
  </ul>
  <h3>Wie der Zielserver gefunden wird</h3>
  <p>Die Nachricht ist an <code>luca@esempio.it</code> adressiert. Der Server des Absenders fragt beim <b>DNS</b> den <b>MX</b>-Eintrag von <code>esempio.it</code> ab und erhält den Namen des Mailservers, etwa <code>posta.esempio.it</code>; anschließend ruft er dessen A-Eintrag ab, um die IP-Adresse zu erhalten. Hier besteht die Verbindung zu Kapitel 1.6: Ohne DNS ließe sich E-Mail nicht weiterleiten.</p>
</section>

<section class="block">
  <h2>Eine SMTP-Sitzung</h2>
  <p>SMTP ist ein textbasiertes Protokoll wie HTTP/1.1. <b>C</b> steht für den Client, <b>S</b> für den Server:</p>
<pre class="msg">S: <span class="s">220</span> posta.esempio.it ESMTP bereit
C: <span class="k">EHLO</span> mail.mittente.it
S: <span class="s">250</span>-posta.esempio.it
S: <span class="s">250</span> SIZE 35882577
C: <span class="k">MAIL FROM:</span>&lt;anna@mittente.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">RCPT TO:</span>&lt;luca@esempio.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">DATA</span>
S: <span class="s">354</span> Nachricht senden; mit einer Zeile beenden, die nur einen Punkt enthält
C: Subject: Besprechung
C:
C: Die Besprechung ist für morgen bestätigt.
C: <span class="k">.</span>
S: <span class="s">250</span> OK, Nachricht angenommen
C: <span class="k">QUIT</span>
S: <span class="s">221</span> Verbindung wird geschlossen</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Code</th><th>Bedeutung</th></tr></thead>
    <tbody>
      <tr><td class="mono">220</td><td>Dienst bereit (Begrüßung des Servers)</td></tr>
      <tr><td class="mono">250</td><td>Befehl ausgeführt</td></tr>
      <tr><td class="mono">354</td><td>Beginn der Übertragung des Nachrichtentexts</td></tr>
      <tr><td class="mono">221</td><td>Der Server schließt die Verbindung</td></tr>
    </tbody>
  </table></div>
  <p>Zu unterscheiden sind <b>Umschlag</b> und <b>Nachricht</b>. Die Befehle <code>MAIL FROM</code> und <code>RCPT TO</code> bilden den Umschlag, den die Server für die Zustellung nutzen. Die nach <code>DATA</code> gesendeten Zeilen <code>From:</code>, <code>To:</code>, <code>Subject:</code> und <code>Date:</code> sind dagegen die Header der Nachricht (RFC 5322), die das E-Mail-Programm anzeigt. Anhänge werden nach dem <b>MIME</b>-Standard als Text kodiert.</p>
</section>

<div data-extra="smtp"></div>

<section class="block">
  <h2>POP3: das Abholen</h2>
  <p><span class="term">POP3</span> (<i>Post Office Protocol, Version 3</i>) ermöglicht dem Empfänger, die Post aus seinem Postfach auf dem Server <b>herunterzuladen</b>. Port <b>110</b>, oder <b>995</b> mit TLS. Der Server antwortet mit <code>+OK</code> oder <code>-ERR</code>.</p>
<pre class="msg">S: <span class="s">+OK</span> POP3 bereit
C: <span class="k">USER</span> luca
S: <span class="s">+OK</span>
C: <span class="k">PASS</span> ********
S: <span class="s">+OK</span> 2 Nachrichten
C: <span class="k">LIST</span>
S: <span class="s">+OK</span>
S: 1 1205
S: 2 830
S: .
C: <span class="k">RETR</span> 1          <span class="c">← lädt Nachricht 1 herunter</span>
S: <span class="s">+OK</span> …Nachrichtentext…
C: <span class="k">DELE</span> 1          <span class="c">← markiert sie zum Löschen</span>
S: <span class="s">+OK</span>
C: <span class="k">QUIT</span>            <span class="c">← erst jetzt werden markierte Nachrichten gelöscht</span>
S: <span class="s">+OK</span> Sitzung beendet</pre>
</section>

<section class="block">
  <h2>Push- und Pull-Modell</h2>
  <p><b>SMTP arbeitet im Push-Modus</b>: Der Absender ergreift die Initiative und befördert die Nachricht zum Ziel. <b>POP3 arbeitet im Pull-Modus</b>: Der Empfänger holt die Nachrichten ab, wann er möchte. Deshalb sind zwei verschiedene Protokolle nötig: Die Post erreicht den Server auch dann, wenn der Rechner des Empfängers ausgeschaltet ist, und wird bei der nächsten Verbindung abgeholt.</p>
</section>

<section class="block note">
  <p><strong>Vertiefung: IMAP</strong> IMAP ist die moderne Alternative zu POP3 (Port 143, 993 mit TLS). Der wichtigste Unterschied: IMAP <b>belässt die Nachrichten auf dem Server</b> und synchronisiert sie, sodass dasselbe Postfach vom Smartphone und vom Computer aus genutzt werden kann. Es ist nicht Teil des Lehrplans.</p>
</section>

<div data-ex="e4"></div>`
  }
]);
