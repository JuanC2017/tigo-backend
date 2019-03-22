'use strict'

function test(req, res){
res.status(200).send({
  message: "Probando el controlador de saldo y la accion pruebas"
});
}

module.exports = {
  test
};
