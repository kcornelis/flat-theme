(function() {
	'use strict';

	var directiveName = 'input';

	angular.module('ft').directive(directiveName, inputDirective);

	inputDirective.$inject = [ ];

	function inputDirective() {
		return {
			restrict: 'E',
			require: [ '^?ftFormGroup' ],		
			link: function(scope, element, attrs, ctrls) {
				
				var formGroupController = ctrls[0];
				if(!formGroupController)
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