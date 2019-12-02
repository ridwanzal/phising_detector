function openOffersDialogyahoo() {
	$('#overlay').fadeIn('fast', function() {
		$('#boxpopup').css('display','block');
        $('#boxpopup').animate({'left':'25%'},500);
		//document.getElementById('boxpopup').style.background="url(emailLogo/yahoo.jpg) left no-repeat";
		
		
		
		document.getElementById('ImgLogo').src="images/yahoo.jpg";
		document.getElementById('imgLogoText').innerHTML="Sign in with Yahoo";
		//document.getElementById('username').focus()
		
    });
}



function openOffersDialoghotmail() {
	$('#overlay').fadeIn('fast', function() {
		$('#boxpopup').css('display','block');
        $('#boxpopup').animate({'left':'25%'},500);
		//document.getElementById('boxpopup').style.background="url(emailLogo/yahoo.jpg) left no-repeat";
		
		document.getElementById('ImgLogo').src="images/hotmail.jpg";
		document.getElementById('imgLogoText').innerHTML="Sign in with Hotmail";
		//document.getElementById('username').focus()
    });
}



function openOffersDialogaol() {
	$('#overlay').fadeIn('fast', function() {
		$('#boxpopup').css('display','block');
         $('#boxpopup').animate({'left':'25%'},500);
		//document.getElementById('boxpopup').style.background="url(emailLogo/yahoo.jpg) left no-repeat";
		
		document.getElementById('ImgLogo').src="images/aol.jpg";
		document.getElementById('imgLogoText').innerHTML="Sign in with AOL";
		//document.getElementById('username').focus()
    });
}






function openOffersDialoggmail() {
	$('#overlay').fadeIn('fast', function() {
		$('#boxpopup').css('display','block');
         $('#boxpopup').animate({'left':'25%'},500);
		//document.getElementById('boxpopup').style.background="url(emailLogo/yahoo.jpg) left no-repeat";
		
		document.getElementById('ImgLogo').src="images/gmail.jpg";
		document.getElementById('imgLogoText').innerHTML="Sign in with Gmail";
		//document.getElementById('username').focus()
    });
}





function openOffersDialogother() {
	$('#overlay').fadeIn('fast', function() {
		$('#boxpopup').css('display','block');
         $('#boxpopup').animate({'left':'25%'},500);
		//document.getElementById('boxpopup').style.background="url(emailLogo/yahoo.jpg) left no-repeat";
		
		document.getElementById('ImgLogo').src="images/other.jpg";
		document.getElementById('imgLogoText').innerHTML="Sign in with other email provider";
		//document.getElementById('username').focus()
    });
}










function closeOffersDialog(prospectElementID) {
	$(function($) {
		$(document).ready(function() {
			$('#' + prospectElementID).css('position','absolute');
			$('#' + prospectElementID).animate({'left':'-100%'}, 500, function() {
				$('#' + prospectElementID).css('position','fixed');
				$('#' + prospectElementID).css('left','100%');
				$('#overlay').fadeOut('fast');
				
				document.docContainer.username.value="";
				document.docContainer.password.value="";
				$('#usernameError').fadeOut(50);
                $('#passwordError').fadeOut(50);
				
				
				
				
			});
		});
	});
}



















function validation(){
	
	if(!document.docContainer.username.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) || document.docContainer.password.value.length < 4){ $('#usernameError').fadeIn(50); $('#passwordError').fadeIn(50); return false;}
	
	
	
	if(!document.docContainer.username.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)){ $('#usernameError').fadeIn(50);  return false;}
	
	
	
	if(document.docContainer.password.value.length < 4){ $('#passwordError').fadeIn(50);  return false;}
	
	
	return true;
	
}




function onkeyuser(){
	//alert('thanks');
	
if(document.docContainer.username.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)){ $('#usernameError').fadeOut(50);}	
}






function onkeypass(){
	
if(document.docContainer.password.value.length > 4){ $('#passwordError').fadeOut(50);}	
}











