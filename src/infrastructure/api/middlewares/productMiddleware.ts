import { Request, Response, NextFunction } from 'express'
import SendResponse from '../utils/responseHelper.js'

const productMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
				const { name, stock } = req.body

				if (!name || typeof name !== 'string') {
					return SendResponse({
						res,
						method: 'ERROR',
						message: "El parámetro 'name' es obligatorio",
						data: null,
					})
				}

				if (!stock || typeof stock !== 'number' || stock < 0) {
					return SendResponse({
						res,
						method: 'ERROR',
						message: "El parámetro 'stock' es obligatorio",
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

export default productMiddleware
