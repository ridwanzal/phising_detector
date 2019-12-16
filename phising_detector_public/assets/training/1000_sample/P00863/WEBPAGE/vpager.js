var Vpager = Class.create( {
	initialize : function() {
		this.request = null;
		this.loading = {
			'lnav' : false,
			'list' : false
		};
		this.isNav = false;
		this.afterInit();
		document.observe("dom:loaded", this.olinks.bind(this));
	},
	afterInit : function() {
		hashTag = location.hash.split('#!');
		if (hashTag.length > 1) {
			this.riff(location.href);
		}
	},
	getUP : function(u) {
		u=decodeURI(u);
		p = u.split('#!');
		if (p.length > 1) {
			params = p[1];
		}
		params = params.toQueryParams();
		if(this.isNav){
			params['l'] = 1;
		}else{
			params['l'] = 0;
		}
		result = {'params':params,'url':p[0]};
		return result;
	},
	riff : function(u) {
		location.href = u;
		u = this.getUP(u);
		this.showLoading(false);
		if (this.request !== null) {
			this.request.abort();
		}
		this.request = new Ajax.Request(u.url, {
			method : 'get',
			parameters : u.params,
			onSuccess : this.glist.bind(this),
			onComplete : this.olinks.bind(this)
		});
	},
	getResult : function(event) {
		sEle = Event.element(event);
		if (sEle.tagName.toLowerCase() == 'a') {
			this.riff(sEle.href);
		} else {
			this.riff(sEle.value);
		}
		Event.stop(event);
	},
	getNavRes: function(event){
		event.stop();
		this.isNav = true;
		sEle = Event.element(event);
		if (sEle.tagName.toLowerCase() == 'a') {
			this.riff(sEle.href);
		}else{
			if(sEle.tagName.toLowerCase() == 'span'){
				this.riff(sEle.up().href);
			}
		}
	},
	olinks : function(event) {
		jQuery(function(){
			  jQuery('html, body').animate({scrollTop:0}, 800);
			 jQuery('.form-language, .header .block-currency, .toolbar .sort-by, .toolbar .limiter').jqTransform({imgPath:'<?php echo $this->getSkinUrl("images/") ?>'});
		});
	jQuery(".add-to-links li a.tooltips").easyTooltip();
		jQuery(".products-grid .add-to-links .link-wishlist").easyTooltip();
		jQuery(".products-grid .add-to-links .link-compare ").easyTooltip(); 

			var grids = $$('.products-grid');
			grids.each(function(n){					
					var columns = n.select('li.item');					
					var max_height = 0;															
					columns.each(function(m){														
						if( m.getHeight() >  max_height ){
							max_height = m.getHeight();
						}						
					});		
					var boxes = n.select('li .product-box');
					boxes.each(function(b){			
						var this_column = b.up('li.item');
						var box_indent = this_column.getHeight() - b.getHeight();						
						b.setStyle({
							height: max_height - box_indent + 'px'
						});					
					 });
				});	
		$$('.pages li a', '.view-mode a', '.sorter a', '.limiter a', '.pages li .previous').each(function(item) {
			item.observe('click', this.getResult.bindAsEventListener(this));
		}.bind(this));
		$$('.limiter select', '.sorter select').each(function(item) {
			item.observe('change', this.getResult.bindAsEventListener(this));
		}.bind(this));
		$$('.block-layered-nav a').each(function(item){
			item.stopObserving();
			item.observe('click',this.getNavRes.bindAsEventListener(this));
		}.bind(this));
	},
	glist : function(transport) {
		ft = transport.responseText;
		var bagEle = new Element('div');
		bagEle.update(ft);
		var plist = bagEle.select('div#ajax-list-container')[0];
		var lnav = bagEle.select('div#ajax-nav-container')[0];
		$$('.category-products').each(function(item) {
			Element.replace(item, plist.innerHTML);
		});
		if (lnav) {
			$$('.block-layered-nav').each(function(item) {
				Element.replace(item, lnav.innerHTML);
			});
		}
	},
	showLoading : function(flag) {
		$$('.amount').each(function(item) {
			item.update('&nbsp;').addClassName('spinner');
		});
		if (flag) {
			$$('.block-subtitle').each(function(item) {
				item.update('&nbsp;').addClassName('spinner');
			});
		}
	}
});
Object.extend(Ajax);
Ajax.Request.prototype.abort = function() {
	this.transport.onreadystatechange = Prototype.emptyFunction;
	this.transport.abort();
	Ajax.activeRequestCount--;
};
var ajaxPager = new Vpager();
