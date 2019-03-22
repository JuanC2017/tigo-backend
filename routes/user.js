'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var middlewares = require('../middlewares/authenticate');

var api = express.Router();

api.get('/test-controllers', middlewares.ensureAuth, UserController.test);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);


module.exports = api;
