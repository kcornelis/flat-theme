var ftApp = angular.module('ftApp', ['ui.router']);

ftApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('dashboard');

	$stateProvider.state('dashboard', {
		url: '/dashboard',
		templateUrl: 'views/dashboard.html'
	})
	.state('elements-buttons', {
		url: '/elements-buttons',
		templateUrl: 'views/elements-buttons.html'
	});
});
