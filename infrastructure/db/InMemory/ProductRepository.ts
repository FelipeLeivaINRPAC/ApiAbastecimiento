import Product from '../../../domain/entities/Product.js'
import ProductFactory from '../../../domain/factories/ProductFactory.js'
import IProductRepository from '../../../domain/repositories/IProductRepository.js'

export default class ProductRepository implements IProductRepository {
  private products: Product[]

  constructor() {
    this.products = [
      new Product({ id: 1, name: 'Mouse', stock: 10 }),
      new Product({ id: 2, name: 'Teclado', stock: 5 }),
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
    const newProduct = ProductFactory.create({ id, name, stock })

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
