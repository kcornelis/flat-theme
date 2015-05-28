(function() {
	'use strict';

	var ftApp = angular.module('ftApp', ['ui.router', 'ft', 'LocalStorageModule']);
	ftApp.config(configureRouting);

	configureRouting.$inject = [ '$stateProvider', '$urlRouterProvider', '$locationProvider' ];

	function configureRouting($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('dashboard');

		var states = [ 'dashboard',

			'elements-buttons',
			'elements-dialogs',
			'elements-panels',
			'elements-tables',
			'elements-tools',
			'elements-typography',

			'forms-standard',
			'forms-wizard',

			'charts-flot',

			'pages-blank',
			'pages-login'
		];

		for(var i = 0; i < states.length; i++) {
			var state = states[i];

			$stateProvider.state(state, {
				url: '/' + state,
				templateUrl: 'views/' + state + '.html'
			});
		}
	}
})();
