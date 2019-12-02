/*********************************************************************************************************** Select jQuery *********************************************************************/
jQuery(document).ready(function(){
		jQuery(function(){
	    jQuery('.form-language, .header .block-currency, .toolbar .sort-by, .toolbar .limiter, .block-order-return .return-select').jqTransform({imgPath:'<?php echo $this->getSkinUrl("images/") ?>'});
		});
		
	
/*************************************************************************************************************scroll-pane *********************************************************************/

	jQuery(document).ready(function(){
		jQuery('.scroll-pane').jScrollPane({
	    showArrows:true,
	    maintainPosition			: true,
		stickToBottom				: true,
		stickToRight				: true,
		clickOnTrack				: true,
		autoReinitialise			: true,
		autoReinitialiseDelay		: 500,
		verticalDragMinHeight		: 0,
		verticalDragMaxHeight		: 99999,
		horizontalDragMinWidth		: 0,
		horizontalDragMaxWidth		: 99999,
		contentWidth				: undefined,
		animateScroll				: true,
		animateDuration				: 300,
		animateEase					: 'linear',
		hijackInternalLinks			: true,
		verticalGutter				: 4,
		horizontalGutter			: 4,
		mouseWheelSpeed				: 0,
		arrowButtonSpeed			: 0,
		arrowRepeatFreq				: 50,
		arrowScrollOnHover			: false,
		trackClickSpeed				: 0,
		trackClickRepeatFreq		: 70,
		verticalArrowPositions		: 'split',
		horizontalArrowPositions	: 'split',
		enableKeyboardNavigation	: true,
		hideFocus					: false,
		keyboardSpeed				: 0,
		initialDelay                : 300,        // Delay before starting repeating
		speed						: 30,		// Default speed when others falsey
		scrollPagePercent			: .10		// Percent of visible area scrolled when pageUp/Down or track area pressed
								  
			 });
		});
	
/***********************************************/
		  jQuery('.block-cart-header .cart-content').hide();
			jQuery('.block-cart-header  .amount-2 a, .block-cart-header .cart-content').hover(function(){
				jQuery('.block-cart-header .cart-content').stop(true, true).slideDown(400);
			},function(){
				jQuery('.block-cart-header .cart-content').stop(true, true).delay(400).slideUp(300);
			}); 
			
	
	jQuery(".contact-main").addClass("d-none");
	var p1=false;
	var p2=false;
	jQuery(".btn-contact").click(function(){
		 if (!p1) {
		  jQuery(this).parent(".contact-main").addClass("show");
		  jQuery(this).parent(".contact-main").removeClass("d-none");
		  p1=true;
		 } else {
		  jQuery(this).parent(".contact-main").removeClass("show");
		  p1=false;
		  p2=false;
		 }
		 if (p2) {
		  jQuery(this).parent(".contact-main").next().removeClass("show");
		 }
	});
	
/***********************************************/
jQuery(".btn-log").click(function(){
 if (!p2) {
  jQuery(this).parent(".account-login-home").addClass("show");
  p2=true;
 } else {
  jQuery(this).parent(".account-login-home").removeClass("show");
  p1=false;
  p2=false;
 }
  if (p2) {
  jQuery(this).parent(".logout-class").removeClass("show");
  p2=true;
 } else {
 }
});

/***********************************************/
jQuery(document).click(function(event) {
	if (p1 || p2) {
		if (jQuery(event.target).closest(".contact-main").length || jQuery(event.target).closest(".account-login-home").length) return;
  		jQuery(".contact-main").removeClass("show");
		jQuery(".account-login-home").removeClass("show");
		p1=false;
		p2=false;
		event.stopPropagation();
	}
});



/***********************************************/
jQuery(".contact-btn li ").hover(
  function(){
    jQuery(this).find("#FME-contact-form").stop(true, true).animate({right:'0px'},'slow')
  },
  function() {
    jQuery(this).find("#FME-contact-form").stop(true, true).animate({right:'-145px'},'slow')
  });
		
    	jQuery('#cart-sidebar li').last().addClass('last');
		jQuery('.itemMenuName.level2').last().addClass('last');
		jQuery('#checkout-progress-state li').eq(1).addClass('two');
		jQuery('#checkout-progress-state li').eq(2).addClass('tree');
		jQuery('#checkout-progress-state li').eq(3).addClass('four');
		
		jQuery('.ratings').next().addClass('left');
	
       
		    jQuery(document).ready(function(){
       jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
  animationSpeed:'slow',theme:'facebook',slideshow:12000, autoplay_slideshow: true, width:500,height:500, opacity:0.3, padding:60
        });
    });

});


/*************************************************************************************************************related coroucel**********************************************************************/
jQuery(document).ready(function() {
jQuery('.related-carousel').jcarousel({
	vertical: false,
	visible:3,
	scroll: 1
});
});

/*************************************************************************************************************back-top*****************************************************************************/
jQuery(function () {
 jQuery(window).scroll(function () {
  if (jQuery(this).scrollTop() > 100) {
   jQuery('#back-top').fadeIn();
  } else {
   jQuery('#back-top').fadeOut();
  }
 });

 // scroll body to 0px on click
 jQuery('#back-top a').click(function () {
  jQuery('body,html').stop(false, false).animate({
   scrollTop: 0
  }, 800);
  return false;
 });
});

/***************************************************************************************************** Magento class **************************************************************************/
jQuery(document).ready(function() {  
  jQuery('.sidebar .block').last().addClass('last_block');
  jQuery('.sidebar .block').first().addClass('first');
  jQuery('.box-up-sell li').eq(2).addClass('last');
  jQuery('#custommenu .wp-custom-menu-popup').last().addClass('last');
   jQuery('.product-collateral #customer-reviews dl dd').last().addClass('last');
  jQuery('.product-view .product-img-box .more-views li:nth-child(4)').last().addClass('item-4');
  if(jQuery(".my-account .page-title, .tag-list-index .page-title, .tag-product-list .page-title, .sendfriend-product-send .page-title").length){jQuery('.sidebar').addClass('sidebar-indent'); };
   
});


