/* /home/resources/js/page.js */
$(function () {

    // Add class to parent container
    $('#fixed-top').addClass('moving-background-container');
    
    // Stop video
    $('#hero-signup').on('focus', 'input', PAYPAL.Marketing.MovingBackground.BlockAll);
    
    // Play video
    $('#hero-signup').on('blur', 'input', PAYPAL.Marketing.MovingBackground.UnblockAll);
    
    // Anchors
    if ($('#hugger-arrow').length > 0) new PAYPAL.Marketing.ScrollButton('#hugger-arrow');

});

/**
 * Hero notification area
 */

$(function()
{
    // Show/Hide Notification
    $('#hero .hero-notification').on('click', function(e)
    {
        var t = $(e.target);

        // Clicked on anchor
        if (t.get(0).tagName === 'A' && !t.hasClass('expander') && !t.hasClass('closer')) return;

        // Click on open hero notification
        if (t.get(0).tagName !== 'A' && t.get(0).tagName !== 'SPAN' )
        {
            if (!t.closest('.hero-notification').hasClass('open')) return;
        }
        // Click on opener/closer link
        else
        {
            e.preventDefault();
        }

        // Switch open
        t.closest('.hero-notification').toggleClass('open');

        // Set height
        if (t.closest('.hero-notification').hasClass('open'))
        {
            var th = t.closest('.hero-notification').parent().height();
            t.closest('.hero-notification').css('height', th + 'px');
        }
        else
        {
            t.closest('.hero-notification').css('height', '');
        }

        // Focus
        window.setTimeout(function()
        {
            if (t.closest('.hero-notification').hasClass('open'))
            {
                //t.closest('.hero-notification').find('.closer').focus();
                t.closest('.hero-notification').attr('role', 'region').attr('tabIndex', '-1');
                t.closest('.hero-notification').focus();
            }
            else
            {
                t.closest('.hero-notification').find('.expander').focus();
            }
        }, 50);
    });

    // Resize notification window
    $(window).on('resize', function(e)
    {
        var hn = $('#hero .hero-notification');
        if (hn.hasClass('open'))
        {
            var th = hn.parent().height();
            hn.css('height', th + 'px');
        }
    });
});

/**
 * Sticky navigation & expanding rows partials
 */
$(function() {
    // Sticky nav & fat-footer
    // adding condition to initialize floating bar only when it exists
    if ($('#sticky-nav').length !== 0) {
        if (!$('#sticky-nav').hasClass('non-sticky')) {
            new PAYPAL.Marketing.FloatingBar('#sticky-nav');
        }
    }

    $('#jump-bar-select, #fatfooter-select, #nav-bar-select').on('change', function(e) {
        var val = $(e.target).val();
        if (val) window.location = val;
    });

    // // Adding current state, on sticky nav link clicks
    // $('.sticky-nav-links').on('click', function(e) {
    //     $('.sticky-nav-links').removeClass('current');
    //     $(e.currentTarget).addClass('current');
    // });

    // Mobile expanding rows
    $('.expand-rows').on('click', '.expander', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $target = $(e.target),
            t = ($target.hasClass('expander')) ? $target : $target.parent('.expander'),
            section = t.data('section');

        t.find('.expand-' + section).toggleClass('open').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
        });
        t.siblings('.expanding.para-' + section).toggleClass('open');
    });

    // closing android-banner
    $('.smart-banner .close').on('click', function() {
        $('.smart-banner').hide();
    });

});

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iPhone: function() {
        return navigator.userAgent.match(/iPhone/i);
    },
    iPad: function() {
        return navigator.userAgent.match(/iPad/i);
    },
    iPod: function() {
        return navigator.userAgent.match(/iPod/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var attachScroll = function(elem, offset, callback) {
    $(elem).click(function(e) {
        var $this = $(this),
            target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
        if (target.indexOf('#') === 0) {
            e.preventDefault();
            doScroll(target, offset, callback);
        }
    });
};


var doScroll = function(tgt, offset, callback, duration) {
    var os = offset || 0,
        target_offset = $(tgt).offset(),
        topOffset = (target_offset) ? target_offset.top : 0,
        duration = duration || 'slow';
    $('html,body').animate({
        scrollTop: topOffset + os
    }, duration, function() {
        if (typeof callback == 'function') {
            callback.call(this);
        }
    });
};

// to use, you need to include on the page: /resources/js/skrollr.min.js
// before partials.js
var setSkrollr = function($el, data) {
    for (var i = 0, l = data.length; i < l; i++) {
        var d = data[i],
            px = d[0];
        css = d[1];
        $el.attr('data-' + px, css);
    }
    if (skrollr) {
        skrollr.init({
            smoothScrolling: false
        });
    }
};

var animatePopout = function() {
    var $hero = {},
        $popOutImg = {},
        startingPosition = 0,
        poisitionDelta = 0,
        $popOutStickyNav = {
            elm: $($('.sticky-nav-global')[0])
        };
    $hero.elm = $('.hero-bg');
    $hero.top = ($hero.elm.length) ? $hero.elm.offset().top : 0;
    $hero.outerheight = ($hero.elm.length) ? $hero.elm.outerHeight() : 0;

    $popOutImg.elm = $hero.elm.find('img');
    $popOutImg.cssTop = ($popOutImg.elm.length) ? parseInt($popOutImg.elm.css('top'), 10) : 0;
    $popOutImg.outerheight = ($popOutImg.elm.length) ? $popOutImg.elm.outerHeight() : 0;
    $popOutImg.topPosition = ($popOutImg.elm.length) ? $popOutImg.elm.position().top : 0;

    // setting timeout to give a chance to image to fully load.
    $popOutStickyNav.top = $popOutStickyNav.elm.offset().top;
    $popOutStickyNav.outerheight = $popOutStickyNav.elm.outerHeight();
    $popOutStickyNav.offsetData = parseInt($popOutStickyNav.elm.data('offset'));

    poisitionDelta = ($popOutImg.cssTop + $popOutImg.outerheight) - ($popOutStickyNav.top + $popOutStickyNav.outerheight);
    poisitionDelta = (poisitionDelta < 0) ? (poisitionDelta * -1) : poisitionDelta;

    startingPosition = $popOutStickyNav.top - poisitionDelta - $popOutStickyNav.offsetData;

    setSkrollr($popOutImg.elm, [
        [startingPosition, 'top: ' + $popOutImg.cssTop + 'px;'],
        [$popOutStickyNav.top, 'top: ' + ($popOutImg.topPosition - poisitionDelta) + 'px;']
    ]);
};

if ($('.hero-bg').hasClass('hero-pop-out') && (!isMobile.any())) {
    setTimeout(function() {
        animatePopout();
    }, 1000);

}

