"use strict";
var server_1 = require('../server');
var Waterline = require('waterline');
var DatabaseModel = (function () {
    function DatabaseModel() {
    }
    DatabaseModel.prototype.collection = function () {
        return Waterline.Collection.extend(this.model);
    };
    DatabaseModel.prototype.proxy = function () {
        return server_1.Server.database.getModel(this.model.identity);
    };
    DatabaseModel.prototype.create = function (params) {
        return this.proxy().create(params);
    };
    DatabaseModel.prototype.find = function (criteria) {
        return this.proxy().find(criteria);
    };
    DatabaseModel.prototype.findOne = function (criteria) {
        return this.proxy().findOne(criteria);
    };
    DatabaseModel.prototype.count = function (criteria) {
        return this.proxy().count(criteria);
    };
    DatabaseModel.prototype.destroy = function (criteria) {
        return this.proxy().destroy(criteria);
    };
    DatabaseModel.prototype.update = function (criteria, changes) {
        return this.proxy().update(criteria, changes);
    };
    DatabaseModel.prototype.query = function (sqlQuery, cb) {
        return this.proxy().query(sqlQuery, cb);
    };
    DatabaseModel.prototype.native = function (cb) {
        return this.proxy().native(cb);
    };
    DatabaseModel.prototype.stream = function (criteria, writeEnd) {
        return this.proxy().stream(criteria, writeEnd);
    };
    return DatabaseModel;
}());
exports.DatabaseModel = DatabaseModel;
