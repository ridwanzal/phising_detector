/**
 * TODO : ne plus utiliser des classes CSS pour la taille et la position de la modal mais les définir en js dans initEnv
 */


(function($) {

	// Affiche une popup modal
	$.Modal = function( oOptions ) {
		this.oOptions    = $.extend( {}, this.defaultOptions, oOptions );
		this.bIsShown    = false;
		this.bIsCanceled = false;
		this.show();

		this.jq_enveloppe.on('click', '[data-modal-action=close]', $.proxy(this.hide, this, true) );
	};

	// Définition de l'objet Modal
	$.Modal.prototype = {

		constructor: $.Modal,

		initEnv: function() {

			var _this = this;

			this.idMod  = $('.modal-backdrop').length;
			this.zindex = this.getZIndex();
			this.oOptions.animation = ($.inArray(this.oOptions.animation, this.animation) != -1)? this.oOptions.animation : 'fade';

			this.jq_enveloppe = $('<div />', { 'class':'modal hide '+this.oOptions.animation+' '+this.oOptions.width } ).css('z-index', this.zindex+1 )
				// Header
				.append(
					$('<div />', {'class':'modal-header'})
					.append( $('<img />', {src:'/common/images/tooltip.gif'}) )
					.append( $('<span />', {id:'myModalLabel'}).text(this.oOptions.title) )
					.append(
						this.oOptions.closeIcon?
							$('<button />', {type:'button', 'class':'close', 'data-modal-action':'close', 'data-cancel':true}).text('×')
							: ''
					)
				)
				// Content
				.append(
					$body = $('<div />', { 'class':'modal-body' } )
					.append(
						this.imageType[this.oOptions.type]? $('<img />', {'class':'modal-image', src:this.imageType[this.oOptions.type]}) : ''
					)
					.append( $('<div />', {'class':'content'} ).html( this.oOptions.content ) )
				)
				// Footer
				.append(
					$('<div />', {'class':'modal-footer'} )
					.append(
						$.proxy(
							function() {
								var aBtn = [];
								$(this.oOptions.buttons).each( function(i, bouton) {
									var optBtn = $.extend( {}, this.defaultButton, bouton ),
										icon   = (optBtn.icon !== '')? '<i class="icon-white '+optBtn.icon+' '+(optBtn.icononleft? 'left' : 'right')+'"></i>' : '';
									aBtn.push(
										$('<button />', { 'type':'button', 'class':optBtn.color } )
										.html( optBtn.icononleft? icon + optBtn.texte : optBtn.texte + icon )
										.click( function() {
											if( !(typeof optBtn.callback === 'function' && !(resCbk = optBtn.callback()) && typeof resCbk != 'undefined') )
												_this.hide(optBtn.cancelAlias);
										})
									);
								});
								return aBtn;
							},
							this
						)
					)
				)
				.prependTo(document.body);

			this.jq_enveloppe.css( {
				top  : Math.max( 0, ($(window).height() - this.jq_enveloppe.outerHeight()) / 2 ) + 'px',
				left : Math.max( 0, ($(window).width() - this.jq_enveloppe.outerWidth()) / 2 ) + 'px'
			});
		},

		getZIndex:function() {
			var aZIndex = $.map( $('body > .modal'), function(elem,index) {
				return parseInt($(elem).css('z-index'),10) || _this.oOptions.zindex;
			});
			return aZIndex.length? Math.max.apply(null,aZIndex)+1 : this.oOptions.zindex-1;
		},

		backdropMgr: function( callback ) {

			if( this.bIsShown && this.oOptions.backdrop ) {

				var doAnimate = $.support.transition && this.oOptions.animation && !this.idMod;

				this.jq_backdrop = $('<div />', { 'class':'modal-backdrop '+(doAnimate? 'fade' : '') }).css('z-index', this.zindex)
					// Event
					.click(
						this.oOptions.backdrop == 'static'?
							$.proxy( this.jq_enveloppe.focus, this.jq_enveloppe.find('button:last-child') )
							: $.proxy(this.hide, this, true)
					);

				// Si un backdrop est dejà présent pour une autre modal, celui-ci est placé par dessus en transparence
				if( this.idMod )
					this.jq_backdrop.css('opacity', 0);

				// Ajout au DOM
				this.jq_backdrop.prependTo(document.body);

				if( doAnimate )
					this.jq_backdrop[0].offsetWidth;

				this.jq_backdrop.addClass('in');
				doAnimate ? this.jq_backdrop.one($.support.transition.end, callback) : callback();
			}
			else if( !this.bIsShown ) {
				if( this.jq_backdrop ) {
					this.jq_backdrop.removeClass('in');
					($.support.transition && this.oOptions.animation && !this.idMod)?
						this.jq_backdrop.one( $.support.transition.end, $.proxy(this.removeBackdrop, this) ) :
						this.removeBackdrop();
				}
				else
					this.removeEnveloppe();
			}
			else if( callback )
				callback();
		},

		removeBackdrop: function() {
			this.removeEnveloppe();
			this.jq_backdrop.remove();
			this.jq_backdrop  = null;
		},

		removeEnveloppe: function() {
			this.jq_enveloppe.remove();
			this.jq_enveloppe = null;
		},

		show: function() {

			this.initEnv();

			var _this = this,
				event = $.Event('show');

			this.jq_enveloppe.trigger(event);
			if( this.bIsShown || event.isDefaultPrevented() )
				return;

			this.bIsShown = true;

			this.backdropMgr( function() {
				var transition = $.support.transition && _this.oOptions.animation;

				if( !_this.jq_enveloppe.parent().length )
					_this.jq_enveloppe.appendTo(document.body);

				_this.jq_enveloppe.show();

				if( transition )
					_this.jq_enveloppe[0].offsetHeight;

				_this.jq_enveloppe.addClass('in');

				transition ?
					_this.jq_enveloppe.one( $.support.transition.end, function () { _this.jq_enveloppe.trigger('shown').find('button:last-child').focus(); } )
					: _this.jq_enveloppe.trigger('shown').find('button:last-child').focus();
			});
		},

		hide: function( bCancelAction ) {
			this.bIsShown    = false;
			this.bIsCanceled = bCancelAction || false;
			this.jq_enveloppe.removeClass('in');
			this[ ($.support.transition && this.oOptions.animation && !this.idMod)? 'hideWithTransition' : 'hideModal']();
		},

		hideWithTransition: function() {
			var timeout = setTimeout(
				$.proxy(
					function() {
						if( this.jq_enveloppe ) {
							this.jq_enveloppe.off($.support.transition.end);
							this.hideModal();
						}
					}, this
				), 1000
			);
			this.jq_enveloppe.one( $.support.transition.end,
				$.proxy(
					function() {
						clearTimeout(timeout);
						this.hideModal();
					}, this
				)
			);
		},

		hideModal: function() {
			this.jq_enveloppe.trigger('hidden');
			this.backdropMgr();
			this.bIsCanceled && typeof this.oOptions.onCanceledClose == 'function' && this.oOptions.onCanceledClose();
		}

	};


	// Options par défault de la modal
	$.Modal.prototype.defaultOptions = {
		zindex    : 1050,					// Z-index si premiere modal (les autres se mettront par dessus)
		backdrop  : true,					// true | false | static (inactif au clic)
		closeIcon : true,					// Présence ou non d'un bouton close dans le header
		keyboard  : true,					// Fermeture modal avec touche Échap
		width     : 'normal',				// normal, large
		animation : 'fade',					// fade, collapse, falling (small height only)
		type      : 'info_blue',			// Cf Modal.type
		title     : 'Confirmation',			// Titre affiché dans le header de la modal
		content   : 'Êtes vous sûr?',		// contenu de la modal
		buttons   : [],						// Définition des boutons. Cf Modal.defaultButton
		onCanceledClose : $.noop			// Fonction declenchée lors d'une fermeture dite d'annulation (clic backdrop, close-icon ou encore bouton ayant cancelAlias = true)
	};

	// Options par default des boutons de la modal
	$.Modal.prototype.defaultButton = {
		texte       : 'Ok',				// Texte du bouton
		icon        : '',				// icon bootstrap
		icononleft  : true,				// Placement de l'icon (avant le texte ou apres)
		color       : 'bt bt-red',		// classes dispos dans form-boutons.scss (bt-red, bt-grey)
		callback    : $.noop,			// Fonction à appeler au click sur le bouton
		cancelAlias : false				// Si true, le callback onCancel de la modal sera appeler en plus du callbacl du bouton (onCancel = click sur backdrop / close-icon du header )
	};

	// Type de modal disponible (défini l'image à afficher)
	$.Modal.prototype.imageType = {
		success   : '/common/images/alertes/succes.png',
		error     : '/common/images/alertes/erreur.png',
		warning   : '/common/images/alertes/warning.png',
		info_red  : '/common/images/alertes/info_rouge.png',
		info_blue : '/common/images/alertes/info_bleu.png',
		info_sim  : '/common/images/alertes/sim.png',
		none      : ''
	};

	$.Modal.prototype.animation = ['', 'fade', 'falling', 'collapse'];


	// Fonction s'appliquant à un element du DOM qui sera utilisé comme contenu de la modal
	$.fn.modal = function( oOptions ) {

		return this.each( function() {

			var data = $(this).data('modal');

			if( !data ) {
				$(this).data( 'modal', (data = new $.Modal( $.extend({}, oOptions, { content:$(this).html() }) ) ) );
				data.jq_enveloppe.on('hidden', $.proxy( function() { $(this).removeData('modal'); }, this) );
			}

			if( typeof oOptions == 'string' ) {
				if( typeof data[oOptions] == 'function' )
					data[oOptions]();
				else
					console.info( 'L\'objet Modal n\'a pas de fonction "'+oOptions+'"' );
			}
		});
	};

	$.fn.modal.Constructor = $.Modal;


})(jQuery);


