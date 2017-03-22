var DEFAULT_SQUARE_WIDTH = 60;
var DEFAULT_RADIUS = 13.5;
var VISITING = false;
var WANTING = false;
  
var data, options, chart;
var neutralColor = '#F5F5F5'; // 0 grey
var neutral = 0;
var visitedColor = '#00B90D'; // 1 blue
var visited = 1;
var wntVisitColor = '#0B00B9'; // 2 green 
var want = 2;


google.charts.load("visualization", "1", {packages:["geochart"]});
google.charts.setOnLoadCallback(drawRegionsMap);



// create map

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
          colors:[neutralColor, wntVisitColor, visitedColor],
          minValue: 0,
          maxValue:2},
       region:'US',
       legend:'none'
      };

      function toggleVisit(e){
          for (var i = 0; i < data.getNumberOfRows(); i++) {
                var selection = chart.getSelection()[0];
                if (i === selection.row) {
                  updateColors(i);
                  break;
                }  
          }
      }

      chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      google.visualization.events.addListener(chart, 'select', toggleVisit);

      chart.draw(data, options);
}

// Update the tally of the visited

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
        

// update colors on the map

function updateColors(i) {
  if(VISITING){
    data.setValue(i, 1, 2);  // visited color
  } else if (WANTING) {
    data.setValue(i, 1, 1);  // want to visit color
  } else { // NO HEX SELECTED
    data.setValue(i, 1, 0);  //default color
  }
  chart.draw(data, options);
  updateCounts();
  return;
}


// Hexagon color changing
var hexagon1, hexagon2, layer1, layer2;
window.onload = function() {
    $("#helpModal").modal()
    var stage1 = new Konva.Stage({
        container: 'shape_container_v',
        width: DEFAULT_SQUARE_WIDTH,
        height: DEFAULT_SQUARE_WIDTH
    });
      var stage2 = new Konva.Stage({
        container: 'shape_container_w',
        width: DEFAULT_SQUARE_WIDTH,
        height: DEFAULT_SQUARE_WIDTH
    });

    layer1 = new Konva.Layer();
    layer2 = new Konva.Layer();

    hexagon1 = new Konva.RegularPolygon({
        x: stage1.getWidth() / 2,
        y: stage1.getHeight() / 2,
        sides: 6,
        radius: DEFAULT_RADIUS,
        fill: visitedColor,
        strokeWidth: 0
    });
    hexagon2 = new Konva.RegularPolygon({
        x: stage2.getWidth() / 2,
        y: stage2.getHeight() / 2,
        sides: 6,
        radius: DEFAULT_RADIUS,
        fill: wntVisitColor,
        strokeWidth: 0,
        align: 'top'
    });
    hexagon1.on('click touchstart', function() {
        var rad = this.radius() == 2*DEFAULT_RADIUS ? DEFAULT_RADIUS : 2*DEFAULT_RADIUS;
        this.radius(rad);

        if (rad == 2*DEFAULT_RADIUS) {
            VISITING = true;
            WANTING = false;
            hexagon2.radius(DEFAULT_RADIUS);
            layer2.draw();
        } else {
          VISITING = false;
        }
        layer1.draw();
    });

    hexagon2.on('click touchstart', function() {
        var rad = this.radius() == 2*DEFAULT_RADIUS ? DEFAULT_RADIUS : 2*DEFAULT_RADIUS;
        this.radius(rad);

        if (rad == 2*DEFAULT_RADIUS) {
            VISITING = false;
            WANTING = true;
            hexagon1.radius(DEFAULT_RADIUS);
            layer1.draw();
        } else {
          WANTING = false;
        }
        layer2.draw();
    });

    layer1.add(hexagon1);
    layer2.add(hexagon2);
    stage1.add(layer1);
    stage2.add(layer2);

    var period = 2000;
};

function hexColorUpdate(jscolor, type) {
      //test(jscolor
      if (type == 'visit'){
          visitedColor = '#' + jscolor;
          hexagon1.fill(visitedColor);
          layer1.draw();
          options['colorAxis']['colors'][2] = visitedColor;
          chart.draw(data, options);
      } else if (type == 'want') {
          wntVisitColor = '#' + jscolor;
          hexagon2.fill(wntVisitColor);
          layer2.draw();
          options['colorAxis']['colors'][1] = wntVisitColor;
          chart.draw(data, options);
      }
}

