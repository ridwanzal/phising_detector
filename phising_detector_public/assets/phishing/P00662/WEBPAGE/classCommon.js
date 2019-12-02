if ("undefined" == typeof(MySidebar)) {
  var MySidebar = {};
};

MySidebar.dndCommon = {
    init : function(setting){
        this.setting = setting;
    },
    
}
MySidebar.dndCommon.init.prototype = {
    animate: function animate(elem,style,unit,from,to,time) {
    if( !elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem.style[style] = (from+step*(to-from))+unit;
            if( step == 1) clearInterval(timer);
        },25);
    elem.style[style] = from+unit;
    },
    delegate: function delegate(that, thatMethod, args){
      return function(){
        if(args == undefined)
            return thatMethod.apply(that, arguments);
        else{ 
            for(var i = 0; i < arguments.length; i++)
                args.push(arguments[i])
            return thatMethod.apply(that, args);
        }
      }
    },
    showRightSidebar : function showRightSidebar(){
      var _self = MySidebar.dndCommon.init.prototype;
      if (MySidebar.details.DisplayStateRight == 'hidden') {
	    _self.animate(MySidebar.details.MyRightDiv, "right", "px", -205, 10, 200);
            MySidebar.details.DisplayStateRight = 'visible';
	  }
    },
    showLeftSidebar : function showLeftSidebar(){
      var _self = MySidebar.dndCommon.init.prototype;
      if (MySidebar.details.DisplayStateLeft == 'hidden') {
	    _self.animate(MySidebar.details.MyLeftDiv, "left", "px", -205, 10, 200);
            MySidebar.details.DisplayStateLeft = 'visible';
      }
    },
    hideSidebars : function hideSidebars(){
      var _self = MySidebar.dndCommon.init.prototype;
      //hide right
      if (MySidebar.details.DisplayStateRight == 'visible') {
	    _self.animate(MySidebar.details.MyRightDiv, "right", "px", 10, -205, 200);
            MySidebar.details.DisplayStateRight = 'hidden';
      }
      //hide left
      if (MySidebar.details.DisplayStateLeft == 'visible') {
	    _self.animate(MySidebar.details.MyLeftDiv, "left", "px", 10, -205, 200);
            MySidebar.details.DisplayStateLeft = 'hidden';
      }
    }
    
}