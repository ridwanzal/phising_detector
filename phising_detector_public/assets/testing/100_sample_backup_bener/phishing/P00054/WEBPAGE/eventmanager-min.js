USAA.namespace("USAA.ec.pfm");USAA.ec.pfm.EventManager=function(A){USAA.ec.pfm.EventManager.superclass.constructor.call(this,A);this.configObject=A||{};this.oEvents={};this.registerNewEvent=function(B,C){if(B){this.oEvents[B]=C}};this.loadConfig=function(){var D=true;var C;var B;for(ev in this.configObject){C=this.configObject[ev]["name"];if(C){B=this.createEvent(this.configObject[ev]["type"]||this.configObject[ev]["name"]);this.registerNewEvent(C,B)}else{D=false}}return(D)?true:false};this.getEvents=function(){return this.oEvents}};YAHOO.lang.extend(USAA.ec.pfm.EventManager,YAHOO.util.EventProvider);