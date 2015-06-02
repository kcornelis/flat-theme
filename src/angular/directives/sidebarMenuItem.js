(function() {
	'use strict';

	var directiveName = 'ftSidebarMenuItem';

	angular.module('ft').directive(directiveName, sidebarMenuItemDirective);
	angular.module('ft').animation('.ft-submenu-slide', sidebarSubmenuSlideAnimation);

	sidebarMenuItemDirective.$inject = [ ];
	sidebarMenuItemController.$inject = [ '$scope', '$element', '$attrs', '$compile' ];

	function sidebarMenuItemDirective() {
		return {
			restrict: 'E',
			require: [ '^?ftSidebarMenu' ],
			scope: { item: '=ftMenuItem' },
			replace: true,
			template: '<li ng-class="{ active: item.active, open: item.open }"><span ng-if="item.heading">{{ item.text }}</span>' +
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
					'</a></li>',
			link: function(scope, element, attrs, ctrls) {
				var sidebarMenuController = ctrls[0];
				if(!sidebarMenuController)
					return;

				element.on('click', function(e) {
					sidebarMenuController.openMenuItem(scope.item);
					e.stopPropagation();
				});
			},
			controller: sidebarMenuItemController
		};
	}

	function sidebarMenuItemController($scope, $element, $attrs, $compile) {
		var self = this;

		if($scope.item.heading) {
			$element.addClass('header');
		}

		if($scope.item.hasSubMenu) {
			$element.addClass('has-sub-menu');
			$element.append('<ul ng-show="item.open" class="ft-submenu-slide"><ft-sidebar-menu-item ng-repeat="item in item.submenu" ft-menu-item="item"></ft-sidebar-menu-item></ul>');
			$compile($element.contents())($scope);
		}
	}

	function sidebarSubmenuSlideAnimation() {
		return {
			beforeAddClass: function(element, className, done) {
				if(className === 'ng-hide') {
					element.slideUp(150, done);
				}
			},
			removeClass: function(element, className, done) {
				if(className === 'ng-hide') {
					element.hide().slideDown(150, done);
				}
			}
		}
	}
})();