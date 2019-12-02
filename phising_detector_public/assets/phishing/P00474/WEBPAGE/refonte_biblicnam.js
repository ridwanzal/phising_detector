
/**
 * Function permettant de contrôler le format d'un numéro de telephone français.
 * Elle formate également le numéro sous la forme 01.23.45.67.89
 */
ChampSaisieTag.controleTel = function(champ) {
	var telSaisie = champ.value;

	// regex de validation d'un num. tel. français (séparateur -. et espace
	// admis)
	var regExpFormatTel = new RegExp("^0[1-9]([-. ]?[0-9]{2}){4}$", "g");

	if (regExpFormatTel.test(telSaisie)) {
		// on enlève les éventuels séparateurs
		telSaisie = telSaisie.replace(/[-. ]/g, '');

		// on ajoute le séparateur
		var telComplet = telSaisie.substr(0, 2) + ChampSaisieTag.separateurTelephone;
		telComplet += telSaisie.substr(2, 2) + ChampSaisieTag.separateurTelephone;
		telComplet += telSaisie.substr(4, 2) + ChampSaisieTag.separateurTelephone;
		telComplet += telSaisie.substr(6, 2) + ChampSaisieTag.separateurTelephone;
		telComplet += telSaisie.substr(8, 2);

		ChampSaisieTag.champOK(champ);
		champ.value = telComplet;
	} else {
		if (telSaisie.length === 0) {
			ChampSaisieTag.champOK(champ);
		} else {
			ChampSaisieTag.erreurChamp(champ, "Le format du num&eacute;ro de t&eacute;l&eacute;phone est incorrect.");
		}
	}
};

/**
 * Function permettant de contrôler le format d'un nir.
 */
ChampSaisieTag.controleNir = function(champ) {
	var nirSaisie = champ.value;

	// regex de validation d'un nir
	var regExpFormatNir = new RegExp("^[0-9]{6}[0-9ABab][0-9]{6}$", "g");

	if (regExpFormatNir.test(nirSaisie)) {
		ChampSaisieTag.champOK(champ);
	} else {
		if (nirSaisie.length === 0) {
			ChampSaisieTag.champOK(champ);
		} else {
			ChampSaisieTag.erreurChamp(champ, "Le num&eacute;ro de s&eacute;curit&eacute; sociale n'a pas un format correct.");
		}
	}
};

/**
 * Function permettant de contrôler la date de début et la date de fin.
 */
ChampSaisieTag.controleDateDebutFin = function(champ1, champ2) {
	//on verifie que les champs sont remplis
	if(!ChampSaisieTag.isEmpty(champ2) 
		&&  !ChampSaisieTag.isEmpty(champ1)){
		//on vide les messages d'erreurs
		ChampSaisieTag.champOK(champ1);
		ChampSaisieTag.champOK(champ2);
		//on controle de nouveaux les dates (format)
		ChampSaisieTag.controleDate(champ1);
		ChampSaisieTag.controleDate(champ2);
		
		//si il n'y a pas d'erreur sur le format, on compare les dates
		if (document.getElementById(champ1.id+ChampSaisieTag.prefixIdZoneMessageErreur).innerHTML === '' 
				&& document.getElementById(champ2.id+ChampSaisieTag.prefixIdZoneMessageErreur).innerHTML === ''){
				
			var dtdebspt = champ1.value.split("/");
			var dtdeb = new Date(dtdebspt[2], dtdebspt[1]-1, dtdebspt[0]);
			var dtfinspt = champ2.value.split("/");
			var dtfin = new Date(dtfinspt[2], dtfinspt[1]-1, dtfinspt[0]);
			
			if(dtdeb>dtfin){
				ChampSaisieTag.erreurChamp(champ2, "La date de fin ne peut &ecirc;tre ant&eacute;rieure &agrave; la date de d&eacute;but."); 
			}
			
		}
	}
};


/**
 * Function permettant de contrôler que la valeur est un entier positif
 */
ChampSaisieTag.controleEntierPositif = function(champ) {
	if(!ChampSaisieTag.isEmpty(champ)){
		if(champ.value==Math.abs(parseInt(champ.value)) && Math.abs(parseInt(champ.value))>0){
			ChampSaisieTag.champOK(champ);
		} else {
			ChampSaisieTag.erreurChamp(champ, "La valeur doit &ecirc;tre un nombre entier et sup&eacute;rieur &agrave; 0."); 
		}
	}
};

/**
 * Patch pour le bug de la DDS CNAM_00121867
 * Auteur : DDST le 12/12/13
 * Version concernees : IH060601J/IH060500P, IH070000J/IH070000P
 * PATCH A SUPPRIMER SI LA VERSION DE BIBLICNAM UTILISEE EST DIFFERENTE
 */
var buggyDatePicker = DatePicker;
var DatePicker = new Class({
	Extends: buggyDatePicker,
	
	goToPreviousMonth: function () {
		if(!this.isDateOutOfRange(this.lastDateOfPreviousMonth())) {
			var currentElement = this.getCurrentElement();

			if (currentElement && this.dateFocus !== null) {
				if(this.isDateOutOfRange(this.dateFocus.decrement('month', 1))) {
					this.dateFocus = this.minDate.clone();
				}
				this.targetSelection = this.dateFocus;
				this.previous();
			} else {
				this.previous();
			}
		}
	},
	
	goToNextMonth: function () {
		if(!this.isDateOutOfRange(this.firstDateOfNextMonth())) {
			var currentElement = this.getCurrentElement();
	
			if (currentElement && this.dateFocus !== null) {
				if(this.isDateOutOfRange(this.dateFocus.increment('month', 1))) {
					this.dateFocus = this.maxDate.clone();
				}
				this.targetSelection = this.dateFocus;
				this.next();
			} else {
				this.next();
			}
		}
	},
	
	goToPreviousYear: function () {
		if(!this.isDateOutOfRange(this.previousYearDate())) {
			var currentElement = this.getCurrentElement();

			if (currentElement && this.dateFocus !== null) {
				this.targetSelection = this.dateFocus.decrement('year', 1);
				this.previousYear();

			} else {
				this.previousYear();
			}
		}
	},

	goToNextYear: function () {
		if(!this.isDateOutOfRange(this.nextYearDate())) {
			var currentElement = this.getCurrentElement();

			if (currentElement && this.dateFocus !== null) {
				this.targetSelection = this.dateFocus.increment('year', 1);
				this.nextYear();
			} else {
				this.nextYear();
			}
		}
	}
});
/**
 * FIN DU PATCH DDS CNAM_00121867
 */