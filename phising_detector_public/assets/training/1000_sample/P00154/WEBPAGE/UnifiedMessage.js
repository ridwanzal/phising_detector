/*!Copyright (c) 2012 United Services Automobile Association All Rights Reserved UnifiedMessage.js*/
/**********************************************************************************************
* Copyright 2011
* United Services Automobile Association
* All Rights Reserved
*
* File: ent/services_client/UnifiedMessage.js
**********************************************************************************************
* Target   		Chg Date  	Name                        Description
* ======== 		========  	=============               ======================================
* July 11       05/26/2011  D. Videtta, F. Braun        Initial Creation			    			                  			
**********************************************************************************************/

/** 
 * @fileOverview Unified Message for the request calls to the Adaptive Services Infrastructure framework  
 * @author D. Videtta, F. Braun
 * @version 1.0
 * @requires yui, history-hash, UsaaServiceClientUtilities
 */

YUI.add('UnifiedMessage', function (Y) {
	
	Y.namespace('USAA.ent.services_client');
	
	/**
	 * Creates a new UnifiedMessage
	 * @class contains the attributes of a Unified Message
	 * @namespace
	 * @param config - optional properties:
	 * 			originHost
	 * 			channel
	 * 			secureToken
	 * 			headerVersion
	 * 			device
	 */
	Y.USAA.ent.services_client.UnifiedMessage = function (config) {
		
		/** ------------------  Private members ------------------------------ */
		
		/**
		 * @public 
		 * @description Release ID for the Service - currently not implemented
		 * @name releaseId
		 * @type string
		 */
		var _releaseId = "1.0"; 	
		
		/**
		 * @public 
		 * @description Consumer host if passed, if not use the Client browser information when available
		 * @name originHost
		 * @type string
		 */
		var _originHost = config.originHost || navigator.appName;  		 

		/**
		 * @public 
		 * @description Channel which the Service is available, derived from the cookie.
		 * If MobileMemberGlobalSession is mobileMember else ""
		 * @name channel
		 * @type string
		 */
		var _channel = config.channel || Y.USAA.ent.services_client.UsaaServiceClientUtilities.getChannel();			
		
		/**
		 * @private 
		 * @description Current date
		 * @type Date
		 */
		var date = new Date();
		
		/**
		 * @public 
		 * @description Request TimeStamp
		 * @name requestTS
		 * @type number
		 */
		var _requestTS = date.getTime();
		
		/**
		 * @public 
		 * @description Unique Request ID that changes with every request, to Prevent CSRF
		 * @name secureToken
		 * @type string
		 */
		var _secureToken = config.secureToken || ""; 
		
		/**
		 * @public 
		 * @description Header version
		 * @name headerVersion
		 * @type string
		 */
		var _headerVersion = config.headerVersion || "1.0";	
		
		/**
		 * @public 
		 * @description Device in which the Client is running
		 * @name device
		 * @type string
		 */
		var _device = config.device || navigator.appName; 	
		
		/**
		 * @public 
		 * @description Application name the request come from
		 * @name appName
		 * @type string
		 */
		var _appName = "javascriptApp"; 		
		
		/**
		 * @public 
		 * @description redirect identifier (used to specify if a redirect to logon/pin should happen if not authenticated) 
		 * @name redirectToUrl
		 * @type string
		 */
		var _redirectToUrl = "false"; 	
		
		/** ------------------  Public members ------------------------------ */
		return {
			releaseId : _releaseId,
			originHost: _originHost,
			channel : _channel,
			requestTS : _requestTS,
			secureToken : _secureToken,
			headerVersion : _headerVersion,
			device : _device,
			appName : _appName,
			redirectToUrl : _redirectToUrl
		}; 
		
	};

}, '1.0' , {requires: ['yui', 'history-hash', 'UsaaServiceClientUtilities']});