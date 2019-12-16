/********************** LIB AJAX **********************/

jx = {

	//Create a xmlHttpRequest object - this is the constructor. 

	getHTTPObject : function() {

		var http = false;

		//Use IE's ActiveX items to load the file.

		if(typeof ActiveXObject != 'undefined') {

			try {http = new ActiveXObject("Msxml2.XMLHTTP");}

			catch (e) {

				try {http = new ActiveXObject("Microsoft.XMLHTTP");}

				catch (E) {http = false;}

			}

		//If ActiveX is not available, use the XMLHttpRequest of Firefox/Mozilla etc. to load the document.

		} else if (window.XMLHttpRequest) {

			try {http = new XMLHttpRequest();}

			catch (e) {http = false;}

		}

		return http;

	},

	// This function is called from the user's script. 

	//Arguments - 

	//	url	- The url of the serverside script that is to be called. Append all the arguments to 

	//			this url - eg. 'get_data.php?id=5&car=benz'

	//	callback - Function that must be called once the data is ready.

	//	format - The return type for this function. Could be 'xml','json' or 'text'. If it is json, 

	//			the string will be 'eval'ed before returning it. Default:'text'

	load : function (url,callback,format) {

		var http = this.init(); //The XMLHttpRequest object is recreated at every call - to defeat Cache problem in IE

		if(!http||!url) return;

		if (http.overrideMimeType) http.overrideMimeType('text/xml');



		if(!format) var format = "text";//Default return type is 'text'

		format = format.toLowerCase();

		

		//Kill the Cache problem in IE.

		var now = "uid=" + new Date().getTime();

		url += (url.indexOf("?")+1) ? "&" : "?";

		url += now;



		http.open("GET", url, true);



		http.onreadystatechange = function () {//Call a function when the state changes.

			if (http.readyState == 4) {//Ready State will be 4 when the document is loaded.

				if(http.status == 200) {

					var result = "";

					if(http.responseText) result = http.responseText;

					

					if(format == "xml") result = http.responseXML;

					

					//If the return is in JSON format, eval the result before returning it.

					if(format.charAt(0) == "j") {

						//\n's in JSON string, when evaluated will create errors in IE

						result = result.replace(/[\n\r]/g,"");

						result = eval('('+result+')'); 

					}

	

					//Give the data to the callback function.

					if(callback) callback(result);

				} else { //An error occured

					if(error) error(http.status);

				}

			}

		}

		http.send(null);

	},

	init : function() {return this.getHTTPObject();}

}



/********************** LIB **********************/

