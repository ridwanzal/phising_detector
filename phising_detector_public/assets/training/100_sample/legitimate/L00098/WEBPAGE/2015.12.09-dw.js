if(!document.getElementsByClassName){ 
	document.getElementsByClassName = function(className, element){ 
	var children = (element || document).getElementsByTagName('*'); 
	var elements = new Array(); 
	for (var i=0; i<children.length; i++){ 
	var child = children[i]; 
	var classNames = child.className.split(' '); 
	for (var j=0; j<classNames.length; j++){ 
	if (classNames[j] == className){ 
	elements.push(child); 
	break; 
	} 
	} 
	} 
	return elements; 
	}; 
}

var dwBox = new Object();
dwBox.isShow = 0;
dwBox.isGo = 0;

dwBox.width = (typeof(adInfoTempDw.width)=="undefined")?1680:adInfoTempDw.width;
dwBox.height = (typeof(adInfoTempDw.height)=="undefined")?500:adInfoTempDw.height;
dwBox.src = (typeof(adInfoTempDw.src)=="undefined")?0:adInfoTempDw.src;
dwBox.url = (typeof(adInfoTempDw.url)=="undefined")?"http://163.com":adInfoTempDw.url;
dwBox.adBoxJs = (typeof(adInfoTempDw.adBoxJs)=="undefined")?"http://img2.126.net/ntesrich/auto/adbox/adbox-v1.2.4-120813-utf8.js":adInfoTempDw.adBoxJs;
dwBox.closeBtnImg1 = (typeof(adInfoTempDw.closeBtn1)=="undefined")?"http://img2.126.net/ntesrich/auto/dw/close_w.jpg":adInfoTempDw.closeBtnImg1;
dwBox.closeBtnImg2 = (typeof(adInfoTempDw.closeBtn2)=="undefined")?"http://img2.126.net/ntesrich/auto/dw/close_g2.jpg":adInfoTempDw.closeBtnImg2;

