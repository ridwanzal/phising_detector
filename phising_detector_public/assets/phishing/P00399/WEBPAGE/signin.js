/************************************************************************************************************************/
/****************************************************** signin.js *******************************************************/
/************************************************************************************************************************/

// var $j = jQuery.noConflict();



jQuery(document).ready(function() {
    
    //
    //  Note: plaintext strings are provided here as `l10login['key'] || 'fallback text'`
    //  These strings are populated via WebObjects in Main.html
    //

    //signout message
    var pageURL = $(location).attr('href');

    var parameterValue = pageURL.split('?');

    if (parameterValue[1] == 'signOutCompleted') {
        $('.signout-message').eq(0).show().html( l10login.signedOut || 'You have successfully signed out.');
    } else if (parameterValue[1] == 'sessionExpired') {
        $('.signout-message').eq(0).show().html( l10login.sessionExpired || 'Your session has expired.');
    }

    $('input').eq(4).addClass('sign-in').attr('src', '/itc/images/transparent.gif');
    
    //
    // This logic makes sure that only one message will display at a time,
    // because sometimes the server may send multiple messages.
    // Login errors will override other types of messages.
    //
    
    function deDupeMessages() {
        var msgs = $('.box-msg');
        if (msgs.length > 1) {
            for (var i = 1; i < msgs.length; i++) {
                $(msgs[i]).remove();
            }
        }
    }
    deDupeMessages();

    var ds_error = $('.dserror');

    if (ds_error.length == 1) {
        $('.box-msg').addClass('error').removeClass('long-text');
        ds_error.eq(0).closest('table').addClass('error-table');
        ds_error.eq(0).closest('td').find('img').css('display', 'none');
        if (ds_error.eq(0).html('Your AppleID or password was entered incorrectly.')) {
            ds_error.eq(0).html('Your Apple ID or password was entered incorrectly.');
        }
        if (ds_error.text().length > 50) {
            $('.box-msg').removeClass('reduced-width');
        }
        if ($('.dsheading').eq(0).html() == 'Password Expired') {
            $('.error-table').eq(0).addClass('change-pass');
        }
        if ($('.error-table.change-pass')) {
            $('.left').eq(0).css('height', '370px');
        }
        if ($('.dsrules') && ds_error) {
            $('.left').eq(0).css('height', '445px');
        }
    }

    if ($.trim($('.error').eq(0).html()) != "") {
        $('.error').eq(0).css('display', 'block');
    }

    $('body').css('backgroundColor', '#f2f3f4');

    $('p').eq(0).css('display', 'none');

    $('#accountpassword').removeAttr('oncut');
    $('#accountpassword').removeAttr('onpaste');
    $('#accountpassword').removeAttr('oncopy');
});


