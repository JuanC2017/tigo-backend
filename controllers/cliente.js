'use strict'

//modulos insternos o librerias
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');
var Cliente = require('../models/cliente');

//importar servicios jwt
var jwt = require('../services/jwt');


function test(req, res){
res.status(200).send({
  message: "Probando el controlador de cliente y la accion pruebas"
});
}

function saveCliente(req, res){
//Crear objeto usuario
var cliente = new Cliente();

//Recoger parametros
var paramsCliente = req.body;

//Asignar valores al objeto usuario
if (paramsCliente.name && paramsCliente.lastname && paramsCliente.clientename && paramsCliente.email && paramsCliente.password &&
  paramsCliente.cell && paramsCliente.rol && paramsCliente.city && paramsCliente.direccion && paramsCliente.porc_tigo) {
    cliente.name = paramsCliente.name;
    cliente.lastname = paramsCliente.lastname;
    cliente.username = paramsCliente.username;
    cliente.email = paramsCliente.email;
    cliente.password = paramsCliente.password;
    cliente.cell = paramsCliente.cell;
    cliente.city = paramsCliente.city;
    cliente.direccion = paramsCliente.direccion;
    cliente.porc_tigo = paramsCliente.porc_tigo;
    cliente.user = req.user.sub;
    cliente.rol = paramsCliente.rol;


    Cliente.findOne({username: cliente.username}, (err, issetCliente) => {
      if (err) {
        res.status(500).send({message: 'Error al comprobar el cliente '});
      }else {
        if (!issetCliente) {
          //criframos la contraseña
          bcrypt.hash(paramsCliente.password, null, null, function(err, hash){
            cliente.password = hash;

            //Guardo usuarios en base de datos
            cliente.save((err, clienteStored) => {
              if (err) {
                res.status(500).send({message: 'Error al guardar los datos del cliente en la base de datos'});
              } else {
                if (!clienteStored) {
                  res.status(404).send({message: 'no se ha registrado los datos del cliente en la base de datos'});
                }else {
                  res.status(200).send({user: clienteStored});
                }
              }
            });
          });
        }else {
          res.status(200).send({
            message: "ya existe el cliente"
          });
        }
      }
    });


}else {
  res.status(200).send({
    message: "Introduce bien los datos"
  });
}


}

function login(req, res){
var paramsCliente = req.body;

var username = paramsUser.username;

var password = paramsCliente.password;

Cliente.findOne({username: username}, (err, cliente) => {
  if (err) {
    res.status(500).send({message: 'Error al comprobar el usuario'});
  }else {
    if (cliente) {
      bcrypt.compare(password, cliente.password, (err, check) => {
        if (check) {

          //comprobando el token
          if (paramsCliente.gettoken) {
            //devolvemos el token
            res.status(200).send({
              token: jwt.createToken(cliente)
            });
          }else {
            res.status(200).send({cliente});
          }


        }else {
          res.status(404).send({
            message: "problemas con contraeña"
          });
        }
      });

    }else {
      res.status(404).send({
        message: "no existe el cliente"
      });
    }
  }
});

}

function updateCliente(req, res) {
  var update = req.body;
  var clienteId = req.params.id;


  if (clienteId != req.cliente.sub) {
    return res.status(500).send({message: "No tienes permiso para actualizar"});
  }

  Cliente.findByIdAndUpdate(clienteId, update, {new: true}, (err, clienteUpdated) => {
    if (err) {
      res.status(500).send({
        message: "Error al actualizar cliente"
      });
    }else {
      if (!clienteUpdated) {
        res.status(404).send({message: "No se ha podido actualizar el cliente"});
      }else {
        res.status(200).send({cliente: clienteUpdated});
      }
    }
  });
}

function getListarCliente(req, res) {
  Cliente.find({}).populate({path: 'user'}).exec((err, clientes) => {
    if (err) {
      res.status(500).send({message: "Error en la peticion"});
    }else {
      if (!clientes) {
        res.status(404).send({message: "No hay admins"});
      }else {
          res.status(200).send({clientes});
      }
    }
  });
}

function getCliente(req, res) {
  var clienteId = req.paramsCliente.id;

  Cliente.findById(clienteId).populate({path: 'user'}).exec((err, cliente) => {
    if (err) {
      res.status(500).send({message: "Error en la peticion"});
    }else {
      if (!cliente) {
        res.status(404).send({message: "No hay cliente"});
      }else {
          res.status(200).send({cliente});
      }
    }
  });
}

module.exports = {
  test,
  saveCliente,
  login,
  updateCliente,
  getListarCliente,
  getCliente
};
