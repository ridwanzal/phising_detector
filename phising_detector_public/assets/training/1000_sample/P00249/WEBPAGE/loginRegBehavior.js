$jq.namespace('MatchCore.UI');

MatchCore.UI.Messaging = function() {
    var _messages = null;

    var hasMessageSummary = function() {
        return $jq('#facebook-modal .errorMessageSummary').length > 0;
    };

    var getMessageSummary = function() {
        return $jq('#facebook-modal .errorMessageSummary');
    };

    var hasFieldLevelError = function(fieldName) {
        return $jq('.error_' + fieldName).length > 0;
    };

    var getFieldLevelError = function(fieldName) {
        return $jq('.error_' + fieldName).filter('.fieldError');
    };

    return {
        reset: function() {
            if (hasMessageSummary) {
                getMessageSummary().html('');
                getMessageSummary().hide();
            }

            $jq('.fieldError').each(function() {
                $jq(this).hide();
            });

            if (_messages) {
                for (var i = 0; i < _messages.length; i++) {
                    var field = $jq('#facebook-modal INPUT[name="' + _messages[i].field + '"]')[0];
                    var label = $jq('#facebook-modal LABEL[for="' + _messages[i].field + '"]')[0];

                    $jq(label).removeClass('invalidFieldLabel');
                    $jq(field).removeClass('invalidField');
                }
            }

            _messages = null;
        },

        show: function(messages, container) {
            this.reset();

            _messages = messages;

            if (hasMessageSummary()) {
                getMessageSummary().html('<ul></ul>');
                getMessageSummary().show();
            }

            for (var i = 0; i < messages.length; i++) {
                if (messages[i].Field) {
                    var field = $jq('#facebook-modal INPUT[name="' + messages[i].Field + '"]');
                    var label = $jq('#facebook-modal LABEL[for="' + messages[i].Field + '"]');

                    label.addClass('invalidFieldLabel');
                    field.addClass('invalidField');
                    if (i == 0 && field.length > 0)
                        field.focus();

                    if (hasFieldLevelError(messages[i].Field)) {
                        var fieldError = getFieldLevelError(messages[i].Field);

                        fieldError.html(messages[i].Text);
                        fieldError.show();
                    }
                }

                if (hasMessageSummary())
                    $jq('UL', getMessageSummary()[0]).append('<li>' + messages[i].Text + '</li>');

            }
        }
    };
} ();

