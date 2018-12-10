var app = angular.module('restFinderApp', ['ui.router', 'ngMaterial', 'ngMessages'])

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home')

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/select-city.html'
		})
})