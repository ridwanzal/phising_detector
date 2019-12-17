var AjaxReq = (function(){

	var ajaxCls = function(obj) {

		var method = "GET";
		var res = {
				"req":null,
				"data":null,
				"code":200
			};
		var post_data = null;
		var httpReq = new XMLHttpRequest();

		this.success = function(callback) {

			httpReq.onreadystatechange = function() {
				if(httpReq.readyState==4) {
					res.data = httpReq.response;
					if(res.code==200) callback(res);
				}
			}
			return this;
		};

		this.failed = function(callback) {
			if(res.code==500) {
				callback(res);
			}
			return this;
		};

		function EncodeHTMLForm( data ) {

		    var params = [];
		    for(var name in data) {
				var value = data[name];
				var param = encodeURIComponent(name)+'='+encodeURIComponent(value);
				params.push(param);
		    }

		    return params.join( '&' ).replace( /%20/g, '+' );
		}

		try {
			if(!obj.url || !obj.data) throw new Exception();
			if(obj.method) method = obj.method.toUpperCase();

			if(method=="GET") {
				if(obj.url.indexOf("\?")!=-1) throw new Exception();
				var i = 0, prm = "";
				for(var key in obj.data)  {
					if(i==0) obj.url += "?"+key+"="+obj.data[key];
					else obj.url += "&"+key+"="+obj.data[key];
					i++;
				}
			}else{
				post_data = EncodeHTMLForm(obj.data);
			}

			httpReq.open(method,obj.url,true);
			httpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			httpReq.send(post_data);
			res.req = obj;
			res.req.method = method;

		}catch(e) {
			res.code = 500;
		}finally{
			return this;
		}
	};

	return {
		request : function (obj) {
			return new ajaxCls(obj);
		}
	};

})();