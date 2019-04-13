'use strict'

// MODULOS
var moment = require('moment');

//MODELOS
var User = require('../models/user');
var Producto = require('../models/producto');

function test(req, res){
res.status(200).send({
  message: "Probando el controlador de producto y la accion pruebas"
});
}

function createProducto(req, res) {
    var producto = new Producto();

    var paramsProducto = req.body;



    if (paramsProducto.name && paramsProducto.precio && paramsProducto.codigo && paramsProducto.status &&
      paramsProducto.descripcion) {
        // setteo las variables
        producto.name = paramsProducto.name;
        producto.precio = paramsProducto.precio;
        producto.codigo = paramsProducto.codigo;
        producto.status = paramsProducto.status;
        producto.fec_cre = moment().format('YYYY MM DD HH:mm:ss');
        producto.fec_upd = moment().format('YYYY MM DD HH:mm:ss');
        producto.user = req.user.sub; //  req.user.sub para guardar el id del usuario logueado
        producto.incentivo = paramsProducto.incentivo;
        producto.descripcion = paramsProducto.descripcion;

        Producto.findOne({ codigo: paramsProducto.codigo.toLowerCase() }, (err, productoDB) => {
            if (err) {
                res.status(500).send({ message: 'Error al verificar producto' });
            } else {
                if (!productoDB) {
                    product.save((err, productStored) => {
                        if (err) {
                            res.status(500).send({ message: 'Error en el servidor' });
                        } else {
                            if (!productStored) {
                                res.status(404).send({ message: 'No se ha guardado el producto' });
                            } else {
                                res.status(200).send({ productoGuardado: productStored });
                            }
                        }
                    });
                } else {
                    res.status(200).send({ message: 'Producto existente' });
                }

            }
        });
    } else {
        res.status(200).send({ message: 'Todos los campos son obligatorios' });
    }

}

// listar todos los productos
function getProductos(req, res) {
    Producto.find({}).populate({ path: 'user' }).exec((err, productos) => {
        // .populate('usuario', 'nombre apellidos') para solo devolver los campos que quiero.
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!productos) {
                res.status(404).send({ message: 'No hay productos' });
            } else {
                res.status(200).send({ productos });
            }
        }
    });
}


// obtener un solo produto
function getProducto(req, res) {

    var productoId = req.params.id; // ojo aqui es params

    Producto.findById(productId).populate({ path: 'user' }).exec((err, producto) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!producto) {
                res.status(404).send({ message: 'No existe el producto' });
            } else {
                res.status(200).send({ producto });
            }
        }
    });
}

function updateProducto(req, res) {

    var productoId = req.params.id;
    var update = req.body;
    // Product hace referencia a la coleccion
    Producto.findByIdAndUpdate(productoId, update, { new: true }, (err, productoUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!productoUpdated) {
                res.status(404).send({ message: 'No se ha actualizado el producto' });
            } else {
                res.status(200).send({ producto: productoUpdated });
            }
        }
    });
}

function deleteProducto(req, res) {

    var productoId = req.params.id; // esto es para recoger el id que tengo dentro de los parametros de la url

    Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!productoRemoved) {
                res.status(404).send({ message: 'No se ha borrado el producto' });
            } else {
                res.status(200).send({ producto: productRemoved });
            }
        }
    });
}


function carritoProducto(req, res, $scope) {
  $scope.carrito = [];
  $scope.comprar = function(_item){
    _item.ocultar = false;
    $scope.carrito.push(_item);
  }

  $scope.total = function () {
    var total = 0;
    for (item of $scope.carrito) {

      total += item.precio;

    }
  }
}

module.exports = {
  test,
  createProducto,
  getProductos,
  getProducto,
  updateProducto,
  deleteProducto,
  carritoProducto
};
