const User = require('../entities/User')

class UserFactory {
  static create({ name, lastname, email }) {
    if (!name || !lastname || !email) throw new Error('Datos incorrectos')
    return new User({
      id: crypto.randomUUID(),
      name,
      lastname,
      email,
      isActive: true,
    })
  }
}

module.exports = UserFactory
