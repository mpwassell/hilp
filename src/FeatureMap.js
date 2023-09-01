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

export default class FeatureMap {


    constructor(element,vectorSource) {
        this.element = element;
        this.vectorSource = vectorSource;
    }

    getText(feature,resolution) {
        const name = feature.get('name');
        if(resolution < 7) return name;
        return name.trunc(4);
    };
      
    createTextStyle(feature,resolution) {
      
        return new Text({      
          text: this.getText(feature,resolution),
          font : "12px/1 Helvetica" ,
          overflow : true    ,
          backgroundFill: new Fill({color: '#ffffff'}),
        });
    }

      
    styleFunction(feature,resolution) {
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
              text : this.createTextStyle(feature,resolution)
            });
    };

    displayFeatureInfo (pixel, target) {
        const feature = target.closest('.ol-control')
            ? undefined
            : map.forEachFeatureAtPixel(pixel, function (feature) {
                  return feature;
                });
            if (feature) {
            info.style.left = pixel[0] + 'px';
            info.style.top = pixel[1] + 'px';
            if (feature !== currentFeature) {
                this.tooltip.setContent({'.tooltip-inner': feature.get('name')});
            }
            if (this.currentFeature) {
                this.tooltip.update();
            } else {
                this.tooltip.show();
            }
            } else {
                this.tooltip.hide();
            }
            this.currentFeature = feature;
        };

    render() {
        const vectorLayer = new VectorLayer({
            source: this.vectorSource,
            style: this.styleFunction.bind(this)
        });
    
        var raster = new TileLayer({
            source: new OSM()
        });
    

        //const info = this.element.getElementById('info');
        //info.style.pointerEvents = 'none';
        /*
        this.tooltip = new bootstrap.Tooltip(info, {
            animation: false,
            customClass: 'pe-none',
            offset: [0, 0],
            title: '-',
            trigger: 'manual',
        });
        */
    
        this.map = new Map({
            layers: [raster,vectorLayer],
            target: this.element,
            view: new View({
                center: fromLonLat([0.1086709, 52.2507585]),
                zoom: 13
            })
        });
    
        
    
        this.map.on('pointermove', function (evt) {
            if (evt.dragging) {
                //tooltip.hide();
                //currentFeature = undefined;
                return;
            }
            //const pixel = this.map.getEventPixel(evt.originalEvent);
            //console.log('pixel', pixel[0], ' ', pixel[1]);
            //displayFeatureInfo(pixel, evt.originalEvent.target);
        });
    
        this.map.on('click', function (evt) {
            //displayFeatureInfo(evt.pixel, evt.originalEvent.target);
        });
    
        /*
        this.map.getTargetElement().addEventListener('pointerleave', function () {
            //tooltip.hide();
            this.currentFeature = undefined;
        });
        */
    }

    highlightFeature(feature) {

        
    }
}

/**
 * @param {number} n The max number of characters to keep.
 * @return {string} Truncated string.
 */
String.prototype.trunc =
  String.prototype.trunc ||
  function (n) {
    return this.length > n ? this.substr(0, n - 1) + '...' : this.substr(0);
  };