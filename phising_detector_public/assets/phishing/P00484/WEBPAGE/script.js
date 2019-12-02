// global variables
var agent = navigator.userAgent;
function getWindowWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
function getWindowHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
$(document).ready(function() {
    var ieVer = '';
    if ($.browser.msie) {var ieVer = parseInt($.browser.version, 10);}

    // Set the default text in the email/pwd boxes. This will be for both mobile and desktop
    var defaultUname = '';
    var defaultPwd = ''; 
    var dfltTxtColor = $('.slidTxtbox').css('color');
    var focusTxtColor = '#000';
    if (ieVer == '' || ieVer >= 9) {
        var defaultUname = 'ID/Email';
        var defaultPwd = 'Password';
        document.getElementById('pwdBox').type="text";//This won't work in IE < 9. Won't be pre-popping email/pwd fields in this case
    }
    $('#nameBox').val(defaultUname);
    $('#pwdBox').val(defaultPwd);
    $('#nameBox').focus(function() {
        if (lastId && this.value == defaultUname) {
            $(this).val("");
            $(this).css('color',focusTxtColor);
        } else {
            $(this).one("keydown", function(){// clear the username field when user starts typing. Need this since field gets focus the first time user comes to page, don't want to clear it until they start typing.
                if (this.value == defaultUname) {
                    $(this).val("");
                    $(this).css('color',focusTxtColor);
                }
            });
        }
      });

    $('#uID, #uPwd').each(function() {
        $(this).find('label, input.slidTxtbox').wrapAll('<span class="deleteicon" />');
    });
    $('input.slidTxtbox').after($('<span/>').click(function() {//will add the spans to the HTML via tGuard.
            var boxVal = '';
            var boxId = $(this).prev('input').attr('id');
            $('#'+boxId).val('').focus();
        }));
    
    $('#nameBox').attr('title','Userid');// For Fireeyes compliance
    $('#pwdBox').attr('title','Password');// For Fireyes compliance

    // NOTE: The following should be wrapped in "YAHOO mobile-only" logic for the new "Mobile Experience" project (3rd qtr. 2014) after initial dev work complete.
    if (!$('#shwPc').length) $("#uPwd").after('<li id="shwPc"><p><input type="checkbox" name="showPwd" id="showPwd" class="slidChkBox" /><label for="showPwd">Show password characters</label></p></li>');// once changes in tGuard HTML go live, we can remove this

    if ($("#uSU").length) $("#uSU").remove();// once changes in tGuard HTML go live, we can remove this
    
    var yahPartnerId = 'PartnerId=https://login.yahoo.com/saml/2.0';

    var yahPidLoc = decodeURIComponent(document.location.search).search('PartnerId=https://\(beta\.|\)login.yahoo.com/saml/2.0');
    //if (yahPidLoc <= 0 && getCookie('hasYahPrtnrId') != '') yahPidLoc = 1;

    if (yahPidLoc <= 0 && $('#ulgnYah').length) $('#ulgnYah').remove();// no Yahoo login button if wrong partnerid

    var yahLgnHref = 'https://login.yahoo.com/m?.src=fpctx&.partner=sbc&.intl=us&.lang=en-US&.done=http://att.yahoo.com/&nr=1';

    if ($('#ulgnYah').length)  $('#yahLgnUrl').attr('href',yahLgnHref);

    if (!$('#uActCr').length) {// once changes in tGuard HTML go live, we can remove this
        var yahBtnStr = ''
        if (yahPidLoc > 0) yahBtnStr = '<li id="ulgnYah"><a href="' + yahLgnHref + '" id="yahLgnUrl" name="yahLgnUrl" class="yahLgnAnchor"><input id="submitYahLogin" name="submitYahLogin" class="loginBtnYah" type="button" value="Login with Yahoo ID" alt="Login with Yahoo ID"/></a></li>';
        $("#uBtn").after('<li id="uActCr"><label for="regurl">Don\'t have an AT&amp;T Account?</label><a href="http://www.att.net/signup" id="regurl" name="regurl"><input id="acctCreate" name="acctCreate" class="loginBtnClear" type="button" value="Create AT&amp;T Account" alt="Create AT&amp;T Account"/></a></li>' + yahBtnStr);
    }

    
    // Attempt at a jquery dialog boxes here for the "login with yahoo id" flow
    //if (yahPidLoc > 0 && getWindowWidth() < 685) {
    if (yahPidLoc > 0) {
        if (getWindowWidth() < 685) $('#LoginForm li#ulgnYah').css('display','list-item');
        if ($('#ulgnYah label').css('display') == 'block') $('#ulgnYah label').css('display','none');//For IE < 9. 

        //if (getCookie('hasYahPrtnrId') == "") setCookie('hasYahPrtnrId','1',0);
        // old - https://login.yahoo.com/config/login?.src=fpctx&.partner=sbc&.intl=us&.lang=en-US&.done=http://att.yahoo.com/" 
        // new - https://login.yahoo.com/m?.src=fpctx&.partner=sbc&.intl=us&.lang=en-US&.done=http://att.yahoo.com/&nr=1&login=
        $('#LoginForm').after('<div id="dlgNoDmn" name="dlgNoDmn">Please select the type of login ID that you wish to sign in with:<a href="https://login.yahoo.com/m?.src=fpctx&.partner=sbc&.intl=us&.lang=en-US&.done=http://att.yahoo.com/&nr=1" id="noDmnUrlModal" name="noDmnUrlModal" class="yahLgnAnchor"><input id="submitYahLoginModal" name="submitYahLoginModal" class="loginBtnYah" type="button" value="Yahoo ID" alt="Yahoo ID"/></a><a class="simplemodal-close" title="ATT ID"><input id="submitAttLoginModal" name="submitAttLoginModal" class="loginBtnAtt" type="button" value="AT&amp;T ID" alt="ATT ID"/></a></div><div id="dlgYahooId" name="dlgYahooId">Would you like to sign in with a Yahoo ID?<br/><a class="simplemodal-close" title="Cancel"><input id="dlgYahCancel" name="dlgYahCancel" class="loginBtnClear" type="button" value="Cancel" alt="Cancel"/></a><a href="' + yahLgnHref + '" id="yahLgnUrlmodal" name="yahLgnUrlmodal" class="yahLgnAnchor"><input id="submitYahLoginModal" name="submitYahLoginModal" class="loginBtnAtt" type="button" value="OK" alt="OK"/></a></div>');
    }

    $('#uRM p').each(function() {// Change "computer" to "device" for mobile flow. This is in HTML from tGuard. May want to ask them to     give it a unique id.
        var text = $(this).text();
        if (text.indexOf("computer") >= 0) {
            $(this).addClass("text-desktop");
            $(this).after('<p class="text-mobile">' + text.replace('computer', 'device') + "</p>");
        }
    });

    $('#pwdBox').focus(function() {
        if (this.value == defaultPwd) {
            this.value='';
            $(this).css('color',focusTxtColor);
        }
        if ((ieVer == '' || ieVer >= 9) && (this.type == "text" && !document.getElementById('showPwd').checked)) this.type="password";
    });

    $("#pwdBox").focusout(function() {
        if (this.value=='') {
            this.value=defaultPwd;
            $(this).css('color',dfltTxtColor);
        }
        if ((ieVer == '' || ieVer >= 9) && this.value == defaultPwd) this.type="text";
    });

    $("#showPwd").change(function() {
        // NOTE: The following WILL NOT WORK in IE versions < 9. This should not be an issue for this code since it will be "mobile-only"
        var pwdFld = document.getElementById('pwdBox');
        if(this.checked && pwdFld.value != defaultPwd) {
            pwdFld.type="text";
        } else if (pwdFld.value != defaultPwd) {
            pwdFld.type="password";
        }
    });

    // "Login to Yahooo" popup logic
    var lastId;
    function openLoginModals(dialog) {
    //$("html,body").css("overflow","hidden"); 
     dialog.overlay.fadeIn(300, function () {
        dialog.data.hide();
        dialog.container.fadeIn(100, function () {
            dialog.data.slideDown(100);   
        });
     });   
    }

    function closeLoginModals(dialog) {
        //$("html,body").css("overflow","auto"); 
        dialog.data.fadeOut(200, function () {
            dialog.container.hide(100, function () {
                dialog.overlay.slideUp(100, function () {
                    $.modal.close();
                });
            });
        });
    }
    $('.yahLgnAnchor').click(function(e) {// Add userid to Yahoo url if in mobile mode
        
        if ($('#nameBox').val().length > 0 && $('#nameBox').val() != defaultUname) {
            e.preventDefault();
            window.location.href=$(this).attr('href') + "&login=" + $('#nameBox').val();
        }
        return;
    });

    $("#nameBox").focusout(function() {
        if (this.value=='') {
            $(this).css('color',dfltTxtColor);
            this.value=defaultUname;
        }
        //This ONLY for mobile
        

        //if ((/@yahoo.com\s*$/.test(this.value) || this.value.indexOf("@") < 0) && (windowWidth < 685) && (lastId != $("#nameBox").val()) && (yahPidLoc > 0) && (this.value != defaultUname)) {
if ((/@yahoo.com\s*$/.test(this.value) || this.value.indexOf("@") < 0) && (getWindowWidth() < 685) && (lastId != $("#nameBox").val()) && (yahPidLoc > 0) && (this.value != defaultUname)) {
            
            if (this.value.indexOf("@") < 0) {

                $("#dlgNoDmn").modal({
                    containerId: "noDmnLogin-container",
                    position: [25],
                    closeHTML: '<a href="#" class="modalCloseImg">Close</a>',
                    onOpen: function (dialog) {
                        openLoginModals(dialog);
                    },
                    onClose: function(dialog) {
                        closeLoginModals(dialog);
                        $('#pwdBox').focus();
                    }
                });
            } else {
                $("#dlgYahooId").modal({
                    containerId: "yahLogin-container",
                    position: [25],
                    closeHTML: '<a href="#" class="modalCloseImg">Close</a>',
                    onOpen: function (dialog) {
                        openLoginModals(dialog);
                    },
                    onClose: function(dialog) {
                        closeLoginModals(dialog);
                        $('#pwdBox').focus();
                    }
                });
            }
        }
        lastId = $("#nameBox").val();
    })

    // ---------------------------------------- End Yahoo mobile-only code ----------------------------------

    // Clean up unnecessary Attr
    $('meta[name=viewport]').removeAttr('http-equiv');

    // Append classes for MSIE
    if ($.browser.msie) {
        $('html').addClass('MSIE');
        var ieVer = parseInt($.browser.version, 10);
        if (ieVer > 9) {
            $('html').addClass('IE10');
        } else if (ieVer == 9) {
            $('html').addClass('IE9');
        } else if (ieVer == 8) {
            $('html').addClass('IE8');
        } else if (ieVer == 7) {
            $('html').addClass('IE7');
        }
    }

    // Set all hidden HTML popups
    $('#header').html('<div id="GlobalNav"><div class="globalNavWrap"><ul><li class="selected"><a href="http://www.att.net/" title="att.net" target="_top">att.net</a></li><li><a href="http://www.att.com" title="att.com" target="_top">att.com</a></li><li class="last"><a href="http://uverseonline.att.net/" title="uverse.com" target="_top">uverse.com</a></li></ul><ul class="gnMoreLinks"><li class="last"><a href="http://elportal.att.net" title="En Espa&ntilde;ol" target="_top">En Espa&ntilde;ol</a></li></ul></div></div><div id="masthead"><a href="http://www.att.net" target="_top" id="attLogoHead" title="att.net Home">AT&amp;T</a><div id="signIn"><ul><li class="last"><a href="https://www.att.com/esupport/index.jsp?App_ID=PBY" target="_top">AT&amp;T Support</a></li></ul></div></div>');

    //$('#footerFrame').remove();
    //$('#pageWrap').after('<div id="footer" />');
    $('#footer').html('<div class="footerWrap"><ul><li class="first"><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.support&redirecturl=https://www.att.com/esupport/index.jsp?App_ID=PBY">AT&amp;T Support</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.adinfo&redirecturl=http://www.att.net/legal/advertising" target="_top">Advertise with Us</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.TOS&redirecturl=http://www.att.com/shop/internet/att-internet-terms-of-service.jsp" target="_blank">Terms of Service</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.copyright&redirecturl=http://info.yahoo.com/copyright/details.html" target="_top">Copyright</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.privacy&redirecturl=http://att.yahoo.com/privacy" target="_top">Privacy Policy</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.aboutourads&redirecturl=http://info.yahoo.com/privacy/us/yahoo/attandyahoo/adchoices.html" target="_top">About Our Ads</a></li><li class="last"><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.AUP&redirecturl=http://www.corp.att.com/aup/" target="_top">Acceptable Use Policy</a></li></ul><p><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.IP&redirecturl=http://www.att.com/gen/privacy-policy?pid=2587" target="_top">Copyright &copy; 2015 AT&amp;T Intellectual Property</a>. All rights reserved. AT&amp;T and the AT&amp;T logo are trademarks of AT&amp;T Intellectual Property.</p></div>');

    $('#qAns1').html('<div class="overContent"><h3>Sign in tips</h3><p>You can log in with your AT&amp;T Email Address (Username@att.net) or User ID:</p><p>username@ameritech.net<br />username@att.net<br />username@bellsouth.net<br />username@flash.net<br />username@nvbell.net<br />username@pacbell.net<br />username@prodigy.net<br />username@sbcglobal.net<br />username@snet.net<br />username@swbell.net<br />username@wans.net</p><!--<a href="#" class="close">Close</a>--></div>');

    $('#qAns2').html('<div class="overContent"><h3>What does "Keep me signed in" mean?</h3><p> Many of our users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net and Mail. By checking  this new box you\'ll stay signed in for up to 2 weeks or until you sign out. You\'ll get easier access to your mail, photos, music, and all your other stuff, even if you close your browser or shut down your computer.</p> <p>To protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&T services.</p> <h3>What if I\'m on a computer that I share with others?</h3> <p>If you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box.</p> <p>This checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer.</p> <p>You can change the length of time you remain signed in to att.net and Mail, once you are signed in, by clicking on the "My Account" link at the top of most of the att.net pages. Go to the "Member Information" section to change the frequency whereby AT&amp;T will prompt you for your password. If you do so, AT&amp;T will ask you to verify your password more frequently, although your sign-in screen will indicate every "two weeks".</p> <p>If you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.</p><!--<a href="#" class="close">Close</a>--></div>');

    $('#overLayCheck').html('<h3>You have chosen to stay signed in for 2 weeks. What does this mean?</h3><p>Many of our AT&amp;T users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net. By checking this new box, you\'ll stay signed in for up to 2 weeks or until you sign out. To protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&amp;T services.</p><p>If you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box.</p> <p>This checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer.</p><p>If you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.</p><ul class="btnSignIn"><li><button id="btnKeepMe" class="btnLong" onClick="chkTick()">Keep Me Signed In</button></li><li><button id="btnSignIn" class="btnLong" onClick="unchkTick()">Sign Me In, but I don\'t want to stay Signed In for 2 weeks</button></li></ul><div class="clrAll"></div>');

    // Set variables for Alert Messages for use on iPhone/iPod
    var qAns1 = 'Sign in tips \r \nYou can log in with your AT&T Email Account: (username@att.net) \r \nusername@ameritech.net \nusername@att.net \nusername@bellsouth.net \nusername@flash.net \nusername@nvbell.net \nusername@pacbell.net \nusername@prodigy.net \nusername@sbcglobal.net \nusername@snet.net \nusername@swbell.net \nusername@wans.net';

    var qAns2 = 'What does "Keep me signed in" mean? \r \nMany of our users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net and Mail. By checking this new box you\'ll stay signed in for up to 2 weeks or until you sign out. You\'ll get easier access to your mail, photos, music, and all your other stuff, even if you close your browser or shut down your computer. \r \nTo protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&T services. \r \nWhat if I\'m on a computer that I share with others? \r \nIf you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box. \r \nThis checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer. \r \nYou can change the length of time you remain signed in to att.net and Mail, once you are signed in, by clicking on the "My Account" link at the top of most of the att.net pages. Go to the "Member Information" section to change the frequency whereby AT&T will prompt you for your password. If you do so, AT&T will ask you to verify your password more frequently, although your sign-in screen will indicate every "two weeks". \r \nIf you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.';

    
    //$('#qAns1 .overContent').width(275);
    //$('#qAns2 .overContent').width(590);
        
    q1Zidx = $('#ques1').css('z-index');
    q2Zidx = $('#ques2').css('z-index');

    // Add anchor for tooltip icons
    $('#ques1').prepend('<a href="#" class="tip" title="Sign In Tips">Sign In Tips</a>');
    $('#ques2').prepend('<a href="#" class="tip" title="Additional Information about Keep Me Signed In">Additional Information about Keep Me Signed In</a>');


    //FORGOT PASSWORD URL CHANGES START:	
	 var ORIGINATION_POINT_URL = "tGuard";
	 //var ORIGINATION_POINT_URL = document.referrer;
    var RETURN_URL = window.location;
    var CANCEL_URL = document.referrer;
	
	//Commenting this out as per request from sa271s 07/15
    /*if (ORIGINATION_POINT_URL.search("cprod") > 0) {
        ORIGINATION_POINT_URL = "http://www.att.net";
        CANCEL_URL = "http://www.att.net";
    }*/
    RETURN_URL = decodeURIComponent(RETURN_URL);

    var strHostName = "HOSTNAME";
    var Result1 = RETURN_URL.search(strHostName);
    var Result2 = RETURN_URL.search("&AUTHNLEVEL");
    if (Result1 > 0 && Result2 > 0) {

        var Result3 = RETURN_URL.substring(Result1 + (strHostName.length + 1), Result2);
        var str_URL = "URL";
        Result1 = RETURN_URL.search(str_URL);
        Result2 = RETURN_URL.search("tucd");
        if (Result1 > 0 && Result2 > 0) {
            var Result4 = RETURN_URL.substring(Result1 + (str_URL.length + 1), Result2 - 1);
            RETURN_URL = "https://" + Result3 + Result4;
        }
        else {
            RETURN_URL = "https://loginprodx.att.net/FIM/sps/ATTidp/saml20/logininitial?RequestBinding=HTTPPost&PartnerId=https://login.yahoo.com/saml/2.0/att&Target=http%3a//att.yahoo.com/%3f.lts=1384544028?redirect=true";
        }
    }
    else {
        RETURN_URL = "https://loginprodx.att.net/FIM/sps/ATTidp/saml20/logininitial?RequestBinding=HTTPPost&PartnerId=https://login.yahoo.com/saml/2.0/att&Target=http%3a//att.yahoo.com/%3f.lts=1384544028?redirect=true";
    }
   if (yahPidLoc > 0) {
        RETURN_URL += "&" + yahPartnerId;

    }
	//added below coding to  remove pkmsvouchfor?ATT from targetUrl(14Jul2015) as per request from sa271s
	var newUrl;
	var tUrl;
	if (typeof document.getElementsByName("targetURL")[0] != 'undefined')
	{
		tUrl = document.getElementsByName('targetURL')[0].value;
	}
	else
	{
		tUrl="http://www.att.net";
	}

	if(tUrl.indexOf("pkmsvouchfor?ATT") > 0)
	{
		newUrl = "https://cprodx.att.net"+tUrl;
	}
	else
	{
		newUrl = tUrl;
	}
	//As per request from sa271s modified to get targetURL to make the Return_URL and CANCEL_URL point to the same targetURL(10-Jul-2015)

	RETURN_URL = newUrl;
	CANCEL_URL = newUrl;

    // Return_URL format (from login page URL): "https://" + @HOSTNAME (till &AUTHNLEVEL) + &URL (till &REFERER)
    $('#fgtPwd').attr('href', "https://www.att.com/olam/unauth/fpwdEnterUserId.myworld?origination_point=" + ORIGINATION_POINT_URL + "&Return_URL=" + RETURN_URL + "&Cancel_URL=" + CANCEL_URL);

	// Adding Forgot Email url (04/2014)
    $('#fgtEml').attr('href', "https://www.att.com/olam/unauth/enterEmailForgotId.myworld?origination_point=" + ORIGINATION_POINT_URL + "&Return_URL=" + RETURN_URL + "&Cancel_URL=" + CANCEL_URL);
	//error page
	$('.fgtEml > a').attr("href","https://www.att.com/olam/unauth/enterEmailForgotId.myworld?origination_point=" + ORIGINATION_POINT_URL + "&Return_URL=" + RETURN_URL + "&Cancel_URL=" + CANCEL_URL);
	
	$('.fgtPwd > a').attr("href","https://www.att.com/olam/unauth/fpwdEnterUserId.myworld?origination_point=" + ORIGINATION_POINT_URL + "&Return_URL=" + RETURN_URL + "&Cancel_URL=" + CANCEL_URL);

    //FORGOT PASSWORD URL CHANGES END;

    // IE DETECTION FOR CSS PIE
    if ($.browser.msie) {
        var ieVer = parseInt($.browser.version, 10);
        if (ieVer < 9) {
            // ADD CSS PIE JS TO THE DOM
            $.getScript('https://home.secureapp.att.net/js/pie/1.0b4/pie.js', function() {
                if (window.PIE) {
                    $('#LoginForm, #LoginForm ul.uLogin li input.loginBtn, #loginWrap #LoginForm .overContent, #err, #simplemodal-container, .loginBtnClear, .loginBtnYah').each(function() {
                        PIE.attach(this);
                    });
                }
            });
        }
    }


    // in app experience

    // Possible match for IE UA while excluding FF:
    // !!agent.match(/^(.(?!Firefox))*$/i) - returns false if Firefox is in the UA
    // !!agent.match(/Mozilla/i); - True if Mozilla in UA

    
    if (getWindowWidth() < 685 ) {// reposition/resize question popups for small windows
        
        //$('#qAns1 .overContent').css('width','250px');
        //$('#qAns1').css('right','250px');
        //$('#qAns1 .close').css('left','250px');

        //$('#qAns2 .overContent').css('width','350px');
        //$('#qAns2').css({'right':'300px','top':'-250px'});
        //$('#qAns2 .close').css('left','350px');
        
        setIns_mobile();       
    } else {
        setIns_desktop();
    }

    if (!!agent.match(/iPad/i)) {
        resetForMobile();
        //For form sheet modal need to reset the meta tag
        //if (window.innerWidth < 560) {
        if (getWindowWidth() < 560) {
            $('meta[name=viewport]').attr('content', 'width=100%');
        }
    } else if (!!agent.match(/Android/i) /*|| !!agent.match(/MSIE/i)*/ || !!agent.match(/Trident/i)) {
        //if (window.innerWidth < 685) {
        if (getWindowWidth() < 685) {
            resetForMobile();
        }
    }

    function resetForMobile() {
        $('head').append('<link rel="stylesheet" href="https://home.secureapp.att.net/css/sso/slid/1201/mobile.css" type="text/css" />');
        $('#loginWrap').css('background:#eee');
        setIns_mobile();
    
    }
    

    function setIns_mobile() {
        $('.instructions-mobile').css('display','block');
        $('.instructions-desktop').css('display','none');
    }
    function setIns_desktop() {
        $('.instructions-mobile').css('display','none');
        $('.instructions-desktop').css('display','block');
    }

    function gup(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return results[1];
    }

    function getAndroidVersion(ua) {// yes, this is lifted directly from SO.
         var ua = ua || navigator.userAgent; 
        var match = ua.match(/Android\s([0-9\.]*)/);
        return match ? match[1] : false;
    }

    // DEVICE DETECTION
    //if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i) || !!agent.match(/Android/i)) {
    if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i)) {
        //alert("agent: " + parseInt(getAndroidVersion(agent)));
        $('#ques1').click(function(e) {
            e.preventDefault();

            if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i) || !!(parseInt(getAndroidVersion(agent)) <= 4)) {
                alert(qAns1);
            } else {
                $('#LoginForm li#uID').css('z-index', '990');
                $('#ques1 .qAns .overContent').width('90%');
                $(this).children('.qAns').modal({
                    minHeight: 225, overlayClose: true, opacity: 0, position: ['25%', null]
                });
            }
        });
        $('#ques2').click(function(e) {
            e.preventDefault();
            if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i) || !!(parseInt(getAndroidVersion(agent)) <= 4)
                ) {
                alert(qAns2);
            } else {
                $('#ques2 .qAns .overContent').width('100%');
                $(this).children('.qAns').modal({
                    minHeight: 560, overlayClose: true, opacity: 0, position: ['5%', null]
                });
            }
        });

    } else {
        // Pull Index via ajax
        //$('#pageWrap #promo').load('https://secureapp.stage.att.net/attportal/s/s.dll?spage=/design/cdls10/sso/loginad.htm&nohtmtags=1&only=y');
        var nocache = Math.ceil(10000 * Math.random());
        $('.quesIcon').find('a.tip').click(function(e) {
            
            e.preventDefault();
           if ($.browser.msie) {
                var ieVer = parseInt($.browser.version, 10);
                if (ieVer == 7) {
                    if ($(this).parent().attr('id') == 'ques2') {
                        $('#LoginForm li#uID, #LoginForm li#uPwd').css('visibility', 'hidden');
                    }
                }
            }
            var thisAnsId = $(this).parent().children('.qAns').attr('id');

            // Create a new container class for these popups rather than using default. Will move
            // these dimension declarations into class definitions instead  
            //alert("height: " + windowHeight);
            $("#" + thisAnsId).modal({
                containerId: thisAnsId + "_modal-container",
                position: [25],
                closeHTML: '<a href="#" class="modalCloseImg">Close</a>',
                opacity: 0,
                overlayClose: true,
                onOpen: function (dialog) {
                    openLoginModals(dialog);
                },
                onClose: function(dialog) {
                    closeLoginModals(dialog);
                }
            });
            /*
            $(this).parent().children('.qAns').css('display','block');
            if (getWindowWidth() < 685 && $(this).parent().attr('id') == 'ques1') {
                $('#ques2').css('z-index',-1000);
            } else if (getWindowWidth() < 685 && $(this).parent().attr('id') == 'ques2') {
                $('#ques1').css('z-index',-1000);
            }
            */
        });

        $('.overContent').find('a.close').click(function(e) {

            e.preventDefault();

            $(this).parents('.qAns').fadeOut(function() {
                if (getWindowWidth() < 685) {
                    $('#ques1').css('z-index',q1Zidx);
                    $('#ques2').css('z-index',q2Zidx);
                }

            });
            if ($.browser.msie) {
                var ieVer = parseInt($.browser.version, 10);
                if (ieVer == 7) {
                    $('#LoginForm li#uID, #LoginForm li#uPwd').css('visibility', 'visible');
                }
            }

            
        });

    }

    $(document).bind('keyup', function(e) {
        if (e.keyCode === 27) { // ESC
            $('.qAns').fadeOut();
            $('#LoginForm li#uID, #LoginForm li#uPwd').css('visibility', 'visible');
        }
    });

    $('#nameBox').focus();

    $('#submitLogin').click(function() {
        
        submitForm(defaultUname,defaultPwd);
        return false;
    });

});


