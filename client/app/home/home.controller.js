'use strict';

angular.module('yokelApp')

  .controller('HomeController', function($scope, $http, loadSearch){  
    $scope.data = {};
    $scope.markers = [];
    $scope.searchNearby = loadSearch.searchNearby;
    navigator.geolocation.watchPosition(function(position){
      $scope.searchNearby([position.coords.latitude, position.coords.longitude])
       .then(function(businesses){
          $scope.data = businesses.data;
          $scope.markers = businesses.data;
          console.log($scope.markers)
        });
    })
    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.map = {center: {latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 14 };
    })
    $scope.options = {scrollwheel: false};
  })


  .factory('loadSearch', function($http){
    var businessObj = {};
    var searchNearby = function(searchObj){
      return $http({
        method: 'GET',
        url: 'api/nearby/'+searchObj[0]+'/'+searchObj[1],
        data: searchObj
      }).success(function(businesses){
        businessObj.businesses = businesses
        return businessObj.businesses;
      })
    };
    return {
      searchNearby: searchNearby,
      businessObj: businessObj
    };
  });

  