/*



// ----------------------------------------
// ########################################
// ----------------------------------------
// Affichage d'une boite de dialogue modal
(function($) {

	$.modalDialog = function(options) {

        this.oOptions = {};

        this.init = function(options) {
			this.oOptions = $.extend({}, $.modalDialog.defaultOptions, options);

			if( $('#modalDialog').length )
				$('#modalDialog').remove();

			// Création du DOM de la boite de dialogue
			this.createDOM();
			// Suppresion du DOM de la modal une fois celle ci fermée
			$('#modalDialog').on('hidden', function(e) {
				$(this).remove();
			} );

			var closeCancelCallback = this.oOptions.onCanceledClose;
			$('#modalDialog').on( 'click.dismiss.modal','[data-cancel="true"]', $.proxy(this.hide, this));


			// Affichage de la modal
			$('#modalDialog').modal();
        };

        this.createDOM = function() {
			var animation = ($.inArray(this.oOptions.animation, ['fade','falling','collapse']) != -1)? this.oOptions.animation : 'fade',
				$modal = $('<div id="modalDialog" class="modal hide '+animation+' '+this.oOptions.width+'" />'),


			$header = $('<div />', {'class':'modal-header'})
						.append( $('<img />', {src:'/common/images/tooltip.gif'}) )
						.append( $('<span />', {id:'myModalLabel'}).text(this.oOptions.title) )
						.append( $('<button />', {type:'button', 'class':'close', 'data-dismiss':'modal', 'data-cancel':true}).text('×') );

			$body   = $('<div class="modal-body" />').append('<div class="content" >'+this.oOptions.content+'</div>');
			if( $.modalDialog.type.hasOwnProperty(this.oOptions.type) && $.modalDialog.type[this.oOptions.type] !== '' )
				$body.prepend('<img class="modal-image" src="'+$.modalDialog.type[this.oOptions.type]+'" />');

			$footer = $('<div class="modal-footer" />');

			if( this.oOptions.buttons.length ) {
				var button, $button;
				for( var x in this.oOptions.buttons ) {
					button = $.extend( {}, $.modalDialog.defaultButton, this.oOptions.buttons[x] );
					$button = $('<button />', { 'type':'button', 'class':button.color, 'data-dismiss':'modal', 'data-cancel':button.cancelAlias } ).html(button.texte);
					if( button.icon !== '' )
						$button.prepend('<i class="icon-white '+button.icon+'"></i>');
					$button.appendTo($footer).on('click', (typeof button.callback === 'function')? button.callback : $.noop );
				}
			}
			$modal.append($header).append($body).append($footer).prependTo('body');
		};

		this.init(options);
	};

	$.modalDialog.defaultOptions = {
		width     : 'normal',
		animation : 'fade',				// fade, collapse, falling (small height only)
		type      : 'info_blue',
		title     : 'Confirmation',
		content   : 'Êtes vous sûr?',
		buttons   : [],					// { texte:'Valider', icon:'icon-ok', color:'bt bt-grey', callback:$.noop(), cancelAlias:false }
		onCanceledClose : $.noop
	};

	$.modalDialog.defaultButton = {
		texte       : 'Ok',
		icon        : '',
		color       : 'bt bt-red',
		callback    : $.noop,
		cancelAlias : false
	};

	$.modalDialog.type = {
		success   : '/common/images/alertes/succes.png',
		error     : '/common/images/alertes/erreur.png',
		warning   : '/common/images/alertes/warning.png',
		info_red  : '/common/images/alertes/info_rouge.png',
		info_blue : '/common/images/alertes/info_bleu.png',
		none      : ''
	};

})(jQuery);



*/