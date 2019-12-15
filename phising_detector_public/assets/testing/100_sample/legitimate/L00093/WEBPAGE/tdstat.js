/**
 * 土豆CK统计
 * @mail: zhoubaochuan@youku.com
 * @date: 2012-11-22
 */
(function(){
	var TAG_ABBR = {
			// 缩写常用标签
			"UL": 1, "OL": 2, "LI": 3, "INPUT": 4, "DIV": 5, "BODY": 6, "STRONG": 7, "SPAN": 8, "FORM": 9, "BUTTON": 10, "CAPTION": 11,
			"FIELDSET": 12, "COLGROUP": 13, "TFOOT": 14, "LABEL": 15, "LEGEND": 16, "THEAD": 17, "OPTGROUP": 18, "OPTION": 19, "SELECT": 20, "TABLE": 21, "TBODY": 22,
			// 过滤非布局标签和闭合标签（不会出现在父节点里，也不会记录点击）
			"IFRAME": 0, "SCRIPT": 0, "OBJECT": 0, "EMBED": 0, "IMG": 0
        },
		TUDO = function() {
			return TUDO.prototype.init();
		};   
    TUDO.prototype = {
        // 扩展原型对象
        TUDO: "1.0.0",
		init: function() {
			return this;
		},
		juid: function(){
            return ( +new Date()*10000 + Math.random(1)*10000 ).toString(32);
        },
		getRequest: function(url){
			var img = new Image();
			//阻止IE下的自动垃圾回收引起的请求未发出状况
			img.onload = function(){};
			img.src = url;
		}
    }   
	TUDO.prototype.init.prototype = TUDO.prototype;

	TUDO.request = function(url) {
		var img = new Image();
		//阻止IE下的自动垃圾回收引起的请求未发出状况
		img.onload = function(){};
		img.src = url;
	}

	TUDO.event = {
		add: function(elem, type, handler){
			 var events, eventHandle;
		
			 // 不附加事件到没有数据或文本节点
			 if(elem.nodeType === 3 || elem.nodeType === 8 || !type || !handler){
				return;
			 }

			 if( elem.addEventListener ){
				elem.addEventListener( type, handler, false);
			 } else if ( elem.attachEvent ) {
				elem.attachEvent( "on" + type, handler);
			 }

	    }
	}

	TUDO.link = {
		equalUrl: function(urlA, urlB){
			return urlA.replace(/\/?#.*|\/$/, '') === urlB.replace(/\/?#.*|\/$/, '');
	    },
		getTrueLink: function(p){
			var link = p.getAttribute('href');
			if (!link) {
					return '';
			}
			if (/^(javascript:|#)/i.test(link)) {
					return '';
			}
			var url = location.href;
			var domain = url.replace(/(https?:\/\/[^\/]+).*/, "$1");
			var path = domain === url ? domain + '/'
													: url.replace(/[#?].*/, "").replace(/[^\/]*$/, "");
			return link.replace(/^\.[\.\/]+/g, function(s){
					var n = (s.match(/\.\.\//g) || []).length;
					for (var i = 0; i < n; i++)
							path = path.replace(/[^\/]+\/$/, '');
					return path;
			}).replace(/&amp;/g, "&")
					.replace(/^\//, domain + "\/")
					.replace(/^[^\h\/]/, path + "$&");
	    },
		getPositionCode: function( element ) {
			var paths = [];

			if(element.id)
			    return '#' + element.id;

			for (; element; element = element.parentNode)
			{
			    var tagName = element.nodeName.toUpperCase();
			    if(tagName == 'BODY') break;
				if(element.id && element.getAttribute('cs') != 'i'){
					paths.splice(0, 0, '#' + element.id);
					return paths.join('~');
			    }
			    var index = 0;
			    for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
			    {
			   	 var sTagName = sibling.nodeName.toUpperCase();
			   	 // Ignore document type declaration.
			   	 if (TAG_ABBR[sTagName] === 0)
			   		 continue;
			   	 if (sTagName == tagName)
			   		 ++index;
			    }
			    tagName = TAG_ABBR[tagName] || tagName;
			    var pathIndex = (index ? "!" + (index+1) : "");
			    paths.splice(0, 0, tagName + pathIndex);
			}

			return paths.length ? paths.join("~") : null;
		}	
	}

	TUDO.cookie = function(win, n, v, op){
		if(typeof win == "string") {
			op = v;
			v = n;
			n = win;
			win = window;
		}
		if(v !== undefined) {
			op = op || {};
			var date, expires = "";
			if(op.expires) {
				if(op.expires.constructor == Date) {
					date = op.expires;
				} else {
					date = new Date();
					date.setTime(date.getTime() + (op.expires * 24 * 60 * 60 * 1000));
				}
				expires = '; expires=' + date.toGMTString();
			}
			var path = op.path ? '; path=' + op.path : '';
			var domain = op.domain ? '; domain=' + op.domain : '';
			var secure = op.secure ? '; secure' : '';
			win.document.cookie = [n, '=', encodeURIComponent(v), expires, path, domain, secure].join('');
		} else {
			v = win.document.cookie.match( new RegExp( "(?:\\s|^)" + n + "\\=([^;]*)") );
			return v ? decodeURIComponent(v[1]) : null;
		}
	};

    window.TUDO = TUDO;
})();

//var tudou_pvid = TUDO().juid();
var tudou_juidStr = 1, tudou_seid;
TUDO['init'] = function() {
	tudou_juidStr = (typeof(MiniHeader) != 'undefined' && MiniHeader.islogin()) ? MiniHeader.userid : 1,
	tudou_seid = TUDO().juid();
}



TUDO[ 'clickStat' ] = {
	winWidth : window.document.documentElement[ "clientWidth" ],
	winHeight : window.document.documentElement[ "clientHeight" ],
	getDocWidth : function( ) {
		var elem = document, 
			doc = elem.documentElement,
			name = 'Width';
		return Math.max(
                        elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                        elem.body[ "offset" + name ], doc[ "offset" + name ],
                        doc[ "client" + name ]
                    );   

	},
	getStatTarget : function(p){
		var check = {'A': 1, 'INPUT': 1, 'BUTTON': 1};
		
		if (p.getAttribute && p.getAttribute('data-stat-role') == 'ck') {	
				return p;
		} else {
			var parent = p.parentNode;
			if (parent && parent.getAttribute && parent.getAttribute('data-stat-role') == 'ck') {
				return parent;
			}
		}
		
		if (!check[p.nodeName]) { // 只记录链接和按钮的点击
			p = p.parentNode || {}; // 链接里可能有子元素，比如img
			if (!check[p.nodeName])
				return false;
		}
		return p;
	},
	send: function( event , target) {
		var d, p, body,
			isButton = false, 
			win = window,
			self = this,
			targetUrl;
		if( !event.target ) {
			event.target = event.srcElement || document;
		}
		if( event.pageX == null && event.clientX != null){
			var d = document.documentElement;
			var body = document.body;
			event.pageX = self.clientX + (d && d.scrollLeft || body && body.scrollLeft || 0) - (d && d.clientLeft || body && body.clientLeft || 0);
			event.pageY = self.clientY + (d && d.scrollTop  || body && body.scrollTop  || 0) - (d && d.clientTop  || body && body.clientTop  || 0);
		}

		// 通过JS触发事件时，不应该发送CK统计
		if (typeof event.pageX == 'undefined') {
			return;
		}

		p = self.getStatTarget(target || event.target);
		if( !p ) return;

		targetUrl = TUDO.link.getTrueLink(p);
		if (p.nodeName !== 'A' || targetUrl === '' || TUDO.link.equalUrl(targetUrl, location.href)) {
			isButton = true;
		}
		
		this.request({
			eventId : isButton ? 2 : 1,
			//pvid : tudou_pvid,
			targetUrl : isButton ? '' : targetUrl,
			pageX : event.pageX,
			pageY : event.pageY,
			scrollLeft : ('pageXOffset' in win) ? win[ 'pageXOffset' ] : win.document.documentElement[ 'scrollLeft' ], 
			scrollTop : ('pageYOffset' in win) ? win[ 'pageYOffset' ] : win.document.documentElement[ 'scrollTop' ], 
			positionCode : TUDO.link.getPositionCode( p )
		});
	},
	request: function(data){
		var eventId = 'eid=' + data.eventId,
			pvid = 'pid=' + (window.logPvid || 0),
			channelId = 'cid=' + ((typeof(cateStr) != 'undefined') ? cateStr : ''),
			//userId = (typeof(MiniHeader) != 'undefined' && MiniHeader.islogin()) ? MiniHeader.userid : 0,
			//juid = tudou_juidStr,
			sessionId = 'sid=' + tudou_seid,
			screenW = 'sw=' + screen.width,
			screenH = 'sh=' + screen.height,
			browserW = 'bw=' + this.winWidth,
			browserH = 'bh=' + this.winHeight,
			browserPX = 'bx=' + (data.pageX - data.scrollLeft - Math.round(this.winWidth / 2)),
			browserPY = 'by=' + (data.pageY - data.scrollTop),
			pagePX = 'px=' + (data.pageX - Math.round(this.getDocWidth()/ 2)),
			pagePY = 'py=' + data.pageY,
			positionCode = 'pc=' + encodeURIComponent(data.positionCode || '')
			referUrl = 'rurl=' + encodeURIComponent(document.referrer || ''),
			targetUrl = 'turl=' + encodeURIComponent(data.targetUrl || ''),
			appData = 'ext=' + encodeURIComponent(window.logExt),
		 	paramStr = [ eventId, pvid, channelId, sessionId, screenW, screenH, browserW, browserH, 
					browserPX, browserPY, pagePX, pagePY, positionCode, referUrl, targetUrl,appData];
			TUDO.request('http://p.l.youku.com/ykclickjm?' + paramStr.join('&'));


	}
}


TUDO.init();
if("onmousedown" in window){
	TUDO.event.add( document, 'mousedown', function(e){TUDO.clickStat.send(e);});
}else{
	TUDO.event.add( document, 'click', function(e){TUDO.clickStat.send(e);});
}

window.clickStat = {
	getStatTarget: function (p) {//指向getStatTarget方法
					   return TUDO.clickStat.getStatTarget(p);
				   },
	getPCode: function (p) {//指向getPositionCode方法
				  return TUDO.link.getPositionCode(p);
			  }

};
