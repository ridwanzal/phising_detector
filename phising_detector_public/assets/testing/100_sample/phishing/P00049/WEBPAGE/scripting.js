/* ######################################################################

		FUNCIONES DE USO GENERAL
		
###################################################################### */

function isDefined(variable) {
    return (typeof(window[variable]) == "undefined")?  false: true;
}

function scrolltop() {
	jQuery('html, body').animate({scrollTop: 0}, 100);
}

function loading(div) {
	if (div == '#contingut') {
		jQuery('#similares-container').remove();
		jQuery('#similares-marca-container').remove();
	}
	jQuery(div).html("<div style='text-align:center;margin-top:35px;'><span class='loading'></span><img src='img/loading.gif' width='20' style='position:relative;margin-left:8px;top:3px;'/></div>");
}

function loading_span(span) {
	jQuery(span).html("<img src='img/loading.gif' width='20' />");
}


/* ######################################################################

		VARIABLES GLOBALES
		
###################################################################### */

var windowheight = jQuery(window).height();
var windowwidth = jQuery(window).width();
var altura_capsalera=390;

var scroll_anterior=0;

var total_carrito = 0;
var actualizar_carrito_post_compra = false;

/* controlamos cuando llamamos a agregar_carrito(0,0,0) para corregir un efecto raro a la primera llamada a agregar al carrito */
var efecto_raro_carrito = false;

var pedido_en_tramite=false;
var menu_smart=false;
var portes_por = 'PROVINCIAS'; /* PROVINCIAS o PAISES */

var num_favoritos_color_0 = '#000';
var num_favoritos_color_1 = '#449D44';
var background_favoritos_activo = '#F3EECE';

var facebook_pageId = '1631475793789837';
var facebook_appId = '950304635049299';
var facebook_login=false;
var mostrar_fbPagePlugin=false;

if (issmartphone()) {
	facebook_login = false;
}


/* ######################################################################

		DOCUMENT READY & WINDOW LOAD - FIN CARGA DOM
		
###################################################################### */

jQuery.noConflict();

jQuery(window).load(function() {
	jQuery('.zoom-container').height(jQuery('.zoom-container').height());
});

jQuery(document).ready(function($) {
	
	/* Zoom imagen */
	
	jQuery(".zoom-container").mousemove(function(e){
		
		var parentOffset = $(this).parent().offset(); 
		var relX = e.pageX - parentOffset.left;
		var relY = e.pageY - parentOffset.top;
		
		relX = -1 * (relX / 2);
		relY = -1 * (relY / 2);
		
		jQuery('.zoom-container').addClass('hover');
		
    	jQuery('.zoom-container img').css({
	    		'left' : relX,
	    		'top' : relY,
	    		'transform' : 'scale(2)',
				'-moz-transform' : 'scale(2)',
				'-webkit-transform' : 'scale(2)',
				'-o-transform' : 'scale(2)',
				'-ms-transform' : 'scale(2)'
	    	});
    
    });
	
	jQuery(".zoom-container").mouseout(function(e){
		
		jQuery('.zoom-container').removeClass('hover');
		jQuery('.zoom-container img').css({
	    		'left' : 0,
	    		'top' : 0,
	    		'transform' : 'scale(1)',
				'-moz-transform' : 'scale(1)',
				'-webkit-transform' : 'scale(1)',
				'-o-transform' : 'scale(1)',
				'-ms-transform' : 'scale(1)'
	    	});
		
    });
	
	/* VARIOS ********************************* */
	
	agregar_carrito(0,0,0);
	recompte_seleccio_articles();
	
	if (actualizar_carrito_post_compra == true) {
		/* Actualizar carrito post compra paypal porque salia el pedido con los artículos por no estar sincronizado con la Op. Host-Host */
		setTimeout(function(){ jQuery('#botones-tienda').load('https://www.boets.es/commons/botons_header_shop.php?idioma=1&jquery_load=1'); }, 6000); 
	}
	
	/* COMPRAR EN LISTA - NO ACTIVO
	jQuery('.interaccio-articulo').click(function() {
        var id = parseInt(jQuery(this).attr("data-item-id"));
        var marca = (jQuery(this).attr("data-item-brand"));
        var title = (jQuery(this).attr("data-item-title"));
        var description = (jQuery(this).attr("data-item-description"));
        var preu = parseFloat(jQuery(this).attr("data-item-price"));
        var preu_rebaixat = parseFloat(jQuery(this).attr("data-item-offer-price"));
        var descompte = parseInt(jQuery(this).attr("data-item-discount"));
        var ssrrcc = (jQuery(this).attr("data-item-image"));
        var enlace = (jQuery(this).attr("data-item-link"));
        modal_comprar_en_lista (id, title, marca, description, ssrrcc, preu, preu_rebaixat, descompte, enlace, true)
    });
    */
	
	/*
	var h=jQuery(window).height();
	h = h - jQuery("#header").height() - jQuery("#footer").height();
	jQuery("#contingut").css("min-height", h);
	*/
	
	jQuery('.dropdown-toggle').dropdown();
	jQuery('#lista-carrito').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
	
	if (!issmartphone()) {
		jQuery('[data-toggle="tooltip"]').tooltip();
	}
	
	/* Herramientas de búsqueda listado */
	jQuery("#slider-preus").slider({});
	
	jQuery('#slider-preus').slider().on('slideStop', function(ev){
		aplicar_filtros_precios();
	});
	
	/* jQuery("#contingut .articulo img").addClass('alpha'); */
	
	if (jQuery('select#color option').length == 1) {
		jQuery('#color-list-group').fadeOut(0);
	}
	
	if (jQuery('#color').length > 0) {
		if (jQuery("#color option:selected").val()!="---") {
			talles_color_seleccionat(idArticle, 'form-control', jQuery("#color option:selected").val(), false);
		}
	}	
	
	if (jQuery('select#talla option').length == 1) {
		/*
		Lo hacemos en talles_-color_seleccionat()	
		jQuery('#select-talla-container').fadeOut(0);
		*/
	}
	
	if (jQuery('#slide-campaigns').length) {
		if (jQuery('#slide').height() > 1) {
			jQuery('#slide-campaigns').height(jQuery('#slide').height());
			jQuery('#slide-campaigns .item').height(jQuery('#slide').height());
		} else {
			jQuery('#slide-campaigns').height( (jQuery(window).width()/4) * 3 );
			jQuery('#slide-campaigns .item').height( (jQuery(window).width()/4) * 3 );
		}
	}
		
	if ( issmartphone() ) {
		
		if (jQuery('#easy-menu-smartphones').length == 1) {
			jQuery('#easy-menu-smartphones').height(jQuery(window).height() - 50);
		}
		
		/* Evitamos el despilfarro de espacio vertical que hace que el botón de compra quede fuera del area visible del smartphone */
		jQuery('header .navbar.navbar-default').addClass('navbar-fixed');
		jQuery('#logo-container').fadeOut(0);
		jQuery('#content-all').css('padding-top', '35px');
		
		var s = '';
		s = '<div id="menu-smartphones"></div>';
		jQuery('body').prepend(s);
		
		constructmenu_smart();
		
		jQuery("#content-all").click(function() {
			
			hidemenu_smart();
			
		});
		
		jQuery("#boton-menu").click(function(event) {
			event.preventDefault();
			showmenu_smart();
		});
				
	}
	
	/* WINDOW RESIZE ************************** */
	
	jQuery( window ).resize(function() {
		
		if (jQuery(window).width() != windowwidth) {
						
			if (jQuery('#slide-campaigns').length) {
				jQuery('#slide-campaigns').height(jQuery('#slide').height());
			}
			
			windowwidth = jQuery(window).width();
			jQuery('.articulo .imagen-articulo').height( (jQuery('.articulo .imagen-articulo').width()/4) * 3);
			if (issmartphone() && jQuery("#menu-smartphones").length == 0) {
				location.reload();
			} else if (jQuery("#bs-navbar-collapse-1").html() == "") {
				location.reload();
			}
		}
	});
	
	/* SCROLL ********************************* */
		
	jQuery(window).scroll(function() {
		/* var topi = jQuery(window).scrollTop() + 300;
		var visiblei = jQuery(window).scrollTop() + jQuery(window).height();
		 jQuery('#breadcrumb').html(topi + ' - ' + visiblei); 
		jQuery("#contingut .articulo img.alpha").each(function() {
			
			jQuery(this).parent().prepend('<div>' + jQuery(this).offset().top + '</div>');
	    	if ( (jQuery(this).offset().top <= visiblei) ) {
	        	jQuery(this).removeClass('alpha');
	    	}
    	});*/
    	
    	var limit_scroll_navbar = 70;
    	if (issmartphone()) {
	    	limit_scroll_navbar = 70;
    	}
		
		if (jQuery(window).scrollTop() >= limit_scroll_navbar) {
			if (!jQuery('header .navbar.navbar-default').hasClass('navbar-fixed') && menu_smart == false) {
				jQuery('header .navbar.navbar-default').addClass('navbar-fixed').fadeOut(0).fadeIn(400);
			}
			
			if (jQuery(window).scrollTop() >= 370) {
				
				if (jQuery('#cookie-wrapper').length) {
					cerrar_cookies();
				}
				
				if (facebook_login == true && !isLogin) {
					jQuery('#modalFacebook').modal('show');
				}
			}
			
		} else {
			if (!issmartphone()) {
				jQuery('header .navbar.navbar-default').removeClass('navbar-fixed');
			}
		}
		
	});
	
	/* FB LIKE IFRAME ************************ */
	
	/*jQuery('#fb-like-iframe').load(function () {
		jQuery(this).contents().find('.pluginButton').removeAttr('title');
	});*/
	
	/* BREADCRUMB PEDIDO OK ****************** */
	if (jQuery('#pedido-ok').length) {
		pasos_compra(5);
	}

    /* FORMATO TABLAS ****************** */
	if (jQuery('#tablas-tallas').length) {
		dar_formato_tablas_tallas();
	}
	
	/* ACTUALIZAR TALLAS PARA COLOR ÚNICO ****************** */
	if (jQuery('#color').length) {
		if (jQuery('select#color option').length == 1) {
			
			talles_color_seleccionat(idArticle, 'form-control', '---', false);
			
		}
	}
		
	/* CAROUSEL'S IMAGENES ********************************* */
	
	if (jQuery('#slide-campaigns').length) {
		jQuery('#slide-campaigns').carousel();
	}
	
	if (jQuery('#carousel-marcas').length) {
		var owl = jQuery("#carousel-marcas");
	    owl.owlCarousel({
	        loop:true,
	        margin:10,
	        items:6,
	        autoplay:true,
	        autoplayTimeout:5000,
	        autoplayHoverPause:true,
	        responsive : {
			    0 : {
				    items : 2
			    },
			    768 : {
				    items : 3
			    },
			    1400 : {
				    items : 6
			    }
			    
		    }
	    });
	}
	
	if (jQuery('#carousel-imagenes').length) {
		var owl = jQuery("#carousel-imagenes");
	    owl.owlCarousel({
	        loop:false,
	        margin:10,
	        items:6,
	        autoplay:true,
	        autoplayTimeout:5000,
	        autoplayHoverPause:true,
	        responsive : {
			    0 : {
				    items : 1
			    },
			    768 : {
				    items : 3
			    },
			    1400 : {
				    items : 5
			    }
			    
		    }
	    });
	}
	
	if (jQuery('#carousel-similares').length) {
		jQuery(".owl-carousel .articulo").removeClass("col-sm-6").removeClass("col-xs-6");
		jQuery(".owl-carousel .articulo img").css('max-height', '1000px');
		var owl = jQuery("#carousel-similares");
	    owl.owlCarousel({
	        loop:true,
	        margin:10,
	        items:6,
	        autoplay:true,
	        autoplayTimeout:5000,
	        autoplayHoverPause:true,
	        responsive : {
			    0 : {
				    items : 1
			    },
			    768 : {
				    items : 3
			    },
			    1400 : {
				    items : 3
			    }
			    
		    }
	    });
	}
	
	if (jQuery('#carousel-articulos-destacados>').length) {
		jQuery(".owl-carousel .articulo").removeClass("col-sm-6").removeClass("col-xs-6");
		jQuery(".owl-carousel .articulo img").css('max-height', '1000px');
		var owl = jQuery("#carousel-articulos-destacados");
	    owl.owlCarousel({
	        loop:true,
	        margin:10,
	        items:6,
	        autoplay:true,
	        autoplayTimeout:5000,
	        autoplayHoverPause:true,
	        responsive : {
			    0 : {
				    items : 1
			    },
			    768 : {
				    items : 5
			    },
			    1400 : {
				    items : 6
			    }
			    
		    }
	    });
	}
	
	if (jQuery('#carousel-similares-marca').length) {
		jQuery(".owl-carousel .articulo").removeClass("col-sm-6").removeClass("col-xs-6");
		jQuery(".owl-carousel .articulo img").css('max-height', '1000px');
		var owl = jQuery("#carousel-similares-marca");
	    owl.owlCarousel({
	        loop:true,
	        margin:10,
	        items:6,
	        autoplay:true,
	        autoplayTimeout:5000,
	        autoplayHoverPause:true,
	        responsive : {
			    0 : {
				    items : 1
			    },
			    320 : {
				    items : 2
			    },
			    768 : {
				    items : 4
			    },
			    1400 : {
				    items : 5
			    }
			    
		    }
	    });
	}
	
	if (jQuery('.articulo .imagen-articulo').width()) {
		jQuery('.articulo .imagen-articulo').height( (jQuery('.articulo .imagen-articulo').width()/4) * 3);
	}
	
});


