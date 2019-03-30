'use strict'

var express = require('express');
var UserController = require('../controllers/ip');
var IpController = require('../controllers/ip');

var api = express.Router();

api.get('/test-controllers', UserController.test);
api.get('/ip', IpController.getip_black);

module.exports = api;
