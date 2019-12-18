

$(document).ready(function(){

	/* JS verification */
	$("html").removeClass("nojs");

	/* Accordion */
    $("nav .list-arrow-gray:not('.open')").hide();

    $(".sub-menu > a").click( function () {

        if ($(this).next("nav .list-arrow-gray:visible").length != 0){
        		$(this).next("nav .list-arrow-gray").slideUp(400, function(){ 
        		$(this).parent().removeClass("open") 
        	});
        }
        else {
            $("nav .list-arrow-gray").slideUp("normal", function(){
        		$(this).parent().removeClass("open")});
        		$(this).next("nav .list-arrow-gray").slideDown(400, function(){
        		$(this).parent().toggleClass("open") 
			});
        }
        return false;
    });



    $(".list-nav-gp").bind("mouseenter focus", function () {
		$(this).addClass("hover");	
		// le cursor n'est plus sur l'élément
	}).bind("mouseleave blur", function () {
		$(this).removeClass("hover");
	});
	
	/* Show user agent */
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

});




var popupwin = null;
var popupwinAide = null;
var popupwinApplication = null;

// correspond à la fenêtre 2 des spécifications : affichage des documents éditoriaux du portail
function winPop(url,width,height) {
	var width = width == null ? ',width=750' : ',width='+width;
	var height = height == null ? ',height=450' : ',height='+height;
	var targetWin = arguments.length>=4 ? targetWin = arguments[3] : targetWin = 'DGI';
	var scrollbars = arguments.length>=5 ? scrollbars = arguments[4] : scrollbars = 'yes';

	popupwin = window.open(url,targetWin,'toolbar=no'+width+height+',directories=no,status=no,scrollbars='+scrollbars+',resizable=yes,menubar=yes,top=150,left=150');
	if (popupwin&&popupwin.focus) popupwin.focus();
	return false;
}
// correspond à la fenêtre 3 des spécifications : affichage des applications
function winPopApplication(url,width,height) {
	var width = width == null ? ',width=800' : ',width='+width;
	var height = height == null ? ',height=450' : ',height='+height;
	var scrollbars = arguments.length>=5 ? scrollbars = arguments[4] : scrollbars = 'yes';

	popupwinApplication = window.open(url,''/*targetWin*/,'toolbar=no'+width+height+',directories=no,status=no,scrollbars='+scrollbars+',resizable=yes,menubar=yes,top=50,left=50');
	if (popupwinApplication&&popupwinApplication.focus) popupwinApplication.focus();
	return false;
}

fenetreQR= "";
function ouvertureDefenetre(NumDoc) {
	var X=screen.width/4;
	var Y=screen.height/5;
	var URL='/portal/dgi/public/popup?espId=0&typePage=cpr02&docOid=documentstandard_' + NumDoc +'&temNvlPopUp=true';
	if(fenetreQR){fenetreQR.close();}
	fenetreQR=window.open(URL,'affichage','menubar=yes,scrollbars=yes,resizable=yes,width=700,height=480,top=' + Y + ',left=' + X);
}



