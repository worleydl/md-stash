'use strict';

/**
 * @ngdoc function
 * @name mdPadApp.controller:ACtrl
 * @description
 * # ACtrl
 * Controller of the mdPadApp
 */
angular.module('mdPadApp')
  .controller('ACtrl', ['$scope', '$routeParams', 'stash', function ($scope, $routeParams, stash) {
    $scope.status.ready = false;
    $scope.markdown = '';

    stash.get({article: $routeParams.article}).then(function(response) {
      if(response.content) {
        $scope.markdown = response.content;
        $scope.setPageTitle($routeParams.article);
      } else {
        $scope.markdown = 'That article hasn\'t been written yet!';
        $scope.setPageTitle('Oops - Article Not Found');
      }

      $scope.status.ready = true;
    });

  }]);
