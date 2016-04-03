angular.module("trelloService",[])

	.factory("Trello", function($http, $q, $rootScope){
		var trello = {};

		var delivreshBoardID = "YSnSFJgq";
		var trelloKey = "1602b56189690449876e15570cb2a95f";
		var apiUrl = "https://api.trello.com/1/";

		var authenticationSuccess = function() {
			console.log("success");
			trello.getBoard();
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

		trello.getBoard = function() {
			var getSuccess = function(data) {
				console.log(data);
				$rootScope.$apply(function() {
					$rootScope.data = data;
				});
			};

			Trello.get("/boards/" + delivreshBoardID, getSuccess);
		};

		return trello;
	});
