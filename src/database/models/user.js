"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require('../model');
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        _super.apply(this, arguments);
        this.model = {
            identity: 'user',
            connection: 'default',
            attributes: {
                firstName: 'string',
                lastName: 'string',
            }
        };
    }
    UserModel.prototype.getByName = function (string) {
        return this.findOne().where({ firstName: string });
    };
    return UserModel;
}(model_1.DatabaseModel));
exports.UserModel = UserModel;
