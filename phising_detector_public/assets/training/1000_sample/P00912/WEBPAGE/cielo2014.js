$(document).ready(function (e) {

    var msgAlert = $('#lightbox-generico').length;
    if (msgAlert > 0) {
        $('#lightbox-generico').css({ 'display': 'none' });
        $('body').css({ 'overflow': 'hidden' });
        $('#lightbox-generico').fadeIn();
    }

    var quantElt = $('.dest-ct').children('div');
    var quant = quantElt.length;
    var atual = 1;

    $('.set-dest-r').click(function () {
        atual++;
        $('.troque-pontos-destaques .item').css({ 'display': 'none' });
        if (atual > quant) { atual = 1; }
        $('.troque-pontos-destaques .it' + atual).css({ 'display': 'block' });
    });

    $('.set-dest-l').click(function () {
        atual--;
        $('.troque-pontos-destaques .item').css({ 'display': 'none' });
        if (atual==0) { atual = quant; }
        $('.troque-pontos-destaques .it' + atual).css({ 'display': 'block' });
    });

    $('.btn-compre-pontos').click(function (e) {
        e.preventDefault();
        $('.lb-ct').fadeOut();
    });

    $('.close').click(function (e) {
        e.preventDefault();
        $('lightbox-generico').fadeOut(400, function () { $('body').removeAttr('style') });
    });

    $('#lbFechar').click(function (e) {
        e.preventDefault();
        $('#lightbox-generico').fadeOut(400, function () { $('body').removeAttr('style')});
    });

    $('.mapdown').click(function (e) {
        if ($('.st-mapa-do-site').css('display')=='none') {
            $('.st-mapa-do-site').slideDown();
            $('.st-share').slideDown();
            $(this).addClass('mapup');
            $('html, body').animate({ scrollTop: $(this).offset().top }, 800);
        }else{
            $('.st-mapa-do-site').slideUp();
            $('.st-share').slideUp();
            $(this).removeClass('mapup');
        }
    });

    if ($('.ct-double-2').hasClass('resgate-bar') || $('.ct-double-2').hasClass('promo-bar')) {
        return;
    }else{
        $('.esq').click(function (e) {
            e.preventDefault()
            if ($('.resgate-ct').css({ 'display': 'none' })) {
                $('.promocoes-ct').css({ 'display': 'none' });
                $('.home-simples').css({ 'display': 'none' });
                $('.resgate-ct').css({ 'display': 'block' });
                $('.container .esq').css({ 'background-color': '#00AEEF' });
                $('.container .ct-double-1').css({ 'background-color': '#00AEEF' });
                $('.container .ct-double-2').css({ 'background-color': '#000000' });
        }
        });
        $('.dir').click(function (e) {
            e.preventDefault()
            if ($('.promocoes-ct').css({ 'display': 'none' })) {
                $('.resgate-ct').css({ 'display': 'none' });
                $('.home-simples').css({ 'display': 'none' });
                $('.promocoes-ct').css({ 'display': 'block' });
                $('.container .esq').css({ 'background-color': '#000000' });
                $('.container .ct-double-1').css({ 'background-color': '#000000' });
                $('.container .ct-double-2').css({ 'background-color': '#00AEEF' });
            }
        });
    }
    $('.notif-banner').click(function () {
        if ($('.container .notificacoes ul').css('display') == 'none') {
            $('.container .notificacoes ul').slideDown();
        } else {
            $('.container .notificacoes ul').slideUp();
        }
    });

    $('.mob-menu-btn').click(function () {
        if ($('.container .st-menu .nav').css('display') == 'none') {
            $('.container .st-menu .nav').slideDown();
            $(this).addClass('mob-menu-btn-ativo');
        } else {
            $('.container .st-menu .nav').slideUp();
            $(this).removeClass('mob-menu-btn-ativo');
        }
    });

    window.onresize = setScripts;

    function setScripts() {
        if ($(window).width() > 960) {
            $('.container .st-menu .nav').css({ 'display': 'block' });
        } else {
            $('.container .st-menu .nav').css({ 'display': 'none' });

            $('.col-map h6').click(function () {
                if ($(this).next('.map-inner').css('display')=='none') {
                    $('.map-inner').slideUp();
                    $(this).next('.map-inner').slideDown();
                } 
            });
        }
    }

    $('.tooltip-ct').click(function (e) {
        if ($(this).children('.tooltipbox').css('display') == 'none') {
            $('.tooltipbox').fadeOut();
            $('img.tt-down').css({ 'display': 'inline' });
            $('img.tt-up').css({ 'display': 'none' });
            $(this).find('img.tt-down').css({ 'display': 'none' });
            $(this).find('img.tt-up').css({ 'display': 'inline' });
            $(this).children('.tooltipbox').fadeIn();
        } else {
            $('img.tt-down').css({ 'display': 'inline' });
            $('img.tt-up').css({ 'display': 'none' });
            $(this).children('.tooltipbox').fadeOut();
        }
    });
});