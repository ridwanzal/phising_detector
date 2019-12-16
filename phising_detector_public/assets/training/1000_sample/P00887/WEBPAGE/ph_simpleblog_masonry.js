$(window).load(function()
{
	var $container = $('.simpleblog-posts');
	$container.isotope({
	  itemSelector: '.simpleblog-post-item'
	});
});