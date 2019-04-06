'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportarSchema = Schema({

  num_vol:  String,
  val:  Number,
  fcs : Date,
  fcs_up : Date,
  recarga: { type: Schema.ObjectId, ref: 'Recarga'}

});

module.exports = mongoose.model('Reportar', ReportarSchema);
