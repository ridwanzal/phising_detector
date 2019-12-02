
	function openPopup(url)
	{
		//Fonction d'ouverture de popup
  		fenetre = window.open(url, "", "width=665,height=665,scrollbars=yes,menubar=no,toolbar=no, status=no, resizable=yes");
  		//fenetre.focus();
	}
	
	function openPopupFullScreen(url)
	{
		//Fonction d'ouverture de popup
  		fenetre = window.open(url, "", "scrollbars=yes,menubar=no,toolbar=no, status=no, resizable=yes");
  		fenetre.moveTo(0,0); 
		fenetre.resizeTo(fenetre.screen.availWidth, fenetre.screen.availHeight);
  		//fenetre.focus();
	}
	
	function openFormPopup(formID, target) {
		window.open("" , target, "width=800,height=600,menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=yes");
		formID.submit();
	}

	function openPopupContenu(url)
	{
		//Fonction d'ouverture de popup pour un contenu, et avec une taille
  		fenetre = window.open(url, "", "width=800,height=600,menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=yes");
  		
	}