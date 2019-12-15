function geoplugin_request() { return '175.140.59.172';} 
function geoplugin_status() { return '200';} 
function geoplugin_credit() { return 'Some of the returned data includes GeoLite data created by MaxMind, available from <a href=\'http://www.maxmind.com\'>http://www.maxmind.com</a>.';} 
function geoplugin_city() { return 'Kuching';} 
function geoplugin_region() { return 'Sarawak';} 
function geoplugin_regionCode() { return '11';} 
function geoplugin_regionName() { return 'Sarawak';} 
function geoplugin_areaCode() { return '0';} 
function geoplugin_dmaCode() { return '0';} 
function geoplugin_countryCode() { return 'MY';} 
function geoplugin_countryName() { return 'Malaysia';} 
function geoplugin_continentCode() { return 'AS';} 
function geoplugin_latitude() { return '1.5298';} 
function geoplugin_longitude() { return '110.3462';} 
function geoplugin_currencyCode() { return 'MYR';} 
function geoplugin_currencySymbol() { return '&#82;&#77;';} 
function geoplugin_currencySymbol_UTF8() { return 'RM';} 
function geoplugin_currencyConverter(amt, symbol) { 
	if (!amt) { return false; } 
	var converted = amt * 4.03; 
	if (converted <0) { return false; } 
	if (symbol === false) { return Math.round(converted * 100)/100; } 
	else { return '&#82;&#77;'+(Math.round(converted * 100)/100);} 
	return false; 
} 
