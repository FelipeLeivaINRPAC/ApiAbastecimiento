import { Request, Response, NextFunction } from 'express'
import SendResponse from '../utils/responseHelper.js'

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		switch (req.method) {
			case 'DELETE':
			case 'GET':
			case 'PUT':
				if (!req.params.id) {
					return SendResponse({
						res,
						method: 'ERROR',
						message: "El parámetro 'id' es obligatorio",
						data: null,
					})
				}
				break

			case 'POST': {
				const { rut, name, lastname, email } = req.body

				if (!rut || typeof rut !== 'number') {
					return SendResponse({
						res,
						method: 'ERROR',
						message: "El parámetro 'rut' es obligatorio",
						data: null,
					})
				}

				if (!name || typeof name !== 'string') {
					return SendResponse({
						res,
						method: 'ERROR',
						message: "El parámetro 'name' es obligatorio",
						data: null,
					})
				}

				if (!lastname || typeof lastname !== 'string') {
					return SendResponse({
						res,
						method: 'ERROR',
						message: "El parámetro 'lastname' es obligatorio",
						data: null,
					})
				}

				if (!email || typeof email !== 'string') {
					return SendResponse({
						res,
						method: 'ERROR',
						message: "El parámetro 'email' es obligatorio",
						data: null,
					})
				}

				break
			}
		}

		next()
	} catch (error: unknown) {
		if (error instanceof Error) {
			return SendResponse({
				res,
				method: 'ERROR',
				message: error.message,
				data: null,
			})
		}

		return SendResponse({
			res,
			method: 'ERROR',
			message: 'Ocurrió un error inesperado',
			data: null,
		})
	}
}

export default userMiddleware
