//<style type="text/css">
//.popupmessage, #popupmessage {
//  position: absolute; left: 100px; top: 10px;
//  width: 200px;
//  color: black;
//  background-color: white;
//  font-weight: bold;
//  border: solid red 3px;
//  padding: 1em;
//}
//</style>

// *********************************************************************
// wfwiblib.js - A single library included as part of all pages with
//               various utility functions
// *********************************************************************

// **********************************************************************
// Reusable, robust window opener
//   Credits: http://devedge.netscape.com/viewsource/2002/popup-control/
// **********************************************************************
// Notes:
//  The onLoad event handler is the target of most window suppression mechanisms.
//  MSIE versions through 6.0 do not support this suppression, although add-ins may.
//  Mozilla 1.1x+ provides a preference for "Advanced - Scripts &amp; Plugins", deselect,
//                Allow Scripts to: Open unrequested windows.
//         Furthermore, if you and edit prefs.js you can suppress a great deal.
// Other articles pertaining to browser preferencs/windows:
//    http://www.mozilla.org/unix/customizing.html
//    http://www.mozilla.org/projects/security/components/ConfigPolicy.html
//  Opera 7.x provides the greatest/easiest degree of control over scripting, windows, frames, etc.
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// Usage:
//
// This example takes all the defaults, and takes the href object as the url.
//
// onClick event Handler
//   <p>Clicking a <a href="popped-child.html"
//    onClick="wfOpenWin(this); return false;">demonstration</a>
//    link will open a new browser</p>
//
// -----------------------------------------------------------------------

function wfOpenWin(url, wname, wfeatures) {
  //
  // where the parameters are:
  //   url = the url of the child window
  //   wname = window name
  //   wfeatures = window features: browser chrome, window position [defaults to 300x300 chromeless window]
  //
  // if pop-up window open succeeded then false is returned so that href attribute is suppresed. IF pop-up window open fails true is returned so that href takes precedence and the link opens in the same parent window.
  newwin = '';

   // add some parameter checking and reasonable defaults
   if (!wname) {
     wname = 'Help';
   }
   if (!wfeatures) {
     // with the exception of height/width (<400) other chrome per WRD recommendations
     wfeatures = 'height=300,width=300,toolbar=no,locationbar=no,personalbar=no,menubar=yes,status=yes,resizable=yes';
   }
   if (!url) {
     url = 'about:blank';
   }

   // attempt to open the popup
   if ( hasTryCatch() ){
     // any browser that can suppress window pop-ups, is modern enough to have JS 1.5/EcmaScript 3rd ed.
     // hide the try from NN4.x since it can not compile the script if it "sees" it
     eval("try { newwin = window.open(url, wname, wfeatures); } catch (e) { newwin = ''; }");
   } else {
     // older browsers that don't JS 1.5 also do not support window suppression
     newwin = window.open(url, wname, wfeatures);
   }

  // check results
  if (newwin !== '') {
    // popup succeeded
    // Notes: Opera was causing unknown errors on focusing. This will bypass the problem, but won't bring the child into focus.
    //        When Opera preferences set to: Pop-ups=Refuse pop-ups, will supress window.open calls altoghether and return true,
    //          so that the link is followed.
    if (!window.opera) {newwin.focus();}
  } else {
    // popup failed
//    showPopUpMsg(url);
      return true;
  }
  return false;
}

//
// Used by: wfOpenWin
//
function showPopUpMsg(url) {
  // intialize some stuff
  var cname = 'popupmessage';
  var warningtext ='Your computer settings do not allow other browser windows to open, which prevents our site from working properly.';
  warningtext += '<a href="'+url+'" onclick="wfOpenWin( \''+url+'\');hidePopupMessage(); return true;">';
  warningtext += '<p>Open the page in this window' + '<\/a>.<\/p>';
  warningtext += '<p align="center">' + '<a href="#" onclick="hidePopupMessage(); return false;">Close this message<\/a><\/p>';
  warningtext += '<\/div>';

  // test for DOM support
  if (!document.createElement) {
    return;
  }
   // make us an element
   var elmDiv = document.createElement('div');

   // check on datatyping
   if (typeof(elmDiv.innerHTML) != 'string') {
     return;
   }

   // add properties to new element
   elmDiv.id='popupmessage';
   elmDiv.style.className=cname;

   // add the element to the page
   document.body.appendChild(elmDiv);
   elmDiv.innerHTML=warningtext;
}

//
// Used by: showPopUpMessage
//
function hidePopupMessage() {
  var elmDiv=document.getElementById('popupmessage');
  if (elmDiv) {
    elmDiv.parentNode.removeChild(elmDiv);
  }
}

//
// test language for try/catch ... JavaScript 1.5 functionality
// known not to be available in NN4.x, MSIE 4.x, who-knows-what-else
//
function hasTryCatch () {
  // initialize try/catch boolean exit value
  var tc = false;

  // NN4 can't seem to handle the test for the language feature, so just bail
  if (document.layers) {
    return tc
  }

  // suppress error report while we test for language feature
  window.onerror=function(){onerror=null;return true;};
  eval('try{} finally{tc=true;}');
  window.onerror=null;

  // test complete
  return tc;
}


// ***********************************************************************************
// CALCULATOR SPECIFIC JS
// ***********************************************************************************
var calculatorGlobalMonthlyTargetAmount = 0;
var calculatorGlobalTargetAmount = 0;

function changeDisplayState(id)
{
    var obj = document.getElementById(id)

    //alert("changeDisplayState, obj.style.display="+obj.style.display);
    if (obj.style.display == 'none')
    {    	    	
        if (navigator.appName.indexOf("Microsoft")!= -1)
        {
            obj.style.display = 'block';
        }
        else
        {
            obj.style.display = 'table';
        }
    }
    else
    {    	    	
        obj.style.display = 'none'
    }
}

// called from JSP
function showCalculator(evt) {

    evt = (evt) ? evt : event;
    if (evt) {
    	if (document.getElementById("calculator").style.visibility != "visible") {
    	    var elem = (evt.target) ? evt.target : evt.srcElement;
            // enter on the anchor generates an onclick event but
            // getElementPosition return 0,0 for the coords, so we
            // use the child image to get the coordinates.
            if (elem.nodeType == 1 && elem.tagName.toUpperCase() == 'A')
            {
                var lstImage = elem.getElementsByTagName('IMG');
                if (lstImage.length > 0) {
                    elem = lstImage[0];
                }
            }
    	    var position = getElementPosition(elem.id);
            shiftTo("calculator", position.left + elem.offsetWidth, position.top);
            show("calculator");
        }
        else {
            //hide("calculator");
            hideAll();
        }
    }
}


function toggleAllCalculator() {
    changeDisplayState("calculatorRow");
}

// called by showcalculator, others.
function showAllCalculator() {
    changeDisplayState("calculatorRow");
}

// called by showcalculator, others.
function hideAllCalculator() {
    changeDisplayState("calculatorRow");
}

function toggleObject(objId)
{
    var theObj = getObject(objId);
    if (theObj)
    {
        if (theObj.display=="table")//theObj.visibility == "visible")
        {
            setDisplay(objId, "none");//hide(document.getElementById(objId));
        }
        else
        {
            setDisplay(objId, "table");//show(document.getElementById(objId));
        }
    }
}


function createCalculator()
{
}

function roundDec(theNumber, numPlaces)
{
    return shiftRight(Math.round(shiftRight(theNumber,numPlaces)),-numPlaces);
}

