//tealium universal tag - utag.171 ut4.0.201604272022, Copyright 2016 Tealium.com Inc. All Rights Reserved.
var uetq=uetq||[];try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}
if(utag.ut.loader===undefined){u.loader=function(o){var b,c,l,a=document;if(o.type==="iframe"){b=a.createElement("iframe");o.attrs=o.attrs||{"height":"1","width":"1","style":"display:none"};for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";for(l in utag.loader.GV(o.attrs)){b[l]=o.attrs[l];}b.src=o.src;}if(o.id){b.id=o.id};if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb()},false);}else{b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}}}}else{u.loader=utag.ut.loader;}
if(utag.ut.typeOf===undefined){u.typeOf=function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
u.ev={"view":1,"link":1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,g;u.data={"base_url":"//bat.bing.com/bat.js","tagid":"4046839","ec":"","ea":"","el":"","ev":"","gv":"","order_subtotal":""};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.data.order_subtotal=u.data.order_subtotal||b._csubtotal||"";u.loader_cb=function(){if(!u.initialized){var o={ti:u.data.tagid};o.q=uetq;uetq=new UET(o);uetq.push("pageLoad");}
u.initialized=true;g={};if(u.data.ec){g.ec=u.data.ec;}
if(u.data.ea){g.ea=u.data.ea;}
if(u.data.el){g.el=u.data.el;}
if(u.data.ev){g.ev=u.data.ev;}
u.data.gv=u.data.gv||u.data.order_subtotal;if(u.data.gv){g.gv=u.data.gv;}
if(g.ec||g.ea||g.el||g.ev||g.gv){uetq.push(g);}};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":"utag_171"});}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);}("171","usaa.main"));}catch(error){utag.DB(error);}
