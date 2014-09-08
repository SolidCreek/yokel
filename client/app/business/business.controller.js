'use strict';

angular.module('yokelApp')

  .controller('BusinessController', function($scope, $http, $stateParams, BusinessPages, ReviewResults){
    //BusinessId sent to server is being pulled from the URL paramaters ($stateParams.place_id)
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

    $scope.data = {};
    $scope.markers = [];
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.map = new google.maps.Map(document.getElementById('map'), {center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), zoom: 14 });
    })
  })

  .factory('ReviewResults', function($http){
    //submits a review to the database - review object has both input fields as well as the businessId
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

  //Sends off businessId to server to return specific business
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