function floorDec(theNumber, numPlaces)
{
    return shiftRight(Math.floor(shiftRight(theNumber,numPlaces)),-numPlaces);
}

// k > 0, multiplies number by 10^k
// k == 0, returns number unchanged.
// k < 0, divids number by 10^k
// Use this method instead of "return theNumber*Math.pow(10, k);" to avoid float-type errors.
function shiftRight(theNumber, k)
{
    if (k == 0)
        return (theNumber);
    else
    {
        var k2 = 1;
        var num = k;
        if (num < 0)
            num = -num;
        for (var i = 1; i <= num; i++)
        {
            k2 = k2 * 10
        }
    }

    if (k > 0)
        return(k2 * theNumber);
    else
        return(theNumber / k2);
}


function getCommaDelimitedNumberAsString(theNumber)
{
    var theNumberString = new String(theNumber);
    var theCommaNumberString = new String("");

    var i=theNumberString.length - 1;
    var j=0;

    for (i = theNumberString.length-1; i>=0;i--)
    {
        if (j != 0  &&  j % 3 == 0)
        {
            theCommaNumberString = "," + theCommaNumberString;
        }
        theCommaNumberString = theNumberString.charAt(i) + theCommaNumberString;
        j++;
    }
    return theCommaNumberString;
}

function stripCommas(theCommaString)
{
    var strippedString = new String("");

    for (i=0;i<theCommaString.length;i++)
    {
        if (theCommaString.charAt(i) != ',')
            strippedString += theCommaString.charAt(i);
    }
    return strippedString;
}

function stripBlanks(theStringWithBlanks)
{
    var strippedString = new String("");

    for (i=0;i<theStringWithBlanks.length;i++)
    {
        if (theStringWithBlanks.charAt(i) != ' ')
            strippedString += theStringWithBlanks.charAt(i);
    }
    return strippedString;
}

