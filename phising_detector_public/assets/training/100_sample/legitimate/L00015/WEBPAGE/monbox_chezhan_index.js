/**
 * 广告日程判断
 * @param {Mix} ranges 排期时间段，可以是一个字符串，或者一个数据，表示多个时间段例如:
 * [
 *   '2013-6-21',                              //2013-6-21全天
 *   '2013-6-22~2013-6-23',                    //2013-6-22到2013-6-23全天
 *   '2013-6-24 12:3:4~2013-6-25 12:13:20',    //2013-6-24 12:3:4到2013-6-25 12:13:20
 *   '9:00:00~12:59:59',                       //每天9:00:00到12:59:59
 *   '9:00:00~8:59:59'                         //9:00:00 到第二天早上 8:59:59
 * ] 或者
 * 其中一个字符串当参数
 *
 * @usage
 *   var schedule = new Schedule(ranges);
 *   检查是否在排期内的方法
 *   schedule.check('2013-06-21 6:0:0');  一个Date对象或者日期字符串即可
 */
function Schedule(ranges) {
    ranges = 'string' === typeof ranges ? [ranges] : ranges || [];

    this.ranges = [];

    var range,
        i = 0,
        len = ranges.length,
        start,
        end,
        now = new Date(),
        todayStr = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();

    for (; i < len; i++) {
        range = ranges[i].replace(/\-/g, '/').split('~');

        start = range[0];
        end = range[1] ? range[1] : range[0]; //"2013-6-21" -> "2013-06-21, 2013-06-21"

        //"2013-6-21" -> '2013-6-21 0:0:0'
        if (start.indexOf(':') === -1) {
            start += ' 0:0:0';
        }
        if (end.indexOf(':') === -1) {
            end += ' 23:59:59';
        }

        //"10:0:0" -> "2013-6-21 10:0:0" today 10:0:0
        if (start.indexOf('/') === -1) {
            start = todayStr + ' ' + start;
        }
        if (end.indexOf('/') === -1) {
            end = todayStr + ' ' + end;
        }

        start = +this.parse(start);
        end = +this.parse(end);

        //后面的时间比前面的小，则表明跨天，增加一天时间
        if (end <= start) {
            end += 1000 * 60 * 60 * 24;
        }

        this.ranges[i] = [start, end];
    }
}

Schedule.prototype = {
    /**
     * 检查是否在日程范围内
     * @param  {String | Date} time 要检查的日期
     * @return {Boolean}            是否在日程内
     */
    check: function(time) {
        var ranges = this.ranges,
            i = 0,
            range,
            result = ranges.length <= 0,
            time = time ? (+this.parse(time)) : (+new Date()); //没给时间，使用当前时间检查

        while (!result && (range = ranges[i++])) {
            result = time >= range[0] && time <= range[1];
        }
        return result;
    },
    /**
     * 解析方法
     * @tangram T.date.parse
     */
    parse: function(time) {
        var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
        if ('string' == typeof time) {
            if (reg.test(time) || isNaN(Date.parse(time))) {
                var d = time.split(/ |T/),
                    d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
                    d0 = d[0].split(/[^\d]/);
                return new Date(d0[0] - 0,
                    d0[1] - 1,
                    d0[2] - 0,
                    d1[0] - 0,
                    d1[1] - 0,
                    d1[2] - 0);
            } else {
                return new Date(time);
            }
        }

        return time;
    }
};

/*
 //usage
 //test 2013-6-21
 var schedule = new Schedule([
 //'2013-6-21',                              //2013-6-21全天
 //'2013-6-22~2013-6-23',                    //2013-6-22到2013-6-23全天
 //'2013-6-24 12:3:4~2013-6-25 12:13:20',    //2013-6-24 12:3:4到2013-6-25 12:13:20
 //'9:00:00~12:59:59',                        //每天9:00:00到12:59:59
 '9:00:00~8:59:59'                         //9:00:00 到第二天早上 8:59:59
 ]);
 schedule.check(+new Date('2013/6/21 8:0:0'));
 */

