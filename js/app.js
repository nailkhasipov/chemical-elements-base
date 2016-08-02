$( document ).ready(function(){
  $.getJSON( "database.json", function( database ) {
    window.database = database;
    $.each( database, function( index, element ){
      var elementNode = "<li class='element-li' class='active'><a class='element-link' target=" + index + " href='javascript:;'>" + " <span class='formul'>"
      + element["Брутто-формула"] + "</span>" + " <span class='name'>" + element["Название"] + "</span>" +
      "<span class='temperature'>" + element["Температура кипения, °K"] + "</span>" + "</a></li>";
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
      tr.append("<td class='value'>"+ "Расчетные значения" + "</td>");
       $(".value:hidden").show();
      $(table).append(tr);
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

 var minlen = 3; // аМаИаНаИаМаАаЛбаНаАб аДаЛаИаНаА баЛаОаВаА
 var paddingtop = 30; // аОббббаП баВаЕббб аПбаИ аПбаОаКбббаКаЕ
 var scrollspeed = 200; // аВбаЕаМб аПбаОаКбббаКаИ
 var keyint = 1000; // аИаНбаЕбаВаАаЛ аМаЕаЖаДб аНаАаЖаАбаИбаМаИ аКаЛаАаВаИб
 var term = '';
 var n = 0;
 var time_keyup = 0;
 var time_search = 0;

 jQuery('body').delegate('#spgo', 'click', function(){
  jQuery('body,html').animate({scrollTop: jQuery('span.highlight:first').offset().top-paddingtop}, scrollspeed); // аПаЕбаЕбаОаД аК аПаЕбаВаОаМб ббаАаГаМаЕаНбб
 });

 function dosearch() {
  term = jQuery('#spterm').val();
  jQuery('span.highlight').each(function(){ //баДаАаЛбаЕаМ ббаАббб аПаОаДбаВаЕбаКб
   jQuery(this).after(jQuery(this).html()).remove();
  });
  var t = '';
  jQuery('div#content').each(function(){ // аВ баЕаЛаЕаКбаОбаЕ аЗаАаДаАаЕаМ аОаБаЛаАббб аПаОаИбаКаА
   jQuery(this).html(jQuery(this).html().replace(new RegExp(term, 'ig'), '<span class="highlight">$&</span>')); // аВбаДаЕаЛбаЕаМ аНаАаЙаДаЕаНаНбаЕ ббаАаГаМаЕаНбб
   n = jQuery('span.highlight').length; // аКаОаЛаИбаЕббаВаО аНаАаЙаДаЕаНаНбб ббаАаГаМаЕаНбаОаВ
   console.log('n = '+n);
   if (n==0)
    jQuery('#spresult').html('ааИбаЕаГаО аНаЕ аНаАаЙаДаЕаНаО');
   else
    jQuery('#spresult').html('а аЕаЗбаЛббаАбаОаВ: '+n+' <span class="splink" id="spgo">ааЕбаЕаЙбаИ</span>');
   if (n>1) // аЕбаЛаИ аБаОаЛббаЕ аОаДаНаОаГаО ббаАаГаМаЕаНбаА, баО аДаОаБаАаВаЛбаЕаМ аПаЕбаЕбаОаД аМаЕаЖаДб аНаИаМаИ
   {
    var i = 0;
    jQuery('span.highlight').each(function(i){
     jQuery(this).attr('n', i++); // аНбаМаЕббаЕаМ ббаАаГаМаЕаНбб, аБаОаЛаЕаЕ аПбаОббаОаГаО баПаОбаОаБаА аИбаКаАбб баЛаЕаДбббаИаЙ баЛаЕаМаЕаНб аНаЕ аНаАбаЕаЛ
    });
    jQuery('span.highlight').not(':last').attr({title: 'ааАаЖаМаИбаЕ, ббаОаБб аПаЕбаЕаЙбаИ аК баЛаЕаДбббаЕаМб ббаАаГаМаЕаНбб'}).click(function(){ // аВбаЕаМ ббаАаГаМаЕаНбаАаМ, аКбаОаМаЕ аПаОбаЛаЕаДаНаЕаГаО, аДаОаБаАаВаЛбаЕаМ аПаОаДбаКаАаЗаКб
     jQuery('body,html').animate({scrollTop: jQuery('span.highlight:gt('+jQuery(this).attr('n')+'):first').offset().top-paddingtop}, scrollspeed); // аПаЕбаЕбаОаД аК баЛаЕаДбббаЕаМб ббаАаГаМаЕаНбб
    });
//    jQuery('span.highlight:last').attr({title: 'ааАаЖаМаИбаЕ, ббаОаБб аВаЕбаНббббб аК баОбаМаЕ аПаОаИбаКаА'}).click(function(){
//     jQuery('body,html').animate({scrollTop: jQuery('#spterm').offset().top-paddingtop}, scrollspeed); // аПаЕбаЕбаОаД аК баОбаМаЕ аПаОаИбаКаА
//    });
   }
  });
 }

 jQuery('#spterm').keyup(function(){
  var d1 = new Date();
  time_keyup = d1.getTime();
  if (jQuery('#spterm').val()!=term) // аПбаОаВаЕббаЕаМ, аИаЗаМаЕаНаИаЛаАбб аЛаИ бббаОаКаА
   if (jQuery('#spterm').val().length>=minlen) { // аПбаОаВаЕббаЕаМ аДаЛаИаНб бббаОаКаИ
    setTimeout(function(){ // аЖаДаЕаМ баЛаЕаДбббаЕаГаО аНаАаЖаАбаИб
     var d2 = new Date();
     time_search = d2.getTime();
     if (time_search-time_keyup>=keyint) // аПбаОаВаЕббаЕаМ аИаНбаЕбаВаАаЛ аМаЕаЖаДб аНаАаЖаАбаИбаМаИ
      dosearch(); // аЕбаЛаИ аВбаЕ аВ аПаОббаДаКаЕ, аПбаИбббаПаАаЕаМ аК аПаОаИбаКб
    }, keyint);
   }
   else
    jQuery('#spresult').html('&nbsp'); // аЕбаЛаИ бббаОаКаА аКаОбаОбаКаАб, баБаИбаАаЕаМ баЕаКбб аИаЗ DIVаА б баЕаЗбаЛббаАбаОаМ
 });

 if (window.location.hash!="") // аБаОаНбб
 {
  var t = window.location.hash.substr(1, 50); // аВббаЕаЗаАаЕаМ баЕаКбб
  jQuery('#spterm').val(t).keyup(); // аВббаАаВаЛбаЕаМ аЕаГаО аВ баОбаМб аПаОаИбаКаА
  jQuery('#spgo').click(); // аПаЕбаЕбаОаДаИаМ аК аПаЕбаВаОаМб ббаАаГаМаЕаНбб
 }



    });
  });
});
