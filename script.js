var data, options, chart;
var neutralColor = '#F5F5F5'; // 0 grey
var visitedColor = '#0B00B9'; // 1 green
var wntVisitColor = '#00B90D'; // 2 blue


google.charts.load("visualization", "1", {packages:["geochart"]});
google.charts.setOnLoadCallback(drawRegionsMap);



  function drawRegionsMap() {

      data = google.visualization.arrayToDataTable([
        ['State', 'Visited', {role: 'tooltip', p: {html: 'true'}}],
        ['US-AL', 0, ''],
        ['US-AK', 0, ''],
        ['US-AZ', 0, ''],
        ['US-AR', 0, ''],
        ['US-CA', 0, ''],
        ['US-CO', 0, ''],
        ['US-CT', 0, ''],
        ['US-DE', 0, ''],
        ['US-DC', 0, ''],
        ['US-FL', 0, ''],
        ['US-GA', 0, ''],
        ['US-HI', 0, ''],
        ['US-ID', 0, ''],
        ['US-IL', 0, ''],
        ['US-IN', 0, ''],
        ['US-IA', 0, ''],
        ['US-KS', 0, ''],
        ['US-KY', 0, ''],
        ['US-LA', 0, ''],
        ['US-ME', 0, ''],
        ['US-MT', 0, ''],
        ['US-NE', 0, ''],
        ['US-NV', 0, ''],
        ['US-NH', 0, ''],
        ['US-NJ', 0, ''],
        ['US-NM', 0, ''],
        ['US-NY', 0, ''],
        ['US-NC', 0, ''],
        ['US-ND', 0, ''],
        ['US-OH', 0, ''],
        ['US-OK', 0, ''],
        ['US-OR', 0, ''],
        ['US-MD', 0, ''],
        ['US-MA', 0, ''],
        ['US-MI', 0, ''],
        ['US-MN', 0, ''],
        ['US-MS', 0, ''],
        ['US-MO', 0, ''],
        ['US-PA', 0, ''],
        ['US-RI', 0, ''],
        ['US-SC', 0, ''],
        ['US-SD', 0, ''],
        ['US-TN', 0, ''],
        ['US-TX', 0, ''],
        ['US-UT', 0, ''],
        ['US-VT', 0, ''],
        ['US-VA', 0, ''],
        ['US-WA', 0, ''],
        ['US-WV', 0, ''],
        ['US-WI', 0, ''],
        ['US-WY', 0, '']
      ]);

      options = {
        displayMode: 'regions',
        resolution:'provinces',
        colorAxis:{
          colors:[neutralColor, visitedColor, wntVisitColor],
          minValue: 0,
          maxValue:2},
       region:'US',
       legend:'none'
      };

      function toggleVisit(e){
          for (var i = 0; i < data.getNumberOfRows(); i++) {
                var selection = chart.getSelection()[0];
                if (i === selection.row) {
                  console.log(i + " selection: " + selection.row);
                  dealwithModal(i);
                  break;
                }
                
          }
          chart.draw(data, options);
        }

      function dealwithModal(i) {
          $('#visitModal').modal('show');
          document.getElementById("btn-close").onclick = function() {updateColors(i)};
          return;
      }

      chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      google.visualization.events.addListener(chart, 'select', toggleVisit);

     chart.draw(data, options);
  }

function updateCounts()
{
  var visitedCount = 0;
  var wntVisitCount = 0;
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    if(data.qg[i].c[1].v === 2) {
      visitedCount++;
    } else if (data.qg[i].c[1].v === 1){
      wntVisitCount++;
    } 
  }
  document.getElementById("visited_num").innerHTML = visitedCount;
  document.getElementById("want_num").innerHTML = wntVisitCount;

  return;
}
        


function updateColors(i) {
  if($("#visitedChbx").is(':checked')){
  // visited color
    data.setValue(i, 1, 2);
  // Code in the case checkbox is checked.
  } else if ($("#wntvisitChbx").is(':checked')) {
  // want to visit color
    data.setValue(i, 1, 1);
   // Code in the case checkbox is NOT checked.
  } else {
  //default color
    data.setValue(i, 1, 0);
  }
  chart.draw(data, options);
  updateCounts();
  return;
}