import express, { Request, Response } from 'express'
import userMiddleware from '../middlewares/userMiddleware.js'
import SendResponse from '../utils/responseHelper.js'

import GetAllUsers from '../../../application/use_cases/user/getAllUsers.js'
import GetUserById from '../../../application/use_cases/user/getUserById.js'
import CreateUser from '../../../application/use_cases/user/createUser.js'
import UpdateUser from '../../../application/use_cases/user/updateUser.js'

/**
 * Acá van todos los posibles origines de datos
 */
// import UserRepository from '../../db/InMemory/userRepository.js'
import UserRepository from '../../db/SQLite3/userRepository.js'
import DeleteUser from '../../../application/use_cases/user/deleteUser.js'

const router = express.Router()
const repository = new UserRepository()

// Get all users
router.get('/', async (req: Request, res: Response) => {
	const app = new GetAllUsers(repository)
	const users = await app.execute()

	return SendResponse({
		res,
		method: 'GET',
		message: null,
		data: users,
	})
})

// Get user by id
router.get('/:id', userMiddleware, async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const app = new GetUserById(repository)
	const user = await app.execute(id)

	return user
		? SendResponse({ res, method: 'GET', message: null, data: user })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Usuario no encontrado',
				data: null,
			})
})

// Create a new user
router.post('/', userMiddleware, async (req: Request, res: Response) => {
	const { rut, name, lastname, email } = req.body
	const app = new CreateUser(repository)
	const user = await app.execute({ rut, dv: '', name, lastname, email })

	return user
		? SendResponse({ res, method: 'POST', message: null, data: user })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Usuario no registrado',
				data: null,
			})
})

// Update a user
router.put('/:id', userMiddleware, async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const { rut, name, lastname, email, password, isActive } = req.body

	const app = new UpdateUser(repository)
	const user = await app.execute({
		id,
		rut,
		dv: '',
		name,
		lastname,
		email,
		password,
		isActive,
	})

	return user
		? SendResponse({ res, method: 'PUT', message: null, data: user })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Usuario no actualizado',
				data: null,
			})
})

// Delete a user
router.delete('/:id', userMiddleware, async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const app = new DeleteUser(repository)

	const wasDeleted = await app.execute(id)
	return wasDeleted
		? SendResponse({ res, method: 'DELETE', message: null, data: null })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Usuario no eliminado',
				data: null,
			})
})

export default router
