function create_dataset_table(elem, data) {
    data.sort(function(a,b) { return a.overall_rank - b.overall_rank;});
    var table = d3.select(elem);
    var tbody = table.selectAll('tr').data(data);
    tr = tbody.enter().append('tr');
    tr.append('td').text(function(d) { return d.overall_rank;});
    tr.append('td').text(function(d) { return d.name;});
    //tr.append('td').html(function(d) { return '<div id="gauge-'+d.overall_rank+'"></div>';}).attr('class', function(d) { window.gauge(d3.select('#gauge-'+d.overall_rank), 100,50, 0.6);});
    tr.append('td').text(function(d) { return d.datasets;});
    tr.append('td').text(function(d) { return d.open_datasets;});
}
document.onreadystatechange = function () {
  if(document.getElementById('city-datasets')) {
    d3.csv('https://s3.amazonaws.com/open-data-germany-orgs/open_data_germany_ranks.csv', function(error, data) {
      create_dataset_table('.city-datasets tbody', data);
    });
  }
};
