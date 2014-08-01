angular.module('app')
.controller('boxPlotController', function ($scope, $location) {
  $scope.options = {
    width: 300, 
    height: 500,
    margin: {top: 30, right: 50, bottom: 700, left: 50}
  };
  $scope.data = [
    {
      "Expt": 1,
      "Run": 1,
      "Speed": 850
    }, {
      "Expt": 1,
      "Run": 2,
      "Speed": 740
    }, {
      "Expt": 1,
      "Run": 3,
      "Speed": 900
    }, {
      "Expt": 1,
      "Run": 4,
      "Speed": 1070
    }, {
      "Expt": 1,
      "Run": 5,
      "Speed": 930
    }, {
      "Expt": 1,
      "Run": 6,
      "Speed": 850
    }, {
      "Expt": 1,
      "Run": 7,
      "Speed": 950
    }, {
      "Expt": 1,
      "Run": 8,
      "Speed": 980
    }, {
      "Expt": 1,
      "Run": 9,
      "Speed": 880
    }, {
      "Expt": 1,
      "Run": 10,
      "Speed": 1000
    }, {
      "Expt": 1,
      "Run": 11,
      "Speed": 980
    }, {
      "Expt": 1,
      "Run": 12,
      "Speed": 980
    }, {
      "Expt": 1,
      "Run": 13,
      "Speed": 930
    }, {
      "Expt": 1,
      "Run": 14,
      "Speed": 650
    }, {
      "Expt": 1,
      "Run": 15,
      "Speed": 760
    }, {
      "Expt": 1,
      "Run": 16,
      "Speed": 810
    }, {
      "Expt": 1,
      "Run": 17,
      "Speed": 1000
    }, {
      "Expt": 1,
      "Run": 18,
      "Speed": 960
    }, {
      "Expt": 1,
      "Run": 19,
      "Speed": 850
    }, {
      "Expt": 1,
      "Run": 20,
      "Speed": 1250
    }, {
      "Expt": 2,
      "Run": 1,
      "Speed": 850
    }, {
      "Expt": 2,
      "Run": 2,
      "Speed": 740
    }, {
      "Expt": 2,
      "Run": 3,
      "Speed": 900
    }, {
      "Expt": 2,
      "Run": 4,
      "Speed": 1070
    }, {
      "Expt": 2,
      "Run": 5,
      "Speed": 930
    }
  ];
  // $scope.hovered = function(d){
  //     $scope.barValue = d;
  //     $scope.$apply();
  // };
  // $scope.barValue = 'None';
});

