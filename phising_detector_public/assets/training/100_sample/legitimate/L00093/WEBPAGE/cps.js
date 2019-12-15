//premium cps
(function(){
	
	var base64_decode = function(data){
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];
		if (!data) { return data; }
		data += '';
		do { 
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));
			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;
			if (h3 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
				tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		} while (i < data.length);
		dec = tmp_arr.join('');
		dec = utf8_decode(dec);
		return dec;
	}
	
	var utf8_decode = function(str_data){
		var tmp_arr = [],i = 0,ac = 0,c1 = 0,c2 = 0,c3 = 0;str_data += '';
		while (i < str_data.length) {
			c1 = str_data.charCodeAt(i);
			if (c1 < 128) {
				tmp_arr[ac++] = String.fromCharCode(c1);
				i++;
			} else if (c1 > 191 && c1 < 224) {       
				c2 = str_data.charCodeAt(i + 1);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = str_data.charCodeAt(i + 1);
				c3 = str_data.charCodeAt(i + 2);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		} 
		return tmp_arr.join('');
	}
	
	var setvidcookie = function()
	{
		var exdate=new Date()
		var url = encodeURIComponent(window.location);
		//console.log(url);
		var flag_string = encodeURIComponent("http://v.youku.com/v_show/id_");
		var start_sel = url.indexOf(flag_string);
		var start = start_sel + flag_string.length;
		var end = url.indexOf('.html');
		var c_name = "premium_cps_vid";
		var kid = "";
		var expiremin = 10;
		if(start_sel == 0 && end > 0){
			kid = decodeURIComponent(url.substring(start, end));
			//console.log(kid);
			exdate.setTime(exdate.getTime+expiremin*60*1000);
			document.cookie=c_name+ "=" +escape(kid)+
			((expiremin==null) ? "" : ";expires="+exdate.toGMTString()+";domain=youku.com;path=/")
		}
		return;
	}
	
	setvidcookie();
	var cps_name = "premium_cps",yktk_name = "yktk",cps_val = null,yktk_val = null,uid = 0,tid = 0,ytid = 0,log = "";
	var cookies = document.cookie;
	if(cookies == "") return;
	var cookies_arr = cookies.split(";");
	for(var i=0;i<cookies_arr.length;i++){
		var cookie_value = cookies_arr[i].replace( /^\s+|\s+$/g,"");
		if (cookie_value.substring(0, cps_name.length+1) == (cps_name + "=")) {
			cps_val = cookie_value.substring(cps_name.length+1);
		}
		if (cookie_value.substring(0, yktk_name.length+1) == (yktk_name + "=")) {
			yktk_val = cookie_value.substring(yktk_name.length+1);
		}
	}
	if(yktk_val){
		yktk_val = unescape(yktk_val);
		var yktk_arr = yktk_val.split("|");
		var users = yktk_arr[3];
		users.replace(":","=").replace(",","&");
		var user_info = base64_decode(users);
		var user_info_arr = user_info.split(",");
		uid = user_info_arr[0].substring("id:".length);
		ytid = user_info_arr[3].substring("ytid:".length);
		tid = user_info_arr[4].substring("tid:".length);
	}
	
	var logParam = [];
	var pass_turn  = true;
	var pass_bd  = true;
	
	if(!cps_val){
		var img;
		logParam.lt = 0;
		logParam.lvid = 0;
		logParam.mid = 0;
		logParam.cid = 0;
		logParam.pid = 0;
		logParam.lpid = 0;
		logParam.uid = uid;
		logParam.uri = encodeURIComponent(window.location);
		logParam.ytid = ytid;
		logParam.tid = tid;
		var myDate = new Date();
		logParam.ct = myDate.getHours()+':'+ myDate.getMinutes()+':'+ myDate.getSeconds();
		logParam.ext = '';
		
		log = [
			'lt='+logParam.lt,
			'lvid='+logParam.lvid,
			'mid='+logParam.mid,
			'cid='+logParam.cid,
			'pid='+logParam.pid,
			'lpid='+logParam.lpid,
			'uid='+logParam.uid,
			'uri='+logParam.uri,
			'ytid='+logParam.ytid,
			'tid='+logParam.tid,
			'ct='+logParam.ct,
			'ext='+logParam.ext
		].join('&');
		
		imgSrc = 'http://p.l.youku.com/vippay?' + log;
		
		img= document.createElement('img');  
		img.width = 0;
		img.height = 0;
		img.src = imgSrc;
		
		return;
	}
	
	cps_val = unescape(cps_val);
	var cps_val_arr = cps_val.split("_");
	var ip = cps_val_arr[0];
	for(var i=1;i<cps_val_arr.length;i++){
		if(cps_val_arr[i]!=""){
			var cps_val_item_arr = cps_val_arr[i].split("|");
			var url;
			var img;
			
			if(pass_turn){
				log = [	'"ip":'+ip,
					'"lvid":'+i,
					'"mid":'+cps_val_item_arr[0],
					'"cid":'+cps_val_item_arr[1],
					'"pid":'+cps_val_item_arr[2],
					'"lpid":'+cps_val_item_arr[3],
					'"uid":'+uid,
					'"uri":"'+encodeURIComponent(window.location)+'"',
					'"ytid":'+ytid,
					'"tid":'+tid
				].join(',');	
				
				url = "http://passport-log.youku.com/logsys/logstorage/append?project=paysys&log={"+log+"}";
				img= document.createElement('IMG');  
				img.width = 0;
				img.height = 0;
				img.src = url;  
			}
			
			if(pass_bd){
				logParam.lt = 0;
				logParam.lvid = i;
				logParam.mid = cps_val_item_arr[0];
				logParam.cid = cps_val_item_arr[1];
				logParam.pid = cps_val_item_arr[2];
				logParam.lpid = cps_val_item_arr[3];
				logParam.uid = uid;
				logParam.uri = encodeURIComponent(window.location);
				logParam.ytid = ytid;
				logParam.tid = tid;
				var myDate = new Date();
				logParam.ct = myDate.getHours()+':'+ myDate.getMinutes()+':'+ myDate.getSeconds();
				logParam.ext = '';
				
				log = [
					'lt='+logParam.lt,
					'lvid='+logParam.lvid,
					'mid='+logParam.mid,
					'cid='+logParam.cid,
					'pid='+logParam.pid,
					'lpid='+logParam.lpid,
					'uid='+logParam.uid,
					'uri='+logParam.uri,
					'ytid='+logParam.ytid,
					'tid='+logParam.tid,
					'ct='+logParam.ct,
					'ext='+logParam.ext
				].join('&');
				
				imgSrc = 'http://p.l.youku.com/vippay?' + log;
				
				img= document.createElement('img');  
				img.width = 0;
				img.height = 0;
				img.src = imgSrc;
			}
			
		}

	}
	//document.body.appendChild(img);
	
})();
