import { Request, Response, NextFunction } from 'express'
import SendResponse from '../utils/responseHelper.js'

const ProductsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, stock } = req.body

    if (!name || typeof name !== 'string') {
      return SendResponse(res, 'ERROR', "Parámetro 'name' incorrecto")
    }

    if (typeof stock !== 'number' || stock <= 0) {
      return SendResponse(res, 'ERROR', "Parámetro 'stock' incorrecto")
    }

    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      return SendResponse(res, 'ERROR', error.message)
    }

    return SendResponse(res, 'ERROR', 'Ocurrió un error inesperado')
  }
}

export default ProductsMiddleware
