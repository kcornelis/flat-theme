(function() {
	'use strict';
	
	angular.module('ft', ['LocalStorageModule']);
})();
(function() {
	'use strict';
	
	angular.module('ft').run(function() {
		$(document).on('chosen:showing_dropdown', function (event) {
			$(event.target).closest('.form-group, .input-group').addClass('active');
		});

		$(document).on('chosen:hiding_dropdown', '.form-group .form-control', function () {
			$(this).closest('.form-group, .input-group').removeClass('active');
		});
	});
})();
(function() {
	'use strict';
	
	angular.module('ft').constant('mediaquery', {
		'desktopLG': 1200,
		'desktop': 992,
		'tablet': 768,
		'mobile': 480
	});
})();
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
(function() {
	'use strict';

	var directiveName = 'ftFormGroup';

	angular.module('ft').directive(directiveName, formGroupDirective);

	formGroupDirective.$inject = [ ];
	formGroupController.$inject = [ '$scope', '$element' ];
	
	function formGroupDirective() {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: '<div class="form-group" ng-transclude></div>',
			link: function(scope, element, attrs) {
				if(attrs.ftFloatingLabel !== undefined) {
					element.addClass('floating');
				}
			},
			controller: formGroupController
		};
	}

	function formGroupController($scope, $element) {
		var self = this;

		self.setIsFilled = function(isFilled) {
			$element.toggleClass('filled', !!isFilled);
		}

		self.setActive = function(active) {
			$element.toggleClass('active', !!active);
		}
	}
})();
(function() {
	'use strict';

	angular.module('ft').directive('input', inputDirective);
	angular.module('ft').directive('select', inputDirective);

	inputDirective.$inject = [ ];

	function inputDirective() {
		return {
			restrict: 'E',
			require: [ '^?ftFormGroup', '?ngModel' ],		
			link: function(scope, element, attrs, ctrls) {
				
				var formGroupController = ctrls[0];
				var ngModelCtrl = ctrls[1];
				
				if(!formGroupController)
					return;

				if(!element.hasClass('form-control'))
					return;

				element.on('change', updateIsFormGroupFilled);
				element.on('input', updateIsFormGroupFilled);

				if(ngModelCtrl) {
					ngModelCtrl.$parsers.push(ngModelPipeIsFormGroupFilled);
					ngModelCtrl.$formatters.push(ngModelPipeIsFormGroupFilled);
				}

				element.on('focus', function(ev) {
					formGroupController.setActive(true);
				});

				element.on('blur', function(ev) {
					formGroupController.setActive(false);
					updateIsFormGroupFilled();
				});

				updateIsFormGroupFilled();

				function updateIsFormGroupFilled() {
					formGroupController.setIsFilled(!!element.val());
				}

				function ngModelPipeIsFormGroupFilled(arg) {
					formGroupController.setIsFilled(!ngModelCtrl.$isEmpty(arg));
					return arg;
				}
			}
		};
	}
})();
(function() {
	'use strict';

	var directiveName = 'ftSidebar';
	var collapseStorageKey = 'sidebar-collapsed';
	var collapseClassName = 'sidebar-collapsed';

	angular.module('ft').directive(directiveName, sidebarDirective);

	sidebarDirective.$inject = [ ];
	sidebarController.$inject = [ '$scope', '$element', '$rootScope', 'localStorageService', 'mediaquery' ];

	function sidebarDirective() {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: '<aside id="sidebar" ng-transclude></aside>',
			controller: sidebarController
		};
	}

	function sidebarController($scope, $element, $rootScope, storage, mq) {
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
})();

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

//# sourceMappingURL=flat-theme.angular.js.map