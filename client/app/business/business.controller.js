'use strict';

angular.module('yokelApp')

  .controller('BusinessController', function($scope, $http, $stateParams, BusinessPages, ReviewResults){
    var businessId = $stateParams.place_id;
    $scope.business = {};
    $scope.getBusinessPage = BusinessPages.getBusinessPage;
    $scope.getBusinessPage(businessId)
      .then(function(business){
        console.log(business.data[0])
        $scope.business = business.data[0];
      });
    $scope.reviewObj = {};
    $scope.reviewObj.place_id = businessId;
    $scope.submitReview = ReviewResults.submitReview;
  })

  .factory('ReviewResults', function($http){
    var submitReview = function(reviewObj){
      console.log(reviewObj)
      return $http({
        method: 'POST',
        url: 'api/reviews/',
        data: reviewObj
      }).success(function(reviews){
        return reviews;
      })
    };
    return {
      submitReview: submitReview
    };   
  })

  //Sends of businessId to server to return specific business
  .factory('BusinessPages', function($http){
    var getBusinessPage = function(businessId){
      return $http({
        method: 'GET',
        url: 'api/businesses/'+businessId,
      }).success(function(business){
        return business;
      })
    };
    return {
      getBusinessPage: getBusinessPage
    };
  });  
