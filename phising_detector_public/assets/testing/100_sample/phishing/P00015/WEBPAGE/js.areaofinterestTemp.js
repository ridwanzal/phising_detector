/* /etc/designs/dhl/docroot/js/dhl_dropoff_locator.js */
function dropOffNextResults(resultLength) {
    var dropoffForm = document.dropoff_locator;
    var resultIndexField = dropoffForm.result_start_index;

    var resultStartIndex = parseInt(resultIndexField.value);
    resultStartIndex = resultStartIndex + resultLength;

    resultIndexField.value = resultStartIndex;

    dropoffForm.submit();
}

function dropOffZoomIn(steps) {
    var dropoffForm = document.dropoff_locator;
    var zoomLevelField = dropoffForm.zoom_level;
    //alert("zoomLevelField"+zoomLevelField);
    var zoomLevel = parseFloat(zoomLevelField.value);
    //alert("zoomLevel"+zoomLevel);
    //zoomLevel = zoomLevel - steps;
    //alert(zoomLevel);
    // zoom level must be greater than 0


    if (zoomLevel > 1) {
        //alert(zoomLevel);
        zoomLevel = zoomLevel - steps;
        zoomLevelField.value = zoomLevel;
    }

    else {

        zoomLevelField.value = parseFloat("1.0");

    }
    dropoffForm.submit();
}

function dropOffZoomOut(steps) {
    var dropoffForm = document.dropoff_locator;
    var zoomLevelField = dropoffForm.zoom_level;

    var zoomLevel = parseFloat(zoomLevelField.value);
    zoomLevel = zoomLevel + steps;

    zoomLevelField.value = zoomLevel;

    dropoffForm.submit();
}

function dropOffNewSearch() {
    var dropoffForm = document.dropoff_locator;

    dropoffForm.drop_off_locator_location.value = "";
    dropoffForm.city_town.value = "";
    dropoffForm.postcode_zip.value = "";
    dropoffForm.province_state.value = "";
    dropoffForm.result_start_index.value = "";
    dropoffForm.zoom_level.value = "";

    dropoffForm.submit();
    return false;
}
/* /etc/designs/dhl/docroot/js/inPageNavUtils.js */

function gotoInPageAnchor(anchorId) {
    if(anchorId.substr(0, 12) === "containerpar" ) {// _expandablelist"
        var selector = "a[name='" + anchorId + "']";
        var expListSection = $( selector ).next();
        if( expListSection.hasClass('expandablelist') ) {
            var toggleNode = expListSection.find('.dijitExpand_ListTitlePane');
            if( toggleNode.length !== 0 ) {
                //switch to dojo
                toggleNode = dijit.byId(toggleNode.attr("id"));
                if(! toggleNode.open )
                    toggleNode.toggle();
                return true;//to enable browser href focus
            }
        }
    }
    else
    {
        var targetEl = jQuery("#" + anchorId);
        if( targetEl.length === 0 ) {
            //possible TabSys without #
            targetEl = jQuery("#\\#" + anchorId);
            anchorId = "#" + anchorId;
        }
        var targetHRef = targetEl.attr('href');
        if( targetHRef && targetHRef.indexOf(anchorId) > -1 ) {
            targetEl.trigger( "click" );

            if(anchorId.charAt(0)==='#') {
                var bodyRect = document.body.getBoundingClientRect(),
                    elemRect = targetEl[0].getBoundingClientRect(),
                    offsetTop = elemRect.top - bodyRect.top,
                    offsetLeft = 0-bodyRect.left;

                window.scrollTo(offsetLeft, offsetTop-10);
                return false;
            }
        }
    }
    return true;
}



