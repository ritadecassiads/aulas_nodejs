const usuarioController = require('../controller/usuarioController')
const express = require('express')
const router = express.Router()

router.post('/login', usuarioController.login)
router.post('/cadastro', usuarioController.cadastrar)
router.get('/listar', usuarioController.listar)
router.get('/listar/:id', usuarioController.buscarPorId)
router.put('/atualizar/:id', usuarioController.atualizar)
router.delete('/excluir/:id', usuarioController.excluir)

module.exports = router