/* ######################################################################

		FUNCIONES RESPONSIVE Y DISPOSITIVOS
		
###################################################################### */

function igualar_divs_altura_articulos() {
	var hMax = 0;
	var posY = -1;
	jQuery( '.articulo' ).each(function() {
		if (jQuery( this ).height() > hMax) {
			hMax = jQuery( this ).height();
		}
	});
	jQuery('.articulo').height(hMax);
}

function issmartphone() {
	var w = jQuery(window).width();
	if (w <= 768) {
		return true;
	} else {
		return false;
	}
}

function hidemenu() {
    if( issmartphone() ){
		jQuery("#boton-menu").addClass("collapsed").attr("aria-expanded","false");
		jQuery("#bs-navbar-collapse-1").removeClass("in").attr("aria-expanded","false");
	}
}

function hidemenu_smart() {
	if (menu_smart==false) { return; }
	if( issmartphone() ){
		jQuery("#menu-smartphones").fadeOut(250);
		jQuery("html, body").css("overflow-y","auto");
		jQuery("#content-all").css('overflow-y', 'auto');
		
		jQuery("#content-all").animate({
			left: "0%",
		}, 250, function() {
		  	menu_smart=false;
		});
				
		jQuery("#content-all a").unbind('click');
	}
}

function constructmenu_smart() {
	
	jQuery("#menu-smartphones").html(jQuery("#bs-navbar-collapse-1").html());
	jQuery("#bs-navbar-collapse-1").html("");
	jQuery("#search-button").html('<span class="glyphicon glyphicon-search"></span>');
	jQuery("#menu-smartphones").prepend("<div id='busca-smart'></div>");
	jQuery("#search-form").appendTo("#busca-smart");
	/*jQuery("#busca-smart").prepend("<label>Buscar</label>");*/
	jQuery("#search-button").appendTo("#search-form .form-group").first().css({"position":"relative","top":"-1px"});
	jQuery("#boton-menu").after("<div id='num-carrito2' class='pointer' onclick='tramitar_pedido();'></div>");
	jQuery("#boton-menu").fadeIn();
	
	/*jQuery('#menu-smartphones li.dropdown').removeClass('dropdown');
	jQuery('#menu-smartphones ul.dropdown-menu').removeClass('dropdown-menu').addClass('list-unstyled');*/
	
}

function showmenu_smart() {
	
	if (menu_smart == true) {
		hidemenu_smart();
		return;
	}
	
	jQuery("#menu-smartphones").fadeIn(250);
	jQuery("html, body").css("overflow-y","hidden").css("overflow-x","hidden");
	
	if (jQuery('header .navbar.navbar-default').hasClass('navbar-fixed')) {
		jQuery('#menu-smartphones').css({"padding-top":"52px"});
	} else {
		jQuery('#menu-smartphones').css({"padding-top":"0px"});
	}
	
	jQuery("#content-all").css('overflow-y', 'hidden');
	jQuery("#content-all a").click(function(e) {
	   e.preventDefault();
	});
	
	jQuery("#content-all").css("position","relative").animate({
			left: "85%",
		}, 250, function() {
		    menu_smart=true;
		});
		
}

function easy_menu_smartphone(action, id) {
	if (action == 'show') {
		
		jQuery("#menu-out-" + id).animate({
			right: "0%",
		}, 250, function() {
		  	
		});
		
	} else {
		
	}
}


