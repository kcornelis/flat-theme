// TODO: for now the sidebar menu only works with a json configuration, 
//       implement other ways to initialize the menu

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
			template: '<div class="sidebar-menu"><ul><ft-sidebar-menu-item ng-repeat="item in menuItems" ft-menu-item="item"></ft-sidebar-menu-item></ul></div>',
			controller: sidebarMenuController
		};
	}

	function sidebarMenuController($rootScope, $scope, $element, $attrs, $http, $state, $timeout) {
		var self = this;
		var $body = $('body');

		$scope.state = $state;

		// listen for state changes, select the new state if the state changes
		$scope.$watch('state.current.name', function(newValue, oldValue) {
			self.selectState(newValue);
		});

		self.eachMenuItem = function(f) {

			var loop = function(menuItem) {
				f(menuItem);

				if(menuItem.submenu) {
					for(var i = 0; i < menuItem.submenu.length; i++)  {
						loop(menuItem.submenu[i]);
					}
				}
			}

			if($scope.menuItems) {
				for(var i = 0; i < $scope.menuItems.length; i++) {
					loop($scope.menuItems[i]);
				}
			}
		}

		self.findMenuItemWithState = function(state) {
			if(!$scope.menuItems)
				return;
			
			var found = null;
			var findMenuItem = function(menuItem) {

				if(menuItem.sref === state) {
					return menuItem;
				}

				if(menuItem.submenu) {
					for(var i = 0; i < menuItem.submenu.length; i++)  {
						var result = findMenuItem(menuItem.submenu[i]);
						if(result != null) {
							return result;
						}
					}
				}

				return null;
			}

			for(var i = 0; i < $scope.menuItems.length; i++) {
				found = findMenuItem($scope.menuItems[i]);
				if(found != null) {
					break;
				}
			}

			return found;
		}

		self.buildMenuTree = function(menuItems) {

			if(!menuItems) {
				$scope.menuItems = null;
				return;
			}

			var initializeMenuItem = function(menuItem) {
				menuItem.active = false;
				menuItem.open = false;
				menuItem.hasSubMenu = menuItem.submenu && $.isArray(menuItem.submenu);

				if(menuItem.hasSubMenu) {
					for(var i = 0; i < menuItem.submenu.length; i++)  {
						menuItem.submenu[i].parent = menuItem;
						initializeMenuItem(menuItem.submenu[i]);
					}
				}
			}

			for(var i = 0; i < menuItems.length; i++) {
				initializeMenuItem(menuItems[i]);
			}

			$scope.menuItems = menuItems;
		}

		// load the menu from a json file if the element contains an ft-load attribute
		self.loadJsonMenu = function(url) {
			$http.get(url).success(function(menuItems) {
				self.buildMenuTree(menuItems);
				self.selectState($scope.state.current.name);
			});
		}

		if($attrs.ftLoad) {
			self.loadJsonMenu($attrs.ftLoad);
		}

		self.selectState = function(state) {
			
			// execute after the menu is rendered
			$timeout(function () {
				self.eachMenuItem(function(mi) {
					mi.active = false;
				});

				var activeMenuItem = self.findMenuItemWithState(state);
				if(activeMenuItem != null) {
					activeMenuItem.active = true;

					// make sure all menu item parents have the active state
					var parentMenuItem = activeMenuItem.parent;
					while(typeof(parentMenuItem) != 'undefined' && parentMenuItem != null) {
						parentMenuItem.active = true;
						parentMenuItem = parentMenuItem.parent;
					}

					// make sure the active menu item is visible
					// openMenuItem calls $scope.$apply at the end!
					self.openMenuItem(activeMenuItem, true);
				}
			});
		}

		self.openMenuItem = function(menuItem, openWhenCollapsed) {

			// open menu item should always run when it's from a state change
			// when entering from a click, the code should only run when the sidebar is not collapsed
			if(!openWhenCollapsed && $body.hasClass('sidebar-collapsed'))
				return;

			var currentState = menuItem.open;

			// close all menu items
			self.eachMenuItem(function(mi) {
				mi.open = false;
			});

			// only set the state to open if the menu item has a sub menu
			if(menuItem.hasSubMenu)
			{
				// invert the state of the clicked menu item
				menuItem.open = !currentState;
			}

			// make sure all the parents from the menu item are open
			var parentMenuItem = menuItem.parent;
			while(typeof(parentMenuItem) != 'undefined' && parentMenuItem != null) {
				parentMenuItem.open = true;
				parentMenuItem = parentMenuItem.parent;
			}

			$scope.$apply();
		}
	}
})();