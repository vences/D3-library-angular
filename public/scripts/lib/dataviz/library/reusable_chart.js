// Inspirate by http://bl.ocks.org/biovisualize/5372077#reusable_chart.js
// https://github.com/d3/d3-plugins/blob/master/box/box.js
(function() {

var common = {
  chart: {
    margin: {
      top: 20,
      right: 40,
      bottom: 40,
      left: 40
    },
    width: 500,
    height: 500,
    title: '',
  },
  createSvg: function (element, className) {
    return d3.select(element)
              .append('svg')
              .classed(className, true);
  },
  makeSvg: function (svg, duration, width, height, margin) {
    svg.transition().duration(duration).attr({
      width: width,
      height: height
    })
    svg.select('.container-group').attr({
        transform: 'translate(' + margin.left + ',' + margin.top + ')'
    });
  },
  makeContainer: function (svg) {
    var container = svg.append('g').classed('container-group', true);
    container.append('g').classed('chart-title', true);
    container.append('g').classed('chart-group', true);
    container.append('g').classed('x-axis-group axis', true);
    container.append('g').classed('y-axis-group axis', true);
    return container;
  },
  _x: function (data, size) {
    return d3.scale.ordinal()
              .domain(data.map(function(d, i) {
                return i;
              }))
              .rangeRoundBands([0, size], .1);
  },
  _y: function (data, size) {
    return d3.scale.linear()
              .domain([0, d3.max(data, function(d, i) {
                return d;
              })])
              .range([size, 0]);
  },
  _axis: function (scale, position) {
    return d3.svg.axis()
              .scale(scale)
              .orient(position);
  },
  makeTitle: function (svg, title, x, y) {
    var container = svg.select('.chart-title')
        .selectAll('.title')
        .data([title]);
      container.enter().append('text')
        .classed('title', true);
      container.transition()
        .attr("x", x)             
        .attr("y", y)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")  
        .style("font-size", "13px")
        .text(title);
      container.exit().remove();
  },
  makeAxis: function (id, svg, duration, effect, axis, transformation) {
    var container = svg.select(id)
        .transition()
        .duration(duration)
        .ease(effect)
        .call(axis);
    if (transformation != null) {
      container.attr({
        transform: transformation
      })
    }
  }
}

d3.custom = {};

d3.custom.barChart = function module() {
  var margin = common.chart.margin,
    width = common.chart.width,
    height = common.chart.height,
    gap = 0,
    ease = 'cubic-in-out',
    graphTitle = common.chart.title;
  var svg, duration = 500;

  var dispatch = d3.dispatch('customHover');

  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;

      var x1 = common._x(_data, chartW);
      var y1 = common._y(_data, chartH);
      var xAxis = common._axis(x1, 'bottom');
      var yAxis = common._axis(y1, 'left');

      var barW = chartW / _data.length;

      if (!svg) {
        svg = common.createSvg(this, 'chart');
        var container = common.makeContainer(svg);
      }
      
      common.makeSvg(svg, duration, width, height, margin)

      common.makeAxis('.x-axis-group.axis', svg, duration, ease, xAxis, 'translate(0,' + (chartH) + ')')
      common.makeAxis('.y-axis-group.axis', svg, duration, ease, yAxis)

      var gapSize = x1.rangeBand() / 100 * gap;
      var barW = x1.rangeBand() - gapSize;
      var bars = svg.select('.chart-group')
        .selectAll('.bar')
        .data(_data);
      bars.enter().append('rect')
        .classed('bar', true)
        .attr({
          x: function(d, i) {
            return x1(i) + gapSize / 2;
          },
          width: barW,
          y: function(d, i) {
            return y1(d);
          },
          height: function(d, i) {
            return chartH - y1(d);
          }
        })
        .property('offsetWidth', barW)
        .on('mouseover', dispatch.customHover)
        
      bars.transition()
        .duration(duration)
        .ease(ease)
        .attr({
          width: barW,
          x: function(d, i) {
            return x1(i) + gapSize / 2;
          },
          y: function(d, i) {
            return y1(d);
          },
          height: function(d, i) {
            return chartH - y1(d);
          }
        });
      bars.exit().transition().style({
        opacity: 0
      }).remove();
      
      common.makeTitle(svg, graphTitle, (chartW / 2), (0 - (margin.top / 2)) );

      duration = 500;

    });
  }
  exports.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
  };
  exports.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.title = function(_x) {
    if (!arguments.length) return graphTitle;
    graphTitle = _x;
    return this;
  };
  exports.gap = function(_x) {
    if (!arguments.length) return gap;
    gap = _x;
    return this;
  };
  exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
  };
  d3.rebind(exports, dispatch, 'on');
  return exports;
};

