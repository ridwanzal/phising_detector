//关注明星
var cms_friends = {
	sources		: null,
	errTips		: null,
	scriptId	: '',
	preText		: '',
	tmpdiv		: null,
	friendId	: 0,

	getUserId: function() {
		var user	= get_username('all');

		return (typeof user.userid == 'undefined') ? 0 : user.userid;
	},

	follow: function(event) {
		if(!islogin()) {
			login(function() {window.location.reload()});
			return false;
		}

		var loading	= '<span class="ico__loading_16" style="width:20px;margin-left:10px;"></span>';

		this.sources	= Element.extend(Event.element(event));
		this.friendId	= this.sources.getAttribute('_uid');

		if (this.friendId == cms_friends.getUserId()) {
			cms_friends.showError('不能订阅自己!');
			return false;
		}

		this.tmpdiv		= this.sources.up('.follow_state');
		this.preText	= this.tmpdiv.innerHTML;
		this.tmpdiv.innerHTML	= loading;

		cms_friends.getJson('/QCms/~ajax/follow?uid=' + cms_friends.getUserId() + '&friend_uid=' + this.friendId, 'cms_friends.follow_callback');

		return true;
	},

	follow_callback: function(res) {
		cms_friends.tmpdiv.innerHTML	= cms_friends.preText;
		cms_friends.removeScript();

		try {
			res = (typeof res == 'object') ? res : res.stripScripts().evalJSON(1);
		} catch(e) {
			cms_friends.showError('操作失败, 请稍候再试!');
			return false;
		}

		if (res.error != 1) {
			cms_friends.showError(res.zh);
			return false;
		}

		$$('[_cmsfollow="' + cms_friends.friendId + '"]').each(function(o){o.style.display ='none';});
		$$('[_cmsfollowed="' + cms_friends.friendId + '"]').each(function(o){o.style.display = '';});
		$$('[_cmsfollowers="' + cms_friends.friendId + '"]').each(function(o){o.innerHTML = res.friend.followers_count;});

		return true;
	},

	removeScript: function() {
		var oScript	= document.getElementById(cms_friends.scriptId);
		if (oScript) {
			document.getElementsByTagName("head")[0].removeChild(oScript);
		}

		return true;
	},

	showError: function(errmsg) {
		if(!cms_friends.errTips){
			cms_friends.errTips = new Qwindow({
				title:		'',
				showmask:   false,
				size:		{width:300, height:100},
				content:	{type: 'html', value: '<div class="talk_tips" style="text-align:center;padding-top:40px;"><div class="msg"><span class="ico__info"></span><span class="txt">11</span></div></div>'}
			});	
		}
		$(cms_friends.errTips.dom.winbody).down('.txt').update(errmsg);
		cms_friends.errTips.show();
		setTimeout(function(){cms_friends.errTips.hide()}, 2000);

		return true;
	},

	callBackScript: function(){
		return true;
	},

	getJson: function(url, callBack){
		var _script		= document.createElement("script");
		_script.type	= "text/javascript";
		_script.id		= 'script_' + Date.parse(new Date()) + '_' + Math.round(Math.random() * 1000000);
		_script.src		= url + '&callback=' + callBack + '&scriptId=' + _script.id;
		cms_friends.scriptId	= _script.id;

		if (!/*@cc_on!@*/0) {
			_script.onload = cms_friends.callBackScript;
		} else {
			_script.onreadystatechange = function(){ 
				if (_script.readyState == 'loaded' || _script.readyState == 'complete') { 
					cms_friends.callBackScript();
				}
			}
		}
		document.getElementsByTagName("head")[0].appendChild(_script);

		return true;
	}
};

