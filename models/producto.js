'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
  name : String,
  valor_fac : Number,
  valor : Number,
  codigo : String,
  status : Boolean,
  incentivo : Number,
  fcs : Date,
  fcs_up : Date,
  obs : String,
  user: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Producto', ProductoSchema);
