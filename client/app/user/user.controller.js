'use strict';

angular.module('yokelApp')

  .controller('UserController', function($scope, $http){
    $scope.user = {};
  })

  .factory('UserPages', function(){
    var getUserPage = function(user){
      return $http{(
        method: 'GET',
        url: '/api/users/',
        data: user        
      )}
    };
  });
