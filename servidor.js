require('./db/mongo') //conectando com o mongo
const mongoose = require('mongoose')
const express = require('express')
const cors = require("cors");

const servidor = express() // inicialização do express
servidor.use(express.json()); // solicitações recebidas em json

<<<<<<< HEAD
// aceita requisição de qualquer IP
=======
>>>>>>> 5ea8293f46fa0a375f5eeee6e1d175afb44b4fd3
servidor.use(cors());

// mapear as rotas de cada entidade aqui no servidor
// gerenciar as rotas, encaminhar cada requisição para a router certa
const tarefaRouter = require('./routes/tarefaRouter')
const usuarioRouter = require('./routes/usuarioRouter')
const equipeRouter = require('./routes/equipeRouter')

servidor.use('/tarefas', tarefaRouter) // sempre que a rota for /tarefas ele vai usar a tarefaRoutes
servidor.use('/usuarios', usuarioRouter)
servidor.use('/equipe', equipeRouter)

servidor.listen(3000,
    function(){
        console.log("Servidor rodando na porta 3000")
    }  
)