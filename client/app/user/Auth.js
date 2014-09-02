angular.module('yokelApp')

.controller('AuthController', function($scope, Auth, $window, $location){
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem("TOKEN NAME", token);
        $location.path('/users');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem("TOKEN NAME", token);
        $location.path('/users');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
})

.factory('Auth', function($http, $location, $window){
  var signin = function(user){
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    }).then(function (resp) {
      return resp.data.token;
    })
  }

  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    }).then(function (resp) {
      return resp.data.token;
    })
  }

  var signout = function(user){
    $window.localStorage.removeItem("TOKEN");
    $location.path('/');
  }

  return {
    signin: signin,
    signup: signup,
    logout: logout
  }
});