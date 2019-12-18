/*
 Copyright (c) 2004-2007, The Dojo Foundation
 All Rights Reserved.

 Licensed under the Academic Free License version 2.1 or above OR the
 modified BSD license. For more information on Dojo licensing, see:

 http://dojotoolkit.org/book/dojo-book-0-9/introduction/licensing
 */

/*
 This is a compiled version of Dojo, built for deployment and not for
 development. To get an editable version, please visit:

 http://dojotoolkit.org

 for documentation and information on getting the source.
 */

if (typeof dojo == "undefined") {
    (function () {
        if (typeof this["djConfig"] == "undefined") {
            this.djConfig = {};
        }
        if ((!this["console"]) || (!console["firebug"])) {
            this.console = {};
        }
        var cn = ["assert", "count", "debug", "dir", "dirxml", "error", "group", "groupEnd", "info", "log", "profile", "profileEnd", "time", "timeEnd", "trace", "warn"];
        var i = 0, tn;
        while ((tn = cn[i++])) {
            if (!console[tn]) {
                console[tn] = function () {
                };
            }
        }
        if (typeof this["dojo"] == "undefined") {
            this.dojo = {};
        }
        var d = dojo;
        dojo.global = this;
        var _5 = {isDebug: false, libraryScriptUri: "", preventBackButtonFix: true, delayMozLoadingFix: false};
        for (var _6 in _5) {
            if (typeof djConfig[_6] == "undefined") {
                djConfig[_6] = _5[_6];
            }
        }
        var _7 = ["Browser", "Rhino", "Spidermonkey", "Mobile"];
        var t;
        while (t = _7.shift()) {
            d["is" + t] = false;
        }
        dojo.locale = djConfig.locale;
        dojo.version = {major: 3, minor: 0, patch: 0, flag: "dev", revision: Number("$Rev: 11832 $".match(/[0-9]+/)[0]), toString: function () {
            with (d.version) {
                return major + "." + minor + "." + patch + flag + " (" + revision + ")";
            }
        }};
        if (typeof OpenAjax != "undefined") {
            OpenAjax.hub.registerLibrary("dojo", "http://dojotoolkit.org", d.version.toString());
        }
        dojo._mixin = function (_9, _a) {
            var _b = {};
            for (var x in _a) {
                if (_b[x] === undefined || _b[x] != _a[x]) {
                    _9[x] = _a[x];
                }
            }
            if (d["isIE"] && _a) {
                var p = _a.toString;
                if (typeof p == "function" && p != _9.toString && p != _b.toString && p != "\nfunction toString() {\n    [native code]\n}\n") {
                    _9.toString = _a.toString;
                }
            }
            return _9;
        };
        dojo.mixin = function (_e, _f) {
            for (var i = 1, l = arguments.length; i < l; i++) {
                d._mixin(_e, arguments[i]);
            }
            return _e;
        };
        dojo._getProp = function (_12, _13, _14) {
            var obj = _14 || d.global;
            for (var i = 0, p; obj && (p = _12[i]); i++) {
                obj = (p in obj ? obj[p] : (_13 ? obj[p] = {} : undefined));
            }
            return obj;
        };
        dojo.setObject = function (_18, _19, _1a) {
            var _1b = _18.split("."), p = _1b.pop(), obj = d._getProp(_1b, true, _1a);
            return (obj && p ? (obj[p] = _19) : undefined);
        };
        dojo.getObject = function (_1e, _1f, _20) {
            return d._getProp(_1e.split("."), _1f, _20);
        };
        dojo.exists = function (_21, obj) {
            return !!d.getObject(_21, false, obj);
        };
        dojo["eval"] = function (_23) {
            return d.global.eval ? d.global.eval(_23) : eval(_23);
        };
        d.deprecated = d.experimental = function () {
        };
    })();
    (function () {
        var d = dojo;
        dojo.mixin(dojo, {_loadedModules: {}, _inFlightCount: 0, _hasResource: {}, _modulePrefixes: {dojo: {name: "dojo", value: "."}, doh: {name: "doh", value: "../util/doh"}, tests: {name: "tests", value: "tests"}}, _moduleHasPrefix: function (_25) {
            var mp = this._modulePrefixes;
            return !!(mp[_25] && mp[_25].value);
        }, _getModulePrefix: function (_27) {
            var mp = this._modulePrefixes;
            if (this._moduleHasPrefix(_27)) {
                return mp[_27].value;
            }
            return _27;
        }, _loadedUrls: [], _postLoad: false, _loaders: [], _unloaders: [], _loadNotifying: false});
        dojo._loadPath = function (_29, _2a, cb) {
            var uri = (((_29.charAt(0) == "/" || _29.match(/^\w+:/))) ? "" : this.baseUrl) + _29;
            if (djConfig.cacheBust && d.isBrowser) {
                uri += "?" + String(djConfig.cacheBust).replace(/\W+/g, "");
            }
            try {
                return !_2a ? this._loadUri(uri, cb) : this._loadUriAndCheck(uri, _2a, cb);
            } catch (e) {
                console.debug(e);
                return false;
            }
        };
        dojo._loadUri = function (uri, cb) {
            if (this._loadedUrls[uri]) {
                return true;
            }
            var _2f = this._getText(uri, true);
            if (!_2f) {
                return false;
            }
            this._loadedUrls[uri] = true;
            this._loadedUrls.push(uri);
            if (cb) {
                _2f = "(" + _2f + ")";
            }
            if (d.isMoz) {
                _2f += "\r\n//@ sourceURL=" + uri;
            }
            var _30 = d["eval"](_2f);
            if (cb) {
                cb(_30);
            }
            return true;
        };
        dojo._loadUriAndCheck = function (uri, _32, cb) {
            var ok = false;
            try {
                ok = this._loadUri(uri, cb);
            } catch (e) {
                console.debug("failed loading " + uri + " with error: " + e);
            }
            return Boolean(ok && this._loadedModules[_32]);
        };
        dojo.loaded = function () {
            this._loadNotifying = true;
            this._postLoad = true;
            var mll = this._loaders;
            this._loaders = [];
            for (var x = 0; x < mll.length; x++) {
                mll[x]();
            }
            this._loadNotifying = false;
            if (d._postLoad && d._inFlightCount == 0 && this._loaders.length > 0) {
                d._callLoaded();
            }
        };
        dojo.unloaded = function () {
            var mll = this._unloaders;
            while (mll.length) {
                (mll.pop())();
            }
        };
        dojo.addOnLoad = function (obj, _39) {
            if (arguments.length == 1) {
                d._loaders.push(obj);
            } else {
                if (arguments.length > 1) {
                    d._loaders.push(function () {
                        obj[_39]();
                    });
                }
            }
            if (d._postLoad && d._inFlightCount == 0 && !d._loadNotifying) {
                d._callLoaded();
            }
        };
        dojo.addOnUnload = function (obj, _3b) {
            if (arguments.length == 1) {
                d._unloaders.push(obj);
            } else {
                if (arguments.length > 1) {
                    d._unloaders.push(function () {
                        obj[_3b]();
                    });
                }
            }
        };
        dojo._modulesLoaded = function () {
            if (d._postLoad) {
                return;
            }
            if (d._inFlightCount > 0) {
                console.debug("files still in flight!");
                return;
            }
            d._callLoaded();
        };
        dojo._callLoaded = function () {
            if (typeof setTimeout == "object" || (djConfig["useXDomain"] && d.isOpera)) {
                setTimeout("dojo.loaded();", 0);
            } else {
                d.loaded();
            }
        };
        dojo._getModuleSymbols = function (_3c) {
            var _3d = _3c.split(".");
            for (var i = _3d.length; i > 0; i--) {
                var _3f = _3d.slice(0, i).join(".");
                if ((i == 1) && !this._moduleHasPrefix(_3f)) {
                    _3d[0] = "../" + _3d[0];
                } else {
                    var _40 = this._getModulePrefix(_3f);
                    if (_40 != _3f) {
                        _3d.splice(0, i, _40);
                        break;
                    }
                }
            }
            return _3d;
        };
        dojo._global_omit_module_check = false;
        dojo._loadModule = dojo.require = function (_41, _42) {
            _42 = this._global_omit_module_check || _42;
            var _43 = this._loadedModules[_41];
            if (_43) {
                return _43;
            }
            var _44 = this._getModuleSymbols(_41).join("/") + ".js";
            var _45 = (!_42) ? _41 : null;
            var ok = this._loadPath(_44, _45);
            if ((!ok) && (!_42)) {
                throw new Error("Could not load '" + _41 + "'; last tried '" + _44 + "'");
            }
            if ((!_42) && (!this["_isXDomain"])) {
                _43 = this._loadedModules[_41];
                if (!_43) {
                    throw new Error("symbol '" + _41 + "' is not defined after loading '" + _44 + "'");
                }
            }
            return _43;
        };
        dojo.provide = function (_47) {
            _47 = _47 + "";
            return (d._loadedModules[_47] = d.getObject(_47, true));
        };
        dojo.platformRequire = function (_48) {
            var _49 = _48["common"] || [];
            var _4a = _49.concat(_48[d._name] || _48["default"] || []);
            for (var x = 0; x < _4a.length; x++) {
                var _4c = _4a[x];
                if (_4c.constructor == Array) {
                    d._loadModule.apply(d, _4c);
                } else {
                    d._loadModule(_4c);
                }
            }
        };
        dojo.requireIf = function (_4d, _4e) {
            if (_4d === true) {
                var _4f = [];
                for (var i = 1; i < arguments.length; i++) {
                    _4f.push(arguments[i]);
                }
                d.require.apply(d, _4f);
            }
        };
        dojo.requireAfterIf = d.requireIf;
        dojo.registerModulePath = function (_51, _52) {
            d._modulePrefixes[_51] = {name: _51, value: _52};
        };
        dojo.requireLocalization = function (_53, _54, _55, _56) {
            d.require("dojo.i18n");
            d.i18n._requireLocalization.apply(d.hostenv, arguments);
        };
        var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
        var ire = new RegExp("^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$");
        dojo._Url = function () {
            var n = null;
            var _a = arguments;
            var uri = _a[0];
            for (var i = 1; i < _a.length; i++) {
                if (!_a[i]) {
                    continue;
                }
                var _5d = new d._Url(_a[i] + "");
                var _5e = new d._Url(uri + "");
                if ((_5d.path == "") && (!_5d.scheme) && (!_5d.authority) && (!_5d.query)) {
                    if (_5d.fragment != n) {
                        _5e.fragment = _5d.fragment;
                    }
                    _5d = _5e;
                } else {
                    if (!_5d.scheme) {
                        _5d.scheme = _5e.scheme;
                        if (!_5d.authority) {
                            _5d.authority = _5e.authority;
                            if (_5d.path.charAt(0) != "/") {
                                var _5f = _5e.path.substring(0, _5e.path.lastIndexOf("/") + 1) + _5d.path;
                                var _60 = _5f.split("/");
                                for (var j = 0; j < _60.length; j++) {
                                    if (_60[j] == ".") {
                                        if (j == _60.length - 1) {
                                            _60[j] = "";
                                        } else {
                                            _60.splice(j, 1);
                                            j--;
                                        }
                                    } else {
                                        if (j > 0 && !(j == 1 && _60[0] == "") && _60[j] == ".." && _60[j - 1] != "..") {
                                            if (j == (_60.length - 1)) {
                                                _60.splice(j, 1);
                                                _60[j - 1] = "";
                                            } else {
                                                _60.splice(j - 1, 2);
                                                j -= 2;
                                            }
                                        }
                                    }
                                }
                                _5d.path = _60.join("/");
                            }
                        }
                    }
                }
                uri = "";
                if (_5d.scheme) {
                    uri += _5d.scheme + ":";
                }
                if (_5d.authority) {
                    uri += "//" + _5d.authority;
                }
                uri += _5d.path;
                if (_5d.query) {
                    uri += "?" + _5d.query;
                }
                if (_5d.fragment) {
                    uri += "#" + _5d.fragment;
                }
            }
            this.uri = uri.toString();
            var r = this.uri.match(ore);
            this.scheme = r[2] || (r[1] ? "" : n);
            this.authority = r[4] || (r[3] ? "" : n);
            this.path = r[5];
            this.query = r[7] || (r[6] ? "" : n);
            this.fragment = r[9] || (r[8] ? "" : n);
            if (this.authority != n) {
                r = this.authority.match(ire);
                this.user = r[3] || n;
                this.password = r[4] || n;
                this.host = r[5];
                this.port = r[7] || n;
            }
        };
        dojo._Url.prototype.toString = function () {
            return this.uri;
        };
        dojo.moduleUrl = function (_63, url) {
            var loc = dojo._getModuleSymbols(_63).join("/");
            if (!loc) {
                return null;
            }
            if (loc.lastIndexOf("/") != loc.length - 1) {
                loc += "/";
            }
            var _66 = loc.indexOf(":");
            if (loc.charAt(0) != "/" && (_66 == -1 || _66 > loc.indexOf("/"))) {
                loc = d.baseUrl + loc;
            }
            return new d._Url(loc, url);
        };
    })();
    if (typeof window != "undefined") {
        dojo.isBrowser = true;
        dojo._name = "browser";
        (function () {
            var d = dojo;
            if (document && document.getElementsByTagName) {
                var _68 = document.getElementsByTagName("script");
                var _69 = /dojo(\.xd)?\.js([\?\.]|$)/i;
                for (var i = 0; i < _68.length; i++) {
                    var src = _68[i].getAttribute("src");
                    if (!src) {
                        continue;
                    }
                    var m = src.match(_69);
                    if (m) {
                        if (!djConfig["baseUrl"]) {
                            djConfig["baseUrl"] = src.substring(0, m.index);
                        }
                        var cfg = _68[i].getAttribute("djConfig");
                        if (cfg) {
                            var _6e = eval("({ " + cfg + " })");
                            for (var x in _6e) {
                                djConfig[x] = _6e[x];
                            }
                        }
                        break;
                    }
                }
            }
            d.baseUrl = djConfig["baseUrl"];
            var n = navigator;
            var dua = n.userAgent;
            var dav = n.appVersion;
            var tv = parseFloat(dav);
            d.isOpera = (dua.indexOf("Opera") >= 0) ? tv : 0;
            d.isKhtml = (dav.indexOf("Konqueror") >= 0) || (dav.indexOf("Safari") >= 0) ? tv : 0;
            if (dav.indexOf("Safari") >= 0) {
                d.isSafari = parseFloat(dav.split("Version/")[1]) || 2;
            }
            var _74 = dua.indexOf("Gecko");
            d.isMozilla = d.isMoz = ((_74 >= 0) && (!d.isKhtml)) ? tv : 0;
            d.isFF = 0;
            d.isIE = 0;
            try {
                if (d.isMoz) {
                    d.isFF = parseFloat(dua.split("Firefox/")[1].split(" ")[0]);
                }
                if ((document.all) && (!d.isOpera)) {
                    d.isIE = parseFloat(dav.split("MSIE ")[1].split(";")[0]);
                }
            } catch (e) {
            }
            if (dojo.isIE && (window.location.protocol === "file:")) {
                djConfig.ieForceActiveXXhr = true;
            }
            var cm = document["compatMode"];
            d.isQuirks = (cm == "BackCompat") || (cm == "QuirksMode") || (d.isIE < 6);
            d.locale = djConfig.locale || (d.isIE ? n.userLanguage : n.language).toLowerCase();
            d._println = console.debug;
            d._XMLHTTP_PROGIDS = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
            d._xhrObj = function () {
                var _76 = null;
                var _77 = null;
                if (!dojo.isIE || !djConfig.ieForceActiveXXhr) {
                    try {
                        _76 = new XMLHttpRequest();
                    } catch (e) {
                    }
                }
                if (!_76) {
                    for (var i = 0; i < 3; ++i) {
                        var _79 = dojo._XMLHTTP_PROGIDS[i];
                        try {
                            _76 = new ActiveXObject(_79);
                        } catch (e) {
                            _77 = e;
                        }
                        if (_76) {
                            dojo._XMLHTTP_PROGIDS = [_79];
                            break;
                        }
                    }
                }
                if (!_76) {
                    throw new Error("XMLHTTP not available: " + _77);
                }
                return _76;
            };
            d._isDocumentOk = function (_7a) {
                var _7b = _7a.status || 0;
                return ((_7b >= 200) && (_7b < 300)) || (_7b == 304) || (_7b == 1223) || (!_7b && (location.protocol == "file:" || location.protocol == "chrome:"));
            };
            var _7c = window.location + "";
            var _7d = document.getElementsByTagName("base");
            var _7e = (_7d && _7d.length > 0);
            d._getText = function (uri, _80) {
                var _81 = this._xhrObj();
                if (!_7e && dojo._Url) {
                    uri = (new dojo._Url(_7c, uri)).toString();
                }
                _81.open("GET", uri, false);
                try {
                    _81.send(null);
                    if (!d._isDocumentOk(_81)) {
                        var err = Error("Unable to load " + uri + " status:" + _81.status);
                        err.status = _81.status;
                        err.responseText = _81.responseText;
                        throw err;
                    }
                } catch (e) {
                    if (_80) {
                        return null;
                    }
                    throw e;
                }
                return _81.responseText;
            };
        })();
        dojo._initFired = false;
        dojo._loadInit = function (e) {
            dojo._initFired = true;
            var _84 = (e && e.type) ? e.type.toLowerCase() : "load";
            if (arguments.callee.initialized || (_84 != "domcontentloaded" && _84 != "load")) {
                return;
            }
            arguments.callee.initialized = true;
            if (typeof dojo["_khtmlTimer"] != "undefined") {
                clearInterval(dojo._khtmlTimer);
                delete dojo._khtmlTimer;
            }
            if (dojo._inFlightCount == 0) {
                dojo._modulesLoaded();
            }
        };
        if (document.addEventListener) {
            if (dojo.isOpera || (dojo.isMoz && (djConfig["enableMozDomContentLoaded"] === true))) {
                document.addEventListener("DOMContentLoaded", dojo._loadInit, null);
            }
            window.addEventListener("load", dojo._loadInit, null);
        }
        if (/(WebKit|khtml)/i.test(navigator.userAgent)) {
            dojo._khtmlTimer = setInterval(function () {
                if (/loaded|complete/.test(document.readyState)) {
                    dojo._loadInit();
                }
            }, 10);
        }
        (function () {
            var _w = window;
            var _86 = function (_87, fp) {
                var _89 = _w[_87] || function () {
                };
                _w[_87] = function () {
                    fp.apply(_w, arguments);
                    _89.apply(_w, arguments);
                };
            };
            if (dojo.isIE) {
                document.write("<scr" + "ipt defer src=\"//:\" " + "onreadystatechange=\"if(this.readyState=='complete'){dojo._loadInit();}\">" + "</scr" + "ipt>");
                var _8a = true;
                _86("onbeforeunload", function () {
                    _w.setTimeout(function () {
                        _8a = false;
                    }, 0);
                });
                _86("onunload", function () {
                    if (_8a) {
                        dojo.unloaded();
                    }
                });
                try {
                    document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                    document.createStyleSheet().addRule("v\\:*", "behavior:url(#default#VML)");
                } catch (e) {
                }
            } else {
                _86("onbeforeunload", function () {
                    dojo.unloaded();
                });
            }
        })();
    }
    if (djConfig.isDebug) {
        dojo.require("dojo._firebug.firebug");
    }
    if (djConfig.debugAtAllCosts) {
        djConfig.useXDomain = true;
        dojo.require("dojo._base._loader.loader_xd");
        dojo.require("dojo._base._loader.loader_debug");
    }
}
if (!dojo._hasResource["dojo._base.lang"]) {
    dojo._hasResource["dojo._base.lang"] = true;
    dojo.provide("dojo._base.lang");
    dojo.isString = function (it) {
        return typeof it == "string" || it instanceof String;
    };
    dojo.isArray = function (it) {
        return it && it instanceof Array || typeof it == "array";
    };
    dojo.isFunction = (function () {
        var _8d = function (it) {
            return typeof it == "function" || it instanceof Function;
        };
        return dojo.isSafari ? function (it) {
            if (typeof it == "function" && it == "[object NodeList]") {
                return false;
            }
            return _8d(it);
        } : _8d;
    })();
    dojo.isObject = function (it) {
        return it !== undefined && (it === null || typeof it == "object" || dojo.isArray(it) || dojo.isFunction(it));
    };
    dojo.isArrayLike = function (it) {
        var d = dojo;
        return it && it !== undefined && !d.isString(it) && !d.isFunction(it) && !(it.tagName && it.tagName.toLowerCase() == "form") && (d.isArray(it) || isFinite(it.length));
    };
    dojo.isAlien = function (it) {
        return it && !dojo.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it));
    };
    dojo.extend = function (_94, _95) {
        for (var i = 1, l = arguments.length; i < l; i++) {
            dojo._mixin(_94.prototype, arguments[i]);
        }
        return _94;
    };
    dojo._hitchArgs = function (_98, _99) {
        var pre = dojo._toArray(arguments, 2);
        var _9b = dojo.isString(_99);
        return function () {
            var _9c = dojo._toArray(arguments);
            var f = _9b ? (_98 || dojo.global)[_99] : _99;
            return f && f.apply(_98 || this, pre.concat(_9c));
        };
    };
    dojo.hitch = function (_9e, _9f) {
        if (arguments.length > 2) {
            return dojo._hitchArgs.apply(dojo, arguments);
        }
        if (!_9f) {
            _9f = _9e;
            _9e = null;
        }
        if (dojo.isString(_9f)) {
            _9e = _9e || dojo.global;
            if (!_9e[_9f]) {
                throw (["dojo.hitch: scope[\"", _9f, "\"] is null (scope=\"", _9e, "\")"].join(""));
            }
            return function () {
                return _9e[_9f].apply(_9e, arguments || []);
            };
        }
        return !_9e ? _9f : function () {
            return _9f.apply(_9e, arguments || []);
        };
    };
    dojo.delegate = dojo._delegate = function (obj, _a1) {
        function TMP() {
        };
        TMP.prototype = obj;
        var tmp = new TMP();
        if (_a1) {
            dojo.mixin(tmp, _a1);
        }
        return tmp;
    };
    dojo.partial = function (_a3) {
        var arr = [null];
        return dojo.hitch.apply(dojo, arr.concat(dojo._toArray(arguments)));
    };
    dojo._toArray = function (obj, _a6, _a7) {
        var arr = _a7 || [];
        for (var x = _a6 || 0; x < obj.length; x++) {
            arr.push(obj[x]);
        }
        return arr;
    };
    dojo.clone = function (o) {
        if (!o) {
            return o;
        }
        if (dojo.isArray(o)) {
            var r = [];
            for (var i = 0; i < o.length; ++i) {
                r.push(dojo.clone(o[i]));
            }
            return r;
        }
        if (!dojo.isObject(o)) {
            return o;
        }
        if (o.nodeType && o.cloneNode) {
            return o.cloneNode(true);
        }
        if (o instanceof Date) {
            return new Date(o.getTime());
        }
        var r = new o.constructor();
        for (var i in o) {
            if (!(i in r) || r[i] != o[i]) {
                r[i] = dojo.clone(o[i]);
            }
        }
        return r;
    };
    dojo.trim = function (str) {
        return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    };
}
if (!dojo._hasResource["dojo._base.declare"]) {
    dojo._hasResource["dojo._base.declare"] = true;
    dojo.provide("dojo._base.declare");
    dojo.declare = function (_ae, _af, _b0) {
        if (dojo.isFunction(_b0) || (arguments.length > 3)) {
            dojo.deprecated("dojo.declare: for class '" + _ae + "' pass initializer function as 'constructor' property instead of as a separate argument.", "", "1.0");
            var c = _b0;
            _b0 = arguments[3] || {};
            _b0.constructor = c;
        }
        var dd = arguments.callee, _b3 = null;
        if (dojo.isArray(_af)) {
            _b3 = _af;
            _af = _b3.shift();
        }
        if (_b3) {
            for (var i = 0, m; i < _b3.length; i++) {
                m = _b3[i];
                if (!m) {
                    throw ("Mixin #" + i + " to declaration of " + _ae + " is null. It's likely a required module is not loaded.");
                }
                _af = dd._delegate(_af, m);
            }
        }
        var _b6 = (_b0 || 0).constructor, _b7 = dd._delegate(_af), fn;
        for (var i in _b0) {
            if (dojo.isFunction(fn = _b0[i]) && (!0[i])) {
                fn.nom = i;
            }
        }
        dojo.extend(_b7, {declaredClass: _ae, _constructor: _b6, preamble: null}, _b0 || 0);
        _b7.prototype.constructor = _b7;
        return dojo.setObject(_ae, _b7);
    };
    dojo.mixin(dojo.declare, {_delegate: function (_b9, _ba) {
        var bp = (_b9 || 0).prototype, mp = (_ba || 0).prototype;
        var _bd = dojo.declare._makeCtor();
        dojo.mixin(_bd, {superclass: bp, mixin: mp, extend: dojo.declare._extend});
        if (_b9) {
            _bd.prototype = dojo._delegate(bp);
        }
        dojo.extend(_bd, dojo.declare._core, mp || 0, {_constructor: null, preamble: null});
        _bd.prototype.constructor = _bd;
        _bd.prototype.declaredClass = (bp || 0).declaredClass + "_" + (mp || 0).declaredClass;
        return _bd;
    }, _extend: function (_be) {
        for (var i in _be) {
            if (dojo.isFunction(fn = _be[i]) && (!0[i])) {
                fn.nom = i;
            }
        }
        dojo.extend(this, _be);
    }, _makeCtor: function () {
        return function () {
            this._construct(arguments);
        };
    }, _core: {_construct: function (_c0) {
        var c = _c0.callee, s = c.superclass, ct = s && s.constructor, m = c.mixin, mct = m && m.constructor, a = _c0, ii, fn;
        if (a[0]) {
            if ((fn = a[0]["preamble"])) {
                a = fn.apply(this, a) || a;
            }
        }
        if (fn = c.prototype.preamble) {
            a = fn.apply(this, a) || a;
        }
        if (ct && ct.apply) {
            ct.apply(this, a);
        }
        if (mct && mct.apply) {
            mct.apply(this, a);
        }
        if (ii = c.prototype._constructor) {
            ii.apply(this, _c0);
        }
        if (this.constructor.prototype == c.prototype && (ct = this.postscript)) {
            ct.apply(this, _c0);
        }
    }, _findMixin: function (_c9) {
        var c = this.constructor, p, m;
        while (c) {
            p = c.superclass;
            m = c.mixin;
            if (m == _c9 || (m instanceof _c9.constructor)) {
                return p;
            }
            if (m && (m = m._findMixin(_c9))) {
                return m;
            }
            c = p && p.constructor;
        }
    }, _findMethod: function (_cd, _ce, _cf, has) {
        var p = _cf, c, m, f;
        do {
            c = p.constructor;
            m = c.mixin;
            if (m && (m = this._findMethod(_cd, _ce, m, has))) {
                return m;
            }
            if ((f = p[_cd]) && (has == (f == _ce))) {
                return p;
            }
            p = c.superclass;
        } while (p);
        return !has && (p = this._findMixin(_cf)) && this._findMethod(_cd, _ce, p, has);
    }, inherited: function (_d5, _d6, _d7) {
        var a = arguments;
        if (!dojo.isString(a[0])) {
            _d7 = _d6;
            _d6 = _d5;
            _d5 = _d6.callee.nom;
        }
        var c = _d6.callee, p = this.constructor.prototype, a = _d7 || _d6, fn, mp;
        if (this[_d5] != c || p[_d5] == c) {
            mp = this._findMethod(_d5, c, p, true);
            if (!mp) {
                throw (this.declaredClass + ": name argument (\"" + _d5 + "\") to inherited must match callee (declare.js)");
            }
            p = this._findMethod(_d5, c, mp, false);
        }
        fn = p && p[_d5];
        if (!fn) {
            console.debug(mp.declaredClass + ": no inherited \"" + _d5 + "\" was found (declare.js)");
            return;
        }
        return fn.apply(this, a);
    }}});
}
if (!dojo._hasResource["dojo._base.connect"]) {
    dojo._hasResource["dojo._base.connect"] = true;
    dojo.provide("dojo._base.connect");
    dojo._listener = {getDispatcher: function () {
        return function () {
            var ap = Array.prototype, c = arguments.callee, ls = c._listeners, t = c.target;
            var r = t && t.apply(this, arguments);
            for (var i in ls) {
                if (!(i in ap)) {
                    ls[i].apply(this, arguments);
                }
            }
            return r;
        };
    }, add: function (_e3, _e4, _e5) {
        _e3 = _e3 || dojo.global;
        var f = _e3[_e4];
        if (!f || !f._listeners) {
            var d = dojo._listener.getDispatcher();
            d.target = f;
            d._listeners = [];
            f = _e3[_e4] = d;
        }
        return f._listeners.push(_e5);
    }, remove: function (_e8, _e9, _ea) {
        var f = (_e8 || dojo.global)[_e9];
        if (f && f._listeners && _ea--) {
            delete f._listeners[_ea];
        }
    }};
    dojo.connect = function (obj, _ed, _ee, _ef, _f0) {
        var a = arguments, _f2 = [], i = 0;
        _f2.push(dojo.isString(a[0]) ? null : a[i++], a[i++]);
        var a1 = a[i + 1];
        _f2.push(dojo.isString(a1) || dojo.isFunction(a1) ? a[i++] : null, a[i++]);
        for (var l = a.length; i < l; i++) {
            _f2.push(a[i]);
        }
        return dojo._connect.apply(this, _f2);
    };
    dojo._connect = function (obj, _f7, _f8, _f9) {
        var l = dojo._listener, h = l.add(obj, _f7, dojo.hitch(_f8, _f9));
        return [obj, _f7, h, l];
    };
    dojo.disconnect = function (_fc) {
        if (_fc && _fc[0] !== undefined) {
            dojo._disconnect.apply(this, _fc);
            delete _fc[0];
        }
    };
    dojo._disconnect = function (obj, _fe, _ff, _100) {
        _100.remove(obj, _fe, _ff);
    };
    dojo._topics = {};
    dojo.subscribe = function (_101, _102, _103) {
        return [_101, dojo._listener.add(dojo._topics, _101, dojo.hitch(_102, _103))];
    };
    dojo.unsubscribe = function (_104) {
        if (_104) {
            dojo._listener.remove(dojo._topics, _104[0], _104[1]);
        }
    };
    dojo.publish = function (_105, args) {
        var f = dojo._topics[_105];
        if (f) {
            f.apply(this, args || []);
        }
    };
    dojo.connectPublisher = function (_108, obj, _10a) {
        var pf = function () {
            dojo.publish(_108, arguments);
        };
        return (_10a) ? dojo.connect(obj, _10a, pf) : dojo.connect(obj, pf);
    };
}
if (!dojo._hasResource["dojo._base.Deferred"]) {
    dojo._hasResource["dojo._base.Deferred"] = true;
    dojo.provide("dojo._base.Deferred");
    dojo.Deferred = function (_10c) {
        this.chain = [];
        this.id = this._nextId();
        this.fired = -1;
        this.paused = 0;
        this.results = [null, null];
        this.canceller = _10c;
        this.silentlyCancelled = false;
    };
    dojo.extend(dojo.Deferred, {_nextId: (function () {
        var n = 1;
        return function () {
            return n++;
        };
    })(), cancel: function () {
        var err;
        if (this.fired == -1) {
            if (this.canceller) {
                err = this.canceller(this);
            } else {
                this.silentlyCancelled = true;
            }
            if (this.fired == -1) {
                if (!(err instanceof Error)) {
                    var res = err;
                    err = new Error("Deferred Cancelled");
                    err.dojoType = "cancel";
                    err.cancelResult = res;
                }
                this.errback(err);
            }
        } else {
            if ((this.fired == 0) && (this.results[0] instanceof dojo.Deferred)) {
                this.results[0].cancel();
            }
        }
    }, _resback: function (res) {
        this.fired = ((res instanceof Error) ? 1 : 0);
        this.results[this.fired] = res;
        this._fire();
    }, _check: function () {
        if (this.fired != -1) {
            if (!this.silentlyCancelled) {
                throw new Error("already called!");
            }
            this.silentlyCancelled = false;
            return;
        }
    }, callback: function (res) {
        this._check();
        this._resback(res);
    }, errback: function (res) {
        this._check();
        if (!(res instanceof Error)) {
            res = new Error(res);
        }
        this._resback(res);
    }, addBoth: function (cb, cbfn) {
        var _115 = dojo.hitch(cb, cbfn);
        if (arguments.length > 2) {
            _115 = dojo.partial(_115, arguments, 2);
        }
        return this.addCallbacks(_115, _115);
    }, addCallback: function (cb, cbfn) {
        var _118 = dojo.hitch(cb, cbfn);
        if (arguments.length > 2) {
            _118 = dojo.partial(_118, arguments, 2);
        }
        return this.addCallbacks(_118, null);
    }, addErrback: function (cb, cbfn) {
        var _11b = dojo.hitch(cb, cbfn);
        if (arguments.length > 2) {
            _11b = dojo.partial(_11b, arguments, 2);
        }
        return this.addCallbacks(null, _11b);
    }, addCallbacks: function (cb, eb) {
        this.chain.push([cb, eb]);
        if (this.fired >= 0) {
            this._fire();
        }
        return this;
    }, _fire: function () {
        var _11e = this.chain;
        var _11f = this.fired;
        var res = this.results[_11f];
        var self = this;
        var cb = null;
        while ((_11e.length > 0) && (this.paused == 0)) {
            var f = _11e.shift()[_11f];
            if (!f) {
                continue;
            }
            try {
                res = f(res);
                _11f = ((res instanceof Error) ? 1 : 0);
                if (res instanceof dojo.Deferred) {
                    cb = function (res) {
                        self._resback(res);
                        self.paused--;
                        if ((self.paused == 0) && (self.fired >= 0)) {
                            self._fire();
                        }
                    };
                    this.paused++;
                }
            } catch (err) {
                console.debug(err);
                _11f = 1;
                res = err;
            }
        }
        this.fired = _11f;
        this.results[_11f] = res;
        if ((cb) && (this.paused)) {
            res.addBoth(cb);
        }
    }});
}
if (!dojo._hasResource["dojo._base.json"]) {
    dojo._hasResource["dojo._base.json"] = true;
    dojo.provide("dojo._base.json");
    dojo.fromJson = function (json) {
        try {
            return eval("(" + json + ")");
        } catch (e) {
            console.debug(e);
            return json;
        }
    };
    dojo._escapeString = function (str) {
        return ("\"" + str.replace(/(["\\])/g, "\\$1") + "\"").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
    };
    dojo.toJsonIndentStr = "\t";
    dojo.toJson = function (it, _128, _129) {
        _129 = _129 || "";
        var _12a = (_128 ? _129 + dojo.toJsonIndentStr : "");
        var _12b = (_128 ? "\n" : "");
        var _12c = typeof (it);
        if (_12c == "undefined") {
            return "undefined";
        } else {
            if ((_12c == "number") || (_12c == "boolean")) {
                return it + "";
            } else {
                if (it === null) {
                    return "null";
                }
            }
        }
        if (dojo.isString(it)) {
            return dojo._escapeString(it);
        }
        if (it.nodeType && it.cloneNode) {
            return "";
        }
        var _12d = arguments.callee;
        var _12e;
        if (typeof it.__json__ == "function") {
            _12e = it.__json__();
            if (it !== _12e) {
                return _12d(_12e, _128, _12a);
            }
        }
        if (typeof it.json == "function") {
            _12e = it.json();
            if (it !== _12e) {
                return _12d(_12e, _128, _12a);
            }
        }
        if (dojo.isArray(it)) {
            var res = [];
            for (var i = 0; i < it.length; i++) {
                var val = _12d(it[i], _128, _12a);
                if (typeof (val) != "string") {
                    val = "undefined";
                }
                res.push(_12b + _12a + val);
            }
            return "[" + res.join(", ") + _12b + _129 + "]";
        }
        if (_12c == "function") {
            return null;
        }
        var _132 = [];
        for (var key in it) {
            var _134;
            if (typeof (key) == "number") {
                _134 = "\"" + key + "\"";
            } else {
                if (typeof (key) == "string") {
                    _134 = dojo._escapeString(key);
                } else {
                    continue;
                }
            }
            val = _12d(it[key], _128, _12a);
            if (typeof (val) != "string") {
                continue;
            }
            _132.push(_12b + _12a + _134 + ": " + val);
        }
        return "{" + _132.join(", ") + _12b + _129 + "}";
    };
}
if (!dojo._hasResource["dojo._base.array"]) {
    dojo._hasResource["dojo._base.array"] = true;
    dojo.provide("dojo._base.array");
    (function () {
        var _135 = function (arr, obj, cb) {
            return [(dojo.isString(arr) ? arr.split("") : arr), (obj || dojo.global), (dojo.isString(cb) ? (new Function("item", "index", "array", cb)) : cb)];
        };
        dojo.mixin(dojo, {indexOf: function (_139, _13a, _13b, _13c) {
            var i = 0, step = 1, end = _139.length;
            if (_13c) {
                i = end - 1;
                step = end = -1;
            }
            for (i = _13b || i; i != end; i += step) {
                if (_139[i] == _13a) {
                    return i;
                }
            }
            return -1;
        }, lastIndexOf: function (_140, _141, _142) {
            return dojo.indexOf(_140, _141, _142, true);
        }, forEach: function (arr, _144, obj) {
            if (!arr || !arr.length) {
                return;
            }
            var _p = _135(arr, obj, _144);
            arr = _p[0];
            for (var i = 0, l = _p[0].length; i < l; i++) {
                _p[2].call(_p[1], arr[i], i, arr);
            }
        }, _everyOrSome: function (_149, arr, _14b, obj) {
            var _p = _135(arr, obj, _14b);
            arr = _p[0];
            for (var i = 0, l = arr.length; i < l; i++) {
                var _150 = !!_p[2].call(_p[1], arr[i], i, arr);
                if (_149 ^ _150) {
                    return _150;
                }
            }
            return _149;
        }, every: function (arr, _152, _153) {
            return this._everyOrSome(true, arr, _152, _153);
        }, some: function (arr, _155, _156) {
            return this._everyOrSome(false, arr, _155, _156);
        }, map: function (arr, func, obj) {
            var _p = _135(arr, obj, func);
            arr = _p[0];
            var _15b = ((arguments[3]) ? (new arguments[3]()) : []);
            for (var i = 0; i < arr.length; ++i) {
                _15b.push(_p[2].call(_p[1], arr[i], i, arr));
            }
            return _15b;
        }, filter: function (arr, _15e, obj) {
            var _p = _135(arr, obj, _15e);
            arr = _p[0];
            var _161 = [];
            for (var i = 0; i < arr.length; i++) {
                if (_p[2].call(_p[1], arr[i], i, arr)) {
                    _161.push(arr[i]);
                }
            }
            return _161;
        }});
    })();
}
if (!dojo._hasResource["dojo._base.Color"]) {
    dojo._hasResource["dojo._base.Color"] = true;
    dojo.provide("dojo._base.Color");
    dojo.Color = function (_163) {
        if (_163) {
            this.setColor(_163);
        }
    };
    dojo.Color.named = {black: [0, 0, 0], silver: [192, 192, 192], gray: [128, 128, 128], white: [255, 255, 255], maroon: [128, 0, 0], red: [255, 0, 0], purple: [128, 0, 128], fuchsia: [255, 0, 255], green: [0, 128, 0], lime: [0, 255, 0], olive: [128, 128, 0], yellow: [255, 255, 0], navy: [0, 0, 128], blue: [0, 0, 255], teal: [0, 128, 128], aqua: [0, 255, 255]};
    dojo.extend(dojo.Color, {r: 255, g: 255, b: 255, a: 1, _set: function (r, g, b, a) {
        var t = this;
        t.r = r;
        t.g = g;
        t.b = b;
        t.a = a;
    }, setColor: function (_169) {
        var d = dojo;
        if (d.isString(_169)) {
            d.colorFromString(_169, this);
        } else {
            if (d.isArray(_169)) {
                d.colorFromArray(_169, this);
            } else {
                this._set(_169.r, _169.g, _169.b, _169.a);
                if (!(_169 instanceof d.Color)) {
                    this.sanitize();
                }
            }
        }
        return this;
    }, sanitize: function () {
        return this;
    }, toRgb: function () {
        var t = this;
        return [t.r, t.g, t.b];
    }, toRgba: function () {
        var t = this;
        return [t.r, t.g, t.b, t.a];
    }, toHex: function () {
        var arr = dojo.map(["r", "g", "b"], function (x) {
            var s = this[x].toString(16);
            return s.length < 2 ? "0" + s : s;
        }, this);
        return "#" + arr.join("");
    }, toCss: function (_170) {
        var t = this, rgb = t.r + ", " + t.g + ", " + t.b;
        return (_170 ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";
    }, toString: function () {
        return this.toCss(true);
    }});
    dojo.blendColors = function (_173, end, _175, obj) {
        var d = dojo, t = obj || new dojo.Color();
        d.forEach(["r", "g", "b", "a"], function (x) {
            t[x] = _173[x] + (end[x] - _173[x]) * _175;
            if (x != "a") {
                t[x] = Math.round(t[x]);
            }
        });
        return t.sanitize();
    };
    dojo.colorFromRgb = function (_17a, obj) {
        var m = _17a.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
        return m && dojo.colorFromArray(m[1].split(/\s*,\s*/), obj);
    };
    dojo.colorFromHex = function (_17d, obj) {
        var d = dojo, t = obj || new d.Color(), bits = (_17d.length == 4) ? 4 : 8, mask = (1 << bits) - 1;
        _17d = Number("0x" + _17d.substr(1));
        if (isNaN(_17d)) {
            return null;
        }
        d.forEach(["b", "g", "r"], function (x) {
            var c = _17d & mask;
            _17d >>= bits;
            t[x] = bits == 4 ? 17 * c : c;
        });
        t.a = 1;
        return t;
    };
    dojo.colorFromArray = function (a, obj) {
        var t = obj || new dojo.Color();
        t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
        if (isNaN(t.a)) {
            t.a = 1;
        }
        return t.sanitize();
    };
    dojo.colorFromString = function (str, obj) {
        var a = dojo.Color.named[str];
        return a && dojo.colorFromArray(a, obj) || dojo.colorFromRgb(str, obj) || dojo.colorFromHex(str, obj);
    };
}
if (!dojo._hasResource["dojo._base"]) {
    dojo._hasResource["dojo._base"] = true;
    dojo.provide("dojo._base");
    (function () {
        if (djConfig.require) {
            for (var x = 0; x < djConfig.require.length; x++) {
                dojo["require"](djConfig.require[x]);
            }
        }
    })();
}
if (!dojo._hasResource["dojo._base.window"]) {
    dojo._hasResource["dojo._base.window"] = true;
    dojo.provide("dojo._base.window");
    dojo._gearsObject = function () {
        var _18c;
        var _18d;
        var _18e = dojo.getObject("google.gears");
        if (_18e) {
            return _18e;
        }
        if (typeof GearsFactory != "undefined") {
            _18c = new GearsFactory();
        } else {
            if (dojo.isIE) {
                try {
                    _18c = new ActiveXObject("Gears.Factory");
                } catch (e) {
                }
            } else {
                if (navigator.mimeTypes["application/x-googlegears"]) {
                    _18c = document.createElement("object");
                    _18c.setAttribute("type", "application/x-googlegears");
                    _18c.setAttribute("width", 0);
                    _18c.setAttribute("height", 0);
                    _18c.style.display = "none";
                    document.documentElement.appendChild(_18c);
                }
            }
        }
        if (!_18c) {
            return null;
        }
        dojo.setObject("google.gears.factory", _18c);
        return dojo.getObject("google.gears");
    };
    dojo.isGears = (!!dojo._gearsObject()) || 0;
    dojo.doc = window["document"] || null;
    dojo.body = function () {
        return dojo.doc.body || dojo.doc.getElementsByTagName("body")[0];
    };
    dojo.setContext = function (_18f, _190) {
        dojo.global = _18f;
        dojo.doc = _190;
    };
    dojo._fireCallback = function (_191, _192, _193) {
        if (_192 && dojo.isString(_191)) {
            _191 = _192[_191];
        }
        return (_192 ? _191.apply(_192, _193 || []) : _191());
    };
    dojo.withGlobal = function (_194, _195, _196, _197) {
        var rval;
        var _199 = dojo.global;
        var _19a = dojo.doc;
        try {
            dojo.setContext(_194, _194.document);
            rval = dojo._fireCallback(_195, _196, _197);
        } finally {
            dojo.setContext(_199, _19a);
        }
        return rval;
    };
    dojo.withDoc = function (_19b, _19c, _19d, _19e) {
        var rval;
        var _1a0 = dojo.doc;
        try {
            dojo.doc = _19b;
            rval = dojo._fireCallback(_19c, _19d, _19e);
        } finally {
            dojo.doc = _1a0;
        }
        return rval;
    };
    (function () {
        var mp = djConfig["modulePaths"];
        if (mp) {
            for (var _1a2 in mp) {
                dojo.registerModulePath(_1a2, mp[_1a2]);
            }
        }
    })();
}
if (!dojo._hasResource["dojo._base.event"]) {
    dojo._hasResource["dojo._base.event"] = true;
    dojo.provide("dojo._base.event");
    (function () {
        var del = dojo._event_listener = {add: function (node, name, fp) {
            if (!node) {
                return;
            }
            name = del._normalizeEventName(name);
            fp = del._fixCallback(name, fp);
            var _1a7 = name;
            if ((!dojo.isIE) && ((name == "mouseenter") || (name == "mouseleave"))) {
                var _1a7 = name;
                var ofp = fp;
                name = (name == "mouseenter") ? "mouseover" : "mouseout";
                fp = function (e) {
                    var id = dojo.isDescendant(e.relatedTarget, node);
                    if (id == false) {
                        return ofp.call(this, e);
                    }
                };
            }
            node.addEventListener(name, fp, false);
            return fp;
        }, remove: function (node, _1ac, _1ad) {
            (node) && (node.removeEventListener(del._normalizeEventName(_1ac), _1ad, false));
        }, _normalizeEventName: function (name) {
            return (name.slice(0, 2) == "on" ? name.slice(2) : name);
        }, _fixCallback: function (name, fp) {
            return (name != "keypress" ? fp : function (e) {
                return fp.call(this, del._fixEvent(e, this));
            });
        }, _fixEvent: function (evt, _1b3) {
            switch (evt.type) {
                case "keypress":
                    del._setKeyChar(evt);
                    break;
            }
            return evt;
        }, _setKeyChar: function (evt) {
            evt.keyChar = (evt.charCode ? String.fromCharCode(evt.charCode) : "");
        }};
        dojo.fixEvent = function (evt, _1b6) {
            return del._fixEvent(evt, _1b6);
        };
        dojo.stopEvent = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        };
        var _1b8 = dojo._listener;
        dojo._connect = function (obj, _1ba, _1bb, _1bc, _1bd) {
            var _1be = obj && (obj.nodeType || obj.attachEvent || obj.addEventListener);
            var lid = !_1be ? 0 : (!_1bd ? 1 : 2), l = [dojo._listener, del, _1b8][lid];
            var h = l.add(obj, _1ba, dojo.hitch(_1bb, _1bc));
            return [obj, _1ba, h, lid];
        };
        dojo._disconnect = function (obj, _1c3, _1c4, _1c5) {
            ([dojo._listener, del, _1b8][_1c5]).remove(obj, _1c3, _1c4);
        };
        dojo.keys = {BACKSPACE: 8, TAB: 9, CLEAR: 12, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, PAUSE: 19, CAPS_LOCK: 20, ESCAPE: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT_ARROW: 37, UP_ARROW: 38, RIGHT_ARROW: 39, DOWN_ARROW: 40, INSERT: 45, DELETE: 46, HELP: 47, LEFT_WINDOW: 91, RIGHT_WINDOW: 92, SELECT: 93, NUMPAD_0: 96, NUMPAD_1: 97, NUMPAD_2: 98, NUMPAD_3: 99, NUMPAD_4: 100, NUMPAD_5: 101, NUMPAD_6: 102, NUMPAD_7: 103, NUMPAD_8: 104, NUMPAD_9: 105, NUMPAD_MULTIPLY: 106, NUMPAD_PLUS: 107, NUMPAD_ENTER: 108, NUMPAD_MINUS: 109, NUMPAD_PERIOD: 110, NUMPAD_DIVIDE: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, F13: 124, F14: 125, F15: 126, NUM_LOCK: 144, SCROLL_LOCK: 145};
        if (dojo.isIE) {
            var _1c6 = function (e, code) {
                try {
                    return (e.keyCode = code);
                } catch (e) {
                    return 0;
                }
            };
            var iel = dojo._listener;
            if (!djConfig._allow_leaks) {
                _1b8 = iel = dojo._ie_listener = {handlers: [], add: function (_1ca, _1cb, _1cc) {
                    _1ca = _1ca || dojo.global;
                    var f = _1ca[_1cb];
                    if (!f || !f._listeners) {
                        var d = dojo._getIeDispatcher();
                        d.target = f && (ieh.push(f) - 1);
                        d._listeners = [];
                        f = _1ca[_1cb] = d;
                    }
                    return f._listeners.push(ieh.push(_1cc) - 1);
                }, remove: function (_1d0, _1d1, _1d2) {
                    var f = (_1d0 || dojo.global)[_1d1], l = f && f._listeners;
                    if (f && l && _1d2--) {
                        delete ieh[l[_1d2]];
                        delete l[_1d2];
                    }
                }};
                var ieh = iel.handlers;
            }
            dojo.mixin(del, {add: function (node, _1d6, fp) {
                if (!node) {
                    return;
                }
                _1d6 = del._normalizeEventName(_1d6);
                if (_1d6 == "onkeypress") {
                    var kd = node.onkeydown;
                    if (!kd || !kd._listeners || !kd._stealthKeydown) {
                        del.add(node, "onkeydown", del._stealthKeyDown);
                        node.onkeydown._stealthKeydown = true;
                    }
                }
                return iel.add(node, _1d6, del._fixCallback(fp));
            }, remove: function (node, _1da, _1db) {
                iel.remove(node, del._normalizeEventName(_1da), _1db);
            }, _normalizeEventName: function (_1dc) {
                return (_1dc.slice(0, 2) != "on" ? "on" + _1dc : _1dc);
            }, _nop: function () {
            }, _fixEvent: function (evt, _1de) {
                if (!evt) {
                    var w = (_1de) && ((_1de.ownerDocument || _1de.document || _1de).parentWindow) || window;
                    evt = w.event;
                }
                if (!evt) {
                    return (evt);
                }
                evt.target = evt.srcElement;
                evt.currentTarget = (_1de || evt.srcElement);
                evt.layerX = evt.offsetX;
                evt.layerY = evt.offsetY;
                var se = evt.srcElement, doc = (se && se.ownerDocument) || document;
                var _1e2 = ((dojo.isIE < 6) || (doc["compatMode"] == "BackCompat")) ? doc.body : doc.documentElement;
                var _1e3 = dojo._getIeDocumentElementOffset();
                evt.pageX = evt.clientX + dojo._fixIeBiDiScrollLeft(_1e2.scrollLeft || 0) - _1e3.x;
                evt.pageY = evt.clientY + (_1e2.scrollTop || 0) - _1e3.y;
                if (evt.type == "mouseover") {
                    evt.relatedTarget = evt.fromElement;
                }
                if (evt.type == "mouseout") {
                    evt.relatedTarget = evt.toElement;
                }
                evt.stopPropagation = del._stopPropagation;
                evt.preventDefault = del._preventDefault;
                return del._fixKeys(evt);
            }, _fixKeys: function (evt) {
                switch (evt.type) {
                    case "keypress":
                        var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
                        if (c == 10) {
                            c = 0;
                            evt.keyCode = 13;
                        } else {
                            if (c == 13 || c == 27) {
                                c = 0;
                            } else {
                                if (c == 3) {
                                    c = 99;
                                }
                            }
                        }
                        evt.charCode = c;
                        del._setKeyChar(evt);
                        break;
                }
                return evt;
            }, _punctMap: {106: 42, 111: 47, 186: 59, 187: 43, 188: 44, 189: 45, 190: 46, 191: 47, 192: 96, 219: 91, 220: 92, 221: 93, 222: 39}, _stealthKeyDown: function (evt) {
                var kp = evt.currentTarget.onkeypress;
                if (!kp || !kp._listeners) {
                    return;
                }
                var k = evt.keyCode;
                var _1e9 = (k != 13) && (k != 32) && (k != 27) && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222);
                if (_1e9 || evt.ctrlKey) {
                    var c = (_1e9 ? 0 : k);
                    if (evt.ctrlKey) {
                        if (k == 3 || k == 13) {
                            return;
                        } else {
                            if (c > 95 && c < 106) {
                                c -= 48;
                            } else {
                                if ((!evt.shiftKey) && (c >= 65 && c <= 90)) {
                                    c += 32;
                                } else {
                                    c = del._punctMap[c] || c;
                                }
                            }
                        }
                    }
                    var faux = del._synthesizeEvent(evt, {type: "keypress", faux: true, charCode: c});
                    kp.call(evt.currentTarget, faux);
                    evt.cancelBubble = faux.cancelBubble;
                    evt.returnValue = faux.returnValue;
                    _1c6(evt, faux.keyCode);
                }
            }, _stopPropagation: function () {
                this.cancelBubble = true;
            }, _preventDefault: function () {
                this.bubbledKeyCode = this.keyCode;
                if (this.ctrlKey) {
                    _1c6(this, 0);
                }
                this.returnValue = false;
            }});
            dojo.stopEvent = function (evt) {
                evt = evt || window.event;
                del._stopPropagation.call(evt);
                del._preventDefault.call(evt);
            };
        }
        del._synthesizeEvent = function (evt, _1ee) {
            var faux = dojo.mixin({}, evt, _1ee);
            del._setKeyChar(faux);
            faux.preventDefault = function () {
                evt.preventDefault();
            };
            faux.stopPropagation = function () {
                evt.stopPropagation();
            };
            return faux;
        };
        if (dojo.isOpera) {
            dojo.mixin(del, {_fixEvent: function (evt, _1f1) {
                switch (evt.type) {
                    case "keypress":
                        var c = evt.which;
                        if (c == 3) {
                            c = 99;
                        }
                        c = ((c < 41) && (!evt.shiftKey) ? 0 : c);
                        if ((evt.ctrlKey) && (!evt.shiftKey) && (c >= 65) && (c <= 90)) {
                            c += 32;
                        }
                        return del._synthesizeEvent(evt, {charCode: c});
                }
                return evt;
            }});
        }
        if (dojo.isSafari) {
            dojo.mixin(del, {_fixEvent: function (evt, _1f4) {
                switch (evt.type) {
                    case "keypress":
                        var c = evt.charCode, s = evt.shiftKey, k = evt.keyCode;
                        k = k || _1f8[evt.keyIdentifier] || 0;
                        if (evt.keyIdentifier == "Enter") {
                            c = 0;
                        } else {
                            if ((evt.ctrlKey) && (c > 0) && (c < 27)) {
                                c += 96;
                            } else {
                                if (c == dojo.keys.SHIFT_TAB) {
                                    c = dojo.keys.TAB;
                                    s = true;
                                } else {
                                    c = (c >= 32 && c < 63232 ? c : 0);
                                }
                            }
                        }
                        return del._synthesizeEvent(evt, {charCode: c, shiftKey: s, keyCode: k});
                }
                return evt;
            }});
            dojo.mixin(dojo.keys, {SHIFT_TAB: 25, UP_ARROW: 63232, DOWN_ARROW: 63233, LEFT_ARROW: 63234, RIGHT_ARROW: 63235, F1: 63236, F2: 63237, F3: 63238, F4: 63239, F5: 63240, F6: 63241, F7: 63242, F8: 63243, F9: 63244, F10: 63245, F11: 63246, F12: 63247, PAUSE: 63250, DELETE: 63272, HOME: 63273, END: 63275, PAGE_UP: 63276, PAGE_DOWN: 63277, INSERT: 63302, PRINT_SCREEN: 63248, SCROLL_LOCK: 63249, NUM_LOCK: 63289});
            var dk = dojo.keys, _1f8 = {"Up": dk.UP_ARROW, "Down": dk.DOWN_ARROW, "Left": dk.LEFT_ARROW, "Right": dk.RIGHT_ARROW, "PageUp": dk.PAGE_UP, "PageDown": dk.PAGE_DOWN};
        }
    })();
    if (dojo.isIE) {
        dojo._getIeDispatcher = function () {
            return function () {
                var ap = Array.prototype, h = dojo._ie_listener.handlers, c = arguments.callee, ls = c._listeners, t = h[c.target];
                var r = t && t.apply(this, arguments);
                for (var i in ls) {
                    if (!(i in ap)) {
                        h[ls[i]].apply(this, arguments);
                    }
                }
                return r;
            };
        };
        dojo._event_listener._fixCallback = function (fp) {
            var f = dojo._event_listener._fixEvent;
            return function (e) {
                return fp.call(this, f(e, this));
            };
        };
    }
}
if (!dojo._hasResource["dojo._base.html"]) {
    dojo._hasResource["dojo._base.html"] = true;
    dojo.provide("dojo._base.html");
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch (e) {
    }
    if (dojo.isIE || dojo.isOpera) {
        dojo.byId = function (id, doc) {
            if (dojo.isString(id)) {
                var _d = doc || dojo.doc;
                var te = _d.getElementById(id);
                if (te && te.attributes.id.value == id) {
                    return te;
                } else {
                    var eles = _d.all[id];
                    if (!eles) {
                        return;
                    }
                    if (!eles.length) {
                        return eles;
                    }
                    var i = 0;
                    while ((te = eles[i++])) {
                        if (te.attributes.id.value == id) {
                            return te;
                        }
                    }
                }
            } else {
                return id;
            }
        };
    } else {
        dojo.byId = function (id, doc) {
            if (dojo.isString(id)) {
                return (doc || dojo.doc).getElementById(id);
            } else {
                return id;
            }
        };
    }
    (function () {
        var _20c = null;
        dojo._destroyElement = function (node) {
            node = dojo.byId(node);
            try {
                if (!_20c) {
                    _20c = document.createElement("div");
                }
                _20c.appendChild(node.parentNode ? node.parentNode.removeChild(node) : node);
                _20c.innerHTML = "";
            } catch (e) {
            }
        };
        dojo.isDescendant = function (node, _20f) {
            try {
                node = dojo.byId(node);
                _20f = dojo.byId(_20f);
                while (node) {
                    if (node === _20f) {
                        return true;
                    }
                    node = node.parentNode;
                }
            } catch (e) {
                return -1;
            }
            return false;
        };
        dojo.setSelectable = function (node, _211) {
            node = dojo.byId(node);
            if (dojo.isMozilla) {
                node.style.MozUserSelect = _211 ? "" : "none";
            } else {
                if (dojo.isKhtml) {
                    node.style.KhtmlUserSelect = _211 ? "auto" : "none";
                } else {
                    if (dojo.isIE) {
                        node.unselectable = _211 ? "" : "on";
                        dojo.query("*", node).forEach(function (_212) {
                            _212.unselectable = _211 ? "" : "on";
                        });
                    }
                }
            }
        };
        var _213 = function (node, ref) {
            ref.parentNode.insertBefore(node, ref);
            return true;
        };
        var _216 = function (node, ref) {
            var pn = ref.parentNode;
            if (ref == pn.lastChild) {
                pn.appendChild(node);
            } else {
                return _213(node, ref.nextSibling);
            }
            return true;
        };
        dojo.place = function (node, _21b, _21c) {
            if (!node || !_21b || _21c === undefined) {
                return false;
            }
            node = dojo.byId(node);
            _21b = dojo.byId(_21b);
            if (typeof _21c == "number") {
                var cn = _21b.childNodes;
                if ((_21c == 0 && cn.length == 0) || cn.length == _21c) {
                    _21b.appendChild(node);
                    return true;
                }
                if (_21c == 0) {
                    return _213(node, _21b.firstChild);
                }
                return _216(node, cn[_21c - 1]);
            }
            switch (_21c.toLowerCase()) {
                case "before":
                    return _213(node, _21b);
                case "after":
                    return _216(node, _21b);
                case "first":
                    if (_21b.firstChild) {
                        return _213(node, _21b.firstChild);
                    } else {
                        _21b.appendChild(node);
                        return true;
                    }
                    break;
                default:
                    _21b.appendChild(node);
                    return true;
            }
        };
        dojo.boxModel = "content-box";
        if (dojo.isIE) {
            var _dcm = document.compatMode;
            dojo.boxModel = (_dcm == "BackCompat") || (_dcm == "QuirksMode") || (dojo.isIE < 6) ? "border-box" : "content-box";
        }
        var gcs, dv = document.defaultView;
        if (dojo.isSafari) {
            gcs = function (node) {
                var s = dv.getComputedStyle(node, null);
                if (!s && node.style) {
                    node.style.display = "";
                    s = dv.getComputedStyle(node, null);
                }
                return s || {};
            };
        } else {
            if (dojo.isIE) {
                gcs = function (node) {
                    return node.currentStyle;
                };
            } else {
                gcs = function (node) {
                    return dv.getComputedStyle(node, null);
                };
            }
        }
        dojo.getComputedStyle = gcs;
        if (!dojo.isIE) {
            dojo._toPixelValue = function (_225, _226) {
                return parseFloat(_226) || 0;
            };
        } else {
            dojo._toPixelValue = function (_227, _228) {
                if (!_228) {
                    return 0;
                }
                if (_228 == "medium") {
                    return 4;
                }
                if (_228.slice && (_228.slice(-2) == "px")) {
                    return parseFloat(_228);
                }
                with (_227) {
                    var _229 = style.left;
                    var _22a = runtimeStyle.left;
                    runtimeStyle.left = currentStyle.left;
                    try {
                        style.left = _228;
                        _228 = style.pixelLeft;
                    } catch (e) {
                        _228 = 0;
                    }
                    style.left = _229;
                    runtimeStyle.left = _22a;
                }
                return _228;
            };
        }
        dojo._getOpacity = (dojo.isIE ? function (node) {
            try {
                return (node.filters.alpha.opacity / 100);
            } catch (e) {
                return 1;
            }
        } : function (node) {
            return dojo.getComputedStyle(node).opacity;
        });
        dojo._setOpacity = (dojo.isIE ? function (node, _22e) {
            if (_22e == 1) {
                node.style.cssText = node.style.cssText.replace(/FILTER:[^;]*;/i, "");
                if (node.nodeName.toLowerCase() == "tr") {
                    dojo.query("> td", node).forEach(function (i) {
                        i.style.cssText = i.style.cssText.replace(/FILTER:[^;]*;/i, "");
                    });
                }
            } else {
                var o = "Alpha(Opacity=" + (_22e * 100) + ")";
                node.style.filter = o;
            }
            if (node.nodeName.toLowerCase() == "tr") {
                dojo.query("> td", node).forEach(function (i) {
                    i.style.filter = o;
                });
            }
            return _22e;
        } : function (node, _233) {
            return node.style.opacity = _233;
        });
        var _234 = {width: true, height: true, left: true, top: true};
        var _235 = function (node, type, _238) {
            type = type.toLowerCase();
            if (_234[type] === true) {
                return dojo._toPixelValue(node, _238);
            } else {
                if (_234[type] === false) {
                    return _238;
                } else {
                    if (dojo.isOpera && type == "cssText") {
                    }
                    if ((type.indexOf("margin") >= 0) || (type.indexOf("padding") >= 0) || (type.indexOf("width") >= 0) || (type.indexOf("height") >= 0) || (type.indexOf("max") >= 0) || (type.indexOf("min") >= 0) || (type.indexOf("offset") >= 0)) {
                        _234[type] = true;
                        return dojo._toPixelValue(node, _238);
                    } else {
                        _234[type] = false;
                        return _238;
                    }
                }
            }
        };
        dojo.style = function (node, _23a, _23b) {
            var n = dojo.byId(node), args = arguments.length, op = (_23a == "opacity");
            if (args == 3) {
                return op ? dojo._setOpacity(n, _23b) : n.style[_23a] = _23b;
            }
            if (args == 2 && op) {
                return dojo._getOpacity(n);
            }
            var s = dojo.getComputedStyle(n);
            return (args == 1) ? s : _235(n, _23a, s[_23a]);
        };
        dojo._getPadExtents = function (n, _241) {
            var s = _241 || gcs(n), px = dojo._toPixelValue, l = px(n, s.paddingLeft), t = px(n, s.paddingTop);
            return {l: l, t: t, w: l + px(n, s.paddingRight), h: t + px(n, s.paddingBottom)};
        };
        dojo._getBorderExtents = function (n, _247) {
            var ne = "none", px = dojo._toPixelValue, s = _247 || gcs(n), bl = (s.borderLeftStyle != ne ? px(n, s.borderLeftWidth) : 0), bt = (s.borderTopStyle != ne ? px(n, s.borderTopWidth) : 0);
            return {l: bl, t: bt, w: bl + (s.borderRightStyle != ne ? px(n, s.borderRightWidth) : 0), h: bt + (s.borderBottomStyle != ne ? px(n, s.borderBottomWidth) : 0)};
        };
        dojo._getPadBorderExtents = function (n, _24e) {
            var s = _24e || gcs(n), p = dojo._getPadExtents(n, s), b = dojo._getBorderExtents(n, s);
            return {l: p.l + b.l, t: p.t + b.t, w: p.w + b.w, h: p.h + b.h};
        };
        dojo._getMarginExtents = function (n, _253) {
            var s = _253 || gcs(n), px = dojo._toPixelValue, l = px(n, s.marginLeft), t = px(n, s.marginTop), r = px(n, s.marginRight), b = px(n, s.marginBottom);
            if (dojo.isSafari && (s.position != "absolute")) {
                r = l;
            }
            return {l: l, t: t, w: l + r, h: t + b};
        };
        dojo._getMarginBox = function (node, _25b) {
            var s = _25b || gcs(node), me = dojo._getMarginExtents(node, s);
            var l = node.offsetLeft - me.l, t = node.offsetTop - me.t;
            if (dojo.isMoz) {
                var sl = parseFloat(s.left), st = parseFloat(s.top);
                if (!isNaN(sl) && !isNaN(st)) {
                    l = sl, t = st;
                } else {
                    var p = node.parentNode;
                    if (p && p.style) {
                        var pcs = gcs(p);
                        if (pcs.overflow != "visible") {
                            var be = dojo._getBorderExtents(p, pcs);
                            l += be.l, t += be.t;
                        }
                    }
                }
            } else {
                if (dojo.isOpera) {
                    var p = node.parentNode;
                    if (p) {
                        var be = dojo._getBorderExtents(p);
                        l -= be.l, t -= be.t;
                    }
                }
            }
            return {l: l, t: t, w: node.offsetWidth + me.w, h: node.offsetHeight + me.h};
        };
        dojo._getContentBox = function (node, _266) {
            var s = _266 || gcs(node), pe = dojo._getPadExtents(node, s), be = dojo._getBorderExtents(node, s), w = node.clientWidth, h;
            if (!w) {
                w = node.offsetWidth, h = node.offsetHeight;
            } else {
                h = node.clientHeight, be.w = be.h = 0;
            }
            if (dojo.isOpera) {
                pe.l += be.l;
                pe.t += be.t;
            }
            return {l: pe.l, t: pe.t, w: w - pe.w - be.w, h: h - pe.h - be.h};
        };
        dojo._getBorderBox = function (node, _26d) {
            var s = _26d || gcs(node), pe = dojo._getPadExtents(node, s), cb = dojo._getContentBox(node, s);
            return {l: cb.l - pe.l, t: cb.t - pe.t, w: cb.w + pe.w, h: cb.h + pe.h};
        };
        dojo._setBox = function (node, l, t, w, h, u) {
            u = u || "px";
            with (node.style) {
                if (!isNaN(l)) {
                    left = l + u;
                }
                if (!isNaN(t)) {
                    top = t + u;
                }
                if (w >= 0) {
                    width = w + u;
                }
                if (h >= 0) {
                    height = h + u;
                }
            }
        };
        dojo._usesBorderBox = function (node) {
            var n = node.tagName;
            return dojo.boxModel == "border-box" || n == "TABLE" || n == "BUTTON";
        };
        dojo._setContentSize = function (node, _27a, _27b, _27c) {
            var bb = dojo._usesBorderBox(node);
            if (bb) {
                var pb = dojo._getPadBorderExtents(node, _27c);
                if (_27a >= 0) {
                    _27a += pb.w;
                }
                if (_27b >= 0) {
                    _27b += pb.h;
                }
            }
            dojo._setBox(node, NaN, NaN, _27a, _27b);
        };
        dojo._setMarginBox = function (node, _280, _281, _282, _283, _284) {
            var s = _284 || dojo.getComputedStyle(node);
            var bb = dojo._usesBorderBox(node), pb = bb ? _288 : dojo._getPadBorderExtents(node, s), mb = dojo._getMarginExtents(node, s);
            if (_282 >= 0) {
                _282 = Math.max(_282 - pb.w - mb.w, 0);
            }
            if (_283 >= 0) {
                _283 = Math.max(_283 - pb.h - mb.h, 0);
            }
            dojo._setBox(node, _280, _281, _282, _283);
        };
        var _288 = {l: 0, t: 0, w: 0, h: 0};
        dojo.marginBox = function (node, box) {
            var n = dojo.byId(node), s = gcs(n), b = box;
            return !b ? dojo._getMarginBox(n, s) : dojo._setMarginBox(n, b.l, b.t, b.w, b.h, s);
        };
        dojo.contentBox = function (node, box) {
            var n = dojo.byId(node), s = gcs(n), b = box;
            return !b ? dojo._getContentBox(n, s) : dojo._setContentSize(n, b.w, b.h, s);
        };
        var _294 = function (node, prop) {
            if (!(node = (node || 0).parentNode)) {
                return 0;
            }
            var val, _298 = 0, _b = dojo.body();
            while (node && node.style) {
                if (gcs(node).position == "fixed") {
                    return 0;
                }
                val = node[prop];
                if (val) {
                    _298 += val - 0;
                    if (node == _b) {
                        break;
                    }
                }
                node = node.parentNode;
            }
            return _298;
        };
        dojo._docScroll = function () {
            var _b = dojo.body();
            var _w = dojo.global;
            var de = dojo.doc.documentElement;
            return {y: (_w.pageYOffset || de.scrollTop || _b.scrollTop || 0), x: (_w.pageXOffset || dojo._fixIeBiDiScrollLeft(de.scrollLeft) || _b.scrollLeft || 0)};
        };
        dojo._isBodyLtr = function () {
            return !("_bodyLtr" in dojo) ? dojo._bodyLtr = dojo.getComputedStyle(dojo.body()).direction == "ltr" : dojo._bodyLtr;
        };
        dojo._getIeDocumentElementOffset = function () {
            var de = dojo.doc.documentElement;
            if (dojo.isIE >= 7) {
                return {x: de.getBoundingClientRect().left, y: de.getBoundingClientRect().top};
            } else {
                return {x: dojo._isBodyLtr() || window.parent == window ? de.clientLeft : de.offsetWidth - de.clientWidth - de.clientLeft, y: de.clientTop};
            }
        };
        dojo._fixIeBiDiScrollLeft = function (_29e) {
            if (dojo.isIE && !dojo._isBodyLtr()) {
                var de = dojo.doc.documentElement;
                return _29e + de.clientWidth - de.scrollWidth;
            }
            return _29e;
        };
        dojo._abs = function (node, _2a1) {
            var _2a2 = node.ownerDocument;
            var ret = {x: 0, y: 0};
            var _2a4 = false;
            var db = dojo.body();
            if (dojo.isIE) {
                var _2a6 = node.getBoundingClientRect();
                var _2a7 = dojo._getIeDocumentElementOffset();
                ret.x = _2a6.left - _2a7.x;
                ret.y = _2a6.top - _2a7.y;
            } else {
                if (_2a2["getBoxObjectFor"]) {
                    var bo = _2a2.getBoxObjectFor(node);
                    ret.x = bo.x - _294(node, "scrollLeft");
                    ret.y = bo.y - _294(node, "scrollTop");
                } else {
                    if (node["offsetParent"]) {
                        _2a4 = true;
                        var _2a9;
                        if (dojo.isSafari && (gcs(node).position == "absolute") && (node.parentNode == db)) {
                            _2a9 = db;
                        } else {
                            _2a9 = db.parentNode;
                        }
                        if (node.parentNode != db) {
                            var nd = node;
                            if (dojo.isOpera || (dojo.isSafari >= 3)) {
                                nd = db;
                            }
                            ret.x -= _294(nd, "scrollLeft");
                            ret.y -= _294(nd, "scrollTop");
                        }
                        var _2ab = node;
                        do {
                            var n = _2ab["offsetLeft"];
                            if (!dojo.isOpera || n > 0) {
                                ret.x += isNaN(n) ? 0 : n;
                            }
                            var m = _2ab["offsetTop"];
                            ret.y += isNaN(m) ? 0 : m;
                            _2ab = _2ab.offsetParent;
                        } while ((_2ab != _2a9) && _2ab);
                    } else {
                        if (node["x"] && node["y"]) {
                            ret.x += isNaN(node.x) ? 0 : node.x;
                            ret.y += isNaN(node.y) ? 0 : node.y;
                        }
                    }
                }
            }
            if (_2a4 || _2a1) {
                var _2ae = dojo._docScroll();
                var m = _2a4 ? (!_2a1 ? -1 : 0) : 1;
                ret.y += m * _2ae.y;
                ret.x += m * _2ae.x;
            }
            return ret;
        };
        dojo.coords = function (node, _2b0) {
            var n = dojo.byId(node), s = gcs(n), mb = dojo._getMarginBox(n, s);
            var abs = dojo._abs(n, _2b0);
            mb.x = abs.x;
            mb.y = abs.y;
            return mb;
        };
    })();
    dojo.hasClass = function (node, _2b6) {
        return ((" " + dojo.byId(node).className + " ").indexOf(" " + _2b6 + " ") >= 0);
    };
    dojo.addClass = function (node, _2b8) {
        node = dojo.byId(node);
        var cls = node.className;
        if ((" " + cls + " ").indexOf(" " + _2b8 + " ") < 0) {
            node.className = cls + (cls ? " " : "") + _2b8;
        }
    };
    dojo.removeClass = function (node, _2bb) {
        node = dojo.byId(node);
        var t = dojo.trim((" " + node.className + " ").replace(" " + _2bb + " ", " "));
        if (node.className != t) {
            node.className = t;
        }
    };
    dojo.toggleClass = function (node, _2be, _2bf) {
        if (_2bf === undefined) {
            _2bf = !dojo.hasClass(node, _2be);
        }
        dojo[_2bf ? "addClass" : "removeClass"](node, _2be);
    };
}
if (!dojo._hasResource["dojo._base.NodeList"]) {
    dojo._hasResource["dojo._base.NodeList"] = true;
    dojo.provide("dojo._base.NodeList");
    (function () {
        var d = dojo;
        var tnl = function (arr) {
            arr.constructor = dojo.NodeList;
            dojo._mixin(arr, dojo.NodeList.prototype);
            return arr;
        };
        dojo.NodeList = function () {
            return tnl(Array.apply(null, arguments));
        };
        dojo.NodeList._wrap = tnl;
        dojo.extend(dojo.NodeList, {slice: function () {
            var a = dojo._toArray(arguments);
            return tnl(a.slice.apply(this, a));
        }, splice: function () {
            var a = dojo._toArray(arguments);
            return tnl(a.splice.apply(this, a));
        }, concat: function () {
            var a = dojo._toArray(arguments, 0, [this]);
            return tnl(a.concat.apply([], a));
        }, indexOf: function (_2c6, _2c7) {
            return d.indexOf(this, _2c6, _2c7);
        }, lastIndexOf: function () {
            return d.lastIndexOf.apply(d, d._toArray(arguments, 0, [this]));
        }, every: function (_2c8, _2c9) {
            return d.every(this, _2c8, _2c9);
        }, some: function (_2ca, _2cb) {
            return d.some(this, _2ca, _2cb);
        }, map: function (func, obj) {
            return d.map(this, func, obj, d.NodeList);
        }, forEach: function (_2ce, _2cf) {
            d.forEach(this, _2ce, _2cf);
            return this;
        }, coords: function () {
            return d.map(this, d.coords);
        }, style: function () {
            var aa = d._toArray(arguments, 0, [null]);
            var s = this.map(function (i) {
                aa[0] = i;
                return d.style.apply(d, aa);
            });
            return (arguments.length > 1) ? this : s;
        }, styles: function () {
            d.deprecated("NodeList.styles", "use NodeList.style instead", "1.1");
            return this.style.apply(this, arguments);
        }, addClass: function (_2d3) {
            this.forEach(function (i) {
                d.addClass(i, _2d3);
            });
            return this;
        }, removeClass: function (_2d5) {
            this.forEach(function (i) {
                d.removeClass(i, _2d5);
            });
            return this;
        }, place: function (_2d7, _2d8) {
            var item = d.query(_2d7)[0];
            _2d8 = _2d8 || "last";
            for (var x = 0; x < this.length; x++) {
                d.place(this[x], item, _2d8);
            }
            return this;
        }, connect: function (_2db, _2dc, _2dd) {
            this.forEach(function (item) {
                d.connect(item, _2db, _2dc, _2dd);
            });
            return this;
        }, orphan: function (_2df) {
            var _2e0 = (_2df) ? d._filterQueryResult(this, _2df) : this;
            _2e0.forEach(function (item) {
                if (item["parentNode"]) {
                    item.parentNode.removeChild(item);
                }
            });
            return _2e0;
        }, adopt: function (_2e2, _2e3) {
            var item = this[0];
            return d.query(_2e2).forEach(function (ai) {
                d.place(ai, item, (_2e3 || "last"));
            });
        }, query: function (_2e6) {
            _2e6 = _2e6 || "";
            var ret = d.NodeList();
            this.forEach(function (item) {
                d.query(_2e6, item).forEach(function (_2e9) {
                    if (typeof _2e9 != "undefined") {
                        ret.push(_2e9);
                    }
                });
            });
            return ret;
        }, filter: function (_2ea) {
            var _2eb = this;
            var _a = arguments;
            var r = d.NodeList();
            var rp = function (t) {
                if (typeof t != "undefined") {
                    r.push(t);
                }
            };
            if (d.isString(_2ea)) {
                _2eb = d._filterQueryResult(this, _a[0]);
                if (_a.length == 1) {
                    return _2eb;
                }
                d.forEach(d.filter(_2eb, _a[1], _a[2]), rp);
                return r;
            }
            d.forEach(d.filter(_2eb, _a[0], _a[1]), rp);
            return r;
        }, addContent: function (_2f0, _2f1) {
            var ta = d.doc.createElement("span");
            if (d.isString(_2f0)) {
                ta.innerHTML = _2f0;
            } else {
                ta.appendChild(_2f0);
            }
            var ct = ((_2f1 == "first") || (_2f1 == "after")) ? "lastChild" : "firstChild";
            this.forEach(function (item) {
                var tn = ta.cloneNode(true);
                while (tn[ct]) {
                    d.place(tn[ct], item, _2f1);
                }
            });
            return this;
        }});
        d.forEach(["blur", "click", "keydown", "keypress", "keyup", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup"], function (evt) {
            var _oe = "on" + evt;
            dojo.NodeList.prototype[_oe] = function (a, b) {
                return this.connect(_oe, a, b);
            };
        });
    })();
}
if (!dojo._hasResource["dojo._base.query"]) {
    dojo._hasResource["dojo._base.query"] = true;
    dojo.provide("dojo._base.query");
    (function () {
        var d = dojo;
        var _2fb = dojo.isIE ? "children" : "childNodes";
        var _2fc = function (_2fd) {
            if (_2fd.charAt(_2fd.length - 1) == ">") {
                _2fd += " *";
            }
            _2fd += " ";
            var ts = function (s, e) {
                return d.trim(_2fd.slice(s, e));
            };
            var _301 = [];
            var _302 = -1;
            var _303 = -1;
            var _304 = -1;
            var _305 = -1;
            var _306 = -1;
            var inId = -1;
            var _308 = -1;
            var lc = "";
            var cc = "";
            var _30b;
            var x = 0;
            var ql = _2fd.length;
            var _30e = null;
            var _cp = null;
            var _310 = function () {
                if (_308 >= 0) {
                    var tv = (_308 == x) ? null : ts(_308, x).toLowerCase();
                    _30e[(">~+".indexOf(tv) < 0) ? "tag" : "oper"] = tv;
                    _308 = -1;
                }
            };
            var _312 = function () {
                if (inId >= 0) {
                    _30e.id = ts(inId, x).replace(/\\/g, "");
                    inId = -1;
                }
            };
            var _313 = function () {
                if (_306 >= 0) {
                    _30e.classes.push(ts(_306 + 1, x).replace(/\\/g, ""));
                    _306 = -1;
                }
            };
            var _314 = function () {
                _312();
                _310();
                _313();
            };
            for (; x < ql, lc = cc, cc = _2fd.charAt(x); x++) {
                if (lc == "\\") {
                    continue;
                }
                if (!_30e) {
                    _30b = x;
                    _30e = {query: null, pseudos: [], attrs: [], classes: [], tag: null, oper: null, id: null};
                    _308 = x;
                }
                if (_302 >= 0) {
                    if (cc == "]") {
                        if (!_cp.attr) {
                            _cp.attr = ts(_302 + 1, x);
                        } else {
                            _cp.matchFor = ts((_304 || _302 + 1), x);
                        }
                        var cmf = _cp.matchFor;
                        if (cmf) {
                            if ((cmf.charAt(0) == "\"") || (cmf.charAt(0) == "'")) {
                                _cp.matchFor = cmf.substring(1, cmf.length - 1);
                            }
                        }
                        _30e.attrs.push(_cp);
                        _cp = null;
                        _302 = _304 = -1;
                    } else {
                        if (cc == "=") {
                            var _316 = ("|~^$*".indexOf(lc) >= 0) ? lc : "";
                            _cp.type = _316 + cc;
                            _cp.attr = ts(_302 + 1, x - _316.length);
                            _304 = x + 1;
                        }
                    }
                } else {
                    if (_303 >= 0) {
                        if (cc == ")") {
                            if (_305 >= 0) {
                                _cp.value = ts(_303 + 1, x);
                            }
                            _305 = _303 = -1;
                        }
                    } else {
                        if (cc == "#") {
                            _314();
                            inId = x + 1;
                        } else {
                            if (cc == ".") {
                                _314();
                                _306 = x;
                            } else {
                                if (cc == ":") {
                                    _314();
                                    _305 = x;
                                } else {
                                    if (cc == "[") {
                                        _314();
                                        _302 = x;
                                        _cp = {};
                                    } else {
                                        if (cc == "(") {
                                            if (_305 >= 0) {
                                                _cp = {name: ts(_305 + 1, x), value: null};
                                                _30e.pseudos.push(_cp);
                                            }
                                            _303 = x;
                                        } else {
                                            if (cc == " " && lc != cc) {
                                                _314();
                                                if (_305 >= 0) {
                                                    _30e.pseudos.push({name: ts(_305 + 1, x)});
                                                }
                                                _30e.hasLoops = (_30e.pseudos.length || _30e.attrs.length || _30e.classes.length);
                                                _30e.query = ts(_30b, x);
                                                _30e.tag = (_30e["oper"]) ? null : (_30e.tag || "*");
                                                _301.push(_30e);
                                                _30e = null;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return _301;
        };
        var _317 = {"*=": function (attr, _319) {
            return "[contains(@" + attr + ", '" + _319 + "')]";
        }, "^=": function (attr, _31b) {
            return "[starts-with(@" + attr + ", '" + _31b + "')]";
        }, "$=": function (attr, _31d) {
            return "[substring(@" + attr + ", string-length(@" + attr + ")-" + (_31d.length - 1) + ")='" + _31d + "']";
        }, "~=": function (attr, _31f) {
            return "[contains(concat(' ',@" + attr + ",' '), ' " + _31f + " ')]";
        }, "|=": function (attr, _321) {
            return "[contains(concat(' ',@" + attr + ",' '), ' " + _321 + "-')]";
        }, "=": function (attr, _323) {
            return "[@" + attr + "='" + _323 + "']";
        }};
        var _324 = function (_325, _326, _327, _328) {
            d.forEach(_326.attrs, function (attr) {
                var _32a;
                if (attr.type && _325[attr.type]) {
                    _32a = _325[attr.type](attr.attr, attr.matchFor);
                } else {
                    if (attr.attr.length) {
                        _32a = _327(attr.attr);
                    }
                }
                if (_32a) {
                    _328(_32a);
                }
            });
        };
        var _32b = function (_32c) {
            var _32d = ".";
            var _32e = _2fc(d.trim(_32c));
            while (_32e.length) {
                var tqp = _32e.shift();
                var _330;
                if (tqp.oper == ">") {
                    _330 = "/";
                    tqp = _32e.shift();
                } else {
                    _330 = "//";
                }
                _32d += _330 + tqp.tag;
                if (tqp.id) {
                    _32d += "[@id='" + tqp.id + "'][1]";
                }
                d.forEach(tqp.classes, function (cn) {
                    var cnl = cn.length;
                    var _333 = " ";
                    if (cn.charAt(cnl - 1) == "*") {
                        _333 = "";
                        cn = cn.substr(0, cnl - 1);
                    }
                    _32d += "[contains(concat(' ',@class,' '), ' " + cn + _333 + "')]";
                });
                _324(_317, tqp, function (_334) {
                    return "[@" + _334 + "]";
                }, function (_335) {
                    _32d += _335;
                });
            }
            return _32d;
        };
        var _336 = {};
        var _337 = function (path) {
            if (_336[path]) {
                return _336[path];
            }
            var doc = d.doc;
            var _33a = _32b(path);
            var tf = function (_33c) {
                var ret = [];
                var _33e;
                try {
                    _33e = doc.evaluate(_33a, _33c, null, XPathResult.ANY_TYPE, null);
                } catch (e) {
                    console.debug("failure in exprssion:", _33a, "under:", _33c);
                    console.debug(e);
                }
                var _33f = _33e.iterateNext();
                while (_33f) {
                    ret.push(_33f);
                    _33f = _33e.iterateNext();
                }
                return ret;
            };
            return _336[path] = tf;
        };
        var _340 = {};
        var _341 = {};
        var _342 = function (_343, _344) {
            if (!_343) {
                return _344;
            }
            if (!_344) {
                return _343;
            }
            return function () {
                return _343.apply(window, arguments) && _344.apply(window, arguments);
            };
        };
        var _345 = function (_346, _347, _348, idx) {
            var nidx = idx + 1;
            var _34b = (_347.length == nidx);
            var tqp = _347[idx];
            if (tqp.oper == ">") {
                var ecn = _346[_2fb];
                if (!ecn || !ecn.length) {
                    return;
                }
                nidx++;
                _34b = (_347.length == nidx);
                var tf = _34f(_347[idx + 1]);
                for (var x = 0, ecnl = ecn.length, te; x < ecnl, te = ecn[x]; x++) {
                    if (tf(te)) {
                        if (_34b) {
                            _348.push(te);
                        } else {
                            _345(te, _347, _348, nidx);
                        }
                    }
                }
            }
            var _353 = _354(tqp)(_346);
            if (_34b) {
                while (_353.length) {
                    _348.push(_353.shift());
                }
            } else {
                while (_353.length) {
                    _345(_353.shift(), _347, _348, nidx);
                }
            }
        };
        var _355 = function (_356, _357) {
            var ret = [];
            var x = _356.length - 1, te;
            while (te = _356[x--]) {
                _345(te, _357, ret, 0);
            }
            return ret;
        };
        var _34f = function (q) {
            if (_340[q.query]) {
                return _340[q.query];
            }
            var ff = null;
            if (q.tag) {
                if (q.tag == "*") {
                    ff = _342(ff, function (elem) {
                        return (elem.nodeType == 1);
                    });
                } else {
                    ff = _342(ff, function (elem) {
                        return ((elem.nodeType == 1) && (q.tag == elem.tagName.toLowerCase()));
                    });
                }
            }
            if (q.id) {
                ff = _342(ff, function (elem) {
                    return ((elem.nodeType == 1) && (elem.id == q.id));
                });
            }
            if (q.hasLoops) {
                ff = _342(ff, _360(q));
            }
            return _340[q.query] = ff;
        };
        var _361 = function (node) {
            var pn = node.parentNode;
            var pnc = pn.childNodes;
            var nidx = -1;
            var _366 = pn.firstChild;
            if (!_366) {
                return nidx;
            }
            var ci = node["__cachedIndex"];
            var cl = pn["__cachedLength"];
            if (((typeof cl == "number") && (cl != pnc.length)) || (typeof ci != "number")) {
                pn["__cachedLength"] = pnc.length;
                var idx = 1;
                do {
                    if (_366 === node) {
                        nidx = idx;
                    }
                    if (_366.nodeType == 1) {
                        _366["__cachedIndex"] = idx;
                        idx++;
                    }
                    _366 = _366.nextSibling;
                } while (_366);
            } else {
                nidx = ci;
            }
            return nidx;
        };
        var _36a = 0;
        var _36b = "";
        var _36c = function (elem, attr) {
            if (attr == "class") {
                return elem.className || _36b;
            }
            if (attr == "for") {
                return elem.htmlFor || _36b;
            }
            return elem.getAttribute(attr, 2) || _36b;
        };
        var _36f = {"*=": function (attr, _371) {
            return function (elem) {
                return (_36c(elem, attr).indexOf(_371) >= 0);
            };
        }, "^=": function (attr, _374) {
            return function (elem) {
                return (_36c(elem, attr).indexOf(_374) == 0);
            };
        }, "$=": function (attr, _377) {
            var tval = " " + _377;
            return function (elem) {
                var ea = " " + _36c(elem, attr);
                return (ea.lastIndexOf(_377) == (ea.length - _377.length));
            };
        }, "~=": function (attr, _37c) {
            var tval = " " + _37c + " ";
            return function (elem) {
                var ea = " " + _36c(elem, attr) + " ";
                return (ea.indexOf(tval) >= 0);
            };
        }, "|=": function (attr, _381) {
            var _382 = " " + _381 + "-";
            return function (elem) {
                var ea = " " + (elem.getAttribute(attr, 2) || "");
                return ((ea == _381) || (ea.indexOf(_382) == 0));
            };
        }, "=": function (attr, _386) {
            return function (elem) {
                return (_36c(elem, attr) == _386);
            };
        }};
        var _388 = {"first-child": function (name, _38a) {
            return function (elem) {
                if (elem.nodeType != 1) {
                    return false;
                }
                var fc = elem.previousSibling;
                while (fc && (fc.nodeType != 1)) {
                    fc = fc.previousSibling;
                }
                return (!fc);
            };
        }, "last-child": function (name, _38e) {
            return function (elem) {
                if (elem.nodeType != 1) {
                    return false;
                }
                var nc = elem.nextSibling;
                while (nc && (nc.nodeType != 1)) {
                    nc = nc.nextSibling;
                }
                return (!nc);
            };
        }, "empty": function (name, _392) {
            return function (elem) {
                var cn = elem.childNodes;
                var cnl = elem.childNodes.length;
                for (var x = cnl - 1; x >= 0; x--) {
                    var nt = cn[x].nodeType;
                    if ((nt == 1) || (nt == 3)) {
                        return false;
                    }
                }
                return true;
            };
        }, "not": function (name, _399) {
            var ntf = _34f(_2fc(_399)[0]);
            return function (elem) {
                return (!ntf(elem));
            };
        }, "nth-child": function (name, _39d) {
            var pi = parseInt;
            if (_39d == "odd") {
                return function (elem) {
                    return (((_361(elem)) % 2) == 1);
                };
            } else {
                if ((_39d == "2n") || (_39d == "even")) {
                    return function (elem) {
                        return ((_361(elem) % 2) == 0);
                    };
                } else {
                    if (_39d.indexOf("0n+") == 0) {
                        var _3a1 = pi(_39d.substr(3));
                        return function (elem) {
                            return (elem.parentNode[_2fb][_3a1 - 1] === elem);
                        };
                    } else {
                        if ((_39d.indexOf("n+") > 0) && (_39d.length > 3)) {
                            var _3a3 = _39d.split("n+", 2);
                            var pred = pi(_3a3[0]);
                            var idx = pi(_3a3[1]);
                            return function (elem) {
                                return ((_361(elem) % pred) == idx);
                            };
                        } else {
                            if (_39d.indexOf("n") == -1) {
                                var _3a1 = pi(_39d);
                                return function (elem) {
                                    return (_361(elem) == _3a1);
                                };
                            }
                        }
                    }
                }
            }
        }};
        var _3a8 = (d.isIE && (d.isIE!=9 && d.isIE!=10)) ? function (cond) {
            var clc = cond.toLowerCase();
            return function (elem) {
                return elem[cond] || elem[clc];
            };
        } : function (cond) {
            return function (elem) {
                return (elem && elem.getAttribute && elem.hasAttribute(cond));
            };
        };
        var _360 = function (_3ae) {
            var _3af = (_341[_3ae.query] || _340[_3ae.query]);
            if (_3af) {
                return _3af;
            }
            var ff = null;
            if (_3ae.id) {
                if (_3ae.tag != "*") {
                    ff = _342(ff, function (elem) {
                        return (elem.tagName.toLowerCase() == _3ae.tag);
                    });
                }
            }
            d.forEach(_3ae.classes, function (_3b2, idx, arr) {
                var _3b5 = _3b2.charAt(_3b2.length - 1) == "*";
                if (_3b5) {
                    _3b2 = _3b2.substr(0, _3b2.length - 1);
                }
                var re = new RegExp("(?:^|\\s)" + _3b2 + (_3b5 ? ".*" : "") + "(?:\\s|$)");
                ff = _342(ff, function (elem) {
                    return re.test(elem.className);
                });
                ff.count = idx;
            });
            d.forEach(_3ae.pseudos, function (_3b8) {
                if (_388[_3b8.name]) {
                    ff = _342(ff, _388[_3b8.name](_3b8.name, _3b8.value));
                }
            });
            _324(_36f, _3ae, _3a8, function (_3b9) {
                ff = _342(ff, _3b9);
            });
            if (!ff) {
                ff = function () {
                    return true;
                };
            }
            return _341[_3ae.query] = ff;
        };
        var _3ba = {};
        var _354 = function (_3bb, root) {
            var fHit = _3ba[_3bb.query];
            if (fHit) {
                return fHit;
            }
            if (_3bb.id && !_3bb.hasLoops && !_3bb.tag) {
                return _3ba[_3bb.query] = function (root) {
                    return [d.byId(_3bb.id)];
                };
            }
            var _3bf = _360(_3bb);
            var _3c0;
            if (_3bb.tag && _3bb.id && !_3bb.hasLoops) {
                _3c0 = function (root) {
                    var te = d.byId(_3bb.id);
                    if (_3bf(te)) {
                        return [te];
                    }
                };
            } else {
                var tret;
                if (!_3bb.hasLoops) {
                    _3c0 = function (root) {
                        var ret = [];
                        var te, x = 0, tret = root.getElementsByTagName(_3bb.tag);
                        while (te = tret[x++]) {
                            ret.push(te);
                        }
                        return ret;
                    };
                } else {
                    _3c0 = function (root) {
                        var ret = [];
                        var te, x = 0, tret = root.getElementsByTagName(_3bb.tag);
                        while (te = tret[x++]) {
                            if (_3bf(te)) {
                                ret.push(te);
                            }
                        }
                        return ret;
                    };
                }
            }
            return _3ba[_3bb.query] = _3c0;
        };
        var _3cc = {};
        var _3cd = {"*": d.isIE ? function (root) {
            return root.all;
        } : function (root) {
            return root.getElementsByTagName("*");
        }, ">": function (root) {
            var ret = [];
            var te, x = 0, tret = root[_2fb];
            while (te = tret[x++]) {
                if (te.nodeType == 1) {
                    ret.push(te);
                }
            }
            return ret;
        }};
        var _3d5 = function (_3d6) {
            var _3d7 = _2fc(d.trim(_3d6));
            if (_3d7.length == 1) {
                var tt = _354(_3d7[0]);
                tt.nozip = true;
                return tt;
            }
            var sqf = function (root) {
                var _3db = _3d7.slice(0);
                var _3dc;
                if (_3db[0].oper == ">") {
                    _3dc = [root];
                } else {
                    _3dc = _354(_3db.shift())(root);
                }
                return _355(_3dc, _3db);
            };
            return sqf;
        };
        var _3dd = ((document["evaluate"] && !d.isSafari) ? function (_3de) {
            var _3df = _3de.split(" ");
            if ((document["evaluate"]) && (_3de.indexOf(":") == -1) && ((true))) {
                if (((_3df.length > 2) && (_3de.indexOf(">") == -1)) || (_3df.length > 3) || (_3de.indexOf("[") >= 0) || ((1 == _3df.length) && (0 <= _3de.indexOf(".")))) {
                    return _337(_3de);
                }
            }
            return _3d5(_3de);
        } : _3d5);
        var _3e0 = function (_3e1) {
            if (_3cd[_3e1]) {
                return _3cd[_3e1];
            }
            if (0 > _3e1.indexOf(",")) {
                return _3cd[_3e1] = _3dd(_3e1);
            } else {
                var _3e2 = _3e1.split(/\s*,\s*/);
                var tf = function (root) {
                    var _3e5 = 0;
                    var ret = [];
                    var tp;
                    while (tp = _3e2[_3e5++]) {
                        ret = ret.concat(_3dd(tp, tp.indexOf(" "))(root));
                    }
                    return ret;
                };
                return _3cd[_3e1] = tf;
            }
        };
        var _3e8 = 0;
        var _zip = function (arr) {
            if (arr && arr.nozip) {
                return d.NodeList._wrap(arr);
            }
            var ret = new d.NodeList();
            if (!arr) {
                return ret;
            }
            if (arr[0]) {
                ret.push(arr[0]);
            }
            if (arr.length < 2) {
                return ret;
            }
            _3e8++;
            arr[0]["_zipIdx"] = _3e8;
            for (var x = 1, te; te = arr[x]; x++) {
                if (arr[x]["_zipIdx"] != _3e8) {
                    ret.push(te);
                }
                te["_zipIdx"] = _3e8;
            }
            return ret;
        };
        d.query = function (_3ee, root) {
            if (_3ee.constructor == d.NodeList) {
                return _3ee;
            }
            if (!d.isString(_3ee)) {
                return new d.NodeList(_3ee);
            }
            if (d.isString(root)) {
                root = d.byId(root);
            }
            return _zip(_3e0(_3ee)(root || d.doc));
        };
        d._filterQueryResult = function (_3f0, _3f1) {
            var tnl = new d.NodeList();
            var ff = (_3f1) ? _34f(_2fc(_3f1)[0]) : function () {
                return true;
            };
            for (var x = 0, te; te = _3f0[x]; x++) {
                if (ff(te)) {
                    tnl.push(te);
                }
            }
            return tnl;
        };
    })();
}
if (!dojo._hasResource["dojo._base.xhr"]) {
    dojo._hasResource["dojo._base.xhr"] = true;
    dojo.provide("dojo._base.xhr");
    (function () {
        var _d = dojo;

        function setValue(obj, name, _3f9) {
            var val = obj[name];
            if (_d.isString(val)) {
                obj[name] = [val, _3f9];
            } else {
                if (_d.isArray(val)) {
                    val.push(_3f9);
                } else {
                    obj[name] = _3f9;
                }
            }
        };
        dojo.formToObject = function (_3fb) {
            var ret = {};
            var iq = "input:not([type=file]):not([type=submit]):not([type=image]):not([type=reset]):not([type=button]), select, textarea";
            _d.query(iq, _3fb).filter(function (node) {
                return (!node.disabled);
            }).forEach(function (item) {
                var _in = item.name;
                var type = (item.type || "").toLowerCase();
                if (type == "radio" || type == "checkbox") {
                    if (item.checked) {
                        setValue(ret, _in, item.value);
                    }
                } else {
                    if (item.multiple) {
                        ret[_in] = [];
                        _d.query("option", item).forEach(function (opt) {
                            if (opt.selected) {
                                setValue(ret, _in, opt.value);
                            }
                        });
                    } else {
                        setValue(ret, _in, item.value);
                        if (type == "image") {
                            ret[_in + ".x"] = ret[_in + ".y"] = ret[_in].x = ret[_in].y = 0;
                        }
                    }
                }
            });
            return ret;
        };
        dojo.objectToQuery = function (map) {
            var ec = encodeURIComponent;
            var ret = "";
            var _406 = {};
            for (var x in map) {
                if (map[x] != _406[x]) {
                    if (_d.isArray(map[x])) {
                        for (var y = 0; y < map[x].length; y++) {
                            ret += ec(x) + "=" + ec(map[x][y]) + "&";
                        }
                    } else {
                        ret += ec(x) + "=" + ec(map[x]) + "&";
                    }
                }
            }
            if (ret.length && ret.charAt(ret.length - 1) == "&") {
                ret = ret.substr(0, ret.length - 1);
            }
            return ret;
        };
        dojo.formToQuery = function (_409) {
            return _d.objectToQuery(_d.formToObject(_409));
        };
        dojo.formToJson = function (_40a, _40b) {
            return _d.toJson(_d.formToObject(_40a), _40b);
        };
        dojo.queryToObject = function (str) {
            var ret = {};
            var qp = str.split("&");
            var dc = decodeURIComponent;
            _d.forEach(qp, function (item) {
                if (item.length) {
                    var _411 = item.split("=");
                    var name = dc(_411.shift());
                    var val = dc(_411.join("="));
                    if (_d.isString(ret[name])) {
                        ret[name] = [ret[name]];
                    }
                    if (_d.isArray(ret[name])) {
                        ret[name].push(val);
                    } else {
                        ret[name] = val;
                    }
                }
            });
            return ret;
        };
        dojo._blockAsync = false;
        dojo._contentHandlers = {"text": function (xhr) {
            return xhr.responseText;
        }, "json": function (xhr) {
            if (!djConfig.usePlainJson) {
                console.debug("Consider using mimetype:text/json-comment-filtered" + " to avoid potential security issues with JSON endpoints" + " (use djConfig.usePlainJson=true to turn off this message)");
            }
            return _d.fromJson(xhr.responseText);
        }, "json-comment-filtered": function (xhr) {
            var _417 = xhr.responseText;
            var _418 = _417.indexOf("/*");
            var _419 = _417.lastIndexOf("*/");
            if (_418 == -1 || _419 == -1) {
                throw new Error("JSON was not comment filtered");
            }
            return _d.fromJson(_417.substring(_418 + 2, _419));
        }, "javascript": function (xhr) {
/*
            DHL SECURITY change. Do no eval
*/
            alert("Function disabled by security. Please report to development team.");
            //return _d.eval(xhr.responseText);
/*
            END DHL SECURITY change
*/
        }, "xml": function (xhr) {
            if (_d.isIE && !xhr.responseXML) {
                _d.forEach(["MSXML2", "Microsoft", "MSXML", "MSXML3"], function (i) {
                    try {
                        var doc = new ActiveXObject(prefixes[i] + ".XMLDOM");
                        doc.async = false;
                        doc.loadXML(xhr.responseText);
                        return doc;
                    } catch (e) {
                    }
                });
            } else {
                return xhr.responseXML;
            }
        }};
        dojo._contentHandlers["json-comment-optional"] = function (xhr) {
            var _41f = _d._contentHandlers;
            try {
                return _41f["json-comment-filtered"](xhr);
            } catch (e) {
                return _41f["json"](xhr);
            }
        };
        dojo._ioSetArgs = function (args, _421, _422, _423) {
            var _424 = {args: args, url: args.url};
            var _425 = null;
            if (args.form) {
                var form = _d.byId(args.form);
                var _427 = form.getAttributeNode("action");
                _424.url = _424.url || (_427 ? _427.value : null);
                _425 = _d.formToObject(form);
            }
            var _428 = [
                {}
            ];
            if (_425) {
                _428.push(_425);
            }
            if (args.content) {
                _428.push(args.content);
            }
            if (args.preventCache) {
                _428.push({"dojo.preventCache": new Date().valueOf()});
            }
            _424.query = _d.objectToQuery(_d.mixin.apply(null, _428));
            _424.handleAs = args.handleAs || "text";
            var d = new _d.Deferred(_421);
            d.addCallbacks(_422, function (_42a) {
                return _423(_42a, d);
            });
            var ld = args.load;
            if (ld && _d.isFunction(ld)) {
                d.addCallback(function (_42c) {
                    return ld.call(args, _42c, _424);
                });
            }
            var err = args.error;
            if (err && _d.isFunction(err)) {
                d.addErrback(function (_42e) {
                    return err.call(args, _42e, _424);
                });
            }
            var _42f = args.handle;
            if (_42f && _d.isFunction(_42f)) {
                d.addBoth(function (_430) {
                    return _42f.call(args, _430, _424);
                });
            }
            d.ioArgs = _424;
            return d;
        };
        var _431 = function (dfd) {
            dfd.canceled = true;
            var xhr = dfd.ioArgs.xhr;
            var _at = (typeof xhr.abort);
            if ((_at == "function") || (_at == "unknown")) {
                xhr.abort();
            }
            var err = new Error("xhr cancelled");
            err.dojoType = "cancel";
            return err;
        };
        var _436 = function (dfd) {
            return _d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
        };
        var _438 = function (_439, dfd) {
            console.debug(_439);
            return _439;
        };
        var _43b = function (args) {
            var dfd = _d._ioSetArgs(args, _431, _436, _438);
            dfd.ioArgs.xhr = _d._xhrObj(dfd.ioArgs.args);
            return dfd;
        };
        var _43e = null;
        var _43f = [];
        var _440 = function () {
            var now = (new Date()).getTime();
            if (!_d._blockAsync) {
                for (var i = 0, tif; (i < _43f.length) && (tif = _43f[i]); i++) {
                    var dfd = tif.dfd;
                    try {
                        if (!dfd || dfd.canceled || !tif.validCheck(dfd)) {
                            _43f.splice(i--, 1);
                        } else {
                            if (tif.ioCheck(dfd)) {
                                _43f.splice(i--, 1);
                                tif.resHandle(dfd);
                            } else {
                                if (dfd.startTime) {
                                    if (dfd.startTime + (dfd.ioArgs.args.timeout || 0) < now) {
                                        _43f.splice(i--, 1);
                                        var err = new Error("timeout exceeded");
                                        err.dojoType = "timeout";
                                        dfd.errback(err);
                                        dfd.cancel();
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.debug(e);
                        dfd.errback(new Error("_watchInFlightError!"));
                    }
                }
            }
            if (!_43f.length) {
                clearInterval(_43e);
                _43e = null;
                return;
            }
        };
        dojo._ioCancelAll = function () {
            try {
                _d.forEach(_43f, function (i) {
                    i.dfd.cancel();
                });
            } catch (e) {
            }
        };
        if (_d.isIE) {
            _d.addOnUnload(_d._ioCancelAll);
        }
        _d._ioWatch = function (dfd, _448, _449, _44a) {
            if (dfd.ioArgs.args.timeout) {
                dfd.startTime = (new Date()).getTime();
            }
            _43f.push({dfd: dfd, validCheck: _448, ioCheck: _449, resHandle: _44a});
            if (!_43e) {
                _43e = setInterval(_440, 50);
            }
            _440();
        };
        var _44b = "application/x-www-form-urlencoded";
        var _44c = function (dfd) {
            return dfd.ioArgs.xhr.readyState;
        };
        var _44e = function (dfd) {
            return 4 == dfd.ioArgs.xhr.readyState;
        };
        var _450 = function (dfd) {
            if (_d._isDocumentOk(dfd.ioArgs.xhr)) {
                dfd.callback(dfd);
            } else {
                dfd.errback(new Error("bad http response code:" + dfd.ioArgs.xhr.status));
            }
        };
        var _452 = function (type, dfd) {
            var _455 = dfd.ioArgs;
            var args = _455.args;
            _455.xhr.open(type, _455.url, args.sync !== true, args.user || undefined, args.password || undefined);
            if (args.headers) {
                for (var hdr in args.headers) {
                    if (hdr.toLowerCase() === "content-type" && !args.contentType) {
                        args.contentType = args.headers[hdr];
                    } else {
                        _455.xhr.setRequestHeader(hdr, args.headers[hdr]);
                    }
                }
            }
            _455.xhr.setRequestHeader("Content-Type", (args.contentType || _44b));
            try {
                _455.xhr.send(_455.query);
            } catch (e) {
                dfd.cancel();
            }
            _d._ioWatch(dfd, _44c, _44e, _450);
            return dfd;
        };
        dojo._ioAddQueryToUrl = function (_458) {
            if (_458.query.length) {
                _458.url += (_458.url.indexOf("?") == -1 ? "?" : "&") + _458.query;
                _458.query = null;
            }
        };
        dojo.xhrGet = function (args) {
            var dfd = _43b(args);
            _d._ioAddQueryToUrl(dfd.ioArgs);
            return _452("GET", dfd);
        };
        dojo.xhrPost = function (args) {
            return _452("POST", _43b(args));
        };
        dojo.rawXhrPost = function (args) {
            var dfd = _43b(args);
            dfd.ioArgs.query = args.postData;
            return _452("POST", dfd);
        };
        dojo.xhrPut = function (args) {
            return _452("PUT", _43b(args));
        };
        dojo.rawXhrPut = function (args) {
            var dfd = _43b(args);
            var _461 = dfd.ioArgs;
            if (args["putData"]) {
                _461.query = args.putData;
                args.putData = null;
            }
            return _452("PUT", dfd);
        };
        dojo.xhrDelete = function (args) {
            var dfd = _43b(args);
            _d._ioAddQueryToUrl(dfd.ioArgs);
            return _452("DELETE", dfd);
        };
    })();
}
if (!dojo._hasResource["dojo._base.fx"]) {
    dojo._hasResource["dojo._base.fx"] = true;
    dojo.provide("dojo._base.fx");
    dojo._Line = function (_464, end) {
        this.start = _464;
        this.end = end;
        this.getValue = function (n) {
            return ((this.end - this.start) * n) + this.start;
        };
    };
    dojo.declare("dojo._Animation", null, {constructor: function (args) {
        dojo.mixin(this, args);
        if (dojo.isArray(this.curve)) {
            this.curve = new dojo._Line(this.curve[0], this.curve[1]);
        }
    }, duration: 1000, repeat: 0, rate: 10, _percent: 0, _startRepeatCount: 0, fire: function (evt, args) {
        if (this[evt]) {
            this[evt].apply(this, args || []);
        }
        return this;
    }, play: function (_46a, _46b) {
        var _t = this;
        if (_46b) {
            _t._stopTimer();
            _t._active = _t._paused = false;
            _t._percent = 0;
        } else {
            if (_t._active && !_t._paused) {
                return _t;
            }
        }
        _t.fire("beforeBegin");
        var d = _46a || _t.delay;
        var _p = dojo.hitch(_t, "_play", _46b);
        if (d > 0) {
            setTimeout(_p, d);
            return _t;
        }
        _p();
        return _t;
    }, _play: function (_46f) {
        var _t = this;
        _t._startTime = new Date().valueOf();
        if (_t._paused) {
            _t._startTime -= _t.duration * _t._percent;
        }
        _t._endTime = _t._startTime + _t.duration;
        _t._active = true;
        _t._paused = false;
        var _471 = _t.curve.getValue(_t._percent);
        if (!_t._percent) {
            if (!_t._startRepeatCount) {
                _t._startRepeatCount = _t.repeat;
            }
            _t.fire("onBegin", [_471]);
        }
        _t.fire("onPlay", [_471]);
        _t._cycle();
        return _t;
    }, pause: function () {
        this._stopTimer();
        if (!this._active) {
            return this;
        }
        this._paused = true;
        this.fire("onPause", [this.curve.getValue(this._percent)]);
        return this;
    }, gotoPercent: function (_472, _473) {
        this._stopTimer();
        this._active = this._paused = true;
        this._percent = _472;
        if (_473) {
            this.play();
        }
        return this;
    }, stop: function (_474) {
        if (!this._timer) {
            return;
        }
        this._stopTimer();
        if (_474) {
            this._percent = 1;
        }
        this.fire("onStop", [this.curve.getValue(this._percent)]);
        this._active = this._paused = false;
        return this;
    }, status: function () {
        if (this._active) {
            return this._paused ? "paused" : "playing";
        }
        return "stopped";
    }, _cycle: function () {
        var _t = this;
        if (_t._active) {
            var curr = new Date().valueOf();
            var step = (curr - _t._startTime) / (_t._endTime - _t._startTime);
            if (step >= 1) {
                step = 1;
            }
            _t._percent = step;
            if (_t.easing) {
                step = _t.easing(step);
            }
            _t.fire("onAnimate", [_t.curve.getValue(step)]);
            if (step < 1) {
                _t._startTimer();
            } else {
                _t._active = false;
                if (_t.repeat > 0) {
                    _t.repeat--;
                    _t.play(null, true);
                } else {
                    if (_t.repeat == -1) {
                        _t.play(null, true);
                    } else {
                        if (_t._startRepeatCount) {
                            _t.repeat = _t._startRepeatCount;
                            _t._startRepeatCount = 0;
                        }
                    }
                }
                _t._percent = 0;
                _t.fire("onEnd");
            }
        }
        return _t;
    }});
    (function () {
        var d = dojo;
        var ctr = 0;
        var _47a = [];
        var _47b = {run: function () {
        }};
        var _47c = null;
        dojo._Animation.prototype._startTimer = function () {
            if (!this._timer) {
                this._timer = dojo.connect(_47b, "run", this, "_cycle");
                ctr++;
            }
            if (!_47c) {
                _47c = setInterval(dojo.hitch(_47b, "run"), this.rate);
            }
        };
        dojo._Animation.prototype._stopTimer = function () {
            dojo.disconnect(this._timer);
            this._timer = null;
            ctr--;
            if (!ctr) {
                clearInterval(_47c);
                _47c = null;
            }
        };
        var _47d = (d.isIE) ? function (node) {
            var ns = node.style;
            if (!ns.zoom.length && d.style(node, "zoom") == "normal") {
                ns.zoom = "1";
            }
            if (!ns.width.length && d.style(node, "width") == "auto") {
                ns.width = "auto";
            }
        } : function () {
        };
        dojo._fade = function (args) {
            args.node = d.byId(args.node);
            var _481 = d.mixin({properties: {}}, args);
            var _482 = (_481.properties.opacity = {});
            _482.start = !("start" in _481) ? function () {
                return Number(d.style(_481.node, "opacity"));
            } : _481.start;
            _482.end = _481.end;
            var anim = d.animateProperty(_481);
            d.connect(anim, "beforeBegin", d.partial(_47d, _481.node));
            return anim;
        };
        dojo.fadeIn = function (args) {
            return d._fade(d.mixin({end: 1}, args));
        };
        dojo.fadeOut = function (args) {
            return d._fade(d.mixin({end: 0}, args));
        };
        dojo._defaultEasing = function (n) {
            return 0.5 + ((Math.sin((n + 1.5) * Math.PI)) / 2);
        };
        var _487 = function (_488) {
            this._properties = _488;
            for (var p in _488) {
                var prop = _488[p];
                if (prop.start instanceof d.Color) {
                    prop.tempColor = new d.Color();
                }
            }
            this.getValue = function (r) {
                var ret = {};
                for (var p in this._properties) {
                    var prop = this._properties[p];
                    var _48f = prop.start;
                    if (_48f instanceof d.Color) {
                        ret[p] = d.blendColors(_48f, prop.end, r, prop.tempColor).toCss();
                    } else {
                        if (!d.isArray(_48f)) {
                            ret[p] = ((prop.end - _48f) * r) + _48f + (p != "opacity" ? prop.units || "px" : "");
                        }
                    }
                }
                return ret;
            };
        };
        dojo.animateProperty = function (args) {
            args.node = d.byId(args.node);
            if (!args.easing) {
                args.easing = d._defaultEasing;
            }
            var anim = new d._Animation(args);
            d.connect(anim, "beforeBegin", anim, function () {
                var pm = {};
                for (var p in this.properties) {
                    var prop = (pm[p] = d.mixin({}, this.properties[p]));
                    if (d.isFunction(prop.start)) {
                        prop.start = prop.start();
                    }
                    if (d.isFunction(prop.end)) {
                        prop.end = prop.end();
                    }
                    var _495 = (p.toLowerCase().indexOf("color") >= 0);

                    function getStyle(node, p) {
                        var v = ({height: node.offsetHeight, width: node.offsetWidth})[p];
                        if (v !== undefined) {
                            return v;
                        }
                        v = d.style(node, p);
                        return (p == "opacity") ? Number(v) : parseFloat(v);
                    };
                    if (!("end" in prop)) {
                        prop.end = getStyle(this.node, p);
                    } else {
                        if (!("start" in prop)) {
                            prop.start = getStyle(this.node, p);
                        }
                    }
                    if (_495) {
                        prop.start = new d.Color(prop.start);
                        prop.end = new d.Color(prop.end);
                    } else {
                        prop.start = (p == "opacity") ? Number(prop.start) : parseFloat(prop.start);
                    }
                }
                this.curve = new _487(pm);
            });
            d.connect(anim, "onAnimate", anim, function (_499) {
                for (var s in _499) {
                    d.style(this.node, s, _499[s]);
                }
            });
            return anim;
        };
    })();
}
if (!dojo._hasResource["dojo.fx"]) {
    dojo._hasResource["dojo.fx"] = true;
    dojo.provide("dojo.fx");
    dojo.provide("dojo.fx.Toggler");
    dojo.fx.chain = function (_49b) {
        var _49c = _49b.shift();
        var _49d = _49c;
        dojo.forEach(_49b, function (_49e) {
            dojo.connect(_49d, "onEnd", _49e, "play");
            _49d = _49e;
        });
        return _49c;
    };
    dojo.fx.combine = function (_49f) {
        var ctr = new dojo._Animation({curve: [0, 1]});
        if (!_49f.length) {
            return ctr;
        }
        ctr.duration = _49f[0].duration;
        dojo.forEach(_49f, function (_4a1) {
            dojo.forEach(["play", "pause", "stop"], function (e) {
                if (_4a1[e]) {
                    dojo.connect(ctr, e, _4a1, e);
                }
            });
        });
        return ctr;
    };
    dojo.declare("dojo.fx.Toggler", null, {constructor: function (args) {
        var _t = this;
        dojo.mixin(_t, args);
        _t.node = args.node;
        _t._showArgs = dojo.mixin({}, args);
        _t._showArgs.node = _t.node;
        _t._showArgs.duration = _t.showDuration;
        _t.showAnim = _t.showFunc(_t._showArgs);
        _t._hideArgs = dojo.mixin({}, args);
        _t._hideArgs.node = _t.node;
        _t._hideArgs.duration = _t.hideDuration;
        _t.hideAnim = _t.hideFunc(_t._hideArgs);
        dojo.connect(_t.showAnim, "beforeBegin", dojo.hitch(_t.hideAnim, "stop", true));
        dojo.connect(_t.hideAnim, "beforeBegin", dojo.hitch(_t.showAnim, "stop", true));
    }, node: null, showFunc: dojo.fadeIn, hideFunc: dojo.fadeOut, showDuration: 200, hideDuration: 200, show: function (_4a5) {
        return this.showAnim.play(_4a5 || 0);
    }, hide: function (_4a6) {
        return this.hideAnim.play(_4a6 || 0);
    }});
    dojo.fx.wipeIn = function (args) {
        args.node = dojo.byId(args.node);
        var node = args.node, s = node.style;
        var anim = dojo.animateProperty(dojo.mixin({properties: {height: {start: function () {
            s.overflow = "hidden";
            if (s.visibility == "hidden" || s.display == "none") {
                s.height = "1px";
                s.display = "";
                s.visibility = "";
                return 1;
            } else {
                var _4ab = dojo.style(node, "height");
                return Math.max(_4ab, 1);
            }
        }, end: function () {
            return node.scrollHeight;
        }}}}, args));
        dojo.connect(anim, "onEnd", function () {
            s.height = "auto";
        });
        return anim;
    };
    dojo.fx.wipeOut = function (args) {
        var node = args.node = dojo.byId(args.node);
        var s = node.style;
        var anim = dojo.animateProperty(dojo.mixin({properties: {height: {end: 1}}}, args));
        dojo.connect(anim, "beforeBegin", function () {
            s.overflow = "hidden";
            s.display = "";
        });
        dojo.connect(anim, "onEnd", function () {
            s.height = "auto";
            s.display = "none";
        });
        return anim;
    };
    dojo.fx.slideTo = function (args) {
        var node = (args.node = dojo.byId(args.node));
        var top = null;
        var left = null;
        var init = (function (n) {
            return function () {
                var cs = dojo.getComputedStyle(n);
                var pos = cs.position;
                top = (pos == "absolute" ? n.offsetTop : parseInt(cs.top) || 0);
                left = (pos == "absolute" ? n.offsetLeft : parseInt(cs.left) || 0);
                if (pos != "absolute" && pos != "relative") {
                    var ret = dojo.coords(n, true);
                    top = ret.y;
                    left = ret.x;
                    n.style.position = "absolute";
                    n.style.top = top + "px";
                    n.style.left = left + "px";
                }
            };
        })(node);
        init();
        var anim = dojo.animateProperty(dojo.mixin({properties: {top: {end: args.top || 0}, left: {end: args.left || 0}}}, args));
        dojo.connect(anim, "beforeBegin", anim, init);
        return anim;
    };
}
if (!dojo._hasResource["dijit._base.focus"]) {
    dojo._hasResource["dijit._base.focus"] = true;
    dojo.provide("dijit._base.focus");
    dojo.mixin(dijit, {_curFocus: null, _prevFocus: null, isCollapsed: function () {
        var _4ba = dojo.global;
        var _4bb = dojo.doc;
        if (_4bb.selection) {
            return !_4bb.selection.createRange().text;
        } else {
            if (_4ba.getSelection) {
                var _4bc = _4ba.getSelection();
                if (dojo.isString(_4bc)) {
                    return !_4bc;
                } else {
                    return _4bc.isCollapsed || !_4bc.toString();
                }
            }
        }
    }, getBookmark: function () {
        var _4bd, _4be = dojo.doc.selection;
        if (_4be) {
            var _4bf = _4be.createRange();
            if (_4be.type.toUpperCase() == "CONTROL") {
                _4bd = _4bf.length ? dojo._toArray(_4bf) : null;
            } else {
                _4bd = _4bf.getBookmark();
            }
        } else {
            if (dojo.global.getSelection) {
                _4be = dojo.global.getSelection();
                if (_4be) {
                    var _4bf = _4be.getRangeAt(0);
                    _4bd = _4bf.cloneRange();
                }
            } else {
                console.debug("No idea how to store the current selection for this browser!");
            }
        }
        return _4bd;
    }, moveToBookmark: function (_4c0) {
        var _4c1 = dojo.doc;
        if (_4c1.selection) {
            var _4c2;
            if (dojo.isArray(_4c0)) {
                _4c2 = _4c1.body.createControlRange();
                dojo.forEach(_4c0, _4c2.addElement);
            } else {
                _4c2 = _4c1.selection.createRange();
                _4c2.moveToBookmark(_4c0);
            }
            _4c2.select();
        } else {
            var _4c3 = dojo.global.getSelection && dojo.global.getSelection();
            if (_4c3 && _4c3.removeAllRanges) {
                _4c3.removeAllRanges();
                _4c3.addRange(_4c0);
            } else {
                console.debug("No idea how to restore selection for this browser!");
            }
        }
    }, getFocus: function (menu, _4c5) {
        return {node: menu && dojo.isDescendant(dijit._curFocus, menu.domNode) ? dijit._prevFocus : dijit._curFocus, bookmark: !dojo.withGlobal(_4c5 || dojo.global, dijit.isCollapsed) ? dojo.withGlobal(_4c5 || dojo.global, dijit.getBookmark) : null, openedForWindow: _4c5};
    }, focus: function (_4c6) {
        if (!_4c6) {
            return;
        }
        var node = "node" in _4c6 ? _4c6.node : _4c6, _4c8 = _4c6.bookmark, _4c9 = _4c6.openedForWindow;
        if (node) {
            var _4ca = (node.tagName.toLowerCase() == "iframe") ? node.contentWindow : node;
            if (_4ca && _4ca.focus) {
                try {
                    _4ca.focus();
                } catch (e) {
                }
            }
            dijit._onFocusNode(node);
        }
        if (_4c8 && dojo.withGlobal(_4c9 || dojo.global, dijit.isCollapsed)) {
            if (_4c9) {
                _4c9.focus();
            }
            try {
                dojo.withGlobal(_4c9 || dojo.global, moveToBookmark, null, [_4c8]);
            } catch (e) {
            }
        }
    }, _activeStack: [], registerWin: function (_4cb) {
        if (!_4cb) {
            _4cb = window;
        }
        dojo.connect(_4cb.document, "onmousedown", null, function (evt) {
            dijit._justMouseDowned = true;
            setTimeout(function () {
                dijit._justMouseDowned = false;
            }, 0);
            dijit._onTouchNode(evt.target || evt.srcElement);
        });
        var body = _4cb.document.body || _4cb.document.getElementsByTagName("body")[0];
        if (body) {
            if (dojo.isIE) {
                body.attachEvent("onactivate", function (evt) {
                    if (evt.srcElement.tagName.toLowerCase() != "body") {
                        dijit._onFocusNode(evt.srcElement);
                    }
                });
                body.attachEvent("ondeactivate", function (evt) {
                    dijit._onBlurNode(evt.srcElement);
                });
            } else {
                body.addEventListener("focus", function (evt) {
                    dijit._onFocusNode(evt.target);
                }, true);
                body.addEventListener("blur", function (evt) {
                    dijit._onBlurNode(evt.target);
                }, true);
            }
        }
        body = null;
    }, _onBlurNode: function (node) {
        dijit._prevFocus = dijit._curFocus;
        dijit._curFocus = null;
        var w = dijit.getEnclosingWidget(node);
        if (w && w._setStateClass) {
            w._focused = false;
            w._setStateClass();
        }
        if (dijit._justMouseDowned) {
            return;
        }
        if (dijit._clearActiveWidgetsTimer) {
            clearTimeout(dijit._clearActiveWidgetsTimer);
        }
        dijit._clearActiveWidgetsTimer = setTimeout(function () {
            delete dijit._clearActiveWidgetsTimer;
            dijit._setStack([]);
        }, 100);
    }, _onTouchNode: function (node) {
        if (dijit._clearActiveWidgetsTimer) {
            clearTimeout(dijit._clearActiveWidgetsTimer);
            delete dijit._clearActiveWidgetsTimer;
        }
        var _4d5 = [];
        try {
            while (node) {
                if (node.dijitPopupParent) {
                    node = dijit.byId(node.dijitPopupParent).domNode;
                } else {
                    if (node.tagName && node.tagName.toLowerCase() == "body") {
                        if (node === dojo.body()) {
                            break;
                        }
                        node = dojo.query("iframe").filter(function (_4d6) {
                            return _4d6.contentDocument.body === node;
                        })[0];
                    } else {
                        var id = node.getAttribute && node.getAttribute("widgetId");
                        if (id) {
                            _4d5.unshift(id);
                        }
                        node = node.parentNode;
                    }
                }
            }
        } catch (e) {
        }
        dijit._setStack(_4d5);
    }, _onFocusNode: function (node) {
        if (node && node.tagName && node.tagName.toLowerCase() == "body") {
            return;
        }
        dijit._onTouchNode(node);
        if (node == dijit._curFocus) {
            return;
        }
        dijit._prevFocus = dijit._curFocus;
        dijit._curFocus = node;
        dojo.publish("focusNode", [node]);
        var w = dijit.getEnclosingWidget(node);
        if (w && w._setStateClass) {
            w._focused = true;
            w._setStateClass();
        }
    }, _setStack: function (_4da) {
        var _4db = dijit._activeStack;
        dijit._activeStack = _4da;
        for (var _4dc = 0; _4dc < Math.min(_4db.length, _4da.length); _4dc++) {
            if (_4db[_4dc] != _4da[_4dc]) {
                break;
            }
        }
        for (var i = _4db.length - 1; i >= _4dc; i--) {
            var _4de = dijit.byId(_4db[i]);
            if (_4de) {
                dojo.publish("widgetBlur", [_4de]);
                if (_4de._onBlur) {
                    _4de._onBlur();
                }
            }
        }
        for (var i = _4dc; i < _4da.length; i++) {
            var _4de = dijit.byId(_4da[i]);
            if (_4de) {
                dojo.publish("widgetFocus", [_4de]);
                if (_4de._onFocus) {
                    _4de._onFocus();
                }
            }
        }
    }});
    dojo.addOnLoad(dijit.registerWin);
}
if (!dojo._hasResource["dijit._base.manager"]) {
    dojo._hasResource["dijit._base.manager"] = true;
    dojo.provide("dijit._base.manager");
    dojo.declare("dijit.WidgetSet", null, {constructor: function () {
        this._hash = {};
    }, add: function (_4df) {
        if (this._hash[_4df.id]) {
            throw new Error("Tried to register widget with id==" + _4df.id + " but that id is already registered");
        }
        this._hash[_4df.id] = _4df;
    }, remove: function (id) {
        delete this._hash[id];
    }, forEach: function (func) {
        for (var id in this._hash) {
            func(this._hash[id]);
        }
    }, filter: function (_4e3) {
        var res = new dijit.WidgetSet();
        this.forEach(function (_4e5) {
            if (_4e3(_4e5)) {
                res.add(_4e5);
            }
        });
        return res;
    }, byId: function (id) {
        return this._hash[id];
    }, byClass: function (cls) {
        return this.filter(function (_4e8) {
            return _4e8.declaredClass == cls;
        });
    }});
    dijit.registry = new dijit.WidgetSet();
    dijit._widgetTypeCtr = {};
    dijit.getUniqueId = function (_4e9) {
        var id;
        do {
            id = _4e9 + "_" + (dijit._widgetTypeCtr[_4e9] !== undefined ? ++dijit._widgetTypeCtr[_4e9] : dijit._widgetTypeCtr[_4e9] = 0);
        } while (dijit.byId(id));
        return id;
    };
    if (dojo.isIE) {
        dojo.addOnUnload(function () {
            dijit.registry.forEach(function (_4eb) {
                _4eb.destroy();
            });
        });
    }
    dijit.byId = function (id) {
        return (dojo.isString(id)) ? dijit.registry.byId(id) : id;
    };
    dijit.byNode = function (node) {
        return dijit.registry.byId(node.getAttribute("widgetId"));
    };
    dijit.getEnclosingWidget = function (node) {
        while (node) {
            if (node.getAttribute && node.getAttribute("widgetId")) {
                return dijit.registry.byId(node.getAttribute("widgetId"));
            }
            node = node.parentNode;
        }
        return null;
    };
}
if (!dojo._hasResource["dijit._base.place"]) {
    dojo._hasResource["dijit._base.place"] = true;
    dojo.provide("dijit._base.place");
    dijit.getViewport = function () {
        var _4ef = dojo.global;
        var _4f0 = dojo.doc;
        var w = 0, h = 0;
        if (dojo.isMozilla) {
            var minw, minh, maxw, maxh;
            if (_4f0.body.clientWidth > _4f0.documentElement.clientWidth) {
                minw = _4f0.documentElement.clientWidth;
                maxw = _4f0.body.clientWidth;
            } else {
                maxw = _4f0.documentElement.clientWidth;
                minw = _4f0.body.clientWidth;
            }
            if (_4f0.body.clientHeight > _4f0.documentElement.clientHeight) {
                minh = _4f0.documentElement.clientHeight;
                maxh = _4f0.body.clientHeight;
            } else {
                maxh = _4f0.documentElement.clientHeight;
                minh = _4f0.body.clientHeight;
            }
            w = (maxw > _4ef.innerWidth) ? minw : maxw;
            h = (maxh > _4ef.innerHeight) ? minh : maxh;
        } else {
            if (!dojo.isOpera && _4ef.innerWidth) {
                w = _4ef.innerWidth;
                h = _4ef.innerHeight;
            } else {
                if (dojo.isIE && _4f0.documentElement && _4f0.documentElement.clientHeight) {
                    w = _4f0.documentElement.clientWidth;
                    h = _4f0.documentElement.clientHeight;
                } else {
                    if (dojo.body().clientWidth) {
                        w = dojo.body().clientWidth;
                        h = dojo.body().clientHeight;
                    }
                }
            }
        }
        var _4f7 = dojo._docScroll();
        return {w: w, h: h, l: _4f7.x, t: _4f7.y};
    };
    dijit.placeOnScreen = function (node, pos, _4fa, _4fb) {
        var _4fc = dojo.map(_4fa, function (_4fd) {
            return {corner: _4fd, pos: pos};
        });
        return dijit._place(node, _4fc);
    };
    dijit._place = function (node, _4ff, _500) {
        var view = dijit.getViewport();
        if (!node.parentNode || String(node.parentNode.tagName).toLowerCase() != "body") {
            dojo.body().appendChild(node);
        }
        var best = null;
        for (var i = 0; i < _4ff.length; i++) {
            var _504 = _4ff[i].corner;
            var pos = _4ff[i].pos;
            if (_500) {
                _500(_504);
            }
            var _506 = node.style.display;
            var _507 = node.style.visibility;
            node.style.visibility = "hidden";
            node.style.display = "";
            var mb = dojo.marginBox(node);
            node.style.display = _506;
            node.style.visibility = _507;
            var _509 = (_504.charAt(1) == "L" ? pos.x : Math.max(view.l, pos.x - mb.w)), _50a = (_504.charAt(0) == "T" ? pos.y : Math.max(view.t, pos.y - mb.h)), endX = (_504.charAt(1) == "L" ? Math.min(view.l + view.w, _509 + mb.w) : pos.x), endY = (_504.charAt(0) == "T" ? Math.min(view.t + view.h, _50a + mb.h) : pos.y), _50d = endX - _509, _50e = endY - _50a, _50f = (mb.w - _50d) + (mb.h - _50e);
            if (best == null || _50f < best.overflow) {
                best = {corner: _504, aroundCorner: _4ff[i].aroundCorner, x: _509, y: _50a, w: _50d, h: _50e, overflow: _50f};
            }
            if (_50f == 0) {
                break;
            }
        }
        node.style.left = best.x + "px";
        node.style.top = best.y + "px";
        return best;
    };
    dijit.placeOnScreenAroundElement = function (node, _511, _512, _513) {
        _511 = dojo.byId(_511);
        var _514 = _511.style.display;
        _511.style.display = "";
        var _515 = _511.offsetWidth;
        var _516 = _511.offsetHeight;
        var _517 = dojo.coords(_511, true);
        _511.style.display = _514;
        var _518 = [];
        for (var _519 in _512) {
            _518.push({aroundCorner: _519, corner: _512[_519], pos: {x: _517.x + (_519.charAt(1) == "L" ? 0 : _515), y: _517.y + (_519.charAt(0) == "T" ? 0 : _516)}});
        }
        return dijit._place(node, _518, _513);
    };
}
if (!dojo._hasResource["dijit._base.window"]) {
    dojo._hasResource["dijit._base.window"] = true;
    dojo.provide("dijit._base.window");
    dijit.getDocumentWindow = function (doc) {
        if (dojo.isSafari && !doc._parentWindow) {
            var fix = function (win) {
                win.document._parentWindow = win;
                for (var i = 0; i < win.frames.length; i++) {
                    fix(win.frames[i]);
                }
            };
            fix(window.top);
        }
        if (dojo.isIE && window !== document.parentWindow && !doc._parentWindow) {
            doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
            var win = doc._parentWindow;
            doc._parentWindow = null;
            return win;
        }
        return doc._parentWindow || doc.parentWindow || doc.defaultView;
    };
}
if (!dojo._hasResource["dijit._base.popup"]) {
    dojo._hasResource["dijit._base.popup"] = true;
    dojo.provide("dijit._base.popup");
    dijit.popup = new function () {
        var _51f = [], _520 = 1000, _521 = 1;
        this.open = function (args) {
            var _523 = args.popup, _524 = args.orient || {"BL": "TL", "TL": "BL"}, _525 = args.around, id = (args.around && args.around.id) ? (args.around.id + "_dropdown") : ("popup_" + _521++);
            var _527 = dojo.doc.createElement("div");
            _527.id = id;
            _527.className = "dijitPopup";
            _527.style.zIndex = _520 + _51f.length;
            _527.style.visibility = "hidden";
            if (args.parent) {
                _527.dijitPopupParent = args.parent.id;
            }
            dojo.body().appendChild(_527);
            _523.domNode.style.display = "";
            _527.appendChild(_523.domNode);
            var _528 = new dijit.BackgroundIframe(_527);
            var best = _525 ? dijit.placeOnScreenAroundElement(_527, _525, _524, _523.orient ? dojo.hitch(_523, "orient") : null) : dijit.placeOnScreen(_527, args, _524 == "R" ? ["TR", "BR", "TL", "BL"] : ["TL", "BL", "TR", "BR"]);
            _527.style.visibility = "visible";
            var _52a = [];

            function getTopPopup() {
                for (var pi = _51f.length - 1; pi > 0 && _51f[pi].parent === _51f[pi - 1].widget; pi--) {
                }
                return _51f[pi];
            };
            _52a.push(dojo.connect(_527, "onkeypress", this, function (evt) {
                if (evt.keyCode == dojo.keys.ESCAPE && args.onCancel) {
                    args.onCancel();
                } else {
                    if (evt.keyCode == dojo.keys.TAB) {
                        dojo.stopEvent(evt);
                        var _52d = getTopPopup();
                        if (_52d && _52d.onCancel) {
                            _52d.onCancel();
                        }
                    }
                }
            }));
            if (_523.onCancel) {
                _52a.push(dojo.connect(_523, "onCancel", null, args.onCancel));
            }
            _52a.push(dojo.connect(_523, _523.onExecute ? "onExecute" : "onChange", null, function () {
                var _52e = getTopPopup();
                if (_52e && _52e.onExecute) {
                    _52e.onExecute();
                }
            }));
            _51f.push({wrapper: _527, iframe: _528, widget: _523, parent: args.parent, onExecute: args.onExecute, onCancel: args.onCancel, onClose: args.onClose, handlers: _52a});
            if (_523.onOpen) {
                _523.onOpen(best);
            }
            return best;
        };
        this.close = function (_52f) {
            while (dojo.some(_51f, function (elem) {
                return elem.widget == _52f;
            })) {
                var top = _51f.pop(), _532 = top.wrapper, _533 = top.iframe, _534 = top.widget, _535 = top.onClose;
                if (_534.onClose) {
                    _534.onClose();
                }
                dojo.forEach(top.handlers, dojo.disconnect);
                if (!_534 || !_534.domNode) {
                    return;
                }
                dojo.style(_534.domNode, "display", "none");
                dojo.body().appendChild(_534.domNode);
                _533.destroy();
                dojo._destroyElement(_532);
                if (_535) {
                    _535();
                }
            }
        };
    }();
    dijit._frames = new function () {
        var _536 = [];
        this.pop = function () {
            var _537;
            if (_536.length) {
                _537 = _536.pop();
                _537.style.display = "";
            } else {
                if (dojo.isIE) {
                    var html = "<iframe src='javascript:\"\"'" + " style='position: absolute; left: 0px; top: 0px;" + "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
                    _537 = dojo.doc.createElement(html);
                } else {
                    var _537 = dojo.doc.createElement("iframe");
                    _537.src = "javascript:\"\"";
                    _537.className = "dijitBackgroundIframe";
                }
                _537.tabIndex = -1;
                dojo.body().appendChild(_537);
            }
            return _537;
        };
        this.push = function (_539) {
            _539.style.display = "";
            if (dojo.isIE) {
                _539.style.removeExpression("width");
                _539.style.removeExpression("height");
            }
            _536.push(_539);
        };
    }();
    if (dojo.isIE && dojo.isIE < 7) {
        dojo.addOnLoad(function () {
            var f = dijit._frames;
            dojo.forEach([f.pop()], f.push);
        });
    }
    dijit.BackgroundIframe = function (node) {
        if (!node.id) {
            throw new Error("no id");
        }
        if ((dojo.isIE && dojo.isIE < 7) || (dojo.isFF && dojo.isFF < 3 && dojo.hasClass(dojo.body(), "dijit_a11y"))) {
            var _53c = dijit._frames.pop();
            node.appendChild(_53c);
            if (dojo.isIE) {
                _53c.style.setExpression("width", "document.getElementById('" + node.id + "').offsetWidth");
                _53c.style.setExpression("height", "document.getElementById('" + node.id + "').offsetHeight");
            }
            this.iframe = _53c;
        }
    };
    dojo.extend(dijit.BackgroundIframe, {destroy: function () {
        if (this.iframe) {
            dijit._frames.push(this.iframe);
            delete this.iframe;
        }
    }});
}
if (!dojo._hasResource["dijit._base.scroll"]) {
    dojo._hasResource["dijit._base.scroll"] = true;
    dojo.provide("dijit._base.scroll");
    dijit.scrollIntoView = function (node) {
        if (dojo.isIE) {
            if (dojo.marginBox(node.parentNode).h <= node.parentNode.scrollHeight) {
                node.scrollIntoView(false);
            }
        } else {
            if (dojo.isMozilla) {
                node.scrollIntoView(false);
            } else {
                var _53e = node.parentNode;
                var _53f = _53e.scrollTop + dojo.marginBox(_53e).h;
                var _540 = node.offsetTop + dojo.marginBox(node).h;
                if (_53f < _540) {
                    _53e.scrollTop += (_540 - _53f);
                } else {
                    if (_53e.scrollTop > node.offsetTop) {
                        _53e.scrollTop -= (_53e.scrollTop - node.offsetTop);
                    }
                }
            }
        }
    };
}
if (!dojo._hasResource["dijit._base.sniff"]) {
    dojo._hasResource["dijit._base.sniff"] = true;
    dojo.provide("dijit._base.sniff");
    (function () {
        var d = dojo;
        var ie = d.isIE;
        var _543 = d.isOpera;
        var maj = Math.floor;
        var _545 = {dj_ie: ie, dj_ie6: maj(ie) == 6, dj_ie7: maj(ie) == 7, dj_iequirks: ie && d.isQuirks, dj_opera: _543, dj_opera8: maj(_543) == 8, dj_opera9: maj(_543) == 9, dj_khtml: d.isKhtml, dj_safari: d.isSafari, dj_gecko: d.isMozilla};
        for (var p in _545) {
            if (_545[p]) {
                var html = dojo.doc.documentElement;
                if (html.className) {
                    html.className += " " + p;
                } else {
                    html.className = p;
                }
            }
        }
    })();
}
if (!dojo._hasResource["dijit._base.bidi"]) {
    dojo._hasResource["dijit._base.bidi"] = true;
    dojo.provide("dijit._base.bidi");
    dojo.addOnLoad(function () {
        if (!dojo._isBodyLtr()) {
            dojo.addClass(dojo.body(), "dijitRtl");
        }
    });
}
if (!dojo._hasResource["dijit._base.typematic"]) {
    dojo._hasResource["dijit._base.typematic"] = true;
    dojo.provide("dijit._base.typematic");
    dijit.typematic = {_fireEventAndReload: function () {
        this._timer = null;
        this._callback(++this._count, this._node, this._evt);
        this._currentTimeout = (this._currentTimeout < 0) ? this._initialDelay : ((this._subsequentDelay > 1) ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay));
        this._timer = setTimeout(dojo.hitch(this, "_fireEventAndReload"), this._currentTimeout);
    }, trigger: function (evt, _549, node, _54b, obj, _54d, _54e) {
        if (obj != this._obj) {
            this.stop();
            this._initialDelay = _54e || 500;
            this._subsequentDelay = _54d || 0.9;
            this._obj = obj;
            this._evt = evt;
            this._node = node;
            this._currentTimeout = -1;
            this._count = -1;
            this._callback = dojo.hitch(_549, _54b);
            this._fireEventAndReload();
        }
    }, stop: function () {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        if (this._obj) {
            this._callback(-1, this._node, this._evt);
            this._obj = null;
        }
    }, addKeyListener: function (node, _550, _551, _552, _553, _554) {
        return [dojo.connect(node, "onkeypress", this, function (evt) {
            if (evt.keyCode == _550.keyCode && (!_550.charCode || _550.charCode == evt.charCode) && (_550.ctrlKey === undefined || _550.ctrlKey == evt.ctrlKey) && (_550.altKey === undefined || _550.altKey == evt.ctrlKey) && (_550.shiftKey === undefined || _550.shiftKey == evt.ctrlKey)) {
                dojo.stopEvent(evt);
                dijit.typematic.trigger(_550, _551, node, _552, _550, _553, _554);
            } else {
                if (dijit.typematic._obj == _550) {
                    dijit.typematic.stop();
                }
            }
        }), dojo.connect(node, "onkeyup", this, function (evt) {
            if (dijit.typematic._obj == _550) {
                dijit.typematic.stop();
            }
        })];
    }, addMouseListener: function (node, _558, _559, _55a, _55b) {
        var dc = dojo.connect;
        return [dc(node, "mousedown", this, function (evt) {
            dojo.stopEvent(evt);
            dijit.typematic.trigger(evt, _558, node, _559, node, _55a, _55b);
        }), dc(node, "mouseup", this, function (evt) {
            dojo.stopEvent(evt);
            dijit.typematic.stop();
        }), dc(node, "mouseout", this, function (evt) {
            dojo.stopEvent(evt);
            dijit.typematic.stop();
        }), dc(node, "mousemove", this, function (evt) {
            dojo.stopEvent(evt);
        }), dc(node, "dblclick", this, function (evt) {
            dojo.stopEvent(evt);
            if (dojo.isIE) {
                dijit.typematic.trigger(evt, _558, node, _559, node, _55a, _55b);
                setTimeout(dijit.typematic.stop, 50);
            }
        })];
    }, addListener: function (_562, _563, _564, _565, _566, _567, _568) {
        return this.addKeyListener(_563, _564, _565, _566, _567, _568).concat(this.addMouseListener(_562, _565, _566, _567, _568));
    }};
}
if (!dojo._hasResource["dijit._base.wai"]) {
    dojo._hasResource["dijit._base.wai"] = true;
    dojo.provide("dijit._base.wai");
    dijit.wai = {onload: function () {
        var div = document.createElement("div");
        div.id = "a11yTestNode";
        div.style.cssText = "border: 1px solid;" + "border-color:red green;" + "position: absolute;" + "height: 5px;" + "top: -999px;" + "background-image: url(\"" + dojo.moduleUrl("dijit", "form/templates/blank.gif") + "\");";
        dojo.body().appendChild(div);
        function check() {
            var cs = dojo.getComputedStyle(div);
            if (cs) {
                var _56b = cs.backgroundImage;
                var _56c = (cs.borderTopColor == cs.borderRightColor) || (_56b != null && (_56b == "none" || _56b == "url(invalid-url:)"));
                dojo[_56c ? "addClass" : "removeClass"](dojo.body(), "dijit_a11y");
            }
        };
        check();
        if (dojo.isIE) {
            setInterval(check, 4000);
        }
    }};
    if (dojo.isIE || dojo.isMoz) {
        dojo._loaders.unshift(dijit.wai.onload);
    }
    dojo.mixin(dijit, {hasWaiRole: function (elem) {
        if (elem.hasAttribute) {
            return elem.hasAttribute("role");
        } else {
            return elem.getAttribute("role") ? true : false;
        }
    }, getWaiRole: function (elem) {
        var _56f = elem.getAttribute("role");
        if (_56f) {
            var _570 = _56f.indexOf(":");
            return _570 == -1 ? _56f : _56f.substring(_570 + 1);
        } else {
            return "";
        }
    }, setWaiRole: function (elem, role) {
        if (dojo.isFF && dojo.isFF < 3) {
            elem.setAttribute("role", "wairole:" + role);
        } else {
            elem.setAttribute("role", role);
        }
    }, removeWaiRole: function (elem) {
        elem.removeAttribute("role");
    }, hasWaiState: function (elem, _575) {
        if (dojo.isFF && dojo.isFF < 3) {
            return elem.hasAttributeNS("http://www.w3.org/2005/07/aaa", _575);
        } else {
            if (elem.hasAttribute) {
                return elem.hasAttribute("aria-" + _575);
            } else {
                return elem.getAttribute("aria-" + _575) ? true : false;
            }
        }
    }, getWaiState: function (elem, _577) {
        if (dojo.isFF && dojo.isFF < 3) {
            return elem.getAttributeNS("http://www.w3.org/2005/07/aaa", _577);
        } else {
            var _578 = elem.getAttribute("aria-" + _577);
            return _578 ? _578 : "";
        }
    }, setWaiState: function (elem, _57a, _57b) {
        if (dojo.isFF && dojo.isFF < 3) {
            elem.setAttributeNS("http://www.w3.org/2005/07/aaa", "aaa:" + _57a, _57b);
        } else {
            elem.setAttribute("aria-" + _57a, _57b);
        }
    }, removeWaiState: function (elem, _57d) {
        if (dojo.isFF && dojo.isFF < 3) {
            elem.removeAttributeNS("http://www.w3.org/2005/07/aaa", _57d);
        } else {
            elem.removeAttribute("aria-" + _57d);
        }
    }});
}
if (!dojo._hasResource["dijit._base"]) {
    dojo._hasResource["dijit._base"] = true;
    dojo.provide("dijit._base");
}
if (!dojo._hasResource["dijit._Widget"]) {
    dojo._hasResource["dijit._Widget"] = true;
    dojo.provide("dijit._Widget");
    dojo.declare("dijit._Widget", null, {id: "", lang: "", dir: "", "class": "", style: "", title: "", srcNodeRef: null, domNode: null, attributeMap: {id: "", dir: "", lang: "", "class": "", style: "", title: ""}, postscript: function (_57e, _57f) {
        this.create(_57e, _57f);
    }, create: function (_580, _581) {
        this.srcNodeRef = dojo.byId(_581);
        this._connects = [];
        this._attaches = [];
        if (this.srcNodeRef && (typeof this.srcNodeRef.id == "string")) {
            this.id = this.srcNodeRef.id;
        }
        if (_580) {
            dojo.mixin(this, _580);
        }
        this.postMixInProperties();
        if (!this.id) {
            this.id = dijit.getUniqueId(this.declaredClass.replace(/\./g, "_"));
        }
        dijit.registry.add(this);
        this.buildRendering();
        if (this.domNode) {
            for (var attr in this.attributeMap) {
                var _583 = this[this.attributeMap[attr] || "domNode"];
                var _584 = this[attr];
                if (typeof _584 != "object" && (_584 !== "" || (_580 && _580[attr]))) {
                    switch (attr) {
                        case "class":
                            dojo.addClass(_583, _584);
                            break;
                        case "style":
                            if (_583.style.cssText) {
                                _583.style.cssText += "; " + _584;
                            } else {
                                _583.style.cssText = _584;
                            }
                            break;
                        default:
                            _583.setAttribute(attr, _584);
                    }
                }
            }
        }
        if (this.domNode) {
            this.domNode.setAttribute("widgetId", this.id);
        }
        this.postCreate();
        if (this.srcNodeRef && !this.srcNodeRef.parentNode) {
            delete this.srcNodeRef;
        }
    }, postMixInProperties: function () {
    }, buildRendering: function () {
        this.domNode = this.srcNodeRef || dojo.doc.createElement("div");
    }, postCreate: function () {
    }, startup: function () {
    }, destroyRecursive: function (_585) {
        this.destroyDescendants();
        this.destroy();
    }, destroy: function (_586) {
        this.uninitialize();
        dojo.forEach(this._connects, function (_587) {
            dojo.forEach(_587, dojo.disconnect);
        });
        this.destroyRendering(_586);
        dijit.registry.remove(this.id);
    }, destroyRendering: function (_588) {
        if (this.bgIframe) {
            this.bgIframe.destroy();
            delete this.bgIframe;
        }
        if (this.domNode) {
            dojo._destroyElement(this.domNode);
            delete this.domNode;
        }
        if (this.srcNodeRef) {
            dojo._destroyElement(this.srcNodeRef);
            delete this.srcNodeRef;
        }
    }, destroyDescendants: function () {
        dojo.forEach(this.getDescendants(), function (_589) {
            _589.destroy();
        });
    }, uninitialize: function () {
        return false;
    }, toString: function () {
        return "[Widget " + this.declaredClass + ", " + (this.id || "NO ID") + "]";
    }, getDescendants: function () {
        var list = dojo.query("[widgetId]", this.domNode);
        return list.map(dijit.byNode);
    }, nodesWithKeyClick: ["input", "button"], connect: function (obj, _58c, _58d) {
        var _58e = [];
        if (_58c == "ondijitclick") {
            var w = this;
            if (!this.nodesWithKeyClick[obj.nodeName]) {
                _58e.push(dojo.connect(obj, "onkeydown", this, function (e) {
                    if (e.keyCode == dojo.keys.ENTER) {
                        return (dojo.isString(_58d)) ? w[_58d](e) : _58d.call(w, e);
                    } else {
                        if (e.keyCode == dojo.keys.SPACE) {
                            dojo.stopEvent(e);
                        }
                    }
                }));
                _58e.push(dojo.connect(obj, "onkeyup", this, function (e) {
                    if (e.keyCode == dojo.keys.SPACE) {
                        return dojo.isString(_58d) ? w[_58d](e) : _58d.call(w, e);
                    }
                }));
            }
            _58c = "onclick";
        }
        _58e.push(dojo.connect(obj, _58c, this, _58d));
        this._connects.push(_58e);
        return _58e;
    }, disconnect: function (_592) {
        for (var i = 0; i < this._connects.length; i++) {
            if (this._connects[i] == _592) {
                dojo.forEach(_592, dojo.disconnect);
                this._connects.splice(i, 1);
                return;
            }
        }
    }, isLeftToRight: function () {
        if (typeof this._ltr == "undefined") {
            this._ltr = dojo.getComputedStyle(this.domNode).direction != "rtl";
        }
        return this._ltr;
    }, isFocusable: function () {
        return this.focus && (dojo.style(this.domNode, "display") != "none");
    }});
}
if (!dojo._hasResource["dojo.string"]) {
    dojo._hasResource["dojo.string"] = true;
    dojo.provide("dojo.string");
    dojo.string.pad = function (text, size, ch, end) {
        var out = String(text);
        if (!ch) {
            ch = "0";
        }
        while (out.length < size) {
            if (end) {
                out += ch;
            } else {
                out = ch + out;
            }
        }
        return out;
    };
    dojo.string.substitute = function (_599, map, _59b, _59c) {
        return _599.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function (_59d, key, _59f) {
            var _5a0 = dojo.getObject(key, false, map);
            if (_59f) {
                _5a0 = dojo.getObject(_59f, false, _59c)(_5a0);
            }
            if (_59b) {
                _5a0 = _59b(_5a0, key);
            }
            return _5a0.toString();
        });
    };
    dojo.string.trim = function (str) {
        str = str.replace(/^\s+/, "");
        for (var i = str.length - 1; i > 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    };
}
if (!dojo._hasResource["dojo.date.stamp"]) {
    dojo._hasResource["dojo.date.stamp"] = true;
    dojo.provide("dojo.date.stamp");
    dojo.date.stamp.fromISOString = function (_5a3, _5a4) {
        if (!dojo.date.stamp._isoRegExp) {
            dojo.date.stamp._isoRegExp = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
        }
        var _5a5 = dojo.date.stamp._isoRegExp.exec(_5a3);
        var _5a6 = null;
        if (_5a5) {
            _5a5.shift();
            _5a5[1] && _5a5[1]--;
            _5a5[6] && (_5a5[6] *= 1000);
            if (_5a4) {
                _5a4 = new Date(_5a4);
                dojo.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"],function (prop) {
                    return _5a4["get" + prop]();
                }).forEach(function (_5a8, _5a9) {
                    if (_5a5[_5a9] === undefined) {
                        _5a5[_5a9] = _5a8;
                    }
                });
            }
            _5a6 = new Date(_5a5[0] || 1970, _5a5[1] || 0, _5a5[2] || 0, _5a5[3] || 0, _5a5[4] || 0, _5a5[5] || 0, _5a5[6] || 0);
            var _5aa = 0;
            var _5ab = _5a5[7] && _5a5[7].charAt(0);
            if (_5ab != "Z") {
                _5aa = ((_5a5[8] || 0) * 60) + (Number(_5a5[9]) || 0);
                if (_5ab != "-") {
                    _5aa *= -1;
                }
            }
            if (_5ab) {
                _5aa -= _5a6.getTimezoneOffset();
            }
            if (_5aa) {
                _5a6.setTime(_5a6.getTime() + _5aa * 60000);
            }
        }
        return _5a6;
    };
    dojo.date.stamp.toISOString = function (_5ac, _5ad) {
        var _ = function (n) {
            return (n < 10) ? "0" + n : n;
        };
        _5ad = _5ad || {};
        var _5b0 = [];
        var _5b1 = _5ad.zulu ? "getUTC" : "get";
        var date = "";
        if (_5ad.selector != "time") {
            date = [_5ac[_5b1 + "FullYear"](), _(_5ac[_5b1 + "Month"]() + 1), _(_5ac[_5b1 + "Date"]())].join("-");
        }
        _5b0.push(date);
        if (_5ad.selector != "date") {
            var time = [_(_5ac[_5b1 + "Hours"]()), _(_5ac[_5b1 + "Minutes"]()), _(_5ac[_5b1 + "Seconds"]())].join(":");
            var _5b4 = _5ac[_5b1 + "Milliseconds"]();
            if (_5ad.milliseconds) {
                time += "." + (_5b4 < 100 ? "0" : "") + _(_5b4);
            }
            if (_5ad.zulu) {
                time += "Z";
            } else {
                if (_5ad.selector != "time") {
                    var _5b5 = _5ac.getTimezoneOffset();
                    var _5b6 = Math.abs(_5b5);
                    time += (_5b5 > 0 ? "-" : "+") + _(Math.floor(_5b6 / 60)) + ":" + _(_5b6 % 60);
                }
            }
            _5b0.push(time);
        }
        return _5b0.join("T");
    };
}
if (!dojo._hasResource["dojo.parser"]) {
    dojo._hasResource["dojo.parser"] = true;
    dojo.provide("dojo.parser");
    dojo.parser = new function () {
        var d = dojo;

        function val2type(_5b8) {
            if (d.isString(_5b8)) {
                return "string";
            }
            if (typeof _5b8 == "number") {
                return "number";
            }
            if (typeof _5b8 == "boolean") {
                return "boolean";
            }
            if (d.isFunction(_5b8)) {
                return "function";
            }
            if (d.isArray(_5b8)) {
                return "array";
            }
            if (_5b8 instanceof Date) {
                return "date";
            }
            if (_5b8 instanceof d._Url) {
                return "url";
            }
            return "object";
        };
        function str2obj(_5b9, type) {
            switch (type) {
                case "string":
                    return _5b9;
                case "number":
                    return _5b9.length ? Number(_5b9) : NaN;
                case "boolean":
                    return typeof _5b9 == "boolean" ? _5b9 : !(_5b9.toLowerCase() == "false");
                case "function":
                    if (d.isFunction(_5b9)) {
                        _5b9 = _5b9.toString();
                        _5b9 = d.trim(_5b9.substring(_5b9.indexOf("{") + 1, _5b9.length - 1));
                    }
                    try {
                        if (_5b9.search(/[^\w\.]+/i) != -1) {
                            _5b9 = d.parser._nameAnonFunc(new Function(_5b9), this);
                        }
                        return d.getObject(_5b9, false);
                    } catch (e) {
                        return new Function();
                    }
                case "array":
                    return _5b9.split(/\s*,\s*/);
                case "date":
                    switch (_5b9) {
                        case "":
                            return new Date("");
                        case "now":
                            return new Date();
                        default:
                            return d.date.stamp.fromISOString(_5b9);
                    }
                case "url":
                    return d.baseUrl + _5b9;
                default:
                    return d.fromJson(_5b9);
            }
        };
        var _5bb = {};

        function getClassInfo(_5bc) {
            if (!_5bb[_5bc]) {
                var cls = d.getObject(_5bc);
                if (!d.isFunction(cls)) {
                    throw new Error("Could not load class '" + _5bc + "'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
                }
                var _5be = cls.prototype;
                var _5bf = {};
                for (var name in _5be) {
                    if (name.charAt(0) == "_") {
                        continue;
                    }
                    var _5c1 = _5be[name];
                    _5bf[name] = val2type(_5c1);
                }
                _5bb[_5bc] = {cls: cls, params: _5bf};
            }
            return _5bb[_5bc];
        };
        this._functionFromScript = function (_5c2) {
            var _5c3 = "";
            var _5c4 = "";
            var _5c5 = _5c2.getAttribute("args");
            if (_5c5) {
                d.forEach(_5c5.split(/\s*,\s*/), function (part, idx) {
                    _5c3 += "var " + part + " = arguments[" + idx + "]; ";
                });
            }
            var _5c8 = _5c2.getAttribute("with");
            if (_5c8 && _5c8.length) {
                d.forEach(_5c8.split(/\s*,\s*/), function (part) {
                    _5c3 += "with(" + part + "){";
                    _5c4 += "}";
                });
            }
            return new Function(_5c3 + _5c2.innerHTML + _5c4);
        };
        this.instantiate = function (_5ca) {
            var _5cb = [];
            d.forEach(_5ca, function (node) {
                if (!node) {
                    return;
                }
                var type = node.getAttribute("dojoType");
                if ((!type) || (!type.length)) {
                    return;
                }
                var _5ce = getClassInfo(type);
                var _5cf = _5ce.cls;
                var ps = _5cf._noScript || _5cf.prototype._noScript;
                var _5d1 = {};
                var _5d2 = node.attributes;
                for (var name in _5ce.params) {
                    var item = _5d2.getNamedItem(name);
                    if (!item || (!item.specified && (!dojo.isIE || name.toLowerCase() != "value"))) {
                        continue;
                    }
                    var _5d5 = item.value;
                    switch (name) {
                        case "class":
                            _5d5 = node.className;
                            break;
                        case "style":
                            _5d5 = node.style && node.style.cssText;
                    }
                    var _5d6 = _5ce.params[name];
                    _5d1[name] = str2obj(_5d5, _5d6);
                }
                if (!ps) {
                    var _5d7 = [], _5d8 = [];
                    d.query("> script[type^='dojo/']", node).orphan().forEach(function (_5d9) {
                        var _5da = _5d9.getAttribute("event"), type = _5d9.getAttribute("type"), nf = d.parser._functionFromScript(_5d9);
                        if (_5da) {
                            if (type == "dojo/connect") {
                                _5d7.push({event: _5da, func: nf});
                            } else {
                                _5d1[_5da] = nf;
                            }
                        } else {
                            _5d8.push(nf);
                        }
                    });
                }
                var _5dc = _5cf["markupFactory"];
                if (!_5dc && _5cf["prototype"]) {
                    _5dc = _5cf.prototype["markupFactory"];
                }
                var _5dd = _5dc ? _5dc(_5d1, node, _5cf) : new _5cf(_5d1, node);
                _5cb.push(_5dd);
                var _5de = node.getAttribute("jsId");
                if (_5de) {
                    d.setObject(_5de, _5dd);
                }
                if (!ps) {
                    dojo.forEach(_5d7, function (_5df) {
                        dojo.connect(_5dd, _5df.event, null, _5df.func);
                    });
                    dojo.forEach(_5d8, function (func) {
                        func.call(_5dd);
                    });
                }
            });
            d.forEach(_5cb, function (_5e1) {
                if (_5e1 && (_5e1.startup) && ((!_5e1.getParent) || (!_5e1.getParent()))) {
                    _5e1.startup();
                }
            });
            return _5cb;
        };
        this.parse = function (_5e2) {
            var list = d.query("[dojoType]", _5e2);
            var _5e4 = this.instantiate(list);
            return _5e4;
        };
    }();
    (function () {
        var _5e5 = function () {
            if (djConfig["parseOnLoad"] == true) {
                dojo.parser.parse();
            }
        };
        if (dojo.exists("dijit.wai.onload") && (dijit.wai.onload === dojo._loaders[0])) {
            dojo._loaders.splice(1, 0, _5e5);
        } else {
            dojo._loaders.unshift(_5e5);
        }
    })();
    dojo.parser._anonCtr = 0;
    dojo.parser._anon = {};
    dojo.parser._nameAnonFunc = function (_5e6, _5e7) {
        var jpn = "$joinpoint";
        var nso = (_5e7 || dojo.parser._anon);
        if (dojo.isIE) {
            var cn = _5e6["__dojoNameCache"];
            if (cn && nso[cn] === _5e6) {
                return _5e6["__dojoNameCache"];
            }
        }
        var ret = "__" + dojo.parser._anonCtr++;
        while (typeof nso[ret] != "undefined") {
            ret = "__" + dojo.parser._anonCtr++;
        }
        nso[ret] = _5e6;
        return ret;
    };
}
if (!dojo._hasResource["dijit._Templated"]) {
    dojo._hasResource["dijit._Templated"] = true;
    dojo.provide("dijit._Templated");
    dojo.declare("dijit._Templated", null, {templateNode: null, templateString: null, templatePath: null, widgetsInTemplate: false, containerNode: null, _skipNodeCache: false, buildRendering: function () {
        var _5ec = dijit._Templated.getCachedTemplate(this.templatePath, this.templateString, this._skipNodeCache);
        var node;
        if (dojo.isString(_5ec)) {
            var _5ee = this.declaredClass, _5ef = this;
            var tstr = dojo.string.substitute(_5ec, this, function (_5f1, key) {
                if (key.charAt(0) == "!") {
                    _5f1 = _5ef[key.substr(1)];
                }
                if (typeof _5f1 == "undefined") {
                    throw new Error(_5ee + " template:" + key);
                }
                if (!_5f1) {
                    return "";
                }
                return key.charAt(0) == "!" ? _5f1 : _5f1.toString().replace(/"/g, "&quot;");
            }, this);
            node = dijit._Templated._createNodesFromText(tstr)[0];
        } else {
            node = _5ec.cloneNode(true);
        }
        this._attachTemplateNodes(node);
        var _5f3 = this.srcNodeRef;
        if (_5f3 && _5f3.parentNode) {
            _5f3.parentNode.replaceChild(node, _5f3);
        }
        this.domNode = node;
        if (this.widgetsInTemplate) {
            var _5f4 = dojo.parser.parse(node);
            this._attachTemplateNodes(_5f4, function (n, p) {
                return n[p];
            });
        }
        this._fillContent(_5f3);
    }, _fillContent: function (_5f7) {
        var dest = this.containerNode;
        if (_5f7 && dest) {
            while (_5f7.hasChildNodes()) {
                dest.appendChild(_5f7.firstChild);
            }
        }
    }, _attachTemplateNodes: function (_5f9, _5fa) {
        _5fa = _5fa || function (n, p) {
            return n.getAttribute(p);
        };
        var _5fd = dojo.isArray(_5f9) ? _5f9 : (_5f9.all || _5f9.getElementsByTagName("*"));
        var x = dojo.isArray(_5f9) ? 0 : -1;
        for (; x < _5fd.length; x++) {
            var _5ff = (x == -1) ? _5f9 : _5fd[x];
            if (this.widgetsInTemplate && _5fa(_5ff, "dojoType")) {
                continue;
            }
            var _600 = _5fa(_5ff, "dojoAttachPoint");
            if (_600) {
                var _601, _602 = _600.split(/\s*,\s*/);
                while (_601 = _602.shift()) {
                    if (dojo.isArray(this[_601])) {
                        this[_601].push(_5ff);
                    } else {
                        this[_601] = _5ff;
                    }
                }
            }
            var _603 = _5fa(_5ff, "dojoAttachEvent");
            if (_603) {
                var _604, _605 = _603.split(/\s*,\s*/);
                var trim = dojo.trim;
                while (_604 = _605.shift()) {
                    if (_604) {
                        var _607 = null;
                        if (_604.indexOf(":") != -1) {
                            var _608 = _604.split(":");
                            _604 = trim(_608[0]);
                            _607 = trim(_608[1]);
                        } else {
                            _604 = trim(_604);
                        }
                        if (!_607) {
                            _607 = _604;
                        }
                        this.connect(_5ff, _604, _607);
                    }
                }
            }
            var role = _5fa(_5ff, "waiRole");
            if (role) {
                dijit.setWaiRole(_5ff, role);
            }
            var _60a = _5fa(_5ff, "waiState");
            if (_60a) {
                dojo.forEach(_60a.split(/\s*,\s*/), function (_60b) {
                    if (_60b.indexOf("-") != -1) {
                        var pair = _60b.split("-");
                        dijit.setWaiState(_5ff, pair[0], pair[1]);
                    }
                });
            }
        }
    }});
    dijit._Templated._templateCache = {};
    dijit._Templated.getCachedTemplate = function (_60d, _60e, _60f) {
        var _610 = dijit._Templated._templateCache;
        var key = _60e || _60d;
        var _612 = _610[key];
        if (_612) {
            return _612;
        }
        if (!_60e) {
            _60e = dijit._Templated._sanitizeTemplateString(dojo._getText(_60d));
        }
        _60e = dojo.string.trim(_60e);
        if (_60e.match(/\$\{([^\}]+)\}/g) || _60f) {
            return (_610[key] = _60e);
        } else {
            return (_610[key] = dijit._Templated._createNodesFromText(_60e)[0]);
        }
    };
    dijit._Templated._sanitizeTemplateString = function (_613) {
        if (_613) {
            _613 = _613.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
            var _614 = _613.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
            if (_614) {
                _613 = _614[1];
            }
        } else {
            _613 = "";
        }
        return _613;
    };
    if (dojo.isIE) {
        dojo.addOnUnload(function () {
            var _615 = dijit._Templated._templateCache;
            for (var key in _615) {
                var _617 = _615[key];
                if (!isNaN(_617.nodeType)) {
                    dojo._destroyElement(_617);
                }
                delete _615[key];
            }
        });
    }
    (function () {
        var _618 = {cell: {re: /^<t[dh][\s\r\n>]/i, pre: "<table><tbody><tr>", post: "</tr></tbody></table>"}, row: {re: /^<tr[\s\r\n>]/i, pre: "<table><tbody>", post: "</tbody></table>"}, section: {re: /^<(thead|tbody|tfoot)[\s\r\n>]/i, pre: "<table>", post: "</table>"}};
        var tn;
        dijit._Templated._createNodesFromText = function (text) {
            if (!tn) {
                tn = dojo.doc.createElement("div");
                tn.style.display = "none";
                dojo.body().appendChild(tn);
            }
            var _61b = "none";
            var _61c = text.replace(/^\s+/, "");
            for (var type in _618) {
                var map = _618[type];
                if (map.re.test(_61c)) {
                    _61b = type;
                    text = map.pre + text + map.post;
                    break;
                }
            }
            tn.innerHTML = text;
            if (tn.normalize) {
                tn.normalize();
            }
            var tag = {cell: "tr", row: "tbody", section: "table"}[_61b];
            var _620 = (typeof tag != "undefined") ? tn.getElementsByTagName(tag)[0] : tn;
            var _621 = [];
            while (_620.firstChild) {
                _621.push(_620.removeChild(_620.firstChild));
            }
            tn.innerHTML = "";
            return _621;
        };
    })();
    dojo.extend(dijit._Widget, {dojoAttachEvent: "", dojoAttachPoint: "", waiRole: "", waiState: ""});
}
if (!dojo._hasResource["dijit._Container"]) {
    dojo._hasResource["dijit._Container"] = true;
    dojo.provide("dijit._Container");
    dojo.declare("dijit._Contained", null, {getParent: function () {
        for (var p = this.domNode.parentNode; p; p = p.parentNode) {
            var id = p.getAttribute && p.getAttribute("widgetId");
            if (id) {
                var _624 = dijit.byId(id);
                return _624.isContainer ? _624 : null;
            }
        }
        return null;
    }, _getSibling: function (_625) {
        var node = this.domNode;
        do {
            node = node[_625 + "Sibling"];
        } while (node && node.nodeType != 1);
        if (!node) {
            return null;
        }
        var id = node.getAttribute("widgetId");
        return dijit.byId(id);
    }, getPreviousSibling: function () {
        return this._getSibling("previous");
    }, getNextSibling: function () {
        return this._getSibling("next");
    }});
    dojo.declare("dijit._Container", null, {isContainer: true, addChild: function (_628, _629) {
        if (_629 === undefined) {
            _629 = "last";
        }
        var _62a = this.containerNode || this.domNode;
        if (_629 && typeof _629 == "number") {
            var _62b = dojo.query("> [widgetid]", _62a);
            if (_62b && _62b.length >= _629) {
                _62a = _62b[_629 - 1];
                _629 = "after";
            }
        }
        dojo.place(_628.domNode, _62a, _629);
        if (this._started && !_628._started) {
            _628.startup();
        }
    }, removeChild: function (_62c) {
        var node = _62c.domNode;
        node.parentNode.removeChild(node);
    }, _nextElement: function (node) {
        do {
            node = node.nextSibling;
        } while (node && node.nodeType != 1);
        return node;
    }, _firstElement: function (node) {
        node = node.firstChild;
        if (node && node.nodeType != 1) {
            node = this._nextElement(node);
        }
        return node;
    }, getChildren: function () {
        return dojo.query("> [widgetId]", this.containerNode || this.domNode).map(dijit.byNode);
    }, hasChildren: function () {
        var cn = this.containerNode || this.domNode;
        return !!this._firstElement(cn);
    }, _getSiblingOfChild: function (_631, dir) {
        var node = _631.domNode;
        var _634 = (dir > 0 ? "nextSibling" : "previousSibling");
        do {
            node = node[_634];
        } while (node && (node.nodeType != 1 || !dijit.byNode(node)));
        return node ? dijit.byNode(node) : null;
    }});
    dojo.declare("dijit._KeyNavContainer", [dijit._Container], {_keyNavCodes: {}, connectKeyNavHandlers: function (_635, _636) {
        var _637 = this._keyNavCodes = {};
        var prev = dojo.hitch(this, this.focusPrev);
        var next = dojo.hitch(this, this.focusNext);
        dojo.forEach(_635, function (code) {
            _637[code] = prev;
        });
        dojo.forEach(_636, function (code) {
            _637[code] = next;
        });
        this.connect(this.domNode, "onkeypress", "_onContainerKeypress");
        if (dojo.isIE) {
            this.connect(this.domNode, "onactivate", "_onContainerFocus");
            this.connect(this.domNode, "ondeactivate", "_onContainerBlur");
        } else {
            this.connect(this.domNode, "onfocus", "_onContainerFocus");
            this.connect(this.domNode, "onblur", "_onContainerBlur");
        }
    }, startupKeyNavChildren: function () {
        dojo.forEach(this.getChildren(), dojo.hitch(this, "_setTabIndexMinusOne"));
    }, addChild: function (_63c, _63d) {
        dijit._KeyNavContainer.superclass.addChild.apply(this, arguments);
        this._setTabIndexMinusOne(_63c);
    }, focus: function () {
        this.focusFirstChild();
    }, focusFirstChild: function () {
        this.focusChild(this._getFirstFocusableChild());
    }, focusNext: function () {
        if (this.focusedChild && this.focusedChild.hasNextFocalNode && this.focusedChild.hasNextFocalNode()) {
            this.focusedChild.focusNext();
            return;
        }
        var _63e = this._getNextFocusableChild(this.focusedChild, 1);
        if (_63e.getFocalNodes) {
            this.focusChild(_63e, _63e.getFocalNodes()[0]);
        } else {
            this.focusChild(_63e);
        }
    }, focusPrev: function () {
        if (this.focusedChild && this.focusedChild.hasPrevFocalNode && this.focusedChild.hasPrevFocalNode()) {
            this.focusedChild.focusPrev();
            return;
        }
        var _63f = this._getNextFocusableChild(this.focusedChild, -1);
        if (_63f.getFocalNodes) {
            var _640 = _63f.getFocalNodes();
            this.focusChild(_63f, _640[_640.length - 1]);
        } else {
            this.focusChild(_63f);
        }
    }, focusChild: function (_641, node) {
        if (_641) {
            if (this.focusedChild && _641 !== this.focusedChild) {
                this._onChildBlur(this.focusedChild);
            }
            this.focusedChild = _641;
            if (node && _641.focusFocalNode) {
                _641.focusFocalNode(node);
            } else {
                _641.focus();
            }
        }
    }, _setTabIndexMinusOne: function (_643) {
        if (_643.getFocalNodes) {
            dojo.forEach(_643.getFocalNodes(), function (node) {
                node.setAttribute("tabIndex", -1);
            });
        } else {
            (_643.focusNode || _643.domNode).setAttribute("tabIndex", -1);
        }
    }, _onContainerFocus: function (evt) {
        this.domNode.setAttribute("tabIndex", -1);
        if (evt.target === this.domNode) {
            this.focusFirstChild();
        } else {
            var _646 = dijit.getEnclosingWidget(evt.target);
            if (_646 && _646.isFocusable()) {
                this.focusedChild = _646;
            }
        }
    }, _onContainerBlur: function (evt) {
        if (this.tabIndex) {
            this.domNode.setAttribute("tabIndex", this.tabIndex);
        }
    }, _onContainerKeypress: function (evt) {
        if (evt.ctrlKey || evt.altKey) {
            return;
        }
        var func = this._keyNavCodes[evt.keyCode];
        if (func) {
            func();
            dojo.stopEvent(evt);
        }
    }, _onChildBlur: function (_64a) {
    }, _getFirstFocusableChild: function () {
        return this._getNextFocusableChild(null, 1);
    }, _getNextFocusableChild: function (_64b, dir) {
        if (_64b) {
            _64b = this._getSiblingOfChild(_64b, dir);
        }
        var _64d = this.getChildren();
        for (var i = 0; i < _64d.length; i++) {
            if (!_64b) {
                _64b = _64d[(dir > 0) ? 0 : (_64d.length - 1)];
            }
            if (_64b.isFocusable()) {
                return _64b;
            }
            _64b = this._getSiblingOfChild(_64b, dir);
        }
    }});
}
if (!dojo._hasResource["dijit.layout._LayoutWidget"]) {
    dojo._hasResource["dijit.layout._LayoutWidget"] = true;
    dojo.provide("dijit.layout._LayoutWidget");
    dojo.declare("dijit.layout._LayoutWidget", [dijit._Widget, dijit._Container, dijit._Contained], {isLayoutContainer: true, postCreate: function () {
        dojo.addClass(this.domNode, "dijitContainer");
    }, startup: function () {
        if (this._started) {
            return;
        }
        this._started = true;
        if (this.getChildren) {
            dojo.forEach(this.getChildren(), function (_64f) {
                _64f.startup();
            });
        }
        if (!this.getParent || !this.getParent()) {
            this.resize();
            this.connect(window, "onresize", function () {
                this.resize();
            });
        }
    }, resize: function (args) {
        var node = this.domNode;
        if (args) {
            dojo.marginBox(node, args);
            if (args.t) {
                node.style.top = args.t + "px";
            }
            if (args.l) {
                node.style.left = args.l + "px";
            }
        }
        var mb = dojo.mixin(dojo.marginBox(node), args || {});
        this._contentBox = dijit.layout.marginBox2contentBox(node, mb);
        this.layout();
    }, layout: function () {
    }});
    dijit.layout.marginBox2contentBox = function (node, mb) {
        var cs = dojo.getComputedStyle(node);
        var me = dojo._getMarginExtents(node, cs);
        var pb = dojo._getPadBorderExtents(node, cs);
        return {l: dojo._toPixelValue(node, cs.paddingLeft), t: dojo._toPixelValue(node, cs.paddingTop), w: mb.w - (me.w + pb.w), h: mb.h - (me.h + pb.h)};
    };
    (function () {
        var _658 = function (word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        };
        var size = function (_65b, dim) {
            _65b.resize ? _65b.resize(dim) : dojo.marginBox(_65b.domNode, dim);
            dojo.mixin(_65b, dojo.marginBox(_65b.domNode));
            dojo.mixin(_65b, dim);
        };
        dijit.layout.layoutChildren = function (_65d, dim, _65f) {
            dim = dojo.mixin({}, dim);
            dojo.addClass(_65d, "dijitLayoutContainer");
            _65f = dojo.filter(_65f,function (item) {
                return item.layoutAlign != "client";
            }).concat(dojo.filter(_65f, function (item) {
                return item.layoutAlign == "client";
            }));
            dojo.forEach(_65f, function (_662) {
                var elm = _662.domNode, pos = _662.layoutAlign;
                var _665 = elm.style;
                _665.left = dim.l + "px";
                _665.top = dim.t + "px";
                _665.bottom = _665.right = "auto";
                dojo.addClass(elm, "dijitAlign" + _658(pos));
                if (pos == "top" || pos == "bottom") {
                    size(_662, {w: dim.w});
                    dim.h -= _662.h;
                    if (pos == "top") {
                        dim.t += _662.h;
                    } else {
                        _665.top = dim.t + dim.h + "px";
                    }
                } else {
                    if (pos == "left" || pos == "right") {
                        size(_662, {h: dim.h});
                        dim.w -= _662.w;
                        if (pos == "left") {
                            dim.l += _662.w;
                        } else {
                            _665.left = dim.l + dim.w + "px";
                        }
                    } else {
                        if (pos == "client") {
                            size(_662, dim);
                        }
                    }
                }
            });
        };
    })();
}
if (!dojo._hasResource["dojo.i18n"]) {
    dojo._hasResource["dojo.i18n"] = true;
    dojo.provide("dojo.i18n");
    dojo.i18n.getLocalization = function (_666, _667, _668) {
        _668 = dojo.i18n.normalizeLocale(_668);
        var _669 = _668.split("-");
        var _66a = [_666, "nls", _667].join(".");
        var _66b = dojo._loadedModules[_66a];
        if (_66b) {
            var _66c;
            for (var i = _669.length; i > 0; i--) {
                var loc = _669.slice(0, i).join("_");
                if (_66b[loc]) {
                    _66c = _66b[loc];
                    break;
                }
            }
            if (!_66c) {
                _66c = _66b.ROOT;
            }
            if (_66c) {
                var _66f = function () {
                };
                _66f.prototype = _66c;
                return new _66f();
            }
        }
        throw new Error("Bundle not found: " + _667 + " in " + _666 + " , locale=" + _668);
    };
    dojo.i18n.normalizeLocale = function (_670) {
        var _671 = _670 ? _670.toLowerCase() : dojo.locale;
        if (_671 == "root") {
            _671 = "ROOT";
        }
        return _671;
    };
    dojo.i18n._requireLocalization = function (_672, _673, _674, _675) {
        var _676 = dojo.i18n.normalizeLocale(_674);
        var _677 = [_672, "nls", _673].join(".");
        var _678 = "";
        if (_675) {
            var _679 = _675.split(",");
            for (var i = 0; i < _679.length; i++) {
                if (_676.indexOf(_679[i]) == 0) {
                    if (_679[i].length > _678.length) {
                        _678 = _679[i];
                    }
                }
            }
            if (!_678) {
                _678 = "ROOT";
            }
        }
        var _67b = _675 ? _678 : _676;
        var _67c = dojo._loadedModules[_677];
        var _67d = null;
        if (_67c) {
            if (djConfig.localizationComplete && _67c._built) {
                return;
            }
            var _67e = _67b.replace(/-/g, "_");
            var _67f = _677 + "." + _67e;
            _67d = dojo._loadedModules[_67f];
        }
        if (!_67d) {
            _67c = dojo["provide"](_677);
            var syms = dojo._getModuleSymbols(_672);
            var _681 = syms.concat("nls").join("/");
            var _682;
            dojo.i18n._searchLocalePath(_67b, _675, function (loc) {
                var _684 = loc.replace(/-/g, "_");
                var _685 = _677 + "." + _684;
                var _686 = false;
                if (!dojo._loadedModules[_685]) {
                    dojo["provide"](_685);
                    var _687 = [_681];
                    if (loc != "ROOT") {
                        _687.push(loc);
                    }
                    _687.push(_673);
                    var _688 = _687.join("/") + ".js";
                    _686 = dojo._loadPath(_688, null, function (hash) {
                        var _68a = function () {
                        };
                        _68a.prototype = _682;
                        _67c[_684] = new _68a();
                        for (var j in hash) {
                            _67c[_684][j] = hash[j];
                        }
                    });
                } else {
                    _686 = true;
                }
                if (_686 && _67c[_684]) {
                    _682 = _67c[_684];
                } else {
                    _67c[_684] = _682;
                }
                if (_675) {
                    return true;
                }
            });
        }
        if (_675 && _676 != _678) {
            _67c[_676.replace(/-/g, "_")] = _67c[_678.replace(/-/g, "_")];
        }
    };
    (function () {
        var _68c = djConfig.extraLocale;
        if (_68c) {
            if (!_68c instanceof Array) {
                _68c = [_68c];
            }
            var req = dojo.i18n._requireLocalization;
            dojo.i18n._requireLocalization = function (m, b, _690, _691) {
                req(m, b, _690, _691);
                if (_690) {
                    return;
                }
                for (var i = 0; i < _68c.length; i++) {
                    req(m, b, _68c[i], _691);
                }
            };
        }
    })();
    dojo.i18n._searchLocalePath = function (_693, down, _695) {
        _693 = dojo.i18n.normalizeLocale(_693);
        var _696 = _693.split("-");
        var _697 = [];
        for (var i = _696.length; i > 0; i--) {
            _697.push(_696.slice(0, i).join("-"));
        }
        _697.push(false);
        if (down) {
            _697.reverse();
        }
        for (var j = _697.length - 1; j >= 0; j--) {
            var loc = _697[j] || "ROOT";
            var stop = _695(loc);
            if (stop) {
                break;
            }
        }
    };
    dojo.i18n._preloadLocalizations = function (_69c, _69d) {
        function preload(_69e) {
            _69e = dojo.i18n.normalizeLocale(_69e);
            dojo.i18n._searchLocalePath(_69e, true, function (loc) {
                for (var i = 0; i < _69d.length; i++) {
                    if (_69d[i] == loc) {
                        dojo["require"](_69c + "_" + loc);
                        return true;
                    }
                }
                return false;
            });
        };
        preload();
        var _6a1 = djConfig.extraLocale || [];
        for (var i = 0; i < _6a1.length; i++) {
            preload(_6a1[i]);
        }
    };
}
if (!dojo._hasResource["dijit.layout.ContentPane"]) {
    dojo._hasResource["dijit.layout.ContentPane"] = true;
    dojo.provide("dijit.layout.ContentPane");
    dojo.declare("dijit.layout.ContentPane", dijit._Widget, {href: "", extractContent: false, parseOnLoad: true, preventCache: false, preload: false, refreshOnShow: false, loadingMessage: "<span class='dijitContentPaneLoading'>${loadingState}</span>", errorMessage: "<span class='dijitContentPaneError'>${errorState}</span>", isLoaded: false, "class": "dijitContentPane", postCreate: function () {
        this.domNode.title = "";
        if (this.preload) {
            this._loadCheck();
        }
        var _6a3 = dojo.i18n.getLocalization("dijit", "loading", this.lang);
        this.loadingMessage = dojo.string.substitute(this.loadingMessage, _6a3);
        this.errorMessage = dojo.string.substitute(this.errorMessage, _6a3);
        dojo.addClass(this.domNode, this["class"]);
    }, startup: function () {
        if (this._started) {
            return;
        }
        this._checkIfSingleChild();
        if (this._singleChild) {
            this._singleChild.startup();
        }
        this._loadCheck();
        this._started = true;
    }, _checkIfSingleChild: function () {
        var _6a4 = dojo.query(">", this.containerNode || this.domNode), _6a5 = _6a4.filter("[widgetId]");
        if (_6a4.length == 1 && _6a5.length == 1) {
            this.isContainer = true;
            this._singleChild = dijit.byNode(_6a5[0]);
        } else {
            delete this.isContainer;
            delete this._singleChild;
        }
    }, refresh: function () {
        return this._prepareLoad(true);
    }, setHref: function (href) {
        this.href = href;
        return this._prepareLoad();
    }, setContent: function (data) {
        if (!this._isDownloaded) {
            this.href = "";
            this._onUnloadHandler();
        }
        this._setContent(data || "");
        this._isDownloaded = false;
        if (this.parseOnLoad) {
            this._createSubWidgets();
        }
        this._checkIfSingleChild();
        if (this._singleChild && this._singleChild.resize) {
            this._singleChild.resize(this._contentBox);
        }
        this._onLoadHandler();
    }, cancel: function () {
        if (this._xhrDfd && (this._xhrDfd.fired == -1)) {
            this._xhrDfd.cancel();
        }
        delete this._xhrDfd;
    }, destroy: function () {
        if (this._beingDestroyed) {
            return;
        }
        this._onUnloadHandler();
        this._beingDestroyed = true;
        this.inherited("destroy", arguments);
    }, resize: function (size) {
        dojo.marginBox(this.domNode, size);
        var node = this.containerNode || this.domNode, mb = dojo.mixin(dojo.marginBox(node), size || {});
        this._contentBox = dijit.layout.marginBox2contentBox(node, mb);
        if (this._singleChild && this._singleChild.resize) {
            this._singleChild.resize(this._contentBox);
        }
    }, _prepareLoad: function (_6ab) {
        this.cancel();
        this.isLoaded = false;
        this._loadCheck(_6ab);
    }, _loadCheck: function (_6ac) {
        var _6ad = ((this.open !== false) && (this.domNode.style.display != "none"));
        if (this.href && (_6ac || (this.preload && !this._xhrDfd) || (this.refreshOnShow && _6ad && !this._xhrDfd) || (!this.isLoaded && _6ad && !this._xhrDfd))) {
            this._downloadExternalContent();
        }
    }, _downloadExternalContent: function () {
        this._onUnloadHandler();
        this._setContent(this.onDownloadStart.call(this));
        var self = this;
        var _6af = {preventCache: (this.preventCache || this.refreshOnShow), url: this.href, handleAs: "text"};
        if (dojo.isObject(this.ioArgs)) {
            dojo.mixin(_6af, this.ioArgs);
        }
        var hand = this._xhrDfd = (this.ioMethod || dojo.xhrGet)(_6af);
        hand.addCallback(function (html) {
            try {
                self.onDownloadEnd.call(self);
                self._isDownloaded = true;
                self.setContent.call(self, html);
            } catch (err) {
                self._onError.call(self, "Content", err);
            }
            delete self._xhrDfd;
            return html;
        });
        hand.addErrback(function (err) {
            if (!hand.cancelled) {
                self._onError.call(self, "Download", err);
            }
            delete self._xhrDfd;
            return err;
        });
    }, _onLoadHandler: function () {
        this.isLoaded = true;
        try {
            this.onLoad.call(this);
        } catch (e) {
            console.error("Error " + this.widgetId + " running custom onLoad code");
        }
    }, _onUnloadHandler: function () {
        this.isLoaded = false;
        this.cancel();
        try {
            this.onUnload.call(this);
        } catch (e) {
            console.error("Error " + this.widgetId + " running custom onUnload code");
        }
    }, _setContent: function (cont) {
        this.destroyDescendants();
        try {
            var node = this.containerNode || this.domNode;
            while (node.firstChild) {
                dojo._destroyElement(node.firstChild);
            }
            if (typeof cont == "string") {
                if (this.extractContent) {
                    match = cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
                    if (match) {
                        cont = match[1];
                    }
                }
                node.innerHTML = cont;
            } else {
                if (cont.nodeType) {
                    node.appendChild(cont);
                } else {
                    dojo.forEach(cont, function (n) {
                        node.appendChild(n.cloneNode(true));
                    });
                }
            }
        } catch (e) {
            var _6b6 = this.onContentError(e);
            try {
                node.innerHTML = _6b6;
            } catch (e) {
                console.error("Fatal " + this.id + " could not change content due to " + e.message, e);
            }
        }
    }, _onError: function (type, err, _6b9) {
        var _6ba = this["on" + type + "Error"].call(this, err);
        if (_6b9) {
            console.error(_6b9, err);
        } else {
            if (_6ba) {
                this._setContent.call(this, _6ba);
            }
        }
    }, _createSubWidgets: function () {
        var _6bb = this.containerNode || this.domNode;
        try {
            dojo.parser.parse(_6bb, true);
        } catch (e) {
            this._onError("Content", e, "Couldn't create widgets in " + this.id + (this.href ? " from " + this.href : ""));
        }
    }, onLoad: function (e) {
    }, onUnload: function (e) {
    }, onDownloadStart: function () {
        return this.loadingMessage;
    }, onContentError: function (_6be) {
    }, onDownloadError: function (_6bf) {
        return this.errorMessage;
    }, onDownloadEnd: function () {
    }});
}
if (!dojo._hasResource["dijit.Expand_ListTitlePane"]) {
    dojo._hasResource["dijit.Expand_ListTitlePane"] = true;
    dojo.provide("dijit.Expand_ListTitlePane");
    dojo.declare("dijit.Expand_ListTitlePane", [dijit.layout.ContentPane, dijit._Templated], {title: "", open: true, duration: 250, baseClass: "dijitExpand_ListTitlePane", templateString: "<div class=\"dijitExpand_ListTitlePane\">\n\t<div dojoAttachEvent=\"onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus\" tabindex=\"0\"\n\t\t\twaiRole=\"button\" class=\"dijitExpand_ListTitlePaneTitle\" dojoAttachPoint=\"focusNode\">\n\t\t<div dojoAttachPoint=\"arrowNode\" class=\"dijitInline dijitArrowNode\"><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span></div>\n\t\t<div dojoAttachPoint=\"titleNode\" class=\"dijitExpand_ListTitlePaneTextNode\"></div>\n\t</div>\n\t<div class=\"dijitExpand_ListTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\">\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\">\n\t\t\t<div class=\"dijitExpand_ListTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" waiRole=\"region\" tabindex=\"-1\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n", postCreate: function () {
        this.setTitle(this.title);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this._setCss();
        dojo.setSelectable(this.titleNode, false);
        this.inherited("postCreate", arguments);
        dijit.setWaiState(this.containerNode, "labelledby", this.titleNode.id);
        dijit.setWaiState(this.focusNode, "haspopup", "true");
        var _6c0 = this.hideNode, _6c1 = this.wipeNode;
        this._wipeIn = dojo.fx.wipeIn({node: this.wipeNode, duration: this.duration, beforeBegin: function () {
            _6c0.style.display = "";
        }});
        this._wipeOut = dojo.fx.wipeOut({node: this.wipeNode, duration: this.duration, onEnd: function () {
            _6c0.style.display = "none";
        }});
    }, setContent: function (_6c2) {
        if (this._wipeOut.status() == "playing") {
            this.inherited("setContent", arguments);
        } else {
            if (this._wipeIn.status() == "playing") {
                this._wipeIn.stop();
            }
            dojo.marginBox(this.wipeNode, {h: dojo.marginBox(this.wipeNode).h});
            this.inherited("setContent", arguments);
            this._wipeIn.play();
        }
    }, toggle: function () {
        dojo.forEach([this._wipeIn, this._wipeOut], function (_6c3) {
            if (_6c3.status() == "playing") {
                _6c3.stop();
            }
        });
        this[this.open ? "_wipeOut" : "_wipeIn"].play();
        this.open = !this.open;
        this._loadCheck();
        this._setCss();
    }, _setCss: function () {
        var _6c4 = ["dijitClosed", "dijitOpen"];
        var _6c5 = this.open;
        dojo.removeClass(this.focusNode, _6c4[!_6c5 + 0]);
        this.focusNode.className += " " + _6c4[_6c5 + 0];
        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
    }, _onTitleKey: function (e) {
        if (e.keyCode == dojo.keys.ENTER || e.charCode == dojo.keys.SPACE) {
            this.toggle();
        } else {
            if (e.keyCode == dojo.keys.DOWN_ARROW) {
                if (this.open) {
                    this.containerNode.focus();
                    e.preventDefault();
                }
            }
        }
    }, _handleFocus: function (e) {
        dojo[(e.type == "focus" ? "addClass" : "removeClass")](this.focusNode, this.baseClass + "Focused");
    }, setTitle: function (_6c8) {
        this.titleNode.innerHTML = _6c8;
    }});
}
if (!dojo._hasResource["dijit.NewsListTitlePane"]) {
    dojo._hasResource["dijit.NewsListTitlePane"] = true;
    dojo.provide("dijit.NewsListTitlePane");
    dojo.declare("dijit.NewsListTitlePane", [dijit.layout.ContentPane, dijit._Templated], {title: "", subtitle: "", open: true, duration: 250, baseClass: "dijitNewsListTitlePane", templateString: "<div class=\"dijitNewsListTitlePane\">\n\t<div dojoAttachEvent=\"onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus\" tabindex=\"0\"\n\t\t\twaiRole=\"button\" class=\"dijitNewsListTitlePaneTitle\" dojoAttachPoint=\"focusNode\">\n\t\t<div dojoAttachPoint=\"arrowNode\" class=\"dijitInline dijitArrowNode\"><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span></div>\n\t\t<div dojoAttachPoint=\"titleNode\" class=\"dijitNewsListTitlePaneTextNode\"></div><div dojoAttachPoint=\"subtitleNode\" class=\"dijitNewsListTitlePaneTextSubNode\"></div>\n\t</div>\n\t<div class=\"dijitNewsListTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\">\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\">\n\t\t\t<div class=\"dijitNewsListTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" waiRole=\"region\" tabindex=\"-1\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n", postCreate: function () {
        this.setTitle(this.title);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this.setSubtitle(this.subtitle);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this._setCss();
        dojo.setSelectable(this.titleNode, false);
        this.inherited("postCreate", arguments);
        dijit.setWaiState(this.containerNode, "labelledby", this.titleNode.id);
        dijit.setWaiState(this.focusNode, "haspopup", "true");
        var _6c9 = this.hideNode, _6ca = this.wipeNode;
        this._wipeIn = dojo.fx.wipeIn({node: this.wipeNode, duration: this.duration, beforeBegin: function () {
            _6c9.style.display = "";
        }});
        this._wipeOut = dojo.fx.wipeOut({node: this.wipeNode, duration: this.duration, onEnd: function () {
            _6c9.style.display = "none";
        }});
    }, setContent: function (_6cb) {
        if (this._wipeOut.status() == "playing") {
            this.inherited("setContent", arguments);
        } else {
            if (this._wipeIn.status() == "playing") {
                this._wipeIn.stop();
            }
            dojo.marginBox(this.wipeNode, {h: dojo.marginBox(this.wipeNode).h});
            this.inherited("setContent", arguments);
            this._wipeIn.play();
        }
    }, toggle: function () {
        dojo.forEach([this._wipeIn, this._wipeOut], function (_6cc) {
            if (_6cc.status() == "playing") {
                _6cc.stop();
            }
        });
        this[this.open ? "_wipeOut" : "_wipeIn"].play();
        this.open = !this.open;
        this._loadCheck();
        this._setCss();
    }, _setCss: function () {
        var _6cd = ["dijitClosed", "dijitOpen"];
        var _6ce = this.open;
        dojo.removeClass(this.focusNode, _6cd[!_6ce + 0]);
        this.focusNode.className += " " + _6cd[_6ce + 0];
        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
    }, _onTitleKey: function (e) {
        if (e.keyCode == dojo.keys.ENTER || e.charCode == dojo.keys.SPACE) {
            this.toggle();
        } else {
            if (e.keyCode == dojo.keys.DOWN_ARROW) {
                if (this.open) {
                    this.containerNode.focus();
                    e.preventDefault();
                }
            }
        }
    }, _handleFocus: function (e) {
        dojo[(e.type == "focus" ? "addClass" : "removeClass")](this.focusNode, this.baseClass + "Focused");
    }, setTitle: function (_6d1) {
        this.titleNode.innerHTML = _6d1;
    }, setSubtitle: function (_6d2) {
        this.subtitleNode.innerHTML = _6d2;
    }});
}
if (!dojo._hasResource["dijit.smallNewsListTitlePane"]) {
    dojo._hasResource["dijit.smallNewsListTitlePane"] = true;
    dojo.provide("dijit.smallNewsListTitlePane");
    dojo.declare("dijit.smallNewsListTitlePane", [dijit.layout.ContentPane, dijit._Templated], {title: "", subtitle: "", open: true, duration: 250, baseClass: "dijitsmallNewsListTitlePane", templateString: "<div class=\"dijitsmallNewsListTitlePane\">\n\t<div dojoAttachEvent=\"onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus\" tabindex=\"0\"\n\t\t\twaiRole=\"button\" class=\"dijitsmallNewsListTitlePaneTitle\" dojoAttachPoint=\"focusNode\">\n\t\t<div dojoAttachPoint=\"arrowNode\" class=\"dijitInline dijitArrowNode\"><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span></div>\n\t\t<div dojoAttachPoint=\"titleNode\" class=\"dijitsmallNewsListTitlePaneTextNode\"></div><div dojoAttachPoint=\"subtitleNode\" class=\"dijitsmallNewsListTitlePaneTextSubNode\"></div>\n\t</div>\n\t<div class=\"dijitsmallNewsListTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\">\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\">\n\t\t\t<div class=\"dijitsmallNewsListTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" waiRole=\"region\" tabindex=\"-1\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n", postCreate: function () {
        this.setTitle(this.title);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this.setSubtitle(this.subtitle);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this._setCss();
        dojo.setSelectable(this.titleNode, false);
        this.inherited("postCreate", arguments);
        dijit.setWaiState(this.containerNode, "labelledby", this.titleNode.id);
        dijit.setWaiState(this.focusNode, "haspopup", "true");
        var _6d3 = this.hideNode, _6d4 = this.wipeNode;
        this._wipeIn = dojo.fx.wipeIn({node: this.wipeNode, duration: this.duration, beforeBegin: function () {
            _6d3.style.display = "";
        }});
        this._wipeOut = dojo.fx.wipeOut({node: this.wipeNode, duration: this.duration, onEnd: function () {
            _6d3.style.display = "none";
        }});
    }, setContent: function (_6d5) {
        if (this._wipeOut.status() == "playing") {
            this.inherited("setContent", arguments);
        } else {
            if (this._wipeIn.status() == "playing") {
                this._wipeIn.stop();
            }
            dojo.marginBox(this.wipeNode, {h: dojo.marginBox(this.wipeNode).h});
            this.inherited("setContent", arguments);
            this._wipeIn.play();
        }
    }, toggle: function () {
        dojo.forEach([this._wipeIn, this._wipeOut], function (_6d6) {
            if (_6d6.status() == "playing") {
                _6d6.stop();
            }
        });
        this[this.open ? "_wipeOut" : "_wipeIn"].play();
        this.open = !this.open;
        this._loadCheck();
        this._setCss();
    }, _setCss: function () {
        var _6d7 = ["dijitClosed", "dijitOpen"];
        var _6d8 = this.open;
        dojo.removeClass(this.focusNode, _6d7[!_6d8 + 0]);
        this.focusNode.className += " " + _6d7[_6d8 + 0];
        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
    }, _onTitleKey: function (e) {
        if (e.keyCode == dojo.keys.ENTER || e.charCode == dojo.keys.SPACE) {
            this.toggle();
        } else {
            if (e.keyCode == dojo.keys.DOWN_ARROW) {
                if (this.open) {
                    this.containerNode.focus();
                    e.preventDefault();
                }
            }
        }
    }, _handleFocus: function (e) {
        dojo[(e.type == "focus" ? "addClass" : "removeClass")](this.focusNode, this.baseClass + "Focused");
    }, setTitle: function (_6db) {
        this.titleNode.innerHTML = _6db;
    }, setSubtitle: function (_6dc) {
        this.subtitleNode.innerHTML = _6dc;
    }});
}
if (!dojo._hasResource["dijit.ArticleTitlePane"]) {
    dojo._hasResource["dijit.ArticleTitlePane"] = true;
    dojo.provide("dijit.ArticleTitlePane");
    dojo.declare("dijit.ArticleTitlePane", [dijit.layout.ContentPane, dijit._Templated], {title: "", open: true, duration: 250, baseClass: "dijitArticleTitlePane", templateString: "<div class=\"dijitArticleTitlePane\">\n\t<div dojoAttachEvent=\"onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus\" tabindex=\"0\"\n\t\t\twaiRole=\"button\" class=\"dijitArticleTitlePaneTitle\" dojoAttachPoint=\"focusNode\">\n\t\t<div dojoAttachPoint=\"arrowNode\" class=\"dijitInline dijitArrowNode\"><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span></div>\n\t\t<div dojoAttachPoint=\"titleNode\" class=\"dijitArticleTitlePaneTextNode\"></div>\n\t</div>\n\t<div class=\"dijitArticleTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\">\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\">\n\t\t\t<div class=\"dijitArticleTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" waiRole=\"region\" tabindex=\"-1\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n", postCreate: function () {
        this.setTitle(this.title);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this._setCss();
        dojo.setSelectable(this.titleNode, false);
        this.inherited("postCreate", arguments);
        dijit.setWaiState(this.containerNode, "labelledby", this.titleNode.id);
        dijit.setWaiState(this.focusNode, "haspopup", "true");
        var _6dd = this.hideNode, _6de = this.wipeNode;
        this._wipeIn = dojo.fx.wipeIn({node: this.wipeNode, duration: this.duration, beforeBegin: function () {
            _6dd.style.display = "";
        }});
        this._wipeOut = dojo.fx.wipeOut({node: this.wipeNode, duration: this.duration, onEnd: function () {
            _6dd.style.display = "none";
        }});
    }, setContent: function (_6df) {
        if (this._wipeOut.status() == "playing") {
            this.inherited("setContent", arguments);
        } else {
            if (this._wipeIn.status() == "playing") {
                this._wipeIn.stop();
            }
            dojo.marginBox(this.wipeNode, {h: dojo.marginBox(this.wipeNode).h});
            this.inherited("setContent", arguments);
            this._wipeIn.play();
        }
    }, toggle: function () {
        dojo.forEach([this._wipeIn, this._wipeOut], function (_6e0) {
            if (_6e0.status() == "playing") {
                _6e0.stop();
            }
        });
        this[this.open ? "_wipeOut" : "_wipeIn"].play();
        this.open = !this.open;
        this._loadCheck();
        this._setCss();
    }, _setCss: function () {
        var _6e1 = ["dijitClosed", "dijitOpen"];
        var _6e2 = this.open;
        dojo.removeClass(this.focusNode, _6e1[!_6e2 + 0]);
        this.focusNode.className += " " + _6e1[_6e2 + 0];
        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
    }, _onTitleKey: function (e) {
        if (e.keyCode == dojo.keys.ENTER || e.charCode == dojo.keys.SPACE) {
            this.toggle();
        } else {
            if (e.keyCode == dojo.keys.DOWN_ARROW) {
                if (this.open) {
                    this.containerNode.focus();
                    e.preventDefault();
                }
            }
        }
    }, _handleFocus: function (e) {
        dojo[(e.type == "focus" ? "addClass" : "removeClass")](this.focusNode, this.baseClass + "Focused");
    }, setTitle: function (_6e5) {
        this.titleNode.innerHTML = _6e5;
    }});
}
if (!dojo._hasResource["dijit.IOTitlePane"]) {
    dojo._hasResource["dijit.IOTitlePane"] = true;
    dojo.provide("dijit.IOTitlePane");
    dojo.declare("dijit.IOTitlePane", [dijit.layout.ContentPane, dijit._Templated], {title: "", open: true, duration: 250, baseClass: "dijitIOTitlePane", templateString: "<div class=\"dijitTitlePane\">\n\t<div dojoAttachEvent=\"onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus\" tabindex=\"0\"\n\t\t\twaiRole=\"button\" class=\"dijitTitlePaneTitle\" dojoAttachPoint=\"focusNode\">\n\t\t<div dojoAttachPoint=\"arrowNode\" class=\"dijitInline dijitArrowNode\"><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span></div>\n\t\t<div dojoAttachPoint=\"titleNode\" class=\"dijitTitlePaneTextNode\"></div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\">\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" waiRole=\"region\" tabindex=\"-1\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n", postCreate: function () {
        this.setTitle(this.title);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this._setCss();
        dojo.setSelectable(this.titleNode, false);
        this.inherited("postCreate", arguments);
        dijit.setWaiState(this.containerNode, "labelledby", this.titleNode.id);
        dijit.setWaiState(this.focusNode, "haspopup", "true");
        var _6e6 = this.hideNode, _6e7 = this.wipeNode;
        this._wipeIn = dojo.fx.wipeIn({node: this.wipeNode, duration: this.duration, beforeBegin: function () {
            _6e6.style.display = "";
        }});
        this._wipeOut = dojo.fx.wipeOut({node: this.wipeNode, duration: this.duration, onEnd: function () {
            _6e6.style.display = "none";
        }});
    }, setContent: function (_6e8) {
        if (this._wipeOut.status() == "playing") {
            this.inherited("setContent", arguments);
        } else {
            if (this._wipeIn.status() == "playing") {
                this._wipeIn.stop();
            }
            dojo.marginBox(this.wipeNode, {h: dojo.marginBox(this.wipeNode).h});
            this.inherited("setContent", arguments);
            this._wipeIn.play();
        }
    }, toggle: function () {
        if (this.baseClass != "dijitTitlePane") {
            var _6e9 = dojo.query(".dijitTitlePane", this.baseClass);
            for (var i = 0; i < _6e9.length; i++) {
                if (_6e9[i].id == this.id) {
                } else {
                    if (dijit.byId(_6e9[i].id).open) {
                        dijit.byId(_6e9[i].id).toggle();
                    }
                }
            }
        }
        dojo.forEach([this._wipeIn, this._wipeOut], function (_6eb) {
            if (_6eb.status() == "playing") {
                _6eb.stop();
            }
        });
        this[this.open ? "_wipeOut" : "_wipeIn"].play();
        this.open = !this.open;
        this._loadCheck();
        this._setCss();
    }, _setCss: function () {
        var _6ec = ["dijitClosed", "dijitOpen"];
        var _6ed = this.open;
        dojo.removeClass(this.focusNode, _6ec[!_6ed + 0]);
        this.focusNode.className += " " + _6ec[_6ed + 0];
        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
    }, _onTitleKey: function (e) {
        if (e.keyCode == dojo.keys.ENTER || e.charCode == dojo.keys.SPACE) {
            this.toggle();
        } else {
            if (e.keyCode == dojo.keys.DOWN_ARROW) {
                if (this.open) {
                    this.containerNode.focus();
                    e.preventDefault();
                }
            }
        }
    }, _handleFocus: function (e) {
        dojo[(e.type == "focus" ? "addClass" : "removeClass")](this.focusNode, this.baseClass + "Focused");
    }, setTitle: function (_6f0) {
        this.titleNode.innerHTML = _6f0;
    }});
}
if (!dojo._hasResource["dijit.IOTablePane"]) {
    dojo._hasResource["dijit.IOTablePane"] = true;
    dojo.provide("dijit.IOTablePane");
    dojo.declare("dijit.IOTablePane", [dijit.layout.ContentPane, dijit._Templated], {title: "", closeTitle: "", open: false, baseContainer: "dijitIOTablePane", templateString: "<div class=\"details\" style=\"display:block\"><a href=\"javascript:void(0);\" class=\"arrowLink\" dojoAttachEvent=\"onclick:toggle\" tabindex=\"0\" dojoAttachPoint=\"titleNode\">gg</a></div>", postCreate: function () {
        this.setTitle(this.title);
        if (!this.open) {
            var _6f1 = dojo.query("thead", this.baseContainer);
            for (var ii = 0; ii < _6f1.length; ii++) {
                if (ii > 0) {
                    _6f1[ii].style.display = "none";
                }
            }
            var _6f1 = dojo.query("tbody", this.baseContainer);
            for (var ii = 0; ii < _6f1.length; ii++) {
                _6f1[ii].style.display = "none";
            }
        } else {
            this.setTitle(this.closeTitle);
        }
        this.inherited("postCreate", arguments);
    }, toggle: function () {
        var _6f3 = dojo.query("thead", this.baseContainer);
        for (var ii = 0; ii < _6f3.length; ii++) {
            if (ii > 0) {
                if (this.open) {
                    _6f3[ii].style.display = "none";
                } else {
                    _6f3[ii].style.display = "";
                }
            }
        }
        var _6f3 = dojo.query("tbody", this.baseContainer);
        for (var ii = 0; ii < _6f3.length; ii++) {
            if (this.open) {
                _6f3[ii].style.display = "none";
            } else {
                _6f3[ii].style.display = "";
            }
        }
        if (this.open) {
            this.setTitle(this.title);
        } else {
            this.setTitle(this.closeTitle);
        }
        this.open = !this.open;
        return false;
    }, closeAll: function () {
        var _6f5 = dijit.registry._hash;
        for (var i in _6f5) {
            if (_6f5[i].declaredClass === "dijit.IOTablePane") {
                if (_6f5[i].open) {
                    var _6f7 = dojo.query("thead", _6f5[i].baseContainer);
                    for (var ii = 0; ii < _6f7.length; ii++) {
                        if (ii > 0) {
                            _6f7[ii].style.display = "none";
                        }
                    }
                    var _6f7 = dojo.query("tbody", _6f5[i].baseContainer);
                    for (var ii = 0; ii < _6f7.length; ii++) {
                        _6f7[ii].style.display = "none";
                    }
                    _6f5[i].setTitle(_6f5[i].title);
                    _6f5[i].open = !_6f5[i].open;
                }
            }
        }
    }, showAll: function () {
        var _6f9 = dijit.registry._hash;
        for (var i in _6f9) {
            if (_6f9[i].declaredClass === "dijit.IOTablePane") {
                if (!_6f9[i].open) {
                    var _6fb = dojo.query("thead", _6f9[i].baseContainer);
                    for (var ii = 0; ii < _6fb.length; ii++) {
                        if (ii > 0) {
                            _6fb[ii].style.display = "";
                        }
                    }
                    var _6fb = dojo.query("tbody", _6f9[i].baseContainer);
                    for (var ii = 0; ii < _6fb.length; ii++) {
                        _6fb[ii].style.display = "";
                    }
                    _6f9[i].setTitle(_6f9[i].closeTitle);
                    _6f9[i].open = !_6f9[i].open;
                }
            }
        }
    }, setTitle: function (_6fd) {
        this.titleNode.innerHTML = _6fd;
    }});
}
if (!dojo._hasResource["dojo.dnd.common"]) {
    dojo._hasResource["dojo.dnd.common"] = true;
    dojo.provide("dojo.dnd.common");
    dojo.dnd._copyKey = navigator.appVersion.indexOf("Macintosh") < 0 ? "ctrlKey" : "metaKey";
    dojo.dnd.getCopyKeyState = function (e) {
        return e[dojo.dnd._copyKey];
    };
    dojo.dnd._uniqueId = 0;
    dojo.dnd.getUniqueId = function () {
        var id;
        do {
            id = "dojoUnique" + (++dojo.dnd._uniqueId);
        } while (dojo.byId(id));
        return id;
    };
    dojo.dnd._empty = {};
    dojo.dnd.isFormElement = function (e) {
        var t = e.target;
        if (t.nodeType == 3) {
            t = t.parentNode;
        }
        return " button textarea input select option ".indexOf(" " + t.tagName.toLowerCase() + " ") >= 0;
    };
}
if (!dojo._hasResource["dojo.dnd.autoscroll"]) {
    dojo._hasResource["dojo.dnd.autoscroll"] = true;
    dojo.provide("dojo.dnd.autoscroll");
    dojo.dnd.getViewport = function () {
        var d = dojo.doc, dd = d.documentElement, w = window, b = dojo.body();
        if (dojo.isMozilla) {
            return {w: dd.clientWidth, h: w.innerHeight};
        } else {
            if (!dojo.isOpera && w.innerWidth) {
                return {w: w.innerWidth, h: w.innerHeight};
            } else {
                if (!dojo.isOpera && dd && dd.clientWidth) {
                    return {w: dd.clientWidth, h: dd.clientHeight};
                } else {
                    if (b.clientWidth) {
                        return {w: b.clientWidth, h: b.clientHeight};
                    }
                }
            }
        }
        return null;
    };
    dojo.dnd.V_TRIGGER_AUTOSCROLL = 32;
    dojo.dnd.H_TRIGGER_AUTOSCROLL = 32;
    dojo.dnd.V_AUTOSCROLL_VALUE = 16;
    dojo.dnd.H_AUTOSCROLL_VALUE = 16;
    dojo.dnd.autoScroll = function (e) {
        var v = dojo.dnd.getViewport(), dx = 0, dy = 0;
        if (e.clientX < dojo.dnd.H_TRIGGER_AUTOSCROLL) {
            dx = -dojo.dnd.H_AUTOSCROLL_VALUE;
        } else {
            if (e.clientX > v.w - dojo.dnd.H_TRIGGER_AUTOSCROLL) {
                dx = dojo.dnd.H_AUTOSCROLL_VALUE;
            }
        }
        if (e.clientY < dojo.dnd.V_TRIGGER_AUTOSCROLL) {
            dy = -dojo.dnd.V_AUTOSCROLL_VALUE;
        } else {
            if (e.clientY > v.h - dojo.dnd.V_TRIGGER_AUTOSCROLL) {
                dy = dojo.dnd.V_AUTOSCROLL_VALUE;
            }
        }
        window.scrollBy(dx, dy);
    };
    dojo.dnd._validNodes = {"div": 1, "p": 1, "td": 1};
    dojo.dnd._validOverflow = {"auto": 1, "scroll": 1};
    dojo.dnd.autoScrollNodes = function (e) {
        for (var n = e.target; n;) {
            if (n.nodeType == 1 && (n.tagName.toLowerCase() in dojo.dnd._validNodes)) {
                var s = dojo.getComputedStyle(n);
                if (s.overflow.toLowerCase() in dojo.dnd._validOverflow) {
                    var b = dojo._getContentBox(n, s), t = dojo._abs(n, true);
                    b.l += t.x + n.scrollLeft;
                    b.t += t.y + n.scrollTop;
                    var w = Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL, b.w / 2), h = Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL, b.h / 2), rx = e.pageX - b.l, ry = e.pageY - b.t, dx = 0, dy = 0;
                    if (rx > 0 && rx < b.w) {
                        if (rx < w) {
                            dx = -dojo.dnd.H_AUTOSCROLL_VALUE;
                        } else {
                            if (rx > b.w - w) {
                                dx = dojo.dnd.H_AUTOSCROLL_VALUE;
                            }
                        }
                    }
                    if (ry > 0 && ry < b.h) {
                        if (ry < h) {
                            dy = -dojo.dnd.V_AUTOSCROLL_VALUE;
                        } else {
                            if (ry > b.h - h) {
                                dy = dojo.dnd.V_AUTOSCROLL_VALUE;
                            }
                        }
                    }
                    var _715 = n.scrollLeft, _716 = n.scrollTop;
                    n.scrollLeft = n.scrollLeft + dx;
                    n.scrollTop = n.scrollTop + dy;
                    if (_715 != n.scrollLeft || _716 != n.scrollTop) {
                        return;
                    }
                }
            }
            try {
                n = n.parentNode;
            } catch (x) {
                n = null;
            }
        }
        dojo.dnd.autoScroll(e);
    };
}
if (!dojo._hasResource["dojo.dnd.Mover"]) {
    dojo._hasResource["dojo.dnd.Mover"] = true;
    dojo.provide("dojo.dnd.Mover");
    dojo.declare("dojo.dnd.Mover", null, {constructor: function (node, e, host) {
        this.node = dojo.byId(node);
        this.marginBox = {l: e.pageX, t: e.pageY};
        this.mouseButton = e.button;
        var h = this.host = host, d = node.ownerDocument, _71c = dojo.connect(d, "onmousemove", this, "onFirstMove");
        this.events = [dojo.connect(d, "onmousemove", this, "onMouseMove"), dojo.connect(d, "onmouseup", this, "onMouseUp"), dojo.connect(d, "ondragstart", dojo, "stopEvent"), dojo.connect(d, "onselectstart", dojo, "stopEvent"), _71c];
        if (h && h.onMoveStart) {
            h.onMoveStart(this);
        }
    }, onMouseMove: function (e) {
        dojo.dnd.autoScroll(e);
        var m = this.marginBox;
        this.host.onMove(this, {l: m.l + e.pageX, t: m.t + e.pageY});
    }, onMouseUp: function (e) {
        if (this.mouseButton == e.button) {
            this.destroy();
        }
    }, onFirstMove: function () {
        this.node.style.position = "absolute";
        var m = dojo.marginBox(this.node);
        m.l -= this.marginBox.l;
        m.t -= this.marginBox.t;
        this.marginBox = m;
        this.host.onFirstMove(this);
        dojo.disconnect(this.events.pop());
    }, destroy: function () {
        dojo.forEach(this.events, dojo.disconnect);
        var h = this.host;
        if (h && h.onMoveStop) {
            h.onMoveStop(this);
        }
        this.events = this.node = null;
    }});
}
if (!dojo._hasResource["dojo.dnd.Moveable"]) {
    dojo._hasResource["dojo.dnd.Moveable"] = true;
    dojo.provide("dojo.dnd.Moveable");
    dojo.declare("dojo.dnd.Moveable", null, {handle: "", delay: 0, skip: false, constructor: function (node, _723) {
        this.node = dojo.byId(node);
        if (!_723) {
            _723 = {};
        }
        this.handle = _723.handle ? dojo.byId(_723.handle) : null;
        if (!this.handle) {
            this.handle = this.node;
        }
        this.delay = _723.delay > 0 ? _723.delay : 0;
        this.skip = _723.skip;
        this.mover = _723.mover ? _723.mover : dojo.dnd.Mover;
        this.events = [dojo.connect(this.handle, "onmousedown", this, "onMouseDown"), dojo.connect(this.handle, "ondragstart", this, "onSelectStart"), dojo.connect(this.handle, "onselectstart", this, "onSelectStart")];
    }, markupFactory: function (_724, node) {
        return new dojo.dnd.Moveable(node, _724);
    }, destroy: function () {
        dojo.forEach(this.events, dojo.disconnect);
        this.events = this.node = this.handle = null;
    }, onMouseDown: function (e) {
        if (this.skip && dojo.dnd.isFormElement(e)) {
            return;
        }
        if (this.delay) {
            this.events.push(dojo.connect(this.handle, "onmousemove", this, "onMouseMove"));
            this.events.push(dojo.connect(this.handle, "onmouseup", this, "onMouseUp"));
            this._lastX = e.pageX;
            this._lastY = e.pageY;
        } else {
            new this.mover(this.node, e, this);
        }
        dojo.stopEvent(e);
    }, onMouseMove: function (e) {
        if (Math.abs(e.pageX - this._lastX) > this.delay || Math.abs(e.pageY - this._lastY) > this.delay) {
            this.onMouseUp(e);
            new this.mover(this.node, e, this);
        }
        dojo.stopEvent(e);
    }, onMouseUp: function (e) {
        dojo.disconnect(this.events.pop());
        dojo.disconnect(this.events.pop());
    }, onSelectStart: function (e) {
        if (!this.skip || !dojo.dnd.isFormElement(e)) {
            dojo.stopEvent(e);
        }
    }, onMoveStart: function (_72a) {
        dojo.publish("/dnd/move/start", [_72a]);
        dojo.addClass(dojo.body(), "dojoMove");
        dojo.addClass(this.node, "dojoMoveItem");
    }, onMoveStop: function (_72b) {
        dojo.publish("/dnd/move/stop", [_72b]);
        dojo.removeClass(dojo.body(), "dojoMove");
        dojo.removeClass(this.node, "dojoMoveItem");
    }, onFirstMove: function (_72c) {
    }, onMove: function (_72d, _72e) {
        this.onMoving(_72d, _72e);
        dojo.marginBox(_72d.node, _72e);
        this.onMoved(_72d, _72e);
    }, onMoving: function (_72f, _730) {
    }, onMoved: function (_731, _732) {
    }});
}
if (!dojo._hasResource["dojo.dnd.move"]) {
    dojo._hasResource["dojo.dnd.move"] = true;
    dojo.provide("dojo.dnd.move");
    dojo.declare("dojo.dnd.move.constrainedMoveable", dojo.dnd.Moveable, {constraints: function () {
    }, within: false, markupFactory: function (_733, node) {
        return new dojo.dnd.move.constrainedMoveable(node, _733);
    }, constructor: function (node, _736) {
        if (!_736) {
            _736 = {};
        }
        this.constraints = _736.constraints;
        this.within = _736.within;
    }, onFirstMove: function (_737) {
        var c = this.constraintBox = this.constraints.call(this, _737), m = _737.marginBox;
        c.r = c.l + c.w - (this.within ? m.w : 0);
        c.b = c.t + c.h - (this.within ? m.h : 0);
    }, onMove: function (_73a, _73b) {
        var c = this.constraintBox;
        _73b.l = _73b.l < c.l ? c.l : c.r < _73b.l ? c.r : _73b.l;
        _73b.t = _73b.t < c.t ? c.t : c.b < _73b.t ? c.b : _73b.t;
        dojo.marginBox(_73a.node, _73b);
    }});
    dojo.declare("dojo.dnd.move.boxConstrainedMoveable", dojo.dnd.move.constrainedMoveable, {box: {}, markupFactory: function (_73d, node) {
        return new dojo.dnd.move.boxConstrainedMoveable(node, _73d);
    }, constructor: function (node, _740) {
        var box = _740 && _740.box;
        this.constraints = function () {
            return box;
        };
    }});
    dojo.declare("dojo.dnd.move.parentConstrainedMoveable", dojo.dnd.move.constrainedMoveable, {area: "content", markupFactory: function (_742, node) {
        return new dojo.dnd.move.parentConstrainedMoveable(node, _742);
    }, constructor: function (node, _745) {
        var area = _745 && _745.area;
        this.constraints = function () {
            var n = this.node.parentNode, s = dojo.getComputedStyle(n), mb = dojo._getMarginBox(n, s);
            if (area == "margin") {
                return mb;
            }
            var t = dojo._getMarginExtents(n, s);
            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
            if (area == "border") {
                return mb;
            }
            t = dojo._getBorderExtents(n, s);
            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
            if (area == "padding") {
                return mb;
            }
            t = dojo._getPadExtents(n, s);
            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
            return mb;
        };
    }});
    dojo.dnd.move.constrainedMover = function (fun, _74c) {
        var _74d = function (node, e, _750) {
            dojo.dnd.Mover.call(this, node, e, _750);
        };
        dojo.extend(_74d, dojo.dnd.Mover.prototype);
        dojo.extend(_74d, {onMouseMove: function (e) {
            dojo.dnd.autoScroll(e);
            var m = this.marginBox, c = this.constraintBox, l = m.l + e.pageX, t = m.t + e.pageY;
            l = l < c.l ? c.l : c.r < l ? c.r : l;
            t = t < c.t ? c.t : c.b < t ? c.b : t;
            this.host.onMove(this, {l: l, t: t});
        }, onFirstMove: function () {
            dojo.dnd.Mover.prototype.onFirstMove.call(this);
            var c = this.constraintBox = fun.call(this), m = this.marginBox;
            c.r = c.l + c.w - (_74c ? m.w : 0);
            c.b = c.t + c.h - (_74c ? m.h : 0);
        }});
        return _74d;
    };
    dojo.dnd.move.boxConstrainedMover = function (box, _759) {
        return dojo.dnd.move.constrainedMover(function () {
            return box;
        }, _759);
    };
    dojo.dnd.move.parentConstrainedMover = function (area, _75b) {
        var fun = function () {
            var n = this.node.parentNode, s = dojo.getComputedStyle(n), mb = dojo._getMarginBox(n, s);
            if (area == "margin") {
                return mb;
            }
            var t = dojo._getMarginExtents(n, s);
            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
            if (area == "border") {
                return mb;
            }
            t = dojo._getBorderExtents(n, s);
            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
            if (area == "padding") {
                return mb;
            }
            t = dojo._getPadExtents(n, s);
            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
            return mb;
        };
        return dojo.dnd.move.constrainedMover(fun, _75b);
    };
    dojo.dnd.constrainedMover = dojo.dnd.move.constrainedMover;
    dojo.dnd.boxConstrainedMover = dojo.dnd.move.boxConstrainedMover;
    dojo.dnd.parentConstrainedMover = dojo.dnd.move.parentConstrainedMover;
}
if (!dojo._hasResource["dijit.IODialog"]) {
    dojo._hasResource["dijit.IODialog"] = true;
    dojo.provide("dijit.IODialog");
    dojo.declare("dijit.DialogUnderlay", [dijit._Widget, dijit.layout.ContentPane, dijit._Templated], {closeTitle: "", parentId: "", templateString: "<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><a class=\"lb_close\" href=\"javascript:void(0);\" onclick=\"dijit.byId('${parentId}').hide();\">${closeTitle}</a><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>", postCreate: function () {
        dojo.body().appendChild(this.domNode);
        this.bgIframe = new dijit.BackgroundIframe(this.domNode);
    }, layout: function () {
        var _761 = dijit.getViewport();
        var is = this.node.style, os = this.domNode.style;
        os.top = _761.t + "px";
        os.left = _761.l + "px";
        is.width = _761.w + "px";
        is.height = _761.h + "px";
        var _764 = dijit.getViewport();
        if (_761.w != _764.w) {
            is.width = _764.w + "px";
        }
        if (_761.h != _764.h) {
            is.height = _764.h + "px";
        }
    }, show: function () {
        this.domNode.style.display = "block";
        this.layout();
        if (this.bgIframe.iframe) {
            this.bgIframe.iframe.style.display = "block";
        }
        this._resizeHandler = this.connect(window, "onresize", "layout");
    }, hide: function () {
        this.domNode.style.display = "none";
        if (this.bgIframe.iframe) {
            this.bgIframe.iframe.style.display = "none";
        }
        this.disconnect(this._resizeHandler);
    }, uninitialize: function () {
        if (this.bgIframe) {
            this.bgIframe.destroy();
        }
    }});
    dojo.declare("dijit.IODialog", [dijit.layout.ContentPane, dijit._Templated], {templateString: null, templateString: "<div class=\"dijitDialog\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\" tabindex=\"0\" waiRole=\"dialog\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\">${title}</span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"onclick: hide\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\">x</span>\n\t</span>\n\t</div>\n\t\t<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n\t<span dojoAttachPoint=\"tabEnd\" dojoAttachEvent=\"onfocus:_cycleFocus\" tabindex=\"0\"></span>\n</div>\n", closeTitle: "", open: false, duration: 1, _lastFocusItem: null, attributeMap: dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap), {title: "titleBar"}), postCreate: function () {
        dojo.body().appendChild(this.domNode);
        this.inherited("postCreate", arguments);
        this.domNode.style.display = "none";
        this.connect(this, "onExecute", "hide");
        this.connect(this, "onCancel", "hide");
    }, onLoad: function () {
        this._position();
        this.inherited("onLoad", arguments);
    }, _setup: function () {
        this._modalconnects = [];
        if (this.titleBar) {
            this._moveable = new dojo.dnd.Moveable(this.domNode, {handle: this.titleBar});
        }
        this._underlay = new dijit.DialogUnderlay({closeTitle: this.closeTitle, parentId: this.id});
        var node = this.domNode;
        this._fadeIn = dojo.fx.combine([dojo.fadeIn({node: node, duration: this.duration}), dojo.fadeIn({node: this._underlay.domNode, duration: this.duration, onBegin: dojo.hitch(this._underlay, "show")})]);
        this._fadeOut = dojo.fx.combine([dojo.fadeOut({node: node, duration: this.duration, onEnd: function () {
            node.style.display = "none";
        }}), dojo.fadeOut({node: this._underlay.domNode, duration: this.duration, onEnd: dojo.hitch(this._underlay, "hide")})]);
    }, uninitialize: function () {
        if (this._underlay) {
            this._underlay.destroy();
        }
    }, _position: function () {
        if (dojo.hasClass(dojo.body(), "dojoMove")) {
            return;
        }
        var _766 = dijit.getViewport();
        var mb = dojo.marginBox(this.domNode);
        var _768 = this.domNode.style;
        _768.left = Math.floor((_766.l + (_766.w - mb.w) / 2)) + "px";
        _768.top = Math.floor((_766.t + (_766.h - mb.h) / 2)) + "px";
    }, _findLastFocus: function (evt) {
        this._lastFocused = evt.target;
    }, _cycleFocus: function (evt) {
        if (!this._lastFocusItem) {
            this._lastFocusItem = this._lastFocused;
        }
        this.titleBar.focus();
    }, _onKey: function (evt) {
        if (evt.keyCode) {
            var node = evt.target;
            if (node == this.titleBar && evt.shiftKey && evt.keyCode == dojo.keys.TAB) {
                if (this._lastFocusItem) {
                    this._lastFocusItem.focus();
                }
                dojo.stopEvent(evt);
            } else {
                while (node) {
                    if (node == this.domNode) {
                        if (evt.keyCode == dojo.keys.ESCAPE) {
                            this.hide();
                        } else {
                            return;
                        }
                    }
                    node = node.parentNode;
                }
                if (evt.keyCode != dojo.keys.TAB) {
                    dojo.stopEvent(evt);
                } else {
                    if (!dojo.isOpera) {
                        try {
                            this.titleBar.focus();
                        } catch (e) {
                        }
                    }
                }
            }
        }
    }, show: function () {
        if (!this._alreadyInitialized) {
            this._setup();
            this._alreadyInitialized = true;
        }
        if (this._fadeOut.status() == "playing") {
            this._fadeOut.stop();
        }
        this._modalconnects.push(dojo.connect(window, "onscroll", this, "layout"));
        this._modalconnects.push(dojo.connect(document.documentElement, "onkeypress", this, "_onKey"));
        var ev = typeof (document.ondeactivate) == "object" ? "ondeactivate" : "onblur";
        this._modalconnects.push(dojo.connect(this.containerNode, ev, this, "_findLastFocus"));
        dojo.style(this.domNode, "opacity", 0);
        this.domNode.style.display = "block";
        this.open = true;
        this._loadCheck();
        this._position();
        this._fadeIn.play();
        this._savedFocus = dijit.getFocus(this);
        this._resizeHandler = this.connect(window, "onresize", "_position");
        setTimeout(dojo.hitch(this, function () {
            dijit.focus(this.titleBar);
        }), 50);
    }, hide: function () {
        if (!this._alreadyInitialized) {
            return;
        }
        if (this._fadeIn.status() == "playing") {
            this._fadeIn.stop();
        }
        this._fadeOut.play();
        if (this._scrollConnected) {
            this._scrollConnected = false;
        }
        dojo.forEach(this._modalconnects, dojo.disconnect);
        this._modalconnects = [];
        this.connect(this._fadeOut, "onEnd", dojo.hitch(this, function () {
            dijit.focus(this._savedFocus);
        }));
        this.open = false;
    }, layout: function () {
        if (this.domNode.style.display == "block") {
            this._underlay.layout();
            this._position();
        }
    }});
    dojo.declare("dijit.TooltipDialog", [dijit.layout.ContentPane, dijit._Templated], {title: "", _lastFocusItem: null, templateString: null, templateString: "<div class=\"dijitTooltipDialog\" >\n\t<div class=\"dijitTooltipContainer\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" dojoAttachPoint=\"containerNode\" tabindex=\"0\" waiRole=\"dialog\"></div>\n\t</div>\n\t<span dojoAttachPoint=\"tabEnd\" tabindex=\"0\" dojoAttachEvent=\"focus:_cycleFocus\"></span>\n\t<div class=\"dijitTooltipConnector\" ></div>\n</div>\n", postCreate: function () {
        this.inherited("postCreate", arguments);
        this.connect(this.containerNode, "onkeypress", "_onKey");
        var ev = typeof (document.ondeactivate) == "object" ? "ondeactivate" : "onblur";
        this.connect(this.containerNode, ev, "_findLastFocus");
        this.containerNode.title = this.title;
    }, orient: function (_76f) {
        this.domNode.className = "dijitTooltipDialog " + " dijitTooltipAB" + (_76f.charAt(1) == "L" ? "Left" : "Right") + " dijitTooltip" + (_76f.charAt(0) == "T" ? "Below" : "Above");
    }, onOpen: function (pos) {
        this.orient(pos.corner);
        this._loadCheck();
        this.containerNode.focus();
    }, _onKey: function (evt) {
        if (evt.keyCode == dojo.keys.ESCAPE) {
            this.onCancel();
        } else {
            if (evt.target == this.containerNode && evt.shiftKey && evt.keyCode == dojo.keys.TAB) {
                if (this._lastFocusItem) {
                    this._lastFocusItem.focus();
                }
                dojo.stopEvent(evt);
            } else {
                if (evt.keyCode == dojo.keys.TAB) {
                    evt.stopPropagation();
                }
            }
        }
    }, _findLastFocus: function (evt) {
        this._lastFocused = evt.target;
    }, _cycleFocus: function (evt) {
        if (!this._lastFocusItem) {
            this._lastFocusItem = this._lastFocused;
        }
        this.containerNode.focus();
    }});
}
if (!dojo._hasResource["dijit.TitlePane"]) {
    dojo._hasResource["dijit.TitlePane"] = true;
    dojo.provide("dijit.TitlePane");
    dojo.declare("dijit.TitlePane", [dijit.layout.ContentPane, dijit._Templated], {title: "", open: true, duration: 250, baseClass: "dijitTitlePane", templateString: "<div class=\"dijitTitlePane\">\r\n\t<div dojoAttachEvent=\"onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus\" tabindex=\"0\"\r\n\t\t\twaiRole=\"button\" class=\"dijitTitlePaneTitle\" dojoAttachPoint=\"focusNode\">\r\n\t\t<div dojoAttachPoint=\"arrowNode\" class=\"dijitInline dijitArrowNode\"><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span></div>\r\n\t\t<div dojoAttachPoint=\"titleNode\" class=\"dijitTitlePaneTextNode\"></div>\r\n\t</div>\r\n\t<div class=\"dijitTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\">\r\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\">\r\n\t\t\t<div class=\"dijitTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" waiRole=\"region\" tabindex=\"-1\">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n", postCreate: function () {
        this.setTitle(this.title);
        if (!this.open) {
            this.hideNode.style.display = this.wipeNode.style.display = "none";
        }
        this._setCss();
        dojo.setSelectable(this.titleNode, false);
        this.inherited("postCreate", arguments);
        dijit.setWaiState(this.containerNode, "labelledby", this.titleNode.id);
        dijit.setWaiState(this.focusNode, "haspopup", "true");
        var _774 = this.hideNode, _775 = this.wipeNode;
        this._wipeIn = dojo.fx.wipeIn({node: this.wipeNode, duration: this.duration, beforeBegin: function () {
            _774.style.display = "";
        }});
        this._wipeOut = dojo.fx.wipeOut({node: this.wipeNode, duration: this.duration, onEnd: function () {
            _774.style.display = "none";
        }});
    }, setContent: function (_776) {
        if (this._wipeOut.status() == "playing") {
            this.inherited("setContent", arguments);
        } else {
            if (this._wipeIn.status() == "playing") {
                this._wipeIn.stop();
            }
            dojo.marginBox(this.wipeNode, {h: dojo.marginBox(this.wipeNode).h});
            this.inherited("setContent", arguments);
            this._wipeIn.play();
        }
    }, toggle: function () {
        dojo.forEach([this._wipeIn, this._wipeOut], function (_777) {
            if (_777.status() == "playing") {
                _777.stop();
            }
        });
        this[this.open ? "_wipeOut" : "_wipeIn"].play();
        this.open = !this.open;
        this._loadCheck();
        this._setCss();
    }, _setCss: function () {
        var _778 = ["dijitClosed", "dijitOpen"];
        var _779 = this.open;
        dojo.removeClass(this.focusNode, _778[!_779 + 0]);
        this.focusNode.className += " " + _778[_779 + 0];
        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
    }, _onTitleKey: function (e) {
        if (e.keyCode == dojo.keys.ENTER || e.charCode == dojo.keys.SPACE) {
            this.toggle();
        } else {
            if (e.keyCode == dojo.keys.DOWN_ARROW) {
                if (this.open) {
                    this.containerNode.focus();
                    e.preventDefault();
                }
            }
        }
    }, _handleFocus: function (e) {
        dojo[(e.type == "focus" ? "addClass" : "removeClass")](this.focusNode, this.baseClass + "Focused");
    }, setTitle: function (_77c) {
        this.titleNode.innerHTML = _77c;
    }});
}
if (!dojo._hasResource["dijit.form._FormWidget"]) {
    dojo._hasResource["dijit.form._FormWidget"] = true;
    dojo.provide("dijit.form._FormWidget");
    dojo.declare("dijit.form._FormWidget", [dijit._Widget, dijit._Templated], {baseClass: "", value: "", name: "", id: "", alt: "", type: "text", tabIndex: "0", disabled: false, intermediateChanges: false, attributeMap: dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap), {id: "focusNode", tabIndex: "focusNode", alt: "focusNode"}), setDisabled: function (_77d) {
        this.domNode.disabled = this.disabled = _77d;
        if (this.focusNode) {
            this.focusNode.disabled = _77d;
        }
        if (_77d) {
            this._hovering = false;
            this._active = false;
        }
        dijit.setWaiState(this.focusNode || this.domNode, "disabled", _77d);
        this._setStateClass();
    }, _onMouse: function (_77e) {
        var _77f = _77e.target;
        if (_77f && _77f.getAttribute) {
            this.stateModifier = _77f.getAttribute("stateModifier") || "";
        }
        if (!this.disabled) {
            switch (_77e.type) {
                case "mouseenter":
                case "mouseover":
                    this._hovering = true;
                    break;
                case "mouseout":
                case "mouseleave":
                    this._hovering = false;
                    break;
                case "mousedown":
                    this._active = true;
                    var self = this;
                    var _781 = this.connect(dojo.body(), "onmouseup", function () {
                        self._active = false;
                        self._setStateClass();
                        self.disconnect(_781);
                    });
                    break;
            }
            this._setStateClass();
        }
    }, isFocusable: function () {
        return !this.disabled && (dojo.style(this.domNode, "display") != "none");
    }, focus: function () {
        dijit.focus(this.focusNode);
    }, _setStateClass: function () {
        if (!("staticClass" in this)) {
            this.staticClass = (this.stateNode || this.domNode).className;
        }
        var _782 = [this.baseClass];

        function multiply(_783) {
            _782 = _782.concat(dojo.map(_782, function (c) {
                return c + _783;
            }));
        };
        if (this.checked) {
            multiply("Checked");
        }
        if (this.state) {
            multiply(this.state);
        }
        if (this.selected) {
            multiply("Selected");
        }
        if (this.disabled) {
            multiply("Disabled");
        } else {
            if (this._active) {
                multiply(this.stateModifier + "Active");
            } else {
                if (this._focused) {
                    multiply("Focused");
                }
                if ((this.stateModifier || !this._focused) && this._hovering) {
                    multiply(this.stateModifier + "Hover");
                }
            }
        }
        (this.stateNode || this.domNode).className = this.staticClass + " " + _782.join(" ");
    }, onChange: function (_785) {
    }, postCreate: function () {
        this.setValue(this.value, null);
        this.setDisabled(this.disabled);
        this._setStateClass();
    }, setValue: function (_786, _787) {
        this._lastValue = _786;
        dijit.setWaiState(this.focusNode || this.domNode, "valuenow", this.forWaiValuenow());
        if (_787 === undefined) {
            _787 = true;
        }
        if (this._lastValueReported == undefined && _787 === null) {
            this._lastValueReported = _786;
        }
        if ((this.intermediateChanges || _787) && ((_786 && _786.toString) ? _786.toString() : _786) !== ((this._lastValueReported && this._lastValueReported.toString) ? this._lastValueReported.toString() : this._lastValueReported)) {
            this._lastValueReported = _786;
            this.onChange(_786);
        }
    }, getValue: function () {
        return this._lastValue;
    }, undo: function () {
        this.setValue(this._lastValueReported, false);
    }, _onKeyPress: function (e) {
        if (e.keyCode == dojo.keys.ESCAPE && !e.shiftKey && !e.ctrlKey && !e.altKey) {
            var v = this.getValue();
            var lv = this._lastValueReported;
            if ((typeof lv != "undefined") && ((v !== null && v.toString) ? v.toString() : null) !== lv.toString()) {
                this.undo();
                dojo.stopEvent(e);
                return false;
            }
        }
        return true;
    }, forWaiValuenow: function () {
        return this.getValue();
    }});
}
if (!dojo._hasResource["dijit.form.Button"]) {
    dojo._hasResource["dijit.form.Button"] = true;
    dojo.provide("dijit.form.Button");
    dojo.declare("dijit.form.Button", dijit.form._FormWidget, {label: "", showLabel: true, iconClass: "", type: "button", baseClass: "dijitButton", templateString: "<div class=\"dijit dijitLeft dijitInline dijitButton\"\r\n\tdojoAttachEvent=\"onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\"\r\n\t><div class='dijitRight'\r\n\t\t><button class=\"dijitStretch dijitButtonNode dijitButtonContents\" dojoAttachPoint=\"focusNode,titleNode\"\r\n\t\t\ttype=\"${type}\" waiRole=\"button\" waiState=\"labelledby-${id}_label\"\r\n\t\t\t><span class=\"dijitInline ${iconClass}\" dojoAttachPoint=\"iconNode\" \r\n \t\t\t\t><span class=\"dijitToggleButtonIconChar\">&#10003</span \r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\">${label}</span\r\n\t\t></button\r\n\t></div\r\n></div>\r\n", _onClick: function (e) {
        if (this.disabled) {
            return false;
        }
        this._clicked();
        return this.onClick(e);
    }, _onButtonClick: function (e) {
        dojo.stopEvent(e);
        var _78d = this._onClick(e) !== false;
        if (this.type == "submit" && _78d) {
            for (var node = this.domNode; node; node = node.parentNode) {
                var _78f = dijit.byNode(node);
                if (_78f && _78f._onSubmit) {
                    _78f._onSubmit(e);
                    break;
                }
                if (node.tagName.toLowerCase() == "form") {
                    if (!node.onsubmit || node.onsubmit()) {
                        node.submit();
                    }
                    break;
                }
            }
        }
    }, postCreate: function () {
        if (this.showLabel == false) {
            var _790 = "";
            this.label = this.containerNode.innerHTML;
            _790 = dojo.trim(this.containerNode.innerText || this.containerNode.textContent);
            this.titleNode.title = _790;
            dojo.addClass(this.containerNode, "dijitDisplayNone");
        }
        this.inherited(arguments);
    }, onClick: function (e) {
        return true;
    }, _clicked: function (e) {
    }, setLabel: function (_793) {
        this.containerNode.innerHTML = this.label = _793;
        if (dojo.isMozilla) {
            var _794 = dojo.getComputedStyle(this.domNode).display;
            this.domNode.style.display = "none";
            var _795 = this;
            setTimeout(function () {
                _795.domNode.style.display = _794;
            }, 1);
        }
        if (this.showLabel == false) {
            this.titleNode.title = dojo.trim(this.containerNode.innerText || this.containerNode.textContent);
        }
    }});
    dojo.declare("dijit.form.DropDownButton", [dijit.form.Button, dijit._Container], {baseClass: "dijitDropDownButton", templateString: "<div class=\"dijit dijitLeft dijitInline\"\r\n\tdojoAttachEvent=\"onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey\"\r\n\t><div class='dijitRight'>\r\n\t<button class=\"dijitStretch dijitButtonNode dijitButtonContents\" type=\"${type}\"\r\n\t\tdojoAttachPoint=\"focusNode,titleNode\" waiRole=\"button\" waiState=\"haspopup-true,labelledby-${id}_label\"\r\n\t\t><div class=\"dijitInline ${iconClass}\" dojoAttachPoint=\"iconNode\"></div\r\n\t\t><span class=\"dijitButtonText\" \tdojoAttachPoint=\"containerNode,popupStateNode\"\r\n\t\tid=\"${id}_label\">${label}</span\r\n\t\t><span class='dijitA11yDownArrow'>&#9660;</span>\r\n\t</button>\r\n</div></div>\r\n", _fillContent: function () {
        if (this.srcNodeRef) {
            var _796 = dojo.query("*", this.srcNodeRef);
            dijit.form.DropDownButton.superclass._fillContent.call(this, _796[0]);
            this.dropDownContainer = this.srcNodeRef;
        }
    }, startup: function () {
        if (!this.dropDown) {
            var _797 = dojo.query("[widgetId]", this.dropDownContainer)[0];
            this.dropDown = dijit.byNode(_797);
            delete this.dropDownContainer;
        }
        dojo.body().appendChild(this.dropDown.domNode);
        this.dropDown.domNode.style.display = "none";
    }, _onArrowClick: function (e) {
        if (this.disabled) {
            return;
        }
        this._toggleDropDown();
    }, _onDropDownClick: function (e) {
        var _79a = dojo.isFF && dojo.isFF < 3 && navigator.appVersion.indexOf("Macintosh") != -1;
        if (!_79a || e.detail != 0 || this._seenKeydown) {
            this._onArrowClick(e);
        }
        this._seenKeydown = false;
    }, _onDropDownKeydown: function (e) {
        this._seenKeydown = true;
    }, _onDropDownBlur: function (e) {
        this._seenKeydown = false;
    }, _onKey: function (e) {
        if (this.disabled) {
            return;
        }
        if (e.keyCode == dojo.keys.DOWN_ARROW) {
            if (!this.dropDown || this.dropDown.domNode.style.display == "none") {
                dojo.stopEvent(e);
                return this._toggleDropDown();
            }
        }
    }, _onBlur: function () {
        this._closeDropDown();
    }, _toggleDropDown: function () {
        if (this.disabled) {
            return;
        }
        dijit.focus(this.popupStateNode);
        var _79e = this.dropDown;
        if (!_79e) {
            return false;
        }
        if (!_79e.isShowingNow) {
            if (_79e.href && !_79e.isLoaded) {
                var self = this;
                var _7a0 = dojo.connect(_79e, "onLoad", function () {
                    dojo.disconnect(_7a0);
                    self._openDropDown();
                });
                _79e._loadCheck(true);
                return;
            } else {
                this._openDropDown();
            }
        } else {
            this._closeDropDown();
        }
    }, _openDropDown: function () {
        var _7a1 = this.dropDown;
        var _7a2 = _7a1.domNode.style.width;
        var self = this;
        dijit.popup.open({parent: this, popup: _7a1, around: this.domNode, orient: this.isLeftToRight() ? {"BL": "TL", "BR": "TR", "TL": "BL", "TR": "BR"} : {"BR": "TR", "BL": "TL", "TR": "BR", "TL": "BL"}, onExecute: function () {
            self._closeDropDown(true);
        }, onCancel: function () {
            self._closeDropDown(true);
        }, onClose: function () {
            _7a1.domNode.style.width = _7a2;
            self.popupStateNode.removeAttribute("popupActive");
            this._opened = false;
        }});
        if (this.domNode.offsetWidth > _7a1.domNode.offsetWidth) {
            var _7a4 = null;
            if (!this.isLeftToRight()) {
                _7a4 = _7a1.domNode.parentNode;
                var _7a5 = _7a4.offsetLeft + _7a4.offsetWidth;
            }
            dojo.marginBox(_7a1.domNode, {w: this.domNode.offsetWidth});
            if (_7a4) {
                _7a4.style.left = _7a5 - this.domNode.offsetWidth + "px";
            }
        }
        this.popupStateNode.setAttribute("popupActive", "true");
        this._opened = true;
        if (_7a1.focus) {
            _7a1.focus();
        }
    }, _closeDropDown: function (_7a6) {
        if (this._opened) {
            dijit.popup.close(this.dropDown);
            if (_7a6) {
                this.focus();
            }
            this._opened = false;
        }
    }});
    dojo.declare("dijit.form.ComboButton", dijit.form.DropDownButton, {templateString: "<table class='dijit dijitReset dijitInline dijitLeft'\r\n\tcellspacing='0' cellpadding='0'\r\n\tdojoAttachEvent=\"onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\">\r\n\t<tr>\r\n\t\t<td\tclass=\"dijitStretch dijitButtonContents dijitButtonNode\"\r\n\t\t\ttabIndex=\"${tabIndex}\"\r\n\t\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\"  dojoAttachPoint=\"titleNode\"\r\n\t\t\twaiRole=\"button\" waiState=\"labelledby-${id}_label\">\r\n\t\t\t<div class=\"dijitInline ${iconClass}\" dojoAttachPoint=\"iconNode\"></div>\r\n\t\t\t<span class=\"dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\">${label}</span>\r\n\t\t</td>\r\n\t\t<td class='dijitReset dijitRight dijitButtonNode dijitDownArrowButton'\r\n\t\t\tdojoAttachPoint=\"popupStateNode,focusNode\"\r\n\t\t\tdojoAttachEvent=\"ondijitclick:_onArrowClick, onkeypress:_onKey\"\r\n\t\t\tstateModifier=\"DownArrow\"\r\n\t\t\ttitle=\"${optionsTitle}\" name=\"${name}\"\r\n\t\t\twaiRole=\"button\" waiState=\"haspopup-true\"\r\n\t\t><div waiRole=\"presentation\">&#9660;</div>\r\n\t</td></tr>\r\n</table>\r\n", attributeMap: dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap), {id: "", name: ""}), optionsTitle: "", baseClass: "dijitComboButton", _focusedNode: null, postCreate: function () {
        this.inherited(arguments);
        this._focalNodes = [this.titleNode, this.popupStateNode];
        dojo.forEach(this._focalNodes, dojo.hitch(this, function (node) {
            if (dojo.isIE) {
                this.connect(node, "onactivate", this._onNodeFocus);
            } else {
                this.connect(node, "onfocus", this._onNodeFocus);
            }
        }));
    }, focusFocalNode: function (node) {
        this._focusedNode = node;
        dijit.focus(node);
    }, hasNextFocalNode: function () {
        return this._focusedNode !== this.getFocalNodes()[1];
    }, focusNext: function () {
        this._focusedNode = this.getFocalNodes()[this._focusedNode ? 1 : 0];
        dijit.focus(this._focusedNode);
    }, hasPrevFocalNode: function () {
        return this._focusedNode !== this.getFocalNodes()[0];
    }, focusPrev: function () {
        this._focusedNode = this.getFocalNodes()[this._focusedNode ? 0 : 1];
        dijit.focus(this._focusedNode);
    }, getFocalNodes: function () {
        return this._focalNodes;
    }, _onNodeFocus: function (evt) {
        this._focusedNode = evt.currentTarget;
    }, _onBlur: function (evt) {
        this.inherited(arguments);
        this._focusedNode = null;
    }});
    dojo.declare("dijit.form.ToggleButton", dijit.form.Button, {baseClass: "dijitToggleButton", checked: false, _clicked: function (evt) {
        this.setChecked(!this.checked);
    }, setChecked: function (_7ac) {
        this.checked = _7ac;
        dijit.setWaiState(this.focusNode || this.domNode, "pressed", this.checked);
        this._setStateClass();
        this.onChange(_7ac);
    }});
}
if (!dojo._hasResource["dijit.layout.StackContainer"]) {
    dojo._hasResource["dijit.layout.StackContainer"] = true;
    dojo.provide("dijit.layout.StackContainer");
    dojo.declare("dijit.layout.StackContainer", dijit.layout._LayoutWidget, {doLayout: true, _started: false, postCreate: function () {
        dijit.setWaiRole((this.containerNode || this.domNode), "tabpanel");
        this.connect(this.domNode, "onkeypress", this._onKeyPress);
    }, startup: function () {
        if (this._started) {
            return;
        }
        var _7ad = this.getChildren();
        dojo.forEach(_7ad, this._setupChild, this);
        dojo.some(_7ad, function (_7ae) {
            if (_7ae.selected) {
                this.selectedChildWidget = _7ae;
            }
            return _7ae.selected;
        }, this);
        var _7af = this.selectedChildWidget;
        if (!_7af && _7ad[0]) {
            _7af = this.selectedChildWidget = _7ad[0];
            _7af.selected = true;
        }
        if (_7af) {
            this._showChild(_7af);
        }
        dojo.publish(this.id + "-startup", [
            {children: _7ad, selected: _7af}
        ]);
        this.inherited("startup", arguments);
        this._started = true;
    }, _setupChild: function (page) {
        page.domNode.style.display = "none";
        page.domNode.style.position = "relative";
        return page;
    }, addChild: function (_7b1, _7b2) {
        dijit._Container.prototype.addChild.apply(this, arguments);
        _7b1 = this._setupChild(_7b1);
        if (this._started) {
            this.layout();
            dojo.publish(this.id + "-addChild", [_7b1, _7b2]);
            if (!this.selectedChildWidget) {
                this.selectChild(_7b1);
            }
        }
    }, removeChild: function (page) {
        dijit._Container.prototype.removeChild.apply(this, arguments);
        if (this._beingDestroyed) {
            return;
        }
        if (this._started) {
            dojo.publish(this.id + "-removeChild", [page]);
            this.layout();
        }
        if (this.selectedChildWidget === page) {
            this.selectedChildWidget = undefined;
            if (this._started) {
                var _7b4 = this.getChildren();
                if (_7b4.length) {
                    this.selectChild(_7b4[0]);
                }
            }
        }
    }, selectChild: function (page) {
        page = dijit.byId(page);
        if (this.selectedChildWidget != page) {
            this._transition(page, this.selectedChildWidget);
            this.selectedChildWidget = page;
            dojo.publish(this.id + "-selectChild", [page]);
        }
    }, _transition: function (_7b6, _7b7) {
        if (_7b7) {
            this._hideChild(_7b7);
        }
        this._showChild(_7b6);
        if (this.doLayout && _7b6.resize) {
            _7b6.resize(this._containerContentBox || this._contentBox);
        }
    }, _adjacent: function (_7b8) {
        var _7b9 = this.getChildren();
        var _7ba = dojo.indexOf(_7b9, this.selectedChildWidget);
        _7ba += _7b8 ? 1 : _7b9.length - 1;
        return _7b9[_7ba % _7b9.length];
    }, forward: function () {
        this.selectChild(this._adjacent(true));
    }, back: function () {
        this.selectChild(this._adjacent(false));
    }, _onKeyPress: function (e) {
        dojo.publish(this.id + "-containerKeyPress", [
            {e: e, page: this}
        ]);
    }, layout: function () {
        if (this.doLayout && this.selectedChildWidget && this.selectedChildWidget.resize) {
            this.selectedChildWidget.resize(this._contentBox);
        }
    }, _showChild: function (page) {
        var _7bd = this.getChildren();
        page.isFirstChild = (page == _7bd[0]);
        page.isLastChild = (page == _7bd[_7bd.length - 1]);
        page.selected = true;
        page.domNode.style.display = "";
        if (page._loadCheck) {
            page._loadCheck();
        }
        if (page.onShow) {
            page.onShow();
        }
    }, _hideChild: function (page) {
        page.selected = false;
        page.domNode.style.display = "none";
        if (page.onHide) {
            page.onHide();
        }
    }, closeChild: function (page) {
        var _7c0 = page.onClose(this, page);
        if (_7c0) {
            this.removeChild(page);
            page.destroy();
        }
    }, destroy: function () {
        this._beingDestroyed = true;
        this.inherited("destroy", arguments);
    }});
    dojo.declare("dijit.layout.StackController", [dijit._Widget, dijit._Templated, dijit._Container], {templateString: "<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>", containerId: "", buttonWidget: "dijit.layout._StackButton", postCreate: function () {
        dijit.setWaiRole(this.domNode, "tablist");
        this.pane2button = {};
        this._subscriptions = [dojo.subscribe(this.containerId + "-startup", this, "onStartup"), dojo.subscribe(this.containerId + "-addChild", this, "onAddChild"), dojo.subscribe(this.containerId + "-removeChild", this, "onRemoveChild"), dojo.subscribe(this.containerId + "-selectChild", this, "onSelectChild"), dojo.subscribe(this.containerId + "-containerKeyPress", this, "onContainerKeyPress")];
    }, onStartup: function (info) {
        dojo.forEach(info.children, this.onAddChild, this);
        this.onSelectChild(info.selected);
    }, destroy: function () {
        dojo.forEach(this._subscriptions, dojo.unsubscribe);
        this.inherited("destroy", arguments);
    }, onAddChild: function (page, _7c3) {
        var _7c4 = document.createElement("span");
        this.domNode.appendChild(_7c4);
        var cls = dojo.getObject(this.buttonWidget);
        var _7c6 = new cls({label: page.title, closeButton: page.closable}, _7c4);
        this.addChild(_7c6, _7c3);
        this.pane2button[page] = _7c6;
        page.controlButton = _7c6;
        dojo.connect(_7c6, "onClick", dojo.hitch(this, "onButtonClick", page));
        dojo.connect(_7c6, "onClickCloseButton", dojo.hitch(this, "onCloseButtonClick", page));
        if (!this._currentChild) {
            _7c6.focusNode.setAttribute("tabIndex", "0");
            this._currentChild = page;
        }
    }, onRemoveChild: function (page) {
        if (this._currentChild === page) {
            this._currentChild = null;
        }
        var _7c8 = this.pane2button[page];
        if (_7c8) {
            _7c8.destroy();
        }
        this.pane2button[page] = null;
    }, onSelectChild: function (page) {
        if (!page) {
            return;
        }
        if (this._currentChild) {
            var _7ca = this.pane2button[this._currentChild];
            _7ca.setChecked(false);
            _7ca.focusNode.setAttribute("tabIndex", "-1");
        }
        var _7cb = this.pane2button[page];
        _7cb.setChecked(true);
        this._currentChild = page;
        _7cb.focusNode.setAttribute("tabIndex", "0");
    }, onButtonClick: function (page) {
        var _7cd = dijit.byId(this.containerId);
        _7cd.selectChild(page);
    }, onCloseButtonClick: function (page) {
        var _7cf = dijit.byId(this.containerId);
        _7cf.closeChild(page);
        var b = this.pane2button[this._currentChild];
        if (b) {
            dijit.focus(b.focusNode || b.domNode);
        }
    }, adjacent: function (_7d1) {
        var _7d2 = this.getChildren();
        var _7d3 = dojo.indexOf(_7d2, this.pane2button[this._currentChild]);
        var _7d4 = _7d1 ? 1 : _7d2.length - 1;
        return _7d2[(_7d3 + _7d4) % _7d2.length];
    }, onkeypress: function (e) {
        if (this.disabled || e.altKey) {
            return;
        }
        var _7d6 = true;
        if (e.ctrlKey || !e._djpage) {
            var k = dojo.keys;
            switch (e.keyCode) {
                case k.LEFT_ARROW:
                case k.UP_ARROW:
                case k.PAGE_UP:
                    _7d6 = false;
                case k.RIGHT_ARROW:
                case k.DOWN_ARROW:
                case k.PAGE_DOWN:
                    this.adjacent(_7d6).onClick();
                    dojo.stopEvent(e);
                    break;
                case k.DELETE:
                    if (this._currentChild.closable) {
                        this.onCloseButtonClick(this._currentChild);
                    }
                    dojo.stopEvent(e);
                    break;
                default:
                    if (e.ctrlKey) {
                        if (e.keyCode == k.TAB) {
                            this.adjacent(!e.shiftKey).onClick();
                            dojo.stopEvent(e);
                        } else {
                            if (e.keyChar == "w") {
                                if (this._currentChild.closable) {
                                    this.onCloseButtonClick(this._currentChild);
                                }
                                dojo.stopEvent(e);
                            }
                        }
                    }
            }
        }
    }, onContainerKeyPress: function (info) {
        info.e._djpage = info.page;
        this.onkeypress(info.e);
    }});
    dojo.declare("dijit.layout._StackButton", dijit.form.ToggleButton, {tabIndex: "-1", postCreate: function (evt) {
        dijit.setWaiRole((this.focusNode || this.domNode), "tab");
        this.inherited("postCreate", arguments);
    }, onClick: function (evt) {
        dijit.focus(this.focusNode);
    }, onClickCloseButton: function (evt) {
        evt.stopPropagation();
    }});
    dojo.extend(dijit._Widget, {title: "", selected: false, closable: false, onClose: function () {
        return true;
    }});
}
if (!dojo._hasResource["dijit.layout.NewsListTabContainer"]) {
    dojo._hasResource["dijit.layout.NewsListTabContainer"] = true;
    dojo.provide("dijit.layout.NewsListTabContainer");
    dojo.declare("dijit.layout.NewsListTabContainer", [dijit.layout.StackContainer, dijit._Templated], {tabPosition: "top", templateString: null, templateString: "<div class=\"dijitNewsListTabContainer\">\n\t<div dojoAttachPoint=\"tablistNode\"></div>\n\t<div class=\"dijitNewsListTabPaneWrapper\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n", postCreate: function () {
        dijit.layout.NewsListTabContainer.superclass.postCreate.apply(this, arguments);
        this.tablist = new dijit.layout.TabController({id: this.id + "_tablist", tabPosition: this.tabPosition, doLayout: this.doLayout, containerId: this.id}, this.tablistNode);
    }, _setupChild: function (tab) {
        dojo.addClass(tab.domNode, "dijitNewsListTabPane");
        this.inherited("_setupChild", arguments);
        return tab;
    }, startup: function () {
        if (this._started) {
            return;
        }
        this.tablist.startup();
        this.inherited("startup", arguments);
        if (dojo.isSafari) {
            setTimeout(dojo.hitch(this, "layout"), 0);
        }
    }, layout: function () {
        if (!this.doLayout) {
            return;
        }
        var _7dd = this.tabPosition.replace(/-h/, "");
        var _7de = [
            {domNode: this.tablist.domNode, layoutAlign: _7dd},
            {domNode: this.containerNode, layoutAlign: "client"}
        ];
        dijit.layout.layoutChildren(this.domNode, this._contentBox, _7de);
        this._containerContentBox = dijit.layout.marginBox2contentBox(this.containerNode, _7de[1]);
        if (this.selectedChildWidget) {
            this._showChild(this.selectedChildWidget);
            if (this.doLayout && this.selectedChildWidget.resize) {
                this.selectedChildWidget.resize(this._containerContentBox);
            }
        }
    }, destroy: function () {
        this.tablist.destroy();
        this.inherited("destroy", arguments);
    }});
    dojo.declare("dijit.layout.TabController", dijit.layout.StackController, {templateString: "<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>", tabPosition: "top", doLayout: true, buttonWidget: "dijit.layout._TabButton", postMixInProperties: function () {
        this["class"] = this.id + "-" + this.tabPosition;
        this.inherited("postMixInProperties", arguments);
    }});
    dojo.declare("dijit.layout._TabButton", dijit.layout._StackButton, {baseClass: "dijitTab", templateString: "<div dojoAttachEvent='onclick:onClick,onmouseenter:_onMouse,onmouseleave:_onMouse'>\n    <div class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\n<div class='dijitTabContent' dojoAttachPoint='tabContent'>\n        <span dojoAttachPoint='containerNode,focusNode'>${!label}</span>\n        <span dojoAttachPoint='closeButtonNode' class='closeImage' dojoAttachEvent='onmouseenter:_onMouse, onmouseleave:_onMouse, onclick:onClickCloseButton' stateModifier='CloseButton'>\n            <span dojoAttachPoint='closeText' class='closeText'>x</span>\n        </span>\n    </div>\n</div>\n", postCreate: function () {
        if (this.closeButton) {
            dojo.addClass(this.innerDiv, "dijitClosable");
        } else {
            this.closeButtonNode.style.display = "none";
        }
        this.inherited("postCreate", arguments);
        dojo.setSelectable(this.containerNode, false);
    }});
}
if (!dojo._hasResource["dijit.layout.TaskCTabContainer"]) {
    dojo._hasResource["dijit.layout.TaskCTabContainer"] = true;
    dojo.provide("dijit.layout.TaskCTabContainer");
    dojo.declare("dijit.layout.TaskCTabContainer", [dijit.layout.StackContainer, dijit._Templated], {tabPosition: "top", templateString: null, templateString: "<div class=\"dijitTaskCTabContainer\">\n\t<div dojoAttachPoint=\"tablistNode\"></div>\n\t<div class=\"wrap1\">\n<div class=\"wrap2\">\n<div class=\"wrap3\">\n<div class=\"wrap4\">\n<div class=\"wrap5\">\n<div class=\"wrap6\">\n<div class=\"wrap7\">\n<div class=\"wrap8\">\n<div class=\"dijitTaskCTabPaneWrapper\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n", postCreate: function () {
        dijit.layout.TaskCTabContainer.superclass.postCreate.apply(this, arguments);
        this.tablist = new dijit.layout.TabController({id: this.id + "_tablist", tabPosition: this.tabPosition, doLayout: this.doLayout, containerId: this.id}, this.tablistNode);
    }, _setupChild: function (tab) {
        dojo.addClass(tab.domNode, "dijitTaskCTabPane");
        this.inherited("_setupChild", arguments);
        return tab;
    }, startup: function () {
        if (this._started) {
            return;
        }
        this.tablist.startup();
        this.inherited("startup", arguments);
        if (dojo.isSafari) {
            setTimeout(dojo.hitch(this, "layout"), 0);
        }
    }, layout: function () {
        if (!this.doLayout) {
            return;
        }
        var _7e0 = this.tabPosition.replace(/-h/, "");
        var _7e1 = [
            {domNode: this.tablist.domNode, layoutAlign: _7e0},
            {domNode: this.containerNode, layoutAlign: "client"}
        ];
        dijit.layout.layoutChildren(this.domNode, this._contentBox, _7e1);
        this._containerContentBox = dijit.layout.marginBox2contentBox(this.containerNode, _7e1[1]);
        if (this.selectedChildWidget) {
            this._showChild(this.selectedChildWidget);
            if (this.doLayout && this.selectedChildWidget.resize) {
                this.selectedChildWidget.resize(this._containerContentBox);
            }
        }
    }, destroy: function () {
        this.tablist.destroy();
        this.inherited("destroy", arguments);
    }});
    dojo.declare("dijit.layout.TabController", dijit.layout.StackController, {templateString: "<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>", tabPosition: "top", doLayout: true, buttonWidget: "dijit.layout._TabButton", postMixInProperties: function () {
        this["class"] = this.id + "-" + this.tabPosition;
        this.inherited("postMixInProperties", arguments);
    }});
    dojo.declare("dijit.layout._TabButton", dijit.layout._StackButton, {baseClass: "dijitTab", templateString: "<div dojoAttachEvent='onclick:onClick,onmouseenter:_onMouse,onmouseleave:_onMouse'>\n    <div class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\n<div class='dijitTabContent' dojoAttachPoint='tabContent'>\n        <span dojoAttachPoint='containerNode,focusNode'>${!label}</span>\n        <span dojoAttachPoint='closeButtonNode' class='closeImage' dojoAttachEvent='onmouseenter:_onMouse, onmouseleave:_onMouse, onclick:onClickCloseButton' stateModifier='CloseButton'>\n            <span dojoAttachPoint='closeText' class='closeText'>x</span>\n        </span>\n    </div>\n</div>\n", postCreate: function () {
        if (this.closeButton) {
            dojo.addClass(this.innerDiv, "dijitClosable");
        } else {
            this.closeButtonNode.style.display = "none";
        }
        this.inherited("postCreate", arguments);
        dojo.setSelectable(this.containerNode, false);
    }});
}
if (!dojo._hasResource["dijit.Tooltip"]) {
    dojo._hasResource["dijit.Tooltip"] = true;
    dojo.provide("dijit.Tooltip");
    dojo.declare("dijit._MasterTooltip", [dijit._Widget, dijit._Templated], {duration: 200, templateString: "<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\">\r\n\t<div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" waiRole='alert'></div>\r\n\t<div class=\"dijitTooltipConnector\"></div>\r\n</div>\r\n", postCreate: function () {
        dojo.body().appendChild(this.domNode);
        this.bgIframe = new dijit.BackgroundIframe(this.domNode);
        this.fadeIn = dojo.fadeIn({node: this.domNode, duration: this.duration, onEnd: dojo.hitch(this, "_onShow")});
        this.fadeOut = dojo.fadeOut({node: this.domNode, duration: this.duration, onEnd: dojo.hitch(this, "_onHide")});
    }, show: function (_7e2, _7e3) {
        if (this.aroundNode && this.aroundNode === _7e3) {
            return;
        }
        if (this.fadeOut.status() == "playing") {
            this._onDeck = arguments;
            return;
        }
        this.containerNode.innerHTML = _7e2;
        this.domNode.style.top = (this.domNode.offsetTop + 1) + "px";
        var _7e4 = this.isLeftToRight() ? {"BR": "BL", "BL": "BR"} : {"BL": "BR", "BR": "BL"};
        var pos = dijit.placeOnScreenAroundElement(this.domNode, _7e3, _7e4);
        this.domNode.className = "dijitTooltip dijitTooltip" + (pos.corner == "BL" ? "Right" : "Left");
        dojo.style(this.domNode, "opacity", 0);
        this.fadeIn.play();
        this.isShowingNow = true;
        this.aroundNode = _7e3;
    }, _onShow: function () {
        if (dojo.isIE) {
            this.domNode.style.filter = "";
        }
    }, hide: function (_7e6) {
        if (!this.aroundNode || this.aroundNode !== _7e6) {
            return;
        }
        if (this._onDeck) {
            this._onDeck = null;
            return;
        }
        this.fadeIn.stop();
        this.isShowingNow = false;
        this.aroundNode = null;
        this.fadeOut.play();
    }, _onHide: function () {
        this.domNode.style.cssText = "";
        if (this._onDeck) {
            this.show.apply(this, this._onDeck);
            this._onDeck = null;
        }
    }});
    dijit.showTooltip = function (_7e7, _7e8) {
        if (!dijit._masterTT) {
            dijit._masterTT = new dijit._MasterTooltip();
        }
        return dijit._masterTT.show(_7e7, _7e8);
    };
    dijit.hideTooltip = function (_7e9) {
        if (!dijit._masterTT) {
            dijit._masterTT = new dijit._MasterTooltip();
        }
        return dijit._masterTT.hide(_7e9);
    };
    dojo.declare("dijit.Tooltip", dijit._Widget, {label: "", showDelay: 400, connectId: [], postCreate: function () {
        if (this.srcNodeRef) {
            this.srcNodeRef.style.display = "none";
        }
        this._connectNodes = [];
        dojo.forEach(this.connectId, function (id) {
            var node = dojo.byId(id);
            if (node) {
                this._connectNodes.push(node);
                dojo.forEach(["onMouseOver", "onMouseOut", "onFocus", "onBlur", "onHover", "onUnHover"], function (_7ec) {
                    this.connect(node, _7ec.toLowerCase(), "_" + _7ec);
                }, this);
                if (dojo.isIE) {
                    node.style.zoom = 1;
                }
            }
        }, this);
    }, _onMouseOver: function (e) {
        this._onHover(e);
    }, _onMouseOut: function (e) {
        if (dojo.isDescendant(e.relatedTarget, e.target)) {
            return;
        }
        this._onUnHover(e);
    }, _onFocus: function (e) {
        this._focus = true;
        this._onHover(e);
    }, _onBlur: function (e) {
        this._focus = false;
        this._onUnHover(e);
    }, _onHover: function (e) {
        if (!this._showTimer) {
            var _7f2 = e.target;
            this._showTimer = setTimeout(dojo.hitch(this, function () {
                this.open(_7f2);
            }), this.showDelay);
        }
    }, _onUnHover: function (e) {
        if (this._focus) {
            return;
        }
        if (this._showTimer) {
            clearTimeout(this._showTimer);
            delete this._showTimer;
        }
        this.close();
    }, open: function (_7f4) {
        _7f4 = _7f4 || this._connectNodes[0];
        if (!_7f4) {
            return;
        }
        if (this._showTimer) {
            clearTimeout(this._showTimer);
            delete this._showTimer;
        }
        dijit.showTooltip(this.label || this.domNode.innerHTML, _7f4);
        this._connectNode = _7f4;
    }, close: function () {
        dijit.hideTooltip(this._connectNode);
        delete this._connectNode;
        if (this._showTimer) {
            clearTimeout(this._showTimer);
            delete this._showTimer;
        }
    }, uninitialize: function () {
        this.close();
    }});
}
dojo.i18n._preloadLocalizations("dojo.nls.dojo", ["es-es", "es", "hu", "it-it", "de", "pt-br", "pl", "fr-fr", "zh-cn", "pt", "en-us", "zh", "ru", "xx", "fr", "zh-tw", "it", "cs", "en-gb", "de-de", "ja-jp", "ko-kr", "ko", "en", "ROOT", "ja"]);
