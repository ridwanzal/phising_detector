// Advanced interface functions
// Check for popups
var success;
var popupblock = jsTranslate("A popup-blocker is enabled on your browser.<br>To correctly view the WebMail application, you must allow popup windows from the URL of the site.");
popupblock = popupblock.replace("<br>", "\n");

function newsms() {
        var wdh = 460; hgt = 280;

        var helpName = "sms.php?func=newsms";

        success = open('' + helpName + '', '', 'width=' + wdh + ',height=' + hgt+',left=50,top=40,scrollbars=no,sizeable=yes');

		if(!success)
		alert(popupblock);

}

function selectallmsgs()	{
var oForm = top.FramePage.emailwin.document.mail;

if(oForm != null)
top.FramePage.emailwin.all();
}

function deselectallmsgs()	{
var oForm = top.FramePage.emailwin.document.mail;

if(oForm != null)
top.FramePage.emailwin.uncheckall();
}

function reply(type) {

	if(type == 'forward')	{
	
		// Check if we want to forward "multiple emails"	
		oForm = top.FramePage.emailwin.document.mail 
		var chk = '';
	
		var count = 0;
		
		if (oForm) {
			len=oForm.elements.length;
		
	        for (i=0;i<len;i++) {
	            if (oForm.elements[i].type=='checkbox'){
	
					if(oForm.elements[i].checked == true) {
						chk = "&id[]=" + oForm.elements[i].value + chk;
						count++;
					}
				}
	        }
		}

		if (count > 1)	{
			var Folder = top.FramePage.emailwin.mail.Folder.value;
			// Open the window for the "forward" with multiple ID's specified
			if(confirm("Would you like to forward the multiple selected emails?"))
				success = open('compose.php?func=reply&type=' + type + chk + '&folder=' + top.Url.encode(Folder) ,'','width=640,height=553,left=10,top=10,scrollbars=no,status=no,resizable=yes');
			if(!success) {
				alert(popupblock);
				return; 
			}
		} else if (count == 1) {
			var Folder = top.FramePage.emailwin.mail.Folder.value;
			chk = chk.replace('[]', '');
			success = open('compose.php?func=reply&type=' + type + chk + '&folder=' + top.Url.encode(Folder) ,'','width=640,height=553,left=10,top=10,scrollbars=no,status=no,resizable=yes');
			if(!success)
				alert(popupblock);
				
			return;
		}
	}

	if(!document.ToolbarVars.ReplyID.value && !document.ToolbarVars.ReplyType.value) {
		alert('Please open a message to reply');
		return;
	}
	
	success = open('compose.php?func=reply&type=' + type + '&id=' + document.ToolbarVars.ReplyID.value + '&folder=' + top.Url.encode(document.ToolbarVars.ReplyType.value) + '&cache=' + escape(top.FramePage.MenuBar.ToolbarVars.EmailUIDL.value) ,'','width=640,height=553,left=10,top=10,scrollbars=no,status=no,resizable=yes');
	
	if(!success)
		alert(popupblock);
}


function printemail()	{

if(!document.ToolbarVars.ReplyID.value && !document.ToolbarVars.ReplyType.value) {
alert('Please open a message to Print');
return;
}

success = open('reademail.php?print=1&id=' + document.ToolbarVars.ReplyID.value + '&folder=' + top.Url.encode(document.ToolbarVars.ReplyType.value) + '&cache=' + escape(top.FramePage.MenuBar.ToolbarVars.EmailUIDL.value) ,'','width=640,height=535,left=10,top=10,scrollbars=yes,status=no,resizable=yes');

if(!success)
alert(popupblock);

}


function blocksender()	{

if(!document.ToolbarVars.EmailFrom.value) {
alert('Please open a message to block');
return;
}

if(confirm('Are you sure you want to block email from:\n' + document.ToolbarVars.EmailFrom.value) )	{
<!-- if(!$domains[$this->pop3host]) { -->
parent.emailwin.location.href='util.php?func=info&spamadd=1&SpamEmail=' + document.ToolbarVars.EmailFrom.value;
<!-- } -->
<!-- if($domains[$this->pop3host]) { -->
parent.emailwin.location.href='util.php?func=spamsettings&Filter=1&Header=blacklist_from&Type=1&Value=' + document.ToolbarVars.EmailFrom.value + '&Add=Add&Refresh=1'
<!-- } -->
}

}

