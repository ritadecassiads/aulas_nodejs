const mongoose = require('mongoose')
const UsuarioSchema = require('./schemas/usuarioSchema')
module.exports = mongoose.model('usuario', UsuarioSchema)