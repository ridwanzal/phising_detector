//tealium universal tag - utag.59 ut4.0.201601062105, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1,'link':1};u.qsp_delim=";";u.kvp_delim=":";u.advid="939";u.gid="3618";u.pid="544581";u.base_url="//js.dmtry.com/channel.js#";u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f,g,rep_ref='';c=[];g=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].indexOf("cus.ref")==0){rep_ref=b[d];}
else if(e[f].indexOf("cus.")==0){g.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]));}else{u[e[f]]=encodeURIComponent(b[d]);}}}}
if(rep_ref===''){c.push("gid"+u.kvp_delim+u.gid,"advid"+u.kvp_delim+u.advid,"pid"+u.kvp_delim+u.pid);}
else{c.push("gid"+u.kvp_delim+u.gid,"advid"+u.kvp_delim+u.advid,"pid"+u.kvp_delim+u.pid,"chl"+u.kvp_delim+encodeURIComponent(rep_ref));}
c=c.concat(g);u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url+c.join(u.qsp_delim);u.s.parentNode.insertBefore(u.scr,u.s);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('59','usaa.main');}catch(e){}
