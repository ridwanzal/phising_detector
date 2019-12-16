var linkTrackingBasicVars = 'channel,server,eVar1,eVar2,eVar7,eVar8,eVar15,eVar37,eVar38,eVar40,prop1,prop26,prop32,prop33,prop35';

function scGetSobjectInst(){
    var rsid="accstandardbankoldinternetbanking";
    if(document.location.host.indexOf('encrypt.standardbank.co.za') < 0) {
        rsid="accstandardbankoldinternetbankingdev";
    }
    return s_gi(rsid);
}
/*
 * Track General link
 */
function scGeneralLinkClick(linkTarget, linkname, location) {
    var s = scGetSobjectInst();
    //*-* Force lowercase to keep data consistency
    linkname = linkname.toLowerCase();
    location = location.toLowerCase();
    //*-* Set vars before triggering the link tracking
    s.linkTrackVars = linkTrackingBasicVars + ',prop39,prop40,eVar51,eVar54,hier2,events';
    s.linkTrackEvents = 'event29';
    s.prop40 = s.eVar54 = 'ibo | ' + linkname;
    s.prop39 = s.eVar51 = location;
    s.events = 'event29';
    s.hier2 = s.pageName + '|||' + linkname;
    if(linkTarget && linkTarget.getAttribute('href') !== null && linkTarget.getAttribute('href') != ''){
        s.forcedLinkTrackingTimeout=500;
        //*-* Trigger the link tracking
        s.tl(linkTarget, 'o', s.eVar54, null, 'navigate');
        //*-* Clear Vars for link tracking
        s.events = s.hier2 = s.eVar54 = s.eVar51 = s.prop39 = s.prop40 = '';
        //*-* return false as we are making use of the last 2 params in the s.tl();
        return false;
    } else {
        //*-* Trigger the link tracking
        s.tl(this, 'o', s.eVar54);
        //*-* Clear Vars for link tracking
        s.events = s.hier2 = s.eVar54 = s.eVar51 = s.prop39 = s.prop40 = '';
    }
}
