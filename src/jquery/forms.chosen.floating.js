$(function() {

	$(document).on('chosen:showing_dropdown', function (event) {
		$(event.target).closest('.form-group, .input-group').addClass('active');
	});

	$(document).on('chosen:hiding_dropdown', '.form-group .form-control', function () {
		$(this).closest('.form-group, .input-group').removeClass('active');
	});
});
