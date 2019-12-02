/*1406148259,,JIT Construction: v1339867,en_US*/

/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {
(function(){if(typeof fb_param==='undefined'||fb_param===null||!fb_param.pixel_id)return;function a(j){var k=[];for(var l=0,m=j.length;l<m;l++)k.push(j[l][0]+'='+encodeURIComponent(j[l][1]));return k.join('&');}var b='https://www.facebook.com/offsite_event.php',c=[];c.push(['id',fb_param.pixel_id]);if(fb_param.value)c.push(['value',fb_param.value]);if(fb_param.currency)c.push(['currency',fb_param.currency]);var d=fb_param.cd;if(d&&typeof d==='object')for(var e in d)if(d.hasOwnProperty(e)){var f=d[e],g=(f===null)?'null':typeof f;if(g in {number:1,string:1,boolean:1}){c.push(['cd['+encodeURIComponent(e)+']',f]);}else if(g==='object'){f=(typeof JSON==='undefined')?String(f):JSON.stringify(f);c.push(['cd['+encodeURIComponent(e)+']',f]);}}var h=b+'?'+a(c),i=new Image();i.src=h;})();} catch (e) {new Image().src="https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"1339867","message":"'+e.message+'"}}');}