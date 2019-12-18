var FlyoutMenu = FlyoutMenu || (function ($) {

    var menuData,
        numColumns = 4,
        categoryLayersList = [],
        currentActiveIndex = -1,
        formerActiveIndex = -1,
        $activeTopNavItem = null,
        $oldActiveTopNavItem = null,
        $pageDefaultActiveTopNavItem = null,
        timer,
        hideDelay = 100,
        mouseOutBlocked,
        domain;


    var sortByPosAttr = function (a, b) {
        if (a['pos'] && b['pos']) {
            return parseInt(a['pos'], 10) - parseInt(b['pos'], 10);
        } else {
            return 0;
        }
    };


    var initialize = function () {

        if ($.browser.msie && location.hostname.indexOf('co.th') != -1) {
            $('div.quicksearch').css('width', '170px');
            $('#q').css('width', "115px");
        }

        $pageDefaultActiveTopNavItem = $(".faceliftNavigationMain #nav li a.nav_top_active");

        if (menuData) {
            $('#nav').addClass('flyout-js');
            domain = window.location.host;
        } else {
            return;
        }

        menuData.sort(sortByPosAttr);

        $('.navigation_main').after('<div id="flyout-container"><div id="flyout-top-shadow"><img src="//' + domain + '/img/facelift/common/flyout_top_shadow.png" width="980" height="11" /></div><div id="flyout-nav-area"></div><div id="flyout-right"><img id="flyout-shadow-right-img" src="//' + domain + '/img/facelift/common/flyout_nav_shadow_right.png" alt="" width="15"></div><div id="flyout-bottom">&nbsp;</div></div>');

        $('#flyout-container').hover(
            function () {
                clearTimeout(timer);
                mouseOutBlocked = true;

                $('#nav > li:eq(' + currentActiveIndex + ')').addClass('hover');
            },
            function () {
                setTimer();
            }
        );

        var $validItems = $('#nav > li');

        $validItems.hover(
            function () {
                $this = $(this);
                $this.addClass('hover');
                $activeTopNavItem = $this;
                currentActiveIndex = $validItems.index($this);
                mouseOutBlocked = true;
                showMenu(categoryLayersList[currentActiveIndex], currentActiveIndex);
                formerActiveIndex = currentActiveIndex;
                $oldActiveTopNavItem = $activeTopNavItem;
            },
            function () {
                formerActiveIndex = $validItems.index($(this));
                setTimer();
            }
        );

        render();
    };


    var setTimer = function () {
        mouseOutBlocked = false;
        timer = setTimeout(function () {
            if (!mouseOutBlocked) {

                $pageDefaultActiveTopNavItem.addClass("nav_top_active").removeClass("nav_top");

                $('#flyout-container').css('display', 'none');
                hideFormerMenu();
            }
        }, hideDelay);
    };


    var showMenu = function ($elem, _idx) {

        $pageDefaultActiveTopNavItem.addClass("nav_top").removeClass("nav_top_active");

        hideFormerMenu();
        if (menuData[_idx].submenu) {
            if ($elem) {
                $('#flyout-container').css('display', 'block');
                $elem.css('display', 'block');
                var h = parseInt($('#flyout-nav-area').height(), 10) + parseInt($('#flyout-nav-area').css('padding-bottom'));
                $('#flyout-shadow-right-img').height(h);
            }
        } else {
            $('#flyout-container').css('display', 'none');
        }
    };


    var hideFormerMenu = function () {
        if (formerActiveIndex != -1 && categoryLayersList[formerActiveIndex]) {
            categoryLayersList[formerActiveIndex].css('display', 'none');
            formerActiveIndex = -1;
        }
        if ($oldActiveTopNavItem) {
            $oldActiveTopNavItem.removeClass('hover');
        }
    };


    var render = function () {
        var menu = menuData;

        for (var i = 0; i < menu.length; i++) {

            var tmpItem = menu[i];
            var isIE6 = $.browser.msie && parseFloat($.browser.version) < 7;

            var html = '';
            html += '<div class="flyout-main-category" id="menu-' + i + '" style="display:none;">';
            html += '<div class="flyout-headline-holder">';
            if (tmpItem.iconPath && tmpItem.iconPath != '') {
                if (isIE6) {
                    html += '<div style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'\/\/' + domain + tmpItem.iconPath + '\',sizingMethod=\'scale\'); width:121px; height: 79px" class="flyout-icon">&nbsp;</div>';
                } else {
                    html += '<div class="flyout-icon"><img src="//' + domain + tmpItem.iconPath + '" width="121" height="79" alt="" /></div>';
                }
            }
            if (tmpItem.headline && tmpItem.headline != '') {
                html += '<h2>' + tmpItem.headline + '</h2>';
            }
            html += '</div>';
            html += '<div class="flyout-col-container">';
            for (var j = 1; j <= numColumns; j++) {
                html += '<div id="col-' + i + '-' + j + '" class="col"></div>';
            }
            html += '</div>';
            html += '</div>';
            $('#flyout-nav-area').append(html);

            if (tmpItem.submenu) {
                menuRenderer(tmpItem.submenu, i);
            }
            categoryLayersList.push($('#menu-' + i));
        }

        $('.col').find('a:first').addClass('flyout-first-item');

    };

    var getLinkHTMLByItem = function (item) {

        var linkHTML = '',
            linkURL = '',
            attribs = '';

        // Target specified?
        var tmpTarget = item.target;
        if (tmpTarget && tmpTarget != '') {
            if (tmpTarget == 'popup' && item.onclick) {
                // Is popup?
                attribs += ' onclick=\"' + item.onclick + '\"';
            } else {
                // ... or normal target?
                attribs += ' target=\"' + tmpTarget + '\"';
            }
        }

        // Is external link?
        if (item.isexternal && item.isexternal != '') {
            attribs += ' class="arrowLinkUp"';
        } else {
            attribs += ' class="arrowLink"';
        }

        linkURL = item.path;
        linkHTML = '<a ' + attribs + ' href="' + linkURL + '">' + item.label + '</a>';

        return linkHTML;
    }


    var menuRenderer = function (menuItem, index) {
        menuItem.sort(sortByPosAttr);
        for (var i = 0; i < menuItem.length; i++) {
            var html = '<ul class="flyout-lvl2">';
            var tmpItem = menuItem[i];

            html += '<li class="flyout-lvl2">' + getLinkHTMLByItem(tmpItem) + '</li>';
            if (tmpItem.submenu) {
                var submenu = tmpItem.submenu;

                html += '<ul class="flyout-lvl3">';
                for (var j = 0; j < submenu.length; j++) {
                    var tmpSubmenuItem = submenu[j];

                    html += '<li class="flyout-lvl3">' + getLinkHTMLByItem(tmpSubmenuItem) + '</li>';
                }
                html += '</ul>';
            }

            var slot = (parseInt(tmpItem.pos, 10)) % numColumns;
            if (slot == 0) {
                slot = numColumns;
            }
            var slotId = "col-" + index + "-" + slot;
            html += '</ul>';
            $('#' + slotId).append(html);
        }
    };


    return {

        setData: function (_data) {
            menuData = _data;
        },

        init: function () {
            initialize();
        }

    }

}(jQuery));