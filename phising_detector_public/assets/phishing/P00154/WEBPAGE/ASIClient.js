/*
**********************************************************************
* Copyright 2013
* United Services Automobile Association
* All Rights Reserved
*
* File: javascript/ec/utilities/ASIClient.js
**********************************************************************
* Target   Chg Date  Name             Description
* ======== ========  =============    ================================
* 03/29/2013 3/1/2013  Aniruddh    	initial	creation
* 01/22/2016 01/12/2016 Elahee		Define the USAA Namespace if it is not defined, unsure what causes this
**********************************************************************
*/


/** 
 * @fileOverview ASIClient.js
 * @author Aniruddh M
 * @version 1.0
 * @requires ent_core.js
 * @requires ent/thirdparty/yui/yui3_5/yui/yui.js
 * @requires ent/services_client/UsaaServiceClientUtilities.js
 * @requires ent/services_client/UsaaServiceClientManager.js
 * @requires ent/services_client/UnifiedMessage.js
 * @requires ent/services_client/UsaaServiceRequest.js
 * @requires ent/services_client/UsaaServiceResponse.js
 * @requires ent/services_client/Md5Util.js
 */

if (typeof(USAA) === 'undefined') {

	    //if the USAA object is not defined, assume there's nothing further down the line
	    var 
	        USAA = {
	            ec : {}
	        }

	//the USAA object is available; do we have anything enterprised?
	} else if (typeof(USAA.ec) === 'undefined') {
	    USAA.ec = {}

	//the entrprised is available; do we have any utilities?
	}
	if (typeof(USAA.ec.util) === 'undefined') {
	    USAA.ec.util = {}
	}
	
	//if namespace is not available, define it
	if (typeof(USAA.namespace) === 'undefined')
    {
            /**
             *
             * @method namespace
             * @param  {String*} arguments 1-n namespaces to create
             * @return {Object}  A reference to the last namespace object created
             * @description Returns the namespace specified and creates it if it doesn't exist
             */
            USAA.namespace = function() 
            {
                var a = arguments,
                    o = null,
                    i = 0,
                    j = 0,
                    tok = null;
                for (i=0; i<a.length; i=i+1)
                {
                    tok=a[i].split(".");
                    o=USAA;

                    for (j=(tok[0] == "USAA") ? 1 : 0; j<tok.length; j=j+1)
                    {
                        o[tok[j]]=o[tok[j]] || {};
                        o=o[tok[j]];
                    }
                }
                return o;
            };
    }


USAA.namespace('ec.util.ASIClient');


USAA.ec.util.ASIClient.processRequest = function (delegate, reqID, serviceUrl, opName, reqParams, logParams){

	YUI().use("UsaaServiceClientUtilities", "UsaaServiceClientManager", "UnifiedMessage", "UsaaServiceRequest","node", function (Y) {
	var _clientManager = new Y.USAA.ent.services_client.UsaaServiceClientManager();
	 var usaaServiceDelegate = delegate;
	
	// populating the request object with field inputs
	var _serviceRequest = {
				appName: "",
				channel: "",
				device: "",
				headerVersion: "",
				loggingParameters: logParams || "",
				operationName: opName,
				operationVersion: "1",
				originHost: "",
				requestID: reqID,
				requestParameters: reqParams,
				secLevel: "",
				serviceURL: serviceUrl
	};
	Y.detach('ClientManager_'+reqID+':failure');
	Y.detach('ClientManager_'+reqID+':success');
		
	Y.on('ClientManager_' + reqID + ':success', function (response) {
		usaaServiceDelegate.onSuccessResponse(_serviceRequest, response);
	});
		
	Y.on('ClientManager_' + reqID + ':failure', function (response) {
		usaaServiceDelegate.onFailureResponse(_serviceRequest, response);

	});
	
	// call the manager
	_clientManager.invokeService(_serviceRequest);
	});
}