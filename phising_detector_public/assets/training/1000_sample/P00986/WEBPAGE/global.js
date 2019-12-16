/*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/
//global variables
var responsiveflag = false;

$(document).ready(function(){
	highdpiInit();
	responsiveResize();
 	$(window).resize( $.debounce( 250, responsiveResize ));	

	if (navigator.userAgent.match(/Android/i))
	{
		var viewport = document.querySelector('meta[name="viewport"]');
		viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
		window.scrollTo(0, 1);
	}
	if (typeof quickView !== 'undefined' && quickView)
		quick_view();

	dropDown();
	dropDownMobileHeader();

	if (typeof iqit_mobile_header_sticky !== 'undefined' && iqit_mobile_header_sticky)
		stickyMobileHeader();


	if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'product', 'module-iqitcontentcreator-Editor']))
	{	

		bindGrid();

 		$(document).on('change', '.selectProductSort', function(e){
			if (typeof request != 'undefined' && request)
				var requestSortProducts = request;
 			var splitData = $(this).val().split(':');
 			var url = '';
			if (typeof requestSortProducts != 'undefined' && requestSortProducts)
			{
				url += requestSortProducts ;
				if (typeof splitData[0] !== 'undefined' && splitData[0])
				{
					url += ( requestSortProducts.indexOf('?') < 0 ? '?' : '&') + 'orderby=' + splitData[0] + (splitData[1] ? '&orderway=' + splitData[1] : '');
					if (typeof splitData[1] !== 'undefined' && splitData[1])
						url += '&orderway=' + splitData[1];
				}
				document.location.href = url;
			}
    	});

		$(document).on('change', 'select[name="n"]', function(){
			$(this.form).submit();
		});

		$(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function() {
			if (this.value != '')
				location.href = this.value;
		});

		$(document).on('change', 'select[name="currency_payment"]', function(){
			setCurrency($(this).val());
		});
	}

	if(typeof(iqit_qtycart) != "undefined" && iqit_qtycart !== null && iqit_qtycart) {
	// The button to increment the product value
	$(document).on('click', '.pl_product_quantity_up', function(e){
		e.preventDefault();
		fieldName = $(this).data('field-qty');
		var currentVal = parseInt($(this).parent().parent().find('.' + fieldName).first().val());
		if (!isNaN(currentVal) && currentVal)
			$(this).parent().parent().find('.' + fieldName).first().val(currentVal + 1).trigger('keyup');
	});

	 // The button to decrement the product value
	 $(document).on('click', '.pl_product_quantity_down', function(e){
	 	e.preventDefault();
	 	fieldName = $(this).data('field-qty');
	 	var currentVal = parseInt($(this).parent().parent().find('.' + fieldName).first().val());
	 	if (!isNaN(currentVal) && currentVal > 1)
	 		$(this).parent().parent().find('.' + fieldName).first().val(currentVal - 1).trigger('keyup');
	 });
	}

	$(document).on('click', '.back', function(e){
		e.preventDefault();
		history.back();
	});
	
	jQuery.curCSS = jQuery.css;
	if (!!$.prototype.cluetip)
		$('a.cluetip').cluetip({
			local:true,
			cursor: 'pointer',
			dropShadow: false,
			dropShadowSteps: 0,
			showTitle: false,
			tracking: true,
			sticky: false,
			mouseOutClose: true,
			fx: {             
		    	open:       'fadeIn',
		    	openSpeed:  'fast'
			}
		}).css('opacity', 0.8);

	if (!!$.prototype.fancybox)
		$.extend($.fancybox.defaults.tpl, {
			closeBtn : '<a title="' + FancyboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
			next     : '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
		});

	// Close Alert messages
	$(".alert.alert-danger").on('click', this, function(e){
		if (e.offsetX >= 16 && e.offsetX <= 39 && e.offsetY >= 16 && e.offsetY <= 34)
			$(this).fadeOut();
	});
});

function highdpiInit()
{
	if (typeof highDPI === 'undefined')
		return;
	if(highDPI && $('.replace-2x').css('font-size') == "1px")
	{
		var els = $("img.replace-2x").get();
		for(var i = 0; i < els.length; i++)
		{
			if (typeof $(els[i]).data('original') != 'undefined') {
 			src = $(els[i]).data('original');
			}
			else if (typeof $(els[i]).data('lazy') != 'undefined') {
 			src = $(els[i]).data('lazy');
			}
			else{
			src = els[i].src;
			}

			extension = src.substr( (src.lastIndexOf('/') +1) );
			
			src = src.replace("/" + extension, "2x/" + extension);

			if (typeof $(els[i]).data('original') != 'undefined') {
 			$(els[i]).data('original', src);
			}
			else if (typeof $(els[i]).data('lazy') != 'undefined') {
 			$(els[i]).data('lazy', src);
			}
			console.log(src);
			els[i].src = src;
		}
	}
	var $rlimg = $('img.replace-2xlogo');
	
	if($rlimg.css('font-size') == "1px")
	{	
		newlogosrc = $rlimg.data('retinalogo');
		if (typeof newlogosrc != 'undefined')
		{
			$rlimg.attr('src', newlogosrc);
		}	


	}
}

// Used to compensante Chrome/Safari bug (they don't care about scroll bar for width)
function scrollCompensate()
{
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild(inner);

	document.body.appendChild(outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild(outer);

	return (w1 - w2);
}

function responsiveResize()
{
compensante = scrollCompensate();
	if (($(window).width()+scrollCompensate()) <= 767 && responsiveflag == false)
	{
		accordion('enable');
	    accordionFooter('enable');
		responsiveflag = true;
	}
	else if (($(window).width()+scrollCompensate()) >= 768)
	{
		accordion('disable');
		accordionFooter('disable');
	    responsiveflag = false;
	}
	blockHover();
}

function blockHover(status)
{	
	var screenLg = $('body').find('#columns').first().width() >= 890;

	$(document).off('mouseenter').on('mouseenter', '.product-container', function(e){
		if (screenLg && !is_touch_device())
			$(this).addClass("hovered");
	});

	$(document).off('mouseleave').on('mouseleave', '.product-container', function(e){
		if (screenLg && !is_touch_device())
			$(this).removeClass("hovered");
		
	});
}

function is_touch_device() {
	return !!('ontouchstart' in window);
};


function quick_view()
{
	$(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function(e){
		e.preventDefault();
		var url = this.rel;
		var anchor = '';

		if (url.indexOf('#') != -1)
		{
			anchor = url.substring(url.indexOf('#'), url.length);
			url = url.substring(0, url.indexOf('#'));
		}

		if (url.indexOf('?') != -1)
			url += '&';
		else
			url += '?';

		if (!!$.prototype.fancybox)
			$.fancybox({
				'padding':  0,
				'width':    1087,
				'height':   610,
				'type':     'iframe',
				'href':     url + 'content_only=1' + anchor
			});
	});
}

function bindGrid()
{
	var storage = false;
	if (typeof(getStorageAvailable) !== 'undefined') {
		storage = getStorageAvailable();
	}
	if (!storage) {
		return;
	}
	
	var view = $.totalStorage('display');
	
	if (!view && (typeof displayList != 'undefined') && displayList == 0)
		view = 'list';

	if (!view && (typeof displayList != 'undefined') && displayList == 2)
		view = 'table'

	if (view && view != 'grid')
		display(view);
	else
		$('.display').find('li#grid').addClass('selected');
	
	$(document).on('click', '#grid', function(e){
		e.preventDefault();
		$('ul.product_list').animate({ opacity: 0 }, 400);
		setTimeout(function() { display('grid'); }, 400)
		$('ul.product_list').animate({ opacity: 1 }, 400);
	});

	$(document).on('click', '#list', function(e){
		e.preventDefault();
		$('ul.product_list').animate({ opacity: 0 }, 400)
		setTimeout(function() {display('list');  }, 400)
		$('ul.product_list').animate({ opacity: 1 }, 400);
	});

	$(document).on('click', '#tableview', function(e){
		e.preventDefault();
		$('ul.product_list').animate({ opacity: 0 }, 400)
		setTimeout(function() {display('table');  }, 400)
		$('ul.product_list').animate({ opacity: 1 }, 400);
	});
}

function display(view)
{
	if (view == 'list')
	{
		$('ul.product_list').removeClass('grid').removeClass('table').addClass('list row');
		$('.product_list > li').removeClass('col-xs-' + grid_size_xs2 + ' col-ms-'+grid_size_ms2+' col-sm-'+grid_size_sm2+' col-md-'+grid_size_md2+' col-lg-'+grid_size_lg2).addClass('col-xs-12');
		$('.product_list > li').each(function(index, element) {
			html = '';
			html = '<div class="product-container"><div class="row">';
				html += '<div class="left-block col-xs-5 col-md-3"><div class="product-image-container">' + $(element).find('.left-block .product_img_link')[0].outerHTML + '</div></div>';
				html += '<div class="center-block col-xs-7 col-md-6">';
					html += '<h5 itemprop="name">'+ $(element).find('h5').html() + '</h5>';
					html += '<span class="product-reference">'+ $(element).find('.product-reference').html() + '</span>';
					var rating = $(element).find('.comments_note').html(); // check : rating
					if (rating != null) { 
						html += '<div class="comments_note">'+ rating + '</div>';
					}
					html += '<div class="product-flags">'+ $(element).find('.product-flags').html() + '</div>';
					html += '<p class="product-desc">'+ $(element).find('.product-desc').html() + '</p>';
					var colorList = $(element).find('.color-list-container').html();
					if (colorList != null) {
						html += '<div class="color-list-container">'+ colorList +'</div>';
					}
					var availability = $(element).find('.availability').html();	// check : catalog mode is enabled
					if (availability != null) {
						html += '<span class="availability">'+ availability +'</span>';
					}
				html += '</div>';	
				html += '<div class="right-block col-xs-12 col-md-3"><div class="right-block-content"><div class="row">';
					var price = $(element).find('.content_price').html();       // check : catalog mode is enabled
					if (price != null) { 
						html += '<div class="content_price col-xs-6 col-md-12">'+ price + '</div>';
					}
					html += '<div class="button-container col-xs-6 col-md-12">'+ $(element).find('.button-container').html() +'</div>';
					html += '<div class="functional-buttons functional-buttons-list  col-xs-12 col-md-12 clearfix">' + $(element).find('.functional-buttons').html() + '</div>';
				html += '</div></div>';
			html += '</div></div>';
		$(element).html(html);
		});		
		$('.display').find('li#list').addClass('selected');
		$('.display').find('li#grid').removeClass('selected');
		$('.display').find('li#tableview').removeClass('selected');
		$.totalStorage('display', 'list');

	}
	else if(view == 'table')
	{	
		$('ul.product_list').removeClass('grid').removeClass('list').addClass('table row');
		$('.product_list > li').removeClass('col-xs-' + grid_size_xs2 + ' col-ms-'+grid_size_ms2+' col-sm-'+grid_size_sm2+' col-md-'+grid_size_md2+' col-lg-'+grid_size_lg2).addClass('col-xs-12');
		$('.product_list > li').each(function(index, element) {
			html = '';
			html = '<div class="product-container"><div class="row">';
				html += '<div class="left-block col-xs-3 col-md-2"><div class="product-image-container">' + $(element).find('.left-block .product_img_link')[0].outerHTML + '</div></div>';
				html += '<div class="center-block col-xs-5 col-md-4">';
					html += '<h5 itemprop="name">'+ $(element).find('h5').html() + '</h5>';
					html += '<span class="product-reference">'+ $(element).find('.product-reference').html() + '</span>';
					var rating = $(element).find('.comments_note').html(); // check : rating
					if (rating != null) { 
						html += '<div  class="comments_note">'+ rating + '</div>';
					}
					html += '<div class="product-flags">'+ $(element).find('.product-flags').html() + '</div>';
					html += '<p class="product-desc">'+ $(element).find('.product-desc').html() + '</p>';
					var colorList = $(element).find('.color-list-container').html();
					if (colorList != null) {
						html += '<div class="color-list-container">'+ colorList +'</div>';
					}
					var availability = $(element).find('.availability').html();	// check : catalog mode is enabled
					if (availability != null) {
						html += '<span class="availability">'+ availability +'</span>';
					}
				html += '</div>';
						
				html += '<div class="right-block col-xs-12 col-md-6">';
						html += '<div class="right-block-content clearfix"><div class="right-block-content-inner">';
					var price = $(element).find('.content_price').html();       // check : catalog mode is enabled
					if (price != null) { 
						html += '<div class="content_price">'+ price + '</div>';
					}
					html += '</div></div><div class="right-block-content clearfix"><div class="right-block-content-inner"><div>';
					html += '<div class="button-container">'+ $(element).find('.button-container').html() +'</div>';
					html += '<div class="functional-buttons functional-buttons-list clearfix">' + $(element).find('.functional-buttons').html() + '</div>';
				html += '</div></div></div>';
			html += '</div></div>';
		$(element).html(html);
		});		

		$('.display').find('li#tableview').addClass('selected');
		$('.display').find('li#list').removeClass('selected');
		$('.display').find('li#grid').removeClass('selected');
		$.totalStorage('display', 'table');


	} 
	else 
	{
		$('ul.product_list').removeClass('list').removeClass('table').addClass('grid row');
		$('.product_list > li').removeClass('col-xs-12').addClass('col-xs-' + grid_size_xs2 + ' col-ms-'+grid_size_ms2+' col-sm-'+grid_size_sm2+' col-md-'+grid_size_md2+' col-lg-'+grid_size_lg2);
		$('.product_list > li').each(function(index, element) {
		html = '';
		html += '<div class="product-container">';
			var availability = $(element).find('.availability').html(); // check : catalog mode is enabled
			var avatext =''
				if (availability != null) {
					avatext += '<span class="availability availability-slidein">'+ availability +'</span>';
				}
			html += '<div class="left-block"><div class="product-image-container">' + $(element).find('.left-block .product_img_link')[0].outerHTML + '<div class="product-flags">'+ $(element).find('.product-flags').html() + '</div>' +  '<div class="functional-buttons functional-buttons-grid clearfix">' + $(element).find('.functional-buttons').html() + '</div>' + avatext;
			var colorList = $(element).find('.color-list-container').html();
				if (colorList != null) {
					html += '<div class="color-list-container">'+ colorList +'</div>';
				}

			html += '</div></div>';
			html += '<div class="right-block">';
				html += '<h5 itemprop="name" class="product-name-container">'+ $(element).find('h5').html() + '</h5>';
				html += '<span class="product-reference">'+ $(element).find('.product-reference').html() + '</span>';
				var price = $(element).find('.content_price').html(); // check : catalog mode is enabled
					if (price != null) { 
						html += '<div class="content_price">'+ price + '</div>';
					}	
				var rating = $(element).find('.comments_note').html(); // check : rating
					if (rating != null) { 
						html += '<div  class="comments_note">'+ rating + '</div>';
					}
				html += '<p itemprop="description" class="product-desc">'+ $(element).find('.product-desc').html() + '</p>';
				html += '<div itemprop="offers" class="button-container">'+ $(element).find('.button-container').html() +'</div>';
		
				
			html += '</div>';
		html += '</div>';		
		$(element).html(html);
		});
		$('.display').find('li#grid').addClass('selected');
		$('.display').find('li#list').removeClass('selected');
		$('.display').find('li#tableview').removeClass('selected');
		$.totalStorage('display', 'grid');
	}	


		if(typeof(iqit_lazy_load) != "undefined" && iqit_lazy_load !== null && iqit_lazy_load) {
			$("ul.product_list img.lazy").lazyload({
				threshold : 200,
				skip_invisible : false
			});
		}
}

function dropDown() 
{
	elementClick = '#header .current, #center-layered-nav .layered_subtitle_heading';
	elementSlide =  'ul.toogle_content';       
	activeClass = 'active';	

	$(document).on('click', elementClick, function(e){
		e.stopPropagation();
		var subUl = $(this).next(elementSlide);
		if(subUl.is(':hidden'))
		{
			subUl.show();
			$(this).addClass(activeClass);	
		}
		else
		{
			subUl.hide();
			$(this).removeClass(activeClass);
		}
		$(elementClick).not(this).next(elementSlide).hide();
		$(elementClick).not(this).removeClass(activeClass);
		e.preventDefault();	
	});

	$(document).on('click', elementSlide, function(e){
		e.stopPropagation();
	});

	$(document).on('click', function(e){
		e.stopPropagation();
		var elementHide = $(elementClick).next(elementSlide);
		$(elementHide).hide();
		$(elementClick).removeClass('active');
	});
}

function dropDownMobileHeader() 
{
	melementClick = '#mh-search, #mh-user, #mh-cart';
	melementSlide =  '.mh-drop, .cart_block';       
	mactiveClass = 'active';	
	$dropdownsWrapper = $('.mh-dropdowns');

	$(document).on('click', melementClick, function(e){
		e.stopPropagation();
		var $parent = $(this).parent();
		if(!$parent.hasClass('active'))
		{
			$parent.addClass(mactiveClass);	
			if (typeof $(this).data('mh-search') !== 'undefined')
			$dropdownsWrapper.addClass(mactiveClass);
		}
		else
		{	
			$parent.removeClass(mactiveClass);
			if (typeof $(this).data('mh-search') !== 'undefined')
			$dropdownsWrapper.removeClass(mactiveClass);
		}
		$(melementClick).not(this).parent().removeClass(mactiveClass);
		if (typeof $(this).data('mh-search') == 'undefined')
			$dropdownsWrapper.removeClass(mactiveClass);
		e.preventDefault();	
	});

	$(document).on('click', melementSlide, function(e){
		e.stopPropagation();
	});

	$(document).on('click', function(e){
		e.stopPropagation();
		var melementHide = $(melementClick).next(melementSlide);
		$(melementClick).parent().removeClass('active');
		$dropdownsWrapper.removeClass(mactiveClass);
	});
}

function stickyMobileHeader(){
		var s = $("#mh-sticky");
		var pos = s.offset();
		var alreadyStickym = false;

	
		$(window).scroll(function() {
			var windowpos = $(window).scrollTop();
			if ( s.length  ){
				if(!alreadyStickym) {
					if (windowpos > pos.top) {
						alreadyStickym = true;
						s.parent().height(s.height());
						s.removeClass("not-sticked");
						s.addClass("sticked");
					}
				}
				if(alreadyStickym) { 
					if (windowpos <= pos.top) {
						alreadyStickym = false;
						s.removeClass("sticked"); 
						s.addClass("not-sticked");
						s.parent().removeAttr("style");
					}}
				}
			});
}

function accordionFooter(status)
{
	if(status == 'enable')
	{
		$('#footer .footer-block h4, #footer1 .footer-block h4').on('click', function(e){
			$(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
			e.preventDefault();
		})
		$('#footer, #footer1').addClass('accordion').find('.toggle-footer').slideUp('fast');
	}
	else
	{
		$('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
		$('#footer, #footer1').removeClass('accordion');
	}
}

function accordion(status)
{
	leftColumnBlocks = $('#left_column');
	if(status == 'enable')
	{
		var accordion_selector = '#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4,' +
								'#left_column .shopping_cart > a:first-child, #right_column .shopping_cart > a:first-child';

		$(accordion_selector).on('click', function(e){
			$(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
		});
		$('#right_column, #left_column').addClass('accordion').find('.block .block_content').slideUp('fast');
		if (typeof(ajaxCart) !== 'undefined')
			ajaxCart.collapse();
	}
	else
	{
		$('#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
		$('#left_column, #right_column').removeClass('accordion');
	}
}

function bindUniform()
{
	if (!!$.prototype.uniform)
		$("select.form-control,input[type='radio'],input[type='checkbox']").not(".not_uniform").uniform();
}