"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var index_1 = require('./routes/index');
var database_1 = require('./database/database');
var optional = require("optional");
var config = optional('../config.json');
var Server = (function () {
    function Server(production) {
        Server.instance = this;
        Server.app = express();
        Server.app.use(bodyParser.json());
        Server.app.use(bodyParser.urlencoded({ extended: false }));
        if (production) {
            Server.configureDevelopment();
        }
        else {
            Server.configureProduction();
        }
        Server.app.use('/', index_1.default);
        Server.database = new database_1.default(production ? Server.getDBConfigProd() : Server.getDBConfigDev());
    }
    Server.getDBConfigDev = function () {
        return {
            adapters: {
                'memory': require('sails-memory')
            },
            connections: {
                default: {
                    adapter: 'memory'
                }
            }
        };
    };
    Server.getDBConfigProd = function () {
        return {
            adapters: {
                'mongo': require('sails-mongo')
            },
            connections: {
                default: {
                    adapter: 'mongo',
                    host: process.env.DB_HOST,
                    port: process.env.DB_PORT,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME // or omit if not relevant
                }
            }
        };
    };
    Server.configureDevelopment = function () {
        Server.app.use(function (err, req, res, next) {
            res.status(err['status'] || 500);
            res.render('error', {
                title: 'error',
                message: err.message,
                error: err
            });
        });
    };
    Server.configureProduction = function () {
        Server.app.use(function (err, req, res, next) {
            res.status(err['status'] || 500);
            res.render('error', {
                title: 'error',
                message: err.message,
                error: {}
            });
        });
    };
    return Server;
}());
exports.Server = Server;
