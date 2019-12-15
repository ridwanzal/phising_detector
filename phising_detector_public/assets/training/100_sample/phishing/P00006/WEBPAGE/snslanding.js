function snslp_aligntoelement(obj,id){
	var mywidth=parseInt(obj.offsetWidth);
	var myleft=parseInt(obj.offsetLeft);
	mycenter=mywidth/2;
	myposition=0-mycenter;
	myposition=myleft-myposition-60;
	currobj=obj;
	while(currobj.tagName!="DIV") {
		currobj=currobj.nextSibling;
	}
	if(id==1) {
		currobj.className='snslp_pop'
		currobj.style.left=myposition + "px";
	} else {
		currobj.className='snslp_pop1'
		currobj.style.left="";
	}
}
function cleanupchromejs(elemt){
	var re = new RegExp("</?(table|tr|td)([^>]*)>", "gi");
	var re1=new RegExp("</div><!-- End center stage for syndicated chrome --\>","gi");
	var re2=new RegExp('<!-- Begin center stage for syndicated chrome --\><div id="content" class="contentTemplate"><img src="http://cdn.channel.aol.com/a/a" alt="" border="0" height="0" width="542"><br>',"gi");
	elemt=elemt.replace(/\n/gi,"");
	elemt=elemt.replace(re,"");
	elemt=elemt.replace(re1,"");
	return(elemt.replace(re2,""));
}

function isEmpty(nVal) {
	if(nVal == null) return true;
	if(nVal == undefined) return true;
	if(nVal.length == 0) return true;
	if(nVal.length == "") return true;
	return false;
}

function modifyCreateAccountLink() {
	var atagpat=/A/gi;
	if(!isEmpty(snEleHref) && !isEmpty(snEleTitle)) {
		var snEle = document.getElementById('getSn');
		if (!isEmpty(snEle) && snEle.nodeName.match(atagpat)) {
			snEle.href = snEleHref;
			snEle.text = snEleTitle;
			snEle.title = snEleTitle;
			snEle.textContent = snEleTitle;
			snEle.innerHTML = snEleTitle;
		}
	}
}
