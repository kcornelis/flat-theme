(function() {
	'use strict';
	
	angular.module('ft', ['LocalStorageModule']);
})();
(function() {
	'use strict';

	var directiveName = 'ftFormGroup';

	angular.module('ft').directive(directiveName, formGroup);

	formGroup.$inject = [ ];

	function formGroup() {
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
			controller: function($scope, $element) {
				var self = this;

				self.setIsFilled = function(isFilled) {
					$element.toggleClass('filled', !!isFilled);
				}

				self.setActive = function(active) {
					$element.toggleClass('active', !!active);
				}
			}
		};
	}
})();
(function() {
	'use strict';

	var directiveName = 'input';

	angular.module('ft').directive(directiveName, input);

	input.$inject = [ ];

	function input() {
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

	angular.module('ft').directive(directiveName, sidebar);

	sidebar.$inject = [ 'localStorageService' ];

	function sidebar(storage) {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: '<aside id="sidebar" ng-transclude></aside>',			
			link: function(scope, element, attrs) {
				var $body = $('body');

				if(storage.get(collapseStorageKey)) {
					$body.addClass(collapseClassName);
				} else {
					$body.removeClass(collapseClassName);
				}
			}
		};
	}
})();

(function() {
	'use strict';

	var directiveName = 'ftSidebarMenu';

	angular.module('ft').directive(directiveName, sidebarMenu);

	sidebarMenu.$inject = [ '$rootScope' ];

	function sidebarMenu($rootScope) {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: '<div class="sidebar-menu" ng-transclude></div>',
			link: function(scope, element, attrs) {

				// listen for state changes, select the new state if the state changes
				$rootScope.$on('$stateChangeStart', handleStateChange);

				// listen for link clicks, only open the sub menu when the sidebar is not collapsed
				$(document).on('click', '.sidebar-menu li.has-sub-menu > a', function() {
					if(element.hasClass('collapsed'))
						return;

					openMenuItem($(this).closest('li'));
				});				
			}
		};

		function handleStateChange(event, toState, toParams, fromState, fromParams) {

			// find the menu item for the new state
			var activeMenuItem = $('a[ui-sref="' + toState.name + '"]').closest('li');

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
		}

		function openMenuItem($menuItem) {
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

	var directiveName = 'ftToggleSidebar';
	var collapseStorageKey = 'sidebar-collapsed';
	var collapseClassName = 'sidebar-collapsed';

	angular.module('ft').directive(directiveName, toggleSidebar);

	toggleSidebar.$inject = [ 'localStorageService' ];

	function toggleSidebar(storage) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var $body = $('body');

				element.click(function() {
					$body.toggleClass(collapseClassName);
					storage.set(collapseStorageKey, $body.hasClass(collapseClassName));
				});
			}
		};
	}
})();

//# sourceMappingURL=flat-theme.angular.js.map