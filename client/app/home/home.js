'use strict';

angular.module('yokelApp')
  .config(function($stateProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './app/home/home.html',
        controller: 'HomeController'
      });
  });