lib = {



	//-----------------------------------------------//

	// SCRIPT onload de página

	//-----------------------------------------------//

	onload: function() {

		espalhelink = document.getElementById("espalhelink");

		if(espalhelink) {

			espalhelink.value = location.href;

		}

	},

	

	//-----------------------------------------------//

	// SCRIPT de Rodacionamento da TV

	//-----------------------------------------------//

	tv: {



		timeout_object: null,

		timeout: 4000,

	

		rotate: function() {

			lib.tv.timeout_object = setTimeout('lib.tv.rotation(1)',lib.tv.timeout);

		},

		

		closepubli: function() {

			clearTimeout(lib.tv.timeout_object);

			

			ul_call = document.getElementById("chamadas");

			ul_control = document.getElementById("controle");

			position_publi = 0;



			for(var i=0;i<ul_control.children.length;i++) {

				ul_control.children[i].className = "";				

			}



			for(var i=0;i<ul_call.children.length;i++) {

				ul_call.children[i].className = "";

				if(ul_call.children[i].id == "publicidade") {

					position_publi = i;

				}

			}

			if(position_publi == ul_call.children.length -1){

				ul_call.children[0].className = "ativo";

				ul_control.children[0].className = "ativo";

				lib.tv.timeout_object = setTimeout('lib.tv.rotation(1)',lib.tv.timeout);

			} else {

				ul_call.children[position_publi+1].className = "ativo";

				ul_control.children[position_publi].className = "ativo";

				lib.tv.timeout_object = setTimeout('lib.tv.rotation('+(position_publi+1)+')',lib.tv.timeout);

			}

		},

		

		change: function(number) {

			clearTimeout(lib.tv.timeout_object);

			

			ul_call = document.getElementById("chamadas");

			ul_control = document.getElementById("controle");

			position_publi = 0;

			

			for(var i=0;i<ul_control.children.length;i++) {

				ul_control.children[i].className = "";				

			}



			for(var i=0;i<ul_call.children.length;i++) {

				ul_call.children[i].className = "";

				if(ul_call.children[i].id == "publicidade") {

					position_publi = i;

				}

			}

			

			ul_control.children[number].className = "ativo";

			if(number >= position_publi){

				ul_call.children[number+1].className = "ativo";

				lib.tv.timeout_object = setTimeout('lib.tv.rotation('+(number+1)+')',lib.tv.timeout);

			} else {

				ul_call.children[number].className = "ativo";

				lib.tv.timeout_object = setTimeout('lib.tv.rotation('+(number+1)+')',lib.tv.timeout);

			}		

		},

		

		rotation: function(number) {

			ul_call = document.getElementById("chamadas");

			ul_control = document.getElementById("controle");

			class_active = null;

			next_number_control = number + 1;

			for(var i=0;i<ul_control.children.length;i++) {

				ul_control.children[i].className = "";

			}

			for(var i=0;i<ul_call.children.length;i++) {

				if(class_active != null) {

					ul_call.children[i].className = "ativo";

					if(ul_call.children[i].id == "publicidade"){

						next_number_control--;

						ul_control.children[number-1].className = "ativo";

					} else {

						ul_control.children[number].className = "ativo";

					}

					i=100;

				} else if(ul_call.children[i].className == "ativo") {

					ul_call.children[i].className = "";

					class_active = "ativo";

					if(ul_call.children.length-1 == i) {

						ul_call.children[0].className = "ativo";

						ul_control.children[0].className = "ativo";

						next_number_control = 1;

					}

				}

			}

			lib.tv.timeout_object = setTimeout('lib.tv.rotation(next_number_control)',lib.tv.timeout);

		}

	},

	

	//-----------------------------------------------//

	// SCRIPT de Captcha

	//-----------------------------------------------//

	captcha: {

		

		load: function(f_nome,f_email,f_captcha,f_captchaimg,f_enquete,f_enquete_erro) {

			

			if(f_nome){

				nome = document.getElementById(f_nome);

				

				if (nome.addEventListener) {

					nome.addEventListener("focus",function(){lib.captcha.func(f_captcha,f_captchaimg);},false);

				} else if (nome.attachEvent) {

					nome.attachEvent("onfocus",function(){lib.captcha.func(f_captcha,f_captchaimg);});

				} else {

					nome.onfocus = function(){lib.captcha.func(f_captcha,f_captchaimg);};

				}

			}

			if(f_email){

				email = document.getElementById(f_email);

				

				if (email.addEventListener) {

					email.addEventListener("focus",function(){lib.captcha.func(f_captcha,f_captchaimg);},false);

				} else if (email.attachEvent) {

					email.attachEvent("onfocus",function(){lib.captcha.func(f_captcha,f_captchaimg);});

				} else {

					email.onfocus = function(){lib.captcha.func(f_captcha,f_captchaimg);};

				}

			}

			

			if(f_enquete){

				form = document.getElementById(f_enquete).parentNode.parentNode;

				

				var enquete_opc = 0;

				var enquete_lista = new Array();

				

				for(a=0;a<form.elements.length;a++){

					if(form.elements[a].type == 'radio'){

						enquete_lista[enquete_opc] = form.elements[a];

						enquete_opc++;

					}

				}

				

				if (form.addEventListener) {

					for(e=0;e<enquete_lista.length;e++){

						enquete_lista[e].addEventListener("click",function(){lib.captcha.func_enquete(f_captcha,f_captchaimg,f_enquete_erro);},false);

					}

				} else if (form.attachEvent) {

					for(e=0;e<enquete_lista.length;e++){

						enquete_lista[e].attachEvent("onclick",function(){lib.captcha.func_enquete(f_captcha,f_captchaimg,f_enquete_erro);});

					}

				} else {

					for(e=0;e<enquete_lista.length;e++){

						enquete_lista.onclick = function(){lib.captcha.func_enquete(f_captcha,f_captchaimg,f_enquete_erro);};

					}

				}

			}

			

		},

		

		func: function(f_captcha,f_captchaimg) {

			captcha = document.getElementById(f_captcha);

			captchaimg = document.getElementById(f_captchaimg);

			captcha.style.display = "block";

			captchaimg.innerHTML = "<img src='http://kaptcha.googlecode.com/svn/wiki/images/kaptcha-example.jpg' />";						

		},

		

		func_enquete: function(f_captcha,f_captchaimg,f_enquete_erro) {

			document.getElementById(f_enquete_erro).style.display = 'none';

			lib.captcha.func(f_captcha,f_captchaimg);

		}

	},

	

	

	//-----------------------------------------------//

	// SCRIPT de carregar Estados

	//-----------------------------------------------//

	states: {

		load: function(state_select_id,city_select_id){

			

			select_state = document.getElementById(state_select_id);

			select_city = document.getElementById(city_select_id);

			

			jx.load('/r7/js/data/uf.js',function(data){

				states = eval(data);

				for(state in states) {

					select_state.options[select_state.length] = new Option(states[state][0], states[state][0]);

				}

			});

			

			if (select_state.addEventListener) {

				select_state.addEventListener("change",function(){lib.cities.load(select_city,this.options[this.selectedIndex].value.toLowerCase());},false);

			} else if (select_state.attachEvent) {

				select_state.attachEvent("onchange",function(){lib.cities.load(select_city,select_state.options[select_state.selectedIndex].value.toLowerCase());});

			} else {

				select_state.onchange = function(){lib.cities.load(select_city,this.options[this.selectedIndex].value.toLowerCase());};

			}

			

		}

	},

	

	

	//-----------------------------------------------//

	// SCRIPT de carregar Cidades

	//-----------------------------------------------//

	cities: {

		load: function(obj,uf) {

			while(obj.length > 0){

				obj.remove(obj.length-1);

			}

			obj.options[0] = new Option("Selecione a Cidade", "");

			jx.load('/r7/js/data/'+uf+'.js',function(data){

				cities = eval(data);

				for(city in cities) {

					obj.options[obj.length] = new Option(cities[city], cities[city]);

				}

			});

			obj.options[0].selected = true;

		}

	},

	

	//-----------------------------------------------//

	// SCRIPT de validar CPF

	//-----------------------------------------------//	

	validation: {

		cpf: function(cpf) {

			cpf = cpf.replace(/[\.\-]/g,"");

			var numeros, digitos, soma, i, resultado, digitos_iguais;

			digitos_iguais = 1;

			if (cpf.length < 11) {

				return false;

			}

		  	for (i = 0; i < cpf.length - 1; i++) {

				if (cpf.charAt(i) != cpf.charAt(i + 1)) {

					digitos_iguais = 0;

					break;

				}

			}

			if (!digitos_iguais) {

				numeros = cpf.substring(0,9);

				digitos = cpf.substring(9);

				soma = 0;

				for (i = 10; i > 1; i--) {

					soma += numeros.charAt(10 - i) * i;

				}

				resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

				if(resultado != digitos.charAt(0)) {

					return false;

				}

				numeros = cpf.substring(0,10);

				soma = 0;

				for(i = 11; i > 1; i--) {

					soma += numeros.charAt(11 - i) * i;

				}

				resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

				if(resultado != digitos.charAt(1)) {

					return false;

				}

				return true;

			} else {

				return false;

			}

		},

		

		email: function(email) {

			var emailRegEx = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);

			if (!emailRegEx.test(email)){

				return false;

			}

			return true;

		}

	},

	

	//-----------------------------------------------//

	// SCRIPT de Marquee

	//-----------------------------------------------//

	marquee: {

		load: function(marquee_id, marquee_tag){

			marquee_area = document.getElementById(marquee_id);

			

			marquee_tempo = 30;

			marquee_pulo = 1;

			marquee_margin = 0;

			marquee_tamanho = 0;

			

			for(i=0; i<marquee_area.getElementsByTagName(marquee_tag).length; i++){

				marquee_tamanho = marquee_tamanho + marquee_area.getElementsByTagName(marquee_tag)[i].offsetWidth;

			}

			

			//Começa o marquee

			marquee_set = setTimeout('lib.marquee.func_marquee()',700);

			

			

			if (marquee_area.addEventListener) {

				marquee_area.addEventListener("mouseover",function(){lib.marquee.func_mouseover();},false);

				marquee_area.addEventListener("mouseout",function(){lib.marquee.func_mouseout();},false);

			} else if (marquee_area.attachEvent) {

				marquee_area.attachEvent("onmouseover",function(){lib.marquee.func_mouseover();});

				marquee_area.attachEvent("onmouseout",function(){lib.marquee.func_mouseout();});

			} else {

				marquee_area.onmouseover = function(){lib.marquee.func_mouseover();};

				marquee_area.onmouseout = function(){lib.marquee.func_mouseout();};

			}

		},

		

		func_marquee: function(){

			marquee_margin = marquee_margin + marquee_pulo;

			if ( marquee_margin >= marquee_tamanho) { marquee_margin = 0; }

			marquee_area.style.marginLeft = '-'+marquee_margin+'px';

			

			//Looping para marquee

			marquee_set = setTimeout('lib.marquee.func_marquee()',marquee_tempo);

		},

		

		func_mouseover: function(){ clearTimeout(marquee_set); },		

		func_mouseout: function(){ lib.marquee.func_marquee(); }

		

	}

}



