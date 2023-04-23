const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TarefaSchema = new Schema({
    idTarefa: Number,
    titulo: { type: String, required:[true, "Titulo obrigatorio!"]},
    descricao: String,
    data_criacao: { type: Date, default: Date.now },
    data_conclusao: Date,
    feito: Boolean
})

module.exports = TarefaSchema