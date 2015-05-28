(function() {
	'use strict';

	var directiveName = 'ftSidebarMenuItem';

	angular.module('ft').directive(directiveName, sidebarMenuItemDirective);

	sidebarMenuItemDirective.$inject = [ ];
	sidebarMenuItemController.$inject = [ '$scope', '$element', '$attrs', '$compile' ];

	function sidebarMenuItemDirective() {
		return {
			restrict: 'A',
			scope: { item: '=ftSidebarMenuItem' },
			template: '<span ng-if="item.heading">{{ item.text }}</span>' +
					'<a ng-if="!item.heading && !item.sref && !item.href">' +
						'<i ng-if="item.icon" class="{{ item.icon }}"></i>' +
						'<span>{{ item.text }}</span>' +
					'</a>' +
					'<a ng-if="!item.heading && item.sref && !item.href" ui-sref="{{ item.sref }}">' +
						'<i ng-if="item.icon" class="{{ item.icon }}"></i>' +
						'<span>{{ item.text }}</span>' +
					'</a>' +
					'<a ng-if="!item.heading && !item.sref && item.href" href="{{ item.href }}">' +
						'<i ng-if="item.icon" class="{{ item.icon }}"></i>' +
						'<span>{{ item.text }}</span>' +
					'</a>',
			controller: sidebarMenuItemController
		};
	}

	function sidebarMenuItemController($scope, $element, $attrs, $compile) {
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
})();