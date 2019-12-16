function contentProdImages() {
    jQuery('.hover-effect-slider').each(function () {
        var slider = jQuery(this);
        var index = 0;
        var autoSlide;
        var imageLink = slider.find('.product-image');
        var imagesList = imageLink.data('images-list');
        imagesList = imagesList.split(",");
        var arrowsHTML = '<div class="small-slider-arrow arrow-left">left</div><div class="small-slider-arrow arrow-right">right</div>';
        var counterHTML = '<div class="slider-counter"><span class="current-index">1</span>/<span class="slides-count">' + imagesList.length + '</span></div>';
        if (imagesList.length > 1) {
            slider.prepend(arrowsHTML);
            slider.prepend(counterHTML);
            slider.find('.arrow-left').click(function (event) {
                if (index > 0) {
                    index--;
                } else {
                    index = imagesList.length - 1;
                }
                imageLink.find('img').attr('src', imagesList[index]);
                slider.find('.current-index').text(index + 1);
            });
            slider.find('.arrow-right').click(function (event) {
                if (index < imagesList.length - 1) {
                    index++;
                } else {
                    index = 0;
                }
                imageLink.find('img').attr('src', imagesList[index]);
                slider.find('.current-index').text(index + 1);
            });
        }
    });
}

function loadQtyControl() {
    var downButton = '<a href="javascript:void(0)" class="button-down">-</a>';
    var upButton = '<a href="javascript:void(0)" class="button-up">-</a>';
    jQuery('.input-text.qty').each(function(){
       if(!jQuery(this).parent().find('.button-down').length)
            jQuery(this).before(downButton);
        if(!jQuery(this).parent().find('.button-up').length)
            jQuery(this).after(upButton);     
    });
}    

