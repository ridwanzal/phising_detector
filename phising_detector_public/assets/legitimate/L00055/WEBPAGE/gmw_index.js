/*
 * 光明网首页使用的JS
 * 王爱民 20140228
 */

var CMBtimer=0,CMBtimers=100;
$(function(){
	// 兼容空广告时，广告位下边框问题
	clearMarginBottom();

	// 某具体时刻 需要更换首页的一个广告banner
	//autoChangeBanner();

	// 自动去除首页两会专区 2014.3.15 10:00
	//autoRemove_lianghuizq();
});

// ------------------------------
// 为二通广告做的兼容，当此位置无广告时，上下留空太多，则清除下边距10px
function clearMarginBottom(){
	if($("#templeft").length>0 && $("#tempcenter").length>0 && $("#tempright").length>0 && $("#index_banner04").length>0){
		CMBtimer = setInterval(function(){
			if($("#templeft").html() != '' || $("#tempcenter").html() != '' || $("#tempright").html() != '' || $("#index_banner04").html() != ''){
				$("#templeft").css("marginBottom","10px");
				$("#tempcenter").css("marginBottom","10px");
				$("#tempright").css("marginBottom","10px");
			}else{
				$("#templeft").css("marginBottom","0px");
				$("#tempcenter").css("marginBottom","0px");
				$("#tempright").css("marginBottom","0px");
			}
			CMBtimers += 100;
			if(CMBtimers>1000){clearInterval(CMBtimer);}
		}, CMBtimers);
	}
}

// ------------------------------
// 某具体时刻 需要更换首页的一个广告banner
function autoChangeBanner(){
    var nowDate		= new Date();// 现在时间
    var nowTime		= nowDate.getTime();
    var removeDate	= new Date('00:00:00 6/26/2014');// 更换banner时间
    var startTime	= removeDate.getTime();
    if(nowTime >= startTime){
        var changeImg = $("img[src='http://ad.gmw.cn/index_banner/gov_vote_banner.jpg']");
        changeImg.parent("a").attr("href","http://net.china.com.cn/index.htm");
        changeImg.attr("src","http://ad.gmw.cn/index_banner/net_china_com_cn_banner.jpg");
    }
}










