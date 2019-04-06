'use strict'

var express = require('express');
var UserController = require('../controllers/recarga');
var RecargaController = require('../controllers/recarga');

var api = express.Router();

api.get('/test-controllers', UserController.test);
api.post('/recarga', RecargaController.DoRecarga);

module.exports = api;
