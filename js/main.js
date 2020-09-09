$(document).ready (function() {

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
    // memorizza il testo digitato nell'input del messaggio
    // var inputValue = $(".input_messaggio_new").val();
    // controlla se è stata inserita almeno una lettera nell'input
    if (txt != "") {
      // seleziona e clona l'elemento del messaggio
      var elemento = $(".template .wrap_messaggio").clone();
      // scrive nel clone il testo del messaggio preso dall'input
      elemento.find(".text_messaggio").text(txt);
      // scrive nel clone l'ora attuale
      elemento.find(".ora_messaggio").text(getOreMinuti());
      // aggiunge la classe per il messaggio interno
      elemento.addClass(msg);
      // appende l'elemento messaggio alla lista dei messaggi
      $(".sideDX_main").append(elemento);
      // pulisce l'input del messaggio
      $(".input_messaggio_new").val("");
      // $(".sideDX_main").scrollTop = "2000";
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

  // al click sull'icona invio, aggiunge il testo dell'input alla chat
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
        var carDigitati = $(".input_cerca").val().toLowerCase();
        // verifca se il nome della chat corrente contiene la string digitata in input ricerca
        var chat_trovata = strNomeChat.includes(carDigitati);
        if (chat_trovata) {
          // rende visibile la chat
          $(this).removeClass("chat_hide");
        } else {
          // nasconde la chat
          $(this).addClass("chat_hide");
        }
        // var num_chat = $(this).attr("code_chat");
        // console.log(num_chat);
      });
  })

});
