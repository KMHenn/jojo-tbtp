var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-78.938728, 38.280510], "EPSG:3857"),
      zoom: 6
    })
});

var markers = new ol.Layer.Markers("Markers");
map.addLayer(markers);
var size = new ol.Size(21,25);
var offset = new ol.Pixel(-(size.w/2), -size.h);
var icon = new ol.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);
markers.addMarker(new ol.Marker(new ol.LonLat([-78.938728, 38.280510], "EPSG:3857"),icon));
markers.addMarker(new ol.Marker(new ol.LonLat([-78.938728, 38.280510], "EPSG:3857"),icon.clone()));