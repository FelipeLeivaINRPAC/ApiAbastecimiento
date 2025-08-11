import { Request, Response, NextFunction } from 'express'
import SendResponse from '../utils/responseHelper.js'

const ProductsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, stock } = req.body

		if (!name || typeof name !== 'string') {
			return SendResponse({
				res,
				method: 'ERROR',
				message: "El parámetro 'name' es obligatorio",
				data: null,
			})
		}

		if (typeof stock !== 'number' || stock <= 0) {
			return SendResponse({
				res,
				method: 'ERROR',
				message: "El parámetro 'stock' es obligatorio",
				data: null,
			})
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

export default ProductsMiddleware
