// same thing as the $(function() {});
// $( document ).ready(function() {
//     console.log( "ready!" );
// });

$(function() {
  // var maxCount = 140;

  // $("textarea").on("keypress", function(event) {
  //   maxCount--;
  //   console.log(maxCount)
  // });

  // $("textarea").on("keydown", function(event) {
  //   if (event.key === "Backspace") {
  //     maxCount++;
  //     console.log(maxCount);
  //   }
  // });


  $('.new-tweet').find('textarea').on('keyup', function() {
    const charsLeft = 140 - $(this).val().length;
    const counter = $(this).closest('form').find('.counter');
    counter.text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });


});


