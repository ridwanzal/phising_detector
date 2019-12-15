(function() {
    var setCookie = function (key, value, options) {
        options = options || {};

        // 计算cookie过期时间
        var expires = options.expires;
        if ('number' === typeof options.expires) {
            expires = new Date();
            expires.setTime(expires.getTime() + options.expires);
        }
        document.cookie =
            key + "=" + value +
            (options.path ? "; path=" + options.path : "") +
            (expires ? "; expires=" + expires.toGMTString() : "") +
            (options.domain ? "; domain=" + options.domain : "") +
            (options.secure ? "; secure" : '');

    }
    
    
    var addEvent = function(obj, eventType, func) {
        if(obj.attachEvent) {
            obj.attachEvent("on" + eventType, func);
        } else {
            obj.addEventListener(eventType, func, false);
        }
    };
    /**
     * 定向标识(点击后种下)
     * @param  {String} 文字链的容器id
     * @param  {String} 标识值
     * @param  {String} 点击监测 
     */
    var sinaads_entry_fn = function(id,value,url){
        var links;
        try {
            links = document.getElementById(id).getElementsByTagName("a");
        }catch(e) {
            links = [];
        }
        
        for (var i = 0, len = links.length; i < len; i++) {
            //不是商广节点, 这里有时序关系，如果广告先加载，会获取到广告，如果广告后加载，这里就不会被注入
            if ('INS' === links[i].parentNode.tagName.toUpperCase() && links[i].parentNode.className.indexOf('sinaads') !== -1) {
            } else {
                addEvent(links[i], "mousedown", function() {
                    setCookie("sinaads_entry",value,{"path":"/","domain":".sina.com.cn","expires":24*3600000}); 
                    //点击监测
                    if(url){
                        var _clickStat = new Image();
                        _clickStat.src = url + "&_=" + new Date().getTime() + "&url=";
                    }
                });
            }
        }
        
    }
    
    //要闻区定向
    sinaads_entry_fn("syncad_1","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,533936,539210&cid=0,0,0&sid=540113&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_2","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,534288,539558&cid=0,0,0&sid=540487&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_3","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,534289,539559&cid=0,0,0&sid=540488&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_4","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,539990,545264&cid=0,0,0&sid=546428&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_0","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,547080,552353&cid=0,0,0&sid=553716&advid=358&camid=69129&show=ignore");

    //要闻区B版定向
    sinaads_entry_fn("syncad_1_B","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,533936,539210&cid=0,0,0&sid=540113&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_2_B","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,534288,539558&cid=0,0,0&sid=540487&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_3_B","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,534289,539559&cid=0,0,0&sid=540488&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_4_B","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,539990,545264&cid=0,0,0&sid=546428&advid=358&camid=69129&show=ignore");
    sinaads_entry_fn("syncad_0_B","jnc","http://sina.allyes.com/main/adfclick?db=sina&bid=372535,547080,552353&cid=0,0,0&sid=553716&advid=358&camid=69129&show=ignore");

    
    //财经板块定向
    //sinaads_entry_fn("blk_finance_1","abc","http://sina.allyes.com/main/adfclick?db=sina&bid=202406,581303,586578&cid=0,0,0&sid=589122&advid=358&camid=36885&show=ignore");
    //sinaads_entry_fn("blk_finance_2","abc","http://sina.allyes.com/main/adfclick?db=sina&bid=202406,581309,586584&cid=0,0,0&sid=589128&advid=358&camid=36885&show=ignore");
    //sinaads_entry_fn("blk_finance_3","abc","http://sina.allyes.com/main/adfclick?db=sina&bid=202406,581310,586585&cid=0,0,0&sid=589129&advid=358&camid=36885&show=ignore");
    //新增古井贡酒(2014-09-01至2014-09-30)
    sinaads_entry_fn("blk_finance_1","gujinggongjiu");
    sinaads_entry_fn("blk_finance_2","gujinggongjiu");
    sinaads_entry_fn("blk_finance_3","gujinggongjiu");
})();