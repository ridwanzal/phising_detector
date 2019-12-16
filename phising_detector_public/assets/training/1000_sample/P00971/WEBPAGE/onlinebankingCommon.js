
var	showingSelects=new Array(), disabledInputsMap = new Array();


/** ----------------------------------
 *    Util functions
 *  ---------------------------------- */
function enableAllInputs() {
	enableAllInputsSimetric();
}
function disableAllInputs() {
	disableAllInputsSimetric();
}

// -----------------------------------------------------------------------------
/**
 * Enables all elements that where previously disabled if any.
 * It considers that anchors don't really have the disabled attribute and 
 * removes it. In other words only IE6 does have disabled for anchors. Otherwise
 * sets the disabled attribute to false.
 *
 */
function enableAllInputsSymmetric() {
	jQuery.each(getDisabledElements(),
		function(index, element) {
			if(jQuery(element).is('a')) {
				jQuery(element).removeAttr('disabled');
			} else {
				jQuery(element).attr('disabled',false);
			}
		}
	);
	resetDisabledElements();
}

/*private*/function getDisabledElements() {
	if(disabledInputsMap==null) {
		disabledInputsMap= new Array();
	}
	return disabledInputsMap;
}

/*private*/function resetDisabledElements() {
	disabledInputsMap = new Array();
}

/**
 * Add the element into the list of disabled elements if the element is 
 * currently enabled. Also it disables the element
 */
/*private*/function addAndDisableIfEnabled(index, element) {
	if(jQuery(element).attr('disabled')==false || jQuery(element).attr('disabled')==null) {
		disabledInputsMap[index]=element;
		jQuery(element).attr('disabled',true);
	}
}

/**
 * Disables all elements that are currently enabled, and either
 * inputs, select, forms, anchors. Look the code for detail.
 *
 * Note: this has only one level, i.e. disabledAllINputs, called twice and 
 * enable afterwards will enable the ones disabled first time around, and so
 * forth.
 *
 */
function disableAllInputsSymmetric() {
	var index=0;
	
	jQuery('input').each(function() {
		addAndDisableIfEnabled(index, this);
		index++;
	});
	jQuery('a').each(function() {
		addAndDisableIfEnabled(index, this);
		index++;
	});
	jQuery('select').each(function() {
		addAndDisableIfEnabled(index, this);
		index++;
	});
	addAndDisableIfEnabled(index, 'form');
}

/**
 * Hides HTML selects elements only if they're visible and keeps count of which
 * ones so when they're re-displayed only the ones previously hidden are 
 * dispplayed
 */
/*public*/function hideSelectsSymetric() {
	var index=0;
	jQuery('select').each(
		function() {
			added = addSelect(this,index);
			if(added) {
				index++;
			}
		}
	);
}

/**
 * Shwos HTML selects element previously hidden by hideSelectsSymetric
 */
/*public*/function showSelectsSymetric() {
	jQuery(showingSelects).each(
		function(index, value) {
			jQuery(value).show();
		}
	);
	resetSelects();
}

/**
 * Adds a select html element into th elist of hidden selects
 */
/*private*/function addSelect(element, index) {
	if(jQuery(element).is(':visible')) {
		showingSelects[index]=element;
		jQuery(element).hide();
		return true;
	}
	return false;
}

/*private*/function resetSelects() {
	showingSelects=new Array();
}

/**
 * Sets the Jquery to work with prototype
 */
jQuery.noConflict();

/**
* fixPNG - is an extension to jQuery that fixes png files for Internet Explorer
* @author Supplied by Stefen.
*/
jQuery.fn.fixPNG = function() {
	return this.each(function () {
		var image = jQuery(this).css('backgroundImage');

		if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
			image = RegExp.$1;
			jQuery(this).css({
				'backgroundImage': 'none',
				'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + 
				(jQuery(this).css('backgroundRepeat') == 'no-repeat' ? 'crop' : 'scale') + ", src='" + image + "')"
			}).each(function () {
				var position = jQuery(this).css('position');
				if (position != 'absolute' && position != 'relative')
					jQuery(this).css('position', 'relative');
			});
		}
	});
};
/********** End of generic lighbox functions **********
*******************************************************/



