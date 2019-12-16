	//supprime une valeur par défaut
	function removeDefaultValue(current, defaultValue, classname){
		if (current.value == defaultValue) {
			current.value = '';
			current.className=classname;
		}
	}
	
	//ajoute une valeur par défaut
	function addDefaultValue(current, defaultValue, classname){
		if (current.value == '') {
			current.value = defaultValue;
			current.className=classname;
		}
	}
	
   //change la couleur d'un champ input (ex: passage du gris de la valeur par défaut au noir de la saisie) 	 
   function changeTextInputColor(id, defaultValue, classname){
		for(i=0; i<document.forms[0].elements.length; i++){
			if((document.forms[0].elements[i].id.indexOf(id)!=-1) && ((document.forms[0].elements[i].value=='') || (document.forms[0].elements[i].value==defaultValue))){
				document.forms[0].elements[i].className=classname;
				document.forms[0].elements[i].value=defaultValue;
			}
		}
	}
	
	//met les attributs autocomplete à off pour les elements d'un formulaire
	function setAutoCompleteOff(form){
		form.setAttribute("autocomplete", "off");
		for(i=0; i<form.elements.length; i++){
			form.elements[i].setAttribute("autocomplete", "off");
		}
	}
	
	//passe à la case suivante si la valeur saisie est correcte
	//gere aussi les del et l'utilisation des fleches
	function Autotab(current, name, evenement) {
		var touche = window.event ? evenement.keyCode : evenement.which;
		var reg = new RegExp('^[0-9]{1}', 'g');
		var regSept = new RegExp('^[0-9aAbB]{1}', 'g');
		var next = current + 1;
		var previous = current - 1;
		if ((touche == 8) && (current!=1)){
			document.getElementById(name+previous).focus();
			document.getElementById(name+previous).value=document.getElementById(name+previous).value;
			document.getElementById(name+previous).select();
		} else {
			if(touche == 39 && (current!=13)){
				document.getElementById(name+next).focus();
				document.getElementById(name+next).select();
			} else if(touche == 37 && (current!=1)){
				document.getElementById(name+previous).focus();
				document.getElementById(name+previous).select();
			} else if ((touche == 9) && (document.getElementById(name+current).value!='')){
				document.getElementById(name+current).select();
			} else { 
				if(((document.getElementById(name+current).value!='') && (reg.test(document.getElementById(name+current).value)) && current != 7)
				   || ((document.getElementById(name+current).value!='') && (regSept.test(document.getElementById(name+current).value)) && current == 7)){
					if (current != 13){
						document.getElementById(name+next).focus();
						document.getElementById(name+next).select();
					}
				}else{ 
				   	document.getElementById(name+current).value='';
					document.getElementById(name+current).focus();
				}
			}
		}
	}
	
	//renvoie le curseur à la première case vide du nir
	function moveCursorToFirstEmptyCase(current, contexte, elementname) {
		if (document.getElementById(contexte + elementname + current).value == ''){
			for (i=1; i<current+1; i++) {
				if (document.getElementById(contexte + elementname +i).value == ''){
					document.getElementById(contexte + elementname +i).focus();
					break;
				}
			}
		} else {
			document.getElementById(contexte + elementname + current).select();
		}
	}
	
	//sépare le nir suite au coller
	function splitNir(current, contexte, elementname){
		var contenu = document.getElementById(contexte + elementname + current).value;
		if(contenu.length > 1){
			for (i=0; (i<13 && i<contenu.length); i++) {
				var next = current + i;
				document.getElementById(contexte + elementname + next).value = contenu.charAt(i);
				setTimeout(function() {document.getElementById(contexte + elementname + next).focus();}, 10);				
			}
		}
	}
	
	//valorise la longueur maximal
	function setMaxLength(elementid, max){
		for(i=0; i<document.forms[0].elements.length; i++){
			if (document.forms[0].elements[i].id.indexOf(elementid)!=-1){
				document.forms[0].elements[i].maxLength = max;
			}
		}
	}
	
	//compte les charactères d'un textarea et tronque les caractères en trop
	function countChar(idTextArea, idCountInput, max) {
	  var n = document.getElementById(idTextArea).value;
	  //gestion des retour à la ligne fin de ligne
	  var regrn = new RegExp('\r\n|\n\r', 'g');
	  var regn = new RegExp('\n|\r', 'g');
	  var regbr = new RegExp('<br>', 'g');
	  n = n.replace(regrn, "<br>");
	  n = n.replace(regn, "<br>");
	  n = n.replace(regbr, "\r\n");
	  if (mb_strlen(n) > max) { 
	    document.getElementById(idTextArea).value = n.substring(0,max);
	    document.getElementById(idTextArea).scrollTop=document.getElementById(idTextArea).scrollHeight;
	    return false;
	  } else {
	    var o = document.getElementById(idCountInput);
	    o.innerHTML = mb_strlen(n);
	  }
	}
	
	//renvoi la taille en byte d'une chaine
	function mb_strlen(str) {
	    var len = 0;
	    for(var i = 0; i < str.length; i++) {
	        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? 2 : 1;
	    }
	    return len;
	}
	
	//gestion des images bouton radio (initialisation)
	function changeRadioButton(portletContext, tailleQuestions, className) {
		for(i=0; i<tailleQuestions; i++){
			var j=0;
			while(document.getElementById(portletContext + 'radio' + i + j) != null){
				if(document.getElementById(portletContext + 'radio' + i + j).checked){
					turnImgRadio(j, portletContext + 'imgradio' +i);
				}
				document.getElementById(portletContext + 'radio' + i + j).className=className;
				j++;
			}
		}
	}
	
	//gestion des images bouton radio (changement sur le onclick)
	function turnImgRadio(indexReponse, idImgRadio) {
		var i=0;
		while(document.getElementById(idImgRadio + i) != null){
			if(i==indexReponse){
				document.getElementById(idImgRadio + i).src = document.getElementById(idImgRadio + i).src.replace('radio_off', 'radio_on');
			} else {
				document.getElementById(idImgRadio + i).src = document.getElementById(idImgRadio + i).src.replace('radio_on', 'radio_off');
			}
			i++;
		}
	}