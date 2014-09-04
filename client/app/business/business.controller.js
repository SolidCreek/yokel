'use strict';

angular.module('yokelApp')
  .controller('BusinessController', function($scope, $http){

  })

  .controller('MapController', function($scope, $http){

  })
  .controller('ReviewController', function($scope, $http){
    
  })

  .factory('BusinessPages', function(){
    var getBusinessPage = function(business){
      return $http{(
        method: 'GET',
        url: '/api/business/',
        data: business        
      )}      
    };
  });  
