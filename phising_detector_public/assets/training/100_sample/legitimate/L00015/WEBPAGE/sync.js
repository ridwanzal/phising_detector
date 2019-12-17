/* 475,14,98 2013-08-19 10:49:10 */

/* 由【saletop.js】【leju.js】合并 */

/* saletop.js */
/* sinaFlash begin */
/* http://i3.sinaimg.cn/home/sinaflash.js */
if(typeof(sina)!="object"){var sina={}}sina.$=function(i){if(!i){return null}return document.getElementById(i)};var sinaFlash=function(V,x,X,Z,v,z,i,c,I,l,o){var w=this;if(!document.createElement||!document.getElementById){return}w.id=x?x:'';var O=function(I,i){for(var l=0;l<I.length;l++){if(I[l]==i){return l}}return-1},C='8.0.42.0';if(O(['eladies.sina.com.cn','ent.sina.com.cn'],document.domain)>-1){w.ver=C}else{w.ver=v?v:C}w.ver=w.ver.replace(/\./g,',');w.__classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";w.__codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+w.ver;w.width=X;w.height=Z;w.movie=V;w.src=w.movie;w.bgcolor=z?z:'';w.quality=c?c:"high";w.__pluginspage="http://www.macromedia.com/go/getflashplayer";w.__type="application/x-shockwave-flash";w.useExpressInstall=(typeof(i)=="boolean")?i:false;w.xir=I?I:window.location;w.redirectUrl=l?l:window.location;w.detectKey=(typeof(o)=="boolean")?o:true;w.escapeIs=false;w.__objAttrs={};w.__params={};w.__embedAttrs={};w.__flashVars=[];w.__flashVarsStr="";w.__forSetAttribute("id",w.id);w.__objAttrs["classid"]=w.__classid;w.__forSetAttribute("codebase",w.__codebase);w.__forSetAttribute("width",w.width);w.__forSetAttribute("height",w.height);w.__forSetAttribute("movie",w.movie);w.__forSetAttribute("quality",w.quality);w.__forSetAttribute("pluginspage",w.__pluginspage);w.__forSetAttribute("type",w.__type);w.__forSetAttribute("bgcolor",w.bgcolor)};sinaFlash.prototype={getFlashHtml:function(){var I=this,i='<object ';for(var l in I.__objAttrs){i+=l+'="'+I.__objAttrs[l]+'"'+' '};i+='>\n';for(var l in I.__params){i+='	<param name="'+l+'" value="'+I.__params[l]+'" \/>\n'};if(I.__flashVarsStr!=""){i+='	<param name="flashvars" value="'+I.__flashVarsStr+'" \/>\n'};i+='	<embed ';for(var l in I.__embedAttrs){i+=l+'="'+I.__embedAttrs[l]+'"'+' '};i+='><\/embed>\n<\/object>';return i},__forSetAttribute:function(I,i){var l=this;if(typeof(I)=="undefined"||I==''||typeof(i)=="undefined"||i==''){return};I=I.toLowerCase();switch(I){case "classid":break;case "pluginspage":l.__embedAttrs[I]=i;break;case "onafterupdate":case "onbeforeupdate":case "onblur":case "oncellchange":case "onclick":case "ondblClick":case "ondrag":case "ondragend":case "ondragenter":case "ondragleave":case "ondragover":case "ondrop":case "onfinish":case "onfocus":case "onhelp":case "onmousedown":case "onmouseup":case "onmouseover":case "onmousemove":case "onmouseout":case "onkeypress":case "onkeydown":case "onkeyup":case "onload":case "onlosecapture":case "onpropertychange":case "onreadystatechange":case "onrowsdelete":case "onrowenter":case "onrowexit":case "onrowsinserted":case "onstart":case "onscroll":case "onbeforeeditfocus":case "onactivate":case "onbeforedeactivate":case "ondeactivate":case "codebase":l.__objAttrs[I]=i;break;case "src":case "movie":l.__embedAttrs["src"]=i;l.__params["movie"]=i;break;case "width":case "height":case "align":case "vspace":case "hspace":case "title":case "class":case "name":case "id":case "accesskey":case "tabindex":case "type":l.__objAttrs[I]=l.__embedAttrs[I]=i;break;default:l.__params[I]=l.__embedAttrs[I]=i}},__forGetAttribute:function(i){var I=this;i=i.toLowerCase();if(typeof I.__objAttrs[i]!="undefined"){return I.__objAttrs[i]}else if(typeof I.__params[i]!="undefined"){return I.__params[i]}else if(typeof I.__embedAttrs[i]!="undefined"){return I.__embedAttrs[i]}else{return null}},setAttribute:function(I,i){this.__forSetAttribute(I,i)},getAttribute:function(i){return this.__forGetAttribute(i)},addVariable:function(I,i){var l=this;if(l.escapeIs){I=escape(I);i=escape(i)};if(l.__flashVarsStr==""){l.__flashVarsStr=I+"="+i}else{l.__flashVarsStr+="&"+I+"="+i};l.__embedAttrs["FlashVars"]=l.__flashVarsStr},getVariable:function(I){var o=this,i=o.__flashVarsStr;if(o.escapeIs){I=escape(I)};var l=new RegExp(I+"=([^\\&]*)(\\&?)","i").exec(i);if(o.escapeIs){return unescape(RegExp.$1)};return RegExp.$1},addParam:function(I,i){this.__forSetAttribute(I,i)},getParam:function(i){return this.__forGetAttribute(i)},write:function(i){var I=this;if(typeof i=="string"){document.getElementById(i).innerHTML=I.getFlashHtml()}else if(typeof i=="object"){i.innerHTML=I.getFlashHtml()}}};
/* sinaFlash end */

/******** Sales dept. begin ********/
function SinaDotAdJs(){
//-------------------------------

var pthis = this;
//浏览器判断
this.isIE=navigator.userAgent.indexOf("MSIE")==-1?false:true;
this.isOPER=navigator.userAgent.indexOf("Opera")==-1?false:true;
this.version=navigator.appVersion.split(";"); 
this.isIE6= !window.XMLHttpRequest;
this.isXHTML = document.compatMode=="CSS1Compat"?true:false;

//获取body
this.bdy = (document.documentElement && document.documentElement.clientWidth)?document.documentElement:document.body;

//获取对象
this.$ = function(id){if(document.getElementById){return eval('document.getElementById("'+id+'")')}else{return eval('document.all.'+id)}};

//获取cookie
this.getAdCookie = function(N){
	var c=document.cookie.split("; ");
	for(var i=0;i<c.length;i++){var d=c[i].split("=");if(d[0]==N)return unescape(d[1]);}
	return "";
};

//设置cookie
this.setAdCookie = function(N,V,Q,D){
	var L=new Date();
	var z=new Date(L.getTime()+Q*60000);
    var tmpdomain = "";
	if(typeof(D)!="undefined"){if(D){tmpdomain="domain=sina.com.cn;";}}
	document.cookie=N+"="+escape(V)+";path=/;"+tmpdomain+"expires="+z.toGMTString()+";";
};

//日期判断函数
this.compareDate = function(type,d){
  try{
        var dateArr = d.split("-");
        var checkDate = new Date();
        checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
		var now = new Date();
        var nowTime = now.getTime();
		var checkTime = checkDate.getTime();
		if(type=="after"){          
		  if(nowTime >= checkTime){return true;}
		  else{return false;}
		}		
        else if(type=="before"){
          if(nowTime <= checkTime){return true;}
		  else{return false;}
		}
  }catch(e){return false;}
}

//获取时间对象
this.strToDateFormat = function(str,ext){
	var arys = new Array();
	arys = str.split('-');
	var newDate = new Date(arys[0],arys[1]-1,arys[2],arys[3],0,0);
	if(ext){newDate = new Date(newDate.getTime()+1000*60*60*24);}
	return newDate;
 }

//时间区间检查
this.checkTime = function(begin,end){
  var td = new Date();
  var flag = (td>=pthis.strToDateFormat(begin,false) && td<pthis.strToDateFormat(end,begin==end?true:false))?true:false;
  return flag;
}

//外部事件加载
this.addEvent = function(obj,event,func){
  var MSIE=navigator.userAgent.indexOf("MSIE");
  var OPER=navigator.userAgent.indexOf("Opera");
  if(document.all && MSIE!=-1 && OPER==-1){
    obj.attachEvent("on"+event,func);
  }else{
    obj.addEventListener(event,func,false);
  }
};

//PNG透明函数
this.correctPNG = function(){ 
    var arVersion = navigator.appVersion.split("MSIE");
    var vs = parseFloat(arVersion[1]);
    if ((vs >= 5.5) && (document.body.filters)){ 
       for(var j=0; j<document.images.length; j++){ 
          var img = document.images[j];
          var imgName = img.src.toUpperCase(); 
          if (imgName.substring(imgName.length-3, imgName.length) == "PNG"){ 
             var imgID = (img.id) ? "id='" + img.id + "' " : "";
             var imgClass = (img.className) ? "class='" + img.className + "' " : "";
             var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
             var imgStyle = "display:inline-block;" + img.style.cssText;
             if (img.align == "left"){imgStyle = "float:left;" + imgStyle}
             if (img.align == "right"){imgStyle = "float:right;" + imgStyle}
             if (img.parentElement.href){imgStyle = "cursor:hand;" + imgStyle}
             var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
             img.outerHTML = strNewHTML;
             j = j-1;
          } 
       } 
    }     
};

//容器对象
this.initWrap = function(mod,id,v,w,h,po,l,r,t,b,z,m,p,bg,dsp){
  var lst='';
  if(mod == 0x01){lst += 'pthis.'+v+' = document.createElement("'+id+'");';}
  else if(mod == 0x02){lst += 'pthis.'+v+' = document.getElementById("'+id+'");';}
  else return;
  if(v!="" && mod == 0x01){lst+=v+'.id = "'+v+'";';}
  if(w!=""){lst+=v+'.style.width = '+w+' + "px";';}
  if(h!=""){lst+=v+'.style.height = '+h+' + "px";';}
  if(po!=""){
	  lst+=v+'.style.position = "'+po+'";';

      if(l!=""){lst+=v+'.style.left = '+l+' + "px";';}
      else if(l=="" && r!=""){lst+=v+'.style.right = '+r+' + "px";';}
	  if(t!=""){lst+=v+'.style.top = '+t+' + "px";';}
      else if(t=="" && b!=""){lst+=v+'.style.bottom = '+b+' + "px";';}
	  if(z!=""){lst+=v+'.style.zIndex = "'+z+'";';}
  }
  if(bg!=""){lst+=v+'.style.background = "'+bg+'";';}
  if(m!=""){lst+=v+'.style.margin = "'+m+'";';}
  if(p!=""){lst+=v+'.style.padding = "'+p+'";';}
  if(dsp!=""){lst+=v+'.style.display = "'+dsp+'";';}
  return lst;
};

//素材对象
this.initObj = function(id,s,u,w,h){
  var lst = s.substring(s.length-3).toLowerCase();
  switch(lst){
	 case "tml":
	 case "htm":
	 case "php":var to = document.createElement("iframe");
                     to.id=id;
	                 to.width=w;
	                 to.height=h;
                     to.src=s;
                     to.frameBorder = 0;
					 to.setAttribute('allowtransparency',true);
                     to.scrolling = "no";
                     to.marginheight = 0;
                     to.marginwidth = 0;
					 break;
	 case "swf": var to = document.createElement("div");
					 var fo = new sinaFlash( s, id, w, h, "7", "", false, "High");
	                 fo.addParam("wmode", "transparent");
	                 fo.addParam("allowScriptAccess", "always");
	                 fo.addParam("menu", "false");
	                 fo.write(to);
				     break;
     case "jpg":
     case "gif":
	 case "png":if(u!=""){
		             var to = document.createElement("a");
					 to.href = u;
					 to.target = "_blank";
					 var io = new Image();
	                 io.id = id;
					 io.style.width = w+"px";
					 io.style.height = h+"px";
					 io.style.border = "none";
					 io.src = s;
					 to.appendChild(io);
				}else{
				     var to = new Image();
	                 to.id = id;
					 to.style.width = w+"px";
					 to.style.height = h+"px";
					 to.style.border = "none";
					 to.style.cursor = "pointer";
					 to.src = s;	 
				}
				     break;
	     default:var to = document.createElement("a");
		             to.id = id;
					 to.href = u;
					 to.target = "_blank";
                     to.innerText = s;
  }
  return to;
};

//-------------------------------
};
/* http://d2.sina.com.cn/d1images/common/SinaDotTop.js begin */

/*
RotatorAD V3.9.4 2013-07-30
Author: Dakular <shuhu at staff.sina.com.cn>
Editor: zhouyi <zhouyi3 at staff.sina.com.cn>
        lingchen <lingchen at staff.sina.com.cn>
格式: new RotatorAD(商业广告数组, 非商业广告数组, 层id)
说明: 第一次访问随机出现，以后访问顺序轮播；自动过滤过期广告；cookie时间24小时；商业广告数量不足时，从非商业广告中补充
      限制最少轮播数量，广告少于限制数时，才从垫底里补充，否则不补垫底
*/
if (typeof (RotatorAD) != 'function') {
    var RotatorAD = function (rad, nad, div_id) {

        var date = new Date();
        var id = 0;
        var max = 99;
        var url = document.location.href;
		var curId;

        /*2012-10-26 coding about cookiename begin*/
        //var cookiename = 'SinaRot'+escape(url.substr(url.indexOf('/',7),2)+url.substring(url.lastIndexOf('/')));
        var urlStr = url.substring(7);
        var urlArr = []
        if (urlStr.indexOf('?') != -1) {
            urlStr = urlStr.substring(0, urlStr.indexOf('?'));
            urlArr = urlStr.split('/');
        } else {
            urlArr = urlStr.split('/');
        }
        var cookiename = null;
        var urlArrLen = urlArr.length;
        var nameStr1 = urlArr[0].substring(0, urlArr[0].indexOf('.'));
        var nameStr2 = '';
        var nameStr3 = '';
        if (urlArrLen > 1) {
            nameStr2 = '/' + urlStr.substring(urlStr.indexOf('/') + 1, urlStr.lastIndexOf('/'));
            if (urlStr.substring(urlStr.lastIndexOf('/')).indexOf('.') != -1) {
                nameStr3 = '/zw';
            } else {
                nameStr3 = '/' + urlStr.substring(urlStr.lastIndexOf('/') + 1)
            }
        }
        cookiename = String('SinaRot/' + nameStr1 + nameStr2 + nameStr3).replace(/\//g,"_"); /*2012-10-26 coding about cookiename end*/
        var timeout = 1440; //24h
        var w = rad.width;
        var h = rad.height;
        var bnum = rad.num;
        var num = rad.num;
        var num2 = rad.num2;
        var marginType = (typeof (rad.mtype) == "undefined") ? 0 : rad.mtype;
        var ary = new Array();
        //过滤无效商广
        for (var i = 0; i < rad.length; i++) {
            var start = strToDate(rad[i][2].replace('<startdate>', '').replace('</startdate>', ''));
            var end = strToDate(rad[i][3].replace('<enddate>', '').replace('</enddate>', ''), true);
            //增加移动设备过滤 coding by lingchen
            var ua = navigator.userAgent.toLowerCase();
            var IOS = /\((iPhone|iPad|iPod)/i.test(ua);
            var ary_type = rad[i][0].substring(rad[i][0].length - 3).toLowerCase();
            if (date > start && date < end) {
                if (IOS) {
                    if (ary_type != 'swf') {
                        ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5] ? rad[i][5] : '0', rad[i][6] ? rad[i][6] : '']);
                    }
                } else {
                    ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5] ? rad[i][5] : '0', rad[i][6] ? rad[i][6] : '']);
                }
            }
        }

        //标记商广为空 acelan
        var nullRad = ary.length - 1;

        //过滤无效垫底
        var vnad = new Array();
        for (var i = 0; i < nad.length; i++) {
            if (nad[i][2] == null || nad[i][2] == '') {
                vnad.push([nad[i][0], nad[i][1], '', '0', nad[i][6]]);
            } else {
                var start = strToDate(nad[i][2].replace('<startdate>', '').replace('</startdate>', ''));
                var end = strToDate(nad[i][3].replace('<enddate>', '').replace('</enddate>', ''), true);
                if (date > start && date < end) {
                    vnad.push([nad[i][0], nad[i][1], '', '0', nad[i][6]]);
                }
            }
        }
        //补位
        var nn = 0;
        if (vnad.length > 0 && (num2 == null || ary.length < num2)) {
            for (var i = 0; i < (num2 == null ? rad.num : num2); i++) {
                if (i > ary.length - 1) {
                    ary.push([vnad[nn][0], vnad[nn][1], '', '0', vnad[nn][6]]);
                    if (++nn > nad.length - 1) nn = 0;
                }
            }
        }
        //num = ary.length<num?ary.length:num;
        //排序(同步有序号的广告)
        ary.sort(function (x, y) {
            return x[3] - y[3];
        });

		//使用localStorage和userData存储轮播数
		var localData = {
			hname:location.hostname?location.hostname:'localStatus',
			isLocalStorage:window.localStorage?true:false,
			dataDom:null,

			initDom:function(){ //初始化userData
				if(!this.dataDom){
					try{
						this.dataDom = document.createElement('input');
						this.dataDom.type = 'hidden';
						this.dataDom.style.display = "none";
						this.dataDom.addBehavior('#default#userData');
						document.body.insertBefore(this.dataDom, document.body.firstChild);
					}catch(ex){
						return false;
					}
				}
				return true;
			},
			set:function(config){
				if(this.isLocalStorage){
					window.localStorage.setItem(config.key,config.value);
					if(config.expires) {
						var expires;
						if (typeof config.expires == 'number') {
							expires = new Date();
							expires.setTime(expires.getTime() + config.expires * 60000);
						}
						window.localStorage.setItem(config.key + ".expires",expires);
					}
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						this.dataDom.setAttribute(config.key,config.value);
						this.dataDom.save(this.hname);
						if(config.expires) {
							var expires;
							if (typeof config.expires == 'number') {
								expires = new Date();
								expires.setTime(expires.getTime() + config.expires * 60000);
							}
							this.dataDom.expires = expires.toUTCString();//设定过期时间
						}

					}
				}
			},
			get:function(config){
				if(this.isLocalStorage){
					var result = window.localStorage.getItem(config.key);
					//过期时间判断，如果过期了，则移除该项
					if(result) {
						var expires = window.localStorage.getItem(config.key + ".expires");
						result = {
							value : result,
							expires : expires ? new Date(expires) : null
						};
						if(result && result.expires && result.expires < new Date()) {
							result = null;
							window.localStorage.removeItem(config.key);
						}else{
							return result.value;
						}
					}
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						var result = this.dataDom.getAttribute(config.key);
						if(result) {
							var expires = this.dataDom.expires;
							result = {
								value : result,
								expires : expires ? new Date(expires) : null
							};
							if(result && result.expires && result.expires < new Date()) {
								result = null;
								this.remove(config);
							}else{
								return result.value;

							}
						}
					}
				}
			},
			remove:function(config){
				if(this.isLocalStorage){
					localStorage.removeItem(config.key);
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						this.dataDom.removeAttribute(config.key);
						//强制使其过期
						var expires = new Date();
						expires.setTime(expires.getTime() - 1);
						this.dataDom.expires = expires.toUTCString();
						this.dataDom.save(this.hname);
					}
				}
			}
		}

        if (typeof (globalRotatorId) == 'undefined' || globalRotatorId == null || isNaN(globalRotatorId)) {
            //curId = G(cookiename);
			curId = localData.get({key:cookiename});
            curId = (curId == '' || typeof curId=='undefined') ? Math.floor(Math.random() * max) : ++curId;
            if (curId > max || curId == null || isNaN(curId)) curId = 0;
            //S(cookiename, curId, timeout);
			localData.set({key:cookiename,value:curId,expires:timeout});
            globalRotatorId = curId;
        }

		//取id
        id = globalRotatorId % num;
		//document.title = '随机数：'+globalRotatorId+' | 轮数：'+id+' ';
        //若商广为空
        //nullRad = true;
        if ((typeof _ssp_ad != 'undefined') && (id > nullRad)) {
            _ssp_ad.load(div_id, showAD, w, h);
        } else {
            showAD();
        }

        function trackerMonitor(string, dom) {
            dom.setAttribute("digger", string);
            dom.setAttribute("enter", '');
            var alink = dom.getElementsByTagName("a");
            var alength = alink.length;
            while(alength--) {
                alink[alength].setAttribute("clk", '');
            }
			try{
				Tracker(string);
			}catch(e){

			}
        }
        //Show AD by acelan

        function showAD() {
            if (ary.length == 0) return; //如果没有广告则不显示
            var n = id;
            try {
                if (typeof (ary[n][0]) == "undefined" || ary[n][0] == "") return;
                var type = ary[n][0].substring(ary[n][0].length - 3).toLowerCase();
                var od = document.getElementById(div_id);
                if (od && marginType == 1) {
                    od.style.marginTop = 8 + "px";
                }
                if (od && marginType == 2) {
                    od.style.marginBottom = 8 + "px";
                }
                if (od && marginType == 3) {
                    od.style.marginTop = 8 + "px";
                    od.style.marginBottom = 8 + "px";
                }
                //将轮播序号返回到页面上
                if (ary[n][3] != null || ary[n][3] != 'undefined') {
                    if (!document.getElementById('rotatorAD_id')) {
                        var rotatorAD_id = document.createElement('input');
                        rotatorAD_id.id = 'rotatorAD_id';
                        rotatorAD_id.type = 'hidden';
                        rotatorAD_id.value = ary[n][3];
                        document.body.insertBefore(rotatorAD_id, document.body.firstChild);
                    } else {
                        document.getElementById('rotatorAD_id').value = ary[n][3];
                    }
                }
                //添加监测
                if (ary[n][4] != null || ary[n][4] != '') {
                    monitor(ary[n][4]);
                }
            } catch(e) {
                return;
            }

            if (type == 'swf') {
                var of = new sinaFlash(ary[n][0], div_id + '_swf', w, h, "7", "", false, "High");
                of.addParam("wmode", "opaque");
                of.addParam("allowScriptAccess", "always");
                of.addVariable("adlink", escape(ary[n][1]));
                if (ary[n][2] != "" && ary[n][2] != null) {
                    of.addVariable("_did", ary[n][2]);
                }
                of.write(div_id);
                (function () {
                    var url = ary[n][1];
                    if (url) {
                        var el = document.createElement('a'),
                            flashEl = document.getElementById(div_id);
                        flashEl.style.position = "relative";
                        el.setAttribute("href", url);
                        el.setAttribute("target", "_blank");
                        el.style.cssText += ";display:block;width:" + w + "px;height:" + h + "px;position:absolute;left:0px;top:0px;filter:alpha(opacity:0)";
                        if (el.style.filter) {
                            el.style.backgroundColor = "white";
                        }
                        flashEl.appendChild(el);
                    }
                })();
            } else if (type == 'jpg' || type == 'gif' || type == 'png') {
                if (ary[n][2] != "" && ary[n][2] != null) {
                    od.innerHTML = '<a href="' + ary[n][1] + '" target="_blank" onclick="try{_S_acTrack(' + ary[n][2] + ');}catch(e){}"><img src="' + ary[n][0] + '" border="0" width="' + w + '" height="' + h + '" /></a>';
                } else {
                    od.innerHTML = '<a href="' + ary[n][1] + '" target="_blank"><img src="' + ary[n][0] + '" border="0" width="' + w + '" height="' + h + '" /></a>';
                }
            } else if (type == 'htm' || type == 'tml') {
                od.innerHTML = '<iframe id="ifm_' + div_id + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '"></iframe>';
                document.getElementById('ifm_' + div_id).src = ary[n][0];
            } else if (type == '.js') { //js
                //document.write('<script language="javascript" type="text/javascript" src="'+ary[n][0]+'"></scr'+'ipt>');
                var jsurl = ary[n][0];
                var adScript = document.createElement('script');
                adScript.src = jsurl;
                document.getElementsByTagName('head')[0].appendChild(adScript);
            } else { //textlink
                if (ary[n][2] != "" && ary[n][2] != null) {
                    document.write('<a href="' + ary[n][1] + '" onclick="try{_S_acTrack(' + ary[n][2] + ');}catch(e){}"  target="_blank">' + ary[n][0] + '</a>');
                } else {
                    document.write('<a href="' + ary[n][1] + '"  target="_blank">' + ary[n][0] + '</a>');
                }
            }
            if (type != 'tml') {
                if (ary[n][3] && ary[n][3] != 0) {
                    trackerMonitor(ary[n][3], od);
                }
            }
        }

        function G(N) {
            var c = document.cookie.split("; ");
            for (var i = 0; i < c.length; i++) {
                var d = c[i].split("=");
                if (d[0] == N) return unescape(d[1]);
            }
            return '';
        };

        function S(N, V, Q) {
            var L = new Date();
            var z = new Date(L.getTime() + Q * 60000);
            document.cookie = N + "=" + escape(V) + ";path=/;expires=" + z.toGMTString() + ";";
        };

        function strToDate(str, ext) {
            var arys = new Array();
            arys = str.split('-');
            var newDate = new Date(arys[0], arys[1] - 1, arys[2], 9, 0, 0);
            if (ext) {
                newDate = new Date(newDate.getTime() + 1000 * 60 * 60 * 24);
            }
            return newDate;
        }

        //监测

        function monitor(o) {
            if (o instanceof Array) {
                var aImg = [];

                for (var i = 0, len = o.length; i < len; i++) {
                    aImg[i] = new Image();
                    aImg[i].src = o[i];
                }
            } else if (typeof o === 'string') {
                var oImg = new Image();
                oImg.src = o;
            }
        }

    }
}

