$(function(){

	$('a').click(function(e){
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 500);
	      	}
	    }
	    e.preventDefault();
	});

	$('nav#main').affix({
      offset: {
        top: function() { return $(window).height()-80; }
      }
	});

	$('nav#main a').click(function(){
		$('nav#main a').removeClass('active');
		$(this).addClass('active');
	});

	var offsetY = 50;

	$('section').waypoint(function(direction){
		var id = $(this).attr('id');
		$('nav#main a').removeClass('active');	
		if(direction == 'up')
			id = $(this).prev('section').attr('id');
			offsetY = 0;
		if(direction == 'down')
			offsetY = 50;
		if(id != undefined)
			$('nav#main a.'+id).addClass('active');
		else {
			$('nav#main a.home').addClass('active');
		}
	}, { offset: offsetY });

});
