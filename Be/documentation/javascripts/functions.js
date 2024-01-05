/*

Be JS
Version 1.0
Made by Themanoid

*/


(function($) {

    "use strict"; // Strict mode

    // On load    

    $(window).load(function(){
        setTimeout(function(){ // Fixes wrong display
            setVerticalCenter();
        },500);
    });

    // On Resize

    $(window).resize(function(){
        setVerticalCenter();
    });

    // Back to top button

    var $toTop = $('<div class="back-to-top"></div>');
    $('body').append($toTop);
    $('body').on('tap', '.back-to-top', function(e){
        $('html,body').animate({scrollTop : 0});
        e.preventDefault();
    });

    //  Scroll effects
    $(window).scroll(function(){
        var scrolled = $(window).scrollTop();
        var scrolledPercentage = (100-(scrolled/$(window).height()*100))/100; // Can be used for fading effects
        if(scrolled > 200)
            $toTop.addClass('active'); // Back to top button
        else
            $toTop.removeClass('active');
    });

    /* Header + Menu */

    $('body').on('tap', '.menu-trigger', function(e){
        e.stopPropagation();
        if($('header').hasClass('affix'))
            $('nav#main').slideToggle(200);
        else
            $('nav#main').fadeToggle(500);
        $(this).toggleClass('active');
    });

    $('body').on('tap', 'nav#main', function(){
        $('nav#main').slideUp(300);
        $('.menu-trigger').removeClass('active');
    });

    $('header').on('tap', 'a', function(e){
        e.stopPropagation();
    });

    $('html').on('tap', 'body', function(e){
        $('nav#main').slideUp(300);
        $('.menu-trigger').removeClass('active');
    });

    $('header').hover(function(){

    }, function(){
        $('nav#main').slideUp(300);
        $('.menu-trigger').removeClass('active');
    });        

    $('body.bottom-nav header').affix({
      offset: {
        top: function() { return $(window).height()-120; }
      }
    });

    $('body.top-nav header').affix();

    $('body.top-nav header').on('affix.bs.affix', function () {
        $('body').addClass('affixed');
    });

    $('body.top-nav header').on('affix-top.bs.affix', function () {
        $('body').removeClass('affixed');
    });

    /* Page transition */

    $('nav#main').on('tap', 'a', function(e){
        e.preventDefault();
    });

    /* Smooth anchor scroll */

    $('body').on('click', 'a.anchor', function(e){
        e.stopPropagation();
        var href = $(this).attr('href');
        $('html,body').animate({
            scrollTop : ($(href).offset().top)-60+'px'
        }, 800);
        $('nav#main').slideUp(300);
        $('.menu-trigger').removeClass('active');
        e.preventDefault();
    });

    /* Vertical centering (use .vcenter) */

    function setVerticalCenter(){
        $('.vcenter').each(function(){
            var el = $(this);
            var parent = $(this).parent();
            var parentHeight = parent.height();
            var elHeight = el.height();
            var padding = (parentHeight-elHeight)/2;
            if($(window).width() > 992)
                el.css({'padding-top' : padding+'px'});
            else
                el.css({'padding-top' : '0'});  
        });
    }

})(jQuery);
