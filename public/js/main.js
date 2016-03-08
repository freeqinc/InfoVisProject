/**
 * Data
 */
var state = {};
state.people = 0; // how many people
state.duration = 1; // weeks of one less shower per week
state.textPeople = ''; // narrative text for # people
state.textDuration = ''; // narrative text for duration
state.textComparison = ''; // narrative text for comparison
state.log = function () { // for debugging
  console.log(this);
};

/**
 * Handling some responsive things
 */
$(window).load(function () {
  // Handle variable height fixed header padding
  function adjustVariableHeader () {
    $('.narrative').css('padding-bottom', $('.narrative').outerHeight(true) * 0.33);
    $('.under-narrative-content').css('padding-top', $('.narrative').outerHeight(true));
  }
  adjustVariableHeader();
  $(this).resize(adjustVariableHeader);
});

/**
 * Main driver
 */
$(document).ready(function () {
  $('.input-people-choice').click(function () {
    var textIn = $(this).data('narrative');
    var numIn = $(this).data('num-people');
    swapText($('.var-1'), 'var-in', textIn);
    $('.input-people-choice').removeClass('input-people-choice-selected');
    $(this).addClass('input-people-choice-selected');
    state.people = numIn;
    state.textPeople = textIn;
    state.log();
  });
  $('.time-range').on('input', function () {
    $('.num-weeks').removeClass('not-selected');
    var numWeeks = Math.ceil($(this).val() * 0.52);
    var textIn = numWeeks + ' week' + (numWeeks > 1 ? 's' : '');
    $('.num-weeks').text(textIn);
    state.duration = numWeeks;
    state.textDuration = textIn;
    state.log();
  });
  $('.time-range').change(function () {
    $('.time-choice').addClass('time-choice-selected');
    swapText($('.var-2'), 'var-in', state.textDuration);
  });
});
