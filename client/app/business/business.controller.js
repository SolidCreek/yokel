'use strict';

angular.module('yokelApp')

  .controller('BusinessController', function($scope, $http, $stateParams, BusinessPages){
    $scope.business = {};
    var businessId = $stateParams.placeId
    console.log($stateParams.placeId)
    $scope.getBusinessPage = BusinessPages.getBusinessPage;
    $scope.getBusinessPage(businessId)
      .then(function(business){
        $scope.business = business;
      })    
  })

  .controller('ReviewController', function($scope, $http){
    
  })

  //Sends of businessId to server to return specific business
  .factory('BusinessPages', function($http){
    var getBusinessPage = function(businessId){
      return $http({
        method: 'GET',
        url: 'api/businesses',
        data: businessId
      }).success(function(business){
        return business;
      })
    };
    return {
      getBusinessPage: getBusinessPage
    }
  });  
