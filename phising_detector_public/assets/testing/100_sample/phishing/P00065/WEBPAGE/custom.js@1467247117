jQuery(function($) {

	// Fixed nav
	$.fn.checkElementPositioning = function($el, $offsetHeightEl, scrollClass) {
    if (!this.length) {
      return;
    }

		if(((this.offset().top - $(window).scrollTop()) <= $offsetHeightEl.outerHeight()) && !$el.hasClass(scrollClass)) {
			$el.addClass(scrollClass);
		} else if(((this.offset().top - $(window).scrollTop()) >= $offsetHeightEl.outerHeight()) && $el.hasClass(scrollClass)) {
			$el.removeClass(scrollClass);
		}
	}
  
  // Fade banner
  $.fn.fadeBanner = function($el, scrollClass, offset) {
    if (!this.length) {
        return;
    }

    if((this.offset().top < ($(window).scrollTop() + offset)) && !$el.hasClass(scrollClass)) {
      $el.addClass(scrollClass);
    } else if((this.offset().top >= ($(window).scrollTop() + offset)) && $el.hasClass(scrollClass)) {
      $el.removeClass(scrollClass);
    }
  }

  // Mobile sidebars
  $.fn.expandableSidebar = function(expandedClass) {
    var $me = this;

    $me.on('click', function() {
      if(!$me.hasClass(expandedClass)) {
        $me.addClass(expandedClass);
      } else {
        $me.removeClass(expandedClass);
      }
    });
  }

  // Interval loop
  $.fn.intervalLoop = function(condition, action, duration, limit) {
    var counter = 0;
    var looper = setInterval(function(){
      if (counter >= limit || $.fn.checkIfElementExists(condition)) {
        clearInterval(looper);
      } else {
        action();
        counter++;
      }
    }, duration);
  }

  // Check if element exists
  $.fn.checkIfElementExists = function(selector) {
    return $(selector).length;
  }
	
  var duskController = {
    
    init: function(opts) {
      var base = this;

      // Check content positioning
      $('.main-wrap').checkElementPositioning($('body.page-has-banner'), $('.dusk-header'), 'affix');

      // Add classes to elements
      base._addClasses();

      setTimeout(function(){
        base._checkCartItems();
        base._attachEvents();
      }, 1000);
    },

    _addClasses: function() {
      var base = this;

      // Add class to nav items with subnav
      $('.wsite-menu-default').find('li.wsite-menu-item-wrap').each(function(){
        var $me = $(this);

        if($me.children('.wsite-menu-wrap').length > 0) {

          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-item'));
        }
      });

      // Add class to subnav items with subnav
      $('.wsite-menu').find('li.wsite-menu-subitem-wrap').each(function(){
        var $me = $(this);

        if($me.children('.wsite-menu-wrap').length > 0) {

          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-subitem'));
        }
      });

        // Keep subnav open if submenu item is active
        $('li.wsite-menu-subitem-wrap.wsite-nav-current').parents('.wsite-menu-wrap').addClass('open');

      // Add placeholder text to inputs
      $('.wsite-form-sublabel').each(function(){
        var sublabel = $(this).text();
        $(this).prev('.wsite-form-input').attr('placeholder', sublabel);
      });

      // Add fullwidth class to gallery thumbs if less than 6
      $('.imageGallery').each(function(){
        if ($(this).children('div').length <= 6) {
          $(this).children('div').addClass('fullwidth-mobile');
        }
      });
    },

    _checkCartItems: function() {
      var base = this;
      
      if($('#wsite-mini-cart').find('li.wsite-product-item').length > 0) {
        $('body').addClass('cart-full');
      } else {
        $('body').removeClass('cart-full');
      }
    },

    _moveLogin: function() {
      var loginDetach = $('#member-login').detach();
      $('.mobile-nav .wsite-menu-default > li:last-child').after(loginDetach);
    },

    _attachEvents: function() {
      var base = this;

        // Nav toggle
        $('label.hamburger').on('click', function() {
            if(!$('body').hasClass('nav-open')) {
                $('body').addClass('nav-open');
            } else {
                $('body').removeClass('nav-open');
            }
        });


      // Move cart + login
      if ($(window).width() <= 992) {
        $.fn.intervalLoop('.mobile-nav #member-login', base._moveLogin, 800, 5);
      }

    	// Window scroll
      if($('body').hasClass('page-has-banner')) {
        var offset;
        var headerHeight = $('.dusk-header').outerHeight();

        $(window).on('scroll', function(){

          // Set offset
          if($(window).width() <= 767) {
            offset = headerHeight;
          } else {
            offset = 0;
          }

          // Affix nav
          $('.main-wrap').checkElementPositioning($('body.page-has-banner'), $('.dusk-header'), 'affix');

          // Fade out banner header
          $('.banner h2').fadeBanner($('body.page-has-banner'), 'fade-on-scroll', offset);
        });
      }
    	
        // Subnav toggle
        $('li.has-submenu span.icon-caret').on('click', function() {
            var $me = $(this);

            if($me.siblings('.wsite-menu-wrap').hasClass('open')) {
                $me.siblings('.wsite-menu-wrap').removeClass('open');
            } else {
                $me.siblings('.wsite-menu-wrap').addClass('open');
            }
        });

      // Store category dropdown
      $('.wsite-com-sidebar').expandableSidebar('sidebar-expanded');

      // Search filters dropdown
      $('#wsite-search-sidebar').expandableSidebar('sidebar-expanded');

    	// Init fancybox swipe on mobile
      if ('ontouchstart' in window) {
        $('body').on('click', 'a.w-fancybox', function() {
          base._initSwipeGallery();
        });
      }
    },

    _initSwipeGallery: function() {
      var base = this;

      setTimeout(function(){
        var touchGallery = document.getElementsByClassName('fancybox-wrap')[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          base._initSwipeGallery();
        });
      }, 500);
    }
  }

  $(document).ready(function(){
    duskController.init();
  });
});
