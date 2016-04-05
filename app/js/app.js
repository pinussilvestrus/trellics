angular.module("mainApp", [
  'ngRoute',
  'trelloService',
  'mainController',
  'cardDirective',
  'angular-timeline'
])
.run(function($rootScope) {
  $rootScope.isConnected = function() {
    return localStorage.getItem('trello_token');
  }
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
