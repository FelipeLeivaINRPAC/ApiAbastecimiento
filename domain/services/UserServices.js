class UserServices {
  constructor(userRepository) {
    this.repository = userRepository
  }

  async getAll(id) {
    return await this.repository.getAll(id)
  }

  async getById(id) {
    return await this.repository.getById(id)
  }

  async create(rut, dv, name, lastname, email) {
    return await this.repository.create(rut, dv, name, lastname, email)
  }

  async update(id, rut, dv, name, lastname, email, password, isActive) {
    return await this.repository.update(
      id,
      rut,
      dv,
      name,
      lastname,
      email,
      password,
      isActive,
    )
  }

  async delete(id) {
    return await this.repository.delete(id)
  }
}

module.exports = UserServices
