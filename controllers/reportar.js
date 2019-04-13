'use strict'

//Modulos
var mongoose = require('../node_modules/mongoose');
var moment = require('moment');
//var mm = require('../node_modules/mongoose-middleware');

//MODELOS
var User = require('../models/user');
var Recarga = require('../models/recarga');
var Reportar = require('../models/reportar');


function test(req, res){
res.status(200).send({
  message: "Probando el controlador de reportar y la accion pruebas"
});
}


function createReporte(req, res) {
    var reporte = new Reporte();

    var paramsReporte = req.body;



    if (paramsReporte.num_vol && paramsReporte.valor && paramsReporte.fcs && paramsReporte.fcs_up) {
        // setteo las variables

        reporte.num_vol = paramsReporte.num_vol;
        reporte.valor = paramsReporte.valor;
        reporte.fcs = moment().format('YYYY MM DD HH:mm:ss');
        reporte.fcs_up = moment().format('YYYY MM DD HH:mm:ss');
        reporte.recarga = req.recarga.sub;


        Reporte.findOne({ num_vol: paramsReporte.num_vol }, (err, reporte) => {
            if (err) {
                res.status(500).send({ message: 'Error al verificar la factura' });
            } else {
                if (!reporte) {
                    product.save((err, reporteStored) => {
                        if (err) {
                            res.status(500).send({ message: 'Error en el servidor' });
                        } else {
                            if (!reporteStored) {
                                res.status(404).send({ message: 'No se ha guardado el reporte' });
                            } else {
                                res.status(200).send({ reporteGuardado: reporteStored });
                            }
                        }
                    });
                } else {
                    res.status(200).send({ message: 'Reporte existente' });
                }

            }
        });
    } else {
        res.status(200).send({ message: 'Todos los campos son obligatorios' });
    }

}

function getReportes(req, res) {

    // var count = req.query.count || 10;
    // var page = req.query.page || 1;
    //
    // var filter = {
    //   filters : {
    //     mandatory : {
    //       contains: req.query.filter
    //     }
    //   }
    // };
    //
    // var pagination = {
    //   start: (page -1) * count,
    //   count: count
    // };
    //
    // var sort = {
    //   sort: {
    //     desc: '_id'
    //   }
    // };
    //
    // Reportar
    // .find({})
    // .filter()
    // .order()
    // .page(pagination, function(err, reportes) {
    //   if (err) {
    //       res.status(500).send({ message: 'Error en la peticion' });
    //   } else {
    //       if (!reportes) {
    //           res.status(404).send({ message: 'No hay reportes' });
    //       } else {
    //           res.status(200).send({ reportes });
    //       }
    //   }
    // });

    var perPage = req.query.perPage || 10;
    var page = req.query.page || 1;
    var reportar = null;

    Reportar.find({})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec()
        .then((reportes) => {
            res.set('X-limit', perPage);
            res.set('X-page', page);
            reportar = reportes;
            return Reportar.count();
        })
        .then((total) => {
            res.set('X-total', total);
            res.status(200).send({ reportar });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error en la petición" });
        });

}


// obtener un solo reporte
function getReporte(req, res) {

    var reporteId = req.params.id; // ojo aqui es params

    Reporte.findById(reporteId).populate({ path: 'recarga' }).exec((err, reporte) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!reporte) {
                res.status(404).send({ message: 'No existe el reporte' });
            } else {
                res.status(200).send({ reporte });
            }
        }
    });
}



module.exports = {
  test,
  createReporte,
  getReportes,
  getReporte
};
