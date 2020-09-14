$(document).ready (function() {

  // indice della chat attiva, a cui fare riferimento per elenco "chat" e "messaggi_chat"
  var active_chat = 0;

  // true se il pannello per cancellare il messaggio della chat è visibile
  var panel_delete_open = false;

  // varibaile globake per gestione chiusura panel_delete, il menu cancella messaggio al clic in altri punti della pagina
  var click_angle_down = false

  // funzione che ritorna l'ora attuale nel formato H:MM
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

  // funzione che prende il testo digitato nell'input e lo aggiunge come messaggio alla chat
  function inviaMessaggio (msg, txt, chatAttiva) {
    if (txt != "") {
      // seleziona e clona l'elemento del messaggio
      var elemento = $(".template .wrap_messaggio").clone();
      // scrive nel clone il testo del messaggio preso dall'input
      elemento.find(".text_messaggio").text(txt);
      // scrive nel clone l'ora attuale
      elemento.find(".ora_messaggio").text(getOreMinuti());
      // aggiunge la classe per il tipo di messaggio (interno o esterno)
      elemento.addClass(msg);
      // prepara la stringa per la ricerca dell'attributo
      strSel = "[data-conversazione=" + "'" + chatAttiva + "' ]";
      // cerca la conversazione con attributo "data-conversazione" uguale ad active_chat
      // appende l'elemento messaggio alla conversazione attiva
      $(strSel).append(elemento);
      // pulisce l'input del messaggio
      $(".input_messaggio_new").val("");
      // SCROLL BAR: fa scorrere la scroll-bar barra verso il basso per visualizzare il nuovo messaggio
      var scrollVal = $(".sideDX_main").prop("scrollHeight");
      $(".sideDX_main").scrollTop(scrollVal);
    }
  }


  // crea array dei nomi utenti
  var arrChat = ["Michele", "Fabio", "Samuele", "Alessandro B.", "Alessandro L.", "Claudia", "Davide", "Federico"];

  // crea CHAT CONTTATI
  for (var i = 0; i < arrChat.length; i++) {
    // clona il template contatto / chat
    var chat_clone = $(".template_contatto .chat").clone()
    // manipola l'oggetto clone
    var strUrl = "img/avatar_" + (i + 1) + ".jpg";
    chat_clone.find(".contatto_avatar").attr("src", strUrl);
    // var i_chat = String(i);
    chat_clone.attr("data-chat", i);
    chat_clone.find(".nome").text(arrChat[i]);
    chat_clone.find(".messaggio").text("Non poteva essere altrimenti");
    chat_clone.find("ora_messaggio").text("12:45");
    // rende attiva la prima chat dell'elenco
    if (i == 0) {
      chat_clone.addClass("chat_attiva");
    }
    // aggiunge il contatto / chat all'elenco dei arrContatti
    $(".sideSX_chat").append(chat_clone);

    // prepara stringa con codice Hmtl per la creazione della conversazione
    if (i == 0) {
      // aggiunge la classe "conversazione_attiva" alla prima conversazione
      var strHtmlChat = '<div class="messaggi_chat conversazione_attiva" data-conversazione="'+ i + '"></div>';
    } else {
      var strHtmlChat = '<div class="messaggi_chat" data-conversazione="'+ i + '"></div>';
    }
    // aggiunge la conversazione alla pagina
    $(".sideDX_main").prepend(strHtmlChat);

    // crea 3 messaggi per ogni CONVERSAZIONE
    for (var cont = 0; cont < 3; cont++) {
      active_chat = i;
      switch (cont) {
        case 0:
        inviaMessaggio ("msg_int", "Come stai " + arrChat[i] + " ?", active_chat);
          break;
        case 1:
        inviaMessaggio ("msg_ext", "Tutto bene, grazie. E tu?", active_chat);
          break;
        case 2:
        inviaMessaggio ("msg_int", "Alla grande!", active_chat);
          break;
        default:
      }
    }
    active_chat = 0;
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
        // crea nuovo messaggio e relativa risposta
        if (text_msg != "") {
          // definisce su qualce chat appendere il messaggio, per evitare bug se si cambia chat prima dello scadere del tempo del setTimeout
          var chatInd = active_chat;
          // scrive il messaggio dell'utente
          inviaMessaggio("msg_int", text_msg, chatInd);
          // dopo 1 secondo scrive la rispota del contatto
          setTimeout(function(){inviaMessaggio("msg_ext", "ok", chatInd); }, 1000);
        }
      };
    }
  )

  // al CLICK sull'icona invia messaggio, aggiunge il testo dell'input alla chat
  $(".send_message").click (
    function () {
      // recupera il testo digitato dall'utente nell'input nuovo messaggio
      var text_msg = $(".input_messaggio_new").val();
      // crea nuovo messaggio e relativa risposta
      if (text_msg != "") {
        // definisce su qualce chat appendere il messaggio, per evitare bug se si cambia chat prima dello scadere del tempo del setTimeout
        var chatInd = active_chat;
        // scrive il messaggio dell'utente
        inviaMessaggio("msg_int", text_msg, chatInd);
        // dopo 1 secondo scrive la rispota del contatto
        setTimeout(function(){inviaMessaggio("msg_ext", "ok", chatInd); }, 1000);
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
    // RESET // toglie la classe "conversazione_attiva" a tutti le conversazioni
    $(".conversazione_attiva").removeClass("conversazione_attiva");
    // aggiorna la variabile globale active_chat assegnandole l'indice del contatto/chat cliccato
    active_chat = $(this).attr("data-chat");
    // prepara la stringa per la ricerca dell'attributo
    strSel = "[data-conversazione=" + "'" + active_chat + "' ]";
    // cerca il la conversazione con attributo "data-conversazione" uguale ad active_chat
    $(strSel).addClass("conversazione_attiva");
    // RESET // toglie la classe "chat_attiva" (sfondo grigio scuro) a tutti i contatti/chat
    $(".chat_attiva").removeClass("chat_attiva");
    // aggiunge all'attuale chat cliccata la classe "chat_attiva" (sfondo grigio scuro)
    $(this).addClass("chat_attiva");
    // imposta come AVATAR nell'header della sideDX l'avatar del contatto/chat cliccato
    var urlChatClick = $(this).find(".contatto_avatar").attr("src");
    $(".sideDX_top_avatar").attr("src", urlChatClick);
    // imposta come NOME nell'header della sideDX il nome del contatto/chat cliccato
    var nomeChatClick = $(this).find(".nome").text();
    $(".sideDX_top .nome_chat").text(nomeChatClick);
    // imposta come ORA ULTIMO ACCESSO nell'header della sideDX l'ora del contatto/chat cliccato
    var oraChatClick = $(this).find(".ora_messaggio").text();
    $(".sideDX_top .accesso_chat time").text(oraChatClick);
    // fa scorrere la sbarra verso il basso per visualizzare il messaggio più recente
    var scrollVal = $(".sideDX_main").prop("scrollHeight");
    $(".sideDX_main").scrollTop(scrollVal);
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

  // al CLICK su angle-down del messaggio apre pannello menu per cancellare il ora_messaggio
  $(".sideDX_main").on("click", ".apri_cancella",
    function () {
      if (panel_delete_open) {
        // alert("click angle down e panel aperto")
        console.log($(this).parents(".panel_delete"));
        $(this).siblings(".panel_delete").remove();
        // sette variabili per la gestione della chiusura del mene all'evento CLICK su wrap_general
        panel_delete_open = false;
        click_angle_down = false;
      } else {
        var menuCancella = $(".template_delete .panel_delete").clone();
        $(this).parent().append(menuCancella);
        if ($(this).parents(".wrap_messaggio").hasClass("msg_ext")) {
          $(this).siblings(".panel_delete").addClass("delete_left");
        } else {
          $(this).siblings(".panel_delete").removeClass("delete_right");
        }
        $(this).siblings(".panel_delete").addClass("delete_show");
        // sette variabili per la gestione della chiusura del mene all'evento CLICK su wrap_general
        panel_delete_open = true;
        click_angle_down = true;
      }
  });

  // al CLICK in qualunque punto della pagina, se il menu cancella messaggio è aperto, lo chiude
  $(document).on("click", ".wrap_general",
    function(){
      // controlla se il menu cancella messaggio è aperto e se è stato fatto click su angle_down
      if (panel_delete_open && !click_angle_down) {
        panel_delete_open = false;
        $(this).find(".conversazione_attiva .panel_delete").remove();
      } else {
        click_angle_down = false;
      }
    }
  );

  // al CLICK su "cancella messaggio" cancellare il messaggio
  $(".sideDX_main").on("click", ".cancella_msg_txt",
    function () {
      var msg_to_delete = $(this).parents(".wrap_messaggio");
      msg_to_delete.remove();
  });

  $(".sideDX_main").on("mouseenter", ".messaggio",
      function () {
      $(this).find(".apri_cancella").addClass("visibile");
  });

  $(".sideDX_main").on("mouseleave", ".messaggio",
      function () {
      $(this).find(".apri_cancella").removeClass("visibile");
  });

// >>>>>>>>   NON SCRIVERE SOTTO QUESTA RIGA  !!!   <<<<<<<<

});
