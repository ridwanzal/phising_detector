jQuery(document).ready(function() {
                  if (jQuery.fn.cssOriginal!=undefined)   // CHECK IF fn.css already extended
                   jQuery.fn.css = jQuery.fn.cssOriginal;
                   jQuery('.fullwidthbanner').revolution(CONFIG_REVOLUTION);    
});