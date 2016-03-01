$(document).ready(function () {
  $('.input-people-choice').click(function () {
    swapText($('.var-1'), 'var-in', $(this).text().trim().toLowerCase());
  });
});
