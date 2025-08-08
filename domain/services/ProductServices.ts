import IProductRepository from '../repositories/IProductRepository.js'
import Product from '../entities/product.js'

export default class ProductService {
  repository: IProductRepository

  constructor(repository: IProductRepository) {
    this.repository = repository
  }

  async getAll() {
    return await this.repository.getAll()
  }

  async getById(id: number) {
    return await this.repository.getById(id)
  }

  async create(name: string, stock: number) {
    return await this.repository.create(name, stock)
  }

  async update(product: Product) {
    return await this.repository.update(product)
  }

  async delete(id: number) {
    return await this.repository.delete(id)
  }
}
