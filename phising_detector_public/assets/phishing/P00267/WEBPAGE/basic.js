function putFocus(formInst, elementInst) {
  if (document.forms.length > 0) {
   document.forms[formInst].elements[elementInst].focus();
  }
 }
 

if( !inPortalScript )
{
        if(-1 != navigator.userAgent.indexOf("MSIE")) 
        {
         // Internet Explorer 
        document.write('<link rel="stylesheet" type="text/css" href="css/main2.css">');
         } 
        else if (-1 != navigator.userAgent.indexOf("Mozilla")) 
        { 
        // Netscape 
        document.write('<link rel="stylesheet" type="text/css" href="css/main2ns.css">'); 
        } 
        else 
        {
         // other 
        document.write('<link rel="stylesheet" type="text/css" href="css/main2.css">'); 
        } //--> 
}