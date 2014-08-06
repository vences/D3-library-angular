angular.module('app')
.directive('boxPlotChart', function($compile){
    var chart = d3.custom.boxPlotMan();
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope:{
            width: '=width',
            height: '=height',
            margin: '=margin',
            boxdata: '=data'
            // title: '@title'
        },
        link: function(scope, element, attrs) {
            var chart = d3.custom.boxPlot()
                        .whiskers(iqr(1.5))
                        // .quartiles([850,930,980])
                        .width(scope.width)
                        .height(scope.height);  
            var min = Infinity,
                max = -Infinity; 

            var data = [];

            scope.boxdata.forEach(function(x) {
                var e = Math.floor(x.Expt - 1),
                    r = Math.floor(x.Run - 1),
                    s = Math.floor(x.Speed),
                    d = data[e];
                if (!d) d = data[e] = [s];
                else d.push(s);
                if (s > max) max = s;
                if (s < min) min = s;
            });

            chart.domain([min, max]);
            // chart.domain([740, 1070]);

            // var svg = d3.select("body").selectAll("svg")
            //   .data(data)
            // .enter().append("svg")
            //   .attr("class", "box")
            //   .attr("width", scope.width + scope.margin.left + scope.margin.right)
            //   .attr("height", scope.height + scope.margin.bottom + scope.margin.top)
            // .append("g")
            //   .attr("transform", "translate(" + scope.margin.left + "," + scope.margin.top + ")")
            //   .call(chart);

            var svg = d3.select("body").append("svg")
                .attr("width", scope.width + scope.margin.left + scope.margin.right)
                .attr("height", scope.height + scope.margin.top + scope.margin.bottom)
                .attr("class", "box")    
                .append("g")
                .attr("transform", "translate(" + scope.margin.left + "," + scope.margin.top + ")");

            // setInterval(function() {
            //     svg.datum(randomize).call(chart.duration(1000));
            // }, 2000);

            // function randomize(d) {
            //   if (!d.randomizer) d.randomizer = randomizer(d);
            //   return d.map(d.randomizer);
            // }

            // function randomizer(d) {
            //   var k = d3.max(d) * .02;
            //   return function(d) {
            //     return Math.max(min, Math.min(max, d + k * (Math.random() - .5)));
            //   };
            // }

            // Returns a function to compute the interquartile range.
            function iqr(k) {
              return function(d, i) {
                var q1 = d.quartiles[0],
                    q3 = d.quartiles[2],
                    iqr = (q3 - q1) * k,
                    i = -1,
                    j = d.length;
                while (d[++i] < q1 - iqr);
                while (d[--j] > q3 + iqr);
                return [i, j];
              };
            }


            // Add
            
            // the x-axis
            var x = d3.scale.ordinal()     
                .domain( data.map(function(d,i) { return i } ) )       
                .rangeRoundBands([0 , scope.width], 0.7, 0.3);        

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            // the y-axis
            var y = d3.scale.linear()
                .domain([min, max])
                .range([scope.height + scope.margin.top, 0 + scope.margin.top]);
            
            var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

            // draw the boxplots    
            svg.selectAll(".box")      
              .data(data)
              .enter().append("g")
                .attr("transform", function(d,i) { return "translate(" +  x(i)  + "," + scope.margin.top + ")"; } )
              .call(chart.width(x.rangeBand())); 
            
                  
            // add a title
            svg.append("text")
                .attr("x", (scope.width / 2))             
                .attr("y", 0 + (scope.margin.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "18px") 
                //.style("text-decoration", "underline")  
                .text("title");
         
             // draw y axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text") // and text1
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .style("font-size", "16px") 
                  .text("Legend Y");        
            
            // draw x axis  
            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + (scope.height  + scope.margin.top + 10) + ")")
              .call(xAxis)
              .append("text")             // text label for the x axis
                .attr("x", (scope.width / 2) )
                .attr("y",  10 )
                .attr("dy", ".71em")
                .style("text-anchor", "middle")
                .style("font-size", "16px") 
                .text("Legend X"); 
        }
    }
});