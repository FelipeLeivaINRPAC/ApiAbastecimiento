const Product = require('../../../domain/entities/Product')
const ProductFactory = require('../../../domain/factories/ProductFactory')
const ProductRepository = require('../../../domain/repositories/ProductRepository')

class ProductRepositoryDb extends ProductRepository {
	constructor() {
		super()
		this.products = [
			new Product({ id: 1, name: 'Mouse', stock: 10 }),
			new Product({ id: 2, name: 'Teclado', stock: 5 }),
		]
	}

	async getById(id) {
		return this.products.find((product) => product.id === Number(id))
	}

	async create(name, stock) {
		const newProduct = ProductFactory.create({ name, stock })
		if (!newProduct) return false

		this.products.push(newProduct)
		return newProduct
	}

	async getAll() {
		return this.products
	}

	async update(id, name, stock) {
		const product = this.products.find(
			(product) => product.id === Number(id)
		)

		if (!product) return false
		if (product.name !== name) product.name = name
		if (product.stock !== stock) product.stock = stock

		return product
	}

	async delete(id) {
		const itemsBeforeAction = this.products.length
		this.products = this.products.filter(
			(product) => product.id !== Number(id)
		)
		const itemsAfterAction = this.products.length

		return itemsBeforeAction !== itemsAfterAction
	}
}

module.exports = ProductRepositoryDb