/* ######################################################################

		FUNCIONES COOKIES Y LOPD
		
###################################################################### */

function cerrar_cookies() {
	jQuery.ajax({
        type: "GET",
        url: "ajax/ajax-acepta-cookies.php"

    }).done( function( response ) {

    	var obj = jQuery.parseJSON(response);
    	if(obj.error=='success'){
        	jQuery('#cookie-wrapper').fadeOut(250);
		} else if(obj.error=='error') {	
			
		}
    });
}

/* ######################################################################

		FUNCIONES FORMULARIO CONTACTO
		
###################################################################### */

function enviar_formulari_contacte(idioma_interface) {
	var error=false
	var nom=jQuery("#nombre").val()
	if (nom=='') {
		jQuery("#nombre").css("border","1px solid #ff3300");
		error=true;
	} else {
		jQuery("#nombre").css("border","1px solid #ccc");
	}
	
	var email=jQuery("#email").val()
	if (email=='') {
		jQuery("#email").css("border","1px solid #ff3300");
		error=true;
	} else {
		jQuery("#email").css("border","1px solid #ccc");
	}
	
	
 
    //Se utiliza la funcion test() nativa de JavaScript
    if(jQuery("#email").val().indexOf('@', 0) == -1 || jQuery("#email").val().indexOf('.', 0) == -1) {
        jQuery("#email").css("border","1px solid #ff3300");
		error=true;
        
    } 
	
	
	
	
	var acepta=jQuery('#acepta:checked').val();
	if (acepta!='on') {
		jQuery("#contingut").find(".politica").css("color","#ff0000");
		error=true;
	} else {
		jQuery("#contingut").find(".politica").css("color","#fff");
	}
	
	var texte=jQuery("#mensaje").val()
	if (texte=='') {
		jQuery("#mensaje").css("border","1px solid #ff3300");
		error=true;
	} else {
		jQuery("#mensaje").css("border","1px solid #ccc");
	}
	
	if (error==false) {
		jQuery("#loading").html("<img src='img/loading.gif' width='14' />")
		enviar_contacte_mail(idioma_interface);
		
	}	
}

function enviar_contacte_mail(idioma_interface) {
	
	
	var dades = jQuery('#contactform').serialize();
			  
	jQuery.ajax({
	  	type:"POST",
		url:"ajax/enviar_mail.php",
		data: dades,
		dataType:"json",
		
			
		success:function(response){			
			if(response.error=='success'){
				
				s="ampliar_apartat.php?idioma=" + idioma_interface + "&apt=CONTACTE2";
				jQuery("#contingut").load(s);
			} else {
				
				s="ampliar_apartat.php?idioma=" + idioma_interface + "&apt=CONTACTE3";
				jQuery("#contingut").load(s);
			}
		}	

	})
}


/* ######################################################################

		FUNCIONES LOGIN USUARIO
		
###################################################################### */

function suscripcion(idioma, formulario) {
	var mail=jQuery("#subscribe_email" + formulario).val();
	var datos="subscribe_email=" + mail;
	
	jQuery.ajax({
	  	type:"GET",
		url:"ajax/ajax_subscribe.php",
		data: datos,
		dataType:"json",
		beforeSend:function(){
			jQuery("#loading" + formulario).html("&nbsp;<img src='img/loading-horitzontal.gif' />").fadeIn(200);
			},
		success:function(response){			
			if(response.error=='success'){
				jQuery("#error-subscribe" + formulario).removeAttr("class").addClass("alert alert-success").html(response.msg).fadeIn(200);
				jQuery("#loading" + formulario).fadeOut(200);
			} else {
				jQuery("#error-subscribe" + formulario).removeAttr("class").addClass("alert alert-danger").html(response.msg).fadeIn(200);
				jQuery("#error-subscribe" + formulario + " a").attr("target","_blank");
				jQuery("#loading" + formulario).fadeOut(200);
			}
		}
	})
}

function auto_nombre_facturacion() {
	var nombre = jQuery("#nombre").val();
	var apellidos = jQuery("#apellidos").val();
	var s = apellidos + ", " + nombre;

	if (nombre.length>0 && apellidos.length>0) {
		jQuery("#nombre_facturacion").val(s);
	}
}

function cargar_formulario_login() {
	
	var u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + inicio_sesion + '</span></li>';
	
	jQuery("#breadcrumb").html(u);
	
	if (pedido_en_tramite == true && isLogin == true) {
		confirmar_pedido();
		return;
	}
	if (pedido_en_tramite == true) {
		pasos_compra(2);
	}
	hidemenu_smart();
	scrolltop();
	loading('#contingut');
	jQuery('#contingut').load('https://www.boets.es/login_usuario.php?accion=login');
}

function cargar_formulario_login_extendido() {
	scrolltop();
	loading('#contingut');
	pasos_compra(2);
	jQuery('#contingut').load('https://www.boets.es/login_usuario.php?accion=login-ext');
}

function cargar_formulario_registro() {
	scrolltop();
	hidemenu_smart();
	loading('#contingut');
	facebook_login = false;
	
	if(pedido_en_tramite) jQuery('#contingut').load('https://www.boets.es/login_usuario.php?accion=login-ext');
	else jQuery('#contingut').load('https://www.boets.es/login_usuario.php?accion=registro');
}

function cargar_formulario_registro_extendido() {
	scrolltop();
	loading('#contingut');
	jQuery('#contingut').load('registro_en_compra.php');
}


function cargar_datos_facturacion_pendientes() {
	scrolltop();
	
	jQuery('#contingut').html('<div class="row"><div class="col-sm-8 col-sm-offset-2">' + error_datos_fact_incompletos + '</div><div class="col-sm-8 col-sm-offset-2" id="contingut2"></div></div>');
	loading('#contingut2');
	jQuery('#contingut2').load('https://www.boets.es/includes/datos-facturacion.php?datospendientes=1');
	
}





function cargar_formulario_recordar() {
	
	var u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + recordar_contrasena + '</span></li>';
	
	jQuery("#breadcrumb").html(u);
	
	scrolltop();
	loading('#contingut');
	jQuery('#contingut').load('https://www.boets.es/login_usuario.php?accion=recordar');
}

function cargar_formulario_panel_usuario(accion) {
	var u= '';
	if (accion == 'inicio') {
		u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + panel_usuario + '</span></li>';
	} else if (accion == 'datosregistro') {
		u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + datos_registro + '</span></li>';
	} else if (accion == 'datosenvio') {
		u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + datos_envio + '</span></li>';
	} else if (accion == 'datosfacturacion') {
		u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + datos_facturacion + '</span></li>';
	} else if (accion == 'cambiarpassword') {
		u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + cambiar_contrasena + '</span></li>';
	}
	
	jQuery("#breadcrumb").html(u);
	
	pedido_en_tramite = false;
	scrolltop();
	hidemenu_smart();
	loading('#contingut');
	jQuery('#contingut').load('https://www.boets.es/panel_usuario.php?accion=' + accion);
}

function cargar_formulario_registro_en_compra() {
	scrolltop();
	loading('#contingut');
	jQuery('#contingut').load('registro_en_compra.php');
}

function login(facebook, facebook_mail, facebook_nombre, facebook_apellidos, genero) {
   	var email = jQuery('#email').val();
   	var password = jQuery('#password').val();
   	
   	scrolltop();
   	
	jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>');	

	if (facebook == 0) {
	   	if(email.length==0 || password.length==0){
	   		jQuery('#error').html('<div class="alert alert-danger">' + error_datos_login_incompletos + '</div>');
	   		return;	
	   	}
	} else {
		email = facebook_mail;
		password = '';
	}
	
	var data_set = 'email=' + email + '&password=' + password + '&facebook=' + facebook + '&nombre=' + facebook_nombre + '&apellidos=' + facebook_apellidos + '&genero=' + genero;

   	jQuery("#login-btn").prop('disabled', true);
   	
   	jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxlogin.php",
                data: data_set

            }).done( function( response ) {
                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
							jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
							loading('#contingut');
							isLogin = true;
							if (facebook == 0) {
								if (pedido_en_tramite==false) {
									jQuery('#contingut').load("panel_usuario.php");
								} else {
									pasos_compra(3);
									confirmar_pedido();
								}
							} else {
								cerrar_facebook_login();
								if (pedido_en_tramite==false) {
									jQuery('#contingut').load("panel_usuario.php");
								} else {
									pasos_compra(3);
									confirmar_pedido();
								}
							}
							jQuery("html, body").css("overflow-y","auto");
							jQuery('#botones-tienda').load('https://www.boets.es/commons/botons_header_shop.php?idioma=1&jquery_load=1');
						} else if(obj.error=='error') {	
							jQuery("#login-btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
           });	
   	
}

