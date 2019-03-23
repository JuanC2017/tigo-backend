'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var api = express.Router();

api.get('/test-controllers', middlewares.ensureAuth, ClienteController.test);
api.post('/register', ClienteController.saveCliente);
api.post('/login', ClienteController.login);
api.put('/actualizar-cliente/:id', middlewares.ensureAuth, ClienteController.updateCliente);
api.get('/listar-clientes', ClienteController.getListarCliente);

module.exports = api;
