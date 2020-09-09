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

  // quando l'utente digita ENTER da tastiera, aggiunge il testo dell'input alla chat
  $(".input_messaggio_new").keyup(
    function(event){
      // controlla se ha digitato spazio come primo carattere nell'input
      if (event.which == 32 && $(".input_messaggio_new").val() == " ") {
        // pulisce l'input del messaggio
        $(".input_messaggio_new").val("");
      } else if (event.which == 13) {
        // l'utente ha digitato invio da tasitera
        inviaMessaggio("msg_int", $(".input_messaggio_new").val());
        setTimeout(function(){inviaMessaggio("msg_ext", "ok"); }, 1000);
      };
    }
  )

  // al click sull'icona invio, aggiunge il testo dell'input alla chat
  $(".send_message").click (
    function () {
      inviaMessaggio("msg_int", $(".input_messaggio_new").val());
      setTimeout(function(){inviaMessaggio("msg_ext", "ok"); }, 1000);
  });

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

});
