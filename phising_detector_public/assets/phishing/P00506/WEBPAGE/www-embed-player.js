(function(){var g,aa=aa||{},l=this;function p(a){return void 0!==a}
function q(a,b,c){a=a.split(".");c=c||l;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&p(b)?c[d]=b:c[d]?c=c[d]:c=c[d]={}}
function r(a,b){for(var c=a.split("."),d=b||l,e;e=c.shift();)if(null!=d[e])d=d[e];else return null;return d}
function t(){}
function ba(a){a.getInstance=function(){return a.R?a.R:a.R=new a}}
function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function u(a){return"array"==ca(a)}
function da(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function v(a){return"string"==typeof a}
function ea(a){return"number"==typeof a}
function ga(a){return"function"==ca(a)}
function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function ia(a){return a[ja]||(a[ja]=++ka)}
var ja="closure_uid_"+(1E9*Math.random()>>>0),ka=0;function la(a,b,c){return a.call.apply(a.bind,arguments)}
function ma(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function w(a,b,c){w=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?la:ma;return w.apply(null,arguments)}
function na(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}
var x=Date.now||function(){return+new Date};
function y(a,b){function c(){}
c.prototype=b.prototype;a.B=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ne=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}}
;function oa(a){if(Error.captureStackTrace)Error.captureStackTrace(this,oa);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
y(oa,Error);oa.prototype.name="CustomError";var pa;var qa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function ra(a){return decodeURIComponent(a.replace(/\+/g," "))}
var sa=/&/g,ta=/</g,ua=/>/g,va=/"/g,wa=/'/g,xa=/\x00/g,ya=/[\x00&<>"']/;function za(a){var b={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},c;c=l.document.createElement("div");return a.replace(Aa,function(a,e){var f=b[a];if(f)return f;if("#"==e.charAt(0)){var h=Number("0"+e.substr(1));isNaN(h)||(f=String.fromCharCode(h))}f||(c.innerHTML=a+" ",f=c.firstChild.nodeValue.slice(0,-1));return b[a]=f})}
function Ba(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var d=Number("0"+c.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return a}})}
var Aa=/&([^;\s<&]+);?/g,Ca={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"},Da={"'":"\\'"};
function Ea(a,b){for(var c=0,d=qa(String(a)).split("."),e=qa(String(b)).split("."),f=Math.max(d.length,e.length),h=0;0==c&&h<f;h++){var k=d[h]||"",m=e[h]||"";do{k=/(\d*)(\D*)(.*)/.exec(k)||["","","",""];m=/(\d*)(\D*)(.*)/.exec(m)||["","","",""];if(0==k[0].length&&0==m[0].length)break;c=Fa(0==k[1].length?0:parseInt(k[1],10),0==m[1].length?0:parseInt(m[1],10))||Fa(0==k[2].length,0==m[2].length)||Fa(k[2],m[2]);k=k[3];m=m[3]}while(0==c)}return c}
function Fa(a,b){return a<b?-1:a>b?1:0}
function Ga(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var Ha=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;
if(v(a))return v(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},z=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=v(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ia=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=v(a)?a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];
b.call(c,m,k,a)&&(e[f++]=m)}return e},Ja=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=v(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));
return e},Ka=Array.prototype.some?function(a,b,c){return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=v(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;
return!1},La=Array.prototype.every?function(a,b,c){return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=v(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;
return!0};
function Ma(a,b,c){b=Na(a,b,c);return 0>b?null:v(a)?a.charAt(b):a[b]}
function Na(a,b,c){for(var d=a.length,e=v(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}
function A(a,b){return 0<=Ha(a,b)}
function Oa(a,b){A(a,b)||a.push(b)}
function Pa(a,b){var c=Ha(a,b),d;(d=0<=c)&&Array.prototype.splice.call(a,c,1);return d}
function Qa(a,b){var c=Na(a,b,void 0);0<=c&&Array.prototype.splice.call(a,c,1)}
function Ra(a){return Array.prototype.concat.apply(Array.prototype,arguments)}
function Sa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Ta(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(da(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var h=0;h<f;h++)a[e+h]=d[h]}else a.push(d)}}
function Ua(a,b,c,d){return Array.prototype.splice.apply(a,Va(arguments,1))}
function Va(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)}
function Wa(a,b){return a>b?1:a<b?-1:0}
;function Xa(a,b,c){for(var d in a)b.call(c,a[d],d,a)}
function Ya(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d}
function Za(a){var b=0,c;for(c in a)b++;return b}
function $a(a,b){return ab(a,b)}
function bb(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}
function cb(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}
function ab(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function db(a){var b=eb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function fb(a){for(var b in a)return!1;return!0}
function gb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function hb(a){var b={},c;for(c in a)b[c]=a[c];return b}
function ib(a){var b=ca(a);if("object"==b||"array"==b){if(ga(a.clone))return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=ib(a[c]);return b}return a}
var jb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function kb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<jb.length;f++)c=jb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var lb;a:{var mb=l.navigator;if(mb){var nb=mb.userAgent;if(nb){lb=nb;break a}}lb=""}function B(a){return-1!=lb.indexOf(a)}
;function ob(){return(B("Chrome")||B("CriOS"))&&!B("Edge")}
;function pb(){this.b=""}
pb.prototype.Kb=!0;pb.prototype.Fb=function(){return this.b};
pb.prototype.toString=function(){return"Const{"+this.b+"}"};
function qb(a){var b=new pb;b.b=a;return b}
;function rb(){this.b="";this.f=sb}
rb.prototype.Kb=!0;rb.prototype.Fb=function(){return this.b};
function tb(a){if(a instanceof rb&&a.constructor===rb&&a.f===sb)return a.b;ca(a);return"type_error:SafeUrl"}
var ub=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;function vb(a){if(a instanceof rb)return a;a=a.Kb?a.Fb():String(a);ub.test(a)||(a="about:invalid#zClosurez");return wb(a)}
var sb={};function wb(a){var b=new rb;b.b=a;return b}
wb("about:blank");function xb(){this.b="";this.f=yb;this.g=null}
xb.prototype.Kb=!0;xb.prototype.Fb=function(){return this.b};
function zb(a){if(a instanceof xb&&a.constructor===xb&&a.f===yb)return a.b;ca(a);return"type_error:SafeHtml"}
var yb={};function Ab(a,b){var c=new xb;c.b=a;c.g=b;return c}
Ab("<!DOCTYPE html>",0);Ab("",0);Ab("<br>",0);function Bb(a,b){var c;c=b instanceof rb?b:vb(b);a.href=tb(c)}
;function Cb(a,b,c){a&&(a.dataset?a.dataset[Db(b)]=c:a.setAttribute("data-"+b,c))}
function C(a,b){return a?a.dataset?a.dataset[Db(b)]:a.getAttribute("data-"+b):null}
function Eb(a,b){a&&(a.dataset?delete a.dataset[Db(b)]:a.removeAttribute("data-"+b))}
var Fb={};function Db(a){return Fb[a]||(Fb[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}
;function Gb(a){l.setTimeout(function(){throw a;},0)}
var Hb;
function Ib(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!B("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=w(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!B("Trident")&&!B("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.ac;c.ac=null;a()}};
return function(a){d.next={ac:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}}
;function Jb(a,b,c){this.i=c;this.g=a;this.j=b;this.f=0;this.b=null}
Jb.prototype.get=function(){var a;0<this.f?(this.f--,a=this.b,this.b=a.next,a.next=null):a=this.g();return a};
function Kb(a,b){a.j(b);a.f<a.i&&(a.f++,b.next=a.b,a.b=b)}
;function Lb(){this.f=this.b=null}
var Nb=new Jb(function(){return new Mb},function(a){a.reset()},100);
Lb.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function Mb(){this.next=this.scope=this.b=null}
Mb.prototype.set=function(a,b){this.b=a;this.scope=b;this.next=null};
Mb.prototype.reset=function(){this.next=this.scope=this.b=null};function Ob(a,b){Pb||Qb();Rb||(Pb(),Rb=!0);var c=Sb,d=Nb.get();d.set(a,b);c.f?c.f.next=d:c.b=d;c.f=d}
var Pb;function Qb(){if(l.Promise&&l.Promise.resolve){var a=l.Promise.resolve(void 0);Pb=function(){a.then(Tb)}}else Pb=function(){var a=Tb;
!ga(l.setImmediate)||l.Window&&l.Window.prototype&&!B("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(Hb||(Hb=Ib()),Hb(a)):l.setImmediate(a)}}
var Rb=!1,Sb=new Lb;function Tb(){for(var a;a=Sb.remove();){try{a.b.call(a.scope)}catch(b){Gb(b)}Kb(Nb,a)}Rb=!1}
;function D(){this.Fa=this.Fa;this.N=this.N}
D.prototype.Fa=!1;D.prototype.isDisposed=function(){return this.Fa};
D.prototype.dispose=function(){this.Fa||(this.Fa=!0,this.w())};
function Ub(a,b){a.Fa?p(void 0)?b.call(void 0):b():(a.N||(a.N=[]),a.N.push(p(void 0)?w(b,void 0):b))}
D.prototype.w=function(){if(this.N)for(;this.N.length;)this.N.shift()()};
function E(a){a&&"function"==typeof a.dispose&&a.dispose()}
function Vb(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];da(d)?Vb.apply(null,d):E(d)}}
;function F(a){D.call(this);this.i=1;this.f=[];this.g=0;this.b=[];this.ca={};this.j=!!a}
y(F,D);g=F.prototype;g.subscribe=function(a,b,c){var d=this.ca[a];d||(d=this.ca[a]=[]);var e=this.i;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.i=e+3;d.push(e);return e};
g.unsubscribe=function(a,b,c){if(a=this.ca[a]){var d=this.b;if(a=Ma(a,function(a){return d[a+1]==b&&d[a+2]==c}))return this.ha(a)}return!1};
g.ha=function(a){var b=this.b[a];if(b){var c=this.ca[b];0!=this.g?(this.f.push(a),this.b[a+1]=t):(c&&Pa(c,a),delete this.b[a],delete this.b[a+1],delete this.b[a+2])}return!!b};
g.u=function(a,b){var c=this.ca[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.j)for(e=0;e<c.length;e++){var h=c[e];Wb(this.b[h+1],this.b[h+2],d)}else{this.g++;try{for(e=0,f=c.length;e<f;e++)h=c[e],this.b[h+1].apply(this.b[h+2],d)}finally{if(this.g--,0<this.f.length&&0==this.g)for(;c=this.f.pop();)this.ha(c)}}return 0!=e}return!1};
function Wb(a,b,c){Ob(function(){a.apply(b,c)})}
g.clear=function(a){if(a){var b=this.ca[a];b&&(z(b,this.ha,this),delete this.ca[a])}else this.b.length=0,this.ca={}};
g.O=function(a){if(a){var b=this.ca[a];return b?b.length:0}a=0;for(b in this.ca)a+=this.O(b);return a};
g.w=function(){F.B.w.call(this);this.clear();this.f.length=0};var Xb=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};q("yt.config_",Xb,void 0);q("yt.tokens_",window.yt&&window.yt.tokens_||{},void 0);var Yb=window.yt&&window.yt.msgs_||r("window.ytcfg.msgs")||{};q("yt.msgs_",Yb,void 0);function Zb(a){$b(Xb,arguments)}
function G(a,b){return a in Xb?Xb[a]:b}
function H(a,b){ga(a)&&(a=ac(a));return window.setTimeout(a,b)}
function I(a){window.clearTimeout(a)}
function ac(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){throw bc(b),b;}}:a}
function bc(a,b){var c=r("yt.logging.errors.log");c?c(a,b,void 0,void 0,void 0):(c=G("ERRORS",[]),c.push([a,b,void 0,void 0,void 0]),Zb("ERRORS",c))}
function $b(a,b){if(1<b.length){var c=b[0];a[c]=b[1]}else{var d=b[0];for(c in d)a[c]=d[c]}}
var cc=window.performance&&window.performance.timing&&window.performance.now?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()},dc="Microsoft Internet Explorer"==navigator.appName;var ec=r("yt.pubsub.instance_")||new F;F.prototype.subscribe=F.prototype.subscribe;F.prototype.unsubscribeByKey=F.prototype.ha;F.prototype.publish=F.prototype.u;F.prototype.clear=F.prototype.clear;q("yt.pubsub.instance_",ec,void 0);var fc=r("yt.pubsub.subscribedKeys_")||{};q("yt.pubsub.subscribedKeys_",fc,void 0);var gc=r("yt.pubsub.topicToKeys_")||{};q("yt.pubsub.topicToKeys_",gc,void 0);var hc=r("yt.pubsub.isSynchronous_")||{};q("yt.pubsub.isSynchronous_",hc,void 0);
var ic=r("yt.pubsub.skipSubId_")||null;q("yt.pubsub.skipSubId_",ic,void 0);function jc(a,b,c){var d=kc();if(d){var e=d.subscribe(a,function(){if(!ic||ic!=e){var d=arguments,h;h=function(){fc[e]&&b.apply(c||window,d)};
try{hc[a]?h():H(h,0)}catch(k){bc(k)}}},c);
fc[e]=!0;gc[a]||(gc[a]=[]);gc[a].push(e);return e}return 0}
function lc(a){var b=kc();b&&("number"==typeof a?a=[a]:"string"==typeof a&&(a=[parseInt(a,10)]),z(a,function(a){b.unsubscribeByKey(a);delete fc[a]}))}
function J(a,b){var c=kc();return c?c.publish.apply(c,arguments):!1}
function mc(a,b){hc[a]=!0;var c=kc();c&&c.publish.apply(c,arguments);hc[a]=!1}
function nc(a){gc[a]&&(a=gc[a],z(a,function(a){fc[a]&&delete fc[a]}),a.length=0)}
function oc(a){var b=kc();if(b)if(b.clear(a),a)nc(a);else for(var c in gc)nc(c)}
function kc(){return r("yt.pubsub.instance_")}
;function pc(a,b){if(window.spf){var c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(qc,""),c=c.replace(rc,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else sc(a,b)}
function sc(a,b){var c=tc(a),d=document.getElementById(c),e=d&&C(d,"loaded"),f=d&&!e;if(e){b&&b();return}if(b){var e=jc(c,b),h=""+ia(b);uc[h]=e}if(f)return;d=vc(a,c,function(){C(d,"loaded")||(Cb(d,"loaded","true"),J(c),H(na(oc,c),0))})}
function vc(a,b,c){var d=document.createElement("script");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
d.onreadystatechange=function(){switch(d.readyState){case "loaded":case "complete":d.onload()}};
d.src=a;a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(d,a.firstChild);return d}
function wc(a,b){if(a&&b){var c=""+ia(b);(c=uc[c])&&lc(c)}}
function tc(a){var b=document.createElement("a");Bb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Ga(a)}
var qc=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,rc=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/,uc={};var xc=null;function yc(){var a=G("BG_I",null),b=G("BG_IU",null),c=G("BG_P",void 0);b?pc(b,function(){xc=new botguard.bg(c)}):a&&(eval(a),xc=new botguard.bg(c))}
function zc(){return null!=xc}
function Ac(){return xc?xc.invoke():null}
;function Bc(a,b){return Ab(b,null)}
;var Cc="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""};function Dc(){}
Dc.prototype.next=function(){throw Cc;};
Dc.prototype.ma=function(){return this};
function Ec(a){if(a instanceof Dc)return a;if("function"==typeof a.ma)return a.ma(!1);if(da(a)){var b=0,c=new Dc;c.next=function(){for(;;){if(b>=a.length)throw Cc;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function Fc(a,b,c){if(da(a))try{z(a,b,c)}catch(d){if(d!==Cc)throw d;}else{a=Ec(a);try{for(;;)b.call(c,a.next(),void 0,a)}catch(d){if(d!==Cc)throw d;}}}
function Gc(a){if(da(a))return Sa(a);a=Ec(a);var b=[];Fc(a,function(a){b.push(a)});
return b}
;function Hc(a,b){this.f={};this.b=[];this.va=this.g=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof Hc?(c=a.ja(),d=a.P()):(c=cb(a),d=bb(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}
g=Hc.prototype;g.O=function(){return this.g};
g.P=function(){Ic(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.f[this.b[b]]);return a};
g.ja=function(){Ic(this);return this.b.concat()};
g.Va=function(a){for(var b=0;b<this.b.length;b++){var c=this.b[b];if(Jc(this.f,c)&&this.f[c]==a)return!0}return!1};
g.equals=function(a,b){if(this===a)return!0;if(this.g!=a.O())return!1;var c=b||Kc;Ic(this);for(var d,e=0;d=this.b[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function Kc(a,b){return a===b}
g.isEmpty=function(){return 0==this.g};
g.clear=function(){this.f={};this.va=this.g=this.b.length=0};
g.remove=function(a){return Jc(this.f,a)?(delete this.f[a],this.g--,this.va++,this.b.length>2*this.g&&Ic(this),!0):!1};
function Ic(a){if(a.g!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Jc(a.f,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.g!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Jc(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
g.get=function(a,b){return Jc(this.f,a)?this.f[a]:b};
g.set=function(a,b){Jc(this.f,a)||(this.g++,this.b.push(a),this.va++);this.f[a]=b};
g.forEach=function(a,b){for(var c=this.ja(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
g.clone=function(){return new Hc(this)};
g.ma=function(a){Ic(this);var b=0,c=this.va,d=this,e=new Dc;e.next=function(){if(c!=d.va)throw Error("The map has changed since the iterator was created");if(b>=d.b.length)throw Cc;var e=d.b[b++];return a?e:d.f[e]};
return e};
function Jc(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
;function Lc(a){return a.O&&"function"==typeof a.O?a.O():da(a)||v(a)?a.length:Za(a)}
function Mc(a){if(a.P&&"function"==typeof a.P)return a.P();if(v(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return bb(a)}
function Nc(a){if(a.ja&&"function"==typeof a.ja)return a.ja();if(!a.P||"function"!=typeof a.P){if(da(a)||v(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return cb(a)}}
function Oc(a,b,c){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,c);else if(da(a)||v(a))z(a,b,c);else for(var d=Nc(a),e=Mc(a),f=e.length,h=0;h<f;h++)b.call(c,e[h],d&&d[h],a)}
function Qc(a,b){if("function"==typeof a.every)return a.every(b,void 0);if(da(a)||v(a))return La(a,b,void 0);for(var c=Nc(a),d=Mc(a),e=d.length,f=0;f<e;f++)if(!b.call(void 0,d[f],c&&c[f],a))return!1;return!0}
;function Rc(a){this.b=new Hc;a&&Sc(this,a)}
function Tc(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+ia(a):b.substr(0,1)+a}
g=Rc.prototype;g.O=function(){return this.b.O()};
function Sc(a,b){for(var c=Mc(b),d=c.length,e=0;e<d;e++){var f=c[e];a.b.set(Tc(f),f)}}
g.remove=function(a){return this.b.remove(Tc(a))};
g.clear=function(){this.b.clear()};
g.isEmpty=function(){return this.b.isEmpty()};
g.contains=function(a){a=Tc(a);return Jc(this.b.f,a)};
g.P=function(){return this.b.P()};
g.clone=function(){return new Rc(this)};
g.equals=function(a){return this.O()==Lc(a)&&Uc(this,a)};
function Uc(a,b){var c=Lc(b);if(a.O()>c)return!1;!(b instanceof Rc)&&5<c&&(b=new Rc(b));return Qc(a,function(a){var c=b;return c.contains&&"function"==typeof c.contains?c.contains(a):c.Va&&"function"==typeof c.Va?c.Va(a):da(c)||v(c)?A(c,a):ab(c,a)})}
g.ma=function(){return this.b.ma(!1)};function Vc(){return B("iPhone")&&!B("iPod")&&!B("iPad")}
;function Wc(a){Wc[" "](a);return a}
Wc[" "]=t;function Xc(a,b){var c=Yc;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)}
;var Zc=B("Opera"),K=B("Trident")||B("MSIE"),$c=B("Edge"),ad=B("Gecko")&&!(-1!=lb.toLowerCase().indexOf("webkit")&&!B("Edge"))&&!(B("Trident")||B("MSIE"))&&!B("Edge"),bd=-1!=lb.toLowerCase().indexOf("webkit")&&!B("Edge"),cd=B("Windows");function dd(){var a=l.document;return a?a.documentMode:void 0}
var ed;a:{var fd="",gd=function(){var a=lb;if(ad)return/rv\:([^\);]+)(\)|;)/.exec(a);if($c)return/Edge\/([\d\.]+)/.exec(a);if(K)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(bd)return/WebKit\/(\S+)/.exec(a);if(Zc)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
gd&&(fd=gd?gd[1]:"");if(K){var hd=dd();if(null!=hd&&hd>parseFloat(fd)){ed=String(hd);break a}}ed=fd}var id=ed,Yc={};function jd(a){return Xc(a,function(){return 0<=Ea(id,a)})}
function kd(a){return Number(ld)>=a}
var md=l.document,ld=md&&K?dd()||("CSS1Compat"==md.compatMode?parseInt(id,10):5):void 0;function nd(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}
function od(a){return eval("("+a+")")}
function L(a){return pd(new qd(void 0),a)}
function qd(a){this.b=a}
function pd(a,b){var c=[];rd(a,b,c);return c.join("")}
function rd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(u(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],rd(a,a.b?a.b.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),sd(d,c),c.push(":"),rd(a,a.b?a.b.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":sd(b,
c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var td={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},ud=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function sd(a,b){b.push('"',a.replace(ud,function(a){var b=td[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),td[a]=b);return b}),'"')}
;var vd=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function wd(a){return a?decodeURI(a):a}
function xd(a,b){return b.match(vd)[a]||null}
function yd(a,b){if(a)for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f,h=null;0<=e?(f=c[d].substring(0,e),h=c[d].substring(e+1)):f=c[d];b(f,h?ra(h):"")}}
function zd(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=void 0)}return a.join("")}
function Ad(a,b,c){if(u(b))for(var d=0;d<b.length;d++)Ad(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}
function Bd(a,b,c){for(c=c||0;c<b.length;c+=2)Ad(b[c],b[c+1],a);return a}
function Cd(a,b){for(var c in b)Ad(c,b[c],a);return a}
function Dd(a){a=Cd([],a);a[0]="";return a.join("")}
function Ed(a,b){return zd(2==arguments.length?Bd([a],arguments[1],0):Bd([a],arguments,1))}
function Fd(a,b){return zd(Cd([a],b))}
;function Gd(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=ra(e[0]||""),e=ra(e[1]||"");f in b?u(b[f])?Ta(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
function Hd(a,b){var c=a.split("#",2);a=c[0];var c=1<c.length?"#"+c[1]:"",d=a.split("?",2);a=d[0];var d=Gd(d[1]||""),e;for(e in b)d[e]=b[e];return Fd(a,d)+c}
;var Id=null;"undefined"!=typeof XMLHttpRequest?Id=function(){return new XMLHttpRequest}:"undefined"!=typeof ActiveXObject&&(Id=function(){return new ActiveXObject("Microsoft.XMLHTTP")});
function Jd(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function Kd(a,b,c,d,e,f,h){function k(){4==(m&&"readyState"in m?m.readyState:0)&&b&&ac(b)(m)}
var m=Id&&Id();if(!("open"in m))return null;"onloadend"in m?m.addEventListener("loadend",k,!1):m.onreadystatechange=k;c=(c||"GET").toUpperCase();d=d||"";m.open(c,a,!0);f&&(m.responseType=f);h&&(m.withCredentials=!0);f="POST"==c;if(e=Ld(a,e))for(var n in e)m.setRequestHeader(n,e[n]),"content-type"==n.toLowerCase()&&(f=!1);f&&m.setRequestHeader("Content-Type","application/x-www-form-urlencoded");m.send(d);return m}
function Ld(a,b){b=b||{};var c;c||(c=window.location.href);var d=xd(1,a),e=wd(xd(3,a));d&&e?(d=c,c=a.match(vd),d=d.match(vd),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?wd(xd(3,c))==e&&(Number(xd(4,c))||null)==(Number(xd(4,a))||null):!0;for(var f in Md){if((e=d=G(Md[f]))&&!(e=c)){var e=f,h=G("CORS_HEADER_WHITELIST")||{},k=wd(xd(3,a));e=k?(h=h[k])?A(h,e):!1:!0}e&&(b[f]=d)}return b}
function Nd(a,b){var c=G("XSRF_FIELD_NAME",void 0),d;b.headers&&(d=b.headers["Content-Type"]);return!b.Pe&&(!wd(xd(3,a))||b.withCredentials||wd(xd(3,a))==document.location.hostname)&&"POST"==b.method&&(!d||"application/x-www-form-urlencoded"==d)&&!(b.S&&b.S[c])}
function Od(a,b){var c=b.format||"JSON";b.Qe&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var d=G("XSRF_FIELD_NAME",void 0),e=G("XSRF_TOKEN",void 0),f=b.Rb;f&&(f[d]&&delete f[d],a=Hd(a,f||{}));var h=b.postBody||"",f=b.S;Nd(a,b)&&(f||(f={}),f[d]=e);f&&v(h)&&(d=Gd(h),kb(d,f),h=b.Zd&&"JSON"==b.Zd?JSON.stringify(d):Dd(d));var k=!1,m,n=Kd(a,function(a){if(!k){k=!0;m&&I(m);var d=Jd(a),e=null;if(d||400<=a.status&&500>a.status)e=
Pd(c,a,b.Oe);if(d)a:{switch(c){case "XML":d=0==parseInt(e&&e.return_code,10);break a;case "RAW":d=!0;break a}d=!!e}var e=e||{},f=b.context||l;d?b.ba&&b.ba.call(f,a,e):b.onError&&b.onError.call(f,a,e);b.Nb&&b.Nb.call(f,a,e)}},b.method,h,b.headers,b.responseType,b.withCredentials);
b.Da&&0<b.timeout&&(m=H(function(){k||(k=!0,n.abort(),I(m),b.Da.call(b.context||l,n))},b.timeout));
return n}
function Pd(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=od(a));break;case "XML":if(b=(b=b.responseXML)?Qd(b):null)d={},z(b.getElementsByTagName("*"),function(a){d[a.tagName]=Rd(a)})}c&&Sd(d);
return d}
function Sd(a){if(ha(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);c?a[b]=Bc(qb("HTML that is escaped and sanitized server-side and passed through yt.net.ajax"),a[b]):Sd(a[b])}}
function Qd(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function Rd(a){var b="";z(a.childNodes,function(a){b+=a.nodeValue});
return b}
var Md={"X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"};var Td={},Ud=0;function Vd(a,b){isNaN(b)&&(b=void 0);var c=r("yt.scheduler.instance.addJob");return c?c(a,1,b):void 0===b?(a(),NaN):H(a,b||0)}
;var Wd=[],Xd=!1;function Yd(){function a(){Xd=!0;"google_ad_status"in window?Zb("DCLKSTAT",1):Zb("DCLKSTAT",2)}
pc("//static.doubleclick.net/instream/ad_status.js",a);Wd.push(Vd(function(){Xd||"google_ad_status"in window||(wc("//static.doubleclick.net/instream/ad_status.js",a),Zb("DCLKSTAT",3))},5E3))}
function Zd(){return parseInt(G("DCLKSTAT",0),10)}
;function $d(a){if(a.classList)return a.classList;a=a.className;return v(a)&&a.match(/\S+/g)||[]}
function ae(a,b){return a.classList?a.classList.contains(b):A($d(a),b)}
function be(a,b){a.classList?a.classList.add(b):ae(a,b)||(a.className+=0<a.className.length?" "+b:b)}
function ce(a,b){a.classList?a.classList.remove(b):ae(a,b)&&(a.className=Ia($d(a),function(a){return a!=b}).join(" "))}
function de(a,b,c){c?be(a,b):ce(a,b)}
;function ee(a,b){this.x=p(a)?a:0;this.y=p(b)?b:0}
ee.prototype.clone=function(){return new ee(this.x,this.y)};
ee.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
ee.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
ee.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function fe(a,b){this.width=a;this.height=b}
g=fe.prototype;g.clone=function(){return new fe(this.width,this.height)};
g.Yc=function(){return this.width*this.height};
g.aspectRatio=function(){return this.width/this.height};
g.isEmpty=function(){return!this.Yc()};
g.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
g.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
g.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};!ad&&!K||K&&kd(9)||ad&&jd("1.9.1");var ge=K&&!jd("9");function he(a){return a?new ie(je(a)):pa||(pa=new ie)}
function ke(a){var b=document;return v(a)?b.getElementById(a):a}
function le(a){var b=document;return b.querySelectorAll&&b.querySelector?b.querySelectorAll("."+a):me(a)}
function me(a){var b,c,d,e;b=document;if(b.querySelectorAll&&b.querySelector&&a)return b.querySelectorAll(""+(a?"."+a:""));if(a&&b.getElementsByClassName){var f=b.getElementsByClassName(a);return f}f=b.getElementsByTagName("*");if(a){e={};for(c=d=0;b=f[c];c++){var h=b.className;"function"==typeof h.split&&A(h.split(/\s+/),a)&&(e[d++]=b)}e.length=d;return e}return f}
function ne(a){var b=a.scrollingElement?a.scrollingElement:!bd&&oe(a)?a.documentElement:a.body||a.documentElement;a=a.parentWindow||a.defaultView;return K&&jd("10")&&a.pageYOffset!=b.scrollTop?new ee(b.scrollLeft,b.scrollTop):new ee(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop)}
function oe(a){return"CSS1Compat"==a.compatMode}
function pe(a){for(var b;b=a.firstChild;)a.removeChild(b)}
function qe(a){if(!a)return null;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null}
function re(a){if(!a)return null;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a}
function je(a){return 9==a.nodeType?a:a.ownerDocument||a.document}
function se(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{pe(a);var c=je(a);a.appendChild(c.createTextNode(String(b)))}}
var te={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},ue={IMG:" ",BR:"\n"};function ve(a){if(ge&&null!==a&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];we(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");ge||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a}
function we(a,b,c){if(!(a.nodeName in te))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in ue)b.push(ue[a.nodeName]);else for(a=a.firstChild;a;)we(a,b,c),a=a.nextSibling}
function xe(a){var b=ye.Oc;return b?ze(a,function(a){return!b||v(a.className)&&A(a.className.split(/\s+/),b)},!0,void 0):null}
function ze(a,b,c,d){c||(a=a.parentNode);for(c=0;a&&(null==d||c<=d);){if(b(a))return a;a=a.parentNode;c++}return null}
function ie(a){this.b=a||l.document||document}
g=ie.prototype;g.getElementsByTagName=function(a,b){return(b||this.b).getElementsByTagName(a)};
g.createElement=function(a){return this.b.createElement(String(a))};
g.appendChild=function(a,b){a.appendChild(b)};
g.isElement=function(a){return ha(a)&&1==a.nodeType};
g.contains=function(a,b){if(!a||!b)return!1;if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||!!(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};var Ae=r("yt.dom.getNextId_");if(!Ae){Ae=function(){return++Be};
q("yt.dom.getNextId_",Ae,void 0);var Be=0}function Ce(){var a=document,b;Ka(["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"],function(c){b=a[c];return!!b});
return b}
;function De(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=null;if(a=a||window.event){this.event=a;for(var b in a)b in Ee||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:"mouseout"==
this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey}}
De.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
De.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
De.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};
var Ee={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};var eb=r("yt.events.listeners_")||{};q("yt.events.listeners_",eb,void 0);var Fe=r("yt.events.counter_")||{count:0};q("yt.events.counter_",Fe,void 0);function Ge(a,b,c,d){a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return db(function(e){return e[0]==a&&e[1]==b&&e[2]==c&&e[4]==!!d})}
function M(a,b,c,d){if(!a||!a.addEventListener&&!a.attachEvent)return"";d=!!d;var e=Ge(a,b,c,d);if(e)return e;var e=++Fe.count+"",f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document),h;h=f?function(d){d=new De(d);if(!ze(d.relatedTarget,function(b){return b==a},!0))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new De(b);
b.currentTarget=a;return c.call(a,b)};
h=ac(h);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),a.addEventListener(b,h,d)):a.attachEvent("on"+b,h);eb[e]=[a,b,c,h,d];return e}
function He(a){a&&("string"==typeof a&&(a=[a]),z(a,function(a){if(a in eb){var c=eb[a],d=c[0],e=c[1],f=c[3],c=c[4];d.removeEventListener?d.removeEventListener(e,f,c):d.detachEvent&&d.detachEvent("on"+e,f);delete eb[a]}}))}
;function Ie(){if(null==r("_lact",window)){var a=parseInt(G("LACT"),10),a=isFinite(a)?x()-Math.max(a,0):-1;q("_lact",a,window);-1==a&&Je();M(document,"keydown",Je);M(document,"keyup",Je);M(document,"mousedown",Je);M(document,"mouseup",Je);jc("page-mouse",Je);jc("page-scroll",Je);jc("page-resize",Je)}}
function Je(){null==r("_lact",window)&&(Ie(),r("_lact",window));var a=x();q("_lact",a,window);J("USER_ACTIVE")}
function Ke(){var a=r("_lact",window);return null==a?-1:Math.max(x()-a,0)}
;function Le(){}
;var Me={};function Ne(a){this.b=a||{cookie:""}}
var Oe=/\s*;\s*/;g=Ne.prototype;g.isEnabled=function(){return navigator.cookieEnabled};
g.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');p(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(x()+1E3*c)).toUTCString();this.b.cookie=a+"="+b+e+d+c+f};
g.get=function(a,b){for(var c=a+"=",d=(this.b.cookie||"").split(Oe),e=0,f;f=d[e];e++){if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
g.remove=function(a,b,c){var d=p(this.get(a));this.set(a,"",0,b,c);return d};
g.ja=function(){return Pe(this).keys};
g.P=function(){return Pe(this).values};
g.isEmpty=function(){return!this.b.cookie};
g.O=function(){return this.b.cookie?(this.b.cookie||"").split(Oe).length:0};
g.Va=function(a){for(var b=Pe(this).values,c=0;c<b.length;c++)if(b[c]==a)return!0;return!1};
g.clear=function(){for(var a=Pe(this).keys,b=a.length-1;0<=b;b--)this.remove(a[b])};
function Pe(a){a=(a.b.cookie||"").split(Oe);for(var b=[],c=[],d,e,f=0;e=a[f];f++)d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));return{keys:b,values:c}}
var Qe=new Ne("undefined"==typeof document?null:document);Qe.f=3950;function Re(a,b,c){Qe.set(""+a,b,c,"/","youtube.com")}
;function Se(a,b,c){var d=G("EVENT_ID");d&&(b||(b={}),b.ei||(b.ei=d));if(b){var d=G("VALID_SESSION_TEMPDATA_DOMAINS",[]),e=wd(xd(3,window.location.href));e&&d.push(e);e=wd(xd(3,a));if(A(d,e)||!e&&0==a.lastIndexOf("/",0)){var f=a.match(vd),d=f[5],e=f[6],f=f[7],h="";d&&(h+=d);e&&(h+="?"+e);f&&(h+="#"+f);d=h;e=d.indexOf("#");if(d=0>e?d:d.substr(0,e))d="ST-"+Ga(d).toString(36),e=b?Dd(b):"",Re(d,e,5),b&&(b=b.itct||b.ved,d=r("yt.logging.screenreporter.storeParentElement"),b&&d&&d(new Le))}}if(c)return!1;
(window.ytspf||{}).enabled?spf.navigate(a):(c=window.location,a=Fd(a,{})+"",a=a instanceof rb?a:vb(a),c.href=tb(a));return!0}
;function Te(a){a=a||{};this.url=a.url||"";this.urlV9As2=a.url_v9as2||"";this.args=a.args||hb(Ue);this.assets=a.assets||{};this.attrs=a.attrs||hb(Ve);this.params=a.params||hb(We);this.minVersion=a.min_version||"8.0.0";this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
var Ue={enablejsapi:1},Ve={},We={allowscriptaccess:"always",allowfullscreen:"true",bgcolor:"#000000"};function Xe(a){a instanceof Te||(a=new Te(a));return a}
Te.prototype.clone=function(){var a=new Te,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==ca(c)?a[b]=hb(c):a[b]=c}return a};function Ye(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}
g=Ye.prototype;g.getHeight=function(){return this.bottom-this.top};
g.clone=function(){return new Ye(this.top,this.right,this.bottom,this.left)};
g.contains=function(a){return this&&a?a instanceof Ye?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};
g.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
g.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
g.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};function Ze(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}
g=Ze.prototype;g.clone=function(){return new Ze(this.left,this.top,this.width,this.height)};
g.contains=function(a){return a instanceof ee?a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height:this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height};
g.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
g.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
g.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function $e(a,b){var c=je(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""}
function af(a,b){return $e(a,b)||(a.currentStyle?a.currentStyle[b]:null)||a.style&&a.style[b]}
function bf(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}K&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function cf(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a}
function df(a){var b=ef;if("none"!=af(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a}
function ef(a){var b=a.offsetWidth,c=a.offsetHeight,d=bd&&!b&&!c;return p(b)&&!d||!a.getBoundingClientRect?new fe(b,c):(a=bf(a),new fe(a.right-a.left,a.bottom-a.top))}
function ff(a,b){if(/^\d+px?$/.test(b))return parseInt(b,10);var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b;var e=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return e}
function gf(a,b){var c=a.currentStyle?a.currentStyle[b]:null;return c?ff(a,c):0}
var hf={thin:2,medium:4,thick:6};function jf(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:null))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:null;return c in hf?hf[c]:ff(a,c)}
;var kf=B("Firefox"),lf=Vc()||B("iPod"),mf=B("iPad"),nf=B("Android")&&!(ob()||B("Firefox")||B("Opera")||B("Silk")),of=ob(),pf=B("Safari")&&!(ob()||B("Coast")||B("Opera")||B("Edge")||B("Silk")||B("Android"))&&!(Vc()||B("iPad")||B("iPod"));function qf(){this.g=this.f=this.b=0;this.i="";var a=r("window.navigator.plugins"),b=r("window.navigator.mimeTypes"),a=a&&a["Shockwave Flash"],b=b&&b["application/x-shockwave-flash"],b=a&&b&&b.enabledPlugin&&a.description||"";if(a=b){var c=a.indexOf("Shockwave Flash");0<=c&&(a=a.substr(c+15));for(var c=a.split(" "),d="",a="",e=0,f=c.length;e<f;e++)if(d)if(a)break;else a=c[e];else d=c[e];d=d.split(".");c=parseInt(d[0],10)||0;d=parseInt(d[1],10)||0;e=0;if("r"==a.charAt(0)||"d"==a.charAt(0))e=parseInt(a.substr(1),
10)||0;a=[c,d,e]}else a=[0,0,0];this.i=b;b=a;this.b=b[0];this.f=b[1];this.g=b[2];if(0>=this.b){var h,k,m,n;if(dc)try{h=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(fa){h=null}else m=document.body,n=document.createElement("object"),n.setAttribute("type","application/x-shockwave-flash"),h=m.appendChild(n);if(h&&"GetVariable"in h)try{k=h.GetVariable("$version")}catch(fa){k=""}m&&n&&m.removeChild(n);(h=k||"")?(h=h.split(" ")[1].split(","),h=[parseInt(h[0],10)||0,parseInt(h[1],10)||0,parseInt(h[2],
10)||0]):h=[0,0,0];this.b=h[0];this.f=h[1];this.g=h[2]}}
ba(qf);function rf(a,b,c,d){b="string"==typeof b?b.split("."):[b,c,d];b[0]=parseInt(b[0],10)||0;b[1]=parseInt(b[1],10)||0;b[2]=parseInt(b[2],10)||0;return a.b>b[0]||a.b==b[0]&&a.f>b[1]||a.b==b[0]&&a.f==b[1]&&a.g>=b[2]}
;function sf(a){if(window.spf){var b=a.match(tf);spf.style.load(a,b?b[1]:"",void 0)}else uf(a)}
function uf(a){var b=vf(a),c=document.getElementById(b),d=c&&C(c,"loaded");d||c&&!d||(c=wf(a,b,function(){C(c,"loaded")||(Cb(c,"loaded","true"),J(b),H(na(oc,b),0))}))}
function wf(a,b,c){var d=document.createElement("link");d.id=b;d.rel="stylesheet";d.onload=function(){c&&setTimeout(c,0)};
Bb(d,a);(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function vf(a){var b=document.createElement("a");Bb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Ga(a)}
var tf=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;var xf;var yf=lb,yf=yf.toLowerCase();if(-1!=yf.indexOf("android")){var zf=yf.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/);if(zf)xf=Number(zf[1]);else{var Af={cupcake:1.5,donut:1.6,eclair:2,froyo:2.2,gingerbread:2.3,honeycomb:3,"ice cream sandwich":4,jellybean:4.1},Bf=yf.match("("+cb(Af).join("|")+")");xf=Bf?Af[Bf[0]]:0}}else xf=void 0;var Cf=['video/mp4; codecs="avc1.42001E, mp4a.40.2"','video/webm; codecs="vp8.0, vorbis"'],Df=['audio/mp4; codecs="mp4a.40.2"'];function Ef(a){D.call(this);this.b=[];this.f=a||this}
y(Ef,D);function Ff(a,b,c,d){d=ac(w(d,a.f));b.addEventListener(c,d);a.b.push({target:b,name:c,zb:d})}
Ef.prototype.tb=function(a){for(var b=0;b<this.b.length;b++)if(this.b[b]==a){this.b.splice(b,1);a.target.removeEventListener(a.name,a.zb);break}};
function Gf(a){for(;a.b.length;){var b=a.b.pop();b.target.removeEventListener(b.name,b.zb)}}
Ef.prototype.w=function(){Gf(this);Ef.B.w.call(this)};function Hf(a){return G("EXPERIMENT_FLAGS",{})[a]}
;function If(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0}
;function Jf(a,b){this.b=0;this.l=void 0;this.i=this.f=this.g=null;this.j=this.o=!1;if(a!=t)try{var c=this;a.call(b,function(a){Kf(c,2,a)},function(a){Kf(c,3,a)})}catch(d){Kf(this,3,d)}}
function Lf(){this.next=this.context=this.f=this.g=this.b=null;this.i=!1}
Lf.prototype.reset=function(){this.context=this.f=this.g=this.b=null;this.i=!1};
var Mf=new Jb(function(){return new Lf},function(a){a.reset()},100);
function Nf(a,b,c){var d=Mf.get();d.g=a;d.f=b;d.context=c;return d}
function Of(a){if(a instanceof Jf)return a;var b=new Jf(t);Kf(b,2,a);return b}
function Pf(a){return new Jf(function(b,c){c(a)})}
Jf.prototype.then=function(a,b,c){return Qf(this,ga(a)?a:null,ga(b)?b:null,c)};
If(Jf);Jf.prototype.cancel=function(a){0==this.b&&Ob(function(){var b=new Rf(a);Sf(this,b)},this)};
function Sf(a,b){if(0==a.b)if(a.g){var c=a.g;if(c.f){for(var d=0,e=null,f=null,h=c.f;h&&(h.i||(d++,h.b==a&&(e=h),!(e&&1<d)));h=h.next)e||(f=h);e&&(0==c.b&&1==d?Sf(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):Tf(c),Uf(c,e,3,b)))}a.g=null}else Kf(a,3,b)}
function Vf(a,b){a.f||2!=a.b&&3!=a.b||Wf(a);a.i?a.i.next=b:a.f=b;a.i=b}
function Qf(a,b,c,d){var e=Nf(null,null,null);e.b=new Jf(function(a,h){e.g=b?function(c){try{var e=b.call(d,c);a(e)}catch(n){h(n)}}:a;
e.f=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof Rf?h(b):a(e)}catch(n){h(n)}}:h});
e.b.g=a;Vf(a,e);return e.b}
Jf.prototype.N=function(a){this.b=0;Kf(this,2,a)};
Jf.prototype.D=function(a){this.b=0;Kf(this,3,a)};
function Kf(a,b,c){if(0==a.b){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.b=1;var d;a:{var e=c,f=a.N,h=a.D;if(e instanceof Jf)Vf(e,Nf(f||t,h||null,a)),d=!0;else{var k;if(e)try{k=!!e.$goog_Thenable}catch(n){k=!1}else k=!1;if(k)e.then(f,h,a),d=!0;else{if(ha(e))try{var m=e.then;if(ga(m)){Xf(e,m,f,h,a);d=!0;break a}}catch(n){h.call(a,n);d=!0;break a}d=!1}}}d||(a.l=c,a.b=b,a.g=null,Wf(a),3!=b||c instanceof Rf||Yf(a,c))}}
function Xf(a,b,c,d,e){function f(a){k||(k=!0,d.call(e,a))}
function h(a){k||(k=!0,c.call(e,a))}
var k=!1;try{b.call(a,h,f)}catch(m){f(m)}}
function Wf(a){a.o||(a.o=!0,Ob(a.A,a))}
function Tf(a){var b=null;a.f&&(b=a.f,a.f=b.next,b.next=null);a.f||(a.i=null);return b}
Jf.prototype.A=function(){for(var a;a=Tf(this);)Uf(this,a,this.b,this.l);this.o=!1};
function Uf(a,b,c,d){if(3==c&&b.f&&!b.i)for(;a&&a.j;a=a.g)a.j=!1;if(b.b)b.b.g=null,Zf(b,c,d);else try{b.i?b.g.call(b.context):Zf(b,c,d)}catch(e){$f.call(null,e)}Kb(Mf,b)}
function Zf(a,b,c){2==b?a.g.call(a.context,c):a.f&&a.f.call(a.context,c)}
function Yf(a,b){a.j=!0;Ob(function(){a.j&&$f.call(null,b)})}
var $f=Gb;function Rf(a){oa.call(this,a)}
y(Rf,oa);Rf.prototype.name="cancel";function ag(){this.b={apiaryHost:G("APIARY_HOST",void 0),Wc:G("APIARY_HOST_FIRSTPARTY",void 0),gapiHintOverride:G("GAPI_HINT_OVERRIDE"),gapiHintParams:G("GAPI_HINT_PARAMS",void 0),innertubeApiKey:G("INNERTUBE_API_KEY",void 0),innertubeApiVersion:G("INNERTUBE_API_VERSION",void 0),od:G("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:G("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),qd:G("INNERTUBE_CONTEXT_HL",void 0),pd:G("INNERTUBE_CONTEXT_GL",void 0),Se:G("XHR_APIARY_HOST",void 0)};
bg||(bg=cg(this.b))}
var bg=null;function cg(a){return(new Jf(function(b){pc(G("GAPI_LOADER_URL",void 0),function(){try{r("yt.gapi.load")("client",{gapiHintOverride:a.gapiHintOverride,_c:{jsl:{h:a.gapiHintParams}},callback:b})}catch(c){bc(c)}})})).then(function(){})}
ag.prototype.f=function(){var a=r("gapi.config.update");a("googleapis.config/auth/useFirstPartyAuth",!0);var b=this.b.apiaryHost;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root",(-1==b.indexOf("://")?"//":"")+b);b=this.b.Wc;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root-1p",(-1==b.indexOf("://")?"//":"")+b);a("googleapis.config/sessionIndex",G("SESSION_INDEX"));r("gapi.client.setApiKey")(this.b.innertubeApiKey)};
function dg(a,b,c){var d={},e,f=!1;0<d.timeout&&(e=H(function(){f||(f=!0,d.Da&&d.Da())},d.timeout));
eg(a,b,c,function(a){if(!f)if(f=!0,e&&I(e),a)d.ba&&d.ba(a);else if(d.onError)d.onError()})}
function eg(a,b,c,d){var e={path:"/youtubei/"+a.b.innertubeApiVersion+"/"+b,headers:{"X-Goog-Visitor-Id":G("VISITOR_DATA")},method:"POST",body:L(c)},f=w(a.f,a);bg.then(function(){f();r("gapi.client.request")(e).execute(d||t)})}
;var fg={log_event:"events",log_interaction:"interactions"},gg={},hg={},ig=0,jg=r("yt.logging.transport.logsQueue_")||{};q("yt.logging.transport.logsQueue_",jg,void 0);
function kg(){I(ig);if(!fb(jg)){for(var a in jg){var b=gg[a];if(!b){b=hg[a];if(!b)continue;b=new b;gg[a]=b}var c=b.b,c={client:{hl:c.qd,gl:c.pd,clientName:c.od,clientVersion:c.innertubeContextClientVersion}};G("DELEGATED_SESSION_ID")&&(c.user={onBehalfOfUser:G("DELEGATED_SESSION_ID")});c={context:c};c.requestTimeMs=Math.round(cc());c[fg[a]]=jg[a];dg(b,a,c);delete jg[a]}fb(jg)||lg()}}
function lg(){I(ig);ig=H(kg,G("LOGGING_BATCH_TIMEOUT",1E4))}
;function mg(a,b,c){var d={};d.eventTimeMs=Math.round(c||cc());d[a]=b;jg.log_event=jg.log_event||[];a=jg.log_event;a.push(d);hg.log_event=ag;20<=a.length?kg():lg()}
;function ng(a,b){this.f=this.A=this.i="";this.l=null;this.j=this.b="";this.o=!1;var c;a instanceof ng?(this.o=p(b)?b:a.o,og(this,a.i),this.A=a.A,pg(this,a.f),qg(this,a.l),this.b=a.b,rg(this,a.g.clone()),this.j=a.j):a&&(c=String(a).match(vd))?(this.o=!!b,og(this,c[1]||"",!0),this.A=sg(c[2]||""),pg(this,c[3]||"",!0),qg(this,c[4]),this.b=sg(c[5]||"",!0),rg(this,c[6]||"",!0),this.j=sg(c[7]||"")):(this.o=!!b,this.g=new tg(null,0,this.o))}
ng.prototype.toString=function(){var a=[],b=this.i;b&&a.push(ug(b,vg,!0),":");var c=this.f;if(c||"file"==b)a.push("//"),(b=this.A)&&a.push(ug(b,vg,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.l,null!=c&&a.push(":",String(c));if(c=this.b)this.f&&"/"!=c.charAt(0)&&a.push("/"),a.push(ug(c,"/"==c.charAt(0)?wg:xg,!0));(c=this.g.toString())&&a.push("?",c);(c=this.j)&&a.push("#",ug(c,yg));return a.join("")};
ng.prototype.resolve=function(a){var b=this.clone(),c=!!a.i;c?og(b,a.i):c=!!a.A;c?b.A=a.A:c=!!a.f;c?pg(b,a.f):c=null!=a.l;var d=a.b;if(c)qg(b,a.l);else if(c=!!a.b){if("/"!=d.charAt(0))if(this.f&&!this.b)d="/"+d;else{var e=b.b.lastIndexOf("/");-1!=e&&(d=b.b.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(-1!=e.indexOf("./")||-1!=e.indexOf("/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],h=0;h<e.length;){var k=e[h++];"."==k?d&&h==e.length&&f.push(""):".."==k?((1<f.length||1==f.length&&
""!=f[0])&&f.pop(),d&&h==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?b.b=d:c=""!==a.g.toString();c?rg(b,sg(a.g.toString())):c=!!a.j;c&&(b.j=a.j);return b};
ng.prototype.clone=function(){return new ng(this)};
function og(a,b,c){a.i=c?sg(b,!0):b;a.i&&(a.i=a.i.replace(/:$/,""))}
function pg(a,b,c){a.f=c?sg(b,!0):b}
function qg(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.l=b}else a.l=null}
function rg(a,b,c){b instanceof tg?(a.g=b,zg(a.g,a.o)):(c||(b=ug(b,Ag)),a.g=new tg(b,0,a.o))}
function N(a,b,c){a.g.set(b,c)}
function Bg(a,b,c){u(c)||(c=[String(c)]);Cg(a.g,b,c)}
function Dg(a){N(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^x()).toString(36));return a}
function Eg(a){return a instanceof ng?a.clone():new ng(a,void 0)}
function Fg(a,b,c,d){var e=new ng(null,void 0);a&&og(e,a);b&&pg(e,b);c&&qg(e,c);d&&(e.b=d);return e}
function sg(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}
function ug(a,b,c){return v(a)?(a=encodeURI(a).replace(b,Gg),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}
function Gg(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}
var vg=/[#\/\?@]/g,xg=/[\#\?:]/g,wg=/[\#\?]/g,Ag=/[\#\?@]/g,yg=/#/g;function tg(a,b,c){this.f=this.b=null;this.g=a||null;this.i=!!c}
function Hg(a){a.b||(a.b=new Hc,a.f=0,a.g&&yd(a.g,function(b,c){Ig(a,ra(b),c)}))}
g=tg.prototype;g.O=function(){Hg(this);return this.f};
function Ig(a,b,c){Hg(a);a.g=null;b=Jg(a,b);var d=a.b.get(b);d||a.b.set(b,d=[]);d.push(c);a.f=a.f+1}
g.remove=function(a){Hg(this);a=Jg(this,a);return Jc(this.b.f,a)?(this.g=null,this.f=this.f-this.b.get(a).length,this.b.remove(a)):!1};
g.clear=function(){this.b=this.g=null;this.f=0};
g.isEmpty=function(){Hg(this);return 0==this.f};
function Kg(a,b){Hg(a);b=Jg(a,b);return Jc(a.b.f,b)}
g.Va=function(a){var b=this.P();return A(b,a)};
g.ja=function(){Hg(this);for(var a=this.b.P(),b=this.b.ja(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
g.P=function(a){Hg(this);var b=[];if(v(a))Kg(this,a)&&(b=Ra(b,this.b.get(Jg(this,a))));else{a=this.b.P();for(var c=0;c<a.length;c++)b=Ra(b,a[c])}return b};
g.set=function(a,b){Hg(this);this.g=null;a=Jg(this,a);Kg(this,a)&&(this.f=this.f-this.b.get(a).length);this.b.set(a,[b]);this.f=this.f+1;return this};
g.get=function(a,b){var c=a?this.P(a):[];return 0<c.length?String(c[0]):b};
function Cg(a,b,c){a.remove(b);0<c.length&&(a.g=null,a.b.set(Jg(a,b),Sa(c)),a.f=a.f+c.length)}
g.toString=function(){if(this.g)return this.g;if(!this.b)return"";for(var a=[],b=this.b.ja(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.P(d),f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="="+encodeURIComponent(String(d[f])));a.push(h)}return this.g=a.join("&")};
g.clone=function(){var a=new tg;a.g=this.g;this.b&&(a.b=this.b.clone(),a.f=this.f);return a};
function Jg(a,b){var c=String(b);a.i&&(c=c.toLowerCase());return c}
function zg(a,b){b&&!a.i&&(Hg(a),a.g=null,a.b.forEach(function(a,b){var e=b.toLowerCase();b!=e&&(this.remove(b),Cg(this,e,a))},a));
a.i=b}
g.extend=function(a){for(var b=0;b<arguments.length;b++)Oc(arguments[b],function(a,b){Ig(this,b,a)},this)};var Lg="corp.google.com googleplex.com youtube.com youtube-nocookie.com youtubeeducation.com borg.google.com prod.google.com sandbox.google.com books.googleusercontent.com docs.google.com drive.google.com mail.google.com photos.google.com plus.google.com lh2.google.com picasaweb.google.com play.google.com googlevideo.com talkgadget.google.com survey.g.doubleclick.net youtube.googleapis.com vevo.com".split(" "),Mg="";
function Ng(a){return a&&a==Mg?!0:(new RegExp("^(https?:)?//([a-z0-9-]{1,63}\\.)*("+Lg.join("|").replace(/\./g,".")+")(:[0-9]+)?([/?#]|$)","i")).test(a)?(Mg=a,!0):!1}
;var Og={},Pg=0;function Qg(a){var b=new Image,c=""+Pg++;Og[c]=b;b.onload=b.onerror=function(){delete Og[c]};
b.src=a}
;function O(a,b){this.version=a;this.args=b}
function Rg(a){if(!a.va){var b={};a.call(b);a.va=b.version}return a.va}
function Sg(a,b){function c(){a.apply(this,b.args)}
if(!b.args||!b.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");var d;try{d=Rg(a)}catch(e){}if(!d||b.version!=d)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");c.prototype=a.prototype;try{return new c}catch(e){throw e.message="yt.pubsub2.Data.deserialize(): "+e.message,e;}}
function P(a,b){this.topic=a;this.b=b}
P.prototype.toString=function(){return this.topic};var Tg=r("yt.pubsub2.instance_")||new F;F.prototype.subscribe=F.prototype.subscribe;F.prototype.unsubscribeByKey=F.prototype.ha;F.prototype.publish=F.prototype.u;F.prototype.clear=F.prototype.clear;q("yt.pubsub2.instance_",Tg,void 0);var Ug=r("yt.pubsub2.subscribedKeys_")||{};q("yt.pubsub2.subscribedKeys_",Ug,void 0);var Vg=r("yt.pubsub2.topicToKeys_")||{};q("yt.pubsub2.topicToKeys_",Vg,void 0);var Wg=r("yt.pubsub2.isAsync_")||{};q("yt.pubsub2.isAsync_",Wg,void 0);
q("yt.pubsub2.skipSubKey_",null,void 0);function Q(a,b){var c=Xg();c&&c.publish.call(c,a.toString(),a,b)}
function Yg(a,b,c){var d=Xg();if(!d)return 0;var e=d.subscribe(a.toString(),function(d,h){if(!window.yt.pubsub2.skipSubKey_||window.yt.pubsub2.skipSubKey_!=e){var k=function(){if(Ug[e])try{if(h&&a instanceof P&&a!=d)try{h=Sg(a.b,h)}catch(k){throw k.message="yt.pubsub2 cross-binary conversion error for "+a.toString()+": "+k.message,k;}b.call(c||window,h)}catch(k){bc(k)}};
Wg[a.toString()]?r("yt.scheduler.instance")?Vd(k,void 0):H(k,0):k()}});
Ug[e]=!0;Vg[a.toString()]||(Vg[a.toString()]=[]);Vg[a.toString()].push(e);return e}
function Zg(a){var b=Xg();b&&(ea(a)&&(a=[a]),z(a,function(a){b.unsubscribeByKey(a);delete Ug[a]}))}
function Xg(){return r("yt.pubsub2.instance_")}
;var $g=x().toString();var ah=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};function bh(a){O.call(this,1,arguments)}
y(bh,O);var ch=new P("timing-sent",bh);var dh={vc:!0},eh=/^mark_/i,fh={ad_at:"adType",cpn:"clientPlaybackNonce",csn:"clientScreenNonce",yt_lt:"loadType",yt_ad:"isMonetized",yt_ad_pr:"prerollAllowed",yt_red:"isRedSubscriber",yt_vis:"isVisible"},gh=["isMonetized","prerollAllowed","isRedSubscriber","isVisible"],hh=w(ah.clearResourceTimings||ah.webkitClearResourceTimings||ah.mozClearResourceTimings||ah.msClearResourceTimings||ah.oClearResourceTimings||t,ah);
function ih(a){if("_"!=a[0]){var b=a;ah.mark&&(eh.test(b)||(b="mark_"+b),ah.mark(b))}var b=jh(),c=cc();b[a]&&(b["_"+a]=b["_"+a]||[b[a]],b["_"+a].push(c));b[a]=c;kh()["tick_"+a]=void 0;Hf("csi_on_gel")?(b=lh(),"_start"==a?mg("latencyActionBaselined",{clientActionNonce:b},void 0):mg("latencyActionTicked",{tickName:a,clientActionNonce:b},void 0),a=!0):a=!1;a||(a=!!r("yt.timing.pingSent_")&&!!Hf("navigation_only_csi_reset"));if(!a&&(b=G("TIMING_ACTION",void 0),a=jh(),r("yt.timing.ready_")&&b&&a._start&&
mh())){b=!0;c=G("TIMING_WAIT",[]);if(c.length)for(var d=0,e=c.length;d<e;++d)if(!(c[d]in a)){b=!1;break}b&&nh()}}
function oh(){var a=ph().info.yt_lt="hot_bg";kh().info_yt_lt=a;if(Hf("csi_on_gel"))if("yt_lt"in fh){var b={},c=fh.yt_lt;A(gh,c)&&(a=!!a);b[c]=a;a=lh();b.clientActionNonce=a;mg("latencyActionInfo",b)}else bc(Error("Unknown label yt_lt logged with GEL CSI."))}
function mh(){var a=jh();if(a.aft)return a.aft;for(var b=G("TIMING_AFT_KEYS",["ol"]),c=b.length,d=0;d<c;d++){var e=a[b[d]];if(e)return e}return NaN}
function nh(){var a=jh(),b=ph().info,c=a._start,d;for(d in a)if(0==d.lastIndexOf("_",0)&&u(a[d])){var e=d.slice(1);if(e in dh){var f=Ja(a[d],function(a){return Math.round(a-c)});
b["all_"+e]=f.join()}delete a[d]}e=!!b.ap;if(f=r("yt.timing.reportbuilder_")){if(f=f(a,b,void 0))qh(f,e),rh(),hh(),sh(!1,void 0)}else{var h=G("CSI_SERVICE_NAME","youtube"),f={v:2,s:h,action:G("TIMING_ACTION",void 0)},k=b.srt;delete b.srt;void 0===a.srt&&(k||0===k||(k=ah.timing||{},k=Math.max(0,k.responseStart-k.navigationStart),isNaN(k)&&b.pt&&(k=b.pt)),k||0===k)&&(b.srt=Math.round(k));if(b.h5jse){var m=window.location.protocol+r("ytplayer.config.assets.js");(m=ah.getEntriesByName?ah.getEntriesByName(m)[0]:
null)?b.h5jse=Math.round(b.h5jse-m.responseEnd):delete b.h5jse}a.aft=mh();th()&&"youtube"==h&&(oh(),h=a.vc,m=a.pbs,delete a.aft,b.aft=Math.round(m-h));for(var n in b)"_"!=n.charAt(0)&&(f[n]=b[n]);a.ps=cc();b={};n=[];for(d in a)"_"!=d.charAt(0)&&(h=Math.round(a[d]-c),Hf("enable_negative_ticks")||(h=Math.max(h,0)),b[d]=h,n.push(d+"."+h));f.rt=n.join(",");(a=r("ytdebug.logTiming"))&&a(f,b);Hf("navigation_only_csi_reset")||(rh(),hh(),sh(!1,void 0));qh(f,e,void 0);Q(ch,new bh(b.aft+(k||0)))}}
function qh(a,b,c){if(Hf("debug_csi_data")){var d=r("yt.timing.csiData");d||(d=[],q("yt.timing.csiData",d,void 0));d.push({page:location.href,time:new Date,args:a})}var d="",e;for(e in a)d+="&"+e+"="+a[e];a="/csi_204?"+d.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b)try{window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")||a&&Qg(a)}catch(f){a&&Qg(a)}else a&&Qg(a);sh(!0,c)}
function lh(){var a=ph().nonce;if(!a){var b;a:{if(window.crypto&&window.crypto.getRandomValues)try{var c=Array(16),d=new Uint8Array(16);window.crypto.getRandomValues(d);for(a=0;a<c.length;a++)c[a]=d[a];b=c;break a}catch(e){}b=Array(16);for(c=0;16>c;c++){d=x();for(a=0;a<d%23;a++)b[c]=Math.random();b[c]=Math.floor(256*Math.random())}if($g)for(c=1,d=0;d<$g.length;d++)b[c%16]=b[c%16]^b[(c-1)%16]/4^$g.charCodeAt(d),c++}c=[];for(d=0;d<b.length;d++)c.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".charAt(b[d]&
63));a=c.join("");ph().nonce=a}return a}
function jh(){return ph().tick}
function kh(){var a=ph();"gel"in a||(a.gel={});return a.gel}
function ph(){return r("ytcsi.data_")||rh()}
function rh(){var a={tick:{},info:{}};q("ytcsi.data_",a,void 0);return a}
function sh(a,b){q("yt.timing."+(b||"")+"pingSent_",a,void 0)}
function th(){var a=jh(),b=a.pbr,c=a.vc,a=a.pbs;return b&&c&&a&&b<c&&c<a&&1==ph().info.yt_pvis}
;var uh={"api.invalidparam":2,auth:150,"drm.auth":150,heartbeat:150,"html5.unsupportedads":5,"fmt.noneavailable":5,"fmt.decode":5,"fmt.unplayable":5,"html5.missingapi":5,"html5.unsupportedlive":5,"drm.unavailable":5};function vh(a,b){D.call(this);this.o=this.j=a;this.V=b;this.A=!1;this.f={};this.qa=this.U=null;this.Z=new F;Ub(this,na(E,this.Z));this.i={};this.D=this.Ga=this.g=this.Ta=this.b=null;this.ia=!1;this.F=this.l=this.K=this.L=null;this.Ha={};this.Uc=["onReady"];this.ka=new Ef(this);Ub(this,na(E,this.ka));this.yb=null;this.Xb=NaN;this.la={};wh(this);this.na("onDetailedError",w(this.Ed,this));this.na("onTabOrderChange",w(this.Zc,this));this.na("onTabAnnounce",w(this.Yb,this));this.na("WATCH_LATER_VIDEO_ADDED",
w(this.Fd,this));this.na("WATCH_LATER_VIDEO_REMOVED",w(this.Gd,this));kf||(this.na("onMouseWheelCapture",w(this.Bd,this)),this.na("onMouseWheelRelease",w(this.Cd,this)));this.na("onAdAnnounce",w(this.Yb,this));this.H=new Ef(this);Ub(this,na(E,this.H));this.Sa=!1;this.Ra=null}
y(vh,D);var xh=["drm.unavailable","fmt.noneavailable","html5.missingapi","html5.unsupportedads","html5.unsupportedlive"];g=vh.prototype;g.Tb=function(a,b){this.isDisposed()||(yh(this,a),zh(this,b),this.A&&Ah(this))};
function yh(a,b){a.Ta=b;a.b=b.clone();a.g=a.b.attrs.id||a.g;"video-player"==a.g&&(a.g=a.V,a.b.attrs.id=a.V);a.o.id==a.g&&(a.g+="-player",a.b.attrs.id=a.g);a.b.args.enablejsapi="1";a.b.args.playerapiid=a.V;a.Ga||(a.Ga=Bh(a,a.b.args.jsapicallback||"onYouTubePlayerReady"));a.b.args.jsapicallback=null;var c=a.b.attrs.width;c&&(a.o.style.width=cf(Number(c)||c,!0));if(c=a.b.attrs.height)a.o.style.height=cf(Number(c)||c,!0)}
g.fd=function(){return this.Ta};
function Ah(a){a.b.loaded||(a.b.loaded=!0,"0"!=a.b.args.autoplay?a.f.loadVideoByPlayerVars(a.b.args):a.f.cueVideoByPlayerVars(a.b.args))}
function Ch(a){if(!p(a.b.disable.flash)){var b=a.b.disable,c;c=rf(qf.getInstance(),a.b.minVersion);b.flash=!c}return!a.b.disable.flash}
function Dh(a,b){if((!b||(5!=(uh[b.errorCode]||5)?0:-1!=xh.indexOf(b.errorCode)))&&Ch(a)){var c=Eh(a);c&&c.stopVideo&&c.stopVideo();var d=a.b;c&&c.getUpdatedConfigurationData&&(c=c.getUpdatedConfigurationData(),d=Xe(c));d.args.autoplay=1;d.args.html5_unavailable="1";yh(a,d);zh(a,"flash")}}
function zh(a,b){if(!a.isDisposed()){if(!b){var c;if(!(c=!a.b.html5&&Ch(a))){if(!p(a.b.disable.html5)){var d;c=!0;void 0!=a.b.args.deviceHasDisplay&&(c=a.b.args.deviceHasDisplay);if(2.2==xf)d=!0;else{a:{var e=c;c=r("yt.player.utils.videoElement_");c||(c=document.createElement("video"),q("yt.player.utils.videoElement_",c,void 0));try{if(c.canPlayType)for(var e=e?Cf:Df,f=0;f<e.length;f++)if(c.canPlayType(e[f])){d=null;break a}d="fmt.noneavailable"}catch(h){d="html5.missingapi"}}d=!d}d&&(d=Fh(a)||a.b.assets.js);
a.b.disable.html5=!d;d||(a.b.args.html5_unavailable="1")}c=!!a.b.disable.html5}b=c?Ch(a)?"flash":"unsupported":"html5"}("flash"==b?a.oe:a.pe).call(a)}}
function Fh(a){var b=!0,c=Eh(a);c&&a.b&&(a=a.b,b=C(c,"version")==a.assets.js);return b&&!!r("yt.player.Application.create")}
g.pe=function(){if(!this.ia){var a=Fh(this);a&&"html5"==Gh(this)?(this.D="html5",this.A||this.Ma()):(Hh(this),this.D="html5",a&&this.K?(this.j.appendChild(this.K),this.Ma()):(this.b.loaded=!0,this.L=w(function(){var a=this.j,c=this.b.clone();r("yt.player.Application.create")(a,c);this.Ma()},this),this.ia=!0,a?this.L():(pc(this.b.assets.js,this.L),sf(this.b.assets.css))))}};
g.oe=function(){var a=this.b.clone();if(!this.l){var b=Eh(this);b&&(this.l=document.createElement("span"),this.l.tabIndex=0,Ff(this.ka,this.l,"focus",this.kc),this.F=document.createElement("span"),this.F.tabIndex=0,Ff(this.ka,this.F,"focus",this.kc),b.parentNode&&b.parentNode.insertBefore(this.l,b),b.parentNode&&b.parentNode.insertBefore(this.F,b.nextSibling))}a.attrs.width=a.attrs.width||"100%";a.attrs.height=a.attrs.height||"100%";if("flash"==Gh(this))this.D="flash",this.A||this.Ma();else{Hh(this);
this.D="flash";this.b.loaded=!0;var b=qf.getInstance(),c=(-1<b.i.indexOf("Gnash")&&-1==b.i.indexOf("AVM2")||9==b.b&&1==b.f||9==b.b&&0==b.f&&1==b.g?0:9<=b.b)||-1<navigator.userAgent.indexOf("Sony/COM2")&&!rf(b,9,1,58)?a.url:a.urlV9As2;window!=window.top&&document.referrer&&(a.args.framer=document.referrer.substring(0,128));b=this.j;if(c){var b=v(b)?ke(b):b,d=hb(a.attrs);d.tabindex=0;var e=hb(a.params);e.flashvars=Dd(a.args);if(dc){d.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";e.movie=c;var a=
document.createElement("object"),f;for(f in d)a.setAttribute(f,d[f]);for(f in e)d=document.createElement("param"),d.setAttribute("name",f),d.setAttribute("value",e[f]),a.appendChild(d)}else{d.type="application/x-shockwave-flash";d.src=c;a=document.createElement("embed");a.setAttribute("name",d.id);for(f in d)a.setAttribute(f,d[f]);for(f in e)a.setAttribute(f,e[f])}f=document.createElement("div");f.appendChild(a);b.innerHTML=f.innerHTML}this.Ma()}};
g.kc=function(){Eh(this).focus()};
function Eh(a){var b=ke(a.g);!b&&a.o&&a.o.querySelector&&(b=a.o.querySelector("#"+a.g));return b}
g.Ma=function(){if(!this.isDisposed()){var a=Eh(this),b=!1;try{a&&a.getApiInterface&&a.getApiInterface()&&(b=!0)}catch(f){}if(b)if(this.ia=!1,a.isNotServable&&a.isNotServable(this.b.args.video_id))Dh(this);else{wh(this);this.A=!0;a=Eh(this);a.addEventListener&&(this.U=Ih(this,a,"addEventListener"));a.removeEventListener&&(this.qa=Ih(this,a,"removeEventListener"));for(var b=a.getApiInterface(),b=b.concat(a.getInternalApiInterface()),c=0;c<b.length;c++){var d=b[c];this.f[d]||(this.f[d]=Ih(this,a,d))}for(var e in this.i)this.U(e,
this.i[e]);Ah(this);this.Ga&&this.Ga(this.f);this.Z.u("onReady",this.f)}else this.Xb=H(w(this.Ma,this),50)}};
function Ih(a,b,c){var d=b[c];return function(){try{return a.yb=null,d.apply(b,arguments)}catch(e){"Bad NPObject as private data!"!=e.message&&"sendAbandonmentPing"!=c&&(e.message+=" ("+c+")",a.yb=e,bc(e,"WARNING"))}}}
function wh(a){a.A=!1;if(a.qa)for(var b in a.i)a.qa(b,a.i[b]);for(var c in a.la)I(parseInt(c,10));a.la={};a.U=null;a.qa=null;for(var d in a.f)a.f[d]=null;a.f.addEventListener=w(a.na,a);a.f.removeEventListener=w(a.be,a);a.f.destroy=w(a.dispose,a);a.f.getLastError=w(a.gd,a);a.f.getPlayerType=w(a.hd,a);a.f.getCurrentVideoConfig=w(a.fd,a);a.f.loadNewVideoConfig=w(a.Tb,a);a.f.isReady=w(a.Ae,a)}
g.Ae=function(){return this.A};
g.na=function(a,b){if(!this.isDisposed()){var c=Bh(this,b);if(c){if(!A(this.Uc,a)&&!this.i[a]){var d=Jh(this,a);this.U&&this.U(a,d)}this.Z.subscribe(a,c);"onReady"==a&&this.A&&H(na(c,this.f),0)}}};
g.be=function(a,b){if(!this.isDisposed()){var c=Bh(this,b);c&&this.Z.unsubscribe(a,c)}};
function Bh(a,b){var c=b;if("string"==typeof b){if(a.Ha[b])return a.Ha[b];c=function(){var a=r(b);a&&a.apply(l,arguments)};
a.Ha[b]=c}return c?c:null}
function Jh(a,b){var c="ytPlayer"+b+a.V;a.i[b]=c;l[c]=function(c){var e=H(function(){if(!a.isDisposed()){a.Z.u(b,c);var f=a.la,h=String(e);h in f&&delete f[h]}},0);
gb(a.la,String(e))};
return c}
g.Zc=function(a){a=a?re:qe;for(var b=a(document.activeElement);b&&(1!=b.nodeType||b==this.l||b==this.F||(b.focus(),b!=document.activeElement));)b=a(b)};
g.Yb=function(a){J("a11y-announce",a)};
g.Ed=function(a){Dh(this,a)};
g.Fd=function(a){J("WATCH_LATER_VIDEO_ADDED",a)};
g.Gd=function(a){J("WATCH_LATER_VIDEO_REMOVED",a)};
g.Bd=function(){this.Sa||(of?(this.Ra=ne(document),Ff(this.H,window,"scroll",this.Wd),Ff(this.H,this.j,"touchmove",this.Qd)):(Ff(this.H,this.j,"mousewheel",this.nc),Ff(this.H,this.j,"wheel",this.nc)),this.Sa=!0)};
g.Cd=function(){Gf(this.H);this.Sa=!1};
g.nc=function(a){a=a||window.event;a.returnValue=!1;a.preventDefault&&a.preventDefault()};
g.Wd=function(){window.scrollTo(this.Ra.x,this.Ra.y)};
g.Qd=function(a){a.preventDefault()};
g.hd=function(){return this.D||Gh(this)};
g.gd=function(){return this.yb};
function Gh(a){return(a=Eh(a))?"div"==a.tagName.toLowerCase()?"html5":"flash":null}
function Hh(a){ih("dcp");a.cancel();wh(a);a.D=null;a.b&&(a.b.loaded=!1);var b=Eh(a);"html5"==Gh(a)?a.K=b:b&&b.destroy&&b.destroy();pe(a.j);Gf(a.ka);a.l=null;a.F=null}
g.cancel=function(){this.L&&wc(this.b.assets.js,this.L);I(this.Xb);this.ia=!1};
g.w=function(){Hh(this);if(this.K&&this.b)try{this.K.destroy()}catch(b){bc(b)}this.Ha=null;for(var a in this.i)l[this.i[a]]=null;this.Ta=this.b=this.f=null;delete this.j;delete this.o;vh.B.w.call(this)};var Kh={},Lh="player_uid_"+(1E9*Math.random()>>>0);function Mh(a,b){a=v(a)?ke(a):a;b=Xe(b);var c=Lh+"_"+ia(a),d=Kh[c];if(d)return d.Tb(b),d.f;d=new vh(a,c);Kh[c]=d;J("player-added",d.f);Ub(d,na(Nh,d));H(function(){d.Tb(b)},0);
return d.f}
function Nh(a){Kh[a.V]=null}
function Oh(a){a=ke(a);if(!a)return null;var b=Lh+"_"+ia(a),c=Kh[b];c||(c=new vh(a,b),Kh[b]=c);return c.f}
;var Ph=r("yt.abuse.botguardInitialized")||zc;q("yt.abuse.botguardInitialized",Ph,void 0);var Qh=r("yt.abuse.invokeBotguard")||Ac;q("yt.abuse.invokeBotguard",Qh,void 0);var Rh=r("yt.abuse.dclkstatus.checkDclkStatus")||Zd;q("yt.abuse.dclkstatus.checkDclkStatus",Rh,void 0);var Sh=r("yt.player.exports.navigate")||Se;q("yt.player.exports.navigate",Sh,void 0);var Th=r("yt.player.embed")||Mh;q("yt.player.embed",Th,void 0);var Uh=r("yt.player.getPlayerByElement")||Oh;q("yt.player.getPlayerByElement",Uh,void 0);
var Vh=r("yt.util.activity.init")||Ie;q("yt.util.activity.init",Vh,void 0);var Wh=r("yt.util.activity.getTimeSinceActive")||Ke;q("yt.util.activity.getTimeSinceActive",Wh,void 0);var Xh=r("yt.util.activity.setTimestamp")||Je;q("yt.util.activity.setTimestamp",Xh,void 0);function Yh(a){O.call(this,1,arguments);this.b=a}
y(Yh,O);function Zh(a){O.call(this,1,arguments);this.b=a}
y(Zh,O);function $h(a,b){O.call(this,1,arguments);this.b=a;this.isEnabled=b}
y($h,O);function ai(a,b,c,d,e){O.call(this,2,arguments);this.f=a;this.b=b;this.i=c||null;this.g=d||null;this.source=e||null}
y(ai,O);function bi(a,b,c){O.call(this,1,arguments);this.b=a;this.subscriptionId=b}
y(bi,O);function ci(a,b,c,d,e,f,h){O.call(this,1,arguments);this.f=a;this.subscriptionId=b;this.b=c;this.j=d||null;this.i=e||null;this.g=f||null;this.source=h||null}
y(ci,O);
var di=new P("subscription-batch-subscribe",Yh),ei=new P("subscription-batch-unsubscribe",Yh),fi=new P("subscription-pref-email",$h),gi=new P("subscription-subscribe",ai),hi=new P("subscription-subscribe-loading",Zh),ii=new P("subscription-subscribe-loaded",Zh),ji=new P("subscription-subscribe-success",bi),ki=new P("subscription-subscribe-external",ai),li=new P("subscription-unsubscribe",ci),mi=new P("subscription-unsubscirbe-loading",Zh),ni=new P("subscription-unsubscribe-loaded",Zh),oi=new P("subscription-unsubscribe-success",
Zh),pi=new P("subscription-external-unsubscribe",ci),qi=new P("subscription-enable-ypc",Zh),ri=new P("subscription-disable-ypc",Zh);function si(a,b){var c=document.location.protocol+"//"+document.domain+"/post_login";b&&(c=Ed(c,"mode",b));c=Ed("/signin?context=popup","next",c);c=Ed(c,"feature","sub_button");if(c=window.open(c,"loginPopup","width=375,height=440,resizable=yes,scrollbars=yes",!0)){var d=jc("LOGGED_IN",function(b){lc(G("LOGGED_IN_PUBSUB_KEY",void 0));Zb("LOGGED_IN",!0);a(b)});
Zb("LOGGED_IN_PUBSUB_KEY",d);c.moveTo((screen.width-375)/2,(screen.height-440)/2)}}
q("yt.pubsub.publish",J,void 0);function ti(){var a=G("PLAYER_CONFIG");return a&&a.args&&void 0!==a.args.authuser?!0:!(!G("SESSION_INDEX")&&!G("LOGGED_IN"))}
;function ui(){var a=Ce();return a?a:null}
;function vi(a,b){(a=ke(a))&&a.style&&(a.style.display=b?"":"none",de(a,"hid",!b))}
function wi(a){z(arguments,function(a){!da(a)||a instanceof Element?vi(a,!0):z(a,function(a){wi(a)})})}
function xi(a){z(arguments,function(a){!da(a)||a instanceof Element?vi(a,!1):z(a,function(a){xi(a)})})}
;var yi={},zi="ontouchstart"in document;function Ai(a,b,c){var d;switch(a){case "mouseover":case "mouseout":d=3;break;case "mouseenter":case "mouseleave":d=9}return ze(c,function(a){return ae(a,b)},!0,d)}
function Bi(a){var b="mouseover"==a.type&&"mouseenter"in yi||"mouseout"==a.type&&"mouseleave"in yi,c=a.type in yi||b;if("HTML"!=a.target.tagName&&c){if(b){var b="mouseover"==a.type?"mouseenter":"mouseleave",c=yi[b],d;for(d in c.ca){var e=Ai(b,d,a.target);e&&!ze(a.relatedTarget,function(a){return a==e},!0)&&c.u(d,e,b,a)}}if(b=yi[a.type])for(d in b.ca)(e=Ai(a.type,d,a.target))&&b.u(d,e,a.type,a)}}
M(document,"blur",Bi,!0);M(document,"change",Bi,!0);M(document,"click",Bi);M(document,"focus",Bi,!0);M(document,"mouseover",Bi);M(document,"mouseout",Bi);M(document,"mousedown",Bi);M(document,"keydown",Bi);M(document,"keyup",Bi);M(document,"keypress",Bi);M(document,"cut",Bi);M(document,"paste",Bi);zi&&(M(document,"touchstart",Bi),M(document,"touchend",Bi),M(document,"touchcancel",Bi));function Ci(a){this.j=a;this.g={};this.pb=[];this.i=[]}
function R(a,b){return"yt-uix"+(a.j?"-"+a.j:"")+(b?"-"+b:"")}
Ci.prototype.unregister=function(){lc(this.pb);this.pb.length=0;Zg(this.i);this.i.length=0};
Ci.prototype.init=t;Ci.prototype.dispose=t;function Di(a,b,c){a.i.push(Yg(b,c,a))}
function Ei(a,b,c){var d=R(a,void 0),e=w(c,a);b in yi||(yi[b]=new F);yi[b].subscribe(d,e);a.g[c]=e}
function Fi(a,b,c){if(b in yi){var d=yi[b];d.unsubscribe(R(a,void 0),a.g[c]);0>=d.O()&&(d.dispose(),delete yi[b])}delete a.g[c]}
function Gi(a,b){Cb(a,"tooltip-text",b)}
;function Hi(){Ci.call(this,"tooltip");this.b=0;this.f={}}
y(Hi,Ci);ba(Hi);g=Hi.prototype;g.register=function(){Ei(this,"mouseover",this.mb);Ei(this,"mouseout",this.Ca);Ei(this,"focus",this.ec);Ei(this,"blur",this.$b);Ei(this,"click",this.Ca);Ei(this,"touchstart",this.Ec);Ei(this,"touchend",this.sb);Ei(this,"touchcancel",this.sb)};
g.unregister=function(){Fi(this,"mouseover",this.mb);Fi(this,"mouseout",this.Ca);Fi(this,"focus",this.ec);Fi(this,"blur",this.$b);Fi(this,"click",this.Ca);Fi(this,"touchstart",this.Ec);Fi(this,"touchend",this.sb);Fi(this,"touchcancel",this.sb);this.dispose();Hi.B.unregister.call(this)};
g.dispose=function(){for(var a in this.f)this.Ca(this.f[a]);this.f={}};
g.mb=function(a){if(!(this.b&&1E3>x()-this.b)){var b=parseInt(C(a,"tooltip-hide-timer"),10);b&&(Eb(a,"tooltip-hide-timer"),I(b));var b=w(function(){Ii(this,a);Eb(a,"tooltip-show-timer")},this),c=parseInt(C(a,"tooltip-show-delay"),10)||0,b=H(b,c);
Cb(a,"tooltip-show-timer",b.toString());a.title&&(Gi(a,Ji(a)),a.title="");b=ia(a).toString();this.f[b]=a}};
g.Ca=function(a){var b=parseInt(C(a,"tooltip-show-timer"),10);b&&(I(b),Eb(a,"tooltip-show-timer"));b=w(function(){if(a){var b=ke(Ki(this,a));b&&(Li(b),b&&b.parentNode&&b.parentNode.removeChild(b),Eb(a,"content-id"));(b=ke(Ki(this,a,"arialabel")))&&b.parentNode&&b.parentNode.removeChild(b)}Eb(a,"tooltip-hide-timer")},this);
b=H(b,50);Cb(a,"tooltip-hide-timer",b.toString());if(b=C(a,"tooltip-text"))a.title=b;b=ia(a).toString();delete this.f[b]};
g.ec=function(a){this.b=0;this.mb(a)};
g.$b=function(a){this.b=0;this.Ca(a)};
g.Ec=function(a,b,c){c.changedTouches&&(this.b=0,a=Ai(b,R(this),c.changedTouches[0].target),this.mb(a))};
g.sb=function(a,b,c){c.changedTouches&&(this.b=x(),a=Ai(b,R(this),c.changedTouches[0].target),this.Ca(a))};
function Mi(a,b){Gi(a,b);var c=C(a,"content-id");(c=ke(c))&&se(c,b)}
function Ji(a){return C(a,"tooltip-text")||a.title}
function Ii(a,b){if(b){var c=Ji(b);if(c){var d=ke(Ki(a,b));if(!d){d=document.createElement("div");d.id=Ki(a,b);d.className=R(a,"tip");var e=document.createElement("div");e.className=R(a,"tip-body");var f=document.createElement("div");f.className=R(a,"tip-arrow");var h=document.createElement("div");h.setAttribute("aria-hidden","true");h.className=R(a,"tip-content");var k=Ni(a,b),m=Ki(a,b,"content");h.id=m;Cb(b,"content-id",m);e.appendChild(h);k&&d.appendChild(k);d.appendChild(e);d.appendChild(f);var n=
ve(b),m=Ki(a,b,"arialabel"),f=document.createElement("div");be(f,R(a,"arialabel"));f.id=m;n=b.hasAttribute("aria-label")?b.getAttribute("aria-label"):"rtl"==document.body.getAttribute("dir")?c+" "+n:n+" "+c;se(f,n);b.setAttribute("aria-labelledby",m);m=ui()||document.body;m.appendChild(f);m.appendChild(d);Mi(b,c);(c=parseInt(C(b,"tooltip-max-width"),10))&&e.offsetWidth>c&&(e.style.width=c+"px",be(h,R(a,"normal-wrap")));h=ae(b,R(a,"reverse"));Oi(a,b,d,e,k,h)||Oi(a,b,d,e,k,!h);var fa=R(a,"tip-visible");
H(function(){be(d,fa)},0)}}}}
function Oi(a,b,c,d,e,f){de(c,R(a,"tip-reverse"),f);var h=0;f&&(h=1);a=df(b);f=new ee((a.width-10)/2,f?a.height:0);var k=je(b),m=new ee(0,0),n;n=k?je(k):document;n=!K||kd(9)||oe(he(n).b)?n.documentElement:n.body;b!=n&&(n=bf(b),k=ne(he(k).b),m.x=n.left+k.x,m.y=n.top+k.y);f=new ee(m.x+f.x,m.y+f.y);f=f.clone();m=(h&8&&"rtl"==af(c,"direction")?h^4:h)&-9;h=df(c);k=h.clone();n=f.clone();k=k.clone();0!=m&&(m&4?n.x-=k.width+0:m&2&&(n.x-=k.width/2),m&1&&(n.y-=k.height+0));f=new Ze(0,0,0,0);f.left=n.x;f.top=
n.y;f.width=k.width;f.height=k.height;k=new ee(f.left,f.top);k instanceof ee?(m=k.x,k=k.y):(m=k,k=void 0);c.style.left=cf(m,!1);c.style.top=cf(k,!1);k=new fe(f.width,f.height);if(!(h==k||h&&k&&h.width==k.width&&h.height==k.height))if(h=k,f=je(c),m=oe(he(f).b),!K||jd("10")||m&&jd("8"))f=c.style,ad?f.MozBoxSizing="border-box":bd?f.WebkitBoxSizing="border-box":f.boxSizing="border-box",f.width=Math.max(h.width,0)+"px",f.height=Math.max(h.height,0)+"px";else if(f=c.style,m){if(K){m=gf(c,"paddingLeft");
k=gf(c,"paddingRight");n=gf(c,"paddingTop");var fa=gf(c,"paddingBottom"),m=new Ye(n,k,fa,m)}else m=$e(c,"paddingLeft"),k=$e(c,"paddingRight"),n=$e(c,"paddingTop"),fa=$e(c,"paddingBottom"),m=new Ye(parseFloat(n),parseFloat(k),parseFloat(fa),parseFloat(m));if(K&&!kd(9)){k=jf(c,"borderLeft");n=jf(c,"borderRight");var fa=jf(c,"borderTop"),Pc=jf(c,"borderBottom"),k=new Ye(fa,n,Pc,k)}else k=$e(c,"borderLeftWidth"),n=$e(c,"borderRightWidth"),fa=$e(c,"borderTopWidth"),Pc=$e(c,"borderBottomWidth"),k=new Ye(parseFloat(fa),
parseFloat(n),parseFloat(Pc),parseFloat(k));f.pixelWidth=h.width-k.left-m.left-m.right-k.right;f.pixelHeight=h.height-k.top-m.top-m.bottom-k.bottom}else f.pixelWidth=h.width,f.pixelHeight=h.height;h=window.document;h=oe(h)?h.documentElement:h.body;f=new fe(h.clientWidth,h.clientHeight);1==c.nodeType?(c=bf(c),k=new ee(c.left,c.top)):(c=c.changedTouches?c.changedTouches[0]:c,k=new ee(c.clientX,c.clientY));c=df(d);n=Math.floor(c.width/2);h=!!(f.height<k.y+a.height);a=!!(k.y<a.height);m=!!(k.x<n);f=!!(f.width<
k.x+n);k=(c.width+3)/-2- -5;b=C(b,"force-tooltip-direction");if("left"==b||m)k=-5;else if("right"==b||f)k=20-c.width-3;b=Math.floor(k)+"px";d.style.left=b;e&&(e.style.left=b,e.style.height=c.height+"px",e.style.width=c.width+"px");return!(h||a)}
function Ki(a,b,c){a=R(a);var d=b.__yt_uid_key;d||(d=Ae(),b.__yt_uid_key=d);b=a+d;c&&(b+="-"+c);return b}
function Ni(a,b){var c=null;cd&&ae(b,R(a,"masked"))&&((c=ke("yt-uix-tooltip-shared-mask"))?(c.parentNode.removeChild(c),wi(c)):(c=document.createElement("iframe"),c.src='javascript:""',c.id="yt-uix-tooltip-shared-mask",c.className=R(a,"tip-mask")));return c}
function Li(a){var b=ke("yt-uix-tooltip-shared-mask"),c=b&&ze(b,function(b){return b==a},!1,2);
b&&c&&(b.parentNode.removeChild(b),xi(b),document.body.appendChild(b))}
;function Pi(){Ci.call(this,"subscription-button")}
y(Pi,Ci);ba(Pi);Pi.prototype.register=function(){Ei(this,"click",this.Bb);Di(this,hi,this.mc);Di(this,ii,this.lc);Di(this,ji,this.Od);Di(this,mi,this.mc);Di(this,ni,this.lc);Di(this,oi,this.Ud);Di(this,qi,this.Ad);Di(this,ri,this.zd)};
Pi.prototype.unregister=function(){Fi(this,"click",this.Bb);Pi.B.unregister.call(this)};
var ye={Ub:"hover-enabled",Mc:"yt-uix-button-subscribe",Nc:"yt-uix-button-subscribed",Ce:"ypc-enabled",Oc:"yt-uix-button-subscription-container",Pc:"yt-subscription-button-disabled-mask-container"},Qi={De:"channel-external-id",Qc:"subscriber-count-show-when-subscribed",Rc:"subscriber-count-tooltip",Sc:"subscriber-count-title",Fe:"href",Vb:"is-subscribed",He:"parent-url",Je:"clicktracking",Tc:"style-type",Wb:"subscription-id",Me:"target",Vc:"ypc-enabled"};g=Pi.prototype;
g.Bb=function(a){var b=C(a,"href"),c=ti();if(b)a=C(a,"target")||"_self",window.open(b,a);else if(c){var b=C(a,"channel-external-id"),c=C(a,"clicktracking"),d;if(C(a,"ypc-enabled")){d=C(a,"ypc-item-type");var e=C(a,"ypc-item-id");d={itemType:d,itemId:e,subscriptionElement:a}}else d=null;e=C(a,"parent-url");if(C(a,"is-subscribed")){var f=C(a,"subscription-id");Q(li,new ci(b,f,d,a,c,e))}else Q(gi,new ai(b,d,c,e))}else Ri(this,a)};
g.mc=function(a){this.Ia(a.b,this.Bc,!0)};
g.lc=function(a){this.Ia(a.b,this.Bc,!1)};
g.Od=function(a){this.Ia(a.b,this.Cc,!0,a.subscriptionId)};
g.Ud=function(a){this.Ia(a.b,this.Cc,!1)};
g.Ad=function(a){this.Ia(a.b,this.bd)};
g.zd=function(a){this.Ia(a.b,this.ad)};
g.Cc=function(a,b,c){b?(Cb(a,Qi.Vb,"true"),c&&Cb(a,Qi.Wb,c)):(Eb(a,Qi.Vb),Eb(a,Qi.Wb));Si(a)};
g.Bc=function(a,b){var c;c=xe(a);de(c,ye.Pc,b);a.setAttribute("aria-busy",b?"true":"false");a.disabled=b};
function Si(a){var b=C(a,Qi.Tc),c=!!C(a,"is-subscribed"),b="-"+b,d=ye.Nc+b;de(a,ye.Mc+b,!c);de(a,d,c);C(a,Qi.Rc)&&!C(a,Qi.Qc)&&(b=R(Hi.getInstance()),de(a,b,!c),a.title=c?"":C(a,Qi.Sc));c?H(function(){be(a,ye.Ub)},1E3):ce(a,ye.Ub)}
g.bd=function(a){var b=!!C(a,"ypc-item-type"),c=!!C(a,"ypc-item-id");!C(a,"ypc-enabled")&&b&&c&&(be(a,"ypc-enabled"),Cb(a,Qi.Vc,"true"))};
g.ad=function(a){C(a,"ypc-enabled")&&(ce(a,"ypc-enabled"),Eb(a,"ypc-enabled"))};
function Ti(a,b){var c=le(R(a));return Ia(c,function(a){return b==C(a,"channel-external-id")},a)}
g.Xc=function(a,b,c){var d=Va(arguments,2);z(a,function(a){b.apply(this,Ra(a,d))},this)};
g.Ia=function(a,b,c){var d=Ti(this,a),d=Ra([d],Va(arguments,1));this.Xc.apply(this,d)};
function Ri(a,b){var c=w(function(a){a.discoverable_subscriptions&&Zb("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS",a.discoverable_subscriptions);this.Bb(b)},a);
si(c,"subscribe")}
;var Ui=window.yt&&window.yt.uix&&window.yt.uix.widgets_||{};q("yt.uix.widgets_",Ui,void 0);function Vi(a,b){this.source=null;this.j=a||null;this.origin="*";this.A=window.document.location.protocol+"//"+window.document.location.hostname;this.o=b;this.g=this.b=this.f=this.channel=this.i=null;M(window,"message",w(this.l,this))}
Vi.prototype.l=function(a){var b=this.o||G("POST_MESSAGE_ORIGIN",void 0)||this.A;if("*"!=b&&a.origin!=b)window.console&&window.console.warn("Untrusted origin: "+a.origin);else if(!this.j||a.source==this.j)if(this.source=a.source,this.origin="null"==a.origin?this.origin:a.origin,a=a.data,v(a)){try{a=nd(a)}catch(c){return}this.i=a.id;switch(a.event){case "listening":this.b&&(this.b(),this.b=null);break;case "command":this.f&&(this.g&&!A(this.g,a.func)||this.f(a.func,a.args))}}};
Vi.prototype.sendMessage=function(a){this.source&&(a.id=this.i,this.channel&&(a.channel=this.channel),a=L(a),this.source.postMessage(a,this.origin))};function Wi(){}
;function Xi(){}
y(Xi,Wi);Xi.prototype.O=function(){var a=0;Fc(this.ma(!0),function(){a++});
return a};
Xi.prototype.clear=function(){var a=Gc(this.ma(!0)),b=this;z(a,function(a){b.remove(a)})};function Yi(a){this.b=a}
y(Yi,Xi);g=Yi.prototype;g.isAvailable=function(){if(!this.b)return!1;try{return this.b.setItem("__sak","1"),this.b.removeItem("__sak"),!0}catch(a){return!1}};
g.set=function(a,b){try{this.b.setItem(a,b)}catch(c){if(0==this.b.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
g.get=function(a){a=this.b.getItem(a);if(!v(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
g.remove=function(a){this.b.removeItem(a)};
g.O=function(){return this.b.length};
g.ma=function(a){var b=0,c=this.b,d=new Dc;d.next=function(){if(b>=c.length)throw Cc;var d=c.key(b++);if(a)return d;d=c.getItem(d);if(!v(d))throw"Storage mechanism: Invalid value was encountered";return d};
return d};
g.clear=function(){this.b.clear()};
g.key=function(a){return this.b.key(a)};function Zi(){var a=null;try{a=window.localStorage||null}catch(b){}this.b=a}
y(Zi,Yi);function $i(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.b=a}
y($i,Yi);function aj(a){this.b=a}
aj.prototype.set=function(a,b){p(b)?this.b.set(a,L(b)):this.b.remove(a)};
aj.prototype.get=function(a){var b;try{b=this.b.get(a)}catch(c){return}if(null!==b)try{return nd(b)}catch(c){throw"Storage: Invalid value was encountered";}};
aj.prototype.remove=function(a){this.b.remove(a)};function bj(a){this.b=a}
y(bj,aj);function cj(a){this.data=a}
function dj(a){return!p(a)||a instanceof cj?a:new cj(a)}
bj.prototype.set=function(a,b){bj.B.set.call(this,a,dj(b))};
bj.prototype.f=function(a){a=bj.B.get.call(this,a);if(!p(a)||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
bj.prototype.get=function(a){if(a=this.f(a)){if(a=a.data,!p(a))throw"Storage: Invalid value was encountered";}else a=void 0;return a};function ej(a){this.b=a}
y(ej,bj);function fj(a){var b=a.creation;a=a.expiration;return!!a&&a<x()||!!b&&b>x()}
ej.prototype.set=function(a,b,c){if(b=dj(b)){if(c){if(c<x()){ej.prototype.remove.call(this,a);return}b.expiration=c}b.creation=x()}ej.B.set.call(this,a,b)};
ej.prototype.f=function(a,b){var c=ej.B.f.call(this,a);if(c)if(!b&&fj(c))ej.prototype.remove.call(this,a);else return c};function gj(a){this.b=a}
y(gj,ej);function hj(a,b){var c=[];Fc(b,function(a){var b;try{b=gj.prototype.f.call(this,a,!0)}catch(f){if("Storage: Invalid value was encountered"==f)return;throw f;}p(b)?fj(b)&&c.push(a):c.push(a)},a);
return c}
function ij(a,b){var c=hj(a,b);z(c,function(a){gj.prototype.remove.call(this,a)},a)}
function jj(){var a=kj;ij(a,a.b.ma(!0))}
;function S(a,b,c){var d=c&&0<c?c:0;c=d?x()+1E3*d:0;if((d=d?kj:lj)&&window.JSON){v(b)||(b=JSON.stringify(b,void 0));try{d.set(a,b,c)}catch(e){d.remove(a)}}}
function T(a){if(!lj&&!kj||!window.JSON)return null;var b;try{b=lj.get(a)}catch(c){}if(!v(b))try{b=kj.get(a)}catch(c){}if(!v(b))return null;try{b=JSON.parse(b,void 0)}catch(c){}return b}
function mj(a){lj&&lj.remove(a);kj&&kj.remove(a)}
var kj,nj=new Zi;kj=nj.isAvailable()?new gj(nj):null;var lj,oj=new $i;lj=oj.isAvailable()?new gj(oj):null;function pj(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}
function qj(a,b,c){v(a)&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});b=a;c=/\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);b.videoId=c&&c[2]?c[2]:null;return rj(a)}
function rj(a,b,c){if(ha(a)){b="endSeconds startSeconds mediaContentUrl suggestedQuality videoId two_stage_token".split(" ");c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}return{videoId:a,startSeconds:b,suggestedQuality:c}}
function sj(a,b,c,d){if(ha(a)&&!u(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}c={index:b,startSeconds:c,suggestedQuality:d};v(a)&&16==a.length?c.list="PL"+a:c.playlist=a;return c}
function tj(a){var b=a.video_id||a.videoId;if(v(b)){var c=T("yt-player-two-stage-token")||{},d=T("yt-player-two-stage-token")||{};p(void 0)?d[b]=void 0:delete d[b];S("yt-player-two-stage-token",d,300);(b=c[b])&&(a.two_stage_token=b)}}
;function uj(){var a=window.navigator.userAgent.match(/Chrome\/([0-9]+)/);return a?50<=parseInt(a[1],10):!1}
function vj(a){return document.currentScript&&(-1!=document.currentScript.src.indexOf("?"+a)||-1!=document.currentScript.src.indexOf("&"+a))}
var wj=vj("loadGamesSDK")?"/cast_game_sender.js":"/cast_sender.js",xj=vj("loadCastFramework");function yj(){return"function"==typeof window.__onGCastApiAvailable?window.__onGCastApiAvailable:null}
var zj=["boadgeojelhgndaghljhdicfkmllpafd","dliochdbjfkdbacpmhlcpmleaejidimm","enhhojjnijigcajfphajepfemndkmdlo","fmfcbgogabcbclcofgocippekhfcmgfj"],Aj=["pkedcjkdefgpdelpbcmbmeomcjbeemfm","fjhoaacokmgbjemoflkofnenfaiekifl"],Bj=uj()?Aj.concat(zj):zj.concat(Aj);function Cj(a,b){var c=new XMLHttpRequest;c.onreadystatechange=function(){4==c.readyState&&200==c.status&&b(!0)};
c.onerror=function(){b(!1)};
try{c.open("GET",a,!0),c.send()}catch(d){b(!1)}}
function Dj(a){if(a>=Bj.length)Ej();else{var b=Bj[a],c="chrome-extension://"+b+wj;0<=zj.indexOf(b)?Cj(c,function(d){d?(window.chrome.cast=window.chrome.cast||{},window.chrome.cast.extensionId=b,Fj(c,Ej)):Dj(a+1)}):Fj(c,function(){Dj(a+1)})}}
function Fj(a,b,c){var d=document.createElement("script");d.onerror=b;c&&(d.onload=c);d.src=a;(document.head||document.documentElement).appendChild(d)}
function Ej(){var a=yj();a&&a(!1,"No cast extension found")}
function Gj(){if(xj){var a=2,b=yj(),c=function(){a--;0==a&&b&&b(!0)};
window.__onGCastApiAvailable=c;Fj("//www.gstatic.com/cast/sdk/libs/sender/0.0.1/cast_framework.js",Ej,c)}}
function Hj(){if(0<=window.navigator.userAgent.indexOf("CriOS")){var a=window.__gCrWeb&&window.__gCrWeb.message&&window.__gCrWeb.message.invokeOnHost;if(a){Gj();a({command:"cast.sender.init"});return}}window.chrome?(Gj(),a=window.navigator.userAgent,0<=a.indexOf("Android")&&0<=a.indexOf("Chrome/")&&window.navigator.presentation?(a=uj()?"50":"",Fj("//www.gstatic.com/eureka/clank"+a+wj,Ej)):Dj(0)):Ej()}
;var Ij=x(),Jj=null,Kj=Array(50),Lj=-1,Mj=!1;function Nj(){var a=Oj;Pj();Jj.push(a);Qj(Jj)}
function Rj(a,b){Pj();var c=Jj,d=Sj(a,String(b));0==c.length?Tj(d):(Qj(c),z(c,function(a){a(d)}))}
function Pj(){Jj||(Jj=r("yt.mdx.remote.debug.handlers_")||[],q("yt.mdx.remote.debug.handlers_",Jj,void 0))}
function Tj(a){var b=(Lj+1)%50;Lj=b;Kj[b]=a;Mj||(Mj=49==b)}
function Qj(a){var b=Kj;if(b[0]){var c=Lj,d=Mj?c:-1;do{var d=(d+1)%50,e=b[d];z(a,function(a){a(e)})}while(d!=c);
Kj=Array(50);Lj=-1;Mj=!1}}
function Sj(a,b){var c=(x()-Ij)/1E3;c.toFixed&&(c=c.toFixed(3));var d=[];d.push("[",c+"s","] ");d.push("[","yt.mdx.remote","] ");d.push(a+": "+b,"\n");return d.join("")}
;function Uj(a){a=a||{};this.name=a.name||"";this.id=a.id||a.screenId||"";this.token=a.token||a.loungeToken||"";this.uuid=a.uuid||a.dialId||""}
function Vj(a,b){return!!b&&(a.id==b||a.uuid==b)}
function Wj(a){return{name:a.name,screenId:a.id,loungeToken:a.token,dialId:a.uuid}}
function Xj(a){return new Uj(a)}
function Yj(a){return u(a)?Ja(a,Xj):[]}
function Zj(a){return a?'{name:"'+a.name+'",id:'+a.id.substr(0,6)+"..,token:"+(a.token?".."+a.token.slice(-6):"-")+",uuid:"+(a.uuid?".."+a.uuid.slice(-6):"-")+"}":"null"}
function ak(a){return u(a)?"["+Ja(a,Zj).join(",")+"]":"null"}
;var bk={Be:"atp",Le:"ska",Ie:"que",Ge:"mus",Ke:"sus"};function ck(a){this.i=this.g="";this.b="/api/lounge";this.f=!0;a=a||document.location.href;var b=Number(xd(4,a))||null||"";b&&(this.i=":"+b);this.g=wd(xd(3,a))||"";a=lb;0<=a.search("MSIE")&&(a=a.match(/MSIE ([\d.]+)/)[1],0>Ea(a,"10.0")&&(this.f=!1))}
function dk(a,b,c,d){var e=a.b;if(p(d)?d:a.f)e="https://"+a.g+a.i+a.b;return Fd(e+b,c||{})}
function ek(a,b,c,d,e){a={format:"JSON",method:"POST",context:a,timeout:5E3,withCredentials:!1,ba:na(a.o,d,!0),onError:na(a.j,e),Da:na(a.l,e)};c&&(a.S=c,a.headers={"Content-Type":"application/x-www-form-urlencoded"});return Od(b,a)}
ck.prototype.o=function(a,b,c,d){b?a(d):a({text:c.responseText})};
ck.prototype.j=function(a,b){a(Error("Request error: "+b.status))};
ck.prototype.l=function(a){a(Error("request timed out"))};function fk(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})}
function gk(a,b){return Ma(a,function(a){return a.key==b})}
function hk(a){return Ja(a,function(a){return{key:a.id,name:a.name}})}
function ik(a,b){return Ma(a,function(a){return a||b?!a!=!b?!1:a.id==b.id:!0})}
function jk(a,b){return Ma(a,function(a){return Vj(a,b)})}
;function U(){D.call(this);this.o=new F;Ub(this,na(E,this.o))}
y(U,D);U.prototype.subscribe=function(a,b,c){return this.isDisposed()?0:this.o.subscribe(a,b,c)};
U.prototype.unsubscribe=function(a,b,c){return this.isDisposed()?!1:this.o.unsubscribe(a,b,c)};
U.prototype.ha=function(a){return this.isDisposed()?!1:this.o.ha(a)};
U.prototype.u=function(a,b){return this.isDisposed()?!1:this.o.u.apply(this.o,arguments)};function kk(a){U.call(this);this.l=a;this.screens=[]}
y(kk,U);kk.prototype.W=function(){return this.screens};
kk.prototype.contains=function(a){return!!ik(this.screens,a)};
kk.prototype.get=function(a){return a?jk(this.screens,a):null};
function lk(a,b){var c=a.get(b.uuid)||a.get(b.id);if(c){var d=c.name;c.id=b.id||c.id;c.name=b.name;c.token=b.token;c.uuid=b.uuid||c.uuid;return c.name!=d}a.screens.push(b);return!0}
function mk(a,b){var c=a.screens.length!=b.length;a.screens=Ia(a.screens,function(a){return!!ik(b,a)});
for(var d=0,e=b.length;d<e;d++)c=lk(a,b[d])||c;return c}
function nk(a,b){var c=a.screens.length;a.screens=Ia(a.screens,function(a){return!(a||b?!a!=!b?0:a.id==b.id:1)});
return a.screens.length<c}
kk.prototype.info=function(a){Rj(this.l,a)};function ok(a,b,c,d){U.call(this);this.A=a;this.l=b;this.i=c;this.j=d;this.g=0;this.b=null;this.f=NaN}
y(ok,U);var pk=[2E3,2E3,1E3,1E3,1E3,2E3,2E3,5E3,5E3,1E4];g=ok.prototype;g.start=function(){!this.b&&isNaN(this.f)&&this.xc()};
g.stop=function(){this.b&&(this.b.abort(),this.b=null);isNaN(this.f)||(I(this.f),this.f=NaN)};
g.w=function(){this.stop();ok.B.w.call(this)};
g.xc=function(){this.f=NaN;this.b=Od(dk(this.A,"/pairing/get_screen"),{method:"POST",S:{pairing_code:this.l},timeout:5E3,ba:w(this.se,this),onError:w(this.re,this),Da:w(this.te,this)})};
g.se=function(a,b){this.b=null;var c=b.screen||{};c.dialId=this.i;c.name=this.j;this.u("pairingComplete",new Uj(c))};
g.re=function(a){this.b=null;a.status&&404==a.status?this.g>=pk.length?this.u("pairingFailed",Error("DIAL polling timed out")):(a=pk[this.g],this.f=H(w(this.xc,this),a),this.g++):this.u("pairingFailed",Error("Server error "+a.status))};
g.te=function(){this.b=null;this.u("pairingFailed",Error("Server not responding"))};function qk(a){this.app=this.name=this.id="";this.type="REMOTE_CONTROL";this.avatar=this.username="";this.capabilities=new Rc;this.experiments=new Rc;this.theme="u";if(a){this.id=a.id||a.name;this.name=a.name;this.app=a.app;this.type=a.type||"REMOTE_CONTROL";this.username=a.user||"";this.avatar=a.userAvatarUri||"";this.theme=a.theme||"u";var b=a.capabilities||"";this.capabilities.clear();Sc(this.capabilities,Ia(b.split(","),na($a,bk)));a=a.experiments||"";this.experiments.clear();Sc(this.experiments,
a.split(","))}}
qk.prototype.equals=function(a){return a?this.id==a.id:!1};var rk;function sk(){var a=tk(),b=uk();A(a,b);if(vk()){var c=a,d;d=0;for(var e=c.length,f;d<e;){var h=d+e>>1,k;k=Wa(b,c[h]);0<k?d=h+1:(e=h,f=!k)}d=f?d:~d;0>d&&Ua(c,-(d+1),0,b)}a=wk(a);if(0==a.length)try{Qe.remove("remote_sid","/","youtube.com")}catch(m){}else try{Re("remote_sid",a.join(","),-1)}catch(m){}}
function tk(){var a=T("yt-remote-connected-devices")||[];a.sort(Wa);return a}
function wk(a){if(0==a.length)return[];var b=a[0].indexOf("#"),c=-1==b?a[0]:a[0].substring(0,b);return Ja(a,function(a,b){return 0==b?a:a.substring(c.length)})}
function xk(a){S("yt-remote-connected-devices",a,86400)}
function uk(){if(yk)return yk;var a=T("yt-remote-device-id");a||(a=fk(),S("yt-remote-device-id",a,31536E3));for(var b=tk(),c=1,d=a;A(b,d);)c++,d=a+"#"+c;return yk=d}
function zk(){return T("yt-remote-session-browser-channel")}
function vk(){return T("yt-remote-session-screen-id")}
function Ak(a){5<a.length&&(a=a.slice(a.length-5));var b=Ja(Bk(),function(a){return a.loungeToken}),c=Ja(a,function(a){return a.loungeToken});
La(c,function(a){return!A(b,a)})&&Ck();
S("yt-remote-local-screens",a,31536E3)}
function Bk(){return T("yt-remote-local-screens")||[]}
function Ck(){S("yt-remote-lounge-token-expiration",!0,86400)}
function Dk(a,b){S("yt-remote-session-browser-channel",a);S("yt-remote-session-screen-id",b);var c=tk(),d=uk();A(c,d)||c.push(d);xk(c);sk()}
function Ek(a){a||(mj("yt-remote-session-screen-id"),mj("yt-remote-session-video-id"));sk();a=tk();Pa(a,uk());xk(a)}
function Fk(){if(!rk){var a;a=new Zi;(a=a.isAvailable()?a:null)&&(rk=new aj(a))}return rk?!!rk.get("yt-remote-use-staging-server"):!1}
var yk="";function Gk(a){kk.call(this,"LocalScreenService");this.f=a;this.b=NaN;Hk(this);this.info("Initializing with "+ak(this.screens))}
y(Gk,kk);g=Gk.prototype;g.start=function(){Hk(this)&&this.u("screenChange");!T("yt-remote-lounge-token-expiration")&&Ik(this);I(this.b);this.b=H(w(this.start,this),1E4)};
g.xb=function(a,b){Hk(this);lk(this,a);Jk(this,!1);this.u("screenChange");b(a);a.token||Ik(this)};
g.remove=function(a,b){var c=Hk(this);nk(this,a)&&(Jk(this,!1),c=!0);b(a);c&&this.u("screenChange")};
g.ub=function(a,b,c,d){var e=Hk(this),f=this.get(a.id);f?(f.name!=b&&(f.name=b,Jk(this,!1),e=!0),c(a)):d(Error("no such local screen."));e&&this.u("screenChange")};
g.w=function(){I(this.b);Gk.B.w.call(this)};
function Ik(a){if(a.screens.length){var b=Ja(a.screens,function(a){return a.id}),c=dk(a.f,"/pairing/get_lounge_token_batch");
ek(a.f,c,{screen_ids:b.join(",")},w(a.ld,a),w(a.kd,a))}}
g.ld=function(a){Hk(this);var b=this.screens.length;a=a&&a.screens||[];for(var c=0,d=a.length;c<d;++c){var e=a[c],f=this.get(e.screenId);f&&(f.token=e.loungeToken,--b)}Jk(this,!b);b&&Rj(this.l,"Missed "+b+" lounge tokens.")};
g.kd=function(a){Rj(this.l,"Requesting lounge tokens failed: "+a)};
function Hk(a){var b=Yj(Bk()),b=Ia(b,function(a){return!a.uuid});
return mk(a,b)}
function Jk(a,b){Ak(Ja(a.screens,Wj));b&&Ck()}
;function Kk(a,b){U.call(this);this.l=b;for(var c=T("yt-remote-online-screen-ids")||"",c=c?c.split(","):[],d={},e=this.l(),f=0,h=e.length;f<h;++f){var k=e[f].id;d[k]=A(c,k)}this.b=d;this.j=a;this.g=this.i=NaN;this.f=null;Lk("Initialized with "+L(this.b))}
y(Kk,U);g=Kk.prototype;g.start=function(){var a=parseInt(T("yt-remote-fast-check-period")||"0",10);(this.i=x()-144E5<a?0:a)?Mk(this):(this.i=x()+3E5,S("yt-remote-fast-check-period",this.i),this.Ob())};
g.isEmpty=function(){return fb(this.b)};
g.update=function(){Lk("Updating availability on schedule.");var a=this.l(),b=Ya(this.b,function(b,d){return b&&!!jk(a,d)},this);
Nk(this,b)};
function Ok(a,b,c){var d=dk(a.j,"/pairing/get_screen_availability");ek(a.j,d,{lounge_token:b.token},w(function(a){a=a.screens||[];for(var d=0,h=a.length;d<h;++d)if(a[d].loungeToken==b.token){c("online"==a[d].status);return}c(!1)},a),w(function(){c(!1)},a))}
g.w=function(){I(this.g);this.g=NaN;this.f&&(this.f.abort(),this.f=null);Kk.B.w.call(this)};
function Nk(a,b){var c;a:if(Za(b)!=Za(a.b))c=!1;else{c=cb(b);for(var d=0,e=c.length;d<e;++d)if(!a.b[c[d]]){c=!1;break a}c=!0}c||(Lk("Updated online screens: "+L(a.b)),a.b=b,a.u("screenChange"));Pk(a)}
function Mk(a){isNaN(a.g)||I(a.g);a.g=H(w(a.Ob,a),0<a.i&&a.i<x()?2E4:1E4)}
g.Ob=function(){I(this.g);this.g=NaN;this.f&&this.f.abort();var a=Qk(this);if(Za(a)){var b=dk(this.j,"/pairing/get_screen_availability");this.f=ek(this.j,b,{lounge_token:cb(a).join(",")},w(this.Md,this,a),w(this.Ld,this))}else Nk(this,{}),Mk(this)};
g.Md=function(a,b){this.f=null;var c;a:{c=cb(Qk(this));var d=cb(a);if(da(c)&&da(d)&&c.length==d.length){for(var e=c.length,f=0;f<e;f++)if(c[f]!==d[f]){c=!1;break a}c=!0}else c=!1}if(c){c=b.screens||[];d={};e=0;for(f=c.length;e<f;++e)d[a[c[e].loungeToken]]="online"==c[e].status;Nk(this,d);Mk(this)}else this.I("Changing Screen set during request."),this.Ob()};
g.Ld=function(a){this.I("Screen availability failed: "+a);this.f=null;Mk(this)};
function Lk(a){Rj("OnlineScreenService",a)}
g.I=function(a){Rj("OnlineScreenService",a)};
function Qk(a){var b={};z(a.l(),function(a){a.token?b[a.token]=a.id:this.I("Requesting availability of screen w/o lounge token.")});
return b}
function Pk(a){a=cb(Ya(a.b,function(a){return a}));
a.sort(Wa);a.length?S("yt-remote-online-screen-ids",a.join(","),60):mj("yt-remote-online-screen-ids")}
;function V(a){kk.call(this,"ScreenService");this.j=a;this.b=this.f=null;this.g=[];this.i={};Rk(this)}
y(V,kk);g=V.prototype;g.start=function(){this.f.start();this.b.start();this.screens.length&&(this.u("screenChange"),this.b.isEmpty()||this.u("onlineScreenChange"))};
g.xb=function(a,b,c){this.f.xb(a,b,c)};
g.remove=function(a,b,c){this.f.remove(a,b,c);this.b.update()};
g.ub=function(a,b,c,d){this.f.contains(a)?this.f.ub(a,b,c,d):(a="Updating name of unknown screen: "+a.name,Rj(this.l,a),d(Error(a)))};
g.W=function(a){return a?this.screens:Ra(this.screens,Ia(this.g,function(a){return!this.contains(a)},this))};
g.Gc=function(){return Ia(this.W(!0),function(a){return!!this.b.b[a.id]},this)};
function Sk(a,b,c,d,e,f){a.info("getAutomaticScreenByIds "+c+" / "+b);c||(c=a.i[b]);var h=a.W();if(h=(c?jk(h,c):null)||jk(h,b)){h.uuid=b;var k=Tk(a,h);Ok(a.b,k,function(a){e(a?k:null)})}else c?Uk(a,c,w(function(a){var f=Tk(this,new Uj({name:d,
screenId:c,loungeToken:a,dialId:b||""}));Ok(this.b,f,function(a){e(a?f:null)})},a),f):e(null)}
g.Hc=function(a,b,c,d,e){this.info("getDialScreenByPairingCode "+a+" / "+b);var f=new ok(this.j,a,b,c);f.subscribe("pairingComplete",w(function(a){E(f);d(Tk(this,a))},this));
f.subscribe("pairingFailed",function(a){E(f);e(a)});
f.start();return w(f.stop,f)};
function Vk(a,b){for(var c=0,d=a.screens.length;c<d;++c)if(a.screens[c].name==b)return a.screens[c];return null}
g.ve=function(a,b,c,d){Od(dk(this.j,"/pairing/get_screen"),{method:"POST",S:{pairing_code:a},timeout:5E3,ba:w(function(a,d){var h=new Uj(d.screen||{});if(!h.name||Vk(this,h.name)){var k;a:{k=h.name;for(var m=2,n=b(k,m);Vk(this,n);){m++;if(20<m)break a;n=b(k,m)}k=n}h.name=k}c(Tk(this,h))},this),
onError:w(function(a){d(Error("pairing request failed: "+a.status))},this),
Da:w(function(){d(Error("pairing request timed out."))},this)})};
g.w=function(){E(this.f);E(this.b);V.B.w.call(this)};
function Uk(a,b,c,d){a.info("requestLoungeToken_ for "+b);var e={S:{screen_ids:b},method:"POST",context:a,ba:function(a,e){var k=e&&e.screens||[];k[0]&&k[0].screenId==b?c(k[0].loungeToken):d(Error("Missing lounge token in token response"))},
onError:function(){d(Error("Request screen lounge token failed"))}};
Od(dk(a.j,"/pairing/get_lounge_token_batch"),e)}
function Wk(a){a.screens=a.f.W();var b=a.i,c={},d;for(d in b)c[b[d]]=d;b=0;for(d=a.screens.length;b<d;++b){var e=a.screens[b];e.uuid=c[e.id]||""}a.info("Updated manual screens: "+ak(a.screens))}
g.md=function(){Wk(this);this.u("screenChange");this.b.update()};
function Rk(a){Xk(a);a.f=new Gk(a.j);a.f.subscribe("screenChange",w(a.md,a));Wk(a);a.g=Yj(T("yt-remote-automatic-screen-cache")||[]);Xk(a);a.info("Initializing automatic screens: "+ak(a.g));a.b=new Kk(a.j,w(a.W,a,!0));a.b.subscribe("screenChange",w(function(){this.u("onlineScreenChange")},a))}
function Tk(a,b){var c=a.get(b.id);c?(c.uuid=b.uuid,b=c):((c=jk(a.g,b.uuid))?(c.id=b.id,c.token=b.token,b=c):a.g.push(b),S("yt-remote-automatic-screen-cache",Ja(a.g,Wj)));Xk(a);a.i[b.uuid]=b.id;S("yt-remote-device-id-map",a.i,31536E3);return b}
function Xk(a){a.i=T("yt-remote-device-id-map")||{}}
V.prototype.dispose=V.prototype.dispose;function Yk(a,b,c){U.call(this);this.L=c;this.F=a;this.b=b;this.g=null}
y(Yk,U);g=Yk.prototype;g.ob=function(a){this.g=a;this.u("sessionScreen",this.g)};
g.X=function(a){this.isDisposed()||(a&&Zk(this,""+a),this.g=null,this.u("sessionScreen",null))};
g.info=function(a){Rj(this.L,a)};
function Zk(a,b){Rj(a.L,b)}
g.Jc=function(){return null};
g.Qb=function(a){var b=this.b;a?(b.displayStatus=new chrome.cast.ReceiverDisplayStatus(a,[]),b.displayStatus.showStop=!0):b.displayStatus=null;chrome.cast.setReceiverDisplayStatus(b,w(function(){this.info("Updated receiver status for "+b.friendlyName+": "+a)},this),w(function(){Zk(this,"Failed to update receiver status for: "+b.friendlyName)},this))};
g.w=function(){this.Qb("");Yk.B.w.call(this)};function $k(a,b){Yk.call(this,a,b,"CastSession");this.f=null;this.i=0;this.l=w(this.we,this);this.j=w(this.Xd,this);this.i=H(w(function(){al(this,null)},this),12E4)}
y($k,Yk);g=$k.prototype;g.Pb=function(a){if(this.f){if(this.f==a)return;Zk(this,"Overriding cast sesison with new session object");this.f.removeUpdateListener(this.l);this.f.removeMessageListener("urn:x-cast:com.google.youtube.mdx",this.j)}this.f=a;this.f.addUpdateListener(this.l);this.f.addMessageListener("urn:x-cast:com.google.youtube.mdx",this.j);bl(this)};
g.La=function(a){this.info("launchWithParams no-op for Cast: "+L(a))};
g.stop=function(){this.f?this.f.stop(w(function(){this.X()},this),w(function(){this.X(Error("Failed to stop receiver app."))},this)):this.X(Error("Stopping cast device witout session."))};
g.Qb=t;g.w=function(){this.info("disposeInternal");I(this.i);this.i=0;this.f&&(this.f.removeUpdateListener(this.l),this.f.removeMessageListener("urn:x-cast:com.google.youtube.mdx",this.j));this.f=null;$k.B.w.call(this)};
function bl(a){a.info("sendYoutubeMessage_: getMdxSessionStatus "+L(void 0));var b={type:"getMdxSessionStatus"};a.f?a.f.sendMessage("urn:x-cast:com.google.youtube.mdx",b,t,w(function(){Zk(this,"Failed to send message: getMdxSessionStatus.")},a)):Zk(a,"Sending yt message without session: "+L(b))}
g.Xd=function(a,b){if(!this.isDisposed())if(b){var c=od(b);if(c){var d=""+c.type,c=c.data||{};this.info("onYoutubeMessage_: "+d+" "+L(c));switch(d){case "mdxSessionStatus":al(this,c.screenId);break;default:Zk(this,"Unknown youtube message: "+d)}}else Zk(this,"Unable to parse message.")}else Zk(this,"No data in message.")};
function al(a,b){I(a.i);if(b){if(a.info("onConnectedScreenId_: Received screenId: "+b),!a.g||a.g.id!=b){var c=w(a.ob,a),d=w(a.X,a);a.gc(b,c,d,5)}}else a.X(Error("Waiting for session status timed out."))}
g.gc=function(a,b,c,d){Sk(this.F,this.b.label,a,this.b.friendlyName,w(function(e){e?b(e):0<=d?(Zk(this,"Screen "+a+" appears to be offline. "+d+" retries left."),H(w(this.gc,this,a,b,c,d-1),300)):c(Error("Unable to fetch screen."))},this),c)};
g.Jc=function(){return this.f};
g.we=function(a){this.isDisposed()||a||(Zk(this,"Cast session died."),this.X())};function cl(a,b){Yk.call(this,a,b,"DialSession");this.i=this.D=null;this.H="";this.j=null;this.A=t;this.l=NaN;this.K=w(this.ze,this);this.f=t}
y(cl,Yk);g=cl.prototype;g.Pb=function(a){this.i=a;this.i.addUpdateListener(this.K)};
g.La=function(a){this.j=a;this.A()};
g.stop=function(){this.f();this.f=t;I(this.l);this.i?this.i.stop(w(this.X,this,null),w(this.X,this,"Failed to stop DIAL device.")):this.X()};
g.w=function(){this.f();this.f=t;I(this.l);this.i&&this.i.removeUpdateListener(this.K);this.i=null;cl.B.w.call(this)};
function dl(a){a.f=a.F.Hc(a.H,a.b.label,a.b.friendlyName,w(function(a){this.f=t;this.ob(a)},a),w(function(a){this.f=t;
this.X(a)},a))}
g.ze=function(a){this.isDisposed()||a||(Zk(this,"DIAL session died."),this.f(),this.f=t,this.X())};
function el(a){var b={};b.pairingCode=a.H;if(a.j){var c=a.j.currentTime||0;b.v=a.j.videoId;b.t=c}Fk()&&(b.env_useStageMdx=1);return Dd(b)}
g.Lb=function(a){this.H=fk();if(this.j){var b=new chrome.cast.DialLaunchResponse(!0,el(this));a(b);dl(this)}else this.A=w(function(){I(this.l);this.A=t;this.l=NaN;var b=new chrome.cast.DialLaunchResponse(!0,el(this));a(b);dl(this)},this),this.l=H(w(function(){this.A()},this),100)};
g.nd=function(a,b){Sk(this.F,this.D.receiver.label,a,this.b.friendlyName,w(function(a){a&&a.token?(this.ob(a),b(new chrome.cast.DialLaunchResponse(!1))):this.Lb(b)},this),w(function(a){Zk(this,"Failed to get DIAL screen: "+a);
this.Lb(b)},this))};function fl(a,b){Yk.call(this,a,b,"ManualSession");this.f=H(w(this.La,this,null),150)}
y(fl,Yk);fl.prototype.stop=function(){this.X()};
fl.prototype.Pb=t;fl.prototype.La=function(){I(this.f);this.f=NaN;var a=jk(this.F.W(),this.b.label);a?this.ob(a):this.X(Error("No such screen"))};
fl.prototype.w=function(){I(this.f);this.f=NaN;fl.B.w.call(this)};function W(a){U.call(this);this.f=a;this.b=null;this.j=!1;this.g=[];this.i=w(this.Jd,this)}
y(W,U);g=W.prototype;
g.init=function(a,b){chrome.cast.timeout.requestSession=3E4;var c=new chrome.cast.SessionRequest("233637DE");c.dialRequest=new chrome.cast.DialRequest("YouTube");var d=chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED,e=a?chrome.cast.DefaultActionPolicy.CAST_THIS_TAB:chrome.cast.DefaultActionPolicy.CREATE_SESSION,c=new chrome.cast.ApiConfig(c,w(this.qc,this),w(this.Kd,this),d,e);c.customDialLaunchCallback=w(this.yd,this);chrome.cast.initialize(c,w(function(){this.isDisposed()||(chrome.cast.addReceiverActionListener(this.i),
Nj(),this.f.subscribe("onlineScreenChange",w(this.Ic,this)),this.g=gl(this),chrome.cast.setCustomReceivers(this.g,t,w(function(a){this.I("Failed to set initial custom receivers: "+L(a))},this)),this.u("yt-remote-cast2-availability-change",hl(this)),b(!0))},this),w(function(a){this.I("Failed to initialize API: "+L(a));
b(!1)},this))};
g.ke=function(a,b){X("Setting connected screen ID: "+a+" -> "+b);if(this.b){var c=this.b.g;if(!a||c&&c.id!=a)X("Unsetting old screen status: "+this.b.b.friendlyName),E(this.b),this.b=null}if(a&&b){if(!this.b){c=jk(this.f.W(),a);if(!c){X("setConnectedScreenStatus: Unknown screen.");return}var d=il(this,c);d||(X("setConnectedScreenStatus: Connected receiver not custom..."),d=new chrome.cast.Receiver(c.uuid?c.uuid:c.id,c.name),d.receiverType=chrome.cast.ReceiverType.CUSTOM,this.g.push(d),chrome.cast.setCustomReceivers(this.g,
t,w(function(a){this.I("Failed to set initial custom receivers: "+L(a))},this)));
X("setConnectedScreenStatus: new active receiver: "+d.friendlyName);jl(this,new fl(this.f,d),!0)}this.b.Qb(b)}else X("setConnectedScreenStatus: no screen.")};
function il(a,b){return b?Ma(a.g,function(a){return Vj(b,a.label)},a):null}
g.le=function(a){this.isDisposed()?this.I("Setting connection data on disposed cast v2"):this.b?this.b.La(a):this.I("Setting connection data without a session")};
g.ye=function(){this.isDisposed()?this.I("Stopping session on disposed cast v2"):this.b?(this.b.stop(),E(this.b),this.b=null):X("Stopping non-existing session")};
g.requestSession=function(){chrome.cast.requestSession(w(this.qc,this),w(this.Nd,this))};
g.w=function(){this.f.unsubscribe("onlineScreenChange",w(this.Ic,this));window.chrome&&chrome.cast&&chrome.cast.removeReceiverActionListener(this.i);var a=Oj,b=r("yt.mdx.remote.debug.handlers_");Pa(b||[],a);E(this.b);W.B.w.call(this)};
function X(a){Rj("Controller",a)}
g.I=function(a){Rj("Controller",a)};
function Oj(a){window.chrome&&chrome.cast&&chrome.cast.logMessage&&chrome.cast.logMessage(a)}
function hl(a){return a.j||!!a.g.length||!!a.b}
function jl(a,b,c){E(a.b);(a.b=b)?(c?a.u("yt-remote-cast2-receiver-resumed",b.b):a.u("yt-remote-cast2-receiver-selected",b.b),b.subscribe("sessionScreen",w(a.sc,a,b)),b.g?a.u("yt-remote-cast2-session-change",b.g):c&&a.b.La(null)):a.u("yt-remote-cast2-session-change",null)}
g.sc=function(a,b){this.b==a&&(b||jl(this,null),this.u("yt-remote-cast2-session-change",b))};
g.Jd=function(a,b){if(!this.isDisposed())if(a)switch(X("onReceiverAction_ "+a.label+" / "+a.friendlyName+"-- "+b),b){case chrome.cast.ReceiverAction.CAST:if(this.b)if(this.b.b.label!=a.label)X("onReceiverAction_: Stopping active receiver: "+this.b.b.friendlyName),this.b.stop();else{X("onReceiverAction_: Casting to active receiver.");this.b.g&&this.u("yt-remote-cast2-session-change",this.b.g);break}switch(a.receiverType){case chrome.cast.ReceiverType.CUSTOM:jl(this,new fl(this.f,a));break;case chrome.cast.ReceiverType.DIAL:jl(this,
new cl(this.f,a));break;case chrome.cast.ReceiverType.CAST:jl(this,new $k(this.f,a));break;default:this.I("Unknown receiver type: "+a.receiverType)}break;case chrome.cast.ReceiverAction.STOP:this.b&&this.b.b.label==a.label?this.b.stop():this.I("Stopping receiver w/o session: "+a.friendlyName)}else this.I("onReceiverAction_ called without receiver.")};
g.yd=function(a){if(this.isDisposed())return Promise.reject(Error("disposed"));var b=a.receiver;b.receiverType!=chrome.cast.ReceiverType.DIAL&&(this.I("Not DIAL receiver: "+b.friendlyName),b.receiverType=chrome.cast.ReceiverType.DIAL);var c=this.b?this.b.b:null;if(!c||c.label!=b.label)return this.I("Receiving DIAL launch request for non-clicked DIAL receiver: "+b.friendlyName),Promise.reject(Error("illegal DIAL launch"));if(c&&c.label==b.label&&c.receiverType!=chrome.cast.ReceiverType.DIAL){if(this.b.g)return X("Reselecting dial screen."),
this.u("yt-remote-cast2-session-change",this.b.g),Promise.resolve(new chrome.cast.DialLaunchResponse(!1));this.I('Changing CAST intent from "'+c.receiverType+'" to "dial" for '+b.friendlyName);jl(this,new cl(this.f,b))}b=this.b;b.D=a;return b.D.appState==chrome.cast.DialAppState.RUNNING?new Promise(w(b.nd,b,(b.D.extraData||{}).screenId||null)):new Promise(w(b.Lb,b))};
g.qc=function(a){if(!this.isDisposed()){X("New cast session ID: "+a.sessionId);var b=a.receiver;if(b.receiverType!=chrome.cast.ReceiverType.CUSTOM){if(!this.b)if(b.receiverType==chrome.cast.ReceiverType.CAST)X("Got resumed cast session before resumed mdx connection."),jl(this,new $k(this.f,b),!0);else{this.I("Got non-cast session without previous mdx receiver event, or mdx resume.");return}var c=this.b.b,d=jk(this.f.W(),c.label);d&&Vj(d,b.label)&&c.receiverType!=chrome.cast.ReceiverType.CAST&&b.receiverType==
chrome.cast.ReceiverType.CAST&&(X("onSessionEstablished_: manual to cast session change "+b.friendlyName),E(this.b),this.b=new $k(this.f,b),this.b.subscribe("sessionScreen",w(this.sc,this,this.b)),this.b.La(null));this.b.Pb(a)}}};
g.xe=function(){return this.b?this.b.Jc():null};
g.Nd=function(a){this.isDisposed()||(this.I("Failed to estabilish a session: "+L(a)),a.code!=chrome.cast.ErrorCode.CANCEL&&jl(this,null))};
g.Kd=function(a){X("Receiver availability updated: "+a);if(!this.isDisposed()){var b=hl(this);this.j=a==chrome.cast.ReceiverAvailability.AVAILABLE;hl(this)!=b&&this.u("yt-remote-cast2-availability-change",hl(this))}};
function gl(a){var b=a.f.Gc(),c=a.b&&a.b.b;a=Ja(b,function(a){c&&Vj(a,c.label)&&(c=null);var b=a.uuid?a.uuid:a.id,f=il(this,a);f?(f.label=b,f.friendlyName=a.name):(f=new chrome.cast.Receiver(b,a.name),f.receiverType=chrome.cast.ReceiverType.CUSTOM);return f},a);
c&&(c.receiverType!=chrome.cast.ReceiverType.CUSTOM&&(c=new chrome.cast.Receiver(c.label,c.friendlyName),c.receiverType=chrome.cast.ReceiverType.CUSTOM),a.push(c));return a}
g.Ic=function(){if(!this.isDisposed()){var a=hl(this);this.g=gl(this);X("Updating custom receivers: "+L(this.g));chrome.cast.setCustomReceivers(this.g,t,w(function(){this.I("Failed to set custom receivers.")},this));
var b=hl(this);b!=a&&this.u("yt-remote-cast2-availability-change",b)}};
W.prototype.setLaunchParams=W.prototype.le;W.prototype.setConnectedScreenStatus=W.prototype.ke;W.prototype.stopSession=W.prototype.ye;W.prototype.getCastSession=W.prototype.xe;W.prototype.requestSession=W.prototype.requestSession;W.prototype.init=W.prototype.init;W.prototype.dispose=W.prototype.dispose;function kl(a,b,c){ll()?nl(a)&&(ol(!0),window.chrome&&chrome.cast&&chrome.cast.isAvailable?pl(b):(window.__onGCastApiAvailable=function(a,c){a?pl(b):(ql("Failed to load cast API: "+c),rl(!1),ol(!1),mj("yt-remote-cast-available"),mj("yt-remote-cast-receiver"),sl(),b(!1))},c?pc("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"):Hj())):ml("Cannot initialize because not running Chrome")}
function sl(){ml("dispose");var a=tl();a&&a.dispose();ul=null;q("yt.mdx.remote.cloudview.instance_",null,void 0);vl(!1);lc(wl);wl.length=0}
function xl(){return!!T("yt-remote-cast-installed")}
function yl(){var a=T("yt-remote-cast-receiver");a?(a=a.friendlyName,a=-1!=a.indexOf("&")?"document"in l?za(a):Ba(a):a):a=null;return a}
function zl(){ml("clearCurrentReciever");mj("yt-remote-cast-receiver")}
function Al(){xl()?tl()?Bl()?(ml("Requesting cast selector."),ul.requestSession()):(ml("Wait for cast API to be ready to request the session."),wl.push(jc("yt-remote-cast2-api-ready",Al))):ql("requestCastSelector: Cast is not initialized."):ql("requestCastSelector: Cast API is not installed!")}
function Cl(a){Bl()?tl().setLaunchParams(a):ql("setLaunchParams called before ready.")}
function Dl(a,b){Bl()?tl().setConnectedScreenStatus(a,b):ql("setConnectedScreenStatus called before ready.")}
var ul=null;function ll(){var a;a=0<=lb.search(/\ (CrMo|Chrome|CriOS)\//);return of||a}
function nl(a){var b=!1;if(!ul){var c=r("yt.mdx.remote.cloudview.instance_");c||(c=new W(a),c.subscribe("yt-remote-cast2-availability-change",function(a){S("yt-remote-cast-available",a);J("yt-remote-cast2-availability-change",a)}),c.subscribe("yt-remote-cast2-receiver-selected",function(a){ml("onReceiverSelected: "+a.friendlyName);
S("yt-remote-cast-receiver",a);J("yt-remote-cast2-receiver-selected",a)}),c.subscribe("yt-remote-cast2-receiver-resumed",function(a){ml("onReceiverResumed: "+a.friendlyName);
S("yt-remote-cast-receiver",a)}),c.subscribe("yt-remote-cast2-session-change",function(a){ml("onSessionChange: "+Zj(a));
a||mj("yt-remote-cast-receiver");J("yt-remote-cast2-session-change",a)}),q("yt.mdx.remote.cloudview.instance_",c,void 0),b=!0);
ul=c}ml("cloudview.createSingleton_: "+b);return b}
function tl(){ul||(ul=r("yt.mdx.remote.cloudview.instance_"));return ul}
function pl(a){rl(!0);ol(!1);ul.init(!0,function(b){b?(vl(!0),J("yt-remote-cast2-api-ready")):(ql("Failed to initialize cast API."),rl(!1),mj("yt-remote-cast-available"),mj("yt-remote-cast-receiver"),sl());a(b)})}
function ml(a){Rj("cloudview",a)}
function ql(a){Rj("cloudview",a)}
function rl(a){ml("setCastInstalled_ "+a);S("yt-remote-cast-installed",a)}
function Bl(){return!!r("yt.mdx.remote.cloudview.apiReady_")}
function vl(a){ml("setApiReady_ "+a);q("yt.mdx.remote.cloudview.apiReady_",a,void 0)}
function ol(a){q("yt.mdx.remote.cloudview.initializing_",a,void 0)}
var wl=[];function El(){}
;function Fl(a,b){this.action=a;this.params=b||null}
;function Gl(){this.b=x()}
new Gl;Gl.prototype.set=function(a){this.b=a};
Gl.prototype.reset=function(){this.set(x())};
Gl.prototype.get=function(){return this.b};function Hl(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.b=!1;this.zc=!0}
Hl.prototype.stopPropagation=function(){this.b=!0};
Hl.prototype.preventDefault=function(){this.defaultPrevented=!0;this.zc=!1};var Il=!K||kd(9),Jl=K&&!jd("9");!bd||jd("528");ad&&jd("1.9b")||K&&jd("8")||Zc&&jd("9.5")||bd&&jd("528");ad&&!jd("8")||K&&jd("9");function Kl(a,b){Hl.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.f=this.state=null;a&&this.init(a,b)}
y(Kl,Hl);
Kl.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;var e=a.relatedTarget;if(e){if(ad){var f;a:{try{Wc(e.nodeName);f=!0;break a}catch(h){}f=!1}f||(e=null)}}else"mouseover"==c?e=a.fromElement:"mouseout"==c&&(e=a.toElement);this.relatedTarget=e;null===d?(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||
0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.f=a;a.defaultPrevented&&this.preventDefault()};
Kl.prototype.stopPropagation=function(){Kl.B.stopPropagation.call(this);this.f.stopPropagation?this.f.stopPropagation():this.f.cancelBubble=!0};
Kl.prototype.preventDefault=function(){Kl.B.preventDefault.call(this);var a=this.f;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Jl)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Ll="closure_listenable_"+(1E6*Math.random()|0),Ml=0;function Nl(a,b,c,d,e){this.listener=a;this.b=null;this.src=b;this.type=c;this.gb=!!d;this.kb=e;this.key=++Ml;this.Na=this.fb=!1}
function Ol(a){a.Na=!0;a.listener=null;a.b=null;a.src=null;a.kb=null}
;function Pl(a){this.src=a;this.b={};this.f=0}
function Ql(a,b,c,d,e){var f=b.toString();b=a.b[f];b||(b=a.b[f]=[],a.f++);var h=Rl(b,c,d,e);-1<h?(a=b[h],a.fb=!1):(a=new Nl(c,a.src,f,!!d,e),a.fb=!1,b.push(a));return a}
Pl.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.b))return!1;var e=this.b[a];b=Rl(e,b,c,d);return-1<b?(Ol(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.b[a],this.f--),!0):!1};
function Sl(a,b){var c=b.type;c in a.b&&Pa(a.b[c],b)&&(Ol(b),0==a.b[c].length&&(delete a.b[c],a.f--))}
function Tl(a,b,c,d,e){a=a.b[b.toString()];b=-1;a&&(b=Rl(a,c,d,e));return-1<b?a[b]:null}
function Rl(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Na&&f.listener==b&&f.gb==!!c&&f.kb==d)return e}return-1}
;var Ul="closure_lm_"+(1E6*Math.random()|0),Vl={},Wl=0;
function Xl(a,b,c,d,e){if(u(b)){for(var f=0;f<b.length;f++)Xl(a,b[f],c,d,e);return null}c=Yl(c);if(a&&a[Ll])a=a.lb(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,h=Zl(a);h||(a[Ul]=h=new Pl(a));c=Ql(h,b,c,d,e);if(!c.b){d=$l();c.b=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,f);else if(a.attachEvent)a.attachEvent(am(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");Wl++}a=c}return a}
function $l(){var a=bm,b=Il?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);
if(!c)return c};
return b}
function cm(a,b,c,d,e){if(u(b))for(var f=0;f<b.length;f++)cm(a,b[f],c,d,e);else c=Yl(c),a&&a[Ll]?a.tb(b,c,d,e):a&&(a=Zl(a))&&(b=Tl(a,b,c,!!d,e))&&dm(b)}
function dm(a){if(!ea(a)&&a&&!a.Na){var b=a.src;if(b&&b[Ll])Sl(b.g,a);else{var c=a.type,d=a.b;b.removeEventListener?b.removeEventListener(c,d,a.gb):b.detachEvent&&b.detachEvent(am(c),d);Wl--;(c=Zl(b))?(Sl(c,a),0==c.f&&(c.src=null,b[Ul]=null)):Ol(a)}}}
function am(a){return a in Vl?Vl[a]:Vl[a]="on"+a}
function em(a,b,c,d){var e=!0;if(a=Zl(a))if(b=a.b[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.gb==c&&!f.Na&&(f=fm(f,d),e=e&&!1!==f)}return e}
function fm(a,b){var c=a.listener,d=a.kb||a.src;a.fb&&dm(a);return c.call(d,b)}
function bm(a,b){if(a.Na)return!0;if(!Il){var c=b||r("window.event"),d=new Kl(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(m){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,h=c.length-1;!d.b&&0<=h;h--){d.currentTarget=c[h];var k=em(c[h],f,!0,d),e=e&&k}for(h=0;!d.b&&h<c.length;h++)d.currentTarget=c[h],k=em(c[h],f,!1,d),e=e&&k}return e}return fm(a,new Kl(b,this))}
function Zl(a){a=a[Ul];return a instanceof Pl?a:null}
var gm="__closure_events_fn_"+(1E9*Math.random()>>>0);function Yl(a){if(ga(a))return a;a[gm]||(a[gm]=function(b){return a.handleEvent(b)});
return a[gm]}
;function hm(){D.call(this);this.g=new Pl(this);this.qa=this;this.Z=null}
y(hm,D);hm.prototype[Ll]=!0;g=hm.prototype;g.addEventListener=function(a,b,c,d){Xl(this,a,b,c,d)};
g.removeEventListener=function(a,b,c,d){cm(this,a,b,c,d)};
function im(a,b){var c,d=a.Z;if(d){c=[];for(var e=1;d;d=d.Z)c.push(d),++e}var d=a.qa,e=b,f=e.type||e;if(v(e))e=new Hl(e,d);else if(e instanceof Hl)e.target=e.target||d;else{var h=e,e=new Hl(f,d);kb(e,h)}var h=!0,k;if(c)for(var m=c.length-1;!e.b&&0<=m;m--)k=e.currentTarget=c[m],h=jm(k,f,!0,e)&&h;e.b||(k=e.currentTarget=d,h=jm(k,f,!0,e)&&h,e.b||(h=jm(k,f,!1,e)&&h));if(c)for(m=0;!e.b&&m<c.length;m++)k=e.currentTarget=c[m],h=jm(k,f,!1,e)&&h}
g.w=function(){hm.B.w.call(this);if(this.g){var a=this.g,b=0,c;for(c in a.b){for(var d=a.b[c],e=0;e<d.length;e++)++b,Ol(d[e]);delete a.b[c];a.f--}}this.Z=null};
g.lb=function(a,b,c,d){return Ql(this.g,String(a),b,c,d)};
g.tb=function(a,b,c,d){return this.g.remove(String(a),b,c,d)};
function jm(a,b,c,d){b=a.g.b[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.Na&&h.gb==c){var k=h.listener,m=h.kb||h.src;h.fb&&Sl(a.g,h);e=!1!==k.call(m,d)&&e}}return e&&0!=d.zc}
;function km(a,b){this.f=new qd(a);this.b=b?od:nd}
km.prototype.stringify=function(a){return pd(this.f,a)};
km.prototype.parse=function(a){return this.b(a)};function lm(a,b){hm.call(this);this.b=a||1;this.f=b||l;this.i=w(this.ne,this);this.j=x()}
y(lm,hm);g=lm.prototype;g.enabled=!1;g.$=null;function mm(a,b){a.b=b;a.$&&a.enabled?(a.stop(),a.start()):a.$&&a.stop()}
g.ne=function(){if(this.enabled){var a=x()-this.j;0<a&&a<.8*this.b?this.$=this.f.setTimeout(this.i,this.b-a):(this.$&&(this.f.clearTimeout(this.$),this.$=null),im(this,"tick"),this.enabled&&(this.$=this.f.setTimeout(this.i,this.b),this.j=x()))}};
g.start=function(){this.enabled=!0;this.$||(this.$=this.f.setTimeout(this.i,this.b),this.j=x())};
g.stop=function(){this.enabled=!1;this.$&&(this.f.clearTimeout(this.$),this.$=null)};
g.w=function(){lm.B.w.call(this);this.stop();delete this.f};
function nm(a,b,c){if(ga(a))c&&(a=w(a,c));else if(a&&"function"==typeof a.handleEvent)a=w(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)}
;function om(a,b,c){D.call(this);this.i=null!=c?w(a,c):a;this.g=b;this.f=w(this.Pd,this);this.b=[]}
y(om,D);g=om.prototype;g.Oa=!1;g.ab=0;g.za=null;g.dd=function(a){this.b=arguments;this.za||this.ab?this.Oa=!0:pm(this)};
g.stop=function(){this.za&&(l.clearTimeout(this.za),this.za=null,this.Oa=!1,this.b=[])};
g.pause=function(){this.ab++};
g.resume=function(){this.ab--;this.ab||!this.Oa||this.za||(this.Oa=!1,pm(this))};
g.w=function(){om.B.w.call(this);this.stop()};
g.Pd=function(){this.za=null;this.Oa&&!this.ab&&(this.Oa=!1,pm(this))};
function pm(a){a.za=nm(a.f,a.g);a.i.apply(null,a.b)}
;function qm(a){D.call(this);this.f=a;this.b={}}
y(qm,D);var rm=[];qm.prototype.lb=function(a,b,c,d){u(b)||(b&&(rm[0]=b.toString()),b=rm);for(var e=0;e<b.length;e++){var f=Xl(a,b[e],c||this.handleEvent,d||!1,this.f||this);if(!f)break;this.b[f.key]=f}return this};
qm.prototype.tb=function(a,b,c,d,e){if(u(b))for(var f=0;f<b.length;f++)this.tb(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.f||this,c=Yl(c),d=!!d,b=a&&a[Ll]?Tl(a.g,String(b),c,d,e):a?(a=Zl(a))?Tl(a,b,c,d,e):null:null,b&&(dm(b),delete this.b[b.key]);return this};
function sm(a){Xa(a.b,function(a,c){this.b.hasOwnProperty(c)&&dm(a)},a);
a.b={}}
qm.prototype.w=function(){qm.B.w.call(this);sm(this)};
qm.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function tm(){}
tm.prototype.b=null;function um(a){var b;(b=a.b)||(b={},vm(a)&&(b[0]=!0,b[1]=!0),b=a.b=b);return b}
;var wm;function xm(){}
y(xm,tm);function ym(a){return(a=vm(a))?new ActiveXObject(a):new XMLHttpRequest}
function vm(a){if(!a.f&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.f=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.f}
wm=new xm;function zm(a,b,c,d,e){this.b=a;this.g=c;this.A=d;this.l=e||1;this.j=45E3;this.i=new qm(this);this.f=new lm;mm(this.f,250)}
g=zm.prototype;g.Aa=null;g.fa=!1;g.Qa=null;g.Sb=null;g.bb=null;g.Pa=null;g.ra=null;g.ua=null;g.Ea=null;g.J=null;g.eb=0;g.ga=null;g.wb=null;g.Ba=null;g.Za=-1;g.Ac=!0;g.wa=!1;g.Jb=0;g.qb=null;var Am={},Bm={};g=zm.prototype;g.setTimeout=function(a){this.j=a};
function Cm(a,b,c){a.Pa=1;a.ra=Dg(b.clone());a.Ea=c;a.o=!0;Dm(a,null)}
function Em(a,b,c,d,e){a.Pa=1;a.ra=Dg(b.clone());a.Ea=null;a.o=c;e&&(a.Ac=!1);Dm(a,d)}
function Dm(a,b){a.bb=x();Fm(a);a.ua=a.ra.clone();Bg(a.ua,"t",a.l);a.eb=0;a.J=a.b.Cb(a.b.cb()?b:null);0<a.Jb&&(a.qb=new om(w(a.Fc,a,a.J),a.Jb));a.i.lb(a.J,"readystatechange",a.$d);var c=a.Aa?hb(a.Aa):{};a.Ea?(a.wb="POST",c["Content-Type"]="application/x-www-form-urlencoded",a.J.send(a.ua,a.wb,a.Ea,c)):(a.wb="GET",a.Ac&&!bd&&(c.Connection="close"),a.J.send(a.ua,a.wb,null,c));a.b.ea(1)}
g.$d=function(a){a=a.target;var b=this.qb;b&&3==Gm(a)?b.dd():this.Fc(a)};
g.Fc=function(a){try{if(a==this.J)a:{var b=Gm(this.J),c=this.J.j,d=this.J.getStatus();if(K&&!kd(10)||bd&&!jd("420+")){if(4>b)break a}else if(3>b||3==b&&!Zc&&!Hm(this.J))break a;this.wa||4!=b||7==c||(8==c||0>=d?this.b.ea(3):this.b.ea(2));Im(this);var e=this.J.getStatus();this.Za=e;var f=Hm(this.J);(this.fa=200==e)?(4==b&&Jm(this),this.o?(Km(this,b,f),Zc&&this.fa&&3==b&&(this.i.lb(this.f,"tick",this.Yd),this.f.start())):Lm(this,f),this.fa&&!this.wa&&(4==b?this.b.nb(this):(this.fa=!1,Fm(this)))):(this.Ba=
400==e&&0<f.indexOf("Unknown SID")?3:0,Y(),Jm(this),Mm(this))}}catch(h){this.J&&Hm(this.J)}finally{}};
function Km(a,b,c){for(var d=!0;!a.wa&&a.eb<c.length;){var e=Nm(a,c);if(e==Bm){4==b&&(a.Ba=4,Y(),d=!1);break}else if(e==Am){a.Ba=4;Y();d=!1;break}else Lm(a,e)}4==b&&0==c.length&&(a.Ba=1,Y(),d=!1);a.fa=a.fa&&d;d||(Jm(a),Mm(a))}
g.Yd=function(){var a=Gm(this.J),b=Hm(this.J);this.eb<b.length&&(Im(this),Km(this,a,b),this.fa&&4!=a&&Fm(this))};
function Nm(a,b){var c=a.eb,d=b.indexOf("\n",c);if(-1==d)return Bm;c=Number(b.substring(c,d));if(isNaN(c))return Am;d+=1;if(d+c>b.length)return Bm;var e=b.substr(d,c);a.eb=d+c;return e}
function Om(a,b){a.bb=x();Fm(a);var c=b?window.location.hostname:"";a.ua=a.ra.clone();N(a.ua,"DOMAIN",c);N(a.ua,"t",a.l);try{a.ga=new ActiveXObject("htmlfile")}catch(n){Jm(a);a.Ba=7;Y();Mm(a);return}var d="<html><body>";if(b){for(var e="",f=0;f<c.length;f++){var h=c.charAt(f);if("<"==h)e+="\\x3c";else if(">"==h)e+="\\x3e";else{if(h in Da)h=Da[h];else if(h in Ca)h=Da[h]=Ca[h];else{var k,m=h.charCodeAt(0);if(31<m&&127>m)k=h;else{if(256>m){if(k="\\x",16>m||256<m)k+="0"}else k="\\u",4096>m&&(k+="0");
k+=m.toString(16).toUpperCase()}h=Da[h]=k}e+=h}}d+='<script>document.domain="'+e+'"\x3c/script>'}d+="</body></html>";c=Bc(qb("b/12014412"),d);a.ga.open();a.ga.write(zb(c));a.ga.close();a.ga.parentWindow.m=w(a.Td,a);a.ga.parentWindow.d=w(a.wc,a,!0);a.ga.parentWindow.rpcClose=w(a.wc,a,!1);c=a.ga.createElement("DIV");a.ga.parentWindow.document.body.appendChild(c);d=vb(a.ua.toString());d=tb(d);ya.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(sa,"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(ta,"&lt;")),-1!=
d.indexOf(">")&&(d=d.replace(ua,"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(va,"&quot;")),-1!=d.indexOf("'")&&(d=d.replace(wa,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(xa,"&#0;")));d=Bc(qb("b/12014412"),'<iframe src="'+d+'"></iframe>');c.innerHTML=zb(d);a.b.ea(1)}
g.Td=function(a){Pm(w(this.Sd,this,a),0)};
g.Sd=function(a){this.wa||(Im(this),Lm(this,a),Fm(this))};
g.wc=function(a){Pm(w(this.Rd,this,a),0)};
g.Rd=function(a){this.wa||(Jm(this),this.fa=a,this.b.nb(this),this.b.ea(4))};
g.cancel=function(){this.wa=!0;Jm(this)};
function Fm(a){a.Sb=x()+a.j;Qm(a,a.j)}
function Qm(a,b){if(null!=a.Qa)throw Error("WatchDog timer not null");a.Qa=Pm(w(a.Vd,a),b)}
function Im(a){a.Qa&&(l.clearTimeout(a.Qa),a.Qa=null)}
g.Vd=function(){this.Qa=null;var a=x();0<=a-this.Sb?(2!=this.Pa&&this.b.ea(3),Jm(this),this.Ba=2,Y(),Mm(this)):Qm(this,this.Sb-a)};
function Mm(a){a.b.ic()||a.wa||a.b.nb(a)}
function Jm(a){Im(a);E(a.qb);a.qb=null;a.f.stop();sm(a.i);if(a.J){var b=a.J;a.J=null;Rm(b);b.dispose()}a.ga&&(a.ga=null)}
function Lm(a,b){try{a.b.pc(a,b),a.b.ea(4)}catch(c){}}
;function Sm(a,b,c,d,e){if(0==d)c(!1);else{var f=e||0;d--;Tm(a,b,function(e){e?c(!0):l.setTimeout(function(){Sm(a,b,c,d,f)},f)})}}
function Tm(a,b,c){var d=new Image;d.onload=function(){try{Um(d),c(!0)}catch(a){}};
d.onerror=function(){try{Um(d),c(!1)}catch(a){}};
d.onabort=function(){try{Um(d),c(!1)}catch(a){}};
d.ontimeout=function(){try{Um(d),c(!1)}catch(a){}};
l.setTimeout(function(){if(d.ontimeout)d.ontimeout()},b);
d.src=a}
function Um(a){a.onload=null;a.onerror=null;a.onabort=null;a.ontimeout=null}
;function Vm(a){this.b=a;this.f=new km(null,!0)}
g=Vm.prototype;g.Hb=null;g.Y=null;g.rb=!1;g.Dc=null;g.hb=null;g.Mb=null;g.Ib=null;g.aa=null;g.pa=-1;g.Ya=null;g.Ua=null;g.connect=function(a){this.Ib=a;a=Wm(this.b,null,this.Ib);Y();this.Dc=x();var b=this.b.A;null!=b?(this.Ya=b[0],(this.Ua=b[1])?(this.aa=1,Xm(this)):(this.aa=2,Ym(this))):(Bg(a,"MODE","init"),this.Y=new zm(this,0,void 0,void 0,void 0),this.Y.Aa=this.Hb,Em(this.Y,a,!1,null,!0),this.aa=0)};
function Xm(a){var b=Wm(a.b,a.Ua,"/mail/images/cleardot.gif");Dg(b);Sm(b.toString(),5E3,w(a.$c,a),3,2E3);a.ea(1)}
g.$c=function(a){if(a)this.aa=2,Ym(this);else{Y();var b=this.b;b.da=b.sa.pa;Zm(b,9)}a&&this.ea(2)};
function Ym(a){var b=a.b.N;if(null!=b)Y(),b?(Y(),$m(a.b,a,!1)):(Y(),$m(a.b,a,!0));else if(a.Y=new zm(a,0,void 0,void 0,void 0),a.Y.Aa=a.Hb,b=a.b,b=Wm(b,b.cb()?a.Ya:null,a.Ib),Y(),!K||kd(10))Bg(b,"TYPE","xmlhttp"),Em(a.Y,b,!1,a.Ya,!1);else{Bg(b,"TYPE","html");var c=a.Y;a=!!a.Ya;c.Pa=3;c.ra=Dg(b.clone());Om(c,a)}}
g.Cb=function(a){return this.b.Cb(a)};
g.ic=function(){return!1};
g.pc=function(a,b){this.pa=a.Za;if(0==this.aa)if(b){try{var c=this.f.parse(b)}catch(d){c=this.b;c.da=this.pa;Zm(c,2);return}this.Ya=c[0];this.Ua=c[1]}else c=this.b,c.da=this.pa,Zm(c,2);else if(2==this.aa)if(this.rb)Y(),this.Mb=x();else if("11111"==b){if(Y(),this.rb=!0,this.hb=x(),c=this.hb-this.Dc,!K||kd(10)||500>c)this.pa=200,this.Y.cancel(),Y(),$m(this.b,this,!0)}else Y(),this.hb=this.Mb=x(),this.rb=!1};
g.nb=function(){this.pa=this.Y.Za;if(this.Y.fa)0==this.aa?this.Ua?(this.aa=1,Xm(this)):(this.aa=2,Ym(this)):2==this.aa&&((!K||kd(10)?!this.rb:200>this.Mb-this.hb)?(Y(),$m(this.b,this,!1)):(Y(),$m(this.b,this,!0)));else{0==this.aa?Y():2==this.aa&&Y();var a=this.b;a.da=this.pa;Zm(a,2)}};
g.cb=function(){return this.b.cb()};
g.isActive=function(){return this.b.isActive()};
g.ea=function(a){this.b.ea(a)};function an(a){hm.call(this);this.headers=new Hc;this.L=a||null;this.f=!1;this.K=this.b=null;this.ka=this.D="";this.j=0;this.o="";this.i=this.V=this.A=this.U=!1;this.l=0;this.F=null;this.la="";this.H=this.ia=!1}
y(an,hm);var bn=/^https?$/i,cn=["POST","PUT"];g=an.prototype;
g.send=function(a,b,c,d){if(this.b)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);b=b?b.toUpperCase():"GET";this.D=a;this.o="";this.j=0;this.ka=b;this.U=!1;this.f=!0;this.b=this.L?ym(this.L):ym(wm);this.K=this.L?um(this.L):um(wm);this.b.onreadystatechange=w(this.oc,this);try{El(dn(this,"Opening Xhr")),this.V=!0,this.b.open(b,String(a),!0),this.V=!1}catch(f){El(dn(this,"Error opening Xhr: "+f.message));en(this,f);return}a=c||"";var e=this.headers.clone();
d&&Oc(d,function(a,b){e.set(b,a)});
d=Ma(e.ja(),fn);c=l.FormData&&a instanceof l.FormData;!A(cn,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.b.setRequestHeader(b,a)},this);
this.la&&(this.b.responseType=this.la);"withCredentials"in this.b&&this.b.withCredentials!==this.ia&&(this.b.withCredentials=this.ia);try{gn(this),0<this.l&&(this.H=hn(this.b),El(dn(this,"Will abort after "+this.l+"ms if incomplete, xhr2 "+this.H)),this.H?(this.b.timeout=this.l,this.b.ontimeout=w(this.hc,this)):this.F=nm(this.hc,this.l,this)),El(dn(this,"Sending request")),this.A=!0,this.b.send(a),this.A=!1}catch(f){El(dn(this,"Send error: "+f.message)),en(this,f)}};
function hn(a){return K&&jd(9)&&ea(a.timeout)&&p(a.ontimeout)}
function fn(a){return"content-type"==a.toLowerCase()}
g.hc=function(){"undefined"!=typeof aa&&this.b&&(this.o="Timed out after "+this.l+"ms, aborting",this.j=8,dn(this,this.o),im(this,"timeout"),Rm(this,8))};
function en(a,b){a.f=!1;a.b&&(a.i=!0,a.b.abort(),a.i=!1);a.o=b;a.j=5;jn(a);kn(a)}
function jn(a){a.U||(a.U=!0,im(a,"complete"),im(a,"error"))}
function Rm(a,b){a.b&&a.f&&(dn(a,"Aborting"),a.f=!1,a.i=!0,a.b.abort(),a.i=!1,a.j=b||7,im(a,"complete"),im(a,"abort"),kn(a))}
g.w=function(){this.b&&(this.f&&(this.f=!1,this.i=!0,this.b.abort(),this.i=!1),kn(this,!0));an.B.w.call(this)};
g.oc=function(){this.isDisposed()||(this.V||this.A||this.i?ln(this):this.Hd())};
g.Hd=function(){ln(this)};
function ln(a){if(a.f&&"undefined"!=typeof aa)if(a.K[1]&&4==Gm(a)&&2==a.getStatus())dn(a,"Local request error detected and ignored");else if(a.A&&4==Gm(a))nm(a.oc,0,a);else if(im(a,"readystatechange"),4==Gm(a)){dn(a,"Request complete");a.f=!1;try{var b=a.getStatus(),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=xd(1,String(a.D));if(!f&&l.self&&l.self.location)var h=l.self.location.protocol,f=h.substr(0,
h.length-1);e=!bn.test(f?f.toLowerCase():"")}d=e}if(d)im(a,"complete"),im(a,"success");else{a.j=6;var k;try{k=2<Gm(a)?a.b.statusText:""}catch(m){k=""}a.o=k+" ["+a.getStatus()+"]";jn(a)}}finally{kn(a)}}}
function kn(a,b){if(a.b){gn(a);var c=a.b,d=a.K[0]?t:null;a.b=null;a.K=null;b||im(a,"ready");try{c.onreadystatechange=d}catch(e){}}}
function gn(a){a.b&&a.H&&(a.b.ontimeout=null);ea(a.F)&&(l.clearTimeout(a.F),a.F=null)}
g.isActive=function(){return!!this.b};
function Gm(a){return a.b?a.b.readyState:0}
g.getStatus=function(){try{return 2<Gm(this)?this.b.status:-1}catch(a){return-1}};
function Hm(a){try{return a.b?a.b.responseText:""}catch(b){return""}}
function dn(a,b){return b+" ["+a.ka+" "+a.D+" "+a.getStatus()+"]"}
;function mn(a,b,c){this.l=a||null;this.b=1;this.f=[];this.i=[];this.j=new km(null,!0);this.A=b||null;this.N=null!=c?c:null}
function nn(a,b){this.b=a;this.map=b;this.context=null}
g=mn.prototype;g.Wa=null;g.T=null;g.G=null;g.Gb=null;g.ib=null;g.Zb=null;g.jb=null;g.$a=0;g.sd=0;g.M=null;g.ta=null;g.oa=null;g.ya=null;g.sa=null;g.vb=null;g.Ka=-1;g.jc=-1;g.da=-1;g.Xa=0;g.Ja=0;g.xa=8;var on=new hm;function pn(a){Hl.call(this,"statevent",a)}
y(pn,Hl);function qn(a,b){Hl.call(this,"timingevent",a);this.size=b}
y(qn,Hl);function rn(a){Hl.call(this,"serverreachability",a)}
y(rn,Hl);g=mn.prototype;g.connect=function(a,b,c,d,e){Y();this.Gb=b;this.Wa=c||{};d&&p(e)&&(this.Wa.OSID=d,this.Wa.OAID=e);this.sa=new Vm(this);this.sa.Hb=null;this.sa.f=this.j;this.sa.connect(a)};
function sn(a){tn(a);if(3==a.b){var b=a.$a++,c=a.ib.clone();N(c,"SID",a.g);N(c,"RID",b);N(c,"TYPE","terminate");un(a,c);b=new zm(a,0,a.g,b,void 0);b.Pa=2;b.ra=Dg(c.clone());(new Image).src=b.ra;b.bb=x();Fm(b)}vn(a)}
function tn(a){if(a.sa){var b=a.sa;b.Y&&(b.Y.cancel(),b.Y=null);b.pa=-1;a.sa=null}a.G&&(a.G.cancel(),a.G=null);a.oa&&(l.clearTimeout(a.oa),a.oa=null);wn(a);a.T&&(a.T.cancel(),a.T=null);a.ta&&(l.clearTimeout(a.ta),a.ta=null)}
function xn(a,b){if(0==a.b)throw Error("Invalid operation: sending map when state is closed");a.f.push(new nn(a.sd++,b));2!=a.b&&3!=a.b||yn(a)}
g.ic=function(){return 0==this.b};
function yn(a){a.T||a.ta||(a.ta=Pm(w(a.uc,a),0),a.Xa=0)}
g.uc=function(a){this.ta=null;zn(this,a)};
function zn(a,b){if(1==a.b){if(!b){a.$a=Math.floor(1E5*Math.random());var c=a.$a++,d=new zm(a,0,"",c,void 0);d.Aa=null;var e=An(a),f=a.ib.clone();N(f,"RID",c);a.l&&N(f,"CVER",a.l);un(a,f);Cm(d,f,e);a.T=d;a.b=2}}else 3==a.b&&(b?Bn(a,b):0!=a.f.length&&(a.T||Bn(a)))}
function Bn(a,b){var c,d;b?6<a.xa?(a.f=a.i.concat(a.f),a.i.length=0,c=a.$a-1,d=An(a)):(c=b.A,d=b.Ea):(c=a.$a++,d=An(a));var e=a.ib.clone();N(e,"SID",a.g);N(e,"RID",c);N(e,"AID",a.Ka);un(a,e);c=new zm(a,0,a.g,c,a.Xa+1);c.Aa=null;c.setTimeout(Math.round(1E4)+Math.round(1E4*Math.random()));a.T=c;Cm(c,e,d)}
function un(a,b){if(a.M){var c=a.M.fc(a);c&&Xa(c,function(a,c){N(b,c,a)})}}
function An(a){var b=Math.min(a.f.length,1E3),c=["count="+b],d;6<a.xa&&0<b?(d=a.f[0].b,c.push("ofs="+d)):d=0;for(var e=0;e<b;e++){var f=a.f[e].b,h=a.f[e].map,f=6>=a.xa?e:f-d;try{Oc(h,function(a,b){c.push("req"+f+"_"+b+"="+encodeURIComponent(a))})}catch(k){c.push("req"+f+"_type="+encodeURIComponent("_badmap"))}}a.i=a.i.concat(a.f.splice(0,b));
return c.join("&")}
function Cn(a){a.G||a.oa||(a.o=1,a.oa=Pm(w(a.tc,a),0),a.Ja=0)}
function Dn(a){if(a.G||a.oa||3<=a.Ja)return!1;a.o++;a.oa=Pm(w(a.tc,a),En(a,a.Ja));a.Ja++;return!0}
g.tc=function(){this.oa=null;this.G=new zm(this,0,this.g,"rpc",this.o);this.G.Aa=null;this.G.Jb=0;var a=this.Zb.clone();N(a,"RID","rpc");N(a,"SID",this.g);N(a,"CI",this.vb?"0":"1");N(a,"AID",this.Ka);un(this,a);if(!K||kd(10))N(a,"TYPE","xmlhttp"),Em(this.G,a,!0,this.jb,!1);else{N(a,"TYPE","html");var b=this.G,c=!!this.jb;b.Pa=3;b.ra=Dg(a.clone());Om(b,c)}};
function $m(a,b,c){a.vb=c;a.da=b.pa;a.cd(1,0);a.ib=Wm(a,null,a.Gb);yn(a)}
g.pc=function(a,b){if(0!=this.b&&(this.G==a||this.T==a))if(this.da=a.Za,this.T==a&&3==this.b)if(7<this.xa){var c;try{c=this.j.parse(b)}catch(f){c=null}if(u(c)&&3==c.length)if(0==c[0])a:{if(!this.oa){if(this.G)if(this.G.bb+3E3<this.T.bb)wn(this),this.G.cancel(),this.G=null;else break a;Dn(this);Y()}}else this.jc=c[1],0<this.jc-this.Ka&&37500>c[2]&&this.vb&&0==this.Ja&&!this.ya&&(this.ya=Pm(w(this.td,this),6E3));else Zm(this,11)}else b!=Me.Ee.b&&Zm(this,11);else if(this.G==a&&wn(this),!/^[\s\xa0]*$/.test(b)){c=
this.j.parse(b);u(c);for(var d=0;d<c.length;d++){var e=c[d];this.Ka=e[0];e=e[1];2==this.b?"c"==e[0]?(this.g=e[1],this.jb=e[2],e=e[3],null!=e?this.xa=e:this.xa=6,this.b=3,this.M&&this.M.dc(this),this.Zb=Wm(this,this.cb()?this.jb:null,this.Gb),Cn(this)):"stop"==e[0]&&Zm(this,7):3==this.b&&("stop"==e[0]?Zm(this,7):"noop"!=e[0]&&this.M&&this.M.cc(this,e),this.Ja=0)}}};
g.td=function(){null!=this.ya&&(this.ya=null,this.G.cancel(),this.G=null,Dn(this),Y())};
function wn(a){null!=a.ya&&(l.clearTimeout(a.ya),a.ya=null)}
g.nb=function(a){var b;if(this.G==a)wn(this),this.G=null,b=2;else if(this.T==a)this.T=null,b=1;else return;this.da=a.Za;if(0!=this.b)if(a.fa)1==b?(x(),im(on,new qn(on,a.Ea?a.Ea.length:0)),yn(this),this.i.length=0):Cn(this);else{var c=a.Ba,d;if(!(d=3==c||7==c||0==c&&0<this.da)){if(d=1==b)this.T||this.ta||1==this.b||2<=this.Xa?d=!1:(this.ta=Pm(w(this.uc,this,a),En(this,this.Xa)),this.Xa++,d=!0);d=!(d||2==b&&Dn(this))}if(d)switch(c){case 1:Zm(this,5);break;case 4:Zm(this,10);break;case 3:Zm(this,6);
break;case 7:Zm(this,12);break;default:Zm(this,2)}}};
function En(a,b){var c=5E3+Math.floor(1E4*Math.random());a.isActive()||(c*=2);return c*b}
g.cd=function(a){if(!A(arguments,this.b))throw Error("Unexpected channel state: "+this.b);};
function Zm(a,b){if(2==b||9==b){var c=null;a.M&&(c=null);var d=w(a.me,a);c||(c=new ng("//www.google.com/images/cleardot.gif"),Dg(c));Tm(c.toString(),1E4,d)}else Y();Fn(a,b)}
g.me=function(a){a?Y():(Y(),Fn(this,8))};
function Fn(a,b){a.b=0;a.M&&a.M.bc(a,b);vn(a);tn(a)}
function vn(a){a.b=0;a.da=-1;if(a.M)if(0==a.i.length&&0==a.f.length)a.M.Ab(a);else{var b=Sa(a.i),c=Sa(a.f);a.i.length=0;a.f.length=0;a.M.Ab(a,b,c)}}
function Wm(a,b,c){var d=Eg(c);if(""!=d.f)b&&pg(d,b+"."+d.f),qg(d,d.l);else var e=window.location,d=Fg(e.protocol,b?b+"."+e.hostname:e.hostname,e.port,c);a.Wa&&Xa(a.Wa,function(a,b){N(d,b,a)});
N(d,"VER",a.xa);un(a,d);return d}
g.Cb=function(a){if(a)throw Error("Can't create secondary domain capable XhrIo object.");a=new an;a.ia=!1;return a};
g.isActive=function(){return!!this.M&&this.M.isActive(this)};
function Pm(a,b){if(!ga(a))throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},b)}
g.ea=function(){im(on,new rn(on))};
function Y(){im(on,new pn(on))}
g.cb=function(){return!(!K||kd(10))};
function Gn(){}
g=Gn.prototype;g.dc=function(){};
g.cc=function(){};
g.bc=function(){};
g.Ab=function(){};
g.fc=function(){return{}};
g.isActive=function(){return!0};function Hn(a,b){lm.call(this);this.o=0;if(ga(a))b&&(a=w(a,b));else if(a&&ga(a.handleEvent))a=w(a.handleEvent,a);else throw Error("Invalid listener argument");this.A=a;Xl(this,"tick",w(this.l,this));In(this)}
y(Hn,lm);Hn.prototype.l=function(){if(500<this.b){var a=this.b;24E4>2*a&&(a*=2);mm(this,a)}this.A()};
Hn.prototype.start=function(){Hn.B.start.call(this);this.o=x()+this.b};
Hn.prototype.stop=function(){this.o=0;Hn.B.stop.call(this)};
function In(a){a.stop();mm(a,5E3+2E4*Math.random())}
;function Jn(a,b){this.F=a;this.o=b;this.g=new F;this.f=new Hn(this.qe,this);this.b=null;this.D=!1;this.j=null;this.N="";this.A=this.i=0;this.l=[]}
y(Jn,Gn);g=Jn.prototype;g.subscribe=function(a,b,c){return this.g.subscribe(a,b,c)};
g.unsubscribe=function(a,b,c){return this.g.unsubscribe(a,b,c)};
g.ha=function(a){return this.g.ha(a)};
g.u=function(a,b){return this.g.u.apply(this.g,arguments)};
g.dispose=function(){this.D||(this.D=!0,this.g.clear(),Kn(this),E(this.g))};
g.isDisposed=function(){return this.D};
function Ln(a){return{firstTestResults:[""],secondTestResults:!a.b.vb,sessionId:a.b.g,arrayId:a.b.Ka}}
g.connect=function(a,b,c){if(!this.b||2!=this.b.b){this.N="";this.f.stop();this.j=a||null;this.i=b||0;a=this.F+"/test";b=this.F+"/bind";var d=new mn("1",c?c.firstTestResults:null,c?c.secondTestResults:null),e=this.b;e&&(e.M=null);d.M=this;this.b=d;e?this.b.connect(a,b,this.o,e.g,e.Ka):c?this.b.connect(a,b,this.o,c.sessionId,c.arrayId):this.b.connect(a,b,this.o)}};
function Kn(a,b){a.A=b||0;a.f.stop();a.b&&(3==a.b.b&&zn(a.b),sn(a.b));a.A=0}
g.sendMessage=function(a,b){var c={_sc:a};b&&kb(c,b);this.f.enabled||2==(this.b?this.b.b:0)?this.l.push(c):Mn(this)&&xn(this.b,c)};
g.dc=function(){In(this.f);this.j=null;this.i=0;if(this.l.length){var a=this.l;this.l=[];for(var b=0,c=a.length;b<c;++b)xn(this.b,a[b])}this.u("handlerOpened")};
g.bc=function(a,b){var c=2==b&&401==this.b.da;if(4!=b&&!c){if(6==b||410==this.b.da)c=this.f,c.stop(),mm(c,500);this.f.start()}this.u("handlerError",b)};
g.Ab=function(a,b,c){if(!this.f.enabled)this.u("handlerClosed");else if(c)for(a=0,b=c.length;a<b;++a){var d=c[a].map;d&&this.l.push(d)}};
g.fc=function(){var a={v:2};this.N&&(a.gsessionid=this.N);0!=this.i&&(a.ui=""+this.i);0!=this.A&&(a.ui=""+this.A);this.j&&kb(a,this.j);return a};
g.cc=function(a,b){"S"==b[0]?this.N=b[1]:"gracefulReconnect"==b[0]?(In(this.f),this.f.start(),sn(this.b)):this.u("handlerMessage",new Fl(b[0],b[1]))};
function Mn(a){return!!a.b&&3==a.b.b}
function Nn(a,b){(a.o.loungeIdToken=b)||a.f.stop()}
g.qe=function(){this.f.stop();var a=this.b,b=0;a.G&&b++;a.T&&b++;0!=b?this.f.start():this.connect(this.j,this.i)};function On(a){this.index=-1;this.videoId=this.listId="";this.volume=this.b=-1;this.j=!1;this.audioTrackId=null;this.i=this.f=0;this.g=null;this.reset(a)}
function Pn(a){a.audioTrackId=null;a.g=null;a.b=-1;a.f=0;a.i=x()}
On.prototype.reset=function(a){this.listId="";this.index=-1;this.videoId="";Pn(this);this.volume=-1;this.j=!1;a&&(this.index=a.index,this.listId=a.listId,this.videoId=a.videoId,this.b=a.playerState,this.volume=a.volume,this.j=a.muted,this.audioTrackId=a.audioTrackId,this.g=a.trackData,this.f=a.playerTime,this.i=a.playerTimeAt)};
function Qn(a){switch(a.b){case 1:return(x()-a.i)/1E3+a.f;case -1E3:return 0}return a.f}
function Rn(a){var b={};b.index=a.index;b.listId=a.listId;b.videoId=a.videoId;b.playerState=a.b;b.volume=a.volume;b.muted=a.j;b.audioTrackId=a.audioTrackId;b.trackData=ib(a.g);b.playerTime=a.f;b.playerTimeAt=a.i;return b}
On.prototype.clone=function(){return new On(Rn(this))};function Z(a,b,c){U.call(this);this.i=NaN;this.U=!1;this.H=this.F=this.K=this.L=NaN;this.V=[];this.A=this.D=this.g=this.C=this.b=null;this.Sa=a;this.V.push(M(window,"beforeunload",w(this.jd,this)));this.f=[];this.C=new On;this.ia=b.id;this.b=Sn(this,c);this.b.subscribe("handlerOpened",this.xd,this);this.b.subscribe("handlerClosed",this.ud,this);this.b.subscribe("handlerError",this.vd,this);this.b.subscribe("handlerMessage",this.wd,this);Nn(this.b,b.token);this.subscribe("remoteQueueChange",function(){var a=
this.C.videoId;vk()&&S("yt-remote-session-video-id",a)},this)}
y(Z,U);g=Z.prototype;g.connect=function(a,b){if(b){var c=b.listId,d=b.videoId,e=b.index,f=b.currentTime||0;5>=f&&(f=0);var h={videoId:d,currentTime:f};c&&(h.listId=c);p(e)&&(h.currentIndex=e);c&&(this.C.listId=c);this.C.videoId=d;this.C.index=e||0;this.C.state=3;c=this.C;c.f=f;c.i=x();this.A="UNSUPPORTED";Tn("Connecting with setPlaylist and params: "+L(h));this.b.connect({method:"setPlaylist",params:L(h)},a,zk())}else Tn("Connecting without params"),this.b.connect({},a,zk());Un(this)};
g.dispose=function(){this.isDisposed()||(this.u("beforeDispose"),Vn(this,3));Z.B.dispose.call(this)};
g.w=function(){Wn(this);Xn(this);Yn(this);I(this.F);this.F=NaN;I(this.H);this.H=NaN;this.g=null;He(this.V);this.V.length=0;this.b.dispose();Z.B.w.call(this);this.A=this.D=this.f=this.C=this.b=null};
function Tn(a){Rj("conn",a)}
g.jd=function(){this.j(2)};
function Sn(a,b){return new Jn(dk(a.Sa,"/bc",void 0,!1),b)}
function Vn(a,b){a.u("proxyStateChange",b)}
function Un(a){a.i=H(w(function(){Tn("Connecting timeout");this.j(1)},a),2E4)}
function Wn(a){I(a.i);a.i=NaN}
function Yn(a){I(a.L);a.L=NaN}
function Zn(a){Xn(a);a.K=H(w(function(){$n(this,"getNowPlaying")},a),2E4)}
function Xn(a){I(a.K);a.K=NaN}
g.xd=function(){Tn("Channel opened");this.U&&(this.U=!1,Yn(this),this.L=H(w(function(){Tn("Timing out waiting for a screen.");this.j(1)},this),15E3));
Dk(Ln(this.b),this.ia)};
g.ud=function(){Tn("Channel closed");isNaN(this.i)?Ek(!0):Ek();this.dispose()};
g.vd=function(a){Ek();isNaN(this.l())?(Tn("Channel error: "+a+" without reconnection"),this.dispose()):(this.U=!0,Tn("Channel error: "+a+" with reconnection in "+this.l()+" ms"),Vn(this,2))};
function ao(a,b){b&&(Wn(a),Yn(a));b==(Mn(a.b)&&isNaN(a.i))?b&&(Vn(a,1),$n(a,"getSubtitlesTrack")):b?(a.Z()&&a.C.reset(),Vn(a,1),$n(a,"getNowPlaying"),bo(a)):a.j(1)}
function co(a,b){var c=b.params.videoId;delete b.params.videoId;c==a.C.videoId&&(fb(b.params)?a.C.g=null:a.C.g=b.params,a.u("remotePlayerChange"))}
function eo(a,b){var c=b.params.videoId||b.params.video_id,d=parseInt(b.params.currentIndex,10);a.C.listId=b.params.listId||a.C.listId;var e=a.C,f=e.videoId;e.videoId=c;e.index=d;c!=f&&Pn(e);a.u("remoteQueueChange")}
function fo(a,b){b.params=b.params||{};eo(a,b);go(a,b)}
function go(a,b){var c=parseInt(b.params.currentTime||b.params.current_time,10),d=a.C;d.f=isNaN(c)?0:c;d.i=x();c=parseInt(b.params.state,10);c=isNaN(c)?-1:c;-1==c&&-1E3==a.C.b&&(c=-1E3);a.C.b=c;1==a.C.b?Zn(a):Xn(a);a.u("remotePlayerChange")}
function ho(a,b){var c="true"==b.params.muted;a.C.volume=parseInt(b.params.volume,10);a.C.j=c;a.u("remotePlayerChange")}
g.wd=function(a){a.params?Tn("Received: action="+a.action+", params="+L(a.params)):Tn("Received: action="+a.action+" {}");switch(a.action){case "loungeStatus":a=nd(a.params.devices);this.f=Ja(a,function(a){return new qk(a)});
a=!!Ma(this.f,function(a){return"LOUNGE_SCREEN"==a.type});
ao(this,a);break;case "loungeScreenConnected":ao(this,!0);break;case "loungeScreenDisconnected":Qa(this.f,function(a){return"LOUNGE_SCREEN"==a.type});
ao(this,!1);break;case "remoteConnected":var b=new qk(nd(a.params.device));Ma(this.f,function(a){return a.equals(b)})||Oa(this.f,b);
break;case "remoteDisconnected":b=new qk(nd(a.params.device));Qa(this.f,function(a){return a.equals(b)});
break;case "gracefulDisconnect":break;case "playlistModified":eo(this,a);break;case "nowPlaying":fo(this,a);break;case "onStateChange":go(this,a);break;case "onVolumeChanged":ho(this,a);break;case "onSubtitlesTrackChanged":co(this,a);break;case "nowAutoplaying":this.D=a.params.videoId;break;case "autoplayDismissed":break;case "autoplayUpNext":this.D=a.params.videoId;break;case "onAutoplayModeChanged":this.A=a.params.autoplayMode;break;default:Tn("Unrecognized action: "+a.action)}};
g.ce=function(){if(this.g){var a=this.g;this.g=null;this.C.videoId!=a&&$n(this,"getNowPlaying")}};
Z.prototype.subscribe=Z.prototype.subscribe;Z.prototype.unsubscribeByKey=Z.prototype.ha;Z.prototype.Ga=function(){var a=3;this.isDisposed()||(a=0,isNaN(this.l())?Mn(this.b)&&isNaN(this.i)&&(a=1):a=2);return a};
Z.prototype.getProxyState=Z.prototype.Ga;Z.prototype.j=function(a){Tn("Disconnecting with "+a);Wn(this);this.u("beforeDisconnect",a);1==a&&Ek();Kn(this.b,a);this.dispose()};
Z.prototype.disconnect=Z.prototype.j;Z.prototype.qa=function(){var a=this.C;if(this.g){var b=a=this.C.clone(),c=this.g,d=a.index,e=b.videoId;b.videoId=c;b.index=d;c!=e&&Pn(b)}return Rn(a)};
Z.prototype.getPlayerContextData=Z.prototype.qa;Z.prototype.Ra=function(a){var b=new On(a);b.videoId&&b.videoId!=this.C.videoId&&(this.g=b.videoId,I(this.F),this.F=H(w(this.ce,this),5E3));var c=[];this.C.listId==b.listId&&this.C.videoId==b.videoId&&this.C.index==b.index||c.push("remoteQueueChange");this.C.b==b.b&&this.C.volume==b.volume&&this.C.j==b.j&&Qn(this.C)==Qn(b)&&L(this.C.g)==L(b.g)||c.push("remotePlayerChange");this.C.reset(a);z(c,function(a){this.u(a)},this)};
Z.prototype.setPlayerContextData=Z.prototype.Ra;Z.prototype.Z=function(){var a=this.b.o.id,b=Ma(this.f,function(b){return"REMOTE_CONTROL"==b.type&&b.id!=a});
return b?b.id:""};
Z.prototype.getOtherConnectedRemoteId=Z.prototype.Z;Z.prototype.l=function(){var a=this.b;return a.f.enabled?a.f.o-x():NaN};
Z.prototype.getReconnectTimeout=Z.prototype.l;Z.prototype.ka=function(){return this.A||"UNSUPPORTED"};
Z.prototype.getAutoplayMode=Z.prototype.ka;Z.prototype.la=function(){return this.D||""};
Z.prototype.getAutoplayVideoId=Z.prototype.la;Z.prototype.Ta=function(){if(!isNaN(this.l())){var a=this.b.f;a.enabled&&(a.stop(),a.start(),a.l())}};
Z.prototype.reconnect=Z.prototype.Ta;function bo(a){I(a.H);a.H=H(w(a.j,a,1),864E5)}
function $n(a,b,c){c?Tn("Sending: action="+b+", params="+L(c)):Tn("Sending: action="+b);a.b.sendMessage(b,c)}
Z.prototype.Ha=function(a,b){$n(this,a,b);bo(this)};
Z.prototype.sendMessage=Z.prototype.Ha;function io(a){kk.call(this,"ScreenServiceProxy");this.R=a;this.b=[];this.b.push(this.R.$_s("screenChange",w(this.ue,this)));this.b.push(this.R.$_s("onlineScreenChange",w(this.Dd,this)))}
y(io,kk);g=io.prototype;g.W=function(a){return this.R.$_gs(a)};
g.contains=function(a){return!!this.R.$_c(a)};
g.get=function(a){return this.R.$_g(a)};
g.start=function(){this.R.$_st()};
g.xb=function(a,b,c){this.R.$_a(a,b,c)};
g.remove=function(a,b,c){this.R.$_r(a,b,c)};
g.ub=function(a,b,c,d){this.R.$_un(a,b,c,d)};
g.w=function(){for(var a=0,b=this.b.length;a<b;++a)this.R.$_ubk(this.b[a]);this.b.length=0;this.R=null;io.B.w.call(this)};
g.ue=function(){this.u("screenChange")};
g.Dd=function(){this.u("onlineScreenChange")};
V.prototype.$_st=V.prototype.start;V.prototype.$_gspc=V.prototype.ve;V.prototype.$_gsppc=V.prototype.Hc;V.prototype.$_c=V.prototype.contains;V.prototype.$_g=V.prototype.get;V.prototype.$_a=V.prototype.xb;V.prototype.$_un=V.prototype.ub;V.prototype.$_r=V.prototype.remove;V.prototype.$_gs=V.prototype.W;V.prototype.$_gos=V.prototype.Gc;V.prototype.$_s=V.prototype.subscribe;V.prototype.$_ubk=V.prototype.ha;function jo(){var a={device:"Desktop",app:"youtube-desktop"};kj&&jj();sk();ko||(ko=new ck,Fk()&&(ko.b="/api/loungedev"));lo||(lo=r("yt.mdx.remote.deferredProxies_")||[],q("yt.mdx.remote.deferredProxies_",lo,void 0));mo();var b=no();if(!b){var c=new V(ko);q("yt.mdx.remote.screenService_",c,void 0);b=no();kl(c,function(a){a?oo()&&Dl(oo(),"YouTube TV"):c.subscribe("onlineScreenChange",function(){J("yt-remote-receiver-availability-change")})},!(!a||!a.loadCastApiSetupScript))}if(a&&!r("yt.mdx.remote.initialized_")){q("yt.mdx.remote.initialized_",
!0,void 0);
po("Initializing: "+L(a));qo.push(jc("yt-remote-cast2-availability-change",function(){J("yt-remote-receiver-availability-change")}));
qo.push(jc("yt-remote-cast2-receiver-selected",function(){ro(null);J("yt-remote-auto-connect","cast-selector-receiver")}));
qo.push(jc("yt-remote-cast2-session-change",so));qo.push(jc("yt-remote-connection-change",function(a){a?Dl(oo(),"YouTube TV"):to()||(Dl(null,null),zl())}));
var d=uo();a.isAuto&&(d.id+="#dial");d.name=a.device;d.app=a.app;po(" -- with channel params: "+L(d));vo(d);b.start();oo()||wo()}}
function xo(){lc(qo);qo.length=0;E(yo);yo=null;lo&&(z(lo,function(a){a(null)}),lo.length=0,lo=null,q("yt.mdx.remote.deferredProxies_",null,void 0));
ko=null}
function zo(){if(xl()){var a=[];if(T("yt-remote-cast-available")||r("yt.mdx.remote.cloudview.castButtonShown_")||Ao())a.push({key:"cast-selector-receiver",name:Bo()}),q("yt.mdx.remote.cloudview.castButtonShown_",!0,void 0);return a}return r("yt.mdx.remote.cloudview.initializing_")?[]:Co()}
function Co(){var a;a=no().R.$_gos();var b=Do();b&&Ao()&&(ik(a,b)||a.push(b));return hk(a)}
function Eo(){if(xl()){var a=yl();return a?{key:"cast-selector-receiver",name:a}:null}return Fo()}
function Fo(){var a=Co(),b=Do();b||(b=to());return Ma(a,function(a){return b&&Vj(b,a.key)?!0:!1})}
function Bo(){if(xl())return yl();var a=Do();return a?a.name:null}
function Do(){var a=oo();if(!a)return null;var b=no().W();return jk(b,a)}
function so(a){po("remote.onCastSessionChange_: "+Zj(a));if(a){var b=Do();b&&b.id==a.id?Dl(b.id,"YouTube TV"):(b&&Go(),Ho(a,1))}else Go()}
function Io(a,b){po("Connecting to: "+L(a));if("cast-selector-receiver"==a.key)ro(b||null),Cl(b||null);else{Go();ro(b||null);var c=no().W();(c=jk(c,a.key))?Ho(c,1):H(function(){Jo(null)},0)}}
function Go(){Bl()?tl().stopSession():ql("stopSession called before API ready.");var a=Ao();a?a.disconnect(1):(mc("yt-remote-before-disconnect",1),mc("yt-remote-connection-change",!1));Jo(null)}
function po(a){Rj("remote",a)}
function no(){if(!yo){var a=r("yt.mdx.remote.screenService_");yo=a?new io(a):null}return yo}
function oo(){return r("yt.mdx.remote.currentScreenId_")}
function Ko(a){q("yt.mdx.remote.currentScreenId_",a,void 0)}
function ro(a){q("yt.mdx.remote.connectData_",a,void 0)}
function Ao(){return r("yt.mdx.remote.connection_")}
function Jo(a){var b=Ao();ro(null);a?Ao():Ko("");q("yt.mdx.remote.connection_",a,void 0);lo&&(z(lo,function(b){b(a)}),lo.length=0);
b&&!a?mc("yt-remote-connection-change",!1):!b&&a&&J("yt-remote-connection-change",!0)}
function to(){var a=vk();if(!a)return null;var b=no().W();return jk(b,a)}
function Ho(a,b){oo();Ko(a.id);var c=new Z(ko,a,uo());c.connect(b,r("yt.mdx.remote.connectData_"));c.subscribe("beforeDisconnect",function(a){mc("yt-remote-before-disconnect",a)});
c.subscribe("beforeDispose",function(){Ao()&&(Ao(),Jo(null))});
Jo(c)}
function wo(){var a=to();a?(po("Resume connection to: "+Zj(a)),Ho(a,0)):(Ek(),zl(),po("Skipping connecting because no session screen found."))}
var ko=null,lo=null,yo=null;function mo(){var a=uo();if(fb(a)){var a=uk(),b=T("yt-remote-session-name")||"",c=T("yt-remote-session-app")||"",a={device:"REMOTE_CONTROL",id:a,name:b,app:c,"mdx-version":3};q("yt.mdx.remote.channelParams_",a,void 0)}}
function uo(){return r("yt.mdx.remote.channelParams_")||{}}
function vo(a){a?(S("yt-remote-session-app",a.app),S("yt-remote-session-name",a.name)):(mj("yt-remote-session-app"),mj("yt-remote-session-name"));q("yt.mdx.remote.channelParams_",a,void 0)}
var qo=[];var Lo=null,Mo=[];function No(){Oo();if(Eo()){var a=Lo;"html5"!=a.getPlayerType()&&a.loadNewVideoConfig(a.getCurrentVideoConfig(),"html5")}}
function Po(a){"cast-selector-receiver"==a?Al():Qo(a)}
function Qo(a){var b=zo();if(a=gk(b,a)){var c=Lo;Io(a,{listId:c.getVideoData().list,videoId:c.getVideoData().video_id,currentTime:c.getCurrentTime()});"html5"!=c.getPlayerType()?c.loadNewVideoConfig(c.getCurrentVideoConfig(),"html5"):c.updateRemoteReceivers&&c.updateRemoteReceivers(b,a)}}
function Oo(){var a=Lo;a&&a.updateRemoteReceivers&&a.updateRemoteReceivers(zo(),Eo())}
;var Ro=null,So=[];function To(a){return{externalChannelId:a.externalChannelId,rd:!!a.isChannelPaid,source:a.source,subscriptionId:a.subscriptionId}}
function Uo(a){Vo(To(a))}
function Vo(a){ti()?(Q(gi,new ai(a.externalChannelId,a.rd?{itemType:"U",itemId:a.externalChannelId}:null)),(a="/gen_204?"+Dd({event:"subscribe",source:a.source}))&&Qg(a)):Wo(a)}
function Wo(a){si(function(b){b.subscription_ajax&&Vo(a)},null)}
function Xo(a){a=To(a);Q(li,new ci(a.externalChannelId,a.subscriptionId,null));(a="/gen_204?"+Dd({event:"unsubscribe",source:a.source}))&&Qg(a)}
function Yo(a){Ro&&Ro.channelSubscribed(a.b,a.subscriptionId)}
function Zo(a){Ro&&Ro.channelUnsubscribed(a.b)}
;function $o(a){D.call(this);this.f=a;this.f.subscribe("command",this.yc,this);this.g={};this.i=!1}
y($o,D);g=$o.prototype;g.start=function(){this.i||this.isDisposed()||(this.i=!0,ap(this.f,"RECEIVING"))};
g.yc=function(a,b){if(this.i&&!this.isDisposed()){var c=b||{};switch(a){case "addEventListener":if(v(c.event)&&(c=c.event,!(c in this.g))){var d=w(this.ee,this,c);this.g[c]=d;this.addEventListener(c,d)}break;case "removeEventListener":v(c.event)&&bp(this,c.event);break;default:this.b.isReady()&&this.b[a]&&(c=cp(a,b||{}),c=this.b[a].apply(this.b,c),(c=dp(a,c))&&this.i&&!this.isDisposed()&&ap(this.f,a,c))}}};
g.ee=function(a,b){this.i&&!this.isDisposed()&&ap(this.f,a,this.Db(a,b))};
g.Db=function(a,b){if(null!=b)return{value:b}};
function bp(a,b){b in a.g&&(a.removeEventListener(b,a.g[b]),delete a.g[b])}
g.w=function(){this.f.unsubscribe("command",this.yc,this);this.f=null;for(var a in this.g)bp(this,a);$o.B.w.call(this)};function ep(a,b){$o.call(this,b);this.b=a;this.start()}
y(ep,$o);ep.prototype.addEventListener=function(a,b){this.b.addEventListener(a,b)};
ep.prototype.removeEventListener=function(a,b){this.b.removeEventListener(a,b)};
function cp(a,b){switch(a){case "loadVideoById":return b=rj(b),tj(b),[b];case "cueVideoById":return b=rj(b),tj(b),[b];case "loadVideoByPlayerVars":return tj(b),[b];case "cueVideoByPlayerVars":return tj(b),[b];case "loadPlaylist":return b=sj(b),tj(b),[b];case "cuePlaylist":return b=sj(b),tj(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];
case "setLoop":return[b.loopPlaylists];case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey]}return[]}
function dp(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
ep.prototype.Db=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return ep.B.Db.call(this,a,b)};
ep.prototype.w=function(){ep.B.w.call(this);delete this.b};function fp(){var a=this.f=new Vi,b=w(this.ae,this);a.f=b;a.g=null;this.f.channel="widget";if(a=G("WIDGET_ID"))this.f.i=a;this.i=[];this.o=!1;this.j={}}
g=fp.prototype;g.ae=function(a,b){if("addEventListener"==a&&b){var c=b[0];this.j[c]||"onReady"==c||(this.addEventListener(c,gp(this,c)),this.j[c]=!0)}else this.Kc(a,b)};
g.Kc=function(){};
function gp(a,b){return w(function(a){this.sendMessage(b,a)},a)}
g.addEventListener=function(){};
g.ed=function(){this.o=!0;this.sendMessage("initialDelivery",this.Eb());this.sendMessage("onReady");z(this.i,this.Lc,this);this.i=[]};
g.Eb=function(){return null};
function hp(a,b){a.sendMessage("infoDelivery",b)}
g.Lc=function(a){this.o?this.f.sendMessage(a):this.i.push(a)};
g.sendMessage=function(a,b){this.Lc({event:a,info:void 0==b?null:b})};
g.dispose=function(){this.f=null};function ip(a){fp.call(this);this.b=a;this.g=[];this.addEventListener("onReady",w(this.Id,this));this.addEventListener("onVideoProgress",w(this.ie,this));this.addEventListener("onVolumeChange",w(this.je,this));this.addEventListener("onApiChange",w(this.de,this));this.addEventListener("onPlaybackQualityChange",w(this.fe,this));this.addEventListener("onPlaybackRateChange",w(this.ge,this));this.addEventListener("onStateChange",w(this.he,this))}
y(ip,fp);g=ip.prototype;g.Kc=function(a,b){if(this.b[a]){b=b||[];if(0<b.length&&pj(a)){var c;c=b;if(ha(c[0])&&!u(c[0]))c=c[0];else{var d={};switch(a){case "loadVideoById":case "cueVideoById":d=rj.apply(window,c);break;case "loadVideoByUrl":case "cueVideoByUrl":d=qj.apply(window,c);break;case "loadPlaylist":case "cuePlaylist":d=sj.apply(window,c)}c=d}tj(c);b.length=1;b[0]=c}this.b[a].apply(this.b,b);pj(a)&&hp(this,this.Eb())}};
g.Id=function(){var a=w(this.ed,this);this.f.b=a};
g.addEventListener=function(a,b){this.g.push({eventType:a,listener:b});this.b.addEventListener(a,b)};
g.Eb=function(){if(!this.b)return null;var a=this.b.getApiInterface();Pa(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c],f=e;if(0==f.search("get")||0==f.search("is")){var f=e,h=0;0==f.search("get")?h=3:0==f.search("is")&&(h=2);f=f.charAt(h).toLowerCase()+f.substr(h+1);try{var k=this.b[e]();b[f]=k}catch(m){}}}b.videoData=this.b.getVideoData();b.currentTimeLastUpdated_=x()/1E3;return b};
g.he=function(a){a={playerState:a,currentTime:this.b.getCurrentTime(),duration:this.b.getDuration(),videoData:this.b.getVideoData(),videoStartBytes:0,videoBytesTotal:this.b.getVideoBytesTotal(),videoLoadedFraction:this.b.getVideoLoadedFraction(),playbackQuality:this.b.getPlaybackQuality(),availableQualityLevels:this.b.getAvailableQualityLevels(),videoUrl:this.b.getVideoUrl(),playlist:this.b.getPlaylist(),playlistIndex:this.b.getPlaylistIndex(),currentTimeLastUpdated_:x()/1E3,playbackRate:this.b.getPlaybackRate()};
this.b.getProgressState&&(a.progressState=this.b.getProgressState());this.b.getStoryboardFormat&&(a.storyboardFormat=this.b.getStoryboardFormat());hp(this,a)};
g.fe=function(a){hp(this,{playbackQuality:a})};
g.ge=function(a){hp(this,{playbackRate:a})};
g.de=function(){for(var a=this.b.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.b.getOptions(e);b[e]={options:f};for(var h=0,k=f.length;h<k;h++){var m=f[h],n=this.b.getOption(e,m);b[e][m]=n}}this.sendMessage("apiInfoDelivery",b)};
g.je=function(){hp(this,{muted:this.b.isMuted(),volume:this.b.getVolume()})};
g.ie=function(a){a={currentTime:a,videoBytesLoaded:this.b.getVideoBytesLoaded(),videoLoadedFraction:this.b.getVideoLoadedFraction(),currentTimeLastUpdated_:x()/1E3,playbackRate:this.b.getPlaybackRate()};this.b.getProgressState&&(a.progressState=this.b.getProgressState());hp(this,a)};
g.dispose=function(){ip.B.dispose.call(this);for(var a=0;a<this.g.length;a++){var b=this.g[a];this.b.removeEventListener(b.eventType,b.listener)}this.g=[]};function jp(a,b,c){U.call(this);this.b=a;this.f=b;this.g=c}
y(jp,U);function ap(a,b,c){if(!a.isDisposed()){var d=a.b,e=a.f;a=a.g;d.isDisposed()||e!=d.b||(b={id:a,command:b},c&&(b.data=c),d.b.postMessage(L(b),d.g))}}
jp.prototype.w=function(){this.f=this.b=null;jp.B.w.call(this)};function kp(a,b,c){D.call(this);this.b=a;this.g=c;this.i=M(window,"message",w(this.j,this));this.f=new jp(this,a,b);Ub(this,na(E,this.f))}
y(kp,D);kp.prototype.j=function(a){var b;if(b=!this.isDisposed())if(b=a.origin==this.g)a:{b=this.b;do{var c;b:{c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(c=a.data,v(c))){try{c=nd(c)}catch(d){return}c.command&&(a=this.f,b=c.command,c=c.data,a.isDisposed()||a.u("command",b,c))}};
kp.prototype.w=function(){He(this.i);this.b=null;kp.B.w.call(this)};var lp=!1;function mp(a){if(a=a.match(/[\d]+/g))a.length=3}
(function(){if(navigator.plugins&&navigator.plugins.length){var a=navigator.plugins["Shockwave Flash"];if(a&&(lp=!0,a.description)){mp(a.description);return}if(navigator.plugins["Shockwave Flash 2.0"]){lp=!0;return}}if(navigator.mimeTypes&&navigator.mimeTypes.length&&(a=navigator.mimeTypes["application/x-shockwave-flash"],lp=!(!a||!a.enabledPlugin))){mp(a.enabledPlugin.description);return}try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");lp=!0;mp(b.GetVariable("$version"));return}catch(c){}try{b=
new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");lp=!0;return}catch(c){}try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),lp=!0,mp(b.GetVariable("$version"))}catch(c){}})();function np(a){return(a=a.exec(lb))?a[1]:""}
(function(){if(kf)return np(/Firefox\/([0-9.]+)/);if(K||$c||Zc)return id;if(of)return np(/Chrome\/([0-9.]+)/);if(pf&&!(Vc()||B("iPad")||B("iPod")))return np(/Version\/([0-9.]+)/);if(lf||mf){var a=/Version\/(\S+).*Mobile\/(\S+)/.exec(lb);if(a)return a[1]+"."+a[2]}else if(nf)return(a=np(/Android\s+([0-9.]+)/))?a:np(/Version\/([0-9.]+)/);return""})();function op(){var a=pp;return new Jf(function(b,c){a.ba=function(a){Jd(a)?b(a):c(a)};
a.onError=c;a.Da=c;Od("//googleads.g.doubleclick.net/pagead/id",a)})}
;function qp(a,b){this.f=a;this.b=b}
qp.prototype.then=function(a,b,c){try{if(p(this.f))return a?Of(a.call(c,this.f)):Of(this.f);if(p(this.b)){if(!b)return Pf(this.b);var d=b.call(c,this.b);return!p(d)&&this.b instanceof Rf?Pf(this.b):Of(d)}throw Error("Invalid Result_ state");}catch(e){return Pf(e)}};
If(qp);var pp={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},rp=null;function sp(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))return tp(""),rp=new qp(""),"";a=JSON.parse(a.substr(4)).id;tp(a);rp=new qp(a);up(18E5,2);return a}
function vp(a){var b=Error("Unable to load /pagead/id");tp("");rp=new qp(void 0,b);0<a&&up(12E4,a-1);throw b;}
function up(a,b){H(function(){var a=w(vp,l,b),a=op().then(sp,a);Qf(a,null,t,void 0)},a)}
function tp(a){q("yt.www.ads.biscotti.lastId_",a,void 0)}
;function wp(){}
;function xp(){var a;if(a=Qe.get("PREF",void 0)){a=unescape(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(yp[d]=c.toString())}}}
ba(xp);var yp=r("yt.prefs.UserPrefs.prefs_")||{};q("yt.prefs.UserPrefs.prefs_",yp,void 0);function zp(a){if(/^f([1-9][0-9]*)$/.test(a))throw"ExpectedRegexMatch: "+a;}
function Ap(a){if(!/^\w+$/.test(a))throw"ExpectedRegexMismatch: "+a;}
function Bp(a){a=void 0!==yp[a]?yp[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
xp.prototype.get=function(a,b){Ap(a);zp(a);var c=void 0!==yp[a]?yp[a].toString():null;return null!=c?c:b?b:""};
xp.prototype.set=function(a,b){Ap(a);zp(a);if(null==b)throw"ExpectedNotNull";yp[a]=b.toString()};
xp.prototype.remove=function(a){Ap(a);zp(a);delete yp[a]};
xp.prototype.clear=function(){yp={}};function Cp(a){for(var b=0;b<a.length;b++){var c=a[b];"send_follow_on_ping_action"==c.name&&c.data&&c.data.follow_on_url&&(c=c.data.follow_on_url)&&Qg(c)}}
;function Dp(a){O.call(this,1,arguments);this.zb=a}
y(Dp,O);function Ep(a,b){O.call(this,2,arguments);this.f=a;this.b=b}
y(Ep,O);function Fp(a,b,c,d){O.call(this,1,arguments);this.b=b;this.f=c||null;this.itemId=d||null}
y(Fp,O);function Gp(a,b){O.call(this,1,arguments);this.f=a;this.b=b||null}
y(Gp,O);function Hp(a){O.call(this,1,arguments)}
y(Hp,O);var Ip=new P("ypc-core-load",Dp),Jp=new P("ypc-guide-sync-success",Ep),Kp=new P("ypc-purchase-success",Fp),Lp=new P("ypc-subscription-cancel",Hp),Mp=new P("ypc-subscription-cancel-success",Gp),Np=new P("ypc-init-subscription",Hp);var Op=!1,Pp=[],Qp=[];function Rp(a){a.b?Op?Q(ki,a):Q(Ip,new Dp(function(){Q(Np,new Hp(a.b))})):Sp(a.f,a.i,a.g,a.source)}
function Tp(a){a.b?Op?Q(pi,a):Q(Ip,new Dp(function(){Q(Lp,new Hp(a.b))})):Up(a.f,a.subscriptionId,a.i,a.g,a.source)}
function Vp(a){Wp(Sa(a.b))}
function Xp(a){Yp(Sa(a.b))}
function Zp(a){$p(a.b,a.isEnabled,null)}
function aq(a,b,c,d){$p(a,b,c,d)}
function bq(a){var b=a.itemId,c=a.b.subscriptionId;b&&c&&Q(ji,new bi(b,c,a.b.channelInfo))}
function cq(a){var b=a.b;Xa(a.f,function(a,d){Q(ji,new bi(d,a,b[d]))})}
function dq(a){Q(oi,new Zh(a.f.itemId));a.b&&a.b.length&&(eq(a.b,oi),eq(a.b,qi))}
function Sp(a,b,c,d){var e=new Zh(a);Q(hi,e);var f={};f.c=a;c&&(f.eurl=c);d&&(f.source=d);c={};(d=G("PLAYBACK_ID"))&&(c.plid=d);(d=G("EVENT_ID"))&&(c.ei=d);b&&fq(b,c);Od("/subscription_ajax?action_create_subscription_to_channel=1",{method:"POST",Rb:f,S:c,ba:function(b,c){var d=c.response;Q(ji,new bi(a,d.id,d.channel_info));d.show_feed_privacy_dialog&&J("SHOW-FEED-PRIVACY-SUBSCRIBE-DIALOG",a);d.actions&&Cp(d.actions)},
Nb:function(){Q(ii,e)}})}
function Up(a,b,c,d,e){var f=new Zh(a);Q(mi,f);var h={};d&&(h.eurl=d);e&&(h.source=e);d={};d.c=a;d.s=b;(a=G("PLAYBACK_ID"))&&(d.plid=a);(a=G("EVENT_ID"))&&(d.ei=a);c&&fq(c,d);Od("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",Rb:h,S:d,ba:function(a,b){var c=b.response;Q(oi,f);c.actions&&Cp(c.actions)},
Nb:function(){Q(ni,f)}})}
function $p(a,b,c,d){if(null!==b||null!==c){var e={};a&&(e.channel_id=a);null===b||(e.receive_all_updates=b);null===c||(e.receive_no_updates=c);Od("/subscription_ajax?action_update_subscription_preferences=1",{method:"POST",S:e,onError:function(){d&&d()}})}}
function Wp(a){if(a.length){var b=Ua(a,0,40);Q("subscription-batch-subscribe-loading");eq(b,hi);var c={};c.a=b.join(",");var d=function(){Q("subscription-batch-subscribe-loaded");eq(b,ii)};
Od("/subscription_ajax?action_create_subscription_to_all=1",{method:"POST",S:c,ba:function(c,f){d();var h=f.response,k=h.id;if(u(k)&&k.length==b.length){var m=h.channel_info_map;z(k,function(a,c){var d=b[c];Q(ji,new bi(d,a,m[d]))});
a.length?Wp(a):Q("subscription-batch-subscribe-finished")}},
onError:function(){d();Q("subscription-batch-subscribe-failure")}})}}
function Yp(a){if(a.length){var b=Ua(a,0,40);Q("subscription-batch-unsubscribe-loading");eq(b,mi);var c={};c.c=b.join(",");var d=function(){Q("subscription-batch-unsubscribe-loaded");eq(b,ni)};
Od("/subscription_ajax?action_remove_subscriptions=1",{method:"POST",S:c,ba:function(){d();eq(b,oi);a.length&&Yp(a)},
onError:function(){d()}})}}
function eq(a,b){z(a,function(a){Q(b,new Zh(a))})}
function fq(a,b){var c=Gd(a),d;for(d in c)b[d]=c[d]}
;var gq,hq=null,iq=null,jq=null,kq=!1;
function lq(){var a=G("PLAYER_CONFIG",void 0);if("1"!=a.privembed)try{var b;try{var c=r("yt.www.ads.biscotti.getId_"),d;if(c)d=c();else{if(!rp){var e=w(vp,l,2);rp=op().then(sp,e)}d=rp}b=d}catch(f){b=Pf(f)}Qf(b,null,wp,void 0)}catch(f){bc(f)}if(G("REQUEST_POST_MESSAGE_ORIGIN")){if(!gq){gq=new Vi;gq.b=lq;return}gq.origin&&"*"!=gq.origin&&(a.args.post_message_origin=gq.origin)}d=document.referrer;b=G("POST_MESSAGE_ORIGIN");c=!1;Hf("legacy_cast2")&&v(d)&&v(b)&&-1<d.indexOf(b)&&Ng(b)&&Ng(d)&&(c=!0);window!=
window.top&&d&&d!=document.URL&&(a.args.loaderUrl=d);G("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");a.args.autoplay&&tj(a.args);hq=Mh("player",a);d=G("POST_MESSAGE_ID","player");G("ENABLE_JS_API")?jq=new ip(hq):G("ENABLE_POST_API")&&v(d)&&v(b)&&(iq=new kp(window.parent,d,b),jq=new ep(hq,iq.f));Hf("legacy_cast2")&&((kq=c&&!G("ENABLE_CAST_API"))?a.args.disableCast="1":(a=hq,jo(),Lo=a,Lo.addEventListener("onReady",No),Lo.addEventListener("onRemoteReceiverSelected",Po),Mo.push(jc("yt-remote-receiver-availability-change",
Oo)),Mo.push(jc("yt-remote-auto-connect",Qo))));G("BG_P")&&(G("BG_I")||G("BG_IU"))&&yc();Yd();Ro=hq;Ro.addEventListener("SUBSCRIBE",Uo);Ro.addEventListener("UNSUBSCRIBE",Xo);So.push(Yg(ji,Yo),Yg(oi,Zo))}
;q("yt.setConfig",Zb,void 0);q("yt.setMsg",function(a){$b(Yb,arguments)},void 0);
q("yt.logging.errors.log",function(a,b,c,d,e){c={name:c||G("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),version:d||G("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0)};e=window&&window.yterr||e||!1;if(a&&e&&!(5<=Ud)){e=a.stacktrace;d=a.columnNumber;var f=r("window.location.href");if(v(a))a={message:a,name:"Unknown error",lineNumber:"Not available",fileName:f,stack:"Not available"};else{var h,k,m=!1;try{h=a.lineNumber||a.Re||"Not available"}catch(Pc){h="Not available",m=!0}try{k=a.fileName||a.filename||a.sourceURL||
l.$googDebugFname||f}catch(Pc){k="Not available",m=!0}a=!m&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:{message:a.message||"Not available",name:a.name||"UnknownError",lineNumber:h,fileName:k,stack:a.stack||"Not available"}}e=e||a.stack;h=a.lineNumber.toString();isNaN(h)||isNaN(d)||(h=h+":"+d);if(!(Td[a.message]||0<=e.indexOf("/YouTubeCenter.js")||0<=e.indexOf("/mytube.js"))){b={Rb:{a:"logerror",t:"jserror",type:a.name,msg:a.message.substr(0,1E3),line:h,level:b||"ERROR"},S:{url:G("PAGE_NAME",
window.location.href),file:a.fileName},method:"POST"};e&&(b.S.stack=e);for(var n in c)b.S["client."+n]=c[n];if(n=G("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(var fa in n)b.S[fa]=n[fa];Od("/error_204",b);Td[a.message]=!0;Ud++}}},void 0);
q("writeEmbed",lq,void 0);q("yt.www.watch.ads.restrictioncookie.spr",function(a){(a+="mac_204?action_fcts=1")&&Qg(a);return!0},void 0);
var mq=ac(function(){ih("ol");Op=!0;Qp.push(Yg(gi,Rp),Yg(li,Tp));Op||(Qp.push(Yg(ki,Rp),Yg(pi,Tp),Yg(di,Vp),Yg(ei,Xp),Yg(fi,Zp)),Pp.push(jc("subscription-prefs",aq)),Qp.push(Yg(Kp,bq),Yg(Mp,dq),Yg(Jp,cq)));xp.getInstance();var a=1<window.devicePixelRatio;if(!!((Bp("f"+(Math.floor(119/31)+1))||0)&67108864)!=a){var b="f"+(Math.floor(119/31)+1),c=Bp(b)||0,c=a?c|67108864:c&-67108865;0==c?delete yp[b]:(a=c.toString(16),yp[b]=a.toString());var b=[],d;for(d in yp)b.push(d+"="+escape(yp[d]));Re("PREF",b.join("&"),
63072E3)}}),nq=ac(function(){var a=hq;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();G("PL_ATT")&&(xc=null);for(var a=0,b=Wd.length;a<b;a++){var c=Wd[a];if(!isNaN(c)){var d=r("yt.scheduler.instance.cancelJob");d?d(c):I(c)}}Wd.length=0;a=tc("//static.doubleclick.net/instream/ad_status.js");if(b=document.getElementById(a))oc(a),b.parentNode.removeChild(b);Xd=!1;Zb("DCLKSTAT",0);lc(Pp);Pp.length=0;Zg(Qp);Qp.length=0;Op=!1;Ro&&(Ro.removeEventListener("SUBSCRIBE",Vo),Ro.removeEventListener("UNSUBSCRIBE",Xo));Ro=null;Zg(So);So.length=0;
Hf("legacy_cast2")&&!kq&&(lc(Mo),Mo.length=0,Lo&&(Lo.removeEventListener("onRemoteReceiverSelected",Po),Lo.removeEventListener("onReady",No),Lo=null),xo());Vb(jq,iq);hq&&hq.destroy()});
window.addEventListener?(window.addEventListener("load",mq),window.addEventListener("unload",nq)):window.attachEvent&&(window.attachEvent("onload",mq),window.attachEvent("onunload",nq));var oq=Pi.getInstance(),pq=R(oq);pq in Ui||(oq.register(),oq.pb.push(jc("yt-uix-init-"+pq,oq.init,oq)),oq.pb.push(jc("yt-uix-dispose-"+pq,oq.dispose,oq)),Ui[pq]=oq);})();
