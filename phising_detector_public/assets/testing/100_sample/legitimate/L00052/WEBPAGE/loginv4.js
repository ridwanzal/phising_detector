document.domain = "naver.com";
function $() {
	var ret = [];
	for ( var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] == 'string') {
			ret[ret.length] = document.getElementById(arguments[i]);
		} else {
			ret[ret.length] = arguments[i];
		}
	}
	return ret[1] ? ret : ret[0];
}
function initSmartLevel()
{
	if (getCookie("nid_iplevel"))
	{
		smart_level = getCookie("nid_iplevel");
	}
	else
	{
		smart_level = 1;
		var scriptElement = document.createElement('script');
		scriptElement.setAttribute('src', 'http://static.nid.naver.com/enclogin/ipsec.nhn?callback=setSmartLevel');
		document.getElementsByTagName('head')[0].appendChild(scriptElement);
	}
	$('smart_level').value = smart_level;
	if (smart_level > 0) {
		ipCheckOn(smart_level);
	} else {
		ipCheckOff();
	}
}
function initInputLabel()
{
	var hideIfNotEmpty = function(inputId) {
		var e = $(inputId);
		if (e != null && e.value != "") {
			hideElement('label_' + inputId);
		}
	};

	hideIfNotEmpty("id");
	hideIfNotEmpty("pw");
}
function checkEnt(e) {
	 if (window.event) { // IE
		myKeyCode = event.keyCode;
		myShiftKey = event.shiftKey;
	} else if (e.which) { // netscape ff opera
		myKeyCode = e.which; 
		myShiftKey = isshift;
	}	 
}
function setToFocus(a)
{
	var e = $(a);
	if(e.className.indexOf(" focus") == -1) {
		e.className = e.className + " focus";
	}
	hideElement('label_'+a);
	e.focus();
}
function setToFocusID()
{
	setToFocus("id");
}
function setToFocusPW()
{
	setToFocus("pw");
}
function unsetToFocus(a)
{
	var e = $(a);
	e.className = e.className.replace(" focus", "");

	if ($(a).value.length==0) {
		showElement('label_'+a);
	}
	e.blur();
}
function unsetToFocusID()
{
	unsetToFocus("id");
}
function unsetToFocusPW()
{
	unsetToFocus("pw");
}
function setToFocus_nolabel(a)
{
	var e = $(a);
	if(e.className.indexOf(" focus") == -1) {
		e.className = e.className + " focus";
	}
	e.focus();
}
function setToFocusID_nolabel()
{
	setToFocus_nolabel("id");
}
function setToFocusPW_nolabel()
{
	setToFocus_nolabel("pw");
}
function unsetToFocus_nolabel(a)
{
	var e = $(a);
	e.className = e.className.replace(" focus", "");
	e.blur();
}
function unsetToFocusID_nolabel()
{
	unsetToFocus_nolabel("id");
}
function unsetToFocusPW_nolabel()
{
	unsetToFocus_nolabel("pw");
}
function addInputEvent()
{
	if (is_old_ie())
	{
		_addInputEvent("id", setToFocusID, unsetToFocusID);
		_addInputEvent("pw", setToFocusPW, unsetToFocusPW);
	}
	else
	{
		_addInputEvent("id", setToFocusID_nolabel, unsetToFocusID_nolabel);
		_addInputEvent("pw", setToFocusPW_nolabel, unsetToFocusPW_nolabel);
	}
	try{
		addInputDivEvent();
	}catch (e){}
}
function _addInputEvent(elementId, setToFocusFunc, unsetToFocusFunc)
{
	var element = $(elementId);
	if (element.attachEvent)
	{
		element.attachEvent("onfocus", setToFocusFunc);
		element.attachEvent("onblur", unsetToFocusFunc);
	} else if (element.addEventListener) {
		element.addEventListener("focus", setToFocusFunc, false);
		element.addEventListener("blur", unsetToFocusFunc, false);
	}	
}
function _addInputDivEvent(elementId, method1)
{
	var element = $(elementId);
	if (element.attachEvent)
	{
		element.attachEvent("onclick", method1);
	} else if (element.addEventListener) {
		element.addEventListener("click", method1, false);
	}
}
function addInputDivEvent()
{
	_addInputDivEvent("login_info", disp_login_info_div);
	_addInputDivEvent("login_info_div", hide_login_info_div);
}
function disp_login_info_div()
{
	clearDIValert();
	showElement('login_info_div');
}
function hide_login_info_div()
{
	hideElement('login_info_div');
}
function showElement(nm) {
	try {
		$(nm).style.display = 'block';
	} catch (e) {
	}
}
function hideElement(nm) {
	try {
		$(nm).style.display = 'none';
	} catch (e) {
	}
}
function clearDIValert()
{
	try {
		var containerDivs = $('login_wrap').getElementsByTagName('div');
		for (var i=0, len=containerDivs.length; i < len; i++)
		{
			var isErrorDiv = (containerDivs[i].className.indexOf('error_box') == 0);
			if (isErrorDiv)
			{
				containerDivs[i].style.display = "none";
			}
		}
	} catch (e) {}
}
function savedLong(a) {
	if (a.checked == true) {
		ipCheckOff();
		$("nvlong").value = "1";
		$("lbl_long").className = "lbl_long on";
		clearDIValert();
		showElement("div_chk_long");
	} else {
		$("nvlong").value = "0";
		$("lbl_long").className = "lbl_long";
		hideElement("div_chk_long");
	}
}
function ipCheckOff() {
	var check = $("ckb_type");
	if (check != null) {
		check.checked = false;
	}
	var label = $('lbl_type');
	if (label != null) {
		label.className='lbl_type';
		$('ckb_type').title='IP 보안이 꺼져 있습니다. IP보안을 사용하려면 선택해주세요.';
	}
	setSmartLevel(-1);
	var scriptElement = document.createElement('script');
	scriptElement.setAttribute('src', 'http://static.nid.naver.com/enclogin/ipsec.nhn?callback=setSmartLevel&level=-1');
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
}
function ipCheckOn(level) {
	var check = $("ckb_type");
	if (check != null) {
		check.checked = true;
	}
	$('lbl_type').className='lbl_type on';
	$('ckb_type').title='IP 보안이 켜져 있습니다. IP보안을 사용하지 않으시려면 선택을 해제해주세요.';
	setSmartLevel(level);
	var scriptElement = document.createElement('script');
	scriptElement.setAttribute('src', 'http://static.nid.naver.com/enclogin/ipsec.nhn?callback=setSmartLevel&level='+level);
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
}
/* cookie setting */
function getCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			var end = document.cookie.indexOf(";", j);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(j, end));
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0)
			break;
	}
	return null;
}
smart_level = getCookie("nid_iplevel") ? getCookie("nid_iplevel") : 1;
function ipCheck(a,e) {
	if (a.checked == true) {
		ipCheckOn(1);
		try { if ( loginNClicks.installed ) { parent.clickcr(a, 'log_off.iponset', '', '', e); }} catch(e) {}
	} else {
		ipCheckOff();
		try { if (loginNClicks.installed ) { parent.clickcr(a, 'log_off.ipoffset', '', '', e); }} catch(e) {}
	}
}
function msieblur(a)
{
	if ( ( navigator.userAgent.indexOf("MSIE 7") != -1 ) || ( navigator.userAgent.indexOf("MSIE 8") != -1 ) ) {
		try{
			a.blur();
		}catch(e){}
	}
}
function is_old_ie() //IE 6,7,8,9
{
	if ( ( navigator.userAgent.indexOf("MSIE 6") != -1 ) || ( navigator.userAgent.indexOf("MSIE 7") != -1 ) || ( navigator.userAgent.indexOf("MSIE 8") != -1 ) || ( navigator.userAgent.indexOf("MSIE 9") != -1 ))
	{
		return true;
	}
	else
	{
		return false;
	}
}
function setSmartLevel(level) {
	$('smart_level').value = level;
	var today = new Date();
	var expire = new Date(today.getTime() + 60 * 60 * 24 * 365 * 1000);
	var curCookie = "nid_iplevel=" + escape(level) + "; path=/; domain=.naver.com;";
	document.cookie = curCookie;
	if (level == -1)
	{
		var check = $("ckb_type");
		if (check != null) {
			check.checked = false;
		}
		var label = $('lbl_type');
		if (label != null) {
			label.className='lbl_type';
			$('ckb_type').title='IP 보안이 꺼져 있습니다. IP보안을 사용하려면 선택해주세요.';
		}
	}
}
var getkeyurl = '/enclogin/keys.nhn';
var curtimecheck = 0;
var ajaxavail = -1;
var keystr = null;
var keys = null;
var sessionkey = null;
var keyname = null;
var evalue = null;
var nvalue = null;
var isshift = false;
var userStrokes = false;
var is_capslockon=false;
function capslockevt(e) {
	userStrokes = true;
	var myKeyCode = 0;
	var myShiftKey = false;
	if (window.event) { // IE
		myKeyCode = event.keyCode;
		myShiftKey = event.shiftKey;
	} else if (e.which) { // netscape ff opera
		myKeyCode = e.which; // myShiftKey=( myKeyCode == 16 ) ? true :
								// false;
		myShiftKey = isshift;
	}
	if ((myKeyCode >= 65 && myKeyCode <= 90) && !myShiftKey) {
		is_capslockon=true;
		showElement('div_capslock');
		setTimeout("hideElement('div_capslock')",3000);
	} else if ((myKeyCode >= 97 && myKeyCode <= 122) && myShiftKey) {
		is_capslockon=true;
		showElement('div_capslock');
		setTimeout("hideElement('div_capslock')",3000);
	} else {
		is_capslockon=false;
		setTimeout("hideElement('div_capslock')",1500);
	}
}
function getKey() {
	getKeysv3();
}
function getKeysv2()
{
	useHtml();
	getKeysv3();
}
function getKeysv3() {
	var a = new Date();
	if (curtimecheck == 0) {
		getAjaxResult(getkeyurl);
		curtimecheck = a.getTime();
	} else {
		if (a.getTime() - curtimecheck > 60000) {
			curtimecheck = a.getTime();
			getAjaxResult(getkeyurl);
		} else {
			if (loadFlash)
			{
				curtimecheck = a.getTime();
				getAjaxResult(getkeyurl);
			}
		}
	}
}
function login(keyData) {
	fkeys = keyData.split(",");
	if (!fkeys || !fkeys[0] || !fkeys[1] || fkeys[0]=='null' || fkeys[0]=='undefined' || fkeys[1]=='null' || fkeys[1]=='undefined') {
		getKeyByRuntimeInclude();
		return false;
	}
	$('encpw').value = fkeys[1];
	$('encnm').value = fkeys[0];
	$('enctp').value = 2;
	$('id').value = "";
	$('pw').value = "";
	$('frmNIDLogin').submit();
}
function getAjaxResult(urls) {
	try {
var scriptElement = document.createElement('script');
scriptElement.setAttribute('src', 'http://static.nid.naver.com/enclogin/keys_json.nhn?callback=keySetting');
document.getElementsByTagName('head')[0].appendChild(scriptElement);
/*
		var xmlhttp = getXmlHttp();
		xmlhttp.open("GET", urls);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				keystr = xmlhttp.responseText
				if (loadFlash)
				{
					keySetting(keystr);
				}
			}
		}
		xmlhttp.send(null);
*/
	} catch (e) {
		if (window.bridgeGotTime) {
			throw e;
		} else {
			// page reload?
		}
	}
}
function checkShiftUp(e) {
	if (!window.event && e.which && e.which == 16) {
		isshift = false;
	}
}
function checkShiftDown(e) {
	var down_keyCode=0;
	if (!window.event && e.which && e.which == 16) {
		isshift = true;
	}
	if (window.event) {
		down_keyCode = event.keyCode;
	}
	else if (e.which) {
		down_keyCode = e.which;
	}
	if (down_keyCode && down_keyCode == 20) {
		if (!is_capslockon)
		{
			is_capslockon=true;
			showElement('div_capslock');
			setTimeout("hideElement('div_capslock')",1500);
		}
		else
		{
			is_capslockon=false;
			hideElement('div_capslock');
		}
	}
}
function getXmlHttp() {
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
function getLenChar(texts) {
	texts = texts + '';
	return String.fromCharCode(texts.length);
}
function keySplit() {
	if (!keystr) {
	return false;
	}
	keys = keystr.split(",");
	if (!keystr || !keys[0] || !keys[1] || !keys[2] || !keys[3]) {
		//alert('키 발급 실패 ');
		return false;
	}
	sessionkey = keys[0];
	keyname = keys[1];
	evalue = keys[2];
	nvalue = keys[3];
	$('encnm').value = keyname;
	return true;
}
function confirm_submit()
{
	if (loadFlash)
	{
		loginClick();
		return false;
	}
	else
	{
		if ($('id').value == "") {
			clearDIValert();
			$('id').focus();
			return false;
		} else if ($('pw').value == "") {
			clearDIValert();
			$('pw').focus();
			return false;
		}
		return encrypt_idpw();
	}
}
function encrypt_idpw()
{
	var rsa = new RSAKey();
	if (keySplit()) {
		rsa.setPublic(evalue, nvalue);
		$('encpw').value = rsa.encrypt(getLenChar(sessionkey) + sessionkey
				+ getLenChar($('id').value) + $('id').value
				+ getLenChar($('pw').value) + $('pw').value);
		$('pw').value = "";
		$('id').value = "";
	} else {
		getKeyByRuntimeInclude();
		return false;
	}

	return true;
}
function getKeyByRuntimeInclude() {
	try {
		var keyjs  = document.createElement('script');
		keyjs.type = 'text/javascript';
		keyjs.src = 'http://static.nid.naver.com/loginv3/js/keys_js.nhn';
		document.getElementsByTagName('head')[0].appendChild(keyjs);
	} catch (e) {
		alert(e);
	}
}
//flash 
loadFlash = false;
loadFail = false;
function loadComplete() {
	if ( isFlashSupportBrowser() )
	{
		if (loadFail == false)
		{
			loadFlash = true;
		}
	}
}
function showMsg(a) {
}
function loginID(a) {
	try {
		$("id").value = a
	} catch (b) {
	}
}
function capslock() {
	showElement('div_capslock2');
	setTimeout("hideElement('div_capslock2')", 3000);
}
function inputError(a) {
	if (a == "idNull") {
		//focusID()
	} else {
		if (a == "pwNull") {
		}
	}
}
function keySetting(a) {
	try {
		if (loadFlash) {
			findSwf("flashlogin").keySetting(a);
		}
	} catch (b) {
	}
}
function loginClick() {
if (loadFlash)
{
	try {
		window.focus();
		findSwf("flashlogin").focus();
		findSwf("flashlogin").loginCheck();
	} catch (a) {
	}
}
}
function findSwf(a) {
	return fc_isIE ? document.getElementById(a) : document[a]
}
function isFlashSupportBrowser() {
	var notSupport = ["MSIE 10", "Android", "AppleWebKit", "iPad","iPhone", "iPod", "Firefox", "Linux", "linux", "BlackBerry"];
	var ua = navigator.userAgent;

	for (var i=0, len=notSupport.length; i < len; i++) {
		if (ua.indexOf(notSupport[i]) != -1) {
			return false;
		}
	}

	isMSIE11 = ((ua.indexOf("Trident/7.0") != -1) && (ua.indexOf("rv:11") != -1));
	if (isMSIE11) {
		return false;
	}

	return true;
}
function checkFlashLoad(a) {
	if (!isFlashSupportBrowser()) {
		useHtml();
	}
	else
	{
		a++;
		if (!loadFlash) {
			if (a > 10) {
				useHtml();
				loadFail = true;
			} else {
				setTimeout("checkFlashLoad(" + a + ")", 100)
			}
		}
	}
}
function useHtml()
{
	if (navigator.userAgent.indexOf("Chrome") != -1)
	{
		$("flasharea").style.visibility = "hidden";
		$("flashlogin").style.display = "none";
		$("flasharea").innerHTML="<div style='width:105px;height:49px;'>&nbsp;</div>";
	}
	else
	{
		try {
		$("flasharea").style.visibility = "hidden";
		$("flashlogin").style.visibility = "hidden";
		} catch (e){}
	}
	showElement('htmlarea');
	loadFlash = false;
	$("enctp").value = 1;
}
function useFlash()
{
	hideElement('htmlarea');
	$("flasharea").style.visibility = "visible";
	$("flashlogin").style.visibility = "visible";
	loadFlash = true;
	$("enctp").value = 2;
}
function setBackGround() {
	return "";
}
function setIdTextField() {
	if (typeof flashIdTextFieldParams != "undefined" && flashIdTextFieldParams != null && flashIdTextFieldParams != "") {
		return flashIdTextFieldParams;
	}
	
	var flashArea = $('flasharea');

	var idX, idY, idWidth, idHeigh, idMaxChars, idTextDefault, idTextFont, idBoldTag, idTextColor, idTextSize
	, idBgColor, idChangeBGColor, idBorderSize, idBorderColor, idBorderFocusColor, idActualText, idTextYOffset;

	idX = "0";
	idY = "0";
	idWidth = (flashArea.offsetWidth - 1) + "";
	idHeight = "26";
	idMaxChars = "41";
	idTextDefault = "http://img.naver.net/static/common/login/bg_login_id_main_6.gif";
	idTextFont = "dotum";
	idBoldTag = "";
	idTextColor = "444444";
	idTextSize = "12";
	idBgColor = "ffffff"
	idChangeBGColor = "feffcc";
	idBorderSize = "1";
	idBorderColor = "bebebe";
	idBorderFocusColor = "bebebe";
	idActualText = "아이디";
	idTextYOffset = "";

	var params = [idX, idY, idWidth, idHeight, idMaxChars, idTextDefault, idTextFont,
			idBoldTag, idTextColor, idTextSize, idBgColor,  idChangeBGColor, idBorderSize,
			idBorderColor, idBorderFocusColor, idActualText, idTextYOffset].join(",");

	return params;
}
function setPwTextField() {
	if (typeof flashPwTextFieldParams != "undefined" && flashPwTextFieldParams != null && flashPwTextFieldParams != "") {
		return flashPwTextFieldParams;
	}

	var flashArea = $('flasharea');
	var pwX, pwY, pwWidth, pwHeight, pwMaxChars, pwTextDefault, pwTextFont, pwBoldTag, pwTextColor, pwTextSize,
		pwBgColor, pwChangeBGColor, pwBorderSize, pwBorderColor, pwBorderFocusColor, pwActualText;

	pwX = "0";
	pwY = "27";
	pwWidth = (flashArea.offsetWidth - 1) + "";
	pwHeight = "26";
	pwMaxChars = "16";
	pwTextDefault = "http://img.naver.net/static/common/login/bg_login_pw_main_6.gif";
	pwTextFont = "dotum";
	pwBoldTag = "";
	pwTextColor = "444444";
	pwTextSize = "12";
	pwBgColor = "ffffff";
	pwChangeBGColor = "feffcc";
	pwBorderSize = "1";
	pwBorderColor = "bebebe";
	pwBorderFocusColor = "bebebe";
	pwActualText = "비밀번호";	

	var params = [pwX, pwY, pwWidth, pwHeight, pwMaxChars, pwTextDefault, pwTextFont,
			pwBoldTag, pwTextColor, pwTextSize, pwBgColor, pwChangeBGColor, pwBorderSize,
			pwBorderColor, pwBorderFocusColor, pwActualText].join(",");

	return params;
}
function setUserStroke() {
	try {
		parent.window.ac.acHideAct()
	} catch (a) {
	}
	userStrokes = true
}
function checkUserStroke() {
	return userStrokes
}
function checkRelease() {
	try {
		if ($("enctp").value == 1) {
			$("id").Blur();
			$("pw").Blur()
		}
	} catch (a) {
	}
}
var dbits;
var canary = 244837814094590;
var j_lm = ((canary & 16777215) == 15715070);
function BigInteger(e, d, f) {
	if (e != null) {
		if ("number" == typeof e) {
			this.fromNumber(e, d, f)
		} else {
			if (d == null && "string" != typeof e) {
				this.fromString(e, 256)
			} else {
				this.fromString(e, d)
			}
		}
	}
}
function nbi() {
	return new BigInteger(null)
}
function am1(f, a, b, e, h, g) {
	while (--g >= 0) {
		var d = a * this[f++] + b[e] + h;
		h = Math.floor(d / 67108864);
		b[e++] = d & 67108863
	}
	return h
}
function am2(f, q, r, e, o, a) {
	var k = q & 32767, p = q >> 15;
	while (--a >= 0) {
		var d = this[f] & 32767;
		var g = this[f++] >> 15;
		var b = p * d + g * k;
		d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);
		o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);
		r[e++] = d & 1073741823
	}
	return o
}
function am3(f, q, r, e, o, a) {
	var k = q & 16383, p = q >> 14;
	while (--a >= 0) {
		var d = this[f] & 16383;
		var g = this[f++] >> 14;
		var b = p * d + g * k;
		d = k * d + ((b & 16383) << 14) + r[e] + o;
		o = (d >> 28) + (b >> 14) + p * g;
		r[e++] = d & 268435455
	}
	return o
}
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
	BigInteger.prototype.am = am2;
	dbits = 30
} else {
	if (j_lm && (navigator.appName != "Netscape")) {
		BigInteger.prototype.am = am1;
		dbits = 26
	} else {
		BigInteger.prototype.am = am3;
		dbits = 28
	}
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
	BI_RC[rr++] = vv
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
	BI_RC[rr++] = vv
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
	BI_RC[rr++] = vv
}
function int2char(a) {
	return BI_RM.charAt(a)
}
function intAt(b, a) {
	var d = BI_RC[b.charCodeAt(a)];
	return (d == null) ? -1 : d
}
function bnpCopyTo(b) {
	for ( var a = this.t - 1; a >= 0; --a) {
		b[a] = this[a]
	}
	b.t = this.t;
	b.s = this.s
}
function bnpFromInt(a) {
	this.t = 1;
	this.s = (a < 0) ? -1 : 0;
	if (a > 0) {
		this[0] = a
	} else {
		if (a < -1) {
			this[0] = a + DV
		} else {
			this.t = 0
		}
	}
}
function nbv(a) {
	var b = nbi();
	b.fromInt(a);
	return b
}
function bnpFromString(h, c) {
	var e;
	if (c == 16) {
		e = 4
	} else {
		if (c == 8) {
			e = 3
		} else {
			if (c == 256) {
				e = 8
			} else {
				if (c == 2) {
					e = 1
				} else {
					if (c == 32) {
						e = 5
					} else {
						if (c == 4) {
							e = 2
						} else {
							this.fromRadix(h, c);
							return
						}
					}
				}
			}
		}
	}
	this.t = 0;
	this.s = 0;
	var g = h.length, d = false, f = 0;
	while (--g >= 0) {
		var a = (e == 8) ? h[g] & 255 : intAt(h, g);
		if (a < 0) {
			if (h.charAt(g) == "-") {
				d = true
			}
			continue
		}
		d = false;
		if (f == 0) {
			this[this.t++] = a
		} else {
			if (f + e > this.DB) {
				this[this.t - 1] |= (a & ((1 << (this.DB - f)) - 1)) << f;
				this[this.t++] = (a >> (this.DB - f))
			} else {
				this[this.t - 1] |= a << f
			}
		}
		f += e;
		if (f >= this.DB) {
			f -= this.DB
		}
	}
	if (e == 8 && (h[0] & 128) != 0) {
		this.s = -1;
		if (f > 0) {
			this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f
		}
	}
	this.clamp();
	if (d) {
		BigInteger.ZERO.subTo(this, this)
	}
}
function bnpClamp() {
	var a = this.s & this.DM;
	while (this.t > 0 && this[this.t - 1] == a) {
		--this.t
	}
}
function bnToString(c) {
	if (this.s < 0) {
		return "-" + this.negate().toString(c)
	}
	var e;
	if (c == 16) {
		e = 4
	} else {
		if (c == 8) {
			e = 3
		} else {
			if (c == 2) {
				e = 1
			} else {
				if (c == 32) {
					e = 5
				} else {
					if (c == 4) {
						e = 2
					} else {
						return this.toRadix(c)
					}
				}
			}
		}
	}
	var g = (1 << e) - 1, l, a = false, h = "", f = this.t;
	var j = this.DB - (f * this.DB) % e;
	if (f-- > 0) {
		if (j < this.DB && (l = this[f] >> j) > 0) {
			a = true;
			h = int2char(l)
		}
		while (f >= 0) {
			if (j < e) {
				l = (this[f] & ((1 << j) - 1)) << (e - j);
				l |= this[--f] >> (j += this.DB - e)
			} else {
				l = (this[f] >> (j -= e)) & g;
				if (j <= 0) {
					j += this.DB;
					--f
				}
			}
			if (l > 0) {
				a = true
			}
			if (a) {
				h += int2char(l)
			}
		}
	}
	return a ? h : "0"
}
function bnNegate() {
	var a = nbi();
	BigInteger.ZERO.subTo(this, a);
	return a
}
function bnAbs() {
	return (this.s < 0) ? this.negate() : this
}
function bnCompareTo(b) {
	var d = this.s - b.s;
	if (d != 0) {
		return d
	}
	var c = this.t;
	d = c - b.t;
	if (d != 0) {
		return d
	}
	while (--c >= 0) {
		if ((d = this[c] - b[c]) != 0) {
			return d
		}
	}
	return 0
}
function nbits(a) {
	var c = 1, b;
	if ((b = a >>> 16) != 0) {
		a = b;
		c += 16
	}
	if ((b = a >> 8) != 0) {
		a = b;
		c += 8
	}
	if ((b = a >> 4) != 0) {
		a = b;
		c += 4
	}
	if ((b = a >> 2) != 0) {
		a = b;
		c += 2
	}
	if ((b = a >> 1) != 0) {
		a = b;
		c += 1
	}
	return c
}
function bnBitLength() {
	if (this.t <= 0) {
		return 0
	}
	return this.DB * (this.t - 1)
			+ nbits(this[this.t - 1] ^ (this.s & this.DM))
}
function bnpDLShiftTo(c, b) {
	var a;
	for (a = this.t - 1; a >= 0; --a) {
		b[a + c] = this[a]
	}
	for (a = c - 1; a >= 0; --a) {
		b[a] = 0
	}
	b.t = this.t + c;
	b.s = this.s
}
function bnpDRShiftTo(c, b) {
	for ( var a = c; a < this.t; ++a) {
		b[a - c] = this[a]
	}
	b.t = Math.max(this.t - c, 0);
	b.s = this.s
}
function bnpLShiftTo(j, e) {
	var b = j % this.DB;
	var a = this.DB - b;
	var g = (1 << a) - 1;
	var f = Math.floor(j / this.DB), h = (this.s << b) & this.DM, d;
	for (d = this.t - 1; d >= 0; --d) {
		e[d + f + 1] = (this[d] >> a) | h;
		h = (this[d] & g) << b
	}
	for (d = f - 1; d >= 0; --d) {
		e[d] = 0
	}
	e[f] = h;
	e.t = this.t + f + 1;
	e.s = this.s;
	e.clamp()
}
function bnpRShiftTo(g, d) {
	d.s = this.s;
	var e = Math.floor(g / this.DB);
	if (e >= this.t) {
		d.t = 0;
		return
	}
	var b = g % this.DB;
	var a = this.DB - b;
	var f = (1 << b) - 1;
	d[0] = this[e] >> b;
	for ( var c = e + 1; c < this.t; ++c) {
		d[c - e - 1] |= (this[c] & f) << a;
		d[c - e] = this[c] >> b
	}
	if (b > 0) {
		d[this.t - e - 1] |= (this.s & f) << a
	}
	d.t = this.t - e;
	d.clamp()
}
function bnpSubTo(d, f) {
	var e = 0, g = 0, b = Math.min(d.t, this.t);
	while (e < b) {
		g += this[e] - d[e];
		f[e++] = g & this.DM;
		g >>= this.DB
	}
	if (d.t < this.t) {
		g -= d.s;
		while (e < this.t) {
			g += this[e];
			f[e++] = g & this.DM;
			g >>= this.DB
		}
		g += this.s
	} else {
		g += this.s;
		while (e < d.t) {
			g -= d[e];
			f[e++] = g & this.DM;
			g >>= this.DB
		}
		g -= d.s
	}
	f.s = (g < 0) ? -1 : 0;
	if (g < -1) {
		f[e++] = this.DV + g
	} else {
		if (g > 0) {
			f[e++] = g
		}
	}
	f.t = e;
	f.clamp()
}
function bnpMultiplyTo(c, e) {
	var b = this.abs(), f = c.abs();
	var d = b.t;
	e.t = d + f.t;
	while (--d >= 0) {
		e[d] = 0
	}
	for (d = 0; d < f.t; ++d) {
		e[d + b.t] = b.am(0, f[d], e, d, 0, b.t)
	}
	e.s = 0;
	e.clamp();
	if (this.s != c.s) {
		BigInteger.ZERO.subTo(e, e)
	}
}
function bnpSquareTo(d) {
	var a = this.abs();
	var b = d.t = 2 * a.t;
	while (--b >= 0) {
		d[b] = 0
	}
	for (b = 0; b < a.t - 1; ++b) {
		var e = a.am(b, a[b], d, 2 * b, 0, 1);
		if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {
			d[b + a.t] -= a.DV;
			d[b + a.t + 1] = 1
		}
	}
	if (d.t > 0) {
		d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1)
	}
	d.s = 0;
	d.clamp()
}
function bnpDivRemTo(n, h, g) {
	var x = n.abs();
	if (x.t <= 0) {
		return
	}
	var k = this.abs();
	if (k.t < x.t) {
		if (h != null) {
			h.fromInt(0)
		}
		if (g != null) {
			this.copyTo(g)
		}
		return
	}
	if (g == null) {
		g = nbi()
	}
	var d = nbi(), a = this.s, l = n.s;
	var w = this.DB - nbits(x[x.t - 1]);
	if (w > 0) {
		x.lShiftTo(w, d);
		k.lShiftTo(w, g)
	} else {
		x.copyTo(d);
		k.copyTo(g)
	}
	var p = d.t;
	var b = d[p - 1];
	if (b == 0) {
		return
	}
	var o = b * (1 << this.F1) + ((p > 1) ? d[p - 2] >> this.F2 : 0);
	var C = this.FV / o, B = (1 << this.F1) / o, A = 1 << this.F2;
	var u = g.t, s = u - p, f = (h == null) ? nbi() : h;
	d.dlShiftTo(s, f);
	if (g.compareTo(f) >= 0) {
		g[g.t++] = 1;
		g.subTo(f, g)
	}
	BigInteger.ONE.dlShiftTo(p, f);
	f.subTo(d, d);
	while (d.t < p) {
		d[d.t++] = 0
	}
	while (--s >= 0) {
		var c = (g[--u] == b) ? this.DM : Math.floor(g[u] * C + (g[u - 1] + A)
				* B);
		if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {
			d.dlShiftTo(s, f);
			g.subTo(f, g);
			while (g[u] < --c) {
				g.subTo(f, g)
			}
		}
	}
	if (h != null) {
		g.drShiftTo(p, h);
		if (a != l) {
			BigInteger.ZERO.subTo(h, h)
		}
	}
	g.t = p;
	g.clamp();
	if (w > 0) {
		g.rShiftTo(w, g)
	}
	if (a < 0) {
		BigInteger.ZERO.subTo(g, g)
	}
}
function bnMod(b) {
	var c = nbi();
	this.abs().divRemTo(b, null, c);
	if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {
		b.subTo(c, c)
	}
	return c
}
function Classic(a) {
	this.m = a
}
function cConvert(a) {
	if (a.s < 0 || a.compareTo(this.m) >= 0) {
		return a.mod(this.m)
	} else {
		return a
	}
}
function cRevert(a) {
	return a
}
function cReduce(a) {
	a.divRemTo(this.m, null, a)
}
function cMulTo(a, c, b) {
	a.multiplyTo(c, b);
	this.reduce(b)
}
function cSqrTo(a, b) {
	a.squareTo(b);
	this.reduce(b)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
	if (this.t < 1) {
		return 0
	}
	var a = this[0];
	if ((a & 1) == 0) {
		return 0
	}
	var b = a & 3;
	b = (b * (2 - (a & 15) * b)) & 15;
	b = (b * (2 - (a & 255) * b)) & 255;
	b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535;
	b = (b * (2 - a * b % this.DV)) % this.DV;
	return (b > 0) ? this.DV - b : -b
}
function Montgomery(a) {
	this.m = a;
	this.mp = a.invDigit();
	this.mpl = this.mp & 32767;
	this.mph = this.mp >> 15;
	this.um = (1 << (a.DB - 15)) - 1;
	this.mt2 = 2 * a.t
}
function montConvert(a) {
	var b = nbi();
	a.abs().dlShiftTo(this.m.t, b);
	b.divRemTo(this.m, null, b);
	if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
		this.m.subTo(b, b)
	}
	return b
}
function montRevert(a) {
	var b = nbi();
	a.copyTo(b);
	this.reduce(b);
	return b
}
function montReduce(a) {
	while (a.t <= this.mt2) {
		a[a.t++] = 0
	}
	for ( var c = 0; c < this.m.t; ++c) {
		var b = a[c] & 32767;
		var d = (b * this.mpl + (((b * this.mph + (a[c] >> 15) * this.mpl) & this.um) << 15))
				& a.DM;
		b = c + this.m.t;
		a[b] += this.m.am(0, d, a, c, 0, this.m.t);
		while (a[b] >= a.DV) {
			a[b] -= a.DV;
			a[++b]++
		}
	}
	a.clamp();
	a.drShiftTo(this.m.t, a);
	if (a.compareTo(this.m) >= 0) {
		a.subTo(this.m, a)
	}
}
function montSqrTo(a, b) {
	a.squareTo(b);
	this.reduce(b)
}
function montMulTo(a, c, b) {
	a.multiplyTo(c, b);
	this.reduce(b)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
	return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
}
function bnpExp(h, j) {
	if (h > 4294967295 || h < 1) {
		return BigInteger.ONE
	}
	var f = nbi(), a = nbi(), d = j.convert(this), c = nbits(h) - 1;
	d.copyTo(f);
	while (--c >= 0) {
		j.sqrTo(f, a);
		if ((h & (1 << c)) > 0) {
			j.mulTo(a, d, f)
		} else {
			var b = f;
			f = a;
			a = b
		}
	}
	return j.revert(f)
}
function bnModPowInt(b, a) {
	var c;
	if (b < 256 || a.isEven()) {
		c = new Classic(a)
	} else {
		c = new Montgomery(a)
	}
	return this.exp(b, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
function Arcfour() {
	this.i = 0;
	this.j = 0;
	this.S = new Array()
}
function ARC4init(d) {
	var c, a, b;
	for (c = 0; c < 256; ++c) {
		this.S[c] = c
	}
	a = 0;
	for (c = 0; c < 256; ++c) {
		a = (a + this.S[c] + d[c % d.length]) & 255;
		b = this.S[c];
		this.S[c] = this.S[a];
		this.S[a] = b
	}
	this.i = 0;
	this.j = 0
}
function ARC4next() {
	var a;
	this.i = (this.i + 1) & 255;
	this.j = (this.j + this.S[this.i]) & 255;
	a = this.S[this.i];
	this.S[this.i] = this.S[this.j];
	this.S[this.j] = a;
	return this.S[(a + this.S[this.i]) & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
	return new Arcfour()
}
var rng_psize = 256;
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(a) {
	rng_pool[rng_pptr++] ^= a & 255;
	rng_pool[rng_pptr++] ^= (a >> 8) & 255;
	rng_pool[rng_pptr++] ^= (a >> 16) & 255;
	rng_pool[rng_pptr++] ^= (a >> 24) & 255;
	if (rng_pptr >= rng_psize) {
		rng_pptr -= rng_psize
	}
}
function rng_seed_time() {
	rng_seed_int(new Date().getTime())
}
if (rng_pool == null) {
	rng_pool = new Array();
	rng_pptr = 0;
	var t;
	if (navigator.appName == "Netscape" && navigator.appVersion < "5"
			&& window.crypto) {
		var z = window.crypto.random(32);
		for (t = 0; t < z.length; ++t) {
			rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
		}
	}
	while (rng_pptr < rng_psize) {
		t = Math.floor(65536 * Math.random());
		rng_pool[rng_pptr++] = t >>> 8;
		rng_pool[rng_pptr++] = t & 255
	}
	rng_pptr = 0;
	rng_seed_time()
}
function rng_get_byte() {
	if (rng_state == null) {
		rng_seed_time();
		rng_state = prng_newstate();
		rng_state.init(rng_pool);
		for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
			rng_pool[rng_pptr] = 0
		}
		rng_pptr = 0
	}
	return rng_state.next()
}
function rng_get_bytes(b) {
	var a;
	for (a = 0; a < b.length; ++a) {
		b[a] = rng_get_byte()
	}
}
function SecureRandom() {
}
SecureRandom.prototype.nextBytes = rng_get_bytes;
function parseBigInt(b, a) {
	return new BigInteger(b, a)
}
function linebrk(c, d) {
	var a = "";
	var b = 0;
	while (b + d < c.length) {
		a += c.substring(b, b + d) + "\n";
		b += d
	}
	return a + c.substring(b, c.length)
}
function byte2Hex(a) {
	if (a < 16) {
		return "0" + a.toString(16)
	} else {
		return a.toString(16)
	}
}
function pkcs1pad2(d, f) {
	if (f < d.length + 11) {
		alert("Message too long for RSA");
		return null
	}
	var e = new Array();
	var c = d.length - 1;
	while (c >= 0 && f > 0) {
		e[--f] = d.charCodeAt(c--)
	}
	e[--f] = 0;
	var b = new SecureRandom();
	var a = new Array();
	while (f > 2) {
		a[0] = 0;
		while (a[0] == 0) {
			b.nextBytes(a)
		}
		e[--f] = a[0]
	}
	e[--f] = 2;
	e[--f] = 0;
	return new BigInteger(e)
}
function RSAKey() {
	this.n = null;
	this.e = 0;
	this.d = null;
	this.p = null;
	this.q = null;
	this.dmp1 = null;
	this.dmq1 = null;
	this.coeff = null
}
function RSASetPublic(b, a) {
	if (b != null && a != null && b.length > 0 && a.length > 0) {
		this.n = parseBigInt(b, 16);
		this.e = parseInt(a, 16)
	} else {
		alert("Invalid RSA public key")
	}
}
function RSADoPublic(a) {
	return a.modPowInt(this.e, this.n)
}
function RSAEncrypt(d) {
	var a = pkcs1pad2(d, (this.n.bitLength() + 7) >> 3);
	if (a == null) {
		return null
	}
	var f = this.doPublic(a);
	if (f == null) {
		return null
	}
	var b = f.toString(16);
	var e = (((this.n.bitLength() + 7) >> 3) << 1) - b.length;
	while (e-- > 0) {
		b = "0" + b
	}
	return b
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(d) {
	var b;
	var e;
	var a = "";
	for (b = 0; b + 3 <= d.length; b += 3) {
		e = parseInt(d.substring(b, b + 3), 16);
		a += b64map.charAt(e >> 6) + b64map.charAt(e & 63)
	}
	if (b + 1 == d.length) {
		e = parseInt(d.substring(b, b + 1), 16);
		a += b64map.charAt(e << 2)
	} else {
		if (b + 2 == d.length) {
			e = parseInt(d.substring(b, b + 2), 16);
			a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4)
		}
	}
	while ((a.length & 3) > 0) {
		a += b64pad
	}
	return a
}
function b64tohex(e) {
	var c = "";
	var d;
	var a = 0;
	var b;
	for (d = 0; d < e.length; ++d) {
		if (e.charAt(d) == b64pad) {
			break
		}
		v = b64map.indexOf(e.charAt(d));
		if (v < 0) {
			continue
		}
		if (a == 0) {
			c += int2char(v >> 2);
			b = v & 3;
			a = 1
		} else {
			if (a == 1) {
				c += int2char((b << 2) | (v >> 4));
				b = v & 15;
				a = 2
			} else {
				if (a == 2) {
					c += int2char(b);
					c += int2char(v >> 2);
					b = v & 3;
					a = 3
				} else {
					c += int2char((b << 2) | (v >> 4));
					c += int2char(v & 15);
					a = 0
				}
			}
		}
	}
	if (a == 1) {
		c += int2char(b << 2)
	}
	return c
}
function b64toBA(e) {
	var d = b64tohex(e);
	var c;
	var b = new Array();
	for (c = 0; 2 * c < d.length; ++c) {
		b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16)
	}
	return b
};

var ua = navigator.appVersion;
var fc_isIE = ( (ua.indexOf("MSIE") != -1) || ((ua.indexOf("Trident") != -1) && (ua.indexOf("rv:11") != -1)) );
var fc_isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1);
var fc_isOpera = (navigator.userAgent.indexOf("Opera") != -1);

