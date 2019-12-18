function ajaxCompare(url,id){
	url = url.replace("catalog/product_compare/add","ajaxwishlist/index/compare");
	url += 'isAjax/1/';
	jQuery('#ajax_loading'+id).show();
	jQuery.ajax( {
		url : url,
		dataType : 'json',
		success : function(data) {
			jQuery('#ajax_loading'+id).hide();
			if(data.status == 'ERROR'){
						jQuery('body').append('<div class="alert"></div>');
						jQuery('.alert').slideDown(400);
				jQuery('.alert').html(data.message).append('<button></button>');
				jQuery('button').click(function () {
                jQuery('.alert').slideUp(400);
                 });	
					jQuery('.alert').slideDown('400',function(){
									 	setTimeout(function(){
											jQuery('.alert').slideUp('400',function(){jQuery(this).slideUp(400)});
										},7000)
									 });
			}else{
						jQuery('body').append('<div class="alert"></div>');
						jQuery('.alert').slideDown(400);
				jQuery('.alert').html(data.message).append('<button></button>');
				jQuery('button').click(function () {
                jQuery('.alert').slideUp(400);
                 });	
					jQuery('.alert').slideDown('400',function(){
									 	setTimeout(function(){
											jQuery('.alert').slideUp('400',function(){jQuery(this).slideUp(400)});
										},7000)
									 });
				if(jQuery('.block-compare').length){
                    jQuery('.block-compare').replaceWith(data.sidebar);
                }else{
                    if(jQuery('.col-right').length){
                    	jQuery('.col-right').prepend(data.sidebar);
                    }
                }
			}
		}
	});
}
	
function ajaxWishlist(url,id){
	url = url.replace("wishlist/index","ajaxwishlist/index");
	url += 'isAjax/1/';
	jQuery('#ajax_loading'+id).show();
	jQuery.ajax( {
		url : url,
		dataType : 'json',
		success : function(data) {
			jQuery('#ajax_loading'+id).hide();
			if(data.status == 'ERROR'){
						jQuery('body').append('<div class="alert"></div>');
						jQuery('.alert').slideDown(400);
				jQuery('.alert').html(data.message).append('<button></button>');
				jQuery('button').click(function () {
                jQuery('.alert').slideUp(400);
                 });	
					jQuery('.alert').slideDown('400',function(){
									 	setTimeout(function(){
											jQuery('.alert').slideUp('400',function(){jQuery(this).slideUp(400)});
										},7000)
									 });
			}else{
						jQuery('body').append('<div class="alert"></div>');
						jQuery('.alert').slideDown(400);
				jQuery('.alert').html(data.message).append('<button></button>');
				jQuery('button').click(function () {
                jQuery('.alert').slideUp(400);
                 });	
					jQuery('.alert').slideDown('400',function(){
									 	setTimeout(function(){
											jQuery('.alert').slideUp('400',function(){jQuery(this).slideUp(400)});
										},7000)
									 });
				if(jQuery('.block-wishlist').length){
                    jQuery('.block-wishlist').replaceWith(data.sidebar);
                }else{
                    if(jQuery('.col-right').length){
                    	jQuery('.col-right').prepend(data.sidebar);
                    }
					     if(jQuery('.header .links').length){
                            jQuery('.header .links').replaceWith(data.toplink);
                        }
                }
			}
		}
	});
}
