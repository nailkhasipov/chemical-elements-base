$( document ).ready(function(){
  $.getJSON( "database.json", function( database ) {
    window.database = database;
    $.each( database, function( index, element ){
      var elementNode = "<li><a class='element-link' target=" + index + " href='javascript:;'>" + element["Название"] + "</a></li>";
      $(".sidebar").append( elementNode );
    });
  });

  $(document).on('click', '.element-link', function(e) {
    var elementId = $(this).attr("target");
    var element = window.database[elementId];
    var table = $('<table/>');
    var tr;
    for ( property in element ) {
      console.log(property);
      tr = $('<tr/>');
      tr.append("<td>" + property + "</td>");
      tr.append("<td>" + element[property] + "</td>");
      $(table).append(tr);
    }
    $(".main").html(table);
  });
});
