var timeOutMsg = "...hi, just checking. As we have recorded no \nactivity for some time, please press 'OK' to \ncontinue using Westpac's Online banking. \nIf you have been unable to respond to this \nmessage, for your security we will have \nended your session and you'll need to log \nback in, sorry.";
var timeOutMilliSeconds = 540000; //9 MINS
function timeoutAlert() {
  var startDate = new Date();
  var startTime = startDate.getTime();
  
  alert(timeOutMsg);
  
  var endDate = new Date();
  var endTime = endDate.getTime();

  if ((endTime - startTime) > 60000) {
	logout("newSession?relogin=true");
  } else {
  	// where self is iframe
	var image = new Image(1,1);
	image.src = "timeOut?action=refresh&dse_operationName=timeout&dse_processorState=inTime&dse_nextEventName=refresh&time="+endTime;
	resetTimeout();
	}
}

function resetTimeout() {
	if (window.parent.document.requiresLogoff)
	{
		// dont need do any timeout
  	} else {
		setTimeout('timeoutAlert()', timeOutMilliSeconds);
  	}
}
