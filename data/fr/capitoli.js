/* data/fr/capitoli.js — chapitres du Module 1 (français). Même structure que data/it/capitoli.js. */
DCS.i18n.add('fr', 'capitoli', [
  /* ===================================================== 1.1 */
  {
    id: '1.1', titolo: 'Introduction', breve: 'Introduction', esercitazione: null,
    sommario: 'Internet et le web ne sont pas synonymes. Avant de suivre le parcours d\'une page, il faut définir précisément les termes.',
    html: `
<section class="block">
  <h2>Internet et le web</h2>
  <p><span class="term">Internet</span> est le <b>réseau des réseaux</b> : des millions de réseaux hétérogènes (domestiques, scolaires, d'entreprise, de fournisseurs) interconnectés et capables d'échanger des données grâce aux mêmes protocoles, ceux de la famille TCP/IP.</p>
  <p>Le <span class="term">web</span> est <b>l'un des services</b> qui fonctionnent sur Internet : un ensemble de pages reliées par des liens, que le navigateur demande et affiche. Ce n'est pas le seul service : le même réseau transporte aussi le courrier électronique, le transfert de fichiers, les appels vidéo et les jeux en ligne.</p>
  <p>Un exemple : envoyer un courriel depuis une application de messagerie utilise Internet, mais pas le web. Ouvrir un site utilise les deux : le web comme service, Internet comme infrastructure de transport.</p>
</section>

<section class="block">
  <h2>Repères historiques</h2>
  <p>Le web naît au <b>CERN</b> de Genève. En 1989, <b>Tim Berners-Lee</b> propose un système de partage de documents entre chercheurs ; entre 1990 et 1991, il réalise le premier serveur web, le premier navigateur et le premier site, rendu accessible hors du CERN en 1991.</p>
  <p>Le projet repose sur trois éléments, repris dans ce cours :</p>
  <ul>
    <li><b>HTML</b> — le langage qui décrit une page ;</li>
    <li><b>URL</b> — l'adresse qui identifie chaque ressource (chapitre 1.4) ;</li>
    <li><b>HTTP</b> — le protocole par lequel le navigateur demande les pages et le serveur les envoie (chapitre 1.5).</li>
  </ul>
  <p>Le web repose sur une infrastructure plus ancienne. En 1969, le réseau <b>ARPANET</b> relie les quatre premiers nœuds universitaires aux États-Unis ; le 1er janvier 1983, il adopte officiellement les protocoles <b>TCP/IP</b>, date considérée comme la naissance de l'Internet moderne. En 1994, Berners-Lee fonde le <b>W3C</b> (<i>World Wide Web Consortium</i>), l'organisation qui élabore aujourd'hui encore les standards du web.</p>
</section>

<section class="block">
  <h2>Les deux questions du cours</h2>
  <p><b>1. Quelles étapes séparent la demande d'une page web de son affichage ?</b><br>
  En résumé : le navigateur analyse l'URL, demande au <b>DNS</b> l'adresse IP du serveur, ouvre une connexion <b>TCP</b>, la protège avec <b>TLS</b>, envoie une requête <b>HTTP</b>, reçoit la réponse et dessine la page. Chaque étape fait l'objet d'un chapitre.</p>
  <p><b>2. Comment un courriel parvient-il à son destinataire ?</b><br>
  Le logiciel de messagerie remet le message à son serveur avec <b>SMTP</b> ; ce serveur interroge le <b>DNS</b> pour trouver le serveur qui reçoit le courrier du domaine de destination et lui remet le message, toujours avec SMTP ; le destinataire le télécharge avec <b>POP3</b>.</p>
</section>

<section class="block">
  <h2>Plan du cours</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Chap.</th><th>Sujet</th><th>Question concernée</th></tr></thead>
    <tbody>
      <tr><td>1.2</td><td>Client et serveur : qui demande et qui répond</td><td>Les deux</td></tr>
      <tr><td>1.3</td><td>La pile TCP/IP, TCP et UDP, les ports</td><td>Les deux</td></tr>
      <tr><td>1.4</td><td>La structure d'une URL</td><td>Page web</td></tr>
      <tr><td>1.5</td><td>HTTP : requêtes, réponses, codes d'état</td><td>Page web</td></tr>
      <tr><td>1.6</td><td>DNS : du nom à l'adresse IP</td><td>Les deux</td></tr>
      <tr><td>1.7</td><td>HTTPS et TLS : la connexion sécurisée</td><td>Page web</td></tr>
      <tr><td>1.8</td><td>SMTP et POP3 : le parcours d'un courriel</td><td>Courrier électronique</td></tr>
    </tbody>
  </table></div>
</section>`
  },

  /* ===================================================== 1.2 */
  {
    id: '1.2', titolo: 'Le modèle client-serveur', breve: 'Client-serveur', esercitazione: 'e1',
    sommario: 'La plupart des services d\'Internet suivent le même schéma : un programme formule une demande, un autre la satisfait.',
    html: `
<section class="block">
  <h2>Deux rôles</h2>
  <p>Le <span class="term">client</span> est le programme qui <b>demande</b> un service : le navigateur qui veut une page, l'application de messagerie qui veut les nouveaux messages.</p>
  <p>Le <span class="term">serveur</span> est le programme qui <b>répond</b> et met à disposition les ressources : pages, fichiers, boîtes aux lettres, réponses DNS. Il attend les requêtes sur un port connu.</p>
  <p>Client et serveur sont des <b>rôles</b>, pas des types de machine. Le même ordinateur est client lorsqu'il ouvre un site et serveur si un serveur web y est installé. Un serveur de courrier, lorsqu'il remet un message à un autre serveur, joue à ce moment-là le rôle de client.</p>
  <p>Tous les services ne suivent pas ce schéma. Dans le modèle <span class="term">pair-à-pair</span> (P2P), chaque nœud est à la fois client et serveur : lors du partage de fichiers avec BitTorrent, par exemple, chaque ordinateur télécharge des morceaux du fichier auprès des autres tout en les mettant à leur disposition. Le web et le courrier électronique sont en revanche des services client-serveur.</p>
</section>

<section class="block">
  <h2>Règles de fonctionnement</h2>
  <ul>
    <li><b>La communication est toujours engagée par le client.</b> Le serveur n'envoie rien sans requête.</li>
    <li><b>Un serveur sert de nombreux clients</b>, y compris simultanément : un site très fréquenté répond à des milliers de navigateurs par seconde.</li>
    <li>Chaque échange suit le même cycle : <b>requête → traitement → réponse</b>.</li>
  </ul>
  <p>Les ports rendent le dialogue possible : le serveur écoute sur un <b>port connu</b> (80 pour HTTP), tandis que le client utilise un <b>port éphémère</b> attribué par le système d'exploitation, dans la plage recommandée par l'IANA, de 49152 à 65535. C'est pourquoi un même navigateur peut garder des dizaines d'onglets ouverts vers des serveurs différents sans confondre les réponses.</p>
</section>

<section class="block">
  <h2>Le cycle à travers un exemple</h2>
  <p>On ouvre <code>http://www.esempio.it/index.html</code>. Le navigateur (client) envoie au serveur une <b>requête</b> ; le serveur la <b>traite</b> (il localise le fichier <code>index.html</code>) et envoie la <b>réponse</b> avec le contenu. Sous une forme simplifiée, les deux messages HTTP sont les suivants :</p>
<pre class="msg"><span class="c"># requête : du client vers le serveur</span>
<span class="k">GET</span> /index.html HTTP/1.1
Host: www.esempio.it

<span class="c"># réponse : du serveur vers le client</span>
HTTP/1.1 <span class="s">200 OK</span>
Content-Type: text/html

&lt;html&gt;…&lt;/html&gt;</pre>
  <p>Le chapitre 1.5 en analyse la signification ligne par ligne.</p>
</section>

<div data-ex="e1"></div>`
  },

  /* ===================================================== 1.3 */
  {
    id: '1.3', titolo: 'La couche application et la pile TCP/IP', breve: 'Pile TCP/IP', esercitazione: 'e2',
    sommario: 'Un message HTTP ne voyage pas seul : il traverse une pile de couches, chacune ayant une tâche définie.',
    html: `
<section class="block">
  <h2>Les quatre couches du modèle TCP/IP</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Couche</th><th>Tâche</th><th>Exemples</th></tr></thead>
    <tbody>
      <tr><td><b>Application</b></td><td>Services utilisés par les programmes</td><td>HTTP, DNS, SMTP, POP3</td></tr>
      <tr><td><b>Transport</b></td><td>Communication entre processus, au moyen des ports</td><td>TCP, UDP</td></tr>
      <tr><td><b>Internet</b></td><td>Adressage et routage entre réseaux</td><td>IP</td></tr>
      <tr><td><b>Accès réseau</b></td><td>Transmission sur le support physique local</td><td>Ethernet, Wi-Fi</td></tr>
    </tbody>
  </table></div>
  <p>Le modèle <b>ISO/OSI</b> répartit le même travail sur <b>sept</b> couches : physique, liaison de données, réseau, transport, session, présentation, application. Les trois couches supérieures d'OSI (session, présentation, application) correspondent à la seule couche application de TCP/IP ; les deux inférieures (physique et liaison) à l'accès réseau.</p>
  <p>Chaque couche possède son propre système d'adresses. À la couche internet, l'<b>adresse IP</b> identifie l'hôte de destination sur tout le parcours ; à la couche d'accès réseau, l'<b>adresse MAC</b> identifie la carte réseau sur chaque tronçon local et change à chaque routeur traversé. Les <b>routeurs</b> opèrent jusqu'à la couche internet : ils lisent l'adresse IP de destination et choisissent vers quel réseau acheminer le paquet.</p>
</section>

<section class="block">
  <h2>La couche application</h2>
  <p>C'est la couche la plus proche de l'utilisateur. Y opèrent les protocoles étudiés dans ce cours, <b>HTTP, DNS, SMTP et POP3</b>, ainsi que les programmes qui les utilisent : navigateurs, serveurs web, clients de messagerie. Chaque protocole applicatif définit quels messages existent, leur structure et l'ordre dans lequel ils sont échangés.</p>
</section>

<section class="block">
  <h2>Encapsulation</h2>
  <p>Lorsque le navigateur envoie une requête HTTP, le message descend la pile et <b>chaque couche ajoute son propre en-tête</b> aux données reçues de la couche supérieure :</p>
<pre class="msg">[ Ethernet | IP | TCP | <span class="k">GET /index.html HTTP/1.1 …</span> ]
  accès      rés. transp. application</pre>
  <p>À la réception, le serveur effectue le chemin inverse : chaque couche retire son en-tête et transmet le reste à la couche supérieure, jusqu'à ce que le serveur web reçoive la requête HTTP sous sa forme d'origine.</p>
</section>

<section class="block">
  <h2>TCP et UDP</h2>
  <p><span class="term">TCP</span> est <b>fiable et orienté connexion</b> : avant de transmettre, il ouvre une connexion (poignée de main en trois temps : SYN, SYN-ACK, ACK), numérote les segments, les remet dans l'ordre et retransmet ceux qui sont perdus. Il est utilisé par HTTP (jusqu'à la version 2), SMTP et POP3, où aucun octet ne doit être perdu.</p>
  <p><span class="term">UDP</span> est <b>léger et sans connexion</b> : il envoie chaque message de façon indépendante, sans accusés de réception ni retransmissions, et démarre donc plus rapidement. Il est utilisé par le <b>DNS</b> dans la plupart des cas, car une question et une réponse tiennent normalement dans un seul paquet.</p>
</section>

<section class="block">
  <h2>Les ports : l'adresse IP désigne la machine, le port le service</h2>
  <p>Un même serveur peut héberger simultanément un serveur web, un serveur de courrier et un serveur DNS. L'adresse IP achemine le paquet vers la bonne machine ; le <span class="term">numéro de port</span> (de 0 à 65535) le remet au bon programme.</p>
  <p>Les ports 0 à 1023 sont les <b>well-known ports</b>, attribués par l'IANA aux services les plus courants. Le client utilise en revanche un port temporaire choisi par le système d'exploitation.</p>
  <p>Deux autres services de la couche application, brièvement : <b>FTP</b> permet le transfert de fichiers et utilise le port <b>21</b> pour les commandes ; <b>SSH</b> permet l'accès à distance chiffré à une autre machine et utilise le port <b>22</b>. Ils ne font pas partie du programme, mais apparaissent dans l'exercice E2.</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Service</th><th>Port</th><th>Transport</th></tr></thead>
    <tbody>
      <tr><td>HTTP</td><td class="mono">80</td><td>TCP</td></tr>
      <tr><td>HTTPS</td><td class="mono">443</td><td>TCP</td></tr>
      <tr><td>DNS</td><td class="mono">53</td><td>UDP (TCP pour les réponses volumineuses)</td></tr>
      <tr><td>SMTP</td><td class="mono">25 entre serveurs, 587 envoi depuis le client</td><td>TCP</td></tr>
      <tr><td>POP3</td><td class="mono">110 (995 avec TLS)</td><td>TCP</td></tr>
      <tr><td>FTP (commandes)</td><td class="mono">21</td><td>TCP</td></tr>
      <tr><td>SSH</td><td class="mono">22</td><td>TCP</td></tr>
    </tbody>
  </table></div>
  <p>Le couple formé par une adresse IP et un port s'appelle un <span class="term">socket</span>. Une connexion TCP est identifiée par les sockets de ses deux extrémités : par exemple, <code>192.0.2.5:51234 → 203.0.113.10:443</code> désigne un navigateur qui, depuis le port éphémère 51234, communique avec un serveur HTTPS.</p>
</section>

<div data-ex="e2"></div>`
  },

  /* ===================================================== 1.4 */
  {
    id: '1.4', titolo: 'URL', breve: 'URL', esercitazione: null,
    sommario: 'Chaque ressource du web possède une adresse. Savoir la lire permet d\'anticiper une grande partie de ce que fera le navigateur.',
    html: `
<section class="block">
  <h2>La structure d'une URL</h2>
  <p>Une <span class="term">URL</span> (<i>Uniform Resource Locator</i>) indique où se trouve une ressource et comment y accéder. Considérons celle-ci :</p>
<pre class="msg"><span class="k">https</span>://<span class="s">www.esempio.it</span>:443/corso/1.4?lingua=it#esempio</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Partie</th><th>Dans l'exemple</th><th>Fonction</th></tr></thead>
    <tbody>
      <tr><td><b>Schéma</b></td><td class="mono">https</td><td>Le protocole à utiliser</td></tr>
      <tr><td><b>Hôte</b></td><td class="mono">www.esempio.it</td><td>Le nom du serveur</td></tr>
      <tr><td><b>Port</b></td><td class="mono">:443</td><td>Facultatif : s'il est absent, on utilise celui par défaut du schéma (80 pour http, 443 pour https)</td></tr>
      <tr><td><b>Chemin</b></td><td class="mono">/corso/1.4</td><td>La ressource demandée sur le serveur</td></tr>
      <tr><td><b>Requête (query)</b></td><td class="mono">?lingua=it</td><td>Paramètres sous forme de paires nom=valeur, séparées par &amp;</td></tr>
      <tr><td><b>Fragment</b></td><td class="mono">#esempio</td><td>Un point précis à l'intérieur de la page</td></tr>
    </tbody>
  </table></div>
  <p>Seul un ensemble limité de caractères est admis dans une URL. Les autres, comme l'espace ou les lettres accentuées, sont convertis par l'<b>encodage-pourcent</b> : chaque octet devient <code>%</code> suivi de deux chiffres hexadécimaux. L'espace, par exemple, devient <code>%20</code> : le chemin <code>/mes photos</code> s'écrit <code>/mes%20photos</code>.</p>
</section>

<section class="block note">
  <p><strong>Remarque</strong> Tout ce qui suit le caractère <code>#</code> reste dans le navigateur et <b>n'est pas envoyé au serveur</b>. Le navigateur se sert du fragment pour faire défiler la page jusqu'à une section ou, comme sur ce site, pour changer de chapitre sans recharger la page.</p>
</section>

<section class="block">
  <h2>La structure d'un nom de domaine</h2>
  <p>Un nom comme <code>www.esempio.it</code> se lit <b>de droite à gauche</b>, du général au particulier :</p>
  <ul>
    <li><b>racine</b> — le point final, normalement sous-entendu : <code>www.esempio.it<b>.</b></code></li>
    <li><b>domaine de premier niveau (TLD)</b> — <code>it</code> (ou <code>com</code>, <code>org</code>…)</li>
    <li><b>domaine de second niveau</b> — <code>esempio</code>, celui qu'enregistre une organisation</li>
    <li><b>sous-domaines</b> — <code>www</code>, <code>posta</code>, <code>corsi</code>…, définis par le titulaire du domaine</li>
  </ul>
  <p>Le DNS parcourt la même hiérarchie pour obtenir l'adresse IP (chapitre 1.6).</p>
</section>

<section class="block">
  <h2>À quelle étape sert chaque partie de l'URL</h2>
  <ul>
    <li>L'<b>hôte</b> est transmis au <b>DNS</b>, qui le traduit en adresse IP.</li>
    <li><b>Schéma et port</b> déterminent la <b>connexion</b> : à quel port se connecter et si TLS est nécessaire.</li>
    <li><b>Chemin et requête</b> figurent dans la <b>requête HTTP</b> : <code>GET /corso/1.4?lingua=it HTTP/1.1</code>.</li>
    <li>Le <b>fragment</b> reste dans le navigateur.</li>
  </ul>
  <p>Une URL peut aussi être <b>relative</b> : dans un lien comme <code>&lt;a href="contact.html"&gt;</code>, le schéma et l'hôte sont absents, et le navigateur les déduit de l'adresse de la page courante. Les URL <b>absolues</b>, avec toutes leurs parties, servent à créer des liens vers d'autres sites.</p>
</section>

<div data-extra="url"></div>`
  },

  /* ===================================================== 1.5 */
  {
    id: '1.5', titolo: 'HTTP', breve: 'HTTP', esercitazione: 'e3',
    sommario: 'HTTP est le protocole par lequel navigateur et serveur communiquent : des messages textuels à structure fixe et un petit nombre de méthodes.',
    html: `
<section class="block">
  <h2>Requête, réponse et absence d'état</h2>
  <p><span class="term">HTTP</span> (<i>HyperText Transfer Protocol</i>) suit le modèle <b>requête-réponse</b> : le client envoie une requête, le serveur répond. Il utilise par défaut le port <b>80</b>.</p>
  <p>C'est un protocole <b>sans état</b> (<i>stateless</i>) : chaque requête est indépendante et le serveur, de lui-même, ne garde aucune mémoire des précédentes. Pour reconnaître un utilisateur (panier, authentification), on utilise les <span class="term">cookies</span> : le serveur en envoie un avec l'en-tête <code>Set-Cookie</code> et le navigateur le renvoie dans les requêtes suivantes avec l'en-tête <code>Cookie</code>.</p>
</section>

<section class="block">
  <h2>La structure d'une requête</h2>
<pre class="msg"><span class="k">GET /index.html HTTP/1.1</span>      <span class="c">← ligne de requête : méthode, chemin, version</span>
Host: www.esempio.it          <span class="c">← en-tête (obligatoire en HTTP/1.1)</span>
User-Agent: Mozilla/5.0       <span class="c">← en-tête</span>
Accept: text/html             <span class="c">← en-tête</span>
                              <span class="c">← ligne vide : fin des en-têtes</span>
                              <span class="c">  (suit le corps éventuel, p. ex. les données d'un formulaire)</span></pre>
  <p>Chaque <b>en-tête</b> est une ligne de la forme <code>Nom: valeur</code>. La <b>ligne vide</b> est obligatoire : elle signale au serveur la fin des en-têtes.</p>
</section>

<section class="block">
  <h2>Les principales méthodes</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Méthode</th><th>Opération demandée</th></tr></thead>
    <tbody>
      <tr><td class="mono">GET</td><td>Obtenir une ressource</td></tr>
      <tr><td class="mono">POST</td><td>Envoyer des données à traiter (un formulaire, un commentaire)</td></tr>
      <tr><td class="mono">PUT</td><td>Créer ou remplacer une ressource à un chemin donné</td></tr>
      <tr><td class="mono">DELETE</td><td>Supprimer une ressource</td></tr>
      <tr><td class="mono">HEAD</td><td>Comme GET, mais le serveur ne renvoie que les en-têtes, sans corps</td></tr>
    </tbody>
  </table></div>
  <p>Une méthode est <b>sûre</b> si elle ne modifie pas l'état du serveur (GET, HEAD). Elle est <b>idempotente</b> si la répéter plusieurs fois produit le même effet qu'une exécution unique (GET, HEAD, PUT, DELETE). POST n'est ni sûre ni idempotente : c'est pourquoi le navigateur demande une confirmation avant de renvoyer un formulaire.</p>
</section>

<section class="block">
  <h2>La structure d'une réponse</h2>
<pre class="msg"><span class="k">HTTP/1.1 200 OK</span>               <span class="c">← ligne d'état : version, code, message</span>
Date: Mon, 16 Nov 2026 10:00:00 GMT
Server: nginx
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
                              <span class="c">← ligne vide</span>
&lt;!DOCTYPE html&gt;&lt;html&gt;…        <span class="c">← corps : la page</span></pre>
  <p>Certains en-têtes de réponse sont essentiels. <code>Content-Type</code> indique le <span class="term">type MIME</span> du corps, c'est-à-dire la façon de l'interpréter : <code>text/html</code> pour une page, <code>text/css</code> pour une feuille de style, <code>image/png</code> pour une image, <code>application/json</code> pour des données structurées. <code>Content-Length</code> indique la longueur du corps en octets. Avec un code 3xx, le serveur ajoute l'en-tête <code>Location</code>, qui contient la nouvelle adresse ; avec <code>Cache-Control</code>, il précise pendant combien de temps le navigateur peut réutiliser la copie reçue.</p>
</section>

<section class="block">
  <h2>Codes d'état</h2>
  <p>Le premier chiffre indique la <b>classe</b> :</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Classe</th><th>Signification</th><th>Exemples</th></tr></thead>
    <tbody>
      <tr><td class="mono">1xx</td><td>Information</td><td>100 Continue</td></tr>
      <tr><td class="mono">2xx</td><td>Succès</td><td><b>200 OK</b></td></tr>
      <tr><td class="mono">3xx</td><td>Redirection</td><td><b>301</b> Moved Permanently (la ressource a été déplacée) ; <b>304</b> Not Modified (la copie en cache est toujours valide)</td></tr>
      <tr><td class="mono">4xx</td><td>Erreur du client</td><td><b>400</b> Bad Request (requête mal formée) ; <b>403</b> Forbidden (accès refusé) ; <b>404</b> Not Found (ressource inexistante)</td></tr>
      <tr><td class="mono">5xx</td><td>Erreur du serveur</td><td><b>500</b> Internal Server Error ; <b>503</b> Service Unavailable (serveur surchargé ou en maintenance)</td></tr>
    </tbody>
  </table></div>
</section>

<div data-extra="http"></div>

<section class="block">
  <h2>Après la réponse</h2>
  <p>La réponse ne contient que le HTML. En l'analysant, le navigateur repère les <b>ressources supplémentaires</b> nécessaires : feuilles de style CSS, images, scripts. Pour chacune, il envoie <b>une nouvelle requête HTTP</b>. Une fois tout obtenu, il compose la page et la <b>dessine</b> à l'écran. Une page ordinaire nécessite des dizaines de requêtes.</p>
</section>

<section class="block">
  <h2>Les versions</h2>
  <ul>
    <li><b>HTTP/1.1</b> — messages <b>textuels</b>, lisibles comme ceux ci-dessus.</li>
    <li><b>HTTP/2</b> — messages <b>binaires</b> et plusieurs requêtes en parallèle sur la même connexion TCP.</li>
    <li><b>HTTP/3</b> — également binaire, mais transporté par <b>QUIC</b>, un protocole fondé sur UDP.</li>
  </ul>
  <p>La <b>sémantique</b> est commune à toutes les versions : mêmes méthodes, mêmes en-têtes, mêmes codes d'état. Seul change le format de transmission des messages.</p>
  <p>HTTP/1.1 introduit déjà les <b>connexions persistantes</b> : la même connexion TCP est réutilisée pour plusieurs requêtes successives, sans répéter à chaque fois la poignée de main. HTTP/2 permet en outre de transmettre plusieurs réponses simultanément sur la même connexion.</p>
</section>

<div data-ex="e3"></div>`
  },

  /* ===================================================== 1.6 */
  {
    id: '1.6', titolo: 'DNS', breve: 'DNS', esercitazione: null,
    sommario: 'Les utilisateurs emploient des noms, le réseau des adresses numériques. Le DNS est le système distribué qui les fait correspondre.',
    html: `
<section class="block">
  <h2>Fonction</h2>
  <p>Le <span class="term">DNS</span> (<i>Domain Name System</i>) traduit un nom lisible, comme <code>www.esempio.it</code>, en <b>adresse IP</b> du serveur, comme <code>203.0.113.10</code>. C'est la première étape de chaque page ouverte et de chaque courriel envoyé : sans adresse IP, aucune connexion n'est possible.</p>
</section>

<section class="block">
  <h2>Une hiérarchie de serveurs</h2>
  <p>Aucun serveur ne connaît tous les noms. Le travail est réparti selon la structure du nom, lu de droite à gauche :</p>
  <ul>
    <li><b>Serveurs racine</b> (<i>root</i>) — ils ne connaissent pas les adresses des sites, mais savent quels serveurs gèrent chaque TLD.</li>
    <li><b>Serveurs des TLD</b> — par exemple ceux de <code>.it</code> : ils savent quels serveurs font autorité pour <code>esempio.it</code>.</li>
    <li><b>Serveurs faisant autorité</b> — ceux du domaine : ils détiennent réellement les enregistrements de <code>esempio.it</code> et donnent la réponse définitive.</li>
  </ul>
  <p>Les serveurs racine sont identifiés par treize noms, de <code>a.root-servers.net</code> à <code>m.root-servers.net</code>, mais chacun est répliqué en de nombreuses copies réparties dans le monde : grâce à une technique de routage appelée <i>anycast</i>, la requête atteint automatiquement la copie la plus proche.</p>
</section>

<section class="block">
  <h2>Le rôle du résolveur</h2>
  <p>L'ordinateur de l'utilisateur n'interroge pas directement les serveurs racine : il s'adresse à un <span class="term">résolveur récursif</span>, généralement celui du fournisseur d'accès ou un résolveur configuré dans le système. Le résolveur interroge les serveurs pour le compte du client et ne lui renvoie que la réponse finale.</p>
  <h3>Ordre de recherche</h3>
  <ol>
    <li><b>Cache du navigateur</b> — le nom a-t-il été résolu récemment ?</li>
    <li><b>Cache du système d'exploitation</b> et fichier <code>hosts</code>.</li>
    <li><b>Résolveur</b> — s'il a la réponse en cache, il la renvoie immédiatement.</li>
    <li>Sinon, le résolveur interroge successivement : <b>serveur racine → serveur du TLD → serveur faisant autorité</b>.</li>
  </ol>
  <p>La réponse est ensuite mise en cache à chaque niveau, de sorte que la requête suivante soit quasi instantanée.</p>
  <p>On distingue donc deux types d'interrogation. Celle du client vers le résolveur est <b>récursive</b> : le client demande la réponse définitive. Celles du résolveur vers les serveurs racine, TLD et faisant autorité sont <b>itératives</b> : chaque serveur répond avec ce qu'il sait, souvent un renvoi vers le serveur suivant.</p>
</section>

<div data-extra="dns"></div>

<section class="block">
  <h2>Les principaux enregistrements</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Type</th><th>Contenu</th><th>Exemple</th></tr></thead>
    <tbody>
      <tr><td class="mono">A</td><td>Une adresse IPv4</td><td class="mono">www.esempio.it → 203.0.113.10</td></tr>
      <tr><td class="mono">AAAA</td><td>Une adresse IPv6</td><td class="mono">www.esempio.it → 2001:db8::1</td></tr>
      <tr><td class="mono">CNAME</td><td>Un alias vers un autre nom</td><td class="mono">blog.esempio.it → www.esempio.it</td></tr>
      <tr><td class="mono">NS</td><td>Les serveurs de noms faisant autorité pour le domaine</td><td class="mono">esempio.it → ns1.esempio.it</td></tr>
      <tr><td class="mono">MX</td><td>Le serveur qui reçoit le courrier du domaine, avec une priorité</td><td class="mono">esempio.it → 10 posta.esempio.it</td></tr>
    </tbody>
  </table></div>
  <p>Chaque enregistrement possède un <span class="term">TTL</span> (<i>Time To Live</i>) : le nombre de secondes pendant lesquelles il peut rester en cache. À l'expiration du TTL, la donnée doit être redemandée.</p>
</section>

<section class="block">
  <h2>Port et transport</h2>
  <p>Le DNS utilise le port <b>53</b>, normalement sur <b>UDP</b> : une question, une réponse, aucune connexion à ouvrir. Il recourt à <b>TCP</b> lorsque la réponse dépasse la taille d'un paquet UDP et pour les transferts de zone entre serveurs.</p>
</section>`
  },

  /* ===================================================== 1.7 */
  {
    id: '1.7', titolo: 'HTTPS et TLS', breve: 'HTTPS et TLS', esercitazione: null,
    sommario: 'HTTP circule en clair. TLS construit autour de lui un canal chiffré et authentifié, signalé par le cadenas du navigateur.',
    html: `
<section class="block">
  <h2>Les risques de HTTP en clair</h2>
  <ul>
    <li><b>Interception</b> — toute personne présente sur le même réseau (un Wi-Fi public, un routeur) peut lire mots de passe et données.</li>
    <li><b>Altération</b> — un intermédiaire peut modifier la page ou y insérer du contenu.</li>
    <li><b>Usurpation d'identité</b> — rien ne permet de vérifier que le serveur souhaité se trouve réellement de l'autre côté.</li>
  </ul>
</section>

<section class="block">
  <h2>Les garanties de TLS</h2>
  <p><span class="term">TLS</span> (<i>Transport Layer Security</i>, successeur de SSL) répond aux trois risques par trois garanties :</p>
  <ul>
    <li><b>Confidentialité</b> — les données interceptées sont illisibles ;</li>
    <li><b>Intégrité</b> — toute modification en transit est détectée ;</li>
    <li><b>Authentification du serveur</b> — le serveur prouve son identité au moyen d'un certificat.</li>
  </ul>
  <p><span class="term">HTTPS</span> n'est pas un nouveau protocole : c'est <b>HTTP transporté dans une connexion TLS</b>, par défaut sur le port <b>443</b>. Les messages HTTP sont les mêmes qu'au chapitre 1.5, mais ils circulent chiffrés.</p>
</section>

<section class="block">
  <h2>Certificats et autorités de certification</h2>
  <p>Le <b>certificat</b> est un document numérique qui associe un nom de domaine à une clé publique. Il est signé par une <b>autorité de certification</b> (<i>CA</i>), un organisme auquel font confiance les navigateurs et les systèmes d'exploitation, qui en intègrent une liste préinstallée.</p>
  <p>À la réception d'un certificat, le navigateur vérifie qu'il est signé par une CA de confiance, qu'il n'a pas expiré et que le nom correspond au site demandé. En cas d'anomalie, il affiche un avertissement en pleine page.</p>
  <p>Les certificats ont une validité limitée et doivent être renouvelés régulièrement. Ceux que délivre gratuitement et automatiquement <b>Let's Encrypt</b>, par exemple, durent quelques mois : c'est l'une des raisons pour lesquelles la grande majorité des sites utilisent aujourd'hui HTTPS.</p>
</section>

<section class="block">
  <h2>La négociation, sous une forme simplifiée</h2>
  <ol>
    <li><b>Proposition du client</b> : versions de TLS et algorithmes pris en charge, ainsi que sa propre contribution à la clé.</li>
    <li><b>Réponse du serveur</b> : il choisit les algorithmes, envoie sa contribution et le <b>certificat</b>.</li>
    <li>Le client vérifie le certificat. À partir des contributions échangées, <b>les deux parties calculent la même clé de session</b>, sans que celle-ci ne transite jamais sur le réseau.</li>
    <li>Dès lors, la communication est chiffrée par <b>cryptographie symétrique</b>, bien plus efficace : les deux parties utilisent la même clé de session.</li>
  </ol>
  <p>La cryptographie asymétrique (clé publique et clé privée) n'intervient donc qu'au début, pour l'authentification et la négociation de la clé.</p>
  <p>Avec <b>TLS 1.3</b>, la version actuelle, la négociation ne nécessite qu'un seul aller-retour avant que le client puisse envoyer des données chiffrées ; TLS 1.2 en nécessitait deux. Les versions antérieures, SSL, TLS 1.0 et TLS 1.1, sont jugées non sûres et ne sont plus acceptées par les navigateurs.</p>
</section>

<section class="block">
  <h2>La place de TLS dans la pile</h2>
<pre class="msg">  HTTP        <span class="c">← application</span>
  <span class="k">TLS</span>         <span class="c">← chiffre les données venant d'au-dessus</span>
  TCP         <span class="c">← transport</span>
  IP</pre>
</section>

<section class="block note">
  <p><strong>Attention</strong> Le cadenas garantit que le canal entre l'utilisateur et ce serveur est chiffré et que le serveur possède un certificat valide pour ce nom. <b>Il ne garantit pas la fiabilité du site</b> : un site d'hameçonnage peut lui aussi disposer d'un certificat valide pour son propre domaine. Le cadenas atteste la confidentialité de la communication, non l'honnêteté de l'interlocuteur.</p>
</section>`
  },

  /* ===================================================== 1.8 */
  {
    id: '1.8', titolo: 'SMTP et POP3', breve: 'SMTP et POP3', esercitazione: 'e4',
    sommario: 'Le courrier électronique nécessite deux protocoles distincts : l\'un achemine le message vers sa destination, l\'autre permet de le relever dans la boîte aux lettres.',
    html: `
<section class="block">
  <h2>Les acteurs</h2>
  <ul>
    <li><b>MUA</b> (<i>Mail User Agent</i>) — le logiciel de messagerie de l'utilisateur : Thunderbird, Outlook, l'application du smartphone.</li>
    <li><b>Serveur de courrier de l'expéditeur</b> — reçoit le message du MUA et se charge de sa remise.</li>
    <li><b>Serveur de courrier du destinataire</b> — reçoit le message et le dépose dans la <b>boîte aux lettres</b> de l'utilisateur.</li>
  </ul>
</section>

<section class="block">
  <h2>SMTP : l'envoi</h2>
  <p><span class="term">SMTP</span> (<i>Simple Mail Transfer Protocol</i>) assure l'<b>envoi</b> du courrier en deux tronçons :</p>
  <ul>
    <li>du <b>client vers son propre serveur</b>, normalement sur le port <b>587</b> (<i>submission</i>), avec authentification ;</li>
    <li>du <b>serveur de l'expéditeur vers le serveur du destinataire</b>, sur le port <b>25</b>.</li>
  </ul>
  <h3>Comment le serveur de destination est-il trouvé ?</h3>
  <p>Le message est adressé à <code>luca@esempio.it</code>. Le serveur de l'expéditeur demande au <b>DNS</b> l'enregistrement <b>MX</b> de <code>esempio.it</code> et obtient le nom du serveur de courrier, par exemple <code>posta.esempio.it</code> ; il en demande ensuite l'enregistrement A pour obtenir l'adresse IP. C'est le lien avec le chapitre 1.6 : sans DNS, le courrier ne pourrait pas être acheminé.</p>
</section>

<section class="block">
  <h2>Une session SMTP</h2>
  <p>SMTP est un protocole textuel, comme HTTP/1.1. <b>C</b> désigne le client, <b>S</b> le serveur :</p>
<pre class="msg">S: <span class="s">220</span> posta.esempio.it ESMTP prêt
C: <span class="k">EHLO</span> mail.mittente.it
S: <span class="s">250</span>-posta.esempio.it
S: <span class="s">250</span> SIZE 35882577
C: <span class="k">MAIL FROM:</span>&lt;anna@mittente.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">RCPT TO:</span>&lt;luca@esempio.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">DATA</span>
S: <span class="s">354</span> Envoyez le message ; terminez par une ligne contenant un seul point
C: Subject: Réunion
C:
C: La réunion est confirmée pour demain.
C: <span class="k">.</span>
S: <span class="s">250</span> OK, message accepté
C: <span class="k">QUIT</span>
S: <span class="s">221</span> Fermeture de la connexion</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Code</th><th>Signification</th></tr></thead>
    <tbody>
      <tr><td class="mono">220</td><td>Service prêt (message d'accueil du serveur)</td></tr>
      <tr><td class="mono">250</td><td>Commande exécutée</td></tr>
      <tr><td class="mono">354</td><td>Début de la transmission du texte du message</td></tr>
      <tr><td class="mono">221</td><td>Le serveur ferme la connexion</td></tr>
    </tbody>
  </table></div>
  <p>Il faut distinguer l'<b>enveloppe</b> du <b>message</b>. Les commandes <code>MAIL FROM</code> et <code>RCPT TO</code> constituent l'enveloppe, utilisée par les serveurs pour la remise. Les lignes <code>From:</code>, <code>To:</code>, <code>Subject:</code> et <code>Date:</code> envoyées après <code>DATA</code> sont en revanche les en-têtes du message (RFC 5322), ceux qu'affiche le logiciel de messagerie. Les pièces jointes sont codées sous forme de texte selon la norme <b>MIME</b>.</p>
</section>

<div data-extra="smtp"></div>

<section class="block">
  <h2>POP3 : le relevé</h2>
  <p><span class="term">POP3</span> (<i>Post Office Protocol, version 3</i>) permet au destinataire de <b>télécharger</b> le courrier depuis sa boîte aux lettres sur le serveur. Port <b>110</b>, ou <b>995</b> avec TLS. Le serveur répond par <code>+OK</code> ou <code>-ERR</code>.</p>
<pre class="msg">S: <span class="s">+OK</span> POP3 prêt
C: <span class="k">USER</span> luca
S: <span class="s">+OK</span>
C: <span class="k">PASS</span> ********
S: <span class="s">+OK</span> 2 messages
C: <span class="k">LIST</span>
S: <span class="s">+OK</span>
S: 1 1205
S: 2 830
S: .
C: <span class="k">RETR</span> 1          <span class="c">← télécharge le message 1</span>
S: <span class="s">+OK</span> …texte du message…
C: <span class="k">DELE</span> 1          <span class="c">← le marque pour suppression</span>
S: <span class="s">+OK</span>
C: <span class="k">QUIT</span>            <span class="c">← c'est seulement maintenant que les messages marqués sont supprimés</span>
S: <span class="s">+OK</span> session terminée</pre>
</section>

<section class="block">
  <h2>Modèle push et modèle pull</h2>
  <p><b>SMTP fonctionne en mode push</b> : c'est l'expéditeur qui prend l'initiative et achemine le message vers sa destination. <b>POP3 fonctionne en mode pull</b> : c'est le destinataire qui, lorsqu'il le souhaite, relève ses messages. C'est pourquoi deux protocoles distincts sont nécessaires : le courrier parvient au serveur même lorsque l'ordinateur du destinataire est éteint, et il est relevé à la connexion suivante.</p>
</section>

<section class="block note">
  <p><strong>Approfondissement : IMAP</strong> C'est l'alternative moderne à POP3 (port 143, 993 avec TLS). La principale différence : IMAP <b>conserve les messages sur le serveur</b> et les synchronise, ce qui permet de consulter la même boîte depuis un smartphone et un ordinateur. Il ne fait pas partie du programme du cours.</p>
</section>

<div data-ex="e4"></div>`
  }
]);