//关注用户
var cms_follow_videoupdate = {
	sources		: null,
	errTips		: null,
	preText		: '',
	tmpdiv		: null,
	friendId	: 0,

	getUserId: function() {
		var user	= get_username('all');

		return (typeof user.userid == 'undefined') ? 0 : user.userid;		
	},

	//单个关注
	follow: function(event) {
		if(!islogin()) {
			login({type:'cms_index_sc', callBack:'', isrefresh:true});
			return;
		}

		var loading	= '<span class="ico__loading_16" style="width:20px;margin-left:10px;"></span>';

		this.sources	= Element.extend(Event.element(event));
		this.friendId	= this.sources.getAttribute('_uid');

		if (this.friendId == cms_follow_videoupdate.getUserId()) {
			cms_follow_videoupdate.showError('不能订阅自己!');
			return false;
		}

		this.tmpdiv		= this.sources.up();
		this.preText	= this.tmpdiv.innerHTML;
		this.tmpdiv.innerHTML	= loading;

		Nova.QCms.followVideoUpdate({uid : cms_follow_videoupdate.getUserId(), friend_uid : this.friendId, follow_type: 'video_update'}, cms_follow_videoupdate.follow_callback, null);

		return true;
	},

	follow_callback: function(res) {
		cms_follow_videoupdate.tmpdiv.innerHTML	= cms_follow_videoupdate.preText;

		try {
			res = (typeof res == 'object') ? res : res.stripScripts().evalJSON(1);
		} catch(e) {
			cms_follow_videoupdate.showError('操作失败, 请稍候再试!');
			return false;
		}

		if (res.error != 1) {
			cms_follow_videoupdate.showError(res.zh);
			return false;
		}

		$$('[_cms_follow_video="' + cms_follow_videoupdate.friendId + '"]').each(function(o){o.style.display ='none';});
		$$('[_cms_followed_video="' + cms_follow_videoupdate.friendId + '"]').each(function(o){o.style.display = '';});
		$$('[_cms_followers_video="' + cms_follow_videoupdate.friendId + '"]').each(function(o){o.innerHTML = res.friend.followers_count;});

		return true;
	},

	//批量关注
	follow_batch: function(event, pageRegionModuleId) {
		if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}

		var loading		= '<span class="ico__loading_16" style="width:20px;margin-left:10px;"></span>';
		var friendUids	= $('hidBatchFollowUids_' + pageRegionModuleId).value;
		if ((friendUids !== '')) {
			friendUids	= friendUids.replace(/(^,+)|(,+$)/g, '');
		}

		this.sources	= Element.extend(Event.element(event));
		this.tmpdiv		= this.sources.up();
		this.preText	= this.tmpdiv.innerHTML;
		this.tmpdiv.innerHTML	= loading;
		this.friendId	= friendUids;
			

		Nova.QCms.followBatch({uid : cms_follow_videoupdate.getUserId(), friend_uids : '[' + this.friendId +']', mid : pageRegionModuleId}, cms_follow_videoupdate.follow_batch_callback, null);

		return true;		
	},

	follow_batch_callback: function(res) {
		cms_follow_videoupdate.tmpdiv.innerHTML	= cms_follow_videoupdate.preText;

		try {
			res = (typeof res == 'object') ? res : res.stripScripts().evalJSON(1);
		} catch(e) {
			cms_follow_videoupdate.showError('操作失败, 请稍候再试!');
			return false;
		}

		if (res.error == -302) {
			cms_follow_videoupdate.showError('你已经订阅了所有用户!');
			return true;
		} else if (res.error != 1) {
			cms_follow_videoupdate.showError(res.zh);
			return false;
		} else if ((typeof res.friends === 'undefined')) {
			cms_follow_videoupdate.showError('操作失败, 请稍候再试!');
			return false;
		}

		var objectUser		= null;
		for (var index in res.friends) {
			objectUser	= res.friends[index];
			if ((typeof objectUser.id !== 'undefined')) {
				$$('[_cms_follow_batch="' + objectUser.id + '"]').each(function(o){o.style.display ='none';});
				$$('[_cms_followed_batch="' + objectUser.id + '"]').each(function(o){o.style.display = '';});
			}
		}

		if (res.mid != undefined){
			$('nofeed' + res.mid).style.display = "none";
			$('hasfeed' + res.mid).style.display = "";
		}

		return true;
	},

	show_followed: function() {
		var userIds	= ',';
		var tmpUid	= '';
		$$('[_cms_follow_batch]').each(function(o) {
			tmpUid	 = o.readAttribute('_uid') + ',';
			userIds	+= (userIds.indexOf(tmpUid) === -1) ? tmpUid : '';
		});

		userIds	= userIds.replace(/(^,+)|(,+$)/g, '');
		if (userIds !== '') {
			Nova.QCms.showFollowedVideoUpdate({uid : cms_follow_videoupdate.getUserId(), check_followed_uids : '[' + userIds + ']'}, cms_follow_videoupdate.show_followed_callback, null);
		}
	},

	show_followed_callback: function(res) {
		try {
			res = (typeof res == 'object') ? res : res.stripScripts().evalJSON(1);
		} catch(e) {
			return false;
		}

		if ((res.error != 1) || (typeof res.target === 'undefined')) {
			return false;
		}

		var objectUser		= null;
		for (var index in res.target) {
			objectUser	= res.target[index];
			if ((typeof objectUser.id !== 'undefined') && objectUser.followed) {
				$$('[_cms_follow_batch="' + objectUser.id + '"]').each(function(o){o.style.display ='none';});
				$$('[_cms_followed_batch="' + objectUser.id + '"]').each(function(o){o.style.display = '';});
			}
		}

		return true;
	},

	showError: function(errmsg) {
		if(!cms_follow_videoupdate.errTips){
			cms_follow_videoupdate.errTips = new Qwindow({
				title:		'',
				showmask:   false,
				size:		{width:300, height:100},
				content:	{type: 'html', value: '<div class="talk_tips" style="text-align:center;padding-top:40px;"><div class="msg"><span class="ico__info"></span><span class="txt">11</span></div></div>'}
			});	
		}
		$(cms_follow_videoupdate.errTips.dom.winbody).down('.txt').update(errmsg);
		cms_follow_videoupdate.errTips.show();
		setTimeout(function(){cms_follow_videoupdate.errTips.hide()}, 2000);

		return true;
	}
};

Event.observe(window, 'load', function() {
	if (islogin()) {
		cms_follow_videoupdate.show_followed();
	} else if ((typeof callback !== 'undefined') && (callback === 'mynull')) {
		//callback define in head, used for getting follow status after login successfull
		callback	= cms_follow_videoupdate.show_followed;
	}
});
