const tarefaModel = require('../models/tarefaModel')

class TarefaController{
    async salvar(req, res){
        const {id, titulo, descricao, data_conclusao} = req.body
        const tarefa = {
            id,
            titulo,
            descricao,
            data_criacao: new Date(),
            data_conclusao: new Date(data_conclusao),
            feito: false, // false por padrão, so será mudado pra true quando for concluída
        }
        const resultado = await tarefaModel.create(tarefa)
        res.json(resultado)
    }

    async listar(req, res){
        const tarefas = await tarefaModel.find({}) // chaves vazias sem parametros = find tudo
        res.json(tarefas)
    }

    async buscarPorId(req, res){
        const id = req.params.id
        const tarefa = await tarefaModel.findOne({'id': id})
        res.json(tarefa)
    }

    async atualizar(req, res){
        const id = req.params.id
        const tarefa = req.body
        const _id = (await tarefaModel.findOne({'id' : id}))._id;
        await tarefaModel.findByIdAndUpdate(String(_id), tarefa)
        res.send("Tarefa atualizada!")
    }

    async excluir(req, res){
        const id = req.params.id
        const _id = (await tarefaModel.findOne({'id' : id}))._id;
        await tarefaModel.findByIdAndDelete(String(_id))
        res.send("Tarefa excluída!")
    }

}

module.exports = new TarefaController()