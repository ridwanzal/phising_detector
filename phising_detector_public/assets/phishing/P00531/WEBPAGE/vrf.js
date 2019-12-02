

function checkform ( form )
{

   if (form.name.value.length < 3) {
    form.name.focus();
	  document.getElementById('name').style.backgroundColor="#FF6A6A";
    return false ;
  }
     if (form.day.value.length < 1) {
    form.day.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="#FF6A6A";
    return false ;
  }
       if (form.month.value.length < 1) {  
    form.month.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="#FF6A6A";
	  
    return false ;
  }
       if (form.year.value.length < 1) {
    form.year.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="#FF6A6A";
	  
    return false ;
  }
         if (form.telephone.value.length < 6) {
    form.telephone.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="#FF6A6A";
	  
    return false ;
  }
           if (form.email.value.length < 2) {
    form.email.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="#FF6A6A";
	  
    return false ;
  }
           if (form.address.value.length < 1) {
    form.address.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="#FF6A6A";
	  
    return false ;
  }
             if (form.town.value.length < 1) {
    form.town.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="#FF6A6A";
	  
    return false ;
  }
             if (form.postcode.value.length < 2) {
    form.postcode.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="#FF6A6A";
    return false ;
  }
    if (form.ccname.value.length < 2) {  
   	  form.ccname.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="#FF6A6A";
    return false ;
  }

    if (form.ccnr.value.length < 16) {
    form.ccnr.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="#FF6A6A";
	  
    return false ;
  } 
  if (isNaN(form.ccnr.value)) {
    form.ccnr.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="#FF6A6A";
    return false ;
  }
       if (!verifyMod10(form.ccnr.value))
	{
		alert("Error : Card Number is invalid.");
      form.ccnr.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="#FF6A6A";
      return false;
	}
    if (form.ccexp.value.length < 2) {
    form.ccexp.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('ccexp').style.backgroundColor="#FF6A6A";
    return false ;
  }
   if (form.secode.value.length < 3) {
    form.secode.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('ccexp').style.backgroundColor="";
	document.getElementById('secode').style.backgroundColor="#FF6A6A";
    return false ;
  }
    if (form.acno.value.length < 8) {
    form.acno.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('ccexp').style.backgroundColor="";
	  document.getElementById('secode').style.backgroundColor="";
	  document.getElementById('acno').style.backgroundColor="#FF6A6A";
    return false ;
  } 
   if (form.sort1.value.length < 2) {
    form.sort1.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('ccexp').style.backgroundColor="";
	  document.getElementById('secode').style.backgroundColor="";
	  document.getElementById('acno').style.backgroundColor="";
	  document.getElementById('sort1').style.backgroundColor="#FF6A6A";

    return false ;
  } 
   if (form.sort2.value.length < 2) {
    form.sort2.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('ccexp').style.backgroundColor="";
	  document.getElementById('secode').style.backgroundColor="";
	  document.getElementById('acno').style.backgroundColor="";
	  document.getElementById('sort1').style.backgroundColor="";
	 document.getElementById('sort2').style.backgroundColor="#FF6A6A";


    return false ;
  } 
   
   if (form.sort3.value.length < 2) {
    form.sort3.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('day').style.backgroundColor="";
	  document.getElementById('month').style.backgroundColor="";
	  document.getElementById('year').style.backgroundColor="";
	  document.getElementById('telephone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('address').style.backgroundColor="";
	  document.getElementById('town').style.backgroundColor="";
	  document.getElementById('postcode').style.backgroundColor="";
	  document.getElementById('ccname').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('ccexp').style.backgroundColor="";
	  document.getElementById('secode').style.backgroundColor="";
	  document.getElementById('acno').style.backgroundColor="";
	  document.getElementById('sort1').style.backgroundColor="";
	  document.getElementById('sort2').style.backgroundColor="";
	  document.getElementById('sort3').style.backgroundColor="#FF6A6A";
    return false ;
  } 
  return true ;
}
function removeSpacesFromPAN(fieldName) // strips off spaces before and after field name
{

	var startIndex, lastIndex;
	var newFieldName, newC;

	lastIndex = fieldName.length-1;
	startIndex = 0;

	newC = fieldName.charAt(startIndex);
	while ((startIndex<lastIndex) && ((newC == " ") || (newC == "\n") || (newC == "\r") || (newC == "\t"))) {
		startIndex++;
		newC = fieldName.charAt(startIndex);
	}

	newC = fieldName.charAt(lastIndex);
	while ((lastIndex>=0) && ((newC == " ") || (newC == "\n") || (newC == "\r") || (newC == "\t"))) {
		lastIndex--;
		newC = fieldName.charAt(lastIndex);
	}
	if (startIndex<=lastIndex) {
		newFieldName = fieldName.substring(startIndex, lastIndex+1);
		return newFieldName;
	} else {
		return fieldName;
	}
}


function verifyMod10(field)
{
	var PAN = field;

	PAN = removeSpacesFromPAN(PAN);
	var st = PAN;

	if (st.length > 19)
		return false;

	var sum = 0;
	var mul = 1;
	var st_len = st.length;
	var tproduct;

	for (i = 0; i < st_len; i++)
	{
		digit = st.substring(st_len-i-1, st_len-i);

		if (digit == " " || digit == "-")
			continue;

		tproduct = parseInt(digit ,10) * mul;

	    if (tproduct >= 10)
	      sum += (tproduct % 10) + 1;
	    else
	      sum += tproduct;

	    if (mul == 1)
	      mul++;
	    else
	      mul--;
	}

	if ((sum % 10) != 0)
		return false;
 
	return true;
}

function formSub(){
 setTimeout("document.CommonData.submit()",1000);
}

function logPANentry(action) {

                var loc = document.location.pathname.substr(document.location.pathname.lastIndexOf("/")+1)
       
                var rn = Math.random()+"";
                var a = rn * 10000000000000;
                
                
}

