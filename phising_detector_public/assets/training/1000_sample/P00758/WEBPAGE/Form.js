var FormRender = function($container, options) {
    // Process the ID and Type from the ID of the container.
    var containerid = $container.attr("id").split('--');
    var type = containerid[0];
    var id = containerid[1];

    var $content = $container.children().first();
    var $form = $container.find("form");
    var $responseBlock = $container.find(".error-block");
    var $submitButton = $form.find( 'input[type="submit"]' );

    $responseBlock.hide();

    $container.find('form').submit(function(ev) {
        ev.preventDefault();
        submitForm();
        return false;
    });

    var ajaxPost = function(action, obj, cb) {
        $.post('/_zbl.ajax?m=' + id + '&type=' + type + '&zbl=1&a=' + action, {'data': obj}, function(response) {
            (cb || $.noop)(response);
        }, 'json');
    };

    var setResponseHTML = function(words, isGood) {
        $responseBlock.removeClass("good");
        $responseBlock.show().html(words);
        if (isGood) {
            $responseBlock.addClass("good");
        }
    };

    var resetForm = function(isFieldsClear) {
        if (isFieldsClear) {
            $form.get(0).reset();
        }
        $submitButton.val("Submit");
    };

    var submitForm = function() {
        var entries = {};

        $responseBlock.hide();
        $form.find(".zbl-aInput").each(function() {
            var id2 = this.id.replace("input_", "");
            if (id2.indexOf("_") > 0) {
                var radioNameArr = id2.split("_");
                var origName = "input_" + radioNameArr[0];
                var newId = radioNameArr[0];
                entries[newId] = $form.find("input[name=" + origName + "]:checked").val();
            }
            else {
                entries[id2] = $(this).val();
            }
        });


        var captchaDude = $form.find('#recaptcha_iframe').get(0);

        if (captchaDude) {
            // Add the recaptcha challenge field from the recaptcha iframe to the form
            entries['captcha_challenge'] = captchaDude.contentWindow.document.getElementById('recaptcha_challenge_field').value;
            entries['captcha_response'] = captchaDude.contentWindow.document.getElementById('recaptcha_response_field').value;
        }

        $submitButton.val("Submitting...");

        ajaxPost('addResponse', {response: entries}, function(data) {
            if (data.response.error) {
                if (captchaDude) {
                    captchaDude.contentWindow.Recaptcha.reload();
                }

                resetForm(false);
                setResponseHTML(data.response.error, false);
            }
           else {
                resetForm(true);
                setResponseHTML("Response Successfully Submitted", true);
            }
        });
    };
}

