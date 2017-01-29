'use strict';

/**
 * @ngdoc function
 * @name mdPadApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the mdPadApp
 */
angular.module('mdPadApp')
  .controller('RootCtrl', ['$scope', function ($scope) {
    $scope.pageTitle = '';

    $scope.status = {
      ready: false
    };

    function toTitle(str)
    {
      var cleaned = str.replace("-", " ");
      return cleaned.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    $scope.setPageTitle = function(title) {
      $scope.pageTitle = toTitle(title);
    };
  }]);
