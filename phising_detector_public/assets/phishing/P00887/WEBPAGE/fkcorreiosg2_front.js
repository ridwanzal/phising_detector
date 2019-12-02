
jQuery(function() {
    $('.fkcorreiosg2-mask-cep').mask('99999-999');
});

// Recupera o CEP atual
$(document).ready(function(){

    var cepAtual = $('#fkcorreiosg2_cep_adic_carrinho').val();

    if (typeof cepAtual != 'undefined') {
        cepAtual = cepAtual.replace(/[^0-9]/g,'');

        if (cepAtual.length == 8) {

            var linkAtual = $('#fkcorreiosg2_link_cep_adic_carrinho').attr('href');
            var novoLink = linkAtual + '&cep=' + cepAtual;

            $('#fkcorreiosg2_link_cep_adic_carrinho').attr('href', novoLink);

        }
    }

});

// Monitoramento automatico de acoes
$(document).ready(function(){

    $(document).on('keyup', 'input[name=fkcorreiosg2_cep_adic_carrinho]', function(e) {

        var cep = $(this).val();

        if (typeof cep != 'undefined') {
            cep = cep.replace(/[^0-9]/g, '');

            if (cep.length == 8) {

                var linkAtual = $('#fkcorreiosg2_link_cep_adic_carrinho').attr('href');
                var novoLink = linkAtual + '&cep=' + cep;

                $('#fkcorreiosg2_link_cep_adic_carrinho').attr('href', novoLink);

            }
        }
    });

});

