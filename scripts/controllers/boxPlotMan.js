angular.module('app')
.controller('boxPlotManController', function ($scope, $location) {
  $scope.options = {
    width: 200, 
    height: 500,
    margin: {top: 30, right: 50, bottom: 700, left: 50}
  };
  $scope.data = {
                min: 750,
                max: 1250,
                Q1: 950,
                Q3: 980,
                median: 970
            }
  // $scope.hovered = function(d){
  //     $scope.barValue = d;
  //     $scope.$apply();
  // };
  // $scope.barValue = 'None';
});

