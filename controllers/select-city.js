angular.module('restFinderApp')

	.controller('selectCityCtrl', ['$scope', function ($scope) {
		$scope.citiesList = ["Bangalore", "Coming soon"]
	}])