function validateCalculatorForm()
{
    var calcTargetAmountKnownRadio  = document.getElementById("calculatorTargetAmountKnown");
    var calcMonthlyAmountKnownRadio = document.getElementById("calculatorMonthlyAmountKnown");
    var calcTargetAmountField       = document.getElementById("calculatorTargetAmount");
    var calcMonthlyAmountField      = document.getElementById("calculatorMonthlyAmount");
    var calcTargetDateField         = document.getElementById("calculatorTargetDate");
    var calcAvailableBalanceField   = document.getElementById("calculatorAvailableBalance");
    var interestRateField           = document.getElementById("calculatorInterestRate");
    var calculatorMessageLabel      = document.getElementById("calculatorMessageLabel");

    var returnValue = true;
    var errorMessage = "";

    ///////////////////////////////////////////////////////////////////////////
    var spanCalcTargetAmount = document.getElementById("spanCalcTargetAmount");
    var spanCalcTargetAmountError = document.getElementById("spanCalcTargetAmountError");
    spanCalcTargetAmountError.style.display = "none";
    if (calcTargetAmountKnownRadio.checked)
    {
        var strippedTargetAmount = stripCommas(calcTargetAmountField.value);
        var strippedAvailableBalance = stripCommas(calcAvailableBalanceField.value);
        if (isNaN(strippedTargetAmount) || strippedTargetAmount.length==0)
        {
            spanCalcTargetAmount.className = "calcAlertText";
            changeDisplayState("spanCalcTargetAmountError");
            returnValue = false;
        }
        else
        {
            var numStrippedTargetAmount = eval(strippedTargetAmount);
            var numAvailableBalance     = eval(strippedAvailableBalance);
            if (numStrippedTargetAmount < 1)
            {
                spanCalcTargetAmount.className = "calcAlertText";
                changeDisplayState("spanCalcTargetAmountError");
                errorMessage = "<strong>Please enter a target amount from $1 to $999,999,999.</strong>";
                returnValue = false;
            }
            else if (numStrippedTargetAmount > 999999999)
            {
                spanCalcTargetAmount.className = "calcAlertText";
                changeDisplayState("spanCalcTargetAmountError");
                errorMessage = "<strong>Please enter a target amount from $1 to $999,999,999.</strong>";
                returnValue = false;
            }
            else if (numStrippedTargetAmount <= numAvailableBalance)
            {
                spanCalcTargetAmount.className = "calcAlertText";
                changeDisplayState("spanCalcTargetAmountError");
                errorMessage = "<strong>Enter a target amount greater than your available balance and click on the calculate button.</strong>";
                returnValue = false;
            }
            else
            {
                spanCalcTargetAmount.className = "calcNormalText";
            }
        }
    }
    else
    {
        spanCalcTargetAmount.className = "calcNormalText";
    }


    ///////////////////////////////////////////////////////////////////////////
    var spanCalcMonthlyAmount = document.getElementById("spanCalcMonthlyAmount");
    var spanCalcMonthlyAmountError = document.getElementById("spanCalcMonthlyAmountError");
    spanCalcMonthlyAmountError.style.display = "none";
    if (calcMonthlyAmountKnownRadio.checked)
    {
        var strippedMonthlyAmount = stripCommas(calcMonthlyAmountField.value);
        if (isNaN(strippedMonthlyAmount) || strippedMonthlyAmount.length==0)
        {
            spanCalcMonthlyAmount.className = "calcAlertText";
            changeDisplayState("spanCalcMonthlyAmountError");
            returnValue = false;
        }
        else
        {
            spanCalcMonthlyAmount.className = "calcNormalText";
        }
    }
    else
    {
        spanCalcMonthlyAmount.className = "calcNormalText";
    }

    ///////////////////////////////////////////////////////////////////////////
    var spanCalcAvailableBalance = document.getElementById("spanCalcAvailableBalance");
    var spanCalcAvailableBalanceError = document.getElementById("spanCalcAvailBalanceError");
    spanCalcAvailableBalanceError.style.display = "none";
    var strippedAvailableBalance = stripCommas(calcAvailableBalanceField.value);
    if (isNaN(strippedAvailableBalance) || strippedAvailableBalance.length==0)
    {
        spanCalcAvailableBalance.className = "calcAlertText";
        changeDisplayState("spanCalcAvailBalanceError");
        returnValue = false;
    }
    else
    {
        spanCalcAvailableBalance.className = "calcNormalText";
    }

    ///////////////////////////////////////////////////////////////////////////
    var spanCalcTargetDate = document.getElementById("spanCalcTargetDate");
    var spanCalcTargetDateError = document.getElementById("spanCalcTargetDateError");
    spanCalcTargetDateError.style.display = "none";
    var targetDateRegExp = /^\s+\d\d\/\s+\d\d\/\s+\d\d\d\d\s+$/
    var strippedTargetDate = stripBlanks(calcTargetDateField.value);
    if (strippedTargetDate.length < 10 || isNaN(new Date(strippedTargetDate)) || targetDateRegExp.exec(strippedTargetDate) ||
            strippedTargetDate.substring(0,2) > 12 ||
            strippedTargetDate.substring(3,5) > 31)
    {
        spanCalcTargetDate.className = "calcAlertText";
        changeDisplayState("spanCalcTargetDateError");
        if (returnValue == true && errorMessage.length <=0)
        {
            errorMessage = "<strong>Please use the MM/DD/YYYY format for your target date.</strong>";
        }
        returnValue = false;
    }
    else
    {
        spanCalcTargetDate.className = "calcNormalText";

        // Now validate target date is in the future.
        var todayDate = new Date();
        var futureDate = new Date(calcTargetDateField.value);
        if (calcTargetDateField.value.length == 6 || calcTargetDateField.value.length==8)
        {
            // accepts mm/dd/yy as in the 2000-year range, not 1900-year range.
            futureDate.setFullYear(futureDate.getFullYear()+100);
        }
        if (futureDate < todayDate)
        {
            spanCalcTargetDate.className = "calcAlertText";
            changeDisplayState("spanCalcTargetDateError");
            returnValue = false;
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    var spanCalcInterestRate = document.getElementById("spanCalcInterestRate");
    var spanCalcInterestRateError = document.getElementById("spanCalcInterestRateError");
    spanCalcInterestRateError.style.display = "none";
    if (isNaN(interestRateField.value) || interestRateField.value.length == 0)
    {
        spanCalcInterestRate.className = "calcAlertText";
        changeDisplayState("spanCalcInterestRateError");
        returnValue = false;
    }
    else
    {
        spanCalcInterestRate.className = "calcNormalText";
    }

    if (returnValue == false && errorMessage.length==0)
    {
        errorMessage = "<strong>Complete or correct the highlighted fields and click on the Calculate button.</strong>";
    }

    return errorMessage;
}


/* Future Value of an Increasing Annuity */
function calculateMonthlyAmounts(booleanShowSetAmountMessage)
{
    var calcTargetAmountField       = document.getElementById("calculatorTargetAmount");
    var calcMonthlyAmountField      = document.getElementById("calculatorMonthlyAmount");
    var calcTargetDateField         = document.getElementById("calculatorTargetDate");
    var calcAvailableBalanceField   = document.getElementById("calculatorAvailableBalance");
    var interestRateField           = document.getElementById("calculatorInterestRate");
    var calculatorMessageLabel      = document.getElementById("calculatorMessageLabel");

    // 2) Calculate monthsDifference first.
    var todayDate = new Date();
    var futureDate = new Date(calcTargetDateField.value);


    if (calcTargetDateField.value.length == 6 || calcTargetDateField.value.length==8)
    {
        // accepts mm/dd/yy as in the 2000-year range, not 1900-year range.
        futureDate.setFullYear(futureDate.getFullYear()+100);
    }
    var monthsDifference = 1;
    if (todayDate.getMonth() > futureDate.getMonth())
    {
        monthsDifference = (12 - todayDate.getMonth() + futureDate.getMonth()) +
                           12 * (futureDate.getFullYear() - 1 - todayDate.getFullYear());
    }
    else
    {
        monthsDifference = (futureDate.getMonth() - todayDate.getMonth()) +
                           12 * (futureDate.getFullYear() - todayDate.getFullYear());
    }

    // 3) calculate Future Value.
    var presentValue        = eval(stripCommas(calcAvailableBalanceField.value));
    var monthlyPayment      = eval(stripCommas(calcMonthlyAmountField.value));
    var futureValue         = 0;
    var interestRate        = eval(interestRateField.value);
    var monthsPerYear       = 12;

    if (monthsDifference != 0)
    {
        if (interestRateField)
        {
            var numYears = monthsDifference / 12;

            if (interestRate > 0)
            {
                interestRate = interestRate / 100;
                var tempn = Math.pow( 1 + interestRate/monthsPerYear, monthsPerYear * numYears);
                futureValue = (presentValue * tempn) +
                              (monthlyPayment * (tempn - 1) / ( interestRate/monthsPerYear));
            }
            else
            {
                futureValue = presentValue + monthlyPayment * monthsDifference;
            }
        }
    }

    var cdFutureValue    = getCommaDelimitedNumberAsString(roundDec(futureValue, 0));
    var cdMonthlyPayment = getCommaDelimitedNumberAsString(floorDec(monthlyPayment, 0));
    var cdPresentValue   = getCommaDelimitedNumberAsString(presentValue);

    if (booleanShowSetAmountMessage)
    {
        calculatorMessageLabel.innerHTML = "" +
            "<strong>You will save </strong> $"+cdFutureValue+
            " in "+monthsDifference+" months.<br/><br/>"+
            "Savings total based on:<br/>"+
            "<strong>Monthly savings of </strong>$"+cdMonthlyPayment+"<br/>"+
            "<strong>Available balance of </strong>$"+cdPresentValue+"<br/>"+
            "<strong>Interest rate of </strong>"+interestRate + "%<br/><br/>"+
            "Click the Set Amount button if $"+cdFutureValue+
            " is your savings goal target amount.";
    }
    else
    {
        calculatorMessageLabel.innerHTML = "" +
            "<strong>You will save </strong> $"+cdFutureValue+
            " in "+monthsDifference+" months.<br/><br/>"+
            "Savings total based on:<br/>"+
            "<strong>Monthly savings of </strong>$"+cdMonthlyPayment+"<br/>"+
            "<strong>Available balance of </strong>$"+cdPresentValue+"<br/>"+
            "<strong>Interest rate of </strong>"+interestRate + "%<br/><br/>";
    }

    calculatorGlobalMonthlyTargetAmount = futureValue;

    return false;



}


function calculateTargetAmounts(booleanShowSetAmountMessage)
{
    var calcTargetAmountField       = document.getElementById("calculatorTargetAmount");
    var calcMonthlyAmountField      = document.getElementById("calculatorMonthlyAmount");
    var calcTargetDateField         = document.getElementById("calculatorTargetDate");
    var calcAvailableBalanceField   = document.getElementById("calculatorAvailableBalance");
    var interestRateField           = document.getElementById("calculatorInterestRate");
    var calculatorMessageLabel      = document.getElementById("calculatorMessageLabel");

    // 2) Calculate monthsDifference first.
    var todayDate = new Date();
    var futureDate = new Date(calcTargetDateField.value);


    if (calcTargetDateField.value.length == 6 || calcTargetDateField.value.length==8)
    {
        // accepts mm/dd/yy as in the 2000-year range, not 1900-year range.
        futureDate.setFullYear(futureDate.getFullYear()+100);
    }
    var monthsDifference = 1;
    if (todayDate.getMonth() > futureDate.getMonth())
    {
        monthsDifference = (12 - todayDate.getMonth() + futureDate.getMonth()) +
                           12 * (futureDate.getFullYear() - 1 - todayDate.getFullYear());
    }
    else
    {
        monthsDifference = (futureDate.getMonth() - todayDate.getMonth()) +
                           12 * (futureDate.getFullYear() - todayDate.getFullYear());
    }

    // 3) amountNeededToSave

    var availableBalance    = eval(stripCommas(calcAvailableBalanceField.value))
    var targetAmount        = eval(stripCommas(calcTargetAmountField.value));
    var amountNeededToSave  = targetAmount - availableBalance;

    // 4) amountNeededToSavePerMonth
    var amountNeededToSavePerMonth = 0;

    if (amountNeededToSave <=0)
    {
        calculatorMessageLabel.innerHTML = "" +
        "You already have enough money in your account to achieve this goal.  Please choose a larger target amount."
    }
    else
    {
        if (monthsDifference != 0)
        {
            // need to factor in interest rate here...
            amountNeededToSavePerMonth = Math.round(amountNeededToSave / monthsDifference, 2);
            if (interestRateField)
            {
                var interestRate = eval(interestRateField.value);
                var numYears = monthsDifference / 12;
                if (interestRate > 0)
                {
                    var monthsPerYear = 12;
                    interestRate = interestRate / 100;
                    var tempn = Math.pow(1+ interestRate/monthsPerYear, monthsPerYear * numYears);
                    amountNeededToSavePerMonth = (targetAmount - (availableBalance * tempn)) /
                                                 ((tempn -1) / (interestRate / monthsPerYear))
                    amountNeededToSave = amountNeededToSavePerMonth * monthsDifference;
                }
            }
        }
        calculatorGlobalTargetAmount = floorDec(stripCommas(calcTargetAmountField.value), 0);

        var cdAmountToSave = getCommaDelimitedNumberAsString(roundDec(amountNeededToSave, 0));
        var cdAmountToSavePerMonth = getCommaDelimitedNumberAsString(roundDec(amountNeededToSavePerMonth, 0));
        var cdGlobalTargetAmount = getCommaDelimitedNumberAsString(calculatorGlobalTargetAmount);

        if (booleanShowSetAmountMessage)
        {
            calculatorMessageLabel.innerHTML = "" +
                "Based on your available balance of $"+
                availableBalance+
                ", you need to save an additional $"+
                cdAmountToSave+
                " ($"+cdAmountToSavePerMonth +" per month) for "+
                monthsDifference+
                " months to reach your target amount of $"+
                cdGlobalTargetAmount +
                "<br/><br/>"+
                "<strong>Target Amount = </strong>$"+cdGlobalTargetAmount+"<br/><br/>"+
                "Click the Set Amount button if $"+cdGlobalTargetAmount+
                " is your savings goal target amount.";
        }
        else
        {
            calculatorMessageLabel.innerHTML = "" +
                "Based on your available balance of $"+
                availableBalance+
                ", you need to save an additional $"+
                cdAmountToSave+
                " ($"+cdAmountToSavePerMonth +" per month) for "+
                monthsDifference+
                " months to reach your target amount of $"+
                cdGlobalTargetAmount +
                "<br/><br/>"+
                "<strong>Target Amount = </strong>$"+cdGlobalTargetAmount;
        }


    }

    return false;

}

function doResults(booleanShowSetAmountMessage)
{
    var resultsTab = document.getElementById("resultsTab");
    if (resultsTab.style.display == "none")
    {
        var validationErrorMessage = validateCalculatorForm();

        if (validationErrorMessage.length <= 0)
        {
            var calcTargetAmountKnownRadio  = document.getElementById("calculatorTargetAmountKnown");
            var calcMonthlyAmountKnownRadio = document.getElementById("calculatorMonthlyAmountKnown");

            if (calcTargetAmountKnownRadio.checked)
            {
                var calcPassed = calculateTargetAmounts(booleanShowSetAmountMessage);
            }

            if (calcMonthlyAmountKnownRadio.checked)
            {
                var calcPassed = calculateMonthlyAmounts(booleanShowSetAmountMessage);
            }

            var calculatorErrorMessageLabel = document.getElementById("calculatorErrorMessageLabel");
            calculatorErrorMessageLabel.innerHTML = "";

            var spanCalcGeneralError = document.getElementById("spanCalcGeneralError");
            spanCalcGeneralError.style.display = "none";

            changeDisplayState("calculateTab");
            changeDisplayState("resultsTab");

            var resultsLink = document.getElementById("resultsLink");
            resultsLink.className = "selectedTab";
            var calculateLink = document.getElementById("calculateLink");
            calculateLink.className = "unSelectedTab";
        }
        else
        {
            var calculatorErrorMessageLabel = document.getElementById("calculatorErrorMessageLabel");
            calculatorErrorMessageLabel.innerHTML = ""+ validationErrorMessage;

            var spanCalcGeneralError = document.getElementById("spanCalcGeneralError");
            spanCalcGeneralError.style.display = "none";
            changeDisplayState("spanCalcGeneralError");
        }
    }

}


function doCalculate()
{
    var calcTab = document.getElementById("calculateTab");
    if (calcTab.style.display == "none")
    {
        changeDisplayState("calculateTab");
        changeDisplayState("resultsTab");

        var resultsLink = document.getElementById("resultsLink");
        resultsLink.className = "unSelectedTab";

        var calculateLink = document.getElementById("calculateLink");
        calculateLink.className = "selectedTab";
    }
}


// this function is called when the user clicks on the "Set Target Amount" button.
// its job is to populate the given text field in the parent form, and then hide the calculator.
// EXPECTS TO FIND A TEXT INPUT FIELD IN PARENT FORM WITH name="targetAmount"
function doSetAmount()
{
    var formTargetAmount = document.getElementById("targetAmount");
    var formTargetDate   = document.getElementById("targetDate");

    var calcTargetAmountKnownRadio  = document.getElementById("calculatorTargetAmountKnown");
    var calcMonthlyAmountKnownRadio = document.getElementById("calculatorMonthlyAmountKnown");

    if (calcTargetAmountKnownRadio.checked)
    {
        if (calculatorGlobalTargetAmount >=0)
        {
            if (formTargetAmount)
            {
                formTargetAmount.value = calculatorGlobalTargetAmount;
            }
        }
    }

    if (calcMonthlyAmountKnownRadio.checked)
    {
        if (calculatorGlobalMonthlyTargetAmount >=0 )
        {
            if (formTargetAmount)
            {
                formTargetAmount.value = calculatorGlobalMonthlyTargetAmount;
            }
        }
    }

    if (formTargetDate)
    {
        var calcTargetDate = document.getElementById("calculatorTargetDate");
        if (calcTargetDate)
        {
            formTargetDate.value = calcTargetDate.value;
        }
    }
    hideAllCalculator();
}


function clearMonthlyAmountTextField()
{
    var obj = document.getElementById("calculatorMonthlyAmount");
    if (obj)
    {
        obj.value = "";
    }
}

function clearTargetAmountTextField()
{
    var obj = document.getElementById("calculatorTargetAmount");
    if (obj)
    {
        obj.value = "";
    }
}



// ***********************************************************************************
// CALENDAR SPECIFIC JS
// ***********************************************************************************
/*******************
  GLOBAL DATE VARIABLES
********************/
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
var dayz = new Array('Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
var leaddaysDB = new Array();
var holidayDB= new Array();
var sysdate = new Date();
var sendonDate;
var deliveronDate;
var lead;
var daysahead = 365;
var dayspast = -31;
var nextMonth;
var previousMonth;
var startDate;
var firstEverAvailableStartDate = new Date();
var calendarFixedStartDate = new Date();
var isYearFormatYY = false;
var sourceElement;

// called by populateTable
function getFirstDay(theYear, theMonth){
    var firstDate = new Date(theYear,theMonth,1);
    return firstDate.getDay();
}

// called by populateTable
function getMonthLen(theYear, theMonth) {
    var nextMonth = new Date(theYear, theMonth + 1, 1);
    nextMonth.setHours(nextMonth.getHours() - 3);
    return nextMonth.getDate();
}

//called from Calendar.jsp for InLanguage support
function setMonthsInLang(lang){
	if (lang == 'es'){
		months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
	}
}

// not called from other javascript files --
// probably called from JSP file.
function showCalendar(evt) {

    evt = (evt) ? evt : event;
    if (evt)
    {
    	if (document.getElementById("calendar").style.display!= "block" || document.getElementById("calendar").style.display!= "table")
        {
    	    var elem = (evt.target) ? evt.target : evt.srcElement;
            // enter on the anchor generates an onclick event but
            // getElementPosition return 0,0 for the coords, so we
            // use the child image to get the coordinates.
            if (elem.nodeType == 1 && elem.tagName.toUpperCase() == 'A')
            {
                var lstImage = elem.getElementsByTagName('IMG');
                if (lstImage.length > 0) {
                    elem = lstImage[0];
                }
            }
    	    var position = getElementPosition(elem.id);
            shiftTo("calendar", position.left + elem.offsetWidth, position.top);
            show("calendar");
        }
        else
        {
            //hide("calendar");
            toggleAllCalendar(evt);
        }
    }
}

// called by showCalendar, others.
function showAllCalendar() {

    show("calendar");
    show(document.getElementById("navtopnext"));
    show(document.getElementById("navtopprev"));
}

// called by showCalendar, others.
function hideAllCalendar() {
    hide("calendar");
    hide(document.getElementById("navtopnext"));
    hide(document.getElementById("navtopprev"));
}


// called by many.
// formats date to mm/dd/yyyy string
function formatDate(date)
{
    var mo = formatMonthofyear(date.getMonth()+1);
    var year = date.getFullYear();
    var day = formatDayofmonth(date.getDate());
    return mo + "/" +day+ "/" +year;
}



function toggleAllCalendar(event, offsetX, offsetY,
	myTargetFormFieldName, myLastAvailableDate, myStartDate, myHighlightDate, myWeekendsSelectable, isMyYearFormatYY){

    var calendarRow = document.getElementById("calendarRow");
    var iOffsetX = 0;
    var iOffsetY = 0;

    // Calculate scrollbarOffset
    var xScroll = 0;
    var yScroll = 0;
    if (self.pageYOffset) // all except Explorer
    {
        xScroll = self.pageXOffset;
        yScroll = self.pageYOffset;
    }
    else if (document.documentElement && document.documentElement.scrollTop)
        // Explorer 6 Strict
    {
        xScroll = document.documentElement.scrollLeft;
        yScroll = document.documentElement.scrollTop;
    }
    else if (document.body) // all other Explorers
    {
        xScroll = document.body.scrollLeft;
        yScroll = document.body.scrollTop;
    }


    if (myTargetFormFieldName)
    {
        this.targetFormFieldName = myTargetFormFieldName;
    }

    if (myLastAvailableDate)
    {
        this.lastAvailableDate = myLastAvailableDate;
    }

    if (myStartDate)
    {
        this.calendarFixedStartDate = new Date(myStartDate);

        this.startDate = myStartDate;
        this.firstEverAvailableStartDate = new Date(myStartDate);
        this.firstEverAvailableStartDate.setMilliseconds(0);
        this.firstEverAvailableStartDate.setSeconds(0);
        this.firstEverAvailableStartDate.setMinutes(0);
        this.firstEverAvailableStartDate.setHours(0);
    }

    if (myWeekendsSelectable)
    {
        this.bWeekendsSelectable = myWeekendsSelectable;
    }
    else
    {
    	this.bWeekendsSelectable = true;
    }

    if (offsetX)
    {
        iOffsetX = parseInt(offsetX);
    }

    if (offsetY)
    {
        iOffsetY = parseInt(offsetY);
    }

    if (myHighlightDate)
    {
        this.highlightDate = myHighlightDate;
    }
    else
    {
		// added to display the current month and year when the calendar icon is clicked 
    	this.highlightDate = new Date();
        this.highlightDate.setMilliseconds(0);
        this.highlightDate.setSeconds(0);
        this.highlightDate.setMinutes(0);
        this.highlightDate.setHours(0);
    }

    if(isMyYearFormatYY)
    {
        this.isYearFormatYY = true;
    }

    if (event){
        if (event.pageX) {
            calendarRow.style.left = (event.pageX + iOffsetX) + "px";
        }
        if (event.x) {
            calendarRow.style.left = (event.x + iOffsetX) + "px";
        }
        if (event.pageY) { // don't add scrollbar values for non-IE browsers
            calendarRow.style.top  = (event.pageY + iOffsetY) + "px";
        }
        if (event.y) {// add scrollbar values for IE.
            calendarRow.style.top  = (event.y + iOffsetY + yScroll) + "px";
        }
    	// supporting the keyboard being shown by focusing the anchor and pressing the enter key
        if (typeof jQuery == 'function' && jQuery(event.target).filter('a').length == 1){
        	var targetOffset = jQuery(event.target).offset();
            calendarRow.style.left = (iOffsetX + targetOffset.left	+ jQuery(event.target).width()/2) + "px";
            calendarRow.style.top  = (iOffsetY + targetOffset.top	+ jQuery(event.target).height()/2) + "px";
        }
    }
    
  //To display the month of highlighted date when calendar opens up first time
    //pass first parameter as "this.highlightDate" to below createCalendar() function instead of this.startDate
    
    if (document.getElementById('calendarRow').style.display == 'none')    	
    {   //Executed when Calendar icon is clicked to toggle it to display either from request Transfer screen or Account Activity screen
    	/*sourceElement will store the id of the source anchor element clicked to display the Calendar. This is a global variable and
    	will be accessed in other javascript functions.*/
    	if (event.srcElement!=null && event.srcElement.id.length != 0){
    		sourceElement = event.srcElement.id;
    	} else {
    		sourceElement = event.currentTarget ? event.currentTarget.id : event.srcElement.parentElement.id;   	
    	}
    	createCalendar(this.highlightDate, this.targetFormFieldName, this.lastAvailableDate, this.bWeekendsSelectable, this.highlightDate);	
    	changeDisplayState("calendarRow");
    	setTimeout(function() { document.getElementById('calendarRow').focus(); }, 200);     
    }
    else
    {   
    	createCalendar(this.highlightDate, this.targetFormFieldName, this.lastAvailableDate, this.bWeekendsSelectable, this.highlightDate);	
    	changeDisplayState("calendarRow");   	
    	//Executed when Calendar is closed by clicking the Close Calendar link on the Calendar.
    	setTimeout(function() { document.getElementById(sourceElement).focus(); }, 200);        
    }  
}



// FUNCTION createCalendar
function createCalendar(myStartDate, myTargetFormFieldName, myLastAvailableDate, myWeekendsSelectable, bHighlightDate)
{
    var currentCalendarDate;
    var utilityDate;
    var previousCalendarMonthDate;
    var previousCalendarYearDate;
    var nextCalendarMonthDate;
    var nextCalendarYearDate;

    currentCalendarDate = new Date(myStartDate);
    currentCalendarDate.setSeconds(0);
    currentCalendarDate.setMinutes(0);
    currentCalendarDate.setHours(0);


    var lastAvailableDate = new Date(myLastAvailableDate);
    this.targetFormFieldName = myTargetFormFieldName;

    if (myWeekendsSelectable)
    {
        this.bWeekendsSelectable = myWeekendsSelectable;
    }


    if (bHighlightDate)
    {
        this.highlightDate = bHighlightDate;
    }


    //alert("createCalendar: "+myStartDate+" : " +myTargetFormFieldName+" : " +myLastAvailableDate+" : " +this.bWeekendsSelectable+" : " +bHighlightDate);
    this.lastAvailableDate   = myLastAvailableDate;
    this.startDate = myStartDate;

    utilityDate = new Date(currentCalendarDate);
    utilityDate.setSeconds(0);
    utilityDate.setMinutes(0);
    utilityDate.setHours(0);
    utilityDate.setDate(1);
    
    previousCalendarMonthDate = new Date(utilityDate);
    nextCalendarMonthDate = new Date(utilityDate);
    nextCalendarYearDate = new Date(utilityDate);
    previousCalendarYearDate = new Date(utilityDate);


    if (utilityDate.getMonth()==0)
    {
        previousCalendarMonthDate.setMonth(11);
        previousCalendarMonthDate.setFullYear(utilityDate.getFullYear()-1);
    }
    else
    {
    	previousCalendarMonthDate.setMonth(utilityDate.getMonth()-1);
    }

    if (utilityDate.getMonth()==11)
    {
    	nextCalendarMonthDate.setMonth(0);
    	nextCalendarMonthDate.setFullYear(utilityDate.getFullYear()+1);
    }
    else
    {
    	nextCalendarMonthDate.setMonth(utilityDate.getMonth()+1);
    }

    nextCalendarYearDate.setFullYear(utilityDate.getFullYear()+1);
    previousCalendarYearDate.setFullYear(utilityDate.getFullYear()-1);

    populateNavigation(previousCalendarMonthDate, nextCalendarMonthDate,
                        previousCalendarYearDate, nextCalendarYearDate,
                        myTargetFormFieldName, lastAvailableDate);
    populateTables(currentCalendarDate, myTargetFormFieldName, lastAvailableDate);
}




function populateNavigation(previousMonthDate, nextMonthDate,
                            previousYearDate, nextYearDate,
                            targetFormFieldName, lastAvailableDate)
{
	//alert("populateNavigation, this.bWeekendsSelectable="+this.bWeekendsSelectable);
    var prev = new day(previousMonthDate, this.firstEverAvailableStartDate, lastAvailableDate, this.bWeekendsSelectable);
    var next = new day(nextMonthDate, this.firstEverAvailableStartDate, lastAvailableDate, this.bWeekendsSelectable);

    var prevYearDay = new day(previousYearDate, this.firstEverAvailableStartDate, lastAvailableDate, this.bWeekendsSelectable);
    var nextYearDay = new day(nextYearDate, this.firstEverAvailableStartDate, lastAvailableDate, this.bWeekendsSelectable);


	//sets the global variables for next and prev month
	//nextMonth = next.formatDay();
	//previousMonth = prev.formatDay();

 	if ((!document.all) && (document.getElementById))	{
        //this is executed for netscape, safari, firefox

        var createCalNextMonth = "createCalendar(\'"+nextMonthDate     + "\', \'" + targetFormFieldName + "\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");"
        var createCalPrevMonth = "createCalendar(\'"+previousMonthDate + "\', \'" + targetFormFieldName + "\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");"
        var createCalNextYear  = "createCalendar(\'"+nextYearDate      + "\', \'" + targetFormFieldName + "\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");"
        var createCalPrevYear  = "createCalendar(\'"+previousYearDate  + "\', \'" + targetFormFieldName + "\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");"

        if (next.nextMonthAvailable())
        {            
        	document.getElementById("navtn").setAttribute("onclick", createCalNextMonth);        	        	
            show(document.getElementById("navtn"));
        }
        else
        {
            hide(document.getElementById("navtn"));
        }

        if (prev.previousMonthAvailable())	{            
        	document.getElementById("navtp").setAttribute("onclick", createCalPrevMonth);
            show(document.getElementById("navtp"));
        }
        else
        {
            hide(document.getElementById("navtp"));
        }

        if (nextYearDay.nextYearAvailable())
        {            
            document.getElementById("navToNextYear").setAttribute("onclick", createCalNextYear);
            show(document.getElementById("navToNextYear"));
        }
        else
        {
            hide(document.getElementById("navToNextYear"));
        }

        if (prevYearDay.previousYearAvailable())
        {            
        	document.getElementById("navToPrevYear").setAttribute("onclick", createCalPrevYear);
            show(document.getElementById("navToPrevYear"));
        }
        else
        {
            hide(document.getElementById("navToPrevYear"));
        }
    }

	if ((document.all) && (document.getElementById))
	{
		//this is executed with IE
        var createCalNextMonth =
            new Function("createCalendar(\'"+nextMonthDate     + "\', \'"+targetFormFieldName+"\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");");
        var createCalPrevMonth =
            new Function("createCalendar(\'"+previousMonthDate + "\', \'"+targetFormFieldName+"\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");");
        var createCalNextYear =
            new Function("createCalendar(\'"+nextYearDate      + "\', \'"+targetFormFieldName+"\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");");
        var createCalPrevYear =
            new Function("createCalendar(\'"+previousYearDate  + "\', \'"+targetFormFieldName+"\', \'"+lastAvailableDate+"\', " + this.bWeekendsSelectable+");");

        if (next.nextMonthAvailable())
		{			
        	document.getElementById("navtn")["onclick"] = createCalNextMonth;			
	 		show(document.getElementById("navtn"));
		}
		else
		{
	 		hide(document.getElementById("navtn"));
	 	}

	 	if (prev.previousMonthAvailable())
	 	{			
	 		document.getElementById("navtp")["onclick"] = createCalPrevMonth;
	 		show(document.getElementById("navtp"));
	 	}
	 	else
	 	{
	 		hide(document.getElementById("navtp"));
	 	}


        if (nextYearDay.nextYearAvailable())
        {            
        	document.getElementById("navToNextYear")["onclick"] = createCalNextYear;
            show(document.getElementById("navToNextYear"));
        }
        else
        {
             hide(document.getElementById("navToNextYear"));
         }

         if (prevYearDay.previousYearAvailable())
         {             
        	 document.getElementById("navToPrevYear")["onclick"] = createCalPrevYear;
             show(document.getElementById("navToPrevYear"));
         }
         else
         {
             hide(document.getElementById("navToPrevYear"));
         }
	}
}


