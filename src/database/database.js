"use strict";
var Models = require('./models/index');
var Waterline = require('waterline');
var waterline = new Waterline();
var Database = (function () {
    function Database(waterlineConfig) {
        var _this = this;
        Models.all.forEach(function (model) {
            console.info("Initializing model: " + model.model.identity);
            waterline.loadCollection(model.collection());
        });
        waterline.initialize(waterlineConfig, function (error, ontology) {
            _this.ontology = ontology;
        });
    }
    Database.prototype.getModel = function (identity) {
        return this.ontology[identity];
    };
    return Database;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Database;
