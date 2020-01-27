var map;
var source;
var vector; 
var raster;
var typeSelect = document.getElementById('type');;
var draw;

$(document).ready(function(){
  initMap();
  addInteraction();
});


function initMap(){
  raster = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  source = new ol.source.Vector({wrapX: false});
  vector = new ol.layer.Vector({
    source: source
  });

  map = new ol.Map({
      target: 'map',
      layers: [raster, vector],
      view: new ol.View({
        center: ol.proj.fromLonLat([-76.043120, 36.864700], "EPSG:3857"),
        zoom: 12
      })
  });
}

function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    draw = new ol.interaction.Draw({
      source: source,
      type: typeSelect.value
    });
    map.addInteraction(draw);
  }
}

typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};


