(function(e){e.fn.lightbox=function(t){function r(){e("#overlay, #lightbox").remove(),n.inprogress=!1;if(n.jsonData&&n.jsonData.length>0){var t=n.jsonDataParser?n.jsonDataParser:e.fn.lightbox.parseJsonData;n.imageArray=[],n.imageArray=t(n.jsonData)}var r='<div id="outerImageContainer"><div id="imageContainer"><iframe id="lightboxIframe"></iframe><img id="lightboxImage" /><div id="hoverNav"><a href="javascript://" title="'+n.strings.prevLinkTitle+'" id="prevLink"></a><a href="javascript://" id="nextLink" title="'+n.strings.nextLinkTitle+'"></a></div><div id="loading"><a href="javascript://" id="loadingLink"><img src="'+n.fileLoadingImage+'"></a></div></div></div>',i='<div id="imageDataContainer" class="clearfix"><div id="imageData"><div id="imageDetails"><span id="caption"></span><span id="numberDisplay"></span></div><div id="bottomNav">';n.displayHelp&&(i+='<span id="helpDisplay">'+n.strings.help+"</span>"),i+='<a href="javascript://" id="bottomNavClose" title="'+n.strings.closeTitle+'"><img src="'+n.fileBottomNavCloseImage+'"></a></div></div></div>';var s;return n.navbarOnTop?(s='<div id="overlay"></div><div id="lightbox">'+i+r+"</div>",e("body").append(s),e("#imageDataContainer").addClass("ontop")):(s='<div id="overlay"></div><div id="lightbox">'+r+i+"</div>",e("body").append(s)),e("#overlay, #lightbox").click(function(){l()}).hide(),e("#loadingLink, #bottomNavClose").click(function(){return l(),!1}),e("#outerImageContainer").width(n.widthCurrent).height(n.heightCurrent),e("#imageDataContainer").width(n.widthCurrent),n.imageClickClose||(e("#lightboxImage").click(function(){return!1}),e("#hoverNav").click(function(){return!1})),!0}function s(){var t=new Array(e(document).width(),e(document).height(),e(window).width(),e(window).height());return t}function o(){var e,t;self.pageYOffset?(t=self.pageYOffset,e=self.pageXOffset):document.documentElement&&document.documentElement.scrollTop?(t=document.documentElement.scrollTop,e=document.documentElement.scrollLeft):document.body&&(t=document.body.scrollTop,e=document.body.scrollLeft);var n=new Array(e,t);return n}function u(t){e("select, embed, object").hide(),v(),e("#overlay").hide().css({opacity:n.overlayOpacity}).fadeIn(),imageNum=0,n.jsonData||(n.imageArray=[],(!t.rel||t.rel=="")&&!n.allSet?n.imageArray.push(new Array(t.href,n.displayTitle?t.title:"")):e("a").each(function(){this.href&&this.rel==t.rel&&n.imageArray.push(new Array(this.href,n.displayTitle?this.title:""))}));if(n.imageArray.length>1){for(i=0;i<n.imageArray.length;i++)for(j=n.imageArray.length-1;j>i;j--)n.imageArray[i][0]==n.imageArray[j][0]&&n.imageArray.splice(j,1);while(n.imageArray[imageNum][0]!=t.href)imageNum++}var r=o(),s=r[1]+e(window).height()/10,u=r[0];e("#lightbox").css({top:s+"px",left:u+"px"}).show(),n.slideNavBar||e("#imageData").hide(),a(imageNum)}function a(t){n.inprogress==0&&(n.inprogress=!0,n.activeImage=t,e("#loading").show(),e("#lightboxImage, #hoverNav, #prevLink, #nextLink").hide(),n.slideNavBar&&(e("#imageDataContainer").hide(),e("#imageData").hide()),f())}function f(){var t=new Image;t.onload=function(){var r=t.width,i=t.height;n.scaleImages&&(r=parseInt(n.xScale*r),i=parseInt(n.yScale*i));if(n.fitToScreen){var o=s(),u,a=o[2]-2*n.borderSize,f=o[3]-200,l=a/f,c=t.width/t.height;if(t.height>f||t.width>a)l>c?(r=parseInt(f/t.height*t.width),i=f):(i=parseInt(a/t.width*t.height),r=a)}e("#lightboxImage").attr("src",n.imageArray[n.activeImage][0]).width(r).height(i),h(r,i)},t.src=n.imageArray[n.activeImage][0]}function l(){b(),e("#lightbox").hide(),e("#overlay").fadeOut(),e("select, object, embed").show()}function c(){var e,t;n.loopImages&&n.imageArray.length>1?(t=new Image,t.src=n.imageArray[n.activeImage==n.imageArray.length-1?0:n.activeImage+1][0],e=new Image,e.src=n.imageArray[n.activeImage==0?n.imageArray.length-1:n.activeImage-1][0]):(n.imageArray.length-1>n.activeImage&&(t=new Image,t.src=n.imageArray[n.activeImage+1][0]),n.activeImage>0&&(e=new Image,e.src=n.imageArray[n.activeImage-1][0]))}function h(t,r){n.widthCurrent=e("#outerImageContainer").outerWidth(),n.heightCurrent=e("#outerImageContainer").outerHeight();var i=Math.max(350,t+n.borderSize*2),s=r+n.borderSize*2;wDiff=n.widthCurrent-i,hDiff=n.heightCurrent-s,e("#imageDataContainer").animate({width:i},n.resizeSpeed,"linear"),e("#outerImageContainer").animate({width:i},n.resizeSpeed,"linear",function(){e("#outerImageContainer").animate({height:s},n.resizeSpeed,"linear",function(){p()})}),afterTimeout=function(){e("#prevLink").height(r),e("#nextLink").height(r)},hDiff==0&&wDiff==0?jQuery.browser.msie?setTimeout(afterTimeout,250):setTimeout(afterTimeout,100):afterTimeout()}function p(){e("#loading").hide(),e("#lightboxImage").fadeIn("fast"),d(),c(),n.inprogress=!1}function d(){e("#numberDisplay").html(""),n.imageArray[n.activeImage][1]&&e("#caption").html(n.imageArray[n.activeImage][1]).show();if(n.imageArray.length>1){var t;t=n.strings.image+(n.activeImage+1)+n.strings.of+n.imageArray.length,n.displayDownloadLink&&(t+="<a href='"+n.imageArray[n.activeImage][0]+"'>"+n.strings.download+"</a>");if(!n.disableNavbarLinks){if(n.activeImage>0||n.loopImages)t='<a title="'+n.strings.prevLinkTitle+'" href="#" id="prevLinkText">'+n.strings.prevLinkText+"</a>"+t;if(n.activeImage+1<n.imageArray.length||n.loopImages)t+='<a title="'+n.strings.nextLinkTitle+'" href="#" id="nextLinkText">'+n.strings.nextLinkText+"</a>"}e("#numberDisplay").html(t).show()}n.slideNavBar?e("#imageData").slideDown(n.navBarSlideSpeed):e("#imageData").show(),v(),m()}function v(){e("#overlay").css({width:e(document).width(),height:e(document).height()})}function m(){n.imageArray.length>1&&(e("#hoverNav").show(),n.loopImages?(e("#prevLink,#prevLinkText").show().click(function(){return a(n.activeImage==0?n.imageArray.length-1:n.activeImage-1),!1}),e("#nextLink,#nextLinkText").show().click(function(){return a(n.activeImage==n.imageArray.length-1?0:n.activeImage+1),!1})):(n.activeImage!=0&&e("#prevLink,#prevLinkText").show().click(function(){return a(n.activeImage-1),!1}),n.activeImage!=n.imageArray.length-1&&e("#nextLink,#nextLinkText").show().click(function(){return a(n.activeImage+1),!1})),y())}function g(e){var t=e.data.opts,r=e.keyCode,i=27,s=String.fromCharCode(r).toLowerCase();if(s=="x"||s=="o"||s=="c"||r==i)l();else if(s=="p"||r==37)t.loopImages?(b(),a(t.activeImage==0?t.imageArray.length-1:t.activeImage-1)):t.activeImage!=0&&(b(),a(t.activeImage-1));else if(s=="n"||r==39)n.loopImages?(b(),a(t.activeImage==t.imageArray.length-1?0:t.activeImage+1)):t.activeImage!=t.imageArray.length-1&&(b(),a(t.activeImage+1))}function y(){e(document).bind("keydown",{opts:n},g)}function b(){e(document).unbind("keydown")}var n=e.extend({},e.fn.lightbox.defaults,t);return e(window).resize(v),e(this).on(n.triggerEvent,function(){return r(),u(this),!1})},e.fn.lightbox.parseJsonData=function(t){var n=[];return e.each(t,function(){n.push(new Array(this.url,this.title))}),n},e.fn.lightbox.defaults={triggerEvent:"click",allSet:!1,fileLoadingImage:"images/loading.gif",fileBottomNavCloseImage:"images/closelabel.gif",overlayOpacity:.6,borderSize:10,imageArray:new Array,activeImage:null,inprogress:!1,resizeSpeed:350,widthCurrent:250,heightCurrent:250,scaleImages:!1,xScale:1,yScale:1,displayTitle:!0,navbarOnTop:!1,displayDownloadLink:!1,slideNavBar:!1,navBarSlideSpeed:350,displayHelp:!1,strings:{help:" \u2190 / P - previous image\u00a0\u00a0\u00a0\u00a0\u2192 / N - next image\u00a0\u00a0\u00a0\u00a0ESC / X - close image gallery",prevLinkTitle:"previous image",nextLinkTitle:"next image",prevLinkText:"&laquo; Previous",nextLinkText:"Next &raquo;",closeTitle:"close image gallery",image:"Image ",of:" of ",download:"Download"},fitToScreen:!1,disableNavbarLinks:!1,loopImages:!1,imageClickClose:!0,jsonData:null,jsonDataParser:null}})(jQuery);