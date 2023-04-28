const equipeModel = require('../models/equipeModel')
const usuarioModel = require('../models/usuarioModel')
const tarefaModel = require('../models/tarefaModel')

class equipeController {
    async salvar(req, res) {
        const equipe = req.body

        // bloco onde o bloco do try tenta executar tudo que está aqui dentro, se algo der errado cai no catch
        try {
            // verificando se existe dados no campo tarefa do body da requisição
            if (!equipe.tarefa) {
                res.send({
                    message: "Necessário atrelar uma tarefa!"
                })
            } else {
                // verificando se existe dados de integrantes
                if (!equipe.integrantes) {
                    res.send({
                        message: "Necessário pelo menos um integrante!"
                    })
                } else {
                    // encontra a tarefa
                    const tarefa = await tarefaModel.findOne({ 'idTarefa': equipe.tarefa })

                    // encontra o usuario
                    const usuario = await usuarioModel.find({ 'idUsuario': equipe.integrantes })

                    // validando se a tarefa e o usuario existem no banco, se houver dados cai no else
                    if (!tarefa) {
                        res.send({
                            message: "Tarefa não existe no banco!"
                        })
                    } else if (usuario.length == 0) {
                        res.send({
                            message: "Usuário(s) não existe no banco!"
                        })
                    } else {
                        // gera o id
                        const obj = await equipeModel.findOne({}).sort({ 'idEquipe': -1 })
                        equipe.idEquipe = obj == null ? 1 : obj.idEquipe + 1

                        equipe.tarefa = tarefa
                        equipe.integrantes = usuario

                        // criando a equipe
                        const resultado = await equipeModel.create(equipe)

                        res.send({
                            message: "Equipe cadastrada com sucesso!",
                            equipe: resultado
                        })
                    }
                }
            }

        } catch (error) {
            res.send({
                message: "Não foi possível cadastrar a equipe. Verifique os dados preenchidos!"
            })
        }
    }

    async listar(req, res) {
        const equipes = await equipeModel.find({}) // chaves vazias sem parametros = find tudo
        res.json(equipes)
    }

    async buscarPorId(req, res) {
        const id = req.params.id
        const equipe = await equipeModel.findOne({ 'idEquipe': id })
        res.json(equipe)
    }

    async atualizar(req, res) {
        const id = req.params.id
        const equipe = req.body

        // se a equipe vier nula no body da requisição altero apenas os integrantes
        if (!equipe.tarefa) {
            const usuario = await usuarioModel.find({ 'idUsuario': equipe.integrantes })
            equipe.integrantes = usuario

            // se os integrantes forem nulos no body da requisição altero apenas a tarefa
        } else if (!equipe.integrantes) {
            const tarefa = await tarefaModel.findOne({ 'idTarefa': equipe.tarefa })
            equipe.tarefa = tarefa
        } else {
            // body com tarefa e integrantes para serem alterados
            const tarefa = await tarefaModel.findOne({ 'idTarefa': equipe.tarefa })
            equipe.tarefa = tarefa

            const usuario = await usuarioModel.find({ 'idUsuario': equipe.integrantes })
            equipe.integrantes = usuario
        }

        const _id = (await equipeModel.findOne({ 'idEquipe': id }))._id;
        await equipeModel.findByIdAndUpdate(String(_id), equipe)
        res.send({
            message: "Equipe atualizada com sucesso!",
            equipe: equipe
        })
    }

    async excluir(req, res) {
        const id = req.params.id
        const _id = (await equipeModel.findOne({ 'idEquipe': id }))._id;
        await equipeModel.findByIdAndDelete(String(_id))
        res.send({
            message: "Equipe excluída!"
        })
    }

}

module.exports = new equipeController()