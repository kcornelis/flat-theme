(function () {
  $('.form-group .form-control').on('focus', function () {
    $(this).parent().addClass('active');
  });
  $('.form-group .form-control').on('blur', function () {
    $(this).parent().removeClass('active');
    if ($(this).val()) {
      $(this).parent().addClass('filled');
    } else {
      $(this).parent().removeClass('filled');
    }
  });
}());