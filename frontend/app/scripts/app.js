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
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  });
