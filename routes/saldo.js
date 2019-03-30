'use strict'

var express = require('express');
var UserController = require('../controllers/saldo');
var SaldoController = require('../controllers/saldo');

var api = express.Router();

api.get('/test-controllers', UserController.test);
api.post('/saldo', SaldoController.asignar_saldo);

module.exports = api;
