// 区域定制 & 地址
var pdip = [
{"name":"区域","code":"","url":"http://www.xinhuanet.com/dzxw2/iframe_quyu.htm"},
{"name":"北京","code":"1561100000","url":"http://www.xinhuanet.com/dzxw2/iframe_beijing.htm"},
{"name":"天津","code":"1561200000","url":"http://www.xinhuanet.com/dzxw2/iframe_tianjin.htm"},
{"name":"河北","code":"1561300000","url":"http://www.xinhuanet.com/dzxw2/iframe_hebei.htm"},
{"name":"山西","code":"1561400000","url":"http://www.xinhuanet.com/dzxw2/iframe_shanxi.htm"},
{"name":"辽宁","code":"1562100000","url":"http://www.xinhuanet.com/dzxw2/iframe_liaoning.htm"},
{"name":"吉林","code":"1562200000","url":"http://www.xinhuanet.com/dzxw2/iframe_jilin.htm"},
{"name":"上海","code":"1563100000","url":"http://www.xinhuanet.com/dzxw2/iframe_shanghai.htm"},
{"name":"江苏","code":"1563200000","url":"http://www.xinhuanet.com/dzxw2/iframe_jiangsu.htm"},
{"name":"浙江","code":"1563300000","url":"http://www.xinhuanet.com/dzxw2/iframe_zhejiang.htm"},
{"name":"安徽","code":"1563400000","url":"http://www.xinhuanet.com/dzxw2/iframe_anhui.htm"},
{"name":"福建","code":"1563500000","url":"http://www.xinhuanet.com/dzxw2/iframe_fujian.htm"},
{"name":"江西","code":"1563600000","url":"http://www.xinhuanet.com/dzxw2/iframe_jiangxi.htm"},
{"name":"山东","code":"1563700000","url":"http://www.xinhuanet.com/dzxw2/iframe_shandong.htm"},
{"name":"河南","code":"1564100000","url":"http://www.xinhuanet.com/dzxw2/iframe_henan.htm"},
{"name":"湖北","code":"1564200000","url":"http://www.xinhuanet.com/dzxw2/iframe_hubei.htm"},
{"name":"湖南","code":"1564300000","url":"http://www.xinhuanet.com/dzxw2/iframe_hunan.htm"},
{"name":"广东","code":"1564400000","url":"http://www.xinhuanet.com/dzxw2/iframe_guangdong.htm"},
{"name":"广西","code":"1564500000","url":"http://www.xinhuanet.com/dzxw2/iframe_guangxi.htm"},
{"name":"海南","code":"1564600000","url":"http://www.xinhuanet.com/dzxw2/iframe_hainan.htm"},
{"name":"重庆","code":"1565000000","url":"http://www.xinhuanet.com/dzxw2/iframe_chongqing.htm"},
{"name":"四川","code":"1565100000","url":"http://www.xinhuanet.com/dzxw2/iframe_sichuan.htm"},
{"name":"贵州","code":"1565200000","url":"http://www.xinhuanet.com/dzxw2/iframe_guizhou.htm"},
{"name":"云南","code":"1565300000","url":"http://www.xinhuanet.com/dzxw2/iframe_yunnan.htm"},
{"name":"西藏","code":"1565400000","url":"http://www.xinhuanet.com/dzxw2/iframe_xizang.htm"},
{"name":"陕西","code":"1566100000","url":"http://www.xinhuanet.com/dzxw2/iframe_shaanxi.htm"},
{"name":"甘肃","code":"1566200000","url":"http://www.xinhuanet.com/dzxw2/iframe_gansu.htm"},
{"name":"青海","code":"1566300000","url":"http://www.xinhuanet.com/dzxw2/iframe_qinghai.htm"},
{"name":"宁夏","code":"1566400000","url":"http://www.xinhuanet.com/dzxw2/iframe_ningxia.htm"},
{"name":"新疆","code":"1566500000","url":"http://www.xinhuanet.com/dzxw2/iframe_xinjiang.htm"},
{"name":"内蒙古","code":"1561500000","url":"http://www.xinhuanet.com/dzxw2/iframe_neimenggu.htm"},
{"name":"黑龙江","code":"1562300000","url":"http://www.xinhuanet.com/dzxw2/iframe_heilongjiang.htm"}
];

