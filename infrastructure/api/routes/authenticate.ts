import express, { Request, Response } from 'express'
import SendResponse from '../utils/responseHelper.js'

import AuthenticateServices from '../../../domain/services/AuthenticateServices.js'
import AuthenticateRepository from '../../db/InMemory/AuthenticateRepository.js'

const repository = new AuthenticateRepository()
const authServices = new AuthenticateServices(repository)

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const apiKeys = await authServices.getAll()
  console.log('Api Keys encontradas', apiKeys)

  return SendResponse(res, 'GET', null, apiKeys)
})

export default router
