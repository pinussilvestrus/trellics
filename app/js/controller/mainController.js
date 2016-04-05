angular.module("mainController", ["trelloService"])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, Trello){

		 $scope.events = [{
			 badgeClass: 'info',
			 badgeIconClass: 'glyphicon-check',
			 title: 'First heading',
			 content: 'Some awesome content.'
		 }, {
			 badgeClass: 'warning',
			 badgeIconClass: 'glyphicon-credit-card',
			 title: 'Second heading',
			 content: 'More awesome content.'
		 }];

		$scope.initialize = function() {
			$rootScope.loading = true;
			Trello.init();
		};

		$scope.getBoard = function(id) {
			Trello.getBoard(id);
		};
	});
