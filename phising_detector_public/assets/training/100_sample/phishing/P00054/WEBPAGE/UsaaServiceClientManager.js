/*!Copyright (c) 2012 United Services Automobile Association All Rights Reserved UsaaServiceClientManager.js*/
/**********************************************************************************************
* Copyright 2011
* United Services Automobile Association
* All Rights Reserved
*
* File: ent/services_client/UsaaServiceClientManager.js
**********************************************************************************************
* Target       Chg Date     Name                        Description
* ==========   ==========  	=========================   ======================================
* 08/26/2011   07/14/2011	D. Videtta, F. Braun		Include Binary Data
* July 11      05/26/2011   D. Videtta, F. Braun        Initial Creation
**********************************************************************************************/

/** 
 * @fileOverview Manager that handles the user requests to the
 * JavaScript client for the Adaptive Services Infrastructure  
 * @author D. Videtta, F. Braun
 * @version 1.0
 * @requires yui, event-custom, UsaaServiceClientUtilities, UsaaServiceResponse
 */
YUI.add('UsaaServiceClientManager', function (Y) {
	
	Y.namespace('USAA.ent.services_client.UsaaServiceClientManager');
	
	/**
	 * Creates a new UsaaServiceClientManager
	 * @class contains the methods to call the services in the JavaScript
	 * client. It uses the UsaaServiceClientUtilities to process the requests
	 * @namespace
	 */
	Y.USAA.ent.services_client.UsaaServiceClientManager = function () {
		
		/** ------------------  Private members ------------------------------ */
		
		/**
		 * @private 
		 * @description Maintains the list of services calls to the Manager and its configurations  
		 * @type Array
		 */
		var _requests = [];
		
		/**
		 * @private 
		 * @description Listeners for IO calls   
		 * @type Object
		 */
		var _successHandler = null,
			_failureHandler = null;
		
		
		/**
		 * @private
		 * @description Creates the configuration object for a request
		 * @param serviceURL URL for the Service
		 * @param operationName name of the operation to request 
		 * @param serviceRequest UsaaServiceRequest
		 */
		var _configureRequest = function (serviceURL, operationName, serviceRequest) {
			return {
				serviceURL : serviceURL,
				operationName : operationName,
				retryScenario : false,
				serviceRequest : serviceRequest
			};
		};

		/**
		 * @public
		 * @description Invoke the client service to process a request
		 * @name invokeService
		 * @param requestConfig configuration object with the request information
		 * 		required properties:
		 * 			serviceURL				
		 * 			operationName
		 * 			operationVersion
		 * 		optional properties:
		 * 			securityLevel
		 * 			loggingParameters
		 * 			requestParameters
		 * 			channel
		 */
		var _invokeService = function (requestConfig) {
			
			// Validate if the requestId is provided
			if (!requestConfig.requestID || requestConfig.requestID.length === 0) {
				_createFailureResponse("170", "Missing the request id attribute in the config object");
				return;
			}
			// Initiate the flow for processing a service request
			try {
				var usaaServiceRequest = _prepareRequest(requestConfig);
				_processRequest(usaaServiceRequest, requestConfig.requestID);
			} catch (e) {
				_createFailureResponse(e.errorCode, e.message, e.responseObject);
			}
		};
		
		/** 
		 * @public
		 * @description Invoke the client service to process an aggregated request
		 * @name invokeAggregatedServiceCall
		 * @param requestConfig configuration object with the request information
		 * 		required properties:
		 * 			serviceURL				
		 * 			operationName
		 * 			operationVersion
		 * 		optional properties:
		 * 			securityLevel
		 * 			loggingParameters
		 * 			requestParameters
		 * 			channel
		 */
		var _invokeAggregatedServiceCall = function () {
			
			var requestArray = []; 
			var aggreagatedRequestId = ""; 
			var i;
			var serviceURL = "";
			try
			{
				for (i = 0; i < arguments.length; i += 1) {
					
					var requestConfig = arguments[i];
					if (!requestConfig.requestID || requestConfig.requestID.length === 0) {
						
						var returnObject = {
								requestID : aggreagatedRequestId
						};
						throw {
							errorCode: 170,
							message: "Missing the request id attribute in the config object",
							responseObject: returnObject
						};
					}
					if (i === 0)  // id of the first config object is used for the aggregated request
					{
						aggreagatedRequestId = requestConfig.requestID;
						if (requestConfig.serviceURL !== undefined) {
							serviceURL = requestConfig.serviceURL; 
						}
					} else {
						if(requestConfig.serviceURL !== undefined && serviceURL !== requestConfig.serviceURL){
						    throw {
								errorCode: 170,
								message: "The Aggregated request contains more than one serviceURL. Your request will not be processed",
								responseObject: {
									requestID : aggreagatedRequestId
								}
							};
						}
					}
					

					requestArray[i] = _prepareRequest(requestConfig);
				}
				
				var aggregatedServicesRequest = {
					usaaRequests : requestArray
				};
				
				_processRequest(aggregatedServicesRequest, requestArray[0].requestID);

			} catch (e) {
				e.responseObject.requestID = aggreagatedRequestId;
				_createFailureResponse(e.errorCode, e.message, e.responseObject);
			}
		};

		/** 
		 * @private
		 * @description Start the flow for processing a customer request. Validate the required
		 * fields, create the entry for the list of requests and create the UsaaServiceRequest 
		 * @param requestConfig configuration object with the request information
		 * @throws an error if the request cannot be created
		 */
		var _prepareRequest = function (requestConfig) {
			
			try
			{

				Y.USAA.ent.services_client.UsaaServiceClientUtilities.validateRequest(requestConfig);
				
				_requests[requestConfig.requestID] = new _configureRequest(requestConfig.serviceURL, requestConfig.operationName);
				_requests[requestConfig.requestID].serviceURL = requestConfig.serviceURL;
				_requests[requestConfig.requestID].operationName = requestConfig.operationName;
				
				var usaaServiceRequest = Y.USAA.ent.services_client.UsaaServiceClientUtilities.createRequest(requestConfig);
				
				if (_requests[usaaServiceRequest.requestID] && _requests[usaaServiceRequest.requestID].retryScenario === false) {
					_requests[usaaServiceRequest.requestID].serviceRequest = usaaServiceRequest;
				}
			} catch (e) {

				_createFailureResponse(e.errorCode, e.message, e.responseObject);
				throw {
					errorCode: e.errorCode,
					message: e.message,
					responseObject: e.responseObject
				};
			}
			return usaaServiceRequest;
		};
			
		/**
		 * @private
		 * @description Make the call to the service and process the response
		 * @event io:success 
		 * @event io:failure
		 * @param usaaServiceRequest request object
		 * @param requestID request identifier
		 */
		var _processRequest = function (usaaServiceRequest, requestID) {
			
			try
			{
				var requestJSONString = Y.USAA.ent.services_client.UsaaServiceClientUtilities.createJSON(usaaServiceRequest);
				
				if (!_successHandler) {
					_successHandler = Y.on('io:success', _processSuccessResponse);
			    }
				if (!_failureHandler) {
					_failureHandler = Y.on('io:failure', _processFailureResponse);					
				}
				
				var callServiceResult = Y.USAA.ent.services_client.UsaaServiceClientUtilities.callService(requestJSONString, _requests[requestID].serviceURL, requestID);
				
			} catch (e) {
				_createFailureResponse(e.errorCode, e.message, e.responseObject);
			}
		};
			
		/**
		 * @private
		 * @description Process a successful response from the Service IO call 
		 * @param id IO call ID
		 * @param o service response object
		 * @param args arguments from the IO call
		 * @throws an error if the retry call fails
		 */		
		var _processSuccessResponse = function (id, o, args) {
			
			try
			{
				// check the content type to see if the response body is JSON
				var contentType = o.getResponseHeader("Content-Type");
				
				// JSON response
				if (contentType.indexOf("application/json") === 0) {
					
					var currentRequestID = args.requestID;
					// Check if the current request id is in the manager requests array.
					// Ensure we process only the responses to requests that are made through this Manager instance
					if (_requests[currentRequestID] === undefined) {
						return;
					}
					
					var formattedJSONResponse = Y.USAA.ent.services_client.UsaaServiceClientUtilities.formatResponse(id, o, args);
					
					var responseObject = Y.USAA.ent.services_client.UsaaServiceClientUtilities.parseJSON(formattedJSONResponse, args);
					responseObject.contentType = contentType;
					
					// check if response is an aggregated response
					// if aggregated return the result to consumer and do not attempt retry 
					if (responseObject.hasOwnProperty('usaaServiceResponses')) {
						
						_createSuccessResponse(responseObject);
						return;
					}
					
					// Process the response from the service 0 - everything is ok, 1 - retry
					var responseProcessingCode = Y.USAA.ent.services_client.UsaaServiceClientUtilities.processResponse(responseObject, args);
					
					if (responseProcessingCode === 0) { 

						_createSuccessResponse(responseObject);
						return;
					}
					else if (responseProcessingCode === 1)
					{

						// only retry once
						
						var currentConfig = _requests[currentRequestID];
						
						if (currentConfig.retryScenario === true)
						{
							var responseToClient = {
									requestID : args.requestID,
									displayMessages : "Retry scenario failed"		
								};
							
							throw {
								errorCode: 140,
								message: "Original call and retry failed",
								responseObject: responseToClient
							};
						}
						else 
						{ 
							_requests[args.requestID].retryScenario = true;
							_requests[args.requestID].serviceRequest.unifiedMessage.secureToken = responseObject.secureToken;          
							
							_processRequest(_requests[args.requestID].serviceRequest, args.requestID);
							return;
						}
					}
				} else { 
					// if not JSON response we assume it is binary and pass it back to the consumer
					var responseConfig = {};
					responseConfig.requestID = args.requestID;
					responseConfig.contentType = contentType;
					
					if (o) {
						// Need to check for "unknown" because IE doesn't support
						// binary data images. It doesn't send the responseText
						// attribute. Instead responseBody which is not accessible
						// from JavaScript. This Client doesn't support binary data
						// for images in IE
						if(typeof(o.responseText) !== "unknown"){
							responseConfig.responseText = o.responseText;
						}
					}
					_createSuccessResponse(responseConfig);
				}
			} catch (e) {
				_createFailureResponse(e.errorCode, e.message, e.responseObject);
				return;
			}
		};
			
		/**
		 * @private
		 * @description Process a failure response from the Service IO call 
		 * @param id IO call ID
		 * @param o service response object
		 * @param args arguments from the IO call
		 * 
		 */	
		var _processFailureResponse = function (id, o, args) {
		
			o.requestID = args.requestID;
			_createFailureResponse("160", "IO Call failed", o);
		};
		
		/**
		 * @private
		 * @description Create a UsaaServiceResponse that contains the error indicating
		 * that an error occurred during the request process flow and fires an event
		 * to communicate with the user 
		 * @event ClientManager_+requestID+:failure
		 * @param errorCode from the request failure
		 * @param message error message
		 * @param responseObject response object from the service
		 */
		var _createFailureResponse = function (errorCode, message, responseObject) {
			 
			var requestID = "";
			 
			var responseConfig = {};
			
			if (responseObject) {
				responseConfig.responseObject = responseObject;
				requestID = responseObject.requestID;
				if (requestID === undefined)
				{ 
					var response1 = responseObject.usaaServiceResponses[0];
					requestID = response1.requestID;
				}
			}
			
			var response = new Y.USAA.ent.services_client.UsaaServiceResponse(responseConfig);
			response.clientErrorCode = errorCode;
			response.clientMessage = message; 
			
			delete response.secureToken;
			Y.fire('ClientManager_' + requestID + ':failure', response);
		};
		
		/** 
		 * @private
		 * @description fire an event to pass the success response to the consumer
		 * @event ClientManager_+requestID+:success
		 * @param response 	The response object from the service
		 * 
		 */		 
		var _createSuccessResponse = function (response) {

			var requestID = response.requestID;
			if (requestID === undefined)
			{ 
				var response1 = response.usaaServiceResponses[0];
				requestID = response1.requestID;
			}
			response.secureToken = null;
			delete response.secureToken;
			Y.fire('ClientManager_' + requestID + ':success', response);
		};
		
		/** ------------------  Public members ------------------------------ */
		return {
			invokeService : _invokeService,
			invokeAggregatedServiceCall : _invokeAggregatedServiceCall
		};
	};
}, '1.0', {requires: ['yui', 'event-custom', 'UsaaServiceClientUtilities', 'UsaaServiceResponse']});	