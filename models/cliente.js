'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
  name : String,
  lastname : String,
  email : String,
  username : String,
  password : String,
  city : String,
  direccion : String,
  celular : Number,
  porc_tigo : Decimal,
  efecty : Boolean,
  user: { type: Schema.ObjectId, ref: 'User'},
  rol: {
        type: String,
        enum: ['CLI_MAYORISTA', 'CLI_DISTRIBUIDOR', 'CLI_CLIENTE']}

});

module.exports = mongoose.model('Cliente', ClienteSchema);
