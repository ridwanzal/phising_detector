/***************************************************************span close*******************************************************************/
$('.success span, .warning span, .attention span, .information span').live('click', function() {
$(this).parent().fadeOut('slow', function() {
$(this).remove();
});
});

/******************************************************************************************************************************************/
/**********************************************************prettyphoto*****************************************************************************/
    $(document).ready(function(){
       $("a[data-gal^='prettyPhoto']").prettyPhoto({
  animationSpeed:'slow',theme:'facebook',slideshow:5000, autoplay_slideshow: false,
		   animation_speed:'fast',slideshow:5000,autoplay_slideshow:false,opacity:0.80,show_title:true,allow_resize:true,default_width:500,default_height:344,counter_separator_label:'/',theme:'pp_default',horizontal_padding:20,hideflash:false,wmode:'opaque',autoplay:true,modal:false,deeplinking:true,overlay_gallery:true,keyboard_shortcuts:true,
		  
        });
    });

/********************************************************************************menu********************************************************/
	$(document).ready(function() { 
	$('ul.menu').superfish({ 
		delay:       600,                            // one second delay on mouseout 
		animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
		speed:       'normal',                          // faster animation speed 
		autoArrows:  true,                           // disable generation of arrow mark-up 
		dropShadows: false                            // disable drop shadows 
	}); 
}); 
/***********************************************************************backtotop*******************************************************************/
	jQuery(document).ready(function(){
	var IE='\v'=='v';
	// hide #back-top first
	//jQuery("#back-top").hide();
	// fade in #back-top
	jQuery(function () {
		/*jQuery(window).scroll(function () {
			if (!IE) {
				if (jQuery(this).scrollTop() > 100) {
					jQuery('#back-top').fadeIn();
				} else {
					jQuery('#back-top').fadeOut();
				}
			}
			else {
				if (jQuery(this).scrollTop() > 100) {
					jQuery('#back-top').show();
				} else {
					jQuery('#back-top').hide();
				}	
			} 
		});*/

		// scroll body to 0px on click
		jQuery('#back-top a').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});/************************************************************************************************************************************************/
$(function(){
$('header .links li').last().addClass('last');
$('.breadcrumb a').last().addClass('last');
$('.cart tr').eq(0).addClass('first');
});
  
/********************************************************************************************************************************************/
$(document).ready(function() {
$('.jcarousel-list li a img').css({opacity:'0.3'});
$('.jcarousel-list li a img').hover(function(){
     jQuery(this).stop(true,false).animate({opacity:'1'}, {duration: 250});
    },function(){
     jQuery(this).stop(true,false).animate({opacity:'0.3'}, {duration: 250});
   }
   )
});

/***********************************************************************************************************************************************************************/
/* AddToCart */
$(document).ready(function() {
         var fl=true;

$('.addToCart').click(function() {

 if (fl) {
   fl=false;
   var tis = $(this);
   $.ajax({
   url: 'index.php?route=checkout/cart/add',
   type: 'post',
   data: 'product_id=' + tis.attr("data-id"),
   dataType: 'json',
   content: this,
   success: $.proxy(function(json) {
   $('.success, .warning, .attention, .information, .error').remove();
   if (json['redirect']) {
   location = json['redirect'];
   }
   if (json['error']) {
   if (json['error']['warning']) {
   $('#notification').html('<div class="warning" style="display: none;">' + json['error']['warning'] + '<span class="close"><i class="icon-remove-sign"></i></span></div>');
   }
   }
   if (json['success']) {
     $('#notification').html('<div class="success" style="display: none;"><i class="icon-thumbs-up"></i>' + json['success'] + '<span class="close"><i class="icon-remove-sign"></i></span></div>');

       $('.success').fadeIn('slow');
   $('#cart-total').html(json['total']);
   $('#cart-total2').html(json['total']);
   $('#cart .content').html(json['output']);
	$('#cart').load('index.php?route=module/cart #cart > *');
	   
   animateProduct(tis.parents().find(".image2 img") , $("#cart"));
   }
   setTimeout(function() {$('.success').fadeOut(1000)},3000)
   }, this)
   });
 }
});


function animateProduct(image,cart){

var image_offset = image.offset();
$("body").append('<img src="' + image.attr('src') + '" id="temp" style="position: absolute; z-index:9999; top:'+image_offset.top+'px; left:'+image_offset.left+'px" />');
var cart_offset = cart.offset();
params = {
top : cart_offset.top + 'px',
left : cart_offset.left + 'px',
opacity : 0.0,
width : cart.width(),
height : cart.height()
};
$('#temp').animate(params, 'slow', false, function () {
$('#temp').remove();
fl=true;
});
}

});

/********************************************************************************************/
/* AddToCart */
$(document).ready(function() {
         var fl=true;

$('.addToCart-1').click(function() {
 if (fl) {
   fl=false;
   var tis = $(this);
   $.ajax({
   url: 'index.php?route=checkout/cart/add',
   type: 'post',
   data: 'product_id=' + tis.attr("data-id"),
   dataType: 'json',
   content: this,
   success: $.proxy(function(json) {
   $('.success, .warning, .attention, .information, .error').remove();
   if (json['redirect']) {
   location = json['redirect'];
   }
   if (json['error']) {
   if (json['error']['warning']) {
   $('#notification').html('<div class="warning" style="display: none;">' + json['error']['warning'] + '<span class="close"><i class="icon-remove-sign"></i></span></div>');
   }
   }
   if (json['success']) {
     $('#notification').html('<div class="success" style="display: none;"><i class="icon-thumbs-up"></i>' + json['success'] + '<span class="close"><i class="icon-remove-sign"></i></span></div>');

       $('.success').fadeIn('slow');
   $('#cart-total').html(json['total']);
   $('#cart .content').html(json['output']);
   animateProduct(tis.parents().find(".image3 img") , $("#cart"));
   }
   setTimeout(function() {$('.success').fadeOut(1000)},3000)
   
   }, this)
   });
 }
});

function animateProduct(image,cart){

var image_offset = image.offset();
$("body").append('<img src="' + image.attr('src') + '" id="temp" style="position: absolute; z-index:9999; top:'+image_offset.top+'px; left:'+image_offset.left+'px" />');
var cart_offset = cart.offset();
params = {
top : cart_offset.top + 'px',
left : cart_offset.left + 'px',
opacity : 0.0,
width : cart.width(),
height : cart.height()
};
$('#temp').animate(params, 'slow', false, function () {
$('#temp').remove();
fl=true;
});
}});



/*************************************************************************************************************related coroucel*****************************************************************************/
$(document).ready(function() {
$('.related-carousel .box-product ul').jcarousel({
	vertical: false,
	visible: 4,
	scroll: 1
});
});
$(document).ready(function() {
$('div.image-caroucel').jcarousel({
	vertical: false,
	visible: 3,
	scroll: 1
});
/********************************************************************************************/
jQuery('.header-button').on("click", function(){
    var ul=jQuery(this).find('ul')
    if(ul.is(':hidden'))
     ul.slideDown()
     ,jQuery(this).addClass('active')
    else
     ul.slideUp()
     ,jQuery(this).removeClass('active')
    jQuery('.header-button').not(this).find('ul').slideUp()
    return false
   });
   jQuery(document).click(function(){
    jQuery('.header-button').removeClass('active').find('ul').slideUp()
   });
/***********************************************************************************/

jQuery(document).ready(function(){
	if ($(body).width() < 768) {
   jQuery('.top-search').on("click", function(){
		if ( $('#search').css('display') == 'none' ) {
		$('#search').animate({height: 'show'}, 400);
		} else {
		$('#search').animate({height: 'hide'}, 200);
		}
   });
   
	jQuery(document).on("click touchstart", function(){
		$('#search').animate({height: 'hide'}, 200);
	});
		jQuery('#search').on("click touchstart", function(event){
		event.stopPropagation();
	});
	jQuery('.top-search').on("click touchstart", function(event){
		event.stopPropagation();
	});
};
 
});
  
   


jQuery("#menu-icon").on("click", function(){
  jQuery(".sf-menu-phone").slideToggle();
  jQuery(this).toggleClass("active");
 });

  jQuery('.sf-menu-phone').find('li.parent').append('<i class="icon-angle-down"></i>');
  jQuery('.sf-menu-phone li.parent i').on("click", function(){
   if (jQuery(this).hasClass('icon-angle-up')) { jQuery(this).removeClass('icon-angle-up').parent('li.parent').find('> ul').slideToggle(); } 
    else {
     jQuery(this).addClass('icon-angle-up').parent('li.parent').find('> ul').slideToggle();
    }
  });



});
/************************************************************************************************shadow height*****************************************************************************************************/
var sect = 1;
		$(document).ready(function() {
            $('.shadow').height($('#page').height());

            $(window).resize(function() {
                $('.shadow').height($('#page').height());
            });

            var sects = $('.shadow').size();
			 
			$('.swipe').height($(window).height()-50);

            $(window).resize(function() {
                $('.swipe').height($(window).height()-50);
            });

            var sects = $('.swipe').size();

        });





/************************************************************************************************wrap span*****************************************************************************************************/
var fl2=true;
function addToCart(product_id) {
	if (fl2) {
		fl2=false;
		$.ajax({
		url: 'index.php?route=checkout/cart/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
		$('.success, .warning, .attention, .information, .error').remove();
		if (json['redirect']) {
		location = json['redirect'];
		}
		if (json['error']) {
		if (json['error']['warning']) {
		$('#notification').html('<div class="warning" style="display: none;">' + json['error']['warning'] + '<span class="close"><i class="icon-remove-sign"></i></span></div>');
		}
		}
		if (json['success']) {
		$('#notification').html('<div class="success" style="display: none;"><i class="icon-thumbs-up"></i>' + json['success'] + '<span class="close"><i class="icon-remove-sign"></i></span></div>');
						
		$('.success').fadeIn('slow');
		$('#cart-total').html(json['total']);
		$('#cart-total2').html(json['total']);
		$('#cart').load('index.php?route=module/cart #cart > *');
		
		$('#cart .content').html(json['output']);
		var image = $('#img_'+product_id).offset();
		if (image) {
		var cart = $('#cart').offset();
		$('<img src="' + $('#img_'+product_id).attr('src') + '" id="temp" style="position: absolute; z-index:9999; top: ' + image.top + 'px; left: ' + image.left + 'px;" />').appendTo('body');
		params = {
		top : cart.top + 'px',
		left : cart.left + 'px',
		opacity : 0.2,
		width :$('#img_'+product_id).width(),
		height : $('#img_'+product_id).height()
		};
		// uncomment line below if you also want to scroll up
		//$('html, body').animate({ scrollTop: 0 }, 'slow');
		$('#temp').animate(params, 'slow', false, function () {
		$('#temp').remove();
		fl2=true;
		});
} else {
fl2=true;
}


}
setTimeout(function() {$('.success').fadeOut(1000)},3000)
}
});
}
}
/************************************************************************************************************/
$(document).ready(function() {
	if ($('body').width() < 768) {
jQuery('.span3 .box-heading').append('<i class="icon-plus-sign"></i>');
  jQuery('.span3 .box-heading').on("click", function(){
   if (jQuery(this).find('i').hasClass('icon-minus-sign')) { jQuery(this).find('i').removeClass('icon-minus-sign').parents('.span3 .box').find('.box-content').slideToggle(); }
   else {
    jQuery(this).find('i').addClass('icon-minus-sign').parents('.span3 .box').find('.box-content').slideToggle();
   }
  })
  
  };
  if ($('body').width() > 940) {
	// tooltip demo
		$('.tooltip-toggle').tooltip({
		selector: "a[data-toggle=tooltip]"
		})
		$('.tooltip-1').tooltip({
			placement:'bottom'
		})
		$('.tooltip-2').tooltip({
			placement:'top'
		})
		$('.tooltip-3').tooltip({
			placement:'left'
		})
		$('.tooltip-4').tooltip({
			placement:'right'
		})
		}
			
/****************************products info************************************/
		if ($('body').width() < 768) {
	jQuery('.tab-heading').append('<i class="icon-plus-sign"></i>');
	jQuery('.tab-heading').on("click", function(){
	if (jQuery(this).find('i').hasClass('icon-minus-sign')) { jQuery(this).find('i').removeClass('icon-minus-sign').parents('.tabs').find('.tab-content').slideToggle(); }
	else {
    jQuery(this).find('i').addClass('icon-minus-sign').parents('.tabs').find('.tab-content').slideToggle();
   }
  })
};
		
		
		
		
});
/**********************************************************add icon aside li *****************************************************************************/
    $(document).ready(function(){
       $('#content').find('.sitemap-info ul>li>a').prepend('<i class="icon-angle-right "></i>');
       $('#content').find('.content ul li>a').prepend('<i class="icon-angle-right "></i>');
       
    });
/******************************************************Aside box category**************************************************************************************/
$(document).ready(function(){
		jQuery('.box .box-category').find('li.parent').prepend('<i class="icon-angle-down"></i>');
		jQuery('.box .box-category li.parent i').on("click", function(){
		if (jQuery(this).hasClass('icon-angle-up')) { jQuery(this).removeClass('icon-angle-up').parent('li.parent').find('> ul').slideToggle(); } 
			else {
			jQuery(this).addClass('icon-angle-up').parent('li.parent').find('> ul').slideToggle();
			}
		});

		/************bx-slider***************/
		$('.related-slider').bxSlider({
			pager:false,
			controls:true,
			slideMargin:30,
			minSlides: 1,
			maxSlides: 4,
			slideWidth: 170,
			infiniteLoop:false,
			moveSlides:1
			});
		$('#gallery').bxSlider({
			pager:false,
			controls:true,
			minSlides: 1,
			maxSlides: 1,
			infiniteLoop:false,
			moveSlides:1
			});
		$('#image-additional').bxSlider({
			pager:false,
			controls:true,
			slideMargin:10,
			minSlides: 3,
			maxSlides: 3,
			slideWidth:70,
			infiniteLoop:false,
			moveSlides:1
			});
		
		
    });

/********************************** swipe ********************************************/
   jQuery(document).ready(function(){
    jQuery('body .swipe-left').swiperight(function(){
        jQuery('body').addClass('ind');
    })
    jQuery('body').swipeleft(function(){
        jQuery('body').removeClass('ind');
    })
	jQuery('#page').click(function(){
      if(jQuery(this).parents('body').hasClass('ind')){
      jQuery(this).parents('body').removeClass('ind');
      return false
     }
	 })
    jQuery('.swipe-control').click(function(){
     if(jQuery(this).parents('body').hasClass('ind')){
      jQuery(this).parents('body').removeClass('ind');
      return false
     }
     else{
      jQuery(this).parents('body').addClass('ind');
      return false
     }
    })

});

