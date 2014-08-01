angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/index'
  })
  .when('/index', {
    templateUrl: 'views/index.html'
  })
  .when('/plot', {
    templateUrl: 'views/dataviz/plot.html'
  })
  .when('/bar', {
    templateUrl: 'views/dataviz/bar.html'
  })
  .when('/boxplot', {
    templateUrl: 'views/dataviz/boxPlot.html'
  })
  .when('/boxplotMan', {
    templateUrl: 'views/dataviz/boxPlotMan.html'
  })
  .when('/pie', {
    templateUrl: 'views/dataviz/pieChart.html'
  })
  .when('/line', {
    templateUrl: 'views/dataviz/lineChart.html'
  })
  .otherwise({
    templateUrl: 'views/404.html'
  });
})
