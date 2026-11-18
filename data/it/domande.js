/* data/it/domande.js — pool delle 25 domande dell'esame (Modulo 2).
   Una voce per domanda. "corretta" è l'indice (da 0) dell'opzione giusta nell'elenco così come è scritto qui:
   l'ordine mostrato all'utente viene rimescolato a ogni tentativo.
   Distribuzione: 1.1→2, 1.2→3, 1.3→4, 1.4→2, 1.5→5, 1.6→4, 1.7→2, 1.8→3 (totale 25). */

DCS.i18n.add('it', 'domande', [
  /* ---------- 1.1 Introduzione (2) ---------- */
  {
    id: 'q01', capitolo: '1.1',
    testo: 'Qual è la differenza tra Internet e il web?',
    opzioni: ['Internet è la rete di reti; il web è uno dei servizi che funzionano sopra Internet', 'Sono due nomi della stessa cosa', 'Il web è la rete fisica; Internet è l\'insieme delle pagine', 'Internet serve solo per la posta, il web per tutto il resto'],
    corretta: 0,
    spiegazione: 'Internet è l\'infrastruttura (la rete di reti); il web è un servizio che la usa, come la posta elettronica o il trasferimento di file.'
  },
  {
    id: 'q02', capitolo: '1.1',
    testo: 'Quali sono le tre idee su cui Tim Berners-Lee ha fondato il web al CERN?',
    opzioni: ['HTML, URL e HTTP', 'TCP, IP e DNS', 'SMTP, POP3 e IMAP', 'Java, CSS e SQL'],
    corretta: 0,
    spiegazione: 'Il web nasce con HTML (il linguaggio delle pagine), URL (gli indirizzi) e HTTP (il protocollo per chiederle). TCP, IP e DNS esistevano già e appartengono a Internet.'
  },

  /* ---------- 1.2 Client-server (3) ---------- */
  {
    id: 'q03', capitolo: '1.2',
    testo: 'Nel modello client-server, chi inizia la comunicazione?',
    opzioni: ['Il client', 'Il server', 'Chi dei due è acceso da più tempo', 'Il router tra i due'],
    corretta: 0,
    spiegazione: 'È sempre il client a iniziare, inviando una richiesta. Il server resta in attesa e risponde.'
  },
  {
    id: 'q04', capitolo: '1.2',
    testo: 'Quale affermazione su client e server è corretta?',
    opzioni: ['Sono ruoli: lo stesso computer può fare da client in un momento e da server in un altro', 'Un server è sempre un computer più potente di un client', 'Un server può servire un solo client alla volta', 'Il client conserva le risorse e il server le chiede'],
    corretta: 0,
    spiegazione: 'Client e server sono ruoli, non tipi di macchina. Un server può servire molti client insieme, ed è il server a offrire le risorse.'
  },
  {
    id: 'q05', capitolo: '1.2',
    testo: 'Qual è l\'ordine corretto del ciclo client-server?',
    opzioni: ['Richiesta → elaborazione → risposta', 'Risposta → richiesta → elaborazione', 'Elaborazione → richiesta → risposta', 'Richiesta → risposta → elaborazione'],
    corretta: 0,
    spiegazione: 'Il client invia la richiesta, il server la elabora (ad esempio cerca il file) e poi invia la risposta.'
  },

  /* ---------- 1.3 Stack TCP/IP (4) ---------- */
  {
    id: 'q06', capitolo: '1.3',
    testo: 'Su quale porta di default ascolta un server web che usa HTTPS?',
    opzioni: ['80', '443', '25', '53'],
    corretta: 1,
    spiegazione: 'HTTPS usa la porta 443. La 80 è di HTTP, la 25 di SMTP e la 53 del DNS.'
  },
  {
    id: 'q07', capitolo: '1.3',
    testo: 'Quale protocollo di trasporto usa di norma il DNS per le normali richieste?',
    opzioni: ['UDP', 'TCP', 'HTTP', 'TLS'],
    corretta: 0,
    spiegazione: 'Il DNS usa di norma UDP sulla porta 53, perché domanda e risposta stanno in un solo pacchetto. Passa a TCP per risposte grandi e trasferimenti di zona.'
  },
  {
    id: 'q08', capitolo: '1.3',
    testo: 'Che cosa si intende per incapsulamento?',
    opzioni: ['Ogni livello aggiunge la propria intestazione ai dati ricevuti dal livello superiore', 'La cifratura dei dati prima dell\'invio', 'La compressione dei pacchetti per occupare meno banda', 'La divisione di un messaggio tra più server'],
    corretta: 0,
    spiegazione: 'Nell\'incapsulamento il messaggio scende lungo lo stack e ogni livello (trasporto, internet, accesso alla rete) aggiunge la sua intestazione. La cifratura è un\'altra cosa (TLS).'
  },
  {
    id: 'q09', capitolo: '1.3',
    testo: 'A che cosa serve il numero di porta?',
    opzioni: ['A identificare il servizio (il programma) sulla macchina di destinazione', 'A identificare la macchina in rete', 'A indicare la velocità della connessione', 'A stabilire l\'ordine dei pacchetti'],
    corretta: 0,
    spiegazione: 'L\'indirizzo IP trova la macchina, la porta trova il servizio. L\'ordine dei dati è compito dei numeri di sequenza di TCP.'
  },

  /* ---------- 1.4 URL (2) ---------- */
  {
    id: 'q10', capitolo: '1.4',
    testo: 'Nell\'URL https://www.esempio.it/corso?lingua=it#esempio, quale parte NON viene inviata al server?',
    opzioni: ['#esempio', '?lingua=it', '/corso', 'www.esempio.it'],
    corretta: 0,
    spiegazione: 'Il frammento (dopo #) resta nel browser. Percorso e query finiscono nella richiesta HTTP, l\'host nell\'header Host.'
  },
  {
    id: 'q11', capitolo: '1.4',
    testo: 'Nel nome di dominio www.esempio.it, che cos\'è "it"?',
    opzioni: ['Il dominio di primo livello (TLD)', 'Il dominio di secondo livello', 'Un sottodominio', 'Lo schema'],
    corretta: 0,
    spiegazione: 'Il nome si legge da destra: "it" è il TLD, "esempio" il dominio di secondo livello, "www" un sottodominio.'
  },

  /* ---------- 1.5 HTTP (5) ---------- */
  {
    id: 'q12', capitolo: '1.5',
    testo: 'Un browser richiede una pagina che non esiste sul server. Quale codice di stato riceve?',
    opzioni: ['200 OK', '301 Moved Permanently', '404 Not Found', '500 Internal Server Error'],
    corretta: 2,
    spiegazione: 'Il 404 (classe 4xx, errore del client) indica che il server è raggiungibile ma la risorsa non esiste. Un 500 indicherebbe un errore interno del server.'
  },
  {
    id: 'q13', capitolo: '1.5',
    testo: 'Quale header è obbligatorio in ogni richiesta HTTP/1.1?',
    opzioni: ['Host', 'User-Agent', 'Accept', 'Content-Type'],
    corretta: 0,
    spiegazione: 'In HTTP/1.1 l\'header Host è obbligatorio: dice al server quale sito si vuole, perché sullo stesso server possono esserci più siti. Gli altri sono facoltativi.'
  },
  {
    id: 'q14', capitolo: '1.5',
    testo: 'Che cosa significa che HTTP è un protocollo "senza stato" (stateless)?',
    opzioni: ['Ogni richiesta è indipendente e il server, di suo, non ricorda le precedenti', 'Il server non invia mai codici di stato', 'La connessione non può essere cifrata', 'Le pagine non possono cambiare nel tempo'],
    corretta: 0,
    spiegazione: 'Stateless vuol dire che il server non conserva memoria tra una richiesta e l\'altra. Per ricordare un utente si usano i cookie.'
  },
  {
    id: 'q15', capitolo: '1.5',
    testo: 'Quale metodo HTTP NON è idempotente?',
    opzioni: ['POST', 'GET', 'PUT', 'DELETE'],
    corretta: 0,
    spiegazione: 'GET, PUT e DELETE sono idempotenti: ripeterli ha lo stesso effetto che farli una volta. POST no: inviare due volte un form può creare due ordini.'
  },
  {
    id: 'q16', capitolo: '1.5',
    testo: 'In un messaggio HTTP/1.1, che cosa separa gli header dal corpo?',
    opzioni: ['Una riga vuota', 'Un punto da solo su una riga', 'La parola END', 'Il carattere #'],
    corretta: 0,
    spiegazione: 'Una riga vuota chiude gli header; dopo inizia l\'eventuale corpo. Il punto da solo su una riga è la regola di SMTP per terminare il testo del messaggio.'
  },

  /* ---------- 1.6 DNS (4) ---------- */
  {
    id: 'q17', capitolo: '1.6',
    testo: 'Quale record DNS indica il server di posta responsabile di un dominio?',
    opzioni: ['A', 'MX', 'CNAME', 'NS'],
    corretta: 1,
    spiegazione: 'Il record MX (mail exchanger) indica quale server riceve la posta del dominio. Il record A collega un nome a un indirizzo IPv4, il CNAME crea un alias, l\'NS indica i name server.'
  },
  {
    id: 'q18', capitolo: '1.6',
    testo: 'Quale record DNS associa un nome a un indirizzo IPv6?',
    opzioni: ['AAAA', 'A', 'MX', 'TXT'],
    corretta: 0,
    spiegazione: 'AAAA contiene un indirizzo IPv6; A contiene un indirizzo IPv4.'
  },
  {
    id: 'q19', capitolo: '1.6',
    testo: 'Che cosa fa un resolver ricorsivo?',
    opzioni: ['Interroga radice, TLD e server autoritativi al posto del client e gli restituisce la risposta finale', 'Conserva la copia ufficiale di tutti i domini del mondo', 'Assegna gli indirizzi IP ai computer della rete locale', 'Cifra le richieste HTTP'],
    corretta: 0,
    spiegazione: 'Il resolver fa il giro dei server DNS per conto del client. Nessun server conosce tutti i domini, e l\'assegnazione degli IP in rete locale è compito di DHCP.'
  },
  {
    id: 'q20', capitolo: '1.6',
    testo: 'Che cosa indica il TTL di un record DNS?',
    opzioni: ['Per quanti secondi il record può restare in cache', 'Il numero di server attraversati dalla richiesta', 'La priorità del server di posta', 'La versione del protocollo DNS'],
    corretta: 0,
    spiegazione: 'Il TTL (Time To Live) dice per quanto tempo una risposta può essere riusata dalla cache. La priorità del server di posta è un campo del record MX.'
  },

  /* ---------- 1.7 HTTPS e TLS (2) ---------- */
  {
    id: 'q21', capitolo: '1.7',
    testo: 'Che cosa garantisce il lucchetto nella barra del browser?',
    opzioni: ['Che la connessione con quel server è cifrata e il server ha un certificato valido per quel nome', 'Che il sito è onesto e non è una truffa', 'Che il computer è protetto dai virus', 'Che la pagina è stata controllata dal governo'],
    corretta: 0,
    spiegazione: 'Il lucchetto garantisce la riservatezza del canale e l\'identità del dominio, non l\'onestà del sito: anche un sito di phishing può avere un certificato valido.'
  },
  {
    id: 'q22', capitolo: '1.7',
    testo: 'Dopo l\'handshake TLS, come vengono cifrati i dati della sessione?',
    opzioni: ['Con crittografia simmetrica, usando la chiave di sessione concordata', 'Con la chiave privata del server, messaggio per messaggio', 'Non vengono cifrati: TLS controlla solo il certificato', 'Con la password dell\'utente'],
    corretta: 0,
    spiegazione: 'La crittografia asimmetrica serve all\'inizio per autenticare il server e concordare la chiave; poi i dati viaggiano cifrati con crittografia simmetrica, molto più veloce.'
  },

  /* ---------- 1.8 SMTP e POP3 (3) ---------- */
  {
    id: 'q23', capitolo: '1.8',
    testo: 'Quale protocollo usa il destinatario per scaricare la posta dalla sua casella sul server?',
    opzioni: ['POP3', 'SMTP', 'HTTP', 'DNS'],
    corretta: 0,
    spiegazione: 'POP3 (porta 110) serve a scaricare la posta: modello pull. SMTP serve a inviarla: modello push.'
  },
  {
    id: 'q24', capitolo: '1.8',
    testo: 'Come fa il server del mittente a sapere a quale server consegnare un\'email per luca@esempio.it?',
    opzioni: ['Chiede al DNS il record MX di esempio.it', 'Lo chiede al client di Luca con POP3', 'Invia il messaggio a tutti i server di .it', 'Lo legge nell\'header Host del messaggio'],
    corretta: 0,
    spiegazione: 'Il server del mittente interroga il DNS per il record MX del dominio del destinatario, che indica il server di posta da contattare.'
  },
  {
    id: 'q25', capitolo: '1.8',
    testo: 'In una sessione SMTP, che cosa significa la risposta 354 del server dopo il comando DATA?',
    opzioni: ['Il server è pronto a ricevere il testo del messaggio, da terminare con una riga con un solo punto', 'Il messaggio è stato consegnato al destinatario', 'Il destinatario non esiste', 'Il server chiude la connessione'],
    corretta: 0,
    spiegazione: '354 invita a inviare il messaggio, che termina con una riga contenente solo un punto. 250 conferma un comando, 221 chiude la connessione.'
  }
]);
