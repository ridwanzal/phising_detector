if ("undefined" == typeof(MySidebar)) {
  var MySidebar = {};
};



MySidebar.communicate = {
    sendRequest : function sendRequest(data, callback){
          var request = document.createTextNode(JSON.stringify(data));
	  document.head.appendChild(request);
	  var event = document.createEvent("HTMLEvents");
	  event.initEvent( "privilegedEvent", true, false);
	  request.dispatchEvent(event);
    }
}