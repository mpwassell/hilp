import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Feature from 'ol/Feature.js';
import { fromLonLat } from 'ol/proj';
import { Circle } from 'ol/geom';
//import { Tooltip } from 'bootstrap';

import geojsonObject from './data.js';

const getText = function(feature) {
  return feature.get('name');
};

const createTextStyle = function(feature) {

  return new Text({      
    text: getText(feature),
    font : "bold 10px/1 Verdana" ,
    overflow : true      
  });
}

const styleFunction = function(feature) {
  console.log(feature.getGeometry().getType());
    return new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [],
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
        text : createTextStyle(feature)
      });

};

const features = new GeoJSON({
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857'
}).readFeatures(geojsonObject);

const vectorSource = new VectorSource({
    features: features,
  });
  


vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));      
  
const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
  });

var raster = new TileLayer({
    source: new OSM()
    });


const fillTable = function() {
    document.getElementById('header');

}

window.onload = function(e){ 

  const info = document.getElementById('info');
info.style.pointerEvents = 'none';
/*
const tooltip = new bootstrap.Tooltip(info, {
  animation: false,
  customClass: 'pe-none',
  offset: [0, 0],
  title: '-',
  trigger: 'manual',
});
*/

var map = new Map({
  layers: [raster,vectorLayer],
  target: document.getElementById('map'),
  view: new View({
  center: fromLonLat([0.1086709, 52.2507585]),
  zoom: 13
  })
});

  let currentFeature;
  const displayFeatureInfo = function (pixel, target) {
    const feature = target.closest('.ol-control')
      ? undefined
      : map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature;
        });
    if (feature) {
      info.style.left = pixel[0] + 'px';
      info.style.top = pixel[1] + 'px';
      if (feature !== currentFeature) {
        tooltip.setContent({'.tooltip-inner': feature.get('name')});
      }
      if (currentFeature) {
        tooltip.update();
      } else {
        tooltip.show();
      }
    } else {
      tooltip.hide();
    }
    currentFeature = feature;
  };

  map.on('pointermove', function (evt) {
    if (evt.dragging) {
      tooltip.hide();
      currentFeature = undefined;
      return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    //console.log('pixel', pixel[0], ' ', pixel[1]);
    //displayFeatureInfo(pixel, evt.originalEvent.target);
  });

  map.on('click', function (evt) {
    //displayFeatureInfo(evt.pixel, evt.originalEvent.target);
  });

  map.getTargetElement().addEventListener('pointerleave', function () {
    //tooltip.hide();
    currentFeature = undefined;
  });

  fillTable();
}
