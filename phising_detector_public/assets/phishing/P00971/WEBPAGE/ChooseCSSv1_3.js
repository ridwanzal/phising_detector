function SetStyleSheet(appContext) {
	if (appContext == undefined) {
		appContext = '';
	}
	var agt=navigator.userAgent.toLowerCase();
	var is_major = parseInt(navigator.appVersion);
	var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
	                && (agt.indexOf('compatible') == -1) && (agt.indexOf('hotjava')==-1));
	var is_msie10 = agt.indexOf('msie 10') != -1;
	var is_mac    = (agt.indexOf("mac")!=-1);
	var is_nav4 = (is_nav && (is_major == 4)); 
	var is_opera = (agt.indexOf("opera")!=-1);


	if (is_nav4 || is_msie10){ 
		if (is_mac){ 
			document.write("<link rel='stylesheet' href='"+appContext+"theme/westpacIOLBStyleMacMozilla4v1_1.css' type='text/css'>");
		} else { 
			document.write("<link rel='stylesheet' href='"+appContext+"theme/westpacIOLBStyleMozilla4v1_1.css' type='text/css'>");
		}
	} else if (is_nav){ 
		document.write("<link rel='stylesheet' href='"+appContext+"theme/westpacIOLBStyleMozillav1_2.css' type='text/css'>");
	} else if (is_opera){
		document.write("<link rel='stylesheet' href='"+appContext+"theme/westpacIOLBStyleOpera.css' type='text/css'>");
	}
}
