(function($){
	
	$.fn.viewport = function(){	
	    var e = window, a = 'inner';
	    if (!('innerWidth' in window )) {
	        a = 'client';
	        e = document.documentElement || document.body;
	    }
	    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	}	
	
	$.fn.getScrollbarWidth=	function(){
		document.body.style.overflow = 'hidden'; 
		var width = document.body.clientWidth;
		document.body.style.overflow = 'scroll'; 
		width -= document.body.clientWidth; 
		if(!width) width = document.body.offsetWidth - document.body.clientWidth;
		document.body.style.overflow = ''; 	
		return width;
	}
	
	$.fn.detectDevice = function(){
		//var width = $(window).width();
		var width = $.fn.viewport().width;
		var scrollWidth = $().getScrollbarWidth();

		if( width >= 1200 ){
			return 'wide';
		}else if( width >= 980 ){
			return 'normal';
		}else if(  width >= 768 && width <= 979 ){
			return 'tablet';			
		}else if( width >= 480 && width <= 767 ){
			return 'stablet';
		// }else if( width > 600 && width < 800 ){
			// return 'stablet';
		}else if(  width > 0 ){
			return 'mobile';
		}
		/*
		Mobile portrait (320x480)
		Mobile landscape (480x320)
		Small tablet portrait (600x800)
		Small tablet landscape (800x600)
		Tablet portrait (768x1024
		Tablet landscape (1024x768)
		*/	
		
		/*	
		if( width >= 1183 ){
			return 'wide';
		}else if( width >= 963 ){
			return 'normal';
		}else if(  width >= 751 && width <= 962 ){
			return 'tablet';			
		}else if( width >= 463 && width <= 750 ){
			return 'stablet';
		// }else if( width > 600 && width < 800 ){
			// return 'stablet';
		}else if(  width > 0 ){
			return 'mobile';
		}
		*/
		// if( width > 1200 ){
			// return 'wide';
		// }else if( width > 980 ){
			// return 'normal';	/* Normal(>980) && Tablet landscape (1024x768) */
		// }else if( width > 600 && width < 800 ){
			// return 'stablet';	/* Tablet portrait (768x1024) && Small tablet landscape (800x600) */
		// }else if(  width > 768 ){
			// return 'tablet';
		// }else if(  width > 0 ){
			// return 'mobile';
		// }	
			
	}

	$.fn.updateDataElementClass = function(){
		var $this = $(this);
		
		currentdevice = (currentdevice)?currentdevice:$.fn.detectDevice();
		
		// Build data
		if ($this.data('default')) return; 		
		// With attr data-*
		else $this.data();
		// Make the source better view in inspector
    	$this.removeAttr ('data-default data-wide data-normal data-tablet data-stablet data-mobile');
		// For element no attr data-default
		if (!$this.data('default')) 
			$this.data('default', $this.attr('class'));
		// Default
		if ( !$this.data('default') ||  !currentdevice || !$this.data(currentdevice))
			return;	

		// Add new
		else{
				// Remove current
				$this.removeClass ($this.data('default'));			
				$this.addClass ($this.data(currentdevice));
		}
	}
	
})(jQuery || jsmart)

var currentdevice = '';
/*var bootstrap_elements = $jsmart('[class*="span"]');*/

$jsmart(document).ready(function($){

	// Build data
	$jsmart('[class*="span"]').each ( function(){
		var $this = $(this);
		// With attr data-*
		$this.data();
		// Make the source better view in inspector
    	$this.removeAttr ('data-default data-wide data-normal data-tablet data-stablet data-mobile');
		// For element no attr data-default
		if (!$this.data('default')) 
			$this.data('default', $this.attr('class'));
	
	});
	function updateBootstrapElementClass(newdevice){
		console.log(newdevice);
  		if (newdevice == currentdevice) return ;
  		
  		$jsmart('[class*="span"]').each(function(){
			var $this = $(this);
			// Default
			if ( !$this.data('default') || (!$this.data(newdevice) && (!currentdevice || !$this.data(currentdevice))) )
				return;
			// Remove current
			if ($this.data(currentdevice)) $this.removeClass($this.data(currentdevice));
			else $this.removeClass ($this.data('default'));
			// Add new
			if ($this.data(newdevice)) $this.addClass ($this.data(newdevice));
			else $this.addClass ($this.data('default'));
		});
    	currentdevice = newdevice;
	};
	function getScrollbarWidth(){
		document.body.style.overflow = 'hidden'; 
		var width = document.body.clientWidth;
		document.body.style.overflow = 'scroll'; 
		width -= document.body.clientWidth; 
		if(!width) width = document.body.offsetWidth - document.body.clientWidth;
		document.body.style.overflow = ''; 	
		return width;
	}
	function viewport() {
	    var e = window, a = 'inner';
	    if (!('innerWidth' in window )) {
	        a = 'client';
	        e = document.documentElement || document.body;
	    }
	    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	}	
	function detectDevice () {
		//var width = $(window).width();
		var width = viewport().width;
		var scrollWidth = getScrollbarWidth();

		if( width >= 1200 ){
			return 'wide';
		}else if( width >= 980 ){
			return 'normal';
		}else if(  width >= 768 && width <= 979 ){
			return 'tablet';			
		}else if( width >= 480 && width <= 767 ){
			return 'stablet';
		// }else if( width > 600 && width < 800 ){
			// return 'stablet';
		}else if(  width > 0 ){
			return 'mobile';
		}
		/*
		Mobile portrait (320x480)
		Mobile landscape (480x320)
		Small tablet portrait (600x800)
		Small tablet landscape (800x600)
		Tablet portrait (768x1024
		Tablet landscape (1024x768)
		*/	
		
		/*	
		if( width >= 1183 ){
			return 'wide';
		}else if( width >= 963 ){
			return 'normal';
		}else if(  width >= 751 && width <= 962 ){
			return 'tablet';			
		}else if( width >= 463 && width <= 750 ){
			return 'stablet';
		// }else if( width > 600 && width < 800 ){
			// return 'stablet';
		}else if(  width > 0 ){
			return 'mobile';
		}
		*/
		
		// if( width > 1200 ){
			// return 'wide';
		// }else if( width > 980 ){
			// return 'normal';	/* Normal(>980) && Tablet landscape (1024x768) */
		// }else if( width > 600 && width < 800 ){
			// return 'stablet';	/* Tablet portrait (768x1024) && Small tablet landscape (800x600) */
		// }else if(  width > 768 ){
			// return 'tablet';
		// }else if(  width > 0 ){
			// return 'mobile';
		// }	
		
	}
  	updateBootstrapElementClass (detectDevice());
  
  	// With window resize 
  	$(window).resize(function(){ 
    	if ($.data(window, 'detect-device-time'))
      		clearTimeout($.data(window, 'detect-device-time'));
			
    	$.data(window, 'detect-device-time', 
      		setTimeout(function(){
        		updateBootstrapElementClass (detectDevice());
      		}, 400)
    	)
  	})
});	
