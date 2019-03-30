'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');
var middlewares = require('../middlewares/authenticate');

var api = express.Router();

api.get('/test-controllers', middlewares.ensureAuth, ClienteController.test);
api.post('/register', ClienteController.saveCliente);
api.post('/login', ClienteController.login);
api.put('/actualizar-cliente/:id', middlewares.ensureAuth, ClienteController.updateCliente);
api.get('/listar-clientes', ClienteController.getListarCliente);
api.get('/listar-cliente/:id', ClienteController.getCliente);
api.delete('/cliente/:id', middlewares.ensureAuth, ClienteController.deleteCliente);

module.exports = api;