function checkFlashPlayerVersion() {
	var c;
	var a;
	try {
		var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.5");
		c = b.GetVariable("$version")
	} catch (a) {
		c = -1
	}
	return c
}
function flipLoginBox()
{
	if ( navigator.appVersion.indexOf("MSIE") != -1 ) {
		$("flashlogin").blur();
		$("chk_log").focus();
		$("chk_log").blur();
	}
	$("flasharea").style.visibility = "hidden";
	$("flashlogin").style.visibility = "hidden";
	showElement('htmlarea');
	loadFlash = false;
	var idElement = $('id');
	if( idElement.value != "" )
	{
		hideElement('label_id');
	} else {
		if (isFlashSupportBrowser()) {
			showElement('label_id');
		}
	}
}
init_call = false;
function checkAd(a) {
	if ( !init_call && ( navigator.userAgent.indexOf("Chrome") != -1 ) )
	{
		init_call = true;
	}
	else
	{
		if ( a==1 )
		{
			if (loadFlash)
			{
				flipLoginBox();
			}
		}
		else
		{
			if (loadFail)
			{
				useHtml();
			}
			else if (!loadFlash && isFlashSupportBrowser())
			{
				useFlash();
			}
		}
	}
}
function checkFocus2() {
	if ($("enctp").value == 2) {
		focusID()
	} else {
		if ($("enctp").value == 1) {
			if ($("id").value.length > 0) {
				setTimeout("setToFocusPW()",200);
			} else {
				setTimeout("setToFocusID()",200);
			}
		}
	}
}
function needDelay() {
	if (navigator.userAgent.indexOf("Firefox") != -1
			|| navigator.userAgent.indexOf("Safari") != -1
			|| navigator.userAgent.indexOf("Opera") != -1) {
		return true
	} else {
		return false
	}
}
function focusID() {
	if (needDelay()) {
		setTimeout("focus_id()", 500)
	} else {
		focus_id()
	}
}
function focus_id() {
	try {
		window.focus();
		findSwf("flashlogin").focus();
		findSwf("flashlogin").focusInID();
		flashretry = 0;
		setUserStroke()
	} catch (a) {
		flashretry++;
		if (flashretry < 5) {
			setTimeout("focus_id()", 100)
		}
	}
}
function makeFlashObj(a, l, g, e, k, c, f, j, d) {
	k = (k == undefined) ? "transparent" : k;
	f = (f == undefined) ? "#FFFFFF" : f;
	j = (j == undefined) ? true : j;
	d = (d == undefined) ? false : d;
	var h;
	var b = [];
	b
			.push('<object width="'
					+ g
					+ '" height="'
					+ e
					+ '" id="'
					+ l
					+ '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" >');
	b.push('<param name="allowScriptAccess" value="always" />');
	b.push('<param name="quality" value="high" />');
	b.push('<param name="menu" value="' + d + '" />');
	b.push('<param name="movie" value="' + a + '" />');
	b.push('<param name="wmode" value="' + k + '" />');
	b.push('<param name="bgcolor" value="' + f + '" />');
	b.push('<param name="FlashVars" value="' + c + '">');
	b.push('<param name="allowFullScreen" value="' + j + '">');
	b
			.push('<embed src="'
					+ a
					+ '" quality="high" wmode="'
					+ k
					+ '" menu= "'
					+ d
					+ '" FlashVars="'
					+ c
					+ '" bgcolor="'
					+ f
					+ '" width="'
					+ g
					+ '" height="'
					+ e
					+ '" name="'
					+ l
					+ '" allowFullScreen="'
					+ j
					+ '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"  />');
	b.push("</object>");
	h = b.join("");
	return h
}
function showFlashagain(a, l, g, e, k, c, f, j, d) {
	k = (k == undefined) ? "transparent" : k;
	f = (f == undefined) ? "#FFFFFF" : f;
	j = (j == undefined) ? true : j;
	d = (d == undefined) ? false : d;
	var h;
	var b = [];
	b
			.push('<object width="'
					+ g
					+ '" height="'
					+ e
					+ '" id="'
					+ l
					+ '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" >');
	b.push('<param name="allowScriptAccess" value="always" />');
	b.push('<param name="quality" value="high" />');
	b.push('<param name="menu" value="' + d + '" />');
	b.push('<param name="movie" value="' + a + '" />');
	b.push('<param name="wmode" value="' + k + '" />');
	b.push('<param name="bgcolor" value="' + f + '" />');
	b.push('<param name="FlashVars" value="' + c + '">');
	b.push('<param name="allowFullScreen" value="' + j + '">');
	b
			.push('<embed src="'
					+ a
					+ '" quality="high" wmode="'
					+ k
					+ '" menu= "'
					+ d
					+ '" FlashVars="'
					+ c
					+ '" bgcolor="'
					+ f
					+ '" width="'
					+ g
					+ '" height="'
					+ e
					+ '" name="'
					+ l
					+ '" allowFullScreen="'
					+ j
					+ '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"  />');
	b.push("</object>");
	h = b.join("");
	return h
}
function showFlash(e, b, h, d, c, g, a, f) {
	document.write(makeFlashObj(e, b, h, d, c, g, a, f))
}
function findFlashObj(a) {
	return fc_isIE ? document.getElementById(a) : document[a]
}
function flashExternalCleanup() {
	try {
		__flash_unloadHandler = function() {
			externalProbSet = true;
			obj = document.getElementsByTagName("OBJECT");
			for (i = 0; i < obj.length; i++) {
				var theObj = eval(obj[i]);
				theObj.style.display = "none";
				for ( var prop in theObj) {
					if (typeof (theObj[prop]) == "function") {
						theObj[prop] = null
					}
				}
			}
		};
		if (window.onunload != __flash_unloadHandler) {
			__flash_savedUnloadHandler = window.onunload;
			window.onunload = __flash_unloadHandler
		}
	} catch (e) {
	}
}
window.onbeforeunload = flashExternalCleanup;


