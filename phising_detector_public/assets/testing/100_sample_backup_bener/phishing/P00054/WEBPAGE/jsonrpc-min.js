escapeJSONChar=function escapeJSONChar(B){if(B=='"'||B=="\\"){return"\\"+B}else{if(B=="\b"){return"\\b"}else{if(B=="\f"){return"\\f"}else{if(B=="\n"){return"\\n"}else{if(B=="\r"){return"\\r"}else{if(B=="\t"){return"\\t"}}}}}}var A=B.charCodeAt(0).toString(16);if(A.length==1){return"\\u000"+A}else{if(A.length==2){return"\\u00"+A}else{if(A.length==3){return"\\u0"+A}else{return"\\u"+A}}}};escapeJSONString=function escapeJSONString(B){var C=B.split("");for(var A=0;A<C.length;A++){var D=C[A];if(D=='"'||D=="\\"||D.charCodeAt(0)<32||D.charCodeAt(0)>=128){C[A]=escapeJSONChar(C[A])}}return'"'+C.join("")+'"'};toJSON=function toJSON(C){if(C==null){return"null"}else{if(C.constructor==String){return escapeJSONString(C)}else{if(C.constructor==Number){return C.toString()}else{if(C.constructor==Boolean){return C.toString()}else{if(C.constructor==Date){return'{javaClass: "java.util.Date", time: '+C.valueOf()+"}"}else{if(C.constructor==Array){var A=[];for(var B=0;B<C.length;B++){A.push(toJSON(C[B]))}return"["+A.join(", ")+"]"}else{var A=[];for(attr in C){if(C[attr]==null){A.push('"'+attr+'": null')}else{if(typeof C[attr]=="function"){}else{A.push(escapeJSONString(attr)+": "+toJSON(C[attr]))}}}return"{"+A.join(", ")+"}"}}}}}}};JSONRpcClient=function JSONRpcClient_ctor(B,C){this.serverURL=B;if(C){this._addMethods(C)}else{if(this.objectID){this._addMethods(["listMethods"]);var D=this._makeRequest("listMethods",[])}else{this._addMethods(["system.listMethods"]);var D=this._makeRequest("system.listMethods",[])}var A=this._sendRequest(D);this._addMethods(A)}};JSONRpcClient.Exception=function JSONRpcClient_Exception_ctor(E,D,C){this.code=E;var B;if(C){this.javaStack=C;var A=C.match(/^([^:]*)/);if(A){B=A[0]}}if(B){this.name=B}else{this.name="JSONRpcClientException"}this.message=D};JSONRpcClient.Exception.CODE_REMOTE_EXCEPTION=490;JSONRpcClient.Exception.CODE_ERR_CLIENT=550;JSONRpcClient.Exception.CODE_ERR_PARSE=590;JSONRpcClient.Exception.CODE_ERR_NOMETHOD=591;JSONRpcClient.Exception.CODE_ERR_UNMARSHALL=592;JSONRpcClient.Exception.CODE_ERR_MARSHALL=593;JSONRpcClient.Exception.prototype=new Error();JSONRpcClient.Exception.prototype.toString=function JSONRpcClient_Exception_toString(A,B){return this.name+": "+this.message};JSONRpcClient.default_ex_handler=function JSONRpcClient_default_ex_handler(A){};JSONRpcClient.toplevel_ex_handler=JSONRpcClient.default_ex_handler;JSONRpcClient.profile_async=false;JSONRpcClient.max_req_active=1;JSONRpcClient.requestId=1;JSONRpcClient.prototype._createMethod=function JSONRpcClient_createMethod(A){var B=function(){var C=[];var F=null;for(var D=0;D<arguments.length;D++){C.push(arguments[D])}if(typeof C[0]=="function"){F=C.shift()}var E=B.client._makeRequest.call(B.client,B.methodName,C,F);if(F==null){return B.client._sendRequest.call(B.client,E)}else{JSONRpcClient.async_requests.push(E);JSONRpcClient.kick_async();return E.requestId}};B.client=this;B.methodName=A;return B};JSONRpcClient.prototype._addMethods=function JSONRpcClient_addMethods(C){for(var B=0;B<C.length;B++){var E=this;var D=C[B].split(".");for(var G=0;G<D.length-1;G++){var A=D[G];if(E[A]){E=E[A]}else{E[A]=new Object();E=E[A]}}var A=D[D.length-1];if(!E[A]){var F=this._createMethod(C[B]);E[A]=F}}};JSONRpcClient._getCharsetFromHeaders=function JSONRpcClient_getCharsetFromHeaders(A){try{var E=A.getResponseHeader("Content-type");var D=E.split(/\s*;\s*/);for(var B=0;B<D.length;B++){if(D[B].substring(0,8)=="charset="){return D[B].substring(8,D[B].length)}}}catch(C){}return"UTF-8"};JSONRpcClient.async_requests=[];JSONRpcClient.async_inflight={};JSONRpcClient.async_responses=[];JSONRpcClient.async_timeout=null;JSONRpcClient.num_req_active=0;JSONRpcClient._async_handler=function JSONRpcClient_async_handler(){JSONRpcClient.async_timeout=null;while(JSONRpcClient.async_responses.length>0){var A=JSONRpcClient.async_responses.shift();if(A.canceled){continue}if(A.profile){A.profile.dispatch=new Date()}try{A.cb(A.result,A.ex,A.profile)}catch(C){JSONRpcClient.toplevel_ex_handler(C)}}while(JSONRpcClient.async_requests.length>0&&JSONRpcClient.num_req_active<JSONRpcClient.max_req_active){var B=JSONRpcClient.async_requests.shift();if(B.canceled){continue}B.client._sendRequest.call(B.client,B)}};JSONRpcClient.kick_async=function JSONRpcClient_kick_async(){if(JSONRpcClient.async_timeout==null){JSONRpcClient.async_timeout=setTimeout(JSONRpcClient._async_handler,0)}};JSONRpcClient.cancelRequest=function JSONRpcClient_cancelRequest(B){if(JSONRpcClient.async_inflight[B]){JSONRpcClient.async_inflight[B].canceled=true;return true}for(var A in JSONRpcClient.async_requests){if(JSONRpcClient.async_requests[A].requestId==B){JSONRpcClient.async_requests[A].canceled=true;return true}}for(var A in JSONRpcClient.async_responses){if(JSONRpcClient.async_responses[A].requestId==B){JSONRpcClient.async_responses[A].canceled=true;return true}}return false};JSONRpcClient.prototype._makeRequest=function JSONRpcClient_makeRequest(B,C,A){var D={};D.client=this;D.requestId=JSONRpcClient.requestId++;var E={};E.id=D.requestId;if(this.objectID){E.method=".obj#"+this.objectID+"."+B}else{E.method=B}E.params=C;if(A){D.cb=A}if(JSONRpcClient.profile_async){D.profile={submit:new Date()}}D.data=toJSON(E);return D};JSONRpcClient.prototype._sendRequest=function JSONRpcClient_sendRequest(D){if(D.profile){D.profile.start=new Date()}var C=JSONRpcClient.poolGetHTTPRequest();JSONRpcClient.num_req_active++;if(typeof (this.user)=="undefined"){C.open("POST",this.serverURL,(D.cb!=null))}else{C.open("POST",this.serverURL,(D.cb!=null),this.user,this.pass)}try{C.setRequestHeader("Content-type","text/plain")}catch(E){}if((typeof USAA!=="undefined")&&(typeof USAA.ent!=="undefined")&&(typeof USAA.ent.digitalData!=="undefined")&&(typeof USAA.ent.digitalData.csrfToken!=="undefined")){var A=USAA.ent.digitalData.csrfToken;C.setRequestHeader("X-CSRF-Token",A)}if(D.cb){var B=this;C.onreadystatechange=function(){if(C.readyState==4){var F={cb:D.cb,result:null,ex:null};if(D.profile){F.profile=D.profile;F.profile.end=new Date()}try{F.result=B._handleResponse(C)}catch(G){F.ex=G}if(!JSONRpcClient.async_inflight[D.requestId].canceled){JSONRpcClient.async_responses.push(F)}delete JSONRpcClient.async_inflight[D.requestId];JSONRpcClient.kick_async()}}}else{C.onreadystatechange=function(){}}JSONRpcClient.async_inflight[D.requestId]=D;try{C.send(D.data)}catch(E){JSONRpcClient.poolReturnHTTPRequest(C);JSONRpcClient.num_req_active--;throw new JSONRpcClient.Exception(JSONRpcClient.Exception.CODE_ERR_CLIENT,"Connection failed")}if(!D.cb){return this._handleResponse(C)}};JSONRpcClient.prototype._handleResponse=function JSONRpcClient_handleResponse(http){if(!this.charset){this.charset=JSONRpcClient._getCharsetFromHeaders(http)}var status,statusText,data;try{status=http.status;statusText=http.statusText;data=http.responseText;if(data!=null){if(data.substr(0,2)=="/*"){data=data.substring(2,data.length-2)}}}catch(e){JSONRpcClient.poolReturnHTTPRequest(http);JSONRpcClient.num_req_active--;JSONRpcClient.kick_async();throw new JSONRpcClient.Exception(JSONRpcClient.Exception.CODE_ERR_CLIENT,"Connection failed")}JSONRpcClient.poolReturnHTTPRequest(http);JSONRpcClient.num_req_active--;if(status!=200){throw new JSONRpcClient.Exception(status,statusText)}var obj;try{eval("obj = "+data)}catch(e){throw new JSONRpcClient.Exception(550,"error parsing result")}if(obj.error){throw new JSONRpcClient.Exception(obj.error.code,obj.error.msg,obj.error.trace)}var res=obj.result;if(res&&res.objectID&&res.JSONRPCType=="CallableReference"){return new JSONRpcClient(this.serverURL,this.user,this.pass,res.objectID)}return res};JSONRpcClient.http_spare=[];JSONRpcClient.http_max_spare=8;JSONRpcClient.poolGetHTTPRequest=function JSONRpcClient_pool_getHTTPRequest(){if(JSONRpcClient.http_spare.length>0){return JSONRpcClient.http_spare.pop()}return JSONRpcClient.getHTTPRequest()};JSONRpcClient.poolReturnHTTPRequest=function JSONRpcClient_poolReturnHTTPRequest(A){if(JSONRpcClient.http_spare.length>=JSONRpcClient.http_max_spare){delete A}else{JSONRpcClient.http_spare.push(A)}};JSONRpcClient.msxmlNames=["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];JSONRpcClient.getHTTPRequest=function JSONRpcClient_getHTTPRequest(){try{JSONRpcClient.httpObjectName="XMLHttpRequest";return new XMLHttpRequest()}catch(B){}for(var A=0;A<JSONRpcClient.msxmlNames.length;A++){try{JSONRpcClient.httpObjectName=JSONRpcClient.msxmlNames[A];return new ActiveXObject(JSONRpcClient.msxmlNames[A])}catch(B){}}JSONRpcClient.httpObjectName=null;throw new JSONRpcClient.Exception(0,"Can't create XMLHttpRequest object")};USAA.register("jsonrpc");USAA.register("jsonrpc-min");