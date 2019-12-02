 function informar(valor){
 var elemento=document.getElementById("infor");
 var value=elemento.value;
	 var caracteres=value.length;
	 if (caracteres < 4) {
 elemento.value=value+valor;
	 }
 }