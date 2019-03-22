'use strict'

var express = require('express');
var UserController = require('../controllers/saldo');

var api = express.Router();

api.get('/test-controllers', UserController.test);

module.exports = api;
