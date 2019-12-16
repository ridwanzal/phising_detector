jQuery(function($){
	//Sticky menu
	var menuContainer = $('.nav-container');
	var menuContainerTop = 	menuContainer.offset().top;
	$('.nav-container-outer').height(menuContainer.outerHeight(true));
	var stickyMenu = function(){
		var scrollTop = $(window).scrollTop();  
		if (scrollTop > menuContainerTop) menuContainer.addClass('sticky');  
		else menuContainer.removeClass('sticky');     
	};  
	  
	stickyMenu();
	  
	$(window).scroll(function() {  
		stickyMenu();  
	});  
});