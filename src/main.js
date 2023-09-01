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

const geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:4326',
      },
    },
    'features': [
      { "type": "Feature", "properties": { "fid": 2, "name": "Girton Bridle Path" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.094777, 52.2503258 ], [ 0.094905, 52.2504226 ], [ 0.0917677, 52.2510101 ], [ 0.0916033, 52.2509151 ], [ 0.089331, 52.2494191 ], [ 0.088435, 52.2488245 ], [ 0.0865759, 52.2495109 ], [ 0.0858779, 52.2485927 ], [ 0.0855052, 52.2481863 ], [ 0.0846845, 52.2476852 ], [ 0.0848213, 52.2476135 ], [ 0.085553, 52.2480083 ], [ 0.0859551, 52.2483787 ], [ 0.0866871, 52.2492837 ], [ 0.0883146, 52.248636 ], [ 0.0884489, 52.2486615 ], [ 0.0896435, 52.2494644 ], [ 0.091763, 52.2508868 ], [ 0.094777, 52.2503258 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 3, "name": "Girton Wood West" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0959421, 52.2512138 ], [ 0.0929275, 52.2489074 ], [ 0.0909921, 52.2485197 ], [ 0.0900081, 52.2476618 ], [ 0.0894317, 52.2476576 ], [ 0.0877046, 52.246469 ], [ 0.0878805, 52.2463925 ], [ 0.089537, 52.2475654 ], [ 0.0900544, 52.2475768 ], [ 0.0911194, 52.2484616 ], [ 0.0930581, 52.2488248 ], [ 0.0931078, 52.2488422 ], [ 0.0960266, 52.2511607 ], [ 0.0959421, 52.2512138 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 4, "name": "Cambridge Rd to Girton" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.1078188, 52.2306046 ], [ 0.1113888, 52.2308099 ], [ 0.1113979, 52.2309197 ], [ 0.1108563, 52.2309009 ], [ 0.107791, 52.2306854 ], [ 0.1071396, 52.230274 ], [ 0.105917, 52.2295551 ], [ 0.1036377, 52.228284 ], [ 0.101348, 52.227219 ], [ 0.0992968, 52.2262532 ], [ 0.0994039, 52.2261394 ], [ 0.0994517, 52.2261053 ], [ 0.0995612, 52.22615 ], [ 0.1037562, 52.2282028 ], [ 0.1078188, 52.2306046 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 5, "name": "Mere Way Bridle Way" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.1299542, 52.2358538 ], [ 0.1302223, 52.2357784 ], [ 0.1424854, 52.2492791 ], [ 0.142562, 52.2496165 ], [ 0.1428083, 52.2500213 ], [ 0.1437157, 52.251047 ], [ 0.1455098, 52.2529658 ], [ 0.1458016, 52.2532683 ], [ 0.1460269, 52.2535103 ], [ 0.1458892, 52.2535491 ], [ 0.1456893, 52.2532988 ], [ 0.1454047, 52.2529969 ], [ 0.1436252, 52.251078 ], [ 0.1426942, 52.2500634 ], [ 0.1424207, 52.2496631 ], [ 0.1423043, 52.2493457 ], [ 0.1423043, 52.2493457 ], [ 0.1299542, 52.2358538 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 6, "name": "Gatehouse - Westwick - Bridle Way" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0836213, 52.2523961 ], [ 0.0835638, 52.2526223 ], [ 0.0835656, 52.2527898 ], [ 0.0825821, 52.2538326 ], [ 0.0797457, 52.2572236 ], [ 0.079472, 52.2600773 ], [ 0.0789012, 52.2608873 ], [ 0.0784312, 52.2614094 ], [ 0.07808, 52.2615233 ], [ 0.0780059, 52.2616429 ], [ 0.0780475, 52.2616784 ], [ 0.0780366, 52.2617072 ], [ 0.077954, 52.2616421 ], [ 0.0780112, 52.2615208 ], [ 0.0783243, 52.2613922 ], [ 0.0788034, 52.2608795 ], [ 0.0794039, 52.2600724 ], [ 0.0796732, 52.2572114 ], [ 0.0825097, 52.2538215 ], [ 0.0834316, 52.252823 ], [ 0.0834352, 52.2526445 ], [ 0.0834728, 52.252354 ], [ 0.0836213, 52.2523961 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 7, "name": "Guns Way - Bridle Path" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.1035542, 52.2580364 ], [ 0.1029384, 52.2585464 ], [ 0.1026563, 52.2587238 ], [ 0.1019012, 52.2591393 ], [ 0.1008317, 52.2601817 ], [ 0.100243, 52.2606606 ], [ 0.0999086, 52.2608211 ], [ 0.0988658, 52.2613925 ], [ 0.0984795, 52.2616007 ], [ 0.0972556, 52.2622705 ], [ 0.0964016, 52.2627539 ], [ 0.0958772, 52.2633281 ], [ 0.0953746, 52.263797 ], [ 0.0952949, 52.2642471 ], [ 0.0944662, 52.2650167 ], [ 0.094075, 52.2653445 ], [ 0.0931381, 52.2659284 ], [ 0.0930874, 52.2658852 ], [ 0.0940026, 52.2653171 ], [ 0.0943752, 52.2649923 ], [ 0.0948194, 52.2645514 ], [ 0.0951971, 52.2642205 ], [ 0.0952623, 52.2637926 ], [ 0.0957577, 52.2632904 ], [ 0.0963074, 52.2627273 ], [ 0.0971541, 52.2622351 ], [ 0.098422, 52.2615411 ], [ 0.0998572, 52.2607814 ], [ 0.1001706, 52.2606207 ], [ 0.100694, 52.2601462 ], [ 0.1017192, 52.2591099 ], [ 0.1020776, 52.2589123 ], [ 0.1025454, 52.2586539 ], [ 0.1028515, 52.2584843 ], [ 0.1034528, 52.2579588 ], [ 0.1035542, 52.2580364 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 8, "name": "Community Orchard" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0987227, 52.2494998 ], [ 0.0995305, 52.2489587 ], [ 0.1002949, 52.2495819 ], [ 0.0999308, 52.249716 ], [ 0.0995052, 52.2497471 ], [ 0.0990234, 52.2496562 ], [ 0.0987227, 52.2494998 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 9, "name": "Holiday Inn Field" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.1135207, 52.2410769 ], [ 0.1131657, 52.2402074 ], [ 0.1137525, 52.2401142 ], [ 0.1136366, 52.2393911 ], [ 0.1150132, 52.2390672 ], [ 0.114477, 52.2379181 ], [ 0.1206063, 52.2366225 ], [ 0.1213888, 52.2384283 ], [ 0.1158681, 52.2403227 ], [ 0.1135207, 52.2410769 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 10, "name": "WI Woods" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0960493, 52.2510777 ], [ 0.0947089, 52.2499866 ], [ 0.0970998, 52.249033 ], [ 0.0981431, 52.248687 ], [ 0.0992371, 52.248545 ], [ 0.0994037, 52.2487757 ], [ 0.0960493, 52.2510777 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 11, "name": "Croft Close Set-Aside" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0999688, 52.2607149 ], [ 0.0994834, 52.25991 ], [ 0.099382, 52.2581982 ], [ 0.1019322, 52.2577016 ], [ 0.1028234, 52.2584954 ], [ 0.1017077, 52.2591096 ], [ 0.0999688, 52.2607149 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 12, "name": "Girton Wood East" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0965541, 52.2491523 ], [ 0.0961846, 52.2487864 ], [ 0.0944399, 52.247032 ], [ 0.0935356, 52.2472774 ], [ 0.093349, 52.2472458 ], [ 0.0930855, 52.2470977 ], [ 0.093081, 52.2469314 ], [ 0.0919109, 52.2457121 ], [ 0.0884586, 52.2423901 ], [ 0.0885093, 52.2423704 ], [ 0.0919605, 52.2456885 ], [ 0.0931421, 52.2469145 ], [ 0.0931724, 52.2470894 ], [ 0.0934333, 52.2472114 ], [ 0.0944802, 52.2469125 ], [ 0.0945657, 52.2469854 ], [ 0.096689, 52.249098 ], [ 0.0965541, 52.2491523 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 13, "name": "Guided Busway Verges" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0795229, 52.2622434 ], [ 0.0907677, 52.2546028 ], [ 0.1093836, 52.24254 ], [ 0.11063, 52.2421422 ], [ 0.130034, 52.2357436 ], [ 0.1300632, 52.2357873 ], [ 0.1106748, 52.2421819 ], [ 0.1094551, 52.2425721 ], [ 0.0908316, 52.2546366 ], [ 0.0799214, 52.2620228 ], [ 0.0799214, 52.2620228 ], [ 0.0796207, 52.2623066 ], [ 0.0795229, 52.2622434 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 14, "name": "Long Meadow" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0936127, 52.2559706 ], [ 0.0932287, 52.2552344 ], [ 0.0965687, 52.254201 ], [ 0.0968947, 52.2546978 ], [ 0.0952356, 52.2551723 ], [ 0.0936127, 52.2559706 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 15, "name": "Rec" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.1123592, 52.2445935 ], [ 0.1119173, 52.2438749 ], [ 0.112975, 52.2425351 ], [ 0.114127, 52.2427348 ], [ 0.1154311, 52.242422 ], [ 0.114482, 52.2412153 ], [ 0.1154673, 52.2408915 ], [ 0.1163005, 52.2415791 ], [ 0.1164744, 52.2421758 ], [ 0.1169236, 52.2434534 ], [ 0.1123592, 52.2445935 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 16, "name": "Manor Field" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.097842, 52.2507537 ], [ 0.0976572, 52.2501616 ], [ 0.0986878, 52.2495051 ], [ 0.0990066, 52.2496737 ], [ 0.0994884, 52.2497557 ], [ 0.0999412, 52.2497269 ], [ 0.1003134, 52.2495938 ], [ 0.1007699, 52.2499708 ], [ 0.1003397, 52.2500817 ], [ 0.0995029, 52.2502946 ], [ 0.0991642, 52.250461 ], [ 0.097842, 52.2507537 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 17, "name": "St Audrey's to New School Rd" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0974734, 52.252346 ], [ 0.0968397, 52.2510998 ], [ 0.0968705, 52.2510277 ], [ 0.098477, 52.2505822 ], [ 0.0991459, 52.2504259 ], [ 0.0994838, 52.250277 ], [ 0.099504, 52.250274 ], [ 0.1008438, 52.2499218 ], [ 0.1040721, 52.2491974 ], [ 0.1035456, 52.2484566 ], [ 0.103523, 52.2484228 ], [ 0.1036086, 52.248396 ], [ 0.1036294, 52.2484183 ], [ 0.1036135, 52.2484402 ], [ 0.1041613, 52.2491967 ], [ 0.1040931, 52.2492278 ], [ 0.1008673, 52.2499534 ], [ 0.0995227, 52.250307 ], [ 0.0991748, 52.2504736 ], [ 0.0985033, 52.2506216 ], [ 0.0968947, 52.2510901 ], [ 0.0975676, 52.2523349 ], [ 0.0974734, 52.252346 ] ] ] } },
      { "type": "Feature", "properties": { "fid": 18, "name": "Path from Croft Close Set-Aside to Westwick\n" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0.0993805, 52.2586628 ], [ 0.0927961, 52.259831 ], [ 0.0926698, 52.2598429 ], [ 0.0914548, 52.2589144 ], [ 0.0902073, 52.2593585 ], [ 0.0840889, 52.2615115 ], [ 0.0821873, 52.262033 ], [ 0.08011, 52.2630777 ], [ 0.0800376, 52.2630178 ], [ 0.0821235, 52.2619637 ], [ 0.0840353, 52.2614333 ], [ 0.0901449, 52.2592867 ], [ 0.0915173, 52.2588008 ], [ 0.0927241, 52.2597157 ], [ 0.099366, 52.2584943 ], [ 0.0993805, 52.2586628 ] ] ] } }
    ]        
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
const tooltip = new bootstrap.Tooltip(info, {
  animation: false,
  customClass: 'pe-none',
  offset: [0, 0],
  title: '-',
  trigger: 'manual',
});

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
    console.log('pixel', pixel[0], ' ', pixel[1]);
    displayFeatureInfo(pixel, evt.originalEvent.target);
  });

  map.on('click', function (evt) {
    displayFeatureInfo(evt.pixel, evt.originalEvent.target);
  });

  map.getTargetElement().addEventListener('pointerleave', function () {
    tooltip.hide();
    currentFeature = undefined;
  });

  fillTable();
}
