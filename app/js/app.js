angular.module("mainApp", [
  'ngRoute',
  'trelloService',
  'mainController',
  'cardDirective',
  'angular-timeline'
])
.run(function($rootScope) {
  $rootScope.data = [];

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

  $rootScope.isConnected = function() {
    return localStorage.getItem('trello_token');
  };

  $rootScope.initializeTimeline = function() {
    $rootScope.events = [];
    for (var i = 0; i < $rootScope.data.length; i++) {
      var list = $rootScope.data[i];
      for (var j = 0; j < list.cards.length; j++) {
        var card = list.cards[j];
        var side = 'right';

        if ((j + i) % 2 == 0) {
          side = 'left';
        }

        $rootScope.events.push({
          badgeClass: 'info',
          badgeIconClass: 'glyphicon-check',
          title: card.name,
          date: card.dateLastActivity,
          content: _createTimeStamp(card.dateLastActivity)
        });
      }
    }

    $rootScope.events.sort(function(e1, e2) {
      return new Date(e1.date) - new Date(e2.date);
    });
  };
})

$("#btnSave").click(function() {
       html2canvas($("#board"), {
           onrendered: function(canvas) {
               theCanvas = canvas;
               document.body.appendChild(canvas);

               // Convert and download as image
               Canvas2Image.saveAsPNG(canvas);
               $("#img-out").append(canvas);
               // Clean up
               //document.body.removeChild(canvas);
           }
       });
   });
