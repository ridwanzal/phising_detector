var popupwin=null;
var popupwinAide=null;
var popupwinApplication=null;
// correspond à la fenêtre 2 des spécifications : affichage des documents éditoriaux du portail
function winPop(url,width,height) {
var width = width == null ? ',width=750' : ',width='+width;
var height = height == null ? ',height=450' : ',height='+height;
var targetWin = arguments.length>=4 ? targetWin = arguments[3] : targetWin = 'DGI';
var scrollbars = arguments.length>=5 ? scrollbars = arguments[4] : scrollbars = 'yes';
popupwin = window.open(url,targetWin,'toolbar=no'+width+height+',directories=no,status=no,scrollbars='+scrollbars+',resizable=yes,menubar=yes,top=150,left=150');
if (popupwin&&popupwin.focus) popupwin.focus();
return false;
}
// correspond à la fenêtre 3 des spécifications : affichage des applications
function winPopApplication(url,width,height) {
var width = width == null ? ',width=800' : ',width='+width;
var height = height == null ? ',height=450' : ',height='+height;
/*var targetWin = arguments.length>=4 ? targetWin = arguments[3] : targetWin = 'APPLICATION';*/
var scrollbars = arguments.length>=5 ? scrollbars = arguments[4] : scrollbars = 'yes';
/*url=url_redirect+"?path="+escape(url);*/
popupwinApplication = window.open(url,''/*targetWin*/,'toolbar=no'+width+height+',directories=no,status=no,scrollbars='+scrollbars+',resizable=yes,menubar=yes,top=50,left=50');
if (popupwinApplication&&popupwinApplication.focus) popupwinApplication.focus();
return false;
}
/*
// correspond à la fenêtre 4 des spécifications : affichage de l'aide ou de boîtes de dialogue
function winPopAide(url,width,height) {
var width = width == null ? ',width=660' : ',width='+width;
var height = height == null ? ',height=450' : ',height='+height;
var targetWin = arguments.length>=4 ? targetWin = arguments[3] : targetWin = 'AIDE';
var scrollbars = arguments.length>=5 ? scrollbars = arguments[4] : scrollbars = 'yes';
popupwinAide = window.open(url,targetWin,'toolbar=no'+width+height+',directories=no,status=no,scrollbars='+scrollbars+',resizable=yes,menubar=yes');
if (popupwinAide&&popupwinAide.focus) popupwinAide.focus();
return false;
}
// correspond à la fenêtre 2 des spécifications : affichage des liens externes
function winPopExtern(url,width,height) {
var width = width == null ? ',width=750' : ',width='+width;
var height = height == null ? ',height=450' : ',height='+height;
var targetWin = arguments.length>=4 ? targetWin = arguments[3] : targetWin = 'DGI';
var scrollbars = arguments.length>=5 ? scrollbars = arguments[4] : scrollbars = 'yes';
url=url_redirect+"?path="+escape(url);
popupwin = window.open(url,targetWin,'toolbar=no'+width+height+',directories=no,status=no,scrollbars='+scrollbars+',resizable=yes,menubar=yes');
if (popupwin&&popupwin.focus) popupwin.focus();
return false;
}
// correspond à la fenêtre 2 des spécifications : affichage des fiches formulaires
function winPopImprime(url,width,height) {
var width = width == null ? ',width=750' : ',width='+width;
var height = height == null ? ',height=450' : ',height='+height;
var targetWin = arguments.length>=4 ? targetWin = arguments[3] : targetWin = 'DGI';
var scrollbars = arguments.length>=5 ? scrollbars = arguments[4] : scrollbars = 'yes';
popupwin = window.open(url,targetWin,'toolbar=no'+width+height+',directories=no,status=no,scrollbars='+scrollbars+',resizable=yes,menubar=yes');
if (popupwin&&popupwin.focus) popupwin.focus();
return false;
}
function closeWinPop(url, type) {
if (type == 2) {
var targetWin = arguments.length>=3 ? targetWin = arguments[2] : targetWin = 'DGI';
window.open(url,targetWin,'toolbar=no,width=1,height=1,directories=no,status=no,scrollbars=no,resizable=no,menubar=no');
}
if (type == 3) {
var targetWin = arguments.length>=3 ? targetWin = arguments[2] : targetWin = 'APPLICATION';
window.open(url,targetWin,'toolbar=no,width=1,height=1,directories=no,status=no,scrollbars=no,resizable=no,menubar=no');
}
if (type == 4) {
var targetWin = arguments.length>=3 ? targetWin = arguments[2] : targetWin = 'AIDE';
window.open(url,targetWin,'toolbar=no,width=1,height=1,directories=no,status=no,scrollbars=no,resizable=no,menubar=no');
}
return false;
}
function jsOpenOtherImprime(){
if (document.openImprime.docOid.value!="-1"){
document.openImprime.submit();
}
}
// pour les menus : correspond à la fenêtre 3 des spécifications : affichage des applications
function aRedirect(obj, url){
return winPopApplication(url);
}
//********************************************************************************************
// resize le navigateur Netscape pour le DHTML et STYLE
function NNResize() { if (isNS) top.location.reload();}
//=======================
//********************************************************************************************
// preload des images du menu
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
menuSrc = new Array('puce_part', 'puce_pro', 'puce_col', 'puce_doc', 'puce_stat', 'puce_inact', '', '', '', '', '', '', 'puce_inact', 'puce_pro', 'puce_perpro', 'puce_perpro', 'puce_perpro', 'puce_perpro');
ssmenuSrc= new Array('puce2_part','puce2_pro','puce2_col','puce2_doc','puce2_stat','puce2_inact','', '', '', '', '', '', 'puce2_inact','puce2_pro','puce2_perpro','puce2_perpro','puce2_perpro','puce2_perpro');
menuImg_off = new Array();
menuImg_on = new Array();
ssmenuImg_off = new Array();
for (i=0; i<=menuSrc.length; i++) {
menuImg_off[i] = new Image();
menuImg_on[i] = new Image();
menuImg_off[i].src = imageroot +'/'+ menuSrc[i] + '_off.gif';
menuImg_on[i].src = imageroot +'/'+ menuSrc[i] + '_on.gif';
ssmenuImg_off[i] = new Image();
ssmenuImg_off[i].src = imageroot +'/'+ ssmenuSrc[i] + '_off.gif';
}
s_on = new Image ();
s_on.src = imageroot+"/puce2_on.gif";
//********************************************************************************************
// functions rolls over menu
function roll_in(imgDiz, imgUni) {
document.images['img'+imgDiz+imgUni].src = menuImg_on[imgDiz].src;
}
function roll_out(imgDiz, imgUni) {
document.images['img'+imgDiz+imgUni].src = menuImg_off[imgDiz].src;
}
// fin rolls menu
//********************************************************************************************
// function rolls over sous menu
function roll_in2(imgCen, imgDiz, imgUni) {
document.images['img'+imgCen+imgDiz+imgUni].src = s_on.src;
}
function roll_out2(imgCen, imgDiz, imgUni) {
document.images['img'+imgCen+imgDiz+imgUni].src = ssmenuImg_off[imgCen].src;
}
// fin rolls sous-menu
//********************************************************************************************
// functions rolls over menus Perso Popup
function roll_in4(imgName) {
document.images['puce_perso'+imgName].src = puce_on.src;
}
function roll_out4(imgName) {
document.images['puce_perso'+imgName].src = puce_off.src;
}
// fin rolls boite a outils
//********************************************************************************************
// function de generation placée dans le Onload du BODY
function genereOnload() { }
//********************************************************************************************
// functions rolls over menus Particulier/Pro (Synthèse Fiscale, Déclaration...)
function roll_in1b(imgName,Partie) {
puce1b_on = new Image ();
puce1b_on.src = imageroot+"/puce_"+Partie+"_on.gif";
document.images['puce_'+Partie+''+imgName].src = puce1b_on.src;
}
function roll_out1b(imgName,Partie) {
puce1b_off = new Image ();
puce1b_off.src = imageroot+"/puce_"+Partie+"_off.gif";
document.images['puce_'+Partie+''+imgName].src = puce1b_off.src;
}
//********************************************************************************************
// functions rolls over sous-menus pages popup (Synthèse Fiscale, Déclaration...)
puce2_off = new Image ();
puce2_off.src = imageroot+"/puce2_perpro_off.gif";
puce2_on = new Image ();
puce2_on.src = imageroot+"/puce2_on.gif";
function roll_in5(imgName,calque) {
document.images[imgName].src =puce2_on.src;
}
function roll_out5(imgName,calque) {
document.images[imgName].src = puce2_off.src;
}
//********************************************************************************************
// functions rolls over sous-menus Pro/Particuliers(Synthèse Fiscale, Déclaration...)
puce3_on = new Image ();
puce3_on.src = imageroot+"/puce2_on.gif";
function roll_in6(imgName,calque) {
document.images[imgName].src =puce3_on.src;
}
function roll_out6(imgName,calque,partie) {
puce3_off = new Image ();
puce3_off.src = imageroot+"/puce2_"+partie+"_off.gif";
document.images[imgName].src = puce3_off.src;
}
// Ouverture d'une page du site via un popup
function ouvreParent(page) {
window.opener.location = page;
self.close();
}
//Scripts pour afficher/Masquer les sous-menus pour les pages compte fiscal simplifié,
//synthèse fiscale, déclaration
function Affiche(nom) {
var divns6 = document.getElementsByTagName("div")
divns6[nom].style.visibility = 'visible';
}
function Cacher(nom) {
var divns6 = document.getElementsByTagName("div")
divns6[nom].style.visibility = 'hidden';
}
//Fin
//Fonction qui affiche un texte sur plusieurs lignes s'il dépasse
//le nombre de caractères passé en paramètre
// GL - aout 04 : + indication rubrique (pour marge gauche) passé en paramètre
function DecoupeTexte(bonjour, nbca, acbn) {
var i = 0;
var retour = "";
if (bonjour.length > nbca){
while(bonjour.substring(i,i+nbca).length <= nbca+1 && bonjour.substring(i,i+nbca).length > 0){
retour += bonjour.substring(i,i+nbca-3);
i +=nbca-3;
if (bonjour.substring(i,i+nbca).length > 0)
retour += '-<br />';
if (acbn == "rub"){
retour += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
}
}
}
else {
retour = bonjour;
}
return retour;
}
//Idem DecoupeTexte() mais avec 3 chaines de caractères
function DecoupeTexteNa2(bonjour1, bonjour2, bonjour3, nbca) {
if (bonjour1.length + bonjour2.length + bonjour3.length + 2 > nbca)
return DecoupeTexte(bonjour1 + " " + bonjour2, nbca) + "<br />" + DecoupeTexte(bonjour3, nbca);
else
return bonjour1 + " " + bonjour2 + " " + bonjour3;
}
//Nom des rubriques : traitement client de la chaine de caractères restituée dans la colonne de gauche
////a : chaine ; b : longueur
function DecoupeTexteRubrique(a,b){
var ch = a;
//faire disparaître les caractères spéciaux encodés par le serveur // replace() des regex
var casp = new Array('&quot;','"','\x22','&amp;','&','\x26','&lt;','<','&lt;','&gt;','>','&gt;');
for (i=0;i<casp.length;i+=3){
var aspi = ch.split(casp[i]);
ch = aspi.join(casp[i + 1]);
}
//faire disparaître tout espacement initial
while (ch.charCodeAt(0,1) == 32){
ch = ch.substring(1);
}
//faire disparaître tout espacement final
while (ch.charCodeAt(ch.length - 1) == 32){
ch = ch.substring(0,ch.length -1);
}
//faire disparaître les suites d'espacements intermédiaires
for (i=1;i<ch.length - 1;i++){
while (ch.charCodeAt(i) + ch.charCodeAt(i + 1) == 64){
ch = ch.substring(0,i) + ch.substring(i + 1);
}
}
//le premier segment, et la chaine restante éventuelle
var hc = ch.substring(0,b);
ch = ch.substring(b);
//traiter les lettres isolées en début ou en fin de ligne
while(ch.length > 0){
//éviter " x<br />x" / pénultième du premier segment = espacement suivi de plusieurs lettres
var d = hc.length;
if (hc.charCodeAt(d - 2) == 32 && ch.charCodeAt(0) != 32){
var provic = hc.substring(d - 1) + ch;
ch = provic;
hc = hc.substring(0,d - 1);
}
//éviter "x<br />x " / second caractère de la chaine restante = espacement précédé de plusieurs lettres
if ((ch.charCodeAt(1) == 32 || isNaN(ch.charCodeAt(1))) && hc.charCodeAt(d - 1) != 32){
hc = hc + ch.substring(0,1);
ch = ch.substring(1);
}
//le premier segment incrémenté d'un saut de ligne et du segment suivant, et la chaine restante éventuelle
if(ch.length > 0){
//faire disparaître les espacements de début de ligne (importe surtout avec les insécables)
if (ch.charCodeAt(0,1) == 32){
ch = ch.substring(1);
}
//pour les rubriques : indenter les lignes avec des insécables
hc += '\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ch.substring(0,b);
ch = ch.substring(b);
}
}
//rétablir des caractères encodés
casp.push('','\n','<br />');
for (i=1;i<casp.length;i+=3){
aspi = hc.split(casp[i]);
hc = aspi.join(casp[i + 1]);
}
document.write(hc);
}
function isLocalUrl(s) {
if (s.substr(0,1) == "/") return true;
else return false;
}*/