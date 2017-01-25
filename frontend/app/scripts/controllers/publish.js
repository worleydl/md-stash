'use strict';

/**
 * @ngdoc function
 * @name mdPadApp.controller:PublishCtrl
 * @description
 * # PublishCtrl
 * Controller of the mdPadApp
 */
angular.module('mdPadApp')
  .controller('PublishCtrl', ['$scope', '$routeParams', 'stash', function ($scope, $routeParams, stash) {
    var article = $routeParams.article;

    $scope.content = '';
    $scope.statusMsg = 'Initializing';

    // Attempt to grab existing article
    stash.get({article: article}).then(function(data) {
      if(data.content) {
        $scope.content = data.content;
        $scope.statusMsg = 'Editing existing article';
      } else {
        $scope.statusMsg = 'Editing a new article';
      }

    }, function() {
      $scope.statusMsg = 'Something went wrong...';
    });

    $scope.publish = function() {
      stash.publish({article: article, content: $scope.content}).then(function() {
        $scope.statusMsg = 'Article published.';
      });
    };

  }]);
