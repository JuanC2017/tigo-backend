'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_usuario';

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
