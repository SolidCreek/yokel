'use strict';

angular.module('yokelApp')
  .controller('HomeController', function($scope, $http){
    var data = $scope.data = {};
    data.results = [
      {name:'McDonalds',distance: Math.floor(Math.random()*20)},
      {name:'Carls JR',distance: Math.floor(Math.random()*20)},
      {name:'Subway',distance: Math.floor(Math.random()*20)},
      {name:'Chipotle',distance: Math.floor(Math.random()*20)},
      {name:'That mexican place behind HR',distance: Math.floor(Math.random()*20)},
      {name:'Panda Ex',distance: Math.floor(Math.random()*20)},
      {name:'Soup place',distance: Math.floor(Math.random()*20)},
      {name:'HR Kitchen',distance: Math.floor(Math.random()*20)},
    ];
  })

  .factory('locate', function(){
    navigator.geolocation.watchPosition(function(position){
      userPosition = [position.coords.latitude, position.coords.longitude];
    });
    return {
      locate: locate 
    }
  })

  .factory('pages', function(){
    var getBusinessPage = function(){};
  });
