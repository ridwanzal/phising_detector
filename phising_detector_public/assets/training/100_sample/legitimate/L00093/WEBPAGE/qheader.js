(function(o){
if(!o || o.QHeader){ return; }

//global domain
document.domain = 'youku.com';

//define variable
var toDomain = function(s){ s = s.replace('http://', ''); if(s[s.length -1] == '/'){ s = s.substr(0, s.length-1); }; return s; }
var DOMAIN_NC = toDomain(nc_domain)
	,DOMAIN_NOTICE = toDomain(notice_domain)
	,LOADING = '<img src="http://static.youku.com/index/img/2013/loading_16.gif" width="16" height="16" border="0">'
	,isIE6 = document.all && !window.XMLHttpRequest ? true : false;

//header class
var QHeader = {
	ids: {'headerbox': 'qheader_box', 'header': 'qheader'},
	dropmenuGroup: null,
	node: null,
	jsres: typeof(qheaderjs) == 'object' ? qheaderjs : null,
	ready: false,
	status: 'static',
	rule: '',//取消顶导fixed
	init: function(){
		this.header = document.getElementById(this.ids.header);
		this.headerbox = document.getElementById(this.ids.headerbox);
		if(!this.header){ return; }
		//优先执行的功能不依赖资源加载
		this.Nav.findStick();//导航替换
		this.Search.init();//搜索功能
		//登录状态 common.js ready
		if(typeof(islogin) == 'function' && !islogin()){
			document.getElementById('qheader_logbefore').style.display = 'block';
		}
		
		this.bind();
		//依赖打印代码中的资源声明打印
		if(!this.jsres){ return; }
		var _this = this, canrun = false, runed = false;

		//运行时检测依赖脚本, 如加载立即运行
		var timer = setInterval(function(){
			if(_this.chkres('relyon')){
				canrun = true;
				clearInterval(timer);
				if(!runed){
					_this.bindfns(); runed = true;
				}
			}
		}, 10);

		//domready后检测依赖脚本, 添加未包含的脚本, 并加载附加功能
		domReady(function(){
			clearInterval(timer); timer = null;
			canrun = canrun || _this.chkres('relyon');

			var addons = function(){
				_this.chkres('addons');
				_this.loadres('addons', function(){
					if(typeof(XBox) != 'undefined'){
						XBox.init({"site":14});

						var f = document.getElementById('qheader_search');
						if(f){
							var b = f.getElementsByTagName('button')[0];
							if(b){
								addEvent(b, 'click', function(){
									_this.Search.doSearch();
								});
							}
						}
					}
				});
			}

			if(!canrun){
				_this.loadres('relyon', function(){
					var relyon = _this.jsres.relyon;
					for(var i=0; i<relyon.length; i++){
						if(relyon[i].ready !== true){ return; }
					}
					if(!runed){ _this.bindfns(); runed = true;}
					addons();
				});
			}else{
				if(!runed){ _this.bindfns(); runed = true; }
				addons();
			}
		});
	},
	bind: function(){
		var _this = this;
		addEvent(window, 'scroll', function(){
			if(_this.rule == 'fixed'){
				_this.changePos('scroll');
			}
		});
	},
	bindfns: function(){
		this.ready = true;
		this.dropmenuGroup = new DropmenuGroup();
		this.Userlog.init();
		this.Channel.init();
		this.Nav.init();
		this.Upload.init();
		this.NoticeNew.init();
	},
	dofix: function(){
		return this.changeRule('fixed');
	},
	unfix: function(){
		return this.changeRule('static');
	},
	changeRule: function(rule){
		if(rule != this.rule){
			this.rule = rule;
			this.changePos('rule');
		}
		return this;
	},
	changePos: function(type){
		var ready = typeof(Element) == 'function' ? true : false;//prototype ready
		var fixpos = false, inview = true;
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		var posheader = getElementPos(this.header);

		if(scrolltop >= this.header.offsetHeight + posheader.y){ inview = false; }
		if(scrolltop >= posheader.y){ fixpos = true; }

		var _this = this
			,header = ready ? Element.extend(this.header) : this.header
			,headerbox = ready ? Element.extend(this.headerbox) : this.headerbox;

		if(this.rule == 'fixed'){
			if(fixpos){
				if(this.status != 'fixed'){
					if(!isIE6){ headerbox.style.position = 'fixed'; }
					this.status = 'fixed';
				}
			}else{
				if(this.status != 'static'){
					if(!isIE6){ headerbox.style.position = 'relative'; }
					this.status = 'static';
				}
			}
		}else{
			if(this.status != 'static'){
				if(!isIE6){ headerbox.style.position = 'relative'; }
				this.status = 'static';
			}
		}

		return this;
	},
	loadres: function(key, callback){
		var res = this.jsres[key];
		var _this = this;
		var callback = typeof(callback) == 'function' ? callback : function(){};
		for(var i=0; i<res.length; i++){
			(function(i){
				if(res[i].ready === false){
					_this.jsres[key][i].ready = 'loading';
					addScript(_this.jsres[key][i].src, function(){
						_this.jsres[key][i].ready = true;
						callback();
					});
				}
			})(i);
		}
	},
	chkres: function(key){//同步加载状态下 检测依赖的JS资源
		var res = this.jsres[key];
		if(!res){ return true; }
		var _this = this;
		var scripts = document.getElementsByTagName('script');
		for(var i=0; i<scripts.length; i++){
			var script = scripts[i];
			for(var j=0; j<res.length; j++){
				if(script.src && script.src == res[j].src){

					(function(script, key, j){
						if(!_this.jsres[key][j].ready && eval(_this.jsres[key][j].condition)){
							_this.jsres[key][j].ready = true;
						}
					})(script, key, j);
				}
			}
		}
		for(var i=0; i<this.jsres[key].length; i++){
			if(this.jsres[key][i].ready !== true){
				return false;
			}
		}
		return true;
	}
}

QHeader.Userlog = {
	uid: 0,
	lock: false,
	first: true,
	init: function(){
		this.logbefore = $('qheader_logbefore');
		this.logafter = $('qheader_logafter');
		if(!this.logbefore || !this.logafter){ return; }
		var node =  $('qheader_username');;
		if(!node){ return; }

		this.dp = new Dropmenu({
			'group': QHeader.dropmenuGroup,
			'node': node,
			'fire': 'hover'
		});
		this.dp.setCallback('show', function(){
			QheaderModule.showUserMsg();
		});
		this.update();
		this.bind();
		QheaderModule.noticePoll();
	},
	bind: function(){
		var _this = this;
		$('qheader_login').observe('click', function(e){
			login({type:'header', callBack:''}); preventDefault(e);
		});
		window['update_login_status_hook_qheader'] = function(){
			var uid = _this.getUID();
			if(_this.uid != uid){//第一次header自身获取信息， 其他区域登录且更换账号再次获取
				_this.update();
			}
		}
	},
	getLogStatus: function(){
		if(islogin()){ return true; }
		return false;
	},
	update: function(){
		var st = this.getLogStatus();
		this.uid = this.getUID();
		this.username = this.getUserName();
		if(st){
			this.logbefore.hide();
			this.logafter.show();
			this.getUserinfo();
		}else{
			this.logbefore.show();
			this.logafter.hide();
			this.uid = 0;
		}
		return this;
	},
	getUserinfo: function(){
		if(this.lock){ return; }
		this.lock = true;
		if(this.username){
			$('qheader_username_show').update('<div style="text-align:center;margin-top:5px;">'+ LOADING +'</div>');
		}
		QheaderModule.initHeaderUser();
	},
	getUID: function(){
		if(!islogin()){ return 0; }
		var ckie = Nova.Cookie.get('yktk');
		var uid = 0;
		if(ckie){
			try{
				var u_info = decode64(decodeURIComponent(ckie).split('|')[3]);
				if(u_info.indexOf(',') > -1 && u_info.indexOf('nn:') > -1 && u_info.indexOf('id:') > -1){
					uid = u_info.split(',')[0].split(':')[1];
				}
			}catch(e){ }
		}

		return parseInt(uid);
	},
	getUserName: function(){
		if(!islogin()){ return 0; }
		var ckie = Nova.Cookie.get('yktk');
		var name = 0;
		if(ckie){
			try{
				var u_info = decode64(decodeURIComponent(ckie).split('|')[3]);
				if(u_info.indexOf(',') > -1 && u_info.indexOf('nn:') > -1 && u_info.indexOf('id:') > -1){
					name = u_info.split(',')[1].split(':')[1];
				}
			}catch(e){ }
		}

		return name;
	}
}

QHeader.NoticeNew = {
	init: function(){
		var node = $('qheader_notice');
		if(!node){ return; }
		this.dp = new Dropmenu({
			'group': QHeader.dropmenuGroup,
			'node': node,
			'fire': 'hover'
		});
		this.dp.setCallback('show', function(){
			QheaderModule.showNoticeList();
		});
	}
}

QHeader.Search = {
	defaultKey: '',
	init: function(){
		this.form = document.getElementById('qheader_search');
		if(!this.form){ return; }
		this.input = this.form.getElementsByTagName('input')[0];
		this.button = this.form.getElementsByTagName('button')[0];
		var defkey = this.findFirstKey();
		if(defkey){
			this.setDefaultKey(defkey);
		}
		this.bind();
	},
	bind: function(){
		var form = this.form
			,input = this.input
			,button = this.button
			,_this = this
		addEvent(input, 'focus', function(){
			var def = _this.getDefaultKey()
				,val = trim(input.value);
			if(val == def && def){
				input.className = '';
				input.value = '';
			}
		});
		addEvent(input, 'blur', function(){
			var def = _this.getDefaultKey()
				,val = trim(input.value);
			if((val== '' || val == def) && def){
				input.className = 'input-default';
				input.value = def;
			}
		});
	},
	getKey: function(key){
		var val = trim(this.input.value);
		return val;
	},
	setKey: function(key){
		if(typeof(key)=='string' || typeof(key)=='number'){
			var key = trim(key.toString());
			this.input.value = key;
			this.input.className = '';
		}
		return this;
	},
	getDefaultKey: function(){
		return this.defaultKey;
	},
	setDefaultKey: function(key){
		if(typeof(key)=='string' || typeof(key)=='number'){
			var key = trim(key.toString());
			this.input.value = key;
			if(key){ this.input.className = 'input-default'; }
			else{ this.input.className = ''; }
			this.defaultKey = key;
		}
		return this;
	},
	findFirstKey: function(){
		var key = '';
		var get = function(links){
			for(var i=0; i<links.length; i++){
				var k = trim(links[i].innerHTML);
				if(k != ''){
					return k;
				}
			}
		}
		var area = document.getElementById('qheader_keywords');
		if(area){
			var links = area.getElementsByTagName('A');
			if(links.length){
				var k = get(links);
				if(k){
					key = k;
				}
			}
		}
		return key;
	},
	doSearch: function(){
		var q = trim(this.input.value), url = '',
			stat = '';//for cross site stat
		if(window.logPvid){
			stat = '_rp='+window.logPvid;
		}

		if(q == ''){//keyword empty -> go to soku home
			url = 'http://www.soku.com?inner' + ('&' + stat);
		}else{//keyword no empty -> go to search video
			if(this.form.action.indexOf('/q_') === -1){//keyword set by user manual input
				q = encodeURIComponent(q);
				url = this.form.action + '/q_'+ q + ('?' + stat);
			}else{//keyword set by soku suggest list
				url = this.form.action + ('&' + stat);
			}
		}
		window.open(url);
		this.form.action = 'http://www.soku.com/search_video';//reset action after doSearch for next search
		return false;
	}
}

QHeader.Channel = {
	init: function(){
		var node = $('qheader_channel');
		if(!node){ return; }
		this.dp = new Dropmenu({
			'group': QHeader.dropmenuGroup,
			'node': node,
			'fire': 'hover'
		});
	},
	show: function(){
		if(this.dp){ this.dp.show(); }
		return this;
	},
	hide: function(){
		if(this.dp){ this.dp.hide(); }
		return this;
	}
}

QHeader.Nav = {
	init: function(){
		var nav = $('qheader_nav');
		if(!nav){ return; }
		var nodes = nav.select('.dropdown');
		nodes.each(function(node){
			var dp = new Dropmenu({
				'group': QHeader.dropmenuGroup,
				'node': node,
				'fire': 'hover'
			});
		});
	},
	findStick: function(){
		var nav = document.getElementById('qheader_nav');
		if(!nav){ return; }
		var divs = nav.getElementsByTagName('div');
		var fhandle=null, fpanel = null, fcurrent = null;
		for(var i=0, len=divs.length; i<len; i++){
			var div = divs[i];
			if(div.className && div.className == 'panel'){//find dropmenu
				var lis = div.getElementsByTagName('li');
				var flag = true;
				for(var j=0, len1=lis.length; j<len1; j++){//find current
					var li = lis[j]	;
					if(li.className && li.className == 'current'){
						flag = false;
						fpanel = div; fcurrent = li;
						var o = fpanel.parentNode.getElementsByTagName('div')[0];
						if(o && o.className && o.className == 'handle'){
							fhandle = o;
						}
						break;
					}
				}
				if(!flag){ break; }
			}
		}
		if(fcurrent && fhandle){//replace
			var a1 = fhandle.getElementsByTagName('a')[0]
				,a2 = fcurrent.getElementsByTagName('a')[0]
				,a1_text = a1.innerHTML
				,a1_href = a1.href
				,a2_text = a2.innerHTML
				,a2_href = a2.href;

			a1.href = a2_href; a1.innerHTML = a2_text;	a1.className = 'current';
			a2.href = a1_href; a2.innerHTML = a1_text;

			var ul = fcurrent.parentNode, li = document.createElement('li');

			li.appendChild(a2);
			ul.insertBefore(li, ul.firstChild);
			ul.removeChild(fcurrent);
		}
	}
}

QHeader.Upload = {
	init: function(){
		var node = $('qheader_upload');
		if(!node){ return; }
		this.dp = new Dropmenu({
			'group': QHeader.dropmenuGroup,
			'node': node,
			'fire': 'hover'
		});
	},
	show: function(){
		if(this.dp){ this.dp.show(); }
		return this;
	},
	hide: function(){
		if(this.dp){ this.dp.hide(); }
		return this;
	}
}

var DropmenuGroup = function(){
	this.coll = [];
	this.bind();
}
DropmenuGroup.prototype = {
	bind: function(){
		var _this = this;
		document.observe('click', function(){
			for(var i=0; i<_this.coll.length; i++){
				if(_this.coll[i].fire == 'click'){
					_this.coll[i].hide();
				}
			}
		})
	},
	getLength: function(){
		return this.coll.length;
	},
	isExist: function(dropmenu){
		var len = this.getLength();
		for(var i=0; i<len; i++){
			if(this.coll[i] == dropmenu){
				return true;
			}
		}
		return false;
	},
	add: function(dropmenu){
		if(dropmenu instanceof Dropmenu && !this.isExist(dropmenu)){
			this.coll.push(dropmenu);
		}
		return this;
	},
	remove: function(dropmenu){
		var len = this.getLength();
		for(var i=0; i<len; i++){
			if(this.coll[i] == dropmenu){
				this.coll.splice(i, 1);
				break;
			}
		}
		return true;
	},
	hideAll: function(){
		var len = this.getLength();
		for(var i=0; i<len; i++){
			this.coll[i].hide();
		}
		return this;
	},
	hideOther: function(dropmenu){
		var len = this.getLength();
		for(var i=0; i<len; i++){
			if(this.coll[i] != dropmenu){
				this.coll[i].hide();
			}
		}
		return this;
	}
}

var Dropmenu = function(params){
	var params = typeof(arguments[0]) == 'object' ? params : {}
	this.group = params.group ? params.group : new DropmenuGroup();
	this.fire = params.fire ? params.fire : 'click';
	this.fire = this.fire=='hover' && !("createTouch" in document) ? 'hover' : 'click';
	this.node = params.node ? params.node : null;
	this.delay = params.delay ? params.delay : 200;
	this.callback = params.callback ? params.callback : {};
	this.mask = null;
	this.status = 'hide';
	this.classname = {'drop': 'dropdown-open',	'mask': 'mask'};
	if(!this.node){ return; }
	this.handle = this.node.select('.handle')[0];
	this.panel = this.node.select('.panel')[0];

	this.callback =  {
		'show': typeof(this.callback.show) == 'function' ? this.callback.show : null,
		'hide':	typeof(this.callback.hide) == 'function' ? this.callback.hide : null
	}
	if(!this.handle || !this.panel){ return; }

	this.init();
}
Dropmenu.prototype = {
	init: function(){
		this.group.add(this);//向菜单组添加
		this.bind();
	},
	bind: function(){
		var _this = this;
		if(this.fire == 'click'){
			this.handle.observe('click', function(e){	_this.toggle(); cancelBubble(e); });
			this.panel.observe('click', function(e){ cancelBubble(e); });
		}else if(this.fire == 'hover'){
			var time = 0;
			var timer = null;
			this.node
			.observe('click', function(e){	cancelBubble(e); })
			.observe('mouseenter', function(e){
				clearInterval(timer); time = 0;
				timer = setInterval(function(){
					if(time>=_this.delay){ _this.show(); clearInterval(timer); time = 0; return; }
					time += 10;
				}, 10);
			})
			.observe('mouseleave', function(e){
				clearInterval(timer); time = 0;
				timer = setInterval(function(){
					if(time>=_this.delay){ _this.hide(); clearInterval(timer); time = 0; return; }
					time += 10;
				}, 10);
			});
		}
	},
	f5mask: function(){
		if(this.mask){
			var w = this.panel.offsetWidth,
				h = this.panel.offsetHeight,
				style = {'width': w+'px', 'height': h+'px'};
			this.mask.setStyle(style);
		}
		return this;
	},
	setCallback: function(type, func){
		if(type == 'show' && typeof(func) == 'function'){
			this.callback.show = func;
		}
		if(type == 'hide' && typeof(func) == 'function'){
			this.callback.hide = func;
		}
		return this;
	},
	update: function(html){
		this.panel.update(html);
		this.f5mask();
		return this;
	},
	show: function(){
		if(this.status == 'show'){ return this; }
		this.node.addClassName(this.classname.drop);
		if(!this.mask){
			var attr = {'scrolling': '0', 'frameborder': '0'};
			this.mask = new Element('iframe')
						.addClassName(this.classname.mask)
						.writeAttribute(attr);
			this.node.appendChild(this.mask);
		}
		this.f5mask();
		//点击触发收起其他菜单
		if(this.fire == 'click'){ this.group.hideOther(this); }
		this.status = 'show';
		if(this.callback.show){ this.callback.show(); }
		return this;
	},
	hide: function(){
		if(this.status == 'hide'){ return this; }
		this.node.removeClassName(this.classname.drop);
		this.status = 'hide';
		if(this.callback.hide){ this.callback.hide(); }
		return this;
	},
	toggle: function(){
		var status = this.getStatus();
		if(status == 'hide'){
			return this.show();
		}else{
			return this.hide();
		}
	},
	getStatus: function(){
		return this.status;
	}
}

//private method
var domReady = function(callback){
	var timer = null;
	var isready = false;
	var callback = typeof(callback) == 'function' ? callback : function(){};
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded", function(){
			if(!isready){ isready = true; callback(); }
		}, false);
	}else if(document.attachEvent){
		document.attachEvent("onreadystatechange", function(){
			if((/loaded|complete/).test(document.readyState)){
				if(!isready){ isready = true; callback(); }
			}
		});
		if(window == window.top){
			timer = setInterval(function(){
				if(isready){ clearInterval(timer); timer=null; return; }
				try{
					document.documentElement.doScroll('left');
				}catch(e){
					return;
				}
				if(!isready){ isready = true; callback(); }
			},5);
		}
	}
}

