(function() {
	'use strict';

	var directiveName = 'ftToggleSidebar';
	var collapseStorageKey = 'sidebar-collapsed';
	var collapseClassName = 'sidebar-collapsed';

	angular.module('ft').directive(directiveName, toggleSidebar);

	toggleSidebar.$inject = [ 'localStorageService' ];

	function toggleSidebar(storage) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var $body = $('body');

				element.click(function() {
					$body.toggleClass(collapseClassName);
					storage.set(collapseStorageKey, $body.hasClass(collapseClassName));
				});
			}
		};
	}
})();
