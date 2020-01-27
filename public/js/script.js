var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-78.938728, 38.280510], "EPSG:3857"),
      zoom: 8
    })
});

var iconFeatures = [];

var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.transform([-78.938728, 38.280510], 'EPSG:4326',     
  'EPSG:3857')),
  name: 'Null Island',
  population: 4000,
  rainfall: 500
});

iconFeatures.push(iconFeature);

var vectorSource = new ol.source.Vector({
  features: iconFeatures //add an array of features
});

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'data/icon.png'
  }))
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: iconStyle
});