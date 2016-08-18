$( document ).ready(function(){
   $.getJSON( "database-test.json", function( database ) {
    window.database = database;
    renderSidebar( database );
  });


  $(document).on('click', '.element-link', function(e) {
    var elementId = $(this).attr("target");
    var element = window.database[elementId];
    var table = $('<table cellspacing="0" border="1"/>');
    var tr;
    var i = 1;
    for ( property in element ) {
      tr = $('<tr/>');
      tr.append("<th>" + property + "</th>");
      tr.append("<td>" + element[property] + "</td>");
      if ( i > 5 ){
          tr.append("<td class='value'>"+ "Расчетные значения" + "</td>");
      }
      $(table).append(tr);
      i++;
    }
    $(".main").html(table);


    $(function() { $('.value').click(function(e) {
      var t = e.target || e.srcElement;
      var elm_name = t.tagName.toLowerCase();
        if(elm_name == 'input') {return false;}
        var val = $(this).html();
        var code = '<input type="text" id="edit" value="'+val+'" />';

        $(this).empty().append(code);
        $('#edit').focus();
        $('#edit').blur(function() {
        var val = $(this).val();
        $(this).parent().empty().html(val);


        $(window).keydown(function(event){ //ловим событие нажатия клавиши
          if(event.keyCode == 13) { //если это Enter
            $('#edit').blur(); //снимаем фокус с поля ввода
        }
      });
    });
  });

$(".element-li").on('click', function(){
    $(".element-li").removeClass('active');
    $(this).addClass('active');
  });
 });
});

$("#reboot").click(function(){
  renderSidebar( database );
});

$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
    $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

  $(".button-push").click( function(){
  var items;
  $.getJSON("database-test.json", function( data ){
    $items = [];
    $.each(data, function(key, val) {
      var query = $("#search").val();
      if (val.Название == query) {
        var newArray = [];
        newArray.push(data[key]);
        renderSidebar(newArray);
        return;
     }
   });
  });
 });
});

function renderSidebar( database ) {
  $(".result").empty();
  $.each( database, function( index, element ){
    var elementNode = "<li class='element-li' class='active'><a class='element-link' target=" + index + " href='javascript:;'>" + " <span class='formul'>"
    + element["Брутто-формула"] + "</span>" + " <span class='name'>" + element["Название"] + "</span>" +
    "<span class='temperature'>" + element["Температура кипения, °K"] + "</span>" + "</a></li>";
    $(".result").append( elementNode );
  });
}
