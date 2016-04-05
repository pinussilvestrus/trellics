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

		 /**
 		 }
 		 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 		 * @type {Date}
 		 */
 	 	var _createTimeStamp = function (dateString) {

 			var date = new Date(dateString);

 			var options = {
 				weekday: "long", year: "numeric", month: "short",
 				day: "numeric", hour: "2-digit", minute: "2-digit"
 			};

 			return date.toLocaleDateString("de-de", options);
 		};

		$scope.initialize = function() {
			$rootScope.loading = true;
			Trello.init();
		};

		$scope.getBoard = function(id) {
			Trello.getBoard(id);
		};


		$scope.initializeTimeline = function() {
			$scope.events = [];
			for (var i = 0; i < $rootScope.data.length; i++) {
				var list = $rootScope.data[i];
				for (var j = 0; j < list.cards.length; j++) {
					var card = list.cards[j];
					var side = 'right';
					
					if ((j + i) % 2 == 0) {
						side = 'left';
					}

					$scope.events.push({
						badgeClass: 'info',
						badgeIconClass: 'glyphicon-check',
						title: card.name,
						date: card.dateLastActivity,
						content: _createTimeStamp(card.dateLastActivity)
					});
				}
			}

			$scope.events.sort(function(e1, e2) {
				return new Date(e1.date) - new Date(e2.date);
			});

		};
	});
