angular.module("mainController", ["trelloService"])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, Trello){

		$rootScope.events = [];

		$scope.initialize = function() {
			$rootScope.loading = true;
			Trello.init();
		};

		$scope.getBoard = function(id) {
			Trello.getBoard(id);
		};

		$scope.logout = function() {
			localStorage.removeItem("trello_token");
			$rootScope.data = [];
			$rootScope.boards = [];
			$rooScope.events = [];
		};

		$scope.initializeTimeline = function() {
			$rootScope.initializeTimeline();
		};
	});
