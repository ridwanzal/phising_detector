/*------------------------------------------------------------------------
# mod_imgscrawler - Images Crawler
# ------------------------------------------------------------------------
# author    Joomla!Vargas
# copyright Copyright (C) 2010 joomla.vargas.co.cr. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://joomla.vargas.co.cr
# Technical Support:  Forum - http://joomla.vargas.co.cr/forum
-------------------------------------------------------------------------*/

function marqueeInit(config){
 if(!document.createElement) return;
 marqueeInit.ar.push(config);
 marqueeInit.run(config.uniqueid);
}

(function(){

 if(!document.createElement) return;

 marqueeInit.ar = [];

 document.write('<style type="text/css">.ic_marquee{white-space:nowrap;overflow:hidden;visibility:hidden;}' +
 '#marq_kill_marg_bord{border:none!important;margin:0!important;}<\/style>');
 var c = 0, tTRE = [new RegExp('^\\s*$'), new RegExp('^\\s*'), new RegExp('\\s*$')],
 req1 = {'position': 'relative', 'overflow': 'hidden'}, defaultconfig = {
  style: {'margin': '0 auto'}},
  dash, ie = false, oldie = 0, ie5 = false, iever = 0;

 if(!ie5){
  dash = new RegExp('-(.)', 'g');
  function toHump(a, b){return b.toUpperCase();};
  String.prototype.encamel = function(){return this.replace(dash, toHump);};
 }

 if(ie && iever < 8){
  marqueeInit.table = [];
  window.attachEvent('onload', function(){
   marqueeInit.OK = true;
   for(var i = 0; i < marqueeInit.table.length; ++i)
   marqueeInit.run(marqueeInit.table[i]);
  });
 }
 
 function intable(el){
  while((el = el.parentNode))
   if(el.tagName && el.tagName.toLowerCase() === 'table')
    return true;
   return false;
 };

 marqueeInit.run = function(id){
   if(ie && !marqueeInit.OK && iever < 8 && intable(document.getElementById(id))){
    marqueeInit.table.push(id);
    return;
   }
   if(!document.getElementById(id))
    setTimeout(function(){marqueeInit.run(id);}, 300);
   else
    new Marq(c++, document.getElementById(id));
 }

 function trimTags(tag){
  var r = [], i = 0, e;
  while((e = tag.firstChild) && e.nodeType == 3 && tTRE[0].test(e.nodeValue))
   tag.removeChild(e);
  while((e = tag.lastChild) && e.nodeType == 3 && tTRE[0].test(e.nodeValue))
   tag.removeChild(e);
  if((e = tag.firstChild) && e.nodeType == 3)
   e.nodeValue = e.nodeValue.replace(tTRE[1], '');
  if((e = tag.lastChild) && e.nodeType == 3)
   e.nodeValue = e.nodeValue.replace(tTRE[2], '');
  while((e = tag.firstChild))
   r[i++] = tag.removeChild(e);
  return r;
 }

 function Marq(c, tag){
  var p, u, s, a, ims, ic, i, marqContent, cObj = this;
  this.mq = marqueeInit.ar[c];
  for (p in defaultconfig)
   if((this.mq.hasOwnProperty && !this.mq.hasOwnProperty(p)) || (!this.mq.hasOwnProperty && !this.mq[p]))
    this.mq[p] = defaultconfig[p];
  this.mq.style.width = !this.mq.style.width || isNaN(parseInt(this.mq.style.width))? '100%' : this.mq.style.width;
  if(!tag.getElementsByTagName('img')[0])
   this.mq.style.height = !this.mq.style.height || isNaN(parseInt(this.mq.style.height))? tag.offsetHeight + 3 + 'px' : this.mq.style.height;
  else
   this.mq.style.height = !this.mq.style.height || isNaN(parseInt(this.mq.style.height))? 'auto' : this.mq.style.height;
  u = this.mq.style.width.split(/\d/);
  this.cw = this.mq.style.width? [parseInt(this.mq.style.width), u[u.length - 1]] : ['a'];
  marqContent = trimTags(tag);
  tag.className = tag.id = '';
  tag.removeAttribute('class', 0);
  tag.removeAttribute('id', 0);
  if(ie)
   tag.removeAttribute('className', 0);
  tag.appendChild(tag.cloneNode(false));
  tag.className = ['ic_marquee', c].join('');
  tag.style.overflow = 'hidden';
  this.c = tag.firstChild;
  this.c.appendChild(this.c.cloneNode(false));
  this.c.style.visibility = 'hidden';
  a = [[req1, this.c.style], [this.mq.style, this.c.style]];
  for (i = a.length - 1; i > -1; --i)
   for (p in a[i][0])
    if((a[i][0].hasOwnProperty && a[i][0].hasOwnProperty(p)) || (!a[i][0].hasOwnProperty))
     a[i][1][p.encamel()] = a[i][0][p];
  this.m = this.c.firstChild;
  if(this.mq.mouse == 'pause'){
   this.c.onmouseover = function(){cObj.mq.stopped = true;};
   this.c.onmouseout = function(){cObj.mq.stopped = false;};
  }
  this.m.style.position = 'absolute';
  this.m.style.left = '-10000000px';
  this.m.style.whiteSpace = 'nowrap';
  if(ie5) this.c.firstChild.appendChild((this.m = document.createElement('nobr')));
  for(i = 0; marqContent[i]; ++i)
   this.m.appendChild(marqContent[i]);
  if(ie5) this.m = this.c.firstChild;
  ims = this.m.getElementsByTagName('img');
  if(ims.length){
   for(ic = 0, i = 0; i < ims.length; ++i){
    ims[i].style.display = 'inline';
    ims[i].style.verticalAlign = ims[i].style.verticalAlign || this.mq.valign;
    if(typeof ims[i].complete == 'boolean' && ims[i].complete)
     ic++;
    else {
     ims[i].onload = function(){
       if(++ic == ims.length)
        cObj.setup();
      };
    }
     if(ic == ims.length)
      this.setup();
   }
  }
   else this.setup()
 }

  Marq.prototype.setup = function(){
  if(this.mq.setup) return;
  this.mq.setup = this;
  var s, cObj = this;
  if(this.c.style.height === 'auto')
   this.c.style.height = this.m.offsetHeight + 4 + 'px';
  this.c.appendChild(this.m.cloneNode(true));
  this.m = [this.m, this.m.nextSibling];
  if(this.mq.mouse == 'cursor driven'){
   this.r = this.mq.neutral || 16;
   this.sinc = this.mq.inc;
   this.c.onmousemove = function(e){cObj.mq.stopped = false; cObj.directspeed(e)};
   if(this.mq.moveatleast){
    this.mq.inc = this.mq.moveatleast;
    if(this.mq.savedirection){
     if(this.mq.savedirection == 'reverse'){
      this.c.onmouseout = function(e){
       if(cObj.contains(e)) return;
       cObj.mq.inc = cObj.mq.moveatleast;
       cObj.mq.direction = cObj.mq.direction == 'right'? 'left' : 'right';};     
     } else {
      this.mq.savedirection = this.mq.direction;
      this.c.onmouseout = function(e){
       if(cObj.contains(e)) return;
       cObj.mq.inc = cObj.mq.moveatleast;
       cObj.mq.direction = cObj.mq.savedirection;};     
    }
    } else
     this.c.onmouseout = function(e){if(!cObj.contains(e)) cObj.mq.inc = cObj.mq.moveatleast;};
   }
   else
    this.c.onmouseout = function(e){if(!cObj.contains(e)) cObj.slowdeath();};
  }
  this.w = this.m[0].offsetWidth-3;
  this.m[0].style.left = 0;
  this.c.id = 'marq_kill_marg_bord';
  this.m[0].style.top = this.m[1].style.top = Math.floor((this.c.offsetHeight - this.m[0].offsetHeight) / 2 - oldie) + 'px';
  this.c.id = '';
  this.c.removeAttribute('id', 0);
  this.m[1].style.left = this.w + 'px';
  s = this.mq.moveatleast? Math.max(this.mq.moveatleast, this.sinc) : (this.sinc || this.mq.inc);
  while(this.c.offsetWidth > this.w - s)
   this.c.style.width = isNaN(this.cw[0])? this.w - s + 'px' : --this.cw[0] + this.cw[1];
  this.c.style.visibility = 'visible';
  this.runit();
  }
  
 Marq.prototype.slowdeath = function(){
  var cObj = this;
  if(this.mq.inc){
   this.mq.inc -= 1;
   this.timer = setTimeout(function(){cObj.slowdeath();}, 100);
  }
 }

 Marq.prototype.runit = function(){
  var cObj = this, d = this.mq.direction == 'right'? 1 : -1;
  if(this.mq.stopped || this.mq.stopMarquee){
   setTimeout(function(){cObj.runit();}, 300);
   return;
  }
  if(this.mq.mouse != 'cursor driven')
   this.mq.inc = Math.max(1, this.mq.inc);
  if(d * parseInt(this.m[0].style.left) >= this.w)
   this.m[0].style.left = parseInt(this.m[1].style.left) - d * this.w + 'px';
  if(d * parseInt(this.m[1].style.left) >= this.w)
   this.m[1].style.left = parseInt(this.m[0].style.left) - d * this.w + 'px';
  this.m[0].style.left = parseInt(this.m[0].style.left) + d * this.mq.inc + 'px';
  this.m[1].style.left = parseInt(this.m[1].style.left) + d * this.mq.inc + 'px';
  setTimeout(function(){cObj.runit();}, 30 + (this.mq.addDelay || 0));
 }

 Marq.prototype.directspeed = function(e){
  e = e || window.event;
  if(this.timer) clearTimeout(this.timer);

  var c = this.c, w = c.offsetWidth, l = c.offsetLeft, mp = (typeof e.pageX == 'number'?
   e.pageX : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft) - l,
  lb = (w - this.r) / 2, rb = (w + this.r) / 2;
  while((c = c.offsetParent)) mp -= c.offsetLeft;
  this.mq.direction = mp > rb? 'left' : 'right';
  this.mq.inc = Math.round((mp > rb? (mp - rb) : mp < lb? (lb - mp) : 0) / lb * this.sinc);
 }



 Marq.prototype.contains = function(e){
  if(e && e.relatedTarget){var c = e.relatedTarget; if(c == this.c) return true;
   while ((c = c.parentNode)) if(c == this.c) return true;}
  return false;
 }

 function resize(){
  for(var s, m, i = 0; i < marqueeInit.ar.length; ++i){
   if(marqueeInit.ar[i] && marqueeInit.ar[i].setup){
    m = marqueeInit.ar[i].setup;
    s = m.mq.moveatleast? Math.max(m.mq.moveatleast, m.sinc) : (m.sinc || m.mq.inc);
    m.c.style.width = m.mq.style.width;
    m.cw[0] = m.cw.length > 1? parseInt(m.mq.style.width) : 'a';
    while(m.c.offsetWidth > m.w - s)
     m.c.style.width = isNaN(m.cw[0])? m.w - s + 'px' : --m.cw[0] + m.cw[1];
   }
  }
 }

 if (window.addEventListener)
  window.addEventListener('resize', resize, false);
 else if (window.attachEvent)
  window.attachEvent('onresize', resize);

})();