//分时通栏标志
(function(){
  var pthis=this;this.compareDate = function (a,b){try{var n = new Date().getHours();if(n >= a && n < b){return true;}else{return false;}}catch(e){return false;}};
  try{window.timer_0915 = this.compareDate(9,15);}catch(e){}
  try{window.timer_1524 = this.compareDate(15,24);}catch(e){}
})();

/*********************************/

/*

轮播背投类 RotatorPB v3.1
Update by Dakular <shuhu@staff.sina.com.cn> 2008-8-25
格式：new RotatorPB(广告数组)
说明：第一次访问随机出现，以后访问顺序轮播；自动过滤过期广告；cookie时间24小时；商业广告数量不足时不显示
*/
if(typeof(RotatorPB)!='function'){
	var RotatorPB=function (rad){
		this.ary = new Array();
		this.date = new Date();
		this.w = rad.width;
		this.h = rad.height;
		this.num = rad.num;
		this.o = rad.length;
		this.id = RotatorPB.id++;
		this.m = 'rpb_'+this.id;
		this.n = new Array();
		this.L = new Date();
		this.e = 0;
		var f;
		var D = false;
		var nn = 0;
		//过滤无效广告
		for(var i=0; i<rad.length; i++){
			var start = RotatorPB.strToDate(rad[i][2].replace('<startdate>','').replace('</startdate>',''));
			var end = RotatorPB.strToDate(rad[i][3].replace('<enddate>','').replace('</enddate>',''),true);
			if(this.date>start && this.date<end && (this.num==null || this.ary.length<this.num) ){
				this.ary.push([rad[i][0], rad[i][1], rad[i][4]]);
			}
		}
		this.o = this.ary.length;
		//取id
		for(var i=0;i<this.o;i++){
			f=this.m+'_'+(i+1);
			g=RotatorPB.G(f);
			if(g!=''){
				this.n[i]=g;
				D=true;
			}else {
				this.n[i]=0;
			}
		}
		if(!D){
			var r=Math.ceil(Math.random()*this.o);
			var t=this.m+'_'+r;
			RotatorPB.S(t,this.L.getTime(),1440);
			this.e=r;
			if(this.o==1){RotatorPB.S('s_dl',r,1440);}
			//return r;
		}else {
			var R=this.n.join(',').split(',');
			var k=R.sort();
			var max=Number(k[k.length-1]);
			var min=Number(k[0]);
			var F;
			for(var i=0;i<this.n.length;i++){
				if(max==this.n[i]){
					F=i+1;
					break;
				}
			}
			if(typeof(F)!='undefined'){
				G=this.m+'_'+F;
				H=Number(RotatorPB.G(G));
				I=F%this.o+1;
				J=this.m+'_'+I;
				RotatorPB.S(J,this.L.getTime(),1440);
				if(this.o==1){
					I=-RotatorPB.G('s_dl');
					if(I==0){I=1;RotatorPB.S('s_dl',1,1440);}
					RotatorPB.S('s_dl',I,1440);
				}
				this.e=I;
				//return I;
			}
		}
		//Show AD
		if(this.e==0 || this.ary.length==0) return; //如果没有广告则不显示
		if(this.e==-1) return; //当只有一个广告时：始终显示第一个/奇数次刷新显示
		var n = this.e-1;
		var btsrc = this.ary[n][0];
		var bturl = this.ary[n][1];
		var bttype = btsrc.substring(btsrc.length-3).toLowerCase();

		var limitsrc = ['sina.com.cn','weibo.com','sinaimg.cn'];
		var limiturl = ['sina.com.cn','weibo.com','allyes.com'];
		var limitflag = 1;
		var escapeHTML = function (s) {
			return s.replace(/&/g,'&amp;')
				.replace(/</g,'&lt;')
				.replace(/>/g,'&gt;')
				.replace(/\s/g,'&nbsp;')
				.replace(/"/g, "&quot;");
		};

		for(var i=0;i<limitsrc.length;i++){
			if(btsrc.indexOf(limitsrc[i])!=-1){
				limitflag++;	
        break;
			}
		}
		for(var i=0;i<limiturl.length;i++){
			if(bturl.indexOf(limiturl[i])!=-1){
				limitflag++;	
        break;
			}
		}
		if(limitflag==3){
			if(bttype=='.js'){ //js
				document.write('<script language="javascript" type="text/javascript" src="'+btsrc+'"></scr'+'ipt>'); return;
			}else if(bttype!='htm' && bttype!='tml'){
				sinabturl = "http://d1.sina.com.cn/d1images/pb/pbv4.html?"+escapeHTML(bturl)+"${}"+escapeHTML(bttype)+"${}"+escapeHTML(btsrc);
			}else{
				sinabturl = escapeHTML(btsrc);
			}
		}

		try{
			aryADSeq.push("openWindowBack()");
		}catch(e){
			openWindowBack();
		}
		if(this.ary[n][2]!=""){ //监测计数
			var oImg = new Image();
			oImg.src = this.ary[n][2];
		}
	};
	RotatorPB.id=1;
	RotatorPB.G=function (N){
		var c=document.cookie.split("; ");
		for(var i=0;i<c.length;i++){
			var d=c[i].split("=");
			if(d[0]==N)return unescape(d[1]);
		}return '';
	};
	RotatorPB.S=function (N,V,Q){
		var L=new Date();
		var z=new Date(L.getTime()+Q*60000);
		document.cookie=N+"="+escape(V)+"; path=/; expires="+z.toGMTString()+";";
	};
	RotatorPB.strToDate = function(str,ext){
		var arys = new Array();
		arys = str.split('-');
		var newDate = new Date(arys[0],arys[1]-1,arys[2],9,0,0);
		if(ext){
			newDate = new Date(newDate.getTime()+1000*60*60*24);
		}
		return newDate;
	}
	var openWindowBack = function(){
		var popUpWin2 = open(sinabturl, (window.name!="popUpWin2")?"popUpWin2":"", "width=1,height=1,top=4000,left=3000");
	}
};

/*地域定向广告投放*/
/* location ads begin */
/* 2010-08-02 18:39:38 */

// libweb_getCookie
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 9(a){2 b=3.4.e(";",a);5(b==-1){b=3.4.6}7 g(3.4.f(a,b))}8 h(a){2 b=a+"=";2 c=b.6;2 d=3.4.6;2 i=0;k(i<d){2 j=i+c;5(3.4.f(i,j)==b){7 9(j)}i=3.4.e(" ",i)+1;5(i==0)l}7\'\'}',22,22,'||var|document|cookie|if|length|return|function|libweb_getCookieVal|||||indexOf|substring|unescape|libweb_getCookie|||while|break'.split('|'),0,{}));

