
var EPCM={
OTHER : 0,
MSIE : 1,
NETSCAPE: 2,
MOZILLA : 21,
OPERA : 3,
NOKIA : 4,
UP : 5,
ERICSSON: 6,
MSPIE : 7,
PALM : 8,
OTHER_PLATFORM : 0,
NT_PLATFORM : 1,
WIN_PLATFORM : 2,
MAC_PLATFORM : 3,
LINUX_PLATFORM : 4,
WAP_PLATFORM : 5,
PDA_PLATFORM : 6,
_private:{
id: "EPCM",
envRef: window,
version: null,
level: null,
instanceId: null,
uaType: null,
uaVersion: null,
uaPlatform: null,
domainFull: document.domain,
isDynamicTop: false,
refDynamicTop: null,
compList: null,
dbgException: false,
implDB :null,
implDSM :null,
dirty: false,
uipmode: null,
uipWinFeatures: null,
uipPortalPath: null,
uipPopupComp : null,
uipPopupCompSize : null,
uipPopupMsgNN: null,
uipPopupMsgND: null}
}
EPCM.init=function( cfg ){
var priv=this._private;
if( priv.version != null)return;
if (cfg.Level>=2 && (!navigator.javaEnabled())){
cfg.Level=1;}

priv.version=cfg.Version;
priv.level=cfg.Level;
if(cfg.InstanceId==null){
priv.instanceId="Gx" + (new Date()).getTime()
+ "x" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10)
+ "x" + window.name.replace(/[^A-Za-z0-9]/g,"");} else{
priv.instanceId=cfg.InstanceId;}
priv.uaType=cfg.UAType;
priv.uaVersion=cfg.UAVersion;
priv.uaPlatform=cfg.UAPlatform;
priv.compList=new Array();
priv.implDB=(cfg.Level<2) ? this.DB1 : this.DB2;
EPCM.subscribeEvent("urn:com.sapportals.portal:user","logoff",EPCM._private.clearClientDataBag );
if(document.domain == EPCM.getRelaxedDomain()){
var WID=this.getUniqueWindowId();}

priv.isDynamicTop=cfg.DynamicTop;
this.calculateDynamicTop();
priv.uipmode=cfg.UIPMode;
priv.uipWinFeatures=cfg.UIPWinFeatures;
priv.uipPortalPath=cfg.UIPPortalPath;
priv.uipPopupComp=cfg.UIPPopupComp;
priv.uipPopupCompSize=cfg.UIPPopupCompSize;
priv.uipPopupMsgNN=cfg.UIPPopupMsgNN;
priv.uipPopupMsgND=cfg.UIPPopupMsgND;
priv.dbgException=cfg.DBGException}
EPCM.getUAType=function(){
return this._private.uaType;}
EPCM.getUAVersion=function(){
return this._private.uaVersion;}
EPCM.getUAPlatform=function(){
return this._private.uaPlatform;}
EPCM.getVersion=function(){
return this._private.version;}
EPCM.getLevel=function(){
return this._private.level;}
EPCM.getInstanceId=function(){
return this._private.instanceId;}
EPCM.getUniqueWindowId=function(){
var wid=null;
try{
wid=this.getSAPTop().name;
var rewrite=true;
if( wid != null && typeof(wid) == "string" ){
if (wid.indexOf("WID") == 0) rewrite=false;
if (wid.indexOf("DefaultExternal") == 0) rewrite=false;}
if(rewrite){
this.getSAPTop().name="WID"+(new Date()).getTime();}
return this.getSAPTop().name;
}catch (ex){
return null;}
}
EPCM.getSAPTop=function(){
return (this._private.isDynamicTop) ? this._private.refDynamicTop : top;}
EPCM.calculateDynamicTop=function(){
var priv=EPCM._private;
priv.refDynamicTop=window;
var testedFrame=window;
try{
while( testedFrame !=top && testedFrame.parent !=null ){
try{
if( testedFrame.parent.EPCM != null ){
priv.refDynamicTop=testedFrame.parent;}
} catch(ex1){}
testedFrame=testedFrame.parent;}
} catch(ex2){}}
EPCM.trace=function(cat,msg,paramset){}

