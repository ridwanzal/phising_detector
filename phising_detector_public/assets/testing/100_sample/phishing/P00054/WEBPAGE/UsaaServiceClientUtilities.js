/*!Copyright (c) 2012 United Services Automobile Association All Rights Reserved UsaaServiceClientUtilities.js*/
/**********************************************************************************************
* Copyright 2011 - 2012
* United Services Automobile Association
* All Rights Reserved
*
* File: ent/services_client/UsaaServiceClientUtilities.js
**********************************************************************************************
* Target   		Chg Date  	Name                        Description
* ======== 		========  	=============               ======================================
* 12/14/2012	11/16/2012	S. Beaullieu			Added UnifiedMessage to requires array to fix undefined error.
* 08/26/2011	07/14/2011	D. Videtta, F. Braun		Include Binary Data
* July 11      	05/26/2011  D. Videtta, F. Braun		Initial Creation
**********************************************************************************************/

/** 
 * @fileOverview JavaScript utility that provides all the functionality to communicate to the 
 * Services framework 
 * @author D. Videtta, F. Braun
 * @version 1.0
 * @requires yui, json-parse, json-stringify, event-custom, UsaaServiceRequest, cookie, io-base, Md5Util, history-hash
 */

YUI.add('UsaaServiceClientUtilities', function (Y) {

	/**
	 * Creates a new UsaaServiceClientUtilities
	 * @class contains the methods that call the services in the 
	 * Adaptive Services Infrastructure framework
	 * @namespace
	 */
	var UsaaServiceClientUtilities = function () {
	
		
		/** ------------------  Private members ------------------------------ */
		
		/**
		 * @private 
		 * @description error code constant for retry scenario
		 * @type number
		 */
		var _retryCode = 850104; 	
		
		/**
		 * @private 
		 * @description error code constant for non-authorized scenario
		 * @type number
		 */
		var _nonAuthorizedCode = 850301; 	
		
		/**
		 * @private 
		 * @description error code constant for non-authenticated scenario
		 * @type number
		 */
		var _nonAuthenticatedCode = 850302; 	
		
		/**
		 * @public
		 * @description Converts JavaScript objects into JSON objects
		 * @name createJSON
		 * @param javascriptObject JavaScript object
		 * @returns JSON representation of the input object 
		 * @throws an error if create JSON object fails
		 */
		var _createJSON = function (javascriptObject) {

			try {
				var JSONString = Y.JSON.stringify(javascriptObject);
				return JSONString;
			} catch (e) {
				throw {
					errorCode: 110,
					message: "Creating JSON object failed for: '" + _convertObjectToString(javascriptObject) + "'",
					responseObject: javascriptObject
				};
			}
		};
		
		/**
		 * @public
		 * @description performs tasks on the response to prepare it for parsing to JSON. 
		 * @name formatResponse
		 * @param - id   : YUI unique transaction Id. 
		 *          o    : raw JSON received back from server via AJAX call
		 *          args : configuration object used to register event handlers for "success", "failure", and "complete" YUI
		 *                 io events.  
		 * @returns formatted JSON response                
		 * @throws an error if the args is not defined in the response  
		 */
		var _formatResponse = function (id, o, args) {
			
			if (args) {
				// everything is ok
			} else {
				throw {
					errorCode: 120,
					message: "An error occurred when formatting the response because the arguments request is not defined in the IO call.",
					responseObject: null
				};
			}

			var rawJSON = o.responseText ? o.responseText : o;
			var formattedJSON = _stripCommentTags(rawJSON);
			
			return formattedJSON; 
		};
		
		/**
		 * @private
		 * @description strip of the comment tags surrounding the JSON.  
		 * @param JSONString The response JSON String 
		 * @returns JSON string with no comments
		 */
		var _stripCommentTags = function (JSONString) {

			if (JSONString && JSONString.replace) {
				JSONString = JSONString.replace(/^\s+|\s+$/g, "");
				var len = JSONString.length;
				if (JSONString.substring(0, 2) === "/*") {
					JSONString = JSONString.substring(2, len - 2);
				}
			}
			return JSONString;
		};
		
		/**
		 * @public
		 * @description parse the response JSON String to a JS Object  
		 * @name parseJSON
		 * @param JSONString The response JSON String 
		 * @param args configuration object in the service call 
		 * @returns JavaScript object
		 * @throws an error if the args is not defined or the JSON object
		 * is invalid and cannot be parsed
		 * 
		 */
		var _parseJSON = function (JSONString, args) {

			var requestID = "";
			if (args) {
				requestID = args.requestID;

			} else {
				throw {
					errorCode: 110,
					message: "An error occurred when parsing the response because the arguments request is not defined in the IO call.",
					responseObject: null
				};
			}
			
			try {
				var results = Y.JSON.parse(JSONString);
				
				return results;
			}
			catch (e) {

				var responseObject = {
						requestID : requestID
					};
				
				throw {
					errorCode: 110,
					message: "Parsing JSON failed for: '" + JSONString + "'",
					responseObject: responseObject
				};
			}
		};
		
		/**
		* @public
		* @description Validate the required parameters for a service request
		* @name validateRequest
		* @param requestConfig configuration object with the request information
		* @returns configuration object 
		* @throws an error if one of the required is missing 
		*/
		var _validateRequest = function (requestConfig) {

			var responseObject = {
					requestID : requestConfig.requestID
				};
			
			if (requestConfig.serviceURL != null && requestConfig.serviceURL.length !== 0) {
				
				if (requestConfig.operationName != null && requestConfig.operationName.length !== 0) {
				
					if (requestConfig.operationVersion != null && requestConfig.operationVersion.length !== 0) {
						// Request is valid
					} else {
						throw {
							errorCode: 100,
							message: "operationVersion property is required",
							responseObject: responseObject
						};
					}
					
				} else {
					throw {
						errorCode: 100,
						message: "operationName property is required",
						responseObject: responseObject
					};
				}
				
			} else {
				throw {
					errorCode: 100,
					message: "serviceURL property is required",
					responseObject: responseObject
				};
			}
		};

		/**
		* @public  
		* @description Create the service request that will be used to call the service.
		* This includes creating the secure token and the unified message.
		* @name createRequest
		* @param requestConfig configuration object with the request information
		* @returns UsaaServiceRequest
		* @throws an error if the parameters cannot be parsed 
		*/
		var _createRequest = function (requestConfig) {
			
			var secureToken = _generateSecureToken(requestConfig.channel);
			 
			var unifiedMessageConfig = {
				
					originHost : requestConfig.originHost,
					channel : requestConfig.channel,
					secureToken : secureToken,
					headerVersion : requestConfig.headerVersion,
					device : requestConfig.device
					
				};
			
			var msg = new Y.USAA.ent.services_client.UnifiedMessage(unifiedMessageConfig);
			
			var responseObject = {
					requestID :  requestConfig.requestID
				};
			
			var logParameters = requestConfig.loggingParameters;
			if (logParameters != null && !(logParameters instanceof Object) && logParameters.length !== 0) {
				
				try {
					logParameters = Y.JSON.parse(logParameters);
				}catch (e1) {
					throw {
						errorCode: 110,
						message: "Error parsing the 'loggingParameters' property of the request configuration",
						responseObject: responseObject
					};
				}
			}
			
			var reqParameters = requestConfig.requestParameters;
			if (reqParameters != null && !(reqParameters instanceof Object) && reqParameters.length !== 0) {
				try {
					reqParameters = Y.JSON.parse(reqParameters);
				} catch (e2) {
					throw {
						errorCode: 110,
						message: "Error parsing the 'requestParameters' property of the request configuration",
						responseObject: responseObject
					};
				}
			}
			
			var requestConfigObject = {
					serviceURL :  requestConfig.serviceURL,
					operationName : requestConfig.operationName,
					operationVersion : requestConfig.operationVersion,
					unifiedMessage : msg,
					loggingParameters : logParameters,
					requestParameters : reqParameters,
					requestID : requestConfig.requestID
				};
			
			var request = new Y.USAA.ent.services_client.UsaaServiceRequest(requestConfigObject);
			return request;
		};

		/**
		 * @private
		 * @description Generate the secure token for the request. 
		 * The secure token is calculated based on the cookie value or in
		 * case of a retry scenario is extracted from the service response.
		 * @param channel 
		 * @returns security token for the request
		 */
		var _generateSecureToken = function (channel) {
			
			var secureToken = ""; // Default value if cookie is not available
			var cookieName = "MemberGlobalSession";
			
			// If not passed by the consumer
			if (channel == null || channel.length === 0) { 
				channel = _getChannel();
			}
			
			// If channel is Mobile
			if (channel === "mobileMember") {
				cookieName = "MobileMemberGlobalSession";
			}
			
			var cookieValue = Y.Cookie.get(cookieName);
			
			if (cookieValue != null && cookieValue.length !== 0)
			{
				secureToken = Y.USAA.ent.services_client.Md5Util.hex_md5(cookieValue);
			}
			
			return secureToken;
		};
		

		/**
		 * @public
		 * @description Determine the channel value based on the cookie
		 * @name getChannel
		 * @returns the channel
		 */
		var _getChannel = function () {
			
			var channel = "";
			
			// If cookie MobileMemberGlobalSession exists, then it is mobile channel
			var cookieName = "MobileMemberGlobalSession";
			var cookieValue = Y.Cookie.get(cookieName);
			
			if (cookieValue != null && cookieValue.length !== 0)
			{
				channel = "mobileMember";
			}
			
			return channel;
		};
		
		
		/**
		 * @public
		 * @description call the service 
		 * @name callService
		 * @param requestJSONString The request as a JSON String 
		 * @param baseURL The URI of the service
		 * @param requestID request identifier
		 *  
		 */
		var _callService = function (requestJSONString, baseURL, requestID) {
			 
			var configObj = { 
					method: "POST",
					data: requestJSONString,
					headers: {'Content-Type': 'application/json'},
					arguments: {
						requestID: requestID
					}
				}; 
			Y.io(baseURL, configObj);	
		};
		 
		/**  
		 * @public
		 * @description Checks the return code of the response and handle the 
		 * different scenarios for success, retry, non-authorized and
		 * non-authenticated 
		 * @name processResponse
		 * @param response The response Object
		 * @param args arguments from the IO call
		 * @returns 0: success call
		 * 			1: retry scenario
		 * @throws 	error if the response is undefined or
		 * 			if the error code is different (failure) 
		 */
		var _processResponse = function (response, args) {

			var requestID = "";
			if (args) {
				requestID = args.requestID;
			} else {
				throw {
					errorCode: 130,
					message: "An error occurred when processing the response because the arguments request is not defined.",
					responseObject: null
				};
			}
			
			// success
			if ((typeof response !== "undefined") && (response.returnCode === 0)) {
				response.requestID = requestID; 
				return 0;
			}
			 // retry scenario
			else if ((typeof response !== "undefined") && (response.returnCode === _retryCode)) {

				response.requestID = requestID; 
				return 1;
			}
			 // other code 
			else {

				if (response) {
					response.requestID = requestID;
					// Non-authenticated failure: service will send Logon or PIN redirect url
					if (response.returnCode === _nonAuthenticatedCode) {
						throw {
							errorCode: 150,
							message: "An error occurred when processing the response. The requested service failed authentication level. Error code: " + response.returnCode,
							responseObject: response
						};
					} else if (response.returnCode === _nonAuthorizedCode) { // Non-authorized failure
						throw {
							errorCode: 151,
							message: "An error occurred when processing the response. The requested service failed authorization. Error code: " + response.returnCode,
							responseObject: response
						};
					} else {
						// Other error code
						throw {
							errorCode: 130,
							message: "An error occurred when processing the response. Error code: " + response.returnCode,
							responseObject: response
						};
					}
					
				} else {
					// No response is sent from the service
					throw {
						errorCode: 130,
						message: "An error occurred when processing the response.",
						responseObject: null
					};
				}
			}
		} ;
		
		/** 
		 * @private
		 * @description Creates a String representation for the object properties.
		 * This is good for displaying the content of an object.
		 * @param obj JavaScript object
		 * @param maxDepth how many levels of detail inside the object
		 * @returns String representation of object properties 
		 */
		var _convertObjectToString = function (obj, maxDepth) {
			var result = '';
			if (!maxDepth) {
				maxDepth = 5;
			}
			for (var key in obj) {
				if (typeof obj[key] === 'object') {
					if (maxDepth !== undefined && maxDepth <= 1) {
						result += (key + '=object [max depth reached]\n');
					} else {
						result += _convertObjectToString(obj[key], (maxDepth) ? maxDepth - 1 : maxDepth, "    " + key + '.');
					}
				} else {
					result += (key + '=' + obj[key] + '\n');
				}
			}
			return result;
			
		};
		
		/** ------------------  Public members ------------------------------ */
		return {
			validateRequest : _validateRequest,
			createRequest : _createRequest,
			getChannel : _getChannel,
			createJSON : _createJSON,
			formatResponse : _formatResponse,
			parseJSON : _parseJSON,
			processResponse : _processResponse,
			callService : _callService
		};
	}();

	Y.namespace('USAA.ent.services_client').UsaaServiceClientUtilities = UsaaServiceClientUtilities;
// test
}, '1.0', {requires: ['yui', 'json-parse', 'json-stringify', 'event-custom', 'UsaaServiceRequest', 'cookie', 'io-base', 'Md5Util', 'history-hash', 'UnifiedMessage']});