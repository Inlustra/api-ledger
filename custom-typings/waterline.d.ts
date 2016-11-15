declare module waterline {

    export interface ModelInstance {
        id?: number | string;
        createdAt?: Date;
        updatedAt?: Date;
        destroy(): Promise<this>;
        toJSON(): any;
        save(): WaterlinePromise<this>;
    }

    export interface Model<instance extends ModelInstance> {
        create(params: any): WaterlinePromise<instance>;
        create(params: any[]): WaterlinePromise<instance>;

        find(): QueryBuilder<instance[]>;
        find(criteria: any): QueryBuilder<instance[]>;

        findOne(criteria: any): QueryBuilder<instance>;
        findOne(criteria: string): QueryBuilder<instance>;
        findOne(criteria: number): QueryBuilder<instance>;
        findOne(): QueryBuilder<instance>;


        count(criteria: any): WaterlinePromise<number>;
        count(criteria: any[]): WaterlinePromise<number>;
        count(criteria: string): WaterlinePromise<number>;
        count(criteria: number): WaterlinePromise<number>;

        destroy(criteria: any): WaterlinePromise<instance[]>;
        destroy(criteria: any[]): WaterlinePromise<instance[]>;
        destroy(criteria: string): WaterlinePromise<instance[]>;
        destroy(criteria: number): WaterlinePromise<instance[]>;

        update(criteria: any, changes: any): WaterlinePromise<instance[]>;
        update(criteria: any, changes: any[]): WaterlinePromise<instance[]>;
        update(criteria: any[], changes: any): WaterlinePromise<instance[]>;
        update(criteria: any[], changes: any[]): WaterlinePromise<instance[]>;
        update(criteria: string, changes: any): WaterlinePromise<instance[]>;
        update(criteria: string, changes: any[]): WaterlinePromise<instance[]>;
        update(criteria: number, changes: any): WaterlinePromise<instance[]>;
        update(criteria: number, changes: any[]): WaterlinePromise<instance[]>;


        query(sqlQuery: string, cb: (err: Error, results: any[]) => void);

        native(cb: (err: Error, collection: any) => void);

        stream(criteria: any, writeEnd: any): NodeJS.WritableStream;
        stream(criteria: any[], writeEnd: any): NodeJS.WritableStream;
        stream(criteria: string, writeEnd: any): NodeJS.WritableStream;
        stream(criteria: number, writeEnd: any): NodeJS.WritableStream;

        stream(criteria: any, writeEnd: any): Error;
        stream(criteria: any[], writeEnd: any): Error;
        stream(criteria: string, writeEnd: any): Error;
        stream(criteria: number, writeEnd: any): Error;
    }


    export class WaterlinePromise<T> extends Promise<T>{
        exec(cb: (err: Error, result: T) => void);
    }

    export interface QueryBuilder<T> extends WaterlinePromise<T> {
        where(condition: any): QueryBuilder<T>;
        limit(lim: number): QueryBuilder<T>;
        skip(num: number): QueryBuilder<T>;
        sort(criteria: string): QueryBuilder<T>;
        paginate(pagination?: { page: number, limit: number }): QueryBuilder<T>;
        populate(association: string): QueryBuilder<T>;
        populate(association: string, filter: any): QueryBuilder<T>;
    }

    export interface ModelDefinition<Instance extends ModelInstance, InstanceAttributes extends AttributeCollection> extends LifecycleCallbacks<Instance> {
        identity?: string;
        globalId?: string;
        connection?: string;
        attributes: InstanceAttributes;
        migrate?: string;
        autoPK?: boolean;
        autoCreatedAt?: boolean;
        autoUpdatedAt?: boolean;
        schema?: boolean;
        tableName?: string;
        types?: Dictionary<Function>;
    }

    export interface LifecycleCallbacks<Instance extends ModelInstance> {
        beforeValidate?: { (vaues: any, next: Function): void }[] | { (vaues: any, next: Function): void };
        beforeCreate?: { (values: any, next: Function): void }[] | { (vaues: any, next: Function): void };
        afterCreate?: { (newlyCreatedRecord: Instance, next: Function): void }[] | { (newlyCreatedRecord: Instance, next: Function): void };
        beforeUpdate?: { (valuesToUpdate: any, next: Function): void }[] | { (valuesToUpdate: any, next: Function): void };
        afterUpdate?: { (valuesToUpdate: any, next: Function): void }[] | { (valuesToUpdate: any, next: Function): void };
        beforeDestroy?: { (criteria: any, next: Function): void }[] | { (valuesToUpdate: any, next: Function): void };
        afterDestroy?: { (destroyedInstance: Instance, next: Function): void }[] | { (destroyedInstance: Instance, next: Function): void };
    }

    export interface Dictionary<T> {
        [k: string]: T
    }

    export interface AttributeCollection {
        [attributeName: string]: Attribute | Function;
    }

    export interface Attribute extends AttributeObject, AttributeValidations, Dictionary<any> { }

    /**
     * Attribute Properties https://github.com/balderdashy/waterline-docs/blob/master/models/data-types-attributes.md#attribute-properties
     */
    export interface AttributeObject {
        type: string,
        defaultsTo?: any,
        autoIncrement?: boolean,
        unique?: boolean,
        index?: boolean,
        primaryKey?: boolean,
        enum?: any[],
        size?: number,
        columnName?: string,
        special?: boolean,
        model?: string;
        collection?: string;
        via?: string;
        dominant?: boolean;
    }

    /**
     * Validation settings https://github.com/balderdashy/waterline-docs/blob/master/models/validations.md#validation-rules
     * Based on Anchor validations https://github.com/sailsjs/anchor/blob/master/lib/match/rules.js
     */
    export interface AttributeValidations {
        after?: string,
        alpha?: boolean,
        alphanumeric?: boolean,
        array?: boolean,
        before?: string,
        boolean?: boolean,
        contains?: string,
        creditcard?: boolean,
        date?: boolean,
        decimal?: boolean,
        email?: boolean,
        empty?: boolean,
        equals?: string,
        falsey?: boolean,
        finite?: boolean,
        float?: boolean,
        hexColor?: boolean,
        hexadecimal?: boolean,
        in?: string[],
        int?: boolean,
        integer?: boolean,
        ip?: boolean,
        ipv4?: boolean,
        ipv6?: boolean,
        is?: RegExp,
        len?: number,
        lowercase?: boolean,
        max?: number,
        maxLength?: number
        min?: number,
        minLength?: number,
        not?: RegExp,
        notContains?: string,
        notEmpty?: boolean,
        notIn?: string[],
        notNull?: boolean,
        notRegex?: RegExp,
        null?: boolean,
        number?: boolean,
        numeric?: boolean,
        regex?: RegExp,
        required?: boolean,
        string?: boolean,
        truthy?: boolean,
        undefined?: boolean,
        uppercase?: boolean,
        url?: boolean,
        urlish?: boolean,
        uuid?: boolean,
        uuidv3?: boolean,
        uuidv4?: boolean,
    }
}


declare module 'waterline' {
    export = waterline;
}