/* /etc/designs/dhl/docroot/js/AC_OETags.js */
// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion() {
    var version;
    var axo;
    var e;

    // NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

    try {
        // version will be set for 7.X or greater players
        axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        version = axo.GetVariable("$version");
    } catch (e) {
    }

    if (!version) {
        try {
            // version will be set for 6.X players only
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

            // installed player is some revision of 6.0
            // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
            // so we have to be careful.

            // default to the first public version
            version = "WIN 6,0,21,0";

            // throws if AllowScripAccess does not exist (introduced in 6.0r47)
            axo.AllowScriptAccess = "always";

            // safe to call for 6.0r47 or greater
            version = axo.GetVariable("$version");

        } catch (e) {
        }
    }

    if (!version) {
        try {
            // version will be set for 4.X or 5.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            version = axo.GetVariable("$version");
        } catch (e) {
        }
    }

    if (!version) {
        try {
            // version will be set for 3.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            version = "WIN 3,0,18,0";
        } catch (e) {
        }
    }

    if (!version) {
        try {
            // version will be set for 2.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            version = "WIN 2,0,0,11";
        } catch (e) {
            version = -1;
        }
    }

    return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer() {
    // NS/Opera version >= 3 check for Flash plugin in plugin array
    var flashVer = -1;

    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
            var descArray = flashDescription.split(" ");
            var tempArrayMajor = descArray[2].split(".");
            var versionMajor = tempArrayMajor[0];
            var versionMinor = tempArrayMajor[1];
            if (descArray[3] != "") {
                tempArrayMinor = descArray[3].split("r");
            } else {
                tempArrayMinor = descArray[4].split("r");
            }
            var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
        }
    }
    // MSN/WebTV 2.6 supports Flash 4
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
    // WebTV 2.5 supports Flash 3
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
    // older WebTV supports Flash 2
    else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
    else if (isIE && isWin && !isOpera) {
        flashVer = ControlVersion();
    }
    return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
    versionStr = GetSwfVer();
    if (versionStr == -1) {
        return false;
    } else if (versionStr != 0) {
        if (isIE && isWin && !isOpera) {
            // Given "WIN 2,0,0,11"
            tempArray = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
            tempString = tempArray[1];			// "2,0,0,11"
            versionArray = tempString.split(",");	// ['2', '0', '0', '11']
        } else {
            versionArray = versionStr.split(".");
        }
        var versionMajor = versionArray[0];
        var versionMinor = versionArray[1];
        var versionRevision = versionArray[2];

        // is the major.revision >= requested major.revision AND the minor version >= requested minor
        if (versionMajor > parseFloat(reqMajorVer)) {
            return true;
        } else if (versionMajor == parseFloat(reqMajorVer)) {
            if (versionMinor > parseFloat(reqMinorVer))
                return true;
            else if (versionMinor == parseFloat(reqMinorVer)) {
                if (versionRevision >= parseFloat(reqRevision))
                    return true;
            }
        }
        return false;
    }
}

function AC_AddExtension(src, ext) {
    if (src.indexOf('?') != -1)
        return src.replace(/\?/, ext + '?');
    else
        return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) {
    var str = '';
    if (isIE && isWin && !isOpera) {
        str += '<object ';
        for (var i in objAttrs)
            str += i + '="' + objAttrs[i] + '" ';
        for (var i in params)
            str += '><param name="' + i + '" value="' + params[i] + '" /> ';
        str += '></object>';
    } else {
        str += '<embed ';
        for (var i in embedAttrs)
            str += i + '="' + embedAttrs[i] + '" ';
        str += '> </embed>';
    }
    document.write(str);

}

function AC_FL_RunContent() {
    var ret =
        AC_GetArgs
        (arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
            , "application/x-shockwave-flash"
        );
    AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType) {
    var ret = new Object();
    ret.embedAttrs = new Object();
    ret.params = new Object();
    ret.objAttrs = new Object();
    for (var i = 0; i < args.length; i = i + 2) {
        var currArg = args[i].toLowerCase();

        switch (currArg) {
            case "classid":
                break;
            case "pluginspage":
                ret.embedAttrs[args[i]] = args[i + 1];
                break;
            case "src":
            case "movie":
                args[i + 1] = AC_AddExtension(args[i + 1], ext);
                ret.embedAttrs["src"] = args[i + 1];
                ret.params[srcParamName] = args[i + 1];
                break;
            case "onafterupdate":
            case "onbeforeupdate":
            case "onblur":
            case "oncellchange":
            case "onclick":
            case "ondblClick":
            case "ondrag":
            case "ondragend":
            case "ondragenter":
            case "ondragleave":
            case "ondragover":
            case "ondrop":
            case "onfinish":
            case "onfocus":
            case "onhelp":
            case "onmousedown":
            case "onmouseup":
            case "onmouseover":
            case "onmousemove":
            case "onmouseout":
            case "onkeypress":
            case "onkeydown":
            case "onkeyup":
            case "onload":
            case "onlosecapture":
            case "onpropertychange":
            case "onreadystatechange":
            case "onrowsdelete":
            case "onrowenter":
            case "onrowexit":
            case "onrowsinserted":
            case "onstart":
            case "onscroll":
            case "onbeforeeditfocus":
            case "onactivate":
            case "onbeforedeactivate":
            case "ondeactivate":
            case "type":
            case "codebase":
            case "id":
                ret.objAttrs[args[i]] = args[i + 1];
                break;
            case "width":
            case "height":
            case "align":
            case "vspace":
            case "hspace":
            case "class":
            case "title":
            case "accesskey":
            case "name":
            case "tabindex":
                ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i + 1];
                break;
            default:
                ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i + 1];
        }
    }
    ret.objAttrs["classid"] = classid;
    if (mimeType) ret.embedAttrs["type"] = mimeType;
    return ret;
}


