(function() {
	'use strict';

	angular.module('ft').run(fix);

	fix.$inject = [ '$rootScope', '$window' ];

	function fix($rootScope, $window) {
		$rootScope.$on('$stateChangeSuccess', function() {
			$window.scrollTo(0, 0);
		});
	}
})();