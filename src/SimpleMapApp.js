
import FeatureMap from './FeatureMap.js';
import FeatureTable from './FeatureTable.js';
import $ from 'jquery';


export default class SimpleFeatureMapApp {

    constructor(element, vectorSource ) {
        this.element = element;
        this.vectorSource = vectorSource;


        this.map = new FeatureMap( $('#map')[0],this.vectorSource);
        this.table = new FeatureTable( $('#features'), this.vectorSource,
        { onHover : this.map.highlightFeature.bind(this.map)});
     

    }
    render() {

      this.map.render();
      this.table.render();   
              
    }


}