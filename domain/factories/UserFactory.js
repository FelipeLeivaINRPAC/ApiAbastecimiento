const User = require('../entities/User')
const bcrypt = require('bcrypt')

class UserFactory {
  static create({
    id,
    rut,
    dv,
    name,
    lastname,
    email,
    password,
    createdAt,
    updatedAt,
  }) {
    if (!rut || !dv || !name || !lastname || !email) {
      throw new Error('Datos incorrectos')
    }
    const hashedPassword =
      password ?? bcrypt.hashSync(rut.toString().slice(0, 4), 10)

    return new User({
      id: id ?? crypto.randomUUID(),
      rut,
      dv,
      name,
      lastname,
      email,
      password: hashedPassword,
      isActive: true,
      createdAt,
      updatedAt,
    })
  }
}

module.exports = UserFactory