function populateTables(firstCalendar, targetFormFieldName, lastAvailableDate)
{
    //first delete both tables
    deleteTable();

    //then populate the new tables
    populateTable(firstCalendar, targetFormFieldName, lastAvailableDate);
}


// called by populateTables
// EXPECTS TO FIND A TBODY WITH id="firstCalendarBody"
function deleteTable()
{
    var tBody = document.getElementById("firstCalendarBody");
    while (tBody.rows.length > 0) {
        tBody.deleteRow(0);
    }
}


// called by populateTables
// EXPECTS TO FIND A TBODY WITH id="firstCalendarBody"
// EXPECTS TO FIND A SPAN WITH id="firstCalendarHeader"
function populateTable(calendar, targetFormFieldName, lastAvailableDate)
{
    //alert("populateTable: this.bWeekendsSelectable="+this.bWeekendsSelectable);

    var header = "firstCalendarHeader";
    var body = "firstCalendarBody";
    var firstDay = getFirstDay(calendar.getFullYear(),calendar.getMonth());
    var howMany = getMonthLen(calendar.getFullYear(),calendar.getMonth());
    var dayCounter = 1;
    var TBody = document.getElementById(body);

    var calendarday = new Date(calendar);

    document.getElementById(header).innerHTML =  months[calendar.getMonth()] + " " +calendar.getFullYear();

    var newR, newC;
    var done=false;
    var style = "";
    var tempsend;
    var tempdeliver;

    while (!done)
    {
        newR = TBody.insertRow(TBody.rows.length);
        if (newR)
        {
	        for (var i = 0; i < 7; i++)
            {
                newC = newR.insertCell(newR.cells.length);
                calendarday.setDate(dayCounter);
                var dayString = calendarday.toString();
                
                if (TBody.rows.length == 1 && i < firstDay)
                {
                    newC.innerHTML = "&nbsp;";
                    newC.id = 0;
                    newC.headers = "monthYear " + dayString.substr(0,3);
                    continue;
                }
                if (dayCounter == howMany)
                {
                    done = true;
                }

                if (dayCounter <= howMany)
                {
                    var day_object = new day(calendarday, this.firstEverAvailableStartDate, lastAvailableDate, this.bWeekendsSelectable);
                    var isselectable = day_object.isSelectable();
                    var iddate = day_object.formatDay();
                    
                    newC.id = iddate;
                    newC.headers = "monthYear " + dayString.substr(0,3);
                    if (!isselectable)
                    {
                        newC.innerHTML = "<div class=\"dayCounter\">" + dayCounter+ "</div>";
                    }
                    else
                    {                    	
                    	var titleText;           	
                    	if(sourceElement!=null && sourceElement.search('AccountActivity')>=0){
                    		// Executed when Calendar icon is clicked from the Account Activity screens
                    		titleText = "Selected date. ";
                    	}
                    	if(sourceElement!=null && sourceElement.search('AccountActivity')<0){
                    		// Executed when Calendar icon is clicked from the Request Transfer screen 
                    		titleText = "First available date. ";
                    	}
                    	if(titleText!=null){
                    		titleText = titleText.concat(moment(iddate).format('dddd')+' ').concat(moment(iddate).format('MMMM Do, YYYY'));
                    	}
                        if (this.highlightDate &&
                            this.highlightDate == day_object.formatDay())
                        {
                            var myStr =
                                "<div class=\"dayCounter\">"+
                                "<a id='highlighteddatelink' title=\'"+titleText.toString()+"\' onClick=\"chooseDate(event, \'" +iddate+ "\');\" href='#null' >"+
                                dayCounter+
                                "</a></div>";
                            titleText = null;
                        }
                        else
                        {
                            var myStr =
                                "<div class=\"dayCounter\">"+
                                "<a id='datelink' onClick=\"chooseDate(event, \'" +iddate+ "\');\" href='#null' >"+
                                dayCounter+
                                "</a></div>";
                        }
                        newC.innerHTML = myStr;
                    }

                    if (!isselectable)
                    {
                        style += " notselectable";
                    }

                    newC.className = style;
                    dayCounter++;
                    style="";
                }
                else {
                    newC.id = 0;
                    newC.innerHTML = "&nbsp;";
                }
            }
        }
        else {
            done = true;
        }
    }
}


