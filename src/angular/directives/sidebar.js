(function() {
	'use strict';

	var directiveName = 'ftSidebar';
	var collapseStorageKey = 'sidebar-collapsed';
	var collapseClassName = 'sidebar-collapsed';

	angular.module('ft').directive(directiveName, sidebar);

	sidebar.$inject = [ 'localStorageService' ];

	function sidebar(storage) {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: '<aside id="sidebar" ng-transclude></aside>',			
			link: function(scope, element, attrs) {
				var $body = $('body');

				if(storage.get(collapseStorageKey)) {
					$body.addClass(collapseClassName);
				} else {
					$body.removeClass(collapseClassName);
				}
			}
		};
	}
})();
