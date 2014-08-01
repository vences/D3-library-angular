angular.module('app')
.controller('pieChartController', function ($scope, $location) {
  $scope.options = {
    width: 300, 
    height: 500,
    margin: {top: 30, right: 50, bottom: 30, left: 50}
  };
  $scope.data =  [{"label":"one", "value":20},
                  {"label":"two", "value":50},
                  {"label":"three", "value":30}];
  // $scope.hovered = function(d){
  //     $scope.barValue = d;
  //     $scope.$apply();
  // };
  // $scope.barValue = 'None';
});

