import User from '../../../domain/entities/user.js'
import IUserRepository from '../../../domain/repositories/IUserRepository.js'
import db from './init.js'

export default class UserRepository implements IUserRepository {
  public db

  constructor() {
    this.db = db
  }

  getAll() {
    const rows = this.db.prepare('SELECT * FROM users').all()
    return rows.map(
      (user: User) =>
        new User(
          user.id,
          user.rut,
          user.dv,
          user.name,
          user.lastname,
          user.email,
          user.password,
          user.isActive,
          user.createdAt,
          user.updatedAt,
        ),
    )
  }

  async getById(id: number) {
    const row = this.db
      .prepare('SELECT * FROM users WHERE id = ?')
      .get(Number(id))

    if (!row) return null

    return new User(
      row.id,
      row.rut,
      row.dv,
      row.name,
      row.lastname,
      row.email,
      row.password,
      row.isActive,
      row.createdAt,
      row.updatedAt,
    )
  }

  async create(
    rut: number,
    dv: string,
    name: string,
    lastname: string,
    email: string,
    isActive: boolean = true,
  ) {
    const stmt = this.db.prepare(`
      INSERT INTO users (rut, dv, name, lastname, email, isActive)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(rut, dv, name, lastname, email, isActive ? 1 : 0)
    const created = this.getById(result.lastInsertRowid)
    return created
  }

  async update(
    id: number,
    rut: number,
    dv: string,
    name: string,
    lastname: string,
    email: string,
    password: string,
    isActive: boolean,
  ) {
    const user = await this.getById(id)

    if (!user) return null

    if (!rut) {
      rut = user.rut
      dv = user.dv
    }
    if (!name) name = user.name
    if (!lastname) lastname = user.lastname
    if (!email) email = user.email
    if (typeof isActive === undefined) isActive = user.isActive

    console.log(id, rut, dv, name, lastname, email, password, isActive ? 1 : 0)

    const stmt = this.db.prepare(`
      UPDATE users
      SET rut = ?, dv = ?, name = ?, lastname = ?, email = ?, isActive = ?
      WHERE id = ?
    `)
    const info = stmt.run(
      rut,
      dv,
      name,
      lastname,
      email,
      isActive ? 1 : 0,
      Number(id),
    )
    if (info.changes === 0) return null

    return this.getById(id)
  }

  async delete(id: number) {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?')
    const info = stmt.run(Number(id))
    return info.changes > 0
  }
}
