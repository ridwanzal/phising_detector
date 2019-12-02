jQuery.noConflict();
	function setAjaxData(data,iframe,type){
        var id = data.product_id;
        if (jQuery('.btn-cart-'+id).parents('.products-list').length) {
            //list mode
            jQuery('.btn-cart-'+id).parents('.item-area').find('.product-image-wrapper').append('<div class="sw-cart-state"></div>');
        } else {
            jQuery('.btn-cart-'+id).parents('.item-area').append('<div class="sw-cart-state"></div>');
        }
		if(data.status == 'ERROR'){
            jQuery('.sw-cart-state').append('<div class="ajax-cart-fail"><div>' + data.message + '</div></div>');
		}else{
            if(jQuery('.header > .quick-access > .links')){
                jQuery('.header > .quick-access > .links').replaceWith(data.toplink);
            }
			if(jQuery('.top-bar .top-links > .links')) {
                jQuery('.top-bar .top-links > .links').replaceWith(data.toplink);
            }
            if(jQuery('.header .shopping-cart')){
                jQuery('.header .shopping-cart').replaceWith(data.cart_sidebar);
            }
			
	        jQuery.fancybox.close();
			if(type!='item'){
				//jQuery('#after-loading-success-message').show();
                jQuery('.sw-cart-state').append('<div class="ajax-cart-success"><div>' + data.message + '</div></div>');
			}
            et_update_favicon();
		}
        setTimeout(function(){
            jQuery('.loading-state').removeClass('loading-state');
            jQuery('.sw-cart-state').remove();
        }, 3000);
	}
	function setLocationAjax(url,id,type){
        if (url.indexOf("?")){
            url = url.split("?")[0];
        }
		url += 'isAjax/1';
		url = url.replace("checkout/cart","ajaxcart/index");
        if(window.location.href.match("https://") && !url.match("https://")){
            url = url.replace("http://", "https://");
        }
        if(window.location.href.match("http://") && !url.match("http://")){
            url = url.replace("https://", "http://");
        }
        
		//jQuery('#loading-mask').show();
        if (jQuery('.btn-cart-'+id).parents('.products-list').length) {
            //list mode
            jQuery('.btn-cart-'+id).parents('.item-area').find('.product-image-wrapper').addClass('loading-state');
            jQuery('.btn-cart-'+id).parents('.item-area').find('.product-image-wrapper').append('<div class="sw-qv-loading"></div>');
        } else {
            jQuery('.btn-cart-'+id).parents('.item-area').addClass('loading-state');
            jQuery('.btn-cart-'+id).parents('.item-area').append('<div class="sw-qv-loading"></div>');
        }
		try {
			jQuery.ajax( {
				url : url,
				dataType : 'json',
				success : function(data) {
					//jQuery('#loading-mask').hide();
                    jQuery('.sw-qv-loading').remove();
         			setAjaxData(data,false,type);
				}
			});
		} catch (e) {
		}
	}

    function showOptions(id){
		initFancybox();
        jQuery('#fancybox'+id).trigger('click');
        if (jQuery('#fancybox'+id).parents('.products-list').length) {
            //list mode
            jQuery('#fancybox'+id).parents('.item-area').find('.product-image-wrapper').addClass('loading-state');
            jQuery('#fancybox'+id).parents('.item-area').find('.product-image-wrapper').append('<div class="sw-qv-loading"></div>');
        } else {
            jQuery('#fancybox'+id).parents('.item-area').addClass('loading-state');
            jQuery('#fancybox'+id).parents('.item-area').append('<div class="sw-qv-loading"></div>');
        }
        
    }
	
	function initFancybox(){
		jQuery.noConflict();
        //updated from version 1.2.1 - iframe to ajax
		jQuery(document).ready(function(){
		jQuery('.fancybox').fancybox({
				hideOnContentClick : true,
				width: 450,
				padding: 0,
				autoDimensions: true,
				type : 'ajax', 
				showTitle: false,
				scrolling: 'auto',
                'loadingIcon': false,
                'afterLoad'         : function() {                                    
                    jQuery('#fancybox-content').height('auto'); 
                    jQuery('.fancybox-overlay').addClass('loading-success');               
                    jQuery('.sw-qv-loading').remove();
                },
                'afterShow'        : function() {
                    loadQtyControl();
                    swatchesConfig = new Product.ConfigurableSwatches(spConfig);
                },
                'onCancel'          : function() {
                    jQuery('.loading-state').removeClass('loading-state');
                    jQuery('.sw-qv-loading').remove();
                },
                'afterClose'          : function() {
                    jQuery('.loading-state').removeClass('loading-state');
                    jQuery('.sw-qv-loading').remove();                
                },
                'helpers'             : {
                    overlay : {
                        locked  : false, // try changing to true and scrolling around the page                    
                        css     : {'opacity' : '0'}
                    }
                }
			}
		);
		});   	
	}
	function ajaxCompare(url,id){
	    url = url.replace("catalog/product_compare/add","ajaxcart/whishlist/compare");
		if (url.indexOf("?")){
            url = url.split("?")[0];
        }
		url += 'isAjax/1';
        if(window.location.href.match("https://") && !url.match("https://")){
            url = url.replace("http://", "https://");
        }
        if(window.location.href.match("http://") && !url.match("http://")){
            url = url.replace("https://", "http://");
        }
//		jQuery('#loading-mask').show();
        if (jQuery('.link-wishlist-'+id).parents('.products-list').length) {
            //list mode
            jQuery('.link-compare-'+id).parents('.item-area').find('.product-image-wrapper').addClass('loading-state');
            jQuery('.link-compare-'+id).parents('.item-area').find('.product-image-wrapper').append('<div class="sw-qv-loading"></div>');
        } else {
            jQuery('.link-compare-'+id).parents('.item-area').addClass('loading-state');
            jQuery('.link-compare-'+id).parents('.item-area').append('<div class="sw-qv-loading"></div>');
        }
        

	    jQuery.ajax( {
		    url : url,
		    dataType : 'json',
		    success : function(data) {
                jQuery('.sw-qv-loading').remove();
                if (jQuery('.link-compare-'+id).parents('.products-list').length) {
                    //list mode
                    jQuery('.link-compare-'+id).parents('.item-area').find('.product-image-wrapper').append('<div class="sw-cart-state"></div>');
                } else {
                    jQuery('.link-compare-'+id).parents('.item-area').append('<div class="sw-cart-state"></div>');
                }
//			    jQuery('#loading-mask').hide();
			    if(data.status == 'ERROR'){
//				    alert(data.message);
                    jQuery('.sw-cart-state').append('<div class="ajax-cart-fail"><div>' + data.message + '</div></div>');
			    }else{
//				    alert(data.message);
                    jQuery('.sw-cart-state').append('<div class="ajax-cart-success"><div>' + data.message + '</div></div>');
				    if(jQuery('.block-compare').length){
                        jQuery('.block-compare').replaceWith(data.sidebar);
                    }else{
                        if(jQuery('.col-right').length){
                    	    jQuery('.col-right').prepend(data.sidebar);
                        }
                    }
			    }
                setTimeout(function(){
                    jQuery('.loading-state').removeClass('loading-state');
                    jQuery('.sw-cart-state').remove();
                }, 3000);
		    }
	    });
    }
    function ajaxCompareView(url,id){
        url = url.replace("catalog/product_compare/add","ajaxcart/whishlist/compare");
        if (url.indexOf("?")){
            url = url.split("?")[0];
        }
        url += 'isAjax/1';
        if(window.location.href.match("https://") && !url.match("https://")){
            url = url.replace("http://", "https://");
        }
        if(window.location.href.match("http://") && !url.match("http://")){
            url = url.replace("https://", "http://");
        }
        jQuery('#loading-mask').show();
        jQuery.ajax( {
            url : url,
            dataType : 'json',
            success : function(data) {
                jQuery('#loading-mask').hide();
                if(data.status == 'ERROR'){
//                    alert(data.message);
                    jQuery('#messages_product_view').append('<div class="sw-cart-state"><div class="ajax-cart-fail"><div>'+data.message+'</div></div></div>');
                }else{
//                    alert(data.message);
                    jQuery('#messages_product_view').append('<div class="sw-cart-state"><div class="ajax-cart-success"><div>'+data.message+'</div></div></div>');
                    if(jQuery('.block-compare').length){
                        jQuery('.block-compare').replaceWith(data.sidebar);
                    }else{
                        if(jQuery('.col-right').length){
                            jQuery('.col-right').prepend(data.sidebar);
                        }
                    }
                }
                setTimeout(function(){
                    jQuery('.sw-cart-state').remove();
                }, 10000);
            }
        });
    }
    function ajaxWishlist(url,id){
	    url = url.replace("wishlist/index","ajaxcart/whishlist");
        if (url.indexOf("?")){
            url = url.split("?")[0];
        }
		url += 'isAjax/1';
        if(window.location.href.match("https://") && !url.match("https://")){
            url = url.replace("http://", "https://");
        }
        if(window.location.href.match("http://") && !url.match("http://")){
            url = url.replace("https://", "http://");
        }
        if (jQuery('.link-wishlist-'+id).parents('.products-list').length) {
            //list mode
            jQuery('.link-wishlist-'+id).parents('.item-area').find('.product-image-wrapper').addClass('loading-state');
            jQuery('.link-wishlist-'+id).parents('.item-area').find('.product-image-wrapper').append('<div class="sw-qv-loading"></div>');
        } else {
            jQuery('.link-wishlist-'+id).parents('.item-area').addClass('loading-state');
            jQuery('.link-wishlist-'+id).parents('.item-area').append('<div class="sw-qv-loading"></div>');
        }
//	    jQuery('#loading-mask').show();
	    jQuery.ajax( {
		    url : url,
		    dataType : 'json',
		    success : function(data) {
                jQuery('.sw-qv-loading').remove();
                if (jQuery('.link-wishlist-'+id).parents('.products-list').length) {
                    //list mode
                    jQuery('.link-wishlist-'+id).parents('.item-area').find('.product-image-wrapper').append('<div class="sw-cart-state"></div>');
                } else {
                    jQuery('.link-wishlist-'+id).parents('.item-area').append('<div class="sw-cart-state"></div>');
                }
//			    jQuery('#loading-mask').hide();
			    if(data.status == 'ERROR'){
//				    alert(data.message);
                    jQuery('.sw-cart-state').append('<div class="ajax-cart-fail"><div>' + data.message + '</div></div>');
			    }else{
				    //alert(data.message);
                    jQuery('.sw-cart-state').append('<div class="ajax-cart-success"><div>' + data.message + '</div></div>');
                    if(jQuery('.top-bar > .container > .top-links > .links')){
                        jQuery('.top-bar > .container > .top-links > .links').replaceWith(data.toplink);
                    }
			    }
                setTimeout(function(){
                    jQuery('.loading-state').removeClass('loading-state');
                    jQuery('.sw-cart-state').remove();
                }, 3000);
		    }
	    });
    }
    function ajaxWishlistView(url,id){
        url = url.replace("wishlist/index","ajaxcart/whishlist");
        if (url.indexOf("?")){
            url = url.split("?")[0];
        }
        url += 'isAjax/1';
        if(window.location.href.match("https://") && !url.match("https://")){
            url = url.replace("http://", "https://");
        }
        if(window.location.href.match("http://") && !url.match("http://")){
            url = url.replace("https://", "http://");
        }
        jQuery('#loading-mask').show();
        jQuery.ajax( {
            url : url,
            dataType : 'json',
            success : function(data) {                
                jQuery('#loading-mask').hide();
                if(data.status == 'ERROR'){
//                    alert(data.message);
                    jQuery('#messages_product_view').append('<div class="sw-cart-state"><div class="ajax-cart-fail"><div>'+data.message+'</div></div></div>');
                }else{
                    //alert(data.message);
                    jQuery('#messages_product_view').append('<div class="sw-cart-state"><div class="ajax-cart-success"><div>'+data.message+'</div></div></div>');
                    if(jQuery('.top-bar > .container > .top-links > .links')){
                        jQuery('.top-bar > .container > .top-links > .links').replaceWith(data.toplink);
                    }
                }
                setTimeout(function(){
                    jQuery('.sw-cart-state').remove();
                }, 10000);
            }
        });
    }
    function deleteAction(deleteUrl,itemId,msg){
	    var result =  confirm(msg);
	    if(result==true){
		    setLocationAjax(deleteUrl,itemId,'item')
	    }else{
		    return false;
	    }
    }