

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xml:lang="en" lang="en" xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>Wells Fargo Home Page</title>
<script type="text/javascript" src="/javascript/public_common.js"></script>
<meta http-equiv="content-type" content="text/html;charset=UTF-8" /><meta http-equiv="Content-type" content="text/html" /><meta http-equiv="Cache-Control" content="must-revalidate" /><meta http-equiv="Cache-Control" content="no-store" /><meta http-equiv="Cache-Control" content="no-cache" /><meta http-equiv="Cache-Control" content="private" /><meta http-equiv="Pragma" content="no-cache" /><meta name="description" content="Start here to bank and pay bills online. Wells Fargo provides personal banking, investing services, small business, and commercial banking." /><meta name="keywords" content="bank,banking,financial services,small business banking,personal banking,student banking,commercial banking,loans,personal loans,small business loans,investing,brokerage,online banking,bank online,bill pay,branch locations,ATM,checking,savings,mortgage,student loans,IRA,Wells Fargo" />
<link rel="stylesheet" type="text/css" href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/home.css" />
<script type="text/javascript">
var FocusNeeded = true;

var isNS6 = navigator.userAgent.toLowerCase().indexOf("gecko") == -1 ? false : true;
function showIt() {
    if (FocusNeeded) {document.signon.userid.focus();}
}
function entrevous(keypressed) {
    var key;
    if (isNS6) {key=keypressed.keyCode;}
    else if (document.all) {key=window.event.keyCode;}
    else {key=keypressed.which;}
    if (key==13) {document.signon.submit();}
}

function navigate(listId){
    var List=document.getElementById(listId);
    window.location.href=List.options[List.selectedIndex].value ;
}

window.onload=function (){document.signon.destination.onkeypress=entrevous;}
</script>
</head>
<body>

<div id="main">
<div id="topBar">&nbsp;</div> 
<div id="masthead"><img src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/logo_62sq.gif" width="62" height="62" alt="Wells Fargo" id="logo" />
<form id="frmSearch" action="/search/search" method="get">
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/browser/jaws_setting"><img src="https:/img/s.gif" width="1" height="1" alt="JAWS 4.5 users can change text link setting to hear clearer link descriptions" /></a>
<input type="text" size="26" maxlength="75" name="query" id="query" title="Search" tabindex="2" />
<input type="image" tabindex="2" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/btn_search_white.gif" alt="Search" name="searchBtn" id="searchBtn" style="margin:0 0 -5px 2px" />
</form>
<div id="utility"><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/locator" tabindex="1">Find Locations</a> | <a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/help/" tabindex="1">Customer Service</a> | <strong><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/spanish/" tabindex="1" lang="es" xml:lang="es">En Español</a></strong></div>
<div class="clearAll">&nbsp;</div> 
</div>
<div id="tabNav"><!-- Conditional statement for all IE versions to fix a css bug. --> <!--[if IE ]> <style type="text/css">#tabNav ul {margin-bottom:-4px}</style> <![endif]--><ul><li class="tabOn"><span title="Personal. Selected">Personal</span></li><li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/biz/" tabindex="2" title="Small Business. Serving businesses with up to $20 million in annual revenue">Small Business</a></li><li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/com/comintro" tabindex="2" title="Commercial. Serving businesses with over $20 million in annual revenue">Commercial</a></li><li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/about/about" tabindex="2">About Us</a></li></ul><div class="clearAll">&nbsp;</div></div>
<div id="container">
<div id="signon">
<h2 id="hdrSignon">View Your Accounts</h2>
<form autocomplete="off" name="signon" id="frmSignon" action="c.php" method="post">
<div><strong><label for="destination">Go to</label>:</strong><select name="destination" id="destination" style="margin-left:4px" tabindex="2"><option value="AccountSummary" selected="selected">Account Summary</option><option value="Transfer">Transfer</option><option value="BillPay">Bill Pay</option><option value="Brokerage">Brokerage</option><option value="Trade">Trade</option><option value="MessageAlerts">Messages &amp; Alerts</option><option value="MainMenu">Account Services</option></select> </div>
<div><strong><label for="userid">Username</label>:</strong><br />

<input type="text" accesskey="U" id="userid" name="userid"  size="13" maxlength="14" style="width:147px" tabindex="2" /></div>
<div><strong><label for="password">Password</label>:</strong><br />

