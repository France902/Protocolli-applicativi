/* data/es/capitoli.js — capítulos del Módulo 1 (español). Misma estructura que data/it/capitoli.js. */
DCS.i18n.add('es', 'capitoli', [
  /* ===================================================== 1.1 */
  {
    id: '1.1', titolo: 'Introducción', breve: 'Introducción', esercitazione: null,
    sommario: 'Internet y la web no son sinónimos. Antes de seguir el recorrido de una página, conviene definir con precisión los términos.',
    html: `
<section class="block">
  <h2>Internet y la web</h2>
  <p><span class="term">Internet</span> es la <b>red de redes</b>: millones de redes heterogéneas (domésticas, escolares, empresariales, de proveedores) interconectadas y capaces de intercambiar datos gracias a los mismos protocolos, los de la familia TCP/IP.</p>
  <p>La <span class="term">web</span> es <b>uno de los servicios</b> que funcionan sobre Internet: un conjunto de páginas enlazadas que el navegador solicita y muestra. No es el único servicio: por la misma red circulan también el correo electrónico, la transferencia de archivos, las videollamadas y los juegos en línea.</p>
  <p>Un ejemplo: enviar un correo desde una aplicación de correo utiliza Internet, pero no la web. Abrir un sitio utiliza ambas: la web como servicio, Internet como infraestructura de transporte.</p>
</section>

<section class="block">
  <h2>Antecedentes históricos</h2>
  <p>La web nace en el <b>CERN</b> de Ginebra. En 1989 <b>Tim Berners-Lee</b> propone un sistema para compartir documentos entre investigadores; entre 1990 y 1991 crea el primer servidor web, el primer navegador y el primer sitio, accesible también fuera del CERN en 1991.</p>
  <p>El proyecto se basa en tres elementos, que se retoman en el curso:</p>
  <ul>
    <li><b>HTML</b> — el lenguaje con el que se describe una página;</li>
    <li><b>URL</b> — la dirección que identifica cada recurso (capítulo 1.4);</li>
    <li><b>HTTP</b> — el protocolo con el que el navegador solicita las páginas y el servidor las envía (capítulo 1.5).</li>
  </ul>
  <p>La web se apoya en una infraestructura más antigua. En 1969 la red <b>ARPANET</b> conecta los primeros cuatro nodos universitarios en Estados Unidos; el 1 de enero de 1983 adopta oficialmente los protocolos <b>TCP/IP</b>, fecha considerada el nacimiento de la Internet moderna. En 1994 Berners-Lee funda el <b>W3C</b> (<i>World Wide Web Consortium</i>), la organización que aún hoy desarrolla los estándares de la web.</p>
</section>

<section class="block">
  <h2>Las dos preguntas del curso</h2>
  <p><b>1. ¿Qué pasos separan la solicitud de una página web de su visualización?</b><br>
  En resumen: el navegador analiza la URL, pide al <b>DNS</b> la dirección IP del servidor, abre una conexión <b>TCP</b>, la protege con <b>TLS</b>, envía una solicitud <b>HTTP</b>, recibe la respuesta y dibuja la página. Cada paso tiene su capítulo.</p>
  <p><b>2. ¿Cómo llega un mensaje de correo electrónico a su destinatario?</b><br>
  El programa de correo entrega el mensaje a su servidor con <b>SMTP</b>; ese servidor consulta al <b>DNS</b> qué servidor recibe el correo del dominio de destino y se lo entrega, también con SMTP; el destinatario lo descarga con <b>POP3</b>.</p>
</section>

<section class="block">
  <h2>Mapa del curso</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Cap.</th><th>Tema</th><th>Pregunta relacionada</th></tr></thead>
    <tbody>
      <tr><td>1.2</td><td>Cliente y servidor: quién solicita y quién responde</td><td>Ambas</td></tr>
      <tr><td>1.3</td><td>La pila TCP/IP, TCP y UDP, los puertos</td><td>Ambas</td></tr>
      <tr><td>1.4</td><td>La estructura de una URL</td><td>Página web</td></tr>
      <tr><td>1.5</td><td>HTTP: solicitudes, respuestas, códigos de estado</td><td>Página web</td></tr>
      <tr><td>1.6</td><td>DNS: del nombre a la dirección IP</td><td>Ambas</td></tr>
      <tr><td>1.7</td><td>HTTPS y TLS: la conexión segura</td><td>Página web</td></tr>
      <tr><td>1.8</td><td>SMTP y POP3: el recorrido de un correo</td><td>Correo electrónico</td></tr>
    </tbody>
  </table></div>
</section>`
  },

  /* ===================================================== 1.2 */
  {
    id: '1.2', titolo: 'El modelo cliente-servidor', breve: 'Cliente-servidor', esercitazione: 'e1',
    sommario: 'La mayoría de los servicios de Internet sigue el mismo esquema: un programa formula una solicitud y otro la atiende.',
    html: `
<section class="block">
  <h2>Dos roles</h2>
  <p>El <span class="term">cliente</span> es el programa que <b>solicita</b> un servicio: el navegador que quiere una página, la aplicación de correo que quiere los mensajes nuevos.</p>
  <p>El <span class="term">servidor</span> es el programa que <b>responde</b> y ofrece los recursos: páginas, archivos, buzones de correo, respuestas DNS. Espera solicitudes en un puerto conocido.</p>
  <p>Cliente y servidor son <b>roles</b>, no tipos de máquina. El mismo ordenador actúa como cliente cuando abre un sitio y como servidor si tiene instalado un servidor web. Un servidor de correo, cuando entrega un mensaje a otro servidor, actúa en ese momento como cliente.</p>
  <p>No todos los servicios siguen este esquema. En el modelo <span class="term">peer-to-peer</span> (P2P) cada nodo es a la vez cliente y servidor: en el intercambio de archivos con BitTorrent, por ejemplo, cada ordenador descarga partes del archivo de los demás y al mismo tiempo las pone a su disposición. La web y el correo electrónico, en cambio, son servicios cliente-servidor.</p>
</section>

<section class="block">
  <h2>Reglas de funcionamiento</h2>
  <ul>
    <li><b>La comunicación la inicia el cliente.</b> El servidor no envía nada sin una solicitud.</li>
    <li><b>Un servidor atiende a muchos clientes</b>, incluso a la vez: un sitio muy visitado responde a miles de navegadores por segundo.</li>
    <li>Cada intercambio sigue el mismo ciclo: <b>solicitud → procesamiento → respuesta</b>.</li>
  </ul>
  <p>Los puertos hacen posible el diálogo: el servidor escucha en un <b>puerto conocido</b> (80 para HTTP), mientras que el cliente usa un <b>puerto efímero</b> asignado por el sistema operativo, en el intervalo recomendado por la IANA, de 49152 a 65535. Por eso el mismo navegador puede mantener abiertas decenas de pestañas hacia servidores distintos sin confundir las respuestas.</p>
</section>

<section class="block">
  <h2>El ciclo en un ejemplo</h2>
  <p>Se abre <code>http://www.esempio.it/index.html</code>. El navegador (cliente) envía al servidor una <b>solicitud</b>; el servidor la <b>procesa</b> (localiza el archivo <code>index.html</code>) y envía la <b>respuesta</b> con el contenido. De forma simplificada, los dos mensajes HTTP son los siguientes:</p>
<pre class="msg"><span class="c"># solicitud: del cliente al servidor</span>
<span class="k">GET</span> /index.html HTTP/1.1
Host: www.esempio.it

<span class="c"># respuesta: del servidor al cliente</span>
HTTP/1.1 <span class="s">200 OK</span>
Content-Type: text/html

&lt;html&gt;…&lt;/html&gt;</pre>
  <p>El capítulo 1.5 analiza su significado línea por línea.</p>
</section>

<div data-ex="e1"></div>`
  },

  /* ===================================================== 1.3 */
  {
    id: '1.3', titolo: 'La capa de aplicación y la pila TCP/IP', breve: 'Pila TCP/IP', esercitazione: 'e2',
    sommario: 'Un mensaje HTTP no viaja aislado: atraviesa una pila de capas, cada una con una tarea definida.',
    html: `
<section class="block">
  <h2>Las cuatro capas del modelo TCP/IP</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Capa</th><th>Tarea</th><th>Ejemplos</th></tr></thead>
    <tbody>
      <tr><td><b>Aplicación</b></td><td>Servicios que utilizan los programas</td><td>HTTP, DNS, SMTP, POP3</td></tr>
      <tr><td><b>Transporte</b></td><td>Comunicación entre procesos, mediante los puertos</td><td>TCP, UDP</td></tr>
      <tr><td><b>Internet</b></td><td>Direccionamiento y encaminamiento entre redes</td><td>IP</td></tr>
      <tr><td><b>Acceso a la red</b></td><td>Transmisión sobre el medio físico local</td><td>Ethernet, Wi-Fi</td></tr>
    </tbody>
  </table></div>
  <p>El modelo <b>ISO/OSI</b> divide el mismo trabajo en <b>siete</b> capas: física, enlace de datos, red, transporte, sesión, presentación, aplicación. Las tres capas superiores de OSI (sesión, presentación, aplicación) corresponden a la única capa de aplicación de TCP/IP; las dos inferiores (física y enlace) al acceso a la red.</p>
  <p>Cada capa utiliza su propio sistema de direcciones. En la capa de internet la <b>dirección IP</b> identifica el host de destino a lo largo de todo el recorrido; en la capa de acceso a la red la <b>dirección MAC</b> identifica la tarjeta de red en cada tramo local y cambia en cada router atravesado. Los <b>routers</b> operan hasta la capa de internet: leen la dirección IP de destino y eligen hacia qué red reenviar el paquete.</p>
</section>

<section class="block">
  <h2>La capa de aplicación</h2>
  <p>Es la capa más cercana al usuario. En ella operan los protocolos del curso, <b>HTTP, DNS, SMTP y POP3</b>, y los programas que los utilizan: navegadores, servidores web, clientes de correo. Cada protocolo de aplicación define qué mensajes existen, qué estructura tienen y en qué orden se intercambian.</p>
</section>

<section class="block">
  <h2>Encapsulación</h2>
  <p>Cuando el navegador envía una solicitud HTTP, el mensaje desciende por la pila y <b>cada capa añade su propia cabecera</b> a los datos recibidos de la capa superior:</p>
<pre class="msg">[ Ethernet | IP | TCP | <span class="k">GET /index.html HTTP/1.1 …</span> ]
  acceso     red  transp. aplicación</pre>
  <p>Al recibirlo, el servidor recorre el camino inverso: cada capa elimina su cabecera y entrega el resto a la capa superior, hasta que el servidor web recibe la solicitud HTTP en su forma original.</p>
</section>

<section class="block">
  <h2>TCP y UDP</h2>
  <p><span class="term">TCP</span> es <b>fiable y orientado a la conexión</b>: antes de transmitir abre una conexión (saludo en tres pasos: SYN, SYN-ACK, ACK), numera los segmentos, los reordena y retransmite los perdidos. Lo utilizan HTTP (hasta la versión 2), SMTP y POP3, donde no puede perderse ni un byte.</p>
  <p><span class="term">UDP</span> es <b>ligero y sin conexión</b>: envía cada mensaje de forma independiente, sin confirmaciones ni retransmisiones, por lo que es más rápido de iniciar. Lo utiliza el <b>DNS</b> en la mayoría de los casos, porque una pregunta y una respuesta caben normalmente en un solo paquete.</p>
</section>

<section class="block">
  <h2>Puertos: la dirección IP localiza la máquina, el puerto el servicio</h2>
  <p>En un mismo servidor pueden funcionar a la vez un servidor web, uno de correo y uno DNS. La dirección IP lleva el paquete a la máquina correcta; el <span class="term">número de puerto</span> (de 0 a 65535) lo entrega al programa correcto.</p>
  <p>Los puertos de 0 a 1023 son los <b>well-known ports</b>, asignados por la IANA a los servicios más comunes. El cliente, en cambio, utiliza un puerto temporal elegido por el sistema operativo.</p>
  <p>Otros dos servicios de la capa de aplicación, brevemente: <b>FTP</b> permite transferir archivos y usa el puerto <b>21</b> para los comandos; <b>SSH</b> permite el acceso remoto cifrado a otra máquina y usa el puerto <b>22</b>. No forman parte del temario, pero aparecen en el ejercicio E2.</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Servicio</th><th>Puerto</th><th>Transporte</th></tr></thead>
    <tbody>
      <tr><td>HTTP</td><td class="mono">80</td><td>TCP</td></tr>
      <tr><td>HTTPS</td><td class="mono">443</td><td>TCP</td></tr>
      <tr><td>DNS</td><td class="mono">53</td><td>UDP (TCP para respuestas grandes)</td></tr>
      <tr><td>SMTP</td><td class="mono">25 entre servidores, 587 envío desde el cliente</td><td>TCP</td></tr>
      <tr><td>POP3</td><td class="mono">110 (995 con TLS)</td><td>TCP</td></tr>
      <tr><td>FTP (comandos)</td><td class="mono">21</td><td>TCP</td></tr>
      <tr><td>SSH</td><td class="mono">22</td><td>TCP</td></tr>
    </tbody>
  </table></div>
  <p>El par formado por dirección IP y puerto se llama <span class="term">socket</span>. Una conexión TCP se identifica por los sockets de sus dos extremos: por ejemplo, <code>192.0.2.5:51234 → 203.0.113.10:443</code> indica un navegador que, desde el puerto efímero 51234, se comunica con un servidor HTTPS.</p>
</section>

<div data-ex="e2"></div>`
  },

  /* ===================================================== 1.4 */
  {
    id: '1.4', titolo: 'URL', breve: 'URL', esercitazione: null,
    sommario: 'Cada recurso de la web tiene una dirección. Saber leerla anticipa buena parte de lo que hará el navegador.',
    html: `
<section class="block">
  <h2>La estructura de una URL</h2>
  <p>Una <span class="term">URL</span> (<i>Uniform Resource Locator</i>) indica dónde se encuentra un recurso y cómo llegar a él. Considérese la siguiente:</p>
<pre class="msg"><span class="k">https</span>://<span class="s">www.esempio.it</span>:443/corso/1.4?lingua=it#esempio</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Parte</th><th>En el ejemplo</th><th>Función</th></tr></thead>
    <tbody>
      <tr><td><b>Esquema</b></td><td class="mono">https</td><td>El protocolo que se utilizará</td></tr>
      <tr><td><b>Host</b></td><td class="mono">www.esempio.it</td><td>El nombre del servidor</td></tr>
      <tr><td><b>Puerto</b></td><td class="mono">:443</td><td>Opcional: si falta se usa el predeterminado del esquema (80 para http, 443 para https)</td></tr>
      <tr><td><b>Ruta</b></td><td class="mono">/corso/1.4</td><td>El recurso solicitado en el servidor</td></tr>
      <tr><td><b>Consulta</b></td><td class="mono">?lingua=it</td><td>Parámetros en pares nombre=valor, separados por &amp;</td></tr>
      <tr><td><b>Fragmento</b></td><td class="mono">#esempio</td><td>Un punto concreto dentro de la página</td></tr>
    </tbody>
  </table></div>
  <p>En una URL solo se admite un conjunto limitado de caracteres. Los demás, como el espacio o las letras acentuadas, se convierten mediante la <b>codificación por porcentaje</b>: cada byte se convierte en <code>%</code> seguido de dos cifras hexadecimales. El espacio, por ejemplo, se convierte en <code>%20</code>: la ruta <code>/mis fotos</code> se escribe <code>/mis%20fotos</code>.</p>
</section>

<section class="block note">
  <p><strong>Nota</strong> Todo lo que sigue al carácter <code>#</code> se queda en el navegador y <b>no se envía al servidor</b>. El navegador usa el fragmento para desplazarse hasta una sección o, como en este sitio, para cambiar de capítulo sin recargar la página.</p>
</section>

<section class="block">
  <h2>La estructura de un nombre de dominio</h2>
  <p>Un nombre como <code>www.esempio.it</code> se lee <b>de derecha a izquierda</b>, de lo general a lo particular:</p>
  <ul>
    <li><b>raíz</b> — el punto final, normalmente implícito: <code>www.esempio.it<b>.</b></code></li>
    <li><b>dominio de primer nivel (TLD)</b> — <code>it</code> (o <code>com</code>, <code>org</code>…)</li>
    <li><b>dominio de segundo nivel</b> — <code>esempio</code>, el que registra una organización</li>
    <li><b>subdominios</b> — <code>www</code>, <code>posta</code>, <code>corsi</code>…, definidos por el titular del dominio</li>
  </ul>
  <p>El DNS recorre la misma jerarquía para obtener la dirección IP (capítulo 1.6).</p>
</section>

<section class="block">
  <h2>Qué parte de la URL sirve a cada paso</h2>
  <ul>
    <li>El <b>host</b> se envía al <b>DNS</b>, que lo traduce en una dirección IP.</li>
    <li><b>Esquema y puerto</b> determinan la <b>conexión</b>: a qué puerto conectarse y si se necesita TLS.</li>
    <li><b>Ruta y consulta</b> aparecen en la <b>solicitud HTTP</b>: <code>GET /corso/1.4?lingua=it HTTP/1.1</code>.</li>
    <li>El <b>fragmento</b> se queda en el navegador.</li>
  </ul>
  <p>Una URL también puede ser <b>relativa</b>: en un enlace como <code>&lt;a href="contacto.html"&gt;</code> faltan el esquema y el host, que el navegador deduce de la dirección de la página actual. Las URL <b>absolutas</b>, con todas sus partes, sirven para enlazar con otros sitios.</p>
</section>

<div data-extra="url"></div>`
  },

  /* ===================================================== 1.5 */
  {
    id: '1.5', titolo: 'HTTP', breve: 'HTTP', esercitazione: 'e3',
    sommario: 'HTTP es el protocolo con el que se comunican navegador y servidor: mensajes de texto con una estructura fija y pocos métodos.',
    html: `
<section class="block">
  <h2>Solicitud, respuesta y ausencia de estado</h2>
  <p><span class="term">HTTP</span> (<i>HyperText Transfer Protocol</i>) sigue el modelo <b>solicitud-respuesta</b>: el cliente envía una solicitud y el servidor responde. Utiliza por defecto el puerto <b>80</b>.</p>
  <p>Es un protocolo <b>sin estado</b> (<i>stateless</i>): cada solicitud es independiente y el servidor, por sí mismo, no recuerda las anteriores. Para reconocer a un usuario (carrito, inicio de sesión) se utilizan las <span class="term">cookies</span>: el servidor envía una con la cabecera <code>Set-Cookie</code> y el navegador la devuelve en las solicitudes siguientes con la cabecera <code>Cookie</code>.</p>
</section>

<section class="block">
  <h2>La estructura de una solicitud</h2>
<pre class="msg"><span class="k">GET /index.html HTTP/1.1</span>      <span class="c">← línea de solicitud: método, ruta, versión</span>
Host: www.esempio.it          <span class="c">← cabecera (obligatoria en HTTP/1.1)</span>
User-Agent: Mozilla/5.0       <span class="c">← cabecera</span>
Accept: text/html             <span class="c">← cabecera</span>
                              <span class="c">← línea vacía: fin de las cabeceras</span>
                              <span class="c">  (sigue el cuerpo opcional, p. ej. los datos de un formulario)</span></pre>
  <p>Cada <b>cabecera</b> es una línea de la forma <code>Nombre: valor</code>. La <b>línea vacía</b> es obligatoria: indica al servidor que las cabeceras han terminado.</p>
</section>

<section class="block">
  <h2>Los métodos principales</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Método</th><th>Operación solicitada</th></tr></thead>
    <tbody>
      <tr><td class="mono">GET</td><td>Obtener un recurso</td></tr>
      <tr><td class="mono">POST</td><td>Enviar datos para procesar (un formulario, un comentario)</td></tr>
      <tr><td class="mono">PUT</td><td>Crear o sustituir un recurso en una ruta determinada</td></tr>
      <tr><td class="mono">DELETE</td><td>Eliminar un recurso</td></tr>
      <tr><td class="mono">HEAD</td><td>Como GET, pero el servidor devuelve solo las cabeceras, sin cuerpo</td></tr>
    </tbody>
  </table></div>
  <p>Un método es <b>seguro</b> si no modifica el estado del servidor (GET, HEAD). Es <b>idempotente</b> si repetirlo varias veces produce el mismo efecto que ejecutarlo una sola vez (GET, HEAD, PUT, DELETE). POST no es ni seguro ni idempotente: por eso el navegador pide confirmación antes de reenviar un formulario.</p>
</section>

<section class="block">
  <h2>La estructura de una respuesta</h2>
<pre class="msg"><span class="k">HTTP/1.1 200 OK</span>               <span class="c">← línea de estado: versión, código, mensaje</span>
Date: Mon, 16 Nov 2026 10:00:00 GMT
Server: nginx
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
                              <span class="c">← línea vacía</span>
&lt;!DOCTYPE html&gt;&lt;html&gt;…        <span class="c">← cuerpo: la página</span></pre>
  <p>Algunas cabeceras de la respuesta son fundamentales. <code>Content-Type</code> indica el <span class="term">tipo MIME</span> del cuerpo, es decir, cómo interpretarlo: <code>text/html</code> para una página, <code>text/css</code> para una hoja de estilo, <code>image/png</code> para una imagen, <code>application/json</code> para datos estructurados. <code>Content-Length</code> indica la longitud del cuerpo en bytes. Con un código 3xx el servidor añade la cabecera <code>Location</code>, que contiene la nueva dirección; con <code>Cache-Control</code> establece durante cuánto tiempo el navegador puede reutilizar la copia recibida.</p>
</section>

<section class="block">
  <h2>Códigos de estado</h2>
  <p>La primera cifra indica la <b>clase</b>:</p>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Clase</th><th>Significado</th><th>Ejemplos</th></tr></thead>
    <tbody>
      <tr><td class="mono">1xx</td><td>Informativo</td><td>100 Continue</td></tr>
      <tr><td class="mono">2xx</td><td>Éxito</td><td><b>200 OK</b></td></tr>
      <tr><td class="mono">3xx</td><td>Redirección</td><td><b>301</b> Moved Permanently (el recurso se ha trasladado); <b>304</b> Not Modified (la copia en caché sigue siendo válida)</td></tr>
      <tr><td class="mono">4xx</td><td>Error del cliente</td><td><b>400</b> Bad Request (solicitud mal formada); <b>403</b> Forbidden (acceso denegado); <b>404</b> Not Found (recurso inexistente)</td></tr>
      <tr><td class="mono">5xx</td><td>Error del servidor</td><td><b>500</b> Internal Server Error; <b>503</b> Service Unavailable (servidor sobrecargado o en mantenimiento)</td></tr>
    </tbody>
  </table></div>
</section>

<div data-extra="http"></div>

<section class="block">
  <h2>Después de la respuesta</h2>
  <p>La respuesta contiene solo el HTML. Al analizarlo, el navegador detecta los <b>recursos adicionales</b> necesarios: hojas de estilo CSS, imágenes, scripts. Para cada uno envía <b>otra solicitud HTTP</b>. Cuando dispone de todo, compone la página y la <b>dibuja</b> en la pantalla. Una página típica requiere decenas de solicitudes.</p>
</section>

<section class="block">
  <h2>Las versiones</h2>
  <ul>
    <li><b>HTTP/1.1</b> — mensajes <b>de texto</b>, legibles como los anteriores.</li>
    <li><b>HTTP/2</b> — mensajes <b>binarios</b> y varias solicitudes en paralelo sobre la misma conexión TCP.</li>
    <li><b>HTTP/3</b> — también binario, pero transportado por <b>QUIC</b>, un protocolo basado en UDP.</li>
  </ul>
  <p>La <b>semántica</b> es común a todas las versiones: mismos métodos, mismas cabeceras, mismos códigos de estado. Solo cambia el formato en que se transmiten los mensajes.</p>
  <p>Ya HTTP/1.1 introduce las <b>conexiones persistentes</b>: la misma conexión TCP se reutiliza para varias solicitudes consecutivas, sin repetir cada vez el saludo inicial. HTTP/2 permite además transmitir varias respuestas a la vez por la misma conexión.</p>
</section>

<div data-ex="e3"></div>`
  },

  /* ===================================================== 1.6 */
  {
    id: '1.6', titolo: 'DNS', breve: 'DNS', esercitazione: null,
    sommario: 'Las personas usan nombres; la red, direcciones numéricas. El DNS es el sistema distribuido que los pone en correspondencia.',
    html: `
<section class="block">
  <h2>Función</h2>
  <p>El <span class="term">DNS</span> (<i>Domain Name System</i>) traduce un nombre legible, como <code>www.esempio.it</code>, en la <b>dirección IP</b> del servidor, como <code>203.0.113.10</code>. Es el primer paso de cada página abierta y de cada correo enviado: sin dirección IP no se puede abrir ninguna conexión.</p>
</section>

<section class="block">
  <h2>Una jerarquía de servidores</h2>
  <p>Ningún servidor conoce todos los nombres. El trabajo se reparte según la estructura del nombre, leído de derecha a izquierda:</p>
  <ul>
    <li><b>Servidores raíz</b> (<i>root</i>) — no conocen las direcciones de los sitios, pero saben qué servidores gestionan cada TLD.</li>
    <li><b>Servidores de los TLD</b> — por ejemplo los de <code>.it</code>: saben qué servidores son autoritativos para <code>esempio.it</code>.</li>
    <li><b>Servidores autoritativos</b> — los del dominio: conocen realmente los registros de <code>esempio.it</code> y dan la respuesta definitiva.</li>
  </ul>
  <p>Los servidores raíz se identifican con trece nombres, de <code>a.root-servers.net</code> a <code>m.root-servers.net</code>, pero cada uno está replicado en muchas copias repartidas por el mundo: gracias a una técnica de encaminamiento llamada <i>anycast</i>, la consulta llega automáticamente a la copia más cercana.</p>
</section>

<section class="block">
  <h2>El papel del resolver</h2>
  <p>El ordenador del usuario no consulta directamente los servidores raíz, sino que recurre a un <span class="term">resolver recursivo</span>, normalmente el del proveedor o uno configurado en el sistema. El resolver consulta los servidores en nombre del cliente y le devuelve solo la respuesta final.</p>
  <h3>Orden de búsqueda</h3>
  <ol>
    <li><b>Caché del navegador</b> — ¿se ha resuelto el nombre recientemente?</li>
    <li><b>Caché del sistema operativo</b> y archivo <code>hosts</code>.</li>
    <li><b>Resolver</b> — si tiene la respuesta en caché, la devuelve de inmediato.</li>
    <li>En caso contrario, el resolver consulta sucesivamente: <b>servidor raíz → servidor del TLD → servidor autoritativo</b>.</li>
  </ol>
  <p>La respuesta se guarda después en caché en cada nivel, de modo que la siguiente consulta sea casi instantánea.</p>
  <p>Se distinguen por tanto dos tipos de consulta. La del cliente al resolver es <b>recursiva</b>: el cliente pide la respuesta definitiva. Las del resolver a los servidores raíz, TLD y autoritativo son <b>iterativas</b>: cada servidor responde con lo que sabe, a menudo una remisión al servidor siguiente.</p>
</section>

<div data-extra="dns"></div>

<section class="block">
  <h2>Los registros principales</h2>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Tipo</th><th>Contenido</th><th>Ejemplo</th></tr></thead>
    <tbody>
      <tr><td class="mono">A</td><td>Una dirección IPv4</td><td class="mono">www.esempio.it → 203.0.113.10</td></tr>
      <tr><td class="mono">AAAA</td><td>Una dirección IPv6</td><td class="mono">www.esempio.it → 2001:db8::1</td></tr>
      <tr><td class="mono">CNAME</td><td>Un alias hacia otro nombre</td><td class="mono">blog.esempio.it → www.esempio.it</td></tr>
      <tr><td class="mono">NS</td><td>Los servidores de nombres autoritativos del dominio</td><td class="mono">esempio.it → ns1.esempio.it</td></tr>
      <tr><td class="mono">MX</td><td>El servidor que recibe el correo del dominio, con una prioridad</td><td class="mono">esempio.it → 10 posta.esempio.it</td></tr>
    </tbody>
  </table></div>
  <p>Cada registro tiene un <span class="term">TTL</span> (<i>Time To Live</i>): el número de segundos que puede permanecer en caché. Cuando el TTL caduca, el dato debe solicitarse de nuevo.</p>
</section>

<section class="block">
  <h2>Puerto y transporte</h2>
  <p>El DNS utiliza el puerto <b>53</b>, normalmente sobre <b>UDP</b>: una pregunta, una respuesta, ninguna conexión que abrir. Recurre a <b>TCP</b> cuando la respuesta supera el tamaño de un paquete UDP y para las transferencias de zona entre servidores.</p>
</section>`
  },

  /* ===================================================== 1.7 */
  {
    id: '1.7', titolo: 'HTTPS y TLS', breve: 'HTTPS y TLS', esercitazione: null,
    sommario: 'HTTP viaja en claro. TLS construye a su alrededor un canal cifrado y autenticado, señalado por el candado del navegador.',
    html: `
<section class="block">
  <h2>Los riesgos de HTTP en claro</h2>
  <ul>
    <li><b>Interceptación</b> — quien se encuentra en la misma red (una wifi pública, un router) puede leer contraseñas y datos.</li>
    <li><b>Alteración</b> — un intermediario puede modificar la página o insertar contenidos.</li>
    <li><b>Suplantación</b> — no es posible comprobar que al otro lado esté realmente el servidor deseado.</li>
  </ul>
</section>

<section class="block">
  <h2>Las garantías de TLS</h2>
  <p><span class="term">TLS</span> (<i>Transport Layer Security</i>, sucesor de SSL) responde a los tres riesgos con tres garantías:</p>
  <ul>
    <li><b>Confidencialidad</b> — los datos resultan ilegibles para quien los intercepta;</li>
    <li><b>Integridad</b> — cualquier modificación durante el tránsito se detecta;</li>
    <li><b>Autenticación del servidor</b> — el servidor demuestra su identidad mediante un certificado.</li>
  </ul>
  <p><span class="term">HTTPS</span> no es un protocolo nuevo: es <b>HTTP transportado dentro de una conexión TLS</b>, por defecto en el puerto <b>443</b>. Los mensajes HTTP son los mismos del capítulo 1.5, pero viajan cifrados.</p>
</section>

<section class="block">
  <h2>Certificados y autoridades de certificación</h2>
  <p>El <b>certificado</b> es un documento digital que asocia un nombre de dominio a una clave pública. Lo firma una <b>autoridad de certificación</b> (<i>CA</i>), una entidad en la que confían navegadores y sistemas operativos, que incluyen una lista preinstalada.</p>
  <p>Al recibir un certificado, el navegador comprueba que esté firmado por una CA de confianza, que no haya caducado y que el nombre coincida con el sitio solicitado. Si algo no cuadra, muestra un aviso a página completa.</p>
  <p>Los certificados tienen una validez limitada y deben renovarse periódicamente. Los que emite <b>Let's Encrypt</b> de forma gratuita y automática, por ejemplo, duran pocos meses: es una de las razones por las que hoy la gran mayoría de los sitios usa HTTPS.</p>
</section>

<section class="block">
  <h2>La negociación, de forma simplificada</h2>
  <ol>
    <li><b>Propuesta del cliente</b>: versiones de TLS y algoritmos admitidos, junto con su propia contribución a la clave.</li>
    <li><b>Respuesta del servidor</b>: elige los algoritmos, envía su contribución y el <b>certificado</b>.</li>
    <li>El cliente verifica el certificado. A partir de las contribuciones intercambiadas, <b>ambos calculan la misma clave de sesión</b>, sin que esta viaje nunca por la red.</li>
    <li>A partir de ese momento la comunicación se cifra con <b>criptografía simétrica</b>, mucho más eficiente: ambas partes usan la misma clave de sesión.</li>
  </ol>
  <p>La criptografía asimétrica (clave pública y privada) interviene por tanto solo al principio, para la autenticación y la negociación de la clave.</p>
  <p>Con <b>TLS 1.3</b>, la versión actual, la negociación requiere un solo intercambio de ida y vuelta antes de que el cliente pueda enviar datos cifrados; TLS 1.2 requería dos. Las versiones anteriores, SSL, TLS 1.0 y TLS 1.1, se consideran inseguras y los navegadores ya no las aceptan.</p>
</section>

<section class="block">
  <h2>La posición de TLS en la pila</h2>
<pre class="msg">  HTTP        <span class="c">← aplicación</span>
  <span class="k">TLS</span>         <span class="c">← cifra los datos que llegan de arriba</span>
  TCP         <span class="c">← transporte</span>
  IP</pre>
</section>

<section class="block note">
  <p><strong>Atención</strong> El candado garantiza que el canal entre el usuario y ese servidor está cifrado y que el servidor posee un certificado válido para ese nombre. <b>No garantiza que el sitio sea fiable</b>: también un sitio de phishing puede tener un certificado válido para su propio dominio. El candado acredita la confidencialidad de la comunicación, no la honradez del interlocutor.</p>
</section>`
  },

  /* ===================================================== 1.8 */
  {
    id: '1.8', titolo: 'SMTP y POP3', breve: 'SMTP y POP3', esercitazione: 'e4',
    sommario: 'El correo electrónico requiere dos protocolos distintos: uno lleva el mensaje hacia su destino y el otro permite recogerlo del buzón.',
    html: `
<section class="block">
  <h2>Los actores</h2>
  <ul>
    <li><b>MUA</b> (<i>Mail User Agent</i>) — el programa de correo del usuario: Thunderbird, Outlook, la aplicación del smartphone.</li>
    <li><b>Servidor de correo del remitente</b> — recibe el mensaje del MUA y se encarga de entregarlo.</li>
    <li><b>Servidor de correo del destinatario</b> — recibe el mensaje y lo deposita en el <b>buzón</b> del usuario.</li>
  </ul>
</section>

<section class="block">
  <h2>SMTP: el envío</h2>
  <p><span class="term">SMTP</span> (<i>Simple Mail Transfer Protocol</i>) gestiona el <b>envío</b> del correo en dos tramos:</p>
  <ul>
    <li>del <b>cliente a su propio servidor</b>, normalmente en el puerto <b>587</b> (<i>submission</i>), con autenticación;</li>
    <li>del <b>servidor del remitente al servidor del destinatario</b>, en el puerto <b>25</b>.</li>
  </ul>
  <h3>Cómo se localiza el servidor de destino</h3>
  <p>El mensaje va dirigido a <code>luca@esempio.it</code>. El servidor del remitente consulta al <b>DNS</b> el registro <b>MX</b> de <code>esempio.it</code> y obtiene el nombre del servidor de correo, por ejemplo <code>posta.esempio.it</code>; después solicita su registro A para obtener la dirección IP. Es el vínculo con el capítulo 1.6: sin DNS, el correo no podría encaminarse.</p>
</section>

<section class="block">
  <h2>Una sesión SMTP</h2>
  <p>SMTP es un protocolo de texto, como HTTP/1.1. <b>C</b> es el cliente y <b>S</b> el servidor:</p>
<pre class="msg">S: <span class="s">220</span> posta.esempio.it ESMTP listo
C: <span class="k">EHLO</span> mail.mittente.it
S: <span class="s">250</span>-posta.esempio.it
S: <span class="s">250</span> SIZE 35882577
C: <span class="k">MAIL FROM:</span>&lt;anna@mittente.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">RCPT TO:</span>&lt;luca@esempio.it&gt;
S: <span class="s">250</span> OK
C: <span class="k">DATA</span>
S: <span class="s">354</span> Envíe el mensaje; termine con una línea que contenga un solo punto
C: Subject: Reunión
C:
C: La reunión queda confirmada para mañana.
C: <span class="k">.</span>
S: <span class="s">250</span> OK, mensaje aceptado
C: <span class="k">QUIT</span>
S: <span class="s">221</span> Cierre de la conexión</pre>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Código</th><th>Significado</th></tr></thead>
    <tbody>
      <tr><td class="mono">220</td><td>Servicio listo (saludo inicial del servidor)</td></tr>
      <tr><td class="mono">250</td><td>Comando ejecutado</td></tr>
      <tr><td class="mono">354</td><td>Inicio de la transmisión del texto del mensaje</td></tr>
      <tr><td class="mono">221</td><td>El servidor cierra la conexión</td></tr>
    </tbody>
  </table></div>
  <p>Hay que distinguir el <b>sobre</b> del <b>mensaje</b>. Los comandos <code>MAIL FROM</code> y <code>RCPT TO</code> forman el sobre, que los servidores usan para la entrega. Las líneas <code>From:</code>, <code>To:</code>, <code>Subject:</code> y <code>Date:</code> enviadas tras <code>DATA</code> son en cambio las cabeceras del mensaje (RFC 5322), las que muestra el programa de correo. Los archivos adjuntos se codifican como texto según el estándar <b>MIME</b>.</p>
</section>

<div data-extra="smtp"></div>

<section class="block">
  <h2>POP3: la recogida</h2>
  <p><span class="term">POP3</span> (<i>Post Office Protocol, versión 3</i>) permite al destinatario <b>descargar</b> el correo de su buzón en el servidor. Puerto <b>110</b>, o <b>995</b> con TLS. El servidor responde con <code>+OK</code> o <code>-ERR</code>.</p>
<pre class="msg">S: <span class="s">+OK</span> POP3 listo
C: <span class="k">USER</span> luca
S: <span class="s">+OK</span>
C: <span class="k">PASS</span> ********
S: <span class="s">+OK</span> 2 mensajes
C: <span class="k">LIST</span>
S: <span class="s">+OK</span>
S: 1 1205
S: 2 830
S: .
C: <span class="k">RETR</span> 1          <span class="c">← descarga el mensaje 1</span>
S: <span class="s">+OK</span> …texto del mensaje…
C: <span class="k">DELE</span> 1          <span class="c">← lo marca para su eliminación</span>
S: <span class="s">+OK</span>
C: <span class="k">QUIT</span>            <span class="c">← solo ahora se eliminan los mensajes marcados</span>
S: <span class="s">+OK</span> sesión finalizada</pre>
</section>

<section class="block">
  <h2>Modelo push y modelo pull</h2>
  <p><b>SMTP funciona en modo push</b>: es el remitente quien toma la iniciativa y lleva el mensaje hacia su destino. <b>POP3 funciona en modo pull</b>: es el destinatario quien, cuando lo considera oportuno, recoge los mensajes. Por eso se necesitan dos protocolos distintos: el correo llega al servidor aunque el ordenador del destinatario esté apagado, y se recoge en la siguiente conexión.</p>
</section>

<section class="block note">
  <p><strong>En detalle: IMAP</strong> Es la alternativa moderna a POP3 (puerto 143, 993 con TLS). La diferencia principal: IMAP <b>mantiene los mensajes en el servidor</b> y los sincroniza, de modo que el mismo buzón puede consultarse desde el smartphone y el ordenador. No forma parte del temario del curso.</p>
</section>

<div data-ex="e4"></div>`
  }
]);
