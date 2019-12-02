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

var instantSearchQueries = [];
$(document).ready(function()
{
$(".iqit-search-shower .iqit-search-shower-i").click(function() {
  $("#search_block_top").toggleClass('showedSearch');
  $(this).toggleClass('showedSearch');
});


	if (typeof blocksearch_type == 'undefined')
		return;
	if (typeof instantsearch != 'undefined' && instantsearch)		
		$("#search_query_" + blocksearch_type).keyup(function(){
			if($(this).val().length > 3){
				stopInstantSearchQueries();
				instantSearchQuery = $.ajax({
					url: search_url + '?rand=' + new Date().getTime(),
					data: {
						instantSearch: 1,
						id_lang: id_lang,
						q: $(this).val(),
						search_query_cat: $('.search-cat-select').val(),
					},
					dataType: 'html',
					type: 'POST',
					headers: { "cache-control": "no-cache" },
					async: true,
					cache: false,
					success: function(data){
						if($("#search_query_" + blocksearch_type).val().length > 0)
						{
							tryToCloseInstantSearch();
							$('#center_column').attr('id', 'old_center_column');
							$('#old_center_column').after('<div id="center_column" class="' + $('#old_center_column').attr('class') + '">'+data+'</div>');


							$('#old_center_column').hide();
							$('.fw-pseudo-wrapper-slider').hide();
							$('.cbp-homepage-expanded').addClass('cbp-homepage-expanded-search');
							
							// Button override
							ajaxCart.overrideButtonsInThePage();
							if(typeof(iqit_lazy_load) != "undefined" && iqit_lazy_load !== null && iqit_lazy_load) {
								$("ul.product_list img.lazy").lazyload({
									threshold : 200,
									skip_invisible : false
								});
							}
							$("#instant_search_results a.close").click(function() {
								$("#search_query_" + blocksearch_type).val('');
								return tryToCloseInstantSearch();
							});

							return false;
						}
						else
							tryToCloseInstantSearch();
					}
				});
				instantSearchQueries.push(instantSearchQuery);
			}
			else
				tryToCloseInstantSearch();
		});
	/* TODO Ids aa blocksearch_type need to be removed*/
	var width_ac_results = 	$("#search_query_" + blocksearch_type).parent('form').width();
	if (typeof ajaxsearch != 'undefined' && ajaxsearch)
		$("#search_query_" + blocksearch_type).autocomplete(
			search_url,
			{
				minChars: 3,
				max: 7,
				width: (width_ac_results > 0 ? width_ac_results : 500),
				selectFirst: false,
				scroll: false,
				width:  function(){
      				return  $('#search_query_top').outerWidth(true);
   					 },
				dataType: "json",
				formatItem: function(data, i, max, value, term) {
					return value;
				},
				parse: function(data) {
					var mytab = new Array();
					for (var i = 0; i < data.length; i++){
						if(i==6){
							data[i].pname = 'not_link';
							data[i].product_link = $('#search_query_' + blocksearch_type).val();
							mytab[mytab.length] = { data: data[i], value:  '<div id="ac_search_more"> '+ more_products_search +' </div>'};
						}
						else{
							if(PS_CATALOG_MODE)
								mytab[mytab.length] = { data: data[i], value:  '<div class="row"><div class="col-xs-2 ac_photo"><img class="img-responsive" src="'+ data[i].obr_thumb + '" /></div><div class="col-xs-10 ac_name"><span class="prname">'  + data[i].pname + '</span></div></div>'};
							else
								mytab[mytab.length] = { data: data[i], value:  '<div class="row"><div class="col-xs-2 ac_photo"><img class="img-responsive" src="'+ data[i].obr_thumb + '" /></div><div class="col-xs-10 ac_name"><span class="prname">'  + data[i].pname + ' <span class="price product-price">'+ data[i].product_price +'</span></span></div></div>'};

						}
					}
					return mytab;
				},
				extraParams: {
					ajaxSearch: 1,
					search_query_cat: function(){
      				return  $('.search-cat-select').val();
   					 },
					id_lang: id_lang
				}
			}
		)
.result(function(event, data, formatted) {
	if(data.pname!='not_link'){
		$('#search_query_' + blocksearch_type).val(data.pname);
		document.location.href = data.product_link;
	}
	else{
		$('#search_query_' + blocksearch_type).val(data.product_link);
		$("#searchbox").submit();
	}
});
});

function tryToCloseInstantSearch()
{
	if ($('#old_center_column').length > 0)
	{
		$('#center_column').remove();
		$('#old_center_column').attr('id', 'center_column');
		$('#center_column').show();
		$('.fw-pseudo-wrapper-slider').show();
		$('.cbp-homepage-expanded').removeClass('cbp-homepage-expanded-search');
		return false;
	}
}

function stopInstantSearchQueries()
{
	for(i=0;i<instantSearchQueries.length;i++)
		instantSearchQueries[i].abort();
	instantSearchQueries = new Array();
}