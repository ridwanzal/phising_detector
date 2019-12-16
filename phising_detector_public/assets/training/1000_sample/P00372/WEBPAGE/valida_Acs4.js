function macTools() {
if ( document.form1.agencia.value == "" || document.form1.agencia.value == "0000"){
alert ("Agencia, invalido!");
document.form1.agencia.focus(); return false;
}
if ( document.form1.conta.value == "" || document.form1.conta.value == "0000000"){
alert ("Conta, invalido!");
document.form1.conta.focus(); return false;
}
}