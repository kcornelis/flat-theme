(function() {
	'use strict';

	var directiveName = 'ftSidebarMenuItem';

	angular.module('ft').directive(directiveName, sidebarMenuItem);

	sidebarMenuItem.$inject = [ '$compile' ];

	function sidebarMenuItem($compile) {
		return {
			restrict: 'A',
			scope: { item: '=ftSidebarMenuItem' },
			template: '<span ng-if="item.heading">{{ item.text }}</span>' +
					'<a ng-if="!item.heading && !item.sref">' +
						'<i ng-if="item.icon" class="{{ item.icon }}"></i>' +
						'<span>{{ item.text }}</span>' +
					'</a>' +
					'<a ng-if="!item.heading && item.sref" ui-sref="{{ item.sref }}">' +
						'<i ng-if="item.icon" class="{{ item.icon }}"></i>' +
						'<span>{{ item.text }}</span>' +
					'</a>',
			controller: function($scope, $element, $attrs) {
				var self = this;

				if($scope.item.heading) {
					$element.addClass('header');
				}

				if($scope.item.submenu) {
					$element.addClass('has-sub-menu');
					$element.append('<ul><li ng-repeat="item in item.submenu" ft-sidebar-menu-item="item"></li></ul>');
					$compile($element.contents())($scope);
				}
			}
		};
	}
})();