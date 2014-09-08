'use strict';

angular.module('yokelApp')
  .config(function($stateProvider){
    $stateProvider
      .state('business', {
        url: '/business/:place_id',
        templateUrl: 'app/business/business.html',
        controller: 'BusinessController'
      });
  });