
$(document).ready(function(){
    
    $('.fkcorreiosg2-fancybox').fancybox({
        hideOnContentClick: false,
        openEffect        : 'elastic',
        closeEffect       : 'elastic'
    });
    
    $(".fkcorreiosg2-fancybox").trigger("click");
    
});

function mostraRastreio(codRastreio, urlFuncoes) {

    if (codRastreio.length == 0) {
        return;
    }

    var urlFuncoesRastreio = '//' + document.domain + urlFuncoes;

    // Chama funcoes.php
    $.ajax({
        type: "POST",
        async: false,
        url: urlFuncoesRastreio,
        data: {func: "2", codRastreio: codRastreio}
    }).done(function(retorno) {

        var html = retorno.trim();

        if (html != '') {

            $.fancybox.open([{
                    type: 'inline',
                    modal: false,
                    minHeight: 30,
                    autoSize: false,
                    autoHeight: true,
                    width: 800,
                    content: html
                }],
                {
                    padding: [20, 10, 10, 10]
                }
            );
        }
    });

}