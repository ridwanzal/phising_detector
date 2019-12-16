$(document).ready(function(){

	$('#iqitmegamenu-accordion li:has(ul)').each(function() {
		$(this).prepend('<div class="responsiveInykator">+</div>');
	});

	$("#iqitmegamenu-accordion > li .responsiveInykator").on("click", function(event){

		if(false == $(this).parent().next().is(':visible')) {

			$('#iqitmegamenu-accordion > ul').slideUp(300);
		}
		if($(this).text()=="+")
			$(this).text("-");
		else
			$(this).text("+");
		$(this).parent().children('ul').slideToggle(300);
	});

	$('#iqitmegamenu-accordion, .cbp-spmenu-overlay').detach().prependTo('body');

var menuLeft = document.getElementById( 'iqitmegamenu-accordion' ),
	showLeftPush = document.getElementById( 'iqitmegamenu-shower' ),
	menuoverlay = document.getElementById( 'cbp-spmenu-overlay' ),
	body = document.body;

classie.addClass( body, 'cbp-spmenu-body' );	



$('#iqitmegamenu-shower, #mh-menu').click(function() {
				classie.toggle( showLeftPush, 'active' );
				classie.toggle( body, 'cbp-spmenu-push-toright' );
				classie.toggle( menuLeft, 'cbp-spmenu-open' );
				classie.toggle( menuoverlay, 'cbp-spmenu-overlay-show' );
});

$('#cbp-spmenu-overlay, #cbp-close-mobile').click(function() {
				classie.toggle( this, 'active' );
				classie.toggle( body, 'cbp-spmenu-push-toright' );
				classie.toggle( menuLeft, 'cbp-spmenu-open' );
				classie.toggle( menuoverlay, 'cbp-spmenu-overlay-show' );
	});


});