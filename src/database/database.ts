import * as Models from './models/index';
const Waterline = require('waterline');
const waterline = new Waterline();

export default class Database {

    public ontology: any;

    constructor(waterlineConfig, cb?: () => void) {
        Models.all.forEach((model) => {
            console.info(`Initializing model: ${model.model.identity}`);
            waterline.loadCollection(model.collection())
        });
        waterline.initialize(waterlineConfig, (error, ontology) => {
            this.ontology = ontology;
            if (cb) {
                cb();
            }
        });
    }

    public getModel(identity): waterline.Model<any> {
        return this.ontology.collections[identity];
    }

}