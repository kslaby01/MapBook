

  
var data, options, chart;
var neutralColor = '#F5F5F5'; // 0 grey
var visitedColor = '#0B00B9'; // 1 green
var wntVisitColor = '#00B90D'; // 2 blue


google.charts.load("visualization", "1", {packages:["geochart"]});
google.charts.setOnLoadCallback(drawRegionsMap);



  function drawRegionsMap() {

      data = google.visualization.arrayToDataTable([
        ['State', 'Visited', {role: 'tooltip', p: {html: 'true'}}],
               ['Alabama', 0, ''],
        ['Alaska', 0, ''],
        ['Arizona', 0, ''],
        ['Arkansas', 0, ''],
        ['California', 0, ''],
        ['Colorado', 0, ''],
        ['Connecticut', 0, ''],
        ['Delaware', 0, ''],
        ['Florida', 0, ''],
        ['Georgia', 0, ''],
        ['Hawaii', 0, ''],
        ['Idaho', 0, ''],
        ['Illinois', 0, ''],
        ['Indiana', 0, ''],
        ['Iowa', 0, ''],
        ['Kansas', 0, ''],
        ['Kentucky', 0, ''],
        ['Louisiana', 0, ''],
        ['Maine', 0, ''],
        ['Maryland', 0, ''],
        ['Massachusetts', 0, ''],
        ['Michigan', 0, ''],
        ['Minnesota', 0, ''],
        ['Mississippi', 0, ''],
        ['Missouri', 0, ''],
        ['Montana', 0, ''],
        ['Nebraska', 0, ''],
        ['Nevada', 0, ''],
        ['New Hampshire', 0, ''],
        ['New Jersey', 0, ''],
        ['New Mexico', 0, ''],
        ['New York', 0, ''],
        ['North Carolina', 0, ''],
        ['North Dakota', 0, ''],
        ['Ohio', 0, ''],
        ['Oklahoma', 0, ''],
        ['Oregon', 0, ''],
        ['Pennsylvania', 0, ''],
        ['Rhode Island', 0, ''],
        ['South Carolina', 0, ''],
        ['South Dakota', 0, ''],
        ['Tennessee', 0, ''],
        ['Texas', 0, ''],
        ['Utah', 0, ''],
        ['Vermont', 0, ''],
        ['Virginia', 0, ''],
        ['Washington', 0, ''],
        ['West Virginia', 0, ''],
        ['Wisconsin', 0, ''],
        ['Wyoming', 0, '']
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
  //$('#checkbox').prop('checked', true); // Checks it
  $('#visitedChbx').prop('checked', true); // Unchecks it
  $('#wntvisitChbx').prop('checked', false); // Unchecks it

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