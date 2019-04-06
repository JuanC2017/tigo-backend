'use strict'

// modulos
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var moment = require('moment');

// modelos
var Recarga = require('../models/recarga');
var Producto = require('../models/producto');

// servicios
var jwt = require('../services/jwt');
//var peticion = require('../services/peticion');

function DoRecarga(req, res) {
    var paramsRecarga = req.body;
    var recarga = new Recarga();

    recarga.numero = paramsRecarga.numero;
    recarga.empresa = paramsRecarga.empresa;
    recarga.monto = paramsRecarga.monto;
    recarga.fec_cre = moment().format('YYYY MM DD HH:mm:ss');
    recarga.fec_upd = moment().format('YYYY MM DD HH:mm:ss');


    var options = {
        url: 'http://70.38.107.45:8090/recar',
        body: JSON.stringify({
            'key': '03becfc25edfa5092f7c5f',
            'id': '9720',
            'monto': paramsRecarga.monto,
            //'empresa': 'tigo',
            'celular': paramsRecarga.numero,
            'producto': paramsRecarga.producto
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }



    /*  guardar recarga en BD
recarga.save(); */
} // fin de doRecarga

// Query para sacar datos de la Db
function pruebaRecarga(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("tigodb");
        dbo.collection("recarga").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });

    res.status(200).send({
        message: 'probando el controlador de recargas'
    });
}



function test(req, res){
res.status(200).send({
  message: "Probando el controlador de recarga y la accion pruebas"
});
}




module.exports = {
  test,
  pruebaRecarga,
  DoRecarga
};
