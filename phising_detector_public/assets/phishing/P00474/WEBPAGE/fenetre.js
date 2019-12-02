var IsIE=!!document.all, fond, fenetre, fondFrame, timer;

function getStyleProperty(element, styleProperty){
    var prop = "";
	
	if(window.getComputedStyle){
		prop = window.getComputedStyle(element,null).getPropertyValue(styleProperty);
	} else {
		prop = element.currentStyle[styleProperty];
	}
	
    return prop;
}

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function afficher_fenetre(nom){
	fond = document.getElementById('fond'+nom);
	fenetre = document.getElementById('fenetre'+nom);
	
	var largeurNav = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var hauteurNav = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	largeurNav = Math.max(document.body.offsetWidth, largeurNav);
	hauteurNav = Math.max(document.body.offsetHeight, hauteurNav);
	
	affiche_fenetre(fond, fenetre, hauteurNav, largeurNav, 0, 0);
}

function afficher_fenetre_body(nom){
	fond = document.getElementById('fond'+nom);
	fenetre = document.getElementById('fenetre'+nom);
	
	var largeurNav = document.body.offsetWidth;
	var hauteurNav = document.body.offsetHeight;
	
	var header = document.getElementById('Header');
	
	var positionGauche = header.offsetLeft;
	var positionTop = document.body.offsetTop + getStyleProperty(document.body, 'margin-top').replace("px","");
	
	affiche_fenetre(fond, fenetre, hauteurNav, largeurNav, positionTop, positionGauche);
}

function affiche_fenetre(fond, fenetre, hauteurNav, largeurNav, positionTop, positionGauche){
	var largeurF = fenetre.style.width;
	var posX = positionGauche + Math.round((parseInt(largeurNav) - parseInt(largeurF))/2);
	fenetre.style.left = posX + 'px';
	fond.style.top = positionTop + 'px';
	fond.style.left = positionGauche + 'px';
	fond.style.width = largeurNav + 'px';
	fond.style.height = hauteurNav + 'px';

	if(IsIE){
		if(isIE () <= 9){
			fenetre.position = 'absolute';
			fond.style.filter='alpha(opacity=0)';
			fond.filters[0].opacity=0;
			fenetre.style.filter='alpha(opacity=0)';
			fenetre.filters[0].opacity=0;
		}
		else{
			fond.style.opacity=0;
			fenetre.style.opacity=0;
		}
	}else{
		fond.style.opacity=0;
		fenetre.style.opacity=0;
	} 
	
	fond.style.display = 'block';
	fenetre.style.display = 'block';	
	
	var i=0;
	timer = setInterval(function(){
		if(i==100){
			clearInterval(timer);
			timer = false;
			if(IsIE){
				if(isIE () <= 9){
					fond.filters[0].opacity = i*0.75;
					fenetre.filters[0].opacity = i*1;
					fenetre.style.filter='';
					fenetre.style.behavior = 'url(/PortailAS/framework/skins/assure/js/PIE.htc)';
					}
				else{
					fond.style.opacity=(i/100)*0.75;
					fenetre.style.opacity=(i/100)*1;
				}
			}else{
				fond.style.opacity=(i/100)*0.75;
				fenetre.style.opacity=(i/100)*1;
			}
		}else{
			if(IsIE){
				if(isIE () <= 9){
					fond.filters[0].opacity = i*0.75;
					fenetre.filters[0].opacity = i*1;
				}else{
					fond.style.opacity=(i/100)*0.75;
					fenetre.style.opacity=(i/100)*1;
				}
			}else{
				fond.style.opacity=(i/100)*0.75;
				fenetre.style.opacity=(i/100)*1;
			}
			i=Math.min(i+8, 100);
		}
	}, 1);
/*
	if(IsIE){
		var fondFrame = document.getElementById("theFrame");
		if(fondFrame){
			fondFrame.parentNode.removeChild(fondFrame);
		}else{
			var fondFrame = document.createElement("iframe");
			fondFrame.id = "theFrame";
			with(fondFrame.style){
				position= "static";
				width = fond.offsetWidth+"px";
				height = fond.offsetHeight+"px";
				top = fond.offsetTop+"px";
				left = fond.offsetLeft+"px";
				zIndex = "10";
				filter = "mask()";
			}			
			document.body.appendChild(fondFrame);
		}
	}
*/
}

function fermer_fenetre(){
	var i=100;
	if(!timer){
		timer = setInterval(function(){
			if(i==0){
				clearInterval(timer);
				fond.style.display = 'none';
				fenetre.style.display = 'none';
				/*document.body.removeChild(document.getElementById('theFrame'));*/
			}
			if(IsIE){
				if(isIE () <= 9){
					if(i==100){
						fenetre.style.filter='alpha(opacity=100)';
						fenetre.filters[0].opacity=100;
						fenetre.style.behavior = '';
					}
					fond.filters[0].opacity = i*0.75;
					fenetre.filters[0].opacity = i;
				}else{
					fond.style.opacity=(i/100)*0.75;
					fenetre.style.opacity = i/100;
				}
			}
			else{
				fond.style.opacity=(i/100)*0.75;
				fenetre.style.opacity = i/100;
			}
			i = Math.max(i-8,0);
		}, 1);
	}
}



