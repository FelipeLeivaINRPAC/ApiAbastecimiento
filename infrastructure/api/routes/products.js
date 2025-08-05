const express = require('express')
const router = express.Router()

const SendResponse = require('../utils/responseHelper')

const validateInputsProduct = require('../middlewares/validateInputsProduct')

const ProductRepositoryDb = require('../../db/InMemory/ProductRepository')
const ProductServices = require('../../../domain/services/ProductServices')

const repository = new ProductRepositoryDb()
const productServices = new ProductServices(repository)

router.get('/', async (req, res) => {
  const products = await productServices.getAll()
  return SendResponse(res, 'GET', null, products)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const product = await productServices.getById(id)
  return product
    ? SendResponse(res, 'GET', null, product)
    : SendResponse(res, 'ERROR', 'Producto no encontrado')
})

router.post('/', validateInputsProduct, async (req, res) => {
  const { name, stock } = req.body
  const product = await productServices.create(name, stock)
  return product
    ? SendResponse(res, 'POST', null, product)
    : SendResponse(res, 'ERROR', 'Producto no registrado')
})

router.put('/:id', validateInputsProduct, async (req, res) => {
  const id = req.params.id
  const { name, stock } = req.body
  const product = await productServices.update(id, name, stock)
  return product
    ? SendResponse(res, 'PUT', null, product)
    : SendResponse(res, 'PUT', 'Producto no actualizado')
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const wasDeleted = await productServices.delete(id)
  return wasDeleted
    ? SendResponse(res, 'DELETE')
    : SendResponse(res, 'ERROR', 'Producto no eliminado')
})

module.exports = router
