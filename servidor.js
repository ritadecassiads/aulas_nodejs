const express = require('express')

// inicialização do express
const servidor = express()
servidor.use(express.json()); // solicitações recebidas em json

//conectando com o mongo
require('./db/mongo')
const mongoose = require('mongoose')

// mapear as rotas de cada entidade aqui no servidor
// gerenciar as rotas, encaminhar cada requisição para a router certa
const tarefaRouter = require('./routes/tarefaRouter.js')
servidor.use('/tarefas', tarefaRouter) // sempre que a rota for /tarefas ele vai usar a tarefaRoutes

servidor.listen(3000,
    function(){
        console.log("Servidor rodando na porta 3000")
    }  
)