$(document).ready (function() {

  function getOreMinuti() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var ora = String(h)+":"+String(m);
    return ora;
  }

  console.log(getOreMinuti());

  // quando l'utente digita ENTER da tastiera, aggiunge il testo dell'input alla chat
  $(".input_messaggio_new").keyup(
    function(event){
      // controlla se ha digitato Enter
      if (event.which == 13) {
        var inputValue = $(".input_messaggio_new").val();
        console.log(inputValue);
        if (inputValue.length > 0) {
          var elemento = $(".template").clone();
          elemento.find(".text_messaggio").text(inputValue);
          elemento.find(".ora_messaggio").text(getOreMinuti());
          console.log(elemento.find(".text_messaggio").text());
          console.log("hasClass: " + elemento.hasClass("hide_template"));
          elemento.removeClass("hide_template");
          elemento.removeClass("template");
          console.log("hasClass dopo il remove: " + elemento.hasClass("hide_template"));
          // console.log("text: " + elemento.children("text_messaggio").text());
          // elemento.append(inputValue+" ");
          $(".sideDX_main").append(elemento);
          $(".input_messaggio_new").val("");
        }
      };
    }
  )
  // /quando l'utente digita ENTER da tastiera










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
