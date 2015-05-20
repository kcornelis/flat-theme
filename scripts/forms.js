(function() {
	$(document).on('focus', '.form-group .form-control', function () {
		$(this).parent().addClass('active');
	});

	$(document).on('blur', '.form-group .form-control', function () {
		$(this).parent().removeClass('active');
		if ($(this).val()) {
			$(this).parent().addClass('filled');
		} else {
			$(this).parent().removeClass('filled');
		}
	});
})();