var addScript = function(src, callback, isremove){
	if(typeof(arguments[0]) != 'string'){ return; }
	var callback = typeof(arguments[1]) == 'function' ? callback : function(){};
	var isremove = typeof(arguments[2]) == 'boolean' ? isremove : false;
	var head = document.getElementsByTagName('HEAD')[0];
	var script = document.createElement('SCRIPT');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
	if(!/*@cc_on!@*/0) {
		script.onerror = script.onload = function(){
			callback();
			if(isremove){ script.parentNode.removeChild(this); }
		}
	}else{
		script.onreadystatechange = function () {
			if (this.readyState == 'loaded' || this.readyState == 'complete') {
				callback();
				if(isremove){ this.parentNode.removeChild(this); }
			}
		}
	}
}

var addEvent = function(dom, eventname, func){
	if(window.addEventListener){
		if(eventname == 'mouseenter' || eventname == 'mouseleave'){
			function fn(e){
				var a = e.currentTarget, b = e.relatedTarget;
				if(!elContains(a, b) && a!=b){
					func.call(e.currentTarget,e);
				}
			}
			function elContains(a, b){
				try{ return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16); }catch(e){}
			}
			if(eventname == 'mouseenter'){
				dom.addEventListener('mouseover', fn, false);
			}else{
				dom.addEventListener('mouseout', fn, false);
			}
		}else{
			dom.addEventListener(eventname, func, false);
		}
	}else if(window.attachEvent){
		dom.attachEvent('on' + eventname, func);
	}
}

