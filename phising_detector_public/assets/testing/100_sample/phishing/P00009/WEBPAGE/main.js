jQuery(document).ready(function () {
    // init curved header
    jQuery('.curved').arctext({radius: 250, rotate: true, dir: 1});


    // lightbox assign validation
    jQuery('a[data-rel]').each(function () {
        jQuery(this).attr('rel', jQuery(this).data('rel'));
    });


    // iphone select nav menu
    selectnav('menu-main');
});

function adjustSubMenus() {
    var menus = jQuery('#menu-main').find('.dropdown-menu');
    menus.each(function () {
        jQuery(this).css("left", "");
        adjustSingleMenu(jQuery(this))
    });
}
function adjustSingleMenu(element) {
    element.show();
    var thisMenuWidth = element.outerWidth();
    var thisMenuPos = element.offset();
    var diff = (thisMenuWidth + thisMenuPos.left) - window.outerWidth;
    if (diff > 0) {
        element.css("left", function () {
            return thisMenuPos.left - diff;
        });
    }
    element.hide();
}
jQuery('body').ready(function () {
    jQuery(window).resize(adjustSubMenus());
    if (window.outerWidth <= 720) {
        jQuery('html').mousedown(function () {
            jQuery('#menu-main').find('.dropdown-menu').each(function (index) {
                if (jQuery(this).is(":visible")) {
                    jQuery(this).css("left", "");
                    jQuery(this).hide();
                }
            });
        });

        jQuery('#menu-main').mousedown(function (event) {
            event.stopPropagation();
        });

        jQuery('.dropdown').mousedown(function () {
            var ele = jQuery(this).find('.dropdown-menu');
            jQuery('#menu-main').find('.dropdown-menu').each(function (index) {
                if (!jQuery(this).is(ele) && jQuery(this).is(":visible")) {
                    jQuery(this).css("left", "");
                    jQuery(this).hide();
                }
            });
            if (ele.is(":visible")) {
                ele.css("left", "");
                ele.hide();
            } else {
                adjustSingleMenu(ele);
                ele.show();
            }
        });
    } else {
        jQuery('.dropdown').hover(function () {
                    jQuery(this).find('.dropdown-menu').stop(true, true).slideDown("fast");
                }, function () {
                    jQuery(this).find('.dropdown-menu').stop(true, true).hide();
                });
    }
});