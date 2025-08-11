import express, { Request, Response } from 'express'
import SendResponse from '../utils/responseHelper.js'
import ProductsMiddleware from '../middlewares/productMiddleware.js'

// import ProductRepository from '../../db/InMemory/productRepository.js'
import ProductRepository from '../../db/SQLite3/productRepository.js'
import GetAllProducts from '../../../application/use_cases/product/getAllProducts.js'
import GetProductById from '../../../application/use_cases/product/getProductById.js'
import CreateProduct from '../../../application/use_cases/product/createProduct.js'
import UpdateProduct from '../../../application/use_cases/product/updateProduct.js'
import DeleteProduct from '../../../application/use_cases/product/deleteProduct.js'

const repository = new ProductRepository()
const router = express.Router()

// Get all Products
router.get('/', async (req: Request, res: Response) => {
	const app = new GetAllProducts(repository)
	const products = await app.execute()

	return SendResponse({ res, method: 'GET', message: null, data: products })
})

// Get a Product by ID
router.get('/:id', async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const app = new GetProductById(repository)
	const product = await app.execute(id)

	return product
		? SendResponse({ res, method: 'GET', message: null, data: product })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Producto no encontrado',
				data: null,
			})
})

// Create a Product
router.post('/', ProductsMiddleware, async (req: Request, res: Response) => {
	const { name, stock } = req.body
	const app = new CreateProduct(repository)
	const product = await app.execute({ name, stock })

	return product
		? SendResponse({ res, method: 'POST', message: null, data: product })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Producto no registrado',
				data: null,
			})
})

// Update a Product
router.put('/:id', ProductsMiddleware, async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const { name, stock } = req.body
	const app = new UpdateProduct(repository)
	const product = await app.execute({ id, name, stock })

	return product
		? SendResponse({ res, method: 'PUT', message: null, data: product })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Producto no actualizado',
				data: null,
			})
})

// Delete a Product
router.delete('/:id', async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const app = new DeleteProduct(repository)
	const wasDeleted = await app.execute(id)

	return wasDeleted
		? SendResponse({ res, method: 'DELETE', message: null, data: null })
		: SendResponse({
				res,
				method: 'ERROR',
				message: 'Producto no eliminado',
				data: null,
			})
})

export default router