EPCM.jstrace=function(location,funcName,msg){}
EPCM.relaxDocumentDomain=function(){
var newDomain=this.getRelaxedDomain();
if( newDomain != document.domain ){
document.domain=newDomain;}
this.calculateDynamicTop();}
EPCM.getNotRelaxedDomain=function(){
return this._private.domainFull;}
EPCM.getRelaxedDomain=function(){
return this.getRelaxed(this._private.domainFull);}
EPCM.getRelaxed=function( input ){
if (input.search(/^\d+\.\d+\.\d+\.\d+$/) >=0 ){
return input;}
var lnDotPos=input.indexOf( "." );
return (lnDotPos >= 0) ? input.substr( lnDotPos + 1): input;}
EPCM.setDirty=function(val ){
this._private.dirty=( val == true );}
EPCM.getDirty=function( ){
return this._private.dirty;}
EPCM.isWorkProtectDirtyInquiry=function(){
return true;}
EPCM.getGlobalDirty=function( ){
var result=false;
switch(this._private.uipmode){
case "0":
case "1":
case "3":
var laEPCM=this._private.getAdjacentEPCM();
for (var idx=0; idx < laEPCM.length && !result; idx++){
result=result || laEPCM[idx].getDirty();}
var retArray=EPCM.raiseEvent("urn:com.sapportals.portal:workprotect", "inquiryProtection", null, null, true);
for (var i=0; i< retArray.length && !result; i++){
if( typeof retArray[i] == "boolean"){
result=result || retArray[i];}
}
return result;
case "2":
default :
return false;}
return result;}
EPCM.popupOnUnsavedData=function (opt){
switch(this._private.uipmode){
case "3":
var optstring="";
if(opt != null){
if(opt.indexOf("NEWWIN") >=0) optstring += "N";
if(opt.indexOf("DESKTOP")>=0) optstring += "D";
optstring += "C";
if(optstring == "" || optstring.length<2) optstring="NDC";}
var retVal;
if(EPCM.getUAType() == EPCM.MSIE || window.showModalDialog ){
var uipUrl=this._private.uipPopupComp + "?optstring=" + optstring;
retVal="" + window.showModalDialog( uipUrl, null, this._private.uipPopupCompSize );
switch(retVal){
case "NEWWIN": return "NEWWIN";
case "DESKTOP": return "DESKTOP";
default : return "CANCEL";}
} else{
if(optstring.indexOf("D") >= 0){
retVal=confirm(this._private.uipPopupMsgND);
return (retVal) ? "DESKTOP" : "CANCEL";
}else{
retVal=confirm(this._private.uipPopupMsgNN);
return (retVal) ? "NEWWIN" : "CANCEL";}
}
case "1": return "NEWWIN";
case "2": return "DESKTOP";
case "0": return "DESKTOP";
default : return "DESKTOP";}
}
EPCM.SHOW_INPLACE=0;
EPCM.SHOW_EXTERNAL=1;
EPCM.SHOW_EXTERNAL_PORTAL=2;
EPCM.SHOW_EXTERNAL_HEADERLESS=3;
EPCM.SHOW_INPLACE_UNCHANGED_FRAMEWORK=5;
EPCM.doNavigate=function( target, mode, winfeatures, winname, history,targetTitle, context,postBody){
try{
if(window.external!=null && window.external.lsapi!=null){
return window.external.lsapi.doNavigateEPCM(target, mode, winfeatures, winname, history,targetTitle, context,postBody);}
}catch(ex){}
var isSubscribed=this.isSubscribed("urn:com.sapportals:navigation","Navigate" );
var openNewWin=false;
var open_new_from_workprotect=false;
if (mode == null || mode == 0){
if(this._private.uipmode == "3"){
if(EPCM.getGlobalDirty() ){
switch( EPCM.popupOnUnsavedData() ){
case "NEWWIN": openNewWin=true; mode=2; break;
case "DESKTOP": openNewWin=false; break;
case "CANCEL": return true;
default: return false;}

open_new_from_workprotect=openNewWin;}
} else{
openNewWin=EPCM.getGlobalDirty() || (! isSubscribed);
open_new_from_workprotect=openNewWin;
mode=2;}
} else{
openNewWin=true;}

if(targetTitle != null && targetTitle != ""){
targetTitle=encodeURIComponent(targetTitle);}
var windowId=EPCM.getUniqueWindowId();
if(openNewWin){
if (mode == null) mode=2;
if (winfeatures == null) winfeatures=EPCM._private.uipWinFeatures;
if (winname == null) winname="";
if (isSubscribed){
EPCM.raiseEvent("urn:com.sapportals:navigation", "Navigate",{
target: target,
mode:mode,
winname: winname,
winfeatures: winfeatures,
context: context,
windowId: windowId,
postBody: postBody,
targetTitle: targetTitle,
open_new_from_workprotect: open_new_from_workprotect} );
return false;
}else{
var qpos=target.indexOf("?");
var targetQuery="?NavigationTarget="
if(qpos < 1 ){
targetQuery += encodeTargetWithParameters(target);
}else{
targetQuery += escape(target.substring(0,qpos)) + "&" + target.substr(qpos+1);}
if (context != undefined && context != null){
var umpPos=context.indexOf("&");
if( umpPos > 0)targetQuery += "&NavigationContext=" + escape(context.substring(0,umpPos));
else
targetQuery += "&NavigationContext=" + escape(context);}
window.open( EPCM._private.uipPortalPath + targetQuery, winname, winfeatures);
return false;}
} else{
var historyModeParam="";
if(history && history != null && history != ""){
historyModeParam="&HistoryMode=" + history;}
var targetTitleParam="";
if(targetTitle && targetTitle != null && targetTitle != ""){
targetTitleParam="&TarTitle="+targetTitle;}
var contextParam="";
if(context && context != null && context != ""){
contextParam="&NavigationContext="+context;}
var windowIdQuery="";
if (windowId && windowId != null && windowId != ""){
windowIdQuery += "&windowId=" + windowId;}
var finalTarget=target + historyModeParam + targetTitleParam + contextParam + windowIdQuery;
var separ=finalTarget.indexOf("?");
var separ2=finalTarget.indexOf("&");
if(separ2 != -1 && separ == -1){
finalTarget=finalTarget.substr(0,separ2) + "?" + finalTarget.substr(separ2+1);}
EPCM.raiseEvent('urn:com.sapportals:navigation','Navigate', {target:finalTarget, postBody:postBody, Type:"InPlace"});
return false;}
}
function encodeTargetWithParameters( target){
var targetQuery="";
umpPos=target.indexOf("&");
if( umpPos > 0){
var parameters=target.split('&');
targetQuery += escape(parameters[0]);
for(i=1;i < parameters.length;i++){
var eqPos=parameters[i].indexOf("=");
if(eqPos > 0)
targetQuery += "&" + escape(parameters[i].substring(0,eqPos)) + "=" + escape(parameters[i].substr(eqPos+1));}
}
else
targetQuery += escape(target);
return targetQuery;}
EPCM.doRelativeNavigate=function( basenodename, levelsup, pathnameslist, mode, winfeatures, winname, history, addParams, targetTitle, context,postBody){
if (postBody !== undefined && postBody != null && ((typeof postBody)== "string") && postBody==""){
postBody=[];}
try{
if(window.external!=null && window.external.lsapi!=null){
return window.external.lsapi.doRelativeNavigateEPCM(basenodename, levelsup, pathnameslist, mode, winfeatures, winname, history, addParams, targetTitle, context, postBody);}
}catch(ex){}
if(! basenodename || basenodename == null || basenodename == ""){
try{
basenodename=this.getSAPTop().gHistoryFrameworkObj.GetActiveTrackingEntryValue().URL;}
catch(e){}}
var isSubscribed=this.isSubscribed("urn:com.sapportals:navigation","RelativeNavigate" );
var openNewWin=false;
if (mode == null || mode == 0){
if(this._private.uipmode == "3"){
if(EPCM.getGlobalDirty() ){
switch( EPCM.popupOnUnsavedData() ){
case "NEWWIN": openNewWin=true; break;
case "DESKTOP": openNewWin=false; break;
default: return false;}
}}
else{
openNewWin=EPCM.getGlobalDirty() || (! isSubscribed);}
} else{
openNewWin=true;}

if(targetTitle != null && targetTitle != ""){
targetTitle=encodeURIComponent(targetTitle);}
var windowId=EPCM.getUniqueWindowId();
if(openNewWin){
if (mode == null) mode=2;
if (winfeatures == null) winfeatures=EPCM._private.uipWinFeatures;
if (winname == null) winname="";
if (context == null) context="";
if (isSubscribed ){
EPCM.raiseEvent("urn:com.sapportals:navigation", "RelativeNavigate",{
basenodename: basenodename,
levelsup: levelsup,
pathnameslist: pathnameslist,
mode: mode,
winfeatures: winfeatures,
winname: winname,
windowId: windowId,
history: history,
addParams: addParams,
targetTitle: targetTitle,
context: context,
postBody: postBody} );
return false;
}else{
var targetQuery="";
if(basenodename != "undefined" && basenodename != null){
targetQuery += "?RelativeNavBase=" +escape(basenodename);}
else{
return false;}
if(levelsup != "undefined" && levelsup != null){
targetQuery += "&RelativeLevelsup=" + escape(levelsup);}
if(pathnameslist != "undefined" && pathnameslist != null){
targetQuery += "&RelativePathlist=" + escape(pathnameslist);}
if(context && context != null && context != ""){
targetQuery += "&NavigationContext="+context;}
targetQuery += "&windowId=" + windowId;
if(addParams != "undefined" && addParams != null){
targetQuery += "&" + escape(addParams);}
window.open( EPCM._private.uipPortalPath + targetQuery, winname, winfeatures);
return false;}
} else{
EPCM.raiseEvent("urn:com.sapportals:navigation", "RelativeNavigate",{
basenodename: basenodename,
levelsup: levelsup,
pathnameslist: pathnameslist,
mode: mode,
winfeatures: winfeatures,
winname: winname,
windowId:windowId,
history: history,
addParams: addParams,
targetTitle: targetTitle,
context: context,
postBody:postBody} );
return false;}
}
EPCM.doObjBasedNavigate=function( systemAlias, businessObjName, objValue, operation, postBody, resolvingMode){
try{
if(window.external!=null && window.external.lsapi!=null){
return window.external.lsapi.doObjBasedNavigateEPCM(systemAlias, businessObjName, objValue, operation, postBody, resolvingMode);}
}catch(ex){}
EPCM.raiseEvent('urn:com.sapportals:navigation','ObjBasedNavigate',{
systemAlias: systemAlias,
businessObjName: businessObjName,
objValue: objValue,
operation: operation,
postBody: postBody,
resolvingMode: resolvingMode} );}
EPCM._private.cookieParam=function( name, value ){
return (value != null)? name + "=" + value + ";": "";}
EPCM._private.setCookie=function(name, value, expires, path, domain, secure){
if((name != null) && (name != "")){
if (value == null) value="";
document.cookie=this.cookieParam( name, escape( value)) +
this.cookieParam( "expires", expires)+
this.cookieParam( "path", path)+
this.cookieParam( "domain", domain)+((secure == true)? "secure": "" );}
}
EPCM._private.getCookieArray=function(){
var laResult= new Array();
if (document.cookie != ""){
var laCookieList=document.cookie.split( "; " );
for (var i=0; i < laCookieList.length; i++){
var lsNameValue=laCookieList[i].split( "=" );
switch (lsNameValue.length){
case 1: laResult[unescape( lsNameValue[0] )]="";
break;
case 2: laResult[unescape( lsNameValue[0] )]=unescape( lsNameValue[1] );
break;
default: break;}
}}
return laResult;}
EPCM._private.getCookie=function(name){
var lsCookie=this.getCookieArray()[name];
if(lsCookie == "deleted")lsCookie=null;
return lsCookie;}
EPCM._private.deleteCookie=function( name, path, domain ){
var loPast=new Date();
loPast.setYear( 1971 );
this.setCookie( name, "deleted", loPast.toGMTString(), path, domain );}
EPCM.storeClientData=function(pUrn, pName, pValue){
EPCM._private.implDB.storeClientData(pUrn, pName, pValue);}
EPCM.loadClientData=function(pUrn, pName){
return EPCM._private.implDB.loadClientData(pUrn, pName);}
EPCM.deleteClientData=function(pUrn, pName){
EPCM._private.implDB.deleteClientData(pUrn, pName);}
EPCM._private.clearClientDataBag=function(){
EPCM._private.implDB.clearClientDataBag();}
EPCM._private.printClientDataBag=function(){
EPCM._private.implDB.printClientDataBag();}
EPCM.DB1=new Object;
EPCM.DB1.MCOOKIE_PREFIX="SAPPORTALSDB";
EPCM.DB1.MCOOKIE_PARTS=10;
EPCM.DB1.MCOOKIE_SPLIT=4000;
EPCM.DB1.MSG_TOTAL_LIMIT_EXCEEDED="Error: Client Databag (Total data limit exceeded)";
EPCM.DB1.MSG_LIMIT_EXCEEDED="Error: Client Databag (Single data limit exceeded)";
EPCM.DB1.MSG_WRONG_TYPE="Error: Client Databag (Unsupported data type)";
EPCM.DB1.getHashName=function(pUrn, pName){
return "" + pUrn + "&" + pName;}

EPCM.DB1.getMultiCookieDomain=function(){
return (document.domain.indexOf(".")<0) ? null : document.domain;}
EPCM.DB1.setMultiCookie=function(parts){
for(var i=0; i< this.MCOOKIE_PARTS; i++){
var lsName="" + this.MCOOKIE_PREFIX + i;
if (i < parts.length){
EPCM._private.setCookie(lsName, parts[i], null, "/", this.getMultiCookieDomain() );}
else{

EPCM._private.deleteCookie(lsName, "/", this.getMultiCookieDomain() );}
}
}
EPCM.DB1.getMultiCookie=function(){
var laCookies=EPCM._private.getCookieArray();
var lsResult="";
for(var i=0; i< this.MCOOKIE_PARTS; i++){
var lsName="" + this.MCOOKIE_PREFIX + i;
var lsCookie=laCookies[lsName];
if (lsCookie != null && lsCookie != "" && lsCookie !="deleted"){
var lsSepar=(lsResult.length>0)? "; " : "";
lsResult += lsSepar+lsCookie;}
}
return lsResult;}
EPCM.DB1.clearMultiCookie=function(){
for(var i=0; i< this.MCOOKIE_PARTS; i++){
var lsName="" + this.MCOOKIE_PREFIX + i;
EPCM._private.deleteCookie(lsName, "/", this.getMultiCookieDomain());}
}
EPCM.DB1.serializeData=function( dataList ){
var lsString="";
var lsSepar;
for( var key in dataList ){
lsSepar=(lsString.length >0)? "; " : "";
if (dataList[key]!=null){
lsString += lsSepar + escape(key) + "=" + escape(dataList[key])}
}
return lsString;}
EPCM.DB1.serializeDataParts=function( dataList ){
var lsSepar="; "
var lsSeparEsc=escape(lsSepar);
var laParts=new Array();
var laPartsEsc=new Array()
var lsElem;
var lsElemEsc;
var isDistributed;
for( var key in dataList ){
if(dataList[key]==null){
continue;}
lsElem=escape(key) + "=" + escape(dataList[key]);
lsElemEsc=escape(lsElem);
xlen=lsElemEsc.length;
isDistributed=false;
for(var i=0; i<laPartsEsc.length;i++){
if (( laPartsEsc[i].length + xlen)< this.MCOOKIE_SPLIT){
laParts[i] += ((laParts[i].length>0) ? lsSepar : "")+ lsElem;
laPartsEsc[i] += ((laPartsEsc[i].length>0) ? lsSeparEsc : "")+ lsElemEsc;
isDistributed=true;
break;}
}
if (! isDistributed){
if (xlen < this.MCOOKIE_SPLIT){
laParts[i]=lsElem;
laPartsEsc[i]=lsElemEsc;
}else{
alert(this.MSG_LIMIT_EXCEEDED);}
}}
if (laParts.length > this.MCOOKIE_PARTS){
alert(this.MSG_TOTAL_LIMIT_EXCEEDED);
laParts.length=this.MCOOKIE_PARTS;}
return laParts;}
EPCM.DB1.deserializeData=function( data ){
var laResult=new Array();
if(data!=null && data != ""){
var laDataList=data.split( "; " );
for (var i=0; i < laDataList.length; i++){
var lsNameValue=laDataList[i].split( "=" );
switch (lsNameValue.length){
case 1:
laResult[unescape( lsNameValue[0] )]="";
break;
case 2:
laResult[unescape( lsNameValue[0] )]=unescape( lsNameValue[1] );
break;
default:
break;}
}}
return laResult;}

