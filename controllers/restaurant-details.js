angular.module('restFinderApp')

	.controller('restaurantDetailsCtrl', ['$scope', '$stateParams', 'Restangular', function ($scope, $stateParams, Restangular) {
		$scope.promises = []

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

		$scope.promises.push($scope.getRestaurant())
	}])