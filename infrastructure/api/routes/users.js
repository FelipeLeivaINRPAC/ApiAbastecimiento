const express = require('express')
const router = express.Router()
const checkInputsUser = require('../middlewares/checkInputsUser')

const SendResponse = require('../utils/responseHelper')
const CalculateDv = require('../utils/rutHelper')

// const UserRepository = require('../../db/InMemory/UserRepository')
const UserRepository = require('../../db/SQLite/UserRepositorySQLite')
const UserServices = require('../../../domain/services/UserServices')

const repository = new UserRepository()
const userServices = new UserServices(repository)

// Get all users
router.get('/', async (req, res) => {
  const users = await userServices.getAll()
  return SendResponse(res, 'GET', null, users)
})

// Get user by id
router.get('/:id', checkInputsUser, async (req, res) => {
  const id = req.params.id
  const user = await userServices.getById(id)
  return user
    ? SendResponse(res, 'GET', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no encontrado')
})

// Create a new user
router.post('/', checkInputsUser, async (req, res) => {
  const { rut, name, lastname, email } = req.body
  const dv = await CalculateDv(rut)
  const user = await userServices.create(rut, dv, name, lastname, email)
  return user
    ? SendResponse(res, 'POST', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no registrado')
})

// Update a user
router.put('/:id', checkInputsUser, async (req, res) => {
  const id = req.params.id
  const { rut, name, lastname, email, password, isActive } = req.body
  let dv = null
  if (rut) {
    dv = await CalculateDv(rut)
  }

  const user = await userServices.update(
    id,
    rut,
    dv,
    name,
    lastname,
    email,
    password,
    isActive,
  )
  return user
    ? SendResponse(res, 'PUT', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no actualizado')
})

// Delete a user
router.delete('/:id', checkInputsUser, async (req, res) => {
  const id = req.params.id
  const wasDeleted = await userServices.delete(id)
  return wasDeleted
    ? SendResponse(res, 'DELETE')
    : SendResponse(res, 'ERROR', 'Usuario no eliminado')
})

module.exports = router
