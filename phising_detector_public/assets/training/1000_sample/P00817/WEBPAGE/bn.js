$.bn = {};

$.bn.menuscroll = function() {
  $(window).bind('scroll load',function() {
    if( $('body').outerWidth()>1170) { 
      if( $(window).scrollTop() > ($('.navbar-bn').offset().top+$('.navbar-bn').outerHeight()) ) {
        $('#top-menu:hidden').fadeIn('fast');
      } else {
        $('#top-menu:visible').fadeOut('fast');
      }
    } else {
      $('#top-menu').hide();
    }
  });
  
  $(window).bind('resize',function() {
    if( $('body').outerWidth()<1170) { 
      $('#top-menu').hide();
    }
  });
  
}

$.bn.panelfix = function() {
  $(window).bind('scroll load',function () {
    if( ($(window).scrollTop()) > ($('.panel').offset().top-$.bn.topbar_height)) {
     if($('.panel .sidebar').css('postion')!='fixed') {
       var topPos = $('.panel .sidebar').position().top + 'px';
       var leftPos = $('.panel .sidebar').offset().left + 'px';
       $('.panel .sidebar').css({
        'position' : 'fixed',
        'left' : leftPos,
        'top' : ($.bn.topbar_height+parseInt($('.panel').css('padding-top'))-5)+'px'
       });
     }
    } else {
     $('.panel .sidebar').css('position','static');
    }
  });
  
}

/* dom is ready */
$(function() {
  $.bn.topbar_height = $('#top-menu').outerHeight();
  $.bn.menuscroll();
  $('.carousel').carousel();
});


/* Custom jQuery plugs */
$.fn.impToggle = function() {
  this.each(function() {
    if($(this).is(":hidden")) {
      $(this).attr('style','display:block!important');
    } else {
      $(this).attr('style','');
    }
  });
}
$.fn.scrolly = function() {
  this.each(function() {
    var targetEle = $(this).attr('data-target');
    $(this).bind('click', function (event) {
      event.preventDefault();
      $(window).scrollTop($(targetEle).offset().top-$.bn.topbar_height-20);
    });
  });
}