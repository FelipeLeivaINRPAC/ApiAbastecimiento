import IProduct from '../interfaces/IProduct.js'

export default class Product {
  id: number
  name: string
  stock: number

  constructor({ id, name, stock }: IProduct) {
    this.id = id
    this.name = name
    this.stock = stock
  }
}
