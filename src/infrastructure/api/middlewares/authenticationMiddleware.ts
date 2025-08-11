import { Request, Response, NextFunction } from 'express'
import SendResponse from '../utils/responseHelper.js'

import AuthenticateServices from '../../../domain/services/authenticateServices.js'

import AuthenticateRepository from '../../db/InMemory/authenticateRepository.js'
// import AuthenticateRepository from '../../db/SQLite3/authenticateRepository.js'

const repository = new AuthenticateRepository()
const authServices = new AuthenticateServices(repository)

const AuthenticationMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (
			process.env.ENVIRONMENT === 'development' &&
			req.originalUrl === '/api/authenticate'
		) {
			return next()
		}

		const apiKey = req.headers['x-api-key'] as string

		if (!apiKey)
			return SendResponse({
				res,
				method: 'ERROR',
				message: 'UNAUTHORIZE',
				data: null,
			})
		const isValidApiKey = await authServices.validateApiKey(apiKey)

		if (!isValidApiKey)
			return SendResponse({
				res,
				method: 'ERROR',
				message: 'THE API KEY HAS EXPIRED',
				data: null,
			})

		next()
	} catch (error: unknown) {
		return error instanceof Error
			? SendResponse({
					res,
					method: 'ERROR',
					message: error.message,
					data: null,
				})
			: SendResponse({
					res,
					method: 'SERVER_ERROR',
					message: 'Se ha producido un error desconocido',
					data: null,
				})
	}
}

export default AuthenticationMiddleware
