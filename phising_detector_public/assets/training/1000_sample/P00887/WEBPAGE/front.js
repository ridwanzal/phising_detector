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


$(document).ready(function(){

  

$('.iqitcarousel').slick({
  accessibility: false,
  autoplaySpeed: 4500,
  rtl: isRtl,
  lazyLoad: iqit_carousel_load, 
  speed: 300,
});


$("#iqitcontentcreator .nav-tabs").each(function() {
  $( this ).find("li").first().addClass("active");
});

$("#iqitcontentcreator .tab-content").each(function() {
  $( this ).find(".tab-pane").first().addClass("in").addClass("active");
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") // activated tab
  $(target).find('.iqitcarousel').slick('setPosition');
    if(typeof(iqit_lazy_load) != "undefined" && iqit_lazy_load !== null && iqit_lazy_load) {
      $(target).find("img.lazy").lazyload({
        threshold : 200,
        skip_invisible : false
      });
    }
});

});