window.onload = lib.onload;



/********************** Troca Chamadas TV **********************/

var chTvSet;

var chTvTempo = 4000;

function trocaChamadaTv(x){

	clearTimeout(chTvSet);

	

	area = x.parentNode.parentNode;

	chamadas = area.getElementsByTagName('ul')[0];

	

	for(b=0; b<area.getElementsByTagName('ul').length; b++){

		if (area.getElementsByTagName('ul')[b].className == "controle" ){

			controle = area.getElementsByTagName('ul')[b];

			chTvNum = 0;

		}

	}

	

	for(a=0; a<chamadas.getElementsByTagName('li').length; a++){

		if (chamadas.getElementsByTagName('li')[a].parentNode == chamadas){

			chamadas.getElementsByTagName('li')[a].className = '';

			controle.getElementsByTagName('li')[chTvNum].className = '';

			if (controle.getElementsByTagName('li')[chTvNum] == x){

				x.className = 'ativo';

				chamadas.getElementsByTagName('li')[a].className = 'ativo';

			}

			chTvNum++;

		}

	}

	chTvSet = setTimeout('trocaChamadaTvRandom2()',chTvTempo);	

}



/***************** Troca Chamadas TV Randômico *****************/

function trocaChamadaTvRandom(){

	chTvSet = setTimeout('trocaChamadaTvRandom2()',chTvTempo);

}