// this function is called when the user clicks (onClick) on a day in the calendar.
// its job is to populate the given text field in the parent form, and then hide the calendar.
// EXPECTS TO FIND A TEXT INPUT FIELD IN PARENT FORM WITH name="targetDate"
function chooseDate(event, date) {
    var textfield = document.getElementById(this.targetFormFieldName),
		tealeafAddEvent = function (targetElement, eventName, dataValue) {
		    if ((typeof TeaLeaf != "undefined") && (typeof TeaLeaf.Client != "undefined") && (typeof TeaLeaf.Client.tlAddEvent != "undefined")) {
				if (document.createEventObject) {
				    var e = document.createEventObject();
				    e.type = eventName;
				    e.target = targetElement;
				    e.value = dataValue
				    TeaLeaf.Client.tlAddEvent(e);
				} else {
				    var e = document.createEvent('MutationEvent');
				    e.initMutationEvent(eventName, true, true, targetElement, targetElement.value, dataValue, MutationEvent.MODIFICATION, null);
				    targetElement.dispatchEvent(e);
				}
	    	}
		}
	; // end of variables definition
    if (textfield) {
        if(this.isYearFormatYY) {
            var dtlen = date.length;
            var dtDayMon = date.substring(0,6);
            var dtYr = date.substring(8,dtlen);
            date = dtDayMon + dtYr;
        }
        textfield.value = date;
    }
    toggleAllCalendar(event);
    // tell tealeaf that the textfield has a new value.
    tealeafAddEvent(textfield, 'click', date);
}


