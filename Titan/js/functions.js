;(function($) {

  'use strict'; // Using strict mode

  // Page transitions

  $('a[href!=#][data-toggle!=tab][data-toggle!=collapse][target!=_blank][class!=anchor]').addClass('smooth');

  $('.smooth-transition').animsition({
    linkElement: '.smooth',
    inDuration: 500,
    outDuration: 500,
  });

  var $grid = $('.masonry');

  $grid.imagesLoaded(function(){
    // Initialize Masonry after the images are loaded
    $grid.packery({
      itemSelector: '.item', // Portfolio item
    });
  });

  // Filter functions
  $('.filter-container .btn').on('click', function(e){
    $('.filters').toggleClass('open');
    e.preventDefault();
  });

  $('.filter').on('click', function(e){
    var target = $(this).parent().parent().attr('data-target');
    var selected = $(this).attr('data-toggle');
    $('.filter.active').removeClass('active');
    $(this).addClass('active');
    $(target).find('.item:not('+selected+')').css({
      'transition' : 'all .25s',
      'transform' : 'scale(0)',
      'opacity' : '0'
    });
    setTimeout(function(){
      $(target).find('.item:not('+selected+')').hide(0);
      $(target).find(selected).show(0).css({
        'transform' : 'scale(1)',
        'opacity' : '1'
      });
      $grid.packery('layout');
    }, 250);
  });

  // Menu functions
  $('.nav-btn').on('click', function(e){
    e.stopPropagation();
    $('body').toggleClass('menu-active');
    if($('.nav-container').hasClass('fullscreen') || $('.nav-container').hasClass('classic')){
      $('.nav-container').fadeToggle();
      $('body').toggleClass('fs-menu-active');
    }
    if($('.nav-container').hasClass('top') && $(window).width() < 992){
      $('.nav-container').fadeToggle();
      $('body').toggleClass('fs-menu-active');
    }
    if($('.nav-container').hasClass('sidebar')){
      $('body').toggleClass('sb-menu-active');
    }
  });

  $('.nav-container').on('click', function(e){
    e.stopPropagation();
  });

  $('html').on('click', function(){
    $('body').removeClass('menu-active sb-menu-active fs-menu-active');
  });

  $('.dropdown').on('click', function(e){
    $(this).toggleClass('hover').siblings().removeClass('hover');
  });

  $(window).on('resize', function(){
    // Change Masonry on resize
    setTimeout(function(){
      $grid.packery('layout');
      window.requestAnimationFrame(inView); // Make new items visible
    }, 1500);
  });

  // You can use anchor links, using the .anchor class
  $('.anchor').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('body').removeClass('menu-active');
    var href = $(this).attr('href');
    $('html,body').animate({
      scrollTop : $(href).offset().top-48+'px'
    });
  });

  // Parallax background script, use the ".parallax" class.
  var parallaxSpeed = 0.15;

  function parallax(){
    // Parallax scrolling function
    $('.parallax').each(function(){
      var el = $(this);
      var yOffset = $(window).scrollTop(),
          parallaxOffset = yOffset * parallaxSpeed,
          parallaxOffset = +parallaxOffset.toFixed(2);
      if(el.hasClass('fs')){
        el.css('transform','translate3d(-50%,-'+(50-parallaxOffset*0.15)+'%,0)');
      } else {
        el.css('transform','translate3d(0,'+parallaxOffset+'px,0)');
      }
    });
  }

  // Initialize functions on scroll
  $(window).on('scroll', function(){
    window.requestAnimationFrame(parallax); // Parallax
  });

  var $animation_elements = $('.item'); // The fly-in element, used for elements that fly-in the window after they're visible on screen

  function inView() { // Function when element is in view
    var window_height =   $(window).height();
    var window_top_position =   $(window).scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top-100;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  // Toggle cart
  $('.cart-toggle').on('click', function(){
    $('.cart-container').fadeToggle();
  });

  // Add to cart animation
  $('.add-to-cart').on('click', function(e){
    e.stopPropagation();
    $('.cart-container').fadeIn();
    e.preventDefault();
  });

  // Stop propagation for cart click
  $('.cart').on('click', function(e){
    e.stopPropagation();
  });

  // Fade out cart when clicked anywhere outside
  $('html').on('click', function(){
    $('.cart-container').fadeOut();
  });

  $(window).on('scroll resize', function(){
    window.requestAnimationFrame(inView);
    $('.anchor').each(function(){
      var id = '#'+$('.in-view').attr('id');
      if(id == $(this).attr('href')){
        $('.anchor').removeClass('active');
        $(this).addClass('active');
      }
    });
  });

  $(window).load(function(){
    window.requestAnimationFrame(inView);
  });

  $(window).bind("pageshow", function(event) {
      if (event.originalEvent.persisted) {
          window.location.reload()
      }
  });

})(jQuery);