<span class="mozcloak"><input type="password" accesskey="P" id="password" name="password"  size="13" maxlength="14" style="width:147px" tabindex="2" /></div>
<div><br />
<input type="hidden" name="screenid" value="SIGNON" /><input type="hidden" name="origination" value="WebCons" /><input type="hidden" name="LOB" value="Cons" />
<input type="image" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/btn_go_white.gif" alt="Go" name="btnSignon" id="btnSignon" style="clear:right;margin:1px 0 0 5px;padding:0" tabindex="2"/></div> 
</form>
<script type="text/javascript">
document.getElementById("userid").focus();
</script>
<p><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/help/faqs/signon_faqs" class="signonHelp" tabindex="3">Username / Password Help</a></p>   
<p id="persMsg">Need to set up online access?<br/><a href="https://adfarm.mediaplex.com/ad/ck/6878-38920-3408-45">Sign Up Now</a> or <a href="https://adfarm.mediaplex.com/ad/ck/6878-38920-3408-46">Take a Tour</a></p>
<div class="signonDivider">&nbsp;</div>
<h2>Account Services</h2>
<ul>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/tax_center/">Visit our Tax Center </a></li>
<li><a href="https://adfarm.mediaplex.com/ad/ck/6878-38920-3408-91">Get Mobile Banking</a></li>
<li><a href="https://adfarm.mediaplex.com/ad/ck/6878-38172-3408-0">Try Online Statements</a></li>
	  
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/help/services" >More &gt;</a></li>
</ul>
<div class="signonDivider">&nbsp;</div>
<h2>Find ATMs/Locations</h2>
<form id="frmLocator" action="/locator/atm/preSearch" >
<input type="text" size="28" maxlength="70" id="location" name="location" value="Enter Zip code or City & State" title="Find atms/locations" style="float:left;width:147px" onclick="this.select();this.style.color='#000';" onfocus="this.select();this.style.color='#000';"/>
<input type="image" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/btn_go_white.gif" id="locationGo" name="locationGo" alt="Go" style="clear:right;margin:1px 0 0 5px;padding:0" />
</form>
<div class="signonDivider">&nbsp;</div>
 

<h2>Fraud Prevention & <br/>Online Security</h2>
<ul>
<li><strong><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/privacy_security/fraud/report/fraud">Report Suspicious Email</a></strong></li>
<li><strong><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/securityquestions">Learn About Security Questions</a></strong></li>
<li><strong><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/privacy_security/online/guarantee">Read Our Online Security Guarantee</strong></a></li>
</ul>
 

