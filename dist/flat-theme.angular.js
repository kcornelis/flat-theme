(function() {
	'use strict';
	
	angular.module('ft', ['LocalStorageModule']);
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

	var directiveName = 'input';

	angular.module('ft').directive(directiveName, inputDirective);

	inputDirective.$inject = [ ];

	function inputDirective() {
		return {
			restrict: 'E',
			require: [ '^?ftFormGroup' ],		
			link: function(scope, element, attrs, ctrls) {
				
				var formGroupController = ctrls[0];
				if(!formGroupController)
					return;

				element.on('change', updateIsFormGroupFilled);

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