/*
// ------------------------------
// 各种需求而导致的刷墙效果
// 2014两会首页，新闻中心首页刷墙，需对联效果，且每日一换
function shuaqiang(){
	// 现在时间
	var nowDate		= new Date();
	var nowTime		= nowDate.getTime();
	// 开始刷墙时间
	var startDate	= new Date('00:00:00 3/3/2014');
	var startTime	= startDate.getTime();
	// 结束刷墙时间
	var stopDate	= new Date('00:00:00 3/14/2014');
	var stopTime	= stopDate.getTime();
	// 刷墙所需图片地址
	var picPath		= 'http://img.gmw.cn/images/2014lianghui/';
	// 平铺背景图地址
	var bgurl		= 'http://ad.gmw.cn/index_banner/sbdsx.jpg';
	// 链接地址
	var linkurl		= 'http://topics.gmw.cn/2014lh.htm';
	// -------------------------------
	// 暂停时间
	var startP		= new Date('00:00:00 3/6/2014').getTime();
	var stopP		= new Date('00:00:00 3/7/2014').getTime();
	// 判断当前时间是否在刷墙时间内
	if((nowTime >= startTime && nowTime <=stopTime) && (nowTime<startP || nowTime>=stopP)){
		// 通栏头图
		var bannerurl	= picPath + nowDate.getDate() + '_t.jpg';
		// 对联图片
		var coupleturl_l= picPath + nowDate.getDate() + '_l.jpg';
		// 对联图片
		var coupleturl_r= picPath + nowDate.getDate() + '_r.jpg';
		// 刷墙HTML内容
		var sqdt = '<div style="width:1000px;margin:0 auto; position:relative;text-align:center;height:70px;">';
		sqdt	+= '	<div><a href="'+linkurl+'"><img src="'+bannerurl+'" width="1000" height="70" border="0"/></a></div>';
		sqdt	+= '	<div style="position:absolute;top:0;left:-140px;"><a href="'+linkurl+'"><img src="'+coupleturl_l+'" width="140" height="240" border="0"/></a></div>';
		sqdt	+= '	<div style="position:absolute;top:0;left:1000px;"><a href="'+linkurl+'"><img src="'+coupleturl_r+'" width="140" height="240" border="0"/></a></div>';
		sqdt	+= '</div>';
		// 由于是首页与新闻中心都刷，因此需判断页面是哪一个，对新闻中心页面单独处理
		var thisurl = window.location.href;
		if(thisurl.indexOf("news.gmw.cn")>=0){
			// 新闻中心页面背景原来白，需调灰。
			if($("#header").length >0){
				$("#header").css({"margin":"0 auto","background-color":"#ffffff"});
			}
			// 新闻中心页面的主体内容背影需调白
			if($(".wrapper1000").length>0){
				$(".wrapper1000").css({"background-color":"#ffffff"});
			}
			// head1000.htm为公用SSI，需只对新闻中心首页做限宽处理
			if($(".noMobile:first").length>0){
				$(".noMobile:first").css({"margin":"0 auto","width":"1000px"});
			}
		}
		// 将刷墙效果添加至BODY头部
		$("body").css({"background":"url("+bgurl+") repeat-x #E9E9E9"}).prepend(sqdt);
	}
	// -------------------------------
	if(nowTime>=startP && nowTime<stopP){
		var aaa = window.location.href;
		if(aaa.indexOf("news.gmw.cn")>=0){
			// 新闻中心页面背景原来白，需调灰。
			if($("#header").length >0){
				$("#header").css({"margin":"0 auto","background-color":"#ffffff"});
			}
			// 新闻中心页面的主体内容背影需调白
			if($(".wrapper1000").length>0){
				$(".wrapper1000").css({"background-color":"#ffffff"});
			}
			// head1000.htm为公用SSI，需只对新闻中心首页做限宽处理
			if($(".noMobile:first").length>0){
				$(".noMobile:first").css({"margin":"0 auto","width":"1000px"});
			}
		}
		var sqbgurl	= 'http://ad.gmw.cn/index_banner/sq.jpg';
		$("body").css({"background":"url("+sqbgurl+") repeat-x #E9E9E9"}).prepend('\
<div style="width:1000px;margin:0 auto; position:relative;text-align:center;height:70px;">\
	<div>\
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1000" height="60">\
			<param name="movie" value="http://img.gmw.cn/flash/t.swf" />\
			<param name="quality" value="high" />\
			<embed src="http://img.gmw.cn/flash/t.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="1000" height="60"></embed>\
		</object>\
	</div>\
	<div style="position:absolute;top:0;left:-100px;">\
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="100" height="450">\
			<param name="movie" value="http://img.gmw.cn/flash/lr.swf" />\
			<param name="quality" value="high" />\
			<embed src="http://img.gmw.cn/flash/lr.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100" height="450"></embed>\
		</object>\
	</div>\
	<div style="position:absolute;top:0;left:1000px;">\
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="100" height="450">\
			<param name="movie" value="http://img.gmw.cn/flash/lr.swf" />\
			<param name="quality" value="high" />\
			<embed src="http://img.gmw.cn/flash/lr.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100" height="450"></embed>\
		</object>\
	</div>\
</div>');
	}
}
// -------------------------------
// 自动去除两会专区
function autoRemove_lianghuizq(){
	// 现在时间
	var nowDate		= new Date();
	var nowTime		= nowDate.getTime();
	// 去除专区时间
	var removeDate	= new Date('09:00:00 3/17/2014');
	var startTime	= removeDate.getTime();
	if(nowTime >= startTime){
		$(".lianghuizq").remove();
	}else{
		$(".lianghuizq").show();
	}
}
*/