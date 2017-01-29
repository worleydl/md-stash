'use strict';

/**
 * @ngdoc service
 * @name mdPadApp.stash
 * @description
 * # stash
 * Factory in the mdPadApp.
 */
angular.module('mdPadApp')
  .factory('stash', ['$q', '$http', '$cookieStore', function ($q, $http, $cookieStore) {
    var factory = {};

    var API_ENDPOINT = 'http://stash.dlworley.com/';

    var API_AUTH = 'token';
    var API_GET  = 'get';
    var API_INIT = 'init';
    var API_PUBLISH = 'put';

    factory.auth = function(params) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        data: {u: params.user, p: params.pass},
        url: API_ENDPOINT + API_AUTH
      }).then(function(response) {
        console.log(response);
        if(response.data.token) {
          console.log('Token retrieved successfully');
          $cookieStore.put('token', response.data.token);
          deferred.resolve();
        } else {
          deferred.reject();
        }
      }, function() {
        console.log('API ERROR'); 
        deferred.reject();
      });
      
      return deferred.promise; 
    };

    factory.get = function(params) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        data: {key: params.article},
        url: API_ENDPOINT + API_GET
      }).then(function(response) {
        if(response.data.content) {
          deferred.resolve(response.data);
        } else {
          deferred.resolve({});
        }
      }, function() {
        console.log('API ERROR'); 
        deferred.reject();
      });

      return deferred.promise;
    };

    factory.init = function(params) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        data: {u: params.user, p: params.pass},
        url: API_ENDPOINT + API_INIT
      }).then(function(response) {
        console.log(response.data);
        deferred.resolve(response);
      }, function() {
        console.log('API ERROR'); 
        deferred.reject();
      });;
      
      return deferred.promise; 
    };

    factory.publish = function(params) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        data: {token: $cookieStore.get('token'), key: params.article, content: params.content},
        url: API_ENDPOINT + API_PUBLISH
      }).then(function(response) {
        console.log(response.data);
        deferred.resolve(response);
      }, function() {
        console.log('API ERROR'); 
        deferred.reject();
      });;

      
      return deferred.promise;
    };

    return factory;
  }]);
