import Product from '../../../domain/entities/product.js'
import ProductFactory from '../../../domain/factories/productFactory.js'
import IProductRepository from '../../../domain/repositories/IProductRepository.js'

export default class ProductRepository implements IProductRepository {
  private products: Product[]

  constructor() {
    this.products = [
      ProductFactory.create(1, 'Mouse', 10),
      ProductFactory.create(2, 'Teclado', 5),
    ]
  }

  async getAll() {
    return this.products
  }

  async getById(id: number) {
    const product = this.products.find((product) => product.id === Number(id))
    return product ?? null
  }

  async create(name: string, stock: number) {
    const id = 1
    const newProduct = ProductFactory.create(id, name, stock)

    if (!newProduct) return null

    this.products.push(newProduct)
    return newProduct
  }

  async update({ id, name, stock }: Product) {
    const product = this.products.find((product) => product.id === Number(id))

    if (!product) return null
    if (product.name !== name) product.name = name
    if (product.stock !== stock) product.stock = stock

    return product
  }

  async delete(id: number) {
    const itemsBeforeAction = this.products.length
    this.products = this.products.filter((product) => product.id !== Number(id))
    const itemsAfterAction = this.products.length

    return itemsBeforeAction !== itemsAfterAction
  }
}
