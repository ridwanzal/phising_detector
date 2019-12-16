var Validation = {
    'blank': function(elem, errorCallback){
        if(elem.val() == '' || elem.val() == undefined || elem.val() == null){
            if(errorCallback){
                errorCallback();
            }
            return false;
        }
        return true;
    },
    'number': function(elem, errorCallback){
        var elemVal = elem.val();
        try {
            if(isNaN(elemVal) || elemVal.indexOf('.') > -1 || elemVal.indexOf('-') > -1){throw {message: 'not a number'};};
            return true;
        } catch(er){
            if(errorCallback){
                errorCallback();
            }
            return false;
        }
    },
    'minLength': function(elem, length, errorCallback){
        if(elem.val().length < parseInt(length)){
            if(errorCallback){
                errorCallback();
            }
            return false;
        }
        return true;
    },
    'maxLength': function(elem, length, errorCallback){
        if(elem.val().length > parseInt(length)){
            if(errorCallback){
                errorCallback();
            }
            return false;
        }
        return true;
    },
    'exactLength': function(elem, length, errorCallback){
        if(elem.val().length != parseInt(length)){
            if(errorCallback){
                errorCallback();
            }
            return false;
        }
        return true;
    },
    'length': function(elem, length, message){
        if(elem.val().length < parseInt(length)){
            return false;
        }
        return true;
    },
    'email': function(elem, message){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(elem.val())){
            return false;
        }
        return true
    },
    'noMatch': function(elem, elem2, message){
        if(elem.val() == elem2.val()){
            elem2.attr('addMain', 'false');
            return false;
        }
        return true;
    },
    'match': function(elem, elem2, message){
        if(elem.val() != elem2.val()){
            if(elem.attr('type') == 'password' || elem.attr('readonly') == true){
                elem.val('');
                elem2.val('');
            }
            elem2.attr('addMain', 'false');
            return false;
        }
        return true;
    },
    'zeros': function(elem, message){
        var re = /^([0])\1*$/;
        if(re.test(elem.val())){
            return false;
        }
        return true
    },
    'selection': function(elem, message){
        if(elem[0].selectedIndex == 0){
            return false;
        }
        return true;
    },
    'selections': function(elem1, elem2, message){
        if(elem1[0].selectedIndex == 0 || elem2[0].selectedIndex == 0){
            return false;
        }
        return true;
    },
    'oneLetter': function(elem, message){
        var re = /[a-zA-Z]/;
        if(!re.test(elem.val())){
            return false;
        }
        return true;
    },
    'oneLetterAndNumber': function(elem, message){
        var re = /(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+/;
        if(!re.test(elem.val())){
            return false;
        }
        return true;
    },
    'noSpaces': function(elem, message){
        var re = / /;
        if(re.test(elem.val()) || elem.val().length == 0){
            return false;
        }
        return true;
    },
    'dashUnderscore': function(elem, message){
        var re = /[^\w-]/;
        if(re.test(elem.val().replace(' ', '')) || elem.val().length == 0){
            return false;
        }
        return true;
    },
    'numbers': function(elem, count, message){
        var numInts = 0;

        var re = /\d/;

        for(var i = 0; i < elem.val().length; i++){
            var char = elem.val().charAt(i);
            if(re.test(char)){
                numInts++;
            }
        }

        if(numInts > count || elem.val().length == 0){
            return false;
        }

        return true;
    },
    'continuousCharacters': function(elem, length, message){
        var re = /(.)\1{3,}/ //RegExp(expression, 'i');
        if(re.test(elem.val()) || elem.val().length == 0){
            return false;
        }

        return true;
    },
    'fourSequential': function(elem, message){
        var expression = [];
        expression.push('0123|1234|2345|3456|4567|5678|6789|3210|4321|5432|6543|7654|8765|9876|');
        expression.push('abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz|');
        expression.push('zyxw|yxwv|xwvu|wvut|vuts|utsr|tsrq|srqp|rqpo|qpon|ponm|onml|nmlk|mlkj|lkji|kjih|jihg|ihgf|hgfe|gfed|fedc|edcb|dcba|');
        expression.push('ABCD|BCDE|CDEF|DEFG|EFGH|FGHI|GHIJ|HIJK|IJKL|JKLM|KLMN|LMNO|MNOP|NOPQ|OPQR|PQRS|QRST|RSTU|STUV|TUVW|UVWX|VWXY|WXYZ|');
        expression.push('ZYXW|YXWV|XWVU|WVUT|VUTS|UTSR|TSRQ|SRQP|RQPO|QPON|PONM|ONML|NMLK|MLKJ|LKJI|KJIH|JIHG|IHGF|HGFE|GFED|FEDC|EDCB|DCBA');

        var re = RegExp(expression.join(''), 'i');

        if(re.test(elem.val()) || elem.val().length == 0){
            return false;
        }

        return true;
    },
    'fakeNumber': function(elem, message){
        var expression = [];
        expression.push('^');
        expression.push('(123456789|987654321)$');

        var re = RegExp(expression.join(''), 'i');

        if(re.test(elem.val())){
            return false;
        }

        return true;
    },
    'creditCardNumber' : function(elem, message){
        var re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/

        return re.test(elem.val());
    },
    'securityCode' : function(elem, message){
        var re = /^[0-9]{3,4}$/;

        return re.test(elem.val());
    },
    'expirationDate': function(date) {
        var expDate;
        var now = $.now();
        if(date.month.val() !== "MM" && date.year.val() !== "YYYY") {
            expDate = new Date(date.year.val(), date.month.val() - 1);

            return now < expDate;
        }
    },
    'numbersOnly': function(elem, count){
        var re = new RegExp('\\d{'+ (count ? count : elem.val().length) +'}');

        return re.test(elem.val());
    },
    'date': function(date){
        var re = /^([1-9]|0[1-9]|1[012])[- /.]([1-9]|0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

        return re.test(date);
    }
}
