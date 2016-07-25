$( document ).ready(function(){
  $.getJSON( "database.json", function( database ) {
    window.database = database;
    $.each( database, function( index, element ){
      var elementNode = "<li class='element-li'><a class='element-link' target=" + index + " href='javascript:;'>" + element["Название"] + "</a></li>";
      $(".sidebar").append( elementNode );
    });
  });

  $(document).on('click', '.element-link', function(e) {
    var elementId = $(this).attr("target");
    var element = window.database[elementId];
    var table = $('<table cellspacing="0" border="1"/>');
    var tr;
    for ( property in element ) {
      console.log(property);
      tr = $('<tr/>');
      tr.append("<th>" + property + "</th>");
      tr.append("<td>" + element[property] + "</td>");
      $(table).append(tr);
    }
    $(".main-table").html(table);
  });
});
