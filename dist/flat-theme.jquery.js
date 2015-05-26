$(function() {
	$(document).on('focus', '.form-group .form-control', function () {
		$(this).closest('.form-group, .input-group').addClass('active');
	});

	$(document).on('blur', '.form-group .form-control', function () {
		$(this).closest('.form-group, .input-group').removeClass('active');
	});	

	$(document).on('change', '.form-control', function(){
		if ($(this).val()) {
			$(this).closest('.form-group, .input-group').addClass('filled');
		} else {
			$(this).closest('.form-group, .input-group').removeClass('filled');
		}
	});

	$('.form-control[value]').closest('.form-group, .input-group').addClass('filled');
});

//# sourceMappingURL=flat-theme.jquery.js.map