$(function() {

    // Resize tables
    $('table').attr('width', '100%');

    // Deal with pre-existing error messages


    function AuthFields() { this.init(); }

    AuthFields.prototype = {
        authContainer: $('.box.sign-in'),
        emailField: $('input#accountname'),
        passwordField: $('input#accountpassword'),
        inputFields: $('input#accountname, input#accountpassword'),
        emailRegex: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        msgContainer: $('.box-msg'),
        oldSubmitBtn: $('input[alt="Sign In"]'),

        messages: {
            "signOutCompleted": l10login.signedOut || "You have successfully signed out.",
              "sessionExpired": l10login.sessionExpired || "Your session has expired."
        },

        SHAKE_BOX_ON_ERROR: false,
        RETURN_KEY_SUBMITS_FORM: true,
        CLEAN_UP_QUERY_STRINGS: true,

        init: function() {
            var _ = this;
            _.modifyFormDOM();
            _.updateMessages();
            _.attachEventListeners();
            _.emailField.focus();

            // Periodically check for input values -- this will detect browser auto-fill
            _.validationChecker = setInterval(function() {
                _.updateButtonState();
            }, 250);
        },

        // Determines which message to display, if any
        //
        // case 1. Messages designated by query string (session expired, etc.)
        // case 2. Messages included via WO (login failures, etc.)
        updateMessages: function() {
            var _ = this;
            var URL = $(location).attr('href');
            var query = URL.split('?');
            if (query.length > 1) {
                var param = query[1];
                _.setMessage(_.messages[param] || '');
            } else {
                var existingErrors = $('.dserror');
                if (existingErrors.length > 0) {
                    var errorText = $('.dserror').text();
                    $('.box-msg').html(errorText).show();
                    
                    if (/email/.test(errorText) && /changed/.test(errorText)) $('.box-msg').removeClass('error');
                    if (errorText.length > 50) $('.box-msg').removeClass('reduced-width').addClass('long-text');
                }
            }
        },

        // Displays a message inside the $('.box-msg') container
        setMessage: function(message) {

            var _ = this,
                long_msg_text = (message.length > 50);

            if (typeof message === 'string' && message.length > 0) {
                _.msgContainer.html(message).show().removeClass('error reduced-width');
            }

            if (history.pushState && _.CLEAN_UP_QUERY_STRINGS) {
                var url = window.location.href;
                if (url.indexOf('?')) {
                    var baseURL = url.substr(0, url.indexOf('?'));
                    window.history.pushState({
                        path: baseURL
                    }, '', baseURL);
                }
            }
        },

        // Enables login button when valid-looking credentials have been entered
        updateButtonState: function() {
            var _ = this;
            return _.isValidInput() ? _.enableButton() : _.disableButton();
        },

        // Tests validity of email/password (e.g. correct email format, non-empty password)
        isValidInput: function() {
            var _ = this;
            var email = _.emailField.val();
            var password = _.passwordField.val();
            if (typeof email !== 'string' || typeof password !== 'string') {
                return false;
            }
            var isEmailValid = true;
            // var isEmailValid = _.emailRegex.test(email); // Disabling to allow for non-email-type usernames
            var isPasswordValid = (password.length >= 6);
            return (isEmailValid && isPasswordValid);
        },

        // Performs modifications to the DOM provided by DSAuthentication
        // Localized strings here are pulled from Main.html
        modifyFormDOM: function() {
            var _ = this;
            _.emailField.attr('placeholder',    l10login.appleID  || 'Apple ID');
            _.passwordField.attr('placeholder', l10login.password || 'Password');
            _.button = $('<a class="btn-signin enabled">'+(l10login.signIn || 'Sign In')+'</a>').insertAfter(_.passwordField);
            _.updateButtonState();

            // Add error message container, if it doesn't exist
            if (_.msgContainer.length === 0) {
                var msgBox = '<div class="box-msg error" style="display: none"></div>';
                _.msgContainer = $(msgBox).insertAfter('#ds_container form');
            }
        },

        // Make the form interactive (keyup/down listeners, click events)
        attachEventListeners: function() {
            var _ = this;

            // Enable/disable button when user modifies form
            _.inputFields.keyup(function(e) {
                var k = e.keyCode || e.which;
                if (k === 8 || (k > 45 && k < 91) || (k > 93 && k < 112) || (k > 145)) {
                    _.updateButtonState();
                }

                // Allow 'Return' key to submit the form
            }).keypress(function(e) {
                var k = e.keyCode || e.which;
                if (k === 13) {
                    e.preventDefault();
                    if (!_.isValidInput() && _.SHAKE_BOX_ON_ERROR) {
                        _.indicateError();
                    }
                    _.submitForm();
                    return false;
                }
            });
            
            if (_.oldSubmitBtn) {
                _.oldSubmitBtn.on('click', _.activateSpinner)
                $('input[alt="Sign In"]').on('click', _.activateSpinner)
            }

            _.button.click(_.submitForm);
        },

        // Click the (hidden) DSAuth button to submit the form
        submitForm: function() {
            var _ = this;
            (_.oldSubmitBtn) ?
                _.oldSubmitBtn.click() :
                $('input[alt="Sign In"]').click();
                
            _.activateSpinner();
        },
        
        activateSpinner: function() {
            var _ = this;
            if (!_.button || _.button.length < 1) {
                _.button = $('.btn-signin');
            }
            _.button.addClass('spinning');
        },

        enableButton: function() {
            this.button.addClass('enabled');
        },

        disableButton: function() {
            this.button.removeClass('enabled');
        },

        indicateError: function() {
            var _ = this;
            _.authContainer.addClass('animated');
            setTimeout(function() {
                _.authContainer.removeClass('animated');
            }, 600);
        }
    };

    var auth = new AuthFields();
});


