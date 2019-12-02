$(document).ready(function() {



  
	$('.slick_carousel_defaultp').slick({
  dots: true,
  accessibility: false,
  rtl: isRtl, 
  lazyLoad: iqit_carousel_load,
  speed: 300,
  autoplay: iqit_carousel_auto,
  autoplaySpeed: 4500,
  slidesToShow: grid_size_lg,
  slidesToScroll: grid_size_lg,
  responsive: [
    {
      breakpoint: 1320,
      settings: {
        slidesToShow: grid_size_md,
        slidesToScroll: grid_size_md,
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: grid_size_sm,
        slidesToScroll: grid_size_sm
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: grid_size_ms,
        slidesToScroll: grid_size_ms
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: grid_size_xs,
        slidesToScroll: grid_size_xs
      }
    }
  ]
});


	$(window).scroll( $.debounce( 400, function () {
			if($(this).scrollTop() > 600) {
				$('#toTop').addClass('totop-showed');	
			} else {
				$('#toTop').stop().removeClass('totop-showed');
			}
	}) );	

	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},800);
	});	

  if(typeof(iqit_lazy_load) != "undefined" && iqit_lazy_load !== null && iqit_lazy_load) {
      $("ul.product_list img.lazy").lazyload({
        threshold : 200,
        skip_invisible : false
      });
      }

});





