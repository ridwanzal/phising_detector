(function ($) {


    var config = {

        //member to hold the pointer to the dropdown container
        dropdownContainer: null,

        //member to hold the pointer to the dropdown scroller
        dropdownScroller: null,

        //member to hold the pointer to the dropdown button element (clickable area of the closed dropdown)
        dropdownButtonElement: null,

        //member to hold the pointer to the dropdown selected element text holder
        dropdownSelectedElementTextHolder: null,

        //member to hold a pointer to the dropdown element placed for touch devices
        touchDropdownElement: null,

        //member to hold the pointer to the "go" button
        goButtonElement: null,

        //member to save the indexes of the charselected by keydown
        charIndexes: {},

        //member to remember what the last pressed key's char wars
        lastChar: null,

        //member to remember the last scroll top position of the countrylist
        lastScrollTop: null,

        //member to remember the char sequence entered
        charSequence: [],

        //member to hold the timeout for entering the char sequence
        charSequenceTimeout: null,

        //member to remember whether the dropdown is scrolling or not
        dropdownIsScrolling: false
    };


    var methods = {

        /**
         *
         * @param styledDropdown
         */
        initialiseStyledDropdown: function (styledDropdown, dropdownContents, settings, state) {

            //Check if the styled dropdown is a select and build a list from it if so
            if (styledDropdown.is("select")) {

                //Build List from select before real initialisation
            }

            //build the styledDropdownScroller styles
            var styledDropdownScrollerStyles = "max-height:" + settings.maxHeight + "px;";
            if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) == 6) {

                styledDropdownScrollerStyles = "height:" + settings.maxHeight + "px;";
            }

            //add the class styled dropdown to the list of elements and wrap it in a containter div
            styledDropdown.addClass("styledDropdown").wrap('<div class="styledDropdownContainer"><div class="styledDropdownWrapper"><div class="styledDropdownScroller" style="' + styledDropdownScrollerStyles + '"></div></div></div>');

            //save the container div into the config
            config.dropdownContainer = styledDropdown.parents(".styledDropdownContainer");

            //save the sroller div into the config
            config.dropdownScroller = styledDropdown.parents(".styledDropdownScroller");

            //add the selected element text holder
            config.dropdownSelectedElementTextHolder = $('<span class="selectedElementTextHolder"></span>').appendTo(config.dropdownContainer);

            //add and save the dropdown button
            config.dropdownButtonElement = $('<input class="dropdownButton" type="text" readonly="readonly" />').appendTo(config.dropdownContainer);

            //add and save the go button
            config.goButtonElement = $('<a class="goButton" href="javascript:;">Go</a>').insertAfter(config.dropdownContainer);

            //insert a clearer to assure correct floating
            $('<div class="clearAll"></div>').insertAfter(config.goButtonElement);


            //build a real dropdown when the page is opened on a touch device when it's not already a select
            if (methods.isTouchDevice() && !styledDropdown.is("select")) {
                methods.buildDropdownForTouchDevices(dropdownContents);

            }
            else if (methods.isTouchDevice() && styledDropdown.is("select")) {
                styledDropdown.addClass("touchDropdown");

                config.touchDropdownElement = styledDropdown;
            }

        },

        /**
         *
         * @param styledDropdown
         * @param state
         */
        initialiseDropdownContent: function (styledDropdown, state) {

            /*if(styledDropdown.is("select")){

             return methods.handleSelectContents(styledDropdown, state);
             }
             else{
             */
            return methods.handleListContents(styledDropdown, state);
//			}
        },

        /**
         *
         * @param styledDropdown
         * @param state
         */
        handleSelectContents: function (styledDropdown, state) {

            //Get contents from the select strucure
        },

        /**
         *
         * @param styledDropdown
         * @param state
         */
        handleListContents: function (styledDropdown, state) {
            var dropdownContents = new Array();

            styledDropdown.find("li").each(function () {

                var element = $(this);
                var elementLink = element.find("a");

                var displayText = methods.getDisplayTextFromLink(element);

                var elementHref = elementLink.attr("href");
                if (typeof elementHref === "undefined" || elementHref === null || elementHref === "" || elementHref === " " || elementHref === "undefined") {

                    elementHref = "javascript:;";
                }

                dropdownContents.push({
                    href: elementHref,
                    target: elementLink.attr("target"),
                    title: elementLink.attr("title"),
                    text: elementLink.text(),
                    displayText: displayText
                });

                element.attr("title", displayText).empty().text(displayText);
                if (element.is(":first-child")) {
                    element.attr("title", "-");
                }
            });

            return dropdownContents;
        },

        /**
         *
         * @param dropdownElement
         */
        getDisplayTextFromLink: function (dropdownElement) {
            var displayText = "";

            if (dropdownElement.find("a").length > 0) {

                dropdownElement.find("a span").remove();
            }

            displayText = $.trim(dropdownElement.text());

            return displayText;
        },

        /**
         *
         * @param styledDropdown
         * @param dropdownContents
         * @param settings
         * @param state
         */
        registerDropdownEvents: function (styledDropdown, dropdownContents, settings, state) {

            //click event of the dropdown button
            config.dropdownButtonElement.on('click', function () {

                if (!state.isOpen) {

                    methods.openDropdown(state);

                    //if the last scroll top was not null
                    if (state.changedByScroll && config.lastScrollTop !== null) {

                        //scroll the dropdown sroller to the last scroll top
                        styledDropdown.parent(".styledDropdownScroller").scrollTop(parseInt(config.lastScrollTop * -1), 50);
                    }
                    else if (state.changedByJump) {
                        methods.jumpToElement(styledDropdown, settings, state);
                    }

                }
                else {

                    //set the dropdown scrolling flag to false;
                    config.dropdownIsScrolling = false;

                    //close the dropdown
                    methods.closeDropdown(state);
                }
            });


            //blur event of the dropdown button
            config.dropdownButtonElement.on('blur', function () {

                //check if the browser is msie
                if (jQuery.browser.msie) {

                    //introduce a short delay for...
                    setTimeout(function () {

                        //...when not currently scrolling...
                        if (!config.dropdownIsScrolling) {

                            //...closing the dropdown
                            methods.closeDropdown(state);
                        }

                    }, 1);
                }
                else {//when not msie

                    //close the dropdown rightaway
                    methods.closeDropdown(state);
                }
            });


            //set the dropdown scrolling flag to true on focus of the scroller
            config.dropdownScroller.on("focus", function () {

                config.dropdownIsScrolling = true;
            });

            //set the dropdown scrolling flag to false on blur of the scroller
            config.dropdownScroller.on("blur", function () {

                config.dropdownIsScrolling = false;

                //if msie, also call the blur of the dropdown
                if (jQuery.browser.msie) {

                    config.dropdownButtonElement.trigger('blur');
                }
            });


            //dropdown element key events
            config.dropdownButtonElement.on('keydown', function (e) {

                var keyCode = e.keyCode;

                switch (keyCode) {

                    //ESC
                    case 27:

                        //set the dropdown scrolling flag to false;
                        config.dropdownIsScrolling = false;

                        //trigger the blur event of the dropdown
                        config.dropdownButtonElement.trigger('blur');
                        break;

                    //Spacebar
                    case 32:
                        //prevent default action
                        e.preventDefault();
                        e.stopPropagation();

                        config.dropdownButtonElement.trigger('click');
                        break;


                    //Return
                    case 13:
                        //prevent default action
                        e.preventDefault();
                        e.stopPropagation();

                        config.dropdownButtonElement.trigger('click');

                        state.changedByScroll = false;
                        state.changedByJump = true;
                        break;

                    //Up/Left/Down/Right
                    case 38:
                    case 37:
                    case 40:
                    case 39:
                        //prevent default action
                        e.preventDefault();
                        e.stopPropagation();

                        if (keyCode === 38 || keyCode === 37) {
                            //select previous when up or left
                            methods.selectPreviousElement(styledDropdown, dropdownContents, state);
                        }
                        else {
                            //select next when down or right
                            methods.selectNextElement(styledDropdown, dropdownContents, state);
                        }


                        //update the go button with the url from the dropdown
                        methods.updateGoButton(dropdownContents, state);


                        if (styledDropdown.is(":visible")) {
                            //scroll to the respective element when the dropdown is opened
                            methods.scrollToElement(styledDropdown, settings, state);
                        }
                        else {
                            //jump to the respectiuve element when the dropdown is closed
                            methods.jumpToElement(styledDropdown, settings, state);
                        }

                        break;

                    //Letters
                    case 65: //a
                    case 66: //b
                    case 67: //c
                    case 68: //d
                    case 69: //e
                    case 70: //f
                    case 71: //g
                    case 72: //h
                    case 73: //i
                    case 74: //j
                    case 75: //k
                    case 76: //l
                    case 77: //m
                    case 78: //n
                    case 79: //o
                    case 80: //p
                    case 81: //q
                    case 82: //r
                    case 83: //s
                    case 84: //t
                    case 85: //u
                    case 86: //v
                    case 87: //w
                    case 88: //x
                    case 89: //y
                    case 90: //z

                        //Clear the char sequence timeout
                        clearTimeout(config.charSequenceTimeout);

                        //Add the currently entered key code to the char sequence
                        config.charSequence.push(keyCode);


                        //Set a timeout on the function actually selecting an element inside and updating the dropdown itself for being able to enter multiple characters
                        config.charSequenceTimeout = setTimeout(function () {


                            //Select the elementy by the char sequence, update the button and the highlighting
                            methods.selectElementByCharSequence(config.charSequence, styledDropdown, state);
                            methods.updateGoButton(dropdownContents, state);
                            methods.updateSelectedElementHighlight(styledDropdown, dropdownContents, state);
                            methods.jumpToElement(styledDropdown, settings, state);

                            //reset the Char sequence
                            config.charSequence = [];

                        }, 200);

                        break;

                    //default
                    default:
                        break;
                }
            });


            //click of the go button
            config.goButtonElement.on('click', function (e) {
                methods.updateUSCookie($(this).attr("href"));
            });


            //hover of the dropdown elements
            styledDropdown.find('li').hover(
                function () {
                    styledDropdown.find('li.selectedElement').removeClass('selectedElement');

                    $(this).addClass('selectedElement');
                },
                function () {

                    $(this).removeClass('selectedElement');

                    styledDropdown.find('li:eq(' + state.selectedElementIndex + ')').addClass('selectedElement');
                }
            );


            //click event of the dropdown elements
            styledDropdown.find('li').on('mousedown', function () {

                //set the selected element index to the index of the clicked element
                state.selectedElementIndex = $(this).index();

                //save the scroll position of the dropdown to the config
                config.lastScrollTop = styledDropdown.position().top;

                //set the dropdown scrolling flag to false;
                config.dropdownIsScrolling = false;

                //close the dropdown
                methods.closeDropdown(state);

                //update the go button/link
                methods.updateGoButton(dropdownContents, state);

                //update the dropdown content to reflect the clicked element
                methods.updateSelectedElementHighlight(styledDropdown, dropdownContents, state);

                state.changedByScroll = true;
                state.changedByJump = false;
            });


            //change event of the dropdown placed for touch devices
            if (typeof config.touchDropdownElement !== "undefined" && config.touchDropdownElement !== null) {

                config.touchDropdownElement.on('change', function () {

                    //set the selected element index to the index of the selected option
                    state.selectedElementIndex = config.touchDropdownElement.find('option:selected').index();

                    //update the go button/link
                    methods.updateGoButton(dropdownContents, state);

                    //update the dropdown content to reflect the clicked element
                    methods.updateSelectedElementHighlight(styledDropdown, dropdownContents, state);
                });
            }
        },

        /**
         *
         * @param dropdownButtonElement
         * @param dropdownContents
         * @param state
         */
        openDropdown: function (state) {

            config.dropdownContainer.addClass("styledDropdown-open");

            state.isOpen = true;
        },

        /**
         *
         * @param dropdownButtonElement
         * @param state
         */
        closeDropdown: function (state) {

            config.dropdownContainer.removeClass("styledDropdown-open");

            state.isOpen = false;
        },

        /**
         *
         * @param styledDropdown
         * @param dropdownContents
         * @param state
         */
        updateSelectedElementHighlight: function (styledDropdown, dropdownContents, state) {

            config.dropdownSelectedElementTextHolder.text(dropdownContents[state.selectedElementIndex].displayText);

            styledDropdown.find('li.selectedElement').removeClass('selectedElement');

            styledDropdown.find('li:eq(' + state.selectedElementIndex + ')').addClass('selectedElement');
        },

        /**
         *
         * @param styledDropdown
         * @param dropdownContents
         * @param state
         */
        selectNextElement: function (styledDropdown, dropdownContents, state) {
            var newIndex = state.selectedElementIndex + 1;

            if (newIndex < state.numberOfElements) {

                state.selectedElementIndex = newIndex;

                methods.updateSelectedElementHighlight(styledDropdown, dropdownContents, state);
            }
        },

        /**
         *
         * @param styledDropdown
         * @param dropdownContents
         * @param state
         */
        selectPreviousElement: function (styledDropdown, dropdownContents, state) {
            var newIndex = state.selectedElementIndex - 1;

            if (newIndex >= 0) {

                state.selectedElementIndex = newIndex;

                methods.updateSelectedElementHighlight(styledDropdown, dropdownContents, state);
            }
        },

        /**
         *
         * @param charSequence
         * @param styledDropdown
         * @param state
         */
        selectElementByCharSequence: function (charSequence, styledDropdown, state) {

            //get the uppercase queryString from the queryString code
            var queryString = "";
            for (var i = 0; i < charSequence.length; i++) {

                queryString += String.fromCharCode(charSequence[i]);
            }

            //to be sure, convert the querystring to lowercase
            queryString = queryString.toLowerCase();

            //convert the first char in the query string to uppercase
            if (queryString.length > 1) {

                queryString = queryString.charAt(0).toUpperCase() + queryString.slice(1);
            }
            else {

                queryString = queryString.toUpperCase();
            }


            //determine the index of ther first occurance of the queryString
            var firstOccuranceIndex = styledDropdown.find('li[title^="' + queryString + '"]:eq(0)').index();

            //if there are elements for the queryString
            if (firstOccuranceIndex > -1) {

                //delete the remembered value of the last queryString if it differs from the current onw
                if (queryString !== config.lastChar) {
                    delete config.charIndexes[config.lastChar];
                }

                //set last queryString to the current queryString
                config.lastChar = queryString;


                //initialise the queryString index for the current queryString if not yet there
                if (typeof config.charIndexes[queryString] === "undefined") {

                    config.charIndexes[queryString] = firstOccuranceIndex;
                }


                //calculate the next desired index
                var desiredIndex = config.charIndexes[queryString]++;
                if (desiredIndex >= styledDropdown.find('li[title^="' + queryString + '"]').index()) {

                    delete config.charIndexes[queryString];
                }

                //set the selected element index to the selected queryString index
                state.selectedElementIndex = styledDropdown.find('li:eq(' + (desiredIndex) + ')').index();
            }
        },

        /**
         *
         * @param dropdownContents
         * @param state
         */
        updateGoButton: function (dropdownContents, state) {

            var selectedElementContent = dropdownContents[state.selectedElementIndex];

            config.goButtonElement.attr({
                href: selectedElementContent.href,
                target: selectedElementContent.target/*,
                 title: selectedElementContent.title*/
            });
        },

        /**
         *
         * @param styledDropdown
         * @param settings
         * @param state
         */
        scrollToElement: function (styledDropdown, settings, state) {

            var element = styledDropdown.find('li:eq(' + state.selectedElementIndex + ')');

            var elementPosTop = element.position().top;

            if (elementPosTop >= settings.maxHeight && state.selectedElementIndex < state.numberOfElements) {

                if (config.lastScrollTop != null) {

                    config.lastScrollTop += element.innerHeight();
                }
                else {

                    config.lastScrollTop = element.innerHeight();
                }
            }
            else if (elementPosTop < 0 && state.selectedElementIndex >= 0) {

                config.lastScrollTop -= element.innerHeight();
            }

            //scroll the dropdown sroller to the last scroll top
            styledDropdown.parent(".styledDropdownScroller").scrollTop(config.lastScrollTop);

            state.changedByScroll = true;
            state.changedByJump = false;
        },


        /**
         *
         * @param styledDropdown
         * @param settings
         * @param state
         */
        jumpToElement: function (styledDropdown, settings, state) {

            var element = styledDropdown.find('li:eq(' + state.selectedElementIndex + ')');

            var elementOffsetTop = element.offset().top;

            var offsetTopBase = styledDropdown.find('li:eq(0)').offset().top;

            var elementPosTop = elementOffsetTop - offsetTopBase;

            var newScrollTop = elementPosTop - (settings.maxHeight - parseInt(element.innerHeight()));

            config.lastScrollTop = newScrollTop;

            //scroll the dropdown sroller to the last scroll top
            styledDropdown.parent(".styledDropdownScroller").scrollTop(config.lastScrollTop);

            state.changedByScroll = false;
            state.changedByJump = true;

        },


        /**
         * Checks if the device showing the page is a touch device
         * Original: http://stackoverflow.com/a/17326876
         */
        isTouchDevice: function () {
            var deviceAgent = navigator.userAgent.toLowerCase();

            return (deviceAgent.match(/(iphone|ipod|ipad)/) ||
                deviceAgent.match(/(android)/) ||
                deviceAgent.match(/(iemobile)/) ||
                deviceAgent.match(/iphone/i) ||
                deviceAgent.match(/ipad/i) ||
                deviceAgent.match(/ipod/i) ||
                deviceAgent.match(/blackberry/i) ||
                deviceAgent.match(/bada/i));
        },


        buildDropdownForTouchDevices: function (dropdownContents) {
            var dropdown = '<select class="touchDropdown">\n';

            for (var i = 0; i < dropdownContents.length; i++) {
                dropdown += '<option value="' + dropdownContents[i].href + '">' + dropdownContents[i].displayText + '</option>\n'
            }

            dropdown += '</select>\n';

            config.touchDropdownElement = $(dropdown).insertAfter(config.dropdownButtonElement);
        },

        /**
         * creates a new cookie US-Redirect with 365 days expiration time. Comes with a confirm dialog
         */
        setUSCookie: function () {
            if (!methods.getCookie('US-Redirect')) {
                if (confirm("Remember this location?")) {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 365);
                    SetCookie("US-Redirect", "true", expireDate, '/');
                }
            }
        },

        /**
         * handles set or deletion of US-Redirect cookie to delete or set this depending on the target chosen.
         */
        updateUSCookie: function (href) {
            if (href.indexOf("www.dhl-usa.com") >= 0) {
                methods.setUSCookie();
            } else if(methods.getCookie('US-Redirect')) {
                DeleteCookie("US-Redirect", '/');
            }
        },

        getCookie: function (name) {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          return parts.length == 2 ?
              parts.pop().split(";").shift() :
              false;
        }

    };


    $.fn.StyledDropdown = function (options) {

        var settings = $.extend({
            maxHeight: 'auto',
            preselectedElementIndex: 0,
            goButtonText: 'Go'
        }, options);


        return this.each(function () {

            var state = {

                selectedElementIndex: settings.preselectedElementIndex,

                numberOfElements: 0,

                isOpen: false,

                changedByScroll: false,

                changedByJump: false
            }

            var styledDropdown = $(this);

            //initialise the dropdown contents
            var dropdownContents = methods.initialiseDropdownContent(styledDropdown, state);

            //save the number of contents in the status variable
            state.numberOfElements = dropdownContents.length;

            //initialise the styled dropdown
            methods.initialiseStyledDropdown(styledDropdown, dropdownContents, settings, state);

            //fill the dropdown button with the text of the selected element
            methods.updateSelectedElementHighlight(styledDropdown, dropdownContents, state);

            //register the styled dropdown events
            methods.registerDropdownEvents(styledDropdown, dropdownContents, settings, state);

        });

    };

})(jQuery);