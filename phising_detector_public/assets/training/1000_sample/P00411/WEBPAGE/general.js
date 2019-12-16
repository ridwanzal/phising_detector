function GlobalFriendlyCheckBoxes(TotalChecks,CurrentCheck,NameofCheck){
	var AnyChecks = false;
	
	// commented out and added as a param, doesn't work in FF - TotalChecks = document.getElementsByName(NameofCheck).length;

	for(i=1; i<=TotalChecks; i++){
		temp = document.getElementById(NameofCheck+i);
		if (CurrentCheck == 1){
			if (i == 1) {
				temp.checked = true;
			} else {
				temp.checked = false;
			}
		} else {
			if (i == 1) {
				temp.checked = true;
			} else if (i == TotalChecks){
				
				if (temp.checked){AnyChecks = true;}
				
				if(AnyChecks == false) {
					document.getElementById(NameofCheck+'1').checked = true;
				} else {
					document.getElementById(NameofCheck+'1').checked = false;
				}
			} else {
				if (temp.checked){AnyChecks = true;}
			}
		}			
	}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function CheckClear(colm){
	if (colm.value == 'username' || colm.value == 'password'){
		colm.value = '';
	}
}

function ShowHideGeneral(showhidediv){
	if (document.getElementById(showhidediv).style.display == 'none'){
		document.getElementById(showhidediv).style.display = 'block'
	} else {
		document.getElementById(showhidediv).style.display = 'none'
	}	
}

function ShowHideDiv(buttondiv,textdiv,showhidediv,forcedisplay){
	if (forcedisplay == null && document.getElementById(textdiv).innerHTML == 'hide'){
		document.getElementById(buttondiv).src = ip + "/images/buttons/show.gif";
		document.getElementById(textdiv).innerHTML = 'show';
		document.getElementById(showhidediv).style.display = 'none';
	} else {
		document.getElementById(buttondiv).src = ip + "/images/buttons/hide.gif";
		document.getElementById(textdiv).innerHTML = 'hide';
		document.getElementById(showhidediv).style.display = 'block';
	} 
}

function showHideReport(ofcVar,fcrl,fcVar) {
	var showHideReportFrame = getObj(ofcVar);
	var showHideReportLink=getObj(fcrl);
	
	if (fcVar == true){
		showHideReportFrame.style.display='none';
		showHideReportLink.style.display='none';
	} else if (showHideReportFrame.style.display=='none' && fcVar == undefined) {
		showHideReportFrame.style.display='block';
		showHideReportLink.style.display='none';
	} else {
		showHideReportFrame.style.display='none';
		showHideReportLink.style.display='block';
	}
}

function ShowHideTR(showhidediv,forcedhide,forcedisplay,formToChange,formValue){
	document.getElementById(showhidediv).style.display = '';
	document.getElementById(forcedhide).style.display = 'none';
	document['SearchForm'][formToChange].value = formValue;
}


function ToggleBoxes(form,field,controller) {
	var action = document[form][controller].checked;
	var loopTo = document[form][field].length;
	if (loopTo) {
		for (var i=0; i<loopTo; i++) {
			document[form][field][i].checked = action;
		}
	} else {
		document[form][field].checked = action;
	}
	if (document[form].select_all1 && document[form].select_all2) {
		document[form].select_all1.checked = action;
		document[form].select_all2.checked = action;
	}
}

function getObj(objID) {
	var obj = '';
	if(document.getElementById){
		obj=document.getElementById(objID);
	}else if(document.all){
		obj=document.all[objID];
	}else{
		obj=window[objID];
	}
	return obj;
}

function GenderClick(gen,that) {
	if (that.checked) {
		eval('document.gender.' + gen + '_min_age.selectedIndex = 1');
		eval('document.gender.' + gen + '_max_age.selectedIndex = 82');
	} else {
		eval('document.gender.' + gen + '_min_age.selectedIndex = 0');
		eval('document.gender.' + gen + '_max_age.selectedIndex = 0');
	}
	var oppGen = OppGenderObject(that)
	if (!that.checked && !oppGen.checked) {
		oppGen.checked = true;
		GenderClick(oppGen.name,oppGen);
	}
}

function OppGenderObject(that) {
	if (that.name == 'male') {
		return document.gender.female;
	} else {
		return document.gender.male;
	}
}

function showHideReportConcern(ofcVar, fcrl) {
    var showHideReportFrame = getObj(ofcVar);
    var showHideReportLink = getObj(fcrl);
    var showHideReportOverlay = getObj('ReportConcernOverlay');

    if (showHideReportFrame.style.display == 'none') {
        
        showHideReportFrame.style.display = 'block';
        showHideReportOverlay.style.display = 'block';
        showHideReportLink.style.display = 'none';
    } else {
        showHideReportFrame.style.display = 'none';
        showHideReportOverlay.style.display = 'none';
        showHideReportLink.style.display = 'block';
    }
}