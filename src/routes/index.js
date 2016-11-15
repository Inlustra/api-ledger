'use strict';
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
