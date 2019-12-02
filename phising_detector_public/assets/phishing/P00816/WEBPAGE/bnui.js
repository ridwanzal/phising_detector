var BNui = {
	'version'   : '0.1a',
	'confirm'	: false,
	'applyFormControls' : function() {
		BNJQ('input').not('[type=radio]').not('[type=checkbox]').focuser();
		BNJQ('button').buttonState();
		//BNJQ('.bn-form-error').formHelper();
		BNJQ('.bn-check-all').bnCheckAll();
		BNJQ('.bn-radio-select').radioSelect().each(function() {
			if (BNJQ(this).is(":checked")) {
				BNJQ(this).parents('label').eq(0).addClass('bn-radio-selected');
			}
		});
	},
	'applyUITweaks' : function () {
		BNJQ('table').each(function() {
			BNJQ('tr',BNJQ(this)).filter(":odd").addClass('alt');
		});
		BNJQ('.bn-sort-table').tableSort();
		BNJQ('.bn-accord-link').bnAccord();
		BNJQ('.manager-list').each(function () {
			BNJQ('li',BNJQ(this)).filter(":even").addClass('row-begin');
		});
		BNJQ('.twoColumn').each(function () {
			BNJQ('li',BNJQ(this)).filter(":even").addClass('row-begin');
		});

	},
	'go': function(_path,_target) {
		if (_path) {
			if(_target) {
				window.open(_path,_target);
			} else {
				window.location.href = _path;
			}
			return false;
		}
	},
	'popup': function(_uri, _params, _nocenter){
		var defaults = {
			width: 770,
			height : 450
		};
		var _params = BNJQ.extend(defaults,_params);
		params = 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1'
		if (_params) {
			BNJQ.each(_params, function(_key,_val) {
				params += ',' + _key + '=' + _val;
			});
		}
		if(_nocenter) {
			params += ',top=100,left=100'
		} else {
			var mytop = (screen.height) ? (screen.height-_params.height)/2:100;
			var myleft = (screen.width) ? (screen.width-_params.width)/2:100;
			params += ',top=' + mytop + ',left=' + myleft;
		}
		var popWin = window.open(_uri,'popWin',params);
		popWin.focus();
	},
	'showLogin' : function(e) {
		e.preventDefault();
		if(BNJQ('.login-form').is(":hidden")) {
			BNJQ('.no-login').fadeOut(250, function () {
				BNJQ('.login-form').fadeIn(250, function () {
					BNJQ('.login a').unbind('click').bind('click', function(e)  { e.preventDefault();BNJQ('.login-form form #submit').trigger('click'); });
					BNJQ('.login-form form #password-field,.login-form form #userid').unbind().bind('keyup', function (event) { if(event.keyCode==13) { BNJQ('.login-form form #submit').trigger('click'); } });
					BNJQ('.cancel-login').show();

				});

			});
		}
	},
	'cancelLogin' : function() {
		if(BNJQ('.login-form').is(":visible")) {
			BNJQ('.cancel-login').hide();
			BNJQ('.login a').unbind('click').bind('click', function(event) { BNui.showLogin(event); });
			BNJQ('.login-form').fadeOut(250, function () {
				BNJQ('.no-login').fadeIn(250);
			});
		}

	},
	'alertMsg' : function(msg,type) {
		// Use new Bootstrap Bootbox Dialogs
		bootbox.dialog({
			message: msg,
			title: type + ' Dialog',
			buttons: {
				main: {
					label: "Close",
					className: "btn-primary",
					callback : function(){
						BNJQ('.bn-leaderboard').show();
						BNJQ('body').removeClass('modal-open');
					}
				}
			}
		});
		BNJQ('.bn-leaderboard').hide();
		return false;
	},
	'isInt': function(x) {
		var y = parseInt(x);
		if(typeof(y)=="NaN") return false;
		return x==y && x.toString()==y.toString();
	},
	'number_format': function(number, decimals, dec_point, thousands_sep) {

		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function (n, prec) {
				var k = Math.pow(10, prec);
				return '' + Math.round(n * k) / k;
			};
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	},
	'bravesitesThemeClickSubmit': function() {
		BNJQ('<div class="bn-overlay"><div class="bn-overlay-content">Please wait.. Creating new website..</div></div>').appendTo('body');
		BNJQ('#passthroughBravesitesCreateSite').click();
	}
};
function submitAjaxPost(_form, _submissionUrl, _formName, _processMessage)
{
	// Define the container
	container = BNJQ('#bn-ajaxform-' + _formName);

	// Set Processing Message
	BNJQ('<div class="bn-ajaxform-loading">' + _processMessage + '</div>').appendTo(container);

	// Hide the Form
	BNJQ('#' + _formName).hide();

	// Add jqpost key for the form
	BNJQ("<input type=\"hidden\" name=\"jqpost\" value=\"1\" />").appendTo(_form);

	// Serialize the form data
	formData = _form.serializeArray();

	// Loop through the form data and serialize the
	// values to preserve multi-byte characters.
	BNJQ.each(formData, function(index) {
		switch (this.name) {
			case "form_key":
			case "imageverify":
			case "imgv":
				break;
			default:
				formData[index].value = escape(formData[index].value);
				break;
		}
	});

	// Post the form to the post uri
	BNJQ.post(_submissionUrl, formData, function(xhr) {
		// Output the response to the div container
		container.html(xhr);
	});
}