var cancelBubble = function(evt){
	var evt = window.event || evt;
	if(evt.stopPropagation){
		evt.stopPropagation();
	}else{
		evt.cancelBubble=true;
	}
	return false;
}

var preventDefault = function(evt){
	var evt = window.event || evt;
	if(evt.preventDefault){
		evt.preventDefault();
	}else{
		event.returnValue = false;
	}
	return false;
}

var getElementPos = function(o){
	var point = {x:0, y:0};
	if (o.getBoundingClientRect) {
		var x=0, y=0;
		try{
			var box = o.getBoundingClientRect();
			var D = document.documentElement;
			x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
			y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;
		}catch(e){}
		point.x = x;
		point.y = y;
	}else{
		function pageX(o){ try {return o.offsetParent ? o.offsetLeft +  pageX(o.offsetParent) : o.offsetLeft; } catch(e){ return 0; } }
		function pageY(o){ try {return o.offsetParent ? o.offsetTop + pageY(o.offsetParent) : o.offsetTop; } catch(e){ return 0; } }
		point.x = pageX(o);
		point.y = pageY(o);
	}
	return point;
}

var getMousePos = function(e){
	var point = {x:0, y:0};
	if(typeof window.pageYOffset != 'undefined') {
		point.x = window.pageXOffset;
		point.y = window.pageYOffset;
	}else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
		point.x = document.documentElement.scrollLeft;
		point.y = document.documentElement.scrollTop;
	}else if(typeof document.body != 'undefined') {
		point.x = document.body.scrollLeft;
		point.y = document.body.scrollTop;
	}
	point.x += e.clientX;
	point.y += e.clientY;

	return point;
}

