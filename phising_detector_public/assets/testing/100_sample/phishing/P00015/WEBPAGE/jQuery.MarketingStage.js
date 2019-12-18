(function ($) {

    var M = $.MarketingStage = function () {
    };

    $.extend(M, {

        /**
         * Method for the purpose of being called by flash when it's played to the end
         */
        onFlashFinished: function (flashIndex) {

            //show next element
            config.marketingStageArrows.find(".next").trigger("click");
        },


        /**
         * Method for the purpose of being called by flash when it's ready for playback
         */
        onFlashReady: function (flashIndex) {

            //flag the flash as ready
            config.readyFlashContentList[flashIndex] = true;

            //trigger the flash play event on the flash toggler
            config.marketingStageFlashToggler.trigger("playFlash", flashIndex);
        }

    });

    /**
     * The global configuration for all marketing stage elements on the page
     */
    var config = {

        marketingStageConfigSelector: ".marketingStageConfig",

        marketingStagePagination: null,
        marketingStageImagePopupText: null,
        marketingStageArrows: null,
        marketingStageFlashToggler: null,

        animationTimeout: null,
        paginationTimeout: null,

        readyFlashContentList: {},
        insertedFlashContentList: {},
        playingFlashContentId: null
    };


    var methods = {

        /**
         * Gets a value with it's type if possible
         * @param {*} originalValue
         * @returns {*} The value with type if possible else the original value
         */
        getValueWithType: function (originalValue) {
            originalValue = $.trim(originalValue);

            var valueWithType = null;

            if ((/^true$/i).test(originalValue)) {

                valueWithType = true;
            }
            else if ((/^false$/i).test(originalValue)) {

                valueWithType = false;
            }
            else if (!isNaN(parseFloat(originalValue)) && isFinite(originalValue)) {

                valueWithType = parseFloat(originalValue);
            }
            else {

                valueWithType = originalValue;
            }

            return valueWithType;
        },


        /**
         * Method for loading the general configuration options of the marketing stage from the HTML
         * @param {Object} marketingStage The marketing stage to load the config for
         * @returns {Object} The marketing stage configuration from the HTML
         */
        getMarketingStageConfigurationFromHTML: function (marketingStage, config) {
            var marketingStageConfigurationFromHTML = {};

            var marketingStageConfig = marketingStage.find(config.marketingStageConfigSelector);

            marketingStageConfig.children().each(function () {

                marketingStageConfigurationFromHTML[$(this).attr("class")] = methods.getValueWithType($(this).text());

            });

            return marketingStageConfigurationFromHTML;
        },


        /**
         * Method for loading the data of a specific marketing stage element from the HTML
         * @param {Object} marketingStageElement The marketing stge element to load the config for
         * @returns {Object} The marketing stage elements configuration from the HTML
         */
        getMarketingStageElementDataFromHTML: function (marketingStageElement, settings) {
            var marketingStageElementConfigurationFromHTML = {};

            var marketingStageElementConfiguration = marketingStageElement.find(settings.elementConfigSelector);

            marketingStageElementConfiguration.children().each(function () {

                marketingStageElementConfigurationFromHTML[$(this).attr("class")] = methods.getValueWithType($(this).text());

            });

            return marketingStageElementConfigurationFromHTML;
        },


        /**
         *
         * @param marketingStage
         * @param marketingStageElements
         * @param marketingStageElementData
         * @param settings
         * @param state
         */
        initMarketingStage: function (marketingStage, marketingStageElements, marketingStageElementData, settings, state) {

            //wrap the marketing stage elements into a container
            marketingStageElements.wrapAll('<div class="marketingStageElementContainer"></div>');


            //in case there is more than one content element, add the marketing stage navigation elements
            if (state.numberOfElements > 1) {

                //create the "pagination"
                var marketingStagePagination = '<ul class="marketingStagePagination">';

                for (var i = 1; i <= state.numberOfElements; i++) {
                    var activeClass = ' class="active"';
                    if (i > 1) {
                        activeClass = "";
                    }

                    marketingStagePagination += '<li' + activeClass + '><a href="javascript:;">' + i + '</a></li>'
                }

                marketingStagePagination += '</ul>';

                //add the pagination to the marketing stage
                config.marketingStagePagination = $(marketingStagePagination).appendTo(marketingStage.find(settings.elementContainerSelector));

                //add the image popup text to the marketing stage if it should be used
                if (settings.useImagePopupText) {
                    var marketingStageImagePopupText = '<span class="marketingStageImagePopupText"></span>';

                    config.marketingStageImagePopupText = $(marketingStageImagePopupText).appendTo(marketingStage.find(settings.elementContainerSelector));
                }


                //create the navigation arrows
                var marketingStageArrows = '<div class="marketingStageArrows">' +
                    '<a href="javascript:;" class="previous"></a>' +
                    '<a href="javascript:;" class="next"></a>' +
                    '</div>';

                config.marketingStageArrows = $(marketingStageArrows).appendTo(marketingStage.find(settings.elementContainerSelector));
            }


            //hide all marketing stage elements
            marketingStageElements.css({opacity: 0, zIndex: 1});//hide();

            //show the element configured to be the first
            marketingStageElementData[0].element.css({opacity: 1, zIndex: 2});//show();


            var marketingStageFlashToggler = '<a href="javascript:;" class="flashToggler"></a>';
            config.marketingStageFlashToggler = $(marketingStageFlashToggler).appendTo(marketingStage.find(settings.elementContainerSelector));


            //flag the main_area with "hasMarketingStage"
            marketingStage.parents(".main_area").addClass("hasMarketingStage");
        },


        /**
         *
         * @param marketingStage
         * @param marketingStageElementData
         * @param settings
         * @param state
         */
        startMarketingStageAutorun: function (marketingStage, marketingStageElementData, settings, state) {

            //get the index of the active element
            var activeElementIndex = state.activeElementIndex;

            //load the media content of the active element
            methods.loadMediaContent(marketingStageElementData, activeElementIndex);


            //in case there is more than one content element, load the contents of further elements and autoplay
            if (state.numberOfElements > 1) {

                //get the next element index
                var nextElementIndex = state.activeElementIndex + 1;

                //load the media content of the next element
                methods.loadMediaContent(marketingStageElementData, nextElementIndex);


                //get the last element index
                var lastElementIndex = state.numberOfElements - 1;

                //load the media content of the last element
                methods.loadMediaContent(marketingStageElementData, lastElementIndex);


                //determine the correct duration for the active element
                var activeElementDuration = marketingStageElementData[activeElementIndex].getDuration(settings);

                //call for the next element and store the animation timeout pointer into the config
                config.animationTimeout = setTimeout(function () {

                    methods.showNextElement(marketingStage, marketingStageElementData, settings, state, true);

                }, activeElementDuration);
            }

        },


        /**
         *
         * @param {Object] marketingStageElementData
		 * @param {number} desiredElementIndex
         * @param {Object} settings
         * @param {Object} state
         * @param {boolean} doAutoPlay
         */
        showElement: function (marketingStage, marketingStageElementData, desiredElementIndex, settings, state, doAutoPlay) {

            //get the config of the active element
            var activeElementData = marketingStageElementData[state.activeElementIndex];


            //Determine the animation out speed
            var animationOutSpeed = activeElementData.getAnimationOutSpeed(settings);


            //get the  element config
            var desiredElementData = marketingStageElementData[desiredElementIndex];


            //Determine the animation in speed
            var animationInSpeed = desiredElementData.getAnimationInSpeed(settings);


            //Determine the duration of the next element
            var desiredElementDuration = desiredElementData.getDuration(settings);


            //remove the loading icon
            marketingStage.css("background", "none");


            //remember the original element index
            var originalElementIndex = state.activeElementIndex;

            //fade out the active element
            marketingStageElementData[originalElementIndex].element.stop().animate({opacity: 0, zIndex: 1}, animationOutSpeed, function () {

                //rewind the flash if the original element contains one.
                if (marketingStageElementData[originalElementIndex].hasFlash && config.readyFlashContentList[marketingStageElementData[originalElementIndex].order]) {

                    config.playingFlashContentId = null;

                    var originalFlashID = marketingStageElementData[originalElementIndex].flashID;

                    //if there is a valid flashid
                    if (typeof originalFlashID !== "undefined") {

                        //rewind flash
                        $('#' + originalFlashID).get(0).dhl_rewind();

                        try {
                            //stop flash
                            $('#' + originalFlashID).get(0).dhl_stop_playback();
                        }
                        catch (err) {
                            //Possibly Error calling method on NPObject.
                        }
                    }
                }

            });//hide();


            //switch the active element index to the desired index
            state.activeElementIndex = desiredElementIndex;

            //load the media content of the desired element
            methods.loadMediaContent(marketingStageElementData, desiredElementIndex);

            //load the image of the second next element
            var secondNextElementIndex = state.activeElementIndex + 1;
            if (secondNextElementIndex >= state.numberOfElements) {
                secondNextElementIndex = 0;
            }

            //load the media content of the secont next element
            methods.loadMediaContent(marketingStageElementData, secondNextElementIndex);


            //fade in the desired element
            marketingStageElementData[desiredElementIndex].element.stop().animate({opacity: 1, zIndex: 5}, animationInSpeed, function () { //show();


                //break loop if the desired element has flash content
                if (marketingStageElementData[desiredElementIndex].hasFlash) {

                    //save the original value of doAutoPlay for the case that the flash will not be loaded
                    var originalDoAutoPlay = doAutoPlay;

                    //break the auto play by setting doAutoPLay to false;
                    doAutoPlay = false;

                    var desiredFlashID = marketingStageElementData[desiredElementIndex].flashID;


                    //play flash if already fully loaded
                    if (config.readyFlashContentList[marketingStageElementData[desiredElementIndex].order] && config.playingFlashContentId != desiredFlashID) {

                        //if the flashId is valid
                        if (typeof desiredFlashID !== "undefined") {

                            //play flash
                            $('#' + desiredFlashID).get(0).dhl_start_playback();

                            config.playingFlashContentId = desiredFlashID;
                        }
                    }
                    else { //if flash is not fully loaded

                        //nevertheless register the autoplay of the next element
                        methods.registerNextElementAutoPlay(marketingStage, marketingStageElementData, settings, state, originalDoAutoPlay, desiredElementDuration);
                    }
                }


                //call next element after duration if doAutoPlay is true
                if (doAutoPlay && !state.isMarketingStageHovered) {

                    //register the autoplay of the next element
                    methods.registerNextElementAutoPlay(marketingStage, marketingStageElementData, settings, state, doAutoPlay, desiredElementDuration);
                }

            });

            //clear the pagination timeout
            clearTimeout(config.paginationTimeout);

            //update the pagination highlight and store the pagination timeout into the config
            config.paginationTimeout = setTimeout(function () {

                methods.updatePaginationHighlight(marketingStage, desiredElementIndex, true);

            }, (animationInSpeed / 4));
        },


        /**
         *
         * @param marketingStage
         * @param marketingStage
         * @param marketingStageElementData
         * @param settings
         * @param state
         * @param doAutoPlay
         * @param desiredElementDuration
         */
        registerNextElementAutoPlay: function (marketingStage, marketingStageElementData, settings, state, doAutoPlay, desiredElementDuration) {

            //clear the animation timeout before starting it again
            clearTimeout(config.animationTimeout);

            //call for the next element and store the animation timeout pointer into the config
            config.animationTimeout = setTimeout(function () {

                methods.showNextElement(marketingStage, marketingStageElementData, settings, state, doAutoPlay);

            }, desiredElementDuration);

        },


        /**
         *
         * @param {Object] marketingStageElementData
		 * @param {Object} settings
         * @param {Object} state
         * @param {boolean} doAutoPlay
         */
        showNextElement: function (marketingStage, marketingStageElementData, settings, state, doAutoPlay) {

            //Determine the index of the next element
            var nextElementIndex = state.activeElementIndex + 1;
            if (nextElementIndex >= state.numberOfElements) {
                nextElementIndex = 0;
            }

            methods.showElement(marketingStage, marketingStageElementData, nextElementIndex, settings, state, doAutoPlay);

        },


        /**
         *
         * @param {Object] marketingStageElementData
		 * @param {Object} settings
         * @param {Object} state
         * @param {boolean} doAutoPlay
         */
        showPreviousElement: function (marketingStage, marketingStageElementData, settings, state, doAutoPlay) {

            //Determine the index of the next element
            var previousElementIndex = state.activeElementIndex - 1;
            if (previousElementIndex < 0) {
                previousElementIndex = state.numberOfElements - 1;
            }

            methods.showElement(marketingStage, marketingStageElementData, previousElementIndex, settings, state, doAutoPlay);

        }, //END showPreviousElement


        /**
         *
         * @param a
         * @param b
         * @returns {number}
         */
        sortByOrderAttr: function (a, b) {
            if (a['order'] && b['order']) {
                return parseInt(a['order'], 10) - parseInt(b['order'], 10);
            } else {
                return 0;
            }
        },


        /**
         *
         * @param marketingStage
         * @param marketingStageElementData
         * @param settings
         * @param state
         */
        registerMarketingStageEvents: function (marketingStage, marketingStageElementData, settings, state) {

            //in case there is more than one content element, register the events for the marketingstage navigation elements
            if (state.numberOfElements > 1) {

                //register click event for pagination
                config.marketingStagePagination.find(settings.paginationElementSelector).click(function () {

                    var clickedElementIndex = $(this).index();

                    if (clickedElementIndex !== state.activeElementIndex) {
                        methods.showElement(marketingStage, marketingStageElementData, clickedElementIndex, settings, state, true);
                    }
                });


                //register hover event for the pagination
                config.marketingStagePagination.find(settings.paginationElementSelector).hover(
                    function () {

                        //collect the hovered elements data
                        var element = $(this);
                        var elementIndex = element.index();
                        var elementData = marketingStageElementData[elementIndex];

                        //update the pagination highlight
                        methods.updatePaginationHighlight(marketingStage, elementIndex, true);

                        //show image popup text if it should be used
                        if (elementData.useImagePopupText) {

                            config.marketingStageImagePopupText.text(elementData.imagePopupText).css(methods.getImagePopupTextPosition(marketingStage, element)).show();
                        }
                    },
                    function () {
                        methods.updatePaginationHighlight(marketingStage, state.activeElementIndex, true);

                        //hide image popup text if it should be used
                        if (config.marketingStageImagePopupText != null) {

                            config.marketingStageImagePopupText.empty().removeAttr("style").hide();
                        }
                    }
                );


                //register click event for the next arrow
                config.marketingStageArrows.find(settings.nextArrowSelector).click(function (e) {

                    methods.showNextElement(marketingStage, marketingStageElementData, settings, state, true);
                });


                //register click event for the previous arrow
                config.marketingStageArrows.find(settings.previousArrowSelector).click(function (e) {

                    methods.showPreviousElement(marketingStage, marketingStageElementData, settings, state, true);
                });


                //register hover event for the marketing stage
                marketingStage.hover(
                    function () {

                        state.isMarketingStageHovered = true;

                        clearTimeout(config.animationTimeout);
                        clearTimeout(config.paginationTimeout);

                        config.marketingStageArrows.show();
                    },
                    function () {

                        state.isMarketingStageHovered = false;

                        methods.showElement(marketingStage, marketingStageElementData, state.activeElementIndex, settings, state, true);

                        config.marketingStageArrows.hide();
                    }
                );

            }


            //register playFlash event of the flash toggler
            config.marketingStageFlashToggler.on("playFlash", function (event, flashIndex) {

                //get the flash id
                var flashID = marketingStageElementData[state.activeElementIndex].flashID;

                //if the flash id is valid
                if (typeof flashID !== "undefined") {

                    //check if the flash index belongs to the active element index's order
                    if (flashIndex == marketingStageElementData[state.activeElementIndex].order && config.playingFlashContentId !== flashID) {

                        //break the auto run of the marketing stage
                        clearTimeout(config.animationTimeout);

                        //play the flash
                        $('#' + flashID).get(0).dhl_start_playback();

                        config.playingFlashContentId = flashID;
                    }
                }
            });

        },


        /**
         *
         * @param marketingStage
         * @param desiredElementIndex
         */
        updatePaginationHighlight: function (marketingStage, desiredElementIndex, preventDoubleHighlight) {
            var paginationElements = config.marketingStagePagination.find("li");

            if (preventDoubleHighlight) {
                paginationElements.removeClass("active");
            }

            paginationElements.eq(desiredElementIndex).addClass("active");
        },


        /**
         *
         * @param marketingStage
         * @param marketingStageElementsData
         */
        initMarketingStageElements: function (marketingStage, marketingStageElementsData) {

            for (var i = 0; i < marketingStageElementsData.length; i++) {

                methods.handleMarketingStageElementHyperlinks(marketingStage, marketingStageElementsData[i]);
                methods.handleMarketingStageElementContent(marketingStage, marketingStageElementsData[i]);
            }

        },


        /**
         * Removes the image link if there is another link, wraps the content in a new wrapper and adds the other link to this
         * @param marketingStage
         * @param marketingStageElementsData
         */
        handleMarketingStageElementHyperlinks: function (marketingStage, marketingStageElement) {

            var element = $(marketingStageElement);

            if (element.find(".elementContent a:not(a.imageLink)").length > 0) {

                element.find(".elementContent a.imageLink").contents().wrapAll('<span class="contentWrapper"></span>');

                var elementContent = element.find(".elementContent a.imageLink .contentWrapper");

                elementContent.unwrap();
            }
        },


        /**
         * Rearranges the elements content according to the number of links contained
         * @param marketingStage
         * @param marketingStageElement
         */
        handleMarketingStageElementContent: function (marketingStage, marketingStageElement) {
            var element = $(marketingStageElement);

            if (element.find(".elementContent a:not(a.imageLink)").length > 0) {

                element.find(".elementContent .textBox").insertAfter(element.find("a.imageLink"));

                $(element.find(".elementContent a:not(a.imageLink)")).appendTo(element.find(".elementContent .textBox"));
            }
            else {

                element.find(".elementContent .textBox").appendTo(element.find("a.imageLink"));
            }
        },


        /**
         *
         * @param marketingStage
         * @param marketingStagePaginationElement
         */
        getImagePopupTextPosition: function (marketingStage, marketingStagePaginationElement) {

            var marketingStageWidth = marketingStage.width();

            var imagePopupTextWidth = config.marketingStageImagePopupText.innerWidth();

            var paginationElementWidth = marketingStagePaginationElement.width();

            var halfPaginationElementWidth = parseInt(paginationElementWidth / 2);

            var paginationElementOffsetLeft = marketingStagePaginationElement.offset().left;

            var availableSpaceToRight = marketingStageWidth - (paginationElementOffsetLeft + halfPaginationElementWidth);


            if (availableSpaceToRight < imagePopupTextWidth) {

                return {right: availableSpaceToRight};
            }
            else {

                return {left: (paginationElementOffsetLeft + halfPaginationElementWidth)};
            }
        },


        /**
         *
         * @param marketingStageElement
         */
        loadImage: function (marketingStageElement) {
            var image = marketingStageElement.find("img.marketingStageContentImage");
            var imagePath = image.attr("data-src");

            var originalPath = image.attr("src");

            if (typeof imagePath !== "undefined" && imagePath != "" && imagePath !== originalPath) {
                image.attr("src", imagePath);
            }
        },


        /**
         *
         * @param elementData
         */
        preloadFlashContent: function (elementData) {

            //get the flash id
            var flashID = elementData.flashID;

            //if the flash with the given id has not yet been inserted
            if (typeof flashID !== "undefined" && typeof config.insertedFlashContentList[flashID] === "undefined") {

                //insert the flash into the page
                window.insert_flash(flashID);

                //add the flash to the list of inserted flashs
                config.insertedFlashContentList[flashID] = true;
            }
        },


        /**
         *
         * @param marketingStageElementConfig
         */
        loadMediaContent: function (marketingStageElementData, elementIndex) {

            //load the image
            methods.loadImage(marketingStageElementData[elementIndex].element);

            //load the flash
            if (marketingStageElementData[elementIndex].hasFlash) {

                //load the flash
                methods.preloadFlashContent(marketingStageElementData[elementIndex]);
            }
        }

    };


    $.fn.MarketingStage = function (options) {

        var settings = $.extend({
            elementDuration: 10000,
            animationInSpeed: 1000,
            animationOutSpeed: 1000,
            nextArrowSelector: ".next",
            previousArrowSelector: ".previous",
            elementSelector: ".marketingStageElement",
            elementConfigSelector: ".elementConfig",
            elementContainerSelector: ".marketingStageElementContainer",
            paginationElementSelector: "li",
            useImagePopupText: true
        }, options);


        return this.each(function () {

            /**
             * Variable containing the state of the marketing stage
             * @type {Object}
             */
            var state = {

                activeElementIndex: 0,

                numberOfElements: 0,

                isMarketingStageHovered: false
            };


            var marketingStage = $(this);

            //Load the general gallery config from the HTML
            settings = $.extend(settings, methods.getMarketingStageConfigurationFromHTML(marketingStage, config));


            //get the marketing stage elements
            var marketingStageElements = marketingStage.find(settings.elementSelector);


            //get the number of elements
            state.numberOfElements = marketingStageElements.length;

            //if there more than no element
            if (state.numberOfElements > 0) {

                //set the height of the marketing stage to it's element contents height
                marketingStage.height(marketingStage.find(".marketingStageElement .elementContent").height());


                //prepare and load the marketing stage elements config from the HTML
                var marketingStageElementData = [];

                marketingStageElements.each(function () {

                    var marketingStageElement = $(this);

                    //get the element data from the html
                    var elementData = methods.getMarketingStageElementDataFromHTML(marketingStageElement, settings);

                    //Add the pointer to the current element in the dom to the element data
                    elementData["element"] = marketingStageElement;


                    //Check if the order parameter is present
                    if (typeof elementData.order === "undefined") {

                        //try to get the order parameter based on the marketing stage elements order in the html
                        elementData["order"] = marketingStageElement.index();
                    }


                    //Check & possibly get hasFlash flag from content when not was in config
                    var flashContentAmount = marketingStageElement.find("object, embed, .flashmodule").length;
                    if (typeof elementData.hasFlash === "undefined") {	//if hasFlash flag is not yet in config

                        //set hasFlash flag to false
                        elementData["hasFlash"] = false;

                        //if there, nevertheless, is a flash content
                        if (flashContentAmount > 0 || typeof elementData["flashID"] !== "undefined") {

                            //set the flag to true
                            elementData["hasFlash"] = true;
                        }
                    }
                    else if (elementData.hasFlash && flashContentAmount <= 0) { //if flag is set but no flash is present

                        //set the hasFlash flag to false
                        elementData["hasFlash"] = false;
                    }


                    //trim the flashID if present
                    if (typeof elementData.flashID !== "undefined") {
                        elementData.flashID = jQuery.trim(elementData.flashID);
                    }


                    //Check again for the hasFlash independently as it's a precondition for checking the flash json config
                    if (elementData.hasFlash) {

                        //get the flash ID
                        var flashId = elementData.flashID;

                        //when there is a valid flash id
                        if (typeof flashId !== "undefined") {

                            //get the order parameter of the flash
                            var flashVar_itemOrderIdx = window.flashMap[flashId].flashvarsflash.itemOrderIdx;

                            //check whether the order parameter has been set for the flash
                            if (typeof flashVar_itemOrderIdx === "undefined" || flashVar_itemOrderIdx != elementData.order) {

                                //set the flash itemOrderIdx to the order form the elementData
                                window.flashMap[flashId].flashvarsflash['itemOrderIdx'] = elementData.order + "";


                                //remove the script tag for this flash so that it does not get re-processed when the dom is changed later
                                elementData.element.find("." + flashId + " script").remove();
                            }

                        }
                    }


                    //Set image popup text usage flag to false if no text has been entered for it.
                    elementData["useImagePopupText"] = settings.useImagePopupText;
                    if (settings.useImagePopupText && (typeof elementData.imagePopupText === 'undefined' || elementData.imagePopupText === "")) {
                        elementData["useImagePopupText"] = false;
                    }


                    /**
                     * Get the animation out speed of the element, otherwise use the default animation in peed
                     * @param defaults
                     * @returns {number}
                     */
                    elementData["getAnimationInSpeed"] = function (defaults) {

                        if (typeof elementData.animationInSpeed !== "undefined" && elementData.animationInSpeed > 0) {
                            return elementData.animationInSpeed;
                        }
                        else {
                            return defaults.animationInSpeed;
                        }
                    }

                    /**
                     * Get the animation out speed of the element, otherwise use the default animation out peed
                     * @param defaults
                     * @returns {number}
                     */
                    elementData["getAnimationOutSpeed"] = function (defaults) {

                        if (typeof elementData.animationOutSpeed !== "undefined" && elementData.animationOutSpeed > 0) {
                            return elementData.animationOutSpeed;
                        }
                        else {
                            return defaults.animationOutSpeed;
                        }
                    }

                    /**
                     * Get the duration of the element, otherwise use the default duration
                     * @param defaults
                     */
                    elementData["getDuration"] = function (defaults) {

                        if (typeof elementData.duration !== "undefined" && elementData.duration > 0) {
                            return elementData.duration;
                        }
                        else {
                            return defaults.elementDuration;
                        }
                    }

                    //attach the element Data to the array of marketing stage element datas
                    marketingStageElementData[marketingStageElementData.length] = elementData;
                });


                //sort marketing stage elements
                marketingStageElementData.sort(methods.sortByOrderAttr);


                //initialise the marketing stage
                methods.initMarketingStage(marketingStage, marketingStageElements, marketingStageElementData, settings, state);


                //initialise the marketing stage elements
                methods.initMarketingStageElements(marketingStage, marketingStageElements);


                //register the events for the marketingstage
                methods.registerMarketingStageEvents(marketingStage, marketingStageElementData, settings, state);

                //start the marketing stage autorun
                methods.startMarketingStageAutorun(marketingStage, marketingStageElementData, settings, state);

            } //END numberOfElements > 0

        }); //END return this.each

    }; //END $.fn.MarketingStage

})(jQuery);