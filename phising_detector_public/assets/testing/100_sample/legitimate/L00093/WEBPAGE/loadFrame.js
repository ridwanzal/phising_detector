
(function(window,undefined){

	
	var vr = '20160419'; //版本号
	var preDomain = 'https://';
	var localScriptSrc = preDomain+'account.youku.com/static-resources/dest/login.js?'+vr,
			localLogoutSrc = preDomain+'account.youku.com/static-resources/dest/logout.js?'+vr,
			mobileCss = preDomain +'account.youku.com/static-resources/dest/frame_mobile.css?'+vr,
			pcCss = preDomain + 'account.youku.com/static-resources/dest/frame_common.css?'+vr,
			pcMiniCss = preDomain + 'account.youku.com/static-resources/dest/frame_mini.css?'+vr;
	var opts,loginObj,logoutObj,loadfail;

	function getLoginFrame(options){
		opts = options;
		this.loadfail = function(){ return }
		loadfail = options.loadfail || this.loadfail;
		this.init();
	}
	getLoginFrame.prototype = {
		init: function(){
			var _this = this;
			if( opts.loginOrLogout && opts.loginOrLogout  == 'login' ){
				//加载登录
				var styleSrc = ((opts.template == 'tempMobile')?mobileCss:(opts.size =='mini'?pcMiniCss:pcCss));
					loadStyle(styleSrc);
					setTimeout(function(){
						if( window.loginFrame ){
							loginObj = new loginFrame(opts);
						}else{
							loadScript(localScriptSrc,function(){
								if( !window.loginFrame ){
									failDoMore( opts,loadfail );
								}else{
									loginObj = new loginFrame(opts);
								}
							});
						}
					},50);
			}else{
			//加载登出
				var outOpt = {};
				if( opts.logoutSuccess ){
					outOpt.logoutSuccess = opts.logoutSuccess;
				}else{
					outOpt.logoutSuccess = function(){ window.location.reload() }
				}
				outOpt.buid = opts.buid || '';
				outOpt.pid = opts.pid || '';
				loadScript(localLogoutSrc,function(){
					if( !window.logoutFrame ){ 
						failDoMore( opts,loadfail );
					}else{
						logoutObj = new logoutFrame(outOpt);
					}
				});
			}
		},
		buildLoginDom: function(from){
			addTask(run(function(){
				loginObj.buildLoginDom(from);
			}));
		},
		buildRegDom: function(from){
			addTask(run(function(){
				loginObj.buildRegDom(from);
			}));
		},
		closeFrame: function(callback){
			if( loginObj ){
				loginObj.closeFrame(callback);
			}
		}
	}

	window.getLoginFrame = window.getLoginFrame || getLoginFrame;
	//格式化ajax参数
	function formateParams(data){
		var arr = [];
		for (var key in data){
			arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
		}
		return arr.join('&');
	}
	function _jsonp(options){
		var options = options || {};
		options.callback = 'jsonpCallback';
		if ( !options.url ){
			throw new Error('参数不完整');
		}
		//创建script标签
		options.time = 5*1000; 

		var callbackName = 'jsonp_' + (new Date()).getTime() + (Math.floor(Math.random()*9999+1)).toString();
		var Head = document.getElementsByTagName('head')[0];
		options.data[options.callback] = callbackName;
		var params = formateParams(options.data);
		var os = document.createElement('script');
		Head.appendChild(os);
		//创建jsonp回调函数
		window[callbackName] = function(json){
			Head.removeChild(os);
      clearTimeout(os.timer);
      options.success && options.success(json);
      window[callbackName] = null;
		}

		//发送请求        
    os.src = options.url + '?' + params;
    //超时处理        
    if (options.time) {
      os.timer = setTimeout(function () {
          window[callbackName] = null;
          Head.removeChild(os);
          options.fail && options.fail({ message: "超时" });
      }, options.time);
    }
	}
	//动态加载JS文件
	function loadScript(src,callback){
		//生成新script
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		if(window.attachEvent){
			newScript.src = src + (new Date().getTime());
		}else{
			newScript.src = src;
		}
		document.getElementsByTagName('body')[0].appendChild(newScript);

		//判断是否加载完成
		if(window.attachEvent){//ie
			newScript.onreadystatechange = function(){
				if( !this.readyState || this.readyState == "loaded" || this.readyState == "complete" ){
					newScript.onreadystatechange = null;
					if( callback && typeof callback === 'function' ){ callback() }
				}
			}
		}else{
			newScript.onload = function(){
				newScript.onload = null;
				if( callback && typeof callback === 'function' ){ callback() }
			}
		}
	}
	//动态加载CSS文件
	function loadStyle(src){
		if( document.getElementById('YT-loginFrameCss') ){ return }
		var Head = document.getElementsByTagName('head')[0];
		var css = document.createElement('link');
		css.id = 'YT-loginFrameCss';
		css.rel = 'stylesheet';
		css.href = src;
		var styleEl = Head.getElementsByTagName('style');
		(styleEl.length > 0) ?Head.insertBefore(css,styleEl[0]):Head.appendChild(css);
	}
	//循环执行
	function run(callback){
		if( loginObj ){
			callback();
			return true;
		}
		return function(){
			return addTask(run(callback));
		}
	}
	function addTask(fun){
		var result = fun;
		while( typeof result === 'function' ){
			return window.setTimeout(result,10);
		}
		return;
	}
	function failDoMore( opt,failCallback,successCallback){
		if( opt.loginOrLogout && opt.loginOrLogout  == 'login' ) {
			//加载登录
			var styleSrc = ((opt.template == 'tempMobile') ? mobileCss:(opt.size =='mini' ? pcMiniCss:pcCss));
			loadStyle(styleSrc);
			loadScript(localScriptSrc,function(){
				if( !window.loginFrame && failCallback && typeof failCallback === 'function' ){ 
					failCallback();
				}
				loginObj = new loginFrame(opt);
				successCallback && successCallback();
			});
		}else{
			//加载登出
			var outOpt = {};
			if( opt.logoutSuccess ){
				outOpt.logoutSuccess = opt.logoutSuccess;
			}else{
				outOpt.logoutSuccess = function(){ window.location.reload(); }
			}
			outOpt.buid = opt.buid || '';
			outOpt.pid = opt.pid || '';
			loadScript(localLogoutSrc,function(){
				if( !window.logoutFrame && failCallback && typeof failCallback === 'function' ){ 
					failCallback();
				}
				logoutObj = new logoutFrame(outOpt);
				successCallback && successCallback();
			});
		}
	}

})(window);
