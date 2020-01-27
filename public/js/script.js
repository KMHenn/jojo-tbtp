var map;
var source;
var vector; 
var raster;
var typeSelect = document.getElementById('type');;
var draw;
var features = [];
var markers = [];

$(document).ready(function(){
  $.get("/getMarkers", function(data, status){
    markers = data.locationLog;
    console.log(markers);
    initMap();
    addInteraction();
  });
});


// Change type of drawable
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};


// Get location of map click
map.on('click', function(evt){
  var arr = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
  console.log("Lat: " + arr[1] + "   Lng: " + arr[0]);
  var label = prompt("Enter a label for the location.", "");

  if (label === null || label === ""){
    addMarker(arr, label);
  }    
});

/**
 * Create the map
 */
function initMap(){
  raster = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  source = new ol.source.Vector({wrapX: false});
  vector = new ol.layer.Vector({
    source: source,
    type: "Circle"
  });

  map = new ol.Map({
      target: 'map',
      layers: [raster, vector],
      view: new ol.View({
        center: ol.proj.fromLonLat([-76.043120, 36.864700], "EPSG:3857"),
        zoom: 12
      })
  });

  // Loop through markers
  console.log(markers.length);
  for (var i = 0; i < markers.length; i++){
    var item = markers[i];
    console.log(item);
    var lng = item.lng;
    var lat = item.lat;
    var label = item.label;

    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857'))
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 1],
        src: "http://cdn.mapmarker.io/api/v1/pin?text" + label + "=&size=50&hoffset=1"
      }))
    });

    iconFeature.setStyle(iconStyle);
    features.push(iconFeature);
  }

  var vectorSource = new ol.source.Vector({
    features: features
  });

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  map.addLayer(vectorLayer);
}


/**
 * Add user-input marker capability
 */
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

function addMarker(arr, label){
  $.ajax({
    url: '/addMarker',
    contentType: "application/json",
    data: JSON.stringify({"lat" : arr[1], "lng" : arr[0], "label" : label}),
    dataType: 'json',
    type: 'POST',
    processData: false,
    success: function(result){
      console.log("Added");
    }
  });
}