function setRegURL(urlhost){
	if (urlhost == 'entertainment.att.net'|| urlhost == 'uverseonline.att.net')
		document.getElementById("regurl").href = "https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.Register.Pageviews."+urlhost.replace(/\./g,"-")+"&redirecturl=https://attreg.att.net/PortalRegWeb/PortalRegController?callingAppId=MEA&returnUrl=http%3A%2F%2Fwww.att.net%2Fglobalssosignin%3Frd%3Dhttp%253A%252F%252Fuverseonline.att.net%252Fregistration";
	else if (urlhost == 'games.att.oberon-media.com' || urlhost == 'games.att.net' || urlhost == 'auth.games.att.net')
		document.getElementById("regurl").href = "https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.Register.Pageviews."+urlhost.replace(/\./g,"-")+"&redirecturl=https://attreg.att.net/PortalRegWeb/PortalRegController?callingAppId=Gaming&returnUrl=http%3A%2F%2Fgames.att.net";
	else
		document.getElementById("regurl").href = "https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.Register.Pageviews."+urlhost.replace(/\./g,"-")+"&redirecturl=https://attreg.att.net/PortalRegWeb/PortalRegController?callingAppId=OP&returnUrl=";
}

function logPgvw(){
	if(document.getElementById("lognp")) {
	var local = 'http://www.att.net';
	var referringURL = 'http://www.att.net';
		
		if (document.referrer != ""){
			referringURL = document.referrer;
		}
		
		var sind = referringURL.indexOf("://");
		var eind = 0;
		if (sind != -1)
			eind = (referringURL.substring(sind+3, referringURL.length)).indexOf("/");
		if (eind == -1)
			eind = referringURL.length;
		eind = eind + sind + 3;
		local = referringURL.substring(sind+3, eind);
		
	var src = '<img width="1" height="1" alt="" src="https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.signIn.Pageviews.'+local.replace(/\./g,"-")+'&redirecturl=/i/s.gif?nocache='+Math.ceil(10000*Math.random())+'"/>';
		document.getElementById("lognp").innerHTML = src;
		
		setRegURL(local);
	} 
}

