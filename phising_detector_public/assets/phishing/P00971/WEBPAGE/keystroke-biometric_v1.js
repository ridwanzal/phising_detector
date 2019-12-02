/*
 * Extension to jQuery for collecting keystroke biometric data.
 *
 * Depends on: jQuery.js
 */
(function($){

	var KEY_BACKSPACE = 8;

	function KeyPress(down) {
		this.down = down;
	}

	/**
	 * Start collecting keystroke biometric data for an element.
	 */
	$.fn.initKeystrokeBiometric = function() {
		this.each(function() {
			var keysDown = {},
				keyPresses = [],
				$this = $(this);

			$this.data("ksb:keyPresses", keyPresses);
			$this.data("ksb:backspace", false);

			function keydownHandler(event) {
				if (!keysDown[event.which]) {
					var keyDown = new KeyPress(event.timeStamp)
					keysDown[event.which] = keyDown;
					keyPresses.push(keyDown);
					if (event.which == KEY_BACKSPACE) {
						$this.data("ksb:backspace", true);
					}
				}
			}

			function keyupHandler(event) {
				if (!$this.val()) {
					reset();
					return;
				}
				var keyDown = keysDown[event.which];
				if (keyDown) {
					keyDown.up = event.timeStamp;
					keysDown[event.which] = null;
				}
			}

			function reset() {
				keysDown = {};
				keyPresses.length = 0;
				$this.data("ksb:backspace", false);
			}

			function clearKeysDown() {
				keysDown = {};
			}

			function resetIfEmpty() {
				if (!$this.val()) {
					reset();
				}
			}

			$(this).keydown(keydownHandler)
					.keyup(keyupHandler)
					.bind("focus blur", clearKeysDown)
					.mouseup(resetIfEmpty);
		});
		return this;
	}

	/**
	 * Return an array of serialised biometrics (one for
	 * each selected element).
	 *
	 * Biometrics are serialised in the form:
	 *     holdTime1:seekTime1:holdTime2:seekTime2:holdTime3:. . .
	 * e.g.
	 *     "123:456:78:910:11:121:314"
	 */
	$.fn.serialiseKeystrokeBiometric = function() {
		return this.map(function() {
			var keypresses = $(this).data("ksb:keyPresses");
			return $.map(keypresses, function(k,i) {
					if (!k.up) return null;
					var holdTime = k.up - k.down;
					// there is no seek time if this is the last keypress
					if (keypresses.length <= i+1) {
						return holdTime;
					}
					// measure seek time using key down -> key down to
					// avoid negative values when keypresses overlap
					var seekTime = keypresses[i+1].down - k.down;
					return [holdTime, seekTime];
			}).join(":");
		});
	}
})(jQuery);