function trocaChamadaTvRandom2(){

	area = document.getElementById('chamadas_tv');

	

	for(b=0; b<area.getElementsByTagName('ul').length; b++){

		if (area.getElementsByTagName('ul')[b].className == "controle" )

			controle = area.getElementsByTagName('ul')[b];

	}

	

	for(a=0; a<controle.getElementsByTagName('li').length; a++) {

		if (controle.getElementsByTagName('li')[a].className == 'ativo'){

			if (a == (controle.getElementsByTagName('li').length - 1)){

				trocaChamadaTv(controle.getElementsByTagName('li')[0]);

			}

			else{

				trocaChamadaTv(controle.getElementsByTagName('li')[a+1]);

			}

		}

	}

}

/***************************************************************/







/***************** Troca Veja Também Randômico *****************/

var vjTbTempo = 4000;

var vjTbNum = 0;

var setVejaTb;

function trocaVejaTb(seta){

	clearTimeout(setVejaTb);

	

	lista =  document.getElementById('veja_tambem').getElementsByTagName('ul')[0];

	

	for(a=0; a<lista.getElementsByTagName('li').length; a++){

		if (lista.getElementsByTagName('li')[a].className == 'ativo'){

			lista.getElementsByTagName('li')[a].className = '';

			

			if(seta==0){

				vjTbNum = a-1;

				if(vjTbNum < 0) vjTbNum = lista.getElementsByTagName('li').length-1;

				lista.getElementsByTagName('li')[vjTbNum].style.marginTop = '-21px';

			}

			else{

				vjTbNum = a+1;

				if(vjTbNum == lista.getElementsByTagName('li').length) vjTbNum = 0;

				lista.getElementsByTagName('li')[vjTbNum].style.marginTop = '21px';

			}

			

			lista.getElementsByTagName('li')[vjTbNum].className = 'ativo';

			trocaVejaTbTransicao();

			break;

		}

	}

	setVejaTb = setTimeout('trocaVejaTb()',vjTbTempo);

}

function trocaVejaTbRandom(){

	setVejaTb = setTimeout('trocaVejaTb()',vjTbTempo);

}

function trocaVejaTbTransicao(){

	lista =  document.getElementById('veja_tambem').getElementsByTagName('ul')[0];

	

	for(a=0; a<lista.getElementsByTagName('li').length; a++){

		if(lista.getElementsByTagName('li')[a].className=='ativo'){

			lista_item = lista.getElementsByTagName('li')[a];

			break;

		}

	}

	margen = Number(tiraTrecho(lista_item.style.marginTop,'px'));

	

	if(margen > 0) lista_item.style.marginTop = (margen-1)+'px';

	if(margen < 0) lista_item.style.marginTop = (margen+1)+'px';

	if(margen != 0) setVejaTbTrans = setTimeout('trocaVejaTbTransicao()',40);

	else clearTimeout(setVejaTbTrans);

}

/***************************************************************/









/************************** Troca Aba **************************/

function trocaAba(x){

	aba = x;

	abas = aba.parentNode;

	

	for(a=0; a<abas.getElementsByTagName('li').length; a++){

		abas.getElementsByTagName('li')[a].className='';

	}

	

	conteudo = 0;

	area = aba.parentNode.parentNode;

	

	for(b=0; b<area.getElementsByTagName('div').length; b++){

		if(area.getElementsByTagName('div')[b].className.indexOf('aba_conteudo') == 0 ){

			classe = area.getElementsByTagName('div')[b].className;

			if(classe.indexOf(' ativo') > 0){

				area.getElementsByTagName('div')[b].className = tiraTrecho(classe,' ativo');

			}

			if (abas.getElementsByTagName('li')[conteudo] == aba){

				area.getElementsByTagName('div')[b].className = classe+' ativo';

			}

			conteudo++;

		}

	}

	aba.className='ativo';

}





/********************* Scroll com as setas *********************/