(function($) {
	// custom tablesort parsers
	// table sorter custom parsing/sorting
	function addTableSortParsers() {
		// sort a statistics field, contains a stat bar and a percentage
		$.tablesorter.addParser({
			id: 'statfield',
			is: function(s) {
				return false;
			},
			format: function(s) {
				return parseInt(s.toLowerCase().replace("n/a",-1));
			},
			type: 'numeric'
		});
		// sort a date field, will convert any date string into a timestamp for easy sorting
		$.tablesorter.addParser({
			id: 'datefield',
			is: function(s) {
				return false;
			},
			format : function(s) {
				return Date.fromString(s).getTime();
			},
			type: 'numeric'
		});
	};

	/*
	 * BNJQ plugin : field focuser
	 *
	 * @author Roger Riche
	 * @options n/a
	 *
	 * - Applies a ui enhancement to the selected collection of form elements that will apply
	 * a class of focus-field when the field is focused
	 *
	 * example usage: $('input','select','textarea').focuser();
	 */
	$.fn.fancyList = function() {
		this.each(function () {
			$(this).css({"listStyleType": "none"});
			$(this).children("li").css({"zoom":"1","overflow":"hidden"}).each(function(index) {
				$('<span class="bn-fl-index">' + (index + 1) + '</span>').prependTo($(this).wrapInner('<span class="bn-fl-wrapper"/>'));
			});
		});
	};
	$.fn.ajaxLink = function(_href, _container, _options, _message, _tpl) {
		if (!_tpl) {
			BNJQ(this).html('<div class="bn-ajaxform-loading">' + _message + '</div>');
		} else {
			_tpl = unescape(URLDecode(_tpl));
			_tpl = _tpl.replace(/\+/, ' ');
			_tpl = _tpl.replace(/{message}/, '<div class="bn-ajaxform-loading">' + _message + '</div>');
			BNJQ(container).html(_tpl);
		}
		// Perform the getJSON request to the server and get the result
		BNJQ.ajax({
			url: _href,
			type: "GET",
			success: function(data, textStatus, XMLHttpRequest) {
				BNJQ(_container).html(data);
			}
		});
	};
	$.fn.confirmMsg = function (msg,path,titleText,confirmBtn) {
		// target is assumed to be a button, or anchor tag with a default event of click.
		var target = $(this);

		if (!titleText) {
			var titleText = 'Confirm Dialog';
		}

		// target is a form so the event must be passed through onsubmit, let's find the
		// forms button and trigger click on it.
		if($(target).get(0).tagName=='FORM') {
			target = $(target).find('button[type=submit]').eq(0);
		}

		if(!confirmBtn) {
			confirmBtn = {};
			confirmBtn.label = 'Confirm';
			confirmBtn.className = 'btn-success';
		}
		// Use new Bootstrap Bootbox Dialogs
		bootbox.dialog({
			message: msg,
			title: titleText,
			buttons: {

				main: {
					label: "Cancel",
					className: "btn-alt",
					callback : function(){
						BNJQ('.bn-leaderboard').show();
						BNJQ('body').removeClass('modal-open');
					}
				},
				success: {
					label: confirmBtn.label,
					className: confirmBtn.className,
					callback: function() {
						BNui.confirm=true;
						BNJQ('.bn-leaderboard').show();
						BNJQ('body').removeClass('modal-open');
						if(path) {
							if($.isFunction(path)) {
								path.call(arguments);
							} else {
								window.location.href=path;
							}
						} else {
							$(target).trigger('click');
						}
					}
				}
			}
		});
		BNJQ('.bn-leaderboard').hide();

		if(!BNui.confirm) { return false;  }
	};
	$.fn.createSiteSelection = function () {
		// target is assumed to be a button, or anchor tag with a default event of click.
		var target = $(this);

		// Use new Bootstrap Bootbox Dialogs
		bootbox.dialog({
			message: 'Would you like to create a new Site Builder Website or FTP Hosted Website?',
			title: 'Select Type of Website to Create',
			buttons: {
				bravesites: {
					label: "Site Builder Site",
					className: "btn-success",
					callback: function() {
						window.location.href = '/bravesites/sites/create';
					}
				},
				bravehost: {
					label: "FTP Hosting Site",
					className: "btn-success",
					callback: function() {
						window.location.href = '/bravesites/sites/create';
					}
				}
			}
		});

	};
	$.fn.bsModal = function(title, message, submitLabel, callback) {
		// target is assumed to be a button, or anchor tag with a default event of click.
		var target = $(this);
		bootbox.dialog({
			message: message,
			title: title,
			buttons: {
				success: {
					label: submitLabel,
					className: "btn-primary",
					callback: function() {
						BNJQ('.bn-leaderboard').show();
						BNJQ('body').removeClass('modal-open');
						if(callback) {
							if($.isFunction(callback)) {
								callback.call(arguments);
							} else {
								window.location.href=callback;
							}
						} else {
							$(target).trigger('click');
						}
					}
				},
				close: {
					label: "Close",
					className: "btn-default",
					callback : function(){
						BNJQ('.bn-leaderboard').show();
						BNJQ('body').removeClass('modal-open');
					}
				}
			}
		});
		BNJQ('.bn-leaderboard').hide();
	},
		$.fn.upgradeMsg = function (msg,path) {

			// target is assumed to be a button, or anchor tag with a default event of click.
			var target = $(this);

			// target is a form so the event must be passed through onsubmit, let's find the
			// forms button and trigger click on it.
			if($(target).get(0).tagName=='FORM') {
				target = $(target).find('button[type=submit]').eq(0);
			}

			// Use new Bootstrap Bootbox Dialogs
			bootbox.dialog({
				message: msg,
				title: "Upgrade Required",
				buttons: {
					success: {
						label: "Upgrade Now!",
						className: "btn-success",
						callback: function() {
							BNui.confirm=true;

							BNJQ('.bn-leaderboard').show();
							BNJQ('body').removeClass('modal-open');
							if(path) {
								if($.isFunction(path)) {
									path.call(arguments);
								} else {
									window.location.href=path;
								}
							} else {
								$(target).trigger('click');
							}
						}
					},
					main: {
						label: "No Thanks",
						className: "btn-primary",
						callback : function(){
							BNJQ('.bn-leaderboard').show();
							BNJQ('body').removeClass('modal-open');
						}
					}
				}
			});

			BNJQ('.bn-leaderboard').hide();

			if(!BNui.confirm) { return false;  }

		};

	$.fn.focuser = function(options) {
		this.each(function () {
			$(this).bind('focus', function() {
				$(this).addClass('focus-field');
			});

			$(this).bind('blur',function () {
				$(this).removeClass('focus-field');
			});

		});
	};

	$.fn.historySelect = function() {
		this.each(function () {
			var select = $('select',$(this));
			$(select).bind('change',function () {
				var link_id = '#'+$(this).val();
				$(link_id).trigger('click');
			});
		});
	};

	/*
	 * BNJQ plugin setupDeepLinks
	 *
	 * @author Roger Riche
	 * @options n/a
	 *
	 * - applies to BNJQ selector $('.bn-history')
	 * - If the existance of deep links exists on the page, inject
	 * the BNJQ.Address plugin to handle ajax history through standard
	 * methods.
	 *
	 * Deep links have 3 types:
	 *
	 *  Standard Address : <a href="address:url" class="bn-history">link to url</a>
	 *  Form Deep Link : <form method="post" action="/pathto/action" class="bn-history">..</form>
	 *  Dialog Deep Link : <a href="dialog:/pathto/url" class="bn-history">link to dialog</a>
	 *
	 */
	$.fn.setupDeepLinks = function () {

		// If there are no history based elements, return before address plugin instantiation
		if($(document).find('.bn-history').length==0) {
			return;
		}

		// If there are links and no default/address containers for loading. Add them.
		if($(document).find('.bn-history').length>0 && ($(document).find('#bn-address-change').length==0 || $(document).find('#bn-address-default').length==0)) {
			if($(document).find('#bn-address-default').length==0) {
				//$('#bn-body').wrapInner('<div id="bn-address-default"></div>');
			}
			if($(document).find('#bn-address-change').length==0) {
				$('<div id="bn-address-change"></div>').appendTo($('#bn-body'));
			}
		}
		var default_eles = [];
		var i = 0;
		$('.bn-history').each(function () {
			var s = $(this).attr('href').split(":");
			if(s[0]=="address"  && typeof(s[2])=="string") {
				default_eles[i] = $(s[2]);
				if($(document).find(s[2]+'_change').length==0 && $(document).find(s[2]+'_default').length==0) {
					$(s[2]).css('position','relative').wrapInner('<div id="'+s[2].replace("#","")+'_default"></div>');
					$('<div id="'+s[2].replace("#","")+'_change"></div>').appendTo($(s[2]));
					$('<div id="'+s[2].replace("#","")+'_loading" class="bn-deeplink-load"></div>').appendTo($(s[2]));
				}
				i++;
			}
		});

		$.address.init(function () {
			$('.bn-history').address(function () {
				current_hash = $(this).attr('href');
				return current_hash;
			});
		}).change(function (event) {
			if(!event.value) {
				$('#bn-address-change').empty().hide();
				$(default_eles).each(function () {
					var dId = $(this).attr('id');
					$('#'+dId+'_change').empty().hide();
					$('#'+dId+'_default').show();
				});
				$('#bn-address-default').show();
				$('#bn-dialog').empty().dialog("destroy");
			} else {
				addressHandler(event);
			}
		});

		var addressHandler = function (e) {

			if(e.value.match(":")) {
				var p = e.value.split(":");
				var type = p[0];
				var page = URLDecode(p[1]);

				var address_element = false;
				var dialog_title = false;

				if(type=="dialog" && typeof(p[2])=="string") {
					var dialog_title = p[2];
				}
				if(type=="dialog" && typeof(p[3])=="string") {
					var dialog_button = p[3];
				}
				if(type=="dialog" && typeof(p[4])=="string") {
					var dialog_close_text = p[4];
				}
				if(type=="address" && typeof(p[2])=="string") {
					var address_element = p[2];
				}
				var ts_getstr = page.toString().match("\\?") ? '&':'?';
				var epoch = new Date().getTime();
				page = page + ts_getstr + 'ts=' + epoch;
			} else {
				var type = 'form';
				var page = e.path;
				var q = e.queryString;
			}

			switch(type) {
				case "address" : default :
				var handler = function(data) {
					$('#bn-dialog').empty().dialog("destroy");
					if(!address_element) {
						$('#bn-address-default').hide();
						$('#bn-address-change').empty().html(data).hide();
						if($('#bn-body',$('#bn-address-change')).length>0) {
							var bnbody = $('#bn-body',$('#bn-address-change'));
							$('#bn-address-change').html(bnbody).show();
						} else {
							$('#bn-address-change').show();
						}
					} else {
						$('#bn-address-default').show();
						$('#bn-address-change').hide();
						var dId = $(address_element).attr('id');
						$('#' + dId + '_default').hide();
						$('#' + dId + '_change').empty().html(data).show();
						$('#' + dId + '_loading').hide();
					}
				};
				var overlay_width = $(address_element).outerWidth()-parseInt($(address_element + '_loading').css('margin-left'))-parseInt($(address_element + '_loading').css('margin-right'));
				var overlay_height = $(address_element).outerHeight()-parseInt($(address_element + '_loading').css('margin-top'))-parseInt($(address_element + '_loading').css('margin-bottom'));

				var overlay_top = (parseInt($(address_element + '_loading').css('margin-top'))>0) ? $(address_element + '_loading').css('margin-top'):0;
				var overlay_bottom = (parseInt($(address_element + '_loading').css('margin-bottom'))>0) ? $(address_element + '_loading').css('margin-bottom'):0;
				var overlay_left = (parseInt($(address_element + '_loading').css('margin-left'))>0) ? $(address_element + '_loading').css('margin-left'):0;
				var overlay_right = (parseInt($(address_element + '_loading').css('margin-right'))>0) ? $(address_element + '_loading').css('margin-right'):0;

				$(address_element + '_loading').css({
					'width' : overlay_width+'px',
					'height' : overlay_height+'px',
					'top' : overlay_top + 'px',
					'left' : overlay_left + 'px',
					'right' : overlay_right + 'px',
					'bottom' : overlay_bottom + 'px'
				}).show();

				$.ajax({
					url : page,
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						handler(XMLHttpRequest.responseText);
					},
					success : function(data, textStatus, XMLHttpRequest) {
						handler(data);
					}
				});
				break;

				case "dialog" :
					var defaults = {
						'autoOpen' : false,
						'draggable' : false,
						'bgiframe' : true,
						'modal': (($.browser.msie == false) || ($.browser.msie == true && $.browser.version < 10)) ? true : false,
						'overlay': (($.browser.msie == false) || ($.browser.msie == true && $.browser.version < 10)) ? {
							backgroundColor: '#000',
							opacity: '.7'
						} : false,
						'minWidth' : 400,
						'minHeight' : 100,
						'maxHeight' : 400,
						'height' : 400,
						'resizable' : false,
						'position' : ['center',160],
						'closeText' : 'close window',
						'close' : function (event,ui) {
							history.go(-1);
							BNJQ('.bn-leaderboard').show();
						},
						'width' : 670,
						'zIndex' : 20000,
						'title' : (dialog_title) ? dialog_title.replace('+',' '):'Dialog Window',
						'dialogClass' : '',
						'closeOnEscape' : true,
						'buttons' : {
							'close' : function () {
								$(this).dialog('close');
								BNJQ('.bn-leaderboard').show();
							}
						}
					};
					$('#bn-dialog').bind('dialogopen', function () {
						$('applet').hide();
						BNJQ('.bn-leaderboard').hide();
					});
					$('#bn-dialog').bind('dialogclose', function () {
						$('applet').show();
						BNJQ('.bn-leaderboard').show();
					});
					if(dialog_button) {
						var db = dialog_button.split("_");
						var dlabel = db[0];
						document.callback = db[1];

						var dialog_buttons = {
							'buttons' : {
								'close' : function () {
									$(this).dialog('close');
									BNJQ('.bn-leaderboard').show();
								}
							}
						};
						if(dialog_close_text) {
							dialog_buttons.buttons[dialog_close_text] = dialog_buttons.buttons['close'];
							delete dialog_buttons.buttons['close'];
						}
						dialog_buttons.buttons[dlabel.replace("+"," ")] = function () {
							eval(document.callback+'();');
						};

						defaults = $.extend(defaults, dialog_buttons);
					}
					$('#bn-dialog').dialog('destroy').dialog(defaults);
					$('#bn-dialog').empty().load(page, function () {
						// current implementation of BNJQ dialog fails to abide the maxHeight rule with auto height dialogs
						$(this).dialog({
							height:400
						});
						var dheight = $(this).parent().show().css('visiblity','hidden').innerHeight();
						$(this).parent().hide().css('visibility','visible');
						if(dheight>400) {
							$(this).dialog({
								height:400
							});
						}
						;
						window.scrollTo(0,0);
					}).dialog('open');
					break;

				case "form" :
					var handler = function(data) {
						BNJQ('#bn-dialog').empty().dialog("destroy");
						$('#bn-address-default').hide();
						$('#bn-address-change').empty().html(data).show();
					};
					$.ajax({
						type : 'POST',
						url : page,
						data : q,
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							handler(XMLHttpRequest.responseText);
						},
						success : function(data, textStatus, XMLHttpRequest) {
							handler(data);
						}
					});
					break;
			}

		};
	};

	/*
	 * BNJQ plugin buttonState
	 *
	 * @author Roger Riche
	 * @options n/a
	 *
	 * - Once applied to selected buttons or input buttons, the button will contain 2
	 * states. hover (.button-hover), working (.button-working)
	 *
	 * example usage : $('button').buttonState();
	 */
	$.fn.buttonState = function(options) {
		this.each(function () {
			if (!$(this).hasClass('btn')) {
				$(this).mouseover(function () {
					$(this).addClass('button-hover');
				}).mouseout(function () {
					$(this).removeClass('button-hover');
				}).bind('mousedown', function () {
					$(this).addClass('button-working');
				});
			}
		});
	};

	$.fn.bnCheckbox = function(options) {
		if(options.images) {
			this.each(function () {
				if($(this).is(":checked") && $(this).attr('checked')!='') {
					var image = options.images.checkon;
					$('<img src="' + image + '" alt="" align="absmiddle"/>').css('cursor','pointer').insertBefore($(this));
				} else {
					var image = options.images.checkoff;
					$('<img src="' + image + '" alt="" align="absmiddle"/>').css('cursor','pointer').insertBefore($(this));
				}

				$(this).hide();
				if($(this).parents('label').length>0) {
					if(options.type=='radio') { bindRadioEvent($(this).parents($(this)).eq(0)); } else { bindCheckEvent($(this).parents($(this)).eq(0)); };
				} else {
					if(options.type=='radio') { bindRadioEvent($(this).prev()); } else { bindCheckEvent($(this).prev()); }
				}

			});
		}

		function bindRadioEvent(_ele) {
			selectingEvent(_ele,true);
		}


		function bindCheckEvent(_ele) {
			selectingEvent(_ele,false);
		}
		function selectingEvent(_ele,_radio) {
			$(_ele).bind('click', function (event) {
				event.preventDefault();
				if($(this).get(0).tagName=="LABEL") {
					var inp = $(this).children('input[type=checkbox],input[type=radio]').eq(0);
					var cimg = $(this).children('img').eq(0);
				} else {
					var inp = $(this).next();
					var cimg = $(this);
				}
				/* It's a radio, turn off all checks and checked values first */
				if(_radio) {
					if($(this).get(0).tagName=="LABEL") {
						var rinputs = $('input[type=checkbox],input[type=radio]',$(this).parent()).not($(this).children('input[type=checkbox],input[type=radio]').eq(0));
						var cimgs = $('img',$(this).parent()).not($(this).children('img').eq(0));
					}
					$(rinputs).removeAttr('checked');
					$.each(rinputs,function() {
						$(this).get(0).checked=false;
					});
					$(cimgs).attr('src',options.images.checkoff);
				}
				var checked = $(inp).attr('checked');
				if(checked && !_radio) {
					$(cimg).attr('src',options.images.checkoff);
					$(inp).get(0).checked=false;
					$(inp).removeAttr('checked');
				} else {
					$(cimg).attr('src',options.images.checkon);
					$(inp).get(0).checked=true;
					$(inp).attr('checked','checked');
				}
				if(options.callback && $.isFunction(options.callback)) {
					options.callback.call(arguments,$(inp));
					return;
				}
			});
		}
	};

	$.fn.slideMenu = function(){
		this.each(function () {
			var toggler = $('span',this).eq(0);
			var menu = $('ul',this).eq(0);
			if (menu.length > 0) {
				toggler.bind('click',toggleHandler);
			}
			function bodyHandler() {
				$('body').unbind('click', bodyHandler);
				menu.slideToggle('fast', function() {
					toggler.bind('click', toggleHandler);
				});
			}
			function toggleHandler() {
				toggler.unbind('click', toggleHandler);
				menu.slideToggle('fast', function() {
					if (menu.is(':visible')) {
						$('body').bind('click', bodyHandler);
					}
				});
			}
		});
	};

	$.fn.radioSelect = function(){
		return this.each(function () {
			$(this).bind('change', function () {
				if ($(this).parents('label').length > 0) {
					var label = $(this).parents('label').eq(0);
					$('input[name='+$(this).attr('name')+']').parents('label').removeClass('bn-radio-selected');
					if ($(this).is(":checked")) {
						$(label).addClass('bn-radio-selected');
					}
				}
			});
		});
	};

	$.fn.formHelper = function(){
		this.each(function () {
			var reltarget = $(this).attr('rel');
			var target = $('input[name='+reltarget+'],select[name='+reltarget+'],textarea[name='+reltarget+']');
			var targetpos = $(target).position();
			var left = Math.round(targetpos.left + $(target).outerWidth());
			var top = ($(target).outerHeight() > 35) ? Math.round(targetpos.top + ($(target).outerHeight() / 3.5)):Math.round(targetpos.top);
			var errorTPL = this;

			//var width = $(this).css({'display':'block'}).outerWidth();
			$(this).css({
				'left':left+'px',
				'top':top+'px',
				'z-index':'500',
				'display':'block',
				'white-space':'nowrap'
			});
			$(target).bind('focus', function() {
				$(errorTPL).hide();
			});
		});
	};

	$.fn.toggleCheck = function(){
		this.each(function () {
			if ($(this).is(':checked')) {
				$(this).removeAttr('checked');
				$(this).trigger('change');
			}	else {
				$(this).attr('checked','checked');
				$(this).trigger('change');
			}
		});
	};

	$.fn.checkAll = function() {
		this.each(function () {
			$(this).attr('checked','checked');
			$(this).trigger('change');
			$('.bn-check-toggler').attr('checked','checked');
		});
	};

	$.fn.checkNone = function(){
		this.each(function () {
			$(this).removeAttr('checked');
			$(this).trigger('change');
			$('.bn-check-toggler').removeAttr('checked');
		});
	};



	$.fn.bnCheckAll = function () {
		this.each(function () {
			$(this).bind('change', function () {
				var prow = $(this).parents('tr').eq(0);
				if ($(prow).children('th').length == 0) {
					if ($(this).is(":checked")) {
						$(prow).addClass('bn-row-selected');
					}
					else {
						$(prow).removeClass('bn-row-selected');
					}
				}
			});
		});
	};

	$.fn.innerLabels = function(){
		var items=this;
		var form=this;
		this.each(function () {
			if ($(this).get(0).tagName == "FORM") {
				items = $('input,select,textarea',$(this));
				var form = $(this);
			}
		});
		$.each(items, function () {
			var label = $(this).attr('title');
			$(this).removeAttr('title');
			var isPass = $(this).attr('rel')=='password-field';

			$(this).bind('blur',function () {
				if ($(this).val() == '') {
					$(this).val(label);
				}
			}).bind('focus',function () {
				if (isPass) {
					if($('#password-field').val()=='') {
						$(this).hide();
						$('#password-field').show().focus();
					}
				} else {
					if ($(this).val() == label) {
						$(this).val('');
					}
				}
			});
			$('#password-field').bind('blur',function() {
				if ($(this).val() == '') {
					$(this).hide();
					$('*[rel=password-field]').show();
				}
			});
			if(isPass) $(form).show();
		});
	};


	$.fn.bnChartInit = function(options) {
		var defaults = {
			chart_url : true,
			chart_options : {
				series : {
					lines: {
						show: true
					}
				},
				grid : {
					hoverable: true,
					borderWidth : 1
				}
			},
			chart_data : [ {
				label : 'Empty Chart',
				data: [ [0,0], [1,0] ]
			} ]
		};
		this.each(function () {
			var opt = $.extend(defaults,options);
			if(opt.chart_url) {
				$.plot($(this),opt.chart_data,opt.chart_options);
			}
		});
	};

	$.fn.tableSort = function() {
		if (this.length>0) addTableSortParsers();
		var defaults = {
			pager: false
		};
		var ts_defaults = { textExtraction: function(node) { return $(node).text().toString().replace(/\t/g,"").replace(/^\s*|\s*$/g,''); } };
		this.each(function (options) {
			var opts = defaults;

			if($(this).attr('rel')) {
				// extract options from here.
				var tmpopt = {};
				var relopts = $(this).attr('rel').split("|");
				$.each(relopts, function() {
					var tmp = this.split('_');
					if(tmp[0]=='pager' || tmp[0]=='multiselect') {
						opts[tmp[0]]=tmp[1];
					} else {
						if(tmp[1].match("\\[") || tmp[1].match("\\{")) {
							eval('tmp[1]='+tmp[1]);
						}
						tmpopt[tmp[0]]=tmp[1];
					}
				});
				var tsopts = $.extend(ts_defaults,tmpopt);
			}


			if(opts.pager) {
				// inject pager markup
				var pager = $('<table class="bn-table-paginator no-alt"><tr><td class="multi-select"></td><td align="center"><div class="bn-table-pager"><form><img src="http://assets.bravenet.com/bn/bravenet/img/icons/fam/control_start.png" alt="first" class="first"><img src="http://assets.bravenet.com/bn/bravenet/img/icons/fam/control_rewind.png" alt="prev" class="prev"><span class="pagedisplay" style="margin:0px 40px;"></span><img src="http://assets.bravenet.com/bn/bravenet/img/icons/fam/control_fastforward.png" alt="next" class="next"><img src="http://assets.bravenet.com/bn/bravenet/img/icons/fam/control_end.png" alt="last" class="last">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Per Page: <select class="pagesize"><option value="20" selected="selected">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option></select></form></div></td></tr></table>');
				var pagerClone = pager.clone();
				$(pagerClone).attr('id','pager-top');
				$(pager).insertAfter(this);
				$(pagerClone).insertBefore(this);
			}
			if (opts.multiselect) {
				var multiselect = $('Select: <a href="javascript:BNJQ.fn.checkAll();">all</a> | <a href="javascript:BNQJ.fn.checkNone();">none</a>');
				$(multiselect).appendTo($('.bn-table-paginator .multi-select'));
			}
			if(opts.pager) {
				$(this).tablesorter(tsopts).tablesorterPager({container:$('.bn-table-pager')});
			} else {
				$(this).tablesorter(tsopts);
			}
		});
	}

	$.fn.bnAccord = function () {
		this.each(function () {
			var defaults = {};
			$(this).bind('click', function () {
				var _ref = $(this).attr('ref');
				if($('.bn-accords').is(':visible')) {
					$('.bn-accords:visible').slideUp('fast', function() {
						$('#'+_ref).slideDown('medium');
					});
				} else {
					$('#'+_ref).slideDown('medium');
				}
			});
		});

		// find the colapse link and bind event
		$('.bn-accord-collapse').bind('click', function() {
			$('.bn-accords:visible').slideUp('fast');
		});
	};

	$.fn.bnDialogLinks = function() {

		this.each(function () {
			var defaults = {
				'autoOpen' : false,
				'draggable' : false,
				'bgiframe' : true,
				'modal': (($.browser.msie == false) || ($.browser.msie == true && $.browser.version < 10)) ? true : false,
				'overlay': (($.browser.msie == false) || ($.browser.msie == true && $.browser.version < 10)) ? {
					backgroundColor: '#000',
					opacity: '.7'
				} : false,
				'minWidth' : 400,
				'minHeight' : 100,
				'maxHeight' : 400,
				'height' : 400,
				'resizable' : false,
				'position' : 'center',
				'closeText' : 'close window',
				'width' : 650,
				'zIndex' : 10001,
				'buttons' : {
					'close' : function () {
						$(this).dialog('close');
						BNJQ('.bn-leaderboard').show();
					}
				}
			};
			if($(this).attr('rel')) {
				var _params = $(this).attr('rel');
				_params = _params.split(":");
				$.each(_params, function() {
					var _paramKV = this.split("_");
					if(_paramKV[0]=="button") {
						var db = _paramKV[1].split(">");
						var dlabel = db[0];
						document.callback = db[1];
						defaults['buttons'][dlabel.replace("+"," ")] = function () {
							eval(document.callback+'();');
						};
					} else {
						if(_paramKV[1].match("true")) {
							defaults[_paramKV[0]] = true;
						} else if(_paramKV[1].match("false")) {
							defaults[_paramKV[0]] = false;
						} else if(BNui.isInt(_paramKV[1])) {
							defaults[_paramKV[0]] = parseInt(_paramKV[1]);
						} else {
							defaults[_paramKV[0]] = _paramKV[1].replace(/\+/g,' ');
						}
					}
				});
			}

			$(this).bind('click',function(event) {
				var dialog_params = {  };
				dialog_params = $.extend(defaults,dialog_params);

				$('#bn-dialog').dialog('destroy').dialog(dialog_params);

				var dialog_url =$(this).attr('href');
				var ts_getstr = dialog_url.toString().match("\\?") ? '&':'?';
				var epoch = new Date().getTime();
				dialog_url = dialog_url + ts_getstr + 'ts=' + epoch;
				if(dialog_params.jsonCall) {
					$.getJSON(dialog_url + '&callback=?', function(content) {
						$('#bn-dialog').empty().html(content).dialog('open').dialog('moveToTop');;
						BNJQ('.bn-leaderboard').hide();
					});
				} else {

					$('#bn-dialog').empty().load(dialog_url, function () {
						// current implementation of BNJQ dialog fails to abide the maxHeight rule with auto height dialogs
						if(!dialog_params.height) {
							$(this).dialog({
								//height:'auto',
								height:400
							});
							var dheight = $(this).parent().show().css('visiblity','hidden').innerHeight();
							$(this).parent().hide().css('visibility','visible');
							if(dheight>400) {
								$(this).dialog({
									height:400
								});
							}
						}
						//$(this).dialog('open');
						BNJQ('.bn-leaderboard').hide();
					}).dialog('open');
				}
				event.preventDefault();
			});
		});
	};
})(BNJQ);

