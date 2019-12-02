var is;
var isIE3Mac = false;
// this section is designed specifically for IE3 for the Mac

function Is () {   // convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();

    // *** BROWSER VERSION ***
    // Note: On IE5, these return 4, so use is.ie5up to detect IE5.
    this.major = parseInt(navigator.appVersion);
    this.minor = parseFloat(navigator.appVersion);

    this.nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1));
    this.nav2 = (this.nav && (this.major == 2));
    this.nav3 = (this.nav && (this.major == 3));
    this.nav4 = (this.nav && (this.major == 4));
    this.nav4up = (this.nav && (this.major >= 4));
    this.navonly  = (this.nav && ((agt.indexOf(";nav") != -1) ||
                     (agt.indexOf("; nav") != -1)) );
    this.nav5 = (this.nav && (this.major == 5));
    this.nav5up = (this.nav && (this.major >= 5));

    this.ie   = (agt.indexOf("msie") != -1);
    this.ie3  = (this.ie && (this.major < 4));
    this.ie4  = (this.ie && (this.major == 4) && (agt.indexOf("msie 5.0")==-1) );
    this.ie4up  = (this.ie  && (this.major >= 4));
    this.ie5  = (this.ie && (this.major == 4) && (agt.indexOf("msie 5.0")!=-1) );
    this.ie5up  = (this.ie  && !this.ie3 && !this.ie4);

    this.ie55  = (this.ie && (this.major == 4) && (agt.indexOf("msie 5.5")!=-1) );
    this.ie6  = (this.ie && (this.major == 4) && (agt.indexOf("msie 6.0")!=-1) );
    this.ie7  = (this.ie && (this.major == 4) && (agt.indexOf("msie 7.0")!=-1) );

    this.aol   = (agt.indexOf("aol") != -1);
    this.aol3  = (this.aol && this.ie3);
    this.aol4  = (this.aol && this.ie4);

    this.opera = (agt.indexOf("opera") != -1);
    this.webtv = (agt.indexOf("webtv") != -1);

	this.pocketpc = (agt.indexOf("Windows CE") != -1);

// Check if we are running Mozilla
this.saf=(agt.indexOf('safari')!=-1);
this.konq=(!this.saf && (agt.indexOf('konqueror')!=-1) ) ? true : false;
this.moz=( (!this.saf && !this.konq ) && ( agt.indexOf('gecko')!=-1 ) ) ? true : false;
var moz_brow;


