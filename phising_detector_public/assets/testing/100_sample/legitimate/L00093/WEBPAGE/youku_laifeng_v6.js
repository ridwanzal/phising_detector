(function(){

    var _isRequest = false,
        lf_live_data = [],
        _rate = 10;


    ready(function(){
        bind(window,'scroll',function(){
            loadLaifeng();
        });
        loadLaifeng();
    });

    //来自大数据
    window.comeBigDataToLaifeng = function(data) {
        var _data = data.data;
        for(var i=0,len=_data.length;i<len;i++) {
            lf_live_data.push({
                nickName:_data[i].title,
                coverW400H225:_data[i].picUrl,
                clickLogUrl:_data[i].clickLogUrl,
                roomUrl:_data[i].playLink,
                userCount:_data[i].onlineAmount,
                status:_data[i].status,
                livehouse:_data[i].livehouse
            });
        }
        readData(true);
    }

    //获取随机数
    function getRandom() {
        var _r = Math.floor(Math.random()*10);
        if(_r<_rate) return true;
        return false;
    }


    function loadLaifeng() {
        if(_isRequest) return false;
        var _laifeng = document.getElementById('LAIFENG_REQUEST');
        var _top = _laifeng.parentNode.parentNode.parentNode.offsetTop;
        var ele = (document.documentElement && document.documentElement.scrollTop)?document.documentElement:document.body;
        if(ele.scrollTop+800>_top) {
            _isRequest = true;
            if(getRandom()) {
                xmloadingjs('http://cms.laifeng.com/cms/youku/home_channel/v2?_t='+new Date().getTime(),function(){
                    lf_live_data = window.lf_live_data;
                    readData();
                });
            }
            else {
                var _uid  = Nova.Cookie.get('yktk')?(decode64(decodeURIComponent(Nova.Cookie.get('yktk')).split('|')[3]).split(',')[0].split(':')[1]):'';
                var _guid = Nova.Cookie.get('__ysuid')?Nova.Cookie.get('__ysuid'):'';
                xmloadingjs('http://ykatr.youku.com/atr/related/packed_list.json?site=1&uid='+_uid+'&guid='+_guid+'&apptype=1&pg=8&module=15&pl=7&oc=lf_drawer&callback=comeBigDataToLaifeng&_t='+new Date().getTime(),function(){});
            }
        }
    }

    function readData(toLog) {
        var _xm_container = document.getElementById('LAIFENG_REQUEST');
        if(!_xm_container || typeof lf_live_data=='undefined') return;
        var data = lf_live_data;
        var html = '';
        //左侧
        html+='<div class="yk-w970-col12 yk-w1190-col16 yk-drawer-box"><div class="yk-box">';
        html+='<div class="yk-head">'+
                '<div class="yk-title">'+
                        '<a target="_blank" href="http://cps.laifeng.com/redirect.html?id=00014089&url=http%3A%2F%2Fwww.laifeng.com%2F" class="yk-drawer-title"><img src="http://static.youku.com/ddshow/img/youku/laifeng.png">来疯互动直播</a>'+
                '</div>'+
            '</div>';
        html+='<div class="yk-body"><div class="yk-v-190"><div class="yk-row">'+loadConnect(data,toLog)+'</div></div></div>';
        html+='</div></div></div>';
        //右侧
        html+='<div class="yk-col6"><div class="yk-side-range"><div class="yk-box"><div class="yk-body">';
        html+=loadRank(data,4,toLog)+'</div></div></div></div>';
        //
        html+='<div class="yk-drawer-act">'+
            '<i class="act-btn uhome-ico uhome-ico-dots" data-stat-role="ck"></i>'+
            '<div class="act-list">'+
                '<span class="act-item item-totop" data-stat-role="ck">置顶</span>'+
                '<span class="act-item item-hide" data-stat-role="ck">隐藏</span>'+
            '</div>'+
        '</div>';
        _xm_container.innerHTML = html;
        //绑定统计
        if(toLog) {
            var eles = _xm_container.getElementsByTagName('a');
            for(var i=0,len=eles.length;i<len;i++) {
                bind(eles[i],'click',function(){
                    if(this.getAttribute('logsrc')) {
                        var img = new Image();
                        img.src = this.getAttribute('logsrc');
                    }
                });
            }
        }
    }

    //加载内容体
    function loadConnect(DATA,toLog) {
        var _html = '';
        for(var i=0;i<Math.min(DATA.length,4);i++) {
                var data = DATA[i],
                    _log = '';
                if(toLog) {
                    _log = 'logsrc="'+data.clickLogUrl+'"';
                }
                if(i==3) {
                    _html+='<div class="yk-col4 yk-w970-hide">';
                }
                else {
                    _html+='<div class="yk-col4">';
                }
                _html+='<div class="v">'+
                        '<div class="v-thumb">'+
                        '<img alt="'+data.nickName+'" src="'+data.coverW400H225+'">';
                if(data.status==1) {
                    _html+='<div style="background:url(http://r4.ykimg.com/0510000052B92FFA6714C031CB064428) no-repeat;height:32px;position: absolute;right: 0;top: 0;width: 33px;"></div>';
                }
                _html+='</div>'+
                        '<div class="v-link">'+
                        '<a title="'+data.nickName+'" target="_blank" href="'+data.roomUrl+'" '+_log+'></a>'+
                        '</div>'+
                        '<div class="v-meta va">'+
                        '<div class="v-meta-title">'+
                        '<a target="_blank" href="'+data.roomUrl+'" '+_log+'>'+data.nickName+'</a>'+
                        '</div>'+
                        '<div class="v-meta-entry">'+
                        '<i title="播放" class="ico-statplay"></i><span class="v-num">';
                if(data.status==1 && !data.livehouse){
                    _html+=data.userCount+'人正在观看';
                }else{
                    _html+='<a target="_blank" href="'+data.roomUrl+'" '+_log+'>查看详情</a>';
                }
                _html+='</span></div>'+
                       '</div></div></div>';
            }
            return _html;
    }

    //加载排行榜
    function loadRank(DATA,n,toLog) {
        var html = '';
        if(DATA.length<=n) return html;
        for(var i=n;i<Math.min(DATA.length,7);i++) {
            var data = DATA[i],
                _log = '';
            if(toLog) {
                _log = 'logsrc="'+data.clickLogUrl+'"';
            }
            html+='<div class="v v-mini v-horiz" >';
            html+='<div class="v-thumb"><img alt="'+data.nickName+'" src="'+data.coverW400H225+'">';
            html+='</div>';
            html+='<div class="v-link"><a href="'+data.roomUrl+'" target="_blank" title="'+data.nickName+'" '+_log+'></a></div>';
            html+='<div class="v-meta">'+
                    '<div class="v-meta-title">'+
                        '<a href="'+data.roomUrl+'" target="_blank"  '+_log+'>'+data.nickName+'</a>'+
                    '</div>'+
                    '<div class="v-meta-entry"><span>';
            if(data.status==1 && !data.livehouse){
                html+=data.userCount+'人正在观看';
            }
            html+='</span></div></div></div>';
        }
        return html;
    }

    function xmloadingjs(url,callback,id) {
        var road = document.createElement('script');
        road.type = 'text/javascript';
        road.src = url;
        if(typeof id !='undefined') road.id = id;
        document.getElementsByTagName('head')[0].appendChild(road);
        if(road.readyState) {
            road.onreadystatechange = function() {
                if(road.readyState == 'loaded' || road.readyState == 'complete') {
                    road.onreadystatechange = null;
                    if(callback && Object.prototype.toString.call(callback)==='[object Function]') callback(road);
                }
            }
        }
        else {
            road.onload = function() {
                callback(road);
            }
        }
    }

    function bind(ele, name, fn) {
        if (ele.attachEvent) {
            ele['e' + name + fn] = fn;
            ele[name + fn] = function () {
                ele['e' + name + fn](window.event);
            }
            ele.attachEvent('on' + name, ele[name + fn]);
        }
        else ele.addEventListener(name, fn, false);
    }

    //返回元素的位置
    function LFpos(el) {
        if(el.parentNode === null || el.style.display == 'none') return false;
        var parent = null,pos = [],box;
        if (el.getBoundingClientRect) {
            box = el.getBoundingClientRect();
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            return {
                x: box.left + scrollLeft,
                y: box.top + scrollTop
            };
        }
        else 
            if (document.getBoxObjectFor) {
                box = document.getBoxObjectFor(el);
                var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
                var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
                pos = [box.x - borderLeft, box.y - borderTop];
            }
            else {
                pos = [el.offsetLeft, el.offsetTop];
                parent = el.offsetParent;
                if (parent != el) {
                    while (parent) {
                        pos[0] += parent.offsetLeft;
                        pos[1] += parent.offsetTop;
                        parent = parent.offsetParent;
                    }
                }
                if(!window.opera || (!(navigator.userAgent.indexOf('Safari') >= 0) && el.style.position == 'absolute')) {
                     pos[0]-= document.body.offsetLeft;
                     pos[1]-= document.body.offsetTop;
                 } 
            }
            if(el.parentNode) {
                parent = el.parentNode;
            } 
            else {
                parent = null;
            }
            while(parent && parent.tagName.toUpperCase() != 'BODY' && parentName.toUpperCase() !='HTML'){
                pos[0]-=parent.scrollLeft;
                pos[1]-=parent.scrollTop;
                if(parent.parentNode) {
                    parent = parent.parentNode;
                }
                else parent = null;
            }
        return {x:pos[0],y:pos[1]};
    }

    //DOM加载完毕
    function ready(func, win, doc) {
        var win = win || window;
        var doc = doc || document;
        var loaded = false;
        var readyFunc = function () {
            if (loaded) return;
            loaded = true;
            func();
        };
        if (doc.addEventListener) {
            bind(doc, 'DOMContentLoaded', readyFunc);
        } else if (doc.attachEvent) {
            bind(doc, 'readystatechange', function () {
                if (doc.readyState == 'complete' || doc.readyState == 'loaded') readyFunc();
            });
            if (doc.documentElement.doScroll && typeof win.frameElement === 'undefined') {
                var ieReadyFunc = function () {
                    if (loaded) return;
                    try {
                        doc.documentElement.doScroll('left');
                    } catch (e) {
                        window.setTimeout(ieReadyFunc, 0);
                        return;
                    }
                    readyFunc();
                };
                ieReadyFunc();
            }
        }
        bind(win, 'load', readyFunc);
    }

})();
