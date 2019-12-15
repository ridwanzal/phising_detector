(function(){

	if(typeof jQuery == 'undefined'){
		return;
	}

	jQuery.noConflict();
	var $ = jQuery;
	var texboFrame;
	var texboItems;
	var prevListCount = 0;
	var resize = false;

	function classhantei(){

		var i = 0;
		var listCount;
		
		listCount = Math.floor((texboFrame.outerWidth()) / $(texboItems[0]).outerWidth({margin: true}));

		if(listCount == prevListCount){
			return;
		}
		prevListCount = listCount;

		texboItems.each(function(){
			if(i++<listCount*2){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	}

	$(document).ready(function(){
		texboFrame = $('#texbo');
		texboItems = $('#texbo li');
		classhantei();

		$(window).resize(function() {
		    classhantei();
 	 	});
	});

})();