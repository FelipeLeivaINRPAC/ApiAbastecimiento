const Product = require('../entities/Product')

class ProductFactory {
  static create({ name, stock }) {
    if (!name || stock < 0) throw new Error('Datos incorrectos')
    return new Product({
      id: crypto.randomUUID(),
      name,
      stock,
    })
  }
}

module.exports = ProductFactory
