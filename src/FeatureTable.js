import $ from 'jquery';

export default class FeatureTable {


    constructor(element,features,options) {
        this.element = element;
        this.features = features;
        this.onHover = options['onHover'];
        this.onClick = options['onClick'];
    }
    
    
    render() {
        
        const features = this.features.getFeatures();
        features.sort( (f1,f2) => f1.get("name").localeCompare(f2.get("name")));

        // Add features to table and add hover over callback
        features.map( feature => {
            const name = feature.get('name');
            const row = $(`<tr><td>${name}</td></tr>`);
            row.on('mouseenter', e => this.onHover(feature,true));
            row.on('mouseleave', e => this.onHover(feature,false));
            row.on('click', e => this.onClick(feature));
          
            this.element.append(row);
        });


    }

}