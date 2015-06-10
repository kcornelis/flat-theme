$(function() {

	$(document).on('chosen:showing_dropdown', function (event) {
		$(event.target).closest('.form-group, .input-group').addClass('active');
	});

	$(document).on('chosen:hiding_dropdown', '.form-group .form-control', function () {
		$(this).closest('.form-group, .input-group').removeClass('active');
	});
});

$(function() {
	
	$(document).on('focus', '.form-control', function () {
		$(this).closest('.form-group, .input-group').addClass('active');
	});

	$(document).on('blur', '.form-control', function () {
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

	$('.form-control').initialize( function() {
		if($(this).val()) {
			$(this).closest('.form-group, .input-group').addClass('filled');
		}
	});

});

//# sourceMappingURL=flat-theme.jquery.js.map