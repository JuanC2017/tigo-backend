'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_usuario';

exports.ensureAuth = function(req, res, next){
  if (!req.headers.authorization) {
    return res.status(403).send({message: 'la peticion no tiene cabecera de autenticacion'})
  }
  var token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    var payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'El token ha expirado'
      });
    }
  } catch (e) {
    res.status(404).send({
      message: 'El token no es valido'
    });
  }
  req.user = payload;

  next();
}
