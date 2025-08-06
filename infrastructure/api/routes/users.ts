import express, { Request, Response } from 'express'
import userMiddleware from '../middlewares/userMiddleware.js'
import SendResponse from '../utils/responseHelper.js'
import CalculateDv from '../utils/rutHelper.js'

import UserServices from '../../../domain/services/UserServices.js'
import UserRepository from '../../db/InMemory/UserRepository.js'
import User from '../../../domain/entities/User.js'
// const UserRepository = require('../../db/SQLite/UserRepositorySQLite')

const repository = new UserRepository()
const userServices = new UserServices(repository)

const router = express.Router()

// Get all users
router.get('/', async (req, res) => {
  const users = await userServices.getAll()
  return SendResponse(res, 'GET', null, users)
})

// Get user by id
router.get('/:id', userMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  const user = await userServices.getById(id)
  return user
    ? SendResponse(res, 'GET', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no encontrado')
})

// Create a new user
router.post('/', userMiddleware, async (req, res) => {
  const { rut, name, lastname, email } = req.body
  const dv = await CalculateDv(rut)
  const user = await userServices.create(rut, dv, name, lastname, email)
  return user
    ? SendResponse(res, 'POST', null, user)
    : SendResponse(res, 'ERROR', 'Usuario no registrado')
})

// Update a user
router.put('/:id', userMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  const { rut, name, lastname, email, password, isActive } = req.body
  let dv = ''
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
router.delete('/:id', userMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  const wasDeleted = await userServices.delete(id)
  return wasDeleted
    ? SendResponse(res, 'DELETE')
    : SendResponse(res, 'ERROR', 'Usuario no eliminado')
})

export default router
