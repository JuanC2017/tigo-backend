'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  lastname : String,
  username : String,
  password : String,
  email : String,
  cell : Number,
  rol: {type: String,
        enum: ['ROLE_ADMIN', 'ROLE_ROOT', 'CARGAS', 'ASESOR']},
  estado : Boolean
});

module.exports = mongoose.model('User', UserSchema);
