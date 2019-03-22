'use strict'

//modulos insternos o librerias
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

//importar servicios jwt
var jwt = require('../services/jwt');

function test(req, res){
res.status(200).send({
  message: "Probando el controlador de usuarios y la accion pruebas",
  user: req.user
});
}

function saveUser(req, res){
//Crear objeto usuario
var user = new User();

//Recoger parametros
var paramsUser = req.body;

//Asignar valores al objeto usuario
if (paramsUser.name && paramsUser.lastname && paramsUser.username && paramsUser.email && paramsUser.password &&
  paramsUser.cell && paramsUser.rol) {
    user.name = paramsUser.name;
    user.lastname = paramsUser.lastname;
    user.username = paramsUser.username;
    user.email = paramsUser.email;
    user.password = paramsUser.password;
    user.cell = paramsUser.cell;
    user.rol = paramsUser.rol;


    User.findOne({username: user.username}, (err, issetUser) => {
      if (err) {
        res.status(500).send({message: 'Error al comprobar el usuario'});
      }else {
        if (!issetUser) {
          //criframos la contraseña
          bcrypt.hash(paramsUser.password, null, null, function(err, hash){
            user.password = hash;

            //Guardo usuarios en base de datos
            user.save((err, userStored) => {
              if (err) {
                res.status(500).send({message: 'Error al guardar los datos del usuario en la base de datos'});
              } else {
                if (!userStored) {
                  res.status(404).send({message: 'no se ha registrado los datos del usuario en la base de datos'});
                }else {
                  res.status(200).send({user: userStored});
                }
              }
            });
          });
        }else {
          res.status(200).send({
            message: "ya existe el usuario"
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
var paramsUser = req.body;

var username = paramsUser.username;

var password = paramsUser.password;

User.findOne({username: username}, (err, user) => {
  if (err) {
    res.status(500).send({message: 'Error al comprobar el usuario'});
  }else {
    if (user) {
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {

          //comprobando el token
          if (paramsUser.gettoken) {
            //devolvemos el token
            res.status(200).send({
              token: jwt.createToken(user)
            });
          }else {
            res.status(200).send({user});
          }


        }else {
          res.status(404).send({
            message: "problemas con contraeña"
          });
        }
      });

    }else {
      res.status(404).send({
        message: "no existe el usuario"
      });
    }
  }
});

}

module.exports = {
  test,
  saveUser,
  login
};
