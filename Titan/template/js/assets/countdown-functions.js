$(function(){
  $("#countdown").countdown("2017/01/01", function(event) {
    $('.day .text').text(event.strftime('%D'));
    $('.hours .text').text(event.strftime('%H'));
    $('.minutes .text').text(event.strftime('%M'));
    $('.seconds .text').text(event.strftime('%S'));
  });
});
