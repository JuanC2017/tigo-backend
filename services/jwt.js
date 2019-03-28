'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_usuario';
var secretCliente = 'clave_cliente';

exports.createToken = function(user){
  var payload = {
    sub: user._id,
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    password: user.password,
    cell: user.cell,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payload, secret);

};

exports.createToken = function(cliente){
  var payload = {
    sub: cliente._id,
    name: cliente.name,
    lastname: cliente.lastname,
    username: cliente.username,
    email: cliente.email,
    password: cliente.password,
    cell: cliente.cell,
    porc_tigo: cliente.porc_tigo,
    user: cliente.user,
    rol: cliente.rol,
    efecty: cliente.efecty,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payload, secretCliente);

};
