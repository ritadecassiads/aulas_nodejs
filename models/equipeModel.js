const mongoose = require('mongoose');
const usuarioModel = require('./usuarioModel.js');

const Schema = mongoose.Schema;

const EquipeModel = new Schema({
    id: Number,
    criador: String,
    integrantes: String // array de usuarios - perguntar pro professor como fazer
})