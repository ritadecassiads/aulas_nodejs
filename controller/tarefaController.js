const tarefaModel = require('../models/tarefaModel')

class TarefaController{
    async salvar(req, res){
        const {titulo, descricao} = req.body
        const busca = await tarefaModel.find({})
        const id = busca.length + 1 // cria ids na sequencia em que for salva

        const tarefa = {
            id: id,
            titulo,
            descricao,
            data_criacao: new Date(),
            feito: false, // false por padrão, so será mudado pra true quando for concluída
        }
        const resultado = await tarefaModel.create(tarefa)

        res.send({
            message: "Tarefa cadastrado com sucesso!",
            usuario: resultado
        }) 
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
        res.send({
            message: "Tarefa atualizada com sucesso!",
            usuario: tarefa
        })
    }

    async atualizarFeita(req, res){
        const id = req.params.id
        const obj = req.body 
        const tarefa = await tarefaModel.findOne({'id' : id})

        // validando se o id existe na base antes de finalizar
        if(!tarefa){ // se for igual a null vira true e se houver conteudo vira false
            res.send("Essa tarefa não foi encontrada!")
        } else {
            if(obj.feito == true){
                const _id = (await tarefaModel.findOne({'id' : id}))._id;
                await tarefaModel.findByIdAndDelete(String(_id))
                res.send({
                    message: "Tarefa finalizada com sucesso!"
                })
            } else {
                res.send("A tarefa não foi finalizada")
            }
            
       }
    }

    async excluir(req, res){
        const id = req.params.id
        const _id = (await tarefaModel.findOne({'id' : id}))._id;
        await tarefaModel.findByIdAndDelete(String(_id))
        res.send("Tarefa excluída!")
    }

}

module.exports = new TarefaController()