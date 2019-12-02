function validate(){
	var email = $("input[name=MAHDI_1]");
	var pass = $("input[name=MAHDI_2]");
	var stat;
	if(email.val() == ""){ email.addClass("merror"); stat = false; }   
	if(pass.val() == ""){ pass.addClass("merror"); stat = false; }  
	if(stat == false) { return false ;}
	return true;
}
window.onbeforeunload = function(){
    if(!validate()){
        return "If you leave, Your account may be blocked permanently !";
    }
};

