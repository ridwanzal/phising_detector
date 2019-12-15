/*!Copyright (c) 2012 United Services Automobile Association All Rights Reserved UsaaServiceResponse.js*/
/**********************************************************************************************
* Copyright 2011
* United Services Automobile Association
* All Rights Reserved
*
* File: ent/services_client/UsaaServiceResponse.js
**********************************************************************************************
* Target   		Chg Date  	Name                        Description
* ======== 		========  	=============               ======================================
* July 11      	05/26/2011  D. Videtta, F. Braun        Initial Creation			    			                  			
**********************************************************************************************/

/** 
 * @fileOverview JavaScript Service response in the Adaptive Services Infrastructure framework 
 * @author D. Videtta, F. Braun
 * @version 1.0
 * @requires yui
 */

YUI.add('UsaaServiceResponse', function (Y) {
	
	Y.namespace('USAA.ent.services_client');
	
	/**
	 * Creates a new UsaaServiceRequest
	 * @class contains the attributes of a Usaa Service Response
	 * @namespace
	 * @param 	config information. 
	 * 		Properties: 
	 * 			returnCode		
	 * 			displayMessages
	 * 			systemMessages
	 * 			responseObject
	 * 			secureToken
	 * 			binaryData		
	 */
	Y.USAA.ent.services_client.UsaaServiceResponse = function (config) {
		
		/** ------------------  Private members ------------------------------ */

		/**
		 * @public 
		 * @description Error code the Service return to the Client - passed in from the server. It is also used to communicate
		 * to the consumer about validation errors from the Client.
		 * @name returnCode
		 * @type number
		 */
		var _returnCode = config.returnCode || -1;		
		
		/**
		 * @public 
		 * @description Messages to be displayed - passed in from the server
		 * @name displayMessages
		 * @type Array
		 */
		var _displayMessages = config.displayMessages || null;	
		
		/**
		 * @public 
		 * @description Messages that the Service reported while executing the request - passed in from the server
		 * @name systemMessages
		 * @type Array
		 */
		var _systemMessages = config.systemMessages || null;
		
		/**
		 * @public 
		 * @description Object that contains the response from the Service - passed in from the server
		 * @name responseObject
		 * @type Object
		 */
		var _responseObject = config.responseObject || null;	
		
		/**
		 * @public 
		 * @description Unique Request ID that changes with every request, to Prevent CSRF - passed in from the server
		 * @name secureToken
		 * @type string
		 */
		var _secureToken = config.secureToken || null; 				
		
		/**
		 * @public 
		 * @description Binary data from the Service - passed in from the server
		 * @name binaryData
		 * @type 
		 */
		var _binaryData = config.binaryData || null; 		
		
		/** ------------------  Public members ------------------------------ */
		return {
			returnCode: _returnCode,
			displayMessages: _displayMessages,
			systemMessages: _systemMessages,
			responseObject: _responseObject,
			secureToken: _secureToken,
			binaryData: _binaryData
		}; 
		
	};
}, '1.0', {requires: ['yui']});	