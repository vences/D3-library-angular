angular.module('app')
.controller('lineChartController', function ($scope, $location) {
  $scope.options = {
    width: 500, 
    height: undefined,
    margin: {top: 30, right: 50, bottom: 700, left: 50}
  };
  $scope.data = [1, 4, 1, 0];
  $scope.hovered = function(d){
      $scope.barValue = d;
      $scope.$apply();
  };
  $scope.barValue = 'None';
});
