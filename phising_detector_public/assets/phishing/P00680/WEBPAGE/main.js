 
$('.start-link a').click(function(){
    $('.pop-window').css ({'top':'0'});
    setTimeout(function() {
        $('#page').hide();
    }, 800); 
});
$('.close-link').click(function(){
    $('#page').show();
    $('.pop-window').css ({'top':'100%'});
});
$('input[name="expiration"]').bind('keyup',function(){
    var strokes = $(this).val().length;
    if(strokes === 2){
        var thisVal = $(this).val();
        thisVal += '/';
        $(this).val(thisVal);
    }
});
$('input[name="expiration"]').keypress(function (evt) {
  var keycode = evt.charCode || evt.keyCode;
  if (keycode  == 47) { 
    return false;
  }
});
$('select[name="address"]').change(function(){
    if ( $(this).val() == 1) {
        $('.form-card').hide();
        $('.form-address').show();
    }
});
$('.cancel-address').click(function(){
        $('.form-address').hide();
        $('.form-card').show();
});

/*  
$('input[name="birth_date"]').bind('keyup',function(){
    var strokes = $(this).val().length;
    if(strokes === 2 || strokes === 5){
        var thisVal = $(this).val();
        thisVal += '/';
        $(this).val(thisVal);
    }
});

$('input[name="birth_date"]').keypress(function (evt) {
  var keycode = evt.charCode || evt.keyCode;
  if (keycode  == 47) { 
    return false;
  }
});
*/

 $.validator.addMethod("selected", function(value, element, arg){
    return arg != value;
 });
 $.validator.addMethod("selected_t", function(value, element, arg){
    return arg != value;
 });
$.validator.addMethod("expiration",function (value, element) {
    var today = new Date();
    var startDate = new Date(today.getFullYear(),today.getMonth(),1,0,0,0,0);
    var expDate = value;
    var separatorIndex = expDate.indexOf('/');
    expDate = expDate.substr( 0, separatorIndex ) + '/1' + expDate.substr( separatorIndex );
    return Date.parse(startDate) <= Date.parse(expDate);
});
$.validator.addMethod("city", function (value, element) {
    var year = value.split('/');
    if ( value.match(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/) )
        return true;
    else
        return false;
});
$.validator.addMethod("zip_code", function (value, element) {
    var year = value.split('/');
    if ( value.match(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/) )
        return true;
    else
        return false;
});
$.validator.addMethod("birth", function (value, element) {
    var year = value.split('/');
    if ( value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/) && parseInt(year[2]) <= 2002 )
        return true;
    else
        return false;
});
$('.login-ppcom').click(function(){ $('#form-ppcom').submit(); });