// utility methods
/**
 * @author Joey Mazzarelli
 * @website http://bitbucket.org/mazzarelli/js-date/
 * @website http://joey.mazzarelli.com/2008/11/25/easy-date-parsing-with-javascript/
 * @copyright Joey Mazzarelli
 * @license BSD license
 */

Date.fromString = (function () {

	var defaults = {
		order : 'MDY',
		strict : false
	};

	var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG",
		"SEP", "OCT", "NOV", "DEC"];

	var abs = ["AM", "PM", "AFTERNOON", "MORNING"];

	var mark = function (str, val) {
		var lval = val.toLowerCase();
		var regex = new RegExp('^' + lval + '|(.*[^:alpha:])' + lval, 'g');
		return str.replace(regex, '$1' + val);
	};

	var normalize = function (str) {
		str = str.toLowerCase();
		str = str.replace(/[^:a-z0-9]/g, '-');
		for (var i=0; i<months.length; i++) str = mark(str, months[i]);
		for (var i=0; i<abs.length; i++) str = mark(str, abs[i]);
		str = str.replace(/[a-z]/g, '');
		str = str.replace(/([0-9])([A-Z])/g, '$1-$2');
		str = ('-' + str + '-').replace(/-+/g, '-');
		return str;
	};

	var find_time = function (norm) {
		var obj = {date:norm, time:''};
		obj.time = norm.replace(
			/^.*-(\d\d?(:\d\d){1,2}(:\d\d\d)?(-(AM|PM))?)-.*$/, '$1');
		if (obj.time == obj.date)
			obj.time = norm.replace(/^.*-(\d\d?-(AM|PM))-.*$/, '$1');
		if (obj.time == obj.date) obj.time = '';
		obj.date = norm.replace(obj.time, '');
		obj.time = ('-' + obj.time + '-').replace(/-+/g, '-');
		obj.date = ('-' + obj.date + '-').replace(/-+/g, '-');
		return obj;
	};

	var find_year = function (norm) {
		var year = null;

		// Check for a 4-digit year
		year = norm.replace(/^.*-(\d\d\d\d)-.*$/, '$1');
		if (year != norm) return year; else year = null;

		// Check for a 2-digit year, over 32.
		year = norm.replace(/^.*-((3[2-9])|([4-9][0-9]))-.*$/, '$1');
		if (year != norm) return year; else year = null;

		// Day is always by month, so check for explicit months in
		// first or third spot
		year = norm.replace(/^.*-[A-Z]{3}-\d\d?-(\d\d?)-.*$/, '$1');
		if (year != norm) return year; else year = null;
		year = norm.replace(/^.*-(\d\d?)-\d\d?-[A-Z]{3}-.*$/, '$1');
		if (year != norm) return year; else year = null;

		// If all else fails, use the setting for the position of the year.
		var pos = '$3';
		if (defaults.opts.order.charAt(0) == 'Y') pos = '$1';
		else if (defaults.opts.order.charAt(1) == 'Y') pos = '$2';
		year = norm.replace(/^.*-(\d\d?)-([A-Z]{3}|\d{1,2})-(\d\d?)-.*$/, pos);
		if (year != norm) return year; else year = null;

		return year;
	};

	var find_month = function (norm, year) {
		// Check for an explicity month
		var matches = norm.match(/[A-Z]{3}/);
		if (matches && matches.length) return matches[0];

		// Remove the year, and unless obviously wrong, use order
		// to chose which one to use for month.
		var parts = norm.replace(year + '-', '').split('-');
		if (parts.length != 4) return null;
		var order = defaults.opts.order;
		var md = order.indexOf('M') < order.indexOf('D')? 1: 2;
		return (parseInt(parts[md], 10) <= 12)? parts[md]: parts[md==1? 2: 1];
	};

	var find_day  = function (norm, year, month) {
		return norm.replace(year, '').replace(month, '').replace(/-/g, '');
	};

	var create_absolute = function (obj) {

		var time = obj.time.replace(/[-APM]/g, '');
		var parts = time.split(':');
		parts[1] = parts[1] || 0;
		parts[2] = parts[2] || 0;
		parts[3] = parts[3] || 0;
		var ihr = parseInt(parts[0], 10);
		if (obj.time.match(/-AM-/) && ihr == 12) parts[0] = 0;
		else if (obj.time.match(/-PM-/) && ihr < 12) parts[0] = ihr + 12;
		parts[0] = ("0" + parts[0]).substring(("0" + parts[0]).length - 2);
		parts[1] = ("0" + parts[1]).substring(("0" + parts[1]).length - 2);
		parts[2] = ("0" + parts[2]).substring(("0" + parts[2]).length - 2);
		time = parts[0] + ":" + parts[1] + ":" + parts[2];
		var millisecs = parts[3];

		var strict = defaults.opts.strict;
		if (!obj.year && !strict) obj.year = (new Date()).getFullYear();
		var year = parseInt(obj.year, 10);
		if (year < 100) {
			year += (year<70? 2000: 1900);
		}

		if (!obj.month && !strict) obj.month = (new Date()).getMonth() + 1;
		var month = String(obj.month);
		if (month.match(/[A-Z]{3}/)) {
			month = "JAN-FEB-MAR-APR-MAY-JUN-JUL-AUG-SEP-OCT-NOV-DEC-"
				.indexOf(month) / 4 + 1;
		}
		month = ("0" + month).substring(("0" + month).length - 2);
		if (!obj.day && !strict) obj.day = (new Date()).getDate();
		var day = ("0" + obj.day).substring(("0" + obj.day).length - 2);

		var date = new Date();
		date.setTime(Date.parse(year + '/' + month + '/' + day + ' ' + time));
		date.setMilliseconds(millisecs);
		return date;
	};

	var parse = function (norm) {
		return absolute(norm);
	};

	var absolute = function (norm) {
		var obj = find_time(norm);
		obj.norm = norm;
		obj.year = find_year(obj.date);
		obj.month = find_month(obj.date, obj.year);
		obj.day = find_day(obj.date, obj.year, obj.month);
		return create_absolute(obj);
	};

	return function (fuzz, opts) {
		defaults.opts = { order: defaults.order, strict: defaults.strict };
		if (opts && opts.order) defaults.opts.order = opts.order;
		if (opts && opts.strict != undefined) defaults.opts.strict = opts.strict;
		var date = parse(normalize(fuzz));
		return date;
	};

})();

function URLDecode (encodedString) {
	var output = encodedString;
	var binVal, thisString;
	var myregexp = /(%[^%]{2})/;
	while ((match = myregexp.exec(output)) != null
	&& match.length > 1
	&& match[1] != '') {
		binVal = parseInt(match[1].substr(1),16);
		thisString = String.fromCharCode(binVal);
		output = output.replace(match[1], thisString);
	}
	return output;
}