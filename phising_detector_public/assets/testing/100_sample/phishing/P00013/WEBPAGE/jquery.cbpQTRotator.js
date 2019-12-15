/**
 * jquery.cbpQTRotator.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr;

	$.CBPQTRotator = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.CBPQTRotator.defaults = {
		// default transition speed (ms)
		speed : 700,
		// default transition easing
		easing : 'ease',
		// rotator interval (ms)
		interval : 4000
	};


	function Timer(callback, delay) {
	    var timerId, start, remaining = delay;
	
	    this.pause = function() {
	        window.clearTimeout(timerId);
	        remaining -= new Date() - start;
	    };
	
	    this.resume = function() {
	        start = new Date();
	        timerId = window.setTimeout(callback, remaining);
	    };
	
	    this.resume();
	}
	

	$.CBPQTRotator.prototype = {
		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.CBPQTRotator.defaults, options );
			if(this.$el.data('interval')){
				this.options.interval = this.$el.data('interval');
			}
			// cache some elements and initialize some variables
			this._config();
			// show current item
			this.$items.eq( this.current ).addClass( 'cbp-qtcurrent' );
			// set the transition to the items
			if( this.support ) {
				this._setTransition();
			}
			// start rotating the items
			this._startRotator();
			
			var that = this;
			
			// pasuse on hover 
			this.$el.hover(function(){
				that._pause();
			},function(){
				if(that.pauseOn) {
					that._start();
				}
				that.pauseOn = true;
			});

			this.nextBtn.click(function(e) {
				e.preventDefault();
				that._changeSlide('next');
			});

			this.prevBtn.click(function(e) {
				e.preventDefault();
				that._changeSlide('prev');
			});

		},
		_config : function() {

			this.pauseOn = true;

			// the content items
			this.$items = this.$el.children( 'div.cbp-qtcontent' );
			// next btn
			this.nextBtn = this.$el.find( 'div.cbp-next' );
			// prev btn
			this.prevBtn = this.$el.find( 'div.cbp-prev' );
			// total items
			this.itemsCount = this.$items.length;
			// current item's index
			this.current = 0;
			// support for CSS Transitions
			this.support = Modernizr.csstransitions;
			// add the progress bar
			if( this.support ) {
				this.$progress = $( '<span class="cbp-qtprogress"></span>' ).appendTo( this.$el );
			}

		},
		_setTransition : function() {
			setTimeout( $.proxy( function() {
				this.$items.css( 'transition', 'opacity ' + this.options.speed + 'ms ' + this.options.easing );
			}, this ), 25 );
		},
		_startRotator: function() {

			if( this.support ) {
				this._startProgress(this.options.interval);
			}

			this.slider = new this._timer( $.proxy( function() {
				if( this.support ) {
					this._resetProgress(0);
				}
				this._next();
				this._startRotator();
			}, this ), this.options.interval );

		},
		_timer : function(callback, delay) {
		    var timerId, start, remaining = delay;
		    
		    this.pause = function() {
		        window.clearTimeout(timerId);
		        remaining -= new Date() - start;
		        return remaining;
		    };
		
		    this.resume = function() {
		        start = new Date();
		        timerId = window.setTimeout(callback, remaining);
		    };
		
		    this.resume();
		},
		_pause : function() {
			this.remain = this.slider.pause();
			
			if( this.support ) {
				this._resetProgress(100-(this.remain/this.options.interval)*100);
			}
			
			
		},
		_start : function() {
			this.slider.resume();
			
			var time = this.remain;
			
			if( this.support ) {
				this._startProgress(time);
			}
			
		},
		_next : function() {

			// hide previous item
			this.$items.eq( this.current ).removeClass( 'cbp-qtcurrent' );
			// update current value
			this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
			// show next item
			this.$items.eq( this.current ).addClass('cbp-qtcurrent');


		},
		_prev : function() {

			// hide previous item
			this.$items.eq( this.current ).removeClass( 'cbp-qtcurrent' );
			// update current value
			this.current = this.current < 1 ? this.itemsCount - 1 : this.current - 1;
			// show next item
			this.$items.eq( this.current ).addClass('cbp-qtcurrent');


		},
		_changeSlide : function (pos) {
			this.pauseOn = false;
			this.remain = this.slider.pause();
			if(pos == 'next') {
				this._next();
			} else {
				this._prev();
			}
			this._resetProgress(0);
			this._startProgress(this.options.interval);
			this._startRotator();
		},
		_startProgress : function(time) {
			
			setTimeout( $.proxy( function() {
				this.$progress.css( { transition : 'width ' + time + 'ms linear', width : '100%' } );
			}, this ), 25 );

		},
		_resetProgress : function(width) {
			this.$progress.css( { transition : 'none', width : width + '%' } );
		},
		destroy : function() {
			if( this.support ) {
				this.$items.css( 'transition', 'none' );
				this.$progress.remove();
			}
			this.$items.removeClass( 'cbp-qtcurrent' ).css( {
				'position' : 'relative',
				'z-index' : 100,
				'pointer-events' : 'auto',
				'opacity' : 1
			} );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.cbpQTRotator = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'cbpQTRotator' );
				if ( !instance ) {
					logError( "cannot call methods on cbpQTRotator prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for cbpQTRotator instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'cbpQTRotator' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'cbpQTRotator', new $.CBPQTRotator( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );