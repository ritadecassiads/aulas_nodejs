const equipeModel = require('../models/equipeModel')
const usuarioModel = require('../models/usuarioModel')
const tarefaModel = require('../models/tarefaModel')

class equipeController{
    async salvar(req, res){
        const equipe = req.body

        // gera o id
        const obj = await equipeModel.findOne({}).sort({'idEquipe': -1})
        equipe.idEquipe = obj == null ? 1 : obj.idEquipe + 1

        // associa a tarefa
        const tarefa = await tarefaModel.findOne({'idTarefa': equipe.tarefa})
        equipe.tarefa = tarefa

        // associa ao usuario
        const usuario = await usuarioModel.find({'idUsuario' : equipe.integrantes})
        equipe.integrantes = usuario

        const resultado = await equipeModel.create(equipe)

        res.send({
            message: "Equipe cadastrada com sucesso!",
            equipe: resultado
        }) 
    }

    async listar(req, res){
        const equipes = await equipeModel.find({}) // chaves vazias sem parametros = find tudo
        res.json(equipes)
    }

    async buscarPorId(req, res){
        const id = req.params.id
        const equipe = await equipeModel.findOne({'idEquipe': id})
        res.json(equipe)
    }

    async atualizar(req, res){
        const id = req.params.id
        const equipe = req.body
        const _id = (await equipeModel.findOne({'idEquipe' : id}))._id;
        await equipeModel.findByIdAndUpdate(String(_id), equipe)
        res.send({
            message: "Equipe atualizada com sucesso!",
            equipe: equipe
        })
    }

    async excluir(req, res){
        const id = req.params.id
        const _id = (await equipeModel.findOne({'idEquipe' : id}))._id;
        await equipeModel.findByIdAndDelete(String(_id))
        res.send({
            message: "Equipe excluída!"
        })
    }

}

module.exports = new equipeController()