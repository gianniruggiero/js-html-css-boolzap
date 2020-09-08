$(document).ready (function() {

  var lista = [
    "Comprare latte",
    "Comprare uova",
    "Comprare farina",
    "Comprare vino"
  ];

  // clona il template, lo manipola e lo appende al <ul> per creare la lista spesa
  for (var i = 0; i < lista.length; i++) {
    var elemento = $(".template li").clone();
    elemento.append(lista[i] + " ");
    $(".todo-list").append(elemento);
  }

  // elimina il <li> al click sul relativo <span>
  // $(".todo-list li span").click(
  //   function () {
  //   $(this).parent().remove();
  // })

  $("#add-element").keyup(
    function(event){
      if (event.which == 13) {
        var inputValue = $("#add-element").val();
        if (inputValue.length > 0) {
          var elemento = $(".template li").clone();
          elemento.append(inputValue+" ");
          $(".todo-list").append(elemento);
          $("#add-element").val("");
        }
      };
    }
  )

  $("body").on("click", ".todo-list li span",
    function() {
      $(this).parent().remove();
    }
  );

});
