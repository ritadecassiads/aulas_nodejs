require('./db/mongo') //conectando com o mongo
const mongoose = require('mongoose')

const express = require('express')

const servidor = express() // inicialização do express
servidor.use(express.json()); // solicitações recebidas em json

// mapear as rotas de cada entidade aqui no servidor
// gerenciar as rotas, encaminhar cada requisição para a router certa
const tarefaRouter = require('./routes/tarefaRouter.js')
const usuarioRouter = require('./routes/usuarioRouter')
servidor.use('/tarefas', tarefaRouter) // sempre que a rota for /tarefas ele vai usar a tarefaRoutes
servidor.use('/usuarios', usuarioRouter)

servidor.listen(3000,
    function(){
        console.log("Servidor rodando na porta 3000")
    }  
)