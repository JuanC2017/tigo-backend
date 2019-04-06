'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

require('mongoose-middleware');



mongoose.connect('mongodb://localhost:27017/tigodb', { useNewUrlParser: true })
  .then(() => {
    console.log("Conexion exitosa a la base de datos");

    app.listen(port, () => {
      console.log("El servidor local con Node y Express estan corriendo correctamente")
    });

  })
  .catch(err => console.log(err));
module.exports = mongoose;
//module.exports = mm;
