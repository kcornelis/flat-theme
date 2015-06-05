(function() {
	'use strict';

	angular.module('ft').directive('input', inputDirective);
	angular.module('ft').directive('select', inputDirective);

	inputDirective.$inject = [ ];

	function inputDirective() {
		return {
			restrict: 'E',
			require: [ '^?ftFormGroup' ],		
			link: function(scope, element, attrs, ctrls) {
				
				var formGroupController = ctrls[0];
				if(!formGroupController)
					return;

				if(!element.hasClass('form-control'))
					return;

				element.on('change', updateIsFormGroupFilled);

				element.on('focus', function(ev) {
					formGroupController.setActive(true);
				});

				element.on('blur', function(ev) {
					formGroupController.setActive(false);
					updateIsFormGroupFilled();
				});

				updateIsFormGroupFilled();

				function updateIsFormGroupFilled() {
					formGroupController.setIsFilled(!!element.val());
				}
			}
		};
	}
})();