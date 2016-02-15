jQuery(document).ready(function($) {
  //change visible slide
  $('.hero-footer__carousel li').on('click', function(event) {
    event.preventDefault();
    var selectedItem = $(this);
    if (!selectedItem.hasClass('selected')) {
      // if it's not already selected
      var selectedPosition = selectedItem.index(),
        activePosition = $('.hero-banner__carousel .selected').index();
      if (activePosition < selectedPosition) {
        nextSlide($('.hero-banner__carousel'), $('.hero-footer__carousel'), selectedPosition);
      } else {
        prevSlide($('.hero-banner__carousel'), $('.hero-footer__carousel'), selectedPosition);
      }
      updateNavigationMarker(selectedPosition + 1);
    }
  });

  function nextSlide(container, pagination, n) {
      var visibleSlide = container.find('.selected'),
        navigationDot = pagination.find('.selected');

      visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        visibleSlide.removeClass('is-moving');
      });

      container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
      navigationDot.removeClass('selected')
      pagination.find('li').eq(n).addClass('selected');

    }
    function prevSlide(container, pagination, n) {
    var visibleSlide = container.find('.selected'),
      navigationDot = pagination.find('.selected');

    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
    navigationDot.removeClass('selected');
    pagination.find('li').eq(n).addClass('selected');

  }
  function updateNavigationMarker(n) {
    $('.cd-marker').removeClassPrefix('item').addClass('item-' + n);
  }

  $.fn.removeClassPrefix = function(prefix) {
    //remove all classes starting with 'prefix'
    this.each(function(i, el) {
      var classes = el.className.split(" ").filter(function(c) {
        return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = $.trim(classes.join(" "));
    });
    return this;
  };
});
