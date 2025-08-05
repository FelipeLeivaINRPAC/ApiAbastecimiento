const User = require('../../../domain/entities/User')
const UserRepository = require('../../../domain/repositories/UserRepository')
const UserFactory = require('../../../domain/factories/UserFactory')

class UserRepositoryDb extends UserRepository {
  constructor() {
    super()
    this.users = [
      new User({
        id: 1,
        name: 'Usuario 1',
        lastname: 'Lastname 1',
        email: 'email_1@gmail.com',
      }),
      new User({
        id: 2,
        name: 'Usuario 2',
        lastname: 'Lastname 2',
        email: 'email_2@gmail.com',
      }),
      new User({
        id: 3,
        name: 'Usuario 3',
        lastname: 'Lastname 3',
        email: 'email_3@gmail.com',
      }),
    ]
  }

  getById(id) {
    return this.users.find((user) => user.id === Number(id))
  }

  getAll() {
    return this.users
  }

  create(name, lastname, email) {
    const user = UserFactory.create({ name, lastname, email })

    if (!user) return false

    this.users.push(user)
    return user
  }

  update(id, name, lastname, email, isActive) {
    const user = this.users.find((user) => user.id === Number(id))
    if (!user) return false

    if (name && user.name !== name) user.name = name
    if (lastname && user.lastname !== lastname) user.lastname = lastname
    if (email && user.email !== email) user.email = email
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
