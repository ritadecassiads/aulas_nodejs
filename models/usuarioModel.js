const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UsuarioModel = new Schema({
    id: Number,
    nome: String,
    username: String,
    senha: String,
    email: String,
    telefone: String
})

module.exports = mongoose.model('usuario', UsuarioModel)