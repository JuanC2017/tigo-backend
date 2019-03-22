'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas
var user_routes = require('./routes/user');
var cliente_routes = require('./routes/cliente');
var producto_routes = require('./routes/producto');
var saldo_routes = require('./routes/saldo');
var reportar_routes = require('./routes/reportar');

//middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabecera y cors


//rutas base
app.use('/api', user_routes);
app.use('/apic', cliente_routes);
app.use('/apip', producto_routes);
app.use('/apis', saldo_routes);
app.use('/apir', reportar_routes);



module.exports = app;
