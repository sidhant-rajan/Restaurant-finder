angular.module('restFinderApp', ['ui.router', 'ngMaterial', 'ngMessages', 'restangular', 'jkAngularRatingStars'])

	.config(function ($stateProvider, $urlRouterProvider) {
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
	})
