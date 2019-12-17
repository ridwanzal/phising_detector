(function($){

var boxshowLog = {
	vReg: /^http:\/\/v\.youku\.com\/v_show\/id_([^\.]+?)(?:_\w*)?\.html/i,  // 播放页的正则
	sReg: /http:\/\/www\.youku\.com\/show_page\/id_z([^\.]+)\.html/,        // 节目页的正则
	repLogIds: {},  // 上报过的boxid
	logUrl: 'http://p.l.youku.com/personelboxshow',
	logParams: '',
	getUa : function (){
		var ua = navigator.userAgent;
		if (ua.indexOf('Android')>0) {
			return 6;
		}else if (ua.indexOf('iPad')>0) {
			return 5;
		}else if (ua.indexOf('iPhone')>0) {
			return 4;
		}else {
			return 1;
		}
	},
	init: function(){
		var uid = 0, par = [];
		if ( typeof get_username == 'function' ) {
			var uinfo = get_username('all');
			if (uinfo && uinfo.userid) uid = uinfo.userid;
		}
		par.push('uid='+uid);
		par.push('did='+this.getUa());
		par.push('pvid='+window.logPvid);
		par.push('url='+encodeURIComponent(document.URL));
		par.push('rurl='+encodeURIComponent(document.referrer));
		this.logParams = par.join('&');
	},
	reportLog: function(boxid){
		if ( this.repLogIds[boxid] ) return ;
		this.repLogIds[boxid] = 1;
		var links = $('#'+boxid).find('.v-link a'), _this = this;
		if ( links.length <= 0 ) {
			links = $('#'+boxid).find('.item a');
		}
		if ( links.length <= 0 ) {
			return ;
		}
		var vids = [], sids = [], id, matchs;
		links.each(function(i, e){
			if ( e && e.href ) {
				if ( (matchs = e.href.match(_this.vReg)) && matchs[1] ) {
					if ( id = _this.decodeVid(matchs[1]) ) vids.push(id);
				} else if ( (matchs = e.href.match(_this.sReg)) && matchs[1] ) {
					sids.push(matchs[1]);
				}
			}
		});
		var params, p = [];
		if ( vids.length > 0 ) {
			p.push('videoid='+vids.join('_'));
		}
		if ( sids.length > 0 ) {
			p.push('showid='+sids.join('_'));
		}
		if ( window.pabtest ) {
			p.push('pabtest='+window.pabtest);
		}
		params = 'bid='+boxid+'&'+this.logParams+'&ext='+encodeURIComponent(p.join('&'));
		this.request(this.logUrl+"?"+params);
	},
	request: function(url) {
		var img = new Image();
		img.onload = function(){};
		img.src = url;
	},
	decodeVid: function(vid){
		if (!vid) return false;
		return decode64(vid.toString().substr(1)) >> 2;
	},
	handleBoxShow: function(){
		var _this = this;
		$('.yk-con').children('div[boxshow!=1]').each(function(i, e){
			if ( $(e).height() && ($(window).height() + $(document).scrollTop() > $(e).offset().top + $(e).height()) ) {
				$(e).attr('boxshow', '1');
				var leftObj = $(e).find('.yk-w970-col12');
				var rightObj = $(e).find('.yk-col6');

				//左侧
				var leftTabs = leftObj.find('[contab=contab]');
				// 含有 tab
				if ( leftTabs.length > 0 ) {
					leftTabs.each(function(j, obj){
						if ( obj && obj.style.display != 'none' && $(obj).attr('bxsreport') != '1' ) {
							$(obj).attr('bxsreport', '1');
							_this.reportLog(obj.id);
						}
					});
				} else {
					_this.reportLog(e.id);
				}

				// 右侧
				var rightTabs = rightObj.find('[contab=contab]');
				if ( rightTabs.length > 0 ) {
					rightTabs.each(function(j, obj){
						if ( obj && obj.style.display != 'none' && $(obj).attr('bxsreport') != '1' ) {
							$(obj).attr('bxsreport', '1');
							_this.reportLog(obj.id);
						}
					});
				} else if ( leftTabs.length > 0 ) { // 同时左侧含有标签
					var rObj = rightObj.find('[name=m_pos]')[0];
					if ( rObj && rObj.id ) {
						_this.reportLog(rObj.id);
					}
				}
			}
		});
	},
	changeTab: function(evt){
		var target = evt.target || evt.srcElement;
		if ( target.tagName != 'LI' ) {
			target = $(target).closest('li')[0];
		}
		if ( !target || !target.id || target.id.indexOf('thtab_') !== 0 ) {
			return ;
		}
		var id = $(target).attr('tabIdx'), obj = $('#'+id), isShow = $(target).closest('[boxshow]')[0];
		if ( !id || !obj || obj.attr('contab') != 'contab' || obj.attr('bxsreport') == '1' || !isShow  ) {
			return ;
		}
		this.reportLog(id);
		obj.attr('bxsreport', '1');
	}
}

$(document).ready(function(){
	boxshowLog.init();
	boxshowLog.handleBoxShow();
	$(window).scroll(function () {
		boxshowLog.handleBoxShow();
	});

	$(document.body).delegate('li[tabidx]', 'mouseover', function(evt){
		boxshowLog.changeTab(evt);
	});
});

})(jQuery);