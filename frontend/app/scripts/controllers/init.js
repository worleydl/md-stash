'use strict';

/**
 * @ngdoc function
 * @name mdPadApp.controller:InitCtrl
 * @description
 * # InitCtrl
 * Controller of the mdPadApp
 */
angular.module('mdPadApp')
  .controller('InitCtrl', ['$scope', 'stash', function ($scope, stash) {
    $scope.submitAuth = function() {
      stash.init({user: $scope.user, pass: $scope.pass})
        .then(function() {
          console.log('woop');
        });
    };
  }]);
