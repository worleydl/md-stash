'use strict';

/**
 * @ngdoc function
 * @name mdPadApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the mdPadApp
 */
angular.module('mdPadApp')
  .controller('RootCtrl', function ($scope) {
    $scope.status = {
      ready: false
    };
  });
