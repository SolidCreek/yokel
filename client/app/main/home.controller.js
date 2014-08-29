'use strict';

angular.module('yokelApp')

  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

  })

  .factory('locate', function(){
    navigator.geolocation.watchPosition(function(position) {
      userPosition = [position.coords.latitude, position.coords.longitude];
      // $http.get('/api/things').success(function(awesomeThings) {
      //   $scope.awesomeThings = awesomeThings;
      // });
    });
    return {
      locate: locate 
    }
  });
