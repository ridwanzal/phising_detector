/*Copyright (c) 2012 United Services Automobile Association All Rights Reserved clientEventLogging.js*/
USAA.namespace("USAA.ent.util.ClientEventLogging");var currentDomain=location.hostname;var objectIdCEL=null;var eventIdCEL=null;function setObjectId(A){objectIdCEL=escape(A)}function setEventId(A){eventIdCEL=escape(A)}function getFilename(C){var A="/";if(C.match(/\\/)){A="\\"}var B=C.substring(C.lastIndexOf(A)+1,C.length);return B}function logPageEvent(){var D=escape(getFilename(document.URL));var B=USAA.ent.util.ClientEventLogging.eventLoggingURL;var C=B+"?HTTP_HOST="+currentDomain+"&page_name="+D+"&object_id="+objectIdCEL+"&event_id="+eventIdCEL;var A=new Image();A.src=C}USAA.register("clientEventLogging");USAA.register("clientEventLogging-min");