EPCM.DB1.storeClientData=function(pUrn, pName, pValue){
var lsType=typeof pValue;
if (pValue != null){
if (lsType == "number" || lsType == "string" || lsType =="boolean"){
pValue="" + pValue;}
else{
alert(this.MSG_WRONG_TYPE);
return;}
}
var lsDatabag=this.getMultiCookie();
var loArray=this.deserializeData(lsDatabag);
var xName=this.getHashName(pUrn,pName);
loArray[xName]=pValue;
var lsDatabagParts=this.serializeDataParts(loArray);
this.setMultiCookie(lsDatabagParts);}
EPCM.DB1.loadClientData=function(pUrn, pName){
var lsDatabag=this.getMultiCookie();
var loArray=this.deserializeData(lsDatabag);
var xName=this.getHashName(pUrn,pName);
return loArray[xName];}
EPCM.DB1.deleteClientData=function(pUrn, pName){
this.storeClientData(pUrn,pName,null);}
EPCM.DB1.clearClientDataBag=function(){
this.clearMultiCookie();}
EPCM.DB1.printClientDataBag=function(){
var lsDatabag=this.getMultiCookie();
var loArray=this.deserializeData(lsDatabag);
var result="";
for(var key in loArray){
result += key + "=" + loArray[key] + "\n";}
alert("DataBag content:\n" + result)}
EPCM.DB2=new Object;
EPCM.DB2.storeClientData=function(pUrn, pName, pValue){
var loApplet=EPCM._private.getApplet();
var xUrn="" + pUrn;
var xName="" + pName;
if (pValue == null){
loApplet.getDataBag().removeObject(xUrn, xName);}
else{
var lsType=typeof pValue;
if (lsType == "number"){
loApplet.getDataBag().putNumber (xUrn, xName, pValue);}
else if (lsType == "string"){
loApplet.getDataBag().putString (xUrn, xName, pValue);}
else if (lsType == "boolean"){
loApplet.getDataBag().putBoolean(xUrn, xName, pValue);}
else{
loApplet.getDataBag().putObject (xUrn, xName, pValue);}
}}
EPCM.DB2.loadClientData=function(pUrn, pName){
var loApplet=EPCM._private.getApplet();
var xUrn="" + pUrn;
var xName="" + pName;
var lsType=loApplet.getDataBag().getObjectType(xUrn, xName);
var loResult=loApplet.getDataBag().getObject (xUrn, xName);
var Result=null;
if (lsType == "class java.lang.Double" ){
Result=parseFloat(loResult);}
else if (lsType == "class java.lang.Boolean"){
Result=loResult == "true";}
else if (lsType == "class java.lang.String"){
Result="" + loResult;}
else{
Result=loResult;}
return Result;}
EPCM.DB2.deleteClientData=function(pUrn, pName){
var loApplet=EPCM._private.getApplet();
var xUrn="" + pUrn;
var xName="" + pName;
loApplet.getDataBag().removeObject(xUrn, xName);}
EPCM.DB2.clearClientDataBag=function(){
var loApplet=EPCM._private.getApplet();
loApplet.getDataBag().removeAllObjects();}
EPCM.DB2.printClientDataBag=function(){
var loApplet=EPCM._private.getApplet();
loApplet.getDataBag().showContent(null);}
EPCM._private.getHTTP=function(pathURL, queryParam){
if(EPCM.getLevel()<2)return null;
var loApplet=this.getApplet();
var lsType=loApplet.getDataChannel().getHTTP(new String(pathURL), new String(queryParam));
return lsType;}
EPCM._private.postHTTP=function(pathURL, queryParam){
if(EPCM.getLevel()<2)return null;
var loApplet=this.getApplet();
var lsType=loApplet.getDataChannel().postHTTP(new String(pathURL), new String(queryParam));
return lsType;}
EPCM.EventObject=function(eventNamespace, eventName, dataObject, sourceId ){
this.eventNamespace=eventNamespace;
this.eventName=eventName;
this.dataObject=dataObject;
this.sourceId=sourceId;}
EPCM._private.getEvtId=function(ns,nm){
return ((ns != null) ? ns: "") + '&' + ((nm != null) ? nm : "");}
EPCM._private.ElidCounter=0;
EPCM._private.getUniqueELID=function(ekey,elid){
if( (elid != null) && ("string" == typeof elid) && (elid != ""))return elid;
this.ElidCounter++;
return "ELID:com.sap.portal.epcf.core:" + EPCM.getInstanceId() + "#" +this.ElidCounter;}
EPCM._private.getListenersForEvtId=function(evtId){
if (this.eList == null) this.eList=new Array();
if (this.eList[evtId] == null) this.eList[evtId]=new Array();
return this.eList[evtId];}
EPCM._private.EventListenerOnFunction=function(evtid, elid, fref){
this.evtid=evtid;
this.elid=EPCM._private.getUniqueELID(evtid,elid);
this.fref=fref;
this.call=function(data){try{return this.fref(data);}catch(e){return null;}}}
EPCM._private.EventListenerOnObjectMethod=function(evtid, elid, oref, mname){
this.evtid=evtid;
this.elid=EPCM._private.getUniqueELID(evtid,elid);
this.oref=oref;
this.method=mname;
this.call=function(data){try{return this.oref[this.method](data);}catch(e){return null;}}}
EPCM._private.EventListenerOnFrameMethod=function(evtid, elid, fname, mname){
this.evtid=evtid;
this.elid=EPCM._private.getUniqueELID(evtid,elid);
this.frame=fname
this.method=mname;
this.call=function(data) {try{return window.frames[this.frame][this.method](data);}catch(e){return null;}}}
EPCM._private.isDuplicityForFrameMethod=function(olist, fname, mname){
for(var i=0; i< olist.length; i++){
var xobj=olist[i];
if(xobj.frame != null && xobj.method != null
&& xobj.frame == fname && xobj.method == mname ){
return true}
}
return false;}
EPCM._private.ensureFrameName =function(fref){
if(fref.name==null || fref.name==""){
try{
var elems=fref.parent.document.getElementsByTagName("iframe");
for(var i=0; i< elems.length; i++){
if (elems[i].contentWindow == fref){
fref.name=elems[i].id;
break;}
}
}catch(ex){}
if (fref.name==null || fref.name==""){
fref.name= "sapEpcfEnsuredName_" + (new Date).getTime();}
}}
EPCM._private.createListener=function(laListener, lsEvtId, lsErrCtx, parA ,parB ,parC){
if((parA!= null) && ("function" == typeof parA)){
return new this.EventListenerOnFunction( lsEvtId, parB, parA );}
else if (( parA != null) && ("object" == typeof parA) && (parB !=null)){
for(var i=0; i<frames.length;i++){
if(parA == frames[i]){
this.ensureFrameName(frames[i]);
if (this.isDuplicityForFrameMethod(laListener, frames[i].name, parB )){
return null;
}else{
return new this.EventListenerOnFrameMethod(lsEvtId, parC, frames[i].name, parB);}
}}
return new this.EventListenerOnObjectMethod( lsEvtId, parC, parA, parB );}
else{
if (EPCM._private.dbgException){
if(confirm( "Creation of Event Listener for \"" + lsEvtId + "\"failed ,\n" +
"called from  \"" + lsErrCtx + "\"\n"+
"Throw exception to upper level ?")){
throw("EventListenerCreationFailed");}
}
return null;}
}
EPCM._private.eGlobHistory=new Array();
EPCM._private.eLocHistory=new Array();
EPCM._private.getEvtGlobTable=function(){
var topEPCM=this.getTopmostEPCM();
return topEPCM._private.eGlobHistory;}
EPCM._private.getEvtLocTable=function(){
return this.eLocHistory;}
EPCM._private.optimizeEvtGlobTable=function(){
var topEPCM=this.getTopmostEPCM();
var oldTab=topEPCM._private.eGlobHistory;
var newTab=new Array();
var activeKeys="";
var allEPCM=this.getAdjacentEPCM();
for (var i=0; i< allEPCM.length; i++){
activeKeys += allEPCM[i].getInstanceId() + ", ";}
for(var tabKey in oldTab){
if( activeKeys.indexOf(oldTab[tabKey]) >=0){
newTab[tabKey]=oldTab[tabKey];}
}
topEPCM._private.eGlobHistory=newTab;}
EPCM.subscribeEvent=function( nameSpace, eventName, parA, parB, parC ){
var _priv=this._private;
var evtid=_priv.getEvtId(nameSpace,eventName);
var listeners=_priv.getListenersForEvtId(evtid);
var ctx="EPCM.subscribeEvent";if (parA == undefined) parA=null;
if (parB == undefined) parB=null;
if (parC == undefined) parC=null;
var entry=_priv.createListener( listeners, evtid, ctx, parA ,parB ,parC);
if (entry == null) return null;
listeners[listeners.length]=entry;
return entry.elid;}
EPCM.subscribeEventReliable=function( nameSpace, eventName, parA, parB, parC){
var _priv=this._private;
var evtid=_priv.getEvtId(nameSpace,eventName);
var listeners=_priv.getListenersForEvtId(evtid);
var ctx="EPCM.subscribeEventReliable";
if (parA == undefined) parA=null;
if (parB == undefined) parB=null;
if (parC == undefined) parC=null;
var entry=_priv.createListener( listeners, evtid, ctx, parA ,parB ,parC);
if(entry == null) return null;
_priv.optimizeEvtGlobTable();
var decodeTab=new Array();
var allEPCM=_priv.getAdjacentEPCM();
for (var i=0; i< allEPCM.length; i++){
decodeTab[allEPCM[i].getInstanceId()]=allEPCM[i];}
var globTab=_priv.getEvtGlobTable();
var evtidPrefix=_priv.getEvtId(nameSpace,"");
for(var globTabKey in globTab){
if(eventName == "*"){
if (globTabKey.indexOf(evtidPrefix) != 0) continue;
}else{
if (globTabKey != evtid) continue;}
var senderEPCM=decodeTab[globTab[globTabKey]];
if (senderEPCM != null){
var locTabEntry=senderEPCM._private.getEvtLocTable()[globTabKey];
if (locTabEntry !=null){
var locEventObject=locTabEntry;
try{
entry.call( locEventObject );}
catch( e){
if (EPCM._private.dbgException){
if(confirm("Exception in EPCM.raiseEvent occured.\nThrow it to upper level ?")) throw(e);}
}}
}}
listeners[listeners.length]=entry;
return entry.elid;}
EPCM.unsubscribeEvent=function( nameSpace, eventName, elid ){
var _priv=this._private;
var evtid=_priv.getEvtId(nameSpace,eventName);
var oldList=_priv.eList[evtid];
if (oldList == null) return;
var newList=new Array();
for(var idx in oldList){
if(oldList[idx].elid != elid){
newList[newList.length]=oldList[idx];}
}
_priv.eList[evtid]=newList;
for(var idx in oldList){
oldList[idx]=null;}
oldList=null;}
EPCM.raiseEvent=function( nameSpace, eventName, dataObject, sourceId, returnResult){
var _priv=this._private;
var evtId=_priv.getEvtId(nameSpace,eventName);
var evtAll=_priv.getEvtId(nameSpace,"*");
var laEPCM=_priv.getAdjacentEPCM();
var loEvtObj=new EPCM.EventObject( nameSpace, eventName, dataObject, sourceId );
var laResult=null;
var lbCollect=(returnResult == true);
if (lbCollect){
laResult=new Array();}
for (var idx=0; idx < laEPCM.length; idx++){
if (laEPCM[idx]._private.eList == null) continue;
var laListener=laEPCM[idx]._private.eList[evtId];
if(laListener != null){
this.eventDistribute( laListener, loEvtObj, laResult );}
laListener=laEPCM[idx]._private.eList[evtAll];
if(laListener != null){
this.eventDistribute( laListener, loEvtObj, laResult );}
}
_priv.getEvtLocTable()[evtId]=new EPCM.EventObject( nameSpace, eventName, dataObject, sourceId );
_priv.getEvtGlobTable()[evtId]= this.getInstanceId();
if (lbCollect){
return laResult;}
else{
return;}
}
EPCM.raiseEventLocal=function( nameSpace, eventName, dataObject, sourceId, returnResult){
var _priv=this._private;
var evtId=_priv.getEvtId(nameSpace,eventName);
var evtAll=_priv.getEvtId(nameSpace,"*");
var leList=_priv.eList;
var loEvtObj=new EPCM.EventObject( nameSpace, eventName, dataObject, sourceId );
var laResult=null;
var lbCollect=(returnResult == true);
if (lbCollect){
laResult=new Array();}
if(leList!= null){
var laListener=leList[evtId];
if(laListener != null){
this.eventDistribute( laListener, loEvtObj, laResult );}
laListener=leList[evtAll];
if(laListener != null){
this.eventDistribute( laListener, loEvtObj, laResult );}
}
if (lbCollect){
return laResult;}
else{
return;}
}
EPCM.isSubscribed=function( nameSpace, eventName){
var _priv=this._private;
var evtId=_priv.getEvtId(nameSpace,eventName);
var evtAll=_priv.getEvtId(nameSpace,"*");
var laEPCM=_priv.getAdjacentEPCM();
var isSubscribed=false;
for (var idx=0; idx < laEPCM.length; idx++){
if (laEPCM[idx]._private.eList == null) continue;
if(laEPCM[idx]._private.eList[evtId] != null){
isSubscribed=true;
break;}
if(laEPCM[idx]._private.eList[evtAll] != null){
isSubscribed=true;
break;}
}
return isSubscribed;}
EPCM.eventDistribute=function( consumers, eventObject, resultArray){
var isRetValCollect=(resultArray != null);
var eListener
var retVal;
for (var idx in consumers){
eListener=consumers[idx];
retVal=null;
try{
retVal=eListener.call( eventObject );}
catch( e){
if (EPCM._private.dbgException){
if(confirm("Exception in EventDistribute occured.\nThrow it to upper level ?")) throw(e);}
}
if(isRetValCollect && retVal != null){
resultArray[resultArray.length++]=retVal;}
}
}
EPCM.DSM={
LOGOFF : "LOGOFF",
ABORT : "ABORT",
SUSPEND : "SUSPEND",
NAMESPACE_NOTIFY : "urn:com.sapportals.portal.dsm:Notification"}
EPCM.DSM.isLogoff=function(cmd){ return cmd == this.LOGOFF;}
EPCM.DSM.isAbort=function(cmd){ return cmd == this.ABORT;}
EPCM.DSM.isSuspend=function(cmd){ return cmd == this.SUSPEND;}
EPCM.DSM.isValidCmd=function(cmd){ return this.isLogoff(cmd) || this.isAbort(cmd) || this.isSuspend(cmd);}
EPCM.DSM.resolveCmd=function(c){
if (this.isValidCmd(c)) return c;
if (c == true) return this.LOGOFF;
return this.ABORT;}
EPCM.DSM.init=function( cfg ){
EPCM._private.implDSM=EPCM.DSM3;
EPCM.subscribeEvent("urn:com.sapportals.portal:browser","preunload",function(){ EPCM.DSM.terminateAll(EPCM.DSM.ABORT);} );
EPCM.subscribeEvent("urn:com.sapportals.portal:user", "logoff",function(){ EPCM.DSM.terminateAll(EPCM.DSM.LOGOFF);}
);
EPCM._private.implDSM.init( cfg );
EPCM._private.implDSM.uploadDebugFlags( cfg );
EPCM._private.implDSM.initDebugger();
EPCM.subscribeEvent(this.NAMESPACE_NOTIFY, "InitDebugger",function(){ EPCM.DSM.initDebugger();} );}
EPCM.DSM.uploadDebugFlags=function(cfg){
EPCM._private.implDSM.uploadDebugFlags(cfg);}
EPCM.DSM.initDebugger=function(){
EPCM._private.implDSM.initDebugger();}
EPCM.DSM.processSession=function( si,frameRef ){
EPCM._private.implDSM.log("Client: SessionInfo Received and Processed \r\n" + this.formatObject(si), true );
this.popupReceipt(si);
if(si.lastSessCmd=="USR_OPEN" || si.lastSessCmd == null || si.lastSessCmd == ""){
EPCM._private.implDSM.registerSession(si);
this.notifyMonitor(si);}
if(si.lastSessCmd=="SRV_ERROR" || si.lastSessCmd=="SRV_CLOSE"){
EPCM._private.implDSM.removeSessionByGUSID(si.GUSID)
this.notifyMonitor(si);
if(si.redirectURL!=null && si.redirectURL!="" ){
if(frameRef!=null && si.redirectURL.indexOf("!")>0 && si.redirectURL.indexOf("~")>0 ){
frameRef.location.href=si.redirectURL;}
else{
location.href=si.redirectURL;}
}}
}
EPCM.DSM.notifyMonitor=function(si){
EPCM.raiseEvent(this.NAMESPACE_NOTIFY,"ReceiveSessInfo", si);}
EPCM.DSM.notifyMonitorKey=function(skey){
EPCM.raiseEvent(this.NAMESPACE_NOTIFY,"ReceiveSessInfoKey", skey);}
EPCM.DSM.notifyMonitorAttrKey=function(akey){
EPCM.raiseEvent(this.NAMESPACE_NOTIFY,"ReceiveSessInfoAttrKey", akey);}
EPCM.DSM.registerSession=function(si){
EPCM._private.implDSM.log("Client: SessionInfo registered \r\n" + this.formatObject(si), true );
EPCM._private.implDSM.registerSession(si);}
EPCM.DSM.registerSessionKey=function(skey){
EPCM._private.implDSM.log("Client: SessionInfoKey registered \r\n" + skey, true );
this.popupReceiptKey(skey);
EPCM._private.implDSM.registerSessionKey(skey);
this.notifyMonitorKey(skey);}
EPCM.DSM.registerAttrKey=function(akey){
EPCM._private.implDSM.log("Client: SessionInfoAttrKey Registered \r\n" + this.formatObject(akey), true );
this.popupReceiptAttrKey(akey);
EPCM._private.implDSM.registerAttrKey(akey);
this.notifyMonitorAttrKey(akey);}
EPCM.DSM.registerFullKey=function(key,tstamp){
if(tstamp == null || tstamp == ""){
this.registerSessionKey(key);
}else{
this.registerAttrKey( this.constructAttrKey(key,tstamp) );}
}
EPCM.DSM.registerAll=function(iVuID,key,tstamp){
this.registerFullKey(key,tstamp);
this.registerKeyByiViewID(iVuID,key,tstamp);}
EPCM.DSM.registerKeyByiViewID=function(iVuID,key,tstamp){
if (tstamp == null || tstamp == ""){
this.registerKeyStoreByiViewID(iVuID,key);}
else{
this.registerAttrKeyStoreByiViewID(iVuID, this.constructAttrKey(key,tstamp));}
}
EPCM.DSM.registerKeyStoreByiViewID=function(iVuID,aKey){
EPCM._private.implDSM.registerKeyStoreByiViewID(iVuID,aKey);}
EPCM.DSM.registerAttrKeyStoreByiViewID=function(iVuID,aKey){
EPCM._private.implDSM.registerAttrKeyStoreByiViewID(iVuID,aKey);}
EPCM.DSM.removeSessionByGUSID=function (GUSID){
EPCM._private.implDSM.removeSessionByGUSID(GUSID);}
EPCM.DSM.removeSessionKey=function (skey){
EPCM._private.implDSM.removeSessionKey(skey);}
EPCM.DSM.removeAttrKey=function (akey){
EPCM._private.implDSM.removeAttrKey(akey);}
EPCM.DSM.getTerminationData=function(takeover, cmd, embedded){
var xCmd=(cmd == null) ? this.SUSPEND : cmd;
var xEmbedded=(embedded == null) ? true : embedded;
return EPCM._private.implDSM.getTerminationData(takeover, xCmd, xEmbedded);}
EPCM.DSM.mergeTerminationData=function(one,two){
return EPCM._private.implDSM.mergeTerminationData(one,two);}
EPCM.DSM.terminateAll=function(cmdOrBool){
var cmd=this.resolveCmd(cmdOrBool);
EPCM._private.implDSM.terminateAll(cmd);}
EPCM.DSM.terminateByGUSID=function(GUSID,cmdOrBool){
var cmd=this.resolveCmd(cmdOrBool);
EPCM._private.implDSM.terminateByGUSID(GUSID,cmd);}
EPCM.DSM.terminateByKey=function(skey,cmdOrBool){
var cmd=this.resolveCmd(cmdOrBool);
EPCM._private.implDSM.terminateByKey(skey,cmd);}
EPCM.DSM.terminateByAttrKey=function(akey,cmdOrBool){
var cmd=this.resolveCmd(cmdOrBool);
EPCM._private.implDSM.terminateByAttrKey(akey,cmd);}
EPCM.DSM.terminateByiViewID=function(iVuID,cmdOrBool){
var cmd=this.resolveCmd(cmdOrBool);
EPCM._private.implDSM.terminateByiViewID(iVuID,cmd);}
EPCM.DSM.getAllToArray=function(){
return EPCM._private.implDSM.getAllToArray();}
EPCM.DSM.getAllKeysToArray=function(){
return EPCM._private.implDSM.getAllKeysToArray();}
EPCM.DSM.getAllAttrKeysToArray=function(){
return EPCM._private.implDSM.getAllAttrKeysToArray();}
EPCM.DSM.getSize=function(){
return EPCM._private.implDSM.getSize();}
EPCM.DSM.getKeysSize=function(){
return EPCM._private.implDSM.getKeysSize();}
EPCM.DSM.getAttrKeysSize=function(){
return EPCM._private.implDSM.getAttrKeysSize();}
EPCM.DSM.log=function( logString, isDebugControlled ){
var isDC=( isDebugControlled != null)? isDebugControlled : true;
return EPCM._private.implDSM.log( logString, isDC );}
EPCM.DSM.isReceiptEnabled=function(){
return EPCM._private.implDSM.isReceiptEnabled();}
EPCM.DSM.popupReceipt=function(si){
if (this.isReceiptEnabled()){
alert("Session Info Object received:" + "\n\n" + this.formatObject(si));}
}
EPCM.DSM.popupReceiptKey=function(skey){
if (this.isReceiptEnabled()){
alert("Session Info Key received:" + "\n\n" + skey );}
}
EPCM.DSM.popupReceiptAttrKey=function(akey){
if (this.isReceiptEnabled()){
alert("Session Info Attributed Key received:" + "\n\n" + this.formatObject(akey) );}
}
EPCM.DSM.formatObject=function( o ){
var ca=[];
for(var item in o ){
ca.push(item, "=",o[item], "\r\n");}
return ca.join("");}
EPCM.DSM.constructAttrKey=function( key, tstamp ){
var loAK={
key : ((key) ? new String(key) : ""),
tstamp : ((tstamp)? new String(tstamp): "")
};
return loAK;}
EPCM.DSM.convertAttrKeyToId=function( akey ){
return akey.key + "{{{" + akey.tstamp + "}}}";}
EPCM.DSM.convertIdToAttrKey=function( id ){
var BRSIZE=3;
var key,tstamp;
var popen=id.lastIndexOf("{{{");
var pclose=id.lastIndexOf("}}}");
if(popen <0 || pclose <0 || (popen + BRSIZE) > pclose) return null;
key=id.substring(0,popen);
tstamp=id.substring(popen+BRSIZE, pclose);
if(parseInt(tstamp) != tstamp) return null;
return this.constructAttrKey(key,tstamp);}
EPCM.DSM3={
SessStore : null,
KeyStore : null,
AttrKeyStore : null,
iViewKeyStore : null,
iViewAttrKeyStore : null,
SerPropString: "",
SerKeyString : "",
AttrKeyString: "",
NavigateAcrossSubFrames: false,
SERKEY_SEPAR :"&",
SERPROP_SEPAR :"#",
SERATTRKEY_SEPAR:"#",
SSIPAIR_SEPAR :"&",
SSIKEYVAL_SEPAR :"=",
SAKVAL_SEPAR :"&",
LogoffStarted: false,
NodeOpStarted: false,
TerminatorUrl: null,
FormName : "",
FormId : "",
ParamMapId : "",
DBGFLG_URN : "urn:com.sapportals.portal:dsm",
DBGFLG_NAME: "debug",
ForcedUserDebug: false,
DebugFlagSet: "",
DbgLogTerm: false,
DbgReceipt: false,
DbgWinHold: false,
DbgAckHold: false,
WinForced : false,
WinParamsHidden : "height=100,width=200,resizable,left=20042,screenX=20042,top=0,screenY=0",
WinParamsDebug : "height=400,width=600,resizable,menubar,scrolbars",
EmptyAutoScript : "javascript:document.write('<html><body>Closing sessions ...</body></html>');document.close();setTimeout('window.close()',15000)",
EmptyUrlFrame : "",
EmptyUrlWindow : "",
TargetNameIframe :"DsmTargetIframe",
TargetNameWindow :"DmsTargetWindow",
KeepAliveActive : false,
KeepAliveDelta : 780000,
KeepAliveStopAfter : 43200000,
KeepAliveTimer : null,
KeepAliveInitStamp : null,
KeepAliveCookieName: "DSMKeepAliveStamp"}
EPCM.DSM3.init=function( cfg ){
this.SessStore=[];
this.KeyStore=[];
this.AttrKeyStore=[];
this.iViewKeyStore=[];
this.iViewAttrKeyStore=[];
this.TerminatorUrl=cfg.TerminatorURL;
this.FormName="DSMSender" + EPCM.getInstanceId();
this.FormId=this.FormName;
this.ParamMapId="com.sap.portal.dsm.ParamMap:"+ EPCM.getInstanceId();
var isHttp=(window.location.protocol == "http:");
var isNavSubFrms=cfg.NavAcrossSubFramesUrl;
if (isNavSubFrms == "disabled"){
var smartEmptyUrl=(EPCM.getUAType() == EPCM.MSIE) ? this.EmptyAutoScript : "about:blank";
this.EmptyUrlWindow=isHttp ? smartEmptyUrl : cfg.WinEmptyUrl;
this.EmptyUrlFrame=isHttp ? "about:blank" : cfg.WinEmptyUrl;}
else{
this.NavigateAcrossSubFrames=true;
this.EmptyUrlWindow=cfg.NavAcrossSubFramesUrl;
this.EmptyUrlFrame=cfg.NavAcrossSubFramesUrl;}
this.KeepAliveActive=cfg.KeepAliveActive;
this.KeepAliveDelta=cfg.KeepAliveDelta * 1000;
this.KeepAliveStopAfter=cfg.KeepAliveStopAfter * 1000;
this.keepAliveInitTimer();}
EPCM.DSM3.uploadDebugFlags=function(cfg){
if (EPCM.getLevel() != 1) return;
var oldx=EPCM.loadClientData(this.DBGFLG_URN, this.DBGFLG_NAME);
var newx, forceUpload;
if(cfg.ForcedUserDebug == true){
newx="XPWA*";
forceUpload=(oldx != newx)
&&(( (oldx == null) || (oldx.length == 0))||((oldx.indexOf("*")>=0) && (oldx.indexOf("+") < 0)));}
else{
newx="*";
forceUpload=(oldx != newx)
&& (oldx != null) && (oldx.length >1)
&& (oldx.indexOf("*")>=0) && (oldx.indexOf("+")< 0);}
if(forceUpload){
EPCM.storeClientData(this.DBGFLG_URN, this.DBGFLG_NAME, newx);
EPCM.raiseEvent(EPCM.DSM.NAMESPACE_NOTIFY, "InitDebugger");}
}
EPCM.DSM3.initDebugger=function(){
if (EPCM.getLevel() != 1) return;
var fs="";
fs= EPCM.loadClientData(this.DBGFLG_URN, this.DBGFLG_NAME);
fs=(fs==null) ? "": fs;
this.DebugFlagSet=fs;
this.DbgLogTerm=(fs.indexOf("X")>=0);
this.DbgReceipt=(fs.indexOf("P")>=0);
this.DbgWinHold=(fs.indexOf("W")>=0);
this.DbgAckHold=(fs.indexOf("A")>=0);}
EPCM.DSM3.isReceiptEnabled=function(){
return this.DbgReceipt;}
EPCM.DSM3.registerSession=function(si){
var loSi=this.copySessInfo(si);
this.SessStore[loSi.GUSID]=loSi;
this.SerPropString=this.computeSerPropString();
this.keepAliveNewDataArrived();}
EPCM.DSM3.registerSessionKey=function(skey){
var loKey=new String(skey)
this.KeyStore[loKey]=loKey;
this.SerKeyString=this.computeSerKeyString();
this.keepAliveNewDataArrived();}
EPCM.DSM3.registerAttrKey=function(akey){
var currAKey=this.AttrKeyStore[akey.key];
if( currAKey == null ||
(currAKey != null && currAKey.tstamp < akey.tstamp) ){
var akeyCopy=this.copyAttrKey(akey);
this.AttrKeyStore[akey.key]=akeyCopy;
this.AttrKeyString=this.computeAttrKeyString();}
this.keepAliveNewDataArrived();}
EPCM.DSM3.registerKeyStoreByiViewID=function(iVuID,aKey){
var currKey=this.iViewKeyStore[iVuID];
if(currKey == null || currKey == 'undefined'){
this.iViewKeyStore[iVuID]=aKey;}
}
EPCM.DSM3.registerAttrKeyStoreByiViewID=function(iVuID,aKey){
var currKey=this.iViewAttrKeyStore[iVuID];
if(currKey == null || currKey == 'undefined'){
var akeyCopy=this.copyAttrKey(aKey);
this.iViewAttrKeyStore[iVuID]=akeyCopy;}
}
EPCM.DSM3.removeSessionByGUSID=function (GUSID){
this.SessStore[GUSID]=null;
this.SerPropString=this.computeSerPropString();}
EPCM.DSM3.removeSessionKey=function (skey){
this.KeyStore[skey]=null;
this.SerKeyString=this.computeSerKeyString();}
EPCM.DSM3.removeAttrKey=function(akey){
this.AttrKeyStore[akey.key]=null;
this.AttrKeyString=this.computeSerKeyString();}
EPCM.DSM3.getTerminationData=function(takeover, cmd, embedded){
var cset={ SPS:[], SKS:[], AKS:[] };
var rootInfo=this.getTopInfo();
var root=rootInfo.xNode;
var rootFrame=rootInfo.xFrame;
var copyToRoot=takeover && (window != rootFrame) && (cmd == EPCM.DSM.SUSPEND);
var removeOnSlave=takeover;
var slaves=this.getChildrenNodes(window);
this.mergeForPiggyback(root,EPCM, cset, copyToRoot, removeOnSlave);
for(var idx=0; idx < slaves.length; idx ++){
this.mergeForPiggyback(root, slaves[idx], cset, copyToRoot, removeOnSlave);}
var td={
Command : cmd,
SerPropString : cset.SPS.join(this.SERPROP_SEPAR),
SerKeyString : cset.SKS.join(this.SERKEY_SEPAR),
SerAttrKeyString : cset.AKS.join(this.SERATTRKEY_SEPAR),
DebugSet : this.DebugFlagSet,
Embedded : ((embedded) ? "true" : "false")
};
return td;}
EPCM.DSM3.mergeForPiggyback=function(root, slave, cset, copyToRoot, removeOnSlave){
var rt=root.DSM3;
var sl=slave.DSM3;
if(sl.SerPropString.length >0) cset.SPS.push(sl.SerPropString);
if(sl.SerKeyString.length >0) cset.SKS.push(sl.SerKeyString);
if(sl.AttrKeyString.length >0) cset.AKS.push(sl.AttrKeyString);
if(copyToRoot){
for(var elem in sl.AttrKeyStore){
if(sl.AttrKeyStore[elem] != null){
rt.registerAttrKey(sl.AttrKeyStore[elem]);
sl.AttrKeyStore[elem]=null;}
}
sl.recomputeData();}
if(removeOnSlave){
sl.clearData();}
return cset;}
EPCM.DSM3.mergeTerminationData=function(one,two){
var collect={ CMD:"", SPS:"", SKS:"", AKS:"" };
if((one != null) && (typeof(one)=="object")){
collect.CMD=this.safeCmdMix(collect.CMD, one.Command);
collect.SPS += this.safeValMix(one.SerPropString, this.SERPROP_SEPAR);
collect.SKS += this.safeValMix(one.SerKeyString, this.SERKEY_SEPAR);
collect.AKS += this.safeValMix(one.SerAttrKeyString, this.SERATTRKEY_SEPAR);}
if((two !=null) && (typeof(two)=="object")){
collect.CMD=this.safeCmdMix(collect.CMD, two.Command);
collect.SPS += this.safeValMix(two.SerPropString, this.SERPROP_SEPAR);
collect.SKS += this.safeValMix(two.SerKeyString, this.SERKEY_SEPAR);
collect.AKS += this.safeValMix(two.SerAttrKeyString, this.SERATTRKEY_SEPAR);}
var td={
Command : collect.CMD,
SerPropString : collect.SPS,
SerKeyString : collect.SKS,
SerAttrKeyString : collect.AKS,
DebugSet : this.DebugFlagSet,
Embedded : "true"
};
return td;}
EPCM.DSM3.safeValMix=function(input,separ){
if(input==null || input.length==0) return "";
return ((input.indexOf(separ) != 0) ? separ:"") + input;}
EPCM.DSM3.safeCmdMix=function(master,slave){
if(master == EPCM.DSM.LOGOFF || slave == EPCM.DSM.LOGOFF) return EPCM.DSM.LOGOFF;
if(master == EPCM.DSM.ABORT || slave == EPCM.DSM.ABORT) return EPCM.DSM.ABORT;
return EPCM.DSM.SUSPEND;}
EPCM.DSM3.terminateAll=function(cmd){
var rootInfo, rootFrame, root, slaves;
if(EPCM.DSM.isLogoff(cmd)){
rootInfo=this.getTopInfo();
root=rootInfo.xNode;
rootFrame=rootInfo.xFrame;
if(root.DSM3.LogoffStarted){
return;
}else{
root.DSM3.LogoffStarted=true;
slaves=this.getChildrenNodes(rootFrame);
for(var idx=0; idx < slaves.length; idx ++){
this.mergeData(root,slaves[idx]);}
root.DSM3.keepAliveDeleteCookie();
root.DSM3.sendToTerminator(cmd,true);
root.DSM3.clearData();
return;}
}else{
this.NodeOpStarted=true;
root=EPCM;
slaves=this.getChildrenNodes(window)
for(var idx=0; idx < slaves.length; idx ++){
this.mergeData(root,slaves[idx]);}
this.sendToTerminator(cmd,false);
this.NodeOpStarted=false;}
this.clearData();}
EPCM.DSM3.terminateByGUSID=function(GUSID,cmd){
if (this.SessStore[GUSID] == null)return;
this.SerPropString=this.computeSerPropString(this.SessStore[GUSID]);
this.SerKeyString="";
this.AttrKeyString="";
this.sendToTerminator(cmd);
this.removeSessionByGUSID(GUSID);
this.recomputeData();}
EPCM.DSM3.terminateByKey=function(skey,cmd){
if (this.KeyStore[skey] == null)return;
this.SerPropString="";
this.SerKeyString=this.computeSerKeyString(skey);;this.AttrKeyString="";
this.sendToTerminator(cmd);
this.removeSessionKey(skey);
this.recomputeData();}
EPCM.DSM3.terminateByAttrKey=function(akey,cmd){
if (this.AttrKeyStore[akey.key] == null)return;
this.SerPropString="";
this.SerKeyString="";;this.AttrKeyString=this.computeAttrKeyString(akey);
this.sendToTerminator(cmd);
this.removeAttrKey(akey);
this.recomputeData();}
EPCM.DSM3.terminateByiViewID=function(iVuID,cmd){
var currKey=this.iViewKeyStore[iVuID];
if(currKey != null && currKey != 'undefined'){
this.terminateByKey(currKey,cmd);
this.iViewKeyStore[iVuID]=null;
return;}
currKey=this.iViewAttrKeyStore[iVuID];
if(currKey != null && currKey != 'undefined'){
this.terminateByAttrKey(currKey,cmd);
this.iViewAttrKeyStore[iVuID]=null;
return;}
}
EPCM.DSM3.getAllToArray=function(){
var loArr=[];
for(var elem in this.SessStore){
if (this.SessStore[elem] != null){
loArr[elem]=this.copySessInfo(this.SessStore[elem]);}
}
return loArr;}
EPCM.DSM3.getAllKeysToArray=function(){
var loArr=[];
for(var elem in this.KeyStore){
if (this.KeyStore[elem] != null){
loArr[elem]=new String(elem);}
}
return loArr;}
EPCM.DSM3.getAllAttrKeysToArray=function(){
var loArr=[];
for(var elem in this.AttrKeyStore){
if (this.AttrKeyStore[elem] != null){
loArr[elem]=this.copyAttrKey(this.AttrKeyStore[elem]);}
}
return loArr;}
EPCM.DSM3.getSize=function(){
var cnt=0;
for(var i in this.SessStore){
if (this.SessStore[i] != null) cnt++;}
return cnt;}
EPCM.DSM3.getKeysSize=function(){
var cnt=0;
for(var i in this.KeyStore){
if (this.KeyStore[i] != null) cnt++;}
return cnt;}
EPCM.DSM3.getAttrKeysSize=function(){
var cnt=0;
for(var i in this.AttrKeyStore){
if (this.AttrKeyStore[i] != null) cnt++;}
return cnt;}
EPCM.DSM3.copySessInfo=function(si){
var loSi={
protocolVersion : ((si.protocolVersion)? new String(si.protocolVersion) : ""),
GUSID : ((si.GUSID) ? new String(si.GUSID) : ""),
sessUrl : ((si.sessUrl) ? new String(si.sessUrl) : ""),
lastSessCmd : ((si.lastSessCmd) ? new String(si.lastSessCmd) : ""),
redirectURL : ((si.redirectURL) ? new String(si.redirectURL) : ""),
dTimeout : ((si.dTimeout) ? new String(si.dTimeout) : ""),
label : ((si.label) ? new String(si.label) : ""),
logoffUrl : ((si.logoffUrl) ? new String(si.logoffUrl) : ""),
suspendUrl : ((si.suspendUrl) ? new String(si.suspendUrl) : "")
};
return loSi;}
EPCM.DSM3.copyAttrKey=function(akey){
return EPCM.DSM.constructAttrKey(akey.key, akey.tstamp);}
EPCM.DSM3.serializeSession=function(si){
var ca=[];
for(var propkey in si){
ca.push( (ca.length>0) ? this.SSIPAIR_SEPAR : "" );
ca.push( encodeURIComponent(propkey), this.SSIKEYVAL_SEPAR, encodeURIComponent( si[propkey]));}
return ca.join("");}
EPCM.DSM3.serializeAttrKey=function(akey){
var ca=[];
ca.push( encodeURIComponent(akey.key),
this.SAKVAL_SEPAR,
akey.tstamp);
return ca.join("");}
EPCM.DSM3.computeSerPropString=function( sessInfo ){
if(sessInfo!=null){
return this.serializeSession(sessInfo);}
var ca=[];
for(var i in this.SessStore){
if(this.SessStore[i] == null) continue;
ca.push( (ca.length>0) ? this.SERPROP_SEPAR : "" );
ca.push( this.serializeSession(this.SessStore[i]) );}
return ca.join("");}
EPCM.DSM3.computeSerKeyString=function( skey ){
if(skey!=null){
return encodeURIComponent(skey);}
var ca=[];
for(var i in this.KeyStore){
if(this.KeyStore[i] == null) continue;
ca.push( (ca.length>0) ? this.SERKEY_SEPAR : "" );
ca.push( encodeURIComponent(this.KeyStore[i]) );}
return ca.join("");}
EPCM.DSM3.computeAttrKeyString=function( akey ){
if(akey !=null){
return this.serializeAttrKey(akey);}
var ca=[];
for(var i in this.AttrKeyStore){
if (this.AttrKeyStore[i] == null) continue;
if (this.AttrKeyStore[i].key === undefined || this.AttrKeyStore[i].key == null ||
this.AttrKeyStore[i].tstamp === undefined || this.AttrKeyStore[i].tstamp == null) continue;
ca.push( (ca.length>0) ? this.SERATTRKEY_SEPAR : "" );
ca.push( this.serializeAttrKey(this.AttrKeyStore[i]));}
return ca.join("");}
EPCM.DSM3.recomputeData=function(){
this.SerPropString=this.computeSerPropString();
this.SerKeyString=this.computeSerKeyString();
this.AttrKeyString=this.computeAttrKeyString();}
EPCM.DSM3.mergeData=function(master, slave){
var ms= master.DSM3;
var sl= slave.DSM3;
if(sl.SerPropString.length >0){
ms.SerPropString += this.SERPROP_SEPAR + sl.SerPropString;}
if(sl.SerKeyString.length > 0){
ms.SerKeyString += this.SERKEY_SEPAR + sl.SerKeyString;}
if(sl.AttrKeyString.length > 0){
ms.AttrKeyString += this.SERATTRKEY_SEPAR + sl.AttrKeyString;}
sl.clearData();}
EPCM.DSM3.clearData=function(){
this.SerPropString="";
this.SessStore=[];
this.SerKeyString="";
this.KeyStore=[];
this.AttrKeyString="";
this.AttrKeyStore=[];
this.iViewKeyStore=[];
this.iViewAttrKeyStore=[];}
EPCM.DSM3.isDataToSend=function(x){
return((x.SerPropString != null && x.SerPropString != "")
|| (x.SerKeyString != null && x.SerKeyString != "")
|| (x.AttrKeyString != null && x.AttrKeyString != "") );}
EPCM.DSM3.getHiddenStyleAttribute=function(){
switch(EPCM.getUAType()){
case EPCM.MOZILLA :
case EPCM.NETSCAPE: return "position:absolute;top:0px;left:0px;visibility:hidden;";
default : return "DISPLAY:none";}
}
EPCM.DSM3.isSafariOrWebKit=function(){
var nua=navigator.userAgent;
return(nua.indexOf("Safari") >=0 || nua.indexOf("WebKit") >=0 );}
EPCM.DSM3.preFetchEmptyUrlWindow=function(){
var xmlHttp=this.getXmlHttpRequestObj();
if (xmlHttp == null)
throw new Error("Could not find any XMLHttpRequest alternative.");
xmlHttp.open("GET", this.EmptyUrlWindow ,false);
xmlHttp.send();}
EPCM.DSM3.getXmlHttpRequestObj=function(){
var xmlHttp=null;
if (window.XMLHttpRequest){
xmlHttp=new XMLHttpRequest();}
else{
if (window.ActiveXObject){
xmlHttp=new ActiveXObject('MSXML2.XMLHTTP.3.0');}
}
return xmlHttp;}
EPCM.DSM3.sendToTerminator=function(cmd, forceSendWithNoData){
if (!(this.isDataToSend(this) || forceSendWithNoData )) return;
if((EPCM.getUAType() == EPCM.MOZILLA) && (! this.isSafariOrWebKit())){
this.sendViaXHRPost(cmd);}
else{
this.sendViaFormPost(cmd);}
}
EPCM.DSM3.sendViaFormPost=function(cmd){
if (this.NavigateAcrossSubFrames)
this.preFetchEmptyUrlWindow();
var myForm=document.getElementById(this.FormId);
if(myForm == null){
this.createSenderForm();}
myForm=document.forms[this.FormName];
myForm.Command.value=cmd;
myForm.SerPropString.value=this.SerPropString;
myForm.SerKeyString.value=this.SerKeyString;
myForm.SerAttrKeyString.value=this.AttrKeyString;
myForm.Autoclose.value="";
myForm.DebugSet.value=this.DebugFlagSet;
myForm.method="POST";
myForm.action=this.TerminatorUrl;
var targetResult=this.targetResolver(cmd);
if(!targetResult.newWin){
myForm.target=targetResult.frameName;}
if (targetResult.newWin){
if(EPCM.DSM.isLogoff(cmd)){
try{
top.isLogoffFinalAllowed=false;
}catch(ex){}}
var myTarget=this.TargetNameWindow + this.FormName;
var myWinParams=(this.DbgWinHold) ? this.WinParamsDebug : this.WinParamsHidden;
myForm.target=myTarget;
myForm.Autoclose.value=(this.DbgWinHold) ? "" : "1000";
window.open(this.EmptyUrlWindow, myTarget, myWinParams);
window.focus();}
myForm.submit();}
EPCM.DSM3.sendViaXHRPost=function(cmd){
var XHR=(window.XMLHttpRequest) ? new XMLHttpRequest() : null;
if(!XHR){
throw new Error("Could not find any XMLHttpRequest alternative.")}
var mapKeySend=this.ParamMapId + "_" +(new Date()).getTime();
var mapKeyReceived,
data=this.getParamMapAsBody(cmd, "SAVE", mapKeySend);
XHR.open("POST",this.TerminatorUrl, false);
XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
XHR.send(data);
if(XHR.status != 200) alert("DSM: XHR Status was " +XHR.status + ",\n not able to deliver DSM data");
mapKeyReceived=XHR.responseText;
var targetResult=this.targetResolver(cmd);
if (targetResult.newWin){
if(EPCM.DSM.isLogoff(cmd)){
try{
top.isLogoffFinalAllowed=false;
}catch(ex){}}
var targetUrl=this.TerminatorUrl+"?ParamMapCmd=LOAD&ParamMapKey="+mapKeyReceived;
var myWinParams=(this.DbgWinHold) ? this.WinParamsDebug : this.WinParamsHidden;
window.open( targetUrl, "_blank", myWinParams );
window.focus();}
else{
var targetUrl=this.TerminatorUrl+"?ParamMapCmd=LOAD&ParamMapKey="+mapKeyReceived;
targetResult.frameElem.src=targetUrl;}
}
EPCM.DSM3.getParamMapAsBody=function(cmd,paramCmd,paramKey){
var pm=[];
pm.push("Command=" + encodeURIComponent(cmd));
pm.push("SerPropString=" + encodeURIComponent(this.SerPropString));
pm.push("SerKeyString=" + encodeURIComponent(this.SerKeyString));
pm.push("SerAttrKeyString=" + encodeURIComponent(this.AttrKeyString));
pm.push("Autoclose=" + encodeURIComponent((this.DbgWinHold) ? "" : "1000" ));
pm.push("DebugSet=" + encodeURIComponent(this.DebugFlagSet));
pm.push("ParamMapCmd=" + encodeURIComponent(paramCmd));
pm.push("ParamMapKey=" + encodeURIComponent(paramKey));
return pm.join("&");}
EPCM.DSM3.createSenderForm=function(){
var div=document.createElement("DIV");
if(div.style != null && div.style != 'undefined')
div.style.setAttribute("display","none");
else
div.setAttribute("style",this.getHiddenStyleAttribute());
div.innerHTML="<form name=\""+ this.FormName + "\" id=\""+ this.FormId + "\"  action=\"\" method=\"post\" target=\"\">" +
"<input type=\"hidden\" name=\"Command\">" +
"<input type=\"hidden\" name=\"SerPropString\">" +
"<input type=\"hidden\" name=\"SerKeyString\">" +
"<input type=\"hidden\" name=\"SerAttrKeyString\">" +
"<input type=\"hidden\" name=\"Autoclose\">" +
"<input type=\"hidden\" name=\"DebugSet\">" +
"</form>";
document.body.appendChild(div);}
EPCM.DSM3.createTargetIframe=function(){
try{
var iFrame=top.document.createElement("div");
iFrame.innerHTML="<iframe id=\""+this.TargetNameIframe+"\" name=\""+this.TargetNameIframe +"\""
+ " style =\"display:none\" src=\"" + this.EmptyUrlFrame +"\""
+ " targetlock=\"true\""
+ " onload=\"top.document.getElementById('"+ this.TargetNameIframe+"').targetlock=false;\""
+ "></iframe>";
top.document.body.appendChild( iFrame );
return true;
}catch(ex){}
return false;}
EPCM.DSM3.targetResolver=function(cmd){
var target={newWin:true, frameName:null, frameElem:null};
try{
target.newWin= this.WinForced
|| this.DbgWinHold
|| EPCM.DSM.isLogoff(cmd)
|| (top.EPCM.DSM3 == this)
|| (top.EPCM.DSM3.NodeOpStarted);
}catch(e){
target.newWin=true;}
if( ! target.newWin ){
try{
var frameElement=top.document.getElementById(this.TargetNameIframe);
if (frameElement != null){
if(frameElement.targetlock == true){
target.newWin=true;}
else{
frameElement.targetlock=true;
target.newWin=false;
target.frameName=this.TargetNameIframe;
target.frameElem=frameElement;}
} else{
if( this.createTargetIframe() ){
target.newWin=false;
target.frameName=this.TargetNameIframe;
target.frameElem=top.document.getElementById(this.TargetNameIframe);}
else{
target.newWin=true;}
}
}catch(e){
toNewWin=true;}
}
return target;}
EPCM.DSM3.log=function( logString, isDebugControlled ){
if (logString == null) return;
if (isDebugControlled && (! this.DbgLogTerm )) return;
var now=(new Date).getTime();
(new Image).src=this.TerminatorUrl + "?LogString=" + encodeURIComponent(logString) + "&dsmguid=" +now;}
EPCM.DSM3.keepAliveSetCookie=function(val ){
EPCM._private.setCookie(this.KeepAliveCookieName, val, null, "/", EPCM.getRelaxedDomain() );}
EPCM.DSM3.keepAliveGetCookie=function (){
return EPCM._private.getCookie(this.KeepAliveCookieName);}
EPCM.DSM3.keepAliveDeleteCookie=function (){
return EPCM._private.deleteCookie(this.KeepAliveCookieName,"/", EPCM.getRelaxedDomain() );}
EPCM.DSM3.keepAliveInitTimer=function(){
if (! this.KeepAliveActive)return;
var now=(new Date).getTime();
this.KeepAliveInitStamp=now;
var cookie=this.keepAliveGetCookie();
if(cookie != null){
this.keepAliveSetCookie(now);}
if (this.KeepAliveTimer != null){
clearTimeout(this.KeepAliveTimer);}
this.KeepAliveTimer=setTimeout("EPCM.DSM3.keepAliveProcess()", this.KeepAliveDelta);}
EPCM.DSM3.keepAliveNewDataArrived=function(){
if (! this.KeepAliveActive)return;
var cookie=this.keepAliveGetCookie();
if( cookie == null ){
this.keepAliveSetCookie(this.KeepAliveInitStamp);}
}
EPCM.DSM3.keepAliveProcess=function(){
if (! this.KeepAliveActive)return;
var now=(new Date).getTime();
var instance=EPCM.getInstanceId();
var cookie=this.keepAliveGetCookie();
if(cookie != null){
var cookieInt=parseInt(cookie);
if(now > (0 + cookieInt + this.KeepAliveDelta - 1)){
(new Image).src=this.TerminatorUrl + "?KeepAlive="+ now + "&Id=" + instance;
this.keepAliveSetCookie(now);}
}
if( now < (this.KeepAliveInitStamp + this.KeepAliveStopAfter)){
this.KeepAliveTimer=setTimeout("EPCM.DSM3.keepAliveProcess()", this.KeepAliveDelta);}
else{
if (this.KeepAliveTimer != null){
clearTimeout(this.KeepAliveTimer);}
}}
EPCM.DSM3.isValidNode=function(obj){
var result=false;
try{
result=( obj != null
&& obj.DSM != null
&& obj.DSM3 != null );
}catch(ex){}
return result;}
EPCM.DSM3.getTopInfo=function(){
var result={"xNode": EPCM, "xFrame":window };
var ldFrame=window;
try{
while (ldFrame.parent != ldFrame){
ldFrame=ldFrame.parent;
if (this.isValidNode(ldFrame.EPCM)){
result={ "xNode": ldFrame.EPCM, "xFrame": ldFrame}
}}
} catch (ex){
}
return result;}
EPCM.DSM3.getChildrenNodes=function(rootFrame){
return this.searchForChildren(rootFrame, null, false);}
EPCM.DSM3.searchForChildren=function(rootFrame, nodelist, addRootNode){
if (nodelist == null) nodelist=[];
if (addRootNode && rootFrame.EPCM != null && this.isValidNode(rootFrame.EPCM)){
nodelist[nodelist.length]=rootFrame.EPCM;}
for (var idx=0; idx < rootFrame.frames.length; idx++){
try{
this.searchForChildren( rootFrame.frames[idx], nodelist, true );}
catch (ex){
}}
return nodelist;}
EPCM._private.getApplet=function(){
loApplet=document.applets["_EPCMfactory_"];
if (loApplet == null){
alert( "EPCM ERROR\n" +
"\tApplet _EPCMfactory_ not available" );}
return loApplet;}
EPCM._private.getAdjacentEPCM=function(){
var ldTopFrame=this.getTopmostFrame();
return this.getChildrenEPCM( ldTopFrame );}
EPCM._private.getTopmostFrame=function(){
var ldFrame=window;
var saptop=null;
try{
saptop=EPCM.getSAPTop();
}catch(ex){}
try{
while ((ldFrame.parent != ldFrame) && (ldFrame != saptop)){
ldFrame=ldFrame.parent;}
} catch (ex) {;}
return ldFrame;}
EPCM._private.getTopmostEPCM=function(){
var result=EPCM;
var ldFrame=window;
try{
while (ldFrame.parent != ldFrame){
ldFrame=ldFrame.parent;
if (ldFrame.EPCM != null){
result=ldFrame.EPCM;}
}}
catch (ex) {;}
return result;}
EPCM._private.getChildrenEPCM=function( froot, paList){
if (paList == null) paList=[];
try{
if (froot.EPCM != null) paList[paList.length]=froot.EPCM;
}catch(ex){;}
for (var idx=0; idx < froot.frames.length; idx++){
try{
this.getChildrenEPCM( froot.frames[idx], paList );}
catch (ex){
}}
return paList;}
EPCM._private.getContainerElement=function( wnd){
var myParent=wnd.parent;
if (wnd != myParent){

var parentFrames=myParent.frames;
for (var idx=0; idx < parentFrames.length; idx++){
if (parentFrames[idx] == wnd){

var eFrames=myParent.document.getElementsByTagName( "IFRAME" );
if (eFrames.length < idx) return null;
return eFrames[idx];
}}
}
return null;}
EPCM._private.handleBrowserEvent=function(evt){
var browserNS="urn:com.sapportals.portal:browser";
if (evt == null) evt=window.event;
if(evt.type == "unload" || evt.type == "load"){
EPCM.raiseEventLocal( browserNS, "pre" + evt.type, evt );}
EPCM.raiseEventLocal( browserNS, evt.type, evt );
if(evt.type == "unload"){
EPCM._private.detachWindowEvents(window);}
}
EPCM._private.attachBrowserEvent=function(oDomRef,sName,fHandler){
if (oDomRef.attachEvent){
oDomRef.attachEvent("on" + sName, fHandler);}
else if (oDomRef.addEventListener){
oDomRef.addEventListener(sName, fHandler, false);}
}
EPCM._private.detachBrowserEvent=function(oDomRef,sName,fHandler){
if (oDomRef.detachEvent){
oDomRef.detachEvent("on" + sName, fHandler);}
else if (oDomRef.removeEventListener){
oDomRef.removeEventListener(sName, fHandler, false);}
}
EPCM._private.attachWindowEvents=function(oWinRef){
this.attachBrowserEvent(oWinRef,"load", this.handleBrowserEvent);
this.attachBrowserEvent(oWinRef,"unload", this.handleBrowserEvent);
this.attachBrowserEvent(oWinRef,"resize", this.handleBrowserEvent);}
EPCM._private.detachWindowEvents=function(oWinRef){
this.detachBrowserEvent(oWinRef,"load", this.handleBrowserEvent);
this.detachBrowserEvent(oWinRef,"unload", this.handleBrowserEvent);
this.detachBrowserEvent(oWinRef,"resize", this.handleBrowserEvent);}
EPCM._private.attachWindowEvents(window);
EPCM._private.pokeObject=function(fRef, fNames, fValue){
fRef[fNames[0]]=(fValue != null)? new Object(fValue): new Object();
for (var i=1; i<fNames.length; i++){
fRef[fNames[i]]=fRef[fNames[0]];}
return fRef[fNames[0]];}
EPCM._private.pokeFunction=function(fRef, fNames, fFunc){
var func=fFunc.toString();
var args=func.match(/\(\s*(.*)\)\s*/)[1];
var argStr=args.replace(/(\w+)/g, '"$1"');
if (argStr.length > 0) argStr += ", ";
var bodyStr=func.match(/\{((.|\s)*)\}[\s\n]*$/)[1];
eval("fRef[fNames[0]] = new Function(" + argStr + "bodyStr)");
for (var i=1; i<fNames.length; i++){
fRef[fNames[i]]=fRef[fNames[0]];}
return fRef[fNames[0]];}
