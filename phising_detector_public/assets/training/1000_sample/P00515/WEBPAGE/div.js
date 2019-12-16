$(document).ready(function(){
		$('#casa').hide();
		var size  =  $('#cep').attr("size");
		$('#cep').keyup(function(){
			var entry = $(this).attr("value");
			var current_length = $(this).attr("value").length;
			if (current_length>= size) {
				$('#casa').html();
				$('#casa').show('fast');
			}
				else $('#casa').hide('fast');
			});
	});