d3.custom.plotChart = function module() {
  var margin = common.chart.margin,
    width = common.chart.width,
    height = common.chart.height,
    gap = 0,
    ease = 'cubic-in-out',
    graphTitle = common.chart.title;
  var svg, duration = 500;

  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;

      var x1 = common._x(_data, chartW)
      var y1 = common._y(_data, chartH)
      var xAxis = common._axis(x1, 'bottom');
      var yAxis = common._axis(y1, 'left');

      var barW = chartW / _data.length;

      if (!svg) {
        svg = common.createSvg(this, 'chart')
        var container = common.makeContainer(svg)
      }
      
      common.makeSvg(svg, duration, width, height, margin)
      
      common.makeAxis('.x-axis-group.axis', svg, duration, ease, xAxis, 'translate(0,' + (chartH) + ')')
      common.makeAxis('.y-axis-group.axis', svg, duration, ease, yAxis)
      
      var gapSize = x1.rangeBand() / 100 * gap;
      var barW = x1.rangeBand() - gapSize;
      var circle = svg.select('.chart-group')
        .selectAll('.plot')
        .data(_data);
      circle.enter().append('circle')
        .classed('plot', true)
        .attr({
          cx: function(d, i) {
            return x1(i) + x1.rangeBand()/2;
          },
          cy: function(d, i) {
            return y1(d);
          },
          r: 0
        })
        
      circle.transition()
        .duration(duration)
        .ease(ease)
        .attr({
          cx: function(d, i) {
            return x1(i) + x1.rangeBand()/2;
          },
          cy: function(d, i) {
            return y1(d);
          },
          r: 4
        });
      circle.exit().transition().style({
        opacity: 0
      }).remove();
      
      common.makeTitle(svg, graphTitle, (chartW / 2), (0 - (margin.top / 2)) );

      duration = 500;

    });
  }
  exports.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
  };
  exports.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.title = function(_x) {
    if (!arguments.length) return graphTitle;
    graphTitle = _x;
    return this;
  };
  exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
  };
  return exports;
};

d3.custom.boxPlot = function module() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = function (d) {
        return [0, d.length - 1];
      },
      quartiles = function (d) {
        return [
          d3.quantile(d, .25),
          d3.quantile(d, .5),
          d3.quantile(d, .75)
        ];
      },
      tickFormat = null;

  // For each small multiple…
  function box(g) {
    g.each(function(d, i) {
      d = d.map(value).sort(d3.ascending);
      var g = d3.select(this),
          n = d.length,
          min = d[0],
          max = d[n - 1];

      // Compute quartiles. Must return exactly 3 elements.
      var quartileData = d.quartiles = quartiles(d);

      // Compute whiskers. Must return exactly 2 elements, or null.
      var whiskerIndices = whiskers && whiskers.call(this, d, i),
          whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

      // Compute outliers. If no whiskers are specified, all data are "outliers".
      // We compute the outliers as indices, so that we can join across transitions!
      var outlierIndices = whiskerIndices
          ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
          : d3.range(n);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [min, max])
          .range([height, 0]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.

      // Update center line: the vertical line spanning the whiskers.
      var center = g.selectAll("line.center")
          .data(whiskerData ? [whiskerData] : []);

      center.enter().insert("line", "rect")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x0(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x0(d[1]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); })
          .remove();

      // Update innerquartile box.
      var box = g.selectAll("rect.box")
          .data([quartileData]);

      box.enter().append("rect")
          .attr("class", "box")
          .attr("x", 0)
          .attr("y", function(d) { return x0(d[2]); })
          .attr("width", width)
          .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
        .transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      box.transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      // Update median line.
      var medianLine = g.selectAll("line.median")
          .data([quartileData[1]]);

      medianLine.enter().append("line")
          .attr("class", "median")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      medianLine.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData || []);

      whisker.enter().insert("line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.exit().transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1e-6)
          .remove();

      // Update outliers.
      var outlier = g.selectAll("circle.outlier")
          .data(outlierIndices, Number);

      outlier.enter().insert("circle", "text")
          .attr("class", "outlier")
          .attr("r", 5)
          .attr("cx", width / 2)
          .attr("cy", function(i) { return x0(d[i]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.exit().transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1e-6)
          .remove();

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update box ticks.
      var boxTick = g.selectAll("text.box")
          .data(quartileData);

      boxTick.enter().append("text")
          .attr("class", "box")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
          .attr("x", function(d, i) { return i & 1 ? width : 0 })
          .attr("y", x0)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);

      boxTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1);

      // Update whisker ticks. These are handled separately from the box
      // ticks because they may or may not exist, and we want don't want
      // to join box ticks pre-transition with whisker ticks post-.
      var whiskerTick = g.selectAll("text.whisker")
          .data(whiskerData || []);

      whiskerTick.enter().append("text")
          .attr("class", "whisker")
          .attr("dy", ".3em")
          .attr("dx", 6)
          .attr("x", width)
          .attr("y", x0)
          .text(format)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.exit().transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  box.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return box;
  };

  box.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return box;
  };

  box.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return box;
  };

  box.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return box;
  };

  box.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return box;
  };

  box.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return box;
  };

  box.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return box;
  };

  box.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return box;
  };

  return box;
};

