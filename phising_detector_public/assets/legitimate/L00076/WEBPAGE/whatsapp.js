var checkJQ = 0;
 
function checkJquery() {
	if (window.jQuery) {
		jqueryLoaded();
	} 
	if(checkJQ == 0) {
  	checkJQ = window.setInterval(checkJquery, 50);
	}
}	

checkJquery();

function jqueryLoaded() {
	clearInterval(checkJQ);

	$(document).keyup(function(e) {
	  if (e.keyCode == 27) { 
	  	$('#lng_open').slideUp(speed);
	  	open = false;
	  }   // esc
	});

	$(document).ready(docReady);

}

function docReady() {

	if (window.location.hash == "" || window.location.hash == undefined) {
		window.scrollTo(0,1);
	}

	if ($('.content').hasClass('faq')) {
		initContent();
	}

}

// Javascript
var open = false;
var speed = 300;
var open_css = "inset -5px 5px 10px -8px rgba(0,0,0,1),0 15px 25px -13px #000";
var closed_css = "inset -5px 5px 10px -8px rgba(0,0,0,1)";

function toggle_lng_menu() {
	if(open) {
		$('#lng_open').slideUp(speed);
		//$('a#lng-menu-icon').css('background-image','url("https://www.cdn.whatsapp.net/img/v2/lng_normal.png")');
	} else {
		$('#lng_open').slideDown(speed);
		//$('a#lng-menu-icon').css('background-image','url("https://www.cdn.whatsapp.net/img/v2/lng_active.png")');
	}
	open = !open;
}

/* Process images in FAQ contents and size if needed */
var imgMargin = 12;
var imgs = new Array();
var imgsLoaded = new Array();
var imgsW = new Array();
var imageLoadTimeout;

function initContent() {
	// get array of un-styled images and save their natural width
	$('img.half').each(function() {
		var src = $(this).attr('src');
		var img = $('<img/>');
		imgsLoaded[src] = false;
		img.on('load', function() {
			imgsW[$(this).attr('src')] = this.width;
			imgsLoaded[$(this).attr('src')] = true;
		});
		img.attr('src', src);
		imgs[src] = img;
	})
	imageLoadTimeout = setTimeout(checkImageLoad, 50);
}

function processImgs() {
	$('img.half:first-child').each(function() {
		var img = new Array();
		var imgW = new Array();
		var src = $(this).attr('src');
		img[1] = $(this);
		if ($(this).next().is('img')) {
			var src2 = $(this).next().attr('src');
			img[2] = $(this).next();
			// get outside container width and half width
			var contW = $(this).parent().innerWidth();
			var maxW = (contW - imgMargin) / 2 - 1;
			imgW[1] = imgsW[src];
			imgW[2] = imgsW[src2];
			var ar1 = (imgW[1] / maxW);
			var ar2 = (imgW[2] / maxW);
			var ar;
			if (ar1 >= ar2) {
				ar = ar1;
			} else {
				ar = ar2;
			}
			for (var i = 1; i < 3; i++) {
				imgW[i] = Math.round(imgW[i] / ar) + 'px';
				img[i].css('max-width', imgW[i]);
			}
		}
	})
}

function checkImageLoad() {
	for (var i in imgsLoaded) {
		if (!imgsLoaded[i]) { 
			imageLoadTimeout = setTimeout(checkImageLoad, 50);
			return false; 
		}
	}
	processImgs();
	clearTimeout(imageLoadTimeout);
}


