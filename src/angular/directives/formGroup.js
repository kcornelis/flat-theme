(function() {
	'use strict';

	var directiveName = 'ftFormGroup';

	angular.module('ft').directive(directiveName, formGroupDirective);

	formGroupDirective.$inject = [ ];
	formGroupController.$inject = [ '$scope', '$element' ];
	
	function formGroupDirective() {
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
			controller: formGroupController
		};
	}

	function formGroupController($scope, $element) {
		var self = this;

		self.setIsFilled = function(isFilled) {
			$element.toggleClass('filled', !!isFilled);
		}

		self.setActive = function(active) {
			$element.toggleClass('active', !!active);
		}
	}
})();