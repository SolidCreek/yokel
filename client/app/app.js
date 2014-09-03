'use strict';

angular.module('yokelApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
  //'google-maps'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });