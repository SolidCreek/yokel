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

  .controller('AppController', function($scope, $http, localStorageService, SearchBar){
    $scope.searchObj = {};
    var position = localStorageService.get('position');
    $scope.searchObj.lat = position[0];
    $scope.searchObj.lon = position[1];
    $scope.search = SearchBar.search;
  })

  .factory('SearchBar', function($http){
    var businessObj = {};
    var search = function(searchObj){
      return $http({
        method: 'GET',
        url: 'api/search/'+searchObj.lat+'/'+searchObj.lon +'/'+searchObj.query,
        data: searchObj
      }).success(function(businesses){
        businessObj.businesses = businesses;
        return businessObj.businesses;
      })
    }
    return {
      search: search
    }
  })

  //If is logged in - logout button else login button with modal