(function() {
	'use strict';

	var directiveName = 'ftSidebarMenu';

	angular.module('ft').directive(directiveName, sidebarMenuDirective);

	sidebarMenuDirective.$inject = [ '$compile' ];
	sidebarMenuController.$inject = [ '$rootScope', '$scope', '$element', '$attrs', '$http', '$state', '$timeout' ];

	function sidebarMenuDirective($compile) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="sidebar-menu" ng-transclude></div>',
			link: function(scope, element, attrs) {
				
				// if the menu is loaded with json we should disable transclude 
				// and add a template to render the json menu
				if(attrs.ftLoad) {
					element.removeAttr('ng-transclude');
					element.html('<ul><li ng-repeat="item in menuItems" ft-sidebar-menu-item="item"></li></ul>');
					$compile(element)(scope);
				}
			},
			controller: sidebarMenuController
		};
	}

	function sidebarMenuController($rootScope, $scope, $element, $attrs, $http, $state, $timeout) {
		var self = this;

		$scope.state = $state;

		// listen for state changes, select the new state if the state changes
		$scope.$watch('state.current.name', function(newValue, oldValue) {
			self.selectState(newValue);
	    });

		// load the menu from a json file if the element contains an ft-load attribute
	    self.loadJsonMenu = function(url) {
			$http.get(url).success(function(menuItems) {
				$scope.menuItems = menuItems;
				self.selectState($scope.state.current.name);
			});
		}

		if($attrs.ftLoad) {
			self.loadJsonMenu($attrs.ftLoad);
		}

		// listen for link clicks, only open the sub menu when the sidebar is not collapsed
		$(document).on('click', '.sidebar-menu li.has-sub-menu > a', function() {
			if($element.hasClass('collapsed'))
				return;

			self.openMenuItem($(this).closest('li'));
		});

		self.selectState = function(state) {
			
			// execute after the menu is rendered
			$timeout(function () {

				// find the menu item for the new state
				var activeMenuItem = $('a[ui-sref="' + state + '"]').closest('li');

				// activate the new menu item (also his parents), deactivate all other menu items
				activeMenuItem.parents('li').andSelf().each(function(index, menuItem) {
					var $menuItem = $(menuItem);

					$menuItem.addClass('active');
					$menuItem.siblings('li').removeClass('active');
					$menuItem.siblings('li').find('li').removeClass('active');
				});

				// open the active menu item (also his parents), close all other menu items
				activeMenuItem.parents('li.has-sub-menu').andSelf().each(function(index, menuItem) {
					var $menuItem = $(menuItem);

					// open the current menu item if the menu items has sub menu items
					if($menuItem.hasClass('has-sub-menu')){
						$menuItem.addClass('open');
						$menuItem.children('ul').slideDown(200);
					}

					// close other menu items
					$menuItem.siblings('li.has-sub-menu').children('ul').slideUp(200);
					$menuItem.siblings('li.has-sub-menu').removeClass('open');
					$menuItem.siblings('li.has-sub-menu').find('li.has-sub-menu').removeClass('open');
					$menuItem.siblings('li.has-sub-menu').find('ul').slideUp(200);
				});
			});
		}

		self.openMenuItem = function($menuItem) {
			if(!$menuItem.hasClass('has-sub-menu'))
				return;

			if ($menuItem.hasClass('open')) {
				$menuItem.removeClass('open');
				$menuItem.find('li.has-sub-menu').removeClass('open');
				$menuItem.find('ul').slideUp(200);
			}
			else {
				$menuItem.addClass('open');
				$menuItem.children('ul').slideDown(200);
				$menuItem.siblings('li.has-sub-menu').children('ul').slideUp(200);
				$menuItem.siblings('li.has-sub-menu').removeClass('open');
				$menuItem.siblings('li.has-sub-menu').find('li').removeClass('open');
				$menuItem.siblings('li.has-sub-menu').find('ul').slideUp(200);
			}
		}
	}
})();