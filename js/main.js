$(document).ready (function() {

  // indice della chat attiva, a cui fare riferimento per elenco "chat" e "messaggi_chat"
  var active_chat = 0;

  // funziona che ritorna l'ora attuale nel formato H:MM
  function getOreMinuti() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    // per avere i minuti sempre con due numeri
     if (m < 10) {
       m = "0" + String(m);
     }
    var ora = String(h)+":"+String(m);
    return ora;
  }
  console.log(getOreMinuti());

  // funzione che prende il testo digitato nell'input e lo aggiunge come messaggio alla chat
  function inviaMessaggio (msg, txt) {
    if (txt != "") {
      // seleziona e clona l'elemento del messaggio
      var elemento = $(".template .wrap_messaggio").clone();
      // scrive nel clone il testo del messaggio preso dall'input
      elemento.find(".text_messaggio").text(txt);
      // scrive nel clone l'ora attuale
      elemento.find(".ora_messaggio").text(getOreMinuti());
      // aggiunge la classe per il messaggio interno
      elemento.addClass(msg);
      // seleziona la chat di messaggi attiva a cui aggiungere il messaggio
      var destinazione = $( "[data-conversazione=" + "'" + active_chat + "' ]" );
      // appende l'elemento messaggio alla lista dei messaggi
      $(destinazione).append(elemento);
      // pulisce l'input del messaggio
      $(".input_messaggio_new").val("");
      // fa scorrere la sbarra verso il basso per visualizzare il nuovo messaggio
      $(".sideDX_main").scrollTop(10000);
    }
  }

  // quando l'utente digita ENTER da tastiera, aggiunge il testo dell'input alla chat
  $(".input_messaggio_new").keyup(
    function(event){
      // controlla se ha digitato spazio come primo carattere nell'input
      if (event.which == 32 && $(".input_messaggio_new").val() == " ") {
        // pulisce l'input del messaggio perchè ha digitato come primo carattere uno spazio vuoto (con la barra)
        $(".input_messaggio_new").val("");
      } else if (event.which == 13) {
        // l'utente ha digitato invio da tasitera
        var text_msg = $(".input_messaggio_new").val();
        if (text_msg != "") {
          inviaMessaggio("msg_int", text_msg);
          setTimeout(function(){inviaMessaggio("msg_ext", "ok"); }, 1000);
        }
      };
    }
  )

  // al CLICK sull'icona invio messaggio, aggiunge il testo dell'input alla chat
  $(".send_message").click (
    function () {
      var text_msg = $(".input_messaggio_new").val();
      if (text_msg != "") {
        inviaMessaggio("msg_int", text_msg);
        setTimeout(function(){inviaMessaggio("msg_ext", "ok"); }, 1000);
      }
  });

  // KEYUP input Ricerca // quando l'utente digita nell'input ricerca della sideSX,
  // nella lista della chat compaiono solo i nomi delle chat che contengono la stringa digitata
  $(".input_cerca").keyup(
    function(event){
       // Selezioniamo tutti i div .chat e cicliamo con .each
      $('.chat').each(function () {
        // memorizza in strNomeChat il nome della chat corrente
        var strNomeChat = $(this).find(".nome").text().toLowerCase();
        // memorizza in carDigitati i caratteri attualmente presenti nell'input ricerca
        var strInput = $(".input_cerca").val().toLowerCase();
        // verifca se il nome della chat corrente contiene la string digitata in input ricerca
        var chat_trovata = strNomeChat.includes(strInput);
        if (chat_trovata) {
          // rende visibile la chat
          $(this).removeClass("chat_hide");
        } else {
          // nasconde la chat
          $(this).addClass("chat_hide");
        }
      });
  })

// al click sulla chat nell'elenco chat della sideSX, carica la lista di messaggi relativi
$(".chat").click (
  function () {

    // // seleziona le conversazioni
    // var element = document.getElementsByClassName('messaggi_chat');
    // // RESET toglie la classe "convesazine_attiva" all'elemento attualmente attivo
    // element[active_chat].classList.remove("conversazione_attiva");


    // RESET // toglie la classe "conversazione_attiva" a tutti le conversazioni
    $(".conversazione_attiva").each(function () {
        $(this).removeClass("conversazione_attiva");
      }
    );


    // aggiorna la variabile globale active_chat assegnandole l'indice del contatto/chat cliccato
    active_chat = $(this).attr("data-chat");
    // prepara la stringa per la ricerca dell'attributo
    strSel = "[data-conversazione=" + "'" + active_chat + "' ]";
    // cerca il la conversazione con attributo "data-conversazione" uguale ad active_chat
    $(strSel).addClass("conversazione_attiva");
    // RESET // toglie la classe "chat_attiva" (sfondo grigio scuro) a tutti i contatti/chat
    $('.chat_attiva').each(function () {
        $(this).removeClass("chat_attiva");
      }
    );
    // aggiunge all'attuale chat cliccata la classe "chat_attiva" (sfondo grigio scuro)
    $(this).addClass("chat_attiva");
});

// hover sull'elenco delle chat
$(".chat").hover (
  function () {
    if (!$(this).hasClass("chat_attiva")) {
      $(this).addClass("grigio_mouse_enter")
    }
  },
  function () {
    $(this).removeClass("grigio_mouse_enter")
  },
);

});
