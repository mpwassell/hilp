import GeoJSON from 'ol/format/GeoJSON.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import SimpleMapApp from './SimpleMapApp.js'



import areaFeatures from './hilp_area.json';
import lineFeatures from './hilp_line.json';

window.onload = function(e) { 
  const areaOLFeatures = new GeoJSON({
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  }).readFeatures(areaFeatures);

  const vectorSource = new VectorSource({
      features: areaOLFeatures,
    });
  
  const lineOLFeatures = new GeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }).readFeatures(lineFeatures);  

  vectorSource.addFeatures(lineOLFeatures);

  const app = new SimpleMapApp(document,vectorSource);

  app.render();
}

