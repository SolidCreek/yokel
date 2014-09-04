'use strict';

angular.module('yokelApp')
  .controller('HomeController', function($scope, $http){
    
  })

  .factory('locate', function(){
    navigator.geolocation.watchPosition(function(position) {
      userPosition = [position.coords.latitude, position.coords.longitude];
    });
    return {
      locate: locate 
    }
  })

  .factory('pages', function(){
    var getBusinessPage = function(){};
  });
