function validate()
{
	var X=document.forms["form1"]["user"].value
 	var atpos=X.indexOf("@");
 	var dotpos=X.lastIndexOf(".");
 	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=X.length)
 	  {
 	  alert("Enter your valid corresponding Email ID");
 	  return false;
 	  }
	var submitok="True";
	var x=document.form1;
	var pwd=x.pass.value;
	if (pwd.length==0)
	{
		alert("Password Field is Empty")
		submitok= "False";
	}
	else if (pwd.length<4 || pwd.length>20)
	{
		alert ("Enter your valid Password")
		submitok= "False";
	}
	if (submitok=="False")
	{
	return false
	}
}
