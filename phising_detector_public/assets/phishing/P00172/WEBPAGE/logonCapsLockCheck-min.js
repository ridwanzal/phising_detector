/*Copyright (c) 2012 United Services Automobile Association All Rights Reserved logonCapsLockCheck.js*/
USAA.namespace("USAA.ec.logon");USAA.ec.logon.LogonCapsLockCheck=function(){var E=false;var H=false;var N=97;var J=122;var O=65;var K=90;var I=20;var D=YAHOO.util.Event;var G=YAHOO.util.Dom;var B=YAHOO.lang;var P=null;var M=null;var A=null;var Q=null;var F=false;var L;var C=function(){P=G.get("messageLoginErrorDiv");M=G.getElementsByClassName("messageLoginError basicmessageLoginError")[0];A=G.getElementsByClassName("shortContentLoginError")[0];Q=G.get("capsMessageDIV");F=(B.isObject(M)||B.isObject(A))?true:false;_bottomCloseLink=document.getElementById("closeLink")};return{init:function(){C();if(Q){YAHOO.util.Event.addListener("usaaNum","keypress",USAA.ec.logon.LogonCapsLockCheck.checkCapsLock,this);YAHOO.util.Event.addListener("usaaNum","keydown",USAA.ec.logon.LogonCapsLockCheck.capsLockHandler,this);YAHOO.util.Event.addListener("usaaPass","keypress",USAA.ec.logon.LogonCapsLockCheck.checkCapsLock,this);YAHOO.util.Event.addListener("usaaPass","keydown",USAA.ec.logon.LogonCapsLockCheck.capsLockHandler,this);YAHOO.util.Event.addFocusListener("usaaPass",USAA.ec.logon.LogonCapsLockCheck.passwordFocusHandler);YAHOO.util.Event.addBlurListener("usaaPass",USAA.ec.logon.LogonCapsLockCheck.hideErrorMessageDiv);YAHOO.util.Event.addListener("topCloseLink","keydown",USAA.ec.logon.LogonCapsLockCheck.topCloseLink,this);YAHOO.util.Event.addListener("topCloseLink","keypress",USAA.ec.logon.LogonCapsLockCheck.topCloseLink,this);YAHOO.util.Event.addListener("closeLink","keypress",USAA.ec.logon.LogonCapsLockCheck.bottomCloseLink,this);YAHOO.util.Event.addListener("closeLink","keydown",USAA.ec.logon.LogonCapsLockCheck.bottomCloseLink,this);YAHOO.util.Event.addFocusListener("closeLink",USAA.ec.logon.LogonCapsLockCheck.bottomLinkFocusHandler)}var R=document.getElementById("noticeLogonError");if(R){setTimeout(function(){document.getElementById("noticeLogonError").focus()},300)}},capsLockHandler:function(T){var R=D.getCharCode(T);var S=D.getTarget(T,true);if(R==I){if(E){E=false}else{E=true}}if(B.isObject(S)&&S.name=="j_password"&&E){USAA.ec.logon.LogonCapsLockCheck.showCapsLockWarning()}else{USAA.ec.logon.LogonCapsLockCheck.hideErrorMessageDiv()}},topCloseLink:function(S){var R=D.getCharCode(S);if(R===9&&S.shiftKey){(S.preventDefault)?S.preventDefault():S.returnValue=false;USAA.ec.logon.LogonCapsLockCheck.removeErrorMessageDiv()}},bottomCloseLink:function(T){var R=D.getCharCode(T);if(R===9&&!T.shiftKey){(T.preventDefault)?T.preventDefault():T.returnValue=false;USAA.ec.logon.LogonCapsLockCheck.removeErrorMessageDiv()}else{if(R===9&&T.shiftKey){var S=_bottomCloseLink.parentElement.className;if(S){G.removeClass(_bottomCloseLink.parentElement,"in-focus")}}}},bottomLinkFocusHandler:function(){var R=_bottomCloseLink.parentElement.className;if(R){G.addClass(_bottomCloseLink.parentElement,"in-focus")}},checkCapsLock:function(U){var R=D.getCharCode(U);var S=D.getTarget(U,true);var T=false;if(U.shiftKey){T=U.shiftKey}else{if(U.modifiers){T=!!(U.modifiers&4)}}if(((R>=N&&R<=J)&&T)||((R>=O&&R<=K)&&!T)){E=true;H=true}else{if((R>=N&&R<=J)||(R>=O&&R<=K)){E=false;H=true}}if(B.isObject(S)&&S.name=="j_password"){if(E==true&&H==true){USAA.ec.logon.LogonCapsLockCheck.showCapsLockWarning()}else{USAA.ec.logon.LogonCapsLockCheck.hideErrorMessageDiv()}}},showCapsLockWarning:function(){if(F){P.style.top="400px"}L="capsLockErrorMessage";var R="<div id="+L+" ><h4 class='capsLockmessageHeading'>Caps Lock Key is on. </h4>";R=R+"<p class='notice_logonError'> Remember: your password is case sensitive.</p></div>";P.style.height="auto";Q.innerHTML=R;P.style.display=""},passwordFocusHandler:function(){if(E){USAA.ec.logon.LogonCapsLockCheck.showCapsLockWarning()}else{USAA.ec.logon.LogonCapsLockCheck.hideErrorMessageDiv()}},removeErrorMessageDiv:function(){if(P!=null){P.style.display="none"}document.getElementById("usaaNum").focus()},hideErrorMessageDiv:function(){if(P!=null){P.style.display="none";if(document.getElementById("capsLockErrorMessage")){var R=document.getElementById("capsLockErrorMessage");R.id=""}}}}}();YAHOO.util.Event.onDOMReady(USAA.ec.logon.LogonCapsLockCheck.init);