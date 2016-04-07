angular.module("trelloService",[])

	.factory("Trello", function($http, $q, $rootScope){
		var trello = {};

		var delivreshBoardID = "YSnSFJgq";
		var trelloKey = "1602b56189690449876e15570cb2a95f";
		var apiUrl = "https://api.trello.com/1/";

		var authenticationSuccess = function() {
			trello.getUserData();
			trello.initializeBoards();
		};

		var authenticationFailure = function() {
			console.log("failure");
		};

		trello.init = function() {
			Trello.authorize({
			  type: 'popup',
			  name: 'Getting Started Application',
			  scope: {
			    read: true,
			    write: true },
			  expiration: 'never',
			  success: authenticationSuccess,
			  error: authenticationFailure
			});
		};

		trello.getUserData = function() {
			var getSuccess = function(data) {
				$rootScope.userData = data;
			};

			Trello.get("/members/me", getSuccess);
		};

		trello.initializeBoards = function() {
			var getSuccess = function(data) {
				$rootScope.$apply(function() {
					$rootScope.boards = [];
					$rootScope.loading = false;
					$rootScope.boards = data;
				});
			};
			Trello.get("/members/me/boards", getSuccess);
		};

		trello.getBoard = function(id) {
			trello.init();
			var getSuccess = function(data) {
				$rootScope.$apply(function() {
					$rootScope.data = data;
					$rootScope.loading = false;
					$rootScope.initializeTimeline();
				});
			};

			Trello.get("/boards/" + id + "/lists?cards=open&card_fields=all&fields=name", getSuccess);
		};

		return trello;
	});