/* /etc/designs/dhl/docroot/swf/swfobject.js */
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();/* /etc/designs/dhl/docroot/js/default.js */
function openPane(id) {
    // get named anchor
    var anchor = dojo.query('a[name=' + id + ']');

    if (anchor.length > 0) {
        // get expandable list section by sibling connection to anchor
        var expList = anchor[0].nextSibling;

        // get expandable list widget based on shared id string
        var paneWidget = dojo.query('[id^=dijit_Expand_ListTitlePane_]', expList);
        var paneWidgetWT = dojo.query('[id^=ExpandableLink]', expList);

        if (paneWidget.length > 0) {
            // get expandable list widget and toogle its state
            var pane = dijit.byId(paneWidget[0].id);
            if (new String(pane) != "undefined") {
                pane.toggle();
            }
        } else if (paneWidgetWT.length > 0) {
            // get expandable list WT widget and toogle its state
            var paneWT = dijit.byId(paneWidgetWT[0].id);
            if (new String(paneWT) != "undefined") {
                paneWT.toggle();
            }
        }
    }
}

dojo.addOnLoad(function () {
    if (window.location.hash) {
        var hash = window.location.hash.slice(1);   // strip leading "#"
        openPane(hash);
    }
});


sfHover = function () {
    var nav = document.getElementById("nav");
    if (nav != null) {
        var sfEls = document.getElementById("nav").getElementsByTagName("LI");
        for (var i = 0; i < sfEls.length; i++) {
            sfEls[i].onmouseover = function () {
                this.className += (this.className.length > 0 ? " " : "") + "sfhover";
            }
            sfEls[i].onmouseout = function () {
                this.className = this.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
            }
        }
    }
}
mcAccessible = function () {
    var nav = document.getElementById("nav");
    if (nav != null) {
        var mcEls = document.getElementById("nav").getElementsByTagName("A");
        for (var i = 0; i < mcEls.length; i++) {
            mcEls[i].onfocus = function () {
                this.className += (this.className.length > 0 ? " " : "") + "sffocus"; //a:focus
                this.parentNode.className += (this.parentNode.className.length > 0 ? " " : "") + "sfhover"; //li < a:focus
                if (this.parentNode.parentNode.parentNode.nodeName == "LI") {
                    this.parentNode.parentNode.parentNode.className += (this.parentNode.parentNode.parentNode.className.length > 0 ? " " : "") + "sfhover"; //li < ul < li < a:focus
                    if (this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
                        this.parentNode.parentNode.parentNode.parentNode.parentNode.className += (this.parentNode.parentNode.parentNode.parentNode.parentNode.className.length > 0 ? " " : "") + "sfhover"; //li < ul < li < ul < li < a:focus
                    }
                }
            }
            mcEls[i].onblur = function () {
                this.className = this.className.replace(new RegExp("( ?|^)sffocus\\b"), "");
                this.parentNode.className = this.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                if (this.parentNode.parentNode.parentNode.nodeName == "LI") {
                    this.parentNode.parentNode.parentNode.className = this.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                    if (this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
                        this.parentNode.parentNode.parentNode.parentNode.parentNode.className = this.parentNode.parentNode.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                    }
                }
            }
        }
    }
}

