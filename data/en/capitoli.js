/* data/en/capitoli.js — Module 1 chapters (English). Same structure as data/it/capitoli.js. */
DCS.i18n.add('en', 'capitoli', [
  /* ===================================================== 1.1 */
  {
    id: '1.1', titolo: 'Introduction', breve: 'Introduction', esercitazione: null,
    sommario: 'The Internet and the web are not synonyms. Before following a page from request to screen, the terms need to be defined precisely.',
    html: `
<section class="block">
  <h2>The Internet and the web</h2>
  <p>The <span class="term">Internet</span> is the <b>network of networks</b>: millions of different networks (home, school, corporate, provider networks) interconnected and able to exchange data thanks to the same protocols, those of the TCP/IP family.</p>
  <p>The <span class="term">web</span> is <b>one of the services</b> that run on the Internet: a set of pages connected by links, which the browser requests and displays. It is not the only service: the same network also carries email, file transfer, video calls and online games.</p>
  <p>An example: sending an email from a mail application uses the Internet, but not the web. Opening a website uses both: the web as the service, the Internet as the transport infrastructure.</p>
</section>

<section class="block">
  <h2>Historical background</h2>
  <p>The web was born at <b>CERN</b> in Geneva. In 1989 <b>Tim Berners-Lee</b> proposed a system for sharing documents among researchers; between 1990 and 1991 he built the first web server, the first browser and the first website, which became accessible outside CERN in 1991.</p>
  <p>The project rests on three elements, all covered in this course:</p>
  <ul>
    <li><b>HTML</b> — the language used to describe a page;</li>
    <li><b>URL</b> — the address that identifies each resource (chapter 1.4);</li>
    <li><b>HTTP</b> — the protocol the browser uses to request pages and the server to send them (chapter 1.5).</li>
  </ul>
  <p>The web rests on an older infrastructure. In 1969 the <b>ARPANET</b> network linked the first four university nodes in the United States; on 1 January 1983 it officially adopted the <b>TCP/IP</b> protocols, a date regarded as the birth of the modern Internet. In 1994 Berners-Lee founded the <b>W3C</b> (<i>World Wide Web Consortium</i>), the organisation that still develops web standards today.</p>
</section>

<section class="block">
  <h2>The two questions of the course</h2>
  <p><b>1. Which steps lie between requesting a web page and seeing it on the screen?</b><br>
  In short: the browser analyses the URL, asks <b>DNS</b> for the server's IP address, opens a <b>TCP</b> connection, protects it with <b>TLS</b>, sends an <b>HTTP</b> request, receives the response and renders the page. Each step has its own chapter.</p>
  <p><b>2. How does an email message reach its recipient?</b><br>
  The mail program hands the message to its own server with <b>SMTP</b>; that server queries <b>DNS</b> to find the server that receives mail for the destination domain and delivers the message to it, again with SMTP; the recipient downloads it with <b>POP3</b>.</p>
</section>

<section class="block">
  <h2>Course map</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Ch.</th><th>Topic</th><th>Related question</th></tr></thead>
    <tbody>
      <tr><td>1.2</td><td>Client and server: who requests and who responds</td><td>Both</td></tr>
      <tr><td>1.3</td><td>The TCP/IP stack, TCP and UDP, ports</td><td>Both</td></tr>
      <tr><td>1.4</td><td>The structure of a URL</td><td>Web page</td></tr>
      <tr><td>1.5</td><td>HTTP: requests, responses, status codes</td><td>Web page</td></tr>
      <tr><td>1.6</td><td>DNS: from name to IP address</td><td>Both</td></tr>
      <tr><td>1.7</td><td>HTTPS and TLS: the secure connection</td><td>Web page</td></tr>
      <tr><td>1.8</td><td>SMTP and POP3: the journey of an email</td><td>Email</td></tr>
    </tbody>
  </table></div>
</section>`
  },

  /* ===================================================== 1.2 */
  {
    id: '1.2', titolo: 'The client-server model', breve: 'Client-server', esercitazione: 'e1',
    sommario: 'Most Internet services follow the same pattern: one program makes a request, another one fulfils it.',
    html: `
<section class="block">
  <h2>Two roles</h2>
  <p>The <span class="term">client</span> is the program that <b>requests</b> a service: the browser that wants a page, the mail application that wants new messages.</p>
  <p>The <span class="term">server</span> is the program that <b>responds</b> and provides resources: pages, files, mailboxes, DNS answers. It waits for requests on a well-known port.</p>
  <p>Client and server are <b>roles</b>, not types of machine. The same computer acts as a client when it opens a website and as a server if a web server is installed on it. A mail server, when it delivers a message to another server, is acting as a client at that moment.</p>
  <p>Not every service follows this pattern. In the <span class="term">peer-to-peer</span> (P2P) model every node is both client and server: in file sharing with BitTorrent, for example, each computer downloads parts of a file from the others and at the same time makes them available. The web and email, on the other hand, are client-server services.</p>
</section>

<section class="block">
  <h2>Operating rules</h2>
  <ul>
    <li><b>Communication is always started by the client.</b> The server sends nothing without a request.</li>
    <li><b>One server serves many clients</b>, even at the same time: a popular website answers thousands of browsers per second.</li>
    <li>Every exchange follows the same cycle: <b>request → processing → response</b>.</li>
  </ul>
  <p>Ports make the dialogue possible: the server listens on a <b>well-known port</b> (80 for HTTP), while the client uses an <b>ephemeral port</b> assigned by the operating system, in the range recommended by IANA, 49152 to 65535. This is why the same browser can keep dozens of tabs open towards different servers without mixing up the responses.</p>
</section>

<section class="block">
  <h2>The cycle in an example</h2>
  <p>The user opens <code>http://www.esempio.it/index.html</code>. The browser (client) sends the server a <b>request</b>; the server <b>processes</b> it (locates the file <code>index.html</code>) and sends the <b>response</b> with the content. In simplified form, the two HTTP messages look like this:</p>
<pre class="msg"><span class="c"># request: from client to server</span>
<span class="k">GET</span> /index.html HTTP/1.1
Host: www.esempio.it

<span class="c"># response: from server to client</span>
HTTP/1.1 <span class="s">200 OK</span>
Content-Type: text/html

&lt;html&gt;…&lt;/html&gt;</pre>
  <p>Chapter 1.5 analyses their meaning line by line.</p>
</section>

<div data-ex="e1"></div>`
  },

  /* ===================================================== 1.3 */
  {
    id: '1.3', titolo: 'The application layer and the TCP/IP stack', breve: 'TCP/IP stack', esercitazione: 'e2',
    sommario: 'An HTTP message does not travel alone: it passes through a stack of layers, each with a specific task.',
    html: `
<section class="block">
  <h2>The four layers of the TCP/IP model</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Layer</th><th>Task</th><th>Examples</th></tr></thead>
    <tbody>
      <tr><td><b>Application</b></td><td>Services used by programs</td><td>HTTP, DNS, SMTP, POP3</td></tr>
      <tr><td><b>Transport</b></td><td>Communication between processes, through ports</td><td>TCP, UDP</td></tr>
      <tr><td><b>Internet</b></td><td>Addressing and routing between networks</td><td>IP</td></tr>
      <tr><td><b>Network access</b></td><td>Transmission over the local physical medium</td><td>Ethernet, Wi-Fi</td></tr>
    </tbody>
  </table></div>
  <p>The <b>ISO/OSI</b> model splits the same work into <b>seven</b> layers: physical, data link, network, transport, session, presentation, application. The three upper OSI layers (session, presentation, application) correspond to the single TCP/IP application layer; the two lower ones (physical and data link) to network access.</p>
  <p>Each layer has its own addressing system. At the internet layer the <b>IP address</b> identifies the destination host along the whole path; at the network access layer the <b>MAC address</b> identifies the network card on a single local link and changes at every router crossed. <b>Routers</b> work up to the internet layer: they read the destination IP address and choose which network to forward the packet to.</p>
</section>

<section class="block">
  <h2>The application layer</h2>
  <p>This is the layer closest to the user. It is where the protocols covered in this course operate, <b>HTTP, DNS, SMTP and POP3</b>, together with the programs that use them: browsers, web servers, mail clients. Each application protocol defines which messages exist, how they are structured and in which order they are exchanged.</p>
</section>

<section class="block">
  <h2>Encapsulation</h2>
  <p>When the browser sends an HTTP request, the message moves down the stack and <b>each layer adds its own header</b> to the data received from the layer above:</p>
<pre class="msg">[ Ethernet | IP | TCP | <span class="k">GET /index.html HTTP/1.1 …</span> ]
  access     net. transp. application</pre>
  <p>On reception the server follows the reverse path: each layer removes its header and passes the rest up, until the web server receives the HTTP request in its original form.</p>
</section>

<section class="block">
  <h2>TCP and UDP</h2>
  <p><span class="term">TCP</span> is <b>reliable and connection-oriented</b>: before transmitting it opens a connection (three-way handshake: SYN, SYN-ACK, ACK), numbers the segments, puts them back in order and retransmits lost ones. It is used by HTTP (up to version 2), SMTP and POP3, where not a single byte may be lost.</p>
  <p><span class="term">UDP</span> is <b>lightweight and connectionless</b>: it sends each message independently, with no acknowledgements or retransmissions, so it is faster to start. It is used by <b>DNS</b> in most cases, because a question and an answer normally fit in a single packet.</p>
</section>

<section class="block">
  <h2>Ports: the IP address finds the machine, the port finds the service</h2>
  <p>A web server, a mail server and a DNS server can run at the same time on the same machine. The IP address takes the packet to the right machine; the <span class="term">port number</span> (from 0 to 65535) delivers it to the right program.</p>
  <p>Ports 0 to 1023 are the <b>well-known ports</b>, assigned by IANA to the most common services. The client, instead, uses a temporary port chosen by the operating system.</p>
  <p>Two more application-layer services, briefly: <b>FTP</b> transfers files and uses port <b>21</b> for commands; <b>SSH</b> provides encrypted remote access to another machine and uses port <b>22</b>. They are outside the syllabus, but appear in exercise E2.</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Service</th><th>Port</th><th>Transport</th></tr></thead>
    <tbody>
      <tr><td>HTTP</td><td class="mono">80</td><td>TCP</td></tr>
      <tr><td>HTTPS</td><td class="mono">443</td><td>TCP</td></tr>
      <tr><td>DNS</td><td class="mono">53</td><td>UDP (TCP for large responses)</td></tr>
      <tr><td>SMTP</td><td class="mono">25 between servers, 587 client submission</td><td>TCP</td></tr>
      <tr><td>POP3</td><td class="mono">110 (995 with TLS)</td><td>TCP</td></tr>
      <tr><td>FTP (commands)</td><td class="mono">21</td><td>TCP</td></tr>
      <tr><td>SSH</td><td class="mono">22</td><td>TCP</td></tr>
    </tbody>
  </table></div>
  <p>The pair formed by an IP address and a port is called a <span class="term">socket</span>. A TCP connection is identified by the sockets at its two ends: for example <code>192.0.2.5:51234 → 203.0.113.10:443</code> denotes a browser that, from ephemeral port 51234, is talking to an HTTPS server.</p>
</section>

<div data-ex="e2"></div>`
  },

  /* ===================================================== 1.4 */
  {
    id: '1.4', titolo: 'URL', breve: 'URL', esercitazione: null,
    sommario: 'Every resource on the web has an address. Reading it already reveals most of what the browser is about to do.',
    html: `
<section class="block">
  <h2>The structure of a URL</h2>
  <p>A <span class="term">URL</span> (<i>Uniform Resource Locator</i>) states where a resource is located and how to reach it. Consider the following:</p>
<pre class="msg"><span class="k">https</span>://<span class="s">www.esempio.it</span>:443/corso/1.4?lingua=it#esempio</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Part</th><th>In the example</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td><b>Scheme</b></td><td class="mono">https</td><td>The protocol to use</td></tr>
      <tr><td><b>Host</b></td><td class="mono">www.esempio.it</td><td>The server name</td></tr>
      <tr><td><b>Port</b></td><td class="mono">:443</td><td>Optional: if absent, the scheme's default is used (80 for http, 443 for https)</td></tr>
      <tr><td><b>Path</b></td><td class="mono">/corso/1.4</td><td>The resource requested on the server</td></tr>
      <tr><td><b>Query</b></td><td class="mono">?lingua=it</td><td>Parameters as name=value pairs, separated by &amp;</td></tr>
      <tr><td><b>Fragment</b></td><td class="mono">#esempio</td><td>A specific point inside the page</td></tr>
    </tbody>
  </table></div>
  <p>Only a limited set of characters is allowed in a URL. The others, such as spaces or accented letters, are converted with <b>percent-encoding</b>: each byte becomes <code>%</code> followed by two hexadecimal digits. A space, for example, becomes <code>%20</code>: the path <code>/my photos</code> is written <code>/my%20photos</code>.</p>
</section>

<section class="block note">
  <p><strong>Note</strong> Everything after the <code>#</code> character stays in the browser and <b>is not sent to the server</b>. The browser uses the fragment to scroll to a section or, as on this site, to change chapter without reloading the page.</p>
</section>

<section class="block">
  <h2>The structure of a domain name</h2>
  <p>A name such as <code>www.esempio.it</code> is read <b>from right to left</b>, from the general to the specific:</p>
  <ul>
    <li><b>root</b> — the final dot, normally implied: <code>www.esempio.it<b>.</b></code></li>
    <li><b>top-level domain (TLD)</b> — <code>it</code> (or <code>com</code>, <code>org</code>…)</li>
    <li><b>second-level domain</b> — <code>esempio</code>, the one registered by an organisation</li>
    <li><b>subdomains</b> — <code>www</code>, <code>posta</code>, <code>corsi</code>…, defined by the domain owner</li>
  </ul>
  <p>DNS follows the same hierarchy to obtain the IP address (chapter 1.6).</p>
</section>

<section class="block">
  <h2>Which part of the URL serves which step</h2>
  <ul>
    <li>The <b>host</b> goes to <b>DNS</b>, which translates it into an IP address.</li>
    <li><b>Scheme and port</b> determine the <b>connection</b>: which port to connect to and whether TLS is needed.</li>
    <li><b>Path and query</b> end up in the <b>HTTP request</b>: <code>GET /corso/1.4?lingua=it HTTP/1.1</code>.</li>
    <li>The <b>fragment</b> stays in the browser.</li>
  </ul>
  <p>A URL can also be <b>relative</b>: in a link such as <code>&lt;a href="contacts.html"&gt;</code> the scheme and host are missing, and the browser takes them from the address of the current page. <b>Absolute</b> URLs, with all their parts, are used to link to other sites.</p>
</section>

<div data-extra="url"></div>`
  },

  /* ===================================================== 1.5 */
  {
    id: '1.5', titolo: 'HTTP', breve: 'HTTP', esercitazione: 'e3',
    sommario: 'HTTP is the protocol browsers and servers use to communicate: text messages with a fixed structure and a small set of methods.',
    html: `
<section class="block">
  <h2>Request, response and no state</h2>
  <p><span class="term">HTTP</span> (<i>HyperText Transfer Protocol</i>) follows the <b>request-response</b> model: the client sends a request, the server responds. By default it uses port <b>80</b>.</p>
  <p>It is a <b>stateless</b> protocol: each request is independent and the server, by itself, keeps no memory of previous ones. To recognise a user (shopping cart, login) <span class="term">cookies</span> are used: the server sends one with the <code>Set-Cookie</code> header and the browser returns it in later requests with the <code>Cookie</code> header.</p>
</section>

<section class="block">
  <h2>The structure of a request</h2>
<pre class="msg"><span class="k">GET /index.html HTTP/1.1</span>      <span class="c">← request line: method, path, version</span>
Host: www.esempio.it          <span class="c">← header (mandatory in HTTP/1.1)</span>
User-Agent: Mozilla/5.0       <span class="c">← header</span>
Accept: text/html             <span class="c">← header</span>
                              <span class="c">← empty line: end of headers</span>
                              <span class="c">  (the optional body follows, e.g. form data)</span></pre>
  <p>Each <b>header</b> is a line of the form <code>Name: value</code>. The <b>empty line</b> is mandatory: it tells the server that the headers have ended.</p>
</section>

<section class="block">
  <h2>The main methods</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Method</th><th>Requested operation</th></tr></thead>
    <tbody>
      <tr><td class="mono">GET</td><td>Retrieve a resource</td></tr>
      <tr><td class="mono">POST</td><td>Send data to be processed (a form, a comment)</td></tr>
      <tr><td class="mono">PUT</td><td>Create or replace a resource at a given path</td></tr>
      <tr><td class="mono">DELETE</td><td>Delete a resource</td></tr>
      <tr><td class="mono">HEAD</td><td>Like GET, but the server returns only the headers, without a body</td></tr>
    </tbody>
  </table></div>
  <p>A method is <b>safe</b> if it does not change the server's state (GET, HEAD). It is <b>idempotent</b> if repeating it several times has the same effect as performing it once (GET, HEAD, PUT, DELETE). POST is neither safe nor idempotent: that is why the browser asks for confirmation before resubmitting a form.</p>
</section>

<section class="block">
  <h2>The structure of a response</h2>
<pre class="msg"><span class="k">HTTP/1.1 200 OK</span>               <span class="c">← status line: version, code, message</span>
Date: Mon, 16 Nov 2026 10:00:00 GMT
Server: nginx
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
                              <span class="c">← empty line</span>
&lt;!DOCTYPE html&gt;&lt;html&gt;…        <span class="c">← body: the page</span></pre>
  <p>Some response headers are essential. <code>Content-Type</code> gives the <span class="term">MIME type</span> of the body, i.e. how to interpret it: <code>text/html</code> for a page, <code>text/css</code> for a style sheet, <code>image/png</code> for an image, <code>application/json</code> for structured data. <code>Content-Length</code> gives the length of the body in bytes. With a 3xx code the server adds the <code>Location</code> header, which holds the new address; with <code>Cache-Control</code> it states for how long the browser may reuse the copy it received.</p>
</section>

<section class="block">
  <h2>Status codes</h2>
  <p>The first digit indicates the <b>class</b>:</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Class</th><th>Meaning</th><th>Examples</th></tr></thead>
    <tbody>
      <tr><td class="mono">1xx</td><td>Informational</td><td>100 Continue</td></tr>
      <tr><td class="mono">2xx</td><td>Success</td><td><b>200 OK</b></td></tr>
      <tr><td class="mono">3xx</td><td>Redirection</td><td><b>301</b> Moved Permanently (the resource has moved); <b>304</b> Not Modified (the cached copy is still valid)</td></tr>
      <tr><td class="mono">4xx</td><td>Client error</td><td><b>400</b> Bad Request (malformed request); <b>403</b> Forbidden (access denied); <b>404</b> Not Found (resource does not exist)</td></tr>
      <tr><td class="mono">5xx</td><td>Server error</td><td><b>500</b> Internal Server Error; <b>503</b> Service Unavailable (server overloaded or under maintenance)</td></tr>
    </tbody>
  </table></div>
</section>

<div data-extra="http"></div>

<section class="block">
  <h2>After the response</h2>
  <p>The response contains only the HTML. While parsing it, the browser finds the <b>additional resources</b> it needs: CSS style sheets, images, scripts. For each one it sends <b>another HTTP request</b>. Once it has what it needs, it lays out the page and <b>draws</b> it on the screen. A typical page requires dozens of requests.</p>
</section>

<section class="block">
  <h2>Versions</h2>
  <ul>
    <li><b>HTTP/1.1</b> — <b>text</b> messages, readable like the ones above.</li>
    <li><b>HTTP/2</b> — <b>binary</b> messages and several parallel requests over the same TCP connection.</li>
    <li><b>HTTP/3</b> — also binary, but carried by <b>QUIC</b>, a protocol built on UDP.</li>
  </ul>
  <p>The <b>semantics</b> are the same in every version: same methods, same headers, same status codes. Only the format in which messages are transmitted changes.</p>
  <p>HTTP/1.1 already introduced <b>persistent connections</b>: the same TCP connection is reused for several consecutive requests, avoiding a new handshake each time. HTTP/2 additionally allows several responses to travel at the same time over the same connection.</p>
</section>

<div data-ex="e3"></div>`
  },

  /* ===================================================== 1.6 */
  {
    id: '1.6', titolo: 'DNS', breve: 'DNS', esercitazione: null,
    sommario: 'People use names, the network uses numeric addresses. DNS is the distributed system that maps one to the other.',
    html: `
<section class="block">
  <h2>Purpose</h2>
  <p><span class="term">DNS</span> (<i>Domain Name System</i>) translates a readable name, such as <code>www.esempio.it</code>, into the server's <b>IP address</b>, such as <code>203.0.113.10</code>. It is the first step for every page opened and every email sent: without an IP address no connection can be opened.</p>
</section>

<section class="block">
  <h2>A hierarchy of servers</h2>
  <p>No server knows every name. The work is distributed according to the structure of the name, read from right to left:</p>
  <ul>
    <li><b>Root servers</b> — they do not know website addresses, but know which servers manage each TLD.</li>
    <li><b>TLD servers</b> — for example those for <code>.it</code>: they know which servers are authoritative for <code>esempio.it</code>.</li>
    <li><b>Authoritative servers</b> — those of the domain: they actually hold the records of <code>esempio.it</code> and give the final answer.</li>
  </ul>
  <p>The root servers are identified by thirteen names, from <code>a.root-servers.net</code> to <code>m.root-servers.net</code>, but each one is replicated in many copies around the world: thanks to a routing technique called <i>anycast</i>, a query automatically reaches the nearest copy.</p>
</section>

<section class="block">
  <h2>The role of the resolver</h2>
  <p>The user's computer does not query the root servers directly; it asks a <span class="term">recursive resolver</span>, usually the provider's or one configured in the system. The resolver queries the servers on behalf of the client and returns only the final answer.</p>
  <h3>Lookup order</h3>
  <ol>
    <li><b>Browser cache</b> — has the name been resolved recently?</li>
    <li><b>Operating system cache</b> and the <code>hosts</code> file.</li>
    <li><b>Resolver</b> — if it has the answer cached, it returns it immediately.</li>
    <li>Otherwise the resolver queries in turn: <b>root server → TLD server → authoritative server</b>.</li>
  </ol>
  <p>The answer is then cached at every level, so the next lookup is almost instantaneous.</p>
  <p>Two kinds of query can therefore be distinguished. The one from the client to the resolver is <b>recursive</b>: the client asks for the final answer. Those from the resolver to the root, TLD and authoritative servers are <b>iterative</b>: each server answers with what it knows, often a referral to the next server.</p>
</section>

<div data-extra="dns"></div>

<section class="block">
  <h2>The main records</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Type</th><th>Content</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td class="mono">A</td><td>An IPv4 address</td><td class="mono">www.esempio.it → 203.0.113.10</td></tr>
      <tr><td class="mono">AAAA</td><td>An IPv6 address</td><td class="mono">www.esempio.it → 2001:db8::1</td></tr>
      <tr><td class="mono">CNAME</td><td>An alias pointing to another name</td><td class="mono">blog.esempio.it → www.esempio.it</td></tr>
      <tr><td class="mono">NS</td><td>The domain's authoritative name servers</td><td class="mono">esempio.it → ns1.esempio.it</td></tr>
      <tr><td class="mono">MX</td><td>The server that receives mail for the domain, with a priority</td><td class="mono">esempio.it → 10 posta.esempio.it</td></tr>
    </tbody>
  </table></div>
  <p>Each record has a <span class="term">TTL</span> (<i>Time To Live</i>): the number of seconds it may stay in cache. When the TTL expires, the data must be requested again.</p>
</section>

<section class="block">
  <h2>Port and transport</h2>
  <p>DNS uses port <b>53</b>, normally over <b>UDP</b>: one question, one answer, no connection to open. It switches to <b>TCP</b> when the answer is too large for a UDP packet and for zone transfers between servers.</p>
</section>`
  },

  /* ===================================================== 1.7 */
  {
    id: '1.7', titolo: 'HTTPS and TLS', breve: 'HTTPS and TLS', esercitazione: null,
    sommario: 'HTTP travels in clear text. TLS builds an encrypted and authenticated channel around it, signalled by the padlock in the browser.',
    html: `
<section class="block">
  <h2>The risks of plain HTTP</h2>
  <ul>
    <li><b>Eavesdropping</b> — anyone on the same network (public Wi-Fi, a router) can read passwords and data.</li>
    <li><b>Tampering</b> — an intermediary can modify the page or inject content.</li>
    <li><b>Impersonation</b> — there is no way to verify that the intended server is really on the other side.</li>
  </ul>
</section>

<section class="block">
  <h2>What TLS guarantees</h2>
  <p><span class="term">TLS</span> (<i>Transport Layer Security</i>, the successor of SSL) answers the three risks with three guarantees:</p>
  <ul>
    <li><b>Confidentiality</b> — intercepted data cannot be read;</li>
    <li><b>Integrity</b> — any change in transit is detected;</li>
    <li><b>Server authentication</b> — the server proves its identity with a certificate.</li>
  </ul>
  <p><span class="term">HTTPS</span> is not a new protocol: it is <b>HTTP carried inside a TLS connection</b>, by default on port <b>443</b>. The HTTP messages are the same as in chapter 1.5, but they travel encrypted.</p>
</section>

<section class="block">
  <h2>Certificates and certificate authorities</h2>
  <p>A <b>certificate</b> is a digital document that binds a domain name to a public key. It is signed by a <b>certificate authority</b> (<i>CA</i>), an entity trusted by browsers and operating systems, which ship with a preinstalled list of them.</p>
  <p>When it receives a certificate, the browser checks that it is signed by a trusted CA, that it has not expired and that the name matches the requested site. If something is wrong, it shows a full-page warning.</p>
  <p>Certificates have a limited validity and must be renewed periodically. Those issued free of charge and automatically by <b>Let's Encrypt</b>, for example, last a few months: this is one of the reasons why the vast majority of sites now use HTTPS.</p>
</section>

<section class="block">
  <h2>The handshake, simplified</h2>
  <ol>
    <li><b>Client proposal</b>: supported TLS versions and algorithms, plus its own contribution to the key.</li>
    <li><b>Server reply</b>: it chooses the algorithms, sends its contribution and the <b>certificate</b>.</li>
    <li>The client verifies the certificate. From the exchanged contributions, <b>both compute the same session key</b>, without the key ever crossing the network.</li>
    <li>From this point on, communication is encrypted with <b>symmetric cryptography</b>, which is much more efficient: both sides use the same session key.</li>
  </ol>
  <p>Asymmetric cryptography (public and private key) is therefore used only at the beginning, for authentication and key agreement.</p>
  <p>With <b>TLS 1.3</b>, the current version, the handshake needs a single round trip before the client can send encrypted data; TLS 1.2 needed two. The earlier versions, SSL, TLS 1.0 and TLS 1.1, are considered insecure and are no longer accepted by browsers.</p>
</section>

<section class="block">
  <h2>Where TLS sits in the stack</h2>
<pre class="msg">  HTTP        <span class="c">← application</span>
  <span class="k">TLS</span>         <span class="c">← encrypts the data coming from above</span>
  TCP         <span class="c">← transport</span>
  IP</pre>
</section>

<section class="block note">
  <p><strong>Caution</strong> The padlock guarantees that the channel between the user and that server is encrypted and that the server holds a valid certificate for that name. <b>It does not guarantee that the site is trustworthy</b>: a phishing site can also hold a valid certificate for its own domain. The padlock certifies the confidentiality of the communication, not the honesty of the other party.</p>
</section>`
  },

  /* ===================================================== 1.8 */
  {
    id: '1.8', titolo: 'SMTP and POP3', breve: 'SMTP and POP3', esercitazione: 'e4',
    sommario: 'Email needs two different protocols: one carries the message towards its destination, the other lets the recipient collect it from the mailbox.',
    html: `
<section class="block">
  <h2>The actors</h2>
  <ul>
    <li><b>MUA</b> (<i>Mail User Agent</i>) — the user's mail program: Thunderbird, Outlook, the smartphone app.</li>
    <li><b>Sender's mail server</b> — receives the message from the MUA and takes care of delivering it.</li>
    <li><b>Recipient's mail server</b> — receives the message and stores it in the user's <b>mailbox</b>.</li>
  </ul>
</section>

<section class="block">
  <h2>SMTP: sending</h2>
  <p><span class="term">SMTP</span> (<i>Simple Mail Transfer Protocol</i>) handles the <b>sending</b> of mail over two legs:</p>
  <ul>
    <li>from the <b>client to its own server</b>, normally on port <b>587</b> (<i>submission</i>), with authentication;</li>
    <li>from the <b>sender's server to the recipient's server</b>, on port <b>25</b>.</li>
  </ul>
  <h3>Finding the destination server</h3>
  <p>The message is addressed to <code>luca@esempio.it</code>. The sender's server asks <b>DNS</b> for the <b>MX</b> record of <code>esempio.it</code> and obtains the name of the mail server, for example <code>posta.esempio.it</code>; it then requests its A record to get the IP address. This is the link with chapter 1.6: without DNS, mail could not be routed.</p>
</section>

<section class="block">
  <h2>An SMTP session</h2>
  <p>SMTP is a text protocol, like HTTP/1.1. <b>C</b> is the client, <b>S</b> the server:</p>
<pre class="msg">S: <span class="s">220</span> posta.esempio.it ESMTP ready
C: <span class="k">EHLO</span> mail.mittente.it
S: <span class="s">250</span>-posta.esempio.it
S: <span class="s">250</span> SIZE 35882577
C: <span class="k">MAIL FROM:</span>&lt;anna@mittente.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">RCPT TO:</span>&lt;luca@esempio.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">DATA</span>
S: <span class="s">354</span> Start mail input; end with a line containing a single dot
C: Subject: Meeting
C:
C: The meeting is confirmed for tomorrow.
C: <span class="k">.</span>
S: <span class="s">250</span> OK, message accepted
C: <span class="k">QUIT</span>
S: <span class="s">221</span> Closing connection</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td class="mono">220</td><td>Service ready (server greeting)</td></tr>
      <tr><td class="mono">250</td><td>Command completed</td></tr>
      <tr><td class="mono">354</td><td>Start sending the message text</td></tr>
      <tr><td class="mono">221</td><td>The server closes the connection</td></tr>
    </tbody>
  </table></div>
  <p>The <b>envelope</b> must be distinguished from the <b>message</b>. The <code>MAIL FROM</code> and <code>RCPT TO</code> commands form the envelope, used by servers for delivery. The <code>From:</code>, <code>To:</code>, <code>Subject:</code> and <code>Date:</code> lines sent after <code>DATA</code> are instead the message headers (RFC 5322), the ones shown by the mail program. Attachments are encoded as text according to the <b>MIME</b> standard.</p>
</section>

<div data-extra="smtp"></div>

<section class="block">
  <h2>POP3: retrieval</h2>
  <p><span class="term">POP3</span> (<i>Post Office Protocol, version 3</i>) lets the recipient <b>download</b> mail from their mailbox on the server. Port <b>110</b>, or <b>995</b> with TLS. The server replies with <code>+OK</code> or <code>-ERR</code>.</p>
<pre class="msg">S: <span class="s">+OK</span> POP3 ready
C: <span class="k">USER</span> luca
S: <span class="s">+OK</span>
C: <span class="k">PASS</span> ********
S: <span class="s">+OK</span> 2 messages
C: <span class="k">LIST</span>
S: <span class="s">+OK</span>
S: 1 1205
S: 2 830
S: .
C: <span class="k">RETR</span> 1          <span class="c">← downloads message 1</span>
S: <span class="s">+OK</span> …message text…
C: <span class="k">DELE</span> 1          <span class="c">← marks it for deletion</span>
S: <span class="s">+OK</span>
C: <span class="k">QUIT</span>            <span class="c">← only now are marked messages deleted</span>
S: <span class="s">+OK</span> session ended</pre>
</section>

<section class="block">
  <h2>Push and pull models</h2>
  <p><b>SMTP works in push mode</b>: the sender takes the initiative and carries the message towards its destination. <b>POP3 works in pull mode</b>: the recipient collects the messages whenever they choose. That is why two different protocols are needed: mail reaches the server even when the recipient's computer is switched off, and is collected at the next connection.</p>
</section>

<section class="block note">
  <p><strong>In depth: IMAP</strong> It is the modern alternative to POP3 (port 143, 993 with TLS). The main difference: IMAP <b>keeps messages on the server</b> and synchronises them, so the same mailbox can be read from both smartphone and computer. It is outside the syllabus of this course.</p>
</section>

<div data-ex="e4"></div>`
  }
]);
