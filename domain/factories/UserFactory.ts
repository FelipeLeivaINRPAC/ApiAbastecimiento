import User from '../entities/User.js'
import bcrypt from 'bcrypt'

export default class UserFactory {
  private static currentId = 1

  static create(
    rut: number,
    dv: string,
    name: string,
    lastname: string,
    email: string,
  ) {
    if (!rut || !dv || !name || !lastname || !email) {
      throw new Error('Datos incorrectos')
    }

    const hashedPassword = bcrypt.hashSync(rut.toString().slice(0, 4), 10)
    const now = new Date()

    return new User({
      id: this.currentId++,
      rut,
      dv,
      name,
      lastname,
      email,
      password: hashedPassword,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    })
  }
}
