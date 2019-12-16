 $(window).load(function() {
 $('[data-countdown]').each(function() {
   var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
   $this.html(event.strftime('<span class="countdown-time-group countdown-days"><span class="countdown-time ">%D</span> '+ iqitcountdown_days + '</span> <span class="countdown-time-group countdown-hours"><span class="countdown-time">%H</span> : </span><span class="countdown-time-group countdown-minutes"><span class="countdown-time">%M</span> : </span><span class="countdown-time-group countdown-second"><span class="countdown-time">%S</span></span>'));
   });
 });
  });