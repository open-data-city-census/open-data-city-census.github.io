function showTrend() {
  var timeFormat = d3.timeFormat('%Y-%m-%d');
  var todayFormatted = timeFormat(new Date);
  var now = new Date;
  var dates = d3.timeDay.range(d3.timeDay.offset(now, -14), now);
  var rankingChange = 'https://s3.amazonaws.com/open-data-germany-orgs/ranks/';
  var q = d3.queue();
  dates.forEach(function(d) {
    var dateString = timeFormat(d);
    var url = rankingChange+dateString+'.csv';
    q.defer(d3.csv, url)
  });

  var lineChart = {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "description": "Google's stock price over time.",
    "width": 80,
    "height": 35,
    "config": {
      "axis": false,
      "axisY": false,
      "axisX": false,
      "grid": false,
      "labels": false,
      "padding": 2,
      "autosize": "none"
    },
    "data": [],
    "transform": [
      {
        "calculate": "datum.value * -1",
        "as": "order"
      }
    ],
    "mark": "line",
    "encoding": {
        "x": {"field": "key", "type": "temporal", "axis": {"title": null}},
        "y": {"field": "order", "type": "quantitative", "axis": {"title": null}},
      }
  };
  q.awaitAll(function(error, results) {
    var cities = [];
    results.forEach(function(c, i) {
      var currentDate = dates[i];
      c.forEach(function(city) {
        city.date = currentDate;
        cities.push(city);
      });
    });
    var entries = d3.nest()
    .key(function(d) { return d.id; })
    .key(function(d) { return d.date; })
    .rollup(function(v) { return v[0].overall_rank; })
    .entries(cities);
    entries.forEach(function(city) {
      lineChart.data = { "values": city.values };
      var width = document.getElementById(city.key).offsetWidth;
      lineChart.width = width-10;
      vegaEmbed('#'+city.key, lineChart, {actions: false});
    });
  });
}
