/**
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2014 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/

var isStickMenu = true;
$(document).ready(function() {

	if (typeof iqit_inlineh != 'undefined') {
		var s = $("#header");
		var pos = s.offset();
		var alreadySticky = false;


		$(window).scroll(function() {
			var windowpos = $(window).scrollTop();
			if ( s.length  ){
				if(!alreadySticky) {
					if (windowpos > pos.top + 200) {
						alreadySticky = true;
						if($('#header').width() >= 985)
						$('#page').css('margin-top', s.height());
						s.addClass("sticky-header");
			
					}
				}
				if(alreadySticky) { 
					if (windowpos <= pos.top) {
						alreadySticky = false;
						$('#page').removeAttr("style");
						s.removeClass("sticky-header"); 
					}}
				}
			});
	}
	else{

		var s = $("#iqitmegamenu-horizontal");
		var pos = s.offset();
		var scartp = (s.outerHeight()/2)-13;
		var alreadySticky = false;

		var scart = $("#shopping_cart_container"); 

		$(window).scroll(function() {
			var windowpos = $(window).scrollTop();
			if ( s.length  ){
				if(!alreadySticky) {
					if (windowpos >= pos.top) {
						alreadySticky = true;
						s.parent().height(s.height());
						s.addClass("cbp-sticky");
						scart.addClass("stickCart");
						scart.css({ top: scartp + 'px' });
					}
				}
				if(alreadySticky) { 
					if (windowpos < pos.top) {
						alreadySticky = false;
						s.removeClass("cbp-sticky"); 
						scart.removeClass("stickCart");
						scart.removeAttr("style");
						s.parent().removeAttr("style");
					}}
				}
			});
	}
});