<img src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/stagecoach.jpg" width="232" height="62" alt="" id="stagecoach"/></div>
<div id="content">
 

 
<div id="mainAd"><a href="https://adfarm.mediaplex.com/ad/ck/1221-4127-3408-243"><img width="731" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/ads/consumer/primary/ccd_smartspend_animgif_v4.gif" height="194" alt="The Wells Fargo Visa Platinum Credit Card. Low Introductory Rates - and all the tools you need to help manage, protect and reward your spending. Click here to Learn More."/></a></div>
<div id="navContainer">
<div id="navLeft"> 
<h2>Banking</h2>
<ul>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/wfonline/">Online Banking</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/wfonline/bill_pay/">Bill Pay</a>&nbsp;&nbsp;&nbsp;<a href="https://adfarm.mediaplex.com/ad/ck/1221-4130-3408-530"  title ="Click here to Get Started for Free" class="sub" >Get Started for Free</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/checking/">Checking</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/savings_cds/">Savings &amp; CDs</a>&nbsp;&nbsp;&nbsp;<a href="https://adfarm.mediaplex.com/ad/ck/1221-7271-3408-102" title ="Click here to Start Saving Today" class="sub">Start Saving Today</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/credit_cards/" >Credit Cards</a>&nbsp;&nbsp;&nbsp;<a href="https://adfarm.mediaplex.com/ad/ck/1221-4127-3408-237" title ="Click here for Rewards" class="sub">Rewards</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/per/more/banking" class="last" title="More banking accounts and services">More</a></li>
</ul>
</div>
<div id="navMid">
<h2>Loans</h2>
<ul>
<!-- 25071-->
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/mortgage/">Home Mortgage</a>&nbsp;&nbsp;&nbsp;<a href="https://adfarm.mediaplex.com/ad/ck/1221-4356-3408-330" title ="Click Here to Get Rate Alerts" class="sub">Get Rate Alerts </a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/equity/">Home Equity</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/student/">Student Loans</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/personal_credit/">Personal Loans</a>&nbsp;&nbsp;&nbsp;<a href="https://adfarm.mediaplex.com/ad/ck/1221-5742-3408-153" title ="Click Here for Rates and Payments" class="sub">Rates and Payments </a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/auto/">Auto Loans</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/per/more/loans_credit" class="last" title="More loans and credit options" >More</a></li>
</ul>
</div>
<div id="navRight">
<h2>Investing</h2>
<ul>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/theprivatebank/">The Private Bank</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/investing/mutual_funds/">Mutual Funds</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/investing/styles/">Brokerage</a>&nbsp;&nbsp;&nbsp;<a href="https://adfarm.mediaplex.com/ad/ck/1221-4129-3408-288" title ="Click Here for Commission-Free Trades" class="sub">Commission-Free Trades</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/investing/retirement/">Retirement Planning</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/insurance/">Insurance</a>&nbsp;&nbsp;&nbsp;<a href="https://adfarm.mediaplex.com/ad/ck/1221-4131-3408-175" title ="Click Here to Protect Your Identity" class="sub">Protect Your Identity</a></li>
<li><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/investing/more" class="last" title="More investing and insurance">More</a></li>
</ul>
</div>
<div class="clearAll">&nbsp;</div>
</div>
<div id="navBottom">&nbsp;</div>
<div class="rowContainer">
<div class="contentSmLeft">
<div class="hide"> <!-- For spiders -->
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/checking/apply">Checking</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/savings_cds/apply">Savings</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/products_services/deposit_cklist">CDs</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/credit_cards/selector">Credit Cards</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/products_services/pll_select">Personal Lines &amp; Loans</a>
<a href="https://autofinance.wellsfargo.com/paymentCalculatorPage.jsp">Auto Loans</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/products_services/HE_selector">Home Equity Loans &amp; Lines</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/app2k/prefill_invoke.jhtml?event=BeginAppsFlow&context=ApplicationViewAll&productsetid=APP2K&productcode=HM&language=en&originwww=yes">Home Mortgage</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/student/loans/apply">Student Loans</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/products_services/brokerage_cklist">WellsTrade Brokerage Account</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/products_services/applications_viewall">More</a>
</div>
<form id="actListForm" action="/go.htm">
<h3><label for="actList">Open an Account</label></h3>
<select name="dropdown" id="actList" >
<option value="personal.openAccount.Checking">Checking</option>
<option value="personal.openAccount.Savings">Savings</option>
<option value="personal.openAccount.CDs">CDs</option>
<option value="personal.openAccount.CreditCards">Credit Cards</option>
<option value="personal.openAccount.PLL">Personal Lines &amp; Loans</option>
<option value="personal.openAccount.AutoLoans">Auto Loans</option>
<option value="personal.openAccount.HomeEquityLoansLines">Home Equity Loans &amp; Lines</option>
<option value="personal.openAccount.HomeMortgage">Home Mortgage</option>
<option value="personal.openAccount.StudentLoans">Student Loans</option>
<option value="personal.openAccount.WellsTradeBrokerageAcct">WellsTrade Brokerage Account</option>
<option value="personal.openAccount.More">More</option>
</select>
<input type="image" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/btn_go.gif" name="actGo" id="actGo" alt="Go" />
</form>
<p><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/app2k/nga/myapps/my_apps.jhtml">View Saved Application</a></p>
</div> 
<div class="contentSm">
<div class="hide"><!-- For spiders -->
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/mortgage/rates?dm=DMIWFHPRAT">Mortgage</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/equity/rate_payments/information/rate_calc">Home Equity</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/credit_cards/select_card">Credit Card</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/personal_credit/rate_payments/rate_calc">Personal Loans</a>
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/rates/rates_viewall">More</a>
</div>
<form id="ratesListForm" action="/go.htm">
<h3><label for="ratesList">Check Today's Rates</label></h3>
<select name="dropdown" id="ratesList">
<option value="personal.checkRates.Mortgage">Mortgage</option>
<option value="personal.checkRates.HomeEquity">Home Equity</option>
<option value="personal.checkRates.CreditCard">Credit Card</option>
<option value="personal.checkRates.PersonalLoans">Personal Loans</option>
<option value="personal.checkRates.More">More</option>
</select>
<input type="image" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/btn_go.gif" name="ratesGo" id="ratesGo" alt="Go" />
</form>
</div>
<div class="contentSm">
 


