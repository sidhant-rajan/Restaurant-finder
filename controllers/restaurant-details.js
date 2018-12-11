angular.module('restFinderApp')

	.controller('restaurantDetailsCtrl', ['$scope', 'localStorageService', '$stateParams', 'Restangular', function ($scope, localStorageService, $stateParams, Restangular) {
		$scope.promises = []
		$scope.favourites = []
		$scope.getRestaurant = function () {
			Restangular.oneUrl('restaurantDesc', 'https://developers.zomato.com/api/v2.1/restaurant')
			.get({res_id: $stateParams.resId}, {'user-key': '9e987c003e2c59e7aa0e264fd5e1a7d5'})
			.then (function (resp) {
				$scope.rest = resp
				Restangular.oneUrl('restaurantReviews', 'https://developers.zomato.com/api/v2.1/reviews')
				.get({res_id: $stateParams.resId}, {'user-key': '9e987c003e2c59e7aa0e264fd5e1a7d5'})
				.then(function (resp) {
					$scope.restReview = resp
				})
			})
		}

		$scope.isFavouriteRestaurant = function () {
			$scope.favourites = localStorageService.get('favourites')
			//console.log($scope.favourites)
			return $scope.favourites.some(function (fav) {
				// console.log(fav + '' + $stateParams.resId)
				return fav == $stateParams.resId
			})
		}


		$scope.promises.push($scope.getRestaurant())
	}])