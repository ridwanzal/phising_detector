var Qwindow = function(params){
	//default config
	this.config = {
		title: '', 
		size:{ width:320, height:200 },
		mode: 'normal',
		posrefer: window,
		pos:{ top:'middle', left:'center' },
		content: { type:'html', value: '' },
		maskstyle: { color: '#545454', opacity: 0.5 },
		showmask: true,
		showhandle: true,
		zindex: 30000,
		scrolling: false,
		elements: 'object,embed,select',
		onshow: function(){}, 
		onhide: function(){},
		ondestroy: function(){}
	}
	this.config = arguments[0] ? (typeof(arguments[0])=='object' ? this._mergeConfig(this.config, params) : params) : this.config;
	
	this.isIE = (document.all) ? true : false;
	this.isIE6 = this.isIE && !window.XMLHttpRequest;
	//sogou
	//var ua = navigator.userAgent.toLowerCase();
	//ua.indexOf('se 2.x') != -1 ? true : false;
	this.init();
}
Qwindow.prototype = {
	init: function(){
		this.status			= 'hide';
		this.isDestroy		= false;
		this.dom 			= {};		
		this.dom.win 		= document.createElement('div');	this.dom.win.className 			= 'qwindow';
		this.dom.winbox 	= document.createElement('div'); 	this.dom.winbox.className 		= 'winbox';
		this.dom.winbg 		= document.createElement('div'); 	this.dom.winbg.className 		= 'winbg';
		
		this.dom.winhead 	= document.createElement('div');	this.dom.winhead.className 		= 'winhead';
		this.dom.wintitle	= document.createElement('div');	this.dom.wintitle.className		= 'wintitle';
		this.dom.winclose	= document.createElement('div');	this.dom.winclose.className		= 'winclose';
		this.dom.winbody 	= document.createElement('div');	this.dom.winbody.className 		= 'winbody';
		
		this.dom.winmask	= document.createElement('div');	this.dom.winmask.className		= 'qwindow_mask';
		
		if(this.config.title){ this.setTitle(this.config.title).showTitle(); }
		if(this.config.size){ this.setSize(this.config.size.width, this.config.size.height); }
		if(this.config.content){ this.setContent(this.config.content.type, this.config.content.value); }
		if(this.config.mode == 'fixed'){ this.setMode('fixed'); }
		if(this.config.showhandle){ this.showHandle(); }
		
		this.setMaskstyle(this.config.maskstyle.color, this.config.maskstyle.opacity);
		this.setElements(this.config.elements);
		this.setzIndex(this.config.zindex);
		
		this.dom.winhead.appendChild(this.dom.wintitle);
		this.dom.winhead.appendChild(this.dom.winclose);
		this.dom.winbox.appendChild(this.dom.winhead);
		this.dom.winbox.appendChild(this.dom.winbody);
		this.dom.win.appendChild(this.dom.winbox);
		this.dom.win.appendChild(this.dom.winbg);
		document.body.appendChild(this.dom.winmask);
		document.body.appendChild(this.dom.win);
		
		this.bind();
		
	},
	destroy: function(){
		if( this.isDestroy ||
			!this.dom.win ||
			!this.dom.winmask ||
			!this.dom.win.parentNode ||
			!this.dom.winmask.parentNode){ return false; }

		this.isDestroy = true;
		if(typeof(this.config.ondestroy) == 'function'){ this.config.ondestroy(); }

		var iframe = this.dom.win.getElementsByTagName('iframe')[0];
		if(iframe){ iframe.parentNode.removeChild(iframe); }
		this.dom.win.parentNode.removeChild(this.dom.win);
		this.dom.winmask.parentNode.removeChild(this.dom.winmask);

		return true;
	},	
	bind: function(){
		var _this = this;
		this.dom.winclose.onclick = function(){ _this.hide(); }
		var resetwin = function(){
			var status = _this.getStatus();
			if(status == 'show'){
				_this.rePos().resizeMask();;
			}
		}
		if(window.addEventListener){
			window.addEventListener('resize',function(){setTimeout(resetwin, 10)}, false);
		}else if(window.attachEvent){
			window.attachEvent('onresize',function(){setTimeout(resetwin, 10)});
		}
		return this;
	},
	_setOpacity: function(element, opacity){
		if(!element){ return false; }
		if(!document.all){
			element.style.opacity = opacity;	
		}else{
			element.style.filter = 'alpha(opacity=' + opacity*100 + ')';
		}
		return true;
	},
	show: function(){
		var pos = this.getPos();
		this.setPos(pos.top, pos.left);
		this.hideElements();
		if(!this.isIE){
			this._setOpacity(this.dom.win, 1);
		}
		this.dom.win.style.visibility = 'visible';
		this.status = 'show';
		if(this.config.showmask){ this.resizeMask(); this.dom.winmask.style.display = 'block'; }
		if(typeof(this.config.onshow) == 'function'){ this.config.onshow(); }
		return this;
	},
	hide: function(){
		this.showElements();
		if(!this.isIE){
			this._setOpacity(this.dom.win, 0);
		}
		this.dom.win.style.visibility = 'hidden';	
		this.dom.winmask.style.display = 'none';
		this.status = 'hide';
		if(typeof(this.config.onhide) == 'function'){ this.config.onhide(); }
		return this;
	},
	getStatus: function(){
		return this.status;
	},
	toggle: function(){
		var status = this.getStatus();
		if(status == 'show'){ this.hide();	 }else if(status == 'hide'){ this.show(); }
		return this;	
	},
	reload: function(){},
	clearContent: function(){
		var iframe = this.dom.win.getElementsByTagName('iframe')[0];
		if(iframe){ iframe.parentNode.removeChild(iframe); }
		this.dom.winbody.innerHTML = '';
		return this;
	},
	setMode: function(mode){
		var m = 'normal';
		if(mode == 'fixed'){ m = 'fixed'; }
		else{ m = 'normal';}
		if(this.config.posrefer == window && !this.isIE6){
			this.dom.win.style.position = (m =='fixed') ? 'fixed' : 'absolute';
			this.config.mode = m;
			this.rePos();
		}
		return this;
	},
	setContent: function(type, value){
		this.config.content.type = type;
		this.config.content.value = value;
		this.clearContent();
		if(type == 'html' || type == 'element'){
			if(type == 'html'){
				this.dom.winbody.innerHTML = value;
			}else{
				if(!value){ return false; }
				this.dom.winbody.appendChild(value);
			}
			if(this.config.scrolling){ this.dom.winbody.style.overflow = 'auto'; }
			else{ this.dom.winbody.style.overflow = 'hidden'; }
		}else if(type == 'iframe'){
			this.dom.winbody.style.overflow = 'hidden';
			var iframe = document.createElement('iframe');
			iframe.frameBorder = '0';
			iframe.scrolling = this.config.scrolling ? 'auto' : 'no';
			this.dom.winbody.appendChild(iframe);
			setTimeout(function() {iframe.src = value}, 10); //for ie6
		}
		return this;
	},
	setScrolling: function(bool){
		if(this.config.scrolling != bool){
			this.config.scrolling = bool;
			if(this.config.content.type == 'iframe'){
				iframe = this.dom.winbody.getElementsByTagName('iframe')[0];
				if(iframe){
					this.dom.winbody.style.overflow = 'hidden';
					var iframe_new = document.createElement('iframe');
					iframe_new.frameBorder = '0';
					iframe_new.scrolling = bool ? 'auto' : 'no';;
					iframe_new.src = this.config.content.value;
					iframe.parentNode.removeChild(iframe);
					this.dom.winbody.appendChild(iframe_new);
				}
			}else{
				if(bool){ this.dom.winbody.style.overflow = 'auto'; }
				else{ this.dom.winbody.style.overflow = 'hidden'; }	
			}
		}
		return this;
	},	
	getSize: function(){
		return this.config.size;
	},
	getRealsize: function(){
		return {
			'width': this.dom.win.scrollWidth,
			'height': this.dom.win.scrollHeight	
		}
	},
	setSize: function(width, height){
		var width = parseInt(width, 10);
		var height = parseInt(height, 10);
		this.config.size.width = width;
		if(!isNaN(width)){
			this.dom.winbody.style.width = width + 'px';
			this.dom.winhead.style.width = width + 'px';
		}
		if(!isNaN(height)){
			this.config.size.height = height;
			this.dom.winbody.style.height = height + 'px';
		}
		this.rePos();
		return this;
	},
	getPos: function(){ 
		return this.config.pos;
	},
	setPosrefer: function(refer){
		if(!refer){ return false; }
		this.config.posrefer  = refer;
		this.rePos();
		return this;
	},
	setPos: function(top, left){
		var top_offset = 0;
		var left_offset = 0;
		var realtop = this.config.posrefer != window ? (isNaN(parseInt(top, 10)) ? 0 : parseInt(top, 10)) : top;
		var realleft = this.config.posrefer != window ? (isNaN(parseInt(left, 10)) ? 0 : parseInt(left, 10)) : left;
		
		var size_real = this.getRealsize();
		var size_ref = (this.config.posrefer != window) ? 
						{'width': this.config.posrefer.offsetWidth, 'height': this.config.posrefer.offsetHeight} : 
						this._getClientRange();
		var scr = (this.config.posrefer != window) ? 
					this._getOffsetPos(this.config.posrefer) :
					this.config.mode == 'fixed' ?  {top:0, left:0} : this._getWindowScroll();

		if(top == 'top'){ realtop = scr.top; }
		else if(top == 'middle'){ realtop = scr.top + parseInt((size_ref.height - size_real.height)/2); }
		else if(top == 'bottom'){ realtop = scr.top + (size_ref.height - size_real.height); }
		else{ realtop = scr.top + parseInt(top, 10); }
		if(left == 'left'){ realleft = scr.left; }
		else if(left == 'center'){ realleft = scr.left + parseInt((size_ref.width - size_real.width)/2); }
		else if(left == 'right'){ realleft = scr.left + parseInt(size_ref.width - size_real.width); }
		else{ realleft = scr.left + parseInt(left, 10); }
		
		this.config.pos.top = top;
		this.config.pos.left = left;
		this.dom.win.style.top = realtop + 'px';
		this.dom.win.style.left = realleft + 'px';
		
		return this;
	},
	rePos: function(){
		var pos = this.getPos();
		this.setPos(pos.top, pos.left);
		return this;	
	},	
	getTitle: function(){ 
		return this.config.title; 
	},
	setTitle: function(title){ 
		var title = title.toString();
		this.config.title = title; 
		this.dom.wintitle.innerHTML = title;
		return this;
	},	
	showTitle: function(){ 
		this.dom.wintitle.style.display = 'block';
		this.rePos();
		return this;
	},
	hideTitle: function(){ 
		this.dom.wintitle.style.display = 'none'; 
		this.rePos();
		return this;
	},
	showHandle: function(){ 
		this.dom.winclose.style.display = 'block';
		return this;
	},
	hideHandle: function(){ 
		this.dom.winclose.style.display = 'none'; 
		return this;
	},
	showMask: function(){
		this.config.showmask = true;
		if(this.status == 'hide'){ return; }
		this.resizeMask();
		this.dom.winmask.style.display = 'block';
		return this;
	},
	hideMask: function(){
		this.dom.winmask.style.display = 'none';
		this.config.showmask = false;
		return this;
	},
	resizeMask: function(){
		var range1 = this._getScrollRange();
		var range2 = this._getClientRange();
		var range = range2.height > range1.height ? range2 : range1;
		this.dom.winmask.style.width = range.width + 'px';
		this.dom.winmask.style.height = range.height + 'px';
		return this;
	},
	getElements: function(){
		return this.dom;
	},
	setMaskstyle: function(color, opacity){
		this.config.maskstyle.color = color;
		this.config.maskstyle.opacity = opacity;
		this.dom.winmask.style.backgroundColor = color;
		if(!document.all){
			this.dom.winmask.style.opacity = opacity;	
		}else{
			this.dom.winmask.style.filter = 'alpha(opacity=' + opacity*100 + ')';
		}
		return this;
	},	
	setzIndex: function(zindex){
		var zindex = parseInt(zindex, 10);
		this.config.zindex = zindex;
		this.dom.win.style.zIndex = zindex;
		this.dom.winmask.style.zIndex = zindex;
		return this;
	},
	getzIndex: function(){
		return this.config.zindex;
	},
	setShowCallback: function(func){
		if(typeof(func) == 'function'){ this.config.onshow = func; }else{ this.config.onshow = function(){}; }
		return this;
	},
	setHideCallback: function(func){
		if(typeof(func) == 'function'){ this.config.onhide = func; }else{ this.config.onhide = function(){}; }
		return this;
	},
	setDestroyCallback: function(func){
		if(typeof(func) == 'function'){ this.config.ondestroy = func; }else{ this.config.ondestroy = function(){}; }
		return this;
	},
	setElements: function(elements){
		this.elements = null;
		if(elements){ this.config.elements = elements.split(','); }		
		return this;
	},
	showElements: function(){
		if(this.elements){
			for(var i=0, len=this.elements.length; i<len; i++){
				var ele = this.elements[i];
				ele.style.visibility = 'visible';
			}
		}
		return this;	
	},
	hideElements: function(){
		this.elements = [];
		var tags = this.config.elements;
		for(var i=0, len=tags.length; i<len; i++){
			var tag = tags[i];
			var eles = document.getElementsByTagName(tag);
			for(var j=0, lenj=eles.length; j<lenj; j++){
				var ele = eles[j];
				this.elements.push(ele);
			}	
		}
		for(var i=0, len=this.elements.length; i<len; i++){
			var ele = this.elements[i];
			ele.style.visibility = 'hidden'; 
		}
		return this;
	},
	_getWindowScroll: function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		return {'top': scrollTop, 'left': scrollLeft }
	},
	_getScrollRange: function(){
		var w = 0, h = 0;
		w = document.documentElement.scrollWidth || document.body.scrollWidth;
		h = document.documentElement.scrollHeight || document.body.scrollHeight;
		return {'width': w, 'height': h};
	},
	_getClientRange: function(){
		var w = 0, h = 0;		
		w = document.documentElement.clientWidth || document.body.clientWidth;
		h = document.documentElement.clientHeight || document.body.clientHeight;
		return {'width': w, 'height': h};
	},
	_getOffsetPos: function(o) { 
		if (o.getBoundingClientRect) {
			var x=0, y=0;
			try{
				var box = o.getBoundingClientRect();
				var D = document.documentElement;
				x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
				y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;
			}catch(e){}
			return {'top': y, 'left': x};
		}else{
			function pageX(o){ try {return o.offsetParent ? o.offsetLeft +  pageX(o.offsetParent) : o.offsetLeft; } catch(e){ return 0; } }
			function pageY(o){ try {return o.offsetParent ? o.offsetTop + pageY(o.offsetParent) : o.offsetTop; } catch(e){ return 0; } }
			return {'top': pageY(o), 'left': pageX(o)};
		} 
	},
	_mergeConfig: function(target, source, deep){
		target = target || {};
		var sType = typeof source, i = 1, options;
		if( sType === 'undefined' || sType === 'boolean' ) {
			deep = sType === 'boolean' ? source : false;
			source = target;
			target = this;
			}
			if( typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]' )
				source = {};
				while(i <= 2) {
					options = i === 1 ? target : source;
					if( options != null ) {
						for( var name in options ) {
						var src = target[name], copy = options[name];
						if(target === copy){ continue; }
						if(deep && copy && typeof copy === 'object' && !copy.nodeType){
						target[name] = this.extend(src ||(copy.length != null ? [] : {}), copy, deep);}
						else if(copy !== undefined)
						target[name] = copy;
					}
			}
			i++;
		}
		return target; 
	}
}
