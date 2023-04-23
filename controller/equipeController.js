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
        const equipe = await equipeModel.findOne({'id': id})
        res.json(equipe)
    }

    async atualizar(req, res){
        const id = req.params.id
        const equipe = req.body
        const _id = (await equipeModel.findOne({'idequipe' : id}))._id;
        await equipeModel.findByIdAndUpdate(String(_id), equipe)
        res.send({
            message: "equipe atualizada com sucesso!",
            usuario: equipe
        })
    }

    async atualizarFeita(req, res){
        const id = req.params.id
        const obj = req.body // passando 'feito: true' no body e finalizando a equipe
        const equipe = await equipeModel.findOne({'idequipe' : id})

        // validando se o id existe na base antes de finalizar
        if(!equipe){ // se for igual a null vira true e se houver conteudo vira false
            res.send({
                message: "Essa equipe não foi encontrada!"
            })
        } else {
            if(obj.feito == true){
                const _id = (await equipeModel.findOne({'idequipe' : id}))._id;
                await equipeModel.findByIdAndUpdate(String(_id))
                res.send({
                    message: "equipe finalizada com sucesso!"
                })
            } else {
                res.send({
                    message: "A equipe não foi finalizada"})
            }    
       }
    }

    async excluir(req, res){
        const id = req.params.id
        const _id = (await equipeModel.findOne({'idequipe' : id}))._id;
        await equipeModel.findByIdAndDelete(String(_id))
        res.send({
            message: "equipe excluída!"
        })
    }

}

module.exports = new equipeController()