tryReady = function(time_elapsed) {
  // Continually polls to see if jQuery is loaded.
  if (typeof $ == "undefined") { 
    if (time_elapsed <= 5000) { 
      setTimeout("tryReady(" + (time_elapsed + 200) + ")", 200);
    } else {
      alert("Timed out while loading jQuery.")
    }
  } else {

	
	// alert(imgLoaded);
	if (!$.browser.msie) {
		$('.picture').animate({opacity:'1'},{queue:false,duration:200});
	} else {
		$('.picture').css({visibility:'visible'});
	}
		
	
	
  	
  	// hover phones
	$(document).ready(function() {
		/* $('li#d5').css({visibility:'visible'}); */
		
		$('#screen').css({visibility:'visible'});
		
		topNew = '102px';
		topOld = '96px';
		opNew = '0.25';
		opOld = '1';
		
				$(".platforms .p1").hover(
			function() {
				$('#pl1').animate({top:'-6px'},{queue:false,duration:200});
				$('#pl1r').animate({top:topNew,opacity:opNew},{queue:false,duration:200}); 
			},
			function() {
				$('#pl1').animate({top:'0px'},{queue:false,duration:200});
				$('#pl1r').animate({top:topOld,opacity:opOld},{queue:false,duration:200}); 
			}
		);
		
				$(".platforms .p2").hover(
			function() {
				$('#pl2').animate({top:'-6px'},{queue:false,duration:200});
				$('#pl2r').animate({top:topNew,opacity:opNew},{queue:false,duration:200}); 
			},
			function() {
				$('#pl2').animate({top:'0px'},{queue:false,duration:200});
				$('#pl2r').animate({top:topOld,opacity:opOld},{queue:false,duration:200}); 
			}
		);
		
				$(".platforms .p3").hover(
			function() {
				$('#pl3').animate({top:'-6px'},{queue:false,duration:200});
				$('#pl3r').animate({top:topNew,opacity:opNew},{queue:false,duration:200}); 
			},
			function() {
				$('#pl3').animate({top:'0px'},{queue:false,duration:200});
				$('#pl3r').animate({top:topOld,opacity:opOld},{queue:false,duration:200}); 
			}
		);
		
				$(".platforms .p4").hover(
			function() {
				$('#pl4').animate({top:'-6px'},{queue:false,duration:200});
				$('#pl4r').animate({top:topNew,opacity:opNew},{queue:false,duration:200}); 
			},
			function() {
				$('#pl4').animate({top:'0px'},{queue:false,duration:200});
				$('#pl4r').animate({top:topOld,opacity:opOld},{queue:false,duration:200}); 
			}
		);
		
				$(".platforms .p5").hover(
			function() {
				$('#pl5').animate({top:'-6px'},{queue:false,duration:200});
				$('#pl5r').animate({top:topNew,opacity:opNew},{queue:false,duration:200}); 
			},
			function() {
				$('#pl5').animate({top:'0px'},{queue:false,duration:200});
				$('#pl5r').animate({top:topOld,opacity:opOld},{queue:false,duration:200}); 
			}
		);
		
			});
	
	// setup carusel

		function mycarousel1_initCallback(carousel) {
		/*
			    jQuery('.screen-control a').bind('click', function() {			        
					rel = jQuery($obj).attr('rel');
					jQuery('#screen').data('jcarousel').scroll(jQuery.jcarousel.intval(rel));
					
					return false;
			    });

			    jQuery('.screen-control a').bind('mouseenter', function() {
			    
					$obj = this;
					timer = window.setTimeout(function() {
						rel = jQuery($obj).attr('rel');
				        jQuery('#screen').data('jcarousel').scroll(jQuery.jcarousel.intval(rel));
				        
				        return false;
					}, 150);
			    });	
			    
			    jQuery('.screen-control a').bind('mouseleave', function() {
					if (timer) { window.clearTimeout(timer); }
			    });	
			 */
			    
			};	
			
			// Ride the carousel...
		jQuery(document).ready(function() {
		
				    jQuery('#screen').jcarousel({
				        scroll: 1,
				        auto: 10,
				        start: 1, 
				        initCallback: mycarousel1_initCallback,
				        wrap: 'last',
				        animation: 500,
				        easing: 'easeInOutCubic',
				        // This tells jCarousel NOT to autobuild prev/next buttons
	
				        buttonNextHTML: null,
				        buttonPrevHTML: null /*,
	
	        			itemVisibleInCallback: {
	        				onBeforeAnimation: item1VisibleIn },
	        			itemVisibleOutCallback: {
	        				onBeforeAnimation: item1VisibleOut }*/
				    });
				    
			function item1VisibleIn(carousel, li, index, state)
				{
					rel = $(li).attr('id');
					$('#s'+rel).addClass('active');
				}
				
			function item1VisibleOut(carousel, li, index, state)
				{
					
					rel = $(li).attr('id');
					$('#s'+rel).removeClass('active');
				}
		});
		
		// internal carousel
			function mycarousel_initCallback(carousel) {
			    jQuery('.reviews .jcarousel-control a').bind('click', function() {
			        rel = jQuery(this).attr('rel');
			        jQuery('.reviews').data('jcarousel').scroll(jQuery.jcarousel.intval(rel));
			        
			        return false;
			    });
		
			};
			function itemVisibleIn(carousel, li, index, state)
			{
				rel = $(li).attr('id');
				$('#c'+rel).addClass('active');
			}
			
			function itemVisibleOut(carousel, li, index, state)
			{
				rel = $(li).attr('id');
				$('#c'+rel).removeClass('active');
			}
			
			// Ride the carousel...
			jQuery(document).ready(function() {
			    jQuery('.reviews').jcarousel({
			        scroll: 1,
			        auto: 5,
			        initCallback: mycarousel_initCallback,
			        wrap: 'last',
			        // This tells jCarousel NOT to autobuild prev/next buttons

			        buttonNextHTML: null,
			        buttonPrevHTML: null,

        			itemVisibleInCallback: itemVisibleIn,
        			itemVisibleOutCallback: itemVisibleOut
			    });
			    
			});




  }
}


tryReady(0);