// only ie needs the sfHover script. all need the accessibility script...
// thanks http://www.brothercake.com/site/resources/scripts/onload/
if (window.addEventListener) window.addEventListener('load', mcAccessible, false); // gecko, safari, konqueror and standard
else if (document.addEventListener) document.addEventListener('load', mcAccessible, false); // opera 7
else if (window.attachEvent) { // win/ie
    window.attachEvent('onload', sfHover);
    window.attachEvent('onload', mcAccessible);
} else { // mac/ie5
    if (typeof window.onload == 'function') {
        var existing = onload;
        window.onload = function () {
            existing();
            sfHover();
            mcAccessible();
        }
    } else {
        window.onload = function () {
            sfHover();
            mcAccessible();
        }
    }
}

function openPop(URLStr, winWidthStr, winHeightStr) {
    var winWidth = winWidthStr;
    var winHeight = winHeightStr;

    winWidthPos = (screen.availWidth / 2) - (winWidth / 2);
    winHeightPos = (screen.availHeight / 2) - (winHeight / 2);
    popWin = open(URLStr, 'popUpWin', 'toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=' + winWidth + 'px' + ',height=' + winHeight + 'px' + ',left=' + winWidthPos + ', top=' + winHeightPos + ',screenX=' + winWidthPos + ',screenY=' + winHeightPos + '');
}

/** escapes alt and title parameter values or href value because xsl does not escape these */
function escapeZoomURL(url) {
    if (url.indexOf('title=') > -1 || url.indexOf('alt=') > -1) {
        var part = url.split('&');
        url = '';
        for (i = 0; i < part.length; i++) {
            //first is href + first param!
            var param = part[i].split('=');
            url = url + param[0] + '=' + escape(param[1]);
            if (i < part.length) url += '&';
        }
    }
    if (url.indexOf('disclaimer.jsp') > -1) {
        var part = url.split('href=');
        url = part[0] + 'href=' + escape(part[1]);
    }
    return url;
}
/**    popup functs */
var winpop;
//var img;
//var w;
function popup(url, winBreite, winHoehe, posLinks, posTop, linkfield, options, winname) {
    var screenBreite = (screen.availWidth) ? screen.availWidth : 800;
    var screenHoehe = (screen.availHeight) ? screen.availHeight : 600;
    if ((winBreite != null) && (winBreite <= 100)) winBreite = 100;
    if ((winBreite == null) || (winBreite < 100) || (winBreite > screenBreite)) winBreite = screenBreite - 100;
    if ((winHoehe != null) && (winHoehe <= 100)) winHoehe = 100;
    if ((winHoehe == null) || (winHoehe < 100) || (winHoehe > screenHoehe - 120)) winHoehe = screenHoehe - 120;
    if ((posLinks == null) || (posLinks < 0) || (screenBreite < posLinks + winBreite)) posLinks = (screenBreite - winBreite) / 2; // mitte des bildschirms
    if ((posTop == null) || (posTop < 0) || (screenHoehe < posTop + winHoehe)) posTop = (screenHoehe - winHoehe) / 2 - 20; // mitte des bildschirms
    if (posTop < 0) posTop = 0;
    if (winpop && (winpop.closed != true)) winpop.close();
    if (!options) options = 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1';
    if (!winname) winname = 'w';
    winpop = window.open(escapeZoomURL(url), winname, options + ',width=' + winBreite + ',height=' + winHoehe + ',left=' + posLinks + ',top=' + posTop);
    if (linkfield) winpop.w = linkfield;
    winpop.focus();
    return false;
}


// With onkeypress event, this verifies ?Enter? key
function verifyKey(oElement, oEvent) {
    if (oEvent.keyCode == 13 && oElement.onclick) {
        oElement.onclick();
    }
}

// Check of screen resolution and include of corresponding styles

//window.onload = screenResCheck;