function logout(){  
	
	var u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + cerrar_sesion + '</span></li>';
	
	jQuery('#breadcrumb').html(u);
	
	scrolltop();
	pedido_en_tramite = false;
 	
 	scrolltop();
 	loading('#contingut');
	jQuery('#contingut').html('<div class="alert alert-info">' + cerrando_sesion + ' ...</div>');	
	   	
   	jQuery.ajax({
                url: "ajax/ajaxlogout.php"

            }).done( function( response ) {

                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
	                    	isLogin = false;
							jQuery('#contingut').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
							jQuery('#botones-tienda').load('https://www.boets.es/commons/botons_header_shop.php?idioma=1&jquery_load=1');
							
						} else if(obj.error=='error') {	
							jQuery('#contingut').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
           });	
   	
}

function recordar(){
	
	pedido_en_tramite = false;

   	var email = jQuery('#email').val();
   	jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>');	

   	if(email.length==0){
   		jQuery('#error').html('<div class="alert alert-danger">' + error_introduce_email + '</div>');
   		return;	
   	}

   	jQuery("#recordar-btn").prop('disabled', true);

   	jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxrecordar.php",
                data: {'email':email}

            }).done( function( response ) {

                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
							jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
							jQuery('#login-form').hide();
						} else if(obj.error=='error'){	
							jQuery("#recordar-btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
            });	
   	
}
	
function registro(){
	var sexo = jQuery('#sexo').val();
	var nombre = jQuery('#nombre').val();
	var apellidos = jQuery('#apellidos').val();
	var email = jQuery('#email').val();
   	var password = jQuery('#password').val();
   	var cpassword = jQuery('#cpassword').val();
	
	pedido_en_tramite = false;
   
   	jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>');	

   
   	if(nombre.length==0 || apellidos.length==0 || password.length==0 || email.length==0){
   		jQuery('#error').html('<div class="alert alert-danger">* ' + campos_obligatorios + ' ' + solo_un_minuto + '</div>');
   		return;	
    }


   	if(password!=cpassword){
   		jQuery('#error').html('<div class="alert alert-danger">' + contrasenas_no_coinciden + '</div>');
   		return;	
   	}

   	jQuery("#registro-btn").prop('disabled', true);
   	   	jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxregistro.php",
                data: {'sexo':sexo, 'nombre':nombre,'apellidos':apellidos,'email':email,'password':password,'cpassword':cpassword}

            }).done( function( response ) {

                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
							jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
							jQuery('#botones-tienda').load('commons/botons_header_shop.php?idioma=1&jquery_load=1');
							setTimeout(function() {
        					    jQuery("#contingut").load("panel_usuario.php");
    						}, 2000);  
						} else if(obj.error=='error') {	
							jQuery("#registro-btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
           });	
}

function guardadatosregistro(){
	var sexo = jQuery('#sexo').val();
	var nombre = jQuery('#nombre').val();
	var apellidos = jQuery('#apellidos').val();
	var email = jQuery('#email').val();
	
	pedido_en_tramite =false;
   
   	jQuery('#error').html('<div class="alert alert-info">Enviando...</div>');	

   
   	if(nombre.length==0 || apellidos.length==0 || email.length==0){
   		jQuery('#error').html('<div class="alert alert-danger">* ' + campos_obligatorios + '</div>');
   		return;	
    }


   	

   	jQuery("#guardar_btn").prop('disabled', true);
   	   	jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxdatosregistro.php",
                data: {'sexo':sexo, 'nombre':nombre,'apellidos':apellidos,'email':email}

            }).done( function( response ) {

                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
							 
						} else if(obj.error=='error') {	
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
           });	
}

function guardadatosenvio(){
	var nombre_envio = jQuery('#nombre_envio').val();
	var direccion_envio = jQuery('#direccion_envio').val();
	var poblacion_envio = jQuery('#poblacion_envio').val();
    var cp_envio = jQuery('#cp_envio').val();
    
    if (portes_por == 'PROVINCIAS') {
		var provincia_envio = jQuery('#provincia_envio').val();
		var pais_envio = 0;
	} else if (portes_por == 'PAISES') {
		var provincia_envio = 0;
		var pais_envio = jQuery('#pais_envio').val();
	}
	
	var telefono_envio = jQuery('#telefono_envio').val();
   
   	jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>');	
   
   	if(nombre_envio.length==0 || direccion_envio.length==0 || poblacion_envio.length==0 || cp_envio.length==0 || (provincia_envio==0 && portes_por == 'PROVINCIAS') || (pais_envio==0 && portes_por == 'PAISES') || telefono_envio.length==0){
   		jQuery('#error').html('<div class="alert alert-danger">* ' + campos_obligatorios + '</div>');
   		return;	
    }

   	jQuery("#guardar_btn").prop('disabled', true);
   	   	jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxdatosenvio.php",
                data: {'nombre_envio':nombre_envio,'direccion_envio':direccion_envio,'poblacion_envio':poblacion_envio,'cp_envio':cp_envio,'provincia_envio':provincia_envio, 'pais_envio':pais_envio,'telefono_envio':telefono_envio}

            }).done( function( response ) {
						var datospendientes = jQuery('#datospendientes').val();
                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
							 if (pedido_en_tramite == true || datospendientes=="1") { 
								confirmar_pedido();
							}
						} else if(obj.error=='error') {	
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
           });	
}

function guardadatosfacturacion(){
	var datospendientes = jQuery('#datospendientes').val();
	var nif_facturacion = jQuery('#nif_facturacion').val();
	var nombre_facturacion = jQuery('#nombre_facturacion').val();
	var direccion_facturacion = jQuery('#direccion_facturacion').val();
	var poblacion_facturacion = jQuery('#poblacion_facturacion').val();
    var cp_facturacion = jQuery('#cp_facturacion').val();
	
	if (portes_por == 'PROVINCIAS') {
		var provincia_facturacion = jQuery('#provincia_facturacion').val();
		var pais_facturacion = 0;
	} else if (portes_por == 'PAISES') {
		var provincia_facturacion = 0;
		var pais_facturacion = jQuery('#pais_facturacion').val();
	}
	
	var telefono_facturacion = jQuery('#telefono_facturacion').val();
   
   	jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>');	

   
   	if(nif_facturacion.length==0 || nombre_facturacion.length==0 || direccion_facturacion.length==0 || poblacion_facturacion.length==0 || cp_facturacion.length==0 || (provincia_facturacion==0 && portes_por == 'PROVINCIAS') || (pais_facturacion==0 && portes_por == 'PAISES') || telefono_facturacion.length==0){
   		jQuery('#error').html('<div class="alert alert-danger">* ' + campos_obligatorios + '</div>');
   		return;	
    }


   	

   	jQuery("#guardar_btn").prop('disabled', true);
   	   	jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxdatosfacturacion.php",
                data: {'nif_facturacion':nif_facturacion, 'nombre_facturacion':nombre_facturacion,'direccion_facturacion':direccion_facturacion,'poblacion_facturacion':poblacion_facturacion,'cp_facturacion':cp_facturacion,'provincia_facturacion':provincia_facturacion, 'pais_facturacion':pais_facturacion,'telefono_facturacion':telefono_facturacion}

            }).done( function( response ) {

                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
							
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
														
							if (pedido_en_tramite == true || datospendientes=="1") { 
								confirmar_pedido();
							}	
							 
						} else if(obj.error=='error') {	
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
           });	
}

function cambiarPassword(){

    var password = jQuery('#password').val();
	var newpassword = jQuery('#newpassword').val();
    var cpassword = jQuery('#cpassword').val();

    jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>'); 

   
    if(password.length==0 ||  newpassword.length==0 || cpassword.length==0){
      jQuery('#error').html('<div class="alert alert-danger"><b>Error:</b> ' + campos_obligatorios + '</div>');
      return; 
    } else if(newpassword != cpassword){
      jQuery('#error').html('<div class="alert alert-danger"><b>Error:</b> ' + contrasenas_no_coinciden + '</div>');
      return; 
    }

    jQuery("#cambiarpassword").prop('disabled', true);

    jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxcambiarpassword.php",
                data: {'password':password,'newpassword':newpassword, 'cpassword':cpassword}

            }).done( function( response ) {

                      var obj = jQuery.parseJSON(response);
                      if(obj.error=='success'){
                      jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
                      jQuery('#form').hide();
              
            }else if(obj.error=='error')
            { 
              jQuery("#cambiarpassword").prop('disabled', false);
              jQuery('#error').html('<div class="alert alert-danger"><p><b>Error:</b> '+obj.msg+'</p></div>');
            }
                 });  
    
}

