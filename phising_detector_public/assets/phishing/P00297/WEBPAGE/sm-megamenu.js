

!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-jsapi] .parent > a'
    , SAMegamenu = function (element) {
        var $el = $(element).on('click.sapi.data-api', this.toggle)
        $('html').on('click.sapi.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  SAMegamenu.prototype = {

    constructor: SAMegamenu

  , toggle: function (e) {
	 
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)
     
      
      isActive = $parent.hasClass('open')
      if (isActive) {
    	  var href = $this.attr('href');
    	  if( href.indexOf('#') === 0 ){
    		  return
    	  }else{
    		  e.stopPropagation()
    		  windown.location.href = href;
    		  return false
    	  }
      }
      var toggle_parents = $this.parents().filter($(toggle).parent()).not($parent);
      clearMenus();
	 
      toggle_parents.addClass('open');

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()
      
      if (!isActive){
    	  var $check_class = $('.sm_megamenu_menu');
    	  if( $check_class.hasClass('sm-megamenu-hover') ){
    		  return true;
    	  }else {
    		  return false;
    	  }
      }
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new SAMegamenu(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = SAMegamenu


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.sapi.data-api touchstart.sapi.data-api', clearMenus)
    .on('click.sapi touchstart.sapi.data-api', '.parent form,.parent .jmod-output', function (e) { e.stopPropagation() })
    .on('touchstart.sapi.data-api', '.sm-megamenu-child', function (e) { e.stopPropagation() })
    .on('click.sapi.data-api touchstart.sapi.data-api'  , toggle, SAMegamenu.prototype.toggle)
    .on('keydown.sapi.data-api touchstart.sapi.data-api', toggle + ', [role=menu]' , SAMegamenu.prototype.keydown)
    .on('click.sapi.menu-open', '[data-sapi="collapse"]', function(e){    		
    	$(this).toggleClass('open');
    	//e.prevenDefault();
    })
}(window.jQuery);

