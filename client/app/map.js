angular.module('app.map', ['google-maps', 'yokelApp'])
  .controller('mapController', function($scope) {
      $scope.map = {center: {latitude: locate()[0], longitude: locate()[1]}, zoom: 13 };
  });