d3.custom.boxPlotMan = function module() {
  var width = common.chart.width,
      margin = common.chart.margin,
      height = common.chart.height,
      duration = 0,
      domain = null,
      value = Number,
      tickFormat = null;
  var svg;

  // For each small multiple…
  function box(g) {
    g.each(function(d, i) {
      var min = d.min,
          max = d.max;

      // Compute quartiles. Must return exactly 3 elements.
      var quartileData = []
      quartileData.push(d.Q1)
      quartileData.push(d.median)
      quartileData.push(d.Q3)

      // Compute whiskers. Must return exactly 2 elements, or null.
      var whiskerData = []
      whiskerData.push(min)
      whiskerData.push(max)

       var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;

      // var x = d3.scale.linear()
      //         .domain([0,width])
      //         .range([0, chartW]);

      // Compute the new y-scale.
      var y1 = d3.scale.linear()
          .domain([min, max])
          .range([chartH, 0]);

      // Retrieve the old y-scale, if this is an update.
      var y0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(y1.range());

      // Stash the new scale.
      this.__chart__ = y1;

      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.
      
      if (!svg) {
        svg = common.createSvg(this, "box");
        var container = common.makeContainer(svg);
      }
      
      common.makeSvg(svg, duration, width, height, margin)

      // Update center line: the vertical line spanning the whiskers.
      var center = svg.select('.chart-group')
          .selectAll("line.center")
          .data(whiskerData ? [whiskerData] : []);

      center.enter().insert("line", "rect")
          .attr("class", "center")
          .attr("x1", chartW / 2)
          .attr("y1", function(d) { return y0(d[0]); })
          .attr("x2", chartW / 2)
          .attr("y2", function(d) { return y0(d[1]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return y1(d[0]); })
          .attr("y2", function(d) { return y1(d[1]); });

      center.transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("x1", chartW / 2)
          .attr("y1", function(d) { return y1(d[0]); })
          .attr("x2", chartW / 2)
          .attr("y2", function(d) { return y1(d[1]); });

      center.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("y1", function(d) { return y1(d[0]); })
          .attr("x2", chartW / 2)
          .attr("y2", function(d) { return y1(d[1]); })
          .remove();

      // Update innerquartile box.
      var box = svg.select('.chart-group')
          .selectAll("rect.box")
          .data([quartileData]);

      box.enter().append("rect")
          .attr("class", "box")
          .attr("x", 0)
          .attr("y", function(d) { return y0(d[2]); })
          .attr("width", chartW)
          .attr("height", function(d) { return y0(d[0]) - y0(d[2]); })
        .transition()
          .duration(duration)
          .attr("y", function(d) { return y1(d[2]); })
          .attr("height", function(d) { return y1(d[0]) - y1(d[2]); });

      box.transition()
          .duration(duration)
          .attr("y", function(d) { return y1(d[2]); })
          .attr("width", chartW)
          .attr("height", function(d) { return y1(d[0]) - y1(d[2]); });

      // Update median line.
      var medianLine = svg.select('.chart-group')
          .selectAll("line.median")
          .data([quartileData[1]]);

      medianLine.enter().append("line")
          .attr("class", "median")
          .attr("x1", 0)
          .attr("y1", y0)
          .attr("x2", chartW)
          .attr("y2", y0)
        .transition()
          .duration(duration)
          .attr("y1", y1)
          .attr("y2", y1);

      medianLine.transition()
          .duration(duration)
          .attr("y1", y1)
          .attr("y2", y1)
          .attr("x2", chartW);

      // Update whiskers.
      var whisker = svg.select('.chart-group')
          .selectAll("line.whisker")
          .data(whiskerData || []);

      whisker.enter().insert("line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", 0)
          .attr("y1", y0)
          .attr("x2", chartW)
          .attr("y2", y0)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y1", y1)
          .attr("y2", y1)
          .style("opacity", 1);

      whisker.transition()
          .duration(duration)
          .attr("y1", y1)
          .attr("y2", y1)
          .attr("x2", chartW)
          .style("opacity", 1);

      whisker.exit().transition()
          .duration(duration)
          .attr("y1", y1)
          .attr("y2", y1)
          .style("opacity", 1e-6)
          .remove();

      // Compute the tick format.
      var format = tickFormat || y1.tickFormat(8);

      // Update box ticks.
      var boxTick = svg.select('.chart-group')
          .selectAll("text.box")
          .data(quartileData);

       boxTick.enter().append("text")
          .attr("class", "box")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
          .attr("x", function(d, i) { return i & 1 ? chartW : 0 })
          .attr("y", y0)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", y1);

      boxTick.transition()
          .duration(duration)
          .text(format)
          .attr("x", function(d, i) { return i & 1 ? chartW : 0 })
          .attr("y", y1);

      // Update whisker ticks. These are handled separately from the box
      // ticks because they may or may not exist, and we want don't want
      // to join box ticks pre-transition with whisker ticks post-.
      var whiskerTick = svg.select('.chart-group')
          .selectAll("text.whisker")
          .data(whiskerData || []);

      whiskerTick.enter().append("text")
          .attr("class", "whisker")
          .attr("dy", ".3em")
          .attr("dx", 6)
          .attr("x", chartW)
          .attr("y", y1)
          .text(format)
          .style("opacity", 1e-6);

      whiskerTick.transition()
          .duration(duration)
          .text(format)
          .attr("x", chartW)
          .attr("y", y1)
          .style("opacity", 1);

      whiskerTick.exit().transition()
          .duration(duration)
          .attr("y", y1)
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  box.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return box;
  };

  box.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    return box;
  };

  box.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return box;
  };

  box.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return box;
  };

  box.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return box;
  };

  box.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return box;
  };

  box.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return box;
  };

  box.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return box;
  };

  return box;
};