MatchCore.UI.Registration = function () {
    var _container, _handle, _password, _email, _birthDay, _birthMonth, _birthYear, _ageSeekLow, _ageSeekHigh, _postalCode, _countryCode = 0, _cityCode = 0, _stateCode = 0,
     _gender = 1, _genderSeek = 2, _phoneAreaCode = "", _phoneNumber = "", _emailMatchInfo = true, _emailNewsOffers = false, _emailPartners = false, _platinumContact = false,
    _failureHandler, _successHandler;
    var _failureDelegate = new MatchCore.Delegate();
    var _successDelegate = new MatchCore.Delegate();
    var _busy = false;

    var populateForm = function () {
        var gender = ($jq.readCookie('MatchSearch') != undefined && $jq.readCookie('MatchSearch')['SC01'] != undefined) ? $jq.readCookie('MatchSearch')['SC01'] : "1";
        var genderSeek = ($jq.readCookie('MatchSearch') != undefined && $jq.readCookie('MatchSearch')['SC02'] != undefined) ? $jq.readCookie('MatchSearch')['SC02'] : "2";
        var ageSeekLow = ($jq.readCookie('MatchSearch') != undefined) ? $jq.readCookie('MatchSearch')['SC03'] : null;
        var ageSeekHigh = ($jq.readCookie('MatchSearch') != undefined) ? $jq.readCookie('MatchSearch')['SC04'] : null;

        $jq('#formRegistration INPUT[name="gender"][value="' + gender + '"]', _container).attr("checked", "checked");
        $jq('#formRegistration INPUT[name="genderSeek"][value="' + genderSeek + '"]', _container).attr("checked", "checked");


        if (($jq('#formRegistration select[name="ageSeekLow"]', _container).length) == 1)
            $jq('#formRegistration select[name="ageSeekLow"]', _container).val(ageSeekLow).selected = true;
        else
            $jq('#formRegistration INPUT[name="ageSeekLow"]', _container).val(ageSeekLow);


        if (($jq('#formRegistration select[name="ageSeekHigh"]', _container).length) == 1)
            $jq('#formRegistration select[name="ageSeekHigh"]', _container).val(ageSeekHigh).selected = true;
        else
            $jq('#formRegistration INPUT[name="ageSeekHigh"]', _container).val(ageSeekHigh);

        try {
            $jq('#formRegistration select[name="gender"]', _container).val(gender).selected = true;
            $jq('#formRegistration select[name="genderSeek"]', _container).val(genderSeek).selected = true;
        }
        catch (e) { }

        var postcode = $jq.readCookie('MatchSearch') != undefined ? $jq.readCookie('MatchSearch')['SC08'] : '';
        if (postcode != undefined && postcode != '') {
            if (IsValidPostalCodeFormat(postcode))
                $jq('#formRegistration INPUT[name="postalCode"]', _container).val(postcode);
        }

    }

    var consumeForm = function() {
        _handle = $jq('#formRegistration INPUT[name="handle"]', _container).val();
        _password = $jq('#formRegistration INPUT[name="password"]', _container).val();
        _email = $jq('#formRegistration INPUT[name="email"]', _container).val();
        _birthDay = $jq('#formRegistration select[name="birthDay"]', _container).val();
        _birthMonth = $jq('#formRegistration select[name="birthMonth"]', _container).val();
        _birthYear = $jq('#formRegistration select[name="birthYear"]', _container).val();
        _ageSeekLow = ($jq('#formRegistration SELECT[name="ageSeekLow"]', _container).length) == 1 ? ($jq('#formRegistration SELECT[name="ageSeekLow"]', _container).val()) : ($jq('#formRegistration INPUT[name="ageSeekLow"]:checked', _container).val());
        _ageSeekHigh = ($jq('#formRegistration SELECT[name="ageSeekHigh"]', _container).length) == 1 ? ($jq('#formRegistration SELECT[name="ageSeekHigh"]', _container).val()) : ($jq('#formRegistration INPUT[name="ageSeekHigh"]:checked', _container).val());
        _postalCode = $jq('#formRegistration INPUT[name="postalCode"]', _container).val();
        
        // Sorry, bad code creates bad code fixes.
        _countryCode = ($jq('#formRegistration select[name="countryCode"]').length == 1)
            ? _countryCode = $jq('#formRegistration select[name="countryCode"]').val()
            : _countryCode = $jq('#formRegistration INPUT[name="countryCode"]').val();

        _stateCode = $jq('#formRegistration select[name="stateCode"]', _container).val();
        _cityCode = $jq('#formRegistration select[name="cityCode"]', _container).val();
        _gender = ($jq('#formRegistration SELECT[name="gender"]', _container).length) == 1 ? ($jq('#formRegistration SELECT[name="gender"]', _container).val()) : ($jq('#formRegistration INPUT[name="gender"]:checked', _container).val());
        _genderSeek = ($jq('#formRegistration SELECT[name="genderSeek"]', _container).length) == 1 ? ($jq('#formRegistration SELECT[name="genderSeek"]', _container).val()) : ($jq('#formRegistration INPUT[name="genderSeek"]:checked', _container).val());


        if ($jq('#formRegistration INPUT[name="phoneAreaCode"]', _container).val() != null) {
            _phoneAreaCode = $jq('#formRegistration INPUT[name="phoneAreaCode"]', _container).val().replace(" ", "", "gi");
        }
        if ($jq('#formRegistration INPUT[name="phoneNumber"]', _container).val() != null) {
            _phoneNumber = $jq('#formRegistration INPUT[name="phoneNumber"]', _container).val().replace(" ", "", "gi");
        }

        if (document.getElementById('emailMatchInfo', _container) != null) {
            _emailMatchInfo = ($jq('#formRegistration INPUT[name="emailMatchInfo"]:checked', _container).val() != null);
        }
        _emailNewsOffers = ($jq('#formRegistration INPUT[name="emailNewsOffers"]:checked', _container).val() != null);
        _emailPartners = ($jq('#formRegistration INPUT[name="emailPartners"]:checked', _container).val() != null);
        _platinumContact = ($jq('#formRegistration INPUT[name="platinumContact"]:checked', _container).val() != null);

    }
    var failure = function (response) {
        if (_failureDelegate.count() > 0)
            _failureDelegate.fireAndPreserve(response);
        else
            MatchCore.UI.Messaging.show(response.Messages);
    }

    var success = function (response) {
        if (_successDelegate.count() > 0) {
            _successDelegate.fireAndPreserve(response);
    }
    }

    var createSearchCookie = function () {
        var hash;
        if ($jq.readCookie('MatchSearch') == undefined) {
            hash = [];
            hash['SC07'] = "20"; // 20 miles is default search distance from existing reg, so going with that if no search cookie exists
        }
        else {
            hash = $jq.readCookie('MatchSearch');
        }
        hash['SC01'] = _gender;
        hash['SC02'] = _genderSeek;
        hash['SC03'] = _ageSeekLow;
        hash['SC04'] = _ageSeekHigh;
        hash['SC08'] = _postalCode;
        $jq.createCookie('MatchSearch', hash, false, true);
    }

    var USPostalCodeRegex = /^[0-9]{5}$/;
    var CanadianPostalCodeRegex = /^[ABCEGHJKLMNPRSTVXY][0-9][A-Z][\s]*[0-9][A-Z][0-9]$/;
    var UKFullPostalCodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[\s]*[0-9][ABDEFGHJLNPQRSTUWXYZ]{2}$/;
    var UKPartialPostalCodeRegex1 = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[\s]+[0-9]$/;
    var UKPartialPostalCodeRegex2 = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?$/;
    var UKPartialPostalCodeRegex3 = /^[A-Z]{1,2}$/;

    var IsValidPostalCodeFormat = function (postalCode) {

        try {
            postalCode = postalCode.toUpperCase();

            if (USPostalCodeRegex.test(postalCode)) return true;

            else if (CanadianPostalCodeRegex.test(postalCode)) return true;

            else if (UKFullPostalCodeRegex.test(postalCode)) return true;

            else if (UKPartialPostalCodeRegex1.test(postalCode) || UKPartialPostalCodeRegex2.test(postalCode) || UKPartialPostalCodeRegex3.test(postalCode)) {
                return true;
            }
        }
        catch (e) { return false; }

        return false;

    }

    return {
        init: function (opts) {
            if (opts) {
                _container = opts.container;
                if (opts.fail)
                    _failureDelegate.add(opts.fail);

                if (opts.success)
                    _successDelegate.add(opts.success);
            }

            $jq('.btnRegisterBehav', _container).bind('click', this.submit);
            MatchCore.CP.CurrentUser.onReady(function () {
                if (!MatchCore.CP.CurrentUser.LoggedIn() && MatchCore.CP.CurrentUser.Registered()) {
                    $jq('#formLogin INPUT[name="handle"]', _container).val(MatchCore.CP.CurrentUser.Handle());
                }
            });
            populateForm(function () {
                return;
            });
        },

        submit: function () {
            if (!MatchCore.CP.CurrentUser.LoggedIn()) {
                consumeForm();
                var errors = [];

                if (_handle == null || _handle == '') {
                    errors.push({ Field: "handle", Text: MatchCore.CP.ClientMessages.RegHandle });
                }
                if (_password == null || _password == '') {
                    errors.push({ Field: "password", Text: MatchCore.CP.ClientMessages.RegPassword });
                }
                if (_email == null || _email == '') {
                    errors.push({ Field: "email", Text: MatchCore.CP.ClientMessages.RegEmail });
                }
                if (_birthDay == "0" && _birthMonth == "0" && _birthYear == "0") {
                    errors.push({ Field: "birthDay", Text: MatchCore.CP.ClientMessages.RegBirthGeneric });
                }
                else {
                    if (_birthDay == null || _birthDay == '0') {
                        errors.push({ Field: "birthDay", Text: MatchCore.CP.ClientMessages.RegBirthDay });
                    }
                    if (_birthMonth == null || _birthMonth == '0') {
                        errors.push({ Field: "birthMonth", Text: MatchCore.CP.ClientMessages.RegBirthMonth });
                    }
                    if (_birthYear == null || _birthYear == '0') {
                        errors.push({ Field: "birthYear", Text: MatchCore.CP.ClientMessages.RegBirthYear });
                    }
                }
                if (_countryCode != 1 && _countryCode != 2 && _countryCode != 224)
                    _postalCode = '';

                if (_postalCode != undefined) {
                    if (_postalCode == null || _postalCode == '' && (_countryCode == 1 || _countryCode == 2 || _countryCode == 224))
                        errors.push({ Field: "postalCode", Text: MatchCore.CP.ClientMessages.RegPostalcode });
                }
                else
                    _postalCode == '';

                if (_ageSeekLow == undefined) {
                    _ageSeekLow = $jq.readCookie('MatchSearch') != undefined ? $jq.readCookie('MatchSearch')['SC03'] : 25;
                }
                if (_ageSeekHigh == undefined) {
                    _ageSeekHigh = $jq.readCookie('MatchSearch') != undefined ? $jq.readCookie('MatchSearch')['SC04'] : 45;
                }

                if (isNaN(parseInt(_countryCode))) {
                    _countryCode = 0;
                }
                if (isNaN(parseInt(_stateCode))) {
                    _stateCode = 0;
                }
                if (isNaN(parseInt(_cityCode))) {
                    _cityCode = 0;
                }

                if (_gender == undefined) {
                    _gender = $jq.readCookie('MatchSearch') != undefined ? $jq.readCookie('MatchSearch')['SC01'] : 1;
                }
                if (_genderSeek == undefined) {
                    _genderSeek = $jq.readCookie('MatchSearch') != undefined ? $jq.readCookie('MatchSearch')['SC02'] : 2;
                }
                if (_phoneAreaCode == undefined) {
                    _phoneAreaCode = "";
                }
                if (_phoneNumber == undefined) {
                    _phoneNumber = "";
                }

                var PhoneNumber = _phoneAreaCode + _phoneNumber;
                if (PhoneNumber !== "") {
                    var PhoneNumberRegex = /^[0-9]{10}$/;
                    if (!PhoneNumberRegex.test(PhoneNumber)) {
                        errors.push({ Field: "phoneNumber", Text: "Oops! The mobile number you entered is not valid." });
                    }
                }

                if (_emailMatchInfo == undefined) {
                    _emailMatchInfo = true;
                }
                if (_emailNewsOffers == undefined) {
                    _emailNewsOffers = true;
                }
                if (_emailPartners == undefined) {
                    _emailPartners = true;
                }
                if (_platinumContact == undefined) {
                    _platinumContact = false;
                }
                if (errors.length > 0) {
                    failure({ "Messages": errors });
                    return;
                }

                var postData = {
                    "sid": MatchCore.CP.SID(),
                    "theme": MatchCore.CP.Theme(),
                    "handle": _handle,
                    "password": _password,
                    "email": _email,
                    "birthDay": _birthDay,
                    "birthMonth": _birthMonth,
                    "birthYear": _birthYear,
                    "postalCode": _postalCode,
                    "countryCode": _countryCode,
                    "stateCode": _stateCode,
                    "cityCode": _cityCode,
                    "gender": _gender,
                    "genderSeek": _genderSeek,
                    "phoneAreaCode": _phoneAreaCode,
                    "phoneNumber": _phoneNumber,
                    "emailMatchInfo": _emailMatchInfo,
                    "emailNewsOffers": _emailNewsOffers,
                    "emailPartners": _emailPartners,
                    "platinumContact": _platinumContact,
                    "pageID": MatchCore.CP.PageID(),
                    "pageVersion": MatchCore.CP.PageVersion()
                };

                MatchCore.CP.ui_busy();

                MatchCore.CP.Services.invoke({
                    method: 'Register',
                    data: postData,
                    verb: 'POST',
                    success: function (response) {
                        MatchCore.CP.ui_done();

                        if (response.Success) {
                            MatchCore.CP.Services.persistCookies(response);
                            createSearchCookie();
                            success(response);
                        }
                        else
                            failure(response);
                    },
                    failure: function (response) {
                        MatchCore.CP.ui_done();
                        failure({ "Messages": [{ Text: "There was a problem submitting your registration information."}] });
                    }
                });
            }
            else {
                success({ Success: true });
            }
        },

        onSuccess: function (handler) {
            _successDelegate.add(handler);
        },

        onFailure: function (handler) {
            _failureDelegate.add(handler);
        }
    };
}

