'use strict';

angular.module('yokelApp')
  .controller('HomeController', function($scope, $http, loadSearch){
    $scope.map = {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 8
      };
      console.log($scope.map)
    $scope.data = {};
    $scope.searchNearby = loadSearch.searchNearby
    $scope.searchNearby()
      .then(function(businesses){
        $scope.data = businesses.data;
      })
  })

    .controller('mainCtrl', function($scope) {
        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        $scope.options = {scrollwheel: false};
    })

  //needs to locate and search on init
  .factory('locate', function(){
    var locateUser = function(){
      navigator.geolocation.watchPosition(function(position){
        var userPosition = [position.coords.latitude, position.coords.longitude];
        return userPosition;
      });
    }
    return {
      locateUser: locateUser
    }
  })

  //searches for businesses on load
  .factory('loadSearch', function($http, locate){
    var searchNearby = function(){
      var searchObj = {
        position: locate.locateUser()
      }
      return $http({
        method: 'GET',
        url: 'api/nearby',
        data: searchObj
      }).success(function(businesses){
        return businesses;
      })
    };
    return {
      searchNearby: searchNearby
    }
  });

  







