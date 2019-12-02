// permet d'afficher, masquer un bloc et de modifier le style du titre du bloc      
function show_hide(obj,bloc,titre)
{
      elt_bloc=document.getElementById(bloc);
      elt_titre=document.getElementById(titre);

      if (elt_bloc.style.display == 'none' || elt_bloc.style.display == '') {
     	    elt_bloc.style.display='block';
            elt_titre.className='deplie';
			obj.src='/PortailAS/framework/skins/assure/images/as/bt_plier2.png';
      }
      else {
            elt_bloc.style.display='none';
            elt_titre.className='plie';
            obj.src='/PortailAS/framework/skins/assure/images/as/bt_deplier2.png';
      }
}
   function change_onglet(name) {
                        document.getElementById('onglet_'+anc_onglet).className = 'ongletNonSelectionne';
                        document.getElementById('onglet_'+name).className = 'ongletSelectionne';
                        document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
                        document.getElementById('contenu_onglet_'+name).style.display = 'block';
                        anc_onglet = name;
                }
	function js_active(idAvecJs, idSansJs){
		document.getElementById(idAvecJs).className = 'affiche';
		document.getElementById(idSansJs).className = 'nonAffiche';
	}

//Fonction permettant de plier/déplier sans le bouton
// permet d'afficher, masquer un bloc et de modifier le style du titre du bloc      
function show_hide_link(bloc)
{
      elt_bloc=document.getElementById(bloc);

      if (elt_bloc.style.display == 'none' || elt_bloc.style.display == '') {
     	    elt_bloc.style.display='block';
      }
      else {
            elt_bloc.style.display='none';
      }
}

// permet d'afficher, masquer un bloc et de modifier le style du titre du bloc      
function show_hide_bloc(image,content,titre,blocmere)
{
      elt_content=document.getElementById(content);
      elt_titre=document.getElementById(titre);
      elt_image=document.getElementById(image);
      elt_blocmere = document.getElementById(blocmere);

      if (elt_content.style.display == 'none' || elt_content.style.display == '') {
     	    elt_content.style.display='block';
            elt_titre.className='deplie';
            if(elt_blocmere.className =='bleu_clair'){
            	elt_image.src='/PortailAS/framework/skins/assure/images/refonte/infosperso/blue_deplie.png';
            }else{
            	elt_image.src='/PortailAS/framework/skins/assure/images/refonte/infosperso/blanc_deplie.png';
            }
			
      }
      else {
            elt_content.style.display='none';
            elt_titre.className='plie';
           if(elt_blocmere.className =='bleu_clair'){
            	elt_image.src='/PortailAS/framework/skins/assure/images/refonte/infosperso/blue_plie.png';
            }else{
            	elt_image.src='/PortailAS/framework/skins/assure/images/refonte/infosperso/blanc_plie.png';
            }
      }
}
