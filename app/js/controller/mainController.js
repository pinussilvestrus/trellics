angular.module("mainController", ["trelloService"])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, Trello){
		$scope.initialize = function() {
			$rootScope.loading = true;
			Trello.init();
		};

		$scope.getBoard = function(id) {
			Trello.getBoard(id);
		};

		$scope.downloadBoard = function() {
			var elHtml = document.getElementById('board').innerHTML;
	    var link = document.createElement('a');
	    mimeType = 'text/plain';

	    link.setAttribute('download', 'board.html');
	    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
	    link.click();
		};
	});
