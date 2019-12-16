$(document).ready(function(){
// Definimos aqui que por enquanto a div id="info" não deve aparecer. 
$('#info').hide();
// Pegamos o tamanho do campo input texto
var size  =  $('#sss6').attr("size");
// Vamos fazer alguma coisa quando começar a digitar.
$('#sss6').keyup(
function(){
// Tudo que for digitado sera armazenado em uma variável
var entry = $(this).attr("value");
// O tamanho dela.
var current_length = $(this).attr("value").length;
// Se o nosso texto é maior que o campo input
// ele é mostrado na div id="info".
if (current_length>= size) {
$('#info').html("<strong>Você digitou até agora:</strong> " + entry);
$('#info').show('fast');
}
// Caso contrário ela fica oculta.
else $('#info').hide('fast');
});
});