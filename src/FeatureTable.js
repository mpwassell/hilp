import {$,jQuery} from 'jquery';

export default class FeatureTable {


    constructor(element,features,options) {
        this.element = element;
        this.features = features;
        this.onHover = options['onHover'];
    }
    
    
    render() {

        // Add features to table and add hover over callback
        this.features.getFeatures().map( feature => {
            this.element.append(`<tr><td>${feature.get('name')}</td><td/></tr>`);
        });
    }

}