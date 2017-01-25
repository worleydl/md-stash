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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
