//新华网统计代码全局对象
window._xh_st_global_obj={};

window._xh_st_global_obj.fetch_url="http://da.xuan.news.cn";

window._xh_st_global_obj.cross_domain_news_cn="http://da.xuan.news.cn/setcke";

window._xh_st_global_obj.cross_domain_xinhuanet_com="http://t.xinhuanet.com/setcke";

window._xh_st_global_obj.get_top_domain_fn=function(str){

			if (!str) return '';

			if (str.indexOf('://') != -1) str = str.substr(str.indexOf('://') + 3);

			var topLevel = ['com', 'net', 'org', 'gov', 'edu', 'mil', 'biz', 'name', 'info', 'mobi', 'pro', 'travel', 'museum', 'int', 'areo', 'post', 'rec'];

			var domains = str.split('.');

			if (domains.length <= 1) return str;

			if (!isNaN(domains[domains.length - 1])) return str;

			var i = 0;

			while (i < topLevel.length && topLevel[i] != domains[domains.length - 1]) i++;

			if (i != topLevel.length){

				return domains[domains.length - 2] + '.' + domains[domains.length - 1];
				
			}else{

				i = 0;
				
				while (i < topLevel.length && topLevel[i] != domains[domains.length - 2]) i++;
				
				if (i == topLevel.length){
				
					return domains[domains.length - 2] + '.' + domains[domains.length - 1];
				
				}else{
				
					return domains[domains.length - 3] + '.' + domains[domains.length - 2] + '.' + domains[domains.length - 1]
				
				}
				
			}
			
	};

window._xh_st_global_obj.current_top_domain=window._xh_st_global_obj.get_top_domain_fn(document.domain);

window._xh_st_global_obj.cookie_obj={
	set_fn:function(_name,_value,_expires,_path,_domain){
		_expires=_expires?_expires:0;
		_path=_path?_path:'';
		_domain=_domain?_domain:'';
		var _str=_name+'='+_value;
		if(_expires>0)
		{
			var _date=new Date();
			_date.setTime(_date.getTime()+_expires*3600*1000);
			_str+=';expires='+_date.toGMTString();
		}
		if(_path!='')
		{
			_str+=';path='+_path;
		}
		if(_domain!='')
		{
			_str+=';domain='+_domain;
		}
		document.cookie=_str;
	},
	get_fn:function(_name){
		var _str=document.cookie.split('; ');
		var _str_index_of=-2;
		var _str_i="";
		var _str_left="";
		var _str_right="";
		if(_str.length<=0)
		{
			return '';
		}
		for(var i=0,len_i=_str.length;i<len_i;i++)
		{
			_str_i=_str[i];
			if(_str_i!='')
			{
				_str_index_of=_str_i.indexOf("=");
				_str_left=_str_i.substring(0,_str_index_of);
				_str_right=_str_i.substring(_str_index_of+1).replace(/(^\"*)|(\"*$)/g,"");
				if(_str_left==_name && _str_right)
				{
					return _str_right;
				}
			}
		}
		return '';
	},
	del_fn:function(_name){
		var _date=new Date();
		_date.setTime(_date.getTime()-1000000);
		document.cookie=_name+'=;expire='+_date.toGMTString();
	}
};

window._xh_st_global_obj.cfg_2={};

//各闭包通信对象
window._xh_st_global_obj.diff_closure_connect_obj={};

//html页面中ext方法放回值
window._xh_st_global_obj.ext_return_obj={};

window._xh_st_global_obj.host_white_list_flag=/news.cn|xinhuanet.com|xinhuanet.cn|xinhua.cn|xinhua.org|gov.cn|wenming.cn/i.test(window.location.host);

//不支持cookie情况下发送数据接口
window._xh_st_global_obj.cookie_unable_url="http://da.xuan.news.cn/1.gif";