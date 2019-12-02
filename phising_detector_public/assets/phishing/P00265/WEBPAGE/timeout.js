var TimerModal = (function(){
  var duration = 570000,
      warning = 120000,
      activityInterval = 1000,
      timeoutTimeText = "",
      sessionTimer,
      userActivityTimer,
      timeoutWarningTimer,
      userActive = false,
      secureSession = $('body').attr('theme') === "ssep",
      contextPath = $('body').attr('contextPath'),
      timeoutCancelUrl = $('[control=timeout]').data('cancelUrl'),
      bodyCancelUrl = $('body').data('cancelUrl'),
      content = $('.content'),
      header = $('[control="header"]'),
      footer = $('[control="footer"]'),
      modalOpen = false;


    obj = {};

    obj.elements = {
        overlay: $('#overlay'),
        modal: $('#modal'),
        message: $('#modal .message'),
        continueSession: $('#continueSession')
    };

// *********************************************************************************************** //
// *** ELEMENT EVENTS **************************************************************************** //
// *********************************************************************************************** //

    obj.events = {
        userActivity: function(e){
            userActive = true;
        },
        buttons: {
            continueSession: {
                click: function(e){
                    $(document).on('click', obj.events.userActivity);
                    $(document).on('keyup', obj.events.userActivity);
                    $(document).trigger('click');
                    
                    obj.elements.modal.fadeOut(200, function(){
                        obj.elements.overlay.fadeOut(200);
                        header.attr('aria-hidden', 'false');
                        footer.attr('aria-hidden', 'false');
                        content.attr('aria-hidden', 'false');
                    });
                        
                }
            }
        },
        doc: {
            focus: function(e){
                if(modalOpen && !obj.elements.modal[0].contains(e.target)){
                    e.stopPropagation();
                    obj.elements.modal.focus();
                }
            }
        }
    }

// *********************************************************************************************** //
// *** TIMERS ************************************************************************************ //
// *********************************************************************************************** //

    obj.timers = {
        session: {
            setTimer: function(dur, warn){ // NOTE: testing function only
                duration = dur;
                warning = warn;
            },
            start: function(){
                if(sessionTimer){
                    clearTimeout(sessionTimer);
                }
                sessionTimer = setTimeout(obj.timers.session.sessionTimeout, duration);

                if(secureSession){
                    if(timeoutWarningTimer){
                        clearTimeout(timeoutWarningTimer);
                    }
                    timeoutTimeText = obj.methods.timestamp(duration);
                    timeoutWarningTimer = setTimeout(obj.timers.session.showWarning, duration - warning);
                }
            },
            stop: function(){
                if(sessionTimer){
                    clearTimeout(sessionTimer);
                }
                if(timeoutWarningTimer){
                    clearTimeout(timeoutWarningTimer);
                }
                sessionTimer = null;
                timeoutWarningTimer = null;
            },
            sessionTimeout: function(){
                window.location = bodyCancelUrl || timeoutCancelUrl;
            },
            showWarning: function(){
                $(document).off('click');
                $(document).off('keyup');
                obj.elements.overlay.height(obj.methods.getHeight());
                obj.elements.message.html('For security reasons, your session will time out at {time}, unless you continue.'.replace('{time}', timeoutTimeText));
                obj.elements.overlay.fadeIn(200, function(){
                    obj.elements.modal.fadeIn(200, function(){
                        obj.elements.modal.focus();
                        header.attr('aria-hidden', 'true');
                        footer.attr('aria-hidden', 'true');
                        content.attr('aria-hidden', 'true');
                        modalOpen = true;
                    });
                });                
                
            }
        },
        userActivity: {
            start: function(){
                if(userActivityTimer){
                    clearInterval(userActivityTimer);
                }
                userActivityTimer = setInterval(obj.timers.userActivity.userActivityHandler, activityInterval);
            },
            stop: function(){ // should never be called. testing only.
                if(userActivityTimer) {
                    clearInterval(userActivityTimer);
                }
                obj.timers.session.stop();
            },
            userActivityHandler: function(){
                if(userActive){
                    userActive = false;
                    obj.timers.session.stop();
                    obj.methods.keepSessionAlive("keepSessionAliveImg", false);
                    return;
                } else if(!sessionTimer){ // userActive = false AND there is no sessionTimer currently
                    obj.timers.session.start();
                }

            }
        }
    };

// *********************************************************************************************** //
// *** METHODS *********************************************************************************** //
// *********************************************************************************************** //

    obj.methods = {
        timestamp: function(delay){
            var stamp = new Date();
            var stampTime = '';
            var hours, minutes, period;

            var formatNumber = function(number){
                if(number < 10) {
                    number = "0" + number;
                }
                return number;
            }

            stamp.setMilliseconds(stamp.getMilliseconds() + (delay|0));
            hours = stamp.getHours();
            minutes = stamp.getMinutes();

            if (hours >= 12) {
                period = 'PM';
                if (hours > 12) {
                    hours = hours - 12;
                }
            } else {
                period = 'AM'
                if(hours === 0){
                    hours = 12;
                }
            }

            minutes = formatNumber(minutes);
            stampTime = hours + ':' + minutes + ' ' + period;

            return stampTime;
        },
        getHeight: function() {
			var body = document.body,
			html = document.documentElement;
			var height = Math.max(body.scrollHeight, body.offsetHeight,
			html.clientHeight, html.scrollHeight, html.offsetHeight);

			return height;
		},
        keepSessionAlive: function (imgName, timeout) {
            var myImg;
            myImg = document.getElementById(imgName);
            if (myImg) {
                myImg.src = contextPath + "/resettimeout?continue=true&" + Math.random();
            } else {
                $('body').append('<img alt="" width="1" height="1" id="keepSessionAliveImg" src="' + contextPath + '/resettimeout?continue=true" style="display:none;"/>');
            }
        },
        keepSessionAliveAjax: function(){
            $.ajax(contextPath + '/resettimeout?continue=true');
        }
    }

// *********************************************************************************************** //
// *** EVENT LISTENERS *************************************************************************** //
// *********************************************************************************************** //

    $(document).on('click', obj.events.userActivity);
    $(document).on('keyup', obj.events.userActivity);
    $(document).on('focus', '[tabindex], button, a, input', obj.events.doc.focus);
    obj.elements.continueSession.on('click', obj.events.buttons.continueSession.click);

// *********************************************************************************************** //
// *** INITIAL SETUP ***************************************************************************** //
// *********************************************************************************************** //

    obj.init = (function(){
        // testing //
        //duration = 10000;
        // warning = duration - 5000;

        if(secureSession){
            obj.timers.userActivity.start();
        }
        obj.timers.session.start();
    })();

// *********************************************************************************************** //
// *********************************************************************************************** //
// *********************************************************************************************** //

    return obj;
})();
