HUMANIZE_TIME = {
  'd': 'Gestern',
  'dd': 'Tagen',
  'w': '1 Woche',
  'ww': 'Wochen',
  'm': '1 Monat',
  'mm': 'Monaten',
  'y': '1 Jahr',
  'yy': 'Jahren',
  'n': 'Nie'
};
function historic(name, data) {
  return _.find(data, {id: name});
}
function overallRanking(d) {
  return parseInt(d.overall_rank);
}
function iconForHistoric(current, prev) {
  if(current === prev) {
    return 'arrow-right';
  }else if(current > prev) {
    return 'arrow-up'
  } else {
    return 'arrow-down'
  }
}
function monthYearStart(days) {
  var timeFormat = d3.timeFormat('%m/%Y');
  var today = new Date();
  today.setDate(today.getDate()-days)
  return timeFormat(today);
}
function daysSince(days) {
  if(days === 1) {
    return ['d']
  }if(days < 7) {
    return ['dd', days]
  }
}
function weeks(days) {
  if(days< 14) {
    return ['w']
  }if(days< 31) {
    return ['ww', Math.ceil(days / 7)];
  }
}
function months(days) {
  if(days< 62) {
    return ['m']
  }
  if(days< 365) {
    return ['mm', Math.ceil(days/ 31)];
  }
}
function years(days) {
  if(days >= 365 && days < 730) {
    return ['y']
  }
  if(days > 365) {
    return ['yy', Math.ceil(days/ 365)];
  }
}
function daysSinceLastUpdate(days) {
  var update = ["n"]
  days = parseInt(days);
  update = years(days) || update;
  update = months(days) || update;
  update = weeks(days) || update;
  update = daysSince(days) || update;
  return update;
}
function formatUpdateSince(update) {
  humanize = HUMANIZE_TIME[update[0]];
  return update.length > 1 ? update[1]+ " "+humanize : humanize;
}
function create_dataset_table(elem, data, historic_ranking) {
    data.sort(function(a,b) { return a.overall_rank - b.overall_rank;});
    var table = d3.select(elem);
    var tbody = table.selectAll('tr').data(data);
    tr = tbody.enter().append('tr');
    tr.append('td').text(function(d) { return d.overall_rank;});
    tr.append('td').html(function(d) { return '<span class="fas fa-'+iconForHistoric(overallRanking(d), overallRanking(historic(d.id, historic_ranking)))+'"></span>';});
    tr.append('td').text(function(d) { return d.name;});
    //tr.append('td').html(function(d) { return '<div id="gauge-'+d.overall_rank+'"></div>';}).attr('class', function(d) { window.gauge(d3.select('#gauge-'+d.overall_rank), 100,50, 0.6);});
    tr.append('td').text(function(d) { return d3.format('.2f')(d.overall_rank_data);});
    tr.append('td').text(function(d) { return monthYearStart(d.days_since_start);});
    tr.append('td').text(function(d) { return formatUpdateSince(daysSinceLastUpdate(d.days_since_last_update));});
    tr.append('td').text(function(d) { return d.datasets;});
    tr.append('td').text(function(d) { return d.open_datasets;});
}
var rankingsCsv = 'https://s3.amazonaws.com/open-data-germany-orgs/open_data_germany_ranks.csv';
var timeFormat = d3.timeFormat('%Y-%m-%d');
var todayFormatted = timeFormat(new Date);
var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
var yesterdayFormatted = timeFormat(yesterday);
var rankingChange = 'https://s3.amazonaws.com/open-data-germany-orgs/ranks/'+todayFormatted+'.csv';
document.onreadystatechange = function () {
  var q = d3.queue();
  if(document.getElementById('city-datasets')) {
    q.defer(d3.csv, rankingsCsv)
    .defer(d3.csv, rankingChange)
    .awaitAll(function(error, results) {
      create_dataset_table('.city-datasets tbody', results[0], results[1]);
    });
  }
};
