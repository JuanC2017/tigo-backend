'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaldoSchema = Schema({
  valor: {type: Number, required: true},
  fcs: {type: Date, required: Date.now()},
  obs: {type: String, required: true},
  comision: {type: Number, required: true},
  saldo_cliente: { type: Schema.ObjectId, ref: 'Cliente' }

});

module.exports = mongoose.model('Saldo', SaldoSchema);
