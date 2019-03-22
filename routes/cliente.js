'use strict'

var express = require('express');
var UserController = require('../controllers/cliente');

var api = express.Router();

api.get('/test-controllers', UserController.test);

module.exports = api;
