const express = require('express')
const router = express.Router()
const validateInputsUser = require('../middlewares/validateInputsUser')
const SendResponse = require('../utils/responseHelper')

const UserRepository = require('../../db/InMemory/UserRepository')
const UserServices = require('../../../domain/services/UserServices')

const repository = new UserRepository()
const userServices = new UserServices(repository)

router.get('/', async (req, res) => {
  const users = await userServices.getAll()
  return SendResponse(res, 'GET', null, users)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await userServices.getById(id)
  return user
    ? SendResponse(res, 'GET', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no encontrado')
})

router.post('/', validateInputsUser, async (req, res) => {
  const { name, lastname, email } = req.body
  const user = await userServices.create(name, lastname, email)
  return user
    ? SendResponse(res, 'POST', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no registrado')
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name, lastname, email, isActive } = req.body
  const user = await userServices.update(id, name, lastname, email, isActive)
  return user
    ? SendResponse(res, 'PUT', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no actualizado')
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const wasDeleted = await userServices.delete(id)
  return wasDeleted
    ? SendResponse(res, 'DELETE')
    : SendResponse(res, 'ERROR', 'Usuario no eliminado')
})

module.exports = router
