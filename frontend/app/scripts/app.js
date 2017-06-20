'use strict';

/**
 * @ngdoc overview
 * @name mdPadApp
 * @description
 * # mdPadApp
 *
 * Main module of the application.
 */
angular
  .module('mdPadApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.markdown'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/init', {
        templateUrl: 'views/init.html',
        controller: 'InitCtrl'
      })
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .when('/publish/:article', {
        templateUrl: 'views/publish.html',
        controller: 'PublishCtrl'
      })
      .when('/a/:article', {
        templateUrl: 'views/a.html',
        controller: 'ACtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
