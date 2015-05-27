(function() {
	'use strict';

	var directiveName = 'ftToggleSidebar';
	var collapseStorageKey = 'sidebar-collapsed';
	var collapseClassName = 'sidebar-collapsed';

	angular.module('ft').directive(directiveName, toggleSidebar);

	toggleSidebar.$inject = [ 'localStorageService', 'mediaquery' ];

	function toggleSidebar(storage, mq) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var $body = $('body');
				var $window = $(window);

				element.click(function() {
					$body.toggleClass(collapseClassName);

					// only save the state when not in tablet mode
					if($window.width() >= mq.tablet) {
						storage.set(collapseStorageKey, $body.hasClass(collapseClassName));
					}
				});
			}
		};
	}
})();
