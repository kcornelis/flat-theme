(function() {
	'use strict';

	var directiveName = 'ftSidebar';
	var collapseStorageKey = 'sidebar-collapsed';
	var collapseClassName = 'sidebar-collapsed';

	angular.module('ft').directive(directiveName, sidebar);

	sidebar.$inject = [ '$rootScope', 'localStorageService', 'mediaquery' ];

	function sidebar($rootScope, storage, mq) {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: '<aside id="sidebar" ng-transclude></aside>',
			controller: function($scope, $element) {
				var self = this;

				var $window = $(window);
				var $body = $('body');

				// in tablet mode the menu should collapse when the state changes
				$rootScope.$on('$stateChangeStart', function() {
					if(self.isMobile()) {
						self.collapse();
					} else {
						self.restoreFromLocalStorage();
					}
				});

				// switch between normal and mobile mode should collapse/expand the menu
				$window.on('resize', function() {
					if(self.isMobile()) {
						self.collapse();
					} else {
						self.restoreFromLocalStorage();
					}
				});

				self.restoreFromLocalStorage = function() {
					if(storage.get(collapseStorageKey)) {
						self.collapse();
					} else {
						self.expand();
					}
				}

				self.collapse = function() {
					$body.addClass(collapseClassName);
				}

				self.expand = function() {
					$body.removeClass(collapseClassName);
				}

				self.isMobile = function() {
					return $window.width() < mq.tablet;
				}

				// initialize sidebar
				self.restoreFromLocalStorage();
			}
		};
	}
})();