$(function(){
    localItem.clickEven();
    regionalNews.init();
});
// cookie
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};





// 区域新闻
var localItem = {
    clickEven:function(){
        $("#FirRegional").click(function(){
            $("#localItem .selectList").slideToggle();
			
			if($("#FirRegional i").hasClass("iconDown")){
				$("#FirRegional i").removeClass("iconDown").addClass("iconUp");
			}else{
				$("#FirRegional i").removeClass("iconUp").addClass("iconDown");
			}
			
        });
		$("#localItem .selectList a").click(function(){
			var areaName = $(this).html()+"新闻";
			var areaLink = $(this).attr("name");
			if(areaName!=="关闭新闻"){
				$("#itemName a").html(areaName).attr("href",areaLink).attr("target","_blank");
			}
			if(areaName!=="关闭新闻" && areaName=="全国新闻"){
				$("#itemName a").html(areaName).attr("href",areaLink).attr("target","");
			}
		});
    }
};

/*var _qgUlr = "http://www.xinhuanet.com/dzxw2/iframe_local.htm";*/
var _qgUlr = "http://www.xinhuanet.com/dzxw2/iframe_quyu.htm";
var regionalNews = {
    init:function(){
        var cookie_regionalNews = $.cookie("xh_regionalNews_v1");
        var cookie_help = $.cookie("xh_cookie_help");
        if(cookie_help){
            $(".dzhelp").hide();
        }
        if (cookie_regionalNews) {
			if(cookie_regionalNews!=99)
            {regionalNews.changeSrc(cookie_regionalNews);}
			}
		else{
			regionalNews.iptz();
		}
		regionalNews.changeClick();
    },
	setDefaultName:function(num){
		var areaName = pdip[num].name+"新闻";
		var areaLink = $("#localItem .selectList a").eq(num).attr("name");
		$("#itemName a").html(pdip[num].name+"新闻").attr("href",areaLink).attr("target","_blank");
	},
    changeSrc:function (dzxw){
        $("#regionalNews").attr("src",pdip[dzxw].url);
		regionalNews.setDefaultName(dzxw);
    },
    iptz:function (){    
		var url = "http://t.home.news.cn/ip/getIpInfo.js"; 

		$.getScript(url, function(){
			var codestr = _ipinfo_data["code"];
			if (codestr=='0')
			{
				var area=_ipinfo_data["data"].region_id;
				//console.log(area);
				for(var i=0;i<pdip.length; i++){
					if( area == pdip[i].code){
						$("#regionalNews").attr("src",pdip[i].url);
						
						regionalNews.setDefaultName(i);
						
						$.cookie( "xh_regionalNews_v1" , i , { path: '/', expires: 7 });
						console.log(area);
						break;
					}
					else{
						$("#regionalNews").attr("src",_qgUlr);
					}   
				}
			}
			else{
				//console.log("nononono");
				$("#regionalNews").attr("src",_qgUlr);
			}
		});
    },
    changeClick:function(){
        $("#localItem .selectList li").click(function(){
			if($(this).hasClass("del")){
				$("#FirRegional i").removeClass("iconUp").addClass("iconDown");
				$("#localItem .selectList").hide();
			}
			else{
				var _index = $(this).index();
				$("#FirRegional i").removeClass("iconUp").addClass("iconDown");
				$("#localItem .selectList").hide();
				$("#regionalNews").attr("src",pdip[_index].url);
				$.cookie( "xh_regionalNews_v1" , _index , { path: '/', expires: 7 });
				return false;
			}
        });
        $("#FirRegional a").click(function(){
            var _index = $(this).attr("name");
            $("#regionalNews").attr("src",pdip[_index].url);
            $.cookie( "xh_regionalNews_v1" , _index , { path: '/', expires: 7 });
            return false;
        });
    }
};

// setcookie
var setCookies = {
    init:function(){
        $(".dzhelp").click(function(){
            $.cookie( "xh_cookie_help" , "true" , { path: '/', expires: 7 });
        })
    }
};