function setSelectabledate(seldate)
{
  seldate = new Date(seldate);
  tmp = new day(seldate);
  var done = false;
  while (!done) {
    if(!tmp.isSelectable())
    {
      seldate.setDate(seldate.getDate() + 1);
    }
    done = true;
  }
  return seldate;
}


// Simply 0-fills a day string so it is 2 characters long.  eg. 5 --> 05.
function formatDayofmonth(dayo)
{
  var dd = dayo + "";
  if(dd.length == 1)
  {
    dd = "0" + dd;
  }
  return dd;
}


// Simply 0-fills a month string so it is 2 characters long.  eg. 5 --> 05.
function formatMonthofyear(montho)
{
  var mm = montho + "";
  if(mm.length == 1)
  {
    mm = "0" + mm;
  }
  return mm;
}

// ********************************************************************************
// Day Functions
// Specifically for the calendar widget.
// ********************************************************************************
function day(cal, myFirstAvailableDate, myLastAvailableDate, myWeekendsSelectable)
{
    this.cal = new Date(cal);

    this.today = new Date();
    this.dayofweek = this.cal.getDay();
    this.dayofmonth = this.cal.getDate();
    this.calsmonth = this.cal.getMonth();
    this.calsyear = this.cal.getFullYear();
    this.milliseconds = this.cal.getTime();
    this.lastAvailableDate = myLastAvailableDate;

    if (!myFirstAvailableDate.getTime)
    {
        this.firstAvailableDate = new Date(myFirstAvailableDate);
    }
    else
    {
        this.firstAvailableDate = myFirstAvailableDate;
    }

    this.bWeekendsSelectable = myWeekendsSelectable;
    this.isToday = isToday;
    this.isTomorrow = isTomorrow;
    this.isWeekend = isWeekend;
    this.isPast = isPast;
    this.isSelectable = isSelectable;
    this.formatDay = formatDay;
    this.nextMonthAvailable = nextMonthAvailable;
    this.previousMonthAvailable = previousMonthAvailable;
    this.nextYearAvailable = nextYearAvailable;
    this.previousYearAvailable = previousYearAvailable;
}

