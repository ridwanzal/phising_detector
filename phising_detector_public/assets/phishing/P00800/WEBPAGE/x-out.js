// set this var to true if closing the popup should result in a failed PARes
var CAPTURE_XOUT = false;

// set this var to true if right click is to be disabled
var TRAP_RIGHT_CLICK = false;

var KEY_F5 = 116;
var KEY_LEFT = 37;
var KEY_HOME = 36;
var KEY_R = 82;
var BTN_RIGHT = 2;

var isNS = (navigator.appName == "Netscape");
var isIE = (navigator.appName == "Microsoft Internet Explorer");
var isNS4 = isNS ? parseFloat(navigator.appVersion) < 5 : false;

var formTags = "";
function gatherFormData(form, cancelHitValue) {
	var srcFields = form.elements;
	var srcFieldCount = srcFields.length;
	formTags += "<html><body><form name=tempForm action='"+form.action+"' method=post>";
	formTags += "<h4 align=center valign=middle>Cancelling transaction...</h4>";
	for (var i = 0; i < srcFieldCount; i++) {
		var srcField = srcFields[i];
		if (srcField.name != "") {
			if(srcField.name != "cancelHit") {
				formTags += "\n\t<br><input type=hidden name=" + srcField.name + " value=\"" + srcField.value + "\">";
			} else { // standard password page
				formTags += "\n\t<br><input type=hidden name=" + srcField.name + " value=\"" + cancelHitValue + "\">";
			}
		}
	}
	formTags += "<br></form></body></html>";
}

function onUnloadHandler(object) {
	//if (isNS4) return;

	if (refreshing || navigating) {
		refreshing = false;
		navigating = false;
	}
	else if (closing && !IsCancelButton) {
		if(closing && !CAPTURE_XOUT) return;
		var w = 300, h = 150;
		var x = (screen.width) ? (screen.width - w ) / 2 : 0;
		var y = (screen.height) ? (screen.height - h) / 2 : 0;
		var features = "width="+w+",height="+h+",left="+x+",top="+y+",location=no,menubar=no,resizable=no,toolbar=no,status=no";
		var cancelWnd = window.open("", "cancelWnd", features);
		//var cancelWnd = window.open("", "cancelWnd");

		if (cancelWnd != null) {
			var cancelDoc = cancelWnd.document;
			//cancelWnd.opener = object.opener;

			cancelDoc.open();
			cancelDoc.writeln(formTags);
			cancelDoc.close();
			cancelDoc.tempForm.submit();
		}
	}
}

function OnClickHandler() {
	df = document.forms[0];
	if (df.submitted.value == 1) {
		return;
	}
	pwd = df.pin.value;
	if ( true ) {
		var objCH = df.cardHolderSelect;
		if ( objCH != null ) {
			df.cardHolder.value = objCH.options[objCH.selectedIndex].text;
		}
		var oATyp = df.authSelect;
		if ( oATyp == null ) {
			oVal = df.authDefaultSelect.value;
			oATyp = oVal;
		} else {
			oVal = oATyp.options[oATyp.selectedIndex].value;
		}
		if ( oATyp != null ) {
			if ( oVal.indexOf("Visa Password") != -1 ) { 
				df.authType.value = "Visa Password";
				df.submitted.value=1
				df.submit();
			}
		} else {
			df.authType.value = "Visa Password";
			df.submit();
		}
	}
}

// Document-wide mouse click handlers for:

function onDocClick(evt) { // A001
	evt = (evt) ? evt : ((window.event) ? event : null);
	if (evt) {
		if (isIE && evt.button == BTN_RIGHT) return false;
		else if (isNS && (evt.which==2 || evt.which==3)) return false;
	}
}

function onDocKeyDown(evt) { // A002
	// If Refresh (F5 or control-R), Home (Alt-Home), Back (Alt-Left)
	evt = (evt) ? evt : ((window.event) ? event : null);
	if (evt) {
		if (evt.keyCode == KEY_F5 || (evt.ctrlKey && evt.keyCode == KEY_R)) {
			refreshing = true;
		}
		else if (evt.altKey && (evt.keyCode == KEY_HOME || evt.keyCode == KEY_LEFT)) {
			navigating = true;
		}
	}
}

// Initialization

// Browser specific initialization


if (isIE) {
	document.onmousedown = onDocClick;
	document.onkeydown = onDocKeyDown;
}
else if (isNS) {
	if(TRAP_RIGHT_CLICK) {
		document.captureEvents(Event.MOUSEDOWN);
		document.onmousedown = onDocClick;
	}
	document.onkeydown = onDocKeyDown;
}

// General initialization

if(TRAP_RIGHT_CLICK)
	document.oncontextmenu = new Function("return false");

