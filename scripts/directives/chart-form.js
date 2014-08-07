angular.module('app')
.directive('chartForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/chart-form.html',
        scope: true,
        controller: function AppCtrl ($scope) {
            $scope.update = function(d, i){ $scope.data = randomData(); };
            function randomData(){
                return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
            }
        }
    }
});