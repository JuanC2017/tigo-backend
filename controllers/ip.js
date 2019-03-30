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



function delete_ip_black(req, res) {

    var Ip_Id = req.params.id;
    console.log(Ip_Id);
    Ip_black.findByIdAndRemove(Ip_Id, (err, delete_ip) => {
        if (err) {
            res.status(500).send({
                message: 'error de peticion'
            });
        } else {
            console.log("este es el delete_ip", delete_ip);
            if (!delete_ip) {
                res.status(404).send({
                    message: 'Ip no eliminada'
                });
            } else {
                res.status(200).send({
                    message: 'Ip borrada'
                });
            }
        }

    });

}


module.exports = {
  test,
  getip_black,
  delete_ip_black
};
