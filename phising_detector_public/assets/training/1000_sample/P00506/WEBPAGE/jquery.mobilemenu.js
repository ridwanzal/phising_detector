jQuery(document).ready(function(){
    jQuery('#mobile-menu-button').click(function(){
        jQuery('#mobile-menu').slideToggle(200);
    });
	
	var navList = jQuery('#mobile-menu');
    var navOpener = '<span class="open-child">(open)</span>';
        
    navList.find('li:has(ul)',this).each(function() {
		jQuery(this).prepend(navOpener);
	})
    
    navList.find('.open-child').toggle(function(){
        jQuery(this).parent().addClass('over').find('>ul').slideDown(200);
		jQuery(this).parent().addClass('over').find('.nav_block>ul').slideDown(200);
    },function(){
        jQuery(this).parent().removeClass('over').find('>ul').slideUp(200);
		jQuery(this).parent().removeClass('over').find('.nav_block>ul').slideUp(200);
    });
});