(function() {
    /**
     * 跨子域存储，ie6,7使用user data存储，其它浏览器使用localstorage
     * @example
     *    // sina.com.cn域,数据存在news.sina.com.cn下
     *      var Store = window.___CrossDomainStorage___;
     *    Store..ready(function(st){
     *      st.set('key','value');
     *      var data = st.get('key');
     *    });
     *    // 如果用于非sina.com.cn域，需要设置，如
     *    Store.config({
     *      // 设置顶级域
     *      domain:'weibo.com',
     *      // 发布和http://news.sina.com.cn/iframe/87/store.html一样的代理页面，以后数据都存在data.weibo.com下
     *      url:'data.weibo.com/xx/xx/store.html'
     *    }).ready(function(st){
     *      st.set('key','value');
     *      var data = st.get('key');
     *    });
     */
    ;
    (function(exports, name) {
        var fns = [];
        var isReady = 0;
        var iframeStore = null;
        var EXPORTNAME = name || '___SinaadsMonBoxCrossDomainStorage___';
        var HANDLE = EXPORTNAME + '.onReady';
        var opt = {
            domain: 'sina.com.cn',
            url: 'http://d2.sina.com.cn/litong/zhitou/adJs/store.html'
        };
        var ERROR = {
            domain: 'fail to set domain!'
        };
        var loadStore = function() {
            if (iframeStore) {
                return;
            }
            try {
                document.domain = opt.domain;
            } catch (e) {
                throw new Error(ERROR.domain);
            }
            var node = document.getElementById(EXPORTNAME);
            if (node) {
                node.parentNode.removeChild(node);
            }
            var iframeWrap = document.createElement('div');
            var doc = document.body;
            var iframe = '<iframe src="' + opt.url + '?handle=' + HANDLE + '&domain=' + opt.domain + '" frameborder="0"></iframe>';
            var px = '-' + 1e5 + 'em';
            iframeWrap.style.position = 'absolute';
            iframeWrap.style.left = px;
            iframeWrap.style.top = px;
            iframeWrap.className = 'hidden';
            iframeWrap.id = EXPORTNAME;
            iframeWrap.innerHTML = iframe;
            doc.insertBefore(iframeWrap, doc.childNodes[0]);
        };

        var checkReady = function() {
            if (!isReady) {
                loadStore();
            }
            return isReady;
        };
        var CrossDomainStorage = {};
        CrossDomainStorage.ready = function(fn) {
            if (!checkReady()) {
                //ifrmae还没加载
                fns.push(fn);
                return;
            }
            fn(iframeStore);
        };
        CrossDomainStorage.onReady = function(store) {
            if (isReady) {
                return false;
            }
            isReady = 1;
            iframeStore = store;
            if (fns) {
                while (fns.length) {
                    fns.shift()(store);
                }
            }
            fns = null;
        };
        CrossDomainStorage.config = function(o) {
            if (!o) {
                return false;
            }
            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    opt[i] = o[i] || opt[i];
                }
            }
            return this;
        };
        exports[EXPORTNAME] = CrossDomainStorage;
    })(window);
})();
setTimeout(function() {

//    var date = new Date();
//    if(date.getDay() === 6 || date.getDay() === 0) {
//        return false;
//    }

    if(!new Schedule(['2016-4-25~2016-4-26','2016-4-30~2016-5-4']).check()){
        return false;
    }
    sinaadToolkit.sio.loadScript('http://d1.sina.com.cn/litong/zhitou/sinaads/demo/jiliang/monboxMedia_chezhan.js', function() {
        var scheduleTimeAM = new Schedule([
                '08:59:59~10:59:59'
            ]),
            scheduleTimePM = new Schedule([
                '14:59:59~16:59:59'
            ]),
            chezhanShowLimit = 3,
            chezhanShow,
            chezhanTime,
            Store = window.___SinaadsMonBoxCrossDomainStorage___;
        try {
            document.execCommand('BackgroundImageCache', false, true);
        } catch (e) {}

        if (scheduleTimeAM.check() || scheduleTimePM.check()){
            Store.ready(function(st) {
                var timeOut = (typeof st.get('chezhanTime') !== 'undefined' ? st.get('chezhanTime') : (+new Date())),
                    check = (+new Date()) - timeOut;
                if (check > 2 * 60 * 60 * 1000) {
                    st.set('chezhan', 1);
                }
                chezhanShow = (typeof st.get('chezhan') !== 'undefined' ? st.get('chezhan') : 1);

                if (chezhanShowLimit > chezhanShow) {
                    var monbox = new sinaadToolkit.MonBoxMediaCheZhan({});
                    monbox.show();
                    st.set('chezhan', (chezhanShow + 1));
                    st.set('chezhanTime', +new Date());
                }
            });
        }
    });
},3000);