var trim = function(s){
	s = s.replace( /^(\s*|　*)/, '');
	s = s.replace( /(\s*|　*)$/, '');
	return s;
}
//cn
var truncate = function(s,length, truncation){
	var reg = /[\u4e00-\u9fa5]/;
	var count = 0, t = '';
	for(var i=0, len=s.length; i<len; i++){
		var char = s.charAt(i);
		if(reg.test(char)){ count ++; }
		else{ count += 0.8;	}
		t += char;
		if(count>=len || count + 0.1 > length){
			if(i != len-1){ t+= truncation; } break;
		}
	}
	return t;
}

var truncate1 = function(str , len , truncation){
	if(!str){
		return '';
	}
	var str_length = 0;
	var str_len = str.length;
	var str_cut = '';
	for(var i = 0; i < str_len; i++){
		str_length++;
		var a = str.charAt(i);
		if(window.escape(a).length > 4)  {
			//中文字符的长度经编码之后大于4
			str_length++;
		}
		if(str_length>len)  {
			if(truncation){
				str_cut = str_cut.concat(truncation);
			}
			return str_cut;
		}
		str_cut = str_cut.concat(a);
	}
	//如果给定字符串小于指定长度，则返回源字符串；
	if(str_length <= len){
		return  str;
	}
}

