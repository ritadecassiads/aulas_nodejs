const usuarioModel = require('../models/usuarioModel')

class UsuarioController{
    async cadastrar(req, res){
        const usuario = req.body
        const id = (await usuarioModel.find({})).length + 1 // cria o id a partir da quantidade de cadastros
        usuario.id = id
        
        const resultado = await usuarioModel.create(usuario)
        res.send({
            message: "Usuario cadastrado com sucesso!",
            usuario: resultado
        }) 
    }

    async login(req, res){
        const { username, senha } = req.body
        const login = await usuarioModel.findOne({'username': username, 'senha': senha})

        if(login){
            res.json({
                message: "Usuario logado!"
            })
        } else {
            res.json({
                message: "Usuario não cadastrado!"
            })
        }
    }

    async listar(req, res){
        const usuarios = await usuarioModel.find({})
        res.json(usuarios)
    }

    async buscarPorId(req, res){
        const id = req.params.id
        const usuario = await usuarioModel.findOne({'id': id})
        res.json(usuario)
    }

    async atualizar(req, res){
        const id = req.params.id // id vindo dos parametros da requisição
        const usuario = req.body // alteração vindo do body da requisição
        const _id = (await usuarioModel.findOne({'id' : id}))._id; // compara o id do usuario com o id passado na requisição e retorna o _id criado automaticamente no mongo
        await usuarioModel.findByIdAndUpdate(String(_id), usuario) // atualize usuario do _id com a informacoes 'usuario' que veio do body
        res.send({
            message: "Usuario atualizado com sucesso!",
            usuario: usuario
        })
    }

    async excluir(req, res){
        const id = req.params.id
        const _id = (await usuarioModel.findOne({'id' : id}))._id;
        await usuarioModel.findByIdAndDelete(String(_id))
        res.send("Usuario excluído!")
    }
}

module.exports = new UsuarioController()