function reseteaPassword(){
	var olvidapasswordkey = jQuery('#olvidapasswordkey').val();
	var newpassword = jQuery('#newpassword').val();
    var cpassword = jQuery('#cpassword').val();

    jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>'); 

   
    if(newpassword.length==0 || cpassword.length==0){
      jQuery('#error').html('<div class="alert alert-danger"><b>Error:</b> ' + campos_obligatorios + '</div>');
      return; 
    } else if(newpassword != cpassword){
      jQuery('#error').html('<div class="alert alert-danger"><b>Error:</b> ' + contrasenas_no_coinciden + '</div>');
      return; 
    }

    jQuery("#cambiarpassword").prop('disabled', true);

    jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxreseteapassword.php",
                data: {'olvidapasswordkey':olvidapasswordkey,'newpassword':newpassword, 'cpassword':cpassword}

            }).done( function( response ) {

                      var obj = jQuery.parseJSON(response);
                      if(obj.error=='success'){
                      jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
                      jQuery('#form').hide();
					  setTimeout(function() {
        					    window.location.href = "index.php";

    				 }, 2000);  
              
            }else if(obj.error=='error')
            { 
              jQuery("#cambiarpassword").prop('disabled', false);
              jQuery('#error').html('<div class="alert alert-danger"><p><b>Error:</b> '+obj.msg+'</p></div>');
            }
                 });  
    
}

