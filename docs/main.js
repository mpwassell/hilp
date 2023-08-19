window.onload = function(e){ 

    var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
        });

    var map = new ol.Map({
        layers: [raster],
        target: document.getElementById('map'),
        view: new ol.View({
        center: ol.proj.fromLonLat([0.1086709, 52.2507585]),
        zoom: 13
        })
    });
}
