const mongoose = require('mongoose')
const TarefaSchema = require('./tarefaSchema')
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    idUsuario: Number,
    nome: String,
    username: String,
    senha: String,
    email: String,
    telefone: String,
    logado: Boolean,
    tarefa: [TarefaSchema]
})

module.exports = UsuarioSchema