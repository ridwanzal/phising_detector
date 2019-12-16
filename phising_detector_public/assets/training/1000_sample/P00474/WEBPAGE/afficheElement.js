function afficheElt(idCheckBox, idElementAffiche) {		
			if (document.getElementById(idCheckBox).checked == true){
				document.getElementById(idElementAffiche).style.display="block";
				
			} else {
			 document.getElementById(idElementAffiche).style.display="none";
			}
}

function afficheElt2CheckBox(idCheckBox1, idCheckBox2, idElementAffiche) {	
			if (document.getElementById(idCheckBox1).checked == true || document.getElementById(idCheckBox2).checked == true){
				document.getElementById(idElementAffiche).style.display="block";
				
			} else {
			 document.getElementById(idElementAffiche).style.display="none";
			}
}

//Méthode d'affichage d'une div lorsque l'une des deux checkboxes est cochée, au click sur idCheckBoxAction avec la possibilité que la seconde checkboxe n'existe pas
function afficheElt2CheckBoxAleatoires(idCheckBoxAction, idAutreCheckBox, idElementAffiche) {
			var checkBoxActionEtat = document.getElementById(idCheckBoxAction).checked;
			var autreCheckBox = document.getElementById(idAutreCheckBox);
			var autreCkeckBoxEtat;
			if(autreCheckBox == null){
				//si la seconde checkbox n'existe pas, alors elle n'est pas sélectionnée
				autreCkeckBoxEtat = false;
			}else{
				autreCkeckBoxEtat = autreCheckBox.checked;
			}
			
			if (checkBoxActionEtat || autreCkeckBoxEtat){
				document.getElementById(idElementAffiche).style.display="block";
				
			} else {
			 document.getElementById(idElementAffiche).style.display="none";
			}
}

function afficherAvertissement() {
	document.getElementById('loginIconeAttention').getElementsByTagName('img')[0].style.display = "";
	document.getElementById('loginMessageAttention').getElementsByTagName('p')[0].style.display = "";
	return true;
}