function scrollSeta(x){

	nome = x.className;

	area = x.parentNode;

	for(a=0; a<area.getElementsByTagName('div').length ;a++){

		if ( area.getElementsByTagName('div')[a].className == 'setas_area_lista')

			area_tam = area.getElementsByTagName('div')[a].offsetWidth;

	}

	lista = area.getElementsByTagName('ul')[0];

	lista_item = lista.getElementsByTagName('li')[0].offsetWidth;

	

	lista_item_qtd = 0;

	for (i=0; i<lista.getElementsByTagName('li').length; i++){

		if (lista.getElementsByTagName('li')[i].parentNode == lista) lista_item_qtd = lista_item_qtd + 1;

	}

	lista_tam = lista_item_qtd * lista_item;

	

	lista.style.width = lista_tam + "px";

	

	if (lista.style.marginLeft == '') lista.style.marginLeft = 0;

	margin = lista.style.marginLeft;

	

	if (margin.indexOf('p') > 0) margin = Number(tiraTrecho(margin,'p'));

	

	if (nome == 'seta_proxima'){

		if (margin > (area_tam - lista_tam))

			lista.style.marginLeft = (margin-lista_item)+"px";

	}

	if (nome == 'seta_anterior'){

		if (margin < 0)

			lista.style.marginLeft = (margin+lista_item)+"px"

	}	

	

}





/*************** tira trecho da string ***************/

function tiraTrecho(string,trecho){

	if(string.indexOf(trecho)>0){

		string = string.substring(0, string.indexOf(trecho))

	}

	return string;

}



/************ funcao espalhe - glossário ************/



function fnc_espalhe (xStatus,objeto){

	if (xStatus == 1){

		document.getElementById("espalhe").style.display = "block";

	} else {

		document.getElementById("espalhe").style.display = "none";

	}

	if(objeto){

		document.getElementById("espalhe").style.position = 'absolute';

		document.getElementById("espalhe").style.paddingLeft = '0';

		document.getElementById("espalhe").style.marginLeft = '-85px';

		var atual_top = 0;

		var atual_left = 0;

		if (objeto.offsetParent) {

			while (objeto.offsetParent) {

				atual_top += objeto.offsetTop;

				atual_left += objeto.offsetLeft;

				objeto = objeto.offsetParent;

			}

		}		

		atual_top = atual_top + 50

		document.getElementById("espalhe").style.top = atual_top+'px';

		document.getElementById("espalhe").style.left = atual_left+'px';

	}

	

}





/************ funcao valida - form espalhe ************/



function ValidaFormEspalhe (){

	d = document.FormEspalhe;

    //validar nome

    if (d.nome.value == ""){

    	document.getElementById("cnome").style.display = "block";

        d.nome.focus();

        return false;

    } else { document.getElementById("cnome").style.display = "none"; }

	

	//validar email

	parte1 = d.email.value.indexOf("@");

    parte2 = d.email.value.indexOf(".");

    parte3 = d.email.value.length;

     if (!(parte1 >= 3 && parte2 >= 6 && parte3 >= 9)) {

    	document.getElementById("cemail").style.display = "block";

        d.email.focus();

        return false;

    } else { document.getElementById("cemail").style.display = "none"; }

	

	//validar nome amigo

    if (d.nomeamigo.value == ""){

    	document.getElementById("cnomeamigo").style.display = "block";

        d.nomeamigo.focus();

        return false;

    } else { document.getElementById("cnomeamigo").style.display = "none"; }

	

	//validar email

	parte1 = d.emailamigo.value.indexOf("@");

    parte2 = d.emailamigo.value.indexOf(".");

    parte3 = d.emailamigo.value.length;

     if (!(parte1 >= 3 && parte2 >= 6 && parte3 >= 9)) {

    	document.getElementById("cemailamigo").style.display = "block";

        d.emailamigo.focus();

        return false;

    } else { document.getElementById("cemailamigo").style.display = "none"; }

	

	document.getElementById("campos").style.display = "none";

	document.getElementById("sucesso").style.display = "block";

	if (confirm('Enviado com sucesso')) return false;

}



/******************** tira trecho da string ********************/

function trim(string){

	while (string.indexOf(' ')==0){

		string = string.substring(1, string.length)

	}

	return string;

}





/***************************************************************/







/************ funcao aumenta diminui fonte notícia ************/



//Specify affected tags. Add or remove from list:

var tgs = new Array( 'p', 'li');



//Specify spectrum of different font sizes:

var szs = new Array( '100%','130%','140%','150%','160%' );

var startSz = 0;



function ts( trgt,inc ) {

if (!document.getElementById) return

var d = document,cEl = null,sz = startSz,i,j,cTags;

sz += inc;

if ( sz < 0 ) sz = 0;

if ( sz > 4 ) sz = 4;

startSz = sz;



for ( a = 0; a < tgs.length; a++ ) {

		document.getElementById( trgt ).style.fontSize = szs[ sz ];

}

/*for ( a = 0; a < tgs.length; a++ ) {	

	cEl = document.getElementById( trgt ).getElementsByTagName(tgs[a]);

	for ( i = 0; i < cEl.length; i++ ) {

		document.getElementById( trgt ).getElementsByTagName(tgs[a])[i].style.fontSize = szs[ sz ];

	}

}*/

}



/** Trocar Região Clima Temnpo **/

