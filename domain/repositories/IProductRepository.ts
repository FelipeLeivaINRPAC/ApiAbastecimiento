import Product from '../entities/Product.js'

export default interface IProductRepository {
  getAll(): Promise<Product[]>
  getById(id: number): Promise<Product | null>
  create(name: string, stock: number): Promise<Product | null>
  update(product: Product): Promise<Product | null>
  delete(id: number): Promise<boolean>
}
