(function($) {

    "use strict";

    $('a').click(function(e){
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top - 60
                }, 500, 'easeInOutExpo');
            }
            e.preventDefault();
        } else if(!$(this).hasClass('item')) {
            var url = $(this).attr('href');
            $('body').fadeOut(600, function(){
                window.location = url;
            });
            e.preventDefault();
        }
    });

})(jQuery);