var local_index = unescape(libweb_getCookie('dummy_ip_local_index'));
var location1 = unescape(libweb_getCookie('dummy_ip_location1'));
var location2 = unescape(libweb_getCookie('dummy_ip_location2'));

if (local_index == '') {
    // location info
    var dictLoc = {"安徽":0,"北京":1,"重庆":2,"福建":3,"甘肃":4,"广东":5,"广西":6,"贵州" :7,"海南":8,"河北":9,"黑龙江":10,"河南":11,"湖北":12,"湖南":13,"内蒙古":14,"江苏":15,"江西":16,"吉林":17,"辽宁":18,"宁夏":19,"青海":20,"山西":21,"陕西":22,"山东":23,"上海":24,"四川":25,"天津":26,"西藏":27,"新疆":28,"云南":29,"浙江":30,"香港":31,"澳门":32,"台湾":33};
    if(typeof remote_ip_info == "object" && remote_ip_info.ret == 1) {
    	local_index = dictLoc[remote_ip_info.province];

	if(typeof local_index == "undefined") {
		local_index = 1;
		location1 = "其它";
		location2 = "其它";
    	}else if(remote_ip_info.province == "北京" || remote_ip_info.province == "天津" || remote_ip_info.province == "上海" || remote_ip_info.province == "重庆") {
    		location1 = remote_ip_info.province + '市';
    		location2 = remote_ip_info.province;
    	}else if(remote_ip_info.province != "香港" && remote_ip_info.province != "澳门" && remote_ip_info.province != "广西" && remote_ip_info.province != "宁夏" && remote_ip_info.province != "内蒙古" && remote_ip_info.province != "西藏" && remote_ip_info.province != "新疆" && remote_ip_info.province != ""){
    		location1 = remote_ip_info.province + '省';
    		location2 = remote_ip_info.city;
    	}else{
    		location1 = remote_ip_info.province;
    		location2 = remote_ip_info.city;
    	}

	// 临时
	/*if(remote_ip_info.start == "180.95.128.0" || remote_ip_info.start == "180.95.224.0") {
		local_index = 4;
		location1 = "甘肃省";
		location2 = "兰州";
	}*/

    }else{
	// no result
    	local_index = 1;
	try{
		var ip = remote_ip_info.ip.split(".");
	}catch(e){

	}

	if(typeof ip != "undefined" && (ip[0] == "10" || (ip[0] == "172" && parseInt(ip[1]) >= 16 && parseInt(ip[1]) <= 31) || (ip[0] == "192" && ip[1] == "168"))) {
    		location1 = "北京市";
		location2 = "北京";
	}else{
		location1 = "其它";
    		location2 = "其它";
	}
    }
}

