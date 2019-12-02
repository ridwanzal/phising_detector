//draganddrop helper function
function drag(evt) {
    //set data-drag-txt attribute on draggable element if need to drop different text from draggable content
    var attr = $(evt.target).attr('data-drag-txt');
    var dragData = (typeof attr !== typeof undefined && attr !== false) ? attr : evt.target.innerHTML;
    evt.dataTransfer.setData("Text", dragData);
    //console.info("normal drag: " + dragData);
}
//IE9 fallback --> draganddrop helper function
function Ie9handleDragStart(evt) {
    var attr = $(evt.target).attr('data-drag-txt');
    var dragData = (typeof attr !== typeof undefined && attr !== false) ? attr : evt.target.innerHTML;
    evt.dataTransfer.setData("Text", dragData);
    //console.info("ie9 drag: " + dragData);
}
function Ie9preventDefault(evt) { if (evt.preventDefault) { evt.preventDefault(); } return false; }

jQuery( document ).ready(function( $ ) {
  //Cookie management (userID, user address drawer pref)
  //cookie settings
  Cookies.defaults.expires  = 1;
  Cookies.defaults.secure   = false;
  
  //cookie user pref (address drawer open/close)
  var addressPrefCookie = Cookies.get('eCarteBleue-pref');
  
  //address drawer preference (by default "open" unless cookie exist and says otherwise)
  if(!addressPrefCookie){
    //create pref cookie
    Cookies.set('eCarteBleue-pref', 'open');
    addressPrefCookie = 'close';
  }
  //set auto update preferences
  $('#address-drawer-content').on('show.bs.collapse', function () { 
	  $('#address-drawer').removeClass('closed-address-drawer');
  })
  $('#address-drawer-content').on('shown.bs.collapse', function () { Cookies.set('eCarteBleue-pref', 'open'); })
  $('#address-drawer-content').on('hidden.bs.collapse', function () { 
    Cookies.set('eCarteBleue-pref', 'close'); 
    $('#address-drawer').addClass('closed-address-drawer');
  })
    
  //only one accordion open at a time
  var allAccordionsList = $('.collapse').collapse({ toggle:false });
  
  //set listener for group control
  allAccordionsList.on('show.bs.collapse', function(){
    var currentCaller = this;
    allAccordionsList.each(function(){
      if(currentCaller != this){
        $(this).collapse('hide');
      }
    });
  });
  //set listener for collapse individual close buttons
  allAccordionsList.find('button.close-btn').click(function(){
    $(this).parents('.collapse').collapse('hide');
  });
  
  //address accordion linked to anchor
  $('#address-drawer-content').on('shown.bs.collapse', function () {
    var aTag = $("#address-anchor");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
  })
  
  //init popovers
  $('[data-toggle="popover"]').popover();
  
  //address drawer | link edit button to address edit form
  $('.edit-toggle-btn').click(function(evt){
    $('#address-drawer-content').addClass('edit-display');
  });
  
  //address drawer | link edit to address edit form 
  $('.edit-toggle-href').click(function(evt){
    $('#address-drawer-content').collapse('show').addClass('edit-display');
  });
  
  //apply user preferences (address drawer open/close state)
  var hash =  window.location.hash;
  if(addressPrefCookie == 'open' || "#address-change" == hash) { $('#address-drawer-content').collapse('show'); } else { $('#address-drawer').addClass('closed-address-drawer'); $('#address-drawer-content').collapse('hide'); }
  
  // forcer mode edition en cas de changement d'adresse
  if("#address-change" == hash){$('#address-drawer-content').addClass('edit-display');}
  //validity date toggler
  $('#validity-display-btn').click(function(){
    //toggle form display
    $('#validity-component').removeClass('validity-form-off').addClass('validity-form-on');
    $('#validity-display-btn').attr('aria-expanded',"true");  
  });

  // reduce button - only slim
  $('#header-reduce-btn').click(function () { 
	window.external.HideApplication(); 
  }); 
  
  // close button - only slim
  $('#header-close-btn').click(function () { 
	window.external.CloseApplication(); 
  });
  
  // show menu 
  $('.slim-app').contextPopup({
    items: [
      {label:'Aide',     icon:'',  action:function() { window.open(helpUrl) } },
      {label:'A propos', icon:'',  action:function() { window.external.OpenApropos(); } },
      {label:'Quitter',  icon:'',  action:function() { window.external.CloseApplication(); } }
	]
  });
    
  // print active tab
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  var activeTab = e.target;
	  var hash = activeTab.hash;
	  if(hash =="#history-panes-used-numbers"){		
		  $("#history-panes-used-numbers-print").removeClass('hidden-print');
		  $("#history-panes-unused-numbers-print").addClass('hidden-print');	  
	  }else if(hash =="#history-panes-unused-numbers"){		
		  $("#history-panes-used-numbers-print").addClass('hidden-print');
		  $("#history-panes-unused-numbers-print").removeClass('hidden-print');
	  }
  });
  
    
  //IOS DETECTOR
  var iOS = function() {
    var iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];

    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }

    return false;
  };
  if(iOS()){
    $('body').addClass('iOS');
  };
  
  //iPad DETECTOR
  var iPad = function(){
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
    return isiPad;
  };
  if(iPad()){
    $('body').addClass('iPad');
  };
    
  //Mac DETECTOR
  var Mac_Safari = function(){
	var isMac = false;
	var isSafari = false;
    var MacDevices = [
      'Macintosh',
      'MacIntel',
      'MacPPC',
      'Mac68K'
    ];
    while (MacDevices.length) {
      if (navigator.platform === MacDevices.pop()){ isMac = true; }
    }
    if (navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
    	isSafari = true;
    }
    return isMac && isSafari;
  };
  if(Mac_Safari()){
    $('body').addClass('Mac-Safari');
  };

  //Android Browser DETECTOR
  var AndroidBrowser = function(){
      var ua = navigator.userAgent;
      var is_native_android = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1));

    return is_native_android;
  };
  if(AndroidBrowser()){
    $('body').addClass('AndroidBrowser');
  };
});