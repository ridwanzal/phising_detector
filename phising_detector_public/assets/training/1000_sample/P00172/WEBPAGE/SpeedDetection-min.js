/*Copyright (c) 2012 United Services Automobile Association All Rights Reserved SpeedDetection.js*/
USAA.namespace("USAA.ent.util");USAA.ent.util.SpeedDetection=function(){var M=null;var P=null;var S=null;var O=false,N=false;var Q=null;var A=null;var K=(new Date()).getTime();var I=(new Date()).getTime();var F=null;var D=K;var R=null;var B=-1;var H=10240;function G(){try{if(window.XMLHttpRequest){return new XMLHttpRequest()}else{if(window.ActiveXObject){return new ActiveXObject("Microsoft.XMLHTTP")}}}catch(T){}return null}function C(){if(M.readyState==1){I=(new Date()).getTime()}if(M.readyState==4){F=(new Date()).getTime();B=F-I;P=G();P.onreadystatechange=J;P.open("POST",Q,true);K=(new Date()).getTime();P.send(null)}}function J(){if(P.readyState==1){K=(new Date()).getTime();setTimeout(L,15000)}if(!N&&!O){if(P.readyState==4){O=true;D=(new Date()).getTime();var T=(D-K);T=T-B;if(T<0){T=0}R=Math.round((H/T)*8);if(R=="Infinity"){R=999999999}E()}}}function L(){if(!O){R=-1;N=true;E()}}function E(){var U="bpcs="+R+"&bpcl="+B;S=G();S.open("POST",A,true);S.setRequestHeader("Content-type","application/x-www-form-urlencoded");if((typeof USAA!=="undefined")&&(typeof USAA.ent!=="undefined")&&(typeof USAA.ent.digitalData!=="undefined")&&(typeof USAA.ent.digitalData.csrfToken!=="undefined")){var T=USAA.ent.digitalData.csrfToken;S.setRequestHeader("X-CSRF-Token",T)}S.send(U)}return{init:function(U,T){Q=U;A=T;K=(new Date()).getTime();I=(new Date()).getTime();M=G();if(M==null){R=-2;E()}else{M.onreadystatechange=function(){if(M.readyState==4){M=G();M.onreadystatechange=C;M.open("GET",Q+"&noResponse=true",true);I=(new Date()).getTime();M.send(null)}};M.open("HEAD",Q+"&noResponse=true",true);M.send(null)}}}}();USAA.register("SpeedDetection");USAA.register("SpeedDetection-min");