function refer(){
	if (document.referrer != "") {
		var referringURL = document.referrer;
		var local = 'http://www.att.net';
		var sind = referringURL.indexOf("://");
		var eind = 0;
		if (sind != -1)
			eind = (referringURL.substring(sind+3, referringURL.length)).indexOf("/");
			
		if (eind == -1)
			eind = referringURL.length;
			
		eind = eind + sind + 3;
		local = referringURL.substring(sind+3, eind);
		if (local == 'games.att.oberon-media.com'){
			location.href = 'http://games.att.oberon-media.com';
		}
		else if (local == 'http://games.att.net'){
			location.href = 'http://games.att.net';
		}
		else if (local == 'auth.games.att.net'){
			location.href = 'http://games.att.net';
		}
		else{
			location.href = document.referrer;
		}
	}	
}

function submitForm(dfltUname, dfltPwd){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var usrName= document.getElementById('nameBox').value;
	var usrPwd= document.getElementById('pwdBox').value;

	usrName = trimAll(usrName);
	usrPwd = trimAll(usrPwd);
   if(usrName == null || usrName.length == 0 || usrName == dfltUname){
		alert("Email is a mandatory field. Please enter your AT&T Email to proceed.");
		document.getElementById("nameBox").focus();
		return false;
	}
	  
	else if(usrPwd == null || usrPwd.length == 0 || usrPwd == dfltPwd){
		alert("Password is a mandatory field. Please enter your password to proceed.");
		document.getElementById("pwdBox").focus();
		return false;
	}
		
	else if(document.getElementById('rememberID').checked == true){
		if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i)) {
			if(confirm('You have chosen to stay signed in for 2 weeks. What does this mean? \r \nMany of our AT&T users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net. By checking this new box, you\'ll stay signed in for up to 2 weeks or until you sign out. To protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&T services. \r \nIf you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box. \r \nThis checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer. \r \nIf you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.')){
					document.getElementById("submitLogin").disabled = true;	
					document.LoginForm.submit();
			}else {
					$('input#rememberID').attr('checked', false);
				}
			
		} else if (!!agent.match(/Android/i)) {
			$(document).ready(function(){
				$('#overLayCheck').modal({
					maxHeight:515, persist:true,  escClose: false, close:false, opacity:0, position:['10%',null], 
					onOpen: function(dialog) {
						dialog.overlay.show(function() {
							dialog.container.show(function () {
								dialog.data.show();
							});
						});
					}
				});
			});
				
		} else {
			$(document).ready(function(){
				$('#overLayCheck').modal({
					escClose: false, close:false, opacity:50, position:['15%',null], 
					onOpen: function(dialog) {
						dialog.overlay.fadeIn('fast',function() {
							dialog.container.slideDown('fast',function () {
								dialog.data.fadeIn('slow');
							});
						});
					}
				});
			});
			
		}
		return false;
	}
	else {
		document.getElementById("submitLogin").disabled = true;	
		document.LoginForm.submit();
	}
}

