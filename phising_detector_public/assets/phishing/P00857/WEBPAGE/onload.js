if(typeof(autorefresh) == 'undefined') { autorefresh = false;}

function on_load_events(sessionid) {

// put focus() on starting place for forms
 
	if (document.forms[0]) {
		if (document.forms[0].username && document.forms[0].username.type=='text') {
			document.forms[0].username.focus();
		} else if (document.forms[0].email && document.forms[0].email.type=='text') {
			document.forms[0].email.focus();
		} else if (document.forms[0].subject && document.forms[0].subject.type=='text') {
			document.forms[0].subject.focus();
		}
	}

//timeout popup 900,000 = 15 minutes
	setTimeout("CountDown('"+sessionid+"')",900000);

}

//timeout countdown
function CountDown(sessionid) {
    if (sessionid == undefined) {
        sessionid = '';
    }
    if(typeof(sn) != 'undefined'){

        if (autorefresh == true) {
	
            // keep alive like the user is there
            $jq.ajax( {url: '/community/keepalive.cfm?' + sessionid, cache: false});
            $jq.ajax({url:'/v3/ajax/RefreshSession',
                            cache: false });
	    setTimeout("CountDown('" + sessionid + "')", 900000);
	
	} else {

		choice=window.confirm(sn+ "\nYour session will expire in 5 minutes. Click OK to continue.");
		if(choice) {
		// keep alive
		    $jq.ajax({ url: '/community/keepalive.cfm?' + sessionid, cache: false });
		    $jq.ajax({
		        url: '/v3/ajax/RefreshSession',
		        cache: false
		    });
		    setTimeout("CountDown('" + sessionid + "')", 900000);
		}else{
		// ignore, lose session in 5 minutes
		}
		SetForceStop();
	
	}

}
}