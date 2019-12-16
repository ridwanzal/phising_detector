// Méthode d'appel dynamique de l'action struts de mesure de satisfaction
function ajaxCallRemoteMesureSatiAction(actionName, etat) {	
	// 
	var functionActionUrl = '/PortailAS/mesureSatisfaction.do?method=' + actionName;
	var emplacementQuestionnaire = document.getElementById('emplacementQuestionnaire').value;
	var typeQuestionnaire = document.getElementById('typeQuestionnaire').value;
	
	//
	if (window.XMLHttpRequest)
	{	// Non-IE browsers
		req = new XMLHttpRequest();
		req.onreadystatechange = processStateChange;
		req.open('GET', functionActionUrl, true);
		testEtAffecteAttributsRequete(req, etat, emplacementQuestionnaire, typeQuestionnaire);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{	// IE
		req = new ActiveXObject('Microsoft.XMLHTTP');
		req.onreadystatechange = processStateChange;
		req.open('GET', functionActionUrl, true);
		testEtAffecteAttributsRequete(req, etat, emplacementQuestionnaire, typeQuestionnaire);
		req.send();
	}
	else {
		return; // Navigateur non compatible
	}
};

// Methode private qui traite le retour de l'appel de ajaxCallRemoteMesureSatiAction
function processStateChange() {
	if (req.readyState == 4)
	{ 	// Complete
		if (req.status == 200)
		{ 	// OK response
			if( req.responseText.contains('montrerInit;') ) {
				// Initialisation du formulaire
				var radioGroupe = document.getElementsByName("radioGroupePrecisions");
				for(var i=0; i < radioGroupe.length; i++) {
					radioGroupe[i].checked = false;
				}   
				initialiserQuestionnaireSatisfaction(req.responseText);
			}
			if( req.responseText.contains('montrerMerci;') ) {
				// Affichage du message de remerciement
				afficherMerci();
			}
			if( req.responseText.contains('montrerPrecisions;') ) {
				// Affichage des précisions d'insatisfaction
				afficherPrecisions();
			}
			if( req.responseText.contains('montrerErrEnr;') ) {
				// Affichage des précisions d'insatisfaction
				afficherErrEnr();
			}
	   	} else {
	     	// Pour le debug
	     	var divErreur = document.getElementById('divQuestSati_ErreurAucuneSelection');
	     	divErreur.style.display = '';
	   	}
	}
};

// Test puis affecte les paramètres nécessaires à la récupération du questionnaire dans le métier
function testEtAffecteAttributsRequete(requete, etatSatisfaction, emplacementQuestionnaire, typeQuestionnaire) {
	if(requete==null) {
		//alert('Une erreur est survenue lors de l\'affectation des attributs de l\'entête');
		return;
	}
	if(etatSatisfaction != null) {
		requete.setRequestHeader('etatSatisfaction', etatSatisfaction);
	}
	if(emplacementQuestionnaire != null) {
		requete.setRequestHeader('emplacementQuestionnaire', emplacementQuestionnaire);
	}
	if(typeQuestionnaire != null) {
		requete.setRequestHeader('typeQuestionnaire', typeQuestionnaire);
	}
};

// Appel de l'action struts de remerciement de l'utilisateur
function remercier(refQuestRefChoix) {
	ajaxCallRemoteMesureSatiAction('remercier', refQuestRefChoix);
};

// Affecte à la balise du bouton de validation la valeur de la référence de la précision sélectionnée
function choisirCauseInsatisfaction(refQuestRefChoix) {
	var div = document.getElementById('divQuestSati_Valider');
	
	if(div != null) {
		div.name = refQuestRefChoix;
	}else {
		// pas de div associée à la balise (voir classe action)
	}
};

// Méthode d'affichage de la zone de précision d'insatisfaction 
function afficherPrecisions() {
	// On affiche la div associée à la question secondaire et aux précisions d'insatisfaction
	document.getElementById('divQuestSati_ChoixOuv').style.display = 'none';
	document.getElementById('divQuestSati_ChoixPre').style.display = '';
	document.getElementById('divQuestSati_Merci').style.display = 'none';
	document.getElementById('divQuestSati_ErrEnr').style.display = 'none';
};

// Méthode d'affichage de la zone de remerciement
function afficherMerci() {
	// Affiche uniquement la div associée au message de remerciement
	document.getElementById('divQuestSati_ChoixOuv').style.display = 'none';
	document.getElementById('divQuestSati_ChoixPre').style.display = 'none';
	document.getElementById('divQuestSati_Merci').style.display = '';
	document.getElementById('divQuestSati_ErrEnr').style.display = 'none';
};

// Méthode d'affichage de la zone d'erreur d'enregistrement de la réponse utilisateur
function afficherErrEnr() {
	// On affiche la div associée à la question secondaire et aux précisions d'insatisfaction
	document.getElementById('divQuestSati_ChoixOuv').style.display = 'none';
	document.getElementById('divQuestSati_ChoixPre').style.display = 'none';
	document.getElementById('divQuestSati_Merci').style.display = 'none';
	document.getElementById('divQuestSati_ErrEnr').style.display = '';
};

// Méthode d'initialisation du formulaire de satisfaction
function initialiserQuestionnaireSatisfaction(pChaineInitialisationJs) {
	// Déclaration et définition des noms des div des balises
	var nomBaliseChoixOuv = 'divQuestSati_ChoixOuv';
	var nomBaliseImgSati = nomBaliseChoixOuv + '_ImgSati';
	var nomBaliseImgInsati = nomBaliseChoixOuv + '_ImgInsati';
	var nomBaliseTxtSati = nomBaliseChoixOuv + '_TxtSati';
	var nomBaliseTxtInsati = nomBaliseChoixOuv + '_TxtInsati';
	var charSeparator = ':-:';
	
	// On précharge les données passée par l'action Struts dans toutes leurs div associées
	// La chaine contient tous les couple 'balise:-:valeur;' à précharger dans les div
	var dataList = pChaineInitialisationJs.split(';');
	dataList.each( function(item, index) {
		// 
	    var fieldList = item.split(charSeparator);
	    var fieldBalise = fieldList[0]; // type du champ à précharger
	    var fieldValue = fieldList[1]; // valeur du champ à précharger
	    var fieldState = fieldList[2]; // visibilité du champ à précharger
	    var fieldQCRefs = fieldList[3]; // references des questions et choix
	    //
	    switch(fieldBalise) {
	    	case nomBaliseImgSati:
	    		//document.getElementById(nomBaliseTxtSati).style.display = 'none';
	    		document.getElementById(nomBaliseImgSati).style.display = '';
	    		document.getElementById(nomBaliseImgSati).name = fieldQCRefs;
	    		break;
	    	case nomBaliseImgInsati:
	    		//document.getElementById(nomBaliseTxtInsati).style.display = 'none';
	    		document.getElementById(nomBaliseImgInsati).style.display = fieldState;
	    		document.getElementById(nomBaliseImgInsati).name = fieldQCRefs;
	    	//	affecterValeurDiv(nomBaliseImgInsati, fieldValue, '', fieldQCRefs);
	    		break;
	    	case nomBaliseTxtSati:
	    		affecterValeurDiv(nomBaliseTxtSati, fieldValue, '', fieldQCRefs);
	    		break;
	    	case nomBaliseTxtInsati:
	    		affecterValeurDiv(nomBaliseTxtInsati, fieldValue, '', fieldQCRefs);
	    		break;
	    	default:
	    		affecterValeurDiv(fieldBalise, fieldValue, fieldState, fieldQCRefs);
	    }
	});
};

// Affecte la valeur et la visibilité d'une div en fonction de son nom
function affecterValeurDiv(nomDiv, valeurDiv, visibiliteDiv, fieldQCRefs) {
	var nomBalisePrecision = 'divQuestSati_Precision';
	var div = document.getElementById(nomDiv);
	if(div != null) {
		//
		if(nomDiv.contains(nomBalisePrecision)) {
			//alert('nomDiv:' + nomDiv);
			var divLabel = document.getElementById(nomDiv + '_label');
			divLabel.innerHTML = valeurDiv + '</br>';
			divLabel.style.display = visibiliteDiv;
			div.value = fieldQCRefs;
		}else {
			if(!valeurDiv.contains("null")) {
				div.innerHTML = valeurDiv;
				div.name = fieldQCRefs;
			}
		}
		div.style.display = visibiliteDiv;
		
	}else {
		// pas de div associée à la balise (voir classe action)
		// alert('div inconue : ' + nomDiv)
	}
};
