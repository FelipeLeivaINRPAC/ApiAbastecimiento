// infrastructure/db/SQLite/ProductRepositorySQLite.js
const Product = require('../../../domain/entities/Product')
const ProductRepository = require('../../../domain/repositories/ProductRepository')
const db = require('./init') // el init.js comparte la misma database.db

class ProductRepositorySQLite extends ProductRepository {
  constructor() {
    super()
    this.db = db
  }

  getAll() {
    const rows = this.db.prepare('SELECT * FROM products').all()
    return rows.map(
      (r) =>
        new Product({
          id: r.id,
          name: r.name,
          stock: r.stock,
        }),
    )
  }

  getById(id) {
    const row = this.db
      .prepare('SELECT * FROM products WHERE id = ?')
      .get(Number(id))
    if (!row) return null
    return new Product({
      id: row.id,
      name: row.name,
      stock: row.stock,
    })
  }

  create(name, stock) {
    const stmt = this.db.prepare(`
      INSERT INTO products (name, stock)
      VALUES (?, ?)
    `)
    const result = stmt.run(name, Number(stock))
    return this.getById(result.lastInsertRowid)
  }

  update(id, name, stock) {
    const stmt = this.db.prepare(`
      UPDATE products
      SET name = ?, stock = ?
      WHERE id = ?
    `)
    const info = stmt.run(name, Number(stock), Number(id))
    if (info.changes === 0) return false
    return this.getById(id)
  }

  delete(id) {
    const stmt = this.db.prepare('DELETE FROM products WHERE id = ?')
    const info = stmt.run(Number(id))
    return info.changes > 0
  }
}

module.exports = ProductRepositorySQLite