MatchCore.UI.Login = function () {
    var _handle;
    var _container;
    var _password;
    var _rememberMe = false;
    var _failureDelegate = new MatchCore.Delegate();
    var _successDelegate = new MatchCore.Delegate();
    var _busy = false;

    var consumeForm = function() {
        _handle = $jq('#formLogin INPUT[name="handle"]', _container).val();
        _password = $jq('#formLogin INPUT[name="password"]', _container).val();
        _rememberMe = ($jq('#formLogin INPUT[name="rememberMe"]:checked', _container).val() != null);
    }

    var failure = function (response) {
        if (_failureDelegate.count() > 0)
            _failureDelegate.fireAndPreserve(response);
        else
            MatchCore.UI.Messaging.show(response.Messages);
    }

    var success = function (response) {
        if (_successDelegate.count() > 0) {
            _successDelegate.fireAndPreserve(response);
    }
    }

    return {
        init: function (opts) {
            if (opts) {
                _container = opts.container;
                if (opts.fail)
                    _failureDelegate.add(opts.fail);

                if (opts.success)
                    _successDelegate.add(opts.success);
            }

            $jq('.btnLoginBehav', _container).bind('click', this.submit);

            MatchCore.CP.CurrentUser.onReady(function () {
                if (!MatchCore.CP.CurrentUser.LoggedIn() && MatchCore.CP.CurrentUser.Registered()) {
                    $jq('#formLogin INPUT[name="handle"]', _container).val(MatchCore.CP.CurrentUser.Handle());
                }
            });
        },

        submit: function () {
            consumeForm();
            var errors = [];

            if (_handle == null || _handle == '') {
                errors.push({ Field: "handle", Text: MatchCore.CP.ClientMessages.LoginHandle });
            }

            if (_password == null || _password == '') {
                errors.push({ Field: "password", Text: MatchCore.CP.ClientMessages.LoginPassword });
            }

            if (errors.length > 0) {
                failure({ "Messages": errors });
                return;
            }

            var postData = {
                "handle": _handle,
                "password": _password,
                "remember": _rememberMe,
                "sid": MatchCore.CP.SID(),
                "theme": MatchCore.CP.Theme()
            };

            if (!MatchCore.CP.CurrentUser.LoggedIn()) {
                MatchCore.CP.ui_busy();
                MatchCore.CP.Services.invoke({
                    method: 'Login',
                    data: postData,
                    verb: 'POST',
                    success: function (response) {
                        MatchCore.CP.ui_done();
                        if (response.Success) {
                            MatchCore.CP.Services.persistCookies(response);
                            var loginCount = ($jq.readCookie('IsRegisteredLoginCounter') != null) ? parseInt($jq.readCookie('IsRegisteredLoginCounter')) : 0;
                            loginCount++;
                            $jq.createCookie('IsRegisteredLoginCounter', loginCount.toString());
                            if (response.RedirectUrl) {
                                window.location.href = response.RedirectUrl;
                            }
                            else {
                                success(response);
                            }
                        }
                        else {
                            failure(response);
                        }
                    },
                    failure: function (response) {
                        MatchCore.CP.ui_done();
                        failure({ "Messages": [{ Text: "There was a problem submitting your login information."}] });
                    }
                });
            }
            else {
                success({ "Success": true, "Messages": [{ Text: "Already logged in."}] });
            }

        },

        onSuccess: function (handler) {
            _successDelegate.add(handler);
        },
        onFailure: function (handler) {
            _failureDelegate.add(handler);
        }
    };
} 


