angular.module('restFinderApp')

	.factory('GeoLocator', ['$q', '$rootScope', function ($q, $rootScope) {
		var locate = function () {
		  var deferred = $q.defer()
	    // HTML5 Geolocation API
	    navigator.geolocation.getCurrentPosition(success, error)
			// success callback
	    function success(position) {
				$rootScope.$apply(function () {deferred.resolve(position.coords)})
			}
	    // error callback
			function error(error) {
				$rootScope.$apply(function () {deferred.reject(error)})
			}
	    // We use promise as HTML5 Geolocation API is an asynchronous process
			return deferred.promise
		}
		return {locate : locate}
	}])