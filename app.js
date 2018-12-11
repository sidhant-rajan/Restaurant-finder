angular.module('restFinderApp', ['ui.router', 'ngMaterial', 'ngMessages', 'restangular', 'jkAngularRatingStars', 'LocalStorageModule'])

	.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
		$urlRouterProvider.otherwise('/home')

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'templates/select-city.html',
				controller: 'selectCityCtrl'
			})
			
			.state('all-restaurants', {
				url: '/restaurants',
				templateUrl: 'templates/restaurants-list.html',
				controller: 'restaurantListCtrl'
			})

			.state('restaurant-details', {
				url: '/restaurant/:resId',
				templateUrl: 'templates/restaurant-details.html',
				controller: 'restaurantDetailsCtrl'
			})		

		localStorageServiceProvider
    .setPrefix('restFinderApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true)
	})

