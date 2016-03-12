/**
 * Data
 */

// conversions
var galPerShower = 17.2;
var almond = 1.1;
var poundBeef = 1824;
var minSurvival = 1.98;
var avgAfricanFamily = 5;
var golfPerDay = 2976.1875;
var beansCoffee = 37;

var state = {};
state.people = 0; // how many people
state.duration = 0; // weeks of one less shower per week
state.textPeople = ''; // narrative text for # people
state.textDuration = ''; // narrative text for duration
state.text1 = ''; // for comparison
state.text2 = ''; // for comparison
state.conversion = 0;
state.waterAmt = function () { // get total water amount
  return this.people * this.duration * galPerShower;
};
state.textComparison = function () { // narrative text for comparison
  var num = this.waterAmt() / this.conversion;
  return this.text1 + num.toFixed(2) + this.text2;
};
state.log = function () { // for debugging
  console.log(this);
};

/**
 * Helper functions
 */

function weeksToText(weeks) {
  var months, mText, wText;
  if (weeks === 52) return '1 year';

  months = Math.floor(weeks / 4.3);
  mText = '' + months + ' month' + (months > 1 ? 's' : '');
  weeks = Math.floor(weeks % 4.3);
  wText = '' + weeks + ' week' + (weeks > 1 ? 's' : '');
  // mText = (months === 1 ? 'a' : months) + ' month' + (months > 1 ? 's' : '');
  // weeks = Math.floor(weeks % 4.3);
  // wText = (weeks === 1 ? 'a' : weeks) + ' week' + (weeks > 1 ? 's' : '');
  return (months > 0 ? mText : '') + (months && weeks ? ' & ' : '') + (weeks > 0 ? wText : '');
}

/**
 * Handling some responsive things
 */
var adjustHeader;
$(window).load(function () {
  // Handle variable height fixed header padding
  function adjustVariableHeader () {
    $('.narrative').css('padding-bottom', $('.narrative').outerHeight(true) * 0.33);
    $('.under-narrative-content').css('padding-top', $('.narrative').outerHeight(true));
  }
  adjustHeader = adjustVariableHeader;
  adjustVariableHeader();
  $(this).resize(adjustVariableHeader);
});

/**
 * Main driver
 */
$(document).ready(function () {
  function updateComparison() {
    if (state.conversion)
      swapText($('.var-3'), 'var-in', state.textComparison(), adjustHeader);
  }

  $('.input-people-choice').click(function () {
    var textIn = $(this).data('narrative');
    var numIn = $(this).data('num-people');
    swapText($('.var-1'), 'var-in', textIn, adjustHeader);
    $('.input-people-choice').removeClass('input-people-choice-selected');
    $(this).addClass('input-people-choice-selected');
    state.people = numIn;
    state.textPeople = textIn;
    state.log();
    updateComparison();
  });
  $('.time-range').on('input', function () {
    $('.num-weeks').removeClass('not-selected');
    var numWeeks = Math.ceil($(this).val() * 0.52);
    var textIn = weeksToText(numWeeks);
    $('.num-weeks').text(textIn);
    state.duration = numWeeks;
    state.textDuration = textIn;
    state.log();
  });
  $('.time-range').change(function () {
    $('.time-choice').addClass('time-choice-selected');
    swapText($('.var-2'), 'var-in', state.textDuration, adjustHeader);
    updateComparison();
  });
  $('.time-range').click(function () {
    if (!state.duration) {
      $('.time-range').trigger('input');
      $('.time-range').trigger('change');
    }
  });
  $('.comp-choice').click(function () {
    state.text1 = $(this).data('text1');
    state.text2 = $(this).data('text2');
    state.conversion = $(this).data('conversion');
    $('.comp-choice').removeClass('comp-choice-selected');
    $(this).addClass('comp-choice-selected');
    updateComparison();
  });
});

$(document).ready(function () {
  $('.introduction button').on('click', function () {
    $(this).parent().fadeOut();
  });
  $('.theMap button').on('click', function () {
    location.href = '/one-less-shower';
  });

  $('.facebook').on('click', function () {
    var url = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
    var width = 595;
    var height = 465;
    var left = window.screenX + window.outerWidth / 2 - width / 2;
    var top = window.screenY + window.outerHeight / 2 - height / 2;
    window.open(url, 'facebookShareWindow', 'height=' + height + ',width=' + width + ',left=' + left + ',top=' + top);
  });
});