d3.custom.pieChart = function module() {
  var margin = common.chart.margin,
    width = common.chart.width,
    height = common.chart.height,
    ease = 'cubic-in-out',
    graphTitle = common.chart.title,
    innerRadius = 0;
  var svg, duration = 500;

  var dispatch = d3.dispatch('customHover');

  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;

      var x1 = common._x(_data, chartW);
      var y1 = common._y(_data, chartH);
      var xAxis = common._axis(x1, 'bottom');
      var yAxis = common._axis(y1, 'left');

      var barW = chartW / _data.length;

      if (!svg) {
        svg = common.createSvg(this, 'chart');
        var container = common.makeContainer(svg);
      }
      
      common.makeSvg(svg, duration, width, height, margin)

      var outerRadius = chartW / 2;
      var arc = d3.svg.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius);
      
      var pie = d3.layout.pie()
                  .value(function(d) { return d.value; });;
      
      //Easy colors accessible via a 10-step ordinal scale
      var color = d3.scale.category10();

      //Set up groups
      var arcs = svg.select('.chart-group')
              .selectAll("g.arc")
              .data(pie);
      
      var enter = arcs.enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

      enter.append("path")
          .attr("fill", function(d, i) {
            return color(i);
          })
          .attr("d", arc);

      enter.append("text")
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d) {
            return d.data.label;
          });

      var transition = arcs.transition()
          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

      transition.selectAll("path")
          .attr("d", arc)
        
      transition.selectAll("text")
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d) {
            return d.data.label;
          });

      arcs.exit()
          .remove();
      
      common.makeTitle(svg, graphTitle, (chartW / 2), (0 - (margin.top / 2)) );

      duration = 500;

    });
  }
  exports.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
  };
  exports.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.innerRadius = function(_x) {
    if (!arguments.length) return innerRadius;
    innerRadius = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.title = function(_x) {
    if (!arguments.length) return graphTitle;
    graphTitle = _x;
    return this;
  };
  exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
  };
  d3.rebind(exports, dispatch, 'on');
  return exports;
};

