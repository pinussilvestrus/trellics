angular.module("mainController", ["trelloService"])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, Trello){

		var cache_width, board;
		var a4 = [ 595.28,  841.89];  // for a4 size paper width and height

		//create pdf
		var _createPDF = function(){
		 var canvas = _getCanvas();
		  var img = canvas.toDataURL("image/png"),
	  		doc = new jsPDF({
		          unit:'px',
		          format:'a4'
		        });
	        doc.addImage(img, 'JPEG', 20, 20);
	        doc.save('techumber-html-to-pdf.pdf');
	        board.width(cache_width);
		}

		// create canvas object
		var _getCanvas = function(){
		board = $('#board');
		cache_width = board.width;
		 board.width((a4[0]*1.33333) -80).css('max-width','none');
		 return html2canvas(board,{
		     imageTimeout:2000,
		     removeContainer:true
		    });
		}

		$scope.initialize = function() {
			$rootScope.loading = true;
			Trello.init();
		};

		$scope.getBoard = function(id) {
			Trello.getBoard(id);
		};

		$scope.downloadBoard = function() {
			var pdf = new jsPDF('p', 'pt', 'letter');
			 pdf.addHTML($('#board')[0], function () {
			     pdf.save('Test.pdf');
			 }, function(err) {
				 console.log(err);
			 });
		};
	});
