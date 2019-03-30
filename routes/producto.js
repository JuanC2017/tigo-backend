'use strict'

var express = require('express');
var UserController = require('../controllers/producto');
var ProductoController = require('../controllers/producto');

var api = express.Router();

api.get('/test-controllers', UserController.test);
api.post('/registrar-producto', ProductoController.createProducto);
api.put('/actualizar-procducto/:id', ProductoController.updateProducto);
api.get('/listar-productos', ProductoController.getProductos);
api.get('/listar-producto', ProductoController.getProducto);
api.delete('/producto/:id', ProductoController.deleteProducto);

module.exports = api;
