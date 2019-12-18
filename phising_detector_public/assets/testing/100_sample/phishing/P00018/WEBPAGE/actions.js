$(document).ready(function () {
    $('.pontos-mapa .curva').on('mouseenter', function () {

        var ctak = $(this).attr('accesskey');

        if (!$(this).parents('.mapa-imagem').find('.ligthbox ' + '.' + ctak).hasClass('ativobox')) {


            $('.ativobox').stop(true, true).fadeOut().removeClass('ativobox');

            $(this).parents('.mapa-imagem').find('.ligthbox ' + '.' + ctak).delay(700).addClass('ativobox').fadeIn();
        }

    });

    $('.ligthbox .fechar-box').on('click', function () {
        $('.ativobox').fadeOut().removeClass('ativobox');
        //$(this).parents('.ligthbox').find('.ativobox').removeClass('ativobox');
    });

    $(document).on("scroll", function () {
        if ($(document).scrollTop() <= 146) {
            $('header').removeClass('menufixed');
            $('.vt-top .seta-top').fadeOut();
        } else {
            $('header').addClass('menufixed');
            $('.vt-top .seta-top').fadeIn();
        }
    });

    $('.vt-top').on('click', function () {
        $('body, html').animate({scrollTop: 0}, 'slow', 'swing');
    });


    $('.abrir-menu').on('click', function () {
        $(this).toggleClass('ativomenu');
        $(this).parents('.center').find('nav.principal').slideToggle();
    });

    $('.titulo-box p').on('click', function () {
        $(this).toggleClass('ativop');
        $(this).parents('.conteudobox').find('.conteudo-info').slideToggle();
    });



    $('.tabela-mb h2').on('click', function () {
        $(this).toggleClass('ativoh2');
        $(this).next().stop(true, true).slideToggle();
    });

    // Scroll Menu
    $.scrollTo = $.fn.scrollTo = function (x, y, options) {
        if (!(this instanceof $))
            return $.fn.scrollTo.apply($('html, body'), arguments);

        options = $.extend({}, {
            gap: {
                x: 0,
                y: 0
            },
            animation: {
                easing: 'swing',
                duration: 600,
                complete: $.noop,
                step: $.noop
            }
        }, options);

        return this.each(function () {
            var elem = $(this);
            if ($(window).width() <= 600) {
                elem.stop().animate({
                    scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
                    scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
                }, options.animation);
            } else {
                elem.stop().animate({
                    scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
                    scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
                }, options.animation);
            }
        });
    };

    $("nav a, .logo a").click(function (evn) {
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash);
    });

    var aChildren = $("nav li, .logo").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i = 0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function () {
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("ativoli");
            } else {
                $("a[href='" + theID + "']").removeClass("ativoli");
            }
        }

        if (windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a, .logo a").hasClass("ativoli")) {
                var navActiveCurrent = $(".ativoli").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("ativoli");
                $("nav li:last-child a, .logo a").addClass("ativoli");
            }
        }
    });
    //Fim Scroll Menu



    //IS MAC?
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        $("body").addClass("mac");
    } else {
        $("body").addClass("pc");
    }


}); 