if (this.moz) {
	// regular expression pattern that will be used to extract main version/rv numbers
	pattern = /[(); \n]/;

	// moz type array, add to this if you need to
	moz_types = new Array('firebird', 'phoenix', 'firefox', 'galeon', 'k-meleon', 'camino', 'epiphany', 'netscape6', 'netscape', 'multizilla', 'gecko debian', 'rv');

	rv_pos = agt.indexOf('rv');// find 'rv' position in nua string
	rv_full = agt.substr( rv_pos + 3, 6 );// cut out maximum size it can be, eg: 1.8a2, 1.0.0 etc

	// search for occurance of any of characters in pattern, if found get position of that character
	rv_slice = (rv_full.search( pattern ) != -1) ? rv_full.search(pattern ) : "";

	//check to make sure there was a result, if not do  nothing
	// otherwise slice out the part that you want if there is a slice position
	(rv_slice) ? rv_full = rv_full.substr(0, rv_slice) : "";

	// this is the working id number, 3 digits, you'd use this for
	// number comparison, like if nu >= 1.3 do something
	nu = rv_full.substr(0, 3);

	for (i = 0; i < moz_types.length; i++) {
		if (agt.indexOf(moz_types[i]) != -1) {
			this.moz_brow = moz_types[i];
			break;
		}
	}


	if (this.moz_brow) { // if it was found in the array
		str_pos=agt.indexOf(moz_brow);// extract string position
		moz_brow_nu = agt.substr( (str_pos + this.moz_brow.length + 1 ) ,3);// slice out working number, 3 digit
		// if you got it, use it, else use nu
		moz_brow_nu = ( isNaN( moz_brow_nu ) ) ? moz_brow_nu = nu: moz_brow_nu;
		moz_brow_nu_sub = agt.substr( (str_pos + this.moz_brow.length + 1 ), 8);
		// this makes sure that it's only the id number
		sub_nu_slice = ( moz_brow_nu_sub.search( pattern ) != -1 ) ? moz_brow_nu_sub.search( pattern ) : '';
		//check to make sure there was a result, if not do  nothing
		(sub_nu_slice) ? moz_brow_nu_sub = moz_brow_nu_sub.substr(0, sub_nu_slice) : "";
	}

	if ( this.moz_brow == 'netscape6') {
		this.moz_brow = 'netscape';
	} else if ( this.moz_brow == 'rv' || this.moz_brow == '' ) { // default value if no other gecko name fit
		this.moz_brow = 'mozilla';
	}
	if (!moz_brow_nu) { // use rv number if nothing else is available
		moz_brow_nu = nu;
		moz_brow_nu_sub = nu;
	}
}

    // *** JAVASCRIPT VERSION CHECK ***
    // Useful to workaround Nav3 bug in which Nav3
    // loads <SCRIPT LANGUAGE="JavaScript1.2">
    if (this.nav2 || this.ie3) this.js = 1.0
    else if (this.nav3 || this.opera) this.js = 1.1
    else if ((this.nav4 && (this.minor <= 4.05)) || this.ie4) this.js = 1.2
    else if ((this.nav4 && (this.minor > 4.05)) || this.ie5) this.js = 1.3
    else if (this.nav5) this.js = 1.4
    // NOTE: In the future, update this code when newer versions of JS
    // are released. For now, we try to provide some upward compatibility
    // so that future versions of Nav and IE will show they are at
    // *least* JS 1.x capable. Always check for JS version compatibility
    // with > or >=.
    else if (this.nav && (this.major > 5)) this.js = 1.4
    else if (this.ie && (this.major > 5)) this.js = 1.3
    // HACK: no idea for other browsers; always check for JS version with > or >=
    else this.js = 0.0;

    // *** PLATFORM ***
    this.win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
    // NOTE: On Opera 3.0, the userAgent string includes "Windows 95/NT4" on all
    //        Win32, so you can't distinguish between Win95 and WinNT.
    this.win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));

    // is this a 16 bit compiled version?
    this.win16 = ((agt.indexOf("win16")!=-1) ||
                  (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) ||
                  (agt.indexOf("windows 16-bit")!=-1) );

    this.win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
                  (agt.indexOf("windows 16-bit")!=-1));

    // NOTE: Reliable detection of Win98 may not be possible. It appears that:
    //       - On Nav 4.x and before you'll get plain "Windows" in userAgent.
    //       - On Mercury client, the 32-bit version will return "Win98", but
    //         the 16-bit version running on Win98 will still return "Win95".
    this.win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
    this.winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
    this.win32 = ( this.win95 || this.winnt || this.win98 ||
                   ((this.major >= 4) && (navigator.platform == "Win32")) ||
                   (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1) );

    this.os2   = ((agt.indexOf("os/2")!=-1) ||
                  (navigator.appVersion.indexOf("OS/2")!=-1) ||
                  (agt.indexOf("ibm-webexplorer")!=-1));

    this.mac    = (agt.indexOf("mac")!=-1);
    this.mac68k = (this.mac && ((agt.indexOf("68k")!=-1) ||
                               (agt.indexOf("68000")!=-1)));
    this.macppc = (this.mac && ((agt.indexOf("ppc")!=-1) ||
                               (agt.indexOf("powerpc")!=-1)));

    this.sun   = (agt.indexOf("sunos")!=-1);
    this.sun4  = (agt.indexOf("sunos 4")!=-1);
    this.sun5  = (agt.indexOf("sunos 5")!=-1);
    this.suni86= (this.sun && (agt.indexOf("i86")!=-1));
    this.irix  = (agt.indexOf("irix") !=-1);    // SGI
    this.irix5 = (agt.indexOf("irix 5") !=-1);
    this.irix6 = ((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1));
    this.hpux  = (agt.indexOf("hp-ux")!=-1);
    this.hpux9 = (this.hpux && (agt.indexOf("09.")!=-1));
    this.hpux10= (this.hpux && (agt.indexOf("10.")!=-1));
    this.aix   = (agt.indexOf("aix") !=-1);      // IBM
    this.aix1  = (agt.indexOf("aix 1") !=-1);
    this.aix2  = (agt.indexOf("aix 2") !=-1);
    this.aix3  = (agt.indexOf("aix 3") !=-1);
    this.aix4  = (agt.indexOf("aix 4") !=-1);
    this.linux = (agt.indexOf("inux")!=-1);
    this.sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
    this.unixware = (agt.indexOf("unix_system_v")!=-1);
    this.mpras    = (agt.indexOf("ncr")!=-1);
    this.reliant  = (agt.indexOf("reliantunix")!=-1);
    this.dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) ||
         (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) ||
         (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1));
    this.sinix = (agt.indexOf("sinix")!=-1);
    this.freebsd = (agt.indexOf("freebsd")!=-1);
    this.bsd = (agt.indexOf("bsd")!=-1);
    this.unix  = ((agt.indexOf("x11")!=-1) || this.sun || this.irix || this.hpux ||
                 this.sco ||this.unixware || this.mpras || this.reliant ||
                 this.dec || this.sinix || this.aix || this.linux || this.bsd || this.freebsd);

    this.vms   = ((agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1));
}

function browsercheck()	{

	if ((navigator.appVersion.indexOf("Mac")!=-1) && (navigator.userAgent.indexOf("MSIE")!=-1) &&
	(parseInt(navigator.appVersion)==3))
	       isIE3Mac = true;
	else   is = new Is(); 


}
