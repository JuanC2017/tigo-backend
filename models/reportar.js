'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportarSchema = Schema({
  name : String,
  valor_fac : Number,
  valor : Number,
  codigo : String,
  status : Boolean,
  fcs : Date,
  fcs_up : Date,
  obs : String,
  user: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Producto', ProductoSchema);
