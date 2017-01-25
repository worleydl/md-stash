'use strict';

/**
 * @ngdoc function
 * @name mdPadApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the mdPadApp
 */
angular.module('mdPadApp')
  .controller('AuthCtrl', ['$scope', 'stash', function ($scope, stash) {
    $scope.statusMsg = 'Awaiting login...';

    $scope.submitAuth = function() {
      stash.auth({user: $scope.user, pass: $scope.pass})
        .then(function(data) {
          $scope.statusMsg = 'Successfully logged in';
        }, function() {
          $scope.statusMsg = 'Invalid Credentials'; 
        });
    };
  }]);
