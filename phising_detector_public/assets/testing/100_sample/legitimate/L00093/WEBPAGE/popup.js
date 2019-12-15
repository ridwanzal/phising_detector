if(!Array.prototype.push){Array.prototype.push=function (){var startLength=this.length;for(var i=0;i<arguments.length;i++)this[startLength+i]=arguments[i];return this.length;}};
function G(){var elements=new Array();for(var i=0;i<arguments.length;i++){var element=arguments[i];if(typeof element=='string')element=document.getElementById(element);if(arguments.length==1)return element;elements.push(element);};return elements;};
Function.prototype.bindAsEventListener=function (object){var __method=this;return function (event){__method.call(object,event||window.event);};};
Object.extend_p=function (destination,source){for(property in source){destination[property]=source[property];};return destination;};
if(!window.Event){var Event=new Object();};Object.extend_p(Event,{observers:false,element:function (event){return event.target||event.srcElement;},isLeftClick:function (event){return (((event.which)&&(event.which==1))||((event.button)&&(event.button==1)));},pointerX:function (event){return event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));},pointerY:function (event){return event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop));},stop:function (event){if(event.preventDefault){event.preventDefault();event.stopPropagation();}else {event.returnValue=false;event.cancelBubble=true;};},findElement:function (event,tagName){var element=Event.element(event);while(element.parentNode&&(!element.tagName||(element.tagName.toUpperCase()!=tagName.toUpperCase())))element=element.parentNode;return element;},_observeAndCache:function (element,name,observer,useCapture){if(!this.observers)this.observers=[];if(element.addEventListener){this.observers.push([element,name,observer,useCapture]);element.addEventListener(name,observer,useCapture);}else if(element.attachEvent){this.observers.push([element,name,observer,useCapture]);element.attachEvent('on'+name,observer);};},unloadCache:function (){if(!Event.observers)return ;for(var i=0;i<Event.observers.length;i++){Event.stopObserving.apply(this,Event.observers[i]);Event.observers[i][0]=null;};Event.observers=false;},observe:function (element,name,observer,useCapture){var element=G(element);useCapture=useCapture||false;if(name=='keypress'&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.attachEvent))name='keydown';this._observeAndCache(element,name,observer,useCapture);},stopObserving:function (element,name,observer,useCapture){var element=G(element);useCapture=useCapture||false;if(name=='keypress'&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.detachEvent))name='keydown';if(element.removeEventListener){element.removeEventListener(name,observer,useCapture);}else if(element.detachEvent){element.detachEvent('on'+name,observer);};}});Event.observe(window,'unload',Event.unloadCache,false);
var Class_Pop=function (){var _class=function (){this.initialize.apply(this,arguments);};for(i=0;i<arguments.length;i++){superClass=arguments[i];for(member in superClass.prototype){_class.prototype[member]=superClass.prototype[member];};};_class.child=function (){return new Class(this);};_class.extend_p=function (f){for(property in f){_class.prototype[property]=f[property];};};return _class;};
function space(flag){if(flag=="begin"){var ele=document.getElementById("ft");if(typeof(ele)!="undefined"&&ele!=null)ele.id="ft_popup";ele=document.getElementById("usrbar");if(typeof(ele)!="undefined"&&ele!=null)ele.id="usrbar_popup";}else if(flag=="end"){var ele=document.getElementById("ft_popup");if(typeof(ele)!="undefined"&&ele!=null)ele.id="ft";ele=document.getElementById("usrbar_popup");if(typeof(ele)!="undefined"&&ele!=null)ele.id="usrbar";};};
var Popup=new Class_Pop();
Popup.prototype={
	iframeIdName:'ifr_popup',
	initialize:function (config){
		this.config=Object.extend_p({contentType:1,isHaveTitle:true,scrollType:'no',isBackgroundCanClick:false,isSupportDraging:true,isShowShadow:true,isReloadOnClose:true,width:400,height:300,boxstyle:'blue'},config||{});
		this.info={shadowWidth:4,title:"",contentUrl:"",contentHtml:"",callBack:null,parameter:null,confirmCon:"",alertCon:"",someHiddenTag:"select,object,video",someHiddenEle:"",overlay:0,coverOpacity:60,framename:'ifr_popup'};
		this.color={cColor:"#000000",bColor:"#FFFFFF",tColor:"#709CD2",wColor:"#FFFFFF"};
		this.winform = null;
		this.winbox = null;
		this.overlay = null;
		this.dropClass = null;
		this.someToHidden=[];
		if(!this.config.isHaveTitle)this.config.isSupportDraging=false;
		this.iniBuild();
	},
	setContent:function (arrt,val){
		if(val!=''){
			switch(arrt){
				case 'width':this.config.width=val; break;
				case 'height':this.config.height=val;break;
				case 'title':this.info.title=val;break;
				case 'contentUrl':this.info.contentUrl=val;break;
				case 'contentHtml':this.info.contentHtml=val;break;
				case 'callBack':this.info.callBack=val;break;
				case 'parameter':this.info.parameter=val;break;
				case 'confirmCon':this.info.confirmCon=val;break;
				case 'alertCon':this.info.alertCon=val;break;
				case 'someHiddenTag':this.info.someHiddenTag=val;break;
				case 'someHiddenEle':this.info.someHiddenEle=val;break;
				case 'overlay':this.info.overlay=val;break;
				case 'framename':this.info.framename=val;break;
				case 'boxstyle':this.config.boxstyle=val;break;
			};
		};
	},
	setContents:function(options){
	   if(null == options || {} == options) return;
	   for(var key in options) this.setContent(key, options[key]);
	},
	iniBuild:function (){
		this.winform = document.createElement('div');
		document.body.appendChild(this.winform);
	},
	build:function (){	
		var pos = this.getPos();
		var barheight = this.config.boxstyle=='gray' ? 31 : 40;
		this.config.height += this.config.boxstyle=='gray' ? 0 : 18;
		var poshandley = barheight/2;
		var bordercolor = this.config.boxstyle=='gray' ? '#c6c6c6' : '#9dccf6';
		var formstyle = 'z-index:10000;position:absolute;top:0;left:0;width:100%;height:100%;';
		var winstyle = 'z-index:2;position:absolute;top:'+pos.y+'px;left:'+pos.x+'px;width:'+this.config.width+'px;height:'+this.config.height+'px;'
		var boxstyle = 'z-index:2;position:absolute;top:0;left:0;width:'+this.config.width+'px;height:'+this.config.height+'px;background:#fff;border:1px solid '+bordercolor+';';
		var barstyle = this.config.boxstyle=='gray' ?
					'position:relative;height:20ppx;padding:5px 10px;overflow:hidden;border-bottom:1px solid #c6c6c6;background:#e6e6e6 url(http://static.youku.com/index/img/master.png) repeat-x 0 -1568px;':
					'position:relative;height:20px;padding:10px;overflow:hidden;'
		var handlestyle = 'cursor:pointer;position:absolute;right:10px;top:'+poshandley+'px;margin-top:-9px;width:18px;height:18px;overflow:hidden;background:url(http://static.youku.com/index/img/master.png) no-repeat -192px -172px;';
		var shadowstyle = 'z-index:1;position:absolute;top:6px;left:6px;width:'+this.config.width+'px;height:'+this.config.height+'px;background:#c3c3c3;'
		if(this.info.title == undefined || this.info.title==null){this.info.title="";}
		this.winform.style.cssText = formstyle;
		this.winbox = document.createElement('div');
		this.winbox.style.cssText = winstyle;
		// overlay
		this.overlay = document.createElement('div');
		var opacity='filter:alpha(opacity='+this.info.coverOpacity+');opacity:'+this.info.coverOpacity/100+';';
		this.overlay.style.cssText = 'position:fixed;_position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:1;'+opacity+'background-color:'+this.color.cColor+';';
		this.overlay.style.height=document.body.scrollHeight + 'px';
		// winhandle
		this.winhandle = document.createElement('div');
		this.winhandle.style.cssText = handlestyle;
		this.titlebar = document.createElement('div');
		this.titlebar.style.cssText = barstyle;
		this.titlebar.innerHTML = '<h3>'+this.info.title+'</h3>';
		// box
		this.conbox = document.createElement('div');
		this.conbox.style.cssText = boxstyle;
		// shadow
		this.winshadow = document.createElement('div');
		this.winshadow.style.cssText = shadowstyle;
		// iframe
		this.winframe = document.createElement('iframe');
		this.winframe.scrolling = 'no';
		this.winframe.frameBorder = '0';
		this.winframe.src = this.info.contentUrl;
		this.winframe.name = this.info.framename;
		this.winframe.style.cssText = 'width:100%;height:'+(this.config.height-barheight)+'px'; 
		//
		this.titlebar.appendChild(this.winhandle);
		this.conbox.appendChild(this.titlebar);
		this.conbox.appendChild(this.winframe);
		this.winbox.appendChild(this.conbox);
		this.winbox.appendChild(this.winshadow);
		this.winform.appendChild(this.overlay);
		this.winform.appendChild(this.winbox);
		var _this = this;
		Event.observe(this.winhandle,"click",this.reset.bindAsEventListener(this),false);
		Event.observe(window,'resize',function(){ _this.posx(); _this.resizeOverlay(); }, false);
		//Event.observe(document,"keypress",this.keydown.bindAsEventListener(this),false);
		return this;
	},
	keydown:function(event){
		if(event.keyCode==27){this.close();}
	},
	forCallback:function (){return this.info.callBack(this.info.parameter);},
	resizeOverlay: function(){
		var range = this.getScrollRange();
		this.overlay.style.width = range.width + 'px';
	},
	getScrollRange: function(){
		var w = 0, h = 0;
		w = document.documentElement.scrollWidth || document.body.scrollWidth;
		h = document.documentElement.scrollHeight || document.body.scrollHeight;
		return {'width': w, 'height': h};
	},
	getClientRange: function(){
		var w = 0, h = 0;		
		w = document.documentElement.clientWidth || document.body.clientWidth;
		h = document.documentElement.clientHeight || document.body.clientHeight;
		return {'width': w, 'height': h};
	},
	posx:function (){
		var pos = this.getPos();
		this.winbox.style.left = pos.x + 'px'
	},
	posxy:function (){
		var pos = this.getPos();
		this.winbox.style.left = pos.x + 'px';
		this.winbox.style.top = pos.y + 'px';
	},
	getPos:function (){
		var x = 0, y = 0;
		var range = this.getClientRange();
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		x = (range.width -this.config.width)/2 + scrollLeft;
		y = (range.height-this.config.height)/2 + scrollTop;
		if(y < 15){ y=15; }
		if(x < 15){ x=15; }
		return {'x': x, 'y': y};
	},
	reset:function (){
		if(this.config.isReloadOnClose){top.location.reload();};
		this.close();
	},
	show:function (){
		this.hiddenSome();
		this.winform.style.display='block';
		this.posxy();
	},
	close:function (){
		//this.winform.style.display='none';
		if (this.winform) {
			this.winform.style.display = 'none';
			var iframe = this.winform.getElementsByTagName('iframe')[0];
			iframe.parentNode.removeChild(iframe);
			this.winform.parentNode.removeChild(this.winform);
			this.winform = null;
		}
		this.showSome();
	},
	hiddenSome:function (){
		var tag=this.info.someHiddenTag.split(",");
		if(tag.length==1&&tag[0]=="")tag.length=0;
		for(var i=0;i<tag.length;i++){this.hiddenTag(tag[i]);};
		var ids=this.info.someHiddenEle.split(",");
		if(ids.length==1&&ids[0]=="")ids.length=0;
		for(var i=0;i<ids.length;i++){this.hiddenEle(ids[i]);};
		space("begin");
	},
	hiddenTag:function (tagName){
		var ele=document.getElementsByTagName(tagName);
		if(ele!=null){
			for(var i=0;i<ele.length;i++){
				if(ele[i].style.display!="none"&&ele[i].style.visibility!='hidden'){
					ele[i].style.visibility='hidden';
					if(ele[i].tagName.toUpperCase()=="VIDEO"){
						ele[i].style.display='none';
						ele[i].pause();
					};
					this.someToHidden.push(ele[i]);
				};
			};
		};
	},
	hiddenEle:function (id){
		var ele=document.getElementById(id);
		if(typeof(ele)!="undefined"&&ele!=null){
			ele.style.visibility='hidden';
			if(ele.tagName.toUpperCase()=="VIDEO"){
				ele.style.display='none';
				ele.pause();
			};
			this.someToHidden.push(ele);
		}
	},
	showSome:function (){
		for(var i=0;i<this.someToHidden.length;i++){
			this.someToHidden[i].style.visibility='visible';
			if(this.someToHidden[i].tagName.toUpperCase()=="VIDEO"){
				this.someToHidden[i].style.display='block';
				this.someToHidden[i].play();
			};
		};
		space("end");
	}
};