d3.custom.lineChart = function module () {
  var margin = common.chart.margin,
    width = common.chart.width,
    height = common.chart.height,
    gap = 0,
    ease = 'cubic-in-out',
    graphTitle = common.chart.title;
  var svg, duration = 500;

  var dispatch = d3.dispatch('customHover');

  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;

      var x1 = common._x(_data, chartW);
      var y1 = common._y(_data, chartH);
      var xAxis = common._axis(x1, 'bottom');
      var yAxis = common._axis(y1, 'left');

      var barW = chartW / _data.length;

      if (!svg) {
        svg = common.createSvg(this, 'chart');
        var container = common.makeContainer(svg);
      }
      
      common.makeSvg(svg, duration, width, height, margin)

      common.makeAxis('.x-axis-group.axis', svg, duration, ease, xAxis, 'translate(0,' + (chartH) + ')')
      common.makeAxis('.y-axis-group.axis', svg, duration, ease, yAxis)

      var line = d3.svg.line()
        .x(function(d, i) { return x1(i) + x1.rangeBand()/2 })
        .y(function(d) { return y1(d); })
        .interpolate("cardinal");

      var totalLength = svg.selectAll("path").node().getTotalLength();

      var vis = svg.select('.chart-group')
      
      vis.append("path")
          .datum([])
          .attr("class", "line")
          .attr("d", line)
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .attr("fill", "none");
      
      vis.transition()
          .delay(function(d, i) {
            return i / _data.length * 100;
          })
          .duration(1000)
          .ease(ease)
          .select('path')
          .attr({
            "d": line(_data)
          })

      common.makeTitle(svg, graphTitle, (chartW / 2), (0 - (margin.top / 2)) );

      duration = 500;

    });
  }
  exports.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
  };
  exports.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.title = function(_x) {
    if (!arguments.length) return graphTitle;
    graphTitle = _x;
    return this;
  };
  exports.gap = function(_x) {
    if (!arguments.length) return gap;
    gap = _x;
    return this;
  };
  exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
  };
  d3.rebind(exports, dispatch, 'on');
  return exports;
};

d3.custom.areaChart = function module () {
  var margin = common.chart.margin,
    width = common.chart.width,
    height = common.chart.height,
    gap = 0,
    ease = 'cubic-in-out',
    graphTitle = common.chart.title;
  var svg, duration = 500;

  var dispatch = d3.dispatch('customHover');

  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;

      var x1 = common._x(_data, chartW);
      var y1 = common._y(_data, chartH);
      var xAxis = common._axis(x1, 'bottom');
      var yAxis = common._axis(y1, 'left');

      var barW = chartW / _data.length;

      if (!svg) {
        svg = common.createSvg(this, 'chart');
        var container = common.makeContainer(svg);
      }
      
      common.makeSvg(svg, duration, width, height, margin)

      common.makeAxis('.x-axis-group.axis', svg, duration, ease, xAxis, 'translate(0,' + (chartH) + ')')
      common.makeAxis('.y-axis-group.axis', svg, duration, ease, yAxis)

      var area = d3.svg.area()
          .x(function(d,i) { return x1(i) + x1.rangeBand()/2; })
          .y0(chartH)
          .y1(function(d) { return y1(d); })
          .interpolate("cardinal");

      var vis = svg.select('.chart-group');

      vis.append("path")
          .datum([])
          .attr("class", "area")
          .attr("d", area)
      
      vis.transition()
          .delay(function(d, i) {
            return i / _data.length * 100;
          })
          .duration(1000)
          .ease(ease)
          .select('.area')
          .attr({
            "d": area(_data),
            "fill": "blue",
            "fill-opacity": "0.2"
          });
      
      common.makeTitle(svg, graphTitle, (chartW / 2), (0 - (margin.top / 2)) );

      duration = 500;

    });
  }
  exports.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
  };
  exports.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.title = function(_x) {
    if (!arguments.length) return graphTitle;
    graphTitle = _x;
    return this;
  };
  exports.gap = function(_x) {
    if (!arguments.length) return gap;
    gap = _x;
    return this;
  };
  exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
  };
  d3.rebind(exports, dispatch, 'on');
  return exports;
};

})();