var loginNClicks = {
	classNClicksNamePair : [
		["btn_id", "log_off.searchid"],
		["btn_login", "log_off.login"],
		["chk_login", "log_off.keep"],
		["btn_cl", "log_off*k.close"]
	],
	anchorTextNClicksNamePair : [
		[ "IP보안", "log_off.ipcheck" ],
		[ "회원가입", "log_off.registration" ],
		[ "비밀번호 찾기", "log_off.searchpass" ],
		[ "도움말 보기", "log_off*k.help" ],
		[ "일회용 로그인", "log_off.loginone" ]
	],
	installed : false,
	isMSIE : fc_isIE,
	registerNClicksEvent : function() {
		var registerFunc = function() {
			var registerType = ['A', 'BUTTON', 'INPUT'];

			for (var i=0, len=registerType.length; i < len; i++) {
				var tags = document.getElementsByTagName(registerType[i]);
				
				for (var j=0, len=tags.length; j < len; j++) {
					if (tags[j].attachEvent) {
						tags[j].attachEvent("onclick", loginNClicks.nClicksEventHandler);
					} else if (tags[j].addEventListener) {
						tags[j].addEventListener("click", loginNClicks.nClicksEventHandler, false);
					}
				}
			}
		};

		if (window.attachEvent) {
			window.attachEvent("onload", registerFunc);
		} else if (window.addEventListener) {
			window.addEventListener("load", registerFunc, false);
		}

		loginNClicks.installed = true;
	},
	nClicksEventHandler : function(e){
		try {
			var eventSrcElement = null;
			loginNClicks.isMSIE ? eventSrcElement = e.srcElement :  eventSrcElement = this;

			if ( loginNClicks.nClicksByAnchorText(e, this, eventSrcElement) ) {
				return;
			}
			loginNClicks.nClicksByClassName(e, eventSrcElement);
		} catch(ex) {
		}
	},
	nClicksByAnchorText : function(event, eventHandler, element) {
		if (element.tagName !== "A") {
			return false;
		}
		var anchorText = "";
		loginNClicks.isMSIE ? anchorText = element.innerHTML : anchorText = eventHandler.firstChild.wholeText;

		var eventSrcAnchorElement = loginNClicks.getClickedAnchorElement(element);
		var nClicksCode = loginNClicks.findValue(loginNClicks.anchorTextNClicksNamePair, anchorText);
		if(nClicksCode != null) {
			parent.clickcr(eventSrcAnchorElement, nClicksCode, '', '', event);
			return true;
		}
		return false;
	},
	nClicksByClassName : function(event, element) {
		var nvl = function(arg) { return arg == null ? "" : arg; };
		var elementClass = nvl(element.className);
		var nClicksCode = loginNClicks.findValue(loginNClicks.classNClicksNamePair, elementClass);
		if(nClicksCode != null) {
			parent.clickcr(element, nClicksCode, '', '', event);
			return true;
		}
		return false;
	},
	getClickedAnchorElement : function(eventElement) {
		if(eventElement.tagName == "A") {
			return eventElement;
		}

		var limitDepth = 3;
		var currentElement = eventElement
		for(var i = 0; i < limitDepth; i++) {
			if(currentElement.parentElement.tagName == "A") {
				return currentElement.parentElement;
			}
			currentElement = currentElement.parentElement;
		}

		return eventElement;
	},
	findValue : function(dataMap, dataKey) {
		var KEY_INDEX = 0;
		var VALUE_INDEX = 1;

		for(var i = 0, len = dataMap.length; i < len; i++) {
			if(dataKey == dataMap[i][KEY_INDEX]) {
				return dataMap[i][VALUE_INDEX];
			}
		}

		return null;
	}
};

