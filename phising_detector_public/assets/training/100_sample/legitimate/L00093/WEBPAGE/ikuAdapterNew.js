 (function(){
	/**
	 * iku interface for website:
	 */
	/***********iku v5.0***********************/
	var ikuPlugin;
	function ikuPluginInit(){
		var ua = window.navigator.userAgent;
		if(ua.indexOf('Chrome/') !== -1 && parseInt(ua.substr(ua.indexOf("Chrome/")+7 , 2)) >= 43)
			return;

		if( ikuPlugin ) return; //create only once.
			var div = document.createElement("ikuadapter");
			div.innerHTML = "<object id=\"ikuplugin0\" type=\"application/x-youkuagent\" width=\"0\" height=\"0\"></object>";
			document.body.appendChild(div);
			ikuPlugin = document.getElementById('ikuplugin0');
	}

	function ikuPluginExec(str){
		ikuPluginInit();
		try{
			return ikuPlugin.exec("start","desktop",str);
		}catch(ex){
			return false;
		}
	}

	function ikuPluginP2P(){
		try{
			ikuPluginInit();
			var str=ikuPlugin.exec("port","acc","1"); 
			return str;
		}catch(ex){
			return false;
		}
	}

	function ikuPluginId(){
		try{
			ikuPluginInit();
			var str=ikuPlugin.exec("peerid","0","0"); 
			return str;
		}catch(ex){
			return false;
		}
	}

	///////////////////////////////////////////////////////////////////
	//interface for ActiveX
	var ikuAX;
	function getIkuActiveX() {
		if (!ikuAX && navigator.userAgent.indexOf('MSIE') != -1) {
			if (window.ActiveXObject) {
				try {
					ikuAX = new ActiveXObject("iKuAgent.KuAgent2");
				}catch(ex) {}
			}
		}
		return ikuAX;
	}

	function execByActiveX(ope,params) {
		if((iku = getIkuActiveX()) != undefined){
			return iku.exec(ope,params);
		}return ""; 
	}

	function httpGet(theUrl){
		var xmlHttp;
		try{
			var xmlHttp;
			// Firefox, Opera 8.0+, Safari
			if(window.XDomainRequest )
				xmlHttp = new XDomainRequest();
			else
				xmlHttp = new XMLHttpRequest();
			
			xmlHttp.open( "GET", theUrl, false );
		}catch (e){
			// Internet Explorer
			try{
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
				xmlHttp.open( "GET", theUrl, false );
			}catch (e){
				try{
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
					xmlHttp.open( "GET", theUrl, false );
				}catch(e){
					return "";
				}
			}
		}
		try{
			xmlHttp.send( null );
			return xmlHttp.responseText;
		}catch(ex){
			return "";
		}
	}
	
	var errornum = 0;
	var errortime = 0;
	function jsonp(config , from) {
		var nowTime = (new Date()).valueOf();
		if(errornum >= 3 && errortime != 0 && (nowTime - errortime) <= 600000 && from == 'player'){
			return false;	
		}
		if(!config || !config.url){
			return false;
		}
		var timeout = config.time || 3000;
		var url = config.url;
		var jQueryAjax = function(){
			jQuery.ajax({ 
				type : "get", 
				url : url, 
				dataType : "jsonp", 
				data:{},
				processData:true,
				timeout: timeout,
				success : function(json){ 
					var d = eval("("+json+")");
					if(d && d.iku){
						if(typeof(config.success) == 'function'){
							config.success(d.iku);
						}
					}else{
						if(typeof(config.fail) == 'function'){
							config.fail();
						}	
					}
				}, 
				error:function(XMLHttpRequest, textStatus, errorThrown){ 
					if(typeof(config.fail) == 'function'){
						config.fail();
					}	
					errornum += 1;
					errortime = (new Date()).valueOf();
					return false;
				} 
			}); 
		}
		
		if (window.jQuery == undefined) {
			var old$ = $;
		    var url = [location.protocol, "//", "static.youku.com", "/js/jquery.js"].join("");
		    var _script = document.createElement("script");
		    _script.type = "text/javascript";
		    _script.src = url;
		    document.getElementsByTagName("head")[0].appendChild(_script);
			if (!/*@cc_on!@*/0) {
				_script.onload = function () {
					$ = old$;
					window.jQuery.noConflict();
					jQueryAjax();
					_script.parentNode.removeChild(this);
				}
				_script.onerror = function () {
					_script.parentNode.removeChild(this);
				}
			} else {
				_script.onreadystatechange = function () {
					if (this.readyState == 'loaded' || this.readyState == 'complete') {
						$ = old$;
						window.jQuery.noConflict();
						jQueryAjax();
					}
					this.parentNode.removeChild(this);
				}
			} 
	    }else{
			jQueryAjax();
		}

	}
	function is_ie6_or_ie7()
	{
		var flag = false;
		if(
			navigator.appName == "Microsoft Internet Explorer"
			&&(
		  	navigator.appVersion.match(/MSIE 6./i)=="MSIE 6."
		 	|| navigator.appVersion.match(/MSIE 7./i)=="MSIE 7."
			)
		)
		{
			flag = true;
		}
		return flag;
	}
	function on_error(scene)
	{
		ret_str = "http://iku.youku.com/channelinstall/";
		if (scene){
			ret_str += scene;
		}
		return ret_str;
	}
	
	function ikuExecuteForIE(str_cmd,scene,on_suc,on_fail)
	{
		var timeout_test = 10000;
		jsonp({
	    url: 'http://127.0.0.1:61078/check_iku',
	    success: function(d){
	      //数据处理
	      jsonp({
			    url: 'http://127.0.0.1:61078/?command=' + str_cmd,
			    success: function(d){
			      //数据处理
			      on_suc(d);
			    },
			    time: timeout_test,
			    fail: function(){
			      //错误处理
			      on_fail(on_error(scene));
			    }
			  });
	    },
	    time: timeout_test,
	    fail: function(){
	      //错误处理
	      jsonp({
			    url: 'http://127.0.0.1:61079/check_iku',
			    success: function(d){
			      //数据处理
			      jsonp({
					    url: 'http://127.0.0.1:61079/?command=' + str_cmd,
					    success: function(d){
					      //数据处理
					       on_suc(d);
					    },
					    time: timeout_test,
					    fail: function(){
					      //错误处理
					      on_fail(on_error(scene));
					    }
					  });
			    },
			    time: timeout_test,
			    fail: function(){
			      //错误处理
			      on_fail(on_error(scene));
			    }
			  });
	    }
	  },'page');  
	}
	
	//scene 用于汇报日志和区分渠道下载
	function ikuNewExecute( b, scene, on_suc, on_fail){
		b += scene;
		b += "|";
		
		var ret_str = "ok";
		var ua = window.navigator.userAgent;
		if( !(ua.indexOf('Chrome/') !== -1 && parseInt(ua.substr(ua.indexOf("Chrome/")+7 , 2)) >= 43) ){
				var step_flag = ikuPluginExec(b);
				if(step_flag && step_flag != "false"){
					return ret_str;
				}
		}

		var num = Date.parse(new Date());
		
		if( is_ie6_or_ie7() ){
			var on_suc_function = arguments[2]?arguments[2]: function(ret_url) {};
			var on_fail_function = arguments[3]?arguments[3]: function(ret_url) {};
			ikuExecuteForIE( b + "|" + num, scene, on_suc_function, on_fail_function );
			return ret_str;
		}
		
		var iku_ret = httpGet("http://127.0.0.1:61078/check_iku");
		if(iku_ret == "iku"){
			var command_line = "http://127.0.0.1:61078/?command=" + b + "|" + num;
			ret_str = httpGet(command_line);
		}else{
			iku_ret = httpGet("http://127.0.0.1:61079/check_iku");
			if(iku_ret == "iku"){
				var command_line = "http://127.0.0.1:61079/?command=" + b + "|" + num;
				ret_str = httpGet(command_line);
			}else{
				ret_str = "http://iku.youku.com/channelinstall/";
				if (scene){
					ret_str += scene;
				}else{
					ret_str = "";
				}
			}
		}
		return ret_str;
	}
	
	function compare_version( version_a, version_b )
	{
		//兼容老版本,避免js报错
		if( version_a == 1 )
			return -1;
	
		var str_a_array = version_a.split(".");
		var str_b_array = version_b.split(".");

		if(str_a_array.length != 4 || str_b_array.length != 4 )
			return -1;

		for(i=0;i<4;i++)
		{
			if( str_a_array[i] < str_b_array[i] )
				return -1;
			if( str_a_array[i] > str_b_array[i] )
				return 1;
		}

		return 0;
	}
	
	var invoke_acc_ver = "6.7.2.11172";
	
	function invoke_ikuacc()
	{
		var timeout_test = 3000;
		var str_cmd = "iku://|startacc|";
		jsonp({
	    url: 'http://127.0.0.1:61078/check_ikuacc',
	    success: function(d){
	    	if( compare_version( d, invoke_acc_ver ) < 0 )
	    		return;
	      //数据处理
	      jsonp({
			    url: 'http://127.0.0.1:61078/?command=' + str_cmd,
			    success: function(d){
			      //数据处理
			      //on_suc(d);
			    },
			    time: timeout_test,
			    fail: function(){
			      //错误处理
			      //on_error(scene,on_fail);
			    }
			  });
	    },
	    time: timeout_test,
	    fail: function(){
	      //错误处理
	      jsonp({
			    url: 'http://127.0.0.1:61079/check_ikuacc',
			    success: function(d){
			    	if( compare_version( d, invoke_acc_ver ) < 0 )
	    				return;
			      //数据处理
			      jsonp({
					    url: 'http://127.0.0.1:61079/?command=' + str_cmd,
					    success: function(d){
					      //数据处理
					       //on_suc(d);
					    },
					    time: timeout_test,
					    fail: function(){
					      //错误处理
					      //on_error(scene,on_fail);
					    }
					  });
			    },
			    time: timeout_test,
			    fail: function(){
			      //错误处理
			      //on_error(scene,on_fail);
			    }
			  });
	    }
	  },'player');
	}
	
	function getP2PStateFromIku()
	{
		var now_time = (new Date()).valueOf();

		var ret = ikuPluginP2P();
		if( ret == false )
		{
			do
			{
				var num = Date.parse(new Date());
				var command_line = "http://127.0.0.1:61078/?new_command=iku://|getP2PState|" + num;
				ret = httpGet(command_line);
				ret = ( ret == "" ? "fail" : ret );//修正结果
				if( !isNaN(ret) && ret>0 )
					break;

				command_line = "http://127.0.0.1:61079/?new_command=iku://|getP2PState|" + num;
				ret = httpGet(command_line);
				ret = ( ret == "" ? "fail" : ret );//修正结果
				if( !isNaN(ret) && ret>0 )
					break;

				invoke_ikuacc();

			}while(false);
		}
		
		return (!isNaN(ret))?ret:0;
	}

	window.ikuNewExecute = ikuNewExecute; // 对外接口
	window.getP2PStateFromIku = getP2PStateFromIku;
})();
