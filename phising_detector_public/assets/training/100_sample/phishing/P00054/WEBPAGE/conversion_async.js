(function(){var f=this;var ea=/^true$/.test("false")?!0:!1;var k=function(a){k[" "](a);return a};k[" "]=function(){};var r=function(a,b){for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&b.call(void 0,a[d],d,a)};var t=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},u=function(a,b){return a<b?-1:a>b?1:0};var v;a:{var w=f.navigator;if(w){var C=w.userAgent;if(C){v=C;break a}}v=""};var fa=-1!=v.indexOf("Opera")||-1!=v.indexOf("OPR"),D=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),ga=-1!=v.indexOf("Edge"),E=-1!=v.indexOf("Gecko")&&!(-1!=v.toLowerCase().indexOf("webkit")&&-1==v.indexOf("Edge"))&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"))&&-1==v.indexOf("Edge"),ha=-1!=v.toLowerCase().indexOf("webkit")&&-1==v.indexOf("Edge"),ia=function(){var a=v;if(E)return/rv\:([^\);]+)(\)|;)/.exec(a);if(ga)return/Edge\/([\d\.]+)/.exec(a);if(D)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
if(ha)return/WebKit\/(\S+)/.exec(a)},F=function(){var a=f.document;return a?a.documentMode:void 0},G=function(){if(fa&&f.opera){var a;var b=f.opera.version;try{a=b()}catch(d){a=b}return a}a="";(b=ia())&&(a=b?b[1]:"");return D&&(b=F(),b>parseFloat(a))?String(b):a}(),H={},J=function(a){if(!H[a]){for(var b=0,d=t(String(G)).split("."),c=t(String(a)).split("."),e=Math.max(d.length,c.length),g=0;0==b&&g<e;g++){var h=d[g]||"",l=c[g]||"",m=RegExp("(\\d*)(\\D*)","g"),q=RegExp("(\\d*)(\\D*)","g");do{var p=
m.exec(h)||["","",""],n=q.exec(l)||["","",""];if(0==p[0].length&&0==n[0].length)break;b=u(0==p[1].length?0:parseInt(p[1],10),0==n[1].length?0:parseInt(n[1],10))||u(0==p[2].length,0==n[2].length)||u(p[2],n[2])}while(0==b)}H[a]=0<=b}},K=f.document,ja=K&&D?F()||("CSS1Compat"==K.compatMode?parseInt(G,10):5):void 0;var L;if(!(L=!E&&!D)){var M;if(M=D)M=9<=Number(ja);L=M}L||E&&J("1.9.1");D&&J("9");var ka=function(a){this.b={};this.a={};this.c=!1;for(var b=0,d=arguments.length;b<d;++b)this.a[arguments[b]]=""},O=function(a){var b=N;return b.a.hasOwnProperty(a)?b.a[a]:""},la=function(){var a=N,b=[];r(a.b,function(a,c){b.push(c)});r(a.a,function(a){""!=a&&b.push(a)});return b};var N,P="google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_remarketing_only google_remarketing_for_search google_conversion_items google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_is_call google_conversion_page_url google_conversion_referrer_url".split(" ");
function Q(a){return null!=a?"3455583315"==(N?O(3):"")?encodeURIComponent(a.toString()):escape(a.toString()):""}function R(a){return null!=a?a.toString().substring(0,512):""}function S(a,b){var d=Q(b);if(""!=d){var c=Q(a);if(""!=c)return"&".concat(c,"=",d)}return""}function T(a){var b=typeof a;return null==a||"object"==b||"function"==b?null:String(a).replace(/,/g,"\\,").replace(/;/g,"\\;").replace(/=/g,"\\=")}
function ma(a){var b;if((a=a.google_custom_params)&&"object"==typeof a&&"function"!=typeof a.join){var d=[];for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];if(c&&"function"==typeof c.join){for(var e=[],g=0;g<c.length;++g){var h=T(c[g]);null!=h&&e.push(h)}c=0==e.length?null:e.join(",")}else c=T(c);(e=T(b))&&null!=c&&d.push(e+"="+c)}b=d.join(";")}else b="";return""==b?"":"&".concat("data=",encodeURIComponent(b))}
function U(a){return"number"!=typeof a&&"string"!=typeof a?"":Q(a.toString())}function na(a){if(!a)return"";a=a.google_conversion_items;if(!a)return"";for(var b=[],d=0,c=a.length;d<c;d++){var e=a[d],g=[];e&&(g.push(U(e.value)),g.push(U(e.quantity)),g.push(U(e.item_id)),g.push(U(e.adwords_grouping)),g.push(U(e.sku)),b.push("("+g.join("*")+")"))}return 0<b.length?"&item="+b.join(""):""}
function oa(a,b,d){var c=[];if(a){var e=a.screen;e&&(c.push(S("u_h",e.height)),c.push(S("u_w",e.width)),c.push(S("u_ah",e.availHeight)),c.push(S("u_aw",e.availWidth)),c.push(S("u_cd",e.colorDepth)));a.history&&c.push(S("u_his",a.history.length))}d&&"function"==typeof d.getTimezoneOffset&&c.push(S("u_tz",-d.getTimezoneOffset()));b&&("function"==typeof b.javaEnabled&&c.push(S("u_java",b.javaEnabled())),b.plugins&&c.push(S("u_nplug",b.plugins.length)),b.mimeTypes&&c.push(S("u_nmime",b.mimeTypes.length)));
return c.join("")}function pa(a){if("3455315"!=(N?O(2):""))return"";a=a?a.title:"";if(void 0==a)return"";var b=function(a){try{return decodeURIComponent(a),!0}catch(b){return!1}};a=encodeURIComponent(a);for(var d=128;!b(a.substr(0,d));)d--;return"&tiba="+a.substr(0,d)}
function V(a,b,d,c){var e="";if(b){var g;if(a.top==a)g=0;else{var h=a.location.ancestorOrigins;if(h)g=h[h.length-1]==a.location.origin?1:2;else{h=a.top;try{var l;if(l=!!h&&null!=h.location.href)c:{try{k(h.foo);l=!0;break c}catch(m){}l=!1}g=l}catch(m){g=!1}g=g?1:2}}l="";l=d?d:1==g?a.top.location.href:a.location.href;e+=S("frm",g);e+=S("url",R(l));e+=S("ref",R(c||b.referrer))}return e}
function W(a){return!ea&&!qa.test(navigator.userAgent)||a&&a.location&&a.location.protocol&&"https:"==a.location.protocol.toString().toLowerCase()?"https:":"http:"}var qa=/Android ([01]\.|2\.[01])/i;function ra(){return new Image}function X(a,b,d){var c=ra;"function"===typeof a.opt_image_generator&&(c=a.opt_image_generator);c=c();b+=S("async","1");c.src=b;c.onload=d&&"function"===typeof a.onload_callback?a.onload_callback:function(){}}
function sa(a){for(var b=window,d={},c=function(c){d[c]=a&&null!=a[c]?a[c]:b[c]},e=0;e<P.length;e++)c(P[e]);c("onload_callback");return d};window.google_trackConversion=function(a){a=sa(a);a.google_conversion_format=3;var b;var d=window,c=navigator,e=document,g=!1;if(a&&3==a.google_conversion_format){try{var h;"landing"==a.google_conversion_type||!a.google_conversion_id||a.google_remarketing_only&&a.google_disable_viewthrough?h=!1:(a.google_conversion_date=new Date,a.google_conversion_time=a.google_conversion_date.getTime(),a.google_conversion_snippets="number"==typeof a.google_conversion_snippets&&0<a.google_conversion_snippets?a.google_conversion_snippets+
1:1,"number"!=typeof a.google_conversion_first_time&&(a.google_conversion_first_time=a.google_conversion_time),a.google_conversion_js_version="8",0!=a.google_conversion_format&&1!=a.google_conversion_format&&2!=a.google_conversion_format&&3!=a.google_conversion_format&&(a.google_conversion_format=1),N=new ka(1,2,3),h=!0);if(h){h="/?";"landing"==a.google_conversion_type&&(h="/extclk?");var l,m=[a.google_remarketing_only?"viewthroughconversion/":"conversion/",Q(a.google_conversion_id),h,"random=",Q(a.google_conversion_time)].join(""),
q=a.google_remarketing_only?"googleads.g.doubleclick.net":a.google_conversion_domain||"www.googleadservices.com";l=W(d)+"//"+q+"/pagead/"+m;if(N&&(m=N,q=["3455314","3455315"],!m.c&&m.a.hasOwnProperty(2)&&""==m.a[2])){var p,n,I;b:{try{var Y=window.top.location.hash;if(Y){var Z=Y.match(/\bdeid=([\d,]+)/);I=Z&&Z[1]||"";break b}}catch(aa){}I=""}var ba=I.match(new RegExp("\\b("+q.join("|")+")\\b"));n=ba&&ba[0]||null;var y;if(n)y=n;else b:{if(!(1E-4>Math.random())){var z=Math.random();if(0>z){n=window;
try{var ca=new Uint32Array(1);n.crypto.getRandomValues(ca);z=ca[0]/65536/65536}catch(aa){z=Math.random()}y=q[Math.floor(z*q.length)];break b}}y=null}(p=y)&&""!=p&&m.a.hasOwnProperty(2)&&(m.a[2]=p)}var A;b:{var da=a.google_conversion_language;if(null!=da){var x=da.toString();if(2==x.length){A=S("hl",x);break b}if(5==x.length){A=S("hl",x.substring(0,2))+S("gl",x.substring(3,5));break b}}A=""}b=[S("cv",a.google_conversion_js_version),S("fst",a.google_conversion_first_time),S("num",a.google_conversion_snippets),
S("fmt",a.google_conversion_format),S("value",a.google_conversion_value),S("currency_code",a.google_conversion_currency),S("label",a.google_conversion_label),S("oid",a.google_conversion_order_id),S("bg",a.google_conversion_color),A,S("guid","ON"),S("disvt",a.google_disable_viewthrough),S("is_call",a.google_is_call),S("eid",la().join()),na(a),oa(d,c,a.google_conversion_date),ma(a),V(d,e,a.google_conversion_page_url,a.google_conversion_referrer_url),a.google_remarketing_for_search&&!a.google_conversion_domain?
"&srr=n":"",pa(e)].join("");X(a,l+b,!0);if(a.google_remarketing_for_search&&!a.google_conversion_domain){var B,ta=[Q(a.google_conversion_id),"/?random=",Math.floor(1E9*Math.random())].join("");B=W(d)+"//www.google.com/ads/user-lists/"+ta;B+=[S("label",a.google_conversion_label),S("fmt","3"),V(d,e,a.google_conversion_page_url,a.google_conversion_referrer_url)].join("");X(a,B,!1)}g=!0}}catch(aa){}b=g}else b=!1;return b};}).call(this);
