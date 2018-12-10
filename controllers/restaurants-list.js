angular.module('restFinderApp')

	.controller('restaurantListCtrl', ['$scope', 'GeoLocator', 'Restangular', function ($scope, GeoLocator, Restangular) {
		$scope.promises = []
		$scope.loading  = true;
		$scope.nearby_restaurants = []
		$scope.getLocation = function () {
			console.log('1')
			GeoLocator.locate()
	    .then(function (position) {
	    	console.log(position)
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
				// $scope.nearbyRestaurants = resp.nearby_restaurants
				console.log(resp.nearby_restaurants)
				for(rest in resp.nearby_restaurants) {
					$scope.nearby_restaurants.push(resp.nearby_restaurants[rest])
				}
				$scope.loading = false
			})
		}
		$scope.promises.push($scope.getLocation())
	}])