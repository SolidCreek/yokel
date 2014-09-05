'use strict';

angular.module('yokelApp')
  .config(function($stateProvider){
    $stateProvider
      .state('user', {
        url: '/user/:userId',
        templateUrl: 'app/user/user.html',
        controller: 'UserController'
      });
  });