function trimAll(sString) {
	while (sString.substring(0,1) == ' '){
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' '){
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}

function chkTick(){
	document.getElementById('rememberID').checked = true;
	document.getElementById("overLayCheck").style.display = "none";
	document.LoginForm.submit();
}

function unchkTick(){
	document.getElementById('rememberID').checked = false;
	document.getElementById("overLayCheck").style.display = "none";
	document.LoginForm.submit();
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

function btnChange(){
(document.getElementById('cont')).src = "/img/sso/slid/Cont1.png";
}

function acctSelBtnEnable(){
	document.getElementById('cont').disabled = false;
	document.getElementById('cont').style.color = "#fff";
	document.getElementById('cont').style.backgroundPosition = "0 bottom";
}

function ie6Img(){
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
		var ieversion=new Number(RegExp.$1)
		if (ieversion==6)             
			(document.getElementById('signUp')).src = "/img/sso/slid/IE6/signupToday.png";
		}
}

function getYadContents(){
    $('#yad>img, #yad a>img').each(function(){
        if ($(this).length) $(this).attr('alt','Ad image');// Needed to address CATO problems with missing alt attributes.
    })

    var yadContent = $('#yad div, #yad a').html();
	$('#pageWrap').prepend('<div id="YadWrap"></div>');

	$('#YadWrap').append('<div id="richad"></div>');
	$('#richad').html(yadContent);
	
	if($('#richad>img').length){
		var imgPath = $('#richad>img').attr('src');
		$('#richad>img').hide();
		$('#richad>img').wrap('<a href="'+ $('#yad a').attr('href') +'" target="_blank" />')
		$('#richad>a').css({'display':'block','background':'url('+imgPath+') center 0'}).height(1024);
	}

}

function init(){
	logPgvw();
}

window.onload = function(){
    var ieVer = '';
    if ($.browser.msie) {var ieVer = parseInt($.browser.version, 10);}    
    if ((ieVer == '' || ieVer >= 9) && !agent.match(/iPad/i) && !agent.match(/Android/i)) {
        $('.instructions-desktop').removeAttr('style');
        $('.instructions-mobile').removeAttr('style');
    }
	init();
	getYadContents();
}
