'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecargaSchema = Schema({
    numero: { type: String, required: true },
    empresa: { type: String, required: true },
    user:{ type: Schema.ObjectId, ref: 'User'},
    monto: { type: String, required: true },
    respuesta: { type: String, required: true },
    fec_cre: { type: Date, default: Date.now() },
    fec_upd: { type: Date, default: Date.now() }

});

module.exports = mongoose.model('Recarga', RecargaSchema);
