jQuery(document).ready(function(){
    var locationUrl = document.location.href;
    var BASE_URL_INDEX = BASE_URL + 'index.php';
    var BASE_URL_INDEX2 = BASE_URL_INDEX + '/';
    
    if(locationUrl == BASE_URL || locationUrl == BASE_URL_INDEX || locationUrl == BASE_URL_INDEX2 ){
        jQuery('.homelink').addClass('active');
    }
    
    if(locationUrl == CUSTOM_LINK_URL ){
        jQuery('.custom_link').addClass('active');
    }
	
	//"Top" button
    var scroll_timer;
    var displayed = false;
    var $message = jQuery('div#message');
    var $window = jQuery(window);
    var top = jQuery(document.body).children(0).position().top;
        
    $window.scroll(function () {
        window.clearTimeout(scroll_timer);
        scroll_timer = window.setTimeout(function () { 
        if($window.scrollTop() <= top) 
        {
            displayed = false;
            $message.fadeOut(500);
        }
        else if(displayed == false) 
        {
            displayed = true;
            $message.stop(true, true).fadeIn(500).click(function () { $message.fadeOut(500); });
        }
        }, 400);
    });
      
    jQuery('#top-link').click(function(e) {
			e.preventDefault();
            jQuery('html, body').animate({scrollTop:0}, 'slow');
    });
	
	jQuery('.required-entry').change(function(e) {
		var id = this.id;
		jQuery(this).removeClass('validation-failed');
		jQuery('#advice-required-entry-' + id).remove();
	});	
});