import { Request, Response, NextFunction } from 'express'
import AuthenticateRepository from '../../db/InMemory/AuthenticateRepository.js'
import AuthenticateServices from '../../../domain/services/AuthenticateServices.js'
import SendResponse from '../utils/responseHelper.js'

const repository = new AuthenticateRepository()
const authServices = new AuthenticateServices(repository)

const AuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    process.env.ENVIRONMENT === 'development' &&
    req.originalUrl === '/api/authenticate'
  ) {
    return next()
  }

  const apiKey = req.headers['x-api-key'] as string

  if (!apiKey) return SendResponse(res, 'ERROR', 'UNAUTHORIZED')
  const isValidApiKey = await authServices.validateApiKey(apiKey)

  if (!isValidApiKey)
    return SendResponse(res, 'ERROR', 'La API KEY está deshabilitada')

  next()

  try {
  } catch (error: unknown) {
    return error instanceof Error
      ? SendResponse(res, 'ERROR', error.message)
      : SendResponse(
          res,
          'SERVER_ERROR',
          'Se ha producido un error desconocido',
        )
  }
}

export default AuthenticationMiddleware
