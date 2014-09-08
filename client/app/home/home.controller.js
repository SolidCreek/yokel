'use strict';

angular.module('yokelApp')

  .controller('HomeController', function($scope, $http, loadSearch){  
    $scope.data = {};
    $scope.markers = [];
    $scope.searchNearby = loadSearch.searchNearby;
    $scope.options = {scrollwheel: false};
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.map = new google.maps.Map(document.getElementById('map'), {center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), zoom: 14 });
    })
    navigator.geolocation.watchPosition(function(position){
      $scope.searchNearby([position.coords.latitude, position.coords.longitude])
       .then(function(businesses){
          $scope.data = businesses.data;
          businesses.data.forEach(function(business){
            var marker = new google.maps.Marker({
              map: $scope.map,
              position: new google.maps.LatLng(business.geometry.location.lat, business.geometry.location.lng)
            })
            $scope.markers.push(marker);
          });
          console.log($scope.markers)
        });
    })
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

  







