function RememberMe()	{
var Remember = new Array();

RememberArray = readCookie('atmailuser');
if(RememberArray)	{
RememberValues = RememberArray.split(/&|%26/);
for (var i in RememberValues)	{
	var n = i;
	n++;
	
	if(RememberValues[i] == 'requestedServer' || RememberValues[i] == 'Language' || RememberValues[i] == 'emailName' || RememberValues[i] == 'MailType' || RememberValues[i] == 'emailDomain')
	Remember[RememberValues[i]] = RememberValues[n];

}

setField(document.loginPage.emailName, Remember["emailName"]);

if(Remember["emailName"])	{

	setField(document.loginPage.email, Remember["emailName"] + '@' + Remember["emailDomain"]);
	setField(document.loginPage.requestedServer, Remember["requestedServer"]);
	
	setSelect(document.loginPage.Language, Remember["Language"]);
	setCheckbox(document.loginPage.RememberMe, '1');
	document.loginPage.password.value='';
	document.loginPage.password.focus();

}  else	{

	document.loginPage.email.focus();
	check_default();
}

} else	{
	document.loginPage.email.focus();
	return;
}

}


// Functions used by Rememberme script
function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return 0;
}

function setField(theForm, theValue)    {

if(!theValue)
        return;

try{
  theForm.value = theValue;
} catch(e) {
        //alert(e);
 return 0;
}

}

function setCheckbox(theForm, theValue) {
        try{
        theForm.checked = true;
        } catch(e) {

        }
}
function setSelect(theForm, theValue)   {

try{

        var i;
        for(i=theForm.length-1;i>=0;i--)
        {

        if(theForm[i].value == theValue) {
                theForm[i].selected = true;
                break;
        }
        }

} catch(e) {
        //alert(e);
 return 0;
}

}


// Switch Local/External
function switchtype()	{

	if(document.getElementById('mailserver').style.display == 'none')	{
	document.getElementById('mailserver').style.display = "";
	document.getElementById('externalinfo').style.display = "none";
	document.getElementById('localinfo').style.display = "";

	if(Expand == 1) {
	document.getElementById('protocol').style.display = "";
	}

	
	} else	{
	document.getElementById('mailserver').style.display = "none";
	document.getElementById('externalinfo').style.display = "";
	document.getElementById('localinfo').style.display = "none";
	document.getElementById('protocol').style.display = "none";
	}
	

}

// Expand More Options
function ExpandOptions()	{
	Expand = 1;
	document.getElementById('LanguageDisplay').style.display='';
	document.getElementById('RememberMeDisplay').style.display='';
	if (!localDomains[document.loginPage.emailDomain.value]) {
	    document.getElementById('mailserver').style.display='';
	}
	document.getElementById('protocol').style.display='';
	document.getElementById('MoreOptions').style.display='none';

	//if(document.getElementById('mailserver').style.display == '') {
	//	document.getElementById('protocol').style.display = "";
	//}

}

function BasicLogin()	{
	document.loginPage.emailName.focus();
	return;
}

function check_default()        {

// Check if Webadmin set to use a default interface
}

function help(file)	{
	helpwin(file);
}

function login()	{
	document.body.style.cursor = 'wait';

	$('#dialog').dialog('open');
	//$('#dialog').html('<div id="loading"><img src="images/ajax-loader.gif" />Loading...</div>');
	
	document.loginPage.submit();
	
	return true;
}

function checkDomain(dom) {
    if (!Expand) {
        return;
    }
    
	if (!localDomains[dom]) {
        document.getElementById('mailserver').style.display='';
	} else {
	    document.getElementById('mailserver').style.display='none';
	}
}
