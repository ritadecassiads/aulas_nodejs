const equipeController = require('../controller/equipeController')
const express = require('express')
const router = express.Router()

router.post('/salvar', equipeController.salvar)
router.get('/listar', equipeController.listar)
router.get('/listar/:id', equipeController.buscarPorId)
router.put('/atualizar/:id', equipeController.atualizar)
router.delete('/excluir/:id', equipeController.excluir)

module.exports = router