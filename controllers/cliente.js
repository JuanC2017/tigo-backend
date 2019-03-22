'use strict'

function test(req, res){
res.status(200).send({
  message: "Probando el controlador de cliente y la accion pruebas"
});
}

module.exports = {
  test
};
