(function(){Adobe.GoCart={debug:function(a){if(Adobe.GoCart.searchURL("debug")){console.log(a)
}},exists:function(b,c){var a=false;
if(c){a=b&&b.length
}else{a=typeof b!="undefined"&&b!=null&&b!=""
}return a
},searchURL:function(a){return(new RegExp("[?&]"+encodeURIComponent(a)+"=([^&]*)")).exec(location.search)
},siteCatalyst:function(){if(Adobe.GoCart.exists(window.SiteCatalyst)){SiteCatalyst.gid=Adobe.GoCart.Gid[1];
SiteCatalyst.gtoken=Adobe.GoCart.Gtoken[1]
}},setGid:function(){if(Adobe.GoCart.exists(Adobe.GoCart.publicGid)){Adobe.GoCart.publicGid.text(Adobe.GoCart.Gid[1]);
Adobe.GoCart.swapProductMsg(Adobe.GoCart.publicGid)
}},productNames:function(){var a=Adobe.GoCart.sortProductNames(decodeURI(Adobe.GoCart.Product[1])),b="%PRODUCT%",d="",c="";
if(Adobe.GoCart.exists(a)&&Adobe.GoCart.singleProduct.text().indexOf(b)>=0&&a.indexOf(",")==-1){Adobe.GoCart.debug(['Adobe.GoCart.productNames: found "replace" text:',Adobe.GoCart.singleProduct.text().indexOf(b)]);
d=Adobe.GoCart.singleProduct.text().replace(b,a);
c=Adobe.GoCart.singleProductInfo.text().replace(b,a);
if(Adobe.GoCart.exists(d)){Adobe.GoCart.debug(["Adobe.GoCart.productNames: replacing text:",d]);
Adobe.GoCart.singleProduct.text(d)
}if(Adobe.GoCart.exists(c)){Adobe.GoCart.debug(["Adobe.GoCart.productNames: replacing info:",c]);
Adobe.GoCart.singleProductInfo.text(c)
}Adobe.GoCart.swapProductMsg(Adobe.GoCart.singleProduct);
Adobe.GoCart.swapProductMsg(Adobe.GoCart.singleProductInfo)
}else{Adobe.GoCart.swapProductMsg(Adobe.GoCart.multiProduct);
Adobe.GoCart.swapProductMsg(Adobe.GoCart.multiProductInfo)
}},swapProductMsg:function(a){Adobe.GoCart.debug(["Adobe.GoCart.swapProductMsg: show.length",a]);
if(a.length>0){a.show()
}},swapLinks:function(){if(Adobe.GoCart.exists(Adobe.GoCart.More)){Adobe.GoCart.debug(["Adobe.GoCart.swapLinks: found",Adobe.GoCart.More]);
$.each(Adobe.GoCart.More,function(b,a){var c=$(a).attr("href"),d="";
if(c.indexOf("?")>=0){Adobe.GoCart.debug(["Adobe.GoCart.swapLinks: found params in the link",c.split("?")[1]]);
d=location.search+"&"+c.split("?")[1];
c=c.split("?")[0];
Adobe.GoCart.debug(["Adobe.GoCart.swapLinks: curLink is now:",c])
}else{d=location.search;
Adobe.GoCart.debug(["Adobe.GoCart.swapLinks: found no params, appending location.search",d])
}$(a).attr("href",c+d);
Adobe.GoCart.debug(["Adobe.GoCart.swapLinks: final link is",$(a).attr("href")])
})
}},sortProductNames:function(b){var a=null;
switch(b){case"acrobatx":a="Acrobat X";
break;
default:a=b;
break
}Adobe.GoCart.debug(["Adobe.GoCart.sortProductNames: name",a]);
return a
},productInfo:function(a){Adobe.GoCart.debug(["Adobe.GoCart.productInfo: data",a]);
if(Adobe.GoCart.exists(a)){$.each(a,function(b,c){Adobe.GoCart.debug(["Adobe.GoCart.productInfo $.each: key",b]);
Adobe.GoCart.debug(["Adobe.GoCart.productInfo $.each: val",c]);
$.each(c,function(g,h){var i=Adobe.GoCart.sortProductNames(h.productName),f=h.serialNumber,e=h.serialStatus,k=h.description,j=[i,f,e,k],d="<tr>";
$.each(j,function(m,l){d+="<td>"+l+"</td>"
});
d+="</tr>";
Adobe.GoCart.productTable.append(d)
})
})
}},request:function(a,b){$.ajax({type:"POST",url:a,data:{gid:Adobe.GoCart.Gid[1],gtoken:Adobe.GoCart.Gtoken[1]}}).done(function(c){Adobe.GoCart.debug(["Adobe.GoCart.request complete",c]);
if(typeof b!="undefined"){b(c)
}}).fail(function(c,d){Adobe.GoCart.debug(["Adobe.GoCart.request fail:",c,d])
})
}};
Adobe.GoCart.debug(["Adobe.GoCart.Seed:",Adobe.GoCart.Seed]);
Adobe.GoCart.debug(["adobeGoCartTokenUrl:",adobeGoCartTokenUrl]);
Adobe.GoCart.debug(["adobeGoCartValidationUrl:",adobeGoCartValidationUrl]);
Adobe.GoCart.Seed=$("div[data-seed-gocart]").attr("data-seed-gocart");
Adobe.GoCart.More=$("a[data-gocart-more]");
Adobe.GoCart.Gid=Adobe.GoCart.searchURL("gid");
Adobe.GoCart.Gtoken=Adobe.GoCart.searchURL("gtoken");
Adobe.GoCart.Product=Adobe.GoCart.searchURL("productname");
Adobe.GoCart.singleProduct=$(".notification-single");
Adobe.GoCart.multiProduct=$(".notification-multi");
Adobe.GoCart.singleProductInfo=$(".notification-single-info");
Adobe.GoCart.multiProductInfo=$(".notification-multi-info");
Adobe.GoCart.productList=$("table[data-gocart-productlist]");
Adobe.GoCart.publicGid=$(".notification-gid");
if((Adobe.GoCart.exists(Adobe.GoCart.Gid,true))&&(Adobe.GoCart.exists(Adobe.GoCart.Gtoken,true))){if(Adobe.GoCart.exists(adobeGoCartTokenUrl)&&!Adobe.GoCart.exists(adobeGoCartValidationUrl)&&Adobe.GoCart.Seed!=="notification"){Adobe.GoCart.request(adobeGoCartTokenUrl);
Adobe.GoCart.siteCatalyst()
}else{if(Adobe.GoCart.exists(adobeGoCartTokenUrl)&&Adobe.GoCart.exists(adobeGoCartValidationUrl)){if(Adobe.GoCart.Seed==="landing"){Adobe.GoCart.debug(["Pre Check: Adobe.GoCart.Product:",Adobe.GoCart.Product]);
Adobe.GoCart.PostValidation=function(a){Adobe.GoCart.debug(["Ajax Response: data: ",a]);
if(Adobe.GoCart.exists(Adobe.GoCart.productList,true)){Adobe.GoCart.debug(["Adobe.GoCart.productList: ",Adobe.GoCart.productList]);
Adobe.GoCart.productTable=Adobe.GoCart.productList.find("tbody");
if(Adobe.GoCart.exists(Adobe.GoCart.productTable,true)){Adobe.GoCart.debug(["Adobe.GoCart.productTable: ",Adobe.GoCart.productTable]);
Adobe.GoCart.productInfo(a)
}}};
Adobe.GoCart.TokenValidation=function(){Adobe.GoCart.request(adobeGoCartValidationUrl,Adobe.GoCart.PostValidation)
};
Adobe.GoCart.request(adobeGoCartTokenUrl,Adobe.GoCart.TokenValidation)
}}}if(Adobe.GoCart.exists(Adobe.GoCart.Seed)){if(Adobe.GoCart.exists(Adobe.GoCart.Product)){Adobe.GoCart.debug("Found Adobe.GoCart.Product");
Adobe.GoCart.productNames()
}else{Adobe.GoCart.debug("Adobe.GoCart.Product not found");
Adobe.GoCart.swapProductMsg(Adobe.GoCart.multiProduct);
Adobe.GoCart.swapProductMsg(Adobe.GoCart.multiProductInfo)
}Adobe.GoCart.debug(["Adobe.GoCart.Seed: found:",Adobe.GoCart.Seed]);
Adobe.GoCart.swapLinks();
Adobe.GoCart.setGid()
}}})();
SpecialFormHandler={handleFormSubmit:function(c){var a=jQuery("form#safeHarbor");
var e=a.attr("data-form-action-path");
var d="yes"==a.attr("data-form-special-handling");
var b=function(f){if(f){c.append(":cq_csrf_token",f)
}jQuery.ajax({url:e,processData:false,contentType:false,dataType:"json",type:"POST",data:c}).always(function(g){if(g.redirect&&g.redirect!="#"){window.location.href=g.redirect
}})
};
if(d){jQuery.ajax({url:"/etc/beagle/public/token.json",type:"GET"}).always(function(f){if(f&&f.token){b(f.token)
}})
}else{b()
}}};
var mtwidget=mtwidget||{};
mtwidget.translationClickHandler=function(e,a){if(e){var h=e.getAttribute("data-selector"),b=h?"."+h:"",c=/(.*\/)([^\/\?\.]*)(\.[^\/\?]*|)(\.html)(\?.*|#.*|)/g,d=c.exec(window.location.toString()),j=d[1],f=d[2],g=d[4],i=d[5];
window.location=j+f+b+g+i;
a.preventDefault();
return false
}return true
};
mtwidget.feedbackClickHandler=function(b){var a=$(b).parents("span.translation-feedback-box");
var c=a.parent();
a.hide();
c.find("> span.translation-feedback-done-box").show()
};
mtwidget.processElementAttributeMapping=function(a,c,g){var e=a.attr(c);
var f=false;
if(e&&e.length>0){for(var b=0;
b<g.length;
b++){var d=g[b];
if(e.indexOf(d.original)!=-1){e=e.replace(d.original,d["new"]);
f=true
}}if(f){a.attr(c,e)
}}};
mtwidget.processElementMapping=function(b,e,d){var a=$(b);
for(var c=0;
c<e.length;
c++){mtwidget.processElementAttributeMapping(a,e[c],d)
}};
mtwidget.processMappingTable=function(e,d,c){var a=$.find(e);
if(a&&a.length>0){for(var b=0;
b<a.length;
b++){mtwidget.processElementMapping(a[b],d,c)
}}};
$(document).ready(function(){try{var c=JSON.parse(mtwidget.str_samcap_mapping_json);
var b=c.mapping;
if(b&&b.length>0){mtwidget.processMappingTable("a",["href"],b)
}}catch(a){}try{$(".mtwidget_anchor").click(function(d){return mtwidget.translationClickHandler(this,d)
})
}catch(a){}});