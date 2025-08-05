// infrastructure/db/SQLite/UserRepositorySQLite.js
const User = require('../../../domain/entities/User')
const UserRepository = require('../../../domain/repositories/UserRepository')
const db = require('./init')

class UserRepositorySQLite extends UserRepository {
  constructor() {
    super()
    this.db = db
  }

  getAll() {
    const rows = this.db.prepare('SELECT * FROM users').all()
    return rows.map(
      (r) =>
        new User({
          id: r.id,
          name: r.name,
          lastname: r.lastname,
          email: r.email,
          isActive: Boolean(r.isActive),
          rut: r.rut,
          dv: r.dv,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        }),
    )
  }

  getById(id) {
    const row = this.db
      .prepare('SELECT * FROM users WHERE id = ?')
      .get(Number(id))
    if (!row) return null
    return new User({
      id: row.id,
      name: row.name,
      lastname: row.lastname,
      email: row.email,
      isActive: Boolean(row.isActive),
      rut: row.rut,
      dv: row.dv,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })
  }

  create(rut, dv, name, lastname, email, isActive = true) {
    const stmt = this.db.prepare(`
      INSERT INTO users (rut, dv, name, lastname, email, isActive)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(rut, dv, name, lastname, email, isActive ? 1 : 0)
    const created = this.getById(result.lastInsertRowid)
    return created
  }

  update(id, name, lastname, email, isActive) {
    const stmt = this.db.prepare(`
      UPDATE users
      SET name = ?, lastname = ?, email = ?, isActive = ?
      WHERE id = ?
    `)
    const info = stmt.run(name, lastname, email, isActive ? 1 : 0, Number(id))
    if (info.changes === 0) return false
    return this.getById(id)
  }

  delete(id) {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?')
    const info = stmt.run(Number(id))
    return info.changes > 0
  }
}

module.exports = UserRepositorySQLite
