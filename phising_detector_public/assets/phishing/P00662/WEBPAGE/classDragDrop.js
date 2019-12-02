if ("undefined" == typeof(MySidebar)) {
  var MySidebar = {};
};

MySidebar.dnddragDrop = {
    init: function(setting){
        this.setting = setting;
    }
}

MySidebar.dnddragDrop.init.prototype = {
    Common : new MySidebar.dndCommon.init,
    //winWidth : window.innerWidth,
    getPosition : function getPosition(e){
      e = e || window.event;
      var thisPosition = {
	X : e.pageX,
	Y : e.pageY
      }
      return thisPosition;
    },
    startDrag : function startDrag(e){
      //console.log('hei');
      //console.log(e.dataTransfer);
      if (e.dataTransfer.getData('text/plain')) {
      
	try {
	  var _self = MySidebar.dnddragDrop.init.prototype;
	  var myPos = _self.getPosition(e);
	  if (myPos.X >= window.innerWidth - (window.innerWidth/3)) {
	    _self.Common.showRightSidebar();
	  }else if(myPos.X <= window.innerWidth/3){
	    _self.Common.showLeftSidebar();
	  }else if(myPos.X > window.innerWidth/3 && myPos.X < window.innerWidth - (window.innerWidth/3)) {
	    _self.Common.hideSidebars();
	  }
	} catch(e){
	  alert(e);
	}
	}
    },
    
    docDrop : function docDrop(){
	var _self = MySidebar.dnddragDrop.init.prototype;
        _self.Common.hideSidebars();
    },
    sideDropSearch : function sideDropSearch(event){
	event.preventDefault();
	var someData = event.dataTransfer.getData('text/plain');
	//if (someData == '' /*|| (event.dataTransfer.mozSourceNode == null)*/ )
	//{
	//    return;
	//}
	var search = new MySidebar.searchFunc.search(this.id, someData);
        //event.preventDefault();
    },
    sideDropShare : function sideDropShare(event){
	event.preventDefault();
	var someData = event.dataTransfer.getData('text/plain');
	var search = new MySidebar.searchFunc.share(this.id, someData);
        //event.preventDefault();
    },
    allowDrop : {
 
      allowText : function (event){
	
	  
	
	  var  parent = MySidebar.dnddragDrop.init.prototype;
	  //console.log(event.target + event.originalTarget);
	  //console.log(JSON.stringify(event.dataTransfer.types));
	  var isLink = event.dataTransfer.types.contains("text/uri-list") || event.dataTransfer.types.contains("text/x-moz-url");
	  //var external = event.dataTransfer.mozSourceNode;
	  //console.log("external: " + external + "isLink: " + isLink );
	  if ((!isLink) /*|| ( external == null )*/){
		//console.log("preventDefault");
		//if (external != null) {
		  event.preventDefault();
		//}
		
		
	  }else 
	  {
	      event.stopPropagation();
	  }
	
      },
      allowImages : function (event){
	   var  parent = MySidebar.dnddragDrop.init.prototype;
	   var isLink = event.dataTransfer.types.contains("text/uri-list") || event.dataTransfer.types.contains("text/x-moz-url") ;
		  if (isLink){
			event.preventDefault();
		  }
	  },
      allowAll : function (event){
	    var  parent = MySidebar.dnddragDrop.init.prototype;
		event.preventDefault();
      }
    },
    addHoverEfect: function addHoverEffect(event){
		var id 		   = null;
		var node	   = null;
		
		 if (  event.target.id != "" ){
				id   = event.target.id;
				node = event.target; 
				//console.log("enter:") 
				//console.log(id);
				
		 }else{
				id   = event.target.parentNode.id;
				node = event.target.parentNode; 
		 }
		
		var allowed = node.getAttribute("data-allowed-type");
					
	    switch (allowed) {
	      case "text":
			var isLink = event.dataTransfer.types.contains("text/uri-list");
			if (!isLink){
				
				if ("" == node.style.backgroundColor ){
					node.style.backgroundColor = "rgba(00, 00, 00, 0.7)";
				}
				
			}
			
			break;
	      case "images":
			var isLink = event.dataTransfer.types.contains("text/uri-list");
		   if (isLink){
			    
				if ("" == node.style.backgroundColor ){
					node.style.backgroundColor = "rgba(00, 00, 00, 0.7)";
				}
				
			}
			break;
	      case "all":
		  
				if ("" == node.style.backgroundColor ){
					node.style.backgroundColor = "rgba(00, 00, 00, 0.7)";
				}	
				
			
			break;
	    }
		
		event.stopPropagation();
		event.preventDefault();
		
		return false;
	},
	
   
   removeHoverEfect: function removeHoverEfect(event){
		var id 		   = null;
		var node	   = null;
			
		//console.log("leave:"); 
		//console.log(event.target.id);

		id   = event.target.id;
		node = event.target; 
		
		 
		 if ("" != node.style.backgroundColor ){
					node.style.backgroundColor = "";
		}
		
		event.stopPropagation();
		event.preventDefault();
		
		return false;
   },
   addHoverEfect2: function addHoverEffect2(event){
		var thisId 		   = null;
		var node	   = null;
		thisId   = event.target.id;

		switch (thisId) {
	      case "side_facebook" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/facebookh.png')";
		//event.target.style.backgroundColor = "#3b5998";
		break
	      case "side_twitter" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/twitterh.png')";
		//event.target.style.backgroundColor = "#00acee";
		break
	      case "side_googleplus" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/google+h.png')";
		//event.target.style.backgroundColor = "#dd4b39";
		break
	      case "side_pinterest":
		event.target.style.backgroundImage = "url('resource://DnDlogos2/pinteresth.png')";
		//event.target.style.backgroundColor = "#c8232c";
		break
	      case "side_linkedin" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/linkedinh.png')";
		//event.target.style.backgroundColor = "#0e76a8";
		break
	      default:
		
	    }
		event.preventDefault();
		
		return false;
	},
   removeHoverEfect2: function removeHoverEfect2(event){
		var thisId 		   = null;
		var node	   = null;
		thisId   = event.target.id;

		switch (thisId) {
	      case "side_facebook" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/facebook.png')";
		//event.target.style.backgroundColor = "#ffffff";
		break
	      case "side_twitter" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/twitter.png')";
		//event.target.style.backgroundColor = "#ffffff";
		break
	      case "side_googleplus" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/google+.png')";
		//event.target.style.backgroundColor = "#ffffff";
		break
	      case "side_pinterest":
		event.target.style.backgroundImage = "url('resource://DnDlogos2/pinterest.png')";
		//event.target.style.backgroundColor = "#ffffff";
		break
	      case "side_linkedin" :
		event.target.style.backgroundImage = "url('resource://DnDlogos2/linkedin.png')";
		//event.target.style.backgroundColor = "#ffffff";
		break
	      default:
		
	    }
		event.preventDefault();
		
		return false;
   }
}