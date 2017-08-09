// same thing as the $(function() {});
// $( document ).ready(function() {
//     console.log( "ready!" );
// });

$(function() {
  var maxCount = 140;

  $("textarea").on("keypress", function(event) {
    maxCount--;
    console.log(maxCount)
  });

  $("textarea").on("keydown", function(event) {
    if (event.key === "Backspace") {
      maxCount++;
      console.log(maxCount);
    }
  });



});


