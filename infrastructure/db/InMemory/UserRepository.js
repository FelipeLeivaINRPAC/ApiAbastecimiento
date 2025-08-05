const UserRepository = require('../../../domain/repositories/UserRepository')
const UserFactory = require('../../../domain/factories/UserFactory')

const bcrypt = require('bcrypt')

const getCurrentDate = () => {
  const now = new Date()
  return now.toISOString().slice(0, 19).replace('T', ' ')
}

class UserRepositoryDb extends UserRepository {
  constructor() {
    super()
    this.users = [
      UserFactory.create({
        id: 1,
        rut: 8899774,
        dv: '0',
        name: 'Usuario 1',
        lastname: 'Lastname 1',
        email: 'email_1@gmail.com',
        isActive: true,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      }),
      UserFactory.create({
        id: 2,
        rut: 15481243,
        dv: '9',
        name: 'Usuario 2',
        lastname: 'Lastname 2',
        email: 'email_2@gmail.com',
        isActive: true,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      }),
    ]
  }

  getById(id) {
    return this.users.find((user) => user.id === Number(id))
  }

  getAll() {
    return this.users
  }

  create(rut, dv, name, lastname, email) {
    const currentDate = getCurrentDate()
    const user = UserFactory.create({
      rut,
      dv,
      name,
      lastname,
      email,
      createdAt: currentDate,
      updatedAt: currentDate,
    })

    if (!user) return false

    this.users.push(user)
    return user
  }

  update(id, rut, dv, name, lastname, email, password, isActive) {
    const user = this.users.find((user) => user.id === Number(id))
    if (!user) return false

    if (rut && user.rut !== rut) {
      user.rut = rut
      user.dv = dv
    }
    if (name && user.name !== name) user.name = name
    if (lastname && user.lastname !== lastname) user.lastname = lastname
    if (email && user.email !== email) user.email = email
    if (password && user.password !== bcrypt.compare(password, 10)) {
      user.password = bcrypt.hashSync(password, 10)
    }
    if (isActive && user.isActive !== isActive) user.isActive = isActive

    return user
  }

  delete(id) {
    const usersBeforeDelete = this.users.length
    this.users = this.users.filter((user) => user.id !== Number(id))
    const usersAfterDelete = this.users.length

    return usersBeforeDelete !== usersAfterDelete
  }
}

module.exports = UserRepositoryDb
