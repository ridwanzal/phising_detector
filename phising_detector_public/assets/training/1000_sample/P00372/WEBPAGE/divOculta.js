$(document).ready(function(){
// Definimos aqui que por enquanto a div id="info" n�o deve aparecer. 
$('#info').hide();
// Pegamos o tamanho do campo input texto
var size  =  $('#sss6').attr("size");
// Vamos fazer alguma coisa quando come�ar a digitar.
$('#sss6').keyup(
function(){
// Tudo que for digitado sera armazenado em uma vari�vel
var entry = $(this).attr("value");
// O tamanho dela.
var current_length = $(this).attr("value").length;
// Se o nosso texto � maior que o campo input
// ele � mostrado na div id="info".
if (current_length>= size) {
$('#info').html("<strong>Voc� digitou at� agora:</strong> " + entry);
$('#info').show('fast');
}
// Caso contr�rio ela fica oculta.
else $('#info').hide('fast');
});
});