function isToday()
{
	var istoday = false;
	if ((this.dayofmonth == this.today.getDate())
		&& (this.calsmonth == this.today.getMonth())
		&& (this.calsyear == this.today.getFullYear()))
	{
		istoday = true;
	}
	return istoday;
}

function isTomorrow()
{
    var isTomorrow = false;
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setTime(today.getTime() + (1000*60*60*24));

	if ((this.dayofmonth == tomorrow.getDate())
		&& (this.calsmonth == tomorrow.getMonth())
		&& (this.calsyear == tomorrow.getFullYear()))
	{
		isTomorrow = true;
	}
	return isTomorrow;
}

function isWeekend()	{
	var isweekend =	false;
	if (this.dayofweek==0 || this.dayofweek==6)	{
		isweekend = true;
	}
	return isweekend;
}

function isPast()
{
	var ispast = false;
	if (this.isToday())
	{
		ispast=false;
	}
	else if (parseInt(this.milliseconds) < parseInt(new Date().getTime()))
	{
		ispast=true;
	}
	return ispast;
}


function isSelectable()
{
    var selectable = true;
    //commenting this to make past days selectable for bob ledger
    /*if (this.isPast()) //make the past date selectable - bob ledger proj
    {
        selectable = false;
    }
    else
    { */
        if (parseInt(this.milliseconds) < parseInt(this.firstAvailableDate.getTime()))
        {
            //alert("disallowing -- this.cal="+this.cal+", this.firstAvailableDate="+this.firstAvailableDate);
            //alert("cal millis == "+parseInt(this.milliseconds)+" firstAvailableMillis== "+ parseInt(this.firstAvailableDate.getTime()));
            selectable = false;
        }


        if (parseInt(this.milliseconds) >  parseInt(this.lastAvailableDate.getTime()))
        {
            selectable = false;
        }

        if (this.isWeekend())
        {
            // don't simplify this.
            if (this.bWeekendsSelectable == false || "false" == this.bWeekendsSelectable)
            {
                selectable = false;
            }
        }

    //}
    return selectable;
}


