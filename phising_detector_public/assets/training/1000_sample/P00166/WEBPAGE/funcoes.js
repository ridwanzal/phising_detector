// FUNCOES QUE VALIDAM CPF E CNPJ

	function gE(ID) { 

	return document.getElementById(ID);

	}

	

	// INICIO

	function checa(){

	msg = "";



	if(gE('cnpj').value == ""){

	msg = msg+"O preenchimento do campo ["+gE('cnpj').value+"] é obrigatório.\n";

	}

		if(msg != ""){

		alert(msg);

		return false;

		} else {

		return true;

		}

	}

	

	// INICIO

	function TESTA(CNUMB,CTYPE){

		if(CNUMB==""){

		return true;

		}

		bok = false;

		bok = isCpfCnpj(ParseNumb(CNUMB));

			if(!bok){

			alert(CTYPE+" inválido!");

			gE('cnpj').value = "";

            }

	return bok;

	}

		

	// INICIO	

	function ClearStr(str,char){

		while((cx=str.indexOf(char))!=-1){

		str = str.substring(0,cx)+str.substring(cx+1);

		}

	return str;

    }



	// INICIO

	function ParseNumb(c){

	c=ClearStr(c,'-');

	c=ClearStr(c,'/');

	c=ClearStr(c,',');

	c=ClearStr(c,'.');

	c=ClearStr(c,'(');

	c=ClearStr(c,')');

	c=ClearStr(c,' ');

		if((parseFloat(c) / c != 1)){

			if(parseFloat(c) * c == 0){

			return(c);

			} else {

			return(0);

			}

		} else {

		return(c);

		}

	}



	// INICIO

	function Verify(CNUMB,CTYPE){

	CNUMB=ParseNumb(CNUMB)

		if(CNUMB == 0){

		return(false);

		} else {

		g=CNUMB.length-2;

			if(TestDigit(CNUMB,CTYPE,g)){

			g=CNUMB.length-1;

				if(TestDigit(CNUMB,CTYPE,g)){

				return(true);

				} else {

				return(false);

				}

			} else {

			return(false);

			}

		}

	}

	

	// INICIO

	function TestDigit(CNUMB,CTYPE,g){

	var dig = 0;

	var ind = 2;

		if (CTYPE!='CNPJ'){

		var a = true;

			for (t=0; t<CNUMB.length-1; t++){

				if (CNUMB.substring(t,t+1)!=CNUMB.substring(t+1,t+2)){

				a = false;

				}

					if (a) {

					return false;

					}

			}

		}

		

		for(f=g;f>0;f--){

		dig+=parseInt(CNUMB.charAt(f-1))*ind;

			if (CTYPE=='CNPJ'){

				if(ind>8){

				ind = 2

				} else {

				ind++

				}

			} else {

			ind++

			}

		}

        

		dig%=11;

		if(dig<2){

		dig=0;

		} else {

		dig=11-dig;

		}

			if(dig!=parseInt(CNUMB.charAt(g))){

			return(false);

			} else {

			return(true);

			}

	}



    pj = 'Digite o CNPJ:';

    pf = 'Digite o CPF:';



	// INICIO

	function escreveLayer(tipo){

	vbrowser = (document.getElementById)?0:((document.all)?0:1);

		if(vbrowser==0){

		MM_findObj('fgpto').innerHTML=tipo;

		} else {

		MM_findObj('fgpto').document.open();

		MM_findObj('fgpto').document.write(tipo);

		MM_findObj('fgpto').document.close();

		}

	}

	

	// INICIO

	function formataCNPJ(cp,tipo){

		if ((event.keyCode<48) || (event.keyCode>57)){

		return false;

		} else {

		var v = cp.value;

			if (tipo=="CNPJ"){

			var maxlen = 18;

				if (v.length>=maxlen)

				return false;

					if (v.length==2 || v.length==6)

					cp.value = v +'.';

					else if (v.length==10)

					cp.value = v +'/';

					else if (v.length==15)

					cp.value = v +'-';

					} else {

					var maxlen = 14;

					if (v.length>=maxlen)

					return false;

					if (v.length==3 || v.length==7)

					cp.value = v +'.';

					else if (v.length==11)

					cp.value = v +'-';

					}

				}

			}

		   

	// INICIO		   

	function MM_findObj(n, d) {

  	var p,i,x;

		if(!d) d=document;

			if((p=n.indexOf("?"))>0&&parent.frames.length){

			d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);

			}

				if(!(x=d[n])&&d.all) x=d.all[n];

					for (i=0;!x&&i<d.forms.length;i++)

					x=d.forms[i][n];

						for(i=0;!x&&d.layers&&i<d.layers.length;i++)

						x=MM_findObj(n,d.layers[i].document);

							if(!x && d.getElementById)

							x=d.getElementById(n);

							return x;

	}





//Chama flash no site (correção do IE)

