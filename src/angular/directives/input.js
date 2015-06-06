(function() {
	'use strict';

	angular.module('ft').directive('input', inputDirective);
	angular.module('ft').directive('select', inputDirective);

	inputDirective.$inject = [ ];

	function inputDirective() {
		return {
			restrict: 'E',
			require: [ '^?ftFormGroup', '?ngModel' ],		
			link: function(scope, element, attrs, ctrls) {
				
				var formGroupController = ctrls[0];
				var ngModelCtrl = ctrls[1];
				
				if(!formGroupController)
					return;

				if(!element.hasClass('form-control'))
					return;

				element.on('change', updateIsFormGroupFilled);
				element.on('input', updateIsFormGroupFilled);

				if(ngModelCtrl) {
					ngModelCtrl.$parsers.push(ngModelPipeIsFormGroupFilled);
					ngModelCtrl.$formatters.push(ngModelPipeIsFormGroupFilled);
				}

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

				function ngModelPipeIsFormGroupFilled(arg) {
					formGroupController.setIsFilled(!ngModelCtrl.$isEmpty(arg));
					return arg;
				}
			}
		};
	}
})();