angular.module('app')
.directive('boxPlotManChart', function($compile){
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope:{
            width: '=width',
            height: '=height',
            margin: '=margin',
            data: '=data'
            // title: '@title'
        },
        link: function(scope, element, attrs) {
            var chart = d3.custom.boxPlotMan();
            
            var chartEl = d3.select(element[0]);

            scope.$watch('data', function (newVal, oldVal) {
                chartEl.datum(newVal).call(chart);
                $compile(element.contents())(scope);
            });

            scope.$watch('height', function(d, i){
                if (scope.height == null) return;
                chartEl.call(chart.height(scope.height));
                $compile(element.contents())(scope); 
            })

            // scope.$watch('title', function(d,i){
            //     if (scope.title == null) return;
            //     chartEl.call(chart.title(scope.title));
            //     $compile(element.contents())(scope);
            // })
            
            scope.$watch('width', function(d, i){
                if (scope.width == null) return;
                chartEl.call(chart.width(scope.width));
                $compile(element.contents())(scope); 
            })
        }
    }
});