function permite(elEvento, permitidos) {
  // Variables que definen los caracteres permitidos
  var numeros = "0123456789 ";
  var mincaracter = "0123456789áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZÇç@-_!¿¡?.,{}:	";
  var teclas_especiales = [8];
  // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha
 
 
  // Seleccionar los caracteres a partir del parámetro de la función
  switch(permitidos) {
    case 'num':
      permitidos = numeros;
      break;
    
	 case 'min_car':
      permitidos = mincaracter;
      break;
  }
  
  
// Obtener la tecla pulsada 
  var evento = elEvento || window.event;
  var codigoCaracter = evento.charCode || evento.keyCode;
  var caracter = String.fromCharCode(codigoCaracter);
 
  // Comprobar si la tecla pulsada es alguna de las teclas especiales
  // (teclas de borrado y flechas horizontales)
  var tecla_especial = false;
  for(var i in teclas_especiales) {
    if(codigoCaracter == teclas_especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
 
  // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
  // o si es una tecla especial
  return permitidos.indexOf(caracter) != -1 || tecla_especial;
}

function activadatosenvio(){
	
	if( jQuery('#checkdatosenvio').is(':checked') ) {
    	jQuery('#datos_envio').css('display','none');
	} else {
		jQuery('#datos_envio').css('display','block');
	}
}

function guardaregistrocompleto(){
	
	/*pedido_en_tramite = false;*/
	
	var sexo = jQuery('#sexo').val();
	var nombre = jQuery('#nombre').val();
	var apellidos = jQuery('#apellidos').val();
	var email = jQuery('#email').val();
	var password = jQuery('#password').val();
   	var cpassword = jQuery('#cpassword').val();
	
	var nif_facturacion = jQuery('#nif_facturacion').val();
	var nombre_facturacion = jQuery('#nombre_facturacion').val();
	var direccion_facturacion = jQuery('#direccion_facturacion').val();
	var poblacion_facturacion = jQuery('#poblacion_facturacion').val();
    var cp_facturacion = jQuery('#cp_facturacion').val();
	
	
	if (portes_por == 'PROVINCIAS') {
		var provincia_facturacion = jQuery('#provincia_facturacion').val();
		var pais_facturacion = 0;
	} else if (portes_por == 'PAISES') {
		var provincia_facturacion = 0;
		var pais_facturacion = jQuery('#pais_facturacion').val();
	}
	
	
	
	var telefono_facturacion = jQuery('#telefono_facturacion').val();
	
	
	if( jQuery('#checkdatosenvio').is(':checked') ) {  /* Si los datos de envío son iguales a los de facturación */
		
		var nombre_envio = nombre_facturacion;
		var direccion_envio = direccion_facturacion;
		var poblacion_envio = poblacion_facturacion;
   		var cp_envio = cp_facturacion;
		var provincia_envio = provincia_facturacion;
		var pais_envio = pais_facturacion;
		var telefono_envio = telefono_facturacion;
		
	} else {
		
		var nombre_envio = jQuery('#nombre_envio').val();
		var direccion_envio = jQuery('#direccion_envio').val();
		var poblacion_envio = jQuery('#poblacion_envio').val();
   		var cp_envio = jQuery('#cp_envio').val();
		
		if (portes_por == 'PROVINCIAS') {
			var provincia_envio = jQuery('#provincia_envio').val();
			var pais_envio = 0;
		} else if (portes_por == 'PAISES') {
			var provincia_envio = 0;
			var pais_envio = jQuery('#pais_envio').val();
		}
		
		var telefono_envio = jQuery('#telefono_envio').val();
	}
   
   	if(nombre.length==0 || apellidos.length==0 || email.length==0 || nif_facturacion.length==0 || direccion_facturacion.length==0 || poblacion_facturacion.length==0 || cp_facturacion.length==0 || (provincia_facturacion==0 && portes_por == 'PROVINCIAS') || (pais_facturacion==0 && portes_por == 'PAISES') || telefono_facturacion.length==0){
   		jQuery('#error').html('<div class="alert alert-danger">* ' + campos_obligatorios + '</div>');
   		return;	
    }

	if(password!=cpassword){
   		jQuery('#error').html('<div class="alert alert-danger">' + contrasenas_no_coinciden + '</div>');
   		return;	
   	}
	
   	jQuery('#error').html('<div class="alert alert-info">' + enviando_datos + ' ...</div>');	


   	jQuery("#guardar_btn").prop('disabled', true);
   	   	jQuery.ajax({
                type: "GET",
                url: "ajax/ajaxdatosregistrocompleto.php",
                data: {'sexo':sexo, 'nombre':nombre,'apellidos':apellidos,'email':email, 'password':password,'cpassword':cpassword, 'nif_facturacion':nif_facturacion, 'nombre_facturacion':nombre_facturacion, 'direccion_facturacion':direccion_facturacion,'poblacion_facturacion':poblacion_facturacion,'cp_facturacion':cp_facturacion,'provincia_facturacion':provincia_facturacion,'pais_facturacion':pais_facturacion,'telefono_facturacion':telefono_facturacion,'nombre_envio':nombre_envio,'direccion_envio':direccion_envio,'poblacion_envio':poblacion_envio,'cp_envio':cp_envio,'provincia_envio':provincia_envio, 'pais_envio':pais_envio,'telefono_envio':telefono_envio}

            }).done( function( response ) {

                    	var obj = jQuery.parseJSON(response);
                    	if(obj.error=='success'){
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-success"><p>'+obj.msg+'</p></div>');
							jQuery('#botones-tienda').load('https://www.boets.es/commons/botons_header_shop.php?idioma=1&jquery_load=1');
							if (pedido_en_tramite == true) {
								isLogin = true;
								confirmar_pedido();
							}
						} else if(obj.error=='error') {	
							jQuery("#guardar_btn").prop('disabled', false);
							jQuery('#error').html('<div class="alert alert-danger"><p>'+obj.msg+'</p></div>');
						}
						
           });	
}


function comprueba_datos_intro_envio(){
	
	var nombre_facturacion = jQuery('#nombre_facturacion').val();
	var direccion_facturacion = jQuery('#direccion_facturacion').val();
	var poblacion_facturacion = jQuery('#poblacion_facturacion').val();
	var cp_facturacion = jQuery('#cp_facturacion').val();
	var provincia_facturacion = jQuery('#provincia_facturacion').val();
	
	
	var telefono_facturacion = jQuery('#telefono_facturacion').val();
	
	var nombre_envio = jQuery('#nombre_envio').val();
	var direccion_envio = jQuery('#direccion_envio').val();
	var poblacion_envio = jQuery('#poblacion_envio').val();
	var cp_envio = jQuery('#cp_envio').val();
	 
	if (portes_por == 'PROVINCIAS') {
		var provincia_envio = jQuery('#provincia_envio').val();
		var pais_envio = 0;
	} else if (portes_por == 'PAISES') {
		var provincia_envio = 0;
		var pais_envio = jQuery('#pais_envio').val();
	} 
	 
	var telefono_envio = jQuery('#telefono_envio').val();
	
	
	if (nombre_facturacion.length>0 && nombre_envio.length==0)	jQuery("#nombre_envio").val(nombre_facturacion);
	if (direccion_facturacion.length>0 && direccion_envio.length==0) jQuery("#direccion_envio").val(direccion_facturacion);
	if (poblacion_facturacion.length>0 && poblacion_envio.length==0) jQuery("#poblacion_envio").val(poblacion_facturacion);
	if (cp_facturacion.length>0 && cp_envio.length==0) jQuery("#cp_envio").val(cp_facturacion);
		
	
	if (portes_por == 'PROVINCIAS') {
		if (provincia_facturacion!="0" && provincia_envio=="0") jQuery("#provincia_envio").val(provincia_facturacion);
	} else if (portes_por == 'PAISES') {
		if (pais_facturacion!="0" && pais_envio=="0") jQuery("#pais_envio").val(pais_facturacion);
	}
		
	if (telefono_facturacion.length>0 && telefono_envio.length==0) jQuery("#telefono_envio").val(telefono_facturacion);	
	
}

function abrir_facebook_login() {
	jQuery('#modalFacebook').modal('show');
	jQuery("body").addClass('modal-open');
}

function cerrar_facebook_login() {
	jQuery('#modalFacebook').modal('hide');
	jQuery("body").removeClass('modal-open').css('padding',0);
	facebook_login = false;
	jQuery.ajax({
        type: "GET",
        url: "ajax/ajax-facebook-login-control.php"

    }).done( function( response ) {

            	var obj = jQuery.parseJSON(response);
            	if(obj.error=='success'){
					if (mostrar_fbPagePlugin == true) {
						jQuery('#modalFbPagePlugin').modal('show');
						mostrar_fbPagePlugin = false;
					}
				} else if(obj.error=='error') {	
					
				}
   });
}


/* ######################################################################

		FUNCIONES TIENDA, ARTÍCULOS, TALLAS Y COLORES - PROCESO DE COMPRA
		
###################################################################### */

function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

function cargar_resultados_filtros_precios(uri) {
	
	jQuery('#contingut').load('https://www.boets.es/listado_articulos.php?filtros_precios=1&jQuery_load=1&url=' + uri);
	
}

function aplicar_filtros_precios() {
	var dades = 'min_max=' + jQuery('#slider-preus').val();
	jQuery.ajax({
        type: "GET",
        url: "ajax/ajax-filtros-precios.php",
        data: dades

    }).done( function( response ) {

    	var obj = jQuery.parseJSON(response);
    	if(obj.error=='success'){
        	loading('#contingut');
        	var uri = document.URL;
        	if (uri.indexOf('page') != -1) {
	        	uri = uri.substring(0, uri.indexOf('page')-1);
        	}
        	
			cargar_resultados_filtros_precios(uri);
		} else if(obj.error=='error') {	
			
		}
    });
}

function recompte_seleccio_articles() {
	jQuery.ajax({
        type: "GET",
        url:"ajax/ajax-favoritos.php",
        data: 'action=contar',
        dataType: 'json'

    }).done( function( response ) {
    	if(response.error=='success'){
			if (response.num==0) {
				jQuery("#num-favoritos").css("background-color", num_favoritos_color_0);
				jQuery('#num-favoritos').html(response.num);
			} else {
				jQuery("#num-favoritos").css("background-color", num_favoritos_color_1);
				jQuery('#num-favoritos').html(response.num);
			}
		}
				
   	});
	
}

function buidar_seleccio_articles() {
	jQuery("#loading-seleccio-villas").fadeIn(100).delay(2000).fadeOut(200);
	
	jQuery.ajax({
        type: "GET",
        url:"ajax/ajax-favoritos.php",
        data: 'action=vaciar',
        dataType: 'json'

    }).done( function( response ) {
    	if(response.error=='success'){
			jQuery("#num-favoritos").css("background-color", num_favoritos_color_0);
			jQuery('#num-favoritos').html(response.num);
		}
		jQuery("#loading-seleccio-villas").fadeOut(200);
				
   	});
	
}

function btn_favoritos_transparent() {
	jQuery('#btn-menu-favoritos').css('background-color','transparent');
}

function afagir_seleccio_articles(id_article) {
	jQuery("#loading-seleccio-villas").fadeIn(100).delay(2000).fadeOut(200);
	jQuery.ajax({
        type: "GET",
        url:"ajax/ajax-favoritos.php",
        data: 'action=agregar&id=' + id_article,
        dataType: 'json'

    }).done( function( response ) {

    	if(response.error=='success'){
			jQuery('#num-favoritos').html(response.num);
			jQuery('#btn-menu-favoritos').css('background-color', background_favoritos_activo);
			setTimeout('btn_favoritos_transparent()', 2500);
		}
		jQuery("#loading-seleccio-villas").fadeOut(200);
				
   });
}

function veure_seleccio_articles(idioma) {
	
		u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + articulos_favoritos + '</span></li>';
	
	jQuery("#breadcrumb").html(u);
						
	loading('#contingut');

	s="https://www.boets.es/listado_articulos.php?seleccio=1&jQuery_load=1&idioma=" + idioma;

	jQuery("#contingut").load(s);		
}

function seguir_comprando(idioma) {
	location.href = 'https://www.boets.es/';
}

function modal_comprar_en_lista (id, title, marca, description, ssrrcc, preu, preu_rebaixat, descompte, enlace, obrir_modal) {
	
	if (menu_smart == true) {
		return;
	}
	
	if (obrir_modal == true) {
		jQuery('#modalCompra').modal('show');
	}
	
	jQuery('#modalTitle').html(title + '&nbsp;<span class="label btn-brand" id="brand-title"></span>');
	jQuery('#modalDesc').html(description);
	jQuery('#modalImg').html('<img src="' + ssrrcc + '" class="img-responsive" />');
	jQuery('#selectores').load('includes/selectores-talla-color.php?id=' + id);
	jQuery('#btn-comprar-modal').attr('onclick', 'comprar_article(' + id + ')');
	jQuery('#linkFicha').attr('href', enlace);
	
	jQuery('#preu').css('text-decoration', 'none').html(number_format(preu, 2, ',', '.') + ' &euro;');
	
	if (preu_rebaixat > 0) {
		jQuery('#preu').html(number_format(preu_rebaixat, 2, ',', '.') + ' &euro;');
	}
	
	if (marca.length > 0) {
		jQuery('#brand-title').html(marca);
	}
	
	/*if (descompte > 0) {
		jQuery('#descompte').html('<span class="glyphicon glyphicon-thumbs-up like"></span> ' + number_format(descompte, 0, ',', '.') + ' %');
	}*/
	
}

function comprar_article(article) {
	var lot=0;
	var m;
	
	var talla = '';
	if (jQuery('#modalCompra').length) {
		if (jQuery('#modalCompra').hasClass('in')) {
			talla = jQuery("#talla-modal option:selected").val();
		} else {
			talla = jQuery("#talla option:selected").val();
		}
	} else {
		talla = jQuery("#talla option:selected").val();
	}
		
	if ( (talla.length > 0) && (talla != "---") ) {
		lot=jQuery("#talla option:selected").val();
		jQuery('#modalCompra').modal('hide');
		jQuery('#loading-comprar-btn').fadeIn(50);
		agregar_carrito(article, lot, 1);
		
		/* Corregimos un efecto extraño que provoca que el primer artículo que va al carrito se agrega pero no se muestra correctamente */
		efecto_raro_carrito = true;
		setTimeout('agregar_carrito(0,0,0)', 400);
	} else {
		if (jQuery("#color option:selected").val()=="---") {
			jQuery("#color").addClass("btn-warning");
			m=error_selecciona_talla_color;
		} else {
			m=error_selecciona_talla;
		}
		jQuery("#talla").addClass("btn-warning");
		alert(m);
	}
}

function agregar_carrito(article, lot, quantitat) {
	var dades="article=" + article + "&lot=" + lot + "&quantitat=" + quantitat;

	jQuery.ajax({
        type: "GET",
        url:"ajax/article_carrito_ajax.php",
        data: dades,
        dataType: 'json'

    }).done( function( response ) {
    	if(response.valid==true){
			var num=parseFloat(response.total);
			
			total_carrito = num;
			
			if (pedido_en_tramite == true) {
				tramitar_pedido();
			}
			
			if (num == 0) { 
				pedido_en_tramite = false;
			}
			var txt_tramitar = '';
			
			if (num==0) {
				txt_tramitar = '';
				jQuery("#tramitar").addClass("inactivo");
				if (issmartphone()) {
					jQuery('#tramitar-smartphones').fadeOut(200);
				}
			} else {
				txt_tramitar = '<small>' + btn_txt_tramitar_pedido + '</small>';
				jQuery("#tramitar").removeClass("inactivo");
				if (issmartphone()) {
				jQuery('#tramitar-smartphones').fadeIn(200);
				}
			}
			num = number_format(num, 2, ',', '.');
			jQuery("#num-carrito").html(num + " €");
			jQuery("#num-carrito2").html('<span class="glyphicon glyphicon-shopping-cart"></span>&nbsp<div class="badge">' + num + ' €</div> ' + txt_tramitar); /* para smartphones sólo */
			if (article>0 || efecto_raro_carrito == true) {
				if (jQuery("#menu-carrito").hasClass("open") == false) {
					jQuery("#menu-carrito").addClass("open");
				}
				efecto_raro_carrito = false;
			}
			jQuery('#loading-comprar-btn').fadeOut(50);
			jQuery("#carrito").load("https://www.boets.es/includes/mostrar_carrito.php?carrito=1");
			
		} else {
			jQuery('#loading-comprar-btn').fadeOut(50);
		}
				
   });
		
}

function aplicar_promo_code() {
	var dades = jQuery('#promo-code-form').serialize();
			jQuery.ajax({
                type: "POST",
                url:"ajax/aplicar_promo_code.php",
                data: dades,
                dataType: 'json'

            }).done( function( response ) {
	            jQuery('#alert-promo-code').remove();
            	if(response.valid==true){
					jQuery("#promo-code-container").html(response.msg);
					agregar_carrito(0,0,0);
					if (pedido_en_tramite==true) {
						loading_span('#aplicando-promo-code');
						setTimeout("tramitar_pedido()", 4000);
					}
				} else {
					jQuery("#promo-code-container").html(response.msg);
				}
           });
}




function talles_color_seleccionat(article, classe, valor, modal) {

	var color = jQuery("#color option:selected").val();
	var dades="article=" + article + "&color=" + color + "&classe=" + classe + "&valor=" + valor;
	var cridar_texte_btn = true;
		
	if (modal) {
		if (jQuery("#color-modal option:selected").val()!="---") {
			jQuery("#color-modal").removeClass("btn-warning");
		}
		dades += '&id=talla-modal';
	} else {
		if (jQuery("#color option:selected").val()!="---") {
			jQuery("#color").removeClass("btn-warning");
		}
		dades += '&id=talla';
	}
	
	jQuery.ajax({
	  	type:"POST",
		url:"ajax/selector_talles_color_ajax.php",
		data: dades,
		dataType:"json",
		beforeSend:function(){
			
			},
		success:function(response){			
			if(response.valid==false){
				alert(error_recarga_pagina);
			} else {
				jQuery("#select-talla").html(response.codi);
				
				if (!issmartphone()) {
					jQuery('[data-toggle="tooltip"]').tooltip();
				}
				if (modal) {
					if (jQuery('select#talla-modal option').length == 1) {
						jQuery('#select-talla-modal-container').fadeOut();
					} else {
						jQuery('#select-talla-modal-container').fadeIn();
					}
				} else { /* No modal */
					if (jQuery('select#talla option').length == 1) {
						
						if (jQuery("#talla option:selected").val() == '---') {
							
							if (jQuery("#color option:selected").val() != '---') {
								jQuery('#btn-comprar-articulo').attr('disabled', 'disabled');
								jQuery('#sin-stock').remove();
								jQuery('#boton-comprar-container').prepend('<div id="sin-stock" class="margin-l5 label label-danger">' + agotado + '</div>');
								jQuery('#select-talla-container').fadeOut(0);
								cridar_texte_btn = false;
								jQuery('#txt-btn-comprar').html(agotado);
							} else {
								jQuery('#sin-stock').remove();
								jQuery('#btn-comprar-articulo').removeAttr('disabled');
							}
						} else {
							jQuery('#sin-stock').remove();
							jQuery('#btn-comprar-articulo').removeAttr('disabled');
						}
					} else {
						jQuery('#select-talla-container').fadeIn(0);
					}
					
					if (cridar_texte_btn == true) {
						gestionar_txt_boton_compra();
					}
					
				}
			}
			
		}
	})
	
	if (jQuery('select#color option').length > 1) {
		color_imagenes();
	}
	
}

function gestionar_txt_boton_compra() {
	var txt = '';

	if (jQuery('select#talla option').length == 1) {
								
		if (jQuery('select#color option').length == 1) {
			/* No hay opcion */
			txt = boton_compra_agregar_carrito;
		} else {
			/* Elegir color */
			txt = boton_compra_color;
		}
		
	} else {
		
		if (jQuery('select#color option').length == 1) {
			/* No hay opcion */
			txt = boton_compra_talla;
		} else {
			/* Elegir color */
			txt = boton_compra_talla_color;
		}
		
	}
	
	if ( (jQuery("#talla option:selected").val() != '---') && (jQuery("#color option:selected").val() != '---') ) {
		txt = boton_compra_agregar_carrito;
	} else if (jQuery("#talla option:selected").val() != '---') {
		txt = boton_compra_color;
	} else if (jQuery("#color option:selected").val() != '---') {
		txt = boton_compra_talla;
	}
	
	jQuery('#txt-btn-comprar').html(txt);
}

function seleccionar_talla_llista(id) {
	if (jQuery("#color option:selected").val()=="---") {
		alert('Selecciona primero el color');
		return;
	} else { 
		jQuery('#talla').val(id);
		jQuery('.btn-talla').removeClass('talla-seleccionada');
		jQuery('#' + id).addClass("talla-seleccionada");
		canvi_talla();
	}
	gestionar_txt_boton_compra();
}

function canvi_talla() {
	if (jQuery("#talla option:selected").val()!="---") {
		jQuery("#talla").removeClass("btn-warning");
	}
}

function eliminar_carrito(id) {
	var dades="id=" + id;
	jQuery.ajax({
	  	type:"POST",
		url:"ajax/eliminar_linia_carrito_ajax.php",
		data: dades,
		dataType:"json",
		beforeSend:function(){
			
			},
		success:function(response){			
			
			if(response.valid==false){
				
			} else {
				agregar_carrito(0,0,0);
			}
		}
	})
}

function buidar_carrito() {
	pedido_en_tramite=false;
	var dades="";
	jQuery.ajax({
	  	type:"POST",
		url:"ajax/buidar_carrito_ajax.php",
		data: dades,
		dataType:"json",
		beforeSend:function(){
			
			},
		success:function(response){			
			
			if(response.valid==false){
				
			} else {
				agregar_carrito(0,0,0);
				jQuery("#carrito").html("");
			}
		}
	})
}

function cabeceras_pedido(confirmar) {
	var s="";
	
	if (confirmar==false) {
		s += "<h3>" + tu_cesta + "<span class='glyphicon glyphicon-chevron-down naranja' style='position:relative;top:2px;margin-left:6px;font-size:0.8em;'></span></h3>";
	} else {
		s += "<h3>" + confirma_tu_pedido + "<span class='glyphicon glyphicon-chevron-down naranja' style='position:relative;top:2px;margin-left:6px;font-size:0.8em;'></span></h3>";
		s += '<p class="small margin-l15">' + pedido_generado_con_datos + '</p>';
		s += "<div class='row' id='datos-cliente'></div>";
	}
	
	s += '<div class="h4 margin-l15">' + detalle_pedido + '<span class="small glyphicon glyphicon-chevron-down" style="position:relative;top:2px;margin-left:6px;"></span></div>';
	
	s +="<div id='cabecera-pedido' class='uppercase'>";
		s += "<div class='row'>";
			s += "<div class='col-xs-9'>" + cabeceras_articulo + "</div>";
			s += "<div class='col-xs-2' style='text-align:right;'>" + cabeceras_precio + "</div>";
			s += "<div class='col-xs-1'></div>";
		s += "</div>";
	s += "</div>";
	s += "<div id='detalle-pedido'></div>";
	
	s += "<div class='panel panel-default' id='botones-confirmar-compra'>";

	s += "</div>";	
	return (s);
}

function mis_pedidos() {
	scrolltop();
	hidemenu_smart();
	jQuery('#contingut').load('includes/mis-pedidos.php')
}

function tramitar_pedido() {
	
	if (pedido_en_tramite == true) {
		return;
	}
	
	pedido_en_tramite=true;
	pasos_compra(1);
	
	jQuery('#box-columna-dreta').remove();
	jQuery('#subscribe-container').remove();
	jQuery('#contingut').removeClass('col-md-8').addClass('col-sm-12');
	jQuery('#alert-promo-code').remove();
	
	scrolltop();
	
	hidemenu_smart();
	jQuery("#menu-carrito").removeClass("open");
	
	var s = cabeceras_pedido(false);
	
	loading('#contingut');
	jQuery("#contingut").html(s);
	jQuery("#detalle-pedido").delay(1000).load("https://www.boets.es/includes/mostrar_carrito.php");
	loading("#botones-confirmar-compra");
	jQuery("#botones-confirmar-compra").load("https://www.boets.es/includes/mostrar_botones_confirmar_compra.php");
}

function cargar_datos_envio_pedido() {
	jQuery('#datos-envio').load('includes/datos-envio.php');
}

function cargar_datos_facturacion_pedido() {
	jQuery('#datos-facturacion').load('includes/datos-facturacion.php?datospendientes=0');
}

function pagar_pedido() {
	scrolltop();
	hidemenu_smart();
	if (isLogin == false) {
		pasos_compra(2);
		cargar_formulario_login();
		return;
	}
	
	if (total_carrito == 0) {
		pasos_compra(1);
		tramitar_pedido();
	}
	
	pasos_compra(4);
	loading('#contingut');
	comprueba_datos_usuario_completos("includes/formas-de-pago.php");
	/*jQuery("#contingut").load("transacciones/formas-de-pago.php");*/
}

function confirmar_pedido() {
	if (isLogin == false) {
		pasos_compra(2);
		cargar_formulario_login();
		return;
	}
	
	if (total_carrito == 0) {
		pasos_compra(1);
		tramitar_pedido();
	}
	
	scrolltop();
	var s = cabeceras_pedido(true);
	pasos_compra(3);
	jQuery("#contingut").html(s);
	
	comprueba_datos_usuario_completos("includes/mostrar_datos_envio.php");
	
	jQuery.ajax({
        type: "GET",
        url: "ajax/comprueba_datos_completos.php"

    }).done( function( response ) {

            	var obj = jQuery.parseJSON(response);
            	if(obj.error=='success'){
					
					jQuery("#datos-cliente").load("includes/mostrar_datos_envio.php");
					
					jQuery("#detalle-pedido").load("https://www.boets.es/includes/mostrar_carrito.php?confirmar=1");
					loading("#botones-confirmar-compra");
					jQuery('#botones-confirmar-compra').html('<a class="btn btn-brand pull-right" onclick="pagar_pedido();">Pagar Pedido</a>');
					/*jQuery("#botones-confirmar-compra").load("transacciones/formas-de-pago.php");*/
					
				} else if(obj.error=='error') {	
					cargar_datos_facturacion_pendientes();
				}
   });
	
	
	
}

function comprueba_datos_usuario_completos(fichero){
	
   	   	jQuery.ajax({
                type: "GET",
                url: "ajax/comprueba_datos_completos.php"

            }).done( function( response ) {

            	var obj = jQuery.parseJSON(response);

            	if(obj.error=='success'){
					if (jQuery("#datos-cliente").length) {
						jQuery("#datos-cliente").load(fichero);
					} else {
						jQuery("#contingut").load(fichero);
					}
					
				} else if(obj.error=='error') {	
				
					pasos_compra(3);
					cargar_datos_facturacion_pendientes();
				}
           });	

}

function buscar(idioma, pagina) {
	var s = (jQuery("#busqueda").val());
	var u="";
	var s1="";
	
	s = s.replace("€", "euros");
	jQuery("#busqueda").val(s);
	s=escape(s);
	
	pedido_en_tramite = false;
	
	scrolltop();
	hidemenu_smart();
	
	if (s.length>0) {
		s1 = s;
		s2 = s1;
	} else {
		s1 += 'todos los art&iacute;culos';
		s2 = 'todos';
	}
	
	history.pushState('', 'Buscar "' + s1 + '"', 'buscar/' + escape(s2) + '/');
	
	u = '<li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb"><i class="glyphicon glyphicon-home"></i>&nbsp;<a rel="home" href="https://www.boets.es/" itemprop="url"><span itemprop="title">' + txt_portada + '</span></a></li><li itemscope="" itemtype="https://data-vocabulary.org/Breadcrumb" itemprop="child" class="active"><span itemprop="title">' + txt_buscar + ' "' + unescape(s1) + '"</span></li>';
	
	jQuery("#breadcrumb").html(u);
	
	loading('#contingut');
	
	jQuery("#contingut").load("https://www.boets.es/listado_articulos.php?jQuery_load=1&idioma=" + idioma + "&cerca=" + s + "&pagina=" + pagina);
}

function rellenar_buscador(str, idioma) {
	jQuery('#busqueda-ayuda').val(str);
	jQuery('#busqueda').val(jQuery('#busqueda-ayuda').val());
	ayuda_buscar(idioma, 0);
}

function ayuda_buscar(idioma, pagina) {
	
	jQuery('#busqueda').val(jQuery('#busqueda-ayuda').val());
	buscar(idioma, 0);
	
}

function pasos_compra(paso) {
	var u='';
	var class1='', class2='', class3='', class4='', class5='';
	if (paso==1) {
		class1 = 'active';
	} else if (paso==2) {
		class2 = 'active';
	} else if (paso==3) {
		class3 = 'active';
	} else if (paso==4) {
		class4 = 'active';
	} else if (paso==5) {
		class5 = 'active';
	}
	
	u += '<div class="btn-group btn-group-justified" role="group" aria-label="breadcrumb">';
	
	u += '<a onclick="tramitar_pedido()" class="btn btn-default ' + class1 +'" role="button"><span>1</span>' + txt_tramitar_pedido + '</a>';
	
	if (isLogin) { 
		u += '<a class="btn btn-default" role="button" onclick="confirmar_pedido()"><span>2</span>' + sesion_iniciada + '&nbsp;<i class="glyphicon glyphicon-ok naranja"></i></a>'; 
	} else {
		u += '<a onclick="cargar_formulario_login()" class="btn btn-default ' + class2 +'" role="button"><span>2</span>' + identificate + '</a>';
	}
	
	u += '<a onclick="confirmar_pedido()" class="btn btn-default ' + class3 +'" role="button"><span>3</span>' + confirmar_datos_envio + '</a>';
	u += '<a onclick="pagar_pedido()" class="btn btn-default ' + class4 +'" role="button"><span>4</span>' + forma_pago + '</a>';
	u += '<a class="btn btn-default inactive ' + class5 +'" role="button"><span>5</span>' + pedido_confirmado + '</a>';
	
	u += '</div>';
	
	jQuery("#breadcrumb").addClass('pasos-compra').html(u);
}

function modal_condiciones_envio() {
	jQuery('#modalEnvios').modal('show');
}

function cambiar_imagen_grande(img, carpeta, id) {
	jQuery('#carousel-imagenes .img-activa').removeClass('img-activa');
	jQuery(id).addClass('img-activa');
	jQuery('#imagen-articulo').attr('src', carpeta + img).fadeIn(400);
}

function color_imagenes() {
	var color = '.' + jQuery('#color option:selected').val();
	
	if (jQuery('#color option:selected').val() == '---') {
		jQuery('#carousel-imagenes img').removeClass('color-seleccionado').removeClass('color-atenuado');
		return;
	}
	
	jQuery('#carousel-imagenes img').removeClass('color-seleccionado').addClass('color-atenuado');
	jQuery('#carousel-imagenes ' + color).removeClass('color-atenuado').addClass('color-seleccionado');
	var source = jQuery('#carousel-imagenes .color-seleccionado').first().attr('src');
	jQuery( "[src='" + source + "']" ).addClass('img-activa');
	jQuery('#imagen-articulo').attr('src', source).fadeIn(400);
	
	var n = 0;
	jQuery(".color-seleccionado").each(function() {
        n++;
    });
	if (n == 0) {
		jQuery('#carousel-imagenes img').removeClass('color-atenuado');
	}
}



 function dar_formato_tablas_tallas(){

        jQuery("#tablas-tallas table").addClass("table-responsive");
       jQuery("#tablas-tallas table").removeAttr('style');
       jQuery("#tablas-tallas table th p").removeAttr('style');
        jQuery("#tablas-tallas table td p").removeAttr('style'); 

       jQuery("#tablas-tallas table th").addClass('cabecera-tabla');

       jQuery("#tablas-tallas table td").addClass('elementos-tabla');

 }


