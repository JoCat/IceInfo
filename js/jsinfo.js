/*
 JCat Stream Info v.1.0 - Informer for Site (Icecast2 Online Radio)
 Copyright (c) 2016 Andrew Molchanov
 https://github.com/JoCat/JSInfo
*/
$(document).ready(function(){
    radioinfo = setTimeout(function shinfo() {
        $.ajax({
          dataType: 'jsonp',
          jsonp: 'callback',
          jsonpCallback: 'info',
          url: info,
          success: function(d){
            try {
                if (d.live.name == '') {einfo = true} else einfo = false;//First Mount (Main)
            } catch(e) {
                einfo = true;
            }
            if (einfo == true){//Second Mount (Fallback)
                $('#jsi-info').html('Программа: '+d.nonstop.name
                +'<br>Ведущий: '+d.nonstop.description
                +'<br>Слушателей: '+d.nonstop.listeners
                +'<br>Рекорд: Временно недоступен');
            }else{//First Mount (Main)
                $('#jsi-info').html('Программа: '+d.live.name
                +'<br>Ведущий: '+d.live.description
                +'<br>Слушателей: '+d.live.listeners
                +'<br>Рекорд: Временно недоступен');
            }
          },
          error: function(){
              $("#jsi-info").html('Ошибка загрузки! Возможно радио сейчас не работает...');
          }
        });
        radioinfo = setTimeout(shinfo,tupd*1000);
    },tupd*1000);
});
