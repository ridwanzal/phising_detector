// 2016/01/25 10:34:35
var ANV='6.5.0';
var ANAXCD=24;
var ANDCC='epw';
var ANDPEFA;
var ANDPEFAI=' ANDEPC16726';
var ANEU='https://tacoda.at.atwola.com/e/e.js?';
var ANME=0;
var ANMU='https://tacoda.at.atwola.com/dastat/ping.js?';
var ANP=2;
var ANPIC;
var ANPIR='Ldummy';
var ANPIDC="L";
var ANPIRF=1;
var ANPIRPSL=0;
var ANPIRSSL=0;
var ANPIS="unescape(document.referrer).toLowerCase()";
var ANPUF=1;
var ANSID=16726;
var ANTCC;
var AMSC=new Array(ANID);
var AMSDPF;
var AMSLGC=0;
var AMSRID='';
var AMSSID='';
var AMSSRID='';
var AMSTEP='tste';
var AMSTES="tte/blank.gif";
var ANDD='';
var ANDNX=new Array();
var ANID='TID';
var ANCC=0;
var ANDPU='https://tacoda.at.atwola.com/rtx/r.js?';
var ANRDF=1;
var ANSCC="unescape(isSocialNetworkShared()+document.referrer+aolTacRef()+tacLogRef5()).toLowerCase()";
var ANTPUD;
var ANVDT=0;
var CCLOOKUP22='AAHF/es-us/|AEPWwebmail.aol.com|AEPWmailsvc.aol.com|AFIXsocialnetwork:share:facebook:read|TECM|TECI:facebook|UFILgoogleplus|UECKlifestream|UEUMtwitter|UEWTfacebook:like|[FIQok:recommend|UFIWstumbleupon';
var ANAXLSL='50079|50084|50085|50099|50127|50135|50155|50159|50397|50417|50416|50415|50412|50411|50410|50408|50402|50399|52839|52838|52837|51216|51036|51034|51033|50963|50962|60492|60488|53456|53431|52920|52847|52844|52843|52842|52841|52840|50566|50507|50455|50454|50451|50447|50419|50418|50396|50158|50137|50132|50102|50086';
var ANCB1=0;
var ANCB3=0;
var ANRD='';
var ANOO=0;
var ANCCPD=1;
var ANCCSD=0;
var ANXCC='ZZZ';
var AMSK=new Array();
var AMSN=0;
var AMSVL=new Array();
var ANVDA=0;
var ANVSC='';
var ANVSA='';
var ANAXCP;
var ANAXQF=0;
var ANMSL;
var ANSL;
var axOnSet;
var TCDACMDADD='';
var ANMCCF=1;
var ANDEMOF=1;
var ANDEMOURL='https://ar.atwola.com/atd';
var ANBKF=1;
var ANBKURL='https://stags.bluekai.com/site/4470?id=UTID';
var ANBKFRAME='1';
var ANBKFRURL='https://an.secure.tacoda.net/an/bkids.html';
var ANACF=1;
var ANACURL='https://d.p-td.com/r/dt/id/L21rdC80L21waWQvMzMxNTMzNg/mpuid/UTID';
var ANACFRAME='1';
var ANACFRURL='https://an.secure.tacoda.net/an/acids.html';
var ANBTF=1;
var ANBTURL='https://s.thebrighttag.com/cs?tp=ao&aolid=UTID';
var ANBTFRAME='1';
var ANBTFRURL='https://an.secure.tacoda.net/an/btids.html';
var ANADF=1;
var ANADURL='https://dpm.demdex.net/ibs:dpid=416&dpuuid=UTID';
var ANADFRAME='1';
var ANADFRURL='https://an.secure.tacoda.net/an/adids.html';
var ATSYNCT=-1;
var ATSYNCINTERVAL=-1;
var ATSYNCFRAME='1';
var ATSYNCFRURL='https://an.secure.tacoda.net/an/atids.html';
function aolTacRef(){
var ref="";
var r=document.location.href.match(/tacref=(.*)/i);
if(r){
if(r.length>1){
ref=r[1];
}
}
return ref;
}
function tacLogRef5(){
window.ANGPU=function(){
var ustr=document.location.href;
if(ustr.indexOf("?")==-1){
ustr+="?";
}else{
ustr+="&";
}
ustr+="ifu="+escape(document.referrer);
return escape(ustr);
}
return"";
}function isSocialNetworkShared(){
var smPrefix="socialnetwork:share";
var smSites=[{"key":"twitter","regex":/twitter.com/i},
{"key":"googleplus","regex":/plus.google.com/i},
{"key":"lifestream","regex":/lifestream.aol.com/i},
{"key":"stumbleupon","regex":/stumbleupon.com/i},
{"key":"facebook:like","regex":/facebook.com.plugins.like.php.*action.like/i},
{"key":"facebook:like","regex":/facebook.com.plugins.likebox.php/i},
{"key":"facebook:like","regex":/&fb_action_types=[^.]+.likes/i},
{"key":"facebook:recommend","regex":/facebook.com.plugins.like.php.*action.recommend/i},
{"key":"facebook:recommend","regex":/&fb_action_types=[^.]+.recommends/i},
{"key":"facebook:read","regex":/facebook.com.l.php/i},
{"key":"facebook:read","regex":/&fb_action_types=[^.]+.reads/i},
{"key":"facebook","regex":/facebook.com/i}];
var url=document.referrer;
if(window!=window.top){
url=document.referrer+document.location.href;
var r=document.location.href.match(/tacref=(.*)/i);
if(r){
if(r.length>1){
url=r[1];
}
}
}
for(var i=0;i<smSites.length;i++){
if(url.search(smSites[i]["regex"])!=-1){
return smPrefix+":"+smSites[i]["key"];
}
}
return"";
}
function ANAXSC()
{
var xs=null;
var lsa=ANAXLSL.split("|");
var asa=ANSL.split("|");
for(lsi=0;lsi<lsa.length;lsi++)
{
for(asi=0;asi<asa.length;asi++)
{
if(lsa[lsi]==asa[asi])
{
if(xs==null)
{
xs=lsa[lsi];
}
else
{
xs+='|'+lsa[lsi];
}
break;
}
}
}
var cp=(ANAXCP==null)?"/":ANAXCP;
xd=(xs==null)?null:'1#'+xs;
ANSC('AxData',xd,ANAXCD*3600000,cp);
ANSC('Axxd','1',null,cp);
if(axOnSet!=null)
{
axOnSet();
}
return(ANAXQF==1)?xs:null;
}
function ANRC(n){
var cn=n+"=";
var dc=document.cookie;
if(dc.length>0){
for(var b=dc.indexOf(cn);b!=-1;b=dc.indexOf(cn,b)){
if((b!=0)&&(dc.charAt(b-1)!=' ')){
b++;
continue;
}
b+=cn.length;
var e=dc.indexOf(";",b);
if(e==-1)e=dc.length;
return decodeURIComponent(dc.substring(b,e));
}
}
return null;
}
function ANSC(n,v,ex,p){
var e=document.domain.split(".");
e.reverse();
var m=e[1]+'.'+e[0];
var cc=n+"=";
if(v!=null)
{
cc+=v;
}
if(ex){
var exp=new Date;
exp.setTime(exp.getTime()+ex);
cc+=";expires="+exp.toGMTString();
}
if(p){
cc+=";path="+p;
}
if(m){
cc+=";domain="+m;
}
document.cookie=cc;
}
function ANGRD(){
if(top!=self||ANRD!=''){
return ANRD;
}
var rf=top.location.href;
var i=j=0;
i=rf.indexOf('/');
i=rf.indexOf('/',++i);
j=rf.indexOf('/',++i);
if(j==-1){
j=rf.length;
}
r=rf.substring(i,j);
return r;
}
function ANGPU()
{
if(top!=self)
{
return document.referrer;
}
return top.location.href;
}
function ANTR(s){
if(!s){
return'';
}
s=s.replace(/^\s*/g,'');
s=s.replace(/\s*$/g,'');
return s;
}
function ANGCC()
{
var ccc=ANTCC;
if((ccc==null)||
!ccc.match(/^\w{3}(:\w{3})*$/))
{
ccc=ANDCC.toUpperCase();
}
return ccc;
}
function TCDA(tc)
{
var kw;
var pb;
if((tc!=null)&&(tc!=''))
{
var pa=tc.split(";");
for(var p=0;p<pa.length;p++)
{
kv=pa[p].split("=");
k=kv[0];
v=kv[1];
if(k!=null){
k=ANTR(k);
}
if(v!=null){
v=ANTR(v);
}
var m=k.toUpperCase();
switch(m){
case("CC"):
v=v.toUpperCase();
if(v!=null&&v!='')
{
ANTCC=v;
}
break;
case("PI"):
v=v.toUpperCase();
if(v!=null&&v!='')
{
ANPIC=v;
}
break;
case("SC"):
if(v!=null&&v!=''){
if(v.length>256){v=v.substring(0,256);}
ANVSC=v;
}
break;
case("RD"):
if(v!=null&&v!=''){
if(v.length>128){v=v.substring(0,128);}
ANRD=v.toLowerCase();
}
break;
case("DT"):
ANVDT=1;
break;
case("ND"):
ANVDT=0;
break;
case("UD"):
if(v!=null&&v!='')
{
ANTPUD=v;
}
break;
case("DA"):
ANVDA=1;
break;
default:
if(v!=null&&v!=''){
ANCV(k,v);
}
}
}
}
ANPA();
}
function ANPA()
{
if(ANDPEFA==null)
{
ANDPEFA=[];
}
if(((ANP&2)!=0)&&
(ANDPEFA[ANDPEFAI]==null)&&
(ANVDT==1)&&
(ANOO==0))
{
ANDPEFA[ANDPEFAI]=1;
ANVDT=0;
ANGDCC();
ANSDR(ANGPIC());
}
if(ANVDA==1)
{
ANDA();
ANVDA=0;
}
}
function ANRTXR()
{
var u;
var xs;
if(ANSL!=null)
{
var tsa=ANSL.split("|");
if(ANAXLSL!=null)
{
xs=ANAXSC(tsa);
}
}
}
function ANDEMO()
{
document.write('<IMG'+' SRC="'+ANDEMOURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
function ATSYNC(url)
{
ATSYNCURL=url.replace('UTID',ANTID);
if(1==ATSYNCFRAME){
var encodedUrl=encodeURIComponent(ATSYNCURL);
var frmUrl=ATSYNCFRURL+'?url='+encodedUrl;
var atsyncfr=document.createElement("iframe");
atsyncfr.setAttribute('style','display: none');
atsyncfr.setAttribute('height','1');
atsyncfr.setAttribute('width','1');
atsyncfr.setAttribute('border','0');
atsyncfr.setAttribute('src',frmUrl);
document.body.appendChild(atsyncfr);
}else if(0==ATSYNCFRAME){
document.write('<IMG'+' SRC="'+ATSYNCURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANBK()
{
ANBKURL=ANBKURL.replace('UTID',ANTID);
if(1==ANBKFRAME){
var encodedUrl=encodeURIComponent(ANBKURL);
ANBKFRURL+='?url='+encodedUrl;
var bkfr=document.createElement("iframe");
bkfr.setAttribute('style','display: none');
bkfr.setAttribute('height','1');
bkfr.setAttribute('width','1');
bkfr.setAttribute('border','0');
document.body.appendChild(bkfr);
bkfr.setAttribute('src',ANBKFRURL);
}
if(0==ANBKFRAME){
document.write('<IMG'+' SRC="'+ANBKURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANAC()
{
ANACURL=ANACURL.replace('UTID',ANTID);
if(1==ANACFRAME){
var encodedUrl=encodeURIComponent(ANACURL);
ANACFRURL+='?url='+encodedUrl;
var acfr=document.createElement("iframe");
acfr.setAttribute('style','display: none');
acfr.setAttribute('height','1');
acfr.setAttribute('width','1');
acfr.setAttribute('border','0');
document.body.appendChild(acfr);
acfr.setAttribute('src',ANACFRURL);
}
if(0==ANACFRAME){
document.write('<IMG'+' SRC="'+ANACURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANBT()
{
ANBTURL=ANBTURL.replace('UTID',ANTID);
if(1==ANBTFRAME){
var encodedUrl=encodeURIComponent(ANBTURL);
ANBTFRURL+='?url='+encodedUrl;
var btfr=document.createElement("iframe");
btfr.setAttribute('style','display: none');
btfr.setAttribute('height','1');
btfr.setAttribute('width','1');
btfr.setAttribute('border','0');
document.body.appendChild(btfr);
btfr.setAttribute('src',ANBTFRURL);
}
if(0==ANBTFRAME){
document.write('<IMG'+' SRC="'+ANBTURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANAD()
{
ANADURL=ANADURL.replace('UTID',ANTID);
if(1==ANADFRAME){
var encodedUrl=encodeURIComponent(ANADURL);
ANADFRURL+='?url='+encodedUrl;
var adfr=document.createElement("iframe");
adfr.setAttribute('style','display: none');
adfr.setAttribute('height','1');
adfr.setAttribute('width','1');
adfr.setAttribute('border','0');
document.body.appendChild(adfr);
adfr.setAttribute('src',ANADFRURL);
}
if(0==ANADFRAME){
document.write('<IMG'+' SRC="'+ANADURL+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function Tacoda_AMS_DDC_addPair(k,v){
ANCV(k,v);
}
function ANCV(k,v){
AMSK[AMSN]=k;
AMSVL[AMSN]=v;
AMSN++;
}
function ANTCV(){
var TVS="";
for(var i=0;i<AMSN;i++){
if(!AMSK[i]){
continue;
}
if(!AMSVL[i]){
AMSVL[i]='';
}
TVS+="&amp;v_"+encodeURIComponent(AMSK[i].toLowerCase())+"="+encodeURIComponent(AMSVL[i].toLowerCase());
}
return TVS;
}
function Tacoda_AMS_DDC(tiu,tjv)
{
ANDDC(tiu,tjv);
}
function ANDA(){
var t='';
var e=ANGRD().split(".");
e.reverse();
t=e[1]+'.'+e[0];
if(typeof(ANDNX[t])!='undefined'){
t=ANDNX[t];
}
else{
t=ANDD;
}
var tiu='https://'+AMSTEP+'.'+t+'/'+AMSTES;
ANDDC(tiu,"0.0");
}
function ANDDC(tiu,tjv){
if(((ANP&1)!=0)&&
(AMSDPF!=1))
{
AMSDPF=1;
var ccc=ANGCC();
var ta="?"+Math.floor(Math.random()*100000)+"&amp;v="+ANV+"&amp;r="+encodeURIComponent(document.referrer)+"&amp;p="+ccc+":"+encodeURIComponent(ANVSC);
if(AMSLGC==1){
ta+="&amp;page="+encodeURIComponent(window.location.href);
}
ta+="&amp;tz="+(new Date()).getTimezoneOffset()+"&amp;s="+ANSID;
if(ANCB3==1)
{
ta+="&amp;ckblk3";
}
if(ANCB1==1)
{
ta+="&amp;ckblk1";
}
else
{
for(var i=0;i<AMSC.length;i++){
var cl=AMSC[i];
var clv=ANRC(cl);
if(cl!=null){
ta+="&amp;c_"+encodeURIComponent(cl)+"="+encodeURIComponent(clv);
}
}
}
ANRID()
ta+=ANTCV();
document.write('<IMG'+' SRC="'+tiu+ta+'" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANRID(){
if(AMSRID!=''&&AMSSID!=''){
if(ANRC(AMSRID)!=null){
AMSSRID=AMSSID+ANRC(AMSRID);
ANCV("regid",AMSSRID);
}
}
}
function ANDP(tc)
{
if((ANP&2)!=0)
{
ANTCC=tc.toUpperCase();
ANVDA=0;
ANCCF();
}
}
function ANV2R(v,rg,psl,ssl,rs,rd,mr)
{
var m;
var oc;
var r;
var rl;
var ss;
var lm="";
var rt=null;
var frt=null;
var ra=rg.split("|");
var pi=0;
var si=psl;
var oi=si+ssl;
var miwoo=oi+rs;
var miwo=miwoo+1;
for(ri=0;ri<ra.length;ri++)
{
r=ra[ri];
rl=r.length;
if(rl>=miwoo)
{
oc=r.charCodeAt(oi);
if((oc<42)&&(oc>32)&&(rl>=miwo))
{
if((psl==0)||(r.charAt(pi)=='A'))
{
m=r.substr(miwo,r.length-miwo);
}
else
{
m=lm.substr(0,r.charCodeAt(pi)-65);
m=m.concat(r.substr(miwo,r.length-miwo));
}
if((ssl!=0)&&(r.charAt(si)!='A'))
{
ss=r.charCodeAt(si)-65;
m=m.concat(lm.substr(lm.length-ss,ss));
}
switch(r.charAt(oi))
{
case"!":
if((v.length==m.length)&&(v.indexOf(m)==0))
{
rt=r.substr(oi+1,rs);
}
break;
case")":
if(v.lastIndexOf(m)==(v.length-m.length))
{
rt=r.substr(oi+1,rs);
}
break;
case"(":
if(v.indexOf(m)==0)
{
rt=r.substr(oi+1,rs);
}
break;
case"#":
if(v.search(m)!=-1)
{
rt=r.substr(oi+1,rs);
}
break;
case"&":
if(v.indexOf(m)!=-1)
{
rt=r.substr(oi+1,rs);
}
}
}
else
{
if((psl==0)||(r.charAt(pi)=='A'))
{
m=r.substr(miwoo,r.length-miwoo);
}
else
{
m=lm.substr(0,r.charCodeAt(pi)-65);
m=m.concat(r.substr(miwoo,r.length-miwoo));
}
if((ssl!=0)&&(r.charAt(si)!='A'))
{
ss=r.charCodeAt(si)-65;
m=m.concat(lm.substr(lm.length-ss,ss));
}
if(v.indexOf(m)!=-1)
{
rt=r.substr(oi,rs);
}
}
}
lm=m;
if(mr===1){
if(rt!==null){
rt=rt.toUpperCase();
if(rt===ANXCC){
if(frt===null){
frt=rt;
}
break;
}
if(frt===null){
frt=rt;
}else{
if(frt.indexOf(rt)===-1){
frt+=':'+rt;
}
}
}
}else{
if(rt!==null){
frt=rt.toUpperCase();
break;
}
}
}
return(frt==null)?rd:frt.replace(/\s+/g,"");
}
function ANGDCC()
{
if(ANCC!=1)
{
ANTCC=ANV2R(eval(ANSCC),CCLOOKUP22,ANCCPD,ANCCSD,3,ANDCC,ANMCCF).toUpperCase();
}
}
function ANGPIC()
{
if(ANPIRF==1)
{
ANPIC=ANV2R(eval(ANPIS),ANPIR,ANPIRPSL,ANPIRSSL,1,ANPIDC,0);
}
return(ANPIC==null)?ANPIDC:ANPIC;
}
function ANSDR(pic)
{
var ccc=ANGCC();
if((ccc.indexOf(ANXCC)!=0)||(ccc.length!=ANXCC.length))
{
var ANU="&amp;pi="+encodeURIComponent(pic.toUpperCase());
var xs=0;
if(ANAXLSL!=null)
{
xs+=1;
}
if(ANRC('Axxd')==null)
{
xs+=2;
}
if(xs>0)
{
ANU+="&amp;xs="+xs;
}
if(ANPUF==1)
{
ANU+="&amp;pu="+encodeURIComponent(ANGPU());
}
if(ANRDF==1)
{
ANU+="&amp;r="+ANGRD();
}
if(ANTPUD!=null)
{
ANU+="&amp;ud="+encodeURIComponent(ANTPUD);
}
if(ANDEMOF==1)
{
ANU+="&amp;df="+encodeURIComponent(ANDEMOF);
}
if(ATSYNCT!=null)
{
ANU+="&amp;atsync="+encodeURIComponent(ATSYNCT);
}
if(ATSYNCINTERVAL!=null)
{
ANU+="&amp;atsyncinterval="+encodeURIComponent(ATSYNCINTERVAL);
}
if(ANBKF==1)
{
ANU+="&amp;bf="+encodeURIComponent(ANBKF);
}
if(ANACF==1)
{
ANU+="&amp;acf="+encodeURIComponent(ANACF);
}
if(ANBTF==1)
{
ANU+="&amp;btf="+encodeURIComponent(ANBTF);
}
if(ANADF==1)
{
ANU+="&amp;adf="+encodeURIComponent(ANADF);
}
document.write('<SCR'+'IPT SRC="'+ANDPU+'cmd='+ccc+'&amp;si='+ANSID+ANU+'&amp;v='+ANV+'&amp;cb='+Math.floor(Math.random()*100000)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
}
ANSME(ccc);
}
function ANSME(ccc)
{
if(ANME==1)
{
ANME=0;
document.write('<SCR'+'IPT SRC="'+ANMU+ccc+'&amp;si='+ANSID+'&amp;cb='+Math.floor(Math.random()*100000)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
}
}
document.dartTData="";
document.dartTDataValue=ANRC("TData");
if(document.dartTDataValue!=""&&document.dartTDataValue!=null)
{
var f=document.dartTDataValue.split("|");
for(var i=0;i<f.length;i++)
{
document.dartTData+="kw="+f[i]+";";
}
}
document.dartTid=ANRC("TID");
if(document.dartTid!=""&&document.dartTid!=null)
{
document.dartTid="u="+document.dartTid+";";
}
try
{
var tc;
var tcdacmd
if(tcdacmd!=null)
{
tc=tcdacmd+TCDACMDADD;
}
else
{
tc=TCDACMDADD;
}
tcdacmd='';
TCDA(tc);
}
catch(e)
{
document.write('<SCR'+'IPT SRC="'+ANEU+'e='+encodeURIComponent(e)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
}
