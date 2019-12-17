//herpderp
(function(_W, _D, _N, _L) {
    var SC = {},
        pageIsLoaded = false;

    SC.queue = [];

    SC.addEvent = function(_e, event, func) {
        if (_e.addEventListener) {
            _e.addEventListener(event, func, false);
        } else {
            _e.attachEvent('on' + event, func);
        }
    };

    SC.getTagValById = function(tagId) {
        var tag = document.getElementById(tagId);
        if (tag && tag.value) {
            return tag.value;
        }
    };

    SC.setParameter = function() {
        try {
            var s_getKw, _s_UADesign, sc_gender_result, genderAgeGetChar, sc_betaInfo, _bannerImp;
            s_getKw = function(_id) {
                var _tag = _D.getElementById(_id);
                if (_tag) {
                    return _tag.value;
                }
            };
            sc_betaInfo = '';
            if (_W._sc_bataInfo) {
                sc_betaInfo = _W._sc_bataInfo;
            } else {
                sc_betaInfo = s_getKw('sc_betaInfo');
            }
            if (!sc_betaInfo) {
                sc_betaInfo = "Error";
            }
            _s_UADesign = s_getKw('scUAPattern');
            if (_W._sc_layoutAgent) {
                s.pageName = 'Rakuten Top: ' + sc_betaInfo + "[" + _W._sc_layoutAgent + "]";
                s.prop9 = 'Rakuten Top: ' + sc_betaInfo + "[" + _W._sc_layoutAgent + "]";
                s.channel = 'Rakuten Top' + "[" + _W._sc_layoutAgent + "]";
            } else {
                s.pageName = 'Rakuten Top: ' + sc_betaInfo;
                s.prop9 = 'Rakuten Top: ' + sc_betaInfo;
                s.channel = 'Rakuten Top';
            }
            if (_W.prop10value) {
                s.prop10 = _W.prop10value;
            } else {
                s.prop10 = s.prop9;
            }
            s.prop13 = '';

            //is this check excessive?
            if (_W.templateA) {
                s.prop13 = _W.templateA;
            }
            //is this check excessive?
            if (_W.sc_gender) {
                switch (_W.sc_gender) {
                    case 'd':
                        s.GenderAgeSet('100');
                        break;
                    case 'm':
                        s.GenderAgeSet('200');
                        break;
                    case 'f':
                        s.GenderAgeSet('300');
                        break;
                }
            }
            sc_gender_result = '';
            genderAgeGetChar = s.GenderAgeGet().charAt(0);
            switch (genderAgeGetChar) {
                case '1':
                    sc_gender_result = '_d';
                    break;
                case '2':
                    sc_gender_result = '_m';
                    break;
                case '3':
                    sc_gender_result = '_f';
                    break;
            }
            if (_W._sc_layoutAgent) {
                s.eVar5 = _W.s_setUaInfomation("Rakuten Top" + "<" + _W._sc_layoutAgent + ">");
            } else if (s.deviceType()) {
                s.eVar5 = "Rakuten Top" + '<' + _s_UADesign + '>[' + s.deviceType() + ']';
            } else {
                s.eVar5 = "Rakuten Top" + '<' + _s_UADesign + '>';
            }
            if (_W._sc_layoutAgent) {
                s.eVar25 = 'Rakuten Top: ' + sc_betaInfo + ":" + sc_gender_result + "[" + _W._sc_layoutAgent + "]";
            } else {
                s.eVar25 = 'Rakuten Top: ' + sc_betaInfo + ":" + sc_gender_result;
            }
            if (_W._sc_layoutAgent) {
                s.eVar14 = 'Rakuten Top' + "[" + _W._sc_layoutAgent + "]";
            } else {
                s.eVar14 = 'Rakuten Top';
            }

            if (_W.sc_evar73_rank) {
                switch (_W.sc_evar73_rank) {
                    case 'NoneMember':
                        s.MemberRankSet('1');
                        break;
                    case 'Regular':
                        s.MemberRankSet('2');
                        break;
                    case 'Silver':
                        s.MemberRankSet('3');
                        break;
                    case 'Gold':
                        s.MemberRankSet('4');
                        break;
                    case 'Platinum':
                        s.MemberRankSet('5');
                        break;
                }
                s.eVar27 = _W.sc_evar73_rank;
            }

            try {
                if (isFinite(_W.orientation)) {
                    s.prop72 = _W.s_setUaInfomation(String(_W.orientation));
                } else {
                    s.prop72 = String(-1);
                }
            } catch (e) {
                s.prop72 = String(-10);
            }

            //lightbox banner impressions
            _bannerImp = SC.getTagValById('geBannerImp');
            if (_bannerImp) {
                _W.s.prop18 = _bannerImp;
            }

            //Write Your Code - End
        } catch (e) {
            _W.s.prop73 = '-10';
            return -10;
        }
        return 1;

    };

    SC.reqSiteCatalyst = function() {
        SC.setParameter();
        if (_W != parent) {
            return -1;
        }
        if (_W.performance) {
            _W.s.t();
            return '-11';
        }
        var e;
        try {
            e = String(_W.performance.navigation.type);
        } catch (t) {
            e = '-10';
        }
        if (e !== 1) {
            _W.s.t();
        }
        return 1;
    };
    _W.SC = {};
    _W.SC.sendSTL = function(o, pev2, linktype) {
        try {
            var eVarRgx = /eVar[3][0-9]/g,
                propRgx = /prop[1][0-9]/g,
                s = s_gi(s_account),
                parameter;

            s.linkTrackVars = 'None';
            s.trackExternalLinks = false;
            var overrideGVS = s.getVisitStart;
            //override v51 logic to avoid error when scid contains we_
            s.getVisitStart = function() {
                return false;
            };
            for (parameter in o) {
                if (o.hasOwnProperty(parameter)) {
                    if (parameter.search(eVarRgx) > -1 || parameter.search(propRgx) > -1) {
                        if (s.linkTrackVars === 'None') {
                            s.linkTrackVars = parameter;
                        } else {
                            s.linkTrackVars += ',' + parameter;
                        }
                        s[parameter] = o[parameter];
                    }
                }
            }
            pev2 = pev2 || 'IchibaTop_CustomSTL';
            linktype = linktype || 'o';
            s.tl(this, linktype, pev2);
            s.getVisitStart = overrideGVS;
        } catch (e) {
            return;
        }
    };

    _W.SC.sendScDataOnLoad = function(o, pev2, linktype) {
        if (typeof o !== 'object') {
            return 0;
        }
        var callItem = {
            o: o,
            pev2: pev2,
            linktype: linktype
        };
        if (!pageIsLoaded) {
            SC.queue.push(callItem);
        } else {
            _W.SC.sendSTL(o, pev2, linktype);
        }
    };

    SC.releaseQueue = function() {
        var i, len;
        len = SC.queue.length;
        for (i = 0; i < len; i++) {
            _W.SC.sendSTL(SC.queue[i]['o'], SC.queue[i]['pev2'], SC.queue[i]['linktype']);
        }
    };

    SC.addJavaScript = function() {
        //Write Your Code - Start
        var ele1, ele2, ele3, ele4, customClick1, customClick2, customClick3, customClick4;
        //SP and PC
        ele1 = (_D.getElementById('sc_Notification') || _D.getElementById('notificationButton'));
        if (ele1) {
            ele1.style.cursor = 'pointer';
            customClick1 = function() {
                _W.SC.sendSTL({
                    'prop10': s.prop9 + ':Notification'
                }, 'Notification');
            };
            SC.addEvent(ele1, 'click', customClick1);
        }

        ele2 = _D.getElementById('entryBnrClose');
        if (ele2) {
            customClick2 = function() {
                _W.SC.sendSTL({
                    'eVar32': s.channel + ':entryBnrClose'
                }, 'entryBnrClose');
            };
            SC.addEvent(ele2, 'click', customClick2);
        }
        // SP only
        ele4 = _D.getElementById('detailInfo');
        if (ele4) {
            ele4.style.cursor = 'pointer';
            customClick4 = function() {
                _W.SC.sendSTL({
                    'prop10': s.prop9 + ':MemberInfo'
                }, 'MemberInfo');
            };
            SC.addEvent(ele4, 'click', customClick4);
        }

        _W.sc_searchBox = function(partsname, option) {
            try {
                var rsuggest = _W.rsuggest || {};
                if (typeof searchplat !== "undefined" && searchplat.suggest != undefined && searchplat.suggest.rsuggest != undefined) {
                    rsuggest = searchplat.suggest.rsuggest;
                }
                if (typeof rsuggest.isSuggestUse == "function" && rsuggest.isSuggestUse()) {
                    partsname = "suggest";
                    if ((typeof rsuggest.genreHidden != "undefined") || (rsuggest.form != undefined && rsuggest.form.find("#" + rsuggest.config.attr("selectboxId") + "_hidden_for_suggest").length === 1)) {
                        if (rsuggest.swgIndex) {
                            partsname += rsuggest.swgIndex;
                        } else if (rsuggest.sggstSelectNum) {
                            partsname += rsuggest.sggstSelectNum;
                        }
                    }
                } else {
                    partsname = "search";
                }
            } catch (e) {}

            if (!option) {
                option = "";
            } else {
                option = ":" + option;
            }
            var _ua = s.deviceType();
            s_partsCounter(partsname + option + "[" + _ua + "]");
        };

        try {
            _W.endLoad1 = function(obj) {
                var s = _W.s_gi(_W.s_account),
                    // alreadyEntryBanner = $(".alreadyEntryBanner"),
                    t,
                    impCheck = [],
                    onLoadVar = {},
                    len,
                    prop13,
                    prop18,
                    eVar31,
                    i = 0,
                    impCheckTemp;
                prop13 = '';
                impCheck = [_W.sc_browsehist_imp,
                    _W.sc_basket_imp,
                    _W.sc_bookmark_imp,
                    _W.sc_histreco_imp,
                    _W.sc_recommend_imp,
                    _W.sc_popularity_imp,
                    _W.sc_shophist_imp,
                    _W.sc_pulldownbannar,
                    _W.sc_areakw_imp,
                    _W.sc_tabtest_imp
                ];
                len = impCheck.length;
                s.prop13 = '';
                for (i = 0; i < len; i++) {
                    impCheckTemp = impCheck[i];

                    //what this check is for?
                    if (impCheckTemp !== undefined && impCheckTemp) {
                        prop13 += '|' + impCheckTemp;
                    }
                }
                /*if (alreadyEntryBanner.length > 0){
                    t = alreadyEntryBanner[0].getAttribute('style');
                    if (t) {
                        if (t.match(/display:/g)){
                            t = t.replace(/(display: )([a-zA-Z]+)/g,'$2' )
                        }
                        eVar31 = s.channel + ' :alreadyEntryBanner:' + t;
                    } else {
                        eVar31 = s.channel + ' :alreadyEntryBanner';
                    }
                }*/
                prop18 = '';
                onLoadVar = {
                    'prop13': prop13,
                    'prop18': prop18,
                    'prop10': s.prop10 + '_onload'
                };
                if (s.deviceType() == "PC") {
                    _W.SC.sendSTL(onLoadVar);
                }
            };
        } catch (e) {
            return -1;
        }
        _W.endLoad1();
        //Write Your Code - End
        return 1;

    };
    SC.addJquery = function() {
        try {
            if (_W.jQuery === undefined) {
                return;
            }
            var $ = jQuery.noConflict();
            //Write Your Code - Start
            var $topBanner = $("#RJSFestivalBannerSlider");

            SC.bannerFlip = function() {
                _W.SC.sendSTL({
                    prop18: "www_PC_/_SSBanner_flip"
                });
                $topBanner.undelegate("a", "mouseover", SC.bannerFlip);
            };
            SC.bannerClick = function() {
                var thisHref = this.href;
                if (thisHref) {
                    if (thisHref.indexOf("l-id") > -1) {
                        return;
                    } else if (thisHref.indexOf(".grp") > -1) {
                        thisHref = thisHref + "&ap=l-id=www_PC_/_SSBanner";
                    }
                }
            };
            $topBanner.delegate("a", "mouseenter", SC.bannerFlip);
            $topBanner.delegate("a", "click", SC.bannerClick);

            //etsy banner clicks
            SC.$ele3 = $('#switchObject2').find('a');
            var _str = SC.$ele3.attr('id');
            if (SC.$ele3.length && _str) {
                SC.$ele3.css('cursor', 'pointer');
                SC.$ele3.bind('click', function(e) {
                    _W.SC.sendSTL({
                        'prop18': _str
                    });
                });
            }

            //SP - webclip balloon banner close button click
            SC.$ele5 = $('#scidBanner').find('div.closeButton');
            if (SC.$ele5.length) {
                $('body').bind('floatingbannerclosed', function(e) {
                    if (e.customData.id === "scidBanner") {
                        _W.SC.sendSTL({
                            'prop18': 'balloonBnr_webclip'
                        });
                    }
                });
            }

            //SP - small balloon close button click
            SC.$ele6 = $('#newPopUpBalloon').find('div.closeButton');
            if (SC.$ele6.length) {
                SC.$ele6.css('cursor', 'pointer');
                SC.$ele6.bind('click', function(e) {
                    _W.SC.sendSTL({
                        'prop18': 'balloonBnr_norm_small'
                    });
                });
            }

            //SP - big balloon banner close button click
            SC.$ele7 = $('#RJSFloatingBanner').find('div.closeButton');
            if (SC.$ele7.length) {
                SC.$ele7.css('cursor', 'pointer');
                SC.$ele7.bind('click', function(e) {
                    _W.SC.sendSTL({
                        'prop18': 'balloonBnr_norm_big'
                    });
                });
            }

            //SP - app deep link for non-active users
            SC.$ele8 = $('.appLuckyKuji').find('a');
            if (SC.$ele8.length) {
                SC.$ele8.css('cursor', 'pointer');
                SC.$ele8.bind('click', function(e) {
                    _W.SC.sendSTL({
                        'prop18': 'deep_link_nonact_usr'
                    });
                });
            }

            //App banner rendered through "Persona"
            SC.$ele9 = $('#topAppDl');
            if (SC.$ele9.length) {
                SC.$ele9.bind('click', function(event) {
                    var $target = $(event.target);
                    var id = $target.attr('id');
                    if (id) {
                        _W.SC.sendSTL({
                            'prop18': id
                        });
                    }
                });
            }

            //"Recommended Shops" links - PC
            SC.$ele10 = $('.top_normal_shoplist_details_');
            if (SC.$ele10.length) {
                SC.$ele10.bind('click', function(event) {
                    var $target = $(event.target);
                    var shopName = $target.attr('data-shopname');
                    if (shopName) {
                        _W.SC.sendSTL({
                            'prop18': 'top_normal_shoplist_details_' + shopName
                        });
                    }
                });
            }
            //"Recommended Shops" links - PC & SP
            SC.$ele11 = $('.shopListsid');
            if (SC.$ele11.length) {
                SC.$ele11.bind('click', function(event) {
                    var $this = $(this);
                    var sid = $this.attr('data-sid');
                    if (sid) {
                        _W.s.linkTrackVars = 'eVar3';
                        _W.s.eVar3 = sid;
                        _W.s.tl(this, 'o', sid);
                    }
                });
            }
            //SP - Batsu button for card campaign
            SC.$ele12 = $('#switchObject1').find('div.hideButton1');
            if (SC.$ele12.length) {
                SC.$ele12.css('cursor', 'pointer');
                SC.$ele12.bind('click', function(e) {
                    _W.SC.sendSTL({
                        'prop18': 'cardBnr_campaign_big'
                    });
                });
            }
            //SP AppTab individual apps (take2)
            SC.$ele13 = $('#navi-app').find("[data-app]");
            if (SC.$ele13.length) {
                SC.$ele13.css('cursor', 'pointer');
                SC.$ele13.bind('click', function(event) {
                    var prop18 = $(this).attr('data-app');
                    if (prop18) {
                        _W.SC.sendSTL({
                            'prop18': prop18
                        });
                    }
                });
            }
            // PC - Floating Banner Impressions Tracking
            SC.$ele14 = $('.RJSFloatingBanner');
            if (SC.$ele14.length) {
                var bindImpression = function(e) {
                    if (e.customData && e.customData.floatingbannerdisplayed) {
                        SC.$ele14.unbind('responseeventstatus', bindImpression);
                        SC.$ele14.unbind('floatingbannerdisplayed', bindFloatbanner);
                        _W.SC.sendSTL({
                            'prop18': _W.s.pageName + '_' + e.customData.floatingbannerdisplayed.campaignKey
                        });
                    }
                }

                var bindFloatbanner = function(e) {
                    SC.$ele14.trigger('requesteventstatus');
                }
                SC.$ele14.bind('responseeventstatus', bindImpression);
                SC.$ele14.bind('floatingbannerdisplayed', bindFloatbanner);
                SC.$ele14.trigger('requesteventstatus');
            }

            // DA-320 & DA-380: External links tracking using 'data-linktrack' parameter
            // NOTE: Ctrl + click breaks this for IE
            SC.$ele15 = $('.mr-point-display-table').find('[data-linktrack]');
            if (SC.$ele15.length) {
                SC.$ele15.bind('click', function(event){
                    var $target = $(event.target),
                        linktrack;
                    
                    linktrack = $target.closest('[data-linktrack]').attr('data-linktrack');
                    
                    if (linktrack) {
                        _W.SC.sendScDataOnLoad({ 'prop18': linktrack });
                    }
             });
            }

            //Write Your Code - End
        } catch (e) {
            return -1;
        }
    };
    SC.reqSiteCatalyst();
    SC.addEvent(_W, 'load', function() {
        pageIsLoaded = true;
    });
    SC.addEvent(_W, 'load', SC.releaseQueue);
    SC.addEvent(_W, 'load', SC.addJavaScript);
    SC.addEvent(_W, 'load', SC.addJquery);
}(window, document, navigator, location));