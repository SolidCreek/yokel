angular.module('yokelApp')

  //Routing for signin and signup
  .config(function($stateProvider){
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/user/signin.html',
        controller: 'AuthController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/user/signup.html',
        controller: 'AuthController'        
      })
  });

.controller('AuthController', function($scope, Auth, $window, $location){
  $scope.user = {};


  //Sets token in user's local storage
  var setToken = function(token){
    $window.localStorage.setItem("TOKEN NAME", token);
    $location.path('/users');
  };

  //Returns the token property on response object served up by server
  var returnResponseToken = function(response){
    return response.data.token;
  };

  //Signs user in and sets token
  $scope.signin = function(){
    Auth.signin($scope.user)
      .then(setToken(token))
      .catch(function(error){
        console.error(error);
      });
  };

  //Signs user up and sets token
  $scope.signup = function(){
    Auth.signup($scope.user)
      .then(setToken(token))
      .catch(function(error){
        console.error(error);
      });
  };
})

.factory('Auth', function($http, $location, $window){

  //Signs user in and returns token
  var signin = function(user){
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
      .then(returnResponseToken(response));
  };

  //Signs user up and returns token
  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
      .then(returnResponseToken(response));  
  };

  //Removes token from local storage and redirects user to home page
  var signout = function(user){
    $window.localStorage.removeItem("TOKEN");
    $location.path('/');
  };

  return {
    signin: signin,
    signup: signup,
    logout: logout
  };
});