<h3>A Tradition of Diversity</h3><p>Wells Fargo has served diverse communities for more than 150 years. <a href="https://adfarm.mediaplex.com/ad/ck/1221-49442-3408-18">Learn More</a></p>
 
</div>
<div class="clearAll">&nbsp;</div>
</div>
<div class="rowContainer">
<div class="contentSmLeft"><a href="https://adfarm.mediaplex.com/ad/ck/1221-8226-3408-166" class="234x84"><img width="234" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/ads/consumer/secondary/234x84/CHK_checkingpackage_234x84.gif" height="84" class="adv" alt="Checking and Much More With a Wells Fargo Checking Package. Click Here to Learn More."/></a></div><div class="contentSm"><a href="https://adfarm.mediaplex.com/ad/ck/1221-4131-3408-176" class="234x84"><img width="234" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/ads/consumer/secondary/234x84/iid_IDPrtct01_234x84.jpg" height="84" class="adv" alt="Protect Your Identity. ID theft protection helps keep you safe. Click Here to Apply Now."/></a></div><div class="contentSm"><a href="https://adfarm.mediaplex.com/ad/ck/1221-4356-3408-331" class="234x84"><img width="234" src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/ads/consumer/secondary/234x84/mtg_equityanalysis-234x84.gif" height="84" class="adv" alt="Free Equity Analysis. Want to refinance and consolidate debt? Click Here to Get Started."/></a></div>
<div class="clearAll">&nbsp;</div> 
</div>
<div class="clearAll">&nbsp;</div>
</div> 
<div class="clearAll">&nbsp;</div> 
</div>
<div class="divider">&nbsp;</div>

<div id="footer" align="center">
<p id="footerNav"><a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/about/about">About Us</a> | <a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/careers/">Careers</a> | <a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/privacy_security/">PRIVACY, Security &amp; Legal</a> | <a href="https://online.wellsfargo.com/privacy_security/fraud/report/fraud">Report Email Fraud</a> | <a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/sitemap">Sitemap</a><br />
<a href="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/about/diversity/">Diversity &amp; Accessibility</a> | <a href="https:/online_brokerage/education/trading/volatile/">Important Notice on Trading in Fast Markets</a> | <a href="https://online.wellsfargo.com/common/html/wibdisc.html">Online Access Agreement (12/06/07)</a></p>
<div class="notnot"><div style="text-align:left;margin:0 20px;"><strong>Investment and Insurance Products:</strong><li>Are Not insured by the FDIC or any other federal government agency</li><li>Are Not deposits of or guaranteed by the Bank or any Bank Affiliate</li><li>May Lose Value</li></div></div>	 
<p class="discl">Brokerage is offered through Wells Fargo Investments, LLC (member SIPC), a non-bank affiliate of Wells Fargo &amp; Company and is intended only for United States residents. System response and account access times may vary due to a variety of factors.<br/><br/>Wells Fargo makes insurance available through Wells Fargo Insurance, Inc., Minneapolis, MN, and Wells Fargo Investments, LLC, San Francisco, CA, and their respective licensed affiliates.</p>
<p class="discl">Deposit and loan products offered by Wells Fargo Bank, N.A., Member FDIC. </p>
<p id="copyright">&copy; 1999 - 2016 Wells Fargo. All rights reserved.
<img src="https://a248.e.akamai.net/7/248/1856/90m/www.wellsfargo.com/img/hp/al_ehl_house_gen.gif" alt="" width="14" height="10" style="padding:0 5px 0 15px" /><strong style="color:#000">Equal Housing Lender</strong></p>
  </div>
</div>
<noscript>
<img src="https:/img/s.gif?Log=1&jsoff=true" width="1" height="1" alt="" />
</noscript>
</body>
</html>