function screenResCheck() {
    var nav_check = document.getElementById('navigation_content');

    if (screen.width == 800) {
        var default_800 = document.createElement('link');

        default_800.href = '/css/default_800.css';
        default_800.rel = 'stylesheet';
        default_800.type = 'text/css';

        var scr_js = document.getElementById('default_js');
        scr_js.parentNode.insertBefore(default_800, scr_js);

        if (nav_check) {
            var ie_opt = document.createElement('link');

            ie_opt.href = '/css/ie_optimization_800.css';
            ie_opt.rel = 'stylesheet';
            ie_opt.type = 'text/css';

            var scr_css = document.getElementById('default_js');
            scr_css.parentNode.insertBefore(ie_opt, scr_css);
        }
        else {
            var ie_opt = document.createElement('link');

            ie_opt.href = '/css/ie_optimization_home_800.css';
            ie_opt.rel = 'stylesheet';
            ie_opt.type = 'text/css';

            var scr_css = document.getElementById('default_js');
            scr_css.parentNode.insertBefore(ie_opt, scr_css);
        }
    }
}
jQuery(document).ready(function () {

    if (jQuery.browser.msie) {
        var crossReferenceStandardArticleCaptionElements = jQuery(".content_cross_reference .standardarticle .standard_article .caption");
        if (crossReferenceStandardArticleCaptionElements.length > 0) {

            crossReferenceStandardArticleCaptionElements.each(function () {

                if (jQuery(this).text() === "") {
                    jQuery(this).hide();
                }
            });
        }
        if (parseInt(jQuery.browser.version) === 6) {
            var crossReferenceStandardArticleHeadline = jQuery(".content_cross_reference .standardarticle .standard_article h2");
            if (crossReferenceStandardArticleHeadline.length > 0) {

                crossReferenceStandardArticleHeadline.each(function () {

                    if (jQuery(this).text() === "") {

                        jQuery(this).css({
                            height: "0px",
                            lineHeight: "0px",
                            paddingBottom: "0px",
                            marginBottom: "2px"
                        });
                    }
                });
            }
        }
        jQuery(".content_cross_reference .standardarticle .standard_article img[alt='External Link / New Window']").hide();
    }

});
/* /etc/designs/dhl/docroot/js/iconTeaser.js */
$(document).ready(function () {

    $(".iconTeaser").each(function () {

        var imageContainer = $(this).find(".iconImage"),

            defaultTextAlignment = "richtextLeft",
            richtextAlignment = defaultTextAlignment,

            richtextElements = $(this).find(".richtext"),
            numRichtextElements = richtextElements.length,

            linkAlignment,
            defaultLinkAlignment = "linkContainerLeft",
            standardLinkAlignment = defaultLinkAlignment,
            expandableLinkAlignment = defaultLinkAlignment,
            
            standardLinks = $(this).find(".standardlink:not(.expandablelink .standardlink)"),
            numStandardLinks = standardLinks.length,
            expandableLinks = $(this).find(".expandablelink"),
            numExpandableLinks = expandableLinks.length,

            centeredElementMaxWidth = $(this).width() - imageContainer.outerWidth();

        //Manage rightext alignment
        if (numRichtextElements > 0) {
            var textAlignment = $.trim($(this).find(".richtext_alignment").text());

            if (typeof textAlignment !== "undefined") {
                richtextAlignment = textAlignment;
            }

            richtextElements.addClass(richtextAlignment);
        }


        //Build standard link container
        if (numStandardLinks > 0) {
            linkAlignment = $.trim($(this).find(".standard_link_alignment").text());

            if (typeof linkAlignment !== "undefined") {
                standardLinkAlignment = linkAlignment;
            }

            standardLinks.wrapAll("<div class=\"standard_link_container " + standardLinkAlignment + "\"></div>");
        }


        //Build expandable link container
        if (numExpandableLinks > 0) {
            linkAlignment = $.trim($(this).find(".expandable_link_alignment").text());

            if (typeof linkAlignment !== "undefined" && (numStandardLinks <= 0 || numStandardLinks > 0 && standardLinkAlignment !== defaultLinkAlignment)) {
                expandableLinkAlignment = linkAlignment;
            }

            expandableLinks.wrapAll("<div class=\"expandable_link_container " + expandableLinkAlignment + "\"></div>");
        }


        //Image container height management
        var manageCenterAlignment = false,
            imageContainerHeight = -3, //Start with -3 because of already existing padding
            additionalSpaceTop = 0;

        if (numStandardLinks > 0 && standardLinkAlignment === "linkContainerCenter") {
            imageContainerHeight += $(this).find(".standard_link_container").outerHeight();
            manageCenterAlignment = true;
        }

        if (numExpandableLinks > 0 && expandableLinkAlignment === "linkContainerCenter") {

            if (!$.browser.msie || ($.browser.msie && $(this).find(".expandable_link_container").width() <= centeredElementMaxWidth )) {
                imageContainerHeight += numExpandableLinks * 18;
                manageCenterAlignment = true;
            }
        }

        if (numRichtextElements > 0 && richtextAlignment === "richtextCenter") {
            richtextElements.css({
                width: centeredElementMaxWidth + "px",
                float: "left"
            });

            imageContainerHeight += richtextElements.outerHeight();
            manageCenterAlignment = true;
            richtextElements.removeAttr("style");
        }

        if ((numStandardLinks > 0 && numExpandableLinks > 0 && standardLinkAlignment === "linkContainerCenter" && expandableLinkAlignment === "linkContainerCenter") ||
            (!$.browser.msie && numStandardLinks > 0 && numRichtextElements > 0 && standardLinkAlignment === "linkContainerCenter" && richtextAlignment === "richtextCenter")) {
            $(this).find(".standard_link_container").css("float", "none");
        }

        if (manageCenterAlignment) {
            imageContainerHeight += $(this).find("h2:eq(0)").outerHeight();

            if (imageContainerHeight < imageContainer.height()) {
                imageContainerHeight = imageContainer.height();
            }
            else {
                additionalSpaceTop = Math.floor((imageContainerHeight - imageContainer.height()) / 2);
            }

            //imageContainer.height(imageContainerHeight - additionalSpaceTop).css("paddingTop", "+="+additionalSpaceTop);
        }


        //IE Browser tweeks
        if ($.browser.msie) {

            if (expandableLinkAlignment === defaultLinkAlignment) {
                $(this).find(".expandable_link_container").width("100%");
            }

            if (expandableLinkAlignment === "linkContainerCenter" && imageContainer.length > 0 && !imageContainer.is(":empty")) {
                var availableSpace = $(this).width() - imageContainer.outerWidth();
                var availablePercent = Math.floor((availableSpace * 100) / $(this).width());

                if (availablePercent > 65 && $(this).parents(".container_1_1").hasClass("container_1_1") && $(this).find(".richtext").css("direction") !== "rtl") {
                    availablePercent = 65;
                }
                else if ((availablePercent > 63 && $(this).parents(".content_cross_reference").hasClass("content_cross_reference")) ||
                    (availablePercent >= 65 && $(this).parents(".container_1_1").hasClass("container_1_1") && $(this).find(".richtext").css("direction") === "rtl")) {
                    availablePercent = 63;
                }
                else if (availablePercent > 78 && $(this).parents(".contentleftpar").hasClass("contentleftpar")) {
                    availablePercent = 78;
                }
                else if (availablePercent > 74 && $(this).parents(".contentrightpar").hasClass("contentrightpar")) {
                    availablePercent = 74;
                }

                $(this).find(".expandable_link_container").width(availablePercent + "%");
            }

            if (standardLinkAlignment === "linkContainerLeft") {
                $(this).find(".standard_link_container").width("100%");
            }

            if (richtextElements.text() === "") {
                richtextElements.hide();
            }
        }

        // build a table to vertical align image
        var iconTeaser = $(this),
            images = imageContainer.find('img'),
            imageRight = imageContainer.hasClass('iconRight'),
            imageWidth = 0,
            tableWidth = 9,
            tmpAlignDir = '';

        iconTeaser.find('h2').wrap('<td class="helper">');
        var helper = $(this).find('.helper');

        iconTeaser.find('.richtextCenter').appendTo(helper);

        iconTeaser.find(".expandable_link_container").css('width', "100%");
        iconTeaser.find('.arrowLinkUp').css('display', 'inline-block');

        iconTeaser.find('.linkContainerCenter').appendTo(helper);

        if ($(helper).children().length == 1) {
            $(helper).css('verticalAlign', 'middle');
            $(helper).find('h2').css('paddingTop', '6px');
        }

        /**
         * apply calculated image and table widths, wrap table cells
         * @param {Integer} imgWidth - max width of images in iconTeaser
         * @param {Integer} tableWidth - width of surrounding image table
         */
        function finalizeTable(imgWidth, tableWidth) {
            imageContainer.wrap('<td ' + tmpAlignDir + ' class="iconHelper" style="width:' + tableWidth + 'px;">');

            if (!imageRight) {
                // fix image container for left floating images
                imageContainer.css('width', imgWidth);
            } else {
                //if icon align right move td to the end
                iconTeaser.find('.iconHelper').insertAfter(helper);
            }

            iconTeaser.find('td').wrapAll('<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr></tr></table>');
        };
        
        // simple iteration over image to get image width asynchronously (to compensate image loading delays)
        // give up after 100 times (20 sec)
        if (images.length > 0) {
            var widthVerificationIterator = 0,
                calculations = {
                    interval: null,
                    iterator: 0,
                    width: 0
                };

            calculations.interval = window.setInterval(function() {
                calculations.width = images[0].width;
                
                if (calculations.width != undefined && calculations.width != 0 && calculations.width == imageWidth) {
                    widthVerificationIterator++; // simple check to ensure that image width doesn't change anymore (2x)
                } else {
                    imageWidth = calculations.width;
                    widthVerificationIterator = 0;
                }

                if (calculations.iterator >= 100 || (imageWidth > 0 && widthVerificationIterator >= 2)) {
                    tableWidth += imageWidth;
                    finalizeTable(imageWidth, tableWidth);

                    // stop interval
                    window.clearInterval(calculations.interval);
                }

                calculations.iterator++;
            }, 200);
        } else {
            finalizeTable(imageWidth, tableWidth);
        }
    });

});/* /etc/designs/dhl/docroot/js/miniTaskCenter.js */
$(document).ready(function () {

    $(".miniTaskCenter").each(function () {


        /* iconTeaser dynamic width depend on the parent column*/
        var iconTeaser = $(this);
        var columnWidth = iconTeaser.parent().width();
        var marginLeft = parseInt(iconTeaser.css('marginLeft'));
        var marginRight = parseInt(iconTeaser.css('marginRight'));
        var paddingLeft = parseInt(iconTeaser.css('paddingLeft'));
        var paddingRight = parseInt(iconTeaser.css('paddingRight'));
        var allMargPad = marginLeft + marginRight + paddingLeft + paddingRight;
        //width minus all paddings and margins
        iconTeaser.width(columnWidth - allMargPad);

        // width of iconTeaserGreyContainer with borders
        if ($('.miniTaskCenterGrey', this).length) {
            //ie needs a smaller width
            if ($.browser.msie && $.browser.version == "6.0") {
                iconTeaser.width(columnWidth - allMargPad);
            } else if ($.browser.msie && $.browser.version != "6.0") {
                iconTeaser.width(columnWidth - allMargPad + 2);
            } else {
                iconTeaser.width(columnWidth - allMargPad + 5);
            }
        } else {
            //width of the plain iconTeaser
            iconTeaser.width(columnWidth - allMargPad);
        }

        // width of iconTeaserGrey to show the shadows propertly
        if ($('.miniTaskCenterGrey', this).length) {
            //ie needs a smaller width
            if ($.browser.msie) {
                $('.miniTaskCenterGrey', this).width(columnWidth - allMargPad - 26);
            } else {
                $('.miniTaskCenterGrey', this).width(columnWidth - allMargPad - 23);
            }
        }

        // build a table to vertical align image
        var tableImg = iconTeaser.find('.iconImage img').width() + 9;

        var tmpAlignDir = '';
        if ($(iconTeaser).find(".richtext").css("direction") === "rtl") {
            iconTeaser.find('.iconImage').css('marginLeft', '9px');
            iconTeaser.find('.iconImage').css('marginRight', '0px');
            tmpAlignDir = 'align="right"';
        }
        iconTeaser.find('.iconImage').wrap('<td ' + tmpAlignDir + ' class="iconHelper" style="vertical-align:middle;width:' + tableImg + 'px">');

        iconTeaser.find('h2').wrap('<td class="helper">');
        var helper = $(this).find('.helper');

        iconTeaser.find('.richtextCenter').appendTo(helper);

        if ($(helper).children().length == 1) {
            $(helper).css('verticalAlign', 'middle');
            $(helper).find('h2').css('paddingTop', '6px');
        }
        //if icon align right move td to the end
        var imageRight = iconTeaser.find('.iconImage').hasClass('iconRight');
        if (imageRight == true) {
            iconTeaser.find('.iconHelper').insertAfter(helper);
        }

        iconTeaser.find('td').wrapAll('<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr></tr></table>');

    });

});