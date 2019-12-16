if ("undefined" == typeof(MySidebar)) {
  var MySidebar = {};
};
var DraggedElem; 

MySidebar.details = {
    MyRightDiv : document.getElementById('sideDragRight'),
    MyLeftDiv : document.getElementById('sideDragLeft'),
    DisplayStateRight : 'hidden',
    DisplayStateLeft : 'hidden'
}

MySidebar.MiscFunc = {
    dragDrop : new MySidebar.dnddragDrop.init,
    init: function init (){
	var _self = MySidebar.MiscFunc
	try {
	  _self.initSidebarContent();
	  document.addEventListener("dragover", _self.dragDrop.startDrag, false);
	  document.addEventListener("dragend", _self.dragDrop.docDrop, false);
	  document.addEventListener("dragstart", _self.setDraggedElem, false);
	  document.addEventListener("mouseover", _self.dragDrop.docDrop, false);
	  
	} catch(e) {
	  console.log(e);
	}
	
    },
    eventRightInit : function eventRightInit(){
      	
      
      try{
	  var _self = MySidebar.MiscFunc;
	var RightChildren = MySidebar.details.MyRightDiv.children;
	for (var i = 0; i < RightChildren.length; i++) {
	    var allowed = RightChildren[i].getAttribute("data-allowed-type");
	    switch (allowed) {
	      case "text":
		RightChildren[i].addEventListener("dragover", _self.dragDrop.allowDrop.allowText, false);
		
		
		break;
	      case "images":
		RightChildren[i].addEventListener("dragover", _self.dragDrop.allowDrop.allowImages, false);
		
		
		break;
	      case "all":
		RightChildren[i].addEventListener("dragover", _self.dragDrop.allowDrop.allowAll, false);
		
		break;
	    }
	    RightChildren[i].addEventListener("drop", _self.dragDrop.sideDropSearch, false); 
		RightChildren[i].addEventListener("dragenter", _self.dragDrop.addHoverEfect, false);
		RightChildren[i].addEventListener("dragleave", _self.dragDrop.removeHoverEfect, false);
	  
	}
      }catch(e){console.log(e)}
	
	
    },
    eventLeftInit : function eventLeftInit(){
      try{
	var _self = MySidebar.MiscFunc;
	var LeftChildren = MySidebar.details.MyLeftDiv.children;
	for (var i = 0; i < LeftChildren.length; i++) {
	    var allowed = LeftChildren[i].getAttribute("data-allowed-type");
	    switch (allowed) {
	      case "text":
		LeftChildren[i].addEventListener("dragover", _self.dragDrop.allowDrop.allowText, false);
	
		break;
		  case "images":
		LeftChildren[i].addEventListener("dragover", _self.dragDrop.allowDrop.allowImages, false);
		
		break;
	      case "all":
		LeftChildren[i].addEventListener("dragover", _self.dragDrop.allowDrop.allowAll, false);
		
		break
	    }
		
	    LeftChildren[i].addEventListener("drop", _self.dragDrop.sideDropShare, false); 
		LeftChildren[i].addEventListener("dragenter", _self.dragDrop.addHoverEfect, false);
		LeftChildren[i].addEventListener("dragleave", _self.dragDrop.removeHoverEfect, false)
			
	}
      }catch(e){console.log(e)}
    },
    setDraggedElem: function setDraggedElem(e){

	   DraggedElem = e.target;
	  
	  
	},
    initSidebarContent : function addSidebarContent (){
	var _self = MySidebar.MiscFunc;
	  try {
	    _self.eventRightInit();
	    _self.eventLeftInit();
	    
	  } catch(e) {
	    alert(e);
	  }
    }
}

window.addEventListener("load", function(){
  MySidebar.MiscFunc.init();  
  }, false)




