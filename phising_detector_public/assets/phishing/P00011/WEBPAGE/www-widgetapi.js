(function(){var g,h=this;function m(a){a=a.split(".");for(var b=h,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function p(a){return"string"==typeof a}function aa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}var q="closure_uid_"+(1E9*Math.random()>>>0),ba=0;function ca(a,b,c){return a.call.apply(a.bind,arguments)}
function da(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return r.apply(null,arguments)}
function t(a,b){var c=a.split("."),d=h;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b}function u(a,b){function c(){}c.prototype=b.prototype;a.C=b.prototype;a.prototype=new c;a.base=function(a,c,f){for(var k=Array(arguments.length-2),l=2;l<arguments.length;l++)k[l-2]=arguments[l];return b.prototype[c].apply(a,k)}}
Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return r.apply(null,c)}return r(this,a)};var ea=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function v(a,b){return a<b?-1:a>b?1:0};var w=Array.prototype,fa=w.indexOf?function(a,b,c){return w.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},x=w.forEach?function(a,b,c){w.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function ga(a,b){var c;a:{c=a.length;for(var d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:p(a)?a.charAt(c):a[c]}function ha(a){return w.concat.apply(w,arguments)}function ia(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function ja(a){var b=y,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}function ka(a){var b=arguments.length;if(1==b&&"array"==n(arguments[0]))return ka.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};ka("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));var z;a:{var la=h.navigator;if(la){var ma=la.userAgent;if(ma){z=ma;break a}}z=""};function A(){return-1!=z.indexOf("Edge")};var na=-1!=z.indexOf("Opera")||-1!=z.indexOf("OPR"),B=-1!=z.indexOf("Edge")||-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE"),C=-1!=z.indexOf("Gecko")&&!(-1!=z.toLowerCase().indexOf("webkit")&&!A())&&!(-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE"))&&!A(),oa=-1!=z.toLowerCase().indexOf("webkit")&&!A();function pa(){var a=z;if(C)return/rv\:([^\);]+)(\)|;)/.exec(a);if(B&&A())return/Edge\/([\d\.]+)/.exec(a);if(B)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(oa)return/WebKit\/(\S+)/.exec(a)}
function qa(){var a=h.document;return a?a.documentMode:void 0}var ra=function(){if(na&&h.opera){var a=h.opera.version;return"function"==n(a)?a():a}var a="",b=pa();b&&(a=b?b[1]:"");return B&&!A()&&(b=qa(),b>parseFloat(a))?String(b):a}(),sa={};
function ta(a){if(!sa[a]){for(var b=0,c=ea(String(ra)).split("."),d=ea(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var k=c[f]||"",l=d[f]||"",$a=RegExp("(\\d*)(\\D*)","g"),ab=RegExp("(\\d*)(\\D*)","g");do{var K=$a.exec(k)||["","",""],L=ab.exec(l)||["","",""];if(0==K[0].length&&0==L[0].length)break;b=v(0==K[1].length?0:parseInt(K[1],10),0==L[1].length?0:parseInt(L[1],10))||v(0==K[2].length,0==L[2].length)||v(K[2],L[2])}while(0==b)}sa[a]=0<=b}}
var ua=h.document,va=qa(),wa=!ua||!B||!va&&A()?void 0:va||("CSS1Compat"==ua.compatMode?parseInt(ra,10):5);var D;if(!(D=!C&&!B)){var E;if(E=B)E=B&&(A()||9<=wa);D=E}D||C&&ta("1.9.1");B&&ta("9");function xa(a){var b,c,d,e;b=document;if(b.querySelectorAll&&b.querySelector&&a)return b.querySelectorAll(""+(a?"."+a:""));if(a&&b.getElementsByClassName){var f=b.getElementsByClassName(a);return f}f=b.getElementsByTagName("*");if(a){e={};for(c=d=0;b=f[c];c++){var k=b.className,l;if(l="function"==typeof k.split)l=0<=fa(k.split(/\s+/),a);l&&(e[d++]=b)}e.length=d;return e}return f}function ya(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){}
function F(a,b,c){switch(typeof b){case "string":Ba(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if("array"==n(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),F(a,b[f],c),e=",";c.push("]");break}c.push("{");d="";for(e in b)Object.prototype.hasOwnProperty.call(b,e)&&(f=b[e],"function"!=typeof f&&(c.push(d),Ba(e,c),c.push(":"),F(a,f,c),d=","));
c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var G={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ca=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function Ba(a,b){b.push('"',a.replace(Ca,function(a){if(a in G)return G[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return G[a]=e+b.toString(16)}),'"')};function H(){this.e=this.e;this.h=this.h}H.prototype.e=!1;H.prototype.dispose=function(){this.e||(this.e=!0,this.t())};H.prototype.t=function(){if(this.h)for(;this.h.length;)this.h.shift()()};function I(){H.call(this);this.c=[];this.d={}}u(I,H);g=I.prototype;g.F=1;g.n=0;g.subscribe=function(a,b,c){var d=this.d[a];d||(d=this.d[a]=[]);var e=this.F;this.c[e]=a;this.c[e+1]=b;this.c[e+2]=c;this.F=e+3;d.push(e);return e};function Da(a,b,c){var d=J;if(a=d.d[a]){var e=d.c;(a=ga(a,function(a){return e[a+1]==b&&e[a+2]==c}))&&Ea(d,a)}}
function Ea(a,b){if(0!=a.n)a.f||(a.f=[]),a.f.push(b);else{var c=a.c[b];if(c){if(c=a.d[c]){var d=fa(c,b);0<=d&&w.splice.call(c,d,1)}delete a.c[b];delete a.c[b+1];delete a.c[b+2]}}}g.I=function(a,b){var c=this.d[a];if(c){this.n++;for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];e=0;for(f=c.length;e<f;e++){var k=c[e];this.c[k+1].apply(this.c[k+2],d)}this.n--;if(this.f&&0==this.n)for(;c=this.f.pop();)Ea(this,c);return 0!=e}return!1};
g.t=function(){I.C.t.call(this);delete this.c;delete this.d;delete this.f};var Fa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Ga(a){if(M){M=!1;var b=h.location;if(b){var c=b.href;if(c&&(c=(c=Ga(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw M=!0,Error();}}return a.match(Fa)}var M=oa;function Ha(a,b,c){if("array"==n(b))for(var d=0;d<b.length;d++)Ha(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}var Ia=/#|$/;var N=m("yt.dom.getNextId_");if(!N){N=function(){return++Ja};t("yt.dom.getNextId_",N);var Ja=0};var O=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};t("yt.config_",O);t("yt.tokens_",window.yt&&window.yt.tokens_||{});t("yt.msgs_",window.yt&&window.yt.msgs_||{});function Ka(a){var b=arguments;if(1<b.length){var c=b[0];O[c]=b[1]}else for(c in b=b[0],b)O[c]=b[c]}function La(a){"function"==n(a)&&(a=Ma(a));return window.setInterval(a,250)}function Ma(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){throw Na(b),b;}}:a}
function Na(a,b){var c=m("yt.www.errors.log");c?c(a,b):(c=("ERRORS"in O?O.ERRORS:void 0)||[],c.push([a,b]),Ka("ERRORS",c))};function Oa(a){if(a=a||window.event){for(var b in a)b in Pa||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?
this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;"MozMousePixelScroll"==this.type?(this.wheelDeltaX=a.axis==a.HORIZONTAL_AXIS?a.detail:0,this.wheelDeltaY=a.axis==a.HORIZONTAL_AXIS?0:a.detail):window.opera?(this.wheelDeltaX=0,this.wheelDeltaY=a.detail):0==a.wheelDelta%120?"WebkitTransform"in document.documentElement.style?window.chrome&&0==navigator.platform.indexOf("Mac")?(this.wheelDeltaX=a.wheelDeltaX/-30,this.wheelDeltaY=a.wheelDeltaY/-30):(this.wheelDeltaX=
a.wheelDeltaX/-1.2,this.wheelDeltaY=a.wheelDeltaY/-1.2):(this.wheelDeltaX=0,this.wheelDeltaY=a.wheelDelta/-1.6):(this.wheelDeltaX=a.wheelDeltaX/-3,this.wheelDeltaY=a.wheelDeltaY/-3)}}g=Oa.prototype;g.type="";g.target=null;g.relatedTarget=null;g.currentTarget=null;g.data=null;g.keyCode=0;g.charCode=0;g.altKey=!1;g.ctrlKey=!1;g.shiftKey=!1;g.clientX=0;g.clientY=0;g.wheelDeltaX=0;g.wheelDeltaY=0;
var Pa={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,scale:1,rotation:1};var y=m("yt.events.listeners_")||{};t("yt.events.listeners_",y);var Qa=m("yt.events.counter_")||{count:0};t("yt.events.counter_",Qa);function Ra(a,b,c){return ja(function(d){return d[0]==a&&d[1]==b&&d[2]==c&&0==d[4]})}
function Sa(a,b,c){if(a&&(a.addEventListener||a.attachEvent)){var d=Ra(a,b,c);if(!d){var d=++Qa.count+"",e=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document),f;f=e?function(d){d=new Oa(d);if(!ya(d.relatedTarget,function(b){return b==a}))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new Oa(b);b.currentTarget=a;return c.call(a,b)};f=Ma(f);y[d]=[a,b,c,f,!1];a.addEventListener?"mouseenter"==b&&e?a.addEventListener("mouseover",f,!1):"mouseleave"==b&&e?a.addEventListener("mouseout",
f,!1):"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style?a.addEventListener("MozMousePixelScroll",f,!1):a.addEventListener(b,f,!1):a.attachEvent("on"+b,f)}}}function Ta(a){a&&("string"==typeof a&&(a=[a]),x(a,function(a){if(a in y){var c=y[a],d=c[0],e=c[1],f=c[3],c=c[4];d.removeEventListener?d.removeEventListener(e,f,c):d.detachEvent&&d.detachEvent("on"+e,f);delete y[a]}}))};function Ua(a){var b=[],c;for(c in a)Ha(c,a[c],b);b[0]="";return b.join("")};var Va={};function Wa(a){return Va[a]||(Va[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))};var P={},Xa=[],J=new I,Ya={};function Za(){x(Xa,function(a){a()})}function bb(a){var b=ia(document.getElementsByTagName("yt:"+a));a="yt-"+a;var c=document;a=c.querySelectorAll&&c.querySelector?c.querySelectorAll("."+a):xa(a);a=ia(a);return ha(b,a)}function Q(a,b){return"yt:"==a.tagName.toLowerCase().substr(0,3)?a.getAttribute(b):a?a.dataset?a.dataset[Wa(b)]:a.getAttribute("data-"+b):null}function cb(a,b){J.I.apply(J,arguments)};function R(a,b,c){this.d=b;this.h=this.c=null;this.A=this[q]||(this[q]=++ba);this.e=0;this.v=!1;this.o=[];this.f=null;this.D=c;this.G={};b=document;if(a=p(a)?b.getElementById(a):a)if("iframe"!=a.tagName.toLowerCase()&&(b=db(this,a),this.h=a,(c=a.parentNode)&&c.replaceChild(b,a),a=b),this.c=a,this.c.id||(b=a=this.c,b=b[q]||(b[q]=++ba),a.id="widget"+b),P[this.c.id]=this,window.postMessage){this.f=new I;eb(this);a=S(this.d,"events");for(var d in a)a.hasOwnProperty(d)&&this.addEventListener(d,a[d]);for(var e in Ya)fb(this,
e)}}g=R.prototype;g.R=function(a,b){this.c.width=a;this.c.height=b;return this};g.Q=function(){return this.c};g.J=function(a){this.k(a.event,a)};g.addEventListener=function(a,b){var c=b;"string"==typeof b&&(c=function(){window[b].apply(window,arguments)});this.f.subscribe(a,c);gb(this,a);return this};function fb(a,b){var c=b.split(".");if(2!=!c.length){var d=c[1];a.D==c[0]&&gb(a,d)}}
g.P=function(){this.c.id&&(P[this.c.id]=null);var a=this.f;a&&"function"==typeof a.dispose&&a.dispose();if(this.h){var a=this.c,b=a.parentNode;b&&b.replaceChild(this.h,a)}else(a=this.c)&&a.parentNode&&a.parentNode.removeChild(a);T&&(T[this.A]=null);this.d=null;var a=this.c,c;for(c in y)y[c][0]==a&&Ta(c);this.h=this.c=null};g.m=function(){return{}};function U(a,b,c){c=c||[];c=Array.prototype.slice.call(c);b={event:"command",func:b,args:c};a.v?a.B(b):a.o.push(b)}
g.k=function(a,b){if(!this.f.e){var c={target:this,data:b};this.f.I(a,c);cb(this.D+"."+a,c)}};
function db(a,b){for(var c=document.createElement("iframe"),d=b.attributes,e=0,f=d.length;e<f;e++){var k=d[e].value;null!=k&&""!=k&&"null"!=k&&c.setAttribute(d[e].name,k)}c.setAttribute("frameBorder",0);c.setAttribute("allowfullscreen",1);c.setAttribute("title","YouTube "+S(a.d,"title"));(d=S(a.d,"width"))&&c.setAttribute("width",d);(d=S(a.d,"height"))&&c.setAttribute("height",d);var l=a.m();l.enablejsapi=window.postMessage?1:0;window.location.host&&(l.origin=window.location.protocol+"//"+window.location.host);
window.location.href&&x(["debugjs","debugcss"],function(a){var b;b=window.location.href;var c=b.search(Ia),d;b:{d=0;for(var e=a.length;0<=(d=b.indexOf(a,d))&&d<c;){var f=b.charCodeAt(d-1);if(38==f||63==f)if(f=b.charCodeAt(d+e),!f||61==f||38==f||35==f)break b;d+=e+1}d=-1}if(0>d)b=null;else{e=b.indexOf("&",d);if(0>e||e>c)e=c;d+=a.length+1;b=decodeURIComponent(b.substr(d,e-d).replace(/\+/g," "))}null===b||(l[a]=b)});c.src=S(a.d,"host")+a.r()+"?"+Ua(l);return c}
g.H=function(){this.c&&this.c.contentWindow?this.B({event:"listening"}):window.clearInterval(this.e)};function eb(a){hb(a.d,a,a.A);a.e=La(r(a.H,a));Sa(a.c,"load",r(function(){window.clearInterval(this.e);this.e=La(r(this.H,this))},a))}function gb(a,b){a.G[b]||(a.G[b]=!0,U(a,"addEventListener",[b]))}
g.B=function(a){a.id=this.A;var b=[];F(new Aa,a,b);a=b.join("");var b=this.d,c,d=Ga(this.c.src);c=d[1];var e=d[2],f=d[3],d=d[4],k="";c&&(k+=c+":");f&&(k+="//",e&&(k+=e+"@"),k+=f,d&&(k+=":"+d));c=k;b=0==c.indexOf("https:")?[c]:b.c?[c.replace("http:","https:")]:b.e?[c]:[c,c.replace("http:","https:")];for(c=0;c<b.length;c++)try{this.c.contentWindow.postMessage(a,b[c])}catch(l){if(l.name&&"SyntaxError"==l.name)Na(l,"WARNING");else throw l;}};var ib="StopIteration"in h?h.StopIteration:Error("StopIteration");function jb(){}jb.prototype.next=function(){throw ib;};jb.prototype.d=function(){return this};function kb(){};function lb(){}u(lb,kb);function V(a){this.c=a}u(V,lb);V.prototype.isAvailable=function(){if(!this.c)return!1;try{return this.c.setItem("__sak","1"),this.c.removeItem("__sak"),!0}catch(a){return!1}};V.prototype.d=function(a){var b=0,c=this.c,d=new jb;d.next=function(){if(b>=c.length)throw ib;var d;d=c.key(b++);if(a)return d;d=c.getItem(d);if(!p(d))throw"Storage mechanism: Invalid value was encountered";return d};return d};V.prototype.key=function(a){return this.c.key(a)};function mb(){var a=null;try{a=window.localStorage||null}catch(b){}this.c=a}u(mb,V);function nb(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.c=a}u(nb,V);(new mb).isAvailable();(new nb).isAvailable();function ob(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}function pb(a){return 0==a.search("get")||0==a.search("is")};var qb="corp.google.com googleplex.com youtube.com youtube-nocookie.com youtubeeducation.com borg.google.com prod.google.com sandbox.google.com books.googleusercontent.com docs.google.com drive.google.com mail.google.com photos.google.com plus.google.com play.google.com googlevideo.com talkgadget.google.com survey.g.doubleclick.net youtube.googleapis.com vevo.com".split(" "),rb="";function W(a){this.d=a||{};this.defaults={};this.defaults.host="http://www.youtube.com";this.defaults.title="";this.e=this.c=!1;a=document.getElementById("www-widgetapi-script");if(this.c=!!("https:"==document.location.protocol||a&&0==a.src.indexOf("https:"))){a=[this.d,window.YTConfig||{},this.defaults];for(var b=0;b<a.length;b++)a[b].host&&(a[b].host=a[b].host.replace("http://","https://"))}}var T=null;
function S(a,b){for(var c=[a.d,window.YTConfig||{},a.defaults],d=0;d<c.length;d++){var e=c[d][b];if(void 0!=e)return e}return null}function hb(a,b,c){T||(T={},Sa(window,"message",r(a.f,a)));T[c]=b}
W.prototype.f=function(a){var b;(b=a.origin==S(this,"host"))||((b=a.origin)&&b==rb?b=!0:(new RegExp("^(https?:)?//([a-z0-9-]{1,63}\\.)*("+qb.join("|").replace(/\./g,".")+")(:[0-9]+)?([/?#]|$)","i")).test(b)?(rb=b,b=!0):b=!1);if(b){var c;try{c=za(a.data)}catch(d){return}this.e=!0;this.c||0!=a.origin.indexOf("https:")||(this.c=!0);if(a=T[c.id])a.v=!0,a.v&&(x(a.o,a.B,a),a.o.length=0),a.J(c)}};function sb(a){W.call(this,a);this.defaults.title="video player";this.defaults.videoId="";this.defaults.width=640;this.defaults.height=360}u(sb,W);function X(a,b){var c=new sb(b);R.call(this,a,c,"player");this.l={};this.j={}}u(X,R);function tb(a){if("iframe"!=a.tagName.toLowerCase()){var b=Q(a,"videoid");if(b){var c=Q(a,"width"),d=Q(a,"height");new X(a,{videoId:b,width:c,height:d})}}}g=X.prototype;g.r=function(){return"/embed/"+S(this.d,"videoId")};g.m=function(){var a;if(S(this.d,"playerVars")){a=S(this.d,"playerVars");var b={},c;for(c in a)b[c]=a[c];a=b}else a={};return a};
g.J=function(a){var b=a.event;a=a.info;switch(b){case "apiInfoDelivery":if(aa(a))for(var c in a)this.j[c]=a[c];break;case "infoDelivery":ub(this,a);break;case "initialDelivery":window.clearInterval(this.e);this.l={};this.j={};vb(this,a.apiInterface);ub(this,a);break;default:this.k(b,a)}};function ub(a,b){if(aa(b))for(var c in b)a.l[c]=b[c]}
function vb(a,b){x(b,function(a){this[a]||(ob(a)?this[a]=function(){this.l={};this.j={};U(this,a,arguments);return this}:pb(a)?this[a]=function(){var b=0;0==a.search("get")?b=3:0==a.search("is")&&(b=2);return this.l[a.charAt(b).toLowerCase()+a.substr(b+1)]}:this[a]=function(){U(this,a,arguments);return this})},a)}g.U=function(){var a=this.c.cloneNode(!1),b=this.l.videoData,c=S(this.d,"host");a.src=b&&b.video_id?c+"/embed/"+b.video_id:a.src;b=document.createElement("div");b.appendChild(a);return b.innerHTML};
g.T=function(a){return this.j.namespaces?a?this.j[a].options||[]:this.j.namespaces||[]:[]};g.S=function(a,b){if(this.j.namespaces&&a&&b)return this.j[a][b]};function wb(a){W.call(this,a);this.defaults.title="Thumbnail";this.defaults.videoId="";this.defaults.width=120;this.defaults.height=68}u(wb,W);function Y(a,b){var c=new wb(b);R.call(this,a,c,"thumbnail")}u(Y,R);function xb(a){if("iframe"!=a.tagName.toLowerCase()){var b=Q(a,"videoid");if(b){b={videoId:b,events:{}};b.width=Q(a,"width");b.height=Q(a,"height");b.thumbWidth=Q(a,"thumb-width");b.thumbHeight=Q(a,"thumb-height");b.thumbAlign=Q(a,"thumb-align");var c=Q(a,"onclick");c&&(b.events.onClick=c);new Y(a,b)}}}Y.prototype.r=function(){return"/embed/"+S(this.d,"videoId")};
Y.prototype.m=function(){return{player:0,thumb_width:S(this.d,"thumbWidth"),thumb_height:S(this.d,"thumbHeight"),thumb_align:S(this.d,"thumbAlign")}};Y.prototype.k=function(a,b){Y.C.k.call(this,a,b?b.info:void 0)};function yb(a){W.call(this,a);this.defaults.host="https://www.youtube.com";this.defaults.title="upload widget";this.defaults.width=640;this.defaults.height=.67*S(this,"width")}u(yb,W);function Z(a,b){var c=new yb(b);R.call(this,a,c,"upload")}u(Z,R);g=Z.prototype;g.r=function(){return"/upload_embed"};g.m=function(){var a={},b=S(this.d,"webcamOnly");null!=b&&(a.webcam_only=b);return a};g.k=function(a,b){Z.C.k.call(this,a,b);"onApiReady"==a&&U(this,"hostWindowReady")};
g.K=function(a){U(this,"setVideoDescription",arguments)};g.M=function(a){U(this,"setVideoKeywords",arguments)};g.N=function(a){U(this,"setVideoPrivacy",arguments)};g.L=function(a){U(this,"setVideoDraftPrivacy",arguments)};g.O=function(a){U(this,"setVideoTitle",arguments)};t("YT.PlayerState.UNSTARTED",-1);t("YT.PlayerState.ENDED",0);t("YT.PlayerState.PLAYING",1);t("YT.PlayerState.PAUSED",2);t("YT.PlayerState.BUFFERING",3);t("YT.PlayerState.CUED",5);t("YT.UploadWidgetEvent.API_READY","onApiReady");t("YT.UploadWidgetEvent.UPLOAD_SUCCESS","onUploadSuccess");t("YT.UploadWidgetEvent.PROCESSING_COMPLETE","onProcessingComplete");t("YT.UploadWidgetEvent.STATE_CHANGE","onStateChange");t("YT.UploadWidgetState.IDLE",0);t("YT.UploadWidgetState.PENDING",1);
t("YT.UploadWidgetState.ERROR",2);t("YT.UploadWidgetState.PLAYBACK",3);t("YT.UploadWidgetState.RECORDING",4);t("YT.UploadWidgetState.STOPPED",5);t("YT.get",function(a){return P[a]});t("YT.scan",Za);t("YT.subscribe",function(a,b,c){J.subscribe(a,b,c);Ya[a]=!0;for(var d in P)fb(P[d],a)});t("YT.unsubscribe",function(a,b,c){Da(a,b,c)});t("YT.Player",X);t("YT.Thumbnail",Y);t("YT.UploadWidget",Z);R.prototype.destroy=R.prototype.P;R.prototype.setSize=R.prototype.R;R.prototype.getIframe=R.prototype.Q;
R.prototype.addEventListener=R.prototype.addEventListener;X.prototype.getVideoEmbedCode=X.prototype.U;X.prototype.getOptions=X.prototype.T;X.prototype.getOption=X.prototype.S;Z.prototype.setVideoDescription=Z.prototype.K;Z.prototype.setVideoKeywords=Z.prototype.M;Z.prototype.setVideoPrivacy=Z.prototype.N;Z.prototype.setVideoTitle=Z.prototype.O;Z.prototype.setVideoDraftPrivacy=Z.prototype.L;Xa.push(function(){var a=bb("player");x(a,tb)});Xa.push(function(){var a=bb("thumbnail");x(a,xb)});
"undefined"!=typeof YTConfig&&YTConfig.parsetags&&"onload"!=YTConfig.parsetags||Za();var zb=m("onYTReady");zb&&zb();var Ab=m("onYouTubeIframeAPIReady");Ab&&Ab();var Bb=m("onYouTubePlayerAPIReady");Bb&&Bb();})();
