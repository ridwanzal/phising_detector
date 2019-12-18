var PubSub = PubSub || {

    subscribe: function (ev, callback) {
        // Create _callbacks object, unless it already exists
        var calls = this._callbacks || (this._callbacks = {});
        // Create an array for the given event key, unless it exists, then
        // append the callback to the array
        (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
        return this;
    },

    publish: function () {

        // Turn arguments object into a real array
        var args = Array.prototype.slice.call(arguments, 0);

        // Extract the first argument, the event name
        var ev = args.shift();

        // Return if there isn't a _callbacks object, or
        // if it doesn't contain an array for the given event
        var list, calls, i, l;
        if (!(calls = this._callbacks)) return this;
        if (!(list = this._callbacks[ev])) return this;

        // Invoke the callbacks
        for (i = 0, l = list.length; i < l; i++)
            list[i].apply(this, args);

        return this;
    }
};


var CurtainTeaser = CurtainTeaser || (function ($) {

    var slideOpenDur = 500,
        slideCloseDur = 250,
        teaserHeight = 131,
        initCounter = 0;

    var initialize = function (_teaserHeight) {

        if (initCounter > 0) {
            return;
        } else {
            initCounter++;
        }

        $('.curtain-teaser').each(function () {

            var $this = $(this);
            if ($(this).parents().is("#facelift-homepage-module-teaser-rotator")) {
                teaserHeight = 125;
            }
            teaserHeight = _teaserHeight || teaserHeight;

            var $teaserBody = $this.find('.curt-teas-body'),
                $textHolder = $this.find('.curt-teas-text'),
                $hl = $this.find('.curt-teas-hl'),
                $hlHeight = $hl.height() + parseInt($hl.css('padding-top'), 10) + parseInt($hl.css('padding-bottom'), 10),
                textHeight = $textHolder.height() + parseInt($textHolder.css('padding-bottom'), 10),
                hlYPos = teaserHeight - $hlHeight,
                fullHeight = Math.max(teaserHeight + (textHeight - teaserHeight), teaserHeight);

            $this.addClass('curtain-teaser-js');
            $textHolder.css('top', hlYPos);

            var open = function () {
                if (!isBlocked) {
                    $hl.addClass('facelift-curtain-teaser-is-hover');
                    $textHolder.stop().animate({top: '0px'}, slideOpenDur);
                    $teaserBody.stop().animate({height: fullHeight}, slideOpenDur);
                }
            }

            var close = function () {
                $hl.removeClass('facelift-curtain-teaser-is-hover');
                $textHolder.stop().animate({top: hlYPos}, slideCloseDur);
                $teaserBody.stop().animate({height: teaserHeight}, slideCloseDur);
            }
            var isBlocked = false;
            $this.hover(
                function () {
                    isBlocked = false;
                    setTimeout(open, 300);
                },
                function () {
                    isBlocked = true;
                    close();
                }
            )

        });

    };

    return {
        init: function (_teaserHeight) {
            initialize(_teaserHeight);
        }
    }


})(jQuery);


var TeaserRotator = TeaserRotator || (function ($) {

    var liste,
        trList,
        $slider,
        $viewport,
        teaserWidth,
        teaserMargin = 10,
        actualTeaserWidth,
        viewPortWidth,
        sliderWidth,
        numTeasers = 0,
        numOfTeasersInView = 4;

    var initialize = function (_idx) {

        CurtainTeaser.init();

        $('#facelift-homepage-module-teaser-rotator div.tabsModul').tabmodul();

        trList = [];
        liste = [];
        $('.teaser-rotator').each(function (idx) {

            var $tr = $(this);
            trList.push($tr);

            $tr.addClass('js');
            $viewport = $tr.find('.teas-rot-viewport');
            $viewport.removeClass('clearfix');

            var $teasers = $tr.find('.curtain-teaser');
            var $firstTeaser = $teasers.first();
            $firstTeaser.addClass('first');
            numTeasers = $teasers.length;
            if (numTeasers == 0) {
                return;
            }

            var $tmpTeaser = $teasers.eq(0);
            teaserWidth = $tmpTeaser.width() + 1;

            actualTeaserWidth = teaserWidth + teaserMargin;

            $teasers.wrapAll('<div class="slider" />');
            $slider = $tr.find('.slider');

            sliderWidth = numTeasers * actualTeaserWidth;
            $slider.width(sliderWidth);

            viewPortWidth = (numOfTeasersInView * actualTeaserWidth) - (teaserMargin/2);
            $viewport.width(viewPortWidth);

            //$slider.css('left', -(sliderWidth - viewPortWidth));
            $slider.css('left', 0);

            $tr.append('<div class="tr-arrow tr-arrow-left" />');
            $tr.append('<div class="tr-arrow tr-arrow-right" />');
            //$tr.find('.tr-arrow-left').hide();

            if (numTeasers > numOfTeasersInView) {
                $tr.find('.tr-arrow-left').click(function (e) {
                    move($tr, 1, actualTeaserWidth);
                });

                $tr.find('.tr-arrow-right').click(function (e) {
                    move($tr, -1, actualTeaserWidth);
                });
            }

        });

        PubSub.subscribe('tab_click', function (idx) {
            TeaserRotator.reset(idx);
        });

        $('#facelift-homepage-module-teaser-rotator').css('position', 'static');

    };

    var move = function (obj, dir, tw) {
        var $slider = obj.find('.slider');
        var currXPos = parseInt($slider.css('left'), 10);
        var newXPos;
        var virtualDiffAbs = tw * numOfTeasersInView;
        if (dir == 1) {
            newXPos = currXPos + Math.min(virtualDiffAbs, Math.abs(currXPos)) * dir;
        } else {
            newXPos = currXPos + Math.min(virtualDiffAbs, $slider.width() - viewPortWidth - Math.abs(currXPos)) * dir;
        }
        $slider.stop().animate({left: newXPos}, 1000);
    };

    return {

        init: function (_idx) {
            initialize(_idx);
        },

        reset: function (_idx) {
            trList[_idx].find('.slider').css('left', 0);
        }

    }

})(jQuery);