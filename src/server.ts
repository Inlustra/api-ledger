import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import index from './routes/index';
import Database from './database/database';
import { User } from './database/models/index';

export class Server {

    public static app: express.Express;
    public static database: Database;

    static init(production: boolean) {
        Server.app = express();
        Server.app.use(logger('dev'));

        Server.app.use(bodyParser.json());
        Server.app.use(bodyParser.urlencoded({extended: false}));
        if (production) {
            Server.configureDevelopment();
        } else {
            Server.configureProduction();
        }
        Server.app.use('/', index);
        Server.database = new Database(production ? Server.getDBConfigProd() : Server.getDBConfigDev(), () => {
            console.info('Database setup complete');
            User.create({
                firstName: "tom",
                lastName: "Nairn"
            }).then(function() {
                User.getByName('tom').then(console.log);
            })
        });

    }

    static getDBConfigDev() {
        return {
            adapters: {
                'memory': require('sails-memory')
            },
            connections: {
                default: {
                    adapter: 'memory'
                }
            }
        }
    }

    static getDBConfigProd() {
        return {
            adapters: {
                'mongo': require('sails-mongo')
            },
            connections: {
                default: {
                    adapter: 'mongo',
                    host: process.env.DB_HOST, // defaults to `localhost` if omitted
                    port: process.env.DB_PORT, // defaults to 27017 if omitted
                    user: process.env.DB_USERNAME, // or omit if not relevant
                    password: process.env.DB_PASSWORD, // or omit if not relevant
                    database: process.env.DB_NAME // or omit if not relevant
                }
            }
        }
    }

    static configureDevelopment() {
        Server.app.use((err: Error, req, res, next) => {
            res.status(err['status'] || 500);
            res.render('error', {
                title: 'error',
                message: err.message,
                error: err
            });
        });
    }

    static configureProduction() {
        Server.app.use((err: Error, req, res, next) => {
            res.status(err['status'] || 500);
            res.render('error', {
                title: 'error',
                message: err.message,
                error: {}
            });
        });
    }

}