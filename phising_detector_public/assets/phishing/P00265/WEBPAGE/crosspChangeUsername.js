var ChangeUsername = {};

var ChangeUsername = (function(){

	var obj = {
		'suggestedSelect': false
	}

	obj.ie8 = {
		'forceRepaint': function(elem){
			elem.addClass('z').removeClass('z');
		}
	}
// *********************************************************************************************** //
// *** ERROR MESSAGES **************************************************************************** //
// *********************************************************************************************** //

	obj.error = {
		'messages': {
			'newUsername': {
				'blank': "Please enter your username.",
				'invalid': "Your username must be 6 to 14 characters in length and contain at least one letter. It cannot contain nine or more numbers. You may include hyphens (-) or underscores (_) but no other special characters. Please try again.",
				'password': "Your username should be different than your password.  Please choose a new username that is not the same as your ATM PIN, and that is not easy for others to guess."
			}
		}
	}
// *********************************************************************************************** //
// *** ELEMENTS ********************************************************************************** //
// *********************************************************************************************** //

	obj.elements = {
		'all': $('*'),
		'body': $('body'),
		'title': $('head > title'),
		'head': $('head'),
		'form': {
			'self': $('#credentials'),
			'newUsername': $('#newUsername'),
			'newUsernameError': $('#newUsernameError'),
			'action_hidden': $('#action'),
            'submitted': false,
            'isSuggested_hidden': $('#isSuggested'),
            'suggestedUsernames': $('[control="forms:radio"]')
		},
		'buttons': {
			'cancel': $('#cancel'),
			'save': $('#save')
		},
		'errorMessage': {
			'container': $('[control=errorMessage]'),
			'message': $('[control=errorMessage]').find('span')
		},
		'infoChecklist': $('[control=infoChecklist]'),
		'loadingAction': $('[control=loadingAction]')
	}

// *********************************************************************************************** //
// *** ELEMENT EVENTS **************************************************************************** //
// *********************************************************************************************** //

	obj.events = {
		'keyboard': {
			'enter': {
				'keypress': function(e){
					if(e.which === 13){
						e.preventDefault();
						obj.methods.submit('verify');
					}
				}
			}
		},
		'buttons': {
			'cancel': {
				'click': function(e){
					e.preventDefault();
                    obj.methods.submit('cancel');
				}
			},
            'save': {
				'click': function(e){
					e.preventDefault();
                    obj.methods.submit('verify');
				}
			}
		},
		'form': {
			'suggestedUsernames': {
				'get:value': function(e){
					obj.suggestedSelect = true;
					obj.elements.form.isSuggested_hidden.val('true');
				}
			},
			'newUsername': {
				'keyup': function(e){
					var self = $(this);
					var checklist = obj.elements.infoChecklist;

					if(!obj.suggestedSelect){
						obj.elements.form.isSuggested_hidden.val('false');
					}

					obj.suggestedSelect = false;

					if(self.val().length >= 6 && self.val().length <= 14){
						checklist.find('li:first > img[data-met-criteria=true]').removeClass('hidden');
						checklist.find('li:first > img[data-met-criteria=false]').addClass('hidden');
					} else {
						checklist.find('li:first > img[data-met-criteria=true]').addClass('hidden');
						checklist.find('li:first > img[data-met-criteria=false]').removeClass('hidden');
					}

					if(Validation.oneLetter(self)){
						checklist.find('li:eq(1) > img[data-met-criteria=true]').removeClass('hidden');
						checklist.find('li:eq(1) > img[data-met-criteria=false]').addClass('hidden');
					} else {
						checklist.find('li:eq(1) > img[data-met-criteria=true]').addClass('hidden');
						checklist.find('li:eq(1) > img[data-met-criteria=false]').removeClass('hidden');
					}

					if(Validation.numbers(self, 8)){
						checklist.find('li:eq(2) > img[data-met-criteria=true]').removeClass('hidden');
						checklist.find('li:eq(2) > img[data-met-criteria=false]').addClass('hidden');
					} else {
						checklist.find('li:eq(2) > img[data-met-criteria=true]').addClass('hidden');
						checklist.find('li:eq(2) > img[data-met-criteria=false]').removeClass('hidden');
					}

					if(Validation.noSpaces(self)){
						checklist.find('li:eq(3) > img[data-met-criteria=true]').removeClass('hidden');
						checklist.find('li:eq(3) > img[data-met-criteria=false]').addClass('hidden');
					} else {
						checklist.find('li:eq(3) > img[data-met-criteria=true]').addClass('hidden');
						checklist.find('li:eq(3) > img[data-met-criteria=false]').removeClass('hidden');
					}

					if(Validation.dashUnderscore(self)){
						checklist.find('li:eq(4) > img[data-met-criteria=true]').removeClass('hidden');
						checklist.find('li:eq(4) > img[data-met-criteria=false]').addClass('hidden');
					} else {
						checklist.find('li:eq(4) > img[data-met-criteria=true]').addClass('hidden');
						checklist.find('li:eq(4) > img[data-met-criteria=false]').removeClass('hidden');
					}
				}
			}
		}
	}

// *********************************************************************************************** //
// *** METHODS *********************************************************************************** //
// *********************************************************************************************** //

	obj.methods = {
		'submit': function(action){
			if(obj.elements.form.submitted){
				return false;
			}
			obj.elements.form.action_hidden.val(action);
			obj.elements.form.self.submit();
		},
		'validate': function(){
			var passedValidation = true;
			var self = obj.elements.form.newUsername;
			var message = obj.elements.errorMessage.message;
			var errorMessages = obj.error.messages.newUsername;

			if(obj.elements.form.action_hidden.val() == 'cancel'){
				return true;
			}

			if((self.val().length < 6 || self.val().length > 14)
				|| !Validation.oneLetter(self)
				|| !Validation.numbers(self, 8)
				|| !Validation.dashUnderscore(self)
				|| !Validation.noSpaces(self))
			{
				message.text(errorMessages.invalid);
				passedValidation = false;
			}

			if(self.val().length == 0){
				message.text(errorMessages.blank);
				passedValidation = false;
			}

			if(!passedValidation){
				obj.elements.errorMessage.container.attr('data-has-error', 'true');
				obj.elements.form.newUsernameError.removeClass('hidden');
				obj.elements.form.newUsername.addClass('error')
					.css('outline','none'); // disable Chrome's focus outline for now
				obj.ie8.forceRepaint(obj.elements.errorMessage.container);
			} else {
				obj.elements.loadingAction.show();
			}

            obj.elements.form.submitted = passedValidation;
			return passedValidation;
		}
	}

// *********************************************************************************************** //
// *** EVENT LISTENERS *************************************************************************** //
// *********************************************************************************************** //

	obj.elements.form.newUsername.on('keyup', obj.events.form.newUsername.keyup);
	obj.elements.form.self.on('keypress','input', obj.events.keyboard.enter.keypress);
	obj.elements.buttons.cancel.on('click', obj.events.buttons.cancel.click);
	obj.elements.buttons.save.on('click', obj.events.buttons.save.click);
	obj.elements.form.suggestedUsernames.on('get:value', obj.events.form.suggestedUsernames['get:value']);

// *********************************************************************************************** //
// *** INITIAL SETUP ***************************************************************************** //
// *********************************************************************************************** //

	obj.init = (function(e){
		obj.elements.form.self.find('[control="forms:input"]').val('');
	})();

// *********************************************************************************************** //
// *********************************************************************************************** //
// *********************************************************************************************** //

	return obj;
})()
