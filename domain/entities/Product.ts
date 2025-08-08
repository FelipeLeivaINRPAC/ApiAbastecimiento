export default class Product {
  constructor(
    public id: number,
    public name: string,
    public stock: number,
  ) {
    this.id = id
    this.name = name
    this.stock = stock
  }
}
