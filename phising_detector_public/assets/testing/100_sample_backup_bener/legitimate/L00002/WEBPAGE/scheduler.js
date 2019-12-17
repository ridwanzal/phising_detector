(function(){var f=this;function g(a){a=a.split(".");for(var b=f,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}
function h(a,b,c){return a.call.apply(a.bind,arguments)}
function k(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function l(a,b,c){l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?h:k;return l.apply(null,arguments)}
var m=Date.now||function(){return+new Date};
function n(a,b){var c=a.split("."),d=f;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b}
;function q(){this.j=this.j;this.o=this.o}
q.prototype.j=!1;q.prototype.isDisposed=function(){return this.j};
q.prototype.dispose=function(){this.j||(this.j=!0,this.A())};
q.prototype.A=function(){if(this.o)for(;this.o.length;)this.o.shift()()};function r(){q.call(this);this.c=[];this.c[3]=[];this.c[2]=[];this.c[1]=[];this.c[0]=[];this.f={};this.l=r.c;this.C=this.m=0;this.B=this.v=!1;this.h=[];this.D=l(this.F,this)}
(function(){var a=r;function b(){}
b.prototype=q.prototype;a.G=q.prototype;a.prototype=new b;a.prototype.constructor=a;a.base=function(a,b,e){for(var w=Array(arguments.length-2),p=2;p<arguments.length;p++)w[p-2]=arguments[p];return q.prototype[b].apply(a,w)}})();
r.j="hidden";r.f=1E3/60;r.h=3;r.c=r.f-3;function t(a,b,c,d){++a.C;var e=a.C;a.f[e]=b;a.v&&!d?a.h.push({id:e,priority:c}):(a.c[c].push(e),a.B||a.v||u(a));return e}
function v(a){a.h.length=0;for(var b=3;0<=b;b--)a.c[b].length=0;a.f={};a.stop()}
function x(a){try{a()}catch(b){(a=g("yt.logging.errors.log"))&&a(b)}}
r.prototype.F=function(){this.stop();this.v=!0;for(var a=m()+this.l,b=this.c[3];b.length;){var c=b.shift(),d=this.f[c];delete this.f[c];d&&x(d)}if(!(m()>=a)){do{a:{for(b=2;0<=b;b--)for(c=this.c[b];c.length;){var d=c.shift(),e=this.f[d];delete this.f[d];if(e){b=e;break a}}b=null}b&&x(b)}while(b&&m()<a)}this.v=!1;b=0;for(c=this.h.length;b<c;b++)d=this.h[b],this.c[d.priority].push(d.id);this.l=r.c;(a<=m()||this.h.length)&&u(this);this.h.length=0};
function u(a){a.B=!1;0==a.m&&(a.m=window.setTimeout(a.D,1))}
r.prototype.pause=function(){this.stop();this.B=!0};
r.prototype.stop=function(){window.clearTimeout(this.m);this.m=0};
r.prototype.A=function(){v(this);this.stop();r.G.A.call(this)};function y(){var a=g("yt.scheduler.instance.instance_");if(!a||a.isDisposed())a=new r,n("yt.scheduler.instance.instance_",a);return a}
function z(){var a=g("yt.scheduler.instance.instance_");a&&(a&&"function"==typeof a.dispose&&a.dispose(),n("yt.scheduler.instance.instance_",null))}
function A(){v(y())}
var B=g("yt.scheduler.instance.timerIdMap_")||{};function C(a,b,c){if(0==c||void 0===c)return c=void 0===c,-t(y(),a,b,c);var d=window.setTimeout(function(){var c=t(y(),a,b);B[d]=c},c);
return d}
function D(a){var b=y(),c=m();x(a);a=m()-c;b.l-=a}
function E(a){var b=y();if(0>a)delete b.f[-a];else{var c=B[a];c?(delete b.f[c],delete B[a]):window.clearTimeout(a)}}
function F(){u(y())}
function G(){y().pause()}
;function H(){}
H.getInstance=function(){return H.c?H.c:H.c=new H};
H.prototype.addTask=function(a){return C(a,2)};
H.prototype.cancelTask=function(a){E(a)};if(!g("yt.scheduler.initialized")){n("yt.scheduler.instance.dispose",z);n("yt.scheduler.instance.addJob",C);n("yt.scheduler.instance.addImmediateJob",D);n("yt.scheduler.instance.cancelJob",E);n("yt.scheduler.instance.cancelAllJobs",A);n("yt.scheduler.instance.start",F);n("yt.scheduler.instance.pause",G);n("yt.scheduler.SpfScheduler.instance",H.getInstance());var I=H.getInstance(),J=H.getInstance().addTask;I.addTask=J;var K=H.getInstance(),L=H.getInstance().cancelTask;K.cancelTask=L;n("yt.scheduler.initialized",
!0)};})();
