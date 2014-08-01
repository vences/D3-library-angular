angular.module('app')
.controller('dataVizController', function ($scope, $location) {
  $scope.options = {
    width: 500, 
    height: undefined
  };
  $scope.data = [1, 2, 3, 4];
  $scope.hovered = function(d){
      $scope.barValue = d;
      $scope.$apply();
  };
  $scope.barValue = 'None';
});