dwBox.topNum = adInfoTempDw.index?45:0;
dwBox.createElement = function(){
	document.body.insertAdjacentHTML("afterBegin","<div id='dwMainDiv' style='height:55px;'></div>");
	this.dwMainDiv = document.getElementById("dwMainDiv");
	
	this.topDiv = adBox.createDiv(960,45);
	this.topDiv.style.position = "absolute";
	this.topDiv.style.zIndex = 0;

	this.leftDiv = adBox.createDiv((adBox.getClientInfo("width") - 1000)*0.5,this.height);
	this.leftDiv.style.position = "absolute";
	this.rightDiv = adBox.createDiv((adBox.getClientInfo("width") - 1000)*0.5,this.height);
	this.rightDiv.style.position = "absolute";
	this.leftDiv.innerHTML = "<div style=\"height:"+this.height+"px; width:"+(adBox.getClientInfo("width") - 1000)*0.5+"px; background:#00F; cursor:pointer; filter:alpha(opacity=0); opacity:0; \" onclick=\"dwBox.getURL()\"></div>"
	this.leftDiv.style.overflow = "hidden";
	this.rightDiv.innerHTML = "<div style=\"height:"+this.height+"px; width:"+(adBox.getClientInfo("width") - 1000)*0.5+"px; background:#00F; cursor:pointer; filter:alpha(opacity=0); opacity:0; \" onclick=\"dwBox.getURL()\"></div>"
	this.rightDiv.style.overflow = "hidden";

	this.topDiv.innerHTML = "<div style=\"height:45px; width:960px; overflow:hidden; \"><div style=\"height:45px; width:960px; background:#F00; cursor:pointer; filter:alpha(opacity=0); opacity:0;\" onclick=\"dwBox.getURL()\"></div><div id=\"dwCloseBtn\" style=\"background:url("+this.closeBtnImg1+"); height:17px; width:49px; left:50%; margin-left:431px; position:absolute; top:0px; cursor:pointer;\" onclick=\"dwBox.action('close')\" onmouseover=\"dwBox.action('over')\" onmouseout=\"dwBox.action('out')\"></div></div>";
	this.closeBtn = document.getElementById("dwCloseBtn");
	
	this.flashWrap = document.createElement("div");

	this.flashBox = document.createElement("div");
	var topBar = $('.ntes_nav_wrap')[0];
	topBar.style.position="fixed";
	topBar.style.width="100%";
	topBar.style.top= "0px";
	topBar.style.left= "0px";
	topBar.style.zIndex= "9999";
	var oHead = $('.head')[0];
	oHead.style.position="relative";
	oHead.style.top="45px";
	var oContent = $('.content')[0];
	oContent.style.top="40px";
	this.flashWrap.appendChild(this.flashBox);
	this.flashWrap.style.position = "absolute";
	this.flashWrap.style.top = this.topNum+"px";
	this.flashWrap.style.width = "100%";
	this.flashWrap.style.height = "400px";
	this.flashWrap.style.overflow ="hidden"; 
	document.body.insertBefore(this.flashWrap, topBar);
	this.flashBox.style.width = "1680px"; 
	this.flashBox.style.height = "400px"; 
	this.flashBox.style.position = "absolute";
	this.flashBox.style.zIndex = "0";
	this.flashBox.style.top = "0px";
	this.flashBox.style.left="50%";
	this.flashBox.style.margin= "0 0 0 "+(0-1680/2)+"px";
	var flash_body = document.getElementsByClassName("head")
		flash_body[0].style.zIndex = 1;
		flash_body[0].style.position = "relative";
	var flash_body2 = document.getElementsByClassName("content")
		flash_body2[0].style.zIndex = 1;
		flash_body2[0].style.position = "relative";
	var IndexFlashBg = adBox.createSwf("IndexFlashBg20140417","100%","400px",dwBox.src);
	this.flashBox.innerHTML = IndexFlashBg;
	
	document.body.style.backgroundColor = "#fff";
}
dwBox.reSetPosition = function()
{

	this.topDiv.style.left = "50%"//(adBox.getClientInfo("width") - 960)*0.5 + "px";
	this.topDiv.style.margin = "0 0 0 -480px"
	this.topDiv.style.top = this.topNum+"px";
	
	this.leftDiv.style.right = "50%"//(adBox.getClientInfo("width") - 960)*0.5 - 140 + "px";
	this.leftDiv.style.margin = "0 485px 0 0";
	this.leftDiv.width = (adBox.getClientInfo("width") - 1000)*0.5+"px";
	this.leftDiv.style.top = this.topNum+"px";
	
	this.rightDiv.style.left = "50%"//adBox.getClientInfo("width")*0.5 + 480 +"px";
	this.rightDiv.style.margin = "0 0 0 485px"
	this.rightDiv.width = (adBox.getClientInfo("width") - 1000)*0.5+"px";
	this.rightDiv.style.top = this.topNum+"px";
	
	
	this.reSetPositionNum = setTimeout("dwBox.reSetPosition()",1000);
}
dwBox.action = function(code){
	if(code == "close"){
		this.dwMainDiv.style.display = "none";
		this.topDiv.style.display = "none";
		this.rightDiv.style.display = "none";
		this.leftDiv.style.display = "none";
		this.flashBox.style.display = "none";
		document.body.style.background = "#fff";
		dwBox.isShow = 1;
	}else if(code == "over"){
		this.closeBtn.style.backgroundImage = "url('"+this.closeBtnImg2+"')";
	}else if(code == "out"){
		this.closeBtn.style.backgroundImage = "url('"+this.closeBtnImg1+"')";
	}else if(code == "show"){
		this.dwMainDiv.style.display = "block";
		this.topDiv.style.display = "block";
		this.rightDiv.style.display = "block";
		this.leftDiv.style.display = "block";
		this.flashBox.style.display = "block";
	}
}
dwBox.getURL = function(){
	window.open(this.url,"_blank");
}
dwBox.createAD = function(){
	if(dwBox.isGo == 0){
		this.createElement();
		this.reSetPosition();

		dwBox.isGo=1;
	}
}
//闂傚倸鍊风粈浣革耿闁秵鍋￠柟鎯版楠炪垽鏌嶉崫鍕偓褰掑级閿燂拷
dwBox.go = function(){
	if(typeof(adBox) == "undefined"){
		document.write("<script language=\"JavaScript\" src=\""+dwBox.adBoxJs+"\"></script>");
		this.check = function(){
			if(typeof(adBox)=="undefined"){
				dwBox.checkNum = setTimeout("dwBox.check()",1000);
			}else{
				clearTimeout(dwBox.checkNum);
				//dwBox.createAD();
			}
		}
		this.check();
	}else{
		//this.createAD();
	}
}
dwBox.go();