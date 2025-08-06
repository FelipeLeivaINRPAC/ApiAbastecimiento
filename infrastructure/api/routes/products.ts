import express, { Request, Response } from 'express'
import SendResponse from '../utils/responseHelper.js'
import ProductsMiddleware from '../middlewares/productMiddleware.js'

import ProductService from '../../../domain/services/ProductServices.js'
import ProductRepository from '../../db/InMemory/ProductRepository.js'
// const ProductRepository = require('../../db/SQLite/ProductRepositorySQLite')

const repository = new ProductRepository()
const productServices = new ProductService(repository)

const router = express.Router()

// Get all Products
router.get('/', async (req: Request, res: Response) => {
  const products = await productServices.getAll()
  return SendResponse(res, 'GET', null, products)
})

// Get a Product by ID
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const product = await productServices.getById(id)
  return product
    ? SendResponse(res, 'GET', null, product)
    : SendResponse(res, 'ERROR', 'Producto no encontrado')
})

// Create a Product
router.post('/', ProductsMiddleware, async (req: Request, res: Response) => {
  const { name, stock } = req.body
  const product = await productServices.create(name, stock)
  return product
    ? SendResponse(res, 'POST', null, product)
    : SendResponse(res, 'ERROR', 'Producto no registrado')
})

// Update a Product
router.put('/:id', ProductsMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, stock } = req.body

  const product = await productServices.update({ id, name, stock })

  return product
    ? SendResponse(res, 'PUT', null, product)
    : SendResponse(res, 'ERROR', 'Producto no actualizado')
})

// Delete a Product
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const wasDeleted = await productServices.delete(id)
  return wasDeleted
    ? SendResponse(res, 'DELETE')
    : SendResponse(res, 'ERROR', 'Producto no eliminado')
})

export default router
