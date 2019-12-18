jQuery(document).ready(function () {

    /**
     * Read quicksearch default text
     */
    var quicksearchDefaultText = jQuery(".faceliftNavigationMain .quicksearch label").text();


    /**
     * place the quick search default text in the quicksearch field and add the class is-empty
     */
    jQuery(".faceliftNavigationMain .quicksearch input#q").val(quicksearchDefaultText).addClass("is-empty");


    /**
     * remove the default text and is-empty class from the quicksearch
     */
    jQuery(".faceliftNavigationMain .quicksearch input#q").bind("click change focus", function () {
        var searchfield = jQuery(this);

        if (searchfield.hasClass("is-empty")) {
            searchfield.val("");
        }

        searchfield.removeClass("is-empty");
    });


    /**
     * reenter the default value and the is-empty class if the value of the quicksearch is empty
     */
    jQuery(".faceliftNavigationMain .quicksearch input#q").bind("blur", function () {
        var searchfield = jQuery(this);

        if (searchfield.val() === "") {
            searchfield.val(quicksearchDefaultText).addClass("is-empty");
        }
    });


    /**
     * Hide empty task center child elements
     *
     */
    jQuery(".facelift .content_cross_reference .taskcenter #mainTaskCTabContainer .ngwexpandableparsys .section, .facelift .content_cross_reference .miniTaskCenter .ngwstandardparsys").each(function (k, v) {

        var sectionText = jQuery.trim(jQuery(this).text());

        if (typeof sectionText === "undefinded" || sectionText === "" || sectionText === " ") {
            jQuery(this).remove();
        }

    });


    /**
     * When the Main Navigation is hovered, show the current pages nav element as it was inactive
     */
    var activePageNavElement = {};
    jQuery(".faceliftNavigationMain #nav").hover(
        function () {
            activePageNavElement = jQuery(".faceliftNavigationMain #nav li a.nav_top_active");

            if (activePageNavElement != null && typeof activePageNavElement !== "undefined") {

                activePageNavElement.addClass("nav_top").removeClass("nav_top_active");
            }
        },
        function () {
            if (activePageNavElement != null && typeof activePageNavElement !== "undefined") {

                if (jQuery(".faceliftNavigationMain #nav > li.hover").length <= 0) {

                    activePageNavElement.addClass("nav_top_active").removeClass("nav_top");
                }
            }
        }
    );


    /**
     * Init the marketing stage if present
     */
    if (jQuery(".marketingStage").length > 0) {

        if (jQuery(".leftmenunav").length > 0 && jQuery(".headlineflashimage").length <= 0) {

            jQuery(".leftmenunav").css("padding-top", "19px");
        }

        if (jQuery(".content_main_index").length) {

            jQuery(".content_main_index").css("padding-top", "9px");
        }

    }

    var isIe6 = false;
    if (jQuery.browser.msie) {
        /**
         * IE general
         */

        var footerPartnerBox = jQuery(".faceliftStandardFooter .footer .advanced_footer_content .partner_box");

        var logoWidthCombined = 0;
        footerPartnerBox.find("ul li").each(function () {
            logoWidthCombined += jQuery(this).innerWidth();
        });

        if (parseInt(jQuery.browser.version, 10) === 6) {
            logoWidthCombined += 40;
        }

        if (logoWidthCombined < parseInt(footerPartnerBox.css('min-width'), 10)) {
            footerPartnerBox.width(parseInt(footerPartnerBox.css('min-width'), 10));
        }
        else {
            footerPartnerBox.width(logoWidthCombined);
        }


        /**
         * IE6
         */
        if (parseInt(jQuery.browser.version, 10) === 6) {

            isIe6 = true;

            //Old flyout nav
            jQuery(".faceliftNavigationMain #nav:not(.flyout-js) li a").hover(
                function () {
                    jQuery(this).next("ul").css("left", "0");
                },
                function () {
                    jQuery(this).next("ul").css("left", "-999px");
                }
            );

            if (parseInt(footerPartnerBox.width(), 10) > 304) {
                footerPartnerBox.width(304);
            }

            if (jQuery(".marketingStage").length > 0) {
                jQuery(".marketingStage span.textBox").each(function () {

                    if (jQuery(this).height() > 130) {
                        jQuery(this).height(130);
                    }

                    jQuery(this).wrapInner('<span class="textBoxInner"></span>')
                });
            }

            if (jQuery(".redButton, .greyButton").length > 0) {
                jQuery(".redButton, .greyButton").each(function () {

                    var button = jQuery(this);

                    if (button.hasClass("redButton") && button.hasClass("onYellow")) {
                        button.addClass("redButton-onYellow");
                    }
                    else if (button.hasClass("greyButton") && button.hasClass("onYellow")) {
                        button.addClass("greyButton-onYellow");
                    }

                });

                jQuery(".redButton, .greyButton").hover(function () {
                    var button = jQuery(this);

                    if (button.hasClass("redButton")) {
                        button.toggleClass("redButton-hover");
                    }
                    else if (button.hasClass("greyButton")) {
                        button.toggleClass("greyButton-hover");
                    }
                });
            }

            //fix header service link positioning for landingpages/campaingtemplate pages
            if (jQuery(".lp_container").length > 0) {
                jQuery(".servicelinks").css("padding-right", 0);
            }
        }
    }


    /**
     * Rearranging of the partnerbox in the footer depending on the number of link lists
     */
    var partnerBox = jQuery(".faceliftStandardFooter .footer .advanced_footer_content .partner_box");
    if (partnerBox.length > 0) {

        var linkBoxes = jQuery(".faceliftStandardFooter .footer .advanced_footer_content .link_box");

        var numOfLinkLists = linkBoxes.length;
        var linkListSpace = linkBoxes.innerWidth();


        switch (numOfLinkLists) {
            /*
             case 0:
             partnerBox.css("max-width", "99%");
             break;
             */

            case 0:
                var maxWidth = "622px";

                partnerBox.css("max-width", maxWidth);
                if (isIe6) {

                    partnerBox.css("width", getPartnerBoxWidthOldIE(partnerBox, 217, maxWidth));
                }
                break;

            /*
             case 1:
             partnerBox.css("max-width", (parseInt(partnerBox.css("max-width"), 10) +  3 * linkListSpace));
             break;
             */

            case 1:
            case 2:


                if (isIe6) {

                    partnerBox.css("width", getPartnerBoxWidthOldIE(partnerBox, 217, (parseInt(partnerBox.css("width"), 10) + 2 * linkListSpace)));
                }
                else {

                    partnerBox.css("max-width", (parseInt(partnerBox.css("max-width"), 10) + 2 * linkListSpace));
                }
                break;

            case 3:

                if (isIe6) {

                    partnerBox.css("width", getPartnerBoxWidthOldIE(partnerBox, 217, (parseInt(partnerBox.css("width"), 10) + linkListSpace)));
                }
                else {

                    partnerBox.css("max-width", (parseInt(partnerBox.css("max-width"), 10) + linkListSpace));
                }
                break;

            default:
                break;
        }
    }

    /**
     *
     * @param partnerBox
     * @param minWidth
     * @param maxWidth
     * @returns {*}
     */
    function getPartnerBoxWidthOldIE(partnerBox, minWidth, maxWidth) {
        var partnerBoxWidth = partnerBox.innerWidth();

        if (partnerBox < minWidth) {
            return minWidth;
        }
        else if (partnerBoxWidth < maxWidth) {
            return partnerBoxWidth;
        }
        else {
            return maxWidth;
        }
    }

});