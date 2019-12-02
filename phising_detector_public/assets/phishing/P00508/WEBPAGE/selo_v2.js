(function (root) {

    var $, jQuery;
    var getJquery = function () {
        $ = jQuery = root.jQuery && root.jQuery.fn && root.jQuery.fn.jquery ? root.jQuery : null;
        return $ ? true : false;
    };
    getJquery();

    function getUrlParameter(params) {
        var sPageURL = root.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == params) {
                return sParameterName[1];
            }
        }
        return false;
    }

    var PARAM_NAME = 'show_selo';
    var PARAM_VALUE = getUrlParameter(PARAM_NAME);
    if (PARAM_VALUE === 'false') return root;
    var SHOW_ALL = PARAM_VALUE === 'true' || typeof PARAM_VALUE === "undefined";


    // Mapa com as informações de todas as marcas
    var brand_map = {
        'americanas': {
            ref: 'ACOM',
            selo: {
                selector: 'a.url, .mp-picture, .neemurc-carousel-item-divimg, .neemucmp-product-image',
                not_if_has: '.neemu-blacknight-stamp, .integrated-stamp'
            }
        },
        'submarino': {
            ref: 'SUBA',
            selo: {
                selector: 'a.url, .mp-picture figure, a.link-product, a[rel="product"], .crossSelling .product, .main-product-photo a, .neemurc-carousel-item-divimg, .neemucmp-product-image',
                not_if_has: '.neemu-blacknight-stamp, .gift'
            }
        },
        'shoptime': {
            ref: 'SHOP',
            selo: {
                selector: 'a.url, div.image_carousel ul li a, .wrapper-productstv .lt-pd-prod-url,  div.wPhoto a, .ewBox .prodBox .col01'
            }
        },
        'soubarato': {
            ref: 'SB',
            selo: {
                selector: 'a.url, .mp-picture, .neemurc-carousel-item-divimg'
            }
        }
    };

    // Adiciona referências genéricas ao mapa de marcas
    for (var brnd in brand_map) {
        if (!brand_map[brnd].name) brand_map[brnd].name = brnd;
        if (!brand_map[brnd].host) brand_map[brnd].host = brnd + '.com.br';
        if (!brand_map[brnd].host_apps) brand_map[brnd].host_apps = 'apps.' + brand_map[brnd].host;
        if (!brand_map[brnd].selo.path) brand_map[brnd].selo.path = '/media/selo/';
    }

    var brand = root.APP_BRAND_SELO || root.APP_BRAND || (function () {
            for (var brand in brand_map) {
                if (root.location.host.indexOf(brand_map[brand].host) > -1) {
                    return brand_map[brand];
                }
            }
            return {};
        })();

    // Endereços
    var url_css = 'http://' + brand.host_apps + brand.selo.path + 'css/' + brand.name + '.css' + (SHOW_ALL ? '?' + (new Date()).getTime() : '');
    var url_js = 'http://' + brand.host_apps + brand.selo.path + 'data/' + brand.name + '.js' + (SHOW_ALL ? '?' + (new Date()).getTime() : '');

    // Insere CSS na página.
    var lnk = root.document.createElement('link');
    lnk.setAttribute('type', "text/css");
    lnk.setAttribute('rel', "stylesheet");
    lnk.setAttribute('href', url_css);
    root.document.getElementsByTagName("head").item(0).appendChild(lnk);


    var uid = 0;
    var uniqueId = function () {
        return uid++;
    };

    // Objeto Selo
    var selo = root.selo = {
        idp: [],
        images: [],
        m: brand.name,
        brand: brand,
        elements: [],
        selector: [],
        interval: 0,
        intervalNumber: 1000,
        imagePlaceClass: 'selo-place-ready',
        addData: function (products, images) {
            this.idp = products;
            this.images = images;
        },
        img: function (id) {
            var idIndex = $.inArray(id + '', this.idp);
            if (idIndex > -1) {
                var imgIndex = this.idp[idIndex + 1];
                if (imgIndex && this.images[imgIndex])
                    return this.images[imgIndex];
            }
            return '';
        },
        addElement: function ($el) {
            this.elements.push($el);
        },
        clearElements: function () {
            for (var i = 0; i < this.elements.length; i++) {
                var current = this.elements[i];
                current.remove();
            }
            $('.selo-item').remove();
            $('.' + this.imagePlaceClass).removeClass(this.imagePlaceClass);
            this.elements = [];
        },
        startVerify: function () {
            var self = this;
            this.intervalNumber *= 2;
            clearTimeout(self.interval);
            self.interval = setTimeout(function () {
                var currentSelector = $(self.brand.selo.selector);
                if (self.selector && self.selector.length < currentSelector.length) {
                    self.init();
                }
                self.startVerify();
            }, this.intervalNumber);
        },
        findImagePlace: function (selector, child_selector) {
            var self = this,
                images = [];
            if (!selector) return images;

            selector.find(child_selector || 'img').each(function () {
                var cImg = this;
                var $cImg = $(this);
                for (var i = 0, attrs = cImg.attributes, l = attrs.length; i < l; i++) {
                    var id,
                        attr = attrs.item(i).nodeName,
                        val = $cImg.attr(attr);
                    if (typeof val === 'string' && val.indexOf('/produtos/') > -1) {
                        id = val.split('/');
                        id = id[id.length - 1];
                        id = parseInt(id.split('.')[0], 10);
                        id = !isNaN(id) ? id : null;
                        var seloUrl = self.img(id);
                        var link = $cImg.parents('a[href]');
                        var linkId = null;
                        var linkSelo = '';
                        if (link.length) {
                            var linkUrl = link.attr('href');
                            if (linkUrl && linkUrl.indexOf('/produto/') > -1) {
                                var ids = linkUrl.split('/');
                                for (var j = 0; j < ids.length; j++) {
                                    if (ids[j] === 'produto' && ids.length > j + 1) {
                                        linkId = parseInt(ids[j + 1], 10);
                                        linkId = !isNaN(linkId) ? linkId : null;
                                        linkSelo = self.img(linkId);
                                        if (linkSelo) seloUrl = linkSelo;
                                        if (linkId) id = linkId;
                                        break;
                                    }
                                }
                            }
                        }

                        if (((id && seloUrl) || SHOW_ALL ) && !$cImg.hasClass(self.imagePlaceClass)) {
                            if (SHOW_ALL) seloUrl = 'http://placehold.it/60x60/';
                            $cImg.addClass(self.imagePlaceClass);
                            images.push({$el: $cImg, id: id, url: seloUrl});
                        }
                    }
                }
            });
            return images;
        },
        render: function (info) {
            var self = this,
                cUrl = info.url,
                cImg = info.$el,
                cId = info.id;

            var containerWidth = cImg.get(0).width;
            var containerHeight = cImg.get(0).height;

            var $img = $('<img />')
                .addClass('selo-image')
                .attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
                .css({
                    'float': 'right',
                    'display': 'block',
                    'border': '0 none',
                    'outline': '0 none'
                });

            var tempImg = $('<img />')
                .attr('src', cUrl)
                .load(function () {
                    var ih = this.height;
                    var iw = this.width;
                    var xpercent = (100 * iw) / containerWidth;
                    $img
                        .attr('src', cUrl)
                        .attr('height', ih)
                        .attr('width', iw)
                        .css({
                            'height': 'auto',
                            'width': xpercent >= 50 && iw > 0 ? '40%' : 'auto',
                            'max-width': '100%'
                        });
                    tempImg.remove();
                });


            var $el = $('<div />')
                .addClass('selo-item')
                .attr('data-selo-id', cId)
                .css({
                    'position': 'absolute',
                    'display': 'block',
                    'padding-top': cImg.css('padding-top'),
                    'padding-right': cImg.css('padding-right'),
                    'padding-bottom': cImg.css('padding-bottom'),
                    'padding-left': cImg.css('padding-left'),

                    'margin-top': cImg.css('margin-top'),
                    'margin-right': cImg.css('margin-right'),
                    'margin-bottom': cImg.css('margin-bottom'),
                    'margin-left': cImg.css('margin-left'),

                    'border-color': 'transparent',
                    'border-style': 'solid',
                    'border-top-width': cImg.css('border-top-width') || 0,
                    'border-right-width': cImg.css('border-right-width') || 0,
                    'border-bottom-width': cImg.css('border-bottom-width') || 0,
                    'border-left-width': cImg.css('border-left-width') || 0,
                    'z-index': '1'
                })
                .append($img)
                .insertBefore(cImg);

            if (containerWidth) {
                $el.css('width', containerWidth);
            }
            if (containerHeight) {
                $el.css('height', containerHeight);
            }

            self.addElement($el);
        },
        init: function () {
            var self = this;
            self.clearElements();
            self.startVerify();
            var selector = self.selector = $(self.brand.selo.selector),
                not_if_has = self.brand.selo.not_if_has || '';

            if (SHOW_ALL) {
                $('a').each(function () {
                    var url = $(this).attr('href');
                    var prefix = '?';
                    if (url && url.indexOf(PARAM_NAME) === -1) {
                        if (url.indexOf('?') > -1) {
                            prefix = '&';
                        }
                        $(this).attr('href', url + prefix + PARAM_NAME);
                    }
                });
            }
            selector.each(function (e, t) {
                if (!$(this).find(not_if_has).length) {
                    var id,
                        current = $(this),
                        inside = $("[src*='/produtos/']", current);

                    // verifica se já existe algum selo.
                    // Procura imagens de produtos dentro do elemento
                    var images = self.findImagePlace(current);

                    if (images.length) {
                        for (var i = 0; i < images.length; i++) {
                            self.render(images[i]);
                        }
                    }
                }

                return true;
            });
        }
    };

    // Manipula callback de paginação de dep, linha e sublinha pra rodar novamente.
    var paginationCallback = root.paginationCallback;
    root.paginationCallback = function () {
        setTimeout(function () {
            selo.init();
        }, 100);
        paginationCallback.apply(this, arguments);
    };


    // Função start
    var startApp = selo.start = function () {
        if (!$) getJquery();
        brand = $.extend(true, brand_map[brand.name] ? brand_map[brand.name] : {}, brand);
        selo.brand = brand;

        $.ajax({
            url: url_js,
            dataType: "script",
            cache: true,
            success: function () {
                setTimeout(function () {
                    selo.init();
                }, 1000);
            }
        });
    };

    // Inicia o App
    if (getJquery()) {
        $(function () {
            startApp();
        });
    } else if (typeof root.onReady === 'function') {
        if (selo.m === 'submarino') {
            root.onReady('jQuery', function () {
                startApp();
            });
        } else {
            root.onReady(function () {
                startApp();
            });
        }
    }

    var waitFinish = false,
        countRec = 0,
        recInterval = setInterval(function () {
            var rec = window.neemuRecomendacao && window.neemuRecomendacao.neemuRecCallbackPreco;
            if (typeof rec === 'function') {
                clearInterval(recInterval);
                window.neemuRecomendacao.neemuRecCallbackPreco = function () {
                    clearTimeout(waitFinish);
                    waitFinish = setTimeout(function () {
                        selo.init();
                    }, 3000);
                    rec.apply(rec, arguments);
                }
            }
            if(countRec >= 5){
                clearInterval(recInterval);
            }
            countRec++;
        }, 1000);

}(this));