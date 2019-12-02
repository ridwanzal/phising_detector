jQuery(document).ready(function(){
    jQuery("#nav li.level0.parent").hoverIntent({
		interval: 150,
		over: function(){ jQuery(this).children("ul, div").slideDown(100); },
		timeout: 150,
		out: function(){ jQuery(this).children("ul, div").slideUp(100); }
	});
});