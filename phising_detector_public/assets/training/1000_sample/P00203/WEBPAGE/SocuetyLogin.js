// Copyright 2012 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview
 * @author sheny@made-in-china.com
 * @version v1.0
 */

;void function() {
    var SocietyLogin = function() {
        this.mapping = {
            key : null,
            name : null,
            firstName : null,
            lastName : null,
            gender : null,
            country : null,
            city : null,
            userName : null,
            email : null,
            companyName : null,
            phoneNumber : null,
            socialWebsite : null,   // LinkedIn | Facebook
            timeZone : null
        };
    };
    SocietyLogin.prototype.clsName = null;
    SocietyLogin.prototype.description = null;
    SocietyLogin.prototype.tip = null;
    SocietyLogin.prototype.fireLogin = null;
    SocietyLogin.prototype.redirect = null;
    SocietyLogin.prototype.setMapping = function(map) {
        var item;

        for (item in this.mapping) {
            if (map[item]) {
                this.mapping[item] = map[item];
            }
        }
    };
    SocietyLogin.prototype.getMapping = function(map) {
        return this.mapping;
    };
    SocietyLogin.prototype.destoryMapping = function() {
        this.mapping = {};
    };
    SocietyLogin.prototype.unidiedData = function(data) {
        var key;
        for (key in this.mapping) {
            if (this.mapping[key] && key !== 'socialWebsite') {
                this.mapping[key] = this._getValue(this.mapping[key], data);
            }
        }

        return this.mapping;
    };
    SocietyLogin.prototype.postData = function() {
        var win = window, url;
        if (top !== this) {
            win = top;
        }

        url = (this.redirect.indexOf('?') === -1 ? this.redirect + '?' : this.redirect);
        for (key in this.mapping) {
            url += '&' + key + '=' + encodeURIComponent(this.mapping[key] || '');
        }

        win.location.href = url;
    };
    SocietyLogin.prototype._getValue = function(methodNode, obj) {
        if (methodNode.indexOf('.') === -1) return (obj[methodNode] || null);
        var arr = methodNode.split('.'), value;
        for (var i = 0; i < arr.length; i++) {
            if (i === 0) {
                value = obj[arr[i]];
            } else {
                value = value ? value[arr[i]] : null;
            }
        }

        return value;
    };

    var SocietyControl = function() {
        this.carrier = null;
        this.loginPlus = [];
    };
    SocietyControl.prototype.addLogin = function(societyLogin) {
        var bol = false;
        for (var i = 0; i < this.loginPlus.length; i++) {
            if (this.loginPlus[i] === societyLogin) {
                bol = true;
            }
        }

        if (!bol) {
            this.loginPlus.push(societyLogin);
        }
    };
    SocietyControl.prototype.show = function(carrier) {
        if (!carrier) return;

        var link;
        for (var i = 0; i < this.loginPlus.length; i++) {
            link = document.createElement('a');
            link.className = this.loginPlus[i].clsName;
            link.alt = this.loginPlus[i].tip;
            link.title = this.loginPlus[i].tip;
            link.href = 'javascript:void(0);';
            link.innerHTML = '<i class="icon">'+ this.loginPlus[i].description +'</i>';
            link.onclick = this.loginPlus[i].fireLogin;
            carrier.appendChild(link);
        }
    };

    /**
     * @name Ajax
     * @class ajax异步请求封装
     * @constructor
     * @version 0.1
     * @since version 0.1
     * @param {String} method *，请求方式 GET | POST
     * @param {String} uri *，请求地址
     * @param {Function} callback *，请求完成回调函数
     * @param {String} postData 请求参数
     * @example
     * Ajax(method, uri, callback, postData)
     */
    var Ajax = (function() {
        /**
         * XMLHttp 执行完成句柄
         * @param {XMLHttpRequest} o xmlhttprequest对象
         * @param {Function} callback 回调函数
         */
        function handleReadyState(o, callback) {
            var poll = window.setInterval(function() {
                if (o && o.readyState == 4) {
                    window.clearInterval(poll);
                    if (callback) {
                        callback(o);
                    }
                }
            }, 50);
        }

        /**
         * 兼容浏览器获取对应的XMLHttpRequest
         * @return XMLHttpRequest
         */
        var getXHR = function() {
            var http;
            try {
                http = new XMLHttpRequest;
                getXHR = function() {
                    return new XMLHttpRequest;
                };
            } catch (e) {
                var msxml = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];

                for (var i = 0, len = msxml.length; i < len; ++i) {
                    try {
                        http = new ActiveXObject(msxml[i]);
                        getXHR = function() {
                            return new ActiveXObject(msxml[i]);
                        };
                    } catch (e) { }
                }
            }

            return http;
        };

        /**
         * 返回接口函数
         * @param {String} method *，请求方式 GET | POST
         * @param {String} uri *，请求地址
         * @param {Function} callback *，请求完成回调函数
         * @param {String} postData 请求参数
         */
        return function(method, uri, callback, postData) {
            var options = {
                encoding : 'utf-8'
            };
            var encoding = options.encoding ? ';charset=' + options.encoding : '';

            var http = getXHR();
            //http.setRequestHeader('Context-Type', 'application /x-www-form-urlencoded'+ encoding);
            http.open(method, uri, true);
            http.onreadystatechange = handleReadyState;
            handleReadyState(http, callback);
            http.send(postData || null);

            return http;
        };
    }());
    
    
    var adsClick = (function() {
        function a(a) {
            a = $.trim(a.attr("ads-data"));
            if ("" === a)
                return !1;
            a = a.replace(/:/g, "\x3d").replace(/,/g, "\x26");
            var b = new Image;
            b.onload = function() {
                b = null ;
                delete b
            }
            ;
            b.src = "http://stat.made-in-china.com/event/common.html?" + a + "\x26time\x3d" + (new Date).valueOf()
        }
        $("a[ads-data]").live("mousedown", function(c) {
            3 !== c.which && a($(this))
        }
        )
    }());

    /**
     * Ajax跨域获取数据
     * @param url
     * @param fn
     */
    function getCrossData(url, fn) {
        if (url.indexOf('?') === -1) {
            url += '?';
        }
        // ajax A cross-domain
        $.getJSON(url + '&jsoncallback=?', function (data) {
            fn && fn(data);
        });
    }

    /**
     * 载入第三方登录 javascript库
     * @param file
     * @param fn
     * @param attrs
     */
    function loadSDK(file, fn, attrs) {
        if (!file) return;

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = file;

        if (attrs) {
            for (var key in attrs) {
                script[key] = attrs[key];
            }
        }
        head.appendChild(script);
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    fn && fn();
                }
            };
        } else {
            script.onload = fn;
        }
    }

    /**
     * 获取地址栏参数的值
     * @param {String} name 参数key值
     */
    function queryString(name) {
        var i;
        var _strHref = window.document.location.href;
        var _intPos = _strHref.indexOf("?");
        var _strRight = _strHref.substr(_intPos + 1);

        var _arrTmp = _strRight.split("&");
        for (i = 0; i < _arrTmp.length; i++) {
            var _arrTemp = _arrTmp[i].split("=");

            if (_arrTemp[0].toUpperCase() == name.toUpperCase()) return _arrTemp[1];
        }
        return "";
    }

    /**
     * 处理回来的数据
     * @param societyLogin
     * @param {Object} data
     */
    function scAction(societyLogin, data) {
    	if(data.hasOwnProperty('error')){
    		alert('Please check the network and reclick later');
    		return;
    	}
        var map = societyLogin.unidiedData(data);
        var url = 'https://plogin.made-in-china.com/logon.do?xcase=doSocializeLogon';
        url += '&key='+ map.key +'&email='+ map.email +'&socialWebsite='+ map.socialWebsite;
        // connected && get MICAuthorize
        getCrossData(url, function(status) {
            var json = status;
            var win = window;
            /*if (status.response) {
             json = eval('('+ status.response + ')');
             }*/

            /**
             * 判断当前打开页面是否存在于iframe中
             * dm为展厅登陆的展厅地址
             * baseNextPage为首页和其他入口进入登陆页的地址
             */
            if (top !== window) {
                win = top;
            }

            if (json.status === 0) {
            	var email = map.email;
                var socialWebsite = map.socialWebsite;
                var socialWebsite = map.socialWebsite;
                societyLogin.redirect = 'https://plogin.made-in-china.com/logon.do?xcase=micLogon';
                societyLogin.destoryMapping();
                map = societyLogin.getMapping();
                map.baseNextPage = encodeURIComponent(getRedirectUrl(json.status));
                map['logonInfo.logUserName'] = email;
                map['socialWebsite'] = socialWebsite;
                societyLogin.postData();
            }

            if (json.status === 1) {
                map = societyLogin.getMapping();
                map.baseNextPage = encodeURIComponent(getRedirectUrl(json.status));
                societyLogin.postData();
            }

            if (json.status === 2) {
                win.location.href = getRedirectUrl(json.status);
            }
        });
    }

    /**
     * get redirect url
     * @param status
     * @return {String}
     */
    var getRedirectUrl = function (status) {
        var url = location.href;

        if (top !== window) {
            url = queryString('dm');
        }

        if (status === 2) {
            if (queryString('dm') || queryString('baseNextPage')) {
                url = queryString('dm') || queryString('baseNextPage');
            } else {
                url = 'https://plogin.made-in-china.com/sign-in/';
            }
        }

        return url;
    };

    // override getRedirectUrl url
    if (window['getRedirectUrl']) {
        getRedirectUrl = window['getRedirectUrl'];
    }

    /**
     * FaceBook
     * @type {SocietyLogin}
     */
    var facebook = new SocietyLogin();
    facebook.clsName = 'facebook';
    facebook.description = '&#xf082;';
    facebook.tip = 'Facebook';
    facebook.redirect = 'http://membercenter.made-in-china.com/socialization.do?xcase=completeInfoForSocialSignUp';
    facebook.setMapping({
        key : 'id',
        name : 'name',
        firstName : 'first_name',
        lastName : 'last_name',
        gender : 'gender',
        country : 'locale',
        city : 'location.name',
        userName : 'username',
        email : 'email',
        companyName : 'work.0.employer.name',
        phoneNumber : null,
        socialWebsite : 'Facebook',
        timeZone : 'timezone'
    });

    facebook.fireLogin = function() {
        // test code start
/*        scAction(facebook, {
            id : '115798445101505',
            email : 'liuw505@gmail.com',
            name : 'liu wei',
            timezone : '9'
        });

        return;*/
        // test code end

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '156459351190035', // App ID
                channelUrl : '', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });

            openLogin();
        };

        if (!window.FB) {
            loadSDK('//connect.facebook.net/en_US/all.js', function(){}, { id : 'facebook-jssdk', async : 'true' });
        } else {
            openLogin();
        }

        function openLogin() {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me', function(data) {
                        scAction(facebook, data);
                    });
                } else {
                    // cancelled
                }
            }, { scope: 'email,user_location,user_hometown'});
        }
    };

    /**
     * LinkedIn
     * @type {SocietyLogin}
     */
    var linkedIn = new SocietyLogin();
    linkedIn.clsName = 'linkedin';
    linkedIn.description = '&#xf08c;';
    linkedIn.tip = 'LinkedIn';
    linkedIn.redirect = 'http://membercenter.made-in-china.com/socialization.do?xcase=completeInfoForSocialSignUp';
    linkedIn.setMapping({
        key : 'values.0.id',
        name : null,
        firstName : 'values.0.firstName',
        lastName : 'values.0.lastName',
        gender : null,
        country : 'values.0.location.country.code',
        city : null,
        userName : null,
        email : 'values.0.emailAddress',
        companyName : 'values.0.positions.values.0.company.name',
        phoneNumber : 'values.0.phoneNumbers.values.0.phoneNumber',
        socialWebsite : 'LinkedIn',
        timeZone : null
    });

    // ovrride unidiedData for add name by firstName & lastName
    linkedIn.unidiedData = function(data) {
        var key;
        for (key in this.mapping) {
            if (this.mapping[key] && key !== 'socialWebsite') {
                this.mapping[key] = this._getValue(this.mapping[key], data);
            }
        }

        if (this.mapping['firstName'] && this.mapping['lastName']) {
            this.mapping['name'] = this.mapping['firstName'] + ' ' + this.mapping['lastName'];
        }

        return this.mapping;
    };

    linkedIn.fireLogin = function() {
        // test code start
        /*        scAction(linkedIn, {
         values : [
         {
         id : 'owxL5iJ8DO',
         emailAddress : 'oneroundseven@gmail.com',
         firstName: 'seven',
         headline: 'Coder at Microsoft',
         industry: 'Information Technology and Services',
         lastName: 'one',
         location : {
         country : {code: 'cn', name: 'China'}
         },
         phoneNumbers: {
         values: [{
         phoneNumber: "13811939193",
         phoneType: "mobile"
         }]
         },
         positions: {
         values: [{
         company : {
         id: 1231239,
         industry: 'information technology and services',
         name: 'made-in-china.com',
         size: '1000 - 5000'
         }
         }]
         }
         }
         ]
         });
         return;*/
        // test code end

        var timer = null;
        if (!window.IN) {
            loadSDK('http://platform.linkedin.com/in.js?async=true', function() {
                IN.init({
                    api_key: 'ykfcwwkxsin9',
                    authorize: true,
                    lang: 'es_ES'
                });

                // bind event
                IN.Event.on(IN, "auth", function() {
                    IN.API.Profile("me").fields(
                        "headline",
                        "firstName",
                        "lastName",
                        "industry",
                        "id",
                        "location",
                        "emailAddress",
                        "phoneNumbers",
                        "positions").result(function(data) {
                            scAction(linkedIn, data);
                        });
                });

                timer = setInterval(function() {
                    openLogin();
                }, 500);
            });
        } else {
            openLogin();
        }

        function openLogin() {
            if (!IN.UI) return;
            clearInterval(timer);
            // set permission
            IN.UI && IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress", "r_contactinfo"]}).place();
        }
    };

    /**
     * Show Login
     * @type {SocietyControl}
     */
    var sc = new SocietyControl();
    if(document.getElementById('isAbroadIp').value=='1'){
        sc.addLogin(facebook);
        }

    sc.addLogin(linkedIn);
    sc.show(document.getElementById('scLogin'));
}.call(window);