if ("undefined" == typeof(MySidebar)) {
  var MySidebar = {};
};

MySidebar.searchFunc = {
    getSearchedImage : function getImage(node){
      var theImg = null; 
		if  ( "img" == node.nodeName.toLowerCase() ) {
			theImg = node;
		}else{
		      if ("#text" != node.nodeName.toLowerCase()) {
			var firstImage = node.getElementsByTagName('IMG')[0];
			theImg = firstImage;
		      }
		}
	return theImg;
     },
     getSearchedText : function getText(node){
      var theText = null;
	if (1 == node.nodeType) {
	    theText = node.innerHTML;
	}else{
	    theText = node.nodeValue;
	}
      return theText;
     },
    search : function search(where, key){
      var _self = MySidebar.searchFunc;
      var thisUrl;
	switch (where) {
                case "side_google_search":
		    thisUrl = "https://www.google.ro/search?q="+key;
                    break;
                case "side_wikipedia_search":
		    thisUrl = " http://en.wikipedia.org/wiki/Special:Search?search="+key;
                    break;
                case "side_youtube_search":
		    thisUrl = "http://www.youtube.com/results?search_query="+key;
                    break;
                case "side_translate_search":
		    thisUrl = "http://translate.google.com/?langpair=en/ro&text="+key;
                    break;
                case "side_image_search":
		  if (DraggedElem == undefined)
		  {
			thisUrl = key;
			break;
		  }
		  var myImg = _self.getSearchedImage(DraggedElem);
		    if(myImg) {
		      var myImgSrc = myImg.src;
		      thisUrl = "http://images.google.com/searchbyimage?image_url="+myImgSrc;
		    }else{
		      var myText = _self.getSearchedText(DraggedElem);
		      var myHtml = document.createElement("div");
		      myHtml.innerHTML = myText;
		      var myfText = myHtml.textContent || myHtml.innerText || "";
		      thisUrl = "https://www.google.com/search?tbm=isch&q="+myfText;
		    }    
                    break;
		  default:
			//communicate to get link
			thisUrl = "";
		      
            }
	var Communicate = new MySidebar.communicate.sendRequest({url: thisUrl, method:"SidebarSearch",arguments: {key : key, where : where},directCall:1}, null);
    },
    share : function share(where, key){
      var thisUrl;
      var _self = MySidebar.searchFunc;
	switch (where) {
                case "side_facebook":
		    thisUrl = "https://www.facebook.com/sharer/sharer.php?u="+key; 
                    break;
                case "side_twitter":
		    thisUrl = "https://twitter.com/share?&text="+key; // not working on complex strings
		    //var thisUrl = MySidebar.TokenizeUrl.parse(thisUrl);
		    //console.log(thisUrl);
                    break;
                case "side_googleplus":
		    thisUrl = "http://plus.google.com/share?url="+encodeURIComponent(key);  // not working
		    
		    //console.log(thisUrl);
                    break;
                case "side_linkedin":
		    thisUrl = "http://www.linkedin.com/shareArticle?mini=true&url="+key;
                    break;
                case "side_pinterest":
		  var myImg = _self.getSearchedImage(DraggedElem);
		    thisUrl = "http://pinterest.com/pin/create/bookmarklet/?media="+myImg.src+"&url="+key+"&is_video=false" //needs work
                    break;
		  default:
		//communicate to get link
		    thisUrl = "";
            }
	var Communicate = new MySidebar.communicate.sendRequest({url: thisUrl, method:"SidebarShare",arguments: {key : key, where : where},directCall:1}, null);    
    }
    
}