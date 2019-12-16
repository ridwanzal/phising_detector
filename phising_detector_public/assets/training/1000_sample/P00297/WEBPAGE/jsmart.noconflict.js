if (typeof $jsmart != 'function'){
	if (typeof jQuery == 'undefined'){
		var msg = 'Please include jquery first. jQuery 1.5.0 is recommended!';
		if (console.log){
			console.log(msg);
		} else {
			alert(msg);
		}
	} else {
		$jsmart = jQuery.noConflict();
	}
}