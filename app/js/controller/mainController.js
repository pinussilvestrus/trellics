angular.module("mainController", ["trelloService"])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, Trello){
		$scope.initialize = function() {
			Trello.init();
		};
	});
