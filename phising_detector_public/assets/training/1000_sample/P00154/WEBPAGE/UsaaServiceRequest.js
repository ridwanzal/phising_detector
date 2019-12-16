/*!Copyright (c) 2012 United Services Automobile Association All Rights Reserved UsaaServiceRequest.js*/
/**********************************************************************************************
* Copyright 2011
* United Services Automobile Association
* All Rights Reserved
*
* File: ent/services_client/UsaaServiceRequest.js
**********************************************************************************************
* Target   		Chg Date  	Name                        Description
* ======== 		========  	=============               ======================================
* July 11       05/26/2011  D. Videtta, F. Braun        Initial Creation			    			                  			
**********************************************************************************************/

/** 
 * @fileOverview JavaScript Service request in the Adaptive Services Infrastructure framework 
 * @author D. Videtta, F. Braun
 * @version 1.0
 * @requires yui
 */

YUI.add('UsaaServiceRequest', function (Y) {
	
	Y.namespace('USAA.ent.services_client');
	
	/**
	 * Creates a new UsaaServiceRequest
	 * @class contains the attributes of a Usaa Service Request
	 * @namespace
	 * @param 	config information 
	 * 		required properties:
	 * 			serviceURL				
	 * 			operationName
	 * 			operationVersion
	 * 			unifiedMessage
	 * 			requestID
	 * 		optional properties:
	 * 			securityLevel
	 * 			loggingParameters
	 * 			requestParameters
	 */
	Y.USAA.ent.services_client.UsaaServiceRequest = function (config) {
	
		/** ------------------  Private members ------------------------------ */
		
		/**
		 * @public 
		 * @description URL for the service to be called - required, passed in by the consumer
		 * @name serviceURL
		 * @type string
		 */
		var _serviceURL = config.serviceURL || null; 		
		
		/**
		 * @public 
		 * @description Operation security level
		 * @name securityLevel
		 * @type number
		 */
		var _securityLevel = config.securityLevel || -1; 			
		
		/**
		 * @public 
		 * @description Operation that the service will perform - required, passed in by the consumer
		 * @name operationName
		 * @type string
		 */
		var _operationName = config.operationName || null; 			
		
		/**
		 * @public 
		 * @description Version of the operation - required, passed in by the consumer
		 * @name operationVersion
		 * @type number
		 */
		var _operationVersion = config.operationVersion || 1; 	
		
		/**
		 * @public 
		 * @description Header information for the request - required, passed in (built by the client based on consumer input)
		 * @name unifiedMessage
		 * @type UnifiedMessage
		 */
		var _unifiedMessage = config.unifiedMessage || null;  
		
		/**
		 * @public 
		 * @description Logging parameters - optional from the consumer
		 * @name loggingParameters
		 * @type Object
		 */
		var _loggingParameters = config.loggingParameters || null;
		
		/**
		 * @public 
		 * @description Request parameters for the service - optional from the consumer
		 * @name requestParameters
		 * @type Object
		 */
		var _requestParameters = config.requestParameters || null;	
		
		/**
		 * @public 
		 * @description Request ID - required, passed in by the consumer
		 * @name requestID
		 * @type string
		 */
		var _requestID = config.requestID; 	
		
		/** ------------------  Public members ------------------------------ */
		return {
			serviceURL : _serviceURL,
			securityLevel : _securityLevel,
			operationName: _operationName,
			operationVersion: _operationVersion,
			unifiedMessage: _unifiedMessage,
			loggingParameters: _loggingParameters,
			requestParameters: _requestParameters,
			requestID: _requestID
			
		}; 
	};
}, '1.0', {requires: ['yui']});	