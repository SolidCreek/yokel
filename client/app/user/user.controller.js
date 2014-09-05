'use strict';

angular.module('yokelApp')

  .controller('UserController', function($scope, $http, $stateParams, UserPages){
    $scope.user = {};
    var userId = $stateParams.userId
    $scope.getUserPage = UserPages.getUserPage;
    $scope.getUserPage(UserId)
      .then(function(user){
        $scope.user = user;
      })
  })


  //Sends of userId to server to return specific user
  .factory('UserPages', function($http){
    var getUserPage = function(userId){
      return $http({
        method: 'GET',
        url: 'api/users',
        data: userId
      }).success(function(user){
        return user;
      }) 
      return {
        getUserPage: getUserPage
      }      
    }
  });

