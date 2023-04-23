const mongoose = require('mongoose');
const UsuarioSchema = require('./schemas/usuarioSchema')
const TarefaSchema = require('./schemas/tarefaSchema')

const Schema = mongoose.Schema;

const EquipeModel = new Schema({
    idEquipe: Number,
    tarefa: TarefaSchema,
    integrantes: [UsuarioSchema]
})

module.exports = mongoose.model('equipe', EquipeModel)