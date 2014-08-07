angular.module('app')
.controller('plotChartController', function ($scope, $location) {
  $scope.options = {
    width: 500, 
    height: 500
  };
  $scope.data = [1, 2, 3, 4];
  $scope.hovered = function(d){
      $scope.barValue = d;
      $scope.$apply();
  };
  $scope.barValue = 'None';
});