function formatDay()
{
	var mo = formatMonthofyear(this.calsmonth +1);
	var year = this.calsyear;
	var day = formatDayofmonth(this.dayofmonth);
	return mo + "/" +day+ "/" +year;
}

function nextMonthAvailable()
{
  var nextmonthavailable = false;
  var monthsPerYear = 12;

  var laYear = this.lastAvailableDate.getFullYear();
  var laMonths = this.lastAvailableDate.getMonth() + 1;
  var totalLaMonths = laYear * monthsPerYear + laMonths;

  var currYear = parseInt(this.cal.getFullYear());
  var currMonths = parseInt(this.cal.getMonth()) + 1;
  var totalCurrMonths = currYear * monthsPerYear + currMonths;

  nextmonthavailable = totalCurrMonths <= totalLaMonths;

  return nextmonthavailable;

}

// ALLOW USERS TO GO INTO THE PAST (for bob ledger)
function previousMonthAvailable()
{
  var previousmonthavailable = false;

  var monthsPerYear = 12;
  //calculate fixed value
  var todayYear 	= calendarFixedStartDate.getFullYear();
  var todayMonths 	= calendarFixedStartDate.getMonth() + 1;
  var totalTodayMonths 	= todayYear * monthsPerYear + todayMonths;
  //calculate variable value
  var currYear 		= parseInt(this.cal.getFullYear());
  var currMonths 	= parseInt(this.cal.getMonth()) + 1;
  var totalCurrMonths 	= currYear * monthsPerYear + currMonths;

  previousmonthavailable = totalTodayMonths <= totalCurrMonths;

  return previousmonthavailable;
}


function nextYearAvailable()
{
  var nextYearAvailable = false;
  var monthsPerYear = 12;

  var laYear = this.lastAvailableDate.getFullYear();
  var laMonths = this.lastAvailableDate.getMonth() + 1;
  var totalLaMonths = laYear * monthsPerYear + laMonths;

  var currYear = parseInt(this.cal.getFullYear());
  var currMonths = parseInt(this.cal.getMonth()) + 1;
  var totalCurrMonths = currYear * monthsPerYear + currMonths;

  nextYearAvailable = totalCurrMonths <= totalLaMonths;

  return nextYearAvailable;
}

// DON'T ALLOW USERS TO GO INTO THE PAST.
function previousYearAvailable()
{
    var previousYearAvailable = true;

    previousYearAvailable =
        this.cal.getFullYear() > this.today.getFullYear() ||
        (this.cal.getFullYear() == this.today.getFullYear() && this.cal.getMonth() >= this.today.getMonth());


    return previousYearAvailable;
}
// ********************************************************************************



// ********************************************************************************
// DHTMLAPI javascript
// javascript methods useful for a number of features.
// ********************************************************************************
var isCSS, isW3C, isIE4, isNN4, isIE6CSS;
// Initialize upon load to let all browsers establish content objects
function initDHTMLAPI() {
    if (document.images) {
        isCSS = (document.body && document.body.style) ? true : false;
        isW3C = (isCSS && document.getElementById) ? true : false;
        isIE4 = (isCSS && document.all) ? true : false;
        isNN4 = (document.layers) ? true : false;
        isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
    }
}
// Set event handler to initialize API
window.onload = initDHTMLAPI;

// Seek nested NN4 layer from string name
function seekLayer(doc, name) {
    var theObj;
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            theObj = doc.layers[i];
            break;
        }
        // dive into nested layers if necessary
        if (doc.layers[i].document.layers.length > 0) {
            theObj = seekLayer(document.layers[i].document, name);
        }
    }
    return theObj;
}

// Convert object name string or object reference
// into a valid element object reference
function getRawObject(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (isW3C) {
            theObj = document.getElementById(obj);
        } else if (isIE4) {
            theObj = document.all(obj);
        } else if (isNN4) {
            theObj = seekLayer(document, obj);
        }
    } else {
        // pass through object reference
        theObj = obj;
    }
    return theObj;
}

// Convert object name string or object reference
// into a valid style (or NN4 layer) reference
function getObject(obj) {
    var theObj = getRawObject(obj);
    if (theObj && isCSS) {
        theObj = theObj.style;
    }
    return theObj;
}


// Set the display of an object to inline
function show(obj) {
    var theObj = getObject(obj);
    if (theObj) {
    	theObj.display="inline";
    }
}

// Set the display of an object to none
function hide(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.display="none";
    }
}
/*********************************************************************************/

 /***********************************************/
/* Common JavaScript Library for WIB            */
/* copied over the portal implementation of the */
/* popup window based on child browser policy   */
/************************************************/

/* Function: popup
   Params:   url
             winType
                1 = small window, default properties
                2 = medium/default window, default properties
                3 = large window, all browser chrome
                4 = custom window ( width, height, resizable), largeproperties
             winName (target name)
   Return:   win (the new window)
*/
var win=null;
function popup(url,winType,width,height,resize,winName)
	  {
	    var properties=null;
        var defaultProps = "directories=no,location=no,menubar=yes,scrollbars=yes,status=no,titlebar=yes,toolbar=no,resizable=yes";
		var largeProps = "directories=yes,location=yes,menubar=yes,scrollbars=yes,status=yes,titlebar=yes,toolbar=yes,resizable=yes";
        var targetedWindow = winName != null ? winName : "child";

        switch(winType){
			case 1: //small
			properties="height=200,width=300,"+defaultProps;
			break;
			case 2: //medium/default
			properties="height=350,width=500,"+defaultProps;
			break;
			case 3: //large
			properties="height=400,width=700,"+largeProps;
			break;
			case 4: //custom:  width,height, resizable
			properties="width="+arguments[2]+",height="+arguments[3]+",resizable="+arguments[4]+","+largeProps;
			break;
		}

	   win=window.open(url, targetedWindow, properties);

	  return win;
	  }

/* Function: newWindow
 Params:   popup function call
*/
function newWindow (popup){

    if (popup == null || win == null) {
        alert('You may have pop up blocker software preventing this window from opening.');
    } else {
        popup.focus();
    }

}

/* Function: newWindow2
Params:   popup function call
the function fix: The alert message alert('You may have pop up blocker software preventing this window from opening.'); in the original newWindow function 
is always displayed when the url is different domain than www.wellsfargo.com. 
*/
function newWindow2 (popup){
    popup;
}

//
// Name: addEvent
// Source: http://www.onlinetools/org/articles/unobtrusivejavascript/chapter4.html
//
// Usage:
//   addEvent(windowobj, 'eventtype', functionname);
//   where: eventtype is the type of event "onload" becomes "load"
//
function addEvent(obj, evType, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(evType, fn, false);
    return true;
  } else if (obj.attachEvent) {
     var r = obj.attachEvent("on"+evType, fn);
     return r;
  } else {
    return false;
  }
}