(function() {
	var 
		window = this, 
		undefined,
		_jWestpac = window.jWestpac,
		jWestpac = window.jWestpac = function() {
			return new jWestpac.fn.init();
		};
	/**
	 * This Westpac library contains a set of functions as described below.
	 * 
	 * Note: define your functions within next section
	 */
	jWestpac.fn = jWestpac.prototype = {
		init: function() {
			return this;
		},
		jwestpac: "0.1",
		
		/************* new functions here separeted by commas *************
		 ******************************************************************/
		
		/**
		 * Opens a modal lightbox (defined as a tile in the 'topPageContainer' section of the page). 
		 * An overlay is added unless one already exists on the form, or if boolean false or string 'false'
		 * is passed to param usesOverlay.
		 *
		 * @param selectorString mandatory identifier for lightbox, typically '.window' or '#id' of the .window div.
		 * @param usesOverlay optional indicator for whether an overlay is required. Default is true.
		 *
		 * @author Cormac Cossar
		 */
		LightboxServiceType: {
			WIDTH_ADJUSTMENT: 20,
			HEIGHT_ADJUSTMENT: 19,
			overlayHeight: null, 
			overlayWidth: null, 
			lightboxHeight: null, 
			lightboxWidth: null, 
			winH: null, 
			winW: null,
			selectorString: null, 
			usesOverlay: true,
			printable: false,
			//Perform the displaying, enabling and disabling.
			display: function() {
				//If an overlay isn't provided, create one.
				if (this.usesOverlay) {
					this.addOverlayIfDoesntExist();
					jQuery('.overlay').show();
				}
				//Display the lightbox.
				jQuery(this.selectorString).fadeIn(100);
				
				// Sets tabindex of the close button to 201, to make sure not to
				// clash with other elements
				jQuery('.close').attr('tabindex', 201);
				
				//Disable the inputs on the page behind the lightbox.
				disableAllInputsSymmetric();
				//disableAllInputsSymmetric() may have disabled inputs on the lightbox. Enable them.
				this.reenableLightboxInputsOnly();
				//Perform fixes for IE behavioural quirks.
				this.applyIESpecificVisualAdjustments();
			},
			//Dynamically adds an overlay to the lightbox, if one doesn't exist.
			addOverlayIfDoesntExist: function () {
				if(jQuery('.overlay').size() <= 0) {
					var overlayDiv=jQuery('<div class="overlay"><div style="position: fixed;top: 0;left: 0;background: #000;-moz-opacity:.35; filter:alpha(opacity=35); opacity:.35;z-index: 9999; width=100%; height=100%;"></div></div>');
					// IE6 has issues if the overlay div is attached directly to body, so use the wrapper div element that is a child of body
					if(jQuery('body div#wrapper').size() == 1) {
						jQuery('body div#wrapper').append(overlayDiv);
					} else {
					jQuery('body').append(overlayDiv);
				}
				}
			},
			//IE6: Fix select boxes appearing on top of lightbox. IE#: Hide and maintain list of visible selects.
			applyIESpecificVisualAdjustments: function() {
				if (jQuery.browser.msie) {
					if (jQuery.browser.version == "6.0") {
						hideSelectsSymetric();
					}
					//IE PNG fix
					jQuery(".shadow_bg").fixPNG();
					//The disable all effects the close button in IE so re-enable it.
					jQuery(this.selectorString).find('.close').removeAttr('disabled');
				}
			},
			//Used for ensuring the inputs on the lightbox itself, are enabled upon launching.
			reenableLightboxInputsOnly: function() {
				jQuery(this.selectorString).find('a').removeAttr('disabled');
				jQuery(this.selectorString).find('input').attr('disabled',false);
				jQuery(this.selectorString).find('select').attr('disabled',false);
			},
			//Used for ensuring the inputs on the lightbox are disabled upon closing.
			disableLightboxInputsOnly: function() {
				jQuery(this.selectorString).find('a').attr('disabled',true);
				jQuery(this.selectorString).find('input').attr('disabled',true);
				jQuery(this.selectorString).find('select').attr('disabled',true);
			},
			//Set the lightbox and overlay sizes.
			establishSizing: function() {
				//Set height and width to modalFakeDialog to fill up the whole screen
				jQuery('.overlay').css({'width':this.overlayWidth,'height':this.overlayHeight});
				//height and width need to be set
				this.lightboxHeight = jQuery(this.selectorString).find('.modal').height();
				this.lightboxWidth = jQuery(this.selectorString).find('.modal').width();
				//Set height and width to the banner div
				jQuery(this.selectorString).css({'width':this.lightboxWidth + this.WIDTH_ADJUSTMENT + 'px','height':this.lightboxHeight + this.HEIGHT_ADJUSTMENT + 'px'});
				//Get the window height and width
				this.winH = jQuery(window).height();
				this.winW = jQuery(window).width();
				//Set the popup window to center
				jQuery(this.selectorString).css('top',  this.winH/2-jQuery(this.selectorString).height()/2+jQuery(window).scrollTop());
				jQuery(this.selectorString).css('left', this.winW/2-jQuery(this.selectorString).width()/2);
			},
			//Adds close handling for 'Enter' and the click events on overlay and close button.
			addLightboxHandlers: function() {
				if (this.usesOverlay) {
					jQuery('.overlay').click(this.handleLightboxOverlayClick);
				}
				jQuery(this.selectorString).find('.close').click(this.handleLightboxCloseClick);
				jQuery(this.selectorString).find('.close').keydown(this.handleHideBannerOnKeydown);
				if(this.printable) {
					this.addPrinting();
				}
			},
			//Handler for the click event on the overlay area; closes the lightbox/overlay.
			handleLightboxOverlayClick: function() {
				lightboxService.closeLightbox();
				return false;
			},
			//Handler for the click event on the close button; closes the lightbox/overlay.
			handleLightboxCloseClick: function() {
				lightboxService.closeLightbox();
				return false;
			},
			//Handler for the keydown event on the close button; closes the lightbox/overlay upon Enter.
			handleHideBannerOnKeydown: function(event) {
				if (event.keyCode == 13) {
					lightboxService.closeLightbox();
					return false;
				}
			},
			//Enables all form inputs and closes the lightbox & overlay.
			closeLightbox: function() {
				enableAllInputsSymmetric();
				//enableAllInputsSymmetric() may have enabled inputs on the lightbox. Disable them.
				this.disableLightboxInputsOnly();
				if (jQuery.browser.msie && jQuery.browser.version == "6.0") {
					showSelectsSymetric();
				}
				jQuery('.overlay').hide();
				jQuery('.lightbox .window').hide();
				this.unsetPrintMedia();
			},
			//Initialises parameters and sizing.
			init: function(selectorString, usesOverlay, isPrintable) {
				if (!selectorString) {
					throw 'missingSelector';
				}
				this.selectorString = selectorString;
				if (usesOverlay == false || usesOverlay == 'false') {
					this.usesOverlay = false;
				}
				//Get the screen height and width
				this.overlayHeight = jQuery(document).height();
				this.overlayWidth = jQuery(window).width();
				
				if (isPrintable == true || isPrintable == 'true') {
					this.printable = true;
				}
			},
			//Main function to performs the actual launching of the lightbox.
			launch: function() {
				//Show the lighbox and disable the page behind.
				this.display();
			
				//Set the appropriate sizes.
				this.establishSizing();

				//Provide the necessary event handlers for closing.
				this.addLightboxHandlers();
				
				//Set focus on the close button.
				jQuery(this.selectorString + ' .close').focus();
				return false;
			},
			//Set classes for media='print' so lightbox is printed
			setPrintMedia: function() {
				//Toggle standard print section to unprintable
				jQuery('#logonContent').addClass('hideMePlease');
				jQuery('#pageHeaderElement').addClass('hideMePlease');

				//Toggle all lightbox to unprintable
				jQuery('.lightbox').addClass('hideMePlease');
				
				//Toggle currently displayed lightbox to printable
				jQuery(this.selectorString).parent().removeClass('hideMePlease');
				jQuery(this.selectorString).addClass('showMePlease');
				jQuery(this.selectorString).addClass('printContentWrapper');

				//Set lightbox print classes of type-b or type-d
				if ( jQuery(this.selectorString).parent().hasClass('type-b') ) {
					jQuery('body').addClass('type-b');
				}
				else if ( jQuery(this.selectorString).parent().hasClass('type-d') ) {
					jQuery('body').addClass('type-d');
				}				
			},
			//Restore classes for media='print' so the main content is printed
			unsetPrintMedia: function() {
				//Toggle standard print section to printable
				jQuery('#logonContent').removeClass('hideMePlease');
				jQuery('#pageHeaderElement').removeClass('hideMePlease');

				//Toggle all lightboxes to printable
				jQuery('.lightbox').removeClass('hideMePlease');

				//Toggle currently displayed lightbox to unprintable
				jQuery(this.selectorString).removeClass('printContentWrapper');
				jQuery(this.selectorString).removeClass('hideMePlease');
				
				//Unset lightbox print classes of type-b or type-d
				jQuery('body').removeClass('type-b');
				jQuery('body').removeClass('type-d');

			},
			printClickHandler: function() {
				window.print();
				return false;
			},
			printKeyboardHandler: function(event){
				// Only if enter or space bar is pressed. Skip firefox
				// as it automatically fires the click event which will lead to multiple
				// print() invocations.
				if (!jQuery.browser.mozilla && (event.keyCode == 13 || event.keyCode == 32)) {
					window.print();
					return false;
				}
				else if(event.which == 9) {
					// This is to return the focus to the close button upon a tab
					// key press on the print button. Otherwise it will propagate
					// the focus to the elements behind the overlay.			
					jQuery('.close').focus();
					return false;
				}
			},
			addPrinting: function() {
				if(jQuery('.printlink').size() <= 0) {
					var printLink=jQuery('<a href="#" class="printlink">Print</a>');
					printLink.insertBefore(jQuery('.close'));
				} 
				jQuery('.printlink').click(this.printClickHandler);	
				jQuery('.printlink').keydown(this.printKeyboardHandler);
				
				// Sets tabindex of the print button to 202, to make sure not to
				// clash with other elements
				jQuery('.printlink').attr('tabindex', 202);
				
				//Setup the CSS classes required to print the lightbox content.
				//Note this is executed regardless of whether the button has to be added
				//due to instance may already exist and values been already set first time
				this.setPrintMedia();
			}
		},//End of type declaration
		launchLightbox: function(selectorString, usesOverlay, isPrintable) {
			/*** The work starts here! ****/
			lightboxService = jWestpac().LightboxServiceType;
			try {
				lightboxService.init(selectorString, usesOverlay, isPrintable);
			} catch (initialisationException) {
				if (initialisationException == 'missingSelector') {
					standardErrorHandler('Param selectorString is mandatory in function launchLightbox(), but null received');
				}
			}
			return lightboxService.launch();
		}
	};
	jWestpac.fn.init.prototype = jWestpac.fn;
})();

