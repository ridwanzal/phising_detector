function AuthUtil(){}AuthUtil.staticHostUrl="";var requiredMajorVersion=9;var requiredMinorVersion=0;var requiredRevision=124;var hasProductInstall=DetectFlashVer(6,0,65);var hasRequestedVersion=DetectFlashVer(requiredMajorVersion,requiredMinorVersion,requiredRevision);if(hasProductInstall&&hasRequestedVersion){AC_FL_RunContent("src",AuthUtil.staticHostUrl+"/js/FS","width","0%","height","0%","align","middle","id","FS","quality","high","bgcolor","#869ca7","name","/js/FS","flashvars","cn=dp&p=/","allowScriptAccess","sameDomain","type","application/x-shockwave-flash","pluginspage","http://www.adobe.com/go/getflashplayer")}function getFlashDPCookie(k){var d="";var h=new Date();var i;var j=thisMovie(AuthUtil.staticHostUrl+"/js/FS");i=j.gc();var l=getCookie("SNS_DP");if((l!=""&&l!=null)&&(l!=i)){i=l;thisMovie("FS").sc(i)}if(k=="formCreds"){document.getElementById("formCreds").lsoDP.value=i}}function getCookie(b){if(document.cookie.length>0){cStart=document.cookie.indexOf(b+"=");if(cStart!=-1){cStart=cStart+b.length+1;cEnd=document.cookie.indexOf(";",cStart);if(cEnd==-1){cEnd=document.cookie.length}return unescape(document.cookie.substring(cStart,cEnd))}}return""}function thisMovie(c){var d=document.getElementById(c);if(d){return d}if(navigator.appName.indexOf("Microsoft")!=-1){return window[c]}return document[c]};