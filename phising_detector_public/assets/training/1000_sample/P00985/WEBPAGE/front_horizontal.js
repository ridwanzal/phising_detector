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


var cbpHorizontalMenu;



$(document).ready(function(){

	cbpHorizontalMenu = (function() {

	var menuId = '#cbp-hrmenu',
		$listItems = $( menuId + '> ul > li'  ),
		$menuItems = $listItems.children( 'a, .cbp-main-link' ), 
		$listlevelItems = $( menuId + ' .cbp-hrsub-haslevel2'  ),
		$level2Items = $listlevelItems.children( 'a' ),
		$innerTabs = $( menuId + ' .cbp-hrsub-tabs-names li > a'  ),
		$body = $( 'body' ),
		current = -1;
		currentlevel = -1;

	function init() {
		
		var isTouchDevice = 'ontouchstart' in document.documentElement;
		if( isTouchDevice ) {
			$menuItems.on( 'mouseover', open );
		}
		else{
			$menuItems.hoverIntent( {
			over: open,
			out: dnthing,
			interval: 30
		} );
		}

		$listItems.on( 'mouseover', function( event ) { event.stopPropagation(); } );

		$level2Items.on( 'mouseover', openLevel );
		$listlevelItems.on( 'mouseover', function( event ) { event.stopPropagation(); } );

		$innerTabs.click(function(event){
  			event.preventDefault();
  			link = $(this).data('link');
  			if (typeof link != 'undefined') {
  				window.location.href = link;
			}
  	
		});

		$innerTabs.hover( function(){
    	  $(this).tab('show');
   		});
	}

	var setCurrent = function(strName) {
        current = strName;
    };

   	function dnthing( event ) {
   		return false;
   	}

    function openLevel( event ) {

		var $item = $( event.currentTarget ).parent( 'li' ),
			idx = $item.index();
		
		if(currentlevel == idx )
			return;

		if( currentlevel !== -1 ) {
			$listlevelItems.eq( current ).removeClass( 'cbp-level2-hropen' );
		}

		if( currentlevel === idx ) {
			$item.removeClass( 'cbp-level2-hropen' );
			currentlevel = -1;
			
		}
		else {
			$('.cbp-level2-hropen').removeClass('cbp-level2-hropen');
			$item.children('.cbp-hrsub-level2').css({left: $( event.currentTarget ).width()+30 });
			$item.addClass( 'cbp-level2-hropen' );
			currentlevel = idx;
			$('.cbp-hrsub-inner').off( 'mouseover' ).on( 'mouseover', closeLevel);
		}

		
		return false;

	}

    function closeLevel( event ) {
		$listlevelItems.removeClass( 'cbp-level2-hropen' );
		currentlevel = -1;
	}



	function open( event ) {

		$othemenuitem = $('#cbp-hrmenu1').find('.cbp-hropen');


		$othemenuitem.find('.cbp-hrsub').removeClass('cbp-show');
		$othemenuitem.removeClass( 'cbp-hropen' );

		cbpVerticalmenu.setCurrent(-1);

		var $item = $( event.currentTarget ).parent( 'li' ),
			idx = $item.index();

		
		$submenu = $item.find('.cbp-hrsub');

		if(current == idx )
			return;

		$submenu.removeClass('cbp-notfit');
		$submenu.removeClass('cbp-show');

		if( current !== -1 ) {
			$listItems.eq( current ).removeClass( 'cbp-hropen' );
		}

		if( current === idx ) {
			$item.removeClass( 'cbp-hropen' );
			current = -1;
			
		}
		else {
			$submenu.addClass( 'cbp-show' );
			iqitmenuwidth = $(menuId).width();
			iqititemposition = $item.position().left;
			
			if(iqitmegamenu_swwidth)
				triangleoffset = 0;
			else
				triangleoffset = iqitmenuwidth-$submenu.width();
			
			if((iqitmenuwidth-iqititemposition)<$submenu.width())
			{
				$submenu.addClass( 'cbp-notfit' );
				$submenu.find('.cbp-triangle-container').css({left: (iqititemposition-12+$item.width()/2)-triangleoffset });
			}
			else
				$submenu.find('.cbp-triangle-container').css({left: (-12+$item.width()/2) });

			
			
			$item.addClass( 'cbp-hropen' );
			current = idx;
			$body.off( 'mouseover' ).on( 'mouseover', close );
		}

		

		return false;

	}

	function close( event ) {
		$listItems.eq( current ).removeClass( 'cbp-hropen' );
		current = -1;
	}

	return { init : init,
			  setCurrent: setCurrent
			};

})();

	cbpHorizontalMenu.init();

});

