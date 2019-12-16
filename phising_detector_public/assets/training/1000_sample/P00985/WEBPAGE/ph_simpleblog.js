function markAlreadyLikedPost(guest, id_simpleblog_post)
{
	if ($.cookie('guest_' + guest + '_' + id_simpleblog_post) == "voted") 
	{
		$('.simpleblog-like-button').addClass('voted');
	}
};

$(function() {

	if($('#module-ph_simpleblog-single').length > 0)
	{
		$('.ph_simpleblog a.fancybox').fancybox();
		$(".simpleblog-single").fitVids();

		markAlreadyLikedPost($('#module-ph_simpleblog-single .simpleblog-like-button').data('guest'), $('.simpleblog-single .simpleblog-like-button').data('post'));

		$(document).on('click', '.simpleblog-socialshare-icons button', function(){
			type = $(this).attr('data-type');
			if (type.length)
			{
				switch(type)
				{
					case 'twitter':
						window.open('https://twitter.com/intent/tweet?text=' + ph_sharing_name + ' ' + encodeURIComponent(ph_sharing_url), 'sharertwt', 'toolbar=0,status=0,width=640,height=445');
						break;
					case 'facebook':
						window.open('http://www.facebook.com/sharer.php?u=' + ph_sharing_url, 'sharer', 'toolbar=0,status=0,width=660,height=445');
						break;
					case 'google-plus':
						window.open('https://plus.google.com/share?url=' + ph_sharing_url, 'sharer', 'toolbar=0,status=0,width=660,height=445');
						break;
					case 'pinterest':
						window.open('http://www.pinterest.com/pin/create/button/?media=' + ph_sharing_img + '&url=' + ph_sharing_url, 'sharerpinterest', 'toolbar=0,status=0,width=660,height=445');
						break;
				}
			}
		});

		$(document).on('click', '.simpleblog-like-button', function(e)
		{
			e.preventDefault();
			var id_simpleblog_post = $(this).data('post');
			var id_guest = $(this).data('guest');
			var element = $(this);

			if ($.cookie('guest_' + id_guest + '_' + id_simpleblog_post) == "voted") 
			{
				$.cookie('guest_' + id_guest + '_' + id_simpleblog_post, '');
				var request = $.ajax({
				  	type: "POST",
				  	url: baseDir + 'modules/ph_simpleblog/ajax.php',
				  	data: { 
					  	action: 'removeRating',
						id_simpleblog_post : id_simpleblog_post 
					},
					success: function(result)
					{             
				    	var data = $.parseJSON(result);
						if (data.status == 'success') 
						{		
							element.removeClass('voted').find('span').text(data.message);
						} 
						else 
						{
							alert(data.message);
						}
					}
				});
			}
			else
			{
				$.cookie('guest_' + id_guest + '_' + id_simpleblog_post, 'voted');
				var request = $.ajax({
				  	type: "POST",
				  	url: baseDir + 'modules/ph_simpleblog/ajax.php',
				  	data: { 
					  	action: 'addRating',
						id_simpleblog_post : id_simpleblog_post 
					},
					success: function(result)
					{             
				    	var data = $.parseJSON(result);
						if (data.status == 'success') 
						{		
							element.addClass('voted').find('span').text(data.message);
						} 
						else 
						{
							alert(data.message);
						}
					}
				});
			}
		});
	}

	$(".simpleblog-post-item .post-item").fitVids();
	$('.simpleblog-post-item a.post-gallery-link').fancybox();

	$(".simpleblog-post-type-video .post-thumbnail a").fancybox({
	    maxWidth    : 800,
	    maxHeight   : 600,
	    fitToView   : false,
	    autoSize    : false,
	    closeClick  : false,
	    width		: 640,
		height		: 385,
	    openEffect  : 'none',
	    closeEffect : 'none',
	    iframe: {
		preload: false
		},
	    helpers : {
	        overlay : {
	            css : {
	                'background' : 'rgba(0, 0, 0, 0.90)'
	            }
	        }
	    }
	});
	
});