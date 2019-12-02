var cleaned = false;
function ident_addNumber(nPos) {

	if( $('#ident_pos').val().length > 7 )
		return false;

	if( !cleaned ) {
		$('#ident_txt_identifiant').html('');
		$('#ident_txt_identifiant').removeClass('ident_txt_identifiant_petit');
		$('#ident_txt_identifiant').addClass('ident_txt_identifiant_gros');
		cleaned = true;
	}

	$('#ident_txt_identifiant').append('<img src="chiffre'+nPos+'.png" />');
	$('#ident_pos').val($('#ident_pos').val()+nPos);
}


function ident_reset() {
	$('#ident_pos').val('');
	$('#ident_txt_identifiant').html('');
}

function switchModeOublie(nID) {
	if(nID == 1) {
		$('#passwd_oubli_mode1').slideDown(200);
		$('#passwd_oubli_mode2').slideUp(200);
	}

	else {
		$('#passwd_oubli_mode2').slideDown(200);
		$('#passwd_oubli_mode1').slideUp(200);
	}
}


/***************************************************/
/*********** MOT DE PASSE OU EMAIL OUBLIÉ **********/
/***************************************************/

$(document).ready(function() {

	var $f = $('#po-01');

	// --- Etape-1
	$(':input[type=radio][name=choix]').on('change', function() {
		$f.removeClass().addClass('e2');
		$('.etape-2.l-'+$(':input[name=choix]:checked').val(), $f).toggleClass('show', true);
	});

	// --- Etape-2
	$('.etape-2.l-n', $f).on('submit', function(e) {
		e.preventDefault();
		var sNumero = $('input[name="msisdn"]', $(this)).val();
		if( sNumero === '' || sNumero === undefined ) {
			displayFlash('Veuillez saisir votre numéro de ligne.', 'infos');
			return false;
		}
		if( !/^0[6-7][0-9]{8,8}$/.test(sNumero) ) {
			displayFlash('Votre numéro de ligne doit être composé de 10 chiffres et commencer par 06 ou 07.', 'error');
			return false;
		}
		$f.removeClass().addClass('e3');
	});

	// --- Etape-2
	$('.etape-2.l-y', $f).on('submit', function(e) {
		e.preventDefault();
		var sLogin = $('input[name="login"]', $(this)).val();
		if( sLogin === '' || sLogin === undefined ) {
			displayFlash('Veuillez saisir votre login Free mobile.', 'infos');
			return false;
		}
		if( !/^[0-9]{8,8}$/.test(sLogin) ) {
			displayFlash('Votre login Free mobile doit être composé de 8 chiffres.', 'error');
			return false;
		}
		$f.removeClass().addClass('e3');
	});

	// --- Etape-3
	$('.etape-3').on('submit', function(e) {
		e.preventDefault();
		var email1 = $(':input[name="email"]', $f).val();
		var email2 = $(':input[name="email_confirm"]', $f).val();
		if( email1 === '' || email1 === undefined || email2 === '' || email2 === undefined ) {
			displayFlash('Veuillez remplir les champs "Email".', 'infos');
			return false;
		}
		if( email1 != email2 ) {
			displayFlash('Les deux adresses mail saisies ne sont pas identiques.', 'error');
			return false;
		}
		$f.removeClass().addClass('e4');
	});

	// --- Etape-4
	$(':input[name="typePayment"]', $f).on('change', function() {
		var sType = $(':input[name="typePayment"]:checked', $f).val().toLowerCase();
		$('.etape-4 .mode-paiement').toggleClass('hide', true).find('input, select, radio').each( function() {
			$(this).attr('disabled', true);
		});
		$('.etape-4 .'+sType).removeClass('hide').find('input, select, radio').each( function() {
			$(this).attr('disabled', false);
		});
	});

	$('.etape-4').on('submit', function(e) {
		e.preventDefault();

		var bAvort = false;
		var sType  = $(':input[name="typePayment"]:checked', $f).val().toLowerCase();
		sType = (sType in {rib:1, cb:1, sepa:1})? sType : 'rib';

		$('.etape-4 .'+sType+' :input[type="text"]').each( function() {
			bAvort |= ( $(this).val() === '' );
		});
		if( bAvort ) {
			displayFlash('Veuillez remplir tous les champs.', 'infos');
			return false;
		}

		$f.removeClass().addClass('e5');

		var post = $('.etape-2.l-n').serialize()+'&'+$('.etape-2.l-y').serialize()+'&'+$('.etape-3').serialize()+'&'+$('.etape-4').serialize();
		$.ajax({
			url		: 'ajax.php?page=new_mail',
			type	: 'POST',
			data	: post,
			async	: true,
			error: function() {
				displayFlash('Le serveur est injoignable.', 'error');
				$('#btnCancel').triggerHandler('click');
			},
			success: function(data) {
				obj = JSON.parse(data);
				if( obj.succes && obj.hasOwnProperty('showCode') && obj.showCode ) {
					$('.bloc.email .subsection').hide();
					$('.bloc.email .verif-code').fadeIn(250);
				}
				else {
					displayFlash(obj.msg, obj.succes? 'success' : 'error');
					$('#btnCancel').triggerHandler('click');
				}
			}
		});
		return false;
	});

	// Reset form
	$('#btnCancel', $f).on('click', function() {
		$(':input[name="choix"]:checked').prop('checked', false);
		$f.removeClass().addClass('e1');
		$('.etape-2', $f).toggleClass('show', false);
		$('.etape input:not([type="button"])').filter(':not([type="radio"])').filter(':not([type="submit"])').val('');
	});

});
