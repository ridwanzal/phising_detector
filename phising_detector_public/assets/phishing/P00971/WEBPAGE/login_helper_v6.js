/*
 * Login related javascript functionality.
 *
 * Depends on:
 *   - jQuery.js
 *   - keystroke-biometric.js
 */

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie( name )
{
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i];
    while (c.charAt(0)==' ')
    {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) == 0)
    {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

function deleteCookie( name )
{
	if (-1 < document.cookie.indexOf(name)) {
		createCookie(name, "", -1);
	}
}

function getParameter ( queryString, parameterName )
{
  // Add "=" to the parameter name (i.e. parameterName=value)
  var parameterName = parameterName + "=";
  if ( queryString.length > 0 )
  {
    // Find the beginning of the string
    begin = queryString.indexOf ( parameterName );
    // If the parameter name is not found, skip it, otherwise return the value
    if ( begin != -1 )
    {
      // Add the length (integer) to the beginning
      begin += parameterName.length;
      // Multiple parameters are separated by the "&" sign
      end = queryString.indexOf ( "&" , begin );
      if ( end == -1 )
      {
        end = queryString.length
      }
      // Return the string
      return unescape ( queryString.substring ( begin, end ) );
    }
    // Return "null" if no parameter has been found
    return "null";
  }
}

// Regular expression for Self Selected Id
var ssidRegExp = /^[\w\.\-\\]{4,20}$/
// This one ensures that the Self Selected Id has at least one alpha
var ssidAlphaRegExp = /[A-Za-z]{1,}/

function isPersonalisedId( userid )
{
  if (!ssidRegExp.test(userid))
  {
    return false;
  }
  return ssidAlphaRegExp.test( userid );
}

// IVR password is either 4 or five digits
var ivrPwdRegExp = /^[0-9]{4,5}$/

function isIVRPassword( password )
{
  return ivrPwdRegExp.test( password );
}

/**
 * The password length and contents pattern
 */
var passwordLengthRegExp = /^.{8,20}$/;

/**
 * Ensures the password has at least one alpha.
 */
var passwordAlphaRegExp = /[A-Za-z]{1,}/;

/**
 * Ensures the password has at least one digit.
 */
var passwordDigitRegExp = /[0-9]{1,}/;

function isValidPassword( password )
{
  if (!passwordLengthRegExp.test( password ) )
  {
    return false;
  }
  if (!passwordAlphaRegExp.test( password ) )
  {
    return false;
  }
  return passwordDigitRegExp.test( password );
}

function isValidCustomerId( userid )
{
  if (userid.length == 0)
  {
    return false;
  }
  return true;
}

/*
This function is used to check if the enter key has been pressed
while at the login page form.

If the Enter key is pressed then it will submit the form and false will be
returned to prevent the HTMLElement processing the Enter key. A cookie
containing the number of times the form has been submitted will also be
incremented.

If another key is pressed, it will return true to allow the key entered to
be processed by the HTMLElement.

Note that this function is probably only useful for the login page.
===================================================================
*/

function checkEnter(event, form)
{
  var code = 0;
  var NS4 = (document.layers) ? true : false;

  if (NS4)
  {
    code = event.which;
  }
  else
  {
    code = event.keyCode;
  }

  if (code == 13 || code == 3)
  {
    if (!validateContents(form))
    {
      return false;
    }
    incrementLoginCount();
    saveKeystrokeBiometric();
    form.submit();
    return false;
  }
  return true;
}

function incrementLoginCount()
{
  var loginCount = readCookie("LoginCount");
  loginCount = loginCount * 1 + 1;
  createCookie("LoginCount", loginCount);
  loggingIn = true;
}

function saveKeystrokeBiometric()
{
	var password = jQuery("input[name=input_password]"),
		biometrics = password.serialiseKeystrokeBiometric();
	createCookie("keystrokeBiometric", biometrics[0]);
	createCookie("pressedBackspace", password.data("ksb:backspace"));
	createCookie("clickedMouse", password.data("clicked"));
}

function validateContents(form)
{
  var userid = form.input_username.value;
  var pwd = form.input_password.value;

  if (!isValidCustomerId(userid))
  {
    alert("...sorry, please enter your Customer ID.");
    form.input_username.focus();
    form.input_username.select();
    return false;
  }

  if (pwd.length==0)
  {
    alert("...sorry, please enter your Customer ID and password.");
    form.input_password.focus();
    form.input_password.select();
    return false;
  }

  if (isPersonalisedId(userid) && isIVRPassword(pwd))
  {
    alert("...sorry, but personalised IDs cannot be used with Phone Banking passwords. ");
    form.input_username.focus();
    form.input_username.select();
    return false;
  }

  if (!isValidPassword(pwd) && !isIVRPassword(pwd))
  {
    alert("...sorry, but your password must be between 8 and 20 characters long and include at least 1 number and 1 letter.");
    form.input_password.focus();
    form.input_password.select();
    return false;
  }

  jQuery("input[name=j_password]").val(pwd);
  jQuery(form.input_password).val("").prop( "disabled", true ).css("backgroundColor","#d2d2d2");
  jQuery("input[name=j_username]").val(userid);
  jQuery(form.input_username).val("").prop( "disabled", true ).css("backgroundColor","#d2d2d2");
  jQuery("#aFirst").val("");
  return true;
}

function timeout()
{
	var timeoutTime = new Date();
	//check if it has been more than 10 mins since the last ajax call
	//to keep the session alive
	var diff = timeoutTime - pageLandTime;
	if ( !loggingIn && (diff > sessionTimeOutSeconds) ) {
		//stops ajax calls to keep session alive
		jQuery('#username').unbind('keydown');
		jQuery('#password').unbind('keydown');
		//removes enter key listener
		jQuery('#username').removeAttr('onkeypress');
		jQuery('#password').removeAttr('onkeypress');
		
		//show timeout lightbox
		jWestpac().launchLightbox('#logonRefresh', true, true);

		//remove lightbox and refresh page on Esc key (IE6 only listens to keyup for Esc)
		jQuery(document).keyup(function(e) {
			if (e.keyCode == 27) {
				refreshPage();
			}
		});
		//remove lightbox and refresh page on click away from lightbox
		jQuery('.overlay').click(function() {
			refreshPage();
		});
		//remove lightbox and refresh page on click of OK button
		jQuery('#timeoutRefresh').click(function() {
			refreshPage();
		});
		//Activating OK link using enter key closes lightbox and refreshes page (IE6 only listens to keydown for Enter)
		jQuery('#timeoutRefresh').keydown(function(e) {
			if (e.keyCode == 13) {
				refreshPage();
			}
		});
		
		return false;
	}
	else {
		setTimeout('timeout()', sessionTimeOutSeconds - diff);
	}
}

//Check if we need to keep the session alive
function testKeepAlive()
{
	var keyPressTime = new Date();
	//we are 20secs from timing out, but user has started typing, so keep session alive
	if ( (keyPressTime - pageLandTime)	> (sessionTimeOutSeconds - timeoutThreshold) ) {
		keepAliveIOLB();
		//reset the counter
		pageLandTime = keyPressTime
	}
}

function keepAliveIOLB() 
{
	jQuery.ajax({
		type: "GET",
		url: "/IOLB/jsps/refreshSession/SessionRefresh.jsp",
		cache: false
	});
}

function refreshPage()
{
	window.location.href="newSession";
}

function testAcceptCookie()
{
  createCookie("iolbTest", "1234");

  var ck = readCookie("iolbTest");

  if ( ck == null )
  {
    return false;
  }
  else
  {
    createCookie("iolbTest", "99", -1);
    return true;
  }
}
/**
 * Show or hide the need help information for password reset
 **/
function doNeedHelp()
{
	var ele = document.getElementById("needHelpDiv");
	var needHelpLnk = document.getElementById("needHelpLnk");
	if(ele.style.display == "block")
	{
		ele.style.display = "none";
	}
	else
	{
		ele.style.display = "block";
	}
	//removes the need help link on first click
	if(needHelpLnk.style.display == "inline")
	{
		needHelpLnk.style.display = "none";
	}
}