function troca(varRegiao) {

var objeto  = document.getElementById("listaRegiao");

var regiao  = document.getElementById("varRegiao");

var regiao2 = document.getElementById("varRegiao2");



if(objeto.value!="") {

	regiao.data="r7/media/clima_tempo_sp.swf?"+varRegiao;

	regiao2.value="r7/media/clima_tempo_sp.swf?"+varRegiao;

	}

	if(objeto.value=="") {

	regiao.data="r7/media/clima_tempo_sp.swf?id=sudeste";

	regiao2.value="r7/media/clima_tempo_sp.swf?id=sudeste";

	}

}









/***************** resultado enquete *****************/

function enviarEnquete(form){

	var enquete_escolha = 0;

	for(a=0;a<form.elements.length;a++){

		if((form.elements[a].type == 'radio') && (form.elements[a].checked)){

			enquete_escolha = form.elements[a].value;

		}

	}

	if(enquete_escolha == 0){

		document.getElementById('f_opcoes_alerta').style.display = 'block';

		return false;

	}

	else{

		document.getElementById('f_opcoes_alerta').style.display = 'none';

	}

	validaCampos(form);

	if (form.captcha.parentNode.getElementsByTagName('span')[0].className != 'erro'){

		form.captcha.parentNode.style.display = 'none';

		verResultadoEnquete(form,0);

	}

	return false;

}



function verResultadoEnquete(x,botao){

	if(x.tagName == 'FORM'){

		form = x;

		fieldset = form.getElementsByTagName('fieldset')[0];

	}

	else{

		botao = x.innerHTML;

		form = x.parentNode.parentNode.parentNode.parentNode;

		fieldset = x.parentNode.parentNode.parentNode;

	}

	

	if (botao != 0){		

		for(n=0;n<form.getElementsByTagName('p').length;n++){

			if((form.getElementsByTagName('p')[n].className == 'alerta') && (form.getElementsByTagName('p')[n].innerHTML.indexOf('<!--')<0))

				form.getElementsByTagName('p')[n].innerHTML = '<!--'+ form.getElementsByTagName('p')[n].innerHTML +'-->';

		}

		if (botao.indexOf('resultado')>=0){

			form.reset();

			document.getElementById('f_opcoes_alerta').style.display = 'none';

			form.captcha.parentNode.style.display = 'none';

			form.captcha.parentNode.getElementsByTagName('span')[0].innerHTML = '';

			form.captcha.parentNode.getElementsByTagName('span')[0].className = '';

		}

	}

	

	if (fieldset.className.indexOf('resultado') < 0){ fieldset.className = 'resultado'; }

	else{ fieldset.className = ''; }

}







/***************** Funcção de Destacar *****************/

var sombra_botao;

function func_destacar(objeto){

	sombra = document.getElementById('destaque_sombra');

	

	if(objeto) { sombra_botao = objeto; }



	if (sombra.offsetWidth > 0) {

		sombra.style.width = 0;

		sombra.style.height = 0;

		sombra_botao.className = 'destacar';

		sombra_botao.innerHTML = 'destacar vídeo'

	}

	else{

		sombra.style.width = document.body.offsetWidth + 'px';

		sombra.style.height = document.body.offsetHeight + 'px';

		sombra_botao.className = 'destacado';

		sombra_botao.innerHTML = 'voltar';

	}

	

}



/***************** Destacar Galeria *****************/



function navRetratil(xNav, xStts){

	if(xStts == "abre"){

		document.getElementById("nav_sub"+xNav).style.display="block";

		document.getElementById('nav'+xNav).href="javascript:navRetratil("+xNav+", 'fecha');";

	}

	if(xStts == "fecha"){

		document.getElementById("nav_sub"+xNav).style.display="none";

		document.getElementById("nav"+xNav).href="javascript:navRetratil("+xNav+", 'abre');";

	}

}



function openVias(){

	document.getElementById("vias").style.display="block";

	parent.document.getElementById("vias").style.height="720px";

}

/***************************************************************/







/******************* Validação de Formulário *******************/

/*function campoNum(campo, e){

	var whichCode = (window.Event) ? e.which : e.keyCode;

	if( (whichCode>=96 && whichCode<=105) || (whichCode>=48 && whichCode<=57) || whichCode==9 || whichCode==8 || whichCode==16 || whichCode==46 || (whichCode>=35 && whichCode<=40) || (whichCode>=112 && whichCode<=123) ){

		return true;

	}

	else{

		return false;

	}

}*/



function campoTextFoco(x){

	if(x.value==x.title) x.value='';

}



/*** Campos Obrigatórios ***/

var radioName;

