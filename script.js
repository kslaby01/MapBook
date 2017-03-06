    //   google.charts.load('current', {'packages':['geochart']});
    //   google.charts.setOnLoadCallback(drawRegionsMap);

    //   function drawRegionsMap() {

    //     var data = google.visualization.arrayToDataTable([
    //       ['Country', 'Popularity'],
    //       ['Germany', 200],
    //       ['United States', 300],
    //       ['Brazil', 400],
    //       ['Canada', 500],
    //       ['France', 600],
    //       ['RU', 700]
    //     ]);

    //    var options = {
    //       displayMode: 'regions',
    //       legend: 'None',
    //       colorAxis: {
    //          minValue: 0,
    //          maxValue:2,
    //         colors: ['blue', 'green', 'red']}
    //     };
    //     var container = document.getElementById('regions_div');
    //     var chart = new google.visualization.GeoChart(container);


    //     function myClickHandler(e){
    //       for (var i = 0; i < data.getNumberOfRows(); i++) {
    //             var test = chart.getSelection()[0];
    //             if (i === test.row) {
    //               data.setValue(i, 1, 100);
    //             } else {
    //               data.setValue(i, 1, 0);
    //             }
    //       }
    //     }
    //     function test(e)
    //     {
    //       //this.prop('fillcolor') = '#ffffff';
    //       var selection = chart.getSelection();
    //       //alert(data.getValue(selection[0].row, 0));
    //       alert(data[e.region]);
    //       alert(e.region);
    //     }

    //       google.visualization.events.addListener(chart, 'select', myClickHandler);
    //       //google.visualization.events.addListener(chart, 'regionClick', test);
    //       chart.draw(data, options);
        

    // }
var data, options, chart;
var neutralColor = '#F5F5F5';
var visitedColor = 'blue';
var wntVisitColor = 'red';

google.charts.load("visualization", "1", {packages:["geochart"]});
google.charts.setOnLoadCallback(drawRegionsMap);



  function drawRegionsMap() {

      data = google.visualization.arrayToDataTable([
        ['State', 'Visited', {role: 'tooltip', p: {html: 'true'}}],
        ['US-NY', 0, ''],
        ['US-AB', 0, ''],
        ['US-TX', 0, ''],
        ['US-CA', 0, ''],
        ['US-AK', 0, ''],
        ['US-MI', 0, '']
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
  return;
  }


// google.charts.load('visualization', '1', {'packages': ['geochart']});
// google.charts.setOnLoadCallback(drawVisualization);

// var iwmparam = [{
//     "id":"1",
//     "txt":"Alert From ID 1"
// }, {
//     "id":"2",
//     "txt":"Alert From ID 2"
// }];

// var message = new Array();

// function drawVisualization() {
//     var geocharts = {};
//     var dataTables = {};
//     for (var key in iwmparam) {
//         var id = parseInt(iwmparam[key]['id']);
        
//         message[id] = iwmparam[key]['txt'];


        
//         dataTables[key] = google.visualization.arrayToDataTable([
//             ['Country', 'Visited'],
//             ['Germany', 0],
//             ['United States', 1],
//             ['Brazil', 1],
//             ['Canada', 0],
//             ['France', 0],
//             ['RU', 0]
//         ]);

//         var options = {
//           displayMode: 'regions',
//           legend: 'None',
//           colorAxis: {
//              minValue: 0,
//              maxValue:2,
//             colors: ['blue', 'green', 'red']}
//         };
        
//         geocharts[key] = new google.visualization.GeoChart(document.getElementById('map_'+id));
        
//         // use a closure to lock the value of "key" in this iteration of the loop to "x" inside the closure
//         google.visualization.events.addListener(geocharts[key], 'select', (function(x) {
//             return function () {
//                 var selection = geocharts[x].getSelection();
                
//                 if (selection.length == 1) {
//                     var selectedRow = selection[0].row;
//                     var selectedRegion = dataTables[x].getValue(selectedRow, 0);
                    
//                     alert(selectedRegion);
//                 }
//               var test = dataTables[selection[0].row];
//               dataTables.setValue(i, 1, 2)
//             }
//         })(key));
        
//         geocharts[key].draw(dataTables[key], {
//             region:'world',
//             width: '500', 
//             legend: 'none'
//         });
//     }    
// }