var hz = function(cp, cpp){
	var url = 'http://hz.youku.com/red/click.php?tp=1&cp=' + cp +'&cpp=' + cpp + '&tp='+Math.random()
	var img = new Image();
	img.src = url;
}

//init
o.QHeader = QHeader;
QHeader.init();
//FX
;(function(){this.FX=function(b,c,d,e,f,g){this.el=a.get(b),this.attributes=c,this.duration=d||.7,this.transition=e&&e in FX.transitions?e:"easeInOut",this.callback=f||function(){},this.ctx=g||window,this.units={},this.frame={},this.endAttr={},this.startAttr={}},this.FX.transitions={linear:function(a,b,c,d){return c*a/d+b},easeIn:function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b},easeOut:function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b},easeInOut:function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b}},this.FX.prototype={start:function(){var a=this;this.getAttributes(),this.duration=1e3*this.duration,this.time=(new Date).getTime(),this.animating=!0,this.timer=setInterval(function(){var b=(new Date).getTime();a.time+a.duration>b?(a.elapsed=b-a.time,a.setCurrentFrame()):(a.frame=a.endAttr,a.complete()),a.setAttributes()},10)},ease:function(a,b){return FX.transitions[this.transition](this.elapsed,a,b-a,this.duration)},complete:function(){clearInterval(this.timer),this.timer=null,this.animating=!1,this.callback.call(this.ctx)},setCurrentFrame:function(){for(attr in this.startAttr)if(this.startAttr[attr]instanceof Array){this.frame[attr]=[];for(var a=0;this.startAttr[attr].length>a;a++)this.frame[attr][a]=this.ease(this.startAttr[attr][a],this.endAttr[attr][a])}else this.frame[attr]=this.ease(this.startAttr[attr],this.endAttr[attr])},getAttributes:function(){for(var b in this.attributes)switch(b){case"color":case"borderColor":case"border-color":case"backgroundColor":case"background-color":this.startAttr[b]=c(this.attributes[b].from||a.getStyle(this.el,b)),this.endAttr[b]=c(this.attributes[b].to);break;case"scrollTop":case"scrollLeft":var d=this.el==document.body?document.documentElement||document.body:this.el;this.startAttr[b]=this.attributes[b].from||d[b],this.endAttr[b]=this.attributes[b].to;break;default:var e,f=this.attributes[b].to,g=this.attributes[b].units||"px";this.attributes[b].from?e=this.attributes[b].from:(e=parseFloat(a.getStyle(this.el,b))||0,"px"!=g&&document.defaultView&&(a.setStyle(this.el,b,(f||1)+g),e=(f||1)/parseFloat(a.getStyle(this.el,b))*e,a.setStyle(this.el,b,e+g))),this.units[b]=g,this.endAttr[b]=f,this.startAttr[b]=e}},setAttributes:function(){for(var b in this.frame)switch(b){case"opacity":a.setStyle(this.el,b,this.frame[b]);break;case"scrollLeft":case"scrollTop":var c=this.el==document.body?document.documentElement||document.body:this.el;c[b]=this.frame[b];break;case"color":case"borderColor":case"border-color":case"backgroundColor":case"background-color":var d="rgb("+Math.floor(this.frame[b][0])+","+Math.floor(this.frame[b][1])+","+Math.floor(this.frame[b][2])+")";a.setStyle(this.el,b,d);break;default:a.setStyle(this.el,b,this.frame[b]+this.units[b])}}};var a={get:function(a){return"string"==typeof a?document.getElementById(a):a},getStyle:function(a,c){c=b(c);var d=document.defaultView;if(d&&d.getComputedStyle)return d.getComputedStyle(a,"")[c]||null;if("opacity"==c){var e=a.filters("alpha").opacity;return isNaN(e)?1:e?e/100:0}return a.currentStyle[c]||null},setStyle:function(a,c,d){"opacity"==c?(a.style.filter="alpha(opacity="+100*d+")",a.style.opacity=d):(c=b(c),a.style[c]=d)}},b=function(){var a={};return function(b){if(a[b])return a[b];var c=b.split("-"),d=c[0];if(c.length>1)for(var e=1,f=c.length;f>e;e++)d+=c[e].charAt(0).toUpperCase()+c[e].substring(1);return a[b]=d}}(),c=function(){var a=/^#?(\w{2})(\w{2})(\w{2})$/,b=/^#?(\w{1})(\w{1})(\w{1})$/,c=/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;return function(d){var e=d.match(a);return e&&4==e.length?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:(e=d.match(c),e&&4==e.length?[parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10)]:(e=d.match(b),e&&4==e.length?[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]:void 0))}}()})(),FX.transitions.quadIn=function(a,b,c,d){return c*(a/=d)*a+b},FX.transitions.quadOut=function(a,b,c,d){return-c*(a/=d)*(a-2)+b},FX.transitions.quadInOut=function(a,b,c,d){return 1>(a/=d/2)?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},FX.transitions.cubicIn=function(a,b,c,d){return c*(a/=d)*a*a+b},FX.transitions.cubicOut=function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},FX.transitions.cubicInOut=function(a,b,c,d){return 1>(a/=d/2)?c/2*a*a*a+b:c/2*((a-=2)*a*a+2)+b},FX.transitions.quartIn=function(a,b,c,d){return c*(a/=d)*a*a*a+b},FX.transitions.quartOut=function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b},FX.transitions.quartInOut=function(a,b,c,d){return 1>(a/=d/2)?c/2*a*a*a*a+b:-c/2*((a-=2)*a*a*a-2)+b},FX.transitions.quintIn=function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},FX.transitions.quintOut=function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},FX.transitions.quintInOut=function(a,b,c,d){return 1>(a/=d/2)?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},FX.transitions.expoIn=function(a,b,c,d){return 0==a?b:c*Math.pow(2,10*(a/d-1))+b-.001*c},FX.transitions.expoOut=function(a,b,c,d){return a==d?b+c:1.001*c*(-Math.pow(2,-10*a/d)+1)+b},FX.transitions.expoInOut=function(a,b,c,d){return 0==a?b:a==d?b+c:1>(a/=d/2)?c/2*Math.pow(2,10*(a-1))+b-5e-4*c:1.0005*(c/2)*(-Math.pow(2,-10*--a)+2)+b},FX.transitions.circIn=function(a,b,c,d){return-c*(Math.sqrt(1-(a/=d)*a)-1)+b},FX.transitions.circOut=function(a,b,c,d){return c*Math.sqrt(1-(a=a/d-1)*a)+b},FX.transitions.circInOut=function(a,b,c,d){return 1>(a/=d/2)?-c/2*(Math.sqrt(1-a*a)-1)+b:c/2*(Math.sqrt(1-(a-=2)*a)+1)+b},FX.transitions.backIn=function(a,b,c,d,e){return e=e||1.70158,c*(a/=d)*a*((e+1)*a-e)+b},FX.transitions.backOut=function(a,b,c,d,e){return e=e||1.70158,c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},FX.transitions.backBoth=function(a,b,c,d,e){return e=e||1.70158,1>(a/=d/2)?c/2*a*a*(((e*=1.525)+1)*a-e)+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},FX.transitions.elasticIn=function(a,b,c,d,e,f){if(0==a)return b;if(1==(a/=d))return b+c;if(f||(f=.3*d),!e||Math.abs(c)>e){e=c;var g=f/4}else var g=f/(2*Math.PI)*Math.asin(c/e);return-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f))+b},FX.transitions.elasticOut=function(a,b,c,d,e,f){if(0==a)return b;if(1==(a/=d))return b+c;if(f||(f=.3*d),!e||Math.abs(c)>e){e=c;var g=f/4}else var g=f/(2*Math.PI)*Math.asin(c/e);return e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+c+b},FX.transitions.elasticBoth=function(a,b,c,d,e,f){if(0==a)return b;if(2==(a/=d/2))return b+c;if(f||(f=d*.3*1.5),!e||Math.abs(c)>e){e=c;var g=f/4}else var g=f/(2*Math.PI)*Math.asin(c/e);return 1>a?-.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+b:.5*e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+c+b},FX.transitions.backIn=function(a,b,c,d,e){return e===void 0&&(e=1.70158),c*(a/=d)*a*((e+1)*a-e)+b},FX.transitions.backOut=function(a,b,c,d,e){return e===void 0&&(e=1.70158),c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},FX.transitions.backBoth=function(a,b,c,d,e){return e===void 0&&(e=1.70158),1>(a/=d/2)?c/2*a*a*(((e*=1.525)+1)*a-e)+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},FX.transitions.bounceIn=function(a,b,c,d){return c-FX.transitions.bounceOut(d-a,0,c,d)+b},FX.transitions.bounceOut=function(a,b,c,d){return 1/2.75>(a/=d)?c*7.5625*a*a+b:2/2.75>a?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:2.5/2.75>a?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},FX.transitions.bounceBoth=function(a,b,c,d){return d/2>a?.5*FX.transitions.bounceIn(2*a,0,c,d)+b:.5*FX.transitions.bounceOut(2*a-d,0,c,d)+.5*c+b};

})(window);
