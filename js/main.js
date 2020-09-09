$(document).ready (function() {

  // funziona che ritorna l'ora attuale nel formato H:MM
  function getOreMinuti() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    // per avere i minuti sempre con due muerig
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
      console.log("event.which: " + event.which);
      // controlla se ha digitato spazio come primo carattere nell'input
      if (event.which == 32 && $(".input_messaggio_new").val() == " ") {
        // pulisce l'input del messaggio
        $(".input_messaggio_new").val("");
      } else if (event.which == 13) {
        // l'utente ha digitato invio da tasitera
        inviaMessaggio();
      };
    }
  )

  // al click sull'icona invio, aggiunge il testo dell'input alla chat
  $(".wrap_send .fa-paper-plane").click (
    function () {
      inviaMessaggio();
  });

  // funzione che prende il testo digitato nell'input e lo aggiunge come messaggio alla chat
  function inviaMessaggio () {
    // memorizza il testo digitato nell'input del messaggio
    var inputValue = $(".input_messaggio_new").val();
    // controlla se è stata inserita almeno una lettera nell'input
    if (inputValue != "") {
      // seleziona e clona l'elemento del messaggio
      var elemento = $(".template > .msg_int").clone();
      // scrive nel clone il testo del messaggio preso dall'input
      elemento.find(".text_messaggio").text(inputValue);
      // scrive nel clone l'ora attuale
      elemento.find(".ora_messaggio").text(getOreMinuti());
      // appende l'elemento messaggio alla lista dei messaggi
      $(".sideDX_main").append(elemento);
      // pulisce l'input del messaggio
      $(".input_messaggio_new").val("");
      // $(".sideDX_main").scrollTop = "2000";
    }
  }






  // var lista = [
  //   "Comprare latte",
  //   "Comprare uova",
  //   "Comprare farina",
  //   "Comprare vino"
  // ];
  //
  // // clona il template, lo manipola e lo appende al <ul> per creare la lista spesa
  // for (var i = 0; i < lista.length; i++) {
  //   var elemento = $(".template li").clone();
  //   elemento.append(lista[i] + " ");
  //   $(".todo-list").append(elemento);
  // }

  // elimina il <li> al click sul relativo <span>
  // $(".todo-list li span").click(
  //   function () {
  //   $(this).parent().remove();
  // })

  // $("#add-element").keyup(
  //   function(event){
  //     if (event.which == 13) {
  //       var inputValue = $("#add-element").val();
  //       if (inputValue.length > 0) {
  //         var elemento = $(".template li").clone();
  //         elemento.append(inputValue+" ");
  //         $(".todo-list").append(elemento);
  //         $("#add-element").val("");
  //       }
  //     };
  //   }
  // )
  //
  // $("body").on("click", ".todo-list li span",
  //   function() {
  //     $(this).parent().remove();
  //   }
  // );

});
