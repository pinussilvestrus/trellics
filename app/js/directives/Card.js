angular.module("cardDirective", [])
    .directive('card', function cardFactory() {
      'use strict';

      return {
        restrict: 'E',
        templateUrl: '/app/js/directives/Card.html',
        scope: {
          model: '='
        },
        link: function(scope) {
          
        }
      };
    })
    .directive('list', function cardFactory() {
      'use strict';

      return {
        restrict: 'E',
        templateUrl: '/app/js/directives/List.html',
        scope: {
          model: '='
        },
        link: function(scope) {

        }
      };
    });
