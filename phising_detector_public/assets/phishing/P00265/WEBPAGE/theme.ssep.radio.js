 // SSEP Forms:Radio
$('#body[theme=ssep]').find('div[control="forms:radio"]:not([no-theme])').each(function(){
    var self = $(this);
    var id = self.attr('id');
    var name = self.attr('name');
    var value = self.attr('value');
    var labelId = self.attr('aria-labelledby');
    var contextPath = $('body').attr('contextPath');

    self.after('<input control="forms:radio" type="radio" value="' + value + '" name="' + name + '" id="' + id + '" name="' + id + '" aria-labelledby="'+ labelId +'"/>');

    self.on('click', function(e){
        var elem = $(this);

        $('[name="' + elem.attr('name') + '"]').find('img').attr('src', contextPath + '/fixed1/images/radio_off.png');
        $('[name="' + elem.attr('name') + '"]').attr('isselected', 'false');

        if(elem.attr('isselected') == 'true'){
            elem.find('img').attr('src', contextPath + '/fixed1/images/radio_off.png');
            elem.attr('isselected', 'false');


            self.siblings('#' + id).attr('checked', false);
        } else {
            elem.find('img').attr('src', contextPath + '/fixed1/images/radio_checked.png');
            elem.attr('isselected', 'true');

            self.siblings('#' + id).attr('checked', true);

            self.trigger('get:value', {value: value});
        }
    })

    self.on('keyup', function(e){
        if(e.which == 32){
            self.trigger('click');
        }
    })
})  
