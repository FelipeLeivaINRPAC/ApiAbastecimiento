import Product from '../entities/Product.js'
import IProduct from '../interfaces/IProduct.js'

export default class ProductFactory {
  static create({ id, name, stock }: IProduct) {
    if (!name || stock < 0) throw new Error('Datos incorrectos')

    return new Product({
      id,
      name,
      stock,
    })
  }
}
