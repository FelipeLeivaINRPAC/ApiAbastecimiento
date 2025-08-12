import express, { Request, Response } from 'express'
import SendResponse from '../utils/responseHelper.js'

import AuthenticateServices from '../../../domain/services/authenticateServices.js'
import AuthenticateRepository from '../../db/InMemory/authenticateRepository.js'

const repository = new AuthenticateRepository()
const authServices = new AuthenticateServices(repository)

const authenticateRouter = express.Router()

authenticateRouter.get('/', async (req: Request, res: Response) => {
	const apiKeys = await authServices.getAll()
	return SendResponse({ res, method: 'GET', message: null, data: apiKeys })
})

export default authenticateRouter
