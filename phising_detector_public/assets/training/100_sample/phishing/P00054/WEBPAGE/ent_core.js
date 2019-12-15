/*!Copyright (c) 2012 United Services Automobile Association All Rights Reserved ent_core.js*/
/*
**********************************************************************
* Copyright (C) 2008-2012
* United Services Automobile Association
* All Rights Reserved
*
* File: ent_core.js
**********************************************************************
* Target   Chg Date   Name            Description
* ======== ========  =============   ==================
* 04/27/12 03/21/12  Aaron Ryder      Changed 'Skip To Content' setAttribute to setStyle to hide link 
* 03/30/12 02/08/12  Aaron Ryder      Fix 'Skip To Content' multiple clicks
* 04/15/11 02/15/20  Harish K S        SR154155 - Fix 'Skip To Content' Link for WebKit Browsers
* 04/15/11 03/07/11  Logesh.R           Implemeted a logic to initialize USAA._loadedModules and added USAA.register() 
* 02/26/10 12/02/09  D. Semmens       Added function for debuging and removed USAALoader
* 09/19/08 08/28/08  Paul Manz         changed "ent" namespace to "ec"
* 08/22/08 08/05/08  Jesse Cravens    added USAA.register() and USAA.browserDetect(), deprecaet USAALoader
* 08/22/08 07/28/08  Jesse Cravens    added USAA.extend()
* 06/20/08 05/23/08  Jesse Cravens    added USAA.namespace()
* 05/23/08 05/06/08  Rakshith             Initial Creation
**********************************************************************
*/

/**
 * @ description The USAA global namespace object.  If USAA is already defined, the
 * existing USAA object will not be overwritten so that defined
 * namespaces are preserved.
 * @namespace Holds all USAA Enterprise library functionality
 */
if (typeof USAA == "undefined") {
	var USAA = {};
}

/**
 * @ gadgets global namespace object.
 * @namespace Holds all gadgets library functionality
 */
var gadgets = gadgets || {};

/* ------------------------ Group: USAA Public Methods ----------------------------*/

/**
 * 
 * @method namespace
 * @param  {String*} arguments 1-n namespaces to create 
 * @return {Object}  A reference to the last namespace object created
 * @description Returns the namespace specified and creates it if it doesn't exist
 */
USAA.namespace = function() {
    var a = arguments, 
        o = null, 
        i = 0, 
        j = 0, 
        tok = null;
    for (i=0; i<a.length; i=i+1) {
        tok=a[i].split(".");
        o=USAA;
        
        for (j=(tok[0] == "USAA") ? 1 : 0; j<tok.length; j=j+1) {
            o[tok[j]]=o[tok[j]] || {};
            o=o[tok[j]];
        }
    }
    return o;
};

/** USAA COSA Namespaces */
USAA.namespace('cp'); //cp - Corporate applications
USAA.namespace('ec'); //ec - Enterprise Applications
USAA.namespace('bk'); //bk - Bank
USAA.namespace('lh'); //lh - ife Health & Annuities
USAA.namespace('pc'); //pc - P&C
USAA.namespace('as'); //as - Alliance Services
USAA.namespace('im'); //im - Investments Management
USAA.namespace('fp'); //fp - Financial Planning Services
USAA.namespace('gy'); //gy - A subset of P&C, this is the PAS system
USAA.namespace('ent.util'); // USAA enterprise utilities
USAA.namespace('ent.widget'); // USAA enterprise widgets
USAA.namespace('ec.widget'); // USAA enterprise widgets
USAA.namespace('ent.portal'); // USAA enterprise Internet Portal Framework
USAA._loadedModules = USAA._loadedModules || {};

/**
 * 
 * @method extend
 * @param  {Obj*} subClass - the Class to be extended
 * @param  {Obj*} superClass  - the Class being extended 
 * @description used to extend the functionality of a JavaScript Class through prototypal inheritance
 */
USAA.extend = function(subClass, superClass) {
	function protoInherit() {}
	protoInherit.prototype = superClass.prototype;
	subClass.prototype = new protoInherit();
	subClass.prototype.constructor = subClass;
	subClass.superConstructor = superClass;
}

/**
 *
 * @method register
 * @param  {String}  module the id of the script file to load.
 * @param {String}   name    the name of the module (event, slider, etc)
 * @param {Function} mainClass a reference to class in the module.  This
 *                             class will be tagged with the version info
 *                             so that it will be possible to identify the
 *                             version that is in use when multiple versions
 *                             have loaded
 * @param {Object}   data      metadata object for the module.  Currently it
 *                             is expected to contain a "version" property
 *                             and a "build" property at minimum.
 * @description registers a JavaScript file for use with USAA.ent.util.Loader.includeJS()
 */
USAA.register = function(module, name, mainClass, data ) {
	USAA._loadedModules[module] = module;
	if(name){
		YAHOO.register(name, mainClass, data);
	}
};

/**  
 * @method USAA.browserDetect 
 * @description utility to determine browser 
*/
USAA.browserDetect = {
	userAgent: {
		IE:     !!(window.attachEvent && !window.opera),
		Opera:  !!window.opera,
		WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
		Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
		MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
	}
};

/**
 * @method USAA.debug
 * @param String A message to be written to console
 * @description Used to write debug messages when debug is set to true
*/
USAA.debug = function(message) {
	var debug = false;
	if (debug) {
		if (USAA.browserDetect.userAgent.Gecko) {
			console.log(message);
		}
		else {
			alert(message);
		}
	}
};

/**
 * @description Used to set the focus while using Skip to Content
*/
USAA.namespace("USAA.ec.util.skipToContent");
USAA.ent.util.skipToContent = function (contentId) {
	var yDom = YAHOO.util.Dom,
		yLang = YAHOO.lang,
		skippedToContent = false;

	if ( yLang.isString(contentId) ) {
		var targetContent = yDom.get(contentId);
		if ( targetContent ) { // Ensure content is on page
			var skipIdPrefix = "skippedTo_", // Prefix for targetLink Id
			    targetLinkId = skipIdPrefix + contentId,  // Create a unique targetLink Id based on the contentId
		        targetLink = yDom.get(targetLinkId); // Get targetLink from page
		
			if ( !targetLink ) { // If targetLink is on the page (i.e. skipToContent already called for this contentId)
				targetLink = document.createElement('a'); // Create target link for focus to jump to
				yDom.setAttribute(targetLink, "id" , targetLinkId); // Give targetLink a unique Id based on the contentId
				yDom.setAttribute(targetLink, "href" , "#" + contentId); // an href needs to be set so that Safari can focus on element
				yDom.setAttribute(targetLink, "tabindex" , "0"); // set tabindex so that we can focus on element
				yDom.setStyle(targetLink, "position", "absolute"); // We want to hide the inserted skip link so it's not seen, but we can't use the 'hiddenMessage' class as Safari then ignores the link
				yDom.setStyle(targetLink, "left", "-9999px");
				targetLink.innerHTML = "Start of Content"; // Text needs to be added so Safari can focus on it
				yDom.insertBefore(targetLink, targetContent); // Add the targetLink right above the targetContent
			}
			
			targetLink.focus(); // Focus on target content
			skippedToContent = true; // Skip was successful
		} else {
			USAA.debug('USAA.skipToContent(): Element with matching Id not found: Id given' + contentId);
		}
	} else {
		USAA.debug('USAA.skipToContent(): First parameter expects a string. Parameter given:' + contentId);
	}
	
	return skippedToContent;
};
USAA.register("ent_core");
USAA.register("ent_core-min");
