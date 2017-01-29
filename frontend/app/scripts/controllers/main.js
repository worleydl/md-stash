'use strict';

/**
 * @ngdoc function
 * @name mdPadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mdPadApp
 */
angular.module('mdPadApp')
  .controller('MainCtrl', ['$scope', 'stash', function ($scope, stash) {
    $scope.status.ready = false;
    $scope.markdown = '';

    stash.get({article: 'home'}).then(function(response) {
      if(response.content) {
        $scope.markdown = response.content;
      } else {
        $scope.markdown = 'The author has not created a homepage yet.';
      }

      $scope.setPageTitle('Daniel Worley\'s Blog');
      $scope.status.ready = true;
    });
  }]);
