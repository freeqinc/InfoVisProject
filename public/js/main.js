$(document).ready(function () {
  $('.input-people-choice').click(function () {
    swapText($('.var-1'), 'var-in', $(this).text().trim().toLowerCase());
  });
});
$(window).load(function () {
  // Handle variable height fixed header padding
  function adjustVariableHeader () {
    $('.narrative').css('padding-bottom', $('.narrative').outerHeight(true) * 0.33);
    $('.under-narrative-content').css('padding-top', $('.narrative').outerHeight(true));
  }
  adjustVariableHeader();
  $(this).resize(adjustVariableHeader);
});