// **********************************************************************// 
// ! Update Favicon
// **********************************************************************//    
function et_update_favicon() {
	var itemsCount = jQuery('.cart-sum').data('items-count');
    var enableBadge = jQuery('.shopping-cart').data('fav-badge');
    var favicon = new Favico({
        animation : 'popFade',
        fontStyle : 'normal'
    });
    if (enableBadge == 'enable') {
        favicon.badge(itemsCount);
    }
}
jQuery(document).ready(function($){
    contentProdImages();
    loadQtyControl();
    $(document).on('click','.button-up',function(e){
        $qty = $(this).parent().find('.qty');
        if (!$qty.attr('disabled')) {
            qty = parseInt($qty.val()) + 1;
            $qty.val(qty);    
        }
   });
   $(document).on('click','.button-down',function(e){
        $qty = $(this).parent().find('.qty');
        if (!$qty.attr('disabled')) {
            qty = parseInt($qty.val());
            if (qty > 0) {
                qty--;    
            }
            $qty.val(qty);
        }
   });

   // **********************************************************************// 
    // ! Testimonials Gallery
    // **********************************************************************// 
    
    $('.testimonials-slider').cbpQTRotator();
   
   // **********************************************************************// 
    // ! Tabs
    // **********************************************************************// 

    var tabs = $('.tabs');
    $('.tabs > p > a').unwrap('p');
    
    var leftTabs = $('.left-bar, .right-bar');
    var newTitles;
    
    leftTabs.each(function(){
        var currTab = $(this);
        //currTab.find('> a.tab-title').each(function(){
            newTitles = currTab.find('> a.tab-title').clone().removeClass('tab-title').addClass('tab-title-left');
        //});

        newTitles.first().addClass('opened');

        
        var tabNewTitles = $('<div class="left-titles"></div>').prependTo(currTab);
        tabNewTitles.html(newTitles);

        currTab.find('.tab-content').css({
            'minHeight' : tabNewTitles.height()
        });
    });
    
    tabs.each(function(){
        var currTab = $(this);

        currTab.find('.tab-title').first().addClass('opened').next().show();

        currTab.find('.tab-title, .tab-title-left').click(function(e){
            
            e.preventDefault();
            
            var tabId = $(this).attr('id');
        
            if($(this).hasClass('opened')){
                if(currTab.hasClass('accordion') || $(window).width() < 767){
                    $(this).removeClass('opened');
                    $('#content_'+tabId).hide();
                }
            }else{
                currTab.find('.tab-title, .tab-title-left').each(function(){
                    var tabId = $(this).attr('id');
                    $(this).removeClass('opened');
                    $('#content_'+tabId).hide();
                });


                if(currTab.hasClass('accordion') || $(window).width() < 767){
                    $('#content_'+tabId).removeClass('tab-content').show();
                    setTimeout(function(){
                        $('#content_'+tabId).addClass('tab-content').show(); // Fix it
                    },1);
                } else {
                    $('#content_'+tabId).show();
                }
                $(this).addClass('opened');
            }
        });
    });
    
    // **********************************************************************// 
    // ! Full width section
    // **********************************************************************//

    function et_sections(){
        $('.et_section').each(function(){
            $(this).css({
                'left': - ($(window).width() - $('.header > .container').width())/2,
                'width': $(window).width(),
                'visibility': 'visible'
            });
            var videoTag = $(this).find('.section-back-video video');
            videoTag.css({
                'width': $(window).width(),
                //'height': $(window).width() * videoTag.height() / videoTag.width() 
            });
        });
    }

    et_sections();

    $('.parallax .banner-bg').each(function(){
        $(this).parallax('50%',0.05);
    });


    if($(window).width() > 767) { 
        $('.parallax-section').each(function(){
            var speed = 0.1;
            if($(this).data('parallax-speed') != '') {
                speed = $(this).data('parallax-speed');
            }
            $(this).parallax('50%', speed);
        });  
    }
    
    $(window).resize(function(){
        et_sections();
    });

    et_update_favicon();
	// **********************************************************************// 
    // ! Counter
    // **********************************************************************//
	var counters = $('.animated-counter');

    counters.each(function(){
        $(this).waypoint(function(){
            animateCounter($(this));
        }, { offset: '100%' });
    });

    // **********************************************************************// 
    // ! Progress bars
    // **********************************************************************//

    var progressBars = $('.progress-bars');
    if (progressBars.length) {
        progressBars.waypoint(function() {
            i = 0;
            $(this).find('.progress-bar').each(function () {
                i++;
                
                var el = $(this);
                var width = $(this).data('width');
                setTimeout(function(){
                    el.find('div').animate({
                        'width' : width + '%'
                    },400);
                    el.find('span').css({
                        'opacity' : 1
                    });
                },i*300, "easeOutCirc");
            
            });
        }, { offset: '85%' });   
    }
    
	// **********************************************************************// 
    // ! Animated Counters
    // **********************************************************************//

    function animateCounter(el) {
        var initVal = parseInt(el.text());
        var finalVal = el.data('value');
        if(finalVal <= initVal) return;
        var intervalTime = 1;
        var time = 200;
        var step = parseInt((finalVal - initVal)/time.toFixed());
        if(step < 1) {
            step = 1;
            time = finalVal - initVal;
        }
        var firstAdd = (finalVal - initVal)/step - time;
        var counter = parseInt((firstAdd*step).toFixed()) + initVal;
        var i = 0;
        var interval = setInterval(function(){
            i++;
            counter = counter + step;
            el.text(counter);
            if(i == time) {
                clearInterval(interval);
            }
        }, intervalTime);
    }
    // **********************************************************************// 
    // ! "Top" button
    // **********************************************************************//

    var scroll_timer;
    var displayed = false;
    var $message = jQuery('.back-to-top');
    
    jQuery(window).scroll(function () {
        window.clearTimeout(scroll_timer);
        scroll_timer = window.setTimeout(function () { 
        if(jQuery(window).scrollTop() <= 0) 
        {
            displayed = false;
            $message.removeClass('btt-shown');
        }
        else if(displayed == false) 
        {
            displayed = true;
            $message.stop(true, true).addClass('btt-shown').click(function () { $message.removeClass('btt-shown'); });
        }
        }, 400);
    });
    
    jQuery('.back-to-top').click(function(e) {
            jQuery('html, body').animate({scrollTop:0}, 600);
            return false;
    });
});
/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        
        //get the starting position of each element to have parallax applied to it      
        $this.each(function(){
            firstTop = $this.offset().top;
        });

        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }
            
        // setup defaults if arguments aren't specified
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;
        
        // function to be called whenever the window is scrolled or resized
        function update(){
            var pos = $window.scrollTop();              

            $this.each(function(){
                var $element = $(this);
                var top = $element.offset().top; 
                var height = getHeight($element);
                var viewportBottom = pos + windowHeight; 

                // Check if totally above or totally below viewport
                if (top + height < pos || top > viewportBottom) {
                    return;
                }
                
                
                $this.css('backgroundPosition', xpos + " " + Math.round((top - viewportBottom) * speedFactor) + "px");
            });
        }       

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);

jQuery(function($){

});