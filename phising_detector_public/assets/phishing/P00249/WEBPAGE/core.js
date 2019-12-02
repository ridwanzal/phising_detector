
var USPostalCodeRegex = /^[0-9]{5}$/;
var CanadianPostalCodeRegex = /^[ABCEGHJKLMNPRSTVXY][0-9][A-Z][\s]*[0-9][A-Z][0-9]$/;
var UKFullPostalCodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[\s]*[0-9][ABDEFGHJLNPQRSTUWXYZ]{2}$/;
var UKPartialPostalCodeRegex1 = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[\s]+[0-9]$/;
var UKPartialPostalCodeRegex2 = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?$/;
var UKPartialPostalCodeRegex3 = /^[A-Z]{1,2}$/;
var IsValidPostalCodeFormat = function (postalCode) {
	try {
		postalCode = postalCode.toUpperCase();
		if (USPostalCodeRegex.test(postalCode)) {return true;}
		else if (CanadianPostalCodeRegex.test(postalCode)) {return true;}
		else if (UKFullPostalCodeRegex.test(postalCode)) {return true;}
		else if (UKPartialPostalCodeRegex1.test(postalCode) || UKPartialPostalCodeRegex2.test(postalCode) || UKPartialPostalCodeRegex3.test(postalCode)) {return true;}
	}
	catch (e) { return false;}
	return false;
}	

var tempURL = window.location.href;
var tempURL = tempURL.toLowerCase();
var pathURL = window.location.search;
pathURL = pathURL.substr(1);
var arrURL = pathURL.split("&");
 
var bProfile = tempURL.indexOf("showprofile.aspx");
var bProfileNext = tempURL.indexOf("profile/story/");
var bSearch = tempURL.indexOf("searchsubmit.aspx");
var bKeyword = tempURL.indexOf("kwsearch/index.aspx");
 
if (bProfile > -1) {
	currentURL = "/profile/showprofile.aspx?"; 
} else if (bProfileNext > -1) {
	currentURL = "/profile/story/?"; 
} else if (bKeyword > -1) {
	currentURL = "/kwsearch/index.aspx?"; 
} else {
	currentURL = "/search/searchSubmit.aspx?";
}
 
for (var i = 0; i < arrURL.length; i++) {
	if (arrURL[i].indexOf("r2s") < 0 && arrURL[i].indexOf("cpp") < 0) {
		if (i > 0) currentURL = currentURL + '&' + arrURL[i];
		else currentURL = currentURL + arrURL[i];
	}
}