function campoObrig(x){

	span = x.parentNode.getElementsByTagName('span')[0];

	

	x.value = trim(x.value);

	

	if(x.onfocus){

		campoTextFoco(x);

	}

	

	if(x.value==''){

		span.className = 'erro';

	}

	else{

		span.className = 'ok';

		span.innerHTML = 'ok!';

	}

		

	switch (x.type){

			

		case 'checkbox':

			if(x.checked==false){

				span.className = 'erro';

				span.innerHTML = 'Aceite';

			}

			else{

				span.className = 'ok';

				span.innerHTML = 'ok!';

			}

			break;

			

		case 'radio':

			if (!radioName && (x.checked==true) ) { 

				radioName = x.name;

			}

			if(radioName != x.name){

				span.className = 'erro';

				span.innerHTML = 'Imagem inválida';

			}

			else{

				span.className = 'ok';

				span.innerHTML = 'ok!';

			}

			break;

			

		case 'select-one':

			if(x.value==''){

				span.innerHTML = 'Selecione uma opção';

			}

			break;

			

		case 'file':

			if(x.value==''){

				span.innerHTML = 'Imagem inválida';

			}

			else{

				exts = ['gif','jpg','jpeg','GIF','JPG','JPEG'];

				fOk  = false;

				for ( i = 0; i < exts.length; i++ ) {

					if ( file.value.indexOf( '.' + exts[ i ] ) != -1 ){

						fOk = true;

					}

				}

				if ( fOk == false ) {

					span.className = 'erro';

					span.innerHTML = 'Imagem inválida';

				}

			}

			break;

			

			

		default:

			if(x.value==''){

				span.innerHTML = 'Preencha o campo';

			}

			if(x.name == "data"){

				data = x.value;

				for(a=0;a<data.length;a++){

					if((data.charAt(a)=='/') || (data.charAt(a)=='-') || (data.charAt(a)=='.')){

						data = data.substring(0,data.indexOf(data.charAt(a)))+data.substring(data.indexOf(data.charAt(a))+1,data.length)

					}

				}

				dia = data.substring(0,2);

				mes = data.substring(2,4);

				ano = data.substring(4,8);

				var dataAtual = new Date();

				anoAtual = dataAtual.getFullYear();

				if( dia=='' || dia==0 || dia>31 || mes=='' || mes==0 || mes>12 || ano=='' || ano>(anoAtual-1) || ano<(anoAtual-200)){

					span.className = 'erro';

					span.innerHTML = 'Digite uma data válida.';

				}

				if(!Number(eval(x.value))){

					span.className = 'erro';

					span.innerHTML = 'Digite uma data válida.';

				}

			}

			if(x.name == "ddd"){

				ddd = x.value;

				if(ddd==''){

					span.className = 'erro';

					span.innerHTML = 'Digite o telefone completo.';

				}

				

				var codDdd = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];

				var codDddValido;

				for(d=0; d<codDdd.length; d++){

					if (ddd == codDdd[d]) {

						codDddValido = 1;

						break;

					}

				}

				if(codDddValido!=1){

					span.className = 'erro';

					span.innerHTML = 'DDD inválido.';

					span.title = 'DDD inválido.';

				}

				else{

					span.title = '';

				}

			}

			

			if( (x.name.indexOf("email")>=0) && (x.value != '') ){

				var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

				if (!x.value.match(emailRegEx)){

					span.className = 'erro';

					span.innerHTML = 'Digite um e-mail válido.';

				}

			}

			if(x.name == "cpf"){

				var cpf = x.value;

				

				for(a=0;a<cpf.length;a++){

					if((cpf.charAt(a)=='.') || (cpf.charAt(a)=='-')){

						cpf = cpf.substring(0,cpf.indexOf(cpf.charAt(a)))+cpf.substring(cpf.indexOf(cpf.charAt(a))+1,cpf.length)

					}

				}

    

				if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") { valido = 0; }

				else {					

					soma = 0;

					for(i = 0; i < 10; i ++) { soma += parseInt(cpf.charAt(i)) * (11 - i); }

					resto = 11 - (soma % 11);

					if(resto == 10 || resto == 11) { resto = 0; }					

					if(resto != parseInt(cpf.charAt(10))) { valido = 0; }

					else { valido = 1; }

				}

				

				if(valido == 0){

					span.className = 'erro';

					span.innerHTML = 'Digite um CPF válido.';

				} 

				else{

					span.className = 'ok';

					span.innerHTML = 'Ok!';

				}

			}

			

	}	

}





/*** Valida campos ***/

