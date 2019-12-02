function validNumberField(field, e, nextField) {
    var key;
    var keychar;
    if (window.event) {
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return true;
    }
    keychar = String.fromCharCode(key);
    if ( (key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) ) {
        return true;
    } else if ( ("0123456789").indexOf(keychar) > -1 ) {
        return true;
    } else if ( nextField && (keychar == ".") ) {
        nextField.focus();
        return false;
    }
    return false;
}
function NumbersOnly(field, e, nextField) {
    return validNumberField(field, e, nextField);
}
function validDateField(field, e) {
    var key;
    var keychar;
    if (window.event) {
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return true;
    }
    keychar = String.fromCharCode(key);
    if ( (key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) ) {
        return true;
    } else if ( ("0123456789-").indexOf(keychar) > -1 ) {
        return true;
    }
    return false;
}

function toggleCheckBoxes( field, on_off ) {

    fieldname = field + "[0].checked";

    for (i = 0; document.forms[0].elements[ fieldname ]; i++) {
        document.forms[0].elements[ fieldname ].checked =  on_off;
        fieldname = field +"["+ i +"].checked";
    }
}

function selectoneCheckBox(field, index ){
    var i =  0;
    do {
        fieldname = field + '['+ i +'].checked';
        if (document.forms[0].elements[ fieldname ]) {
            document.forms[0].elements[ fieldname ].checked = (i== index);
        }
        i++;
    } while ( document.forms[0].elements[ fieldname ] );

}

function selectCheckBox(field, index ) {
    fieldname = field + '['+ index +'].checked';
    if (document.forms[0].elements[ fieldname ]) {
        document.forms[0].elements[ fieldname ].checked = true;
    }
}

submitcount = 0;
function submitOnce() {                     
    if (submitcount == 0) {
        submitcount++;
        return true;
    } else {
        alert("This form has already been submitted.");
        return false;
    }
}
