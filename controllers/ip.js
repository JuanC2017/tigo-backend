'use strict'
//modelos
var Ip_black = require('../models/ip');

function test(req, res){
res.status(200).send({
  message: "Probando el controlador de ip y la accion pruebas"
});
}



function getip_black(req, res) {
    console.log("pasa por getip");
    Ip_black.find({}).exec((err, ip_negra) => {
        if (err) {
            res.status(500).send({
                message: 'error en la peticion'
            });
        } else {

            if (!ip_negra || ip_negra == "") {
                console.log("Entra !ip_negra");
                res.status(404).send({
                    message: 'No hay IP negras'
                });
            } else {

                res.status(200).send({
                    ip: ip_negra
                });


            }
        }
    });
}



function deleteIp(req, res) {

    var Ip_Id = req.params.id; // esto es para recoger el id que tengo dentro de los parametros de la url

    Ip.findByIdAndRemove(Ip_Id, (err, IpRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!IpRemoved) {
                res.status(404).send({ message: 'No se ha borrado la Ip' });
            } else {
                res.status(200).send({ producto: IpRemoved });
            }
        }
    });
}


module.exports = {
  test,
  getip_black,
  deleteIp
};
