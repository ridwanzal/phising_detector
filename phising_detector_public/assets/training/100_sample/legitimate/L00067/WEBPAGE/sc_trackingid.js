(function(_W,_D,_L,_N){
	if(typeof jQuery=="undefined"){
		return 0;
	}
	if(typeof s=="undefined"){
		s_setL2id=new Function();
	}
	var $=jQuery;
	var getLayoutInfo=function(){
		return _D.getElementsByName("viewport").length?"SP":"PC";
	};
	var getNormalize=function(str){
		return str.replace(/[\#\.]+/g,"/").replace(/[^0-9A-Za-z\/\-]+/g,"").substring(0,10);
	};

	$.fn.trackingid=function(channel,func,option){
		try{
			if(this.length==0){
				return -1;
			}
			if(channel||func){
				channel=getNormalize(channel);
				func=getNormalize(func);
			}else{
				return -2;
			}
			var layout=getLayoutInfo();
			var parts=getNormalize(this.selector.split(' ')[0]);
			var cnt=0;
			var opt;
			
			if(option==1||option=='1'){
				opt=function(tag){
					var _t=$(tag).attr("id");
					if(!_t){
						return "null";
					}
					return getNormalize(_t);
				}
			}else if(typeof option=="string"){
				opt=function(){
					return getNormalize(option);
				}
			}else{
				opt=function(){
					return ++cnt;
				}
			}
			$(this).find('a').each(function(){
				var hash='';
				var param;
				var href=$(this).attr("href")||"";
				if(!href||href.indexOf("s-id=")>1||href.indexOf("l2-id=")>1){
					return;
				}
				if(href.indexOf('#')>1){
					_t=href.split('#');href=_t[0];hash='#'+_t[1];
				}
				if(href.indexOf('?')>1){
					param='&';
				}else{
					param='?';
				}
				if(href.split('/')[2]=="item.rakuten.co.jp"){
					param+="s-id=";
				}else{
					param+="l2-id=";
				}
				paramOrg=channel+'_'+layout+'_'+func+'_'+parts+'_'+opt(this);
				param+=paramOrg;
				$(this).click(function(){
					s_setL2id(paramOrg);
					_L.href=href+param+hash;
					return false;
				});
			});
		
		}catch(e){
			return -10;
		}
		return 1;
	}

if(typeof s=="undefined"){
	return -50;
}

$.fn.trackingidClick=function(channel,func,option,events){
	try{
		if(this.length==0){
			return -1;
		}
		if(channel||func){
			channel=getNormalize(channel);func=getNormalize(func);
		}else{
			return -2;
		}
		var layout=getLayoutInfo();
		var parts=getNormalize(this.selector.split(' ')[0]);
		var cnt=0;
		var opt;
		if(option==1||option=='1'){
			opt=function(tag){
				var _t=$(tag).attr("id");
				if(!_t){
					return "null"
				}
				return getNormalize(_t);
			}
		}else if(typeof option=="string"){
			opt=function(){
				return getNormalize(option);
			}
		}else{
			opt=function(){
				return ++cnt;
			}
		}
		var s=s_gi(s_account);
		s.linkTrackVars="prop6,prop33,eVar4,eVar6,eVar15,events";
		s.prop33=channel+'_'+layout+'_'+func+'_'+parts;
		if(typeof events!="undefined"){
			s.events=events;
		}else{
			s.events="";
		}
		var domain=_L.hostname;
		$(this).each(function(){
			var temp=opt(this);
			$(this).click(function(){	
				switch(domain){
					case "item.rakuten.co.jp":
						s.eVar3=s.prop33+'_'+temp;
						break;
					case "basket.step.rakuten.co.jp":
						break;
					default:
						s.eVar4=s.prop33;
						s.eVar15=s.prop33+'_'+temp;
						break;
				}			
				s.prop6=s.prop33+'_'+temp;
				s.tl(this,'o',channel); 
				return true;
			});
		});
		
	}catch(e){
		return -10;
	}
	return 1;
}

$.fn.trackingPartsCounter=function(partsName){
	try{
		$(this).delegate('a',"click",function(){
			s_partsCounter(partsName);
		});
	}catch(e){
		return -10;
	}
	return 1;
}

_W.ontrackingidAjax=function(channel,func,parts,option,events){
	try{
		if(arguments.length<3){
			return -1;
		}
		if(channel&&func&&parts){
			channel=getNormalize(channel);
			func=getNormalize(func);
			parts=getNormalize(parts);
		}else{
			return -2;
		}
		var layout=getLayoutInfo();
		var s=s_gi(s_account);
		s.linkTrackVars="prop6,prop33,eVar4,eVar6,eVar15,events";
		if(typeof option!="undefined"){
			option='_'+option;
		}else{
			option='';
		}
		s.prop33=channel+'_'+layout+'_'+func+'_'+parts;
		if(typeof events!="undefined"){
			s.events=events;
		}else{
			s.events='';
		}
		switch(_L.hostname){
			case "item.rakuten.co.jp":
				s.eVar3=s.prop33;
				break;
			case "basket.step.rakuten.co.jp":
				break;
			default:
				s.eVar4=s.prop33;
				s.eVar15=s.prop33+option;
				break;
		}			
		s.prop6=s.prop33+option;
		s.tl(this,'o',channel); 
	
	}catch(e){
		return -10;
	}
	return 1;
}

_W.oncountingEventAjax=function(event){
	try{
		if(!event){
			return -1;
		}
		s.linkTrackVars="events";
		s.linkTrackEvents="event"+event;
		s.events=s.apl(s.events,"event"+event)
		s.tl(this,'o',"oncountingEventAjax"); 	
	}catch(e){
		return -10;
	}
	return 1;
}

$.fn.trackingSelectorId=function(option){
	try{
		var domain = _L.hostname.replace(".rakuten.co.jp","");
		var layout;
		if(typeof sc_layout != "undefined"){
			layout = sc_layout;
		}
		if(!layout){
			layout = getLayoutInfo();
		}
		var page = "/" + _L.pathname.split("/")[1];
		var className = this.className;
		if(!className){
			className="top";
		}else{
			className;
		}
		var cnt=0;
		var opt;
		if(option==1||option=='1'){
			opt=function(tag){
				var _t=$(tag).attr("id");
				if(!_t){
					return "null"
				}
				return getNormalize(_t);
			}
		}else if(typeof option=="string"){
			opt=function(){
				return getNormalize(option);
			}
		}else{
			opt=function(){
				return ++cnt;
			}
		}
		$(this).each(function(){
			var temp=opt(this)
			$(this).click(function(){ 
				var className=this.className;
				var bmkInfo=domain+"_"+layout+"_"+page+"_"+className+"_"+temp;
				var s=s_gi(s_account);
				s.linkTrackVars="events,prop10";
				s.linkTrackEvents="event35";
				s.prop10=bmkInfo;
				s.events="event35";
				s.tl(this,'o',"bookmark");
			});
		});
		
	}catch(e){
		return -1
	};
}

}(window,document,location,navigator));
