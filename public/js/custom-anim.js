/**
 * Get true textWidth
 * @method textWidth
 * @return {Number} the width of the text
 * Credit: http://stackoverflow.com/questions/1582534/calculating-text-width-with-jquery
 */
$.fn.textWidth = function() {
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};

/**
 * Custom swap text animation
 * @method swapText
 * @param  {Object} elem      jquery object of container
 * @param  {String} swapClass class of inner swap
 * @param  {String} inText    text to swap in
 */
function swapText(elem, swapClass, inText) {
  var vIn = elem.find('.' + swapClass);

  // stop all current animations
  vIn.velocity('stop');
  elem.velocity('finish');

  // main animation
  vIn.velocity({
    top: '2em'
  }, {
    duration: 200,
    easing: 'easeOut',
    complete: function() {
      vIn.attr('style', '');
      vIn.text(inText);
      var inWidth = vIn.textWidth() + 20;
      elem.velocity({
        width: inWidth
      }, {
        duration: 200,
        easing: 'easeOutQuad'
      });
      vIn.velocity({
        top: 0
      }, {
        duration: 200,
        easing: 'easeOut'
      });
    }
  });
}

function swapText2(elem, swapClass, inText) {
  var vIn = $(elem).find('.' + swapClass);

  // stop all current animations
  $('.clone').velocity('finish').remove();
  vIn.velocity('stop');
  $(elem).velocity('finish');

  // clone for text fade out
  var vClone = vIn.clone().addClass('clone').css('opacity', '1');
  $(elem).append(vClone);

  vIn.css('visibility', 'hidden');
  vIn.attr('style', '');

  vIn.text(inText);
  var inWidth = vIn.textWidth() + 20;

  // main animations
  setTimeout(function() {
    vIn.css('visibility', 'visible');
    $(elem).velocity({
      width: inWidth
    }, {
      duration: 400,
      easing: 'easeOutQuad'
    });
    $(vIn).velocity({
      top: 0
    }, {
      duration: 400,
      easing: 'easeOut'
    });
    $(vClone).velocity({
      translateY: 100,
      opacity: 0
    }, {
      duration: 400,
      easing: 'easeOut',
      complete: function() {
        vClone.remove();
      }
    });
  }, 0);
}
