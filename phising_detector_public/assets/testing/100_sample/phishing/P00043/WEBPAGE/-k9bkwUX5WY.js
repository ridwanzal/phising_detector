/*!CK:1356047613!*//*1378930361,178134599*/

if (self.CavalryLogger) { CavalryLogger.start_js(["4vv8\/"]); }

__d("TimeSpentBitArrayLogger",["Arbiter","Banzai","BanzaiODS","TimeSpentArray","TimeSpentConfig","UserActivity","copyProperties","isInIframe"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('Banzai'),i=b('BanzaiODS'),j=b('TimeSpentArray'),k=b('TimeSpentConfig'),l=b('UserActivity'),m=b('copyProperties'),n=b('isInIframe'),o={delay:h.BASIC.delay,retry:true};function p(q,r){if(h.isEnabled('time_spent_bit_array')){g.inform('timespent/tosbitdataposted',m({},q));if(typeof r=='number'){o.delay=r;}else o.delay=h.BASIC.delay;h.post('time_spent_bit_array',m({},q),o);o.delay=k.delay;}}e.exports={init:function(q){if(n())return;l.subscribe(function(r,s){j.update(s.last_inform);});j.init(p,k);i.bumpEntityKey('ms.time_spent.qa.www','time_spent.bits.js_initialized');}};});