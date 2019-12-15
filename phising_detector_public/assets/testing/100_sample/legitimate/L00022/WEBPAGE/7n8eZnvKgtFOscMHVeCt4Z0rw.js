function AC(t){this.callback=t,this.items=0,this.results={}}function PL(){this.ls=this.checkLs()?window.localStorage:null,this.lsVersion="2",this.lsVersionKey="lsVersion",this.isXDRSupport=-1===window.location.hash.indexOf("fail_xdr=1")&&!/fail_xdr=1(;|$)/.test(document.cookie)&&!!(window.XDomainRequest||window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest),this.XDRSupportFailed=!1,this.checkLsVersion()}var ya=this.ya||{};ya.zCookie={},ya.zCookie.insert=function(t,e){var o,n,r,s=e.split(":"),i=[],a=!1;if(3===s.length){r=s[0],n=t.split("|");for(var c=0,l=n.length;l>c;c++)n[c]&&(o=n[c].split(":"),o[0]===r?(i.push(e),a=!0):i.push(n[c]));return a||i.push(e),i.join("|")}return!1},AC.prototype.add=function(t,e){var o=this;return this.items++,function(){var n=e.apply(e,arguments);o.check(t,n)}},AC.prototype.check=function(t,e){this.results[t]=e,this.items--,0===this.items&&this.callback(this.results)},PL.prototype.checkLs=function(){try{return"localStorage"in window&&null!==window.localStorage?(localStorage.setItem("test","1"),"1"===localStorage.getItem("test")):!1}catch(t){return!1}},PL.prototype.checkLsVersion=function(){if(this.ls)try{this.ls.getItem(this.lsVersionKey)!==this.lsVersion&&this.ls.clear(),this.ls.setItem(this.lsVersionKey,this.lsVersion)}catch(t){}},PL.prototype.clearLs=function(t){var e,o,n,r,s,i=[];if(this.ls)try{for(r=0,s=this.ls.length;s>r;++r)e=this.ls.key(r),e&&-1!==e.indexOf(".")&&(n=this.ls.getItem(e),n&&"v="===n.substr(0,2)&&n.indexOf("@")>-1&&(o=n.substr(2,n.indexOf("@")-2),(o&&!t[e]||t[e].version!==o)&&i.push(e)));for(r=0,s=i.length;s>r;++r)this.ls.removeItem(i[r])}catch(a){}},PL.prototype.clearCookie=function(t,e){for(var o,n,r,s=t.split("|"),i=[],a=0,c=s.length;c>a;a++)s[a]&&(r=s[a].split(":"),"m-"===r[0].substr(0,2)&&(o=r[0].substr(2),n=r[1],o=o.replace(/-https$/,""),e[o]&&e[o].version===n&&i.push(s[a])));return i.join("|")},PL.prototype.load=function(t,e){var o,n=this,r=new AC(function(o){var r,s,i,a={},c=[];for(r in o)o.hasOwnProperty(r)&&(s="m-"+o[r].name+":"+o[r].version+":",a[s]||(a[s]={0:0,1:0,2:0}),a[s][String(o[r].result)]++);for(r in a)a.hasOwnProperty(r)&&(i=r,s=a[r],s[0]||(!s[1]&&s[2]?i+="l":s[1]&&(i+="c"),c.push(i)));if(n.clearLs(t),c.length){var l=decodeURIComponent((document.cookie.match(/zm=([^;]+)/)||[])[1]||""),u=l,p=function(t,e){var o,n,r,s=e.split(":"),i=[],a=!1;if(3===s.length){r=s[0],n=t.split("|");for(var c=0,l=n.length;l>c;c++)n[c]&&(o=n[c].split(":"),o[0]===r?(i.push(e),a=!0):i.push(n[c]));return a||i.push(e),i.join("|")}return t};u=n.clearCookie(u,t);for(var h=0,d=c.length;d>h;h++)u=p(u,c[h]);u&&u!==l&&(document.cookie="zm="+encodeURIComponent(u)+"; expires="+new Date(+new Date+12096e5).toUTCString()+"; domain=.yandex.ru; path=/")}e()});for(var s in t)t.hasOwnProperty(s)&&(o=t[s],this.loadFile(o,s,r.add(s,this.loadFileHandler)))},PL.prototype.notloaded={css:0,js:0},PL.prototype.markAsNotloaded=function(t){this.notloaded[t]++},PL.prototype.markAsLoaded=function(t){this.notloaded[t]--,window.$&&!this.notloaded[t]&&$(window).trigger(t+"loaded.cacher")},PL.prototype.loadFile=function(t,e,o){var n,r=t.version,s=this;if(this.ls&&(n=this.loadFromLs(e,r)))return!t.dry&&this["run"+t.type]&&this["run"+t.type](n),void setTimeout(function(){o({version:r,name:t.name,result:2})},0);if(this.markAsNotloaded(t.type),!t.dry){var i=this.getExtension(t.url);this["get"+i]&&this["get"+i](t.url,function(){s.markAsLoaded(t.type)})}this.XDRSupport()?this.get(t.url,function(n){var i=!1;n?(i=s.saveToLs(e,r,t,n),o({version:r,name:t.name,result:i?2:1})):o({version:r,name:t.name,result:1})}):o({version:r,name:t.name,result:1})},PL.prototype.loadFileHandler=function(t){return t},PL.prototype.getVersion=function(t){return"v="+t+"@"},PL.prototype.getExtension=function(t){return t.split(".").slice(-1)[0]},PL.prototype.getXHR=function(){return window.XMLHttpRequest?function(){return new window.XMLHttpRequest}:function(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}},PL.prototype.getXDR=function(){return window.XDomainRequest?function(){return new window.XDomainRequest}:this.getXHR()},PL.prototype.XDRSupport=function(){return this.isXDRSupport},PL.prototype.appendToHead=function(t){document.getElementsByTagName("head").item(0).appendChild(t)},PL.prototype.getcss=function(t,e){var o=document.createElement("link");o.setAttribute("type","text/css"),o.setAttribute("rel","stylesheet"),o.setAttribute("href",t),/(opera|firefox)(?:.*version)?[ \/]([\w.]+)/i.test(navigator.userAgent)?o.onload=e:"onreadystatechange"in o?o.onreadystatechange=function(){/loaded|complete/.test(o.readyState)&&e()}:!function n(){o&&o.sheet?e():setTimeout(n,20)}(),this.appendToHead(o)},PL.prototype.getjs=function(t,e){var o=document.createElement("script");o.setAttribute("type","text/javascript"),o.setAttribute("charset","utf-8"),o.setAttribute("src",t),this.appendToHead(o);var n=!1;o.onload=o.onreadystatechange=function(){var t=this.readyState;n||t&&"loaded"!==t&&"complete"!==t||(n=!0,e(),o.onload=o.onreadystatechange=null)}},PL.prototype.get=function(t,e){var o=this,n=/^\/\/|^https:\/\/|^http:\/\//.test(t)?this.getXDR():this.getXHR();if(n){n=n(),n.open("GET",t,!0);var r=function(){n.onreadystatechange=function(){};try{n.onload=n.onerror=n.onprogress=function(){}}catch(t){}r=s=null;var o=n.responseText;e(o)},s=function(){n.onreadystatechange=function(){};try{n.onload=n.onerror=n.onprogress=function(){}}catch(t){}r=s=null;try{n.abort()}catch(t){}o.onXDRFail(),e()};"onreadystatechange"in n?n.onreadystatechange=function(){return n.readyState<4?void 0:location.hash.indexOf("abort_xdr=1")>-1?void(s&&s()):void(200===n.status&&n.responseText?r&&r():s&&s())}:n.onload=r;try{n.onerror=s,n.onprogress=function(){}}catch(i){}n.send(null)}},PL.prototype.onXDRFail=function(){this.XDRSupportFailed||(document.cookie="fail_xdr=1;max-age=604800",this.isXDRSupport=!1,this.XDRSupportFailed=!0)},PL.prototype.runjs=function(t){t&&/\S/.test(t)&&(window.execScript||function(t){window.eval.call(window,t)})(t)},PL.prototype.appendStyle=function(t,e){e=e||null;var o=document.createElement("style");o.setAttribute("type","text/css"),e&&(o.media=e),this.appendToHead(o),o.styleSheet?o.styleSheet.cssText=t:o.appendChild(document.createTextNode(t))},PL.prototype.qRegexp=/@media([^\{]+)\{([\s\S]*?\})[\s]*?\}/gi,PL.prototype.fqRegexp=/@media *([^\{]+)\{([\S\s]+?)\}$/,PL.prototype.runcss=function(t){this.appendStyle(t)},PL.prototype.loadFromLs=function(t,e){if(!this.ls)return"";var o,n=this.getVersion(e),r=n.length;try{o=this.ls.getItem(t)}catch(s){return""}if(o){var i=o.substr(0,r);if(i===n){var a=parseInt(o.substr(r+2),10),c=o.substr(r+3+(a+"").length);if(a===c.length)return c;this.sendStat("zcookie.error.get")}try{this.ls.removeItem(t)}catch(l){}}return""},PL.prototype.sendLog=function(t){var e=setInterval(function(){"jQuery"in window&&(clearTimeout(e),jQuery.get("/empty.html?lscachererr="+encodeURIComponent(t)))},500)},PL.prototype.sendStat=function(t){var e=setInterval(function(){window.cp&&Lego&&Lego.params&&Lego.params.statRoot&&(clearInterval(e),window.cp(Lego.params.statRoot+"."+t))},1e3)},PL.prototype.saveToLs=function(t,e,o,n){if(!this.ls)return!1;if(o.size!==n.length)return this.sendStat("zcookie.error.load"),!1;var r;try{if(r=this.getVersion(e)+"s="+n.length+"@"+n,this.ls.setItem(t,r),this.ls.getItem(t).length!==r.length)return this.ls.removeItem(t),this.sendStat("zcookie.error.set"),!1}catch(s){return!1}return!0};var pl=new PL;try{document.cookie="z=; expires="+new Date(+new Date-1e4).toUTCString()+"; path=/"}catch(e){}