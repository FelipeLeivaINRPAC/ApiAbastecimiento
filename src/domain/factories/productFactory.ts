import Product from '../entities/product.js'

export default class ProductFactory {
	static create(id: number, name: string, stock: number) {
		if (!name || stock < 0) throw new Error('Datos incorrectos')

		return new Product(id, name, stock)
	}
}
