// controller = mediar o que acontece
// metodos que farao o CRUD 
const tarefaModel = require('../models/tarefaModel')
class TarefaController{
    async salvar(req, res){
        const {titulo, descricao, data_conclusao} = req.body

        // gerador de id
        const obj = await tarefaModel.findOne({}).sort({'idTarefa': -1});  // encontra um, faz o sort para ordenar 1 crescente e -1 decrescente

        const tarefa = {
            idTarefa: obj == null ? 1 : obj.idTarefa + 1,
            titulo,
            descricao,
            data_criacao: new Date(), // instancia a data atual da requisicao
            data_conclusao: new Date(data_conclusao),
            feito: false, // false por padrão, so será mudado pra true quando for concluída
        }
        const resultado = await tarefaModel.create(tarefa)

        res.send({
            message: "Tarefa cadastrada com sucesso!",
            tarefa: resultado
        }) 
    }

    async listar(req, res){
        const tarefas = await tarefaModel.find({}) // chaves vazias sem parametros = find tudo
        res.json(tarefas)
    }

    async buscarPorId(req, res){
        const id = req.params.id
        const tarefa = await tarefaModel.findOne({'idTarefa': id})
        res.json(tarefa)
    }

    async atualizar(req, res){
        const id = req.params.id
        const tarefa = req.body
        const _id = (await tarefaModel.findOne({'idTarefa' : id}))._id;
        await tarefaModel.findByIdAndUpdate(String(_id), tarefa)
        res.send({
            message: "Tarefa atualizada com sucesso!",
            tarefa: tarefa
        })
    }

    async atualizarFeita(req, res){
        const id = req.params.id
        const obj = req.body // passando 'feito: true' no body
        const tarefa = await tarefaModel.findOne({'idTarefa' : id})

        // validando se o id existe na base antes de finalizar
        if(!tarefa){ // se for igual a null vira true e se houver conteudo vira false
            res.send({
                message: "Essa tarefa não foi encontrada!"
            })
        } else {
            if(obj.feito == true){
                // atualiza valor do "feito" de acordo com o que vem do body da requisição
                const _id = tarefa._id;
                await tarefaModel.findByIdAndUpdate(String(_id), obj)
                res.send({
                    message: "Tarefa finalizada com sucesso!"
                })
            } else {
                const _id = tarefa._id;
                await tarefaModel.findByIdAndUpdate(String(_id), obj)
                res.send({
                    message: "A tarefa não foi finalizada"})
            }    
       }
    }

    async excluir(req, res){
        const id = req.params.id
        const _id = (await tarefaModel.findOne({'idTarefa' : id}))._id;
        await tarefaModel.findByIdAndDelete(String(_id))
        res.send({
            message: "Tarefa excluída!"
        })
    }

}

module.exports = new TarefaController()