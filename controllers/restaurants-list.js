angular.module('restFinderApp')

	.controller('restaurantListCtrl', ['$scope', '$rootScope', 'GeoLocator', 'Restangular', 'localStorageService', function ($scope, $rootScope, GeoLocator, Restangular, localStorageService) {
		$scope.promises = []
		$scope.loading  = true;
		$scope.nearby_restaurants = []
		$scope.favourites = []

		$scope.getLocation = function () {
			GeoLocator.locate()
	    .then(function (position) {
				$scope.longitude = position.longitude
				$scope.latitude = position.latitude
				$scope.more()
			})
		}

		$scope.more = function () {
			Restangular.oneUrl('restaurantList', 'https://developers.zomato.com/api/v2.1/geocode')
			.get({lat: $scope.latitude, lon: $scope.longitude}, {'user-key': '9e987c003e2c59e7aa0e264fd5e1a7d5'})
			.then (function (resp) {
				$scope.localLocation = resp.location.title
				for(rest in resp.nearby_restaurants) {
					$scope.nearby_restaurants.push(resp.nearby_restaurants[rest])
				}
				$scope.loading = false
			})
		}

		// Run an action on clicking favourite button
		$scope.actionOnFavourites = function (id, context) {
			if(context === 'add') {
				$scope.favourites.push(id)
				localStorageService.set('favourites', $scope.favourites)
			}
			else {
				$scope.favourites.pop(id)
				localStorageService.set('favourites', $scope.favourites)
			}
		}

		// Checks if id is in favourites list
		$scope.inFavourites = function (id) {
			if(_.isEmpty($scope.favourites))
				return false
			else {
				return $scope.favourites.some(function (favourite) {
					return favourite == id
				})
			}
		}

		// fetches list of favourites from LocalStorage
		$scope.getFavourites = function () {
			if(localStorageService.get('favourites') != null) {
				$scope.favourites = localStorageService.get('favourites')
			} else {
				$scope.favourites = []
			}
		}

		$scope.promises.push($scope.getLocation())
		$scope.promises.push($scope.getFavourites())
	}])