'use strict'

var express = require('express');
var UserController = require('../controllers/reportar');
var ReporteController = require('../controllers/reportar');

var api = express.Router();

api.get('/test-controllers', UserController.test);
api.get('/reportes', ReporteController.getReportes);
api.get('/reporte/:id', ReporteController.getReporte);
api.post('/registrar-reporte', ReporteController.createReporte);


module.exports = api;
