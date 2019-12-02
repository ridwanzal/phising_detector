$(document).ready(function (e) {

    $('.callLightBox').click(function (e) {
        e.preventDefault();

        $('.validation-summary-errors').hide();

        $('.lb-ct').css({ 'display': 'none' });
        $('#lightbox-esqueci').css({ 'display': 'none' });
        $('body').css({ 'overflow': 'hidden' });
        $('#lightbox-esqueci').fadeIn();

    });

    //$('.callConfirm').click(function (e) {
    //    e.preventDefault();
    //    $('.lb-ct').css({ 'display': 'none' });
    //    $('.lightbox-confirmacao').css({ 'display': 'block' });
    //});

    $('.ending, .close').click(function (e) {
        e.preventDefault();

        $('.validation-summary-errors').hide();

        $('#lightbox-esqueci').fadeOut();
        $('body').css({ 'overflow-y': 'auto' });
    });

    $('#Login').mask('99999999999999');

});