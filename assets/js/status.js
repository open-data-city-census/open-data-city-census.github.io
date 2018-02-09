window.onload = function () {
  harvestApi = 'https://offenedaten.de/api/3/action/package_show?id='
  if (document.getElementById('harvest-status')) {
    var sources = document.getElementsByClassName('harvest-source');
    console.log(sources);
    for (i = 0; i < sources.length; i++) {
      var sourceElement = sources[i];
      var source = sourceElement.dataset.source;
      fetch(harvestApi+source).then(function(response) {
        return response.json();
      }).then(function(json) {
        if (json.success) {
          var status = json.result.status;
          var lastJob = status.last_job;
          if (lastJob) {
            var lastJobDate = Date.parse(lastJob.created);
            if (lastJob.status === "Finished") {
              lastJobDate = Date.parse(lastJob.finished);
            }
            var html = '<div class="status">Status: '+lastJob.status+'</div><div class="lastr-run">Last Run: '+new Date(lastJobDate).toLocaleString()+'</div><div class="error">Errored:'+lastJob.stats.errored+'</div>';
            document.getElementById('harvest-'+json.result.name).innerHTML = html;
          }
        }
      });
    }
  };
};