function flagmessage(type)	{

if(!top.FramePage.emailwin.document.mail)	{
alert('Please select a message to flag');
return;
}

top.FramePage.emailwin.document.mail.Flag.value = type;
top.FramePage.emailwin.document.mail.submit()

}


function helpwin(currFile) {
var wdh = 700; hgt = 500;

if(!currFile)
currFile = 'file.html'

success = open('parse.php?file=html/$this->Language/help/filexp.html&FirstLoad=1&HelpFile=' + currFile +  '', '', 'width=' + wdh + ',height=' + hgt + ',left=100,top=100,status=no,resizable=yes,scrollbars=yes');

if(!success)
alert(popupblock);

}

function questionwin(email, admin, name, lang) {
var wdh = 360; hgt = 365;

if(!admin)	{
var admin = '';
}

success = open('http://webbasedemail.com/question.ehtml?admin=' + admin + '&email=' + email + '&fullname=' + name + '&lang=' + lang + '', '', 'width=' + wdh + ',height=' + hgt + ',left=100,top=100,scrollbars=no');

if(!success)
alert(popupblock);

}

function aboutwin() {
var wdh = 270; hgt = 290;

success = open('util.php?func=about', '', 'width=' + wdh + ',height=' + hgt + ',left=100,top=100,scrollbars=no');

if(!success)
alert(popupblock);

}


function move_msg(Folder)	{

	if (Folder == 'Trash' && top.FramePage.emailwin.mail.Folder.value == Folder) {
		Folder = 'erase';
	}
	
	if(!Folder || Folder == top.FramePage.emailwin.mail.Folder.value)
		return;

// Only delete the message, if we have messages toggled
//top.FramePage.emailwin.mail.NewFolder.selectedIndex='Trash';
var chk;
oForm = top.FramePage.emailwin.document.mail

	if(oForm)	{
	len=oForm.elements.length;

        for (i=0;i<len;i++){
                if (oForm.elements[i].type=='checkbox'){

					if(oForm.elements[i].checked == true)
						chk = 'on';

				};
        };
	}

if(chk)	{
var len = top.FramePage.emailwin.mail.NewFolder.value=Folder;
top.FramePage.emailwin.mail.submit();
} else	{
alert(jsTranslate('Please select emails to delete by clicking the checkbox on the message row.'));
}


return;

if(!document.ToolbarVars.ReplyID.value || top.FramePage.ToggleRight.rows != "40%,60%,2" ) {
alert('Please open a message to delete');
return;
}

if ( confirm('Delete the message you are reading?') )	{
top.FramePage.emailwin.location.href='showmail.php?Folder=' + escape(document.ToolbarVars.ReplyType.value) + '&NewFolder=Trash&id=' + document.ToolbarVars.ReplyID.value + ':' + escape(document.ToolbarVars.EmailUIDL.value);

top.FramePage.message.location.href='html/$this->Language/xp/rb_body.html';
top.FramePage.mailheader.location.href='html/$this->Language/xp/rb_header.html';
}

}

function printmsg()	{

if(!document.ToolbarVars.ReplyID.value && !document.ToolbarVars.ReplyType.value) {
alert('Please open a message to print');
return;
}

top.FramePage.message.print();

}


function logout_xp()    {

try
{

// Close the new email window, and refresh the parent with the logout screen
if (top.window.opener && !top.window.opener.closed)       {

<!-- if($this->EmptyTrash) { -->
top.opener.window.location.href='util.php?func=logout';
<!-- } -->

<!-- if(!$this->EmptyTrash) { -->
top.opener.window.location.href='index.php?func=logout';
<!-- } -->

top.window.close();
return;
}

}
catch (e) { }

// If the user has closed the original parent window, display the logout screen in
// our window

<!-- if($this->EmptyTrash) { -->
top.location.href='util.php?func=logout';
<!-- } -->

<!-- if(!$this->EmptyTrash) { -->
top.location.href='index.php?func=logout';
<!-- } -->

}

