'use strict';

angular.module('yokelApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'google-maps',
  'LocalStorageModule'
])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
  })

  .controller('AppController', function($http, localStorageService, SearchBar){
    var searchObj = {};
    var position = localStorageService.get('position');
    searchObj.lat = position[0];
    searchObj.lon = position[1];
    $scope.search = SearchBar.search;
  })

  .factory('SearchBar', function($http){
    var search = function(searchObj){
      return $http({
        method: 'GET',
        url: 'api/nearby/'+searchObj.lat+'/'+searchObj.lon +'/'+searchObj.query,
        data: searchObj
      }).success(function(businesses){
        businessObj.businesses = businesses
        return businessObj.businesses;
      })
    }
    return {
      search: search
    }
  })

  //If is logged in - logout button else login button with modal