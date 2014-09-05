'use strict';

angular.module('yokelApp')
  .config(function($stateProvider){
    $stateProvider
      .state('business', {
        url: '/business/:placeId',
        templateUrl: 'app/business/business.html',
        controller: 'BusinessController'
      });
  });