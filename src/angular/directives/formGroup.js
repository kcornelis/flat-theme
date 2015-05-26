(function() {
	'use strict';

	var directiveName = 'ftFormGroup';

	angular.module('ft').directive(directiveName, formGroup);

	formGroup.$inject = [ ];

	function formGroup() {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: '<div class="form-group" ng-transclude></div>',
			link: function(scope, element, attrs) {
				if(attrs.ftFloatingLabel !== undefined) {
					element.addClass('floating');
				}
			},
			controller: function($scope, $element) {
				var self = this;

				self.setIsFilled = function(isFilled) {
					$element.toggleClass('filled', !!isFilled);
				}

				self.setActive = function(active) {
					$element.toggleClass('active', !!active);
				}
			}
		};
	}
})();