// webShow 1.2.8 for zhitou and pinpai, WSCSubstr 1.0.0
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1j 1x(){P.1k="1.2.8";P.X=1j(a,b,c){P.1k="1.0.0";4 d=(1l[3]==Q?Q:11);5(R a=="Y"||a=="")12 11;4 e=a.1y(\'\');4 f=0;4 g=e.6;9(4 i=0;i<g;i++){5(f>=c){1z}5(e[i].1A(0)<=1B){f++}M{f+=2}}5(f>c&&d!=Q){i--}12 a.1m(b,i)};4 h=S V();4 l=S V();4 m=S V();4 n=S V();4 o={\'O\':\'我也要在这里发布\',\'13\':\'1n://1C.15.1o.1p\',\'N\':\'1n://1D.15.1o.1p/1E/15/1F.1G\'};4 p=1l[0];5(R p=="16"){17{4 q=p.1H;4 r=p.1I;4 s=p.1J;4 t=p.Z;4 u=p.1K;4 v=p.1L;4 w=p.1M;4 x=p.18;4 y=p.19}1a(e){12 11}}4 z=(p.1q==T?Q:p.1q);4 A=(p.1r==T?"1s":p.1r);4 B=(p.W==T?"1t":p.W);4 C=(p.1u==T?11:p.1u);4 D=(p.1b==T?1:p.1b);4 E=u*v;5(R r=="16"){9(4 i 1N r){4 F=11;5(r[i].Z==T||r[i].Z==""){5(r[i].1b.1m(D,1)!=\'1\'){F=Q}}M{r[i].Z=","+r[i].Z+",";5(r[i].Z.1O(","+t+",")==-1){F=Q}}5((r[i].O==""&&B=="1t")||(r[i].N==""&&B=="N")||F==Q){5(z==Q)1P;M r[i]=o}5(R r[i].7!="Y"&&r[i].7!="")h[r[i].7]=r[i];M l[l.6]=r[i]}9(i=l.6;i<E;i++){l[l.6]=o}}5(A=="1s"||A=="1v"){4 G=1Q.1R("1S"+q);5(G.6>0){9(4 i=0;i<G.6;i++){5(G[i].1c("7")!=T&&G[i].1c("7")!="")m[G[i].1c("7")]=G[i];M n[n.6]=G[i]}}5(C==Q){5(h.6>0){9(4 i=0;i<h.6;i++){5(h[i]!=T){4 H=h[i];5(H.O!=""){5(B=="N"){m[H.7].10[0].U=\'<1d 1e="\'+H.N+\'" 1f="0" />\';m[H.7].10[1].U=P.X(H.O,0,w)}M{m[H.7].U=P.X(H.O,0,w)}m[H.7].1g=H.13;5(R H.W!="Y")m[H.7].1h("1i",H.W)}}}}}M{5(m.6>0){9(4 i=0;i<m.6;i++){5(m[i]!=T){5(R h[i]=="16"){H=h[i]}M{H=o}5(B=="N"){4 I=\'<1d 1e="\'+H.N+\'" 1w="\';5(x!="")I+=\'18:\'+x+\'14;\';5(y!="")I+=\'19:\'+y+\'14;\';I+=\'" 1f="0" />\';m[i].10[0].U=I;m[i].10[1].U=P.X(H.O,0,w)}M{m[i].U=P.X(H.O,0,w)}m[i].1g=H.13;5(R H.W!="Y")m[H.7].1h("1i",H.W)}}}}5(l.6>0){4 J=S V();4 K=S V();9(4 i=0,j=0;i<E;i++,j++){17{5(l[j].O==""){1T S 1U();}M{J[i]=l[j]}}1a(e){J[i]=o}}4 k=0;9(i=0;i<v;i++){K[i]=S V();9(4 j=0;j<u;j++){K[i][j]=J[k];k++}}k=0;9(i=0;i<u;i++){9(4 j=0;j<v;j++,k++){17{5(B=="N"){5(R K[j][i].N=="Y")K[j][i].N=K[j][i].1V;4 I=\'<1d 1e="\'+K[j][i].N+\'" 1w="\';5(x!="")I+=\'18:\'+x+\'14;\';5(y!="")I+=\'19:\'+y+\'14;\';I+=\'" 1f="0" />\';n[k].10[0].U=I;n[k].10[1].U=P.X(K[j][i].O,0,w)}M{n[k].U=P.X(K[j][i].O,0,w)}n[k].1g=K[j][i].13;5(R K[j][i].W!="Y")n[k].1h("1i",K[j][i].W)}1a(e){}}}}}5(A=="1W"||A=="1v"){4 L=S V();L[\'1X\']=h;L[\'1Y\']=l;12 L}}',62,123,'||||var|if|length|pos||for|||||||||||||||||||||||||||||||||||||||else|pic|title|this|true|typeof|new|null|innerHTML|Array|type|csubstr|undefined|city|childNodes|false|return|url|px|sina|object|try|width|height|catch|area|getAttribute|img|src|border|href|setAttribute|webtype|function|version|arguments|substr|http|com|cn|rearrange|action|padding|text|fixedinc|both|style|webShow|split|break|charCodeAt|255|p4p|d1|pfpghc|1217235599_75506058_zhitou|jpg|resid|webs|province|cols|rows|titlelen|in|indexOf|continue|document|getElementsByName|res|throw|Error|picpath|data|fixed|grid'.split('|'),0,{}));

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 9(a,b,c){1 d=(h[3]==5?5:6);4(j a=="k"||a=="")7 6;1 e=a.l(\'\');1 f=0;1 g=e.m;n(1 i=0;i<g;i++){4(f>=c){o}4(e[i].p(0)<=q){f++}r{f+=2}}4(f>c&&d!=5){i--}7 a.s(b,i)}',29,29,'|var|||if|true|false|return|function|WSCSubstr||||||||arguments||typeof|undefined|split|length|for|break|charCodeAt|255|else|substr'.split('|'),0,{}));

/* location ads end */

/**跨栏广告 begin**/
function CoupletMediaOpenWin(){
  var pthis = this;//设置指针
  var o = new SinaDotAdJs();//加载通用类
  var d = CoupletMediaData;//加载数据
  var defaultW = 1000;
  var minWidth = defaultW - 0 + 240;
  var rn = 2;//轮播数
  if(o.$("SteamMediaWrap")){var w = o.$("SteamMediaWrap");}else{var w = false;}//加载容器对象
  this.cd = new Array();
  this.ctimer = null;
  this.ctimer_ext = null;
  this.ctimer_lft = null;
  this.tmpWidth = 0;
  this.isext = false;
  this.ishide = false;

   //跨栏构造函数
   this.initAdCM = function(ul,ur,ue,l,tk,tp){

	//高度固定
	tp = 46;

     //容器构造
     //主容器
     eval(o.initWrap(0x02,"CoupletMediaWrap","cmWrap",1000,0,"","","","","","","0 auto","0","none","block"));

     //左栏部分
     eval(o.initWrap(0x01,"div","clWrap",120,288,"absolute","0","","0","","99","0","0","none","none"));
     clWrap.style.top = tp + "px";
	 clWrap.style.background = "#fff";
     cmWrap.appendChild(clWrap);
     eval(o.initWrap(0x01,"div","cliWrap",120,270,"absolute","0","","0","","","0","0","","block"));
     clWrap.appendChild(cliWrap);
     eval(o.initWrap(0x01,"div","clcBtn",120,18,"absolute","0","","270","","","0","0","url(http://d9.sina.com.cn/litong/zhitou/test/images/close-h.jpg) no-repeat right #EBEBEB","block"));
     clcBtn.style.cursor = "pointer";
     clWrap.appendChild(clcBtn);

     //右栏部分
     eval(o.initWrap(0x01,"div","crWrap",120,288,"absolute","","0","0","","99","0","0","none","none"));
     crWrap.style.top = tp + "px";
	 crWrap.style.background = "#fff";
     cmWrap.appendChild(crWrap);
     eval(o.initWrap(0x01,"div","criWrap",120,270,"absolute","0","","0","","","0","0","","block"));
     crWrap.appendChild(criWrap);
     eval(o.initWrap(0x01,"div","crcBtn",120,18,"absolute","0","","270","","","0","0","url(http://d9.sina.com.cn/litong/zhitou/test/images/close-h.jpg) no-repeat left #EBEBEB","block"));
     crcBtn.style.cursor = "pointer";
     crWrap.appendChild(crcBtn);

     //触发部分
     eval(o.initWrap(0x01,"div","ceWrap",1000,90,"absolute","0","","0","","999","0","0","","none"));
     ceWrap.style.top = tp + "px";
	 cmWrap.appendChild(ceWrap);
	 eval(o.initWrap(0x01,"div","ceiWrap",0,90,"","0","","0","","","0 auto","0","","block"));
	 ceiWrap.style.overflow = "hidden";
	 ceWrap.appendChild(ceiWrap);
	 eval(o.initWrap(0x01,"div","cecBtn",66,22,"absolute","","0","","-22","999","0","0","url(http://d2.sina.com.cn/d1images/lmt/cls_66x22.gif) no-repeat","block"));
	 cecBtn.style.cursor = "pointer";
	 ceWrap.appendChild(cecBtn);

	 this.getCMPos = function(){
	   ceWrap.style.left = (cmWrap.offsetLeft=="undefined"?((o.bdy.offsetWidth - w)/2-(o.isIE6?16:0)):(cmWrap.offsetLeft!=0?cmWrap.offsetLeft:cmWrap.parentNode.offsetLeft))+"px";
	   pthis.ctimer_lft = setTimeout("getCMPos()",50);
	 }

	 //隐藏跨栏
	 this.hideCM = function(){
	   this.isext = false;
	   clearTimeout(pthis.ctimer);
	   clearTimeout(pthis.ctimer_lft);
	   clearInterval(pthis.ctimer_ext);
	   cliWrap.innerHTML = "";
	   criWrap.innerHTML = "";
	   ceiWrap.innerHTML = "";
	   var cliObj = o.initObj("CoupletMediaLeftObj",ul,l,120,270);
       cliWrap.appendChild(cliObj);
	   var criObj = o.initObj("CoupletMediaRightObsj",ur,l,120,270);
       criWrap.appendChild(criObj);
       clWrap.style.display = "block";
	   crWrap.style.display = "block";
	   ceWrap.style.display = "none";
	 };
	 //点击隐藏
	 this.clcHideCM = function(){
	   pthis.ishide = true;
	   pthis.hideCM();
	 };
	 //显示跨栏
	 this.showCM = function(){
       if(!pthis.isext && !pthis.ishide){
		 pthis.getCMPos();
		 this.isext = true;
	     clearTimeout(pthis.ctimer);
		 ceiWrap.style.width = 0;
         pthis.tmpWidth = 0;
	     var ceiObj = o.initObj("CoupletMediaExtObsj",ue,l,1000,90);
	     ceiWrap.appendChild(ceiObj);
	     ceWrap.style.display = "block";
		 pthis.ctimer_ext = setInterval(function(){
		   if(pthis.tmpWidth<1000){
		     pthis.tmpWidth+=50;
             ceiWrap.style.width = pthis.tmpWidth + "px";
		   }else{
		     clearInterval(pthis.ctimer_ext);
		   }
		 },1);
	     pthis.ctimer = setTimeout(function(){pthis.hideCM();},8000);
		 if(tk!=""){
		   var cTmpTracker = new Image();
           cTmpTracker.src=tk+"&"+Math.random();
		 }
	   }
	 };
     //关闭跨栏
	 this.closeCM = function(){
	   clearTimeout(pthis.ctimer);
	   clearTimeout(pthis.ctimer_lft);
	   clearInterval(pthis.ctimer_ext);
	   cmWrap.innerHTML = "";
	 };

	 this.reposCM = function () {
		var winW = document.documentElement.clientWidth || document.body.clientWidth;
		if (winW <= minWidth) {
			if (winW <= defaultW) {
				clWrap.style.display = "none";
				crWrap.style.display = "none";
			} else {
				clWrap.style.display = "block";
				crWrap.style.display = "block";
				clWrap.style.left = winW / 2 - minWidth / 2 + "px";
				crWrap.style.width = 120 + winW / 2 - minWidth / 2 + "px";
				crWrap.style.overflow = "hidden";
			}
		} else {
			clWrap.style.display = "block";
			crWrap.style.display = "block";
			clWrap.style.left = 0;
			crWrap.style.width = 120 + "px";
		}
	}
	this.reposCM();

	try {
		window.attachEvent("onresize", this.reposCM);
	} catch(e) {
		window.addEventListener("resize", this.reposCM);
	}

	 o.addEvent(cliWrap,"mouseover",pthis.showCM);//注册左触发事件
	 o.addEvent(criWrap,"mouseover",pthis.showCM);//注册右触发事件
	 o.addEvent(clcBtn,"click",pthis.closeCM);//注册左关闭事件
	 o.addEvent(crcBtn,"click",pthis.closeCM);//注册右关闭事件
	 o.addEvent(cecBtn,"click",pthis.clcHideCM);////注册触发关闭事件

	 pthis.hideCM();//加载广告
	 try{nextAD();}catch(e){}//加载后续广告

   }

  //时间过滤
  this.ifCMAD = false;
  if(w && d.length>0){
    for(var i=0;i<d.length;i++){
	  if(o.checkTime(d[i][0],d[i][1])){this.ifCMAD = true;this.cd.push([d[i][2],d[i][3],d[i][4],d[i][5],d[i][6],d[i][7]]);}
	}
	if(!this.ifCMAD){try{nextAD();}catch(e){}}
  }else{
     try{nextAD();}catch(e){}
   }

   var genkey = function(prefix, s){
		var hash = 0, i = 0, w;
		for(; !isNaN(w = s.charCodeAt(i++));) {
			hash = ((hash << 5) - hash) + w;
			hash = hash & hash;
		}
		return prefix + hash;
	}
   var CoupletMediaCookieName = genkey('CoupletMedia',document.URL);
  this.cid = o.getAdCookie(CoupletMediaCookieName);
  this.cid = this.cid==""?Math.floor(Math.random()*rn):++this.cid;
  this.cid = this.cid>=rn?0:this.cid;
  if(typeof(this.cd[this.cid])!="undefined"){
	pthis.initAdCM(this.cd[this.cid][0],this.cd[this.cid][1],this.cd[this.cid][2],this.cd[this.cid][3],this.cd[this.cid][4],this.cd[this.cid][5]);
  }else{try{nextAD();}catch(e){}}
  o.setAdCookie(CoupletMediaCookieName,this.cid,1440);

}

/**跨栏广告 end**/

/*********************************/
/******** Sales dept. end ********/

/* leju.js */
(function(b,g){var c={g:function(h){return document.getElementById(h)},encodeHTML:function(h){return h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},forEach:Array.prototype.forEach?function(h,i){Array.prototype.forEach.call(h,i)}:function(j,l){for(var k=0,h=j.length;k<h;k++){l(j[k],k)}}};var e=(function(h){function i(n,l,o,m){return function(){if(typeof o==="function"){try{var q=o.apply(n,arguments);if(j.isPromise(q)){q.then(function(){l.resolve.apply(l,arguments)},function(){l.reject.apply(l,arguments)})}else{l.resolve.call(l,q)}}catch(p){l.reject(p)}}else{l[m].apply(l,n._args)}}}function k(l){if(l._state==="pending"){return}var m=l._state==="resolved"?l._resolves.slice():l._rejects.slice();setTimeout(function(){h.forEach(m,function(p,n){try{p.apply(l,l._args)}catch(o){}})},0);l._resolves=[];l._rejects=[]}function j(){this._state="pending";this._args=null;this._resolves=[];this._rejects=[]}j.prototype={resolve:function(l){if(this._state!=="pending"){return}this._state="resolved";this._args=[].slice.call(arguments);k(this)},reject:function(){if(this._state!=="pending"){return}this._state="rejected";this._args=[].slice.call(arguments);k(this)},then:function(n,m){var l=new j();this._resolves.push(i(this,l,n,"resolve"));this._rejects.push(i(this,l,m,"reject"));k(this);return l},done:function(l){return this.then(l)},fail:function(l){return this.then(null,l)}};j.isPromise=function(l){return l&&typeof l.then==="function"};j.when=function(){};return j})(c);var a=(function(k,i){function h(m,l,n){m.setAttribute("type","text/javascript");n&&m.setAttribute("charset",n);m.setAttribute("src",l);k.getElementsByTagName("head")[0].appendChild(m)}function j(l){if(l&&l.parentNode){l.parentNode.removeChild(l)}l=null}return{callByServer:function(l,u,w){var v=new i(),p="loader_cbs_",s="lejuDataCallback"||p+Math.floor(Math.random()*2147483648).toString(36),q=k.createElement("SCRIPT"),x=w||{},n=x.charset||"utf-8",o="callback",t=x.timeOut||5000,m;b[s]=r(0);if(t){m=setTimeout(r(1),t)}l+=(l.indexOf("?")<0?"?":"&")+o+"="+s;h(q,l,n);return v;function r(y){return function(){try{if(y){v.reject()}else{v.resolve.apply(v,arguments);clearTimeout(m)}b[s]=null;delete b[s]}catch(z){}finally{j(q)}}}}}})(g,e);var d={data:null,defaultData:null,format:function(k){var h={};if("object"===typeof k&&(k.status===true)&&(k.data instanceof Array)){var j=0,l,m;while(l=k.data[j++]){l.params&&(l.params.sort=l.position);m=l.position.replace(/\-(\d)+$/,"");!h[m]&&(h[m]=[]);h[m].push(l)}return h}}};var f={conf:{},getData:function(){var h=new e();if(d.data){h.resolve();return h}if(!f.conf.url){h.reject();return h}a.callByServer(f.conf.url).done(function(i){d.data=d.format(i);h.resolve(d.data)}).fail(function(){if(d.defaultData){h.resolve(d.defaultData);return h}else{if(!f.conf.defaultUrl){h.reject();return h}else{a.callByServer(f.conf.defaultUrl).done(function(i){d.defaultData=d.format(i);h.resolve(d.defaultData)}).fail(function(){h.reject()})}}});return h},sliceLen:function(n,h){var k,m=[],o,j=n.length>h?h:n.length;for(k=0;k<j;k++){o=n[k];if(o.params&&o.params.link&&o.params.txt){m.push(o.params)}}m.sort(function(l,i){return l.sort<=i.sort?-1:1});for(k=0,j=h-m.length;k<j;k++){m.push(m[k])}return m},text:function(q,k,o,n){var h=null,l=0,p,m=[],j;if("number"!==typeof o){n=o;o=k.length}if(q&&(h=c.g(q))){k=f.sliceLen(k[q],o);while(p=k[l++]){j=c.encodeHTML(p.txt);m.push('<li><a href="'+p.link+'" target="_blank">'+(p.color?'<span style="color:'+p.color+'">':"")+("function"===typeof n?n(j):j)+(p.color?"</span>":"")+"</a></li>")}h.innerHTML="<ul>"+m.join("")+"</ul>"}},text2:function(q,j,o,n){var h=null,k=0,p,l,m=[];if("number"!==typeof o){n=o;o=j.length}if(q&&(h=c.g(q))){j=f.sliceLen(j[q],o);while(p=j[k++]){l=c.encodeHTML(p.txt);if(k%2){m.push('<div class="mod12-item" '+((k===j.length-1||k===j.length)?'style="border-right:none"':"")+">")}m.push('<a href="'+p.link+'" target="_blank">'+(p.color?'<span style="color:'+p.color+'">':"")+("function"===typeof n?n(l):l)+(p.color?"</span>":"")+"</a>");if(!(k%2)){m.push("</div>")}}h.innerHTML=m.join("")}},swf:function(p,m,n,i,l){var k=null,o,j;if(p&&n&&(m=m[p])&&(k=c.g(p))){if(m instanceof Array&&m[0]&&m[0].params&&m[0].params.src){i=i||m[0].params.width;l=l||m[0].params.height;j=m[0].params.src.substring(m[0].params.src.length-3).toLowerCase();switch(j){case"jpg":case"gif":case"png":if(m[0].params.link){k.innerHTML='<a href="'+m[0].params.link+'" target="_blank"><img src="'+m[0].params.src+'" border="0" width="'+i+'" height="'+l+'" /></a>'}else{k.innerHTML='<img src="'+m[0].params.src+'" border="0" width="'+i+'" height="'+l+'" /></a>'}break;default:o=new n(m[0].params.src,p+"_swf",i,l,"7","",false,"high");o.addParam("wmode","opaque");m[0].params.link&&o.addVariable("adlink",escape(m[0].params.link));o.write(p);break}}}},rotator:function(j,n,p,k,h,m){var l=0,o;if(p&&(n=n[p])){if(n instanceof Array){while(o=n[l++]){o.params&&o.params.link&&o.params.src&&j.unshift([o.params.src,o.params.link,"<startdate>"+k+"</startdate>","<enddate>"+h+"</enddate>","",parseInt(m,10)||""])}}}},couplet:function(o,m,j,h,l){var m=m.couplet,k=0,l=l||46,n;if(m instanceof Array){while(n=m[k++]){n.params&&n.params.link&&n.params.left&&n.params.right&&n.params.bar&&o.unshift([j,h,n.params.left,n.params.right,n.params.bar,n.params.link,"",l])}}}};b.leju=f})(window,document);