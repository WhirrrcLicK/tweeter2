$(document).ready(function() {
  $('#tweet-text').on('input', onInput);
});

const onInput = function(event) {
  const currentCount = $(this).val().length;

  const counterElem = $(this).parent().children('.submit-tweet').children('.counter');
  const remainingCount = 140 - currentCount;

  counterElem.text(remainingCount);
  if (remainingCount < 0) {
    counterElem.css('color', '#d40e49');
  } else {
    counterElem.css('color', '#37393b');
  }
};