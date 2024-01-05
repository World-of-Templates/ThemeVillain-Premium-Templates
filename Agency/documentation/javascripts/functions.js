$(function(){

	$('section').addClass('visible');
	$('nav#main').addClass('visible');
	$('a').click(function(e){
		$('.active').removeClass('active');
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 500);
	      	}
	    }
	    if (this.getAttribute("href").charAt(0) !== "#" && this.getAttribute('class') !== 'item') {
			var link = $(this).attr('href');
			$('section').removeClass('visible');
			$('nav#main').removeClass('visible');
			setTimeout(goToLink,300,link);
		}  
		e.preventDefault();
	});

	function goToLink(link){
		window.location = link;
	}

	$('nav#main').affix({
      offset: {
        top: function() { return $(window).height()-80; }
      }
	});

	$('.toggle-menu').click(function(e){
		e.stopPropagation();
		$('nav#main ul').toggleClass('open');
	});

	$('html').click(function(){
		$('nav#main ul').removeClass('open');
	});
});
