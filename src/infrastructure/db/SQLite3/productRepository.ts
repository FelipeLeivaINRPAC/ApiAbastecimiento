import Product from '../../../domain/entities/product.js'
import ProductFactory from '../../../domain/factories/productFactory.js'
import IProductRepository, {
	ICreateProduct,
	IUpdateProduct,
} from '../../../domain/repositories/IProductRepository.js'
import type { Database as DatabaseType } from 'better-sqlite3'
import db from './init.js' // Carga la base de datos instanciada en init.js

export default class ProductRepository implements IProductRepository {
	public db: DatabaseType

	constructor() {
		this.db = db
	}

	async getAll() {
		const rows = this.db.prepare('SELECT * FROM products').all() as Product[]

		return rows.map((row: Product) =>
			ProductFactory.create(row.id, row.name, row.stock)
		)
	}

	async getById(id: number) {
		const row = this.db
			.prepare('SELECT * FROM products WHERE id = ?')
			.get(Number(id)) as Product

		if (!row) return null

		return ProductFactory.create(row.id, row.name, row.stock)
	}

	async create({ name, stock }: ICreateProduct) {
		const stmt = this.db.prepare(`
      INSERT INTO products (name, stock)
      VALUES (?, ?)
    `)
		const result = stmt.run(name, Number(stock))

		if (!result.lastInsertRowid) return null

		return this.getById(Number(result.lastInsertRowid))
	}

	async update({ id, name, stock }: IUpdateProduct) {
		const stmt = this.db.prepare(`
      UPDATE products
      SET name = ?, stock = ?
      WHERE id = ?
    `)
		const info = stmt.run(name, Number(stock), Number(id))
		if (info.changes === 0) return null
		return this.getById(id)
	}

	async delete(id: number) {
		const stmt = this.db.prepare('DELETE FROM products WHERE id = ?')
		const info = stmt.run(Number(id))
		return info.changes > 0
	}
}
