
function Apenas_Numeros(e, campo)

{

	var msg = "Favor digitar somente caracteres num�ricos";

	var monta = "";

	var NS = (navigator.appName == "Netscape")

	var Digit = parseInt(eval( ( (NS)?"e.which":"e.keyCode" ) ))



	if (!(Digit>47 && Digit<58 || Digit == 8 || Digit == 0 || Digit == 13))				

	{

		alert (msg);

		monta = "document.form1." + campo + ".focus();";

		eval(monta);

		return false;	

	}

	else

	{

		if (parseInt(Digit) == 13)

		{

			if(VerificaLogin() == true)

			{form1Open(window.document.form1);}

			else

			{ValidaLogin(campo);}

		}		

	}

}



function VerificaLogin()

{

	var valor = true;

	var Agencia = parseInt(document.form1.agencia.value);

	var Conta = parseInt(document.form1.conta.value);

	var Digito = parseInt(document.form1.digito.value);

	if ((isNaN(Agencia)== true)||(isNaN(Conta)== true)||(isNaN(Digito)== true)) 

	{valor = false;}

	else

	{

		if(ValidaDigito() == true)

		{valor = true;}

		else

		{valor = false;}

	}	

	return valor;

}



function ValidaLogin(campo)

{

	if (VerificaLogin() == true)

	{form1(window.document.form1);}

	else

	{

		var Agencia = parseInt(document.form1.agencia.value);

		var Conta = parseInt(document.form1.conta.value);

		var Digito = parseInt(document.form1.digito.value);

		if (isNaN(Agencia)== true)

		{

			alert("Favor preencher o campo ag�ncia");

			document.form1.agencia.focus();
return false;
		}

		else

		{

			if (isNaN(Conta)== true)

			{

				

				{alert("Favor preencher o campo conta");}

				document.form1.conta.focus();				
return false;
			}

			else

			{

				if (isNaN(Digito)== true)

				{

					

					{alert("Favor preencher o d�gito de sua conta");}

					document.form1.digito.focus();
return false;
				}

				else

				{

					alert("Informa��es inv�lidas. Por favor, verifique ag�ncia, conta e d�gito");

					document.form1.conta.focus();
return false;
				}

			}

		}	

	}

}

	

function ValidaDigito()

{

	var lsoma = 0;

	var ipeso = 2;

	var dv_informado = document.form1.digito.value;

	var dv_conta = document.form1.conta.value;

	var tam = document.form1.conta.value.length;

	var conta = new Array(tam);

	for (i=0; i<=tam; i++) 

	{conta[i] = dv_conta.substr( i, 1);}

	 while (tam > 0)

	{

		digito = conta[--tam];

		if ((digito >= 0) && (digito <= 9)) 

		{ 

			lsoma = lsoma + (digito - 0) * ipeso; 

			ipeso = ipeso + 1; 

			if (ipeso > 7) 

			{ipeso = 2;}

		} 

	}

	lsoma %= 11; 

	lsoma = 11 - lsoma;

	if ((lsoma == 11) || (lsoma == 10))

	{lsoma = 0;}

	if (parseInt(dv_informado) == parseInt(lsoma))

	{RetDig = true;}

	else

	{RetDig = false;}

	return RetDig;	

}



function Verificar() 

{



var ctrl=window.event.ctrlKey;

var tecla=window.event.keyCode; 

if (ctrl && tecla==67) {event.keyCode=0; event.returnValue=false;}

if (ctrl && tecla==86) {event.keyCode=0; event.returnValue=false;}

}



function checa_agencia(campo)

{

	switch (campo)

	{

		case "agencia" : {

			if(document.form1.agencia.value.length == 4)

			{document.form1.conta.focus();}	

			break;

		}

		case "conta" : {

			if(document.form1.conta.value.length == 7)

			{document.form1.digito.focus();}

			break;

		}

	}	

}



ns = document.layers ? 1 : 0;

ie = document.all ? 1 : 0;

oldId = "Layer1";



function seguranca_b()

{

	window.open('../../hotsite/tut_TanCode/index.html','Seguranca', 'width='+800+', height='+600+', top='+0+', left='+0+', scrollbars=no,status=no, toolbar=no, location=no, directories=no, menubar=no,resizable=no, fullscreen=no');

}



function ProcuraObjeto(n, d) 

{ 

	var p,i,x;  

	if(!d) d=document; 

	

	if((p=n.indexOf("?"))>0&&parent.frames.length) 

	{

		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);

	}

	

	if(!(x=d[n])&&d.all) x=d.all[n]; 

	

	for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];



	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=ProcuraObjeto(n,d.layers[i].document);

	

	if(!x && document.getElementById) x=parent.conteudo.document.getElementById(n); return x;

}





function controle() 

{

	var i,p,v,obj,args=controle.arguments;

	

	for (i=0; i<(args.length-2); i+=3) 

	if ((obj=ProcuraObjeto(args[i]))!=null) 

	{ 

		v=args[i+2];

		

		if (obj.style) 

		{ 

			obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; 

		}

		

		obj.visibility=v; 

	}

}

function lyrVisual(id,estado)

{

	try

	{

		if (navigator.appName == "Netscape") {		

			opcao = (estado) ? "show" : "hide";			

			controle(id,'',opcao);		

		}

		else{

			opcao = (estado) ? "visible" : "hidden";

			parent.conteudo.document.all[oldId].style.visibility = "hidden";

			parent.conteudo.document.all[id].style.pixelTop = parent.conteudo.document.body.scrollTop;

			parent.conteudo.document.all[id].style.visibility = opcao;

			oldId = id.toString()

		}

	}

	catch(e)

	{}

}



function mOut(src,clrIn)

{

	if (!src.contains(event.toElement)) {

	  src.style.cursor = 'default';

	  src.bgColor = clrIn;

	}

}



function onMouseOut()

{

	parent.lyrVisual('Layer1',0)

}

var tempo



