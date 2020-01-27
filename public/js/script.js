var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-78.938728, 38.280510], "EPSG:3857"),
      zoom: 4
    })
});

var markers = new OpenLayers.Layer.Markers("Markers");
map.addLayer(markers);
var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat([-78.938728, 38.280510], "EPSG:3857"),icon));