jQuery(document).ready(function($){
    // **********************************************************************// 
    // ! Main Navigation plugin
    // **********************************************************************//

    $.fn.et_menu = function ( options ) {
        var methods = {
            showChildren: function(el) {
				//*version 1.1.0 (fadeTime)*//
                el.fadeIn(settings.fadeTime).css({
                    display: 'list-item',
                    listStyle: 'none'
                }).find('li').css({listStyle: 'none'});
            },
            calculateColumns: function(el) {
                // calculate columns count
                var columnsCount = el.find('.container > ul > li.menu-item-has-children').length;
                var dropdownWidth = el.find('.container > ul > li').outerWidth();
                var padding = 20;
                if(columnsCount > 1) {
                    dropdownWidth = dropdownWidth*columnsCount + padding;
                    el.css({
                        'width':dropdownWidth
                    });
                }

                // calculate right offset of the  dropdown
                var headerWidth = $('.menu-wrapper').outerWidth();
                var headerLeft = $('.menu-wrapper').offset().left;
                var dropdownOffset = el.offset().left - headerLeft;
                var dropdownRight = headerWidth - (dropdownOffset + dropdownWidth);

                if(dropdownRight < 0) {
                    el.css({
                        'left':'auto',
                        'right':0
                    });
                } 
            },
            openOnClick: function(el,e) {
                var timeOutTime = 0;
                var openedClass = "current";
                var header = $('.header-wrapper');
                var $this = el;


                if($this.parent().hasClass(openedClass)) {
                    e.preventDefault();
                    $this.parent().removeClass(openedClass);
                    $this.next().stop().slideUp(settings.animTime);
                    header.stop().animate({'paddingBottom': 0}, settings.animTime);
                } else {

                    if($this.parent().find('>div').length < 1) {
                        return;
                    }

                    e.preventDefault();

                    if($this.parent().parent().find('.' + openedClass).length > 0) {
                        timeOutTime = settings.animTime;
                        header.stop().animate({'paddingBottom': 0}, settings.animTime);
                    }

                    $this.parent().parent().find('.' + openedClass).removeClass(openedClass).find('>div').stop().slideUp(settings.animTime);

                    setTimeout(function(){
                        $this.parent().addClass(openedClass);
                        header.stop().animate({'paddingBottom': $this.next().height()+50},settings.animTime);
                        $this.next().stop().slideDown(settings.animTime);
                    },timeOutTime);
                }
            },   
            loadParIcon: function() {
                //version 1.1.0 start               
                var navitem =  $('.nav-category-list > li');
                var plusIcon = '+';
                var openerHTML = '<div class="cat-open-this">' + plusIcon + '</div>';
                $('.cat-open-this').remove();
                navitem.has('.nav-sublist-dropdown').prepend(openerHTML);
                //version 1.1.0 end
            }
        };

        var settings = $.extend({
            type: "default", // can be columns, default, mega, combined
            animTime: 250,
            openByClick: true,
            fadeTime: 100,  //verison 1.1.0
            parIcon: false  //version 1.1.0
        }, options );

        if(settings.type == 'mega') {
            this.find('>li>a').click(function(e) {
                methods.openOnClick($(this),e);
            });
            return this;
        }
        //added from version 1.1.0            
        if(settings.parIcon) {
            methods.loadParIcon();
        }
        this.find('>li').hover(function (){            
            if(!$(this).hasClass('open-by-click') || (!settings.openByClick && $(this).hasClass('open-by-click'))) {                
                if(settings.openByClick) {
                    $('.open-by-click.current').find('>a').click();
                    $(this).find('>a').unbind('click');
                }
                var dropdown = $(this).find('> .nav-sublist-dropdown');
                if ($(this).hasClass('menu-full-width') && SW_MENU_POPUP_WIDTH) {
                    dropdown.css('width', SW_MENU_POPUP_WIDTH);
                }                
                methods.showChildren(dropdown);

                if(settings.type == 'columns') {
                    methods.calculateColumns(dropdown);
                }
            } else {
                $(this).find('>a').unbind('click');
                $(this).find('>a').bind('click', function(e) {
                    methods.openOnClick($(this),e);
                });
            }
            //version 1.1.0
            if (settings.parIcon) {
                if($(this).has('.cat-open-this')) {
                    $(this).find('.cat-open-this').html('&ndash;');
                }
            }
        }, function () {            
            if(!$(this).hasClass('open-by-click') || (!settings.openByClick && $(this).hasClass('open-by-click'))) {
                $(this).find('> .nav-sublist-dropdown').fadeOut(settings.fadeTime).attr('style', '');                
            }
            //version 1.1.0
            if (settings.parIcon) {
                if($(this).has('.cat-open-this')) {
                    $(this).find('.cat-open-this').html('&#43;');
                }
            }            
        });

        return this;
    }

    // First Type of column Menu
    $('.main-nav .menu').et_menu({
        type: "default"
    });

    $('.fixed-header .menu').et_menu({
        openByClick: false
    });
    
    //added from version 1.1.0 
    $('.nav-category-list').et_menu({
        fadeTime: 5,
        parIcon: true
    });
    


    function et_equalize_height(elements, removeHeight) {
        var heights = [];

        if(removeHeight) {
            elements.attr('style', '');
        }

        elements.each(function(){
            heights.push($(this).height());
        });

        var maxHeight = Math.max.apply( Math, heights );
        if($(window).width() > 767) {
            elements.height(maxHeight);
        }
    }

    $(window).resize(function(){
        //et_equalize_height($('.product-category'), true);
    });

     // **********************************************************************// 
    // ! Mobile navigation
    // **********************************************************************// 

    var navList = $('.mobile-nav div > ul');
    var etOpener = '<span class="open-child">(open)</span>';
    navList.addClass('sw-mobile-menu');
    
    navList.find('li:has(ul)',this).each(function() {
        $(this).prepend(etOpener);
    })
    
    navList.find('.open-child').click(function(){
        if ($(this).parent().hasClass('over')) {
            $(this).parent().removeClass('over').find('>ul').slideUp(200);
        }else{
            $(this).parent().parent().find('>li.over').removeClass('over').find('>ul').slideUp(200);
            $(this).parent().addClass('over').find('>ul').slideDown(200);
        }
    });    
    $('.menu-icon, .close-mobile-nav').click(function(event) {
        if(!$('body').hasClass('mobile-nav-shown')) {
            $('body').addClass('mobile-nav-shown', function() {
                // Hide search input on click
                setTimeout(function(){
                    $(document).one("click",function(e) {
                        var target = e.target;
                        if (!$(target).is('.mobile-nav') && !$(target).parents().is('.mobile-nav')) {
                                    $('body').removeClass('mobile-nav-shown');
                        }
                    });  
                }, 111);
            });
        } else{
            $('body').removeClass('mobile-nav-shown');
        }
    });
    
    // **********************************************************************// 
    // ! Mobile navigation
    // added from version 1.1.0
    // **********************************************************************// 

    var cat_navList = $('.nav-category-mobile-list > ul');
    var cat_plusIcon =  '&#43;';
    var cat_minusIcon = '&ndash;';
    var cat_etOpener = '<div class="open-child">' + cat_plusIcon + '</div>';
    
    cat_navList.addClass('sw-mobile-menu');
    
    cat_navList.find('li:has(ul)',this).each(function() {
        $(this).prepend(cat_etOpener);
    })
    
    cat_navList.find('.open-child').click(function(){
        if ($(this).parent().hasClass('over')) {            
            $(this).parent().removeClass('over').find('>ul').slideUp(100);            
        }else{
            $(this).parent().parent().find('>li.over').removeClass('over').find('>ul').slideUp(200);            
            $(this).parent().addClass('over').find('>ul').slideDown(100);                 
        }                                                             
        cat_navList.find('.open-child').html(cat_plusIcon);
        cat_navList.find('.over').find('>.open-child').html(cat_minusIcon);
    });

    // **********************************************************************// 
    // ! Category List Accordion
    // added from version 1.2.0
    // **********************************************************************// 

    var cat_navAccor = $('.nav-category-accordion > ul');
    
    cat_navAccor.find('li:has(ul)',this).each(function() {
        $(this).prepend(cat_etOpener);
    })
    
    cat_navAccor.find('.open-child').click(function(){
        if ($(this).parent().hasClass('over')) {            
            $(this).parent().removeClass('over').find('>ul').slideUp(100);            
        }else{
            $(this).parent().parent().find('>li.over').removeClass('over').find('>ul').slideUp(200);            
            $(this).parent().addClass('over').find('>ul').slideDown(100);                 
        }                                                             
        cat_navAccor.find('.open-child').html(cat_plusIcon);
        cat_navAccor.find('.over').find('>.open-child').html(cat_minusIcon);
    });

    // **********************************************************************// 
    // ! Side Block
    // **********************************************************************// 

    $('.side-area-icon, .close-side-area').click(function(event) {
        if(!$('body').hasClass('shown-side-area')) {
            $('body').addClass('shown-side-area', function() {
                // Hide search input on click
                setTimeout(function(){
                    $(document).one("click",function(e) {
                        var target = e.target;
                        if (!$(target).is('.side-area') && !$(target).parents().is('.side-area')) {
                            $('body').removeClass('shown-side-area');
                        }
                    });  
                }, 111);
            });
        } else{
            $('body').removeClass('shown-side-area');
        }
    });

    // **********************************************************************// 
    // ! Hidden Top Panel
    // **********************************************************************//
    $(document).ready(function(){
        var topPanel = $('.top-panel');
        var pageWrapper = $('.page');  
        var showPanel = $('.show-top-panel');
        var panelHeight = topPanel.outerHeight();        
        //showPanel.click(function(){
//           if($(this).hasClass('show-panel')) {
//               pageWrapper.attr('style','')
//               topPanel.removeClass('show-panel');
//                $(this).removeClass('show-panel');               
//           } else {
//                $(this).addClass('show-panel');
//               pageWrapper.attr('style','transform: translateY('+panelHeight+'px);-ms-transform: translateY('+panelHeight+'px);-webkit-transform: translateY('+panelHeight+'px);');
//               topPanel.addClass('show-panel');
//           }
//        });
        showPanel.click(function(){
            topPanel.slideToggle('fast', function(){
                if($(this).hasClass('show-panel')) {
                    showPanel.removeClass('show-panel');
                    $(this).removeClass('show-panel');
                }else{
                    showPanel.addClass('show-panel');
                    $(this).addClass('show-panel');
                }
            });
        });
    });

    // **********************************************************************// 
    // ! Images lightbox
    // **********************************************************************//

    // **********************************************************************// 
    // ! Fixed header
    // **********************************************************************// 
    
    $(window).scroll(function(){
        //if (!$('body').hasClass('fixNav-enabled')) {return false; }
        var fixedHeader = $('.fixed-header-area');
        var scrollTop = $(this).scrollTop();
        var headerHeight = $('.header-container').height() + $('.header-wrapper').height() + 20;
        
        if(scrollTop > headerHeight){
            if(!fixedHeader.hasClass('fixed-already')) {
                fixedHeader.stop().addClass('fixed-already');
            }
        }else{
            if(fixedHeader.hasClass('fixed-already')) {
                fixedHeader.stop().removeClass('fixed-already');
            }
        }
    });

}); // document ready