function initPage() {
	var showLoginCheckFocusBorder = function() {
		var ua = window.navigator.userAgent;
		var isVistaMSIE9 = ((ua.indexOf('MSIE 9') != -1) && (ua.indexOf('Windows NT 6.0') != -1));
		if (!isVistaMSIE9) {
			document.getElementById("loginframe").className = document.getElementById("loginframe").className.replace("vis", "");
		}
	};
	showLoginCheckFocusBorder();

//	window.document.body.onclick = setUserStroke;
//	window.document.body.onmouseout = checkRelease;

	var pw = $('pw');
	pw.onkeypress = function(e){capslockevt(e);getKeysv3()};
	pw.onkeyup = function(e){checkShiftUp(e);checkEnt(e)};
	pw.onkeydown = function(e){checkShiftDown(e)};

	var checkLong = $('chk_log');
	checkLong.onchange = function(e){savedLong(checkLong)};
	checkLong.onclick = function(e){msieblur(checkLong)};
	
	var closeBtn = $('help_close');
	if (closeBtn != null) {
		closeBtn.onclick = function(e) {
			hideElement('div_chk_long');
			try{$('ckb_type').focus();}catch(e){}
		};
	}

	var ipCheckBox = $('ckb_type');
	ipCheckBox.onclick=function(e){msieblur(ipCheckBox)};
	ipCheckBox.onchange=function(e){ipCheck(ipCheckBox,e)};

	$('ip_guide').onclick = function(e){window.open(this.href, 'IPGUIDE', 'titlebar=1, resizable=1, scrollbars=yes, width=537, height=750'); return false};

	$('frmNIDLogin').onsubmit = function(e) {return confirm_submit()};

	var useWideLoginboxFlash=true;
	var nsc = "nid.login";
	try {
		if (navigator.appVersion.toLowerCase().indexOf("win") != -1) {
			$('id').style.imeMode = "disabled";
			document.msCapsLockWarningOff = true;
		}
		if (navigator.userAgent.indexOf("iPad") != -1) {
			document.getElementById("loginframe").className += ' t';
		}
	} catch (e) {
	}

	initSmartLevel();
	initInputLabel();
	addInputEvent();
	loginNClicks.registerNClicksEvent();
	try{
		if (navigator.userAgent.indexOf("MSIE 7") != -1) {
			document.getElementById("loginframe").className += " ie7";
		}else if (navigator.userAgent.indexOf("MSIE 8") != -1) {
			document.getElementById("loginframe").className += " ie8";
		}else if (navigator.userAgent.indexOf("MSIE 9") != -1) {
			document.getElementById("loginframe").className += " ie9";
		}
	}catch(e){}

	var flashArea = $('flasharea');
	var flashObj = makeFlashObj("http://static.nid.naver.com/loginv3/commonLoginF_201505.swf", "flashlogin", flashArea.offsetWidth, flashArea.offsetHeight, "window", "null", "#f7f7f7", "false");
	flashArea.innerHTML = flashObj + flashArea.innerHTML;
	checkFlashLoad(1);
	//browser_unique_cookie_handle();
}
function browser_unique_cookie_handle()
{
	try{
		nid_buk = getCookie('nid_buk');
		if (nid_buk!=null && nid_buk.length>0)
		{
		}
		else
		{
			var nid_buk = localStorage.getItem("nid_buk");
			if (nid_buk!=null && nid_buk.length>0)
			{
				var today = new Date();
				var expire = new Date(today.getTime() + 60 * 60 * 24 * 365 * 1000);
				var curCookie = "nid_buk=" + escape(nid_buk) + "; expires=" + expire.toGMTString() + "; path=/; domain=.nid.naver.com;";
				document.cookie = curCookie;
			}
			else
			{
				nid_nnb = getCookie('NNB');
				if (nid_nnb!=null && nid_nnb.length>0)
				{
					localStorage.setItem("nid_buk", nid_nnb);
					var today = new Date();
					var expire = new Date(today.getTime() + 60 * 60 * 24 * 365 * 1000);
					var curCookie = "nid_buk=" + escape(nid_nnb) + "; expires=" + expire.toGMTString() + "; path=/; domain=.nid.naver.com;";
					document.cookie = curCookie;
				}
			}
		}
	}catch(e){}
}
