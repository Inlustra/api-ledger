import Database from './database';
import ModelInstance = waterline.ModelInstance;
import WaterlinePromise = waterline.WaterlinePromise;
import Model = waterline.Model;
import { Server } from '../server';

const Waterline = require('waterline');

export abstract class DatabaseModel<T extends ModelInstance> implements Model<T> {

    abstract model: any;

    public collection() {
        return Waterline.Collection.extend(this.model);
    }

    protected proxy(): waterline.Model<T> {
        return Server.database.getModel(this.model.identity);
    }

    create(params: any): waterline.WaterlinePromise<T>;
    create(params: any[]): waterline.WaterlinePromise<T>;
    create(params): waterline.WaterlinePromise<T> {
        return this.proxy().create(params);
    }

    find(): waterline.QueryBuilder<T[]>;
    find(criteria: any): waterline.QueryBuilder<T[]>;
    find(criteria?: any): waterline.QueryBuilder<T[]> {
        return this.proxy().find(criteria);
    }

    findOne(criteria: any): waterline.QueryBuilder<T>;
    findOne(criteria: string): waterline.QueryBuilder<T>;
    findOne(criteria: number): waterline.QueryBuilder<T>;
    findOne(): waterline.QueryBuilder<T>;
    findOne(criteria?): waterline.QueryBuilder<T> {
        return this.proxy().findOne(criteria);
    }

    count(criteria: any): waterline.WaterlinePromise<number>;
    count(criteria: any[]): waterline.WaterlinePromise<number>;
    count(criteria: string): waterline.WaterlinePromise<number>;
    count(criteria: number): waterline.WaterlinePromise<number>;
    count(criteria): waterline.WaterlinePromise<number> {
        return this.proxy().count(criteria);
    }

    destroy(criteria: any): waterline.WaterlinePromise<T[]>;
    destroy(criteria: any[]): waterline.WaterlinePromise<T[]>;
    destroy(criteria: string): waterline.WaterlinePromise<T[]>;
    destroy(criteria: number): waterline.WaterlinePromise<T[]>;
    destroy(criteria): waterline.WaterlinePromise<T[]> {
        return this.proxy().destroy(criteria);
    }

    update(criteria: any, changes: any): waterline.WaterlinePromise<T[]>;
    update(criteria: any, changes: any[]): waterline.WaterlinePromise<T[]>;
    update(criteria: any[], changes: any): waterline.WaterlinePromise<T[]>;
    update(criteria: any[], changes: any[]): waterline.WaterlinePromise<T[]>;
    update(criteria: string, changes: any): waterline.WaterlinePromise<T[]>;
    update(criteria: string, changes: any[]): waterline.WaterlinePromise<T[]>;
    update(criteria: number, changes: any): waterline.WaterlinePromise<T[]>;
    update(criteria: number, changes: any[]): waterline.WaterlinePromise<T[]>;
    update(criteria, changes): waterline.WaterlinePromise<T[]> {
        return this.proxy().update(criteria, changes);
    }

    query(sqlQuery: string, cb: (err: Error, results: any[])=>void) {
        return this.proxy().query(sqlQuery, cb);
    }

    native(cb: (err: Error, collection: any)=>void) {
        return this.proxy().native(cb);
    }

    stream(criteria: any, writeEnd: any): NodeJS.WritableStream;
    stream(criteria: any[], writeEnd: any): NodeJS.WritableStream;
    stream(criteria: string, writeEnd: any): NodeJS.WritableStream;
    stream(criteria: number, writeEnd: any): NodeJS.WritableStream;
    stream(criteria: any, writeEnd: any): Error;
    stream(criteria: any[], writeEnd: any): Error;
    stream(criteria: string, writeEnd: any): Error;
    stream(criteria: number, writeEnd: any): Error;
    stream(criteria, writeEnd: any): any {
        return this.proxy().stream(criteria, writeEnd);
    }

}