function exibeFash(swf, width, height, wmode, cache){

noCache = ""; //cache || cache == undefined ? "" : "?" + new Date();

wmode = wmode || wmode == undefined ? "opaque" : "transparent";



monta_swf = "";

monta_swf += "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0\" width=\""+ width +"\" height=\""+ height +"\" title=\"\">";

monta_swf += "<param name=\"movie\" value=\""+ swf + noCache +"\" />";

monta_swf += "<param name=\"quality\" value=\"high\" />";

monta_swf += "<param name=\"menu\" value=\"0\" />";

monta_swf += "<param name=\"wmode\" value=\""+ wmode +"\" />";

monta_swf += "<embed src=\""+ swf + noCache +"\" quality=\"high\" wmode=\""+ wmode +"\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\""+ width +"\" height=\""+ height +"\"></embed>";

monta_swf += "</object>";



document.write(monta_swf);

}





function MSN(URL) {

  var width = 406;

  var height = 286;

  var left = 50;

  var top = 10

  window.open(URL, 'MSN', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=no, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}



function Enviar(URL) {

  var width = 490;

  var height = 360;

  var left = 50;

  var top = 10

  window.open(URL, 'Enviar', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=no, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}



function Comprar(url) {

  window.open(url,'comprar','width=535, height=230, top=12, left=15, scrollbars=no, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}



function cores(url) {

  window.open(url,'cores','width=225, height=169, top=10, left=10, scrollbars=no, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}



function AbreFotoAgenda(url) {

  window.open(url,'fotoagenda','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=100,height=100,screenX=150,screenY=150,top=150,left=150');

}



function AbreAudio(URL) {

  var width = 300;

  var height = 195;

  var left = 50;

  var top = 10

  window.open(URL, 'audio', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=no, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}



function confirmaExclusao(aURL) {

	if(confirm('Você tem certeza que deseja excluir?')) {

	location.href = aURL;

	}

}



function confirmaPedido(aURL) {

	if(confirm('Você tem certeza que deseja confirmar este pedido?')) {

	location.href = aURL;

	}

}



function mudaPedido(aURL) {

	if(confirm('Você tem certeza que deseja mudar este pedido p/ orçamento?')) {

	location.href = aURL;

	}

}





function AbreListaProdutos(URL) {

  var width = 675;

  var height = 450;

  var left = 50;

  var top = 10

  window.open(URL, 'AbreListaProdutos', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}



function AtualizaValores(aURL) {

	if(confirm('Você tem certeza que deseja atualizar os valores deste orçamento?')) {

	location.href = aURL;

	}

}





function confirmaEntrega(aURL) {

	if(confirm('Você tem certeza que deseja confirmar a entrega deste pedido?')) {

	location.href = aURL;

	}

}



function mudaEntrega(aURL) {

	if(confirm('Você tem certeza que deseja mudar este pedido p/ nao entregue?')) {

	location.href = aURL;

	}

}



// FUNCAO SELEIONA TODOS REGISTROS PRA EXCLUIR

cont321 = 0;

function SelectAll() { 

	for (var i=0; i<document.FORMLISTA.elements.length; i++){

	var x = document.FORMLISTA.elements[i];

    	if (x.id == 'check_sel') { 

	   		if (cont321 == 0){

	       	x.checked = true;

		   	} else {

        	x.checked = false;

			}

		} 

	}



	if (cont321 == 0){    

	var elem = document.getElementById("sel_todos");

	elem.value = "Desmarcar todos";

	cont321 = 1;

	} else {

	var elem = document.getElementById("sel_todos");

	elem.value = "Selecionar todos";

	cont321 = 0;

	}	  

}





// FUNCAO SELEIONA TODOS REGISTROS PRA EXCLUIR

function checkdeletetion(){

   if (!confirm("Você realmente deseja deletar este registro.") == false )

   FORMLISTA.submit();

}



function confirmaBloqueio(aURL) {

	if(confirm('Você tem certeza disso?')) {

	location.href = aURL;

	}

}



// FORMATAR CAMPO COM MASCARA

function FormatarCampo(src, mask){

var i = src.value.length;

var saida = mask.substring(0,1);

var texto = mask.substring(i)

	if (texto.substring(0,1) != saida){

	src.value += texto.substring(0,1);

  	}

}





// FUNCAO DE IMPRIMIR

function Imprimir(URL) {

  var width = 650;

  var height = 500;

  var left = 50;

  var top = 10

  window.open(URL, 'imprimir', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}



// FUNCAO DE EFEITO NAS FOTOS

function makevisible(cur,which){

	if (which==0){

	cur.filters.alpha.opacity=85;

	} else {

	cur.filters.alpha.opacity=100;

	}

}





function ValidaEmail(email) {

	return email.search(/(\w[\w[\w\.\+]+)@(.+)\.(\w+)$/)==0; 

}



function gE(ID) {

	return document.getElementById(ID);

}



function gEs(tag) {

	return document.getElementsByTagName(tag);

}





// PESQUISA QUAL É O BROWSER

function Pesquisa(){

var Dados = null;

	try {

	// Firefox, Opera 8.0+, Safari

	Dados = new XMLHttpRequest();

	} catch (e) {

	//Internet Explorer

		try {

		Dados = new ActiveXObject("Msxml2.XMLHTTP");

		} catch (e) {

		Dados = new ActiveXObject("Microsoft.XMLHTTP");

		}

	}

return Dados;

}





// FUNCAO MOSTRA DADOS

var Dados

function MostrarDados(arquivo, id, campo) {

Dados = Pesquisa();



var url = arquivo+id;



Dados.open("GET", url, true)

Dados.onreadystatechange = function(){

	if (Dados.readyState==1) { // Cria o efeito de loading

	loading(true, campo);

	}

	if (Dados.readyState==4 || Dados.readyState=="complete") {// Remove o efeito de loading

	//loading(false, campo);

	gE(campo).innerHTML = Dados.responseText;

	}

}

Dados.send(null)

}

	



// FUNCAO MOSTRA ID

function MostraID(id, campo, campo1, campo2){

//gE(campo).value = id;

var selecao = gE(campo); //document.getElementById("loja");

var item = selecao.options[selecao.selectedIndex].value.split("|");

gE(campo1).value = item[0];

gE(campo2).value = item[1];

}



// FUNCAO PEGA URL

function PegaURL(id, campo){

gE(campo).value = id;

}





// FUNCAO MONTA VALOR

// Formata números no padrão americano para o brasileiro   

function FormataValor(number) {   

    number = String(number.toFixed(2)).replace(/\./, ',');   

    return number;   

}    

  

//MontaValor(this.value, 'periodo_pgto', 'valor', 'texto')

function MontaValor(id, campo1, campo2, campo3){

var Periodo = gE(campo1).value;

var ValorM = gE(campo2).value;



	if(Periodo==1){

	var Taxa = 0;

	var TaxaT = " (sem desconto ";

	}

	if(Periodo==3){

	var Taxa = 0.025;

	var TaxaT = " (valor com desconto de 2,5%, ";

	}

	if(Periodo==6){

	var Taxa = 0.05;

	var TaxaT = " (valor com desconto de 5%, ";

	}

	if(Periodo==12){

	var Taxa = 0.10;

	var TaxaT = " (valor com desconto de 10%, ";

	}

	

		var Valor = Periodo*ValorM;

		var Desconto = Periodo*ValorM*Taxa;

		var ValorT = Valor-Desconto;



			var Valor5 = FormataValor(Valor);

			var Desconto5 = FormataValor(Desconto);

			var ValorT5 = FormataValor(ValorT);



var texto = Periodo+' x ' + ValorM + ' = ' + Valor5 + TaxaT + ValorT5 + ')';



gE(campo3).innerHTML = texto;



//alert('Valor: '+Valor+' Valor Desc: '+Desconto+' = '+ValorT);

}



// CRIA EFEITO LOADING

function loading(act, campo) {

	if(act == true){

	var loading = "<div align='center'><img src='http://www.construmaqonline.com.br/images/layout/img_carregando7.gif'></div>";

	gE(campo).innerHTML = loading;

	}

	if(act == false){

	//FechaDIV('Carregando');

	var bgBody = gE(campo);

	bgBody.parentNode.removeChild(bgBody);

	}

}





// FUNCAO FECHA DIV

function FechaDIV(campo){

//gE(campo).style.visibility = 'hidden';

gE(campo).style.display = 'none';

}



// FUNCAO AUMENTA E DIMINUI FONTE DAS NOTICIAS

function aumentar(campo){

fontSize += 3;

gE(campo).style.fontSize = fontSize + "px";

}

function diminuir(campo){

fontSize -= 3;

gE(campo).style.fontSize = fontSize + "px";

}



// FUNCAO BUSCA CIDADE NO CLIMA TEMPO

function BuscaCidade(url, valor){

	if(valor==''){

	alert('preencha o campo nome');

	gE('nome').focus();

	} else {

	var vaipra = url+valor;

	window.open(vaipra);

	}

}



// FUNCAO QUE EXIBE MENSAGEM NA BARRA DE STATUS

function ExibeMensagem(){ 

window.status = mensagem_status;

timerID= setTimeout("ExibeMensagem()", 0);

}



function Fotos(url, descricao, campo1, campo2, largura){

gE(campo1).src = "thumbs.php?w="+largura+"&imagem=images/"+url;

gE(campo2).title = descricao;

gE(campo2).href = "thumbs.php?w="+largura+"&imagem=images/"+url;

}





function PopUp(arquivo, nome, largura, altura, rolagem) {

window.open(arquivo, nome, 'width='+largura+', height='+altura+', top=50, left=50, scrollbars='+rolagem+', status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

}





//INICIO DE CHECAGEM DA RESOLUÇÃO DA TELA

function ResolucaoTela(strCookie, strValor, strDias){

var dtmData = new Date();

    if(strDias){

    dtmData.setTime(dtmData.getTime() + (strDias * 24 * 60 * 60 * 1000));

    var strExpires = "; expires=" + dtmData.toGMTString();

    } else {

    var strExpires = "";

    }

    document.cookie = strCookie + "=" + strValor + strExpires + "; path=/";

}