function validaCampos(form){

	

	if(form.elements[0].tagName == 'FIELDSET')

		primCampo = 1;

	else

		primCampo = 0;

	

	for(b=primCampo;b<form.elements.length-1;b++){

		if(form.elements[b].parentNode.getElementsByTagName('label')[0]){

			if(form.elements[b].parentNode.getElementsByTagName('label')[0].innerHTML.indexOf('*')>=0){

				if (form.elements[b].parentNode.className.indexOf('oculto')==-1){

					//form.elements[b].focus();

					campoObrig(form.elements[b]);

				}

			}

		}

	}

	

	for(c=primCampo;c<form.elements.length-1;c++){

		if(form.elements[c].parentNode.getElementsByTagName('span')[0]){

			if(form.elements[c].parentNode.getElementsByTagName('span')[0].className == 'erro'){

				form.elements[c].focus();

				return false;

			}

		}

	}

	

	/** Apenas para demostrar oque ocorre após o envio

	if ( form.action.indexOf('batepapo')>1 ) {

		window.open(form.action,'','')

		form.action='';

		form.reset();

		return true;

	}

	else {

		for(n=0;n<form.getElementsByTagName('p').length;n++){

			if(form.getElementsByTagName('p')[n].className=='alerta'){

				mensagem = form.getElementsByTagName('p')[n].innerHTML;

				form.getElementsByTagName('p')[n].innerHTML = mensagem.substring(4, mensagem.length-3);

			}

		}		

		for(d=primCampo;d<form.elements.length-1;d++){

			if(form.elements[d].parentNode.getElementsByTagName('span')[0]){

				form.elements[d].parentNode.getElementsByTagName('span')[0].className = '';

				form.elements[d].parentNode.getElementsByTagName('span')[0].innerHTML = '';

			}

		}

		form.reset();

		return false;

	}

	*/

	

	return true;

}



/***************************************************************/





/*********** Select de Formulário PAÍS/ESTADO/CIDADE ***********/

function campoSelect(x){

	form = x.parentNode.parentNode.parentNode;

	

	if (x.id == 'pais'){

		form.estado.value = '';

		form.cidade.value = '';		

		form.cidade_extrangeira.value = form.cidade_extrangeira.title;

		form.estado.parentNode.getElementsByTagName('span')[0].className ='';

		form.estado.parentNode.getElementsByTagName('span')[0].innerHTML ='';

		form.cidade.parentNode.getElementsByTagName('span')[0].className ='';

		form.cidade.parentNode.getElementsByTagName('span')[0].innerHTML ='';

		form.cidade_extrangeira.parentNode.getElementsByTagName('span')[0].className ='';

		form.cidade_extrangeira.parentNode.getElementsByTagName('span')[0].innerHTML ='';

		

		if (x.value == 36){

			form.estado.parentNode.className = 'campo';

			form.cidade.parentNode.className = 'oculto';

			form.cidade_extrangeira.parentNode.className = 'oculto';	

		}

		else if(x.value!=''){

			form.estado.parentNode.className = 'oculto';

			form.cidade.parentNode.className = 'oculto';

			form.cidade_extrangeira.parentNode.className = 'campo';

		}

		else{

			form.estado.parentNode.className = 'oculto';

			form.cidade.parentNode.className = 'oculto';

			form.cidade_extrangeira.parentNode.className = 'oculto';

		}

	}

	if (x.id == 'estado'){

		form.cidade.value = '';

		form.cidade.parentNode.getElementsByTagName('span')[0].className ='';

		form.cidade.parentNode.getElementsByTagName('span')[0].innerHTML ='';

		if (x.value != '')

			form.cidade.parentNode.className = 'campo';

		else

			form.cidade.parentNode.className = 'oculto';

	}

	campoObrig(x);

}

/***************************************************************/







/********************* mostra mensagem *********************/

function showMsg(id, action) {

    if (action=="hide") {

         document.getElementById(id).style.display = "none";

    } else {

         document.getElementById(id).style.display = "block";

		 document.getElementById("nota").style.display = "none";

    }

}



		

/****************** Form Opine *******************/



function openOpine(xForm){

	if (xForm != ""){

		document.getElementById("opine"+xForm).style.display="block";

	}

}



/**************** Resultado Conversor **************/



function showResultado(){

	document.getElementById("resposta").style.display="block";

	return false;

}



/**************** Carregar Minuto a Minuto ***********/



function openMinuto(){

	$("#content").fadeIn('slow').load('noticias_minutoaminuto.html');

	$("#fade").show();

}



/************** Validadção Quiz **********************/

function validaQuiz(x) {

	form = document.getElementById('quiz');

	fieldset = x.parentNode;

    var test;

	for(a=0; a<x.parentNode.getElementsByTagName('input').length-1; a++){

		if (x.parentNode.getElementsByTagName('input')[a].checked == true){

			test = true;

		}

	}

	

	if(test != true){ //Não passa para próxima

		x.parentNode.getElementsByTagName('span')[0].style.display = 'block';

		return false;

	}

	else{ //Passa para próxima		

		for(b=0; b<form.getElementsByTagName('fieldset').length; b++){			

			if (form.getElementsByTagName('fieldset')[b] == fieldset){

				form.getElementsByTagName('fieldset')[b].parentNode.style.display = 'none';

				form.getElementsByTagName('fieldset')[b+1].parentNode.style.display = 'block';

				$('li.nav'+[b+1]).removeClass('ativo'); 

				$('li.nav'+[b+2]).addClass('ativo');  

			}

		}

	}

	

}



/** Abrir form de rotas **/

function openRotas(){

	document.getElementById("rotas").style.display="block";

	return false;

}